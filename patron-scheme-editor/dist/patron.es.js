var Ms = Object.defineProperty;
var Ts = (r, e, t) => e in r ? Ms(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var $ = (r, e, t) => Ts(r, typeof e != "symbol" ? e + "" : e, t);
import { defineComponent as R, openBlock as f, createBlock as z, Transition as ns, withCtx as y, unref as c, createElementBlock as A, normalizeClass as oe, createElementVNode as b, withModifiers as Ae, renderSlot as Y, createCommentVNode as O, Fragment as U, renderList as Q, toDisplayString as C, createVNode as m, normalizeStyle as ne, createTextVNode as B, withDirectives as ze, isRef as be, vModelText as os, vModelCheckbox as Ss, vModelSelect as js, createStaticVNode as Os } from "vue";
import { useScriptTag as Bs, useMagicKeys as Is, useVModel as Le, useShare as Ps } from "@vueuse/core";
import le from "konva";
import { ref as te, computed as Se, watch as je, onBeforeUnmount as Es, onMounted as as } from "@vue/runtime-core";
import { FontAwesomeIcon as Rs } from "@fortawesome/vue-fontawesome";
import { faArrowUp as Ds, faArrowDown as Ns, faArrowRight as Vs, faArrowLeft as Hs, faClose as Us, faMap as zs, faRotateRight as Ls, faRotateLeft as Qs, faFileText as Ks, faCog as Ws, faPlusSquare as Gs, faHistory as Js, faSearch as Zs, faTextWidth as qs, faBars as Ys } from "@fortawesome/free-solid-svg-icons";
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
class ct {
  constructor(e) {
    this.guestReceiver = e;
  }
  value(e) {
    return this.guestReceiver(e), e;
  }
}
function ue(r, e, t) {
  typeof e == "function" ? e(r, t) : e.give(r, t);
}
class he {
  constructor(e) {
    this.receiver = e;
  }
  give(e, t) {
    return this.receiver(e, t), this;
  }
}
class ye {
  constructor(e, t) {
    this.sourceGuest = e, this.targetGuest = t;
  }
  introduction() {
    return typeof this.sourceGuest == "function" || !this.sourceGuest.introduction ? "guest" : this.sourceGuest.introduction();
  }
  give(e, t) {
    return ue(e, this.targetGuest, t), this;
  }
  disposed(e) {
    const t = this.sourceGuest;
    return t.disposed ? t.disposed(e) : !1;
  }
}
var ri = Object.defineProperty, ni = (r, e, t) => e in r ? ri(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, St = (r, e, t) => ni(r, typeof e != "symbol" ? e + "" : e, t);
const cs = /* @__PURE__ */ new Map(), jt = (r) => {
  cs.forEach((e) => {
    e.delete(r);
  });
};
class Qe {
  constructor(e) {
    this.initiator = e, St(this, "patrons"), St(this, "give"), this.patrons = /* @__PURE__ */ new Set(), cs.set(this, this.patrons);
    let t = null;
    const s = (i, n) => {
      this.patrons.forEach((o) => {
        this.sendValueToGuest(i, o, n);
      });
    };
    this.give = (i, n) => {
      const o = () => {
        o === t && s(i, n);
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
    this.guestDisposed(e, t) || ue(e, t, {
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
var oi = Object.defineProperty, ai = (r, e, t) => e in r ? oi(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, ci = (r, e, t) => ai(r, e + "", t);
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
    return typeof e == "function" ? this.thePool.distribute(this.sourceDocument, new he(e)) : this.thePool.distribute(this.sourceDocument, e), this;
  }
}
class Ue {
  constructor(e) {
    this.baseGuest = e;
  }
  give(e, t) {
    let s = this.baseGuest;
    return typeof s == "function" && (s = new he(s)), s.give(e, t), this;
  }
  introduction() {
    return typeof this.baseGuest == "function" || !this.baseGuest.introduction ? "guest" : this.baseGuest.introduction();
  }
  disposed(e) {
    const t = this.baseGuest;
    return t.disposed ? t.disposed(e) : !1;
  }
}
var li = Object.defineProperty, ui = (r, e, t) => e in r ? li(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, Ot = (r, e, t) => ui(r, typeof e != "symbol" ? e + "" : e, t);
class di {
  constructor(e) {
    Ot(this, "guests", /* @__PURE__ */ new Set()), Ot(this, "patronPool"), this.patronPool = new Qe(e);
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
      ue(e, s, t);
    }), this.guests.clear();
  }
}
var hi = Object.defineProperty, pi = (r, e, t) => e in r ? hi(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, Be = (r, e, t) => pi(r, typeof e != "symbol" ? e + "" : e, t);
class fi {
  constructor() {
    Be(this, "theChain"), Be(this, "keysKnown", /* @__PURE__ */ new Set()), Be(this, "keysFilled", /* @__PURE__ */ new Set()), Be(this, "filledChainPool", new di(this)), this.theChain = new Oe({});
  }
  resultArray(e) {
    const t = new Ue(e);
    return this.filledChainPool.add(
      new ye(t, (s) => {
        t.give(Object.values(s));
      })
    ), this.isChainFilled() && this.theChain.value(
      new he((s) => {
        this.filledChainPool.give(Object.values(s));
      })
    ), this;
  }
  result(e) {
    const t = new Ue(e);
    return this.isChainFilled() ? (this.filledChainPool.add(t), this.theChain.value(
      new he((s) => {
        this.filledChainPool.give(s);
      })
    )) : this.filledChainPool.add(t), this;
  }
  receiveKey(e) {
    return this.keysKnown.add(e), new he((t) => {
      queueMicrotask(() => {
        this.theChain.value(
          new he((s) => {
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
class gi {
  constructor(e) {
    this.willBePatron = e;
  }
  introduction() {
    return "patron";
  }
  give(e, t) {
    return ue(e, this.willBePatron, t), this;
  }
  disposed(e) {
    var s;
    const t = this.willBePatron;
    return ((s = t == null ? void 0 : t.disposed) == null ? void 0 : s.call(t, e)) || !1;
  }
}
var vi = Object.defineProperty, Ai = (r, e, t) => e in r ? vi(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, bi = (r, e, t) => Ai(r, e + "", t);
class yi {
  constructor(e) {
    this.baseGuest = e, bi(this, "received", !1);
  }
  introduction() {
    return "patron";
  }
  give(e, t) {
    this.received || ue(e, this.baseGuest, t);
    const s = t == null ? void 0 : t.data;
    return s != null && s.pool && s.pool.remove(this), this;
  }
  disposed(e) {
    const t = this.baseGuest;
    return t.disposed ? t.disposed(e) : !1;
  }
}
var wi = Object.defineProperty, Ci = (r, e, t) => e in r ? wi(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, _i = (r, e, t) => Ci(r, e + "", t);
class ve {
  constructor() {
    _i(this, "baseSource", new Oe(null));
  }
  value(e) {
    return this.baseSource.value(
      new ye(e, (t) => {
        t !== null && ue(t, e);
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
class D {
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
class Fi {
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
class Ti {
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
        for (let n = 1; n <= this.chunksCount; n += 1)
          i.push(n * s);
        e.give(i);
      })
    ), e;
  }
}
class ji {
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
class Oi {
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
    return Bs(this.url, () => {
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
var Ie = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function lt(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var at = { exports: {} }, qe, Bt;
function Ei() {
  if (Bt) return qe;
  Bt = 1;
  var r = 1e3, e = r * 60, t = e * 60, s = t * 24, i = s * 7, n = s * 365.25;
  qe = function(d, u) {
    u = u || {};
    var h = typeof d;
    if (h === "string" && d.length > 0)
      return o(d);
    if (h === "number" && isFinite(d))
      return u.long ? l(d) : a(d);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(d)
    );
  };
  function o(d) {
    if (d = String(d), !(d.length > 100)) {
      var u = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        d
      );
      if (u) {
        var h = parseFloat(u[1]), w = (u[2] || "ms").toLowerCase();
        switch (w) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return h * n;
          case "weeks":
          case "week":
          case "w":
            return h * i;
          case "days":
          case "day":
          case "d":
            return h * s;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return h * t;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return h * e;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return h * r;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return h;
          default:
            return;
        }
      }
    }
  }
  function a(d) {
    var u = Math.abs(d);
    return u >= s ? Math.round(d / s) + "d" : u >= t ? Math.round(d / t) + "h" : u >= e ? Math.round(d / e) + "m" : u >= r ? Math.round(d / r) + "s" : d + "ms";
  }
  function l(d) {
    var u = Math.abs(d);
    return u >= s ? p(d, u, s, "day") : u >= t ? p(d, u, t, "hour") : u >= e ? p(d, u, e, "minute") : u >= r ? p(d, u, r, "second") : d + " ms";
  }
  function p(d, u, h, w) {
    var g = u >= h * 1.5;
    return Math.round(d / h) + " " + w + (g ? "s" : "");
  }
  return qe;
}
function Ri(r) {
  t.debug = t, t.default = t, t.coerce = l, t.disable = n, t.enable = i, t.enabled = o, t.humanize = Ei(), t.destroy = p, Object.keys(r).forEach((d) => {
    t[d] = r[d];
  }), t.names = [], t.skips = [], t.formatters = {};
  function e(d) {
    let u = 0;
    for (let h = 0; h < d.length; h++)
      u = (u << 5) - u + d.charCodeAt(h), u |= 0;
    return t.colors[Math.abs(u) % t.colors.length];
  }
  t.selectColor = e;
  function t(d) {
    let u, h = null, w, g;
    function x(...v) {
      if (!x.enabled)
        return;
      const k = x, I = Number(/* @__PURE__ */ new Date()), K = I - (u || I);
      k.diff = K, k.prev = u, k.curr = I, u = I, v[0] = t.coerce(v[0]), typeof v[0] != "string" && v.unshift("%O");
      let L = 0;
      v[0] = v[0].replace(/%([a-zA-Z%])/g, (P, S) => {
        if (P === "%%")
          return "%";
        L++;
        const M = t.formatters[S];
        if (typeof M == "function") {
          const F = v[L];
          P = M.call(k, F), v.splice(L, 1), L--;
        }
        return P;
      }), t.formatArgs.call(k, v), (k.log || t.log).apply(k, v);
    }
    return x.namespace = d, x.useColors = t.useColors(), x.color = t.selectColor(d), x.extend = s, x.destroy = t.destroy, Object.defineProperty(x, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => h !== null ? h : (w !== t.namespaces && (w = t.namespaces, g = t.enabled(d)), g),
      set: (v) => {
        h = v;
      }
    }), typeof t.init == "function" && t.init(x), x;
  }
  function s(d, u) {
    const h = t(this.namespace + (typeof u > "u" ? ":" : u) + d);
    return h.log = this.log, h;
  }
  function i(d) {
    t.save(d), t.namespaces = d, t.names = [], t.skips = [];
    let u;
    const h = (typeof d == "string" ? d : "").split(/[\s,]+/), w = h.length;
    for (u = 0; u < w; u++)
      h[u] && (d = h[u].replace(/\*/g, ".*?"), d[0] === "-" ? t.skips.push(new RegExp("^" + d.slice(1) + "$")) : t.names.push(new RegExp("^" + d + "$")));
  }
  function n() {
    const d = [
      ...t.names.map(a),
      ...t.skips.map(a).map((u) => "-" + u)
    ].join(",");
    return t.enable(""), d;
  }
  function o(d) {
    if (d[d.length - 1] === "*")
      return !0;
    let u, h;
    for (u = 0, h = t.skips.length; u < h; u++)
      if (t.skips[u].test(d))
        return !1;
    for (u = 0, h = t.names.length; u < h; u++)
      if (t.names[u].test(d))
        return !0;
    return !1;
  }
  function a(d) {
    return d.toString().substring(2, d.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function l(d) {
    return d instanceof Error ? d.stack || d.message : d;
  }
  function p() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return t.enable(t.load()), t;
}
var Di = Ri;
(function(r, e) {
  e.formatArgs = s, e.save = i, e.load = n, e.useColors = t, e.storage = o(), e.destroy = /* @__PURE__ */ (() => {
    let l = !1;
    return () => {
      l || (l = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
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
    let l;
    return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator < "u" && navigator.userAgent && (l = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(l[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function s(l) {
    if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + r.exports.humanize(this.diff), !this.useColors)
      return;
    const p = "color: " + this.color;
    l.splice(1, 0, p, "color: inherit");
    let d = 0, u = 0;
    l[0].replace(/%[a-zA-Z%]/g, (h) => {
      h !== "%%" && (d++, h === "%c" && (u = d));
    }), l.splice(u, 0, p);
  }
  e.log = console.debug || console.log || (() => {
  });
  function i(l) {
    try {
      l ? e.storage.setItem("debug", l) : e.storage.removeItem("debug");
    } catch {
    }
  }
  function n() {
    let l;
    try {
      l = e.storage.getItem("debug");
    } catch {
    }
    return !l && typeof process < "u" && "env" in process && (l = process.env.DEBUG), l;
  }
  function o() {
    try {
      return localStorage;
    } catch {
    }
  }
  r.exports = Di(e);
  const { formatters: a } = r.exports;
  a.j = function(l) {
    try {
      return JSON.stringify(l);
    } catch (p) {
      return "[UnexpectedJSONParseError]: " + p.message;
    }
  };
})(at, at.exports);
var T = at.exports;
const ut = /* @__PURE__ */ lt(T), Ni = T.debug("TextNlAsBr");
class Vi {
  constructor(e, t) {
    this.baseText = e, this.factories = t;
  }
  asString(e) {
    return this.baseText.asString(
      this.factories.guestInTheMiddle.create(e, (t) => {
        if (typeof t > "u" || t === null)
          return "";
        const s = "<br />";
        return Ni(t), e.give((t ?? "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, `$1${s}$2`)), !0;
      })
    ), e;
  }
}
const Hi = new D(Oe), Ui = new D(Oe), zi = new D(ve), Li = new D(he), Qi = new D(ye), Ki = new D(ct), Wi = new D(Qe), Gi = new D(gi), Ji = new D(yi), Zi = new D(ye), qi = new D(fi), Yi = new D(mi), de = {
  cache: Hi,
  chain: qi,
  guest: Li,
  guestCast: Qi,
  guestAware: Ki,
  guestInTheMiddle: Zi,
  guestSync: Yi,
  patron: Gi,
  patronOnce: Ji,
  pool: Wi,
  source: Ui,
  sourceEmpty: zi
}, Xi = new D(xi), er = new D($i), tr = new D(Fi), sr = new D(ki), ls = new D(Mi), ir = new D(Ti, { ...de, svgImage: ls }), rr = new D(Si, de), nr = new D(ji, de), or = new D(Oi, de), ar = new D(Bi, de), cr = new D(Ii), lr = new D(Pi, de), ur = new D(Vi, de), dr = {
  ...de,
  fileHandlerContent: Xi,
  browserFileSaved: er,
  transformToString: tr,
  transformToObject: sr,
  svgImage: ls,
  svgMapTypeImage: ir,
  numberChunks: rr,
  mapNameFromUrl: nr,
  textNoHtml: or,
  jsonp: ar,
  textOf: cr,
  textNlAsBr: ur,
  textWithoutHTML: lr
}, J = () => dr;
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
const Ye = T.debug("MapCurrent");
class us {
  constructor(e, t, s) {
    $(this, "objectsCache");
    $(this, "settingsCache");
    $(this, "typesCache");
    this.mapFile = e, this.mapId = t, this.factories = s, this.objectsCache = s.sourceEmpty.create(), this.settingsCache = s.sourceEmpty.create(), this.typesCache = s.sourceEmpty.create(), e.currentMap(
      s.patron.create(
        s.guest.create((i) => {
          Ye("current map changed", i), this.settingsCache.give(i.settings), this.objectsCache.give(Object.values(i.objects)), this.typesCache.give(
            Object.entries(i.types).map(([n, o]) => ({
              ...o,
              id: n
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
    return Ye("notify about new objects"), this.objectsCache.value(e), e;
  }
  types(e) {
    return this.typesCache.value(e), e;
  }
  give(e) {
    return Ye("save map document", e), this.mapId.id(
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
class hr {
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
class pr {
  constructor(e) {
    this.mapFile = e;
  }
  value(e) {
    return this.mapFile.currentMap(
      new ye(e, (t) => {
        e.give(t.settings.title);
      })
    ), this;
  }
}
const Pe = T.debug("MapHistory"), It = (r) => {
  const e = JSON.parse(JSON.stringify(r));
  return Object.values(e.objects).forEach((t) => {
    t.width = 0, t.height = 0;
  }), JSON.stringify(e);
};
class fr {
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
              Pe("add map to history", s, e);
              const i = s.some(
                (n) => It(n) === It(e)
              );
              if (Pe("isMapFromHistory", i), !i) {
                const n = s[t] ? [s[t]] : [];
                this.historyIndex.give(0), this.mapsHistory.give([e, ...n, ...s.slice(0, 9)]);
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
          const n = s < i.length - 1;
          Pe("recalculate is prev possible", n), e.give(n);
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
          const n = s > 0 && s <= i.length - 1;
          Pe("recalculate is next possible", n), e.give(n);
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
class mr {
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
const Ee = T.debug("MapFileOfContent");
class gr {
  constructor(e, t, s) {
    $(this, "currentMapPatrons");
    $(this, "mapFileCache");
    this.mapFileContent = e, this.mapId = t, this.factories = s, this.currentMapPatrons = s.pool.create(this), this.mapFileCache = s.cache.create(!1), e.value(
      s.patron.create((i) => {
        if (!i)
          return;
        const n = this.factories.transformToObject.create(i).result();
        Ee("get map file", n), this.mapFileCache.give(n);
      })
    );
  }
  currentMap(e) {
    const t = this.factories.chain.create();
    return this.mapId.id(this.factories.guestCast.create(e, t.receiveKey("mapId"))), this.mapFile(this.factories.guestCast.create(e, t.receiveKey("mapFile"))), t.result(
      this.factories.guestInTheMiddle.create(
        e,
        ({ mapId: s, mapFile: i }) => {
          if (Ee("get current map", s, i, typeof i), !i[s])
            this.createEmptyMapByName(s, e);
          else {
            const n = i[s];
            this.currentMapPatrons.distribute(
              n != null && n.structure ? n.structure : n,
              e
            );
          }
        }
      )
    ), e;
  }
  give(e) {
    return Ee("save map file document", e), this.mapFileContent.give(this.factories.transformToString.create(e).result()), this;
  }
  mapFile(e) {
    return this.mapFileCache.value(e), e;
  }
  createEmptyMapByName(e, t) {
    Ee("creating empty map by name", e);
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
const vr = T.debug("MapFileForRendering");
class Ar {
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
        vr("received map file, objects = ", e[t].objects), this.mapCache.give(e[t]);
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
const Pt = ut("app:MapObjectCurrent");
class br {
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
class yr {
  constructor(e, t) {
    this.mapFile = e, this.factories = t;
  }
  check(e, t) {
    return this.mapFile.currentMap(
      this.factories.guest.create((s) => {
        let i = !1;
        Object.values(s.objects).forEach((n) => {
          i = i || n.arrows.some((o) => o.id === e.id);
        }), t.give(!i || "У объекта есть входящие связи!");
      })
    ), this;
  }
}
const Xe = T.debug("MapObjectNew");
class wr {
  constructor(e, t, s, i, n) {
    this.map = e, this.mapObject = t, this.canvas = s, this.stagePosition = i, this.factories = n;
  }
  byTypeName(e, t) {
    return Xe("start to add new type", e, t), this.stagePosition.position(
      this.factories.guest.create((s) => {
        this.map.types(
          this.factories.guest.create((i) => {
            this.canvas.canvas(
              this.factories.guest.create((n) => {
                const o = n.getBoundingClientRect(), a = i.find((d) => d.id === e);
                Xe("is type found", a);
                const l = t.x - o.left, p = t.y - o.top;
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
                    l > 0 ? l + s.x : 0,
                    p > 0 ? p + s.y : 0
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
class Cr {
  constructor(e, t) {
    this.mapId = e, this.factories = t;
  }
  names(e) {
    return this.mapId.id(
      this.factories.guestInTheMiddle.create(e, (t) => {
        const s = t.split("_").filter((o) => !!o);
        let i = "";
        const n = s.map((o) => {
          const a = `${i}${o}`;
          return i || (i = "_"), i += `${o}_`, a;
        });
        i = "", e.give(n);
      })
    ), e;
  }
}
class _r {
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
class xr {
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
const $r = T.debug("MapObjectsLink");
class kr {
  constructor(e, t, s, i, n) {
    $(this, "objectIdsCache");
    this.mapObjectCurrent = e, this.map = t, this.mapObject = s, this.newArrow = i, this.factories = n, this.objectIdsCache = n.cache.create([]);
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
            t.push(s), this.objectIdsCache.give([...t]), $r("object ids", t), t.length === 2 && this.map.objects(
              this.factories.guest.create((i) => {
                const [, n] = t, o = i.find((a) => a.id === n);
                o && this.newArrow.forObject(o);
              })
            ), t.length === 3 && (this.newArrow.dispose(), this.mapObjectCurrent.silenceOff(), this.map.objects(
              this.factories.guest.create((i) => {
                const [, n, o] = t, a = i.find((l) => l.id === n);
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
function Fr(r) {
  var e = typeof r;
  return r != null && (e == "object" || e == "function");
}
var ht = Fr, Mr = typeof Ie == "object" && Ie && Ie.Object === Object && Ie, Tr = Mr, Sr = Tr, jr = typeof self == "object" && self && self.Object === Object && self, Or = Sr || jr || Function("return this")(), hs = Or, Br = hs, Ir = function() {
  return Br.Date.now();
}, Pr = Ir, Er = /\s/;
function Rr(r) {
  for (var e = r.length; e-- && Er.test(r.charAt(e)); )
    ;
  return e;
}
var Dr = Rr, Nr = Dr, Vr = /^\s+/;
function Hr(r) {
  return r && r.slice(0, Nr(r) + 1).replace(Vr, "");
}
var Ur = Hr, zr = hs, Lr = zr.Symbol, ps = Lr, Et = ps, fs = Object.prototype, Qr = fs.hasOwnProperty, Kr = fs.toString, _e = Et ? Et.toStringTag : void 0;
function Wr(r) {
  var e = Qr.call(r, _e), t = r[_e];
  try {
    r[_e] = void 0;
    var s = !0;
  } catch {
  }
  var i = Kr.call(r);
  return s && (e ? r[_e] = t : delete r[_e]), i;
}
var Gr = Wr, Jr = Object.prototype, Zr = Jr.toString;
function qr(r) {
  return Zr.call(r);
}
var Yr = qr, Rt = ps, Xr = Gr, en = Yr, tn = "[object Null]", sn = "[object Undefined]", Dt = Rt ? Rt.toStringTag : void 0;
function rn(r) {
  return r == null ? r === void 0 ? sn : tn : Dt && Dt in Object(r) ? Xr(r) : en(r);
}
var nn = rn;
function on(r) {
  return r != null && typeof r == "object";
}
var an = on, cn = nn, ln = an, un = "[object Symbol]";
function dn(r) {
  return typeof r == "symbol" || ln(r) && cn(r) == un;
}
var hn = dn, pn = Ur, Nt = ht, fn = hn, Vt = NaN, mn = /^[-+]0x[0-9a-f]+$/i, gn = /^0b[01]+$/i, vn = /^0o[0-7]+$/i, An = parseInt;
function bn(r) {
  if (typeof r == "number")
    return r;
  if (fn(r))
    return Vt;
  if (Nt(r)) {
    var e = typeof r.valueOf == "function" ? r.valueOf() : r;
    r = Nt(e) ? e + "" : e;
  }
  if (typeof r != "string")
    return r === 0 ? r : +r;
  r = pn(r);
  var t = gn.test(r);
  return t || vn.test(r) ? An(r.slice(2), t ? 2 : 8) : mn.test(r) ? Vt : +r;
}
var yn = bn, wn = ht, et = Pr, Ht = yn, Cn = "Expected a function", _n = Math.max, xn = Math.min;
function $n(r, e, t) {
  var s, i, n, o, a, l, p = 0, d = !1, u = !1, h = !0;
  if (typeof r != "function")
    throw new TypeError(Cn);
  e = Ht(e) || 0, wn(t) && (d = !!t.leading, u = "maxWait" in t, n = u ? _n(Ht(t.maxWait) || 0, e) : n, h = "trailing" in t ? !!t.trailing : h);
  function w(P) {
    var S = s, M = i;
    return s = i = void 0, p = P, o = r.apply(M, S), o;
  }
  function g(P) {
    return p = P, a = setTimeout(k, e), d ? w(P) : o;
  }
  function x(P) {
    var S = P - l, M = P - p, F = e - S;
    return u ? xn(F, n - M) : F;
  }
  function v(P) {
    var S = P - l, M = P - p;
    return l === void 0 || S >= e || S < 0 || u && M >= n;
  }
  function k() {
    var P = et();
    if (v(P))
      return I(P);
    a = setTimeout(k, x(P));
  }
  function I(P) {
    return a = void 0, h && s ? w(P) : (s = i = void 0, o);
  }
  function K() {
    a !== void 0 && clearTimeout(a), p = 0, s = l = i = a = void 0;
  }
  function L() {
    return a === void 0 ? o : I(et());
  }
  function se() {
    var P = et(), S = v(P);
    if (s = arguments, i = this, l = P, S) {
      if (a === void 0)
        return g(l);
      if (u)
        return clearTimeout(a), a = setTimeout(k, e), w(l);
    }
    return a === void 0 && (a = setTimeout(k, e)), o;
  }
  return se.cancel = K, se.flush = L, se;
}
var ms = $n;
const we = /* @__PURE__ */ lt(ms), kn = (r) => {
  if (r[r.length - 1] === "/") {
    const e = r.split("");
    return e.splice(e.length - 1, 1), e.join("");
  }
  return r;
}, Fn = we((r) => {
  window == null || window.open(r);
}, 200), tt = T.debug("MapObjectUrl");
class Mn {
  constructor(e, t) {
    this.mapId = e, this.factories = t;
  }
  open(e, t) {
    if (e != null && e.linked) {
      const s = e.outlink;
      e.targetBlank ? Fn(s) : (tt("open new map", s), this.factories.mapNameFromUrl.create(
        this.factories.source.create(s)
      ).name(
        this.factories.guest.create((n) => {
          tt("open map name", s, n), t.give(n);
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
            const n = i[0] === "_" ? i.replaceAll("_", "/") : "/current", o = s.name ? s.name : s.additionalName ? s.additionalName : "";
            this.factories.textNoHtml.create(this.factories.source.create(o)).noHtml(
              this.factories.guest.create((a) => {
                let l = s.outlink ? s.outlink : `${n}/${Tn(a)}`;
                tt("link is", l), l = kn(l), t.give(l);
              })
            );
          })
        );
      })
    ), t;
  }
}
function Tn(r) {
  return r.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}
const Sn = T.debug("ObjectPositionBounds");
class jn {
  constructor(e, t) {
    this.stageSize = e, this.factories = t;
  }
  position(e, t, s) {
    return this.stageSize.value(
      this.factories.guestInTheMiddle.create(s, (i) => {
        let { x: n, y: o } = t;
        n < 30 && (n = 30), o < 30 && (o = 30);
        const a = i.width - e.width;
        n > a && (n = a);
        const l = i.height - e.height;
        o > l && (o = l), Sn("position", n, o), s.give({ x: n, y: o });
      })
    ), s;
  }
}
const Re = 15;
class On {
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
}, Bn = {
  positive: 1,
  negative: -1
}, zt = T.debug("ObjectsOutsideScreen");
class In {
  constructor(e, t, s, i) {
    this.map = e, this.stageSize = t, this.layer = s, this.factories = i;
  }
  count(e, t) {
    const s = e.direction === "positive", i = this.factories.chain.create();
    return this.map.objects(this.factories.guestCast.create(t, i.receiveKey("objects"))), this.layer.layer(this.factories.guestCast.create(t, i.receiveKey("layer"))), this.layer.position(this.factories.guestCast.create(t, i.receiveKey("position"))), i.result(
      this.factories.guestInTheMiddle.create(
        t,
        ({ objects: n, layer: o, position: a }) => {
          var u;
          const l = Bn[e.direction], d = n.sort(
            (h, w) => h.position[st[e.axis]] * l - w.position[st[e.axis]] * l
          ).filter((h) => {
            const w = h.position[st[e.axis]] + (s ? 0 : h[Ut[e.axis]]), g = a[e.axis] * -1 + (s ? o[Ut[e.axis]]() : 0);
            return zt(
              "mb nearest points",
              e.direction,
              "objectP=",
              w,
              "screenP=",
              g
            ), s ? w > g : w < g;
          });
          zt("nearest", d), t.give({
            count: d.length,
            nearestObjectId: ((u = d.at(s ? -1 : 0)) == null ? void 0 : u.id) ?? ""
          });
        }
      )
    ), t;
  }
}
class Pn {
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
class En {
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
class Rn {
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
class Dn {
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
class Nn {
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
const Vn = T.debug("MapTypeUsed");
class Hn {
  constructor(e, t) {
    this.mapFile = e, this.factories = t;
  }
  check(e, t) {
    return this.mapFile.currentMap(
      this.factories.guest.create((s) => {
        const i = Object.values(s.objects).some(
          (n) => n.type === e.name
        );
        Vn("is type used", i), t.give(!i || "Тип карты использован");
      })
    ), this;
  }
}
class Un {
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
class zn {
  constructor(e, t, s) {
    this.parentNames = e, this.mapFile = t, this.factories = s;
  }
  types(e) {
    Lt("parent types requested");
    const t = this.factories.chain.create();
    return this.parentNames.names(this.factories.guestCast.create(e, t.receiveKey("parentNames"))), this.mapFile.mapFile(this.factories.guestCast.create(e, t.receiveKey("mapFile"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ parentNames: s, mapFile: i }) => {
        const n = s.slice(0, -1);
        Lt("parent names", n);
        const o = {};
        n.map((l) => i[l]).forEach((l) => {
          Object.values(l.types).forEach((p) => {
            o[p.name] = p;
          });
        }), e.give(Object.values(o));
      })
    ), e;
  }
}
const Qt = T.debug("ObjectsMatchedToQuery");
class Ln {
  constructor(e, t) {
    this.map = e, this.factories = t;
  }
  objects(e, t) {
    return e.value(
      this.factories.guestInTheMiddle.create(
        t,
        we((i) => {
          i = i.toLowerCase(), this.map.objects(
            this.factories.guest.create((n) => {
              if (!i) {
                Qt("reset results"), t.give([]);
                return;
              }
              const o = n.filter(
                (a) => {
                  var l;
                  return a.name.toLowerCase().includes(i) || ((l = a.additionalName) == null ? void 0 : l.toLowerCase().includes(i)) || Object.values(a.additionalFields ?? {}).join(" ").toLowerCase().includes(i);
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
const Qn = {
  height: 3e3,
  width: 3e3
};
class Kn {
  value(e) {
    return e.give(Qn), e;
  }
}
const Kt = T.debug("StageMoveRestriction");
class Wn {
  constructor(e, t, s) {
    this.canvasDep = e, this.stageSize = t, this.factories = s;
  }
  position(e, t) {
    return this.canvasDep.canvas(
      this.factories.guest.create((s) => {
        this.stageSize.value(
          this.factories.guest.create((i) => {
            Kt("income position", e);
            const n = i.width - s.clientWidth, o = i.height - s.clientHeight, a = e.x * -1, l = e.y * -1;
            if (o < 0 || n < 0)
              return { x: 0, y: 0 };
            Kt("boundings", o, n, l, a), t.give({
              x: e.x > 0 ? 0 : a > n ? n * -1 : e.x,
              y: e.y > 0 ? 0 : l > o ? o * -1 : e.y
            });
          })
        );
      })
    ), t;
  }
}
const xe = T.debug("app:MapObjectsVisible");
class Gn {
  constructor(e, t, s, i) {
    $(this, "visibleObjectsCache", new ve());
    xe("constructor initialized");
    const n = i.chain.create();
    t.size(i.patron.create(n.receiveKey("size"))), e.position(i.patron.create(n.receiveKey("position"))), s.currentMap(i.patron.create(n.receiveKey("map"))), n.result(
      i.patron.create(
        i.guest.create(({ position: o, size: a, map: l }) => {
          const p = Object.values(l.objects);
          xe("objects come to result", p);
          const d = p.filter((u) => {
            const h = l.types[u.type] ?? {}, w = {
              width: u.width || h.width,
              height: u.height || h.height
            };
            return this.isInBounding(o, a, u.position, w);
          });
          xe("visible objects calculated", d), this.visibleObjectsCache.give(d);
        })
      )
    );
  }
  objects(e) {
    return this.visibleObjectsCache.value(e), this;
  }
  isInBounding(e, t, s, i) {
    const n = e.x, o = e.x - t.width, a = e.y, l = e.y - t.height, [p, d] = s;
    return xe("bounding vars", n, o, a, l), xe("object position", s), n > -p - i.width && -p > o && a > -d - i.height && -d > l;
  }
}
const Jn = (r, e) => {
  const t = r.matchAll(e);
  return Array.from(t).map((s) => s[1]);
}, Zn = (r, e) => r.reduce((t, s) => (t[s] = e[s] || s, t), {});
class qn {
  constructor(e, t, s, i) {
    this.mapFile = t, this.mapObject = s, this.factories = i, e.objectId(this);
  }
  give(e) {
    return this.mapFile.currentMap(
      this.factories.guest.create((t) => {
        const s = t.objects[e];
        if (!s)
          return;
        const i = t.types[s.type], n = /\$\{([a-zA-Z1-9]+)\}/g, a = Jn(i.svg, n).filter((l) => l !== "width" && l !== "height");
        s.additionalFields = Zn(a, s.additionalFields ?? {}), this.mapObject.give(s);
      })
    ), this;
  }
  introduction() {
    return "patron";
  }
}
const Wt = 20, Yn = ut("ArrowPath");
class Xn {
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
    ), n = this.arrowPointPosition(
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
      +n.breakPoint.x + n.shift.x,
      +n.breakPoint.y + n.shift.y,
      +n.point.x + n.shift.x,
      +n.point.y + n.shift.y
    ]), this;
  }
  arrowPointPosition(e, t, s, i) {
    const n = {
      x: +i.x + Math.round(s.width / 2),
      y: +i.y + Math.round(s.height / 2)
    }, o = {
      x: +t.x + Math.round(e.width / 2),
      y: +t.y + Math.round(e.height / 2)
    }, a = Math.abs(n.x - o.x) - (s.width + Wt), l = Math.abs(n.y - o.y) - (s.height + Wt);
    return a < 0 || l < 0 ? (Yn("ArrowPath", a, l), this.arrowPointPositionNear(
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
    const n = {
      x: +i.x + Math.round(s.width / 2),
      y: +i.y + Math.round(s.height / 2)
    }, o = {
      x: +t.x + Math.round(e.width / 2),
      y: +t.y + Math.round(e.height / 2)
    }, a = o.x - n.x, l = o.y - n.y, p = Math.abs(l) > Math.abs(a);
    let d = +t.x, u = +t.y;
    const h = p && l >= 0, w = !p && a >= 0, g = p && l < 0, x = !p && a < 0, v = { x: 0, y: 0 };
    let k = 0, I = 0;
    h ? (d += Math.round(e.width / 2), v.x = d, v.y = (t.y + i.y + s.height) / 2, k = i.x > t.x ? 1 : -1) : x ? (u += Math.round(e.height / 2), d += +e.width, v.x = (t.x + e.width + i.x) / 2, v.y = u, I = i.y > t.y ? 1 : -1) : g ? (d += Math.round(e.width / 2), u += +e.height, v.x = d, v.y = (t.y + e.height + i.y) / 2, k = i.x > t.x ? 1 : -1) : w && (u += Math.round(e.height / 2), v.x = (t.x + i.x + s.width) / 2, v.y = u, I = i.y > t.y ? 1 : -1);
    const K = [d, u].join("-"), L = this.filledPoints.get(K) || 0;
    return this.filledPoints.set(K, L + 1), {
      point: { x: d, y: u },
      breakPoint: v,
      shift: {
        x: k * L * 10,
        y: I * L * 10
      }
    };
  }
  arrowPointPositionFar(e, t, s, i) {
    const n = [];
    let l = 0, p = 0;
    const d = [0, 0].join("-"), u = this.filledPoints.get(d) || 0;
    return {
      point: { x: 0, y: 0 },
      breakPoint: n,
      shift: {
        x: l * u * 10,
        y: p * u * 10
      }
    };
  }
}
var eo = ms, to = ht, so = "Expected a function";
function io(r, e, t) {
  var s = !0, i = !0;
  if (typeof r != "function")
    throw new TypeError(so);
  return to(t) && (s = "leading" in t ? !!t.leading : s, i = "trailing" in t ? !!t.trailing : i), eo(r, e, {
    leading: s,
    maxWait: e,
    trailing: i
  });
}
var ro = io;
const no = /* @__PURE__ */ lt(ro), { Arrow: oo } = le, De = T.debug("MapObjectsArrows");
class ao {
  constructor(e, t, s, i, n) {
    $(this, "previouslyRenderedArrows", /* @__PURE__ */ new Map());
    this.konvaLayer = e, this.mapFile = t, this.mapDep = s, this.arrowPath = i, this.factories = n, De("draw arrows on canvas");
    const o = this.factories.chain.create();
    this.konvaLayer.layer(this.factories.patron.create(o.receiveKey("layer"))), this.mapFile.currentMap(this.factories.patron.create(o.receiveKey("map"))), this.mapDep.objects(this.factories.patron.create(o.receiveKey("objects"))), o.result(
      this.factories.patron.create(
        this.factories.guest.create(
          no(({ layer: a, map: l, objects: p }) => {
            const d = (u, h) => {
              const w = l.types[h.type];
              this.arrowPath.breakPoints(
                {
                  shapeGeometry: {
                    width: u.width,
                    height: u.height
                  },
                  shapePosition: {
                    x: u.position[0],
                    y: u.position[1]
                  },
                  lookToGeometry: {
                    width: h.width,
                    height: h.height
                  },
                  lookToPosition: {
                    x: h.position[0],
                    y: h.position[1]
                  }
                },
                {
                  shapeGeometry: {
                    width: h.width || w.width,
                    height: h.height || w.height
                  },
                  shapePosition: {
                    x: h.position[0],
                    y: h.position[1]
                  },
                  lookToGeometry: {
                    width: u.width,
                    height: u.height
                  },
                  lookToPosition: {
                    x: u.position[0],
                    y: u.position[1]
                  }
                },
                this.factories.guest.create((g) => {
                  const x = g.join("-"), v = [u.id, h.id].join("-");
                  if (De("points", g), De(u, h), this.previouslyRenderedArrows.has(v)) {
                    const I = this.previouslyRenderedArrows.get(v);
                    I.arrow.show(), I.arrow.points(g);
                    return;
                  }
                  const k = new oo({
                    x: 0,
                    y: 0,
                    points: g,
                    pointerLength: 20,
                    pointerWidth: 10,
                    fill: "#ccc",
                    stroke: "#bbb",
                    strokeWidth: 2,
                    zIndex: 2
                  });
                  this.previouslyRenderedArrows.set(v, {
                    arrow: k,
                    arrowKey: x
                  }), a.add(k);
                })
              );
            };
            this.arrowPath.clear(), this.previouslyRenderedArrows.forEach((u) => u.arrow.hide()), p.forEach((u) => {
              u.arrows && (De("visible objects", p.length), u.arrows.forEach((h) => {
                const w = p.find((g) => g.id === h.id) || l.objects[h.id];
                w && d(u, w);
              }));
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
const { Arrow: co } = le, it = T.debug("NewArrow"), Gt = {
  width: 10,
  height: 10
};
class lo {
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
          this.factories.guest.create((n) => {
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
                t = new co({
                  x: 0,
                  y: 0,
                  points: o,
                  pointerLength: 20,
                  pointerWidth: 10,
                  fill: "#ccc",
                  stroke: "#bbb",
                  strokeWidth: 2,
                  zIndex: 2
                }), n.add(t), this.arrowCache.give(t);
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
const $e = T.debug("MapObjectBackground"), uo = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD//gATQ3JlYXRlZCB3aXRoIEdJTVD/4gKwSUNDX1BST0ZJTEUAAQEAAAKgbGNtcwQwAABtbnRyUkdCIFhZWiAH6AAMAAQADQAqAAthY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1kZXNjAAABIAAAAEBjcHJ0AAABYAAAADZ3dHB0AAABmAAAABRjaGFkAAABrAAAACxyWFlaAAAB2AAAABRiWFlaAAAB7AAAABRnWFlaAAACAAAAABRyVFJDAAACFAAAACBnVFJDAAACFAAAACBiVFJDAAACFAAAACBjaHJtAAACNAAAACRkbW5kAAACWAAAACRkbWRkAAACfAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACQAAAAcAEcASQBNAFAAIABiAHUAaQBsAHQALQBpAG4AIABzAFIARwBCbWx1YwAAAAAAAAABAAAADGVuVVMAAAAaAAAAHABQAHUAYgBsAGkAYwAgAEQAbwBtAGEAaQBuAABYWVogAAAAAAAA9tYAAQAAAADTLXNmMzIAAAAAAAEMQgAABd7///MlAAAHkwAA/ZD///uh///9ogAAA9wAAMBuWFlaIAAAAAAAAG+gAAA49QAAA5BYWVogAAAAAAAAJJ8AAA+EAAC2xFhZWiAAAAAAAABilwAAt4cAABjZcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltjaHJtAAAAAAADAAAAAKPXAABUfAAATM0AAJmaAAAmZwAAD1xtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAEcASQBNAFBtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEL/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAAeAB4DAREAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAwUEAAj/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAH1SCMTDaCMTiuCMTDgxDGf/8QAHhAAAgIBBQEAAAAAAAAAAAAAAAMBAgQFExUyMxL/2gAIAQEAAQUCG9TUPHdga2PndgzrxZQ3qah48gsvnUtHILMrKq5f/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAwEBPwEH/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAgEBPwEH/8QAHhAAAgIBBQEAAAAAAAAAAAAAAAECMXIQQUKSsVH/2gAIAQEABj8CFkvdFkVLqzla4v6VLqxXe60WS90WRUipWipCSTvc/8QAIxAAAgADCAMAAAAAAAAAAAAAAAEQUfAhMUGhscHR8RFhcf/aAAgBAQABPyErMkMi0ZW2wylmzHorbYSSX3Vg5wrMkMi0Z0a5FVK8Llg05nRrkRmteVg//9oADAMBAAIAAwAAABCCQQSCSST/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAEDAQE/EAf/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAECAQE/EAf/xAAeEAEAAQQCAwAAAAAAAAAAAAABIRARIDEAQVFxkf/aAAgBAQABPxDEMgTA4U0lpO6EwKiFh/YAyDIEAZSTdCnwUQAma0AtZOl88//Z";
class ho {
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
            const i = new Image(), n = document.querySelector(".grid-example");
            $e("grid example", n), i.src = uo, i.onload = () => {
              $e("canvas pattern loaded"), $e("konva layer loaded");
              const o = new le.Rect({
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
const po = T.debug("Breadcrumbs");
class fo {
  constructor(e, t, s) {
    this.parentNames = e, this.mapFile = t, this.factories = s;
  }
  list(e) {
    const t = this.factories.chain.create();
    return this.parentNames.names(this.factories.guestCast.create(e, t.receiveKey("names"))), this.mapFile.mapFile(this.factories.guestCast.create(e, t.receiveKey("mapFile"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ names: s, mapFile: i }) => {
        po("map id", s, i), e.give(
          s.map((n) => {
            var o, a;
            return {
              title: ((a = (o = i[n]) == null ? void 0 : o.settings) == null ? void 0 : a.title) || "unknown",
              name: n
            };
          })
        );
      })
    ), e;
  }
}
const Jt = T.debug("CursorWithObjects");
class mo {
  constructor(e, t, s) {
    this.objectsVisible = e, this.cursor = t, this.factories = s;
  }
  value(e) {
    const t = this.factories.chain.create();
    return this.cursor.value(this.factories.guestCast.create(e, t.receiveKey("cursor"))), this.objectsVisible.objects(
      this.factories.guestCast.create(e, t.receiveKey("objects"))
    ), t.result(
      this.factories.guestInTheMiddle.create(e, ({ cursor: s, objects: i }) => {
        const n = i.find((o) => {
          const a = o.position[0], l = o.position[0] + o.width || 100, p = o.position[1], d = o.position[1] + o.height || 100;
          return s.x >= a && s.x <= l && s.y >= p && s.y <= d;
        });
        n ? (Jt("crossed with", n), e.give({
          x: n.position[0] + n.width / 2,
          y: n.position[1] + n.height / 2
        })) : (Jt("cursor pos", s), e.give(s));
      })
    ), this;
  }
}
const Zt = T.debug("Drawer");
class go {
  constructor(e, t) {
    $(this, "drawerNameCache");
    this.keyboard = e, this.factories = t, this.drawerNameCache = t.cache.create(""), this.keyboard.pressed(
      this.factories.patron.create(
        this.factories.guest.create((s) => {
          Zt("new key in drawer", s), s === "Escape" && this.give("");
        })
      )
    );
  }
  isOpenedByName(e, t) {
    return this.drawerNameCache.value(
      this.factories.guestInTheMiddle.create(t, (s) => {
        Zt("new drawer name", s), t.give(s === e);
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
class vo {
  value(e) {
    typeof performance > "u" && e.give(0);
    const t = 10;
    let s = performance.now(), i = 0;
    const n = () => requestAnimationFrame(() => {
      if (i += 1, i >= t) {
        const o = performance.now(), a = o - s;
        e.give(Math.round(1e3 / (a / i))), s = o, i = 0;
      }
      n();
    });
    return n(), e;
  }
}
class Ao {
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
const qt = T.debug("app:MiniMap"), Yt = 130;
class bo {
  constructor(e, t, s, i) {
    $(this, "theSize");
    $(this, "thePoints");
    $(this, "viewportSizeCache");
    this.map = e, this.layer = t, this.stageSize = s, this.factories = i, this.theSize = i.sourceEmpty.create(), this.thePoints = i.sourceEmpty.create(), this.viewportSizeCache = i.sourceEmpty.create();
    const n = i.chain.create();
    e.objects(i.patron.create(n.receiveKey("objects"))), t.layer(i.patron.create(n.receiveKey("layer"))), s.value(i.patron.create(n.receiveKey("size"))), n.result(
      i.patron.create(
        i.guest.create(({ layer: o, size: a, objects: l }) => {
          const p = Yt / a.width, d = {
            width: Math.round(o.width() * p),
            height: Math.round(o.height() * p)
          };
          this.viewportSizeCache.give(d);
          const u = {
            width: Math.round(a.width * p),
            height: Math.round(a.height * p)
          };
          this.theSize.give(u);
          const h = l.map((w) => ({
            id: w.id,
            x: Math.round(w.position[0] * p),
            y: Math.round(w.position[1] * p),
            width: Math.round(w.width * p),
            height: Math.round(w.height * p)
          }));
          qt("minimap points", h), this.thePoints.give(h);
        })
      )
    );
  }
  viewportPosition(e) {
    const t = this.factories.chain.create();
    return this.stageSize.value(this.factories.guestCast.create(e, t.receiveKey("size"))), this.layer.position(this.factories.guestCast.create(e, t.receiveKey("position"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ size: s, position: i }) => {
        const n = Yt / s.width, o = {
          x: i.x * n * -1,
          y: i.y * n * -1
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
const Xt = T.debug("Modal");
class yo {
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
class wo {
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
class Co {
  constructor(e, t, s, i) {
    $(this, "innerReceive");
    this.mapFile = t, this.map = s, this.factories = i, e.objects(i.patron.create(this)), this.innerReceive = we((n) => {
      this.mapFile.currentMap(
        this.factories.guest.create((o) => {
          ke("objects to fix", n);
          const a = document.querySelectorAll(".objects-container .rendered-object"), l = o.objects;
          let p = !1;
          a.forEach((d) => {
            const u = d.getAttribute("data-object-id");
            if (ke("i see id", u), !u)
              return;
            const h = l[u];
            if (h && (ke("dom object geometry", d.clientWidth, d.clientHeight), ke("saved object geometry", h.width, h.height), (h.width !== d.clientWidth || h.height !== d.clientHeight) && (p = !0, ke("update object geometry"), h.width = d.clientWidth, h.height = d.clientHeight), !h.width || !h.height)) {
              const w = o.types[h.type];
              h.width = w.width, h.height = w.height;
            }
          }), p && this.map.give({
            ...o,
            objects: l
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
class _o {
  constructor(e, t, s, i, n, o, a, l, p) {
    $(this, "previouslyRenderedRects", /* @__PURE__ */ new Map());
    this.konvaLayer = e, this.mapFile = t, this.mapObject = s, this.mapObjectCurrent = n, this.mapObjectForRendering = o, this.objectPosition = a, this.settings = l, this.factories = p, i.objects(this);
  }
  give(e) {
    return this.konvaLayer.layer(
      this.factories.patronOnce.create(
        this.factories.guest.create((t) => {
          const s = this.factories.chain.create();
          this.mapFile.currentMap(s.receiveKey("map")), this.settings.value(s.receiveKey("settings")), s.result(
            this.factories.guest.create((i) => {
              const { map: n, settings: o } = i;
              Fe("rerender object rects"), this.previouslyRenderedRects.forEach((a) => {
                a.hide();
              }), e.forEach((a) => {
                const l = n.types[a.type], p = +a.width || +l.width || 100, d = +a.height || +l.height || 100;
                if (this.previouslyRenderedRects.has(a)) {
                  const h = this.previouslyRenderedRects.get(a);
                  h.width(p), h.height(d), h.x(+a.position[0]), h.y(+a.position[1]), h.show();
                  return;
                }
                Fe("rect object", a, l);
                const u = new le.Rect({
                  x: +a.position[0],
                  y: +a.position[1],
                  width: p,
                  height: d,
                  name: a.id,
                  draggable: !o.readonly,
                  objectId: a.id,
                  zIndex: 3
                });
                this.previouslyRenderedRects.set(a, u), t.add(u), u.on("mouseenter", () => {
                  t.getStage().container().style.cursor = "pointer";
                }), u.on("mouseleave", () => {
                  t.getStage().container().style.cursor = "default";
                }), u.on("dragend", () => {
                  Fe("drag ended"), this.objectPosition.position(
                    a,
                    {
                      x: u.x(),
                      y: u.y()
                    },
                    this.factories.guest.create((h) => {
                      this.mapObject.give({
                        ...a,
                        position: [h.x, h.y]
                      });
                    })
                  );
                }), u.on("dragmove", () => {
                  Fe("dragmove works", u.x(), u.y()), t.getStage().container().style.cursor = "move", this.objectPosition.position(
                    a,
                    {
                      x: u.x(),
                      y: u.y()
                    },
                    this.factories.guest.create((h) => {
                      this.mapObjectForRendering.give({
                        ...a,
                        position: [h.x, h.y]
                      });
                    })
                  );
                }), u.on("click", () => {
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
class xo {
  constructor(e, t, s, i) {
    this.canvas = t, this.konvaLayer = s, this.factories = i, e.currentMap(this);
  }
  give() {
    const e = new ResizeObserver((s) => {
      requestAnimationFrame(() => {
        const [i] = s;
        this.canvas.canvas(
          this.factories.guest.create((n) => {
            const o = n.getBoundingClientRect();
            this.konvaLayer.layer(
              this.factories.guest.create((a) => {
                a.getStage().width(i.contentRect.width - o.left), a.getStage().height(i.contentRect.height - o.top), this.canvas.give(n), this.konvaLayer.give(a);
              })
            );
          })
        );
      });
    }), t = document.querySelector("body");
    return t && e.observe(t), this;
  }
}
const $o = T.debug("StagePosition");
class ko {
  constructor(e) {
    this.stageMove = e;
  }
  give(e) {
    return $o("received position", e), this.stageMove.move(e), this;
  }
}
class Fo {
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
class Mo {
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
class To {
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
const So = T.debug("Cursor");
class jo {
  constructor(e, t) {
    $(this, "cursorPool");
    this.cursorPool = t.pool.create(this);
    const s = {
      x: 0,
      y: 0
    };
    window == null || window.addEventListener("mousemove", (i) => {
      const n = {
        x: i.offsetX + -s.x,
        y: i.offsetY + -s.y
      };
      So("move cursor fired", n), this.cursorPool.give(n);
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
class Oo {
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
      const n = (o) => {
        i.style.transform = `translate(${o.clientX}px, ${o.clientY}px)`;
      };
      s.addEventListener("drag", n, { passive: !0 }), s.addEventListener("dragend", () => {
        i.removeEventListener("drag", n), i.remove();
      });
    }), this;
  }
  introduction() {
    return "patron";
  }
}
const Ne = T.debug("ControlCombo");
class Bo {
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
          this.factories.guest.create((n) => {
            Ne("combo happened look for key", e, "received", i.code), n && i.ctrlKey && i.code === e && i.type === "keydown" && (i.preventDefault(), s.give(i));
          })
        );
      })
    );
  }
}
const Me = T.debug("Keyboard");
class Io {
  constructor(e) {
    $(this, "pressedPool");
    $(this, "combinationsPool");
    Me("keyboard created"), this.pressedPool = e.pool.create(this), this.combinationsPool = e.pool.create(this), window == null || window.addEventListener("keyup", (t) => {
      Me("keyboard pressed", t.key), this.pressedPool.give(t.key);
    }), Is({
      passive: !1,
      onEventFired: (t) => {
        Me("magic combination happens 11", t.ctrlKey, t.key), this.combinationsPool.give(t);
      }
    });
  }
  pressed(e) {
    return Me("keyboard receive pressed subscriber"), this.pressedPool.add(e), this;
  }
  event(e) {
    return Me("keyboard receive combination subscriber"), this.combinationsPool.add(e), this;
  }
}
const ss = T.debug("app:konva:KonvaLayer");
class Po {
  constructor(e, t, s, i) {
    $(this, "guestChain");
    $(this, "positionCache");
    $(this, "layerCache");
    this.canvasDep = e, this.stageMoveRestriction = s, this.factories = i, this.positionCache = i.cache.create({
      x: 0,
      y: 0
    }), this.guestChain = i.chain.create(), this.layerCache = i.sourceEmpty.create(), this.canvasDep.canvas(i.patron.create(this.guestChain.receiveKey("canvas"))), t.value(this.guestChain.receiveKey("stageSize")), this.guestChain.result(
      i.guest.create(
        ({ canvas: n }) => {
          ss("create new konva stage");
          const o = new le.Stage({
            width: n.clientWidth,
            height: n.clientHeight,
            container: n,
            fill: "#ffeeee",
            draggable: !0
          }), a = new le.Layer();
          o.add(a), a.draw(), this.layerCache.give(a), o.on("dragend", (p) => {
            if (!(p.target instanceof le.Stage))
              return;
            const d = {
              x: o.x(),
              y: o.y()
            };
            ss("new position", d), this.positionCache.give(d);
          }), o.on("dragmove", (p) => {
            if (!(p.target instanceof le.Stage))
              return;
            const d = {
              x: o.x(),
              y: o.y()
            };
            this.positionCache.give(d);
          });
          const l = this.factories.guestSync.create({
            x: 0,
            y: 0
          });
          o.dragBoundFunc((p) => (s.position(p, l), l.value()));
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
class Eo {
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
const Ro = T.debug("position");
class Do {
  constructor(e, t, s, i, n) {
    this.layer = e, this.canvas = t, this.stageSize = s, this.stageMoveRestriction = i, this.factories = n;
  }
  move(e) {
    Ro("move stage to new point", e.position), this.stageSize.value(
      this.factories.guest.create(() => {
        this.canvas.size(
          this.factories.guest.create((t) => {
            this.layer.layer(
              this.factories.guest.create((s) => {
                const [i, n] = e.position, o = {
                  x: -i - Math.round(e.width / 2) + Math.round(t.width / 2),
                  y: -n - Math.round(e.height / 2) + Math.round(t.height / 2)
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
const _ = J(), Ke = new Io(_), gs = new Oe({
  readonly: !1,
  presets: {}
}), No = new yo(Ke, _), vs = new go(Ke, _), We = new wo(_), ce = new hr(_), As = _.sourceEmpty.create(), V = new gr(As, ce, _), Vo = new pr(V), Ho = new ii(Vo), pt = new Ar(V, ce, _), ft = new us(pt, ce, _), Uo = new ds(ft, pt, _), X = new us(V, ce, _), zo = new ct((r) => {
  V.currentMap(new Ue(r));
}), Ge = new br(vs, _), Lo = new En(_), Qo = new Pn(V, X, _), pe = new To(_), fe = new Kn(), bs = new Wn(pe, fe, _), ee = new Po(pe, fe, bs, _), Ko = new Mo(_), Wo = new ho(ee, V, Ko, _), Ce = new ds(X, V, _), Go = new xr(
  X,
  V,
  [new dt(We, new yr(V, _), _)],
  _
), Jo = new Eo(ee, _), Zo = new wr(X, Ce, pe, Jo, _), ys = new Hn(V, _), ws = new Nn(
  X,
  V,
  [
    new dt(
      We,
      new Un(ys, _),
      _
    )
  ],
  _
), qo = new Dn(
  X,
  V,
  [new dt(We, ys, _)],
  _
), Yo = new Rn(ws), Je = new Gn(ee, pe, pt, _), Xo = new Co(
  Je,
  V,
  X,
  _
), ea = new _o(
  ee,
  V,
  Ce,
  Je,
  Ge,
  Uo,
  new On(new jn(fe, _), _),
  gs,
  _
), ta = new jo(ee, _), sa = new mo(Je, ta, _), Cs = new Xn(), _s = new lo(ee, sa, Cs, _), ia = new ao(ee, V, ft, Cs, _), ra = new bo(ft, ee, fe, _), na = new kr(
  Ge,
  X,
  Ce,
  _s,
  _
), oa = new xo(V, pe, ee, _), aa = new qn(
  Ge,
  V,
  Ce,
  _
), ca = new mr(V, ce, _), la = new _r(Ce), ua = new vo(), mt = new Cr(ce, _), da = new fo(mt, V, _), ha = new Mn(ce, _), pa = new zn(mt, V, _), fa = new Bo(Ke, _), ma = new Ao(V, _), xs = new Do(ee, pe, fe, bs, _), ga = new ko(xs), va = new Fo(xs, _), Aa = new Ln(X, _), ba = new fr(V, X, ce, _), ya = new In(X, fe, ee, _), $s = new ve();
new Oo($s);
const wa = {
  mapCurrentID: ce,
  mapFile: V,
  mapCurrent: X,
  mapCurrentSource: zo,
  mapRemoved: ca,
  mapSettings: Qo,
  mapObject: Ce,
  mapObjectRemoved: Go,
  mapType: ws,
  mapTypeRemoved: qo,
  mapTypeNew: Yo,
  mapObjectsVisible: Je,
  mapObjectCurrent: Ge,
  mapObjectNew: Zo,
  mapObjectsLink: na,
  mapTypeCurrent: Lo,
  mapRects: ea,
  mapBackground: Wo,
  mapObjectArrows: ia,
  mapObjectsGeometryFix: Xo,
  canvas: pe,
  miniMap: ra,
  notification: We,
  modal: No,
  drawer: vs,
  konvaLayer: ee,
  resizing: oa,
  objectAdditionalFieldsFix: aa,
  mapObjectRelationRemoved: la,
  fps: ua,
  breadcrumbs: da,
  mapObjectUrl: ha,
  keyboard: Ke,
  parentNames: mt,
  parentTypes: pa,
  controlCombo: fa,
  menu: ma,
  stagePosition: ga,
  stagePositionByObjectId: va,
  objectsMatchedToQuery: Aa,
  stageSize: fe,
  mapHistory: ba,
  fileContent: As,
  newArrow: _s,
  objectsOutsideScreen: ya,
  settings: gs,
  documentTitle: Ho,
  sidebarDraggable: $s
}, H = () => wa;
class j {
  constructor(e = void 0) {
    $(this, "innerRef");
    this.innerRef = te(e);
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
const Ca = { key: 0 }, _a = { class: "flex-grow overflow-y-auto" }, xa = {
  key: 1,
  class: "flex gap-1"
}, gt = /* @__PURE__ */ R({
  __name: "BaseDrawer",
  props: {
    name: {
      type: String,
      required: !0
    },
    direction: {
      type: String,
      default: "ltr",
      validator: (r) => ["ltr", "rtl", "ttb", "btt"].includes(r)
    }
  },
  emits: ["close"],
  setup(r, { emit: e }) {
    const t = r, s = e, i = Se(() => ["e2e-drawer-back absolute z-10 top-0 left-0 w-full h-full bg-black/50"]), n = {
      ltr: "top-0 left-0 w-[50%] max-w-[900px] ",
      rtl: "top-0 right-0 w-[50%] max-w-[900px] ",
      ttb: "top-0 right-0 left-0",
      btt: "top-auto h-[900px] max-h-[50%] bottom-0 right-0 left-0"
    }, { drawer: o } = H(), a = () => {
      o.give(""), s("close");
    }, l = o.isOpenedByName(t.name, new j()).ref();
    return (p, d) => (f(), z(ns, { name: "fade" }, {
      default: y(() => [
        c(l) ? (f(), A("div", {
          key: 0,
          class: oe(c(i)),
          onClick: a
        }, [
          b("div", {
            class: oe(["absolute bg-white h-full p-3 flex flex-col overflow-hidden", n[r.direction]]),
            onClick: d[0] || (d[0] = Ae(() => {
            }, ["stop"]))
          }, [
            p.$slots.header ? (f(), A("div", Ca, [
              Y(p.$slots, "header", { class: "BaseDrawer-Header" })
            ])) : O("", !0),
            b("div", _a, [
              Y(p.$slots, "default")
            ]),
            p.$slots.footer ? (f(), A("div", xa, [
              Y(p.$slots, "footer")
            ])) : O("", !0)
          ], 2)
        ], 2)) : O("", !0)
      ]),
      _: 3
    }));
  }
}), G = /* @__PURE__ */ R({
  __name: "BaseIcon",
  props: {
    icon: {
      type: String
    }
  },
  setup(r) {
    const e = {
      "fa-bars": Ys,
      "fa-text-width": qs,
      "fa-search": Zs,
      "fa-history": Js,
      "fa-plus-square": Gs,
      "fa-cog": Ws,
      "fa-file-text": Ks,
      "fa-rotate-left": Qs,
      "fa-rotate-right": Ls,
      "fa-map": zs,
      "fa-close": Us,
      "fa-arrow-left": Hs,
      "fa-arrow-right": Vs,
      "fa-arrow-down": Ns,
      "fa-arrow-up": Ds
    };
    return (t, s) => (f(), z(c(Rs), {
      icon: e[r.icon]
    }, null, 8, ["icon"]));
  }
}), $a = /* @__PURE__ */ b("h2", { class: "text-lg font-bold" }, " Карты в файле ", -1), ka = ["onClick"], Fa = /* @__PURE__ */ R({
  __name: "AppFileMaps",
  setup(r) {
    const {
      mapFile: e,
      mapCurrentID: t,
      drawer: s,
      mapRemoved: i
    } = H(), n = e.mapFile(new j()).ref(), o = t.id(new j()).ref(), a = (l) => {
      confirm("Вы уверены?") && i.give(l);
    };
    return (l, p) => (f(), z(gt, {
      direction: "rtl",
      name: "fileMaps"
    }, {
      header: y(() => [
        $a
      ]),
      default: y(() => [
        b("div", null, [
          (f(!0), A(U, null, Q(c(n), (d, u) => (f(), A("div", {
            key: u,
            class: "flex items-center gap-2"
          }, [
            b("a", {
              href: "#",
              class: oe({ "font-bold": c(o) === u }),
              onClick: Ae((h) => {
                c(t).give(u), c(s).give("");
              }, ["prevent"])
            }, C(d.settings.title), 11, ka),
            m(G, {
              onClick: (h) => a(u),
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
}), Ma = { class: "AppMenuObject" }, Ta = {
  key: 0,
  class: "AppMenuObject-Empty"
}, Sa = {
  key: 1,
  class: "flex flex-col gap-1"
}, ja = ["onClick"], Oa = ["innerHTML"], Ba = /* @__PURE__ */ R({
  __name: "AppMenuObject",
  setup(r) {
    const {
      controlCombo: e,
      drawer: t,
      menu: s,
      stagePosition: i
    } = H(), { guest: n, patron: o } = J(), a = s.menuObjects(new j()).ref();
    return e.happened(
      "KeyM",
      o.create(n.create(() => {
        t.give("menu");
      }))
    ), (l, p) => (f(), z(gt, {
      direction: "rtl",
      name: "menu"
    }, {
      default: y(() => [
        b("div", Ma, [
          c(a).length ? (f(), A("div", Sa, [
            (f(!0), A(U, null, Q(c(a), (d) => (f(), A("a", {
              key: d.id,
              class: "AppMenuObject-Item",
              href: "#",
              onClick: Ae((u) => {
                c(i).give(d), c(t).give("");
              }, ["prevent"])
            }, [
              b("span", {
                innerHTML: d.additionalName ? d.additionalName : d.name
              }, null, 8, Oa)
            ], 8, ja))), 128))
          ])) : (f(), A("div", Ta, C(l.$t("appMenuObject.noItems")), 1))
        ])
      ]),
      _: 1
    }));
  }
}), E = /* @__PURE__ */ R({
  __name: "BaseButton",
  props: {
    size: {
      type: String,
      default: "md",
      validator: (r) => ["sm", "md", "lg"].includes(r)
    },
    type: {
      type: String,
      default: "standard"
    }
  },
  setup(r) {
    const e = r, t = ["rounded-main", `text-${e.size}`, `p-${e.size}`, `bg-${e.type} hover:bg-${e.type}-second`];
    return t.push(""), (s, i) => (f(), A("button", {
      type: "button",
      class: oe(t)
    }, [
      Y(s.$slots, "default")
    ]));
  }
}), Ia = {
  key: 0,
  title: "Назад",
  class: "absolute text-white left-0 top-0 -ml-5 flex justify-center items-center bg-primary/70 hover:bg-primary-second/70 cursor-pointer w-5"
}, Pa = {
  key: 1,
  class: "BaseModal-Header"
}, Ea = { class: "overflow-y-auto flex-grow" }, Ra = {
  key: 2,
  class: "BaseModal-Footer"
}, me = /* @__PURE__ */ R({
  __name: "BaseModal",
  props: {
    name: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const { modal: e } = H(), t = r, s = e.isOpenedByName(t.name, new j()).ref(), i = [], n = () => {
      e.give("");
    };
    return (o, a) => (f(), z(ns, { name: "fade" }, {
      default: y(() => [
        c(s) ? (f(), A("div", {
          key: 0,
          class: "absolute rounded-main overflow-y-auto flex justify-center items-center top-0 left-0 bg-black/10 z-20 h-full w-full",
          onClick: n
        }, [
          b("div", {
            class: "w-full relative flex flex-col max-w-[800px] max-h-[90%] bg-white p-3",
            onClick: a[0] || (a[0] = Ae(() => {
            }, ["stop"]))
          }, [
            i.length > 1 ? (f(), A("div", Ia, " < ")) : O("", !0),
            b("div", {
              title: "Закрыть",
              class: "e2e-modal-close absolute text-white right-0 top-0 -mr-5 flex justify-center items-center bg-danger/70 hover:bg-danger-second/70 cursor-pointer w-5",
              onClick: n
            }, " × "),
            o.$slots.header ? (f(), A("div", Pa, [
              Y(o.$slots, "header")
            ])) : O("", !0),
            b("div", Ea, [
              Y(o.$slots, "default")
            ]),
            o.$slots.footer ? (f(), A("div", Ra, [
              Y(o.$slots, "footer")
            ])) : O("", !0)
          ])
        ])) : O("", !0)
      ]),
      _: 3
    }));
  }
}), Da = { class: "AppPresets" }, Na = /* @__PURE__ */ b("div", { class: "text-md font-bold mb-2" }, "Общие", -1), Va = { class: "flex flex-col gap-2" }, Ha = { class: "text-md font-bold mb-1" }, Ua = { class: "flex gap-2 flex-wrap items-end" }, za = { class: "AppTypesParent-ItemTitle" }, La = ["innerHTML"], Qa = /* @__PURE__ */ R({
  __name: "AppPresets",
  setup(r) {
    const {
      svgMapTypeImage: e
    } = J(), { mapType: t, settings: s } = H(), i = new j();
    s.value(i);
    const n = Se(
      () => Object.fromEntries(
        Object.entries(i.value.presets).map(
          ([o, a]) => [
            o,
            a.map(
              (l) => ({
                preset: l,
                image: e.create(l).markup()
              })
            )
          ]
        )
      )
    );
    return (o, a) => (f(), z(me, { name: "presets" }, {
      default: y(() => [
        b("div", Da, [
          Na,
          b("div", Va, [
            (f(!0), A(U, null, Q(c(n), (l, p) => (f(), A("div", { key: p }, [
              b("h3", Ha, C(p), 1),
              b("div", Ua, [
                (f(!0), A(U, null, Q(l, (d) => (f(), A("div", {
                  key: d.preset.name,
                  class: "flex flex-col gap-2"
                }, [
                  b("div", za, C(d.preset.name), 1),
                  b("div", {
                    class: "AppTypesParent-ItemImage",
                    innerHTML: d.image,
                    style: ne(`width:${d.preset.width}px;height:${d.preset.height}px`)
                  }, null, 12, La),
                  m(E, {
                    class: "AppTypesParent-ItemButton e2e-add-preset-type",
                    type: "success",
                    size: "sm",
                    onClick: (u) => c(t).give({ name: d.preset.name, type: d.preset })
                  }, {
                    default: y(() => [
                      B(C(o.$t("general.addToMap")), 1)
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
}), re = /* @__PURE__ */ R({
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
  setup(r, { emit: e }) {
    const t = r, s = e, i = te(null);
    je(
      i,
      we(() => {
        t.autofocus && i.value.focus();
      }, 500)
    );
    const n = Le(t, "modelValue", s);
    return (o, a) => ze((f(), A("input", {
      ref_key: "input",
      ref: i,
      "onUpdate:modelValue": a[0] || (a[0] = (l) => be(n) ? n.value = l : null),
      class: "block rounded-main w-full p-2 border border-solid border-body-dark",
      type: "text"
    }, null, 512)), [
      [os, c(n)]
    ]);
  }
});
class vt {
  constructor(e) {
    $(this, "pool", new Qe(this));
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
const Ka = { class: "AppSearch" }, Wa = {
  key: 0,
  class: "AppSearch-Items"
}, Ga = ["onClick"], Ja = ["innerHTML"], Za = ["innerHTML"], qa = ["innerHTML"], Ya = { key: 1 }, Xa = { key: 2 }, ec = /* @__PURE__ */ R({
  __name: "AppSearch",
  setup(r) {
    const {
      objectsMatchedToQuery: e,
      controlCombo: t,
      modal: s,
      stagePosition: i
    } = H(), { guest: n, patron: o } = J(), a = te(), l = T.debug("app:AppSearch");
    s.isOpenedByName(
      "search",
      o.create(n.create((u) => {
        setTimeout(() => {
          u && a.value && (l("search is opened", u), a.value.$el.focus());
        }, 500);
      }))
    );
    const p = te(""), d = e.objects(
      new vt(p),
      new j([])
    ).ref();
    return t.happened(
      "KeyF",
      o.create(n.create(() => {
        s.give("search");
      }))
    ), (u, h) => (f(), z(me, { name: "search" }, {
      default: y(() => [
        b("div", Ka, [
          m(re, {
            ref_key: "inputRef",
            ref: a,
            modelValue: c(p),
            "onUpdate:modelValue": h[0] || (h[0] = (w) => be(p) ? p.value = w : null),
            class: "mb-2 e2e-query-input",
            placeholder: u.$t("general.specifyQuery")
          }, null, 8, ["modelValue", "placeholder"]),
          c(d).length ? (f(), A("div", Wa, [
            (f(!0), A(U, null, Q(c(d), (w) => (f(), A("div", {
              key: w.name,
              class: "cursor-pointer",
              onClick: Ae((g) => {
                c(i).give(w), c(s).give("");
              }, ["prevent"])
            }, [
              b("b", {
                class: "AppSearch-ItemName",
                innerHTML: w.name
              }, null, 8, Ja),
              w.additionalName ? (f(), A("b", {
                key: 0,
                class: "AppSearch-ItemName",
                innerHTML: w.additionalName
              }, null, 8, Za)) : O("", !0),
              w.additionalFields ? (f(), A("div", {
                key: 1,
                innerHTML: Object.values(w.additionalFields).join(" ")
              }, null, 8, qa)) : O("", !0)
            ], 8, Ga))), 128))
          ])) : c(p) ? (f(), A("div", Ya, C(u.$t("general.noResults")), 1)) : (f(), A("div", Xa, C(u.$t("general.resultsWillBeHere")), 1))
        ])
      ]),
      _: 1
    }));
  }
}), tc = { class: "AppTypes" }, sc = /* @__PURE__ */ b("div", { class: "text-md font-bold mb-2" }, "Родительские типы", -1), ic = { class: "flex gap-2 items-end" }, rc = { class: "AppTypesParent-ItemTitle" }, nc = ["innerHTML"], oc = /* @__PURE__ */ R({
  __name: "AppTypesParent",
  setup(r) {
    const { parentTypes: e, mapType: t } = H(), { svgMapTypeImage: s } = J(), i = e.types(new j()).ref(), n = Se(() => {
      var o;
      return (o = i.value) == null ? void 0 : o.map((a) => ({
        type: a,
        image: s.create(a).markup()
      })).sort((a, l) => +(a.type.name >= l.type.name));
    });
    return (o, a) => (f(), z(me, { name: "parentTypes" }, {
      default: y(() => [
        b("div", tc, [
          sc,
          b("div", ic, [
            (f(!0), A(U, null, Q(c(n), (l) => (f(), A("div", {
              key: l.type.name,
              class: "flex flex-col gap-2"
            }, [
              b("div", rc, C(l.type.name), 1),
              b("div", {
                class: "AppTypesParent-ItemImage",
                innerHTML: l.image,
                style: ne(`width:${l.type.width}px;height:${l.type.height}px`)
              }, null, 12, nc),
              m(E, {
                class: "AppTypesParent-ItemButton e2e-add-preset-type",
                type: "success",
                size: "sm",
                onClick: (p) => c(t).give({ name: l.type.name, type: l.type })
              }, {
                default: y(() => [
                  B(C(o.$t("general.addToMap")), 1)
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
    this.executor = e, this.innerRef = te(t);
  }
  ref() {
    return this.executor(this.innerRef), this.innerRef;
  }
}
const ac = { class: "flex gap-2" }, rt = /* @__PURE__ */ R({
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
  setup(r, { emit: e }) {
    const i = Le(r, "modelValue", e);
    return (n, o) => (f(), A("label", ac, [
      ze(b("input", {
        "onUpdate:modelValue": o[0] || (o[0] = (a) => be(i) ? i.value = a : null),
        type: "checkbox"
      }, null, 512), [
        [Ss, c(i)]
      ]),
      n.$slots.default ? Y(n.$slots, "default", { key: 0 }) : (f(), A(U, { key: 1 }, [
        B(C(r.label), 1)
      ], 64))
    ]));
  }
}), Ze = (r, e) => {
  const t = r.__vccOpts || r;
  for (const [s, i] of e)
    t[s] = i;
  return t;
}, cc = {}, lc = { class: "text-sm font-bold" };
function uc(r, e) {
  return f(), A("div", lc, [
    Y(r.$slots, "default")
  ]);
}
const W = /* @__PURE__ */ Ze(cc, [["render", uc]]), dc = {}, hc = { class: "mb-2" };
function pc(r, e) {
  return f(), A("div", hc, [
    Y(r.$slots, "default")
  ]);
}
const q = /* @__PURE__ */ Ze(dc, [["render", pc]]), fc = { class: "rounded-main p-2 border border-solid border-body-dark" }, mc = { class: "flex gap-2 p-2 bg-white border border-solid border-body-dark rounded-main" }, Ve = /* @__PURE__ */ R({
  __name: "BaseEditor",
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(r, { emit: e }) {
    const t = r, s = e, i = Xs({
      content: t.modelValue,
      extensions: [
        si
      ],
      onUpdate: () => {
        i.value && s("update:modelValue", i.value.getHTML());
      }
    });
    return Es(() => {
      var n;
      (n = i.value) == null || n.destroy();
    }), je(() => t.modelValue, (n) => {
      !i.value || i.value.getHTML() === n || i.value.commands.setContent(n, !1);
    }), (n, o) => (f(), A("div", fc, [
      m(c(ei), { editor: c(i) }, null, 8, ["editor"]),
      c(i) ? (f(), z(c(ti), {
        key: 0,
        editor: c(i),
        "tippy-options": { duration: 100 }
      }, {
        default: y(() => [
          b("div", mc, [
            b("button", {
              onClick: o[0] || (o[0] = (a) => c(i).chain().focus().toggleBold().run()),
              class: oe({ "font-bold": c(i).isActive("bold") })
            }, " bold ", 2),
            b("button", {
              onClick: o[1] || (o[1] = (a) => c(i).chain().focus().toggleItalic().run()),
              class: oe({ "font-bold": c(i).isActive("italic") })
            }, " italic ", 2),
            b("button", {
              onClick: o[2] || (o[2] = (a) => c(i).chain().focus().toggleStrike().run()),
              class: oe({ "font-bold": c(i).isActive("strike") })
            }, " strike ", 2)
          ])
        ]),
        _: 1
      }, 8, ["editor"])) : O("", !0)
    ]));
  }
}), gc = ["value"], vc = /* @__PURE__ */ R({
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
  setup(r, { emit: e }) {
    const t = r, i = Le(t, "modelValue", e);
    return (n, o) => ze((f(), A("select", {
      label: "select",
      "onUpdate:modelValue": o[0] || (o[0] = (a) => be(i) ? i.value = a : null),
      class: "block bg-white rounded-main w-full p-2 border border-solid border-body-dark"
    }, [
      (f(!0), A(U, null, Q(t.items, (a) => (f(), A("option", {
        key: a[t.optionId],
        value: a[t.optionId]
      }, C(a[t.optionLabel]), 9, gc))), 128))
    ], 512)), [
      [js, c(i)]
    ]);
  }
}), Ac = { class: "text-lg font-bold" }, bc = {
  key: 0,
  class: "flex gap-2 items-center"
}, yc = {
  key: 1,
  class: "flex gap-2 mt-2"
}, wc = { key: 0 }, Cc = { key: 1 }, _c = {
  key: 0,
  class: "flex flex-col gap-2"
}, xc = { class: "FormObject-Inner" }, $c = { class: "FormObject-Row" }, kc = { class: "FormObject-Row" }, Fc = { class: "FormObject-Row" }, Mc = { class: "my-2" }, Tc = { class: "FormObject-Title" }, Sc = { class: "FormObject-Row" }, jc = { class: "FormObject-Title" }, Oc = { class: "FormObject-Row" }, Bc = {
  key: 0,
  class: "FormObject-ArrowName"
}, Ic = { class: "py-3 flex gap-1" }, Pc = /* @__PURE__ */ R({
  __name: "FormObject",
  setup(r) {
    const e = ut("FormObject"), {
      mapObjectCurrent: t,
      mapFile: s,
      mapObject: i,
      mapCurrent: n,
      drawer: o,
      mapObjectRemoved: a,
      mapObjectRelationRemoved: l,
      mapObjectUrl: p,
      controlCombo: d
    } = H(), {
      patron: u,
      chain: h,
      guest: w
    } = J(), g = new ks(() => {
      const S = h.create();
      t.objectId(u.create(S.receiveKey("objectId"))), s.currentMap(u.create(S.receiveKey("map"))), S.result(u.create(
        w.create(({ map: M, objectId: F }) => {
          e("object opened", F), g.value = M.objects[F];
        })
      ));
    }).ref(), x = n.types(new j()).ref(), v = s.currentMap(new j()).ref(), k = new vt(g), I = p.url(k, new j()).ref(), K = () => {
      t.give(""), o.give("");
    }, L = () => {
      a.give(g.value), K();
    }, se = () => {
      i.give({
        ...g.value,
        outlink: g.value.outlink || I.value
      }), K();
    }, P = (S) => {
      l.give({
        index: S,
        object: g.value
      });
    };
    return d.happenedConditional(
      "KeyS",
      o.openedByName("object"),
      u.create(w.create(se))
    ), (S, M) => (f(), z(gt, {
      name: "object",
      onClose: K
    }, {
      header: y(() => [
        b("h2", Ac, C(S.$t("general.mapObject")), 1),
        c(g) ? (f(), A("small", bc, [
          b("span", null, " ID #" + C(c(g).id), 1)
        ])) : O("", !0),
        c(g) ? (f(), A("div", yc, [
          c(g).createTimestamp ? (f(), A("div", wc, " Создан: " + C(new Date(c(g).createTimestamp).toLocaleString()), 1)) : O("", !0),
          c(g).changeTimestamp ? (f(), A("div", Cc, " Изменен: " + C(new Date(c(g).changeTimestamp).toLocaleString()), 1)) : O("", !0)
        ])) : O("", !0)
      ]),
      footer: y(() => [
        b("div", Ic, [
          m(E, {
            type: "success",
            onClick: se
          }, {
            default: y(() => [
              B(C(S.$t("general.save")), 1)
            ]),
            _: 1
          }),
          m(E, {
            type: "danger",
            onClick: L
          }, {
            default: y(() => [
              B(C(S.$t("general.delete")), 1)
            ]),
            _: 1
          }),
          m(E, { onClick: K }, {
            default: y(() => [
              B(C(S.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: y(() => [
        c(g) ? (f(), A("div", _c, [
          b("div", xc, [
            b("div", $c, [
              m(rt, {
                modelValue: c(g).linked,
                "onUpdate:modelValue": M[0] || (M[0] = (F) => c(g).linked = F),
                label: S.$t("general.nameAsLink")
              }, null, 8, ["modelValue", "label"])
            ]),
            c(g).linked ? (f(), A(U, { key: 0 }, [
              m(W, null, {
                default: y(() => [
                  B(C(S.$t("general.outerLink")), 1)
                ]),
                _: 1
              }),
              b("div", kc, [
                m(re, {
                  "model-value": c(g).outlink || c(I),
                  "onUpdate:modelValue": M[1] || (M[1] = (F) => c(g).outlink = F)
                }, null, 8, ["model-value"])
              ]),
              b("div", Fc, [
                m(rt, {
                  modelValue: c(g).targetBlank,
                  "onUpdate:modelValue": M[2] || (M[2] = (F) => c(g).targetBlank = F),
                  label: S.$t("general.inNewTab")
                }, null, 8, ["modelValue", "label"])
              ])
            ], 64)) : O("", !0),
            (f(!0), A(U, null, Q(c(g).additionalFields, (F, Z) => (f(), z(q, {
              class: "mb-2",
              key: Z
            }, {
              default: y(() => [
                m(W, { class: "mb-1" }, {
                  default: y(() => [
                    B(C(Z), 1)
                  ]),
                  _: 2
                }, 1024),
                m(Ve, {
                  modelValue: c(g).additionalFields[Z],
                  "onUpdate:modelValue": (ae) => c(g).additionalFields[Z] = ae
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              _: 2
            }, 1024))), 128)),
            m(q, null, {
              default: y(() => [
                m(W, null, {
                  default: y(() => [
                    B(C(S.$t("general.topName")), 1)
                  ]),
                  _: 1
                }),
                m(Ve, {
                  modelValue: c(g).additionalName,
                  "onUpdate:modelValue": M[3] || (M[3] = (F) => c(g).additionalName = F)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            m(q, null, {
              default: y(() => [
                m(W, null, {
                  default: y(() => [
                    B(C(S.$t("general.bottomName")), 1)
                  ]),
                  _: 1
                }),
                m(Ve, {
                  modelValue: c(g).name,
                  "onUpdate:modelValue": M[4] || (M[4] = (F) => c(g).name = F)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            m(q, null, {
              default: y(() => [
                m(W, null, {
                  default: y(() => [
                    B(C(S.$t("general.description")), 1)
                  ]),
                  _: 1
                }),
                m(Ve, {
                  modelValue: c(g).description,
                  "onUpdate:modelValue": M[5] || (M[5] = (F) => c(g).description = F)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            m(q, null, {
              default: y(() => [
                m(W, null, {
                  default: y(() => [
                    B(" Z-Index ")
                  ]),
                  _: 1
                }),
                m(re, {
                  modelValue: c(g).zindex,
                  "onUpdate:modelValue": M[6] || (M[6] = (F) => c(g).zindex = F),
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            m(q, null, {
              default: y(() => [
                m(W, null, {
                  default: y(() => [
                    B(" Width ")
                  ]),
                  _: 1
                }),
                m(re, {
                  modelValue: c(g).width,
                  "onUpdate:modelValue": M[7] || (M[7] = (F) => c(g).width = F),
                  step: "20",
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            m(q, null, {
              default: y(() => [
                m(W, null, {
                  default: y(() => [
                    B(" Height ")
                  ]),
                  _: 1
                }),
                m(re, {
                  modelValue: c(g).height,
                  "onUpdate:modelValue": M[8] || (M[8] = (F) => c(g).height = F),
                  step: "20",
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            m(q, null, {
              default: y(() => [
                m(W, null, {
                  default: y(() => [
                    B(C(S.$t("general.objectType")), 1)
                  ]),
                  _: 1
                }),
                m(vc, {
                  modelValue: c(g).type,
                  "onUpdate:modelValue": M[9] || (M[9] = (F) => c(g).type = F),
                  items: c(x),
                  "option-id": "id",
                  "option-label": "name"
                }, null, 8, ["modelValue", "items"])
              ]),
              _: 1
            }),
            b("div", Mc, [
              m(rt, {
                modelValue: c(g).inMenu,
                "onUpdate:modelValue": M[10] || (M[10] = (F) => c(g).inMenu = F),
                label: S.$t("general.useInMenu")
              }, null, 8, ["modelValue", "label"])
            ]),
            c(g).inMenu ? (f(), A(U, { key: 1 }, [
              b("div", Tc, C(S.$t("general.menuOrder")), 1),
              b("div", Sc, [
                m(re, {
                  modelValue: c(g).menuOrder,
                  "onUpdate:modelValue": M[11] || (M[11] = (F) => c(g).menuOrder = F),
                  type: "number"
                }, null, 8, ["modelValue"])
              ])
            ], 64)) : O("", !0),
            c(g).arrows && c(g).arrows.length ? (f(), A(U, { key: 2 }, [
              b("div", jc, C(S.$t("general.relations")), 1),
              b("div", Oc, [
                (f(!0), A(U, null, Q(c(g).arrows, (F, Z) => {
                  var ae;
                  return f(), A("div", {
                    key: F.id,
                    class: "FormObject-Arrow"
                  }, [
                    (ae = c(v)) != null && ae.objects[F.id] ? (f(), A("span", Bc, " #" + C(Z + 1) + " " + C(c(v).objects[F.id].name), 1)) : O("", !0),
                    m(E, {
                      class: "FormObject-ArrowButton",
                      type: "danger",
                      size: "sm",
                      onClick: (ge) => P(Z)
                    }, {
                      default: y(() => [
                        B(C(S.$t("general.delete")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]);
                }), 128))
              ])
            ], 64)) : O("", !0)
          ])
        ])) : O("", !0)
      ]),
      _: 1
    }));
  }
}), Ec = { class: "BaseTextarea" }, Rc = ["v-bind"], Fs = /* @__PURE__ */ R({
  inheritAttrs: !1,
  __name: "BaseTextarea",
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(r, { emit: e }) {
    const i = Le(r, "modelValue", e);
    return (n, o) => (f(), A("div", Ec, [
      ze(b("textarea", {
        ref: "textarea",
        "v-bind": n.$attrs,
        "onUpdate:modelValue": o[0] || (o[0] = (a) => be(i) ? i.value = a : null),
        class: "rounded-main block w-full p-2 border min-h-[200px] border-solid border-body-dark"
      }, null, 8, Rc), [
        [os, c(i)]
      ])
    ]));
  }
}), Dc = { class: "text-lg font-bold" }, Nc = {
  key: 0,
  class: "flex flex-col"
}, Vc = { class: "flex justify-end pt-4 gap-2" }, Hc = /* @__PURE__ */ R({
  __name: "FormType",
  setup(r) {
    const {
      mapTypeCurrent: e,
      mapFile: t,
      mapType: s,
      modal: i,
      controlCombo: n
    } = H(), { patron: o, chain: a, guest: l } = J();
    e.typeId(
      o.create(l.create((g) => {
        g && i.give("type");
      }))
    );
    const p = te(""), d = a.create(), u = new ks(() => {
      e.typeId(o.create(d.receiveKey("typeId"))), t.currentMap(o.create(d.receiveKey("map"))), d.result(o.create(
        l.create(({ map: g, typeId: x }) => {
          var v;
          u.value = g.types[x], p.value = (v = u.value) == null ? void 0 : v.name;
        })
      ));
    }).ref(), h = () => {
      e.give(""), i.give(""), d.receiveKey("typeId").give("");
    }, w = () => {
      s.give({
        name: p.value,
        type: u.value
      }), h();
    };
    return n.happenedConditional(
      "KeyS",
      i.openedByName("type"),
      o.create(l.create(w))
    ), (g, x) => (f(), z(me, { name: "type" }, {
      header: y(() => [
        b("h2", Dc, C(g.$t("general.mapType")), 1)
      ]),
      footer: y(() => [
        b("div", Vc, [
          m(E, {
            type: "success",
            onClick: w
          }, {
            default: y(() => [
              B(C(g.$t("general.save")), 1)
            ]),
            _: 1
          }),
          m(E, { onClick: h }, {
            default: y(() => [
              B(C(g.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: y(() => [
        c(u) ? (f(), A("div", Nc, [
          m(q, null, {
            default: y(() => [
              m(W, null, {
                default: y(() => [
                  B(" Название типа ")
                ]),
                _: 1
              }),
              m(re, {
                modelValue: c(u).name,
                "onUpdate:modelValue": x[0] || (x[0] = (v) => c(u).name = v)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          m(q, null, {
            default: y(() => [
              m(W, null, {
                default: y(() => [
                  B(" SVG ")
                ]),
                _: 1
              }),
              m(Fs, {
                modelValue: c(u).svg,
                "onUpdate:modelValue": x[1] || (x[1] = (v) => c(u).svg = v)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          m(q, null, {
            default: y(() => [
              m(W, null, {
                default: y(() => [
                  B(" Ширина ")
                ]),
                _: 1
              }),
              m(re, {
                modelValue: c(u).width,
                "onUpdate:modelValue": x[2] || (x[2] = (v) => c(u).width = v)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          m(q, null, {
            default: y(() => [
              m(W, null, {
                default: y(() => [
                  B(" Высота ")
                ]),
                _: 1
              }),
              m(re, {
                modelValue: c(u).height,
                "onUpdate:modelValue": x[3] || (x[3] = (v) => c(u).height = v)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          })
        ])) : O("", !0)
      ]),
      _: 1
    }));
  }
}), nt = T.debug("MapObjectsWithTemplates");
class Uc {
  constructor(e, t, s) {
    this.mapObjects = e, this.map = t, this.factories = s;
  }
  objects(e) {
    const t = this.factories.chain.create();
    return this.map.types(this.factories.guestCast.create(e, t.receiveKey("types"))), this.mapObjects.objects(this.factories.guestCast.create(e, t.receiveKey("objects"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ types: s, objects: i }) => {
        nt("visible objects", i);
        const n = i.map((o) => {
          const a = s.find((p) => String(p.id) === String(o.type));
          if (nt("check type existed", a), !a)
            return {
              obj: o,
              template: ""
            };
          let { svg: l } = a;
          return nt("type svg", l), o.additionalFields && Object.entries(o.additionalFields).forEach(([p, d]) => {
            l = l.replaceAll(`\${${p}}`, d);
          }), ["width", "height"].forEach((p) => {
            l = l.replaceAll(`\${${p}}`, o[p]);
          }), {
            obj: o,
            template: l
          };
        });
        e.give(n);
      })
    ), e;
  }
}
const zc = /* @__PURE__ */ R({
  __name: "BaseNotify",
  setup(r) {
    const { notification: e } = H(), t = e.message(new j()).ref();
    return (s, i) => c(t) && c(t).text !== "hide" ? (f(), A("div", {
      key: 0,
      class: oe(["inline font-bold", `text-${c(t).type}-second`])
    }, C(c(t).text), 3)) : O("", !0);
  }
}), Lc = { class: "relative" }, Qc = { class: "absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-1" }, Kc = { class: "text-sm z-10 p-2 absolute bottom-0 left-5" }, Wc = /* @__PURE__ */ Os('<div class="absolute bottom-3 shadow-standard-second shadow-md drop-shadow right-3 z-10"><div class="grid-example grid grid-rows-2 grid-cols-2 bg-standard-second border border-standard-second gap-[1px] border-t-0 border-l-0"><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div></div></div><div class="absolute z-30 top-0 left-0 h-[18px] w-[22px] bg-white"></div>', 2), Gc = ["title"], Jc = { class: "font-bold" }, Zc = ["title"], qc = { class: "font-bold" }, Yc = ["title"], Xc = { class: "font-bold" }, el = ["title"], tl = { class: "font-bold" }, sl = ["data-object-id"], il = { class: "absolute bottom-[100%] left-[50%] translate-x-[-50%] text-center pb-2 pointer-events-auto text-sm w-[300px]" }, rl = ["innerHTML", "onClick"], nl = ["innerHTML"], ol = ["data-object-id", "innerHTML"], al = /* @__PURE__ */ R({
  __name: "TheEditor",
  setup(r) {
    const {
      canvas: e,
      mapObjectsVisible: t,
      mapCurrent: s,
      konvaLayer: i,
      fps: n,
      mapCurrentID: o,
      mapObjectUrl: a,
      stageSize: l,
      objectsOutsideScreen: p,
      stagePositionByObjectId: d,
      mapCurrentSource: u
    } = H(), h = J(), w = n.value(new j()).ref(), x = new Uc(
      t,
      s,
      h
    ).objects(new j([])).ref(), v = l.value(new j()).ref(), k = i.position(new j()).ref(), I = Se(() => {
      var ge;
      return (ge = v.value) == null ? void 0 : ge.width;
    }), K = new vt(I), L = h.numberChunks.create(10, K).chunks(new j()).ref(), se = te();
    as(() => {
      e.give(se.value);
    });
    const P = (ge) => {
      a.open(ge, h.guest.create((ie) => {
        o.give(ie);
      }));
    }, S = p.count(
      { axis: "x", direction: "negative" },
      new j()
    ).ref(), M = p.count(
      { axis: "x", direction: "positive" },
      new j()
    ).ref(), F = p.count(
      { axis: "y", direction: "negative" },
      new j()
    ).ref(), Z = p.count(
      { axis: "y", direction: "positive" },
      new j()
    ).ref(), ae = d.move.bind(d, u);
    return (ge, ie) => {
      var At, bt, yt, wt, Ct, _t, xt, $t, kt, Ft, Mt, Tt;
      return f(), A("div", Lc, [
        b("div", Qc, [
          b("div", Kc, [
            B(" Видимых объектов: " + C(c(x).length) + ", FPS: " + C(c(w)) + ", ", 1),
            m(zc)
          ]),
          Wc,
          ((At = c(S)) == null ? void 0 : At.count) > 0 ? (f(), A("div", {
            key: 0,
            class: "pointer-events-auto absolute z-30 top-0 left-4 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(bt = c(S)) == null ? void 0 : bt.count} шт. объектов левее`,
            onClick: ie[0] || (ie[0] = (N) => c(ae)(c(S).nearestObjectId))
          }, [
            m(G, { icon: "fa-arrow-left" }),
            b("span", Jc, C((yt = c(S)) == null ? void 0 : yt.count), 1)
          ], 8, Gc)) : O("", !0),
          ((wt = c(M)) == null ? void 0 : wt.count) > 0 ? (f(), A("div", {
            key: 1,
            class: "pointer-events-auto absolute z-30 p-1 top-0 right-0 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(Ct = c(M)) == null ? void 0 : Ct.count} шт. объектов правее`,
            onClick: ie[1] || (ie[1] = (N) => c(ae)(c(M).nearestObjectId))
          }, [
            b("span", qc, C((_t = c(M)) == null ? void 0 : _t.count), 1),
            m(G, { icon: "fa-arrow-right" })
          ], 8, Zc)) : O("", !0),
          ((xt = c(F)) == null ? void 0 : xt.count) > 0 ? (f(), A("div", {
            key: 2,
            class: "pointer-events-auto absolute z-30 top-[18px] left-0 w-[18px] bg-white flex flex-col leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${($t = c(F)) == null ? void 0 : $t.count} шт. объектов выше`,
            onClick: ie[2] || (ie[2] = (N) => c(ae)(c(F).nearestObjectId))
          }, [
            m(G, { icon: "fa-arrow-up" }),
            b("span", Xc, C((kt = c(F)) == null ? void 0 : kt.count), 1)
          ], 8, Yc)) : O("", !0),
          ((Ft = c(Z)) == null ? void 0 : Ft.count) > 0 ? (f(), A("div", {
            key: 3,
            class: "pointer-events-auto absolute z-30 p-1 bottom-0 left-0 w-[18px] bg-white flex flex-col-reverse leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(Mt = c(Z)) == null ? void 0 : Mt.count} шт. объектов ниже`,
            onClick: ie[3] || (ie[3] = (N) => c(ae)(c(Z).nearestObjectId))
          }, [
            m(G, { icon: "fa-arrow-down" }),
            b("span", tl, C((Tt = c(Z)) == null ? void 0 : Tt.count), 1)
          ], 8, el)) : O("", !0),
          b("div", {
            class: oe({ "objects-container absolute top-0 left-0": !0 }),
            style: ne({ width: `${c(v).width}px`, height: `${c(v).height}px`, transform: `translate(${c(k).x}px, ${c(k).y}px)` })
          }, [
            b("div", {
              class: "absolute flex top-0 left-0 w-full z-20 h-[20px] bg-default border-b-2 border-border text-right text-sm px-2",
              style: ne({ transform: `translate(0, ${-c(k).y}px)` })
            }, [
              (f(!0), A(U, null, Q(c(L), (N) => (f(), A("span", {
                class: "flex-1 text-body-dark",
                key: `horiz_${N}`
              }, C(N) + "px", 1))), 128))
            ], 4),
            b("div", {
              class: "absolute flex [writing-mode:vertical-lr] top-0 left-0 h-full z-20 w-[20px] bg-default border-r-2 border-border text-left text-sm py-2",
              style: ne({ transform: `translate(${-c(k).x}px, 0)` })
            }, [
              (f(!0), A(U, null, Q(c(L), (N) => (f(), A("span", {
                class: "flex-1 rotate-180 text-body-dark",
                key: `vert_${N}`
              }, C(N) + "px", 1))), 128))
            ], 4),
            (f(!0), A(U, null, Q(c(x), (N) => (f(), A("div", {
              key: N.obj.id,
              class: "absolute z-10",
              "data-object-id": N.obj.id,
              style: ne(`width:${N.obj.width}px;height: ${N.obj.height}px;top: ${N.obj.position[1]}px;left:${N.obj.position[0]}px;z-index:${N.obj.zindex}`)
            }, [
              b("div", il, [
                b("span", {
                  innerHTML: N.obj.additionalName,
                  class: oe([N.obj.linked && "cursor-pointer underline"]),
                  onClick: (iu) => P(N.obj)
                }, null, 10, rl)
              ]),
              b("div", {
                class: "absolute top-[100%] left-[50%] translate-x-[-50%] text-center pt-2 text-sm w-[300px]",
                innerHTML: N.obj.name
              }, null, 8, nl),
              b("div", {
                "data-object-id": N.obj.id,
                class: "rendered-object",
                innerHTML: N.template
              }, null, 8, ol)
            ], 12, sl))), 128))
          ], 4)
        ]),
        b("div", {
          class: "h-full",
          ref_key: "canvasWrapper",
          ref: se
        }, null, 512)
      ]);
    };
  }
}), cl = { class: "flex flex-wrap gap-2" }, ll = { key: 0 }, ul = { key: 1 }, dl = ["onClick"], hl = /* @__PURE__ */ R({
  __name: "BaseBreadcrumbs",
  setup(r) {
    const {
      breadcrumbs: e,
      mapCurrentID: t
    } = H(), s = e.list(new j()).ref();
    return (i, n) => (f(), A("div", cl, [
      (f(!0), A(U, null, Q(c(s), (o, a) => (f(), A("span", {
        class: "flex gap-2",
        key: o.name
      }, [
        a !== 0 ? (f(), A("span", ll, "/")) : O("", !0),
        a === c(s).length - 1 ? (f(), A("b", ul, "Открыто: " + C(o.title), 1)) : (f(), A("a", {
          key: 2,
          href: "#",
          onClick: Ae((l) => c(t).give(o.name), ["prevent"])
        }, C(o.title), 9, dl))
      ]))), 128))
    ]));
  }
}), pl = { class: "flex items-center p-3 gap-3" }, fl = { class: "ml-auto gap-1 flex" }, ml = /* @__PURE__ */ R({
  __name: "TheHeader",
  setup(r) {
    const {
      drawer: e,
      modal: t,
      mapHistory: s,
      controlCombo: i,
      settings: n
    } = H(), { patron: o, guest: a } = J(), l = s.isNextPossible(new j()).ref(), p = s.isPrevPossible(new j()).ref();
    i.happened(
      "KeyZ",
      o.create(a.create(() => {
        p.value && s.prev();
      }))
    ), i.happened(
      "KeyP",
      o.create(a.create(() => {
        l.value && s.next();
      }))
    );
    const d = new j();
    return n.value(d), (u, h) => (f(), A("div", pl, [
      m(hl, { class: "TheHeader-Breadcrumbs" }),
      b("div", fl, [
        c(l) && !c(d).value.readonly ? (f(), z(E, {
          key: 0,
          size: "sm",
          title: "Отменить последнее действие",
          class: "w-7 block",
          onClick: h[0] || (h[0] = (w) => c(s).next())
        }, {
          default: y(() => [
            m(G, { icon: "fa-rotate-left" })
          ]),
          _: 1
        })) : O("", !0),
        c(p) && !c(d).value.readonly ? (f(), z(E, {
          key: 1,
          size: "sm",
          title: "Вернуть отмененное действие",
          class: "w-7 block",
          onClick: h[1] || (h[1] = (w) => c(s).prev())
        }, {
          default: y(() => [
            m(G, { icon: "fa-rotate-right" })
          ]),
          _: 1
        })) : O("", !0),
        m(E, {
          type: "success",
          size: "sm",
          class: "w-7 block e2e-open-menu",
          title: u.$t("general.menu"),
          onClick: h[2] || (h[2] = (w) => c(e).give("menu"))
        }, {
          default: y(() => [
            m(G, { icon: "fa-bars" })
          ]),
          _: 1
        }, 8, ["title"]),
        m(E, {
          title: u.$t("general.byText"),
          type: "primary",
          size: "sm",
          class: "w-7 block",
          onClick: h[3] || (h[3] = (w) => c(t).give("mapAsText"))
        }, {
          default: y(() => [
            m(G, { icon: "fa-text-width" })
          ]),
          _: 1
        }, 8, ["title"]),
        m(E, {
          class: "w-7 block e2e-search",
          size: "sm",
          onClick: h[4] || (h[4] = (w) => c(t).give("search"))
        }, {
          default: y(() => [
            m(G, { icon: "fa-search" })
          ]),
          _: 1
        }),
        m(E, {
          size: "sm",
          title: "Все карты файла",
          class: "w-7 block",
          onClick: h[5] || (h[5] = (w) => c(e).give("fileMaps"))
        }, {
          default: y(() => [
            m(G, { icon: "fa-map" })
          ]),
          _: 1
        })
      ])
    ]));
  }
}), gl = {}, vl = { class: "text-lg font-bold" };
function Al(r, e) {
  return f(), A("span", vl, [
    Y(r.$slots, "default")
  ]);
}
const bl = /* @__PURE__ */ Ze(gl, [["render", Al]]), yl = { class: "flex gap-1" }, wl = {
  key: 0,
  class: "TheMapAsText select-auto"
}, Cl = ["innerHTML"], _l = /* @__PURE__ */ R({
  __name: "TheMapAsText",
  setup(r) {
    const { mapFile: e, mapCurrent: t } = H(), {
      guest: s,
      patron: i,
      textOf: n,
      textNlAsBr: o,
      textWithoutHTML: a
    } = J(), l = e.currentMap(new j()).ref(), p = te(""), d = te([]);
    t.objects(
      i.create(
        s.create(we((v) => {
          d.value = v, o.create(
            n.create(
              v.map((k) => `<div class="TheMapAsText-Item">
                <h3>${k.name}</h3><p>${k.additionalName || ""}</p><p>${k.description || ""}</p><p>${k.additionalFields && Object.values(k.additionalFields).join("</p><p>")}</p></div>`).join("")
            )
          ).asString(
            s.create((k) => {
              p.value = k;
            })
          );
        }, 500))
      )
    );
    const { share: u, isSupported: h } = Ps(), w = () => {
      h.value || alert("Sharing is not supported"), a.create(
        n.create(
          p.value
        )
      ).asString(
        s.create((v) => {
          u({
            text: v
          });
        })
      );
    }, g = te(), x = () => {
      var v, k;
      if (l.value) {
        const I = new Range();
        I.setStart(g.value, 0), I.setEnd(g.value, Object.values(d.value).length), (v = document.getSelection()) == null || v.removeAllRanges(), (k = document.getSelection()) == null || k.addRange(I);
      }
    };
    return (v, k) => (f(), z(me, { name: "mapAsText" }, {
      header: y(() => [
        m(bl, { class: "block mb-3" }, {
          default: y(() => [
            B(C(v.$t("general.mapAsText")) + " ", 1),
            b("div", yl, [
              m(E, {
                size: "sm",
                type: "success",
                class: "font-normal",
                onClick: w
              }, {
                default: y(() => [
                  B(C(v.$t("general.share")), 1)
                ]),
                _: 1
              }),
              m(E, {
                size: "sm",
                type: "primary",
                class: "font-normal",
                onClick: x
              }, {
                default: y(() => [
                  B(C(v.$t("general.selectAll")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        })
      ]),
      default: y(() => [
        c(l) ? (f(), A("article", wl, [
          b("div", {
            ref_key: "textRef",
            ref: g,
            innerHTML: c(p)
          }, null, 8, Cl)
        ])) : O("", !0)
      ]),
      _: 1
    }));
  }
}), xl = { key: 1 }, $l = /* @__PURE__ */ R({
  __name: "TheMiniMap",
  setup(r) {
    const { miniMap: e } = H(), t = e.points(new j()).ref(), s = e.size(new j()).ref(), i = e.viewportSize(new j()).ref(), n = e.viewportPosition(new j()).ref();
    return (o, a) => c(s) ? (f(), A("div", {
      key: 0,
      style: ne({
        width: `${c(s).width}px`,
        height: `${c(s).height}px`
      }),
      class: "absolute pointer-events-none block bg-white bottom-[10px] mt-3 right-3 z-1 border border-solid border-body-dark"
    }, [
      c(n) ? (f(), A("div", {
        key: 0,
        style: ne({
          width: `${c(i).width}px`,
          height: `${c(i).height}px`,
          top: `${c(n).y}px`,
          left: `${c(n).x}px`
        }),
        class: "absolute bg-primary/50"
      }, null, 4)) : O("", !0),
      c(t) ? (f(), A("div", xl, [
        (f(!0), A(U, null, Q(c(t), (l) => (f(), A("div", {
          key: l.id,
          class: "absolute w-1 h-1 block bg-danger",
          style: ne({
            top: `${l.y}px`,
            left: `${l.x}px`,
            width: `${l.width}px`,
            height: `${l.height}px`
          })
        }, null, 4))), 128))
      ])) : O("", !0)
    ], 4)) : O("", !0);
  }
}), kl = { class: "text-lg font-bold" }, Fl = {
  key: 0,
  class: "TheSettings"
}, Ml = { class: "mb-2" }, Tl = { class: "TheSettings-Row" }, Sl = { class: "flex gap-2 mb-2" }, jl = { class: "mb-2" }, Ol = { class: "mb-2" }, Bl = {
  href: "https://github.com/kosukhin/mind-map-creator",
  target: "_blank"
}, Il = { class: "flex gap-2" }, Pl = /* @__PURE__ */ R({
  __name: "FormSettings",
  setup(r) {
    const {
      modal: e,
      mapFile: t,
      mapRemoved: s,
      mapSettings: i,
      controlCombo: n,
      parentNames: o,
      mapCurrentID: a
    } = H(), { patron: l, guest: p } = J(), d = o.names(new j()).ref(), u = t.currentMap(new j()).ref(), h = a.id(new j()).ref(), w = () => {
      e.give("");
    }, g = () => {
      i.give(u.value.settings), w();
    };
    return n.happenedConditional(
      "KeyS",
      e.openedByName("settings"),
      l.create(p.create(g))
    ), (x, v) => (f(), z(me, { name: "settings" }, {
      header: y(() => [
        b("h2", kl, C(x.$t("general.mapSettings")), 1)
      ]),
      default: y(() => {
        var k;
        return [
          (k = c(u)) != null && k.settings ? (f(), A("div", Fl, [
            b("div", Ml, [
              b("div", Tl, [
                b("div", Sl, [
                  c(d).length > 1 ? (f(), z(E, {
                    key: 0,
                    type: "primary",
                    class: "text-white",
                    onClick: v[0] || (v[0] = (I) => c(e).give("parentTypes"))
                  }, {
                    default: y(() => [
                      B(C(x.$t("general.parentTypes")), 1)
                    ]),
                    _: 1
                  })) : O("", !0),
                  m(E, {
                    type: "primary",
                    class: "text-white",
                    onClick: v[1] || (v[1] = (I) => c(e).give("export"))
                  }, {
                    default: y(() => [
                      B(C(x.$t("general.exportOrImport")), 1)
                    ]),
                    _: 1
                  }),
                  m(E, {
                    type: "primary",
                    class: "text-white e2e-open-presets",
                    onClick: v[2] || (v[2] = (I) => c(e).give("presets"))
                  }, {
                    default: y(() => [
                      B(" Пресеты ")
                    ]),
                    _: 1
                  })
                ])
              ]),
              b("div", jl, [
                b("label", null, [
                  b("b", null, C(x.$t("general.mapName")), 1),
                  m(re, {
                    modelValue: c(u).settings.title,
                    "onUpdate:modelValue": v[3] || (v[3] = (I) => c(u).settings.title = I)
                  }, null, 8, ["modelValue"])
                ])
              ]),
              b("div", Ol, [
                b("a", Bl, C(x.$t("general.githubRepo")), 1)
              ])
            ]),
            b("div", Il, [
              m(E, {
                class: "TheSettings-Button",
                type: "success",
                onClick: v[4] || (v[4] = (I) => g())
              }, {
                default: y(() => [
                  B(C(x.$t("general.save")), 1)
                ]),
                _: 1
              }),
              m(E, {
                class: "TheSettings-Button",
                onClick: w
              }, {
                default: y(() => [
                  B(C(x.$t("general.cancel")), 1)
                ]),
                _: 1
              }),
              m(E, {
                class: "TheSettings-Button",
                type: "danger",
                onClick: v[5] || (v[5] = (I) => {
                  c(s).give(c(h)), w();
                })
              }, {
                default: y(() => [
                  B(C(x.$t("general.removeMap")), 1)
                ]),
                _: 1
              })
            ])
          ])) : O("", !0)
        ];
      }),
      _: 1
    }));
  }
}), El = {}, Rl = { class: "BaseGroup" };
function Dl(r, e) {
  return f(), A("div", Rl, [
    Y(r.$slots, "default")
  ]);
}
const Nl = /* @__PURE__ */ Ze(El, [["render", Dl]]), Vl = "default", Hl = /* @__PURE__ */ R({
  __name: "TheLinker",
  setup(r) {
    const { mapObjectsLink: e } = H(), t = e.objectIds(new j([])).ref();
    return (s, i) => (f(), z(E, {
      type: Vl,
      onClick: i[0] || (i[0] = (n) => c(e).startLink())
    }, {
      default: y(() => [
        B(C(c(t).length === 1 ? "Выбиретие объект" : c(t).length === 2 ? "Второй объект" : "Связать объекты"), 1)
      ]),
      _: 1
    }));
  }
}), Ul = { class: "flex e2e-sidebar flex-col items-center gap-3 max-h-[100%] overflow-hidden" }, zl = { class: "TheSideBar-ItemName" }, Ll = ["innerHTML", "draggable", "title", "onDragend"], Ql = {
  key: 0,
  class: "flex gap-1"
}, Kl = {
  key: 0,
  class: "mt-auto w-full p-3 pt-0"
}, Wl = /* @__PURE__ */ R({
  __name: "TheSideBar",
  setup(r) {
    const {
      mapObjectNew: e,
      mapCurrent: t,
      mapTypeCurrent: s,
      mapTypeRemoved: i,
      mapTypeNew: n,
      modal: o,
      settings: a,
      sidebarDraggable: l
    } = H(), p = t.types(new j()).ref(), d = te();
    as(() => {
      l.give(d.value);
    });
    const { svgMapTypeImage: u } = J(), h = Se(() => {
      var g;
      return (g = p.value) == null ? void 0 : g.map((x) => ({
        type: x,
        image: u.create(x).markup()
      })).sort((x, v) => +(x.type.name >= v.type.name));
    }), w = new j();
    return a.value(w), (g, x) => (f(), A("div", Ul, [
      b("div", {
        ref_key: "dragWrapperRef",
        ref: d,
        class: "flex flex-col gap-3 flex-grow w-full overflow-y-auto"
      }, [
        (f(!0), A(U, null, Q(c(h), (v, k) => (f(), A("div", {
          key: k,
          class: "flex flex-col items-center justify-center gap-2"
        }, [
          b("div", zl, C(v.type.name), 1),
          b("div", {
            innerHTML: v.image,
            class: "TheSideBar-ItemImage",
            draggable: c(w).value.readonly ? "false" : "true",
            style: ne(`width:${v.type.width}px;height:${v.type.height}px`),
            title: g.$t("general.notifications.dragToCanvasToAdd"),
            onDragend: (I) => c(e).byTypeName(v.type.id, I)
          }, null, 44, Ll),
          c(w).value.readonly ? O("", !0) : (f(), A("div", Ql, [
            m(E, {
              class: "text-white",
              size: "sm",
              type: "primary",
              onClick: (I) => c(s).give(v.type.id)
            }, {
              default: y(() => [
                B(C(g.$t("general.change")), 1)
              ]),
              _: 2
            }, 1032, ["onClick"]),
            m(E, {
              class: "text-white",
              size: "sm",
              type: "danger",
              onClick: (I) => c(i).give(v.type)
            }, {
              default: y(() => [
                B(C(g.$t("general.delete")), 1)
              ]),
              _: 2
            }, 1032, ["onClick"])
          ]))
        ]))), 128))
      ], 512),
      c(w).value.readonly ? O("", !0) : (f(), A("div", Kl, [
        m(Nl, { class: "mb-1 grid gap-1 grid-cols-2" }, {
          default: y(() => [
            m(E, {
              title: g.$t("general.addType"),
              type: "success",
              onClick: x[0] || (x[0] = (v) => c(n).byName())
            }, {
              default: y(() => [
                m(G, { icon: "fa-plus-square" })
              ]),
              _: 1
            }, 8, ["title"]),
            m(E, {
              class: "e2e-show-settings",
              title: g.$t("general.settings"),
              type: "primary",
              onClick: x[1] || (x[1] = (v) => c(o).give("settings"))
            }, {
              default: y(() => [
                m(G, { icon: "fa-cog" })
              ]),
              _: 1
            }, 8, ["title"])
          ]),
          _: 1
        }),
        m(Hl, { class: "w-[100%] block mb-1" })
      ]))
    ]));
  }
});
class Gl {
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
class Jl {
  constructor(e) {
    this.baseSource = e;
  }
  value(e) {
    return this.baseSource.value(
      new ye(e, (t) => {
        ue(JSON.stringify(t), e);
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
class Zl {
  constructor(e, t) {
    this.baseGuest = e, this.baseGuestAware = t;
  }
  value(e) {
    return this.baseGuestAware.value(e), this;
  }
  give(e) {
    return ue(e, this.baseGuest), this;
  }
  pool() {
    throw Error("No pool in SourceDynamic");
  }
}
const ql = { class: "AppPresets" }, Yl = /* @__PURE__ */ b("div", { class: "text-md font-bold mb-2" }, "Экспорт\\Импорт текущей карты", -1), Xl = { class: "flex flex-col gap-2" }, eu = /* @__PURE__ */ R({
  __name: "AppExport",
  setup(r) {
    const { mapFile: e, mapCurrent: t } = H(), s = new Zl(
      t,
      new ct((a) => {
        e.currentMap(new Ue(a));
      })
    ), i = new Jl(s), n = new Gl(new j(), i);
    i.value(n);
    const o = n.ref();
    return (a, l) => (f(), z(me, { name: "export" }, {
      default: y(() => [
        b("div", ql, [
          Yl,
          b("div", Xl, [
            m(Fs, {
              modelValue: c(o),
              "onUpdate:modelValue": l[0] || (l[0] = (p) => be(o) ? o.value = p : null)
            }, null, 8, ["modelValue"])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), tu = { class: "bg-body absolute top-0 left-0 w-full h-full" }, su = { class: "grid grid-cols-[200px_1fr] grid-rows-[50px_1fr] h-dvh relative" }, pu = /* @__PURE__ */ R({
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
  setup(r, { emit: e }) {
    const t = r, s = e, { fileContent: i, settings: n } = H(), { guest: o, patron: a } = J();
    return n.value((l) => {
      n.give({
        ...l,
        readonly: t.readonly,
        presets: t.presets
      });
    }), je(() => t.modelValue, (l) => {
      i.value(o.create((p) => {
        l !== p && i.give(l);
      }));
    }, {
      immediate: !0
    }), i.value(a.create((l) => {
      s("update:modelValue", l);
    })), (l, p) => (f(), A("div", tu, [
      b("div", su, [
        m(ml, { class: "col-span-2" }),
        m(Wl),
        m(al, { class: "w-auto col-auto h-full" }),
        m($l)
      ]),
      m(Pc),
      m(Hc),
      m(Pl),
      m(Qa),
      m(oc),
      m(eu),
      m(Ba),
      m(_l),
      m(ec),
      m(Fa)
    ]));
  }
}), is = T.debug("FileSystemContent");
class fu {
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
const He = T.debug("FirstPossibleFileContent");
class mu {
  constructor(e, t) {
    $(this, "firstPossibleFileContent", null);
    $(this, "contentSource", new ve());
    $(this, "canBeUsedSource", new ve());
    He("length", e.length), e.forEach((s) => {
      s.canBeUsed(
        t.patronOnce.create(
          t.guest.create((i) => {
            He("canbeused result", s, i), i && !this.firstPossibleFileContent && (this.firstPossibleFileContent = s, s.canBeUsed(t.patron.create(this.canBeUsedSource)), s.content(t.patron.create(this.contentSource)), this.contentSource.value(
              t.patron.create((n) => {
                s.content(
                  t.guest.create((o) => {
                    n !== o && s.give(n);
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
    return He("can be used to", this.firstPossibleFileContent), this.canBeUsedSource.value(e), e;
  }
  content(e) {
    return He("content to", this.firstPossibleFileContent), this.contentSource.value(e), this;
  }
  give(e) {
    return this.contentSource.give(e), this;
  }
}
const ot = T.debug("UrlContent");
class gu {
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
const rs = new ve();
class vu {
  constructor(e = window.launchQueue, t = "launchQueue" in window) {
    $(this, "isCalculated", !1);
    this.launchQueue = e, this.isLaunchQueueSupported = t;
  }
  fileHandler(e) {
    return this.isLaunchQueueSupported && !this.isCalculated && (this.isCalculated = !0, this.launchQueue.setConsumer((t) => {
      if (console.log("require file handler"), t.files && t.files.length) {
        const [s] = t.files;
        rs.give(s);
      }
    })), rs.value(e), this;
  }
}
export {
  vu as BrowserLaunchQueue,
  fu as FileSystemContent,
  mu as FirstPossibleFileContent,
  pu as PatronSchemeEditor,
  gu as UrlContent,
  j as VueRefPatron,
  H as useApplication,
  J as useFactories
};
