var Ms = Object.defineProperty;
var Ss = (n, e, t) => e in n ? Ms(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var $ = (n, e, t) => Ss(n, typeof e != "symbol" ? e + "" : e, t);
import { ref as ie, defineComponent as D, computed as Te, openBlock as f, createBlock as L, Transition as ns, withCtx as w, unref as u, createElementBlock as A, normalizeClass as ce, createElementVNode as b, withModifiers as ye, renderSlot as ee, createCommentVNode as j, Fragment as z, renderList as G, toDisplayString as C, createVNode as m, normalizeStyle as ae, createTextVNode as O, watch as Ie, withDirectives as Le, isRef as je, vModelText as rs, vModelCheckbox as Ts, onBeforeUnmount as Is, vModelSelect as js, onMounted as os, createStaticVNode as Bs } from "vue";
import { useScriptTag as Os, useMagicKeys as Ps, useVModel as Qe, useShare as Es } from "@vueuse/core";
import de from "konva";
import { FontAwesomeIcon as Ds } from "@fortawesome/vue-fontawesome";
import { faBars as Rs, faTextWidth as Hs, faSearch as Ns, faHistory as Vs, faPlusSquare as Us, faCog as zs, faFileText as Ls, faRotateLeft as Qs, faRotateRight as Ws, faMap as Ks, faClose as Gs, faArrowLeft as Ys, faArrowRight as qs, faArrowDown as Js, faArrowUp as Zs } from "@fortawesome/free-solid-svg-icons";
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
class Me {
  constructor(e) {
    this.guestReceiver = e;
  }
  value(e) {
    return this.guestReceiver(e), e;
  }
}
function K(n, e, t) {
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
class W {
  constructor(e, t) {
    this.sourceGuest = e, this.targetGuest = t;
  }
  introduction() {
    return typeof this.sourceGuest == "function" || !this.sourceGuest.introduction ? "guest" : this.sourceGuest.introduction();
  }
  give(e, t) {
    return K(e, this.targetGuest, t), this;
  }
  disposed(e) {
    const t = this.sourceGuest;
    return t.disposed ? t.disposed(e) : !1;
  }
}
var ni = Object.defineProperty, ri = (n, e, t) => e in n ? ni(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Tt = (n, e, t) => ri(n, typeof e != "symbol" ? e + "" : e, t);
const as = /* @__PURE__ */ new Map(), It = (n) => {
  as.forEach((e) => {
    e.delete(n);
  });
};
class We {
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
    this.guestDisposed(e, t) || K(e, t, {
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
class Be {
  constructor(e) {
    this.sourceDocument = e, ci(this, "thePool", new We(this));
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
class ze {
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
var li = Object.defineProperty, ui = (n, e, t) => e in n ? li(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, jt = (n, e, t) => ui(n, typeof e != "symbol" ? e + "" : e, t);
class di {
  constructor(e) {
    jt(this, "guests", /* @__PURE__ */ new Set()), jt(this, "patronPool"), this.patronPool = new We(e);
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
      K(e, s, t);
    }), this.guests.clear();
  }
}
var hi = Object.defineProperty, pi = (n, e, t) => e in n ? hi(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Oe = (n, e, t) => pi(n, typeof e != "symbol" ? e + "" : e, t);
class Ke {
  constructor() {
    Oe(this, "theChain"), Oe(this, "keysKnown", /* @__PURE__ */ new Set()), Oe(this, "keysFilled", /* @__PURE__ */ new Set()), Oe(this, "filledChainPool", new di(this)), this.theChain = new Be({});
  }
  resultArray(e) {
    const t = new ze(e);
    return this.filledChainPool.add(
      new W(t, (s) => {
        t.give(Object.values(s));
      })
    ), this.isChainFilled() && this.theChain.value(
      new pe((s) => {
        this.filledChainPool.give(Object.values(s));
      })
    ), this;
  }
  result(e) {
    const t = new ze(e);
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
    return K(e, this.willBePatron, t), this;
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
    this.received || K(e, this.baseGuest, t);
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
    Ci(this, "baseSource", new Be(null));
  }
  value(e) {
    return this.baseSource.value(
      new W(e, (t) => {
        t !== null && K(t, e);
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
class H {
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
var Pe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
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
    var g = d >= p * 1.5;
    return Math.round(l / p) + " " + y + (g ? "s" : "");
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
    let d, p = null, y, g;
    function x(...v) {
      if (!x.enabled)
        return;
      const k = x, B = Number(/* @__PURE__ */ new Date()), Q = B - (d || B);
      k.diff = Q, k.prev = d, k.curr = B, d = B, v[0] = t.coerce(v[0]), typeof v[0] != "string" && v.unshift("%O");
      let R = 0;
      v[0] = v[0].replace(/%([a-zA-Z%])/g, (P, T) => {
        if (P === "%%")
          return "%";
        R++;
        const M = t.formatters[T];
        if (typeof M == "function") {
          const F = v[R];
          P = M.call(k, F), v.splice(R, 1), R--;
        }
        return P;
      }), t.formatArgs.call(k, v), (k.log || t.log).apply(k, v);
    }
    return x.namespace = l, x.useColors = t.useColors(), x.color = t.selectColor(l), x.extend = s, x.destroy = t.destroy, Object.defineProperty(x, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => p !== null ? p : (y !== t.namespaces && (y = t.namespaces, g = t.enabled(l)), g),
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
const cs = /* @__PURE__ */ ut(S), Ri = S.debug("TextNlAsBr");
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
const Ni = new H(Be), Vi = new H(Be), Ui = new H(fe), zi = new H(pe), Li = new H(W), Qi = new H(Me), Wi = new H(We), Ki = new H(gi), Gi = new H(yi), Yi = new H(W), qi = new H(Ke), Ji = new H(fi), he = {
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
}, Zi = new H(xi), Xi = new H(_i), en = new H(ki), tn = new H($i), ls = new H(Fi), sn = new H(Mi, { ...he, svgImage: ls }), nn = new H(Si, he), rn = new H(Ti, he), on = new H(Ii, he), an = new H(ji, he), cn = new H(Bi), ln = new H(Oi, he), un = new H(Hi, he), dn = {
  ...he,
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
class us {
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
      new W(e, (t) => {
        e.give(t.settings.title);
      })
    ), this;
  }
}
const Ee = S.debug("MapHistory"), Ot = (n) => {
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
const De = S.debug("MapFileOfContent");
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
class ds {
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
const Pt = cs("app:MapObjectCurrent");
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
var ht = Fn, Mn = typeof Pe == "object" && Pe && Pe.Object === Object && Pe, Sn = Mn, Tn = Sn, In = typeof self == "object" && self && self.Object === Object && self, jn = Tn || In || Function("return this")(), hs = jn, Bn = hs, On = function() {
  return Bn.Date.now();
}, Pn = On, En = /\s/;
function Dn(n) {
  for (var e = n.length; e-- && En.test(n.charAt(e)); )
    ;
  return e;
}
var Rn = Dn, Hn = Rn, Nn = /^\s+/;
function Vn(n) {
  return n && n.slice(0, Hn(n) + 1).replace(Nn, "");
}
var Un = Vn, zn = hs, Ln = zn.Symbol, ps = Ln, Et = ps, fs = Object.prototype, Qn = fs.hasOwnProperty, Wn = fs.toString, Ce = Et ? Et.toStringTag : void 0;
function Kn(n) {
  var e = Qn.call(n, Ce), t = n[Ce];
  try {
    n[Ce] = void 0;
    var s = !0;
  } catch {
  }
  var i = Wn.call(n);
  return s && (e ? n[Ce] = t : delete n[Ce]), i;
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
var dr = ur, hr = Un, Ht = ht, pr = dr, Nt = NaN, fr = /^[-+]0x[0-9a-f]+$/i, gr = /^0b[01]+$/i, mr = /^0o[0-7]+$/i, vr = parseInt;
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
  n = hr(n);
  var t = gr.test(n);
  return t || mr.test(n) ? vr(n.slice(2), t ? 2 : 8) : fr.test(n) ? Nt : +n;
}
var yr = Ar, br = ht, st = Pn, Vt = yr, wr = "Expected a function", Cr = Math.max, xr = Math.min;
function _r(n, e, t) {
  var s, i, r, o, c, a, h = 0, l = !1, d = !1, p = !0;
  if (typeof n != "function")
    throw new TypeError(wr);
  e = Vt(e) || 0, br(t) && (l = !!t.leading, d = "maxWait" in t, r = d ? Cr(Vt(t.maxWait) || 0, e) : r, p = "trailing" in t ? !!t.trailing : p);
  function y(P) {
    var T = s, M = i;
    return s = i = void 0, h = P, o = n.apply(M, T), o;
  }
  function g(P) {
    return h = P, c = setTimeout(k, e), l ? y(P) : o;
  }
  function x(P) {
    var T = P - a, M = P - h, F = e - T;
    return d ? xr(F, r - M) : F;
  }
  function v(P) {
    var T = P - a, M = P - h;
    return a === void 0 || T >= e || T < 0 || d && M >= r;
  }
  function k() {
    var P = st();
    if (v(P))
      return B(P);
    c = setTimeout(k, x(P));
  }
  function B(P) {
    return c = void 0, p && s ? y(P) : (s = i = void 0, o);
  }
  function Q() {
    c !== void 0 && clearTimeout(c), h = 0, s = a = i = c = void 0;
  }
  function R() {
    return c === void 0 ? o : B(st());
  }
  function ne() {
    var P = st(), T = v(P);
    if (s = arguments, i = this, a = P, T) {
      if (c === void 0)
        return g(a);
      if (d)
        return clearTimeout(c), c = setTimeout(k, e), y(a);
    }
    return c === void 0 && (c = setTimeout(k, e)), o;
  }
  return ne.cancel = Q, ne.flush = R, ne;
}
var gs = _r;
const be = /* @__PURE__ */ ut(gs), $r = (n) => {
  if (n[n.length - 1] === "/") {
    const e = n.split("");
    return e.splice(e.length - 1, 1), e.join("");
  }
  return n;
}, kr = be((n) => {
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
            const y = p.position[nt[e.axis]] + (s ? 0 : p[Ut[e.axis]]), g = c[e.axis] * -1 + (s ? o[Ut[e.axis]]() : 0);
            return zt(
              "mb nearest points",
              e.direction,
              "objectP=",
              y,
              "screenP=",
              g
            ), s ? y > g : y < g;
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
const Hr = S.debug("MapTypeUsed");
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
        be((i) => {
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
const xe = S.debug("app:MapObjectsVisible");
class Kr {
  constructor(e, t, s, i) {
    $(this, "visibleObjectsCache", new fe());
    xe("constructor initialized");
    const r = i.chain.create();
    t.size(i.patron.create(r.receiveKey("size"))), e.position(i.patron.create(r.receiveKey("position"))), s.currentMap(i.patron.create(r.receiveKey("map"))), r.result(
      i.patron.create(
        i.guest.create(({ position: o, size: c, map: a }) => {
          const h = Object.values(a.objects);
          xe("objects come to result", h);
          const l = h.filter((d) => {
            const p = a.types[d.type] ?? {}, y = {
              width: d.width || p.width,
              height: d.height || p.height
            };
            return this.isInBounding(o, c, d.position, y);
          });
          xe("visible objects calculated", l), this.visibleObjectsCache.give(l);
        })
      )
    );
  }
  objects(e) {
    return this.visibleObjectsCache.value(e), this;
  }
  isInBounding(e, t, s, i) {
    const r = e.x, o = e.x - t.width, c = e.y, a = e.y - t.height, [h, l] = s;
    return xe("bounding vars", r, o, c, a), xe("object position", s), r > -h - i.width && -h > o && c > -l - i.height && -l > a;
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
        const i = t.types[s.type], r = /\$\{([a-zA-Z1-9]+)\}/g, c = Gr(i.svg, r).filter((a) => a !== "width" && a !== "height");
        s.additionalFields = Yr(c, s.additionalFields ?? {}), this.mapObject.give(s);
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
    const p = h && a >= 0, y = !h && c >= 0, g = h && a < 0, x = !h && c < 0, v = { x: 0, y: 0 };
    let k = 0, B = 0;
    p ? (l += Math.round(e.width / 2), v.x = l, v.y = (t.y + i.y + s.height) / 2, k = i.x > t.x ? 1 : -1) : x ? (d += Math.round(e.height / 2), l += +e.width, v.x = (t.x + e.width + i.x) / 2, v.y = d, B = i.y > t.y ? 1 : -1) : g ? (l += Math.round(e.width / 2), d += +e.height, v.x = l, v.y = (t.y + e.height + i.y) / 2, k = i.x > t.x ? 1 : -1) : y && (d += Math.round(e.height / 2), v.x = (t.x + i.x + s.width) / 2, v.y = d, B = i.y > t.y ? 1 : -1);
    const Q = [l, d].join("-"), R = this.filledPoints.get(Q) || 0;
    return this.filledPoints.set(Q, R + 1), {
      point: { x: l, y: d },
      breakPoint: v,
      shift: {
        x: k * R * 10,
        y: B * R * 10
      }
    };
  }
}
class Zr {
  constructor(e, t) {
    this.objectsSource = e, this.objectsMapSource = t;
  }
  value(e) {
    const t = new Ke();
    return this.objectsSource.value(new W(e, t.receiveKey("objects"))), this.objectsMapSource.value(new W(e, t.receiveKey("objectsMap"))), t.result(
      new W(
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
          }), K(r, e);
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
      new W(e, (t) => {
        if (t.type !== "threeBreaks")
          return;
        const s = this.points(t.fromObject, t.toObject), i = this.points(t.toObject, t.fromObject);
        K({
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
    const l = c && o >= 0, d = !c && r >= 0, p = c && o < 0, y = !c && r < 0, g = { x: 0, y: 0 };
    return l ? (a += Math.round(e.width / 2), g.x = a, g.y = (e.position[1] + t.position[1] + t.height) / 2, t.position[0] > e.position[0]) : y ? (h += Math.round(e.height / 2), a += +e.width, g.x = (e.position[0] + e.width + t.position[0]) / 2, g.y = h, t.position[1] > e.position[1]) : p ? (a += Math.round(e.width / 2), h += +e.height, g.x = a, g.y = (e.position[1] + e.height + t.position[1]) / 2, t.position[1] > e.position[1]) : d && (h += Math.round(e.height / 2), g.x = (e.position[0] + t.position[0] + t.width) / 2, g.y = h, t.position[1] > e.position[1]), {
      point: { x: a, y: h },
      breakPoint: g,
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
      new W(e, (t) => {
        t.type === "twoBreaks" && K({
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
      new W(e, ({ fromObject: t, toObject: s }) => {
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
        K({
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
      new W(e, (t) => {
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
        }), K(s, e);
      })
    ), this;
  }
}
const He = 15;
class io {
  constructor(e) {
    $(this, "pointGroups");
    this.basePoints = e, this.pointGroups = new so(e);
  }
  value(e) {
    const t = new Ke();
    return this.pointGroups.value(new W(e, t.receiveKey("pointGroups"))), this.basePoints.value(new W(e, t.receiveKey("basePoints"))), t.result(
      new W(e, ({ pointGroups: s, basePoints: i }) => {
        Object.values(s).forEach((r) => {
          if (r.length <= 1)
            return;
          r.sort((a, h) => i[h.arrowIndex].points[h.pointEndIndex] - i[a.arrowIndex].points[a.pointEndIndex]);
          let o = 0, c = 0;
          r.forEach((a, h) => {
            const l = i[a.arrowIndex].points[a.pointStartIndex], d = i[a.arrowIndex].points[a.pointStartIndex + 1], p = i[a.arrowIndex].points[a.pointEndIndex], y = i[a.arrowIndex].points[a.pointEndIndex + 1], g = i[a.arrowIndex].points[a.breakPointStartIndex], x = i[a.arrowIndex].points[a.breakPointStartIndex + 1], v = l > g ? -1 : l < g ? 1 : 0, k = d > x ? -1 : d < x ? 1 : 0, B = l > p ? -1 : l < p ? 1 : 0, Q = d > y ? -1 : d < y ? 1 : 0;
            if (v !== 0) {
              let R = 0;
              h !== 0 && (Q > 0 ? (c += 1, R = c) : (o += 1, R = o)), Q && (i[a.arrowIndex].points[a.pointStartIndex + 1] = i[a.arrowIndex].points[a.pointStartIndex + 1] + R * Q * He), i[a.arrowIndex].points[a.breakPointStartIndex + 1] = i[a.arrowIndex].points[a.breakPointStartIndex + 1] + R * Q * He;
            }
            if (k !== 0) {
              let R = 0;
              h !== 0 && (B > 0 ? (c += 1, R = c) : (o += 1, R = o)), i[a.arrowIndex].points[a.pointStartIndex] = i[a.arrowIndex].points[a.pointStartIndex] + R * B * He, i[a.arrowIndex].points[a.breakPointStartIndex] = i[a.arrowIndex].points[a.breakPointStartIndex] + R * B * He;
            }
          });
        }), K(i, e);
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
        new W(e, (i) => {
          (!t || t === s) && (K(i, e), t = s);
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
    const t = new Ke(), s = new fe(), i = this.targetSourceFactory.create(
      s
    );
    return this.baseSource.value(
      new W(e, (r) => {
        let o = 0;
        const c = () => {
          r[o + 1] !== void 0 ? (o = o + 1, a()) : t.resultArray(e);
        };
        function a() {
          s.give(r[o]), i.value(t.receiveKey("" + o)), i.value(c);
        }
        r[o] !== void 0 ? a() : K([], e);
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
const po = /* @__PURE__ */ ut(ho), { Arrow: fo } = de, go = S.debug("MapObjectsArrows");
class mo {
  constructor(e, t, s, i, r) {
    $(this, "previouslyRenderedArrows", /* @__PURE__ */ new Map());
    this.konvaLayer = e, this.mapFile = t, this.mapDep = s, this.arrowPath = i, this.factories = r, go("draw arrows on canvas");
    const o = this.factories.chain.create();
    this.konvaLayer.layer(this.factories.patron.create(o.receiveKey("layer"))), this.mapFile.currentMap(this.factories.patron.create(o.receiveKey("map"))), this.mapDep.objects(this.factories.patron.create(o.receiveKey("objects"))), o.result(
      this.factories.patron.create(
        this.factories.guest.create(
          po(({ layer: c, map: a, objects: h }) => {
            const l = h.reduce((p, y) => (p[y.id] = y, p), {});
            new io(new ro(new Zr(
              new Me((p) => K(h, p)),
              new Me((p) => K(l, p))
            ), new oo((p) => {
              const y = new to(p);
              return new no([new eo(y), new Xr(y)]);
            }))).value((p) => {
              p.forEach((y) => {
                const g = y.key;
                if (this.previouslyRenderedArrows.has(g)) {
                  const v = this.previouslyRenderedArrows.get(g);
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
                this.previouslyRenderedArrows.set(g, {
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
const _e = S.debug("MapObjectBackground"), yo = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD//gATQ3JlYXRlZCB3aXRoIEdJTVD/4gKwSUNDX1BST0ZJTEUAAQEAAAKgbGNtcwQwAABtbnRyUkdCIFhZWiAH6AAMAAQADQAqAAthY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1kZXNjAAABIAAAAEBjcHJ0AAABYAAAADZ3dHB0AAABmAAAABRjaGFkAAABrAAAACxyWFlaAAAB2AAAABRiWFlaAAAB7AAAABRnWFlaAAACAAAAABRyVFJDAAACFAAAACBnVFJDAAACFAAAACBiVFJDAAACFAAAACBjaHJtAAACNAAAACRkbW5kAAACWAAAACRkbWRkAAACfAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACQAAAAcAEcASQBNAFAAIABiAHUAaQBsAHQALQBpAG4AIABzAFIARwBCbWx1YwAAAAAAAAABAAAADGVuVVMAAAAaAAAAHABQAHUAYgBsAGkAYwAgAEQAbwBtAGEAaQBuAABYWVogAAAAAAAA9tYAAQAAAADTLXNmMzIAAAAAAAEMQgAABd7///MlAAAHkwAA/ZD///uh///9ogAAA9wAAMBuWFlaIAAAAAAAAG+gAAA49QAAA5BYWVogAAAAAAAAJJ8AAA+EAAC2xFhZWiAAAAAAAABilwAAt4cAABjZcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltjaHJtAAAAAAADAAAAAKPXAABUfAAATM0AAJmaAAAmZwAAD1xtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAEcASQBNAFBtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEL/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAAeAB4DAREAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAwUEAAj/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAH1SCMTDaCMTiuCMTDgxDGf/8QAHhAAAgIBBQEAAAAAAAAAAAAAAAMBAgQFExUyMxL/2gAIAQEAAQUCG9TUPHdga2PndgzrxZQ3qah48gsvnUtHILMrKq5f/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAwEBPwEH/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAgEBPwEH/8QAHhAAAgIBBQEAAAAAAAAAAAAAAAECMXIQQUKSsVH/2gAIAQEABj8CFkvdFkVLqzla4v6VLqxXe60WS90WRUipWipCSTvc/8QAIxAAAgADCAMAAAAAAAAAAAAAAAEQUfAhMUGhscHR8RFhcf/aAAgBAQABPyErMkMi0ZW2wylmzHorbYSSX3Vg5wrMkMi0Z0a5FVK8Llg05nRrkRmteVg//9oADAMBAAIAAwAAABCCQQSCSST/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAEDAQE/EAf/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAECAQE/EAf/xAAeEAEAAQQCAwAAAAAAAAAAAAABIRARIDEAQVFxkf/aAAgBAQABPxDEMgTA4U0lpO6EwKiFh/YAyDIEAZSTdCnwUQAma0AtZOl88//Z";
class bo {
  constructor(e, t, s, i) {
    $(this, "mapNameCache");
    this.konvaLayer = e, this.mapFile = t, this.zIndex = s, this.factories = i, this.mapNameCache = i.cache.create(""), this.mapFile.currentMap(i.patron.create(this));
  }
  give(e) {
    return this.konvaLayer.layer(
      this.factories.patronOnce.create((t) => {
        _e("map received in background", e), this.mapNameCache.value(
          this.factories.guest.create((s) => {
            if (s === e.url)
              return;
            _e("background cache is not equals", s), this.mapNameCache.give(e.url);
            const i = new Image(), r = document.querySelector(".grid-example");
            _e("grid example", r), i.src = yo, i.onload = () => {
              _e("canvas pattern loaded"), _e("konva layer loaded");
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
const Yt = S.debug("Drawer");
class _o {
  constructor(e, t) {
    $(this, "drawerNameCache");
    this.keyboard = e, this.factories = t, this.drawerNameCache = t.cache.create(""), this.keyboard.pressed(
      this.factories.patron.create(
        this.factories.guest.create((s) => {
          Yt("new key in drawer", s), s === "Escape" && this.give("");
        })
      )
    );
  }
  isOpenedByName(e, t) {
    return this.drawerNameCache.value(
      this.factories.guestInTheMiddle.create(t, (s) => {
        Yt("new drawer name", s), t.give(s === e);
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
const qt = S.debug("app:MiniMap"), Jt = 130;
class Fo {
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
          qt("minimap points", p), this.thePoints.give(p);
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
        qt("scaled position is", o), e.give(o);
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
class Mo {
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
class So {
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
const $e = S.debug("ObjectGeometryFix");
class To {
  constructor(e, t, s, i) {
    $(this, "innerReceive");
    this.mapFile = t, this.map = s, this.factories = i, e.objects(i.patron.create(this)), this.innerReceive = be((r) => {
      this.mapFile.currentMap(
        this.factories.guest.create((o) => {
          $e("objects to fix", r);
          const c = document.querySelectorAll(".objects-container .rendered-object"), a = o.objects;
          let h = !1;
          c.forEach((l) => {
            const d = l.getAttribute("data-object-id");
            if ($e("i see id", d), !d)
              return;
            const p = a[d];
            if (p && ($e("dom object geometry", l.clientWidth, l.clientHeight), $e("saved object geometry", p.width, p.height), (p.width !== l.clientWidth || p.height !== l.clientHeight) && (h = !0, $e("update object geometry"), p.width = l.clientWidth, p.height = l.clientHeight), !p.width || !p.height)) {
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
const ke = S.debug("MapObjectsRectsPatron");
class Io {
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
              ke("rerender object rects"), this.previouslyRenderedRects.forEach((c) => {
                c.hide();
              }), e.forEach((c) => {
                const a = r.types[c.type], h = +c.width || +a.width || 100, l = +c.height || +a.height || 100;
                if (this.previouslyRenderedRects.has(c)) {
                  const p = this.previouslyRenderedRects.get(c);
                  p.width(h), p.height(l), p.x(+c.position[0]), p.y(+c.position[1]), p.show();
                  return;
                }
                ke("rect object", c, a);
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
                  ke("drag ended"), this.objectPosition.position(
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
                  ke("dragmove works", d.x(), d.y()), t.getStage().container().style.cursor = "move", this.objectPosition.position(
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
                  ke("object clicked with id", c.id), this.mapObjectCurrent.give(c.id);
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
const Bo = S.debug("StagePosition");
class Oo {
  constructor(e) {
    this.stageMove = e;
  }
  give(e) {
    return Bo("received position", e), this.stageMove.move(e), this;
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
const Xt = S.debug("Zindex");
class Eo {
  constructor(e) {
    $(this, "fnsCache");
    this.factories = e, this.fnsCache = e.cache.create([]), this.fnsCache.value(
      e.patron.create(
        e.guest.create(
          be((t) => {
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
const Ro = S.debug("Cursor");
class Ho {
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
      Ro("move cursor fired", r), this.cursorPool.give(r);
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
const Ne = S.debug("ControlCombo");
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
const Fe = S.debug("Keyboard");
class Uo {
  constructor(e) {
    $(this, "pressedPool");
    $(this, "combinationsPool");
    Fe("keyboard created"), this.pressedPool = e.pool.create(this), this.combinationsPool = e.pool.create(this), window == null || window.addEventListener("keyup", (t) => {
      Fe("keyboard pressed", t.key), this.pressedPool.give(t.key);
    }), Ps({
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
const ts = S.debug("app:konva:KonvaLayer");
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
const Qo = S.debug("position");
class Wo {
  constructor(e, t, s, i, r) {
    this.layer = e, this.canvas = t, this.stageSize = s, this.stageMoveRestriction = i, this.factories = r;
  }
  move(e) {
    Qo("move stage to new point", e.position), this.stageSize.value(
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
const _ = J(), Ge = new Uo(_), ms = new Be({
  readonly: !1,
  presets: {}
}), Ko = new Mo(Ge, _), vs = new _o(Ge, _), Ye = new So(_), ue = new hn(_), As = _.sourceEmpty.create(), V = new mn(As, ue, _), Go = new pn(V), Yo = new ii(Go), pt = new An(V, ue, _), ft = new us(pt, ue, _), qo = new ds(ft, pt, _), te = new us(V, ue, _), Jo = new Me((n) => {
  V.currentMap(new ze(n));
}), qe = new yn(vs, _), Zo = new Pr(_), Xo = new Or(V, te, _), ge = new Do(_), me = new Qr(), ys = new Wr(ge, me, _), se = new zo(ge, me, ys, _), ea = new Eo(_), ta = new bo(se, V, ea, _), we = new ds(te, V, _), sa = new _n(
  te,
  V,
  [new dt(Ye, new bn(V, _), _)],
  _
), ia = new Lo(se, _), na = new wn(te, we, ge, ia, _), bs = new Nr(V, _), ws = new Rr(
  te,
  V,
  [
    new dt(
      Ye,
      new Vr(bs, _),
      _
    )
  ],
  _
), ra = new Dr(
  te,
  V,
  [new dt(Ye, bs, _)],
  _
), oa = new Er(ws), Je = new Kr(se, ge, pt, _), aa = new To(
  Je,
  V,
  te,
  _
), ca = new Io(
  se,
  V,
  we,
  Je,
  qe,
  qo,
  new Ir(new Tr(me, _), _),
  ms,
  _
), la = new Ho(se, _), ua = new xo(Je, la, _), Cs = new Jr(), xs = new Ao(se, ua, Cs, _), da = new mo(se, V, ft, Cs, _), ha = new Fo(ft, se, me, _), pa = new kn(
  qe,
  te,
  we,
  xs,
  _
), fa = new jo(V, ge, se, _), ga = new qr(
  qe,
  V,
  we,
  _
), ma = new gn(V, ue, _), va = new xn(we), Aa = new $o(), gt = new Cn(ue, _), ya = new Co(gt, V, _), ba = new Fr(ue, _), wa = new Ur(gt, V, _), Ca = new Vo(Ge, _), xa = new ko(V, _), _s = new Wo(se, ge, me, ys, _), _a = new Oo(_s), $a = new Po(_s, _), ka = new zr(te, _), Fa = new fn(V, te, ue, _), Ma = new Br(te, me, se, _), $s = new fe();
new No($s);
const Sa = {
  mapCurrentID: ue,
  mapFile: V,
  mapCurrent: te,
  mapCurrentSource: Jo,
  mapRemoved: ma,
  mapSettings: Xo,
  mapObject: we,
  mapObjectRemoved: sa,
  mapType: ws,
  mapTypeRemoved: ra,
  mapTypeNew: oa,
  mapObjectsVisible: Je,
  mapObjectCurrent: qe,
  mapObjectNew: na,
  mapObjectsLink: pa,
  mapTypeCurrent: Zo,
  mapRects: ca,
  mapBackground: ta,
  mapObjectArrows: da,
  mapObjectsGeometryFix: aa,
  canvas: ge,
  miniMap: ha,
  notification: Ye,
  modal: Ko,
  drawer: vs,
  konvaLayer: se,
  resizing: fa,
  objectAdditionalFieldsFix: ga,
  mapObjectRelationRemoved: va,
  fps: Aa,
  breadcrumbs: ya,
  mapObjectUrl: ba,
  keyboard: Ge,
  parentNames: gt,
  parentTypes: wa,
  controlCombo: Ca,
  menu: xa,
  stagePosition: _a,
  stagePositionByObjectId: $a,
  objectsMatchedToQuery: ka,
  stageSize: me,
  mapHistory: Fa,
  fileContent: As,
  newArrow: xs,
  objectsOutsideScreen: Ma,
  settings: ms,
  documentTitle: Yo,
  sidebarDraggable: $s
}, U = () => Sa;
class I {
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
const Ta = { key: 0 }, Ia = { class: "flex-grow overflow-y-auto" }, ja = {
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
    const t = n, s = e, i = Te(() => ["e2e-drawer-back absolute z-10 top-0 left-0 w-full h-full bg-black/50"]), r = {
      ltr: "top-0 left-0 w-[50%] max-w-[900px] ",
      rtl: "top-0 right-0 w-[50%] max-w-[900px] ",
      ttb: "top-0 right-0 left-0",
      btt: "top-auto h-[900px] max-h-[50%] bottom-0 right-0 left-0"
    }, { drawer: o } = U(), c = () => {
      o.give(""), s("close");
    }, a = o.isOpenedByName(t.name, new I()).ref();
    return (h, l) => (f(), L(ns, { name: "fade" }, {
      default: w(() => [
        u(a) ? (f(), A("div", {
          key: 0,
          class: ce(i.value),
          onClick: c
        }, [
          b("div", {
            class: ce(["absolute bg-white h-full p-3 flex flex-col overflow-hidden", r[n.direction]]),
            onClick: l[0] || (l[0] = ye(() => {
            }, ["stop"]))
          }, [
            h.$slots.header ? (f(), A("div", Ta, [
              ee(h.$slots, "header", { class: "BaseDrawer-Header" })
            ])) : j("", !0),
            b("div", Ia, [
              ee(h.$slots, "default")
            ]),
            h.$slots.footer ? (f(), A("div", ja, [
              ee(h.$slots, "footer")
            ])) : j("", !0)
          ], 2)
        ], 2)) : j("", !0)
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
      "fa-bars": Rs,
      "fa-text-width": Hs,
      "fa-search": Ns,
      "fa-history": Vs,
      "fa-plus-square": Us,
      "fa-cog": zs,
      "fa-file-text": Ls,
      "fa-rotate-left": Qs,
      "fa-rotate-right": Ws,
      "fa-map": Ks,
      "fa-close": Gs,
      "fa-arrow-left": Ys,
      "fa-arrow-right": qs,
      "fa-arrow-down": Js,
      "fa-arrow-up": Zs
    };
    return (t, s) => (f(), L(u(Ds), {
      icon: e[n.icon]
    }, null, 8, ["icon"]));
  }
}), Ba = /* @__PURE__ */ b("h2", { class: "text-lg font-bold" }, " Карты в файле ", -1), Oa = ["onClick"], Pa = /* @__PURE__ */ D({
  __name: "AppFileMaps",
  setup(n) {
    const {
      mapFile: e,
      mapCurrentID: t,
      drawer: s,
      mapRemoved: i
    } = U(), r = e.mapFile(new I()).ref(), o = t.id(new I()).ref(), c = (a) => {
      confirm("Вы уверены?") && i.give(a);
    };
    return (a, h) => (f(), L(mt, {
      direction: "rtl",
      name: "fileMaps"
    }, {
      header: w(() => [
        Ba
      ]),
      default: w(() => [
        b("div", null, [
          (f(!0), A(z, null, G(u(r), (l, d) => (f(), A("div", {
            key: d,
            class: "flex items-center gap-2"
          }, [
            b("a", {
              href: "#",
              class: ce({ "font-bold": u(o) === d }),
              onClick: ye((p) => {
                u(t).give(d), u(s).give("");
              }, ["prevent"])
            }, C(l.settings.title), 11, Oa),
            m(q, {
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
    } = U(), { guest: r, patron: o } = J(), c = s.menuObjects(new I()).ref();
    return e.happened(
      "KeyM",
      o.create(r.create(() => {
        t.give("menu");
      }))
    ), (a, h) => (f(), L(mt, {
      direction: "rtl",
      name: "menu"
    }, {
      default: w(() => [
        b("div", Ea, [
          u(c).length ? (f(), A("div", Ra, [
            (f(!0), A(z, null, G(u(c), (l) => (f(), A("a", {
              key: l.id,
              class: "AppMenuObject-Item",
              href: "#",
              onClick: ye((d) => {
                u(i).give(l), u(t).give("");
              }, ["prevent"])
            }, [
              b("span", {
                innerHTML: l.additionalName ? l.additionalName : l.name
              }, null, 8, Na)
            ], 8, Ha))), 128))
          ])) : (f(), A("div", Da, C(a.$t("appMenuObject.noItems")), 1))
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
    const { modal: e } = U(), t = n, s = e.isOpenedByName(t.name, new I()).ref(), i = [], r = () => {
      e.give("");
    };
    return (o, c) => (f(), L(ns, { name: "fade" }, {
      default: w(() => [
        u(s) ? (f(), A("div", {
          key: 0,
          class: "absolute rounded-main overflow-y-auto flex justify-center items-center top-0 left-0 bg-black/10 z-20 h-full w-full",
          onClick: r
        }, [
          b("div", {
            class: "w-full relative flex flex-col max-w-[800px] max-h-[90%] bg-white p-3",
            onClick: c[0] || (c[0] = ye(() => {
            }, ["stop"]))
          }, [
            i.length > 1 ? (f(), A("div", Ua, " < ")) : j("", !0),
            b("div", {
              title: "Закрыть",
              class: "e2e-modal-close absolute text-white right-0 top-0 -mr-5 flex justify-center items-center bg-danger/70 hover:bg-danger-second/70 cursor-pointer w-5",
              onClick: r
            }, " × "),
            o.$slots.header ? (f(), A("div", za, [
              ee(o.$slots, "header")
            ])) : j("", !0),
            b("div", La, [
              ee(o.$slots, "default")
            ]),
            o.$slots.footer ? (f(), A("div", Qa, [
              ee(o.$slots, "footer")
            ])) : j("", !0)
          ])
        ])) : j("", !0)
      ]),
      _: 3
    }));
  }
}), Wa = { class: "AppPresets" }, Ka = /* @__PURE__ */ b("div", { class: "text-md font-bold mb-2" }, "Общие", -1), Ga = { class: "flex flex-col gap-2" }, Ya = { class: "text-md font-bold mb-1" }, qa = { class: "flex gap-2 flex-wrap items-end" }, Ja = { class: "AppTypesParent-ItemTitle" }, Za = ["innerHTML"], Xa = /* @__PURE__ */ D({
  __name: "AppPresets",
  setup(n) {
    const {
      svgMapTypeImage: e
    } = J(), { mapType: t, settings: s } = U(), i = new I();
    s.value(i);
    const r = Te(
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
    return (o, c) => (f(), L(ve, { name: "presets" }, {
      default: w(() => [
        b("div", Wa, [
          Ka,
          b("div", Ga, [
            (f(!0), A(z, null, G(r.value, (a, h) => (f(), A("div", { key: h }, [
              b("h3", Ya, C(h), 1),
              b("div", qa, [
                (f(!0), A(z, null, G(a, (l) => (f(), A("div", {
                  key: l.preset.name,
                  class: "flex flex-col gap-2"
                }, [
                  b("div", Ja, C(l.preset.name), 1),
                  b("div", {
                    class: "AppTypesParent-ItemImage",
                    innerHTML: l.image,
                    style: ae(`width:${l.preset.width}px;height:${l.preset.height}px`)
                  }, null, 12, Za),
                  m(E, {
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
    Ie(
      i,
      be(() => {
        t.autofocus && i.value.focus();
      }, 500)
    );
    const r = Qe(t, "modelValue", s);
    return (o, c) => Le((f(), A("input", {
      ref_key: "input",
      ref: i,
      "onUpdate:modelValue": c[0] || (c[0] = (a) => je(r) ? r.value = a : null),
      class: "block rounded-main w-full p-2 border border-solid border-body-dark",
      type: "text"
    }, null, 512)), [
      [rs, u(r)]
    ]);
  }
});
class vt {
  constructor(e) {
    $(this, "pool", new We(this));
    this.refSource = e, Ie(
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
    } = U(), { guest: r, patron: o } = J(), c = ie(), a = S.debug("app:AppSearch");
    s.isOpenedByName(
      "search",
      o.create(r.create((d) => {
        setTimeout(() => {
          d && c.value && (a("search is opened", d), c.value.$el.focus());
        }, 500);
      }))
    );
    const h = ie(""), l = e.objects(
      new vt(h),
      new I([])
    ).ref();
    return t.happened(
      "KeyF",
      o.create(r.create(() => {
        s.give("search");
      }))
    ), (d, p) => (f(), L(ve, { name: "search" }, {
      default: w(() => [
        b("div", ec, [
          m(oe, {
            ref_key: "inputRef",
            ref: c,
            modelValue: h.value,
            "onUpdate:modelValue": p[0] || (p[0] = (y) => h.value = y),
            class: "mb-2 e2e-query-input",
            placeholder: d.$t("general.specifyQuery")
          }, null, 8, ["modelValue", "placeholder"]),
          u(l).length ? (f(), A("div", tc, [
            (f(!0), A(z, null, G(u(l), (y) => (f(), A("div", {
              key: y.name,
              class: "cursor-pointer",
              onClick: ye((g) => {
                u(i).give(y), u(s).give("");
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
              }, null, 8, nc)) : j("", !0),
              y.additionalFields ? (f(), A("div", {
                key: 1,
                innerHTML: Object.values(y.additionalFields).join(" ")
              }, null, 8, rc)) : j("", !0)
            ], 8, sc))), 128))
          ])) : h.value ? (f(), A("div", oc, C(d.$t("general.noResults")), 1)) : (f(), A("div", ac, C(d.$t("general.resultsWillBeHere")), 1))
        ])
      ]),
      _: 1
    }));
  }
}), lc = { class: "AppTypes" }, uc = /* @__PURE__ */ b("div", { class: "text-md font-bold mb-2" }, "Родительские типы", -1), dc = { class: "flex gap-2 items-end" }, hc = { class: "AppTypesParent-ItemTitle" }, pc = ["innerHTML"], fc = /* @__PURE__ */ D({
  __name: "AppTypesParent",
  setup(n) {
    const { parentTypes: e, mapType: t } = U(), { svgMapTypeImage: s } = J(), i = e.types(new I()).ref(), r = Te(() => {
      var o;
      return (o = i.value) == null ? void 0 : o.map((c) => ({
        type: c,
        image: s.create(c).markup()
      })).sort((c, a) => +(c.type.name >= a.type.name));
    });
    return (o, c) => (f(), L(ve, { name: "parentTypes" }, {
      default: w(() => [
        b("div", lc, [
          uc,
          b("div", dc, [
            (f(!0), A(z, null, G(r.value, (a) => (f(), A("div", {
              key: a.type.name,
              class: "flex flex-col gap-2"
            }, [
              b("div", hc, C(a.type.name), 1),
              b("div", {
                class: "AppTypesParent-ItemImage",
                innerHTML: a.image,
                style: ae(`width:${a.type.width}px;height:${a.type.height}px`)
              }, null, 12, pc),
              m(E, {
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
class ks {
  constructor(e, t = void 0) {
    $(this, "innerRef");
    this.executor = e, this.innerRef = ie(t);
  }
  ref() {
    return this.executor(this.innerRef), this.innerRef;
  }
}
const gc = { class: "flex gap-2" }, ot = /* @__PURE__ */ D({
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
    const i = Qe(n, "modelValue", e);
    return (r, o) => (f(), A("label", gc, [
      Le(b("input", {
        "onUpdate:modelValue": o[0] || (o[0] = (c) => je(i) ? i.value = c : null),
        type: "checkbox"
      }, null, 512), [
        [Ts, u(i)]
      ]),
      r.$slots.default ? ee(r.$slots, "default", { key: 0 }) : (f(), A(z, { key: 1 }, [
        O(C(n.label), 1)
      ], 64))
    ]));
  }
}), Ze = (n, e) => {
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
const Y = /* @__PURE__ */ Ze(mc, [["render", Ac]]), yc = {}, bc = { class: "mb-2" };
function wc(n, e) {
  return f(), A("div", bc, [
    ee(n.$slots, "default")
  ]);
}
const X = /* @__PURE__ */ Ze(yc, [["render", wc]]), Cc = { class: "rounded-main p-2 border border-solid border-body-dark" }, xc = { class: "flex gap-2 p-2 bg-white border border-solid border-body-dark rounded-main" }, Ve = /* @__PURE__ */ D({
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
    return Is(() => {
      var r;
      (r = i.value) == null || r.destroy();
    }), Ie(() => t.modelValue, (r) => {
      !i.value || i.value.getHTML() === r || i.value.commands.setContent(r, !1);
    }), (r, o) => (f(), A("div", Cc, [
      m(u(ei), { editor: u(i) }, null, 8, ["editor"]),
      u(i) ? (f(), L(u(ti), {
        key: 0,
        editor: u(i),
        "tippy-options": { duration: 100 }
      }, {
        default: w(() => [
          b("div", xc, [
            b("button", {
              onClick: o[0] || (o[0] = (c) => u(i).chain().focus().toggleBold().run()),
              class: ce({ "font-bold": u(i).isActive("bold") })
            }, " bold ", 2),
            b("button", {
              onClick: o[1] || (o[1] = (c) => u(i).chain().focus().toggleItalic().run()),
              class: ce({ "font-bold": u(i).isActive("italic") })
            }, " italic ", 2),
            b("button", {
              onClick: o[2] || (o[2] = (c) => u(i).chain().focus().toggleStrike().run()),
              class: ce({ "font-bold": u(i).isActive("strike") })
            }, " strike ", 2)
          ])
        ]),
        _: 1
      }, 8, ["editor"])) : j("", !0)
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
    const t = n, i = Qe(t, "modelValue", e);
    return (r, o) => Le((f(), A("select", {
      label: "select",
      "onUpdate:modelValue": o[0] || (o[0] = (c) => je(i) ? i.value = c : null),
      class: "block bg-white rounded-main w-full p-2 border border-solid border-body-dark"
    }, [
      (f(!0), A(z, null, G(t.items, (c) => (f(), A("option", {
        key: c[t.optionId],
        value: c[t.optionId]
      }, C(c[t.optionLabel]), 9, _c))), 128))
    ], 512)), [
      [js, u(i)]
    ]);
  }
}), kc = { class: "text-lg font-bold" }, Fc = {
  key: 0,
  class: "flex gap-2 items-center"
}, Mc = {
  key: 1,
  class: "flex gap-2 mt-2"
}, Sc = { key: 0 }, Tc = { key: 1 }, Ic = {
  key: 0,
  class: "flex flex-col gap-2"
}, jc = { class: "FormObject-Inner" }, Bc = { class: "FormObject-Row" }, Oc = { class: "FormObject-Row" }, Pc = { class: "FormObject-Row" }, Ec = { class: "my-2" }, Dc = { class: "FormObject-Title" }, Rc = { class: "FormObject-Row" }, Hc = { class: "FormObject-Title" }, Nc = { class: "FormObject-Row" }, Vc = {
  key: 0,
  class: "FormObject-ArrowName"
}, Uc = { class: "py-3 flex gap-1" }, zc = /* @__PURE__ */ D({
  __name: "FormObject",
  setup(n) {
    const e = cs("FormObject"), {
      mapObjectCurrent: t,
      mapFile: s,
      mapObject: i,
      mapCurrent: r,
      drawer: o,
      mapObjectRemoved: c,
      mapObjectRelationRemoved: a,
      mapObjectUrl: h,
      controlCombo: l
    } = U(), {
      patron: d,
      chain: p,
      guest: y
    } = J(), g = new ks(() => {
      const T = p.create();
      t.objectId(d.create(T.receiveKey("objectId"))), s.currentMap(d.create(T.receiveKey("map"))), T.result(d.create(
        y.create(({ map: M, objectId: F }) => {
          e("object opened", F), g.value = M.objects[F];
        })
      ));
    }).ref(), x = r.types(new I()).ref(), v = s.currentMap(new I()).ref(), k = new vt(g), B = h.url(k, new I()).ref(), Q = () => {
      t.give(""), o.give("");
    }, R = () => {
      c.give(g.value), Q();
    }, ne = () => {
      i.give({
        ...g.value,
        outlink: g.value.outlink || B.value
      }), Q();
    }, P = (T) => {
      a.give({
        index: T,
        object: g.value
      });
    };
    return l.happenedConditional(
      "KeyS",
      o.openedByName("object"),
      d.create(y.create(ne))
    ), (T, M) => (f(), L(mt, {
      name: "object",
      onClose: Q
    }, {
      header: w(() => [
        b("h2", kc, C(T.$t("general.mapObject")), 1),
        u(g) ? (f(), A("small", Fc, [
          b("span", null, " ID #" + C(u(g).id), 1)
        ])) : j("", !0),
        u(g) ? (f(), A("div", Mc, [
          u(g).createTimestamp ? (f(), A("div", Sc, " Создан: " + C(new Date(u(g).createTimestamp).toLocaleString()), 1)) : j("", !0),
          u(g).changeTimestamp ? (f(), A("div", Tc, " Изменен: " + C(new Date(u(g).changeTimestamp).toLocaleString()), 1)) : j("", !0)
        ])) : j("", !0)
      ]),
      footer: w(() => [
        b("div", Uc, [
          m(E, {
            type: "success",
            onClick: ne
          }, {
            default: w(() => [
              O(C(T.$t("general.save")), 1)
            ]),
            _: 1
          }),
          m(E, {
            type: "danger",
            onClick: R
          }, {
            default: w(() => [
              O(C(T.$t("general.delete")), 1)
            ]),
            _: 1
          }),
          m(E, { onClick: Q }, {
            default: w(() => [
              O(C(T.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: w(() => [
        u(g) ? (f(), A("div", Ic, [
          b("div", jc, [
            b("div", Bc, [
              m(ot, {
                modelValue: u(g).linked,
                "onUpdate:modelValue": M[0] || (M[0] = (F) => u(g).linked = F),
                label: T.$t("general.nameAsLink")
              }, null, 8, ["modelValue", "label"])
            ]),
            u(g).linked ? (f(), A(z, { key: 0 }, [
              m(Y, null, {
                default: w(() => [
                  O(C(T.$t("general.outerLink")), 1)
                ]),
                _: 1
              }),
              b("div", Oc, [
                m(oe, {
                  "model-value": u(g).outlink || u(B),
                  "onUpdate:modelValue": M[1] || (M[1] = (F) => u(g).outlink = F)
                }, null, 8, ["model-value"])
              ]),
              b("div", Pc, [
                m(ot, {
                  modelValue: u(g).targetBlank,
                  "onUpdate:modelValue": M[2] || (M[2] = (F) => u(g).targetBlank = F),
                  label: T.$t("general.inNewTab")
                }, null, 8, ["modelValue", "label"])
              ])
            ], 64)) : j("", !0),
            (f(!0), A(z, null, G(u(g).additionalFields, (F, Z) => (f(), L(X, {
              class: "mb-2",
              key: Z
            }, {
              default: w(() => [
                m(Y, { class: "mb-1" }, {
                  default: w(() => [
                    O(C(Z), 1)
                  ]),
                  _: 2
                }, 1024),
                m(Ve, {
                  modelValue: u(g).additionalFields[Z],
                  "onUpdate:modelValue": (le) => u(g).additionalFields[Z] = le
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              _: 2
            }, 1024))), 128)),
            m(X, null, {
              default: w(() => [
                m(Y, null, {
                  default: w(() => [
                    O(C(T.$t("general.topName")), 1)
                  ]),
                  _: 1
                }),
                m(Ve, {
                  modelValue: u(g).additionalName,
                  "onUpdate:modelValue": M[3] || (M[3] = (F) => u(g).additionalName = F)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            m(X, null, {
              default: w(() => [
                m(Y, null, {
                  default: w(() => [
                    O(C(T.$t("general.bottomName")), 1)
                  ]),
                  _: 1
                }),
                m(Ve, {
                  modelValue: u(g).name,
                  "onUpdate:modelValue": M[4] || (M[4] = (F) => u(g).name = F)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            m(X, null, {
              default: w(() => [
                m(Y, null, {
                  default: w(() => [
                    O(C(T.$t("general.description")), 1)
                  ]),
                  _: 1
                }),
                m(Ve, {
                  modelValue: u(g).description,
                  "onUpdate:modelValue": M[5] || (M[5] = (F) => u(g).description = F)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            m(X, null, {
              default: w(() => [
                m(Y, null, {
                  default: w(() => [
                    O(" Z-Index ")
                  ]),
                  _: 1
                }),
                m(oe, {
                  modelValue: u(g).zindex,
                  "onUpdate:modelValue": M[6] || (M[6] = (F) => u(g).zindex = F),
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            m(X, null, {
              default: w(() => [
                m(Y, null, {
                  default: w(() => [
                    O(" Width ")
                  ]),
                  _: 1
                }),
                m(oe, {
                  modelValue: u(g).width,
                  "onUpdate:modelValue": M[7] || (M[7] = (F) => u(g).width = F),
                  step: "20",
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            m(X, null, {
              default: w(() => [
                m(Y, null, {
                  default: w(() => [
                    O(" Height ")
                  ]),
                  _: 1
                }),
                m(oe, {
                  modelValue: u(g).height,
                  "onUpdate:modelValue": M[8] || (M[8] = (F) => u(g).height = F),
                  step: "20",
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            m(X, null, {
              default: w(() => [
                m(Y, null, {
                  default: w(() => [
                    O(C(T.$t("general.objectType")), 1)
                  ]),
                  _: 1
                }),
                m($c, {
                  modelValue: u(g).type,
                  "onUpdate:modelValue": M[9] || (M[9] = (F) => u(g).type = F),
                  items: u(x),
                  "option-id": "id",
                  "option-label": "name"
                }, null, 8, ["modelValue", "items"])
              ]),
              _: 1
            }),
            b("div", Ec, [
              m(ot, {
                modelValue: u(g).inMenu,
                "onUpdate:modelValue": M[10] || (M[10] = (F) => u(g).inMenu = F),
                label: T.$t("general.useInMenu")
              }, null, 8, ["modelValue", "label"])
            ]),
            u(g).inMenu ? (f(), A(z, { key: 1 }, [
              b("div", Dc, C(T.$t("general.menuOrder")), 1),
              b("div", Rc, [
                m(oe, {
                  modelValue: u(g).menuOrder,
                  "onUpdate:modelValue": M[11] || (M[11] = (F) => u(g).menuOrder = F),
                  type: "number"
                }, null, 8, ["modelValue"])
              ])
            ], 64)) : j("", !0),
            u(g).arrows && u(g).arrows.length ? (f(), A(z, { key: 2 }, [
              b("div", Hc, C(T.$t("general.relations")), 1),
              b("div", Nc, [
                (f(!0), A(z, null, G(u(g).arrows, (F, Z) => {
                  var le;
                  return f(), A("div", {
                    key: F.id,
                    class: "FormObject-Arrow"
                  }, [
                    (le = u(v)) != null && le.objects[F.id] ? (f(), A("span", Vc, " #" + C(Z + 1) + " " + C(u(v).objects[F.id].name), 1)) : j("", !0),
                    m(E, {
                      class: "FormObject-ArrowButton",
                      type: "danger",
                      size: "sm",
                      onClick: (Ae) => P(Z)
                    }, {
                      default: w(() => [
                        O(C(T.$t("general.delete")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]);
                }), 128))
              ])
            ], 64)) : j("", !0)
          ])
        ])) : j("", !0)
      ]),
      _: 1
    }));
  }
}), Lc = { class: "BaseTextarea" }, Qc = ["v-bind"], Fs = /* @__PURE__ */ D({
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
    const i = Qe(n, "modelValue", e);
    return (r, o) => (f(), A("div", Lc, [
      Le(b("textarea", {
        ref: "textarea",
        "v-bind": r.$attrs,
        "onUpdate:modelValue": o[0] || (o[0] = (c) => je(i) ? i.value = c : null),
        class: "rounded-main block w-full p-2 border min-h-[200px] border-solid border-body-dark"
      }, null, 8, Qc), [
        [rs, u(i)]
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
      controlCombo: r
    } = U(), { patron: o, chain: c, guest: a } = J();
    e.typeId(
      o.create(a.create((g) => {
        g && i.give("type");
      }))
    );
    const h = ie(""), l = c.create(), d = new ks(() => {
      e.typeId(o.create(l.receiveKey("typeId"))), t.currentMap(o.create(l.receiveKey("map"))), l.result(o.create(
        a.create(({ map: g, typeId: x }) => {
          var v;
          d.value = g.types[x], h.value = (v = d.value) == null ? void 0 : v.name;
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
    ), (g, x) => (f(), L(ve, { name: "type" }, {
      header: w(() => [
        b("h2", Wc, C(g.$t("general.mapType")), 1)
      ]),
      footer: w(() => [
        b("div", Gc, [
          m(E, {
            type: "success",
            onClick: y
          }, {
            default: w(() => [
              O(C(g.$t("general.save")), 1)
            ]),
            _: 1
          }),
          m(E, { onClick: p }, {
            default: w(() => [
              O(C(g.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: w(() => [
        u(d) ? (f(), A("div", Kc, [
          m(X, null, {
            default: w(() => [
              m(Y, null, {
                default: w(() => [
                  O(" Название типа ")
                ]),
                _: 1
              }),
              m(oe, {
                modelValue: u(d).name,
                "onUpdate:modelValue": x[0] || (x[0] = (v) => u(d).name = v)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          m(X, null, {
            default: w(() => [
              m(Y, null, {
                default: w(() => [
                  O(" SVG ")
                ]),
                _: 1
              }),
              m(Fs, {
                modelValue: u(d).svg,
                "onUpdate:modelValue": x[1] || (x[1] = (v) => u(d).svg = v)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          m(X, null, {
            default: w(() => [
              m(Y, null, {
                default: w(() => [
                  O(" Ширина ")
                ]),
                _: 1
              }),
              m(oe, {
                modelValue: u(d).width,
                "onUpdate:modelValue": x[2] || (x[2] = (v) => u(d).width = v)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          m(X, null, {
            default: w(() => [
              m(Y, null, {
                default: w(() => [
                  O(" Высота ")
                ]),
                _: 1
              }),
              m(oe, {
                modelValue: u(d).height,
                "onUpdate:modelValue": x[3] || (x[3] = (v) => u(d).height = v)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          })
        ])) : j("", !0)
      ]),
      _: 1
    }));
  }
}), at = S.debug("MapObjectsWithTemplates");
class qc {
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
const Jc = /* @__PURE__ */ D({
  __name: "BaseNotify",
  setup(n) {
    const { notification: e } = U(), t = e.message(new I()).ref();
    return (s, i) => u(t) && u(t).text !== "hide" ? (f(), A("div", {
      key: 0,
      class: ce(["inline font-bold", `text-${u(t).type}-second`])
    }, C(u(t).text), 3)) : j("", !0);
  }
}), Zc = { class: "relative" }, Xc = { class: "absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-1" }, el = { class: "text-sm z-10 p-2 absolute bottom-0 left-5" }, tl = /* @__PURE__ */ Bs('<div class="absolute bottom-3 shadow-standard-second shadow-md drop-shadow right-3 z-10"><div class="grid-example grid grid-rows-2 grid-cols-2 bg-standard-second border border-standard-second gap-[1px] border-t-0 border-l-0"><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div></div></div><div class="absolute z-30 top-0 left-0 h-[18px] w-[22px] bg-white"></div>', 2), sl = ["title"], il = { class: "font-bold" }, nl = ["title"], rl = { class: "font-bold" }, ol = ["title"], al = { class: "font-bold" }, cl = ["title"], ll = { class: "font-bold" }, ul = ["data-object-id"], dl = { class: "absolute bottom-[100%] left-[50%] translate-x-[-50%] text-center pb-2 pointer-events-auto text-sm w-[300px]" }, hl = ["innerHTML", "onClick"], pl = ["innerHTML"], fl = ["data-object-id", "innerHTML"], gl = /* @__PURE__ */ D({
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
    } = U(), p = J(), y = r.value(new I()).ref(), x = new qc(
      t,
      s,
      p
    ).objects(new I([])).ref(), v = a.value(new I()).ref(), k = i.position(new I()).ref(), B = Te(() => {
      var Ae;
      return (Ae = v.value) == null ? void 0 : Ae.width;
    }), Q = new vt(B), R = p.numberChunks.create(10, Q).chunks(new I()).ref(), ne = ie();
    os(() => {
      e.give(ne.value);
    });
    const P = (Ae) => {
      c.open(Ae, p.guest.create((re) => {
        o.give(re);
      }));
    }, T = h.count(
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
    return (Ae, re) => {
      var At, yt, bt, wt, Ct, xt, _t, $t, kt, Ft, Mt, St;
      return f(), A("div", Zc, [
        b("div", Xc, [
          b("div", el, [
            O(" Видимых объектов: " + C(u(x).length) + ", FPS: " + C(u(y)) + ", ", 1),
            m(Jc)
          ]),
          tl,
          ((At = u(T)) == null ? void 0 : At.count) > 0 ? (f(), A("div", {
            key: 0,
            class: "pointer-events-auto absolute z-30 top-0 left-4 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(yt = u(T)) == null ? void 0 : yt.count} шт. объектов левее`,
            onClick: re[0] || (re[0] = (N) => u(le)(u(T).nearestObjectId))
          }, [
            m(q, { icon: "fa-arrow-left" }),
            b("span", il, C((bt = u(T)) == null ? void 0 : bt.count), 1)
          ], 8, sl)) : j("", !0),
          ((wt = u(M)) == null ? void 0 : wt.count) > 0 ? (f(), A("div", {
            key: 1,
            class: "pointer-events-auto absolute z-30 p-1 top-0 right-0 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(Ct = u(M)) == null ? void 0 : Ct.count} шт. объектов правее`,
            onClick: re[1] || (re[1] = (N) => u(le)(u(M).nearestObjectId))
          }, [
            b("span", rl, C((xt = u(M)) == null ? void 0 : xt.count), 1),
            m(q, { icon: "fa-arrow-right" })
          ], 8, nl)) : j("", !0),
          ((_t = u(F)) == null ? void 0 : _t.count) > 0 ? (f(), A("div", {
            key: 2,
            class: "pointer-events-auto absolute z-30 top-[18px] left-0 w-[18px] bg-white flex flex-col leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${($t = u(F)) == null ? void 0 : $t.count} шт. объектов выше`,
            onClick: re[2] || (re[2] = (N) => u(le)(u(F).nearestObjectId))
          }, [
            m(q, { icon: "fa-arrow-up" }),
            b("span", al, C((kt = u(F)) == null ? void 0 : kt.count), 1)
          ], 8, ol)) : j("", !0),
          ((Ft = u(Z)) == null ? void 0 : Ft.count) > 0 ? (f(), A("div", {
            key: 3,
            class: "pointer-events-auto absolute z-30 p-1 bottom-0 left-0 w-[18px] bg-white flex flex-col-reverse leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(Mt = u(Z)) == null ? void 0 : Mt.count} шт. объектов ниже`,
            onClick: re[3] || (re[3] = (N) => u(le)(u(Z).nearestObjectId))
          }, [
            m(q, { icon: "fa-arrow-down" }),
            b("span", ll, C((St = u(Z)) == null ? void 0 : St.count), 1)
          ], 8, cl)) : j("", !0),
          b("div", {
            class: ce({ "objects-container absolute top-0 left-0": !0 }),
            style: ae({ width: `${u(v).width}px`, height: `${u(v).height}px`, transform: `translate(${u(k).x}px, ${u(k).y}px)` })
          }, [
            b("div", {
              class: "absolute flex top-0 left-0 w-full z-20 h-[20px] bg-default border-b-2 border-border text-right text-sm px-2",
              style: ae({ transform: `translate(0, ${-u(k).y}px)` })
            }, [
              (f(!0), A(z, null, G(u(R), (N) => (f(), A("span", {
                class: "flex-1 text-body-dark",
                key: `horiz_${N}`
              }, C(N) + "px", 1))), 128))
            ], 4),
            b("div", {
              class: "absolute flex [writing-mode:vertical-lr] top-0 left-0 h-full z-20 w-[20px] bg-default border-r-2 border-border text-left text-sm py-2",
              style: ae({ transform: `translate(${-u(k).x}px, 0)` })
            }, [
              (f(!0), A(z, null, G(u(R), (N) => (f(), A("span", {
                class: "flex-1 rotate-180 text-body-dark",
                key: `vert_${N}`
              }, C(N) + "px", 1))), 128))
            ], 4),
            (f(!0), A(z, null, G(u(x), (N) => (f(), A("div", {
              key: N.obj.id,
              class: "absolute z-10",
              "data-object-id": N.obj.id,
              style: ae(`width:${N.obj.width}px;height: ${N.obj.height}px;top: ${N.obj.position[1]}px;left:${N.obj.position[0]}px;z-index:${N.obj.zindex}`)
            }, [
              b("div", dl, [
                b("span", {
                  innerHTML: N.obj.additionalName,
                  class: ce([N.obj.linked && "cursor-pointer underline"]),
                  onClick: (du) => P(N.obj)
                }, null, 10, hl)
              ]),
              b("div", {
                class: "absolute top-[100%] left-[50%] translate-x-[-50%] text-center pt-2 text-sm w-[300px]",
                innerHTML: N.obj.name
              }, null, 8, pl),
              b("div", {
                "data-object-id": N.obj.id,
                class: "rendered-object",
                innerHTML: N.template
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
    } = U(), s = e.list(new I()).ref();
    return (i, r) => (f(), A("div", ml, [
      (f(!0), A(z, null, G(u(s), (o, c) => (f(), A("span", {
        class: "flex gap-2",
        key: o.name
      }, [
        c !== 0 ? (f(), A("span", vl, "/")) : j("", !0),
        c === u(s).length - 1 ? (f(), A("b", Al, "Открыто: " + C(o.title), 1)) : (f(), A("a", {
          key: 2,
          href: "#",
          onClick: ye((a) => u(t).give(o.name), ["prevent"])
        }, C(o.title), 9, yl))
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
      settings: r
    } = U(), { patron: o, guest: c } = J(), a = s.isNextPossible(new I()).ref(), h = s.isPrevPossible(new I()).ref();
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
    return r.value(l), (d, p) => (f(), A("div", wl, [
      m(bl, { class: "TheHeader-Breadcrumbs" }),
      b("div", Cl, [
        u(a) && !u(l).value.readonly ? (f(), L(E, {
          key: 0,
          size: "sm",
          title: "Отменить последнее действие",
          class: "w-7 block",
          onClick: p[0] || (p[0] = (y) => u(s).next())
        }, {
          default: w(() => [
            m(q, { icon: "fa-rotate-left" })
          ]),
          _: 1
        })) : j("", !0),
        u(h) && !u(l).value.readonly ? (f(), L(E, {
          key: 1,
          size: "sm",
          title: "Вернуть отмененное действие",
          class: "w-7 block",
          onClick: p[1] || (p[1] = (y) => u(s).prev())
        }, {
          default: w(() => [
            m(q, { icon: "fa-rotate-right" })
          ]),
          _: 1
        })) : j("", !0),
        m(E, {
          type: "success",
          size: "sm",
          class: "w-7 block e2e-open-menu",
          title: d.$t("general.menu"),
          onClick: p[2] || (p[2] = (y) => u(e).give("menu"))
        }, {
          default: w(() => [
            m(q, { icon: "fa-bars" })
          ]),
          _: 1
        }, 8, ["title"]),
        m(E, {
          title: d.$t("general.byText"),
          type: "primary",
          size: "sm",
          class: "w-7 block",
          onClick: p[3] || (p[3] = (y) => u(t).give("mapAsText"))
        }, {
          default: w(() => [
            m(q, { icon: "fa-text-width" })
          ]),
          _: 1
        }, 8, ["title"]),
        m(E, {
          class: "w-7 block e2e-search",
          size: "sm",
          onClick: p[4] || (p[4] = (y) => u(t).give("search"))
        }, {
          default: w(() => [
            m(q, { icon: "fa-search" })
          ]),
          _: 1
        }),
        m(E, {
          size: "sm",
          title: "Все карты файла",
          class: "w-7 block",
          onClick: p[5] || (p[5] = (y) => u(e).give("fileMaps"))
        }, {
          default: w(() => [
            m(q, { icon: "fa-map" })
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
const Fl = /* @__PURE__ */ Ze(_l, [["render", kl]]), Ml = { class: "flex gap-1" }, Sl = {
  key: 0,
  class: "TheMapAsText select-auto"
}, Tl = ["innerHTML"], Il = /* @__PURE__ */ D({
  __name: "TheMapAsText",
  setup(n) {
    const { mapFile: e, mapCurrent: t } = U(), {
      guest: s,
      patron: i,
      textOf: r,
      textNlAsBr: o,
      textWithoutHTML: c
    } = J(), a = e.currentMap(new I()).ref(), h = ie(""), l = ie([]);
    t.objects(
      i.create(
        s.create(be((v) => {
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
    const { share: d, isSupported: p } = Es(), y = () => {
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
    }, g = ie(), x = () => {
      var v, k;
      if (a.value) {
        const B = new Range();
        B.setStart(g.value, 0), B.setEnd(g.value, Object.values(l.value).length), (v = document.getSelection()) == null || v.removeAllRanges(), (k = document.getSelection()) == null || k.addRange(B);
      }
    };
    return (v, k) => (f(), L(ve, { name: "mapAsText" }, {
      header: w(() => [
        m(Fl, { class: "block mb-3" }, {
          default: w(() => [
            O(C(v.$t("general.mapAsText")) + " ", 1),
            b("div", Ml, [
              m(E, {
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
              m(E, {
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
        u(a) ? (f(), A("article", Sl, [
          b("div", {
            ref_key: "textRef",
            ref: g,
            innerHTML: h.value
          }, null, 8, Tl)
        ])) : j("", !0)
      ]),
      _: 1
    }));
  }
}), jl = { key: 1 }, Bl = /* @__PURE__ */ D({
  __name: "TheMiniMap",
  setup(n) {
    const { miniMap: e } = U(), t = e.points(new I()).ref(), s = e.size(new I()).ref(), i = e.viewportSize(new I()).ref(), r = e.viewportPosition(new I()).ref();
    return (o, c) => u(s) ? (f(), A("div", {
      key: 0,
      style: ae({
        width: `${u(s).width}px`,
        height: `${u(s).height}px`
      }),
      class: "absolute pointer-events-none block bg-white bottom-[10px] mt-3 right-3 z-1 border border-solid border-body-dark"
    }, [
      u(r) ? (f(), A("div", {
        key: 0,
        style: ae({
          width: `${u(i).width}px`,
          height: `${u(i).height}px`,
          top: `${u(r).y}px`,
          left: `${u(r).x}px`
        }),
        class: "absolute bg-primary/50"
      }, null, 4)) : j("", !0),
      u(t) ? (f(), A("div", jl, [
        (f(!0), A(z, null, G(u(t), (a) => (f(), A("div", {
          key: a.id,
          class: "absolute w-1 h-1 block bg-danger",
          style: ae({
            top: `${a.y}px`,
            left: `${a.x}px`,
            width: `${a.width}px`,
            height: `${a.height}px`
          })
        }, null, 4))), 128))
      ])) : j("", !0)
    ], 4)) : j("", !0);
  }
}), Ol = { class: "text-lg font-bold" }, Pl = {
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
      controlCombo: r,
      parentNames: o,
      mapCurrentID: c
    } = U(), { patron: a, guest: h } = J(), l = o.names(new I()).ref(), d = t.currentMap(new I()).ref(), p = c.id(new I()).ref(), y = () => {
      e.give("");
    }, g = () => {
      i.give(d.value.settings), y();
    };
    return r.happenedConditional(
      "KeyS",
      e.openedByName("settings"),
      a.create(h.create(g))
    ), (x, v) => (f(), L(ve, { name: "settings" }, {
      header: w(() => [
        b("h2", Ol, C(x.$t("general.mapSettings")), 1)
      ]),
      default: w(() => {
        var k;
        return [
          (k = u(d)) != null && k.settings ? (f(), A("div", Pl, [
            b("div", El, [
              b("div", Dl, [
                b("div", Rl, [
                  u(l).length > 1 ? (f(), L(E, {
                    key: 0,
                    type: "primary",
                    class: "text-white",
                    onClick: v[0] || (v[0] = (B) => u(e).give("parentTypes"))
                  }, {
                    default: w(() => [
                      O(C(x.$t("general.parentTypes")), 1)
                    ]),
                    _: 1
                  })) : j("", !0),
                  m(E, {
                    type: "primary",
                    class: "text-white",
                    onClick: v[1] || (v[1] = (B) => u(e).give("export"))
                  }, {
                    default: w(() => [
                      O(C(x.$t("general.exportOrImport")), 1)
                    ]),
                    _: 1
                  }),
                  m(E, {
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
              b("div", Hl, [
                b("label", null, [
                  b("b", null, C(x.$t("general.mapName")), 1),
                  m(oe, {
                    modelValue: u(d).settings.title,
                    "onUpdate:modelValue": v[3] || (v[3] = (B) => u(d).settings.title = B)
                  }, null, 8, ["modelValue"])
                ])
              ]),
              b("div", Nl, [
                b("a", Vl, C(x.$t("general.githubRepo")), 1)
              ])
            ]),
            b("div", Ul, [
              m(E, {
                class: "TheSettings-Button",
                type: "success",
                onClick: v[4] || (v[4] = (B) => g())
              }, {
                default: w(() => [
                  O(C(x.$t("general.save")), 1)
                ]),
                _: 1
              }),
              m(E, {
                class: "TheSettings-Button",
                onClick: y
              }, {
                default: w(() => [
                  O(C(x.$t("general.cancel")), 1)
                ]),
                _: 1
              }),
              m(E, {
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
          ])) : j("", !0)
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
const Kl = /* @__PURE__ */ Ze(Ll, [["render", Wl]]), Gl = "default", Yl = /* @__PURE__ */ D({
  __name: "TheLinker",
  setup(n) {
    const { mapObjectsLink: e } = U(), t = e.objectIds(new I([])).ref();
    return (s, i) => (f(), L(E, {
      type: Gl,
      onClick: i[0] || (i[0] = (r) => u(e).startLink())
    }, {
      default: w(() => [
        O(C(u(t).length === 1 ? "Выбиретие объект" : u(t).length === 2 ? "Второй объект" : "Связать объекты"), 1)
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
      mapTypeNew: r,
      modal: o,
      settings: c,
      sidebarDraggable: a
    } = U(), h = t.types(new I()).ref(), l = ie();
    os(() => {
      a.give(l.value);
    });
    const { svgMapTypeImage: d } = J(), p = Te(() => {
      var g;
      return (g = h.value) == null ? void 0 : g.map((x) => ({
        type: x,
        image: d.create(x).markup()
      })).sort((x, v) => +(x.type.name >= v.type.name));
    }), y = new I();
    return c.value(y), (g, x) => (f(), A("div", ql, [
      b("div", {
        ref_key: "dragWrapperRef",
        ref: l,
        class: "flex flex-col gap-3 flex-grow w-full overflow-y-auto"
      }, [
        (f(!0), A(z, null, G(p.value, (v, k) => (f(), A("div", {
          key: k,
          class: "flex flex-col items-center justify-center gap-2"
        }, [
          b("div", Jl, C(v.type.name), 1),
          b("div", {
            innerHTML: v.image,
            class: "TheSideBar-ItemImage",
            draggable: u(y).value.readonly ? "false" : "true",
            style: ae(`width:${v.type.width}px;height:${v.type.height}px`),
            title: g.$t("general.notifications.dragToCanvasToAdd"),
            onDragend: (B) => u(e).byTypeName(v.type.id, B)
          }, null, 44, Zl),
          u(y).value.readonly ? j("", !0) : (f(), A("div", Xl, [
            m(E, {
              class: "text-white",
              size: "sm",
              type: "primary",
              onClick: (B) => u(s).give(v.type.id)
            }, {
              default: w(() => [
                O(C(g.$t("general.change")), 1)
              ]),
              _: 2
            }, 1032, ["onClick"]),
            m(E, {
              class: "text-white",
              size: "sm",
              type: "danger",
              onClick: (B) => u(i).give(v.type)
            }, {
              default: w(() => [
                O(C(g.$t("general.delete")), 1)
              ]),
              _: 2
            }, 1032, ["onClick"])
          ]))
        ]))), 128))
      ], 512),
      u(y).value.readonly ? j("", !0) : (f(), A("div", eu, [
        m(Kl, { class: "mb-1 grid gap-1 grid-cols-2" }, {
          default: w(() => [
            m(E, {
              title: g.$t("general.addType"),
              type: "success",
              onClick: x[0] || (x[0] = (v) => u(r).byName())
            }, {
              default: w(() => [
                m(q, { icon: "fa-plus-square" })
              ]),
              _: 1
            }, 8, ["title"]),
            m(E, {
              class: "e2e-show-settings",
              title: g.$t("general.settings"),
              type: "primary",
              onClick: x[1] || (x[1] = (v) => u(o).give("settings"))
            }, {
              default: w(() => [
                m(q, { icon: "fa-cog" })
              ]),
              _: 1
            }, 8, ["title"])
          ]),
          _: 1
        }),
        m(Yl, { class: "w-[100%] block mb-1" })
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
    return this.basePatron.give(e), this.refWatcherCreated || (this.refWatcherCreated = !0, Ie(
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
      new W(e, (t) => {
        K(JSON.stringify(t), e);
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
    return K(e, this.baseGuest), this;
  }
  pool() {
    throw Error("No pool in SourceDynamic");
  }
}
const ru = { class: "AppPresets" }, ou = /* @__PURE__ */ b("div", { class: "text-md font-bold mb-2" }, "Экспорт\\Импорт текущей карты", -1), au = { class: "flex flex-col gap-2" }, cu = /* @__PURE__ */ D({
  __name: "AppExport",
  setup(n) {
    const { mapFile: e, mapCurrent: t } = U(), s = new nu(
      t,
      new Me((c) => {
        e.currentMap(new ze(c));
      })
    ), i = new iu(s), r = new su(new I(), i);
    i.value(r);
    const o = r.ref();
    return (c, a) => (f(), L(ve, { name: "export" }, {
      default: w(() => [
        b("div", ru, [
          ou,
          b("div", au, [
            m(Fs, {
              modelValue: u(o),
              "onUpdate:modelValue": a[0] || (a[0] = (h) => je(o) ? o.value = h : null)
            }, null, 8, ["modelValue"])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), lu = { class: "bg-body absolute top-0 left-0 w-full h-full" }, uu = { class: "grid grid-cols-[200px_1fr] grid-rows-[50px_1fr] h-dvh relative" }, bu = /* @__PURE__ */ D({
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
    const t = n, s = e, { fileContent: i, settings: r } = U(), { guest: o, patron: c } = J();
    return r.value((a) => {
      r.give({
        ...a,
        readonly: t.readonly,
        presets: t.presets
      });
    }), Ie(() => t.modelValue, (a) => {
      i.value(o.create((h) => {
        a !== h && i.give(a);
      }));
    }, {
      immediate: !0
    }), i.value(c.create((a) => {
      s("update:modelValue", a);
    })), (a, h) => (f(), A("div", lu, [
      b("div", uu, [
        m(xl, { class: "col-span-2" }),
        m(tu),
        m(gl, { class: "w-auto col-auto h-full" }),
        m(Bl)
      ]),
      m(zc),
      m(Yc),
      m(zl),
      m(Xa),
      m(fc),
      m(cu),
      m(Va),
      m(Il),
      m(cc),
      m(Pa)
    ]));
  }
}), ss = S.debug("FileSystemContent");
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
    if (ss("save file as content string", e), !this.fileHandler)
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
    ss("can be used", t);
    const s = window && window.matchMedia("(display-mode: standalone)");
    return e.give(t && s.matches), e;
  }
}
const Ue = S.debug("FirstPossibleFileContent");
class Cu {
  constructor(e, t) {
    $(this, "firstPossibleFileContent", null);
    $(this, "contentSource", new fe());
    $(this, "canBeUsedSource", new fe());
    Ue("length", e.length), e.forEach((s) => {
      s.canBeUsed(
        t.patronOnce.create(
          t.guest.create((i) => {
            Ue("canbeused result", s, i), i && !this.firstPossibleFileContent && (this.firstPossibleFileContent = s, s.canBeUsed(t.patron.create(this.canBeUsedSource)), s.content(t.patron.create(this.contentSource)), this.contentSource.value(
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
    return Ue("can be used to", this.firstPossibleFileContent), this.canBeUsedSource.value(e), e;
  }
  content(e) {
    return Ue("content to", this.firstPossibleFileContent), this.contentSource.value(e), this;
  }
  give(e) {
    return this.contentSource.give(e), this;
  }
}
const ct = S.debug("UrlContent");
class xu {
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
class _u {
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
  _u as BrowserLaunchQueue,
  wu as FileSystemContent,
  Cu as FirstPossibleFileContent,
  bu as PatronSchemeEditor,
  xu as UrlContent,
  I as VueRefPatron,
  U as useApplication,
  J as useFactories
};
