var Fs = Object.defineProperty;
var Ts = (n, e, t) => e in n ? Fs(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var $ = (n, e, t) => Ts(n, typeof e != "symbol" ? e + "" : e, t);
import { defineComponent as D, openBlock as f, createBlock as z, Transition as rs, withCtx as w, unref as l, createElementBlock as A, normalizeClass as ce, createElementVNode as b, withModifiers as ye, renderSlot as ee, createCommentVNode as B, Fragment as U, renderList as W, toDisplayString as x, createVNode as g, normalizeStyle as ae, createTextVNode as O, withDirectives as ze, isRef as be, vModelText as os, vModelCheckbox as Ss, vModelSelect as js, createStaticVNode as Bs } from "vue";
import { useScriptTag as Os, useMagicKeys as Is, useVModel as Le, useShare as Ps } from "@vueuse/core";
import he from "konva";
import { ref as ie, computed as je, watch as Be, onBeforeUnmount as Es, onMounted as as } from "@vue/runtime-core";
import { FontAwesomeIcon as Ds } from "@fortawesome/vue-fontawesome";
import { faArrowUp as Rs, faArrowDown as Hs, faArrowRight as Ns, faArrowLeft as Vs, faClose as Us, faMap as zs, faRotateRight as Ls, faRotateLeft as Qs, faFileText as Ws, faCog as Ks, faPlusSquare as Gs, faHistory as Ys, faSearch as qs, faTextWidth as Js, faBars as Zs } from "@fortawesome/free-solid-svg-icons";
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
class Te {
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
    const s = (i, o) => {
      this.patrons.forEach((r) => {
        this.sendValueToGuest(i, r, o);
      });
    };
    this.give = (i, o) => {
      const r = () => {
        r === t && s(i, o);
      };
      return t = r, queueMicrotask(r), this;
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
class Oe {
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
var di = Object.defineProperty, pi = (n, e, t) => e in n ? di(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Ie = (n, e, t) => pi(n, typeof e != "symbol" ? e + "" : e, t);
class ct {
  constructor() {
    Ie(this, "theChain"), Ie(this, "keysKnown", /* @__PURE__ */ new Set()), Ie(this, "keysFilled", /* @__PURE__ */ new Set()), Ie(this, "filledChainPool", new hi(this)), this.theChain = new Oe({});
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
class fe {
  constructor() {
    Ci(this, "baseSource", new Oe(null));
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
        for (let o = 1; o <= this.chunksCount; o += 1)
          i.push(o * s);
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
    return Os(this.url, () => {
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
class Oi {
  constructor(e) {
    this.text = e;
  }
  asString(e) {
    return e.give(this.text), e;
  }
}
class Ii {
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
var at = { exports: {} }, Je, Ot;
function Pi() {
  if (Ot) return Je;
  Ot = 1;
  var n = 1e3, e = n * 60, t = e * 60, s = t * 24, i = s * 7, o = s * 365.25;
  Je = function(u, h) {
    h = h || {};
    var p = typeof u;
    if (p === "string" && u.length > 0)
      return r(u);
    if (p === "number" && isFinite(u))
      return h.long ? c(u) : a(u);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(u)
    );
  };
  function r(u) {
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
            return p * o;
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
  return Je;
}
function Ei(n) {
  t.debug = t, t.default = t, t.coerce = c, t.disable = o, t.enable = i, t.enabled = r, t.humanize = Pi(), t.destroy = d, Object.keys(n).forEach((u) => {
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
      const M = C, I = Number(/* @__PURE__ */ new Date()), G = I - (h || I);
      M.diff = G, M.prev = h, M.curr = I, h = I, v[0] = t.coerce(v[0]), typeof v[0] != "string" && v.unshift("%O");
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
  function o() {
    const u = [
      ...t.names.map(a),
      ...t.skips.map(a).map((h) => "-" + h)
    ].join(",");
    return t.enable(""), u;
  }
  function r(u) {
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
  e.formatArgs = s, e.save = i, e.load = o, e.useColors = t, e.storage = r(), e.destroy = /* @__PURE__ */ (() => {
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
  function o() {
    let c;
    try {
      c = e.storage.getItem("debug");
    } catch {
    }
    return !c && typeof process < "u" && "env" in process && (c = process.env.DEBUG), c;
  }
  function r() {
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
class Hi {
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
const Ni = new R(Oe), Vi = new R(Oe), Ui = new R(fe), zi = new R(pe), Li = new R(K), Qi = new R(Te), Wi = new R(Qe), Ki = new R(gi), Gi = new R(yi), Yi = new R(K), qi = new R(ct), Ji = new R(fi), de = {
  cache: Ni,
  chain: qi,
  guest: zi,
  guestCast: Li,
  guestAware: Qi,
  guestInTheMiddle: Yi,
  guestSync: Ji,
  patron: Ki,
  patronOnce: Gi,
  pool: Wi,
  source: Vi,
  sourceEmpty: Ui
}, Zi = new R(xi), Xi = new R(_i), en = new R(ki), tn = new R($i), ls = new R(Mi), sn = new R(Fi, { ...de, svgImage: ls }), nn = new R(Ti, de), rn = new R(Si, de), on = new R(ji, de), an = new R(Bi, de), cn = new R(Oi), ln = new R(Ii, de), un = new R(Hi, de), hn = {
  ...de,
  fileHandlerContent: Zi,
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
}, J = () => hn;
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
const Ze = T.debug("MapCurrent");
class us {
  constructor(e, t, s) {
    $(this, "objectsCache");
    $(this, "settingsCache");
    $(this, "typesCache");
    this.mapFile = e, this.mapId = t, this.factories = s, this.objectsCache = s.sourceEmpty.create(), this.settingsCache = s.sourceEmpty.create(), this.typesCache = s.sourceEmpty.create(), e.currentMap(
      s.patron.create(
        s.guest.create((i) => {
          Ze("current map changed", i), this.settingsCache.give(i.settings), this.objectsCache.give(Object.values(i.objects)), this.typesCache.give(
            Object.entries(i.types).map(([o, r]) => ({
              ...r,
              id: o
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
    return Ze("notify about new objects"), this.objectsCache.value(e), e;
  }
  types(e) {
    return this.typesCache.value(e), e;
  }
  give(e) {
    return Ze("save map document", e), this.mapId.id(
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
const Ee = T.debug("MapHistory"), It = (n) => {
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
                (o) => It(o) === It(e)
              );
              if (Ee("isMapFromHistory", i), !i) {
                const o = s[t] ? [s[t]] : [];
                this.historyIndex.give(0), this.mapsHistory.give([e, ...o, ...s.slice(0, 9)]);
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
          const o = s < i.length - 1;
          Ee("recalculate is prev possible", o), e.give(o);
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
          const o = s > 0 && s <= i.length - 1;
          Ee("recalculate is next possible", o), e.give(o);
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
        const o = this.factories.transformToObject.create(i).result();
        De("get map file", o), this.mapFileCache.give(o);
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
            const o = i[s];
            this.currentMapPatrons.distribute(
              o != null && o.structure ? o.structure : o,
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
        Object.values(s.objects).forEach((o) => {
          i = i || o.arrows.some((r) => r.id === e.id);
        }), t.give(!i || "У объекта есть входящие связи!");
      })
    ), this;
  }
}
const Xe = T.debug("MapObjectNew");
class wn {
  constructor(e, t, s, i, o) {
    this.map = e, this.mapObject = t, this.canvas = s, this.stagePosition = i, this.factories = o;
  }
  byTypeName(e, t) {
    return Xe("start to add new type", e, t), this.stagePosition.position(
      this.factories.guest.create((s) => {
        this.map.types(
          this.factories.guest.create((i) => {
            this.canvas.canvas(
              this.factories.guest.create((o) => {
                const r = o.getBoundingClientRect(), a = i.find((u) => u.id === e);
                Xe("is type found", a);
                const c = t.x - r.left, d = t.y - r.top;
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
        const s = t.split("_").filter((r) => !!r);
        let i = "";
        const o = s.map((r) => {
          const a = `${i}${r}`;
          return i || (i = "_"), i += `${r}_`, a;
        });
        i = "", e.give(o);
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
  constructor(e, t, s, i, o) {
    $(this, "objectIdsCache");
    this.mapObjectCurrent = e, this.map = t, this.mapObject = s, this.newArrow = i, this.factories = o, this.objectIdsCache = o.cache.create([]);
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
                const [, o] = t, r = i.find((a) => a.id === o);
                r && this.newArrow.forObject(r);
              })
            ), t.length === 3 && (this.newArrow.dispose(), this.mapObjectCurrent.silenceOff(), this.map.objects(
              this.factories.guest.create((i) => {
                const [, o, r] = t, a = i.find((c) => c.id === o);
                a && r && (this.objectIdsCache.give([]), this.mapObject.give({
                  ...a,
                  arrows: [
                    ...a.arrows,
                    {
                      id: r,
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
var dt = Mn, Fn = typeof Pe == "object" && Pe && Pe.Object === Object && Pe, Tn = Fn, Sn = Tn, jn = typeof self == "object" && self && self.Object === Object && self, Bn = Sn || jn || Function("return this")(), ds = Bn, On = ds, In = function() {
  return On.Date.now();
}, Pn = In, En = /\s/;
function Dn(n) {
  for (var e = n.length; e-- && En.test(n.charAt(e)); )
    ;
  return e;
}
var Rn = Dn, Hn = Rn, Nn = /^\s+/;
function Vn(n) {
  return n && n.slice(0, Hn(n) + 1).replace(Nn, "");
}
var Un = Vn, zn = ds, Ln = zn.Symbol, ps = Ln, Et = ps, fs = Object.prototype, Qn = fs.hasOwnProperty, Wn = fs.toString, xe = Et ? Et.toStringTag : void 0;
function Kn(n) {
  var e = Qn.call(n, xe), t = n[xe];
  try {
    n[xe] = void 0;
    var s = !0;
  } catch {
  }
  var i = Wn.call(n);
  return s && (e ? n[xe] = t : delete n[xe]), i;
}
var Gn = Kn, Yn = Object.prototype, qn = Yn.toString;
function Jn(n) {
  return qn.call(n);
}
var Zn = Jn, Dt = ps, Xn = Gn, er = Zn, tr = "[object Null]", sr = "[object Undefined]", Rt = Dt ? Dt.toStringTag : void 0;
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
var hr = ur, dr = Un, Ht = dt, pr = hr, Nt = NaN, fr = /^[-+]0x[0-9a-f]+$/i, gr = /^0b[01]+$/i, mr = /^0o[0-7]+$/i, vr = parseInt;
function Ar(n) {
  if (typeof n == "number")
    return n;
  if (pr(n))
    return Nt;
  if (Ht(n)) {
    var e = typeof n.valueOf == "function" ? n.valueOf() : n;
    n = Ht(e) ? e + "" : e;
  }
  if (typeof n != "string")
    return n === 0 ? n : +n;
  n = dr(n);
  var t = gr.test(n);
  return t || mr.test(n) ? vr(n.slice(2), t ? 2 : 8) : fr.test(n) ? Nt : +n;
}
var yr = Ar, br = dt, et = Pn, Vt = yr, wr = "Expected a function", Cr = Math.max, xr = Math.min;
function _r(n, e, t) {
  var s, i, o, r, a, c, d = 0, u = !1, h = !1, p = !0;
  if (typeof n != "function")
    throw new TypeError(wr);
  e = Vt(e) || 0, br(t) && (u = !!t.leading, h = "maxWait" in t, o = h ? Cr(Vt(t.maxWait) || 0, e) : o, p = "trailing" in t ? !!t.trailing : p);
  function y(P) {
    var S = s, F = i;
    return s = i = void 0, d = P, r = n.apply(F, S), r;
  }
  function m(P) {
    return d = P, a = setTimeout(M, e), u ? y(P) : r;
  }
  function C(P) {
    var S = P - c, F = P - d, k = e - S;
    return h ? xr(k, o - F) : k;
  }
  function v(P) {
    var S = P - c, F = P - d;
    return c === void 0 || S >= e || S < 0 || h && F >= o;
  }
  function M() {
    var P = et();
    if (v(P))
      return I(P);
    a = setTimeout(M, C(P));
  }
  function I(P) {
    return a = void 0, p && s ? y(P) : (s = i = void 0, r);
  }
  function G() {
    a !== void 0 && clearTimeout(a), d = 0, s = c = i = a = void 0;
  }
  function Q() {
    return a === void 0 ? r : I(et());
  }
  function ne() {
    var P = et(), S = v(P);
    if (s = arguments, i = this, c = P, S) {
      if (a === void 0)
        return m(c);
      if (h)
        return clearTimeout(a), a = setTimeout(M, e), y(c);
    }
    return a === void 0 && (a = setTimeout(M, e)), r;
  }
  return ne.cancel = G, ne.flush = Q, ne;
}
var gs = _r;
const we = /* @__PURE__ */ lt(gs), $r = (n) => {
  if (n[n.length - 1] === "/") {
    const e = n.split("");
    return e.splice(e.length - 1, 1), e.join("");
  }
  return n;
}, kr = we((n) => {
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
        this.factories.guest.create((o) => {
          tt("open map name", s, o), t.give(o);
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
            const o = i[0] === "_" ? i.replaceAll("_", "/") : "/current", r = s.name ? s.name : s.additionalName ? s.additionalName : "";
            this.factories.textNoHtml.create(this.factories.source.create(r)).noHtml(
              this.factories.guest.create((a) => {
                let c = s.outlink ? s.outlink : `${o}/${Fr(a)}`;
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
        let { x: o, y: r } = t;
        o < 30 && (o = 30), r < 30 && (r = 30);
        const a = i.width - e.width;
        o > a && (o = a);
        const c = i.height - e.height;
        r > c && (r = c), Tr("position", o, r), s.give({ x: o, y: r });
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
class Or {
  constructor(e, t, s, i) {
    this.map = e, this.stageSize = t, this.layer = s, this.factories = i;
  }
  count(e, t) {
    const s = e.direction === "positive", i = this.factories.chain.create();
    return this.map.objects(this.factories.guestCast.create(t, i.receiveKey("objects"))), this.layer.layer(this.factories.guestCast.create(t, i.receiveKey("layer"))), this.layer.position(this.factories.guestCast.create(t, i.receiveKey("position"))), i.result(
      this.factories.guestInTheMiddle.create(
        t,
        ({ objects: o, layer: r, position: a }) => {
          var h;
          const c = Br[e.direction], u = o.sort(
            (p, y) => p.position[st[e.axis]] * c - y.position[st[e.axis]] * c
          ).filter((p) => {
            const y = p.position[st[e.axis]] + (s ? 0 : p[Ut[e.axis]]), m = a[e.axis] * -1 + (s ? r[Ut[e.axis]]() : 0);
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
class Ir {
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
const Hr = T.debug("MapTypeUsed");
class Nr {
  constructor(e, t) {
    this.mapFile = e, this.factories = t;
  }
  check(e, t) {
    return this.mapFile.currentMap(
      this.factories.guest.create((s) => {
        const i = Object.values(s.objects).some(
          (o) => o.type === e.name
        );
        Hr("is type used", i), t.give(!i || "Тип карты использован");
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
        const o = s.slice(0, -1);
        Lt("parent names", o);
        const r = {};
        o.map((c) => i[c]).forEach((c) => {
          Object.values(c.types).forEach((d) => {
            r[d.name] = d;
          });
        }), e.give(Object.values(r));
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
        we((i) => {
          i = i.toLowerCase(), this.map.objects(
            this.factories.guest.create((o) => {
              if (!i) {
                Qt("reset results"), t.give([]);
                return;
              }
              const r = o.filter(
                (a) => {
                  var c;
                  return a.name.toLowerCase().includes(i) || ((c = a.additionalName) == null ? void 0 : c.toLowerCase().includes(i)) || Object.values(a.additionalFields ?? {}).join(" ").toLowerCase().includes(i);
                }
              );
              Qt("objects in searching", r, i), t.give(r);
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
            const o = i.width - s.clientWidth, r = i.height - s.clientHeight, a = e.x * -1, c = e.y * -1;
            if (r < 0 || o < 0)
              return { x: 0, y: 0 };
            Wt("boundings", r, o, c, a), t.give({
              x: e.x > 0 ? 0 : a > o ? o * -1 : e.x,
              y: e.y > 0 ? 0 : c > r ? r * -1 : e.y
            });
          })
        );
      })
    ), t;
  }
}
const _e = T.debug("app:MapObjectsVisible");
class Kr {
  constructor(e, t, s, i) {
    $(this, "visibleObjectsCache", new fe());
    _e("constructor initialized");
    const o = i.chain.create();
    t.size(i.patron.create(o.receiveKey("size"))), e.position(i.patron.create(o.receiveKey("position"))), s.currentMap(i.patron.create(o.receiveKey("map"))), o.result(
      i.patron.create(
        i.guest.create(({ position: r, size: a, map: c }) => {
          const d = Object.values(c.objects);
          _e("objects come to result", d);
          const u = d.filter((h) => {
            const p = c.types[h.type] ?? {}, y = {
              width: h.width || p.width,
              height: h.height || p.height
            };
            return this.isInBounding(r, a, h.position, y);
          });
          _e("visible objects calculated", u), this.visibleObjectsCache.give(u);
        })
      )
    );
  }
  objects(e) {
    return this.visibleObjectsCache.value(e), this;
  }
  isInBounding(e, t, s, i) {
    const o = e.x, r = e.x - t.width, a = e.y, c = e.y - t.height, [d, u] = s;
    return _e("bounding vars", o, r, a, c), _e("object position", s), o > -d - i.width && -d > r && a > -u - i.height && -u > c;
  }
}
const Gr = (n, e) => {
  const t = n.matchAll(e);
  return Array.from(t).map((s) => s[1]);
}, Yr = (n, e) => n.reduce((t, s) => (t[s] = e[s] || s, t), {});
class qr {
  constructor(e, t, s, i) {
    this.mapFile = t, this.mapObject = s, this.factories = i, e.objectId(this);
  }
  give(e) {
    return this.mapFile.currentMap(
      this.factories.guest.create((t) => {
        const s = t.objects[e];
        if (!s)
          return;
        const i = t.types[s.type], o = /\$\{([a-zA-Z1-9]+)\}/g, a = Gr(i.svg, o).filter((c) => c !== "width" && c !== "height");
        s.additionalFields = Yr(a, s.additionalFields ?? {}), this.mapObject.give(s);
      })
    ), this;
  }
  introduction() {
    return "patron";
  }
}
const Kt = 20, Jr = ut("ArrowPath");
class Zr {
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
    ), o = this.arrowPointPosition(
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
      +o.breakPoint.x + o.shift.x,
      +o.breakPoint.y + o.shift.y,
      +o.point.x + o.shift.x,
      +o.point.y + o.shift.y
    ]), this;
  }
  arrowPointPosition(e, t, s, i) {
    const o = {
      x: +i.x + Math.round(s.width / 2),
      y: +i.y + Math.round(s.height / 2)
    }, r = {
      x: +t.x + Math.round(e.width / 2),
      y: +t.y + Math.round(e.height / 2)
    }, a = Math.abs(o.x - r.x) - (s.width + Kt), c = Math.abs(o.y - r.y) - (s.height + Kt);
    return a < 0 || c < 0 ? (Jr("ArrowPath", a, c), this.arrowPointPositionNear(
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
    const o = {
      x: +i.x + Math.round(s.width / 2),
      y: +i.y + Math.round(s.height / 2)
    }, r = {
      x: +t.x + Math.round(e.width / 2),
      y: +t.y + Math.round(e.height / 2)
    }, a = r.x - o.x, c = r.y - o.y, d = Math.abs(c) > Math.abs(a);
    let u = +t.x, h = +t.y;
    const p = d && c >= 0, y = !d && a >= 0, m = d && c < 0, C = !d && a < 0, v = { x: 0, y: 0 };
    let M = 0, I = 0;
    p ? (u += Math.round(e.width / 2), v.x = u, v.y = (t.y + i.y + s.height) / 2, M = i.x > t.x ? 1 : -1) : C ? (h += Math.round(e.height / 2), u += +e.width, v.x = (t.x + e.width + i.x) / 2, v.y = h, I = i.y > t.y ? 1 : -1) : m ? (u += Math.round(e.width / 2), h += +e.height, v.x = u, v.y = (t.y + e.height + i.y) / 2, M = i.x > t.x ? 1 : -1) : y && (h += Math.round(e.height / 2), v.x = (t.x + i.x + s.width) / 2, v.y = h, I = i.y > t.y ? 1 : -1);
    const G = [u, h].join("-"), Q = this.filledPoints.get(G) || 0;
    return this.filledPoints.set(G, Q + 1), {
      point: { x: u, y: h },
      breakPoint: v,
      shift: {
        x: M * Q * 10,
        y: I * Q * 10
      }
    };
  }
  arrowPointPositionFar(e, t, s, i) {
    const o = [];
    let c = 0, d = 0;
    const u = [0, 0].join("-"), h = this.filledPoints.get(u) || 0;
    return {
      point: { x: 0, y: 0 },
      breakPoint: o,
      shift: {
        x: c * h * 10,
        y: d * h * 10
      }
    };
  }
}
class Xr {
  constructor(e, t) {
    this.objectsSource = e, this.objectsMapSource = t;
  }
  value(e) {
    const t = new ct();
    return this.objectsSource.value(new K(e, t.receiveKey("objects"))), this.objectsMapSource.value(new K(e, t.receiveKey("objectsMap"))), t.result(
      new K(
        e,
        ({ objects: s, objectsMap: i }) => {
          const o = [];
          s.forEach((r) => {
            r.arrows.forEach((a) => {
              const c = i[a.id];
              c && o.push({
                fromObject: r,
                toObject: c
              });
            });
          }), L(o, e);
        }
      )
    ), this;
  }
}
class eo {
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
    }, o = i.x - s.x, r = i.y - s.y, a = Math.abs(r) > Math.abs(o);
    let c = +e.position[0], d = +e.position[1];
    const u = a && r >= 0, h = !a && o >= 0, p = a && r < 0, y = !a && o < 0, m = { x: 0, y: 0 };
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
class to {
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
      fullWidth: e.position[0] + e.width
    }, i = {
      startHeight: t.position[1],
      startWidth: t.position[0],
      midHeight: t.position[1] + Math.round(t.height / 2),
      midWidth: t.position[0] + Math.round(t.width / 2),
      fullHeight: t.position[1] + t.height,
      fullWidth: t.position[0] + t.width
    }, o = {
      "left-top": () => s.fullWidth < i.startWidth && s.fullHeight < i.startHeight,
      "right-top": () => i.fullWidth < s.startWidth && s.fullHeight < i.startHeight,
      "left-bottom": () => s.fullWidth < i.startWidth && i.fullHeight < s.startHeight,
      "right-bottom": () => i.fullWidth < s.startWidth && i.fullHeight < s.startHeight
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
      "left-bottom": () => [s.fullWidth, s.midHeight, i.midWidth, s.midHeight, i.midWidth, i.fullHeight],
      "right-bottom": () => [s.startWidth, s.midHeight, i.midWidth, s.midHeight, i.midWidth, i.fullHeight]
    }, a = Object.entries(o).reduce((c, [d, u]) => (u() && (c = d), c), "left-top");
    return r[a]();
  }
}
class so {
  constructor(e, t = 10) {
    this.arrowDepsSource = e, this.centerGap = t;
  }
  value(e) {
    return this.arrowDepsSource.value(
      new K(e, ({ fromObject: t, toObject: s }) => {
        const i = {
          width: t.width,
          height: t.height
        }, o = {
          x: t.position[0],
          y: t.position[1]
        }, r = {
          width: s.width,
          height: s.height
        }, a = {
          x: s.position[0],
          y: s.position[1]
        }, c = {
          x: +a.x + Math.round(r.width / 2),
          y: +a.y + Math.round(r.height / 2)
        }, d = {
          x: +o.x + Math.round(i.width / 2),
          y: +o.y + Math.round(i.height / 2)
        }, u = Math.abs(c.x - d.x) - (r.width + this.centerGap), h = Math.abs(c.y - d.y) - (r.height + this.centerGap);
        L({
          fromObject: t,
          toObject: s,
          type: u < 0 || h < 0 ? "threeBreaks" : "twoBreaks"
        }, e);
      })
    ), this;
  }
}
class io {
  constructor(e) {
    this.basePoints = e;
  }
  value(e) {
    const t = {}, s = {};
    return this.basePoints.value(
      new K(e, (i) => {
        i.forEach((o) => {
          const r = "" + o.points.at(0) + o.points.at(1);
          t[r] || (t[r] = []), t[r].push(o);
          const a = "" + o.points.at(-2) + o.points.at(-1);
          s[a] || (s[a] = []), s[a].push(o);
        }), Object.values(t).forEach((o) => {
          o.length <= 1 || o.forEach((r, a) => {
            r.points[0] = r.points[0] + a * 10, r.points[1] = r.points[1] + a * 10, r.points[2] = r.points[0] + a * 10, r.points[3] = r.points[1] + a * 10;
          });
        }), Object.values(s).forEach((o) => {
          o.length <= 1 || o.forEach((r, a) => {
            const c = r.points.length - 2, d = r.points.length - 1, u = r.points.length - 4, h = r.points.length - 3;
            r.points[c] = r.points[c] + a * 10, r.points[d] = r.points[d] + a * 10, r.points[u] = r.points[u] + a * 10, r.points[h] = r.points[h] + a * 10;
          });
        }), L(i, e);
      })
    ), this;
  }
}
class no {
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
class ro {
  constructor(e, t) {
    this.baseSource = e, this.targetSourceFactory = t;
  }
  value(e) {
    const t = new ct(), s = new fe(), i = this.targetSourceFactory.create(
      s
    );
    return this.baseSource.value(
      new K(e, (o) => {
        let r = 0;
        const a = () => {
          o[r + 1] !== void 0 ? (r = r + 1, c()) : t.resultArray(e);
        };
        function c() {
          s.give(o[r]), i.value(t.receiveKey("" + r)), i.value(a);
        }
        o[r] !== void 0 ? c() : L([], e);
      })
    ), this;
  }
}
class oo {
  constructor(e) {
    this.buildingFn = e;
  }
  create(...e) {
    return this.buildingFn(...e);
  }
}
var ao = gs, co = dt, lo = "Expected a function";
function uo(n, e, t) {
  var s = !0, i = !0;
  if (typeof n != "function")
    throw new TypeError(lo);
  return co(t) && (s = "leading" in t ? !!t.leading : s, i = "trailing" in t ? !!t.trailing : i), ao(n, e, {
    leading: s,
    maxWait: e,
    trailing: i
  });
}
var ho = uo;
const po = /* @__PURE__ */ lt(ho), { Arrow: fo } = he, go = T.debug("MapObjectsArrows");
class mo {
  constructor(e, t, s, i, o) {
    $(this, "previouslyRenderedArrows", /* @__PURE__ */ new Map());
    this.konvaLayer = e, this.mapFile = t, this.mapDep = s, this.arrowPath = i, this.factories = o, go("draw arrows on canvas");
    const r = this.factories.chain.create();
    this.konvaLayer.layer(this.factories.patron.create(r.receiveKey("layer"))), this.mapFile.currentMap(this.factories.patron.create(r.receiveKey("map"))), this.mapDep.objects(this.factories.patron.create(r.receiveKey("objects"))), r.result(
      this.factories.patron.create(
        this.factories.guest.create(
          po(({ layer: a, map: c, objects: d }) => {
            const u = d.reduce((p, y) => (p[y.id] = y, p), {});
            new io(new ro(new Xr(
              new Te((p) => L(d, p)),
              new Te((p) => L(u, p))
            ), new oo((p) => {
              const y = new so(p);
              return new no([new to(y), new eo(y)]);
            }))).value((p) => {
              p.forEach((y) => {
                const m = y.key;
                if (this.previouslyRenderedArrows.has(m)) {
                  const v = this.previouslyRenderedArrows.get(m);
                  v.arrow.show(), v.arrow.points(y.points);
                  return;
                }
                const C = new fo({
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
const { Arrow: vo } = he, it = T.debug("NewArrow"), Gt = {
  width: 10,
  height: 10
};
class Ao {
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
          this.factories.guest.create((o) => {
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
              this.factories.guest.create((r) => {
                if (t) {
                  t.points(r);
                  return;
                }
                t = new vo({
                  x: 0,
                  y: 0,
                  points: r,
                  pointerLength: 20,
                  pointerWidth: 10,
                  fill: "#ccc",
                  stroke: "#bbb",
                  strokeWidth: 2,
                  zIndex: 2
                }), o.add(t), this.arrowCache.give(t);
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
const $e = T.debug("MapObjectBackground"), yo = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD//gATQ3JlYXRlZCB3aXRoIEdJTVD/4gKwSUNDX1BST0ZJTEUAAQEAAAKgbGNtcwQwAABtbnRyUkdCIFhZWiAH6AAMAAQADQAqAAthY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1kZXNjAAABIAAAAEBjcHJ0AAABYAAAADZ3dHB0AAABmAAAABRjaGFkAAABrAAAACxyWFlaAAAB2AAAABRiWFlaAAAB7AAAABRnWFlaAAACAAAAABRyVFJDAAACFAAAACBnVFJDAAACFAAAACBiVFJDAAACFAAAACBjaHJtAAACNAAAACRkbW5kAAACWAAAACRkbWRkAAACfAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACQAAAAcAEcASQBNAFAAIABiAHUAaQBsAHQALQBpAG4AIABzAFIARwBCbWx1YwAAAAAAAAABAAAADGVuVVMAAAAaAAAAHABQAHUAYgBsAGkAYwAgAEQAbwBtAGEAaQBuAABYWVogAAAAAAAA9tYAAQAAAADTLXNmMzIAAAAAAAEMQgAABd7///MlAAAHkwAA/ZD///uh///9ogAAA9wAAMBuWFlaIAAAAAAAAG+gAAA49QAAA5BYWVogAAAAAAAAJJ8AAA+EAAC2xFhZWiAAAAAAAABilwAAt4cAABjZcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltjaHJtAAAAAAADAAAAAKPXAABUfAAATM0AAJmaAAAmZwAAD1xtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAEcASQBNAFBtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEL/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAAeAB4DAREAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAwUEAAj/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAH1SCMTDaCMTiuCMTDgxDGf/8QAHhAAAgIBBQEAAAAAAAAAAAAAAAMBAgQFExUyMxL/2gAIAQEAAQUCG9TUPHdga2PndgzrxZQ3qah48gsvnUtHILMrKq5f/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAwEBPwEH/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAgEBPwEH/8QAHhAAAgIBBQEAAAAAAAAAAAAAAAECMXIQQUKSsVH/2gAIAQEABj8CFkvdFkVLqzla4v6VLqxXe60WS90WRUipWipCSTvc/8QAIxAAAgADCAMAAAAAAAAAAAAAAAEQUfAhMUGhscHR8RFhcf/aAAgBAQABPyErMkMi0ZW2wylmzHorbYSSX3Vg5wrMkMi0Z0a5FVK8Llg05nRrkRmteVg//9oADAMBAAIAAwAAABCCQQSCSST/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAEDAQE/EAf/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAECAQE/EAf/xAAeEAEAAQQCAwAAAAAAAAAAAAABIRARIDEAQVFxkf/aAAgBAQABPxDEMgTA4U0lpO6EwKiFh/YAyDIEAZSTdCnwUQAma0AtZOl88//Z";
class bo {
  constructor(e, t, s, i) {
    $(this, "mapNameCache");
    this.konvaLayer = e, this.mapFile = t, this.zIndex = s, this.factories = i, this.mapNameCache = i.cache.create(""), this.mapFile.currentMap(i.patron.create(this));
  }
  give(e) {
    return this.konvaLayer.layer(
      this.factories.patronOnce.create((t) => {
        $e("map received in background", e), this.mapNameCache.value(
          this.factories.guest.create((s) => {
            if (s === e.url)
              return;
            $e("background cache is not equals", s), this.mapNameCache.give(e.url);
            const i = new Image(), o = document.querySelector(".grid-example");
            $e("grid example", o), i.src = yo, i.onload = () => {
              $e("canvas pattern loaded"), $e("konva layer loaded");
              const r = new he.Rect({
                width: 3e3,
                height: 3e3,
                x: 0,
                y: 0,
                fillPatternImage: i,
                zIndex: 1
              });
              this.zIndex.give(() => {
                r.zIndex(0);
              }), t.add(r);
            };
          })
        );
      })
    ), this;
  }
}
const wo = T.debug("Breadcrumbs");
class Co {
  constructor(e, t, s) {
    this.parentNames = e, this.mapFile = t, this.factories = s;
  }
  list(e) {
    const t = this.factories.chain.create();
    return this.parentNames.names(this.factories.guestCast.create(e, t.receiveKey("names"))), this.mapFile.mapFile(this.factories.guestCast.create(e, t.receiveKey("mapFile"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ names: s, mapFile: i }) => {
        wo("map id", s, i), e.give(
          s.map((o) => {
            var r, a;
            return {
              title: ((a = (r = i[o]) == null ? void 0 : r.settings) == null ? void 0 : a.title) || "unknown",
              name: o
            };
          })
        );
      })
    ), e;
  }
}
const Yt = T.debug("CursorWithObjects");
class xo {
  constructor(e, t, s) {
    this.objectsVisible = e, this.cursor = t, this.factories = s;
  }
  value(e) {
    const t = this.factories.chain.create();
    return this.cursor.value(this.factories.guestCast.create(e, t.receiveKey("cursor"))), this.objectsVisible.objects(
      this.factories.guestCast.create(e, t.receiveKey("objects"))
    ), t.result(
      this.factories.guestInTheMiddle.create(e, ({ cursor: s, objects: i }) => {
        const o = i.find((r) => {
          const a = r.position[0], c = r.position[0] + r.width || 100, d = r.position[1], u = r.position[1] + r.height || 100;
          return s.x >= a && s.x <= c && s.y >= d && s.y <= u;
        });
        o ? (Yt("crossed with", o), e.give({
          x: o.position[0] + o.width / 2,
          y: o.position[1] + o.height / 2
        })) : (Yt("cursor pos", s), e.give(s));
      })
    ), this;
  }
}
const qt = T.debug("Drawer");
class _o {
  constructor(e, t) {
    $(this, "drawerNameCache");
    this.keyboard = e, this.factories = t, this.drawerNameCache = t.cache.create(""), this.keyboard.pressed(
      this.factories.patron.create(
        this.factories.guest.create((s) => {
          qt("new key in drawer", s), s === "Escape" && this.give("");
        })
      )
    );
  }
  isOpenedByName(e, t) {
    return this.drawerNameCache.value(
      this.factories.guestInTheMiddle.create(t, (s) => {
        qt("new drawer name", s), t.give(s === e);
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
class $o {
  value(e) {
    typeof performance > "u" && e.give(0);
    const t = 10;
    let s = performance.now(), i = 0;
    const o = () => requestAnimationFrame(() => {
      if (i += 1, i >= t) {
        const r = performance.now(), a = r - s;
        e.give(Math.round(1e3 / (a / i))), s = r, i = 0;
      }
      o();
    });
    return o(), e;
  }
}
class ko {
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
const Jt = T.debug("app:MiniMap"), Zt = 130;
class Mo {
  constructor(e, t, s, i) {
    $(this, "theSize");
    $(this, "thePoints");
    $(this, "viewportSizeCache");
    this.map = e, this.layer = t, this.stageSize = s, this.factories = i, this.theSize = i.sourceEmpty.create(), this.thePoints = i.sourceEmpty.create(), this.viewportSizeCache = i.sourceEmpty.create();
    const o = i.chain.create();
    e.objects(i.patron.create(o.receiveKey("objects"))), t.layer(i.patron.create(o.receiveKey("layer"))), s.value(i.patron.create(o.receiveKey("size"))), o.result(
      i.patron.create(
        i.guest.create(({ layer: r, size: a, objects: c }) => {
          const d = Zt / a.width, u = {
            width: Math.round(r.width() * d),
            height: Math.round(r.height() * d)
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
          Jt("minimap points", p), this.thePoints.give(p);
        })
      )
    );
  }
  viewportPosition(e) {
    const t = this.factories.chain.create();
    return this.stageSize.value(this.factories.guestCast.create(e, t.receiveKey("size"))), this.layer.position(this.factories.guestCast.create(e, t.receiveKey("position"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ size: s, position: i }) => {
        const o = Zt / s.width, r = {
          x: i.x * o * -1,
          y: i.y * o * -1
        };
        Jt("scaled position is", r), e.give(r);
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
class Fo {
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
class To {
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
const ke = T.debug("ObjectGeometryFix");
class So {
  constructor(e, t, s, i) {
    $(this, "innerReceive");
    this.mapFile = t, this.map = s, this.factories = i, e.objects(i.patron.create(this)), this.innerReceive = we((o) => {
      this.mapFile.currentMap(
        this.factories.guest.create((r) => {
          ke("objects to fix", o);
          const a = document.querySelectorAll(".objects-container .rendered-object"), c = r.objects;
          let d = !1;
          a.forEach((u) => {
            const h = u.getAttribute("data-object-id");
            if (ke("i see id", h), !h)
              return;
            const p = c[h];
            if (p && (ke("dom object geometry", u.clientWidth, u.clientHeight), ke("saved object geometry", p.width, p.height), (p.width !== u.clientWidth || p.height !== u.clientHeight) && (d = !0, ke("update object geometry"), p.width = u.clientWidth, p.height = u.clientHeight), !p.width || !p.height)) {
              const y = r.types[p.type];
              p.width = y.width, p.height = y.height;
            }
          }), d && this.map.give({
            ...r,
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
const Me = T.debug("MapObjectsRectsPatron");
class jo {
  constructor(e, t, s, i, o, r, a, c, d) {
    $(this, "previouslyRenderedRects", /* @__PURE__ */ new Map());
    this.konvaLayer = e, this.mapFile = t, this.mapObject = s, this.mapObjectCurrent = o, this.mapObjectForRendering = r, this.objectPosition = a, this.settings = c, this.factories = d, i.objects(this);
  }
  give(e) {
    return this.konvaLayer.layer(
      this.factories.patronOnce.create(
        this.factories.guest.create((t) => {
          const s = this.factories.chain.create();
          this.mapFile.currentMap(s.receiveKey("map")), this.settings.value(s.receiveKey("settings")), s.result(
            this.factories.guest.create((i) => {
              const { map: o, settings: r } = i;
              Me("rerender object rects"), this.previouslyRenderedRects.forEach((a) => {
                a.hide();
              }), e.forEach((a) => {
                const c = o.types[a.type], d = +a.width || +c.width || 100, u = +a.height || +c.height || 100;
                if (this.previouslyRenderedRects.has(a)) {
                  const p = this.previouslyRenderedRects.get(a);
                  p.width(d), p.height(u), p.x(+a.position[0]), p.y(+a.position[1]), p.show();
                  return;
                }
                Me("rect object", a, c);
                const h = new he.Rect({
                  x: +a.position[0],
                  y: +a.position[1],
                  width: d,
                  height: u,
                  name: a.id,
                  draggable: !r.readonly,
                  objectId: a.id,
                  zIndex: 3
                });
                this.previouslyRenderedRects.set(a, h), t.add(h), h.on("mouseenter", () => {
                  t.getStage().container().style.cursor = "pointer";
                }), h.on("mouseleave", () => {
                  t.getStage().container().style.cursor = "default";
                }), h.on("dragend", () => {
                  Me("drag ended"), this.objectPosition.position(
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
                  Me("dragmove works", h.x(), h.y()), t.getStage().container().style.cursor = "move", this.objectPosition.position(
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
                  Me("object clicked with id", a.id), this.mapObjectCurrent.give(a.id);
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
class Bo {
  constructor(e, t, s, i) {
    this.canvas = t, this.konvaLayer = s, this.factories = i, e.currentMap(this);
  }
  give() {
    const e = new ResizeObserver((s) => {
      requestAnimationFrame(() => {
        const [i] = s;
        this.canvas.canvas(
          this.factories.guest.create((o) => {
            const r = o.getBoundingClientRect();
            this.konvaLayer.layer(
              this.factories.guest.create((a) => {
                a.getStage().width(i.contentRect.width - r.left), a.getStage().height(i.contentRect.height - r.top), this.canvas.give(o), this.konvaLayer.give(a);
              })
            );
          })
        );
      });
    }), t = document.querySelector("body");
    return t && e.observe(t), this;
  }
}
const Oo = T.debug("StagePosition");
class Io {
  constructor(e) {
    this.stageMove = e;
  }
  give(e) {
    return Oo("received position", e), this.stageMove.move(e), this;
  }
}
class Po {
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
class Eo {
  constructor(e) {
    $(this, "fnsCache");
    this.factories = e, this.fnsCache = e.cache.create([]), this.fnsCache.value(
      e.patron.create(
        e.guest.create(
          we((t) => {
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
class Do {
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
const Ro = T.debug("Cursor");
class Ho {
  constructor(e, t) {
    $(this, "cursorPool");
    this.cursorPool = t.pool.create(this);
    const s = {
      x: 0,
      y: 0
    };
    window == null || window.addEventListener("mousemove", (i) => {
      const o = {
        x: i.offsetX + -s.x,
        y: i.offsetY + -s.y
      };
      Ro("move cursor fired", o), this.cursorPool.give(o);
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
      const o = (r) => {
        i.style.transform = `translate(${r.clientX}px, ${r.clientY}px)`;
      };
      s.addEventListener("drag", o, { passive: !0 }), s.addEventListener("dragend", () => {
        i.removeEventListener("drag", o), i.remove();
      });
    }), this;
  }
  introduction() {
    return "patron";
  }
}
const He = T.debug("ControlCombo");
class Vo {
  constructor(e, t) {
    this.keyboard = e, this.factories = t;
  }
  /**
   * Случилась комбинация ctrl + keyCode
   */
  happened(e, t) {
    this.keyboard.event(
      this.factories.guestInTheMiddle.create(t, (s) => {
        He("combo happened look for key", e, "received", s.code), s.ctrlKey && s.code === e && s.type === "keydown" && (s.preventDefault(), t.give(s));
      })
    );
  }
  /**
   * Случилась комбинация ctrl + keyCode с условием comboCondition
   */
  happenedConditional(e, t, s) {
    He("combo control happened registration"), this.keyboard.event(
      this.factories.guestInTheMiddle.create(s, (i) => {
        He("keyboard event come"), t.value(
          this.factories.guest.create((o) => {
            He("combo happened look for key", e, "received", i.code), o && i.ctrlKey && i.code === e && i.type === "keydown" && (i.preventDefault(), s.give(i));
          })
        );
      })
    );
  }
}
const Fe = T.debug("Keyboard");
class Uo {
  constructor(e) {
    $(this, "pressedPool");
    $(this, "combinationsPool");
    Fe("keyboard created"), this.pressedPool = e.pool.create(this), this.combinationsPool = e.pool.create(this), window == null || window.addEventListener("keyup", (t) => {
      Fe("keyboard pressed", t.key), this.pressedPool.give(t.key);
    }), Is({
      passive: !1,
      onEventFired: (t) => {
        Fe("magic combination happens 11", t.ctrlKey, t.key), this.combinationsPool.give(t);
      }
    });
  }
  pressed(e) {
    return Fe("keyboard receive pressed subscriber"), this.pressedPool.add(e), this;
  }
  event(e) {
    return Fe("keyboard receive combination subscriber"), this.combinationsPool.add(e), this;
  }
}
const ss = T.debug("app:konva:KonvaLayer");
class zo {
  constructor(e, t, s, i) {
    $(this, "guestChain");
    $(this, "positionCache");
    $(this, "layerCache");
    this.canvasDep = e, this.stageMoveRestriction = s, this.factories = i, this.positionCache = i.cache.create({
      x: 0,
      y: 0
    }), this.guestChain = i.chain.create(), this.layerCache = i.sourceEmpty.create(), this.canvasDep.canvas(i.patron.create(this.guestChain.receiveKey("canvas"))), t.value(this.guestChain.receiveKey("stageSize")), this.guestChain.result(
      i.guest.create(
        ({ canvas: o }) => {
          ss("create new konva stage");
          const r = new he.Stage({
            width: o.clientWidth,
            height: o.clientHeight,
            container: o,
            fill: "#ffeeee",
            draggable: !0
          }), a = new he.Layer();
          r.add(a), a.draw(), this.layerCache.give(a), r.on("dragend", (d) => {
            if (!(d.target instanceof he.Stage))
              return;
            const u = {
              x: r.x(),
              y: r.y()
            };
            ss("new position", u), this.positionCache.give(u);
          }), r.on("dragmove", (d) => {
            if (!(d.target instanceof he.Stage))
              return;
            const u = {
              x: r.x(),
              y: r.y()
            };
            this.positionCache.give(u);
          });
          const c = this.factories.guestSync.create({
            x: 0,
            y: 0
          });
          r.dragBoundFunc((d) => (s.position(d, c), c.value()));
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
class Lo {
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
const Qo = T.debug("position");
class Wo {
  constructor(e, t, s, i, o) {
    this.layer = e, this.canvas = t, this.stageSize = s, this.stageMoveRestriction = i, this.factories = o;
  }
  move(e) {
    Qo("move stage to new point", e.position), this.stageSize.value(
      this.factories.guest.create(() => {
        this.canvas.size(
          this.factories.guest.create((t) => {
            this.layer.layer(
              this.factories.guest.create((s) => {
                const [i, o] = e.position, r = {
                  x: -i - Math.round(e.width / 2) + Math.round(t.width / 2),
                  y: -o - Math.round(e.height / 2) + Math.round(t.height / 2)
                };
                this.stageMoveRestriction.position(
                  r,
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
const _ = J(), We = new Uo(_), ms = new Oe({
  readonly: !1,
  presets: {}
}), Ko = new Fo(We, _), vs = new _o(We, _), Ke = new To(_), ue = new dn(_), As = _.sourceEmpty.create(), N = new mn(As, ue, _), Go = new pn(N), Yo = new ii(Go), pt = new An(N, ue, _), ft = new us(pt, ue, _), qo = new hs(ft, pt, _), te = new us(N, ue, _), Jo = new Te((n) => {
  N.currentMap(new Ue(n));
}), Ge = new yn(vs, _), Zo = new Pr(_), Xo = new Ir(N, te, _), ge = new Do(_), me = new Qr(), ys = new Wr(ge, me, _), se = new zo(ge, me, ys, _), ea = new Eo(_), ta = new bo(se, N, ea, _), Ce = new hs(te, N, _), sa = new _n(
  te,
  N,
  [new ht(Ke, new bn(N, _), _)],
  _
), ia = new Lo(se, _), na = new wn(te, Ce, ge, ia, _), bs = new Nr(N, _), ws = new Rr(
  te,
  N,
  [
    new ht(
      Ke,
      new Vr(bs, _),
      _
    )
  ],
  _
), ra = new Dr(
  te,
  N,
  [new ht(Ke, bs, _)],
  _
), oa = new Er(ws), Ye = new Kr(se, ge, pt, _), aa = new So(
  Ye,
  N,
  te,
  _
), ca = new jo(
  se,
  N,
  Ce,
  Ye,
  Ge,
  qo,
  new jr(new Sr(me, _), _),
  ms,
  _
), la = new Ho(se, _), ua = new xo(Ye, la, _), Cs = new Zr(), xs = new Ao(se, ua, Cs, _), ha = new mo(se, N, ft, Cs, _), da = new Mo(ft, se, me, _), pa = new kn(
  Ge,
  te,
  Ce,
  xs,
  _
), fa = new Bo(N, ge, se, _), ga = new qr(
  Ge,
  N,
  Ce,
  _
), ma = new gn(N, ue, _), va = new xn(Ce), Aa = new $o(), gt = new Cn(ue, _), ya = new Co(gt, N, _), ba = new Mr(ue, _), wa = new Ur(gt, N, _), Ca = new Vo(We, _), xa = new ko(N, _), _s = new Wo(se, ge, me, ys, _), _a = new Io(_s), $a = new Po(_s, _), ka = new zr(te, _), Ma = new fn(N, te, ue, _), Fa = new Or(te, me, se, _), $s = new fe();
new No($s);
const Ta = {
  mapCurrentID: ue,
  mapFile: N,
  mapCurrent: te,
  mapCurrentSource: Jo,
  mapRemoved: ma,
  mapSettings: Xo,
  mapObject: Ce,
  mapObjectRemoved: sa,
  mapType: ws,
  mapTypeRemoved: ra,
  mapTypeNew: oa,
  mapObjectsVisible: Ye,
  mapObjectCurrent: Ge,
  mapObjectNew: na,
  mapObjectsLink: pa,
  mapTypeCurrent: Zo,
  mapRects: ca,
  mapBackground: ta,
  mapObjectArrows: ha,
  mapObjectsGeometryFix: aa,
  canvas: ge,
  miniMap: da,
  notification: Ke,
  modal: Ko,
  drawer: vs,
  konvaLayer: se,
  resizing: fa,
  objectAdditionalFieldsFix: ga,
  mapObjectRelationRemoved: va,
  fps: Aa,
  breadcrumbs: ya,
  mapObjectUrl: ba,
  keyboard: We,
  parentNames: gt,
  parentTypes: wa,
  controlCombo: Ca,
  menu: xa,
  stagePosition: _a,
  stagePositionByObjectId: $a,
  objectsMatchedToQuery: ka,
  stageSize: me,
  mapHistory: Ma,
  fileContent: As,
  newArrow: xs,
  objectsOutsideScreen: Fa,
  settings: ms,
  documentTitle: Yo,
  sidebarDraggable: $s
}, V = () => Ta;
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
const Sa = { key: 0 }, ja = { class: "flex-grow overflow-y-auto" }, Ba = {
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
    const t = n, s = e, i = je(() => ["e2e-drawer-back absolute z-10 top-0 left-0 w-full h-full bg-black/50"]), o = {
      ltr: "top-0 left-0 w-[50%] max-w-[900px] ",
      rtl: "top-0 right-0 w-[50%] max-w-[900px] ",
      ttb: "top-0 right-0 left-0",
      btt: "top-auto h-[900px] max-h-[50%] bottom-0 right-0 left-0"
    }, { drawer: r } = V(), a = () => {
      r.give(""), s("close");
    }, c = r.isOpenedByName(t.name, new j()).ref();
    return (d, u) => (f(), z(rs, { name: "fade" }, {
      default: w(() => [
        l(c) ? (f(), A("div", {
          key: 0,
          class: ce(l(i)),
          onClick: a
        }, [
          b("div", {
            class: ce(["absolute bg-white h-full p-3 flex flex-col overflow-hidden", o[n.direction]]),
            onClick: u[0] || (u[0] = ye(() => {
            }, ["stop"]))
          }, [
            d.$slots.header ? (f(), A("div", Sa, [
              ee(d.$slots, "header", { class: "BaseDrawer-Header" })
            ])) : B("", !0),
            b("div", ja, [
              ee(d.$slots, "default")
            ]),
            d.$slots.footer ? (f(), A("div", Ba, [
              ee(d.$slots, "footer")
            ])) : B("", !0)
          ], 2)
        ], 2)) : B("", !0)
      ]),
      _: 3
    }));
  }
}), q = /* @__PURE__ */ D({
  __name: "BaseIcon",
  props: {
    icon: {
      type: String
    }
  },
  setup(n) {
    const e = {
      "fa-bars": Zs,
      "fa-text-width": Js,
      "fa-search": qs,
      "fa-history": Ys,
      "fa-plus-square": Gs,
      "fa-cog": Ks,
      "fa-file-text": Ws,
      "fa-rotate-left": Qs,
      "fa-rotate-right": Ls,
      "fa-map": zs,
      "fa-close": Us,
      "fa-arrow-left": Vs,
      "fa-arrow-right": Ns,
      "fa-arrow-down": Hs,
      "fa-arrow-up": Rs
    };
    return (t, s) => (f(), z(l(Ds), {
      icon: e[n.icon]
    }, null, 8, ["icon"]));
  }
}), Oa = /* @__PURE__ */ b("h2", { class: "text-lg font-bold" }, " Карты в файле ", -1), Ia = ["onClick"], Pa = /* @__PURE__ */ D({
  __name: "AppFileMaps",
  setup(n) {
    const {
      mapFile: e,
      mapCurrentID: t,
      drawer: s,
      mapRemoved: i
    } = V(), o = e.mapFile(new j()).ref(), r = t.id(new j()).ref(), a = (c) => {
      confirm("Вы уверены?") && i.give(c);
    };
    return (c, d) => (f(), z(mt, {
      direction: "rtl",
      name: "fileMaps"
    }, {
      header: w(() => [
        Oa
      ]),
      default: w(() => [
        b("div", null, [
          (f(!0), A(U, null, W(l(o), (u, h) => (f(), A("div", {
            key: h,
            class: "flex items-center gap-2"
          }, [
            b("a", {
              href: "#",
              class: ce({ "font-bold": l(r) === h }),
              onClick: ye((p) => {
                l(t).give(h), l(s).give("");
              }, ["prevent"])
            }, x(u.settings.title), 11, Ia),
            g(q, {
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
}), Ea = { class: "AppMenuObject" }, Da = {
  key: 0,
  class: "AppMenuObject-Empty"
}, Ra = {
  key: 1,
  class: "flex flex-col gap-1"
}, Ha = ["onClick"], Na = ["innerHTML"], Va = /* @__PURE__ */ D({
  __name: "AppMenuObject",
  setup(n) {
    const {
      controlCombo: e,
      drawer: t,
      menu: s,
      stagePosition: i
    } = V(), { guest: o, patron: r } = J(), a = s.menuObjects(new j()).ref();
    return e.happened(
      "KeyM",
      r.create(o.create(() => {
        t.give("menu");
      }))
    ), (c, d) => (f(), z(mt, {
      direction: "rtl",
      name: "menu"
    }, {
      default: w(() => [
        b("div", Ea, [
          l(a).length ? (f(), A("div", Ra, [
            (f(!0), A(U, null, W(l(a), (u) => (f(), A("a", {
              key: u.id,
              class: "AppMenuObject-Item",
              href: "#",
              onClick: ye((h) => {
                l(i).give(u), l(t).give("");
              }, ["prevent"])
            }, [
              b("span", {
                innerHTML: u.additionalName ? u.additionalName : u.name
              }, null, 8, Na)
            ], 8, Ha))), 128))
          ])) : (f(), A("div", Da, x(c.$t("appMenuObject.noItems")), 1))
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
}), Ua = {
  key: 0,
  title: "Назад",
  class: "absolute text-white left-0 top-0 -ml-5 flex justify-center items-center bg-primary/70 hover:bg-primary-second/70 cursor-pointer w-5"
}, za = {
  key: 1,
  class: "BaseModal-Header"
}, La = { class: "overflow-y-auto flex-grow" }, Qa = {
  key: 2,
  class: "BaseModal-Footer"
}, ve = /* @__PURE__ */ D({
  __name: "BaseModal",
  props: {
    name: {
      type: String,
      required: !0
    }
  },
  setup(n) {
    const { modal: e } = V(), t = n, s = e.isOpenedByName(t.name, new j()).ref(), i = [], o = () => {
      e.give("");
    };
    return (r, a) => (f(), z(rs, { name: "fade" }, {
      default: w(() => [
        l(s) ? (f(), A("div", {
          key: 0,
          class: "absolute rounded-main overflow-y-auto flex justify-center items-center top-0 left-0 bg-black/10 z-20 h-full w-full",
          onClick: o
        }, [
          b("div", {
            class: "w-full relative flex flex-col max-w-[800px] max-h-[90%] bg-white p-3",
            onClick: a[0] || (a[0] = ye(() => {
            }, ["stop"]))
          }, [
            i.length > 1 ? (f(), A("div", Ua, " < ")) : B("", !0),
            b("div", {
              title: "Закрыть",
              class: "e2e-modal-close absolute text-white right-0 top-0 -mr-5 flex justify-center items-center bg-danger/70 hover:bg-danger-second/70 cursor-pointer w-5",
              onClick: o
            }, " × "),
            r.$slots.header ? (f(), A("div", za, [
              ee(r.$slots, "header")
            ])) : B("", !0),
            b("div", La, [
              ee(r.$slots, "default")
            ]),
            r.$slots.footer ? (f(), A("div", Qa, [
              ee(r.$slots, "footer")
            ])) : B("", !0)
          ])
        ])) : B("", !0)
      ]),
      _: 3
    }));
  }
}), Wa = { class: "AppPresets" }, Ka = /* @__PURE__ */ b("div", { class: "text-md font-bold mb-2" }, "Общие", -1), Ga = { class: "flex flex-col gap-2" }, Ya = { class: "text-md font-bold mb-1" }, qa = { class: "flex gap-2 flex-wrap items-end" }, Ja = { class: "AppTypesParent-ItemTitle" }, Za = ["innerHTML"], Xa = /* @__PURE__ */ D({
  __name: "AppPresets",
  setup(n) {
    const {
      svgMapTypeImage: e
    } = J(), { mapType: t, settings: s } = V(), i = new j();
    s.value(i);
    const o = je(
      () => Object.fromEntries(
        Object.entries(i.value.presets).map(
          ([r, a]) => [
            r,
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
    return (r, a) => (f(), z(ve, { name: "presets" }, {
      default: w(() => [
        b("div", Wa, [
          Ka,
          b("div", Ga, [
            (f(!0), A(U, null, W(l(o), (c, d) => (f(), A("div", { key: d }, [
              b("h3", Ya, x(d), 1),
              b("div", qa, [
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
                      O(x(r.$t("general.addToMap")), 1)
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
      we(() => {
        t.autofocus && i.value.focus();
      }, 500)
    );
    const o = Le(t, "modelValue", s);
    return (r, a) => ze((f(), A("input", {
      ref_key: "input",
      ref: i,
      "onUpdate:modelValue": a[0] || (a[0] = (c) => be(o) ? o.value = c : null),
      class: "block rounded-main w-full p-2 border border-solid border-body-dark",
      type: "text"
    }, null, 512)), [
      [os, l(o)]
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
const ec = { class: "AppSearch" }, tc = {
  key: 0,
  class: "AppSearch-Items"
}, sc = ["onClick"], ic = ["innerHTML"], nc = ["innerHTML"], rc = ["innerHTML"], oc = { key: 1 }, ac = { key: 2 }, cc = /* @__PURE__ */ D({
  __name: "AppSearch",
  setup(n) {
    const {
      objectsMatchedToQuery: e,
      controlCombo: t,
      modal: s,
      stagePosition: i
    } = V(), { guest: o, patron: r } = J(), a = ie(), c = T.debug("app:AppSearch");
    s.isOpenedByName(
      "search",
      r.create(o.create((h) => {
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
      r.create(o.create(() => {
        s.give("search");
      }))
    ), (h, p) => (f(), z(ve, { name: "search" }, {
      default: w(() => [
        b("div", ec, [
          g(oe, {
            ref_key: "inputRef",
            ref: a,
            modelValue: l(d),
            "onUpdate:modelValue": p[0] || (p[0] = (y) => be(d) ? d.value = y : null),
            class: "mb-2 e2e-query-input",
            placeholder: h.$t("general.specifyQuery")
          }, null, 8, ["modelValue", "placeholder"]),
          l(u).length ? (f(), A("div", tc, [
            (f(!0), A(U, null, W(l(u), (y) => (f(), A("div", {
              key: y.name,
              class: "cursor-pointer",
              onClick: ye((m) => {
                l(i).give(y), l(s).give("");
              }, ["prevent"])
            }, [
              b("b", {
                class: "AppSearch-ItemName",
                innerHTML: y.name
              }, null, 8, ic),
              y.additionalName ? (f(), A("b", {
                key: 0,
                class: "AppSearch-ItemName",
                innerHTML: y.additionalName
              }, null, 8, nc)) : B("", !0),
              y.additionalFields ? (f(), A("div", {
                key: 1,
                innerHTML: Object.values(y.additionalFields).join(" ")
              }, null, 8, rc)) : B("", !0)
            ], 8, sc))), 128))
          ])) : l(d) ? (f(), A("div", oc, x(h.$t("general.noResults")), 1)) : (f(), A("div", ac, x(h.$t("general.resultsWillBeHere")), 1))
        ])
      ]),
      _: 1
    }));
  }
}), lc = { class: "AppTypes" }, uc = /* @__PURE__ */ b("div", { class: "text-md font-bold mb-2" }, "Родительские типы", -1), hc = { class: "flex gap-2 items-end" }, dc = { class: "AppTypesParent-ItemTitle" }, pc = ["innerHTML"], fc = /* @__PURE__ */ D({
  __name: "AppTypesParent",
  setup(n) {
    const { parentTypes: e, mapType: t } = V(), { svgMapTypeImage: s } = J(), i = e.types(new j()).ref(), o = je(() => {
      var r;
      return (r = i.value) == null ? void 0 : r.map((a) => ({
        type: a,
        image: s.create(a).markup()
      })).sort((a, c) => +(a.type.name >= c.type.name));
    });
    return (r, a) => (f(), z(ve, { name: "parentTypes" }, {
      default: w(() => [
        b("div", lc, [
          uc,
          b("div", hc, [
            (f(!0), A(U, null, W(l(o), (c) => (f(), A("div", {
              key: c.type.name,
              class: "flex flex-col gap-2"
            }, [
              b("div", dc, x(c.type.name), 1),
              b("div", {
                class: "AppTypesParent-ItemImage",
                innerHTML: c.image,
                style: ae(`width:${c.type.width}px;height:${c.type.height}px`)
              }, null, 12, pc),
              g(E, {
                class: "AppTypesParent-ItemButton e2e-add-preset-type",
                type: "success",
                size: "sm",
                onClick: (d) => l(t).give({ name: c.type.name, type: c.type })
              }, {
                default: w(() => [
                  O(x(r.$t("general.addToMap")), 1)
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
const gc = { class: "flex gap-2" }, nt = /* @__PURE__ */ D({
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
    return (o, r) => (f(), A("label", gc, [
      ze(b("input", {
        "onUpdate:modelValue": r[0] || (r[0] = (a) => be(i) ? i.value = a : null),
        type: "checkbox"
      }, null, 512), [
        [Ss, l(i)]
      ]),
      o.$slots.default ? ee(o.$slots, "default", { key: 0 }) : (f(), A(U, { key: 1 }, [
        O(x(n.label), 1)
      ], 64))
    ]));
  }
}), qe = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [s, i] of e)
    t[s] = i;
  return t;
}, mc = {}, vc = { class: "text-sm font-bold" };
function Ac(n, e) {
  return f(), A("div", vc, [
    ee(n.$slots, "default")
  ]);
}
const Y = /* @__PURE__ */ qe(mc, [["render", Ac]]), yc = {}, bc = { class: "mb-2" };
function wc(n, e) {
  return f(), A("div", bc, [
    ee(n.$slots, "default")
  ]);
}
const X = /* @__PURE__ */ qe(yc, [["render", wc]]), Cc = { class: "rounded-main p-2 border border-solid border-body-dark" }, xc = { class: "flex gap-2 p-2 bg-white border border-solid border-body-dark rounded-main" }, Ne = /* @__PURE__ */ D({
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
      var o;
      (o = i.value) == null || o.destroy();
    }), Be(() => t.modelValue, (o) => {
      !i.value || i.value.getHTML() === o || i.value.commands.setContent(o, !1);
    }), (o, r) => (f(), A("div", Cc, [
      g(l(ei), { editor: l(i) }, null, 8, ["editor"]),
      l(i) ? (f(), z(l(ti), {
        key: 0,
        editor: l(i),
        "tippy-options": { duration: 100 }
      }, {
        default: w(() => [
          b("div", xc, [
            b("button", {
              onClick: r[0] || (r[0] = (a) => l(i).chain().focus().toggleBold().run()),
              class: ce({ "font-bold": l(i).isActive("bold") })
            }, " bold ", 2),
            b("button", {
              onClick: r[1] || (r[1] = (a) => l(i).chain().focus().toggleItalic().run()),
              class: ce({ "font-bold": l(i).isActive("italic") })
            }, " italic ", 2),
            b("button", {
              onClick: r[2] || (r[2] = (a) => l(i).chain().focus().toggleStrike().run()),
              class: ce({ "font-bold": l(i).isActive("strike") })
            }, " strike ", 2)
          ])
        ]),
        _: 1
      }, 8, ["editor"])) : B("", !0)
    ]));
  }
}), _c = ["value"], $c = /* @__PURE__ */ D({
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
    return (o, r) => ze((f(), A("select", {
      label: "select",
      "onUpdate:modelValue": r[0] || (r[0] = (a) => be(i) ? i.value = a : null),
      class: "block bg-white rounded-main w-full p-2 border border-solid border-body-dark"
    }, [
      (f(!0), A(U, null, W(t.items, (a) => (f(), A("option", {
        key: a[t.optionId],
        value: a[t.optionId]
      }, x(a[t.optionLabel]), 9, _c))), 128))
    ], 512)), [
      [js, l(i)]
    ]);
  }
}), kc = { class: "text-lg font-bold" }, Mc = {
  key: 0,
  class: "flex gap-2 items-center"
}, Fc = {
  key: 1,
  class: "flex gap-2 mt-2"
}, Tc = { key: 0 }, Sc = { key: 1 }, jc = {
  key: 0,
  class: "flex flex-col gap-2"
}, Bc = { class: "FormObject-Inner" }, Oc = { class: "FormObject-Row" }, Ic = { class: "FormObject-Row" }, Pc = { class: "FormObject-Row" }, Ec = { class: "my-2" }, Dc = { class: "FormObject-Title" }, Rc = { class: "FormObject-Row" }, Hc = { class: "FormObject-Title" }, Nc = { class: "FormObject-Row" }, Vc = {
  key: 0,
  class: "FormObject-ArrowName"
}, Uc = { class: "py-3 flex gap-1" }, zc = /* @__PURE__ */ D({
  __name: "FormObject",
  setup(n) {
    const e = ut("FormObject"), {
      mapObjectCurrent: t,
      mapFile: s,
      mapObject: i,
      mapCurrent: o,
      drawer: r,
      mapObjectRemoved: a,
      mapObjectRelationRemoved: c,
      mapObjectUrl: d,
      controlCombo: u
    } = V(), {
      patron: h,
      chain: p,
      guest: y
    } = J(), m = new ks(() => {
      const S = p.create();
      t.objectId(h.create(S.receiveKey("objectId"))), s.currentMap(h.create(S.receiveKey("map"))), S.result(h.create(
        y.create(({ map: F, objectId: k }) => {
          e("object opened", k), m.value = F.objects[k];
        })
      ));
    }).ref(), C = o.types(new j()).ref(), v = s.currentMap(new j()).ref(), M = new vt(m), I = d.url(M, new j()).ref(), G = () => {
      t.give(""), r.give("");
    }, Q = () => {
      a.give(m.value), G();
    }, ne = () => {
      i.give({
        ...m.value,
        outlink: m.value.outlink || I.value
      }), G();
    }, P = (S) => {
      c.give({
        index: S,
        object: m.value
      });
    };
    return u.happenedConditional(
      "KeyS",
      r.openedByName("object"),
      h.create(y.create(ne))
    ), (S, F) => (f(), z(mt, {
      name: "object",
      onClose: G
    }, {
      header: w(() => [
        b("h2", kc, x(S.$t("general.mapObject")), 1),
        l(m) ? (f(), A("small", Mc, [
          b("span", null, " ID #" + x(l(m).id), 1)
        ])) : B("", !0),
        l(m) ? (f(), A("div", Fc, [
          l(m).createTimestamp ? (f(), A("div", Tc, " Создан: " + x(new Date(l(m).createTimestamp).toLocaleString()), 1)) : B("", !0),
          l(m).changeTimestamp ? (f(), A("div", Sc, " Изменен: " + x(new Date(l(m).changeTimestamp).toLocaleString()), 1)) : B("", !0)
        ])) : B("", !0)
      ]),
      footer: w(() => [
        b("div", Uc, [
          g(E, {
            type: "success",
            onClick: ne
          }, {
            default: w(() => [
              O(x(S.$t("general.save")), 1)
            ]),
            _: 1
          }),
          g(E, {
            type: "danger",
            onClick: Q
          }, {
            default: w(() => [
              O(x(S.$t("general.delete")), 1)
            ]),
            _: 1
          }),
          g(E, { onClick: G }, {
            default: w(() => [
              O(x(S.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: w(() => [
        l(m) ? (f(), A("div", jc, [
          b("div", Bc, [
            b("div", Oc, [
              g(nt, {
                modelValue: l(m).linked,
                "onUpdate:modelValue": F[0] || (F[0] = (k) => l(m).linked = k),
                label: S.$t("general.nameAsLink")
              }, null, 8, ["modelValue", "label"])
            ]),
            l(m).linked ? (f(), A(U, { key: 0 }, [
              g(Y, null, {
                default: w(() => [
                  O(x(S.$t("general.outerLink")), 1)
                ]),
                _: 1
              }),
              b("div", Ic, [
                g(oe, {
                  "model-value": l(m).outlink || l(I),
                  "onUpdate:modelValue": F[1] || (F[1] = (k) => l(m).outlink = k)
                }, null, 8, ["model-value"])
              ]),
              b("div", Pc, [
                g(nt, {
                  modelValue: l(m).targetBlank,
                  "onUpdate:modelValue": F[2] || (F[2] = (k) => l(m).targetBlank = k),
                  label: S.$t("general.inNewTab")
                }, null, 8, ["modelValue", "label"])
              ])
            ], 64)) : B("", !0),
            (f(!0), A(U, null, W(l(m).additionalFields, (k, Z) => (f(), z(X, {
              class: "mb-2",
              key: Z
            }, {
              default: w(() => [
                g(Y, { class: "mb-1" }, {
                  default: w(() => [
                    O(x(Z), 1)
                  ]),
                  _: 2
                }, 1024),
                g(Ne, {
                  modelValue: l(m).additionalFields[Z],
                  "onUpdate:modelValue": (le) => l(m).additionalFields[Z] = le
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              _: 2
            }, 1024))), 128)),
            g(X, null, {
              default: w(() => [
                g(Y, null, {
                  default: w(() => [
                    O(x(S.$t("general.topName")), 1)
                  ]),
                  _: 1
                }),
                g(Ne, {
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
                    O(x(S.$t("general.bottomName")), 1)
                  ]),
                  _: 1
                }),
                g(Ne, {
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
                    O(x(S.$t("general.description")), 1)
                  ]),
                  _: 1
                }),
                g(Ne, {
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
                    O(" Z-Index ")
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
                    O(" Width ")
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
                    O(" Height ")
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
                    O(x(S.$t("general.objectType")), 1)
                  ]),
                  _: 1
                }),
                g($c, {
                  modelValue: l(m).type,
                  "onUpdate:modelValue": F[9] || (F[9] = (k) => l(m).type = k),
                  items: l(C),
                  "option-id": "id",
                  "option-label": "name"
                }, null, 8, ["modelValue", "items"])
              ]),
              _: 1
            }),
            b("div", Ec, [
              g(nt, {
                modelValue: l(m).inMenu,
                "onUpdate:modelValue": F[10] || (F[10] = (k) => l(m).inMenu = k),
                label: S.$t("general.useInMenu")
              }, null, 8, ["modelValue", "label"])
            ]),
            l(m).inMenu ? (f(), A(U, { key: 1 }, [
              b("div", Dc, x(S.$t("general.menuOrder")), 1),
              b("div", Rc, [
                g(oe, {
                  modelValue: l(m).menuOrder,
                  "onUpdate:modelValue": F[11] || (F[11] = (k) => l(m).menuOrder = k),
                  type: "number"
                }, null, 8, ["modelValue"])
              ])
            ], 64)) : B("", !0),
            l(m).arrows && l(m).arrows.length ? (f(), A(U, { key: 2 }, [
              b("div", Hc, x(S.$t("general.relations")), 1),
              b("div", Nc, [
                (f(!0), A(U, null, W(l(m).arrows, (k, Z) => {
                  var le;
                  return f(), A("div", {
                    key: k.id,
                    class: "FormObject-Arrow"
                  }, [
                    (le = l(v)) != null && le.objects[k.id] ? (f(), A("span", Vc, " #" + x(Z + 1) + " " + x(l(v).objects[k.id].name), 1)) : B("", !0),
                    g(E, {
                      class: "FormObject-ArrowButton",
                      type: "danger",
                      size: "sm",
                      onClick: (Ae) => P(Z)
                    }, {
                      default: w(() => [
                        O(x(S.$t("general.delete")), 1)
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
}), Lc = { class: "BaseTextarea" }, Qc = ["v-bind"], Ms = /* @__PURE__ */ D({
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
    return (o, r) => (f(), A("div", Lc, [
      ze(b("textarea", {
        ref: "textarea",
        "v-bind": o.$attrs,
        "onUpdate:modelValue": r[0] || (r[0] = (a) => be(i) ? i.value = a : null),
        class: "rounded-main block w-full p-2 border min-h-[200px] border-solid border-body-dark"
      }, null, 8, Qc), [
        [os, l(i)]
      ])
    ]));
  }
}), Wc = { class: "text-lg font-bold" }, Kc = {
  key: 0,
  class: "flex flex-col"
}, Gc = { class: "flex justify-end pt-4 gap-2" }, Yc = /* @__PURE__ */ D({
  __name: "FormType",
  setup(n) {
    const {
      mapTypeCurrent: e,
      mapFile: t,
      mapType: s,
      modal: i,
      controlCombo: o
    } = V(), { patron: r, chain: a, guest: c } = J();
    e.typeId(
      r.create(c.create((m) => {
        m && i.give("type");
      }))
    );
    const d = ie(""), u = a.create(), h = new ks(() => {
      e.typeId(r.create(u.receiveKey("typeId"))), t.currentMap(r.create(u.receiveKey("map"))), u.result(r.create(
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
    return o.happenedConditional(
      "KeyS",
      i.openedByName("type"),
      r.create(c.create(y))
    ), (m, C) => (f(), z(ve, { name: "type" }, {
      header: w(() => [
        b("h2", Wc, x(m.$t("general.mapType")), 1)
      ]),
      footer: w(() => [
        b("div", Gc, [
          g(E, {
            type: "success",
            onClick: y
          }, {
            default: w(() => [
              O(x(m.$t("general.save")), 1)
            ]),
            _: 1
          }),
          g(E, { onClick: p }, {
            default: w(() => [
              O(x(m.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: w(() => [
        l(h) ? (f(), A("div", Kc, [
          g(X, null, {
            default: w(() => [
              g(Y, null, {
                default: w(() => [
                  O(" Название типа ")
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
                  O(" SVG ")
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
                  O(" Ширина ")
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
                  O(" Высота ")
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
class qc {
  constructor(e, t, s) {
    this.mapObjects = e, this.map = t, this.factories = s;
  }
  objects(e) {
    const t = this.factories.chain.create();
    return this.map.types(this.factories.guestCast.create(e, t.receiveKey("types"))), this.mapObjects.objects(this.factories.guestCast.create(e, t.receiveKey("objects"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ types: s, objects: i }) => {
        rt("visible objects", i);
        const o = i.map((r) => {
          const a = s.find((d) => String(d.id) === String(r.type));
          if (rt("check type existed", a), !a)
            return {
              obj: r,
              template: ""
            };
          let { svg: c } = a;
          return rt("type svg", c), r.additionalFields && Object.entries(r.additionalFields).forEach(([d, u]) => {
            c = c.replaceAll(`\${${d}}`, u);
          }), ["width", "height"].forEach((d) => {
            c = c.replaceAll(`\${${d}}`, r[d]);
          }), {
            obj: r,
            template: c
          };
        });
        e.give(o);
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
}), Zc = { class: "relative" }, Xc = { class: "absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-1" }, el = { class: "text-sm z-10 p-2 absolute bottom-0 left-5" }, tl = /* @__PURE__ */ Bs('<div class="absolute bottom-3 shadow-standard-second shadow-md drop-shadow right-3 z-10"><div class="grid-example grid grid-rows-2 grid-cols-2 bg-standard-second border border-standard-second gap-[1px] border-t-0 border-l-0"><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div></div></div><div class="absolute z-30 top-0 left-0 h-[18px] w-[22px] bg-white"></div>', 2), sl = ["title"], il = { class: "font-bold" }, nl = ["title"], rl = { class: "font-bold" }, ol = ["title"], al = { class: "font-bold" }, cl = ["title"], ll = { class: "font-bold" }, ul = ["data-object-id"], hl = { class: "absolute bottom-[100%] left-[50%] translate-x-[-50%] text-center pb-2 pointer-events-auto text-sm w-[300px]" }, dl = ["innerHTML", "onClick"], pl = ["innerHTML"], fl = ["data-object-id", "innerHTML"], gl = /* @__PURE__ */ D({
  __name: "TheEditor",
  setup(n) {
    const {
      canvas: e,
      mapObjectsVisible: t,
      mapCurrent: s,
      konvaLayer: i,
      fps: o,
      mapCurrentID: r,
      mapObjectUrl: a,
      stageSize: c,
      objectsOutsideScreen: d,
      stagePositionByObjectId: u,
      mapCurrentSource: h
    } = V(), p = J(), y = o.value(new j()).ref(), C = new qc(
      t,
      s,
      p
    ).objects(new j([])).ref(), v = c.value(new j()).ref(), M = i.position(new j()).ref(), I = je(() => {
      var Ae;
      return (Ae = v.value) == null ? void 0 : Ae.width;
    }), G = new vt(I), Q = p.numberChunks.create(10, G).chunks(new j()).ref(), ne = ie();
    as(() => {
      e.give(ne.value);
    });
    const P = (Ae) => {
      a.open(Ae, p.guest.create((re) => {
        r.give(re);
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
    ).ref(), Z = d.count(
      { axis: "y", direction: "positive" },
      new j()
    ).ref(), le = u.move.bind(u, h);
    return (Ae, re) => {
      var At, yt, bt, wt, Ct, xt, _t, $t, kt, Mt, Ft, Tt;
      return f(), A("div", Zc, [
        b("div", Xc, [
          b("div", el, [
            O(" Видимых объектов: " + x(l(C).length) + ", FPS: " + x(l(y)) + ", ", 1),
            g(Jc)
          ]),
          tl,
          ((At = l(S)) == null ? void 0 : At.count) > 0 ? (f(), A("div", {
            key: 0,
            class: "pointer-events-auto absolute z-30 top-0 left-4 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(yt = l(S)) == null ? void 0 : yt.count} шт. объектов левее`,
            onClick: re[0] || (re[0] = (H) => l(le)(l(S).nearestObjectId))
          }, [
            g(q, { icon: "fa-arrow-left" }),
            b("span", il, x((bt = l(S)) == null ? void 0 : bt.count), 1)
          ], 8, sl)) : B("", !0),
          ((wt = l(F)) == null ? void 0 : wt.count) > 0 ? (f(), A("div", {
            key: 1,
            class: "pointer-events-auto absolute z-30 p-1 top-0 right-0 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(Ct = l(F)) == null ? void 0 : Ct.count} шт. объектов правее`,
            onClick: re[1] || (re[1] = (H) => l(le)(l(F).nearestObjectId))
          }, [
            b("span", rl, x((xt = l(F)) == null ? void 0 : xt.count), 1),
            g(q, { icon: "fa-arrow-right" })
          ], 8, nl)) : B("", !0),
          ((_t = l(k)) == null ? void 0 : _t.count) > 0 ? (f(), A("div", {
            key: 2,
            class: "pointer-events-auto absolute z-30 top-[18px] left-0 w-[18px] bg-white flex flex-col leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${($t = l(k)) == null ? void 0 : $t.count} шт. объектов выше`,
            onClick: re[2] || (re[2] = (H) => l(le)(l(k).nearestObjectId))
          }, [
            g(q, { icon: "fa-arrow-up" }),
            b("span", al, x((kt = l(k)) == null ? void 0 : kt.count), 1)
          ], 8, ol)) : B("", !0),
          ((Mt = l(Z)) == null ? void 0 : Mt.count) > 0 ? (f(), A("div", {
            key: 3,
            class: "pointer-events-auto absolute z-30 p-1 bottom-0 left-0 w-[18px] bg-white flex flex-col-reverse leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(Ft = l(Z)) == null ? void 0 : Ft.count} шт. объектов ниже`,
            onClick: re[3] || (re[3] = (H) => l(le)(l(Z).nearestObjectId))
          }, [
            g(q, { icon: "fa-arrow-down" }),
            b("span", ll, x((Tt = l(Z)) == null ? void 0 : Tt.count), 1)
          ], 8, cl)) : B("", !0),
          b("div", {
            class: ce({ "objects-container absolute top-0 left-0": !0 }),
            style: ae({ width: `${l(v).width}px`, height: `${l(v).height}px`, transform: `translate(${l(M).x}px, ${l(M).y}px)` })
          }, [
            b("div", {
              class: "absolute flex top-0 left-0 w-full z-20 h-[20px] bg-default border-b-2 border-border text-right text-sm px-2",
              style: ae({ transform: `translate(0, ${-l(M).y}px)` })
            }, [
              (f(!0), A(U, null, W(l(Q), (H) => (f(), A("span", {
                class: "flex-1 text-body-dark",
                key: `horiz_${H}`
              }, x(H) + "px", 1))), 128))
            ], 4),
            b("div", {
              class: "absolute flex [writing-mode:vertical-lr] top-0 left-0 h-full z-20 w-[20px] bg-default border-r-2 border-border text-left text-sm py-2",
              style: ae({ transform: `translate(${-l(M).x}px, 0)` })
            }, [
              (f(!0), A(U, null, W(l(Q), (H) => (f(), A("span", {
                class: "flex-1 rotate-180 text-body-dark",
                key: `vert_${H}`
              }, x(H) + "px", 1))), 128))
            ], 4),
            (f(!0), A(U, null, W(l(C), (H) => (f(), A("div", {
              key: H.obj.id,
              class: "absolute z-10",
              "data-object-id": H.obj.id,
              style: ae(`width:${H.obj.width}px;height: ${H.obj.height}px;top: ${H.obj.position[1]}px;left:${H.obj.position[0]}px;z-index:${H.obj.zindex}`)
            }, [
              b("div", hl, [
                b("span", {
                  innerHTML: H.obj.additionalName,
                  class: ce([H.obj.linked && "cursor-pointer underline"]),
                  onClick: (hu) => P(H.obj)
                }, null, 10, dl)
              ]),
              b("div", {
                class: "absolute top-[100%] left-[50%] translate-x-[-50%] text-center pt-2 text-sm w-[300px]",
                innerHTML: H.obj.name
              }, null, 8, pl),
              b("div", {
                "data-object-id": H.obj.id,
                class: "rendered-object",
                innerHTML: H.template
              }, null, 8, fl)
            ], 12, ul))), 128))
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
}), ml = { class: "flex flex-wrap gap-2" }, vl = { key: 0 }, Al = { key: 1 }, yl = ["onClick"], bl = /* @__PURE__ */ D({
  __name: "BaseBreadcrumbs",
  setup(n) {
    const {
      breadcrumbs: e,
      mapCurrentID: t
    } = V(), s = e.list(new j()).ref();
    return (i, o) => (f(), A("div", ml, [
      (f(!0), A(U, null, W(l(s), (r, a) => (f(), A("span", {
        class: "flex gap-2",
        key: r.name
      }, [
        a !== 0 ? (f(), A("span", vl, "/")) : B("", !0),
        a === l(s).length - 1 ? (f(), A("b", Al, "Открыто: " + x(r.title), 1)) : (f(), A("a", {
          key: 2,
          href: "#",
          onClick: ye((c) => l(t).give(r.name), ["prevent"])
        }, x(r.title), 9, yl))
      ]))), 128))
    ]));
  }
}), wl = { class: "flex items-center p-3 gap-3" }, Cl = { class: "ml-auto gap-1 flex" }, xl = /* @__PURE__ */ D({
  __name: "TheHeader",
  setup(n) {
    const {
      drawer: e,
      modal: t,
      mapHistory: s,
      controlCombo: i,
      settings: o
    } = V(), { patron: r, guest: a } = J(), c = s.isNextPossible(new j()).ref(), d = s.isPrevPossible(new j()).ref();
    i.happened(
      "KeyZ",
      r.create(a.create(() => {
        d.value && s.prev();
      }))
    ), i.happened(
      "KeyP",
      r.create(a.create(() => {
        c.value && s.next();
      }))
    );
    const u = new j();
    return o.value(u), (h, p) => (f(), A("div", wl, [
      g(bl, { class: "TheHeader-Breadcrumbs" }),
      b("div", Cl, [
        l(c) && !l(u).value.readonly ? (f(), z(E, {
          key: 0,
          size: "sm",
          title: "Отменить последнее действие",
          class: "w-7 block",
          onClick: p[0] || (p[0] = (y) => l(s).next())
        }, {
          default: w(() => [
            g(q, { icon: "fa-rotate-left" })
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
            g(q, { icon: "fa-rotate-right" })
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
            g(q, { icon: "fa-bars" })
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
            g(q, { icon: "fa-text-width" })
          ]),
          _: 1
        }, 8, ["title"]),
        g(E, {
          class: "w-7 block e2e-search",
          size: "sm",
          onClick: p[4] || (p[4] = (y) => l(t).give("search"))
        }, {
          default: w(() => [
            g(q, { icon: "fa-search" })
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
            g(q, { icon: "fa-map" })
          ]),
          _: 1
        })
      ])
    ]));
  }
}), _l = {}, $l = { class: "text-lg font-bold" };
function kl(n, e) {
  return f(), A("span", $l, [
    ee(n.$slots, "default")
  ]);
}
const Ml = /* @__PURE__ */ qe(_l, [["render", kl]]), Fl = { class: "flex gap-1" }, Tl = {
  key: 0,
  class: "TheMapAsText select-auto"
}, Sl = ["innerHTML"], jl = /* @__PURE__ */ D({
  __name: "TheMapAsText",
  setup(n) {
    const { mapFile: e, mapCurrent: t } = V(), {
      guest: s,
      patron: i,
      textOf: o,
      textNlAsBr: r,
      textWithoutHTML: a
    } = J(), c = e.currentMap(new j()).ref(), d = ie(""), u = ie([]);
    t.objects(
      i.create(
        s.create(we((v) => {
          u.value = v, r.create(
            o.create(
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
        o.create(
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
        const I = new Range();
        I.setStart(m.value, 0), I.setEnd(m.value, Object.values(u.value).length), (v = document.getSelection()) == null || v.removeAllRanges(), (M = document.getSelection()) == null || M.addRange(I);
      }
    };
    return (v, M) => (f(), z(ve, { name: "mapAsText" }, {
      header: w(() => [
        g(Ml, { class: "block mb-3" }, {
          default: w(() => [
            O(x(v.$t("general.mapAsText")) + " ", 1),
            b("div", Fl, [
              g(E, {
                size: "sm",
                type: "success",
                class: "font-normal",
                onClick: y
              }, {
                default: w(() => [
                  O(x(v.$t("general.share")), 1)
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
                  O(x(v.$t("general.selectAll")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        })
      ]),
      default: w(() => [
        l(c) ? (f(), A("article", Tl, [
          b("div", {
            ref_key: "textRef",
            ref: m,
            innerHTML: l(d)
          }, null, 8, Sl)
        ])) : B("", !0)
      ]),
      _: 1
    }));
  }
}), Bl = { key: 1 }, Ol = /* @__PURE__ */ D({
  __name: "TheMiniMap",
  setup(n) {
    const { miniMap: e } = V(), t = e.points(new j()).ref(), s = e.size(new j()).ref(), i = e.viewportSize(new j()).ref(), o = e.viewportPosition(new j()).ref();
    return (r, a) => l(s) ? (f(), A("div", {
      key: 0,
      style: ae({
        width: `${l(s).width}px`,
        height: `${l(s).height}px`
      }),
      class: "absolute pointer-events-none block bg-white bottom-[10px] mt-3 right-3 z-1 border border-solid border-body-dark"
    }, [
      l(o) ? (f(), A("div", {
        key: 0,
        style: ae({
          width: `${l(i).width}px`,
          height: `${l(i).height}px`,
          top: `${l(o).y}px`,
          left: `${l(o).x}px`
        }),
        class: "absolute bg-primary/50"
      }, null, 4)) : B("", !0),
      l(t) ? (f(), A("div", Bl, [
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
}), Il = { class: "text-lg font-bold" }, Pl = {
  key: 0,
  class: "TheSettings"
}, El = { class: "mb-2" }, Dl = { class: "TheSettings-Row" }, Rl = { class: "flex gap-2 mb-2" }, Hl = { class: "mb-2" }, Nl = { class: "mb-2" }, Vl = {
  href: "https://github.com/kosukhin/mind-map-creator",
  target: "_blank"
}, Ul = { class: "flex gap-2" }, zl = /* @__PURE__ */ D({
  __name: "FormSettings",
  setup(n) {
    const {
      modal: e,
      mapFile: t,
      mapRemoved: s,
      mapSettings: i,
      controlCombo: o,
      parentNames: r,
      mapCurrentID: a
    } = V(), { patron: c, guest: d } = J(), u = r.names(new j()).ref(), h = t.currentMap(new j()).ref(), p = a.id(new j()).ref(), y = () => {
      e.give("");
    }, m = () => {
      i.give(h.value.settings), y();
    };
    return o.happenedConditional(
      "KeyS",
      e.openedByName("settings"),
      c.create(d.create(m))
    ), (C, v) => (f(), z(ve, { name: "settings" }, {
      header: w(() => [
        b("h2", Il, x(C.$t("general.mapSettings")), 1)
      ]),
      default: w(() => {
        var M;
        return [
          (M = l(h)) != null && M.settings ? (f(), A("div", Pl, [
            b("div", El, [
              b("div", Dl, [
                b("div", Rl, [
                  l(u).length > 1 ? (f(), z(E, {
                    key: 0,
                    type: "primary",
                    class: "text-white",
                    onClick: v[0] || (v[0] = (I) => l(e).give("parentTypes"))
                  }, {
                    default: w(() => [
                      O(x(C.$t("general.parentTypes")), 1)
                    ]),
                    _: 1
                  })) : B("", !0),
                  g(E, {
                    type: "primary",
                    class: "text-white",
                    onClick: v[1] || (v[1] = (I) => l(e).give("export"))
                  }, {
                    default: w(() => [
                      O(x(C.$t("general.exportOrImport")), 1)
                    ]),
                    _: 1
                  }),
                  g(E, {
                    type: "primary",
                    class: "text-white e2e-open-presets",
                    onClick: v[2] || (v[2] = (I) => l(e).give("presets"))
                  }, {
                    default: w(() => [
                      O(" Пресеты ")
                    ]),
                    _: 1
                  })
                ])
              ]),
              b("div", Hl, [
                b("label", null, [
                  b("b", null, x(C.$t("general.mapName")), 1),
                  g(oe, {
                    modelValue: l(h).settings.title,
                    "onUpdate:modelValue": v[3] || (v[3] = (I) => l(h).settings.title = I)
                  }, null, 8, ["modelValue"])
                ])
              ]),
              b("div", Nl, [
                b("a", Vl, x(C.$t("general.githubRepo")), 1)
              ])
            ]),
            b("div", Ul, [
              g(E, {
                class: "TheSettings-Button",
                type: "success",
                onClick: v[4] || (v[4] = (I) => m())
              }, {
                default: w(() => [
                  O(x(C.$t("general.save")), 1)
                ]),
                _: 1
              }),
              g(E, {
                class: "TheSettings-Button",
                onClick: y
              }, {
                default: w(() => [
                  O(x(C.$t("general.cancel")), 1)
                ]),
                _: 1
              }),
              g(E, {
                class: "TheSettings-Button",
                type: "danger",
                onClick: v[5] || (v[5] = (I) => {
                  l(s).give(l(p)), y();
                })
              }, {
                default: w(() => [
                  O(x(C.$t("general.removeMap")), 1)
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
}), Ll = {}, Ql = { class: "BaseGroup" };
function Wl(n, e) {
  return f(), A("div", Ql, [
    ee(n.$slots, "default")
  ]);
}
const Kl = /* @__PURE__ */ qe(Ll, [["render", Wl]]), Gl = "default", Yl = /* @__PURE__ */ D({
  __name: "TheLinker",
  setup(n) {
    const { mapObjectsLink: e } = V(), t = e.objectIds(new j([])).ref();
    return (s, i) => (f(), z(E, {
      type: Gl,
      onClick: i[0] || (i[0] = (o) => l(e).startLink())
    }, {
      default: w(() => [
        O(x(l(t).length === 1 ? "Выбиретие объект" : l(t).length === 2 ? "Второй объект" : "Связать объекты"), 1)
      ]),
      _: 1
    }));
  }
}), ql = { class: "flex e2e-sidebar flex-col items-center gap-3 max-h-[100%] overflow-hidden" }, Jl = { class: "TheSideBar-ItemName" }, Zl = ["innerHTML", "draggable", "title", "onDragend"], Xl = {
  key: 0,
  class: "flex gap-1"
}, eu = {
  key: 0,
  class: "mt-auto w-full p-3 pt-0"
}, tu = /* @__PURE__ */ D({
  __name: "TheSideBar",
  setup(n) {
    const {
      mapObjectNew: e,
      mapCurrent: t,
      mapTypeCurrent: s,
      mapTypeRemoved: i,
      mapTypeNew: o,
      modal: r,
      settings: a,
      sidebarDraggable: c
    } = V(), d = t.types(new j()).ref(), u = ie();
    as(() => {
      c.give(u.value);
    });
    const { svgMapTypeImage: h } = J(), p = je(() => {
      var m;
      return (m = d.value) == null ? void 0 : m.map((C) => ({
        type: C,
        image: h.create(C).markup()
      })).sort((C, v) => +(C.type.name >= v.type.name));
    }), y = new j();
    return a.value(y), (m, C) => (f(), A("div", ql, [
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
            onDragend: (I) => l(e).byTypeName(v.type.id, I)
          }, null, 44, Zl),
          l(y).value.readonly ? B("", !0) : (f(), A("div", Xl, [
            g(E, {
              class: "text-white",
              size: "sm",
              type: "primary",
              onClick: (I) => l(s).give(v.type.id)
            }, {
              default: w(() => [
                O(x(m.$t("general.change")), 1)
              ]),
              _: 2
            }, 1032, ["onClick"]),
            g(E, {
              class: "text-white",
              size: "sm",
              type: "danger",
              onClick: (I) => l(i).give(v.type)
            }, {
              default: w(() => [
                O(x(m.$t("general.delete")), 1)
              ]),
              _: 2
            }, 1032, ["onClick"])
          ]))
        ]))), 128))
      ], 512),
      l(y).value.readonly ? B("", !0) : (f(), A("div", eu, [
        g(Kl, { class: "mb-1 grid gap-1 grid-cols-2" }, {
          default: w(() => [
            g(E, {
              title: m.$t("general.addType"),
              type: "success",
              onClick: C[0] || (C[0] = (v) => l(o).byName())
            }, {
              default: w(() => [
                g(q, { icon: "fa-plus-square" })
              ]),
              _: 1
            }, 8, ["title"]),
            g(E, {
              class: "e2e-show-settings",
              title: m.$t("general.settings"),
              type: "primary",
              onClick: C[1] || (C[1] = (v) => l(r).give("settings"))
            }, {
              default: w(() => [
                g(q, { icon: "fa-cog" })
              ]),
              _: 1
            }, 8, ["title"])
          ]),
          _: 1
        }),
        g(Yl, { class: "w-[100%] block mb-1" })
      ]))
    ]));
  }
});
class su {
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
class iu {
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
class nu {
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
const ru = { class: "AppPresets" }, ou = /* @__PURE__ */ b("div", { class: "text-md font-bold mb-2" }, "Экспорт\\Импорт текущей карты", -1), au = { class: "flex flex-col gap-2" }, cu = /* @__PURE__ */ D({
  __name: "AppExport",
  setup(n) {
    const { mapFile: e, mapCurrent: t } = V(), s = new nu(
      t,
      new Te((a) => {
        e.currentMap(new Ue(a));
      })
    ), i = new iu(s), o = new su(new j(), i);
    i.value(o);
    const r = o.ref();
    return (a, c) => (f(), z(ve, { name: "export" }, {
      default: w(() => [
        b("div", ru, [
          ou,
          b("div", au, [
            g(Ms, {
              modelValue: l(r),
              "onUpdate:modelValue": c[0] || (c[0] = (d) => be(r) ? r.value = d : null)
            }, null, 8, ["modelValue"])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), lu = { class: "bg-body absolute top-0 left-0 w-full h-full" }, uu = { class: "grid grid-cols-[200px_1fr] grid-rows-[50px_1fr] h-dvh relative" }, wu = /* @__PURE__ */ D({
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
    const t = n, s = e, { fileContent: i, settings: o } = V(), { guest: r, patron: a } = J();
    return o.value((c) => {
      o.give({
        ...c,
        readonly: t.readonly,
        presets: t.presets
      });
    }), Be(() => t.modelValue, (c) => {
      i.value(r.create((d) => {
        c !== d && i.give(c);
      }));
    }, {
      immediate: !0
    }), i.value(a.create((c) => {
      s("update:modelValue", c);
    })), (c, d) => (f(), A("div", lu, [
      b("div", uu, [
        g(xl, { class: "col-span-2" }),
        g(tu),
        g(gl, { class: "w-auto col-auto h-full" }),
        g(Ol)
      ]),
      g(zc),
      g(Yc),
      g(zl),
      g(Xa),
      g(fc),
      g(cu),
      g(Va),
      g(jl),
      g(cc),
      g(Pa)
    ]));
  }
}), is = T.debug("FileSystemContent");
class Cu {
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
class xu {
  constructor(e, t) {
    $(this, "firstPossibleFileContent", null);
    $(this, "contentSource", new fe());
    $(this, "canBeUsedSource", new fe());
    Ve("length", e.length), e.forEach((s) => {
      s.canBeUsed(
        t.patronOnce.create(
          t.guest.create((i) => {
            Ve("canbeused result", s, i), i && !this.firstPossibleFileContent && (this.firstPossibleFileContent = s, s.canBeUsed(t.patron.create(this.canBeUsedSource)), s.content(t.patron.create(this.contentSource)), this.contentSource.value(
              t.patron.create((o) => {
                s.content(
                  t.guest.create((r) => {
                    o !== r && s.give(o);
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
class _u {
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
const ns = new fe();
class $u {
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
  $u as BrowserLaunchQueue,
  Cu as FileSystemContent,
  xu as FirstPossibleFileContent,
  wu as PatronSchemeEditor,
  _u as UrlContent,
  j as VueRefPatron,
  V as useApplication,
  J as useFactories
};
