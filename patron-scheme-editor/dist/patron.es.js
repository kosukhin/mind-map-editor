var Ss = Object.defineProperty;
var Ts = (n, e, t) => e in n ? Ss(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var $ = (n, e, t) => Ts(n, typeof e != "symbol" ? e + "" : e, t);
import { ref as ee, defineComponent as P, computed as Ie, openBlock as f, createBlock as z, Transition as rs, withCtx as w, unref as u, createElementBlock as y, normalizeClass as te, createElementVNode as b, withModifiers as we, renderSlot as se, createCommentVNode as T, Fragment as W, renderList as G, toDisplayString as C, createVNode as m, normalizeStyle as ce, createTextVNode as O, watch as je, withDirectives as Le, isRef as Be, vModelText as os, vModelCheckbox as Is, onBeforeUnmount as js, vModelSelect as Bs, onMounted as as, createStaticVNode as Os } from "vue";
import { useScriptTag as Ps, useMagicKeys as Es, useVModel as Qe, useShare as Ds } from "@vueuse/core";
import de from "konva";
import { FontAwesomeIcon as Rs } from "@fortawesome/vue-fontawesome";
import { faArrowUp as Hs, faArrowDown as Ns, faArrowRight as Vs, faArrowLeft as zs, faClose as Us, faMap as Ls, faRotateRight as Qs, faRotateLeft as Ws, faFileText as Ks, faCog as Gs, faPlusSquare as qs, faHistory as Ys, faSearch as Js, faTextWidth as Zs, faBarsStaggered as Xs, faBars as ei } from "@fortawesome/free-solid-svg-icons";
import { useEditor as ti, EditorContent as si, BubbleMenu as ii } from "@tiptap/vue-3";
import ni from "@tiptap/starter-kit";
class ri {
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
class be {
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
class U {
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
var oi = Object.defineProperty, ai = (n, e, t) => e in n ? oi(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, It = (n, e, t) => ai(n, typeof e != "symbol" ? e + "" : e, t);
const cs = /* @__PURE__ */ new Map(), jt = (n) => {
  cs.forEach((e) => {
    e.delete(n);
  });
};
class We {
  constructor(e) {
    this.initiator = e, It(this, "patrons"), It(this, "give"), this.patrons = /* @__PURE__ */ new Set(), cs.set(this, this.patrons);
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
var ci = Object.defineProperty, li = (n, e, t) => e in n ? ci(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, ui = (n, e, t) => li(n, e + "", t);
class Ce {
  constructor(e) {
    this.sourceDocument = e, ui(this, "thePool", new We(this));
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
var di = Object.defineProperty, hi = (n, e, t) => e in n ? di(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Bt = (n, e, t) => hi(n, typeof e != "symbol" ? e + "" : e, t);
class pi {
  constructor(e) {
    Bt(this, "guests", /* @__PURE__ */ new Set()), Bt(this, "patronPool"), this.patronPool = new We(e);
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
var fi = Object.defineProperty, gi = (n, e, t) => e in n ? fi(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Oe = (n, e, t) => gi(n, typeof e != "symbol" ? e + "" : e, t);
class Ke {
  constructor() {
    Oe(this, "theChain"), Oe(this, "keysKnown", /* @__PURE__ */ new Set()), Oe(this, "keysFilled", /* @__PURE__ */ new Set()), Oe(this, "filledChainPool", new pi(this)), this.theChain = new Ce({});
  }
  resultArray(e) {
    const t = new Ue(e);
    return this.filledChainPool.add(
      new U(t, (s) => {
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
class ut {
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
var vi = Object.defineProperty, Ai = (n, e, t) => e in n ? vi(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, yi = (n, e, t) => Ai(n, e + "", t);
class bi {
  constructor(e) {
    this.baseGuest = e, yi(this, "received", !1);
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
var wi = Object.defineProperty, Ci = (n, e, t) => e in n ? wi(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, xi = (n, e, t) => Ci(n, e + "", t);
class fe {
  constructor() {
    xi(this, "baseSource", new Ce(null));
  }
  value(e) {
    return this.baseSource.value(
      new U(e, (t) => {
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
class Te extends Error {
  constructor(e, t) {
    super(e, t);
  }
}
class _i {
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
class $i {
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
class ki {
  constructor(e) {
    this.content = e;
  }
  result() {
    return JSON.parse(this.content);
  }
}
class Mi {
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
class Si {
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
class Ii {
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
class Oi {
  constructor(e) {
    this.text = e;
  }
  asString(e) {
    return e.give(this.text), e;
  }
}
class Pi {
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
function dt(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var lt = { exports: {} }, Xe, Ot;
function Ei() {
  if (Ot) return Xe;
  Ot = 1;
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
        var p = parseFloat(d[1]), v = (d[2] || "ms").toLowerCase();
        switch (v) {
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
  function h(l, d, p, v) {
    var g = d >= p * 1.5;
    return Math.round(l / p) + " " + v + (g ? "s" : "");
  }
  return Xe;
}
function Di(n) {
  t.debug = t, t.default = t, t.coerce = a, t.disable = r, t.enable = i, t.enabled = o, t.humanize = Ei(), t.destroy = h, Object.keys(n).forEach((l) => {
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
    let d, p = null, v, g;
    function x(...A) {
      if (!x.enabled)
        return;
      const k = x, j = Number(/* @__PURE__ */ new Date()), K = j - (d || j);
      k.diff = K, k.prev = d, k.curr = j, d = j, A[0] = t.coerce(A[0]), typeof A[0] != "string" && A.unshift("%O");
      let R = 0;
      A[0] = A[0].replace(/%([a-zA-Z%])/g, (E, B) => {
        if (E === "%%")
          return "%";
        R++;
        const F = t.formatters[B];
        if (typeof F == "function") {
          const M = A[R];
          E = F.call(k, M), A.splice(R, 1), R--;
        }
        return E;
      }), t.formatArgs.call(k, A), (k.log || t.log).apply(k, A);
    }
    return x.namespace = l, x.useColors = t.useColors(), x.color = t.selectColor(l), x.extend = s, x.destroy = t.destroy, Object.defineProperty(x, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => p !== null ? p : (v !== t.namespaces && (v = t.namespaces, g = t.enabled(l)), g),
      set: (A) => {
        p = A;
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
    const p = (typeof l == "string" ? l : "").split(/[\s,]+/), v = p.length;
    for (d = 0; d < v; d++)
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
var Ri = Di;
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
  n.exports = Ri(e);
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
const ls = /* @__PURE__ */ dt(S), Hi = S.debug("TextNlAsBr");
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
        return Hi(t), e.give((t ?? "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, `$1${s}$2`)), !0;
      })
    ), e;
  }
}
const Vi = new H(Ce), zi = new H(Ce), Ui = new H(fe), Li = new H(pe), Qi = new H(U), Wi = new H(be), Ki = new H(We), Gi = new H(ut), qi = new H(bi), Yi = new H(U), Ji = new H(Ke), Zi = new H(mi), he = {
  cache: Vi,
  chain: Ji,
  guest: Li,
  guestCast: Qi,
  guestAware: Wi,
  guestInTheMiddle: Yi,
  guestSync: Zi,
  patron: Gi,
  patronOnce: qi,
  pool: Ki,
  source: zi,
  sourceEmpty: Ui
}, Xi = new H(_i), en = new H($i), tn = new H(Mi), sn = new H(ki), us = new H(Fi), nn = new H(Si, { ...he, svgImage: us }), rn = new H(Ti, he), on = new H(Ii, he), an = new H(ji, he), cn = new H(Bi, he), ln = new H(Oi), un = new H(Pi, he), dn = new H(Ni, he), hn = {
  ...he,
  fileHandlerContent: Xi,
  browserFileSaved: en,
  transformToString: tn,
  transformToObject: sn,
  svgImage: us,
  svgMapTypeImage: nn,
  numberChunks: rn,
  mapNameFromUrl: on,
  textNoHtml: an,
  jsonp: cn,
  textOf: ln,
  textNlAsBr: dn,
  textWithoutHTML: un
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
class pn {
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
class fn {
  constructor(e) {
    this.mapFile = e;
  }
  value(e) {
    return this.mapFile.currentMap(
      new U(e, (t) => {
        e.give(t.settings.title);
      })
    ), this;
  }
}
const Ee = S.debug("MapHistory"), Pt = (n) => {
  const e = JSON.parse(JSON.stringify(n));
  return Object.values(e.objects).forEach((t) => {
    t.width = 0, t.height = 0;
  }), JSON.stringify(e);
};
class gn {
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
                (r) => Pt(r) === Pt(e)
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
const De = S.debug("MapFileOfContent");
class vn {
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
const An = S.debug("MapFileForRendering");
class yn {
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
        An("received map file, objects = ", e[t].objects), this.mapCache.give(e[t]);
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
const Et = ls("app:MapObjectCurrent");
class bn {
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
    return Et("new value current object", e), this.silenceActivator.value(
      this.factories.guest.create((t) => {
        Et("silence activator", t), t ? t.give(e) : this.idCache.give(e);
      })
    ), this;
  }
}
class wn {
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
class Cn {
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
class xn {
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
class _n {
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
class $n {
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
const kn = S.debug("MapObjectsLink");
class Mn {
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
            t.push(s), this.objectIdsCache.give([...t]), kn("object ids", t), t.length === 2 && this.map.objects(
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
var pt = Fn, Sn = typeof Pe == "object" && Pe && Pe.Object === Object && Pe, Tn = Sn, In = Tn, jn = typeof self == "object" && self && self.Object === Object && self, Bn = In || jn || Function("return this")(), ps = Bn, On = ps, Pn = function() {
  return On.Date.now();
}, En = Pn, Dn = /\s/;
function Rn(n) {
  for (var e = n.length; e-- && Dn.test(n.charAt(e)); )
    ;
  return e;
}
var Hn = Rn, Nn = Hn, Vn = /^\s+/;
function zn(n) {
  return n && n.slice(0, Nn(n) + 1).replace(Vn, "");
}
var Un = zn, Ln = ps, Qn = Ln.Symbol, fs = Qn, Dt = fs, gs = Object.prototype, Wn = gs.hasOwnProperty, Kn = gs.toString, _e = Dt ? Dt.toStringTag : void 0;
function Gn(n) {
  var e = Wn.call(n, _e), t = n[_e];
  try {
    n[_e] = void 0;
    var s = !0;
  } catch {
  }
  var i = Kn.call(n);
  return s && (e ? n[_e] = t : delete n[_e]), i;
}
var qn = Gn, Yn = Object.prototype, Jn = Yn.toString;
function Zn(n) {
  return Jn.call(n);
}
var Xn = Zn, Rt = fs, er = qn, tr = Xn, sr = "[object Null]", ir = "[object Undefined]", Ht = Rt ? Rt.toStringTag : void 0;
function nr(n) {
  return n == null ? n === void 0 ? ir : sr : Ht && Ht in Object(n) ? er(n) : tr(n);
}
var rr = nr;
function or(n) {
  return n != null && typeof n == "object";
}
var ar = or, cr = rr, lr = ar, ur = "[object Symbol]";
function dr(n) {
  return typeof n == "symbol" || lr(n) && cr(n) == ur;
}
var hr = dr, pr = Un, Nt = pt, fr = hr, Vt = NaN, gr = /^[-+]0x[0-9a-f]+$/i, mr = /^0b[01]+$/i, vr = /^0o[0-7]+$/i, Ar = parseInt;
function yr(n) {
  if (typeof n == "number")
    return n;
  if (fr(n))
    return Vt;
  if (Nt(n)) {
    var e = typeof n.valueOf == "function" ? n.valueOf() : n;
    n = Nt(e) ? e + "" : e;
  }
  if (typeof n != "string")
    return n === 0 ? n : +n;
  n = pr(n);
  var t = mr.test(n);
  return t || vr.test(n) ? Ar(n.slice(2), t ? 2 : 8) : gr.test(n) ? Vt : +n;
}
var br = yr, wr = pt, st = En, zt = br, Cr = "Expected a function", xr = Math.max, _r = Math.min;
function $r(n, e, t) {
  var s, i, r, o, c, a, h = 0, l = !1, d = !1, p = !0;
  if (typeof n != "function")
    throw new TypeError(Cr);
  e = zt(e) || 0, wr(t) && (l = !!t.leading, d = "maxWait" in t, r = d ? xr(zt(t.maxWait) || 0, e) : r, p = "trailing" in t ? !!t.trailing : p);
  function v(E) {
    var B = s, F = i;
    return s = i = void 0, h = E, o = n.apply(F, B), o;
  }
  function g(E) {
    return h = E, c = setTimeout(k, e), l ? v(E) : o;
  }
  function x(E) {
    var B = E - a, F = E - h, M = e - B;
    return d ? _r(M, r - F) : M;
  }
  function A(E) {
    var B = E - a, F = E - h;
    return a === void 0 || B >= e || B < 0 || d && F >= r;
  }
  function k() {
    var E = st();
    if (A(E))
      return j(E);
    c = setTimeout(k, x(E));
  }
  function j(E) {
    return c = void 0, p && s ? v(E) : (s = i = void 0, o);
  }
  function K() {
    c !== void 0 && clearTimeout(c), h = 0, s = a = i = c = void 0;
  }
  function R() {
    return c === void 0 ? o : j(st());
  }
  function re() {
    var E = st(), B = A(E);
    if (s = arguments, i = this, a = E, B) {
      if (c === void 0)
        return g(a);
      if (d)
        return clearTimeout(c), c = setTimeout(k, e), v(a);
    }
    return c === void 0 && (c = setTimeout(k, e)), o;
  }
  return re.cancel = K, re.flush = R, re;
}
var ms = $r;
const ge = /* @__PURE__ */ dt(ms), kr = (n) => {
  if (n[n.length - 1] === "/") {
    const e = n.split("");
    return e.splice(e.length - 1, 1), e.join("");
  }
  return n;
}, Mr = ge((n) => {
  window == null || window.open(n);
}, 200), it = S.debug("MapObjectUrl");
class Fr {
  constructor(e, t) {
    this.mapId = e, this.factories = t;
  }
  open(e, t) {
    if (e != null && e.linked) {
      const s = e.outlink;
      e.targetBlank ? Mr(s) : (it("open new map", s), this.factories.mapNameFromUrl.create(
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
                let a = s.outlink ? s.outlink : `${r}/${Sr(c)}`;
                it("link is", a), a = kr(a), t.give(a);
              })
            );
          })
        );
      })
    ), t;
  }
}
function Sr(n) {
  return n.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}
const Tr = S.debug("ObjectPositionBounds");
class Ir {
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
        o > a && (o = a), Tr("position", r, o), s.give({ x: r, y: o });
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
}, nt = {
  x: 0,
  y: 1
}, Br = {
  positive: 1,
  negative: -1
}, Lt = S.debug("ObjectsOutsideScreen");
class Or {
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
          const a = Br[e.direction], l = r.sort(
            (p, v) => p.position[nt[e.axis]] * a - v.position[nt[e.axis]] * a
          ).filter((p) => {
            const v = p.position[nt[e.axis]] + (s ? 0 : p[Ut[e.axis]]), g = c[e.axis] * -1 + (s ? o[Ut[e.axis]]() : 0);
            return Lt(
              "mb nearest points",
              e.direction,
              "objectP=",
              v,
              "screenP=",
              g
            ), s ? v > g : v < g;
          });
          Lt("nearest", l), t.give({
            count: l.length,
            nearestObjectId: ((d = l.at(s ? -1 : 0)) == null ? void 0 : d.id) ?? ""
          });
        }
      )
    ), t;
  }
}
class Pr {
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
class Er {
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
class Dr {
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
class Rr {
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
const Nr = S.debug("MapTypeUsed");
class Vr {
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
class zr {
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
const Qt = S.debug("ParentTypes");
class Ur {
  constructor(e, t, s) {
    this.parentNames = e, this.mapFile = t, this.factories = s;
  }
  types(e) {
    Qt("parent types requested");
    const t = this.factories.chain.create();
    return this.parentNames.names(this.factories.guestCast.create(e, t.receiveKey("parentNames"))), this.mapFile.mapFile(this.factories.guestCast.create(e, t.receiveKey("mapFile"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ parentNames: s, mapFile: i }) => {
        const r = s.slice(0, -1);
        Qt("parent names", r);
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
const Wt = S.debug("ObjectsMatchedToQuery");
class Lr {
  constructor(e, t) {
    this.map = e, this.factories = t;
  }
  objects(e, t) {
    return e.value(
      this.factories.guestInTheMiddle.create(
        t,
        ge((i) => {
          i = i.toLowerCase(), this.map.objects(
            this.factories.guest.create((r) => {
              if (!i) {
                Wt("reset results"), t.give([]);
                return;
              }
              const o = r.filter(
                (c) => {
                  var a;
                  return c.name.toLowerCase().includes(i) || ((a = c.additionalName) == null ? void 0 : a.toLowerCase().includes(i)) || Object.values(c.additionalFields ?? {}).join(" ").toLowerCase().includes(i);
                }
              );
              Wt("objects in searching", o, i), t.give(o);
            })
          );
        }, 500)
      )
    ), t;
  }
}
const Qr = {
  height: 3e3,
  width: 3e3
};
class Wr {
  value(e) {
    return e.give(Qr), e;
  }
}
const Kt = S.debug("StageMoveRestriction");
class Kr {
  constructor(e, t, s) {
    this.canvasDep = e, this.stageSize = t, this.factories = s;
  }
  position(e, t) {
    return this.canvasDep.canvas(
      this.factories.guest.create((s) => {
        this.stageSize.value(
          this.factories.guest.create((i) => {
            Kt("income position", e);
            const r = i.width - s.clientWidth, o = i.height - s.clientHeight, c = e.x * -1, a = e.y * -1;
            if (o < 0 || r < 0)
              return { x: 0, y: 0 };
            Kt("boundings", o, r, a, c), t.give({
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
class Gr {
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
            const p = a.types[d.type] ?? {}, v = {
              width: d.width || p.width,
              height: d.height || p.height
            };
            return this.isInBounding(o, c, d.position, v);
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
const qr = (n, e) => {
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
        const i = t.types[s.type], r = /\$\{([a-zA-Z1-9]+)\}/g, c = qr(i.svg, r).filter((a) => a !== "width" && a !== "height");
        s.additionalFields = Yr(c, s.additionalFields ?? {}), this.mapObject.give(s);
      })
    ), this;
  }
  introduction() {
    return "patron";
  }
}
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
    const p = h && a >= 0, v = !h && c >= 0, g = h && a < 0, x = !h && c < 0, A = { x: 0, y: 0 };
    let k = 0, j = 0;
    p ? (l += Math.round(e.width / 2), A.x = l, A.y = (t.y + i.y + s.height) / 2, k = i.x > t.x ? 1 : -1) : x ? (d += Math.round(e.height / 2), l += +e.width, A.x = (t.x + e.width + i.x) / 2, A.y = d, j = i.y > t.y ? 1 : -1) : g ? (l += Math.round(e.width / 2), d += +e.height, A.x = l, A.y = (t.y + e.height + i.y) / 2, k = i.x > t.x ? 1 : -1) : v && (d += Math.round(e.height / 2), A.x = (t.x + i.x + s.width) / 2, A.y = d, j = i.y > t.y ? 1 : -1);
    const K = [l, d].join("-"), R = this.filledPoints.get(K) || 0;
    return this.filledPoints.set(K, R + 1), {
      point: { x: l, y: d },
      breakPoint: A,
      shift: {
        x: k * R * 10,
        y: j * R * 10
      }
    };
  }
}
class Xr {
  constructor(e, t) {
    this.objectsSource = e, this.objectsMapSource = t;
  }
  value(e) {
    const t = new Ke();
    return this.objectsSource.value(new U(e, t.receiveKey("objects"))), this.objectsMapSource.value(new U(e, t.receiveKey("objectsMap"))), t.result(
      new U(
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
class eo {
  constructor(e) {
    this.arrowDeps = e;
  }
  value(e) {
    return this.arrowDeps.value(
      new U(e, (t) => {
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
    const l = c && o >= 0, d = !c && r >= 0, p = c && o < 0, v = !c && r < 0, g = { x: 0, y: 0 };
    return l ? (a += Math.round(e.width / 2), g.x = a, g.y = (e.position[1] + t.position[1] + t.height) / 2, t.position[0] > e.position[0]) : v ? (h += Math.round(e.height / 2), a += +e.width, g.x = (e.position[0] + e.width + t.position[0]) / 2, g.y = h, t.position[1] > e.position[1]) : p ? (a += Math.round(e.width / 2), h += +e.height, g.x = a, g.y = (e.position[1] + e.height + t.position[1]) / 2, t.position[1] > e.position[1]) : d && (h += Math.round(e.height / 2), g.x = (e.position[0] + t.position[0] + t.width) / 2, g.y = h, t.position[1] > e.position[1]), {
      point: { x: a, y: h },
      breakPoint: g,
      shift: {
        x: 0,
        y: 0
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
      new U(e, (t) => {
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
class so {
  constructor(e, t = 10) {
    this.arrowDepsSource = e, this.centerGap = t;
  }
  value(e) {
    return this.arrowDepsSource.value(
      new U(e, ({ fromObject: t, toObject: s }) => {
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
class io {
  constructor(e) {
    this.basePoints = e;
  }
  value(e) {
    return this.basePoints.value(
      new U(e, (t) => {
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
const He = 15;
class no {
  constructor(e) {
    $(this, "pointGroups");
    this.basePoints = e, this.pointGroups = new io(e);
  }
  value(e) {
    const t = new Ke();
    return this.pointGroups.value(new U(e, t.receiveKey("pointGroups"))), this.basePoints.value(new U(e, t.receiveKey("basePoints"))), t.result(
      new U(e, ({ pointGroups: s, basePoints: i }) => {
        Object.values(s).forEach((r) => {
          if (r.length <= 1)
            return;
          r.sort((a, h) => i[h.arrowIndex].points[h.pointEndIndex] - i[a.arrowIndex].points[a.pointEndIndex]);
          let o = 0, c = 0;
          r.forEach((a, h) => {
            const l = i[a.arrowIndex].points[a.pointStartIndex], d = i[a.arrowIndex].points[a.pointStartIndex + 1], p = i[a.arrowIndex].points[a.pointEndIndex], v = i[a.arrowIndex].points[a.pointEndIndex + 1], g = i[a.arrowIndex].points[a.breakPointStartIndex], x = i[a.arrowIndex].points[a.breakPointStartIndex + 1], A = l > g ? -1 : l < g ? 1 : 0, k = d > x ? -1 : d < x ? 1 : 0, j = l > p ? -1 : l < p ? 1 : 0, K = d > v ? -1 : d < v ? 1 : 0;
            if (A !== 0) {
              let R = 0;
              h !== 0 && (K > 0 ? (c += 1, R = c) : (o += 1, R = o)), K && (i[a.arrowIndex].points[a.pointStartIndex + 1] = i[a.arrowIndex].points[a.pointStartIndex + 1] + R * K * He), i[a.arrowIndex].points[a.breakPointStartIndex + 1] = i[a.arrowIndex].points[a.breakPointStartIndex + 1] + R * K * He;
            }
            if (k !== 0) {
              let R = 0;
              h !== 0 && (j > 0 ? (c += 1, R = c) : (o += 1, R = o)), i[a.arrowIndex].points[a.pointStartIndex] = i[a.arrowIndex].points[a.pointStartIndex] + R * j * He, i[a.arrowIndex].points[a.breakPointStartIndex] = i[a.arrowIndex].points[a.breakPointStartIndex] + R * j * He;
            }
          });
        }), L(i, e);
      })
    ), this;
  }
}
class ro {
  constructor(e) {
    this.guestAwares = e;
  }
  value(e) {
    let t = null;
    return this.guestAwares.forEach((s) => {
      s.value(
        new U(e, (i) => {
          (!t || t === s) && (L(i, e), t = s);
        })
      );
    }), this;
  }
}
class oo {
  constructor(e, t) {
    this.baseSource = e, this.targetSourceFactory = t;
  }
  value(e) {
    const t = new Ke(), s = new fe(), i = this.targetSourceFactory.create(
      s
    );
    return this.baseSource.value(
      new U(e, (r) => {
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
class ao {
  constructor(e) {
    this.buildingFn = e;
  }
  create(...e) {
    return this.buildingFn(...e);
  }
}
var co = ms, lo = pt, uo = "Expected a function";
function ho(n, e, t) {
  var s = !0, i = !0;
  if (typeof n != "function")
    throw new TypeError(uo);
  return lo(t) && (s = "leading" in t ? !!t.leading : s, i = "trailing" in t ? !!t.trailing : i), co(n, e, {
    leading: s,
    maxWait: e,
    trailing: i
  });
}
var po = ho;
const fo = /* @__PURE__ */ dt(po), { Arrow: go } = de, mo = S.debug("MapObjectsArrows");
class vo {
  constructor(e, t, s, i, r) {
    $(this, "previouslyRenderedArrows", /* @__PURE__ */ new Map());
    this.konvaLayer = e, this.mapFile = t, this.mapDep = s, this.arrowPath = i, this.factories = r, mo("draw arrows on canvas");
    const o = this.factories.chain.create();
    this.konvaLayer.layer(this.factories.patron.create(o.receiveKey("layer"))), this.mapFile.currentMap(this.factories.patron.create(o.receiveKey("map"))), this.mapDep.objects(this.factories.patron.create(o.receiveKey("objects"))), o.result(
      this.factories.patron.create(
        this.factories.guest.create(
          fo(({ layer: c, map: a, objects: h }) => {
            this.previouslyRenderedArrows.forEach((p) => {
              p.arrow.hide();
            });
            const l = h.reduce((p, v) => (p[v.id] = v, p), {});
            new no(new oo(new Xr(
              new be((p) => L(h, p)),
              new be((p) => L(l, p))
            ), new ao((p) => {
              const v = new so(p);
              return new ro([new to(v), new eo(v)]);
            }))).value((p) => {
              p.forEach((v) => {
                const g = v.key;
                if (this.previouslyRenderedArrows.has(g)) {
                  const A = this.previouslyRenderedArrows.get(g);
                  A.arrow.show(), A.arrow.points(v.points);
                  return;
                }
                const x = new go({
                  x: 0,
                  y: 0,
                  points: v.points,
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
const { Arrow: Ao } = de, rt = S.debug("NewArrow"), Gt = {
  width: 10,
  height: 10
};
class yo {
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
        jt(i);
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
                t = new Ao({
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
const ke = S.debug("MapObjectBackground"), bo = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD//gATQ3JlYXRlZCB3aXRoIEdJTVD/4gKwSUNDX1BST0ZJTEUAAQEAAAKgbGNtcwQwAABtbnRyUkdCIFhZWiAH6AAMAAQADQAqAAthY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1kZXNjAAABIAAAAEBjcHJ0AAABYAAAADZ3dHB0AAABmAAAABRjaGFkAAABrAAAACxyWFlaAAAB2AAAABRiWFlaAAAB7AAAABRnWFlaAAACAAAAABRyVFJDAAACFAAAACBnVFJDAAACFAAAACBiVFJDAAACFAAAACBjaHJtAAACNAAAACRkbW5kAAACWAAAACRkbWRkAAACfAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACQAAAAcAEcASQBNAFAAIABiAHUAaQBsAHQALQBpAG4AIABzAFIARwBCbWx1YwAAAAAAAAABAAAADGVuVVMAAAAaAAAAHABQAHUAYgBsAGkAYwAgAEQAbwBtAGEAaQBuAABYWVogAAAAAAAA9tYAAQAAAADTLXNmMzIAAAAAAAEMQgAABd7///MlAAAHkwAA/ZD///uh///9ogAAA9wAAMBuWFlaIAAAAAAAAG+gAAA49QAAA5BYWVogAAAAAAAAJJ8AAA+EAAC2xFhZWiAAAAAAAABilwAAt4cAABjZcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltjaHJtAAAAAAADAAAAAKPXAABUfAAATM0AAJmaAAAmZwAAD1xtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAEcASQBNAFBtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEL/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAAeAB4DAREAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAwUEAAj/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAH1SCMTDaCMTiuCMTDgxDGf/8QAHhAAAgIBBQEAAAAAAAAAAAAAAAMBAgQFExUyMxL/2gAIAQEAAQUCG9TUPHdga2PndgzrxZQ3qah48gsvnUtHILMrKq5f/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAwEBPwEH/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAgEBPwEH/8QAHhAAAgIBBQEAAAAAAAAAAAAAAAECMXIQQUKSsVH/2gAIAQEABj8CFkvdFkVLqzla4v6VLqxXe60WS90WRUipWipCSTvc/8QAIxAAAgADCAMAAAAAAAAAAAAAAAEQUfAhMUGhscHR8RFhcf/aAAgBAQABPyErMkMi0ZW2wylmzHorbYSSX3Vg5wrMkMi0Z0a5FVK8Llg05nRrkRmteVg//9oADAMBAAIAAwAAABCCQQSCSST/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAEDAQE/EAf/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAECAQE/EAf/xAAeEAEAAQQCAwAAAAAAAAAAAAABIRARIDEAQVFxkf/aAAgBAQABPxDEMgTA4U0lpO6EwKiFh/YAyDIEAZSTdCnwUQAma0AtZOl88//Z";
class wo {
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
            ke("grid example", r), i.src = bo, i.onload = () => {
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
const Co = S.debug("Breadcrumbs");
class xo {
  constructor(e, t, s) {
    this.parentNames = e, this.mapFile = t, this.factories = s;
  }
  list(e) {
    const t = this.factories.chain.create();
    return this.parentNames.names(this.factories.guestCast.create(e, t.receiveKey("names"))), this.mapFile.mapFile(this.factories.guestCast.create(e, t.receiveKey("mapFile"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ names: s, mapFile: i }) => {
        Co("map id", s, i), e.give(
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
const qt = S.debug("CursorWithObjects");
class _o {
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
        r ? (qt("crossed with", r), e.give({
          x: r.position[0] + r.width / 2,
          y: r.position[1] + r.height / 2
        })) : (qt("cursor pos", s), e.give(s));
      })
    ), this;
  }
}
class $o {
  constructor(e, t = 768) {
    this.windowWidth = e, this.mobileLimit = t;
  }
  value(e) {
    return this.windowWidth.value(
      new U(e, (t) => {
        L({
          isMobile: t <= this.mobileLimit,
          isDesktop: t > this.mobileLimit
        }, e);
      })
    ), this;
  }
}
const Yt = S.debug("Drawer");
class ko {
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
class Mo {
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
const Jt = S.debug("app:MiniMap"), Zt = 130;
class So {
  constructor(e, t, s, i) {
    $(this, "theSize");
    $(this, "thePoints");
    $(this, "viewportSizeCache");
    this.map = e, this.layer = t, this.stageSize = s, this.factories = i, this.theSize = i.sourceEmpty.create(), this.thePoints = i.sourceEmpty.create(), this.viewportSizeCache = i.sourceEmpty.create();
    const r = i.chain.create();
    e.objects(i.patron.create(r.receiveKey("objects"))), t.layer(i.patron.create(r.receiveKey("layer"))), s.value(i.patron.create(r.receiveKey("size"))), r.result(
      i.patron.create(
        i.guest.create(({ layer: o, size: c, objects: a }) => {
          const h = Zt / c.width, l = {
            width: Math.round(o.width() * h),
            height: Math.round(o.height() * h)
          };
          this.viewportSizeCache.give(l);
          const d = {
            width: Math.round(c.width * h),
            height: Math.round(c.height * h)
          };
          this.theSize.give(d);
          const p = a.map((v) => ({
            id: v.id,
            x: Math.round(v.position[0] * h),
            y: Math.round(v.position[1] * h),
            width: Math.round(v.width * h),
            height: Math.round(v.height * h)
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
        const r = Zt / s.width, o = {
          x: i.x * r * -1,
          y: i.y * r * -1
        };
        Jt("scaled position is", o), e.give(o);
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
const Xt = S.debug("Modal");
class To {
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
class Io {
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
const Me = S.debug("ObjectGeometryFix");
class jo {
  constructor(e, t, s, i) {
    $(this, "innerReceive");
    this.mapFile = t, this.map = s, this.factories = i, e.objects(i.patron.create(this)), this.innerReceive = ge((r) => {
      this.mapFile.currentMap(
        this.factories.guest.create((o) => {
          Me("objects to fix", r);
          const c = document.querySelectorAll(".objects-container .rendered-object"), a = o.objects;
          let h = !1;
          c.forEach((l) => {
            const d = l.getAttribute("data-object-id");
            if (Me("i see id", d), !d)
              return;
            const p = a[d];
            if (p && (Me("dom object geometry", l.clientWidth, l.clientHeight), Me("saved object geometry", p.width, p.height), (p.width !== l.clientWidth || p.height !== l.clientHeight) && (h = !0, Me("update object geometry"), p.width = l.clientWidth, p.height = l.clientHeight), !p.width || !p.height)) {
              const v = o.types[p.type];
              p.width = v.width, p.height = v.height;
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
const Fe = S.debug("MapObjectsRectsPatron");
class Bo {
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
              Fe("rerender object rects"), this.previouslyRenderedRects.forEach((c) => {
                c.hide();
              }), e.forEach((c) => {
                const a = r.types[c.type], h = +c.width || +a.width || 100, l = +c.height || +a.height || 100;
                if (this.previouslyRenderedRects.has(c)) {
                  const v = this.previouslyRenderedRects.get(c);
                  v.width(h), v.height(l), v.x(+c.position[0]), v.y(+c.position[1]), v.show();
                  return;
                }
                Fe("rect object", c, a);
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
                  Fe("drag ended"), this.objectPosition.position(
                    c,
                    {
                      x: d.x(),
                      y: d.y()
                    },
                    this.factories.guest.create((v) => {
                      this.mapObject.give({
                        ...c,
                        position: [v.x, v.y]
                      });
                    })
                  );
                }), d.on("dragmove", () => {
                  Fe("dragmove works", d.x(), d.y()), t.getStage().container().style.cursor = "move", this.objectPosition.position(
                    c,
                    {
                      x: d.x(),
                      y: d.y()
                    },
                    this.factories.guest.create((v) => {
                      this.mapObjectForRendering.give({
                        ...c,
                        position: [v.x, v.y]
                      });
                    })
                  );
                });
                const p = () => {
                  Fe("object clicked with id", c.id), this.mapObjectCurrent.give(c.id);
                };
                d.on("click", p), d.on("tap", p);
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
class Oo {
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
const Po = S.debug("StagePosition");
class Eo {
  constructor(e) {
    this.stageMove = e;
  }
  give(e) {
    return Po("received position", e), this.stageMove.move(e), this;
  }
}
class Do {
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
class Ro {
  constructor() {
    $(this, "source", new Ce({
      height: window.innerHeight,
      width: window.innerWidth
    }));
    const e = new ResizeObserver(ge((s) => {
      requestAnimationFrame(() => {
        this.source.give({
          height: window.innerHeight,
          width: window.innerWidth
        });
      });
    }, 50)), t = document.querySelector("body");
    t && e.observe(t);
  }
  value(e) {
    return this.source.value(e), this;
  }
}
const es = S.debug("Zindex");
class Ho {
  constructor(e) {
    $(this, "fnsCache");
    this.factories = e, this.fnsCache = e.cache.create([]), this.fnsCache.value(
      e.patron.create(
        e.guest.create(
          ge((t) => {
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
const ts = S.debug("app:BrowserCanvas");
class No {
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
const Vo = S.debug("Cursor");
class zo {
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
      Vo("move cursor fired", r), this.cursorPool.give(r);
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
const Ne = S.debug("ControlCombo");
class Lo {
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
const Se = S.debug("Keyboard");
class Qo {
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
const ss = S.debug("app:konva:KonvaLayer");
class Wo {
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
            ss("new position", l), this.positionCache.give(l);
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
class Ko {
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
const Go = S.debug("position");
class qo {
  constructor(e, t, s, i, r) {
    this.layer = e, this.canvas = t, this.stageSize = s, this.stageMoveRestriction = i, this.factories = r;
  }
  move(e) {
    Go("move stage to new point", e.position), this.stageSize.value(
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
const _ = J(), Ge = new Qo(_), vs = new Ce({
  readonly: !1,
  presets: {}
}), Yo = new To(Ge, _), As = new ko(Ge, _), qe = new Io(_), ue = new pn(_), ys = _.sourceEmpty.create(), V = new vn(ys, ue, _), Jo = new fn(V), Zo = new ri(Jo), ft = new yn(V, ue, _), gt = new ds(ft, ue, _), Xo = new hs(gt, ft, _), ie = new ds(V, ue, _), ea = new be((n) => {
  V.currentMap(new Ue(n));
}), Ye = new bn(As, _), ta = new Er(_), sa = new Pr(V, ie, _), me = new No(_), ve = new Wr(), bs = new Kr(me, ve, _), ne = new Wo(me, ve, bs, _), ia = new Ho(_), na = new wo(ne, V, ia, _), xe = new hs(ie, V, _), ra = new $n(
  ie,
  V,
  [new ht(qe, new wn(V, _), _)],
  _
), oa = new Ko(ne, _), aa = new Cn(ie, xe, me, oa, _), ws = new Vr(V, _), Cs = new Hr(
  ie,
  V,
  [
    new ht(
      qe,
      new zr(ws, _),
      _
    )
  ],
  _
), ca = new Rr(
  ie,
  V,
  [new ht(qe, ws, _)],
  _
), la = new Dr(Cs), Je = new Gr(ne, me, ft, _), ua = new jo(
  Je,
  V,
  ie,
  _
), da = new Bo(
  ne,
  V,
  xe,
  Je,
  Ye,
  Xo,
  new jr(new Ir(ve, _), _),
  vs,
  _
), ha = new zo(ne, _), pa = new _o(Je, ha, _), xs = new Zr(), _s = new yo(ne, pa, xs, _), fa = new vo(ne, V, gt, xs, _), ga = new So(gt, ne, ve, _), ma = new Mn(
  Ye,
  ie,
  xe,
  _s,
  _
), va = new Oo(V, me, ne, _), Aa = new Jr(
  Ye,
  V,
  xe,
  _
), ya = new mn(V, ue, _), ba = new _n(xe), wa = new Mo(), mt = new xn(ue, _), Ca = new xo(mt, V, _), xa = new Fr(ue, _), _a = new Ur(mt, V, _), $a = new Lo(Ge, _), ka = new Fo(V, _), $s = new qo(ne, me, ve, bs, _), Ma = new Eo($s), Fa = new Do($s, _), Sa = new Lr(ie, _), Ta = new gn(V, ie, ue, _), Ia = new Or(ie, ve, ne, _), ks = new fe();
new Uo(ks);
const ja = new Ro(), Ba = new be((n) => {
  ja.value(
    new U(n, (e) => {
      L(e.width, n);
    })
  );
}), Oa = new $o(Ba), Pa = {
  mapCurrentID: ue,
  mapFile: V,
  mapCurrent: ie,
  mapCurrentSource: ea,
  mapRemoved: ya,
  mapSettings: sa,
  mapObject: xe,
  mapObjectRemoved: ra,
  mapType: Cs,
  mapTypeRemoved: ca,
  mapTypeNew: la,
  mapObjectsVisible: Je,
  mapObjectCurrent: Ye,
  mapObjectNew: aa,
  mapObjectsLink: ma,
  mapTypeCurrent: ta,
  mapRects: da,
  mapBackground: na,
  mapObjectArrows: fa,
  mapObjectsGeometryFix: ua,
  canvas: me,
  miniMap: ga,
  notification: qe,
  modal: Yo,
  drawer: As,
  konvaLayer: ne,
  resizing: va,
  objectAdditionalFieldsFix: Aa,
  mapObjectRelationRemoved: ba,
  fps: wa,
  breadcrumbs: Ca,
  mapObjectUrl: xa,
  keyboard: Ge,
  parentNames: mt,
  parentTypes: _a,
  controlCombo: $a,
  menu: ka,
  stagePosition: Ma,
  stagePositionByObjectId: Fa,
  objectsMatchedToQuery: Sa,
  stageSize: ve,
  mapHistory: Ta,
  fileContent: ys,
  newArrow: _s,
  objectsOutsideScreen: Ia,
  settings: vs,
  documentTitle: Zo,
  sidebarDraggable: ks,
  device: Oa
}, Q = () => Pa;
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
const Ea = { key: 0 }, Da = { class: "flex-grow overflow-y-auto" }, Ra = {
  key: 1,
  class: "flex gap-1"
}, vt = /* @__PURE__ */ P({
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
    }, { drawer: o, device: c } = Q(), a = () => {
      o.give(""), s("close");
    }, h = o.isOpenedByName(t.name, new I()).ref();
    return c.value(new ut((l) => {
      l.isMobile ? (r.ltr = r.ltr.replace("[50%]", "[100%]"), r.rtl = r.rtl.replace("[50%]", "[100%]")) : (r.ltr = r.ltr.replace("[100%]", "[50%]"), r.rtl = r.rtl.replace("[100%]", "[50%]"));
    })), (l, d) => (f(), z(rs, { name: "fade" }, {
      default: w(() => [
        u(h) ? (f(), y("div", {
          key: 0,
          class: te(i.value),
          onClick: a
        }, [
          b("div", {
            class: te(["absolute bg-white h-full p-3 flex flex-col overflow-hidden", r[n.direction]]),
            onClick: d[0] || (d[0] = we(() => {
            }, ["stop"]))
          }, [
            l.$slots.header ? (f(), y("div", Ea, [
              se(l.$slots, "header", { class: "BaseDrawer-Header" })
            ])) : T("", !0),
            b("div", Da, [
              se(l.$slots, "default")
            ]),
            l.$slots.footer ? (f(), y("div", Ra, [
              se(l.$slots, "footer")
            ])) : T("", !0)
          ], 2)
        ], 2)) : T("", !0)
      ]),
      _: 3
    }));
  }
}), q = /* @__PURE__ */ P({
  __name: "BaseIcon",
  props: {
    icon: {
      type: String
    }
  },
  setup(n) {
    const e = {
      "fa-bars": ei,
      "fa-bars-staggered": Xs,
      "fa-text-width": Zs,
      "fa-search": Js,
      "fa-history": Ys,
      "fa-plus-square": qs,
      "fa-cog": Gs,
      "fa-file-text": Ks,
      "fa-rotate-left": Ws,
      "fa-rotate-right": Qs,
      "fa-map": Ls,
      "fa-close": Us,
      "fa-arrow-left": zs,
      "fa-arrow-right": Vs,
      "fa-arrow-down": Ns,
      "fa-arrow-up": Hs
    };
    return (t, s) => (f(), z(u(Rs), {
      icon: e[n.icon]
    }, null, 8, ["icon"]));
  }
}), Ha = /* @__PURE__ */ b("h2", { class: "text-lg font-bold" }, " Карты в файле ", -1), Na = ["onClick"], Va = /* @__PURE__ */ P({
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
    return (a, h) => (f(), z(vt, {
      direction: "rtl",
      name: "fileMaps"
    }, {
      header: w(() => [
        Ha
      ]),
      default: w(() => [
        b("div", null, [
          (f(!0), y(W, null, G(u(r), (l, d) => (f(), y("div", {
            key: d,
            class: "flex items-center gap-2"
          }, [
            b("a", {
              href: "#",
              class: te({ "font-bold": u(o) === d }),
              onClick: we((p) => {
                u(t).give(d), u(s).give("");
              }, ["prevent"])
            }, C(l.settings.title), 11, Na),
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
}), za = { class: "AppMenuObject" }, Ua = {
  key: 0,
  class: "AppMenuObject-Empty"
}, La = {
  key: 1,
  class: "flex flex-col gap-1"
}, Qa = ["onClick"], Wa = ["innerHTML"], Ka = /* @__PURE__ */ P({
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
    ), (a, h) => (f(), z(vt, {
      direction: "rtl",
      name: "menu"
    }, {
      default: w(() => [
        b("div", za, [
          u(c).length ? (f(), y("div", La, [
            (f(!0), y(W, null, G(u(c), (l) => (f(), y("a", {
              key: l.id,
              class: "AppMenuObject-Item",
              href: "#",
              onClick: we((d) => {
                u(i).give(l), u(t).give("");
              }, ["prevent"])
            }, [
              b("span", {
                innerHTML: l.additionalName ? l.additionalName : l.name
              }, null, 8, Wa)
            ], 8, Qa))), 128))
          ])) : (f(), y("div", Ua, C(a.$t("appMenuObject.noItems")), 1))
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
    return t.push(""), (s, i) => (f(), y("button", {
      type: "button",
      class: te(t)
    }, [
      se(s.$slots, "default")
    ]));
  }
}), Ga = {
  key: 0,
  title: "Назад",
  class: "absolute text-white left-0 top-0 -ml-5 flex justify-center items-center bg-primary/70 hover:bg-primary-second/70 cursor-pointer w-5"
}, qa = {
  key: 1,
  class: "BaseModal-Header"
}, Ya = { class: "overflow-y-auto flex-grow" }, Ja = {
  key: 2,
  class: "BaseModal-Footer"
}, Ae = /* @__PURE__ */ P({
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
    return (o, c) => (f(), z(rs, { name: "fade" }, {
      default: w(() => [
        u(s) ? (f(), y("div", {
          key: 0,
          class: "absolute rounded-main overflow-y-auto flex justify-center items-center top-0 left-0 bg-black/10 z-20 h-full w-full",
          onClick: r
        }, [
          b("div", {
            class: "w-full relative flex flex-col max-w-[800px] max-h-[90%] bg-white p-3",
            onClick: c[0] || (c[0] = we(() => {
            }, ["stop"]))
          }, [
            i.length > 1 ? (f(), y("div", Ga, " < ")) : T("", !0),
            b("div", {
              title: "Закрыть",
              class: "e2e-modal-close absolute text-white right-0 top-0 -mr-5 flex justify-center items-center bg-danger/70 hover:bg-danger-second/70 cursor-pointer w-5",
              onClick: r
            }, " × "),
            o.$slots.header ? (f(), y("div", qa, [
              se(o.$slots, "header")
            ])) : T("", !0),
            b("div", Ya, [
              se(o.$slots, "default")
            ]),
            o.$slots.footer ? (f(), y("div", Ja, [
              se(o.$slots, "footer")
            ])) : T("", !0)
          ])
        ])) : T("", !0)
      ]),
      _: 3
    }));
  }
}), Za = { class: "AppPresets" }, Xa = /* @__PURE__ */ b("div", { class: "text-md font-bold mb-2" }, "Общие", -1), ec = { class: "flex flex-col gap-2" }, tc = { class: "text-md font-bold mb-1" }, sc = { class: "flex gap-2 flex-wrap items-end" }, ic = { class: "AppTypesParent-ItemTitle" }, nc = ["innerHTML"], rc = /* @__PURE__ */ P({
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
    return (o, c) => (f(), z(Ae, { name: "presets" }, {
      default: w(() => [
        b("div", Za, [
          Xa,
          b("div", ec, [
            (f(!0), y(W, null, G(r.value, (a, h) => (f(), y("div", { key: h }, [
              b("h3", tc, C(h), 1),
              b("div", sc, [
                (f(!0), y(W, null, G(a, (l) => (f(), y("div", {
                  key: l.preset.name,
                  class: "flex flex-col gap-2"
                }, [
                  b("div", ic, C(l.preset.name), 1),
                  b("div", {
                    class: "AppTypesParent-ItemImage",
                    innerHTML: l.image,
                    style: ce(`width:${l.preset.width}px;height:${l.preset.height}px`)
                  }, null, 12, nc),
                  m(D, {
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
      ge(() => {
        t.autofocus && i.value.focus();
      }, 500)
    );
    const r = Qe(t, "modelValue", s);
    return (o, c) => Le((f(), y("input", {
      ref_key: "input",
      ref: i,
      "onUpdate:modelValue": c[0] || (c[0] = (a) => Be(r) ? r.value = a : null),
      class: "block rounded-main w-full p-2 border border-solid border-body-dark",
      type: "text"
    }, null, 512)), [
      [os, u(r)]
    ]);
  }
});
class At {
  constructor(e) {
    $(this, "pool", new We(this));
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
const oc = { class: "AppSearch" }, ac = {
  key: 0,
  class: "AppSearch-Items"
}, cc = ["onClick"], lc = ["innerHTML"], uc = ["innerHTML"], dc = ["innerHTML"], hc = { key: 1 }, pc = { key: 2 }, fc = /* @__PURE__ */ P({
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
      new At(h),
      new I([])
    ).ref();
    return t.happened(
      "KeyF",
      o.create(r.create(() => {
        s.give("search");
      }))
    ), (d, p) => (f(), z(Ae, { name: "search" }, {
      default: w(() => [
        b("div", oc, [
          m(ae, {
            ref_key: "inputRef",
            ref: c,
            modelValue: h.value,
            "onUpdate:modelValue": p[0] || (p[0] = (v) => h.value = v),
            class: "mb-2 e2e-query-input",
            placeholder: d.$t("general.specifyQuery")
          }, null, 8, ["modelValue", "placeholder"]),
          u(l).length ? (f(), y("div", ac, [
            (f(!0), y(W, null, G(u(l), (v) => (f(), y("div", {
              key: v.name,
              class: "cursor-pointer",
              onClick: we((g) => {
                u(i).give(v), u(s).give("");
              }, ["prevent"])
            }, [
              b("b", {
                class: "AppSearch-ItemName",
                innerHTML: v.name
              }, null, 8, lc),
              v.additionalName ? (f(), y("b", {
                key: 0,
                class: "AppSearch-ItemName",
                innerHTML: v.additionalName
              }, null, 8, uc)) : T("", !0),
              v.additionalFields ? (f(), y("div", {
                key: 1,
                innerHTML: Object.values(v.additionalFields).join(" ")
              }, null, 8, dc)) : T("", !0)
            ], 8, cc))), 128))
          ])) : h.value ? (f(), y("div", hc, C(d.$t("general.noResults")), 1)) : (f(), y("div", pc, C(d.$t("general.resultsWillBeHere")), 1))
        ])
      ]),
      _: 1
    }));
  }
}), gc = { class: "AppTypes" }, mc = /* @__PURE__ */ b("div", { class: "text-md font-bold mb-2" }, "Родительские типы", -1), vc = { class: "flex gap-2 items-end" }, Ac = { class: "AppTypesParent-ItemTitle" }, yc = ["innerHTML"], bc = /* @__PURE__ */ P({
  __name: "AppTypesParent",
  setup(n) {
    const { parentTypes: e, mapType: t } = Q(), { svgMapTypeImage: s } = J(), i = e.types(new I()).ref(), r = Ie(() => {
      var o;
      return (o = i.value) == null ? void 0 : o.map((c) => ({
        type: c,
        image: s.create(c).markup()
      })).sort((c, a) => +(c.type.name >= a.type.name));
    });
    return (o, c) => (f(), z(Ae, { name: "parentTypes" }, {
      default: w(() => [
        b("div", gc, [
          mc,
          b("div", vc, [
            (f(!0), y(W, null, G(r.value, (a) => (f(), y("div", {
              key: a.type.name,
              class: "flex flex-col gap-2"
            }, [
              b("div", Ac, C(a.type.name), 1),
              b("div", {
                class: "AppTypesParent-ItemImage",
                innerHTML: a.image,
                style: ce(`width:${a.type.width}px;height:${a.type.height}px`)
              }, null, 12, yc),
              m(D, {
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
class Ms {
  constructor(e, t = void 0) {
    $(this, "innerRef");
    this.executor = e, this.innerRef = ee(t);
  }
  ref() {
    return this.executor(this.innerRef), this.innerRef;
  }
}
const wc = { class: "flex gap-2" }, ot = /* @__PURE__ */ P({
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
    return (r, o) => (f(), y("label", wc, [
      Le(b("input", {
        "onUpdate:modelValue": o[0] || (o[0] = (c) => Be(i) ? i.value = c : null),
        type: "checkbox"
      }, null, 512), [
        [Is, u(i)]
      ]),
      r.$slots.default ? se(r.$slots, "default", { key: 0 }) : (f(), y(W, { key: 1 }, [
        O(C(n.label), 1)
      ], 64))
    ]));
  }
}), Ze = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [s, i] of e)
    t[s] = i;
  return t;
}, Cc = {}, xc = { class: "text-sm font-bold" };
function _c(n, e) {
  return f(), y("div", xc, [
    se(n.$slots, "default")
  ]);
}
const Y = /* @__PURE__ */ Ze(Cc, [["render", _c]]), $c = {}, kc = { class: "mb-2" };
function Mc(n, e) {
  return f(), y("div", kc, [
    se(n.$slots, "default")
  ]);
}
const X = /* @__PURE__ */ Ze($c, [["render", Mc]]), Fc = { class: "rounded-main p-2 border border-solid border-body-dark" }, Sc = { class: "flex gap-2 p-2 bg-white border border-solid border-body-dark rounded-main" }, Ve = /* @__PURE__ */ P({
  __name: "BaseEditor",
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = n, s = e, i = ti({
      content: t.modelValue,
      extensions: [
        ni
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
    }), (r, o) => (f(), y("div", Fc, [
      m(u(si), { editor: u(i) }, null, 8, ["editor"]),
      u(i) ? (f(), z(u(ii), {
        key: 0,
        editor: u(i),
        "tippy-options": { duration: 100 }
      }, {
        default: w(() => [
          b("div", Sc, [
            b("button", {
              onClick: o[0] || (o[0] = (c) => u(i).chain().focus().toggleBold().run()),
              class: te({ "font-bold": u(i).isActive("bold") })
            }, " bold ", 2),
            b("button", {
              onClick: o[1] || (o[1] = (c) => u(i).chain().focus().toggleItalic().run()),
              class: te({ "font-bold": u(i).isActive("italic") })
            }, " italic ", 2),
            b("button", {
              onClick: o[2] || (o[2] = (c) => u(i).chain().focus().toggleStrike().run()),
              class: te({ "font-bold": u(i).isActive("strike") })
            }, " strike ", 2)
          ])
        ]),
        _: 1
      }, 8, ["editor"])) : T("", !0)
    ]));
  }
}), Tc = ["value"], Ic = /* @__PURE__ */ P({
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
    return (r, o) => Le((f(), y("select", {
      label: "select",
      "onUpdate:modelValue": o[0] || (o[0] = (c) => Be(i) ? i.value = c : null),
      class: "block bg-white rounded-main w-full p-2 border border-solid border-body-dark"
    }, [
      (f(!0), y(W, null, G(t.items, (c) => (f(), y("option", {
        key: c[t.optionId],
        value: c[t.optionId]
      }, C(c[t.optionLabel]), 9, Tc))), 128))
    ], 512)), [
      [Bs, u(i)]
    ]);
  }
}), jc = { class: "text-lg font-bold" }, Bc = {
  key: 0,
  class: "flex gap-2 items-center"
}, Oc = {
  key: 1,
  class: "flex gap-2 mt-2"
}, Pc = { key: 0 }, Ec = { key: 1 }, Dc = {
  key: 0,
  class: "flex flex-col gap-2"
}, Rc = { class: "FormObject-Inner" }, Hc = { class: "FormObject-Row" }, Nc = { class: "FormObject-Row" }, Vc = { class: "FormObject-Row" }, zc = { class: "my-2" }, Uc = { class: "FormObject-Title" }, Lc = { class: "FormObject-Row" }, Qc = { class: "FormObject-Title" }, Wc = { class: "FormObject-Row" }, Kc = {
  key: 0,
  class: "FormObject-ArrowName"
}, Gc = { class: "py-3 flex gap-1" }, qc = /* @__PURE__ */ P({
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
      guest: v
    } = J(), g = new Ms(() => {
      const B = p.create();
      t.objectId(d.create(B.receiveKey("objectId"))), s.currentMap(d.create(B.receiveKey("map"))), B.result(d.create(
        v.create(({ map: F, objectId: M }) => {
          e("object opened", M), g.value = F.objects[M];
        })
      ));
    }).ref(), x = r.types(new I()).ref(), A = s.currentMap(new I()).ref(), k = new At(g), j = h.url(k, new I()).ref(), K = () => {
      t.give(""), o.give("");
    }, R = () => {
      c.give(g.value), K();
    }, re = () => {
      i.give({
        ...g.value,
        outlink: g.value.outlink || j.value
      }), K();
    }, E = (B) => {
      a.give({
        index: B,
        object: g.value
      });
    };
    return l.happenedConditional(
      "KeyS",
      o.openedByName("object"),
      d.create(v.create(re))
    ), (B, F) => (f(), z(vt, {
      name: "object",
      onClose: K
    }, {
      header: w(() => [
        b("h2", jc, C(B.$t("general.mapObject")), 1),
        u(g) ? (f(), y("small", Bc, [
          b("span", null, " ID #" + C(u(g).id), 1)
        ])) : T("", !0),
        u(g) ? (f(), y("div", Oc, [
          u(g).createTimestamp ? (f(), y("div", Pc, " Создан: " + C(new Date(u(g).createTimestamp).toLocaleString()), 1)) : T("", !0),
          u(g).changeTimestamp ? (f(), y("div", Ec, " Изменен: " + C(new Date(u(g).changeTimestamp).toLocaleString()), 1)) : T("", !0)
        ])) : T("", !0)
      ]),
      footer: w(() => [
        b("div", Gc, [
          m(D, {
            type: "success",
            onClick: re
          }, {
            default: w(() => [
              O(C(B.$t("general.save")), 1)
            ]),
            _: 1
          }),
          m(D, {
            type: "danger",
            onClick: R
          }, {
            default: w(() => [
              O(C(B.$t("general.delete")), 1)
            ]),
            _: 1
          }),
          m(D, { onClick: K }, {
            default: w(() => [
              O(C(B.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: w(() => [
        u(g) ? (f(), y("div", Dc, [
          b("div", Rc, [
            b("div", Hc, [
              m(ot, {
                modelValue: u(g).linked,
                "onUpdate:modelValue": F[0] || (F[0] = (M) => u(g).linked = M),
                label: B.$t("general.nameAsLink")
              }, null, 8, ["modelValue", "label"])
            ]),
            u(g).linked ? (f(), y(W, { key: 0 }, [
              m(Y, null, {
                default: w(() => [
                  O(C(B.$t("general.outerLink")), 1)
                ]),
                _: 1
              }),
              b("div", Nc, [
                m(ae, {
                  "model-value": u(g).outlink || u(j),
                  "onUpdate:modelValue": F[1] || (F[1] = (M) => u(g).outlink = M)
                }, null, 8, ["model-value"])
              ]),
              b("div", Vc, [
                m(ot, {
                  modelValue: u(g).targetBlank,
                  "onUpdate:modelValue": F[2] || (F[2] = (M) => u(g).targetBlank = M),
                  label: B.$t("general.inNewTab")
                }, null, 8, ["modelValue", "label"])
              ])
            ], 64)) : T("", !0),
            (f(!0), y(W, null, G(u(g).additionalFields, (M, Z) => (f(), z(X, {
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
                    O(C(B.$t("general.topName")), 1)
                  ]),
                  _: 1
                }),
                m(Ve, {
                  modelValue: u(g).additionalName,
                  "onUpdate:modelValue": F[3] || (F[3] = (M) => u(g).additionalName = M)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            m(X, null, {
              default: w(() => [
                m(Y, null, {
                  default: w(() => [
                    O(C(B.$t("general.bottomName")), 1)
                  ]),
                  _: 1
                }),
                m(Ve, {
                  modelValue: u(g).name,
                  "onUpdate:modelValue": F[4] || (F[4] = (M) => u(g).name = M)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            m(X, null, {
              default: w(() => [
                m(Y, null, {
                  default: w(() => [
                    O(C(B.$t("general.description")), 1)
                  ]),
                  _: 1
                }),
                m(Ve, {
                  modelValue: u(g).description,
                  "onUpdate:modelValue": F[5] || (F[5] = (M) => u(g).description = M)
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
                m(ae, {
                  modelValue: u(g).zindex,
                  "onUpdate:modelValue": F[6] || (F[6] = (M) => u(g).zindex = M),
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
                m(ae, {
                  modelValue: u(g).width,
                  "onUpdate:modelValue": F[7] || (F[7] = (M) => u(g).width = M),
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
                m(ae, {
                  modelValue: u(g).height,
                  "onUpdate:modelValue": F[8] || (F[8] = (M) => u(g).height = M),
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
                    O(C(B.$t("general.objectType")), 1)
                  ]),
                  _: 1
                }),
                m(Ic, {
                  modelValue: u(g).type,
                  "onUpdate:modelValue": F[9] || (F[9] = (M) => u(g).type = M),
                  items: u(x),
                  "option-id": "id",
                  "option-label": "name"
                }, null, 8, ["modelValue", "items"])
              ]),
              _: 1
            }),
            b("div", zc, [
              m(ot, {
                modelValue: u(g).inMenu,
                "onUpdate:modelValue": F[10] || (F[10] = (M) => u(g).inMenu = M),
                label: B.$t("general.useInMenu")
              }, null, 8, ["modelValue", "label"])
            ]),
            u(g).inMenu ? (f(), y(W, { key: 1 }, [
              b("div", Uc, C(B.$t("general.menuOrder")), 1),
              b("div", Lc, [
                m(ae, {
                  modelValue: u(g).menuOrder,
                  "onUpdate:modelValue": F[11] || (F[11] = (M) => u(g).menuOrder = M),
                  type: "number"
                }, null, 8, ["modelValue"])
              ])
            ], 64)) : T("", !0),
            u(g).arrows && u(g).arrows.length ? (f(), y(W, { key: 2 }, [
              b("div", Qc, C(B.$t("general.relations")), 1),
              b("div", Wc, [
                (f(!0), y(W, null, G(u(g).arrows, (M, Z) => {
                  var le;
                  return f(), y("div", {
                    key: M.id,
                    class: "FormObject-Arrow"
                  }, [
                    (le = u(A)) != null && le.objects[M.id] ? (f(), y("span", Kc, " #" + C(Z + 1) + " " + C(u(A).objects[M.id].name), 1)) : T("", !0),
                    m(D, {
                      class: "FormObject-ArrowButton",
                      type: "danger",
                      size: "sm",
                      onClick: (ye) => E(Z)
                    }, {
                      default: w(() => [
                        O(C(B.$t("general.delete")), 1)
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
}), Yc = { class: "BaseTextarea" }, Jc = ["v-bind"], Fs = /* @__PURE__ */ P({
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
    return (r, o) => (f(), y("div", Yc, [
      Le(b("textarea", {
        ref: "textarea",
        "v-bind": r.$attrs,
        "onUpdate:modelValue": o[0] || (o[0] = (c) => Be(i) ? i.value = c : null),
        class: "rounded-main block w-full p-2 border min-h-[200px] border-solid border-body-dark"
      }, null, 8, Jc), [
        [os, u(i)]
      ])
    ]));
  }
}), Zc = { class: "text-lg font-bold" }, Xc = {
  key: 0,
  class: "flex flex-col"
}, el = { class: "flex justify-end pt-4 gap-2" }, tl = /* @__PURE__ */ P({
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
      o.create(a.create((g) => {
        g && i.give("type");
      }))
    );
    const h = ee(""), l = c.create(), d = new Ms(() => {
      e.typeId(o.create(l.receiveKey("typeId"))), t.currentMap(o.create(l.receiveKey("map"))), l.result(o.create(
        a.create(({ map: g, typeId: x }) => {
          var A;
          d.value = g.types[x], h.value = (A = d.value) == null ? void 0 : A.name;
        })
      ));
    }).ref(), p = () => {
      e.give(""), i.give(""), l.receiveKey("typeId").give("");
    }, v = () => {
      s.give({
        name: h.value,
        type: d.value
      }), p();
    };
    return r.happenedConditional(
      "KeyS",
      i.openedByName("type"),
      o.create(a.create(v))
    ), (g, x) => (f(), z(Ae, { name: "type" }, {
      header: w(() => [
        b("h2", Zc, C(g.$t("general.mapType")), 1)
      ]),
      footer: w(() => [
        b("div", el, [
          m(D, {
            type: "success",
            onClick: v
          }, {
            default: w(() => [
              O(C(g.$t("general.save")), 1)
            ]),
            _: 1
          }),
          m(D, { onClick: p }, {
            default: w(() => [
              O(C(g.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: w(() => [
        u(d) ? (f(), y("div", Xc, [
          m(X, null, {
            default: w(() => [
              m(Y, null, {
                default: w(() => [
                  O(" Название типа ")
                ]),
                _: 1
              }),
              m(ae, {
                modelValue: u(d).name,
                "onUpdate:modelValue": x[0] || (x[0] = (A) => u(d).name = A)
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
                "onUpdate:modelValue": x[1] || (x[1] = (A) => u(d).svg = A)
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
              m(ae, {
                modelValue: u(d).width,
                "onUpdate:modelValue": x[2] || (x[2] = (A) => u(d).width = A)
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
              m(ae, {
                modelValue: u(d).height,
                "onUpdate:modelValue": x[3] || (x[3] = (A) => u(d).height = A)
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
class sl {
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
const il = /* @__PURE__ */ P({
  __name: "BaseNotify",
  setup(n) {
    const { notification: e } = Q(), t = e.message(new I()).ref();
    return (s, i) => u(t) && u(t).text !== "hide" ? (f(), y("div", {
      key: 0,
      class: te(["inline font-bold", `text-${u(t).type}-second`])
    }, C(u(t).text), 3)) : T("", !0);
  }
}), nl = { class: "relative" }, rl = { class: "absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-1" }, ol = { class: "text-sm z-10 p-2 absolute bottom-0 left-5" }, al = /* @__PURE__ */ Os('<div class="absolute bottom-3 shadow-standard-second shadow-md drop-shadow right-3 z-10"><div class="grid-example grid grid-rows-2 grid-cols-2 bg-standard-second border border-standard-second gap-[1px] border-t-0 border-l-0"><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div></div></div><div class="absolute z-30 top-0 left-0 h-[18px] w-[22px] bg-white"></div>', 2), cl = ["title"], ll = { class: "font-bold" }, ul = ["title"], dl = { class: "font-bold" }, hl = ["title"], pl = { class: "font-bold" }, fl = ["title"], gl = { class: "font-bold" }, ml = ["data-object-id"], vl = { class: "absolute bottom-[100%] left-[50%] translate-x-[-50%] text-center pb-2 pointer-events-auto text-sm w-[300px]" }, Al = ["innerHTML", "onClick"], yl = ["innerHTML"], bl = ["data-object-id", "innerHTML"], wl = /* @__PURE__ */ P({
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
    } = Q(), p = J(), v = r.value(new I()).ref(), x = new sl(
      t,
      s,
      p
    ).objects(new I([])).ref(), A = a.value(new I()).ref(), k = i.position(new I()).ref(), j = Ie(() => {
      var ye;
      return (ye = A.value) == null ? void 0 : ye.width;
    }), K = new At(j), R = p.numberChunks.create(10, K).chunks(new I()).ref(), re = ee();
    as(() => {
      e.give(re.value);
    });
    const E = (ye) => {
      c.open(ye, p.guest.create((oe) => {
        o.give(oe);
      }));
    }, B = h.count(
      { axis: "x", direction: "negative" },
      new I()
    ).ref(), F = h.count(
      { axis: "x", direction: "positive" },
      new I()
    ).ref(), M = h.count(
      { axis: "y", direction: "negative" },
      new I()
    ).ref(), Z = h.count(
      { axis: "y", direction: "positive" },
      new I()
    ).ref(), le = l.move.bind(l, d);
    return (ye, oe) => {
      var yt, bt, wt, Ct, xt, _t, $t, kt, Mt, Ft, St, Tt;
      return f(), y("div", nl, [
        b("div", rl, [
          b("div", ol, [
            O(" Видимых объектов: " + C(u(x).length) + ", FPS: " + C(u(v)) + ", ", 1),
            m(il)
          ]),
          al,
          ((yt = u(B)) == null ? void 0 : yt.count) > 0 ? (f(), y("div", {
            key: 0,
            class: "pointer-events-auto absolute z-30 top-0 left-4 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(bt = u(B)) == null ? void 0 : bt.count} шт. объектов левее`,
            onClick: oe[0] || (oe[0] = (N) => u(le)(u(B).nearestObjectId))
          }, [
            m(q, { icon: "fa-arrow-left" }),
            b("span", ll, C((wt = u(B)) == null ? void 0 : wt.count), 1)
          ], 8, cl)) : T("", !0),
          ((Ct = u(F)) == null ? void 0 : Ct.count) > 0 ? (f(), y("div", {
            key: 1,
            class: "pointer-events-auto absolute z-30 p-1 top-0 right-0 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(xt = u(F)) == null ? void 0 : xt.count} шт. объектов правее`,
            onClick: oe[1] || (oe[1] = (N) => u(le)(u(F).nearestObjectId))
          }, [
            b("span", dl, C((_t = u(F)) == null ? void 0 : _t.count), 1),
            m(q, { icon: "fa-arrow-right" })
          ], 8, ul)) : T("", !0),
          (($t = u(M)) == null ? void 0 : $t.count) > 0 ? (f(), y("div", {
            key: 2,
            class: "pointer-events-auto absolute z-30 top-[18px] left-0 w-[18px] bg-white flex flex-col leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(kt = u(M)) == null ? void 0 : kt.count} шт. объектов выше`,
            onClick: oe[2] || (oe[2] = (N) => u(le)(u(M).nearestObjectId))
          }, [
            m(q, { icon: "fa-arrow-up" }),
            b("span", pl, C((Mt = u(M)) == null ? void 0 : Mt.count), 1)
          ], 8, hl)) : T("", !0),
          ((Ft = u(Z)) == null ? void 0 : Ft.count) > 0 ? (f(), y("div", {
            key: 3,
            class: "pointer-events-auto absolute z-30 p-1 bottom-0 left-0 w-[18px] bg-white flex flex-col-reverse leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(St = u(Z)) == null ? void 0 : St.count} шт. объектов ниже`,
            onClick: oe[3] || (oe[3] = (N) => u(le)(u(Z).nearestObjectId))
          }, [
            m(q, { icon: "fa-arrow-down" }),
            b("span", gl, C((Tt = u(Z)) == null ? void 0 : Tt.count), 1)
          ], 8, fl)) : T("", !0),
          b("div", {
            class: te({ "objects-container absolute top-0 left-0": !0 }),
            style: ce({ width: `${u(A).width}px`, height: `${u(A).height}px`, transform: `translate(${u(k).x}px, ${u(k).y}px)` })
          }, [
            b("div", {
              class: "absolute flex top-0 left-0 w-full z-20 h-[20px] bg-default border-b-2 border-border text-right text-sm px-2",
              style: ce({ transform: `translate(0, ${-u(k).y}px)` })
            }, [
              (f(!0), y(W, null, G(u(R), (N) => (f(), y("span", {
                class: "flex-1 text-body-dark",
                key: `horiz_${N}`
              }, C(N) + "px", 1))), 128))
            ], 4),
            b("div", {
              class: "absolute flex [writing-mode:vertical-lr] top-0 left-0 h-full z-20 w-[20px] bg-default border-r-2 border-border text-left text-sm py-2",
              style: ce({ transform: `translate(${-u(k).x}px, 0)` })
            }, [
              (f(!0), y(W, null, G(u(R), (N) => (f(), y("span", {
                class: "flex-1 rotate-180 text-body-dark",
                key: `vert_${N}`
              }, C(N) + "px", 1))), 128))
            ], 4),
            (f(!0), y(W, null, G(u(x), (N) => (f(), y("div", {
              key: N.obj.id,
              class: "absolute z-10",
              "data-object-id": N.obj.id,
              style: ce(`width:${N.obj.width}px;height: ${N.obj.height}px;top: ${N.obj.position[1]}px;left:${N.obj.position[0]}px;z-index:${N.obj.zindex}`)
            }, [
              b("div", vl, [
                b("span", {
                  innerHTML: N.obj.additionalName,
                  class: te([N.obj.linked && "cursor-pointer underline"]),
                  onClick: (Au) => E(N.obj)
                }, null, 10, Al)
              ]),
              b("div", {
                class: "absolute top-[100%] left-[50%] translate-x-[-50%] text-center pt-2 text-sm w-[300px]",
                innerHTML: N.obj.name
              }, null, 8, yl),
              b("div", {
                "data-object-id": N.obj.id,
                class: "rendered-object",
                innerHTML: N.template
              }, null, 8, bl)
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
}), Cl = { class: "flex flex-wrap gap-2" }, xl = { key: 0 }, _l = { key: 1 }, $l = ["onClick"], kl = /* @__PURE__ */ P({
  __name: "BaseBreadcrumbs",
  setup(n) {
    const {
      breadcrumbs: e,
      mapCurrentID: t
    } = Q(), s = e.list(new I()).ref();
    return (i, r) => (f(), y("div", Cl, [
      (f(!0), y(W, null, G(u(s), (o, c) => (f(), y("span", {
        class: "flex gap-2",
        key: o.name
      }, [
        c !== 0 ? (f(), y("span", xl, "/")) : T("", !0),
        c === u(s).length - 1 ? (f(), y("b", _l, "Открыто: " + C(o.title), 1)) : (f(), y("a", {
          key: 2,
          href: "#",
          onClick: we((a) => u(t).give(o.name), ["prevent"])
        }, C(o.title), 9, $l))
      ]))), 128))
    ]));
  }
}), Ml = { class: "flex items-center p-3 gap-3" }, Fl = { class: "ml-auto gap-1 flex" }, Sl = /* @__PURE__ */ P({
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
    return r.value(l), (d, p) => (f(), y("div", Ml, [
      m(kl, { class: "TheHeader-Breadcrumbs" }),
      b("div", Fl, [
        u(a) && !u(l).value.readonly ? (f(), z(D, {
          key: 0,
          size: "sm",
          title: "Отменить последнее действие",
          class: "w-7 block",
          onClick: p[0] || (p[0] = (v) => u(s).next())
        }, {
          default: w(() => [
            m(q, { icon: "fa-rotate-left" })
          ]),
          _: 1
        })) : T("", !0),
        u(h) && !u(l).value.readonly ? (f(), z(D, {
          key: 1,
          size: "sm",
          title: "Вернуть отмененное действие",
          class: "w-7 block",
          onClick: p[1] || (p[1] = (v) => u(s).prev())
        }, {
          default: w(() => [
            m(q, { icon: "fa-rotate-right" })
          ]),
          _: 1
        })) : T("", !0),
        m(D, {
          type: "success",
          size: "sm",
          class: "w-7 block e2e-open-menu",
          title: d.$t("general.menu"),
          onClick: p[2] || (p[2] = (v) => u(e).give("menu"))
        }, {
          default: w(() => [
            m(q, { icon: "fa-bars" })
          ]),
          _: 1
        }, 8, ["title"]),
        m(D, {
          title: d.$t("general.byText"),
          type: "primary",
          size: "sm",
          class: "w-7 block",
          onClick: p[3] || (p[3] = (v) => u(t).give("mapAsText"))
        }, {
          default: w(() => [
            m(q, { icon: "fa-text-width" })
          ]),
          _: 1
        }, 8, ["title"]),
        m(D, {
          class: "w-7 block e2e-search",
          size: "sm",
          onClick: p[4] || (p[4] = (v) => u(t).give("search"))
        }, {
          default: w(() => [
            m(q, { icon: "fa-search" })
          ]),
          _: 1
        }),
        m(D, {
          size: "sm",
          title: "Все карты файла",
          class: "w-7 block",
          onClick: p[5] || (p[5] = (v) => u(e).give("fileMaps"))
        }, {
          default: w(() => [
            m(q, { icon: "fa-map" })
          ]),
          _: 1
        })
      ])
    ]));
  }
}), Tl = {}, Il = { class: "text-lg font-bold" };
function jl(n, e) {
  return f(), y("span", Il, [
    se(n.$slots, "default")
  ]);
}
const Bl = /* @__PURE__ */ Ze(Tl, [["render", jl]]), Ol = { class: "flex gap-1" }, Pl = {
  key: 0,
  class: "TheMapAsText select-auto"
}, El = ["innerHTML"], Dl = /* @__PURE__ */ P({
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
        s.create(ge((A) => {
          l.value = A, o.create(
            r.create(
              A.map((k) => `<div class="TheMapAsText-Item">
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
    const { share: d, isSupported: p } = Ds(), v = () => {
      p.value || alert("Sharing is not supported"), c.create(
        r.create(
          h.value
        )
      ).asString(
        s.create((A) => {
          d({
            text: A
          });
        })
      );
    }, g = ee(), x = () => {
      var A, k;
      if (a.value) {
        const j = new Range();
        j.setStart(g.value, 0), j.setEnd(g.value, Object.values(l.value).length), (A = document.getSelection()) == null || A.removeAllRanges(), (k = document.getSelection()) == null || k.addRange(j);
      }
    };
    return (A, k) => (f(), z(Ae, { name: "mapAsText" }, {
      header: w(() => [
        m(Bl, { class: "block mb-3" }, {
          default: w(() => [
            O(C(A.$t("general.mapAsText")) + " ", 1),
            b("div", Ol, [
              m(D, {
                size: "sm",
                type: "success",
                class: "font-normal",
                onClick: v
              }, {
                default: w(() => [
                  O(C(A.$t("general.share")), 1)
                ]),
                _: 1
              }),
              m(D, {
                size: "sm",
                type: "primary",
                class: "font-normal",
                onClick: x
              }, {
                default: w(() => [
                  O(C(A.$t("general.selectAll")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        })
      ]),
      default: w(() => [
        u(a) ? (f(), y("article", Pl, [
          b("div", {
            ref_key: "textRef",
            ref: g,
            innerHTML: h.value
          }, null, 8, El)
        ])) : T("", !0)
      ]),
      _: 1
    }));
  }
}), Rl = { key: 1 }, Hl = /* @__PURE__ */ P({
  __name: "TheMiniMap",
  setup(n) {
    const { miniMap: e } = Q(), t = e.points(new I()).ref(), s = e.size(new I()).ref(), i = e.viewportSize(new I()).ref(), r = e.viewportPosition(new I()).ref();
    return (o, c) => u(s) ? (f(), y("div", {
      key: 0,
      style: ce({
        width: `${u(s).width}px`,
        height: `${u(s).height}px`
      }),
      class: "absolute pointer-events-none block bg-white bottom-[10px] mt-3 right-3 z-1 border border-solid border-body-dark"
    }, [
      u(r) ? (f(), y("div", {
        key: 0,
        style: ce({
          width: `${u(i).width}px`,
          height: `${u(i).height}px`,
          top: `${u(r).y}px`,
          left: `${u(r).x}px`
        }),
        class: "absolute bg-primary/50"
      }, null, 4)) : T("", !0),
      u(t) ? (f(), y("div", Rl, [
        (f(!0), y(W, null, G(u(t), (a) => (f(), y("div", {
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
}), Nl = { class: "text-lg font-bold" }, Vl = {
  key: 0,
  class: "TheSettings"
}, zl = { class: "mb-2" }, Ul = { class: "TheSettings-Row" }, Ll = { class: "flex gap-2 mb-2" }, Ql = { class: "mb-2" }, Wl = { class: "mb-2" }, Kl = {
  href: "https://github.com/kosukhin/mind-map-creator",
  target: "_blank"
}, Gl = { class: "flex gap-2" }, ql = /* @__PURE__ */ P({
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
    } = Q(), { patron: a, guest: h } = J(), l = o.names(new I()).ref(), d = t.currentMap(new I()).ref(), p = c.id(new I()).ref(), v = () => {
      e.give("");
    }, g = () => {
      i.give(d.value.settings), v();
    };
    return r.happenedConditional(
      "KeyS",
      e.openedByName("settings"),
      a.create(h.create(g))
    ), (x, A) => (f(), z(Ae, { name: "settings" }, {
      header: w(() => [
        b("h2", Nl, C(x.$t("general.mapSettings")), 1)
      ]),
      default: w(() => {
        var k;
        return [
          (k = u(d)) != null && k.settings ? (f(), y("div", Vl, [
            b("div", zl, [
              b("div", Ul, [
                b("div", Ll, [
                  u(l).length > 1 ? (f(), z(D, {
                    key: 0,
                    type: "primary",
                    class: "text-white",
                    onClick: A[0] || (A[0] = (j) => u(e).give("parentTypes"))
                  }, {
                    default: w(() => [
                      O(C(x.$t("general.parentTypes")), 1)
                    ]),
                    _: 1
                  })) : T("", !0),
                  m(D, {
                    type: "primary",
                    class: "text-white",
                    onClick: A[1] || (A[1] = (j) => u(e).give("export"))
                  }, {
                    default: w(() => [
                      O(C(x.$t("general.exportOrImport")), 1)
                    ]),
                    _: 1
                  }),
                  m(D, {
                    type: "primary",
                    class: "text-white e2e-open-presets",
                    onClick: A[2] || (A[2] = (j) => u(e).give("presets"))
                  }, {
                    default: w(() => [
                      O(" Пресеты ")
                    ]),
                    _: 1
                  })
                ])
              ]),
              b("div", Ql, [
                b("label", null, [
                  b("b", null, C(x.$t("general.mapName")), 1),
                  m(ae, {
                    modelValue: u(d).settings.title,
                    "onUpdate:modelValue": A[3] || (A[3] = (j) => u(d).settings.title = j)
                  }, null, 8, ["modelValue"])
                ])
              ]),
              b("div", Wl, [
                b("a", Kl, C(x.$t("general.githubRepo")), 1)
              ])
            ]),
            b("div", Gl, [
              m(D, {
                class: "TheSettings-Button",
                type: "success",
                onClick: A[4] || (A[4] = (j) => g())
              }, {
                default: w(() => [
                  O(C(x.$t("general.save")), 1)
                ]),
                _: 1
              }),
              m(D, {
                class: "TheSettings-Button",
                onClick: v
              }, {
                default: w(() => [
                  O(C(x.$t("general.cancel")), 1)
                ]),
                _: 1
              }),
              m(D, {
                class: "TheSettings-Button",
                type: "danger",
                onClick: A[5] || (A[5] = (j) => {
                  u(s).give(u(p)), v();
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
}), Yl = {}, Jl = { class: "BaseGroup" };
function Zl(n, e) {
  return f(), y("div", Jl, [
    se(n.$slots, "default")
  ]);
}
const Xl = /* @__PURE__ */ Ze(Yl, [["render", Zl]]), eu = "default", tu = /* @__PURE__ */ P({
  __name: "TheLinker",
  setup(n) {
    const { mapObjectsLink: e } = Q(), t = e.objectIds(new I([])).ref();
    return (s, i) => (f(), z(D, {
      type: eu,
      onClick: i[0] || (i[0] = (r) => u(e).startLink())
    }, {
      default: w(() => [
        O(C(u(t).length === 1 ? "Выбиретие объект" : u(t).length === 2 ? "Второй объект" : "Связать объекты"), 1)
      ]),
      _: 1
    }));
  }
}), su = { class: "flex e2e-sidebar flex-col items-center gap-3 max-h-[100%] overflow-hidden" }, iu = { class: "TheSideBar-ItemName" }, nu = ["innerHTML", "draggable", "title", "onDragend", "onDblclick"], ru = {
  key: 0,
  class: "flex gap-1"
}, ou = {
  key: 0,
  class: "mt-auto w-full p-3 pt-0"
}, au = /* @__PURE__ */ P({
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
    as(() => {
      a.give(l.value);
    });
    const { svgMapTypeImage: d } = J(), p = Ie(() => {
      var g;
      return (g = h.value) == null ? void 0 : g.map((x) => ({
        type: x,
        image: d.create(x).markup()
      })).sort((x, A) => +(x.type.name >= A.type.name));
    }), v = new I();
    return c.value(v), (g, x) => (f(), y("div", su, [
      b("div", {
        ref_key: "dragWrapperRef",
        ref: l,
        class: "flex flex-col gap-3 flex-grow w-full overflow-y-auto"
      }, [
        (f(!0), y(W, null, G(p.value, (A, k) => (f(), y("div", {
          key: k,
          class: "flex flex-col items-center justify-center gap-2"
        }, [
          b("div", iu, C(A.type.name), 1),
          b("div", {
            innerHTML: A.image,
            class: "TheSideBar-ItemImage",
            draggable: u(v).value.readonly ? "false" : "true",
            style: ce(`width:${A.type.width}px;height:${A.type.height}px`),
            title: g.$t("general.notifications.dragToCanvasToAdd"),
            onDragend: (j) => u(e).byTypeName(A.type.id, j),
            onDblclick: (j) => {
              u(e).byTypeName(A.type.id, j), g.$emit("close");
            }
          }, null, 44, nu),
          u(v).value.readonly ? T("", !0) : (f(), y("div", ru, [
            m(D, {
              class: "text-white",
              size: "sm",
              type: "primary",
              onClick: (j) => u(s).give(A.type.id)
            }, {
              default: w(() => [
                O(C(g.$t("general.change")), 1)
              ]),
              _: 2
            }, 1032, ["onClick"]),
            m(D, {
              class: "text-white",
              size: "sm",
              type: "danger",
              onClick: (j) => u(i).give(A.type)
            }, {
              default: w(() => [
                O(C(g.$t("general.delete")), 1)
              ]),
              _: 2
            }, 1032, ["onClick"])
          ]))
        ]))), 128))
      ], 512),
      u(v).value.readonly ? T("", !0) : (f(), y("div", ou, [
        m(Xl, { class: "mb-1 grid gap-1 grid-cols-2" }, {
          default: w(() => [
            m(D, {
              title: g.$t("general.addType"),
              type: "success",
              onClick: x[0] || (x[0] = (A) => u(r).byName())
            }, {
              default: w(() => [
                m(q, { icon: "fa-plus-square" })
              ]),
              _: 1
            }, 8, ["title"]),
            m(D, {
              class: "e2e-show-settings",
              title: g.$t("general.settings"),
              type: "primary",
              onClick: x[1] || (x[1] = (A) => u(o).give("settings"))
            }, {
              default: w(() => [
                m(q, { icon: "fa-cog" })
              ]),
              _: 1
            }, 8, ["title"])
          ]),
          _: 1
        }),
        m(tu, { class: "w-[100%] block mb-1" })
      ]))
    ]));
  }
});
class cu {
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
class lu {
  constructor(e) {
    this.baseSource = e;
  }
  value(e) {
    return this.baseSource.value(
      new U(e, (t) => {
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
class uu {
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
const du = { class: "AppPresets" }, hu = /* @__PURE__ */ b("div", { class: "text-md font-bold mb-2" }, "Экспорт\\Импорт текущей карты", -1), pu = { class: "flex flex-col gap-2" }, fu = /* @__PURE__ */ P({
  __name: "AppExport",
  setup(n) {
    const { mapFile: e, mapCurrent: t } = Q(), s = new uu(
      t,
      new be((c) => {
        e.currentMap(new Ue(c));
      })
    ), i = new lu(s), r = new cu(new I(), i);
    i.value(r);
    const o = r.ref();
    return (c, a) => (f(), z(Ae, { name: "export" }, {
      default: w(() => [
        b("div", du, [
          hu,
          b("div", pu, [
            m(Fs, {
              modelValue: u(o),
              "onUpdate:modelValue": a[0] || (a[0] = (h) => Be(o) ? o.value = h : null)
            }, null, 8, ["modelValue"])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), gu = { class: "absolute bg-body hover:bg-border cursor-pointer border-solid border-border bottom-[150px] right-3 p-3 w-15 h-15" }, mu = /* @__PURE__ */ P({
  __name: "TheSidebarButton",
  setup(n) {
    return (e, t) => (f(), y("div", gu, [
      m(q, { icon: "fa-bars-staggered" })
    ]));
  }
}), vu = { class: "bg-body absolute top-0 left-0 w-full h-full" }, Mu = /* @__PURE__ */ P({
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
    return o.value(l), o.value(new ut((d) => {
      h.value = d.isDesktop;
    })), (d, p) => (f(), y("div", vu, [
      b("div", {
        class: te(["grid grid-rows-[50px_1fr] h-dvh relative", { "grid-cols-[200px_1fr]": !u(l).value.isMobile, "grid-cols-[1fr]": u(l).value.isMobile }])
      }, [
        m(Sl, { class: "col-span-2" }),
        h.value ? (f(), z(au, {
          key: 0,
          class: te({ "bg-[#f3f4f6] w-[200px] absolute top-[50px] left-0 z-10 bottom-0": u(l).value.isMobile }),
          onClose: p[0] || (p[0] = (v) => h.value = !1)
        }, null, 8, ["class"])) : T("", !0),
        m(wl, { class: "w-auto col-auto h-full" }),
        m(Hl),
        u(l).value.isMobile ? (f(), z(mu, {
          key: 1,
          onClick: p[1] || (p[1] = (v) => h.value = !h.value)
        })) : T("", !0)
      ], 2),
      m(qc),
      m(tl),
      m(ql),
      m(rc),
      m(bc),
      m(fu),
      m(Ka),
      m(Dl),
      m(fc),
      m(Va)
    ]));
  }
}), is = S.debug("FileSystemContent");
class Fu {
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
    is("can be used", t);
    const s = window && window.matchMedia("(display-mode: standalone)");
    return e.give(t && s.matches), e;
  }
}
const ze = S.debug("FirstPossibleFileContent");
class Su {
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
class Tu {
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
const ns = new fe();
class Iu {
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
  Iu as BrowserLaunchQueue,
  Fu as FileSystemContent,
  Su as FirstPossibleFileContent,
  Mu as PatronSchemeEditor,
  Tu as UrlContent,
  I as VueRefPatron,
  Q as useApplication,
  J as useFactories
};
