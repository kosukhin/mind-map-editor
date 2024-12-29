var Is = Object.defineProperty;
var js = (n, e, t) => e in n ? Is(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var _ = (n, e, t) => js(n, typeof e != "symbol" ? e + "" : e, t);
import { ref as ee, defineComponent as E, computed as Ie, openBlock as g, createBlock as V, Transition as os, withCtx as w, unref as u, createElementBlock as A, normalizeClass as te, createElementVNode as y, withModifiers as Ce, renderSlot as se, createCommentVNode as T, Fragment as K, renderList as q, toDisplayString as C, createVNode as v, normalizeStyle as ce, createTextVNode as O, watch as je, withDirectives as Le, isRef as Be, vModelText as as, vModelCheckbox as Bs, onBeforeUnmount as Os, vModelSelect as Ps, onMounted as cs, createStaticVNode as Es } from "vue";
import { useScriptTag as Ds, useMagicKeys as Rs, useVModel as Qe, useShare as Hs } from "@vueuse/core";
import de from "konva";
import { FontAwesomeIcon as Ns } from "@fortawesome/vue-fontawesome";
import { faShareNodes as Vs, faArrowUp as zs, faArrowDown as Us, faArrowRight as Ls, faArrowLeft as Qs, faClose as Ws, faMap as Ks, faRotateRight as Gs, faRotateLeft as qs, faFileText as Js, faCog as Ys, faPlusSquare as Zs, faHistory as Xs, faSearch as ei, faTextWidth as ti, faBarsStaggered as si, faBars as ii } from "@fortawesome/free-solid-svg-icons";
import { useEditor as ni, EditorContent as ri, BubbleMenu as oi } from "@tiptap/vue-3";
import ai from "@tiptap/starter-kit";
var Oe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ut(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var lt = { exports: {} }, Xe, jt;
function ci() {
  if (jt) return Xe;
  jt = 1;
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
        var p = parseFloat(d[1]), m = (d[2] || "ms").toLowerCase();
        switch (m) {
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
  function h(l, d, p, m) {
    var f = d >= p * 1.5;
    return Math.round(l / p) + " " + m + (f ? "s" : "");
  }
  return Xe;
}
function li(n) {
  t.debug = t, t.default = t, t.coerce = a, t.disable = r, t.enable = i, t.enabled = o, t.humanize = ci(), t.destroy = h, Object.keys(n).forEach((l) => {
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
    let d, p = null, m, f;
    function $(...b) {
      if (!$.enabled)
        return;
      const k = $, F = Number(/* @__PURE__ */ new Date()), L = F - (d || F);
      k.diff = L, k.prev = d, k.curr = F, d = F, b[0] = t.coerce(b[0]), typeof b[0] != "string" && b.unshift("%O");
      let P = 0;
      b[0] = b[0].replace(/%([a-zA-Z%])/g, (R, B) => {
        if (R === "%%")
          return "%";
        P++;
        const S = t.formatters[B];
        if (typeof S == "function") {
          const M = b[P];
          R = S.call(k, M), b.splice(P, 1), P--;
        }
        return R;
      }), t.formatArgs.call(k, b), (k.log || t.log).apply(k, b);
    }
    return $.namespace = l, $.useColors = t.useColors(), $.color = t.selectColor(l), $.extend = s, $.destroy = t.destroy, Object.defineProperty($, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => p !== null ? p : (m !== t.namespaces && (m = t.namespaces, f = t.enabled(l)), f),
      set: (b) => {
        p = b;
      }
    }), typeof t.init == "function" && t.init($), $;
  }
  function s(l, d) {
    const p = t(this.namespace + (typeof d > "u" ? ":" : d) + l);
    return p.log = this.log, p;
  }
  function i(l) {
    t.save(l), t.namespaces = l, t.names = [], t.skips = [];
    let d;
    const p = (typeof l == "string" ? l : "").split(/[\s,]+/), m = p.length;
    for (d = 0; d < m; d++)
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
var ui = li;
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
  n.exports = ui(e);
  const { formatters: c } = n.exports;
  c.j = function(a) {
    try {
      return JSON.stringify(a);
    } catch (h) {
      return "[UnexpectedJSONParseError]: " + h.message;
    }
  };
})(lt, lt.exports);
var j = lt.exports;
const dt = /* @__PURE__ */ ut(j);
class we {
  constructor(e) {
    this.guestReceiver = e;
  }
  value(e) {
    return this.guestReceiver(e), e;
  }
}
function U(n, e, t) {
  typeof e == "function" ? e(n, t) : e.give(n, t);
}
class fe {
  constructor(e) {
    this.receiver = e;
  }
  give(e, t) {
    return this.receiver(e, t), this;
  }
}
class Q {
  constructor(e, t) {
    this.sourceGuest = e, this.targetGuest = t;
  }
  introduction() {
    return typeof this.sourceGuest == "function" || !this.sourceGuest.introduction ? "guest" : this.sourceGuest.introduction();
  }
  give(e, t) {
    return U(e, this.targetGuest, t), this;
  }
  disposed(e) {
    const t = this.sourceGuest;
    return t.disposed ? t.disposed(e) : !1;
  }
}
var di = Object.defineProperty, hi = (n, e, t) => e in n ? di(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Bt = (n, e, t) => hi(n, typeof e != "symbol" ? e + "" : e, t);
const ls = /* @__PURE__ */ new Map(), Ot = (n) => {
  ls.forEach((e) => {
    e.delete(n);
  });
};
class We {
  constructor(e) {
    this.initiator = e, Bt(this, "patrons"), Bt(this, "give"), this.patrons = /* @__PURE__ */ new Set(), ls.set(this, this.patrons);
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
    this.guestDisposed(e, t) || U(e, t, {
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
var pi = Object.defineProperty, fi = (n, e, t) => e in n ? pi(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, gi = (n, e, t) => fi(n, e + "", t);
class he {
  constructor(e) {
    this.sourceDocument = e, gi(this, "thePool", new We(this));
  }
  pool() {
    return this.thePool;
  }
  give(e) {
    return this.sourceDocument = e, this.thePool.give(this.sourceDocument), this;
  }
  value(e) {
    return typeof e == "function" ? this.thePool.distribute(this.sourceDocument, new fe(e)) : this.thePool.distribute(this.sourceDocument, e), this;
  }
}
class Ue {
  constructor(e) {
    this.baseGuest = e;
  }
  give(e, t) {
    let s = this.baseGuest;
    return typeof s == "function" && (s = new fe(s)), s.give(e, t), this;
  }
  introduction() {
    return typeof this.baseGuest == "function" || !this.baseGuest.introduction ? "guest" : this.baseGuest.introduction();
  }
  disposed(e) {
    const t = this.baseGuest;
    return t.disposed ? t.disposed(e) : !1;
  }
}
var mi = Object.defineProperty, vi = (n, e, t) => e in n ? mi(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Pt = (n, e, t) => vi(n, typeof e != "symbol" ? e + "" : e, t);
class Ai {
  constructor(e) {
    Pt(this, "guests", /* @__PURE__ */ new Set()), Pt(this, "patronPool"), this.patronPool = new We(e);
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
      U(e, s, t);
    }), this.guests.clear();
  }
}
var yi = Object.defineProperty, bi = (n, e, t) => e in n ? yi(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Pe = (n, e, t) => bi(n, typeof e != "symbol" ? e + "" : e, t);
class Ke {
  constructor() {
    Pe(this, "theChain"), Pe(this, "keysKnown", /* @__PURE__ */ new Set()), Pe(this, "keysFilled", /* @__PURE__ */ new Set()), Pe(this, "filledChainPool", new Ai(this)), this.theChain = new he({});
  }
  resultArray(e) {
    const t = new Ue(e);
    return this.filledChainPool.add(
      new Q(t, (s) => {
        t.give(Object.values(s));
      })
    ), this.isChainFilled() && this.theChain.value(
      new fe((s) => {
        this.filledChainPool.give(Object.values(s));
      })
    ), this;
  }
  result(e) {
    const t = new Ue(e);
    return this.isChainFilled() ? (this.filledChainPool.add(t), this.theChain.value(
      new fe((s) => {
        this.filledChainPool.give(s);
      })
    )) : this.filledChainPool.add(t), this;
  }
  receiveKey(e) {
    return this.keysKnown.add(e), new fe((t) => {
      queueMicrotask(() => {
        this.theChain.value(
          new fe((s) => {
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
class wi {
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
class ht {
  constructor(e) {
    this.willBePatron = e;
  }
  introduction() {
    return "patron";
  }
  give(e, t) {
    return U(e, this.willBePatron, t), this;
  }
  disposed(e) {
    var s;
    const t = this.willBePatron;
    return ((s = t == null ? void 0 : t.disposed) == null ? void 0 : s.call(t, e)) || !1;
  }
}
var Ci = Object.defineProperty, xi = (n, e, t) => e in n ? Ci(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, _i = (n, e, t) => xi(n, e + "", t);
class $i {
  constructor(e) {
    this.baseGuest = e, _i(this, "received", !1);
  }
  introduction() {
    return "patron";
  }
  give(e, t) {
    this.received || U(e, this.baseGuest, t);
    const s = t == null ? void 0 : t.data;
    return s != null && s.pool && s.pool.remove(this), this;
  }
  disposed(e) {
    const t = this.baseGuest;
    return t.disposed ? t.disposed(e) : !1;
  }
}
var ki = Object.defineProperty, Fi = (n, e, t) => e in n ? ki(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Mi = (n, e, t) => Fi(n, e + "", t);
class ge {
  constructor() {
    Mi(this, "baseSource", new he(null));
  }
  value(e) {
    return this.baseSource.value(
      new Q(e, (t) => {
        t !== null && U(t, e);
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
const Si = dt("SharedFile");
class Ti {
  constructor(e, t = "Share file") {
    _(this, "loading", new he(!1));
    this.fileSource = e, this.sharingTitle = t;
  }
  value(e) {
    return this.loading.value(e), this;
  }
  do() {
    return this.fileSource.value((e) => {
      try {
        const t = new File(
          [e.content],
          e.name.replace(".json", ".txt"),
          { type: "text/plain" }
        );
        this.loading.give(!0), navigator.share({
          title: `${this.sharingTitle} ${e.name}`,
          files: [t]
        }).finally(() => {
          this.loading.give(!1);
        });
      } catch (t) {
        Si(t);
      }
    }), this;
  }
}
class Ii {
  constructor(e) {
    _(this, "source", new he(null));
    this.name = e;
    const t = JSON.parse(localStorage.getItem(e) || "null");
    this.source.give(t), document.addEventListener(
      "localDataStorage",
      (s) => {
        s.detail.key === e && this.source.give(JSON.parse(s.detail.newval));
      },
      !1
    );
  }
  give(e) {
    return localStorage.setItem(this.name, JSON.stringify(e)), this.source.give(e), this;
  }
  pool() {
    return this.source.pool();
  }
  value(e) {
    return this.source.value(e), this;
  }
}
const us = new Ii("shared-map"), ji = new Ti(us), Bi = {
  sharedStorageRecord: us,
  sharedFile: ji
}, ds = () => Bi;
class Oi {
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
class Te extends Error {
  constructor(e, t) {
    super(e, t);
  }
}
class Pi {
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
class Ei {
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
class Di {
  constructor(e) {
    this.content = e;
  }
  result() {
    return JSON.parse(this.content);
  }
}
class Ri {
  constructor(e) {
    this.content = e;
  }
  result() {
    return JSON.stringify(this.content);
  }
}
class Hi {
  constructor(e, t = 100, s = 100) {
    this.svgContent = e, this.width = t, this.height = s;
  }
  markup() {
    return this.svgContent.replaceAll("${width}", String(this.width)).replaceAll("${height}", String(this.height));
  }
}
class Ni {
  constructor(e, t) {
    this.type = e, this.factories = t;
  }
  markup() {
    return this.factories.svgImage.create(this.type.svg, this.type.width, this.type.height).markup();
  }
}
class Vi {
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
class zi {
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
class Ui {
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
class Li {
  constructor(e, t, s, i) {
    _(this, "loadingCache");
    this.callbackName = e, this.url = t, this.emptyValue = s, this.factories = i, this.loadingCache = i.sourceEmpty.create();
  }
  content(e) {
    this.loadingCache.give(!0);
    const t = setTimeout(() => {
      this.loadingCache.give(!1), e.give(this.emptyValue);
    }, 1e4);
    return Ds(this.url, () => {
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
class Qi {
  constructor(e) {
    this.text = e;
  }
  asString(e) {
    return e.give(this.text), e;
  }
}
class Wi {
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
const Ki = j.debug("TextNlAsBr");
class Gi {
  constructor(e, t) {
    this.baseText = e, this.factories = t;
  }
  asString(e) {
    return this.baseText.asString(
      this.factories.guestInTheMiddle.create(e, (t) => {
        if (typeof t > "u" || t === null)
          return "";
        const s = "<br />";
        return Ki(t), e.give((t ?? "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, `$1${s}$2`)), !0;
      })
    ), e;
  }
}
const qi = new H(he), Ji = new H(he), Yi = new H(ge), Zi = new H(fe), Xi = new H(Q), en = new H(we), tn = new H(We), sn = new H(ht), nn = new H($i), rn = new H(Q), on = new H(Ke), an = new H(wi), pe = {
  cache: qi,
  chain: on,
  guest: Zi,
  guestCast: Xi,
  guestAware: en,
  guestInTheMiddle: rn,
  guestSync: an,
  patron: sn,
  patronOnce: nn,
  pool: tn,
  source: Ji,
  sourceEmpty: Yi
}, cn = new H(Pi), ln = new H(Ei), un = new H(Ri), dn = new H(Di), hs = new H(Hi), hn = new H(Ni, { ...pe, svgImage: hs }), pn = new H(Vi, pe), fn = new H(zi, pe), gn = new H(Ui, pe), mn = new H(Li, pe), vn = new H(Qi), An = new H(Wi, pe), yn = new H(Gi, pe), bn = {
  ...pe,
  fileHandlerContent: cn,
  browserFileSaved: ln,
  transformToString: un,
  transformToObject: dn,
  svgImage: hs,
  svgMapTypeImage: hn,
  numberChunks: pn,
  mapNameFromUrl: fn,
  textNoHtml: gn,
  jsonp: mn,
  textOf: vn,
  textNlAsBr: yn,
  textWithoutHTML: An
}, Y = () => bn;
class pt {
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
const et = j.debug("MapCurrent");
class ps {
  constructor(e, t, s) {
    _(this, "objectsCache");
    _(this, "settingsCache");
    _(this, "typesCache");
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
class wn {
  constructor(e) {
    _(this, "idCache");
    this.idCache = e.cache.create("current");
  }
  id(e) {
    return this.idCache.value(e), e;
  }
  give(e) {
    return this.idCache.give(e), this;
  }
}
class Cn {
  constructor(e) {
    this.mapFile = e;
  }
  value(e) {
    return this.mapFile.currentMap(
      new Q(e, (t) => {
        e.give(t.settings.title);
      })
    ), this;
  }
}
const Ee = j.debug("MapHistory"), Et = (n) => {
  const e = JSON.parse(JSON.stringify(n));
  return Object.values(e.objects).forEach((t) => {
    t.width = 0, t.height = 0;
  }), JSON.stringify(e);
};
class xn {
  constructor(e, t, s, i) {
    _(this, "mapsHistory");
    _(this, "historyIndex");
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
                (r) => Et(r) === Et(e)
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
class _n {
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
const De = j.debug("MapFile");
class $n {
  constructor(e, t, s) {
    _(this, "currentMapPatrons");
    _(this, "mapFileCache");
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
const kn = j.debug("MapFileForRendering");
class Fn {
  constructor(e, t, s) {
    _(this, "mapCache");
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
        kn("received map file, objects = ", e[t].objects), this.mapCache.give(e[t]);
      })
    ), this;
  }
}
class fs {
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
const Dt = dt("app:MapObjectCurrent");
class Mn {
  constructor(e, t) {
    _(this, "idCache");
    _(this, "silenceActivator");
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
    return Dt("new value current object", e), this.silenceActivator.value(
      this.factories.guest.create((t) => {
        Dt("silence activator", t), t ? t.give(e) : this.idCache.give(e);
      })
    ), this;
  }
}
class Sn {
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
const tt = j.debug("MapObjectNew");
class Tn {
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
class In {
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
class jn {
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
class Bn {
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
const On = j.debug("MapObjectsLink");
class Pn {
  constructor(e, t, s, i, r) {
    _(this, "objectIdsCache");
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
            t.push(s), this.objectIdsCache.give([...t]), On("object ids", t), t.length === 2 && this.map.objects(
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
function En(n) {
  var e = typeof n;
  return n != null && (e == "object" || e == "function");
}
var ft = En, Dn = typeof Oe == "object" && Oe && Oe.Object === Object && Oe, Rn = Dn, Hn = Rn, Nn = typeof self == "object" && self && self.Object === Object && self, Vn = Hn || Nn || Function("return this")(), gs = Vn, zn = gs, Un = function() {
  return zn.Date.now();
}, Ln = Un, Qn = /\s/;
function Wn(n) {
  for (var e = n.length; e-- && Qn.test(n.charAt(e)); )
    ;
  return e;
}
var Kn = Wn, Gn = Kn, qn = /^\s+/;
function Jn(n) {
  return n && n.slice(0, Gn(n) + 1).replace(qn, "");
}
var Yn = Jn, Zn = gs, Xn = Zn.Symbol, ms = Xn, Rt = ms, vs = Object.prototype, er = vs.hasOwnProperty, tr = vs.toString, _e = Rt ? Rt.toStringTag : void 0;
function sr(n) {
  var e = er.call(n, _e), t = n[_e];
  try {
    n[_e] = void 0;
    var s = !0;
  } catch {
  }
  var i = tr.call(n);
  return s && (e ? n[_e] = t : delete n[_e]), i;
}
var ir = sr, nr = Object.prototype, rr = nr.toString;
function or(n) {
  return rr.call(n);
}
var ar = or, Ht = ms, cr = ir, lr = ar, ur = "[object Null]", dr = "[object Undefined]", Nt = Ht ? Ht.toStringTag : void 0;
function hr(n) {
  return n == null ? n === void 0 ? dr : ur : Nt && Nt in Object(n) ? cr(n) : lr(n);
}
var pr = hr;
function fr(n) {
  return n != null && typeof n == "object";
}
var gr = fr, mr = pr, vr = gr, Ar = "[object Symbol]";
function yr(n) {
  return typeof n == "symbol" || vr(n) && mr(n) == Ar;
}
var br = yr, wr = Yn, Vt = ft, Cr = br, zt = NaN, xr = /^[-+]0x[0-9a-f]+$/i, _r = /^0b[01]+$/i, $r = /^0o[0-7]+$/i, kr = parseInt;
function Fr(n) {
  if (typeof n == "number")
    return n;
  if (Cr(n))
    return zt;
  if (Vt(n)) {
    var e = typeof n.valueOf == "function" ? n.valueOf() : n;
    n = Vt(e) ? e + "" : e;
  }
  if (typeof n != "string")
    return n === 0 ? n : +n;
  n = wr(n);
  var t = _r.test(n);
  return t || $r.test(n) ? kr(n.slice(2), t ? 2 : 8) : xr.test(n) ? zt : +n;
}
var Mr = Fr, Sr = ft, st = Ln, Ut = Mr, Tr = "Expected a function", Ir = Math.max, jr = Math.min;
function Br(n, e, t) {
  var s, i, r, o, c, a, h = 0, l = !1, d = !1, p = !0;
  if (typeof n != "function")
    throw new TypeError(Tr);
  e = Ut(e) || 0, Sr(t) && (l = !!t.leading, d = "maxWait" in t, r = d ? Ir(Ut(t.maxWait) || 0, e) : r, p = "trailing" in t ? !!t.trailing : p);
  function m(R) {
    var B = s, S = i;
    return s = i = void 0, h = R, o = n.apply(S, B), o;
  }
  function f(R) {
    return h = R, c = setTimeout(k, e), l ? m(R) : o;
  }
  function $(R) {
    var B = R - a, S = R - h, M = e - B;
    return d ? jr(M, r - S) : M;
  }
  function b(R) {
    var B = R - a, S = R - h;
    return a === void 0 || B >= e || B < 0 || d && S >= r;
  }
  function k() {
    var R = st();
    if (b(R))
      return F(R);
    c = setTimeout(k, $(R));
  }
  function F(R) {
    return c = void 0, p && s ? m(R) : (s = i = void 0, o);
  }
  function L() {
    c !== void 0 && clearTimeout(c), h = 0, s = a = i = c = void 0;
  }
  function P() {
    return c === void 0 ? o : F(st());
  }
  function re() {
    var R = st(), B = b(R);
    if (s = arguments, i = this, a = R, B) {
      if (c === void 0)
        return f(a);
      if (d)
        return clearTimeout(c), c = setTimeout(k, e), m(a);
    }
    return c === void 0 && (c = setTimeout(k, e)), o;
  }
  return re.cancel = L, re.flush = P, re;
}
var As = Br;
const me = /* @__PURE__ */ ut(As), Or = (n) => {
  if (n[n.length - 1] === "/") {
    const e = n.split("");
    return e.splice(e.length - 1, 1), e.join("");
  }
  return n;
}, Pr = me((n) => {
  window == null || window.open(n);
}, 200), it = j.debug("MapObjectUrl");
class Er {
  constructor(e, t) {
    this.mapId = e, this.factories = t;
  }
  open(e, t) {
    if (e != null && e.linked) {
      const s = e.outlink;
      e.targetBlank ? Pr(s) : (it("open new map", s), this.factories.mapNameFromUrl.create(
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
                let a = s.outlink ? s.outlink : `${r}/${Dr(c)}`;
                it("link is", a), a = Or(a), t.give(a);
              })
            );
          })
        );
      })
    ), t;
  }
}
function Dr(n) {
  return n.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}
const Rr = j.debug("ObjectPositionBounds");
class Hr {
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
        o > a && (o = a), Rr("position", r, o), s.give({ x: r, y: o });
      })
    ), s;
  }
}
const Re = 15;
class Nr {
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
const Lt = {
  x: "width",
  y: "height"
}, nt = {
  x: 0,
  y: 1
}, Vr = {
  positive: 1,
  negative: -1
}, Qt = j.debug("ObjectsOutsideScreen");
class zr {
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
          const a = Vr[e.direction], l = r.sort(
            (p, m) => p.position[nt[e.axis]] * a - m.position[nt[e.axis]] * a
          ).filter((p) => {
            const m = p.position[nt[e.axis]] + (s ? 0 : p[Lt[e.axis]]), f = c[e.axis] * -1 + (s ? o[Lt[e.axis]]() : 0);
            return Qt(
              "mb nearest points",
              e.direction,
              "objectP=",
              m,
              "screenP=",
              f
            ), s ? m > f : m < f;
          });
          Qt("nearest", l), t.give({
            count: l.length,
            nearestObjectId: ((d = l.at(s ? -1 : 0)) == null ? void 0 : d.id) ?? ""
          });
        }
      )
    ), t;
  }
}
class Ur {
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
class Lr {
  constructor(e) {
    _(this, "idCache");
    this.idCache = e.sourceEmpty.create();
  }
  typeId(e) {
    return this.idCache.value(e), e;
  }
  give(e) {
    return this.idCache.give(e), this;
  }
}
class Qr {
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
class Wr {
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
class Kr {
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
const Gr = j.debug("MapTypeUsed");
class qr {
  constructor(e, t) {
    this.mapFile = e, this.factories = t;
  }
  check(e, t) {
    return this.mapFile.currentMap(
      this.factories.guest.create((s) => {
        const i = Object.values(s.objects).some(
          (r) => r.type === e.name
        );
        Gr("is type used", i), t.give(!i || "Тип карты использован");
      })
    ), this;
  }
}
class Jr {
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
const Wt = j.debug("ParentTypes");
class Yr {
  constructor(e, t, s) {
    this.parentNames = e, this.mapFile = t, this.factories = s;
  }
  types(e) {
    Wt("parent types requested");
    const t = this.factories.chain.create();
    return this.parentNames.names(this.factories.guestCast.create(e, t.receiveKey("parentNames"))), this.mapFile.mapFile(this.factories.guestCast.create(e, t.receiveKey("mapFile"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ parentNames: s, mapFile: i }) => {
        const r = s.slice(0, -1);
        Wt("parent names", r);
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
const Kt = j.debug("ObjectsMatchedToQuery");
class Zr {
  constructor(e, t) {
    this.map = e, this.factories = t;
  }
  objects(e, t) {
    return e.value(
      this.factories.guestInTheMiddle.create(
        t,
        me((i) => {
          i = i.toLowerCase(), this.map.objects(
            this.factories.guest.create((r) => {
              if (!i) {
                Kt("reset results"), t.give([]);
                return;
              }
              const o = r.filter(
                (c) => {
                  var a;
                  return c.name.toLowerCase().includes(i) || ((a = c.additionalName) == null ? void 0 : a.toLowerCase().includes(i)) || Object.values(c.additionalFields ?? {}).join(" ").toLowerCase().includes(i);
                }
              );
              Kt("objects in searching", o, i), t.give(o);
            })
          );
        }, 500)
      )
    ), t;
  }
}
const Xr = {
  height: 3e3,
  width: 3e3
};
class eo {
  value(e) {
    return e.give(Xr), e;
  }
}
const Gt = j.debug("StageMoveRestriction");
class to {
  constructor(e, t, s) {
    this.canvasDep = e, this.stageSize = t, this.factories = s;
  }
  position(e, t) {
    return this.canvasDep.canvas(
      this.factories.guest.create((s) => {
        this.stageSize.value(
          this.factories.guest.create((i) => {
            Gt("income position", e);
            const r = i.width - s.clientWidth, o = i.height - s.clientHeight, c = e.x * -1, a = e.y * -1;
            if (o < 0 || r < 0)
              return { x: 0, y: 0 };
            Gt("boundings", o, r, a, c), t.give({
              x: e.x > 0 ? 0 : c > r ? r * -1 : e.x,
              y: e.y > 0 ? 0 : a > o ? o * -1 : e.y
            });
          })
        );
      })
    ), t;
  }
}
const $e = j.debug("app:MapObjectsVisible");
class so {
  constructor(e, t, s, i) {
    _(this, "visibleObjectsCache", new ge());
    $e("constructor initialized");
    const r = i.chain.create();
    t.size(i.patron.create(r.receiveKey("size"))), e.position(i.patron.create(r.receiveKey("position"))), s.currentMap(i.patron.create(r.receiveKey("map"))), r.result(
      i.patron.create(
        i.guest.create(({ position: o, size: c, map: a }) => {
          const h = Object.values(a.objects);
          $e("objects come to result", h);
          const l = h.filter((d) => {
            const p = a.types[d.type] ?? {}, m = {
              width: d.width || p.width,
              height: d.height || p.height
            };
            return this.isInBounding(o, c, d.position, m);
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
const io = (n, e) => {
  const t = n.matchAll(e);
  return Array.from(t).map((s) => s[1]);
}, no = (n, e) => n.reduce((t, s) => (t[s] = e[s] || s, t), {});
class ro {
  constructor(e, t, s, i) {
    this.mapFile = t, this.mapObject = s, this.factories = i, e.objectId(this);
  }
  give(e) {
    return this.mapFile.currentMap(
      this.factories.guest.create((t) => {
        const s = t.objects[e];
        if (!s)
          return;
        const i = t.types[s.type], r = /\$\{([a-zA-Z1-9]+)\}/g, c = io(i.svg, r).filter((a) => a !== "width" && a !== "height");
        s.additionalFields = no(c, s.additionalFields ?? {}), this.mapObject.give(s);
      })
    ), this;
  }
  introduction() {
    return "patron";
  }
}
class oo {
  constructor() {
    _(this, "filledPoints", /* @__PURE__ */ new Map());
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
    const p = h && a >= 0, m = !h && c >= 0, f = h && a < 0, $ = !h && c < 0, b = { x: 0, y: 0 };
    let k = 0, F = 0;
    p ? (l += Math.round(e.width / 2), b.x = l, b.y = (t.y + i.y + s.height) / 2, k = i.x > t.x ? 1 : -1) : $ ? (d += Math.round(e.height / 2), l += +e.width, b.x = (t.x + e.width + i.x) / 2, b.y = d, F = i.y > t.y ? 1 : -1) : f ? (l += Math.round(e.width / 2), d += +e.height, b.x = l, b.y = (t.y + e.height + i.y) / 2, k = i.x > t.x ? 1 : -1) : m && (d += Math.round(e.height / 2), b.x = (t.x + i.x + s.width) / 2, b.y = d, F = i.y > t.y ? 1 : -1);
    const L = [l, d].join("-"), P = this.filledPoints.get(L) || 0;
    return this.filledPoints.set(L, P + 1), {
      point: { x: l, y: d },
      breakPoint: b,
      shift: {
        x: k * P * 10,
        y: F * P * 10
      }
    };
  }
}
class ao {
  constructor(e, t) {
    this.objectsSource = e, this.objectsMapSource = t;
  }
  value(e) {
    const t = new Ke();
    return this.objectsSource.value(new Q(e, t.receiveKey("objects"))), this.objectsMapSource.value(new Q(e, t.receiveKey("objectsMap"))), t.result(
      new Q(
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
          }), U(r, e);
        }
      )
    ), this;
  }
}
class co {
  constructor(e) {
    this.arrowDeps = e;
  }
  value(e) {
    return this.arrowDeps.value(
      new Q(e, (t) => {
        if (t.type !== "threeBreaks")
          return;
        const s = this.points(t.fromObject, t.toObject), i = this.points(t.toObject, t.fromObject);
        U({
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
    const l = c && o >= 0, d = !c && r >= 0, p = c && o < 0, m = !c && r < 0, f = { x: 0, y: 0 };
    return l ? (a += Math.round(e.width / 2), f.x = a, f.y = (e.position[1] + t.position[1] + t.height) / 2, t.position[0] > e.position[0]) : m ? (h += Math.round(e.height / 2), a += +e.width, f.x = (e.position[0] + e.width + t.position[0]) / 2, f.y = h, t.position[1] > e.position[1]) : p ? (a += Math.round(e.width / 2), h += +e.height, f.x = a, f.y = (e.position[1] + e.height + t.position[1]) / 2, t.position[1] > e.position[1]) : d && (h += Math.round(e.height / 2), f.x = (e.position[0] + t.position[0] + t.width) / 2, f.y = h, t.position[1] > e.position[1]), {
      point: { x: a, y: h },
      breakPoint: f,
      shift: {
        x: 0,
        y: 0
      }
    };
  }
}
class lo {
  constructor(e) {
    this.arrowDeps = e;
  }
  value(e) {
    return this.arrowDeps.value(
      new Q(e, (t) => {
        t.type === "twoBreaks" && U({
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
class uo {
  constructor(e, t = 10) {
    this.arrowDepsSource = e, this.centerGap = t;
  }
  value(e) {
    return this.arrowDepsSource.value(
      new Q(e, ({ fromObject: t, toObject: s }) => {
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
        U({
          fromObject: t,
          toObject: s,
          type: l < 0 || d < 0 ? "threeBreaks" : "twoBreaks"
        }, e);
      })
    ), this;
  }
}
class ho {
  constructor(e) {
    this.basePoints = e;
  }
  value(e) {
    return this.basePoints.value(
      new Q(e, (t) => {
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
        }), U(s, e);
      })
    ), this;
  }
}
const He = 15;
class po {
  constructor(e) {
    _(this, "pointGroups");
    this.basePoints = e, this.pointGroups = new ho(e);
  }
  value(e) {
    const t = new Ke();
    return this.pointGroups.value(new Q(e, t.receiveKey("pointGroups"))), this.basePoints.value(new Q(e, t.receiveKey("basePoints"))), t.result(
      new Q(e, ({ pointGroups: s, basePoints: i }) => {
        Object.values(s).forEach((r) => {
          if (r.length <= 1)
            return;
          r.sort((a, h) => i[h.arrowIndex].points[h.pointEndIndex] - i[a.arrowIndex].points[a.pointEndIndex]);
          let o = 0, c = 0;
          r.forEach((a, h) => {
            const l = i[a.arrowIndex].points[a.pointStartIndex], d = i[a.arrowIndex].points[a.pointStartIndex + 1], p = i[a.arrowIndex].points[a.pointEndIndex], m = i[a.arrowIndex].points[a.pointEndIndex + 1], f = i[a.arrowIndex].points[a.breakPointStartIndex], $ = i[a.arrowIndex].points[a.breakPointStartIndex + 1], b = l > f ? -1 : l < f ? 1 : 0, k = d > $ ? -1 : d < $ ? 1 : 0, F = l > p ? -1 : l < p ? 1 : 0, L = d > m ? -1 : d < m ? 1 : 0;
            if (b !== 0) {
              let P = 0;
              h !== 0 && (L > 0 ? (c += 1, P = c) : (o += 1, P = o)), L && (i[a.arrowIndex].points[a.pointStartIndex + 1] = i[a.arrowIndex].points[a.pointStartIndex + 1] + P * L * He), i[a.arrowIndex].points[a.breakPointStartIndex + 1] = i[a.arrowIndex].points[a.breakPointStartIndex + 1] + P * L * He;
            }
            if (k !== 0) {
              let P = 0;
              h !== 0 && (F > 0 ? (c += 1, P = c) : (o += 1, P = o)), i[a.arrowIndex].points[a.pointStartIndex] = i[a.arrowIndex].points[a.pointStartIndex] + P * F * He, i[a.arrowIndex].points[a.breakPointStartIndex] = i[a.arrowIndex].points[a.breakPointStartIndex] + P * F * He;
            }
          });
        }), U(i, e);
      })
    ), this;
  }
}
class fo {
  constructor(e) {
    this.guestAwares = e;
  }
  value(e) {
    let t = null;
    return this.guestAwares.forEach((s) => {
      s.value(
        new Q(e, (i) => {
          (!t || t === s) && (U(i, e), t = s);
        })
      );
    }), this;
  }
}
class go {
  constructor(e, t) {
    this.baseSource = e, this.targetSourceFactory = t;
  }
  value(e) {
    const t = new Ke(), s = new ge(), i = this.targetSourceFactory.create(
      s
    );
    return this.baseSource.value(
      new Q(e, (r) => {
        let o = 0;
        const c = () => {
          r[o + 1] !== void 0 ? (o = o + 1, a()) : t.resultArray(e);
        };
        function a() {
          s.give(r[o]), i.value(t.receiveKey("" + o)), i.value(c);
        }
        r[o] !== void 0 ? a() : U([], e);
      })
    ), this;
  }
}
class mo {
  constructor(e) {
    this.buildingFn = e;
  }
  create(...e) {
    return this.buildingFn(...e);
  }
}
var vo = As, Ao = ft, yo = "Expected a function";
function bo(n, e, t) {
  var s = !0, i = !0;
  if (typeof n != "function")
    throw new TypeError(yo);
  return Ao(t) && (s = "leading" in t ? !!t.leading : s, i = "trailing" in t ? !!t.trailing : i), vo(n, e, {
    leading: s,
    maxWait: e,
    trailing: i
  });
}
var wo = bo;
const Co = /* @__PURE__ */ ut(wo), { Arrow: xo } = de, _o = j.debug("MapObjectsArrows");
class $o {
  constructor(e, t, s, i, r) {
    _(this, "previouslyRenderedArrows", /* @__PURE__ */ new Map());
    this.konvaLayer = e, this.mapFile = t, this.mapDep = s, this.arrowPath = i, this.factories = r, _o("draw arrows on canvas");
    const o = this.factories.chain.create();
    this.konvaLayer.layer(this.factories.patron.create(o.receiveKey("layer"))), this.mapFile.currentMap(this.factories.patron.create(o.receiveKey("map"))), this.mapDep.objects(this.factories.patron.create(o.receiveKey("objects"))), o.result(
      this.factories.patron.create(
        this.factories.guest.create(
          Co(({ layer: c, map: a, objects: h }) => {
            this.previouslyRenderedArrows.forEach((p) => {
              p.arrow.hide();
            });
            const l = h.reduce((p, m) => (p[m.id] = m, p), {});
            new po(new go(new ao(
              new we((p) => U(h, p)),
              new we((p) => U(l, p))
            ), new mo((p) => {
              const m = new uo(p);
              return new fo([new lo(m), new co(m)]);
            }))).value((p) => {
              p.forEach((m) => {
                const f = m.key;
                if (this.previouslyRenderedArrows.has(f)) {
                  const b = this.previouslyRenderedArrows.get(f);
                  b.arrow.show(), b.arrow.points(m.points);
                  return;
                }
                const $ = new xo({
                  x: 0,
                  y: 0,
                  points: m.points,
                  pointerLength: 20,
                  pointerWidth: 10,
                  fill: "#ccc",
                  stroke: "#bbb",
                  strokeWidth: 2,
                  zIndex: 2
                });
                this.previouslyRenderedArrows.set(f, {
                  arrow: $
                }), c.add($);
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
const { Arrow: ko } = de, rt = j.debug("NewArrow"), qt = {
  width: 10,
  height: 10
};
class Fo {
  constructor(e, t, s, i) {
    _(this, "cursorGuest");
    _(this, "arrowCache");
    this.konvaLayer = e, this.cursorPosition = t, this.arrowPath = s, this.factories = i, this.cursorGuest = this.factories.sourceEmpty.create(), this.arrowCache = this.factories.sourceEmpty.create();
  }
  /**
   * Создать новую стрелку для объекта
   */
  forObject(e) {
    rt("start watch cursor"), this.cursorGuest.value(
      this.factories.guest.create((i) => {
        Ot(i);
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
                lookToGeometry: qt,
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
                shapeGeometry: qt,
                shapePosition: i
              },
              this.factories.guest.create((o) => {
                if (t) {
                  t.points(o);
                  return;
                }
                t = new ko({
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
        Ot(e);
      })
    ), this.arrowCache.value(
      this.factories.guest.create((e) => {
        e.remove();
      })
    );
  }
}
const ke = j.debug("MapObjectBackground"), Mo = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD//gATQ3JlYXRlZCB3aXRoIEdJTVD/4gKwSUNDX1BST0ZJTEUAAQEAAAKgbGNtcwQwAABtbnRyUkdCIFhZWiAH6AAMAAQADQAqAAthY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1kZXNjAAABIAAAAEBjcHJ0AAABYAAAADZ3dHB0AAABmAAAABRjaGFkAAABrAAAACxyWFlaAAAB2AAAABRiWFlaAAAB7AAAABRnWFlaAAACAAAAABRyVFJDAAACFAAAACBnVFJDAAACFAAAACBiVFJDAAACFAAAACBjaHJtAAACNAAAACRkbW5kAAACWAAAACRkbWRkAAACfAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACQAAAAcAEcASQBNAFAAIABiAHUAaQBsAHQALQBpAG4AIABzAFIARwBCbWx1YwAAAAAAAAABAAAADGVuVVMAAAAaAAAAHABQAHUAYgBsAGkAYwAgAEQAbwBtAGEAaQBuAABYWVogAAAAAAAA9tYAAQAAAADTLXNmMzIAAAAAAAEMQgAABd7///MlAAAHkwAA/ZD///uh///9ogAAA9wAAMBuWFlaIAAAAAAAAG+gAAA49QAAA5BYWVogAAAAAAAAJJ8AAA+EAAC2xFhZWiAAAAAAAABilwAAt4cAABjZcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltjaHJtAAAAAAADAAAAAKPXAABUfAAATM0AAJmaAAAmZwAAD1xtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAEcASQBNAFBtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEL/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAAeAB4DAREAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAwUEAAj/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAH1SCMTDaCMTiuCMTDgxDGf/8QAHhAAAgIBBQEAAAAAAAAAAAAAAAMBAgQFExUyMxL/2gAIAQEAAQUCG9TUPHdga2PndgzrxZQ3qah48gsvnUtHILMrKq5f/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAwEBPwEH/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAgEBPwEH/8QAHhAAAgIBBQEAAAAAAAAAAAAAAAECMXIQQUKSsVH/2gAIAQEABj8CFkvdFkVLqzla4v6VLqxXe60WS90WRUipWipCSTvc/8QAIxAAAgADCAMAAAAAAAAAAAAAAAEQUfAhMUGhscHR8RFhcf/aAAgBAQABPyErMkMi0ZW2wylmzHorbYSSX3Vg5wrMkMi0Z0a5FVK8Llg05nRrkRmteVg//9oADAMBAAIAAwAAABCCQQSCSST/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAEDAQE/EAf/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAECAQE/EAf/xAAeEAEAAQQCAwAAAAAAAAAAAAABIRARIDEAQVFxkf/aAAgBAQABPxDEMgTA4U0lpO6EwKiFh/YAyDIEAZSTdCnwUQAma0AtZOl88//Z";
class So {
  constructor(e, t, s, i) {
    _(this, "mapNameCache");
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
            ke("grid example", r), i.src = Mo, i.onload = () => {
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
const To = j.debug("Breadcrumbs");
class Io {
  constructor(e, t, s) {
    this.parentNames = e, this.mapFile = t, this.factories = s;
  }
  list(e) {
    const t = this.factories.chain.create();
    return this.parentNames.names(this.factories.guestCast.create(e, t.receiveKey("names"))), this.mapFile.mapFile(this.factories.guestCast.create(e, t.receiveKey("mapFile"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ names: s, mapFile: i }) => {
        To("map id", s, i), e.give(
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
const Jt = j.debug("CursorWithObjects");
class jo {
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
        r ? (Jt("crossed with", r), e.give({
          x: r.position[0] + r.width / 2,
          y: r.position[1] + r.height / 2
        })) : (Jt("cursor pos", s), e.give(s));
      })
    ), this;
  }
}
class Bo {
  constructor(e, t = 768) {
    this.windowWidth = e, this.mobileLimit = t;
  }
  value(e) {
    return this.windowWidth.value(
      new Q(e, (t) => {
        U({
          isMobile: t <= this.mobileLimit,
          isDesktop: t > this.mobileLimit
        }, e);
      })
    ), this;
  }
}
const Yt = j.debug("Drawer");
class Oo {
  constructor(e, t) {
    _(this, "drawerNameCache");
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
class Po {
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
class Eo {
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
const Zt = j.debug("app:MiniMap"), Xt = 130;
class Do {
  constructor(e, t, s, i) {
    _(this, "theSize");
    _(this, "thePoints");
    _(this, "viewportSizeCache");
    this.map = e, this.layer = t, this.stageSize = s, this.factories = i, this.theSize = i.sourceEmpty.create(), this.thePoints = i.sourceEmpty.create(), this.viewportSizeCache = i.sourceEmpty.create();
    const r = i.chain.create();
    e.objects(i.patron.create(r.receiveKey("objects"))), t.layer(i.patron.create(r.receiveKey("layer"))), s.value(i.patron.create(r.receiveKey("size"))), r.result(
      i.patron.create(
        i.guest.create(({ layer: o, size: c, objects: a }) => {
          const h = Xt / c.width, l = {
            width: Math.round(o.width() * h),
            height: Math.round(o.height() * h)
          };
          this.viewportSizeCache.give(l);
          const d = {
            width: Math.round(c.width * h),
            height: Math.round(c.height * h)
          };
          this.theSize.give(d);
          const p = a.map((m) => ({
            id: m.id,
            x: Math.round(m.position[0] * h),
            y: Math.round(m.position[1] * h),
            width: Math.round(m.width * h),
            height: Math.round(m.height * h)
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
        const r = Xt / s.width, o = {
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
const es = j.debug("Modal");
class Ro {
  constructor(e, t) {
    _(this, "modalNameCache");
    this.keyboard = e, this.factories = t, es("modal created"), this.modalNameCache = t.cache.create(""), this.keyboard.pressed(
      this.factories.patron.create(
        this.factories.guest.create((s) => {
          es("new key in modal", s), s === "Escape" && this.give("");
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
class Ho {
  constructor(e) {
    _(this, "messageCache");
    _(this, "notificationLifetimeDelay", 3500);
    _(this, "lastTimerHead", null);
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
const Fe = j.debug("ObjectGeometryFix");
class No {
  constructor(e, t, s, i) {
    _(this, "innerReceive");
    this.mapFile = t, this.map = s, this.factories = i, e.objects(i.patron.create(this)), this.innerReceive = me((r) => {
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
              const m = o.types[p.type];
              p.width = m.width, p.height = m.height;
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
const Me = j.debug("MapObjectsRectsPatron");
class Vo {
  constructor(e, t, s, i, r, o, c, a, h) {
    _(this, "previouslyRenderedRects", /* @__PURE__ */ new Map());
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
                  const m = this.previouslyRenderedRects.get(c);
                  m.width(h), m.height(l), m.x(+c.position[0]), m.y(+c.position[1]), m.show();
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
                    this.factories.guest.create((m) => {
                      this.mapObject.give({
                        ...c,
                        position: [m.x, m.y]
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
                    this.factories.guest.create((m) => {
                      this.mapObjectForRendering.give({
                        ...c,
                        position: [m.x, m.y]
                      });
                    })
                  );
                });
                const p = () => {
                  Me("object clicked with id", c.id), this.mapObjectCurrent.give(c.id);
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
class zo {
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
const Uo = j.debug("StagePosition");
class Lo {
  constructor(e) {
    this.stageMove = e;
  }
  give(e) {
    return Uo("received position", e), this.stageMove.move(e), this;
  }
}
class Qo {
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
class Wo {
  constructor() {
    _(this, "source", new he({
      height: window.innerHeight,
      width: window.innerWidth
    }));
    const e = new ResizeObserver(me((s) => {
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
const ts = j.debug("Zindex");
class Ko {
  constructor(e) {
    _(this, "fnsCache");
    this.factories = e, this.fnsCache = e.cache.create([]), this.fnsCache.value(
      e.patron.create(
        e.guest.create(
          me((t) => {
            ts("zindex fns run"), t.forEach((s) => s());
          }, 50)
        )
      )
    );
  }
  give(e) {
    return ts("zindex received value"), this.fnsCache.value(
      this.factories.guest.create((t) => {
        this.fnsCache.give(t.concat(e));
      })
    ), this;
  }
}
const ss = j.debug("app:BrowserCanvas");
class Go {
  constructor(e) {
    _(this, "canvasCache");
    this.factories = e, this.canvasCache = e.sourceEmpty.create();
  }
  canvas(e) {
    return this.canvasCache.value(e), this;
  }
  size(e) {
    return this.canvasCache.value(
      this.factories.guestInTheMiddle.create(e, (t) => {
        const s = t.width || t.clientWidth, i = t.height || t.clientHeight;
        ss("canvas size", s, i), e.give({
          height: i,
          width: s
        });
      })
    ), this;
  }
  give(e) {
    return ss("receive new canvas", e), this.canvasCache.give(e), this;
  }
}
const qo = j.debug("Cursor");
class Jo {
  constructor(e, t) {
    _(this, "cursorPool");
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
      qo("move cursor fired", r), this.cursorPool.give(r);
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
class Yo {
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
const Ne = j.debug("ControlCombo");
class Zo {
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
const Se = j.debug("Keyboard");
class Xo {
  constructor(e) {
    _(this, "pressedPool");
    _(this, "combinationsPool");
    Se("keyboard created"), this.pressedPool = e.pool.create(this), this.combinationsPool = e.pool.create(this), window == null || window.addEventListener("keyup", (t) => {
      Se("keyboard pressed", t.key), this.pressedPool.give(t.key);
    }), Rs({
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
const is = j.debug("app:konva:KonvaLayer");
class ea {
  constructor(e, t, s, i) {
    _(this, "guestChain");
    _(this, "positionCache");
    _(this, "layerCache");
    this.canvasDep = e, this.stageMoveRestriction = s, this.factories = i, this.positionCache = i.cache.create({
      x: 0,
      y: 0
    }), this.guestChain = i.chain.create(), this.layerCache = i.sourceEmpty.create(), this.canvasDep.canvas(i.patron.create(this.guestChain.receiveKey("canvas"))), t.value(this.guestChain.receiveKey("stageSize")), this.guestChain.result(
      i.guest.create(
        ({ canvas: r }) => {
          is("create new konva stage");
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
            is("new position", l), this.positionCache.give(l);
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
class ta {
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
const sa = j.debug("position");
class ia {
  constructor(e, t, s, i, r) {
    this.layer = e, this.canvas = t, this.stageSize = s, this.stageMoveRestriction = i, this.factories = r;
  }
  move(e) {
    sa("move stage to new point", e.position), this.stageSize.value(
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
const x = Y(), Ge = new Xo(x), ys = new he({
  readonly: !1,
  presets: {}
}), na = new Ro(Ge, x), bs = new Oo(Ge, x), qe = new Ho(x), ue = new wn(x), ws = x.sourceEmpty.create(), z = new $n(ws, ue, x), ra = new Cn(z), oa = new Oi(ra), gt = new Fn(z, ue, x), mt = new ps(gt, ue, x), aa = new fs(mt, gt, x), ie = new ps(z, ue, x), ca = new we((n) => {
  z.currentMap(new Ue(n));
}), Je = new Mn(bs, x), la = new Lr(x), ua = new Ur(z, ie, x), ve = new Go(x), Ae = new eo(), Cs = new to(ve, Ae, x), ne = new ea(ve, Ae, Cs, x), da = new Ko(x), ha = new So(ne, z, da, x), xe = new fs(ie, z, x), pa = new Bn(
  ie,
  z,
  [new pt(qe, new Sn(z, x), x)],
  x
), fa = new ta(ne, x), ga = new Tn(ie, xe, ve, fa, x), xs = new qr(z, x), _s = new Kr(
  ie,
  z,
  [
    new pt(
      qe,
      new Jr(xs, x),
      x
    )
  ],
  x
), ma = new Wr(
  ie,
  z,
  [new pt(qe, xs, x)],
  x
), va = new Qr(_s), Ye = new so(ne, ve, gt, x), Aa = new No(
  Ye,
  z,
  ie,
  x
), ya = new Vo(
  ne,
  z,
  xe,
  Ye,
  Je,
  aa,
  new Nr(new Hr(Ae, x), x),
  ys,
  x
), ba = new Jo(ne, x), wa = new jo(Ye, ba, x), $s = new oo(), ks = new Fo(ne, wa, $s, x), Ca = new $o(ne, z, mt, $s, x), xa = new Do(mt, ne, Ae, x), _a = new Pn(
  Je,
  ie,
  xe,
  ks,
  x
), $a = new zo(z, ve, ne, x), ka = new ro(
  Je,
  z,
  xe,
  x
), Fa = new _n(z, ue, x), Ma = new jn(xe), Sa = new Po(), vt = new In(ue, x), Ta = new Io(vt, z, x), Ia = new Er(ue, x), ja = new Yr(vt, z, x), Ba = new Zo(Ge, x), Oa = new Eo(z, x), Fs = new ia(ne, ve, Ae, Cs, x), Pa = new Lo(Fs), Ea = new Qo(Fs, x), Da = new Zr(ie, x), Ra = new xn(z, ie, ue, x), Ha = new zr(ie, Ae, ne, x), Ms = new ge();
new Yo(Ms);
const Na = new Wo(), Va = new we((n) => {
  Na.value(
    new Q(n, (e) => {
      U(e.width, n);
    })
  );
}), za = new Bo(Va), Ua = {
  mapCurrentID: ue,
  mapFile: z,
  mapCurrent: ie,
  mapCurrentSource: ca,
  mapRemoved: Fa,
  mapSettings: ua,
  mapObject: xe,
  mapObjectRemoved: pa,
  mapType: _s,
  mapTypeRemoved: ma,
  mapTypeNew: va,
  mapObjectsVisible: Ye,
  mapObjectCurrent: Je,
  mapObjectNew: ga,
  mapObjectsLink: _a,
  mapTypeCurrent: la,
  mapRects: ya,
  mapBackground: ha,
  mapObjectArrows: Ca,
  mapObjectsGeometryFix: Aa,
  canvas: ve,
  miniMap: xa,
  notification: qe,
  modal: na,
  drawer: bs,
  konvaLayer: ne,
  resizing: $a,
  objectAdditionalFieldsFix: ka,
  mapObjectRelationRemoved: Ma,
  fps: Sa,
  breadcrumbs: Ta,
  mapObjectUrl: Ia,
  keyboard: Ge,
  parentNames: vt,
  parentTypes: ja,
  controlCombo: Ba,
  menu: Oa,
  stagePosition: Pa,
  stagePositionByObjectId: Ea,
  objectsMatchedToQuery: Da,
  stageSize: Ae,
  mapHistory: Ra,
  fileContent: ws,
  newArrow: ks,
  objectsOutsideScreen: Ha,
  settings: ys,
  documentTitle: oa,
  sidebarDraggable: Ms,
  device: za
}, W = () => Ua;
class I {
  constructor(e = void 0) {
    _(this, "innerRef");
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
const La = { key: 0 }, Qa = { class: "flex-grow overflow-y-auto" }, Wa = {
  key: 1,
  class: "flex gap-1"
}, At = /* @__PURE__ */ E({
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
    }, { drawer: o, device: c } = W(), a = () => {
      o.give(""), s("close");
    }, h = o.isOpenedByName(t.name, new I()).ref();
    return c.value(new ht((l) => {
      l.isMobile ? (r.ltr = r.ltr.replace("[50%]", "[100%]"), r.rtl = r.rtl.replace("[50%]", "[100%]")) : (r.ltr = r.ltr.replace("[100%]", "[50%]"), r.rtl = r.rtl.replace("[100%]", "[50%]"));
    })), (l, d) => (g(), V(os, { name: "fade" }, {
      default: w(() => [
        u(h) ? (g(), A("div", {
          key: 0,
          class: te(i.value),
          onClick: a
        }, [
          y("div", {
            class: te(["absolute bg-white h-full p-3 flex flex-col overflow-hidden", r[n.direction]]),
            onClick: d[0] || (d[0] = Ce(() => {
            }, ["stop"]))
          }, [
            l.$slots.header ? (g(), A("div", La, [
              se(l.$slots, "header", { class: "BaseDrawer-Header" })
            ])) : T("", !0),
            y("div", Qa, [
              se(l.$slots, "default")
            ]),
            l.$slots.footer ? (g(), A("div", Wa, [
              se(l.$slots, "footer")
            ])) : T("", !0)
          ], 2)
        ], 2)) : T("", !0)
      ]),
      _: 3
    }));
  }
}), G = /* @__PURE__ */ E({
  __name: "BaseIcon",
  props: {
    icon: {
      type: String
    }
  },
  setup(n) {
    const e = {
      "fa-bars": ii,
      "fa-bars-staggered": si,
      "fa-text-width": ti,
      "fa-search": ei,
      "fa-history": Xs,
      "fa-plus-square": Zs,
      "fa-cog": Ys,
      "fa-file-text": Js,
      "fa-rotate-left": qs,
      "fa-rotate-right": Gs,
      "fa-map": Ks,
      "fa-close": Ws,
      "fa-arrow-left": Qs,
      "fa-arrow-right": Ls,
      "fa-arrow-down": Us,
      "fa-arrow-up": zs,
      "fa-share-nodes": Vs
    };
    return (t, s) => (g(), V(u(Ns), {
      icon: e[n.icon]
    }, null, 8, ["icon"]));
  }
}), Ka = /* @__PURE__ */ y("h2", { class: "text-lg font-bold" }, " Карты в файле ", -1), Ga = ["onClick"], qa = /* @__PURE__ */ E({
  __name: "AppFileMaps",
  setup(n) {
    const {
      mapFile: e,
      mapCurrentID: t,
      drawer: s,
      mapRemoved: i
    } = W(), r = e.mapFile(new I()).ref(), o = t.id(new I()).ref(), c = (a) => {
      confirm("Вы уверены?") && i.give(a);
    };
    return (a, h) => (g(), V(At, {
      direction: "rtl",
      name: "fileMaps"
    }, {
      header: w(() => [
        Ka
      ]),
      default: w(() => [
        y("div", null, [
          (g(!0), A(K, null, q(u(r), (l, d) => (g(), A("div", {
            key: d,
            class: "flex items-center gap-2"
          }, [
            y("a", {
              href: "#",
              class: te({ "font-bold": u(o) === d }),
              onClick: Ce((p) => {
                u(t).give(d), u(s).give("");
              }, ["prevent"])
            }, C(l.settings.title), 11, Ga),
            v(G, {
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
}), Ja = { class: "AppMenuObject" }, Ya = {
  key: 0,
  class: "AppMenuObject-Empty"
}, Za = {
  key: 1,
  class: "flex flex-col gap-1"
}, Xa = ["onClick"], ec = ["innerHTML"], tc = /* @__PURE__ */ E({
  __name: "AppMenuObject",
  setup(n) {
    const {
      controlCombo: e,
      drawer: t,
      menu: s,
      stagePosition: i
    } = W(), { guest: r, patron: o } = Y(), c = s.menuObjects(new I()).ref();
    return e.happened(
      "KeyM",
      o.create(r.create(() => {
        t.give("menu");
      }))
    ), (a, h) => (g(), V(At, {
      direction: "rtl",
      name: "menu"
    }, {
      default: w(() => [
        y("div", Ja, [
          u(c).length ? (g(), A("div", Za, [
            (g(!0), A(K, null, q(u(c), (l) => (g(), A("a", {
              key: l.id,
              class: "AppMenuObject-Item",
              href: "#",
              onClick: Ce((d) => {
                u(i).give(l), u(t).give("");
              }, ["prevent"])
            }, [
              y("span", {
                innerHTML: l.additionalName ? l.additionalName : l.name
              }, null, 8, ec)
            ], 8, Xa))), 128))
          ])) : (g(), A("div", Ya, C(a.$t("appMenuObject.noItems")), 1))
        ])
      ]),
      _: 1
    }));
  }
}), D = /* @__PURE__ */ E({
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
    return t.push(""), (s, i) => (g(), A("button", {
      type: "button",
      class: te(t)
    }, [
      se(s.$slots, "default")
    ]));
  }
}), sc = {
  key: 0,
  title: "Назад",
  class: "absolute text-white left-0 top-0 -ml-5 flex justify-center items-center bg-primary/70 hover:bg-primary-second/70 cursor-pointer w-5"
}, ic = {
  key: 1,
  class: "BaseModal-Header"
}, nc = { class: "overflow-y-auto flex-grow" }, rc = {
  key: 2,
  class: "BaseModal-Footer"
}, ye = /* @__PURE__ */ E({
  __name: "BaseModal",
  props: {
    name: {
      type: String,
      required: !0
    }
  },
  setup(n) {
    const { modal: e } = W(), t = n, s = e.isOpenedByName(t.name, new I()).ref(), i = [], r = () => {
      e.give("");
    };
    return (o, c) => (g(), V(os, { name: "fade" }, {
      default: w(() => [
        u(s) ? (g(), A("div", {
          key: 0,
          class: "absolute rounded-main overflow-y-auto flex justify-center items-center top-0 left-0 bg-black/10 z-20 h-full w-full",
          onClick: r
        }, [
          y("div", {
            class: "w-full relative flex flex-col max-w-[800px] max-h-[90%] bg-white p-3",
            onClick: c[0] || (c[0] = Ce(() => {
            }, ["stop"]))
          }, [
            i.length > 1 ? (g(), A("div", sc, " < ")) : T("", !0),
            y("div", {
              title: "Закрыть",
              class: "e2e-modal-close absolute text-white right-0 top-0 -mr-5 flex justify-center items-center bg-danger/70 hover:bg-danger-second/70 cursor-pointer w-5",
              onClick: r
            }, " × "),
            o.$slots.header ? (g(), A("div", ic, [
              se(o.$slots, "header")
            ])) : T("", !0),
            y("div", nc, [
              se(o.$slots, "default")
            ]),
            o.$slots.footer ? (g(), A("div", rc, [
              se(o.$slots, "footer")
            ])) : T("", !0)
          ])
        ])) : T("", !0)
      ]),
      _: 3
    }));
  }
}), oc = { class: "AppPresets" }, ac = /* @__PURE__ */ y("div", { class: "text-md font-bold mb-2" }, "Общие", -1), cc = { class: "flex flex-col gap-2" }, lc = { class: "text-md font-bold mb-1" }, uc = { class: "flex gap-2 flex-wrap items-end" }, dc = { class: "AppTypesParent-ItemTitle" }, hc = ["innerHTML"], pc = /* @__PURE__ */ E({
  __name: "AppPresets",
  setup(n) {
    const {
      svgMapTypeImage: e
    } = Y(), { mapType: t, settings: s } = W(), i = new I();
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
    return (o, c) => (g(), V(ye, { name: "presets" }, {
      default: w(() => [
        y("div", oc, [
          ac,
          y("div", cc, [
            (g(!0), A(K, null, q(r.value, (a, h) => (g(), A("div", { key: h }, [
              y("h3", lc, C(h), 1),
              y("div", uc, [
                (g(!0), A(K, null, q(a, (l) => (g(), A("div", {
                  key: l.preset.name,
                  class: "flex flex-col gap-2"
                }, [
                  y("div", dc, C(l.preset.name), 1),
                  y("div", {
                    class: "AppTypesParent-ItemImage",
                    innerHTML: l.image,
                    style: ce(`width:${l.preset.width}px;height:${l.preset.height}px`)
                  }, null, 12, hc),
                  v(D, {
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
}), ae = /* @__PURE__ */ E({
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
      me(() => {
        t.autofocus && i.value.focus();
      }, 500)
    );
    const r = Qe(t, "modelValue", s);
    return (o, c) => Le((g(), A("input", {
      ref_key: "input",
      ref: i,
      "onUpdate:modelValue": c[0] || (c[0] = (a) => Be(r) ? r.value = a : null),
      class: "block rounded-main w-full p-2 border border-solid border-body-dark",
      type: "text"
    }, null, 512)), [
      [as, u(r)]
    ]);
  }
});
class yt {
  constructor(e) {
    _(this, "pool", new We(this));
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
const fc = { class: "AppSearch" }, gc = {
  key: 0,
  class: "AppSearch-Items"
}, mc = ["onClick"], vc = ["innerHTML"], Ac = ["innerHTML"], yc = ["innerHTML"], bc = { key: 1 }, wc = { key: 2 }, Cc = /* @__PURE__ */ E({
  __name: "AppSearch",
  setup(n) {
    const {
      objectsMatchedToQuery: e,
      controlCombo: t,
      modal: s,
      stagePosition: i
    } = W(), { guest: r, patron: o } = Y(), c = ee(), a = j.debug("app:AppSearch");
    s.isOpenedByName(
      "search",
      o.create(r.create((d) => {
        setTimeout(() => {
          d && c.value && (a("search is opened", d), c.value.$el.focus());
        }, 500);
      }))
    );
    const h = ee(""), l = e.objects(
      new yt(h),
      new I([])
    ).ref();
    return t.happened(
      "KeyF",
      o.create(r.create(() => {
        s.give("search");
      }))
    ), (d, p) => (g(), V(ye, { name: "search" }, {
      default: w(() => [
        y("div", fc, [
          v(ae, {
            ref_key: "inputRef",
            ref: c,
            modelValue: h.value,
            "onUpdate:modelValue": p[0] || (p[0] = (m) => h.value = m),
            class: "mb-2 e2e-query-input",
            placeholder: d.$t("general.specifyQuery")
          }, null, 8, ["modelValue", "placeholder"]),
          u(l).length ? (g(), A("div", gc, [
            (g(!0), A(K, null, q(u(l), (m) => (g(), A("div", {
              key: m.name,
              class: "cursor-pointer",
              onClick: Ce((f) => {
                u(i).give(m), u(s).give("");
              }, ["prevent"])
            }, [
              y("b", {
                class: "AppSearch-ItemName",
                innerHTML: m.name
              }, null, 8, vc),
              m.additionalName ? (g(), A("b", {
                key: 0,
                class: "AppSearch-ItemName",
                innerHTML: m.additionalName
              }, null, 8, Ac)) : T("", !0),
              m.additionalFields ? (g(), A("div", {
                key: 1,
                innerHTML: Object.values(m.additionalFields).join(" ")
              }, null, 8, yc)) : T("", !0)
            ], 8, mc))), 128))
          ])) : h.value ? (g(), A("div", bc, C(d.$t("general.noResults")), 1)) : (g(), A("div", wc, C(d.$t("general.resultsWillBeHere")), 1))
        ])
      ]),
      _: 1
    }));
  }
}), xc = { class: "AppTypes" }, _c = /* @__PURE__ */ y("div", { class: "text-md font-bold mb-2" }, "Родительские типы", -1), $c = { class: "flex gap-2 items-end" }, kc = { class: "AppTypesParent-ItemTitle" }, Fc = ["innerHTML"], Mc = /* @__PURE__ */ E({
  __name: "AppTypesParent",
  setup(n) {
    const { parentTypes: e, mapType: t } = W(), { svgMapTypeImage: s } = Y(), i = e.types(new I()).ref(), r = Ie(() => {
      var o;
      return (o = i.value) == null ? void 0 : o.map((c) => ({
        type: c,
        image: s.create(c).markup()
      })).sort((c, a) => +(c.type.name >= a.type.name));
    });
    return (o, c) => (g(), V(ye, { name: "parentTypes" }, {
      default: w(() => [
        y("div", xc, [
          _c,
          y("div", $c, [
            (g(!0), A(K, null, q(r.value, (a) => (g(), A("div", {
              key: a.type.name,
              class: "flex flex-col gap-2"
            }, [
              y("div", kc, C(a.type.name), 1),
              y("div", {
                class: "AppTypesParent-ItemImage",
                innerHTML: a.image,
                style: ce(`width:${a.type.width}px;height:${a.type.height}px`)
              }, null, 12, Fc),
              v(D, {
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
class Ss {
  constructor(e, t = void 0) {
    _(this, "innerRef");
    this.executor = e, this.innerRef = ee(t);
  }
  ref() {
    return this.executor(this.innerRef), this.innerRef;
  }
}
const Sc = { class: "flex gap-2" }, ot = /* @__PURE__ */ E({
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
    return (r, o) => (g(), A("label", Sc, [
      Le(y("input", {
        "onUpdate:modelValue": o[0] || (o[0] = (c) => Be(i) ? i.value = c : null),
        type: "checkbox"
      }, null, 512), [
        [Bs, u(i)]
      ]),
      r.$slots.default ? se(r.$slots, "default", { key: 0 }) : (g(), A(K, { key: 1 }, [
        O(C(n.label), 1)
      ], 64))
    ]));
  }
}), Ze = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [s, i] of e)
    t[s] = i;
  return t;
}, Tc = {}, Ic = { class: "text-sm font-bold" };
function jc(n, e) {
  return g(), A("div", Ic, [
    se(n.$slots, "default")
  ]);
}
const J = /* @__PURE__ */ Ze(Tc, [["render", jc]]), Bc = {}, Oc = { class: "mb-2" };
function Pc(n, e) {
  return g(), A("div", Oc, [
    se(n.$slots, "default")
  ]);
}
const X = /* @__PURE__ */ Ze(Bc, [["render", Pc]]), Ec = { class: "rounded-main p-2 border border-solid border-body-dark" }, Dc = { class: "flex gap-2 p-2 bg-white border border-solid border-body-dark rounded-main" }, Ve = /* @__PURE__ */ E({
  __name: "BaseEditor",
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = n, s = e, i = ni({
      content: t.modelValue,
      extensions: [
        ai
      ],
      onUpdate: () => {
        i.value && s("update:modelValue", i.value.getHTML());
      }
    });
    return Os(() => {
      var r;
      (r = i.value) == null || r.destroy();
    }), je(() => t.modelValue, (r) => {
      !i.value || i.value.getHTML() === r || i.value.commands.setContent(r, !1);
    }), (r, o) => (g(), A("div", Ec, [
      v(u(ri), { editor: u(i) }, null, 8, ["editor"]),
      u(i) ? (g(), V(u(oi), {
        key: 0,
        editor: u(i),
        "tippy-options": { duration: 100 }
      }, {
        default: w(() => [
          y("div", Dc, [
            y("button", {
              onClick: o[0] || (o[0] = (c) => u(i).chain().focus().toggleBold().run()),
              class: te({ "font-bold": u(i).isActive("bold") })
            }, " bold ", 2),
            y("button", {
              onClick: o[1] || (o[1] = (c) => u(i).chain().focus().toggleItalic().run()),
              class: te({ "font-bold": u(i).isActive("italic") })
            }, " italic ", 2),
            y("button", {
              onClick: o[2] || (o[2] = (c) => u(i).chain().focus().toggleStrike().run()),
              class: te({ "font-bold": u(i).isActive("strike") })
            }, " strike ", 2)
          ])
        ]),
        _: 1
      }, 8, ["editor"])) : T("", !0)
    ]));
  }
}), Rc = ["value"], Hc = /* @__PURE__ */ E({
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
    return (r, o) => Le((g(), A("select", {
      label: "select",
      "onUpdate:modelValue": o[0] || (o[0] = (c) => Be(i) ? i.value = c : null),
      class: "block bg-white rounded-main w-full p-2 border border-solid border-body-dark"
    }, [
      (g(!0), A(K, null, q(t.items, (c) => (g(), A("option", {
        key: c[t.optionId],
        value: c[t.optionId]
      }, C(c[t.optionLabel]), 9, Rc))), 128))
    ], 512)), [
      [Ps, u(i)]
    ]);
  }
}), Nc = { class: "text-lg font-bold" }, Vc = {
  key: 0,
  class: "flex gap-2 items-center"
}, zc = {
  key: 1,
  class: "flex gap-2 mt-2"
}, Uc = { key: 0 }, Lc = { key: 1 }, Qc = {
  key: 0,
  class: "flex flex-col gap-2"
}, Wc = { class: "FormObject-Inner" }, Kc = { class: "FormObject-Row" }, Gc = { class: "FormObject-Row" }, qc = { class: "FormObject-Row" }, Jc = { class: "my-2" }, Yc = { class: "FormObject-Title" }, Zc = { class: "FormObject-Row" }, Xc = { class: "FormObject-Title" }, el = { class: "FormObject-Row" }, tl = {
  key: 0,
  class: "FormObject-ArrowName"
}, sl = { class: "py-3 flex gap-1" }, il = /* @__PURE__ */ E({
  __name: "FormObject",
  setup(n) {
    const e = dt("FormObject"), {
      mapObjectCurrent: t,
      mapFile: s,
      mapObject: i,
      mapCurrent: r,
      drawer: o,
      mapObjectRemoved: c,
      mapObjectRelationRemoved: a,
      mapObjectUrl: h,
      controlCombo: l
    } = W(), {
      patron: d,
      chain: p,
      guest: m
    } = Y(), f = new Ss(() => {
      const B = p.create();
      t.objectId(d.create(B.receiveKey("objectId"))), s.currentMap(d.create(B.receiveKey("map"))), B.result(d.create(
        m.create(({ map: S, objectId: M }) => {
          e("object opened", M), f.value = S.objects[M];
        })
      ));
    }).ref(), $ = r.types(new I()).ref(), b = s.currentMap(new I()).ref(), k = new yt(f), F = h.url(k, new I()).ref(), L = () => {
      t.give(""), o.give("");
    }, P = () => {
      c.give(f.value), L();
    }, re = () => {
      i.give({
        ...f.value,
        outlink: f.value.outlink || F.value
      }), L();
    }, R = (B) => {
      a.give({
        index: B,
        object: f.value
      });
    };
    return l.happenedConditional(
      "KeyS",
      o.openedByName("object"),
      d.create(m.create(re))
    ), (B, S) => (g(), V(At, {
      name: "object",
      onClose: L
    }, {
      header: w(() => [
        y("h2", Nc, C(B.$t("general.mapObject")), 1),
        u(f) ? (g(), A("small", Vc, [
          y("span", null, " ID #" + C(u(f).id), 1)
        ])) : T("", !0),
        u(f) ? (g(), A("div", zc, [
          u(f).createTimestamp ? (g(), A("div", Uc, " Создан: " + C(new Date(u(f).createTimestamp).toLocaleString()), 1)) : T("", !0),
          u(f).changeTimestamp ? (g(), A("div", Lc, " Изменен: " + C(new Date(u(f).changeTimestamp).toLocaleString()), 1)) : T("", !0)
        ])) : T("", !0)
      ]),
      footer: w(() => [
        y("div", sl, [
          v(D, {
            type: "success",
            onClick: re
          }, {
            default: w(() => [
              O(C(B.$t("general.save")), 1)
            ]),
            _: 1
          }),
          v(D, {
            type: "danger",
            onClick: P
          }, {
            default: w(() => [
              O(C(B.$t("general.delete")), 1)
            ]),
            _: 1
          }),
          v(D, { onClick: L }, {
            default: w(() => [
              O(C(B.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: w(() => [
        u(f) ? (g(), A("div", Qc, [
          y("div", Wc, [
            y("div", Kc, [
              v(ot, {
                modelValue: u(f).linked,
                "onUpdate:modelValue": S[0] || (S[0] = (M) => u(f).linked = M),
                label: B.$t("general.nameAsLink")
              }, null, 8, ["modelValue", "label"])
            ]),
            u(f).linked ? (g(), A(K, { key: 0 }, [
              v(J, null, {
                default: w(() => [
                  O(C(B.$t("general.outerLink")), 1)
                ]),
                _: 1
              }),
              y("div", Gc, [
                v(ae, {
                  "model-value": u(f).outlink || u(F),
                  "onUpdate:modelValue": S[1] || (S[1] = (M) => u(f).outlink = M)
                }, null, 8, ["model-value"])
              ]),
              y("div", qc, [
                v(ot, {
                  modelValue: u(f).targetBlank,
                  "onUpdate:modelValue": S[2] || (S[2] = (M) => u(f).targetBlank = M),
                  label: B.$t("general.inNewTab")
                }, null, 8, ["modelValue", "label"])
              ])
            ], 64)) : T("", !0),
            (g(!0), A(K, null, q(u(f).additionalFields, (M, Z) => (g(), V(X, {
              class: "mb-2",
              key: Z
            }, {
              default: w(() => [
                v(J, { class: "mb-1" }, {
                  default: w(() => [
                    O(C(Z), 1)
                  ]),
                  _: 2
                }, 1024),
                v(Ve, {
                  modelValue: u(f).additionalFields[Z],
                  "onUpdate:modelValue": (le) => u(f).additionalFields[Z] = le
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              _: 2
            }, 1024))), 128)),
            v(X, null, {
              default: w(() => [
                v(J, null, {
                  default: w(() => [
                    O(C(B.$t("general.topName")), 1)
                  ]),
                  _: 1
                }),
                v(Ve, {
                  modelValue: u(f).additionalName,
                  "onUpdate:modelValue": S[3] || (S[3] = (M) => u(f).additionalName = M)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            v(X, null, {
              default: w(() => [
                v(J, null, {
                  default: w(() => [
                    O(C(B.$t("general.bottomName")), 1)
                  ]),
                  _: 1
                }),
                v(Ve, {
                  modelValue: u(f).name,
                  "onUpdate:modelValue": S[4] || (S[4] = (M) => u(f).name = M)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            v(X, null, {
              default: w(() => [
                v(J, null, {
                  default: w(() => [
                    O(C(B.$t("general.description")), 1)
                  ]),
                  _: 1
                }),
                v(Ve, {
                  modelValue: u(f).description,
                  "onUpdate:modelValue": S[5] || (S[5] = (M) => u(f).description = M)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            v(X, null, {
              default: w(() => [
                v(J, null, {
                  default: w(() => [
                    O(" Z-Index ")
                  ]),
                  _: 1
                }),
                v(ae, {
                  modelValue: u(f).zindex,
                  "onUpdate:modelValue": S[6] || (S[6] = (M) => u(f).zindex = M),
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            v(X, null, {
              default: w(() => [
                v(J, null, {
                  default: w(() => [
                    O(" Width ")
                  ]),
                  _: 1
                }),
                v(ae, {
                  modelValue: u(f).width,
                  "onUpdate:modelValue": S[7] || (S[7] = (M) => u(f).width = M),
                  step: "20",
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            v(X, null, {
              default: w(() => [
                v(J, null, {
                  default: w(() => [
                    O(" Height ")
                  ]),
                  _: 1
                }),
                v(ae, {
                  modelValue: u(f).height,
                  "onUpdate:modelValue": S[8] || (S[8] = (M) => u(f).height = M),
                  step: "20",
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            v(X, null, {
              default: w(() => [
                v(J, null, {
                  default: w(() => [
                    O(C(B.$t("general.objectType")), 1)
                  ]),
                  _: 1
                }),
                v(Hc, {
                  modelValue: u(f).type,
                  "onUpdate:modelValue": S[9] || (S[9] = (M) => u(f).type = M),
                  items: u($),
                  "option-id": "id",
                  "option-label": "name"
                }, null, 8, ["modelValue", "items"])
              ]),
              _: 1
            }),
            y("div", Jc, [
              v(ot, {
                modelValue: u(f).inMenu,
                "onUpdate:modelValue": S[10] || (S[10] = (M) => u(f).inMenu = M),
                label: B.$t("general.useInMenu")
              }, null, 8, ["modelValue", "label"])
            ]),
            u(f).inMenu ? (g(), A(K, { key: 1 }, [
              y("div", Yc, C(B.$t("general.menuOrder")), 1),
              y("div", Zc, [
                v(ae, {
                  modelValue: u(f).menuOrder,
                  "onUpdate:modelValue": S[11] || (S[11] = (M) => u(f).menuOrder = M),
                  type: "number"
                }, null, 8, ["modelValue"])
              ])
            ], 64)) : T("", !0),
            u(f).arrows && u(f).arrows.length ? (g(), A(K, { key: 2 }, [
              y("div", Xc, C(B.$t("general.relations")), 1),
              y("div", el, [
                (g(!0), A(K, null, q(u(f).arrows, (M, Z) => {
                  var le;
                  return g(), A("div", {
                    key: M.id,
                    class: "FormObject-Arrow"
                  }, [
                    (le = u(b)) != null && le.objects[M.id] ? (g(), A("span", tl, " #" + C(Z + 1) + " " + C(u(b).objects[M.id].name), 1)) : T("", !0),
                    v(D, {
                      class: "FormObject-ArrowButton",
                      type: "danger",
                      size: "sm",
                      onClick: (be) => R(Z)
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
}), nl = { class: "BaseTextarea" }, rl = ["v-bind"], Ts = /* @__PURE__ */ E({
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
    return (r, o) => (g(), A("div", nl, [
      Le(y("textarea", {
        ref: "textarea",
        "v-bind": r.$attrs,
        "onUpdate:modelValue": o[0] || (o[0] = (c) => Be(i) ? i.value = c : null),
        class: "rounded-main block w-full p-2 border min-h-[200px] border-solid border-body-dark"
      }, null, 8, rl), [
        [as, u(i)]
      ])
    ]));
  }
}), ol = { class: "text-lg font-bold" }, al = {
  key: 0,
  class: "flex flex-col"
}, cl = { class: "flex justify-end pt-4 gap-2" }, ll = /* @__PURE__ */ E({
  __name: "FormType",
  setup(n) {
    const {
      mapTypeCurrent: e,
      mapFile: t,
      mapType: s,
      modal: i,
      controlCombo: r
    } = W(), { patron: o, chain: c, guest: a } = Y();
    e.typeId(
      o.create(a.create((f) => {
        f && i.give("type");
      }))
    );
    const h = ee(""), l = c.create(), d = new Ss(() => {
      e.typeId(o.create(l.receiveKey("typeId"))), t.currentMap(o.create(l.receiveKey("map"))), l.result(o.create(
        a.create(({ map: f, typeId: $ }) => {
          var b;
          d.value = f.types[$], h.value = (b = d.value) == null ? void 0 : b.name;
        })
      ));
    }).ref(), p = () => {
      e.give(""), i.give(""), l.receiveKey("typeId").give("");
    }, m = () => {
      s.give({
        name: h.value,
        type: d.value
      }), p();
    };
    return r.happenedConditional(
      "KeyS",
      i.openedByName("type"),
      o.create(a.create(m))
    ), (f, $) => (g(), V(ye, { name: "type" }, {
      header: w(() => [
        y("h2", ol, C(f.$t("general.mapType")), 1)
      ]),
      footer: w(() => [
        y("div", cl, [
          v(D, {
            type: "success",
            onClick: m
          }, {
            default: w(() => [
              O(C(f.$t("general.save")), 1)
            ]),
            _: 1
          }),
          v(D, { onClick: p }, {
            default: w(() => [
              O(C(f.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: w(() => [
        u(d) ? (g(), A("div", al, [
          v(X, null, {
            default: w(() => [
              v(J, null, {
                default: w(() => [
                  O(" Название типа ")
                ]),
                _: 1
              }),
              v(ae, {
                modelValue: u(d).name,
                "onUpdate:modelValue": $[0] || ($[0] = (b) => u(d).name = b)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          v(X, null, {
            default: w(() => [
              v(J, null, {
                default: w(() => [
                  O(" SVG ")
                ]),
                _: 1
              }),
              v(Ts, {
                modelValue: u(d).svg,
                "onUpdate:modelValue": $[1] || ($[1] = (b) => u(d).svg = b)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          v(X, null, {
            default: w(() => [
              v(J, null, {
                default: w(() => [
                  O(" Ширина ")
                ]),
                _: 1
              }),
              v(ae, {
                modelValue: u(d).width,
                "onUpdate:modelValue": $[2] || ($[2] = (b) => u(d).width = b)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          v(X, null, {
            default: w(() => [
              v(J, null, {
                default: w(() => [
                  O(" Высота ")
                ]),
                _: 1
              }),
              v(ae, {
                modelValue: u(d).height,
                "onUpdate:modelValue": $[3] || ($[3] = (b) => u(d).height = b)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          })
        ])) : T("", !0)
      ]),
      _: 1
    }));
  }
}), at = j.debug("MapObjectsWithTemplates");
class ul {
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
const dl = /* @__PURE__ */ E({
  __name: "BaseNotify",
  setup(n) {
    const { notification: e } = W(), t = e.message(new I()).ref();
    return (s, i) => u(t) && u(t).text !== "hide" ? (g(), A("div", {
      key: 0,
      class: te(["inline font-bold", `text-${u(t).type}-second`])
    }, C(u(t).text), 3)) : T("", !0);
  }
}), hl = { class: "relative" }, pl = { class: "absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-1" }, fl = { class: "text-sm z-10 p-2 absolute bottom-0 left-5" }, gl = /* @__PURE__ */ Es('<div class="absolute bottom-3 shadow-standard-second shadow-md drop-shadow right-3 z-10"><div class="grid-example grid grid-rows-2 grid-cols-2 bg-standard-second border border-standard-second gap-[1px] border-t-0 border-l-0"><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div></div></div><div class="absolute z-30 top-0 left-0 h-[18px] w-[22px] bg-white"></div>', 2), ml = ["title"], vl = { class: "font-bold" }, Al = ["title"], yl = { class: "font-bold" }, bl = ["title"], wl = { class: "font-bold" }, Cl = ["title"], xl = { class: "font-bold" }, _l = ["data-object-id"], $l = { class: "absolute bottom-[100%] left-[50%] translate-x-[-50%] text-center pb-2 pointer-events-auto text-sm w-[300px]" }, kl = ["innerHTML", "onClick"], Fl = ["innerHTML"], Ml = ["data-object-id", "innerHTML"], Sl = /* @__PURE__ */ E({
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
    } = W(), p = Y(), m = r.value(new I()).ref(), $ = new ul(
      t,
      s,
      p
    ).objects(new I([])).ref(), b = a.value(new I()).ref(), k = i.position(new I()).ref(), F = Ie(() => {
      var be;
      return (be = b.value) == null ? void 0 : be.width;
    }), L = new yt(F), P = p.numberChunks.create(10, L).chunks(new I()).ref(), re = ee();
    cs(() => {
      e.give(re.value);
    });
    const R = (be) => {
      c.open(be, p.guest.create((oe) => {
        o.give(oe);
      }));
    }, B = h.count(
      { axis: "x", direction: "negative" },
      new I()
    ).ref(), S = h.count(
      { axis: "x", direction: "positive" },
      new I()
    ).ref(), M = h.count(
      { axis: "y", direction: "negative" },
      new I()
    ).ref(), Z = h.count(
      { axis: "y", direction: "positive" },
      new I()
    ).ref(), le = l.move.bind(l, d);
    return (be, oe) => {
      var bt, wt, Ct, xt, _t, $t, kt, Ft, Mt, St, Tt, It;
      return g(), A("div", hl, [
        y("div", pl, [
          y("div", fl, [
            O(" Видимых объектов: " + C(u($).length) + ", FPS: " + C(u(m)) + ", ", 1),
            v(dl)
          ]),
          gl,
          ((bt = u(B)) == null ? void 0 : bt.count) > 0 ? (g(), A("div", {
            key: 0,
            class: "pointer-events-auto absolute z-30 top-0 left-4 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(wt = u(B)) == null ? void 0 : wt.count} шт. объектов левее`,
            onClick: oe[0] || (oe[0] = (N) => u(le)(u(B).nearestObjectId))
          }, [
            v(G, { icon: "fa-arrow-left" }),
            y("span", vl, C((Ct = u(B)) == null ? void 0 : Ct.count), 1)
          ], 8, ml)) : T("", !0),
          ((xt = u(S)) == null ? void 0 : xt.count) > 0 ? (g(), A("div", {
            key: 1,
            class: "pointer-events-auto absolute z-30 p-1 top-0 right-0 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(_t = u(S)) == null ? void 0 : _t.count} шт. объектов правее`,
            onClick: oe[1] || (oe[1] = (N) => u(le)(u(S).nearestObjectId))
          }, [
            y("span", yl, C(($t = u(S)) == null ? void 0 : $t.count), 1),
            v(G, { icon: "fa-arrow-right" })
          ], 8, Al)) : T("", !0),
          ((kt = u(M)) == null ? void 0 : kt.count) > 0 ? (g(), A("div", {
            key: 2,
            class: "pointer-events-auto absolute z-30 top-[18px] left-0 w-[18px] bg-white flex flex-col leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(Ft = u(M)) == null ? void 0 : Ft.count} шт. объектов выше`,
            onClick: oe[2] || (oe[2] = (N) => u(le)(u(M).nearestObjectId))
          }, [
            v(G, { icon: "fa-arrow-up" }),
            y("span", wl, C((Mt = u(M)) == null ? void 0 : Mt.count), 1)
          ], 8, bl)) : T("", !0),
          ((St = u(Z)) == null ? void 0 : St.count) > 0 ? (g(), A("div", {
            key: 3,
            class: "pointer-events-auto absolute z-30 p-1 bottom-0 left-0 w-[18px] bg-white flex flex-col-reverse leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(Tt = u(Z)) == null ? void 0 : Tt.count} шт. объектов ниже`,
            onClick: oe[3] || (oe[3] = (N) => u(le)(u(Z).nearestObjectId))
          }, [
            v(G, { icon: "fa-arrow-down" }),
            y("span", xl, C((It = u(Z)) == null ? void 0 : It.count), 1)
          ], 8, Cl)) : T("", !0),
          y("div", {
            class: te({ "objects-container absolute top-0 left-0": !0 }),
            style: ce({ width: `${u(b).width}px`, height: `${u(b).height}px`, transform: `translate(${u(k).x}px, ${u(k).y}px)` })
          }, [
            y("div", {
              class: "absolute flex top-0 left-0 w-full z-20 h-[20px] bg-default border-b-2 border-border text-right text-sm px-2",
              style: ce({ transform: `translate(0, ${-u(k).y}px)` })
            }, [
              (g(!0), A(K, null, q(u(P), (N) => (g(), A("span", {
                class: "flex-1 text-body-dark",
                key: `horiz_${N}`
              }, C(N) + "px", 1))), 128))
            ], 4),
            y("div", {
              class: "absolute flex [writing-mode:vertical-lr] top-0 left-0 h-full z-20 w-[20px] bg-default border-r-2 border-border text-left text-sm py-2",
              style: ce({ transform: `translate(${-u(k).x}px, 0)` })
            }, [
              (g(!0), A(K, null, q(u(P), (N) => (g(), A("span", {
                class: "flex-1 rotate-180 text-body-dark",
                key: `vert_${N}`
              }, C(N) + "px", 1))), 128))
            ], 4),
            (g(!0), A(K, null, q(u($), (N) => (g(), A("div", {
              key: N.obj.id,
              class: "absolute z-10",
              "data-object-id": N.obj.id,
              style: ce(`width:${N.obj.width}px;height: ${N.obj.height}px;top: ${N.obj.position[1]}px;left:${N.obj.position[0]}px;z-index:${N.obj.zindex}`)
            }, [
              y("div", $l, [
                y("span", {
                  innerHTML: N.obj.additionalName,
                  class: te([N.obj.linked && "cursor-pointer underline"]),
                  onClick: (Mu) => R(N.obj)
                }, null, 10, kl)
              ]),
              y("div", {
                class: "absolute top-[100%] left-[50%] translate-x-[-50%] text-center pt-2 text-sm w-[300px]",
                innerHTML: N.obj.name
              }, null, 8, Fl),
              y("div", {
                "data-object-id": N.obj.id,
                class: "rendered-object",
                innerHTML: N.template
              }, null, 8, Ml)
            ], 12, _l))), 128))
          ], 4)
        ]),
        y("div", {
          class: "h-full",
          ref_key: "canvasWrapper",
          ref: re
        }, null, 512)
      ]);
    };
  }
}), Tl = { class: "flex flex-wrap gap-2" }, Il = { key: 0 }, jl = { key: 1 }, Bl = ["onClick"], Ol = /* @__PURE__ */ E({
  __name: "BaseBreadcrumbs",
  setup(n) {
    const {
      breadcrumbs: e,
      mapCurrentID: t
    } = W(), s = e.list(new I()).ref();
    return (i, r) => (g(), A("div", Tl, [
      (g(!0), A(K, null, q(u(s), (o, c) => (g(), A("span", {
        class: "flex gap-2",
        key: o.name
      }, [
        c !== 0 ? (g(), A("span", Il, "/")) : T("", !0),
        c === u(s).length - 1 ? (g(), A("b", jl, "Открыто: " + C(o.title), 1)) : (g(), A("a", {
          key: 2,
          href: "#",
          onClick: Ce((a) => u(t).give(o.name), ["prevent"])
        }, C(o.title), 9, Bl))
      ]))), 128))
    ]));
  }
}), Pl = { class: "flex items-center p-3 gap-3" }, El = { class: "ml-auto gap-1 flex" }, Dl = /* @__PURE__ */ E({
  __name: "TheHeader",
  setup(n) {
    const {
      drawer: e,
      modal: t,
      mapHistory: s,
      controlCombo: i,
      settings: r
    } = W(), { patron: o, guest: c } = Y(), a = s.isNextPossible(new I()).ref(), h = s.isPrevPossible(new I()).ref();
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
    return r.value(l), (d, p) => (g(), A("div", Pl, [
      v(Ol, { class: "TheHeader-Breadcrumbs" }),
      y("div", El, [
        u(a) && !u(l).value.readonly ? (g(), V(D, {
          key: 0,
          size: "sm",
          title: "Отменить последнее действие",
          class: "w-7 block",
          onClick: p[0] || (p[0] = (m) => u(s).next())
        }, {
          default: w(() => [
            v(G, { icon: "fa-rotate-left" })
          ]),
          _: 1
        })) : T("", !0),
        u(h) && !u(l).value.readonly ? (g(), V(D, {
          key: 1,
          size: "sm",
          title: "Вернуть отмененное действие",
          class: "w-7 block",
          onClick: p[1] || (p[1] = (m) => u(s).prev())
        }, {
          default: w(() => [
            v(G, { icon: "fa-rotate-right" })
          ]),
          _: 1
        })) : T("", !0),
        v(D, {
          type: "success",
          size: "sm",
          class: "w-7 block e2e-open-menu",
          title: d.$t("general.menu"),
          onClick: p[2] || (p[2] = (m) => u(e).give("menu"))
        }, {
          default: w(() => [
            v(G, { icon: "fa-bars" })
          ]),
          _: 1
        }, 8, ["title"]),
        v(D, {
          title: d.$t("general.byText"),
          type: "primary",
          size: "sm",
          class: "w-7 block",
          onClick: p[3] || (p[3] = (m) => u(t).give("mapAsText"))
        }, {
          default: w(() => [
            v(G, { icon: "fa-text-width" })
          ]),
          _: 1
        }, 8, ["title"]),
        v(D, {
          class: "w-7 block e2e-search",
          size: "sm",
          onClick: p[4] || (p[4] = (m) => u(t).give("search"))
        }, {
          default: w(() => [
            v(G, { icon: "fa-search" })
          ]),
          _: 1
        }),
        v(D, {
          size: "sm",
          title: "Все карты файла",
          class: "w-7 block",
          onClick: p[5] || (p[5] = (m) => u(e).give("fileMaps"))
        }, {
          default: w(() => [
            v(G, { icon: "fa-map" })
          ]),
          _: 1
        })
      ])
    ]));
  }
}), Rl = {}, Hl = { class: "text-lg font-bold" };
function Nl(n, e) {
  return g(), A("span", Hl, [
    se(n.$slots, "default")
  ]);
}
const Vl = /* @__PURE__ */ Ze(Rl, [["render", Nl]]), zl = { class: "flex gap-1" }, Ul = {
  key: 0,
  class: "TheMapAsText select-auto"
}, Ll = ["innerHTML"], Ql = /* @__PURE__ */ E({
  __name: "TheMapAsText",
  setup(n) {
    const { mapFile: e, mapCurrent: t } = W(), {
      guest: s,
      patron: i,
      textOf: r,
      textNlAsBr: o,
      textWithoutHTML: c
    } = Y(), a = e.currentMap(new I()).ref(), h = ee(""), l = ee([]);
    t.objects(
      i.create(
        s.create(me((b) => {
          l.value = b, o.create(
            r.create(
              b.map((k) => `<div class="TheMapAsText-Item">
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
    const { share: d, isSupported: p } = Hs(), m = () => {
      p.value || alert("Sharing is not supported"), c.create(
        r.create(
          h.value
        )
      ).asString(
        s.create((b) => {
          d({
            text: b
          });
        })
      );
    }, f = ee(), $ = () => {
      var b, k;
      if (a.value) {
        const F = new Range();
        F.setStart(f.value, 0), F.setEnd(f.value, Object.values(l.value).length), (b = document.getSelection()) == null || b.removeAllRanges(), (k = document.getSelection()) == null || k.addRange(F);
      }
    };
    return (b, k) => (g(), V(ye, { name: "mapAsText" }, {
      header: w(() => [
        v(Vl, { class: "block mb-3" }, {
          default: w(() => [
            O(C(b.$t("general.mapAsText")) + " ", 1),
            y("div", zl, [
              v(D, {
                size: "sm",
                type: "success",
                class: "font-normal",
                onClick: m
              }, {
                default: w(() => [
                  O(C(b.$t("general.share")), 1)
                ]),
                _: 1
              }),
              v(D, {
                size: "sm",
                type: "primary",
                class: "font-normal",
                onClick: $
              }, {
                default: w(() => [
                  O(C(b.$t("general.selectAll")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        })
      ]),
      default: w(() => [
        u(a) ? (g(), A("article", Ul, [
          y("div", {
            ref_key: "textRef",
            ref: f,
            innerHTML: h.value
          }, null, 8, Ll)
        ])) : T("", !0)
      ]),
      _: 1
    }));
  }
}), Wl = { key: 1 }, Kl = /* @__PURE__ */ E({
  __name: "TheMiniMap",
  setup(n) {
    const { miniMap: e } = W(), t = e.points(new I()).ref(), s = e.size(new I()).ref(), i = e.viewportSize(new I()).ref(), r = e.viewportPosition(new I()).ref();
    return (o, c) => u(s) ? (g(), A("div", {
      key: 0,
      style: ce({
        width: `${u(s).width}px`,
        height: `${u(s).height}px`
      }),
      class: "absolute pointer-events-none block bg-white bottom-[10px] mt-3 right-3 z-1 border border-solid border-body-dark"
    }, [
      u(r) ? (g(), A("div", {
        key: 0,
        style: ce({
          width: `${u(i).width}px`,
          height: `${u(i).height}px`,
          top: `${u(r).y}px`,
          left: `${u(r).x}px`
        }),
        class: "absolute bg-primary/50"
      }, null, 4)) : T("", !0),
      u(t) ? (g(), A("div", Wl, [
        (g(!0), A(K, null, q(u(t), (a) => (g(), A("div", {
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
}), Gl = { class: "text-lg font-bold" }, ql = {
  key: 0,
  class: "TheSettings"
}, Jl = { class: "mb-2" }, Yl = { class: "TheSettings-Row" }, Zl = { class: "flex gap-2 mb-2" }, Xl = { class: "mb-2" }, eu = { class: "mb-2" }, tu = {
  href: "https://github.com/kosukhin/mind-map-creator",
  target: "_blank"
}, su = { class: "flex gap-2" }, iu = /* @__PURE__ */ E({
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
    } = W(), { patron: a, guest: h } = Y(), l = o.names(new I()).ref(), d = t.currentMap(new I()).ref(), p = c.id(new I()).ref(), m = () => {
      e.give("");
    }, f = () => {
      i.give(d.value.settings), m();
    };
    r.happenedConditional(
      "KeyS",
      e.openedByName("settings"),
      a.create(h.create(f))
    );
    const { sharedStorageRecord: $ } = ds(), b = new I();
    return $.value(b), (k, F) => (g(), V(ye, { name: "settings" }, {
      header: w(() => [
        y("h2", Gl, C(k.$t("general.mapSettings")), 1)
      ]),
      default: w(() => {
        var L;
        return [
          (L = u(d)) != null && L.settings ? (g(), A("div", ql, [
            y("div", Jl, [
              y("div", Yl, [
                y("div", Zl, [
                  u(b).value ? (g(), V(D, {
                    key: 0,
                    type: "primary",
                    class: "text-white",
                    onClick: F[0] || (F[0] = (P) => u($).give(null))
                  }, {
                    default: w(() => [
                      O(" Очистить Sharing ")
                    ]),
                    _: 1
                  })) : T("", !0),
                  u(l).length > 1 ? (g(), V(D, {
                    key: 1,
                    type: "primary",
                    class: "text-white",
                    onClick: F[1] || (F[1] = (P) => u(e).give("parentTypes"))
                  }, {
                    default: w(() => [
                      O(C(k.$t("general.parentTypes")), 1)
                    ]),
                    _: 1
                  })) : T("", !0),
                  v(D, {
                    type: "primary",
                    class: "text-white",
                    onClick: F[2] || (F[2] = (P) => u(e).give("export"))
                  }, {
                    default: w(() => [
                      O(C(k.$t("general.exportOrImport")), 1)
                    ]),
                    _: 1
                  }),
                  v(D, {
                    type: "primary",
                    class: "text-white e2e-open-presets",
                    onClick: F[3] || (F[3] = (P) => u(e).give("presets"))
                  }, {
                    default: w(() => [
                      O(" Пресеты ")
                    ]),
                    _: 1
                  })
                ])
              ]),
              y("div", Xl, [
                y("label", null, [
                  y("b", null, C(k.$t("general.mapName")), 1),
                  v(ae, {
                    modelValue: u(d).settings.title,
                    "onUpdate:modelValue": F[4] || (F[4] = (P) => u(d).settings.title = P)
                  }, null, 8, ["modelValue"])
                ])
              ]),
              y("div", eu, [
                y("a", tu, C(k.$t("general.githubRepo")), 1)
              ])
            ]),
            y("div", su, [
              v(D, {
                class: "TheSettings-Button",
                type: "success",
                onClick: F[5] || (F[5] = (P) => f())
              }, {
                default: w(() => [
                  O(C(k.$t("general.save")), 1)
                ]),
                _: 1
              }),
              v(D, {
                class: "TheSettings-Button",
                onClick: m
              }, {
                default: w(() => [
                  O(C(k.$t("general.cancel")), 1)
                ]),
                _: 1
              }),
              v(D, {
                class: "TheSettings-Button",
                type: "danger",
                onClick: F[6] || (F[6] = (P) => {
                  u(s).give(u(p)), m();
                })
              }, {
                default: w(() => [
                  O(C(k.$t("general.removeMap")), 1)
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
}), nu = {}, ru = { class: "BaseGroup" };
function ou(n, e) {
  return g(), A("div", ru, [
    se(n.$slots, "default")
  ]);
}
const au = /* @__PURE__ */ Ze(nu, [["render", ou]]), cu = "default", lu = /* @__PURE__ */ E({
  __name: "TheLinker",
  setup(n) {
    const { mapObjectsLink: e } = W(), t = e.objectIds(new I([])).ref();
    return (s, i) => (g(), V(D, {
      type: cu,
      onClick: i[0] || (i[0] = (r) => u(e).startLink())
    }, {
      default: w(() => [
        O(C(u(t).length === 1 ? "Выбиретие объект" : u(t).length === 2 ? "Второй объект" : "Связать объекты"), 1)
      ]),
      _: 1
    }));
  }
}), uu = { class: "flex e2e-sidebar flex-col items-center gap-3 max-h-[100%] overflow-hidden" }, du = { class: "TheSideBar-ItemName" }, hu = ["innerHTML", "draggable", "title", "onDragend", "onDblclick"], pu = {
  key: 0,
  class: "flex gap-1"
}, fu = {
  key: 0,
  class: "mt-auto w-full p-3 pt-0"
}, gu = /* @__PURE__ */ E({
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
    } = W(), h = t.types(new I()).ref(), l = ee();
    cs(() => {
      a.give(l.value);
    });
    const { svgMapTypeImage: d } = Y(), p = Ie(() => {
      var f;
      return (f = h.value) == null ? void 0 : f.map(($) => ({
        type: $,
        image: d.create($).markup()
      })).sort(($, b) => +($.type.name >= b.type.name));
    }), m = new I();
    return c.value(m), (f, $) => (g(), A("div", uu, [
      y("div", {
        ref_key: "dragWrapperRef",
        ref: l,
        class: "flex flex-col gap-3 flex-grow w-full overflow-y-auto"
      }, [
        (g(!0), A(K, null, q(p.value, (b, k) => (g(), A("div", {
          key: k,
          class: "flex flex-col items-center justify-center gap-2"
        }, [
          y("div", du, C(b.type.name), 1),
          y("div", {
            innerHTML: b.image,
            class: "TheSideBar-ItemImage",
            draggable: u(m).value.readonly ? "false" : "true",
            style: ce(`width:${b.type.width}px;height:${b.type.height}px`),
            title: f.$t("general.notifications.dragToCanvasToAdd"),
            onDragend: (F) => u(e).byTypeName(b.type.id, F),
            onDblclick: (F) => {
              u(e).byTypeName(b.type.id, F), f.$emit("close");
            }
          }, null, 44, hu),
          u(m).value.readonly ? T("", !0) : (g(), A("div", pu, [
            v(D, {
              class: "text-white",
              size: "sm",
              type: "primary",
              onClick: (F) => u(s).give(b.type.id)
            }, {
              default: w(() => [
                O(C(f.$t("general.change")), 1)
              ]),
              _: 2
            }, 1032, ["onClick"]),
            v(D, {
              class: "text-white",
              size: "sm",
              type: "danger",
              onClick: (F) => u(i).give(b.type)
            }, {
              default: w(() => [
                O(C(f.$t("general.delete")), 1)
              ]),
              _: 2
            }, 1032, ["onClick"])
          ]))
        ]))), 128))
      ], 512),
      u(m).value.readonly ? T("", !0) : (g(), A("div", fu, [
        v(au, { class: "mb-1 grid gap-1 grid-cols-2" }, {
          default: w(() => [
            v(D, {
              title: f.$t("general.addType"),
              type: "success",
              onClick: $[0] || ($[0] = (b) => u(r).byName())
            }, {
              default: w(() => [
                v(G, { icon: "fa-plus-square" })
              ]),
              _: 1
            }, 8, ["title"]),
            v(D, {
              class: "e2e-show-settings",
              title: f.$t("general.settings"),
              type: "primary",
              onClick: $[1] || ($[1] = (b) => u(o).give("settings"))
            }, {
              default: w(() => [
                v(G, { icon: "fa-cog" })
              ]),
              _: 1
            }, 8, ["title"])
          ]),
          _: 1
        }),
        v(lu, { class: "w-[100%] block mb-1" })
      ]))
    ]));
  }
});
class mu {
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
class vu {
  constructor(e) {
    this.baseSource = e;
  }
  value(e) {
    return this.baseSource.value(
      new Q(e, (t) => {
        U(JSON.stringify(t), e);
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
class Au {
  constructor(e, t) {
    this.baseGuest = e, this.baseGuestAware = t;
  }
  value(e) {
    return this.baseGuestAware.value(e), this;
  }
  give(e) {
    return U(e, this.baseGuest), this;
  }
  pool() {
    throw Error("No pool in SourceDynamic");
  }
}
const yu = { class: "AppPresets" }, bu = /* @__PURE__ */ y("div", { class: "text-md font-bold mb-2" }, "Экспорт\\Импорт текущей карты", -1), wu = { class: "flex flex-col gap-2" }, Cu = /* @__PURE__ */ E({
  __name: "AppExport",
  setup(n) {
    const { mapFile: e, mapCurrent: t } = W(), s = new Au(
      t,
      new we((c) => {
        e.currentMap(new Ue(c));
      })
    ), i = new vu(s), r = new mu(new I(), i);
    i.value(r);
    const o = r.ref();
    return (c, a) => (g(), V(ye, { name: "export" }, {
      default: w(() => [
        y("div", yu, [
          bu,
          y("div", wu, [
            v(Ts, {
              modelValue: u(o),
              "onUpdate:modelValue": a[0] || (a[0] = (h) => Be(o) ? o.value = h : null)
            }, null, 8, ["modelValue"])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), xu = { class: "absolute bg-body hover:bg-border cursor-pointer border-solid border-border bottom-[150px] right-3 p-3 w-15 h-15" }, _u = /* @__PURE__ */ E({
  __name: "TheSidebarButton",
  setup(n) {
    return (e, t) => (g(), A("div", xu, [
      v(G, { icon: "fa-bars-staggered" })
    ]));
  }
}), $u = /* @__PURE__ */ E({
  __name: "TheSharingButton",
  setup(n) {
    const { sharedFile: e } = ds();
    return (t, s) => (g(), A("div", {
      class: "absolute bg-body hover:bg-border cursor-pointer border-solid border-border bottom-[150px] right-[60px] p-3 w-15 h-15",
      onClick: s[0] || (s[0] = (i) => u(e).do())
    }, [
      v(G, { icon: "fa-share-nodes" })
    ]));
  }
});
class ku {
  value(e) {
    if (!navigator.share || !navigator.canShare)
      return U(!1, e), this;
    const s = { files: [new File(["foo"], "foo.txt", { type: "text/plain" })] };
    return U(navigator.canShare(s), e), this;
  }
}
const Fu = { class: "bg-body absolute top-0 left-0 w-full h-full" }, Du = /* @__PURE__ */ E({
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
    const t = n, s = e, { fileContent: i, settings: r, device: o } = W(), { guest: c, patron: a } = Y();
    r.value((m) => {
      r.give({
        ...m,
        readonly: t.readonly,
        presets: t.presets
      });
    }), je(() => t.modelValue, (m) => {
      i.value(c.create((f) => {
        m !== f && i.give(m);
      }));
    }, {
      immediate: !0
    }), i.value(a.create((m) => {
      s("update:modelValue", m);
    }));
    const h = ee(!0), l = new I();
    o.value(l), o.value(new ht((m) => {
      h.value = m.isDesktop;
    }));
    const d = new ku(), p = new I();
    return d.value(p), (m, f) => (g(), A("div", Fu, [
      y("div", {
        class: te(["grid grid-rows-[50px_1fr] h-dvh relative", { "grid-cols-[200px_1fr]": !u(l).value.isMobile, "grid-cols-[1fr]": u(l).value.isMobile }])
      }, [
        v(Dl, { class: "col-span-2" }),
        h.value ? (g(), V(gu, {
          key: 0,
          class: te({ "bg-[#f3f4f6] w-[200px] absolute top-[50px] left-0 z-10 bottom-0": u(l).value.isMobile }),
          onClose: f[0] || (f[0] = ($) => h.value = !1)
        }, null, 8, ["class"])) : T("", !0),
        v(Sl, { class: "w-auto col-auto h-full" }),
        v(Kl),
        u(p).value ? (g(), V($u, { key: 1 })) : T("", !0),
        u(l).value.isMobile ? (g(), V(_u, {
          key: 2,
          onClick: f[1] || (f[1] = ($) => h.value = !h.value)
        })) : T("", !0)
      ], 2),
      v(il),
      v(ll),
      v(iu),
      v(pc),
      v(Mc),
      v(Cu),
      v(tc),
      v(Ql),
      v(Cc),
      v(qa)
    ]));
  }
}), ns = j.debug("FileSystemContent");
class Ru {
  constructor(e, t, s) {
    _(this, "contentPatrons");
    _(this, "fileHandler", null);
    _(this, "contentSource");
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
    if (ns("save file as content string", e), !this.fileHandler)
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
    ns("can be used", t);
    const s = window && window.matchMedia("(display-mode: standalone)");
    return e.give(t && s.matches), e;
  }
}
const ze = j.debug("FirstPossibleFileContent");
class Hu {
  constructor(e, t) {
    _(this, "firstPossibleFileContent", null);
    _(this, "contentSource", new ge());
    _(this, "canBeUsedSource", new ge());
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
const ct = j.debug("UrlContent");
class Nu {
  constructor(e, t) {
    _(this, "contentCache");
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
const rs = new ge();
class Vu {
  constructor(e = window.launchQueue, t = "launchQueue" in window) {
    _(this, "isCalculated", !1);
    this.launchQueue = e, this.isLaunchQueueSupported = t;
  }
  fileHandler(e) {
    return this.isLaunchQueueSupported && !this.isCalculated && (this.isCalculated = !0, this.launchQueue.setConsumer((t) => {
      if (t.files && t.files.length) {
        const [s] = t.files;
        rs.give(s);
      }
    })), rs.value(e), this;
  }
}
export {
  Vu as BrowserLaunchQueue,
  Ru as FileSystemContent,
  Hu as FirstPossibleFileContent,
  Du as PatronSchemeEditor,
  Ii as StorageRecord,
  Nu as UrlContent,
  I as VueRefPatron,
  W as useApplication,
  Y as useFactories,
  ds as useSharing
};
