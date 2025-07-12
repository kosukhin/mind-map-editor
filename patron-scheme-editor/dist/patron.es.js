var V = Object.defineProperty;
var N = (r, e, t) => e in r ? V(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var b = (r, e, t) => N(r, typeof e != "symbol" ? e + "" : e, t);
import { ref, defineComponent, openBlock, createBlock, Transition, withCtx, unref, createElementBlock, createElementVNode, withModifiers, createCommentVNode, renderSlot, withDirectives, isRef, vModelText, watch, createVNode, normalizeClass, computed, createTextVNode, Fragment, renderList, toDisplayString, normalizeStyle, vModelCheckbox, onBeforeUnmount, vModelSelect, onMounted, createStaticVNode } from "vue";
import { useScriptTag, useMagicKeys, useVModel, useShare } from "@vueuse/core";
import Konva from "konva";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars, faBarsStaggered, faTextWidth, faSearch, faHistory, faPlusSquare, faCog, faFileText, faRotateLeft, faRotateRight, faMap, faClose, faArrowLeft, faArrowRight, faArrowDown, faArrowUp, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
class DocumentTitle {
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
function value(r, e) {
  return typeof r == "function" ? r(e) : r.value(e);
}
class GuestAware {
  constructor(e) {
    this.guestAware = e;
  }
  value(e) {
    return value(this.guestAware, e), e;
  }
}
function give(r, e, t) {
  typeof e == "function" ? e(r, t) : e.give(r, t);
}
class Guest {
  constructor(e) {
    this.receiver = e;
  }
  give(e, t) {
    return this.receiver(e, t), this;
  }
}
class GuestCast {
  constructor(e, t) {
    this.sourceGuest = e, this.targetGuest = t;
  }
  introduction() {
    return typeof this.sourceGuest == "function" || !this.sourceGuest.introduction ? "guest" : this.sourceGuest.introduction();
  }
  give(e, t) {
    var s;
    return give(e, this.targetGuest, {
      ...t,
      data: {
        ...(t == null ? void 0 : t.data) ?? {},
        castedGuest: ((s = t == null ? void 0 : t.data) == null ? void 0 : s.castedGuest) ?? this
      }
    }), this;
  }
  disposed(e) {
    const t = this.sourceGuest;
    return t.disposed ? t.disposed(e) : !1;
  }
}
var __defProp$6 = Object.defineProperty, __defNormalProp$6 = (r, e, t) => e in r ? __defProp$6(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, __publicField$6 = (r, e, t) => __defNormalProp$6(r, typeof e != "symbol" ? e + "" : e, t);
const poolSets = /* @__PURE__ */ new Map(), removePatronFromPools = (r) => {
  poolSets.forEach((e) => {
    e.delete(r);
  });
};
class PatronPool {
  constructor(e) {
    this.initiator = e, __publicField$6(this, "patrons"), __publicField$6(this, "give"), this.patrons = /* @__PURE__ */ new Set(), poolSets.set(this, this.patrons);
    let t = null;
    const s = (o, i) => {
      this.patrons.forEach((n) => {
        this.sendValueToGuest(o, n, i);
      });
    };
    this.give = (o, i) => {
      const n = () => {
        n === t && s(o, i);
      };
      return t = n, queueMicrotask(n), this;
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
    this.guestDisposed(e, t) || give(e, t, {
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
var __defProp$5 = Object.defineProperty, __defNormalProp$5 = (r, e, t) => e in r ? __defProp$5(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, __publicField$5 = (r, e, t) => __defNormalProp$5(r, e + "", t);
class Source {
  constructor(e) {
    this.sourceDocument = e, __publicField$5(this, "thePool", new PatronPool(this));
  }
  pool() {
    return this.thePool;
  }
  give(e) {
    return this.sourceDocument = e, this.thePool.give(this.sourceDocument), this;
  }
  value(e) {
    return typeof e == "function" ? this.thePool.distribute(this.sourceDocument, new Guest(e)) : this.thePool.distribute(this.sourceDocument, e), this;
  }
}
class GuestObject {
  constructor(e) {
    this.baseGuest = e;
  }
  give(e, t) {
    let s = this.baseGuest;
    return typeof s == "function" && (s = new Guest(s)), s.give(e, t), this;
  }
  introduction() {
    return typeof this.baseGuest == "function" || !this.baseGuest.introduction ? "guest" : this.baseGuest.introduction();
  }
  disposed(e) {
    const t = this.baseGuest;
    return t.disposed ? t.disposed(e) : !1;
  }
}
var __defProp$4 = Object.defineProperty, __defNormalProp$4 = (r, e, t) => e in r ? __defProp$4(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, __publicField$4 = (r, e, t) => __defNormalProp$4(r, typeof e != "symbol" ? e + "" : e, t);
class GuestPool {
  constructor(e) {
    __publicField$4(this, "guests", /* @__PURE__ */ new Set()), __publicField$4(this, "patronPool"), this.patronPool = new PatronPool(e);
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
      give(e, s, t);
    }), this.guests.clear();
  }
}
var __defProp$3 = Object.defineProperty, __defNormalProp$3 = (r, e, t) => e in r ? __defProp$3(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, __publicField$3 = (r, e, t) => __defNormalProp$3(r, typeof e != "symbol" ? e + "" : e, t);
class GuestAwareAll {
  constructor() {
    __publicField$3(this, "theAll"), __publicField$3(this, "keysKnown", /* @__PURE__ */ new Set()), __publicField$3(this, "keysFilled", /* @__PURE__ */ new Set()), __publicField$3(this, "filledAllPool", new GuestPool(this)), this.theAll = new Source({});
  }
  valueArray(e) {
    const t = new GuestObject(e);
    return this.filledAllPool.add(
      new GuestCast(t, (s) => {
        t.give(Object.values(s));
      })
    ), this.isAllFilled() && this.theAll.value(
      new Guest((s) => {
        this.filledAllPool.give(Object.values(s));
      })
    ), this;
  }
  value(e) {
    const t = new GuestObject(e);
    return this.isAllFilled() ? (this.filledAllPool.add(t), this.theAll.value(
      new Guest((s) => {
        this.filledAllPool.give(s);
      })
    )) : this.filledAllPool.add(t), this;
  }
  guestKey(e) {
    return this.keysKnown.add(e), new Guest((t) => {
      queueMicrotask(() => {
        this.theAll.value(
          new Guest((s) => {
            this.keysFilled.add(e);
            const o = {
              ...s,
              [e]: t
            };
            this.theAll.give(o), this.isAllFilled() && this.filledAllPool.give(o);
          })
        );
      });
    });
  }
  isAllFilled() {
    return this.keysFilled.size > 0 && this.keysFilled.size === this.keysKnown.size;
  }
}
var __defProp$2 = Object.defineProperty, __defNormalProp$2 = (r, e, t) => e in r ? __defProp$2(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, __publicField$2 = (r, e, t) => __defNormalProp$2(r, e + "", t);
class SourceEmpty {
  constructor() {
    __publicField$2(this, "baseSource", new Source(null));
  }
  value(e) {
    return this.baseSource.value(
      new GuestCast(e, (t, s) => {
        t !== null && give(t, e, s);
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
class GuestSync {
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
class Patron {
  constructor(e) {
    this.willBePatron = e;
  }
  introduction() {
    return "patron";
  }
  give(e, t) {
    return give(e, this.willBePatron, t), this;
  }
  disposed(e) {
    var s;
    const t = this.willBePatron;
    return ((s = t == null ? void 0 : t.disposed) == null ? void 0 : s.call(t, e)) || !1;
  }
}
var __defProp = Object.defineProperty, __defNormalProp = (r, e, t) => e in r ? __defProp(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, __publicField = (r, e, t) => __defNormalProp(r, e + "", t);
class PatronOnce {
  constructor(e) {
    this.baseGuest = e, __publicField(this, "received", !1);
  }
  introduction() {
    return "patron";
  }
  give(e, t) {
    return this.received || (this.received = !0, give(e, this.baseGuest, t)), this;
  }
  disposed(e) {
    if (this.received)
      return !0;
    const t = this.baseGuest;
    return t.disposed ? t.disposed(e) : !1;
  }
}
class Factory {
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
class RuntimeError extends Error {
  constructor(e, t) {
    super(e, t);
  }
}
class SystemFileFromHandler {
  constructor(e) {
    this.fileHandler = e;
  }
  content(e) {
    return this.fileHandler.getFile().then(async (t) => await new Response(t).text()).then((t) => {
      e.give(t);
    }).catch((t) => {
      throw new RuntimeError("Problem when reading file in SystemFileFromHandler", {
        cause: t
      });
    }), this;
  }
}
class BrowserFileSaved {
  constructor(e) {
    this.fileHandler = e;
  }
  save(e) {
    return this.fileHandler.createWritable().then((t) => (t.write(e).catch((s) => {
      throw new RuntimeError("Cant save file in browser", { cause: s });
    }), t)).then((t) => {
      t.close().catch((s) => {
        throw new RuntimeError("Cant close written file in browser", { cause: s });
      });
    }), this;
  }
}
class TransformedFromJSON {
  constructor(e) {
    this.content = e;
  }
  result() {
    return JSON.parse(this.content);
  }
}
class TransformedToJSON {
  constructor(e) {
    this.content = e;
  }
  result() {
    return JSON.stringify(this.content);
  }
}
class SvgImage {
  constructor(e, t = 100, s = 100) {
    this.svgContent = e, this.width = t, this.height = s;
  }
  markup() {
    return this.svgContent.replaceAll("${width}", String(this.width)).replaceAll("${height}", String(this.height));
  }
}
class SvgMapTypeImage {
  constructor(e, t) {
    this.type = e, this.factories = t;
  }
  markup() {
    return this.factories.svgImage.create(this.type.svg, this.type.width, this.type.height).markup();
  }
}
class NumberChunks {
  constructor(e, t, s) {
    this.chunksCount = e, this.baseNumber = t, this.factories = s;
  }
  chunks(e) {
    return this.baseNumber.value(
      this.factories.guestInTheMiddle.create(e, (t) => {
        const s = Math.round(t / this.chunksCount), o = [];
        for (let i = 1; i <= this.chunksCount; i += 1)
          o.push(i * s);
        e.give(o);
      })
    ), e;
  }
}
class MapNameFromUrl {
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
class TextNoHtml {
  constructor(e, t) {
    this.text = e, this.factories = t;
  }
  noHtml(e) {
    return this.text.value(
      this.factories.guestInTheMiddle.create(e, (t) => {
        const s = document.createElement("DIV");
        s.innerHTML = t;
        const o = s.textContent || s.innerText || "";
        e.give(o);
      })
    ), e;
  }
}
class JSONP {
  constructor(e, t, s, o) {
    b(this, "loadingCache");
    this.callbackName = e, this.url = t, this.emptyValue = s, this.factories = o, this.loadingCache = o.sourceEmpty.create();
  }
  content(e) {
    this.loadingCache.give(!0);
    const t = setTimeout(() => {
      this.loadingCache.give(!1), e.give(this.emptyValue);
    }, 1e4);
    return useScriptTag(this.url, () => {
      var o;
      clearInterval(t);
      const s = ((o = window[this.callbackName]) == null ? void 0 : o.call(window)) || this.emptyValue;
      e.give(s), this.loadingCache.give(!1);
    }), e;
  }
  loading(e) {
    return this.loadingCache.value(e), e;
  }
}
class TextOf {
  constructor(e) {
    this.text = e;
  }
  asString(e) {
    return e.give(this.text), e;
  }
}
class TextWithoutHTML {
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
var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function getDefaultExportFromCjs(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var browser = { exports: {} }, ms, hasRequiredMs;
function requireMs() {
  if (hasRequiredMs) return ms;
  hasRequiredMs = 1;
  var r = 1e3, e = r * 60, t = e * 60, s = t * 24, o = s * 7, i = s * 365.25;
  ms = function(u, l) {
    l = l || {};
    var d = typeof u;
    if (d === "string" && u.length > 0)
      return n(u);
    if (d === "number" && isFinite(u))
      return l.long ? a(u) : c(u);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(u)
    );
  };
  function n(u) {
    if (u = String(u), !(u.length > 100)) {
      var l = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        u
      );
      if (l) {
        var d = parseFloat(l[1]), m = (l[2] || "ms").toLowerCase();
        switch (m) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return d * i;
          case "weeks":
          case "week":
          case "w":
            return d * o;
          case "days":
          case "day":
          case "d":
            return d * s;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return d * t;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return d * e;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return d * r;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return d;
          default:
            return;
        }
      }
    }
  }
  function c(u) {
    var l = Math.abs(u);
    return l >= s ? Math.round(u / s) + "d" : l >= t ? Math.round(u / t) + "h" : l >= e ? Math.round(u / e) + "m" : l >= r ? Math.round(u / r) + "s" : u + "ms";
  }
  function a(u) {
    var l = Math.abs(u);
    return l >= s ? h(u, l, s, "day") : l >= t ? h(u, l, t, "hour") : l >= e ? h(u, l, e, "minute") : l >= r ? h(u, l, r, "second") : u + " ms";
  }
  function h(u, l, d, m) {
    var p = l >= d * 1.5;
    return Math.round(u / d) + " " + m + (p ? "s" : "");
  }
  return ms;
}
function setup(r) {
  t.debug = t, t.default = t, t.coerce = a, t.disable = i, t.enable = o, t.enabled = n, t.humanize = requireMs(), t.destroy = h, Object.keys(r).forEach((u) => {
    t[u] = r[u];
  }), t.names = [], t.skips = [], t.formatters = {};
  function e(u) {
    let l = 0;
    for (let d = 0; d < u.length; d++)
      l = (l << 5) - l + u.charCodeAt(d), l |= 0;
    return t.colors[Math.abs(l) % t.colors.length];
  }
  t.selectColor = e;
  function t(u) {
    let l, d = null, m, p;
    function g(...f) {
      if (!g.enabled)
        return;
      const v = g, y = Number(/* @__PURE__ */ new Date()), x = y - (l || y);
      v.diff = x, v.prev = l, v.curr = y, l = y, f[0] = t.coerce(f[0]), typeof f[0] != "string" && f.unshift("%O");
      let $ = 0;
      f[0] = f[0].replace(/%([a-zA-Z%])/g, (C, k) => {
        if (C === "%%")
          return "%";
        $++;
        const _ = t.formatters[k];
        if (typeof _ == "function") {
          const w = f[$];
          C = _.call(v, w), f.splice($, 1), $--;
        }
        return C;
      }), t.formatArgs.call(v, f), (v.log || t.log).apply(v, f);
    }
    return g.namespace = u, g.useColors = t.useColors(), g.color = t.selectColor(u), g.extend = s, g.destroy = t.destroy, Object.defineProperty(g, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => d !== null ? d : (m !== t.namespaces && (m = t.namespaces, p = t.enabled(u)), p),
      set: (f) => {
        d = f;
      }
    }), typeof t.init == "function" && t.init(g), g;
  }
  function s(u, l) {
    const d = t(this.namespace + (typeof l > "u" ? ":" : l) + u);
    return d.log = this.log, d;
  }
  function o(u) {
    t.save(u), t.namespaces = u, t.names = [], t.skips = [];
    let l;
    const d = (typeof u == "string" ? u : "").split(/[\s,]+/), m = d.length;
    for (l = 0; l < m; l++)
      d[l] && (u = d[l].replace(/\*/g, ".*?"), u[0] === "-" ? t.skips.push(new RegExp("^" + u.slice(1) + "$")) : t.names.push(new RegExp("^" + u + "$")));
  }
  function i() {
    const u = [
      ...t.names.map(c),
      ...t.skips.map(c).map((l) => "-" + l)
    ].join(",");
    return t.enable(""), u;
  }
  function n(u) {
    if (u[u.length - 1] === "*")
      return !0;
    let l, d;
    for (l = 0, d = t.skips.length; l < d; l++)
      if (t.skips[l].test(u))
        return !1;
    for (l = 0, d = t.names.length; l < d; l++)
      if (t.names[l].test(u))
        return !0;
    return !1;
  }
  function c(u) {
    return u.toString().substring(2, u.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function a(u) {
    return u instanceof Error ? u.stack || u.message : u;
  }
  function h() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return t.enable(t.load()), t;
}
var common = setup;
(function(r, e) {
  e.formatArgs = s, e.save = o, e.load = i, e.useColors = t, e.storage = n(), e.destroy = /* @__PURE__ */ (() => {
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
    if (a[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + a[0] + (this.useColors ? "%c " : " ") + "+" + r.exports.humanize(this.diff), !this.useColors)
      return;
    const h = "color: " + this.color;
    a.splice(1, 0, h, "color: inherit");
    let u = 0, l = 0;
    a[0].replace(/%[a-zA-Z%]/g, (d) => {
      d !== "%%" && (u++, d === "%c" && (l = u));
    }), a.splice(l, 0, h);
  }
  e.log = console.debug || console.log || (() => {
  });
  function o(a) {
    try {
      a ? e.storage.setItem("debug", a) : e.storage.removeItem("debug");
    } catch {
    }
  }
  function i() {
    let a;
    try {
      a = e.storage.getItem("debug");
    } catch {
    }
    return !a && typeof process < "u" && "env" in process && (a = process.env.DEBUG), a;
  }
  function n() {
    try {
      return localStorage;
    } catch {
    }
  }
  r.exports = common(e);
  const { formatters: c } = r.exports;
  c.j = function(a) {
    try {
      return JSON.stringify(a);
    } catch (h) {
      return "[UnexpectedJSONParseError]: " + h.message;
    }
  };
})(browser, browser.exports);
var browserExports = browser.exports;
const debug = /* @__PURE__ */ getDefaultExportFromCjs(browserExports), localDebug$B = browserExports.debug("TextNlAsBr");
class TextNlAsBr {
  constructor(e, t) {
    this.baseText = e, this.factories = t;
  }
  asString(e) {
    return this.baseText.asString(
      this.factories.guestInTheMiddle.create(e, (t) => {
        if (typeof t > "u" || t === null)
          return "";
        const s = "<br />";
        return localDebug$B(t), e.give((t ?? "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, `$1${s}$2`)), !0;
      })
    ), e;
  }
}
const cache = new Factory(Source), source = new Factory(Source), sourceEmpty = new Factory(SourceEmpty), guest = new Factory(Guest), guestCast = new Factory(GuestCast), guestAware = new Factory(GuestAware), pool = new Factory(PatronPool), patron = new Factory(Patron), patronOnce = new Factory(PatronOnce), guestInTheMiddle = new Factory(GuestCast), chain = new Factory(GuestAwareAll), guestSync = new Factory(GuestSync), systemFactories = {
  cache,
  chain,
  guest,
  guestCast,
  guestAware,
  guestInTheMiddle,
  guestSync,
  patron,
  patronOnce,
  pool,
  source,
  sourceEmpty
}, fileHandlerContent = new Factory(SystemFileFromHandler), browserFileSaved = new Factory(BrowserFileSaved), transformToString = new Factory(TransformedToJSON), transformToObject = new Factory(TransformedFromJSON), svgImage = new Factory(SvgImage), svgMapTypeImage = new Factory(SvgMapTypeImage, { ...systemFactories, svgImage }), numberChunks = new Factory(NumberChunks, systemFactories), mapNameFromUrl = new Factory(MapNameFromUrl, systemFactories), textNoHtml = new Factory(TextNoHtml, systemFactories), jsonp = new Factory(JSONP, systemFactories), textOf = new Factory(TextOf), textWithoutHTML = new Factory(TextWithoutHTML, systemFactories), textNlAsBr = new Factory(TextNlAsBr, systemFactories), factories$1 = {
  ...systemFactories,
  fileHandlerContent,
  browserFileSaved,
  transformToString,
  transformToObject,
  svgImage,
  svgMapTypeImage,
  numberChunks,
  mapNameFromUrl,
  textNoHtml,
  jsonp,
  textOf,
  textNlAsBr,
  textWithoutHTML
}, useFactories = () => factories$1;
class CheckNotification {
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
const localDebug$A = browserExports.debug("MapCurrent");
class MapCurrent {
  constructor(e, t, s) {
    b(this, "objectsCache");
    b(this, "settingsCache");
    b(this, "typesCache");
    this.mapFile = e, this.mapId = t, this.factories = s, this.objectsCache = s.sourceEmpty.create(), this.settingsCache = s.sourceEmpty.create(), this.typesCache = s.sourceEmpty.create(), e.currentMap(
      s.patron.create(
        s.guest.create((o) => {
          localDebug$A("current map changed", o), this.settingsCache.give(o.settings), this.objectsCache.give(Object.values(o.objects)), this.typesCache.give(
            Object.entries(o.types).map(([i, n]) => ({
              ...n,
              id: i
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
    return localDebug$A("notify about new objects"), this.objectsCache.value(e), e;
  }
  types(e) {
    return this.typesCache.value(e), e;
  }
  give(e) {
    return localDebug$A("save map document", e), this.mapId.id(
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
class MapCurrentID {
  constructor(e) {
    b(this, "idCache");
    this.idCache = e.cache.create("current");
  }
  id(e) {
    return this.idCache.value(e), e;
  }
  give(e) {
    return this.idCache.give(e), this;
  }
}
class MapCurrentTitle {
  constructor(e) {
    this.mapFile = e;
  }
  value(e) {
    return this.mapFile.currentMap(
      new GuestCast(e, (t) => {
        give(t.settings.title, e);
      })
    ), this;
  }
}
const localDebug$z = browserExports.debug("MapHistory"), normalizeMapDocumentAndSerialize = (r) => {
  const e = JSON.parse(JSON.stringify(r));
  return Object.values(e.objects).forEach((t) => {
    t.width = 0, t.height = 0;
  }), JSON.stringify(e);
};
class MapHistory {
  constructor(e, t, s, o) {
    b(this, "mapsHistory");
    b(this, "historyIndex");
    this.mapFile = e, this.map = t, this.mapId = s, this.factories = o, this.mapsHistory = o.cache.create([]), this.historyIndex = o.cache.create(0), this.mapFile.currentMap(o.patron.create(this)), this.mapId.id(
      o.patron.create(
        o.guest.create(() => {
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
              localDebug$z("add map to history", s, e);
              const o = s.some(
                (i) => normalizeMapDocumentAndSerialize(i) === normalizeMapDocumentAndSerialize(e)
              );
              if (localDebug$z("isMapFromHistory", o), !o) {
                const i = s[t] ? [s[t]] : [];
                this.historyIndex.give(0), this.mapsHistory.give([e, ...i, ...s.slice(0, 9)]);
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
      this.factories.guestCast.create(e, t.guestKey("historyIndex"))
    ), this.mapsHistory.value(this.factories.guestCast.create(e, t.guestKey("mapsHistory"))), t.value(
      this.factories.guestInTheMiddle.create(
        e,
        ({ historyIndex: s, mapsHistory: o }) => {
          const i = s < o.length - 1;
          localDebug$z("recalculate is prev possible", i), e.give(i);
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
            const o = s[t];
            this.map.give(o);
          })
        );
      })
    );
  }
  isNextPossible(e) {
    const t = this.factories.chain.create(this);
    return this.historyIndex.value(
      this.factories.guestCast.create(e, t.guestKey("historyIndex"))
    ), this.mapsHistory.value(this.factories.guestCast.create(e, t.guestKey("mapsHistory"))), t.value(
      this.factories.guestInTheMiddle.create(
        e,
        ({ historyIndex: s, mapsHistory: o }) => {
          const i = s > 0 && s <= o.length - 1;
          localDebug$z("recalculate is next possible", i), e.give(i);
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
            const o = s[t];
            this.map.give(o);
          })
        );
      })
    );
  }
}
class MapRemoved {
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
const localDebug$y = browserExports.debug("MapFile");
class MapFile {
  constructor(e, t, s) {
    b(this, "currentMapPatrons");
    b(this, "mapFileCache");
    this.mapFileContent = e, this.mapId = t, this.factories = s, this.currentMapPatrons = s.pool.create(this), this.mapFileCache = s.cache.create(!1), e.value(
      s.patron.create((o) => {
        if (!o)
          return;
        const i = this.factories.transformToObject.create(o).result();
        localDebug$y("get map file", i), this.mapFileCache.give(i);
      })
    );
  }
  currentMap(e) {
    const t = this.factories.chain.create();
    return this.mapId.id(this.factories.guestCast.create(e, t.guestKey("mapId"))), this.mapFile(this.factories.guestCast.create(e, t.guestKey("mapFile"))), t.value(
      this.factories.guestInTheMiddle.create(
        e,
        ({ mapId: s, mapFile: o }) => {
          if (localDebug$y("get current map", s, o, typeof o), !o[s])
            this.createEmptyMapByName(s, e);
          else {
            const i = o[s];
            this.currentMapPatrons.distribute(
              i != null && i.structure ? i.structure : i,
              e
            );
          }
        }
      )
    ), e;
  }
  give(e) {
    return localDebug$y("save map file document", e), this.mapFileContent.give(this.factories.transformToString.create(e).result()), this;
  }
  mapFile(e) {
    return this.mapFileCache.value(e), e;
  }
  createEmptyMapByName(e, t) {
    localDebug$y("creating empty map by name", e);
    const s = this.factories.transformToObject.create(this.generateEmptyMapFile()).result();
    this.mapFile(
      this.factories.guest.create((o) => {
        this.give({
          ...o,
          [e]: s.current
        }), t.give(s.current);
      })
    );
  }
  generateEmptyMapFile() {
    return '{"current":{"progress":0,"settings":{"colored":false,"title":"current"},"objects":{},"types":{},"url":"/current","parent":""}}';
  }
}
const localDebug$x = browserExports.debug("MapFileForRendering");
class MapFileForRendering {
  constructor(e, t, s) {
    b(this, "mapCache");
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
        localDebug$x("received map file, objects = ", e[t].objects), this.mapCache.give(e[t]);
      })
    ), this;
  }
}
class MapObject {
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
const localDebug$w = debug("app:MapObjectCurrent");
class MapObjectCurrent {
  constructor(e, t) {
    b(this, "idCache");
    b(this, "silenceActivator");
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
    return localDebug$w("new value current object", e), this.silenceActivator.value(
      this.factories.guest.create((t) => {
        localDebug$w("silence activator", t), t ? t.give(e) : this.idCache.give(e);
      })
    ), this;
  }
}
class MapObjectHasArrowCheck {
  constructor(e, t) {
    this.mapFile = e, this.factories = t;
  }
  check(e, t) {
    return this.mapFile.currentMap(
      this.factories.guest.create((s) => {
        let o = !1;
        Object.values(s.objects).forEach((i) => {
          o = o || i.arrows.some((n) => n.id === e.id);
        }), t.give(!o || "У объекта есть входящие связи!");
      })
    ), this;
  }
}
const localDebug$v = browserExports.debug("MapObjectNew");
class MapObjectNew {
  constructor(e, t, s, o, i) {
    this.map = e, this.mapObject = t, this.canvas = s, this.stagePosition = o, this.factories = i;
  }
  byTypeName(e, t) {
    return localDebug$v("start to add new type", e, t), this.stagePosition.position(
      this.factories.guest.create((s) => {
        this.map.types(
          this.factories.guest.create((o) => {
            this.canvas.canvas(
              this.factories.guest.create((i) => {
                const n = i.getBoundingClientRect(), c = o.find((u) => u.id === e);
                localDebug$v("is type found", c);
                const a = t.x - n.left, h = t.y - n.top;
                c && (localDebug$v("add new type"), this.mapObject.give({
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
class MapObjectParentNames {
  constructor(e, t) {
    this.mapId = e, this.factories = t;
  }
  names(e) {
    return this.mapId.id(
      this.factories.guestInTheMiddle.create(e, (t) => {
        const s = t.split("_").filter((n) => !!n);
        let o = "";
        const i = s.map((n) => {
          const c = `${o}${n}`;
          return o || (o = "_"), o += `${n}_`, c;
        });
        o = "", e.give(i);
      })
    ), e;
  }
}
class MapObjectRelationRemoved {
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
class MapObjectRemoved {
  constructor(e, t, s, o) {
    this.map = e, this.mapFile = t, this.checks = s, this.factories = o;
  }
  give(e) {
    const t = this.factories.chain.create(this);
    return this.checks.forEach((s, o) => {
      s.breakOnFail(e, t.guestKey(String(o)));
    }), t.value(
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
const localDebug$u = browserExports.debug("MapObjectsLink");
class MapObjectsLink {
  constructor(e, t, s, o, i) {
    b(this, "objectIdsCache");
    this.mapObjectCurrent = e, this.map = t, this.mapObject = s, this.newArrow = o, this.factories = i, this.objectIdsCache = i.cache.create([]);
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
            t.push(s), this.objectIdsCache.give([...t]), localDebug$u("object ids", t), t.length === 2 && this.map.objects(
              this.factories.guest.create((o) => {
                const [, i] = t, n = o.find((c) => c.id === i);
                n && this.newArrow.forObject(n);
              })
            ), t.length === 3 && (this.newArrow.dispose(), this.mapObjectCurrent.silenceOff(), this.map.objects(
              this.factories.guest.create((o) => {
                const [, i, n] = t, c = o.find((a) => a.id === i);
                c && n && (this.objectIdsCache.give([]), this.mapObject.give({
                  ...c,
                  arrows: [
                    ...c.arrows,
                    {
                      id: n,
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
function isObject$3(r) {
  var e = typeof r;
  return r != null && (e == "object" || e == "function");
}
var isObject_1 = isObject$3, freeGlobal$1 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal, _freeGlobal = freeGlobal$1, freeGlobal = _freeGlobal, freeSelf = typeof self == "object" && self && self.Object === Object && self, root$2 = freeGlobal || freeSelf || Function("return this")(), _root = root$2, root$1 = _root, now$1 = function() {
  return root$1.Date.now();
}, now_1 = now$1, reWhitespace = /\s/;
function trimmedEndIndex$1(r) {
  for (var e = r.length; e-- && reWhitespace.test(r.charAt(e)); )
    ;
  return e;
}
var _trimmedEndIndex = trimmedEndIndex$1, trimmedEndIndex = _trimmedEndIndex, reTrimStart = /^\s+/;
function baseTrim$1(r) {
  return r && r.slice(0, trimmedEndIndex(r) + 1).replace(reTrimStart, "");
}
var _baseTrim = baseTrim$1, root = _root, Symbol$3 = root.Symbol, _Symbol = Symbol$3, Symbol$2 = _Symbol, objectProto$1 = Object.prototype, hasOwnProperty = objectProto$1.hasOwnProperty, nativeObjectToString$1 = objectProto$1.toString, symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag$1(r) {
  var e = hasOwnProperty.call(r, symToStringTag$1), t = r[symToStringTag$1];
  try {
    r[symToStringTag$1] = void 0;
    var s = !0;
  } catch {
  }
  var o = nativeObjectToString$1.call(r);
  return s && (e ? r[symToStringTag$1] = t : delete r[symToStringTag$1]), o;
}
var _getRawTag = getRawTag$1, objectProto = Object.prototype, nativeObjectToString = objectProto.toString;
function objectToString$1(r) {
  return nativeObjectToString.call(r);
}
var _objectToString = objectToString$1, Symbol$1 = _Symbol, getRawTag = _getRawTag, objectToString = _objectToString, nullTag = "[object Null]", undefinedTag = "[object Undefined]", symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
function baseGetTag$1(r) {
  return r == null ? r === void 0 ? undefinedTag : nullTag : symToStringTag && symToStringTag in Object(r) ? getRawTag(r) : objectToString(r);
}
var _baseGetTag = baseGetTag$1;
function isObjectLike$1(r) {
  return r != null && typeof r == "object";
}
var isObjectLike_1 = isObjectLike$1, baseGetTag = _baseGetTag, isObjectLike = isObjectLike_1, symbolTag = "[object Symbol]";
function isSymbol$1(r) {
  return typeof r == "symbol" || isObjectLike(r) && baseGetTag(r) == symbolTag;
}
var isSymbol_1 = isSymbol$1, baseTrim = _baseTrim, isObject$2 = isObject_1, isSymbol = isSymbol_1, NAN = NaN, reIsBadHex = /^[-+]0x[0-9a-f]+$/i, reIsBinary = /^0b[01]+$/i, reIsOctal = /^0o[0-7]+$/i, freeParseInt = parseInt;
function toNumber$1(r) {
  if (typeof r == "number")
    return r;
  if (isSymbol(r))
    return NAN;
  if (isObject$2(r)) {
    var e = typeof r.valueOf == "function" ? r.valueOf() : r;
    r = isObject$2(e) ? e + "" : e;
  }
  if (typeof r != "string")
    return r === 0 ? r : +r;
  r = baseTrim(r);
  var t = reIsBinary.test(r);
  return t || reIsOctal.test(r) ? freeParseInt(r.slice(2), t ? 2 : 8) : reIsBadHex.test(r) ? NAN : +r;
}
var toNumber_1 = toNumber$1, isObject$1 = isObject_1, now = now_1, toNumber = toNumber_1, FUNC_ERROR_TEXT$1 = "Expected a function", nativeMax = Math.max, nativeMin = Math.min;
function debounce$1(r, e, t) {
  var s, o, i, n, c, a, h = 0, u = !1, l = !1, d = !0;
  if (typeof r != "function")
    throw new TypeError(FUNC_ERROR_TEXT$1);
  e = toNumber(e) || 0, isObject$1(t) && (u = !!t.leading, l = "maxWait" in t, i = l ? nativeMax(toNumber(t.maxWait) || 0, e) : i, d = "trailing" in t ? !!t.trailing : d);
  function m(C) {
    var k = s, _ = o;
    return s = o = void 0, h = C, n = r.apply(_, k), n;
  }
  function p(C) {
    return h = C, c = setTimeout(v, e), u ? m(C) : n;
  }
  function g(C) {
    var k = C - a, _ = C - h, w = e - k;
    return l ? nativeMin(w, i - _) : w;
  }
  function f(C) {
    var k = C - a, _ = C - h;
    return a === void 0 || k >= e || k < 0 || l && _ >= i;
  }
  function v() {
    var C = now();
    if (f(C))
      return y(C);
    c = setTimeout(v, g(C));
  }
  function y(C) {
    return c = void 0, d && s ? m(C) : (s = o = void 0, n);
  }
  function x() {
    c !== void 0 && clearTimeout(c), h = 0, s = a = o = c = void 0;
  }
  function $() {
    return c === void 0 ? n : y(now());
  }
  function F() {
    var C = now(), k = f(C);
    if (s = arguments, o = this, a = C, k) {
      if (c === void 0)
        return p(a);
      if (l)
        return clearTimeout(c), c = setTimeout(v, e), m(a);
    }
    return c === void 0 && (c = setTimeout(v, e)), n;
  }
  return F.cancel = x, F.flush = $, F;
}
var debounce_1 = debounce$1;
const debounce$2 = /* @__PURE__ */ getDefaultExportFromCjs(debounce_1), urlTrim = (r) => {
  if (r[r.length - 1] === "/") {
    const e = r.split("");
    return e.splice(e.length - 1, 1), e.join("");
  }
  return r;
}, openExternalLink = debounce$2((r) => {
  window == null || window.open(r);
}, 200), localDebug$t = browserExports.debug("MapObjectUrl");
class MapObjectUrl {
  constructor(e, t) {
    this.mapId = e, this.factories = t;
  }
  open(e, t) {
    if (e != null && e.linked) {
      const s = e.outlink;
      e.targetBlank ? openExternalLink(s) : (localDebug$t("open new map", s), this.factories.mapNameFromUrl.create(
        this.factories.source.create(s)
      ).name(
        this.factories.guest.create((i) => {
          localDebug$t("open map name", s, i), t.give(i);
        })
      ));
    }
    return this;
  }
  url(e, t) {
    return e.value(
      this.factories.guestInTheMiddle.create(t, (s) => {
        this.mapId.id(
          this.factories.guest.create((o) => {
            const i = o[0] === "_" ? o.replaceAll("_", "/") : "/current", n = s.name ? s.name : s.additionalName ? s.additionalName : "";
            this.factories.textNoHtml.create(this.factories.source.create(n)).noHtml(
              this.factories.guest.create((c) => {
                let a = s.outlink ? s.outlink : `${i}/${slugify(c)}`;
                localDebug$t("link is", a), a = urlTrim(a), t.give(a);
              })
            );
          })
        );
      })
    ), t;
  }
}
function slugify(r) {
  return r.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}
const localDebug$s = browserExports.debug("ObjectPositionBounds");
class ObjectPositionBounds {
  constructor(e, t) {
    this.stageSize = e, this.factories = t;
  }
  position(e, t, s) {
    return this.stageSize.value(
      this.factories.guestInTheMiddle.create(s, (o) => {
        let { x: i, y: n } = t;
        i < 30 && (i = 30), n < 30 && (n = 30);
        const c = o.width - e.width;
        i > c && (i = c);
        const a = o.height - e.height;
        n > a && (n = a), localDebug$s("position", i, n), s.give({ x: i, y: n });
      })
    ), s;
  }
}
const gridSize = 15;
class ObjectPositionGridStick {
  constructor(e, t) {
    this.baseRestriction = e, this.factories = t;
  }
  position(e, t, s) {
    return this.baseRestriction.position(
      e,
      t,
      this.factories.guestInTheMiddle.create(s, (o) => {
        s.give({
          x: Math.round(o.x / gridSize) * gridSize,
          y: Math.round(o.y / gridSize) * gridSize
        });
      })
    ), s;
  }
}
const axisToSize = {
  x: "width",
  y: "height"
}, axisToPositionIndex = {
  x: 0,
  y: 1
}, directionMultiplier = {
  positive: 1,
  negative: -1
}, localDebug$r = browserExports.debug("ObjectsOutsideScreen");
class ObjectsOutsideScreen {
  constructor(e, t, s, o) {
    this.map = e, this.stageSize = t, this.layer = s, this.factories = o;
  }
  count(e, t) {
    const s = e.direction === "positive", o = this.factories.chain.create();
    return this.map.objects(this.factories.guestCast.create(t, o.guestKey("objects"))), this.layer.layer(this.factories.guestCast.create(t, o.guestKey("layer"))), this.layer.position(this.factories.guestCast.create(t, o.guestKey("position"))), o.value(
      this.factories.guestInTheMiddle.create(
        t,
        ({ objects: i, layer: n, position: c }) => {
          var l;
          const a = directionMultiplier[e.direction], u = i.sort(
            (d, m) => d.position[axisToPositionIndex[e.axis]] * a - m.position[axisToPositionIndex[e.axis]] * a
          ).filter((d) => {
            const m = d.position[axisToPositionIndex[e.axis]] + (s ? 0 : d[axisToSize[e.axis]]), p = c[e.axis] * -1 + (s ? n[axisToSize[e.axis]]() : 0);
            return localDebug$r(
              "mb nearest points",
              e.direction,
              "objectP=",
              m,
              "screenP=",
              p
            ), s ? m > p : m < p;
          });
          localDebug$r("nearest", u), t.give({
            count: u.length,
            nearestObjectId: ((l = u.at(s ? -1 : 0)) == null ? void 0 : l.id) ?? ""
          });
        }
      )
    ), t;
  }
}
class MapSettings {
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
class MapTypeCurrent {
  constructor(e) {
    b(this, "idCache");
    this.idCache = e.sourceEmpty.create();
  }
  typeId(e) {
    return this.idCache.value(e), e;
  }
  give(e) {
    return this.idCache.give(e), this;
  }
}
class MapTypeNew {
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
class MapTypeRemoved {
  constructor(e, t, s, o) {
    this.map = e, this.mapFile = t, this.checks = s, this.factories = o;
  }
  give(e) {
    const t = this.factories.chain.create(this);
    return this.checks.forEach((s, o) => {
      s.breakOnFail(
        {
          name: e.id,
          type: e
        },
        t.guestKey(String(o))
      );
    }), t.value(
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
class MapTypes {
  constructor(e, t, s, o) {
    this.map = e, this.mapFile = t, this.checks = s, this.factories = o;
  }
  give(e) {
    const t = this.factories.chain.create(this);
    return this.checks.forEach((s, o) => {
      s.breakOnFail(e, t.guestKey(String(o)));
    }), t.value(
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
const localDebug$q = browserExports.debug("MapTypeUsed");
class MapTypeUsed {
  constructor(e, t) {
    this.mapFile = e, this.factories = t;
  }
  check(e, t) {
    return this.mapFile.currentMap(
      this.factories.guest.create((s) => {
        const o = Object.values(s.objects).some(
          (i) => i.type === e.name
        );
        localDebug$q("is type used", o), t.give(!o || "Тип карты использован");
      })
    ), this;
  }
}
class MapTypeUsedNameChangedCheck {
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
const localDebug$p = browserExports.debug("ParentTypes");
class ParentTypes {
  constructor(e, t, s) {
    this.parentNames = e, this.mapFile = t, this.factories = s;
  }
  types(e) {
    localDebug$p("parent types requested");
    const t = this.factories.chain.create();
    return this.parentNames.names(this.factories.guestCast.create(e, t.guestKey("parentNames"))), this.mapFile.mapFile(this.factories.guestCast.create(e, t.guestKey("mapFile"))), t.value(
      this.factories.guestInTheMiddle.create(e, ({ parentNames: s, mapFile: o }) => {
        const i = s.slice(0, -1);
        localDebug$p("parent names", i);
        const n = {};
        i.map((a) => o[a]).forEach((a) => {
          Object.values(a.types).forEach((h) => {
            n[h.name] = h;
          });
        }), e.give(Object.values(n));
      })
    ), e;
  }
}
const localDebug$o = browserExports.debug("ObjectsMatchedToQuery");
class ObjectsMatchedToQuery {
  constructor(e, t) {
    this.map = e, this.factories = t;
  }
  objects(e, t) {
    return e.value(
      this.factories.guestInTheMiddle.create(
        t,
        debounce$2((o) => {
          o = o.toLowerCase(), this.map.objects(
            this.factories.guest.create((i) => {
              if (!o) {
                localDebug$o("reset results"), t.give([]);
                return;
              }
              const n = i.filter(
                (c) => {
                  var a;
                  return c.name.toLowerCase().includes(o) || ((a = c.additionalName) == null ? void 0 : a.toLowerCase().includes(o)) || Object.values(c.additionalFields ?? {}).join(" ").toLowerCase().includes(o);
                }
              );
              localDebug$o("objects in searching", n, o), t.give(n);
            })
          );
        }, 500)
      )
    ), t;
  }
}
const layerGeometry = {
  height: 3e3,
  width: 3e3
};
class StageDefaultSize {
  value(e) {
    return give(layerGeometry, e), e;
  }
}
const localDebug$n = browserExports.debug("StageMoveRestriction");
class StageMoveRestriction {
  constructor(e, t, s) {
    this.canvasDep = e, this.stageSize = t, this.factories = s;
  }
  position(e, t) {
    return this.canvasDep.canvas(
      this.factories.guest.create((s) => {
        this.stageSize.value(
          this.factories.guest.create((o) => {
            localDebug$n("income position", e);
            const i = o.width - s.clientWidth, n = o.height - s.clientHeight, c = e.x * -1, a = e.y * -1;
            if (n < 0 || i < 0)
              return { x: 0, y: 0 };
            localDebug$n("boundings", n, i, a, c), t.give({
              x: e.x > 0 ? 0 : c > i ? i * -1 : e.x,
              y: e.y > 0 ? 0 : a > n ? n * -1 : e.y
            });
          })
        );
      })
    ), t;
  }
}
const localDebug$m = browserExports.debug("app:MapObjectsVisible");
class MapObjectsVisible {
  constructor(e, t, s, o) {
    b(this, "visibleObjectsCache", new SourceEmpty());
    localDebug$m("constructor initialized");
    const i = o.chain.create();
    t.size(o.patron.create(i.guestKey("size"))), e.position(o.patron.create(i.guestKey("position"))), s.currentMap(o.patron.create(i.guestKey("map"))), i.value(
      o.patron.create(
        o.guest.create(({ position: n, size: c, map: a }) => {
          const h = Object.values(a.objects);
          localDebug$m("objects come to result", h);
          const u = h.filter((l) => {
            const d = a.types[l.type] ?? {}, m = {
              width: l.width || d.width,
              height: l.height || d.height
            };
            return this.isInBounding(n, c, l.position, m);
          });
          localDebug$m("visible objects calculated", u), this.visibleObjectsCache.give(u);
        })
      )
    );
  }
  objects(e) {
    return this.visibleObjectsCache.value(e), this;
  }
  isInBounding(e, t, s, o) {
    const i = e.x, n = e.x - t.width, c = e.y, a = e.y - t.height, [h, u] = s;
    return localDebug$m("bounding vars", i, n, c, a), localDebug$m("object position", s), i > -h - o.width && -h > n && c > -u - o.height && -u > a;
  }
}
const regexpMatches = (r, e) => {
  const t = r.matchAll(e);
  return Array.from(t).map((s) => s[1]);
}, buildMapFromArray = (r, e) => r.reduce((t, s) => (t[s] = e[s] || s, t), {});
class ObjectAdditionalFieldsFix {
  constructor(e, t, s, o) {
    this.mapFile = t, this.mapObject = s, this.factories = o, e.objectId(this);
  }
  give(e) {
    return this.mapFile.currentMap(
      this.factories.guest.create((t) => {
        const s = t.objects[e];
        if (!s)
          return;
        const o = t.types[s.type], i = /\$\{([a-zA-Z1-9]+)\}/g, c = regexpMatches(o.svg, i).filter((a) => a !== "width" && a !== "height");
        s.additionalFields = buildMapFromArray(c, s.additionalFields ?? {}), this.mapObject.give(s);
      })
    ), this;
  }
  introduction() {
    return "patron";
  }
}
class ArrowPath {
  constructor() {
    b(this, "filledPoints", /* @__PURE__ */ new Map());
  }
  clear() {
    this.filledPoints.clear();
  }
  breakPoints(e, t, s) {
    const o = this.arrowPointPosition(
      e.shapeGeometry,
      e.shapePosition,
      e.lookToGeometry,
      e.lookToPosition
    ), i = this.arrowPointPosition(
      t.shapeGeometry,
      t.shapePosition,
      t.lookToGeometry,
      t.lookToPosition
    );
    return s.give([
      +o.point.x + o.shift.x,
      +o.point.y + o.shift.y,
      +o.breakPoint.x + o.shift.x,
      +o.breakPoint.y + o.shift.y,
      +i.breakPoint.x + i.shift.x,
      +i.breakPoint.y + i.shift.y,
      +i.point.x + i.shift.x,
      +i.point.y + i.shift.y
    ]), this;
  }
  arrowPointPosition(e, t, s, o) {
    return this.arrowPointPositionNear(
      e,
      t,
      s,
      o
    );
  }
  arrowPointPositionNear(e, t, s, o) {
    const i = {
      x: +o.x + Math.round(s.width / 2),
      y: +o.y + Math.round(s.height / 2)
    }, n = {
      x: +t.x + Math.round(e.width / 2),
      y: +t.y + Math.round(e.height / 2)
    }, c = n.x - i.x, a = n.y - i.y, h = Math.abs(a) > Math.abs(c);
    let u = +t.x, l = +t.y;
    const d = h && a >= 0, m = !h && c >= 0, p = h && a < 0, g = !h && c < 0, f = { x: 0, y: 0 };
    let v = 0, y = 0;
    d ? (u += Math.round(e.width / 2), f.x = u, f.y = (t.y + o.y + s.height) / 2, v = o.x > t.x ? 1 : -1) : g ? (l += Math.round(e.height / 2), u += +e.width, f.x = (t.x + e.width + o.x) / 2, f.y = l, y = o.y > t.y ? 1 : -1) : p ? (u += Math.round(e.width / 2), l += +e.height, f.x = u, f.y = (t.y + e.height + o.y) / 2, v = o.x > t.x ? 1 : -1) : m && (l += Math.round(e.height / 2), f.x = (t.x + o.x + s.width) / 2, f.y = l, y = o.y > t.y ? 1 : -1);
    const x = [u, l].join("-"), $ = this.filledPoints.get(x) || 0;
    return this.filledPoints.set(x, $ + 1), {
      point: { x: u, y: l },
      breakPoint: f,
      shift: {
        x: v * $ * 10,
        y: y * $ * 10
      }
    };
  }
}
class ArrowExtremePoints {
  constructor(e, t) {
    this.objectsSource = e, this.objectsMapSource = t;
  }
  value(e) {
    const t = new GuestAwareAll();
    return this.objectsSource.value(new GuestCast(e, t.guestKey("objects"))), this.objectsMapSource.value(new GuestCast(e, t.guestKey("objectsMap"))), t.value(
      new GuestCast(
        e,
        ({ objects: s, objectsMap: o }) => {
          const i = [];
          s.forEach((n) => {
            n.arrows.forEach((c) => {
              const a = o[c.id];
              a && i.push({
                fromObject: n,
                toObject: a
              });
            });
          }), give(i, e);
        }
      )
    ), this;
  }
}
class ArrowThreeBreaksPath {
  constructor(e) {
    this.arrowDeps = e;
  }
  value(e) {
    return this.arrowDeps.value(
      new GuestCast(e, (t) => {
        if (t.type !== "threeBreaks")
          return;
        const s = this.points(t.fromObject, t.toObject), o = this.points(t.toObject, t.fromObject);
        give({
          key: t.fromObject.id + "-" + t.toObject.id,
          points: [
            +s.point.x + s.shift.x,
            +s.point.y + s.shift.y,
            +s.breakPoint.x + s.shift.x,
            +s.breakPoint.y + s.shift.y,
            +o.breakPoint.x + o.shift.x,
            +o.breakPoint.y + o.shift.y,
            +o.point.x + o.shift.x,
            +o.point.y + o.shift.y
          ]
        }, e);
      })
    ), this;
  }
  points(e, t) {
    const s = {
      x: +t.position[0] + Math.round(t.width / 2),
      y: +t.position[1] + Math.round(t.height / 2)
    }, o = {
      x: +e.position[0] + Math.round(e.width / 2),
      y: +e.position[1] + Math.round(e.height / 2)
    }, i = o.x - s.x, n = o.y - s.y, c = Math.abs(n) > Math.abs(i);
    let a = +e.position[0], h = +e.position[1];
    const u = c && n >= 0, l = !c && i >= 0, d = c && n < 0, m = !c && i < 0, p = { x: 0, y: 0 };
    return u ? (a += Math.round(e.width / 2), p.x = a, p.y = (e.position[1] + t.position[1] + t.height) / 2, t.position[0] > e.position[0]) : m ? (h += Math.round(e.height / 2), a += +e.width, p.x = (e.position[0] + e.width + t.position[0]) / 2, p.y = h, t.position[1] > e.position[1]) : d ? (a += Math.round(e.width / 2), h += +e.height, p.x = a, p.y = (e.position[1] + e.height + t.position[1]) / 2, t.position[1] > e.position[1]) : l && (h += Math.round(e.height / 2), p.x = (e.position[0] + t.position[0] + t.width) / 2, p.y = h, t.position[1] > e.position[1]), {
      point: { x: a, y: h },
      breakPoint: p,
      shift: {
        x: 0,
        y: 0
      }
    };
  }
}
class ArrowTwoBreaksPath {
  constructor(e) {
    this.arrowDeps = e;
  }
  value(e) {
    return this.arrowDeps.value(
      new GuestCast(e, (t) => {
        t.type === "twoBreaks" && give({
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
    }, o = {
      startHeight: t.position[1],
      startWidth: t.position[0],
      midHeight: t.position[1] + Math.round(t.height / 2),
      midWidth: t.position[0] + Math.round(t.width / 2),
      fullHeight: t.position[1] + t.height,
      fullWidth: t.position[0] + t.width
    }, i = {
      "left-top": () => s.fullWidth < o.startWidth && s.fullHeight < o.startHeight,
      "right-top": () => o.fullWidth < s.startWidth && s.fullHeight < o.startHeight,
      "left-bottom": () => s.fullWidth < o.startWidth && o.fullHeight < s.startHeight,
      "right-bottom": () => o.fullWidth < s.startWidth && o.fullHeight < s.startHeight
    }, n = {
      "left-top": () => [s.fullWidth, s.midHeight, o.midWidth, s.midHeight, o.midWidth, o.startHeight],
      "right-top": () => [
        s.startWidth,
        s.midHeight,
        o.midWidth,
        s.midHeight,
        o.midWidth,
        o.startHeight
      ],
      "left-bottom": () => [s.fullWidth, s.midHeight, o.midWidth, s.midHeight, o.midWidth, o.fullHeight],
      "right-bottom": () => [s.startWidth, s.midHeight, o.midWidth, s.midHeight, o.midWidth, o.fullHeight]
    }, c = Object.entries(i).reduce((a, [h, u]) => (u() && (a = h), a), "left-top");
    return n[c]();
  }
}
class ArrowType {
  constructor(e, t = 10) {
    this.arrowDepsSource = e, this.centerGap = t;
  }
  value(e) {
    return this.arrowDepsSource.value(
      new GuestCast(e, ({ fromObject: t, toObject: s }) => {
        const o = {
          width: t.width,
          height: t.height
        }, i = {
          x: t.position[0],
          y: t.position[1]
        }, n = {
          width: s.width,
          height: s.height
        }, c = {
          x: s.position[0],
          y: s.position[1]
        }, a = {
          x: +c.x + Math.round(n.width / 2),
          y: +c.y + Math.round(n.height / 2)
        }, h = {
          x: +i.x + Math.round(o.width / 2),
          y: +i.y + Math.round(o.height / 2)
        }, u = Math.abs(a.x - h.x) - (n.width + this.centerGap), l = Math.abs(a.y - h.y) - (n.height + this.centerGap);
        give({
          fromObject: t,
          toObject: s,
          type: u < 0 || l < 0 ? "threeBreaks" : "twoBreaks"
        }, e);
      })
    ), this;
  }
}
class ArrowSamePointsGroups {
  constructor(e) {
    this.basePoints = e;
  }
  value(e) {
    return this.basePoints.value(
      new GuestCast(e, (t) => {
        const s = {};
        t.forEach((o, i) => {
          const n = "" + o.points.at(0) + o.points.at(1);
          s[n] || (s[n] = []), s[n].push({
            arrowIndex: i,
            pointStartIndex: 0,
            breakPointStartIndex: 2,
            pointEndIndex: o.points.length - 2
          });
          const c = "" + o.points.at(-2) + o.points.at(-1);
          s[c] || (s[c] = []), s[c].push({
            arrowIndex: i,
            pointStartIndex: o.points.length - 2,
            breakPointStartIndex: o.points.length - 4,
            pointEndIndex: 0
          });
        }), give(s, e);
      })
    ), this;
  }
}
const gapSize = 15;
class ArrowSamePointsGap {
  constructor(e) {
    b(this, "pointGroups");
    this.basePoints = e, this.pointGroups = new ArrowSamePointsGroups(e);
  }
  value(e) {
    const t = new GuestAwareAll();
    return this.pointGroups.value(new GuestCast(e, t.guestKey("pointGroups"))), this.basePoints.value(new GuestCast(e, t.guestKey("basePoints"))), t.value(
      new GuestCast(e, ({ pointGroups: s, basePoints: o }) => {
        Object.values(s).forEach((i) => {
          if (i.length <= 1)
            return;
          i.sort((a, h) => o[h.arrowIndex].points[h.pointEndIndex] - o[a.arrowIndex].points[a.pointEndIndex]);
          let n = 0, c = 0;
          i.forEach((a, h) => {
            const u = o[a.arrowIndex].points[a.pointStartIndex], l = o[a.arrowIndex].points[a.pointStartIndex + 1], d = o[a.arrowIndex].points[a.pointEndIndex], m = o[a.arrowIndex].points[a.pointEndIndex + 1], p = o[a.arrowIndex].points[a.breakPointStartIndex], g = o[a.arrowIndex].points[a.breakPointStartIndex + 1], f = u > p ? -1 : u < p ? 1 : 0, v = l > g ? -1 : l < g ? 1 : 0, y = u > d ? -1 : u < d ? 1 : 0, x = l > m ? -1 : l < m ? 1 : 0;
            if (f !== 0) {
              let $ = 0;
              h !== 0 && (x > 0 ? (c += 1, $ = c) : (n += 1, $ = n)), x && (o[a.arrowIndex].points[a.pointStartIndex + 1] = o[a.arrowIndex].points[a.pointStartIndex + 1] + $ * x * gapSize), o[a.arrowIndex].points[a.breakPointStartIndex + 1] = o[a.arrowIndex].points[a.breakPointStartIndex + 1] + $ * x * gapSize;
            }
            if (v !== 0) {
              let $ = 0;
              h !== 0 && (y > 0 ? (c += 1, $ = c) : (n += 1, $ = n)), o[a.arrowIndex].points[a.pointStartIndex] = o[a.arrowIndex].points[a.pointStartIndex] + $ * y * gapSize, o[a.arrowIndex].points[a.breakPointStartIndex] = o[a.arrowIndex].points[a.breakPointStartIndex] + $ * y * gapSize;
            }
          });
        }), give(o, e);
      })
    ), this;
  }
}
class GuestAwareFirst {
  constructor(e) {
    this.guestAwares = e;
  }
  value(e) {
    let t = null;
    return this.guestAwares.forEach((s) => {
      s.value(
        new GuestCast(e, (o) => {
          (!t || t === s) && (give(o, e), t = s);
        })
      );
    }), this;
  }
}
class GuestAwareSequence {
  constructor(e, t) {
    this.baseSource = e, this.targetSourceFactory = t;
  }
  value(e) {
    const t = new GuestAwareAll(), s = new SourceEmpty(), o = this.targetSourceFactory.create(
      s
    );
    return this.baseSource.value(
      new GuestCast(e, (i) => {
        let n = 0;
        const c = () => {
          i[n + 1] !== void 0 ? (n = n + 1, a()) : t.valueArray(e);
        };
        function a() {
          s.give(i[n]), o.value(t.guestKey("" + n)), o.value(c);
        }
        i[n] !== void 0 ? a() : give([], e);
      })
    ), this;
  }
}
class Module {
  constructor(e) {
    this.buildingFn = e;
  }
  create(...e) {
    return this.buildingFn(...e);
  }
}
var debounce = debounce_1, isObject = isObject_1, FUNC_ERROR_TEXT = "Expected a function";
function throttle(r, e, t) {
  var s = !0, o = !0;
  if (typeof r != "function")
    throw new TypeError(FUNC_ERROR_TEXT);
  return isObject(t) && (s = "leading" in t ? !!t.leading : s, o = "trailing" in t ? !!t.trailing : o), debounce(r, e, {
    leading: s,
    maxWait: e,
    trailing: o
  });
}
var throttle_1 = throttle;
const throttle$1 = /* @__PURE__ */ getDefaultExportFromCjs(throttle_1), { Arrow: Arrow$1 } = Konva, localDebug$l = browserExports.debug("MapObjectsArrows");
class MapObjectsArrows {
  constructor(e, t, s, o, i) {
    b(this, "previouslyRenderedArrows", /* @__PURE__ */ new Map());
    this.konvaLayer = e, this.mapFile = t, this.mapDep = s, this.arrowPath = o, this.factories = i, localDebug$l("draw arrows on canvas");
    const n = this.factories.chain.create();
    this.konvaLayer.layer(this.factories.patron.create(n.guestKey("layer"))), this.mapFile.currentMap(this.factories.patron.create(n.guestKey("map"))), this.mapDep.objects(this.factories.patron.create(n.guestKey("objects"))), n.value(
      this.factories.patron.create(
        this.factories.guest.create(
          throttle$1(({ layer: c, map: a, objects: h }) => {
            this.previouslyRenderedArrows.forEach((d) => {
              d.arrow.hide();
            });
            const u = h.reduce((d, m) => (d[m.id] = m, d), {});
            new ArrowSamePointsGap(
              new GuestAwareSequence(
                new ArrowExtremePoints(
                  new GuestAware((d) => give(h, d)),
                  new GuestAware((d) => give(u, d))
                ),
                new Module((d) => {
                  const m = new ArrowType(d);
                  return new GuestAwareFirst([new ArrowTwoBreaksPath(m), new ArrowThreeBreaksPath(m)]);
                })
              )
            ).value((d) => {
              d.forEach((m) => {
                const p = m.key;
                if (this.previouslyRenderedArrows.has(p)) {
                  const f = this.previouslyRenderedArrows.get(p);
                  f.arrow.show(), f.arrow.points(m.points);
                  return;
                }
                const g = new Arrow$1({
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
                this.previouslyRenderedArrows.set(p, {
                  arrow: g
                }), c.add(g);
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
const { Arrow } = Konva, localDebug$k = browserExports.debug("NewArrow"), arrowGeometry = {
  width: 10,
  height: 10
};
class NewArrow {
  constructor(e, t, s, o) {
    b(this, "cursorGuest");
    b(this, "arrowCache");
    this.konvaLayer = e, this.cursorPosition = t, this.arrowPath = s, this.factories = o, this.cursorGuest = this.factories.sourceEmpty.create(), this.arrowCache = this.factories.sourceEmpty.create();
  }
  /**
   * Создать новую стрелку для объекта
   */
  forObject(e) {
    localDebug$k("start watch cursor"), this.cursorGuest.value(
      this.factories.guest.create((o) => {
        removePatronFromPools(o);
      })
    );
    let t = null;
    const s = this.factories.patron.create(
      this.factories.guest.create((o) => {
        localDebug$k("cursor moves"), this.konvaLayer.layer(
          this.factories.guest.create((i) => {
            localDebug$k("cursor moves in layer"), this.arrowPath.breakPoints(
              {
                shapeGeometry: {
                  width: e.width,
                  height: e.height
                },
                shapePosition: {
                  x: e.position[0],
                  y: e.position[1]
                },
                lookToGeometry: arrowGeometry,
                lookToPosition: o
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
                shapeGeometry: arrowGeometry,
                shapePosition: o
              },
              this.factories.guest.create((n) => {
                if (t) {
                  t.points(n);
                  return;
                }
                t = new Arrow({
                  x: 0,
                  y: 0,
                  points: n,
                  pointerLength: 20,
                  pointerWidth: 10,
                  fill: "#ccc",
                  stroke: "#bbb",
                  strokeWidth: 2,
                  zIndex: 2
                }), i.add(t), this.arrowCache.give(t);
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
        removePatronFromPools(e);
      })
    ), this.arrowCache.value(
      this.factories.guest.create((e) => {
        e.remove();
      })
    );
  }
}
const localDebug$j = browserExports.debug("MapObjectBackground"), imageBackground = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD//gATQ3JlYXRlZCB3aXRoIEdJTVD/4gKwSUNDX1BST0ZJTEUAAQEAAAKgbGNtcwQwAABtbnRyUkdCIFhZWiAH6AAMAAQADQAqAAthY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1kZXNjAAABIAAAAEBjcHJ0AAABYAAAADZ3dHB0AAABmAAAABRjaGFkAAABrAAAACxyWFlaAAAB2AAAABRiWFlaAAAB7AAAABRnWFlaAAACAAAAABRyVFJDAAACFAAAACBnVFJDAAACFAAAACBiVFJDAAACFAAAACBjaHJtAAACNAAAACRkbW5kAAACWAAAACRkbWRkAAACfAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACQAAAAcAEcASQBNAFAAIABiAHUAaQBsAHQALQBpAG4AIABzAFIARwBCbWx1YwAAAAAAAAABAAAADGVuVVMAAAAaAAAAHABQAHUAYgBsAGkAYwAgAEQAbwBtAGEAaQBuAABYWVogAAAAAAAA9tYAAQAAAADTLXNmMzIAAAAAAAEMQgAABd7///MlAAAHkwAA/ZD///uh///9ogAAA9wAAMBuWFlaIAAAAAAAAG+gAAA49QAAA5BYWVogAAAAAAAAJJ8AAA+EAAC2xFhZWiAAAAAAAABilwAAt4cAABjZcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltjaHJtAAAAAAADAAAAAKPXAABUfAAATM0AAJmaAAAmZwAAD1xtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAEcASQBNAFBtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEL/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAAeAB4DAREAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAwUEAAj/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAH1SCMTDaCMTiuCMTDgxDGf/8QAHhAAAgIBBQEAAAAAAAAAAAAAAAMBAgQFExUyMxL/2gAIAQEAAQUCG9TUPHdga2PndgzrxZQ3qah48gsvnUtHILMrKq5f/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAwEBPwEH/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAgEBPwEH/8QAHhAAAgIBBQEAAAAAAAAAAAAAAAECMXIQQUKSsVH/2gAIAQEABj8CFkvdFkVLqzla4v6VLqxXe60WS90WRUipWipCSTvc/8QAIxAAAgADCAMAAAAAAAAAAAAAAAEQUfAhMUGhscHR8RFhcf/aAAgBAQABPyErMkMi0ZW2wylmzHorbYSSX3Vg5wrMkMi0Z0a5FVK8Llg05nRrkRmteVg//9oADAMBAAIAAwAAABCCQQSCSST/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAEDAQE/EAf/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAECAQE/EAf/xAAeEAEAAQQCAwAAAAAAAAAAAAABIRARIDEAQVFxkf/aAAgBAQABPxDEMgTA4U0lpO6EwKiFh/YAyDIEAZSTdCnwUQAma0AtZOl88//Z";
class MapObjectBackground {
  constructor(e, t, s, o) {
    b(this, "mapNameCache");
    this.konvaLayer = e, this.mapFile = t, this.zIndex = s, this.factories = o, this.mapNameCache = o.cache.create(""), this.mapFile.currentMap(o.patron.create(this));
  }
  give(e) {
    return this.konvaLayer.layer(
      this.factories.patronOnce.create((t) => {
        localDebug$j("map received in background", e), this.mapNameCache.value(
          this.factories.guest.create((s) => {
            if (s === e.url)
              return;
            localDebug$j("background cache is not equals", s), this.mapNameCache.give(e.url);
            const o = new Image(), i = document.querySelector(".grid-example");
            localDebug$j("grid example", i), o.src = imageBackground, o.onload = () => {
              localDebug$j("canvas pattern loaded"), localDebug$j("konva layer loaded");
              const n = new Konva.Rect({
                width: 3e3,
                height: 3e3,
                x: 0,
                y: 0,
                fillPatternImage: o,
                zIndex: 1
              });
              this.zIndex.give(() => {
                n.zIndex(0);
              }), t.add(n);
            };
          })
        );
      })
    ), this;
  }
}
const localDebug$i = browserExports.debug("Breadcrumbs");
class Breadcrumbs {
  constructor(e, t, s) {
    this.parentNames = e, this.mapFile = t, this.factories = s;
  }
  list(e) {
    const t = this.factories.chain.create();
    return this.parentNames.names(this.factories.guestCast.create(e, t.guestKey("names"))), this.mapFile.mapFile(this.factories.guestCast.create(e, t.guestKey("mapFile"))), t.value(
      this.factories.guestInTheMiddle.create(e, ({ names: s, mapFile: o }) => {
        localDebug$i("map id", s, o), e.give(
          s.map((i) => {
            var n, c;
            return {
              title: ((c = (n = o[i]) == null ? void 0 : n.settings) == null ? void 0 : c.title) || "unknown",
              name: i
            };
          })
        );
      })
    ), e;
  }
}
const localDebug$h = browserExports.debug("CursorWithObjects");
class CursorWithObjects {
  constructor(e, t, s) {
    this.objectsVisible = e, this.cursor = t, this.factories = s;
  }
  value(e) {
    const t = this.factories.chain.create();
    return this.cursor.value(this.factories.guestCast.create(e, t.guestKey("cursor"))), this.objectsVisible.objects(
      this.factories.guestCast.create(e, t.guestKey("objects"))
    ), t.value(
      this.factories.guestInTheMiddle.create(e, ({ cursor: s, objects: o }) => {
        const i = o.find((n) => {
          const c = n.position[0], a = n.position[0] + n.width || 100, h = n.position[1], u = n.position[1] + n.height || 100;
          return s.x >= c && s.x <= a && s.y >= h && s.y <= u;
        });
        i ? (localDebug$h("crossed with", i), give({
          x: i.position[0] + i.width / 2,
          y: i.position[1] + i.height / 2
        }, e)) : (localDebug$h("cursor pos", s), give(s, e));
      })
    ), this;
  }
}
class Device {
  constructor(e, t = 768) {
    this.windowWidth = e, this.mobileLimit = t;
  }
  value(e) {
    return this.windowWidth.value(
      new GuestCast(e, (t) => {
        give({
          isMobile: t <= this.mobileLimit,
          isDesktop: t > this.mobileLimit
        }, e);
      })
    ), this;
  }
}
const localDebug$g = browserExports.debug("Drawer");
class Drawer {
  constructor(e, t) {
    b(this, "drawerNameCache");
    this.keyboard = e, this.factories = t, this.drawerNameCache = t.cache.create(""), this.keyboard.pressed(
      this.factories.patron.create(
        this.factories.guest.create((s) => {
          localDebug$g("new key in drawer", s), s === "Escape" && this.give("");
        })
      )
    );
  }
  isOpenedByName(e, t) {
    return this.drawerNameCache.value(
      this.factories.guestInTheMiddle.create(t, (s) => {
        localDebug$g("new drawer name", s), t.give(s === e);
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
class Fps {
  value(e) {
    typeof performance > "u" && e.give(0);
    const t = 10;
    let s = performance.now(), o = 0;
    const i = () => requestAnimationFrame(() => {
      if (o += 1, o >= t) {
        const n = performance.now(), c = n - s;
        e.give(Math.round(1e3 / (c / o))), s = n, o = 0;
      }
      i();
    });
    return i(), e;
  }
}
class Menu {
  constructor(e, t) {
    this.mapFile = e, this.factories = t;
  }
  menuObjects(e) {
    return this.mapFile.currentMap(
      this.factories.guestInTheMiddle.create(e, (t) => {
        const s = Object.values(t.objects).filter((o) => o.inMenu);
        e.give(s);
      })
    ), e;
  }
}
const localDebug$f = browserExports.debug("app:MiniMap"), minimapWidth = 130;
class MiniMap {
  constructor(e, t, s, o) {
    b(this, "theSize");
    b(this, "thePoints");
    b(this, "viewportSizeCache");
    this.map = e, this.layer = t, this.stageSize = s, this.factories = o, this.theSize = o.sourceEmpty.create(), this.thePoints = o.sourceEmpty.create(), this.viewportSizeCache = o.sourceEmpty.create();
    const i = o.chain.create();
    e.objects(o.patron.create(i.guestKey("objects"))), t.layer(o.patron.create(i.guestKey("layer"))), s.value(o.patron.create(i.guestKey("size"))), i.value(
      o.patron.create(
        o.guest.create(({ layer: n, size: c, objects: a }) => {
          const h = minimapWidth / c.width, u = {
            width: Math.round(n.width() * h),
            height: Math.round(n.height() * h)
          };
          this.viewportSizeCache.give(u);
          const l = {
            width: Math.round(c.width * h),
            height: Math.round(c.height * h)
          };
          this.theSize.give(l);
          const d = a.map((m) => ({
            id: m.id,
            x: Math.round(m.position[0] * h),
            y: Math.round(m.position[1] * h),
            width: Math.round(m.width * h),
            height: Math.round(m.height * h)
          }));
          localDebug$f("minimap points", d), this.thePoints.give(d);
        })
      )
    );
  }
  viewportPosition(e) {
    const t = this.factories.chain.create();
    return this.stageSize.value(this.factories.guestCast.create(e, t.guestKey("size"))), this.layer.position(this.factories.guestCast.create(e, t.guestKey("position"))), t.value(
      this.factories.guestInTheMiddle.create(e, ({ size: s, position: o }) => {
        const i = minimapWidth / s.width, n = {
          x: o.x * i * -1,
          y: o.y * i * -1
        };
        localDebug$f("scaled position is", n), e.give(n);
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
const localDebug$e = browserExports.debug("Modal");
class Modal {
  constructor(e, t) {
    b(this, "modalNameCache");
    this.keyboard = e, this.factories = t, localDebug$e("modal created"), this.modalNameCache = t.cache.create(""), this.keyboard.pressed(
      this.factories.patron.create(
        this.factories.guest.create((s) => {
          localDebug$e("new key in modal", s), s === "Escape" && this.give("");
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
class Notification {
  constructor(e) {
    b(this, "messageCache");
    b(this, "notificationLifetimeDelay", 3500);
    b(this, "lastTimerHead", null);
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
const localDebug$d = browserExports.debug("ObjectGeometryFix");
class ObjectGeometryFix {
  constructor(e, t, s, o) {
    b(this, "innerReceive");
    this.mapFile = t, this.map = s, this.factories = o, e.objects(o.patron.create(this)), this.innerReceive = debounce$2((i) => {
      this.mapFile.currentMap(
        this.factories.guest.create((n) => {
          localDebug$d("objects to fix", i);
          const c = document.querySelectorAll(".objects-container .rendered-object"), a = n.objects;
          let h = !1;
          c.forEach((u) => {
            const l = u.getAttribute("data-object-id");
            if (localDebug$d("i see id", l), !l)
              return;
            const d = a[l];
            if (d && (localDebug$d("dom object geometry", u.clientWidth, u.clientHeight), localDebug$d("saved object geometry", d.width, d.height), (d.width !== u.clientWidth || d.height !== u.clientHeight) && (h = !0, localDebug$d("update object geometry"), d.width = u.clientWidth, d.height = u.clientHeight), !d.width || !d.height)) {
              const m = n.types[d.type];
              d.width = m.width, d.height = m.height;
            }
          }), h && this.map.give({
            ...n,
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
const localDebug$c = browserExports.debug("MapObjectsRectsPatron");
class MapObjectsRects {
  constructor(e, t, s, o, i, n, c, a, h) {
    b(this, "previouslyRenderedRects", /* @__PURE__ */ new Map());
    this.konvaLayer = e, this.mapFile = t, this.mapObject = s, this.mapObjectCurrent = i, this.mapObjectForRendering = n, this.objectPosition = c, this.settings = a, this.factories = h, o.objects(this);
  }
  give(e) {
    return this.konvaLayer.layer(
      this.factories.patronOnce.create(
        this.factories.guest.create((t) => {
          const s = this.factories.chain.create();
          this.mapFile.currentMap(s.guestKey("map")), this.settings.value(s.guestKey("settings")), s.value(
            this.factories.guest.create((o) => {
              const { map: i, settings: n } = o;
              localDebug$c("rerender object rects"), this.previouslyRenderedRects.forEach((c) => {
                c.hide();
              }), e.forEach((c) => {
                const a = i.types[c.type], h = +c.width || +a.width || 100, u = +c.height || +a.height || 100;
                if (this.previouslyRenderedRects.has(c)) {
                  const m = this.previouslyRenderedRects.get(c);
                  m.width(h), m.height(u), m.x(+c.position[0]), m.y(+c.position[1]), m.show();
                  return;
                }
                localDebug$c("rect object", c, a);
                const l = new Konva.Rect({
                  x: +c.position[0],
                  y: +c.position[1],
                  width: h,
                  height: u,
                  name: c.id,
                  draggable: !n.readonly,
                  objectId: c.id,
                  zIndex: 3
                });
                this.previouslyRenderedRects.set(c, l), t.add(l), l.on("mouseenter", () => {
                  t.getStage().container().style.cursor = "pointer";
                }), l.on("mouseleave", () => {
                  t.getStage().container().style.cursor = "default";
                }), l.on("dragend", () => {
                  localDebug$c("drag ended"), this.objectPosition.position(
                    c,
                    {
                      x: l.x(),
                      y: l.y()
                    },
                    this.factories.guest.create((m) => {
                      this.mapObject.give({
                        ...c,
                        position: [m.x, m.y]
                      });
                    })
                  );
                }), l.on("dragmove", () => {
                  localDebug$c("dragmove works", l.x(), l.y()), t.getStage().container().style.cursor = "move", this.objectPosition.position(
                    c,
                    {
                      x: l.x(),
                      y: l.y()
                    },
                    this.factories.guest.create((m) => {
                      this.mapObjectForRendering.give({
                        ...c,
                        position: [m.x, m.y]
                      });
                    })
                  );
                });
                const d = () => {
                  localDebug$c("object clicked with id", c.id), this.mapObjectCurrent.give(c.id);
                };
                l.on("click", d), l.on("tap", d);
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
class Resizing {
  constructor(e, t, s, o) {
    this.canvas = t, this.konvaLayer = s, this.factories = o, e.currentMap(this);
  }
  give() {
    const e = new ResizeObserver((s) => {
      requestAnimationFrame(() => {
        const [o] = s;
        this.canvas.canvas(
          this.factories.guest.create((i) => {
            const n = i.getBoundingClientRect();
            this.konvaLayer.layer(
              this.factories.guest.create((c) => {
                c.getStage().width(o.contentRect.width - n.left), c.getStage().height(o.contentRect.height - n.top), this.canvas.give(i), this.konvaLayer.give(c);
              })
            );
          })
        );
      });
    }), t = document.querySelector("body");
    return t && e.observe(t), this;
  }
}
const localDebug$b = browserExports.debug("StagePosition");
class StagePosition {
  constructor(e) {
    this.stageMove = e;
  }
  give(e) {
    return localDebug$b("received position", e), this.stageMove.move(e), this;
  }
}
class StagePositionByObjectId {
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
class Window {
  constructor() {
    b(this, "source", new Source({
      height: window.innerHeight,
      width: window.innerWidth
    }));
    const e = new ResizeObserver(debounce$2((s) => {
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
const localDebug$a = browserExports.debug("Zindex");
class Zindex {
  constructor(e) {
    b(this, "fnsCache");
    this.factories = e, this.fnsCache = e.cache.create([]), this.fnsCache.value(
      e.patron.create(
        e.guest.create(
          debounce$2((t) => {
            localDebug$a("zindex fns run"), t.forEach((s) => s());
          }, 50)
        )
      )
    );
  }
  give(e) {
    return localDebug$a("zindex received value"), this.fnsCache.value(
      this.factories.guest.create((t) => {
        this.fnsCache.give(t.concat(e));
      })
    ), this;
  }
}
const localDebug$9 = browserExports.debug("app:BrowserCanvas");
class BrowserCanvas {
  constructor(e) {
    b(this, "canvasCache");
    this.factories = e, this.canvasCache = e.sourceEmpty.create();
  }
  canvas(e) {
    return this.canvasCache.value(e), this;
  }
  size(e) {
    return this.canvasCache.value(
      this.factories.guestInTheMiddle.create(e, (t) => {
        const s = t.width || t.clientWidth, o = t.height || t.clientHeight;
        localDebug$9("canvas size", s, o), e.give({
          height: o,
          width: s
        });
      })
    ), this;
  }
  give(e) {
    return localDebug$9("receive new canvas", e), this.canvasCache.give(e), this;
  }
}
const localDebug$8 = browserExports.debug("Cursor");
class Cursor {
  constructor(e, t) {
    b(this, "cursorPool");
    this.cursorPool = t.pool.create(this);
    const s = {
      x: 0,
      y: 0
    };
    window == null || window.addEventListener("mousemove", (o) => {
      const i = {
        x: o.offsetX + -s.x,
        y: o.offsetY + -s.y
      };
      localDebug$8("move cursor fired", i), this.cursorPool.give(i);
    }), e.position(
      t.patron.create(
        t.guest.create((o) => {
          s.x = o.x, s.y = o.y;
        })
      )
    );
  }
  value(e) {
    return this.cursorPool.add(new GuestObject(e)), this;
  }
}
class Draggable {
  constructor(e) {
    this.el = e, e.value(this);
  }
  give(e) {
    return e.addEventListener("dragstart", (t) => {
      const s = t.target;
      if (!s)
        return;
      const o = s.cloneNode(!0);
      o.style.transform = "translate(0,0)", o.style.position = "absolute", o.style.top = "0", o.style.left = "0", o.style.zIndex = "999", t.dataTransfer && t.dataTransfer.setDragImage(o, 0, 0), document.body.append(o);
      const i = (n) => {
        o.style.transform = `translate(${n.clientX}px, ${n.clientY}px)`;
      };
      s.addEventListener("drag", i, { passive: !0 }), s.addEventListener("dragend", () => {
        o.removeEventListener("drag", i), o.remove();
      });
    }), this;
  }
  introduction() {
    return "patron";
  }
}
const localDebug$7 = browserExports.debug("ControlCombo");
class ControlCombo {
  constructor(e, t) {
    this.keyboard = e, this.factories = t;
  }
  /**
   * Случилась комбинация ctrl + keyCode
   */
  happened(e, t) {
    this.keyboard.event(
      this.factories.guestInTheMiddle.create(t, (s) => {
        localDebug$7("combo happened look for key", e, "received", s.code), s.ctrlKey && s.code === e && s.type === "keydown" && (s.preventDefault(), t.give(s));
      })
    );
  }
  /**
   * Случилась комбинация ctrl + keyCode с условием comboCondition
   */
  happenedConditional(e, t, s) {
    localDebug$7("combo control happened registration"), this.keyboard.event(
      this.factories.guestInTheMiddle.create(s, (o) => {
        localDebug$7("keyboard event come"), t.value(
          this.factories.guest.create((i) => {
            localDebug$7("combo happened look for key", e, "received", o.code), i && o.ctrlKey && o.code === e && o.type === "keydown" && (o.preventDefault(), s.give(o));
          })
        );
      })
    );
  }
}
const localDebug$6 = browserExports.debug("Keyboard");
class Keyboard {
  constructor(e) {
    b(this, "pressedPool");
    b(this, "combinationsPool");
    localDebug$6("keyboard created"), this.pressedPool = e.pool.create(this), this.combinationsPool = e.pool.create(this), window == null || window.addEventListener("keyup", (t) => {
      localDebug$6("keyboard pressed", t.key), this.pressedPool.give(t.key);
    }), useMagicKeys({
      passive: !1,
      onEventFired: (t) => {
        localDebug$6("magic combination happens 11", t.ctrlKey, t.key), this.combinationsPool.give(t);
      }
    });
  }
  pressed(e) {
    return localDebug$6("keyboard receive pressed subscriber"), this.pressedPool.add(e), this;
  }
  event(e) {
    return localDebug$6("keyboard receive combination subscriber"), this.combinationsPool.add(e), this;
  }
}
class SessionRecord {
  constructor(e) {
    b(this, "source", new SourceEmpty());
    if (this.name = e, sessionStorage[e])
      try {
        this.source.give(JSON.parse(sessionStorage[e]));
      } catch {
        console.warn(`SessionRecord cant parse value ${e}`);
      }
  }
  value(e) {
    return this.source.value(e), this;
  }
  give(e) {
    this.source.give(e);
    try {
      sessionStorage[this.name] = JSON.stringify(e);
    } catch {
      console.warn(`SessionRecord cant stringify value ${this.name}`);
    }
    return this;
  }
  pool() {
    return this.pool();
  }
}
const localDebug$5 = browserExports.debug("app:konva:KonvaLayer");
class KonvaLayer {
  constructor(e, t, s, o) {
    b(this, "guestChain");
    b(this, "positionCache");
    b(this, "layerCache");
    this.canvasDep = e, this.stageMoveRestriction = s, this.factories = o, this.positionCache = o.cache.create({
      x: 0,
      y: 0
    }), this.guestChain = o.chain.create(), this.layerCache = o.sourceEmpty.create(), this.canvasDep.canvas(o.patron.create(this.guestChain.guestKey("canvas"))), t.value(this.guestChain.guestKey("stageSize")), this.guestChain.value(
      o.guest.create(
        ({ canvas: i }) => {
          localDebug$5("create new konva stage");
          const n = new Konva.Stage({
            width: i.clientWidth,
            height: i.clientHeight,
            container: i,
            fill: "#ffeeee",
            draggable: !0
          }), c = new Konva.Layer();
          n.add(c), c.draw(), this.layerCache.give(c), n.on("dragend", (h) => {
            if (!(h.target instanceof Konva.Stage))
              return;
            const u = {
              x: n.x(),
              y: n.y()
            };
            localDebug$5("new position", u), this.positionCache.give(u);
          }), n.on("dragmove", (h) => {
            if (!(h.target instanceof Konva.Stage))
              return;
            const u = {
              x: n.x(),
              y: n.y()
            };
            this.positionCache.give(u);
          });
          const a = this.factories.guestSync.create({
            x: 0,
            y: 0
          });
          n.dragBoundFunc((h) => (s.position(h, a), a.value()));
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
class KonvaLayerShiftPoint {
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
const localDebug$4 = browserExports.debug("position");
class KonvaMove {
  constructor(e, t, s, o, i) {
    this.layer = e, this.canvas = t, this.stageSize = s, this.stageMoveRestriction = o, this.factories = i;
  }
  move(e) {
    localDebug$4("move stage to new point", e.position), this.stageSize.value(
      this.factories.guest.create(() => {
        this.canvas.size(
          this.factories.guest.create((t) => {
            this.layer.layer(
              this.factories.guest.create((s) => {
                const [o, i] = e.position, n = {
                  x: -o - Math.round(e.width / 2) + Math.round(t.width / 2),
                  y: -i - Math.round(e.height / 2) + Math.round(t.height / 2)
                };
                this.stageMoveRestriction.position(
                  n,
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
const factories = useFactories(), keyboard = new Keyboard(factories), settings = new Source({
  readonly: !1,
  presets: {}
}), modal = new Modal(keyboard, factories), drawer = new Drawer(keyboard, factories), notification = new Notification(factories), mapCurrentID = new MapCurrentID(factories), fileContent = factories.sourceEmpty.create(), mapFile = new MapFile(fileContent, mapCurrentID, factories), mapCurrentTitle = new MapCurrentTitle(mapFile), documentTitle = new DocumentTitle(mapCurrentTitle), sessionMap = new SessionRecord("current-map");
mapFile.currentMap(new Patron(sessionMap));
const mapFileForRendering = new MapFileForRendering(mapFile, mapCurrentID, factories), mapForRendering = new MapCurrent(mapFileForRendering, mapCurrentID, factories), mapObjectForRendering = new MapObject(mapForRendering, mapFileForRendering, factories), mapCurrent = new MapCurrent(mapFile, mapCurrentID, factories), mapCurrentSource = new GuestAware((r) => {
  mapFile.currentMap(new GuestObject(r));
}), mapObjectCurrent = new MapObjectCurrent(drawer, factories), mapTypeCurrent = new MapTypeCurrent(factories), mapSettings = new MapSettings(mapFile, mapCurrent, factories), canvas = new BrowserCanvas(factories), stageSize = new StageDefaultSize(), stageMoveRestriction = new StageMoveRestriction(canvas, stageSize, factories), konvaLayer = new KonvaLayer(canvas, stageSize, stageMoveRestriction, factories), zIndex = new Zindex(factories), mapBackground = new MapObjectBackground(konvaLayer, mapFile, zIndex, factories), mapObject = new MapObject(mapCurrent, mapFile, factories), mapObjectRemoved = new MapObjectRemoved(
  mapCurrent,
  mapFile,
  [new CheckNotification(notification, new MapObjectHasArrowCheck(mapFile, factories), factories)],
  factories
), konvaLayerPosition = new KonvaLayerShiftPoint(konvaLayer, factories), mapObjectNew = new MapObjectNew(mapCurrent, mapObject, canvas, konvaLayerPosition, factories), mapTypeUsedCheck = new MapTypeUsed(mapFile, factories), mapType = new MapTypes(
  mapCurrent,
  mapFile,
  [
    new CheckNotification(
      notification,
      new MapTypeUsedNameChangedCheck(mapTypeUsedCheck, factories),
      factories
    )
  ],
  factories
), mapTypeRemoved = new MapTypeRemoved(
  mapCurrent,
  mapFile,
  [new CheckNotification(notification, mapTypeUsedCheck, factories)],
  factories
), mapTypeNew = new MapTypeNew(mapType), mapObjectsVisible = new MapObjectsVisible(konvaLayer, canvas, mapFileForRendering, factories), mapObjectsGeometryFix = new ObjectGeometryFix(
  mapObjectsVisible,
  mapFile,
  mapCurrent,
  factories
), mapRects = new MapObjectsRects(
  konvaLayer,
  mapFile,
  mapObject,
  mapObjectsVisible,
  mapObjectCurrent,
  mapObjectForRendering,
  new ObjectPositionGridStick(new ObjectPositionBounds(stageSize, factories), factories),
  settings,
  factories
), cursor = new Cursor(konvaLayer, factories), cursorWithObjects = new CursorWithObjects(mapObjectsVisible, cursor, factories), arrowPath = new ArrowPath(), newArrow = new NewArrow(konvaLayer, cursorWithObjects, arrowPath, factories), mapArrows = new MapObjectsArrows(konvaLayer, mapFile, mapForRendering, arrowPath, factories), miniMap = new MiniMap(mapForRendering, konvaLayer, stageSize, factories), mapObjectsLink = new MapObjectsLink(
  mapObjectCurrent,
  mapCurrent,
  mapObject,
  newArrow,
  factories
), resizing = new Resizing(mapFile, canvas, konvaLayer, factories), objectAdditionalFieldsFix = new ObjectAdditionalFieldsFix(
  mapObjectCurrent,
  mapFile,
  mapObject,
  factories
), mapRemoved = new MapRemoved(mapFile, mapCurrentID, factories), mapObjectRelationRemoved = new MapObjectRelationRemoved(mapObject), fps = new Fps(), parentNames = new MapObjectParentNames(mapCurrentID, factories), breadcrumbs = new Breadcrumbs(parentNames, mapFile, factories), mapObjectUrl = new MapObjectUrl(mapCurrentID, factories), parentTypes = new ParentTypes(parentNames, mapFile, factories), controlCombo = new ControlCombo(keyboard, factories), menu = new Menu(mapFile, factories), konvaMove = new KonvaMove(konvaLayer, canvas, stageSize, stageMoveRestriction, factories), stagePosition = new StagePosition(konvaMove), stagePositionByObjectId = new StagePositionByObjectId(konvaMove, factories), objectsMatchedToQuery = new ObjectsMatchedToQuery(mapCurrent, factories), mapHistory = new MapHistory(mapFile, mapCurrent, mapCurrentID, factories), objectsOutsideScreen = new ObjectsOutsideScreen(mapCurrent, stageSize, konvaLayer, factories), sidebarDraggable = new SourceEmpty();
new Draggable(sidebarDraggable);
const theWindow = new Window(), windowWidth = new GuestAware((r) => {
  theWindow.value(
    new GuestCast(r, (e) => {
      give(e.width, r);
    })
  );
}), device = new Device(windowWidth), modules = {
  mapCurrentID,
  mapFile,
  mapCurrent,
  mapCurrentSource,
  mapRemoved,
  mapSettings,
  mapObject,
  mapObjectRemoved,
  mapType,
  mapTypeRemoved,
  mapTypeNew,
  mapObjectsVisible,
  mapObjectCurrent,
  mapObjectNew,
  mapObjectsLink,
  mapTypeCurrent,
  mapRects,
  mapBackground,
  mapObjectArrows: mapArrows,
  mapObjectsGeometryFix,
  canvas,
  miniMap,
  notification,
  modal,
  drawer,
  konvaLayer,
  resizing,
  objectAdditionalFieldsFix,
  mapObjectRelationRemoved,
  fps,
  breadcrumbs,
  mapObjectUrl,
  keyboard,
  parentNames,
  parentTypes,
  controlCombo,
  menu,
  stagePosition,
  stagePositionByObjectId,
  objectsMatchedToQuery,
  stageSize,
  mapHistory,
  fileContent,
  newArrow,
  objectsOutsideScreen,
  settings,
  documentTitle,
  sidebarDraggable,
  device
}, useApplication = () => modules;
class VueRefPatron {
  constructor(e = void 0) {
    b(this, "innerRef");
    this.innerRef = ref(e);
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
const _hoisted_1$q = {
  key: 0,
  title: "Назад",
  class: "absolute text-white left-0 top-0 -ml-5 flex justify-center items-center bg-primary/70 hover:bg-primary-second/70 cursor-pointer w-5"
}, _hoisted_2$i = {
  key: 1,
  class: "BaseModal-Header"
}, _hoisted_3$e = { class: "overflow-y-auto flex-grow" }, _hoisted_4$b = {
  key: 2,
  class: "BaseModal-Footer"
}, _sfc_main$v = /* @__PURE__ */ defineComponent({
  __name: "BaseModal",
  props: {
    name: {
      type: String,
      required: !0
    }
  },
  setup(r) {
    const { modal: e } = useApplication(), t = r, s = e.isOpenedByName(t.name, new VueRefPatron()).ref(), o = [], i = () => {
      e.give("");
    };
    return (n, c) => (openBlock(), createBlock(Transition, { name: "fade" }, {
      default: withCtx(() => [
        unref(s) ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "absolute rounded-main overflow-y-auto flex justify-center items-center top-0 left-0 bg-black/10 z-20 h-full w-full",
          onClick: i
        }, [
          createElementVNode("div", {
            class: "w-full relative flex flex-col max-w-[800px] max-h-[90%] bg-white p-3",
            onClick: c[0] || (c[0] = withModifiers(() => {
            }, ["stop"]))
          }, [
            o.length > 1 ? (openBlock(), createElementBlock("div", _hoisted_1$q, " < ")) : createCommentVNode("", !0),
            createElementVNode("div", {
              title: "Закрыть",
              class: "e2e-modal-close absolute text-white right-0 top-0 -mr-5 flex justify-center items-center bg-danger/70 hover:bg-danger-second/70 cursor-pointer w-5",
              onClick: i
            }, " × "),
            n.$slots.header ? (openBlock(), createElementBlock("div", _hoisted_2$i, [
              renderSlot(n.$slots, "header")
            ])) : createCommentVNode("", !0),
            createElementVNode("div", _hoisted_3$e, [
              renderSlot(n.$slots, "default")
            ]),
            n.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_4$b, [
              renderSlot(n.$slots, "footer")
            ])) : createCommentVNode("", !0)
          ])
        ])) : createCommentVNode("", !0)
      ]),
      _: 3
    }));
  }
}), _hoisted_1$p = { class: "BaseTextarea" }, _hoisted_2$h = ["v-bind"], _sfc_main$u = /* @__PURE__ */ defineComponent({
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
    const o = useVModel(r, "modelValue", e);
    return (i, n) => (openBlock(), createElementBlock("div", _hoisted_1$p, [
      withDirectives(createElementVNode("textarea", {
        ref: "textarea",
        "v-bind": i.$attrs,
        "onUpdate:modelValue": n[0] || (n[0] = (c) => isRef(o) ? o.value = c : null),
        class: "rounded-main block w-full p-2 border min-h-[200px] border-solid border-body-dark"
      }, null, 8, _hoisted_2$h), [
        [vModelText, unref(o)]
      ])
    ]));
  }
});
class VueRefPatronDuplex {
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
    return this.basePatron.give(e), this.refWatcherCreated || (this.refWatcherCreated = !0, watch(
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
class Jsoned {
  constructor(e) {
    this.baseSource = e;
  }
  value(e) {
    return this.baseSource.value(
      new GuestCast(e, (t) => {
        give(JSON.stringify(t), e);
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
class SourceDynamic {
  constructor(e, t) {
    this.baseGuest = e, this.baseGuestAware = t;
  }
  value(e) {
    return this.baseGuestAware.value(e), this;
  }
  give(e) {
    return give(e, this.baseGuest), this;
  }
  pool() {
    throw Error("No pool in SourceDynamic");
  }
}
const _hoisted_1$o = { class: "AppPresets" }, _hoisted_2$g = /* @__PURE__ */ createElementVNode("div", { class: "text-md font-bold mb-2" }, "Экспорт\\Импорт текущей карты", -1), _hoisted_3$d = { class: "flex flex-col gap-2" }, _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "AppExport",
  setup(r) {
    const { mapFile: e, mapCurrent: t } = useApplication(), s = new SourceDynamic(
      t,
      new GuestAware((c) => {
        e.currentMap(new GuestObject(c));
      })
    ), o = new Jsoned(s), i = new VueRefPatronDuplex(new VueRefPatron(), o);
    o.value(i);
    const n = i.ref();
    return (c, a) => (openBlock(), createBlock(_sfc_main$v, { name: "export" }, {
      default: withCtx(() => [
        createElementVNode("div", _hoisted_1$o, [
          _hoisted_2$g,
          createElementVNode("div", _hoisted_3$d, [
            createVNode(_sfc_main$u, {
              modelValue: unref(n),
              "onUpdate:modelValue": a[0] || (a[0] = (h) => isRef(n) ? n.value = h : null)
            }, null, 8, ["modelValue"])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), _sfc_main$s = /* @__PURE__ */ defineComponent({
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
    return t.push(""), (s, o) => (openBlock(), createElementBlock("button", {
      type: "button",
      class: normalizeClass(t)
    }, [
      renderSlot(s.$slots, "default")
    ]));
  }
}), _hoisted_1$n = { key: 0 }, _hoisted_2$f = { class: "flex-grow overflow-y-auto" }, _hoisted_3$c = {
  key: 1,
  class: "flex gap-1"
}, _hoisted_4$a = {
  key: 2,
  class: "flex gap-1"
}, _sfc_main$r = /* @__PURE__ */ defineComponent({
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
    const t = r, s = e, o = computed(() => ["e2e-drawer-back absolute z-10 top-0 left-0 w-full h-full bg-black/50"]), i = {
      ltr: "top-0 left-0 w-[50%] max-w-[900px] ",
      rtl: "top-0 right-0 w-[50%] max-w-[900px] ",
      ttb: "top-0 right-0 left-0",
      btt: "top-auto h-[900px] max-h-[50%] bottom-0 right-0 left-0"
    }, { drawer: n, device: c } = useApplication(), a = () => {
      n.give(""), s("close");
    }, h = n.isOpenedByName(t.name, new VueRefPatron()).ref();
    c.value(new Patron((l) => {
      l.isMobile ? (i.ltr = i.ltr.replace("[50%]", "[100%]"), i.rtl = i.rtl.replace("[50%]", "[100%]")) : (i.ltr = i.ltr.replace("[100%]", "[50%]"), i.rtl = i.rtl.replace("[100%]", "[50%]"));
    }));
    const u = new VueRefPatron();
    return c.value(u), (l, d) => (openBlock(), createBlock(Transition, { name: "fade" }, {
      default: withCtx(() => [
        unref(h) ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(o.value),
          onClick: a
        }, [
          createElementVNode("div", {
            class: normalizeClass(["absolute bg-white h-full p-3 flex flex-col overflow-hidden", i[r.direction]]),
            onClick: d[1] || (d[1] = withModifiers(() => {
            }, ["stop"]))
          }, [
            l.$slots.header ? (openBlock(), createElementBlock("div", _hoisted_1$n, [
              renderSlot(l.$slots, "header", { class: "BaseDrawer-Header" })
            ])) : createCommentVNode("", !0),
            createElementVNode("div", _hoisted_2$f, [
              renderSlot(l.$slots, "default")
            ]),
            l.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_3$c, [
              renderSlot(l.$slots, "footer")
            ])) : createCommentVNode("", !0),
            unref(u).value.isMobile ? (openBlock(), createElementBlock("div", _hoisted_4$a, [
              createVNode(_sfc_main$s, {
                type: "primary",
                class: "text-white w-full block mt-2",
                onClick: d[0] || (d[0] = (m) => unref(n).give(""))
              }, {
                default: withCtx(() => [
                  createTextVNode(" Закрыть ")
                ]),
                _: 1
              })
            ])) : createCommentVNode("", !0)
          ], 2)
        ], 2)) : createCommentVNode("", !0)
      ]),
      _: 3
    }));
  }
}), _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "BaseIcon",
  props: {
    icon: {
      type: String
    }
  },
  setup(r) {
    const e = {
      "fa-bars": faBars,
      "fa-bars-staggered": faBarsStaggered,
      "fa-text-width": faTextWidth,
      "fa-search": faSearch,
      "fa-history": faHistory,
      "fa-plus-square": faPlusSquare,
      "fa-cog": faCog,
      "fa-file-text": faFileText,
      "fa-rotate-left": faRotateLeft,
      "fa-rotate-right": faRotateRight,
      "fa-map": faMap,
      "fa-close": faClose,
      "fa-arrow-left": faArrowLeft,
      "fa-arrow-right": faArrowRight,
      "fa-arrow-down": faArrowDown,
      "fa-arrow-up": faArrowUp,
      "fa-share-nodes": faShareNodes
    };
    return (t, s) => (openBlock(), createBlock(unref(FontAwesomeIcon), {
      icon: e[r.icon]
    }, null, 8, ["icon"]));
  }
}), _hoisted_1$m = /* @__PURE__ */ createElementVNode("h2", { class: "text-lg font-bold" }, " Карты в файле ", -1), _hoisted_2$e = ["onClick"], _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "AppFileMaps",
  setup(r) {
    const {
      mapFile: e,
      mapCurrentID: t,
      drawer: s,
      mapRemoved: o
    } = useApplication(), i = e.mapFile(new VueRefPatron()).ref(), n = t.id(new VueRefPatron()).ref(), c = (a) => {
      confirm("Вы уверены?") && o.give(a);
    };
    return (a, h) => (openBlock(), createBlock(_sfc_main$r, {
      direction: "rtl",
      name: "fileMaps"
    }, {
      header: withCtx(() => [
        _hoisted_1$m
      ]),
      default: withCtx(() => [
        createElementVNode("div", null, [
          (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(i), (u, l) => (openBlock(), createElementBlock("div", {
            key: l,
            class: "flex items-center gap-2"
          }, [
            createElementVNode("a", {
              href: "#",
              class: normalizeClass({ "font-bold": unref(n) === l }),
              onClick: withModifiers((d) => {
                unref(t).give(l), unref(s).give("");
              }, ["prevent"])
            }, toDisplayString(u.settings.title), 11, _hoisted_2$e),
            createVNode(_sfc_main$q, {
              onClick: (d) => c(l),
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
}), _hoisted_1$l = { class: "AppMenuObject" }, _hoisted_2$d = {
  key: 0,
  class: "AppMenuObject-Empty"
}, _hoisted_3$b = {
  key: 1,
  class: "flex flex-col gap-1"
}, _hoisted_4$9 = ["onClick"], _hoisted_5$6 = ["innerHTML"], _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "AppMenuObject",
  setup(r) {
    const {
      controlCombo: e,
      drawer: t,
      menu: s,
      stagePosition: o
    } = useApplication(), { guest: i, patron: n } = useFactories(), c = s.menuObjects(new VueRefPatron()).ref();
    return e.happened(
      "KeyM",
      n.create(i.create(() => {
        t.give("menu");
      }))
    ), (a, h) => (openBlock(), createBlock(_sfc_main$r, {
      direction: "rtl",
      name: "menu"
    }, {
      default: withCtx(() => [
        createElementVNode("div", _hoisted_1$l, [
          unref(c).length ? (openBlock(), createElementBlock("div", _hoisted_3$b, [
            (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(c), (u) => (openBlock(), createElementBlock("a", {
              key: u.id,
              class: "AppMenuObject-Item",
              href: "#",
              onClick: withModifiers((l) => {
                unref(o).give(u), unref(t).give("");
              }, ["prevent"])
            }, [
              createElementVNode("span", {
                innerHTML: u.additionalName ? u.additionalName : u.name
              }, null, 8, _hoisted_5$6)
            ], 8, _hoisted_4$9))), 128))
          ])) : (openBlock(), createElementBlock("div", _hoisted_2$d, toDisplayString(a.$t("appMenuObject.noItems")), 1))
        ])
      ]),
      _: 1
    }));
  }
}), _hoisted_1$k = { class: "AppPresets" }, _hoisted_2$c = /* @__PURE__ */ createElementVNode("div", { class: "text-md font-bold mb-2" }, "Общие", -1), _hoisted_3$a = { class: "flex flex-col gap-2" }, _hoisted_4$8 = { class: "text-md font-bold mb-1" }, _hoisted_5$5 = { class: "flex gap-2 flex-wrap items-end" }, _hoisted_6$4 = { class: "AppTypesParent-ItemTitle" }, _hoisted_7$4 = ["innerHTML"], _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "AppPresets",
  setup(r) {
    const {
      svgMapTypeImage: e
    } = useFactories(), { mapType: t, settings: s } = useApplication(), o = new VueRefPatron();
    s.value(o);
    const i = computed(
      () => Object.fromEntries(
        Object.entries(o.value.presets).map(
          ([n, c]) => [
            n,
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
    return (n, c) => (openBlock(), createBlock(_sfc_main$v, { name: "presets" }, {
      default: withCtx(() => [
        createElementVNode("div", _hoisted_1$k, [
          _hoisted_2$c,
          createElementVNode("div", _hoisted_3$a, [
            (openBlock(!0), createElementBlock(Fragment, null, renderList(i.value, (a, h) => (openBlock(), createElementBlock("div", { key: h }, [
              createElementVNode("h3", _hoisted_4$8, toDisplayString(h), 1),
              createElementVNode("div", _hoisted_5$5, [
                (openBlock(!0), createElementBlock(Fragment, null, renderList(a, (u) => (openBlock(), createElementBlock("div", {
                  key: u.preset.name,
                  class: "flex flex-col gap-2"
                }, [
                  createElementVNode("div", _hoisted_6$4, toDisplayString(u.preset.name), 1),
                  createElementVNode("div", {
                    class: "AppTypesParent-ItemImage",
                    innerHTML: u.image,
                    style: normalizeStyle(`width:${u.preset.width}px;height:${u.preset.height}px`)
                  }, null, 12, _hoisted_7$4),
                  createVNode(_sfc_main$s, {
                    class: "AppTypesParent-ItemButton e2e-add-preset-type",
                    type: "success",
                    size: "sm",
                    onClick: (l) => unref(t).give({ name: u.preset.name, type: u.preset })
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(n.$t("general.addToMap")), 1)
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
}), _sfc_main$m = /* @__PURE__ */ defineComponent({
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
    const t = r, s = e, o = ref(null);
    watch(
      o,
      debounce$2(() => {
        t.autofocus && o.value.focus();
      }, 500)
    );
    const i = useVModel(t, "modelValue", s);
    return (n, c) => withDirectives((openBlock(), createElementBlock("input", {
      ref_key: "input",
      ref: o,
      "onUpdate:modelValue": c[0] || (c[0] = (a) => isRef(i) ? i.value = a : null),
      class: "block rounded-main w-full p-2 border border-solid border-body-dark",
      type: "text"
    }, null, 512)), [
      [vModelText, unref(i)]
    ]);
  }
});
class VueSource {
  constructor(e) {
    b(this, "pool", new PatronPool(this));
    this.refSource = e, watch(
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
    return this.refSource.value && give(this.refSource.value, e), this.pool.add(e), this;
  }
}
const _hoisted_1$j = { class: "AppSearch" }, _hoisted_2$b = {
  key: 0,
  class: "AppSearch-Items"
}, _hoisted_3$9 = ["onClick"], _hoisted_4$7 = ["innerHTML"], _hoisted_5$4 = ["innerHTML"], _hoisted_6$3 = ["innerHTML"], _hoisted_7$3 = { key: 1 }, _hoisted_8$3 = { key: 2 }, _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "AppSearch",
  setup(r) {
    const {
      objectsMatchedToQuery: e,
      controlCombo: t,
      modal: s,
      stagePosition: o
    } = useApplication(), { guest: i, patron: n } = useFactories(), c = ref(), a = browserExports.debug("app:AppSearch");
    s.isOpenedByName(
      "search",
      n.create(i.create((l) => {
        setTimeout(() => {
          l && c.value && (a("search is opened", l), c.value.$el.focus());
        }, 500);
      }))
    );
    const h = ref(""), u = e.objects(
      new VueSource(h),
      new VueRefPatron([])
    ).ref();
    return t.happened(
      "KeyF",
      n.create(i.create(() => {
        s.give("search");
      }))
    ), (l, d) => (openBlock(), createBlock(_sfc_main$v, { name: "search" }, {
      default: withCtx(() => [
        createElementVNode("div", _hoisted_1$j, [
          createVNode(_sfc_main$m, {
            ref_key: "inputRef",
            ref: c,
            modelValue: h.value,
            "onUpdate:modelValue": d[0] || (d[0] = (m) => h.value = m),
            class: "mb-2 e2e-query-input",
            placeholder: l.$t("general.specifyQuery")
          }, null, 8, ["modelValue", "placeholder"]),
          unref(u).length ? (openBlock(), createElementBlock("div", _hoisted_2$b, [
            (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(u), (m) => (openBlock(), createElementBlock("div", {
              key: m.name,
              class: "cursor-pointer",
              onClick: withModifiers((p) => {
                unref(o).give(m), unref(s).give("");
              }, ["prevent"])
            }, [
              createElementVNode("b", {
                class: "AppSearch-ItemName",
                innerHTML: m.name
              }, null, 8, _hoisted_4$7),
              m.additionalName ? (openBlock(), createElementBlock("b", {
                key: 0,
                class: "AppSearch-ItemName",
                innerHTML: m.additionalName
              }, null, 8, _hoisted_5$4)) : createCommentVNode("", !0),
              m.additionalFields ? (openBlock(), createElementBlock("div", {
                key: 1,
                innerHTML: Object.values(m.additionalFields).join(" ")
              }, null, 8, _hoisted_6$3)) : createCommentVNode("", !0)
            ], 8, _hoisted_3$9))), 128))
          ])) : h.value ? (openBlock(), createElementBlock("div", _hoisted_7$3, toDisplayString(l.$t("general.noResults")), 1)) : (openBlock(), createElementBlock("div", _hoisted_8$3, toDisplayString(l.$t("general.resultsWillBeHere")), 1))
        ])
      ]),
      _: 1
    }));
  }
}), _hoisted_1$i = { class: "AppTypes" }, _hoisted_2$a = /* @__PURE__ */ createElementVNode("div", { class: "text-md font-bold mb-2" }, "Родительские типы", -1), _hoisted_3$8 = { class: "flex gap-2 items-end" }, _hoisted_4$6 = { class: "AppTypesParent-ItemTitle" }, _hoisted_5$3 = ["innerHTML"], _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "AppTypesParent",
  setup(r) {
    const { parentTypes: e, mapType: t } = useApplication(), { svgMapTypeImage: s } = useFactories(), o = e.types(new VueRefPatron()).ref(), i = computed(() => {
      var n;
      return (n = o.value) == null ? void 0 : n.map((c) => ({
        type: c,
        image: s.create(c).markup()
      })).sort((c, a) => +(c.type.name >= a.type.name));
    });
    return (n, c) => (openBlock(), createBlock(_sfc_main$v, { name: "parentTypes" }, {
      default: withCtx(() => [
        createElementVNode("div", _hoisted_1$i, [
          _hoisted_2$a,
          createElementVNode("div", _hoisted_3$8, [
            (openBlock(!0), createElementBlock(Fragment, null, renderList(i.value, (a) => (openBlock(), createElementBlock("div", {
              key: a.type.name,
              class: "flex flex-col gap-2"
            }, [
              createElementVNode("div", _hoisted_4$6, toDisplayString(a.type.name), 1),
              createElementVNode("div", {
                class: "AppTypesParent-ItemImage",
                innerHTML: a.image,
                style: normalizeStyle(`width:${a.type.width}px;height:${a.type.height}px`)
              }, null, 12, _hoisted_5$3),
              createVNode(_sfc_main$s, {
                class: "AppTypesParent-ItemButton e2e-add-preset-type",
                type: "success",
                size: "sm",
                onClick: (h) => unref(t).give({ name: a.type.name, type: a.type })
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(n.$t("general.addToMap")), 1)
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
class VueComputedPatron {
  constructor(e, t = void 0) {
    b(this, "innerRef");
    this.executor = e, this.innerRef = ref(t);
  }
  ref() {
    return this.executor(this.innerRef), this.innerRef;
  }
}
const _hoisted_1$h = { class: "flex gap-2" }, _sfc_main$j = /* @__PURE__ */ defineComponent({
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
    const o = useVModel(r, "modelValue", e);
    return (i, n) => (openBlock(), createElementBlock("label", _hoisted_1$h, [
      withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": n[0] || (n[0] = (c) => isRef(o) ? o.value = c : null),
        type: "checkbox"
      }, null, 512), [
        [vModelCheckbox, unref(o)]
      ]),
      i.$slots.default ? renderSlot(i.$slots, "default", { key: 0 }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        createTextVNode(toDisplayString(r.label), 1)
      ], 64))
    ]));
  }
}), _export_sfc = (r, e) => {
  const t = r.__vccOpts || r;
  for (const [s, o] of e)
    t[s] = o;
  return t;
}, _sfc_main$i = {}, _hoisted_1$g = { class: "text-sm font-bold" };
function _sfc_render$3(r, e) {
  return openBlock(), createElementBlock("div", _hoisted_1$g, [
    renderSlot(r.$slots, "default")
  ]);
}
const BaseInputTitle = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$3]]), _sfc_main$h = {}, _hoisted_1$f = { class: "mb-2" };
function _sfc_render$2(r, e) {
  return openBlock(), createElementBlock("div", _hoisted_1$f, [
    renderSlot(r.$slots, "default")
  ]);
}
const BaseInputRow = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$2]]), _hoisted_1$e = { class: "rounded-main p-2 border border-solid border-body-dark" }, _hoisted_2$9 = { class: "flex gap-2 p-2 bg-white border border-solid border-body-dark rounded-main" }, _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "BaseEditor",
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(r, { emit: e }) {
    const t = r, s = e, o = useEditor({
      content: t.modelValue,
      extensions: [
        StarterKit
      ],
      onUpdate: () => {
        o.value && s("update:modelValue", o.value.getHTML());
      }
    });
    return onBeforeUnmount(() => {
      var i;
      (i = o.value) == null || i.destroy();
    }), watch(() => t.modelValue, (i) => {
      !o.value || o.value.getHTML() === i || o.value.commands.setContent(i, !1);
    }), (i, n) => (openBlock(), createElementBlock("div", _hoisted_1$e, [
      createVNode(unref(EditorContent), { editor: unref(o) }, null, 8, ["editor"]),
      unref(o) ? (openBlock(), createBlock(unref(BubbleMenu), {
        key: 0,
        editor: unref(o),
        "tippy-options": { duration: 100 }
      }, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_2$9, [
            createElementVNode("button", {
              onClick: n[0] || (n[0] = (c) => unref(o).chain().focus().toggleBold().run()),
              class: normalizeClass({ "font-bold": unref(o).isActive("bold") })
            }, " bold ", 2),
            createElementVNode("button", {
              onClick: n[1] || (n[1] = (c) => unref(o).chain().focus().toggleItalic().run()),
              class: normalizeClass({ "font-bold": unref(o).isActive("italic") })
            }, " italic ", 2),
            createElementVNode("button", {
              onClick: n[2] || (n[2] = (c) => unref(o).chain().focus().toggleStrike().run()),
              class: normalizeClass({ "font-bold": unref(o).isActive("strike") })
            }, " strike ", 2)
          ])
        ]),
        _: 1
      }, 8, ["editor"])) : createCommentVNode("", !0)
    ]));
  }
}), _hoisted_1$d = ["value"], _sfc_main$f = /* @__PURE__ */ defineComponent({
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
    const t = r, o = useVModel(t, "modelValue", e);
    return (i, n) => withDirectives((openBlock(), createElementBlock("select", {
      label: "select",
      "onUpdate:modelValue": n[0] || (n[0] = (c) => isRef(o) ? o.value = c : null),
      class: "block bg-white rounded-main w-full p-2 border border-solid border-body-dark"
    }, [
      (openBlock(!0), createElementBlock(Fragment, null, renderList(t.items, (c) => (openBlock(), createElementBlock("option", {
        key: c[t.optionId],
        value: c[t.optionId]
      }, toDisplayString(c[t.optionLabel]), 9, _hoisted_1$d))), 128))
    ], 512)), [
      [vModelSelect, unref(o)]
    ]);
  }
}), _hoisted_1$c = { class: "text-lg font-bold" }, _hoisted_2$8 = {
  key: 0,
  class: "flex gap-2 items-center"
}, _hoisted_3$7 = {
  key: 1,
  class: "flex gap-2 mt-2"
}, _hoisted_4$5 = { key: 0 }, _hoisted_5$2 = { key: 1 }, _hoisted_6$2 = {
  key: 0,
  class: "flex flex-col gap-2"
}, _hoisted_7$2 = { class: "FormObject-Inner" }, _hoisted_8$2 = { class: "FormObject-Row" }, _hoisted_9$2 = { class: "FormObject-Row" }, _hoisted_10$1 = { class: "FormObject-Row" }, _hoisted_11$1 = { class: "my-2" }, _hoisted_12$1 = { class: "FormObject-Title" }, _hoisted_13$1 = { class: "FormObject-Row" }, _hoisted_14$1 = { class: "FormObject-Title" }, _hoisted_15$1 = { class: "FormObject-Row" }, _hoisted_16$1 = {
  key: 0,
  class: "FormObject-ArrowName"
}, _hoisted_17$1 = { class: "py-3 flex gap-1" }, _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "FormObject",
  setup(r) {
    const e = debug("FormObject"), {
      mapObjectCurrent: t,
      mapFile: s,
      mapObject: o,
      mapCurrent: i,
      drawer: n,
      mapObjectRemoved: c,
      mapObjectRelationRemoved: a,
      mapObjectUrl: h,
      controlCombo: u
    } = useApplication(), {
      patron: l,
      chain: d,
      guest: m
    } = useFactories(), p = new VueComputedPatron(() => {
      const _ = d.create();
      t.objectId(l.create(_.guestKey("objectId"))), s.currentMap(l.create(_.guestKey("map"))), _.value(l.create(
        m.create(({ map: w, objectId: A }) => {
          e("object opened", A), p.value = w.objects[A];
        })
      ));
    }).ref(), g = i.types(new VueRefPatron()).ref(), f = s.currentMap(new VueRefPatron()).ref(), v = new VueSource(p), y = h.url(v, new VueRefPatron()).ref(), x = () => {
      t.give(""), n.give("");
    }, $ = () => {
      c.give(p.value), x();
    }, F = () => {
      o.give({
        ...p.value,
        outlink: p.value.outlink || y.value
      }), x();
    }, C = (_) => {
      a.give({
        index: _,
        object: p.value
      });
    };
    u.happenedConditional(
      "KeyS",
      n.openedByName("object"),
      l.create(m.create(F))
    );
    const k = ref(!0);
    return (_, w) => (openBlock(), createBlock(_sfc_main$r, {
      name: "object",
      onClose: x
    }, {
      header: withCtx(() => [
        createElementVNode("h2", _hoisted_1$c, toDisplayString(_.$t("general.mapObject")), 1),
        unref(p) ? (openBlock(), createElementBlock("small", _hoisted_2$8, [
          createElementVNode("span", null, " ID #" + toDisplayString(unref(p).id), 1)
        ])) : createCommentVNode("", !0),
        unref(p) ? (openBlock(), createElementBlock("div", _hoisted_3$7, [
          unref(p).createTimestamp ? (openBlock(), createElementBlock("div", _hoisted_4$5, " Создан: " + toDisplayString(new Date(unref(p).createTimestamp).toLocaleString()), 1)) : createCommentVNode("", !0),
          unref(p).changeTimestamp ? (openBlock(), createElementBlock("div", _hoisted_5$2, " Изменен: " + toDisplayString(new Date(unref(p).changeTimestamp).toLocaleString()), 1)) : createCommentVNode("", !0)
        ])) : createCommentVNode("", !0)
      ]),
      footer: withCtx(() => [
        createElementVNode("div", _hoisted_17$1, [
          createVNode(_sfc_main$s, {
            type: "success",
            onClick: F
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_.$t("general.save")), 1)
            ]),
            _: 1
          }),
          createVNode(_sfc_main$s, {
            type: "danger",
            onClick: $
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_.$t("general.delete")), 1)
            ]),
            _: 1
          }),
          createVNode(_sfc_main$s, { onClick: x }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: withCtx(() => [
        unref(p) ? (openBlock(), createElementBlock("div", _hoisted_6$2, [
          createElementVNode("div", _hoisted_7$2, [
            createElementVNode("div", _hoisted_8$2, [
              createVNode(_sfc_main$j, {
                modelValue: unref(p).linked,
                "onUpdate:modelValue": w[0] || (w[0] = (A) => unref(p).linked = A),
                label: _.$t("general.nameAsLink")
              }, null, 8, ["modelValue", "label"])
            ]),
            unref(p).linked ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createVNode(BaseInputTitle, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_.$t("general.outerLink")), 1)
                ]),
                _: 1
              }),
              createElementVNode("div", _hoisted_9$2, [
                createVNode(_sfc_main$m, {
                  "model-value": unref(p).outlink || unref(y),
                  "onUpdate:modelValue": w[1] || (w[1] = (A) => unref(p).outlink = A)
                }, null, 8, ["model-value"])
              ]),
              createElementVNode("div", _hoisted_10$1, [
                createVNode(_sfc_main$j, {
                  modelValue: unref(p).targetBlank,
                  "onUpdate:modelValue": w[2] || (w[2] = (A) => unref(p).targetBlank = A),
                  label: _.$t("general.inNewTab")
                }, null, 8, ["modelValue", "label"])
              ])
            ], 64)) : createCommentVNode("", !0),
            (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(p).additionalFields, (A, S) => (openBlock(), createBlock(BaseInputRow, {
              class: "mb-2",
              key: S
            }, {
              default: withCtx(() => [
                createVNode(BaseInputTitle, { class: "mb-1" }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(S), 1)
                  ]),
                  _: 2
                }, 1024),
                k.value ? (openBlock(), createBlock(_sfc_main$g, {
                  key: 0,
                  modelValue: unref(p).additionalFields[S],
                  "onUpdate:modelValue": (B) => unref(p).additionalFields[S] = B
                }, null, 8, ["modelValue", "onUpdate:modelValue"])) : (openBlock(), createBlock(_sfc_main$u, {
                  key: 1,
                  modelValue: unref(p).additionalFields[S],
                  "onUpdate:modelValue": (B) => unref(p).additionalFields[S] = B
                }, null, 8, ["modelValue", "onUpdate:modelValue"])),
                createElementVNode("div", null, [
                  createElementVNode("a", {
                    href: "#",
                    onClick: w[3] || (w[3] = (B) => k.value = !0)
                  }, "Editor"),
                  createTextVNode(" | "),
                  createElementVNode("a", {
                    href: "#",
                    onClick: w[4] || (w[4] = (B) => k.value = !1)
                  }, "HTML")
                ])
              ]),
              _: 2
            }, 1024))), 128)),
            createVNode(BaseInputRow, null, {
              default: withCtx(() => [
                createVNode(BaseInputTitle, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_.$t("general.topName")), 1)
                  ]),
                  _: 1
                }),
                createVNode(_sfc_main$g, {
                  modelValue: unref(p).additionalName,
                  "onUpdate:modelValue": w[5] || (w[5] = (A) => unref(p).additionalName = A)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(BaseInputRow, null, {
              default: withCtx(() => [
                createVNode(BaseInputTitle, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_.$t("general.bottomName")), 1)
                  ]),
                  _: 1
                }),
                createVNode(_sfc_main$g, {
                  modelValue: unref(p).name,
                  "onUpdate:modelValue": w[6] || (w[6] = (A) => unref(p).name = A)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(BaseInputRow, null, {
              default: withCtx(() => [
                createVNode(BaseInputTitle, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_.$t("general.description")), 1)
                  ]),
                  _: 1
                }),
                createVNode(_sfc_main$g, {
                  modelValue: unref(p).description,
                  "onUpdate:modelValue": w[7] || (w[7] = (A) => unref(p).description = A)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(BaseInputRow, null, {
              default: withCtx(() => [
                createVNode(BaseInputTitle, null, {
                  default: withCtx(() => [
                    createTextVNode(" Z-Index ")
                  ]),
                  _: 1
                }),
                createVNode(_sfc_main$m, {
                  modelValue: unref(p).zindex,
                  "onUpdate:modelValue": w[8] || (w[8] = (A) => unref(p).zindex = A),
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(BaseInputRow, null, {
              default: withCtx(() => [
                createVNode(BaseInputTitle, null, {
                  default: withCtx(() => [
                    createTextVNode(" Width ")
                  ]),
                  _: 1
                }),
                createVNode(_sfc_main$m, {
                  modelValue: unref(p).width,
                  "onUpdate:modelValue": w[9] || (w[9] = (A) => unref(p).width = A),
                  step: "20",
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(BaseInputRow, null, {
              default: withCtx(() => [
                createVNode(BaseInputTitle, null, {
                  default: withCtx(() => [
                    createTextVNode(" Height ")
                  ]),
                  _: 1
                }),
                createVNode(_sfc_main$m, {
                  modelValue: unref(p).height,
                  "onUpdate:modelValue": w[10] || (w[10] = (A) => unref(p).height = A),
                  step: "20",
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(BaseInputRow, null, {
              default: withCtx(() => [
                createVNode(BaseInputTitle, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_.$t("general.objectType")), 1)
                  ]),
                  _: 1
                }),
                createVNode(_sfc_main$f, {
                  modelValue: unref(p).type,
                  "onUpdate:modelValue": w[11] || (w[11] = (A) => unref(p).type = A),
                  items: unref(g),
                  "option-id": "id",
                  "option-label": "name"
                }, null, 8, ["modelValue", "items"])
              ]),
              _: 1
            }),
            createElementVNode("div", _hoisted_11$1, [
              createVNode(_sfc_main$j, {
                modelValue: unref(p).inMenu,
                "onUpdate:modelValue": w[12] || (w[12] = (A) => unref(p).inMenu = A),
                label: _.$t("general.useInMenu")
              }, null, 8, ["modelValue", "label"])
            ]),
            unref(p).inMenu ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createElementVNode("div", _hoisted_12$1, toDisplayString(_.$t("general.menuOrder")), 1),
              createElementVNode("div", _hoisted_13$1, [
                createVNode(_sfc_main$m, {
                  modelValue: unref(p).menuOrder,
                  "onUpdate:modelValue": w[13] || (w[13] = (A) => unref(p).menuOrder = A),
                  type: "number"
                }, null, 8, ["modelValue"])
              ])
            ], 64)) : createCommentVNode("", !0),
            unref(p).arrows && unref(p).arrows.length ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
              createElementVNode("div", _hoisted_14$1, toDisplayString(_.$t("general.relations")), 1),
              createElementVNode("div", _hoisted_15$1, [
                (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(p).arrows, (A, S) => {
                  var B;
                  return openBlock(), createElementBlock("div", {
                    key: A.id,
                    class: "FormObject-Arrow"
                  }, [
                    (B = unref(f)) != null && B.objects[A.id] ? (openBlock(), createElementBlock("span", _hoisted_16$1, " #" + toDisplayString(S + 1) + " " + toDisplayString(unref(f).objects[A.id].name), 1)) : createCommentVNode("", !0),
                    createVNode(_sfc_main$s, {
                      class: "FormObject-ArrowButton",
                      type: "danger",
                      size: "sm",
                      onClick: (T) => C(S)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_.$t("general.delete")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]);
                }), 128))
              ])
            ], 64)) : createCommentVNode("", !0)
          ])
        ])) : createCommentVNode("", !0)
      ]),
      _: 1
    }));
  }
}), _hoisted_1$b = { class: "text-lg font-bold" }, _hoisted_2$7 = {
  key: 0,
  class: "flex flex-col"
}, _hoisted_3$6 = { class: "flex justify-end pt-4 gap-2" }, _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "FormType",
  setup(r) {
    const {
      mapTypeCurrent: e,
      mapFile: t,
      mapType: s,
      modal: o,
      controlCombo: i
    } = useApplication(), { patron: n, chain: c, guest: a } = useFactories();
    e.typeId(
      n.create(a.create((p) => {
        p && o.give("type");
      }))
    );
    const h = ref(""), u = c.create(), l = new VueComputedPatron(() => {
      e.typeId(n.create(u.guestKey("typeId"))), t.currentMap(n.create(u.guestKey("map"))), u.value(n.create(
        a.create(({ map: p, typeId: g }) => {
          var f;
          l.value = p.types[g], h.value = (f = l.value) == null ? void 0 : f.name;
        })
      ));
    }).ref(), d = () => {
      e.give(""), o.give(""), u.guestKey("typeId").give("");
    }, m = () => {
      s.give({
        name: h.value,
        type: l.value
      }), d();
    };
    return i.happenedConditional(
      "KeyS",
      o.openedByName("type"),
      n.create(a.create(m))
    ), (p, g) => (openBlock(), createBlock(_sfc_main$v, { name: "type" }, {
      header: withCtx(() => [
        createElementVNode("h2", _hoisted_1$b, toDisplayString(p.$t("general.mapType")), 1)
      ]),
      footer: withCtx(() => [
        createElementVNode("div", _hoisted_3$6, [
          createVNode(_sfc_main$s, {
            type: "success",
            onClick: m
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(p.$t("general.save")), 1)
            ]),
            _: 1
          }),
          createVNode(_sfc_main$s, { onClick: d }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(p.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: withCtx(() => [
        unref(l) ? (openBlock(), createElementBlock("div", _hoisted_2$7, [
          createVNode(BaseInputRow, null, {
            default: withCtx(() => [
              createVNode(BaseInputTitle, null, {
                default: withCtx(() => [
                  createTextVNode(" Название типа ")
                ]),
                _: 1
              }),
              createVNode(_sfc_main$m, {
                modelValue: unref(l).name,
                "onUpdate:modelValue": g[0] || (g[0] = (f) => unref(l).name = f)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(BaseInputRow, null, {
            default: withCtx(() => [
              createVNode(BaseInputTitle, null, {
                default: withCtx(() => [
                  createTextVNode(" SVG ")
                ]),
                _: 1
              }),
              createVNode(_sfc_main$u, {
                modelValue: unref(l).svg,
                "onUpdate:modelValue": g[1] || (g[1] = (f) => unref(l).svg = f)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(BaseInputRow, null, {
            default: withCtx(() => [
              createVNode(BaseInputTitle, null, {
                default: withCtx(() => [
                  createTextVNode(" Ширина ")
                ]),
                _: 1
              }),
              createVNode(_sfc_main$m, {
                modelValue: unref(l).width,
                "onUpdate:modelValue": g[2] || (g[2] = (f) => unref(l).width = f)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(BaseInputRow, null, {
            default: withCtx(() => [
              createVNode(BaseInputTitle, null, {
                default: withCtx(() => [
                  createTextVNode(" Высота ")
                ]),
                _: 1
              }),
              createVNode(_sfc_main$m, {
                modelValue: unref(l).height,
                "onUpdate:modelValue": g[3] || (g[3] = (f) => unref(l).height = f)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          })
        ])) : createCommentVNode("", !0)
      ]),
      _: 1
    }));
  }
}), localDebug$3 = browserExports.debug("MapObjectsWithTemplates");
class MapObjectsWithTemplates {
  constructor(e, t, s) {
    this.mapObjects = e, this.map = t, this.factories = s;
  }
  objects(e) {
    const t = this.factories.chain.create();
    return this.map.types(this.factories.guestCast.create(e, t.guestKey("types"))), this.mapObjects.objects(this.factories.guestCast.create(e, t.guestKey("objects"))), t.value(
      this.factories.guestInTheMiddle.create(e, ({ types: s, objects: o }) => {
        localDebug$3("visible objects", o);
        const i = o.map((n) => {
          const c = s.find((h) => String(h.id) === String(n.type));
          if (localDebug$3("check type existed", c), !c)
            return {
              obj: n,
              template: ""
            };
          let { svg: a } = c;
          return localDebug$3("type svg", a), n.additionalFields && Object.entries(n.additionalFields).forEach(([h, u]) => {
            a = a.replaceAll(`\${${h}}`, u);
          }), ["width", "height"].forEach((h) => {
            a = a.replaceAll(`\${${h}}`, n[h]);
          }), {
            obj: n,
            template: a
          };
        });
        e.give(i);
      })
    ), e;
  }
}
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "BaseNotify",
  setup(r) {
    const { notification: e } = useApplication(), t = e.message(new VueRefPatron()).ref();
    return (s, o) => unref(t) && unref(t).text !== "hide" ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(["inline font-bold", `text-${unref(t).type}-second`])
    }, toDisplayString(unref(t).text), 3)) : createCommentVNode("", !0);
  }
}), _hoisted_1$a = { class: "relative" }, _hoisted_2$6 = { class: "absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-1" }, _hoisted_3$5 = { class: "text-sm z-10 p-2 absolute bottom-0 left-5" }, _hoisted_4$4 = /* @__PURE__ */ createStaticVNode('<div class="absolute bottom-3 shadow-standard-second shadow-md drop-shadow right-3 z-10"><div class="grid-example grid grid-rows-2 grid-cols-2 bg-standard-second border border-standard-second gap-[1px] border-t-0 border-l-0"><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div></div></div><div class="absolute z-30 top-0 left-0 h-[18px] w-[22px] bg-white"></div>', 2), _hoisted_6$1 = ["title"], _hoisted_7$1 = { class: "font-bold" }, _hoisted_8$1 = ["title"], _hoisted_9$1 = { class: "font-bold" }, _hoisted_10 = ["title"], _hoisted_11 = { class: "font-bold" }, _hoisted_12 = ["title"], _hoisted_13 = { class: "font-bold" }, _hoisted_14 = ["data-object-id"], _hoisted_15 = { class: "absolute bottom-[100%] left-[50%] translate-x-[-50%] text-center pb-2 pointer-events-auto text-sm w-[300px]" }, _hoisted_16 = ["innerHTML", "onClick"], _hoisted_17 = ["innerHTML"], _hoisted_18 = ["data-object-id", "innerHTML"], _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "TheEditor",
  setup(__props) {
    const {
      canvas,
      mapObjectsVisible,
      mapCurrent,
      konvaLayer,
      fps,
      mapCurrentID,
      mapObjectUrl,
      stageSize,
      objectsOutsideScreen,
      stagePositionByObjectId,
      mapCurrentSource
    } = useApplication(), factories = useFactories(), fpsValue = fps.value(new VueRefPatron()).ref(), objectsWithTemplates = new MapObjectsWithTemplates(
      mapObjectsVisible,
      mapCurrent,
      factories
    ), objects = objectsWithTemplates.objects(new VueRefPatron([])).ref(), layerSize = stageSize.value(new VueRefPatron()).ref(), layerPosition = konvaLayer.position(new VueRefPatron()).ref(), layerWidth = computed(() => {
      var r;
      return (r = layerSize.value) == null ? void 0 : r.width;
    }), layerWidthSource = new VueSource(layerWidth), chunks = factories.numberChunks.create(10, layerWidthSource).chunks(new VueRefPatron()).ref(), canvasWrapper = ref();
    onMounted(() => {
      canvas.give(canvasWrapper.value);
    });
    const onObjectClick = (r) => {
      mapObjectUrl.open(r, factories.guest.create((e) => {
        mapCurrentID.give(e);
      }));
    }, hiddenOnLeftObjects = objectsOutsideScreen.count(
      { axis: "x", direction: "negative" },
      new VueRefPatron()
    ).ref(), hiddenOnRightObjects = objectsOutsideScreen.count(
      { axis: "x", direction: "positive" },
      new VueRefPatron()
    ).ref(), hiddenOnTopObjects = objectsOutsideScreen.count(
      { axis: "y", direction: "negative" },
      new VueRefPatron()
    ).ref(), hiddenOnBottomObjects = objectsOutsideScreen.count(
      { axis: "y", direction: "positive" },
      new VueRefPatron()
    ).ref(), moveToObjectId = stagePositionByObjectId.move.bind(stagePositionByObjectId, mapCurrentSource);
    return window.doJS = () => {
      const html = objects.value.map((r) => r.template).join(""), regex = /<script\b[^>]*>([\s\S]*?)<\/script>/g, scripts = [];
      let match;
      for (; (match = regex.exec(html)) !== null; )
        scripts.push(match[1]);
      eval(scripts.join(""));
    }, (r, e) => {
      var t, s, o, i, n, c, a, h, u, l, d, m;
      return openBlock(), createElementBlock("div", _hoisted_1$a, [
        createElementVNode("div", _hoisted_2$6, [
          createElementVNode("div", _hoisted_3$5, [
            createTextVNode(" Видимых объектов: " + toDisplayString(unref(objects).length) + ", FPS: " + toDisplayString(unref(fpsValue)) + ", ", 1),
            createVNode(_sfc_main$c)
          ]),
          _hoisted_4$4,
          ((t = unref(hiddenOnLeftObjects)) == null ? void 0 : t.count) > 0 ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "pointer-events-auto absolute z-30 top-0 left-4 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(s = unref(hiddenOnLeftObjects)) == null ? void 0 : s.count} шт. объектов левее`,
            onClick: e[0] || (e[0] = (p) => unref(moveToObjectId)(unref(hiddenOnLeftObjects).nearestObjectId))
          }, [
            createVNode(_sfc_main$q, { icon: "fa-arrow-left" }),
            createElementVNode("span", _hoisted_7$1, toDisplayString((o = unref(hiddenOnLeftObjects)) == null ? void 0 : o.count), 1)
          ], 8, _hoisted_6$1)) : createCommentVNode("", !0),
          ((i = unref(hiddenOnRightObjects)) == null ? void 0 : i.count) > 0 ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: "pointer-events-auto absolute z-30 p-1 top-0 right-0 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(n = unref(hiddenOnRightObjects)) == null ? void 0 : n.count} шт. объектов правее`,
            onClick: e[1] || (e[1] = (p) => unref(moveToObjectId)(unref(hiddenOnRightObjects).nearestObjectId))
          }, [
            createElementVNode("span", _hoisted_9$1, toDisplayString((c = unref(hiddenOnRightObjects)) == null ? void 0 : c.count), 1),
            createVNode(_sfc_main$q, { icon: "fa-arrow-right" })
          ], 8, _hoisted_8$1)) : createCommentVNode("", !0),
          ((a = unref(hiddenOnTopObjects)) == null ? void 0 : a.count) > 0 ? (openBlock(), createElementBlock("div", {
            key: 2,
            class: "pointer-events-auto absolute z-30 top-[18px] left-0 w-[18px] bg-white flex flex-col leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(h = unref(hiddenOnTopObjects)) == null ? void 0 : h.count} шт. объектов выше`,
            onClick: e[2] || (e[2] = (p) => unref(moveToObjectId)(unref(hiddenOnTopObjects).nearestObjectId))
          }, [
            createVNode(_sfc_main$q, { icon: "fa-arrow-up" }),
            createElementVNode("span", _hoisted_11, toDisplayString((u = unref(hiddenOnTopObjects)) == null ? void 0 : u.count), 1)
          ], 8, _hoisted_10)) : createCommentVNode("", !0),
          ((l = unref(hiddenOnBottomObjects)) == null ? void 0 : l.count) > 0 ? (openBlock(), createElementBlock("div", {
            key: 3,
            class: "pointer-events-auto absolute z-30 p-1 bottom-0 left-0 w-[18px] bg-white flex flex-col-reverse leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(d = unref(hiddenOnBottomObjects)) == null ? void 0 : d.count} шт. объектов ниже`,
            onClick: e[3] || (e[3] = (p) => unref(moveToObjectId)(unref(hiddenOnBottomObjects).nearestObjectId))
          }, [
            createVNode(_sfc_main$q, { icon: "fa-arrow-down" }),
            createElementVNode("span", _hoisted_13, toDisplayString((m = unref(hiddenOnBottomObjects)) == null ? void 0 : m.count), 1)
          ], 8, _hoisted_12)) : createCommentVNode("", !0),
          createElementVNode("div", {
            class: normalizeClass({ "objects-container absolute top-0 left-0": !0 }),
            style: normalizeStyle({ width: `${unref(layerSize).width}px`, height: `${unref(layerSize).height}px`, transform: `translate(${unref(layerPosition).x}px, ${unref(layerPosition).y}px)` })
          }, [
            createElementVNode("div", {
              class: "absolute flex top-0 left-0 w-full z-20 h-[20px] bg-default border-b-2 border-border text-right text-sm px-2",
              style: normalizeStyle({ transform: `translate(0, ${-unref(layerPosition).y}px)` })
            }, [
              (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(chunks), (p) => (openBlock(), createElementBlock("span", {
                class: "flex-1 text-body-dark",
                key: `horiz_${p}`
              }, toDisplayString(p) + "px", 1))), 128))
            ], 4),
            createElementVNode("div", {
              class: "absolute flex [writing-mode:vertical-lr] top-0 left-0 h-full z-20 w-[20px] bg-default border-r-2 border-border text-left text-sm py-2",
              style: normalizeStyle({ transform: `translate(${-unref(layerPosition).x}px, 0)` })
            }, [
              (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(chunks), (p) => (openBlock(), createElementBlock("span", {
                class: "flex-1 rotate-180 text-body-dark",
                key: `vert_${p}`
              }, toDisplayString(p) + "px", 1))), 128))
            ], 4),
            (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(objects), (p) => (openBlock(), createElementBlock("div", {
              key: p.obj.id,
              class: "absolute z-10",
              "data-object-id": p.obj.id,
              style: normalizeStyle(`width:${p.obj.width}px;height: ${p.obj.height}px;top: ${p.obj.position[1]}px;left:${p.obj.position[0]}px;z-index:${p.obj.zindex}`)
            }, [
              createElementVNode("div", _hoisted_15, [
                createElementVNode("span", {
                  innerHTML: p.obj.additionalName,
                  class: normalizeClass([p.obj.linked && "cursor-pointer underline"]),
                  onClick: (g) => onObjectClick(p.obj)
                }, null, 10, _hoisted_16)
              ]),
              createElementVNode("div", {
                class: "absolute top-[100%] left-[50%] translate-x-[-50%] text-center pt-2 text-sm w-[300px]",
                innerHTML: p.obj.name
              }, null, 8, _hoisted_17),
              createElementVNode("div", {
                "data-object-id": p.obj.id,
                class: "rendered-object",
                innerHTML: p.template
              }, null, 8, _hoisted_18)
            ], 12, _hoisted_14))), 128))
          ], 4)
        ]),
        createElementVNode("div", {
          class: "h-full",
          ref_key: "canvasWrapper",
          ref: canvasWrapper
        }, null, 512)
      ]);
    };
  }
}), _hoisted_1$9 = { class: "flex flex-wrap gap-2" }, _hoisted_2$5 = { key: 0 }, _hoisted_3$4 = { key: 1 }, _hoisted_4$3 = ["onClick"], _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "BaseBreadcrumbs",
  setup(r) {
    const {
      breadcrumbs: e,
      mapCurrentID: t
    } = useApplication(), s = e.list(new VueRefPatron()).ref();
    return (o, i) => (openBlock(), createElementBlock("div", _hoisted_1$9, [
      (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(s), (n, c) => (openBlock(), createElementBlock("span", {
        class: "flex gap-2",
        key: n.name
      }, [
        c !== 0 ? (openBlock(), createElementBlock("span", _hoisted_2$5, "/")) : createCommentVNode("", !0),
        c === unref(s).length - 1 ? (openBlock(), createElementBlock("b", _hoisted_3$4, "Открыто: " + toDisplayString(n.title), 1)) : (openBlock(), createElementBlock("a", {
          key: 2,
          href: "#",
          onClick: withModifiers((a) => unref(t).give(n.name), ["prevent"])
        }, toDisplayString(n.title), 9, _hoisted_4$3))
      ]))), 128))
    ]));
  }
}), _hoisted_1$8 = { class: "flex items-center p-3 gap-3" }, _hoisted_2$4 = { class: "ml-auto gap-1 flex" }, _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "TheHeader",
  setup(r) {
    const {
      drawer: e,
      modal: t,
      mapHistory: s,
      controlCombo: o,
      settings: i
    } = useApplication(), { patron: n, guest: c } = useFactories(), a = s.isNextPossible(new VueRefPatron()).ref(), h = s.isPrevPossible(new VueRefPatron()).ref();
    o.happened(
      "KeyZ",
      n.create(c.create(() => {
        h.value && s.prev();
      }))
    ), o.happened(
      "KeyP",
      n.create(c.create(() => {
        a.value && s.next();
      }))
    );
    const u = new VueRefPatron();
    return i.value(u), (l, d) => (openBlock(), createElementBlock("div", _hoisted_1$8, [
      createVNode(_sfc_main$a, { class: "TheHeader-Breadcrumbs" }),
      createElementVNode("div", _hoisted_2$4, [
        unref(a) && !unref(u).value.readonly ? (openBlock(), createBlock(_sfc_main$s, {
          key: 0,
          size: "sm",
          title: "Отменить последнее действие",
          class: "w-7 block",
          onClick: d[0] || (d[0] = (m) => unref(s).next())
        }, {
          default: withCtx(() => [
            createVNode(_sfc_main$q, { icon: "fa-rotate-left" })
          ]),
          _: 1
        })) : createCommentVNode("", !0),
        unref(h) && !unref(u).value.readonly ? (openBlock(), createBlock(_sfc_main$s, {
          key: 1,
          size: "sm",
          title: "Вернуть отмененное действие",
          class: "w-7 block",
          onClick: d[1] || (d[1] = (m) => unref(s).prev())
        }, {
          default: withCtx(() => [
            createVNode(_sfc_main$q, { icon: "fa-rotate-right" })
          ]),
          _: 1
        })) : createCommentVNode("", !0),
        createVNode(_sfc_main$s, {
          type: "success",
          size: "sm",
          class: "w-7 block e2e-open-menu",
          title: l.$t("general.menu"),
          onClick: d[2] || (d[2] = (m) => unref(e).give("menu"))
        }, {
          default: withCtx(() => [
            createVNode(_sfc_main$q, { icon: "fa-bars" })
          ]),
          _: 1
        }, 8, ["title"]),
        createVNode(_sfc_main$s, {
          title: l.$t("general.byText"),
          type: "primary",
          size: "sm",
          class: "w-7 block",
          onClick: d[3] || (d[3] = (m) => unref(t).give("mapAsText"))
        }, {
          default: withCtx(() => [
            createVNode(_sfc_main$q, { icon: "fa-text-width" })
          ]),
          _: 1
        }, 8, ["title"]),
        createVNode(_sfc_main$s, {
          class: "w-7 block e2e-search",
          size: "sm",
          onClick: d[4] || (d[4] = (m) => unref(t).give("search"))
        }, {
          default: withCtx(() => [
            createVNode(_sfc_main$q, { icon: "fa-search" })
          ]),
          _: 1
        }),
        createVNode(_sfc_main$s, {
          size: "sm",
          title: "Все карты файла",
          class: "w-7 block",
          onClick: d[5] || (d[5] = (m) => unref(e).give("fileMaps"))
        }, {
          default: withCtx(() => [
            createVNode(_sfc_main$q, { icon: "fa-map" })
          ]),
          _: 1
        })
      ])
    ]));
  }
}), _sfc_main$8 = {}, _hoisted_1$7 = { class: "text-lg font-bold" };
function _sfc_render$1(r, e) {
  return openBlock(), createElementBlock("span", _hoisted_1$7, [
    renderSlot(r.$slots, "default")
  ]);
}
const BaseTextTitle = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$1]]), _hoisted_1$6 = { class: "flex gap-1" }, _hoisted_2$3 = {
  key: 0,
  class: "TheMapAsText select-auto"
}, _hoisted_3$3 = ["innerHTML"], _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "TheMapAsText",
  setup(r) {
    const { mapFile: e, mapCurrent: t } = useApplication(), {
      guest: s,
      patron: o,
      textOf: i,
      textNlAsBr: n,
      textWithoutHTML: c
    } = useFactories(), a = e.currentMap(new VueRefPatron()).ref(), h = ref(""), u = ref([]);
    t.objects(
      o.create(
        s.create(debounce$2((f) => {
          u.value = f, n.create(
            i.create(
              f.map((v) => `<div class="TheMapAsText-Item">
                <h3>${v.name}</h3><p>${v.additionalName || ""}</p><p>${v.description || ""}</p><p>${v.additionalFields && Object.values(v.additionalFields).join("</p><p>")}</p></div>`).join("")
            )
          ).asString(
            s.create((v) => {
              h.value = v;
            })
          );
        }, 500))
      )
    );
    const { share: l, isSupported: d } = useShare(), m = () => {
      d.value || alert("Sharing is not supported"), c.create(
        i.create(
          h.value
        )
      ).asString(
        s.create((f) => {
          l({
            text: f
          });
        })
      );
    }, p = ref(), g = () => {
      var f, v;
      if (a.value) {
        const y = new Range();
        y.setStart(p.value, 0), y.setEnd(p.value, Object.values(u.value).length), (f = document.getSelection()) == null || f.removeAllRanges(), (v = document.getSelection()) == null || v.addRange(y);
      }
    };
    return (f, v) => (openBlock(), createBlock(_sfc_main$v, { name: "mapAsText" }, {
      header: withCtx(() => [
        createVNode(BaseTextTitle, { class: "block mb-3" }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(f.$t("general.mapAsText")) + " ", 1),
            createElementVNode("div", _hoisted_1$6, [
              createVNode(_sfc_main$s, {
                size: "sm",
                type: "success",
                class: "font-normal",
                onClick: m
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(f.$t("general.share")), 1)
                ]),
                _: 1
              }),
              createVNode(_sfc_main$s, {
                size: "sm",
                type: "primary",
                class: "font-normal",
                onClick: g
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(f.$t("general.selectAll")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        })
      ]),
      default: withCtx(() => [
        unref(a) ? (openBlock(), createElementBlock("article", _hoisted_2$3, [
          createElementVNode("div", {
            ref_key: "textRef",
            ref: p,
            innerHTML: h.value
          }, null, 8, _hoisted_3$3)
        ])) : createCommentVNode("", !0)
      ]),
      _: 1
    }));
  }
}), _hoisted_1$5 = { key: 1 }, _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "TheMiniMap",
  setup(r) {
    const { miniMap: e } = useApplication(), t = e.points(new VueRefPatron()).ref(), s = e.size(new VueRefPatron()).ref(), o = e.viewportSize(new VueRefPatron()).ref(), i = e.viewportPosition(new VueRefPatron()).ref();
    return (n, c) => unref(s) ? (openBlock(), createElementBlock("div", {
      key: 0,
      style: normalizeStyle({
        width: `${unref(s).width}px`,
        height: `${unref(s).height}px`
      }),
      class: "absolute pointer-events-none block bg-white bottom-[10px] mt-3 right-3 z-1 border border-solid border-body-dark"
    }, [
      unref(i) ? (openBlock(), createElementBlock("div", {
        key: 0,
        style: normalizeStyle({
          width: `${unref(o).width}px`,
          height: `${unref(o).height}px`,
          top: `${unref(i).y}px`,
          left: `${unref(i).x}px`
        }),
        class: "absolute bg-primary/50"
      }, null, 4)) : createCommentVNode("", !0),
      unref(t) ? (openBlock(), createElementBlock("div", _hoisted_1$5, [
        (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(t), (a) => (openBlock(), createElementBlock("div", {
          key: a.id,
          class: "absolute w-1 h-1 block bg-danger",
          style: normalizeStyle({
            top: `${a.y}px`,
            left: `${a.x}px`,
            width: `${a.width}px`,
            height: `${a.height}px`
          })
        }, null, 4))), 128))
      ])) : createCommentVNode("", !0)
    ], 4)) : createCommentVNode("", !0);
  }
}), _hoisted_1$4 = { class: "text-lg font-bold" }, _hoisted_2$2 = {
  key: 0,
  class: "TheSettings"
}, _hoisted_3$2 = { class: "mb-2" }, _hoisted_4$2 = { class: "TheSettings-Row" }, _hoisted_5$1 = { class: "flex gap-2 mb-2" }, _hoisted_6 = { class: "mb-2" }, _hoisted_7 = { class: "mb-2" }, _hoisted_8 = {
  href: "https://github.com/kosukhin/mind-map-creator",
  target: "_blank"
}, _hoisted_9 = { class: "flex gap-2" }, _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "FormSettings",
  setup(r) {
    const {
      modal: e,
      mapFile: t,
      mapRemoved: s,
      mapSettings: o,
      controlCombo: i,
      parentNames: n,
      mapCurrentID: c
    } = useApplication(), { patron: a, guest: h } = useFactories(), u = n.names(new VueRefPatron()).ref(), l = t.currentMap(new VueRefPatron()).ref(), d = c.id(new VueRefPatron()).ref(), m = () => {
      e.give("");
    }, p = () => {
      o.give(l.value.settings), m();
    };
    return i.happenedConditional(
      "KeyS",
      e.openedByName("settings"),
      a.create(h.create(p))
    ), (g, f) => (openBlock(), createBlock(_sfc_main$v, { name: "settings" }, {
      header: withCtx(() => [
        createElementVNode("h2", _hoisted_1$4, toDisplayString(g.$t("general.mapSettings")), 1)
      ]),
      default: withCtx(() => {
        var v;
        return [
          (v = unref(l)) != null && v.settings ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
            createElementVNode("div", _hoisted_3$2, [
              createElementVNode("div", _hoisted_4$2, [
                createElementVNode("div", _hoisted_5$1, [
                  renderSlot(g.$slots, "beforeButtons"),
                  unref(u).length > 1 ? (openBlock(), createBlock(_sfc_main$s, {
                    key: 0,
                    type: "primary",
                    class: "text-white",
                    onClick: f[0] || (f[0] = (y) => unref(e).give("parentTypes"))
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(g.$t("general.parentTypes")), 1)
                    ]),
                    _: 1
                  })) : createCommentVNode("", !0),
                  createVNode(_sfc_main$s, {
                    type: "primary",
                    class: "text-white",
                    onClick: f[1] || (f[1] = (y) => unref(e).give("export"))
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(g.$t("general.exportOrImport")), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$s, {
                    type: "primary",
                    class: "text-white e2e-open-presets",
                    onClick: f[2] || (f[2] = (y) => unref(e).give("presets"))
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Пресеты ")
                    ]),
                    _: 1
                  })
                ])
              ]),
              createElementVNode("div", _hoisted_6, [
                createElementVNode("label", null, [
                  createElementVNode("b", null, toDisplayString(g.$t("general.mapName")), 1),
                  createVNode(_sfc_main$m, {
                    modelValue: unref(l).settings.title,
                    "onUpdate:modelValue": f[3] || (f[3] = (y) => unref(l).settings.title = y)
                  }, null, 8, ["modelValue"])
                ])
              ]),
              createElementVNode("div", _hoisted_7, [
                createElementVNode("a", _hoisted_8, toDisplayString(g.$t("general.githubRepo")), 1)
              ])
            ]),
            createElementVNode("div", _hoisted_9, [
              createVNode(_sfc_main$s, {
                class: "TheSettings-Button",
                type: "success",
                onClick: f[4] || (f[4] = (y) => p())
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(g.$t("general.save")), 1)
                ]),
                _: 1
              }),
              createVNode(_sfc_main$s, {
                class: "TheSettings-Button",
                onClick: m
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(g.$t("general.cancel")), 1)
                ]),
                _: 1
              }),
              createVNode(_sfc_main$s, {
                class: "TheSettings-Button",
                type: "danger",
                onClick: f[5] || (f[5] = (y) => {
                  unref(s).give(unref(d)), m();
                })
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(g.$t("general.removeMap")), 1)
                ]),
                _: 1
              })
            ])
          ])) : createCommentVNode("", !0)
        ];
      }),
      _: 3
    }));
  }
}), _sfc_main$4 = {}, _hoisted_1$3 = { class: "BaseGroup" };
function _sfc_render(r, e) {
  return openBlock(), createElementBlock("div", _hoisted_1$3, [
    renderSlot(r.$slots, "default")
  ]);
}
const BaseGroup = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render]]), type = "default", _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "TheLinker",
  setup(r) {
    const { mapObjectsLink: e } = useApplication(), t = e.objectIds(new VueRefPatron([])).ref();
    return (s, o) => (openBlock(), createBlock(_sfc_main$s, {
      type,
      onClick: o[0] || (o[0] = (i) => unref(e).startLink())
    }, {
      default: withCtx(() => [
        createTextVNode(toDisplayString(unref(t).length === 1 ? "Выбиретие объект" : unref(t).length === 2 ? "Второй объект" : "Связать объекты"), 1)
      ]),
      _: 1
    }));
  }
}), _hoisted_1$2 = { class: "flex e2e-sidebar flex-col items-center gap-3 max-h-[100%] overflow-hidden" }, _hoisted_2$1 = { class: "TheSideBar-ItemName" }, _hoisted_3$1 = ["innerHTML", "draggable", "title", "onDragend", "onDblclick"], _hoisted_4$1 = {
  key: 0,
  class: "flex gap-1"
}, _hoisted_5 = {
  key: 0,
  class: "mt-auto w-full p-3 pt-0"
}, _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TheSideBar",
  setup(r) {
    const {
      mapObjectNew: e,
      mapCurrent: t,
      mapTypeCurrent: s,
      mapTypeRemoved: o,
      mapTypeNew: i,
      modal: n,
      settings: c,
      sidebarDraggable: a
    } = useApplication(), h = t.types(new VueRefPatron()).ref(), u = ref();
    onMounted(() => {
      a.give(u.value);
    });
    const { svgMapTypeImage: l } = useFactories(), d = computed(() => {
      var p;
      return (p = h.value) == null ? void 0 : p.map((g) => ({
        type: g,
        image: l.create(g).markup()
      })).sort((g, f) => +(g.type.name >= f.type.name));
    }), m = new VueRefPatron();
    return c.value(m), (p, g) => (openBlock(), createElementBlock("div", _hoisted_1$2, [
      createElementVNode("div", {
        ref_key: "dragWrapperRef",
        ref: u,
        class: "flex flex-col gap-3 flex-grow w-full overflow-y-auto"
      }, [
        (openBlock(!0), createElementBlock(Fragment, null, renderList(d.value, (f, v) => (openBlock(), createElementBlock("div", {
          key: v,
          class: "flex flex-col items-center justify-center gap-2"
        }, [
          createElementVNode("div", _hoisted_2$1, toDisplayString(f.type.name), 1),
          createElementVNode("div", {
            innerHTML: f.image,
            class: "TheSideBar-ItemImage",
            draggable: unref(m).value.readonly ? "false" : "true",
            style: normalizeStyle(`width:${f.type.width}px;height:${f.type.height}px`),
            title: p.$t("general.notifications.dragToCanvasToAdd"),
            onDragend: (y) => unref(e).byTypeName(f.type.id, y),
            onDblclick: (y) => unref(e).byTypeName(f.type.id, y)
          }, null, 44, _hoisted_3$1),
          unref(m).value.readonly ? createCommentVNode("", !0) : (openBlock(), createElementBlock("div", _hoisted_4$1, [
            createVNode(_sfc_main$s, {
              class: "text-white",
              size: "sm",
              type: "primary",
              onClick: (y) => unref(s).give(f.type.id)
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(p.$t("general.change")), 1)
              ]),
              _: 2
            }, 1032, ["onClick"]),
            createVNode(_sfc_main$s, {
              class: "text-white",
              size: "sm",
              type: "danger",
              onClick: (y) => unref(o).give(f.type)
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(p.$t("general.delete")), 1)
              ]),
              _: 2
            }, 1032, ["onClick"])
          ]))
        ]))), 128))
      ], 512),
      unref(m).value.readonly ? createCommentVNode("", !0) : (openBlock(), createElementBlock("div", _hoisted_5, [
        createVNode(BaseGroup, { class: "mb-1 grid gap-1 grid-cols-2" }, {
          default: withCtx(() => [
            createVNode(_sfc_main$s, {
              title: p.$t("general.addType"),
              type: "success",
              onClick: g[0] || (g[0] = (f) => unref(i).byName())
            }, {
              default: withCtx(() => [
                createVNode(_sfc_main$q, { icon: "fa-plus-square" })
              ]),
              _: 1
            }, 8, ["title"]),
            createVNode(_sfc_main$s, {
              class: "e2e-show-settings",
              title: p.$t("general.settings"),
              type: "primary",
              onClick: g[1] || (g[1] = (f) => unref(n).give("settings"))
            }, {
              default: withCtx(() => [
                createVNode(_sfc_main$q, { icon: "fa-cog" })
              ]),
              _: 1
            }, 8, ["title"])
          ]),
          _: 1
        }),
        createVNode(_sfc_main$3, { class: "w-[100%] block mb-1" })
      ]))
    ]));
  }
}), _hoisted_1$1 = { class: "absolute bg-body hover:bg-border cursor-pointer border-solid border-border bottom-[150px] z-10 right-3 p-3 w-15 h-15" }, _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TheSidebarButton",
  setup(r) {
    return (e, t) => (openBlock(), createElementBlock("div", _hoisted_1$1, [
      createVNode(_sfc_main$q, { icon: "fa-bars-staggered" })
    ]));
  }
}), _hoisted_1 = { class: "bg-body absolute top-0 left-0 w-full h-full" }, _hoisted_2 = { class: "AppClientModal" }, _hoisted_3 = { class: "text-md font-bold mb-2" }, _hoisted_4 = { class: "flex flex-col gap-2" }, _sfc_main = /* @__PURE__ */ defineComponent({
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
    const t = r, s = e, { fileContent: o, settings: i, device: n } = useApplication(), { guest: c, patron: a } = useFactories();
    i.value((l) => {
      i.give({
        ...l,
        readonly: t.readonly,
        presets: t.presets
      });
    }), watch(() => t.modelValue, (l) => {
      o.value(c.create((d) => {
        l !== d && o.give(l);
      }));
    }, {
      immediate: !0
    }), o.value(a.create((l) => {
      s("update:modelValue", l);
    }));
    const h = ref(!0), u = new VueRefPatron();
    return n.value(u), n.value(new Patron((l) => {
      h.value = l.isDesktop;
    })), (l, d) => (openBlock(), createElementBlock("div", _hoisted_1, [
      createElementVNode("div", {
        class: normalizeClass(["grid grid-rows-[50px_1fr] h-dvh relative", { "grid-cols-[200px_1fr]": !unref(u).value.isMobile, "grid-cols-[1fr]": unref(u).value.isMobile }])
      }, [
        createVNode(_sfc_main$9, { class: "col-span-2" }),
        h.value ? (openBlock(), createBlock(_sfc_main$2, {
          key: 0,
          class: normalizeClass({ "bg-[#f3f4f6] w-[200px] absolute top-[50px] left-0 z-10 bottom-0": unref(u).value.isMobile }),
          onClose: d[0] || (d[0] = (m) => h.value = !1)
        }, null, 8, ["class"])) : createCommentVNode("", !0),
        createVNode(_sfc_main$b, { class: "w-auto col-auto h-full" }),
        createVNode(_sfc_main$6),
        unref(u).value.isMobile ? (openBlock(), createBlock(_sfc_main$1, {
          key: 1,
          onClick: d[1] || (d[1] = (m) => h.value = !h.value)
        })) : createCommentVNode("", !0),
        renderSlot(l.$slots, "insideGrid")
      ], 2),
      createVNode(_sfc_main$e),
      createVNode(_sfc_main$d),
      createVNode(_sfc_main$5, null, {
        beforeButtons: withCtx(() => [
          renderSlot(l.$slots, "beforeSettingsButtons")
        ]),
        _: 3
      }),
      createVNode(_sfc_main$n),
      createVNode(_sfc_main$k),
      createVNode(_sfc_main$t),
      createVNode(_sfc_main$o),
      createVNode(_sfc_main$7),
      createVNode(_sfc_main$l),
      createVNode(_sfc_main$p),
      createVNode(_sfc_main$v, { name: "custom" }, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_2, [
            createElementVNode("div", _hoisted_3, [
              renderSlot(l.$slots, "customModalTitle")
            ]),
            createElementVNode("div", _hoisted_4, [
              renderSlot(l.$slots, "customModalBody")
            ])
          ])
        ]),
        _: 3
      })
    ]));
  }
}), localDebug$2 = browserExports.debug("FileSystemContent");
class FileSystemContent {
  constructor(e, t, s) {
    b(this, "contentPatrons");
    b(this, "fileHandler", null);
    b(this, "contentSource");
    this.launchQueue = e, this.notification = t, this.factories = s, this.contentPatrons = s.pool.create(this), this.contentSource = s.sourceEmpty.create();
  }
  content(e) {
    const t = this.factories.guest.create((s) => {
      this.fileHandler = s, this.factories.fileHandlerContent.create(s).content(
        this.factories.guest.create((o) => {
          this.contentPatrons.distribute(o, e), this.contentSource.give(o);
        })
      );
    });
    return this.fileHandler || this.launchQueue.fileHandler(t), this.contentSource.value(e), this;
  }
  give(e) {
    if (localDebug$2("save file as content string", e), !this.fileHandler)
      throw new RuntimeError("Cant save file because no fileHandler");
    try {
      return this.contentSource.give(e), this.factories.browserFileSaved.create(this.fileHandler).save(e), this.contentPatrons.give(e), this;
    } catch (t) {
      throw new RuntimeError("Cant handle receive for map file FS", { cause: t });
    } finally {
      this.notification.give({
        type: "success",
        text: "Успешно сохранен файл карты!"
      });
    }
  }
  canBeUsed(e) {
    const t = "launchQueue" in window;
    localDebug$2("can be used", t);
    const s = window && window.matchMedia("(display-mode: standalone)");
    return e.give(t && s.matches), e;
  }
}
const localDebug$1 = browserExports.debug("FirstPossibleFileContent");
class FirstPossibleFileContent {
  constructor(e, t) {
    b(this, "firstPossibleFileContent", null);
    b(this, "contentSource", new SourceEmpty());
    b(this, "canBeUsedSource", new SourceEmpty());
    localDebug$1("length", e.length), e.forEach((s) => {
      s.canBeUsed(
        t.patronOnce.create(
          t.guest.create((o) => {
            localDebug$1("canbeused result", s, o), o && !this.firstPossibleFileContent && (this.firstPossibleFileContent = s, s.canBeUsed(t.patron.create(this.canBeUsedSource)), s.content(t.patron.create(this.contentSource)), this.contentSource.value(
              t.patron.create((i) => {
                s.content(
                  t.guest.create((n) => {
                    i !== n && s.give(i);
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
    return localDebug$1("can be used to", this.firstPossibleFileContent), this.canBeUsedSource.value(e), e;
  }
  content(e) {
    return localDebug$1("content to", this.firstPossibleFileContent), this.contentSource.value(e), this;
  }
  give(e) {
    return this.contentSource.give(e), this;
  }
}
const localDebug = browserExports.debug("UrlContent");
class UrlContent {
  constructor(e, t) {
    b(this, "contentCache");
    this.notification = e, this.factories = t, this.contentCache = t.sourceEmpty.create();
  }
  canBeUsed(e) {
    if (!window)
      return e.give(!1), this;
    const t = window.location.search.indexOf("?view=") > -1;
    if (localDebug("can be used", t), e.give(window.location.search.indexOf("?view=") > -1), t) {
      const s = window.location.search.split("=")[1] ?? "";
      fetch(s, { redirect: "follow" }).then((o) => o.text()).then((o) => {
        localDebug("received text", o), this.contentCache.give(o);
      });
    }
    return e;
  }
  content(e) {
    if (!window)
      return this;
    const t = window.location.search.split("=")[1] ?? "";
    return localDebug("visit url", t), this.contentCache.value(this.factories.patronOnce.create(e)), this;
  }
  give() {
    return this.notification.give({
      type: "error",
      text: "Невозможно сохранить карту, открытую по ссылке!"
    }), this;
  }
}
const fileHandle = new SourceEmpty();
class BrowserLaunchQueue {
  constructor(e = window.launchQueue, t = "launchQueue" in window) {
    b(this, "isCalculated", !1);
    this.launchQueue = e, this.isLaunchQueueSupported = t;
  }
  fileHandler(e) {
    return this.isLaunchQueueSupported && !this.isCalculated && (this.isCalculated = !0, this.launchQueue.setConsumer((t) => {
      if (t.files && t.files.length) {
        const [s] = t.files;
        fileHandle.give(s);
      }
    })), fileHandle.value(e), this;
  }
}
class StorageRecord {
  constructor(e) {
    b(this, "source", new SourceEmpty());
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
  do(e) {
    return e === "empty" && localStorage.removeItem(this.name), this;
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
export {
  BrowserLaunchQueue,
  FileSystemContent,
  FirstPossibleFileContent,
  _sfc_main as PatronSchemeEditor,
  StorageRecord,
  UrlContent,
  VueRefPatron,
  useApplication,
  useFactories
};
