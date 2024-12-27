var Ss = Object.defineProperty;
var Ts = (n, e, t) => e in n ? Ss(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var $ = (n, e, t) => Ts(n, typeof e != "symbol" ? e + "" : e, t);
import { ref as ee, defineComponent as P, computed as Ie, openBlock as f, createBlock as U, Transition as ns, withCtx as w, unref as u, createElementBlock as A, normalizeClass as ne, createElementVNode as b, withModifiers as be, renderSlot as te, createCommentVNode as T, Fragment as W, renderList as G, toDisplayString as C, createVNode as g, normalizeStyle as ce, createTextVNode as O, watch as je, withDirectives as Qe, isRef as Be, vModelText as rs, vModelCheckbox as Is, onBeforeUnmount as js, vModelSelect as Bs, onMounted as os, createStaticVNode as Os } from "vue";
import { useScriptTag as Ps, useMagicKeys as Es, useVModel as We, useShare as Ds } from "@vueuse/core";
import de from "konva";
import { FontAwesomeIcon as Hs } from "@fortawesome/vue-fontawesome";
import { faArrowUp as Rs, faArrowDown as Ns, faArrowRight as Vs, faArrowLeft as Us, faClose as zs, faMap as Ls, faRotateRight as Qs, faRotateLeft as Ws, faFileText as Ks, faCog as Gs, faPlusSquare as qs, faHistory as Ys, faSearch as Js, faTextWidth as Zs, faBars as Xs } from "@fortawesome/free-solid-svg-icons";
import { useEditor as ei, EditorContent as ti, BubbleMenu as si } from "@tiptap/vue-3";
import ii from "@tiptap/starter-kit";
class ni {
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
class ye {
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
class z {
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
var ri = Object.defineProperty, oi = (n, e, t) => e in n ? ri(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Tt = (n, e, t) => oi(n, typeof e != "symbol" ? e + "" : e, t);
const as = /* @__PURE__ */ new Map(), It = (n) => {
  as.forEach((e) => {
    e.delete(n);
  });
};
class Ke {
  constructor(e) {
    this.initiator = e, Tt(this, "patrons"), Tt(this, "give"), this.patrons = /* @__PURE__ */ new Set(), as.set(this, this.patrons);
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
var ai = Object.defineProperty, ci = (n, e, t) => e in n ? ai(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, li = (n, e, t) => ci(n, e + "", t);
class we {
  constructor(e) {
    this.sourceDocument = e, li(this, "thePool", new Ke(this));
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
class Le {
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
var ui = Object.defineProperty, di = (n, e, t) => e in n ? ui(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, jt = (n, e, t) => di(n, typeof e != "symbol" ? e + "" : e, t);
class hi {
  constructor(e) {
    jt(this, "guests", /* @__PURE__ */ new Set()), jt(this, "patronPool"), this.patronPool = new Ke(e);
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
var pi = Object.defineProperty, fi = (n, e, t) => e in n ? pi(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Pe = (n, e, t) => fi(n, typeof e != "symbol" ? e + "" : e, t);
class Ge {
  constructor() {
    Pe(this, "theChain"), Pe(this, "keysKnown", /* @__PURE__ */ new Set()), Pe(this, "keysFilled", /* @__PURE__ */ new Set()), Pe(this, "filledChainPool", new hi(this)), this.theChain = new we({});
  }
  resultArray(e) {
    const t = new Le(e);
    return this.filledChainPool.add(
      new z(t, (s) => {
        t.give(Object.values(s));
      })
    ), this.isChainFilled() && this.theChain.value(
      new pe((s) => {
        this.filledChainPool.give(Object.values(s));
      })
    ), this;
  }
  result(e) {
    const t = new Le(e);
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
class mi {
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
class cs {
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
var gi = Object.defineProperty, vi = (n, e, t) => e in n ? gi(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Ai = (n, e, t) => vi(n, e + "", t);
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
    Ci(this, "baseSource", new we(null));
  }
  value(e) {
    return this.baseSource.value(
      new z(e, (t) => {
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
class Te extends Error {
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
      throw new Te("Problem when reading file in SystemFileFromHandler", {
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
      throw new Te("Cant save file in browser", { cause: s });
    }), t)).then((t) => {
      t.close().catch((s) => {
        throw new Te("Cant close written file in browser", { cause: s });
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
class Fi {
  constructor(e, t = 100, s = 100) {
    this.svgContent = e, this.width = t, this.height = s;
  }
  markup() {
    return this.svgContent.replaceAll("${width}", String(this.width)).replaceAll("${height}", String(this.height));
  }
}
class Mi {
  constructor(e, t) {
    this.type = e, this.factories = t;
  }
  markup() {
    return this.factories.svgImage.create(this.type.svg, this.type.width, this.type.height).markup();
  }
}
class Si {
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
class Ti {
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
class Ii {
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
class ji {
  constructor(e, t, s, i) {
    $(this, "loadingCache");
    this.callbackName = e, this.url = t, this.emptyValue = s, this.factories = i, this.loadingCache = i.sourceEmpty.create();
  }
  content(e) {
    this.loadingCache.give(!0);
    const t = setTimeout(() => {
      this.loadingCache.give(!1), e.give(this.emptyValue);
    }, 1e4);
    return Ps(this.url, () => {
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
class Bi {
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
var Ee = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ut(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var lt = { exports: {} }, Xe, Bt;
function Pi() {
  if (Bt) return Xe;
  Bt = 1;
  var n = 1e3, e = n * 60, t = e * 60, s = t * 24, i = s * 7, r = s * 365.25;
  Xe = function(l, d) {
    d = d || {};
    var p = typeof l;
    if (p === "string" && l.length > 0)
      return o(l);
    if (p === "number" && isFinite(l))
      return d.long ? a(l) : c(l);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(l)
    );
  };
  function o(l) {
    if (l = String(l), !(l.length > 100)) {
      var d = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        l
      );
      if (d) {
        var p = parseFloat(d[1]), y = (d[2] || "ms").toLowerCase();
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
  function c(l) {
    var d = Math.abs(l);
    return d >= s ? Math.round(l / s) + "d" : d >= t ? Math.round(l / t) + "h" : d >= e ? Math.round(l / e) + "m" : d >= n ? Math.round(l / n) + "s" : l + "ms";
  }
  function a(l) {
    var d = Math.abs(l);
    return d >= s ? h(l, d, s, "day") : d >= t ? h(l, d, t, "hour") : d >= e ? h(l, d, e, "minute") : d >= n ? h(l, d, n, "second") : l + " ms";
  }
  function h(l, d, p, y) {
    var m = d >= p * 1.5;
    return Math.round(l / p) + " " + y + (m ? "s" : "");
  }
  return Xe;
}
function Ei(n) {
  t.debug = t, t.default = t, t.coerce = a, t.disable = r, t.enable = i, t.enabled = o, t.humanize = Pi(), t.destroy = h, Object.keys(n).forEach((l) => {
    t[l] = n[l];
  }), t.names = [], t.skips = [], t.formatters = {};
  function e(l) {
    let d = 0;
    for (let p = 0; p < l.length; p++)
      d = (d << 5) - d + l.charCodeAt(p), d |= 0;
    return t.colors[Math.abs(d) % t.colors.length];
  }
  t.selectColor = e;
  function t(l) {
    let d, p = null, y, m;
    function x(...v) {
      if (!x.enabled)
        return;
      const k = x, B = Number(/* @__PURE__ */ new Date()), K = B - (d || B);
      k.diff = K, k.prev = d, k.curr = B, d = B, v[0] = t.coerce(v[0]), typeof v[0] != "string" && v.unshift("%O");
      let H = 0;
      v[0] = v[0].replace(/%([a-zA-Z%])/g, (E, j) => {
        if (E === "%%")
          return "%";
        H++;
        const M = t.formatters[j];
        if (typeof M == "function") {
          const F = v[H];
          E = M.call(k, F), v.splice(H, 1), H--;
        }
        return E;
      }), t.formatArgs.call(k, v), (k.log || t.log).apply(k, v);
    }
    return x.namespace = l, x.useColors = t.useColors(), x.color = t.selectColor(l), x.extend = s, x.destroy = t.destroy, Object.defineProperty(x, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => p !== null ? p : (y !== t.namespaces && (y = t.namespaces, m = t.enabled(l)), m),
      set: (v) => {
        p = v;
      }
    }), typeof t.init == "function" && t.init(x), x;
  }
  function s(l, d) {
    const p = t(this.namespace + (typeof d > "u" ? ":" : d) + l);
    return p.log = this.log, p;
  }
  function i(l) {
    t.save(l), t.namespaces = l, t.names = [], t.skips = [];
    let d;
    const p = (typeof l == "string" ? l : "").split(/[\s,]+/), y = p.length;
    for (d = 0; d < y; d++)
      p[d] && (l = p[d].replace(/\*/g, ".*?"), l[0] === "-" ? t.skips.push(new RegExp("^" + l.slice(1) + "$")) : t.names.push(new RegExp("^" + l + "$")));
  }
  function r() {
    const l = [
      ...t.names.map(c),
      ...t.skips.map(c).map((d) => "-" + d)
    ].join(",");
    return t.enable(""), l;
  }
  function o(l) {
    if (l[l.length - 1] === "*")
      return !0;
    let d, p;
    for (d = 0, p = t.skips.length; d < p; d++)
      if (t.skips[d].test(l))
        return !1;
    for (d = 0, p = t.names.length; d < p; d++)
      if (t.names[d].test(l))
        return !0;
    return !1;
  }
  function c(l) {
    return l.toString().substring(2, l.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function a(l) {
    return l instanceof Error ? l.stack || l.message : l;
  }
  function h() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return t.enable(t.load()), t;
}
var Di = Ei;
(function(n, e) {
  e.formatArgs = s, e.save = i, e.load = r, e.useColors = t, e.storage = o(), e.destroy = /* @__PURE__ */ (() => {
    let a = !1;
    return () => {
      a || (a = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
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
    let a;
    return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator < "u" && navigator.userAgent && (a = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(a[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function s(a) {
    if (a[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + a[0] + (this.useColors ? "%c " : " ") + "+" + n.exports.humanize(this.diff), !this.useColors)
      return;
    const h = "color: " + this.color;
    a.splice(1, 0, h, "color: inherit");
    let l = 0, d = 0;
    a[0].replace(/%[a-zA-Z%]/g, (p) => {
      p !== "%%" && (l++, p === "%c" && (d = l));
    }), a.splice(d, 0, h);
  }
  e.log = console.debug || console.log || (() => {
  });
  function i(a) {
    try {
      a ? e.storage.setItem("debug", a) : e.storage.removeItem("debug");
    } catch {
    }
  }
  function r() {
    let a;
    try {
      a = e.storage.getItem("debug");
    } catch {
    }
    return !a && typeof process < "u" && "env" in process && (a = process.env.DEBUG), a;
  }
  function o() {
    try {
      return localStorage;
    } catch {
    }
  }
  n.exports = Di(e);
  const { formatters: c } = n.exports;
  c.j = function(a) {
    try {
      return JSON.stringify(a);
    } catch (h) {
      return "[UnexpectedJSONParseError]: " + h.message;
    }
  };
})(lt, lt.exports);
var S = lt.exports;
const ls = /* @__PURE__ */ ut(S), Hi = S.debug("TextNlAsBr");
class Ri {
  constructor(e, t) {
    this.baseText = e, this.factories = t;
  }
  asString(e) {
    return this.baseText.asString(
      this.factories.guestInTheMiddle.create(e, (t) => {
        if (typeof t > "u" || t === null)
          return "";
        const s = "<br />";
        return Hi(t), e.give((t ?? "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, `$1${s}$2`)), !0;
      })
    ), e;
  }
}
const Ni = new R(we), Vi = new R(we), Ui = new R(fe), zi = new R(pe), Li = new R(z), Qi = new R(ye), Wi = new R(Ke), Ki = new R(cs), Gi = new R(yi), qi = new R(z), Yi = new R(Ge), Ji = new R(mi), he = {
  cache: Ni,
  chain: Yi,
  guest: zi,
  guestCast: Li,
  guestAware: Qi,
  guestInTheMiddle: qi,
  guestSync: Ji,
  patron: Ki,
  patronOnce: Gi,
  pool: Wi,
  source: Vi,
  sourceEmpty: Ui
}, Zi = new R(xi), Xi = new R(_i), en = new R(ki), tn = new R($i), us = new R(Fi), sn = new R(Mi, { ...he, svgImage: us }), nn = new R(Si, he), rn = new R(Ti, he), on = new R(Ii, he), an = new R(ji, he), cn = new R(Bi), ln = new R(Oi, he), un = new R(Ri, he), dn = {
  ...he,
  fileHandlerContent: Zi,
  browserFileSaved: Xi,
  transformToString: en,
  transformToObject: tn,
  svgImage: us,
  svgMapTypeImage: sn,
  numberChunks: nn,
  mapNameFromUrl: rn,
  textNoHtml: on,
  jsonp: an,
  textOf: cn,
  textNlAsBr: un,
  textWithoutHTML: ln
}, J = () => dn;
class dt {
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
const et = S.debug("MapCurrent");
class ds {
  constructor(e, t, s) {
    $(this, "objectsCache");
    $(this, "settingsCache");
    $(this, "typesCache");
    this.mapFile = e, this.mapId = t, this.factories = s, this.objectsCache = s.sourceEmpty.create(), this.settingsCache = s.sourceEmpty.create(), this.typesCache = s.sourceEmpty.create(), e.currentMap(
      s.patron.create(
        s.guest.create((i) => {
          et("current map changed", i), this.settingsCache.give(i.settings), this.objectsCache.give(Object.values(i.objects)), this.typesCache.give(
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
    return et("notify about new objects"), this.objectsCache.value(e), e;
  }
  types(e) {
    return this.typesCache.value(e), e;
  }
  give(e) {
    return et("save map document", e), this.mapId.id(
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
class hn {
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
      new z(e, (t) => {
        e.give(t.settings.title);
      })
    ), this;
  }
}
const De = S.debug("MapHistory"), Ot = (n) => {
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
              De("add map to history", s, e);
              const i = s.some(
                (r) => Ot(r) === Ot(e)
              );
              if (De("isMapFromHistory", i), !i) {
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
          De("recalculate is prev possible", r), e.give(r);
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
          De("recalculate is next possible", r), e.give(r);
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
class mn {
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
const He = S.debug("MapFileOfContent");
class gn {
  constructor(e, t, s) {
    $(this, "currentMapPatrons");
    $(this, "mapFileCache");
    this.mapFileContent = e, this.mapId = t, this.factories = s, this.currentMapPatrons = s.pool.create(this), this.mapFileCache = s.cache.create(!1), e.value(
      s.patron.create((i) => {
        if (!i)
          return;
        const r = this.factories.transformToObject.create(i).result();
        He("get map file", r), this.mapFileCache.give(r);
      })
    );
  }
  currentMap(e) {
    const t = this.factories.chain.create();
    return this.mapId.id(this.factories.guestCast.create(e, t.receiveKey("mapId"))), this.mapFile(this.factories.guestCast.create(e, t.receiveKey("mapFile"))), t.result(
      this.factories.guestInTheMiddle.create(
        e,
        ({ mapId: s, mapFile: i }) => {
          if (He("get current map", s, i, typeof i), !i[s])
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
    return He("save map file document", e), this.mapFileContent.give(this.factories.transformToString.create(e).result()), this;
  }
  mapFile(e) {
    return this.mapFileCache.value(e), e;
  }
  createEmptyMapByName(e, t) {
    He("creating empty map by name", e);
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
const vn = S.debug("MapFileForRendering");
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
const Pt = ls("app:MapObjectCurrent");
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
const tt = S.debug("MapObjectNew");
class wn {
  constructor(e, t, s, i, r) {
    this.map = e, this.mapObject = t, this.canvas = s, this.stagePosition = i, this.factories = r;
  }
  byTypeName(e, t) {
    return tt("start to add new type", e, t), this.stagePosition.position(
      this.factories.guest.create((s) => {
        this.map.types(
          this.factories.guest.create((i) => {
            this.canvas.canvas(
              this.factories.guest.create((r) => {
                const o = r.getBoundingClientRect(), c = i.find((l) => l.id === e);
                tt("is type found", c);
                const a = t.x - o.left, h = t.y - o.top;
                c && (tt("add new type"), this.mapObject.give({
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
                  width: c.width,
                  height: c.height,
                  zindex: 0,
                  id: (/* @__PURE__ */ new Date()).getTime().toString(),
                  createTimestamp: Date.now(),
                  changeTimestamp: Date.now(),
                  position: [
                    a > 0 ? a + s.x : 0,
                    h > 0 ? h + s.y : 0
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
          const c = `${i}${o}`;
          return i || (i = "_"), i += `${o}_`, c;
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
const $n = S.debug("MapObjectsLink");
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
                const [, r] = t, o = i.find((c) => c.id === r);
                o && this.newArrow.forObject(o);
              })
            ), t.length === 3 && (this.newArrow.dispose(), this.mapObjectCurrent.silenceOff(), this.map.objects(
              this.factories.guest.create((i) => {
                const [, r, o] = t, c = i.find((a) => a.id === r);
                c && o && (this.objectIdsCache.give([]), this.mapObject.give({
                  ...c,
                  arrows: [
                    ...c.arrows,
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
function Fn(n) {
  var e = typeof n;
  return n != null && (e == "object" || e == "function");
}
var ht = Fn, Mn = typeof Ee == "object" && Ee && Ee.Object === Object && Ee, Sn = Mn, Tn = Sn, In = typeof self == "object" && self && self.Object === Object && self, jn = Tn || In || Function("return this")(), ps = jn, Bn = ps, On = function() {
  return Bn.Date.now();
}, Pn = On, En = /\s/;
function Dn(n) {
  for (var e = n.length; e-- && En.test(n.charAt(e)); )
    ;
  return e;
}
var Hn = Dn, Rn = Hn, Nn = /^\s+/;
function Vn(n) {
  return n && n.slice(0, Rn(n) + 1).replace(Nn, "");
}
var Un = Vn, zn = ps, Ln = zn.Symbol, fs = Ln, Et = fs, ms = Object.prototype, Qn = ms.hasOwnProperty, Wn = ms.toString, _e = Et ? Et.toStringTag : void 0;
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
var Gn = Kn, qn = Object.prototype, Yn = qn.toString;
function Jn(n) {
  return Yn.call(n);
}
var Zn = Jn, Dt = fs, Xn = Gn, er = Zn, tr = "[object Null]", sr = "[object Undefined]", Ht = Dt ? Dt.toStringTag : void 0;
function ir(n) {
  return n == null ? n === void 0 ? sr : tr : Ht && Ht in Object(n) ? Xn(n) : er(n);
}
var nr = ir;
function rr(n) {
  return n != null && typeof n == "object";
}
var or = rr, ar = nr, cr = or, lr = "[object Symbol]";
function ur(n) {
  return typeof n == "symbol" || cr(n) && ar(n) == lr;
}
var dr = ur, hr = Un, Rt = ht, pr = dr, Nt = NaN, fr = /^[-+]0x[0-9a-f]+$/i, mr = /^0b[01]+$/i, gr = /^0o[0-7]+$/i, vr = parseInt;
function Ar(n) {
  if (typeof n == "number")
    return n;
  if (pr(n))
    return Nt;
  if (Rt(n)) {
    var e = typeof n.valueOf == "function" ? n.valueOf() : n;
    n = Rt(e) ? e + "" : e;
  }
  if (typeof n != "string")
    return n === 0 ? n : +n;
  n = hr(n);
  var t = mr.test(n);
  return t || gr.test(n) ? vr(n.slice(2), t ? 2 : 8) : fr.test(n) ? Nt : +n;
}
var yr = Ar, br = ht, st = Pn, Vt = yr, wr = "Expected a function", Cr = Math.max, xr = Math.min;
function _r(n, e, t) {
  var s, i, r, o, c, a, h = 0, l = !1, d = !1, p = !0;
  if (typeof n != "function")
    throw new TypeError(wr);
  e = Vt(e) || 0, br(t) && (l = !!t.leading, d = "maxWait" in t, r = d ? Cr(Vt(t.maxWait) || 0, e) : r, p = "trailing" in t ? !!t.trailing : p);
  function y(E) {
    var j = s, M = i;
    return s = i = void 0, h = E, o = n.apply(M, j), o;
  }
  function m(E) {
    return h = E, c = setTimeout(k, e), l ? y(E) : o;
  }
  function x(E) {
    var j = E - a, M = E - h, F = e - j;
    return d ? xr(F, r - M) : F;
  }
  function v(E) {
    var j = E - a, M = E - h;
    return a === void 0 || j >= e || j < 0 || d && M >= r;
  }
  function k() {
    var E = st();
    if (v(E))
      return B(E);
    c = setTimeout(k, x(E));
  }
  function B(E) {
    return c = void 0, p && s ? y(E) : (s = i = void 0, o);
  }
  function K() {
    c !== void 0 && clearTimeout(c), h = 0, s = a = i = c = void 0;
  }
  function H() {
    return c === void 0 ? o : B(st());
  }
  function re() {
    var E = st(), j = v(E);
    if (s = arguments, i = this, a = E, j) {
      if (c === void 0)
        return m(a);
      if (d)
        return clearTimeout(c), c = setTimeout(k, e), y(a);
    }
    return c === void 0 && (c = setTimeout(k, e)), o;
  }
  return re.cancel = K, re.flush = H, re;
}
var gs = _r;
const Ce = /* @__PURE__ */ ut(gs), $r = (n) => {
  if (n[n.length - 1] === "/") {
    const e = n.split("");
    return e.splice(e.length - 1, 1), e.join("");
  }
  return n;
}, kr = Ce((n) => {
  window == null || window.open(n);
}, 200), it = S.debug("MapObjectUrl");
class Fr {
  constructor(e, t) {
    this.mapId = e, this.factories = t;
  }
  open(e, t) {
    if (e != null && e.linked) {
      const s = e.outlink;
      e.targetBlank ? kr(s) : (it("open new map", s), this.factories.mapNameFromUrl.create(
        this.factories.source.create(s)
      ).name(
        this.factories.guest.create((r) => {
          it("open map name", s, r), t.give(r);
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
              this.factories.guest.create((c) => {
                let a = s.outlink ? s.outlink : `${r}/${Mr(c)}`;
                it("link is", a), a = $r(a), t.give(a);
              })
            );
          })
        );
      })
    ), t;
  }
}
function Mr(n) {
  return n.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}
const Sr = S.debug("ObjectPositionBounds");
class Tr {
  constructor(e, t) {
    this.stageSize = e, this.factories = t;
  }
  position(e, t, s) {
    return this.stageSize.value(
      this.factories.guestInTheMiddle.create(s, (i) => {
        let { x: r, y: o } = t;
        r < 30 && (r = 30), o < 30 && (o = 30);
        const c = i.width - e.width;
        r > c && (r = c);
        const a = i.height - e.height;
        o > a && (o = a), Sr("position", r, o), s.give({ x: r, y: o });
      })
    ), s;
  }
}
const Re = 15;
class Ir {
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
}, nt = {
  x: 0,
  y: 1
}, jr = {
  positive: 1,
  negative: -1
}, zt = S.debug("ObjectsOutsideScreen");
class Br {
  constructor(e, t, s, i) {
    this.map = e, this.stageSize = t, this.layer = s, this.factories = i;
  }
  count(e, t) {
    const s = e.direction === "positive", i = this.factories.chain.create();
    return this.map.objects(this.factories.guestCast.create(t, i.receiveKey("objects"))), this.layer.layer(this.factories.guestCast.create(t, i.receiveKey("layer"))), this.layer.position(this.factories.guestCast.create(t, i.receiveKey("position"))), i.result(
      this.factories.guestInTheMiddle.create(
        t,
        ({ objects: r, layer: o, position: c }) => {
          var d;
          const a = jr[e.direction], l = r.sort(
            (p, y) => p.position[nt[e.axis]] * a - y.position[nt[e.axis]] * a
          ).filter((p) => {
            const y = p.position[nt[e.axis]] + (s ? 0 : p[Ut[e.axis]]), m = c[e.axis] * -1 + (s ? o[Ut[e.axis]]() : 0);
            return zt(
              "mb nearest points",
              e.direction,
              "objectP=",
              y,
              "screenP=",
              m
            ), s ? y > m : y < m;
          });
          zt("nearest", l), t.give({
            count: l.length,
            nearestObjectId: ((d = l.at(s ? -1 : 0)) == null ? void 0 : d.id) ?? ""
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
class Hr {
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
const Rr = S.debug("MapTypeUsed");
class Nr {
  constructor(e, t) {
    this.mapFile = e, this.factories = t;
  }
  check(e, t) {
    return this.mapFile.currentMap(
      this.factories.guest.create((s) => {
        const i = Object.values(s.objects).some(
          (r) => r.type === e.name
        );
        Rr("is type used", i), t.give(!i || "Тип карты использован");
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
const Lt = S.debug("ParentTypes");
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
        r.map((a) => i[a]).forEach((a) => {
          Object.values(a.types).forEach((h) => {
            o[h.name] = h;
          });
        }), e.give(Object.values(o));
      })
    ), e;
  }
}
const Qt = S.debug("ObjectsMatchedToQuery");
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
                (c) => {
                  var a;
                  return c.name.toLowerCase().includes(i) || ((a = c.additionalName) == null ? void 0 : a.toLowerCase().includes(i)) || Object.values(c.additionalFields ?? {}).join(" ").toLowerCase().includes(i);
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
const Wt = S.debug("StageMoveRestriction");
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
            const r = i.width - s.clientWidth, o = i.height - s.clientHeight, c = e.x * -1, a = e.y * -1;
            if (o < 0 || r < 0)
              return { x: 0, y: 0 };
            Wt("boundings", o, r, a, c), t.give({
              x: e.x > 0 ? 0 : c > r ? r * -1 : e.x,
              y: e.y > 0 ? 0 : a > o ? o * -1 : e.y
            });
          })
        );
      })
    ), t;
  }
}
const $e = S.debug("app:MapObjectsVisible");
class Kr {
  constructor(e, t, s, i) {
    $(this, "visibleObjectsCache", new fe());
    $e("constructor initialized");
    const r = i.chain.create();
    t.size(i.patron.create(r.receiveKey("size"))), e.position(i.patron.create(r.receiveKey("position"))), s.currentMap(i.patron.create(r.receiveKey("map"))), r.result(
      i.patron.create(
        i.guest.create(({ position: o, size: c, map: a }) => {
          const h = Object.values(a.objects);
          $e("objects come to result", h);
          const l = h.filter((d) => {
            const p = a.types[d.type] ?? {}, y = {
              width: d.width || p.width,
              height: d.height || p.height
            };
            return this.isInBounding(o, c, d.position, y);
          });
          $e("visible objects calculated", l), this.visibleObjectsCache.give(l);
        })
      )
    );
  }
  objects(e) {
    return this.visibleObjectsCache.value(e), this;
  }
  isInBounding(e, t, s, i) {
    const r = e.x, o = e.x - t.width, c = e.y, a = e.y - t.height, [h, l] = s;
    return $e("bounding vars", r, o, c, a), $e("object position", s), r > -h - i.width && -h > o && c > -l - i.height && -l > a;
  }
}
const Gr = (n, e) => {
  const t = n.matchAll(e);
  return Array.from(t).map((s) => s[1]);
}, qr = (n, e) => n.reduce((t, s) => (t[s] = e[s] || s, t), {});
class Yr {
  constructor(e, t, s, i) {
    this.mapFile = t, this.mapObject = s, this.factories = i, e.objectId(this);
  }
  give(e) {
    return this.mapFile.currentMap(
      this.factories.guest.create((t) => {
        const s = t.objects[e];
        if (!s)
          return;
        const i = t.types[s.type], r = /\$\{([a-zA-Z1-9]+)\}/g, c = Gr(i.svg, r).filter((a) => a !== "width" && a !== "height");
        s.additionalFields = qr(c, s.additionalFields ?? {}), this.mapObject.give(s);
      })
    ), this;
  }
  introduction() {
    return "patron";
  }
}
class Jr {
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
    return this.arrowPointPositionNear(
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
    }, c = o.x - r.x, a = o.y - r.y, h = Math.abs(a) > Math.abs(c);
    let l = +t.x, d = +t.y;
    const p = h && a >= 0, y = !h && c >= 0, m = h && a < 0, x = !h && c < 0, v = { x: 0, y: 0 };
    let k = 0, B = 0;
    p ? (l += Math.round(e.width / 2), v.x = l, v.y = (t.y + i.y + s.height) / 2, k = i.x > t.x ? 1 : -1) : x ? (d += Math.round(e.height / 2), l += +e.width, v.x = (t.x + e.width + i.x) / 2, v.y = d, B = i.y > t.y ? 1 : -1) : m ? (l += Math.round(e.width / 2), d += +e.height, v.x = l, v.y = (t.y + e.height + i.y) / 2, k = i.x > t.x ? 1 : -1) : y && (d += Math.round(e.height / 2), v.x = (t.x + i.x + s.width) / 2, v.y = d, B = i.y > t.y ? 1 : -1);
    const K = [l, d].join("-"), H = this.filledPoints.get(K) || 0;
    return this.filledPoints.set(K, H + 1), {
      point: { x: l, y: d },
      breakPoint: v,
      shift: {
        x: k * H * 10,
        y: B * H * 10
      }
    };
  }
}
class Zr {
  constructor(e, t) {
    this.objectsSource = e, this.objectsMapSource = t;
  }
  value(e) {
    const t = new Ge();
    return this.objectsSource.value(new z(e, t.receiveKey("objects"))), this.objectsMapSource.value(new z(e, t.receiveKey("objectsMap"))), t.result(
      new z(
        e,
        ({ objects: s, objectsMap: i }) => {
          const r = [];
          s.forEach((o) => {
            o.arrows.forEach((c) => {
              const a = i[c.id];
              a && r.push({
                fromObject: o,
                toObject: a
              });
            });
          }), L(r, e);
        }
      )
    ), this;
  }
}
class Xr {
  constructor(e) {
    this.arrowDeps = e;
  }
  value(e) {
    return this.arrowDeps.value(
      new z(e, (t) => {
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
    }, r = i.x - s.x, o = i.y - s.y, c = Math.abs(o) > Math.abs(r);
    let a = +e.position[0], h = +e.position[1];
    const l = c && o >= 0, d = !c && r >= 0, p = c && o < 0, y = !c && r < 0, m = { x: 0, y: 0 };
    return l ? (a += Math.round(e.width / 2), m.x = a, m.y = (e.position[1] + t.position[1] + t.height) / 2, t.position[0] > e.position[0]) : y ? (h += Math.round(e.height / 2), a += +e.width, m.x = (e.position[0] + e.width + t.position[0]) / 2, m.y = h, t.position[1] > e.position[1]) : p ? (a += Math.round(e.width / 2), h += +e.height, m.x = a, m.y = (e.position[1] + e.height + t.position[1]) / 2, t.position[1] > e.position[1]) : d && (h += Math.round(e.height / 2), m.x = (e.position[0] + t.position[0] + t.width) / 2, m.y = h, t.position[1] > e.position[1]), {
      point: { x: a, y: h },
      breakPoint: m,
      shift: {
        x: 0,
        y: 0
      }
    };
  }
}
class eo {
  constructor(e) {
    this.arrowDeps = e;
  }
  value(e) {
    return this.arrowDeps.value(
      new z(e, (t) => {
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
    }, r = {
      "left-top": () => s.fullWidth < i.startWidth && s.fullHeight < i.startHeight,
      "right-top": () => i.fullWidth < s.startWidth && s.fullHeight < i.startHeight,
      "left-bottom": () => s.fullWidth < i.startWidth && i.fullHeight < s.startHeight,
      "right-bottom": () => i.fullWidth < s.startWidth && i.fullHeight < s.startHeight
    }, o = {
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
    }, c = Object.entries(r).reduce((a, [h, l]) => (l() && (a = h), a), "left-top");
    return o[c]();
  }
}
class to {
  constructor(e, t = 10) {
    this.arrowDepsSource = e, this.centerGap = t;
  }
  value(e) {
    return this.arrowDepsSource.value(
      new z(e, ({ fromObject: t, toObject: s }) => {
        const i = {
          width: t.width,
          height: t.height
        }, r = {
          x: t.position[0],
          y: t.position[1]
        }, o = {
          width: s.width,
          height: s.height
        }, c = {
          x: s.position[0],
          y: s.position[1]
        }, a = {
          x: +c.x + Math.round(o.width / 2),
          y: +c.y + Math.round(o.height / 2)
        }, h = {
          x: +r.x + Math.round(i.width / 2),
          y: +r.y + Math.round(i.height / 2)
        }, l = Math.abs(a.x - h.x) - (o.width + this.centerGap), d = Math.abs(a.y - h.y) - (o.height + this.centerGap);
        L({
          fromObject: t,
          toObject: s,
          type: l < 0 || d < 0 ? "threeBreaks" : "twoBreaks"
        }, e);
      })
    ), this;
  }
}
class so {
  constructor(e) {
    this.basePoints = e;
  }
  value(e) {
    return this.basePoints.value(
      new z(e, (t) => {
        const s = {};
        t.forEach((i, r) => {
          const o = "" + i.points.at(0) + i.points.at(1);
          s[o] || (s[o] = []), s[o].push({
            arrowIndex: r,
            pointStartIndex: 0,
            breakPointStartIndex: 2,
            pointEndIndex: i.points.length - 2
          });
          const c = "" + i.points.at(-2) + i.points.at(-1);
          s[c] || (s[c] = []), s[c].push({
            arrowIndex: r,
            pointStartIndex: i.points.length - 2,
            breakPointStartIndex: i.points.length - 4,
            pointEndIndex: 0
          });
        }), L(s, e);
      })
    ), this;
  }
}
const Ne = 15;
class io {
  constructor(e) {
    $(this, "pointGroups");
    this.basePoints = e, this.pointGroups = new so(e);
  }
  value(e) {
    const t = new Ge();
    return this.pointGroups.value(new z(e, t.receiveKey("pointGroups"))), this.basePoints.value(new z(e, t.receiveKey("basePoints"))), t.result(
      new z(e, ({ pointGroups: s, basePoints: i }) => {
        Object.values(s).forEach((r) => {
          if (r.length <= 1)
            return;
          r.sort((a, h) => i[h.arrowIndex].points[h.pointEndIndex] - i[a.arrowIndex].points[a.pointEndIndex]);
          let o = 0, c = 0;
          r.forEach((a, h) => {
            const l = i[a.arrowIndex].points[a.pointStartIndex], d = i[a.arrowIndex].points[a.pointStartIndex + 1], p = i[a.arrowIndex].points[a.pointEndIndex], y = i[a.arrowIndex].points[a.pointEndIndex + 1], m = i[a.arrowIndex].points[a.breakPointStartIndex], x = i[a.arrowIndex].points[a.breakPointStartIndex + 1], v = l > m ? -1 : l < m ? 1 : 0, k = d > x ? -1 : d < x ? 1 : 0, B = l > p ? -1 : l < p ? 1 : 0, K = d > y ? -1 : d < y ? 1 : 0;
            if (v !== 0) {
              let H = 0;
              h !== 0 && (K > 0 ? (c += 1, H = c) : (o += 1, H = o)), K && (i[a.arrowIndex].points[a.pointStartIndex + 1] = i[a.arrowIndex].points[a.pointStartIndex + 1] + H * K * Ne), i[a.arrowIndex].points[a.breakPointStartIndex + 1] = i[a.arrowIndex].points[a.breakPointStartIndex + 1] + H * K * Ne;
            }
            if (k !== 0) {
              let H = 0;
              h !== 0 && (B > 0 ? (c += 1, H = c) : (o += 1, H = o)), i[a.arrowIndex].points[a.pointStartIndex] = i[a.arrowIndex].points[a.pointStartIndex] + H * B * Ne, i[a.arrowIndex].points[a.breakPointStartIndex] = i[a.arrowIndex].points[a.breakPointStartIndex] + H * B * Ne;
            }
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
        new z(e, (i) => {
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
    const t = new Ge(), s = new fe(), i = this.targetSourceFactory.create(
      s
    );
    return this.baseSource.value(
      new z(e, (r) => {
        let o = 0;
        const c = () => {
          r[o + 1] !== void 0 ? (o = o + 1, a()) : t.resultArray(e);
        };
        function a() {
          s.give(r[o]), i.value(t.receiveKey("" + o)), i.value(c);
        }
        r[o] !== void 0 ? a() : L([], e);
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
var ao = gs, co = ht, lo = "Expected a function";
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
const po = /* @__PURE__ */ ut(ho), { Arrow: fo } = de, mo = S.debug("MapObjectsArrows");
class go {
  constructor(e, t, s, i, r) {
    $(this, "previouslyRenderedArrows", /* @__PURE__ */ new Map());
    this.konvaLayer = e, this.mapFile = t, this.mapDep = s, this.arrowPath = i, this.factories = r, mo("draw arrows on canvas");
    const o = this.factories.chain.create();
    this.konvaLayer.layer(this.factories.patron.create(o.receiveKey("layer"))), this.mapFile.currentMap(this.factories.patron.create(o.receiveKey("map"))), this.mapDep.objects(this.factories.patron.create(o.receiveKey("objects"))), o.result(
      this.factories.patron.create(
        this.factories.guest.create(
          po(({ layer: c, map: a, objects: h }) => {
            const l = h.reduce((p, y) => (p[y.id] = y, p), {});
            new io(new ro(new Zr(
              new ye((p) => L(h, p)),
              new ye((p) => L(l, p))
            ), new oo((p) => {
              const y = new to(p);
              return new no([new eo(y), new Xr(y)]);
            }))).value((p) => {
              p.forEach((y) => {
                const m = y.key;
                if (this.previouslyRenderedArrows.has(m)) {
                  const v = this.previouslyRenderedArrows.get(m);
                  v.arrow.show(), v.arrow.points(y.points);
                  return;
                }
                const x = new fo({
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
                  arrow: x
                }), c.add(x);
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
const { Arrow: vo } = de, rt = S.debug("NewArrow"), Kt = {
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
    rt("start watch cursor"), this.cursorGuest.value(
      this.factories.guest.create((i) => {
        It(i);
      })
    );
    let t = null;
    const s = this.factories.patron.create(
      this.factories.guest.create((i) => {
        rt("cursor moves"), this.konvaLayer.layer(
          this.factories.guest.create((r) => {
            rt("cursor moves in layer"), this.arrowPath.breakPoints(
              {
                shapeGeometry: {
                  width: e.width,
                  height: e.height
                },
                shapePosition: {
                  x: e.position[0],
                  y: e.position[1]
                },
                lookToGeometry: Kt,
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
                shapeGeometry: Kt,
                shapePosition: i
              },
              this.factories.guest.create((o) => {
                if (t) {
                  t.points(o);
                  return;
                }
                t = new vo({
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
        It(e);
      })
    ), this.arrowCache.value(
      this.factories.guest.create((e) => {
        e.remove();
      })
    );
  }
}
const ke = S.debug("MapObjectBackground"), yo = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD//gATQ3JlYXRlZCB3aXRoIEdJTVD/4gKwSUNDX1BST0ZJTEUAAQEAAAKgbGNtcwQwAABtbnRyUkdCIFhZWiAH6AAMAAQADQAqAAthY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1kZXNjAAABIAAAAEBjcHJ0AAABYAAAADZ3dHB0AAABmAAAABRjaGFkAAABrAAAACxyWFlaAAAB2AAAABRiWFlaAAAB7AAAABRnWFlaAAACAAAAABRyVFJDAAACFAAAACBnVFJDAAACFAAAACBiVFJDAAACFAAAACBjaHJtAAACNAAAACRkbW5kAAACWAAAACRkbWRkAAACfAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACQAAAAcAEcASQBNAFAAIABiAHUAaQBsAHQALQBpAG4AIABzAFIARwBCbWx1YwAAAAAAAAABAAAADGVuVVMAAAAaAAAAHABQAHUAYgBsAGkAYwAgAEQAbwBtAGEAaQBuAABYWVogAAAAAAAA9tYAAQAAAADTLXNmMzIAAAAAAAEMQgAABd7///MlAAAHkwAA/ZD///uh///9ogAAA9wAAMBuWFlaIAAAAAAAAG+gAAA49QAAA5BYWVogAAAAAAAAJJ8AAA+EAAC2xFhZWiAAAAAAAABilwAAt4cAABjZcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltjaHJtAAAAAAADAAAAAKPXAABUfAAATM0AAJmaAAAmZwAAD1xtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAEcASQBNAFBtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEL/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAAeAB4DAREAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAwUEAAj/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAH1SCMTDaCMTiuCMTDgxDGf/8QAHhAAAgIBBQEAAAAAAAAAAAAAAAMBAgQFExUyMxL/2gAIAQEAAQUCG9TUPHdga2PndgzrxZQ3qah48gsvnUtHILMrKq5f/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAwEBPwEH/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAgEBPwEH/8QAHhAAAgIBBQEAAAAAAAAAAAAAAAECMXIQQUKSsVH/2gAIAQEABj8CFkvdFkVLqzla4v6VLqxXe60WS90WRUipWipCSTvc/8QAIxAAAgADCAMAAAAAAAAAAAAAAAEQUfAhMUGhscHR8RFhcf/aAAgBAQABPyErMkMi0ZW2wylmzHorbYSSX3Vg5wrMkMi0Z0a5FVK8Llg05nRrkRmteVg//9oADAMBAAIAAwAAABCCQQSCSST/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAEDAQE/EAf/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAECAQE/EAf/xAAeEAEAAQQCAwAAAAAAAAAAAAABIRARIDEAQVFxkf/aAAgBAQABPxDEMgTA4U0lpO6EwKiFh/YAyDIEAZSTdCnwUQAma0AtZOl88//Z";
class bo {
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
            ke("grid example", r), i.src = yo, i.onload = () => {
              ke("canvas pattern loaded"), ke("konva layer loaded");
              const o = new de.Rect({
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
const wo = S.debug("Breadcrumbs");
class Co {
  constructor(e, t, s) {
    this.parentNames = e, this.mapFile = t, this.factories = s;
  }
  list(e) {
    const t = this.factories.chain.create();
    return this.parentNames.names(this.factories.guestCast.create(e, t.receiveKey("names"))), this.mapFile.mapFile(this.factories.guestCast.create(e, t.receiveKey("mapFile"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ names: s, mapFile: i }) => {
        wo("map id", s, i), e.give(
          s.map((r) => {
            var o, c;
            return {
              title: ((c = (o = i[r]) == null ? void 0 : o.settings) == null ? void 0 : c.title) || "unknown",
              name: r
            };
          })
        );
      })
    ), e;
  }
}
const Gt = S.debug("CursorWithObjects");
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
        const r = i.find((o) => {
          const c = o.position[0], a = o.position[0] + o.width || 100, h = o.position[1], l = o.position[1] + o.height || 100;
          return s.x >= c && s.x <= a && s.y >= h && s.y <= l;
        });
        r ? (Gt("crossed with", r), e.give({
          x: r.position[0] + r.width / 2,
          y: r.position[1] + r.height / 2
        })) : (Gt("cursor pos", s), e.give(s));
      })
    ), this;
  }
}
class _o {
  constructor(e, t = 768) {
    this.windowWidth = e, this.mobileLimit = t;
  }
  value(e) {
    return this.windowWidth.value(
      new z(e, (t) => {
        L({
          isMobile: t <= this.mobileLimit,
          isDesktop: t > this.mobileLimit
        }, e);
      })
    ), this;
  }
}
const qt = S.debug("Drawer");
class $o {
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
class ko {
  value(e) {
    typeof performance > "u" && e.give(0);
    const t = 10;
    let s = performance.now(), i = 0;
    const r = () => requestAnimationFrame(() => {
      if (i += 1, i >= t) {
        const o = performance.now(), c = o - s;
        e.give(Math.round(1e3 / (c / i))), s = o, i = 0;
      }
      r();
    });
    return r(), e;
  }
}
class Fo {
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
const Yt = S.debug("app:MiniMap"), Jt = 130;
class Mo {
  constructor(e, t, s, i) {
    $(this, "theSize");
    $(this, "thePoints");
    $(this, "viewportSizeCache");
    this.map = e, this.layer = t, this.stageSize = s, this.factories = i, this.theSize = i.sourceEmpty.create(), this.thePoints = i.sourceEmpty.create(), this.viewportSizeCache = i.sourceEmpty.create();
    const r = i.chain.create();
    e.objects(i.patron.create(r.receiveKey("objects"))), t.layer(i.patron.create(r.receiveKey("layer"))), s.value(i.patron.create(r.receiveKey("size"))), r.result(
      i.patron.create(
        i.guest.create(({ layer: o, size: c, objects: a }) => {
          const h = Jt / c.width, l = {
            width: Math.round(o.width() * h),
            height: Math.round(o.height() * h)
          };
          this.viewportSizeCache.give(l);
          const d = {
            width: Math.round(c.width * h),
            height: Math.round(c.height * h)
          };
          this.theSize.give(d);
          const p = a.map((y) => ({
            id: y.id,
            x: Math.round(y.position[0] * h),
            y: Math.round(y.position[1] * h),
            width: Math.round(y.width * h),
            height: Math.round(y.height * h)
          }));
          Yt("minimap points", p), this.thePoints.give(p);
        })
      )
    );
  }
  viewportPosition(e) {
    const t = this.factories.chain.create();
    return this.stageSize.value(this.factories.guestCast.create(e, t.receiveKey("size"))), this.layer.position(this.factories.guestCast.create(e, t.receiveKey("position"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ size: s, position: i }) => {
        const r = Jt / s.width, o = {
          x: i.x * r * -1,
          y: i.y * r * -1
        };
        Yt("scaled position is", o), e.give(o);
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
const Zt = S.debug("Modal");
class So {
  constructor(e, t) {
    $(this, "modalNameCache");
    this.keyboard = e, this.factories = t, Zt("modal created"), this.modalNameCache = t.cache.create(""), this.keyboard.pressed(
      this.factories.patron.create(
        this.factories.guest.create((s) => {
          Zt("new key in modal", s), s === "Escape" && this.give("");
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
const Fe = S.debug("ObjectGeometryFix");
class Io {
  constructor(e, t, s, i) {
    $(this, "innerReceive");
    this.mapFile = t, this.map = s, this.factories = i, e.objects(i.patron.create(this)), this.innerReceive = Ce((r) => {
      this.mapFile.currentMap(
        this.factories.guest.create((o) => {
          Fe("objects to fix", r);
          const c = document.querySelectorAll(".objects-container .rendered-object"), a = o.objects;
          let h = !1;
          c.forEach((l) => {
            const d = l.getAttribute("data-object-id");
            if (Fe("i see id", d), !d)
              return;
            const p = a[d];
            if (p && (Fe("dom object geometry", l.clientWidth, l.clientHeight), Fe("saved object geometry", p.width, p.height), (p.width !== l.clientWidth || p.height !== l.clientHeight) && (h = !0, Fe("update object geometry"), p.width = l.clientWidth, p.height = l.clientHeight), !p.width || !p.height)) {
              const y = o.types[p.type];
              p.width = y.width, p.height = y.height;
            }
          }), h && this.map.give({
            ...o,
            objects: a
          });
        })
      );
    }, 500);
  }
  give(e) {
    return this.innerReceive(e), this;
  }
}
const Me = S.debug("MapObjectsRectsPatron");
class jo {
  constructor(e, t, s, i, r, o, c, a, h) {
    $(this, "previouslyRenderedRects", /* @__PURE__ */ new Map());
    this.konvaLayer = e, this.mapFile = t, this.mapObject = s, this.mapObjectCurrent = r, this.mapObjectForRendering = o, this.objectPosition = c, this.settings = a, this.factories = h, i.objects(this);
  }
  give(e) {
    return this.konvaLayer.layer(
      this.factories.patronOnce.create(
        this.factories.guest.create((t) => {
          const s = this.factories.chain.create();
          this.mapFile.currentMap(s.receiveKey("map")), this.settings.value(s.receiveKey("settings")), s.result(
            this.factories.guest.create((i) => {
              const { map: r, settings: o } = i;
              Me("rerender object rects"), this.previouslyRenderedRects.forEach((c) => {
                c.hide();
              }), e.forEach((c) => {
                const a = r.types[c.type], h = +c.width || +a.width || 100, l = +c.height || +a.height || 100;
                if (this.previouslyRenderedRects.has(c)) {
                  const p = this.previouslyRenderedRects.get(c);
                  p.width(h), p.height(l), p.x(+c.position[0]), p.y(+c.position[1]), p.show();
                  return;
                }
                Me("rect object", c, a);
                const d = new de.Rect({
                  x: +c.position[0],
                  y: +c.position[1],
                  width: h,
                  height: l,
                  name: c.id,
                  draggable: !o.readonly,
                  objectId: c.id,
                  zIndex: 3
                });
                this.previouslyRenderedRects.set(c, d), t.add(d), d.on("mouseenter", () => {
                  t.getStage().container().style.cursor = "pointer";
                }), d.on("mouseleave", () => {
                  t.getStage().container().style.cursor = "default";
                }), d.on("dragend", () => {
                  Me("drag ended"), this.objectPosition.position(
                    c,
                    {
                      x: d.x(),
                      y: d.y()
                    },
                    this.factories.guest.create((p) => {
                      this.mapObject.give({
                        ...c,
                        position: [p.x, p.y]
                      });
                    })
                  );
                }), d.on("dragmove", () => {
                  Me("dragmove works", d.x(), d.y()), t.getStage().container().style.cursor = "move", this.objectPosition.position(
                    c,
                    {
                      x: d.x(),
                      y: d.y()
                    },
                    this.factories.guest.create((p) => {
                      this.mapObjectForRendering.give({
                        ...c,
                        position: [p.x, p.y]
                      });
                    })
                  );
                }), d.on("click", () => {
                  Me("object clicked with id", c.id), this.mapObjectCurrent.give(c.id);
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
          this.factories.guest.create((r) => {
            const o = r.getBoundingClientRect();
            this.konvaLayer.layer(
              this.factories.guest.create((c) => {
                c.getStage().width(i.contentRect.width - o.left), c.getStage().height(i.contentRect.height - o.top), this.canvas.give(r), this.konvaLayer.give(c);
              })
            );
          })
        );
      });
    }), t = document.querySelector("body");
    return t && e.observe(t), this;
  }
}
const Oo = S.debug("StagePosition");
class Po {
  constructor(e) {
    this.stageMove = e;
  }
  give(e) {
    return Oo("received position", e), this.stageMove.move(e), this;
  }
}
class Eo {
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
class Do {
  constructor() {
    $(this, "source", new we({
      height: window.innerHeight,
      width: window.innerWidth
    }));
    const e = new ResizeObserver((s) => {
      requestAnimationFrame(() => {
        this.source.give({
          height: window.innerHeight,
          width: window.innerWidth
        });
      });
    }), t = document.querySelector("body");
    t && e.observe(t);
  }
  value(e) {
    return this.source.value(e), this;
  }
}
const Xt = S.debug("Zindex");
class Ho {
  constructor(e) {
    $(this, "fnsCache");
    this.factories = e, this.fnsCache = e.cache.create([]), this.fnsCache.value(
      e.patron.create(
        e.guest.create(
          Ce((t) => {
            Xt("zindex fns run"), t.forEach((s) => s());
          }, 50)
        )
      )
    );
  }
  give(e) {
    return Xt("zindex received value"), this.fnsCache.value(
      this.factories.guest.create((t) => {
        this.fnsCache.give(t.concat(e));
      })
    ), this;
  }
}
const es = S.debug("app:BrowserCanvas");
class Ro {
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
        es("canvas size", s, i), e.give({
          height: i,
          width: s
        });
      })
    ), this;
  }
  give(e) {
    return es("receive new canvas", e), this.canvasCache.give(e), this;
  }
}
const No = S.debug("Cursor");
class Vo {
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
      No("move cursor fired", r), this.cursorPool.give(r);
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
class Uo {
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
const Ve = S.debug("ControlCombo");
class zo {
  constructor(e, t) {
    this.keyboard = e, this.factories = t;
  }
  /**
   * Случилась комбинация ctrl + keyCode
   */
  happened(e, t) {
    this.keyboard.event(
      this.factories.guestInTheMiddle.create(t, (s) => {
        Ve("combo happened look for key", e, "received", s.code), s.ctrlKey && s.code === e && s.type === "keydown" && (s.preventDefault(), t.give(s));
      })
    );
  }
  /**
   * Случилась комбинация ctrl + keyCode с условием comboCondition
   */
  happenedConditional(e, t, s) {
    Ve("combo control happened registration"), this.keyboard.event(
      this.factories.guestInTheMiddle.create(s, (i) => {
        Ve("keyboard event come"), t.value(
          this.factories.guest.create((r) => {
            Ve("combo happened look for key", e, "received", i.code), r && i.ctrlKey && i.code === e && i.type === "keydown" && (i.preventDefault(), s.give(i));
          })
        );
      })
    );
  }
}
const Se = S.debug("Keyboard");
class Lo {
  constructor(e) {
    $(this, "pressedPool");
    $(this, "combinationsPool");
    Se("keyboard created"), this.pressedPool = e.pool.create(this), this.combinationsPool = e.pool.create(this), window == null || window.addEventListener("keyup", (t) => {
      Se("keyboard pressed", t.key), this.pressedPool.give(t.key);
    }), Es({
      passive: !1,
      onEventFired: (t) => {
        Se("magic combination happens 11", t.ctrlKey, t.key), this.combinationsPool.give(t);
      }
    });
  }
  pressed(e) {
    return Se("keyboard receive pressed subscriber"), this.pressedPool.add(e), this;
  }
  event(e) {
    return Se("keyboard receive combination subscriber"), this.combinationsPool.add(e), this;
  }
}
const ts = S.debug("app:konva:KonvaLayer");
class Qo {
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
          ts("create new konva stage");
          const o = new de.Stage({
            width: r.clientWidth,
            height: r.clientHeight,
            container: r,
            fill: "#ffeeee",
            draggable: !0
          }), c = new de.Layer();
          o.add(c), c.draw(), this.layerCache.give(c), o.on("dragend", (h) => {
            if (!(h.target instanceof de.Stage))
              return;
            const l = {
              x: o.x(),
              y: o.y()
            };
            ts("new position", l), this.positionCache.give(l);
          }), o.on("dragmove", (h) => {
            if (!(h.target instanceof de.Stage))
              return;
            const l = {
              x: o.x(),
              y: o.y()
            };
            this.positionCache.give(l);
          });
          const a = this.factories.guestSync.create({
            x: 0,
            y: 0
          });
          o.dragBoundFunc((h) => (s.position(h, a), a.value()));
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
class Wo {
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
const Ko = S.debug("position");
class Go {
  constructor(e, t, s, i, r) {
    this.layer = e, this.canvas = t, this.stageSize = s, this.stageMoveRestriction = i, this.factories = r;
  }
  move(e) {
    Ko("move stage to new point", e.position), this.stageSize.value(
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
                  this.factories.guest.create((c) => {
                    s.getStage().position(c), setTimeout(() => {
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
const _ = J(), qe = new Lo(_), vs = new we({
  readonly: !1,
  presets: {}
}), qo = new So(qe, _), As = new $o(qe, _), Ye = new To(_), ue = new hn(_), ys = _.sourceEmpty.create(), V = new gn(ys, ue, _), Yo = new pn(V), Jo = new ni(Yo), pt = new An(V, ue, _), ft = new ds(pt, ue, _), Zo = new hs(ft, pt, _), se = new ds(V, ue, _), Xo = new ye((n) => {
  V.currentMap(new Le(n));
}), Je = new yn(As, _), ea = new Pr(_), ta = new Or(V, se, _), me = new Ro(_), ge = new Qr(), bs = new Wr(me, ge, _), ie = new Qo(me, ge, bs, _), sa = new Ho(_), ia = new bo(ie, V, sa, _), xe = new hs(se, V, _), na = new _n(
  se,
  V,
  [new dt(Ye, new bn(V, _), _)],
  _
), ra = new Wo(ie, _), oa = new wn(se, xe, me, ra, _), ws = new Nr(V, _), Cs = new Hr(
  se,
  V,
  [
    new dt(
      Ye,
      new Vr(ws, _),
      _
    )
  ],
  _
), aa = new Dr(
  se,
  V,
  [new dt(Ye, ws, _)],
  _
), ca = new Er(Cs), Ze = new Kr(ie, me, pt, _), la = new Io(
  Ze,
  V,
  se,
  _
), ua = new jo(
  ie,
  V,
  xe,
  Ze,
  Je,
  Zo,
  new Ir(new Tr(ge, _), _),
  vs,
  _
), da = new Vo(ie, _), ha = new xo(Ze, da, _), xs = new Jr(), _s = new Ao(ie, ha, xs, _), pa = new go(ie, V, ft, xs, _), fa = new Mo(ft, ie, ge, _), ma = new kn(
  Je,
  se,
  xe,
  _s,
  _
), ga = new Bo(V, me, ie, _), va = new Yr(
  Je,
  V,
  xe,
  _
), Aa = new mn(V, ue, _), ya = new xn(xe), ba = new ko(), mt = new Cn(ue, _), wa = new Co(mt, V, _), Ca = new Fr(ue, _), xa = new Ur(mt, V, _), _a = new zo(qe, _), $a = new Fo(V, _), $s = new Go(ie, me, ge, bs, _), ka = new Po($s), Fa = new Eo($s, _), Ma = new zr(se, _), Sa = new fn(V, se, ue, _), Ta = new Br(se, ge, ie, _), ks = new fe();
new Uo(ks);
const Ia = new Do(), ja = new ye((n) => {
  Ia.value(
    new z(n, (e) => {
      L(e.width, n);
    })
  );
}), Ba = new _o(ja), Oa = {
  mapCurrentID: ue,
  mapFile: V,
  mapCurrent: se,
  mapCurrentSource: Xo,
  mapRemoved: Aa,
  mapSettings: ta,
  mapObject: xe,
  mapObjectRemoved: na,
  mapType: Cs,
  mapTypeRemoved: aa,
  mapTypeNew: ca,
  mapObjectsVisible: Ze,
  mapObjectCurrent: Je,
  mapObjectNew: oa,
  mapObjectsLink: ma,
  mapTypeCurrent: ea,
  mapRects: ua,
  mapBackground: ia,
  mapObjectArrows: pa,
  mapObjectsGeometryFix: la,
  canvas: me,
  miniMap: fa,
  notification: Ye,
  modal: qo,
  drawer: As,
  konvaLayer: ie,
  resizing: ga,
  objectAdditionalFieldsFix: va,
  mapObjectRelationRemoved: ya,
  fps: ba,
  breadcrumbs: wa,
  mapObjectUrl: Ca,
  keyboard: qe,
  parentNames: mt,
  parentTypes: xa,
  controlCombo: _a,
  menu: $a,
  stagePosition: ka,
  stagePositionByObjectId: Fa,
  objectsMatchedToQuery: Ma,
  stageSize: ge,
  mapHistory: Sa,
  fileContent: ys,
  newArrow: _s,
  objectsOutsideScreen: Ta,
  settings: vs,
  documentTitle: Jo,
  sidebarDraggable: ks,
  device: Ba
}, Q = () => Oa;
class I {
  constructor(e = void 0) {
    $(this, "innerRef");
    this.innerRef = ee(e);
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
const Pa = { key: 0 }, Ea = { class: "flex-grow overflow-y-auto" }, Da = {
  key: 1,
  class: "flex gap-1"
}, gt = /* @__PURE__ */ P({
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
    const t = n, s = e, i = Ie(() => ["e2e-drawer-back absolute z-10 top-0 left-0 w-full h-full bg-black/50"]), r = {
      ltr: "top-0 left-0 w-[50%] max-w-[900px] ",
      rtl: "top-0 right-0 w-[50%] max-w-[900px] ",
      ttb: "top-0 right-0 left-0",
      btt: "top-auto h-[900px] max-h-[50%] bottom-0 right-0 left-0"
    }, { drawer: o } = Q(), c = () => {
      o.give(""), s("close");
    }, a = o.isOpenedByName(t.name, new I()).ref();
    return (h, l) => (f(), U(ns, { name: "fade" }, {
      default: w(() => [
        u(a) ? (f(), A("div", {
          key: 0,
          class: ne(i.value),
          onClick: c
        }, [
          b("div", {
            class: ne(["absolute bg-white h-full p-3 flex flex-col overflow-hidden", r[n.direction]]),
            onClick: l[0] || (l[0] = be(() => {
            }, ["stop"]))
          }, [
            h.$slots.header ? (f(), A("div", Pa, [
              te(h.$slots, "header", { class: "BaseDrawer-Header" })
            ])) : T("", !0),
            b("div", Ea, [
              te(h.$slots, "default")
            ]),
            h.$slots.footer ? (f(), A("div", Da, [
              te(h.$slots, "footer")
            ])) : T("", !0)
          ], 2)
        ], 2)) : T("", !0)
      ]),
      _: 3
    }));
  }
}), Y = /* @__PURE__ */ P({
  __name: "BaseIcon",
  props: {
    icon: {
      type: String
    }
  },
  setup(n) {
    const e = {
      "fa-bars": Xs,
      "fa-text-width": Zs,
      "fa-search": Js,
      "fa-history": Ys,
      "fa-plus-square": qs,
      "fa-cog": Gs,
      "fa-file-text": Ks,
      "fa-rotate-left": Ws,
      "fa-rotate-right": Qs,
      "fa-map": Ls,
      "fa-close": zs,
      "fa-arrow-left": Us,
      "fa-arrow-right": Vs,
      "fa-arrow-down": Ns,
      "fa-arrow-up": Rs
    };
    return (t, s) => (f(), U(u(Hs), {
      icon: e[n.icon]
    }, null, 8, ["icon"]));
  }
}), Ha = /* @__PURE__ */ b("h2", { class: "text-lg font-bold" }, " Карты в файле ", -1), Ra = ["onClick"], Na = /* @__PURE__ */ P({
  __name: "AppFileMaps",
  setup(n) {
    const {
      mapFile: e,
      mapCurrentID: t,
      drawer: s,
      mapRemoved: i
    } = Q(), r = e.mapFile(new I()).ref(), o = t.id(new I()).ref(), c = (a) => {
      confirm("Вы уверены?") && i.give(a);
    };
    return (a, h) => (f(), U(gt, {
      direction: "rtl",
      name: "fileMaps"
    }, {
      header: w(() => [
        Ha
      ]),
      default: w(() => [
        b("div", null, [
          (f(!0), A(W, null, G(u(r), (l, d) => (f(), A("div", {
            key: d,
            class: "flex items-center gap-2"
          }, [
            b("a", {
              href: "#",
              class: ne({ "font-bold": u(o) === d }),
              onClick: be((p) => {
                u(t).give(d), u(s).give("");
              }, ["prevent"])
            }, C(l.settings.title), 11, Ra),
            g(Y, {
              onClick: (p) => c(d),
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
}), Va = { class: "AppMenuObject" }, Ua = {
  key: 0,
  class: "AppMenuObject-Empty"
}, za = {
  key: 1,
  class: "flex flex-col gap-1"
}, La = ["onClick"], Qa = ["innerHTML"], Wa = /* @__PURE__ */ P({
  __name: "AppMenuObject",
  setup(n) {
    const {
      controlCombo: e,
      drawer: t,
      menu: s,
      stagePosition: i
    } = Q(), { guest: r, patron: o } = J(), c = s.menuObjects(new I()).ref();
    return e.happened(
      "KeyM",
      o.create(r.create(() => {
        t.give("menu");
      }))
    ), (a, h) => (f(), U(gt, {
      direction: "rtl",
      name: "menu"
    }, {
      default: w(() => [
        b("div", Va, [
          u(c).length ? (f(), A("div", za, [
            (f(!0), A(W, null, G(u(c), (l) => (f(), A("a", {
              key: l.id,
              class: "AppMenuObject-Item",
              href: "#",
              onClick: be((d) => {
                u(i).give(l), u(t).give("");
              }, ["prevent"])
            }, [
              b("span", {
                innerHTML: l.additionalName ? l.additionalName : l.name
              }, null, 8, Qa)
            ], 8, La))), 128))
          ])) : (f(), A("div", Ua, C(a.$t("appMenuObject.noItems")), 1))
        ])
      ]),
      _: 1
    }));
  }
}), D = /* @__PURE__ */ P({
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
      class: ne(t)
    }, [
      te(s.$slots, "default")
    ]));
  }
}), Ka = {
  key: 0,
  title: "Назад",
  class: "absolute text-white left-0 top-0 -ml-5 flex justify-center items-center bg-primary/70 hover:bg-primary-second/70 cursor-pointer w-5"
}, Ga = {
  key: 1,
  class: "BaseModal-Header"
}, qa = { class: "overflow-y-auto flex-grow" }, Ya = {
  key: 2,
  class: "BaseModal-Footer"
}, ve = /* @__PURE__ */ P({
  __name: "BaseModal",
  props: {
    name: {
      type: String,
      required: !0
    }
  },
  setup(n) {
    const { modal: e } = Q(), t = n, s = e.isOpenedByName(t.name, new I()).ref(), i = [], r = () => {
      e.give("");
    };
    return (o, c) => (f(), U(ns, { name: "fade" }, {
      default: w(() => [
        u(s) ? (f(), A("div", {
          key: 0,
          class: "absolute rounded-main overflow-y-auto flex justify-center items-center top-0 left-0 bg-black/10 z-20 h-full w-full",
          onClick: r
        }, [
          b("div", {
            class: "w-full relative flex flex-col max-w-[800px] max-h-[90%] bg-white p-3",
            onClick: c[0] || (c[0] = be(() => {
            }, ["stop"]))
          }, [
            i.length > 1 ? (f(), A("div", Ka, " < ")) : T("", !0),
            b("div", {
              title: "Закрыть",
              class: "e2e-modal-close absolute text-white right-0 top-0 -mr-5 flex justify-center items-center bg-danger/70 hover:bg-danger-second/70 cursor-pointer w-5",
              onClick: r
            }, " × "),
            o.$slots.header ? (f(), A("div", Ga, [
              te(o.$slots, "header")
            ])) : T("", !0),
            b("div", qa, [
              te(o.$slots, "default")
            ]),
            o.$slots.footer ? (f(), A("div", Ya, [
              te(o.$slots, "footer")
            ])) : T("", !0)
          ])
        ])) : T("", !0)
      ]),
      _: 3
    }));
  }
}), Ja = { class: "AppPresets" }, Za = /* @__PURE__ */ b("div", { class: "text-md font-bold mb-2" }, "Общие", -1), Xa = { class: "flex flex-col gap-2" }, ec = { class: "text-md font-bold mb-1" }, tc = { class: "flex gap-2 flex-wrap items-end" }, sc = { class: "AppTypesParent-ItemTitle" }, ic = ["innerHTML"], nc = /* @__PURE__ */ P({
  __name: "AppPresets",
  setup(n) {
    const {
      svgMapTypeImage: e
    } = J(), { mapType: t, settings: s } = Q(), i = new I();
    s.value(i);
    const r = Ie(
      () => Object.fromEntries(
        Object.entries(i.value.presets).map(
          ([o, c]) => [
            o,
            c.map(
              (a) => ({
                preset: a,
                image: e.create(a).markup()
              })
            )
          ]
        )
      )
    );
    return (o, c) => (f(), U(ve, { name: "presets" }, {
      default: w(() => [
        b("div", Ja, [
          Za,
          b("div", Xa, [
            (f(!0), A(W, null, G(r.value, (a, h) => (f(), A("div", { key: h }, [
              b("h3", ec, C(h), 1),
              b("div", tc, [
                (f(!0), A(W, null, G(a, (l) => (f(), A("div", {
                  key: l.preset.name,
                  class: "flex flex-col gap-2"
                }, [
                  b("div", sc, C(l.preset.name), 1),
                  b("div", {
                    class: "AppTypesParent-ItemImage",
                    innerHTML: l.image,
                    style: ce(`width:${l.preset.width}px;height:${l.preset.height}px`)
                  }, null, 12, ic),
                  g(D, {
                    class: "AppTypesParent-ItemButton e2e-add-preset-type",
                    type: "success",
                    size: "sm",
                    onClick: (d) => u(t).give({ name: l.preset.name, type: l.preset })
                  }, {
                    default: w(() => [
                      O(C(o.$t("general.addToMap")), 1)
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
}), ae = /* @__PURE__ */ P({
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
    const t = n, s = e, i = ee(null);
    je(
      i,
      Ce(() => {
        t.autofocus && i.value.focus();
      }, 500)
    );
    const r = We(t, "modelValue", s);
    return (o, c) => Qe((f(), A("input", {
      ref_key: "input",
      ref: i,
      "onUpdate:modelValue": c[0] || (c[0] = (a) => Be(r) ? r.value = a : null),
      class: "block rounded-main w-full p-2 border border-solid border-body-dark",
      type: "text"
    }, null, 512)), [
      [rs, u(r)]
    ]);
  }
});
class vt {
  constructor(e) {
    $(this, "pool", new Ke(this));
    this.refSource = e, je(
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
const rc = { class: "AppSearch" }, oc = {
  key: 0,
  class: "AppSearch-Items"
}, ac = ["onClick"], cc = ["innerHTML"], lc = ["innerHTML"], uc = ["innerHTML"], dc = { key: 1 }, hc = { key: 2 }, pc = /* @__PURE__ */ P({
  __name: "AppSearch",
  setup(n) {
    const {
      objectsMatchedToQuery: e,
      controlCombo: t,
      modal: s,
      stagePosition: i
    } = Q(), { guest: r, patron: o } = J(), c = ee(), a = S.debug("app:AppSearch");
    s.isOpenedByName(
      "search",
      o.create(r.create((d) => {
        setTimeout(() => {
          d && c.value && (a("search is opened", d), c.value.$el.focus());
        }, 500);
      }))
    );
    const h = ee(""), l = e.objects(
      new vt(h),
      new I([])
    ).ref();
    return t.happened(
      "KeyF",
      o.create(r.create(() => {
        s.give("search");
      }))
    ), (d, p) => (f(), U(ve, { name: "search" }, {
      default: w(() => [
        b("div", rc, [
          g(ae, {
            ref_key: "inputRef",
            ref: c,
            modelValue: h.value,
            "onUpdate:modelValue": p[0] || (p[0] = (y) => h.value = y),
            class: "mb-2 e2e-query-input",
            placeholder: d.$t("general.specifyQuery")
          }, null, 8, ["modelValue", "placeholder"]),
          u(l).length ? (f(), A("div", oc, [
            (f(!0), A(W, null, G(u(l), (y) => (f(), A("div", {
              key: y.name,
              class: "cursor-pointer",
              onClick: be((m) => {
                u(i).give(y), u(s).give("");
              }, ["prevent"])
            }, [
              b("b", {
                class: "AppSearch-ItemName",
                innerHTML: y.name
              }, null, 8, cc),
              y.additionalName ? (f(), A("b", {
                key: 0,
                class: "AppSearch-ItemName",
                innerHTML: y.additionalName
              }, null, 8, lc)) : T("", !0),
              y.additionalFields ? (f(), A("div", {
                key: 1,
                innerHTML: Object.values(y.additionalFields).join(" ")
              }, null, 8, uc)) : T("", !0)
            ], 8, ac))), 128))
          ])) : h.value ? (f(), A("div", dc, C(d.$t("general.noResults")), 1)) : (f(), A("div", hc, C(d.$t("general.resultsWillBeHere")), 1))
        ])
      ]),
      _: 1
    }));
  }
}), fc = { class: "AppTypes" }, mc = /* @__PURE__ */ b("div", { class: "text-md font-bold mb-2" }, "Родительские типы", -1), gc = { class: "flex gap-2 items-end" }, vc = { class: "AppTypesParent-ItemTitle" }, Ac = ["innerHTML"], yc = /* @__PURE__ */ P({
  __name: "AppTypesParent",
  setup(n) {
    const { parentTypes: e, mapType: t } = Q(), { svgMapTypeImage: s } = J(), i = e.types(new I()).ref(), r = Ie(() => {
      var o;
      return (o = i.value) == null ? void 0 : o.map((c) => ({
        type: c,
        image: s.create(c).markup()
      })).sort((c, a) => +(c.type.name >= a.type.name));
    });
    return (o, c) => (f(), U(ve, { name: "parentTypes" }, {
      default: w(() => [
        b("div", fc, [
          mc,
          b("div", gc, [
            (f(!0), A(W, null, G(r.value, (a) => (f(), A("div", {
              key: a.type.name,
              class: "flex flex-col gap-2"
            }, [
              b("div", vc, C(a.type.name), 1),
              b("div", {
                class: "AppTypesParent-ItemImage",
                innerHTML: a.image,
                style: ce(`width:${a.type.width}px;height:${a.type.height}px`)
              }, null, 12, Ac),
              g(D, {
                class: "AppTypesParent-ItemButton e2e-add-preset-type",
                type: "success",
                size: "sm",
                onClick: (h) => u(t).give({ name: a.type.name, type: a.type })
              }, {
                default: w(() => [
                  O(C(o.$t("general.addToMap")), 1)
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
class Fs {
  constructor(e, t = void 0) {
    $(this, "innerRef");
    this.executor = e, this.innerRef = ee(t);
  }
  ref() {
    return this.executor(this.innerRef), this.innerRef;
  }
}
const bc = { class: "flex gap-2" }, ot = /* @__PURE__ */ P({
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
    const i = We(n, "modelValue", e);
    return (r, o) => (f(), A("label", bc, [
      Qe(b("input", {
        "onUpdate:modelValue": o[0] || (o[0] = (c) => Be(i) ? i.value = c : null),
        type: "checkbox"
      }, null, 512), [
        [Is, u(i)]
      ]),
      r.$slots.default ? te(r.$slots, "default", { key: 0 }) : (f(), A(W, { key: 1 }, [
        O(C(n.label), 1)
      ], 64))
    ]));
  }
}), Oe = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [s, i] of e)
    t[s] = i;
  return t;
}, wc = {}, Cc = { class: "text-sm font-bold" };
function xc(n, e) {
  return f(), A("div", Cc, [
    te(n.$slots, "default")
  ]);
}
const q = /* @__PURE__ */ Oe(wc, [["render", xc]]), _c = {}, $c = { class: "mb-2" };
function kc(n, e) {
  return f(), A("div", $c, [
    te(n.$slots, "default")
  ]);
}
const X = /* @__PURE__ */ Oe(_c, [["render", kc]]), Fc = { class: "rounded-main p-2 border border-solid border-body-dark" }, Mc = { class: "flex gap-2 p-2 bg-white border border-solid border-body-dark rounded-main" }, Ue = /* @__PURE__ */ P({
  __name: "BaseEditor",
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = n, s = e, i = ei({
      content: t.modelValue,
      extensions: [
        ii
      ],
      onUpdate: () => {
        i.value && s("update:modelValue", i.value.getHTML());
      }
    });
    return js(() => {
      var r;
      (r = i.value) == null || r.destroy();
    }), je(() => t.modelValue, (r) => {
      !i.value || i.value.getHTML() === r || i.value.commands.setContent(r, !1);
    }), (r, o) => (f(), A("div", Fc, [
      g(u(ti), { editor: u(i) }, null, 8, ["editor"]),
      u(i) ? (f(), U(u(si), {
        key: 0,
        editor: u(i),
        "tippy-options": { duration: 100 }
      }, {
        default: w(() => [
          b("div", Mc, [
            b("button", {
              onClick: o[0] || (o[0] = (c) => u(i).chain().focus().toggleBold().run()),
              class: ne({ "font-bold": u(i).isActive("bold") })
            }, " bold ", 2),
            b("button", {
              onClick: o[1] || (o[1] = (c) => u(i).chain().focus().toggleItalic().run()),
              class: ne({ "font-bold": u(i).isActive("italic") })
            }, " italic ", 2),
            b("button", {
              onClick: o[2] || (o[2] = (c) => u(i).chain().focus().toggleStrike().run()),
              class: ne({ "font-bold": u(i).isActive("strike") })
            }, " strike ", 2)
          ])
        ]),
        _: 1
      }, 8, ["editor"])) : T("", !0)
    ]));
  }
}), Sc = ["value"], Tc = /* @__PURE__ */ P({
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
    const t = n, i = We(t, "modelValue", e);
    return (r, o) => Qe((f(), A("select", {
      label: "select",
      "onUpdate:modelValue": o[0] || (o[0] = (c) => Be(i) ? i.value = c : null),
      class: "block bg-white rounded-main w-full p-2 border border-solid border-body-dark"
    }, [
      (f(!0), A(W, null, G(t.items, (c) => (f(), A("option", {
        key: c[t.optionId],
        value: c[t.optionId]
      }, C(c[t.optionLabel]), 9, Sc))), 128))
    ], 512)), [
      [Bs, u(i)]
    ]);
  }
}), Ic = { class: "text-lg font-bold" }, jc = {
  key: 0,
  class: "flex gap-2 items-center"
}, Bc = {
  key: 1,
  class: "flex gap-2 mt-2"
}, Oc = { key: 0 }, Pc = { key: 1 }, Ec = {
  key: 0,
  class: "flex flex-col gap-2"
}, Dc = { class: "FormObject-Inner" }, Hc = { class: "FormObject-Row" }, Rc = { class: "FormObject-Row" }, Nc = { class: "FormObject-Row" }, Vc = { class: "my-2" }, Uc = { class: "FormObject-Title" }, zc = { class: "FormObject-Row" }, Lc = { class: "FormObject-Title" }, Qc = { class: "FormObject-Row" }, Wc = {
  key: 0,
  class: "FormObject-ArrowName"
}, Kc = { class: "py-3 flex gap-1" }, Gc = /* @__PURE__ */ P({
  __name: "FormObject",
  setup(n) {
    const e = ls("FormObject"), {
      mapObjectCurrent: t,
      mapFile: s,
      mapObject: i,
      mapCurrent: r,
      drawer: o,
      mapObjectRemoved: c,
      mapObjectRelationRemoved: a,
      mapObjectUrl: h,
      controlCombo: l
    } = Q(), {
      patron: d,
      chain: p,
      guest: y
    } = J(), m = new Fs(() => {
      const j = p.create();
      t.objectId(d.create(j.receiveKey("objectId"))), s.currentMap(d.create(j.receiveKey("map"))), j.result(d.create(
        y.create(({ map: M, objectId: F }) => {
          e("object opened", F), m.value = M.objects[F];
        })
      ));
    }).ref(), x = r.types(new I()).ref(), v = s.currentMap(new I()).ref(), k = new vt(m), B = h.url(k, new I()).ref(), K = () => {
      t.give(""), o.give("");
    }, H = () => {
      c.give(m.value), K();
    }, re = () => {
      i.give({
        ...m.value,
        outlink: m.value.outlink || B.value
      }), K();
    }, E = (j) => {
      a.give({
        index: j,
        object: m.value
      });
    };
    return l.happenedConditional(
      "KeyS",
      o.openedByName("object"),
      d.create(y.create(re))
    ), (j, M) => (f(), U(gt, {
      name: "object",
      onClose: K
    }, {
      header: w(() => [
        b("h2", Ic, C(j.$t("general.mapObject")), 1),
        u(m) ? (f(), A("small", jc, [
          b("span", null, " ID #" + C(u(m).id), 1)
        ])) : T("", !0),
        u(m) ? (f(), A("div", Bc, [
          u(m).createTimestamp ? (f(), A("div", Oc, " Создан: " + C(new Date(u(m).createTimestamp).toLocaleString()), 1)) : T("", !0),
          u(m).changeTimestamp ? (f(), A("div", Pc, " Изменен: " + C(new Date(u(m).changeTimestamp).toLocaleString()), 1)) : T("", !0)
        ])) : T("", !0)
      ]),
      footer: w(() => [
        b("div", Kc, [
          g(D, {
            type: "success",
            onClick: re
          }, {
            default: w(() => [
              O(C(j.$t("general.save")), 1)
            ]),
            _: 1
          }),
          g(D, {
            type: "danger",
            onClick: H
          }, {
            default: w(() => [
              O(C(j.$t("general.delete")), 1)
            ]),
            _: 1
          }),
          g(D, { onClick: K }, {
            default: w(() => [
              O(C(j.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: w(() => [
        u(m) ? (f(), A("div", Ec, [
          b("div", Dc, [
            b("div", Hc, [
              g(ot, {
                modelValue: u(m).linked,
                "onUpdate:modelValue": M[0] || (M[0] = (F) => u(m).linked = F),
                label: j.$t("general.nameAsLink")
              }, null, 8, ["modelValue", "label"])
            ]),
            u(m).linked ? (f(), A(W, { key: 0 }, [
              g(q, null, {
                default: w(() => [
                  O(C(j.$t("general.outerLink")), 1)
                ]),
                _: 1
              }),
              b("div", Rc, [
                g(ae, {
                  "model-value": u(m).outlink || u(B),
                  "onUpdate:modelValue": M[1] || (M[1] = (F) => u(m).outlink = F)
                }, null, 8, ["model-value"])
              ]),
              b("div", Nc, [
                g(ot, {
                  modelValue: u(m).targetBlank,
                  "onUpdate:modelValue": M[2] || (M[2] = (F) => u(m).targetBlank = F),
                  label: j.$t("general.inNewTab")
                }, null, 8, ["modelValue", "label"])
              ])
            ], 64)) : T("", !0),
            (f(!0), A(W, null, G(u(m).additionalFields, (F, Z) => (f(), U(X, {
              class: "mb-2",
              key: Z
            }, {
              default: w(() => [
                g(q, { class: "mb-1" }, {
                  default: w(() => [
                    O(C(Z), 1)
                  ]),
                  _: 2
                }, 1024),
                g(Ue, {
                  modelValue: u(m).additionalFields[Z],
                  "onUpdate:modelValue": (le) => u(m).additionalFields[Z] = le
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              _: 2
            }, 1024))), 128)),
            g(X, null, {
              default: w(() => [
                g(q, null, {
                  default: w(() => [
                    O(C(j.$t("general.topName")), 1)
                  ]),
                  _: 1
                }),
                g(Ue, {
                  modelValue: u(m).additionalName,
                  "onUpdate:modelValue": M[3] || (M[3] = (F) => u(m).additionalName = F)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            g(X, null, {
              default: w(() => [
                g(q, null, {
                  default: w(() => [
                    O(C(j.$t("general.bottomName")), 1)
                  ]),
                  _: 1
                }),
                g(Ue, {
                  modelValue: u(m).name,
                  "onUpdate:modelValue": M[4] || (M[4] = (F) => u(m).name = F)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            g(X, null, {
              default: w(() => [
                g(q, null, {
                  default: w(() => [
                    O(C(j.$t("general.description")), 1)
                  ]),
                  _: 1
                }),
                g(Ue, {
                  modelValue: u(m).description,
                  "onUpdate:modelValue": M[5] || (M[5] = (F) => u(m).description = F)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            g(X, null, {
              default: w(() => [
                g(q, null, {
                  default: w(() => [
                    O(" Z-Index ")
                  ]),
                  _: 1
                }),
                g(ae, {
                  modelValue: u(m).zindex,
                  "onUpdate:modelValue": M[6] || (M[6] = (F) => u(m).zindex = F),
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            g(X, null, {
              default: w(() => [
                g(q, null, {
                  default: w(() => [
                    O(" Width ")
                  ]),
                  _: 1
                }),
                g(ae, {
                  modelValue: u(m).width,
                  "onUpdate:modelValue": M[7] || (M[7] = (F) => u(m).width = F),
                  step: "20",
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            g(X, null, {
              default: w(() => [
                g(q, null, {
                  default: w(() => [
                    O(" Height ")
                  ]),
                  _: 1
                }),
                g(ae, {
                  modelValue: u(m).height,
                  "onUpdate:modelValue": M[8] || (M[8] = (F) => u(m).height = F),
                  step: "20",
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            g(X, null, {
              default: w(() => [
                g(q, null, {
                  default: w(() => [
                    O(C(j.$t("general.objectType")), 1)
                  ]),
                  _: 1
                }),
                g(Tc, {
                  modelValue: u(m).type,
                  "onUpdate:modelValue": M[9] || (M[9] = (F) => u(m).type = F),
                  items: u(x),
                  "option-id": "id",
                  "option-label": "name"
                }, null, 8, ["modelValue", "items"])
              ]),
              _: 1
            }),
            b("div", Vc, [
              g(ot, {
                modelValue: u(m).inMenu,
                "onUpdate:modelValue": M[10] || (M[10] = (F) => u(m).inMenu = F),
                label: j.$t("general.useInMenu")
              }, null, 8, ["modelValue", "label"])
            ]),
            u(m).inMenu ? (f(), A(W, { key: 1 }, [
              b("div", Uc, C(j.$t("general.menuOrder")), 1),
              b("div", zc, [
                g(ae, {
                  modelValue: u(m).menuOrder,
                  "onUpdate:modelValue": M[11] || (M[11] = (F) => u(m).menuOrder = F),
                  type: "number"
                }, null, 8, ["modelValue"])
              ])
            ], 64)) : T("", !0),
            u(m).arrows && u(m).arrows.length ? (f(), A(W, { key: 2 }, [
              b("div", Lc, C(j.$t("general.relations")), 1),
              b("div", Qc, [
                (f(!0), A(W, null, G(u(m).arrows, (F, Z) => {
                  var le;
                  return f(), A("div", {
                    key: F.id,
                    class: "FormObject-Arrow"
                  }, [
                    (le = u(v)) != null && le.objects[F.id] ? (f(), A("span", Wc, " #" + C(Z + 1) + " " + C(u(v).objects[F.id].name), 1)) : T("", !0),
                    g(D, {
                      class: "FormObject-ArrowButton",
                      type: "danger",
                      size: "sm",
                      onClick: (Ae) => E(Z)
                    }, {
                      default: w(() => [
                        O(C(j.$t("general.delete")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]);
                }), 128))
              ])
            ], 64)) : T("", !0)
          ])
        ])) : T("", !0)
      ]),
      _: 1
    }));
  }
}), qc = { class: "BaseTextarea" }, Yc = ["v-bind"], Ms = /* @__PURE__ */ P({
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
    const i = We(n, "modelValue", e);
    return (r, o) => (f(), A("div", qc, [
      Qe(b("textarea", {
        ref: "textarea",
        "v-bind": r.$attrs,
        "onUpdate:modelValue": o[0] || (o[0] = (c) => Be(i) ? i.value = c : null),
        class: "rounded-main block w-full p-2 border min-h-[200px] border-solid border-body-dark"
      }, null, 8, Yc), [
        [rs, u(i)]
      ])
    ]));
  }
}), Jc = { class: "text-lg font-bold" }, Zc = {
  key: 0,
  class: "flex flex-col"
}, Xc = { class: "flex justify-end pt-4 gap-2" }, el = /* @__PURE__ */ P({
  __name: "FormType",
  setup(n) {
    const {
      mapTypeCurrent: e,
      mapFile: t,
      mapType: s,
      modal: i,
      controlCombo: r
    } = Q(), { patron: o, chain: c, guest: a } = J();
    e.typeId(
      o.create(a.create((m) => {
        m && i.give("type");
      }))
    );
    const h = ee(""), l = c.create(), d = new Fs(() => {
      e.typeId(o.create(l.receiveKey("typeId"))), t.currentMap(o.create(l.receiveKey("map"))), l.result(o.create(
        a.create(({ map: m, typeId: x }) => {
          var v;
          d.value = m.types[x], h.value = (v = d.value) == null ? void 0 : v.name;
        })
      ));
    }).ref(), p = () => {
      e.give(""), i.give(""), l.receiveKey("typeId").give("");
    }, y = () => {
      s.give({
        name: h.value,
        type: d.value
      }), p();
    };
    return r.happenedConditional(
      "KeyS",
      i.openedByName("type"),
      o.create(a.create(y))
    ), (m, x) => (f(), U(ve, { name: "type" }, {
      header: w(() => [
        b("h2", Jc, C(m.$t("general.mapType")), 1)
      ]),
      footer: w(() => [
        b("div", Xc, [
          g(D, {
            type: "success",
            onClick: y
          }, {
            default: w(() => [
              O(C(m.$t("general.save")), 1)
            ]),
            _: 1
          }),
          g(D, { onClick: p }, {
            default: w(() => [
              O(C(m.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: w(() => [
        u(d) ? (f(), A("div", Zc, [
          g(X, null, {
            default: w(() => [
              g(q, null, {
                default: w(() => [
                  O(" Название типа ")
                ]),
                _: 1
              }),
              g(ae, {
                modelValue: u(d).name,
                "onUpdate:modelValue": x[0] || (x[0] = (v) => u(d).name = v)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          g(X, null, {
            default: w(() => [
              g(q, null, {
                default: w(() => [
                  O(" SVG ")
                ]),
                _: 1
              }),
              g(Ms, {
                modelValue: u(d).svg,
                "onUpdate:modelValue": x[1] || (x[1] = (v) => u(d).svg = v)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          g(X, null, {
            default: w(() => [
              g(q, null, {
                default: w(() => [
                  O(" Ширина ")
                ]),
                _: 1
              }),
              g(ae, {
                modelValue: u(d).width,
                "onUpdate:modelValue": x[2] || (x[2] = (v) => u(d).width = v)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          g(X, null, {
            default: w(() => [
              g(q, null, {
                default: w(() => [
                  O(" Высота ")
                ]),
                _: 1
              }),
              g(ae, {
                modelValue: u(d).height,
                "onUpdate:modelValue": x[3] || (x[3] = (v) => u(d).height = v)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          })
        ])) : T("", !0)
      ]),
      _: 1
    }));
  }
}), at = S.debug("MapObjectsWithTemplates");
class tl {
  constructor(e, t, s) {
    this.mapObjects = e, this.map = t, this.factories = s;
  }
  objects(e) {
    const t = this.factories.chain.create();
    return this.map.types(this.factories.guestCast.create(e, t.receiveKey("types"))), this.mapObjects.objects(this.factories.guestCast.create(e, t.receiveKey("objects"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ types: s, objects: i }) => {
        at("visible objects", i);
        const r = i.map((o) => {
          const c = s.find((h) => String(h.id) === String(o.type));
          if (at("check type existed", c), !c)
            return {
              obj: o,
              template: ""
            };
          let { svg: a } = c;
          return at("type svg", a), o.additionalFields && Object.entries(o.additionalFields).forEach(([h, l]) => {
            a = a.replaceAll(`\${${h}}`, l);
          }), ["width", "height"].forEach((h) => {
            a = a.replaceAll(`\${${h}}`, o[h]);
          }), {
            obj: o,
            template: a
          };
        });
        e.give(r);
      })
    ), e;
  }
}
const sl = /* @__PURE__ */ P({
  __name: "BaseNotify",
  setup(n) {
    const { notification: e } = Q(), t = e.message(new I()).ref();
    return (s, i) => u(t) && u(t).text !== "hide" ? (f(), A("div", {
      key: 0,
      class: ne(["inline font-bold", `text-${u(t).type}-second`])
    }, C(u(t).text), 3)) : T("", !0);
  }
}), il = { class: "relative" }, nl = { class: "absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-1" }, rl = { class: "text-sm z-10 p-2 absolute bottom-0 left-5" }, ol = /* @__PURE__ */ Os('<div class="absolute bottom-3 shadow-standard-second shadow-md drop-shadow right-3 z-10"><div class="grid-example grid grid-rows-2 grid-cols-2 bg-standard-second border border-standard-second gap-[1px] border-t-0 border-l-0"><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div></div></div><div class="absolute z-30 top-0 left-0 h-[18px] w-[22px] bg-white"></div>', 2), al = ["title"], cl = { class: "font-bold" }, ll = ["title"], ul = { class: "font-bold" }, dl = ["title"], hl = { class: "font-bold" }, pl = ["title"], fl = { class: "font-bold" }, ml = ["data-object-id"], gl = { class: "absolute bottom-[100%] left-[50%] translate-x-[-50%] text-center pb-2 pointer-events-auto text-sm w-[300px]" }, vl = ["innerHTML", "onClick"], Al = ["innerHTML"], yl = ["data-object-id", "innerHTML"], bl = /* @__PURE__ */ P({
  __name: "TheEditor",
  setup(n) {
    const {
      canvas: e,
      mapObjectsVisible: t,
      mapCurrent: s,
      konvaLayer: i,
      fps: r,
      mapCurrentID: o,
      mapObjectUrl: c,
      stageSize: a,
      objectsOutsideScreen: h,
      stagePositionByObjectId: l,
      mapCurrentSource: d
    } = Q(), p = J(), y = r.value(new I()).ref(), x = new tl(
      t,
      s,
      p
    ).objects(new I([])).ref(), v = a.value(new I()).ref(), k = i.position(new I()).ref(), B = Ie(() => {
      var Ae;
      return (Ae = v.value) == null ? void 0 : Ae.width;
    }), K = new vt(B), H = p.numberChunks.create(10, K).chunks(new I()).ref(), re = ee();
    os(() => {
      e.give(re.value);
    });
    const E = (Ae) => {
      c.open(Ae, p.guest.create((oe) => {
        o.give(oe);
      }));
    }, j = h.count(
      { axis: "x", direction: "negative" },
      new I()
    ).ref(), M = h.count(
      { axis: "x", direction: "positive" },
      new I()
    ).ref(), F = h.count(
      { axis: "y", direction: "negative" },
      new I()
    ).ref(), Z = h.count(
      { axis: "y", direction: "positive" },
      new I()
    ).ref(), le = l.move.bind(l, d);
    return (Ae, oe) => {
      var At, yt, bt, wt, Ct, xt, _t, $t, kt, Ft, Mt, St;
      return f(), A("div", il, [
        b("div", nl, [
          b("div", rl, [
            O(" Видимых объектов: " + C(u(x).length) + ", FPS: " + C(u(y)) + ", ", 1),
            g(sl)
          ]),
          ol,
          ((At = u(j)) == null ? void 0 : At.count) > 0 ? (f(), A("div", {
            key: 0,
            class: "pointer-events-auto absolute z-30 top-0 left-4 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(yt = u(j)) == null ? void 0 : yt.count} шт. объектов левее`,
            onClick: oe[0] || (oe[0] = (N) => u(le)(u(j).nearestObjectId))
          }, [
            g(Y, { icon: "fa-arrow-left" }),
            b("span", cl, C((bt = u(j)) == null ? void 0 : bt.count), 1)
          ], 8, al)) : T("", !0),
          ((wt = u(M)) == null ? void 0 : wt.count) > 0 ? (f(), A("div", {
            key: 1,
            class: "pointer-events-auto absolute z-30 p-1 top-0 right-0 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(Ct = u(M)) == null ? void 0 : Ct.count} шт. объектов правее`,
            onClick: oe[1] || (oe[1] = (N) => u(le)(u(M).nearestObjectId))
          }, [
            b("span", ul, C((xt = u(M)) == null ? void 0 : xt.count), 1),
            g(Y, { icon: "fa-arrow-right" })
          ], 8, ll)) : T("", !0),
          ((_t = u(F)) == null ? void 0 : _t.count) > 0 ? (f(), A("div", {
            key: 2,
            class: "pointer-events-auto absolute z-30 top-[18px] left-0 w-[18px] bg-white flex flex-col leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${($t = u(F)) == null ? void 0 : $t.count} шт. объектов выше`,
            onClick: oe[2] || (oe[2] = (N) => u(le)(u(F).nearestObjectId))
          }, [
            g(Y, { icon: "fa-arrow-up" }),
            b("span", hl, C((kt = u(F)) == null ? void 0 : kt.count), 1)
          ], 8, dl)) : T("", !0),
          ((Ft = u(Z)) == null ? void 0 : Ft.count) > 0 ? (f(), A("div", {
            key: 3,
            class: "pointer-events-auto absolute z-30 p-1 bottom-0 left-0 w-[18px] bg-white flex flex-col-reverse leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(Mt = u(Z)) == null ? void 0 : Mt.count} шт. объектов ниже`,
            onClick: oe[3] || (oe[3] = (N) => u(le)(u(Z).nearestObjectId))
          }, [
            g(Y, { icon: "fa-arrow-down" }),
            b("span", fl, C((St = u(Z)) == null ? void 0 : St.count), 1)
          ], 8, pl)) : T("", !0),
          b("div", {
            class: ne({ "objects-container absolute top-0 left-0": !0 }),
            style: ce({ width: `${u(v).width}px`, height: `${u(v).height}px`, transform: `translate(${u(k).x}px, ${u(k).y}px)` })
          }, [
            b("div", {
              class: "absolute flex top-0 left-0 w-full z-20 h-[20px] bg-default border-b-2 border-border text-right text-sm px-2",
              style: ce({ transform: `translate(0, ${-u(k).y}px)` })
            }, [
              (f(!0), A(W, null, G(u(H), (N) => (f(), A("span", {
                class: "flex-1 text-body-dark",
                key: `horiz_${N}`
              }, C(N) + "px", 1))), 128))
            ], 4),
            b("div", {
              class: "absolute flex [writing-mode:vertical-lr] top-0 left-0 h-full z-20 w-[20px] bg-default border-r-2 border-border text-left text-sm py-2",
              style: ce({ transform: `translate(${-u(k).x}px, 0)` })
            }, [
              (f(!0), A(W, null, G(u(H), (N) => (f(), A("span", {
                class: "flex-1 rotate-180 text-body-dark",
                key: `vert_${N}`
              }, C(N) + "px", 1))), 128))
            ], 4),
            (f(!0), A(W, null, G(u(x), (N) => (f(), A("div", {
              key: N.obj.id,
              class: "absolute z-10",
              "data-object-id": N.obj.id,
              style: ce(`width:${N.obj.width}px;height: ${N.obj.height}px;top: ${N.obj.position[1]}px;left:${N.obj.position[0]}px;z-index:${N.obj.zindex}`)
            }, [
              b("div", gl, [
                b("span", {
                  innerHTML: N.obj.additionalName,
                  class: ne([N.obj.linked && "cursor-pointer underline"]),
                  onClick: (yu) => E(N.obj)
                }, null, 10, vl)
              ]),
              b("div", {
                class: "absolute top-[100%] left-[50%] translate-x-[-50%] text-center pt-2 text-sm w-[300px]",
                innerHTML: N.obj.name
              }, null, 8, Al),
              b("div", {
                "data-object-id": N.obj.id,
                class: "rendered-object",
                innerHTML: N.template
              }, null, 8, yl)
            ], 12, ml))), 128))
          ], 4)
        ]),
        b("div", {
          class: "h-full",
          ref_key: "canvasWrapper",
          ref: re
        }, null, 512)
      ]);
    };
  }
}), wl = { class: "flex flex-wrap gap-2" }, Cl = { key: 0 }, xl = { key: 1 }, _l = ["onClick"], $l = /* @__PURE__ */ P({
  __name: "BaseBreadcrumbs",
  setup(n) {
    const {
      breadcrumbs: e,
      mapCurrentID: t
    } = Q(), s = e.list(new I()).ref();
    return (i, r) => (f(), A("div", wl, [
      (f(!0), A(W, null, G(u(s), (o, c) => (f(), A("span", {
        class: "flex gap-2",
        key: o.name
      }, [
        c !== 0 ? (f(), A("span", Cl, "/")) : T("", !0),
        c === u(s).length - 1 ? (f(), A("b", xl, "Открыто: " + C(o.title), 1)) : (f(), A("a", {
          key: 2,
          href: "#",
          onClick: be((a) => u(t).give(o.name), ["prevent"])
        }, C(o.title), 9, _l))
      ]))), 128))
    ]));
  }
}), kl = { class: "flex items-center p-3 gap-3" }, Fl = { class: "ml-auto gap-1 flex" }, Ml = /* @__PURE__ */ P({
  __name: "TheHeader",
  setup(n) {
    const {
      drawer: e,
      modal: t,
      mapHistory: s,
      controlCombo: i,
      settings: r
    } = Q(), { patron: o, guest: c } = J(), a = s.isNextPossible(new I()).ref(), h = s.isPrevPossible(new I()).ref();
    i.happened(
      "KeyZ",
      o.create(c.create(() => {
        h.value && s.prev();
      }))
    ), i.happened(
      "KeyP",
      o.create(c.create(() => {
        a.value && s.next();
      }))
    );
    const l = new I();
    return r.value(l), (d, p) => (f(), A("div", kl, [
      g($l, { class: "TheHeader-Breadcrumbs" }),
      b("div", Fl, [
        u(a) && !u(l).value.readonly ? (f(), U(D, {
          key: 0,
          size: "sm",
          title: "Отменить последнее действие",
          class: "w-7 block",
          onClick: p[0] || (p[0] = (y) => u(s).next())
        }, {
          default: w(() => [
            g(Y, { icon: "fa-rotate-left" })
          ]),
          _: 1
        })) : T("", !0),
        u(h) && !u(l).value.readonly ? (f(), U(D, {
          key: 1,
          size: "sm",
          title: "Вернуть отмененное действие",
          class: "w-7 block",
          onClick: p[1] || (p[1] = (y) => u(s).prev())
        }, {
          default: w(() => [
            g(Y, { icon: "fa-rotate-right" })
          ]),
          _: 1
        })) : T("", !0),
        g(D, {
          type: "success",
          size: "sm",
          class: "w-7 block e2e-open-menu",
          title: d.$t("general.menu"),
          onClick: p[2] || (p[2] = (y) => u(e).give("menu"))
        }, {
          default: w(() => [
            g(Y, { icon: "fa-bars" })
          ]),
          _: 1
        }, 8, ["title"]),
        g(D, {
          title: d.$t("general.byText"),
          type: "primary",
          size: "sm",
          class: "w-7 block",
          onClick: p[3] || (p[3] = (y) => u(t).give("mapAsText"))
        }, {
          default: w(() => [
            g(Y, { icon: "fa-text-width" })
          ]),
          _: 1
        }, 8, ["title"]),
        g(D, {
          class: "w-7 block e2e-search",
          size: "sm",
          onClick: p[4] || (p[4] = (y) => u(t).give("search"))
        }, {
          default: w(() => [
            g(Y, { icon: "fa-search" })
          ]),
          _: 1
        }),
        g(D, {
          size: "sm",
          title: "Все карты файла",
          class: "w-7 block",
          onClick: p[5] || (p[5] = (y) => u(e).give("fileMaps"))
        }, {
          default: w(() => [
            g(Y, { icon: "fa-map" })
          ]),
          _: 1
        })
      ])
    ]));
  }
}), Sl = {}, Tl = { class: "text-lg font-bold" };
function Il(n, e) {
  return f(), A("span", Tl, [
    te(n.$slots, "default")
  ]);
}
const jl = /* @__PURE__ */ Oe(Sl, [["render", Il]]), Bl = { class: "flex gap-1" }, Ol = {
  key: 0,
  class: "TheMapAsText select-auto"
}, Pl = ["innerHTML"], El = /* @__PURE__ */ P({
  __name: "TheMapAsText",
  setup(n) {
    const { mapFile: e, mapCurrent: t } = Q(), {
      guest: s,
      patron: i,
      textOf: r,
      textNlAsBr: o,
      textWithoutHTML: c
    } = J(), a = e.currentMap(new I()).ref(), h = ee(""), l = ee([]);
    t.objects(
      i.create(
        s.create(Ce((v) => {
          l.value = v, o.create(
            r.create(
              v.map((k) => `<div class="TheMapAsText-Item">
                <h3>${k.name}</h3><p>${k.additionalName || ""}</p><p>${k.description || ""}</p><p>${k.additionalFields && Object.values(k.additionalFields).join("</p><p>")}</p></div>`).join("")
            )
          ).asString(
            s.create((k) => {
              h.value = k;
            })
          );
        }, 500))
      )
    );
    const { share: d, isSupported: p } = Ds(), y = () => {
      p.value || alert("Sharing is not supported"), c.create(
        r.create(
          h.value
        )
      ).asString(
        s.create((v) => {
          d({
            text: v
          });
        })
      );
    }, m = ee(), x = () => {
      var v, k;
      if (a.value) {
        const B = new Range();
        B.setStart(m.value, 0), B.setEnd(m.value, Object.values(l.value).length), (v = document.getSelection()) == null || v.removeAllRanges(), (k = document.getSelection()) == null || k.addRange(B);
      }
    };
    return (v, k) => (f(), U(ve, { name: "mapAsText" }, {
      header: w(() => [
        g(jl, { class: "block mb-3" }, {
          default: w(() => [
            O(C(v.$t("general.mapAsText")) + " ", 1),
            b("div", Bl, [
              g(D, {
                size: "sm",
                type: "success",
                class: "font-normal",
                onClick: y
              }, {
                default: w(() => [
                  O(C(v.$t("general.share")), 1)
                ]),
                _: 1
              }),
              g(D, {
                size: "sm",
                type: "primary",
                class: "font-normal",
                onClick: x
              }, {
                default: w(() => [
                  O(C(v.$t("general.selectAll")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        })
      ]),
      default: w(() => [
        u(a) ? (f(), A("article", Ol, [
          b("div", {
            ref_key: "textRef",
            ref: m,
            innerHTML: h.value
          }, null, 8, Pl)
        ])) : T("", !0)
      ]),
      _: 1
    }));
  }
}), Dl = { key: 1 }, Hl = /* @__PURE__ */ P({
  __name: "TheMiniMap",
  setup(n) {
    const { miniMap: e } = Q(), t = e.points(new I()).ref(), s = e.size(new I()).ref(), i = e.viewportSize(new I()).ref(), r = e.viewportPosition(new I()).ref();
    return (o, c) => u(s) ? (f(), A("div", {
      key: 0,
      style: ce({
        width: `${u(s).width}px`,
        height: `${u(s).height}px`
      }),
      class: "absolute pointer-events-none block bg-white bottom-[10px] mt-3 right-3 z-1 border border-solid border-body-dark"
    }, [
      u(r) ? (f(), A("div", {
        key: 0,
        style: ce({
          width: `${u(i).width}px`,
          height: `${u(i).height}px`,
          top: `${u(r).y}px`,
          left: `${u(r).x}px`
        }),
        class: "absolute bg-primary/50"
      }, null, 4)) : T("", !0),
      u(t) ? (f(), A("div", Dl, [
        (f(!0), A(W, null, G(u(t), (a) => (f(), A("div", {
          key: a.id,
          class: "absolute w-1 h-1 block bg-danger",
          style: ce({
            top: `${a.y}px`,
            left: `${a.x}px`,
            width: `${a.width}px`,
            height: `${a.height}px`
          })
        }, null, 4))), 128))
      ])) : T("", !0)
    ], 4)) : T("", !0);
  }
}), Rl = { class: "text-lg font-bold" }, Nl = {
  key: 0,
  class: "TheSettings"
}, Vl = { class: "mb-2" }, Ul = { class: "TheSettings-Row" }, zl = { class: "flex gap-2 mb-2" }, Ll = { class: "mb-2" }, Ql = { class: "mb-2" }, Wl = {
  href: "https://github.com/kosukhin/mind-map-creator",
  target: "_blank"
}, Kl = { class: "flex gap-2" }, Gl = /* @__PURE__ */ P({
  __name: "FormSettings",
  setup(n) {
    const {
      modal: e,
      mapFile: t,
      mapRemoved: s,
      mapSettings: i,
      controlCombo: r,
      parentNames: o,
      mapCurrentID: c
    } = Q(), { patron: a, guest: h } = J(), l = o.names(new I()).ref(), d = t.currentMap(new I()).ref(), p = c.id(new I()).ref(), y = () => {
      e.give("");
    }, m = () => {
      i.give(d.value.settings), y();
    };
    return r.happenedConditional(
      "KeyS",
      e.openedByName("settings"),
      a.create(h.create(m))
    ), (x, v) => (f(), U(ve, { name: "settings" }, {
      header: w(() => [
        b("h2", Rl, C(x.$t("general.mapSettings")), 1)
      ]),
      default: w(() => {
        var k;
        return [
          (k = u(d)) != null && k.settings ? (f(), A("div", Nl, [
            b("div", Vl, [
              b("div", Ul, [
                b("div", zl, [
                  u(l).length > 1 ? (f(), U(D, {
                    key: 0,
                    type: "primary",
                    class: "text-white",
                    onClick: v[0] || (v[0] = (B) => u(e).give("parentTypes"))
                  }, {
                    default: w(() => [
                      O(C(x.$t("general.parentTypes")), 1)
                    ]),
                    _: 1
                  })) : T("", !0),
                  g(D, {
                    type: "primary",
                    class: "text-white",
                    onClick: v[1] || (v[1] = (B) => u(e).give("export"))
                  }, {
                    default: w(() => [
                      O(C(x.$t("general.exportOrImport")), 1)
                    ]),
                    _: 1
                  }),
                  g(D, {
                    type: "primary",
                    class: "text-white e2e-open-presets",
                    onClick: v[2] || (v[2] = (B) => u(e).give("presets"))
                  }, {
                    default: w(() => [
                      O(" Пресеты ")
                    ]),
                    _: 1
                  })
                ])
              ]),
              b("div", Ll, [
                b("label", null, [
                  b("b", null, C(x.$t("general.mapName")), 1),
                  g(ae, {
                    modelValue: u(d).settings.title,
                    "onUpdate:modelValue": v[3] || (v[3] = (B) => u(d).settings.title = B)
                  }, null, 8, ["modelValue"])
                ])
              ]),
              b("div", Ql, [
                b("a", Wl, C(x.$t("general.githubRepo")), 1)
              ])
            ]),
            b("div", Kl, [
              g(D, {
                class: "TheSettings-Button",
                type: "success",
                onClick: v[4] || (v[4] = (B) => m())
              }, {
                default: w(() => [
                  O(C(x.$t("general.save")), 1)
                ]),
                _: 1
              }),
              g(D, {
                class: "TheSettings-Button",
                onClick: y
              }, {
                default: w(() => [
                  O(C(x.$t("general.cancel")), 1)
                ]),
                _: 1
              }),
              g(D, {
                class: "TheSettings-Button",
                type: "danger",
                onClick: v[5] || (v[5] = (B) => {
                  u(s).give(u(p)), y();
                })
              }, {
                default: w(() => [
                  O(C(x.$t("general.removeMap")), 1)
                ]),
                _: 1
              })
            ])
          ])) : T("", !0)
        ];
      }),
      _: 1
    }));
  }
}), ql = {}, Yl = { class: "BaseGroup" };
function Jl(n, e) {
  return f(), A("div", Yl, [
    te(n.$slots, "default")
  ]);
}
const Zl = /* @__PURE__ */ Oe(ql, [["render", Jl]]), Xl = "default", eu = /* @__PURE__ */ P({
  __name: "TheLinker",
  setup(n) {
    const { mapObjectsLink: e } = Q(), t = e.objectIds(new I([])).ref();
    return (s, i) => (f(), U(D, {
      type: Xl,
      onClick: i[0] || (i[0] = (r) => u(e).startLink())
    }, {
      default: w(() => [
        O(C(u(t).length === 1 ? "Выбиретие объект" : u(t).length === 2 ? "Второй объект" : "Связать объекты"), 1)
      ]),
      _: 1
    }));
  }
}), tu = { class: "flex e2e-sidebar flex-col items-center gap-3 max-h-[100%] overflow-hidden" }, su = { class: "TheSideBar-ItemName" }, iu = ["innerHTML", "draggable", "title", "onDragend"], nu = {
  key: 0,
  class: "flex gap-1"
}, ru = {
  key: 0,
  class: "mt-auto w-full p-3 pt-0"
}, ou = /* @__PURE__ */ P({
  __name: "TheSideBar",
  setup(n) {
    const {
      mapObjectNew: e,
      mapCurrent: t,
      mapTypeCurrent: s,
      mapTypeRemoved: i,
      mapTypeNew: r,
      modal: o,
      settings: c,
      sidebarDraggable: a
    } = Q(), h = t.types(new I()).ref(), l = ee();
    os(() => {
      a.give(l.value);
    });
    const { svgMapTypeImage: d } = J(), p = Ie(() => {
      var m;
      return (m = h.value) == null ? void 0 : m.map((x) => ({
        type: x,
        image: d.create(x).markup()
      })).sort((x, v) => +(x.type.name >= v.type.name));
    }), y = new I();
    return c.value(y), (m, x) => (f(), A("div", tu, [
      b("div", {
        ref_key: "dragWrapperRef",
        ref: l,
        class: "flex flex-col gap-3 flex-grow w-full overflow-y-auto"
      }, [
        (f(!0), A(W, null, G(p.value, (v, k) => (f(), A("div", {
          key: k,
          class: "flex flex-col items-center justify-center gap-2"
        }, [
          b("div", su, C(v.type.name), 1),
          b("div", {
            innerHTML: v.image,
            class: "TheSideBar-ItemImage",
            draggable: u(y).value.readonly ? "false" : "true",
            style: ce(`width:${v.type.width}px;height:${v.type.height}px`),
            title: m.$t("general.notifications.dragToCanvasToAdd"),
            onDragend: (B) => u(e).byTypeName(v.type.id, B)
          }, null, 44, iu),
          u(y).value.readonly ? T("", !0) : (f(), A("div", nu, [
            g(D, {
              class: "text-white",
              size: "sm",
              type: "primary",
              onClick: (B) => u(s).give(v.type.id)
            }, {
              default: w(() => [
                O(C(m.$t("general.change")), 1)
              ]),
              _: 2
            }, 1032, ["onClick"]),
            g(D, {
              class: "text-white",
              size: "sm",
              type: "danger",
              onClick: (B) => u(i).give(v.type)
            }, {
              default: w(() => [
                O(C(m.$t("general.delete")), 1)
              ]),
              _: 2
            }, 1032, ["onClick"])
          ]))
        ]))), 128))
      ], 512),
      u(y).value.readonly ? T("", !0) : (f(), A("div", ru, [
        g(Zl, { class: "mb-1 grid gap-1 grid-cols-2" }, {
          default: w(() => [
            g(D, {
              title: m.$t("general.addType"),
              type: "success",
              onClick: x[0] || (x[0] = (v) => u(r).byName())
            }, {
              default: w(() => [
                g(Y, { icon: "fa-plus-square" })
              ]),
              _: 1
            }, 8, ["title"]),
            g(D, {
              class: "e2e-show-settings",
              title: m.$t("general.settings"),
              type: "primary",
              onClick: x[1] || (x[1] = (v) => u(o).give("settings"))
            }, {
              default: w(() => [
                g(Y, { icon: "fa-cog" })
              ]),
              _: 1
            }, 8, ["title"])
          ]),
          _: 1
        }),
        g(eu, { class: "w-[100%] block mb-1" })
      ]))
    ]));
  }
});
class au {
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
    return this.basePatron.give(e), this.refWatcherCreated || (this.refWatcherCreated = !0, je(
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
class cu {
  constructor(e) {
    this.baseSource = e;
  }
  value(e) {
    return this.baseSource.value(
      new z(e, (t) => {
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
class lu {
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
const uu = { class: "AppPresets" }, du = /* @__PURE__ */ b("div", { class: "text-md font-bold mb-2" }, "Экспорт\\Импорт текущей карты", -1), hu = { class: "flex flex-col gap-2" }, pu = /* @__PURE__ */ P({
  __name: "AppExport",
  setup(n) {
    const { mapFile: e, mapCurrent: t } = Q(), s = new lu(
      t,
      new ye((c) => {
        e.currentMap(new Le(c));
      })
    ), i = new cu(s), r = new au(new I(), i);
    i.value(r);
    const o = r.ref();
    return (c, a) => (f(), U(ve, { name: "export" }, {
      default: w(() => [
        b("div", uu, [
          du,
          b("div", hu, [
            g(Ms, {
              modelValue: u(o),
              "onUpdate:modelValue": a[0] || (a[0] = (h) => Be(o) ? o.value = h : null)
            }, null, 8, ["modelValue"])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), fu = P({
  name: "TheSidebarButton"
}), mu = { class: "absolute bg-body bottom-1 left-7 w-15 h-15" };
function gu(n, e, t, s, i, r) {
  return f(), A("div", mu, "sb");
}
const vu = /* @__PURE__ */ Oe(fu, [["render", gu]]), Au = { class: "bg-body absolute top-0 left-0 w-full h-full" }, Mu = /* @__PURE__ */ P({
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
    const t = n, s = e, { fileContent: i, settings: r, device: o } = Q(), { guest: c, patron: a } = J();
    r.value((d) => {
      r.give({
        ...d,
        readonly: t.readonly,
        presets: t.presets
      });
    }), je(() => t.modelValue, (d) => {
      i.value(c.create((p) => {
        d !== p && i.give(d);
      }));
    }, {
      immediate: !0
    }), i.value(a.create((d) => {
      s("update:modelValue", d);
    }));
    const h = ee(!0), l = new I();
    return o.value(l), o.value(new cs((d) => {
      h.value = d.isDesktop;
    })), (d, p) => (f(), A("div", Au, [
      b("div", {
        class: ne(["grid grid-rows-[50px_1fr] h-dvh relative", { "grid-cols-[200px_1fr]": h.value, "grid-cols-[1fr]": !h.value }])
      }, [
        g(Ml, { class: "col-span-2" }),
        h.value ? (f(), U(ou, { key: 0 })) : T("", !0),
        g(bl, { class: "w-auto col-auto h-full" }),
        g(Hl),
        u(l).value.isMobile ? (f(), U(vu, { key: 1 })) : T("", !0)
      ], 2),
      g(Gc),
      g(el),
      g(Gl),
      g(nc),
      g(yc),
      g(pu),
      g(Wa),
      g(El),
      g(pc),
      g(Na)
    ]));
  }
}), ss = S.debug("FileSystemContent");
class Su {
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
    if (ss("save file as content string", e), !this.fileHandler)
      throw new Te("Cant save file because no fileHandler");
    try {
      return this.contentSource.give(e), this.factories.browserFileSaved.create(this.fileHandler).save(e), this.contentPatrons.give(e), this;
    } catch (t) {
      throw new Te("Cant handle receive for map file FS", { cause: t });
    } finally {
      this.notification.give({
        type: "success",
        text: "Успешно сохранен файл карты!"
      });
    }
  }
  canBeUsed(e) {
    const t = "launchQueue" in window;
    ss("can be used", t);
    const s = window && window.matchMedia("(display-mode: standalone)");
    return e.give(t && s.matches), e;
  }
}
const ze = S.debug("FirstPossibleFileContent");
class Tu {
  constructor(e, t) {
    $(this, "firstPossibleFileContent", null);
    $(this, "contentSource", new fe());
    $(this, "canBeUsedSource", new fe());
    ze("length", e.length), e.forEach((s) => {
      s.canBeUsed(
        t.patronOnce.create(
          t.guest.create((i) => {
            ze("canbeused result", s, i), i && !this.firstPossibleFileContent && (this.firstPossibleFileContent = s, s.canBeUsed(t.patron.create(this.canBeUsedSource)), s.content(t.patron.create(this.contentSource)), this.contentSource.value(
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
    return ze("can be used to", this.firstPossibleFileContent), this.canBeUsedSource.value(e), e;
  }
  content(e) {
    return ze("content to", this.firstPossibleFileContent), this.contentSource.value(e), this;
  }
  give(e) {
    return this.contentSource.give(e), this;
  }
}
const ct = S.debug("UrlContent");
class Iu {
  constructor(e, t) {
    $(this, "contentCache");
    this.notification = e, this.factories = t, this.contentCache = t.sourceEmpty.create();
  }
  canBeUsed(e) {
    if (!window)
      return e.give(!1), this;
    const t = window.location.search.indexOf("?view=") > -1;
    if (ct("can be used", t), e.give(window.location.search.indexOf("?view=") > -1), t) {
      const s = window.location.search.split("=")[1] ?? "";
      fetch(s, { redirect: "follow" }).then((i) => i.text()).then((i) => {
        ct("received text", i), this.contentCache.give(i);
      });
    }
    return e;
  }
  content(e) {
    if (!window)
      return this;
    const t = window.location.search.split("=")[1] ?? "";
    return ct("visit url", t), this.contentCache.value(this.factories.patronOnce.create(e)), this;
  }
  give() {
    return this.notification.give({
      type: "error",
      text: "Невозможно сохранить карту, открытую по ссылке!"
    }), this;
  }
}
const is = new fe();
class ju {
  constructor(e = window.launchQueue, t = "launchQueue" in window) {
    $(this, "isCalculated", !1);
    this.launchQueue = e, this.isLaunchQueueSupported = t;
  }
  fileHandler(e) {
    return this.isLaunchQueueSupported && !this.isCalculated && (this.isCalculated = !0, this.launchQueue.setConsumer((t) => {
      if (t.files && t.files.length) {
        const [s] = t.files;
        is.give(s);
      }
    })), is.value(e), this;
  }
}
export {
  ju as BrowserLaunchQueue,
  Su as FileSystemContent,
  Tu as FirstPossibleFileContent,
  Mu as PatronSchemeEditor,
  Iu as UrlContent,
  I as VueRefPatron,
  Q as useApplication,
  J as useFactories
};
