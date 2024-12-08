var Ss = Object.defineProperty;
var js = (r, e, t) => e in r ? Ss(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var $ = (r, e, t) => js(r, typeof e != "symbol" ? e + "" : e, t);
import { ref as ae, defineComponent as R, openBlock as m, createBlock as z, Transition as rs, withCtx as y, unref as c, createElementBlock as A, normalizeClass as ne, createElementVNode as b, withModifiers as Ae, renderSlot as Y, createCommentVNode as O, Fragment as U, renderList as Q, toDisplayString as C, createVNode as f, normalizeStyle as re, createTextVNode as B, watch as ot, withDirectives as He, isRef as be, vModelText as ns, vModelCheckbox as Os, onBeforeUnmount as Bs, vModelSelect as Is, computed as os, onMounted as as, createStaticVNode as Ps } from "vue";
import { useScriptTag as Es, useMagicKeys as Rs, useVModel as Ue, useShare as Ds } from "@vueuse/core";
import le from "konva";
import { computed as at, watch as cs, ref as Tt } from "@vue/runtime-core";
import { FontAwesomeIcon as Ns } from "@fortawesome/vue-fontawesome";
import { faBars as Vs, faTextWidth as Hs, faSearch as Us, faHistory as zs, faPlusSquare as Ls, faCog as Qs, faFileText as Ks, faRotateLeft as Gs, faRotateRight as Ws, faMap as Js, faClose as Zs, faArrowLeft as qs, faArrowRight as Ys, faArrowDown as Xs, faArrowUp as ei } from "@fortawesome/free-solid-svg-icons";
import { useEditor as ti, EditorContent as si, BubbleMenu as ii } from "@tiptap/vue-3";
import ri from "@tiptap/starter-kit";
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
var oi = Object.defineProperty, ai = (r, e, t) => e in r ? oi(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, St = (r, e, t) => ai(r, typeof e != "symbol" ? e + "" : e, t);
const ls = /* @__PURE__ */ new Map(), jt = (r) => {
  ls.forEach((e) => {
    e.delete(r);
  });
};
class ze {
  constructor(e) {
    this.initiator = e, St(this, "patrons"), St(this, "give"), this.patrons = /* @__PURE__ */ new Set(), ls.set(this, this.patrons);
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
var ci = Object.defineProperty, li = (r, e, t) => e in r ? ci(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, ui = (r, e, t) => li(r, e + "", t);
class Se {
  constructor(e) {
    this.sourceDocument = e, ui(this, "thePool", new ze(this));
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
class Ve {
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
var di = Object.defineProperty, hi = (r, e, t) => e in r ? di(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, Ot = (r, e, t) => hi(r, typeof e != "symbol" ? e + "" : e, t);
class pi {
  constructor(e) {
    Ot(this, "guests", /* @__PURE__ */ new Set()), Ot(this, "patronPool"), this.patronPool = new ze(e);
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
var mi = Object.defineProperty, fi = (r, e, t) => e in r ? mi(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, je = (r, e, t) => fi(r, typeof e != "symbol" ? e + "" : e, t);
class gi {
  constructor() {
    je(this, "theChain"), je(this, "keysKnown", /* @__PURE__ */ new Set()), je(this, "keysFilled", /* @__PURE__ */ new Set()), je(this, "filledChainPool", new pi(this)), this.theChain = new Se({});
  }
  resultArray(e) {
    const t = new Ve(e);
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
    const t = new Ve(e);
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
class vi {
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
class Ai {
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
var bi = Object.defineProperty, yi = (r, e, t) => e in r ? bi(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, wi = (r, e, t) => yi(r, e + "", t);
class Ci {
  constructor(e) {
    this.baseGuest = e, wi(this, "received", !1);
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
var _i = Object.defineProperty, xi = (r, e, t) => e in r ? _i(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, $i = (r, e, t) => xi(r, e + "", t);
class ve {
  constructor() {
    $i(this, "baseSource", new Se(null));
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
class ki {
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
class Fi {
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
class Mi {
  constructor(e) {
    this.content = e;
  }
  result() {
    return JSON.parse(this.content);
  }
}
class Ti {
  constructor(e) {
    this.content = e;
  }
  result() {
    return JSON.stringify(this.content);
  }
}
class Si {
  constructor(e, t = 100, s = 100) {
    this.svgContent = e, this.width = t, this.height = s;
  }
  markup() {
    return this.svgContent.replaceAll("${width}", String(this.width)).replaceAll("${height}", String(this.height));
  }
}
class ji {
  constructor(e, t) {
    this.type = e, this.factories = t;
  }
  markup() {
    return this.factories.svgImage.create(this.type.svg, this.type.width, this.type.height).markup();
  }
}
class Oi {
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
class Bi {
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
class Pi {
  constructor(e, t, s, i) {
    $(this, "loadingCache");
    this.callbackName = e, this.url = t, this.emptyValue = s, this.factories = i, this.loadingCache = i.sourceEmpty.create();
  }
  content(e) {
    this.loadingCache.give(!0);
    const t = setTimeout(() => {
      this.loadingCache.give(!1), e.give(this.emptyValue);
    }, 1e4);
    return Es(this.url, () => {
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
class Ei {
  constructor(e) {
    this.text = e;
  }
  asString(e) {
    return e.give(this.text), e;
  }
}
class Ri {
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
var Oe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function lt(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var nt = { exports: {} }, Je, Bt;
function Di() {
  if (Bt) return Je;
  Bt = 1;
  var r = 1e3, e = r * 60, t = e * 60, s = t * 24, i = s * 7, n = s * 365.25;
  Je = function(d, l) {
    l = l || {};
    var h = typeof d;
    if (h === "string" && d.length > 0)
      return o(d);
    if (h === "number" && isFinite(d))
      return l.long ? u(d) : a(d);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(d)
    );
  };
  function o(d) {
    if (d = String(d), !(d.length > 100)) {
      var l = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        d
      );
      if (l) {
        var h = parseFloat(l[1]), w = (l[2] || "ms").toLowerCase();
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
    var l = Math.abs(d);
    return l >= s ? Math.round(d / s) + "d" : l >= t ? Math.round(d / t) + "h" : l >= e ? Math.round(d / e) + "m" : l >= r ? Math.round(d / r) + "s" : d + "ms";
  }
  function u(d) {
    var l = Math.abs(d);
    return l >= s ? p(d, l, s, "day") : l >= t ? p(d, l, t, "hour") : l >= e ? p(d, l, e, "minute") : l >= r ? p(d, l, r, "second") : d + " ms";
  }
  function p(d, l, h, w) {
    var g = l >= h * 1.5;
    return Math.round(d / h) + " " + w + (g ? "s" : "");
  }
  return Je;
}
function Ni(r) {
  t.debug = t, t.default = t, t.coerce = u, t.disable = n, t.enable = i, t.enabled = o, t.humanize = Di(), t.destroy = p, Object.keys(r).forEach((d) => {
    t[d] = r[d];
  }), t.names = [], t.skips = [], t.formatters = {};
  function e(d) {
    let l = 0;
    for (let h = 0; h < d.length; h++)
      l = (l << 5) - l + d.charCodeAt(h), l |= 0;
    return t.colors[Math.abs(l) % t.colors.length];
  }
  t.selectColor = e;
  function t(d) {
    let l, h = null, w, g;
    function x(...v) {
      if (!x.enabled)
        return;
      const F = x, I = Number(/* @__PURE__ */ new Date()), K = I - (l || I);
      F.diff = K, F.prev = l, F.curr = I, l = I, v[0] = t.coerce(v[0]), typeof v[0] != "string" && v.unshift("%O");
      let L = 0;
      v[0] = v[0].replace(/%([a-zA-Z%])/g, (P, S) => {
        if (P === "%%")
          return "%";
        L++;
        const k = t.formatters[S];
        if (typeof k == "function") {
          const M = v[L];
          P = k.call(F, M), v.splice(L, 1), L--;
        }
        return P;
      }), t.formatArgs.call(F, v), (F.log || t.log).apply(F, v);
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
  function s(d, l) {
    const h = t(this.namespace + (typeof l > "u" ? ":" : l) + d);
    return h.log = this.log, h;
  }
  function i(d) {
    t.save(d), t.namespaces = d, t.names = [], t.skips = [];
    let l;
    const h = (typeof d == "string" ? d : "").split(/[\s,]+/), w = h.length;
    for (l = 0; l < w; l++)
      h[l] && (d = h[l].replace(/\*/g, ".*?"), d[0] === "-" ? t.skips.push(new RegExp("^" + d.slice(1) + "$")) : t.names.push(new RegExp("^" + d + "$")));
  }
  function n() {
    const d = [
      ...t.names.map(a),
      ...t.skips.map(a).map((l) => "-" + l)
    ].join(",");
    return t.enable(""), d;
  }
  function o(d) {
    if (d[d.length - 1] === "*")
      return !0;
    let l, h;
    for (l = 0, h = t.skips.length; l < h; l++)
      if (t.skips[l].test(d))
        return !1;
    for (l = 0, h = t.names.length; l < h; l++)
      if (t.names[l].test(d))
        return !0;
    return !1;
  }
  function a(d) {
    return d.toString().substring(2, d.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function u(d) {
    return d instanceof Error ? d.stack || d.message : d;
  }
  function p() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return t.enable(t.load()), t;
}
var Vi = Ni;
(function(r, e) {
  e.formatArgs = s, e.save = i, e.load = n, e.useColors = t, e.storage = o(), e.destroy = /* @__PURE__ */ (() => {
    let u = !1;
    return () => {
      u || (u = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
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
    let u;
    return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator < "u" && navigator.userAgent && (u = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(u[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function s(u) {
    if (u[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + u[0] + (this.useColors ? "%c " : " ") + "+" + r.exports.humanize(this.diff), !this.useColors)
      return;
    const p = "color: " + this.color;
    u.splice(1, 0, p, "color: inherit");
    let d = 0, l = 0;
    u[0].replace(/%[a-zA-Z%]/g, (h) => {
      h !== "%%" && (d++, h === "%c" && (l = d));
    }), u.splice(l, 0, p);
  }
  e.log = console.debug || console.log || (() => {
  });
  function i(u) {
    try {
      u ? e.storage.setItem("debug", u) : e.storage.removeItem("debug");
    } catch {
    }
  }
  function n() {
    let u;
    try {
      u = e.storage.getItem("debug");
    } catch {
    }
    return !u && typeof process < "u" && "env" in process && (u = process.env.DEBUG), u;
  }
  function o() {
    try {
      return localStorage;
    } catch {
    }
  }
  r.exports = Vi(e);
  const { formatters: a } = r.exports;
  a.j = function(u) {
    try {
      return JSON.stringify(u);
    } catch (p) {
      return "[UnexpectedJSONParseError]: " + p.message;
    }
  };
})(nt, nt.exports);
var T = nt.exports;
const us = /* @__PURE__ */ lt(T), Hi = T.debug("TextNlAsBr");
class Ui {
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
const zi = new D(Se), Li = new D(Se), Qi = new D(ve), Ki = new D(he), Gi = new D(ye), Wi = new D(ct), Ji = new D(ze), Zi = new D(Ai), qi = new D(Ci), Yi = new D(ye), Xi = new D(gi), er = new D(vi), de = {
  cache: zi,
  chain: Xi,
  guest: Ki,
  guestCast: Gi,
  guestAware: Wi,
  guestInTheMiddle: Yi,
  guestSync: er,
  patron: Zi,
  patronOnce: qi,
  pool: Ji,
  source: Li,
  sourceEmpty: Qi
}, tr = new D(ki), sr = new D(Fi), ir = new D(Ti), rr = new D(Mi), ds = new D(Si), nr = new D(ji, { ...de, svgImage: ds }), or = new D(Oi, de), ar = new D(Bi, de), cr = new D(Ii, de), lr = new D(Pi, de), ur = new D(Ei), dr = new D(Ri, de), hr = new D(Ui, de), pr = {
  ...de,
  fileHandlerContent: tr,
  browserFileSaved: sr,
  transformToString: ir,
  transformToObject: rr,
  svgImage: ds,
  svgMapTypeImage: nr,
  numberChunks: or,
  mapNameFromUrl: ar,
  textNoHtml: cr,
  jsonp: lr,
  textOf: ur,
  textNlAsBr: hr,
  textWithoutHTML: dr
}, J = () => pr;
class ut {
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
class hs {
  constructor(e, t, s) {
    $(this, "objectsCache");
    $(this, "settingsCache");
    $(this, "typesCache");
    this.mapFile = e, this.mapId = t, this.factories = s, this.objectsCache = s.sourceEmpty.create(), this.settingsCache = s.sourceEmpty.create(), this.typesCache = s.sourceEmpty.create(), e.currentMap(
      s.patron.create(
        s.guest.create((i) => {
          Ze("current map changed", i), this.settingsCache.give(i.settings), this.objectsCache.give(Object.values(i.objects)), this.typesCache.give(
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
class mr {
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
class fr {
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
const Be = T.debug("MapHistory"), It = (r) => {
  const e = JSON.parse(JSON.stringify(r));
  return Object.values(e.objects).forEach((t) => {
    t.width = 0, t.height = 0;
  }), JSON.stringify(e);
};
class gr {
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
              Be("add map to history", s, e);
              const i = s.some(
                (n) => It(n) === It(e)
              );
              if (Be("isMapFromHistory", i), !i) {
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
          Be("recalculate is prev possible", n), e.give(n);
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
          Be("recalculate is next possible", n), e.give(n);
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
class vr {
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
const Ie = T.debug("MapFileOfContent");
class Ar {
  constructor(e, t, s) {
    $(this, "currentMapPatrons");
    $(this, "mapFileCache");
    this.mapFileContent = e, this.mapId = t, this.factories = s, this.currentMapPatrons = s.pool.create(this), this.mapFileCache = s.cache.create(!1), e.value(
      s.patron.create((i) => {
        if (!i)
          return;
        const n = this.factories.transformToObject.create(i).result();
        Ie("get map file", n), this.mapFileCache.give(n);
      })
    );
  }
  currentMap(e) {
    const t = this.factories.chain.create();
    return this.mapId.id(this.factories.guestCast.create(e, t.receiveKey("mapId"))), this.mapFile(this.factories.guestCast.create(e, t.receiveKey("mapFile"))), t.result(
      this.factories.guestInTheMiddle.create(
        e,
        ({ mapId: s, mapFile: i }) => {
          if (Ie("get current map", s, i, typeof i), !i[s])
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
    return Ie("save map file document", e), this.mapFileContent.give(this.factories.transformToString.create(e).result()), this;
  }
  mapFile(e) {
    return this.mapFileCache.value(e), e;
  }
  createEmptyMapByName(e, t) {
    Ie("creating empty map by name", e);
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
const br = T.debug("MapFileForRendering");
class yr {
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
        br("received map file, objects = ", e[t].objects), this.mapCache.give(e[t]);
      })
    ), this;
  }
}
class ps {
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
const Pt = us("app:MapObjectCurrent");
class wr {
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
class Cr {
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
const qe = T.debug("MapObjectNew");
class _r {
  constructor(e, t, s, i, n) {
    this.map = e, this.mapObject = t, this.canvas = s, this.stagePosition = i, this.factories = n;
  }
  byTypeName(e, t) {
    return qe("start to add new type", e, t), this.stagePosition.position(
      this.factories.guest.create((s) => {
        this.map.types(
          this.factories.guest.create((i) => {
            this.canvas.canvas(
              this.factories.guest.create((n) => {
                const o = n.getBoundingClientRect(), a = i.find((d) => d.id === e);
                qe("is type found", a);
                const u = t.x - o.left, p = t.y - o.top;
                a && (qe("add new type"), this.mapObject.give({
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
                    u > 0 ? u + s.x : 0,
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
class xr {
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
class $r {
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
class kr {
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
const Fr = T.debug("MapObjectsLink");
class Mr {
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
            t.push(s), this.objectIdsCache.give([...t]), Fr("object ids", t), t.length === 2 && this.map.objects(
              this.factories.guest.create((i) => {
                const [, n] = t, o = i.find((a) => a.id === n);
                o && this.newArrow.forObject(o);
              })
            ), t.length === 3 && (this.newArrow.dispose(), this.mapObjectCurrent.silenceOff(), this.map.objects(
              this.factories.guest.create((i) => {
                const [, n, o] = t, a = i.find((u) => u.id === n);
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
function Tr(r) {
  var e = typeof r;
  return r != null && (e == "object" || e == "function");
}
var dt = Tr, Sr = typeof Oe == "object" && Oe && Oe.Object === Object && Oe, jr = Sr, Or = jr, Br = typeof self == "object" && self && self.Object === Object && self, Ir = Or || Br || Function("return this")(), ms = Ir, Pr = ms, Er = function() {
  return Pr.Date.now();
}, Rr = Er, Dr = /\s/;
function Nr(r) {
  for (var e = r.length; e-- && Dr.test(r.charAt(e)); )
    ;
  return e;
}
var Vr = Nr, Hr = Vr, Ur = /^\s+/;
function zr(r) {
  return r && r.slice(0, Hr(r) + 1).replace(Ur, "");
}
var Lr = zr, Qr = ms, Kr = Qr.Symbol, fs = Kr, Et = fs, gs = Object.prototype, Gr = gs.hasOwnProperty, Wr = gs.toString, _e = Et ? Et.toStringTag : void 0;
function Jr(r) {
  var e = Gr.call(r, _e), t = r[_e];
  try {
    r[_e] = void 0;
    var s = !0;
  } catch {
  }
  var i = Wr.call(r);
  return s && (e ? r[_e] = t : delete r[_e]), i;
}
var Zr = Jr, qr = Object.prototype, Yr = qr.toString;
function Xr(r) {
  return Yr.call(r);
}
var en = Xr, Rt = fs, tn = Zr, sn = en, rn = "[object Null]", nn = "[object Undefined]", Dt = Rt ? Rt.toStringTag : void 0;
function on(r) {
  return r == null ? r === void 0 ? nn : rn : Dt && Dt in Object(r) ? tn(r) : sn(r);
}
var an = on;
function cn(r) {
  return r != null && typeof r == "object";
}
var ln = cn, un = an, dn = ln, hn = "[object Symbol]";
function pn(r) {
  return typeof r == "symbol" || dn(r) && un(r) == hn;
}
var mn = pn, fn = Lr, Nt = dt, gn = mn, Vt = NaN, vn = /^[-+]0x[0-9a-f]+$/i, An = /^0b[01]+$/i, bn = /^0o[0-7]+$/i, yn = parseInt;
function wn(r) {
  if (typeof r == "number")
    return r;
  if (gn(r))
    return Vt;
  if (Nt(r)) {
    var e = typeof r.valueOf == "function" ? r.valueOf() : r;
    r = Nt(e) ? e + "" : e;
  }
  if (typeof r != "string")
    return r === 0 ? r : +r;
  r = fn(r);
  var t = An.test(r);
  return t || bn.test(r) ? yn(r.slice(2), t ? 2 : 8) : vn.test(r) ? Vt : +r;
}
var Cn = wn, _n = dt, Ye = Rr, Ht = Cn, xn = "Expected a function", $n = Math.max, kn = Math.min;
function Fn(r, e, t) {
  var s, i, n, o, a, u, p = 0, d = !1, l = !1, h = !0;
  if (typeof r != "function")
    throw new TypeError(xn);
  e = Ht(e) || 0, _n(t) && (d = !!t.leading, l = "maxWait" in t, n = l ? $n(Ht(t.maxWait) || 0, e) : n, h = "trailing" in t ? !!t.trailing : h);
  function w(P) {
    var S = s, k = i;
    return s = i = void 0, p = P, o = r.apply(k, S), o;
  }
  function g(P) {
    return p = P, a = setTimeout(F, e), d ? w(P) : o;
  }
  function x(P) {
    var S = P - u, k = P - p, M = e - S;
    return l ? kn(M, n - k) : M;
  }
  function v(P) {
    var S = P - u, k = P - p;
    return u === void 0 || S >= e || S < 0 || l && k >= n;
  }
  function F() {
    var P = Ye();
    if (v(P))
      return I(P);
    a = setTimeout(F, x(P));
  }
  function I(P) {
    return a = void 0, h && s ? w(P) : (s = i = void 0, o);
  }
  function K() {
    a !== void 0 && clearTimeout(a), p = 0, s = u = i = a = void 0;
  }
  function L() {
    return a === void 0 ? o : I(Ye());
  }
  function te() {
    var P = Ye(), S = v(P);
    if (s = arguments, i = this, u = P, S) {
      if (a === void 0)
        return g(u);
      if (l)
        return clearTimeout(a), a = setTimeout(F, e), w(u);
    }
    return a === void 0 && (a = setTimeout(F, e)), o;
  }
  return te.cancel = K, te.flush = L, te;
}
var vs = Fn;
const we = /* @__PURE__ */ lt(vs), Mn = (r) => {
  if (r[r.length - 1] === "/") {
    const e = r.split("");
    return e.splice(e.length - 1, 1), e.join("");
  }
  return r;
}, Tn = we((r) => {
  window == null || window.open(r);
}, 200), Xe = T.debug("MapObjectUrl");
class Sn {
  constructor(e, t) {
    this.mapId = e, this.factories = t;
  }
  open(e, t) {
    if (e != null && e.linked) {
      const s = e.outlink;
      e.targetBlank ? Tn(s) : (Xe("open new map", s), this.factories.mapNameFromUrl.create(
        this.factories.source.create(s)
      ).name(
        this.factories.guest.create((n) => {
          Xe("open map name", s, n), t.give(n);
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
                let u = s.outlink ? s.outlink : `${n}/${jn(a)}`;
                Xe("link is", u), u = Mn(u), t.give(u);
              })
            );
          })
        );
      })
    ), t;
  }
}
function jn(r) {
  return r.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}
const On = T.debug("ObjectPositionBounds");
class Bn {
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
        const u = i.height - e.height;
        o > u && (o = u), On("position", n, o), s.give({ x: n, y: o });
      })
    ), s;
  }
}
const Pe = 15;
class In {
  constructor(e, t) {
    this.baseRestriction = e, this.factories = t;
  }
  position(e, t, s) {
    return this.baseRestriction.position(
      e,
      t,
      this.factories.guestInTheMiddle.create(s, (i) => {
        s.give({
          x: Math.round(i.x / Pe) * Pe,
          y: Math.round(i.y / Pe) * Pe
        });
      })
    ), s;
  }
}
const Ut = {
  x: "width",
  y: "height"
}, et = {
  x: 0,
  y: 1
}, Pn = {
  positive: 1,
  negative: -1
}, zt = T.debug("ObjectsOutsideScreen");
class En {
  constructor(e, t, s, i) {
    this.map = e, this.stageSize = t, this.layer = s, this.factories = i;
  }
  count(e, t) {
    const s = e.direction === "positive", i = this.factories.chain.create();
    return this.map.objects(this.factories.guestCast.create(t, i.receiveKey("objects"))), this.layer.layer(this.factories.guestCast.create(t, i.receiveKey("layer"))), this.layer.position(this.factories.guestCast.create(t, i.receiveKey("position"))), i.result(
      this.factories.guestInTheMiddle.create(
        t,
        ({ objects: n, layer: o, position: a }) => {
          var l;
          const u = Pn[e.direction], d = n.sort(
            (h, w) => h.position[et[e.axis]] * u - w.position[et[e.axis]] * u
          ).filter((h) => {
            const w = h.position[et[e.axis]] + (s ? 0 : h[Ut[e.axis]]), g = a[e.axis] * -1 + (s ? o[Ut[e.axis]]() : 0);
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
            nearestObjectId: ((l = d.at(s ? -1 : 0)) == null ? void 0 : l.id) ?? ""
          });
        }
      )
    ), t;
  }
}
class Rn {
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
class Dn {
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
class Nn {
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
class Vn {
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
class Hn {
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
const Un = T.debug("MapTypeUsed");
class zn {
  constructor(e, t) {
    this.mapFile = e, this.factories = t;
  }
  check(e, t) {
    return this.mapFile.currentMap(
      this.factories.guest.create((s) => {
        const i = Object.values(s.objects).some(
          (n) => n.type === e.name
        );
        Un("is type used", i), t.give(!i || "Тип карты использован");
      })
    ), this;
  }
}
class Ln {
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
class Qn {
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
        n.map((u) => i[u]).forEach((u) => {
          Object.values(u.types).forEach((p) => {
            o[p.name] = p;
          });
        }), e.give(Object.values(o));
      })
    ), e;
  }
}
const Qt = T.debug("ObjectsMatchedToQuery");
class Kn {
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
                  var u;
                  return a.name.toLowerCase().includes(i) || ((u = a.additionalName) == null ? void 0 : u.toLowerCase().includes(i)) || Object.values(a.additionalFields ?? {}).join(" ").toLowerCase().includes(i);
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
const Gn = {
  height: 3e3,
  width: 3e3
};
class Wn {
  value(e) {
    return e.give(Gn), e;
  }
}
const Kt = T.debug("StageMoveRestriction");
class Jn {
  constructor(e, t, s) {
    this.canvasDep = e, this.stageSize = t, this.factories = s;
  }
  position(e, t) {
    return this.canvasDep.canvas(
      this.factories.guest.create((s) => {
        this.stageSize.value(
          this.factories.guest.create((i) => {
            Kt("income position", e);
            const n = i.width - s.clientWidth, o = i.height - s.clientHeight, a = e.x * -1, u = e.y * -1;
            if (o < 0 || n < 0)
              return { x: 0, y: 0 };
            Kt("boundings", o, n, u, a), t.give({
              x: e.x > 0 ? 0 : a > n ? n * -1 : e.x,
              y: e.y > 0 ? 0 : u > o ? o * -1 : e.y
            });
          })
        );
      })
    ), t;
  }
}
const xe = T.debug("app:MapObjectsVisible");
class Zn {
  constructor(e, t, s, i) {
    $(this, "visibleObjectsCache", new ve());
    xe("constructor initialized");
    const n = i.chain.create();
    t.size(i.patron.create(n.receiveKey("size"))), e.position(i.patron.create(n.receiveKey("position"))), s.currentMap(i.patron.create(n.receiveKey("map"))), n.result(
      i.patron.create(
        i.guest.create(({ position: o, size: a, map: u }) => {
          const p = Object.values(u.objects);
          xe("objects come to result", p);
          const d = p.filter((l) => {
            const h = u.types[l.type] ?? {}, w = {
              width: l.width || h.width,
              height: l.height || h.height
            };
            return this.isInBounding(o, a, l.position, w);
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
    const n = e.x, o = e.x - t.width, a = e.y, u = e.y - t.height, [p, d] = s;
    return xe("bounding vars", n, o, a, u), xe("object position", s), n > -p - i.width && -p > o && a > -d - i.height && -d > u;
  }
}
const qn = (r, e) => {
  const t = r.matchAll(e);
  return Array.from(t).map((s) => s[1]);
}, Yn = (r, e) => r.reduce((t, s) => (t[s] = e[s] || s, t), {});
class Xn {
  constructor(e, t, s, i) {
    this.mapFile = t, this.mapObject = s, this.factories = i, e.objectId(this);
  }
  give(e) {
    return this.mapFile.currentMap(
      this.factories.guest.create((t) => {
        const s = t.objects[e];
        if (!s)
          return;
        const i = t.types[s.type], n = /\$\{([a-zA-Z1-9]+)\}/g, a = qn(i.svg, n).filter((u) => u !== "width" && u !== "height");
        s.additionalFields = Yn(a, s.additionalFields ?? {}), this.mapObject.give(s);
      })
    ), this;
  }
  introduction() {
    return "patron";
  }
}
class eo {
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
    }, a = o.x - n.x, u = o.y - n.y, p = Math.abs(u) > Math.abs(a);
    let d = +t.x, l = +t.y;
    const h = p && u >= 0, w = !p && a >= 0, g = p && u < 0, x = !p && a < 0, v = { x: 0, y: 0 };
    let F = 0, I = 0;
    h ? (d += Math.round(e.width / 2), v.x = d, v.y = (t.y + i.y + s.height) / 2, F = i.x > t.x ? 1 : -1) : x ? (l += Math.round(e.height / 2), d += +e.width, v.x = (t.x + e.width + i.x) / 2, v.y = l, I = i.y > t.y ? 1 : -1) : g ? (d += Math.round(e.width / 2), l += +e.height, v.x = d, v.y = (t.y + e.height + i.y) / 2, F = i.x > t.x ? 1 : -1) : w && (l += Math.round(e.height / 2), v.x = (t.x + i.x + s.width) / 2, v.y = l, I = i.y > t.y ? 1 : -1);
    const K = [d, l].join("-"), L = this.filledPoints.get(K) || 0;
    return this.filledPoints.set(K, L + 1), {
      point: { x: d, y: l },
      breakPoint: v,
      shift: {
        x: F * L * 10,
        y: I * L * 10
      }
    };
  }
}
var to = vs, so = dt, io = "Expected a function";
function ro(r, e, t) {
  var s = !0, i = !0;
  if (typeof r != "function")
    throw new TypeError(io);
  return so(t) && (s = "leading" in t ? !!t.leading : s, i = "trailing" in t ? !!t.trailing : i), to(r, e, {
    leading: s,
    maxWait: e,
    trailing: i
  });
}
var no = ro;
const oo = /* @__PURE__ */ lt(no), { Arrow: ao } = le, Ee = T.debug("MapObjectsArrows");
class co {
  constructor(e, t, s, i, n) {
    $(this, "previouslyRenderedArrows", /* @__PURE__ */ new Map());
    this.konvaLayer = e, this.mapFile = t, this.mapDep = s, this.arrowPath = i, this.factories = n, Ee("draw arrows on canvas");
    const o = this.factories.chain.create();
    this.konvaLayer.layer(this.factories.patron.create(o.receiveKey("layer"))), this.mapFile.currentMap(this.factories.patron.create(o.receiveKey("map"))), this.mapDep.objects(this.factories.patron.create(o.receiveKey("objects"))), o.result(
      this.factories.patron.create(
        this.factories.guest.create(
          oo(({ layer: a, map: u, objects: p }) => {
            const d = (l, h) => {
              const w = u.types[h.type];
              this.arrowPath.breakPoints(
                {
                  shapeGeometry: {
                    width: l.width,
                    height: l.height
                  },
                  shapePosition: {
                    x: l.position[0],
                    y: l.position[1]
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
                    width: l.width,
                    height: l.height
                  },
                  lookToPosition: {
                    x: l.position[0],
                    y: l.position[1]
                  }
                },
                this.factories.guest.create((g) => {
                  const x = g.join("-"), v = [l.id, h.id].join("-");
                  if (Ee("points", g), Ee(l, h), this.previouslyRenderedArrows.has(v)) {
                    const I = this.previouslyRenderedArrows.get(v);
                    I.arrow.show(), I.arrow.points(g);
                    return;
                  }
                  const F = new ao({
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
                    arrow: F,
                    arrowKey: x
                  }), a.add(F);
                })
              );
            };
            this.arrowPath.clear(), this.previouslyRenderedArrows.forEach((l) => l.arrow.hide()), p.forEach((l) => {
              l.arrows && (Ee("visible objects", p.length), l.arrows.forEach((h) => {
                const w = p.find((g) => g.id === h.id) || u.objects[h.id];
                w && d(l, w);
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
const { Arrow: lo } = le, tt = T.debug("NewArrow"), Gt = {
  width: 10,
  height: 10
};
class uo {
  constructor(e, t, s, i) {
    $(this, "cursorGuest");
    $(this, "arrowCache");
    this.konvaLayer = e, this.cursorPosition = t, this.arrowPath = s, this.factories = i, this.cursorGuest = this.factories.sourceEmpty.create(), this.arrowCache = this.factories.sourceEmpty.create();
  }
  /**
   * Создать новую стрелку для объекта
   */
  forObject(e) {
    tt("start watch cursor"), this.cursorGuest.value(
      this.factories.guest.create((i) => {
        jt(i);
      })
    );
    let t = null;
    const s = this.factories.patron.create(
      this.factories.guest.create((i) => {
        tt("cursor moves"), this.konvaLayer.layer(
          this.factories.guest.create((n) => {
            tt("cursor moves in layer"), this.arrowPath.breakPoints(
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
                t = new lo({
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
const $e = T.debug("MapObjectBackground"), ho = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD//gATQ3JlYXRlZCB3aXRoIEdJTVD/4gKwSUNDX1BST0ZJTEUAAQEAAAKgbGNtcwQwAABtbnRyUkdCIFhZWiAH6AAMAAQADQAqAAthY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1kZXNjAAABIAAAAEBjcHJ0AAABYAAAADZ3dHB0AAABmAAAABRjaGFkAAABrAAAACxyWFlaAAAB2AAAABRiWFlaAAAB7AAAABRnWFlaAAACAAAAABRyVFJDAAACFAAAACBnVFJDAAACFAAAACBiVFJDAAACFAAAACBjaHJtAAACNAAAACRkbW5kAAACWAAAACRkbWRkAAACfAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACQAAAAcAEcASQBNAFAAIABiAHUAaQBsAHQALQBpAG4AIABzAFIARwBCbWx1YwAAAAAAAAABAAAADGVuVVMAAAAaAAAAHABQAHUAYgBsAGkAYwAgAEQAbwBtAGEAaQBuAABYWVogAAAAAAAA9tYAAQAAAADTLXNmMzIAAAAAAAEMQgAABd7///MlAAAHkwAA/ZD///uh///9ogAAA9wAAMBuWFlaIAAAAAAAAG+gAAA49QAAA5BYWVogAAAAAAAAJJ8AAA+EAAC2xFhZWiAAAAAAAABilwAAt4cAABjZcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltjaHJtAAAAAAADAAAAAKPXAABUfAAATM0AAJmaAAAmZwAAD1xtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAEcASQBNAFBtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEL/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAAeAB4DAREAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAwUEAAj/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAH1SCMTDaCMTiuCMTDgxDGf/8QAHhAAAgIBBQEAAAAAAAAAAAAAAAMBAgQFExUyMxL/2gAIAQEAAQUCG9TUPHdga2PndgzrxZQ3qah48gsvnUtHILMrKq5f/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAwEBPwEH/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAgEBPwEH/8QAHhAAAgIBBQEAAAAAAAAAAAAAAAECMXIQQUKSsVH/2gAIAQEABj8CFkvdFkVLqzla4v6VLqxXe60WS90WRUipWipCSTvc/8QAIxAAAgADCAMAAAAAAAAAAAAAAAEQUfAhMUGhscHR8RFhcf/aAAgBAQABPyErMkMi0ZW2wylmzHorbYSSX3Vg5wrMkMi0Z0a5FVK8Llg05nRrkRmteVg//9oADAMBAAIAAwAAABCCQQSCSST/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAEDAQE/EAf/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAECAQE/EAf/xAAeEAEAAQQCAwAAAAAAAAAAAAABIRARIDEAQVFxkf/aAAgBAQABPxDEMgTA4U0lpO6EwKiFh/YAyDIEAZSTdCnwUQAma0AtZOl88//Z";
class po {
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
            $e("grid example", n), i.src = ho, i.onload = () => {
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
const mo = T.debug("Breadcrumbs");
class fo {
  constructor(e, t, s) {
    this.parentNames = e, this.mapFile = t, this.factories = s;
  }
  list(e) {
    const t = this.factories.chain.create();
    return this.parentNames.names(this.factories.guestCast.create(e, t.receiveKey("names"))), this.mapFile.mapFile(this.factories.guestCast.create(e, t.receiveKey("mapFile"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ names: s, mapFile: i }) => {
        mo("map id", s, i), e.give(
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
const Wt = T.debug("CursorWithObjects");
class go {
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
          const a = o.position[0], u = o.position[0] + o.width || 100, p = o.position[1], d = o.position[1] + o.height || 100;
          return s.x >= a && s.x <= u && s.y >= p && s.y <= d;
        });
        n ? (Wt("crossed with", n), e.give({
          x: n.position[0] + n.width / 2,
          y: n.position[1] + n.height / 2
        })) : (Wt("cursor pos", s), e.give(s));
      })
    ), this;
  }
}
const Jt = T.debug("Drawer");
class vo {
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
class Ao {
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
class bo {
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
class yo {
  constructor(e, t, s, i) {
    $(this, "theSize");
    $(this, "thePoints");
    $(this, "viewportSizeCache");
    this.map = e, this.layer = t, this.stageSize = s, this.factories = i, this.theSize = i.sourceEmpty.create(), this.thePoints = i.sourceEmpty.create(), this.viewportSizeCache = i.sourceEmpty.create();
    const n = i.chain.create();
    e.objects(i.patron.create(n.receiveKey("objects"))), t.layer(i.patron.create(n.receiveKey("layer"))), s.value(i.patron.create(n.receiveKey("size"))), n.result(
      i.patron.create(
        i.guest.create(({ layer: o, size: a, objects: u }) => {
          const p = qt / a.width, d = {
            width: Math.round(o.width() * p),
            height: Math.round(o.height() * p)
          };
          this.viewportSizeCache.give(d);
          const l = {
            width: Math.round(a.width * p),
            height: Math.round(a.height * p)
          };
          this.theSize.give(l);
          const h = u.map((w) => ({
            id: w.id,
            x: Math.round(w.position[0] * p),
            y: Math.round(w.position[1] * p),
            width: Math.round(w.width * p),
            height: Math.round(w.height * p)
          }));
          Zt("minimap points", h), this.thePoints.give(h);
        })
      )
    );
  }
  viewportPosition(e) {
    const t = this.factories.chain.create();
    return this.stageSize.value(this.factories.guestCast.create(e, t.receiveKey("size"))), this.layer.position(this.factories.guestCast.create(e, t.receiveKey("position"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ size: s, position: i }) => {
        const n = qt / s.width, o = {
          x: i.x * n * -1,
          y: i.y * n * -1
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
const Yt = T.debug("Modal");
class wo {
  constructor(e, t) {
    $(this, "modalNameCache");
    this.keyboard = e, this.factories = t, Yt("modal created"), this.modalNameCache = t.cache.create(""), this.keyboard.pressed(
      this.factories.patron.create(
        this.factories.guest.create((s) => {
          Yt("new key in modal", s), s === "Escape" && this.give("");
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
class Co {
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
class _o {
  constructor(e, t, s, i) {
    $(this, "innerReceive");
    this.mapFile = t, this.map = s, this.factories = i, e.objects(i.patron.create(this)), this.innerReceive = we((n) => {
      this.mapFile.currentMap(
        this.factories.guest.create((o) => {
          ke("objects to fix", n);
          const a = document.querySelectorAll(".objects-container .rendered-object"), u = o.objects;
          let p = !1;
          a.forEach((d) => {
            const l = d.getAttribute("data-object-id");
            if (ke("i see id", l), !l)
              return;
            const h = u[l];
            if (h && (ke("dom object geometry", d.clientWidth, d.clientHeight), ke("saved object geometry", h.width, h.height), (h.width !== d.clientWidth || h.height !== d.clientHeight) && (p = !0, ke("update object geometry"), h.width = d.clientWidth, h.height = d.clientHeight), !h.width || !h.height)) {
              const w = o.types[h.type];
              h.width = w.width, h.height = w.height;
            }
          }), p && this.map.give({
            ...o,
            objects: u
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
class xo {
  constructor(e, t, s, i, n, o, a, u, p) {
    $(this, "previouslyRenderedRects", /* @__PURE__ */ new Map());
    this.konvaLayer = e, this.mapFile = t, this.mapObject = s, this.mapObjectCurrent = n, this.mapObjectForRendering = o, this.objectPosition = a, this.settings = u, this.factories = p, i.objects(this);
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
                const u = n.types[a.type], p = +a.width || +u.width || 100, d = +a.height || +u.height || 100;
                if (this.previouslyRenderedRects.has(a)) {
                  const h = this.previouslyRenderedRects.get(a);
                  h.width(p), h.height(d), h.x(+a.position[0]), h.y(+a.position[1]), h.show();
                  return;
                }
                Fe("rect object", a, u);
                const l = new le.Rect({
                  x: +a.position[0],
                  y: +a.position[1],
                  width: p,
                  height: d,
                  name: a.id,
                  draggable: !o.readonly,
                  objectId: a.id,
                  zIndex: 3
                });
                this.previouslyRenderedRects.set(a, l), t.add(l), l.on("mouseenter", () => {
                  t.getStage().container().style.cursor = "pointer";
                }), l.on("mouseleave", () => {
                  t.getStage().container().style.cursor = "default";
                }), l.on("dragend", () => {
                  Fe("drag ended"), this.objectPosition.position(
                    a,
                    {
                      x: l.x(),
                      y: l.y()
                    },
                    this.factories.guest.create((h) => {
                      this.mapObject.give({
                        ...a,
                        position: [h.x, h.y]
                      });
                    })
                  );
                }), l.on("dragmove", () => {
                  Fe("dragmove works", l.x(), l.y()), t.getStage().container().style.cursor = "move", this.objectPosition.position(
                    a,
                    {
                      x: l.x(),
                      y: l.y()
                    },
                    this.factories.guest.create((h) => {
                      this.mapObjectForRendering.give({
                        ...a,
                        position: [h.x, h.y]
                      });
                    })
                  );
                }), l.on("click", () => {
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
class $o {
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
const ko = T.debug("StagePosition");
class Fo {
  constructor(e) {
    this.stageMove = e;
  }
  give(e) {
    return ko("received position", e), this.stageMove.move(e), this;
  }
}
class Mo {
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
const Xt = T.debug("Zindex");
class To {
  constructor(e) {
    $(this, "fnsCache");
    this.factories = e, this.fnsCache = e.cache.create([]), this.fnsCache.value(
      e.patron.create(
        e.guest.create(
          we((t) => {
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
const es = T.debug("app:BrowserCanvas");
class So {
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
const jo = T.debug("Cursor");
class Oo {
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
      jo("move cursor fired", n), this.cursorPool.give(n);
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
class Bo {
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
const Re = T.debug("ControlCombo");
class Io {
  constructor(e, t) {
    this.keyboard = e, this.factories = t;
  }
  /**
   * Случилась комбинация ctrl + keyCode
   */
  happened(e, t) {
    this.keyboard.event(
      this.factories.guestInTheMiddle.create(t, (s) => {
        Re("combo happened look for key", e, "received", s.code), s.ctrlKey && s.code === e && s.type === "keydown" && (s.preventDefault(), t.give(s));
      })
    );
  }
  /**
   * Случилась комбинация ctrl + keyCode с условием comboCondition
   */
  happenedConditional(e, t, s) {
    Re("combo control happened registration"), this.keyboard.event(
      this.factories.guestInTheMiddle.create(s, (i) => {
        Re("keyboard event come"), t.value(
          this.factories.guest.create((n) => {
            Re("combo happened look for key", e, "received", i.code), n && i.ctrlKey && i.code === e && i.type === "keydown" && (i.preventDefault(), s.give(i));
          })
        );
      })
    );
  }
}
const Me = T.debug("Keyboard");
class Po {
  constructor(e) {
    $(this, "pressedPool");
    $(this, "combinationsPool");
    Me("keyboard created"), this.pressedPool = e.pool.create(this), this.combinationsPool = e.pool.create(this), window == null || window.addEventListener("keyup", (t) => {
      Me("keyboard pressed", t.key), this.pressedPool.give(t.key);
    }), Rs({
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
const ts = T.debug("app:konva:KonvaLayer");
class Eo {
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
          ts("create new konva stage");
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
            ts("new position", d), this.positionCache.give(d);
          }), o.on("dragmove", (p) => {
            if (!(p.target instanceof le.Stage))
              return;
            const d = {
              x: o.x(),
              y: o.y()
            };
            this.positionCache.give(d);
          });
          const u = this.factories.guestSync.create({
            x: 0,
            y: 0
          });
          o.dragBoundFunc((p) => (s.position(p, u), u.value()));
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
class Ro {
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
const Do = T.debug("position");
class No {
  constructor(e, t, s, i, n) {
    this.layer = e, this.canvas = t, this.stageSize = s, this.stageMoveRestriction = i, this.factories = n;
  }
  move(e) {
    Do("move stage to new point", e.position), this.stageSize.value(
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
const _ = J(), Le = new Po(_), As = new Se({
  readonly: !1,
  presets: {}
}), Vo = new wo(Le, _), bs = new vo(Le, _), Qe = new Co(_), ce = new mr(_), ys = _.sourceEmpty.create(), V = new Ar(ys, ce, _), Ho = new fr(V), Uo = new ni(Ho), ht = new yr(V, ce, _), pt = new hs(ht, ce, _), zo = new ps(pt, ht, _), X = new hs(V, ce, _), Lo = new ct((r) => {
  V.currentMap(new Ve(r));
}), Ke = new wr(bs, _), Qo = new Dn(_), Ko = new Rn(V, X, _), pe = new So(_), me = new Wn(), ws = new Jn(pe, me, _), ee = new Eo(pe, me, ws, _), Go = new To(_), Wo = new po(ee, V, Go, _), Ce = new ps(X, V, _), Jo = new kr(
  X,
  V,
  [new ut(Qe, new Cr(V, _), _)],
  _
), Zo = new Ro(ee, _), qo = new _r(X, Ce, pe, Zo, _), Cs = new zn(V, _), _s = new Hn(
  X,
  V,
  [
    new ut(
      Qe,
      new Ln(Cs, _),
      _
    )
  ],
  _
), Yo = new Vn(
  X,
  V,
  [new ut(Qe, Cs, _)],
  _
), Xo = new Nn(_s), Ge = new Zn(ee, pe, ht, _), ea = new _o(
  Ge,
  V,
  X,
  _
), ta = new xo(
  ee,
  V,
  Ce,
  Ge,
  Ke,
  zo,
  new In(new Bn(me, _), _),
  As,
  _
), sa = new Oo(ee, _), ia = new go(Ge, sa, _), xs = new eo(), $s = new uo(ee, ia, xs, _), ra = new co(ee, V, pt, xs, _), na = new yo(pt, ee, me, _), oa = new Mr(
  Ke,
  X,
  Ce,
  $s,
  _
), aa = new $o(V, pe, ee, _), ca = new Xn(
  Ke,
  V,
  Ce,
  _
), la = new vr(V, ce, _), ua = new $r(Ce), da = new Ao(), mt = new xr(ce, _), ha = new fo(mt, V, _), pa = new Sn(ce, _), ma = new Qn(mt, V, _), fa = new Io(Le, _), ga = new bo(V, _), ks = new No(ee, pe, me, ws, _), va = new Fo(ks), Aa = new Mo(ks, _), ba = new Kn(X, _), ya = new gr(V, X, ce, _), wa = new En(X, me, ee, _), Fs = new ve();
new Bo(Fs);
const Ca = {
  mapCurrentID: ce,
  mapFile: V,
  mapCurrent: X,
  mapCurrentSource: Lo,
  mapRemoved: la,
  mapSettings: Ko,
  mapObject: Ce,
  mapObjectRemoved: Jo,
  mapType: _s,
  mapTypeRemoved: Yo,
  mapTypeNew: Xo,
  mapObjectsVisible: Ge,
  mapObjectCurrent: Ke,
  mapObjectNew: qo,
  mapObjectsLink: oa,
  mapTypeCurrent: Qo,
  mapRects: ta,
  mapBackground: Wo,
  mapObjectArrows: ra,
  mapObjectsGeometryFix: ea,
  canvas: pe,
  miniMap: na,
  notification: Qe,
  modal: Vo,
  drawer: bs,
  konvaLayer: ee,
  resizing: aa,
  objectAdditionalFieldsFix: ca,
  mapObjectRelationRemoved: ua,
  fps: da,
  breadcrumbs: ha,
  mapObjectUrl: pa,
  keyboard: Le,
  parentNames: mt,
  parentTypes: ma,
  controlCombo: fa,
  menu: ga,
  stagePosition: va,
  stagePositionByObjectId: Aa,
  objectsMatchedToQuery: ba,
  stageSize: me,
  mapHistory: ya,
  fileContent: ys,
  newArrow: $s,
  objectsOutsideScreen: wa,
  settings: As,
  documentTitle: Uo,
  sidebarDraggable: Fs
}, H = () => Ca;
class j {
  constructor(e = void 0) {
    $(this, "innerRef");
    this.innerRef = ae(e);
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
const _a = { key: 0 }, xa = { class: "flex-grow overflow-y-auto" }, $a = {
  key: 1,
  class: "flex gap-1"
}, ft = /* @__PURE__ */ R({
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
    const t = r, s = e, i = at(() => ["e2e-drawer-back absolute z-10 top-0 left-0 w-full h-full bg-black/50"]), n = {
      ltr: "top-0 left-0 w-[50%] max-w-[900px] ",
      rtl: "top-0 right-0 w-[50%] max-w-[900px] ",
      ttb: "top-0 right-0 left-0",
      btt: "top-auto h-[900px] max-h-[50%] bottom-0 right-0 left-0"
    }, { drawer: o } = H(), a = () => {
      o.give(""), s("close");
    }, u = o.isOpenedByName(t.name, new j()).ref();
    return (p, d) => (m(), z(rs, { name: "fade" }, {
      default: y(() => [
        c(u) ? (m(), A("div", {
          key: 0,
          class: ne(c(i)),
          onClick: a
        }, [
          b("div", {
            class: ne(["absolute bg-white h-full p-3 flex flex-col overflow-hidden", n[r.direction]]),
            onClick: d[0] || (d[0] = Ae(() => {
            }, ["stop"]))
          }, [
            p.$slots.header ? (m(), A("div", _a, [
              Y(p.$slots, "header", { class: "BaseDrawer-Header" })
            ])) : O("", !0),
            b("div", xa, [
              Y(p.$slots, "default")
            ]),
            p.$slots.footer ? (m(), A("div", $a, [
              Y(p.$slots, "footer")
            ])) : O("", !0)
          ], 2)
        ], 2)) : O("", !0)
      ]),
      _: 3
    }));
  }
}), W = /* @__PURE__ */ R({
  __name: "BaseIcon",
  props: {
    icon: {
      type: String
    }
  },
  setup(r) {
    const e = {
      "fa-bars": Vs,
      "fa-text-width": Hs,
      "fa-search": Us,
      "fa-history": zs,
      "fa-plus-square": Ls,
      "fa-cog": Qs,
      "fa-file-text": Ks,
      "fa-rotate-left": Gs,
      "fa-rotate-right": Ws,
      "fa-map": Js,
      "fa-close": Zs,
      "fa-arrow-left": qs,
      "fa-arrow-right": Ys,
      "fa-arrow-down": Xs,
      "fa-arrow-up": ei
    };
    return (t, s) => (m(), z(c(Ns), {
      icon: e[r.icon]
    }, null, 8, ["icon"]));
  }
}), ka = /* @__PURE__ */ b("h2", { class: "text-lg font-bold" }, " Карты в файле ", -1), Fa = ["onClick"], Ma = /* @__PURE__ */ R({
  __name: "AppFileMaps",
  setup(r) {
    const {
      mapFile: e,
      mapCurrentID: t,
      drawer: s,
      mapRemoved: i
    } = H(), n = e.mapFile(new j()).ref(), o = t.id(new j()).ref(), a = (u) => {
      confirm("Вы уверены?") && i.give(u);
    };
    return (u, p) => (m(), z(ft, {
      direction: "rtl",
      name: "fileMaps"
    }, {
      header: y(() => [
        ka
      ]),
      default: y(() => [
        b("div", null, [
          (m(!0), A(U, null, Q(c(n), (d, l) => (m(), A("div", {
            key: l,
            class: "flex items-center gap-2"
          }, [
            b("a", {
              href: "#",
              class: ne({ "font-bold": c(o) === l }),
              onClick: Ae((h) => {
                c(t).give(l), c(s).give("");
              }, ["prevent"])
            }, C(d.settings.title), 11, Fa),
            f(W, {
              onClick: (h) => a(l),
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
}), Ta = { class: "AppMenuObject" }, Sa = {
  key: 0,
  class: "AppMenuObject-Empty"
}, ja = {
  key: 1,
  class: "flex flex-col gap-1"
}, Oa = ["onClick"], Ba = ["innerHTML"], Ia = /* @__PURE__ */ R({
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
    ), (u, p) => (m(), z(ft, {
      direction: "rtl",
      name: "menu"
    }, {
      default: y(() => [
        b("div", Ta, [
          c(a).length ? (m(), A("div", ja, [
            (m(!0), A(U, null, Q(c(a), (d) => (m(), A("a", {
              key: d.id,
              class: "AppMenuObject-Item",
              href: "#",
              onClick: Ae((l) => {
                c(i).give(d), c(t).give("");
              }, ["prevent"])
            }, [
              b("span", {
                innerHTML: d.additionalName ? d.additionalName : d.name
              }, null, 8, Ba)
            ], 8, Oa))), 128))
          ])) : (m(), A("div", Sa, C(u.$t("appMenuObject.noItems")), 1))
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
    return t.push(""), (s, i) => (m(), A("button", {
      type: "button",
      class: ne(t)
    }, [
      Y(s.$slots, "default")
    ]));
  }
}), Pa = {
  key: 0,
  title: "Назад",
  class: "absolute text-white left-0 top-0 -ml-5 flex justify-center items-center bg-primary/70 hover:bg-primary-second/70 cursor-pointer w-5"
}, Ea = {
  key: 1,
  class: "BaseModal-Header"
}, Ra = { class: "overflow-y-auto flex-grow" }, Da = {
  key: 2,
  class: "BaseModal-Footer"
}, fe = /* @__PURE__ */ R({
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
    return (o, a) => (m(), z(rs, { name: "fade" }, {
      default: y(() => [
        c(s) ? (m(), A("div", {
          key: 0,
          class: "absolute rounded-main overflow-y-auto flex justify-center items-center top-0 left-0 bg-black/10 z-20 h-full w-full",
          onClick: n
        }, [
          b("div", {
            class: "w-full relative flex flex-col max-w-[800px] max-h-[90%] bg-white p-3",
            onClick: a[0] || (a[0] = Ae(() => {
            }, ["stop"]))
          }, [
            i.length > 1 ? (m(), A("div", Pa, " < ")) : O("", !0),
            b("div", {
              title: "Закрыть",
              class: "e2e-modal-close absolute text-white right-0 top-0 -mr-5 flex justify-center items-center bg-danger/70 hover:bg-danger-second/70 cursor-pointer w-5",
              onClick: n
            }, " × "),
            o.$slots.header ? (m(), A("div", Ea, [
              Y(o.$slots, "header")
            ])) : O("", !0),
            b("div", Ra, [
              Y(o.$slots, "default")
            ]),
            o.$slots.footer ? (m(), A("div", Da, [
              Y(o.$slots, "footer")
            ])) : O("", !0)
          ])
        ])) : O("", !0)
      ]),
      _: 3
    }));
  }
}), Na = { class: "AppPresets" }, Va = /* @__PURE__ */ b("div", { class: "text-md font-bold mb-2" }, "Общие", -1), Ha = { class: "flex flex-col gap-2" }, Ua = { class: "text-md font-bold mb-1" }, za = { class: "flex gap-2 flex-wrap items-end" }, La = { class: "AppTypesParent-ItemTitle" }, Qa = ["innerHTML"], Ka = /* @__PURE__ */ R({
  __name: "AppPresets",
  setup(r) {
    const {
      svgMapTypeImage: e
    } = J(), { mapType: t, settings: s } = H(), i = new j();
    s.value(i);
    const n = at(
      () => Object.fromEntries(
        Object.entries(i.value.presets).map(
          ([o, a]) => [
            o,
            a.map(
              (u) => ({
                preset: u,
                image: e.create(u).markup()
              })
            )
          ]
        )
      )
    );
    return (o, a) => (m(), z(fe, { name: "presets" }, {
      default: y(() => [
        b("div", Na, [
          Va,
          b("div", Ha, [
            (m(!0), A(U, null, Q(c(n), (u, p) => (m(), A("div", { key: p }, [
              b("h3", Ua, C(p), 1),
              b("div", za, [
                (m(!0), A(U, null, Q(u, (d) => (m(), A("div", {
                  key: d.preset.name,
                  class: "flex flex-col gap-2"
                }, [
                  b("div", La, C(d.preset.name), 1),
                  b("div", {
                    class: "AppTypesParent-ItemImage",
                    innerHTML: d.image,
                    style: re(`width:${d.preset.width}px;height:${d.preset.height}px`)
                  }, null, 12, Qa),
                  f(E, {
                    class: "AppTypesParent-ItemButton e2e-add-preset-type",
                    type: "success",
                    size: "sm",
                    onClick: (l) => c(t).give({ name: d.preset.name, type: d.preset })
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
}), ie = /* @__PURE__ */ R({
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
    const t = r, s = e, i = ae(null);
    ot(
      i,
      we(() => {
        t.autofocus && i.value.focus();
      }, 500)
    );
    const n = Ue(t, "modelValue", s);
    return (o, a) => He((m(), A("input", {
      ref_key: "input",
      ref: i,
      "onUpdate:modelValue": a[0] || (a[0] = (u) => be(n) ? n.value = u : null),
      class: "block rounded-main w-full p-2 border border-solid border-body-dark",
      type: "text"
    }, null, 512)), [
      [ns, c(n)]
    ]);
  }
});
class gt {
  constructor(e) {
    $(this, "pool", new ze(this));
    this.refSource = e, cs(
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
const Ga = { class: "AppSearch" }, Wa = {
  key: 0,
  class: "AppSearch-Items"
}, Ja = ["onClick"], Za = ["innerHTML"], qa = ["innerHTML"], Ya = ["innerHTML"], Xa = { key: 1 }, ec = { key: 2 }, tc = /* @__PURE__ */ R({
  __name: "AppSearch",
  setup(r) {
    const {
      objectsMatchedToQuery: e,
      controlCombo: t,
      modal: s,
      stagePosition: i
    } = H(), { guest: n, patron: o } = J(), a = Tt(), u = T.debug("app:AppSearch");
    s.isOpenedByName(
      "search",
      o.create(n.create((l) => {
        setTimeout(() => {
          l && a.value && (u("search is opened", l), a.value.$el.focus());
        }, 500);
      }))
    );
    const p = Tt(""), d = e.objects(
      new gt(p),
      new j([])
    ).ref();
    return t.happened(
      "KeyF",
      o.create(n.create(() => {
        s.give("search");
      }))
    ), (l, h) => (m(), z(fe, { name: "search" }, {
      default: y(() => [
        b("div", Ga, [
          f(ie, {
            ref_key: "inputRef",
            ref: a,
            modelValue: c(p),
            "onUpdate:modelValue": h[0] || (h[0] = (w) => be(p) ? p.value = w : null),
            class: "mb-2 e2e-query-input",
            placeholder: l.$t("general.specifyQuery")
          }, null, 8, ["modelValue", "placeholder"]),
          c(d).length ? (m(), A("div", Wa, [
            (m(!0), A(U, null, Q(c(d), (w) => (m(), A("div", {
              key: w.name,
              class: "cursor-pointer",
              onClick: Ae((g) => {
                c(i).give(w), c(s).give("");
              }, ["prevent"])
            }, [
              b("b", {
                class: "AppSearch-ItemName",
                innerHTML: w.name
              }, null, 8, Za),
              w.additionalName ? (m(), A("b", {
                key: 0,
                class: "AppSearch-ItemName",
                innerHTML: w.additionalName
              }, null, 8, qa)) : O("", !0),
              w.additionalFields ? (m(), A("div", {
                key: 1,
                innerHTML: Object.values(w.additionalFields).join(" ")
              }, null, 8, Ya)) : O("", !0)
            ], 8, Ja))), 128))
          ])) : c(p) ? (m(), A("div", Xa, C(l.$t("general.noResults")), 1)) : (m(), A("div", ec, C(l.$t("general.resultsWillBeHere")), 1))
        ])
      ]),
      _: 1
    }));
  }
}), sc = { class: "AppTypes" }, ic = /* @__PURE__ */ b("div", { class: "text-md font-bold mb-2" }, "Родительские типы", -1), rc = { class: "flex gap-2 items-end" }, nc = { class: "AppTypesParent-ItemTitle" }, oc = ["innerHTML"], ac = /* @__PURE__ */ R({
  __name: "AppTypesParent",
  setup(r) {
    const { parentTypes: e, mapType: t } = H(), { svgMapTypeImage: s } = J(), i = e.types(new j()).ref(), n = at(() => {
      var o;
      return (o = i.value) == null ? void 0 : o.map((a) => ({
        type: a,
        image: s.create(a).markup()
      })).sort((a, u) => +(a.type.name >= u.type.name));
    });
    return (o, a) => (m(), z(fe, { name: "parentTypes" }, {
      default: y(() => [
        b("div", sc, [
          ic,
          b("div", rc, [
            (m(!0), A(U, null, Q(c(n), (u) => (m(), A("div", {
              key: u.type.name,
              class: "flex flex-col gap-2"
            }, [
              b("div", nc, C(u.type.name), 1),
              b("div", {
                class: "AppTypesParent-ItemImage",
                innerHTML: u.image,
                style: re(`width:${u.type.width}px;height:${u.type.height}px`)
              }, null, 12, oc),
              f(E, {
                class: "AppTypesParent-ItemButton e2e-add-preset-type",
                type: "success",
                size: "sm",
                onClick: (p) => c(t).give({ name: u.type.name, type: u.type })
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
class Ms {
  constructor(e, t = void 0) {
    $(this, "innerRef");
    this.executor = e, this.innerRef = ae(t);
  }
  ref() {
    return this.executor(this.innerRef), this.innerRef;
  }
}
const cc = { class: "flex gap-2" }, st = /* @__PURE__ */ R({
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
    const i = Ue(r, "modelValue", e);
    return (n, o) => (m(), A("label", cc, [
      He(b("input", {
        "onUpdate:modelValue": o[0] || (o[0] = (a) => be(i) ? i.value = a : null),
        type: "checkbox"
      }, null, 512), [
        [Os, c(i)]
      ]),
      n.$slots.default ? Y(n.$slots, "default", { key: 0 }) : (m(), A(U, { key: 1 }, [
        B(C(r.label), 1)
      ], 64))
    ]));
  }
}), We = (r, e) => {
  const t = r.__vccOpts || r;
  for (const [s, i] of e)
    t[s] = i;
  return t;
}, lc = {}, uc = { class: "text-sm font-bold" };
function dc(r, e) {
  return m(), A("div", uc, [
    Y(r.$slots, "default")
  ]);
}
const G = /* @__PURE__ */ We(lc, [["render", dc]]), hc = {}, pc = { class: "mb-2" };
function mc(r, e) {
  return m(), A("div", pc, [
    Y(r.$slots, "default")
  ]);
}
const q = /* @__PURE__ */ We(hc, [["render", mc]]), fc = { class: "rounded-main p-2 border border-solid border-body-dark" }, gc = { class: "flex gap-2 p-2 bg-white border border-solid border-body-dark rounded-main" }, De = /* @__PURE__ */ R({
  __name: "BaseEditor",
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(r, { emit: e }) {
    const t = r, s = e, i = ti({
      content: t.modelValue,
      extensions: [
        ri
      ],
      onUpdate: () => {
        i.value && s("update:modelValue", i.value.getHTML());
      }
    });
    return Bs(() => {
      var n;
      (n = i.value) == null || n.destroy();
    }), ot(() => t.modelValue, (n) => {
      !i.value || i.value.getHTML() === n || i.value.commands.setContent(n, !1);
    }), (n, o) => (m(), A("div", fc, [
      f(c(si), { editor: c(i) }, null, 8, ["editor"]),
      c(i) ? (m(), z(c(ii), {
        key: 0,
        editor: c(i),
        "tippy-options": { duration: 100 }
      }, {
        default: y(() => [
          b("div", gc, [
            b("button", {
              onClick: o[0] || (o[0] = (a) => c(i).chain().focus().toggleBold().run()),
              class: ne({ "font-bold": c(i).isActive("bold") })
            }, " bold ", 2),
            b("button", {
              onClick: o[1] || (o[1] = (a) => c(i).chain().focus().toggleItalic().run()),
              class: ne({ "font-bold": c(i).isActive("italic") })
            }, " italic ", 2),
            b("button", {
              onClick: o[2] || (o[2] = (a) => c(i).chain().focus().toggleStrike().run()),
              class: ne({ "font-bold": c(i).isActive("strike") })
            }, " strike ", 2)
          ])
        ]),
        _: 1
      }, 8, ["editor"])) : O("", !0)
    ]));
  }
}), vc = ["value"], Ac = /* @__PURE__ */ R({
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
    const t = r, i = Ue(t, "modelValue", e);
    return (n, o) => He((m(), A("select", {
      label: "select",
      "onUpdate:modelValue": o[0] || (o[0] = (a) => be(i) ? i.value = a : null),
      class: "block bg-white rounded-main w-full p-2 border border-solid border-body-dark"
    }, [
      (m(!0), A(U, null, Q(t.items, (a) => (m(), A("option", {
        key: a[t.optionId],
        value: a[t.optionId]
      }, C(a[t.optionLabel]), 9, vc))), 128))
    ], 512)), [
      [Is, c(i)]
    ]);
  }
}), bc = { class: "text-lg font-bold" }, yc = {
  key: 0,
  class: "flex gap-2 items-center"
}, wc = {
  key: 1,
  class: "flex gap-2 mt-2"
}, Cc = { key: 0 }, _c = { key: 1 }, xc = {
  key: 0,
  class: "flex flex-col gap-2"
}, $c = { class: "FormObject-Inner" }, kc = { class: "FormObject-Row" }, Fc = { class: "FormObject-Row" }, Mc = { class: "FormObject-Row" }, Tc = { class: "my-2" }, Sc = { class: "FormObject-Title" }, jc = { class: "FormObject-Row" }, Oc = { class: "FormObject-Title" }, Bc = { class: "FormObject-Row" }, Ic = {
  key: 0,
  class: "FormObject-ArrowName"
}, Pc = { class: "py-3 flex gap-1" }, Ec = /* @__PURE__ */ R({
  __name: "FormObject",
  setup(r) {
    const e = us("FormObject"), {
      mapObjectCurrent: t,
      mapFile: s,
      mapObject: i,
      mapCurrent: n,
      drawer: o,
      mapObjectRemoved: a,
      mapObjectRelationRemoved: u,
      mapObjectUrl: p,
      controlCombo: d
    } = H(), {
      patron: l,
      chain: h,
      guest: w
    } = J(), g = new Ms(() => {
      const S = h.create();
      t.objectId(l.create(S.receiveKey("objectId"))), t.objectId(l.create((k) => {
        e("sep obj", k);
      })), s.currentMap(l.create(S.receiveKey("map"))), s.currentMap(l.create((k) => {
        e("sep map", k);
      })), S.result(l.create(
        w.create(({ map: k, objectId: M }) => {
          e("object opened", M), g.value = k.objects[M];
        })
      ));
    }).ref(), x = n.types(new j()).ref(), v = s.currentMap(new j()).ref(), F = new gt(g), I = p.url(F, new j()).ref(), K = () => {
      t.give(""), o.give("");
    }, L = () => {
      a.give(g.value), K();
    }, te = () => {
      i.give({
        ...g.value,
        outlink: g.value.outlink || I.value
      }), K();
    }, P = (S) => {
      u.give({
        index: S,
        object: g.value
      });
    };
    return d.happenedConditional(
      "KeyS",
      o.openedByName("object"),
      l.create(w.create(te))
    ), (S, k) => (m(), z(ft, {
      name: "object",
      onClose: K
    }, {
      header: y(() => [
        b("h2", bc, C(S.$t("general.mapObject")), 1),
        c(g) ? (m(), A("small", yc, [
          b("span", null, " ID #" + C(c(g).id), 1)
        ])) : O("", !0),
        c(g) ? (m(), A("div", wc, [
          c(g).createTimestamp ? (m(), A("div", Cc, " Создан: " + C(new Date(c(g).createTimestamp).toLocaleString()), 1)) : O("", !0),
          c(g).changeTimestamp ? (m(), A("div", _c, " Изменен: " + C(new Date(c(g).changeTimestamp).toLocaleString()), 1)) : O("", !0)
        ])) : O("", !0)
      ]),
      footer: y(() => [
        b("div", Pc, [
          f(E, {
            type: "success",
            onClick: te
          }, {
            default: y(() => [
              B(C(S.$t("general.save")), 1)
            ]),
            _: 1
          }),
          f(E, {
            type: "danger",
            onClick: L
          }, {
            default: y(() => [
              B(C(S.$t("general.delete")), 1)
            ]),
            _: 1
          }),
          f(E, { onClick: K }, {
            default: y(() => [
              B(C(S.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: y(() => [
        c(g) ? (m(), A("div", xc, [
          b("div", $c, [
            b("div", kc, [
              f(st, {
                modelValue: c(g).linked,
                "onUpdate:modelValue": k[0] || (k[0] = (M) => c(g).linked = M),
                label: S.$t("general.nameAsLink")
              }, null, 8, ["modelValue", "label"])
            ]),
            c(g).linked ? (m(), A(U, { key: 0 }, [
              f(G, null, {
                default: y(() => [
                  B(C(S.$t("general.outerLink")), 1)
                ]),
                _: 1
              }),
              b("div", Fc, [
                f(ie, {
                  "model-value": c(g).outlink || c(I),
                  "onUpdate:modelValue": k[1] || (k[1] = (M) => c(g).outlink = M)
                }, null, 8, ["model-value"])
              ]),
              b("div", Mc, [
                f(st, {
                  modelValue: c(g).targetBlank,
                  "onUpdate:modelValue": k[2] || (k[2] = (M) => c(g).targetBlank = M),
                  label: S.$t("general.inNewTab")
                }, null, 8, ["modelValue", "label"])
              ])
            ], 64)) : O("", !0),
            (m(!0), A(U, null, Q(c(g).additionalFields, (M, Z) => (m(), z(q, {
              class: "mb-2",
              key: Z
            }, {
              default: y(() => [
                f(G, { class: "mb-1" }, {
                  default: y(() => [
                    B(C(Z), 1)
                  ]),
                  _: 2
                }, 1024),
                f(De, {
                  modelValue: c(g).additionalFields[Z],
                  "onUpdate:modelValue": (oe) => c(g).additionalFields[Z] = oe
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              _: 2
            }, 1024))), 128)),
            f(q, null, {
              default: y(() => [
                f(G, null, {
                  default: y(() => [
                    B(C(S.$t("general.topName")), 1)
                  ]),
                  _: 1
                }),
                f(De, {
                  modelValue: c(g).additionalName,
                  "onUpdate:modelValue": k[3] || (k[3] = (M) => c(g).additionalName = M)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            f(q, null, {
              default: y(() => [
                f(G, null, {
                  default: y(() => [
                    B(C(S.$t("general.bottomName")), 1)
                  ]),
                  _: 1
                }),
                f(De, {
                  modelValue: c(g).name,
                  "onUpdate:modelValue": k[4] || (k[4] = (M) => c(g).name = M)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            f(q, null, {
              default: y(() => [
                f(G, null, {
                  default: y(() => [
                    B(C(S.$t("general.description")), 1)
                  ]),
                  _: 1
                }),
                f(De, {
                  modelValue: c(g).description,
                  "onUpdate:modelValue": k[5] || (k[5] = (M) => c(g).description = M)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            f(q, null, {
              default: y(() => [
                f(G, null, {
                  default: y(() => [
                    B(" Z-Index ")
                  ]),
                  _: 1
                }),
                f(ie, {
                  modelValue: c(g).zindex,
                  "onUpdate:modelValue": k[6] || (k[6] = (M) => c(g).zindex = M),
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            f(q, null, {
              default: y(() => [
                f(G, null, {
                  default: y(() => [
                    B(" Width ")
                  ]),
                  _: 1
                }),
                f(ie, {
                  modelValue: c(g).width,
                  "onUpdate:modelValue": k[7] || (k[7] = (M) => c(g).width = M),
                  step: "20",
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            f(q, null, {
              default: y(() => [
                f(G, null, {
                  default: y(() => [
                    B(" Height ")
                  ]),
                  _: 1
                }),
                f(ie, {
                  modelValue: c(g).height,
                  "onUpdate:modelValue": k[8] || (k[8] = (M) => c(g).height = M),
                  step: "20",
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            f(q, null, {
              default: y(() => [
                f(G, null, {
                  default: y(() => [
                    B(C(S.$t("general.objectType")), 1)
                  ]),
                  _: 1
                }),
                f(Ac, {
                  modelValue: c(g).type,
                  "onUpdate:modelValue": k[9] || (k[9] = (M) => c(g).type = M),
                  items: c(x),
                  "option-id": "id",
                  "option-label": "name"
                }, null, 8, ["modelValue", "items"])
              ]),
              _: 1
            }),
            b("div", Tc, [
              f(st, {
                modelValue: c(g).inMenu,
                "onUpdate:modelValue": k[10] || (k[10] = (M) => c(g).inMenu = M),
                label: S.$t("general.useInMenu")
              }, null, 8, ["modelValue", "label"])
            ]),
            c(g).inMenu ? (m(), A(U, { key: 1 }, [
              b("div", Sc, C(S.$t("general.menuOrder")), 1),
              b("div", jc, [
                f(ie, {
                  modelValue: c(g).menuOrder,
                  "onUpdate:modelValue": k[11] || (k[11] = (M) => c(g).menuOrder = M),
                  type: "number"
                }, null, 8, ["modelValue"])
              ])
            ], 64)) : O("", !0),
            c(g).arrows && c(g).arrows.length ? (m(), A(U, { key: 2 }, [
              b("div", Oc, C(S.$t("general.relations")), 1),
              b("div", Bc, [
                (m(!0), A(U, null, Q(c(g).arrows, (M, Z) => {
                  var oe;
                  return m(), A("div", {
                    key: M.id,
                    class: "FormObject-Arrow"
                  }, [
                    (oe = c(v)) != null && oe.objects[M.id] ? (m(), A("span", Ic, " #" + C(Z + 1) + " " + C(c(v).objects[M.id].name), 1)) : O("", !0),
                    f(E, {
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
}), Rc = { class: "BaseTextarea" }, Dc = ["v-bind"], Ts = /* @__PURE__ */ R({
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
    const i = Ue(r, "modelValue", e);
    return (n, o) => (m(), A("div", Rc, [
      He(b("textarea", {
        ref: "textarea",
        "v-bind": n.$attrs,
        "onUpdate:modelValue": o[0] || (o[0] = (a) => be(i) ? i.value = a : null),
        class: "rounded-main block w-full p-2 border min-h-[200px] border-solid border-body-dark"
      }, null, 8, Dc), [
        [ns, c(i)]
      ])
    ]));
  }
}), Nc = { class: "text-lg font-bold" }, Vc = {
  key: 0,
  class: "flex flex-col"
}, Hc = { class: "flex justify-end pt-4 gap-2" }, Uc = /* @__PURE__ */ R({
  __name: "FormType",
  setup(r) {
    const {
      mapTypeCurrent: e,
      mapFile: t,
      mapType: s,
      modal: i,
      controlCombo: n
    } = H(), { patron: o, chain: a, guest: u } = J();
    e.typeId(
      o.create(u.create((g) => {
        g && i.give("type");
      }))
    );
    const p = ae(""), d = a.create(), l = new Ms(() => {
      e.typeId(o.create(d.receiveKey("typeId"))), t.currentMap(o.create(d.receiveKey("map"))), d.result(o.create(
        u.create(({ map: g, typeId: x }) => {
          var v;
          l.value = g.types[x], p.value = (v = l.value) == null ? void 0 : v.name;
        })
      ));
    }).ref(), h = () => {
      e.give(""), i.give(""), d.receiveKey("typeId").give("");
    }, w = () => {
      s.give({
        name: p.value,
        type: l.value
      }), h();
    };
    return n.happenedConditional(
      "KeyS",
      i.openedByName("type"),
      o.create(u.create(w))
    ), (g, x) => (m(), z(fe, { name: "type" }, {
      header: y(() => [
        b("h2", Nc, C(g.$t("general.mapType")), 1)
      ]),
      footer: y(() => [
        b("div", Hc, [
          f(E, {
            type: "success",
            onClick: w
          }, {
            default: y(() => [
              B(C(g.$t("general.save")), 1)
            ]),
            _: 1
          }),
          f(E, { onClick: h }, {
            default: y(() => [
              B(C(g.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: y(() => [
        c(l) ? (m(), A("div", Vc, [
          f(q, null, {
            default: y(() => [
              f(G, null, {
                default: y(() => [
                  B(" Название типа ")
                ]),
                _: 1
              }),
              f(ie, {
                modelValue: c(l).name,
                "onUpdate:modelValue": x[0] || (x[0] = (v) => c(l).name = v)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          f(q, null, {
            default: y(() => [
              f(G, null, {
                default: y(() => [
                  B(" SVG ")
                ]),
                _: 1
              }),
              f(Ts, {
                modelValue: c(l).svg,
                "onUpdate:modelValue": x[1] || (x[1] = (v) => c(l).svg = v)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          f(q, null, {
            default: y(() => [
              f(G, null, {
                default: y(() => [
                  B(" Ширина ")
                ]),
                _: 1
              }),
              f(ie, {
                modelValue: c(l).width,
                "onUpdate:modelValue": x[2] || (x[2] = (v) => c(l).width = v)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          f(q, null, {
            default: y(() => [
              f(G, null, {
                default: y(() => [
                  B(" Высота ")
                ]),
                _: 1
              }),
              f(ie, {
                modelValue: c(l).height,
                "onUpdate:modelValue": x[3] || (x[3] = (v) => c(l).height = v)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          })
        ])) : O("", !0)
      ]),
      _: 1
    }));
  }
}), it = T.debug("MapObjectsWithTemplates");
class zc {
  constructor(e, t, s) {
    this.mapObjects = e, this.map = t, this.factories = s;
  }
  objects(e) {
    const t = this.factories.chain.create();
    return this.map.types(this.factories.guestCast.create(e, t.receiveKey("types"))), this.mapObjects.objects(this.factories.guestCast.create(e, t.receiveKey("objects"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ types: s, objects: i }) => {
        it("visible objects", i);
        const n = i.map((o) => {
          const a = s.find((p) => String(p.id) === String(o.type));
          if (it("check type existed", a), !a)
            return {
              obj: o,
              template: ""
            };
          let { svg: u } = a;
          return it("type svg", u), o.additionalFields && Object.entries(o.additionalFields).forEach(([p, d]) => {
            u = u.replaceAll(`\${${p}}`, d);
          }), ["width", "height"].forEach((p) => {
            u = u.replaceAll(`\${${p}}`, o[p]);
          }), {
            obj: o,
            template: u
          };
        });
        e.give(n);
      })
    ), e;
  }
}
const Lc = /* @__PURE__ */ R({
  __name: "BaseNotify",
  setup(r) {
    const { notification: e } = H(), t = e.message(new j()).ref();
    return (s, i) => c(t) && c(t).text !== "hide" ? (m(), A("div", {
      key: 0,
      class: ne(["inline font-bold", `text-${c(t).type}-second`])
    }, C(c(t).text), 3)) : O("", !0);
  }
}), Qc = { class: "relative" }, Kc = { class: "absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-1" }, Gc = { class: "text-sm z-10 p-2 absolute bottom-0 left-5" }, Wc = /* @__PURE__ */ Ps('<div class="absolute bottom-3 shadow-standard-second shadow-md drop-shadow right-3 z-10"><div class="grid-example grid grid-rows-2 grid-cols-2 bg-standard-second border border-standard-second gap-[1px] border-t-0 border-l-0"><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div></div></div><div class="absolute z-30 top-0 left-0 h-[18px] w-[22px] bg-white"></div>', 2), Jc = ["title"], Zc = { class: "font-bold" }, qc = ["title"], Yc = { class: "font-bold" }, Xc = ["title"], el = { class: "font-bold" }, tl = ["title"], sl = { class: "font-bold" }, il = ["data-object-id"], rl = { class: "absolute bottom-[100%] left-[50%] translate-x-[-50%] text-center pb-2 pointer-events-auto text-sm w-[300px]" }, nl = ["innerHTML", "onClick"], ol = ["innerHTML"], al = ["data-object-id", "innerHTML"], cl = /* @__PURE__ */ R({
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
      stageSize: u,
      objectsOutsideScreen: p,
      stagePositionByObjectId: d,
      mapCurrentSource: l
    } = H(), h = J(), w = n.value(new j()).ref(), x = new zc(
      t,
      s,
      h
    ).objects(new j([])).ref(), v = u.value(new j()).ref(), F = i.position(new j()).ref(), I = os(() => {
      var ge;
      return (ge = v.value) == null ? void 0 : ge.width;
    }), K = new gt(I), L = h.numberChunks.create(10, K).chunks(new j()).ref(), te = ae();
    as(() => {
      e.give(te.value);
    });
    const P = (ge) => {
      a.open(ge, h.guest.create((se) => {
        o.give(se);
      }));
    }, S = p.count(
      { axis: "x", direction: "negative" },
      new j()
    ).ref(), k = p.count(
      { axis: "x", direction: "positive" },
      new j()
    ).ref(), M = p.count(
      { axis: "y", direction: "negative" },
      new j()
    ).ref(), Z = p.count(
      { axis: "y", direction: "positive" },
      new j()
    ).ref(), oe = d.move.bind(d, l);
    return (ge, se) => {
      var vt, At, bt, yt, wt, Ct, _t, xt, $t, kt, Ft, Mt;
      return m(), A("div", Qc, [
        b("div", Kc, [
          b("div", Gc, [
            B(" Видимых объектов: " + C(c(x).length) + ", FPS: " + C(c(w)) + ", ", 1),
            f(Lc)
          ]),
          Wc,
          ((vt = c(S)) == null ? void 0 : vt.count) > 0 ? (m(), A("div", {
            key: 0,
            class: "pointer-events-auto absolute z-30 top-0 left-4 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(At = c(S)) == null ? void 0 : At.count} шт. объектов левее`,
            onClick: se[0] || (se[0] = (N) => c(oe)(c(S).nearestObjectId))
          }, [
            f(W, { icon: "fa-arrow-left" }),
            b("span", Zc, C((bt = c(S)) == null ? void 0 : bt.count), 1)
          ], 8, Jc)) : O("", !0),
          ((yt = c(k)) == null ? void 0 : yt.count) > 0 ? (m(), A("div", {
            key: 1,
            class: "pointer-events-auto absolute z-30 p-1 top-0 right-0 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(wt = c(k)) == null ? void 0 : wt.count} шт. объектов правее`,
            onClick: se[1] || (se[1] = (N) => c(oe)(c(k).nearestObjectId))
          }, [
            b("span", Yc, C((Ct = c(k)) == null ? void 0 : Ct.count), 1),
            f(W, { icon: "fa-arrow-right" })
          ], 8, qc)) : O("", !0),
          ((_t = c(M)) == null ? void 0 : _t.count) > 0 ? (m(), A("div", {
            key: 2,
            class: "pointer-events-auto absolute z-30 top-[18px] left-0 w-[18px] bg-white flex flex-col leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(xt = c(M)) == null ? void 0 : xt.count} шт. объектов выше`,
            onClick: se[2] || (se[2] = (N) => c(oe)(c(M).nearestObjectId))
          }, [
            f(W, { icon: "fa-arrow-up" }),
            b("span", el, C(($t = c(M)) == null ? void 0 : $t.count), 1)
          ], 8, Xc)) : O("", !0),
          ((kt = c(Z)) == null ? void 0 : kt.count) > 0 ? (m(), A("div", {
            key: 3,
            class: "pointer-events-auto absolute z-30 p-1 bottom-0 left-0 w-[18px] bg-white flex flex-col-reverse leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(Ft = c(Z)) == null ? void 0 : Ft.count} шт. объектов ниже`,
            onClick: se[3] || (se[3] = (N) => c(oe)(c(Z).nearestObjectId))
          }, [
            f(W, { icon: "fa-arrow-down" }),
            b("span", sl, C((Mt = c(Z)) == null ? void 0 : Mt.count), 1)
          ], 8, tl)) : O("", !0),
          b("div", {
            class: ne({ "objects-container absolute top-0 left-0": !0 }),
            style: re({ width: `${c(v).width}px`, height: `${c(v).height}px`, transform: `translate(${c(F).x}px, ${c(F).y}px)` })
          }, [
            b("div", {
              class: "absolute flex top-0 left-0 w-full z-20 h-[20px] bg-default border-b-2 border-border text-right text-sm px-2",
              style: re({ transform: `translate(0, ${-c(F).y}px)` })
            }, [
              (m(!0), A(U, null, Q(c(L), (N) => (m(), A("span", {
                class: "flex-1 text-body-dark",
                key: `horiz_${N}`
              }, C(N) + "px", 1))), 128))
            ], 4),
            b("div", {
              class: "absolute flex [writing-mode:vertical-lr] top-0 left-0 h-full z-20 w-[20px] bg-default border-r-2 border-border text-left text-sm py-2",
              style: re({ transform: `translate(${-c(F).x}px, 0)` })
            }, [
              (m(!0), A(U, null, Q(c(L), (N) => (m(), A("span", {
                class: "flex-1 rotate-180 text-body-dark",
                key: `vert_${N}`
              }, C(N) + "px", 1))), 128))
            ], 4),
            (m(!0), A(U, null, Q(c(x), (N) => (m(), A("div", {
              key: N.obj.id,
              class: "absolute z-10",
              "data-object-id": N.obj.id,
              style: re(`width:${N.obj.width}px;height: ${N.obj.height}px;top: ${N.obj.position[1]}px;left:${N.obj.position[0]}px;z-index:${N.obj.zindex}`)
            }, [
              b("div", rl, [
                b("span", {
                  innerHTML: N.obj.additionalName,
                  class: ne([N.obj.linked && "cursor-pointer underline"]),
                  onClick: (ru) => P(N.obj)
                }, null, 10, nl)
              ]),
              b("div", {
                class: "absolute top-[100%] left-[50%] translate-x-[-50%] text-center pt-2 text-sm w-[300px]",
                innerHTML: N.obj.name
              }, null, 8, ol),
              b("div", {
                "data-object-id": N.obj.id,
                class: "rendered-object",
                innerHTML: N.template
              }, null, 8, al)
            ], 12, il))), 128))
          ], 4)
        ]),
        b("div", {
          class: "h-full",
          ref_key: "canvasWrapper",
          ref: te
        }, null, 512)
      ]);
    };
  }
}), ll = { class: "flex flex-wrap gap-2" }, ul = { key: 0 }, dl = { key: 1 }, hl = ["onClick"], pl = /* @__PURE__ */ R({
  __name: "BaseBreadcrumbs",
  setup(r) {
    const {
      breadcrumbs: e,
      mapCurrentID: t
    } = H(), s = e.list(new j()).ref();
    return (i, n) => (m(), A("div", ll, [
      (m(!0), A(U, null, Q(c(s), (o, a) => (m(), A("span", {
        class: "flex gap-2",
        key: o.name
      }, [
        a !== 0 ? (m(), A("span", ul, "/")) : O("", !0),
        a === c(s).length - 1 ? (m(), A("b", dl, "Открыто: " + C(o.title), 1)) : (m(), A("a", {
          key: 2,
          href: "#",
          onClick: Ae((u) => c(t).give(o.name), ["prevent"])
        }, C(o.title), 9, hl))
      ]))), 128))
    ]));
  }
}), ml = { class: "flex items-center p-3 gap-3" }, fl = { class: "ml-auto gap-1 flex" }, gl = /* @__PURE__ */ R({
  __name: "TheHeader",
  setup(r) {
    const {
      drawer: e,
      modal: t,
      mapHistory: s,
      controlCombo: i,
      settings: n
    } = H(), { patron: o, guest: a } = J(), u = s.isNextPossible(new j()).ref(), p = s.isPrevPossible(new j()).ref();
    i.happened(
      "KeyZ",
      o.create(a.create(() => {
        p.value && s.prev();
      }))
    ), i.happened(
      "KeyP",
      o.create(a.create(() => {
        u.value && s.next();
      }))
    );
    const d = new j();
    return n.value(d), (l, h) => (m(), A("div", ml, [
      f(pl, { class: "TheHeader-Breadcrumbs" }),
      b("div", fl, [
        c(u) && !c(d).value.readonly ? (m(), z(E, {
          key: 0,
          size: "sm",
          title: "Отменить последнее действие",
          class: "w-7 block",
          onClick: h[0] || (h[0] = (w) => c(s).next())
        }, {
          default: y(() => [
            f(W, { icon: "fa-rotate-left" })
          ]),
          _: 1
        })) : O("", !0),
        c(p) && !c(d).value.readonly ? (m(), z(E, {
          key: 1,
          size: "sm",
          title: "Вернуть отмененное действие",
          class: "w-7 block",
          onClick: h[1] || (h[1] = (w) => c(s).prev())
        }, {
          default: y(() => [
            f(W, { icon: "fa-rotate-right" })
          ]),
          _: 1
        })) : O("", !0),
        f(E, {
          type: "success",
          size: "sm",
          class: "w-7 block e2e-open-menu",
          title: l.$t("general.menu"),
          onClick: h[2] || (h[2] = (w) => c(e).give("menu"))
        }, {
          default: y(() => [
            f(W, { icon: "fa-bars" })
          ]),
          _: 1
        }, 8, ["title"]),
        f(E, {
          title: l.$t("general.byText"),
          type: "primary",
          size: "sm",
          class: "w-7 block",
          onClick: h[3] || (h[3] = (w) => c(t).give("mapAsText"))
        }, {
          default: y(() => [
            f(W, { icon: "fa-text-width" })
          ]),
          _: 1
        }, 8, ["title"]),
        f(E, {
          class: "w-7 block e2e-search",
          size: "sm",
          onClick: h[4] || (h[4] = (w) => c(t).give("search"))
        }, {
          default: y(() => [
            f(W, { icon: "fa-search" })
          ]),
          _: 1
        }),
        f(E, {
          size: "sm",
          title: "Все карты файла",
          class: "w-7 block",
          onClick: h[5] || (h[5] = (w) => c(e).give("fileMaps"))
        }, {
          default: y(() => [
            f(W, { icon: "fa-map" })
          ]),
          _: 1
        })
      ])
    ]));
  }
}), vl = {}, Al = { class: "text-lg font-bold" };
function bl(r, e) {
  return m(), A("span", Al, [
    Y(r.$slots, "default")
  ]);
}
const yl = /* @__PURE__ */ We(vl, [["render", bl]]), wl = { class: "flex gap-1" }, Cl = {
  key: 0,
  class: "TheMapAsText select-auto"
}, _l = ["innerHTML"], xl = /* @__PURE__ */ R({
  __name: "TheMapAsText",
  setup(r) {
    const { mapFile: e, mapCurrent: t } = H(), {
      guest: s,
      patron: i,
      textOf: n,
      textNlAsBr: o,
      textWithoutHTML: a
    } = J(), u = e.currentMap(new j()).ref(), p = ae(""), d = ae([]);
    t.objects(
      i.create(
        s.create(we((v) => {
          d.value = v, o.create(
            n.create(
              v.map((F) => `<div class="TheMapAsText-Item">
                <h3>${F.name}</h3><p>${F.additionalName || ""}</p><p>${F.description || ""}</p><p>${F.additionalFields && Object.values(F.additionalFields).join("</p><p>")}</p></div>`).join("")
            )
          ).asString(
            s.create((F) => {
              p.value = F;
            })
          );
        }, 500))
      )
    );
    const { share: l, isSupported: h } = Ds(), w = () => {
      h.value || alert("Sharing is not supported"), a.create(
        n.create(
          p.value
        )
      ).asString(
        s.create((v) => {
          l({
            text: v
          });
        })
      );
    }, g = ae(), x = () => {
      var v, F;
      if (u.value) {
        const I = new Range();
        I.setStart(g.value, 0), I.setEnd(g.value, Object.values(d.value).length), (v = document.getSelection()) == null || v.removeAllRanges(), (F = document.getSelection()) == null || F.addRange(I);
      }
    };
    return (v, F) => (m(), z(fe, { name: "mapAsText" }, {
      header: y(() => [
        f(yl, { class: "block mb-3" }, {
          default: y(() => [
            B(C(v.$t("general.mapAsText")) + " ", 1),
            b("div", wl, [
              f(E, {
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
              f(E, {
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
        c(u) ? (m(), A("article", Cl, [
          b("div", {
            ref_key: "textRef",
            ref: g,
            innerHTML: p.value
          }, null, 8, _l)
        ])) : O("", !0)
      ]),
      _: 1
    }));
  }
}), $l = { key: 1 }, kl = /* @__PURE__ */ R({
  __name: "TheMiniMap",
  setup(r) {
    const { miniMap: e } = H(), t = e.points(new j()).ref(), s = e.size(new j()).ref(), i = e.viewportSize(new j()).ref(), n = e.viewportPosition(new j()).ref();
    return (o, a) => c(s) ? (m(), A("div", {
      key: 0,
      style: re({
        width: `${c(s).width}px`,
        height: `${c(s).height}px`
      }),
      class: "absolute pointer-events-none block bg-white bottom-[10px] mt-3 right-3 z-1 border border-solid border-body-dark"
    }, [
      c(n) ? (m(), A("div", {
        key: 0,
        style: re({
          width: `${c(i).width}px`,
          height: `${c(i).height}px`,
          top: `${c(n).y}px`,
          left: `${c(n).x}px`
        }),
        class: "absolute bg-primary/50"
      }, null, 4)) : O("", !0),
      c(t) ? (m(), A("div", $l, [
        (m(!0), A(U, null, Q(c(t), (u) => (m(), A("div", {
          key: u.id,
          class: "absolute w-1 h-1 block bg-danger",
          style: re({
            top: `${u.y}px`,
            left: `${u.x}px`,
            width: `${u.width}px`,
            height: `${u.height}px`
          })
        }, null, 4))), 128))
      ])) : O("", !0)
    ], 4)) : O("", !0);
  }
}), Fl = { class: "text-lg font-bold" }, Ml = {
  key: 0,
  class: "TheSettings"
}, Tl = { class: "mb-2" }, Sl = { class: "TheSettings-Row" }, jl = { class: "flex gap-2 mb-2" }, Ol = { class: "mb-2" }, Bl = { class: "mb-2" }, Il = {
  href: "https://github.com/kosukhin/mind-map-creator",
  target: "_blank"
}, Pl = { class: "flex gap-2" }, El = /* @__PURE__ */ R({
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
    } = H(), { patron: u, guest: p } = J(), d = o.names(new j()).ref(), l = t.currentMap(new j()).ref(), h = a.id(new j()).ref(), w = () => {
      e.give("");
    }, g = () => {
      i.give(l.value.settings), w();
    };
    return n.happenedConditional(
      "KeyS",
      e.openedByName("settings"),
      u.create(p.create(g))
    ), (x, v) => (m(), z(fe, { name: "settings" }, {
      header: y(() => [
        b("h2", Fl, C(x.$t("general.mapSettings")), 1)
      ]),
      default: y(() => {
        var F;
        return [
          (F = c(l)) != null && F.settings ? (m(), A("div", Ml, [
            b("div", Tl, [
              b("div", Sl, [
                b("div", jl, [
                  c(d).length > 1 ? (m(), z(E, {
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
                  f(E, {
                    type: "primary",
                    class: "text-white",
                    onClick: v[1] || (v[1] = (I) => c(e).give("export"))
                  }, {
                    default: y(() => [
                      B(C(x.$t("general.exportOrImport")), 1)
                    ]),
                    _: 1
                  }),
                  f(E, {
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
              b("div", Ol, [
                b("label", null, [
                  b("b", null, C(x.$t("general.mapName")), 1),
                  f(ie, {
                    modelValue: c(l).settings.title,
                    "onUpdate:modelValue": v[3] || (v[3] = (I) => c(l).settings.title = I)
                  }, null, 8, ["modelValue"])
                ])
              ]),
              b("div", Bl, [
                b("a", Il, C(x.$t("general.githubRepo")), 1)
              ])
            ]),
            b("div", Pl, [
              f(E, {
                class: "TheSettings-Button",
                type: "success",
                onClick: v[4] || (v[4] = (I) => g())
              }, {
                default: y(() => [
                  B(C(x.$t("general.save")), 1)
                ]),
                _: 1
              }),
              f(E, {
                class: "TheSettings-Button",
                onClick: w
              }, {
                default: y(() => [
                  B(C(x.$t("general.cancel")), 1)
                ]),
                _: 1
              }),
              f(E, {
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
}), Rl = {}, Dl = { class: "BaseGroup" };
function Nl(r, e) {
  return m(), A("div", Dl, [
    Y(r.$slots, "default")
  ]);
}
const Vl = /* @__PURE__ */ We(Rl, [["render", Nl]]), Hl = "default", Ul = /* @__PURE__ */ R({
  __name: "TheLinker",
  setup(r) {
    const { mapObjectsLink: e } = H(), t = e.objectIds(new j([])).ref();
    return (s, i) => (m(), z(E, {
      type: Hl,
      onClick: i[0] || (i[0] = (n) => c(e).startLink())
    }, {
      default: y(() => [
        B(C(c(t).length === 1 ? "Выбиретие объект" : c(t).length === 2 ? "Второй объект" : "Связать объекты"), 1)
      ]),
      _: 1
    }));
  }
}), zl = { class: "flex e2e-sidebar flex-col items-center gap-3 max-h-[100%] overflow-hidden" }, Ll = { class: "TheSideBar-ItemName" }, Ql = ["innerHTML", "draggable", "title", "onDragend"], Kl = {
  key: 0,
  class: "flex gap-1"
}, Gl = {
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
      sidebarDraggable: u
    } = H(), p = t.types(new j()).ref(), d = ae();
    as(() => {
      u.give(d.value);
    });
    const { svgMapTypeImage: l } = J(), h = os(() => {
      var g;
      return (g = p.value) == null ? void 0 : g.map((x) => ({
        type: x,
        image: l.create(x).markup()
      })).sort((x, v) => +(x.type.name >= v.type.name));
    }), w = new j();
    return a.value(w), (g, x) => (m(), A("div", zl, [
      b("div", {
        ref_key: "dragWrapperRef",
        ref: d,
        class: "flex flex-col gap-3 flex-grow w-full overflow-y-auto"
      }, [
        (m(!0), A(U, null, Q(h.value, (v, F) => (m(), A("div", {
          key: F,
          class: "flex flex-col items-center justify-center gap-2"
        }, [
          b("div", Ll, C(v.type.name), 1),
          b("div", {
            innerHTML: v.image,
            class: "TheSideBar-ItemImage",
            draggable: c(w).value.readonly ? "false" : "true",
            style: re(`width:${v.type.width}px;height:${v.type.height}px`),
            title: g.$t("general.notifications.dragToCanvasToAdd"),
            onDragend: (I) => c(e).byTypeName(v.type.id, I)
          }, null, 44, Ql),
          c(w).value.readonly ? O("", !0) : (m(), A("div", Kl, [
            f(E, {
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
            f(E, {
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
      c(w).value.readonly ? O("", !0) : (m(), A("div", Gl, [
        f(Vl, { class: "mb-1 grid gap-1 grid-cols-2" }, {
          default: y(() => [
            f(E, {
              title: g.$t("general.addType"),
              type: "success",
              onClick: x[0] || (x[0] = (v) => c(n).byName())
            }, {
              default: y(() => [
                f(W, { icon: "fa-plus-square" })
              ]),
              _: 1
            }, 8, ["title"]),
            f(E, {
              class: "e2e-show-settings",
              title: g.$t("general.settings"),
              type: "primary",
              onClick: x[1] || (x[1] = (v) => c(o).give("settings"))
            }, {
              default: y(() => [
                f(W, { icon: "fa-cog" })
              ]),
              _: 1
            }, 8, ["title"])
          ]),
          _: 1
        }),
        f(Ul, { class: "w-[100%] block mb-1" })
      ]))
    ]));
  }
});
class Jl {
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
    return this.basePatron.give(e), this.refWatcherCreated || (this.refWatcherCreated = !0, cs(
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
class Zl {
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
class ql {
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
const Yl = { class: "AppPresets" }, Xl = /* @__PURE__ */ b("div", { class: "text-md font-bold mb-2" }, "Экспорт\\Импорт текущей карты", -1), eu = { class: "flex flex-col gap-2" }, tu = /* @__PURE__ */ R({
  __name: "AppExport",
  setup(r) {
    const { mapFile: e, mapCurrent: t } = H(), s = new ql(
      t,
      new ct((a) => {
        e.currentMap(new Ve(a));
      })
    ), i = new Zl(s), n = new Jl(new j(), i);
    i.value(n);
    const o = n.ref();
    return (a, u) => (m(), z(fe, { name: "export" }, {
      default: y(() => [
        b("div", Yl, [
          Xl,
          b("div", eu, [
            f(Ts, {
              modelValue: c(o),
              "onUpdate:modelValue": u[0] || (u[0] = (p) => be(o) ? o.value = p : null)
            }, null, 8, ["modelValue"])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), su = { class: "bg-body absolute top-0 left-0 w-full h-full" }, iu = { class: "grid grid-cols-[200px_1fr] grid-rows-[50px_1fr] h-dvh relative" }, mu = /* @__PURE__ */ R({
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
    return n.value((u) => {
      n.give({
        ...u,
        readonly: t.readonly,
        presets: t.presets
      });
    }), ot(() => t.modelValue, (u) => {
      i.value(o.create((p) => {
        u !== p && i.give(u);
      }));
    }, {
      immediate: !0
    }), i.value(a.create((u) => {
      s("update:modelValue", u);
    })), (u, p) => (m(), A("div", su, [
      b("div", iu, [
        f(gl, { class: "col-span-2" }),
        f(Wl),
        f(cl, { class: "w-auto col-auto h-full" }),
        f(kl)
      ]),
      f(Ec),
      f(Uc),
      f(El),
      f(Ka),
      f(ac),
      f(tu),
      f(Ia),
      f(xl),
      f(tc),
      f(Ma)
    ]));
  }
}), ss = T.debug("FileSystemContent");
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
const Ne = T.debug("FirstPossibleFileContent");
class gu {
  constructor(e, t) {
    $(this, "firstPossibleFileContent", null);
    $(this, "contentSource", new ve());
    $(this, "canBeUsedSource", new ve());
    Ne("length", e.length), e.forEach((s) => {
      s.canBeUsed(
        t.patronOnce.create(
          t.guest.create((i) => {
            Ne("canbeused result", s, i), i && !this.firstPossibleFileContent && (this.firstPossibleFileContent = s, s.canBeUsed(t.patron.create(this.canBeUsedSource)), s.content(t.patron.create(this.contentSource)), this.contentSource.value(
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
    return Ne("can be used to", this.firstPossibleFileContent), this.canBeUsedSource.value(e), e;
  }
  content(e) {
    return Ne("content to", this.firstPossibleFileContent), this.contentSource.value(e), this;
  }
  give(e) {
    return this.contentSource.give(e), this;
  }
}
const rt = T.debug("UrlContent");
class vu {
  constructor(e, t) {
    $(this, "contentCache");
    this.notification = e, this.factories = t, this.contentCache = t.sourceEmpty.create();
  }
  canBeUsed(e) {
    if (!window)
      return e.give(!1), this;
    const t = window.location.search.indexOf("?view=") > -1;
    if (rt("can be used", t), e.give(window.location.search.indexOf("?view=") > -1), t) {
      const s = window.location.search.split("=")[1] ?? "";
      fetch(s, { redirect: "follow" }).then((i) => i.text()).then((i) => {
        rt("received text", i), this.contentCache.give(i);
      });
    }
    return e;
  }
  content(e) {
    if (!window)
      return this;
    const t = window.location.search.split("=")[1] ?? "";
    return rt("visit url", t), this.contentCache.value(this.factories.patronOnce.create(e)), this;
  }
  give() {
    return this.notification.give({
      type: "error",
      text: "Невозможно сохранить карту, открытую по ссылке!"
    }), this;
  }
}
const is = new ve();
class Au {
  constructor(e = window.launchQueue, t = "launchQueue" in window) {
    $(this, "isCalculated", !1);
    this.launchQueue = e, this.isLaunchQueueSupported = t;
  }
  fileHandler(e) {
    return this.isLaunchQueueSupported && !this.isCalculated && (this.isCalculated = !0, this.launchQueue.setConsumer((t) => {
      if (console.log("require file handler"), t.files && t.files.length) {
        const [s] = t.files;
        is.give(s);
      }
    })), is.value(e), this;
  }
}
export {
  Au as BrowserLaunchQueue,
  fu as FileSystemContent,
  gu as FirstPossibleFileContent,
  mu as PatronSchemeEditor,
  vu as UrlContent,
  j as VueRefPatron,
  H as useApplication,
  J as useFactories
};
