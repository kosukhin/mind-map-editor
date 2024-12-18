var Fs = Object.defineProperty;
var Ts = (n, e, t) => e in n ? Fs(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var $ = (n, e, t) => Ts(n, typeof e != "symbol" ? e + "" : e, t);
import { defineComponent as D, openBlock as f, createBlock as z, Transition as rs, withCtx as w, unref as l, createElementBlock as A, normalizeClass as ce, createElementVNode as b, withModifiers as be, renderSlot as ee, createCommentVNode as B, Fragment as U, renderList as W, toDisplayString as x, createVNode as g, normalizeStyle as ae, createTextVNode as I, withDirectives as ze, isRef as we, vModelText as os, vModelCheckbox as Ss, vModelSelect as js, createStaticVNode as Bs } from "vue";
import { useScriptTag as Is, useMagicKeys as Os, useVModel as Le, useShare as Ps } from "@vueuse/core";
import he from "konva";
import { ref as ie, computed as je, watch as Be, onBeforeUnmount as Es, onMounted as as } from "@vue/runtime-core";
import { FontAwesomeIcon as Ds } from "@fortawesome/vue-fontawesome";
import { faArrowUp as Rs, faArrowDown as Ns, faArrowRight as Hs, faArrowLeft as Vs, faClose as Us, faMap as zs, faRotateRight as Ls, faRotateLeft as Qs, faFileText as Ws, faCog as Ks, faPlusSquare as Gs, faHistory as Ys, faSearch as Js, faTextWidth as Zs, faBars as qs } from "@fortawesome/free-solid-svg-icons";
import { useEditor as Xs, EditorContent as ei, BubbleMenu as ti } from "@tiptap/vue-3";
import si from "@tiptap/starter-kit";
class ii {
  constructor(e) {
    e.value(this);
  }
  give(e) {
    return document.title = e, this;
  }
  introduction() {
    return "patron";
  }
}
class Ae {
  constructor(e) {
    this.guestReceiver = e;
  }
  value(e) {
    return this.guestReceiver(e), e;
  }
}
function L(n, e, t) {
  typeof e == "function" ? e(n, t) : e.give(n, t);
}
class pe {
  constructor(e) {
    this.receiver = e;
  }
  give(e, t) {
    return this.receiver(e, t), this;
  }
}
class K {
  constructor(e, t) {
    this.sourceGuest = e, this.targetGuest = t;
  }
  introduction() {
    return typeof this.sourceGuest == "function" || !this.sourceGuest.introduction ? "guest" : this.sourceGuest.introduction();
  }
  give(e, t) {
    return L(e, this.targetGuest, t), this;
  }
  disposed(e) {
    const t = this.sourceGuest;
    return t.disposed ? t.disposed(e) : !1;
  }
}
var ni = Object.defineProperty, ri = (n, e, t) => e in n ? ni(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, St = (n, e, t) => ri(n, typeof e != "symbol" ? e + "" : e, t);
const cs = /* @__PURE__ */ new Map(), jt = (n) => {
  cs.forEach((e) => {
    e.delete(n);
  });
};
class Qe {
  constructor(e) {
    this.initiator = e, St(this, "patrons"), St(this, "give"), this.patrons = /* @__PURE__ */ new Set(), cs.set(this, this.patrons);
    let t = null;
    const s = (i, r) => {
      this.patrons.forEach((o) => {
        this.sendValueToGuest(i, o, r);
      });
    };
    this.give = (i, r) => {
      const o = () => {
        o === t && s(i, r);
      };
      return t = o, queueMicrotask(o), this;
    };
  }
  size() {
    return this.patrons.size;
  }
  add(e) {
    if (!e)
      throw new Error("PatronPool add method received nothing!");
    return typeof e != "function" && e.introduction && e.introduction() === "patron" && this.patrons.add(e), this;
  }
  remove(e) {
    return this.patrons.delete(e), this;
  }
  distribute(e, t) {
    return this.add(t), this.sendValueToGuest(e, t, {}), this;
  }
  sendValueToGuest(e, t, s) {
    this.guestDisposed(e, t) || L(e, t, {
      ...s,
      data: {
        ...(s == null ? void 0 : s.data) ?? {},
        initiator: this.initiator,
        pool: this
      }
    });
  }
  guestDisposed(e, t) {
    var s;
    return (s = t.disposed) != null && s.call(t, e) ? (this.remove(t), !0) : !1;
  }
}
var oi = Object.defineProperty, ai = (n, e, t) => e in n ? oi(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, ci = (n, e, t) => ai(n, e + "", t);
class Ie {
  constructor(e) {
    this.sourceDocument = e, ci(this, "thePool", new Qe(this));
  }
  pool() {
    return this.thePool;
  }
  give(e) {
    return this.sourceDocument = e, this.thePool.give(this.sourceDocument), this;
  }
  value(e) {
    return typeof e == "function" ? this.thePool.distribute(this.sourceDocument, new pe(e)) : this.thePool.distribute(this.sourceDocument, e), this;
  }
}
class Ue {
  constructor(e) {
    this.baseGuest = e;
  }
  give(e, t) {
    let s = this.baseGuest;
    return typeof s == "function" && (s = new pe(s)), s.give(e, t), this;
  }
  introduction() {
    return typeof this.baseGuest == "function" || !this.baseGuest.introduction ? "guest" : this.baseGuest.introduction();
  }
  disposed(e) {
    const t = this.baseGuest;
    return t.disposed ? t.disposed(e) : !1;
  }
}
var li = Object.defineProperty, ui = (n, e, t) => e in n ? li(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Bt = (n, e, t) => ui(n, typeof e != "symbol" ? e + "" : e, t);
class hi {
  constructor(e) {
    Bt(this, "guests", /* @__PURE__ */ new Set()), Bt(this, "patronPool"), this.patronPool = new Qe(e);
  }
  give(e, t) {
    return this.deliverToGuests(e, t), this.patronPool.give(e, t), this;
  }
  add(e) {
    return (typeof e == "function" || !e.introduction || e.introduction() === "guest") && this.guests.add(e), this.patronPool.add(e), this;
  }
  remove(e) {
    return this.guests.delete(e), this.patronPool.remove(e), this;
  }
  distribute(e, t) {
    return this.add(t), this.give(e), this;
  }
  size() {
    return this.patronPool.size() + this.guests.size;
  }
  deliverToGuests(e, t) {
    this.guests.forEach((s) => {
      L(e, s, t);
    }), this.guests.clear();
  }
}
var di = Object.defineProperty, pi = (n, e, t) => e in n ? di(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Oe = (n, e, t) => pi(n, typeof e != "symbol" ? e + "" : e, t);
class ct {
  constructor() {
    Oe(this, "theChain"), Oe(this, "keysKnown", /* @__PURE__ */ new Set()), Oe(this, "keysFilled", /* @__PURE__ */ new Set()), Oe(this, "filledChainPool", new hi(this)), this.theChain = new Ie({});
  }
  resultArray(e) {
    const t = new Ue(e);
    return this.filledChainPool.add(
      new K(t, (s) => {
        t.give(Object.values(s));
      })
    ), this.isChainFilled() && this.theChain.value(
      new pe((s) => {
        this.filledChainPool.give(Object.values(s));
      })
    ), this;
  }
  result(e) {
    const t = new Ue(e);
    return this.isChainFilled() ? (this.filledChainPool.add(t), this.theChain.value(
      new pe((s) => {
        this.filledChainPool.give(s);
      })
    )) : this.filledChainPool.add(t), this;
  }
  receiveKey(e) {
    return this.keysKnown.add(e), new pe((t) => {
      queueMicrotask(() => {
        this.theChain.value(
          new pe((s) => {
            this.keysFilled.add(e);
            const i = {
              ...s,
              [e]: t
            };
            this.theChain.give(i), this.isChainFilled() && this.filledChainPool.give(i);
          })
        );
      });
    });
  }
  isChainFilled() {
    return this.keysFilled.size > 0 && this.keysFilled.size === this.keysKnown.size;
  }
}
class fi {
  constructor(e) {
    this.theValue = e;
  }
  give(e) {
    return this.theValue = e, this;
  }
  value() {
    return this.theValue;
  }
}
class gi {
  constructor(e) {
    this.willBePatron = e;
  }
  introduction() {
    return "patron";
  }
  give(e, t) {
    return L(e, this.willBePatron, t), this;
  }
  disposed(e) {
    var s;
    const t = this.willBePatron;
    return ((s = t == null ? void 0 : t.disposed) == null ? void 0 : s.call(t, e)) || !1;
  }
}
var mi = Object.defineProperty, vi = (n, e, t) => e in n ? mi(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Ai = (n, e, t) => vi(n, e + "", t);
class yi {
  constructor(e) {
    this.baseGuest = e, Ai(this, "received", !1);
  }
  introduction() {
    return "patron";
  }
  give(e, t) {
    this.received || L(e, this.baseGuest, t);
    const s = t == null ? void 0 : t.data;
    return s != null && s.pool && s.pool.remove(this), this;
  }
  disposed(e) {
    const t = this.baseGuest;
    return t.disposed ? t.disposed(e) : !1;
  }
}
var bi = Object.defineProperty, wi = (n, e, t) => e in n ? bi(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Ci = (n, e, t) => wi(n, e + "", t);
class ye {
  constructor() {
    Ci(this, "baseSource", new Ie(null));
  }
  value(e) {
    return this.baseSource.value(
      new K(e, (t) => {
        t !== null && L(t, e);
      })
    ), this;
  }
  give(e) {
    return this.baseSource.give(e), this;
  }
  pool() {
    return this.baseSource.pool();
  }
}
class R {
  constructor(e, t = {}) {
    this.constructorFn = e, this.factories = t;
  }
  create(...e) {
    return new this.constructorFn(
      ...e,
      this.factories
    );
  }
}
class Se extends Error {
  constructor(e, t) {
    super(e, t);
  }
}
class xi {
  constructor(e) {
    this.fileHandler = e;
  }
  content(e) {
    return this.fileHandler.getFile().then(async (t) => await new Response(t).text()).then((t) => {
      e.give(t);
    }).catch((t) => {
      throw new Se("Problem when reading file in SystemFileFromHandler", {
        cause: t
      });
    }), this;
  }
}
class _i {
  constructor(e) {
    this.fileHandler = e;
  }
  save(e) {
    return this.fileHandler.createWritable().then((t) => (t.write(e).catch((s) => {
      throw new Se("Cant save file in browser", { cause: s });
    }), t)).then((t) => {
      t.close().catch((s) => {
        throw new Se("Cant close written file in browser", { cause: s });
      });
    }), this;
  }
}
class $i {
  constructor(e) {
    this.content = e;
  }
  result() {
    return JSON.parse(this.content);
  }
}
class ki {
  constructor(e) {
    this.content = e;
  }
  result() {
    return JSON.stringify(this.content);
  }
}
class Mi {
  constructor(e, t = 100, s = 100) {
    this.svgContent = e, this.width = t, this.height = s;
  }
  markup() {
    return this.svgContent.replaceAll("${width}", String(this.width)).replaceAll("${height}", String(this.height));
  }
}
class Fi {
  constructor(e, t) {
    this.type = e, this.factories = t;
  }
  markup() {
    return this.factories.svgImage.create(this.type.svg, this.type.width, this.type.height).markup();
  }
}
class Ti {
  constructor(e, t, s) {
    this.chunksCount = e, this.baseNumber = t, this.factories = s;
  }
  chunks(e) {
    return this.baseNumber.value(
      this.factories.guestInTheMiddle.create(e, (t) => {
        const s = Math.round(t / this.chunksCount), i = [];
        for (let r = 1; r <= this.chunksCount; r += 1)
          i.push(r * s);
        e.give(i);
      })
    ), e;
  }
}
class Si {
  constructor(e, t) {
    this.mapUrl = e, this.factories = t;
  }
  name(e) {
    this.mapUrl.value(
      this.factories.guestInTheMiddle.create(e, (t) => {
        let s = t.replace("/", "").replaceAll("/", "_");
        s.match("_") && (s = `_${s}`), e.give(s);
      })
    );
  }
}
class ji {
  constructor(e, t) {
    this.text = e, this.factories = t;
  }
  noHtml(e) {
    return this.text.value(
      this.factories.guestInTheMiddle.create(e, (t) => {
        const s = document.createElement("DIV");
        s.innerHTML = t;
        const i = s.textContent || s.innerText || "";
        e.give(i);
      })
    ), e;
  }
}
class Bi {
  constructor(e, t, s, i) {
    $(this, "loadingCache");
    this.callbackName = e, this.url = t, this.emptyValue = s, this.factories = i, this.loadingCache = i.sourceEmpty.create();
  }
  content(e) {
    this.loadingCache.give(!0);
    const t = setTimeout(() => {
      this.loadingCache.give(!1), e.give(this.emptyValue);
    }, 1e4);
    return Is(this.url, () => {
      var i;
      clearInterval(t);
      const s = ((i = window[this.callbackName]) == null ? void 0 : i.call(window)) || this.emptyValue;
      e.give(s), this.loadingCache.give(!1);
    }), e;
  }
  loading(e) {
    return this.loadingCache.value(e), e;
  }
}
class Ii {
  constructor(e) {
    this.text = e;
  }
  asString(e) {
    return e.give(this.text), e;
  }
}
class Oi {
  constructor(e, t) {
    this.baseText = e, this.factories = t;
  }
  asString(e) {
    return this.baseText.asString(
      this.factories.guestInTheMiddle.create(e, (t) => {
        e.give((t ?? "").replace(/<\/?[^>]+>/gi, " "));
      })
    ), e;
  }
}
var Pe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function lt(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var at = { exports: {} }, Ze, It;
function Pi() {
  if (It) return Ze;
  It = 1;
  var n = 1e3, e = n * 60, t = e * 60, s = t * 24, i = s * 7, r = s * 365.25;
  Ze = function(u, h) {
    h = h || {};
    var p = typeof u;
    if (p === "string" && u.length > 0)
      return o(u);
    if (p === "number" && isFinite(u))
      return h.long ? c(u) : a(u);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(u)
    );
  };
  function o(u) {
    if (u = String(u), !(u.length > 100)) {
      var h = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        u
      );
      if (h) {
        var p = parseFloat(h[1]), y = (h[2] || "ms").toLowerCase();
        switch (y) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return p * r;
          case "weeks":
          case "week":
          case "w":
            return p * i;
          case "days":
          case "day":
          case "d":
            return p * s;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return p * t;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return p * e;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return p * n;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return p;
          default:
            return;
        }
      }
    }
  }
  function a(u) {
    var h = Math.abs(u);
    return h >= s ? Math.round(u / s) + "d" : h >= t ? Math.round(u / t) + "h" : h >= e ? Math.round(u / e) + "m" : h >= n ? Math.round(u / n) + "s" : u + "ms";
  }
  function c(u) {
    var h = Math.abs(u);
    return h >= s ? d(u, h, s, "day") : h >= t ? d(u, h, t, "hour") : h >= e ? d(u, h, e, "minute") : h >= n ? d(u, h, n, "second") : u + " ms";
  }
  function d(u, h, p, y) {
    var m = h >= p * 1.5;
    return Math.round(u / p) + " " + y + (m ? "s" : "");
  }
  return Ze;
}
function Ei(n) {
  t.debug = t, t.default = t, t.coerce = c, t.disable = r, t.enable = i, t.enabled = o, t.humanize = Pi(), t.destroy = d, Object.keys(n).forEach((u) => {
    t[u] = n[u];
  }), t.names = [], t.skips = [], t.formatters = {};
  function e(u) {
    let h = 0;
    for (let p = 0; p < u.length; p++)
      h = (h << 5) - h + u.charCodeAt(p), h |= 0;
    return t.colors[Math.abs(h) % t.colors.length];
  }
  t.selectColor = e;
  function t(u) {
    let h, p = null, y, m;
    function C(...v) {
      if (!C.enabled)
        return;
      const M = C, O = Number(/* @__PURE__ */ new Date()), G = O - (h || O);
      M.diff = G, M.prev = h, M.curr = O, h = O, v[0] = t.coerce(v[0]), typeof v[0] != "string" && v.unshift("%O");
      let Q = 0;
      v[0] = v[0].replace(/%([a-zA-Z%])/g, (P, S) => {
        if (P === "%%")
          return "%";
        Q++;
        const F = t.formatters[S];
        if (typeof F == "function") {
          const k = v[Q];
          P = F.call(M, k), v.splice(Q, 1), Q--;
        }
        return P;
      }), t.formatArgs.call(M, v), (M.log || t.log).apply(M, v);
    }
    return C.namespace = u, C.useColors = t.useColors(), C.color = t.selectColor(u), C.extend = s, C.destroy = t.destroy, Object.defineProperty(C, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => p !== null ? p : (y !== t.namespaces && (y = t.namespaces, m = t.enabled(u)), m),
      set: (v) => {
        p = v;
      }
    }), typeof t.init == "function" && t.init(C), C;
  }
  function s(u, h) {
    const p = t(this.namespace + (typeof h > "u" ? ":" : h) + u);
    return p.log = this.log, p;
  }
  function i(u) {
    t.save(u), t.namespaces = u, t.names = [], t.skips = [];
    let h;
    const p = (typeof u == "string" ? u : "").split(/[\s,]+/), y = p.length;
    for (h = 0; h < y; h++)
      p[h] && (u = p[h].replace(/\*/g, ".*?"), u[0] === "-" ? t.skips.push(new RegExp("^" + u.slice(1) + "$")) : t.names.push(new RegExp("^" + u + "$")));
  }
  function r() {
    const u = [
      ...t.names.map(a),
      ...t.skips.map(a).map((h) => "-" + h)
    ].join(",");
    return t.enable(""), u;
  }
  function o(u) {
    if (u[u.length - 1] === "*")
      return !0;
    let h, p;
    for (h = 0, p = t.skips.length; h < p; h++)
      if (t.skips[h].test(u))
        return !1;
    for (h = 0, p = t.names.length; h < p; h++)
      if (t.names[h].test(u))
        return !0;
    return !1;
  }
  function a(u) {
    return u.toString().substring(2, u.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function c(u) {
    return u instanceof Error ? u.stack || u.message : u;
  }
  function d() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return t.enable(t.load()), t;
}
var Di = Ei;
(function(n, e) {
  e.formatArgs = s, e.save = i, e.load = r, e.useColors = t, e.storage = o(), e.destroy = /* @__PURE__ */ (() => {
    let c = !1;
    return () => {
      c || (c = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), e.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function t() {
    if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
      return !0;
    if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
      return !1;
    let c;
    return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator < "u" && navigator.userAgent && (c = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(c[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function s(c) {
    if (c[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + c[0] + (this.useColors ? "%c " : " ") + "+" + n.exports.humanize(this.diff), !this.useColors)
      return;
    const d = "color: " + this.color;
    c.splice(1, 0, d, "color: inherit");
    let u = 0, h = 0;
    c[0].replace(/%[a-zA-Z%]/g, (p) => {
      p !== "%%" && (u++, p === "%c" && (h = u));
    }), c.splice(h, 0, d);
  }
  e.log = console.debug || console.log || (() => {
  });
  function i(c) {
    try {
      c ? e.storage.setItem("debug", c) : e.storage.removeItem("debug");
    } catch {
    }
  }
  function r() {
    let c;
    try {
      c = e.storage.getItem("debug");
    } catch {
    }
    return !c && typeof process < "u" && "env" in process && (c = process.env.DEBUG), c;
  }
  function o() {
    try {
      return localStorage;
    } catch {
    }
  }
  n.exports = Di(e);
  const { formatters: a } = n.exports;
  a.j = function(c) {
    try {
      return JSON.stringify(c);
    } catch (d) {
      return "[UnexpectedJSONParseError]: " + d.message;
    }
  };
})(at, at.exports);
var T = at.exports;
const ut = /* @__PURE__ */ lt(T), Ri = T.debug("TextNlAsBr");
class Ni {
  constructor(e, t) {
    this.baseText = e, this.factories = t;
  }
  asString(e) {
    return this.baseText.asString(
      this.factories.guestInTheMiddle.create(e, (t) => {
        if (typeof t > "u" || t === null)
          return "";
        const s = "<br />";
        return Ri(t), e.give((t ?? "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, `$1${s}$2`)), !0;
      })
    ), e;
  }
}
const Hi = new R(Ie), Vi = new R(Ie), Ui = new R(ye), zi = new R(pe), Li = new R(K), Qi = new R(Ae), Wi = new R(Qe), Ki = new R(gi), Gi = new R(yi), Yi = new R(K), Ji = new R(ct), Zi = new R(fi), de = {
  cache: Hi,
  chain: Ji,
  guest: zi,
  guestCast: Li,
  guestAware: Qi,
  guestInTheMiddle: Yi,
  guestSync: Zi,
  patron: Ki,
  patronOnce: Gi,
  pool: Wi,
  source: Vi,
  sourceEmpty: Ui
}, qi = new R(xi), Xi = new R(_i), en = new R(ki), tn = new R($i), ls = new R(Mi), sn = new R(Fi, { ...de, svgImage: ls }), nn = new R(Ti, de), rn = new R(Si, de), on = new R(ji, de), an = new R(Bi, de), cn = new R(Ii), ln = new R(Oi, de), un = new R(Ni, de), hn = {
  ...de,
  fileHandlerContent: qi,
  browserFileSaved: Xi,
  transformToString: en,
  transformToObject: tn,
  svgImage: ls,
  svgMapTypeImage: sn,
  numberChunks: nn,
  mapNameFromUrl: rn,
  textNoHtml: on,
  jsonp: an,
  textOf: cn,
  textNlAsBr: un,
  textWithoutHTML: ln
}, Z = () => hn;
class ht {
  constructor(e, t, s) {
    this.notification = e, this.check = t, this.factories = s;
  }
  breakOnFail(e, t) {
    return this.check.check(
      e,
      this.factories.guest.create((s) => {
        s === !0 ? t.give(!0) : this.notification.give({
          type: "error",
          text: s
        });
      })
    ), this;
  }
  continueOnFail(e, t) {
    return this.check.check(
      e,
      this.factories.guest.create((s) => {
        t.give(s), s !== !0 && this.notification.give({
          type: "error",
          text: s
        });
      })
    ), this;
  }
}
const qe = T.debug("MapCurrent");
class us {
  constructor(e, t, s) {
    $(this, "objectsCache");
    $(this, "settingsCache");
    $(this, "typesCache");
    this.mapFile = e, this.mapId = t, this.factories = s, this.objectsCache = s.sourceEmpty.create(), this.settingsCache = s.sourceEmpty.create(), this.typesCache = s.sourceEmpty.create(), e.currentMap(
      s.patron.create(
        s.guest.create((i) => {
          qe("current map changed", i), this.settingsCache.give(i.settings), this.objectsCache.give(Object.values(i.objects)), this.typesCache.give(
            Object.entries(i.types).map(([r, o]) => ({
              ...o,
              id: r
            }))
          );
        })
      )
    );
  }
  settings(e) {
    return this.settingsCache.value(e), e;
  }
  objects(e) {
    return qe("notify about new objects"), this.objectsCache.value(e), e;
  }
  types(e) {
    return this.typesCache.value(e), e;
  }
  give(e) {
    return qe("save map document", e), this.mapId.id(
      this.factories.guest.create((t) => {
        this.mapFile.mapFile(
          this.factories.guest.create((s) => {
            this.mapFile.give({
              ...s,
              [t]: e
            });
          })
        );
      })
    ), this;
  }
}
class dn {
  constructor(e) {
    $(this, "idCache");
    this.idCache = e.cache.create("current");
  }
  id(e) {
    return this.idCache.value(e), e;
  }
  give(e) {
    return this.idCache.give(e), this;
  }
}
class pn {
  constructor(e) {
    this.mapFile = e;
  }
  value(e) {
    return this.mapFile.currentMap(
      new K(e, (t) => {
        e.give(t.settings.title);
      })
    ), this;
  }
}
const Ee = T.debug("MapHistory"), Ot = (n) => {
  const e = JSON.parse(JSON.stringify(n));
  return Object.values(e.objects).forEach((t) => {
    t.width = 0, t.height = 0;
  }), JSON.stringify(e);
};
class fn {
  constructor(e, t, s, i) {
    $(this, "mapsHistory");
    $(this, "historyIndex");
    this.mapFile = e, this.map = t, this.mapId = s, this.factories = i, this.mapsHistory = i.cache.create([]), this.historyIndex = i.cache.create(0), this.mapFile.currentMap(i.patron.create(this)), this.mapId.id(
      i.patron.create(
        i.guest.create(() => {
          this.mapsHistory.give([]), this.historyIndex.give(0);
        })
      )
    );
  }
  give(e) {
    return requestIdleCallback(() => {
      this.historyIndex.value(
        this.factories.guest.create((t) => {
          this.mapsHistory.value(
            this.factories.guest.create((s) => {
              Ee("add map to history", s, e);
              const i = s.some(
                (r) => Ot(r) === Ot(e)
              );
              if (Ee("isMapFromHistory", i), !i) {
                const r = s[t] ? [s[t]] : [];
                this.historyIndex.give(0), this.mapsHistory.give([e, ...r, ...s.slice(0, 9)]);
              }
            })
          );
        })
      );
    }), this;
  }
  isPrevPossible(e) {
    const t = this.factories.chain.create(this);
    return this.historyIndex.value(
      this.factories.guestCast.create(e, t.receiveKey("historyIndex"))
    ), this.mapsHistory.value(this.factories.guestCast.create(e, t.receiveKey("mapsHistory"))), t.result(
      this.factories.guestInTheMiddle.create(
        e,
        ({ historyIndex: s, mapsHistory: i }) => {
          const r = s < i.length - 1;
          Ee("recalculate is prev possible", r), e.give(r);
        }
      )
    ), e;
  }
  prev() {
    this.historyIndex.value(
      this.factories.guest.create((e) => {
        const t = e + 1;
        this.historyIndex.give(t), this.mapsHistory.value(
          this.factories.guest.create((s) => {
            const i = s[t];
            this.map.give(i);
          })
        );
      })
    );
  }
  isNextPossible(e) {
    const t = this.factories.chain.create(this);
    return this.historyIndex.value(
      this.factories.guestCast.create(e, t.receiveKey("historyIndex"))
    ), this.mapsHistory.value(this.factories.guestCast.create(e, t.receiveKey("mapsHistory"))), t.result(
      this.factories.guestInTheMiddle.create(
        e,
        ({ historyIndex: s, mapsHistory: i }) => {
          const r = s > 0 && s <= i.length - 1;
          Ee("recalculate is next possible", r), e.give(r);
        }
      )
    ), e;
  }
  next() {
    this.historyIndex.value(
      this.factories.guest.create((e) => {
        const t = e - 1;
        this.historyIndex.give(t), this.mapsHistory.value(
          this.factories.guest.create((s) => {
            const i = s[t];
            this.map.give(i);
          })
        );
      })
    );
  }
}
class gn {
  constructor(e, t, s) {
    this.mapFile = e, this.mapId = t, this.factories = s;
  }
  give(e) {
    const { guest: t } = this.factories;
    return this.mapFile.mapFile(
      t.create((s) => {
        delete s[e], this.mapFile.give(s), this.mapId.give("current");
      })
    ), this;
  }
}
const De = T.debug("MapFileOfContent");
class mn {
  constructor(e, t, s) {
    $(this, "currentMapPatrons");
    $(this, "mapFileCache");
    this.mapFileContent = e, this.mapId = t, this.factories = s, this.currentMapPatrons = s.pool.create(this), this.mapFileCache = s.cache.create(!1), e.value(
      s.patron.create((i) => {
        if (!i)
          return;
        const r = this.factories.transformToObject.create(i).result();
        De("get map file", r), this.mapFileCache.give(r);
      })
    );
  }
  currentMap(e) {
    const t = this.factories.chain.create();
    return this.mapId.id(this.factories.guestCast.create(e, t.receiveKey("mapId"))), this.mapFile(this.factories.guestCast.create(e, t.receiveKey("mapFile"))), t.result(
      this.factories.guestInTheMiddle.create(
        e,
        ({ mapId: s, mapFile: i }) => {
          if (De("get current map", s, i, typeof i), !i[s])
            this.createEmptyMapByName(s, e);
          else {
            const r = i[s];
            this.currentMapPatrons.distribute(
              r != null && r.structure ? r.structure : r,
              e
            );
          }
        }
      )
    ), e;
  }
  give(e) {
    return De("save map file document", e), this.mapFileContent.give(this.factories.transformToString.create(e).result()), this;
  }
  mapFile(e) {
    return this.mapFileCache.value(e), e;
  }
  createEmptyMapByName(e, t) {
    De("creating empty map by name", e);
    const s = this.factories.transformToObject.create(this.generateEmptyMapFile()).result();
    this.mapFile(
      this.factories.guest.create((i) => {
        this.give({
          ...i,
          [e]: s.current
        }), t.give(s.current);
      })
    );
  }
  generateEmptyMapFile() {
    return '{"current":{"progress":0,"settings":{"colored":false,"title":"current"},"objects":{},"types":{},"url":"/current","parent":""}}';
  }
}
const vn = T.debug("MapFileForRendering");
class An {
  constructor(e, t, s) {
    $(this, "mapCache");
    this.mapId = t, this.factories = s, this.mapCache = s.cache.create({ objects: {}, types: {}, settings: {} }), e.currentMap(s.patron.create(this.mapCache));
  }
  currentMap(e) {
    return this.mapCache.value(e), e;
  }
  mapFile(e) {
    return this.mapCache.value(
      this.factories.guestInTheMiddle.create(e, (t) => {
        this.mapId.id(
          this.factories.guest.create((s) => {
            e.give({ [s]: t });
          })
        );
      })
    ), e;
  }
  give(e) {
    return this.mapId.id(
      this.factories.guest.create((t) => {
        vn("received map file, objects = ", e[t].objects), this.mapCache.give(e[t]);
      })
    ), this;
  }
}
class hs {
  constructor(e, t, s) {
    this.map = e, this.mapFile = t, this.factories = s;
  }
  give(e) {
    return this.mapFile.currentMap(
      this.factories.guest.create((t) => {
        this.map.give({
          ...t,
          objects: {
            ...t.objects,
            [e.id]: {
              ...e,
              createTimestamp: e.createTimestamp ?? Date.now(),
              changeTimestamp: Date.now()
            }
          }
        });
      })
    ), this;
  }
}
const Pt = ut("app:MapObjectCurrent");
class yn {
  constructor(e, t) {
    $(this, "idCache");
    $(this, "silenceActivator");
    this.drawer = e, this.factories = t, this.idCache = t.sourceEmpty.create(), this.silenceActivator = t.source.create(!1), this.idCache.value(
      t.patron.create(
        t.guest.create((s) => {
          s && e.give("object");
        })
      )
    );
  }
  silenceOn(e) {
    return this.silenceActivator.give(e), this;
  }
  silenceOff() {
    return this.silenceActivator.give(!1), this;
  }
  objectId(e) {
    return this.idCache.value(e), e;
  }
  give(e) {
    return Pt("new value current object", e), this.silenceActivator.value(
      this.factories.guest.create((t) => {
        Pt("silence activator", t), t ? t.give(e) : this.idCache.give(e);
      })
    ), this;
  }
}
class bn {
  constructor(e, t) {
    this.mapFile = e, this.factories = t;
  }
  check(e, t) {
    return this.mapFile.currentMap(
      this.factories.guest.create((s) => {
        let i = !1;
        Object.values(s.objects).forEach((r) => {
          i = i || r.arrows.some((o) => o.id === e.id);
        }), t.give(!i || "У объекта есть входящие связи!");
      })
    ), this;
  }
}
const Xe = T.debug("MapObjectNew");
class wn {
  constructor(e, t, s, i, r) {
    this.map = e, this.mapObject = t, this.canvas = s, this.stagePosition = i, this.factories = r;
  }
  byTypeName(e, t) {
    return Xe("start to add new type", e, t), this.stagePosition.position(
      this.factories.guest.create((s) => {
        this.map.types(
          this.factories.guest.create((i) => {
            this.canvas.canvas(
              this.factories.guest.create((r) => {
                const o = r.getBoundingClientRect(), a = i.find((u) => u.id === e);
                Xe("is type found", a);
                const c = t.x - o.left, d = t.y - o.top;
                a && (Xe("add new type"), this.mapObject.give({
                  additionalName: "",
                  arrows: [],
                  description: "",
                  inMenu: !1,
                  lastClick: Date.now(),
                  linked: !1,
                  menuOrder: 0,
                  name: "",
                  outlink: "",
                  targetBlank: !1,
                  type: e,
                  width: a.width,
                  height: a.height,
                  zindex: 0,
                  id: (/* @__PURE__ */ new Date()).getTime().toString(),
                  createTimestamp: Date.now(),
                  changeTimestamp: Date.now(),
                  position: [
                    c > 0 ? c + s.x : 0,
                    d > 0 ? d + s.y : 0
                  ]
                }));
              })
            );
          })
        );
      })
    ), this;
  }
}
class Cn {
  constructor(e, t) {
    this.mapId = e, this.factories = t;
  }
  names(e) {
    return this.mapId.id(
      this.factories.guestInTheMiddle.create(e, (t) => {
        const s = t.split("_").filter((o) => !!o);
        let i = "";
        const r = s.map((o) => {
          const a = `${i}${o}`;
          return i || (i = "_"), i += `${o}_`, a;
        });
        i = "", e.give(r);
      })
    ), e;
  }
}
class xn {
  constructor(e) {
    this.mapObject = e;
  }
  give(e) {
    const { arrows: t } = e.object;
    return t.splice(e.index, 1), this.mapObject.give({
      ...e.object,
      arrows: t
    }), this;
  }
}
class _n {
  constructor(e, t, s, i) {
    this.map = e, this.mapFile = t, this.checks = s, this.factories = i;
  }
  give(e) {
    const t = this.factories.chain.create(this);
    return this.checks.forEach((s, i) => {
      s.breakOnFail(e, t.receiveKey(String(i)));
    }), t.result(
      this.factories.guest.create(() => {
        this.mapFile.currentMap(
          this.factories.guest.create((s) => {
            delete s.objects[e.id], this.map.give(s);
          })
        );
      })
    ), this;
  }
}
const $n = T.debug("MapObjectsLink");
class kn {
  constructor(e, t, s, i, r) {
    $(this, "objectIdsCache");
    this.mapObjectCurrent = e, this.map = t, this.mapObject = s, this.newArrow = i, this.factories = r, this.objectIdsCache = r.cache.create([]);
  }
  objectIds(e) {
    return this.objectIdsCache.value(e), e;
  }
  startLink() {
    this.mapObjectCurrent.give(""), this.objectIdsCache.value(
      this.factories.guest.create((e) => {
        if (e.length) {
          this.mapObjectCurrent.silenceOff(), this.objectIdsCache.give([]);
          return;
        }
        const t = ["first"];
        this.objectIdsCache.give(t), this.mapObjectCurrent.silenceOn(
          this.factories.guest.create((s) => {
            t.push(s), this.objectIdsCache.give([...t]), $n("object ids", t), t.length === 2 && this.map.objects(
              this.factories.guest.create((i) => {
                const [, r] = t, o = i.find((a) => a.id === r);
                o && this.newArrow.forObject(o);
              })
            ), t.length === 3 && (this.newArrow.dispose(), this.mapObjectCurrent.silenceOff(), this.map.objects(
              this.factories.guest.create((i) => {
                const [, r, o] = t, a = i.find((c) => c.id === r);
                a && o && (this.objectIdsCache.give([]), this.mapObject.give({
                  ...a,
                  arrows: [
                    ...a.arrows,
                    {
                      id: o,
                      label: ""
                    }
                  ]
                }));
              })
            ));
          })
        );
      })
    );
  }
}
function Mn(n) {
  var e = typeof n;
  return n != null && (e == "object" || e == "function");
}
var dt = Mn, Fn = typeof Pe == "object" && Pe && Pe.Object === Object && Pe, Tn = Fn, Sn = Tn, jn = typeof self == "object" && self && self.Object === Object && self, Bn = Sn || jn || Function("return this")(), ds = Bn, In = ds, On = function() {
  return In.Date.now();
}, Pn = On, En = /\s/;
function Dn(n) {
  for (var e = n.length; e-- && En.test(n.charAt(e)); )
    ;
  return e;
}
var Rn = Dn, Nn = Rn, Hn = /^\s+/;
function Vn(n) {
  return n && n.slice(0, Nn(n) + 1).replace(Hn, "");
}
var Un = Vn, zn = ds, Ln = zn.Symbol, ps = Ln, Et = ps, fs = Object.prototype, Qn = fs.hasOwnProperty, Wn = fs.toString, _e = Et ? Et.toStringTag : void 0;
function Kn(n) {
  var e = Qn.call(n, _e), t = n[_e];
  try {
    n[_e] = void 0;
    var s = !0;
  } catch {
  }
  var i = Wn.call(n);
  return s && (e ? n[_e] = t : delete n[_e]), i;
}
var Gn = Kn, Yn = Object.prototype, Jn = Yn.toString;
function Zn(n) {
  return Jn.call(n);
}
var qn = Zn, Dt = ps, Xn = Gn, er = qn, tr = "[object Null]", sr = "[object Undefined]", Rt = Dt ? Dt.toStringTag : void 0;
function ir(n) {
  return n == null ? n === void 0 ? sr : tr : Rt && Rt in Object(n) ? Xn(n) : er(n);
}
var nr = ir;
function rr(n) {
  return n != null && typeof n == "object";
}
var or = rr, ar = nr, cr = or, lr = "[object Symbol]";
function ur(n) {
  return typeof n == "symbol" || cr(n) && ar(n) == lr;
}
var hr = ur, dr = Un, Nt = dt, pr = hr, Ht = NaN, fr = /^[-+]0x[0-9a-f]+$/i, gr = /^0b[01]+$/i, mr = /^0o[0-7]+$/i, vr = parseInt;
function Ar(n) {
  if (typeof n == "number")
    return n;
  if (pr(n))
    return Ht;
  if (Nt(n)) {
    var e = typeof n.valueOf == "function" ? n.valueOf() : n;
    n = Nt(e) ? e + "" : e;
  }
  if (typeof n != "string")
    return n === 0 ? n : +n;
  n = dr(n);
  var t = gr.test(n);
  return t || mr.test(n) ? vr(n.slice(2), t ? 2 : 8) : fr.test(n) ? Ht : +n;
}
var yr = Ar, br = dt, et = Pn, Vt = yr, wr = "Expected a function", Cr = Math.max, xr = Math.min;
function _r(n, e, t) {
  var s, i, r, o, a, c, d = 0, u = !1, h = !1, p = !0;
  if (typeof n != "function")
    throw new TypeError(wr);
  e = Vt(e) || 0, br(t) && (u = !!t.leading, h = "maxWait" in t, r = h ? Cr(Vt(t.maxWait) || 0, e) : r, p = "trailing" in t ? !!t.trailing : p);
  function y(P) {
    var S = s, F = i;
    return s = i = void 0, d = P, o = n.apply(F, S), o;
  }
  function m(P) {
    return d = P, a = setTimeout(M, e), u ? y(P) : o;
  }
  function C(P) {
    var S = P - c, F = P - d, k = e - S;
    return h ? xr(k, r - F) : k;
  }
  function v(P) {
    var S = P - c, F = P - d;
    return c === void 0 || S >= e || S < 0 || h && F >= r;
  }
  function M() {
    var P = et();
    if (v(P))
      return O(P);
    a = setTimeout(M, C(P));
  }
  function O(P) {
    return a = void 0, p && s ? y(P) : (s = i = void 0, o);
  }
  function G() {
    a !== void 0 && clearTimeout(a), d = 0, s = c = i = a = void 0;
  }
  function Q() {
    return a === void 0 ? o : O(et());
  }
  function ne() {
    var P = et(), S = v(P);
    if (s = arguments, i = this, c = P, S) {
      if (a === void 0)
        return m(c);
      if (h)
        return clearTimeout(a), a = setTimeout(M, e), y(c);
    }
    return a === void 0 && (a = setTimeout(M, e)), o;
  }
  return ne.cancel = G, ne.flush = Q, ne;
}
var gs = _r;
const Ce = /* @__PURE__ */ lt(gs), $r = (n) => {
  if (n[n.length - 1] === "/") {
    const e = n.split("");
    return e.splice(e.length - 1, 1), e.join("");
  }
  return n;
}, kr = Ce((n) => {
  window == null || window.open(n);
}, 200), tt = T.debug("MapObjectUrl");
class Mr {
  constructor(e, t) {
    this.mapId = e, this.factories = t;
  }
  open(e, t) {
    if (e != null && e.linked) {
      const s = e.outlink;
      e.targetBlank ? kr(s) : (tt("open new map", s), this.factories.mapNameFromUrl.create(
        this.factories.source.create(s)
      ).name(
        this.factories.guest.create((r) => {
          tt("open map name", s, r), t.give(r);
        })
      ));
    }
    return this;
  }
  url(e, t) {
    return e.value(
      this.factories.guestInTheMiddle.create(t, (s) => {
        this.mapId.id(
          this.factories.guest.create((i) => {
            const r = i[0] === "_" ? i.replaceAll("_", "/") : "/current", o = s.name ? s.name : s.additionalName ? s.additionalName : "";
            this.factories.textNoHtml.create(this.factories.source.create(o)).noHtml(
              this.factories.guest.create((a) => {
                let c = s.outlink ? s.outlink : `${r}/${Fr(a)}`;
                tt("link is", c), c = $r(c), t.give(c);
              })
            );
          })
        );
      })
    ), t;
  }
}
function Fr(n) {
  return n.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}
const Tr = T.debug("ObjectPositionBounds");
class Sr {
  constructor(e, t) {
    this.stageSize = e, this.factories = t;
  }
  position(e, t, s) {
    return this.stageSize.value(
      this.factories.guestInTheMiddle.create(s, (i) => {
        let { x: r, y: o } = t;
        r < 30 && (r = 30), o < 30 && (o = 30);
        const a = i.width - e.width;
        r > a && (r = a);
        const c = i.height - e.height;
        o > c && (o = c), Tr("position", r, o), s.give({ x: r, y: o });
      })
    ), s;
  }
}
const Re = 15;
class jr {
  constructor(e, t) {
    this.baseRestriction = e, this.factories = t;
  }
  position(e, t, s) {
    return this.baseRestriction.position(
      e,
      t,
      this.factories.guestInTheMiddle.create(s, (i) => {
        s.give({
          x: Math.round(i.x / Re) * Re,
          y: Math.round(i.y / Re) * Re
        });
      })
    ), s;
  }
}
const Ut = {
  x: "width",
  y: "height"
}, st = {
  x: 0,
  y: 1
}, Br = {
  positive: 1,
  negative: -1
}, zt = T.debug("ObjectsOutsideScreen");
class Ir {
  constructor(e, t, s, i) {
    this.map = e, this.stageSize = t, this.layer = s, this.factories = i;
  }
  count(e, t) {
    const s = e.direction === "positive", i = this.factories.chain.create();
    return this.map.objects(this.factories.guestCast.create(t, i.receiveKey("objects"))), this.layer.layer(this.factories.guestCast.create(t, i.receiveKey("layer"))), this.layer.position(this.factories.guestCast.create(t, i.receiveKey("position"))), i.result(
      this.factories.guestInTheMiddle.create(
        t,
        ({ objects: r, layer: o, position: a }) => {
          var h;
          const c = Br[e.direction], u = r.sort(
            (p, y) => p.position[st[e.axis]] * c - y.position[st[e.axis]] * c
          ).filter((p) => {
            const y = p.position[st[e.axis]] + (s ? 0 : p[Ut[e.axis]]), m = a[e.axis] * -1 + (s ? o[Ut[e.axis]]() : 0);
            return zt(
              "mb nearest points",
              e.direction,
              "objectP=",
              y,
              "screenP=",
              m
            ), s ? y > m : y < m;
          });
          zt("nearest", u), t.give({
            count: u.length,
            nearestObjectId: ((h = u.at(s ? -1 : 0)) == null ? void 0 : h.id) ?? ""
          });
        }
      )
    ), t;
  }
}
class Or {
  constructor(e, t, s) {
    this.mapFile = e, this.map = t, this.factories = s;
  }
  give(e) {
    return this.mapFile.currentMap(
      this.factories.guest.create((t) => {
        this.map.give({
          ...t,
          settings: e
        });
      })
    ), this;
  }
}
class Pr {
  constructor(e) {
    $(this, "idCache");
    this.idCache = e.sourceEmpty.create();
  }
  typeId(e) {
    return this.idCache.value(e), e;
  }
  give(e) {
    return this.idCache.give(e), this;
  }
}
class Er {
  constructor(e) {
    this.mapType = e;
  }
  byName() {
    const e = String((/* @__PURE__ */ new Date()).getTime());
    this.mapType.give({
      name: e,
      type: {
        id: e,
        name: "Новый тип",
        svg: '<div style="background: lightyellow;border: 1px solid #ccc;">type</div>',
        width: 100,
        height: 40
      }
    });
  }
}
class Dr {
  constructor(e, t, s, i) {
    this.map = e, this.mapFile = t, this.checks = s, this.factories = i;
  }
  give(e) {
    const t = this.factories.chain.create(this);
    return this.checks.forEach((s, i) => {
      s.breakOnFail(
        {
          name: e.id,
          type: e
        },
        t.receiveKey(String(i))
      );
    }), t.result(
      this.factories.guest.create(() => {
        this.mapFile.currentMap(
          this.factories.guest.create((s) => {
            delete s.types[e.id], this.map.give(s);
          })
        );
      })
    ), this;
  }
}
class Rr {
  constructor(e, t, s, i) {
    this.map = e, this.mapFile = t, this.checks = s, this.factories = i;
  }
  give(e) {
    const t = this.factories.chain.create(this);
    return this.checks.forEach((s, i) => {
      s.breakOnFail(e, t.receiveKey(String(i)));
    }), t.result(
      this.factories.guest.create(() => {
        this.mapFile.currentMap(
          this.factories.guest.create((s) => {
            delete s.types[e.name], this.map.give({
              ...s,
              types: {
                ...s.types,
                [e.type.name]: e.type
              }
            });
          })
        );
      })
    ), this;
  }
}
const Nr = T.debug("MapTypeUsed");
class Hr {
  constructor(e, t) {
    this.mapFile = e, this.factories = t;
  }
  check(e, t) {
    return this.mapFile.currentMap(
      this.factories.guest.create((s) => {
        const i = Object.values(s.objects).some(
          (r) => r.type === e.name
        );
        Nr("is type used", i), t.give(!i || "Тип карты использован");
      })
    ), this;
  }
}
class Vr {
  constructor(e, t) {
    this.mapTypeUsedCheck = e, this.factories = t;
  }
  check(e, t) {
    return this.mapTypeUsedCheck.check(
      e,
      this.factories.guest.create((s) => {
        s !== !0 && e.name !== e.type.name ? t.give("Нельзя изменять имя типа, который использован!") : t.give(!0);
      })
    ), this;
  }
}
const Lt = T.debug("ParentTypes");
class Ur {
  constructor(e, t, s) {
    this.parentNames = e, this.mapFile = t, this.factories = s;
  }
  types(e) {
    Lt("parent types requested");
    const t = this.factories.chain.create();
    return this.parentNames.names(this.factories.guestCast.create(e, t.receiveKey("parentNames"))), this.mapFile.mapFile(this.factories.guestCast.create(e, t.receiveKey("mapFile"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ parentNames: s, mapFile: i }) => {
        const r = s.slice(0, -1);
        Lt("parent names", r);
        const o = {};
        r.map((c) => i[c]).forEach((c) => {
          Object.values(c.types).forEach((d) => {
            o[d.name] = d;
          });
        }), e.give(Object.values(o));
      })
    ), e;
  }
}
const Qt = T.debug("ObjectsMatchedToQuery");
class zr {
  constructor(e, t) {
    this.map = e, this.factories = t;
  }
  objects(e, t) {
    return e.value(
      this.factories.guestInTheMiddle.create(
        t,
        Ce((i) => {
          i = i.toLowerCase(), this.map.objects(
            this.factories.guest.create((r) => {
              if (!i) {
                Qt("reset results"), t.give([]);
                return;
              }
              const o = r.filter(
                (a) => {
                  var c;
                  return a.name.toLowerCase().includes(i) || ((c = a.additionalName) == null ? void 0 : c.toLowerCase().includes(i)) || Object.values(a.additionalFields ?? {}).join(" ").toLowerCase().includes(i);
                }
              );
              Qt("objects in searching", o, i), t.give(o);
            })
          );
        }, 500)
      )
    ), t;
  }
}
const Lr = {
  height: 3e3,
  width: 3e3
};
class Qr {
  value(e) {
    return e.give(Lr), e;
  }
}
const Wt = T.debug("StageMoveRestriction");
class Wr {
  constructor(e, t, s) {
    this.canvasDep = e, this.stageSize = t, this.factories = s;
  }
  position(e, t) {
    return this.canvasDep.canvas(
      this.factories.guest.create((s) => {
        this.stageSize.value(
          this.factories.guest.create((i) => {
            Wt("income position", e);
            const r = i.width - s.clientWidth, o = i.height - s.clientHeight, a = e.x * -1, c = e.y * -1;
            if (o < 0 || r < 0)
              return { x: 0, y: 0 };
            Wt("boundings", o, r, c, a), t.give({
              x: e.x > 0 ? 0 : a > r ? r * -1 : e.x,
              y: e.y > 0 ? 0 : c > o ? o * -1 : e.y
            });
          })
        );
      })
    ), t;
  }
}
const $e = T.debug("app:MapObjectsVisible");
class Kr {
  constructor(e, t, s, i) {
    $(this, "visibleObjectsCache", new ye());
    $e("constructor initialized");
    const r = i.chain.create();
    t.size(i.patron.create(r.receiveKey("size"))), e.position(i.patron.create(r.receiveKey("position"))), s.currentMap(i.patron.create(r.receiveKey("map"))), r.result(
      i.patron.create(
        i.guest.create(({ position: o, size: a, map: c }) => {
          const d = Object.values(c.objects);
          $e("objects come to result", d);
          const u = d.filter((h) => {
            const p = c.types[h.type] ?? {}, y = {
              width: h.width || p.width,
              height: h.height || p.height
            };
            return this.isInBounding(o, a, h.position, y);
          });
          $e("visible objects calculated", u), this.visibleObjectsCache.give(u);
        })
      )
    );
  }
  objects(e) {
    return this.visibleObjectsCache.value(e), this;
  }
  isInBounding(e, t, s, i) {
    const r = e.x, o = e.x - t.width, a = e.y, c = e.y - t.height, [d, u] = s;
    return $e("bounding vars", r, o, a, c), $e("object position", s), r > -d - i.width && -d > o && a > -u - i.height && -u > c;
  }
}
const Gr = (n, e) => {
  const t = n.matchAll(e);
  return Array.from(t).map((s) => s[1]);
}, Yr = (n, e) => n.reduce((t, s) => (t[s] = e[s] || s, t), {});
class Jr {
  constructor(e, t, s, i) {
    this.mapFile = t, this.mapObject = s, this.factories = i, e.objectId(this);
  }
  give(e) {
    return this.mapFile.currentMap(
      this.factories.guest.create((t) => {
        const s = t.objects[e];
        if (!s)
          return;
        const i = t.types[s.type], r = /\$\{([a-zA-Z1-9]+)\}/g, a = Gr(i.svg, r).filter((c) => c !== "width" && c !== "height");
        s.additionalFields = Yr(a, s.additionalFields ?? {}), this.mapObject.give(s);
      })
    ), this;
  }
  introduction() {
    return "patron";
  }
}
const Kt = 20, Zr = ut("ArrowPath");
class qr {
  constructor() {
    $(this, "filledPoints", /* @__PURE__ */ new Map());
  }
  clear() {
    this.filledPoints.clear();
  }
  breakPoints(e, t, s) {
    const i = this.arrowPointPosition(
      e.shapeGeometry,
      e.shapePosition,
      e.lookToGeometry,
      e.lookToPosition
    ), r = this.arrowPointPosition(
      t.shapeGeometry,
      t.shapePosition,
      t.lookToGeometry,
      t.lookToPosition
    );
    return s.give([
      +i.point.x + i.shift.x,
      +i.point.y + i.shift.y,
      +i.breakPoint.x + i.shift.x,
      +i.breakPoint.y + i.shift.y,
      +r.breakPoint.x + r.shift.x,
      +r.breakPoint.y + r.shift.y,
      +r.point.x + r.shift.x,
      +r.point.y + r.shift.y
    ]), this;
  }
  arrowPointPosition(e, t, s, i) {
    const r = {
      x: +i.x + Math.round(s.width / 2),
      y: +i.y + Math.round(s.height / 2)
    }, o = {
      x: +t.x + Math.round(e.width / 2),
      y: +t.y + Math.round(e.height / 2)
    }, a = Math.abs(r.x - o.x) - (s.width + Kt), c = Math.abs(r.y - o.y) - (s.height + Kt);
    return a < 0 || c < 0 ? (Zr("ArrowPath", a, c), this.arrowPointPositionNear(
      e,
      t,
      s,
      i
    )) : this.arrowPointPositionFar(
      e,
      t,
      s,
      i
    );
  }
  arrowPointPositionNear(e, t, s, i) {
    const r = {
      x: +i.x + Math.round(s.width / 2),
      y: +i.y + Math.round(s.height / 2)
    }, o = {
      x: +t.x + Math.round(e.width / 2),
      y: +t.y + Math.round(e.height / 2)
    }, a = o.x - r.x, c = o.y - r.y, d = Math.abs(c) > Math.abs(a);
    let u = +t.x, h = +t.y;
    const p = d && c >= 0, y = !d && a >= 0, m = d && c < 0, C = !d && a < 0, v = { x: 0, y: 0 };
    let M = 0, O = 0;
    p ? (u += Math.round(e.width / 2), v.x = u, v.y = (t.y + i.y + s.height) / 2, M = i.x > t.x ? 1 : -1) : C ? (h += Math.round(e.height / 2), u += +e.width, v.x = (t.x + e.width + i.x) / 2, v.y = h, O = i.y > t.y ? 1 : -1) : m ? (u += Math.round(e.width / 2), h += +e.height, v.x = u, v.y = (t.y + e.height + i.y) / 2, M = i.x > t.x ? 1 : -1) : y && (h += Math.round(e.height / 2), v.x = (t.x + i.x + s.width) / 2, v.y = h, O = i.y > t.y ? 1 : -1);
    const G = [u, h].join("-"), Q = this.filledPoints.get(G) || 0;
    return this.filledPoints.set(G, Q + 1), {
      point: { x: u, y: h },
      breakPoint: v,
      shift: {
        x: M * Q * 10,
        y: O * Q * 10
      }
    };
  }
  arrowPointPositionFar(e, t, s, i) {
    const r = [];
    let c = 0, d = 0;
    const u = [0, 0].join("-"), h = this.filledPoints.get(u) || 0;
    return {
      point: { x: 0, y: 0 },
      breakPoint: r,
      shift: {
        x: c * h * 10,
        y: d * h * 10
      }
    };
  }
}
class Xr {
  constructor(e, t) {
    this.baseSource = e, this.targetSourceFactory = t;
  }
  value(e) {
    const t = new ct();
    return this.baseSource.value(
      new K(e, (s) => {
        s.forEach((i, r) => {
          this.targetSourceFactory.create(
            new Ae((a) => {
              L(i, a);
            })
          ).value(t.receiveKey("" + r));
        });
      })
    ), t.resultArray(e), this;
  }
}
var eo = gs, to = dt, so = "Expected a function";
function io(n, e, t) {
  var s = !0, i = !0;
  if (typeof n != "function")
    throw new TypeError(so);
  return to(t) && (s = "leading" in t ? !!t.leading : s, i = "trailing" in t ? !!t.trailing : i), eo(n, e, {
    leading: s,
    maxWait: e,
    trailing: i
  });
}
var no = io;
const ro = /* @__PURE__ */ lt(no);
class oo {
  constructor(e) {
    this.buildingFn = e;
  }
  create(...e) {
    return this.buildingFn(...e);
  }
}
class ao {
  constructor(e, t) {
    this.objectsSource = e, this.objectsMapSource = t;
  }
  value(e) {
    const t = new ct();
    return this.objectsSource.value(new K(e, t.receiveKey("objects"))), this.objectsMapSource.value(new K(e, t.receiveKey("objectsMap"))), t.result(
      new K(
        e,
        ({ objects: s, objectsMap: i }) => {
          const r = [];
          s.forEach((o) => {
            o.arrows.forEach((a) => {
              const c = i[a.id];
              c && r.push({
                fromObject: o,
                toObject: c
              });
            });
          }), L(r, e);
        }
      )
    ), this;
  }
}
class co {
  constructor(e, t = 10) {
    this.arrowDepsSource = e, this.centerGap = t;
  }
  value(e) {
    return this.arrowDepsSource.value(
      new K(e, ({ fromObject: t, toObject: s }) => {
        const i = {
          width: t.width,
          height: t.height
        }, r = {
          x: t.position[0],
          y: t.position[1]
        }, o = {
          width: s.width,
          height: s.height
        }, a = {
          x: s.position[0],
          y: s.position[1]
        }, c = {
          x: +a.x + Math.round(o.width / 2),
          y: +a.y + Math.round(o.height / 2)
        }, d = {
          x: +r.x + Math.round(i.width / 2),
          y: +r.y + Math.round(i.height / 2)
        }, u = Math.abs(c.x - d.x) - (o.width + this.centerGap), h = Math.abs(c.y - d.y) - (o.height + this.centerGap);
        L({
          fromObject: t,
          toObject: s,
          type: u < 0 || h < 0 ? "threeBreaks" : "twoBreaks"
        }, e);
      })
    ), this;
  }
}
class lo {
  constructor(e) {
    this.guestAwares = e;
  }
  value(e) {
    let t = null;
    return this.guestAwares.forEach((s) => {
      s.value(
        new K(e, (i) => {
          (!t || t === s) && (L(i, e), t = s);
        })
      );
    }), this;
  }
}
class uo {
  constructor(e) {
    this.arrowDeps = e;
  }
  value(e) {
    return this.arrowDeps.value(
      new K(e, (t) => {
        t.type === "twoBreaks" && L({
          key: t.fromObject.id + "-" + t.toObject.id,
          points: this.points(t.fromObject, t.toObject)
        }, e);
      })
    ), this;
  }
  points(e, t) {
    const s = {
      startHeight: e.position[1],
      startWidth: e.position[0],
      midHeight: e.position[1] + Math.round(e.height / 2),
      midWidth: e.position[0] + Math.round(e.width / 2),
      fullHeight: e.position[1] + e.height,
      fullWidth: e.position[0] + e.width / 2
    }, i = {
      startHeight: t.position[1],
      startWidth: t.position[0],
      midHeight: t.position[1] + Math.round(t.height / 2),
      midWidth: t.position[0] + Math.round(t.width / 2),
      fullHeight: t.position[1] + t.height,
      fullWidth: t.position[0] + t.width / 2
    }, r = {
      "left-top": () => [s.fullWidth, s.midHeight, i.midWidth, s.midHeight, i.midWidth, i.startHeight],
      "right-top": () => [
        s.startWidth,
        s.midHeight,
        i.midWidth,
        s.midHeight,
        i.midWidth,
        i.startHeight
      ],
      "left-bottom": () => [s.fullWidth, s.midHeight, i.midWidth, s.fullHeight, i.midWidth, i.fullHeight],
      "right-bottom": () => [s.startWidth, s.midHeight, i.midWidth, s.fullHeight, i.midWidth, i.fullHeight]
    }, o = Object.entries(r).reduce((a, [c, d]) => (d() && (a = c), a), "left-top");
    return r[o]();
  }
}
class ho {
  constructor(e) {
    this.arrowDeps = e;
  }
  value(e) {
    return this.arrowDeps.value(
      new K(e, (t) => {
        if (t.type !== "threeBreaks")
          return;
        const s = this.points(t.fromObject, t.toObject), i = this.points(t.toObject, t.fromObject);
        L({
          key: t.fromObject.id + "-" + t.toObject.id,
          points: [
            +s.point.x + s.shift.x,
            +s.point.y + s.shift.y,
            +s.breakPoint.x + s.shift.x,
            +s.breakPoint.y + s.shift.y,
            +i.breakPoint.x + i.shift.x,
            +i.breakPoint.y + i.shift.y,
            +i.point.x + i.shift.x,
            +i.point.y + i.shift.y
          ]
        }, e);
      })
    ), this;
  }
  points(e, t) {
    const s = {
      x: +t.position[0] + Math.round(t.width / 2),
      y: +t.position[1] + Math.round(t.height / 2)
    }, i = {
      x: +e.position[0] + Math.round(e.width / 2),
      y: +e.position[1] + Math.round(e.height / 2)
    }, r = i.x - s.x, o = i.y - s.y, a = Math.abs(o) > Math.abs(r);
    let c = +e.position[0], d = +e.position[1];
    const u = a && o >= 0, h = !a && r >= 0, p = a && o < 0, y = !a && r < 0, m = { x: 0, y: 0 };
    let C = 0, v = 0;
    return u ? (c += Math.round(e.width / 2), m.x = c, m.y = (e.position[1] + t.position[1] + t.height) / 2, C = t.position[0] > e.position[0] ? 1 : -1) : y ? (d += Math.round(e.height / 2), c += +e.width, m.x = (e.position[0] + e.width + t.position[0]) / 2, m.y = d, v = t.position[1] > e.position[1] ? 1 : -1) : p ? (c += Math.round(e.width / 2), d += +e.height, m.x = c, m.y = (e.position[1] + e.height + t.position[1]) / 2, C = t.position[1] > e.position[1] ? 1 : -1) : h && (d += Math.round(e.height / 2), m.x = (e.position[0] + t.position[0] + t.width) / 2, m.y = d, v = t.position[1] > e.position[1] ? 1 : -1), {
      point: { x: c, y: d },
      breakPoint: m,
      shift: {
        x: C,
        y: v
      }
    };
  }
}
const { Arrow: po } = he, fo = T.debug("MapObjectsArrows");
class go {
  constructor(e, t, s, i, r) {
    $(this, "previouslyRenderedArrows", /* @__PURE__ */ new Map());
    this.konvaLayer = e, this.mapFile = t, this.mapDep = s, this.arrowPath = i, this.factories = r, fo("draw arrows on canvas");
    const o = this.factories.chain.create();
    this.konvaLayer.layer(this.factories.patron.create(o.receiveKey("layer"))), this.mapFile.currentMap(this.factories.patron.create(o.receiveKey("map"))), this.mapDep.objects(this.factories.patron.create(o.receiveKey("objects"))), o.result(
      this.factories.patron.create(
        this.factories.guest.create(
          ro(({ layer: a, map: c, objects: d }) => {
            const u = d.reduce((p, y) => (p[y.id] = y, p), {});
            new Xr(new ao(
              new Ae((p) => L(d, p)),
              new Ae((p) => L(u, p))
            ), new oo((p) => {
              const y = new co(p);
              return new lo([new uo(y), new ho(y)]);
            })).value((p) => {
              p.forEach((y) => {
                const m = y.key;
                if (this.previouslyRenderedArrows.has(m)) {
                  const v = this.previouslyRenderedArrows.get(m);
                  v.arrow.show(), v.arrow.points(y.points);
                  return;
                }
                const C = new po({
                  x: 0,
                  y: 0,
                  points: y.points,
                  pointerLength: 20,
                  pointerWidth: 10,
                  fill: "#ccc",
                  stroke: "#bbb",
                  strokeWidth: 2,
                  zIndex: 2
                });
                this.previouslyRenderedArrows.set(m, {
                  arrow: C
                }), a.add(C);
              });
            });
          }, 50)
        )
      )
    );
  }
  introduction() {
    return "patron";
  }
}
const { Arrow: mo } = he, it = T.debug("NewArrow"), Gt = {
  width: 10,
  height: 10
};
class vo {
  constructor(e, t, s, i) {
    $(this, "cursorGuest");
    $(this, "arrowCache");
    this.konvaLayer = e, this.cursorPosition = t, this.arrowPath = s, this.factories = i, this.cursorGuest = this.factories.sourceEmpty.create(), this.arrowCache = this.factories.sourceEmpty.create();
  }
  /**
   * Создать новую стрелку для объекта
   */
  forObject(e) {
    it("start watch cursor"), this.cursorGuest.value(
      this.factories.guest.create((i) => {
        jt(i);
      })
    );
    let t = null;
    const s = this.factories.patron.create(
      this.factories.guest.create((i) => {
        it("cursor moves"), this.konvaLayer.layer(
          this.factories.guest.create((r) => {
            it("cursor moves in layer"), this.arrowPath.breakPoints(
              {
                shapeGeometry: {
                  width: e.width,
                  height: e.height
                },
                shapePosition: {
                  x: e.position[0],
                  y: e.position[1]
                },
                lookToGeometry: Gt,
                lookToPosition: i
              },
              {
                lookToGeometry: {
                  width: e.width,
                  height: e.height
                },
                lookToPosition: {
                  x: e.position[0],
                  y: e.position[1]
                },
                shapeGeometry: Gt,
                shapePosition: i
              },
              this.factories.guest.create((o) => {
                if (t) {
                  t.points(o);
                  return;
                }
                t = new mo({
                  x: 0,
                  y: 0,
                  points: o,
                  pointerLength: 20,
                  pointerWidth: 10,
                  fill: "#ccc",
                  stroke: "#bbb",
                  strokeWidth: 2,
                  zIndex: 2
                }), r.add(t), this.arrowCache.give(t);
              })
            );
          })
        ), this.arrowPath.clear();
      })
    );
    this.cursorPosition.value(s), this.cursorGuest.give(s);
  }
  /**
   * Отмена стрелки
   */
  dispose() {
    this.cursorGuest.value(
      this.factories.guest.create((e) => {
        jt(e);
      })
    ), this.arrowCache.value(
      this.factories.guest.create((e) => {
        e.remove();
      })
    );
  }
}
const ke = T.debug("MapObjectBackground"), Ao = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD//gATQ3JlYXRlZCB3aXRoIEdJTVD/4gKwSUNDX1BST0ZJTEUAAQEAAAKgbGNtcwQwAABtbnRyUkdCIFhZWiAH6AAMAAQADQAqAAthY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1kZXNjAAABIAAAAEBjcHJ0AAABYAAAADZ3dHB0AAABmAAAABRjaGFkAAABrAAAACxyWFlaAAAB2AAAABRiWFlaAAAB7AAAABRnWFlaAAACAAAAABRyVFJDAAACFAAAACBnVFJDAAACFAAAACBiVFJDAAACFAAAACBjaHJtAAACNAAAACRkbW5kAAACWAAAACRkbWRkAAACfAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACQAAAAcAEcASQBNAFAAIABiAHUAaQBsAHQALQBpAG4AIABzAFIARwBCbWx1YwAAAAAAAAABAAAADGVuVVMAAAAaAAAAHABQAHUAYgBsAGkAYwAgAEQAbwBtAGEAaQBuAABYWVogAAAAAAAA9tYAAQAAAADTLXNmMzIAAAAAAAEMQgAABd7///MlAAAHkwAA/ZD///uh///9ogAAA9wAAMBuWFlaIAAAAAAAAG+gAAA49QAAA5BYWVogAAAAAAAAJJ8AAA+EAAC2xFhZWiAAAAAAAABilwAAt4cAABjZcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltjaHJtAAAAAAADAAAAAKPXAABUfAAATM0AAJmaAAAmZwAAD1xtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAEcASQBNAFBtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEL/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAAeAB4DAREAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAwUEAAj/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAH1SCMTDaCMTiuCMTDgxDGf/8QAHhAAAgIBBQEAAAAAAAAAAAAAAAMBAgQFExUyMxL/2gAIAQEAAQUCG9TUPHdga2PndgzrxZQ3qah48gsvnUtHILMrKq5f/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAwEBPwEH/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAgEBPwEH/8QAHhAAAgIBBQEAAAAAAAAAAAAAAAECMXIQQUKSsVH/2gAIAQEABj8CFkvdFkVLqzla4v6VLqxXe60WS90WRUipWipCSTvc/8QAIxAAAgADCAMAAAAAAAAAAAAAAAEQUfAhMUGhscHR8RFhcf/aAAgBAQABPyErMkMi0ZW2wylmzHorbYSSX3Vg5wrMkMi0Z0a5FVK8Llg05nRrkRmteVg//9oADAMBAAIAAwAAABCCQQSCSST/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAEDAQE/EAf/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAECAQE/EAf/xAAeEAEAAQQCAwAAAAAAAAAAAAABIRARIDEAQVFxkf/aAAgBAQABPxDEMgTA4U0lpO6EwKiFh/YAyDIEAZSTdCnwUQAma0AtZOl88//Z";
class yo {
  constructor(e, t, s, i) {
    $(this, "mapNameCache");
    this.konvaLayer = e, this.mapFile = t, this.zIndex = s, this.factories = i, this.mapNameCache = i.cache.create(""), this.mapFile.currentMap(i.patron.create(this));
  }
  give(e) {
    return this.konvaLayer.layer(
      this.factories.patronOnce.create((t) => {
        ke("map received in background", e), this.mapNameCache.value(
          this.factories.guest.create((s) => {
            if (s === e.url)
              return;
            ke("background cache is not equals", s), this.mapNameCache.give(e.url);
            const i = new Image(), r = document.querySelector(".grid-example");
            ke("grid example", r), i.src = Ao, i.onload = () => {
              ke("canvas pattern loaded"), ke("konva layer loaded");
              const o = new he.Rect({
                width: 3e3,
                height: 3e3,
                x: 0,
                y: 0,
                fillPatternImage: i,
                zIndex: 1
              });
              this.zIndex.give(() => {
                o.zIndex(0);
              }), t.add(o);
            };
          })
        );
      })
    ), this;
  }
}
const bo = T.debug("Breadcrumbs");
class wo {
  constructor(e, t, s) {
    this.parentNames = e, this.mapFile = t, this.factories = s;
  }
  list(e) {
    const t = this.factories.chain.create();
    return this.parentNames.names(this.factories.guestCast.create(e, t.receiveKey("names"))), this.mapFile.mapFile(this.factories.guestCast.create(e, t.receiveKey("mapFile"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ names: s, mapFile: i }) => {
        bo("map id", s, i), e.give(
          s.map((r) => {
            var o, a;
            return {
              title: ((a = (o = i[r]) == null ? void 0 : o.settings) == null ? void 0 : a.title) || "unknown",
              name: r
            };
          })
        );
      })
    ), e;
  }
}
const Yt = T.debug("CursorWithObjects");
class Co {
  constructor(e, t, s) {
    this.objectsVisible = e, this.cursor = t, this.factories = s;
  }
  value(e) {
    const t = this.factories.chain.create();
    return this.cursor.value(this.factories.guestCast.create(e, t.receiveKey("cursor"))), this.objectsVisible.objects(
      this.factories.guestCast.create(e, t.receiveKey("objects"))
    ), t.result(
      this.factories.guestInTheMiddle.create(e, ({ cursor: s, objects: i }) => {
        const r = i.find((o) => {
          const a = o.position[0], c = o.position[0] + o.width || 100, d = o.position[1], u = o.position[1] + o.height || 100;
          return s.x >= a && s.x <= c && s.y >= d && s.y <= u;
        });
        r ? (Yt("crossed with", r), e.give({
          x: r.position[0] + r.width / 2,
          y: r.position[1] + r.height / 2
        })) : (Yt("cursor pos", s), e.give(s));
      })
    ), this;
  }
}
const Jt = T.debug("Drawer");
class xo {
  constructor(e, t) {
    $(this, "drawerNameCache");
    this.keyboard = e, this.factories = t, this.drawerNameCache = t.cache.create(""), this.keyboard.pressed(
      this.factories.patron.create(
        this.factories.guest.create((s) => {
          Jt("new key in drawer", s), s === "Escape" && this.give("");
        })
      )
    );
  }
  isOpenedByName(e, t) {
    return this.drawerNameCache.value(
      this.factories.guestInTheMiddle.create(t, (s) => {
        Jt("new drawer name", s), t.give(s === e);
      })
    ), t;
  }
  openedByName(e) {
    return this.factories.guestAware.create((t) => {
      this.isOpenedByName(e, t);
    });
  }
  give(e) {
    return this.drawerNameCache.give(e), this;
  }
}
class _o {
  value(e) {
    typeof performance > "u" && e.give(0);
    const t = 10;
    let s = performance.now(), i = 0;
    const r = () => requestAnimationFrame(() => {
      if (i += 1, i >= t) {
        const o = performance.now(), a = o - s;
        e.give(Math.round(1e3 / (a / i))), s = o, i = 0;
      }
      r();
    });
    return r(), e;
  }
}
class $o {
  constructor(e, t) {
    this.mapFile = e, this.factories = t;
  }
  menuObjects(e) {
    return this.mapFile.currentMap(
      this.factories.guestInTheMiddle.create(e, (t) => {
        const s = Object.values(t.objects).filter((i) => i.inMenu);
        e.give(s);
      })
    ), e;
  }
}
const Zt = T.debug("app:MiniMap"), qt = 130;
class ko {
  constructor(e, t, s, i) {
    $(this, "theSize");
    $(this, "thePoints");
    $(this, "viewportSizeCache");
    this.map = e, this.layer = t, this.stageSize = s, this.factories = i, this.theSize = i.sourceEmpty.create(), this.thePoints = i.sourceEmpty.create(), this.viewportSizeCache = i.sourceEmpty.create();
    const r = i.chain.create();
    e.objects(i.patron.create(r.receiveKey("objects"))), t.layer(i.patron.create(r.receiveKey("layer"))), s.value(i.patron.create(r.receiveKey("size"))), r.result(
      i.patron.create(
        i.guest.create(({ layer: o, size: a, objects: c }) => {
          const d = qt / a.width, u = {
            width: Math.round(o.width() * d),
            height: Math.round(o.height() * d)
          };
          this.viewportSizeCache.give(u);
          const h = {
            width: Math.round(a.width * d),
            height: Math.round(a.height * d)
          };
          this.theSize.give(h);
          const p = c.map((y) => ({
            id: y.id,
            x: Math.round(y.position[0] * d),
            y: Math.round(y.position[1] * d),
            width: Math.round(y.width * d),
            height: Math.round(y.height * d)
          }));
          Zt("minimap points", p), this.thePoints.give(p);
        })
      )
    );
  }
  viewportPosition(e) {
    const t = this.factories.chain.create();
    return this.stageSize.value(this.factories.guestCast.create(e, t.receiveKey("size"))), this.layer.position(this.factories.guestCast.create(e, t.receiveKey("position"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ size: s, position: i }) => {
        const r = qt / s.width, o = {
          x: i.x * r * -1,
          y: i.y * r * -1
        };
        Zt("scaled position is", o), e.give(o);
      })
    ), e;
  }
  viewportSize(e) {
    return this.viewportSizeCache.value(e), e;
  }
  size(e) {
    return this.theSize.value(e), e;
  }
  points(e) {
    return this.thePoints.value(e), e;
  }
}
const Xt = T.debug("Modal");
class Mo {
  constructor(e, t) {
    $(this, "modalNameCache");
    this.keyboard = e, this.factories = t, Xt("modal created"), this.modalNameCache = t.cache.create(""), this.keyboard.pressed(
      this.factories.patron.create(
        this.factories.guest.create((s) => {
          Xt("new key in modal", s), s === "Escape" && this.give("");
        })
      )
    );
  }
  isOpenedByName(e, t) {
    return this.modalNameCache.value(
      this.factories.guestInTheMiddle.create(t, (s) => {
        t.give(s === e);
      })
    ), t;
  }
  openedByName(e) {
    return this.factories.guestAware.create((t) => {
      this.isOpenedByName(e, t);
    });
  }
  give(e) {
    return this.modalNameCache.give(e), this;
  }
}
class Fo {
  constructor(e) {
    $(this, "messageCache");
    $(this, "notificationLifetimeDelay", 3500);
    $(this, "lastTimerHead", null);
    this.messageCache = e.sourceEmpty.create();
  }
  message(e) {
    return this.messageCache.value(e), e;
  }
  give(e) {
    return this.messageCache.give(e), this.lastTimerHead && clearTimeout(this.lastTimerHead), this.lastTimerHead = setTimeout(() => {
      this.messageCache.give({
        type: "success",
        text: "hide"
      });
    }, this.notificationLifetimeDelay), this;
  }
}
const Me = T.debug("ObjectGeometryFix");
class To {
  constructor(e, t, s, i) {
    $(this, "innerReceive");
    this.mapFile = t, this.map = s, this.factories = i, e.objects(i.patron.create(this)), this.innerReceive = Ce((r) => {
      this.mapFile.currentMap(
        this.factories.guest.create((o) => {
          Me("objects to fix", r);
          const a = document.querySelectorAll(".objects-container .rendered-object"), c = o.objects;
          let d = !1;
          a.forEach((u) => {
            const h = u.getAttribute("data-object-id");
            if (Me("i see id", h), !h)
              return;
            const p = c[h];
            if (p && (Me("dom object geometry", u.clientWidth, u.clientHeight), Me("saved object geometry", p.width, p.height), (p.width !== u.clientWidth || p.height !== u.clientHeight) && (d = !0, Me("update object geometry"), p.width = u.clientWidth, p.height = u.clientHeight), !p.width || !p.height)) {
              const y = o.types[p.type];
              p.width = y.width, p.height = y.height;
            }
          }), d && this.map.give({
            ...o,
            objects: c
          });
        })
      );
    }, 500);
  }
  give(e) {
    return this.innerReceive(e), this;
  }
}
const Fe = T.debug("MapObjectsRectsPatron");
class So {
  constructor(e, t, s, i, r, o, a, c, d) {
    $(this, "previouslyRenderedRects", /* @__PURE__ */ new Map());
    this.konvaLayer = e, this.mapFile = t, this.mapObject = s, this.mapObjectCurrent = r, this.mapObjectForRendering = o, this.objectPosition = a, this.settings = c, this.factories = d, i.objects(this);
  }
  give(e) {
    return this.konvaLayer.layer(
      this.factories.patronOnce.create(
        this.factories.guest.create((t) => {
          const s = this.factories.chain.create();
          this.mapFile.currentMap(s.receiveKey("map")), this.settings.value(s.receiveKey("settings")), s.result(
            this.factories.guest.create((i) => {
              const { map: r, settings: o } = i;
              Fe("rerender object rects"), this.previouslyRenderedRects.forEach((a) => {
                a.hide();
              }), e.forEach((a) => {
                const c = r.types[a.type], d = +a.width || +c.width || 100, u = +a.height || +c.height || 100;
                if (this.previouslyRenderedRects.has(a)) {
                  const p = this.previouslyRenderedRects.get(a);
                  p.width(d), p.height(u), p.x(+a.position[0]), p.y(+a.position[1]), p.show();
                  return;
                }
                Fe("rect object", a, c);
                const h = new he.Rect({
                  x: +a.position[0],
                  y: +a.position[1],
                  width: d,
                  height: u,
                  name: a.id,
                  draggable: !o.readonly,
                  objectId: a.id,
                  zIndex: 3
                });
                this.previouslyRenderedRects.set(a, h), t.add(h), h.on("mouseenter", () => {
                  t.getStage().container().style.cursor = "pointer";
                }), h.on("mouseleave", () => {
                  t.getStage().container().style.cursor = "default";
                }), h.on("dragend", () => {
                  Fe("drag ended"), this.objectPosition.position(
                    a,
                    {
                      x: h.x(),
                      y: h.y()
                    },
                    this.factories.guest.create((p) => {
                      this.mapObject.give({
                        ...a,
                        position: [p.x, p.y]
                      });
                    })
                  );
                }), h.on("dragmove", () => {
                  Fe("dragmove works", h.x(), h.y()), t.getStage().container().style.cursor = "move", this.objectPosition.position(
                    a,
                    {
                      x: h.x(),
                      y: h.y()
                    },
                    this.factories.guest.create((p) => {
                      this.mapObjectForRendering.give({
                        ...a,
                        position: [p.x, p.y]
                      });
                    })
                  );
                }), h.on("click", () => {
                  Fe("object clicked with id", a.id), this.mapObjectCurrent.give(a.id);
                });
              });
            })
          );
        })
      )
    ), this;
  }
  introduction() {
    return "patron";
  }
}
class jo {
  constructor(e, t, s, i) {
    this.canvas = t, this.konvaLayer = s, this.factories = i, e.currentMap(this);
  }
  give() {
    const e = new ResizeObserver((s) => {
      requestAnimationFrame(() => {
        const [i] = s;
        this.canvas.canvas(
          this.factories.guest.create((r) => {
            const o = r.getBoundingClientRect();
            this.konvaLayer.layer(
              this.factories.guest.create((a) => {
                a.getStage().width(i.contentRect.width - o.left), a.getStage().height(i.contentRect.height - o.top), this.canvas.give(r), this.konvaLayer.give(a);
              })
            );
          })
        );
      });
    }), t = document.querySelector("body");
    return t && e.observe(t), this;
  }
}
const Bo = T.debug("StagePosition");
class Io {
  constructor(e) {
    this.stageMove = e;
  }
  give(e) {
    return Bo("received position", e), this.stageMove.move(e), this;
  }
}
class Oo {
  constructor(e, t) {
    this.stageMove = e, this.factories = t;
  }
  move(e, t) {
    return e.value(
      this.factories.guest.create((s) => {
        this.stageMove.move(s.objects[t]);
      })
    ), this;
  }
}
const es = T.debug("Zindex");
class Po {
  constructor(e) {
    $(this, "fnsCache");
    this.factories = e, this.fnsCache = e.cache.create([]), this.fnsCache.value(
      e.patron.create(
        e.guest.create(
          Ce((t) => {
            es("zindex fns run"), t.forEach((s) => s());
          }, 50)
        )
      )
    );
  }
  give(e) {
    return es("zindex received value"), this.fnsCache.value(
      this.factories.guest.create((t) => {
        this.fnsCache.give(t.concat(e));
      })
    ), this;
  }
}
const ts = T.debug("app:BrowserCanvas");
class Eo {
  constructor(e) {
    $(this, "canvasCache");
    this.factories = e, this.canvasCache = e.sourceEmpty.create();
  }
  canvas(e) {
    return this.canvasCache.value(e), this;
  }
  size(e) {
    return this.canvasCache.value(
      this.factories.guestInTheMiddle.create(e, (t) => {
        const s = t.width || t.clientWidth, i = t.height || t.clientHeight;
        ts("canvas size", s, i), e.give({
          height: i,
          width: s
        });
      })
    ), this;
  }
  give(e) {
    return ts("receive new canvas", e), this.canvasCache.give(e), this;
  }
}
const Do = T.debug("Cursor");
class Ro {
  constructor(e, t) {
    $(this, "cursorPool");
    this.cursorPool = t.pool.create(this);
    const s = {
      x: 0,
      y: 0
    };
    window == null || window.addEventListener("mousemove", (i) => {
      const r = {
        x: i.offsetX + -s.x,
        y: i.offsetY + -s.y
      };
      Do("move cursor fired", r), this.cursorPool.give(r);
    }), e.position(
      t.patron.create(
        t.guest.create((i) => {
          s.x = i.x, s.y = i.y;
        })
      )
    );
  }
  value(e) {
    return this.cursorPool.add(e), this;
  }
}
class No {
  constructor(e) {
    this.el = e, e.value(this);
  }
  give(e) {
    return e.addEventListener("dragstart", (t) => {
      const s = t.target;
      if (!s)
        return;
      const i = s.cloneNode(!0);
      i.style.transform = "translate(0,0)", i.style.position = "absolute", i.style.top = "0", i.style.left = "0", i.style.zIndex = "999", t.dataTransfer && t.dataTransfer.setDragImage(i, 0, 0), document.body.append(i);
      const r = (o) => {
        i.style.transform = `translate(${o.clientX}px, ${o.clientY}px)`;
      };
      s.addEventListener("drag", r, { passive: !0 }), s.addEventListener("dragend", () => {
        i.removeEventListener("drag", r), i.remove();
      });
    }), this;
  }
  introduction() {
    return "patron";
  }
}
const Ne = T.debug("ControlCombo");
class Ho {
  constructor(e, t) {
    this.keyboard = e, this.factories = t;
  }
  /**
   * Случилась комбинация ctrl + keyCode
   */
  happened(e, t) {
    this.keyboard.event(
      this.factories.guestInTheMiddle.create(t, (s) => {
        Ne("combo happened look for key", e, "received", s.code), s.ctrlKey && s.code === e && s.type === "keydown" && (s.preventDefault(), t.give(s));
      })
    );
  }
  /**
   * Случилась комбинация ctrl + keyCode с условием comboCondition
   */
  happenedConditional(e, t, s) {
    Ne("combo control happened registration"), this.keyboard.event(
      this.factories.guestInTheMiddle.create(s, (i) => {
        Ne("keyboard event come"), t.value(
          this.factories.guest.create((r) => {
            Ne("combo happened look for key", e, "received", i.code), r && i.ctrlKey && i.code === e && i.type === "keydown" && (i.preventDefault(), s.give(i));
          })
        );
      })
    );
  }
}
const Te = T.debug("Keyboard");
class Vo {
  constructor(e) {
    $(this, "pressedPool");
    $(this, "combinationsPool");
    Te("keyboard created"), this.pressedPool = e.pool.create(this), this.combinationsPool = e.pool.create(this), window == null || window.addEventListener("keyup", (t) => {
      Te("keyboard pressed", t.key), this.pressedPool.give(t.key);
    }), Os({
      passive: !1,
      onEventFired: (t) => {
        Te("magic combination happens 11", t.ctrlKey, t.key), this.combinationsPool.give(t);
      }
    });
  }
  pressed(e) {
    return Te("keyboard receive pressed subscriber"), this.pressedPool.add(e), this;
  }
  event(e) {
    return Te("keyboard receive combination subscriber"), this.combinationsPool.add(e), this;
  }
}
const ss = T.debug("app:konva:KonvaLayer");
class Uo {
  constructor(e, t, s, i) {
    $(this, "guestChain");
    $(this, "positionCache");
    $(this, "layerCache");
    this.canvasDep = e, this.stageMoveRestriction = s, this.factories = i, this.positionCache = i.cache.create({
      x: 0,
      y: 0
    }), this.guestChain = i.chain.create(), this.layerCache = i.sourceEmpty.create(), this.canvasDep.canvas(i.patron.create(this.guestChain.receiveKey("canvas"))), t.value(this.guestChain.receiveKey("stageSize")), this.guestChain.result(
      i.guest.create(
        ({ canvas: r }) => {
          ss("create new konva stage");
          const o = new he.Stage({
            width: r.clientWidth,
            height: r.clientHeight,
            container: r,
            fill: "#ffeeee",
            draggable: !0
          }), a = new he.Layer();
          o.add(a), a.draw(), this.layerCache.give(a), o.on("dragend", (d) => {
            if (!(d.target instanceof he.Stage))
              return;
            const u = {
              x: o.x(),
              y: o.y()
            };
            ss("new position", u), this.positionCache.give(u);
          }), o.on("dragmove", (d) => {
            if (!(d.target instanceof he.Stage))
              return;
            const u = {
              x: o.x(),
              y: o.y()
            };
            this.positionCache.give(u);
          });
          const c = this.factories.guestSync.create({
            x: 0,
            y: 0
          });
          o.dragBoundFunc((d) => (s.position(d, c), c.value()));
        }
      )
    );
  }
  layer(e) {
    return this.layerCache.value(e), e;
  }
  position(e) {
    return this.positionCache.value(e), e;
  }
  give(e) {
    this.layerCache.give(e);
    const t = e.getStage();
    return this.positionCache.give({
      x: t.x(),
      y: t.y()
    }), this;
  }
}
class zo {
  constructor(e, t) {
    this.konvaLayer = e, this.factories = t;
  }
  position(e) {
    return this.konvaLayer.position(
      this.factories.guestInTheMiddle.create(e, (t) => {
        e.give({
          x: t.x * -1,
          y: t.y * -1
        });
      })
    ), e;
  }
}
const Lo = T.debug("position");
class Qo {
  constructor(e, t, s, i, r) {
    this.layer = e, this.canvas = t, this.stageSize = s, this.stageMoveRestriction = i, this.factories = r;
  }
  move(e) {
    Lo("move stage to new point", e.position), this.stageSize.value(
      this.factories.guest.create(() => {
        this.canvas.size(
          this.factories.guest.create((t) => {
            this.layer.layer(
              this.factories.guest.create((s) => {
                const [i, r] = e.position, o = {
                  x: -i - Math.round(e.width / 2) + Math.round(t.width / 2),
                  y: -r - Math.round(e.height / 2) + Math.round(t.height / 2)
                };
                this.stageMoveRestriction.position(
                  o,
                  this.factories.guest.create((a) => {
                    s.getStage().position(a), setTimeout(() => {
                      this.layer.give(s);
                    });
                  })
                );
              })
            );
          })
        );
      })
    );
  }
}
const _ = Z(), We = new Vo(_), ms = new Ie({
  readonly: !1,
  presets: {}
}), Wo = new Mo(We, _), vs = new xo(We, _), Ke = new Fo(_), ue = new dn(_), As = _.sourceEmpty.create(), H = new mn(As, ue, _), Ko = new pn(H), Go = new ii(Ko), pt = new An(H, ue, _), ft = new us(pt, ue, _), Yo = new hs(ft, pt, _), te = new us(H, ue, _), Jo = new Ae((n) => {
  H.currentMap(new Ue(n));
}), Ge = new yn(vs, _), Zo = new Pr(_), qo = new Or(H, te, _), fe = new Eo(_), ge = new Qr(), ys = new Wr(fe, ge, _), se = new Uo(fe, ge, ys, _), Xo = new Po(_), ea = new yo(se, H, Xo, _), xe = new hs(te, H, _), ta = new _n(
  te,
  H,
  [new ht(Ke, new bn(H, _), _)],
  _
), sa = new zo(se, _), ia = new wn(te, xe, fe, sa, _), bs = new Hr(H, _), ws = new Rr(
  te,
  H,
  [
    new ht(
      Ke,
      new Vr(bs, _),
      _
    )
  ],
  _
), na = new Dr(
  te,
  H,
  [new ht(Ke, bs, _)],
  _
), ra = new Er(ws), Ye = new Kr(se, fe, pt, _), oa = new To(
  Ye,
  H,
  te,
  _
), aa = new So(
  se,
  H,
  xe,
  Ye,
  Ge,
  Yo,
  new jr(new Sr(ge, _), _),
  ms,
  _
), ca = new Ro(se, _), la = new Co(Ye, ca, _), Cs = new qr(), xs = new vo(se, la, Cs, _), ua = new go(se, H, ft, Cs, _), ha = new ko(ft, se, ge, _), da = new kn(
  Ge,
  te,
  xe,
  xs,
  _
), pa = new jo(H, fe, se, _), fa = new Jr(
  Ge,
  H,
  xe,
  _
), ga = new gn(H, ue, _), ma = new xn(xe), va = new _o(), gt = new Cn(ue, _), Aa = new wo(gt, H, _), ya = new Mr(ue, _), ba = new Ur(gt, H, _), wa = new Ho(We, _), Ca = new $o(H, _), _s = new Qo(se, fe, ge, ys, _), xa = new Io(_s), _a = new Oo(_s, _), $a = new zr(te, _), ka = new fn(H, te, ue, _), Ma = new Ir(te, ge, se, _), $s = new ye();
new No($s);
const Fa = {
  mapCurrentID: ue,
  mapFile: H,
  mapCurrent: te,
  mapCurrentSource: Jo,
  mapRemoved: ga,
  mapSettings: qo,
  mapObject: xe,
  mapObjectRemoved: ta,
  mapType: ws,
  mapTypeRemoved: na,
  mapTypeNew: ra,
  mapObjectsVisible: Ye,
  mapObjectCurrent: Ge,
  mapObjectNew: ia,
  mapObjectsLink: da,
  mapTypeCurrent: Zo,
  mapRects: aa,
  mapBackground: ea,
  mapObjectArrows: ua,
  mapObjectsGeometryFix: oa,
  canvas: fe,
  miniMap: ha,
  notification: Ke,
  modal: Wo,
  drawer: vs,
  konvaLayer: se,
  resizing: pa,
  objectAdditionalFieldsFix: fa,
  mapObjectRelationRemoved: ma,
  fps: va,
  breadcrumbs: Aa,
  mapObjectUrl: ya,
  keyboard: We,
  parentNames: gt,
  parentTypes: ba,
  controlCombo: wa,
  menu: Ca,
  stagePosition: xa,
  stagePositionByObjectId: _a,
  objectsMatchedToQuery: $a,
  stageSize: ge,
  mapHistory: ka,
  fileContent: As,
  newArrow: xs,
  objectsOutsideScreen: Ma,
  settings: ms,
  documentTitle: Go,
  sidebarDraggable: $s
}, V = () => Fa;
class j {
  constructor(e = void 0) {
    $(this, "innerRef");
    this.innerRef = ie(e);
  }
  get value() {
    return this.innerRef.value;
  }
  ref() {
    return this.innerRef;
  }
  give(e) {
    return this.innerRef.value = e, this;
  }
  introduction() {
    return "patron";
  }
}
const Ta = { key: 0 }, Sa = { class: "flex-grow overflow-y-auto" }, ja = {
  key: 1,
  class: "flex gap-1"
}, mt = /* @__PURE__ */ D({
  __name: "BaseDrawer",
  props: {
    name: {
      type: String,
      required: !0
    },
    direction: {
      type: String,
      default: "ltr",
      validator: (n) => ["ltr", "rtl", "ttb", "btt"].includes(n)
    }
  },
  emits: ["close"],
  setup(n, { emit: e }) {
    const t = n, s = e, i = je(() => ["e2e-drawer-back absolute z-10 top-0 left-0 w-full h-full bg-black/50"]), r = {
      ltr: "top-0 left-0 w-[50%] max-w-[900px] ",
      rtl: "top-0 right-0 w-[50%] max-w-[900px] ",
      ttb: "top-0 right-0 left-0",
      btt: "top-auto h-[900px] max-h-[50%] bottom-0 right-0 left-0"
    }, { drawer: o } = V(), a = () => {
      o.give(""), s("close");
    }, c = o.isOpenedByName(t.name, new j()).ref();
    return (d, u) => (f(), z(rs, { name: "fade" }, {
      default: w(() => [
        l(c) ? (f(), A("div", {
          key: 0,
          class: ce(l(i)),
          onClick: a
        }, [
          b("div", {
            class: ce(["absolute bg-white h-full p-3 flex flex-col overflow-hidden", r[n.direction]]),
            onClick: u[0] || (u[0] = be(() => {
            }, ["stop"]))
          }, [
            d.$slots.header ? (f(), A("div", Ta, [
              ee(d.$slots, "header", { class: "BaseDrawer-Header" })
            ])) : B("", !0),
            b("div", Sa, [
              ee(d.$slots, "default")
            ]),
            d.$slots.footer ? (f(), A("div", ja, [
              ee(d.$slots, "footer")
            ])) : B("", !0)
          ], 2)
        ], 2)) : B("", !0)
      ]),
      _: 3
    }));
  }
}), J = /* @__PURE__ */ D({
  __name: "BaseIcon",
  props: {
    icon: {
      type: String
    }
  },
  setup(n) {
    const e = {
      "fa-bars": qs,
      "fa-text-width": Zs,
      "fa-search": Js,
      "fa-history": Ys,
      "fa-plus-square": Gs,
      "fa-cog": Ks,
      "fa-file-text": Ws,
      "fa-rotate-left": Qs,
      "fa-rotate-right": Ls,
      "fa-map": zs,
      "fa-close": Us,
      "fa-arrow-left": Vs,
      "fa-arrow-right": Hs,
      "fa-arrow-down": Ns,
      "fa-arrow-up": Rs
    };
    return (t, s) => (f(), z(l(Ds), {
      icon: e[n.icon]
    }, null, 8, ["icon"]));
  }
}), Ba = /* @__PURE__ */ b("h2", { class: "text-lg font-bold" }, " Карты в файле ", -1), Ia = ["onClick"], Oa = /* @__PURE__ */ D({
  __name: "AppFileMaps",
  setup(n) {
    const {
      mapFile: e,
      mapCurrentID: t,
      drawer: s,
      mapRemoved: i
    } = V(), r = e.mapFile(new j()).ref(), o = t.id(new j()).ref(), a = (c) => {
      confirm("Вы уверены?") && i.give(c);
    };
    return (c, d) => (f(), z(mt, {
      direction: "rtl",
      name: "fileMaps"
    }, {
      header: w(() => [
        Ba
      ]),
      default: w(() => [
        b("div", null, [
          (f(!0), A(U, null, W(l(r), (u, h) => (f(), A("div", {
            key: h,
            class: "flex items-center gap-2"
          }, [
            b("a", {
              href: "#",
              class: ce({ "font-bold": l(o) === h }),
              onClick: be((p) => {
                l(t).give(h), l(s).give("");
              }, ["prevent"])
            }, x(u.settings.title), 11, Ia),
            g(J, {
              onClick: (p) => a(h),
              class: "text-danger-second cursor-pointer",
              title: "Удалить карту",
              icon: "fa-close"
            }, null, 8, ["onClick"])
          ]))), 128))
        ])
      ]),
      _: 1
    }));
  }
}), Pa = { class: "AppMenuObject" }, Ea = {
  key: 0,
  class: "AppMenuObject-Empty"
}, Da = {
  key: 1,
  class: "flex flex-col gap-1"
}, Ra = ["onClick"], Na = ["innerHTML"], Ha = /* @__PURE__ */ D({
  __name: "AppMenuObject",
  setup(n) {
    const {
      controlCombo: e,
      drawer: t,
      menu: s,
      stagePosition: i
    } = V(), { guest: r, patron: o } = Z(), a = s.menuObjects(new j()).ref();
    return e.happened(
      "KeyM",
      o.create(r.create(() => {
        t.give("menu");
      }))
    ), (c, d) => (f(), z(mt, {
      direction: "rtl",
      name: "menu"
    }, {
      default: w(() => [
        b("div", Pa, [
          l(a).length ? (f(), A("div", Da, [
            (f(!0), A(U, null, W(l(a), (u) => (f(), A("a", {
              key: u.id,
              class: "AppMenuObject-Item",
              href: "#",
              onClick: be((h) => {
                l(i).give(u), l(t).give("");
              }, ["prevent"])
            }, [
              b("span", {
                innerHTML: u.additionalName ? u.additionalName : u.name
              }, null, 8, Na)
            ], 8, Ra))), 128))
          ])) : (f(), A("div", Ea, x(c.$t("appMenuObject.noItems")), 1))
        ])
      ]),
      _: 1
    }));
  }
}), E = /* @__PURE__ */ D({
  __name: "BaseButton",
  props: {
    size: {
      type: String,
      default: "md",
      validator: (n) => ["sm", "md", "lg"].includes(n)
    },
    type: {
      type: String,
      default: "standard"
    }
  },
  setup(n) {
    const e = n, t = ["rounded-main", `text-${e.size}`, `p-${e.size}`, `bg-${e.type} hover:bg-${e.type}-second`];
    return t.push(""), (s, i) => (f(), A("button", {
      type: "button",
      class: ce(t)
    }, [
      ee(s.$slots, "default")
    ]));
  }
}), Va = {
  key: 0,
  title: "Назад",
  class: "absolute text-white left-0 top-0 -ml-5 flex justify-center items-center bg-primary/70 hover:bg-primary-second/70 cursor-pointer w-5"
}, Ua = {
  key: 1,
  class: "BaseModal-Header"
}, za = { class: "overflow-y-auto flex-grow" }, La = {
  key: 2,
  class: "BaseModal-Footer"
}, me = /* @__PURE__ */ D({
  __name: "BaseModal",
  props: {
    name: {
      type: String,
      required: !0
    }
  },
  setup(n) {
    const { modal: e } = V(), t = n, s = e.isOpenedByName(t.name, new j()).ref(), i = [], r = () => {
      e.give("");
    };
    return (o, a) => (f(), z(rs, { name: "fade" }, {
      default: w(() => [
        l(s) ? (f(), A("div", {
          key: 0,
          class: "absolute rounded-main overflow-y-auto flex justify-center items-center top-0 left-0 bg-black/10 z-20 h-full w-full",
          onClick: r
        }, [
          b("div", {
            class: "w-full relative flex flex-col max-w-[800px] max-h-[90%] bg-white p-3",
            onClick: a[0] || (a[0] = be(() => {
            }, ["stop"]))
          }, [
            i.length > 1 ? (f(), A("div", Va, " < ")) : B("", !0),
            b("div", {
              title: "Закрыть",
              class: "e2e-modal-close absolute text-white right-0 top-0 -mr-5 flex justify-center items-center bg-danger/70 hover:bg-danger-second/70 cursor-pointer w-5",
              onClick: r
            }, " × "),
            o.$slots.header ? (f(), A("div", Ua, [
              ee(o.$slots, "header")
            ])) : B("", !0),
            b("div", za, [
              ee(o.$slots, "default")
            ]),
            o.$slots.footer ? (f(), A("div", La, [
              ee(o.$slots, "footer")
            ])) : B("", !0)
          ])
        ])) : B("", !0)
      ]),
      _: 3
    }));
  }
}), Qa = { class: "AppPresets" }, Wa = /* @__PURE__ */ b("div", { class: "text-md font-bold mb-2" }, "Общие", -1), Ka = { class: "flex flex-col gap-2" }, Ga = { class: "text-md font-bold mb-1" }, Ya = { class: "flex gap-2 flex-wrap items-end" }, Ja = { class: "AppTypesParent-ItemTitle" }, Za = ["innerHTML"], qa = /* @__PURE__ */ D({
  __name: "AppPresets",
  setup(n) {
    const {
      svgMapTypeImage: e
    } = Z(), { mapType: t, settings: s } = V(), i = new j();
    s.value(i);
    const r = je(
      () => Object.fromEntries(
        Object.entries(i.value.presets).map(
          ([o, a]) => [
            o,
            a.map(
              (c) => ({
                preset: c,
                image: e.create(c).markup()
              })
            )
          ]
        )
      )
    );
    return (o, a) => (f(), z(me, { name: "presets" }, {
      default: w(() => [
        b("div", Qa, [
          Wa,
          b("div", Ka, [
            (f(!0), A(U, null, W(l(r), (c, d) => (f(), A("div", { key: d }, [
              b("h3", Ga, x(d), 1),
              b("div", Ya, [
                (f(!0), A(U, null, W(c, (u) => (f(), A("div", {
                  key: u.preset.name,
                  class: "flex flex-col gap-2"
                }, [
                  b("div", Ja, x(u.preset.name), 1),
                  b("div", {
                    class: "AppTypesParent-ItemImage",
                    innerHTML: u.image,
                    style: ae(`width:${u.preset.width}px;height:${u.preset.height}px`)
                  }, null, 12, Za),
                  g(E, {
                    class: "AppTypesParent-ItemButton e2e-add-preset-type",
                    type: "success",
                    size: "sm",
                    onClick: (h) => l(t).give({ name: u.preset.name, type: u.preset })
                  }, {
                    default: w(() => [
                      I(x(o.$t("general.addToMap")), 1)
                    ]),
                    _: 2
                  }, 1032, ["onClick"])
                ]))), 128))
              ])
            ]))), 128))
          ])
        ])
      ]),
      _: 1
    }));
  }
}), oe = /* @__PURE__ */ D({
  __name: "BaseInput",
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    autofocus: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = n, s = e, i = ie(null);
    Be(
      i,
      Ce(() => {
        t.autofocus && i.value.focus();
      }, 500)
    );
    const r = Le(t, "modelValue", s);
    return (o, a) => ze((f(), A("input", {
      ref_key: "input",
      ref: i,
      "onUpdate:modelValue": a[0] || (a[0] = (c) => we(r) ? r.value = c : null),
      class: "block rounded-main w-full p-2 border border-solid border-body-dark",
      type: "text"
    }, null, 512)), [
      [os, l(r)]
    ]);
  }
});
class vt {
  constructor(e) {
    $(this, "pool", new Qe(this));
    this.refSource = e, Be(
      e,
      (t) => {
        t !== void 0 && this.pool.give(t);
      },
      {
        deep: !0
      }
    );
  }
  value(e) {
    return this.refSource.value && e.give(this.refSource.value), this.pool.add(e), this;
  }
}
const Xa = { class: "AppSearch" }, ec = {
  key: 0,
  class: "AppSearch-Items"
}, tc = ["onClick"], sc = ["innerHTML"], ic = ["innerHTML"], nc = ["innerHTML"], rc = { key: 1 }, oc = { key: 2 }, ac = /* @__PURE__ */ D({
  __name: "AppSearch",
  setup(n) {
    const {
      objectsMatchedToQuery: e,
      controlCombo: t,
      modal: s,
      stagePosition: i
    } = V(), { guest: r, patron: o } = Z(), a = ie(), c = T.debug("app:AppSearch");
    s.isOpenedByName(
      "search",
      o.create(r.create((h) => {
        setTimeout(() => {
          h && a.value && (c("search is opened", h), a.value.$el.focus());
        }, 500);
      }))
    );
    const d = ie(""), u = e.objects(
      new vt(d),
      new j([])
    ).ref();
    return t.happened(
      "KeyF",
      o.create(r.create(() => {
        s.give("search");
      }))
    ), (h, p) => (f(), z(me, { name: "search" }, {
      default: w(() => [
        b("div", Xa, [
          g(oe, {
            ref_key: "inputRef",
            ref: a,
            modelValue: l(d),
            "onUpdate:modelValue": p[0] || (p[0] = (y) => we(d) ? d.value = y : null),
            class: "mb-2 e2e-query-input",
            placeholder: h.$t("general.specifyQuery")
          }, null, 8, ["modelValue", "placeholder"]),
          l(u).length ? (f(), A("div", ec, [
            (f(!0), A(U, null, W(l(u), (y) => (f(), A("div", {
              key: y.name,
              class: "cursor-pointer",
              onClick: be((m) => {
                l(i).give(y), l(s).give("");
              }, ["prevent"])
            }, [
              b("b", {
                class: "AppSearch-ItemName",
                innerHTML: y.name
              }, null, 8, sc),
              y.additionalName ? (f(), A("b", {
                key: 0,
                class: "AppSearch-ItemName",
                innerHTML: y.additionalName
              }, null, 8, ic)) : B("", !0),
              y.additionalFields ? (f(), A("div", {
                key: 1,
                innerHTML: Object.values(y.additionalFields).join(" ")
              }, null, 8, nc)) : B("", !0)
            ], 8, tc))), 128))
          ])) : l(d) ? (f(), A("div", rc, x(h.$t("general.noResults")), 1)) : (f(), A("div", oc, x(h.$t("general.resultsWillBeHere")), 1))
        ])
      ]),
      _: 1
    }));
  }
}), cc = { class: "AppTypes" }, lc = /* @__PURE__ */ b("div", { class: "text-md font-bold mb-2" }, "Родительские типы", -1), uc = { class: "flex gap-2 items-end" }, hc = { class: "AppTypesParent-ItemTitle" }, dc = ["innerHTML"], pc = /* @__PURE__ */ D({
  __name: "AppTypesParent",
  setup(n) {
    const { parentTypes: e, mapType: t } = V(), { svgMapTypeImage: s } = Z(), i = e.types(new j()).ref(), r = je(() => {
      var o;
      return (o = i.value) == null ? void 0 : o.map((a) => ({
        type: a,
        image: s.create(a).markup()
      })).sort((a, c) => +(a.type.name >= c.type.name));
    });
    return (o, a) => (f(), z(me, { name: "parentTypes" }, {
      default: w(() => [
        b("div", cc, [
          lc,
          b("div", uc, [
            (f(!0), A(U, null, W(l(r), (c) => (f(), A("div", {
              key: c.type.name,
              class: "flex flex-col gap-2"
            }, [
              b("div", hc, x(c.type.name), 1),
              b("div", {
                class: "AppTypesParent-ItemImage",
                innerHTML: c.image,
                style: ae(`width:${c.type.width}px;height:${c.type.height}px`)
              }, null, 12, dc),
              g(E, {
                class: "AppTypesParent-ItemButton e2e-add-preset-type",
                type: "success",
                size: "sm",
                onClick: (d) => l(t).give({ name: c.type.name, type: c.type })
              }, {
                default: w(() => [
                  I(x(o.$t("general.addToMap")), 1)
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))), 128))
          ])
        ])
      ]),
      _: 1
    }));
  }
});
class ks {
  constructor(e, t = void 0) {
    $(this, "innerRef");
    this.executor = e, this.innerRef = ie(t);
  }
  ref() {
    return this.executor(this.innerRef), this.innerRef;
  }
}
const fc = { class: "flex gap-2" }, nt = /* @__PURE__ */ D({
  __name: "BaseCheckbox",
  props: {
    modelValue: {
      type: Boolean
    },
    label: {
      type: String,
      required: !0
    }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const i = Le(n, "modelValue", e);
    return (r, o) => (f(), A("label", fc, [
      ze(b("input", {
        "onUpdate:modelValue": o[0] || (o[0] = (a) => we(i) ? i.value = a : null),
        type: "checkbox"
      }, null, 512), [
        [Ss, l(i)]
      ]),
      r.$slots.default ? ee(r.$slots, "default", { key: 0 }) : (f(), A(U, { key: 1 }, [
        I(x(n.label), 1)
      ], 64))
    ]));
  }
}), Je = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [s, i] of e)
    t[s] = i;
  return t;
}, gc = {}, mc = { class: "text-sm font-bold" };
function vc(n, e) {
  return f(), A("div", mc, [
    ee(n.$slots, "default")
  ]);
}
const Y = /* @__PURE__ */ Je(gc, [["render", vc]]), Ac = {}, yc = { class: "mb-2" };
function bc(n, e) {
  return f(), A("div", yc, [
    ee(n.$slots, "default")
  ]);
}
const X = /* @__PURE__ */ Je(Ac, [["render", bc]]), wc = { class: "rounded-main p-2 border border-solid border-body-dark" }, Cc = { class: "flex gap-2 p-2 bg-white border border-solid border-body-dark rounded-main" }, He = /* @__PURE__ */ D({
  __name: "BaseEditor",
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = n, s = e, i = Xs({
      content: t.modelValue,
      extensions: [
        si
      ],
      onUpdate: () => {
        i.value && s("update:modelValue", i.value.getHTML());
      }
    });
    return Es(() => {
      var r;
      (r = i.value) == null || r.destroy();
    }), Be(() => t.modelValue, (r) => {
      !i.value || i.value.getHTML() === r || i.value.commands.setContent(r, !1);
    }), (r, o) => (f(), A("div", wc, [
      g(l(ei), { editor: l(i) }, null, 8, ["editor"]),
      l(i) ? (f(), z(l(ti), {
        key: 0,
        editor: l(i),
        "tippy-options": { duration: 100 }
      }, {
        default: w(() => [
          b("div", Cc, [
            b("button", {
              onClick: o[0] || (o[0] = (a) => l(i).chain().focus().toggleBold().run()),
              class: ce({ "font-bold": l(i).isActive("bold") })
            }, " bold ", 2),
            b("button", {
              onClick: o[1] || (o[1] = (a) => l(i).chain().focus().toggleItalic().run()),
              class: ce({ "font-bold": l(i).isActive("italic") })
            }, " italic ", 2),
            b("button", {
              onClick: o[2] || (o[2] = (a) => l(i).chain().focus().toggleStrike().run()),
              class: ce({ "font-bold": l(i).isActive("strike") })
            }, " strike ", 2)
          ])
        ]),
        _: 1
      }, 8, ["editor"])) : B("", !0)
    ]));
  }
}), xc = ["value"], _c = /* @__PURE__ */ D({
  __name: "BaseSelect",
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    items: {
      type: Array,
      required: !0
    },
    optionId: {
      type: String,
      required: !0
    },
    optionLabel: {
      type: String,
      required: !0
    }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = n, i = Le(t, "modelValue", e);
    return (r, o) => ze((f(), A("select", {
      label: "select",
      "onUpdate:modelValue": o[0] || (o[0] = (a) => we(i) ? i.value = a : null),
      class: "block bg-white rounded-main w-full p-2 border border-solid border-body-dark"
    }, [
      (f(!0), A(U, null, W(t.items, (a) => (f(), A("option", {
        key: a[t.optionId],
        value: a[t.optionId]
      }, x(a[t.optionLabel]), 9, xc))), 128))
    ], 512)), [
      [js, l(i)]
    ]);
  }
}), $c = { class: "text-lg font-bold" }, kc = {
  key: 0,
  class: "flex gap-2 items-center"
}, Mc = {
  key: 1,
  class: "flex gap-2 mt-2"
}, Fc = { key: 0 }, Tc = { key: 1 }, Sc = {
  key: 0,
  class: "flex flex-col gap-2"
}, jc = { class: "FormObject-Inner" }, Bc = { class: "FormObject-Row" }, Ic = { class: "FormObject-Row" }, Oc = { class: "FormObject-Row" }, Pc = { class: "my-2" }, Ec = { class: "FormObject-Title" }, Dc = { class: "FormObject-Row" }, Rc = { class: "FormObject-Title" }, Nc = { class: "FormObject-Row" }, Hc = {
  key: 0,
  class: "FormObject-ArrowName"
}, Vc = { class: "py-3 flex gap-1" }, Uc = /* @__PURE__ */ D({
  __name: "FormObject",
  setup(n) {
    const e = ut("FormObject"), {
      mapObjectCurrent: t,
      mapFile: s,
      mapObject: i,
      mapCurrent: r,
      drawer: o,
      mapObjectRemoved: a,
      mapObjectRelationRemoved: c,
      mapObjectUrl: d,
      controlCombo: u
    } = V(), {
      patron: h,
      chain: p,
      guest: y
    } = Z(), m = new ks(() => {
      const S = p.create();
      t.objectId(h.create(S.receiveKey("objectId"))), s.currentMap(h.create(S.receiveKey("map"))), S.result(h.create(
        y.create(({ map: F, objectId: k }) => {
          e("object opened", k), m.value = F.objects[k];
        })
      ));
    }).ref(), C = r.types(new j()).ref(), v = s.currentMap(new j()).ref(), M = new vt(m), O = d.url(M, new j()).ref(), G = () => {
      t.give(""), o.give("");
    }, Q = () => {
      a.give(m.value), G();
    }, ne = () => {
      i.give({
        ...m.value,
        outlink: m.value.outlink || O.value
      }), G();
    }, P = (S) => {
      c.give({
        index: S,
        object: m.value
      });
    };
    return u.happenedConditional(
      "KeyS",
      o.openedByName("object"),
      h.create(y.create(ne))
    ), (S, F) => (f(), z(mt, {
      name: "object",
      onClose: G
    }, {
      header: w(() => [
        b("h2", $c, x(S.$t("general.mapObject")), 1),
        l(m) ? (f(), A("small", kc, [
          b("span", null, " ID #" + x(l(m).id), 1)
        ])) : B("", !0),
        l(m) ? (f(), A("div", Mc, [
          l(m).createTimestamp ? (f(), A("div", Fc, " Создан: " + x(new Date(l(m).createTimestamp).toLocaleString()), 1)) : B("", !0),
          l(m).changeTimestamp ? (f(), A("div", Tc, " Изменен: " + x(new Date(l(m).changeTimestamp).toLocaleString()), 1)) : B("", !0)
        ])) : B("", !0)
      ]),
      footer: w(() => [
        b("div", Vc, [
          g(E, {
            type: "success",
            onClick: ne
          }, {
            default: w(() => [
              I(x(S.$t("general.save")), 1)
            ]),
            _: 1
          }),
          g(E, {
            type: "danger",
            onClick: Q
          }, {
            default: w(() => [
              I(x(S.$t("general.delete")), 1)
            ]),
            _: 1
          }),
          g(E, { onClick: G }, {
            default: w(() => [
              I(x(S.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: w(() => [
        l(m) ? (f(), A("div", Sc, [
          b("div", jc, [
            b("div", Bc, [
              g(nt, {
                modelValue: l(m).linked,
                "onUpdate:modelValue": F[0] || (F[0] = (k) => l(m).linked = k),
                label: S.$t("general.nameAsLink")
              }, null, 8, ["modelValue", "label"])
            ]),
            l(m).linked ? (f(), A(U, { key: 0 }, [
              g(Y, null, {
                default: w(() => [
                  I(x(S.$t("general.outerLink")), 1)
                ]),
                _: 1
              }),
              b("div", Ic, [
                g(oe, {
                  "model-value": l(m).outlink || l(O),
                  "onUpdate:modelValue": F[1] || (F[1] = (k) => l(m).outlink = k)
                }, null, 8, ["model-value"])
              ]),
              b("div", Oc, [
                g(nt, {
                  modelValue: l(m).targetBlank,
                  "onUpdate:modelValue": F[2] || (F[2] = (k) => l(m).targetBlank = k),
                  label: S.$t("general.inNewTab")
                }, null, 8, ["modelValue", "label"])
              ])
            ], 64)) : B("", !0),
            (f(!0), A(U, null, W(l(m).additionalFields, (k, q) => (f(), z(X, {
              class: "mb-2",
              key: q
            }, {
              default: w(() => [
                g(Y, { class: "mb-1" }, {
                  default: w(() => [
                    I(x(q), 1)
                  ]),
                  _: 2
                }, 1024),
                g(He, {
                  modelValue: l(m).additionalFields[q],
                  "onUpdate:modelValue": (le) => l(m).additionalFields[q] = le
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              _: 2
            }, 1024))), 128)),
            g(X, null, {
              default: w(() => [
                g(Y, null, {
                  default: w(() => [
                    I(x(S.$t("general.topName")), 1)
                  ]),
                  _: 1
                }),
                g(He, {
                  modelValue: l(m).additionalName,
                  "onUpdate:modelValue": F[3] || (F[3] = (k) => l(m).additionalName = k)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            g(X, null, {
              default: w(() => [
                g(Y, null, {
                  default: w(() => [
                    I(x(S.$t("general.bottomName")), 1)
                  ]),
                  _: 1
                }),
                g(He, {
                  modelValue: l(m).name,
                  "onUpdate:modelValue": F[4] || (F[4] = (k) => l(m).name = k)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            g(X, null, {
              default: w(() => [
                g(Y, null, {
                  default: w(() => [
                    I(x(S.$t("general.description")), 1)
                  ]),
                  _: 1
                }),
                g(He, {
                  modelValue: l(m).description,
                  "onUpdate:modelValue": F[5] || (F[5] = (k) => l(m).description = k)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            g(X, null, {
              default: w(() => [
                g(Y, null, {
                  default: w(() => [
                    I(" Z-Index ")
                  ]),
                  _: 1
                }),
                g(oe, {
                  modelValue: l(m).zindex,
                  "onUpdate:modelValue": F[6] || (F[6] = (k) => l(m).zindex = k),
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            g(X, null, {
              default: w(() => [
                g(Y, null, {
                  default: w(() => [
                    I(" Width ")
                  ]),
                  _: 1
                }),
                g(oe, {
                  modelValue: l(m).width,
                  "onUpdate:modelValue": F[7] || (F[7] = (k) => l(m).width = k),
                  step: "20",
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            g(X, null, {
              default: w(() => [
                g(Y, null, {
                  default: w(() => [
                    I(" Height ")
                  ]),
                  _: 1
                }),
                g(oe, {
                  modelValue: l(m).height,
                  "onUpdate:modelValue": F[8] || (F[8] = (k) => l(m).height = k),
                  step: "20",
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            g(X, null, {
              default: w(() => [
                g(Y, null, {
                  default: w(() => [
                    I(x(S.$t("general.objectType")), 1)
                  ]),
                  _: 1
                }),
                g(_c, {
                  modelValue: l(m).type,
                  "onUpdate:modelValue": F[9] || (F[9] = (k) => l(m).type = k),
                  items: l(C),
                  "option-id": "id",
                  "option-label": "name"
                }, null, 8, ["modelValue", "items"])
              ]),
              _: 1
            }),
            b("div", Pc, [
              g(nt, {
                modelValue: l(m).inMenu,
                "onUpdate:modelValue": F[10] || (F[10] = (k) => l(m).inMenu = k),
                label: S.$t("general.useInMenu")
              }, null, 8, ["modelValue", "label"])
            ]),
            l(m).inMenu ? (f(), A(U, { key: 1 }, [
              b("div", Ec, x(S.$t("general.menuOrder")), 1),
              b("div", Dc, [
                g(oe, {
                  modelValue: l(m).menuOrder,
                  "onUpdate:modelValue": F[11] || (F[11] = (k) => l(m).menuOrder = k),
                  type: "number"
                }, null, 8, ["modelValue"])
              ])
            ], 64)) : B("", !0),
            l(m).arrows && l(m).arrows.length ? (f(), A(U, { key: 2 }, [
              b("div", Rc, x(S.$t("general.relations")), 1),
              b("div", Nc, [
                (f(!0), A(U, null, W(l(m).arrows, (k, q) => {
                  var le;
                  return f(), A("div", {
                    key: k.id,
                    class: "FormObject-Arrow"
                  }, [
                    (le = l(v)) != null && le.objects[k.id] ? (f(), A("span", Hc, " #" + x(q + 1) + " " + x(l(v).objects[k.id].name), 1)) : B("", !0),
                    g(E, {
                      class: "FormObject-ArrowButton",
                      type: "danger",
                      size: "sm",
                      onClick: (ve) => P(q)
                    }, {
                      default: w(() => [
                        I(x(S.$t("general.delete")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]);
                }), 128))
              ])
            ], 64)) : B("", !0)
          ])
        ])) : B("", !0)
      ]),
      _: 1
    }));
  }
}), zc = { class: "BaseTextarea" }, Lc = ["v-bind"], Ms = /* @__PURE__ */ D({
  inheritAttrs: !1,
  __name: "BaseTextarea",
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const i = Le(n, "modelValue", e);
    return (r, o) => (f(), A("div", zc, [
      ze(b("textarea", {
        ref: "textarea",
        "v-bind": r.$attrs,
        "onUpdate:modelValue": o[0] || (o[0] = (a) => we(i) ? i.value = a : null),
        class: "rounded-main block w-full p-2 border min-h-[200px] border-solid border-body-dark"
      }, null, 8, Lc), [
        [os, l(i)]
      ])
    ]));
  }
}), Qc = { class: "text-lg font-bold" }, Wc = {
  key: 0,
  class: "flex flex-col"
}, Kc = { class: "flex justify-end pt-4 gap-2" }, Gc = /* @__PURE__ */ D({
  __name: "FormType",
  setup(n) {
    const {
      mapTypeCurrent: e,
      mapFile: t,
      mapType: s,
      modal: i,
      controlCombo: r
    } = V(), { patron: o, chain: a, guest: c } = Z();
    e.typeId(
      o.create(c.create((m) => {
        m && i.give("type");
      }))
    );
    const d = ie(""), u = a.create(), h = new ks(() => {
      e.typeId(o.create(u.receiveKey("typeId"))), t.currentMap(o.create(u.receiveKey("map"))), u.result(o.create(
        c.create(({ map: m, typeId: C }) => {
          var v;
          h.value = m.types[C], d.value = (v = h.value) == null ? void 0 : v.name;
        })
      ));
    }).ref(), p = () => {
      e.give(""), i.give(""), u.receiveKey("typeId").give("");
    }, y = () => {
      s.give({
        name: d.value,
        type: h.value
      }), p();
    };
    return r.happenedConditional(
      "KeyS",
      i.openedByName("type"),
      o.create(c.create(y))
    ), (m, C) => (f(), z(me, { name: "type" }, {
      header: w(() => [
        b("h2", Qc, x(m.$t("general.mapType")), 1)
      ]),
      footer: w(() => [
        b("div", Kc, [
          g(E, {
            type: "success",
            onClick: y
          }, {
            default: w(() => [
              I(x(m.$t("general.save")), 1)
            ]),
            _: 1
          }),
          g(E, { onClick: p }, {
            default: w(() => [
              I(x(m.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: w(() => [
        l(h) ? (f(), A("div", Wc, [
          g(X, null, {
            default: w(() => [
              g(Y, null, {
                default: w(() => [
                  I(" Название типа ")
                ]),
                _: 1
              }),
              g(oe, {
                modelValue: l(h).name,
                "onUpdate:modelValue": C[0] || (C[0] = (v) => l(h).name = v)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          g(X, null, {
            default: w(() => [
              g(Y, null, {
                default: w(() => [
                  I(" SVG ")
                ]),
                _: 1
              }),
              g(Ms, {
                modelValue: l(h).svg,
                "onUpdate:modelValue": C[1] || (C[1] = (v) => l(h).svg = v)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          g(X, null, {
            default: w(() => [
              g(Y, null, {
                default: w(() => [
                  I(" Ширина ")
                ]),
                _: 1
              }),
              g(oe, {
                modelValue: l(h).width,
                "onUpdate:modelValue": C[2] || (C[2] = (v) => l(h).width = v)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          g(X, null, {
            default: w(() => [
              g(Y, null, {
                default: w(() => [
                  I(" Высота ")
                ]),
                _: 1
              }),
              g(oe, {
                modelValue: l(h).height,
                "onUpdate:modelValue": C[3] || (C[3] = (v) => l(h).height = v)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          })
        ])) : B("", !0)
      ]),
      _: 1
    }));
  }
}), rt = T.debug("MapObjectsWithTemplates");
class Yc {
  constructor(e, t, s) {
    this.mapObjects = e, this.map = t, this.factories = s;
  }
  objects(e) {
    const t = this.factories.chain.create();
    return this.map.types(this.factories.guestCast.create(e, t.receiveKey("types"))), this.mapObjects.objects(this.factories.guestCast.create(e, t.receiveKey("objects"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ types: s, objects: i }) => {
        rt("visible objects", i);
        const r = i.map((o) => {
          const a = s.find((d) => String(d.id) === String(o.type));
          if (rt("check type existed", a), !a)
            return {
              obj: o,
              template: ""
            };
          let { svg: c } = a;
          return rt("type svg", c), o.additionalFields && Object.entries(o.additionalFields).forEach(([d, u]) => {
            c = c.replaceAll(`\${${d}}`, u);
          }), ["width", "height"].forEach((d) => {
            c = c.replaceAll(`\${${d}}`, o[d]);
          }), {
            obj: o,
            template: c
          };
        });
        e.give(r);
      })
    ), e;
  }
}
const Jc = /* @__PURE__ */ D({
  __name: "BaseNotify",
  setup(n) {
    const { notification: e } = V(), t = e.message(new j()).ref();
    return (s, i) => l(t) && l(t).text !== "hide" ? (f(), A("div", {
      key: 0,
      class: ce(["inline font-bold", `text-${l(t).type}-second`])
    }, x(l(t).text), 3)) : B("", !0);
  }
}), Zc = { class: "relative" }, qc = { class: "absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-1" }, Xc = { class: "text-sm z-10 p-2 absolute bottom-0 left-5" }, el = /* @__PURE__ */ Bs('<div class="absolute bottom-3 shadow-standard-second shadow-md drop-shadow right-3 z-10"><div class="grid-example grid grid-rows-2 grid-cols-2 bg-standard-second border border-standard-second gap-[1px] border-t-0 border-l-0"><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div></div></div><div class="absolute z-30 top-0 left-0 h-[18px] w-[22px] bg-white"></div>', 2), tl = ["title"], sl = { class: "font-bold" }, il = ["title"], nl = { class: "font-bold" }, rl = ["title"], ol = { class: "font-bold" }, al = ["title"], cl = { class: "font-bold" }, ll = ["data-object-id"], ul = { class: "absolute bottom-[100%] left-[50%] translate-x-[-50%] text-center pb-2 pointer-events-auto text-sm w-[300px]" }, hl = ["innerHTML", "onClick"], dl = ["innerHTML"], pl = ["data-object-id", "innerHTML"], fl = /* @__PURE__ */ D({
  __name: "TheEditor",
  setup(n) {
    const {
      canvas: e,
      mapObjectsVisible: t,
      mapCurrent: s,
      konvaLayer: i,
      fps: r,
      mapCurrentID: o,
      mapObjectUrl: a,
      stageSize: c,
      objectsOutsideScreen: d,
      stagePositionByObjectId: u,
      mapCurrentSource: h
    } = V(), p = Z(), y = r.value(new j()).ref(), C = new Yc(
      t,
      s,
      p
    ).objects(new j([])).ref(), v = c.value(new j()).ref(), M = i.position(new j()).ref(), O = je(() => {
      var ve;
      return (ve = v.value) == null ? void 0 : ve.width;
    }), G = new vt(O), Q = p.numberChunks.create(10, G).chunks(new j()).ref(), ne = ie();
    as(() => {
      e.give(ne.value);
    });
    const P = (ve) => {
      a.open(ve, p.guest.create((re) => {
        o.give(re);
      }));
    }, S = d.count(
      { axis: "x", direction: "negative" },
      new j()
    ).ref(), F = d.count(
      { axis: "x", direction: "positive" },
      new j()
    ).ref(), k = d.count(
      { axis: "y", direction: "negative" },
      new j()
    ).ref(), q = d.count(
      { axis: "y", direction: "positive" },
      new j()
    ).ref(), le = u.move.bind(u, h);
    return (ve, re) => {
      var At, yt, bt, wt, Ct, xt, _t, $t, kt, Mt, Ft, Tt;
      return f(), A("div", Zc, [
        b("div", qc, [
          b("div", Xc, [
            I(" Видимых объектов: " + x(l(C).length) + ", FPS: " + x(l(y)) + ", ", 1),
            g(Jc)
          ]),
          el,
          ((At = l(S)) == null ? void 0 : At.count) > 0 ? (f(), A("div", {
            key: 0,
            class: "pointer-events-auto absolute z-30 top-0 left-4 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(yt = l(S)) == null ? void 0 : yt.count} шт. объектов левее`,
            onClick: re[0] || (re[0] = (N) => l(le)(l(S).nearestObjectId))
          }, [
            g(J, { icon: "fa-arrow-left" }),
            b("span", sl, x((bt = l(S)) == null ? void 0 : bt.count), 1)
          ], 8, tl)) : B("", !0),
          ((wt = l(F)) == null ? void 0 : wt.count) > 0 ? (f(), A("div", {
            key: 1,
            class: "pointer-events-auto absolute z-30 p-1 top-0 right-0 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(Ct = l(F)) == null ? void 0 : Ct.count} шт. объектов правее`,
            onClick: re[1] || (re[1] = (N) => l(le)(l(F).nearestObjectId))
          }, [
            b("span", nl, x((xt = l(F)) == null ? void 0 : xt.count), 1),
            g(J, { icon: "fa-arrow-right" })
          ], 8, il)) : B("", !0),
          ((_t = l(k)) == null ? void 0 : _t.count) > 0 ? (f(), A("div", {
            key: 2,
            class: "pointer-events-auto absolute z-30 top-[18px] left-0 w-[18px] bg-white flex flex-col leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${($t = l(k)) == null ? void 0 : $t.count} шт. объектов выше`,
            onClick: re[2] || (re[2] = (N) => l(le)(l(k).nearestObjectId))
          }, [
            g(J, { icon: "fa-arrow-up" }),
            b("span", ol, x((kt = l(k)) == null ? void 0 : kt.count), 1)
          ], 8, rl)) : B("", !0),
          ((Mt = l(q)) == null ? void 0 : Mt.count) > 0 ? (f(), A("div", {
            key: 3,
            class: "pointer-events-auto absolute z-30 p-1 bottom-0 left-0 w-[18px] bg-white flex flex-col-reverse leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(Ft = l(q)) == null ? void 0 : Ft.count} шт. объектов ниже`,
            onClick: re[3] || (re[3] = (N) => l(le)(l(q).nearestObjectId))
          }, [
            g(J, { icon: "fa-arrow-down" }),
            b("span", cl, x((Tt = l(q)) == null ? void 0 : Tt.count), 1)
          ], 8, al)) : B("", !0),
          b("div", {
            class: ce({ "objects-container absolute top-0 left-0": !0 }),
            style: ae({ width: `${l(v).width}px`, height: `${l(v).height}px`, transform: `translate(${l(M).x}px, ${l(M).y}px)` })
          }, [
            b("div", {
              class: "absolute flex top-0 left-0 w-full z-20 h-[20px] bg-default border-b-2 border-border text-right text-sm px-2",
              style: ae({ transform: `translate(0, ${-l(M).y}px)` })
            }, [
              (f(!0), A(U, null, W(l(Q), (N) => (f(), A("span", {
                class: "flex-1 text-body-dark",
                key: `horiz_${N}`
              }, x(N) + "px", 1))), 128))
            ], 4),
            b("div", {
              class: "absolute flex [writing-mode:vertical-lr] top-0 left-0 h-full z-20 w-[20px] bg-default border-r-2 border-border text-left text-sm py-2",
              style: ae({ transform: `translate(${-l(M).x}px, 0)` })
            }, [
              (f(!0), A(U, null, W(l(Q), (N) => (f(), A("span", {
                class: "flex-1 rotate-180 text-body-dark",
                key: `vert_${N}`
              }, x(N) + "px", 1))), 128))
            ], 4),
            (f(!0), A(U, null, W(l(C), (N) => (f(), A("div", {
              key: N.obj.id,
              class: "absolute z-10",
              "data-object-id": N.obj.id,
              style: ae(`width:${N.obj.width}px;height: ${N.obj.height}px;top: ${N.obj.position[1]}px;left:${N.obj.position[0]}px;z-index:${N.obj.zindex}`)
            }, [
              b("div", ul, [
                b("span", {
                  innerHTML: N.obj.additionalName,
                  class: ce([N.obj.linked && "cursor-pointer underline"]),
                  onClick: (uu) => P(N.obj)
                }, null, 10, hl)
              ]),
              b("div", {
                class: "absolute top-[100%] left-[50%] translate-x-[-50%] text-center pt-2 text-sm w-[300px]",
                innerHTML: N.obj.name
              }, null, 8, dl),
              b("div", {
                "data-object-id": N.obj.id,
                class: "rendered-object",
                innerHTML: N.template
              }, null, 8, pl)
            ], 12, ll))), 128))
          ], 4)
        ]),
        b("div", {
          class: "h-full",
          ref_key: "canvasWrapper",
          ref: ne
        }, null, 512)
      ]);
    };
  }
}), gl = { class: "flex flex-wrap gap-2" }, ml = { key: 0 }, vl = { key: 1 }, Al = ["onClick"], yl = /* @__PURE__ */ D({
  __name: "BaseBreadcrumbs",
  setup(n) {
    const {
      breadcrumbs: e,
      mapCurrentID: t
    } = V(), s = e.list(new j()).ref();
    return (i, r) => (f(), A("div", gl, [
      (f(!0), A(U, null, W(l(s), (o, a) => (f(), A("span", {
        class: "flex gap-2",
        key: o.name
      }, [
        a !== 0 ? (f(), A("span", ml, "/")) : B("", !0),
        a === l(s).length - 1 ? (f(), A("b", vl, "Открыто: " + x(o.title), 1)) : (f(), A("a", {
          key: 2,
          href: "#",
          onClick: be((c) => l(t).give(o.name), ["prevent"])
        }, x(o.title), 9, Al))
      ]))), 128))
    ]));
  }
}), bl = { class: "flex items-center p-3 gap-3" }, wl = { class: "ml-auto gap-1 flex" }, Cl = /* @__PURE__ */ D({
  __name: "TheHeader",
  setup(n) {
    const {
      drawer: e,
      modal: t,
      mapHistory: s,
      controlCombo: i,
      settings: r
    } = V(), { patron: o, guest: a } = Z(), c = s.isNextPossible(new j()).ref(), d = s.isPrevPossible(new j()).ref();
    i.happened(
      "KeyZ",
      o.create(a.create(() => {
        d.value && s.prev();
      }))
    ), i.happened(
      "KeyP",
      o.create(a.create(() => {
        c.value && s.next();
      }))
    );
    const u = new j();
    return r.value(u), (h, p) => (f(), A("div", bl, [
      g(yl, { class: "TheHeader-Breadcrumbs" }),
      b("div", wl, [
        l(c) && !l(u).value.readonly ? (f(), z(E, {
          key: 0,
          size: "sm",
          title: "Отменить последнее действие",
          class: "w-7 block",
          onClick: p[0] || (p[0] = (y) => l(s).next())
        }, {
          default: w(() => [
            g(J, { icon: "fa-rotate-left" })
          ]),
          _: 1
        })) : B("", !0),
        l(d) && !l(u).value.readonly ? (f(), z(E, {
          key: 1,
          size: "sm",
          title: "Вернуть отмененное действие",
          class: "w-7 block",
          onClick: p[1] || (p[1] = (y) => l(s).prev())
        }, {
          default: w(() => [
            g(J, { icon: "fa-rotate-right" })
          ]),
          _: 1
        })) : B("", !0),
        g(E, {
          type: "success",
          size: "sm",
          class: "w-7 block e2e-open-menu",
          title: h.$t("general.menu"),
          onClick: p[2] || (p[2] = (y) => l(e).give("menu"))
        }, {
          default: w(() => [
            g(J, { icon: "fa-bars" })
          ]),
          _: 1
        }, 8, ["title"]),
        g(E, {
          title: h.$t("general.byText"),
          type: "primary",
          size: "sm",
          class: "w-7 block",
          onClick: p[3] || (p[3] = (y) => l(t).give("mapAsText"))
        }, {
          default: w(() => [
            g(J, { icon: "fa-text-width" })
          ]),
          _: 1
        }, 8, ["title"]),
        g(E, {
          class: "w-7 block e2e-search",
          size: "sm",
          onClick: p[4] || (p[4] = (y) => l(t).give("search"))
        }, {
          default: w(() => [
            g(J, { icon: "fa-search" })
          ]),
          _: 1
        }),
        g(E, {
          size: "sm",
          title: "Все карты файла",
          class: "w-7 block",
          onClick: p[5] || (p[5] = (y) => l(e).give("fileMaps"))
        }, {
          default: w(() => [
            g(J, { icon: "fa-map" })
          ]),
          _: 1
        })
      ])
    ]));
  }
}), xl = {}, _l = { class: "text-lg font-bold" };
function $l(n, e) {
  return f(), A("span", _l, [
    ee(n.$slots, "default")
  ]);
}
const kl = /* @__PURE__ */ Je(xl, [["render", $l]]), Ml = { class: "flex gap-1" }, Fl = {
  key: 0,
  class: "TheMapAsText select-auto"
}, Tl = ["innerHTML"], Sl = /* @__PURE__ */ D({
  __name: "TheMapAsText",
  setup(n) {
    const { mapFile: e, mapCurrent: t } = V(), {
      guest: s,
      patron: i,
      textOf: r,
      textNlAsBr: o,
      textWithoutHTML: a
    } = Z(), c = e.currentMap(new j()).ref(), d = ie(""), u = ie([]);
    t.objects(
      i.create(
        s.create(Ce((v) => {
          u.value = v, o.create(
            r.create(
              v.map((M) => `<div class="TheMapAsText-Item">
                <h3>${M.name}</h3><p>${M.additionalName || ""}</p><p>${M.description || ""}</p><p>${M.additionalFields && Object.values(M.additionalFields).join("</p><p>")}</p></div>`).join("")
            )
          ).asString(
            s.create((M) => {
              d.value = M;
            })
          );
        }, 500))
      )
    );
    const { share: h, isSupported: p } = Ps(), y = () => {
      p.value || alert("Sharing is not supported"), a.create(
        r.create(
          d.value
        )
      ).asString(
        s.create((v) => {
          h({
            text: v
          });
        })
      );
    }, m = ie(), C = () => {
      var v, M;
      if (c.value) {
        const O = new Range();
        O.setStart(m.value, 0), O.setEnd(m.value, Object.values(u.value).length), (v = document.getSelection()) == null || v.removeAllRanges(), (M = document.getSelection()) == null || M.addRange(O);
      }
    };
    return (v, M) => (f(), z(me, { name: "mapAsText" }, {
      header: w(() => [
        g(kl, { class: "block mb-3" }, {
          default: w(() => [
            I(x(v.$t("general.mapAsText")) + " ", 1),
            b("div", Ml, [
              g(E, {
                size: "sm",
                type: "success",
                class: "font-normal",
                onClick: y
              }, {
                default: w(() => [
                  I(x(v.$t("general.share")), 1)
                ]),
                _: 1
              }),
              g(E, {
                size: "sm",
                type: "primary",
                class: "font-normal",
                onClick: C
              }, {
                default: w(() => [
                  I(x(v.$t("general.selectAll")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        })
      ]),
      default: w(() => [
        l(c) ? (f(), A("article", Fl, [
          b("div", {
            ref_key: "textRef",
            ref: m,
            innerHTML: l(d)
          }, null, 8, Tl)
        ])) : B("", !0)
      ]),
      _: 1
    }));
  }
}), jl = { key: 1 }, Bl = /* @__PURE__ */ D({
  __name: "TheMiniMap",
  setup(n) {
    const { miniMap: e } = V(), t = e.points(new j()).ref(), s = e.size(new j()).ref(), i = e.viewportSize(new j()).ref(), r = e.viewportPosition(new j()).ref();
    return (o, a) => l(s) ? (f(), A("div", {
      key: 0,
      style: ae({
        width: `${l(s).width}px`,
        height: `${l(s).height}px`
      }),
      class: "absolute pointer-events-none block bg-white bottom-[10px] mt-3 right-3 z-1 border border-solid border-body-dark"
    }, [
      l(r) ? (f(), A("div", {
        key: 0,
        style: ae({
          width: `${l(i).width}px`,
          height: `${l(i).height}px`,
          top: `${l(r).y}px`,
          left: `${l(r).x}px`
        }),
        class: "absolute bg-primary/50"
      }, null, 4)) : B("", !0),
      l(t) ? (f(), A("div", jl, [
        (f(!0), A(U, null, W(l(t), (c) => (f(), A("div", {
          key: c.id,
          class: "absolute w-1 h-1 block bg-danger",
          style: ae({
            top: `${c.y}px`,
            left: `${c.x}px`,
            width: `${c.width}px`,
            height: `${c.height}px`
          })
        }, null, 4))), 128))
      ])) : B("", !0)
    ], 4)) : B("", !0);
  }
}), Il = { class: "text-lg font-bold" }, Ol = {
  key: 0,
  class: "TheSettings"
}, Pl = { class: "mb-2" }, El = { class: "TheSettings-Row" }, Dl = { class: "flex gap-2 mb-2" }, Rl = { class: "mb-2" }, Nl = { class: "mb-2" }, Hl = {
  href: "https://github.com/kosukhin/mind-map-creator",
  target: "_blank"
}, Vl = { class: "flex gap-2" }, Ul = /* @__PURE__ */ D({
  __name: "FormSettings",
  setup(n) {
    const {
      modal: e,
      mapFile: t,
      mapRemoved: s,
      mapSettings: i,
      controlCombo: r,
      parentNames: o,
      mapCurrentID: a
    } = V(), { patron: c, guest: d } = Z(), u = o.names(new j()).ref(), h = t.currentMap(new j()).ref(), p = a.id(new j()).ref(), y = () => {
      e.give("");
    }, m = () => {
      i.give(h.value.settings), y();
    };
    return r.happenedConditional(
      "KeyS",
      e.openedByName("settings"),
      c.create(d.create(m))
    ), (C, v) => (f(), z(me, { name: "settings" }, {
      header: w(() => [
        b("h2", Il, x(C.$t("general.mapSettings")), 1)
      ]),
      default: w(() => {
        var M;
        return [
          (M = l(h)) != null && M.settings ? (f(), A("div", Ol, [
            b("div", Pl, [
              b("div", El, [
                b("div", Dl, [
                  l(u).length > 1 ? (f(), z(E, {
                    key: 0,
                    type: "primary",
                    class: "text-white",
                    onClick: v[0] || (v[0] = (O) => l(e).give("parentTypes"))
                  }, {
                    default: w(() => [
                      I(x(C.$t("general.parentTypes")), 1)
                    ]),
                    _: 1
                  })) : B("", !0),
                  g(E, {
                    type: "primary",
                    class: "text-white",
                    onClick: v[1] || (v[1] = (O) => l(e).give("export"))
                  }, {
                    default: w(() => [
                      I(x(C.$t("general.exportOrImport")), 1)
                    ]),
                    _: 1
                  }),
                  g(E, {
                    type: "primary",
                    class: "text-white e2e-open-presets",
                    onClick: v[2] || (v[2] = (O) => l(e).give("presets"))
                  }, {
                    default: w(() => [
                      I(" Пресеты ")
                    ]),
                    _: 1
                  })
                ])
              ]),
              b("div", Rl, [
                b("label", null, [
                  b("b", null, x(C.$t("general.mapName")), 1),
                  g(oe, {
                    modelValue: l(h).settings.title,
                    "onUpdate:modelValue": v[3] || (v[3] = (O) => l(h).settings.title = O)
                  }, null, 8, ["modelValue"])
                ])
              ]),
              b("div", Nl, [
                b("a", Hl, x(C.$t("general.githubRepo")), 1)
              ])
            ]),
            b("div", Vl, [
              g(E, {
                class: "TheSettings-Button",
                type: "success",
                onClick: v[4] || (v[4] = (O) => m())
              }, {
                default: w(() => [
                  I(x(C.$t("general.save")), 1)
                ]),
                _: 1
              }),
              g(E, {
                class: "TheSettings-Button",
                onClick: y
              }, {
                default: w(() => [
                  I(x(C.$t("general.cancel")), 1)
                ]),
                _: 1
              }),
              g(E, {
                class: "TheSettings-Button",
                type: "danger",
                onClick: v[5] || (v[5] = (O) => {
                  l(s).give(l(p)), y();
                })
              }, {
                default: w(() => [
                  I(x(C.$t("general.removeMap")), 1)
                ]),
                _: 1
              })
            ])
          ])) : B("", !0)
        ];
      }),
      _: 1
    }));
  }
}), zl = {}, Ll = { class: "BaseGroup" };
function Ql(n, e) {
  return f(), A("div", Ll, [
    ee(n.$slots, "default")
  ]);
}
const Wl = /* @__PURE__ */ Je(zl, [["render", Ql]]), Kl = "default", Gl = /* @__PURE__ */ D({
  __name: "TheLinker",
  setup(n) {
    const { mapObjectsLink: e } = V(), t = e.objectIds(new j([])).ref();
    return (s, i) => (f(), z(E, {
      type: Kl,
      onClick: i[0] || (i[0] = (r) => l(e).startLink())
    }, {
      default: w(() => [
        I(x(l(t).length === 1 ? "Выбиретие объект" : l(t).length === 2 ? "Второй объект" : "Связать объекты"), 1)
      ]),
      _: 1
    }));
  }
}), Yl = { class: "flex e2e-sidebar flex-col items-center gap-3 max-h-[100%] overflow-hidden" }, Jl = { class: "TheSideBar-ItemName" }, Zl = ["innerHTML", "draggable", "title", "onDragend"], ql = {
  key: 0,
  class: "flex gap-1"
}, Xl = {
  key: 0,
  class: "mt-auto w-full p-3 pt-0"
}, eu = /* @__PURE__ */ D({
  __name: "TheSideBar",
  setup(n) {
    const {
      mapObjectNew: e,
      mapCurrent: t,
      mapTypeCurrent: s,
      mapTypeRemoved: i,
      mapTypeNew: r,
      modal: o,
      settings: a,
      sidebarDraggable: c
    } = V(), d = t.types(new j()).ref(), u = ie();
    as(() => {
      c.give(u.value);
    });
    const { svgMapTypeImage: h } = Z(), p = je(() => {
      var m;
      return (m = d.value) == null ? void 0 : m.map((C) => ({
        type: C,
        image: h.create(C).markup()
      })).sort((C, v) => +(C.type.name >= v.type.name));
    }), y = new j();
    return a.value(y), (m, C) => (f(), A("div", Yl, [
      b("div", {
        ref_key: "dragWrapperRef",
        ref: u,
        class: "flex flex-col gap-3 flex-grow w-full overflow-y-auto"
      }, [
        (f(!0), A(U, null, W(l(p), (v, M) => (f(), A("div", {
          key: M,
          class: "flex flex-col items-center justify-center gap-2"
        }, [
          b("div", Jl, x(v.type.name), 1),
          b("div", {
            innerHTML: v.image,
            class: "TheSideBar-ItemImage",
            draggable: l(y).value.readonly ? "false" : "true",
            style: ae(`width:${v.type.width}px;height:${v.type.height}px`),
            title: m.$t("general.notifications.dragToCanvasToAdd"),
            onDragend: (O) => l(e).byTypeName(v.type.id, O)
          }, null, 44, Zl),
          l(y).value.readonly ? B("", !0) : (f(), A("div", ql, [
            g(E, {
              class: "text-white",
              size: "sm",
              type: "primary",
              onClick: (O) => l(s).give(v.type.id)
            }, {
              default: w(() => [
                I(x(m.$t("general.change")), 1)
              ]),
              _: 2
            }, 1032, ["onClick"]),
            g(E, {
              class: "text-white",
              size: "sm",
              type: "danger",
              onClick: (O) => l(i).give(v.type)
            }, {
              default: w(() => [
                I(x(m.$t("general.delete")), 1)
              ]),
              _: 2
            }, 1032, ["onClick"])
          ]))
        ]))), 128))
      ], 512),
      l(y).value.readonly ? B("", !0) : (f(), A("div", Xl, [
        g(Wl, { class: "mb-1 grid gap-1 grid-cols-2" }, {
          default: w(() => [
            g(E, {
              title: m.$t("general.addType"),
              type: "success",
              onClick: C[0] || (C[0] = (v) => l(r).byName())
            }, {
              default: w(() => [
                g(J, { icon: "fa-plus-square" })
              ]),
              _: 1
            }, 8, ["title"]),
            g(E, {
              class: "e2e-show-settings",
              title: m.$t("general.settings"),
              type: "primary",
              onClick: C[1] || (C[1] = (v) => l(o).give("settings"))
            }, {
              default: w(() => [
                g(J, { icon: "fa-cog" })
              ]),
              _: 1
            }, 8, ["title"])
          ]),
          _: 1
        }),
        g(Gl, { class: "w-[100%] block mb-1" })
      ]))
    ]));
  }
});
class tu {
  constructor(e, t, s = !1) {
    this.basePatron = e, this.guest = t, this.refWatcherCreated = s;
  }
  ref() {
    return this.basePatron.ref();
  }
  get value() {
    return this.basePatron.value;
  }
  introduction() {
    return this.basePatron.introduction();
  }
  give(e) {
    return this.basePatron.give(e), this.refWatcherCreated || (this.refWatcherCreated = !0, Be(
      this.basePatron.ref(),
      (t) => {
        t && this.guest.give(t);
      },
      {
        deep: !0
      }
    )), this;
  }
}
class su {
  constructor(e) {
    this.baseSource = e;
  }
  value(e) {
    return this.baseSource.value(
      new K(e, (t) => {
        L(JSON.stringify(t), e);
      })
    ), this;
  }
  give(e) {
    return this.value((t) => {
      e !== t && this.baseSource.give(JSON.parse(e));
    }), this;
  }
  pool() {
    return this.baseSource.pool();
  }
}
class iu {
  constructor(e, t) {
    this.baseGuest = e, this.baseGuestAware = t;
  }
  value(e) {
    return this.baseGuestAware.value(e), this;
  }
  give(e) {
    return L(e, this.baseGuest), this;
  }
  pool() {
    throw Error("No pool in SourceDynamic");
  }
}
const nu = { class: "AppPresets" }, ru = /* @__PURE__ */ b("div", { class: "text-md font-bold mb-2" }, "Экспорт\\Импорт текущей карты", -1), ou = { class: "flex flex-col gap-2" }, au = /* @__PURE__ */ D({
  __name: "AppExport",
  setup(n) {
    const { mapFile: e, mapCurrent: t } = V(), s = new iu(
      t,
      new Ae((a) => {
        e.currentMap(new Ue(a));
      })
    ), i = new su(s), r = new tu(new j(), i);
    i.value(r);
    const o = r.ref();
    return (a, c) => (f(), z(me, { name: "export" }, {
      default: w(() => [
        b("div", nu, [
          ru,
          b("div", ou, [
            g(Ms, {
              modelValue: l(o),
              "onUpdate:modelValue": c[0] || (c[0] = (d) => we(o) ? o.value = d : null)
            }, null, 8, ["modelValue"])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), cu = { class: "bg-body absolute top-0 left-0 w-full h-full" }, lu = { class: "grid grid-cols-[200px_1fr] grid-rows-[50px_1fr] h-dvh relative" }, bu = /* @__PURE__ */ D({
  __name: "PatronSchemeEditor",
  props: {
    modelValue: {
      type: String,
      required: !0
    },
    readonly: {
      type: Boolean,
      default: !1
    },
    presets: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = n, s = e, { fileContent: i, settings: r } = V(), { guest: o, patron: a } = Z();
    return r.value((c) => {
      r.give({
        ...c,
        readonly: t.readonly,
        presets: t.presets
      });
    }), Be(() => t.modelValue, (c) => {
      i.value(o.create((d) => {
        c !== d && i.give(c);
      }));
    }, {
      immediate: !0
    }), i.value(a.create((c) => {
      s("update:modelValue", c);
    })), (c, d) => (f(), A("div", cu, [
      b("div", lu, [
        g(Cl, { class: "col-span-2" }),
        g(eu),
        g(fl, { class: "w-auto col-auto h-full" }),
        g(Bl)
      ]),
      g(Uc),
      g(Gc),
      g(Ul),
      g(qa),
      g(pc),
      g(au),
      g(Ha),
      g(Sl),
      g(ac),
      g(Oa)
    ]));
  }
}), is = T.debug("FileSystemContent");
class wu {
  constructor(e, t, s) {
    $(this, "contentPatrons");
    $(this, "fileHandler", null);
    $(this, "contentSource");
    this.launchQueue = e, this.notification = t, this.factories = s, this.contentPatrons = s.pool.create(this), this.contentSource = s.sourceEmpty.create();
  }
  content(e) {
    const t = this.factories.guest.create((s) => {
      this.fileHandler = s, this.factories.fileHandlerContent.create(s).content(
        this.factories.guest.create((i) => {
          this.contentPatrons.distribute(i, e), this.contentSource.give(i);
        })
      );
    });
    return this.fileHandler || this.launchQueue.fileHandler(t), this.contentSource.value(e), this;
  }
  give(e) {
    if (is("save file as content string", e), !this.fileHandler)
      throw new Se("Cant save file because no fileHandler");
    try {
      return this.contentSource.give(e), this.factories.browserFileSaved.create(this.fileHandler).save(e), this.contentPatrons.give(e), this;
    } catch (t) {
      throw new Se("Cant handle receive for map file FS", { cause: t });
    } finally {
      this.notification.give({
        type: "success",
        text: "Успешно сохранен файл карты!"
      });
    }
  }
  canBeUsed(e) {
    const t = "launchQueue" in window;
    is("can be used", t);
    const s = window && window.matchMedia("(display-mode: standalone)");
    return e.give(t && s.matches), e;
  }
}
const Ve = T.debug("FirstPossibleFileContent");
class Cu {
  constructor(e, t) {
    $(this, "firstPossibleFileContent", null);
    $(this, "contentSource", new ye());
    $(this, "canBeUsedSource", new ye());
    Ve("length", e.length), e.forEach((s) => {
      s.canBeUsed(
        t.patronOnce.create(
          t.guest.create((i) => {
            Ve("canbeused result", s, i), i && !this.firstPossibleFileContent && (this.firstPossibleFileContent = s, s.canBeUsed(t.patron.create(this.canBeUsedSource)), s.content(t.patron.create(this.contentSource)), this.contentSource.value(
              t.patron.create((r) => {
                s.content(
                  t.guest.create((o) => {
                    r !== o && s.give(r);
                  })
                );
              })
            ));
          })
        )
      );
    });
  }
  canBeUsed(e) {
    return Ve("can be used to", this.firstPossibleFileContent), this.canBeUsedSource.value(e), e;
  }
  content(e) {
    return Ve("content to", this.firstPossibleFileContent), this.contentSource.value(e), this;
  }
  give(e) {
    return this.contentSource.give(e), this;
  }
}
const ot = T.debug("UrlContent");
class xu {
  constructor(e, t) {
    $(this, "contentCache");
    this.notification = e, this.factories = t, this.contentCache = t.sourceEmpty.create();
  }
  canBeUsed(e) {
    if (!window)
      return e.give(!1), this;
    const t = window.location.search.indexOf("?view=") > -1;
    if (ot("can be used", t), e.give(window.location.search.indexOf("?view=") > -1), t) {
      const s = window.location.search.split("=")[1] ?? "";
      fetch(s, { redirect: "follow" }).then((i) => i.text()).then((i) => {
        ot("received text", i), this.contentCache.give(i);
      });
    }
    return e;
  }
  content(e) {
    if (!window)
      return this;
    const t = window.location.search.split("=")[1] ?? "";
    return ot("visit url", t), this.contentCache.value(this.factories.patronOnce.create(e)), this;
  }
  give() {
    return this.notification.give({
      type: "error",
      text: "Невозможно сохранить карту, открытую по ссылке!"
    }), this;
  }
}
const ns = new ye();
class _u {
  constructor(e = window.launchQueue, t = "launchQueue" in window) {
    $(this, "isCalculated", !1);
    this.launchQueue = e, this.isLaunchQueueSupported = t;
  }
  fileHandler(e) {
    return this.isLaunchQueueSupported && !this.isCalculated && (this.isCalculated = !0, this.launchQueue.setConsumer((t) => {
      if (t.files && t.files.length) {
        const [s] = t.files;
        ns.give(s);
      }
    })), ns.value(e), this;
  }
}
export {
  _u as BrowserLaunchQueue,
  wu as FileSystemContent,
  Cu as FirstPossibleFileContent,
  bu as PatronSchemeEditor,
  xu as UrlContent,
  j as VueRefPatron,
  V as useApplication,
  Z as useFactories
};
