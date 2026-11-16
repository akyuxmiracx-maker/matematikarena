/* =========================================================
   net.js — MQTT 3.1.1 (WebSocket üzerinden, kurulum gerektirmez)
   Ücretsiz genel broker'lar kullanılır: oda kurma / katılma /
   gerçek zamanlı mesajlaşma için altyapı.
   Kütüphane yok, build yok — doğrudan tarayıcıda çalışır.
========================================================= */
(function () {
  "use strict";

  var BROKERS = [
    "wss://broker.hivemq.com:8884/mqtt",
    "wss://broker.emqx.io:8084/mqtt",
    "wss://test.mosquitto.org:8081/"
  ];
  var SUBPROTO = "mqtt";
  var KEEPALIVE = 60;

  /* ---------- byte yardımcıları ---------- */
  function encStr(s) {
    var e = new TextEncoder().encode(String(s));
    var out = new Uint8Array(2 + e.length);
    out[0] = (e.length >> 8) & 255;
    out[1] = e.length & 255;
    out.set(e, 2);
    return out;
  }
  function encLen(n) {
    var out = [];
    do {
      var d = n % 128;
      n = Math.floor(n / 128);
      if (n > 0) d |= 128;
      out.push(d);
    } while (n > 0);
    return new Uint8Array(out);
  }
  function cat() {
    var arrs = Array.prototype.slice.call(arguments), len = 0, i;
    for (i = 0; i < arrs.length; i++) len += arrs[i].length;
    var out = new Uint8Array(len), o = 0;
    for (i = 0; i < arrs.length; i++) { out.set(arrs[i], o); o += arrs[i].length; }
    return out;
  }
  function readLen(buf, i) {
    var v = 0, mul = 1, b;
    do {
      if (i >= buf.length) return null;
      b = buf[i++];
      v += (b & 127) * mul;
      mul *= 128;
    } while (b & 128);
    return [v, i];
  }
  function utf8Decode(bytes) {
    try { return new TextDecoder().decode(bytes); } catch (e) { return ""; }
  }

  /* ---------- İstemci ---------- */
  function Client() {
    this.ws = null;
    this.status = "idle";          // idle | connecting | online | offline
    this.closed = true;
    this.subs = {};                // topic -> fonksiyon
    this.queue = [];               // bağlantı yokken bekleyen mesajlar
    this.brokerIdx = 0;
    this.attempt = 0;
    this.packetId = 1;
    this.clientId = "ma-" + Math.random().toString(16).slice(2, 10);
    this.reconT = null;
    this.pingT = null;
    this.acc = new Uint8Array(0);
    this.statusFn = [];
    this.lastErr = null;
  }

  Client.prototype.onStatus = function (fn) { this.statusFn.push(fn); fn(this.status); };
  Client.prototype._setStatus = function (s) {
    if (this.status === s) return;
    this.status = s;
    for (var i = 0; i < this.statusFn.length; i++) {
      try { this.statusFn[i](s); } catch (e) {}
    }
  };

  Client.prototype.start = function () {
    if (!this.closed && this.ws) return;
    this.closed = false;
    this.attempt = 0;
    this._open();
  };

  Client.prototype._open = function () {
    var self = this;
    if (this.closed) return;
    this._setStatus("connecting");
    var url = BROKERS[this.brokerIdx % BROKERS.length];
    var ws;
    try { ws = new WebSocket(url, SUBPROTO); }
    catch (e) { this.lastErr = String(e); return this._down(); }
    this.ws = ws;
    ws.binaryType = "arraybuffer";
    this.acc = new Uint8Array(0);

    var opened = false;
    var guard = setTimeout(function () { if (!opened) { try { ws.close(); } catch (e) {} } }, 7000);

    ws.onopen = function () {
      opened = true;
      clearTimeout(guard);
      var payload = cat(encStr("MQTT"),
        new Uint8Array([4, 0x02, (KEEPALIVE >> 8) & 255, KEEPALIVE & 255]),
        encStr(self.clientId));
      self._raw(cat(new Uint8Array([0x10]), encLen(payload.length), payload));
    };
    ws.onmessage = function (ev) {
      if (ev.data instanceof ArrayBuffer) self._feed(new Uint8Array(ev.data));
    };
    ws.onerror = function () { self.lastErr = "ws"; };
    ws.onclose = function () {
      clearTimeout(guard);
      self._down();
    };
  };

  Client.prototype._raw = function (bytes) {
    if (this.ws && this.ws.readyState === 1) {
      try { this.ws.send(bytes); return true; } catch (e) {}
    }
    return false;
  };

  Client.prototype._down = function () {
    if (this.closed) { this._setStatus("offline"); return; }
    this.ws = null;
    clearInterval(this.pingT); this.pingT = null;
    this._setStatus("offline");
    // broker'lar arasında gez, artan gecikme ile yeniden dene
    this.attempt++;
    this.brokerIdx++;
    var wait = Math.min(12000, 1200 * Math.pow(1.7, Math.min(this.attempt, 6)));
    var self = this;
    clearTimeout(this.reconT);
    this.reconT = setTimeout(function () { self._open(); }, wait + Math.random() * 500);
  };

  Client.prototype._feed = function (chunk) {
    var merged = cat(this.acc, chunk);
    var i = 0;
    while (i < merged.length) {
      if (merged.length - i < 2) break;
      var rl = readLen(merged, i + 1);
      if (!rl) break;
      var rem = rl[0], head = rl[1];
      if (merged.length - head < rem) break;
      var type = merged[i] & 0xf0;
      var body = merged.subarray(head, head + rem);
      this._packet(type, body);
      i = head + rem;
    }
    this.acc = merged.subarray(i);
  };

  Client.prototype._packet = function (type, body) {
    if (type === 0x20) {            // CONNACK
      var rc = body.length > 1 ? body[1] : 1;
      if (rc === 0) {
        this.attempt = 0;
        this._setStatus("online");
        // abonelikleri yenile + kuyruğu boşalt
        for (var t in this.subs) if (this.subs.hasOwnProperty(t)) this._sub(t);
        var q = this.queue.splice(0, this.queue.length);
        for (var k = 0; k < q.length; k++) this.publish(q[k][0], q[k][1]);
        var self = this;
        clearInterval(this.pingT);
        this.pingT = setInterval(function () { self._raw(new Uint8Array([0xc0, 0x00])); }, 25000);
      } else {
        this.lastErr = "connack-" + rc;
        this._down();
      }
    } else if (type === 0x30) {     // PUBLISH (QoS0)
      if (body.length < 2) return;
      var tl = (body[0] << 8) | body[1];
      if (body.length < 2 + tl) return;
      var topic = utf8Decode(body.subarray(2, 2 + tl));
      var payload = utf8Decode(body.subarray(2 + tl));
      var fn = this.subs[topic];
      if (fn) {
        var data = payload;
        try { data = JSON.parse(payload); } catch (e) {}
        try { fn(data, topic); } catch (e2) {}
      }
    } else if (type === 0x90) {     // SUBACK
      /* yoksay */
    } else if (type === 0xd0) {     // PINGRESP
      /* yoksay */
    }
  };

  Client.prototype._sub = function (topic) {
    var id = this.packetId++ % 65535 || 1;
    var payload = cat(new Uint8Array([(id >> 8) & 255, id & 255]), encStr(topic), new Uint8Array([0]));
    this._raw(cat(new Uint8Array([0x82]), encLen(payload.length), payload));
  };

  Client.prototype.subscribe = function (topic, fn) {
    this.subs[topic] = fn;
    if (this.status === "online") this._sub(topic);
  };

  Client.prototype.unsubscribe = function (topic) {
    delete this.subs[topic];
  };

  Client.prototype.publish = function (topic, data) {
    var payload = typeof data === "string" ? data : JSON.stringify(data);
    var body = cat(encStr(topic), new TextEncoder().encode(payload));
    var ok = this._raw(cat(new Uint8Array([0x30]), encLen(body.length), body));
    if (!ok) {
      if (this.queue.length < 300) this.queue.push([topic, data]);
      if (this.status !== "connecting") this.start();
    }
  };

  Client.prototype.stop = function () {
    this.closed = true;
    clearTimeout(this.reconT);
    clearInterval(this.pingT);
    this.reconT = this.pingT = null;
    try { if (this.ws) this.ws.close(); } catch (e) {}
    this.ws = null;
    this._setStatus("offline");
  };

  var client = null;
  window.MQTT = {
    /* tekil istemci (yoksa kur) */
    client: function () {
      if (!client) client = new Client();
      return client;
    },
    start: function () {
      var c = window.MQTT.client();
      c.start();
      return c;
    },
    brokers: BROKERS
  };
})();
