var Ts = Object.defineProperty;
var Is = (n, e, t) => e in n ? Ts(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var $ = (n, e, t) => Is(n, typeof e != "symbol" ? e + "" : e, t);
import { ref as ee, defineComponent as P, computed as Ie, openBlock as g, createBlock as z, Transition as rs, withCtx as w, unref as u, createElementBlock as b, normalizeClass as te, createElementVNode as y, withModifiers as Ce, renderSlot as se, createCommentVNode as S, Fragment as W, renderList as q, toDisplayString as x, createVNode as v, normalizeStyle as ce, createTextVNode as O, watch as je, withDirectives as Le, isRef as Be, vModelText as os, vModelCheckbox as js, onBeforeUnmount as Bs, vModelSelect as Os, onMounted as as, createStaticVNode as Ps } from "vue";
import { useScriptTag as Es, useMagicKeys as Ds, useVModel as Qe, useShare as Rs } from "@vueuse/core";
import he from "konva";
import { FontAwesomeIcon as Hs } from "@fortawesome/vue-fontawesome";
import { faShareNodes as Ns, faArrowUp as Vs, faArrowDown as zs, faArrowRight as Us, faArrowLeft as Ls, faClose as Qs, faMap as Ws, faRotateRight as Ks, faRotateLeft as Gs, faFileText as qs, faCog as Js, faPlusSquare as Ys, faHistory as Zs, faSearch as Xs, faTextWidth as ei, faBarsStaggered as ti, faBars as si } from "@fortawesome/free-solid-svg-icons";
import { useEditor as ii, EditorContent as ni, BubbleMenu as ri } from "@tiptap/vue-3";
import oi from "@tiptap/starter-kit";
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
class L {
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
var ai = Object.defineProperty, ci = (n, e, t) => e in n ? ai(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, It = (n, e, t) => ci(n, typeof e != "symbol" ? e + "" : e, t);
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
var li = Object.defineProperty, ui = (n, e, t) => e in n ? li(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, hi = (n, e, t) => ui(n, e + "", t);
class de {
  constructor(e) {
    this.sourceDocument = e, hi(this, "thePool", new We(this));
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
var di = Object.defineProperty, pi = (n, e, t) => e in n ? di(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Bt = (n, e, t) => pi(n, typeof e != "symbol" ? e + "" : e, t);
class fi {
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
      U(e, s, t);
    }), this.guests.clear();
  }
}
var gi = Object.defineProperty, mi = (n, e, t) => e in n ? gi(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Oe = (n, e, t) => mi(n, typeof e != "symbol" ? e + "" : e, t);
class Ke {
  constructor() {
    Oe(this, "theChain"), Oe(this, "keysKnown", /* @__PURE__ */ new Set()), Oe(this, "keysFilled", /* @__PURE__ */ new Set()), Oe(this, "filledChainPool", new fi(this)), this.theChain = new de({});
  }
  resultArray(e) {
    const t = new Ue(e);
    return this.filledChainPool.add(
      new L(t, (s) => {
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
class ut {
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
var Ai = Object.defineProperty, bi = (n, e, t) => e in n ? Ai(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, yi = (n, e, t) => bi(n, e + "", t);
class wi {
  constructor(e) {
    this.baseGuest = e, yi(this, "received", !1);
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
var Ci = Object.defineProperty, xi = (n, e, t) => e in n ? Ci(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, _i = (n, e, t) => xi(n, e + "", t);
class ge {
  constructor() {
    _i(this, "baseSource", new de(null));
  }
  value(e) {
    return this.baseSource.value(
      new L(e, (t) => {
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
class $i {
  constructor(e, t = "Share file") {
    $(this, "loading", new de(!1));
    this.fileSource = e, this.sharingTitle = t;
  }
  value(e) {
    return this.loading.value(e), this;
  }
  do() {
    return this.fileSource.value((e) => {
      const t = new File(
        [e.content],
        e.name.replace(".json", ".txt"),
        { type: "text/plain" }
      );
      console.log("try to share file", e, t, {
        title: this.sharingTitle,
        url: "https://share.file",
        text: "Sharing from pwa",
        files: [t]
      }), this.loading.give(!0), navigator.share({
        title: this.sharingTitle,
        files: [t]
      }).finally(() => {
        this.loading.give(!1);
      });
    }), this;
  }
}
class ki {
  constructor(e) {
    $(this, "source", new de(null));
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
const ls = new ki("shared-map"), Fi = new $i(ls), Mi = {
  sharedStorageRecord: ls,
  sharedFile: Fi
}, Si = () => Mi;
class Ti {
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
class Ii {
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
class ji {
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
class Bi {
  constructor(e) {
    this.content = e;
  }
  result() {
    return JSON.parse(this.content);
  }
}
class Oi {
  constructor(e) {
    this.content = e;
  }
  result() {
    return JSON.stringify(this.content);
  }
}
class Pi {
  constructor(e, t = 100, s = 100) {
    this.svgContent = e, this.width = t, this.height = s;
  }
  markup() {
    return this.svgContent.replaceAll("${width}", String(this.width)).replaceAll("${height}", String(this.height));
  }
}
class Ei {
  constructor(e, t) {
    this.type = e, this.factories = t;
  }
  markup() {
    return this.factories.svgImage.create(this.type.svg, this.type.width, this.type.height).markup();
  }
}
class Di {
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
class Ri {
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
class Hi {
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
class Ni {
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
class Vi {
  constructor(e) {
    this.text = e;
  }
  asString(e) {
    return e.give(this.text), e;
  }
}
class zi {
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
function ht(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var lt = { exports: {} }, Xe, Ot;
function Ui() {
  if (Ot) return Xe;
  Ot = 1;
  var n = 1e3, e = n * 60, t = e * 60, s = t * 24, i = s * 7, r = s * 365.25;
  Xe = function(l, h) {
    h = h || {};
    var p = typeof l;
    if (p === "string" && l.length > 0)
      return o(l);
    if (p === "number" && isFinite(l))
      return h.long ? a(l) : c(l);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(l)
    );
  };
  function o(l) {
    if (l = String(l), !(l.length > 100)) {
      var h = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        l
      );
      if (h) {
        var p = parseFloat(h[1]), m = (h[2] || "ms").toLowerCase();
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
    var h = Math.abs(l);
    return h >= s ? Math.round(l / s) + "d" : h >= t ? Math.round(l / t) + "h" : h >= e ? Math.round(l / e) + "m" : h >= n ? Math.round(l / n) + "s" : l + "ms";
  }
  function a(l) {
    var h = Math.abs(l);
    return h >= s ? d(l, h, s, "day") : h >= t ? d(l, h, t, "hour") : h >= e ? d(l, h, e, "minute") : h >= n ? d(l, h, n, "second") : l + " ms";
  }
  function d(l, h, p, m) {
    var f = h >= p * 1.5;
    return Math.round(l / p) + " " + m + (f ? "s" : "");
  }
  return Xe;
}
function Li(n) {
  t.debug = t, t.default = t, t.coerce = a, t.disable = r, t.enable = i, t.enabled = o, t.humanize = Ui(), t.destroy = d, Object.keys(n).forEach((l) => {
    t[l] = n[l];
  }), t.names = [], t.skips = [], t.formatters = {};
  function e(l) {
    let h = 0;
    for (let p = 0; p < l.length; p++)
      h = (h << 5) - h + l.charCodeAt(p), h |= 0;
    return t.colors[Math.abs(h) % t.colors.length];
  }
  t.selectColor = e;
  function t(l) {
    let h, p = null, m, f;
    function C(...A) {
      if (!C.enabled)
        return;
      const k = C, j = Number(/* @__PURE__ */ new Date()), K = j - (h || j);
      k.diff = K, k.prev = h, k.curr = j, h = j, A[0] = t.coerce(A[0]), typeof A[0] != "string" && A.unshift("%O");
      let R = 0;
      A[0] = A[0].replace(/%([a-zA-Z%])/g, (E, B) => {
        if (E === "%%")
          return "%";
        R++;
        const M = t.formatters[B];
        if (typeof M == "function") {
          const F = A[R];
          E = M.call(k, F), A.splice(R, 1), R--;
        }
        return E;
      }), t.formatArgs.call(k, A), (k.log || t.log).apply(k, A);
    }
    return C.namespace = l, C.useColors = t.useColors(), C.color = t.selectColor(l), C.extend = s, C.destroy = t.destroy, Object.defineProperty(C, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => p !== null ? p : (m !== t.namespaces && (m = t.namespaces, f = t.enabled(l)), f),
      set: (A) => {
        p = A;
      }
    }), typeof t.init == "function" && t.init(C), C;
  }
  function s(l, h) {
    const p = t(this.namespace + (typeof h > "u" ? ":" : h) + l);
    return p.log = this.log, p;
  }
  function i(l) {
    t.save(l), t.namespaces = l, t.names = [], t.skips = [];
    let h;
    const p = (typeof l == "string" ? l : "").split(/[\s,]+/), m = p.length;
    for (h = 0; h < m; h++)
      p[h] && (l = p[h].replace(/\*/g, ".*?"), l[0] === "-" ? t.skips.push(new RegExp("^" + l.slice(1) + "$")) : t.names.push(new RegExp("^" + l + "$")));
  }
  function r() {
    const l = [
      ...t.names.map(c),
      ...t.skips.map(c).map((h) => "-" + h)
    ].join(",");
    return t.enable(""), l;
  }
  function o(l) {
    if (l[l.length - 1] === "*")
      return !0;
    let h, p;
    for (h = 0, p = t.skips.length; h < p; h++)
      if (t.skips[h].test(l))
        return !1;
    for (h = 0, p = t.names.length; h < p; h++)
      if (t.names[h].test(l))
        return !0;
    return !1;
  }
  function c(l) {
    return l.toString().substring(2, l.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function a(l) {
    return l instanceof Error ? l.stack || l.message : l;
  }
  function d() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return t.enable(t.load()), t;
}
var Qi = Li;
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
    const d = "color: " + this.color;
    a.splice(1, 0, d, "color: inherit");
    let l = 0, h = 0;
    a[0].replace(/%[a-zA-Z%]/g, (p) => {
      p !== "%%" && (l++, p === "%c" && (h = l));
    }), a.splice(h, 0, d);
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
  n.exports = Qi(e);
  const { formatters: c } = n.exports;
  c.j = function(a) {
    try {
      return JSON.stringify(a);
    } catch (d) {
      return "[UnexpectedJSONParseError]: " + d.message;
    }
  };
})(lt, lt.exports);
var I = lt.exports;
const us = /* @__PURE__ */ ht(I), Wi = I.debug("TextNlAsBr");
class Ki {
  constructor(e, t) {
    this.baseText = e, this.factories = t;
  }
  asString(e) {
    return this.baseText.asString(
      this.factories.guestInTheMiddle.create(e, (t) => {
        if (typeof t > "u" || t === null)
          return "";
        const s = "<br />";
        return Wi(t), e.give((t ?? "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, `$1${s}$2`)), !0;
      })
    ), e;
  }
}
const Gi = new H(de), qi = new H(de), Ji = new H(ge), Yi = new H(fe), Zi = new H(L), Xi = new H(we), en = new H(We), tn = new H(ut), sn = new H(wi), nn = new H(L), rn = new H(Ke), on = new H(vi), pe = {
  cache: Gi,
  chain: rn,
  guest: Yi,
  guestCast: Zi,
  guestAware: Xi,
  guestInTheMiddle: nn,
  guestSync: on,
  patron: tn,
  patronOnce: sn,
  pool: en,
  source: qi,
  sourceEmpty: Ji
}, an = new H(Ii), cn = new H(ji), ln = new H(Oi), un = new H(Bi), hs = new H(Pi), hn = new H(Ei, { ...pe, svgImage: hs }), dn = new H(Di, pe), pn = new H(Ri, pe), fn = new H(Hi, pe), gn = new H(Ni, pe), mn = new H(Vi), vn = new H(zi, pe), An = new H(Ki, pe), bn = {
  ...pe,
  fileHandlerContent: an,
  browserFileSaved: cn,
  transformToString: ln,
  transformToObject: un,
  svgImage: hs,
  svgMapTypeImage: hn,
  numberChunks: dn,
  mapNameFromUrl: pn,
  textNoHtml: fn,
  jsonp: gn,
  textOf: mn,
  textNlAsBr: An,
  textWithoutHTML: vn
}, Y = () => bn;
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
const et = I.debug("MapCurrent");
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
class yn {
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
class wn {
  constructor(e) {
    this.mapFile = e;
  }
  value(e) {
    return this.mapFile.currentMap(
      new L(e, (t) => {
        e.give(t.settings.title);
      })
    ), this;
  }
}
const Ee = I.debug("MapHistory"), Pt = (n) => {
  const e = JSON.parse(JSON.stringify(n));
  return Object.values(e.objects).forEach((t) => {
    t.width = 0, t.height = 0;
  }), JSON.stringify(e);
};
class Cn {
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
class xn {
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
const De = I.debug("MapFileOfContent");
class _n {
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
const $n = I.debug("MapFileForRendering");
class kn {
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
        $n("received map file, objects = ", e[t].objects), this.mapCache.give(e[t]);
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
const Et = us("app:MapObjectCurrent");
class Fn {
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
class Mn {
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
const tt = I.debug("MapObjectNew");
class Sn {
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
                const a = t.x - o.left, d = t.y - o.top;
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
class Tn {
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
class In {
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
class jn {
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
const Bn = I.debug("MapObjectsLink");
class On {
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
            t.push(s), this.objectIdsCache.give([...t]), Bn("object ids", t), t.length === 2 && this.map.objects(
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
function Pn(n) {
  var e = typeof n;
  return n != null && (e == "object" || e == "function");
}
var pt = Pn, En = typeof Pe == "object" && Pe && Pe.Object === Object && Pe, Dn = En, Rn = Dn, Hn = typeof self == "object" && self && self.Object === Object && self, Nn = Rn || Hn || Function("return this")(), fs = Nn, Vn = fs, zn = function() {
  return Vn.Date.now();
}, Un = zn, Ln = /\s/;
function Qn(n) {
  for (var e = n.length; e-- && Ln.test(n.charAt(e)); )
    ;
  return e;
}
var Wn = Qn, Kn = Wn, Gn = /^\s+/;
function qn(n) {
  return n && n.slice(0, Kn(n) + 1).replace(Gn, "");
}
var Jn = qn, Yn = fs, Zn = Yn.Symbol, gs = Zn, Dt = gs, ms = Object.prototype, Xn = ms.hasOwnProperty, er = ms.toString, _e = Dt ? Dt.toStringTag : void 0;
function tr(n) {
  var e = Xn.call(n, _e), t = n[_e];
  try {
    n[_e] = void 0;
    var s = !0;
  } catch {
  }
  var i = er.call(n);
  return s && (e ? n[_e] = t : delete n[_e]), i;
}
var sr = tr, ir = Object.prototype, nr = ir.toString;
function rr(n) {
  return nr.call(n);
}
var or = rr, Rt = gs, ar = sr, cr = or, lr = "[object Null]", ur = "[object Undefined]", Ht = Rt ? Rt.toStringTag : void 0;
function hr(n) {
  return n == null ? n === void 0 ? ur : lr : Ht && Ht in Object(n) ? ar(n) : cr(n);
}
var dr = hr;
function pr(n) {
  return n != null && typeof n == "object";
}
var fr = pr, gr = dr, mr = fr, vr = "[object Symbol]";
function Ar(n) {
  return typeof n == "symbol" || mr(n) && gr(n) == vr;
}
var br = Ar, yr = Jn, Nt = pt, wr = br, Vt = NaN, Cr = /^[-+]0x[0-9a-f]+$/i, xr = /^0b[01]+$/i, _r = /^0o[0-7]+$/i, $r = parseInt;
function kr(n) {
  if (typeof n == "number")
    return n;
  if (wr(n))
    return Vt;
  if (Nt(n)) {
    var e = typeof n.valueOf == "function" ? n.valueOf() : n;
    n = Nt(e) ? e + "" : e;
  }
  if (typeof n != "string")
    return n === 0 ? n : +n;
  n = yr(n);
  var t = xr.test(n);
  return t || _r.test(n) ? $r(n.slice(2), t ? 2 : 8) : Cr.test(n) ? Vt : +n;
}
var Fr = kr, Mr = pt, st = Un, zt = Fr, Sr = "Expected a function", Tr = Math.max, Ir = Math.min;
function jr(n, e, t) {
  var s, i, r, o, c, a, d = 0, l = !1, h = !1, p = !0;
  if (typeof n != "function")
    throw new TypeError(Sr);
  e = zt(e) || 0, Mr(t) && (l = !!t.leading, h = "maxWait" in t, r = h ? Tr(zt(t.maxWait) || 0, e) : r, p = "trailing" in t ? !!t.trailing : p);
  function m(E) {
    var B = s, M = i;
    return s = i = void 0, d = E, o = n.apply(M, B), o;
  }
  function f(E) {
    return d = E, c = setTimeout(k, e), l ? m(E) : o;
  }
  function C(E) {
    var B = E - a, M = E - d, F = e - B;
    return h ? Ir(F, r - M) : F;
  }
  function A(E) {
    var B = E - a, M = E - d;
    return a === void 0 || B >= e || B < 0 || h && M >= r;
  }
  function k() {
    var E = st();
    if (A(E))
      return j(E);
    c = setTimeout(k, C(E));
  }
  function j(E) {
    return c = void 0, p && s ? m(E) : (s = i = void 0, o);
  }
  function K() {
    c !== void 0 && clearTimeout(c), d = 0, s = a = i = c = void 0;
  }
  function R() {
    return c === void 0 ? o : j(st());
  }
  function re() {
    var E = st(), B = A(E);
    if (s = arguments, i = this, a = E, B) {
      if (c === void 0)
        return f(a);
      if (h)
        return clearTimeout(c), c = setTimeout(k, e), m(a);
    }
    return c === void 0 && (c = setTimeout(k, e)), o;
  }
  return re.cancel = K, re.flush = R, re;
}
var vs = jr;
const me = /* @__PURE__ */ ht(vs), Br = (n) => {
  if (n[n.length - 1] === "/") {
    const e = n.split("");
    return e.splice(e.length - 1, 1), e.join("");
  }
  return n;
}, Or = me((n) => {
  window == null || window.open(n);
}, 200), it = I.debug("MapObjectUrl");
class Pr {
  constructor(e, t) {
    this.mapId = e, this.factories = t;
  }
  open(e, t) {
    if (e != null && e.linked) {
      const s = e.outlink;
      e.targetBlank ? Or(s) : (it("open new map", s), this.factories.mapNameFromUrl.create(
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
                let a = s.outlink ? s.outlink : `${r}/${Er(c)}`;
                it("link is", a), a = Br(a), t.give(a);
              })
            );
          })
        );
      })
    ), t;
  }
}
function Er(n) {
  return n.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}
const Dr = I.debug("ObjectPositionBounds");
class Rr {
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
        o > a && (o = a), Dr("position", r, o), s.give({ x: r, y: o });
      })
    ), s;
  }
}
const Re = 15;
class Hr {
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
}, Nr = {
  positive: 1,
  negative: -1
}, Lt = I.debug("ObjectsOutsideScreen");
class Vr {
  constructor(e, t, s, i) {
    this.map = e, this.stageSize = t, this.layer = s, this.factories = i;
  }
  count(e, t) {
    const s = e.direction === "positive", i = this.factories.chain.create();
    return this.map.objects(this.factories.guestCast.create(t, i.receiveKey("objects"))), this.layer.layer(this.factories.guestCast.create(t, i.receiveKey("layer"))), this.layer.position(this.factories.guestCast.create(t, i.receiveKey("position"))), i.result(
      this.factories.guestInTheMiddle.create(
        t,
        ({ objects: r, layer: o, position: c }) => {
          var h;
          const a = Nr[e.direction], l = r.sort(
            (p, m) => p.position[nt[e.axis]] * a - m.position[nt[e.axis]] * a
          ).filter((p) => {
            const m = p.position[nt[e.axis]] + (s ? 0 : p[Ut[e.axis]]), f = c[e.axis] * -1 + (s ? o[Ut[e.axis]]() : 0);
            return Lt(
              "mb nearest points",
              e.direction,
              "objectP=",
              m,
              "screenP=",
              f
            ), s ? m > f : m < f;
          });
          Lt("nearest", l), t.give({
            count: l.length,
            nearestObjectId: ((h = l.at(s ? -1 : 0)) == null ? void 0 : h.id) ?? ""
          });
        }
      )
    ), t;
  }
}
class zr {
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
class Ur {
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
class Lr {
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
class Qr {
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
class Wr {
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
const Kr = I.debug("MapTypeUsed");
class Gr {
  constructor(e, t) {
    this.mapFile = e, this.factories = t;
  }
  check(e, t) {
    return this.mapFile.currentMap(
      this.factories.guest.create((s) => {
        const i = Object.values(s.objects).some(
          (r) => r.type === e.name
        );
        Kr("is type used", i), t.give(!i || "Тип карты использован");
      })
    ), this;
  }
}
class qr {
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
const Qt = I.debug("ParentTypes");
class Jr {
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
          Object.values(a.types).forEach((d) => {
            o[d.name] = d;
          });
        }), e.give(Object.values(o));
      })
    ), e;
  }
}
const Wt = I.debug("ObjectsMatchedToQuery");
class Yr {
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
const Zr = {
  height: 3e3,
  width: 3e3
};
class Xr {
  value(e) {
    return e.give(Zr), e;
  }
}
const Kt = I.debug("StageMoveRestriction");
class eo {
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
const $e = I.debug("app:MapObjectsVisible");
class to {
  constructor(e, t, s, i) {
    $(this, "visibleObjectsCache", new ge());
    $e("constructor initialized");
    const r = i.chain.create();
    t.size(i.patron.create(r.receiveKey("size"))), e.position(i.patron.create(r.receiveKey("position"))), s.currentMap(i.patron.create(r.receiveKey("map"))), r.result(
      i.patron.create(
        i.guest.create(({ position: o, size: c, map: a }) => {
          const d = Object.values(a.objects);
          $e("objects come to result", d);
          const l = d.filter((h) => {
            const p = a.types[h.type] ?? {}, m = {
              width: h.width || p.width,
              height: h.height || p.height
            };
            return this.isInBounding(o, c, h.position, m);
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
    const r = e.x, o = e.x - t.width, c = e.y, a = e.y - t.height, [d, l] = s;
    return $e("bounding vars", r, o, c, a), $e("object position", s), r > -d - i.width && -d > o && c > -l - i.height && -l > a;
  }
}
const so = (n, e) => {
  const t = n.matchAll(e);
  return Array.from(t).map((s) => s[1]);
}, io = (n, e) => n.reduce((t, s) => (t[s] = e[s] || s, t), {});
class no {
  constructor(e, t, s, i) {
    this.mapFile = t, this.mapObject = s, this.factories = i, e.objectId(this);
  }
  give(e) {
    return this.mapFile.currentMap(
      this.factories.guest.create((t) => {
        const s = t.objects[e];
        if (!s)
          return;
        const i = t.types[s.type], r = /\$\{([a-zA-Z1-9]+)\}/g, c = so(i.svg, r).filter((a) => a !== "width" && a !== "height");
        s.additionalFields = io(c, s.additionalFields ?? {}), this.mapObject.give(s);
      })
    ), this;
  }
  introduction() {
    return "patron";
  }
}
class ro {
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
    }, c = o.x - r.x, a = o.y - r.y, d = Math.abs(a) > Math.abs(c);
    let l = +t.x, h = +t.y;
    const p = d && a >= 0, m = !d && c >= 0, f = d && a < 0, C = !d && c < 0, A = { x: 0, y: 0 };
    let k = 0, j = 0;
    p ? (l += Math.round(e.width / 2), A.x = l, A.y = (t.y + i.y + s.height) / 2, k = i.x > t.x ? 1 : -1) : C ? (h += Math.round(e.height / 2), l += +e.width, A.x = (t.x + e.width + i.x) / 2, A.y = h, j = i.y > t.y ? 1 : -1) : f ? (l += Math.round(e.width / 2), h += +e.height, A.x = l, A.y = (t.y + e.height + i.y) / 2, k = i.x > t.x ? 1 : -1) : m && (h += Math.round(e.height / 2), A.x = (t.x + i.x + s.width) / 2, A.y = h, j = i.y > t.y ? 1 : -1);
    const K = [l, h].join("-"), R = this.filledPoints.get(K) || 0;
    return this.filledPoints.set(K, R + 1), {
      point: { x: l, y: h },
      breakPoint: A,
      shift: {
        x: k * R * 10,
        y: j * R * 10
      }
    };
  }
}
class oo {
  constructor(e, t) {
    this.objectsSource = e, this.objectsMapSource = t;
  }
  value(e) {
    const t = new Ke();
    return this.objectsSource.value(new L(e, t.receiveKey("objects"))), this.objectsMapSource.value(new L(e, t.receiveKey("objectsMap"))), t.result(
      new L(
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
class ao {
  constructor(e) {
    this.arrowDeps = e;
  }
  value(e) {
    return this.arrowDeps.value(
      new L(e, (t) => {
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
    let a = +e.position[0], d = +e.position[1];
    const l = c && o >= 0, h = !c && r >= 0, p = c && o < 0, m = !c && r < 0, f = { x: 0, y: 0 };
    return l ? (a += Math.round(e.width / 2), f.x = a, f.y = (e.position[1] + t.position[1] + t.height) / 2, t.position[0] > e.position[0]) : m ? (d += Math.round(e.height / 2), a += +e.width, f.x = (e.position[0] + e.width + t.position[0]) / 2, f.y = d, t.position[1] > e.position[1]) : p ? (a += Math.round(e.width / 2), d += +e.height, f.x = a, f.y = (e.position[1] + e.height + t.position[1]) / 2, t.position[1] > e.position[1]) : h && (d += Math.round(e.height / 2), f.x = (e.position[0] + t.position[0] + t.width) / 2, f.y = d, t.position[1] > e.position[1]), {
      point: { x: a, y: d },
      breakPoint: f,
      shift: {
        x: 0,
        y: 0
      }
    };
  }
}
class co {
  constructor(e) {
    this.arrowDeps = e;
  }
  value(e) {
    return this.arrowDeps.value(
      new L(e, (t) => {
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
    }, c = Object.entries(r).reduce((a, [d, l]) => (l() && (a = d), a), "left-top");
    return o[c]();
  }
}
class lo {
  constructor(e, t = 10) {
    this.arrowDepsSource = e, this.centerGap = t;
  }
  value(e) {
    return this.arrowDepsSource.value(
      new L(e, ({ fromObject: t, toObject: s }) => {
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
        }, d = {
          x: +r.x + Math.round(i.width / 2),
          y: +r.y + Math.round(i.height / 2)
        }, l = Math.abs(a.x - d.x) - (o.width + this.centerGap), h = Math.abs(a.y - d.y) - (o.height + this.centerGap);
        U({
          fromObject: t,
          toObject: s,
          type: l < 0 || h < 0 ? "threeBreaks" : "twoBreaks"
        }, e);
      })
    ), this;
  }
}
class uo {
  constructor(e) {
    this.basePoints = e;
  }
  value(e) {
    return this.basePoints.value(
      new L(e, (t) => {
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
class ho {
  constructor(e) {
    $(this, "pointGroups");
    this.basePoints = e, this.pointGroups = new uo(e);
  }
  value(e) {
    const t = new Ke();
    return this.pointGroups.value(new L(e, t.receiveKey("pointGroups"))), this.basePoints.value(new L(e, t.receiveKey("basePoints"))), t.result(
      new L(e, ({ pointGroups: s, basePoints: i }) => {
        Object.values(s).forEach((r) => {
          if (r.length <= 1)
            return;
          r.sort((a, d) => i[d.arrowIndex].points[d.pointEndIndex] - i[a.arrowIndex].points[a.pointEndIndex]);
          let o = 0, c = 0;
          r.forEach((a, d) => {
            const l = i[a.arrowIndex].points[a.pointStartIndex], h = i[a.arrowIndex].points[a.pointStartIndex + 1], p = i[a.arrowIndex].points[a.pointEndIndex], m = i[a.arrowIndex].points[a.pointEndIndex + 1], f = i[a.arrowIndex].points[a.breakPointStartIndex], C = i[a.arrowIndex].points[a.breakPointStartIndex + 1], A = l > f ? -1 : l < f ? 1 : 0, k = h > C ? -1 : h < C ? 1 : 0, j = l > p ? -1 : l < p ? 1 : 0, K = h > m ? -1 : h < m ? 1 : 0;
            if (A !== 0) {
              let R = 0;
              d !== 0 && (K > 0 ? (c += 1, R = c) : (o += 1, R = o)), K && (i[a.arrowIndex].points[a.pointStartIndex + 1] = i[a.arrowIndex].points[a.pointStartIndex + 1] + R * K * He), i[a.arrowIndex].points[a.breakPointStartIndex + 1] = i[a.arrowIndex].points[a.breakPointStartIndex + 1] + R * K * He;
            }
            if (k !== 0) {
              let R = 0;
              d !== 0 && (j > 0 ? (c += 1, R = c) : (o += 1, R = o)), i[a.arrowIndex].points[a.pointStartIndex] = i[a.arrowIndex].points[a.pointStartIndex] + R * j * He, i[a.arrowIndex].points[a.breakPointStartIndex] = i[a.arrowIndex].points[a.breakPointStartIndex] + R * j * He;
            }
          });
        }), U(i, e);
      })
    ), this;
  }
}
class po {
  constructor(e) {
    this.guestAwares = e;
  }
  value(e) {
    let t = null;
    return this.guestAwares.forEach((s) => {
      s.value(
        new L(e, (i) => {
          (!t || t === s) && (U(i, e), t = s);
        })
      );
    }), this;
  }
}
class fo {
  constructor(e, t) {
    this.baseSource = e, this.targetSourceFactory = t;
  }
  value(e) {
    const t = new Ke(), s = new ge(), i = this.targetSourceFactory.create(
      s
    );
    return this.baseSource.value(
      new L(e, (r) => {
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
class go {
  constructor(e) {
    this.buildingFn = e;
  }
  create(...e) {
    return this.buildingFn(...e);
  }
}
var mo = vs, vo = pt, Ao = "Expected a function";
function bo(n, e, t) {
  var s = !0, i = !0;
  if (typeof n != "function")
    throw new TypeError(Ao);
  return vo(t) && (s = "leading" in t ? !!t.leading : s, i = "trailing" in t ? !!t.trailing : i), mo(n, e, {
    leading: s,
    maxWait: e,
    trailing: i
  });
}
var yo = bo;
const wo = /* @__PURE__ */ ht(yo), { Arrow: Co } = he, xo = I.debug("MapObjectsArrows");
class _o {
  constructor(e, t, s, i, r) {
    $(this, "previouslyRenderedArrows", /* @__PURE__ */ new Map());
    this.konvaLayer = e, this.mapFile = t, this.mapDep = s, this.arrowPath = i, this.factories = r, xo("draw arrows on canvas");
    const o = this.factories.chain.create();
    this.konvaLayer.layer(this.factories.patron.create(o.receiveKey("layer"))), this.mapFile.currentMap(this.factories.patron.create(o.receiveKey("map"))), this.mapDep.objects(this.factories.patron.create(o.receiveKey("objects"))), o.result(
      this.factories.patron.create(
        this.factories.guest.create(
          wo(({ layer: c, map: a, objects: d }) => {
            this.previouslyRenderedArrows.forEach((p) => {
              p.arrow.hide();
            });
            const l = d.reduce((p, m) => (p[m.id] = m, p), {});
            new ho(new fo(new oo(
              new we((p) => U(d, p)),
              new we((p) => U(l, p))
            ), new go((p) => {
              const m = new lo(p);
              return new po([new co(m), new ao(m)]);
            }))).value((p) => {
              p.forEach((m) => {
                const f = m.key;
                if (this.previouslyRenderedArrows.has(f)) {
                  const A = this.previouslyRenderedArrows.get(f);
                  A.arrow.show(), A.arrow.points(m.points);
                  return;
                }
                const C = new Co({
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
                  arrow: C
                }), c.add(C);
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
const { Arrow: $o } = he, rt = I.debug("NewArrow"), Gt = {
  width: 10,
  height: 10
};
class ko {
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
                t = new $o({
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
const ke = I.debug("MapObjectBackground"), Fo = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD//gATQ3JlYXRlZCB3aXRoIEdJTVD/4gKwSUNDX1BST0ZJTEUAAQEAAAKgbGNtcwQwAABtbnRyUkdCIFhZWiAH6AAMAAQADQAqAAthY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1kZXNjAAABIAAAAEBjcHJ0AAABYAAAADZ3dHB0AAABmAAAABRjaGFkAAABrAAAACxyWFlaAAAB2AAAABRiWFlaAAAB7AAAABRnWFlaAAACAAAAABRyVFJDAAACFAAAACBnVFJDAAACFAAAACBiVFJDAAACFAAAACBjaHJtAAACNAAAACRkbW5kAAACWAAAACRkbWRkAAACfAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACQAAAAcAEcASQBNAFAAIABiAHUAaQBsAHQALQBpAG4AIABzAFIARwBCbWx1YwAAAAAAAAABAAAADGVuVVMAAAAaAAAAHABQAHUAYgBsAGkAYwAgAEQAbwBtAGEAaQBuAABYWVogAAAAAAAA9tYAAQAAAADTLXNmMzIAAAAAAAEMQgAABd7///MlAAAHkwAA/ZD///uh///9ogAAA9wAAMBuWFlaIAAAAAAAAG+gAAA49QAAA5BYWVogAAAAAAAAJJ8AAA+EAAC2xFhZWiAAAAAAAABilwAAt4cAABjZcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltjaHJtAAAAAAADAAAAAKPXAABUfAAATM0AAJmaAAAmZwAAD1xtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAEcASQBNAFBtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEL/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAAeAB4DAREAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAwUEAAj/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAH1SCMTDaCMTiuCMTDgxDGf/8QAHhAAAgIBBQEAAAAAAAAAAAAAAAMBAgQFExUyMxL/2gAIAQEAAQUCG9TUPHdga2PndgzrxZQ3qah48gsvnUtHILMrKq5f/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAwEBPwEH/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAgEBPwEH/8QAHhAAAgIBBQEAAAAAAAAAAAAAAAECMXIQQUKSsVH/2gAIAQEABj8CFkvdFkVLqzla4v6VLqxXe60WS90WRUipWipCSTvc/8QAIxAAAgADCAMAAAAAAAAAAAAAAAEQUfAhMUGhscHR8RFhcf/aAAgBAQABPyErMkMi0ZW2wylmzHorbYSSX3Vg5wrMkMi0Z0a5FVK8Llg05nRrkRmteVg//9oADAMBAAIAAwAAABCCQQSCSST/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAEDAQE/EAf/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAECAQE/EAf/xAAeEAEAAQQCAwAAAAAAAAAAAAABIRARIDEAQVFxkf/aAAgBAQABPxDEMgTA4U0lpO6EwKiFh/YAyDIEAZSTdCnwUQAma0AtZOl88//Z";
class Mo {
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
            ke("grid example", r), i.src = Fo, i.onload = () => {
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
const So = I.debug("Breadcrumbs");
class To {
  constructor(e, t, s) {
    this.parentNames = e, this.mapFile = t, this.factories = s;
  }
  list(e) {
    const t = this.factories.chain.create();
    return this.parentNames.names(this.factories.guestCast.create(e, t.receiveKey("names"))), this.mapFile.mapFile(this.factories.guestCast.create(e, t.receiveKey("mapFile"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ names: s, mapFile: i }) => {
        So("map id", s, i), e.give(
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
const qt = I.debug("CursorWithObjects");
class Io {
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
          const c = o.position[0], a = o.position[0] + o.width || 100, d = o.position[1], l = o.position[1] + o.height || 100;
          return s.x >= c && s.x <= a && s.y >= d && s.y <= l;
        });
        r ? (qt("crossed with", r), e.give({
          x: r.position[0] + r.width / 2,
          y: r.position[1] + r.height / 2
        })) : (qt("cursor pos", s), e.give(s));
      })
    ), this;
  }
}
class jo {
  constructor(e, t = 768) {
    this.windowWidth = e, this.mobileLimit = t;
  }
  value(e) {
    return this.windowWidth.value(
      new L(e, (t) => {
        U({
          isMobile: t <= this.mobileLimit,
          isDesktop: t > this.mobileLimit
        }, e);
      })
    ), this;
  }
}
const Jt = I.debug("Drawer");
class Bo {
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
class Oo {
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
class Po {
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
const Yt = I.debug("app:MiniMap"), Zt = 130;
class Eo {
  constructor(e, t, s, i) {
    $(this, "theSize");
    $(this, "thePoints");
    $(this, "viewportSizeCache");
    this.map = e, this.layer = t, this.stageSize = s, this.factories = i, this.theSize = i.sourceEmpty.create(), this.thePoints = i.sourceEmpty.create(), this.viewportSizeCache = i.sourceEmpty.create();
    const r = i.chain.create();
    e.objects(i.patron.create(r.receiveKey("objects"))), t.layer(i.patron.create(r.receiveKey("layer"))), s.value(i.patron.create(r.receiveKey("size"))), r.result(
      i.patron.create(
        i.guest.create(({ layer: o, size: c, objects: a }) => {
          const d = Zt / c.width, l = {
            width: Math.round(o.width() * d),
            height: Math.round(o.height() * d)
          };
          this.viewportSizeCache.give(l);
          const h = {
            width: Math.round(c.width * d),
            height: Math.round(c.height * d)
          };
          this.theSize.give(h);
          const p = a.map((m) => ({
            id: m.id,
            x: Math.round(m.position[0] * d),
            y: Math.round(m.position[1] * d),
            width: Math.round(m.width * d),
            height: Math.round(m.height * d)
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
        const r = Zt / s.width, o = {
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
const Xt = I.debug("Modal");
class Do {
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
class Ro {
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
const Fe = I.debug("ObjectGeometryFix");
class Ho {
  constructor(e, t, s, i) {
    $(this, "innerReceive");
    this.mapFile = t, this.map = s, this.factories = i, e.objects(i.patron.create(this)), this.innerReceive = me((r) => {
      this.mapFile.currentMap(
        this.factories.guest.create((o) => {
          Fe("objects to fix", r);
          const c = document.querySelectorAll(".objects-container .rendered-object"), a = o.objects;
          let d = !1;
          c.forEach((l) => {
            const h = l.getAttribute("data-object-id");
            if (Fe("i see id", h), !h)
              return;
            const p = a[h];
            if (p && (Fe("dom object geometry", l.clientWidth, l.clientHeight), Fe("saved object geometry", p.width, p.height), (p.width !== l.clientWidth || p.height !== l.clientHeight) && (d = !0, Fe("update object geometry"), p.width = l.clientWidth, p.height = l.clientHeight), !p.width || !p.height)) {
              const m = o.types[p.type];
              p.width = m.width, p.height = m.height;
            }
          }), d && this.map.give({
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
const Me = I.debug("MapObjectsRectsPatron");
class No {
  constructor(e, t, s, i, r, o, c, a, d) {
    $(this, "previouslyRenderedRects", /* @__PURE__ */ new Map());
    this.konvaLayer = e, this.mapFile = t, this.mapObject = s, this.mapObjectCurrent = r, this.mapObjectForRendering = o, this.objectPosition = c, this.settings = a, this.factories = d, i.objects(this);
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
                const a = r.types[c.type], d = +c.width || +a.width || 100, l = +c.height || +a.height || 100;
                if (this.previouslyRenderedRects.has(c)) {
                  const m = this.previouslyRenderedRects.get(c);
                  m.width(d), m.height(l), m.x(+c.position[0]), m.y(+c.position[1]), m.show();
                  return;
                }
                Me("rect object", c, a);
                const h = new he.Rect({
                  x: +c.position[0],
                  y: +c.position[1],
                  width: d,
                  height: l,
                  name: c.id,
                  draggable: !o.readonly,
                  objectId: c.id,
                  zIndex: 3
                });
                this.previouslyRenderedRects.set(c, h), t.add(h), h.on("mouseenter", () => {
                  t.getStage().container().style.cursor = "pointer";
                }), h.on("mouseleave", () => {
                  t.getStage().container().style.cursor = "default";
                }), h.on("dragend", () => {
                  Me("drag ended"), this.objectPosition.position(
                    c,
                    {
                      x: h.x(),
                      y: h.y()
                    },
                    this.factories.guest.create((m) => {
                      this.mapObject.give({
                        ...c,
                        position: [m.x, m.y]
                      });
                    })
                  );
                }), h.on("dragmove", () => {
                  Me("dragmove works", h.x(), h.y()), t.getStage().container().style.cursor = "move", this.objectPosition.position(
                    c,
                    {
                      x: h.x(),
                      y: h.y()
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
                h.on("click", p), h.on("tap", p);
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
class Vo {
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
const zo = I.debug("StagePosition");
class Uo {
  constructor(e) {
    this.stageMove = e;
  }
  give(e) {
    return zo("received position", e), this.stageMove.move(e), this;
  }
}
class Lo {
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
class Qo {
  constructor() {
    $(this, "source", new de({
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
const es = I.debug("Zindex");
class Wo {
  constructor(e) {
    $(this, "fnsCache");
    this.factories = e, this.fnsCache = e.cache.create([]), this.fnsCache.value(
      e.patron.create(
        e.guest.create(
          me((t) => {
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
const ts = I.debug("app:BrowserCanvas");
class Ko {
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
const Go = I.debug("Cursor");
class qo {
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
      Go("move cursor fired", r), this.cursorPool.give(r);
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
class Jo {
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
const Ne = I.debug("ControlCombo");
class Yo {
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
const Se = I.debug("Keyboard");
class Zo {
  constructor(e) {
    $(this, "pressedPool");
    $(this, "combinationsPool");
    Se("keyboard created"), this.pressedPool = e.pool.create(this), this.combinationsPool = e.pool.create(this), window == null || window.addEventListener("keyup", (t) => {
      Se("keyboard pressed", t.key), this.pressedPool.give(t.key);
    }), Ds({
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
const ss = I.debug("app:konva:KonvaLayer");
class Xo {
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
          }), c = new he.Layer();
          o.add(c), c.draw(), this.layerCache.give(c), o.on("dragend", (d) => {
            if (!(d.target instanceof he.Stage))
              return;
            const l = {
              x: o.x(),
              y: o.y()
            };
            ss("new position", l), this.positionCache.give(l);
          }), o.on("dragmove", (d) => {
            if (!(d.target instanceof he.Stage))
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
          o.dragBoundFunc((d) => (s.position(d, a), a.value()));
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
class ea {
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
const ta = I.debug("position");
class sa {
  constructor(e, t, s, i, r) {
    this.layer = e, this.canvas = t, this.stageSize = s, this.stageMoveRestriction = i, this.factories = r;
  }
  move(e) {
    ta("move stage to new point", e.position), this.stageSize.value(
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
const _ = Y(), Ge = new Zo(_), As = new de({
  readonly: !1,
  presets: {}
}), ia = new Do(Ge, _), bs = new Bo(Ge, _), qe = new Ro(_), ue = new yn(_), ys = _.sourceEmpty.create(), V = new _n(ys, ue, _), na = new wn(V), ra = new Ti(na), ft = new kn(V, ue, _), gt = new ds(ft, ue, _), oa = new ps(gt, ft, _), ie = new ds(V, ue, _), aa = new we((n) => {
  V.currentMap(new Ue(n));
}), Je = new Fn(bs, _), ca = new Ur(_), la = new zr(V, ie, _), ve = new Ko(_), Ae = new Xr(), ws = new eo(ve, Ae, _), ne = new Xo(ve, Ae, ws, _), ua = new Wo(_), ha = new Mo(ne, V, ua, _), xe = new ps(ie, V, _), da = new jn(
  ie,
  V,
  [new dt(qe, new Mn(V, _), _)],
  _
), pa = new ea(ne, _), fa = new Sn(ie, xe, ve, pa, _), Cs = new Gr(V, _), xs = new Wr(
  ie,
  V,
  [
    new dt(
      qe,
      new qr(Cs, _),
      _
    )
  ],
  _
), ga = new Qr(
  ie,
  V,
  [new dt(qe, Cs, _)],
  _
), ma = new Lr(xs), Ye = new to(ne, ve, ft, _), va = new Ho(
  Ye,
  V,
  ie,
  _
), Aa = new No(
  ne,
  V,
  xe,
  Ye,
  Je,
  oa,
  new Hr(new Rr(Ae, _), _),
  As,
  _
), ba = new qo(ne, _), ya = new Io(Ye, ba, _), _s = new ro(), $s = new ko(ne, ya, _s, _), wa = new _o(ne, V, gt, _s, _), Ca = new Eo(gt, ne, Ae, _), xa = new On(
  Je,
  ie,
  xe,
  $s,
  _
), _a = new Vo(V, ve, ne, _), $a = new no(
  Je,
  V,
  xe,
  _
), ka = new xn(V, ue, _), Fa = new In(xe), Ma = new Oo(), mt = new Tn(ue, _), Sa = new To(mt, V, _), Ta = new Pr(ue, _), Ia = new Jr(mt, V, _), ja = new Yo(Ge, _), Ba = new Po(V, _), ks = new sa(ne, ve, Ae, ws, _), Oa = new Uo(ks), Pa = new Lo(ks, _), Ea = new Yr(ie, _), Da = new Cn(V, ie, ue, _), Ra = new Vr(ie, Ae, ne, _), Fs = new ge();
new Jo(Fs);
const Ha = new Qo(), Na = new we((n) => {
  Ha.value(
    new L(n, (e) => {
      U(e.width, n);
    })
  );
}), Va = new jo(Na), za = {
  mapCurrentID: ue,
  mapFile: V,
  mapCurrent: ie,
  mapCurrentSource: aa,
  mapRemoved: ka,
  mapSettings: la,
  mapObject: xe,
  mapObjectRemoved: da,
  mapType: xs,
  mapTypeRemoved: ga,
  mapTypeNew: ma,
  mapObjectsVisible: Ye,
  mapObjectCurrent: Je,
  mapObjectNew: fa,
  mapObjectsLink: xa,
  mapTypeCurrent: ca,
  mapRects: Aa,
  mapBackground: ha,
  mapObjectArrows: wa,
  mapObjectsGeometryFix: va,
  canvas: ve,
  miniMap: Ca,
  notification: qe,
  modal: ia,
  drawer: bs,
  konvaLayer: ne,
  resizing: _a,
  objectAdditionalFieldsFix: $a,
  mapObjectRelationRemoved: Fa,
  fps: Ma,
  breadcrumbs: Sa,
  mapObjectUrl: Ta,
  keyboard: Ge,
  parentNames: mt,
  parentTypes: Ia,
  controlCombo: ja,
  menu: Ba,
  stagePosition: Oa,
  stagePositionByObjectId: Pa,
  objectsMatchedToQuery: Ea,
  stageSize: Ae,
  mapHistory: Da,
  fileContent: ys,
  newArrow: $s,
  objectsOutsideScreen: Ra,
  settings: As,
  documentTitle: ra,
  sidebarDraggable: Fs,
  device: Va
}, Q = () => za;
class T {
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
const Ua = { key: 0 }, La = { class: "flex-grow overflow-y-auto" }, Qa = {
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
    }, d = o.isOpenedByName(t.name, new T()).ref();
    return c.value(new ut((l) => {
      l.isMobile ? (r.ltr = r.ltr.replace("[50%]", "[100%]"), r.rtl = r.rtl.replace("[50%]", "[100%]")) : (r.ltr = r.ltr.replace("[100%]", "[50%]"), r.rtl = r.rtl.replace("[100%]", "[50%]"));
    })), (l, h) => (g(), z(rs, { name: "fade" }, {
      default: w(() => [
        u(d) ? (g(), b("div", {
          key: 0,
          class: te(i.value),
          onClick: a
        }, [
          y("div", {
            class: te(["absolute bg-white h-full p-3 flex flex-col overflow-hidden", r[n.direction]]),
            onClick: h[0] || (h[0] = Ce(() => {
            }, ["stop"]))
          }, [
            l.$slots.header ? (g(), b("div", Ua, [
              se(l.$slots, "header", { class: "BaseDrawer-Header" })
            ])) : S("", !0),
            y("div", La, [
              se(l.$slots, "default")
            ]),
            l.$slots.footer ? (g(), b("div", Qa, [
              se(l.$slots, "footer")
            ])) : S("", !0)
          ], 2)
        ], 2)) : S("", !0)
      ]),
      _: 3
    }));
  }
}), G = /* @__PURE__ */ P({
  __name: "BaseIcon",
  props: {
    icon: {
      type: String
    }
  },
  setup(n) {
    const e = {
      "fa-bars": si,
      "fa-bars-staggered": ti,
      "fa-text-width": ei,
      "fa-search": Xs,
      "fa-history": Zs,
      "fa-plus-square": Ys,
      "fa-cog": Js,
      "fa-file-text": qs,
      "fa-rotate-left": Gs,
      "fa-rotate-right": Ks,
      "fa-map": Ws,
      "fa-close": Qs,
      "fa-arrow-left": Ls,
      "fa-arrow-right": Us,
      "fa-arrow-down": zs,
      "fa-arrow-up": Vs,
      "fa-share-nodes": Ns
    };
    return (t, s) => (g(), z(u(Hs), {
      icon: e[n.icon]
    }, null, 8, ["icon"]));
  }
}), Wa = /* @__PURE__ */ y("h2", { class: "text-lg font-bold" }, " Карты в файле ", -1), Ka = ["onClick"], Ga = /* @__PURE__ */ P({
  __name: "AppFileMaps",
  setup(n) {
    const {
      mapFile: e,
      mapCurrentID: t,
      drawer: s,
      mapRemoved: i
    } = Q(), r = e.mapFile(new T()).ref(), o = t.id(new T()).ref(), c = (a) => {
      confirm("Вы уверены?") && i.give(a);
    };
    return (a, d) => (g(), z(vt, {
      direction: "rtl",
      name: "fileMaps"
    }, {
      header: w(() => [
        Wa
      ]),
      default: w(() => [
        y("div", null, [
          (g(!0), b(W, null, q(u(r), (l, h) => (g(), b("div", {
            key: h,
            class: "flex items-center gap-2"
          }, [
            y("a", {
              href: "#",
              class: te({ "font-bold": u(o) === h }),
              onClick: Ce((p) => {
                u(t).give(h), u(s).give("");
              }, ["prevent"])
            }, x(l.settings.title), 11, Ka),
            v(G, {
              onClick: (p) => c(h),
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
}), qa = { class: "AppMenuObject" }, Ja = {
  key: 0,
  class: "AppMenuObject-Empty"
}, Ya = {
  key: 1,
  class: "flex flex-col gap-1"
}, Za = ["onClick"], Xa = ["innerHTML"], ec = /* @__PURE__ */ P({
  __name: "AppMenuObject",
  setup(n) {
    const {
      controlCombo: e,
      drawer: t,
      menu: s,
      stagePosition: i
    } = Q(), { guest: r, patron: o } = Y(), c = s.menuObjects(new T()).ref();
    return e.happened(
      "KeyM",
      o.create(r.create(() => {
        t.give("menu");
      }))
    ), (a, d) => (g(), z(vt, {
      direction: "rtl",
      name: "menu"
    }, {
      default: w(() => [
        y("div", qa, [
          u(c).length ? (g(), b("div", Ya, [
            (g(!0), b(W, null, q(u(c), (l) => (g(), b("a", {
              key: l.id,
              class: "AppMenuObject-Item",
              href: "#",
              onClick: Ce((h) => {
                u(i).give(l), u(t).give("");
              }, ["prevent"])
            }, [
              y("span", {
                innerHTML: l.additionalName ? l.additionalName : l.name
              }, null, 8, Xa)
            ], 8, Za))), 128))
          ])) : (g(), b("div", Ja, x(a.$t("appMenuObject.noItems")), 1))
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
    return t.push(""), (s, i) => (g(), b("button", {
      type: "button",
      class: te(t)
    }, [
      se(s.$slots, "default")
    ]));
  }
}), tc = {
  key: 0,
  title: "Назад",
  class: "absolute text-white left-0 top-0 -ml-5 flex justify-center items-center bg-primary/70 hover:bg-primary-second/70 cursor-pointer w-5"
}, sc = {
  key: 1,
  class: "BaseModal-Header"
}, ic = { class: "overflow-y-auto flex-grow" }, nc = {
  key: 2,
  class: "BaseModal-Footer"
}, be = /* @__PURE__ */ P({
  __name: "BaseModal",
  props: {
    name: {
      type: String,
      required: !0
    }
  },
  setup(n) {
    const { modal: e } = Q(), t = n, s = e.isOpenedByName(t.name, new T()).ref(), i = [], r = () => {
      e.give("");
    };
    return (o, c) => (g(), z(rs, { name: "fade" }, {
      default: w(() => [
        u(s) ? (g(), b("div", {
          key: 0,
          class: "absolute rounded-main overflow-y-auto flex justify-center items-center top-0 left-0 bg-black/10 z-20 h-full w-full",
          onClick: r
        }, [
          y("div", {
            class: "w-full relative flex flex-col max-w-[800px] max-h-[90%] bg-white p-3",
            onClick: c[0] || (c[0] = Ce(() => {
            }, ["stop"]))
          }, [
            i.length > 1 ? (g(), b("div", tc, " < ")) : S("", !0),
            y("div", {
              title: "Закрыть",
              class: "e2e-modal-close absolute text-white right-0 top-0 -mr-5 flex justify-center items-center bg-danger/70 hover:bg-danger-second/70 cursor-pointer w-5",
              onClick: r
            }, " × "),
            o.$slots.header ? (g(), b("div", sc, [
              se(o.$slots, "header")
            ])) : S("", !0),
            y("div", ic, [
              se(o.$slots, "default")
            ]),
            o.$slots.footer ? (g(), b("div", nc, [
              se(o.$slots, "footer")
            ])) : S("", !0)
          ])
        ])) : S("", !0)
      ]),
      _: 3
    }));
  }
}), rc = { class: "AppPresets" }, oc = /* @__PURE__ */ y("div", { class: "text-md font-bold mb-2" }, "Общие", -1), ac = { class: "flex flex-col gap-2" }, cc = { class: "text-md font-bold mb-1" }, lc = { class: "flex gap-2 flex-wrap items-end" }, uc = { class: "AppTypesParent-ItemTitle" }, hc = ["innerHTML"], dc = /* @__PURE__ */ P({
  __name: "AppPresets",
  setup(n) {
    const {
      svgMapTypeImage: e
    } = Y(), { mapType: t, settings: s } = Q(), i = new T();
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
    return (o, c) => (g(), z(be, { name: "presets" }, {
      default: w(() => [
        y("div", rc, [
          oc,
          y("div", ac, [
            (g(!0), b(W, null, q(r.value, (a, d) => (g(), b("div", { key: d }, [
              y("h3", cc, x(d), 1),
              y("div", lc, [
                (g(!0), b(W, null, q(a, (l) => (g(), b("div", {
                  key: l.preset.name,
                  class: "flex flex-col gap-2"
                }, [
                  y("div", uc, x(l.preset.name), 1),
                  y("div", {
                    class: "AppTypesParent-ItemImage",
                    innerHTML: l.image,
                    style: ce(`width:${l.preset.width}px;height:${l.preset.height}px`)
                  }, null, 12, hc),
                  v(D, {
                    class: "AppTypesParent-ItemButton e2e-add-preset-type",
                    type: "success",
                    size: "sm",
                    onClick: (h) => u(t).give({ name: l.preset.name, type: l.preset })
                  }, {
                    default: w(() => [
                      O(x(o.$t("general.addToMap")), 1)
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
      me(() => {
        t.autofocus && i.value.focus();
      }, 500)
    );
    const r = Qe(t, "modelValue", s);
    return (o, c) => Le((g(), b("input", {
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
const pc = { class: "AppSearch" }, fc = {
  key: 0,
  class: "AppSearch-Items"
}, gc = ["onClick"], mc = ["innerHTML"], vc = ["innerHTML"], Ac = ["innerHTML"], bc = { key: 1 }, yc = { key: 2 }, wc = /* @__PURE__ */ P({
  __name: "AppSearch",
  setup(n) {
    const {
      objectsMatchedToQuery: e,
      controlCombo: t,
      modal: s,
      stagePosition: i
    } = Q(), { guest: r, patron: o } = Y(), c = ee(), a = I.debug("app:AppSearch");
    s.isOpenedByName(
      "search",
      o.create(r.create((h) => {
        setTimeout(() => {
          h && c.value && (a("search is opened", h), c.value.$el.focus());
        }, 500);
      }))
    );
    const d = ee(""), l = e.objects(
      new At(d),
      new T([])
    ).ref();
    return t.happened(
      "KeyF",
      o.create(r.create(() => {
        s.give("search");
      }))
    ), (h, p) => (g(), z(be, { name: "search" }, {
      default: w(() => [
        y("div", pc, [
          v(ae, {
            ref_key: "inputRef",
            ref: c,
            modelValue: d.value,
            "onUpdate:modelValue": p[0] || (p[0] = (m) => d.value = m),
            class: "mb-2 e2e-query-input",
            placeholder: h.$t("general.specifyQuery")
          }, null, 8, ["modelValue", "placeholder"]),
          u(l).length ? (g(), b("div", fc, [
            (g(!0), b(W, null, q(u(l), (m) => (g(), b("div", {
              key: m.name,
              class: "cursor-pointer",
              onClick: Ce((f) => {
                u(i).give(m), u(s).give("");
              }, ["prevent"])
            }, [
              y("b", {
                class: "AppSearch-ItemName",
                innerHTML: m.name
              }, null, 8, mc),
              m.additionalName ? (g(), b("b", {
                key: 0,
                class: "AppSearch-ItemName",
                innerHTML: m.additionalName
              }, null, 8, vc)) : S("", !0),
              m.additionalFields ? (g(), b("div", {
                key: 1,
                innerHTML: Object.values(m.additionalFields).join(" ")
              }, null, 8, Ac)) : S("", !0)
            ], 8, gc))), 128))
          ])) : d.value ? (g(), b("div", bc, x(h.$t("general.noResults")), 1)) : (g(), b("div", yc, x(h.$t("general.resultsWillBeHere")), 1))
        ])
      ]),
      _: 1
    }));
  }
}), Cc = { class: "AppTypes" }, xc = /* @__PURE__ */ y("div", { class: "text-md font-bold mb-2" }, "Родительские типы", -1), _c = { class: "flex gap-2 items-end" }, $c = { class: "AppTypesParent-ItemTitle" }, kc = ["innerHTML"], Fc = /* @__PURE__ */ P({
  __name: "AppTypesParent",
  setup(n) {
    const { parentTypes: e, mapType: t } = Q(), { svgMapTypeImage: s } = Y(), i = e.types(new T()).ref(), r = Ie(() => {
      var o;
      return (o = i.value) == null ? void 0 : o.map((c) => ({
        type: c,
        image: s.create(c).markup()
      })).sort((c, a) => +(c.type.name >= a.type.name));
    });
    return (o, c) => (g(), z(be, { name: "parentTypes" }, {
      default: w(() => [
        y("div", Cc, [
          xc,
          y("div", _c, [
            (g(!0), b(W, null, q(r.value, (a) => (g(), b("div", {
              key: a.type.name,
              class: "flex flex-col gap-2"
            }, [
              y("div", $c, x(a.type.name), 1),
              y("div", {
                class: "AppTypesParent-ItemImage",
                innerHTML: a.image,
                style: ce(`width:${a.type.width}px;height:${a.type.height}px`)
              }, null, 12, kc),
              v(D, {
                class: "AppTypesParent-ItemButton e2e-add-preset-type",
                type: "success",
                size: "sm",
                onClick: (d) => u(t).give({ name: a.type.name, type: a.type })
              }, {
                default: w(() => [
                  O(x(o.$t("general.addToMap")), 1)
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
const Mc = { class: "flex gap-2" }, ot = /* @__PURE__ */ P({
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
    return (r, o) => (g(), b("label", Mc, [
      Le(y("input", {
        "onUpdate:modelValue": o[0] || (o[0] = (c) => Be(i) ? i.value = c : null),
        type: "checkbox"
      }, null, 512), [
        [js, u(i)]
      ]),
      r.$slots.default ? se(r.$slots, "default", { key: 0 }) : (g(), b(W, { key: 1 }, [
        O(x(n.label), 1)
      ], 64))
    ]));
  }
}), Ze = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [s, i] of e)
    t[s] = i;
  return t;
}, Sc = {}, Tc = { class: "text-sm font-bold" };
function Ic(n, e) {
  return g(), b("div", Tc, [
    se(n.$slots, "default")
  ]);
}
const J = /* @__PURE__ */ Ze(Sc, [["render", Ic]]), jc = {}, Bc = { class: "mb-2" };
function Oc(n, e) {
  return g(), b("div", Bc, [
    se(n.$slots, "default")
  ]);
}
const X = /* @__PURE__ */ Ze(jc, [["render", Oc]]), Pc = { class: "rounded-main p-2 border border-solid border-body-dark" }, Ec = { class: "flex gap-2 p-2 bg-white border border-solid border-body-dark rounded-main" }, Ve = /* @__PURE__ */ P({
  __name: "BaseEditor",
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = n, s = e, i = ii({
      content: t.modelValue,
      extensions: [
        oi
      ],
      onUpdate: () => {
        i.value && s("update:modelValue", i.value.getHTML());
      }
    });
    return Bs(() => {
      var r;
      (r = i.value) == null || r.destroy();
    }), je(() => t.modelValue, (r) => {
      !i.value || i.value.getHTML() === r || i.value.commands.setContent(r, !1);
    }), (r, o) => (g(), b("div", Pc, [
      v(u(ni), { editor: u(i) }, null, 8, ["editor"]),
      u(i) ? (g(), z(u(ri), {
        key: 0,
        editor: u(i),
        "tippy-options": { duration: 100 }
      }, {
        default: w(() => [
          y("div", Ec, [
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
      }, 8, ["editor"])) : S("", !0)
    ]));
  }
}), Dc = ["value"], Rc = /* @__PURE__ */ P({
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
    return (r, o) => Le((g(), b("select", {
      label: "select",
      "onUpdate:modelValue": o[0] || (o[0] = (c) => Be(i) ? i.value = c : null),
      class: "block bg-white rounded-main w-full p-2 border border-solid border-body-dark"
    }, [
      (g(!0), b(W, null, q(t.items, (c) => (g(), b("option", {
        key: c[t.optionId],
        value: c[t.optionId]
      }, x(c[t.optionLabel]), 9, Dc))), 128))
    ], 512)), [
      [Os, u(i)]
    ]);
  }
}), Hc = { class: "text-lg font-bold" }, Nc = {
  key: 0,
  class: "flex gap-2 items-center"
}, Vc = {
  key: 1,
  class: "flex gap-2 mt-2"
}, zc = { key: 0 }, Uc = { key: 1 }, Lc = {
  key: 0,
  class: "flex flex-col gap-2"
}, Qc = { class: "FormObject-Inner" }, Wc = { class: "FormObject-Row" }, Kc = { class: "FormObject-Row" }, Gc = { class: "FormObject-Row" }, qc = { class: "my-2" }, Jc = { class: "FormObject-Title" }, Yc = { class: "FormObject-Row" }, Zc = { class: "FormObject-Title" }, Xc = { class: "FormObject-Row" }, el = {
  key: 0,
  class: "FormObject-ArrowName"
}, tl = { class: "py-3 flex gap-1" }, sl = /* @__PURE__ */ P({
  __name: "FormObject",
  setup(n) {
    const e = us("FormObject"), {
      mapObjectCurrent: t,
      mapFile: s,
      mapObject: i,
      mapCurrent: r,
      drawer: o,
      mapObjectRemoved: c,
      mapObjectRelationRemoved: a,
      mapObjectUrl: d,
      controlCombo: l
    } = Q(), {
      patron: h,
      chain: p,
      guest: m
    } = Y(), f = new Ms(() => {
      const B = p.create();
      t.objectId(h.create(B.receiveKey("objectId"))), s.currentMap(h.create(B.receiveKey("map"))), B.result(h.create(
        m.create(({ map: M, objectId: F }) => {
          e("object opened", F), f.value = M.objects[F];
        })
      ));
    }).ref(), C = r.types(new T()).ref(), A = s.currentMap(new T()).ref(), k = new At(f), j = d.url(k, new T()).ref(), K = () => {
      t.give(""), o.give("");
    }, R = () => {
      c.give(f.value), K();
    }, re = () => {
      i.give({
        ...f.value,
        outlink: f.value.outlink || j.value
      }), K();
    }, E = (B) => {
      a.give({
        index: B,
        object: f.value
      });
    };
    return l.happenedConditional(
      "KeyS",
      o.openedByName("object"),
      h.create(m.create(re))
    ), (B, M) => (g(), z(vt, {
      name: "object",
      onClose: K
    }, {
      header: w(() => [
        y("h2", Hc, x(B.$t("general.mapObject")), 1),
        u(f) ? (g(), b("small", Nc, [
          y("span", null, " ID #" + x(u(f).id), 1)
        ])) : S("", !0),
        u(f) ? (g(), b("div", Vc, [
          u(f).createTimestamp ? (g(), b("div", zc, " Создан: " + x(new Date(u(f).createTimestamp).toLocaleString()), 1)) : S("", !0),
          u(f).changeTimestamp ? (g(), b("div", Uc, " Изменен: " + x(new Date(u(f).changeTimestamp).toLocaleString()), 1)) : S("", !0)
        ])) : S("", !0)
      ]),
      footer: w(() => [
        y("div", tl, [
          v(D, {
            type: "success",
            onClick: re
          }, {
            default: w(() => [
              O(x(B.$t("general.save")), 1)
            ]),
            _: 1
          }),
          v(D, {
            type: "danger",
            onClick: R
          }, {
            default: w(() => [
              O(x(B.$t("general.delete")), 1)
            ]),
            _: 1
          }),
          v(D, { onClick: K }, {
            default: w(() => [
              O(x(B.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: w(() => [
        u(f) ? (g(), b("div", Lc, [
          y("div", Qc, [
            y("div", Wc, [
              v(ot, {
                modelValue: u(f).linked,
                "onUpdate:modelValue": M[0] || (M[0] = (F) => u(f).linked = F),
                label: B.$t("general.nameAsLink")
              }, null, 8, ["modelValue", "label"])
            ]),
            u(f).linked ? (g(), b(W, { key: 0 }, [
              v(J, null, {
                default: w(() => [
                  O(x(B.$t("general.outerLink")), 1)
                ]),
                _: 1
              }),
              y("div", Kc, [
                v(ae, {
                  "model-value": u(f).outlink || u(j),
                  "onUpdate:modelValue": M[1] || (M[1] = (F) => u(f).outlink = F)
                }, null, 8, ["model-value"])
              ]),
              y("div", Gc, [
                v(ot, {
                  modelValue: u(f).targetBlank,
                  "onUpdate:modelValue": M[2] || (M[2] = (F) => u(f).targetBlank = F),
                  label: B.$t("general.inNewTab")
                }, null, 8, ["modelValue", "label"])
              ])
            ], 64)) : S("", !0),
            (g(!0), b(W, null, q(u(f).additionalFields, (F, Z) => (g(), z(X, {
              class: "mb-2",
              key: Z
            }, {
              default: w(() => [
                v(J, { class: "mb-1" }, {
                  default: w(() => [
                    O(x(Z), 1)
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
                    O(x(B.$t("general.topName")), 1)
                  ]),
                  _: 1
                }),
                v(Ve, {
                  modelValue: u(f).additionalName,
                  "onUpdate:modelValue": M[3] || (M[3] = (F) => u(f).additionalName = F)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            v(X, null, {
              default: w(() => [
                v(J, null, {
                  default: w(() => [
                    O(x(B.$t("general.bottomName")), 1)
                  ]),
                  _: 1
                }),
                v(Ve, {
                  modelValue: u(f).name,
                  "onUpdate:modelValue": M[4] || (M[4] = (F) => u(f).name = F)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            v(X, null, {
              default: w(() => [
                v(J, null, {
                  default: w(() => [
                    O(x(B.$t("general.description")), 1)
                  ]),
                  _: 1
                }),
                v(Ve, {
                  modelValue: u(f).description,
                  "onUpdate:modelValue": M[5] || (M[5] = (F) => u(f).description = F)
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
                  "onUpdate:modelValue": M[6] || (M[6] = (F) => u(f).zindex = F),
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
                  "onUpdate:modelValue": M[7] || (M[7] = (F) => u(f).width = F),
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
                  "onUpdate:modelValue": M[8] || (M[8] = (F) => u(f).height = F),
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
                    O(x(B.$t("general.objectType")), 1)
                  ]),
                  _: 1
                }),
                v(Rc, {
                  modelValue: u(f).type,
                  "onUpdate:modelValue": M[9] || (M[9] = (F) => u(f).type = F),
                  items: u(C),
                  "option-id": "id",
                  "option-label": "name"
                }, null, 8, ["modelValue", "items"])
              ]),
              _: 1
            }),
            y("div", qc, [
              v(ot, {
                modelValue: u(f).inMenu,
                "onUpdate:modelValue": M[10] || (M[10] = (F) => u(f).inMenu = F),
                label: B.$t("general.useInMenu")
              }, null, 8, ["modelValue", "label"])
            ]),
            u(f).inMenu ? (g(), b(W, { key: 1 }, [
              y("div", Jc, x(B.$t("general.menuOrder")), 1),
              y("div", Yc, [
                v(ae, {
                  modelValue: u(f).menuOrder,
                  "onUpdate:modelValue": M[11] || (M[11] = (F) => u(f).menuOrder = F),
                  type: "number"
                }, null, 8, ["modelValue"])
              ])
            ], 64)) : S("", !0),
            u(f).arrows && u(f).arrows.length ? (g(), b(W, { key: 2 }, [
              y("div", Zc, x(B.$t("general.relations")), 1),
              y("div", Xc, [
                (g(!0), b(W, null, q(u(f).arrows, (F, Z) => {
                  var le;
                  return g(), b("div", {
                    key: F.id,
                    class: "FormObject-Arrow"
                  }, [
                    (le = u(A)) != null && le.objects[F.id] ? (g(), b("span", el, " #" + x(Z + 1) + " " + x(u(A).objects[F.id].name), 1)) : S("", !0),
                    v(D, {
                      class: "FormObject-ArrowButton",
                      type: "danger",
                      size: "sm",
                      onClick: (ye) => E(Z)
                    }, {
                      default: w(() => [
                        O(x(B.$t("general.delete")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]);
                }), 128))
              ])
            ], 64)) : S("", !0)
          ])
        ])) : S("", !0)
      ]),
      _: 1
    }));
  }
}), il = { class: "BaseTextarea" }, nl = ["v-bind"], Ss = /* @__PURE__ */ P({
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
    return (r, o) => (g(), b("div", il, [
      Le(y("textarea", {
        ref: "textarea",
        "v-bind": r.$attrs,
        "onUpdate:modelValue": o[0] || (o[0] = (c) => Be(i) ? i.value = c : null),
        class: "rounded-main block w-full p-2 border min-h-[200px] border-solid border-body-dark"
      }, null, 8, nl), [
        [os, u(i)]
      ])
    ]));
  }
}), rl = { class: "text-lg font-bold" }, ol = {
  key: 0,
  class: "flex flex-col"
}, al = { class: "flex justify-end pt-4 gap-2" }, cl = /* @__PURE__ */ P({
  __name: "FormType",
  setup(n) {
    const {
      mapTypeCurrent: e,
      mapFile: t,
      mapType: s,
      modal: i,
      controlCombo: r
    } = Q(), { patron: o, chain: c, guest: a } = Y();
    e.typeId(
      o.create(a.create((f) => {
        f && i.give("type");
      }))
    );
    const d = ee(""), l = c.create(), h = new Ms(() => {
      e.typeId(o.create(l.receiveKey("typeId"))), t.currentMap(o.create(l.receiveKey("map"))), l.result(o.create(
        a.create(({ map: f, typeId: C }) => {
          var A;
          h.value = f.types[C], d.value = (A = h.value) == null ? void 0 : A.name;
        })
      ));
    }).ref(), p = () => {
      e.give(""), i.give(""), l.receiveKey("typeId").give("");
    }, m = () => {
      s.give({
        name: d.value,
        type: h.value
      }), p();
    };
    return r.happenedConditional(
      "KeyS",
      i.openedByName("type"),
      o.create(a.create(m))
    ), (f, C) => (g(), z(be, { name: "type" }, {
      header: w(() => [
        y("h2", rl, x(f.$t("general.mapType")), 1)
      ]),
      footer: w(() => [
        y("div", al, [
          v(D, {
            type: "success",
            onClick: m
          }, {
            default: w(() => [
              O(x(f.$t("general.save")), 1)
            ]),
            _: 1
          }),
          v(D, { onClick: p }, {
            default: w(() => [
              O(x(f.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: w(() => [
        u(h) ? (g(), b("div", ol, [
          v(X, null, {
            default: w(() => [
              v(J, null, {
                default: w(() => [
                  O(" Название типа ")
                ]),
                _: 1
              }),
              v(ae, {
                modelValue: u(h).name,
                "onUpdate:modelValue": C[0] || (C[0] = (A) => u(h).name = A)
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
              v(Ss, {
                modelValue: u(h).svg,
                "onUpdate:modelValue": C[1] || (C[1] = (A) => u(h).svg = A)
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
                modelValue: u(h).width,
                "onUpdate:modelValue": C[2] || (C[2] = (A) => u(h).width = A)
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
                modelValue: u(h).height,
                "onUpdate:modelValue": C[3] || (C[3] = (A) => u(h).height = A)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          })
        ])) : S("", !0)
      ]),
      _: 1
    }));
  }
}), at = I.debug("MapObjectsWithTemplates");
class ll {
  constructor(e, t, s) {
    this.mapObjects = e, this.map = t, this.factories = s;
  }
  objects(e) {
    const t = this.factories.chain.create();
    return this.map.types(this.factories.guestCast.create(e, t.receiveKey("types"))), this.mapObjects.objects(this.factories.guestCast.create(e, t.receiveKey("objects"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ types: s, objects: i }) => {
        at("visible objects", i);
        const r = i.map((o) => {
          const c = s.find((d) => String(d.id) === String(o.type));
          if (at("check type existed", c), !c)
            return {
              obj: o,
              template: ""
            };
          let { svg: a } = c;
          return at("type svg", a), o.additionalFields && Object.entries(o.additionalFields).forEach(([d, l]) => {
            a = a.replaceAll(`\${${d}}`, l);
          }), ["width", "height"].forEach((d) => {
            a = a.replaceAll(`\${${d}}`, o[d]);
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
const ul = /* @__PURE__ */ P({
  __name: "BaseNotify",
  setup(n) {
    const { notification: e } = Q(), t = e.message(new T()).ref();
    return (s, i) => u(t) && u(t).text !== "hide" ? (g(), b("div", {
      key: 0,
      class: te(["inline font-bold", `text-${u(t).type}-second`])
    }, x(u(t).text), 3)) : S("", !0);
  }
}), hl = { class: "relative" }, dl = { class: "absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-1" }, pl = { class: "text-sm z-10 p-2 absolute bottom-0 left-5" }, fl = /* @__PURE__ */ Ps('<div class="absolute bottom-3 shadow-standard-second shadow-md drop-shadow right-3 z-10"><div class="grid-example grid grid-rows-2 grid-cols-2 bg-standard-second border border-standard-second gap-[1px] border-t-0 border-l-0"><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div></div></div><div class="absolute z-30 top-0 left-0 h-[18px] w-[22px] bg-white"></div>', 2), gl = ["title"], ml = { class: "font-bold" }, vl = ["title"], Al = { class: "font-bold" }, bl = ["title"], yl = { class: "font-bold" }, wl = ["title"], Cl = { class: "font-bold" }, xl = ["data-object-id"], _l = { class: "absolute bottom-[100%] left-[50%] translate-x-[-50%] text-center pb-2 pointer-events-auto text-sm w-[300px]" }, $l = ["innerHTML", "onClick"], kl = ["innerHTML"], Fl = ["data-object-id", "innerHTML"], Ml = /* @__PURE__ */ P({
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
      objectsOutsideScreen: d,
      stagePositionByObjectId: l,
      mapCurrentSource: h
    } = Q(), p = Y(), m = r.value(new T()).ref(), C = new ll(
      t,
      s,
      p
    ).objects(new T([])).ref(), A = a.value(new T()).ref(), k = i.position(new T()).ref(), j = Ie(() => {
      var ye;
      return (ye = A.value) == null ? void 0 : ye.width;
    }), K = new At(j), R = p.numberChunks.create(10, K).chunks(new T()).ref(), re = ee();
    as(() => {
      e.give(re.value);
    });
    const E = (ye) => {
      c.open(ye, p.guest.create((oe) => {
        o.give(oe);
      }));
    }, B = d.count(
      { axis: "x", direction: "negative" },
      new T()
    ).ref(), M = d.count(
      { axis: "x", direction: "positive" },
      new T()
    ).ref(), F = d.count(
      { axis: "y", direction: "negative" },
      new T()
    ).ref(), Z = d.count(
      { axis: "y", direction: "positive" },
      new T()
    ).ref(), le = l.move.bind(l, h);
    return (ye, oe) => {
      var bt, yt, wt, Ct, xt, _t, $t, kt, Ft, Mt, St, Tt;
      return g(), b("div", hl, [
        y("div", dl, [
          y("div", pl, [
            O(" Видимых объектов: " + x(u(C).length) + ", FPS: " + x(u(m)) + ", ", 1),
            v(ul)
          ]),
          fl,
          ((bt = u(B)) == null ? void 0 : bt.count) > 0 ? (g(), b("div", {
            key: 0,
            class: "pointer-events-auto absolute z-30 top-0 left-4 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(yt = u(B)) == null ? void 0 : yt.count} шт. объектов левее`,
            onClick: oe[0] || (oe[0] = (N) => u(le)(u(B).nearestObjectId))
          }, [
            v(G, { icon: "fa-arrow-left" }),
            y("span", ml, x((wt = u(B)) == null ? void 0 : wt.count), 1)
          ], 8, gl)) : S("", !0),
          ((Ct = u(M)) == null ? void 0 : Ct.count) > 0 ? (g(), b("div", {
            key: 1,
            class: "pointer-events-auto absolute z-30 p-1 top-0 right-0 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(xt = u(M)) == null ? void 0 : xt.count} шт. объектов правее`,
            onClick: oe[1] || (oe[1] = (N) => u(le)(u(M).nearestObjectId))
          }, [
            y("span", Al, x((_t = u(M)) == null ? void 0 : _t.count), 1),
            v(G, { icon: "fa-arrow-right" })
          ], 8, vl)) : S("", !0),
          (($t = u(F)) == null ? void 0 : $t.count) > 0 ? (g(), b("div", {
            key: 2,
            class: "pointer-events-auto absolute z-30 top-[18px] left-0 w-[18px] bg-white flex flex-col leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(kt = u(F)) == null ? void 0 : kt.count} шт. объектов выше`,
            onClick: oe[2] || (oe[2] = (N) => u(le)(u(F).nearestObjectId))
          }, [
            v(G, { icon: "fa-arrow-up" }),
            y("span", yl, x((Ft = u(F)) == null ? void 0 : Ft.count), 1)
          ], 8, bl)) : S("", !0),
          ((Mt = u(Z)) == null ? void 0 : Mt.count) > 0 ? (g(), b("div", {
            key: 3,
            class: "pointer-events-auto absolute z-30 p-1 bottom-0 left-0 w-[18px] bg-white flex flex-col-reverse leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(St = u(Z)) == null ? void 0 : St.count} шт. объектов ниже`,
            onClick: oe[3] || (oe[3] = (N) => u(le)(u(Z).nearestObjectId))
          }, [
            v(G, { icon: "fa-arrow-down" }),
            y("span", Cl, x((Tt = u(Z)) == null ? void 0 : Tt.count), 1)
          ], 8, wl)) : S("", !0),
          y("div", {
            class: te({ "objects-container absolute top-0 left-0": !0 }),
            style: ce({ width: `${u(A).width}px`, height: `${u(A).height}px`, transform: `translate(${u(k).x}px, ${u(k).y}px)` })
          }, [
            y("div", {
              class: "absolute flex top-0 left-0 w-full z-20 h-[20px] bg-default border-b-2 border-border text-right text-sm px-2",
              style: ce({ transform: `translate(0, ${-u(k).y}px)` })
            }, [
              (g(!0), b(W, null, q(u(R), (N) => (g(), b("span", {
                class: "flex-1 text-body-dark",
                key: `horiz_${N}`
              }, x(N) + "px", 1))), 128))
            ], 4),
            y("div", {
              class: "absolute flex [writing-mode:vertical-lr] top-0 left-0 h-full z-20 w-[20px] bg-default border-r-2 border-border text-left text-sm py-2",
              style: ce({ transform: `translate(${-u(k).x}px, 0)` })
            }, [
              (g(!0), b(W, null, q(u(R), (N) => (g(), b("span", {
                class: "flex-1 rotate-180 text-body-dark",
                key: `vert_${N}`
              }, x(N) + "px", 1))), 128))
            ], 4),
            (g(!0), b(W, null, q(u(C), (N) => (g(), b("div", {
              key: N.obj.id,
              class: "absolute z-10",
              "data-object-id": N.obj.id,
              style: ce(`width:${N.obj.width}px;height: ${N.obj.height}px;top: ${N.obj.position[1]}px;left:${N.obj.position[0]}px;z-index:${N.obj.zindex}`)
            }, [
              y("div", _l, [
                y("span", {
                  innerHTML: N.obj.additionalName,
                  class: te([N.obj.linked && "cursor-pointer underline"]),
                  onClick: (Fu) => E(N.obj)
                }, null, 10, $l)
              ]),
              y("div", {
                class: "absolute top-[100%] left-[50%] translate-x-[-50%] text-center pt-2 text-sm w-[300px]",
                innerHTML: N.obj.name
              }, null, 8, kl),
              y("div", {
                "data-object-id": N.obj.id,
                class: "rendered-object",
                innerHTML: N.template
              }, null, 8, Fl)
            ], 12, xl))), 128))
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
}), Sl = { class: "flex flex-wrap gap-2" }, Tl = { key: 0 }, Il = { key: 1 }, jl = ["onClick"], Bl = /* @__PURE__ */ P({
  __name: "BaseBreadcrumbs",
  setup(n) {
    const {
      breadcrumbs: e,
      mapCurrentID: t
    } = Q(), s = e.list(new T()).ref();
    return (i, r) => (g(), b("div", Sl, [
      (g(!0), b(W, null, q(u(s), (o, c) => (g(), b("span", {
        class: "flex gap-2",
        key: o.name
      }, [
        c !== 0 ? (g(), b("span", Tl, "/")) : S("", !0),
        c === u(s).length - 1 ? (g(), b("b", Il, "Открыто: " + x(o.title), 1)) : (g(), b("a", {
          key: 2,
          href: "#",
          onClick: Ce((a) => u(t).give(o.name), ["prevent"])
        }, x(o.title), 9, jl))
      ]))), 128))
    ]));
  }
}), Ol = { class: "flex items-center p-3 gap-3" }, Pl = { class: "ml-auto gap-1 flex" }, El = /* @__PURE__ */ P({
  __name: "TheHeader",
  setup(n) {
    const {
      drawer: e,
      modal: t,
      mapHistory: s,
      controlCombo: i,
      settings: r
    } = Q(), { patron: o, guest: c } = Y(), a = s.isNextPossible(new T()).ref(), d = s.isPrevPossible(new T()).ref();
    i.happened(
      "KeyZ",
      o.create(c.create(() => {
        d.value && s.prev();
      }))
    ), i.happened(
      "KeyP",
      o.create(c.create(() => {
        a.value && s.next();
      }))
    );
    const l = new T();
    return r.value(l), (h, p) => (g(), b("div", Ol, [
      v(Bl, { class: "TheHeader-Breadcrumbs" }),
      y("div", Pl, [
        u(a) && !u(l).value.readonly ? (g(), z(D, {
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
        })) : S("", !0),
        u(d) && !u(l).value.readonly ? (g(), z(D, {
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
        })) : S("", !0),
        v(D, {
          type: "success",
          size: "sm",
          class: "w-7 block e2e-open-menu",
          title: h.$t("general.menu"),
          onClick: p[2] || (p[2] = (m) => u(e).give("menu"))
        }, {
          default: w(() => [
            v(G, { icon: "fa-bars" })
          ]),
          _: 1
        }, 8, ["title"]),
        v(D, {
          title: h.$t("general.byText"),
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
}), Dl = {}, Rl = { class: "text-lg font-bold" };
function Hl(n, e) {
  return g(), b("span", Rl, [
    se(n.$slots, "default")
  ]);
}
const Nl = /* @__PURE__ */ Ze(Dl, [["render", Hl]]), Vl = { class: "flex gap-1" }, zl = {
  key: 0,
  class: "TheMapAsText select-auto"
}, Ul = ["innerHTML"], Ll = /* @__PURE__ */ P({
  __name: "TheMapAsText",
  setup(n) {
    const { mapFile: e, mapCurrent: t } = Q(), {
      guest: s,
      patron: i,
      textOf: r,
      textNlAsBr: o,
      textWithoutHTML: c
    } = Y(), a = e.currentMap(new T()).ref(), d = ee(""), l = ee([]);
    t.objects(
      i.create(
        s.create(me((A) => {
          l.value = A, o.create(
            r.create(
              A.map((k) => `<div class="TheMapAsText-Item">
                <h3>${k.name}</h3><p>${k.additionalName || ""}</p><p>${k.description || ""}</p><p>${k.additionalFields && Object.values(k.additionalFields).join("</p><p>")}</p></div>`).join("")
            )
          ).asString(
            s.create((k) => {
              d.value = k;
            })
          );
        }, 500))
      )
    );
    const { share: h, isSupported: p } = Rs(), m = () => {
      p.value || alert("Sharing is not supported"), c.create(
        r.create(
          d.value
        )
      ).asString(
        s.create((A) => {
          h({
            text: A
          });
        })
      );
    }, f = ee(), C = () => {
      var A, k;
      if (a.value) {
        const j = new Range();
        j.setStart(f.value, 0), j.setEnd(f.value, Object.values(l.value).length), (A = document.getSelection()) == null || A.removeAllRanges(), (k = document.getSelection()) == null || k.addRange(j);
      }
    };
    return (A, k) => (g(), z(be, { name: "mapAsText" }, {
      header: w(() => [
        v(Nl, { class: "block mb-3" }, {
          default: w(() => [
            O(x(A.$t("general.mapAsText")) + " ", 1),
            y("div", Vl, [
              v(D, {
                size: "sm",
                type: "success",
                class: "font-normal",
                onClick: m
              }, {
                default: w(() => [
                  O(x(A.$t("general.share")), 1)
                ]),
                _: 1
              }),
              v(D, {
                size: "sm",
                type: "primary",
                class: "font-normal",
                onClick: C
              }, {
                default: w(() => [
                  O(x(A.$t("general.selectAll")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        })
      ]),
      default: w(() => [
        u(a) ? (g(), b("article", zl, [
          y("div", {
            ref_key: "textRef",
            ref: f,
            innerHTML: d.value
          }, null, 8, Ul)
        ])) : S("", !0)
      ]),
      _: 1
    }));
  }
}), Ql = { key: 1 }, Wl = /* @__PURE__ */ P({
  __name: "TheMiniMap",
  setup(n) {
    const { miniMap: e } = Q(), t = e.points(new T()).ref(), s = e.size(new T()).ref(), i = e.viewportSize(new T()).ref(), r = e.viewportPosition(new T()).ref();
    return (o, c) => u(s) ? (g(), b("div", {
      key: 0,
      style: ce({
        width: `${u(s).width}px`,
        height: `${u(s).height}px`
      }),
      class: "absolute pointer-events-none block bg-white bottom-[10px] mt-3 right-3 z-1 border border-solid border-body-dark"
    }, [
      u(r) ? (g(), b("div", {
        key: 0,
        style: ce({
          width: `${u(i).width}px`,
          height: `${u(i).height}px`,
          top: `${u(r).y}px`,
          left: `${u(r).x}px`
        }),
        class: "absolute bg-primary/50"
      }, null, 4)) : S("", !0),
      u(t) ? (g(), b("div", Ql, [
        (g(!0), b(W, null, q(u(t), (a) => (g(), b("div", {
          key: a.id,
          class: "absolute w-1 h-1 block bg-danger",
          style: ce({
            top: `${a.y}px`,
            left: `${a.x}px`,
            width: `${a.width}px`,
            height: `${a.height}px`
          })
        }, null, 4))), 128))
      ])) : S("", !0)
    ], 4)) : S("", !0);
  }
}), Kl = { class: "text-lg font-bold" }, Gl = {
  key: 0,
  class: "TheSettings"
}, ql = { class: "mb-2" }, Jl = { class: "TheSettings-Row" }, Yl = { class: "flex gap-2 mb-2" }, Zl = { class: "mb-2" }, Xl = { class: "mb-2" }, eu = {
  href: "https://github.com/kosukhin/mind-map-creator",
  target: "_blank"
}, tu = { class: "flex gap-2" }, su = /* @__PURE__ */ P({
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
    } = Q(), { patron: a, guest: d } = Y(), l = o.names(new T()).ref(), h = t.currentMap(new T()).ref(), p = c.id(new T()).ref(), m = () => {
      e.give("");
    }, f = () => {
      i.give(h.value.settings), m();
    };
    return r.happenedConditional(
      "KeyS",
      e.openedByName("settings"),
      a.create(d.create(f))
    ), (C, A) => (g(), z(be, { name: "settings" }, {
      header: w(() => [
        y("h2", Kl, x(C.$t("general.mapSettings")), 1)
      ]),
      default: w(() => {
        var k;
        return [
          (k = u(h)) != null && k.settings ? (g(), b("div", Gl, [
            y("div", ql, [
              y("div", Jl, [
                y("div", Yl, [
                  u(l).length > 1 ? (g(), z(D, {
                    key: 0,
                    type: "primary",
                    class: "text-white",
                    onClick: A[0] || (A[0] = (j) => u(e).give("parentTypes"))
                  }, {
                    default: w(() => [
                      O(x(C.$t("general.parentTypes")), 1)
                    ]),
                    _: 1
                  })) : S("", !0),
                  v(D, {
                    type: "primary",
                    class: "text-white",
                    onClick: A[1] || (A[1] = (j) => u(e).give("export"))
                  }, {
                    default: w(() => [
                      O(x(C.$t("general.exportOrImport")), 1)
                    ]),
                    _: 1
                  }),
                  v(D, {
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
              y("div", Zl, [
                y("label", null, [
                  y("b", null, x(C.$t("general.mapName")), 1),
                  v(ae, {
                    modelValue: u(h).settings.title,
                    "onUpdate:modelValue": A[3] || (A[3] = (j) => u(h).settings.title = j)
                  }, null, 8, ["modelValue"])
                ])
              ]),
              y("div", Xl, [
                y("a", eu, x(C.$t("general.githubRepo")), 1)
              ])
            ]),
            y("div", tu, [
              v(D, {
                class: "TheSettings-Button",
                type: "success",
                onClick: A[4] || (A[4] = (j) => f())
              }, {
                default: w(() => [
                  O(x(C.$t("general.save")), 1)
                ]),
                _: 1
              }),
              v(D, {
                class: "TheSettings-Button",
                onClick: m
              }, {
                default: w(() => [
                  O(x(C.$t("general.cancel")), 1)
                ]),
                _: 1
              }),
              v(D, {
                class: "TheSettings-Button",
                type: "danger",
                onClick: A[5] || (A[5] = (j) => {
                  u(s).give(u(p)), m();
                })
              }, {
                default: w(() => [
                  O(x(C.$t("general.removeMap")), 1)
                ]),
                _: 1
              })
            ])
          ])) : S("", !0)
        ];
      }),
      _: 1
    }));
  }
}), iu = {}, nu = { class: "BaseGroup" };
function ru(n, e) {
  return g(), b("div", nu, [
    se(n.$slots, "default")
  ]);
}
const ou = /* @__PURE__ */ Ze(iu, [["render", ru]]), au = "default", cu = /* @__PURE__ */ P({
  __name: "TheLinker",
  setup(n) {
    const { mapObjectsLink: e } = Q(), t = e.objectIds(new T([])).ref();
    return (s, i) => (g(), z(D, {
      type: au,
      onClick: i[0] || (i[0] = (r) => u(e).startLink())
    }, {
      default: w(() => [
        O(x(u(t).length === 1 ? "Выбиретие объект" : u(t).length === 2 ? "Второй объект" : "Связать объекты"), 1)
      ]),
      _: 1
    }));
  }
}), lu = { class: "flex e2e-sidebar flex-col items-center gap-3 max-h-[100%] overflow-hidden" }, uu = { class: "TheSideBar-ItemName" }, hu = ["innerHTML", "draggable", "title", "onDragend", "onDblclick"], du = {
  key: 0,
  class: "flex gap-1"
}, pu = {
  key: 0,
  class: "mt-auto w-full p-3 pt-0"
}, fu = /* @__PURE__ */ P({
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
    } = Q(), d = t.types(new T()).ref(), l = ee();
    as(() => {
      a.give(l.value);
    });
    const { svgMapTypeImage: h } = Y(), p = Ie(() => {
      var f;
      return (f = d.value) == null ? void 0 : f.map((C) => ({
        type: C,
        image: h.create(C).markup()
      })).sort((C, A) => +(C.type.name >= A.type.name));
    }), m = new T();
    return c.value(m), (f, C) => (g(), b("div", lu, [
      y("div", {
        ref_key: "dragWrapperRef",
        ref: l,
        class: "flex flex-col gap-3 flex-grow w-full overflow-y-auto"
      }, [
        (g(!0), b(W, null, q(p.value, (A, k) => (g(), b("div", {
          key: k,
          class: "flex flex-col items-center justify-center gap-2"
        }, [
          y("div", uu, x(A.type.name), 1),
          y("div", {
            innerHTML: A.image,
            class: "TheSideBar-ItemImage",
            draggable: u(m).value.readonly ? "false" : "true",
            style: ce(`width:${A.type.width}px;height:${A.type.height}px`),
            title: f.$t("general.notifications.dragToCanvasToAdd"),
            onDragend: (j) => u(e).byTypeName(A.type.id, j),
            onDblclick: (j) => {
              u(e).byTypeName(A.type.id, j), f.$emit("close");
            }
          }, null, 44, hu),
          u(m).value.readonly ? S("", !0) : (g(), b("div", du, [
            v(D, {
              class: "text-white",
              size: "sm",
              type: "primary",
              onClick: (j) => u(s).give(A.type.id)
            }, {
              default: w(() => [
                O(x(f.$t("general.change")), 1)
              ]),
              _: 2
            }, 1032, ["onClick"]),
            v(D, {
              class: "text-white",
              size: "sm",
              type: "danger",
              onClick: (j) => u(i).give(A.type)
            }, {
              default: w(() => [
                O(x(f.$t("general.delete")), 1)
              ]),
              _: 2
            }, 1032, ["onClick"])
          ]))
        ]))), 128))
      ], 512),
      u(m).value.readonly ? S("", !0) : (g(), b("div", pu, [
        v(ou, { class: "mb-1 grid gap-1 grid-cols-2" }, {
          default: w(() => [
            v(D, {
              title: f.$t("general.addType"),
              type: "success",
              onClick: C[0] || (C[0] = (A) => u(r).byName())
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
              onClick: C[1] || (C[1] = (A) => u(o).give("settings"))
            }, {
              default: w(() => [
                v(G, { icon: "fa-cog" })
              ]),
              _: 1
            }, 8, ["title"])
          ]),
          _: 1
        }),
        v(cu, { class: "w-[100%] block mb-1" })
      ]))
    ]));
  }
});
class gu {
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
class mu {
  constructor(e) {
    this.baseSource = e;
  }
  value(e) {
    return this.baseSource.value(
      new L(e, (t) => {
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
class vu {
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
const Au = { class: "AppPresets" }, bu = /* @__PURE__ */ y("div", { class: "text-md font-bold mb-2" }, "Экспорт\\Импорт текущей карты", -1), yu = { class: "flex flex-col gap-2" }, wu = /* @__PURE__ */ P({
  __name: "AppExport",
  setup(n) {
    const { mapFile: e, mapCurrent: t } = Q(), s = new vu(
      t,
      new we((c) => {
        e.currentMap(new Ue(c));
      })
    ), i = new mu(s), r = new gu(new T(), i);
    i.value(r);
    const o = r.ref();
    return (c, a) => (g(), z(be, { name: "export" }, {
      default: w(() => [
        y("div", Au, [
          bu,
          y("div", yu, [
            v(Ss, {
              modelValue: u(o),
              "onUpdate:modelValue": a[0] || (a[0] = (d) => Be(o) ? o.value = d : null)
            }, null, 8, ["modelValue"])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Cu = { class: "absolute bg-body hover:bg-border cursor-pointer border-solid border-border bottom-[150px] right-3 p-3 w-15 h-15" }, xu = /* @__PURE__ */ P({
  __name: "TheSidebarButton",
  setup(n) {
    return (e, t) => (g(), b("div", Cu, [
      v(G, { icon: "fa-bars-staggered" })
    ]));
  }
}), _u = /* @__PURE__ */ P({
  __name: "TheSharingButton",
  setup(n) {
    const { sharedFile: e } = Si();
    return (t, s) => (g(), b("div", {
      class: "absolute bg-body hover:bg-border cursor-pointer border-solid border-border bottom-[150px] right-[60px] p-3 w-15 h-15",
      onClick: s[0] || (s[0] = (i) => u(e).do())
    }, [
      v(G, { icon: "fa-share-nodes" })
    ]));
  }
});
class $u {
  value(e) {
    if (!navigator.share || !navigator.canShare)
      return U(!1, e), this;
    const s = { files: [new File(["foo"], "foo.txt", { type: "text/plain" })] };
    return U(navigator.canShare(s), e), this;
  }
}
const ku = { class: "bg-body absolute top-0 left-0 w-full h-full" }, Eu = /* @__PURE__ */ P({
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
    const t = n, s = e, { fileContent: i, settings: r, device: o } = Q(), { guest: c, patron: a } = Y();
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
    const d = ee(!0), l = new T();
    o.value(l), o.value(new ut((m) => {
      d.value = m.isDesktop;
    }));
    const h = new $u(), p = new T();
    return h.value(p), (m, f) => (g(), b("div", ku, [
      y("div", {
        class: te(["grid grid-rows-[50px_1fr] h-dvh relative", { "grid-cols-[200px_1fr]": !u(l).value.isMobile, "grid-cols-[1fr]": u(l).value.isMobile }])
      }, [
        v(El, { class: "col-span-2" }),
        d.value ? (g(), z(fu, {
          key: 0,
          class: te({ "bg-[#f3f4f6] w-[200px] absolute top-[50px] left-0 z-10 bottom-0": u(l).value.isMobile }),
          onClose: f[0] || (f[0] = (C) => d.value = !1)
        }, null, 8, ["class"])) : S("", !0),
        v(Ml, { class: "w-auto col-auto h-full" }),
        v(Wl),
        u(p).value ? (g(), z(_u, { key: 1 })) : S("", !0),
        u(l).value.isMobile ? (g(), z(xu, {
          key: 2,
          onClick: f[1] || (f[1] = (C) => d.value = !d.value)
        })) : S("", !0)
      ], 2),
      v(sl),
      v(cl),
      v(su),
      v(dc),
      v(Fc),
      v(wu),
      v(ec),
      v(Ll),
      v(wc),
      v(Ga)
    ]));
  }
}), is = I.debug("FileSystemContent");
class Du {
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
const ze = I.debug("FirstPossibleFileContent");
class Ru {
  constructor(e, t) {
    $(this, "firstPossibleFileContent", null);
    $(this, "contentSource", new ge());
    $(this, "canBeUsedSource", new ge());
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
const ct = I.debug("UrlContent");
class Hu {
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
const ns = new ge();
class Nu {
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
  Nu as BrowserLaunchQueue,
  Du as FileSystemContent,
  Ru as FirstPossibleFileContent,
  Eu as PatronSchemeEditor,
  ki as StorageRecord,
  Hu as UrlContent,
  T as VueRefPatron,
  Q as useApplication,
  Y as useFactories,
  Si as useSharing
};
