var yb = Object.defineProperty;
var vb = (n, e, t) => e in n ? yb(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var ne = (n, e, t) => vb(n, typeof e != "symbol" ? e + "" : e, t);
import { unref as E, getCurrentInstance as Ci, onMounted as _i, nextTick as qm, getCurrentScope as bb, onScopeDispose as wb, onUnmounted as Xm, ref as qe, watch as Fn, computed as Ie, reactive as vd, defineComponent as he, openBlock as I, createBlock as rt, Transition as Jm, withCtx as H, createElementBlock as B, normalizeClass as Ln, createElementVNode as z, withModifiers as ms, renderSlot as nn, createCommentVNode as ge, h as rr, Fragment as Ke, renderList as kt, toDisplayString as Z, createVNode as D, normalizeStyle as An, createTextVNode as ye, withDirectives as ol, isRef as Mo, vModelText as Qm, vModelCheckbox as Cb, onBeforeUnmount as Ao, watchEffect as _b, shallowRef as Xu, markRaw as Sb, customRef as xb, vModelSelect as kb, createStaticVNode as Tb, inject as Ob, onBeforeMount as Eb, Text as Mb } from "vue";
import bd from "konva";
class Ab {
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
class Ju {
  constructor(e) {
    this.guestReceiver = e;
  }
  value(e) {
    return this.guestReceiver(e), e;
  }
}
function Rr(n, e, t) {
  typeof e == "function" ? e(n, t) : e.give(n, t);
}
class ti {
  constructor(e) {
    this.receiver = e;
  }
  give(e, t) {
    return this.receiver(e, t), this;
  }
}
class gs {
  constructor(e, t) {
    this.sourceGuest = e, this.targetGuest = t;
  }
  introduction() {
    return typeof this.sourceGuest == "function" || !this.sourceGuest.introduction ? "guest" : this.sourceGuest.introduction();
  }
  give(e, t) {
    return Rr(e, this.targetGuest, t), this;
  }
  disposed(e) {
    const t = this.sourceGuest;
    return t.disposed ? t.disposed(e) : !1;
  }
}
var Nb = Object.defineProperty, Pb = (n, e, t) => e in n ? Nb(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, wd = (n, e, t) => Pb(n, typeof e != "symbol" ? e + "" : e, t);
const Zm = /* @__PURE__ */ new Map(), Cd = (n) => {
  Zm.forEach((e) => {
    e.delete(n);
  });
};
class al {
  constructor(e) {
    this.initiator = e, wd(this, "patrons"), wd(this, "give"), this.patrons = /* @__PURE__ */ new Set(), Zm.set(this, this.patrons);
    let t = null;
    const r = (i, s) => {
      this.patrons.forEach((o) => {
        this.sendValueToGuest(i, o, s);
      });
    };
    this.give = (i, s) => {
      const o = () => {
        o === t && r(i, s);
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
  sendValueToGuest(e, t, r) {
    this.guestDisposed(e, t) || Rr(e, t, {
      ...r,
      data: {
        ...(r == null ? void 0 : r.data) ?? {},
        initiator: this.initiator,
        pool: this
      }
    });
  }
  guestDisposed(e, t) {
    var r;
    return (r = t.disposed) != null && r.call(t, e) ? (this.remove(t), !0) : !1;
  }
}
var Ib = Object.defineProperty, Db = (n, e, t) => e in n ? Ib(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Lb = (n, e, t) => Db(n, e + "", t);
class No {
  constructor(e) {
    this.sourceDocument = e, Lb(this, "thePool", new al(this));
  }
  pool() {
    return this.thePool;
  }
  give(e) {
    return this.sourceDocument = e, this.thePool.give(this.sourceDocument), this;
  }
  value(e) {
    return typeof e == "function" ? this.thePool.distribute(this.sourceDocument, new ti(e)) : this.thePool.distribute(this.sourceDocument, e), this;
  }
}
class Da {
  constructor(e) {
    this.baseGuest = e;
  }
  give(e, t) {
    let r = this.baseGuest;
    return typeof r == "function" && (r = new ti(r)), r.give(e, t), this;
  }
  introduction() {
    return typeof this.baseGuest == "function" || !this.baseGuest.introduction ? "guest" : this.baseGuest.introduction();
  }
  disposed(e) {
    const t = this.baseGuest;
    return t.disposed ? t.disposed(e) : !1;
  }
}
var Rb = Object.defineProperty, Fb = (n, e, t) => e in n ? Rb(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, _d = (n, e, t) => Fb(n, typeof e != "symbol" ? e + "" : e, t);
class $b {
  constructor(e) {
    _d(this, "guests", /* @__PURE__ */ new Set()), _d(this, "patronPool"), this.patronPool = new al(e);
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
    this.guests.forEach((r) => {
      Rr(e, r, t);
    }), this.guests.clear();
  }
}
var Bb = Object.defineProperty, jb = (n, e, t) => e in n ? Bb(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Ho = (n, e, t) => jb(n, typeof e != "symbol" ? e + "" : e, t);
class Vb {
  constructor() {
    Ho(this, "theChain"), Ho(this, "keysKnown", /* @__PURE__ */ new Set()), Ho(this, "keysFilled", /* @__PURE__ */ new Set()), Ho(this, "filledChainPool", new $b(this)), this.theChain = new No({});
  }
  resultArray(e) {
    const t = new Da(e);
    return this.filledChainPool.add(
      new gs(t, (r) => {
        t.give(Object.values(r));
      })
    ), this.isChainFilled() && this.theChain.value(
      new ti((r) => {
        this.filledChainPool.give(Object.values(r));
      })
    ), this;
  }
  result(e) {
    const t = new Da(e);
    return this.isChainFilled() ? (this.filledChainPool.add(t), this.theChain.value(
      new ti((r) => {
        this.filledChainPool.give(r);
      })
    )) : this.filledChainPool.add(t), this;
  }
  receiveKey(e) {
    return this.keysKnown.add(e), new ti((t) => {
      queueMicrotask(() => {
        this.theChain.value(
          new ti((r) => {
            this.keysFilled.add(e);
            const i = {
              ...r,
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
class zb {
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
class Hb {
  constructor(e) {
    this.willBePatron = e;
  }
  introduction() {
    return "patron";
  }
  give(e, t) {
    return Rr(e, this.willBePatron, t), this;
  }
  disposed(e) {
    var r;
    const t = this.willBePatron;
    return ((r = t == null ? void 0 : t.disposed) == null ? void 0 : r.call(t, e)) || !1;
  }
}
var Gb = Object.defineProperty, Wb = (n, e, t) => e in n ? Gb(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Ub = (n, e, t) => Wb(n, e + "", t);
class Kb {
  constructor(e) {
    this.baseGuest = e, Ub(this, "received", !1);
  }
  introduction() {
    return "patron";
  }
  give(e, t) {
    this.received || Rr(e, this.baseGuest, t);
    const r = t == null ? void 0 : t.data;
    return r != null && r.pool && r.pool.remove(this), this;
  }
  disposed(e) {
    const t = this.baseGuest;
    return t.disposed ? t.disposed(e) : !1;
  }
}
var Yb = Object.defineProperty, qb = (n, e, t) => e in n ? Yb(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Xb = (n, e, t) => qb(n, e + "", t);
class Qi {
  constructor() {
    Xb(this, "baseSource", new No(null));
  }
  value(e) {
    return this.baseSource.value(
      new gs(e, (t) => {
        t !== null && Rr(t, e);
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
let Be = class {
  constructor(e, t = {}) {
    this.constructorFn = e, this.factories = t;
  }
  create(...e) {
    return new this.constructorFn(
      ...e,
      this.factories
    );
  }
};
class ao extends Error {
  constructor(e, t) {
    super(e, t);
  }
}
class Jb {
  constructor(e) {
    this.fileHandler = e;
  }
  content(e) {
    return this.fileHandler.getFile().then(async (t) => await new Response(t).text()).then((t) => {
      e.give(t);
    }).catch((t) => {
      throw new ao("Problem when reading file in SystemFileFromHandler", {
        cause: t
      });
    }), this;
  }
}
class Qb {
  constructor(e) {
    this.fileHandler = e;
  }
  save(e) {
    return this.fileHandler.createWritable().then((t) => (t.write(e).catch((r) => {
      throw new ao("Cant save file in browser", { cause: r });
    }), t)).then((t) => {
      t.close().catch((r) => {
        throw new ao("Cant close written file in browser", { cause: r });
      });
    }), this;
  }
}
class Zb {
  constructor(e) {
    this.content = e;
  }
  result() {
    return JSON.parse(this.content);
  }
}
class e1 {
  constructor(e) {
    this.content = e;
  }
  result() {
    return JSON.stringify(this.content);
  }
}
class t1 {
  constructor(e, t = 100, r = 100) {
    this.svgContent = e, this.width = t, this.height = r;
  }
  markup() {
    return this.svgContent.replaceAll("${width}", String(this.width)).replaceAll("${height}", String(this.height));
  }
}
class n1 {
  constructor(e, t) {
    this.type = e, this.factories = t;
  }
  markup() {
    return this.factories.svgImage.create(this.type.svg, this.type.width, this.type.height).markup();
  }
}
class r1 {
  constructor(e, t, r) {
    this.chunksCount = e, this.baseNumber = t, this.factories = r;
  }
  chunks(e) {
    return this.baseNumber.value(
      this.factories.guestInTheMiddle.create(e, (t) => {
        const r = Math.round(t / this.chunksCount), i = [];
        for (let s = 1; s <= this.chunksCount; s += 1)
          i.push(s * r);
        e.give(i);
      })
    ), e;
  }
}
class i1 {
  constructor(e, t) {
    this.mapUrl = e, this.factories = t;
  }
  name(e) {
    this.mapUrl.value(
      this.factories.guestInTheMiddle.create(e, (t) => {
        let r = t.replace("/", "").replaceAll("/", "_");
        r.match("_") && (r = `_${r}`), e.give(r);
      })
    );
  }
}
class s1 {
  constructor(e, t) {
    this.text = e, this.factories = t;
  }
  noHtml(e) {
    return this.text.value(
      this.factories.guestInTheMiddle.create(e, (t) => {
        const r = document.createElement("DIV");
        r.innerHTML = t;
        const i = r.textContent || r.innerText || "";
        e.give(i);
      })
    ), e;
  }
}
var Sd;
const ll = typeof window < "u", o1 = (n) => typeof n < "u", a1 = (n) => typeof n == "function", l1 = (n) => typeof n == "string", Qu = () => {
};
ll && ((Sd = window == null ? void 0 : window.navigator) != null && Sd.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function ii(n) {
  return typeof n == "function" ? n() : E(n);
}
function c1(n) {
  return n;
}
function u1(n) {
  return bb() ? (wb(n), !0) : !1;
}
function eg(n, e = !0) {
  Ci() ? _i(n) : e ? n() : qm(n);
}
function f1(n) {
  Ci() && Xm(n);
}
function d1(n) {
  var e;
  const t = ii(n);
  return (e = t == null ? void 0 : t.$el) != null ? e : t;
}
const tg = ll ? window : void 0, h1 = ll ? window.document : void 0, p1 = ll ? window.navigator : void 0;
function Go(...n) {
  let e, t, r, i;
  if (l1(n[0]) || Array.isArray(n[0]) ? ([t, r, i] = n, e = tg) : [e, t, r, i] = n, !e)
    return Qu;
  Array.isArray(t) || (t = [t]), Array.isArray(r) || (r = [r]);
  const s = [], o = () => {
    s.forEach((u) => u()), s.length = 0;
  }, a = (u, f, d, p) => (u.addEventListener(f, d, p), () => u.removeEventListener(f, d, p)), l = Fn(() => [d1(e), ii(i)], ([u, f]) => {
    o(), u && s.push(...t.flatMap((d) => r.map((p) => a(u, d, p, f))));
  }, { immediate: !0, flush: "post" }), c = () => {
    l(), o();
  };
  return u1(c), c;
}
function m1(n, e = !1) {
  const t = qe(), r = () => t.value = !!n();
  return r(), eg(r, e), t;
}
function g1(n) {
  return JSON.parse(JSON.stringify(n));
}
const xd = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, kd = "__vueuse_ssr_handlers__";
xd[kd] = xd[kd] || {};
const y1 = {
  ctrl: "control",
  command: "meta",
  cmd: "meta",
  option: "alt",
  up: "arrowup",
  down: "arrowdown",
  left: "arrowleft",
  right: "arrowright"
};
function v1(n = {}) {
  const {
    reactive: e = !1,
    target: t = tg,
    aliasMap: r = y1,
    passive: i = !0,
    onEventFired: s = Qu
  } = n, o = vd(/* @__PURE__ */ new Set()), a = {
    toJSON() {
      return {};
    },
    current: o
  }, l = e ? vd(a) : a, c = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set();
  function f(m, g) {
    m in l && (e ? l[m] = g : l[m].value = g);
  }
  function d() {
    o.clear();
    for (const m of u)
      f(m, !1);
  }
  function p(m, g) {
    var v, w;
    const b = (v = m.key) == null ? void 0 : v.toLowerCase(), k = [(w = m.code) == null ? void 0 : w.toLowerCase(), b].filter(Boolean);
    b && (g ? o.add(b) : o.delete(b));
    for (const C of k)
      u.add(C), f(C, g);
    b === "meta" && !g ? (c.forEach((C) => {
      o.delete(C), f(C, !1);
    }), c.clear()) : typeof m.getModifierState == "function" && m.getModifierState("Meta") && g && [...o, ...k].forEach((C) => c.add(C));
  }
  Go(t, "keydown", (m) => (p(m, !0), s(m)), { passive: i }), Go(t, "keyup", (m) => (p(m, !1), s(m)), { passive: i }), Go("blur", d, { passive: !0 }), Go("focus", d, { passive: !0 });
  const h = new Proxy(l, {
    get(m, g, v) {
      if (typeof g != "string")
        return Reflect.get(m, g, v);
      if (g = g.toLowerCase(), g in r && (g = r[g]), !(g in l))
        if (/[+_-]/.test(g)) {
          const b = g.split(/[+_-]/g).map((y) => y.trim());
          l[g] = Ie(() => b.every((y) => E(h[y])));
        } else
          l[g] = qe(!1);
      const w = Reflect.get(m, g, v);
      return e ? E(w) : w;
    }
  });
  return h;
}
var Td;
(function(n) {
  n.UP = "UP", n.RIGHT = "RIGHT", n.DOWN = "DOWN", n.LEFT = "LEFT", n.NONE = "NONE";
})(Td || (Td = {}));
function b1(n, e = Qu, t = {}) {
  const {
    immediate: r = !0,
    manual: i = !1,
    type: s = "text/javascript",
    async: o = !0,
    crossOrigin: a,
    referrerPolicy: l,
    noModule: c,
    defer: u,
    document: f = h1,
    attrs: d = {}
  } = t, p = qe(null);
  let h = null;
  const m = (w) => new Promise((b, y) => {
    const k = (O) => (p.value = O, b(O), O);
    if (!f) {
      b(!1);
      return;
    }
    let C = !1, S = f.querySelector(`script[src="${ii(n)}"]`);
    S ? S.hasAttribute("data-loaded") && k(S) : (S = f.createElement("script"), S.type = s, S.async = o, S.src = ii(n), u && (S.defer = u), a && (S.crossOrigin = a), c && (S.noModule = c), l && (S.referrerPolicy = l), Object.entries(d).forEach(([O, T]) => S == null ? void 0 : S.setAttribute(O, T)), C = !0), S.addEventListener("error", (O) => y(O)), S.addEventListener("abort", (O) => y(O)), S.addEventListener("load", () => {
      S.setAttribute("data-loaded", "true"), e(S), k(S);
    }), C && (S = f.head.appendChild(S)), w || k(S);
  }), g = (w = !0) => (h || (h = m(w)), h), v = () => {
    if (!f)
      return;
    h = null, p.value && (p.value = null);
    const w = f.querySelector(`script[src="${ii(n)}"]`);
    w && f.head.removeChild(w);
  };
  return r && !i && eg(g), i || f1(v), { scriptTag: p, load: g, unload: v };
}
var w1 = Object.defineProperty, Od = Object.getOwnPropertySymbols, C1 = Object.prototype.hasOwnProperty, _1 = Object.prototype.propertyIsEnumerable, Ed = (n, e, t) => e in n ? w1(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Md = (n, e) => {
  for (var t in e || (e = {}))
    C1.call(e, t) && Ed(n, t, e[t]);
  if (Od)
    for (var t of Od(e))
      _1.call(e, t) && Ed(n, t, e[t]);
  return n;
};
function S1(n = {}, e = {}) {
  const { navigator: t = p1 } = e, r = t, i = m1(() => r && "canShare" in r);
  return {
    isSupported: i,
    share: async (o = {}) => {
      if (i.value) {
        const a = Md(Md({}, ii(n)), ii(o));
        let l = !0;
        if (a.files && r.canShare && (l = r.canShare({ files: a.files })), l)
          return r.share(a);
      }
    }
  };
}
var x1 = Object.defineProperty, Ad = Object.getOwnPropertySymbols, k1 = Object.prototype.hasOwnProperty, T1 = Object.prototype.propertyIsEnumerable, Nd = (n, e, t) => e in n ? x1(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, O1 = (n, e) => {
  for (var t in e || (e = {}))
    k1.call(e, t) && Nd(n, t, e[t]);
  if (Ad)
    for (var t of Ad(e))
      T1.call(e, t) && Nd(n, t, e[t]);
  return n;
};
const E1 = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
O1({
  linear: c1
}, E1);
function cl(n, e, t, r = {}) {
  var i, s, o;
  const {
    clone: a = !1,
    passive: l = !1,
    eventName: c,
    deep: u = !1,
    defaultValue: f
  } = r, d = Ci(), p = t || (d == null ? void 0 : d.emit) || ((i = d == null ? void 0 : d.$emit) == null ? void 0 : i.bind(d)) || ((o = (s = d == null ? void 0 : d.proxy) == null ? void 0 : s.$emit) == null ? void 0 : o.bind(d == null ? void 0 : d.proxy));
  let h = c;
  h = c || h || `update:${e.toString()}`;
  const m = (v) => a ? a1(a) ? a(v) : g1(v) : v, g = () => o1(n[e]) ? m(n[e]) : f;
  if (l) {
    const v = g(), w = qe(v);
    return Fn(() => n[e], (b) => w.value = m(b)), Fn(w, (b) => {
      (b !== n[e] || u) && p(h, b);
    }, { deep: u }), w;
  } else
    return Ie({
      get() {
        return g();
      },
      set(v) {
        p(h, v);
      }
    });
}
class M1 {
  constructor(e, t, r, i) {
    ne(this, "loadingCache");
    this.callbackName = e, this.url = t, this.emptyValue = r, this.factories = i, this.loadingCache = i.sourceEmpty.create();
  }
  content(e) {
    this.loadingCache.give(!0);
    const t = setTimeout(() => {
      this.loadingCache.give(!1), e.give(this.emptyValue);
    }, 1e4);
    return b1(this.url, () => {
      var i;
      clearInterval(t);
      const r = ((i = window[this.callbackName]) == null ? void 0 : i.call(window)) || this.emptyValue;
      e.give(r), this.loadingCache.give(!1);
    }), e;
  }
  loading(e) {
    return this.loadingCache.value(e), e;
  }
}
class A1 {
  constructor(e) {
    this.text = e;
  }
  asString(e) {
    return e.give(this.text), e;
  }
}
class N1 {
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
var Wo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Zu(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Vc = { exports: {} }, Hl, Pd;
function P1() {
  if (Pd) return Hl;
  Pd = 1;
  var n = 1e3, e = n * 60, t = e * 60, r = t * 24, i = r * 7, s = r * 365.25;
  Hl = function(u, f) {
    f = f || {};
    var d = typeof u;
    if (d === "string" && u.length > 0)
      return o(u);
    if (d === "number" && isFinite(u))
      return f.long ? l(u) : a(u);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(u)
    );
  };
  function o(u) {
    if (u = String(u), !(u.length > 100)) {
      var f = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        u
      );
      if (f) {
        var d = parseFloat(f[1]), p = (f[2] || "ms").toLowerCase();
        switch (p) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return d * s;
          case "weeks":
          case "week":
          case "w":
            return d * i;
          case "days":
          case "day":
          case "d":
            return d * r;
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
            return d * n;
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
  function a(u) {
    var f = Math.abs(u);
    return f >= r ? Math.round(u / r) + "d" : f >= t ? Math.round(u / t) + "h" : f >= e ? Math.round(u / e) + "m" : f >= n ? Math.round(u / n) + "s" : u + "ms";
  }
  function l(u) {
    var f = Math.abs(u);
    return f >= r ? c(u, f, r, "day") : f >= t ? c(u, f, t, "hour") : f >= e ? c(u, f, e, "minute") : f >= n ? c(u, f, n, "second") : u + " ms";
  }
  function c(u, f, d, p) {
    var h = f >= d * 1.5;
    return Math.round(u / d) + " " + p + (h ? "s" : "");
  }
  return Hl;
}
function I1(n) {
  t.debug = t, t.default = t, t.coerce = l, t.disable = s, t.enable = i, t.enabled = o, t.humanize = P1(), t.destroy = c, Object.keys(n).forEach((u) => {
    t[u] = n[u];
  }), t.names = [], t.skips = [], t.formatters = {};
  function e(u) {
    let f = 0;
    for (let d = 0; d < u.length; d++)
      f = (f << 5) - f + u.charCodeAt(d), f |= 0;
    return t.colors[Math.abs(f) % t.colors.length];
  }
  t.selectColor = e;
  function t(u) {
    let f, d = null, p, h;
    function m(...g) {
      if (!m.enabled)
        return;
      const v = m, w = Number(/* @__PURE__ */ new Date()), b = w - (f || w);
      v.diff = b, v.prev = f, v.curr = w, f = w, g[0] = t.coerce(g[0]), typeof g[0] != "string" && g.unshift("%O");
      let y = 0;
      g[0] = g[0].replace(/%([a-zA-Z%])/g, (C, S) => {
        if (C === "%%")
          return "%";
        y++;
        const O = t.formatters[S];
        if (typeof O == "function") {
          const T = g[y];
          C = O.call(v, T), g.splice(y, 1), y--;
        }
        return C;
      }), t.formatArgs.call(v, g), (v.log || t.log).apply(v, g);
    }
    return m.namespace = u, m.useColors = t.useColors(), m.color = t.selectColor(u), m.extend = r, m.destroy = t.destroy, Object.defineProperty(m, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => d !== null ? d : (p !== t.namespaces && (p = t.namespaces, h = t.enabled(u)), h),
      set: (g) => {
        d = g;
      }
    }), typeof t.init == "function" && t.init(m), m;
  }
  function r(u, f) {
    const d = t(this.namespace + (typeof f > "u" ? ":" : f) + u);
    return d.log = this.log, d;
  }
  function i(u) {
    t.save(u), t.namespaces = u, t.names = [], t.skips = [];
    let f;
    const d = (typeof u == "string" ? u : "").split(/[\s,]+/), p = d.length;
    for (f = 0; f < p; f++)
      d[f] && (u = d[f].replace(/\*/g, ".*?"), u[0] === "-" ? t.skips.push(new RegExp("^" + u.slice(1) + "$")) : t.names.push(new RegExp("^" + u + "$")));
  }
  function s() {
    const u = [
      ...t.names.map(a),
      ...t.skips.map(a).map((f) => "-" + f)
    ].join(",");
    return t.enable(""), u;
  }
  function o(u) {
    if (u[u.length - 1] === "*")
      return !0;
    let f, d;
    for (f = 0, d = t.skips.length; f < d; f++)
      if (t.skips[f].test(u))
        return !1;
    for (f = 0, d = t.names.length; f < d; f++)
      if (t.names[f].test(u))
        return !0;
    return !1;
  }
  function a(u) {
    return u.toString().substring(2, u.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function l(u) {
    return u instanceof Error ? u.stack || u.message : u;
  }
  function c() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return t.enable(t.load()), t;
}
var D1 = I1;
(function(n, e) {
  e.formatArgs = r, e.save = i, e.load = s, e.useColors = t, e.storage = o(), e.destroy = /* @__PURE__ */ (() => {
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
  function r(l) {
    if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + n.exports.humanize(this.diff), !this.useColors)
      return;
    const c = "color: " + this.color;
    l.splice(1, 0, c, "color: inherit");
    let u = 0, f = 0;
    l[0].replace(/%[a-zA-Z%]/g, (d) => {
      d !== "%%" && (u++, d === "%c" && (f = u));
    }), l.splice(f, 0, c);
  }
  e.log = console.debug || console.log || (() => {
  });
  function i(l) {
    try {
      l ? e.storage.setItem("debug", l) : e.storage.removeItem("debug");
    } catch {
    }
  }
  function s() {
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
  n.exports = D1(e);
  const { formatters: a } = n.exports;
  a.j = function(l) {
    try {
      return JSON.stringify(l);
    } catch (c) {
      return "[UnexpectedJSONParseError]: " + c.message;
    }
  };
})(Vc, Vc.exports);
var de = Vc.exports;
const ng = /* @__PURE__ */ Zu(de), L1 = de.debug("TextNlAsBr");
class R1 {
  constructor(e, t) {
    this.baseText = e, this.factories = t;
  }
  asString(e) {
    return this.baseText.asString(
      this.factories.guestInTheMiddle.create(e, (t) => {
        if (typeof t > "u" || t === null)
          return "";
        const r = "<br />";
        return L1(t), e.give((t ?? "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, `$1${r}$2`)), !0;
      })
    ), e;
  }
}
const F1 = new Be(No), $1 = new Be(No), B1 = new Be(Qi), j1 = new Be(ti), V1 = new Be(gs), z1 = new Be(Ju), H1 = new Be(al), G1 = new Be(Hb), W1 = new Be(Kb), U1 = new Be(gs), K1 = new Be(Vb), Y1 = new Be(zb), Fr = {
  cache: F1,
  chain: K1,
  guest: j1,
  guestCast: V1,
  guestAware: z1,
  guestInTheMiddle: U1,
  guestSync: Y1,
  patron: G1,
  patronOnce: W1,
  pool: H1,
  source: $1,
  sourceEmpty: B1
}, q1 = new Be(Jb), X1 = new Be(Qb), J1 = new Be(e1), Q1 = new Be(Zb), rg = new Be(t1), Z1 = new Be(n1, { ...Fr, svgImage: rg }), ew = new Be(r1, Fr), tw = new Be(i1, Fr), nw = new Be(s1, Fr), rw = new Be(M1, Fr), iw = new Be(A1), sw = new Be(N1, Fr), ow = new Be(R1, Fr), aw = {
  ...Fr,
  fileHandlerContent: q1,
  browserFileSaved: X1,
  transformToString: J1,
  transformToObject: Q1,
  svgImage: rg,
  svgMapTypeImage: Z1,
  numberChunks: ew,
  mapNameFromUrl: tw,
  textNoHtml: nw,
  jsonp: rw,
  textOf: iw,
  textNlAsBr: ow,
  textWithoutHTML: sw
}, zt = () => aw;
class ef {
  constructor(e, t, r) {
    this.notification = e, this.check = t, this.factories = r;
  }
  breakOnFail(e, t) {
    return this.check.check(
      e,
      this.factories.guest.create((r) => {
        r === !0 ? t.give(!0) : this.notification.give({
          type: "error",
          text: r
        });
      })
    ), this;
  }
  continueOnFail(e, t) {
    return this.check.check(
      e,
      this.factories.guest.create((r) => {
        t.give(r), r !== !0 && this.notification.give({
          type: "error",
          text: r
        });
      })
    ), this;
  }
}
const Gl = de.debug("MapCurrent");
class ig {
  constructor(e, t, r) {
    ne(this, "objectsCache");
    ne(this, "settingsCache");
    ne(this, "typesCache");
    this.mapFile = e, this.mapId = t, this.factories = r, this.objectsCache = r.sourceEmpty.create(), this.settingsCache = r.sourceEmpty.create(), this.typesCache = r.sourceEmpty.create(), e.currentMap(
      r.patron.create(
        r.guest.create((i) => {
          Gl("current map changed", i), this.settingsCache.give(i.settings), this.objectsCache.give(Object.values(i.objects)), this.typesCache.give(
            Object.entries(i.types).map(([s, o]) => ({
              ...o,
              id: s
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
    return Gl("notify about new objects"), this.objectsCache.value(e), e;
  }
  types(e) {
    return this.typesCache.value(e), e;
  }
  give(e) {
    return Gl("save map document", e), this.mapId.id(
      this.factories.guest.create((t) => {
        this.mapFile.mapFile(
          this.factories.guest.create((r) => {
            this.mapFile.give({
              ...r,
              [t]: e
            });
          })
        );
      })
    ), this;
  }
}
class lw {
  constructor(e) {
    ne(this, "idCache");
    this.idCache = e.cache.create("current");
  }
  id(e) {
    return this.idCache.value(e), e;
  }
  give(e) {
    return this.idCache.give(e), this;
  }
}
class cw {
  constructor(e) {
    this.mapFile = e;
  }
  value(e) {
    return this.mapFile.currentMap(
      new gs(e, (t) => {
        e.give(t.settings.title);
      })
    ), this;
  }
}
const Uo = de.debug("MapHistory"), Id = (n) => {
  const e = JSON.parse(JSON.stringify(n));
  return Object.values(e.objects).forEach((t) => {
    t.width = 0, t.height = 0;
  }), JSON.stringify(e);
};
class uw {
  constructor(e, t, r, i) {
    ne(this, "mapsHistory");
    ne(this, "historyIndex");
    this.mapFile = e, this.map = t, this.mapId = r, this.factories = i, this.mapsHistory = i.cache.create([]), this.historyIndex = i.cache.create(0), this.mapFile.currentMap(i.patron.create(this)), this.mapId.id(
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
            this.factories.guest.create((r) => {
              Uo("add map to history", r, e);
              const i = r.some(
                (s) => Id(s) === Id(e)
              );
              if (Uo("isMapFromHistory", i), !i) {
                const s = r[t] ? [r[t]] : [];
                this.historyIndex.give(0), this.mapsHistory.give([e, ...s, ...r.slice(0, 9)]);
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
        ({ historyIndex: r, mapsHistory: i }) => {
          const s = r < i.length - 1;
          Uo("recalculate is prev possible", s), e.give(s);
        }
      )
    ), e;
  }
  prev() {
    this.historyIndex.value(
      this.factories.guest.create((e) => {
        const t = e + 1;
        this.historyIndex.give(t), this.mapsHistory.value(
          this.factories.guest.create((r) => {
            const i = r[t];
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
        ({ historyIndex: r, mapsHistory: i }) => {
          const s = r > 0 && r <= i.length - 1;
          Uo("recalculate is next possible", s), e.give(s);
        }
      )
    ), e;
  }
  next() {
    this.historyIndex.value(
      this.factories.guest.create((e) => {
        const t = e - 1;
        this.historyIndex.give(t), this.mapsHistory.value(
          this.factories.guest.create((r) => {
            const i = r[t];
            this.map.give(i);
          })
        );
      })
    );
  }
}
class fw {
  constructor(e, t, r) {
    this.mapFile = e, this.mapId = t, this.factories = r;
  }
  give(e) {
    const { guest: t } = this.factories;
    return this.mapFile.mapFile(
      t.create((r) => {
        delete r[e], this.mapFile.give(r), this.mapId.give("current");
      })
    ), this;
  }
}
const Ko = de.debug("MapFileOfContent");
class dw {
  constructor(e, t, r) {
    ne(this, "currentMapPatrons");
    ne(this, "mapFileCache");
    this.mapFileContent = e, this.mapId = t, this.factories = r, this.currentMapPatrons = r.pool.create(this), this.mapFileCache = r.cache.create(!1), e.value(
      r.patron.create((i) => {
        if (!i)
          return;
        const s = this.factories.transformToObject.create(i).result();
        Ko("get map file", s), this.mapFileCache.give(s);
      })
    );
  }
  currentMap(e) {
    const t = this.factories.chain.create();
    return this.mapId.id(this.factories.guestCast.create(e, t.receiveKey("mapId"))), this.mapFile(this.factories.guestCast.create(e, t.receiveKey("mapFile"))), t.result(
      this.factories.guestInTheMiddle.create(
        e,
        ({ mapId: r, mapFile: i }) => {
          if (Ko("get current map", r, i, typeof i), !i[r])
            this.createEmptyMapByName(r, e);
          else {
            const s = i[r];
            this.currentMapPatrons.distribute(
              s != null && s.structure ? s.structure : s,
              e
            );
          }
        }
      )
    ), e;
  }
  give(e) {
    return Ko("save map file document", e), this.mapFileContent.give(this.factories.transformToString.create(e).result()), this;
  }
  mapFile(e) {
    return this.mapFileCache.value(e), e;
  }
  createEmptyMapByName(e, t) {
    Ko("creating empty map by name", e);
    const r = this.factories.transformToObject.create(this.generateEmptyMapFile()).result();
    this.mapFile(
      this.factories.guest.create((i) => {
        this.give({
          ...i,
          [e]: r.current
        }), t.give(r.current);
      })
    );
  }
  generateEmptyMapFile() {
    return '{"current":{"progress":0,"settings":{"colored":false,"title":"current"},"objects":{},"types":{},"url":"/current","parent":""}}';
  }
}
const hw = de.debug("MapFileForRendering");
class pw {
  constructor(e, t, r) {
    ne(this, "mapCache");
    this.mapId = t, this.factories = r, this.mapCache = r.cache.create({ objects: {}, types: {}, settings: {} }), e.currentMap(r.patron.create(this.mapCache));
  }
  currentMap(e) {
    return this.mapCache.value(e), e;
  }
  mapFile(e) {
    return this.mapCache.value(
      this.factories.guestInTheMiddle.create(e, (t) => {
        this.mapId.id(
          this.factories.guest.create((r) => {
            e.give({ [r]: t });
          })
        );
      })
    ), e;
  }
  give(e) {
    return this.mapId.id(
      this.factories.guest.create((t) => {
        hw("received map file, objects = ", e[t].objects), this.mapCache.give(e[t]);
      })
    ), this;
  }
}
class sg {
  constructor(e, t, r) {
    this.map = e, this.mapFile = t, this.factories = r;
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
const Dd = ng("app:MapObjectCurrent");
class mw {
  constructor(e, t) {
    ne(this, "idCache");
    ne(this, "silenceActivator");
    this.drawer = e, this.factories = t, this.idCache = t.sourceEmpty.create(), this.silenceActivator = t.source.create(!1), this.idCache.value(
      t.patron.create(
        t.guest.create((r) => {
          r && e.give("object");
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
    return Dd("new value current object", e), this.silenceActivator.value(
      this.factories.guest.create((t) => {
        Dd("silence activator", t), t ? t.give(e) : this.idCache.give(e);
      })
    ), this;
  }
}
class gw {
  constructor(e, t) {
    this.mapFile = e, this.factories = t;
  }
  check(e, t) {
    return this.mapFile.currentMap(
      this.factories.guest.create((r) => {
        let i = !1;
        Object.values(r.objects).forEach((s) => {
          i = i || s.arrows.some((o) => o.id === e.id);
        }), t.give(!i || "У объекта есть входящие связи!");
      })
    ), this;
  }
}
const Wl = de.debug("MapObjectNew");
class yw {
  constructor(e, t, r, i, s) {
    this.map = e, this.mapObject = t, this.canvas = r, this.stagePosition = i, this.factories = s;
  }
  byTypeName(e, t) {
    return Wl("start to add new type", e, t), this.stagePosition.position(
      this.factories.guest.create((r) => {
        this.map.types(
          this.factories.guest.create((i) => {
            this.canvas.canvas(
              this.factories.guest.create((s) => {
                const o = s.getBoundingClientRect(), a = i.find((u) => u.id === e);
                Wl("is type found", a);
                const l = t.x - o.left, c = t.y - o.top;
                a && (Wl("add new type"), this.mapObject.give({
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
                    l > 0 ? l + r.x : 0,
                    c > 0 ? c + r.y : 0
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
class vw {
  constructor(e, t) {
    this.mapId = e, this.factories = t;
  }
  names(e) {
    return this.mapId.id(
      this.factories.guestInTheMiddle.create(e, (t) => {
        const r = t.split("_").filter((o) => !!o);
        let i = "";
        const s = r.map((o) => {
          const a = `${i}${o}`;
          return i || (i = "_"), i += `${o}_`, a;
        });
        i = "", e.give(s);
      })
    ), e;
  }
}
class bw {
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
class ww {
  constructor(e, t, r, i) {
    this.map = e, this.mapFile = t, this.checks = r, this.factories = i;
  }
  give(e) {
    const t = this.factories.chain.create(this);
    return this.checks.forEach((r, i) => {
      r.breakOnFail(e, t.receiveKey(String(i)));
    }), t.result(
      this.factories.guest.create(() => {
        this.mapFile.currentMap(
          this.factories.guest.create((r) => {
            delete r.objects[e.id], this.map.give(r);
          })
        );
      })
    ), this;
  }
}
const Cw = de.debug("MapObjectsLink");
class _w {
  constructor(e, t, r, i, s) {
    ne(this, "objectIdsCache");
    this.mapObjectCurrent = e, this.map = t, this.mapObject = r, this.newArrow = i, this.factories = s, this.objectIdsCache = s.cache.create([]);
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
          this.factories.guest.create((r) => {
            t.push(r), this.objectIdsCache.give([...t]), Cw("object ids", t), t.length === 2 && this.map.objects(
              this.factories.guest.create((i) => {
                const [, s] = t, o = i.find((a) => a.id === s);
                o && this.newArrow.forObject(o);
              })
            ), t.length === 3 && (this.newArrow.dispose(), this.mapObjectCurrent.silenceOff(), this.map.objects(
              this.factories.guest.create((i) => {
                const [, s, o] = t, a = i.find((l) => l.id === s);
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
function Sw(n) {
  var e = typeof n;
  return n != null && (e == "object" || e == "function");
}
var tf = Sw, xw = typeof Wo == "object" && Wo && Wo.Object === Object && Wo, kw = xw, Tw = kw, Ow = typeof self == "object" && self && self.Object === Object && self, Ew = Tw || Ow || Function("return this")(), og = Ew, Mw = og, Aw = function() {
  return Mw.Date.now();
}, Nw = Aw, Pw = /\s/;
function Iw(n) {
  for (var e = n.length; e-- && Pw.test(n.charAt(e)); )
    ;
  return e;
}
var Dw = Iw, Lw = Dw, Rw = /^\s+/;
function Fw(n) {
  return n && n.slice(0, Lw(n) + 1).replace(Rw, "");
}
var $w = Fw, Bw = og, jw = Bw.Symbol, ag = jw, Ld = ag, lg = Object.prototype, Vw = lg.hasOwnProperty, zw = lg.toString, ks = Ld ? Ld.toStringTag : void 0;
function Hw(n) {
  var e = Vw.call(n, ks), t = n[ks];
  try {
    n[ks] = void 0;
    var r = !0;
  } catch {
  }
  var i = zw.call(n);
  return r && (e ? n[ks] = t : delete n[ks]), i;
}
var Gw = Hw, Ww = Object.prototype, Uw = Ww.toString;
function Kw(n) {
  return Uw.call(n);
}
var Yw = Kw, Rd = ag, qw = Gw, Xw = Yw, Jw = "[object Null]", Qw = "[object Undefined]", Fd = Rd ? Rd.toStringTag : void 0;
function Zw(n) {
  return n == null ? n === void 0 ? Qw : Jw : Fd && Fd in Object(n) ? qw(n) : Xw(n);
}
var eC = Zw;
function tC(n) {
  return n != null && typeof n == "object";
}
var nC = tC, rC = eC, iC = nC, sC = "[object Symbol]";
function oC(n) {
  return typeof n == "symbol" || iC(n) && rC(n) == sC;
}
var aC = oC, lC = $w, $d = tf, cC = aC, Bd = NaN, uC = /^[-+]0x[0-9a-f]+$/i, fC = /^0b[01]+$/i, dC = /^0o[0-7]+$/i, hC = parseInt;
function pC(n) {
  if (typeof n == "number")
    return n;
  if (cC(n))
    return Bd;
  if ($d(n)) {
    var e = typeof n.valueOf == "function" ? n.valueOf() : n;
    n = $d(e) ? e + "" : e;
  }
  if (typeof n != "string")
    return n === 0 ? n : +n;
  n = lC(n);
  var t = fC.test(n);
  return t || dC.test(n) ? hC(n.slice(2), t ? 2 : 8) : uC.test(n) ? Bd : +n;
}
var mC = pC, gC = tf, Ul = Nw, jd = mC, yC = "Expected a function", vC = Math.max, bC = Math.min;
function wC(n, e, t) {
  var r, i, s, o, a, l, c = 0, u = !1, f = !1, d = !0;
  if (typeof n != "function")
    throw new TypeError(yC);
  e = jd(e) || 0, gC(t) && (u = !!t.leading, f = "maxWait" in t, s = f ? vC(jd(t.maxWait) || 0, e) : s, d = "trailing" in t ? !!t.trailing : d);
  function p(C) {
    var S = r, O = i;
    return r = i = void 0, c = C, o = n.apply(O, S), o;
  }
  function h(C) {
    return c = C, a = setTimeout(v, e), u ? p(C) : o;
  }
  function m(C) {
    var S = C - l, O = C - c, T = e - S;
    return f ? bC(T, s - O) : T;
  }
  function g(C) {
    var S = C - l, O = C - c;
    return l === void 0 || S >= e || S < 0 || f && O >= s;
  }
  function v() {
    var C = Ul();
    if (g(C))
      return w(C);
    a = setTimeout(v, m(C));
  }
  function w(C) {
    return a = void 0, d && r ? p(C) : (r = i = void 0, o);
  }
  function b() {
    a !== void 0 && clearTimeout(a), c = 0, r = l = i = a = void 0;
  }
  function y() {
    return a === void 0 ? o : w(Ul());
  }
  function k() {
    var C = Ul(), S = g(C);
    if (r = arguments, i = this, l = C, S) {
      if (a === void 0)
        return h(l);
      if (f)
        return clearTimeout(a), a = setTimeout(v, e), p(l);
    }
    return a === void 0 && (a = setTimeout(v, e)), o;
  }
  return k.cancel = b, k.flush = y, k;
}
var cg = wC;
const ys = /* @__PURE__ */ Zu(cg), CC = (n) => {
  if (n[n.length - 1] === "/") {
    const e = n.split("");
    return e.splice(e.length - 1, 1), e.join("");
  }
  return n;
}, _C = ys((n) => {
  window == null || window.open(n);
}, 200), Kl = de.debug("MapObjectUrl");
class SC {
  constructor(e, t) {
    this.mapId = e, this.factories = t;
  }
  open(e, t) {
    if (e != null && e.linked) {
      const r = e.outlink;
      e.targetBlank ? _C(r) : (Kl("open new map", r), this.factories.mapNameFromUrl.create(
        this.factories.source.create(r)
      ).name(
        this.factories.guest.create((s) => {
          Kl("open map name", r, s), t.give(s);
        })
      ));
    }
    return this;
  }
  url(e, t) {
    return e.value(
      this.factories.guestInTheMiddle.create(t, (r) => {
        this.mapId.id(
          this.factories.guest.create((i) => {
            const s = i[0] === "_" ? i.replaceAll("_", "/") : "/current", o = r.name ? r.name : r.additionalName ? r.additionalName : "";
            this.factories.textNoHtml.create(this.factories.source.create(o)).noHtml(
              this.factories.guest.create((a) => {
                let l = r.outlink ? r.outlink : `${s}/${xC(a)}`;
                Kl("link is", l), l = CC(l), t.give(l);
              })
            );
          })
        );
      })
    ), t;
  }
}
function xC(n) {
  return n.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}
const kC = de.debug("ObjectPositionBounds");
class TC {
  constructor(e, t) {
    this.stageSize = e, this.factories = t;
  }
  position(e, t, r) {
    return this.stageSize.value(
      this.factories.guestInTheMiddle.create(r, (i) => {
        let { x: s, y: o } = t;
        s < 30 && (s = 30), o < 30 && (o = 30);
        const a = i.width - e.width;
        s > a && (s = a);
        const l = i.height - e.height;
        o > l && (o = l), kC("position", s, o), r.give({ x: s, y: o });
      })
    ), r;
  }
}
const Yo = 15;
class OC {
  constructor(e, t) {
    this.baseRestriction = e, this.factories = t;
  }
  position(e, t, r) {
    return this.baseRestriction.position(
      e,
      t,
      this.factories.guestInTheMiddle.create(r, (i) => {
        r.give({
          x: Math.round(i.x / Yo) * Yo,
          y: Math.round(i.y / Yo) * Yo
        });
      })
    ), r;
  }
}
const Vd = {
  x: "width",
  y: "height"
}, Yl = {
  x: 0,
  y: 1
}, EC = {
  positive: 1,
  negative: -1
}, zd = de.debug("ObjectsOutsideScreen");
class MC {
  constructor(e, t, r, i) {
    this.map = e, this.stageSize = t, this.layer = r, this.factories = i;
  }
  count(e, t) {
    const r = e.direction === "positive", i = this.factories.chain.create();
    return this.map.objects(this.factories.guestCast.create(t, i.receiveKey("objects"))), this.layer.layer(this.factories.guestCast.create(t, i.receiveKey("layer"))), this.layer.position(this.factories.guestCast.create(t, i.receiveKey("position"))), i.result(
      this.factories.guestInTheMiddle.create(
        t,
        ({ objects: s, layer: o, position: a }) => {
          var f;
          const l = EC[e.direction], u = s.sort(
            (d, p) => d.position[Yl[e.axis]] * l - p.position[Yl[e.axis]] * l
          ).filter((d) => {
            const p = d.position[Yl[e.axis]] + (r ? 0 : d[Vd[e.axis]]), h = a[e.axis] * -1 + (r ? o[Vd[e.axis]]() : 0);
            return zd(
              "mb nearest points",
              e.direction,
              "objectP=",
              p,
              "screenP=",
              h
            ), r ? p > h : p < h;
          });
          zd("nearest", u), t.give({
            count: u.length,
            nearestObjectId: ((f = u.at(r ? -1 : 0)) == null ? void 0 : f.id) ?? ""
          });
        }
      )
    ), t;
  }
}
class AC {
  constructor(e, t, r) {
    this.mapFile = e, this.map = t, this.factories = r;
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
class NC {
  constructor(e) {
    ne(this, "idCache");
    this.idCache = e.sourceEmpty.create();
  }
  typeId(e) {
    return this.idCache.value(e), e;
  }
  give(e) {
    return this.idCache.give(e), this;
  }
}
class PC {
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
class IC {
  constructor(e, t, r, i) {
    this.map = e, this.mapFile = t, this.checks = r, this.factories = i;
  }
  give(e) {
    const t = this.factories.chain.create(this);
    return this.checks.forEach((r, i) => {
      r.breakOnFail(
        {
          name: e.id,
          type: e
        },
        t.receiveKey(String(i))
      );
    }), t.result(
      this.factories.guest.create(() => {
        this.mapFile.currentMap(
          this.factories.guest.create((r) => {
            delete r.types[e.id], this.map.give(r);
          })
        );
      })
    ), this;
  }
}
class DC {
  constructor(e, t, r, i) {
    this.map = e, this.mapFile = t, this.checks = r, this.factories = i;
  }
  give(e) {
    const t = this.factories.chain.create(this);
    return this.checks.forEach((r, i) => {
      r.breakOnFail(e, t.receiveKey(String(i)));
    }), t.result(
      this.factories.guest.create(() => {
        this.mapFile.currentMap(
          this.factories.guest.create((r) => {
            delete r.types[e.name], this.map.give({
              ...r,
              types: {
                ...r.types,
                [e.type.name]: e.type
              }
            });
          })
        );
      })
    ), this;
  }
}
const LC = de.debug("MapTypeUsed");
class RC {
  constructor(e, t) {
    this.mapFile = e, this.factories = t;
  }
  check(e, t) {
    return this.mapFile.currentMap(
      this.factories.guest.create((r) => {
        const i = Object.values(r.objects).some(
          (s) => s.type === e.name
        );
        LC("is type used", i), t.give(!i || "Тип карты использован");
      })
    ), this;
  }
}
class FC {
  constructor(e, t) {
    this.mapTypeUsedCheck = e, this.factories = t;
  }
  check(e, t) {
    return this.mapTypeUsedCheck.check(
      e,
      this.factories.guest.create((r) => {
        r !== !0 && e.name !== e.type.name ? t.give("Нельзя изменять имя типа, который использован!") : t.give(!0);
      })
    ), this;
  }
}
const Hd = de.debug("ParentTypes");
class $C {
  constructor(e, t, r) {
    this.parentNames = e, this.mapFile = t, this.factories = r;
  }
  types(e) {
    Hd("parent types requested");
    const t = this.factories.chain.create();
    return this.parentNames.names(this.factories.guestCast.create(e, t.receiveKey("parentNames"))), this.mapFile.mapFile(this.factories.guestCast.create(e, t.receiveKey("mapFile"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ parentNames: r, mapFile: i }) => {
        const s = r.slice(0, -1);
        Hd("parent names", s);
        const o = {};
        s.map((l) => i[l]).forEach((l) => {
          Object.values(l.types).forEach((c) => {
            o[c.name] = c;
          });
        }), e.give(Object.values(o));
      })
    ), e;
  }
}
const Gd = de.debug("ObjectsMatchedToQuery");
class BC {
  constructor(e, t) {
    this.map = e, this.factories = t;
  }
  objects(e, t) {
    return e.value(
      this.factories.guestInTheMiddle.create(
        t,
        ys((i) => {
          i = i.toLowerCase(), this.map.objects(
            this.factories.guest.create((s) => {
              if (!i) {
                Gd("reset results"), t.give([]);
                return;
              }
              const o = s.filter(
                (a) => {
                  var l;
                  return a.name.toLowerCase().includes(i) || ((l = a.additionalName) == null ? void 0 : l.toLowerCase().includes(i)) || Object.values(a.additionalFields ?? {}).join(" ").toLowerCase().includes(i);
                }
              );
              Gd("objects in searching", o, i), t.give(o);
            })
          );
        }, 500)
      )
    ), t;
  }
}
const jC = {
  height: 3e3,
  width: 3e3
};
class VC {
  value(e) {
    return e.give(jC), e;
  }
}
const Wd = de.debug("StageMoveRestriction");
class zC {
  constructor(e, t, r) {
    this.canvasDep = e, this.stageSize = t, this.factories = r;
  }
  position(e, t) {
    return this.canvasDep.canvas(
      this.factories.guest.create((r) => {
        this.stageSize.value(
          this.factories.guest.create((i) => {
            Wd("income position", e);
            const s = i.width - r.clientWidth, o = i.height - r.clientHeight, a = e.x * -1, l = e.y * -1;
            if (o < 0 || s < 0)
              return { x: 0, y: 0 };
            Wd("boundings", o, s, l, a), t.give({
              x: e.x > 0 ? 0 : a > s ? s * -1 : e.x,
              y: e.y > 0 ? 0 : l > o ? o * -1 : e.y
            });
          })
        );
      })
    ), t;
  }
}
const Ts = de.debug("app:MapObjectsVisible");
class HC {
  constructor(e, t, r, i) {
    ne(this, "visibleObjectsCache", new Qi());
    Ts("constructor initialized");
    const s = i.chain.create();
    t.size(i.patron.create(s.receiveKey("size"))), e.position(i.patron.create(s.receiveKey("position"))), r.currentMap(i.patron.create(s.receiveKey("map"))), s.result(
      i.patron.create(
        i.guest.create(({ position: o, size: a, map: l }) => {
          const c = Object.values(l.objects);
          Ts("objects come to result", c);
          const u = c.filter((f) => {
            const d = l.types[f.type] ?? {}, p = {
              width: f.width || d.width,
              height: f.height || d.height
            };
            return this.isInBounding(o, a, f.position, p);
          });
          Ts("visible objects calculated", u), this.visibleObjectsCache.give(u);
        })
      )
    );
  }
  objects(e) {
    return this.visibleObjectsCache.value(e), this;
  }
  isInBounding(e, t, r, i) {
    const s = e.x, o = e.x - t.width, a = e.y, l = e.y - t.height, [c, u] = r;
    return Ts("bounding vars", s, o, a, l), Ts("object position", r), s > -c - i.width && -c > o && a > -u - i.height && -u > l;
  }
}
const GC = (n, e) => {
  const t = n.matchAll(e);
  return Array.from(t).map((r) => r[1]);
}, WC = (n, e) => n.reduce((t, r) => (t[r] = e[r] || r, t), {});
class UC {
  constructor(e, t, r, i) {
    this.mapFile = t, this.mapObject = r, this.factories = i, e.objectId(this);
  }
  give(e) {
    return this.mapFile.currentMap(
      this.factories.guest.create((t) => {
        const r = t.objects[e];
        if (!r)
          return;
        const i = t.types[r.type], s = /\$\{([a-zA-Z1-9]+)\}/g, a = GC(i.svg, s).filter((l) => l !== "width" && l !== "height");
        r.additionalFields = WC(a, r.additionalFields ?? {}), this.mapObject.give(r);
      })
    ), this;
  }
  introduction() {
    return "patron";
  }
}
class KC {
  constructor() {
    ne(this, "filledPoints", /* @__PURE__ */ new Map());
  }
  clear() {
    this.filledPoints.clear();
  }
  breakPoints(e, t, r) {
    const i = this.arrowPointPosition(
      e.shapeGeometry,
      e.shapePosition,
      e.lookToGeometry,
      e.lookToPosition
    ), s = this.arrowPointPosition(
      t.shapeGeometry,
      t.shapePosition,
      t.lookToGeometry,
      t.lookToPosition
    );
    return r.give([
      +i.point.x + i.shift.x,
      +i.point.y + i.shift.y,
      +i.breakPoint.x + i.shift.x,
      +i.breakPoint.y + i.shift.y,
      +s.breakPoint.x + s.shift.x,
      +s.breakPoint.y + s.shift.y,
      +s.point.x + s.shift.x,
      +s.point.y + s.shift.y
    ]), this;
  }
  arrowPointPosition(e, t, r, i) {
    const s = {
      x: +i.x + Math.round(r.width / 2),
      y: +i.y + Math.round(r.height / 2)
    }, o = {
      x: +t.x + Math.round(e.width / 2),
      y: +t.y + Math.round(e.height / 2)
    }, a = o.x - s.x, l = o.y - s.y, c = Math.abs(l) > Math.abs(a);
    let u = +t.x, f = +t.y;
    const d = c && l >= 0, p = !c && a >= 0, h = c && l < 0, m = !c && a < 0, g = { x: 0, y: 0 };
    let v = 0, w = 0;
    d ? (u += Math.round(e.width / 2), g.x = u, g.y = (t.y + i.y + r.height) / 2, v = i.x > t.x ? 1 : -1) : m ? (f += Math.round(e.height / 2), u += +e.width, g.x = (t.x + e.width + i.x) / 2, g.y = f, w = i.y > t.y ? 1 : -1) : h ? (u += Math.round(e.width / 2), f += +e.height, g.x = u, g.y = (t.y + e.height + i.y) / 2, v = i.x > t.x ? 1 : -1) : p && (f += Math.round(e.height / 2), g.x = (t.x + i.x + r.width) / 2, g.y = f, w = i.y > t.y ? 1 : -1);
    const b = [u, f].join("-"), y = this.filledPoints.get(b) || 0;
    return this.filledPoints.set(b, y + 1), {
      point: { x: u, y: f },
      breakPoint: g,
      shift: {
        x: v * y * 10,
        y: w * y * 10
      }
    };
  }
}
var YC = Math.PI / 180;
function qC() {
  return typeof window < "u" && ({}.toString.call(window) === "[object Window]" || {}.toString.call(window) === "[object global]");
}
const ql = typeof global < "u" ? global : typeof window < "u" ? window : typeof WorkerGlobalScope < "u" ? self : {}, se = {
  _global: ql,
  version: "8.4.3",
  isBrowser: qC(),
  isUnminified: /param/.test((function(n) {
  }).toString()),
  dblClickWindow: 400,
  getAngle(n) {
    return se.angleDeg ? n * YC : n;
  },
  enableTrace: !1,
  pointerEventsEnabled: !0,
  autoDrawEnabled: !0,
  hitOnDragEnabled: !1,
  capturePointerEventsEnabled: !1,
  _mouseListenClick: !1,
  _touchListenClick: !1,
  _pointerListenClick: !1,
  _mouseInDblClickWindow: !1,
  _touchInDblClickWindow: !1,
  _pointerInDblClickWindow: !1,
  _mouseDblClickPointerId: null,
  _touchDblClickPointerId: null,
  _pointerDblClickPointerId: null,
  pixelRatio: typeof window < "u" && window.devicePixelRatio || 1,
  dragDistance: 3,
  angleDeg: !0,
  showWarnings: !0,
  dragButtons: [0, 1],
  isDragging() {
    return se.DD.isDragging;
  },
  isDragReady() {
    return !!se.DD.node;
  },
  releaseCanvasOnDestroy: !0,
  document: ql.document,
  _injectGlobal(n) {
    ql.Konva = n;
  }
}, vs = (n) => {
  se[n.prototype.getClassName()] = n;
};
se._injectGlobal(se);
let Rs = class ug {
  constructor(e = [1, 0, 0, 1, 0, 0]) {
    this.dirty = !1, this.m = e && e.slice() || [1, 0, 0, 1, 0, 0];
  }
  reset() {
    this.m[0] = 1, this.m[1] = 0, this.m[2] = 0, this.m[3] = 1, this.m[4] = 0, this.m[5] = 0;
  }
  copy() {
    return new ug(this.m);
  }
  copyInto(e) {
    e.m[0] = this.m[0], e.m[1] = this.m[1], e.m[2] = this.m[2], e.m[3] = this.m[3], e.m[4] = this.m[4], e.m[5] = this.m[5];
  }
  point(e) {
    var t = this.m;
    return {
      x: t[0] * e.x + t[2] * e.y + t[4],
      y: t[1] * e.x + t[3] * e.y + t[5]
    };
  }
  translate(e, t) {
    return this.m[4] += this.m[0] * e + this.m[2] * t, this.m[5] += this.m[1] * e + this.m[3] * t, this;
  }
  scale(e, t) {
    return this.m[0] *= e, this.m[1] *= e, this.m[2] *= t, this.m[3] *= t, this;
  }
  rotate(e) {
    var t = Math.cos(e), r = Math.sin(e), i = this.m[0] * t + this.m[2] * r, s = this.m[1] * t + this.m[3] * r, o = this.m[0] * -r + this.m[2] * t, a = this.m[1] * -r + this.m[3] * t;
    return this.m[0] = i, this.m[1] = s, this.m[2] = o, this.m[3] = a, this;
  }
  getTranslation() {
    return {
      x: this.m[4],
      y: this.m[5]
    };
  }
  skew(e, t) {
    var r = this.m[0] + this.m[2] * t, i = this.m[1] + this.m[3] * t, s = this.m[2] + this.m[0] * e, o = this.m[3] + this.m[1] * e;
    return this.m[0] = r, this.m[1] = i, this.m[2] = s, this.m[3] = o, this;
  }
  multiply(e) {
    var t = this.m[0] * e.m[0] + this.m[2] * e.m[1], r = this.m[1] * e.m[0] + this.m[3] * e.m[1], i = this.m[0] * e.m[2] + this.m[2] * e.m[3], s = this.m[1] * e.m[2] + this.m[3] * e.m[3], o = this.m[0] * e.m[4] + this.m[2] * e.m[5] + this.m[4], a = this.m[1] * e.m[4] + this.m[3] * e.m[5] + this.m[5];
    return this.m[0] = t, this.m[1] = r, this.m[2] = i, this.m[3] = s, this.m[4] = o, this.m[5] = a, this;
  }
  invert() {
    var e = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]), t = this.m[3] * e, r = -this.m[1] * e, i = -this.m[2] * e, s = this.m[0] * e, o = e * (this.m[2] * this.m[5] - this.m[3] * this.m[4]), a = e * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
    return this.m[0] = t, this.m[1] = r, this.m[2] = i, this.m[3] = s, this.m[4] = o, this.m[5] = a, this;
  }
  getMatrix() {
    return this.m;
  }
  decompose() {
    var e = this.m[0], t = this.m[1], r = this.m[2], i = this.m[3], s = this.m[4], o = this.m[5], a = e * i - t * r;
    let l = {
      x: s,
      y: o,
      rotation: 0,
      scaleX: 0,
      scaleY: 0,
      skewX: 0,
      skewY: 0
    };
    if (e != 0 || t != 0) {
      var c = Math.sqrt(e * e + t * t);
      l.rotation = t > 0 ? Math.acos(e / c) : -Math.acos(e / c), l.scaleX = c, l.scaleY = a / c, l.skewX = (e * r + t * i) / a, l.skewY = 0;
    } else if (r != 0 || i != 0) {
      var u = Math.sqrt(r * r + i * i);
      l.rotation = Math.PI / 2 - (i > 0 ? Math.acos(-r / u) : -Math.acos(r / u)), l.scaleX = a / u, l.scaleY = u, l.skewX = 0, l.skewY = (e * r + t * i) / a;
    }
    return l.rotation = N._getRotation(l.rotation), l;
  }
};
var XC = "[object Array]", JC = "[object Number]", QC = "[object String]", ZC = "[object Boolean]", e_ = Math.PI / 180, t_ = 180 / Math.PI, Xl = "#", n_ = "", r_ = "0", i_ = "Konva warning: ", Ud = "Konva error: ", s_ = "rgb(", Jl = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 132, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 255, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  grey: [128, 128, 128],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 203],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  rebeccapurple: [102, 51, 153],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [119, 128, 144],
  slategrey: [119, 128, 144],
  snow: [255, 255, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  transparent: [255, 255, 255, 0],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 5]
}, o_ = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/, qo = [];
const a_ = typeof requestAnimationFrame < "u" && requestAnimationFrame || function(n) {
  setTimeout(n, 60);
}, N = {
  _isElement(n) {
    return !!(n && n.nodeType == 1);
  },
  _isFunction(n) {
    return !!(n && n.constructor && n.call && n.apply);
  },
  _isPlainObject(n) {
    return !!n && n.constructor === Object;
  },
  _isArray(n) {
    return Object.prototype.toString.call(n) === XC;
  },
  _isNumber(n) {
    return Object.prototype.toString.call(n) === JC && !isNaN(n) && isFinite(n);
  },
  _isString(n) {
    return Object.prototype.toString.call(n) === QC;
  },
  _isBoolean(n) {
    return Object.prototype.toString.call(n) === ZC;
  },
  isObject(n) {
    return n instanceof Object;
  },
  isValidSelector(n) {
    if (typeof n != "string")
      return !1;
    var e = n[0];
    return e === "#" || e === "." || e === e.toUpperCase();
  },
  _sign(n) {
    return n === 0 || n > 0 ? 1 : -1;
  },
  requestAnimFrame(n) {
    qo.push(n), qo.length === 1 && a_(function() {
      const e = qo;
      qo = [], e.forEach(function(t) {
        t();
      });
    });
  },
  createCanvasElement() {
    var n = document.createElement("canvas");
    try {
      n.style = n.style || {};
    } catch {
    }
    return n;
  },
  createImageElement() {
    return document.createElement("img");
  },
  _isInDocument(n) {
    for (; n = n.parentNode; )
      if (n == document)
        return !0;
    return !1;
  },
  _urlToImage(n, e) {
    var t = N.createImageElement();
    t.onload = function() {
      e(t);
    }, t.src = n;
  },
  _rgbToHex(n, e, t) {
    return ((1 << 24) + (n << 16) + (e << 8) + t).toString(16).slice(1);
  },
  _hexToRgb(n) {
    n = n.replace(Xl, n_);
    var e = parseInt(n, 16);
    return {
      r: e >> 16 & 255,
      g: e >> 8 & 255,
      b: e & 255
    };
  },
  getRandomColor() {
    for (var n = (Math.random() * 16777215 << 0).toString(16); n.length < 6; )
      n = r_ + n;
    return Xl + n;
  },
  getRGB(n) {
    var e;
    return n in Jl ? (e = Jl[n], {
      r: e[0],
      g: e[1],
      b: e[2]
    }) : n[0] === Xl ? this._hexToRgb(n.substring(1)) : n.substr(0, 4) === s_ ? (e = o_.exec(n.replace(/ /g, "")), {
      r: parseInt(e[1], 10),
      g: parseInt(e[2], 10),
      b: parseInt(e[3], 10)
    }) : {
      r: 0,
      g: 0,
      b: 0
    };
  },
  colorToRGBA(n) {
    return n = n || "black", N._namedColorToRBA(n) || N._hex3ColorToRGBA(n) || N._hex4ColorToRGBA(n) || N._hex6ColorToRGBA(n) || N._hex8ColorToRGBA(n) || N._rgbColorToRGBA(n) || N._rgbaColorToRGBA(n) || N._hslColorToRGBA(n);
  },
  _namedColorToRBA(n) {
    var e = Jl[n.toLowerCase()];
    return e ? {
      r: e[0],
      g: e[1],
      b: e[2],
      a: 1
    } : null;
  },
  _rgbColorToRGBA(n) {
    if (n.indexOf("rgb(") === 0) {
      n = n.match(/rgb\(([^)]+)\)/)[1];
      var e = n.split(/ *, */).map(Number);
      return {
        r: e[0],
        g: e[1],
        b: e[2],
        a: 1
      };
    }
  },
  _rgbaColorToRGBA(n) {
    if (n.indexOf("rgba(") === 0) {
      n = n.match(/rgba\(([^)]+)\)/)[1];
      var e = n.split(/ *, */).map((t, r) => t.slice(-1) === "%" ? r === 3 ? parseInt(t) / 100 : parseInt(t) / 100 * 255 : Number(t));
      return {
        r: e[0],
        g: e[1],
        b: e[2],
        a: e[3]
      };
    }
  },
  _hex8ColorToRGBA(n) {
    if (n[0] === "#" && n.length === 9)
      return {
        r: parseInt(n.slice(1, 3), 16),
        g: parseInt(n.slice(3, 5), 16),
        b: parseInt(n.slice(5, 7), 16),
        a: parseInt(n.slice(7, 9), 16) / 255
      };
  },
  _hex6ColorToRGBA(n) {
    if (n[0] === "#" && n.length === 7)
      return {
        r: parseInt(n.slice(1, 3), 16),
        g: parseInt(n.slice(3, 5), 16),
        b: parseInt(n.slice(5, 7), 16),
        a: 1
      };
  },
  _hex4ColorToRGBA(n) {
    if (n[0] === "#" && n.length === 5)
      return {
        r: parseInt(n[1] + n[1], 16),
        g: parseInt(n[2] + n[2], 16),
        b: parseInt(n[3] + n[3], 16),
        a: parseInt(n[4] + n[4], 16) / 255
      };
  },
  _hex3ColorToRGBA(n) {
    if (n[0] === "#" && n.length === 4)
      return {
        r: parseInt(n[1] + n[1], 16),
        g: parseInt(n[2] + n[2], 16),
        b: parseInt(n[3] + n[3], 16),
        a: 1
      };
  },
  _hslColorToRGBA(n) {
    if (/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.test(n)) {
      const [e, ...t] = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(n), r = Number(t[0]) / 360, i = Number(t[1]) / 100, s = Number(t[2]) / 100;
      let o, a, l;
      if (i === 0)
        return l = s * 255, {
          r: Math.round(l),
          g: Math.round(l),
          b: Math.round(l),
          a: 1
        };
      s < 0.5 ? o = s * (1 + i) : o = s + i - s * i;
      const c = 2 * s - o, u = [0, 0, 0];
      for (let f = 0; f < 3; f++)
        a = r + 1 / 3 * -(f - 1), a < 0 && a++, a > 1 && a--, 6 * a < 1 ? l = c + (o - c) * 6 * a : 2 * a < 1 ? l = o : 3 * a < 2 ? l = c + (o - c) * (2 / 3 - a) * 6 : l = c, u[f] = l * 255;
      return {
        r: Math.round(u[0]),
        g: Math.round(u[1]),
        b: Math.round(u[2]),
        a: 1
      };
    }
  },
  haveIntersection(n, e) {
    return !(e.x > n.x + n.width || e.x + e.width < n.x || e.y > n.y + n.height || e.y + e.height < n.y);
  },
  cloneObject(n) {
    var e = {};
    for (var t in n)
      this._isPlainObject(n[t]) ? e[t] = this.cloneObject(n[t]) : this._isArray(n[t]) ? e[t] = this.cloneArray(n[t]) : e[t] = n[t];
    return e;
  },
  cloneArray(n) {
    return n.slice(0);
  },
  degToRad(n) {
    return n * e_;
  },
  radToDeg(n) {
    return n * t_;
  },
  _degToRad(n) {
    return N.warn("Util._degToRad is removed. Please use public Util.degToRad instead."), N.degToRad(n);
  },
  _radToDeg(n) {
    return N.warn("Util._radToDeg is removed. Please use public Util.radToDeg instead."), N.radToDeg(n);
  },
  _getRotation(n) {
    return se.angleDeg ? N.radToDeg(n) : n;
  },
  _capitalize(n) {
    return n.charAt(0).toUpperCase() + n.slice(1);
  },
  throw(n) {
    throw new Error(Ud + n);
  },
  error(n) {
    console.error(Ud + n);
  },
  warn(n) {
    se.showWarnings && console.warn(i_ + n);
  },
  each(n, e) {
    for (var t in n)
      e(t, n[t]);
  },
  _inRange(n, e, t) {
    return e <= n && n < t;
  },
  _getProjectionToSegment(n, e, t, r, i, s) {
    var o, a, l, c = (n - t) * (n - t) + (e - r) * (e - r);
    if (c == 0)
      o = n, a = e, l = (i - t) * (i - t) + (s - r) * (s - r);
    else {
      var u = ((i - n) * (t - n) + (s - e) * (r - e)) / c;
      u < 0 ? (o = n, a = e, l = (n - i) * (n - i) + (e - s) * (e - s)) : u > 1 ? (o = t, a = r, l = (t - i) * (t - i) + (r - s) * (r - s)) : (o = n + u * (t - n), a = e + u * (r - e), l = (o - i) * (o - i) + (a - s) * (a - s));
    }
    return [o, a, l];
  },
  _getProjectionToLine(n, e, t) {
    var r = N.cloneObject(n), i = Number.MAX_VALUE;
    return e.forEach(function(s, o) {
      if (!(!t && o === e.length - 1)) {
        var a = e[(o + 1) % e.length], l = N._getProjectionToSegment(s.x, s.y, a.x, a.y, n.x, n.y), c = l[0], u = l[1], f = l[2];
        f < i && (r.x = c, r.y = u, i = f);
      }
    }), r;
  },
  _prepareArrayForTween(n, e, t) {
    var r, i = [], s = [];
    if (n.length > e.length) {
      var o = e;
      e = n, n = o;
    }
    for (r = 0; r < n.length; r += 2)
      i.push({
        x: n[r],
        y: n[r + 1]
      });
    for (r = 0; r < e.length; r += 2)
      s.push({
        x: e[r],
        y: e[r + 1]
      });
    var a = [];
    return s.forEach(function(l) {
      var c = N._getProjectionToLine(l, i, t);
      a.push(c.x), a.push(c.y);
    }), a;
  },
  _prepareToStringify(n) {
    var e;
    n.visitedByCircularReferenceRemoval = !0;
    for (var t in n)
      if (n.hasOwnProperty(t) && n[t] && typeof n[t] == "object") {
        if (e = Object.getOwnPropertyDescriptor(n, t), n[t].visitedByCircularReferenceRemoval || N._isElement(n[t]))
          if (e.configurable)
            delete n[t];
          else
            return null;
        else if (N._prepareToStringify(n[t]) === null)
          if (e.configurable)
            delete n[t];
          else
            return null;
      }
    return delete n.visitedByCircularReferenceRemoval, n;
  },
  _assign(n, e) {
    for (var t in e)
      n[t] = e[t];
    return n;
  },
  _getFirstPointerId(n) {
    return n.touches ? n.changedTouches[0].identifier : n.pointerId || 999;
  },
  releaseCanvas(...n) {
    se.releaseCanvasOnDestroy && n.forEach((e) => {
      e.width = 0, e.height = 0;
    });
  },
  drawRoundedRectPath(n, e, t, r) {
    let i = 0, s = 0, o = 0, a = 0;
    typeof r == "number" ? i = s = o = a = Math.min(r, e / 2, t / 2) : (i = Math.min(r[0] || 0, e / 2, t / 2), s = Math.min(r[1] || 0, e / 2, t / 2), a = Math.min(r[2] || 0, e / 2, t / 2), o = Math.min(r[3] || 0, e / 2, t / 2)), n.moveTo(i, 0), n.lineTo(e - s, 0), n.arc(e - s, s, s, Math.PI * 3 / 2, 0, !1), n.lineTo(e, t - a), n.arc(e - a, t - a, a, 0, Math.PI / 2, !1), n.lineTo(o, t), n.arc(o, t - o, o, Math.PI / 2, Math.PI, !1), n.lineTo(0, i), n.arc(i, i, i, Math.PI, Math.PI * 3 / 2, !1);
  }
};
function $r(n) {
  return N._isString(n) ? '"' + n + '"' : Object.prototype.toString.call(n) === "[object Number]" || N._isBoolean(n) ? n : Object.prototype.toString.call(n);
}
function Ce() {
  if (se.isUnminified)
    return function(n, e) {
      return N._isNumber(n) || N.warn($r(n) + ' is a not valid value for "' + e + '" attribute. The value should be a number.'), n;
    };
}
function l_(n) {
  if (se.isUnminified)
    return function(e, t) {
      let r = N._isNumber(e), i = N._isArray(e) && e.length == n;
      return !r && !i && N.warn($r(e) + ' is a not valid value for "' + t + '" attribute. The value should be a number or Array<number>(' + n + ")"), e;
    };
}
function c_() {
  if (se.isUnminified)
    return function(n, e) {
      var t = N._isNumber(n), r = n === "auto";
      return t || r || N.warn($r(n) + ' is a not valid value for "' + e + '" attribute. The value should be a number or "auto".'), n;
    };
}
function Po() {
  if (se.isUnminified)
    return function(n, e) {
      return N._isString(n) || N.warn($r(n) + ' is a not valid value for "' + e + '" attribute. The value should be a string.'), n;
    };
}
function fg() {
  if (se.isUnminified)
    return function(n, e) {
      const t = N._isString(n), r = Object.prototype.toString.call(n) === "[object CanvasGradient]" || n && n.addColorStop;
      return t || r || N.warn($r(n) + ' is a not valid value for "' + e + '" attribute. The value should be a string or a native gradient.'), n;
    };
}
function u_() {
  if (se.isUnminified)
    return function(n, e) {
      const t = Int8Array ? Object.getPrototypeOf(Int8Array) : null;
      return t && n instanceof t || (N._isArray(n) ? n.forEach(function(r) {
        N._isNumber(r) || N.warn('"' + e + '" attribute has non numeric element ' + r + ". Make sure that all elements are numbers.");
      }) : N.warn($r(n) + ' is a not valid value for "' + e + '" attribute. The value should be a array of numbers.')), n;
    };
}
function Si() {
  if (se.isUnminified)
    return function(n, e) {
      var t = n === !0 || n === !1;
      return t || N.warn($r(n) + ' is a not valid value for "' + e + '" attribute. The value should be a boolean.'), n;
    };
}
function f_(n) {
  if (se.isUnminified)
    return function(e, t) {
      return e == null || N.isObject(e) || N.warn($r(e) + ' is a not valid value for "' + t + '" attribute. The value should be an object with properties ' + n), e;
    };
}
var Os = "get", Es = "set";
const F = {
  addGetterSetter(n, e, t, r, i) {
    F.addGetter(n, e, t), F.addSetter(n, e, r, i), F.addOverloadedGetterSetter(n, e);
  },
  addGetter(n, e, t) {
    var r = Os + N._capitalize(e);
    n.prototype[r] = n.prototype[r] || function() {
      var i = this.attrs[e];
      return i === void 0 ? t : i;
    };
  },
  addSetter(n, e, t, r) {
    var i = Es + N._capitalize(e);
    n.prototype[i] || F.overWriteSetter(n, e, t, r);
  },
  overWriteSetter(n, e, t, r) {
    var i = Es + N._capitalize(e);
    n.prototype[i] = function(s) {
      return t && s !== void 0 && s !== null && (s = t.call(this, s, e)), this._setAttr(e, s), r && r.call(this), this;
    };
  },
  addComponentsGetterSetter(n, e, t, r, i) {
    var s = t.length, o = N._capitalize, a = Os + o(e), l = Es + o(e), c, u;
    n.prototype[a] = function() {
      var d = {};
      for (c = 0; c < s; c++)
        u = t[c], d[u] = this.getAttr(e + o(u));
      return d;
    };
    var f = f_(t);
    n.prototype[l] = function(d) {
      var p = this.attrs[e], h;
      r && (d = r.call(this, d)), f && f.call(this, d, e);
      for (h in d)
        d.hasOwnProperty(h) && this._setAttr(e + o(h), d[h]);
      return d || t.forEach((m) => {
        this._setAttr(e + o(m), void 0);
      }), this._fireChangeEvent(e, p, d), i && i.call(this), this;
    }, F.addOverloadedGetterSetter(n, e);
  },
  addOverloadedGetterSetter(n, e) {
    var t = N._capitalize(e), r = Es + t, i = Os + t;
    n.prototype[e] = function() {
      return arguments.length ? (this[r](arguments[0]), this) : this[i]();
    };
  },
  addDeprecatedGetterSetter(n, e, t, r) {
    N.error("Adding deprecated " + e);
    var i = Os + N._capitalize(e), s = e + " property is deprecated and will be removed soon. Look at Konva change log for more information.";
    n.prototype[i] = function() {
      N.error(s);
      var o = this.attrs[e];
      return o === void 0 ? t : o;
    }, F.addSetter(n, e, r, function() {
      N.error(s);
    }), F.addOverloadedGetterSetter(n, e);
  },
  backCompat(n, e) {
    N.each(e, function(t, r) {
      var i = n.prototype[r], s = Os + N._capitalize(t), o = Es + N._capitalize(t);
      function a() {
        i.apply(this, arguments), N.error('"' + t + '" method is deprecated and will be removed soon. Use ""' + r + '" instead.');
      }
      n.prototype[t] = a, n.prototype[s] = a, n.prototype[o] = a;
    });
  },
  afterSetFilter() {
    this._filterUpToDate = !1;
  }
};
function d_(n) {
  var e = [], t = n.length, r = N, i, s;
  for (i = 0; i < t; i++)
    s = n[i], r._isNumber(s) ? s = Math.round(s * 1e3) / 1e3 : r._isString(s) || (s = s + ""), e.push(s);
  return e;
}
var Kd = ",", h_ = "(", p_ = ")", m_ = "([", g_ = "])", y_ = ";", v_ = "()", b_ = "=", Yd = [
  "arc",
  "arcTo",
  "beginPath",
  "bezierCurveTo",
  "clearRect",
  "clip",
  "closePath",
  "createLinearGradient",
  "createPattern",
  "createRadialGradient",
  "drawImage",
  "ellipse",
  "fill",
  "fillText",
  "getImageData",
  "createImageData",
  "lineTo",
  "moveTo",
  "putImageData",
  "quadraticCurveTo",
  "rect",
  "restore",
  "rotate",
  "save",
  "scale",
  "setLineDash",
  "setTransform",
  "stroke",
  "strokeText",
  "transform",
  "translate"
], w_ = [
  "fillStyle",
  "strokeStyle",
  "shadowColor",
  "shadowBlur",
  "shadowOffsetX",
  "shadowOffsetY",
  "lineCap",
  "lineDashOffset",
  "lineJoin",
  "lineWidth",
  "miterLimit",
  "font",
  "textAlign",
  "textBaseline",
  "globalAlpha",
  "globalCompositeOperation",
  "imageSmoothingEnabled"
];
const C_ = 100;
class nf {
  constructor(e) {
    this.canvas = e, se.enableTrace && (this.traceArr = [], this._enableTrace());
  }
  fillShape(e) {
    e.fillEnabled() && this._fill(e);
  }
  _fill(e) {
  }
  strokeShape(e) {
    e.hasStroke() && this._stroke(e);
  }
  _stroke(e) {
  }
  fillStrokeShape(e) {
    e.attrs.fillAfterStrokeEnabled ? (this.strokeShape(e), this.fillShape(e)) : (this.fillShape(e), this.strokeShape(e));
  }
  getTrace(e, t) {
    var r = this.traceArr, i = r.length, s = "", o, a, l, c;
    for (o = 0; o < i; o++)
      a = r[o], l = a.method, l ? (c = a.args, s += l, e ? s += v_ : N._isArray(c[0]) ? s += m_ + c.join(Kd) + g_ : (t && (c = c.map((u) => typeof u == "number" ? Math.floor(u) : u)), s += h_ + c.join(Kd) + p_)) : (s += a.property, e || (s += b_ + a.val)), s += y_;
    return s;
  }
  clearTrace() {
    this.traceArr = [];
  }
  _trace(e) {
    var t = this.traceArr, r;
    t.push(e), r = t.length, r >= C_ && t.shift();
  }
  reset() {
    var e = this.getCanvas().getPixelRatio();
    this.setTransform(1 * e, 0, 0, 1 * e, 0, 0);
  }
  getCanvas() {
    return this.canvas;
  }
  clear(e) {
    var t = this.getCanvas();
    e ? this.clearRect(e.x || 0, e.y || 0, e.width || 0, e.height || 0) : this.clearRect(0, 0, t.getWidth() / t.pixelRatio, t.getHeight() / t.pixelRatio);
  }
  _applyLineCap(e) {
    const t = e.attrs.lineCap;
    t && this.setAttr("lineCap", t);
  }
  _applyOpacity(e) {
    var t = e.getAbsoluteOpacity();
    t !== 1 && this.setAttr("globalAlpha", t);
  }
  _applyLineJoin(e) {
    const t = e.attrs.lineJoin;
    t && this.setAttr("lineJoin", t);
  }
  setAttr(e, t) {
    this._context[e] = t;
  }
  arc(e, t, r, i, s, o) {
    this._context.arc(e, t, r, i, s, o);
  }
  arcTo(e, t, r, i, s) {
    this._context.arcTo(e, t, r, i, s);
  }
  beginPath() {
    this._context.beginPath();
  }
  bezierCurveTo(e, t, r, i, s, o) {
    this._context.bezierCurveTo(e, t, r, i, s, o);
  }
  clearRect(e, t, r, i) {
    this._context.clearRect(e, t, r, i);
  }
  clip() {
    this._context.clip();
  }
  closePath() {
    this._context.closePath();
  }
  createImageData(e, t) {
    var r = arguments;
    if (r.length === 2)
      return this._context.createImageData(e, t);
    if (r.length === 1)
      return this._context.createImageData(e);
  }
  createLinearGradient(e, t, r, i) {
    return this._context.createLinearGradient(e, t, r, i);
  }
  createPattern(e, t) {
    return this._context.createPattern(e, t);
  }
  createRadialGradient(e, t, r, i, s, o) {
    return this._context.createRadialGradient(e, t, r, i, s, o);
  }
  drawImage(e, t, r, i, s, o, a, l, c) {
    var u = arguments, f = this._context;
    u.length === 3 ? f.drawImage(e, t, r) : u.length === 5 ? f.drawImage(e, t, r, i, s) : u.length === 9 && f.drawImage(e, t, r, i, s, o, a, l, c);
  }
  ellipse(e, t, r, i, s, o, a, l) {
    this._context.ellipse(e, t, r, i, s, o, a, l);
  }
  isPointInPath(e, t, r, i) {
    return r ? this._context.isPointInPath(r, e, t, i) : this._context.isPointInPath(e, t, i);
  }
  fill(e) {
    e ? this._context.fill(e) : this._context.fill();
  }
  fillRect(e, t, r, i) {
    this._context.fillRect(e, t, r, i);
  }
  strokeRect(e, t, r, i) {
    this._context.strokeRect(e, t, r, i);
  }
  fillText(e, t, r, i) {
    i ? this._context.fillText(e, t, r, i) : this._context.fillText(e, t, r);
  }
  measureText(e) {
    return this._context.measureText(e);
  }
  getImageData(e, t, r, i) {
    return this._context.getImageData(e, t, r, i);
  }
  lineTo(e, t) {
    this._context.lineTo(e, t);
  }
  moveTo(e, t) {
    this._context.moveTo(e, t);
  }
  rect(e, t, r, i) {
    this._context.rect(e, t, r, i);
  }
  putImageData(e, t, r) {
    this._context.putImageData(e, t, r);
  }
  quadraticCurveTo(e, t, r, i) {
    this._context.quadraticCurveTo(e, t, r, i);
  }
  restore() {
    this._context.restore();
  }
  rotate(e) {
    this._context.rotate(e);
  }
  save() {
    this._context.save();
  }
  scale(e, t) {
    this._context.scale(e, t);
  }
  setLineDash(e) {
    this._context.setLineDash ? this._context.setLineDash(e) : "mozDash" in this._context ? this._context.mozDash = e : "webkitLineDash" in this._context && (this._context.webkitLineDash = e);
  }
  getLineDash() {
    return this._context.getLineDash();
  }
  setTransform(e, t, r, i, s, o) {
    this._context.setTransform(e, t, r, i, s, o);
  }
  stroke(e) {
    e ? this._context.stroke(e) : this._context.stroke();
  }
  strokeText(e, t, r, i) {
    this._context.strokeText(e, t, r, i);
  }
  transform(e, t, r, i, s, o) {
    this._context.transform(e, t, r, i, s, o);
  }
  translate(e, t) {
    this._context.translate(e, t);
  }
  _enableTrace() {
    var e = this, t = Yd.length, r = this.setAttr, i, s, o = function(a) {
      var l = e[a], c;
      e[a] = function() {
        return s = d_(Array.prototype.slice.call(arguments, 0)), c = l.apply(e, arguments), e._trace({
          method: a,
          args: s
        }), c;
      };
    };
    for (i = 0; i < t; i++)
      o(Yd[i]);
    e.setAttr = function() {
      r.apply(e, arguments);
      var a = arguments[0], l = arguments[1];
      (a === "shadowOffsetX" || a === "shadowOffsetY" || a === "shadowBlur") && (l = l / this.canvas.getPixelRatio()), e._trace({
        property: a,
        val: l
      });
    };
  }
  _applyGlobalCompositeOperation(e) {
    const t = e.attrs.globalCompositeOperation;
    var r = !t || t === "source-over";
    r || this.setAttr("globalCompositeOperation", t);
  }
}
w_.forEach(function(n) {
  Object.defineProperty(nf.prototype, n, {
    get() {
      return this._context[n];
    },
    set(e) {
      this._context[n] = e;
    }
  });
});
class __ extends nf {
  constructor(e) {
    super(e), this._context = e._canvas.getContext("2d");
  }
  _fillColor(e) {
    var t = e.fill();
    this.setAttr("fillStyle", t), e._fillFunc(this);
  }
  _fillPattern(e) {
    this.setAttr("fillStyle", e._getFillPattern()), e._fillFunc(this);
  }
  _fillLinearGradient(e) {
    var t = e._getLinearGradient();
    t && (this.setAttr("fillStyle", t), e._fillFunc(this));
  }
  _fillRadialGradient(e) {
    const t = e._getRadialGradient();
    t && (this.setAttr("fillStyle", t), e._fillFunc(this));
  }
  _fill(e) {
    const t = e.fill(), r = e.getFillPriority();
    if (t && r === "color") {
      this._fillColor(e);
      return;
    }
    const i = e.getFillPatternImage();
    if (i && r === "pattern") {
      this._fillPattern(e);
      return;
    }
    const s = e.getFillLinearGradientColorStops();
    if (s && r === "linear-gradient") {
      this._fillLinearGradient(e);
      return;
    }
    const o = e.getFillRadialGradientColorStops();
    if (o && r === "radial-gradient") {
      this._fillRadialGradient(e);
      return;
    }
    t ? this._fillColor(e) : i ? this._fillPattern(e) : s ? this._fillLinearGradient(e) : o && this._fillRadialGradient(e);
  }
  _strokeLinearGradient(e) {
    const t = e.getStrokeLinearGradientStartPoint(), r = e.getStrokeLinearGradientEndPoint(), i = e.getStrokeLinearGradientColorStops(), s = this.createLinearGradient(t.x, t.y, r.x, r.y);
    if (i) {
      for (var o = 0; o < i.length; o += 2)
        s.addColorStop(i[o], i[o + 1]);
      this.setAttr("strokeStyle", s);
    }
  }
  _stroke(e) {
    var t = e.dash(), r = e.getStrokeScaleEnabled();
    if (e.hasStroke()) {
      if (!r) {
        this.save();
        var i = this.getCanvas().getPixelRatio();
        this.setTransform(i, 0, 0, i, 0, 0);
      }
      this._applyLineCap(e), t && e.dashEnabled() && (this.setLineDash(t), this.setAttr("lineDashOffset", e.dashOffset())), this.setAttr("lineWidth", e.strokeWidth()), e.getShadowForStrokeEnabled() || this.setAttr("shadowColor", "rgba(0,0,0,0)");
      var s = e.getStrokeLinearGradientColorStops();
      s ? this._strokeLinearGradient(e) : this.setAttr("strokeStyle", e.stroke()), e._strokeFunc(this), r || this.restore();
    }
  }
  _applyShadow(e) {
    var t, r, i, s = (t = e.getShadowRGBA()) !== null && t !== void 0 ? t : "black", o = (r = e.getShadowBlur()) !== null && r !== void 0 ? r : 5, a = (i = e.getShadowOffset()) !== null && i !== void 0 ? i : {
      x: 0,
      y: 0
    }, l = e.getAbsoluteScale(), c = this.canvas.getPixelRatio(), u = l.x * c, f = l.y * c;
    this.setAttr("shadowColor", s), this.setAttr("shadowBlur", o * Math.min(Math.abs(u), Math.abs(f))), this.setAttr("shadowOffsetX", a.x * u), this.setAttr("shadowOffsetY", a.y * f);
  }
}
class S_ extends nf {
  constructor(e) {
    super(e), this._context = e._canvas.getContext("2d", {
      willReadFrequently: !0
    });
  }
  _fill(e) {
    this.save(), this.setAttr("fillStyle", e.colorKey), e._fillFuncHit(this), this.restore();
  }
  strokeShape(e) {
    e.hasHitStroke() && this._stroke(e);
  }
  _stroke(e) {
    if (e.hasHitStroke()) {
      const s = e.getStrokeScaleEnabled();
      if (!s) {
        this.save();
        var t = this.getCanvas().getPixelRatio();
        this.setTransform(t, 0, 0, t, 0, 0);
      }
      this._applyLineCap(e);
      var r = e.hitStrokeWidth(), i = r === "auto" ? e.strokeWidth() : r;
      this.setAttr("lineWidth", i), this.setAttr("strokeStyle", e.colorKey), e._strokeFuncHit(this), s || this.restore();
    }
  }
}
var Xo;
function x_() {
  if (Xo)
    return Xo;
  var n = N.createCanvasElement(), e = n.getContext("2d");
  return Xo = function() {
    var t = se._global.devicePixelRatio || 1, r = e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1;
    return t / r;
  }(), N.releaseCanvas(n), Xo;
}
class rf {
  constructor(e) {
    this.pixelRatio = 1, this.width = 0, this.height = 0, this.isCache = !1;
    var t = e || {}, r = t.pixelRatio || se.pixelRatio || x_();
    this.pixelRatio = r, this._canvas = N.createCanvasElement(), this._canvas.style.padding = "0", this._canvas.style.margin = "0", this._canvas.style.border = "0", this._canvas.style.background = "transparent", this._canvas.style.position = "absolute", this._canvas.style.top = "0", this._canvas.style.left = "0";
  }
  getContext() {
    return this.context;
  }
  getPixelRatio() {
    return this.pixelRatio;
  }
  setPixelRatio(e) {
    var t = this.pixelRatio;
    this.pixelRatio = e, this.setSize(this.getWidth() / t, this.getHeight() / t);
  }
  setWidth(e) {
    this.width = this._canvas.width = e * this.pixelRatio, this._canvas.style.width = e + "px";
    var t = this.pixelRatio, r = this.getContext()._context;
    r.scale(t, t);
  }
  setHeight(e) {
    this.height = this._canvas.height = e * this.pixelRatio, this._canvas.style.height = e + "px";
    var t = this.pixelRatio, r = this.getContext()._context;
    r.scale(t, t);
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
  setSize(e, t) {
    this.setWidth(e || 0), this.setHeight(t || 0);
  }
  toDataURL(e, t) {
    try {
      return this._canvas.toDataURL(e, t);
    } catch {
      try {
        return this._canvas.toDataURL();
      } catch (i) {
        return N.error("Unable to get data URL. " + i.message + " For more info read https://konvajs.org/docs/posts/Tainted_Canvas.html."), "";
      }
    }
  }
}
F.addGetterSetter(rf, "pixelRatio", void 0, Ce());
class Us extends rf {
  constructor(e = { width: 0, height: 0 }) {
    super(e), this.context = new __(this), this.setSize(e.width, e.height);
  }
}
class dg extends rf {
  constructor(e = { width: 0, height: 0 }) {
    super(e), this.hitCanvas = !0, this.context = new S_(this), this.setSize(e.width, e.height);
  }
}
const xe = {
  get isDragging() {
    var n = !1;
    return xe._dragElements.forEach((e) => {
      e.dragStatus === "dragging" && (n = !0);
    }), n;
  },
  justDragged: !1,
  get node() {
    var n;
    return xe._dragElements.forEach((e) => {
      n = e.node;
    }), n;
  },
  _dragElements: /* @__PURE__ */ new Map(),
  _drag(n) {
    const e = [];
    xe._dragElements.forEach((t, r) => {
      const { node: i } = t, s = i.getStage();
      s.setPointersPositions(n), t.pointerId === void 0 && (t.pointerId = N._getFirstPointerId(n));
      const o = s._changedPointerPositions.find((c) => c.id === t.pointerId);
      if (o) {
        if (t.dragStatus !== "dragging") {
          var a = i.dragDistance(), l = Math.max(Math.abs(o.x - t.startPointerPos.x), Math.abs(o.y - t.startPointerPos.y));
          if (l < a || (i.startDrag({ evt: n }), !i.isDragging()))
            return;
        }
        i._setDragPosition(n, t), e.push(i);
      }
    }), e.forEach((t) => {
      t.fire("dragmove", {
        type: "dragmove",
        target: t,
        evt: n
      }, !0);
    });
  },
  _endDragBefore(n) {
    const e = [];
    xe._dragElements.forEach((t) => {
      const { node: r } = t, i = r.getStage();
      if (n && i.setPointersPositions(n), !i._changedPointerPositions.find((a) => a.id === t.pointerId))
        return;
      (t.dragStatus === "dragging" || t.dragStatus === "stopped") && (xe.justDragged = !0, se._mouseListenClick = !1, se._touchListenClick = !1, se._pointerListenClick = !1, t.dragStatus = "stopped");
      const o = t.node.getLayer() || t.node instanceof se.Stage && t.node;
      o && e.indexOf(o) === -1 && e.push(o);
    }), e.forEach((t) => {
      t.draw();
    });
  },
  _endDragAfter(n) {
    xe._dragElements.forEach((e, t) => {
      e.dragStatus === "stopped" && e.node.fire("dragend", {
        type: "dragend",
        target: e.node,
        evt: n
      }, !0), e.dragStatus !== "dragging" && xe._dragElements.delete(t);
    });
  }
};
se.isBrowser && (window.addEventListener("mouseup", xe._endDragBefore, !0), window.addEventListener("touchend", xe._endDragBefore, !0), window.addEventListener("mousemove", xe._drag), window.addEventListener("touchmove", xe._drag), window.addEventListener("mouseup", xe._endDragAfter, !1), window.addEventListener("touchend", xe._endDragAfter, !1));
var Ca = "absoluteOpacity", Jo = "allEventListeners", Un = "absoluteTransform", qd = "absoluteScale", Kr = "canvas", k_ = "Change", T_ = "children", O_ = "konva", zc = "listening", Xd = "mouseenter", Jd = "mouseleave", Qd = "set", Zd = "Shape", _a = " ", eh = "stage", ur = "transform", E_ = "Stage", Hc = "visible", M_ = [
  "xChange.konva",
  "yChange.konva",
  "scaleXChange.konva",
  "scaleYChange.konva",
  "skewXChange.konva",
  "skewYChange.konva",
  "rotationChange.konva",
  "offsetXChange.konva",
  "offsetYChange.konva",
  "transformsEnabledChange.konva"
].join(_a);
let A_ = 1, oe = class Gc {
  constructor(e) {
    this._id = A_++, this.eventListeners = {}, this.attrs = {}, this.index = 0, this._allEventListeners = null, this.parent = null, this._cache = /* @__PURE__ */ new Map(), this._attachedDepsListeners = /* @__PURE__ */ new Map(), this._lastPos = null, this._batchingTransformChange = !1, this._needClearTransformCache = !1, this._filterUpToDate = !1, this._isUnderCache = !1, this._dragEventId = null, this._shouldFireChangeEvents = !1, this.setAttrs(e), this._shouldFireChangeEvents = !0;
  }
  hasChildren() {
    return !1;
  }
  _clearCache(e) {
    (e === ur || e === Un) && this._cache.get(e) ? this._cache.get(e).dirty = !0 : e ? this._cache.delete(e) : this._cache.clear();
  }
  _getCache(e, t) {
    var r = this._cache.get(e), i = e === ur || e === Un, s = r === void 0 || i && r.dirty === !0;
    return s && (r = t.call(this), this._cache.set(e, r)), r;
  }
  _calculate(e, t, r) {
    if (!this._attachedDepsListeners.get(e)) {
      const i = t.map((s) => s + "Change.konva").join(_a);
      this.on(i, () => {
        this._clearCache(e);
      }), this._attachedDepsListeners.set(e, !0);
    }
    return this._getCache(e, r);
  }
  _getCanvasCache() {
    return this._cache.get(Kr);
  }
  _clearSelfAndDescendantCache(e) {
    this._clearCache(e), e === Un && this.fire("absoluteTransformChange");
  }
  clearCache() {
    if (this._cache.has(Kr)) {
      const { scene: e, filter: t, hit: r } = this._cache.get(Kr);
      N.releaseCanvas(e, t, r), this._cache.delete(Kr);
    }
    return this._clearSelfAndDescendantCache(), this._requestDraw(), this;
  }
  cache(e) {
    var t = e || {}, r = {};
    (t.x === void 0 || t.y === void 0 || t.width === void 0 || t.height === void 0) && (r = this.getClientRect({
      skipTransform: !0,
      relativeTo: this.getParent()
    }));
    var i = Math.ceil(t.width || r.width), s = Math.ceil(t.height || r.height), o = t.pixelRatio, a = t.x === void 0 ? Math.floor(r.x) : t.x, l = t.y === void 0 ? Math.floor(r.y) : t.y, c = t.offset || 0, u = t.drawBorder || !1, f = t.hitCanvasPixelRatio || 1;
    if (!i || !s) {
      N.error("Can not cache the node. Width or height of the node equals 0. Caching is skipped.");
      return;
    }
    i += c * 2 + 1, s += c * 2 + 1, a -= c, l -= c;
    var d = new Us({
      pixelRatio: o,
      width: i,
      height: s
    }), p = new Us({
      pixelRatio: o,
      width: 0,
      height: 0
    }), h = new dg({
      pixelRatio: f,
      width: i,
      height: s
    }), m = d.getContext(), g = h.getContext();
    return h.isCache = !0, d.isCache = !0, this._cache.delete(Kr), this._filterUpToDate = !1, t.imageSmoothingEnabled === !1 && (d.getContext()._context.imageSmoothingEnabled = !1, p.getContext()._context.imageSmoothingEnabled = !1), m.save(), g.save(), m.translate(-a, -l), g.translate(-a, -l), this._isUnderCache = !0, this._clearSelfAndDescendantCache(Ca), this._clearSelfAndDescendantCache(qd), this.drawScene(d, this), this.drawHit(h, this), this._isUnderCache = !1, m.restore(), g.restore(), u && (m.save(), m.beginPath(), m.rect(0, 0, i, s), m.closePath(), m.setAttr("strokeStyle", "red"), m.setAttr("lineWidth", 5), m.stroke(), m.restore()), this._cache.set(Kr, {
      scene: d,
      filter: p,
      hit: h,
      x: a,
      y: l
    }), this._requestDraw(), this;
  }
  isCached() {
    return this._cache.has(Kr);
  }
  getClientRect(e) {
    throw new Error('abstract "getClientRect" method call');
  }
  _transformedRect(e, t) {
    var r = [
      { x: e.x, y: e.y },
      { x: e.x + e.width, y: e.y },
      { x: e.x + e.width, y: e.y + e.height },
      { x: e.x, y: e.y + e.height }
    ], i, s, o, a, l = this.getAbsoluteTransform(t);
    return r.forEach(function(c) {
      var u = l.point(c);
      i === void 0 && (i = o = u.x, s = a = u.y), i = Math.min(i, u.x), s = Math.min(s, u.y), o = Math.max(o, u.x), a = Math.max(a, u.y);
    }), {
      x: i,
      y: s,
      width: o - i,
      height: a - s
    };
  }
  _drawCachedSceneCanvas(e) {
    e.save(), e._applyOpacity(this), e._applyGlobalCompositeOperation(this);
    const t = this._getCanvasCache();
    e.translate(t.x, t.y);
    var r = this._getCachedSceneCanvas(), i = r.pixelRatio;
    e.drawImage(r._canvas, 0, 0, r.width / i, r.height / i), e.restore();
  }
  _drawCachedHitCanvas(e) {
    var t = this._getCanvasCache(), r = t.hit;
    e.save(), e.translate(t.x, t.y), e.drawImage(r._canvas, 0, 0, r.width / r.pixelRatio, r.height / r.pixelRatio), e.restore();
  }
  _getCachedSceneCanvas() {
    var e = this.filters(), t = this._getCanvasCache(), r = t.scene, i = t.filter, s = i.getContext(), o, a, l, c;
    if (e) {
      if (!this._filterUpToDate) {
        var u = r.pixelRatio;
        i.setSize(r.width / r.pixelRatio, r.height / r.pixelRatio);
        try {
          for (o = e.length, s.clear(), s.drawImage(r._canvas, 0, 0, r.getWidth() / u, r.getHeight() / u), a = s.getImageData(0, 0, i.getWidth(), i.getHeight()), l = 0; l < o; l++) {
            if (c = e[l], typeof c != "function") {
              N.error("Filter should be type of function, but got " + typeof c + " instead. Please check correct filters");
              continue;
            }
            c.call(this, a), s.putImageData(a, 0, 0);
          }
        } catch (f) {
          N.error("Unable to apply filter. " + f.message + " This post my help you https://konvajs.org/docs/posts/Tainted_Canvas.html.");
        }
        this._filterUpToDate = !0;
      }
      return i;
    }
    return r;
  }
  on(e, t) {
    if (this._cache && this._cache.delete(Jo), arguments.length === 3)
      return this._delegate.apply(this, arguments);
    var r = e.split(_a), i = r.length, s, o, a, l, c;
    for (s = 0; s < i; s++)
      o = r[s], a = o.split("."), l = a[0], c = a[1] || "", this.eventListeners[l] || (this.eventListeners[l] = []), this.eventListeners[l].push({
        name: c,
        handler: t
      });
    return this;
  }
  off(e, t) {
    var r = (e || "").split(_a), i = r.length, s, o, a, l, c, u;
    if (this._cache && this._cache.delete(Jo), !e)
      for (o in this.eventListeners)
        this._off(o);
    for (s = 0; s < i; s++)
      if (a = r[s], l = a.split("."), c = l[0], u = l[1], c)
        this.eventListeners[c] && this._off(c, u, t);
      else
        for (o in this.eventListeners)
          this._off(o, u, t);
    return this;
  }
  dispatchEvent(e) {
    var t = {
      target: this,
      type: e.type,
      evt: e
    };
    return this.fire(e.type, t), this;
  }
  addEventListener(e, t) {
    return this.on(e, function(r) {
      t.call(this, r.evt);
    }), this;
  }
  removeEventListener(e) {
    return this.off(e), this;
  }
  _delegate(e, t, r) {
    var i = this;
    this.on(e, function(s) {
      for (var o = s.target.findAncestors(t, !0, i), a = 0; a < o.length; a++)
        s = N.cloneObject(s), s.currentTarget = o[a], r.call(o[a], s);
    });
  }
  remove() {
    return this.isDragging() && this.stopDrag(), xe._dragElements.delete(this._id), this._remove(), this;
  }
  _clearCaches() {
    this._clearSelfAndDescendantCache(Un), this._clearSelfAndDescendantCache(Ca), this._clearSelfAndDescendantCache(qd), this._clearSelfAndDescendantCache(eh), this._clearSelfAndDescendantCache(Hc), this._clearSelfAndDescendantCache(zc);
  }
  _remove() {
    this._clearCaches();
    var e = this.getParent();
    e && e.children && (e.children.splice(this.index, 1), e._setChildrenIndices(), this.parent = null);
  }
  destroy() {
    return this.remove(), this.clearCache(), this;
  }
  getAttr(e) {
    var t = "get" + N._capitalize(e);
    return N._isFunction(this[t]) ? this[t]() : this.attrs[e];
  }
  getAncestors() {
    for (var e = this.getParent(), t = []; e; )
      t.push(e), e = e.getParent();
    return t;
  }
  getAttrs() {
    return this.attrs || {};
  }
  setAttrs(e) {
    return this._batchTransformChanges(() => {
      var t, r;
      if (!e)
        return this;
      for (t in e)
        t !== T_ && (r = Qd + N._capitalize(t), N._isFunction(this[r]) ? this[r](e[t]) : this._setAttr(t, e[t]));
    }), this;
  }
  isListening() {
    return this._getCache(zc, this._isListening);
  }
  _isListening(e) {
    if (!this.listening())
      return !1;
    const r = this.getParent();
    return r && r !== e && this !== e ? r._isListening(e) : !0;
  }
  isVisible() {
    return this._getCache(Hc, this._isVisible);
  }
  _isVisible(e) {
    if (!this.visible())
      return !1;
    const r = this.getParent();
    return r && r !== e && this !== e ? r._isVisible(e) : !0;
  }
  shouldDrawHit(e, t = !1) {
    if (e)
      return this._isVisible(e) && this._isListening(e);
    var r = this.getLayer(), i = !1;
    xe._dragElements.forEach((o) => {
      o.dragStatus === "dragging" && (o.node.nodeType === "Stage" || o.node.getLayer() === r) && (i = !0);
    });
    var s = !t && !se.hitOnDragEnabled && i;
    return this.isListening() && this.isVisible() && !s;
  }
  show() {
    return this.visible(!0), this;
  }
  hide() {
    return this.visible(!1), this;
  }
  getZIndex() {
    return this.index || 0;
  }
  getAbsoluteZIndex() {
    var e = this.getDepth(), t = this, r = 0, i, s, o, a;
    function l(c) {
      for (i = [], s = c.length, o = 0; o < s; o++)
        a = c[o], r++, a.nodeType !== Zd && (i = i.concat(a.getChildren().slice())), a._id === t._id && (o = s);
      i.length > 0 && i[0].getDepth() <= e && l(i);
    }
    return t.nodeType !== E_ && l(t.getStage().getChildren()), r;
  }
  getDepth() {
    for (var e = 0, t = this.parent; t; )
      e++, t = t.parent;
    return e;
  }
  _batchTransformChanges(e) {
    this._batchingTransformChange = !0, e(), this._batchingTransformChange = !1, this._needClearTransformCache && (this._clearCache(ur), this._clearSelfAndDescendantCache(Un)), this._needClearTransformCache = !1;
  }
  setPosition(e) {
    return this._batchTransformChanges(() => {
      this.x(e.x), this.y(e.y);
    }), this;
  }
  getPosition() {
    return {
      x: this.x(),
      y: this.y()
    };
  }
  getRelativePointerPosition() {
    if (!this.getStage())
      return null;
    var e = this.getStage().getPointerPosition();
    if (!e)
      return null;
    var t = this.getAbsoluteTransform().copy();
    return t.invert(), t.point(e);
  }
  getAbsolutePosition(e) {
    let t = !1, r = this.parent;
    for (; r; ) {
      if (r.isCached()) {
        t = !0;
        break;
      }
      r = r.parent;
    }
    t && !e && (e = !0);
    var i = this.getAbsoluteTransform(e).getMatrix(), s = new Rs(), o = this.offset();
    return s.m = i.slice(), s.translate(o.x, o.y), s.getTranslation();
  }
  setAbsolutePosition(e) {
    var t = this._clearTransform();
    this.attrs.x = t.x, this.attrs.y = t.y, delete t.x, delete t.y, this._clearCache(ur);
    var r = this._getAbsoluteTransform().copy();
    return r.invert(), r.translate(e.x, e.y), e = {
      x: this.attrs.x + r.getTranslation().x,
      y: this.attrs.y + r.getTranslation().y
    }, this._setTransform(t), this.setPosition({ x: e.x, y: e.y }), this._clearCache(ur), this._clearSelfAndDescendantCache(Un), this;
  }
  _setTransform(e) {
    var t;
    for (t in e)
      this.attrs[t] = e[t];
  }
  _clearTransform() {
    var e = {
      x: this.x(),
      y: this.y(),
      rotation: this.rotation(),
      scaleX: this.scaleX(),
      scaleY: this.scaleY(),
      offsetX: this.offsetX(),
      offsetY: this.offsetY(),
      skewX: this.skewX(),
      skewY: this.skewY()
    };
    return this.attrs.x = 0, this.attrs.y = 0, this.attrs.rotation = 0, this.attrs.scaleX = 1, this.attrs.scaleY = 1, this.attrs.offsetX = 0, this.attrs.offsetY = 0, this.attrs.skewX = 0, this.attrs.skewY = 0, e;
  }
  move(e) {
    var t = e.x, r = e.y, i = this.x(), s = this.y();
    return t !== void 0 && (i += t), r !== void 0 && (s += r), this.setPosition({ x: i, y: s }), this;
  }
  _eachAncestorReverse(e, t) {
    var r = [], i = this.getParent(), s, o;
    if (!(t && t._id === this._id)) {
      for (r.unshift(this); i && (!t || i._id !== t._id); )
        r.unshift(i), i = i.parent;
      for (s = r.length, o = 0; o < s; o++)
        e(r[o]);
    }
  }
  rotate(e) {
    return this.rotation(this.rotation() + e), this;
  }
  moveToTop() {
    if (!this.parent)
      return N.warn("Node has no parent. moveToTop function is ignored."), !1;
    var e = this.index, t = this.parent.getChildren().length;
    return e < t - 1 ? (this.parent.children.splice(e, 1), this.parent.children.push(this), this.parent._setChildrenIndices(), !0) : !1;
  }
  moveUp() {
    if (!this.parent)
      return N.warn("Node has no parent. moveUp function is ignored."), !1;
    var e = this.index, t = this.parent.getChildren().length;
    return e < t - 1 ? (this.parent.children.splice(e, 1), this.parent.children.splice(e + 1, 0, this), this.parent._setChildrenIndices(), !0) : !1;
  }
  moveDown() {
    if (!this.parent)
      return N.warn("Node has no parent. moveDown function is ignored."), !1;
    var e = this.index;
    return e > 0 ? (this.parent.children.splice(e, 1), this.parent.children.splice(e - 1, 0, this), this.parent._setChildrenIndices(), !0) : !1;
  }
  moveToBottom() {
    if (!this.parent)
      return N.warn("Node has no parent. moveToBottom function is ignored."), !1;
    var e = this.index;
    return e > 0 ? (this.parent.children.splice(e, 1), this.parent.children.unshift(this), this.parent._setChildrenIndices(), !0) : !1;
  }
  setZIndex(e) {
    if (!this.parent)
      return N.warn("Node has no parent. zIndex parameter is ignored."), this;
    (e < 0 || e >= this.parent.children.length) && N.warn("Unexpected value " + e + " for zIndex property. zIndex is just index of a node in children of its parent. Expected value is from 0 to " + (this.parent.children.length - 1) + ".");
    var t = this.index;
    return this.parent.children.splice(t, 1), this.parent.children.splice(e, 0, this), this.parent._setChildrenIndices(), this;
  }
  getAbsoluteOpacity() {
    return this._getCache(Ca, this._getAbsoluteOpacity);
  }
  _getAbsoluteOpacity() {
    var e = this.opacity(), t = this.getParent();
    return t && !t._isUnderCache && (e *= t.getAbsoluteOpacity()), e;
  }
  moveTo(e) {
    return this.getParent() !== e && (this._remove(), e.add(this)), this;
  }
  toObject() {
    var e = {}, t = this.getAttrs(), r, i, s, o, a;
    e.attrs = {};
    for (r in t)
      i = t[r], a = N.isObject(i) && !N._isPlainObject(i) && !N._isArray(i), !a && (s = typeof this[r] == "function" && this[r], delete t[r], o = s ? s.call(this) : null, t[r] = i, o !== i && (e.attrs[r] = i));
    return e.className = this.getClassName(), N._prepareToStringify(e);
  }
  toJSON() {
    return JSON.stringify(this.toObject());
  }
  getParent() {
    return this.parent;
  }
  findAncestors(e, t, r) {
    var i = [];
    t && this._isMatch(e) && i.push(this);
    for (var s = this.parent; s; ) {
      if (s === r)
        return i;
      s._isMatch(e) && i.push(s), s = s.parent;
    }
    return i;
  }
  isAncestorOf(e) {
    return !1;
  }
  findAncestor(e, t, r) {
    return this.findAncestors(e, t, r)[0];
  }
  _isMatch(e) {
    if (!e)
      return !1;
    if (typeof e == "function")
      return e(this);
    var t = e.replace(/ /g, "").split(","), r = t.length, i, s;
    for (i = 0; i < r; i++)
      if (s = t[i], N.isValidSelector(s) || (N.warn('Selector "' + s + '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".'), N.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".'), N.warn("Konva is awesome, right?")), s.charAt(0) === "#") {
        if (this.id() === s.slice(1))
          return !0;
      } else if (s.charAt(0) === ".") {
        if (this.hasName(s.slice(1)))
          return !0;
      } else if (this.className === s || this.nodeType === s)
        return !0;
    return !1;
  }
  getLayer() {
    var e = this.getParent();
    return e ? e.getLayer() : null;
  }
  getStage() {
    return this._getCache(eh, this._getStage);
  }
  _getStage() {
    var e = this.getParent();
    if (e)
      return e.getStage();
  }
  fire(e, t = {}, r) {
    return t.target = t.target || this, r ? this._fireAndBubble(e, t) : this._fire(e, t), this;
  }
  getAbsoluteTransform(e) {
    return e ? this._getAbsoluteTransform(e) : this._getCache(Un, this._getAbsoluteTransform);
  }
  _getAbsoluteTransform(e) {
    var t;
    if (e)
      return t = new Rs(), this._eachAncestorReverse(function(i) {
        var s = i.transformsEnabled();
        s === "all" ? t.multiply(i.getTransform()) : s === "position" && t.translate(i.x() - i.offsetX(), i.y() - i.offsetY());
      }, e), t;
    t = this._cache.get(Un) || new Rs(), this.parent ? this.parent.getAbsoluteTransform().copyInto(t) : t.reset();
    var r = this.transformsEnabled();
    if (r === "all")
      t.multiply(this.getTransform());
    else if (r === "position") {
      const i = this.attrs.x || 0, s = this.attrs.y || 0, o = this.attrs.offsetX || 0, a = this.attrs.offsetY || 0;
      t.translate(i - o, s - a);
    }
    return t.dirty = !1, t;
  }
  getAbsoluteScale(e) {
    for (var t = this; t; )
      t._isUnderCache && (e = t), t = t.getParent();
    const i = this.getAbsoluteTransform(e).decompose();
    return {
      x: i.scaleX,
      y: i.scaleY
    };
  }
  getAbsoluteRotation() {
    return this.getAbsoluteTransform().decompose().rotation;
  }
  getTransform() {
    return this._getCache(ur, this._getTransform);
  }
  _getTransform() {
    var e, t, r = this._cache.get(ur) || new Rs();
    r.reset();
    var i = this.x(), s = this.y(), o = se.getAngle(this.rotation()), a = (e = this.attrs.scaleX) !== null && e !== void 0 ? e : 1, l = (t = this.attrs.scaleY) !== null && t !== void 0 ? t : 1, c = this.attrs.skewX || 0, u = this.attrs.skewY || 0, f = this.attrs.offsetX || 0, d = this.attrs.offsetY || 0;
    return (i !== 0 || s !== 0) && r.translate(i, s), o !== 0 && r.rotate(o), (c !== 0 || u !== 0) && r.skew(c, u), (a !== 1 || l !== 1) && r.scale(a, l), (f !== 0 || d !== 0) && r.translate(-1 * f, -1 * d), r.dirty = !1, r;
  }
  clone(e) {
    var t = N.cloneObject(this.attrs), r, i, s, o, a;
    for (r in e)
      t[r] = e[r];
    var l = new this.constructor(t);
    for (r in this.eventListeners)
      for (i = this.eventListeners[r], s = i.length, o = 0; o < s; o++)
        a = i[o], a.name.indexOf(O_) < 0 && (l.eventListeners[r] || (l.eventListeners[r] = []), l.eventListeners[r].push(a));
    return l;
  }
  _toKonvaCanvas(e) {
    e = e || {};
    var t = this.getClientRect(), r = this.getStage(), i = e.x !== void 0 ? e.x : Math.floor(t.x), s = e.y !== void 0 ? e.y : Math.floor(t.y), o = e.pixelRatio || 1, a = new Us({
      width: e.width || Math.ceil(t.width) || (r ? r.width() : 0),
      height: e.height || Math.ceil(t.height) || (r ? r.height() : 0),
      pixelRatio: o
    }), l = a.getContext();
    return e.imageSmoothingEnabled === !1 && (l._context.imageSmoothingEnabled = !1), l.save(), (i || s) && l.translate(-1 * i, -1 * s), this.drawScene(a), l.restore(), a;
  }
  toCanvas(e) {
    return this._toKonvaCanvas(e)._canvas;
  }
  toDataURL(e) {
    e = e || {};
    var t = e.mimeType || null, r = e.quality || null, i = this._toKonvaCanvas(e).toDataURL(t, r);
    return e.callback && e.callback(i), i;
  }
  toImage(e) {
    return new Promise((t, r) => {
      try {
        const i = e == null ? void 0 : e.callback;
        i && delete e.callback, N._urlToImage(this.toDataURL(e), function(s) {
          t(s), i == null || i(s);
        });
      } catch (i) {
        r(i);
      }
    });
  }
  toBlob(e) {
    return new Promise((t, r) => {
      try {
        const i = e == null ? void 0 : e.callback;
        i && delete e.callback, this.toCanvas(e).toBlob((s) => {
          t(s), i == null || i(s);
        });
      } catch (i) {
        r(i);
      }
    });
  }
  setSize(e) {
    return this.width(e.width), this.height(e.height), this;
  }
  getSize() {
    return {
      width: this.width(),
      height: this.height()
    };
  }
  getClassName() {
    return this.className || this.nodeType;
  }
  getType() {
    return this.nodeType;
  }
  getDragDistance() {
    return this.attrs.dragDistance !== void 0 ? this.attrs.dragDistance : this.parent ? this.parent.getDragDistance() : se.dragDistance;
  }
  _off(e, t, r) {
    var i = this.eventListeners[e], s, o, a;
    for (s = 0; s < i.length; s++)
      if (o = i[s].name, a = i[s].handler, (o !== "konva" || t === "konva") && (!t || o === t) && (!r || r === a)) {
        if (i.splice(s, 1), i.length === 0) {
          delete this.eventListeners[e];
          break;
        }
        s--;
      }
  }
  _fireChangeEvent(e, t, r) {
    this._fire(e + k_, {
      oldVal: t,
      newVal: r
    });
  }
  addName(e) {
    if (!this.hasName(e)) {
      var t = this.name(), r = t ? t + " " + e : e;
      this.name(r);
    }
    return this;
  }
  hasName(e) {
    if (!e)
      return !1;
    const t = this.name();
    if (!t)
      return !1;
    var r = (t || "").split(/\s/g);
    return r.indexOf(e) !== -1;
  }
  removeName(e) {
    var t = (this.name() || "").split(/\s/g), r = t.indexOf(e);
    return r !== -1 && (t.splice(r, 1), this.name(t.join(" "))), this;
  }
  setAttr(e, t) {
    var r = this[Qd + N._capitalize(e)];
    return N._isFunction(r) ? r.call(this, t) : this._setAttr(e, t), this;
  }
  _requestDraw() {
    if (se.autoDrawEnabled) {
      const e = this.getLayer() || this.getStage();
      e == null || e.batchDraw();
    }
  }
  _setAttr(e, t) {
    var r = this.attrs[e];
    r === t && !N.isObject(t) || (t == null ? delete this.attrs[e] : this.attrs[e] = t, this._shouldFireChangeEvents && this._fireChangeEvent(e, r, t), this._requestDraw());
  }
  _setComponentAttr(e, t, r) {
    var i;
    r !== void 0 && (i = this.attrs[e], i || (this.attrs[e] = this.getAttr(e)), this.attrs[e][t] = r, this._fireChangeEvent(e, i, r));
  }
  _fireAndBubble(e, t, r) {
    t && this.nodeType === Zd && (t.target = this);
    var i = (e === Xd || e === Jd) && (r && (this === r || this.isAncestorOf && this.isAncestorOf(r)) || this.nodeType === "Stage" && !r);
    if (!i) {
      this._fire(e, t);
      var s = (e === Xd || e === Jd) && r && r.isAncestorOf && r.isAncestorOf(this) && !r.isAncestorOf(this.parent);
      (t && !t.cancelBubble || !t) && this.parent && this.parent.isListening() && !s && (r && r.parent ? this._fireAndBubble.call(this.parent, e, t, r) : this._fireAndBubble.call(this.parent, e, t));
    }
  }
  _getProtoListeners(e) {
    let t = this._cache.get(Jo);
    if (!t) {
      t = {};
      let i = Object.getPrototypeOf(this);
      for (; i; ) {
        if (!i.eventListeners) {
          i = Object.getPrototypeOf(i);
          continue;
        }
        for (var r in i.eventListeners) {
          const s = i.eventListeners[r], o = t[r] || [];
          t[r] = s.concat(o);
        }
        i = Object.getPrototypeOf(i);
      }
      this._cache.set(Jo, t);
    }
    return t[e];
  }
  _fire(e, t) {
    t = t || {}, t.currentTarget = this, t.type = e;
    const r = this._getProtoListeners(e);
    if (r)
      for (var i = 0; i < r.length; i++)
        r[i].handler.call(this, t);
    const s = this.eventListeners[e];
    if (s)
      for (var i = 0; i < s.length; i++)
        s[i].handler.call(this, t);
  }
  draw() {
    return this.drawScene(), this.drawHit(), this;
  }
  _createDragElement(e) {
    var t = e ? e.pointerId : void 0, r = this.getStage(), i = this.getAbsolutePosition(), s = r._getPointerById(t) || r._changedPointerPositions[0] || i;
    xe._dragElements.set(this._id, {
      node: this,
      startPointerPos: s,
      offset: {
        x: s.x - i.x,
        y: s.y - i.y
      },
      dragStatus: "ready",
      pointerId: t
    });
  }
  startDrag(e, t = !0) {
    xe._dragElements.has(this._id) || this._createDragElement(e);
    const r = xe._dragElements.get(this._id);
    r.dragStatus = "dragging", this.fire("dragstart", {
      type: "dragstart",
      target: this,
      evt: e && e.evt
    }, t);
  }
  _setDragPosition(e, t) {
    const r = this.getStage()._getPointerById(t.pointerId);
    if (r) {
      var i = {
        x: r.x - t.offset.x,
        y: r.y - t.offset.y
      }, s = this.dragBoundFunc();
      if (s !== void 0) {
        const o = s.call(this, i, e);
        o ? i = o : N.warn("dragBoundFunc did not return any value. That is unexpected behavior. You must return new absolute position from dragBoundFunc.");
      }
      (!this._lastPos || this._lastPos.x !== i.x || this._lastPos.y !== i.y) && (this.setAbsolutePosition(i), this._requestDraw()), this._lastPos = i;
    }
  }
  stopDrag(e) {
    const t = xe._dragElements.get(this._id);
    t && (t.dragStatus = "stopped"), xe._endDragBefore(e), xe._endDragAfter(e);
  }
  setDraggable(e) {
    this._setAttr("draggable", e), this._dragChange();
  }
  isDragging() {
    const e = xe._dragElements.get(this._id);
    return e ? e.dragStatus === "dragging" : !1;
  }
  _listenDrag() {
    this._dragCleanup(), this.on("mousedown.konva touchstart.konva", function(e) {
      var t = e.evt.button !== void 0, r = !t || se.dragButtons.indexOf(e.evt.button) >= 0;
      if (r && !this.isDragging()) {
        var i = !1;
        xe._dragElements.forEach((s) => {
          this.isAncestorOf(s.node) && (i = !0);
        }), i || this._createDragElement(e);
      }
    });
  }
  _dragChange() {
    if (this.attrs.draggable)
      this._listenDrag();
    else {
      this._dragCleanup();
      var e = this.getStage();
      if (!e)
        return;
      const t = xe._dragElements.get(this._id), r = t && t.dragStatus === "dragging", i = t && t.dragStatus === "ready";
      r ? this.stopDrag() : i && xe._dragElements.delete(this._id);
    }
  }
  _dragCleanup() {
    this.off("mousedown.konva"), this.off("touchstart.konva");
  }
  isClientRectOnScreen(e = { x: 0, y: 0 }) {
    const t = this.getStage();
    if (!t)
      return !1;
    const r = {
      x: -e.x,
      y: -e.y,
      width: t.width() + 2 * e.x,
      height: t.height() + 2 * e.y
    };
    return N.haveIntersection(r, this.getClientRect());
  }
  static create(e, t) {
    return N._isString(e) && (e = JSON.parse(e)), this._createNode(e, t);
  }
  static _createNode(e, t) {
    var r = Gc.prototype.getClassName.call(e), i = e.children, s, o, a;
    t && (e.attrs.container = t), se[r] || (N.warn('Can not find a node with class name "' + r + '". Fallback to "Shape".'), r = "Shape");
    const l = se[r];
    if (s = new l(e.attrs), i)
      for (o = i.length, a = 0; a < o; a++)
        s.add(Gc._createNode(i[a]));
    return s;
  }
};
oe.prototype.nodeType = "Node";
oe.prototype._attrsAffectingSize = [];
oe.prototype.eventListeners = {};
oe.prototype.on.call(oe.prototype, M_, function() {
  if (this._batchingTransformChange) {
    this._needClearTransformCache = !0;
    return;
  }
  this._clearCache(ur), this._clearSelfAndDescendantCache(Un);
});
oe.prototype.on.call(oe.prototype, "visibleChange.konva", function() {
  this._clearSelfAndDescendantCache(Hc);
});
oe.prototype.on.call(oe.prototype, "listeningChange.konva", function() {
  this._clearSelfAndDescendantCache(zc);
});
oe.prototype.on.call(oe.prototype, "opacityChange.konva", function() {
  this._clearSelfAndDescendantCache(Ca);
});
const Re = F.addGetterSetter;
Re(oe, "zIndex");
Re(oe, "absolutePosition");
Re(oe, "position");
Re(oe, "x", 0, Ce());
Re(oe, "y", 0, Ce());
Re(oe, "globalCompositeOperation", "source-over", Po());
Re(oe, "opacity", 1, Ce());
Re(oe, "name", "", Po());
Re(oe, "id", "", Po());
Re(oe, "rotation", 0, Ce());
F.addComponentsGetterSetter(oe, "scale", ["x", "y"]);
Re(oe, "scaleX", 1, Ce());
Re(oe, "scaleY", 1, Ce());
F.addComponentsGetterSetter(oe, "skew", ["x", "y"]);
Re(oe, "skewX", 0, Ce());
Re(oe, "skewY", 0, Ce());
F.addComponentsGetterSetter(oe, "offset", ["x", "y"]);
Re(oe, "offsetX", 0, Ce());
Re(oe, "offsetY", 0, Ce());
Re(oe, "dragDistance", null, Ce());
Re(oe, "width", 0, Ce());
Re(oe, "height", 0, Ce());
Re(oe, "listening", !0, Si());
Re(oe, "preventDefault", !0, Si());
Re(oe, "filters", null, function(n) {
  return this._filterUpToDate = !1, n;
});
Re(oe, "visible", !0, Si());
Re(oe, "transformsEnabled", "all", Po());
Re(oe, "size");
Re(oe, "dragBoundFunc");
Re(oe, "draggable", !1, Si());
F.backCompat(oe, {
  rotateDeg: "rotate",
  setRotationDeg: "setRotation",
  getRotationDeg: "getRotation"
});
const lo = /* @__PURE__ */ new Map(), hg = se._global.PointerEvent !== void 0;
function Ql(n) {
  return lo.get(n);
}
function sf(n) {
  return {
    evt: n,
    pointerId: n.pointerId
  };
}
function pg(n, e) {
  return lo.get(n) === e;
}
function mg(n, e) {
  Ks(n), e.getStage() && (lo.set(n, e), hg && e._fire("gotpointercapture", sf(new PointerEvent("gotpointercapture"))));
}
function Ks(n, e) {
  const t = lo.get(n);
  if (!t)
    return;
  const r = t.getStage();
  r && r.content, lo.delete(n), hg && t._fire("lostpointercapture", sf(new PointerEvent("lostpointercapture")));
}
var gg = "hasShadow", yg = "shadowRGBA", vg = "patternImage", bg = "linearGradient", wg = "radialGradient";
let Qo;
function Zl() {
  return Qo || (Qo = N.createCanvasElement().getContext("2d"), Qo);
}
const ec = {};
function N_(n) {
  n.fill();
}
function P_(n) {
  n.stroke();
}
function I_(n) {
  n.fill();
}
function D_(n) {
  n.stroke();
}
function L_() {
  this._clearCache(gg);
}
function R_() {
  this._clearCache(yg);
}
function F_() {
  this._clearCache(vg);
}
function $_() {
  this._clearCache(bg);
}
function B_() {
  this._clearCache(wg);
}
class j extends oe {
  constructor(e) {
    super(e);
    let t;
    for (; t = N.getRandomColor(), !(t && !(t in ec)); )
      ;
    this.colorKey = t, ec[t] = this;
  }
  getContext() {
    return N.warn("shape.getContext() method is deprecated. Please do not use it."), this.getLayer().getContext();
  }
  getCanvas() {
    return N.warn("shape.getCanvas() method is deprecated. Please do not use it."), this.getLayer().getCanvas();
  }
  getSceneFunc() {
    return this.attrs.sceneFunc || this._sceneFunc;
  }
  getHitFunc() {
    return this.attrs.hitFunc || this._hitFunc;
  }
  hasShadow() {
    return this._getCache(gg, this._hasShadow);
  }
  _hasShadow() {
    return this.shadowEnabled() && this.shadowOpacity() !== 0 && !!(this.shadowColor() || this.shadowBlur() || this.shadowOffsetX() || this.shadowOffsetY());
  }
  _getFillPattern() {
    return this._getCache(vg, this.__getFillPattern);
  }
  __getFillPattern() {
    if (this.fillPatternImage()) {
      var e = Zl();
      const t = e.createPattern(this.fillPatternImage(), this.fillPatternRepeat() || "repeat");
      if (t && t.setTransform) {
        const r = new Rs();
        r.translate(this.fillPatternX(), this.fillPatternY()), r.rotate(se.getAngle(this.fillPatternRotation())), r.scale(this.fillPatternScaleX(), this.fillPatternScaleY()), r.translate(-1 * this.fillPatternOffsetX(), -1 * this.fillPatternOffsetY());
        const i = r.getMatrix(), s = typeof DOMMatrix > "u" ? {
          a: i[0],
          b: i[1],
          c: i[2],
          d: i[3],
          e: i[4],
          f: i[5]
        } : new DOMMatrix(i);
        t.setTransform(s);
      }
      return t;
    }
  }
  _getLinearGradient() {
    return this._getCache(bg, this.__getLinearGradient);
  }
  __getLinearGradient() {
    var e = this.fillLinearGradientColorStops();
    if (e) {
      for (var t = Zl(), r = this.fillLinearGradientStartPoint(), i = this.fillLinearGradientEndPoint(), s = t.createLinearGradient(r.x, r.y, i.x, i.y), o = 0; o < e.length; o += 2)
        s.addColorStop(e[o], e[o + 1]);
      return s;
    }
  }
  _getRadialGradient() {
    return this._getCache(wg, this.__getRadialGradient);
  }
  __getRadialGradient() {
    var e = this.fillRadialGradientColorStops();
    if (e) {
      for (var t = Zl(), r = this.fillRadialGradientStartPoint(), i = this.fillRadialGradientEndPoint(), s = t.createRadialGradient(r.x, r.y, this.fillRadialGradientStartRadius(), i.x, i.y, this.fillRadialGradientEndRadius()), o = 0; o < e.length; o += 2)
        s.addColorStop(e[o], e[o + 1]);
      return s;
    }
  }
  getShadowRGBA() {
    return this._getCache(yg, this._getShadowRGBA);
  }
  _getShadowRGBA() {
    if (this.hasShadow()) {
      var e = N.colorToRGBA(this.shadowColor());
      if (e)
        return "rgba(" + e.r + "," + e.g + "," + e.b + "," + e.a * (this.shadowOpacity() || 1) + ")";
    }
  }
  hasFill() {
    return this._calculate("hasFill", [
      "fillEnabled",
      "fill",
      "fillPatternImage",
      "fillLinearGradientColorStops",
      "fillRadialGradientColorStops"
    ], () => this.fillEnabled() && !!(this.fill() || this.fillPatternImage() || this.fillLinearGradientColorStops() || this.fillRadialGradientColorStops()));
  }
  hasStroke() {
    return this._calculate("hasStroke", [
      "strokeEnabled",
      "strokeWidth",
      "stroke",
      "strokeLinearGradientColorStops"
    ], () => this.strokeEnabled() && this.strokeWidth() && !!(this.stroke() || this.strokeLinearGradientColorStops()));
  }
  hasHitStroke() {
    const e = this.hitStrokeWidth();
    return e === "auto" ? this.hasStroke() : this.strokeEnabled() && !!e;
  }
  intersects(e) {
    var t = this.getStage(), r = t.bufferHitCanvas, i;
    return r.getContext().clear(), this.drawHit(r, null, !0), i = r.context.getImageData(Math.round(e.x), Math.round(e.y), 1, 1).data, i[3] > 0;
  }
  destroy() {
    return oe.prototype.destroy.call(this), delete ec[this.colorKey], delete this.colorKey, this;
  }
  _useBufferCanvas(e) {
    var t;
    if (!this.getStage() || !((t = this.attrs.perfectDrawEnabled) !== null && t !== void 0 ? t : !0))
      return !1;
    const i = e || this.hasFill(), s = this.hasStroke(), o = this.getAbsoluteOpacity() !== 1;
    if (i && s && o)
      return !0;
    const a = this.hasShadow(), l = this.shadowForStrokeEnabled();
    return !!(i && s && a && l);
  }
  setStrokeHitEnabled(e) {
    N.warn("strokeHitEnabled property is deprecated. Please use hitStrokeWidth instead."), e ? this.hitStrokeWidth("auto") : this.hitStrokeWidth(0);
  }
  getStrokeHitEnabled() {
    return this.hitStrokeWidth() !== 0;
  }
  getSelfRect() {
    var e = this.size();
    return {
      x: this._centroid ? -e.width / 2 : 0,
      y: this._centroid ? -e.height / 2 : 0,
      width: e.width,
      height: e.height
    };
  }
  getClientRect(e = {}) {
    const t = e.skipTransform, r = e.relativeTo, i = this.getSelfRect(), o = !e.skipStroke && this.hasStroke() && this.strokeWidth() || 0, a = i.width + o, l = i.height + o, c = !e.skipShadow && this.hasShadow(), u = c ? this.shadowOffsetX() : 0, f = c ? this.shadowOffsetY() : 0, d = a + Math.abs(u), p = l + Math.abs(f), h = c && this.shadowBlur() || 0, m = d + h * 2, g = p + h * 2, v = {
      width: m,
      height: g,
      x: -(o / 2 + h) + Math.min(u, 0) + i.x,
      y: -(o / 2 + h) + Math.min(f, 0) + i.y
    };
    return t ? v : this._transformedRect(v, r);
  }
  drawScene(e, t) {
    var r = this.getLayer(), i = e || r.getCanvas(), s = i.getContext(), o = this._getCanvasCache(), a = this.getSceneFunc(), l = this.hasShadow(), c, u, f, d = i.isCache, p = t === this;
    if (!this.isVisible() && !p)
      return this;
    if (o) {
      s.save();
      var h = this.getAbsoluteTransform(t).getMatrix();
      return s.transform(h[0], h[1], h[2], h[3], h[4], h[5]), this._drawCachedSceneCanvas(s), s.restore(), this;
    }
    if (!a)
      return this;
    if (s.save(), this._useBufferCanvas() && !d) {
      c = this.getStage(), u = c.bufferCanvas, f = u.getContext(), f.clear(), f.save(), f._applyLineJoin(this);
      var m = this.getAbsoluteTransform(t).getMatrix();
      f.transform(m[0], m[1], m[2], m[3], m[4], m[5]), a.call(this, f, this), f.restore();
      var g = u.pixelRatio;
      l && s._applyShadow(this), s._applyOpacity(this), s._applyGlobalCompositeOperation(this), s.drawImage(u._canvas, 0, 0, u.width / g, u.height / g);
    } else {
      if (s._applyLineJoin(this), !p) {
        var m = this.getAbsoluteTransform(t).getMatrix();
        s.transform(m[0], m[1], m[2], m[3], m[4], m[5]), s._applyOpacity(this), s._applyGlobalCompositeOperation(this);
      }
      l && s._applyShadow(this), a.call(this, s, this);
    }
    return s.restore(), this;
  }
  drawHit(e, t, r = !1) {
    if (!this.shouldDrawHit(t, r))
      return this;
    var i = this.getLayer(), s = e || i.hitCanvas, o = s && s.getContext(), a = this.hitFunc() || this.sceneFunc(), l = this._getCanvasCache(), c = l && l.hit;
    if (this.colorKey || N.warn("Looks like your canvas has a destroyed shape in it. Do not reuse shape after you destroyed it. If you want to reuse shape you should call remove() instead of destroy()"), c) {
      o.save();
      var u = this.getAbsoluteTransform(t).getMatrix();
      return o.transform(u[0], u[1], u[2], u[3], u[4], u[5]), this._drawCachedHitCanvas(o), o.restore(), this;
    }
    if (!a)
      return this;
    if (o.save(), o._applyLineJoin(this), !(this === t)) {
      var d = this.getAbsoluteTransform(t).getMatrix();
      o.transform(d[0], d[1], d[2], d[3], d[4], d[5]);
    }
    return a.call(this, o, this), o.restore(), this;
  }
  drawHitFromCache(e = 0) {
    var t = this._getCanvasCache(), r = this._getCachedSceneCanvas(), i = t.hit, s = i.getContext(), o = i.getWidth(), a = i.getHeight(), l, c, u, f, d, p;
    s.clear(), s.drawImage(r._canvas, 0, 0, o, a);
    try {
      for (l = s.getImageData(0, 0, o, a), c = l.data, u = c.length, f = N._hexToRgb(this.colorKey), d = 0; d < u; d += 4)
        p = c[d + 3], p > e ? (c[d] = f.r, c[d + 1] = f.g, c[d + 2] = f.b, c[d + 3] = 255) : c[d + 3] = 0;
      s.putImageData(l, 0, 0);
    } catch (h) {
      N.error("Unable to draw hit graph from cached scene canvas. " + h.message);
    }
    return this;
  }
  hasPointerCapture(e) {
    return pg(e, this);
  }
  setPointerCapture(e) {
    mg(e, this);
  }
  releaseCapture(e) {
    Ks(e);
  }
}
j.prototype._fillFunc = N_;
j.prototype._strokeFunc = P_;
j.prototype._fillFuncHit = I_;
j.prototype._strokeFuncHit = D_;
j.prototype._centroid = !1;
j.prototype.nodeType = "Shape";
vs(j);
j.prototype.eventListeners = {};
j.prototype.on.call(j.prototype, "shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", L_);
j.prototype.on.call(j.prototype, "shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", R_);
j.prototype.on.call(j.prototype, "fillPriorityChange.konva fillPatternImageChange.konva fillPatternRepeatChange.konva fillPatternScaleXChange.konva fillPatternScaleYChange.konva fillPatternOffsetXChange.konva fillPatternOffsetYChange.konva fillPatternXChange.konva fillPatternYChange.konva fillPatternRotationChange.konva", F_);
j.prototype.on.call(j.prototype, "fillPriorityChange.konva fillLinearGradientColorStopsChange.konva fillLinearGradientStartPointXChange.konva fillLinearGradientStartPointYChange.konva fillLinearGradientEndPointXChange.konva fillLinearGradientEndPointYChange.konva", $_);
j.prototype.on.call(j.prototype, "fillPriorityChange.konva fillRadialGradientColorStopsChange.konva fillRadialGradientStartPointXChange.konva fillRadialGradientStartPointYChange.konva fillRadialGradientEndPointXChange.konva fillRadialGradientEndPointYChange.konva fillRadialGradientStartRadiusChange.konva fillRadialGradientEndRadiusChange.konva", B_);
F.addGetterSetter(j, "stroke", void 0, fg());
F.addGetterSetter(j, "strokeWidth", 2, Ce());
F.addGetterSetter(j, "fillAfterStrokeEnabled", !1);
F.addGetterSetter(j, "hitStrokeWidth", "auto", c_());
F.addGetterSetter(j, "strokeHitEnabled", !0, Si());
F.addGetterSetter(j, "perfectDrawEnabled", !0, Si());
F.addGetterSetter(j, "shadowForStrokeEnabled", !0, Si());
F.addGetterSetter(j, "lineJoin");
F.addGetterSetter(j, "lineCap");
F.addGetterSetter(j, "sceneFunc");
F.addGetterSetter(j, "hitFunc");
F.addGetterSetter(j, "dash");
F.addGetterSetter(j, "dashOffset", 0, Ce());
F.addGetterSetter(j, "shadowColor", void 0, Po());
F.addGetterSetter(j, "shadowBlur", 0, Ce());
F.addGetterSetter(j, "shadowOpacity", 1, Ce());
F.addComponentsGetterSetter(j, "shadowOffset", ["x", "y"]);
F.addGetterSetter(j, "shadowOffsetX", 0, Ce());
F.addGetterSetter(j, "shadowOffsetY", 0, Ce());
F.addGetterSetter(j, "fillPatternImage");
F.addGetterSetter(j, "fill", void 0, fg());
F.addGetterSetter(j, "fillPatternX", 0, Ce());
F.addGetterSetter(j, "fillPatternY", 0, Ce());
F.addGetterSetter(j, "fillLinearGradientColorStops");
F.addGetterSetter(j, "strokeLinearGradientColorStops");
F.addGetterSetter(j, "fillRadialGradientStartRadius", 0);
F.addGetterSetter(j, "fillRadialGradientEndRadius", 0);
F.addGetterSetter(j, "fillRadialGradientColorStops");
F.addGetterSetter(j, "fillPatternRepeat", "repeat");
F.addGetterSetter(j, "fillEnabled", !0);
F.addGetterSetter(j, "strokeEnabled", !0);
F.addGetterSetter(j, "shadowEnabled", !0);
F.addGetterSetter(j, "dashEnabled", !0);
F.addGetterSetter(j, "strokeScaleEnabled", !0);
F.addGetterSetter(j, "fillPriority", "color");
F.addComponentsGetterSetter(j, "fillPatternOffset", ["x", "y"]);
F.addGetterSetter(j, "fillPatternOffsetX", 0, Ce());
F.addGetterSetter(j, "fillPatternOffsetY", 0, Ce());
F.addComponentsGetterSetter(j, "fillPatternScale", ["x", "y"]);
F.addGetterSetter(j, "fillPatternScaleX", 1, Ce());
F.addGetterSetter(j, "fillPatternScaleY", 1, Ce());
F.addComponentsGetterSetter(j, "fillLinearGradientStartPoint", [
  "x",
  "y"
]);
F.addComponentsGetterSetter(j, "strokeLinearGradientStartPoint", [
  "x",
  "y"
]);
F.addGetterSetter(j, "fillLinearGradientStartPointX", 0);
F.addGetterSetter(j, "strokeLinearGradientStartPointX", 0);
F.addGetterSetter(j, "fillLinearGradientStartPointY", 0);
F.addGetterSetter(j, "strokeLinearGradientStartPointY", 0);
F.addComponentsGetterSetter(j, "fillLinearGradientEndPoint", [
  "x",
  "y"
]);
F.addComponentsGetterSetter(j, "strokeLinearGradientEndPoint", [
  "x",
  "y"
]);
F.addGetterSetter(j, "fillLinearGradientEndPointX", 0);
F.addGetterSetter(j, "strokeLinearGradientEndPointX", 0);
F.addGetterSetter(j, "fillLinearGradientEndPointY", 0);
F.addGetterSetter(j, "strokeLinearGradientEndPointY", 0);
F.addComponentsGetterSetter(j, "fillRadialGradientStartPoint", [
  "x",
  "y"
]);
F.addGetterSetter(j, "fillRadialGradientStartPointX", 0);
F.addGetterSetter(j, "fillRadialGradientStartPointY", 0);
F.addComponentsGetterSetter(j, "fillRadialGradientEndPoint", [
  "x",
  "y"
]);
F.addGetterSetter(j, "fillRadialGradientEndPointX", 0);
F.addGetterSetter(j, "fillRadialGradientEndPointY", 0);
F.addGetterSetter(j, "fillPatternRotation", 0);
F.backCompat(j, {
  dashArray: "dash",
  getDashArray: "getDash",
  setDashArray: "getDash",
  drawFunc: "sceneFunc",
  getDrawFunc: "getSceneFunc",
  setDrawFunc: "setSceneFunc",
  drawHitFunc: "hitFunc",
  getDrawHitFunc: "getHitFunc",
  setDrawHitFunc: "setHitFunc"
});
function Wc(n, e, t, r, i, s, o) {
  var a = Math.sqrt(Math.pow(t - n, 2) + Math.pow(r - e, 2)), l = Math.sqrt(Math.pow(i - t, 2) + Math.pow(s - r, 2)), c = o * a / (a + l), u = o * l / (a + l), f = t - c * (i - n), d = r - c * (s - e), p = t + u * (i - n), h = r + u * (s - e);
  return [f, d, p, h];
}
function th(n, e) {
  var t = n.length, r = [], i, s;
  for (i = 2; i < t - 2; i += 2)
    s = Wc(n[i - 2], n[i - 1], n[i], n[i + 1], n[i + 2], n[i + 3], e), !isNaN(s[0]) && (r.push(s[0]), r.push(s[1]), r.push(n[i]), r.push(n[i + 1]), r.push(s[2]), r.push(s[3]));
  return r;
}
class Br extends j {
  constructor(e) {
    super(e), this.on("pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva", function() {
      this._clearCache("tensionPoints");
    });
  }
  _sceneFunc(e) {
    var t = this.points(), r = t.length, i = this.tension(), s = this.closed(), o = this.bezier(), a, l, c;
    if (r) {
      if (e.beginPath(), e.moveTo(t[0], t[1]), i !== 0 && r > 4) {
        for (a = this.getTensionPoints(), l = a.length, c = s ? 0 : 4, s || e.quadraticCurveTo(a[0], a[1], a[2], a[3]); c < l - 2; )
          e.bezierCurveTo(a[c++], a[c++], a[c++], a[c++], a[c++], a[c++]);
        s || e.quadraticCurveTo(a[l - 2], a[l - 1], t[r - 2], t[r - 1]);
      } else if (o)
        for (c = 2; c < r; )
          e.bezierCurveTo(t[c++], t[c++], t[c++], t[c++], t[c++], t[c++]);
      else
        for (c = 2; c < r; c += 2)
          e.lineTo(t[c], t[c + 1]);
      s ? (e.closePath(), e.fillStrokeShape(this)) : e.strokeShape(this);
    }
  }
  getTensionPoints() {
    return this._getCache("tensionPoints", this._getTensionPoints);
  }
  _getTensionPoints() {
    return this.closed() ? this._getTensionPointsClosed() : th(this.points(), this.tension());
  }
  _getTensionPointsClosed() {
    var e = this.points(), t = e.length, r = this.tension(), i = Wc(e[t - 2], e[t - 1], e[0], e[1], e[2], e[3], r), s = Wc(e[t - 4], e[t - 3], e[t - 2], e[t - 1], e[0], e[1], r), o = th(e, r), a = [i[2], i[3]].concat(o).concat([
      s[0],
      s[1],
      e[t - 2],
      e[t - 1],
      s[2],
      s[3],
      i[0],
      i[1],
      e[0],
      e[1]
    ]);
    return a;
  }
  getWidth() {
    return this.getSelfRect().width;
  }
  getHeight() {
    return this.getSelfRect().height;
  }
  getSelfRect() {
    var e = this.points();
    if (e.length < 4)
      return {
        x: e[0] || 0,
        y: e[1] || 0,
        width: 0,
        height: 0
      };
    this.tension() !== 0 ? e = [
      e[0],
      e[1],
      ...this._getTensionPoints(),
      e[e.length - 2],
      e[e.length - 1]
    ] : e = this.points();
    for (var t = e[0], r = e[0], i = e[1], s = e[1], o, a, l = 0; l < e.length / 2; l++)
      o = e[l * 2], a = e[l * 2 + 1], t = Math.min(t, o), r = Math.max(r, o), i = Math.min(i, a), s = Math.max(s, a);
    return {
      x: t,
      y: i,
      width: r - t,
      height: s - i
    };
  }
}
Br.prototype.className = "Line";
Br.prototype._attrsAffectingSize = ["points", "bezier", "tension"];
vs(Br);
F.addGetterSetter(Br, "closed", !1);
F.addGetterSetter(Br, "bezier", !1);
F.addGetterSetter(Br, "tension", 0, Ce());
F.addGetterSetter(Br, "points", [], u_());
class ct extends j {
  constructor(e) {
    super(e), this.dataArray = [], this.pathLength = 0, this.dataArray = ct.parsePathData(this.data()), this.pathLength = 0;
    for (var t = 0; t < this.dataArray.length; ++t)
      this.pathLength += this.dataArray[t].pathLength;
    this.on("dataChange.konva", function() {
      this.dataArray = ct.parsePathData(this.data()), this.pathLength = 0;
      for (var r = 0; r < this.dataArray.length; ++r)
        this.pathLength += this.dataArray[r].pathLength;
    });
  }
  _sceneFunc(e) {
    var t = this.dataArray;
    e.beginPath();
    for (var r = !1, i = 0; i < t.length; i++) {
      var s = t[i].command, o = t[i].points;
      switch (s) {
        case "L":
          e.lineTo(o[0], o[1]);
          break;
        case "M":
          e.moveTo(o[0], o[1]);
          break;
        case "C":
          e.bezierCurveTo(o[0], o[1], o[2], o[3], o[4], o[5]);
          break;
        case "Q":
          e.quadraticCurveTo(o[0], o[1], o[2], o[3]);
          break;
        case "A":
          var a = o[0], l = o[1], c = o[2], u = o[3], f = o[4], d = o[5], p = o[6], h = o[7], m = c > u ? c : u, g = c > u ? 1 : c / u, v = c > u ? u / c : 1;
          e.translate(a, l), e.rotate(p), e.scale(g, v), e.arc(0, 0, m, f, f + d, 1 - h), e.scale(1 / g, 1 / v), e.rotate(-p), e.translate(-a, -l);
          break;
        case "z":
          r = !0, e.closePath();
          break;
      }
    }
    !r && !this.hasFill() ? e.strokeShape(this) : e.fillStrokeShape(this);
  }
  getSelfRect() {
    var e = [];
    this.dataArray.forEach(function(c) {
      if (c.command === "A") {
        var u = c.points[4], f = c.points[5], d = c.points[4] + f, p = Math.PI / 180;
        if (Math.abs(u - d) < p && (p = Math.abs(u - d)), f < 0)
          for (let h = u - p; h > d; h -= p) {
            const m = ct.getPointOnEllipticalArc(c.points[0], c.points[1], c.points[2], c.points[3], h, 0);
            e.push(m.x, m.y);
          }
        else
          for (let h = u + p; h < d; h += p) {
            const m = ct.getPointOnEllipticalArc(c.points[0], c.points[1], c.points[2], c.points[3], h, 0);
            e.push(m.x, m.y);
          }
      } else if (c.command === "C")
        for (let h = 0; h <= 1; h += 0.01) {
          const m = ct.getPointOnCubicBezier(h, c.start.x, c.start.y, c.points[0], c.points[1], c.points[2], c.points[3], c.points[4], c.points[5]);
          e.push(m.x, m.y);
        }
      else
        e = e.concat(c.points);
    });
    for (var t = e[0], r = e[0], i = e[1], s = e[1], o, a, l = 0; l < e.length / 2; l++)
      o = e[l * 2], a = e[l * 2 + 1], isNaN(o) || (t = Math.min(t, o), r = Math.max(r, o)), isNaN(a) || (i = Math.min(i, a), s = Math.max(s, a));
    return {
      x: t,
      y: i,
      width: r - t,
      height: s - i
    };
  }
  getLength() {
    return this.pathLength;
  }
  getPointAtLength(e) {
    var t, r = 0, i = this.dataArray.length;
    if (!i)
      return null;
    for (; r < i && e > this.dataArray[r].pathLength; )
      e -= this.dataArray[r].pathLength, ++r;
    if (r === i)
      return t = this.dataArray[r - 1].points.slice(-2), {
        x: t[0],
        y: t[1]
      };
    if (e < 0.01)
      return t = this.dataArray[r].points.slice(0, 2), {
        x: t[0],
        y: t[1]
      };
    var s = this.dataArray[r], o = s.points;
    switch (s.command) {
      case "L":
        return ct.getPointOnLine(e, s.start.x, s.start.y, o[0], o[1]);
      case "C":
        return ct.getPointOnCubicBezier(e / s.pathLength, s.start.x, s.start.y, o[0], o[1], o[2], o[3], o[4], o[5]);
      case "Q":
        return ct.getPointOnQuadraticBezier(e / s.pathLength, s.start.x, s.start.y, o[0], o[1], o[2], o[3]);
      case "A":
        var a = o[0], l = o[1], c = o[2], u = o[3], f = o[4], d = o[5], p = o[6];
        return f += d * e / s.pathLength, ct.getPointOnEllipticalArc(a, l, c, u, f, p);
    }
    return null;
  }
  static getLineLength(e, t, r, i) {
    return Math.sqrt((r - e) * (r - e) + (i - t) * (i - t));
  }
  static getPointOnLine(e, t, r, i, s, o, a) {
    o === void 0 && (o = t), a === void 0 && (a = r);
    var l = (s - r) / (i - t + 1e-8), c = Math.sqrt(e * e / (1 + l * l));
    i < t && (c *= -1);
    var u = l * c, f;
    if (i === t)
      f = {
        x: o,
        y: a + u
      };
    else if ((a - r) / (o - t + 1e-8) === l)
      f = {
        x: o + c,
        y: a + u
      };
    else {
      var d, p, h = this.getLineLength(t, r, i, s), m = (o - t) * (i - t) + (a - r) * (s - r);
      m = m / (h * h), d = t + m * (i - t), p = r + m * (s - r);
      var g = this.getLineLength(o, a, d, p), v = Math.sqrt(e * e - g * g);
      c = Math.sqrt(v * v / (1 + l * l)), i < t && (c *= -1), u = l * c, f = {
        x: d + c,
        y: p + u
      };
    }
    return f;
  }
  static getPointOnCubicBezier(e, t, r, i, s, o, a, l, c) {
    function u(g) {
      return g * g * g;
    }
    function f(g) {
      return 3 * g * g * (1 - g);
    }
    function d(g) {
      return 3 * g * (1 - g) * (1 - g);
    }
    function p(g) {
      return (1 - g) * (1 - g) * (1 - g);
    }
    var h = l * u(e) + o * f(e) + i * d(e) + t * p(e), m = c * u(e) + a * f(e) + s * d(e) + r * p(e);
    return {
      x: h,
      y: m
    };
  }
  static getPointOnQuadraticBezier(e, t, r, i, s, o, a) {
    function l(p) {
      return p * p;
    }
    function c(p) {
      return 2 * p * (1 - p);
    }
    function u(p) {
      return (1 - p) * (1 - p);
    }
    var f = o * l(e) + i * c(e) + t * u(e), d = a * l(e) + s * c(e) + r * u(e);
    return {
      x: f,
      y: d
    };
  }
  static getPointOnEllipticalArc(e, t, r, i, s, o) {
    var a = Math.cos(o), l = Math.sin(o), c = {
      x: r * Math.cos(s),
      y: i * Math.sin(s)
    };
    return {
      x: e + (c.x * a - c.y * l),
      y: t + (c.x * l + c.y * a)
    };
  }
  static parsePathData(e) {
    if (!e)
      return [];
    var t = e, r = [
      "m",
      "M",
      "l",
      "L",
      "v",
      "V",
      "h",
      "H",
      "z",
      "Z",
      "c",
      "C",
      "q",
      "Q",
      "t",
      "T",
      "s",
      "S",
      "a",
      "A"
    ];
    t = t.replace(new RegExp(" ", "g"), ",");
    for (var i = 0; i < r.length; i++)
      t = t.replace(new RegExp(r[i], "g"), "|" + r[i]);
    var s = t.split("|"), o = [], a = [], l = 0, c = 0, u = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi, f;
    for (i = 1; i < s.length; i++) {
      var d = s[i], p = d.charAt(0);
      for (d = d.slice(1), a.length = 0; f = u.exec(d); )
        a.push(f[0]);
      for (var h = [], m = 0, g = a.length; m < g; m++) {
        if (a[m] === "00") {
          h.push(0, 0);
          continue;
        }
        var v = parseFloat(a[m]);
        isNaN(v) ? h.push(0) : h.push(v);
      }
      for (; h.length > 0 && !isNaN(h[0]); ) {
        var w = null, b = [], y = l, k = c, C, S, O, T, V, X, W, Q, Me, Ae;
        switch (p) {
          case "l":
            l += h.shift(), c += h.shift(), w = "L", b.push(l, c);
            break;
          case "L":
            l = h.shift(), c = h.shift(), b.push(l, c);
            break;
          case "m":
            var be = h.shift(), Ee = h.shift();
            if (l += be, c += Ee, w = "M", o.length > 2 && o[o.length - 1].command === "z") {
              for (var _e = o.length - 2; _e >= 0; _e--)
                if (o[_e].command === "M") {
                  l = o[_e].points[0] + be, c = o[_e].points[1] + Ee;
                  break;
                }
            }
            b.push(l, c), p = "l";
            break;
          case "M":
            l = h.shift(), c = h.shift(), w = "M", b.push(l, c), p = "L";
            break;
          case "h":
            l += h.shift(), w = "L", b.push(l, c);
            break;
          case "H":
            l = h.shift(), w = "L", b.push(l, c);
            break;
          case "v":
            c += h.shift(), w = "L", b.push(l, c);
            break;
          case "V":
            c = h.shift(), w = "L", b.push(l, c);
            break;
          case "C":
            b.push(h.shift(), h.shift(), h.shift(), h.shift()), l = h.shift(), c = h.shift(), b.push(l, c);
            break;
          case "c":
            b.push(l + h.shift(), c + h.shift(), l + h.shift(), c + h.shift()), l += h.shift(), c += h.shift(), w = "C", b.push(l, c);
            break;
          case "S":
            S = l, O = c, C = o[o.length - 1], C.command === "C" && (S = l + (l - C.points[2]), O = c + (c - C.points[3])), b.push(S, O, h.shift(), h.shift()), l = h.shift(), c = h.shift(), w = "C", b.push(l, c);
            break;
          case "s":
            S = l, O = c, C = o[o.length - 1], C.command === "C" && (S = l + (l - C.points[2]), O = c + (c - C.points[3])), b.push(S, O, l + h.shift(), c + h.shift()), l += h.shift(), c += h.shift(), w = "C", b.push(l, c);
            break;
          case "Q":
            b.push(h.shift(), h.shift()), l = h.shift(), c = h.shift(), b.push(l, c);
            break;
          case "q":
            b.push(l + h.shift(), c + h.shift()), l += h.shift(), c += h.shift(), w = "Q", b.push(l, c);
            break;
          case "T":
            S = l, O = c, C = o[o.length - 1], C.command === "Q" && (S = l + (l - C.points[0]), O = c + (c - C.points[1])), l = h.shift(), c = h.shift(), w = "Q", b.push(S, O, l, c);
            break;
          case "t":
            S = l, O = c, C = o[o.length - 1], C.command === "Q" && (S = l + (l - C.points[0]), O = c + (c - C.points[1])), l += h.shift(), c += h.shift(), w = "Q", b.push(S, O, l, c);
            break;
          case "A":
            T = h.shift(), V = h.shift(), X = h.shift(), W = h.shift(), Q = h.shift(), Me = l, Ae = c, l = h.shift(), c = h.shift(), w = "A", b = this.convertEndpointToCenterParameterization(Me, Ae, l, c, W, Q, T, V, X);
            break;
          case "a":
            T = h.shift(), V = h.shift(), X = h.shift(), W = h.shift(), Q = h.shift(), Me = l, Ae = c, l += h.shift(), c += h.shift(), w = "A", b = this.convertEndpointToCenterParameterization(Me, Ae, l, c, W, Q, T, V, X);
            break;
        }
        o.push({
          command: w || p,
          points: b,
          start: {
            x: y,
            y: k
          },
          pathLength: this.calcLength(y, k, w || p, b)
        });
      }
      (p === "z" || p === "Z") && o.push({
        command: "z",
        points: [],
        start: void 0,
        pathLength: 0
      });
    }
    return o;
  }
  static calcLength(e, t, r, i) {
    var s, o, a, l, c = ct;
    switch (r) {
      case "L":
        return c.getLineLength(e, t, i[0], i[1]);
      case "C":
        for (s = 0, o = c.getPointOnCubicBezier(0, e, t, i[0], i[1], i[2], i[3], i[4], i[5]), l = 0.01; l <= 1; l += 0.01)
          a = c.getPointOnCubicBezier(l, e, t, i[0], i[1], i[2], i[3], i[4], i[5]), s += c.getLineLength(o.x, o.y, a.x, a.y), o = a;
        return s;
      case "Q":
        for (s = 0, o = c.getPointOnQuadraticBezier(0, e, t, i[0], i[1], i[2], i[3]), l = 0.01; l <= 1; l += 0.01)
          a = c.getPointOnQuadraticBezier(l, e, t, i[0], i[1], i[2], i[3]), s += c.getLineLength(o.x, o.y, a.x, a.y), o = a;
        return s;
      case "A":
        s = 0;
        var u = i[4], f = i[5], d = i[4] + f, p = Math.PI / 180;
        if (Math.abs(u - d) < p && (p = Math.abs(u - d)), o = c.getPointOnEllipticalArc(i[0], i[1], i[2], i[3], u, 0), f < 0)
          for (l = u - p; l > d; l -= p)
            a = c.getPointOnEllipticalArc(i[0], i[1], i[2], i[3], l, 0), s += c.getLineLength(o.x, o.y, a.x, a.y), o = a;
        else
          for (l = u + p; l < d; l += p)
            a = c.getPointOnEllipticalArc(i[0], i[1], i[2], i[3], l, 0), s += c.getLineLength(o.x, o.y, a.x, a.y), o = a;
        return a = c.getPointOnEllipticalArc(i[0], i[1], i[2], i[3], d, 0), s += c.getLineLength(o.x, o.y, a.x, a.y), s;
    }
    return 0;
  }
  static convertEndpointToCenterParameterization(e, t, r, i, s, o, a, l, c) {
    var u = c * (Math.PI / 180), f = Math.cos(u) * (e - r) / 2 + Math.sin(u) * (t - i) / 2, d = -1 * Math.sin(u) * (e - r) / 2 + Math.cos(u) * (t - i) / 2, p = f * f / (a * a) + d * d / (l * l);
    p > 1 && (a *= Math.sqrt(p), l *= Math.sqrt(p));
    var h = Math.sqrt((a * a * (l * l) - a * a * (d * d) - l * l * (f * f)) / (a * a * (d * d) + l * l * (f * f)));
    s === o && (h *= -1), isNaN(h) && (h = 0);
    var m = h * a * d / l, g = h * -l * f / a, v = (e + r) / 2 + Math.cos(u) * m - Math.sin(u) * g, w = (t + i) / 2 + Math.sin(u) * m + Math.cos(u) * g, b = function(V) {
      return Math.sqrt(V[0] * V[0] + V[1] * V[1]);
    }, y = function(V, X) {
      return (V[0] * X[0] + V[1] * X[1]) / (b(V) * b(X));
    }, k = function(V, X) {
      return (V[0] * X[1] < V[1] * X[0] ? -1 : 1) * Math.acos(y(V, X));
    }, C = k([1, 0], [(f - m) / a, (d - g) / l]), S = [(f - m) / a, (d - g) / l], O = [(-1 * f - m) / a, (-1 * d - g) / l], T = k(S, O);
    return y(S, O) <= -1 && (T = Math.PI), y(S, O) >= 1 && (T = 0), o === 0 && T > 0 && (T = T - 2 * Math.PI), o === 1 && T < 0 && (T = T + 2 * Math.PI), [v, w, a, l, C, T, u, o];
  }
}
ct.prototype.className = "Path";
ct.prototype._attrsAffectingSize = ["data"];
vs(ct);
F.addGetterSetter(ct, "data");
class jr extends Br {
  _sceneFunc(e) {
    super._sceneFunc(e);
    var t = Math.PI * 2, r = this.points(), i = r, s = this.tension() !== 0 && r.length > 4;
    s && (i = this.getTensionPoints());
    var o = this.pointerLength(), a = r.length, l, c;
    if (s) {
      const d = [
        i[i.length - 4],
        i[i.length - 3],
        i[i.length - 2],
        i[i.length - 1],
        r[a - 2],
        r[a - 1]
      ], p = ct.calcLength(i[i.length - 4], i[i.length - 3], "C", d), h = ct.getPointOnQuadraticBezier(Math.min(1, 1 - o / p), d[0], d[1], d[2], d[3], d[4], d[5]);
      l = r[a - 2] - h.x, c = r[a - 1] - h.y;
    } else
      l = r[a - 2] - r[a - 4], c = r[a - 1] - r[a - 3];
    var u = (Math.atan2(c, l) + t) % t, f = this.pointerWidth();
    this.pointerAtEnding() && (e.save(), e.beginPath(), e.translate(r[a - 2], r[a - 1]), e.rotate(u), e.moveTo(0, 0), e.lineTo(-o, f / 2), e.lineTo(-o, -f / 2), e.closePath(), e.restore(), this.__fillStroke(e)), this.pointerAtBeginning() && (e.save(), e.beginPath(), e.translate(r[0], r[1]), s ? (l = (i[0] + i[2]) / 2 - r[0], c = (i[1] + i[3]) / 2 - r[1]) : (l = r[2] - r[0], c = r[3] - r[1]), e.rotate((Math.atan2(-c, -l) + t) % t), e.moveTo(0, 0), e.lineTo(-o, f / 2), e.lineTo(-o, -f / 2), e.closePath(), e.restore(), this.__fillStroke(e));
  }
  __fillStroke(e) {
    var t = this.dashEnabled();
    t && (this.attrs.dashEnabled = !1, e.setLineDash([])), e.fillStrokeShape(this), t && (this.attrs.dashEnabled = !0);
  }
  getSelfRect() {
    const e = super.getSelfRect(), t = this.pointerWidth() / 2;
    return {
      x: e.x - t,
      y: e.y - t,
      width: e.width + t * 2,
      height: e.height + t * 2
    };
  }
}
jr.prototype.className = "Arrow";
vs(jr);
F.addGetterSetter(jr, "pointerLength", 10, Ce());
F.addGetterSetter(jr, "pointerWidth", 10, Ce());
F.addGetterSetter(jr, "pointerAtBeginning", !1);
F.addGetterSetter(jr, "pointerAtEnding", !0);
var j_ = cg, V_ = tf, z_ = "Expected a function";
function H_(n, e, t) {
  var r = !0, i = !0;
  if (typeof n != "function")
    throw new TypeError(z_);
  return V_(t) && (r = "leading" in t ? !!t.leading : r, i = "trailing" in t ? !!t.trailing : i), j_(n, e, {
    leading: r,
    maxWait: e,
    trailing: i
  });
}
var G_ = H_;
const W_ = /* @__PURE__ */ Zu(G_), Zo = de.debug("MapObjectsArrows");
class U_ {
  constructor(e, t, r, i, s) {
    ne(this, "previouslyRenderedArrows", /* @__PURE__ */ new Map());
    this.konvaLayer = e, this.mapFile = t, this.mapDep = r, this.arrowPath = i, this.factories = s, Zo("draw arrows on canvas");
    const o = this.factories.chain.create();
    this.konvaLayer.layer(this.factories.patron.create(o.receiveKey("layer"))), this.mapFile.currentMap(this.factories.patron.create(o.receiveKey("map"))), this.mapDep.objects(this.factories.patron.create(o.receiveKey("objects"))), o.result(
      this.factories.patron.create(
        this.factories.guest.create(
          W_(({ layer: a, map: l, objects: c }) => {
            const u = (f, d) => {
              const p = l.types[d.type];
              this.arrowPath.breakPoints(
                {
                  shapeGeometry: {
                    width: f.width,
                    height: f.height
                  },
                  shapePosition: {
                    x: f.position[0],
                    y: f.position[1]
                  },
                  lookToGeometry: {
                    width: d.width,
                    height: d.height
                  },
                  lookToPosition: {
                    x: d.position[0],
                    y: d.position[1]
                  }
                },
                {
                  shapeGeometry: {
                    width: d.width || p.width,
                    height: d.height || p.height
                  },
                  shapePosition: {
                    x: d.position[0],
                    y: d.position[1]
                  },
                  lookToGeometry: {
                    width: f.width,
                    height: f.height
                  },
                  lookToPosition: {
                    x: f.position[0],
                    y: f.position[1]
                  }
                },
                this.factories.guest.create((h) => {
                  const m = h.join("-"), g = [f.id, d.id].join("-");
                  if (Zo("points", h), Zo(f, d), this.previouslyRenderedArrows.has(g)) {
                    const w = this.previouslyRenderedArrows.get(g);
                    w.arrow.show(), w.arrow.points(h);
                    return;
                  }
                  const v = new jr({
                    x: 0,
                    y: 0,
                    points: h,
                    pointerLength: 20,
                    pointerWidth: 10,
                    fill: "#ccc",
                    stroke: "#bbb",
                    strokeWidth: 2,
                    zIndex: 2
                  });
                  this.previouslyRenderedArrows.set(g, {
                    arrow: v,
                    arrowKey: m
                  }), a.add(v);
                })
              );
            };
            this.arrowPath.clear(), this.previouslyRenderedArrows.forEach((f) => f.arrow.hide()), c.forEach((f) => {
              f.arrows && (Zo("visible objects", c.length), f.arrows.forEach((d) => {
                const p = c.find((h) => h.id === d.id) || l.objects[d.id];
                p && u(f, p);
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
const tc = de.debug("NewArrow"), nh = {
  width: 10,
  height: 10
};
class K_ {
  constructor(e, t, r, i) {
    ne(this, "cursorGuest");
    ne(this, "arrowCache");
    this.konvaLayer = e, this.cursorPosition = t, this.arrowPath = r, this.factories = i, this.cursorGuest = this.factories.sourceEmpty.create(), this.arrowCache = this.factories.sourceEmpty.create();
  }
  /**
   * Создать новую стрелку для объекта
   */
  forObject(e) {
    tc("start watch cursor"), this.cursorGuest.value(
      this.factories.guest.create((i) => {
        Cd(i);
      })
    );
    let t = null;
    const r = this.factories.patron.create(
      this.factories.guest.create((i) => {
        tc("cursor moves"), this.konvaLayer.layer(
          this.factories.guest.create((s) => {
            tc("cursor moves in layer"), this.arrowPath.breakPoints(
              {
                shapeGeometry: {
                  width: e.width,
                  height: e.height
                },
                shapePosition: {
                  x: e.position[0],
                  y: e.position[1]
                },
                lookToGeometry: nh,
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
                shapeGeometry: nh,
                shapePosition: i
              },
              this.factories.guest.create((o) => {
                if (t) {
                  t.points(o);
                  return;
                }
                t = new jr({
                  x: 0,
                  y: 0,
                  points: o,
                  pointerLength: 20,
                  pointerWidth: 10,
                  fill: "#ccc",
                  stroke: "#bbb",
                  strokeWidth: 2,
                  zIndex: 2
                }), s.add(t), this.arrowCache.give(t);
              })
            );
          })
        ), this.arrowPath.clear();
      })
    );
    this.cursorPosition.value(r), this.cursorGuest.give(r);
  }
  /**
   * Отмена стрелки
   */
  dispose() {
    this.cursorGuest.value(
      this.factories.guest.create((e) => {
        Cd(e);
      })
    ), this.arrowCache.value(
      this.factories.guest.create((e) => {
        e.remove();
      })
    );
  }
}
const nc = de.debug("MapObjectBackground");
class Y_ {
  constructor(e, t, r, i) {
    ne(this, "mapNameCache");
    this.konvaLayer = e, this.mapFile = t, this.zIndex = r, this.factories = i, this.mapNameCache = i.cache.create(""), this.mapFile.currentMap(i.patron.create(this));
  }
  give(e) {
    return this.konvaLayer.layer(
      this.factories.patronOnce.create((t) => {
        nc("map received in background", e), this.mapNameCache.value(
          this.factories.guest.create((r) => {
            if (r === e.url)
              return;
            nc("background cache is not equals", r), this.mapNameCache.give(e.url), new Image();
            const i = document.querySelector(".grid-example");
            nc("grid example", i);
          })
        );
      })
    ), this;
  }
}
const q_ = de.debug("Breadcrumbs");
class X_ {
  constructor(e, t, r) {
    this.parentNames = e, this.mapFile = t, this.factories = r;
  }
  list(e) {
    const t = this.factories.chain.create();
    return this.parentNames.names(this.factories.guestCast.create(e, t.receiveKey("names"))), this.mapFile.mapFile(this.factories.guestCast.create(e, t.receiveKey("mapFile"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ names: r, mapFile: i }) => {
        q_("map id", r, i), e.give(
          r.map((s) => {
            var o, a;
            return {
              title: ((a = (o = i[s]) == null ? void 0 : o.settings) == null ? void 0 : a.title) || "unknown",
              name: s
            };
          })
        );
      })
    ), e;
  }
}
const rh = de.debug("CursorWithObjects");
class J_ {
  constructor(e, t, r) {
    this.objectsVisible = e, this.cursor = t, this.factories = r;
  }
  value(e) {
    const t = this.factories.chain.create();
    return this.cursor.value(this.factories.guestCast.create(e, t.receiveKey("cursor"))), this.objectsVisible.objects(
      this.factories.guestCast.create(e, t.receiveKey("objects"))
    ), t.result(
      this.factories.guestInTheMiddle.create(e, ({ cursor: r, objects: i }) => {
        const s = i.find((o) => {
          const a = o.position[0], l = o.position[0] + o.width || 100, c = o.position[1], u = o.position[1] + o.height || 100;
          return r.x >= a && r.x <= l && r.y >= c && r.y <= u;
        });
        s ? (rh("crossed with", s), e.give({
          x: s.position[0] + s.width / 2,
          y: s.position[1] + s.height / 2
        })) : (rh("cursor pos", r), e.give(r));
      })
    ), this;
  }
}
const ih = de.debug("Drawer");
class Q_ {
  constructor(e, t) {
    ne(this, "drawerNameCache");
    this.keyboard = e, this.factories = t, this.drawerNameCache = t.cache.create(""), this.keyboard.pressed(
      this.factories.patron.create(
        this.factories.guest.create((r) => {
          ih("new key in drawer", r), r === "Escape" && this.give("");
        })
      )
    );
  }
  isOpenedByName(e, t) {
    return this.drawerNameCache.value(
      this.factories.guestInTheMiddle.create(t, (r) => {
        ih("new drawer name", r), t.give(r === e);
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
class Z_ {
  value(e) {
    typeof performance > "u" && e.give(0);
    const t = 10;
    let r = performance.now(), i = 0;
    const s = () => requestAnimationFrame(() => {
      if (i += 1, i >= t) {
        const o = performance.now(), a = o - r;
        e.give(Math.round(1e3 / (a / i))), r = o, i = 0;
      }
      s();
    });
    return s(), e;
  }
}
class eS {
  constructor(e, t) {
    this.mapFile = e, this.factories = t;
  }
  menuObjects(e) {
    return this.mapFile.currentMap(
      this.factories.guestInTheMiddle.create(e, (t) => {
        const r = Object.values(t.objects).filter((i) => i.inMenu);
        e.give(r);
      })
    ), e;
  }
}
const sh = de.debug("app:MiniMap"), oh = 130;
class tS {
  constructor(e, t, r, i) {
    ne(this, "theSize");
    ne(this, "thePoints");
    ne(this, "viewportSizeCache");
    this.map = e, this.layer = t, this.stageSize = r, this.factories = i, this.theSize = i.sourceEmpty.create(), this.thePoints = i.sourceEmpty.create(), this.viewportSizeCache = i.sourceEmpty.create();
    const s = i.chain.create();
    e.objects(i.patron.create(s.receiveKey("objects"))), t.layer(i.patron.create(s.receiveKey("layer"))), r.value(i.patron.create(s.receiveKey("size"))), s.result(
      i.patron.create(
        i.guest.create(({ layer: o, size: a, objects: l }) => {
          const c = oh / a.width, u = {
            width: Math.round(o.width() * c),
            height: Math.round(o.height() * c)
          };
          this.viewportSizeCache.give(u);
          const f = {
            width: Math.round(a.width * c),
            height: Math.round(a.height * c)
          };
          this.theSize.give(f);
          const d = l.map((p) => ({
            id: p.id,
            x: Math.round(p.position[0] * c),
            y: Math.round(p.position[1] * c),
            width: Math.round(p.width * c),
            height: Math.round(p.height * c)
          }));
          sh("minimap points", d), this.thePoints.give(d);
        })
      )
    );
  }
  viewportPosition(e) {
    const t = this.factories.chain.create();
    return this.stageSize.value(this.factories.guestCast.create(e, t.receiveKey("size"))), this.layer.position(this.factories.guestCast.create(e, t.receiveKey("position"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ size: r, position: i }) => {
        const s = oh / r.width, o = {
          x: i.x * s * -1,
          y: i.y * s * -1
        };
        sh("scaled position is", o), e.give(o);
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
const ah = de.debug("Modal");
class nS {
  constructor(e, t) {
    ne(this, "modalNameCache");
    this.keyboard = e, this.factories = t, ah("modal created"), this.modalNameCache = t.cache.create(""), this.keyboard.pressed(
      this.factories.patron.create(
        this.factories.guest.create((r) => {
          ah("new key in modal", r), r === "Escape" && this.give("");
        })
      )
    );
  }
  isOpenedByName(e, t) {
    return this.modalNameCache.value(
      this.factories.guestInTheMiddle.create(t, (r) => {
        t.give(r === e);
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
class rS {
  constructor(e) {
    ne(this, "messageCache");
    ne(this, "notificationLifetimeDelay", 3500);
    ne(this, "lastTimerHead", null);
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
const Ms = de.debug("ObjectGeometryFix");
class iS {
  constructor(e, t, r, i) {
    ne(this, "innerReceive");
    this.mapFile = t, this.map = r, this.factories = i, e.objects(i.patron.create(this)), this.innerReceive = ys((s) => {
      this.mapFile.currentMap(
        this.factories.guest.create((o) => {
          Ms("objects to fix", s);
          const a = document.querySelectorAll(".objects-container .rendered-object"), l = o.objects;
          let c = !1;
          a.forEach((u) => {
            const f = u.getAttribute("data-object-id");
            if (Ms("i see id", f), !f)
              return;
            const d = l[f];
            if (d && (Ms("dom object geometry", u.clientWidth, u.clientHeight), Ms("saved object geometry", d.width, d.height), (d.width !== u.clientWidth || d.height !== u.clientHeight) && (c = !0, Ms("update object geometry"), d.width = u.clientWidth, d.height = u.clientHeight), !d.width || !d.height)) {
              const p = o.types[d.type];
              d.width = p.width, d.height = p.height;
            }
          }), c && this.map.give({
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
class ul extends j {
  _sceneFunc(e) {
    var t = this.cornerRadius(), r = this.width(), i = this.height();
    e.beginPath(), t ? N.drawRoundedRectPath(e, r, i, t) : e.rect(0, 0, r, i), e.closePath(), e.fillStrokeShape(this);
  }
}
ul.prototype.className = "Rect";
vs(ul);
F.addGetterSetter(ul, "cornerRadius", 0, l_(4));
const As = de.debug("MapObjectsRectsPatron");
class sS {
  constructor(e, t, r, i, s, o, a, l, c) {
    ne(this, "previouslyRenderedRects", /* @__PURE__ */ new Map());
    this.konvaLayer = e, this.mapFile = t, this.mapObject = r, this.mapObjectCurrent = s, this.mapObjectForRendering = o, this.objectPosition = a, this.settings = l, this.factories = c, i.objects(this);
  }
  give(e) {
    return this.konvaLayer.layer(
      this.factories.patronOnce.create(
        this.factories.guest.create((t) => {
          const r = this.factories.chain.create();
          this.mapFile.currentMap(r.receiveKey("map")), this.settings.value(r.receiveKey("settings")), r.result(
            this.factories.guest.create((i) => {
              const { map: s, settings: o } = i;
              As("rerender object rects"), this.previouslyRenderedRects.forEach((a) => {
                a.hide();
              }), e.forEach((a) => {
                const l = s.types[a.type], c = +a.width || +l.width || 100, u = +a.height || +l.height || 100;
                if (this.previouslyRenderedRects.has(a)) {
                  const d = this.previouslyRenderedRects.get(a);
                  d.width(c), d.height(u), d.x(+a.position[0]), d.y(+a.position[1]), d.show();
                  return;
                }
                As("rect object", a, l);
                const f = new ul({
                  x: +a.position[0],
                  y: +a.position[1],
                  width: c,
                  height: u,
                  name: a.id,
                  draggable: !o.readonly,
                  objectId: a.id,
                  zIndex: 3
                });
                this.previouslyRenderedRects.set(a, f), t.add(f), f.on("mouseenter", () => {
                  t.getStage().container().style.cursor = "pointer";
                }), f.on("mouseleave", () => {
                  t.getStage().container().style.cursor = "default";
                }), f.on("dragend", () => {
                  As("drag ended"), this.objectPosition.position(
                    a,
                    {
                      x: f.x(),
                      y: f.y()
                    },
                    this.factories.guest.create((d) => {
                      this.mapObject.give({
                        ...a,
                        position: [d.x, d.y]
                      });
                    })
                  );
                }), f.on("dragmove", () => {
                  As("dragmove works", f.x(), f.y()), t.getStage().container().style.cursor = "move", this.objectPosition.position(
                    a,
                    {
                      x: f.x(),
                      y: f.y()
                    },
                    this.factories.guest.create((d) => {
                      this.mapObjectForRendering.give({
                        ...a,
                        position: [d.x, d.y]
                      });
                    })
                  );
                }), f.on("click", () => {
                  As("object clicked with id", a.id), this.mapObjectCurrent.give(a.id);
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
class oS {
  constructor(e, t, r, i) {
    this.canvas = t, this.konvaLayer = r, this.factories = i, e.currentMap(this);
  }
  give() {
    const e = new ResizeObserver((r) => {
      requestAnimationFrame(() => {
        const [i] = r;
        this.canvas.canvas(
          this.factories.guest.create((s) => {
            const o = s.getBoundingClientRect();
            this.konvaLayer.layer(
              this.factories.guest.create((a) => {
                a.getStage().width(i.contentRect.width - o.left), a.getStage().height(i.contentRect.height - o.top), this.canvas.give(s), this.konvaLayer.give(a);
              })
            );
          })
        );
      });
    }), t = document.querySelector("body");
    return t && e.observe(t), this;
  }
}
const aS = de.debug("StagePosition");
class lS {
  constructor(e) {
    this.stageMove = e;
  }
  give(e) {
    return aS("received position", e), this.stageMove.move(e), this;
  }
}
class cS {
  constructor(e, t) {
    this.stageMove = e, this.factories = t;
  }
  move(e, t) {
    return e.value(
      this.factories.guest.create((r) => {
        this.stageMove.move(r.objects[t]);
      })
    ), this;
  }
}
const lh = de.debug("Zindex");
class uS {
  constructor(e) {
    ne(this, "fnsCache");
    this.factories = e, this.fnsCache = e.cache.create([]), this.fnsCache.value(
      e.patron.create(
        e.guest.create(
          ys((t) => {
            lh("zindex fns run"), t.forEach((r) => r());
          }, 50)
        )
      )
    );
  }
  give(e) {
    return lh("zindex received value"), this.fnsCache.value(
      this.factories.guest.create((t) => {
        this.fnsCache.give(t.concat(e));
      })
    ), this;
  }
}
const ch = de.debug("app:BrowserCanvas");
class fS {
  constructor(e) {
    ne(this, "canvasCache");
    this.factories = e, this.canvasCache = e.sourceEmpty.create();
  }
  canvas(e) {
    return this.canvasCache.value(e), this;
  }
  size(e) {
    return this.canvasCache.value(
      this.factories.guestInTheMiddle.create(e, (t) => {
        const r = t.width || t.clientWidth, i = t.height || t.clientHeight;
        ch("canvas size", r, i), e.give({
          height: i,
          width: r
        });
      })
    ), this;
  }
  give(e) {
    return ch("receive new canvas", e), this.canvasCache.give(e), this;
  }
}
const dS = de.debug("Cursor");
class hS {
  constructor(e, t) {
    ne(this, "cursorPool");
    this.cursorPool = t.pool.create(this);
    const r = {
      x: 0,
      y: 0
    };
    window == null || window.addEventListener("mousemove", (i) => {
      const s = {
        x: i.offsetX + -r.x,
        y: i.offsetY + -r.y
      };
      dS("move cursor fired", s), this.cursorPool.give(s);
    }), e.position(
      t.patron.create(
        t.guest.create((i) => {
          r.x = i.x, r.y = i.y;
        })
      )
    );
  }
  value(e) {
    return this.cursorPool.add(e), this;
  }
}
class pS {
  constructor(e) {
    this.el = e, e.value(this);
  }
  give(e) {
    return e.addEventListener("dragstart", (t) => {
      const r = t.target;
      if (!r)
        return;
      const i = r.cloneNode(!0);
      i.style.transform = "translate(0,0)", i.style.position = "absolute", i.style.top = "0", i.style.left = "0", i.style.zIndex = "999", t.dataTransfer && t.dataTransfer.setDragImage(i, 0, 0), document.body.append(i);
      const s = (o) => {
        i.style.transform = `translate(${o.clientX}px, ${o.clientY}px)`;
      };
      r.addEventListener("drag", s, { passive: !0 }), r.addEventListener("dragend", () => {
        i.removeEventListener("drag", s), i.remove();
      });
    }), this;
  }
  introduction() {
    return "patron";
  }
}
const ea = de.debug("ControlCombo");
class mS {
  constructor(e, t) {
    this.keyboard = e, this.factories = t;
  }
  /**
   * Случилась комбинация ctrl + keyCode
   */
  happened(e, t) {
    this.keyboard.event(
      this.factories.guestInTheMiddle.create(t, (r) => {
        ea("combo happened look for key", e, "received", r.code), r.ctrlKey && r.code === e && r.type === "keydown" && (r.preventDefault(), t.give(r));
      })
    );
  }
  /**
   * Случилась комбинация ctrl + keyCode с условием comboCondition
   */
  happenedConditional(e, t, r) {
    ea("combo control happened registration"), this.keyboard.event(
      this.factories.guestInTheMiddle.create(r, (i) => {
        ea("keyboard event come"), t.value(
          this.factories.guest.create((s) => {
            ea("combo happened look for key", e, "received", i.code), s && i.ctrlKey && i.code === e && i.type === "keydown" && (i.preventDefault(), r.give(i));
          })
        );
      })
    );
  }
}
const Ns = de.debug("Keyboard");
class gS {
  constructor(e) {
    ne(this, "pressedPool");
    ne(this, "combinationsPool");
    Ns("keyboard created"), this.pressedPool = e.pool.create(this), this.combinationsPool = e.pool.create(this), window == null || window.addEventListener("keyup", (t) => {
      Ns("keyboard pressed", t.key), this.pressedPool.give(t.key);
    }), v1({
      passive: !1,
      onEventFired: (t) => {
        Ns("magic combination happens 11", t.ctrlKey, t.key), this.combinationsPool.give(t);
      }
    });
  }
  pressed(e) {
    return Ns("keyboard receive pressed subscriber"), this.pressedPool.add(e), this;
  }
  event(e) {
    return Ns("keyboard receive combination subscriber"), this.combinationsPool.add(e), this;
  }
}
class Ar extends oe {
  constructor() {
    super(...arguments), this.children = [];
  }
  getChildren(e) {
    if (!e)
      return this.children || [];
    const t = this.children || [];
    var r = [];
    return t.forEach(function(i) {
      e(i) && r.push(i);
    }), r;
  }
  hasChildren() {
    return this.getChildren().length > 0;
  }
  removeChildren() {
    return this.getChildren().forEach((e) => {
      e.parent = null, e.index = 0, e.remove();
    }), this.children = [], this._requestDraw(), this;
  }
  destroyChildren() {
    return this.getChildren().forEach((e) => {
      e.parent = null, e.index = 0, e.destroy();
    }), this.children = [], this._requestDraw(), this;
  }
  add(...e) {
    if (e.length === 0)
      return this;
    if (e.length > 1) {
      for (var t = 0; t < e.length; t++)
        this.add(e[t]);
      return this;
    }
    const r = e[0];
    return r.getParent() ? (r.moveTo(this), this) : (this._validateAdd(r), r.index = this.getChildren().length, r.parent = this, r._clearCaches(), this.getChildren().push(r), this._fire("add", {
      child: r
    }), this._requestDraw(), this);
  }
  destroy() {
    return this.hasChildren() && this.destroyChildren(), super.destroy(), this;
  }
  find(e) {
    return this._generalFind(e, !1);
  }
  findOne(e) {
    var t = this._generalFind(e, !0);
    return t.length > 0 ? t[0] : void 0;
  }
  _generalFind(e, t) {
    var r = [];
    return this._descendants((i) => {
      const s = i._isMatch(e);
      return s && r.push(i), !!(s && t);
    }), r;
  }
  _descendants(e) {
    let t = !1;
    const r = this.getChildren();
    for (const i of r) {
      if (t = e(i), t)
        return !0;
      if (i.hasChildren() && (t = i._descendants(e), t))
        return !0;
    }
    return !1;
  }
  toObject() {
    var e = oe.prototype.toObject.call(this);
    return e.children = [], this.getChildren().forEach((t) => {
      e.children.push(t.toObject());
    }), e;
  }
  isAncestorOf(e) {
    for (var t = e.getParent(); t; ) {
      if (t._id === this._id)
        return !0;
      t = t.getParent();
    }
    return !1;
  }
  clone(e) {
    var t = oe.prototype.clone.call(this, e);
    return this.getChildren().forEach(function(r) {
      t.add(r.clone());
    }), t;
  }
  getAllIntersections(e) {
    var t = [];
    return this.find("Shape").forEach(function(r) {
      r.isVisible() && r.intersects(e) && t.push(r);
    }), t;
  }
  _clearSelfAndDescendantCache(e) {
    var t;
    super._clearSelfAndDescendantCache(e), !this.isCached() && ((t = this.children) === null || t === void 0 || t.forEach(function(r) {
      r._clearSelfAndDescendantCache(e);
    }));
  }
  _setChildrenIndices() {
    var e;
    (e = this.children) === null || e === void 0 || e.forEach(function(t, r) {
      t.index = r;
    }), this._requestDraw();
  }
  drawScene(e, t) {
    var r = this.getLayer(), i = e || r && r.getCanvas(), s = i && i.getContext(), o = this._getCanvasCache(), a = o && o.scene, l = i && i.isCache;
    if (!this.isVisible() && !l)
      return this;
    if (a) {
      s.save();
      var c = this.getAbsoluteTransform(t).getMatrix();
      s.transform(c[0], c[1], c[2], c[3], c[4], c[5]), this._drawCachedSceneCanvas(s), s.restore();
    } else
      this._drawChildren("drawScene", i, t);
    return this;
  }
  drawHit(e, t) {
    if (!this.shouldDrawHit(t))
      return this;
    var r = this.getLayer(), i = e || r && r.hitCanvas, s = i && i.getContext(), o = this._getCanvasCache(), a = o && o.hit;
    if (a) {
      s.save();
      var l = this.getAbsoluteTransform(t).getMatrix();
      s.transform(l[0], l[1], l[2], l[3], l[4], l[5]), this._drawCachedHitCanvas(s), s.restore();
    } else
      this._drawChildren("drawHit", i, t);
    return this;
  }
  _drawChildren(e, t, r) {
    var i, s = t && t.getContext(), o = this.clipWidth(), a = this.clipHeight(), l = this.clipFunc(), c = o && a || l;
    const u = r === this;
    if (c) {
      s.save();
      var f = this.getAbsoluteTransform(r), d = f.getMatrix();
      if (s.transform(d[0], d[1], d[2], d[3], d[4], d[5]), s.beginPath(), l)
        l.call(this, s, this);
      else {
        var p = this.clipX(), h = this.clipY();
        s.rect(p, h, o, a);
      }
      s.clip(), d = f.copy().invert().getMatrix(), s.transform(d[0], d[1], d[2], d[3], d[4], d[5]);
    }
    var m = !u && this.globalCompositeOperation() !== "source-over" && e === "drawScene";
    m && (s.save(), s._applyGlobalCompositeOperation(this)), (i = this.children) === null || i === void 0 || i.forEach(function(g) {
      g[e](t, r);
    }), m && s.restore(), c && s.restore();
  }
  getClientRect(e) {
    var t;
    e = e || {};
    var r = e.skipTransform, i = e.relativeTo, s, o, a, l, c = {
      x: 1 / 0,
      y: 1 / 0,
      width: 0,
      height: 0
    }, u = this;
    (t = this.children) === null || t === void 0 || t.forEach(function(m) {
      if (m.visible()) {
        var g = m.getClientRect({
          relativeTo: u,
          skipShadow: e.skipShadow,
          skipStroke: e.skipStroke
        });
        g.width === 0 && g.height === 0 || (s === void 0 ? (s = g.x, o = g.y, a = g.x + g.width, l = g.y + g.height) : (s = Math.min(s, g.x), o = Math.min(o, g.y), a = Math.max(a, g.x + g.width), l = Math.max(l, g.y + g.height)));
      }
    });
    for (var f = this.find("Shape"), d = !1, p = 0; p < f.length; p++) {
      var h = f[p];
      if (h._isVisible(this)) {
        d = !0;
        break;
      }
    }
    return d && s !== void 0 ? c = {
      x: s,
      y: o,
      width: a - s,
      height: l - o
    } : c = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    }, r ? c : this._transformedRect(c, i);
  }
}
F.addComponentsGetterSetter(Ar, "clip", [
  "x",
  "y",
  "width",
  "height"
]);
F.addGetterSetter(Ar, "clipX", void 0, Ce());
F.addGetterSetter(Ar, "clipY", void 0, Ce());
F.addGetterSetter(Ar, "clipWidth", void 0, Ce());
F.addGetterSetter(Ar, "clipHeight", void 0, Ce());
F.addGetterSetter(Ar, "clipFunc");
var yS = "Stage", vS = "string", uh = "px", bS = "mouseout", Cg = "mouseleave", _g = "mouseover", Sg = "mouseenter", xg = "mousemove", kg = "mousedown", Tg = "mouseup", Fs = "pointermove", $s = "pointerdown", Vi = "pointerup", Bs = "pointercancel", wS = "lostpointercapture", ta = "pointerout", na = "pointerleave", ra = "pointerover", ia = "pointerenter", Uc = "contextmenu", Og = "touchstart", Eg = "touchend", Mg = "touchmove", Ag = "touchcancel", Kc = "wheel", CS = 5, _S = [
  [Sg, "_pointerenter"],
  [kg, "_pointerdown"],
  [xg, "_pointermove"],
  [Tg, "_pointerup"],
  [Cg, "_pointerleave"],
  [Og, "_pointerdown"],
  [Mg, "_pointermove"],
  [Eg, "_pointerup"],
  [Ag, "_pointercancel"],
  [_g, "_pointerover"],
  [Kc, "_wheel"],
  [Uc, "_contextmenu"],
  [$s, "_pointerdown"],
  [Fs, "_pointermove"],
  [Vi, "_pointerup"],
  [Bs, "_pointercancel"],
  [wS, "_lostpointercapture"]
];
const rc = {
  mouse: {
    [ta]: bS,
    [na]: Cg,
    [ra]: _g,
    [ia]: Sg,
    [Fs]: xg,
    [$s]: kg,
    [Vi]: Tg,
    [Bs]: "mousecancel",
    pointerclick: "click",
    pointerdblclick: "dblclick"
  },
  touch: {
    [ta]: "touchout",
    [na]: "touchleave",
    [ra]: "touchover",
    [ia]: "touchenter",
    [Fs]: Mg,
    [$s]: Og,
    [Vi]: Eg,
    [Bs]: Ag,
    pointerclick: "tap",
    pointerdblclick: "dbltap"
  },
  pointer: {
    [ta]: ta,
    [na]: na,
    [ra]: ra,
    [ia]: ia,
    [Fs]: Fs,
    [$s]: $s,
    [Vi]: Vi,
    [Bs]: Bs,
    pointerclick: "pointerclick",
    pointerdblclick: "pointerdblclick"
  }
}, js = (n) => n.indexOf("pointer") >= 0 ? "pointer" : n.indexOf("touch") >= 0 ? "touch" : "mouse", Pi = (n) => {
  const e = js(n);
  if (e === "pointer")
    return se.pointerEventsEnabled && rc.pointer;
  if (e === "touch")
    return rc.touch;
  if (e === "mouse")
    return rc.mouse;
};
function fh(n = {}) {
  return (n.clipFunc || n.clipWidth || n.clipHeight) && N.warn("Stage does not support clipping. Please use clip for Layers or Groups."), n;
}
const SS = "Pointer position is missing and not registered by the stage. Looks like it is outside of the stage container. You can set it manually from event: stage.setPointersPositions(event);";
class co extends Ar {
  constructor(e) {
    super(fh(e)), this._pointerPositions = [], this._changedPointerPositions = [], this._buildDOM(), this._bindContentEvents(), this.on("widthChange.konva heightChange.konva", this._resizeDOM), this.on("visibleChange.konva", this._checkVisibility), this.on("clipWidthChange.konva clipHeightChange.konva clipFuncChange.konva", () => {
      fh(this.attrs);
    }), this._checkVisibility();
  }
  _validateAdd(e) {
    const t = e.getType() === "Layer", r = e.getType() === "FastLayer";
    t || r || N.throw("You may only add layers to the stage.");
  }
  _checkVisibility() {
    if (!this.content)
      return;
    const e = this.visible() ? "" : "none";
    this.content.style.display = e;
  }
  setContainer(e) {
    if (typeof e === vS) {
      if (e.charAt(0) === ".") {
        var t = e.slice(1);
        e = document.getElementsByClassName(t)[0];
      } else {
        var r;
        e.charAt(0) !== "#" ? r = e : r = e.slice(1), e = document.getElementById(r);
      }
      if (!e)
        throw "Can not find container in document with id " + r;
    }
    return this._setAttr("container", e), this.content && (this.content.parentElement && this.content.parentElement.removeChild(this.content), e.appendChild(this.content)), this;
  }
  shouldDrawHit() {
    return !0;
  }
  clear() {
    var e = this.children, t = e.length, r;
    for (r = 0; r < t; r++)
      e[r].clear();
    return this;
  }
  clone(e) {
    return e || (e = {}), e.container = typeof document < "u" && document.createElement("div"), Ar.prototype.clone.call(this, e);
  }
  destroy() {
    super.destroy();
    var e = this.content;
    return e && N._isInDocument(e) && this.container().removeChild(e), N.releaseCanvas(this.bufferCanvas._canvas, this.bufferHitCanvas._canvas), this;
  }
  getPointerPosition() {
    const e = this._pointerPositions[0] || this._changedPointerPositions[0];
    return e ? {
      x: e.x,
      y: e.y
    } : (N.warn(SS), null);
  }
  _getPointerById(e) {
    return this._pointerPositions.find((t) => t.id === e);
  }
  getPointersPositions() {
    return this._pointerPositions;
  }
  getStage() {
    return this;
  }
  getContent() {
    return this.content;
  }
  _toKonvaCanvas(e) {
    e = e || {}, e.x = e.x || 0, e.y = e.y || 0, e.width = e.width || this.width(), e.height = e.height || this.height();
    var t = new Us({
      width: e.width,
      height: e.height,
      pixelRatio: e.pixelRatio || 1
    }), r = t.getContext()._context, i = this.children;
    return (e.x || e.y) && r.translate(-1 * e.x, -1 * e.y), i.forEach(function(s) {
      if (s.isVisible()) {
        var o = s._toKonvaCanvas(e);
        r.drawImage(o._canvas, e.x, e.y, o.getWidth() / o.getPixelRatio(), o.getHeight() / o.getPixelRatio());
      }
    }), t;
  }
  getIntersection(e) {
    if (!e)
      return null;
    var t = this.children, r = t.length, i = r - 1, s;
    for (s = i; s >= 0; s--) {
      const o = t[s].getIntersection(e);
      if (o)
        return o;
    }
    return null;
  }
  _resizeDOM() {
    var e = this.width(), t = this.height();
    this.content && (this.content.style.width = e + uh, this.content.style.height = t + uh), this.bufferCanvas.setSize(e, t), this.bufferHitCanvas.setSize(e, t), this.children.forEach((r) => {
      r.setSize({ width: e, height: t }), r.draw();
    });
  }
  add(e, ...t) {
    if (arguments.length > 1) {
      for (var r = 0; r < arguments.length; r++)
        this.add(arguments[r]);
      return this;
    }
    super.add(e);
    var i = this.children.length;
    return i > CS && N.warn("The stage has " + i + " layers. Recommended maximum number of layers is 3-5. Adding more layers into the stage may drop the performance. Rethink your tree structure, you can use Konva.Group."), e.setSize({ width: this.width(), height: this.height() }), e.draw(), se.isBrowser && this.content.appendChild(e.canvas._canvas), this;
  }
  getParent() {
    return null;
  }
  getLayer() {
    return null;
  }
  hasPointerCapture(e) {
    return pg(e, this);
  }
  setPointerCapture(e) {
    mg(e, this);
  }
  releaseCapture(e) {
    Ks(e);
  }
  getLayers() {
    return this.children;
  }
  _bindContentEvents() {
    se.isBrowser && _S.forEach(([e, t]) => {
      this.content.addEventListener(e, (r) => {
        this[t](r);
      }, { passive: !1 });
    });
  }
  _pointerenter(e) {
    this.setPointersPositions(e);
    const t = Pi(e.type);
    this._fire(t.pointerenter, {
      evt: e,
      target: this,
      currentTarget: this
    });
  }
  _pointerover(e) {
    this.setPointersPositions(e);
    const t = Pi(e.type);
    this._fire(t.pointerover, {
      evt: e,
      target: this,
      currentTarget: this
    });
  }
  _getTargetShape(e) {
    let t = this[e + "targetShape"];
    return t && !t.getStage() && (t = null), t;
  }
  _pointerleave(e) {
    const t = Pi(e.type), r = js(e.type);
    if (t) {
      this.setPointersPositions(e);
      var i = this._getTargetShape(r), s = !xe.isDragging || se.hitOnDragEnabled;
      i && s ? (i._fireAndBubble(t.pointerout, { evt: e }), i._fireAndBubble(t.pointerleave, { evt: e }), this._fire(t.pointerleave, {
        evt: e,
        target: this,
        currentTarget: this
      }), this[r + "targetShape"] = null) : s && (this._fire(t.pointerleave, {
        evt: e,
        target: this,
        currentTarget: this
      }), this._fire(t.pointerout, {
        evt: e,
        target: this,
        currentTarget: this
      })), this.pointerPos = void 0, this._pointerPositions = [];
    }
  }
  _pointerdown(e) {
    const t = Pi(e.type), r = js(e.type);
    if (t) {
      this.setPointersPositions(e);
      var i = !1;
      this._changedPointerPositions.forEach((s) => {
        var o = this.getIntersection(s);
        if (xe.justDragged = !1, se["_" + r + "ListenClick"] = !0, !(o && o.isListening()))
          return;
        se.capturePointerEventsEnabled && o.setPointerCapture(s.id), this[r + "ClickStartShape"] = o, o._fireAndBubble(t.pointerdown, {
          evt: e,
          pointerId: s.id
        }), i = !0;
        const l = e.type.indexOf("touch") >= 0;
        o.preventDefault() && e.cancelable && l && e.preventDefault();
      }), i || this._fire(t.pointerdown, {
        evt: e,
        target: this,
        currentTarget: this,
        pointerId: this._pointerPositions[0].id
      });
    }
  }
  _pointermove(e) {
    const t = Pi(e.type), r = js(e.type);
    if (!t)
      return;
    xe.isDragging && xe.node.preventDefault() && e.cancelable && e.preventDefault(), this.setPointersPositions(e);
    var i = !xe.isDragging || se.hitOnDragEnabled;
    if (!i)
      return;
    var s = {};
    let o = !1;
    var a = this._getTargetShape(r);
    this._changedPointerPositions.forEach((l) => {
      const c = Ql(l.id) || this.getIntersection(l), u = l.id, f = { evt: e, pointerId: u };
      var d = a !== c;
      if (d && a && (a._fireAndBubble(t.pointerout, Object.assign({}, f), c), a._fireAndBubble(t.pointerleave, Object.assign({}, f), c)), c) {
        if (s[c._id])
          return;
        s[c._id] = !0;
      }
      c && c.isListening() ? (o = !0, d && (c._fireAndBubble(t.pointerover, Object.assign({}, f), a), c._fireAndBubble(t.pointerenter, Object.assign({}, f), a), this[r + "targetShape"] = c), c._fireAndBubble(t.pointermove, Object.assign({}, f))) : a && (this._fire(t.pointerover, {
        evt: e,
        target: this,
        currentTarget: this,
        pointerId: u
      }), this[r + "targetShape"] = null);
    }), o || this._fire(t.pointermove, {
      evt: e,
      target: this,
      currentTarget: this,
      pointerId: this._changedPointerPositions[0].id
    });
  }
  _pointerup(e) {
    const t = Pi(e.type), r = js(e.type);
    if (!t)
      return;
    this.setPointersPositions(e);
    const i = this[r + "ClickStartShape"], s = this[r + "ClickEndShape"];
    var o = {};
    let a = !1;
    this._changedPointerPositions.forEach((l) => {
      const c = Ql(l.id) || this.getIntersection(l);
      if (c) {
        if (c.releaseCapture(l.id), o[c._id])
          return;
        o[c._id] = !0;
      }
      const u = l.id, f = { evt: e, pointerId: u };
      let d = !1;
      se["_" + r + "InDblClickWindow"] ? (d = !0, clearTimeout(this[r + "DblTimeout"])) : xe.justDragged || (se["_" + r + "InDblClickWindow"] = !0, clearTimeout(this[r + "DblTimeout"])), this[r + "DblTimeout"] = setTimeout(function() {
        se["_" + r + "InDblClickWindow"] = !1;
      }, se.dblClickWindow), c && c.isListening() ? (a = !0, this[r + "ClickEndShape"] = c, c._fireAndBubble(t.pointerup, Object.assign({}, f)), se["_" + r + "ListenClick"] && i && i === c && (c._fireAndBubble(t.pointerclick, Object.assign({}, f)), d && s && s === c && c._fireAndBubble(t.pointerdblclick, Object.assign({}, f)))) : (this[r + "ClickEndShape"] = null, se["_" + r + "ListenClick"] && this._fire(t.pointerclick, {
        evt: e,
        target: this,
        currentTarget: this,
        pointerId: u
      }), d && this._fire(t.pointerdblclick, {
        evt: e,
        target: this,
        currentTarget: this,
        pointerId: u
      }));
    }), a || this._fire(t.pointerup, {
      evt: e,
      target: this,
      currentTarget: this,
      pointerId: this._changedPointerPositions[0].id
    }), se["_" + r + "ListenClick"] = !1, e.cancelable && r !== "touch" && e.preventDefault();
  }
  _contextmenu(e) {
    this.setPointersPositions(e);
    var t = this.getIntersection(this.getPointerPosition());
    t && t.isListening() ? t._fireAndBubble(Uc, { evt: e }) : this._fire(Uc, {
      evt: e,
      target: this,
      currentTarget: this
    });
  }
  _wheel(e) {
    this.setPointersPositions(e);
    var t = this.getIntersection(this.getPointerPosition());
    t && t.isListening() ? t._fireAndBubble(Kc, { evt: e }) : this._fire(Kc, {
      evt: e,
      target: this,
      currentTarget: this
    });
  }
  _pointercancel(e) {
    this.setPointersPositions(e);
    const t = Ql(e.pointerId) || this.getIntersection(this.getPointerPosition());
    t && t._fireAndBubble(Vi, sf(e)), Ks(e.pointerId);
  }
  _lostpointercapture(e) {
    Ks(e.pointerId);
  }
  setPointersPositions(e) {
    var t = this._getContentPosition(), r = null, i = null;
    e = e || window.event, e.touches !== void 0 ? (this._pointerPositions = [], this._changedPointerPositions = [], Array.prototype.forEach.call(e.touches, (s) => {
      this._pointerPositions.push({
        id: s.identifier,
        x: (s.clientX - t.left) / t.scaleX,
        y: (s.clientY - t.top) / t.scaleY
      });
    }), Array.prototype.forEach.call(e.changedTouches || e.touches, (s) => {
      this._changedPointerPositions.push({
        id: s.identifier,
        x: (s.clientX - t.left) / t.scaleX,
        y: (s.clientY - t.top) / t.scaleY
      });
    })) : (r = (e.clientX - t.left) / t.scaleX, i = (e.clientY - t.top) / t.scaleY, this.pointerPos = {
      x: r,
      y: i
    }, this._pointerPositions = [{ x: r, y: i, id: N._getFirstPointerId(e) }], this._changedPointerPositions = [
      { x: r, y: i, id: N._getFirstPointerId(e) }
    ]);
  }
  _setPointerPosition(e) {
    N.warn('Method _setPointerPosition is deprecated. Use "stage.setPointersPositions(event)" instead.'), this.setPointersPositions(e);
  }
  _getContentPosition() {
    if (!this.content || !this.content.getBoundingClientRect)
      return {
        top: 0,
        left: 0,
        scaleX: 1,
        scaleY: 1
      };
    var e = this.content.getBoundingClientRect();
    return {
      top: e.top,
      left: e.left,
      scaleX: e.width / this.content.clientWidth || 1,
      scaleY: e.height / this.content.clientHeight || 1
    };
  }
  _buildDOM() {
    if (this.bufferCanvas = new Us({
      width: this.width(),
      height: this.height()
    }), this.bufferHitCanvas = new dg({
      pixelRatio: 1,
      width: this.width(),
      height: this.height()
    }), !!se.isBrowser) {
      var e = this.container();
      if (!e)
        throw "Stage has no container. A container is required.";
      e.innerHTML = "", this.content = document.createElement("div"), this.content.style.position = "relative", this.content.style.userSelect = "none", this.content.className = "konvajs-content", this.content.setAttribute("role", "presentation"), e.appendChild(this.content), this._resizeDOM();
    }
  }
  cache() {
    return N.warn("Cache function is not allowed for stage. You may use cache only for layers, groups and shapes."), this;
  }
  clearCache() {
    return this;
  }
  batchDraw() {
    return this.getChildren().forEach(function(e) {
      e.batchDraw();
    }), this;
  }
}
co.prototype.nodeType = yS;
vs(co);
F.addGetterSetter(co, "container");
const dh = de.debug("app:konva:KonvaLayer");
class xS {
  constructor(e, t, r, i) {
    ne(this, "guestChain");
    ne(this, "positionCache");
    ne(this, "layerCache");
    this.canvasDep = e, this.stageMoveRestriction = r, this.factories = i, this.positionCache = i.cache.create({
      x: 0,
      y: 0
    }), this.guestChain = i.chain.create(), this.layerCache = i.sourceEmpty.create(), this.canvasDep.canvas(i.patron.create(this.guestChain.receiveKey("canvas"))), t.value(this.guestChain.receiveKey("stageSize")), this.guestChain.result(
      i.guest.create(
        ({ canvas: s }) => {
          dh("create new konva stage");
          const o = new bd.Stage({
            width: s.clientWidth,
            height: s.clientHeight,
            container: s,
            fill: "#ffeeee",
            draggable: !0
          }), a = new bd.Layer();
          o.add(a), a.draw(), this.layerCache.give(a), o.on("dragend", (c) => {
            if (!(c.target instanceof co))
              return;
            const u = {
              x: o.x(),
              y: o.y()
            };
            dh("new position", u), this.positionCache.give(u);
          }), o.on("dragmove", (c) => {
            if (!(c.target instanceof co))
              return;
            const u = {
              x: o.x(),
              y: o.y()
            };
            this.positionCache.give(u);
          });
          const l = this.factories.guestSync.create({
            x: 0,
            y: 0
          });
          o.dragBoundFunc((c) => (r.position(c, l), l.value()));
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
class kS {
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
const TS = de.debug("position");
class OS {
  constructor(e, t, r, i, s) {
    this.layer = e, this.canvas = t, this.stageSize = r, this.stageMoveRestriction = i, this.factories = s;
  }
  move(e) {
    TS("move stage to new point", e.position), this.stageSize.value(
      this.factories.guest.create(() => {
        this.canvas.size(
          this.factories.guest.create((t) => {
            this.layer.layer(
              this.factories.guest.create((r) => {
                const [i, s] = e.position, o = {
                  x: -i - Math.round(e.width / 2) + Math.round(t.width / 2),
                  y: -s - Math.round(e.height / 2) + Math.round(t.height / 2)
                };
                this.stageMoveRestriction.position(
                  o,
                  this.factories.guest.create((a) => {
                    r.getStage().position(a), setTimeout(() => {
                      this.layer.give(r);
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
const ee = zt(), fl = new gS(ee), Ng = new No({
  readonly: !1,
  presets: {}
}), ES = new nS(fl, ee), Pg = new Q_(fl, ee), dl = new rS(ee), ir = new lw(ee), Ig = ee.sourceEmpty.create(), He = new dw(Ig, ir, ee), MS = new cw(He), AS = new Ab(MS), of = new pw(He, ir, ee), af = new ig(of, ir, ee), NS = new sg(af, of, ee), ln = new ig(He, ir, ee), PS = new Ju((n) => {
  He.currentMap(new Da(n));
}), hl = new mw(Pg, ee), IS = new NC(ee), DS = new AC(He, ln, ee), xi = new fS(ee), ki = new VC(), Dg = new zC(xi, ki, ee), cn = new xS(xi, ki, Dg, ee), LS = new uS(ee), RS = new Y_(cn, He, LS, ee), bs = new sg(ln, He, ee), FS = new ww(
  ln,
  He,
  [new ef(dl, new gw(He, ee), ee)],
  ee
), $S = new kS(cn, ee), BS = new yw(ln, bs, xi, $S, ee), Lg = new RC(He, ee), Rg = new DC(
  ln,
  He,
  [
    new ef(
      dl,
      new FC(Lg, ee),
      ee
    )
  ],
  ee
), jS = new IC(
  ln,
  He,
  [new ef(dl, Lg, ee)],
  ee
), VS = new PC(Rg), pl = new HC(cn, xi, of, ee), zS = new iS(
  pl,
  He,
  ln,
  ee
), HS = new sS(
  cn,
  He,
  bs,
  pl,
  hl,
  NS,
  new OC(new TC(ki, ee), ee),
  Ng,
  ee
), GS = new hS(cn, ee), WS = new J_(pl, GS, ee), Fg = new KC(), $g = new K_(cn, WS, Fg, ee), US = new U_(cn, He, af, Fg, ee), KS = new tS(af, cn, ki, ee), YS = new _w(
  hl,
  ln,
  bs,
  $g,
  ee
), qS = new oS(He, xi, cn, ee), XS = new UC(
  hl,
  He,
  bs,
  ee
), JS = new fw(He, ir, ee), QS = new bw(bs), ZS = new Z_(), lf = new vw(ir, ee), ex = new X_(lf, He, ee), tx = new SC(ir, ee), nx = new $C(lf, He, ee), rx = new mS(fl, ee), ix = new eS(He, ee), Bg = new OS(cn, xi, ki, Dg, ee), sx = new lS(Bg), ox = new cS(Bg, ee), ax = new BC(ln, ee), lx = new uw(He, ln, ir, ee), cx = new MC(ln, ki, cn, ee), jg = new Qi();
new pS(jg);
const ux = {
  mapCurrentID: ir,
  mapFile: He,
  mapCurrent: ln,
  mapCurrentSource: PS,
  mapRemoved: JS,
  mapSettings: DS,
  mapObject: bs,
  mapObjectRemoved: FS,
  mapType: Rg,
  mapTypeRemoved: jS,
  mapTypeNew: VS,
  mapObjectsVisible: pl,
  mapObjectCurrent: hl,
  mapObjectNew: BS,
  mapObjectsLink: YS,
  mapTypeCurrent: IS,
  mapRects: HS,
  mapBackground: RS,
  mapObjectArrows: US,
  mapObjectsGeometryFix: zS,
  canvas: xi,
  miniMap: KS,
  notification: dl,
  modal: ES,
  drawer: Pg,
  konvaLayer: cn,
  resizing: qS,
  objectAdditionalFieldsFix: XS,
  mapObjectRelationRemoved: QS,
  fps: ZS,
  breadcrumbs: ex,
  mapObjectUrl: tx,
  keyboard: fl,
  parentNames: lf,
  parentTypes: nx,
  controlCombo: rx,
  menu: ix,
  stagePosition: sx,
  stagePositionByObjectId: ox,
  objectsMatchedToQuery: ax,
  stageSize: ki,
  mapHistory: lx,
  fileContent: Ig,
  newArrow: $g,
  objectsOutsideScreen: cx,
  settings: Ng,
  documentTitle: AS,
  sidebarDraggable: jg
}, Qe = () => ux;
class pe {
  constructor(e = void 0) {
    ne(this, "innerRef");
    this.innerRef = qe(e);
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
/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function fx(n) {
  const e = /* @__PURE__ */ Object.create(null);
  for (const t of n.split(",")) e[t] = 1;
  return (t) => t in e;
}
const cf = {}, Sa = () => {
}, Vg = Object.assign, dx = Object.prototype.hasOwnProperty, Yc = (n, e) => dx.call(n, e), vn = Array.isArray, Ys = (n) => ml(n) === "[object Map]", hx = (n) => ml(n) === "[object Set]", _r = (n) => typeof n == "function", px = (n) => typeof n == "string", Io = (n) => typeof n == "symbol", ws = (n) => n !== null && typeof n == "object", mx = (n) => (ws(n) || _r(n)) && _r(n.then) && _r(n.catch), gx = Object.prototype.toString, ml = (n) => gx.call(n), yx = (n) => ml(n).slice(8, -1), vx = (n) => ml(n) === "[object Object]", uf = (n) => px(n) && n !== "NaN" && n[0] !== "-" && "" + parseInt(n, 10) === n, Sr = (n, e) => !Object.is(n, e);
let hh;
const ff = () => hh || (hh = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Fe;
const ic = /* @__PURE__ */ new WeakSet();
class bx {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0;
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ic.has(this) && (ic.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Hg(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, ph(this), Gg(this);
    const e = Fe, t = bn;
    Fe = this, bn = !0;
    try {
      return this.fn();
    } finally {
      Wg(this), Fe = e, bn = t, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep)
        pf(e);
      this.deps = this.depsTail = void 0, ph(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? ic.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    qc(this) && this.run();
  }
  get dirty() {
    return qc(this);
  }
}
let zg = 0, qs, Xs;
function Hg(n, e = !1) {
  if (n.flags |= 8, e) {
    n.next = Xs, Xs = n;
    return;
  }
  n.next = qs, qs = n;
}
function df() {
  zg++;
}
function hf() {
  if (--zg > 0)
    return;
  if (Xs) {
    let e = Xs;
    for (Xs = void 0; e; ) {
      const t = e.next;
      e.next = void 0, e.flags &= -9, e = t;
    }
  }
  let n;
  for (; qs; ) {
    let e = qs;
    for (qs = void 0; e; ) {
      const t = e.next;
      if (e.next = void 0, e.flags &= -9, e.flags & 1)
        try {
          e.trigger();
        } catch (r) {
          n || (n = r);
        }
      e = t;
    }
  }
  if (n) throw n;
}
function Gg(n) {
  for (let e = n.deps; e; e = e.nextDep)
    e.version = -1, e.prevActiveLink = e.dep.activeLink, e.dep.activeLink = e;
}
function Wg(n) {
  let e, t = n.depsTail, r = t;
  for (; r; ) {
    const i = r.prevDep;
    r.version === -1 ? (r === t && (t = i), pf(r), wx(r)) : e = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = i;
  }
  n.deps = e, n.depsTail = t;
}
function qc(n) {
  for (let e = n.deps; e; e = e.nextDep)
    if (e.dep.version !== e.version || e.dep.computed && (Ug(e.dep.computed) || e.dep.version !== e.version))
      return !0;
  return !!n._dirty;
}
function Ug(n) {
  if (n.flags & 4 && !(n.flags & 16) || (n.flags &= -17, n.globalVersion === uo))
    return;
  n.globalVersion = uo;
  const e = n.dep;
  if (n.flags |= 2, e.version > 0 && !n.isSSR && n.deps && !qc(n)) {
    n.flags &= -3;
    return;
  }
  const t = Fe, r = bn;
  Fe = n, bn = !0;
  try {
    Gg(n);
    const i = n.fn(n._value);
    (e.version === 0 || Sr(i, n._value)) && (n._value = i, e.version++);
  } catch (i) {
    throw e.version++, i;
  } finally {
    Fe = t, bn = r, Wg(n), n.flags &= -3;
  }
}
function pf(n, e = !1) {
  const { dep: t, prevSub: r, nextSub: i } = n;
  if (r && (r.nextSub = i, n.prevSub = void 0), i && (i.prevSub = r, n.nextSub = void 0), t.subs === n && (t.subs = r, !r && t.computed)) {
    t.computed.flags &= -5;
    for (let s = t.computed.deps; s; s = s.nextDep)
      pf(s, !0);
  }
  !e && !--t.sc && t.map && t.map.delete(t.key);
}
function wx(n) {
  const { prevDep: e, nextDep: t } = n;
  e && (e.nextDep = t, n.prevDep = void 0), t && (t.prevDep = e, n.nextDep = void 0);
}
let bn = !0;
const Kg = [];
function mf() {
  Kg.push(bn), bn = !1;
}
function gf() {
  const n = Kg.pop();
  bn = n === void 0 ? !0 : n;
}
function ph(n) {
  const { cleanup: e } = n;
  if (n.cleanup = void 0, e) {
    const t = Fe;
    Fe = void 0;
    try {
      e();
    } finally {
      Fe = t;
    }
  }
}
let uo = 0;
class Cx {
  constructor(e, t) {
    this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class yf {
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0;
  }
  track(e) {
    if (!Fe || !bn || Fe === this.computed)
      return;
    let t = this.activeLink;
    if (t === void 0 || t.sub !== Fe)
      t = this.activeLink = new Cx(Fe, this), Fe.deps ? (t.prevDep = Fe.depsTail, Fe.depsTail.nextDep = t, Fe.depsTail = t) : Fe.deps = Fe.depsTail = t, Yg(t);
    else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
      const r = t.nextDep;
      r.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = r), t.prevDep = Fe.depsTail, t.nextDep = void 0, Fe.depsTail.nextDep = t, Fe.depsTail = t, Fe.deps === t && (Fe.deps = r);
    }
    return t;
  }
  trigger(e) {
    this.version++, uo++, this.notify(e);
  }
  notify(e) {
    df();
    try {
      for (let t = this.subs; t; t = t.prevSub)
        t.sub.notify() && t.sub.dep.notify();
    } finally {
      hf();
    }
  }
}
function Yg(n) {
  if (n.dep.sc++, n.sub.flags & 4) {
    const e = n.dep.computed;
    if (e && !n.dep.subs) {
      e.flags |= 20;
      for (let r = e.deps; r; r = r.nextDep)
        Yg(r);
    }
    const t = n.dep.subs;
    t !== n && (n.prevSub = t, t && (t.nextSub = n)), n.dep.subs = n;
  }
}
const Xc = /* @__PURE__ */ new WeakMap(), si = Symbol(
  ""
), Jc = Symbol(
  ""
), fo = Symbol(
  ""
);
function Pt(n, e, t) {
  if (bn && Fe) {
    let r = Xc.get(n);
    r || Xc.set(n, r = /* @__PURE__ */ new Map());
    let i = r.get(t);
    i || (r.set(t, i = new yf()), i.map = r, i.key = t), i.track();
  }
}
function mr(n, e, t, r, i, s) {
  const o = Xc.get(n);
  if (!o) {
    uo++;
    return;
  }
  const a = (l) => {
    l && l.trigger();
  };
  if (df(), e === "clear")
    o.forEach(a);
  else {
    const l = vn(n), c = l && uf(t);
    if (l && t === "length") {
      const u = Number(r);
      o.forEach((f, d) => {
        (d === "length" || d === fo || !Io(d) && d >= u) && a(f);
      });
    } else
      switch ((t !== void 0 || o.has(void 0)) && a(o.get(t)), c && a(o.get(fo)), e) {
        case "add":
          l ? c && a(o.get("length")) : (a(o.get(si)), Ys(n) && a(o.get(Jc)));
          break;
        case "delete":
          l || (a(o.get(si)), Ys(n) && a(o.get(Jc)));
          break;
        case "set":
          Ys(n) && a(o.get(si));
          break;
      }
  }
  hf();
}
function Ii(n) {
  const e = Ne(n);
  return e === n ? e : (Pt(e, "iterate", fo), wn(n) ? e : e.map(xt));
}
function vf(n) {
  return Pt(n = Ne(n), "iterate", fo), n;
}
const _x = {
  __proto__: null,
  [Symbol.iterator]() {
    return sc(this, Symbol.iterator, xt);
  },
  concat(...n) {
    return Ii(this).concat(
      ...n.map((e) => vn(e) ? Ii(e) : e)
    );
  },
  entries() {
    return sc(this, "entries", (n) => (n[1] = xt(n[1]), n));
  },
  every(n, e) {
    return zn(this, "every", n, e, void 0, arguments);
  },
  filter(n, e) {
    return zn(this, "filter", n, e, (t) => t.map(xt), arguments);
  },
  find(n, e) {
    return zn(this, "find", n, e, xt, arguments);
  },
  findIndex(n, e) {
    return zn(this, "findIndex", n, e, void 0, arguments);
  },
  findLast(n, e) {
    return zn(this, "findLast", n, e, xt, arguments);
  },
  findLastIndex(n, e) {
    return zn(this, "findLastIndex", n, e, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(n, e) {
    return zn(this, "forEach", n, e, void 0, arguments);
  },
  includes(...n) {
    return oc(this, "includes", n);
  },
  indexOf(...n) {
    return oc(this, "indexOf", n);
  },
  join(n) {
    return Ii(this).join(n);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...n) {
    return oc(this, "lastIndexOf", n);
  },
  map(n, e) {
    return zn(this, "map", n, e, void 0, arguments);
  },
  pop() {
    return Ps(this, "pop");
  },
  push(...n) {
    return Ps(this, "push", n);
  },
  reduce(n, ...e) {
    return mh(this, "reduce", n, e);
  },
  reduceRight(n, ...e) {
    return mh(this, "reduceRight", n, e);
  },
  shift() {
    return Ps(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(n, e) {
    return zn(this, "some", n, e, void 0, arguments);
  },
  splice(...n) {
    return Ps(this, "splice", n);
  },
  toReversed() {
    return Ii(this).toReversed();
  },
  toSorted(n) {
    return Ii(this).toSorted(n);
  },
  toSpliced(...n) {
    return Ii(this).toSpliced(...n);
  },
  unshift(...n) {
    return Ps(this, "unshift", n);
  },
  values() {
    return sc(this, "values", xt);
  }
};
function sc(n, e, t) {
  const r = vf(n), i = r[e]();
  return r !== n && !wn(n) && (i._next = i.next, i.next = () => {
    const s = i._next();
    return s.value && (s.value = t(s.value)), s;
  }), i;
}
const Sx = Array.prototype;
function zn(n, e, t, r, i, s) {
  const o = vf(n), a = o !== n && !wn(n), l = o[e];
  if (l !== Sx[e]) {
    const f = l.apply(n, s);
    return a ? xt(f) : f;
  }
  let c = t;
  o !== n && (a ? c = function(f, d) {
    return t.call(this, xt(f), d, n);
  } : t.length > 2 && (c = function(f, d) {
    return t.call(this, f, d, n);
  }));
  const u = l.call(o, c, r);
  return a && i ? i(u) : u;
}
function mh(n, e, t, r) {
  const i = vf(n);
  let s = t;
  return i !== n && (wn(n) ? t.length > 3 && (s = function(o, a, l) {
    return t.call(this, o, a, l, n);
  }) : s = function(o, a, l) {
    return t.call(this, o, xt(a), l, n);
  }), i[e](s, ...r);
}
function oc(n, e, t) {
  const r = Ne(n);
  Pt(r, "iterate", fo);
  const i = r[e](...t);
  return (i === -1 || i === !1) && $x(t[0]) ? (t[0] = Ne(t[0]), r[e](...t)) : i;
}
function Ps(n, e, t = []) {
  mf(), df();
  const r = Ne(n)[e].apply(n, t);
  return hf(), gf(), r;
}
const xx = /* @__PURE__ */ fx("__proto__,__v_isRef,__isVue"), qg = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((n) => n !== "arguments" && n !== "caller").map((n) => Symbol[n]).filter(Io)
);
function kx(n) {
  Io(n) || (n = String(n));
  const e = Ne(this);
  return Pt(e, "has", n), e.hasOwnProperty(n);
}
class Xg {
  constructor(e = !1, t = !1) {
    this._isReadonly = e, this._isShallow = t;
  }
  get(e, t, r) {
    if (t === "__v_skip") return e.__v_skip;
    const i = this._isReadonly, s = this._isShallow;
    if (t === "__v_isReactive")
      return !i;
    if (t === "__v_isReadonly")
      return i;
    if (t === "__v_isShallow")
      return s;
    if (t === "__v_raw")
      return r === (i ? s ? Lx : Zg : s ? Dx : Qg).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(r) ? e : void 0;
    const o = vn(e);
    if (!i) {
      let l;
      if (o && (l = _x[t]))
        return l;
      if (t === "hasOwnProperty")
        return kx;
    }
    const a = Reflect.get(
      e,
      t,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Jn(e) ? e : r
    );
    return (Io(t) ? qg.has(t) : xx(t)) || (i || Pt(e, "get", t), s) ? a : Jn(a) ? o && uf(t) ? a : a.value : ws(a) ? i ? ty(a) : ey(a) : a;
  }
}
class Tx extends Xg {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, t, r, i) {
    let s = e[t];
    if (!this._isShallow) {
      const l = pi(s);
      if (!wn(r) && !pi(r) && (s = Ne(s), r = Ne(r)), !vn(e) && Jn(s) && !Jn(r))
        return l ? !1 : (s.value = r, !0);
    }
    const o = vn(e) && uf(t) ? Number(t) < e.length : Yc(e, t), a = Reflect.set(
      e,
      t,
      r,
      Jn(e) ? e : i
    );
    return e === Ne(i) && (o ? Sr(r, s) && mr(e, "set", t, r) : mr(e, "add", t, r)), a;
  }
  deleteProperty(e, t) {
    const r = Yc(e, t);
    e[t];
    const i = Reflect.deleteProperty(e, t);
    return i && r && mr(e, "delete", t, void 0), i;
  }
  has(e, t) {
    const r = Reflect.has(e, t);
    return (!Io(t) || !qg.has(t)) && Pt(e, "has", t), r;
  }
  ownKeys(e) {
    return Pt(
      e,
      "iterate",
      vn(e) ? "length" : si
    ), Reflect.ownKeys(e);
  }
}
class Ox extends Xg {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, t) {
    return !0;
  }
  deleteProperty(e, t) {
    return !0;
  }
}
const Ex = /* @__PURE__ */ new Tx(), Mx = /* @__PURE__ */ new Ox(), Qc = (n) => n, sa = (n) => Reflect.getPrototypeOf(n);
function Ax(n, e, t) {
  return function(...r) {
    const i = this.__v_raw, s = Ne(i), o = Ys(s), a = n === "entries" || n === Symbol.iterator && o, l = n === "keys" && o, c = i[n](...r), u = t ? Qc : e ? Zc : xt;
    return !e && Pt(
      s,
      "iterate",
      l ? Jc : si
    ), {
      // iterator protocol
      next() {
        const { value: f, done: d } = c.next();
        return d ? { value: f, done: d } : {
          value: a ? [u(f[0]), u(f[1])] : u(f),
          done: d
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function oa(n) {
  return function(...e) {
    return n === "delete" ? !1 : n === "clear" ? void 0 : this;
  };
}
function Nx(n, e) {
  const t = {
    get(i) {
      const s = this.__v_raw, o = Ne(s), a = Ne(i);
      n || (Sr(i, a) && Pt(o, "get", i), Pt(o, "get", a));
      const { has: l } = sa(o), c = e ? Qc : n ? Zc : xt;
      if (l.call(o, i))
        return c(s.get(i));
      if (l.call(o, a))
        return c(s.get(a));
      s !== o && s.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !n && Pt(Ne(i), "iterate", si), Reflect.get(i, "size", i);
    },
    has(i) {
      const s = this.__v_raw, o = Ne(s), a = Ne(i);
      return n || (Sr(i, a) && Pt(o, "has", i), Pt(o, "has", a)), i === a ? s.has(i) : s.has(i) || s.has(a);
    },
    forEach(i, s) {
      const o = this, a = o.__v_raw, l = Ne(a), c = e ? Qc : n ? Zc : xt;
      return !n && Pt(l, "iterate", si), a.forEach((u, f) => i.call(s, c(u), c(f), o));
    }
  };
  return Vg(
    t,
    n ? {
      add: oa("add"),
      set: oa("set"),
      delete: oa("delete"),
      clear: oa("clear")
    } : {
      add(i) {
        !e && !wn(i) && !pi(i) && (i = Ne(i));
        const s = Ne(this);
        return sa(s).has.call(s, i) || (s.add(i), mr(s, "add", i, i)), this;
      },
      set(i, s) {
        !e && !wn(s) && !pi(s) && (s = Ne(s));
        const o = Ne(this), { has: a, get: l } = sa(o);
        let c = a.call(o, i);
        c || (i = Ne(i), c = a.call(o, i));
        const u = l.call(o, i);
        return o.set(i, s), c ? Sr(s, u) && mr(o, "set", i, s) : mr(o, "add", i, s), this;
      },
      delete(i) {
        const s = Ne(this), { has: o, get: a } = sa(s);
        let l = o.call(s, i);
        l || (i = Ne(i), l = o.call(s, i)), a && a.call(s, i);
        const c = s.delete(i);
        return l && mr(s, "delete", i, void 0), c;
      },
      clear() {
        const i = Ne(this), s = i.size !== 0, o = i.clear();
        return s && mr(
          i,
          "clear",
          void 0,
          void 0
        ), o;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((i) => {
    t[i] = Ax(i, n, e);
  }), t;
}
function Jg(n, e) {
  const t = Nx(n, e);
  return (r, i, s) => i === "__v_isReactive" ? !n : i === "__v_isReadonly" ? n : i === "__v_raw" ? r : Reflect.get(
    Yc(t, i) && i in r ? t : r,
    i,
    s
  );
}
const Px = {
  get: /* @__PURE__ */ Jg(!1, !1)
}, Ix = {
  get: /* @__PURE__ */ Jg(!0, !1)
}, Qg = /* @__PURE__ */ new WeakMap(), Dx = /* @__PURE__ */ new WeakMap(), Zg = /* @__PURE__ */ new WeakMap(), Lx = /* @__PURE__ */ new WeakMap();
function Rx(n) {
  switch (n) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Fx(n) {
  return n.__v_skip || !Object.isExtensible(n) ? 0 : Rx(yx(n));
}
function ey(n) {
  return pi(n) ? n : ny(
    n,
    !1,
    Ex,
    Px,
    Qg
  );
}
function ty(n) {
  return ny(
    n,
    !0,
    Mx,
    Ix,
    Zg
  );
}
function ny(n, e, t, r, i) {
  if (!ws(n) || n.__v_raw && !(e && n.__v_isReactive))
    return n;
  const s = i.get(n);
  if (s)
    return s;
  const o = Fx(n);
  if (o === 0)
    return n;
  const a = new Proxy(
    n,
    o === 2 ? r : t
  );
  return i.set(n, a), a;
}
function xa(n) {
  return pi(n) ? xa(n.__v_raw) : !!(n && n.__v_isReactive);
}
function pi(n) {
  return !!(n && n.__v_isReadonly);
}
function wn(n) {
  return !!(n && n.__v_isShallow);
}
function $x(n) {
  return n ? !!n.__v_raw : !1;
}
function Ne(n) {
  const e = n && n.__v_raw;
  return e ? Ne(e) : n;
}
const xt = (n) => ws(n) ? ey(n) : n, Zc = (n) => ws(n) ? ty(n) : n;
function Jn(n) {
  return n ? n.__v_isRef === !0 : !1;
}
function ka(n) {
  return Bx(n, !1);
}
function Bx(n, e) {
  return Jn(n) ? n : new jx(n, e);
}
class jx {
  constructor(e, t) {
    this.dep = new yf(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : Ne(e), this._value = t ? e : xt(e), this.__v_isShallow = t;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const t = this._rawValue, r = this.__v_isShallow || wn(e) || pi(e);
    e = r ? e : Ne(e), Sr(e, t) && (this._rawValue = e, this._value = r ? e : xt(e), this.dep.trigger());
  }
}
class Vx {
  constructor(e, t, r) {
    this.fn = e, this.setter = t, this._value = void 0, this.dep = new yf(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = uo - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Fe !== this)
      return Hg(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return Ug(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
}
function zx(n, e, t = !1) {
  let r, i;
  return _r(n) ? r = n : (r = n.get, i = n.set), new Vx(r, i, t);
}
const aa = {}, La = /* @__PURE__ */ new WeakMap();
let Xr;
function Hx(n, e = !1, t = Xr) {
  if (t) {
    let r = La.get(t);
    r || La.set(t, r = []), r.push(n);
  }
}
function Gx(n, e, t = cf) {
  const { immediate: r, deep: i, once: s, scheduler: o, augmentJob: a, call: l } = t, c = (b) => i ? b : wn(b) || i === !1 || i === 0 ? gr(b, 1) : gr(b);
  let u, f, d, p, h = !1, m = !1;
  if (Jn(n) ? (f = () => n.value, h = wn(n)) : xa(n) ? (f = () => c(n), h = !0) : vn(n) ? (m = !0, h = n.some((b) => xa(b) || wn(b)), f = () => n.map((b) => {
    if (Jn(b))
      return b.value;
    if (xa(b))
      return c(b);
    if (_r(b))
      return l ? l(b, 2) : b();
  })) : _r(n) ? e ? f = l ? () => l(n, 2) : n : f = () => {
    if (d) {
      mf();
      try {
        d();
      } finally {
        gf();
      }
    }
    const b = Xr;
    Xr = u;
    try {
      return l ? l(n, 3, [p]) : n(p);
    } finally {
      Xr = b;
    }
  } : f = Sa, e && i) {
    const b = f, y = i === !0 ? 1 / 0 : i;
    f = () => gr(b(), y);
  }
  const g = () => {
    u.stop();
  };
  if (s && e) {
    const b = e;
    e = (...y) => {
      b(...y), g();
    };
  }
  let v = m ? new Array(n.length).fill(aa) : aa;
  const w = (b) => {
    if (!(!(u.flags & 1) || !u.dirty && !b))
      if (e) {
        const y = u.run();
        if (i || h || (m ? y.some((k, C) => Sr(k, v[C])) : Sr(y, v))) {
          d && d();
          const k = Xr;
          Xr = u;
          try {
            const C = [
              y,
              // pass undefined as the old value when it's changed for the first time
              v === aa ? void 0 : m && v[0] === aa ? [] : v,
              p
            ];
            l ? l(e, 3, C) : (
              // @ts-expect-error
              e(...C)
            ), v = y;
          } finally {
            Xr = k;
          }
        }
      } else
        u.run();
  };
  return a && a(w), u = new bx(f), u.scheduler = o ? () => o(w, !1) : w, p = (b) => Hx(b, !1, u), d = u.onStop = () => {
    const b = La.get(u);
    if (b) {
      if (l)
        l(b, 4);
      else
        for (const y of b) y();
      La.delete(u);
    }
  }, e ? r ? w(!0) : v = u.run() : o ? o(w.bind(null, !0), !0) : u.run(), g.pause = u.pause.bind(u), g.resume = u.resume.bind(u), g.stop = g, g;
}
function gr(n, e = 1 / 0, t) {
  if (e <= 0 || !ws(n) || n.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(n)))
    return n;
  if (t.add(n), e--, Jn(n))
    gr(n.value, e, t);
  else if (vn(n))
    for (let r = 0; r < n.length; r++)
      gr(n[r], e, t);
  else if (hx(n) || Ys(n))
    n.forEach((r) => {
      gr(r, e, t);
    });
  else if (vx(n)) {
    for (const r in n)
      gr(n[r], e, t);
    for (const r of Object.getOwnPropertySymbols(n))
      Object.prototype.propertyIsEnumerable.call(n, r) && gr(n[r], e, t);
  }
  return n;
}
const Wx = { key: 0 }, Ux = { class: "flex-grow overflow-y-auto" }, Kx = {
  key: 1,
  class: "flex gap-1"
}, bf = /* @__PURE__ */ he({
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
    const t = n, r = e, i = zx(() => ["e2e-drawer-back absolute z-10 top-0 left-0 w-full h-full bg-black/50"]), s = {
      ltr: "top-0 left-0 w-[50%] max-w-[900px] ",
      rtl: "top-0 right-0 w-[50%] max-w-[900px] ",
      ttb: "top-0 right-0 left-0",
      btt: "top-auto h-[900px] max-h-[50%] bottom-0 right-0 left-0"
    }, { drawer: o } = Qe(), a = () => {
      o.give(""), r("close");
    }, l = o.isOpenedByName(t.name, new pe()).ref();
    return (c, u) => (I(), rt(Jm, { name: "fade" }, {
      default: H(() => [
        E(l) ? (I(), B("div", {
          key: 0,
          class: Ln(E(i)),
          onClick: a
        }, [
          z("div", {
            class: Ln(["absolute bg-white h-full p-3 flex flex-col overflow-hidden", s[n.direction]]),
            onClick: u[0] || (u[0] = ms(() => {
            }, ["stop"]))
          }, [
            c.$slots.header ? (I(), B("div", Wx, [
              nn(c.$slots, "header", { class: "BaseDrawer-Header" })
            ])) : ge("", !0),
            z("div", Ux, [
              nn(c.$slots, "default")
            ]),
            c.$slots.footer ? (I(), B("div", Kx, [
              nn(c.$slots, "footer")
            ])) : ge("", !0)
          ], 2)
        ], 2)) : ge("", !0)
      ]),
      _: 3
    }));
  }
}), gh = () => {
};
let wf = {}, ry = {}, iy = null, sy = {
  mark: gh,
  measure: gh
};
try {
  typeof window < "u" && (wf = window), typeof document < "u" && (ry = document), typeof MutationObserver < "u" && (iy = MutationObserver), typeof performance < "u" && (sy = performance);
} catch {
}
const {
  userAgent: yh = ""
} = wf.navigator || {}, Nr = wf, $e = ry, vh = iy, la = sy;
Nr.document;
const sr = !!$e.documentElement && !!$e.head && typeof $e.addEventListener == "function" && typeof $e.createElement == "function", oy = ~yh.indexOf("MSIE") || ~yh.indexOf("Trident/");
var Ve = "classic", ay = "duotone", Bt = "sharp", jt = "sharp-duotone", Yx = [Ve, ay, Bt, jt], qx = {
  classic: {
    900: "fas",
    400: "far",
    normal: "far",
    300: "fal",
    100: "fat"
  },
  sharp: {
    900: "fass",
    400: "fasr",
    300: "fasl",
    100: "fast"
  },
  "sharp-duotone": {
    900: "fasds"
  }
}, bh = {
  kit: {
    fak: "kit",
    "fa-kit": "kit"
  },
  "kit-duotone": {
    fakd: "kit-duotone",
    "fa-kit-duotone": "kit-duotone"
  }
}, Xx = ["kit"], Jx = /fa(s|r|l|t|d|b|k|kd|ss|sr|sl|st|sds)?[\-\ ]/, Qx = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i, Zx = {
  "Font Awesome 5 Free": {
    900: "fas",
    400: "far"
  },
  "Font Awesome 5 Pro": {
    900: "fas",
    400: "far",
    normal: "far",
    300: "fal"
  },
  "Font Awesome 5 Brands": {
    400: "fab",
    normal: "fab"
  },
  "Font Awesome 5 Duotone": {
    900: "fad"
  }
}, ek = {
  "Font Awesome 6 Free": {
    900: "fas",
    400: "far"
  },
  "Font Awesome 6 Pro": {
    900: "fas",
    400: "far",
    normal: "far",
    300: "fal",
    100: "fat"
  },
  "Font Awesome 6 Brands": {
    400: "fab",
    normal: "fab"
  },
  "Font Awesome 6 Duotone": {
    900: "fad"
  },
  "Font Awesome 6 Sharp": {
    900: "fass",
    400: "fasr",
    normal: "fasr",
    300: "fasl",
    100: "fast"
  },
  "Font Awesome 6 Sharp Duotone": {
    900: "fasds"
  }
}, tk = {
  classic: {
    "fa-brands": "fab",
    "fa-duotone": "fad",
    "fa-light": "fal",
    "fa-regular": "far",
    "fa-solid": "fas",
    "fa-thin": "fat"
  },
  sharp: {
    "fa-solid": "fass",
    "fa-regular": "fasr",
    "fa-light": "fasl",
    "fa-thin": "fast"
  },
  "sharp-duotone": {
    "fa-solid": "fasds"
  }
}, nk = {
  classic: ["fas", "far", "fal", "fat"],
  sharp: ["fass", "fasr", "fasl", "fast"],
  "sharp-duotone": ["fasds"]
}, rk = {
  classic: {
    fab: "fa-brands",
    fad: "fa-duotone",
    fal: "fa-light",
    far: "fa-regular",
    fas: "fa-solid",
    fat: "fa-thin"
  },
  sharp: {
    fass: "fa-solid",
    fasr: "fa-regular",
    fasl: "fa-light",
    fast: "fa-thin"
  },
  "sharp-duotone": {
    fasds: "fa-solid"
  }
}, ik = {
  classic: {
    solid: "fas",
    regular: "far",
    light: "fal",
    thin: "fat",
    duotone: "fad",
    brands: "fab"
  },
  sharp: {
    solid: "fass",
    regular: "fasr",
    light: "fasl",
    thin: "fast"
  },
  "sharp-duotone": {
    solid: "fasds"
  }
}, ly = {
  classic: {
    fa: "solid",
    fas: "solid",
    "fa-solid": "solid",
    far: "regular",
    "fa-regular": "regular",
    fal: "light",
    "fa-light": "light",
    fat: "thin",
    "fa-thin": "thin",
    fad: "duotone",
    "fa-duotone": "duotone",
    fab: "brands",
    "fa-brands": "brands"
  },
  sharp: {
    fa: "solid",
    fass: "solid",
    "fa-solid": "solid",
    fasr: "regular",
    "fa-regular": "regular",
    fasl: "light",
    "fa-light": "light",
    fast: "thin",
    "fa-thin": "thin"
  },
  "sharp-duotone": {
    fa: "solid",
    fasds: "solid",
    "fa-solid": "solid"
  }
}, sk = ["solid", "regular", "light", "thin", "duotone", "brands"], cy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], ok = cy.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]), Vs = {
  GROUP: "duotone-group",
  SWAP_OPACITY: "swap-opacity",
  PRIMARY: "primary",
  SECONDARY: "secondary"
}, ak = [...Object.keys(nk), ...sk, "2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "fw", "inverse", "layers-counter", "layers-text", "layers", "li", "pull-left", "pull-right", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", Vs.GROUP, Vs.SWAP_OPACITY, Vs.PRIMARY, Vs.SECONDARY].concat(cy.map((n) => "".concat(n, "x"))).concat(ok.map((n) => "w-".concat(n))), lk = {
  "Font Awesome Kit": {
    400: "fak",
    normal: "fak"
  },
  "Font Awesome Kit Duotone": {
    400: "fakd",
    normal: "fakd"
  }
}, ck = {
  kit: {
    "fa-kit": "fak"
  },
  "kit-duotone": {
    "fa-kit-duotone": "fakd"
  }
}, uk = {
  kit: {
    fak: "fa-kit"
  },
  "kit-duotone": {
    fakd: "fa-kit-duotone"
  }
}, wh = {
  kit: {
    kit: "fak"
  },
  "kit-duotone": {
    "kit-duotone": "fakd"
  }
};
const er = "___FONT_AWESOME___", eu = 16, uy = "fa", fy = "svg-inline--fa", mi = "data-fa-i2svg", tu = "data-fa-pseudo-element", fk = "data-fa-pseudo-element-pending", Cf = "data-prefix", _f = "data-icon", Ch = "fontawesome-i2svg", dk = "async", hk = ["HTML", "HEAD", "STYLE", "SCRIPT"], dy = (() => {
  try {
    return !0;
  } catch {
    return !1;
  }
})(), hy = [Ve, Bt, jt];
function Do(n) {
  return new Proxy(n, {
    get(e, t) {
      return t in e ? e[t] : e[Ve];
    }
  });
}
const py = {
  ...ly
};
py[Ve] = {
  ...ly[Ve],
  ...bh.kit,
  ...bh["kit-duotone"]
};
const oi = Do(py), nu = {
  ...ik
};
nu[Ve] = {
  ...nu[Ve],
  ...wh.kit,
  ...wh["kit-duotone"]
};
const ho = Do(nu), ru = {
  ...rk
};
ru[Ve] = {
  ...ru[Ve],
  ...uk.kit
};
const ai = Do(ru), iu = {
  ...tk
};
iu[Ve] = {
  ...iu[Ve],
  ...ck.kit
};
const pk = Do(iu), mk = Jx, my = "fa-layers-text", gk = Qx, yk = {
  ...qx
};
Do(yk);
const vk = ["class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask"], ac = Vs, Zi = /* @__PURE__ */ new Set();
Object.keys(ho[Ve]).map(Zi.add.bind(Zi));
Object.keys(ho[Bt]).map(Zi.add.bind(Zi));
Object.keys(ho[jt]).map(Zi.add.bind(Zi));
const bk = [...Xx, ...ak], Js = Nr.FontAwesomeConfig || {};
function wk(n) {
  var e = $e.querySelector("script[" + n + "]");
  if (e)
    return e.getAttribute(n);
}
function Ck(n) {
  return n === "" ? !0 : n === "false" ? !1 : n === "true" ? !0 : n;
}
$e && typeof $e.querySelector == "function" && [["data-family-prefix", "familyPrefix"], ["data-css-prefix", "cssPrefix"], ["data-family-default", "familyDefault"], ["data-style-default", "styleDefault"], ["data-replacement-class", "replacementClass"], ["data-auto-replace-svg", "autoReplaceSvg"], ["data-auto-add-css", "autoAddCss"], ["data-auto-a11y", "autoA11y"], ["data-search-pseudo-elements", "searchPseudoElements"], ["data-observe-mutations", "observeMutations"], ["data-mutate-approach", "mutateApproach"], ["data-keep-original-source", "keepOriginalSource"], ["data-measure-performance", "measurePerformance"], ["data-show-missing-icons", "showMissingIcons"]].forEach((e) => {
  let [t, r] = e;
  const i = Ck(wk(t));
  i != null && (Js[r] = i);
});
const gy = {
  styleDefault: "solid",
  familyDefault: "classic",
  cssPrefix: uy,
  replacementClass: fy,
  autoReplaceSvg: !0,
  autoAddCss: !0,
  autoA11y: !0,
  searchPseudoElements: !1,
  observeMutations: !0,
  mutateApproach: "async",
  keepOriginalSource: !0,
  measurePerformance: !1,
  showMissingIcons: !0
};
Js.familyPrefix && (Js.cssPrefix = Js.familyPrefix);
const es = {
  ...gy,
  ...Js
};
es.autoReplaceSvg || (es.observeMutations = !1);
const q = {};
Object.keys(gy).forEach((n) => {
  Object.defineProperty(q, n, {
    enumerable: !0,
    set: function(e) {
      es[n] = e, Qs.forEach((t) => t(q));
    },
    get: function() {
      return es[n];
    }
  });
});
Object.defineProperty(q, "familyPrefix", {
  enumerable: !0,
  set: function(n) {
    es.cssPrefix = n, Qs.forEach((e) => e(q));
  },
  get: function() {
    return es.cssPrefix;
  }
});
Nr.FontAwesomeConfig = q;
const Qs = [];
function _k(n) {
  return Qs.push(n), () => {
    Qs.splice(Qs.indexOf(n), 1);
  };
}
const lr = eu, Nn = {
  size: 16,
  x: 0,
  y: 0,
  rotate: 0,
  flipX: !1,
  flipY: !1
};
function Sk(n) {
  if (!n || !sr)
    return;
  const e = $e.createElement("style");
  e.setAttribute("type", "text/css"), e.innerHTML = n;
  const t = $e.head.childNodes;
  let r = null;
  for (let i = t.length - 1; i > -1; i--) {
    const s = t[i], o = (s.tagName || "").toUpperCase();
    ["STYLE", "LINK"].indexOf(o) > -1 && (r = s);
  }
  return $e.head.insertBefore(e, r), n;
}
const xk = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function po() {
  let n = 12, e = "";
  for (; n-- > 0; )
    e += xk[Math.random() * 62 | 0];
  return e;
}
function Cs(n) {
  const e = [];
  for (let t = (n || []).length >>> 0; t--; )
    e[t] = n[t];
  return e;
}
function Sf(n) {
  return n.classList ? Cs(n.classList) : (n.getAttribute("class") || "").split(" ").filter((e) => e);
}
function yy(n) {
  return "".concat(n).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function kk(n) {
  return Object.keys(n || {}).reduce((e, t) => e + "".concat(t, '="').concat(yy(n[t]), '" '), "").trim();
}
function gl(n) {
  return Object.keys(n || {}).reduce((e, t) => e + "".concat(t, ": ").concat(n[t].trim(), ";"), "");
}
function xf(n) {
  return n.size !== Nn.size || n.x !== Nn.x || n.y !== Nn.y || n.rotate !== Nn.rotate || n.flipX || n.flipY;
}
function Tk(n) {
  let {
    transform: e,
    containerWidth: t,
    iconWidth: r
  } = n;
  const i = {
    transform: "translate(".concat(t / 2, " 256)")
  }, s = "translate(".concat(e.x * 32, ", ").concat(e.y * 32, ") "), o = "scale(".concat(e.size / 16 * (e.flipX ? -1 : 1), ", ").concat(e.size / 16 * (e.flipY ? -1 : 1), ") "), a = "rotate(".concat(e.rotate, " 0 0)"), l = {
    transform: "".concat(s, " ").concat(o, " ").concat(a)
  }, c = {
    transform: "translate(".concat(r / 2 * -1, " -256)")
  };
  return {
    outer: i,
    inner: l,
    path: c
  };
}
function Ok(n) {
  let {
    transform: e,
    width: t = eu,
    height: r = eu,
    startCentered: i = !1
  } = n, s = "";
  return i && oy ? s += "translate(".concat(e.x / lr - t / 2, "em, ").concat(e.y / lr - r / 2, "em) ") : i ? s += "translate(calc(-50% + ".concat(e.x / lr, "em), calc(-50% + ").concat(e.y / lr, "em)) ") : s += "translate(".concat(e.x / lr, "em, ").concat(e.y / lr, "em) "), s += "scale(".concat(e.size / lr * (e.flipX ? -1 : 1), ", ").concat(e.size / lr * (e.flipY ? -1 : 1), ") "), s += "rotate(".concat(e.rotate, "deg) "), s;
}
var Ek = `:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;
function vy() {
  const n = uy, e = fy, t = q.cssPrefix, r = q.replacementClass;
  let i = Ek;
  if (t !== n || r !== e) {
    const s = new RegExp("\\.".concat(n, "\\-"), "g"), o = new RegExp("\\--".concat(n, "\\-"), "g"), a = new RegExp("\\.".concat(e), "g");
    i = i.replace(s, ".".concat(t, "-")).replace(o, "--".concat(t, "-")).replace(a, ".".concat(r));
  }
  return i;
}
let _h = !1;
function lc() {
  q.autoAddCss && !_h && (Sk(vy()), _h = !0);
}
var Mk = {
  mixout() {
    return {
      dom: {
        css: vy,
        insertCss: lc
      }
    };
  },
  hooks() {
    return {
      beforeDOMElementCreation() {
        lc();
      },
      beforeI2svg() {
        lc();
      }
    };
  }
};
const tr = Nr || {};
tr[er] || (tr[er] = {});
tr[er].styles || (tr[er].styles = {});
tr[er].hooks || (tr[er].hooks = {});
tr[er].shims || (tr[er].shims = []);
var Pn = tr[er];
const by = [], wy = function() {
  $e.removeEventListener("DOMContentLoaded", wy), Ra = 1, by.map((n) => n());
};
let Ra = !1;
sr && (Ra = ($e.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test($e.readyState), Ra || $e.addEventListener("DOMContentLoaded", wy));
function Ak(n) {
  sr && (Ra ? setTimeout(n, 0) : by.push(n));
}
function Lo(n) {
  const {
    tag: e,
    attributes: t = {},
    children: r = []
  } = n;
  return typeof n == "string" ? yy(n) : "<".concat(e, " ").concat(kk(t), ">").concat(r.map(Lo).join(""), "</").concat(e, ">");
}
function Sh(n, e, t) {
  if (n && n[e] && n[e][t])
    return {
      prefix: e,
      iconName: t,
      icon: n[e][t]
    };
}
var cc = function(e, t, r, i) {
  var s = Object.keys(e), o = s.length, a = t, l, c, u;
  for (r === void 0 ? (l = 1, u = e[s[0]]) : (l = 0, u = r); l < o; l++)
    c = s[l], u = a(u, e[c], c, e);
  return u;
};
function Nk(n) {
  const e = [];
  let t = 0;
  const r = n.length;
  for (; t < r; ) {
    const i = n.charCodeAt(t++);
    if (i >= 55296 && i <= 56319 && t < r) {
      const s = n.charCodeAt(t++);
      (s & 64512) == 56320 ? e.push(((i & 1023) << 10) + (s & 1023) + 65536) : (e.push(i), t--);
    } else
      e.push(i);
  }
  return e;
}
function su(n) {
  const e = Nk(n);
  return e.length === 1 ? e[0].toString(16) : null;
}
function Pk(n, e) {
  const t = n.length;
  let r = n.charCodeAt(e), i;
  return r >= 55296 && r <= 56319 && t > e + 1 && (i = n.charCodeAt(e + 1), i >= 56320 && i <= 57343) ? (r - 55296) * 1024 + i - 56320 + 65536 : r;
}
function xh(n) {
  return Object.keys(n).reduce((e, t) => {
    const r = n[t];
    return !!r.icon ? e[r.iconName] = r.icon : e[t] = r, e;
  }, {});
}
function ou(n, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const {
    skipHooks: r = !1
  } = t, i = xh(e);
  typeof Pn.hooks.addPack == "function" && !r ? Pn.hooks.addPack(n, xh(e)) : Pn.styles[n] = {
    ...Pn.styles[n] || {},
    ...i
  }, n === "fas" && ou("fa", e);
}
const {
  styles: Qr,
  shims: Ik
} = Pn, Dk = {
  [Ve]: Object.values(ai[Ve]),
  [Bt]: Object.values(ai[Bt]),
  [jt]: Object.values(ai[jt])
};
let kf = null, Cy = {}, _y = {}, Sy = {}, xy = {}, ky = {};
const Lk = {
  [Ve]: Object.keys(oi[Ve]),
  [Bt]: Object.keys(oi[Bt]),
  [jt]: Object.keys(oi[jt])
};
function Rk(n) {
  return ~bk.indexOf(n);
}
function Fk(n, e) {
  const t = e.split("-"), r = t[0], i = t.slice(1).join("-");
  return r === n && i !== "" && !Rk(i) ? i : null;
}
const Ty = () => {
  const n = (r) => cc(Qr, (i, s, o) => (i[o] = cc(s, r, {}), i), {});
  Cy = n((r, i, s) => (i[3] && (r[i[3]] = s), i[2] && i[2].filter((a) => typeof a == "number").forEach((a) => {
    r[a.toString(16)] = s;
  }), r)), _y = n((r, i, s) => (r[s] = s, i[2] && i[2].filter((a) => typeof a == "string").forEach((a) => {
    r[a] = s;
  }), r)), ky = n((r, i, s) => {
    const o = i[2];
    return r[s] = s, o.forEach((a) => {
      r[a] = s;
    }), r;
  });
  const e = "far" in Qr || q.autoFetchSvg, t = cc(Ik, (r, i) => {
    const s = i[0];
    let o = i[1];
    const a = i[2];
    return o === "far" && !e && (o = "fas"), typeof s == "string" && (r.names[s] = {
      prefix: o,
      iconName: a
    }), typeof s == "number" && (r.unicodes[s.toString(16)] = {
      prefix: o,
      iconName: a
    }), r;
  }, {
    names: {},
    unicodes: {}
  });
  Sy = t.names, xy = t.unicodes, kf = yl(q.styleDefault, {
    family: q.familyDefault
  });
};
_k((n) => {
  kf = yl(n.styleDefault, {
    family: q.familyDefault
  });
});
Ty();
function Tf(n, e) {
  return (Cy[n] || {})[e];
}
function $k(n, e) {
  return (_y[n] || {})[e];
}
function vr(n, e) {
  return (ky[n] || {})[e];
}
function Oy(n) {
  return Sy[n] || {
    prefix: null,
    iconName: null
  };
}
function Bk(n) {
  const e = xy[n], t = Tf("fas", n);
  return e || (t ? {
    prefix: "fas",
    iconName: t
  } : null) || {
    prefix: null,
    iconName: null
  };
}
function Pr() {
  return kf;
}
const Of = () => ({
  prefix: null,
  iconName: null,
  rest: []
});
function yl(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    family: t = Ve
  } = e, r = oi[t][n], i = ho[t][n] || ho[t][r], s = n in Pn.styles ? n : null;
  return i || s || null;
}
const jk = {
  [Ve]: Object.keys(ai[Ve]),
  [Bt]: Object.keys(ai[Bt]),
  [jt]: Object.keys(ai[jt])
};
function vl(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    skipLookups: t = !1
  } = e, r = {
    [Ve]: "".concat(q.cssPrefix, "-").concat(Ve),
    [Bt]: "".concat(q.cssPrefix, "-").concat(Bt),
    [jt]: "".concat(q.cssPrefix, "-").concat(jt)
  };
  let i = null, s = Ve;
  const o = Yx.filter((l) => l !== ay);
  o.forEach((l) => {
    (n.includes(r[l]) || n.some((c) => jk[l].includes(c))) && (s = l);
  });
  const a = n.reduce((l, c) => {
    const u = Fk(q.cssPrefix, c);
    if (Qr[c] ? (c = Dk[s].includes(c) ? pk[s][c] : c, i = c, l.prefix = c) : Lk[s].indexOf(c) > -1 ? (i = c, l.prefix = yl(c, {
      family: s
    })) : u ? l.iconName = u : c !== q.replacementClass && !o.some((f) => c === r[f]) && l.rest.push(c), !t && l.prefix && l.iconName) {
      const f = i === "fa" ? Oy(l.iconName) : {}, d = vr(l.prefix, l.iconName);
      f.prefix && (i = null), l.iconName = f.iconName || d || l.iconName, l.prefix = f.prefix || l.prefix, l.prefix === "far" && !Qr.far && Qr.fas && !q.autoFetchSvg && (l.prefix = "fas");
    }
    return l;
  }, Of());
  return (n.includes("fa-brands") || n.includes("fab")) && (a.prefix = "fab"), (n.includes("fa-duotone") || n.includes("fad")) && (a.prefix = "fad"), !a.prefix && s === Bt && (Qr.fass || q.autoFetchSvg) && (a.prefix = "fass", a.iconName = vr(a.prefix, a.iconName) || a.iconName), !a.prefix && s === jt && (Qr.fasds || q.autoFetchSvg) && (a.prefix = "fasds", a.iconName = vr(a.prefix, a.iconName) || a.iconName), (a.prefix === "fa" || i === "fa") && (a.prefix = Pr() || "fas"), a;
}
class Vk {
  constructor() {
    this.definitions = {};
  }
  add() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    const i = t.reduce(this._pullDefinitions, {});
    Object.keys(i).forEach((s) => {
      this.definitions[s] = {
        ...this.definitions[s] || {},
        ...i[s]
      }, ou(s, i[s]);
      const o = ai[Ve][s];
      o && ou(o, i[s]), Ty();
    });
  }
  reset() {
    this.definitions = {};
  }
  _pullDefinitions(e, t) {
    const r = t.prefix && t.iconName && t.icon ? {
      0: t
    } : t;
    return Object.keys(r).map((i) => {
      const {
        prefix: s,
        iconName: o,
        icon: a
      } = r[i], l = a[2];
      e[s] || (e[s] = {}), l.length > 0 && l.forEach((c) => {
        typeof c == "string" && (e[s][c] = a);
      }), e[s][o] = a;
    }), e;
  }
}
let kh = [], zi = {};
const Ui = {}, zk = Object.keys(Ui);
function Hk(n, e) {
  let {
    mixoutsTo: t
  } = e;
  return kh = n, zi = {}, Object.keys(Ui).forEach((r) => {
    zk.indexOf(r) === -1 && delete Ui[r];
  }), kh.forEach((r) => {
    const i = r.mixout ? r.mixout() : {};
    if (Object.keys(i).forEach((s) => {
      typeof i[s] == "function" && (t[s] = i[s]), typeof i[s] == "object" && Object.keys(i[s]).forEach((o) => {
        t[s] || (t[s] = {}), t[s][o] = i[s][o];
      });
    }), r.hooks) {
      const s = r.hooks();
      Object.keys(s).forEach((o) => {
        zi[o] || (zi[o] = []), zi[o].push(s[o]);
      });
    }
    r.provides && r.provides(Ui);
  }), t;
}
function au(n, e) {
  for (var t = arguments.length, r = new Array(t > 2 ? t - 2 : 0), i = 2; i < t; i++)
    r[i - 2] = arguments[i];
  return (zi[n] || []).forEach((o) => {
    e = o.apply(null, [e, ...r]);
  }), e;
}
function gi(n) {
  for (var e = arguments.length, t = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
    t[r - 1] = arguments[r];
  (zi[n] || []).forEach((s) => {
    s.apply(null, t);
  });
}
function Ir() {
  const n = arguments[0], e = Array.prototype.slice.call(arguments, 1);
  return Ui[n] ? Ui[n].apply(null, e) : void 0;
}
function lu(n) {
  n.prefix === "fa" && (n.prefix = "fas");
  let {
    iconName: e
  } = n;
  const t = n.prefix || Pr();
  if (e)
    return e = vr(t, e) || e, Sh(Ey.definitions, t, e) || Sh(Pn.styles, t, e);
}
const Ey = new Vk(), Gk = () => {
  q.autoReplaceSvg = !1, q.observeMutations = !1, gi("noAuto");
}, Wk = {
  i2svg: function() {
    let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return sr ? (gi("beforeI2svg", n), Ir("pseudoElements2svg", n), Ir("i2svg", n)) : Promise.reject(new Error("Operation requires a DOM of some kind."));
  },
  watch: function() {
    let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const {
      autoReplaceSvgRoot: e
    } = n;
    q.autoReplaceSvg === !1 && (q.autoReplaceSvg = !0), q.observeMutations = !0, Ak(() => {
      Kk({
        autoReplaceSvgRoot: e
      }), gi("watch", n);
    });
  }
}, Uk = {
  icon: (n) => {
    if (n === null)
      return null;
    if (typeof n == "object" && n.prefix && n.iconName)
      return {
        prefix: n.prefix,
        iconName: vr(n.prefix, n.iconName) || n.iconName
      };
    if (Array.isArray(n) && n.length === 2) {
      const e = n[1].indexOf("fa-") === 0 ? n[1].slice(3) : n[1], t = yl(n[0]);
      return {
        prefix: t,
        iconName: vr(t, e) || e
      };
    }
    if (typeof n == "string" && (n.indexOf("".concat(q.cssPrefix, "-")) > -1 || n.match(mk))) {
      const e = vl(n.split(" "), {
        skipLookups: !0
      });
      return {
        prefix: e.prefix || Pr(),
        iconName: vr(e.prefix, e.iconName) || e.iconName
      };
    }
    if (typeof n == "string") {
      const e = Pr();
      return {
        prefix: e,
        iconName: vr(e, n) || n
      };
    }
  }
}, Ht = {
  noAuto: Gk,
  config: q,
  dom: Wk,
  parse: Uk,
  library: Ey,
  findIconDefinition: lu,
  toHtml: Lo
}, Kk = function() {
  let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    autoReplaceSvgRoot: e = $e
  } = n;
  (Object.keys(Pn.styles).length > 0 || q.autoFetchSvg) && sr && q.autoReplaceSvg && Ht.dom.i2svg({
    node: e
  });
};
function bl(n, e) {
  return Object.defineProperty(n, "abstract", {
    get: e
  }), Object.defineProperty(n, "html", {
    get: function() {
      return n.abstract.map((t) => Lo(t));
    }
  }), Object.defineProperty(n, "node", {
    get: function() {
      if (!sr) return;
      const t = $e.createElement("div");
      return t.innerHTML = n.html, t.children;
    }
  }), n;
}
function Yk(n) {
  let {
    children: e,
    main: t,
    mask: r,
    attributes: i,
    styles: s,
    transform: o
  } = n;
  if (xf(o) && t.found && !r.found) {
    const {
      width: a,
      height: l
    } = t, c = {
      x: a / l / 2,
      y: 0.5
    };
    i.style = gl({
      ...s,
      "transform-origin": "".concat(c.x + o.x / 16, "em ").concat(c.y + o.y / 16, "em")
    });
  }
  return [{
    tag: "svg",
    attributes: i,
    children: e
  }];
}
function qk(n) {
  let {
    prefix: e,
    iconName: t,
    children: r,
    attributes: i,
    symbol: s
  } = n;
  const o = s === !0 ? "".concat(e, "-").concat(q.cssPrefix, "-").concat(t) : s;
  return [{
    tag: "svg",
    attributes: {
      style: "display: none;"
    },
    children: [{
      tag: "symbol",
      attributes: {
        ...i,
        id: o
      },
      children: r
    }]
  }];
}
function Ef(n) {
  const {
    icons: {
      main: e,
      mask: t
    },
    prefix: r,
    iconName: i,
    transform: s,
    symbol: o,
    title: a,
    maskId: l,
    titleId: c,
    extra: u,
    watchable: f = !1
  } = n, {
    width: d,
    height: p
  } = t.found ? t : e, h = r === "fak", m = [q.replacementClass, i ? "".concat(q.cssPrefix, "-").concat(i) : ""].filter((k) => u.classes.indexOf(k) === -1).filter((k) => k !== "" || !!k).concat(u.classes).join(" ");
  let g = {
    children: [],
    attributes: {
      ...u.attributes,
      "data-prefix": r,
      "data-icon": i,
      class: m,
      role: u.attributes.role || "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 ".concat(d, " ").concat(p)
    }
  };
  const v = h && !~u.classes.indexOf("fa-fw") ? {
    width: "".concat(d / p * 16 * 0.0625, "em")
  } : {};
  f && (g.attributes[mi] = ""), a && (g.children.push({
    tag: "title",
    attributes: {
      id: g.attributes["aria-labelledby"] || "title-".concat(c || po())
    },
    children: [a]
  }), delete g.attributes.title);
  const w = {
    ...g,
    prefix: r,
    iconName: i,
    main: e,
    mask: t,
    maskId: l,
    transform: s,
    symbol: o,
    styles: {
      ...v,
      ...u.styles
    }
  }, {
    children: b,
    attributes: y
  } = t.found && e.found ? Ir("generateAbstractMask", w) || {
    children: [],
    attributes: {}
  } : Ir("generateAbstractIcon", w) || {
    children: [],
    attributes: {}
  };
  return w.children = b, w.attributes = y, o ? qk(w) : Yk(w);
}
function Th(n) {
  const {
    content: e,
    width: t,
    height: r,
    transform: i,
    title: s,
    extra: o,
    watchable: a = !1
  } = n, l = {
    ...o.attributes,
    ...s ? {
      title: s
    } : {},
    class: o.classes.join(" ")
  };
  a && (l[mi] = "");
  const c = {
    ...o.styles
  };
  xf(i) && (c.transform = Ok({
    transform: i,
    startCentered: !0,
    width: t,
    height: r
  }), c["-webkit-transform"] = c.transform);
  const u = gl(c);
  u.length > 0 && (l.style = u);
  const f = [];
  return f.push({
    tag: "span",
    attributes: l,
    children: [e]
  }), s && f.push({
    tag: "span",
    attributes: {
      class: "sr-only"
    },
    children: [s]
  }), f;
}
function Xk(n) {
  const {
    content: e,
    title: t,
    extra: r
  } = n, i = {
    ...r.attributes,
    ...t ? {
      title: t
    } : {},
    class: r.classes.join(" ")
  }, s = gl(r.styles);
  s.length > 0 && (i.style = s);
  const o = [];
  return o.push({
    tag: "span",
    attributes: i,
    children: [e]
  }), t && o.push({
    tag: "span",
    attributes: {
      class: "sr-only"
    },
    children: [t]
  }), o;
}
const {
  styles: uc
} = Pn;
function cu(n) {
  const e = n[0], t = n[1], [r] = n.slice(4);
  let i = null;
  return Array.isArray(r) ? i = {
    tag: "g",
    attributes: {
      class: "".concat(q.cssPrefix, "-").concat(ac.GROUP)
    },
    children: [{
      tag: "path",
      attributes: {
        class: "".concat(q.cssPrefix, "-").concat(ac.SECONDARY),
        fill: "currentColor",
        d: r[0]
      }
    }, {
      tag: "path",
      attributes: {
        class: "".concat(q.cssPrefix, "-").concat(ac.PRIMARY),
        fill: "currentColor",
        d: r[1]
      }
    }]
  } : i = {
    tag: "path",
    attributes: {
      fill: "currentColor",
      d: r
    }
  }, {
    found: !0,
    width: e,
    height: t,
    icon: i
  };
}
const Jk = {
  found: !1,
  width: 512,
  height: 512
};
function Qk(n, e) {
  !dy && !q.showMissingIcons && n && console.error('Icon with name "'.concat(n, '" and prefix "').concat(e, '" is missing.'));
}
function uu(n, e) {
  let t = e;
  return e === "fa" && q.styleDefault !== null && (e = Pr()), new Promise((r, i) => {
    if (t === "fa") {
      const s = Oy(n) || {};
      n = s.iconName || n, e = s.prefix || e;
    }
    if (n && e && uc[e] && uc[e][n]) {
      const s = uc[e][n];
      return r(cu(s));
    }
    Qk(n, e), r({
      ...Jk,
      icon: q.showMissingIcons && n ? Ir("missingIconAbstract") || {} : {}
    });
  });
}
const Oh = () => {
}, fu = q.measurePerformance && la && la.mark && la.measure ? la : {
  mark: Oh,
  measure: Oh
}, zs = 'FA "6.6.0"', Zk = (n) => (fu.mark("".concat(zs, " ").concat(n, " begins")), () => My(n)), My = (n) => {
  fu.mark("".concat(zs, " ").concat(n, " ends")), fu.measure("".concat(zs, " ").concat(n), "".concat(zs, " ").concat(n, " begins"), "".concat(zs, " ").concat(n, " ends"));
};
var Mf = {
  begin: Zk,
  end: My
};
const Ta = () => {
};
function Eh(n) {
  return typeof (n.getAttribute ? n.getAttribute(mi) : null) == "string";
}
function eT(n) {
  const e = n.getAttribute ? n.getAttribute(Cf) : null, t = n.getAttribute ? n.getAttribute(_f) : null;
  return e && t;
}
function tT(n) {
  return n && n.classList && n.classList.contains && n.classList.contains(q.replacementClass);
}
function nT() {
  return q.autoReplaceSvg === !0 ? Oa.replace : Oa[q.autoReplaceSvg] || Oa.replace;
}
function rT(n) {
  return $e.createElementNS("http://www.w3.org/2000/svg", n);
}
function iT(n) {
  return $e.createElement(n);
}
function Ay(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    ceFn: t = n.tag === "svg" ? rT : iT
  } = e;
  if (typeof n == "string")
    return $e.createTextNode(n);
  const r = t(n.tag);
  return Object.keys(n.attributes || []).forEach(function(s) {
    r.setAttribute(s, n.attributes[s]);
  }), (n.children || []).forEach(function(s) {
    r.appendChild(Ay(s, {
      ceFn: t
    }));
  }), r;
}
function sT(n) {
  let e = " ".concat(n.outerHTML, " ");
  return e = "".concat(e, "Font Awesome fontawesome.com "), e;
}
const Oa = {
  replace: function(n) {
    const e = n[0];
    if (e.parentNode)
      if (n[1].forEach((t) => {
        e.parentNode.insertBefore(Ay(t), e);
      }), e.getAttribute(mi) === null && q.keepOriginalSource) {
        let t = $e.createComment(sT(e));
        e.parentNode.replaceChild(t, e);
      } else
        e.remove();
  },
  nest: function(n) {
    const e = n[0], t = n[1];
    if (~Sf(e).indexOf(q.replacementClass))
      return Oa.replace(n);
    const r = new RegExp("".concat(q.cssPrefix, "-.*"));
    if (delete t[0].attributes.id, t[0].attributes.class) {
      const s = t[0].attributes.class.split(" ").reduce((o, a) => (a === q.replacementClass || a.match(r) ? o.toSvg.push(a) : o.toNode.push(a), o), {
        toNode: [],
        toSvg: []
      });
      t[0].attributes.class = s.toSvg.join(" "), s.toNode.length === 0 ? e.removeAttribute("class") : e.setAttribute("class", s.toNode.join(" "));
    }
    const i = t.map((s) => Lo(s)).join(`
`);
    e.setAttribute(mi, ""), e.innerHTML = i;
  }
};
function Mh(n) {
  n();
}
function Ny(n, e) {
  const t = typeof e == "function" ? e : Ta;
  if (n.length === 0)
    t();
  else {
    let r = Mh;
    q.mutateApproach === dk && (r = Nr.requestAnimationFrame || Mh), r(() => {
      const i = nT(), s = Mf.begin("mutate");
      n.map(i), s(), t();
    });
  }
}
let Af = !1;
function Py() {
  Af = !0;
}
function du() {
  Af = !1;
}
let Fa = null;
function Ah(n) {
  if (!vh || !q.observeMutations)
    return;
  const {
    treeCallback: e = Ta,
    nodeCallback: t = Ta,
    pseudoElementsCallback: r = Ta,
    observeMutationsRoot: i = $e
  } = n;
  Fa = new vh((s) => {
    if (Af) return;
    const o = Pr();
    Cs(s).forEach((a) => {
      if (a.type === "childList" && a.addedNodes.length > 0 && !Eh(a.addedNodes[0]) && (q.searchPseudoElements && r(a.target), e(a.target)), a.type === "attributes" && a.target.parentNode && q.searchPseudoElements && r(a.target.parentNode), a.type === "attributes" && Eh(a.target) && ~vk.indexOf(a.attributeName))
        if (a.attributeName === "class" && eT(a.target)) {
          const {
            prefix: l,
            iconName: c
          } = vl(Sf(a.target));
          a.target.setAttribute(Cf, l || o), c && a.target.setAttribute(_f, c);
        } else tT(a.target) && t(a.target);
    });
  }), sr && Fa.observe(i, {
    childList: !0,
    attributes: !0,
    characterData: !0,
    subtree: !0
  });
}
function oT() {
  Fa && Fa.disconnect();
}
function aT(n) {
  const e = n.getAttribute("style");
  let t = [];
  return e && (t = e.split(";").reduce((r, i) => {
    const s = i.split(":"), o = s[0], a = s.slice(1);
    return o && a.length > 0 && (r[o] = a.join(":").trim()), r;
  }, {})), t;
}
function lT(n) {
  const e = n.getAttribute("data-prefix"), t = n.getAttribute("data-icon"), r = n.innerText !== void 0 ? n.innerText.trim() : "";
  let i = vl(Sf(n));
  return i.prefix || (i.prefix = Pr()), e && t && (i.prefix = e, i.iconName = t), i.iconName && i.prefix || (i.prefix && r.length > 0 && (i.iconName = $k(i.prefix, n.innerText) || Tf(i.prefix, su(n.innerText))), !i.iconName && q.autoFetchSvg && n.firstChild && n.firstChild.nodeType === Node.TEXT_NODE && (i.iconName = n.firstChild.data)), i;
}
function cT(n) {
  const e = Cs(n.attributes).reduce((i, s) => (i.name !== "class" && i.name !== "style" && (i[s.name] = s.value), i), {}), t = n.getAttribute("title"), r = n.getAttribute("data-fa-title-id");
  return q.autoA11y && (t ? e["aria-labelledby"] = "".concat(q.replacementClass, "-title-").concat(r || po()) : (e["aria-hidden"] = "true", e.focusable = "false")), e;
}
function uT() {
  return {
    iconName: null,
    title: null,
    titleId: null,
    prefix: null,
    transform: Nn,
    symbol: !1,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    extra: {
      classes: [],
      styles: {},
      attributes: {}
    }
  };
}
function Nh(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    styleParser: !0
  };
  const {
    iconName: t,
    prefix: r,
    rest: i
  } = lT(n), s = cT(n), o = au("parseNodeAttributes", {}, n);
  let a = e.styleParser ? aT(n) : [];
  return {
    iconName: t,
    title: n.getAttribute("title"),
    titleId: n.getAttribute("data-fa-title-id"),
    prefix: r,
    transform: Nn,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    symbol: !1,
    extra: {
      classes: i,
      styles: a,
      attributes: s
    },
    ...o
  };
}
const {
  styles: fT
} = Pn;
function Iy(n) {
  const e = q.autoReplaceSvg === "nest" ? Nh(n, {
    styleParser: !1
  }) : Nh(n);
  return ~e.extra.classes.indexOf(my) ? Ir("generateLayersText", n, e) : Ir("generateSvgReplacementMutation", n, e);
}
let $n = /* @__PURE__ */ new Set();
hy.map((n) => {
  $n.add("fa-".concat(n));
});
Object.keys(oi[Ve]).map($n.add.bind($n));
Object.keys(oi[Bt]).map($n.add.bind($n));
Object.keys(oi[jt]).map($n.add.bind($n));
$n = [...$n];
function Ph(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  if (!sr) return Promise.resolve();
  const t = $e.documentElement.classList, r = (u) => t.add("".concat(Ch, "-").concat(u)), i = (u) => t.remove("".concat(Ch, "-").concat(u)), s = q.autoFetchSvg ? $n : hy.map((u) => "fa-".concat(u)).concat(Object.keys(fT));
  s.includes("fa") || s.push("fa");
  const o = [".".concat(my, ":not([").concat(mi, "])")].concat(s.map((u) => ".".concat(u, ":not([").concat(mi, "])"))).join(", ");
  if (o.length === 0)
    return Promise.resolve();
  let a = [];
  try {
    a = Cs(n.querySelectorAll(o));
  } catch {
  }
  if (a.length > 0)
    r("pending"), i("complete");
  else
    return Promise.resolve();
  const l = Mf.begin("onTree"), c = a.reduce((u, f) => {
    try {
      const d = Iy(f);
      d && u.push(d);
    } catch (d) {
      dy || d.name === "MissingIcon" && console.error(d);
    }
    return u;
  }, []);
  return new Promise((u, f) => {
    Promise.all(c).then((d) => {
      Ny(d, () => {
        r("active"), r("complete"), i("pending"), typeof e == "function" && e(), l(), u();
      });
    }).catch((d) => {
      l(), f(d);
    });
  });
}
function dT(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  Iy(n).then((t) => {
    t && Ny([t], e);
  });
}
function hT(n) {
  return function(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const r = (e || {}).icon ? e : lu(e || {});
    let {
      mask: i
    } = t;
    return i && (i = (i || {}).icon ? i : lu(i || {})), n(r, {
      ...t,
      mask: i
    });
  };
}
const pT = function(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    transform: t = Nn,
    symbol: r = !1,
    mask: i = null,
    maskId: s = null,
    title: o = null,
    titleId: a = null,
    classes: l = [],
    attributes: c = {},
    styles: u = {}
  } = e;
  if (!n) return;
  const {
    prefix: f,
    iconName: d,
    icon: p
  } = n;
  return bl({
    type: "icon",
    ...n
  }, () => (gi("beforeDOMElementCreation", {
    iconDefinition: n,
    params: e
  }), q.autoA11y && (o ? c["aria-labelledby"] = "".concat(q.replacementClass, "-title-").concat(a || po()) : (c["aria-hidden"] = "true", c.focusable = "false")), Ef({
    icons: {
      main: cu(p),
      mask: i ? cu(i.icon) : {
        found: !1,
        width: null,
        height: null,
        icon: {}
      }
    },
    prefix: f,
    iconName: d,
    transform: {
      ...Nn,
      ...t
    },
    symbol: r,
    title: o,
    maskId: s,
    titleId: a,
    extra: {
      attributes: c,
      styles: u,
      classes: l
    }
  })));
};
var mT = {
  mixout() {
    return {
      icon: hT(pT)
    };
  },
  hooks() {
    return {
      mutationObserverCallbacks(n) {
        return n.treeCallback = Ph, n.nodeCallback = dT, n;
      }
    };
  },
  provides(n) {
    n.i2svg = function(e) {
      const {
        node: t = $e,
        callback: r = () => {
        }
      } = e;
      return Ph(t, r);
    }, n.generateSvgReplacementMutation = function(e, t) {
      const {
        iconName: r,
        title: i,
        titleId: s,
        prefix: o,
        transform: a,
        symbol: l,
        mask: c,
        maskId: u,
        extra: f
      } = t;
      return new Promise((d, p) => {
        Promise.all([uu(r, o), c.iconName ? uu(c.iconName, c.prefix) : Promise.resolve({
          found: !1,
          width: 512,
          height: 512,
          icon: {}
        })]).then((h) => {
          let [m, g] = h;
          d([e, Ef({
            icons: {
              main: m,
              mask: g
            },
            prefix: o,
            iconName: r,
            transform: a,
            symbol: l,
            maskId: u,
            title: i,
            titleId: s,
            extra: f,
            watchable: !0
          })]);
        }).catch(p);
      });
    }, n.generateAbstractIcon = function(e) {
      let {
        children: t,
        attributes: r,
        main: i,
        transform: s,
        styles: o
      } = e;
      const a = gl(o);
      a.length > 0 && (r.style = a);
      let l;
      return xf(s) && (l = Ir("generateAbstractTransformGrouping", {
        main: i,
        transform: s,
        containerWidth: i.width,
        iconWidth: i.width
      })), t.push(l || i.icon), {
        children: t,
        attributes: r
      };
    };
  }
}, gT = {
  mixout() {
    return {
      layer(n) {
        let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const {
          classes: t = []
        } = e;
        return bl({
          type: "layer"
        }, () => {
          gi("beforeDOMElementCreation", {
            assembler: n,
            params: e
          });
          let r = [];
          return n((i) => {
            Array.isArray(i) ? i.map((s) => {
              r = r.concat(s.abstract);
            }) : r = r.concat(i.abstract);
          }), [{
            tag: "span",
            attributes: {
              class: ["".concat(q.cssPrefix, "-layers"), ...t].join(" ")
            },
            children: r
          }];
        });
      }
    };
  }
}, yT = {
  mixout() {
    return {
      counter(n) {
        let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const {
          title: t = null,
          classes: r = [],
          attributes: i = {},
          styles: s = {}
        } = e;
        return bl({
          type: "counter",
          content: n
        }, () => (gi("beforeDOMElementCreation", {
          content: n,
          params: e
        }), Xk({
          content: n.toString(),
          title: t,
          extra: {
            attributes: i,
            styles: s,
            classes: ["".concat(q.cssPrefix, "-layers-counter"), ...r]
          }
        })));
      }
    };
  }
}, vT = {
  mixout() {
    return {
      text(n) {
        let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const {
          transform: t = Nn,
          title: r = null,
          classes: i = [],
          attributes: s = {},
          styles: o = {}
        } = e;
        return bl({
          type: "text",
          content: n
        }, () => (gi("beforeDOMElementCreation", {
          content: n,
          params: e
        }), Th({
          content: n,
          transform: {
            ...Nn,
            ...t
          },
          title: r,
          extra: {
            attributes: s,
            styles: o,
            classes: ["".concat(q.cssPrefix, "-layers-text"), ...i]
          }
        })));
      }
    };
  },
  provides(n) {
    n.generateLayersText = function(e, t) {
      const {
        title: r,
        transform: i,
        extra: s
      } = t;
      let o = null, a = null;
      if (oy) {
        const l = parseInt(getComputedStyle(e).fontSize, 10), c = e.getBoundingClientRect();
        o = c.width / l, a = c.height / l;
      }
      return q.autoA11y && !r && (s.attributes["aria-hidden"] = "true"), Promise.resolve([e, Th({
        content: e.innerHTML,
        width: o,
        height: a,
        transform: i,
        title: r,
        extra: s,
        watchable: !0
      })]);
    };
  }
};
const bT = new RegExp('"', "ug"), Ih = [1105920, 1112319], Dh = {
  FontAwesome: {
    normal: "fas",
    400: "fas"
  },
  ...ek,
  ...Zx,
  ...lk
}, hu = Object.keys(Dh).reduce((n, e) => (n[e.toLowerCase()] = Dh[e], n), {}), wT = Object.keys(hu).reduce((n, e) => {
  const t = hu[e];
  return n[e] = t[900] || [...Object.entries(t)][0][1], n;
}, {});
function CT(n) {
  const e = n.replace(bT, ""), t = Pk(e, 0), r = t >= Ih[0] && t <= Ih[1], i = e.length === 2 ? e[0] === e[1] : !1;
  return {
    value: su(i ? e[0] : e),
    isSecondary: r || i
  };
}
function _T(n, e) {
  const t = n.replace(/^['"]|['"]$/g, "").toLowerCase(), r = parseInt(e), i = isNaN(r) ? "normal" : r;
  return (hu[t] || {})[i] || wT[t];
}
function Lh(n, e) {
  const t = "".concat(fk).concat(e.replace(":", "-"));
  return new Promise((r, i) => {
    if (n.getAttribute(t) !== null)
      return r();
    const o = Cs(n.children).filter((d) => d.getAttribute(tu) === e)[0], a = Nr.getComputedStyle(n, e), l = a.getPropertyValue("font-family"), c = l.match(gk), u = a.getPropertyValue("font-weight"), f = a.getPropertyValue("content");
    if (o && !c)
      return n.removeChild(o), r();
    if (c && f !== "none" && f !== "") {
      const d = a.getPropertyValue("content");
      let p = _T(l, u);
      const {
        value: h,
        isSecondary: m
      } = CT(d), g = c[0].startsWith("FontAwesome");
      let v = Tf(p, h), w = v;
      if (g) {
        const b = Bk(h);
        b.iconName && b.prefix && (v = b.iconName, p = b.prefix);
      }
      if (v && !m && (!o || o.getAttribute(Cf) !== p || o.getAttribute(_f) !== w)) {
        n.setAttribute(t, w), o && n.removeChild(o);
        const b = uT(), {
          extra: y
        } = b;
        y.attributes[tu] = e, uu(v, p).then((k) => {
          const C = Ef({
            ...b,
            icons: {
              main: k,
              mask: Of()
            },
            prefix: p,
            iconName: w,
            extra: y,
            watchable: !0
          }), S = $e.createElementNS("http://www.w3.org/2000/svg", "svg");
          e === "::before" ? n.insertBefore(S, n.firstChild) : n.appendChild(S), S.outerHTML = C.map((O) => Lo(O)).join(`
`), n.removeAttribute(t), r();
        }).catch(i);
      } else
        r();
    } else
      r();
  });
}
function ST(n) {
  return Promise.all([Lh(n, "::before"), Lh(n, "::after")]);
}
function xT(n) {
  return n.parentNode !== document.head && !~hk.indexOf(n.tagName.toUpperCase()) && !n.getAttribute(tu) && (!n.parentNode || n.parentNode.tagName !== "svg");
}
function Rh(n) {
  if (sr)
    return new Promise((e, t) => {
      const r = Cs(n.querySelectorAll("*")).filter(xT).map(ST), i = Mf.begin("searchPseudoElements");
      Py(), Promise.all(r).then(() => {
        i(), du(), e();
      }).catch(() => {
        i(), du(), t();
      });
    });
}
var kT = {
  hooks() {
    return {
      mutationObserverCallbacks(n) {
        return n.pseudoElementsCallback = Rh, n;
      }
    };
  },
  provides(n) {
    n.pseudoElements2svg = function(e) {
      const {
        node: t = $e
      } = e;
      q.searchPseudoElements && Rh(t);
    };
  }
};
let Fh = !1;
var TT = {
  mixout() {
    return {
      dom: {
        unwatch() {
          Py(), Fh = !0;
        }
      }
    };
  },
  hooks() {
    return {
      bootstrap() {
        Ah(au("mutationObserverCallbacks", {}));
      },
      noAuto() {
        oT();
      },
      watch(n) {
        const {
          observeMutationsRoot: e
        } = n;
        Fh ? du() : Ah(au("mutationObserverCallbacks", {
          observeMutationsRoot: e
        }));
      }
    };
  }
};
const $h = (n) => {
  let e = {
    size: 16,
    x: 0,
    y: 0,
    flipX: !1,
    flipY: !1,
    rotate: 0
  };
  return n.toLowerCase().split(" ").reduce((t, r) => {
    const i = r.toLowerCase().split("-"), s = i[0];
    let o = i.slice(1).join("-");
    if (s && o === "h")
      return t.flipX = !0, t;
    if (s && o === "v")
      return t.flipY = !0, t;
    if (o = parseFloat(o), isNaN(o))
      return t;
    switch (s) {
      case "grow":
        t.size = t.size + o;
        break;
      case "shrink":
        t.size = t.size - o;
        break;
      case "left":
        t.x = t.x - o;
        break;
      case "right":
        t.x = t.x + o;
        break;
      case "up":
        t.y = t.y - o;
        break;
      case "down":
        t.y = t.y + o;
        break;
      case "rotate":
        t.rotate = t.rotate + o;
        break;
    }
    return t;
  }, e);
};
var OT = {
  mixout() {
    return {
      parse: {
        transform: (n) => $h(n)
      }
    };
  },
  hooks() {
    return {
      parseNodeAttributes(n, e) {
        const t = e.getAttribute("data-fa-transform");
        return t && (n.transform = $h(t)), n;
      }
    };
  },
  provides(n) {
    n.generateAbstractTransformGrouping = function(e) {
      let {
        main: t,
        transform: r,
        containerWidth: i,
        iconWidth: s
      } = e;
      const o = {
        transform: "translate(".concat(i / 2, " 256)")
      }, a = "translate(".concat(r.x * 32, ", ").concat(r.y * 32, ") "), l = "scale(".concat(r.size / 16 * (r.flipX ? -1 : 1), ", ").concat(r.size / 16 * (r.flipY ? -1 : 1), ") "), c = "rotate(".concat(r.rotate, " 0 0)"), u = {
        transform: "".concat(a, " ").concat(l, " ").concat(c)
      }, f = {
        transform: "translate(".concat(s / 2 * -1, " -256)")
      }, d = {
        outer: o,
        inner: u,
        path: f
      };
      return {
        tag: "g",
        attributes: {
          ...d.outer
        },
        children: [{
          tag: "g",
          attributes: {
            ...d.inner
          },
          children: [{
            tag: t.icon.tag,
            children: t.icon.children,
            attributes: {
              ...t.icon.attributes,
              ...d.path
            }
          }]
        }]
      };
    };
  }
};
const fc = {
  x: 0,
  y: 0,
  width: "100%",
  height: "100%"
};
function Bh(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return n.attributes && (n.attributes.fill || e) && (n.attributes.fill = "black"), n;
}
function ET(n) {
  return n.tag === "g" ? n.children : [n];
}
var MT = {
  hooks() {
    return {
      parseNodeAttributes(n, e) {
        const t = e.getAttribute("data-fa-mask"), r = t ? vl(t.split(" ").map((i) => i.trim())) : Of();
        return r.prefix || (r.prefix = Pr()), n.mask = r, n.maskId = e.getAttribute("data-fa-mask-id"), n;
      }
    };
  },
  provides(n) {
    n.generateAbstractMask = function(e) {
      let {
        children: t,
        attributes: r,
        main: i,
        mask: s,
        maskId: o,
        transform: a
      } = e;
      const {
        width: l,
        icon: c
      } = i, {
        width: u,
        icon: f
      } = s, d = Tk({
        transform: a,
        containerWidth: u,
        iconWidth: l
      }), p = {
        tag: "rect",
        attributes: {
          ...fc,
          fill: "white"
        }
      }, h = c.children ? {
        children: c.children.map(Bh)
      } : {}, m = {
        tag: "g",
        attributes: {
          ...d.inner
        },
        children: [Bh({
          tag: c.tag,
          attributes: {
            ...c.attributes,
            ...d.path
          },
          ...h
        })]
      }, g = {
        tag: "g",
        attributes: {
          ...d.outer
        },
        children: [m]
      }, v = "mask-".concat(o || po()), w = "clip-".concat(o || po()), b = {
        tag: "mask",
        attributes: {
          ...fc,
          id: v,
          maskUnits: "userSpaceOnUse",
          maskContentUnits: "userSpaceOnUse"
        },
        children: [p, g]
      }, y = {
        tag: "defs",
        children: [{
          tag: "clipPath",
          attributes: {
            id: w
          },
          children: ET(f)
        }, b]
      };
      return t.push(y, {
        tag: "rect",
        attributes: {
          fill: "currentColor",
          "clip-path": "url(#".concat(w, ")"),
          mask: "url(#".concat(v, ")"),
          ...fc
        }
      }), {
        children: t,
        attributes: r
      };
    };
  }
}, AT = {
  provides(n) {
    let e = !1;
    Nr.matchMedia && (e = Nr.matchMedia("(prefers-reduced-motion: reduce)").matches), n.missingIconAbstract = function() {
      const t = [], r = {
        fill: "currentColor"
      }, i = {
        attributeType: "XML",
        repeatCount: "indefinite",
        dur: "2s"
      };
      t.push({
        tag: "path",
        attributes: {
          ...r,
          d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
        }
      });
      const s = {
        ...i,
        attributeName: "opacity"
      }, o = {
        tag: "circle",
        attributes: {
          ...r,
          cx: "256",
          cy: "364",
          r: "28"
        },
        children: []
      };
      return e || o.children.push({
        tag: "animate",
        attributes: {
          ...i,
          attributeName: "r",
          values: "28;14;28;28;14;28;"
        }
      }, {
        tag: "animate",
        attributes: {
          ...s,
          values: "1;0;1;1;0;1;"
        }
      }), t.push(o), t.push({
        tag: "path",
        attributes: {
          ...r,
          opacity: "1",
          d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
        },
        children: e ? [] : [{
          tag: "animate",
          attributes: {
            ...s,
            values: "1;0;0;0;0;1;"
          }
        }]
      }), e || t.push({
        tag: "path",
        attributes: {
          ...r,
          opacity: "0",
          d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
        },
        children: [{
          tag: "animate",
          attributes: {
            ...s,
            values: "0;0;1;1;0;0;"
          }
        }]
      }), {
        tag: "g",
        attributes: {
          class: "missing"
        },
        children: t
      };
    };
  }
}, NT = {
  hooks() {
    return {
      parseNodeAttributes(n, e) {
        const t = e.getAttribute("data-fa-symbol"), r = t === null ? !1 : t === "" ? !0 : t;
        return n.symbol = r, n;
      }
    };
  }
}, PT = [Mk, mT, gT, yT, vT, kT, TT, OT, MT, AT, NT];
Hk(PT, {
  mixoutsTo: Ht
});
Ht.noAuto;
const Dy = Ht.config;
Ht.library;
Ht.dom;
const $a = Ht.parse;
Ht.findIconDefinition;
Ht.toHtml;
const IT = Ht.icon;
Ht.layer;
const DT = Ht.text;
Ht.counter;
function jh(n, e) {
  var t = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    e && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(n, i).enumerable;
    })), t.push.apply(t, r);
  }
  return t;
}
function pn(n) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? jh(Object(t), !0).forEach(function(r) {
      Nt(n, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : jh(Object(t)).forEach(function(r) {
      Object.defineProperty(n, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return n;
}
function LT(n, e) {
  if (typeof n != "object" || !n) return n;
  var t = n[Symbol.toPrimitive];
  if (t !== void 0) {
    var r = t.call(n, e || "default");
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(n);
}
function RT(n) {
  var e = LT(n, "string");
  return typeof e == "symbol" ? e : e + "";
}
function Ba(n) {
  "@babel/helpers - typeof";
  return Ba = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Ba(n);
}
function Nt(n, e, t) {
  return e = RT(e), e in n ? Object.defineProperty(n, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[e] = t, n;
}
function FT(n, e) {
  if (n == null) return {};
  var t = {};
  for (var r in n)
    if (Object.prototype.hasOwnProperty.call(n, r)) {
      if (e.indexOf(r) >= 0) continue;
      t[r] = n[r];
    }
  return t;
}
function $T(n, e) {
  if (n == null) return {};
  var t = FT(n, e), r, i;
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(n);
    for (i = 0; i < s.length; i++)
      r = s[i], !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(n, r) && (t[r] = n[r]);
  }
  return t;
}
function pu(n) {
  return BT(n) || jT(n) || VT(n) || zT();
}
function BT(n) {
  if (Array.isArray(n)) return mu(n);
}
function jT(n) {
  if (typeof Symbol < "u" && n[Symbol.iterator] != null || n["@@iterator"] != null) return Array.from(n);
}
function VT(n, e) {
  if (n) {
    if (typeof n == "string") return mu(n, e);
    var t = Object.prototype.toString.call(n).slice(8, -1);
    if (t === "Object" && n.constructor && (t = n.constructor.name), t === "Map" || t === "Set") return Array.from(n);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)) return mu(n, e);
  }
}
function mu(n, e) {
  (e == null || e > n.length) && (e = n.length);
  for (var t = 0, r = new Array(e); t < e; t++) r[t] = n[t];
  return r;
}
function zT() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var HT = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ly = { exports: {} };
(function(n) {
  (function(e) {
    var t = function(v, w, b) {
      if (!c(w) || f(w) || d(w) || p(w) || l(w))
        return w;
      var y, k = 0, C = 0;
      if (u(w))
        for (y = [], C = w.length; k < C; k++)
          y.push(t(v, w[k], b));
      else {
        y = {};
        for (var S in w)
          Object.prototype.hasOwnProperty.call(w, S) && (y[v(S, b)] = t(v, w[S], b));
      }
      return y;
    }, r = function(v, w) {
      w = w || {};
      var b = w.separator || "_", y = w.split || /(?=[A-Z])/;
      return v.split(y).join(b);
    }, i = function(v) {
      return h(v) ? v : (v = v.replace(/[\-_\s]+(.)?/g, function(w, b) {
        return b ? b.toUpperCase() : "";
      }), v.substr(0, 1).toLowerCase() + v.substr(1));
    }, s = function(v) {
      var w = i(v);
      return w.substr(0, 1).toUpperCase() + w.substr(1);
    }, o = function(v, w) {
      return r(v, w).toLowerCase();
    }, a = Object.prototype.toString, l = function(v) {
      return typeof v == "function";
    }, c = function(v) {
      return v === Object(v);
    }, u = function(v) {
      return a.call(v) == "[object Array]";
    }, f = function(v) {
      return a.call(v) == "[object Date]";
    }, d = function(v) {
      return a.call(v) == "[object RegExp]";
    }, p = function(v) {
      return a.call(v) == "[object Boolean]";
    }, h = function(v) {
      return v = v - 0, v === v;
    }, m = function(v, w) {
      var b = w && "process" in w ? w.process : w;
      return typeof b != "function" ? v : function(y, k) {
        return b(y, v, k);
      };
    }, g = {
      camelize: i,
      decamelize: o,
      pascalize: s,
      depascalize: o,
      camelizeKeys: function(v, w) {
        return t(m(i, w), v);
      },
      decamelizeKeys: function(v, w) {
        return t(m(o, w), v, w);
      },
      pascalizeKeys: function(v, w) {
        return t(m(s, w), v);
      },
      depascalizeKeys: function() {
        return this.decamelizeKeys.apply(this, arguments);
      }
    };
    n.exports ? n.exports = g : e.humps = g;
  })(HT);
})(Ly);
var GT = Ly.exports, WT = ["class", "style"];
function UT(n) {
  return n.split(";").map(function(e) {
    return e.trim();
  }).filter(function(e) {
    return e;
  }).reduce(function(e, t) {
    var r = t.indexOf(":"), i = GT.camelize(t.slice(0, r)), s = t.slice(r + 1).trim();
    return e[i] = s, e;
  }, {});
}
function KT(n) {
  return n.split(/\s+/).reduce(function(e, t) {
    return e[t] = !0, e;
  }, {});
}
function Nf(n) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (typeof n == "string")
    return n;
  var r = (n.children || []).map(function(l) {
    return Nf(l);
  }), i = Object.keys(n.attributes || {}).reduce(function(l, c) {
    var u = n.attributes[c];
    switch (c) {
      case "class":
        l.class = KT(u);
        break;
      case "style":
        l.style = UT(u);
        break;
      default:
        l.attrs[c] = u;
    }
    return l;
  }, {
    attrs: {},
    class: {},
    style: {}
  });
  t.class;
  var s = t.style, o = s === void 0 ? {} : s, a = $T(t, WT);
  return rr(n.tag, pn(pn(pn({}, e), {}, {
    class: i.class,
    style: pn(pn({}, i.style), o)
  }, i.attrs), a), r);
}
var Ry = !1;
try {
  Ry = !0;
} catch {
}
function YT() {
  if (!Ry && console && typeof console.error == "function") {
    var n;
    (n = console).error.apply(n, arguments);
  }
}
function Zs(n, e) {
  return Array.isArray(e) && e.length > 0 || !Array.isArray(e) && e ? Nt({}, n, e) : {};
}
function qT(n) {
  var e, t = (e = {
    "fa-spin": n.spin,
    "fa-pulse": n.pulse,
    "fa-fw": n.fixedWidth,
    "fa-border": n.border,
    "fa-li": n.listItem,
    "fa-inverse": n.inverse,
    "fa-flip": n.flip === !0,
    "fa-flip-horizontal": n.flip === "horizontal" || n.flip === "both",
    "fa-flip-vertical": n.flip === "vertical" || n.flip === "both"
  }, Nt(Nt(Nt(Nt(Nt(Nt(Nt(Nt(Nt(Nt(e, "fa-".concat(n.size), n.size !== null), "fa-rotate-".concat(n.rotation), n.rotation !== null), "fa-pull-".concat(n.pull), n.pull !== null), "fa-swap-opacity", n.swapOpacity), "fa-bounce", n.bounce), "fa-shake", n.shake), "fa-beat", n.beat), "fa-fade", n.fade), "fa-beat-fade", n.beatFade), "fa-flash", n.flash), Nt(Nt(e, "fa-spin-pulse", n.spinPulse), "fa-spin-reverse", n.spinReverse));
  return Object.keys(t).map(function(r) {
    return t[r] ? r : null;
  }).filter(function(r) {
    return r;
  });
}
function Vh(n) {
  if (n && Ba(n) === "object" && n.prefix && n.iconName && n.icon)
    return n;
  if ($a.icon)
    return $a.icon(n);
  if (n === null)
    return null;
  if (Ba(n) === "object" && n.prefix && n.iconName)
    return n;
  if (Array.isArray(n) && n.length === 2)
    return {
      prefix: n[0],
      iconName: n[1]
    };
  if (typeof n == "string")
    return {
      prefix: "fas",
      iconName: n
    };
}
var XT = he({
  name: "FontAwesomeIcon",
  props: {
    border: {
      type: Boolean,
      default: !1
    },
    fixedWidth: {
      type: Boolean,
      default: !1
    },
    flip: {
      type: [Boolean, String],
      default: !1,
      validator: function(e) {
        return [!0, !1, "horizontal", "vertical", "both"].indexOf(e) > -1;
      }
    },
    icon: {
      type: [Object, Array, String],
      required: !0
    },
    mask: {
      type: [Object, Array, String],
      default: null
    },
    maskId: {
      type: String,
      default: null
    },
    listItem: {
      type: Boolean,
      default: !1
    },
    pull: {
      type: String,
      default: null,
      validator: function(e) {
        return ["right", "left"].indexOf(e) > -1;
      }
    },
    pulse: {
      type: Boolean,
      default: !1
    },
    rotation: {
      type: [String, Number],
      default: null,
      validator: function(e) {
        return [90, 180, 270].indexOf(Number.parseInt(e, 10)) > -1;
      }
    },
    swapOpacity: {
      type: Boolean,
      default: !1
    },
    size: {
      type: String,
      default: null,
      validator: function(e) {
        return ["2xs", "xs", "sm", "lg", "xl", "2xl", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x"].indexOf(e) > -1;
      }
    },
    spin: {
      type: Boolean,
      default: !1
    },
    transform: {
      type: [String, Object],
      default: null
    },
    symbol: {
      type: [Boolean, String],
      default: !1
    },
    title: {
      type: String,
      default: null
    },
    titleId: {
      type: String,
      default: null
    },
    inverse: {
      type: Boolean,
      default: !1
    },
    bounce: {
      type: Boolean,
      default: !1
    },
    shake: {
      type: Boolean,
      default: !1
    },
    beat: {
      type: Boolean,
      default: !1
    },
    fade: {
      type: Boolean,
      default: !1
    },
    beatFade: {
      type: Boolean,
      default: !1
    },
    flash: {
      type: Boolean,
      default: !1
    },
    spinPulse: {
      type: Boolean,
      default: !1
    },
    spinReverse: {
      type: Boolean,
      default: !1
    }
  },
  setup: function(e, t) {
    var r = t.attrs, i = Ie(function() {
      return Vh(e.icon);
    }), s = Ie(function() {
      return Zs("classes", qT(e));
    }), o = Ie(function() {
      return Zs("transform", typeof e.transform == "string" ? $a.transform(e.transform) : e.transform);
    }), a = Ie(function() {
      return Zs("mask", Vh(e.mask));
    }), l = Ie(function() {
      return IT(i.value, pn(pn(pn(pn({}, s.value), o.value), a.value), {}, {
        symbol: e.symbol,
        title: e.title,
        titleId: e.titleId,
        maskId: e.maskId
      }));
    });
    Fn(l, function(u) {
      if (!u)
        return YT("Could not find one or more icon(s)", i.value, a.value);
    }, {
      immediate: !0
    });
    var c = Ie(function() {
      return l.value ? Nf(l.value.abstract[0], {}, r) : null;
    });
    return function() {
      return c.value;
    };
  }
});
he({
  name: "FontAwesomeLayers",
  props: {
    fixedWidth: {
      type: Boolean,
      default: !1
    }
  },
  setup: function(e, t) {
    var r = t.slots, i = Dy.familyPrefix, s = Ie(function() {
      return ["".concat(i, "-layers")].concat(pu(e.fixedWidth ? ["".concat(i, "-fw")] : []));
    });
    return function() {
      return rr("div", {
        class: s.value
      }, r.default ? r.default() : []);
    };
  }
});
he({
  name: "FontAwesomeLayersText",
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    transform: {
      type: [String, Object],
      default: null
    },
    counter: {
      type: Boolean,
      default: !1
    },
    position: {
      type: String,
      default: null,
      validator: function(e) {
        return ["bottom-left", "bottom-right", "top-left", "top-right"].indexOf(e) > -1;
      }
    }
  },
  setup: function(e, t) {
    var r = t.attrs, i = Dy.familyPrefix, s = Ie(function() {
      return Zs("classes", [].concat(pu(e.counter ? ["".concat(i, "-layers-counter")] : []), pu(e.position ? ["".concat(i, "-layers-").concat(e.position)] : [])));
    }), o = Ie(function() {
      return Zs("transform", typeof e.transform == "string" ? $a.transform(e.transform) : e.transform);
    }), a = Ie(function() {
      var c = DT(e.value.toString(), pn(pn({}, o.value), s.value)), u = c.abstract;
      return e.counter && (u[0].attributes.class = u[0].attributes.class.replace("fa-layers-text", "")), u[0];
    }), l = Ie(function() {
      return Nf(a.value, {}, r);
    });
    return function() {
      return l.value;
    };
  }
});
const JT = {
  prefix: "fas",
  iconName: "file-lines",
  icon: [384, 512, [128441, 128462, 61686, "file-alt", "file-text"], "f15c", "M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM112 256l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"]
}, QT = JT, ZT = {
  prefix: "fas",
  iconName: "bars",
  icon: [448, 512, ["navicon"], "f0c9", "M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"]
}, eO = {
  prefix: "fas",
  iconName: "square-plus",
  icon: [448, 512, [61846, "plus-square"], "f0fe", "M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM200 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"]
}, tO = eO, nO = {
  prefix: "fas",
  iconName: "rotate-left",
  icon: [512, 512, ["rotate-back", "rotate-backward", "undo-alt"], "f2ea", "M48.5 224L40 224c-13.3 0-24-10.7-24-24L16 72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8L48.5 224z"]
}, rO = {
  prefix: "fas",
  iconName: "arrow-right",
  icon: [448, 512, [8594], "f061", "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"]
}, iO = {
  prefix: "fas",
  iconName: "text-width",
  icon: [448, 512, [], "f035", "M64 128l0-32 128 0 0 128-16 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-16 0 0-128 128 0 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-48c0-26.5-21.5-48-48-48L224 32 48 32C21.5 32 0 53.5 0 80l0 48c0 17.7 14.3 32 32 32s32-14.3 32-32zM9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-32 192 0 0 32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 32-192 0 0-32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64z"]
}, sO = {
  prefix: "fas",
  iconName: "arrow-left",
  icon: [448, 512, [8592], "f060", "M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"]
}, oO = {
  prefix: "fas",
  iconName: "gear",
  icon: [512, 512, [9881, "cog"], "f013", "M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"]
}, aO = oO, lO = {
  prefix: "fas",
  iconName: "rotate-right",
  icon: [512, 512, ["redo-alt", "rotate-forward"], "f2f9", "M463.5 224l8.5 0c13.3 0 24-10.7 24-24l0-128c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8l119.5 0z"]
}, cO = {
  prefix: "fas",
  iconName: "arrow-down",
  icon: [384, 512, [8595], "f063", "M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"]
}, uO = {
  prefix: "fas",
  iconName: "magnifying-glass",
  icon: [512, 512, [128269, "search"], "f002", "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"]
}, fO = uO, dO = {
  prefix: "fas",
  iconName: "arrow-up",
  icon: [384, 512, [8593], "f062", "M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"]
}, hO = {
  prefix: "fas",
  iconName: "xmark",
  icon: [384, 512, [128473, 10005, 10006, 10060, 215, "close", "multiply", "remove", "times"], "f00d", "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"]
}, pO = hO, mO = {
  prefix: "fas",
  iconName: "map",
  icon: [576, 512, [128506, 62072], "f279", "M384 476.1L192 421.2l0-385.3L384 90.8l0 385.3zm32-1.2l0-386.5L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3l0 334.8c0 9.8-6 18.6-15.1 22.3L416 474.8zM15.1 95.1L160 37.2l0 386.5L32.9 474.5C17.1 480.8 0 469.2 0 452.2L0 117.4c0-9.8 6-18.6 15.1-22.3z"]
}, gO = {
  prefix: "fas",
  iconName: "clock-rotate-left",
  icon: [512, 512, ["history"], "f1da", "M75 75L41 41C25.9 25.9 0 36.6 0 57.9L0 168c0 13.3 10.7 24 24 24l110.1 0c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24l0 104c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65 0-94.1c0-13.3-10.7-24-24-24z"]
}, yO = gO, Ft = /* @__PURE__ */ he({
  __name: "BaseIcon",
  props: {
    icon: {
      type: String
    }
  },
  setup(n) {
    const e = {
      "fa-bars": ZT,
      "fa-text-width": iO,
      "fa-search": fO,
      "fa-history": yO,
      "fa-plus-square": tO,
      "fa-cog": aO,
      "fa-file-text": QT,
      "fa-rotate-left": nO,
      "fa-rotate-right": lO,
      "fa-map": mO,
      "fa-close": pO,
      "fa-arrow-left": sO,
      "fa-arrow-right": rO,
      "fa-arrow-down": cO,
      "fa-arrow-up": dO
    };
    return (t, r) => (I(), rt(E(XT), {
      icon: e[n.icon]
    }, null, 8, ["icon"]));
  }
}), vO = ["onClick"], bO = /* @__PURE__ */ he({
  __name: "AppFileMaps",
  setup(n) {
    const {
      mapFile: e,
      mapCurrentID: t,
      drawer: r,
      mapRemoved: i
    } = Qe(), s = e.mapFile(new pe()).ref(), o = t.id(new pe()).ref(), a = (l) => {
      confirm("Вы уверены?") && i.give(l);
    };
    return (l, c) => (I(), rt(bf, {
      direction: "rtl",
      name: "fileMaps"
    }, {
      header: H(() => c[0] || (c[0] = [
        z("h2", { class: "text-lg font-bold" }, " Карты в файле ", -1)
      ])),
      default: H(() => [
        z("div", null, [
          (I(!0), B(Ke, null, kt(E(s), (u, f) => (I(), B("div", {
            key: f,
            class: "flex items-center gap-2"
          }, [
            z("a", {
              href: "#",
              class: Ln({ "font-bold": E(o) === f }),
              onClick: ms((d) => {
                E(t).give(f), E(r).give("");
              }, ["prevent"])
            }, Z(u.settings.title), 11, vO),
            D(Ft, {
              onClick: (d) => a(f),
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
}), wO = { class: "AppMenuObject" }, CO = {
  key: 0,
  class: "AppMenuObject-Empty"
}, _O = {
  key: 1,
  class: "flex flex-col gap-1"
}, SO = ["onClick"], xO = ["innerHTML"], kO = /* @__PURE__ */ he({
  __name: "AppMenuObject",
  setup(n) {
    const {
      controlCombo: e,
      drawer: t,
      menu: r,
      stagePosition: i
    } = Qe(), { guest: s, patron: o } = zt(), a = r.menuObjects(new pe()).ref();
    return e.happened(
      "KeyM",
      o.create(s.create(() => {
        t.give("menu");
      }))
    ), (l, c) => (I(), rt(bf, {
      direction: "rtl",
      name: "menu"
    }, {
      default: H(() => [
        z("div", wO, [
          E(a).length ? (I(), B("div", _O, [
            (I(!0), B(Ke, null, kt(E(a), (u) => (I(), B("a", {
              key: u.id,
              class: "AppMenuObject-Item",
              href: "#",
              onClick: ms((f) => {
                E(i).give(u), E(t).give("");
              }, ["prevent"])
            }, [
              z("span", {
                innerHTML: u.additionalName ? u.additionalName : u.name
              }, null, 8, xO)
            ], 8, SO))), 128))
          ])) : (I(), B("div", CO, Z(l.$t("appMenuObject.noItems")), 1))
        ])
      ]),
      _: 1
    }));
  }
}), De = /* @__PURE__ */ he({
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
    return t.push(""), (r, i) => (I(), B("button", {
      type: "button",
      class: Ln(t)
    }, [
      nn(r.$slots, "default")
    ]));
  }
}), TO = {
  key: 0,
  title: "Назад",
  class: "absolute text-white left-0 top-0 -ml-5 flex justify-center items-center bg-primary/70 hover:bg-primary-second/70 cursor-pointer w-5"
}, OO = {
  key: 1,
  class: "BaseModal-Header"
}, EO = { class: "overflow-y-auto flex-grow" }, MO = {
  key: 2,
  class: "BaseModal-Footer"
}, Ti = /* @__PURE__ */ he({
  __name: "BaseModal",
  props: {
    name: {
      type: String,
      required: !0
    }
  },
  setup(n) {
    const { modal: e } = Qe(), t = n, r = e.isOpenedByName(t.name, new pe()).ref(), i = [], s = () => {
      e.give("");
    };
    return (o, a) => (I(), rt(Jm, { name: "fade" }, {
      default: H(() => [
        E(r) ? (I(), B("div", {
          key: 0,
          class: "absolute rounded-main overflow-y-auto flex justify-center items-center top-0 left-0 bg-black/10 z-20 h-full w-full",
          onClick: s
        }, [
          z("div", {
            class: "w-full relative flex flex-col max-w-[800px] max-h-[90%] bg-white p-3",
            onClick: a[0] || (a[0] = ms(() => {
            }, ["stop"]))
          }, [
            i.length > 1 ? (I(), B("div", TO, " < ")) : ge("", !0),
            z("div", {
              title: "Закрыть",
              class: "e2e-modal-close absolute text-white right-0 top-0 -mr-5 flex justify-center items-center bg-danger/70 hover:bg-danger-second/70 cursor-pointer w-5",
              onClick: s
            }, " × "),
            o.$slots.header ? (I(), B("div", OO, [
              nn(o.$slots, "header")
            ])) : ge("", !0),
            z("div", EO, [
              nn(o.$slots, "default")
            ]),
            o.$slots.footer ? (I(), B("div", MO, [
              nn(o.$slots, "footer")
            ])) : ge("", !0)
          ])
        ])) : ge("", !0)
      ]),
      _: 3
    }));
  }
}), AO = { class: "AppPresets" }, NO = { class: "flex flex-col gap-2" }, PO = { class: "text-md font-bold mb-1" }, IO = { class: "flex gap-2 flex-wrap items-end" }, DO = { class: "AppTypesParent-ItemTitle" }, LO = ["innerHTML"], RO = /* @__PURE__ */ he({
  __name: "AppPresets",
  setup(n) {
    const {
      svgMapTypeImage: e
    } = zt(), { mapType: t, settings: r } = Qe(), i = new pe();
    r.value(i);
    const s = Ie(
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
    return (o, a) => (I(), rt(Ti, { name: "presets" }, {
      default: H(() => [
        z("div", AO, [
          a[0] || (a[0] = z("div", { class: "text-md font-bold mb-2" }, "Общие", -1)),
          z("div", NO, [
            (I(!0), B(Ke, null, kt(s.value, (l, c) => (I(), B("div", { key: c }, [
              z("h3", PO, Z(c), 1),
              z("div", IO, [
                (I(!0), B(Ke, null, kt(l, (u) => (I(), B("div", {
                  key: u.preset.name,
                  class: "flex flex-col gap-2"
                }, [
                  z("div", DO, Z(u.preset.name), 1),
                  z("div", {
                    class: "AppTypesParent-ItemImage",
                    innerHTML: u.image,
                    style: An(`width:${u.preset.width}px;height:${u.preset.height}px`)
                  }, null, 12, LO),
                  D(De, {
                    class: "AppTypesParent-ItemButton e2e-add-preset-type",
                    type: "success",
                    size: "sm",
                    onClick: (f) => E(t).give({ name: u.preset.name, type: u.preset })
                  }, {
                    default: H(() => [
                      ye(Z(o.$t("general.addToMap")), 1)
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
});
/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Pf(n, e, t, r) {
  try {
    return r ? n(...r) : n();
  } catch (i) {
    $y(i, e, t);
  }
}
function Fy(n, e, t, r) {
  if (_r(n)) {
    const i = Pf(n, e, t, r);
    return i && mx(i) && i.catch((s) => {
      $y(s, e, t);
    }), i;
  }
  if (vn(n)) {
    const i = [];
    for (let s = 0; s < n.length; s++)
      i.push(Fy(n[s], e, t, r));
    return i;
  }
}
function $y(n, e, t, r = !0) {
  const i = e ? e.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: o } = e && e.appContext.config || cf;
  if (e) {
    let a = e.parent;
    const l = e.proxy, c = `https://vuejs.org/error-reference/#runtime-${t}`;
    for (; a; ) {
      const u = a.ec;
      if (u) {
        for (let f = 0; f < u.length; f++)
          if (u[f](n, l, c) === !1)
            return;
      }
      a = a.parent;
    }
    if (s) {
      mf(), Pf(s, null, 10, [
        n,
        l,
        c
      ]), gf();
      return;
    }
  }
  FO(n, t, i, r, o);
}
function FO(n, e, t, r = !0, i = !1) {
  if (i)
    throw n;
  console.error(n);
}
const Qt = [];
let Kn = -1;
const Ki = [];
let dr = null, Ri = 0;
const $O = /* @__PURE__ */ Promise.resolve();
let gu = null;
function BO(n) {
  let e = Kn + 1, t = Qt.length;
  for (; e < t; ) {
    const r = e + t >>> 1, i = Qt[r], s = mo(i);
    s < n || s === n && i.flags & 2 ? e = r + 1 : t = r;
  }
  return e;
}
function jO(n) {
  if (!(n.flags & 1)) {
    const e = mo(n), t = Qt[Qt.length - 1];
    !t || // fast path when the job id is larger than the tail
    !(n.flags & 2) && e >= mo(t) ? Qt.push(n) : Qt.splice(BO(e), 0, n), n.flags |= 1, By();
  }
}
function By() {
  gu || (gu = $O.then(jy));
}
function VO(n) {
  vn(n) ? Ki.push(...n) : dr && n.id === -1 ? dr.splice(Ri + 1, 0, n) : n.flags & 1 || (Ki.push(n), n.flags |= 1), By();
}
function zO(n) {
  if (Ki.length) {
    const e = [...new Set(Ki)].sort(
      (t, r) => mo(t) - mo(r)
    );
    if (Ki.length = 0, dr) {
      dr.push(...e);
      return;
    }
    for (dr = e, Ri = 0; Ri < dr.length; Ri++) {
      const t = dr[Ri];
      t.flags & 4 && (t.flags &= -2), t.flags & 8 || t(), t.flags &= -2;
    }
    dr = null, Ri = 0;
  }
}
const mo = (n) => n.id == null ? n.flags & 2 ? -1 : 1 / 0 : n.id;
function jy(n) {
  try {
    for (Kn = 0; Kn < Qt.length; Kn++) {
      const e = Qt[Kn];
      e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), Pf(
        e,
        e.i,
        e.i ? 15 : 14
      ), e.flags & 4 || (e.flags &= -2));
    }
  } finally {
    for (; Kn < Qt.length; Kn++) {
      const e = Qt[Kn];
      e && (e.flags &= -2);
    }
    Kn = -1, Qt.length = 0, zO(), gu = null, (Qt.length || Ki.length) && jy();
  }
}
let HO = null;
ff().requestIdleCallback;
ff().cancelIdleCallback;
let GO = null;
function WO(n, e, t = !1) {
  const r = If || HO;
  if (r || GO) {
    const i = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (i && n in i)
      return i[n];
    if (arguments.length > 1)
      return t && _r(e) ? e.call(r && r.proxy) : e;
  }
}
const UO = JO, KO = Symbol.for("v-scx"), YO = () => WO(KO);
function qO(n, e, t) {
  return XO(n, e, t);
}
function XO(n, e, t = cf) {
  const { immediate: r, deep: i, flush: s, once: o } = t, a = Vg({}, t), l = e && r || !e && s !== "post";
  let c;
  if (yu) {
    if (s === "sync") {
      const p = YO();
      c = p.__watcherHandles || (p.__watcherHandles = []);
    } else if (!l) {
      const p = () => {
      };
      return p.stop = Sa, p.resume = Sa, p.pause = Sa, p;
    }
  }
  const u = If;
  a.call = (p, h, m) => Fy(p, u, h, m);
  let f = !1;
  s === "post" ? a.scheduler = (p) => {
    UO(p, u && u.suspense);
  } : s !== "sync" && (f = !0, a.scheduler = (p, h) => {
    h ? p() : jO(p);
  }), a.augmentJob = (p) => {
    e && (p.flags |= 4), f && (p.flags |= 2, u && (p.id = u.uid, p.i = u));
  };
  const d = Gx(n, e, a);
  return yu && (c ? c.push(d) : l && d()), d;
}
function JO(n, e) {
  e && e.pendingBranch ? vn(n) ? e.effects.push(...n) : e.effects.push(n) : VO(n);
}
let If = null;
{
  const n = ff(), e = (t, r) => {
    let i;
    return (i = n[t]) || (i = n[t] = []), i.push(r), (s) => {
      i.length > 1 ? i.forEach((o) => o(s)) : i[0](s);
    };
  };
  e(
    "__VUE_INSTANCE_SETTERS__",
    (t) => If = t
  ), e(
    "__VUE_SSR_SETTERS__",
    (t) => yu = t
  );
}
let yu = !1;
const Mn = /* @__PURE__ */ he({
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
    const t = n, r = e, i = ka(null);
    qO(
      i,
      ys(() => {
        t.autofocus && i.value.focus();
      }, 500)
    );
    const s = cl(t, "modelValue", r);
    return (o, a) => ol((I(), B("input", {
      ref_key: "input",
      ref: i,
      "onUpdate:modelValue": a[0] || (a[0] = (l) => Mo(s) ? s.value = l : null),
      class: "block rounded-main w-full p-2 border border-solid border-body-dark",
      type: "text"
    }, null, 512)), [
      [Qm, E(s)]
    ]);
  }
});
class Df {
  constructor(e) {
    ne(this, "pool", new al(this));
    this.refSource = e, Fn(
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
const QO = { class: "AppSearch" }, ZO = {
  key: 0,
  class: "AppSearch-Items"
}, eE = ["onClick"], tE = ["innerHTML"], nE = ["innerHTML"], rE = ["innerHTML"], iE = { key: 1 }, sE = { key: 2 }, oE = /* @__PURE__ */ he({
  __name: "AppSearch",
  setup(n) {
    const {
      objectsMatchedToQuery: e,
      controlCombo: t,
      modal: r,
      stagePosition: i
    } = Qe(), { guest: s, patron: o } = zt(), a = qe(), l = de.debug("app:AppSearch");
    r.isOpenedByName(
      "search",
      o.create(s.create((f) => {
        setTimeout(() => {
          f && a.value && (l("search is opened", f), a.value.$el.focus());
        }, 500);
      }))
    );
    const c = qe(""), u = e.objects(
      new Df(c),
      new pe([])
    ).ref();
    return t.happened(
      "KeyF",
      o.create(s.create(() => {
        r.give("search");
      }))
    ), (f, d) => (I(), rt(Ti, { name: "search" }, {
      default: H(() => [
        z("div", QO, [
          D(Mn, {
            ref_key: "inputRef",
            ref: a,
            modelValue: c.value,
            "onUpdate:modelValue": d[0] || (d[0] = (p) => c.value = p),
            class: "mb-2 e2e-query-input",
            placeholder: f.$t("general.specifyQuery")
          }, null, 8, ["modelValue", "placeholder"]),
          E(u).length ? (I(), B("div", ZO, [
            (I(!0), B(Ke, null, kt(E(u), (p) => (I(), B("div", {
              key: p.name,
              class: "cursor-pointer",
              onClick: ms((h) => {
                E(i).give(p), E(r).give("");
              }, ["prevent"])
            }, [
              z("b", {
                class: "AppSearch-ItemName",
                innerHTML: p.name
              }, null, 8, tE),
              p.additionalName ? (I(), B("b", {
                key: 0,
                class: "AppSearch-ItemName",
                innerHTML: p.additionalName
              }, null, 8, nE)) : ge("", !0),
              p.additionalFields ? (I(), B("div", {
                key: 1,
                innerHTML: Object.values(p.additionalFields).join(" ")
              }, null, 8, rE)) : ge("", !0)
            ], 8, eE))), 128))
          ])) : c.value ? (I(), B("div", iE, Z(f.$t("general.noResults")), 1)) : (I(), B("div", sE, Z(f.$t("general.resultsWillBeHere")), 1))
        ])
      ]),
      _: 1
    }));
  }
}), aE = { class: "AppTypes" }, lE = { class: "flex gap-2 items-end" }, cE = { class: "AppTypesParent-ItemTitle" }, uE = ["innerHTML"], fE = /* @__PURE__ */ he({
  __name: "AppTypesParent",
  setup(n) {
    const { parentTypes: e, mapType: t } = Qe(), { svgMapTypeImage: r } = zt(), i = e.types(new pe()).ref(), s = Ie(() => {
      var o;
      return (o = i.value) == null ? void 0 : o.map((a) => ({
        type: a,
        image: r.create(a).markup()
      })).sort((a, l) => +(a.type.name >= l.type.name));
    });
    return (o, a) => (I(), rt(Ti, { name: "parentTypes" }, {
      default: H(() => [
        z("div", aE, [
          a[0] || (a[0] = z("div", { class: "text-md font-bold mb-2" }, "Родительские типы", -1)),
          z("div", lE, [
            (I(!0), B(Ke, null, kt(s.value, (l) => (I(), B("div", {
              key: l.type.name,
              class: "flex flex-col gap-2"
            }, [
              z("div", cE, Z(l.type.name), 1),
              z("div", {
                class: "AppTypesParent-ItemImage",
                innerHTML: l.image,
                style: An(`width:${l.type.width}px;height:${l.type.height}px`)
              }, null, 12, uE),
              D(De, {
                class: "AppTypesParent-ItemButton e2e-add-preset-type",
                type: "success",
                size: "sm",
                onClick: (c) => E(t).give({ name: l.type.name, type: l.type })
              }, {
                default: H(() => [
                  ye(Z(o.$t("general.addToMap")), 1)
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
class Vy {
  constructor(e, t = void 0) {
    ne(this, "innerRef");
    this.executor = e, this.innerRef = qe(t);
  }
  ref() {
    return this.executor(this.innerRef), this.innerRef;
  }
}
const dE = { class: "flex gap-2" }, dc = /* @__PURE__ */ he({
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
    const i = cl(n, "modelValue", e);
    return (s, o) => (I(), B("label", dE, [
      ol(z("input", {
        "onUpdate:modelValue": o[0] || (o[0] = (a) => Mo(i) ? i.value = a : null),
        type: "checkbox"
      }, null, 512), [
        [Cb, E(i)]
      ]),
      s.$slots.default ? nn(s.$slots, "default", { key: 0 }) : (I(), B(Ke, { key: 1 }, [
        ye(Z(n.label), 1)
      ], 64))
    ]));
  }
}), wl = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [r, i] of e)
    t[r] = i;
  return t;
}, hE = {}, pE = { class: "text-sm font-bold" };
function mE(n, e) {
  return I(), B("div", pE, [
    nn(n.$slots, "default")
  ]);
}
const Rt = /* @__PURE__ */ wl(hE, [["render", mE]]), gE = {}, yE = { class: "mb-2" };
function vE(n, e) {
  return I(), B("div", yE, [
    nn(n.$slots, "default")
  ]);
}
const Xt = /* @__PURE__ */ wl(gE, [["render", vE]]);
function lt(n) {
  this.content = n;
}
lt.prototype = {
  constructor: lt,
  find: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      if (this.content[e] === n) return e;
    return -1;
  },
  // :: (string) → ?any
  // Retrieve the value stored under `key`, or return undefined when
  // no such key exists.
  get: function(n) {
    var e = this.find(n);
    return e == -1 ? void 0 : this.content[e + 1];
  },
  // :: (string, any, ?string) → OrderedMap
  // Create a new map by replacing the value of `key` with a new
  // value, or adding a binding to the end of the map. If `newKey` is
  // given, the key of the binding will be replaced with that key.
  update: function(n, e, t) {
    var r = t && t != n ? this.remove(t) : this, i = r.find(n), s = r.content.slice();
    return i == -1 ? s.push(t || n, e) : (s[i + 1] = e, t && (s[i] = t)), new lt(s);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1) return this;
    var t = this.content.slice();
    return t.splice(e, 2), new lt(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new lt([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new lt(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), i = r.content.slice(), s = r.find(n);
    return i.splice(s == -1 ? i.length : s, 0, e, t), new lt(i);
  },
  // :: ((key: string, value: any))
  // Call the given function for each key/value pair in the map, in
  // order.
  forEach: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      n(this.content[e], this.content[e + 1]);
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by prepending the keys in this map that don't
  // appear in `map` before the keys in `map`.
  prepend: function(n) {
    return n = lt.from(n), n.size ? new lt(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = lt.from(n), n.size ? new lt(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = lt.from(n);
    for (var t = 0; t < n.content.length; t += 2)
      e = e.remove(n.content[t]);
    return e;
  },
  // :: () → Object
  // Turn ordered map into a plain object.
  toObject: function() {
    var n = {};
    return this.forEach(function(e, t) {
      n[e] = t;
    }), n;
  },
  // :: number
  // The amount of keys in this map.
  get size() {
    return this.content.length >> 1;
  }
};
lt.from = function(n) {
  if (n instanceof lt) return n;
  var e = [];
  if (n) for (var t in n) e.push(t, n[t]);
  return new lt(e);
};
function zy(n, e, t) {
  for (let r = 0; ; r++) {
    if (r == n.childCount || r == e.childCount)
      return n.childCount == e.childCount ? null : t;
    let i = n.child(r), s = e.child(r);
    if (i == s) {
      t += i.nodeSize;
      continue;
    }
    if (!i.sameMarkup(s))
      return t;
    if (i.isText && i.text != s.text) {
      for (let o = 0; i.text[o] == s.text[o]; o++)
        t++;
      return t;
    }
    if (i.content.size || s.content.size) {
      let o = zy(i.content, s.content, t + 1);
      if (o != null)
        return o;
    }
    t += i.nodeSize;
  }
}
function Hy(n, e, t, r) {
  for (let i = n.childCount, s = e.childCount; ; ) {
    if (i == 0 || s == 0)
      return i == s ? null : { a: t, b: r };
    let o = n.child(--i), a = e.child(--s), l = o.nodeSize;
    if (o == a) {
      t -= l, r -= l;
      continue;
    }
    if (!o.sameMarkup(a))
      return { a: t, b: r };
    if (o.isText && o.text != a.text) {
      let c = 0, u = Math.min(o.text.length, a.text.length);
      for (; c < u && o.text[o.text.length - c - 1] == a.text[a.text.length - c - 1]; )
        c++, t--, r--;
      return { a: t, b: r };
    }
    if (o.content.size || a.content.size) {
      let c = Hy(o.content, a.content, t - 1, r - 1);
      if (c)
        return c;
    }
    t -= l, r -= l;
  }
}
class R {
  /**
  @internal
  */
  constructor(e, t) {
    if (this.content = e, this.size = t || 0, t == null)
      for (let r = 0; r < e.length; r++)
        this.size += e[r].nodeSize;
  }
  /**
  Invoke a callback for all descendant nodes between the given two
  positions (relative to start of this fragment). Doesn't descend
  into a node when the callback returns `false`.
  */
  nodesBetween(e, t, r, i = 0, s) {
    for (let o = 0, a = 0; a < t; o++) {
      let l = this.content[o], c = a + l.nodeSize;
      if (c > e && r(l, i + a, s || null, o) !== !1 && l.content.size) {
        let u = a + 1;
        l.nodesBetween(Math.max(0, e - u), Math.min(l.content.size, t - u), r, i + u);
      }
      a = c;
    }
  }
  /**
  Call the given callback for every descendant node. `pos` will be
  relative to the start of the fragment. The callback may return
  `false` to prevent traversal of a given node's children.
  */
  descendants(e) {
    this.nodesBetween(0, this.size, e);
  }
  /**
  Extract the text between `from` and `to`. See the same method on
  [`Node`](https://prosemirror.net/docs/ref/#model.Node.textBetween).
  */
  textBetween(e, t, r, i) {
    let s = "", o = !0;
    return this.nodesBetween(e, t, (a, l) => {
      let c = a.isText ? a.text.slice(Math.max(e, l) - l, t - l) : a.isLeaf ? i ? typeof i == "function" ? i(a) : i : a.type.spec.leafText ? a.type.spec.leafText(a) : "" : "";
      a.isBlock && (a.isLeaf && c || a.isTextblock) && r && (o ? o = !1 : s += r), s += c;
    }, 0), s;
  }
  /**
  Create a new fragment containing the combined content of this
  fragment and the other.
  */
  append(e) {
    if (!e.size)
      return this;
    if (!this.size)
      return e;
    let t = this.lastChild, r = e.firstChild, i = this.content.slice(), s = 0;
    for (t.isText && t.sameMarkup(r) && (i[i.length - 1] = t.withText(t.text + r.text), s = 1); s < e.content.length; s++)
      i.push(e.content[s]);
    return new R(i, this.size + e.size);
  }
  /**
  Cut out the sub-fragment between the two given positions.
  */
  cut(e, t = this.size) {
    if (e == 0 && t == this.size)
      return this;
    let r = [], i = 0;
    if (t > e)
      for (let s = 0, o = 0; o < t; s++) {
        let a = this.content[s], l = o + a.nodeSize;
        l > e && ((o < e || l > t) && (a.isText ? a = a.cut(Math.max(0, e - o), Math.min(a.text.length, t - o)) : a = a.cut(Math.max(0, e - o - 1), Math.min(a.content.size, t - o - 1))), r.push(a), i += a.nodeSize), o = l;
      }
    return new R(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? R.empty : e == 0 && t == this.content.length ? this : new R(this.content.slice(e, t));
  }
  /**
  Create a new fragment in which the node at the given index is
  replaced by the given node.
  */
  replaceChild(e, t) {
    let r = this.content[e];
    if (r == t)
      return this;
    let i = this.content.slice(), s = this.size + t.nodeSize - r.nodeSize;
    return i[e] = t, new R(i, s);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new R([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new R(this.content.concat(e), this.size + e.nodeSize);
  }
  /**
  Compare this fragment to another one.
  */
  eq(e) {
    if (this.content.length != e.content.length)
      return !1;
    for (let t = 0; t < this.content.length; t++)
      if (!this.content[t].eq(e.content[t]))
        return !1;
    return !0;
  }
  /**
  The first child of the fragment, or `null` if it is empty.
  */
  get firstChild() {
    return this.content.length ? this.content[0] : null;
  }
  /**
  The last child of the fragment, or `null` if it is empty.
  */
  get lastChild() {
    return this.content.length ? this.content[this.content.length - 1] : null;
  }
  /**
  The number of child nodes in this fragment.
  */
  get childCount() {
    return this.content.length;
  }
  /**
  Get the child node at the given index. Raise an error when the
  index is out of range.
  */
  child(e) {
    let t = this.content[e];
    if (!t)
      throw new RangeError("Index " + e + " out of range for " + this);
    return t;
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content[e] || null;
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    for (let t = 0, r = 0; t < this.content.length; t++) {
      let i = this.content[t];
      e(i, r, t), r += i.nodeSize;
    }
  }
  /**
  Find the first position at which this fragment and another
  fragment differ, or `null` if they are the same.
  */
  findDiffStart(e, t = 0) {
    return zy(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return Hy(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e, t = -1) {
    if (e == 0)
      return ca(0, e);
    if (e == this.size)
      return ca(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let r = 0, i = 0; ; r++) {
      let s = this.child(r), o = i + s.nodeSize;
      if (o >= e)
        return o == e || t > 0 ? ca(r + 1, o) : ca(r, i);
      i = o;
    }
  }
  /**
  Return a debugging string that describes this fragment.
  */
  toString() {
    return "<" + this.toStringInner() + ">";
  }
  /**
  @internal
  */
  toStringInner() {
    return this.content.join(", ");
  }
  /**
  Create a JSON-serializeable representation of this fragment.
  */
  toJSON() {
    return this.content.length ? this.content.map((e) => e.toJSON()) : null;
  }
  /**
  Deserialize a fragment from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      return R.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return new R(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return R.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      r += s.nodeSize, i && s.isText && e[i - 1].sameMarkup(s) ? (t || (t = e.slice(0, i)), t[t.length - 1] = s.withText(t[t.length - 1].text + s.text)) : t && t.push(s);
    }
    return new R(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return R.empty;
    if (e instanceof R)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new R([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
R.empty = new R([], 0);
const hc = { index: 0, offset: 0 };
function ca(n, e) {
  return hc.index = n, hc.offset = e, hc;
}
function ja(n, e) {
  if (n === e)
    return !0;
  if (!(n && typeof n == "object") || !(e && typeof e == "object"))
    return !1;
  let t = Array.isArray(n);
  if (Array.isArray(e) != t)
    return !1;
  if (t) {
    if (n.length != e.length)
      return !1;
    for (let r = 0; r < n.length; r++)
      if (!ja(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !ja(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let Le = class vu {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.attrs = t;
  }
  /**
  Given a set of marks, create a new set which contains this one as
  well, in the right position. If this mark is already in the set,
  the set itself is returned. If any marks that are set to be
  [exclusive](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) with this mark are present,
  those are replaced by this one.
  */
  addToSet(e) {
    let t, r = !1;
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      if (this.eq(s))
        return e;
      if (this.type.excludes(s.type))
        t || (t = e.slice(0, i));
      else {
        if (s.type.excludes(this.type))
          return e;
        !r && s.type.rank > this.type.rank && (t || (t = e.slice(0, i)), t.push(this), r = !0), t && t.push(s);
      }
    }
    return t || (t = e.slice()), r || t.push(this), t;
  }
  /**
  Remove this mark from the given set, returning a new set. If this
  mark is not in the set, the set itself is returned.
  */
  removeFromSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return e.slice(0, t).concat(e.slice(t + 1));
    return e;
  }
  /**
  Test whether this mark is in the given set of marks.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return !0;
    return !1;
  }
  /**
  Test whether this mark has the same type and attributes as
  another mark.
  */
  eq(e) {
    return this == e || this.type == e.type && ja(this.attrs, e.attrs);
  }
  /**
  Convert this mark to a JSON-serializeable representation.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return e;
  }
  /**
  Deserialize a mark from JSON.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Mark.fromJSON");
    let r = e.marks[t.type];
    if (!r)
      throw new RangeError(`There is no mark type ${t.type} in this schema`);
    let i = r.create(t.attrs);
    return r.checkAttrs(i.attrs), i;
  }
  /**
  Test whether two sets of marks are identical.
  */
  static sameSet(e, t) {
    if (e == t)
      return !0;
    if (e.length != t.length)
      return !1;
    for (let r = 0; r < e.length; r++)
      if (!e[r].eq(t[r]))
        return !1;
    return !0;
  }
  /**
  Create a properly sorted mark set from null, a single mark, or an
  unsorted array of marks.
  */
  static setFrom(e) {
    if (!e || Array.isArray(e) && e.length == 0)
      return vu.none;
    if (e instanceof vu)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
};
Le.none = [];
class Va extends Error {
}
class G {
  /**
  Create a slice. When specifying a non-zero open depth, you must
  make sure that there are nodes of at least that depth at the
  appropriate side of the fragment—i.e. if the fragment is an
  empty paragraph node, `openStart` and `openEnd` can't be greater
  than 1.
  
  It is not necessary for the content of open nodes to conform to
  the schema's content constraints, though it should be a valid
  start/end/middle for such a node, depending on which sides are
  open.
  */
  constructor(e, t, r) {
    this.content = e, this.openStart = t, this.openEnd = r;
  }
  /**
  The size this slice would add when inserted into a document.
  */
  get size() {
    return this.content.size - this.openStart - this.openEnd;
  }
  /**
  @internal
  */
  insertAt(e, t) {
    let r = Wy(this.content, e + this.openStart, t);
    return r && new G(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new G(Gy(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
  }
  /**
  Tests whether this slice is equal to another slice.
  */
  eq(e) {
    return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd;
  }
  /**
  @internal
  */
  toString() {
    return this.content + "(" + this.openStart + "," + this.openEnd + ")";
  }
  /**
  Convert a slice to a JSON-serializable representation.
  */
  toJSON() {
    if (!this.content.size)
      return null;
    let e = { content: this.content.toJSON() };
    return this.openStart > 0 && (e.openStart = this.openStart), this.openEnd > 0 && (e.openEnd = this.openEnd), e;
  }
  /**
  Deserialize a slice from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      return G.empty;
    let r = t.openStart || 0, i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new G(R.fromJSON(e, t.content), r, i);
  }
  /**
  Create a slice from a fragment by taking the maximum possible
  open value on both side of the fragment.
  */
  static maxOpen(e, t = !0) {
    let r = 0, i = 0;
    for (let s = e.firstChild; s && !s.isLeaf && (t || !s.type.spec.isolating); s = s.firstChild)
      r++;
    for (let s = e.lastChild; s && !s.isLeaf && (t || !s.type.spec.isolating); s = s.lastChild)
      i++;
    return new G(e, r, i);
  }
}
G.empty = new G(R.empty, 0, 0);
function Gy(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), s = n.maybeChild(r), { index: o, offset: a } = n.findIndex(t);
  if (i == e || s.isText) {
    if (a != t && !n.child(o).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != o)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, s.copy(Gy(s.content, e - i - 1, t - i - 1)));
}
function Wy(n, e, t, r) {
  let { index: i, offset: s } = n.findIndex(e), o = n.maybeChild(i);
  if (s == e || o.isText)
    return n.cut(0, e).append(t).append(n.cut(e));
  let a = Wy(o.content, e - s - 1, t);
  return a && n.replaceChild(i, o.copy(a));
}
function bE(n, e, t) {
  if (t.openStart > n.depth)
    throw new Va("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new Va("Inconsistent open depths");
  return Uy(n, e, t, 0);
}
function Uy(n, e, t, r) {
  let i = n.index(r), s = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let o = Uy(n, e, t, r + 1);
    return s.copy(s.content.replaceChild(i, o));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let o = n.parent, a = o.content;
      return ci(o, a.cut(0, n.parentOffset).append(t.content).append(a.cut(e.parentOffset)));
    } else {
      let { start: o, end: a } = wE(t, n);
      return ci(s, Yy(n, o, a, e, r));
    }
  else return ci(s, za(n, e, r));
}
function Ky(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new Va("Cannot join " + e.type.name + " onto " + n.type.name);
}
function bu(n, e, t) {
  let r = n.node(t);
  return Ky(r, e.node(t)), r;
}
function li(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function eo(n, e, t, r) {
  let i = (e || n).node(t), s = 0, o = e ? e.index(t) : i.childCount;
  n && (s = n.index(t), n.depth > t ? s++ : n.textOffset && (li(n.nodeAfter, r), s++));
  for (let a = s; a < o; a++)
    li(i.child(a), r);
  e && e.depth == t && e.textOffset && li(e.nodeBefore, r);
}
function ci(n, e) {
  return n.type.checkContent(e), n.copy(e);
}
function Yy(n, e, t, r, i) {
  let s = n.depth > i && bu(n, e, i + 1), o = r.depth > i && bu(t, r, i + 1), a = [];
  return eo(null, n, i, a), s && o && e.index(i) == t.index(i) ? (Ky(s, o), li(ci(s, Yy(n, e, t, r, i + 1)), a)) : (s && li(ci(s, za(n, e, i + 1)), a), eo(e, t, i, a), o && li(ci(o, za(t, r, i + 1)), a)), eo(r, null, i, a), new R(a);
}
function za(n, e, t) {
  let r = [];
  if (eo(null, n, t, r), n.depth > t) {
    let i = bu(n, e, t + 1);
    li(ci(i, za(n, e, t + 1)), r);
  }
  return eo(e, null, t, r), new R(r);
}
function wE(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let s = t - 1; s >= 0; s--)
    i = e.node(s).copy(R.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t)
  };
}
class go {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.pos = e, this.path = t, this.parentOffset = r, this.depth = t.length / 3 - 1;
  }
  /**
  @internal
  */
  resolveDepth(e) {
    return e == null ? this.depth : e < 0 ? this.depth + e : e;
  }
  /**
  The parent node that the position points into. Note that even if
  a position points into a text node, that node is not considered
  the parent—text nodes are ‘flat’ in this model, and have no content.
  */
  get parent() {
    return this.node(this.depth);
  }
  /**
  The root node in which the position was resolved.
  */
  get doc() {
    return this.node(0);
  }
  /**
  The ancestor node at the given level. `p.node(p.depth)` is the
  same as `p.parent`.
  */
  node(e) {
    return this.path[this.resolveDepth(e) * 3];
  }
  /**
  The index into the ancestor at the given level. If this points
  at the 3rd node in the 2nd paragraph on the top level, for
  example, `p.index(0)` is 1 and `p.index(1)` is 2.
  */
  index(e) {
    return this.path[this.resolveDepth(e) * 3 + 1];
  }
  /**
  The index pointing after this position into the ancestor at the
  given level.
  */
  indexAfter(e) {
    return e = this.resolveDepth(e), this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1);
  }
  /**
  The (absolute) position at the start of the node at the given
  level.
  */
  start(e) {
    return e = this.resolveDepth(e), e == 0 ? 0 : this.path[e * 3 - 1] + 1;
  }
  /**
  The (absolute) position at the end of the node at the given
  level.
  */
  end(e) {
    return e = this.resolveDepth(e), this.start(e) + this.node(e).content.size;
  }
  /**
  The (absolute) position directly before the wrapping node at the
  given level, or, when `depth` is `this.depth + 1`, the original
  position.
  */
  before(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position before the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1];
  }
  /**
  The (absolute) position directly after the wrapping node at the
  given level, or the original position when `depth` is `this.depth + 1`.
  */
  after(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position after the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize;
  }
  /**
  When this position points into a text node, this returns the
  distance between the position and the start of the text node.
  Will be zero for positions that point between nodes.
  */
  get textOffset() {
    return this.pos - this.path[this.path.length - 1];
  }
  /**
  Get the node directly after the position, if any. If the position
  points into a text node, only the part of that node after the
  position is returned.
  */
  get nodeAfter() {
    let e = this.parent, t = this.index(this.depth);
    if (t == e.childCount)
      return null;
    let r = this.pos - this.path[this.path.length - 1], i = e.child(t);
    return r ? e.child(t).cut(r) : i;
  }
  /**
  Get the node directly before the position, if any. If the
  position points into a text node, only the part of that node
  before the position is returned.
  */
  get nodeBefore() {
    let e = this.index(this.depth), t = this.pos - this.path[this.path.length - 1];
    return t ? this.parent.child(e).cut(0, t) : e == 0 ? null : this.parent.child(e - 1);
  }
  /**
  Get the position at the given index in the parent node at the
  given depth (which defaults to `this.depth`).
  */
  posAtIndex(e, t) {
    t = this.resolveDepth(t);
    let r = this.path[t * 3], i = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
    for (let s = 0; s < e; s++)
      i += r.child(s).nodeSize;
    return i;
  }
  /**
  Get the marks at this position, factoring in the surrounding
  marks' [`inclusive`](https://prosemirror.net/docs/ref/#model.MarkSpec.inclusive) property. If the
  position is at the start of a non-empty node, the marks of the
  node after it (if any) are returned.
  */
  marks() {
    let e = this.parent, t = this.index();
    if (e.content.size == 0)
      return Le.none;
    if (this.textOffset)
      return e.child(t).marks;
    let r = e.maybeChild(t - 1), i = e.maybeChild(t);
    if (!r) {
      let a = r;
      r = i, i = a;
    }
    let s = r.marks;
    for (var o = 0; o < s.length; o++)
      s[o].type.spec.inclusive === !1 && (!i || !s[o].isInSet(i.marks)) && (s = s[o--].removeFromSet(s));
    return s;
  }
  /**
  Get the marks after the current position, if any, except those
  that are non-inclusive and not present at position `$end`. This
  is mostly useful for getting the set of marks to preserve after a
  deletion. Will return `null` if this position is at the end of
  its parent node or its parent node isn't a textblock (in which
  case no marks should be preserved).
  */
  marksAcross(e) {
    let t = this.parent.maybeChild(this.index());
    if (!t || !t.isInline)
      return null;
    let r = t.marks, i = e.parent.maybeChild(e.index());
    for (var s = 0; s < r.length; s++)
      r[s].type.spec.inclusive === !1 && (!i || !r[s].isInSet(i.marks)) && (r = r[s--].removeFromSet(r));
    return r;
  }
  /**
  The depth up to which this position and the given (non-resolved)
  position share the same parent nodes.
  */
  sharedDepth(e) {
    for (let t = this.depth; t > 0; t--)
      if (this.start(t) <= e && this.end(t) >= e)
        return t;
    return 0;
  }
  /**
  Returns a range based on the place where this position and the
  given position diverge around block content. If both point into
  the same textblock, for example, a range around that textblock
  will be returned. If they point into different blocks, the range
  around those blocks in their shared ancestor is returned. You can
  pass in an optional predicate that will be called with a parent
  node to see if a range into that parent is acceptable.
  */
  blockRange(e = this, t) {
    if (e.pos < this.pos)
      return e.blockRange(this);
    for (let r = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); r >= 0; r--)
      if (e.pos <= this.end(r) && (!t || t(this.node(r))))
        return new Ha(this, e, r);
    return null;
  }
  /**
  Query whether the given position shares the same parent node.
  */
  sameParent(e) {
    return this.pos - this.parentOffset == e.pos - e.parentOffset;
  }
  /**
  Return the greater of this and the given position.
  */
  max(e) {
    return e.pos > this.pos ? e : this;
  }
  /**
  Return the smaller of this and the given position.
  */
  min(e) {
    return e.pos < this.pos ? e : this;
  }
  /**
  @internal
  */
  toString() {
    let e = "";
    for (let t = 1; t <= this.depth; t++)
      e += (e ? "/" : "") + this.node(t).type.name + "_" + this.index(t - 1);
    return e + ":" + this.parentOffset;
  }
  /**
  @internal
  */
  static resolve(e, t) {
    if (!(t >= 0 && t <= e.content.size))
      throw new RangeError("Position " + t + " out of range");
    let r = [], i = 0, s = t;
    for (let o = e; ; ) {
      let { index: a, offset: l } = o.content.findIndex(s), c = s - l;
      if (r.push(o, a, i + l), !c || (o = o.child(a), o.isText))
        break;
      s = c - 1, i += l + 1;
    }
    return new go(t, r, s);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let r = zh.get(e);
    if (r)
      for (let s = 0; s < r.elts.length; s++) {
        let o = r.elts[s];
        if (o.pos == t)
          return o;
      }
    else
      zh.set(e, r = new CE());
    let i = r.elts[r.i] = go.resolve(e, t);
    return r.i = (r.i + 1) % _E, i;
  }
}
class CE {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const _E = 12, zh = /* @__PURE__ */ new WeakMap();
class Ha {
  /**
  Construct a node range. `$from` and `$to` should point into the
  same node until at least the given `depth`, since a node range
  denotes an adjacent set of nodes in a single parent node.
  */
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.depth = r;
  }
  /**
  The position at the start of the range.
  */
  get start() {
    return this.$from.before(this.depth + 1);
  }
  /**
  The position at the end of the range.
  */
  get end() {
    return this.$to.after(this.depth + 1);
  }
  /**
  The parent node that the range points into.
  */
  get parent() {
    return this.$from.node(this.depth);
  }
  /**
  The start index of the range in the parent node.
  */
  get startIndex() {
    return this.$from.index(this.depth);
  }
  /**
  The end index of the range in the parent node.
  */
  get endIndex() {
    return this.$to.indexAfter(this.depth);
  }
}
const SE = /* @__PURE__ */ Object.create(null);
let xr = class wu {
  /**
  @internal
  */
  constructor(e, t, r, i = Le.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || R.empty;
  }
  /**
  The array of this node's child nodes.
  */
  get children() {
    return this.content.content;
  }
  /**
  The size of this node, as defined by the integer-based [indexing
  scheme](/docs/guide/#doc.indexing). For text nodes, this is the
  amount of characters. For other leaf nodes, it is one. For
  non-leaf nodes, it is the size of the content plus two (the
  start and end token).
  */
  get nodeSize() {
    return this.isLeaf ? 1 : 2 + this.content.size;
  }
  /**
  The number of children that the node has.
  */
  get childCount() {
    return this.content.childCount;
  }
  /**
  Get the child node at the given index. Raises an error when the
  index is out of range.
  */
  child(e) {
    return this.content.child(e);
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content.maybeChild(e);
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    this.content.forEach(e);
  }
  /**
  Invoke a callback for all descendant nodes recursively between
  the given two positions that are relative to start of this
  node's content. The callback is invoked with the node, its
  position relative to the original node (method receiver),
  its parent node, and its child index. When the callback returns
  false for a given node, that node's children will not be
  recursed over. The last parameter can be used to specify a
  starting position to count from.
  */
  nodesBetween(e, t, r, i = 0) {
    this.content.nodesBetween(e, t, r, i, this);
  }
  /**
  Call the given callback for every descendant node. Doesn't
  descend into a node when the callback returns `false`.
  */
  descendants(e) {
    this.nodesBetween(0, this.content.size, e);
  }
  /**
  Concatenates all the text nodes found in this fragment and its
  children.
  */
  get textContent() {
    return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "");
  }
  /**
  Get all text between positions `from` and `to`. When
  `blockSeparator` is given, it will be inserted to separate text
  from different block nodes. If `leafText` is given, it'll be
  inserted for every non-text leaf node encountered, otherwise
  [`leafText`](https://prosemirror.net/docs/ref/#model.NodeSpec^leafText) will be used.
  */
  textBetween(e, t, r, i) {
    return this.content.textBetween(e, t, r, i);
  }
  /**
  Returns this node's first child, or `null` if there are no
  children.
  */
  get firstChild() {
    return this.content.firstChild;
  }
  /**
  Returns this node's last child, or `null` if there are no
  children.
  */
  get lastChild() {
    return this.content.lastChild;
  }
  /**
  Test whether two nodes represent the same piece of document.
  */
  eq(e) {
    return this == e || this.sameMarkup(e) && this.content.eq(e.content);
  }
  /**
  Compare the markup (type, attributes, and marks) of this node to
  those of another. Returns `true` if both have the same markup.
  */
  sameMarkup(e) {
    return this.hasMarkup(e.type, e.attrs, e.marks);
  }
  /**
  Check whether this node's markup correspond to the given type,
  attributes, and marks.
  */
  hasMarkup(e, t, r) {
    return this.type == e && ja(this.attrs, t || e.defaultAttrs || SE) && Le.sameSet(this.marks, r || Le.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new wu(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new wu(this.type, this.attrs, this.content, e);
  }
  /**
  Create a copy of this node with only the content between the
  given positions. If `to` is not given, it defaults to the end of
  the node.
  */
  cut(e, t = this.content.size) {
    return e == 0 && t == this.content.size ? this : this.copy(this.content.cut(e, t));
  }
  /**
  Cut out the part of the document between the given positions, and
  return it as a `Slice` object.
  */
  slice(e, t = this.content.size, r = !1) {
    if (e == t)
      return G.empty;
    let i = this.resolve(e), s = this.resolve(t), o = r ? 0 : i.sharedDepth(t), a = i.start(o), c = i.node(o).content.cut(i.pos - a, s.pos - a);
    return new G(c, i.depth - o, s.depth - o);
  }
  /**
  Replace the part of the document between the given positions with
  the given slice. The slice must 'fit', meaning its open sides
  must be able to connect to the surrounding content, and its
  content nodes must be valid children for the node they are placed
  into. If any of this is violated, an error of type
  [`ReplaceError`](https://prosemirror.net/docs/ref/#model.ReplaceError) is thrown.
  */
  replace(e, t, r) {
    return bE(this.resolve(e), this.resolve(t), r);
  }
  /**
  Find the node directly after the given position.
  */
  nodeAt(e) {
    for (let t = this; ; ) {
      let { index: r, offset: i } = t.content.findIndex(e);
      if (t = t.maybeChild(r), !t)
        return null;
      if (i == e || t.isText)
        return t;
      e -= i + 1;
    }
  }
  /**
  Find the (direct) child node after the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childAfter(e) {
    let { index: t, offset: r } = this.content.findIndex(e);
    return { node: this.content.maybeChild(t), index: t, offset: r };
  }
  /**
  Find the (direct) child node before the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childBefore(e) {
    if (e == 0)
      return { node: null, index: 0, offset: 0 };
    let { index: t, offset: r } = this.content.findIndex(e);
    if (r < e)
      return { node: this.content.child(t), index: t, offset: r };
    let i = this.content.child(t - 1);
    return { node: i, index: t - 1, offset: r - i.nodeSize };
  }
  /**
  Resolve the given position in the document, returning an
  [object](https://prosemirror.net/docs/ref/#model.ResolvedPos) with information about its context.
  */
  resolve(e) {
    return go.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return go.resolve(this, e);
  }
  /**
  Test whether a given mark or mark type occurs in this document
  between the two given positions.
  */
  rangeHasMark(e, t, r) {
    let i = !1;
    return t > e && this.nodesBetween(e, t, (s) => (r.isInSet(s.marks) && (i = !0), !i)), i;
  }
  /**
  True when this is a block (non-inline node)
  */
  get isBlock() {
    return this.type.isBlock;
  }
  /**
  True when this is a textblock node, a block node with inline
  content.
  */
  get isTextblock() {
    return this.type.isTextblock;
  }
  /**
  True when this node allows inline content.
  */
  get inlineContent() {
    return this.type.inlineContent;
  }
  /**
  True when this is an inline node (a text node or a node that can
  appear among text).
  */
  get isInline() {
    return this.type.isInline;
  }
  /**
  True when this is a text node.
  */
  get isText() {
    return this.type.isText;
  }
  /**
  True when this is a leaf node.
  */
  get isLeaf() {
    return this.type.isLeaf;
  }
  /**
  True when this is an atom, i.e. when it does not have directly
  editable content. This is usually the same as `isLeaf`, but can
  be configured with the [`atom` property](https://prosemirror.net/docs/ref/#model.NodeSpec.atom)
  on a node's spec (typically used when the node is displayed as
  an uneditable [node view](https://prosemirror.net/docs/ref/#view.NodeView)).
  */
  get isAtom() {
    return this.type.isAtom;
  }
  /**
  Return a string representation of this node for debugging
  purposes.
  */
  toString() {
    if (this.type.spec.toDebugString)
      return this.type.spec.toDebugString(this);
    let e = this.type.name;
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), qy(this.marks, e);
  }
  /**
  Get the content match in this node at the given index.
  */
  contentMatchAt(e) {
    let t = this.type.contentMatch.matchFragment(this.content, 0, e);
    if (!t)
      throw new Error("Called contentMatchAt on a node with invalid content");
    return t;
  }
  /**
  Test whether replacing the range between `from` and `to` (by
  child index) with the given replacement fragment (which defaults
  to the empty fragment) would leave the node's content valid. You
  can optionally pass `start` and `end` indices into the
  replacement fragment.
  */
  canReplace(e, t, r = R.empty, i = 0, s = r.childCount) {
    let o = this.contentMatchAt(e).matchFragment(r, i, s), a = o && o.matchFragment(this.content, t);
    if (!a || !a.validEnd)
      return !1;
    for (let l = i; l < s; l++)
      if (!this.type.allowsMarks(r.child(l).marks))
        return !1;
    return !0;
  }
  /**
  Test whether replacing the range `from` to `to` (by index) with
  a node of the given type would leave the node's content valid.
  */
  canReplaceWith(e, t, r, i) {
    if (i && !this.type.allowsMarks(i))
      return !1;
    let s = this.contentMatchAt(e).matchType(r), o = s && s.matchFragment(this.content, t);
    return o ? o.validEnd : !1;
  }
  /**
  Test whether the given node's content could be appended to this
  node. If that node is empty, this will only return true if there
  is at least one node type that can appear in both nodes (to avoid
  merging completely incompatible nodes).
  */
  canAppend(e) {
    return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type);
  }
  /**
  Check whether this node and its descendants conform to the
  schema, and raise an exception when they do not.
  */
  check() {
    this.type.checkContent(this.content), this.type.checkAttrs(this.attrs);
    let e = Le.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      r.type.checkAttrs(r.attrs), e = r.addToSet(e);
    }
    if (!Le.sameSet(e, this.marks))
      throw new RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((t) => t.type.name)}`);
    this.content.forEach((t) => t.check());
  }
  /**
  Return a JSON-serializeable representation of this node.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map((t) => t.toJSON())), e;
  }
  /**
  Deserialize a node from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Node.fromJSON");
    let r;
    if (t.marks) {
      if (!Array.isArray(t.marks))
        throw new RangeError("Invalid mark data for Node.fromJSON");
      r = t.marks.map(e.markFromJSON);
    }
    if (t.type == "text") {
      if (typeof t.text != "string")
        throw new RangeError("Invalid text node in JSON");
      return e.text(t.text, r);
    }
    let i = R.fromJSON(e, t.content), s = e.nodeType(t.type).create(t.attrs, i, r);
    return s.type.checkAttrs(s.attrs), s;
  }
};
xr.prototype.text = void 0;
class Ga extends xr {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : qy(this.marks, JSON.stringify(this.text));
  }
  get textContent() {
    return this.text;
  }
  textBetween(e, t) {
    return this.text.slice(e, t);
  }
  get nodeSize() {
    return this.text.length;
  }
  mark(e) {
    return e == this.marks ? this : new Ga(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new Ga(this.type, this.attrs, e, this.marks);
  }
  cut(e = 0, t = this.text.length) {
    return e == 0 && t == this.text.length ? this : this.withText(this.text.slice(e, t));
  }
  eq(e) {
    return this.sameMarkup(e) && this.text == e.text;
  }
  toJSON() {
    let e = super.toJSON();
    return e.text = this.text, e;
  }
}
function qy(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
class yi {
  /**
  @internal
  */
  constructor(e) {
    this.validEnd = e, this.next = [], this.wrapCache = [];
  }
  /**
  @internal
  */
  static parse(e, t) {
    let r = new xE(e, t);
    if (r.next == null)
      return yi.empty;
    let i = Xy(r);
    r.next && r.err("Unexpected trailing text");
    let s = NE(AE(i));
    return PE(s, r), s;
  }
  /**
  Match a node type, returning a match after that node if
  successful.
  */
  matchType(e) {
    for (let t = 0; t < this.next.length; t++)
      if (this.next[t].type == e)
        return this.next[t].next;
    return null;
  }
  /**
  Try to match a fragment. Returns the resulting match when
  successful.
  */
  matchFragment(e, t = 0, r = e.childCount) {
    let i = this;
    for (let s = t; i && s < r; s++)
      i = i.matchType(e.child(s).type);
    return i;
  }
  /**
  @internal
  */
  get inlineContent() {
    return this.next.length != 0 && this.next[0].type.isInline;
  }
  /**
  Get the first matching node type at this match position that can
  be generated.
  */
  get defaultType() {
    for (let e = 0; e < this.next.length; e++) {
      let { type: t } = this.next[e];
      if (!(t.isText || t.hasRequiredAttrs()))
        return t;
    }
    return null;
  }
  /**
  @internal
  */
  compatible(e) {
    for (let t = 0; t < this.next.length; t++)
      for (let r = 0; r < e.next.length; r++)
        if (this.next[t].type == e.next[r].type)
          return !0;
    return !1;
  }
  /**
  Try to match the given fragment, and if that fails, see if it can
  be made to match by inserting nodes in front of it. When
  successful, return a fragment of inserted nodes (which may be
  empty if nothing had to be inserted). When `toEnd` is true, only
  return a fragment if the resulting match goes to the end of the
  content expression.
  */
  fillBefore(e, t = !1, r = 0) {
    let i = [this];
    function s(o, a) {
      let l = o.matchFragment(e, r);
      if (l && (!t || l.validEnd))
        return R.from(a.map((c) => c.createAndFill()));
      for (let c = 0; c < o.next.length; c++) {
        let { type: u, next: f } = o.next[c];
        if (!(u.isText || u.hasRequiredAttrs()) && i.indexOf(f) == -1) {
          i.push(f);
          let d = s(f, a.concat(u));
          if (d)
            return d;
        }
      }
      return null;
    }
    return s(this, []);
  }
  /**
  Find a set of wrapping node types that would allow a node of the
  given type to appear at this position. The result may be empty
  (when it fits directly) and will be null when no such wrapping
  exists.
  */
  findWrapping(e) {
    for (let r = 0; r < this.wrapCache.length; r += 2)
      if (this.wrapCache[r] == e)
        return this.wrapCache[r + 1];
    let t = this.computeWrapping(e);
    return this.wrapCache.push(e, t), t;
  }
  /**
  @internal
  */
  computeWrapping(e) {
    let t = /* @__PURE__ */ Object.create(null), r = [{ match: this, type: null, via: null }];
    for (; r.length; ) {
      let i = r.shift(), s = i.match;
      if (s.matchType(e)) {
        let o = [];
        for (let a = i; a.type; a = a.via)
          o.push(a.type);
        return o.reverse();
      }
      for (let o = 0; o < s.next.length; o++) {
        let { type: a, next: l } = s.next[o];
        !a.isLeaf && !a.hasRequiredAttrs() && !(a.name in t) && (!i.type || l.validEnd) && (r.push({ match: a.contentMatch, type: a, via: i }), t[a.name] = !0);
      }
    }
    return null;
  }
  /**
  The number of outgoing edges this node has in the finite
  automaton that describes the content expression.
  */
  get edgeCount() {
    return this.next.length;
  }
  /**
  Get the _n_​th outgoing edge from this node in the finite
  automaton that describes the content expression.
  */
  edge(e) {
    if (e >= this.next.length)
      throw new RangeError(`There's no ${e}th edge in this content match`);
    return this.next[e];
  }
  /**
  @internal
  */
  toString() {
    let e = [];
    function t(r) {
      e.push(r);
      for (let i = 0; i < r.next.length; i++)
        e.indexOf(r.next[i].next) == -1 && t(r.next[i].next);
    }
    return t(this), e.map((r, i) => {
      let s = i + (r.validEnd ? "*" : " ") + " ";
      for (let o = 0; o < r.next.length; o++)
        s += (o ? ", " : "") + r.next[o].type.name + "->" + e.indexOf(r.next[o].next);
      return s;
    }).join(`
`);
  }
}
yi.empty = new yi(!0);
class xE {
  constructor(e, t) {
    this.string = e, this.nodeTypes = t, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(), this.tokens[0] == "" && this.tokens.shift();
  }
  get next() {
    return this.tokens[this.pos];
  }
  eat(e) {
    return this.next == e && (this.pos++ || !0);
  }
  err(e) {
    throw new SyntaxError(e + " (in content expression '" + this.string + "')");
  }
}
function Xy(n) {
  let e = [];
  do
    e.push(kE(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function kE(n) {
  let e = [];
  do
    e.push(TE(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function TE(n) {
  let e = ME(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = OE(n, e);
    else
      break;
  return e;
}
function Hh(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function OE(n, e) {
  let t = Hh(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = Hh(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function EE(n, e) {
  let t = n.nodeTypes, r = t[e];
  if (r)
    return [r];
  let i = [];
  for (let s in t) {
    let o = t[s];
    o.isInGroup(e) && i.push(o);
  }
  return i.length == 0 && n.err("No node type or group '" + e + "' found"), i;
}
function ME(n) {
  if (n.eat("(")) {
    let e = Xy(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = EE(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function AE(n) {
  let e = [[]];
  return i(s(n, 0), t()), e;
  function t() {
    return e.push([]) - 1;
  }
  function r(o, a, l) {
    let c = { term: l, to: a };
    return e[o].push(c), c;
  }
  function i(o, a) {
    o.forEach((l) => l.to = a);
  }
  function s(o, a) {
    if (o.type == "choice")
      return o.exprs.reduce((l, c) => l.concat(s(c, a)), []);
    if (o.type == "seq")
      for (let l = 0; ; l++) {
        let c = s(o.exprs[l], a);
        if (l == o.exprs.length - 1)
          return c;
        i(c, a = t());
      }
    else if (o.type == "star") {
      let l = t();
      return r(a, l), i(s(o.expr, l), l), [r(l)];
    } else if (o.type == "plus") {
      let l = t();
      return i(s(o.expr, a), l), i(s(o.expr, l), l), [r(l)];
    } else {
      if (o.type == "opt")
        return [r(a)].concat(s(o.expr, a));
      if (o.type == "range") {
        let l = a;
        for (let c = 0; c < o.min; c++) {
          let u = t();
          i(s(o.expr, l), u), l = u;
        }
        if (o.max == -1)
          i(s(o.expr, l), l);
        else
          for (let c = o.min; c < o.max; c++) {
            let u = t();
            r(l, u), i(s(o.expr, l), u), l = u;
          }
        return [r(l)];
      } else {
        if (o.type == "name")
          return [r(a, void 0, o.value)];
        throw new Error("Unknown expr type");
      }
    }
  }
}
function Jy(n, e) {
  return e - n;
}
function Gh(n, e) {
  let t = [];
  return r(e), t.sort(Jy);
  function r(i) {
    let s = n[i];
    if (s.length == 1 && !s[0].term)
      return r(s[0].to);
    t.push(i);
    for (let o = 0; o < s.length; o++) {
      let { term: a, to: l } = s[o];
      !a && t.indexOf(l) == -1 && r(l);
    }
  }
}
function NE(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(Gh(n, 0));
  function t(r) {
    let i = [];
    r.forEach((o) => {
      n[o].forEach(({ term: a, to: l }) => {
        if (!a)
          return;
        let c;
        for (let u = 0; u < i.length; u++)
          i[u][0] == a && (c = i[u][1]);
        Gh(n, l).forEach((u) => {
          c || i.push([a, c = []]), c.indexOf(u) == -1 && c.push(u);
        });
      });
    });
    let s = e[r.join(",")] = new yi(r.indexOf(n.length - 1) > -1);
    for (let o = 0; o < i.length; o++) {
      let a = i[o][1].sort(Jy);
      s.next.push({ type: i[o][0], next: e[a.join(",")] || t(a) });
    }
    return s;
  }
}
function PE(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], s = !i.validEnd, o = [];
    for (let a = 0; a < i.next.length; a++) {
      let { type: l, next: c } = i.next[a];
      o.push(l.name), s && !(l.isText || l.hasRequiredAttrs()) && (s = !1), r.indexOf(c) == -1 && r.push(c);
    }
    s && e.err("Only non-generatable nodes (" + o.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function Qy(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function Zy(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let r in n) {
    let i = e && e[r];
    if (i === void 0) {
      let s = n[r];
      if (s.hasDefault)
        i = s.default;
      else
        throw new RangeError("No value supplied for attribute " + r);
    }
    t[r] = i;
  }
  return t;
}
function ev(n, e, t, r) {
  for (let i in e)
    if (!(i in n))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${i}`);
  for (let i in n) {
    let s = n[i];
    s.validate && s.validate(e[i]);
  }
}
function tv(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new DE(n, r, e[r]);
  return t;
}
let Wh = class nv {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = tv(e, r.attrs), this.defaultAttrs = Qy(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
  }
  /**
  True if this is an inline type.
  */
  get isInline() {
    return !this.isBlock;
  }
  /**
  True if this is a textblock type, a block that contains inline
  content.
  */
  get isTextblock() {
    return this.isBlock && this.inlineContent;
  }
  /**
  True for node types that allow no content.
  */
  get isLeaf() {
    return this.contentMatch == yi.empty;
  }
  /**
  True when this node is an atom, i.e. when it does not have
  directly editable content.
  */
  get isAtom() {
    return this.isLeaf || !!this.spec.atom;
  }
  /**
  Return true when this node type is part of the given
  [group](https://prosemirror.net/docs/ref/#model.NodeSpec.group).
  */
  isInGroup(e) {
    return this.groups.indexOf(e) > -1;
  }
  /**
  The node type's [whitespace](https://prosemirror.net/docs/ref/#model.NodeSpec.whitespace) option.
  */
  get whitespace() {
    return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
  }
  /**
  Tells you whether this node type has any required attributes.
  */
  hasRequiredAttrs() {
    for (let e in this.attrs)
      if (this.attrs[e].isRequired)
        return !0;
    return !1;
  }
  /**
  Indicates whether this node allows some of the same content as
  the given node type.
  */
  compatibleContent(e) {
    return this == e || this.contentMatch.compatible(e.contentMatch);
  }
  /**
  @internal
  */
  computeAttrs(e) {
    return !e && this.defaultAttrs ? this.defaultAttrs : Zy(this.attrs, e);
  }
  /**
  Create a `Node` of this type. The given attributes are
  checked and defaulted (you can pass `null` to use the type's
  defaults entirely, if no required attributes exist). `content`
  may be a `Fragment`, a node, an array of nodes, or
  `null`. Similarly `marks` may be `null` to default to the empty
  set of marks.
  */
  create(e = null, t, r) {
    if (this.isText)
      throw new Error("NodeType.create can't construct text nodes");
    return new xr(this, this.computeAttrs(e), R.from(t), Le.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = R.from(t), this.checkContent(t), new xr(this, this.computeAttrs(e), t, Le.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but see if it is
  necessary to add nodes to the start or end of the given fragment
  to make it fit the node. If no fitting wrapping can be found,
  return null. Note that, due to the fact that required nodes can
  always be created, this will always succeed if you pass null or
  `Fragment.empty` as content.
  */
  createAndFill(e = null, t, r) {
    if (e = this.computeAttrs(e), t = R.from(t), t.size) {
      let o = this.contentMatch.fillBefore(t);
      if (!o)
        return null;
      t = o.append(t);
    }
    let i = this.contentMatch.matchFragment(t), s = i && i.fillBefore(R.empty, !0);
    return s ? new xr(this, e, t.append(s), Le.setFrom(r)) : null;
  }
  /**
  Returns true if the given fragment is valid content for this node
  type.
  */
  validContent(e) {
    let t = this.contentMatch.matchFragment(e);
    if (!t || !t.validEnd)
      return !1;
    for (let r = 0; r < e.childCount; r++)
      if (!this.allowsMarks(e.child(r).marks))
        return !1;
    return !0;
  }
  /**
  Throws a RangeError if the given fragment is not valid content for this
  node type.
  @internal
  */
  checkContent(e) {
    if (!this.validContent(e))
      throw new RangeError(`Invalid content for node ${this.name}: ${e.toString().slice(0, 50)}`);
  }
  /**
  @internal
  */
  checkAttrs(e) {
    ev(this.attrs, e, "node", this.name);
  }
  /**
  Check whether the given mark type is allowed in this node.
  */
  allowsMarkType(e) {
    return this.markSet == null || this.markSet.indexOf(e) > -1;
  }
  /**
  Test whether the given set of marks are allowed in this node.
  */
  allowsMarks(e) {
    if (this.markSet == null)
      return !0;
    for (let t = 0; t < e.length; t++)
      if (!this.allowsMarkType(e[t].type))
        return !1;
    return !0;
  }
  /**
  Removes the marks that are not allowed in this node from the given set.
  */
  allowedMarks(e) {
    if (this.markSet == null)
      return e;
    let t;
    for (let r = 0; r < e.length; r++)
      this.allowsMarkType(e[r].type) ? t && t.push(e[r]) : t || (t = e.slice(0, r));
    return t ? t.length ? t : Le.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((s, o) => r[s] = new nv(s, t, o));
    let i = t.spec.topNode || "doc";
    if (!r[i])
      throw new RangeError("Schema is missing its top node type ('" + i + "')");
    if (!r.text)
      throw new RangeError("Every schema needs a 'text' type");
    for (let s in r.text.attrs)
      throw new RangeError("The text node type should not have attributes");
    return r;
  }
};
function IE(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let s = i === null ? "null" : typeof i;
    if (r.indexOf(s) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${s}`);
  };
}
class DE {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? IE(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class Cl {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = tv(e, i.attrs), this.excluded = null;
    let s = Qy(this.attrs);
    this.instance = s ? new Le(this, s) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new Le(this, Zy(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((s, o) => r[s] = new Cl(s, i++, t, o)), r;
  }
  /**
  When there is a mark of this type in the given set, a new set
  without it is returned. Otherwise, the input set is returned.
  */
  removeFromSet(e) {
    for (var t = 0; t < e.length; t++)
      e[t].type == this && (e = e.slice(0, t).concat(e.slice(t + 1)), t--);
    return e;
  }
  /**
  Tests whether there is a mark of this type in the given set.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (e[t].type == this)
        return e[t];
  }
  /**
  @internal
  */
  checkAttrs(e) {
    ev(this.attrs, e, "mark", this.name);
  }
  /**
  Queries whether a given mark type is
  [excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.
  */
  excludes(e) {
    return this.excluded.indexOf(e) > -1;
  }
}
class rv {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = lt.from(e.nodes), t.marks = lt.from(e.marks || {}), this.nodes = Wh.compile(this.spec.nodes, this), this.marks = Cl.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let s = this.nodes[i], o = s.spec.content || "", a = s.spec.marks;
      if (s.contentMatch = r[o] || (r[o] = yi.parse(o, this.nodes)), s.inlineContent = s.contentMatch.inlineContent, s.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!s.isInline || !s.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = s;
      }
      s.markSet = a == "_" ? null : a ? Uh(this, a.split(" ")) : a == "" || !s.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let s = this.marks[i], o = s.spec.excludes;
      s.excluded = o == null ? [s] : o == "" ? [] : Uh(this, o.split(" "));
    }
    this.nodeFromJSON = this.nodeFromJSON.bind(this), this.markFromJSON = this.markFromJSON.bind(this), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
  }
  /**
  Create a node in this schema. The `type` may be a string or a
  `NodeType` instance. Attributes will be extended with defaults,
  `content` may be a `Fragment`, `null`, a `Node`, or an array of
  nodes.
  */
  node(e, t = null, r, i) {
    if (typeof e == "string")
      e = this.nodeType(e);
    else if (e instanceof Wh) {
      if (e.schema != this)
        throw new RangeError("Node type from different schema used (" + e.name + ")");
    } else throw new RangeError("Invalid node type: " + e);
    return e.createChecked(t, r, i);
  }
  /**
  Create a text node in the schema. Empty text nodes are not
  allowed.
  */
  text(e, t) {
    let r = this.nodes.text;
    return new Ga(r, r.defaultAttrs, e, Le.setFrom(t));
  }
  /**
  Create a mark with the given type and attributes.
  */
  mark(e, t) {
    return typeof e == "string" && (e = this.marks[e]), e.create(t);
  }
  /**
  Deserialize a node from its JSON representation. This method is
  bound.
  */
  nodeFromJSON(e) {
    return xr.fromJSON(this, e);
  }
  /**
  Deserialize a mark from its JSON representation. This method is
  bound.
  */
  markFromJSON(e) {
    return Le.fromJSON(this, e);
  }
  /**
  @internal
  */
  nodeType(e) {
    let t = this.nodes[e];
    if (!t)
      throw new RangeError("Unknown node type: " + e);
    return t;
  }
}
function Uh(n, e) {
  let t = [];
  for (let r = 0; r < e.length; r++) {
    let i = e[r], s = n.marks[i], o = s;
    if (s)
      t.push(s);
    else
      for (let a in n.marks) {
        let l = n.marks[a];
        (i == "_" || l.spec.group && l.spec.group.split(" ").indexOf(i) > -1) && t.push(o = l);
      }
    if (!o)
      throw new SyntaxError("Unknown mark type: '" + e[r] + "'");
  }
  return t;
}
function LE(n) {
  return n.tag != null;
}
function RE(n) {
  return n.style != null;
}
class kr {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    t.forEach((i) => {
      if (LE(i))
        this.tags.push(i);
      else if (RE(i)) {
        let s = /[^=]*/.exec(i.style)[0];
        r.indexOf(s) < 0 && r.push(s), this.styles.push(i);
      }
    }), this.normalizeLists = !this.tags.some((i) => {
      if (!/^(ul|ol)\b/.test(i.tag) || !i.node)
        return !1;
      let s = e.nodes[i.node];
      return s.contentMatch.matchType(s);
    });
  }
  /**
  Parse a document from the content of a DOM node.
  */
  parse(e, t = {}) {
    let r = new Yh(this, t, !1);
    return r.addAll(e, Le.none, t.from, t.to), r.finish();
  }
  /**
  Parses the content of the given DOM node, like
  [`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse), and takes the same set of
  options. But unlike that method, which produces a whole node,
  this one returns a slice that is open at the sides, meaning that
  the schema constraints aren't applied to the start of nodes to
  the left of the input and the end of nodes at the end.
  */
  parseSlice(e, t = {}) {
    let r = new Yh(this, t, !0);
    return r.addAll(e, Le.none, t.from, t.to), G.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let s = this.tags[i];
      if (BE(e, s.tag) && (s.namespace === void 0 || e.namespaceURI == s.namespace) && (!s.context || t.matchesContext(s.context))) {
        if (s.getAttrs) {
          let o = s.getAttrs(e);
          if (o === !1)
            continue;
          s.attrs = o || void 0;
        }
        return s;
      }
    }
  }
  /**
  @internal
  */
  matchStyle(e, t, r, i) {
    for (let s = i ? this.styles.indexOf(i) + 1 : 0; s < this.styles.length; s++) {
      let o = this.styles[s], a = o.style;
      if (!(a.indexOf(e) != 0 || o.context && !r.matchesContext(o.context) || // Test that the style string either precisely matches the prop,
      // or has an '=' sign after the prop, followed by the given
      // value.
      a.length > e.length && (a.charCodeAt(e.length) != 61 || a.slice(e.length + 1) != t))) {
        if (o.getAttrs) {
          let l = o.getAttrs(t);
          if (l === !1)
            continue;
          o.attrs = l || void 0;
        }
        return o;
      }
    }
  }
  /**
  @internal
  */
  static schemaRules(e) {
    let t = [];
    function r(i) {
      let s = i.priority == null ? 50 : i.priority, o = 0;
      for (; o < t.length; o++) {
        let a = t[o];
        if ((a.priority == null ? 50 : a.priority) < s)
          break;
      }
      t.splice(o, 0, i);
    }
    for (let i in e.marks) {
      let s = e.marks[i].spec.parseDOM;
      s && s.forEach((o) => {
        r(o = qh(o)), o.mark || o.ignore || o.clearMark || (o.mark = i);
      });
    }
    for (let i in e.nodes) {
      let s = e.nodes[i].spec.parseDOM;
      s && s.forEach((o) => {
        r(o = qh(o)), o.node || o.ignore || o.mark || (o.node = i);
      });
    }
    return t;
  }
  /**
  Construct a DOM parser using the parsing rules listed in a
  schema's [node specs](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM), reordered by
  [priority](https://prosemirror.net/docs/ref/#model.ParseRule.priority).
  */
  static fromSchema(e) {
    return e.cached.domParser || (e.cached.domParser = new kr(e, kr.schemaRules(e)));
  }
}
const iv = {
  address: !0,
  article: !0,
  aside: !0,
  blockquote: !0,
  canvas: !0,
  dd: !0,
  div: !0,
  dl: !0,
  fieldset: !0,
  figcaption: !0,
  figure: !0,
  footer: !0,
  form: !0,
  h1: !0,
  h2: !0,
  h3: !0,
  h4: !0,
  h5: !0,
  h6: !0,
  header: !0,
  hgroup: !0,
  hr: !0,
  li: !0,
  noscript: !0,
  ol: !0,
  output: !0,
  p: !0,
  pre: !0,
  section: !0,
  table: !0,
  tfoot: !0,
  ul: !0
}, FE = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, sv = { ol: !0, ul: !0 }, Wa = 1, Ua = 2, to = 4;
function Kh(n, e, t) {
  return e != null ? (e ? Wa : 0) | (e === "full" ? Ua : 0) : n && n.whitespace == "pre" ? Wa | Ua : t & ~to;
}
class ua {
  constructor(e, t, r, i, s, o) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = o, this.content = [], this.activeMarks = Le.none, this.match = s || (o & to ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(R.from(e));
      if (t)
        this.match = this.type.contentMatch.matchFragment(t);
      else {
        let r = this.type.contentMatch, i;
        return (i = r.findWrapping(e.type)) ? (this.match = r, i) : null;
      }
    }
    return this.match.findWrapping(e.type);
  }
  finish(e) {
    if (!(this.options & Wa)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let s = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = s.withText(s.text.slice(0, s.text.length - i[0].length));
      }
    }
    let t = R.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(R.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !iv.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class Yh {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0;
    let i = t.topNode, s, o = Kh(null, t.preserveWhitespace, 0) | (r ? to : 0);
    i ? s = new ua(i.type, i.attrs, Le.none, !0, t.topMatch || i.type.contentMatch, o) : r ? s = new ua(null, null, Le.none, !0, null, o) : s = new ua(e.schema.topNodeType, null, Le.none, !0, null, o), this.nodes = [s], this.find = t.findPositions, this.needsBlock = !1;
  }
  get top() {
    return this.nodes[this.open];
  }
  // Add a DOM node to the content. Text is inserted as text node,
  // otherwise, the node is passed to `addElement` or, if it has a
  // `style` attribute, `addElementWithStyles`.
  addDOM(e, t) {
    e.nodeType == 3 ? this.addTextNode(e, t) : e.nodeType == 1 && this.addElement(e, t);
  }
  addTextNode(e, t) {
    let r = e.nodeValue, i = this.top;
    if (i.options & Ua || i.inlineContext(e) || /[^ \t\r\n\u000c]/.test(r)) {
      if (i.options & Wa)
        i.options & Ua ? r = r.replace(/\r\n?/g, `
`) : r = r.replace(/\r?\n|\r/g, " ");
      else if (r = r.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(r) && this.open == this.nodes.length - 1) {
        let s = i.content[i.content.length - 1], o = e.previousSibling;
        (!s || o && o.nodeName == "BR" || s.isText && /[ \t\r\n\u000c]$/.test(s.text)) && (r = r.slice(1));
      }
      r && this.insertNode(this.parser.schema.text(r), t), this.findInText(e);
    } else
      this.findInside(e);
  }
  // Try to find a handler for the given tag and use that to parse. If
  // none is found, the element's content nodes are added directly.
  addElement(e, t, r) {
    let i = e.nodeName.toLowerCase(), s;
    sv.hasOwnProperty(i) && this.parser.normalizeLists && $E(e);
    let o = this.options.ruleFromNode && this.options.ruleFromNode(e) || (s = this.parser.matchTag(e, this, r));
    if (o ? o.ignore : FE.hasOwnProperty(i))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!o || o.skip || o.closeParent) {
      o && o.closeParent ? this.open = Math.max(0, this.open - 1) : o && o.skip.nodeType && (e = o.skip);
      let a, l = this.top, c = this.needsBlock;
      if (iv.hasOwnProperty(i))
        l.content.length && l.content[0].isInline && this.open && (this.open--, l = this.top), a = !0, l.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e, t);
        return;
      }
      let u = o && o.skip ? t : this.readStyles(e, t);
      u && this.addAll(e, u), a && this.sync(l), this.needsBlock = c;
    } else {
      let a = this.readStyles(e, t);
      a && this.addElementByRule(e, o, a, o.consuming === !1 ? s : void 0);
    }
  }
  // Called for leaf DOM nodes that would otherwise be ignored
  leafFallback(e, t) {
    e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode(`
`), t);
  }
  // Called for ignored nodes
  ignoreFallback(e, t) {
    e.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"), t);
  }
  // Run any style parser associated with the node's styles. Either
  // return an updated array of marks, or null to indicate some of the
  // styles had a rule with `ignore` set.
  readStyles(e, t) {
    let r = e.style;
    if (r && r.length)
      for (let i = 0; i < this.parser.matchedStyles.length; i++) {
        let s = this.parser.matchedStyles[i], o = r.getPropertyValue(s);
        if (o)
          for (let a = void 0; ; ) {
            let l = this.parser.matchStyle(s, o, this, a);
            if (!l)
              break;
            if (l.ignore)
              return null;
            if (l.clearMark ? t = t.filter((c) => !l.clearMark(c)) : t = t.concat(this.parser.schema.marks[l.mark].create(l.attrs)), l.consuming === !1)
              a = l;
            else
              break;
          }
      }
    return t;
  }
  // Look up a handler for the given node. If none are found, return
  // false. Otherwise, apply it, use its return value to drive the way
  // the node's content is wrapped, and return true.
  addElementByRule(e, t, r, i) {
    let s, o;
    if (t.node)
      if (o = this.parser.schema.nodes[t.node], o.isLeaf)
        this.insertNode(o.create(t.attrs), r) || this.leafFallback(e, r);
      else {
        let l = this.enter(o, t.attrs || null, r, t.preserveWhitespace);
        l && (s = !0, r = l);
      }
    else {
      let l = this.parser.schema.marks[t.mark];
      r = r.concat(l.create(t.attrs));
    }
    let a = this.top;
    if (o && o.isLeaf)
      this.findInside(e);
    else if (i)
      this.addElement(e, r, i);
    else if (t.getContent)
      this.findInside(e), t.getContent(e, this.parser.schema).forEach((l) => this.insertNode(l, r));
    else {
      let l = e;
      typeof t.contentElement == "string" ? l = e.querySelector(t.contentElement) : typeof t.contentElement == "function" ? l = t.contentElement(e) : t.contentElement && (l = t.contentElement), this.findAround(e, l, !0), this.addAll(l, r), this.findAround(e, l, !1);
    }
    s && this.sync(a) && this.open--;
  }
  // Add all child nodes between `startIndex` and `endIndex` (or the
  // whole node, if not given). If `sync` is passed, use it to
  // synchronize after every block element.
  addAll(e, t, r, i) {
    let s = r || 0;
    for (let o = r ? e.childNodes[r] : e.firstChild, a = i == null ? null : e.childNodes[i]; o != a; o = o.nextSibling, ++s)
      this.findAtPoint(e, s), this.addDOM(o, t);
    this.findAtPoint(e, s);
  }
  // Try to find a way to fit the given node type into the current
  // context. May add intermediate wrappers and/or leave non-solid
  // nodes that we're in.
  findPlace(e, t) {
    let r, i;
    for (let s = this.open; s >= 0; s--) {
      let o = this.nodes[s], a = o.findWrapping(e);
      if (a && (!r || r.length > a.length) && (r = a, i = o, !a.length) || o.solid)
        break;
    }
    if (!r)
      return null;
    this.sync(i);
    for (let s = 0; s < r.length; s++)
      t = this.enterInner(r[s], null, t, !1);
    return t;
  }
  // Try to insert the given node, adjusting the context when needed.
  insertNode(e, t) {
    if (e.isInline && this.needsBlock && !this.top.type) {
      let i = this.textblockFromContext();
      i && (t = this.enterInner(i, null, t));
    }
    let r = this.findPlace(e, t);
    if (r) {
      this.closeExtra();
      let i = this.top;
      i.match && (i.match = i.match.matchType(e.type));
      let s = Le.none;
      for (let o of r.concat(e.marks))
        (i.type ? i.type.allowsMarkType(o.type) : Xh(o.type, e.type)) && (s = o.addToSet(s));
      return i.content.push(e.mark(s)), !0;
    }
    return !1;
  }
  // Try to start a node of the given type, adjusting the context when
  // necessary.
  enter(e, t, r, i) {
    let s = this.findPlace(e.create(t), r);
    return s && (s = this.enterInner(e, t, r, !0, i)), s;
  }
  // Open a node of the given type
  enterInner(e, t, r, i = !1, s) {
    this.closeExtra();
    let o = this.top;
    o.match = o.match && o.match.matchType(e);
    let a = Kh(e, s, o.options);
    o.options & to && o.content.length == 0 && (a |= to);
    let l = Le.none;
    return r = r.filter((c) => (o.type ? o.type.allowsMarkType(c.type) : Xh(c.type, e)) ? (l = c.addToSet(l), !1) : !0), this.nodes.push(new ua(e, t, l, i, null, a)), this.open++, r;
  }
  // Make sure all nodes above this.open are finished and added to
  // their parents
  closeExtra(e = !1) {
    let t = this.nodes.length - 1;
    if (t > this.open) {
      for (; t > this.open; t--)
        this.nodes[t - 1].content.push(this.nodes[t].finish(e));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(this.isOpen || this.options.topOpen);
  }
  sync(e) {
    for (let t = this.open; t >= 0; t--)
      if (this.nodes[t] == e)
        return this.open = t, !0;
    return !1;
  }
  get currentPos() {
    this.closeExtra();
    let e = 0;
    for (let t = this.open; t >= 0; t--) {
      let r = this.nodes[t].content;
      for (let i = r.length - 1; i >= 0; i--)
        e += r[i].nodeSize;
      t && e++;
    }
    return e;
  }
  findAtPoint(e, t) {
    if (this.find)
      for (let r = 0; r < this.find.length; r++)
        this.find[r].node == e && this.find[r].offset == t && (this.find[r].pos = this.currentPos);
  }
  findInside(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].pos == null && e.nodeType == 1 && e.contains(this.find[t].node) && (this.find[t].pos = this.currentPos);
  }
  findAround(e, t, r) {
    if (e != t && this.find)
      for (let i = 0; i < this.find.length; i++)
        this.find[i].pos == null && e.nodeType == 1 && e.contains(this.find[i].node) && t.compareDocumentPosition(this.find[i].node) & (r ? 2 : 4) && (this.find[i].pos = this.currentPos);
  }
  findInText(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].node == e && (this.find[t].pos = this.currentPos - (e.nodeValue.length - this.find[t].offset));
  }
  // Determines whether the given context string matches this context.
  matchesContext(e) {
    if (e.indexOf("|") > -1)
      return e.split(/\s*\|\s*/).some(this.matchesContext, this);
    let t = e.split("/"), r = this.options.context, i = !this.isOpen && (!r || r.parent.type == this.nodes[0].type), s = -(r ? r.depth + 1 : 0) + (i ? 0 : 1), o = (a, l) => {
      for (; a >= 0; a--) {
        let c = t[a];
        if (c == "") {
          if (a == t.length - 1 || a == 0)
            continue;
          for (; l >= s; l--)
            if (o(a - 1, l))
              return !0;
          return !1;
        } else {
          let u = l > 0 || l == 0 && i ? this.nodes[l].type : r && l >= s ? r.node(l - s).type : null;
          if (!u || u.name != c && !u.isInGroup(c))
            return !1;
          l--;
        }
      }
      return !0;
    };
    return o(t.length - 1, this.open);
  }
  textblockFromContext() {
    let e = this.options.context;
    if (e)
      for (let t = e.depth; t >= 0; t--) {
        let r = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
        if (r && r.isTextblock && r.defaultAttrs)
          return r;
      }
    for (let t in this.parser.schema.nodes) {
      let r = this.parser.schema.nodes[t];
      if (r.isTextblock && r.defaultAttrs)
        return r;
    }
  }
}
function $E(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && sv.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function BE(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function qh(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function Xh(n, e) {
  let t = e.schema.nodes;
  for (let r in t) {
    let i = t[r];
    if (!i.allowsMarkType(n))
      continue;
    let s = [], o = (a) => {
      s.push(a);
      for (let l = 0; l < a.edgeCount; l++) {
        let { type: c, next: u } = a.edge(l);
        if (c == e || s.indexOf(u) < 0 && o(u))
          return !0;
      }
    };
    if (o(i.contentMatch))
      return !0;
  }
}
class Oi {
  /**
  Create a serializer. `nodes` should map node names to functions
  that take a node and return a description of the corresponding
  DOM. `marks` does the same for mark names, but also gets an
  argument that tells it whether the mark's content is block or
  inline content (for typical use, it'll always be inline). A mark
  serializer may be `null` to indicate that marks of that type
  should not be serialized.
  */
  constructor(e, t) {
    this.nodes = e, this.marks = t;
  }
  /**
  Serialize the content of this fragment to a DOM fragment. When
  not in the browser, the `document` option, containing a DOM
  document, should be passed so that the serializer can create
  nodes.
  */
  serializeFragment(e, t = {}, r) {
    r || (r = pc(t).createDocumentFragment());
    let i = r, s = [];
    return e.forEach((o) => {
      if (s.length || o.marks.length) {
        let a = 0, l = 0;
        for (; a < s.length && l < o.marks.length; ) {
          let c = o.marks[l];
          if (!this.marks[c.type.name]) {
            l++;
            continue;
          }
          if (!c.eq(s[a][0]) || c.type.spec.spanning === !1)
            break;
          a++, l++;
        }
        for (; a < s.length; )
          i = s.pop()[1];
        for (; l < o.marks.length; ) {
          let c = o.marks[l++], u = this.serializeMark(c, o.isInline, t);
          u && (s.push([c, i]), i.appendChild(u.dom), i = u.contentDOM || u.dom);
        }
      }
      i.appendChild(this.serializeNodeInner(o, t));
    }), r;
  }
  /**
  @internal
  */
  serializeNodeInner(e, t) {
    let { dom: r, contentDOM: i } = Ea(pc(t), this.nodes[e.type.name](e), null, e.attrs);
    if (i) {
      if (e.isLeaf)
        throw new RangeError("Content hole not allowed in a leaf node spec");
      this.serializeFragment(e.content, t, i);
    }
    return r;
  }
  /**
  Serialize this node to a DOM node. This can be useful when you
  need to serialize a part of a document, as opposed to the whole
  document. To serialize a whole document, use
  [`serializeFragment`](https://prosemirror.net/docs/ref/#model.DOMSerializer.serializeFragment) on
  its [content](https://prosemirror.net/docs/ref/#model.Node.content).
  */
  serializeNode(e, t = {}) {
    let r = this.serializeNodeInner(e, t);
    for (let i = e.marks.length - 1; i >= 0; i--) {
      let s = this.serializeMark(e.marks[i], e.isInline, t);
      s && ((s.contentDOM || s.dom).appendChild(r), r = s.dom);
    }
    return r;
  }
  /**
  @internal
  */
  serializeMark(e, t, r = {}) {
    let i = this.marks[e.type.name];
    return i && Ea(pc(r), i(e, t), null, e.attrs);
  }
  static renderSpec(e, t, r = null, i) {
    return Ea(e, t, r, i);
  }
  /**
  Build a serializer using the [`toDOM`](https://prosemirror.net/docs/ref/#model.NodeSpec.toDOM)
  properties in a schema's node and mark specs.
  */
  static fromSchema(e) {
    return e.cached.domSerializer || (e.cached.domSerializer = new Oi(this.nodesFromSchema(e), this.marksFromSchema(e)));
  }
  /**
  Gather the serializers in a schema's node specs into an object.
  This can be useful as a base to build a custom serializer from.
  */
  static nodesFromSchema(e) {
    let t = Jh(e.nodes);
    return t.text || (t.text = (r) => r.text), t;
  }
  /**
  Gather the serializers in a schema's mark specs into an object.
  */
  static marksFromSchema(e) {
    return Jh(e.marks);
  }
}
function Jh(n) {
  let e = {};
  for (let t in n) {
    let r = n[t].spec.toDOM;
    r && (e[t] = r);
  }
  return e;
}
function pc(n) {
  return n.document || window.document;
}
const Qh = /* @__PURE__ */ new WeakMap();
function jE(n) {
  let e = Qh.get(n);
  return e === void 0 && Qh.set(n, e = VE(n)), e;
}
function VE(n) {
  let e = null;
  function t(r) {
    if (r && typeof r == "object")
      if (Array.isArray(r))
        if (typeof r[0] == "string")
          e || (e = []), e.push(r);
        else
          for (let i = 0; i < r.length; i++)
            t(r[i]);
      else
        for (let i in r)
          t(r[i]);
  }
  return t(n), e;
}
function Ea(n, e, t, r) {
  if (typeof e == "string")
    return { dom: n.createTextNode(e) };
  if (e.nodeType != null)
    return { dom: e };
  if (e.dom && e.dom.nodeType != null)
    return e;
  let i = e[0], s;
  if (typeof i != "string")
    throw new RangeError("Invalid array passed to renderSpec");
  if (r && (s = jE(r)) && s.indexOf(e) > -1)
    throw new RangeError("Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.");
  let o = i.indexOf(" ");
  o > 0 && (t = i.slice(0, o), i = i.slice(o + 1));
  let a, l = t ? n.createElementNS(t, i) : n.createElement(i), c = e[1], u = 1;
  if (c && typeof c == "object" && c.nodeType == null && !Array.isArray(c)) {
    u = 2;
    for (let f in c)
      if (c[f] != null) {
        let d = f.indexOf(" ");
        d > 0 ? l.setAttributeNS(f.slice(0, d), f.slice(d + 1), c[f]) : l.setAttribute(f, c[f]);
      }
  }
  for (let f = u; f < e.length; f++) {
    let d = e[f];
    if (d === 0) {
      if (f < e.length - 1 || f > u)
        throw new RangeError("Content hole must be the only child of its parent node");
      return { dom: l, contentDOM: l };
    } else {
      let { dom: p, contentDOM: h } = Ea(n, d, t, r);
      if (l.appendChild(p), h) {
        if (a)
          throw new RangeError("Multiple content holes");
        a = h;
      }
    }
  }
  return { dom: l, contentDOM: a };
}
const ov = 65535, av = Math.pow(2, 16);
function zE(n, e) {
  return n + e * av;
}
function Zh(n) {
  return n & ov;
}
function HE(n) {
  return (n - (n & ov)) / av;
}
const lv = 1, cv = 2, Ma = 4, uv = 8;
class Cu {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.pos = e, this.delInfo = t, this.recover = r;
  }
  /**
  Tells you whether the position was deleted, that is, whether the
  step removed the token on the side queried (via the `assoc`)
  argument from the document.
  */
  get deleted() {
    return (this.delInfo & uv) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (lv | Ma)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (cv | Ma)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & Ma) > 0;
  }
}
class $t {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && $t.empty)
      return $t.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = Zh(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + HE(e);
  }
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  map(e, t = 1) {
    return this._map(e, t, !0);
  }
  /**
  @internal
  */
  _map(e, t, r) {
    let i = 0, s = this.inverted ? 2 : 1, o = this.inverted ? 1 : 2;
    for (let a = 0; a < this.ranges.length; a += 3) {
      let l = this.ranges[a] - (this.inverted ? i : 0);
      if (l > e)
        break;
      let c = this.ranges[a + s], u = this.ranges[a + o], f = l + c;
      if (e <= f) {
        let d = c ? e == l ? -1 : e == f ? 1 : t : t, p = l + i + (d < 0 ? 0 : u);
        if (r)
          return p;
        let h = e == (t < 0 ? l : f) ? null : zE(a / 3, e - l), m = e == l ? cv : e == f ? lv : Ma;
        return (t < 0 ? e != l : e != f) && (m |= uv), new Cu(p, m, h);
      }
      i += u - c;
    }
    return r ? e + i : new Cu(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = Zh(t), s = this.inverted ? 2 : 1, o = this.inverted ? 1 : 2;
    for (let a = 0; a < this.ranges.length; a += 3) {
      let l = this.ranges[a] - (this.inverted ? r : 0);
      if (l > e)
        break;
      let c = this.ranges[a + s], u = l + c;
      if (e <= u && a == i * 3)
        return !0;
      r += this.ranges[a + o] - c;
    }
    return !1;
  }
  /**
  Calls the given function on each of the changed ranges included in
  this map.
  */
  forEach(e) {
    let t = this.inverted ? 2 : 1, r = this.inverted ? 1 : 2;
    for (let i = 0, s = 0; i < this.ranges.length; i += 3) {
      let o = this.ranges[i], a = o - (this.inverted ? s : 0), l = o + (this.inverted ? 0 : s), c = this.ranges[i + t], u = this.ranges[i + r];
      e(a, a + c, l, l + u), s += u - c;
    }
  }
  /**
  Create an inverted version of this map. The result can be used to
  map positions in the post-step document to the pre-step document.
  */
  invert() {
    return new $t(this.ranges, !this.inverted);
  }
  /**
  @internal
  */
  toString() {
    return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
  }
  /**
  Create a map that moves all positions by offset `n` (which may be
  negative). This can be useful when applying steps meant for a
  sub-document to a larger document, or vice-versa.
  */
  static offset(e) {
    return e == 0 ? $t.empty : new $t(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
$t.empty = new $t([]);
class Yi {
  /**
  Create a new mapping with the given position maps.
  */
  constructor(e = [], t, r = 0, i = e.length) {
    this.maps = e, this.mirror = t, this.from = r, this.to = i;
  }
  /**
  Create a mapping that maps only through a part of this one.
  */
  slice(e = 0, t = this.maps.length) {
    return new Yi(this.maps, this.mirror, e, t);
  }
  /**
  @internal
  */
  copy() {
    return new Yi(this.maps.slice(), this.mirror && this.mirror.slice(), this.from, this.to);
  }
  /**
  Add a step map to the end of this mapping. If `mirrors` is
  given, it should be the index of the step map that is the mirror
  image of this one.
  */
  appendMap(e, t) {
    this.to = this.maps.push(e), t != null && this.setMirror(this.maps.length - 1, t);
  }
  /**
  Add all the step maps in a given mapping to this one (preserving
  mirroring information).
  */
  appendMapping(e) {
    for (let t = 0, r = this.maps.length; t < e.maps.length; t++) {
      let i = e.getMirror(t);
      this.appendMap(e.maps[t], i != null && i < t ? r + i : void 0);
    }
  }
  /**
  Finds the offset of the step map that mirrors the map at the
  given offset, in this mapping (as per the second argument to
  `appendMap`).
  */
  getMirror(e) {
    if (this.mirror) {
      for (let t = 0; t < this.mirror.length; t++)
        if (this.mirror[t] == e)
          return this.mirror[t + (t % 2 ? -1 : 1)];
    }
  }
  /**
  @internal
  */
  setMirror(e, t) {
    this.mirror || (this.mirror = []), this.mirror.push(e, t);
  }
  /**
  Append the inverse of the given mapping to this one.
  */
  appendMappingInverted(e) {
    for (let t = e.maps.length - 1, r = this.maps.length + e.maps.length; t >= 0; t--) {
      let i = e.getMirror(t);
      this.appendMap(e.maps[t].invert(), i != null && i > t ? r - i - 1 : void 0);
    }
  }
  /**
  Create an inverted version of this mapping.
  */
  invert() {
    let e = new Yi();
    return e.appendMappingInverted(this), e;
  }
  /**
  Map a position through this mapping.
  */
  map(e, t = 1) {
    if (this.mirror)
      return this._map(e, t, !0);
    for (let r = this.from; r < this.to; r++)
      e = this.maps[r].map(e, t);
    return e;
  }
  /**
  Map a position through this mapping, returning a mapping
  result.
  */
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  /**
  @internal
  */
  _map(e, t, r) {
    let i = 0;
    for (let s = this.from; s < this.to; s++) {
      let o = this.maps[s], a = o.mapResult(e, t);
      if (a.recover != null) {
        let l = this.getMirror(s);
        if (l != null && l > s && l < this.to) {
          s = l, e = this.maps[l].recover(a.recover);
          continue;
        }
      }
      i |= a.delInfo, e = a.pos;
    }
    return r ? e : new Cu(e, i, null);
  }
}
const mc = /* @__PURE__ */ Object.create(null);
class vt {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return $t.empty;
  }
  /**
  Try to merge this step with another one, to be applied directly
  after it. Returns the merged step when possible, null if the
  steps can't be merged.
  */
  merge(e) {
    return null;
  }
  /**
  Deserialize a step from its JSON representation. Will call
  through to the step class' own implementation of this method.
  */
  static fromJSON(e, t) {
    if (!t || !t.stepType)
      throw new RangeError("Invalid input for Step.fromJSON");
    let r = mc[t.stepType];
    if (!r)
      throw new RangeError(`No step type ${t.stepType} defined`);
    return r.fromJSON(e, t);
  }
  /**
  To be able to serialize steps to JSON, each step needs a string
  ID to attach to its JSON representation. Use this method to
  register an ID for your step classes. Try to pick something
  that's unlikely to clash with steps from other modules.
  */
  static jsonID(e, t) {
    if (e in mc)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return mc[e] = t, t.prototype.jsonID = e, t;
  }
}
class Xe {
  /**
  @internal
  */
  constructor(e, t) {
    this.doc = e, this.failed = t;
  }
  /**
  Create a successful step result.
  */
  static ok(e) {
    return new Xe(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new Xe(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, i) {
    try {
      return Xe.ok(e.replace(t, r, i));
    } catch (s) {
      if (s instanceof Va)
        return Xe.fail(s.message);
      throw s;
    }
  }
}
function Lf(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let s = n.child(i);
    s.content.size && (s = s.copy(Lf(s.content, e, s))), s.isInline && (s = e(s, t, i)), r.push(s);
  }
  return R.fromArray(r);
}
class br extends vt {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), s = new G(Lf(t.content, (o, a) => !o.isAtom || !a.type.allowsMarkType(this.mark.type) ? o : o.mark(this.mark.addToSet(o.marks)), i), t.openStart, t.openEnd);
    return Xe.fromReplace(e, this.from, this.to, s);
  }
  invert() {
    return new In(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new br(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof br && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new br(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "addMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    return new br(t.from, t.to, e.markFromJSON(t.mark));
  }
}
vt.jsonID("addMark", br);
class In extends vt {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new G(Lf(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return Xe.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new br(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new In(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof In && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new In(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "removeMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    return new In(t.from, t.to, e.markFromJSON(t.mark));
  }
}
vt.jsonID("removeMark", In);
class wr extends vt {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return Xe.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return Xe.fromReplace(e, this.pos, this.pos + 1, new G(R.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(r))
            return new wr(this.pos, t.marks[i]);
        return new wr(this.pos, this.mark);
      }
    }
    return new ts(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new wr(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "addNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
    return new wr(t.pos, e.markFromJSON(t.mark));
  }
}
vt.jsonID("addNodeMark", wr);
class ts extends vt {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return Xe.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return Xe.fromReplace(e, this.pos, this.pos + 1, new G(R.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new wr(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new ts(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "removeNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
    return new ts(t.pos, e.markFromJSON(t.mark));
  }
}
vt.jsonID("removeNodeMark", ts);
class it extends vt {
  /**
  The given `slice` should fit the 'gap' between `from` and
  `to`—the depths must line up, and the surrounding nodes must be
  able to be joined with the open sides of the slice. When
  `structure` is true, the step will fail if the content between
  from and to is not just a sequence of closing and then opening
  tokens (this is to guard against rebased replace steps
  overwriting something they weren't supposed to).
  */
  constructor(e, t, r, i = !1) {
    super(), this.from = e, this.to = t, this.slice = r, this.structure = i;
  }
  apply(e) {
    return this.structure && _u(e, this.from, this.to) ? Xe.fail("Structure replace would overwrite content") : Xe.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new $t([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new it(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deletedAcross && r.deletedAcross ? null : new it(t.pos, Math.max(t.pos, r.pos), this.slice);
  }
  merge(e) {
    if (!(e instanceof it) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? G.empty : new G(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new it(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? G.empty : new G(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new it(e.from, this.to, t, this.structure);
    } else
      return null;
  }
  toJSON() {
    let e = { stepType: "replace", from: this.from, to: this.to };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    return new it(t.from, t.to, G.fromJSON(e, t.slice), !!t.structure);
  }
}
vt.jsonID("replace", it);
class st extends vt {
  /**
  Create a replace-around step with the given range and gap.
  `insert` should be the point in the slice into which the content
  of the gap should be moved. `structure` has the same meaning as
  it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.
  */
  constructor(e, t, r, i, s, o, a = !1) {
    super(), this.from = e, this.to = t, this.gapFrom = r, this.gapTo = i, this.slice = s, this.insert = o, this.structure = a;
  }
  apply(e) {
    if (this.structure && (_u(e, this.from, this.gapFrom) || _u(e, this.gapTo, this.to)))
      return Xe.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return Xe.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? Xe.fromReplace(e, this.from, this.to, r) : Xe.fail("Content does not fit in gap");
  }
  getMap() {
    return new $t([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  }
  invert(e) {
    let t = this.gapTo - this.gapFrom;
    return new st(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), s = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || i < t.pos || s > r.pos ? null : new st(t.pos, r.pos, i, s, this.slice, this.insert, this.structure);
  }
  toJSON() {
    let e = {
      stepType: "replaceAround",
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert
    };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number" || typeof t.gapFrom != "number" || typeof t.gapTo != "number" || typeof t.insert != "number")
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    return new st(t.from, t.to, t.gapFrom, t.gapTo, G.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
vt.jsonID("replaceAround", st);
function _u(n, e, t) {
  let r = n.resolve(e), i = t - e, s = r.depth;
  for (; i > 0 && s > 0 && r.indexAfter(s) == r.node(s).childCount; )
    s--, i--;
  if (i > 0) {
    let o = r.node(s).maybeChild(r.indexAfter(s));
    for (; i > 0; ) {
      if (!o || o.isLeaf)
        return !0;
      o = o.firstChild, i--;
    }
  }
  return !1;
}
function GE(n, e, t, r) {
  let i = [], s = [], o, a;
  n.doc.nodesBetween(e, t, (l, c, u) => {
    if (!l.isInline)
      return;
    let f = l.marks;
    if (!r.isInSet(f) && u.type.allowsMarkType(r.type)) {
      let d = Math.max(c, e), p = Math.min(c + l.nodeSize, t), h = r.addToSet(f);
      for (let m = 0; m < f.length; m++)
        f[m].isInSet(h) || (o && o.to == d && o.mark.eq(f[m]) ? o.to = p : i.push(o = new In(d, p, f[m])));
      a && a.to == d ? a.to = p : s.push(a = new br(d, p, r));
    }
  }), i.forEach((l) => n.step(l)), s.forEach((l) => n.step(l));
}
function WE(n, e, t, r) {
  let i = [], s = 0;
  n.doc.nodesBetween(e, t, (o, a) => {
    if (!o.isInline)
      return;
    s++;
    let l = null;
    if (r instanceof Cl) {
      let c = o.marks, u;
      for (; u = r.isInSet(c); )
        (l || (l = [])).push(u), c = u.removeFromSet(c);
    } else r ? r.isInSet(o.marks) && (l = [r]) : l = o.marks;
    if (l && l.length) {
      let c = Math.min(a + o.nodeSize, t);
      for (let u = 0; u < l.length; u++) {
        let f = l[u], d;
        for (let p = 0; p < i.length; p++) {
          let h = i[p];
          h.step == s - 1 && f.eq(i[p].style) && (d = h);
        }
        d ? (d.to = c, d.step = s) : i.push({ style: f, from: Math.max(a, e), to: c, step: s });
      }
    }
  }), i.forEach((o) => n.step(new In(o.from, o.to, o.style)));
}
function Rf(n, e, t, r = t.contentMatch, i = !0) {
  let s = n.doc.nodeAt(e), o = [], a = e + 1;
  for (let l = 0; l < s.childCount; l++) {
    let c = s.child(l), u = a + c.nodeSize, f = r.matchType(c.type);
    if (!f)
      o.push(new it(a, u, G.empty));
    else {
      r = f;
      for (let d = 0; d < c.marks.length; d++)
        t.allowsMarkType(c.marks[d].type) || n.step(new In(a, u, c.marks[d]));
      if (i && c.isText && t.whitespace != "pre") {
        let d, p = /\r?\n|\r/g, h;
        for (; d = p.exec(c.text); )
          h || (h = new G(R.from(t.schema.text(" ", t.allowedMarks(c.marks))), 0, 0)), o.push(new it(a + d.index, a + d.index + d[0].length, h));
      }
    }
    a = u;
  }
  if (!r.validEnd) {
    let l = r.fillBefore(R.empty, !0);
    n.replace(a, a, new G(l, 0, 0));
  }
  for (let l = o.length - 1; l >= 0; l--)
    n.step(o[l]);
}
function UE(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function _s(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth; ; --r) {
    let i = n.$from.node(r), s = n.$from.index(r), o = n.$to.indexAfter(r);
    if (r < n.depth && i.canReplace(s, o, t))
      return r;
    if (r == 0 || i.type.spec.isolating || !UE(i, s, o))
      break;
  }
  return null;
}
function KE(n, e, t) {
  let { $from: r, $to: i, depth: s } = e, o = r.before(s + 1), a = i.after(s + 1), l = o, c = a, u = R.empty, f = 0;
  for (let h = s, m = !1; h > t; h--)
    m || r.index(h) > 0 ? (m = !0, u = R.from(r.node(h).copy(u)), f++) : l--;
  let d = R.empty, p = 0;
  for (let h = s, m = !1; h > t; h--)
    m || i.after(h + 1) < i.end(h) ? (m = !0, d = R.from(i.node(h).copy(d)), p++) : c++;
  n.step(new st(l, c, o, a, new G(u.append(d), f, p), u.size - f, !0));
}
function Ff(n, e, t = null, r = n) {
  let i = YE(n, e), s = i && qE(r, e);
  return s ? i.map(ep).concat({ type: e, attrs: t }).concat(s.map(ep)) : null;
}
function ep(n) {
  return { type: n, attrs: null };
}
function YE(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, s = t.contentMatchAt(r).findWrapping(e);
  if (!s)
    return null;
  let o = s.length ? s[0] : e;
  return t.canReplaceWith(r, i, o) ? s : null;
}
function qE(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, s = t.child(r), o = e.contentMatch.findWrapping(s.type);
  if (!o)
    return null;
  let l = (o.length ? o[o.length - 1] : e).contentMatch;
  for (let c = r; l && c < i; c++)
    l = l.matchType(t.child(c).type);
  return !l || !l.validEnd ? null : o;
}
function XE(n, e, t) {
  let r = R.empty;
  for (let o = t.length - 1; o >= 0; o--) {
    if (r.size) {
      let a = t[o].type.contentMatch.matchFragment(r);
      if (!a || !a.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = R.from(t[o].type.create(t[o].attrs, r));
  }
  let i = e.start, s = e.end;
  n.step(new st(i, s, i, s, new G(r, 0, 0), t.length, !0));
}
function JE(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let s = n.steps.length;
  n.doc.nodesBetween(e, t, (o, a) => {
    let l = typeof i == "function" ? i(o) : i;
    if (o.isTextblock && !o.hasMarkup(r, l) && QE(n.doc, n.mapping.slice(s).map(a), r)) {
      let c = null;
      if (r.schema.linebreakReplacement) {
        let p = r.whitespace == "pre", h = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        p && !h ? c = !1 : !p && h && (c = !0);
      }
      c === !1 && dv(n, o, a, s), Rf(n, n.mapping.slice(s).map(a, 1), r, void 0, c === null);
      let u = n.mapping.slice(s), f = u.map(a, 1), d = u.map(a + o.nodeSize, 1);
      return n.step(new st(f, d, f + 1, d - 1, new G(R.from(r.create(l, null, o.marks)), 0, 0), 1, !0)), c === !0 && fv(n, o, a, s), !1;
    }
  });
}
function fv(n, e, t, r) {
  e.forEach((i, s) => {
    if (i.isText) {
      let o, a = /\r?\n|\r/g;
      for (; o = a.exec(i.text); ) {
        let l = n.mapping.slice(r).map(t + 1 + s + o.index);
        n.replaceWith(l, l + 1, e.type.schema.linebreakReplacement.create());
      }
    }
  });
}
function dv(n, e, t, r) {
  e.forEach((i, s) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let o = n.mapping.slice(r).map(t + 1 + s);
      n.replaceWith(o, o + 1, e.type.schema.text(`
`));
    }
  });
}
function QE(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function ZE(n, e, t, r, i) {
  let s = n.doc.nodeAt(e);
  if (!s)
    throw new RangeError("No node at given position");
  t || (t = s.type);
  let o = t.create(r, null, i || s.marks);
  if (s.isLeaf)
    return n.replaceWith(e, e + s.nodeSize, o);
  if (!t.validContent(s.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new st(e, e + s.nodeSize, e + 1, e + s.nodeSize - 1, new G(R.from(o), 0, 0), 1, !0));
}
function qi(n, e, t = 1, r) {
  let i = n.resolve(e), s = i.depth - t, o = r && r[r.length - 1] || i.parent;
  if (s < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !o.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let c = i.depth - 1, u = t - 2; c > s; c--, u--) {
    let f = i.node(c), d = i.index(c);
    if (f.type.spec.isolating)
      return !1;
    let p = f.content.cutByIndex(d, f.childCount), h = r && r[u + 1];
    h && (p = p.replaceChild(0, h.type.create(h.attrs)));
    let m = r && r[u] || f;
    if (!f.canReplace(d + 1, f.childCount) || !m.type.validContent(p))
      return !1;
  }
  let a = i.indexAfter(s), l = r && r[0];
  return i.node(s).canReplaceWith(a, a, l ? l.type : i.node(s + 1).type);
}
function e2(n, e, t = 1, r) {
  let i = n.doc.resolve(e), s = R.empty, o = R.empty;
  for (let a = i.depth, l = i.depth - t, c = t - 1; a > l; a--, c--) {
    s = R.from(i.node(a).copy(s));
    let u = r && r[c];
    o = R.from(u ? u.type.create(u.attrs, o) : i.node(a).copy(o));
  }
  n.step(new it(e, e, new G(s.append(o), t, t), !0));
}
function Vr(n, e) {
  let t = n.resolve(e), r = t.index();
  return hv(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function t2(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: r } = n.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let s = e.child(i), o = s.type == r ? n.type.schema.nodes.text : s.type;
    if (t = t.matchType(o), !t || !n.type.allowsMarks(s.marks))
      return !1;
  }
  return t.validEnd;
}
function hv(n, e) {
  return !!(n && e && !n.isLeaf && t2(n, e));
}
function _l(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let s, o, a = r.index(i);
    if (i == r.depth ? (s = r.nodeBefore, o = r.nodeAfter) : t > 0 ? (s = r.node(i + 1), a++, o = r.node(i).maybeChild(a)) : (s = r.node(i).maybeChild(a - 1), o = r.node(i + 1)), s && !s.isTextblock && hv(s, o) && r.node(i).canReplace(a, a + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function n2(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, s = n.doc.resolve(e - t), o = s.node().type;
  if (i && o.inlineContent) {
    let u = o.whitespace == "pre", f = !!o.contentMatch.matchType(i);
    u && !f ? r = !1 : !u && f && (r = !0);
  }
  let a = n.steps.length;
  if (r === !1) {
    let u = n.doc.resolve(e + t);
    dv(n, u.node(), u.before(), a);
  }
  o.inlineContent && Rf(n, e + t - 1, o, s.node().contentMatchAt(s.index()), r == null);
  let l = n.mapping.slice(a), c = l.map(e - t);
  if (n.step(new it(c, l.map(e + t, -1), G.empty, !0)), r === !0) {
    let u = n.doc.resolve(c);
    fv(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function r2(n, e, t) {
  let r = n.resolve(e);
  if (r.parent.canReplaceWith(r.index(), r.index(), t))
    return e;
  if (r.parentOffset == 0)
    for (let i = r.depth - 1; i >= 0; i--) {
      let s = r.index(i);
      if (r.node(i).canReplaceWith(s, s, t))
        return r.before(i + 1);
      if (s > 0)
        return null;
    }
  if (r.parentOffset == r.parent.content.size)
    for (let i = r.depth - 1; i >= 0; i--) {
      let s = r.indexAfter(i);
      if (r.node(i).canReplaceWith(s, s, t))
        return r.after(i + 1);
      if (s < r.node(i).childCount)
        return null;
    }
  return null;
}
function pv(n, e, t) {
  let r = n.resolve(e);
  if (!t.content.size)
    return e;
  let i = t.content;
  for (let s = 0; s < t.openStart; s++)
    i = i.firstChild.content;
  for (let s = 1; s <= (t.openStart == 0 && t.size ? 2 : 1); s++)
    for (let o = r.depth; o >= 0; o--) {
      let a = o == r.depth ? 0 : r.pos <= (r.start(o + 1) + r.end(o + 1)) / 2 ? -1 : 1, l = r.index(o) + (a > 0 ? 1 : 0), c = r.node(o), u = !1;
      if (s == 1)
        u = c.canReplace(l, l, i);
      else {
        let f = c.contentMatchAt(l).findWrapping(i.firstChild.type);
        u = f && c.canReplaceWith(l, l, f[0]);
      }
      if (u)
        return a == 0 ? r.pos : a < 0 ? r.before(o + 1) : r.after(o + 1);
    }
  return null;
}
function Sl(n, e, t = e, r = G.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), s = n.resolve(t);
  return mv(i, s, r) ? new it(e, t, r) : new i2(i, s, r).fit();
}
function mv(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class i2 {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = R.empty;
    for (let i = 0; i <= e.depth; i++) {
      let s = e.node(i);
      this.frontier.push({
        type: s.type,
        match: s.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = R.from(e.node(i).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let c = this.findFittable();
      c ? this.placeNodes(c) : this.openMore() || this.dropNode();
    }
    let e = this.mustMoveInline(), t = this.placed.size - this.depth - this.$from.depth, r = this.$from, i = this.close(e < 0 ? this.$to : r.doc.resolve(e));
    if (!i)
      return null;
    let s = this.placed, o = r.depth, a = i.depth;
    for (; o && a && s.childCount == 1; )
      s = s.firstChild.content, o--, a--;
    let l = new G(s, o, a);
    return e > -1 ? new st(r.pos, e, this.$to.pos, this.$to.end(), l, t) : l.size || r.pos != this.$to.pos ? new it(r.pos, i.pos, l) : null;
  }
  // Find a position on the start spine of `this.unplaced` that has
  // content that can be moved somewhere on the frontier. Returns two
  // depths, one for the slice and one for the frontier.
  findFittable() {
    let e = this.unplaced.openStart;
    for (let t = this.unplaced.content, r = 0, i = this.unplaced.openEnd; r < e; r++) {
      let s = t.firstChild;
      if (t.childCount > 1 && (i = 0), s.type.spec.isolating && i <= r) {
        e = r;
        break;
      }
      t = s.content;
    }
    for (let t = 1; t <= 2; t++)
      for (let r = t == 1 ? e : this.unplaced.openStart; r >= 0; r--) {
        let i, s = null;
        r ? (s = gc(this.unplaced.content, r - 1).firstChild, i = s.content) : i = this.unplaced.content;
        let o = i.firstChild;
        for (let a = this.depth; a >= 0; a--) {
          let { type: l, match: c } = this.frontier[a], u, f = null;
          if (t == 1 && (o ? c.matchType(o.type) || (f = c.fillBefore(R.from(o), !1)) : s && l.compatibleContent(s.type)))
            return { sliceDepth: r, frontierDepth: a, parent: s, inject: f };
          if (t == 2 && o && (u = c.findWrapping(o.type)))
            return { sliceDepth: r, frontierDepth: a, parent: s, wrap: u };
          if (s && c.matchType(s.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = gc(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new G(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = gc(e, t);
    if (i.childCount <= 1 && t > 0) {
      let s = e.size - t <= t + i.size;
      this.unplaced = new G(Hs(e, t - 1, 1), t - 1, s ? t - 1 : r);
    } else
      this.unplaced = new G(Hs(e, t, 1), t, r);
  }
  // Move content from the unplaced slice at `sliceDepth` to the
  // frontier node at `frontierDepth`. Close that frontier node when
  // applicable.
  placeNodes({ sliceDepth: e, frontierDepth: t, parent: r, inject: i, wrap: s }) {
    for (; this.depth > t; )
      this.closeFrontierNode();
    if (s)
      for (let m = 0; m < s.length; m++)
        this.openFrontierNode(s[m]);
    let o = this.unplaced, a = r ? r.content : o.content, l = o.openStart - e, c = 0, u = [], { match: f, type: d } = this.frontier[t];
    if (i) {
      for (let m = 0; m < i.childCount; m++)
        u.push(i.child(m));
      f = f.matchFragment(i);
    }
    let p = a.size + e - (o.content.size - o.openEnd);
    for (; c < a.childCount; ) {
      let m = a.child(c), g = f.matchType(m.type);
      if (!g)
        break;
      c++, (c > 1 || l == 0 || m.content.size) && (f = g, u.push(gv(m.mark(d.allowedMarks(m.marks)), c == 1 ? l : 0, c == a.childCount ? p : -1)));
    }
    let h = c == a.childCount;
    h || (p = -1), this.placed = Gs(this.placed, t, R.from(u)), this.frontier[t].match = f, h && p < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let m = 0, g = a; m < p; m++) {
      let v = g.lastChild;
      this.frontier.push({ type: v.type, match: v.contentMatchAt(v.childCount) }), g = v.content;
    }
    this.unplaced = h ? e == 0 ? G.empty : new G(Hs(o.content, e - 1, 1), e - 1, p < 0 ? o.openEnd : e - 1) : new G(Hs(o.content, e, c), o.openStart, o.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !yc(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], s = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), o = yc(e, t, i, r, s);
      if (o) {
        for (let a = t - 1; a >= 0; a--) {
          let { match: l, type: c } = this.frontier[a], u = yc(e, a, c, l, !0);
          if (!u || u.childCount)
            continue e;
        }
        return { depth: t, fit: o, move: s ? e.doc.resolve(e.after(t + 1)) : e };
      }
    }
  }
  close(e) {
    let t = this.findCloseLevel(e);
    if (!t)
      return null;
    for (; this.depth > t.depth; )
      this.closeFrontierNode();
    t.fit.childCount && (this.placed = Gs(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), s = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, s);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = Gs(this.placed, this.depth, R.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(R.empty, !0);
    t.childCount && (this.placed = Gs(this.placed, this.frontier.length, t));
  }
}
function Hs(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(Hs(n.firstChild.content, e - 1, t)));
}
function Gs(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(Gs(n.lastChild.content, e - 1, t)));
}
function gc(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function gv(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, gv(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(R.empty, !0)))), n.copy(r);
}
function yc(n, e, t, r, i) {
  let s = n.node(e), o = i ? n.indexAfter(e) : n.index(e);
  if (o == s.childCount && !t.compatibleContent(s.type))
    return null;
  let a = r.fillBefore(s.content, !0, o);
  return a && !s2(t, s.content, o) ? a : null;
}
function s2(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function o2(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function a2(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), s = n.doc.resolve(t);
  if (mv(i, s, r))
    return n.step(new it(e, t, r));
  let o = vv(i, n.doc.resolve(t));
  o[o.length - 1] == 0 && o.pop();
  let a = -(i.depth + 1);
  o.unshift(a);
  for (let d = i.depth, p = i.pos - 1; d > 0; d--, p--) {
    let h = i.node(d).type.spec;
    if (h.defining || h.definingAsContext || h.isolating)
      break;
    o.indexOf(d) > -1 ? a = d : i.before(d) == p && o.splice(1, 0, -d);
  }
  let l = o.indexOf(a), c = [], u = r.openStart;
  for (let d = r.content, p = 0; ; p++) {
    let h = d.firstChild;
    if (c.push(h), p == r.openStart)
      break;
    d = h.content;
  }
  for (let d = u - 1; d >= 0; d--) {
    let p = c[d], h = o2(p.type);
    if (h && !p.sameMarkup(i.node(Math.abs(a) - 1)))
      u = d;
    else if (h || !p.type.isTextblock)
      break;
  }
  for (let d = r.openStart; d >= 0; d--) {
    let p = (d + u + 1) % (r.openStart + 1), h = c[p];
    if (h)
      for (let m = 0; m < o.length; m++) {
        let g = o[(m + l) % o.length], v = !0;
        g < 0 && (v = !1, g = -g);
        let w = i.node(g - 1), b = i.index(g - 1);
        if (w.canReplaceWith(b, b, h.type, h.marks))
          return n.replace(i.before(g), v ? s.after(g) : t, new G(yv(r.content, 0, r.openStart, p), p, r.openEnd));
      }
  }
  let f = n.steps.length;
  for (let d = o.length - 1; d >= 0 && (n.replace(e, t, r), !(n.steps.length > f)); d--) {
    let p = o[d];
    p < 0 || (e = i.before(p), t = s.after(p));
  }
}
function yv(n, e, t, r, i) {
  if (e < t) {
    let s = n.firstChild;
    n = n.replaceChild(0, s.copy(yv(s.content, e + 1, t, r, s)));
  }
  if (e > r) {
    let s = i.contentMatchAt(0), o = s.fillBefore(n).append(n);
    n = o.append(s.matchFragment(o).fillBefore(R.empty, !0));
  }
  return n;
}
function l2(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = r2(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new G(R.from(r), 0, 0));
}
function c2(n, e, t) {
  let r = n.doc.resolve(e), i = n.doc.resolve(t), s = vv(r, i);
  for (let o = 0; o < s.length; o++) {
    let a = s[o], l = o == s.length - 1;
    if (l && a == 0 || r.node(a).type.contentMatch.validEnd)
      return n.delete(r.start(a), i.end(a));
    if (a > 0 && (l || r.node(a - 1).canReplace(r.index(a - 1), i.indexAfter(a - 1))))
      return n.delete(r.before(a), i.after(a));
  }
  for (let o = 1; o <= r.depth && o <= i.depth; o++)
    if (e - r.start(o) == r.depth - o && t > r.end(o) && i.end(o) - t != i.depth - o && r.start(o - 1) == i.start(o - 1) && r.node(o - 1).canReplace(r.index(o - 1), i.index(o - 1)))
      return n.delete(r.before(o), t);
  n.delete(e, t);
}
function vv(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let s = n.start(i);
    if (s < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (s == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == s - 1) && t.push(i);
  }
  return t;
}
class Xi extends vt {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return Xe.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let s in t.attrs)
      r[s] = t.attrs[s];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return Xe.fromReplace(e, this.pos, this.pos + 1, new G(R.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return $t.empty;
  }
  invert(e) {
    return new Xi(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Xi(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new Xi(t.pos, t.attr, t.value);
  }
}
vt.jsonID("attr", Xi);
class yo extends vt {
  /**
  Construct an attribute step.
  */
  constructor(e, t) {
    super(), this.attr = e, this.value = t;
  }
  apply(e) {
    let t = /* @__PURE__ */ Object.create(null);
    for (let i in e.attrs)
      t[i] = e.attrs[i];
    t[this.attr] = this.value;
    let r = e.type.create(t, e.content, e.marks);
    return Xe.ok(r);
  }
  getMap() {
    return $t.empty;
  }
  invert(e) {
    return new yo(this.attr, e.attrs[this.attr]);
  }
  map(e) {
    return this;
  }
  toJSON() {
    return { stepType: "docAttr", attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.attr != "string")
      throw new RangeError("Invalid input for DocAttrStep.fromJSON");
    return new yo(t.attr, t.value);
  }
}
vt.jsonID("docAttr", yo);
let ns = class extends Error {
};
ns = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
ns.prototype = Object.create(Error.prototype);
ns.prototype.constructor = ns;
ns.prototype.name = "TransformError";
class u2 {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new Yi();
  }
  /**
  The starting document.
  */
  get before() {
    return this.docs.length ? this.docs[0] : this.doc;
  }
  /**
  Apply a new step in this transform, saving the result. Throws an
  error when the step fails.
  */
  step(e) {
    let t = this.maybeStep(e);
    if (t.failed)
      throw new ns(t.failed);
    return this;
  }
  /**
  Try to apply a step in this transformation, ignoring it if it
  fails. Returns the step result.
  */
  maybeStep(e) {
    let t = e.apply(this.doc);
    return t.failed || this.addStep(e, t.doc), t;
  }
  /**
  True when the document has been changed (when there are any
  steps).
  */
  get docChanged() {
    return this.steps.length > 0;
  }
  /**
  @internal
  */
  addStep(e, t) {
    this.docs.push(this.doc), this.steps.push(e), this.mapping.appendMap(e.getMap()), this.doc = t;
  }
  /**
  Replace the part of the document between `from` and `to` with the
  given `slice`.
  */
  replace(e, t = e, r = G.empty) {
    let i = Sl(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new G(R.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, G.empty);
  }
  /**
  Insert the given content at the given position.
  */
  insert(e, t) {
    return this.replaceWith(e, e, t);
  }
  /**
  Replace a range of the document with a given slice, using
  `from`, `to`, and the slice's
  [`openStart`](https://prosemirror.net/docs/ref/#model.Slice.openStart) property as hints, rather
  than fixed start and end points. This method may grow the
  replaced area or close open nodes in the slice in order to get a
  fit that is more in line with WYSIWYG expectations, by dropping
  fully covered parent nodes of the replaced region when they are
  marked [non-defining as
  context](https://prosemirror.net/docs/ref/#model.NodeSpec.definingAsContext), or including an
  open parent node from the slice that _is_ marked as [defining
  its content](https://prosemirror.net/docs/ref/#model.NodeSpec.definingForContent).
  
  This is the method, for example, to handle paste. The similar
  [`replace`](https://prosemirror.net/docs/ref/#transform.Transform.replace) method is a more
  primitive tool which will _not_ move the start and end of its given
  range, and is useful in situations where you need more precise
  control over what happens.
  */
  replaceRange(e, t, r) {
    return a2(this, e, t, r), this;
  }
  /**
  Replace the given range with a node, but use `from` and `to` as
  hints, rather than precise positions. When from and to are the same
  and are at the start or end of a parent node in which the given
  node doesn't fit, this method may _move_ them out towards a parent
  that does allow the given node to be placed. When the given range
  completely covers a parent node, this method may completely replace
  that parent node.
  */
  replaceRangeWith(e, t, r) {
    return l2(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return c2(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return KE(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return n2(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return XE(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return JE(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return ZE(this, e, t, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new Xi(e, t, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, t) {
    return this.step(new yo(e, t)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new wr(e, t)), this;
  }
  /**
  Remove a mark (or a mark of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, t) {
    if (!(t instanceof Le)) {
      let r = this.doc.nodeAt(e);
      if (!r)
        throw new RangeError("No node at position " + e);
      if (t = t.isInSet(r.marks), !t)
        return this;
    }
    return this.step(new ts(e, t)), this;
  }
  /**
  Split the node at the given position, and optionally, if `depth` is
  greater than one, any number of nodes above that. By default, the
  parts split off will inherit the node type of the original node.
  This can be changed by passing an array of types and attributes to
  use after the split.
  */
  split(e, t = 1, r) {
    return e2(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return GE(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return WE(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return Rf(this, e, t, r), this;
  }
}
const vc = /* @__PURE__ */ Object.create(null);
class ce {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new f2(e.min(t), e.max(t))];
  }
  /**
  The selection's anchor, as an unresolved position.
  */
  get anchor() {
    return this.$anchor.pos;
  }
  /**
  The selection's head.
  */
  get head() {
    return this.$head.pos;
  }
  /**
  The lower bound of the selection's main range.
  */
  get from() {
    return this.$from.pos;
  }
  /**
  The upper bound of the selection's main range.
  */
  get to() {
    return this.$to.pos;
  }
  /**
  The resolved lower  bound of the selection's main range.
  */
  get $from() {
    return this.ranges[0].$from;
  }
  /**
  The resolved upper bound of the selection's main range.
  */
  get $to() {
    return this.ranges[0].$to;
  }
  /**
  Indicates whether the selection contains any content.
  */
  get empty() {
    let e = this.ranges;
    for (let t = 0; t < e.length; t++)
      if (e[t].$from.pos != e[t].$to.pos)
        return !1;
    return !0;
  }
  /**
  Get the content of this selection as a slice.
  */
  content() {
    return this.$from.doc.slice(this.from, this.to, !0);
  }
  /**
  Replace the selection with a slice or, if no slice is given,
  delete the selection. Will append to the given transaction.
  */
  replace(e, t = G.empty) {
    let r = t.content.lastChild, i = null;
    for (let a = 0; a < t.openEnd; a++)
      i = r, r = r.lastChild;
    let s = e.steps.length, o = this.ranges;
    for (let a = 0; a < o.length; a++) {
      let { $from: l, $to: c } = o[a], u = e.mapping.slice(s);
      e.replaceRange(u.map(l.pos), u.map(c.pos), a ? G.empty : t), a == 0 && rp(e, s, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(e, t) {
    let r = e.steps.length, i = this.ranges;
    for (let s = 0; s < i.length; s++) {
      let { $from: o, $to: a } = i[s], l = e.mapping.slice(r), c = l.map(o.pos), u = l.map(a.pos);
      s ? e.deleteRange(c, u) : (e.replaceRangeWith(c, u, t), rp(e, r, t.isInline ? -1 : 1));
    }
  }
  /**
  Find a valid cursor or leaf node selection starting at the given
  position and searching back if `dir` is negative, and forward if
  positive. When `textOnly` is true, only consider cursor
  selections. Will return null when no valid selection position is
  found.
  */
  static findFrom(e, t, r = !1) {
    let i = e.parent.inlineContent ? new le(e) : Fi(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i)
      return i;
    for (let s = e.depth - 1; s >= 0; s--) {
      let o = t < 0 ? Fi(e.node(0), e.node(s), e.before(s + 1), e.index(s), t, r) : Fi(e.node(0), e.node(s), e.after(s + 1), e.index(s) + 1, t, r);
      if (o)
        return o;
    }
    return null;
  }
  /**
  Find a valid cursor or leaf node selection near the given
  position. Searches forward first by default, but if `bias` is
  negative, it will search backwards first.
  */
  static near(e, t = 1) {
    return this.findFrom(e, t) || this.findFrom(e, -t) || new Cn(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return Fi(e, e, 0, 0, 1) || new Cn(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return Fi(e, e, e.content.size, e.childCount, -1) || new Cn(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = vc[t.type];
    if (!r)
      throw new RangeError(`No selection type ${t.type} defined`);
    return r.fromJSON(e, t);
  }
  /**
  To be able to deserialize selections from JSON, custom selection
  classes must register themselves with an ID string, so that they
  can be disambiguated. Try to pick something that's unlikely to
  clash with classes from other modules.
  */
  static jsonID(e, t) {
    if (e in vc)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return vc[e] = t, t.prototype.jsonID = e, t;
  }
  /**
  Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
  which is a value that can be mapped without having access to a
  current document, and later resolved to a real selection for a
  given document again. (This is used mostly by the history to
  track and restore old selections.) The default implementation of
  this method just converts the selection to a text selection and
  returns the bookmark for that.
  */
  getBookmark() {
    return le.between(this.$anchor, this.$head).getBookmark();
  }
}
ce.prototype.visible = !0;
class f2 {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let tp = !1;
function np(n) {
  !tp && !n.parent.inlineContent && (tp = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class le extends ce {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    np(e), np(t), super(e, t);
  }
  /**
  Returns a resolved position if this is a cursor selection (an
  empty text selection), and null otherwise.
  */
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    if (!r.parent.inlineContent)
      return ce.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new le(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = G.empty) {
    if (super.replace(e, t), t == G.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof le && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new xl(this.anchor, this.head);
  }
  toJSON() {
    return { type: "text", anchor: this.anchor, head: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number" || typeof t.head != "number")
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    return new le(e.resolve(t.anchor), e.resolve(t.head));
  }
  /**
  Create a text selection from non-resolved positions.
  */
  static create(e, t, r = t) {
    let i = e.resolve(t);
    return new this(i, r == t ? i : e.resolve(r));
  }
  /**
  Return a text selection that spans the given positions or, if
  they aren't text positions, find a text selection near them.
  `bias` determines whether the method searches forward (default)
  or backwards (negative number) first. Will fall back to calling
  [`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
  doesn't contain a valid text position.
  */
  static between(e, t, r) {
    let i = e.pos - t.pos;
    if ((!r || i) && (r = i >= 0 ? 1 : -1), !t.parent.inlineContent) {
      let s = ce.findFrom(t, r, !0) || ce.findFrom(t, -r, !0);
      if (s)
        t = s.$head;
      else
        return ce.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (ce.findFrom(e, -r, !0) || ce.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new le(e, t);
  }
}
ce.jsonID("text", le);
class xl {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new xl(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return le.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class te extends ce {
  /**
  Create a node selection. Does not verify the validity of its
  argument.
  */
  constructor(e) {
    let t = e.nodeAfter, r = e.node(0).resolve(e.pos + t.nodeSize);
    super(e, r), this.node = t;
  }
  map(e, t) {
    let { deleted: r, pos: i } = t.mapResult(this.anchor), s = e.resolve(i);
    return r ? ce.near(s) : new te(s);
  }
  content() {
    return new G(R.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof te && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new $f(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new te(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new te(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
te.prototype.visible = !1;
ce.jsonID("node", te);
class $f {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new xl(r, r) : new $f(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && te.isSelectable(r) ? new te(t) : ce.near(t);
  }
}
class Cn extends ce {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = G.empty) {
    if (t == G.empty) {
      e.delete(0, e.doc.content.size);
      let r = ce.atStart(e.doc);
      r.eq(e.selection) || e.setSelection(r);
    } else
      super.replace(e, t);
  }
  toJSON() {
    return { type: "all" };
  }
  /**
  @internal
  */
  static fromJSON(e) {
    return new Cn(e);
  }
  map(e) {
    return new Cn(e);
  }
  eq(e) {
    return e instanceof Cn;
  }
  getBookmark() {
    return d2;
  }
}
ce.jsonID("all", Cn);
const d2 = {
  map() {
    return this;
  },
  resolve(n) {
    return new Cn(n);
  }
};
function Fi(n, e, t, r, i, s = !1) {
  if (e.inlineContent)
    return le.create(n, t);
  for (let o = r - (i > 0 ? 0 : 1); i > 0 ? o < e.childCount : o >= 0; o += i) {
    let a = e.child(o);
    if (a.isAtom) {
      if (!s && te.isSelectable(a))
        return te.create(n, t - (i < 0 ? a.nodeSize : 0));
    } else {
      let l = Fi(n, a, t + i, i < 0 ? a.childCount : 0, i, s);
      if (l)
        return l;
    }
    t += a.nodeSize * i;
  }
  return null;
}
function rp(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof it || i instanceof st))
    return;
  let s = n.mapping.maps[r], o;
  s.forEach((a, l, c, u) => {
    o == null && (o = u);
  }), n.setSelection(ce.near(n.doc.resolve(o), t));
}
const ip = 1, fa = 2, sp = 4;
class h2 extends u2 {
  /**
  @internal
  */
  constructor(e) {
    super(e.doc), this.curSelectionFor = 0, this.updated = 0, this.meta = /* @__PURE__ */ Object.create(null), this.time = Date.now(), this.curSelection = e.selection, this.storedMarks = e.storedMarks;
  }
  /**
  The transaction's current selection. This defaults to the editor
  selection [mapped](https://prosemirror.net/docs/ref/#state.Selection.map) through the steps in the
  transaction, but can be overwritten with
  [`setSelection`](https://prosemirror.net/docs/ref/#state.Transaction.setSelection).
  */
  get selection() {
    return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor = this.steps.length), this.curSelection;
  }
  /**
  Update the transaction's current selection. Will determine the
  selection that the editor gets when the transaction is applied.
  */
  setSelection(e) {
    if (e.$from.doc != this.doc)
      throw new RangeError("Selection passed to setSelection must point at the current document");
    return this.curSelection = e, this.curSelectionFor = this.steps.length, this.updated = (this.updated | ip) & ~fa, this.storedMarks = null, this;
  }
  /**
  Whether the selection was explicitly updated by this transaction.
  */
  get selectionSet() {
    return (this.updated & ip) > 0;
  }
  /**
  Set the current stored marks.
  */
  setStoredMarks(e) {
    return this.storedMarks = e, this.updated |= fa, this;
  }
  /**
  Make sure the current stored marks or, if that is null, the marks
  at the selection, match the given set of marks. Does nothing if
  this is already the case.
  */
  ensureMarks(e) {
    return Le.sameSet(this.storedMarks || this.selection.$from.marks(), e) || this.setStoredMarks(e), this;
  }
  /**
  Add a mark to the set of stored marks.
  */
  addStoredMark(e) {
    return this.ensureMarks(e.addToSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Remove a mark or mark type from the set of stored marks.
  */
  removeStoredMark(e) {
    return this.ensureMarks(e.removeFromSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Whether the stored marks were explicitly set for this transaction.
  */
  get storedMarksSet() {
    return (this.updated & fa) > 0;
  }
  /**
  @internal
  */
  addStep(e, t) {
    super.addStep(e, t), this.updated = this.updated & ~fa, this.storedMarks = null;
  }
  /**
  Update the timestamp for the transaction.
  */
  setTime(e) {
    return this.time = e, this;
  }
  /**
  Replace the current selection with the given slice.
  */
  replaceSelection(e) {
    return this.selection.replace(this, e), this;
  }
  /**
  Replace the selection with the given node. When `inheritMarks` is
  true and the content is inline, it inherits the marks from the
  place where it is inserted.
  */
  replaceSelectionWith(e, t = !0) {
    let r = this.selection;
    return t && (e = e.mark(this.storedMarks || (r.empty ? r.$from.marks() : r.$from.marksAcross(r.$to) || Le.none))), r.replaceWith(this, e), this;
  }
  /**
  Delete the selection.
  */
  deleteSelection() {
    return this.selection.replace(this), this;
  }
  /**
  Replace the given range, or the selection if no range is given,
  with a text node containing the given string.
  */
  insertText(e, t, r) {
    let i = this.doc.type.schema;
    if (t == null)
      return e ? this.replaceSelectionWith(i.text(e), !0) : this.deleteSelection();
    {
      if (r == null && (r = t), r = r ?? t, !e)
        return this.deleteRange(t, r);
      let s = this.storedMarks;
      if (!s) {
        let o = this.doc.resolve(t);
        s = r == t ? o.marks() : o.marksAcross(this.doc.resolve(r));
      }
      return this.replaceRangeWith(t, r, i.text(e, s)), this.selection.empty || this.setSelection(ce.near(this.selection.$to)), this;
    }
  }
  /**
  Store a metadata property in this transaction, keyed either by
  name or by plugin.
  */
  setMeta(e, t) {
    return this.meta[typeof e == "string" ? e : e.key] = t, this;
  }
  /**
  Retrieve a metadata property for a given name or plugin.
  */
  getMeta(e) {
    return this.meta[typeof e == "string" ? e : e.key];
  }
  /**
  Returns true if this transaction doesn't contain any metadata,
  and can thus safely be extended.
  */
  get isGeneric() {
    for (let e in this.meta)
      return !1;
    return !0;
  }
  /**
  Indicate that the editor should scroll the selection into view
  when updated to the state produced by this transaction.
  */
  scrollIntoView() {
    return this.updated |= sp, this;
  }
  /**
  True when this transaction has had `scrollIntoView` called on it.
  */
  get scrolledIntoView() {
    return (this.updated & sp) > 0;
  }
}
function op(n, e) {
  return !e || !n ? n : n.bind(e);
}
class Ws {
  constructor(e, t, r) {
    this.name = e, this.init = op(t.init, r), this.apply = op(t.apply, r);
  }
}
const p2 = [
  new Ws("doc", {
    init(n) {
      return n.doc || n.schema.topNodeType.createAndFill();
    },
    apply(n) {
      return n.doc;
    }
  }),
  new Ws("selection", {
    init(n, e) {
      return n.selection || ce.atStart(e.doc);
    },
    apply(n) {
      return n.selection;
    }
  }),
  new Ws("storedMarks", {
    init(n) {
      return n.storedMarks || null;
    },
    apply(n, e, t, r) {
      return r.selection.$cursor ? n.storedMarks : null;
    }
  }),
  new Ws("scrollToSelection", {
    init() {
      return 0;
    },
    apply(n, e) {
      return n.scrolledIntoView ? e + 1 : e;
    }
  })
];
class bc {
  constructor(e, t) {
    this.schema = e, this.plugins = [], this.pluginsByKey = /* @__PURE__ */ Object.create(null), this.fields = p2.slice(), t && t.forEach((r) => {
      if (this.pluginsByKey[r.key])
        throw new RangeError("Adding different instances of a keyed plugin (" + r.key + ")");
      this.plugins.push(r), this.pluginsByKey[r.key] = r, r.spec.state && this.fields.push(new Ws(r.key, r.spec.state, r));
    });
  }
}
class Hi {
  /**
  @internal
  */
  constructor(e) {
    this.config = e;
  }
  /**
  The schema of the state's document.
  */
  get schema() {
    return this.config.schema;
  }
  /**
  The plugins that are active in this state.
  */
  get plugins() {
    return this.config.plugins;
  }
  /**
  Apply the given transaction to produce a new state.
  */
  apply(e) {
    return this.applyTransaction(e).state;
  }
  /**
  @internal
  */
  filterTransaction(e, t = -1) {
    for (let r = 0; r < this.config.plugins.length; r++)
      if (r != t) {
        let i = this.config.plugins[r];
        if (i.spec.filterTransaction && !i.spec.filterTransaction.call(i, e, this))
          return !1;
      }
    return !0;
  }
  /**
  Verbose variant of [`apply`](https://prosemirror.net/docs/ref/#state.EditorState.apply) that
  returns the precise transactions that were applied (which might
  be influenced by the [transaction
  hooks](https://prosemirror.net/docs/ref/#state.PluginSpec.filterTransaction) of
  plugins) along with the new state.
  */
  applyTransaction(e) {
    if (!this.filterTransaction(e))
      return { state: this, transactions: [] };
    let t = [e], r = this.applyInner(e), i = null;
    for (; ; ) {
      let s = !1;
      for (let o = 0; o < this.config.plugins.length; o++) {
        let a = this.config.plugins[o];
        if (a.spec.appendTransaction) {
          let l = i ? i[o].n : 0, c = i ? i[o].state : this, u = l < t.length && a.spec.appendTransaction.call(a, l ? t.slice(l) : t, c, r);
          if (u && r.filterTransaction(u, o)) {
            if (u.setMeta("appendedTransaction", e), !i) {
              i = [];
              for (let f = 0; f < this.config.plugins.length; f++)
                i.push(f < o ? { state: r, n: t.length } : { state: this, n: 0 });
            }
            t.push(u), r = r.applyInner(u), s = !0;
          }
          i && (i[o] = { state: r, n: t.length });
        }
      }
      if (!s)
        return { state: r, transactions: t };
    }
  }
  /**
  @internal
  */
  applyInner(e) {
    if (!e.before.eq(this.doc))
      throw new RangeError("Applying a mismatched transaction");
    let t = new Hi(this.config), r = this.config.fields;
    for (let i = 0; i < r.length; i++) {
      let s = r[i];
      t[s.name] = s.apply(e, this[s.name], this, t);
    }
    return t;
  }
  /**
  Start a [transaction](https://prosemirror.net/docs/ref/#state.Transaction) from this state.
  */
  get tr() {
    return new h2(this);
  }
  /**
  Create a new state.
  */
  static create(e) {
    let t = new bc(e.doc ? e.doc.type.schema : e.schema, e.plugins), r = new Hi(t);
    for (let i = 0; i < t.fields.length; i++)
      r[t.fields[i].name] = t.fields[i].init(e, r);
    return r;
  }
  /**
  Create a new state based on this one, but with an adjusted set
  of active plugins. State fields that exist in both sets of
  plugins are kept unchanged. Those that no longer exist are
  dropped, and those that are new are initialized using their
  [`init`](https://prosemirror.net/docs/ref/#state.StateField.init) method, passing in the new
  configuration object..
  */
  reconfigure(e) {
    let t = new bc(this.schema, e.plugins), r = t.fields, i = new Hi(t);
    for (let s = 0; s < r.length; s++) {
      let o = r[s].name;
      i[o] = this.hasOwnProperty(o) ? this[o] : r[s].init(e, i);
    }
    return i;
  }
  /**
  Serialize this state to JSON. If you want to serialize the state
  of plugins, pass an object mapping property names to use in the
  resulting JSON object to plugin objects. The argument may also be
  a string or number, in which case it is ignored, to support the
  way `JSON.stringify` calls `toString` methods.
  */
  toJSON(e) {
    let t = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
    if (this.storedMarks && (t.storedMarks = this.storedMarks.map((r) => r.toJSON())), e && typeof e == "object")
      for (let r in e) {
        if (r == "doc" || r == "selection")
          throw new RangeError("The JSON fields `doc` and `selection` are reserved");
        let i = e[r], s = i.spec.state;
        s && s.toJSON && (t[r] = s.toJSON.call(i, this[i.key]));
      }
    return t;
  }
  /**
  Deserialize a JSON representation of a state. `config` should
  have at least a `schema` field, and should contain array of
  plugins to initialize the state with. `pluginFields` can be used
  to deserialize the state of plugins, by associating plugin
  instances with the property names they use in the JSON object.
  */
  static fromJSON(e, t, r) {
    if (!t)
      throw new RangeError("Invalid input for EditorState.fromJSON");
    if (!e.schema)
      throw new RangeError("Required config field 'schema' missing");
    let i = new bc(e.schema, e.plugins), s = new Hi(i);
    return i.fields.forEach((o) => {
      if (o.name == "doc")
        s.doc = xr.fromJSON(e.schema, t.doc);
      else if (o.name == "selection")
        s.selection = ce.fromJSON(s.doc, t.selection);
      else if (o.name == "storedMarks")
        t.storedMarks && (s.storedMarks = t.storedMarks.map(e.schema.markFromJSON));
      else {
        if (r)
          for (let a in r) {
            let l = r[a], c = l.spec.state;
            if (l.key == o.name && c && c.fromJSON && Object.prototype.hasOwnProperty.call(t, a)) {
              s[o.name] = c.fromJSON.call(l, e, t[a], s);
              return;
            }
          }
        s[o.name] = o.init(e, s);
      }
    }), s;
  }
}
function bv(n, e, t) {
  for (let r in n) {
    let i = n[r];
    i instanceof Function ? i = i.bind(e) : r == "handleDOMEvents" && (i = bv(i, e, {})), t[r] = i;
  }
  return t;
}
class bt {
  /**
  Create a plugin.
  */
  constructor(e) {
    this.spec = e, this.props = {}, e.props && bv(e.props, this, this.props), this.key = e.key ? e.key.key : wv("plugin");
  }
  /**
  Extract the plugin's state field from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const wc = /* @__PURE__ */ Object.create(null);
function wv(n) {
  return n in wc ? n + "$" + ++wc[n] : (wc[n] = 0, n + "$");
}
class un {
  /**
  Create a plugin key.
  */
  constructor(e = "key") {
    this.key = wv(e);
  }
  /**
  Get the active plugin with this key, if any, from an editor
  state.
  */
  get(e) {
    return e.config.pluginsByKey[this.key];
  }
  /**
  Get the plugin's state from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const ut = function(n) {
  for (var e = 0; ; e++)
    if (n = n.previousSibling, !n)
      return e;
}, vo = function(n) {
  let e = n.assignedSlot || n.parentNode;
  return e && e.nodeType == 11 ? e.host : e;
};
let Su = null;
const Yn = function(n, e, t) {
  let r = Su || (Su = document.createRange());
  return r.setEnd(n, t ?? n.nodeValue.length), r.setStart(n, e || 0), r;
}, m2 = function() {
  Su = null;
}, vi = function(n, e, t, r) {
  return t && (ap(n, e, t, r, -1) || ap(n, e, t, r, 1));
}, g2 = /^(img|br|input|textarea|hr)$/i;
function ap(n, e, t, r, i) {
  for (; ; ) {
    if (n == t && e == r)
      return !0;
    if (e == (i < 0 ? 0 : en(n))) {
      let s = n.parentNode;
      if (!s || s.nodeType != 1 || Ro(n) || g2.test(n.nodeName) || n.contentEditable == "false")
        return !1;
      e = ut(n) + (i < 0 ? 0 : 1), n = s;
    } else if (n.nodeType == 1) {
      if (n = n.childNodes[e + (i < 0 ? -1 : 0)], n.contentEditable == "false")
        return !1;
      e = i < 0 ? en(n) : 0;
    } else
      return !1;
  }
}
function en(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function y2(n, e) {
  for (; ; ) {
    if (n.nodeType == 3 && e)
      return n;
    if (n.nodeType == 1 && e > 0) {
      if (n.contentEditable == "false")
        return null;
      n = n.childNodes[e - 1], e = en(n);
    } else if (n.parentNode && !Ro(n))
      e = ut(n), n = n.parentNode;
    else
      return null;
  }
}
function v2(n, e) {
  for (; ; ) {
    if (n.nodeType == 3 && e < n.nodeValue.length)
      return n;
    if (n.nodeType == 1 && e < n.childNodes.length) {
      if (n.contentEditable == "false")
        return null;
      n = n.childNodes[e], e = 0;
    } else if (n.parentNode && !Ro(n))
      e = ut(n) + 1, n = n.parentNode;
    else
      return null;
  }
}
function b2(n, e, t) {
  for (let r = e == 0, i = e == en(n); r || i; ) {
    if (n == t)
      return !0;
    let s = ut(n);
    if (n = n.parentNode, !n)
      return !1;
    r = r && s == 0, i = i && s == en(n);
  }
}
function Ro(n) {
  let e;
  for (let t = n; t && !(e = t.pmViewDesc); t = t.parentNode)
    ;
  return e && e.node && e.node.isBlock && (e.dom == n || e.contentDOM == n);
}
const kl = function(n) {
  return n.focusNode && vi(n.focusNode, n.focusOffset, n.anchorNode, n.anchorOffset);
};
function Zr(n, e) {
  let t = document.createEvent("Event");
  return t.initEvent("keydown", !0, !0), t.keyCode = n, t.key = t.code = e, t;
}
function w2(n) {
  let e = n.activeElement;
  for (; e && e.shadowRoot; )
    e = e.shadowRoot.activeElement;
  return e;
}
function C2(n, e, t) {
  if (n.caretPositionFromPoint)
    try {
      let r = n.caretPositionFromPoint(e, t);
      if (r)
        return { node: r.offsetNode, offset: Math.min(en(r.offsetNode), r.offset) };
    } catch {
    }
  if (n.caretRangeFromPoint) {
    let r = n.caretRangeFromPoint(e, t);
    if (r)
      return { node: r.startContainer, offset: Math.min(en(r.startContainer), r.startOffset) };
  }
}
const Bn = typeof navigator < "u" ? navigator : null, lp = typeof document < "u" ? document : null, zr = Bn && Bn.userAgent || "", xu = /Edge\/(\d+)/.exec(zr), Cv = /MSIE \d/.exec(zr), ku = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(zr), It = !!(Cv || ku || xu), Tr = Cv ? document.documentMode : ku ? +ku[1] : xu ? +xu[1] : 0, _n = !It && /gecko\/(\d+)/i.test(zr);
_n && +(/Firefox\/(\d+)/.exec(zr) || [0, 0])[1];
const Tu = !It && /Chrome\/(\d+)/.exec(zr), gt = !!Tu, _v = Tu ? +Tu[1] : 0, Tt = !It && !!Bn && /Apple Computer/.test(Bn.vendor), rs = Tt && (/Mobile\/\w+/.test(zr) || !!Bn && Bn.maxTouchPoints > 2), Jt = rs || (Bn ? /Mac/.test(Bn.platform) : !1), _2 = Bn ? /Win/.test(Bn.platform) : !1, hn = /Android \d/.test(zr), Fo = !!lp && "webkitFontSmoothing" in lp.documentElement.style, S2 = Fo ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function x2(n) {
  let e = n.defaultView && n.defaultView.visualViewport;
  return e ? {
    left: 0,
    right: e.width,
    top: 0,
    bottom: e.height
  } : {
    left: 0,
    right: n.documentElement.clientWidth,
    top: 0,
    bottom: n.documentElement.clientHeight
  };
}
function Hn(n, e) {
  return typeof n == "number" ? n : n[e];
}
function k2(n) {
  let e = n.getBoundingClientRect(), t = e.width / n.offsetWidth || 1, r = e.height / n.offsetHeight || 1;
  return {
    left: e.left,
    right: e.left + n.clientWidth * t,
    top: e.top,
    bottom: e.top + n.clientHeight * r
  };
}
function cp(n, e, t) {
  let r = n.someProp("scrollThreshold") || 0, i = n.someProp("scrollMargin") || 5, s = n.dom.ownerDocument;
  for (let o = t || n.dom; o; o = vo(o)) {
    if (o.nodeType != 1)
      continue;
    let a = o, l = a == s.body, c = l ? x2(s) : k2(a), u = 0, f = 0;
    if (e.top < c.top + Hn(r, "top") ? f = -(c.top - e.top + Hn(i, "top")) : e.bottom > c.bottom - Hn(r, "bottom") && (f = e.bottom - e.top > c.bottom - c.top ? e.top + Hn(i, "top") - c.top : e.bottom - c.bottom + Hn(i, "bottom")), e.left < c.left + Hn(r, "left") ? u = -(c.left - e.left + Hn(i, "left")) : e.right > c.right - Hn(r, "right") && (u = e.right - c.right + Hn(i, "right")), u || f)
      if (l)
        s.defaultView.scrollBy(u, f);
      else {
        let d = a.scrollLeft, p = a.scrollTop;
        f && (a.scrollTop += f), u && (a.scrollLeft += u);
        let h = a.scrollLeft - d, m = a.scrollTop - p;
        e = { left: e.left - h, top: e.top - m, right: e.right - h, bottom: e.bottom - m };
      }
    if (l || /^(fixed|sticky)$/.test(getComputedStyle(o).position))
      break;
  }
}
function T2(n) {
  let e = n.dom.getBoundingClientRect(), t = Math.max(0, e.top), r, i;
  for (let s = (e.left + e.right) / 2, o = t + 1; o < Math.min(innerHeight, e.bottom); o += 5) {
    let a = n.root.elementFromPoint(s, o);
    if (!a || a == n.dom || !n.dom.contains(a))
      continue;
    let l = a.getBoundingClientRect();
    if (l.top >= t - 20) {
      r = a, i = l.top;
      break;
    }
  }
  return { refDOM: r, refTop: i, stack: Sv(n.dom) };
}
function Sv(n) {
  let e = [], t = n.ownerDocument;
  for (let r = n; r && (e.push({ dom: r, top: r.scrollTop, left: r.scrollLeft }), n != t); r = vo(r))
    ;
  return e;
}
function O2({ refDOM: n, refTop: e, stack: t }) {
  let r = n ? n.getBoundingClientRect().top : 0;
  xv(t, r == 0 ? 0 : r - e);
}
function xv(n, e) {
  for (let t = 0; t < n.length; t++) {
    let { dom: r, top: i, left: s } = n[t];
    r.scrollTop != i + e && (r.scrollTop = i + e), r.scrollLeft != s && (r.scrollLeft = s);
  }
}
let Di = null;
function E2(n) {
  if (n.setActive)
    return n.setActive();
  if (Di)
    return n.focus(Di);
  let e = Sv(n);
  n.focus(Di == null ? {
    get preventScroll() {
      return Di = { preventScroll: !0 }, !0;
    }
  } : void 0), Di || (Di = !1, xv(e, 0));
}
function kv(n, e) {
  let t, r = 2e8, i, s = 0, o = e.top, a = e.top, l, c;
  for (let u = n.firstChild, f = 0; u; u = u.nextSibling, f++) {
    let d;
    if (u.nodeType == 1)
      d = u.getClientRects();
    else if (u.nodeType == 3)
      d = Yn(u).getClientRects();
    else
      continue;
    for (let p = 0; p < d.length; p++) {
      let h = d[p];
      if (h.top <= o && h.bottom >= a) {
        o = Math.max(h.bottom, o), a = Math.min(h.top, a);
        let m = h.left > e.left ? h.left - e.left : h.right < e.left ? e.left - h.right : 0;
        if (m < r) {
          t = u, r = m, i = m && t.nodeType == 3 ? {
            left: h.right < e.left ? h.right : h.left,
            top: e.top
          } : e, u.nodeType == 1 && m && (s = f + (e.left >= (h.left + h.right) / 2 ? 1 : 0));
          continue;
        }
      } else h.top > e.top && !l && h.left <= e.left && h.right >= e.left && (l = u, c = { left: Math.max(h.left, Math.min(h.right, e.left)), top: h.top });
      !t && (e.left >= h.right && e.top >= h.top || e.left >= h.left && e.top >= h.bottom) && (s = f + 1);
    }
  }
  return !t && l && (t = l, i = c, r = 0), t && t.nodeType == 3 ? M2(t, i) : !t || r && t.nodeType == 1 ? { node: n, offset: s } : kv(t, i);
}
function M2(n, e) {
  let t = n.nodeValue.length, r = document.createRange();
  for (let i = 0; i < t; i++) {
    r.setEnd(n, i + 1), r.setStart(n, i);
    let s = fr(r, 1);
    if (s.top != s.bottom && Bf(e, s))
      return { node: n, offset: i + (e.left >= (s.left + s.right) / 2 ? 1 : 0) };
  }
  return { node: n, offset: 0 };
}
function Bf(n, e) {
  return n.left >= e.left - 1 && n.left <= e.right + 1 && n.top >= e.top - 1 && n.top <= e.bottom + 1;
}
function A2(n, e) {
  let t = n.parentNode;
  return t && /^li$/i.test(t.nodeName) && e.left < n.getBoundingClientRect().left ? t : n;
}
function N2(n, e, t) {
  let { node: r, offset: i } = kv(e, t), s = -1;
  if (r.nodeType == 1 && !r.firstChild) {
    let o = r.getBoundingClientRect();
    s = o.left != o.right && t.left > (o.left + o.right) / 2 ? 1 : -1;
  }
  return n.docView.posFromDOM(r, i, s);
}
function P2(n, e, t, r) {
  let i = -1;
  for (let s = e, o = !1; s != n.dom; ) {
    let a = n.docView.nearestDesc(s, !0);
    if (!a)
      return null;
    if (a.dom.nodeType == 1 && (a.node.isBlock && a.parent || !a.contentDOM)) {
      let l = a.dom.getBoundingClientRect();
      if (a.node.isBlock && a.parent && (!o && l.left > r.left || l.top > r.top ? i = a.posBefore : (!o && l.right < r.left || l.bottom < r.top) && (i = a.posAfter), o = !0), !a.contentDOM && i < 0 && !a.node.isText)
        return (a.node.isBlock ? r.top < (l.top + l.bottom) / 2 : r.left < (l.left + l.right) / 2) ? a.posBefore : a.posAfter;
    }
    s = a.dom.parentNode;
  }
  return i > -1 ? i : n.docView.posFromDOM(e, t, -1);
}
function Tv(n, e, t) {
  let r = n.childNodes.length;
  if (r && t.top < t.bottom)
    for (let i = Math.max(0, Math.min(r - 1, Math.floor(r * (e.top - t.top) / (t.bottom - t.top)) - 2)), s = i; ; ) {
      let o = n.childNodes[s];
      if (o.nodeType == 1) {
        let a = o.getClientRects();
        for (let l = 0; l < a.length; l++) {
          let c = a[l];
          if (Bf(e, c))
            return Tv(o, e, c);
        }
      }
      if ((s = (s + 1) % r) == i)
        break;
    }
  return n;
}
function I2(n, e) {
  let t = n.dom.ownerDocument, r, i = 0, s = C2(t, e.left, e.top);
  s && ({ node: r, offset: i } = s);
  let o = (n.root.elementFromPoint ? n.root : t).elementFromPoint(e.left, e.top), a;
  if (!o || !n.dom.contains(o.nodeType != 1 ? o.parentNode : o)) {
    let c = n.dom.getBoundingClientRect();
    if (!Bf(e, c) || (o = Tv(n.dom, e, c), !o))
      return null;
  }
  if (Tt)
    for (let c = o; r && c; c = vo(c))
      c.draggable && (r = void 0);
  if (o = A2(o, e), r) {
    if (_n && r.nodeType == 1 && (i = Math.min(i, r.childNodes.length), i < r.childNodes.length)) {
      let u = r.childNodes[i], f;
      u.nodeName == "IMG" && (f = u.getBoundingClientRect()).right <= e.left && f.bottom > e.top && i++;
    }
    let c;
    Fo && i && r.nodeType == 1 && (c = r.childNodes[i - 1]).nodeType == 1 && c.contentEditable == "false" && c.getBoundingClientRect().top >= e.top && i--, r == n.dom && i == r.childNodes.length - 1 && r.lastChild.nodeType == 1 && e.top > r.lastChild.getBoundingClientRect().bottom ? a = n.state.doc.content.size : (i == 0 || r.nodeType != 1 || r.childNodes[i - 1].nodeName != "BR") && (a = P2(n, r, i, e));
  }
  a == null && (a = N2(n, o, e));
  let l = n.docView.nearestDesc(o, !0);
  return { pos: a, inside: l ? l.posAtStart - l.border : -1 };
}
function up(n) {
  return n.top < n.bottom || n.left < n.right;
}
function fr(n, e) {
  let t = n.getClientRects();
  if (t.length) {
    let r = t[e < 0 ? 0 : t.length - 1];
    if (up(r))
      return r;
  }
  return Array.prototype.find.call(t, up) || n.getBoundingClientRect();
}
const D2 = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function Ov(n, e, t) {
  let { node: r, offset: i, atom: s } = n.docView.domFromPos(e, t < 0 ? -1 : 1), o = Fo || _n;
  if (r.nodeType == 3)
    if (o && (D2.test(r.nodeValue) || (t < 0 ? !i : i == r.nodeValue.length))) {
      let l = fr(Yn(r, i, i), t);
      if (_n && i && /\s/.test(r.nodeValue[i - 1]) && i < r.nodeValue.length) {
        let c = fr(Yn(r, i - 1, i - 1), -1);
        if (c.top == l.top) {
          let u = fr(Yn(r, i, i + 1), -1);
          if (u.top != l.top)
            return Is(u, u.left < c.left);
        }
      }
      return l;
    } else {
      let l = i, c = i, u = t < 0 ? 1 : -1;
      return t < 0 && !i ? (c++, u = -1) : t >= 0 && i == r.nodeValue.length ? (l--, u = 1) : t < 0 ? l-- : c++, Is(fr(Yn(r, l, c), u), u < 0);
    }
  if (!n.state.doc.resolve(e - (s || 0)).parent.inlineContent) {
    if (s == null && i && (t < 0 || i == en(r))) {
      let l = r.childNodes[i - 1];
      if (l.nodeType == 1)
        return Cc(l.getBoundingClientRect(), !1);
    }
    if (s == null && i < en(r)) {
      let l = r.childNodes[i];
      if (l.nodeType == 1)
        return Cc(l.getBoundingClientRect(), !0);
    }
    return Cc(r.getBoundingClientRect(), t >= 0);
  }
  if (s == null && i && (t < 0 || i == en(r))) {
    let l = r.childNodes[i - 1], c = l.nodeType == 3 ? Yn(l, en(l) - (o ? 0 : 1)) : l.nodeType == 1 && (l.nodeName != "BR" || !l.nextSibling) ? l : null;
    if (c)
      return Is(fr(c, 1), !1);
  }
  if (s == null && i < en(r)) {
    let l = r.childNodes[i];
    for (; l.pmViewDesc && l.pmViewDesc.ignoreForCoords; )
      l = l.nextSibling;
    let c = l ? l.nodeType == 3 ? Yn(l, 0, o ? 0 : 1) : l.nodeType == 1 ? l : null : null;
    if (c)
      return Is(fr(c, -1), !0);
  }
  return Is(fr(r.nodeType == 3 ? Yn(r) : r, -t), t >= 0);
}
function Is(n, e) {
  if (n.width == 0)
    return n;
  let t = e ? n.left : n.right;
  return { top: n.top, bottom: n.bottom, left: t, right: t };
}
function Cc(n, e) {
  if (n.height == 0)
    return n;
  let t = e ? n.top : n.bottom;
  return { top: t, bottom: t, left: n.left, right: n.right };
}
function Ev(n, e, t) {
  let r = n.state, i = n.root.activeElement;
  r != e && n.updateState(e), i != n.dom && n.focus();
  try {
    return t();
  } finally {
    r != e && n.updateState(r), i != n.dom && i && i.focus();
  }
}
function L2(n, e, t) {
  let r = e.selection, i = t == "up" ? r.$from : r.$to;
  return Ev(n, e, () => {
    let { node: s } = n.docView.domFromPos(i.pos, t == "up" ? -1 : 1);
    for (; ; ) {
      let a = n.docView.nearestDesc(s, !0);
      if (!a)
        break;
      if (a.node.isBlock) {
        s = a.contentDOM || a.dom;
        break;
      }
      s = a.dom.parentNode;
    }
    let o = Ov(n, i.pos, 1);
    for (let a = s.firstChild; a; a = a.nextSibling) {
      let l;
      if (a.nodeType == 1)
        l = a.getClientRects();
      else if (a.nodeType == 3)
        l = Yn(a, 0, a.nodeValue.length).getClientRects();
      else
        continue;
      for (let c = 0; c < l.length; c++) {
        let u = l[c];
        if (u.bottom > u.top + 1 && (t == "up" ? o.top - u.top > (u.bottom - o.top) * 2 : u.bottom - o.bottom > (o.bottom - u.top) * 2))
          return !1;
      }
    }
    return !0;
  });
}
const R2 = /[\u0590-\u08ac]/;
function F2(n, e, t) {
  let { $head: r } = e.selection;
  if (!r.parent.isTextblock)
    return !1;
  let i = r.parentOffset, s = !i, o = i == r.parent.content.size, a = n.domSelection();
  return a ? !R2.test(r.parent.textContent) || !a.modify ? t == "left" || t == "backward" ? s : o : Ev(n, e, () => {
    let { focusNode: l, focusOffset: c, anchorNode: u, anchorOffset: f } = n.domSelectionRange(), d = a.caretBidiLevel;
    a.modify("move", t, "character");
    let p = r.depth ? n.docView.domAfterPos(r.before()) : n.dom, { focusNode: h, focusOffset: m } = n.domSelectionRange(), g = h && !p.contains(h.nodeType == 1 ? h : h.parentNode) || l == h && c == m;
    try {
      a.collapse(u, f), l && (l != u || c != f) && a.extend && a.extend(l, c);
    } catch {
    }
    return d != null && (a.caretBidiLevel = d), g;
  }) : r.pos == r.start() || r.pos == r.end();
}
let fp = null, dp = null, hp = !1;
function $2(n, e, t) {
  return fp == e && dp == t ? hp : (fp = e, dp = t, hp = t == "up" || t == "down" ? L2(n, e, t) : F2(n, e, t));
}
const rn = 0, pp = 1, ni = 2, jn = 3;
class $o {
  constructor(e, t, r, i) {
    this.parent = e, this.children = t, this.dom = r, this.contentDOM = i, this.dirty = rn, r.pmViewDesc = this;
  }
  // Used to check whether a given description corresponds to a
  // widget/mark/node.
  matchesWidget(e) {
    return !1;
  }
  matchesMark(e) {
    return !1;
  }
  matchesNode(e, t, r) {
    return !1;
  }
  matchesHack(e) {
    return !1;
  }
  // When parsing in-editor content (in domchange.js), we allow
  // descriptions to determine the parse rules that should be used to
  // parse them.
  parseRule() {
    return null;
  }
  // Used by the editor's event handler to ignore events that come
  // from certain descs.
  stopEvent(e) {
    return !1;
  }
  // The size of the content represented by this desc.
  get size() {
    let e = 0;
    for (let t = 0; t < this.children.length; t++)
      e += this.children[t].size;
    return e;
  }
  // For block nodes, this represents the space taken up by their
  // start/end tokens.
  get border() {
    return 0;
  }
  destroy() {
    this.parent = void 0, this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
    for (let e = 0; e < this.children.length; e++)
      this.children[e].destroy();
  }
  posBeforeChild(e) {
    for (let t = 0, r = this.posAtStart; ; t++) {
      let i = this.children[t];
      if (i == e)
        return r;
      r += i.size;
    }
  }
  get posBefore() {
    return this.parent.posBeforeChild(this);
  }
  get posAtStart() {
    return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
  }
  get posAfter() {
    return this.posBefore + this.size;
  }
  get posAtEnd() {
    return this.posAtStart + this.size - 2 * this.border;
  }
  localPosFromDOM(e, t, r) {
    if (this.contentDOM && this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode))
      if (r < 0) {
        let s, o;
        if (e == this.contentDOM)
          s = e.childNodes[t - 1];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          s = e.previousSibling;
        }
        for (; s && !((o = s.pmViewDesc) && o.parent == this); )
          s = s.previousSibling;
        return s ? this.posBeforeChild(o) + o.size : this.posAtStart;
      } else {
        let s, o;
        if (e == this.contentDOM)
          s = e.childNodes[t];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          s = e.nextSibling;
        }
        for (; s && !((o = s.pmViewDesc) && o.parent == this); )
          s = s.nextSibling;
        return s ? this.posBeforeChild(o) : this.posAtEnd;
      }
    let i;
    if (e == this.dom && this.contentDOM)
      i = t > ut(this.contentDOM);
    else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM))
      i = e.compareDocumentPosition(this.contentDOM) & 2;
    else if (this.dom.firstChild) {
      if (t == 0)
        for (let s = e; ; s = s.parentNode) {
          if (s == this.dom) {
            i = !1;
            break;
          }
          if (s.previousSibling)
            break;
        }
      if (i == null && t == e.childNodes.length)
        for (let s = e; ; s = s.parentNode) {
          if (s == this.dom) {
            i = !0;
            break;
          }
          if (s.nextSibling)
            break;
        }
    }
    return i ?? r > 0 ? this.posAtEnd : this.posAtStart;
  }
  nearestDesc(e, t = !1) {
    for (let r = !0, i = e; i; i = i.parentNode) {
      let s = this.getDesc(i), o;
      if (s && (!t || s.node))
        if (r && (o = s.nodeDOM) && !(o.nodeType == 1 ? o.contains(e.nodeType == 1 ? e : e.parentNode) : o == e))
          r = !1;
        else
          return s;
    }
  }
  getDesc(e) {
    let t = e.pmViewDesc;
    for (let r = t; r; r = r.parent)
      if (r == this)
        return t;
  }
  posFromDOM(e, t, r) {
    for (let i = e; i; i = i.parentNode) {
      let s = this.getDesc(i);
      if (s)
        return s.localPosFromDOM(e, t, r);
    }
    return -1;
  }
  // Find the desc for the node after the given pos, if any. (When a
  // parent node overrode rendering, there might not be one.)
  descAt(e) {
    for (let t = 0, r = 0; t < this.children.length; t++) {
      let i = this.children[t], s = r + i.size;
      if (r == e && s != r) {
        for (; !i.border && i.children.length; )
          i = i.children[0];
        return i;
      }
      if (e < s)
        return i.descAt(e - r - i.border);
      r = s;
    }
  }
  domFromPos(e, t) {
    if (!this.contentDOM)
      return { node: this.dom, offset: 0, atom: e + 1 };
    let r = 0, i = 0;
    for (let s = 0; r < this.children.length; r++) {
      let o = this.children[r], a = s + o.size;
      if (a > e || o instanceof Av) {
        i = e - s;
        break;
      }
      s = a;
    }
    if (i)
      return this.children[r].domFromPos(i - this.children[r].border, t);
    for (let s; r && !(s = this.children[r - 1]).size && s instanceof Mv && s.side >= 0; r--)
      ;
    if (t <= 0) {
      let s, o = !0;
      for (; s = r ? this.children[r - 1] : null, !(!s || s.dom.parentNode == this.contentDOM); r--, o = !1)
        ;
      return s && t && o && !s.border && !s.domAtom ? s.domFromPos(s.size, t) : { node: this.contentDOM, offset: s ? ut(s.dom) + 1 : 0 };
    } else {
      let s, o = !0;
      for (; s = r < this.children.length ? this.children[r] : null, !(!s || s.dom.parentNode == this.contentDOM); r++, o = !1)
        ;
      return s && o && !s.border && !s.domAtom ? s.domFromPos(0, t) : { node: this.contentDOM, offset: s ? ut(s.dom) : this.contentDOM.childNodes.length };
    }
  }
  // Used to find a DOM range in a single parent for a given changed
  // range.
  parseRange(e, t, r = 0) {
    if (this.children.length == 0)
      return { node: this.contentDOM, from: e, to: t, fromOffset: 0, toOffset: this.contentDOM.childNodes.length };
    let i = -1, s = -1;
    for (let o = r, a = 0; ; a++) {
      let l = this.children[a], c = o + l.size;
      if (i == -1 && e <= c) {
        let u = o + l.border;
        if (e >= u && t <= c - l.border && l.node && l.contentDOM && this.contentDOM.contains(l.contentDOM))
          return l.parseRange(e, t, u);
        e = o;
        for (let f = a; f > 0; f--) {
          let d = this.children[f - 1];
          if (d.size && d.dom.parentNode == this.contentDOM && !d.emptyChildAt(1)) {
            i = ut(d.dom) + 1;
            break;
          }
          e -= d.size;
        }
        i == -1 && (i = 0);
      }
      if (i > -1 && (c > t || a == this.children.length - 1)) {
        t = c;
        for (let u = a + 1; u < this.children.length; u++) {
          let f = this.children[u];
          if (f.size && f.dom.parentNode == this.contentDOM && !f.emptyChildAt(-1)) {
            s = ut(f.dom);
            break;
          }
          t += f.size;
        }
        s == -1 && (s = this.contentDOM.childNodes.length);
        break;
      }
      o = c;
    }
    return { node: this.contentDOM, from: e, to: t, fromOffset: i, toOffset: s };
  }
  emptyChildAt(e) {
    if (this.border || !this.contentDOM || !this.children.length)
      return !1;
    let t = this.children[e < 0 ? 0 : this.children.length - 1];
    return t.size == 0 || t.emptyChildAt(e);
  }
  domAfterPos(e) {
    let { node: t, offset: r } = this.domFromPos(e, 0);
    if (t.nodeType != 1 || r == t.childNodes.length)
      throw new RangeError("No node after pos " + e);
    return t.childNodes[r];
  }
  // View descs are responsible for setting any selection that falls
  // entirely inside of them, so that custom implementations can do
  // custom things with the selection. Note that this falls apart when
  // a selection starts in such a node and ends in another, in which
  // case we just use whatever domFromPos produces as a best effort.
  setSelection(e, t, r, i = !1) {
    let s = Math.min(e, t), o = Math.max(e, t);
    for (let p = 0, h = 0; p < this.children.length; p++) {
      let m = this.children[p], g = h + m.size;
      if (s > h && o < g)
        return m.setSelection(e - h - m.border, t - h - m.border, r, i);
      h = g;
    }
    let a = this.domFromPos(e, e ? -1 : 1), l = t == e ? a : this.domFromPos(t, t ? -1 : 1), c = r.root.getSelection(), u = r.domSelectionRange(), f = !1;
    if ((_n || Tt) && e == t) {
      let { node: p, offset: h } = a;
      if (p.nodeType == 3) {
        if (f = !!(h && p.nodeValue[h - 1] == `
`), f && h == p.nodeValue.length)
          for (let m = p, g; m; m = m.parentNode) {
            if (g = m.nextSibling) {
              g.nodeName == "BR" && (a = l = { node: g.parentNode, offset: ut(g) + 1 });
              break;
            }
            let v = m.pmViewDesc;
            if (v && v.node && v.node.isBlock)
              break;
          }
      } else {
        let m = p.childNodes[h - 1];
        f = m && (m.nodeName == "BR" || m.contentEditable == "false");
      }
    }
    if (_n && u.focusNode && u.focusNode != l.node && u.focusNode.nodeType == 1) {
      let p = u.focusNode.childNodes[u.focusOffset];
      p && p.contentEditable == "false" && (i = !0);
    }
    if (!(i || f && Tt) && vi(a.node, a.offset, u.anchorNode, u.anchorOffset) && vi(l.node, l.offset, u.focusNode, u.focusOffset))
      return;
    let d = !1;
    if ((c.extend || e == t) && !f) {
      c.collapse(a.node, a.offset);
      try {
        e != t && c.extend(l.node, l.offset), d = !0;
      } catch {
      }
    }
    if (!d) {
      if (e > t) {
        let h = a;
        a = l, l = h;
      }
      let p = document.createRange();
      p.setEnd(l.node, l.offset), p.setStart(a.node, a.offset), c.removeAllRanges(), c.addRange(p);
    }
  }
  ignoreMutation(e) {
    return !this.contentDOM && e.type != "selection";
  }
  get contentLost() {
    return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM);
  }
  // Remove a subtree of the element tree that has been touched
  // by a DOM change, so that the next update will redraw it.
  markDirty(e, t) {
    for (let r = 0, i = 0; i < this.children.length; i++) {
      let s = this.children[i], o = r + s.size;
      if (r == o ? e <= o && t >= r : e < o && t > r) {
        let a = r + s.border, l = o - s.border;
        if (e >= a && t <= l) {
          this.dirty = e == r || t == o ? ni : pp, e == a && t == l && (s.contentLost || s.dom.parentNode != this.contentDOM) ? s.dirty = jn : s.markDirty(e - a, t - a);
          return;
        } else
          s.dirty = s.dom == s.contentDOM && s.dom.parentNode == this.contentDOM && !s.children.length ? ni : jn;
      }
      r = o;
    }
    this.dirty = ni;
  }
  markParentsDirty() {
    let e = 1;
    for (let t = this.parent; t; t = t.parent, e++) {
      let r = e == 1 ? ni : pp;
      t.dirty < r && (t.dirty = r);
    }
  }
  get domAtom() {
    return !1;
  }
  get ignoreForCoords() {
    return !1;
  }
  isText(e) {
    return !1;
  }
}
class Mv extends $o {
  constructor(e, t, r, i) {
    let s, o = t.type.toDOM;
    if (typeof o == "function" && (o = o(r, () => {
      if (!s)
        return i;
      if (s.parent)
        return s.parent.posBeforeChild(s);
    })), !t.type.spec.raw) {
      if (o.nodeType != 1) {
        let a = document.createElement("span");
        a.appendChild(o), o = a;
      }
      o.contentEditable = "false", o.classList.add("ProseMirror-widget");
    }
    super(e, [], o, null), this.widget = t, this.widget = t, s = this;
  }
  matchesWidget(e) {
    return this.dirty == rn && e.type.eq(this.widget.type);
  }
  parseRule() {
    return { ignore: !0 };
  }
  stopEvent(e) {
    let t = this.widget.spec.stopEvent;
    return t ? t(e) : !1;
  }
  ignoreMutation(e) {
    return e.type != "selection" || this.widget.spec.ignoreSelection;
  }
  destroy() {
    this.widget.type.destroy(this.dom), super.destroy();
  }
  get domAtom() {
    return !0;
  }
  get side() {
    return this.widget.type.side;
  }
}
class B2 extends $o {
  constructor(e, t, r, i) {
    super(e, [], t, null), this.textDOM = r, this.text = i;
  }
  get size() {
    return this.text.length;
  }
  localPosFromDOM(e, t) {
    return e != this.textDOM ? this.posAtStart + (t ? this.size : 0) : this.posAtStart + t;
  }
  domFromPos(e) {
    return { node: this.textDOM, offset: e };
  }
  ignoreMutation(e) {
    return e.type === "characterData" && e.target.nodeValue == e.oldValue;
  }
}
class bi extends $o {
  constructor(e, t, r, i, s) {
    super(e, [], r, i), this.mark = t, this.spec = s;
  }
  static create(e, t, r, i) {
    let s = i.nodeViews[t.type.name], o = s && s(t, i, r);
    return (!o || !o.dom) && (o = Oi.renderSpec(document, t.type.spec.toDOM(t, r), null, t.attrs)), new bi(e, t, o.dom, o.contentDOM || o.dom, o);
  }
  parseRule() {
    return this.dirty & jn || this.mark.type.spec.reparseInView ? null : { mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM };
  }
  matchesMark(e) {
    return this.dirty != jn && this.mark.eq(e);
  }
  markDirty(e, t) {
    if (super.markDirty(e, t), this.dirty != rn) {
      let r = this.parent;
      for (; !r.node; )
        r = r.parent;
      r.dirty < this.dirty && (r.dirty = this.dirty), this.dirty = rn;
    }
  }
  slice(e, t, r) {
    let i = bi.create(this.parent, this.mark, !0, r), s = this.children, o = this.size;
    t < o && (s = Eu(s, t, o, r)), e > 0 && (s = Eu(s, 0, e, r));
    for (let a = 0; a < s.length; a++)
      s[a].parent = i;
    return i.children = s, i;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
}
class Or extends $o {
  constructor(e, t, r, i, s, o, a, l, c) {
    super(e, [], s, o), this.node = t, this.outerDeco = r, this.innerDeco = i, this.nodeDOM = a;
  }
  // By default, a node is rendered using the `toDOM` method from the
  // node type spec. But client code can use the `nodeViews` spec to
  // supply a custom node view, which can influence various aspects of
  // the way the node works.
  //
  // (Using subclassing for this was intentionally decided against,
  // since it'd require exposing a whole slew of finicky
  // implementation details to the user code that they probably will
  // never need.)
  static create(e, t, r, i, s, o) {
    let a = s.nodeViews[t.type.name], l, c = a && a(t, s, () => {
      if (!l)
        return o;
      if (l.parent)
        return l.parent.posBeforeChild(l);
    }, r, i), u = c && c.dom, f = c && c.contentDOM;
    if (t.isText) {
      if (!u)
        u = document.createTextNode(t.text);
      else if (u.nodeType != 3)
        throw new RangeError("Text must be rendered as a DOM text node");
    } else u || ({ dom: u, contentDOM: f } = Oi.renderSpec(document, t.type.spec.toDOM(t), null, t.attrs));
    !f && !t.isText && u.nodeName != "BR" && (u.hasAttribute("contenteditable") || (u.contentEditable = "false"), t.type.spec.draggable && (u.draggable = !0));
    let d = u;
    return u = Iv(u, r, t), c ? l = new j2(e, t, r, i, u, f || null, d, c, s, o + 1) : t.isText ? new Tl(e, t, r, i, u, d, s) : new Or(e, t, r, i, u, f || null, d, s, o + 1);
  }
  parseRule() {
    if (this.node.type.spec.reparseInView)
      return null;
    let e = { node: this.node.type.name, attrs: this.node.attrs };
    if (this.node.type.whitespace == "pre" && (e.preserveWhitespace = "full"), !this.contentDOM)
      e.getContent = () => this.node.content;
    else if (!this.contentLost)
      e.contentElement = this.contentDOM;
    else {
      for (let t = this.children.length - 1; t >= 0; t--) {
        let r = this.children[t];
        if (this.dom.contains(r.dom.parentNode)) {
          e.contentElement = r.dom.parentNode;
          break;
        }
      }
      e.contentElement || (e.getContent = () => R.empty);
    }
    return e;
  }
  matchesNode(e, t, r) {
    return this.dirty == rn && e.eq(this.node) && Ka(t, this.outerDeco) && r.eq(this.innerDeco);
  }
  get size() {
    return this.node.nodeSize;
  }
  get border() {
    return this.node.isLeaf ? 0 : 1;
  }
  // Syncs `this.children` to match `this.node.content` and the local
  // decorations, possibly introducing nesting for marks. Then, in a
  // separate step, syncs the DOM inside `this.contentDOM` to
  // `this.children`.
  updateChildren(e, t) {
    let r = this.node.inlineContent, i = t, s = e.composing ? this.localCompositionInfo(e, t) : null, o = s && s.pos > -1 ? s : null, a = s && s.pos < 0, l = new z2(this, o && o.node, e);
    W2(this.node, this.innerDeco, (c, u, f) => {
      c.spec.marks ? l.syncToMarks(c.spec.marks, r, e) : c.type.side >= 0 && !f && l.syncToMarks(u == this.node.childCount ? Le.none : this.node.child(u).marks, r, e), l.placeWidget(c, e, i);
    }, (c, u, f, d) => {
      l.syncToMarks(c.marks, r, e);
      let p;
      l.findNodeMatch(c, u, f, d) || a && e.state.selection.from > i && e.state.selection.to < i + c.nodeSize && (p = l.findIndexWithChild(s.node)) > -1 && l.updateNodeAt(c, u, f, p, e) || l.updateNextNode(c, u, f, e, d, i) || l.addNode(c, u, f, e, i), i += c.nodeSize;
    }), l.syncToMarks([], r, e), this.node.isTextblock && l.addTextblockHacks(), l.destroyRest(), (l.changed || this.dirty == ni) && (o && this.protectLocalComposition(e, o), Nv(this.contentDOM, this.children, e), rs && U2(this.dom));
  }
  localCompositionInfo(e, t) {
    let { from: r, to: i } = e.state.selection;
    if (!(e.state.selection instanceof le) || r < t || i > t + this.node.content.size)
      return null;
    let s = e.input.compositionNode;
    if (!s || !this.dom.contains(s.parentNode))
      return null;
    if (this.node.inlineContent) {
      let o = s.nodeValue, a = K2(this.node.content, o, r - t, i - t);
      return a < 0 ? null : { node: s, pos: a, text: o };
    } else
      return { node: s, pos: -1, text: "" };
  }
  protectLocalComposition(e, { node: t, pos: r, text: i }) {
    if (this.getDesc(t))
      return;
    let s = t;
    for (; s.parentNode != this.contentDOM; s = s.parentNode) {
      for (; s.previousSibling; )
        s.parentNode.removeChild(s.previousSibling);
      for (; s.nextSibling; )
        s.parentNode.removeChild(s.nextSibling);
      s.pmViewDesc && (s.pmViewDesc = void 0);
    }
    let o = new B2(this, s, t, i);
    e.input.compositionNodes.push(o), this.children = Eu(this.children, r, r + i.length, e, o);
  }
  // If this desc must be updated to match the given node decoration,
  // do so and return true.
  update(e, t, r, i) {
    return this.dirty == jn || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, t, r, i), !0);
  }
  updateInner(e, t, r, i) {
    this.updateOuterDeco(t), this.node = e, this.innerDeco = r, this.contentDOM && this.updateChildren(i, this.posAtStart), this.dirty = rn;
  }
  updateOuterDeco(e) {
    if (Ka(e, this.outerDeco))
      return;
    let t = this.nodeDOM.nodeType != 1, r = this.dom;
    this.dom = Pv(this.dom, this.nodeDOM, Ou(this.outerDeco, this.node, t), Ou(e, this.node, t)), this.dom != r && (r.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e;
  }
  // Mark this node as being the selected node.
  selectNode() {
    this.nodeDOM.nodeType == 1 && this.nodeDOM.classList.add("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && (this.dom.draggable = !0);
  }
  // Remove selected node marking from this node.
  deselectNode() {
    this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.remove("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && this.dom.removeAttribute("draggable"));
  }
  get domAtom() {
    return this.node.isAtom;
  }
}
function mp(n, e, t, r, i) {
  Iv(r, e, n);
  let s = new Or(void 0, n, e, t, r, r, r, i, 0);
  return s.contentDOM && s.updateChildren(i, 0), s;
}
class Tl extends Or {
  constructor(e, t, r, i, s, o, a) {
    super(e, t, r, i, s, null, o, a, 0);
  }
  parseRule() {
    let e = this.nodeDOM.parentNode;
    for (; e && e != this.dom && !e.pmIsDeco; )
      e = e.parentNode;
    return { skip: e || !0 };
  }
  update(e, t, r, i) {
    return this.dirty == jn || this.dirty != rn && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(t), (this.dirty != rn || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, i.trackWrites == this.nodeDOM && (i.trackWrites = null)), this.node = e, this.dirty = rn, !0);
  }
  inParent() {
    let e = this.parent.contentDOM;
    for (let t = this.nodeDOM; t; t = t.parentNode)
      if (t == e)
        return !0;
    return !1;
  }
  domFromPos(e) {
    return { node: this.nodeDOM, offset: e };
  }
  localPosFromDOM(e, t, r) {
    return e == this.nodeDOM ? this.posAtStart + Math.min(t, this.node.text.length) : super.localPosFromDOM(e, t, r);
  }
  ignoreMutation(e) {
    return e.type != "characterData" && e.type != "selection";
  }
  slice(e, t, r) {
    let i = this.node.cut(e, t), s = document.createTextNode(i.text);
    return new Tl(this.parent, i, this.outerDeco, this.innerDeco, s, s, r);
  }
  markDirty(e, t) {
    super.markDirty(e, t), this.dom != this.nodeDOM && (e == 0 || t == this.nodeDOM.nodeValue.length) && (this.dirty = jn);
  }
  get domAtom() {
    return !1;
  }
  isText(e) {
    return this.node.text == e;
  }
}
class Av extends $o {
  parseRule() {
    return { ignore: !0 };
  }
  matchesHack(e) {
    return this.dirty == rn && this.dom.nodeName == e;
  }
  get domAtom() {
    return !0;
  }
  get ignoreForCoords() {
    return this.dom.nodeName == "IMG";
  }
}
class j2 extends Or {
  constructor(e, t, r, i, s, o, a, l, c, u) {
    super(e, t, r, i, s, o, a, c, u), this.spec = l;
  }
  // A custom `update` method gets to decide whether the update goes
  // through. If it does, and there's a `contentDOM` node, our logic
  // updates the children.
  update(e, t, r, i) {
    if (this.dirty == jn)
      return !1;
    if (this.spec.update && (this.node.type == e.type || this.spec.multiType)) {
      let s = this.spec.update(e, t, r);
      return s && this.updateInner(e, t, r, i), s;
    } else return !this.contentDOM && !e.isLeaf ? !1 : super.update(e, t, r, i);
  }
  selectNode() {
    this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
  }
  deselectNode() {
    this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
  }
  setSelection(e, t, r, i) {
    this.spec.setSelection ? this.spec.setSelection(e, t, r.root) : super.setSelection(e, t, r, i);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
  stopEvent(e) {
    return this.spec.stopEvent ? this.spec.stopEvent(e) : !1;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
}
function Nv(n, e, t) {
  let r = n.firstChild, i = !1;
  for (let s = 0; s < e.length; s++) {
    let o = e[s], a = o.dom;
    if (a.parentNode == n) {
      for (; a != r; )
        r = gp(r), i = !0;
      r = r.nextSibling;
    } else
      i = !0, n.insertBefore(a, r);
    if (o instanceof bi) {
      let l = r ? r.previousSibling : n.lastChild;
      Nv(o.contentDOM, o.children, t), r = l ? l.nextSibling : n.firstChild;
    }
  }
  for (; r; )
    r = gp(r), i = !0;
  i && t.trackWrites == n && (t.trackWrites = null);
}
const no = function(n) {
  n && (this.nodeName = n);
};
no.prototype = /* @__PURE__ */ Object.create(null);
const ri = [new no()];
function Ou(n, e, t) {
  if (n.length == 0)
    return ri;
  let r = t ? ri[0] : new no(), i = [r];
  for (let s = 0; s < n.length; s++) {
    let o = n[s].type.attrs;
    if (o) {
      o.nodeName && i.push(r = new no(o.nodeName));
      for (let a in o) {
        let l = o[a];
        l != null && (t && i.length == 1 && i.push(r = new no(e.isInline ? "span" : "div")), a == "class" ? r.class = (r.class ? r.class + " " : "") + l : a == "style" ? r.style = (r.style ? r.style + ";" : "") + l : a != "nodeName" && (r[a] = l));
      }
    }
  }
  return i;
}
function Pv(n, e, t, r) {
  if (t == ri && r == ri)
    return e;
  let i = e;
  for (let s = 0; s < r.length; s++) {
    let o = r[s], a = t[s];
    if (s) {
      let l;
      a && a.nodeName == o.nodeName && i != n && (l = i.parentNode) && l.nodeName.toLowerCase() == o.nodeName || (l = document.createElement(o.nodeName), l.pmIsDeco = !0, l.appendChild(i), a = ri[0]), i = l;
    }
    V2(i, a || ri[0], o);
  }
  return i;
}
function V2(n, e, t) {
  for (let r in e)
    r != "class" && r != "style" && r != "nodeName" && !(r in t) && n.removeAttribute(r);
  for (let r in t)
    r != "class" && r != "style" && r != "nodeName" && t[r] != e[r] && n.setAttribute(r, t[r]);
  if (e.class != t.class) {
    let r = e.class ? e.class.split(" ").filter(Boolean) : [], i = t.class ? t.class.split(" ").filter(Boolean) : [];
    for (let s = 0; s < r.length; s++)
      i.indexOf(r[s]) == -1 && n.classList.remove(r[s]);
    for (let s = 0; s < i.length; s++)
      r.indexOf(i[s]) == -1 && n.classList.add(i[s]);
    n.classList.length == 0 && n.removeAttribute("class");
  }
  if (e.style != t.style) {
    if (e.style) {
      let r = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, i;
      for (; i = r.exec(e.style); )
        n.style.removeProperty(i[1]);
    }
    t.style && (n.style.cssText += t.style);
  }
}
function Iv(n, e, t) {
  return Pv(n, n, ri, Ou(e, t, n.nodeType != 1));
}
function Ka(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (!n[t].type.eq(e[t].type))
      return !1;
  return !0;
}
function gp(n) {
  let e = n.nextSibling;
  return n.parentNode.removeChild(n), e;
}
class z2 {
  constructor(e, t, r) {
    this.lock = t, this.view = r, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = H2(e.node.content, e);
  }
  // Destroy and remove the children between the given indices in
  // `this.top`.
  destroyBetween(e, t) {
    if (e != t) {
      for (let r = e; r < t; r++)
        this.top.children[r].destroy();
      this.top.children.splice(e, t - e), this.changed = !0;
    }
  }
  // Destroy all remaining children in `this.top`.
  destroyRest() {
    this.destroyBetween(this.index, this.top.children.length);
  }
  // Sync the current stack of mark descs with the given array of
  // marks, reusing existing mark descs when possible.
  syncToMarks(e, t, r) {
    let i = 0, s = this.stack.length >> 1, o = Math.min(s, e.length);
    for (; i < o && (i == s - 1 ? this.top : this.stack[i + 1 << 1]).matchesMark(e[i]) && e[i].type.spec.spanning !== !1; )
      i++;
    for (; i < s; )
      this.destroyRest(), this.top.dirty = rn, this.index = this.stack.pop(), this.top = this.stack.pop(), s--;
    for (; s < e.length; ) {
      this.stack.push(this.top, this.index + 1);
      let a = -1;
      for (let l = this.index; l < Math.min(this.index + 3, this.top.children.length); l++) {
        let c = this.top.children[l];
        if (c.matchesMark(e[s]) && !this.isLocked(c.dom)) {
          a = l;
          break;
        }
      }
      if (a > -1)
        a > this.index && (this.changed = !0, this.destroyBetween(this.index, a)), this.top = this.top.children[this.index];
      else {
        let l = bi.create(this.top, e[s], t, r);
        this.top.children.splice(this.index, 0, l), this.top = l, this.changed = !0;
      }
      this.index = 0, s++;
    }
  }
  // Try to find a node desc matching the given data. Skip over it and
  // return true when successful.
  findNodeMatch(e, t, r, i) {
    let s = -1, o;
    if (i >= this.preMatch.index && (o = this.preMatch.matches[i - this.preMatch.index]).parent == this.top && o.matchesNode(e, t, r))
      s = this.top.children.indexOf(o, this.index);
    else
      for (let a = this.index, l = Math.min(this.top.children.length, a + 5); a < l; a++) {
        let c = this.top.children[a];
        if (c.matchesNode(e, t, r) && !this.preMatch.matched.has(c)) {
          s = a;
          break;
        }
      }
    return s < 0 ? !1 : (this.destroyBetween(this.index, s), this.index++, !0);
  }
  updateNodeAt(e, t, r, i, s) {
    let o = this.top.children[i];
    return o.dirty == jn && o.dom == o.contentDOM && (o.dirty = ni), o.update(e, t, r, s) ? (this.destroyBetween(this.index, i), this.index++, !0) : !1;
  }
  findIndexWithChild(e) {
    for (; ; ) {
      let t = e.parentNode;
      if (!t)
        return -1;
      if (t == this.top.contentDOM) {
        let r = e.pmViewDesc;
        if (r) {
          for (let i = this.index; i < this.top.children.length; i++)
            if (this.top.children[i] == r)
              return i;
        }
        return -1;
      }
      e = t;
    }
  }
  // Try to update the next node, if any, to the given data. Checks
  // pre-matches to avoid overwriting nodes that could still be used.
  updateNextNode(e, t, r, i, s, o) {
    for (let a = this.index; a < this.top.children.length; a++) {
      let l = this.top.children[a];
      if (l instanceof Or) {
        let c = this.preMatch.matched.get(l);
        if (c != null && c != s)
          return !1;
        let u = l.dom, f, d = this.isLocked(u) && !(e.isText && l.node && l.node.isText && l.nodeDOM.nodeValue == e.text && l.dirty != jn && Ka(t, l.outerDeco));
        if (!d && l.update(e, t, r, i))
          return this.destroyBetween(this.index, a), l.dom != u && (this.changed = !0), this.index++, !0;
        if (!d && (f = this.recreateWrapper(l, e, t, r, i, o)))
          return this.destroyBetween(this.index, a), this.top.children[this.index] = f, f.contentDOM && (f.dirty = ni, f.updateChildren(i, o + 1), f.dirty = rn), this.changed = !0, this.index++, !0;
        break;
      }
    }
    return !1;
  }
  // When a node with content is replaced by a different node with
  // identical content, move over its children.
  recreateWrapper(e, t, r, i, s, o) {
    if (e.dirty || t.isAtom || !e.children.length || !e.node.content.eq(t.content) || !Ka(r, e.outerDeco) || !i.eq(e.innerDeco))
      return null;
    let a = Or.create(this.top, t, r, i, s, o);
    if (a.contentDOM) {
      a.children = e.children, e.children = [];
      for (let l of a.children)
        l.parent = a;
    }
    return e.destroy(), a;
  }
  // Insert the node as a newly created node desc.
  addNode(e, t, r, i, s) {
    let o = Or.create(this.top, e, t, r, i, s);
    o.contentDOM && o.updateChildren(i, s + 1), this.top.children.splice(this.index++, 0, o), this.changed = !0;
  }
  placeWidget(e, t, r) {
    let i = this.index < this.top.children.length ? this.top.children[this.index] : null;
    if (i && i.matchesWidget(e) && (e == i.widget || !i.widget.type.toDOM.parentNode))
      this.index++;
    else {
      let s = new Mv(this.top, e, t, r);
      this.top.children.splice(this.index++, 0, s), this.changed = !0;
    }
  }
  // Make sure a textblock looks and behaves correctly in
  // contentEditable.
  addTextblockHacks() {
    let e = this.top.children[this.index - 1], t = this.top;
    for (; e instanceof bi; )
      t = e, e = t.children[t.children.length - 1];
    (!e || // Empty textblock
    !(e instanceof Tl) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((Tt || gt) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", t), this.addHackNode("BR", this.top));
  }
  addHackNode(e, t) {
    if (t == this.top && this.index < t.children.length && t.children[this.index].matchesHack(e))
      this.index++;
    else {
      let r = document.createElement(e);
      e == "IMG" && (r.className = "ProseMirror-separator", r.alt = ""), e == "BR" && (r.className = "ProseMirror-trailingBreak");
      let i = new Av(this.top, [], r, null);
      t != this.top ? t.children.push(i) : t.children.splice(this.index++, 0, i), this.changed = !0;
    }
  }
  isLocked(e) {
    return this.lock && (e == this.lock || e.nodeType == 1 && e.contains(this.lock.parentNode));
  }
}
function H2(n, e) {
  let t = e, r = t.children.length, i = n.childCount, s = /* @__PURE__ */ new Map(), o = [];
  e: for (; i > 0; ) {
    let a;
    for (; ; )
      if (r) {
        let c = t.children[r - 1];
        if (c instanceof bi)
          t = c, r = c.children.length;
        else {
          a = c, r--;
          break;
        }
      } else {
        if (t == e)
          break e;
        r = t.parent.children.indexOf(t), t = t.parent;
      }
    let l = a.node;
    if (l) {
      if (l != n.child(i - 1))
        break;
      --i, s.set(a, i), o.push(a);
    }
  }
  return { index: i, matched: s, matches: o.reverse() };
}
function G2(n, e) {
  return n.type.side - e.type.side;
}
function W2(n, e, t, r) {
  let i = e.locals(n), s = 0;
  if (i.length == 0) {
    for (let c = 0; c < n.childCount; c++) {
      let u = n.child(c);
      r(u, i, e.forChild(s, u), c), s += u.nodeSize;
    }
    return;
  }
  let o = 0, a = [], l = null;
  for (let c = 0; ; ) {
    let u, f;
    for (; o < i.length && i[o].to == s; ) {
      let g = i[o++];
      g.widget && (u ? (f || (f = [u])).push(g) : u = g);
    }
    if (u)
      if (f) {
        f.sort(G2);
        for (let g = 0; g < f.length; g++)
          t(f[g], c, !!l);
      } else
        t(u, c, !!l);
    let d, p;
    if (l)
      p = -1, d = l, l = null;
    else if (c < n.childCount)
      p = c, d = n.child(c++);
    else
      break;
    for (let g = 0; g < a.length; g++)
      a[g].to <= s && a.splice(g--, 1);
    for (; o < i.length && i[o].from <= s && i[o].to > s; )
      a.push(i[o++]);
    let h = s + d.nodeSize;
    if (d.isText) {
      let g = h;
      o < i.length && i[o].from < g && (g = i[o].from);
      for (let v = 0; v < a.length; v++)
        a[v].to < g && (g = a[v].to);
      g < h && (l = d.cut(g - s), d = d.cut(0, g - s), h = g, p = -1);
    } else
      for (; o < i.length && i[o].to < h; )
        o++;
    let m = d.isInline && !d.isLeaf ? a.filter((g) => !g.inline) : a.slice();
    r(d, m, e.forChild(s, d), p), s = h;
  }
}
function U2(n) {
  if (n.nodeName == "UL" || n.nodeName == "OL") {
    let e = n.style.cssText;
    n.style.cssText = e + "; list-style: square !important", window.getComputedStyle(n).listStyle, n.style.cssText = e;
  }
}
function K2(n, e, t, r) {
  for (let i = 0, s = 0; i < n.childCount && s <= r; ) {
    let o = n.child(i++), a = s;
    if (s += o.nodeSize, !o.isText)
      continue;
    let l = o.text;
    for (; i < n.childCount; ) {
      let c = n.child(i++);
      if (s += c.nodeSize, !c.isText)
        break;
      l += c.text;
    }
    if (s >= t) {
      if (s >= r && l.slice(r - e.length - a, r - a) == e)
        return r - e.length;
      let c = a < r ? l.lastIndexOf(e, r - a - 1) : -1;
      if (c >= 0 && c + e.length + a >= t)
        return a + c;
      if (t == r && l.length >= r + e.length - a && l.slice(r - a, r - a + e.length) == e)
        return r;
    }
  }
  return -1;
}
function Eu(n, e, t, r, i) {
  let s = [];
  for (let o = 0, a = 0; o < n.length; o++) {
    let l = n[o], c = a, u = a += l.size;
    c >= t || u <= e ? s.push(l) : (c < e && s.push(l.slice(0, e - c, r)), i && (s.push(i), i = void 0), u > t && s.push(l.slice(t - c, l.size, r)));
  }
  return s;
}
function jf(n, e = null) {
  let t = n.domSelectionRange(), r = n.state.doc;
  if (!t.focusNode)
    return null;
  let i = n.docView.nearestDesc(t.focusNode), s = i && i.size == 0, o = n.docView.posFromDOM(t.focusNode, t.focusOffset, 1);
  if (o < 0)
    return null;
  let a = r.resolve(o), l, c;
  if (kl(t)) {
    for (l = o; i && !i.node; )
      i = i.parent;
    let f = i.node;
    if (i && f.isAtom && te.isSelectable(f) && i.parent && !(f.isInline && b2(t.focusNode, t.focusOffset, i.dom))) {
      let d = i.posBefore;
      c = new te(o == d ? a : r.resolve(d));
    }
  } else {
    if (t instanceof n.dom.ownerDocument.defaultView.Selection && t.rangeCount > 1) {
      let f = o, d = o;
      for (let p = 0; p < t.rangeCount; p++) {
        let h = t.getRangeAt(p);
        f = Math.min(f, n.docView.posFromDOM(h.startContainer, h.startOffset, 1)), d = Math.max(d, n.docView.posFromDOM(h.endContainer, h.endOffset, -1));
      }
      if (f < 0)
        return null;
      [l, o] = d == n.state.selection.anchor ? [d, f] : [f, d], a = r.resolve(o);
    } else
      l = n.docView.posFromDOM(t.anchorNode, t.anchorOffset, 1);
    if (l < 0)
      return null;
  }
  let u = r.resolve(l);
  if (!c) {
    let f = e == "pointer" || n.state.selection.head < a.pos && !s ? 1 : -1;
    c = Vf(n, u, a, f);
  }
  return c;
}
function Dv(n) {
  return n.editable ? n.hasFocus() : Rv(n) && document.activeElement && document.activeElement.contains(n.dom);
}
function Qn(n, e = !1) {
  let t = n.state.selection;
  if (Lv(n, t), !!Dv(n)) {
    if (!e && n.input.mouseDown && n.input.mouseDown.allowDefault && gt) {
      let r = n.domSelectionRange(), i = n.domObserver.currentSelection;
      if (r.anchorNode && i.anchorNode && vi(r.anchorNode, r.anchorOffset, i.anchorNode, i.anchorOffset)) {
        n.input.mouseDown.delayedSelectionSync = !0, n.domObserver.setCurSelection();
        return;
      }
    }
    if (n.domObserver.disconnectSelection(), n.cursorWrapper)
      q2(n);
    else {
      let { anchor: r, head: i } = t, s, o;
      yp && !(t instanceof le) && (t.$from.parent.inlineContent || (s = vp(n, t.from)), !t.empty && !t.$from.parent.inlineContent && (o = vp(n, t.to))), n.docView.setSelection(r, i, n, e), yp && (s && bp(s), o && bp(o)), t.visible ? n.dom.classList.remove("ProseMirror-hideselection") : (n.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && Y2(n));
    }
    n.domObserver.setCurSelection(), n.domObserver.connectSelection();
  }
}
const yp = Tt || gt && _v < 63;
function vp(n, e) {
  let { node: t, offset: r } = n.docView.domFromPos(e, 0), i = r < t.childNodes.length ? t.childNodes[r] : null, s = r ? t.childNodes[r - 1] : null;
  if (Tt && i && i.contentEditable == "false")
    return _c(i);
  if ((!i || i.contentEditable == "false") && (!s || s.contentEditable == "false")) {
    if (i)
      return _c(i);
    if (s)
      return _c(s);
  }
}
function _c(n) {
  return n.contentEditable = "true", Tt && n.draggable && (n.draggable = !1, n.wasDraggable = !0), n;
}
function bp(n) {
  n.contentEditable = "false", n.wasDraggable && (n.draggable = !0, n.wasDraggable = null);
}
function Y2(n) {
  let e = n.dom.ownerDocument;
  e.removeEventListener("selectionchange", n.input.hideSelectionGuard);
  let t = n.domSelectionRange(), r = t.anchorNode, i = t.anchorOffset;
  e.addEventListener("selectionchange", n.input.hideSelectionGuard = () => {
    (t.anchorNode != r || t.anchorOffset != i) && (e.removeEventListener("selectionchange", n.input.hideSelectionGuard), setTimeout(() => {
      (!Dv(n) || n.state.selection.visible) && n.dom.classList.remove("ProseMirror-hideselection");
    }, 20));
  });
}
function q2(n) {
  let e = n.domSelection(), t = document.createRange();
  if (!e)
    return;
  let r = n.cursorWrapper.dom, i = r.nodeName == "IMG";
  i ? t.setStart(r.parentNode, ut(r) + 1) : t.setStart(r, 0), t.collapse(!0), e.removeAllRanges(), e.addRange(t), !i && !n.state.selection.visible && It && Tr <= 11 && (r.disabled = !0, r.disabled = !1);
}
function Lv(n, e) {
  if (e instanceof te) {
    let t = n.docView.descAt(e.from);
    t != n.lastSelectedViewDesc && (wp(n), t && t.selectNode(), n.lastSelectedViewDesc = t);
  } else
    wp(n);
}
function wp(n) {
  n.lastSelectedViewDesc && (n.lastSelectedViewDesc.parent && n.lastSelectedViewDesc.deselectNode(), n.lastSelectedViewDesc = void 0);
}
function Vf(n, e, t, r) {
  return n.someProp("createSelectionBetween", (i) => i(n, e, t)) || le.between(e, t, r);
}
function Cp(n) {
  return n.editable && !n.hasFocus() ? !1 : Rv(n);
}
function Rv(n) {
  let e = n.domSelectionRange();
  if (!e.anchorNode)
    return !1;
  try {
    return n.dom.contains(e.anchorNode.nodeType == 3 ? e.anchorNode.parentNode : e.anchorNode) && (n.editable || n.dom.contains(e.focusNode.nodeType == 3 ? e.focusNode.parentNode : e.focusNode));
  } catch {
    return !1;
  }
}
function X2(n) {
  let e = n.docView.domFromPos(n.state.selection.anchor, 0), t = n.domSelectionRange();
  return vi(e.node, e.offset, t.anchorNode, t.anchorOffset);
}
function Mu(n, e) {
  let { $anchor: t, $head: r } = n.selection, i = e > 0 ? t.max(r) : t.min(r), s = i.parent.inlineContent ? i.depth ? n.doc.resolve(e > 0 ? i.after() : i.before()) : null : i;
  return s && ce.findFrom(s, e);
}
function hr(n, e) {
  return n.dispatch(n.state.tr.setSelection(e).scrollIntoView()), !0;
}
function _p(n, e, t) {
  let r = n.state.selection;
  if (r instanceof le)
    if (t.indexOf("s") > -1) {
      let { $head: i } = r, s = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter;
      if (!s || s.isText || !s.isLeaf)
        return !1;
      let o = n.state.doc.resolve(i.pos + s.nodeSize * (e < 0 ? -1 : 1));
      return hr(n, new le(r.$anchor, o));
    } else if (r.empty) {
      if (n.endOfTextblock(e > 0 ? "forward" : "backward")) {
        let i = Mu(n.state, e);
        return i && i instanceof te ? hr(n, i) : !1;
      } else if (!(Jt && t.indexOf("m") > -1)) {
        let i = r.$head, s = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter, o;
        if (!s || s.isText)
          return !1;
        let a = e < 0 ? i.pos - s.nodeSize : i.pos;
        return s.isAtom || (o = n.docView.descAt(a)) && !o.contentDOM ? te.isSelectable(s) ? hr(n, new te(e < 0 ? n.state.doc.resolve(i.pos - s.nodeSize) : i)) : Fo ? hr(n, new le(n.state.doc.resolve(e < 0 ? a : a + s.nodeSize))) : !1 : !1;
      }
    } else return !1;
  else {
    if (r instanceof te && r.node.isInline)
      return hr(n, new le(e > 0 ? r.$to : r.$from));
    {
      let i = Mu(n.state, e);
      return i ? hr(n, i) : !1;
    }
  }
}
function Ya(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function ro(n, e) {
  let t = n.pmViewDesc;
  return t && t.size == 0 && (e < 0 || n.nextSibling || n.nodeName != "BR");
}
function Li(n, e) {
  return e < 0 ? J2(n) : Q2(n);
}
function J2(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let i, s, o = !1;
  for (_n && t.nodeType == 1 && r < Ya(t) && ro(t.childNodes[r], -1) && (o = !0); ; )
    if (r > 0) {
      if (t.nodeType != 1)
        break;
      {
        let a = t.childNodes[r - 1];
        if (ro(a, -1))
          i = t, s = --r;
        else if (a.nodeType == 3)
          t = a, r = t.nodeValue.length;
        else
          break;
      }
    } else {
      if (Fv(t))
        break;
      {
        let a = t.previousSibling;
        for (; a && ro(a, -1); )
          i = t.parentNode, s = ut(a), a = a.previousSibling;
        if (a)
          t = a, r = Ya(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = 0;
        }
      }
    }
  o ? Au(n, t, r) : i && Au(n, i, s);
}
function Q2(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let i = Ya(t), s, o;
  for (; ; )
    if (r < i) {
      if (t.nodeType != 1)
        break;
      let a = t.childNodes[r];
      if (ro(a, 1))
        s = t, o = ++r;
      else
        break;
    } else {
      if (Fv(t))
        break;
      {
        let a = t.nextSibling;
        for (; a && ro(a, 1); )
          s = a.parentNode, o = ut(a) + 1, a = a.nextSibling;
        if (a)
          t = a, r = 0, i = Ya(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = i = 0;
        }
      }
    }
  s && Au(n, s, o);
}
function Fv(n) {
  let e = n.pmViewDesc;
  return e && e.node && e.node.isBlock;
}
function Z2(n, e) {
  for (; n && e == n.childNodes.length && !Ro(n); )
    e = ut(n) + 1, n = n.parentNode;
  for (; n && e < n.childNodes.length; ) {
    let t = n.childNodes[e];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    n = t, e = 0;
  }
}
function eM(n, e) {
  for (; n && !e && !Ro(n); )
    e = ut(n), n = n.parentNode;
  for (; n && e; ) {
    let t = n.childNodes[e - 1];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    n = t, e = n.childNodes.length;
  }
}
function Au(n, e, t) {
  if (e.nodeType != 3) {
    let s, o;
    (o = Z2(e, t)) ? (e = o, t = 0) : (s = eM(e, t)) && (e = s, t = s.nodeValue.length);
  }
  let r = n.domSelection();
  if (!r)
    return;
  if (kl(r)) {
    let s = document.createRange();
    s.setEnd(e, t), s.setStart(e, t), r.removeAllRanges(), r.addRange(s);
  } else r.extend && r.extend(e, t);
  n.domObserver.setCurSelection();
  let { state: i } = n;
  setTimeout(() => {
    n.state == i && Qn(n);
  }, 50);
}
function Sp(n, e) {
  let t = n.state.doc.resolve(e);
  if (!(gt || _2) && t.parent.inlineContent) {
    let i = n.coordsAtPos(e);
    if (e > t.start()) {
      let s = n.coordsAtPos(e - 1), o = (s.top + s.bottom) / 2;
      if (o > i.top && o < i.bottom && Math.abs(s.left - i.left) > 1)
        return s.left < i.left ? "ltr" : "rtl";
    }
    if (e < t.end()) {
      let s = n.coordsAtPos(e + 1), o = (s.top + s.bottom) / 2;
      if (o > i.top && o < i.bottom && Math.abs(s.left - i.left) > 1)
        return s.left > i.left ? "ltr" : "rtl";
    }
  }
  return getComputedStyle(n.dom).direction == "rtl" ? "rtl" : "ltr";
}
function xp(n, e, t) {
  let r = n.state.selection;
  if (r instanceof le && !r.empty || t.indexOf("s") > -1 || Jt && t.indexOf("m") > -1)
    return !1;
  let { $from: i, $to: s } = r;
  if (!i.parent.inlineContent || n.endOfTextblock(e < 0 ? "up" : "down")) {
    let o = Mu(n.state, e);
    if (o && o instanceof te)
      return hr(n, o);
  }
  if (!i.parent.inlineContent) {
    let o = e < 0 ? i : s, a = r instanceof Cn ? ce.near(o, e) : ce.findFrom(o, e);
    return a ? hr(n, a) : !1;
  }
  return !1;
}
function kp(n, e) {
  if (!(n.state.selection instanceof le))
    return !0;
  let { $head: t, $anchor: r, empty: i } = n.state.selection;
  if (!t.sameParent(r))
    return !0;
  if (!i)
    return !1;
  if (n.endOfTextblock(e > 0 ? "forward" : "backward"))
    return !0;
  let s = !t.textOffset && (e < 0 ? t.nodeBefore : t.nodeAfter);
  if (s && !s.isText) {
    let o = n.state.tr;
    return e < 0 ? o.delete(t.pos - s.nodeSize, t.pos) : o.delete(t.pos, t.pos + s.nodeSize), n.dispatch(o), !0;
  }
  return !1;
}
function Tp(n, e, t) {
  n.domObserver.stop(), e.contentEditable = t, n.domObserver.start();
}
function tM(n) {
  if (!Tt || n.state.selection.$head.parentOffset > 0)
    return !1;
  let { focusNode: e, focusOffset: t } = n.domSelectionRange();
  if (e && e.nodeType == 1 && t == 0 && e.firstChild && e.firstChild.contentEditable == "false") {
    let r = e.firstChild;
    Tp(n, r, "true"), setTimeout(() => Tp(n, r, "false"), 20);
  }
  return !1;
}
function nM(n) {
  let e = "";
  return n.ctrlKey && (e += "c"), n.metaKey && (e += "m"), n.altKey && (e += "a"), n.shiftKey && (e += "s"), e;
}
function rM(n, e) {
  let t = e.keyCode, r = nM(e);
  if (t == 8 || Jt && t == 72 && r == "c")
    return kp(n, -1) || Li(n, -1);
  if (t == 46 && !e.shiftKey || Jt && t == 68 && r == "c")
    return kp(n, 1) || Li(n, 1);
  if (t == 13 || t == 27)
    return !0;
  if (t == 37 || Jt && t == 66 && r == "c") {
    let i = t == 37 ? Sp(n, n.state.selection.from) == "ltr" ? -1 : 1 : -1;
    return _p(n, i, r) || Li(n, i);
  } else if (t == 39 || Jt && t == 70 && r == "c") {
    let i = t == 39 ? Sp(n, n.state.selection.from) == "ltr" ? 1 : -1 : 1;
    return _p(n, i, r) || Li(n, i);
  } else {
    if (t == 38 || Jt && t == 80 && r == "c")
      return xp(n, -1, r) || Li(n, -1);
    if (t == 40 || Jt && t == 78 && r == "c")
      return tM(n) || xp(n, 1, r) || Li(n, 1);
    if (r == (Jt ? "m" : "c") && (t == 66 || t == 73 || t == 89 || t == 90))
      return !0;
  }
  return !1;
}
function $v(n, e) {
  n.someProp("transformCopied", (p) => {
    e = p(e, n);
  });
  let t = [], { content: r, openStart: i, openEnd: s } = e;
  for (; i > 1 && s > 1 && r.childCount == 1 && r.firstChild.childCount == 1; ) {
    i--, s--;
    let p = r.firstChild;
    t.push(p.type.name, p.attrs != p.type.defaultAttrs ? p.attrs : null), r = p.content;
  }
  let o = n.someProp("clipboardSerializer") || Oi.fromSchema(n.state.schema), a = Gv(), l = a.createElement("div");
  l.appendChild(o.serializeFragment(r, { document: a }));
  let c = l.firstChild, u, f = 0;
  for (; c && c.nodeType == 1 && (u = Hv[c.nodeName.toLowerCase()]); ) {
    for (let p = u.length - 1; p >= 0; p--) {
      let h = a.createElement(u[p]);
      for (; l.firstChild; )
        h.appendChild(l.firstChild);
      l.appendChild(h), f++;
    }
    c = l.firstChild;
  }
  c && c.nodeType == 1 && c.setAttribute("data-pm-slice", `${i} ${s}${f ? ` -${f}` : ""} ${JSON.stringify(t)}`);
  let d = n.someProp("clipboardTextSerializer", (p) => p(e, n)) || e.content.textBetween(0, e.content.size, `

`);
  return { dom: l, text: d, slice: e };
}
function Bv(n, e, t, r, i) {
  let s = i.parent.type.spec.code, o, a;
  if (!t && !e)
    return null;
  let l = e && (r || s || !t);
  if (l) {
    if (n.someProp("transformPastedText", (d) => {
      e = d(e, s || r, n);
    }), s)
      return e ? new G(R.from(n.state.schema.text(e.replace(/\r\n?/g, `
`))), 0, 0) : G.empty;
    let f = n.someProp("clipboardTextParser", (d) => d(e, i, r, n));
    if (f)
      a = f;
    else {
      let d = i.marks(), { schema: p } = n.state, h = Oi.fromSchema(p);
      o = document.createElement("div"), e.split(/(?:\r\n?|\n)+/).forEach((m) => {
        let g = o.appendChild(document.createElement("p"));
        m && g.appendChild(h.serializeNode(p.text(m, d)));
      });
    }
  } else
    n.someProp("transformPastedHTML", (f) => {
      t = f(t, n);
    }), o = aM(t), Fo && lM(o);
  let c = o && o.querySelector("[data-pm-slice]"), u = c && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(c.getAttribute("data-pm-slice") || "");
  if (u && u[3])
    for (let f = +u[3]; f > 0; f--) {
      let d = o.firstChild;
      for (; d && d.nodeType != 1; )
        d = d.nextSibling;
      if (!d)
        break;
      o = d;
    }
  if (a || (a = (n.someProp("clipboardParser") || n.someProp("domParser") || kr.fromSchema(n.state.schema)).parseSlice(o, {
    preserveWhitespace: !!(l || u),
    context: i,
    ruleFromNode(d) {
      return d.nodeName == "BR" && !d.nextSibling && d.parentNode && !iM.test(d.parentNode.nodeName) ? { ignore: !0 } : null;
    }
  })), u)
    a = cM(Op(a, +u[1], +u[2]), u[4]);
  else if (a = G.maxOpen(sM(a.content, i), !0), a.openStart || a.openEnd) {
    let f = 0, d = 0;
    for (let p = a.content.firstChild; f < a.openStart && !p.type.spec.isolating; f++, p = p.firstChild)
      ;
    for (let p = a.content.lastChild; d < a.openEnd && !p.type.spec.isolating; d++, p = p.lastChild)
      ;
    a = Op(a, f, d);
  }
  return n.someProp("transformPasted", (f) => {
    a = f(a, n);
  }), a;
}
const iM = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function sM(n, e) {
  if (n.childCount < 2)
    return n;
  for (let t = e.depth; t >= 0; t--) {
    let i = e.node(t).contentMatchAt(e.index(t)), s, o = [];
    if (n.forEach((a) => {
      if (!o)
        return;
      let l = i.findWrapping(a.type), c;
      if (!l)
        return o = null;
      if (c = o.length && s.length && Vv(l, s, a, o[o.length - 1], 0))
        o[o.length - 1] = c;
      else {
        o.length && (o[o.length - 1] = zv(o[o.length - 1], s.length));
        let u = jv(a, l);
        o.push(u), i = i.matchType(u.type), s = l;
      }
    }), o)
      return R.from(o);
  }
  return n;
}
function jv(n, e, t = 0) {
  for (let r = e.length - 1; r >= t; r--)
    n = e[r].create(null, R.from(n));
  return n;
}
function Vv(n, e, t, r, i) {
  if (i < n.length && i < e.length && n[i] == e[i]) {
    let s = Vv(n, e, t, r.lastChild, i + 1);
    if (s)
      return r.copy(r.content.replaceChild(r.childCount - 1, s));
    if (r.contentMatchAt(r.childCount).matchType(i == n.length - 1 ? t.type : n[i + 1]))
      return r.copy(r.content.append(R.from(jv(t, n, i + 1))));
  }
}
function zv(n, e) {
  if (e == 0)
    return n;
  let t = n.content.replaceChild(n.childCount - 1, zv(n.lastChild, e - 1)), r = n.contentMatchAt(n.childCount).fillBefore(R.empty, !0);
  return n.copy(t.append(r));
}
function Nu(n, e, t, r, i, s) {
  let o = e < 0 ? n.firstChild : n.lastChild, a = o.content;
  return n.childCount > 1 && (s = 0), i < r - 1 && (a = Nu(a, e, t, r, i + 1, s)), i >= t && (a = e < 0 ? o.contentMatchAt(0).fillBefore(a, s <= i).append(a) : a.append(o.contentMatchAt(o.childCount).fillBefore(R.empty, !0))), n.replaceChild(e < 0 ? 0 : n.childCount - 1, o.copy(a));
}
function Op(n, e, t) {
  return e < n.openStart && (n = new G(Nu(n.content, -1, e, n.openStart, 0, n.openEnd), e, n.openEnd)), t < n.openEnd && (n = new G(Nu(n.content, 1, t, n.openEnd, 0, 0), n.openStart, t)), n;
}
const Hv = {
  thead: ["table"],
  tbody: ["table"],
  tfoot: ["table"],
  caption: ["table"],
  colgroup: ["table"],
  col: ["table", "colgroup"],
  tr: ["table", "tbody"],
  td: ["table", "tbody", "tr"],
  th: ["table", "tbody", "tr"]
};
let Ep = null;
function Gv() {
  return Ep || (Ep = document.implementation.createHTMLDocument("title"));
}
let Sc = null;
function oM(n) {
  let e = window.trustedTypes;
  return e ? (Sc || (Sc = e.createPolicy("ProseMirrorClipboard", { createHTML: (t) => t })), Sc.createHTML(n)) : n;
}
function aM(n) {
  let e = /^(\s*<meta [^>]*>)*/.exec(n);
  e && (n = n.slice(e[0].length));
  let t = Gv().createElement("div"), r = /<([a-z][^>\s]+)/i.exec(n), i;
  if ((i = r && Hv[r[1].toLowerCase()]) && (n = i.map((s) => "<" + s + ">").join("") + n + i.map((s) => "</" + s + ">").reverse().join("")), t.innerHTML = oM(n), i)
    for (let s = 0; s < i.length; s++)
      t = t.querySelector(i[s]) || t;
  return t;
}
function lM(n) {
  let e = n.querySelectorAll(gt ? "span:not([class]):not([style])" : "span.Apple-converted-space");
  for (let t = 0; t < e.length; t++) {
    let r = e[t];
    r.childNodes.length == 1 && r.textContent == " " && r.parentNode && r.parentNode.replaceChild(n.ownerDocument.createTextNode(" "), r);
  }
}
function cM(n, e) {
  if (!n.size)
    return n;
  let t = n.content.firstChild.type.schema, r;
  try {
    r = JSON.parse(e);
  } catch {
    return n;
  }
  let { content: i, openStart: s, openEnd: o } = n;
  for (let a = r.length - 2; a >= 0; a -= 2) {
    let l = t.nodes[r[a]];
    if (!l || l.hasRequiredAttrs())
      break;
    i = R.from(l.create(r[a + 1], i)), s++, o++;
  }
  return new G(i, s, o);
}
const Ot = {}, Et = {}, uM = { touchstart: !0, touchmove: !0 };
class fM {
  constructor() {
    this.shiftKey = !1, this.mouseDown = null, this.lastKeyCode = null, this.lastKeyCodeTime = 0, this.lastClick = { time: 0, x: 0, y: 0, type: "" }, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastIOSEnter = 0, this.lastIOSEnterFallbackTimeout = -1, this.lastFocus = 0, this.lastTouch = 0, this.lastAndroidDelete = 0, this.composing = !1, this.compositionNode = null, this.composingTimeout = -1, this.compositionNodes = [], this.compositionEndedAt = -2e8, this.compositionID = 1, this.compositionPendingChanges = 0, this.domChangeCount = 0, this.eventHandlers = /* @__PURE__ */ Object.create(null), this.hideSelectionGuard = null;
  }
}
function dM(n) {
  for (let e in Ot) {
    let t = Ot[e];
    n.dom.addEventListener(e, n.input.eventHandlers[e] = (r) => {
      pM(n, r) && !zf(n, r) && (n.editable || !(r.type in Et)) && t(n, r);
    }, uM[e] ? { passive: !0 } : void 0);
  }
  Tt && n.dom.addEventListener("input", () => null), Pu(n);
}
function Cr(n, e) {
  n.input.lastSelectionOrigin = e, n.input.lastSelectionTime = Date.now();
}
function hM(n) {
  n.domObserver.stop();
  for (let e in n.input.eventHandlers)
    n.dom.removeEventListener(e, n.input.eventHandlers[e]);
  clearTimeout(n.input.composingTimeout), clearTimeout(n.input.lastIOSEnterFallbackTimeout);
}
function Pu(n) {
  n.someProp("handleDOMEvents", (e) => {
    for (let t in e)
      n.input.eventHandlers[t] || n.dom.addEventListener(t, n.input.eventHandlers[t] = (r) => zf(n, r));
  });
}
function zf(n, e) {
  return n.someProp("handleDOMEvents", (t) => {
    let r = t[e.type];
    return r ? r(n, e) || e.defaultPrevented : !1;
  });
}
function pM(n, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target; t != n.dom; t = t.parentNode)
    if (!t || t.nodeType == 11 || t.pmViewDesc && t.pmViewDesc.stopEvent(e))
      return !1;
  return !0;
}
function mM(n, e) {
  !zf(n, e) && Ot[e.type] && (n.editable || !(e.type in Et)) && Ot[e.type](n, e);
}
Et.keydown = (n, e) => {
  let t = e;
  if (n.input.shiftKey = t.keyCode == 16 || t.shiftKey, !Uv(n, t) && (n.input.lastKeyCode = t.keyCode, n.input.lastKeyCodeTime = Date.now(), !(hn && gt && t.keyCode == 13)))
    if (t.keyCode != 229 && n.domObserver.forceFlush(), rs && t.keyCode == 13 && !t.ctrlKey && !t.altKey && !t.metaKey) {
      let r = Date.now();
      n.input.lastIOSEnter = r, n.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
        n.input.lastIOSEnter == r && (n.someProp("handleKeyDown", (i) => i(n, Zr(13, "Enter"))), n.input.lastIOSEnter = 0);
      }, 200);
    } else n.someProp("handleKeyDown", (r) => r(n, t)) || rM(n, t) ? t.preventDefault() : Cr(n, "key");
};
Et.keyup = (n, e) => {
  e.keyCode == 16 && (n.input.shiftKey = !1);
};
Et.keypress = (n, e) => {
  let t = e;
  if (Uv(n, t) || !t.charCode || t.ctrlKey && !t.altKey || Jt && t.metaKey)
    return;
  if (n.someProp("handleKeyPress", (i) => i(n, t))) {
    t.preventDefault();
    return;
  }
  let r = n.state.selection;
  if (!(r instanceof le) || !r.$from.sameParent(r.$to)) {
    let i = String.fromCharCode(t.charCode);
    !/[\r\n]/.test(i) && !n.someProp("handleTextInput", (s) => s(n, r.$from.pos, r.$to.pos, i)) && n.dispatch(n.state.tr.insertText(i).scrollIntoView()), t.preventDefault();
  }
};
function Ol(n) {
  return { left: n.clientX, top: n.clientY };
}
function gM(n, e) {
  let t = e.x - n.clientX, r = e.y - n.clientY;
  return t * t + r * r < 100;
}
function Hf(n, e, t, r, i) {
  if (r == -1)
    return !1;
  let s = n.state.doc.resolve(r);
  for (let o = s.depth + 1; o > 0; o--)
    if (n.someProp(e, (a) => o > s.depth ? a(n, t, s.nodeAfter, s.before(o), i, !0) : a(n, t, s.node(o), s.before(o), i, !1)))
      return !0;
  return !1;
}
function Ji(n, e, t) {
  if (n.focused || n.focus(), n.state.selection.eq(e))
    return;
  let r = n.state.tr.setSelection(e);
  r.setMeta("pointer", !0), n.dispatch(r);
}
function yM(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.doc.resolve(e), r = t.nodeAfter;
  return r && r.isAtom && te.isSelectable(r) ? (Ji(n, new te(t)), !0) : !1;
}
function vM(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.selection, r, i;
  t instanceof te && (r = t.node);
  let s = n.state.doc.resolve(e);
  for (let o = s.depth + 1; o > 0; o--) {
    let a = o > s.depth ? s.nodeAfter : s.node(o);
    if (te.isSelectable(a)) {
      r && t.$from.depth > 0 && o >= t.$from.depth && s.before(t.$from.depth + 1) == t.$from.pos ? i = s.before(t.$from.depth) : i = s.before(o);
      break;
    }
  }
  return i != null ? (Ji(n, te.create(n.state.doc, i)), !0) : !1;
}
function bM(n, e, t, r, i) {
  return Hf(n, "handleClickOn", e, t, r) || n.someProp("handleClick", (s) => s(n, e, r)) || (i ? vM(n, t) : yM(n, t));
}
function wM(n, e, t, r) {
  return Hf(n, "handleDoubleClickOn", e, t, r) || n.someProp("handleDoubleClick", (i) => i(n, e, r));
}
function CM(n, e, t, r) {
  return Hf(n, "handleTripleClickOn", e, t, r) || n.someProp("handleTripleClick", (i) => i(n, e, r)) || _M(n, t, r);
}
function _M(n, e, t) {
  if (t.button != 0)
    return !1;
  let r = n.state.doc;
  if (e == -1)
    return r.inlineContent ? (Ji(n, le.create(r, 0, r.content.size)), !0) : !1;
  let i = r.resolve(e);
  for (let s = i.depth + 1; s > 0; s--) {
    let o = s > i.depth ? i.nodeAfter : i.node(s), a = i.before(s);
    if (o.inlineContent)
      Ji(n, le.create(r, a + 1, a + 1 + o.content.size));
    else if (te.isSelectable(o))
      Ji(n, te.create(r, a));
    else
      continue;
    return !0;
  }
}
function Gf(n) {
  return qa(n);
}
const Wv = Jt ? "metaKey" : "ctrlKey";
Ot.mousedown = (n, e) => {
  let t = e;
  n.input.shiftKey = t.shiftKey;
  let r = Gf(n), i = Date.now(), s = "singleClick";
  i - n.input.lastClick.time < 500 && gM(t, n.input.lastClick) && !t[Wv] && (n.input.lastClick.type == "singleClick" ? s = "doubleClick" : n.input.lastClick.type == "doubleClick" && (s = "tripleClick")), n.input.lastClick = { time: i, x: t.clientX, y: t.clientY, type: s };
  let o = n.posAtCoords(Ol(t));
  o && (s == "singleClick" ? (n.input.mouseDown && n.input.mouseDown.done(), n.input.mouseDown = new SM(n, o, t, !!r)) : (s == "doubleClick" ? wM : CM)(n, o.pos, o.inside, t) ? t.preventDefault() : Cr(n, "pointer"));
};
class SM {
  constructor(e, t, r, i) {
    this.view = e, this.pos = t, this.event = r, this.flushed = i, this.delayedSelectionSync = !1, this.mightDrag = null, this.startDoc = e.state.doc, this.selectNode = !!r[Wv], this.allowDefault = r.shiftKey;
    let s, o;
    if (t.inside > -1)
      s = e.state.doc.nodeAt(t.inside), o = t.inside;
    else {
      let u = e.state.doc.resolve(t.pos);
      s = u.parent, o = u.depth ? u.before() : 0;
    }
    const a = i ? null : r.target, l = a ? e.docView.nearestDesc(a, !0) : null;
    this.target = l && l.dom.nodeType == 1 ? l.dom : null;
    let { selection: c } = e.state;
    (r.button == 0 && s.type.spec.draggable && s.type.spec.selectable !== !1 || c instanceof te && c.from <= o && c.to > o) && (this.mightDrag = {
      node: s,
      pos: o,
      addAttr: !!(this.target && !this.target.draggable),
      setUneditable: !!(this.target && _n && !this.target.hasAttribute("contentEditable"))
    }), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
      this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
    }, 20), this.view.domObserver.start()), e.root.addEventListener("mouseup", this.up = this.up.bind(this)), e.root.addEventListener("mousemove", this.move = this.move.bind(this)), Cr(e, "pointer");
  }
  done() {
    this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => Qn(this.view)), this.view.input.mouseDown = null;
  }
  up(e) {
    if (this.done(), !this.view.dom.contains(e.target))
      return;
    let t = this.pos;
    this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(Ol(e))), this.updateAllowDefault(e), this.allowDefault || !t ? Cr(this.view, "pointer") : bM(this.view, t.pos, t.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || // Safari ignores clicks on draggable elements
    Tt && this.mightDrag && !this.mightDrag.node.isAtom || // Chrome will sometimes treat a node selection as a
    // cursor, but still report that the node is selected
    // when asked through getSelection. You'll then get a
    // situation where clicking at the point where that
    // (hidden) cursor is doesn't change the selection, and
    // thus doesn't get a reaction from ProseMirror. This
    // works around that.
    gt && !this.view.state.selection.visible && Math.min(Math.abs(t.pos - this.view.state.selection.from), Math.abs(t.pos - this.view.state.selection.to)) <= 2) ? (Ji(this.view, ce.near(this.view.state.doc.resolve(t.pos))), e.preventDefault()) : Cr(this.view, "pointer");
  }
  move(e) {
    this.updateAllowDefault(e), Cr(this.view, "pointer"), e.buttons == 0 && this.done();
  }
  updateAllowDefault(e) {
    !this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0);
  }
}
Ot.touchstart = (n) => {
  n.input.lastTouch = Date.now(), Gf(n), Cr(n, "pointer");
};
Ot.touchmove = (n) => {
  n.input.lastTouch = Date.now(), Cr(n, "pointer");
};
Ot.contextmenu = (n) => Gf(n);
function Uv(n, e) {
  return n.composing ? !0 : Tt && Math.abs(e.timeStamp - n.input.compositionEndedAt) < 500 ? (n.input.compositionEndedAt = -2e8, !0) : !1;
}
const xM = hn ? 5e3 : -1;
Et.compositionstart = Et.compositionupdate = (n) => {
  if (!n.composing) {
    n.domObserver.flush();
    let { state: e } = n, t = e.selection.$to;
    if (e.selection instanceof le && (e.storedMarks || !t.textOffset && t.parentOffset && t.nodeBefore.marks.some((r) => r.type.spec.inclusive === !1)))
      n.markCursor = n.state.storedMarks || t.marks(), qa(n, !0), n.markCursor = null;
    else if (qa(n, !e.selection.empty), _n && e.selection.empty && t.parentOffset && !t.textOffset && t.nodeBefore.marks.length) {
      let r = n.domSelectionRange();
      for (let i = r.focusNode, s = r.focusOffset; i && i.nodeType == 1 && s != 0; ) {
        let o = s < 0 ? i.lastChild : i.childNodes[s - 1];
        if (!o)
          break;
        if (o.nodeType == 3) {
          let a = n.domSelection();
          a && a.collapse(o, o.nodeValue.length);
          break;
        } else
          i = o, s = -1;
      }
    }
    n.input.composing = !0;
  }
  Kv(n, xM);
};
Et.compositionend = (n, e) => {
  n.composing && (n.input.composing = !1, n.input.compositionEndedAt = e.timeStamp, n.input.compositionPendingChanges = n.domObserver.pendingRecords().length ? n.input.compositionID : 0, n.input.compositionNode = null, n.input.compositionPendingChanges && Promise.resolve().then(() => n.domObserver.flush()), n.input.compositionID++, Kv(n, 20));
};
function Kv(n, e) {
  clearTimeout(n.input.composingTimeout), e > -1 && (n.input.composingTimeout = setTimeout(() => qa(n), e));
}
function Yv(n) {
  for (n.composing && (n.input.composing = !1, n.input.compositionEndedAt = TM()); n.input.compositionNodes.length > 0; )
    n.input.compositionNodes.pop().markParentsDirty();
}
function kM(n) {
  let e = n.domSelectionRange();
  if (!e.focusNode)
    return null;
  let t = y2(e.focusNode, e.focusOffset), r = v2(e.focusNode, e.focusOffset);
  if (t && r && t != r) {
    let i = r.pmViewDesc, s = n.domObserver.lastChangedTextNode;
    if (t == s || r == s)
      return s;
    if (!i || !i.isText(r.nodeValue))
      return r;
    if (n.input.compositionNode == r) {
      let o = t.pmViewDesc;
      if (!(!o || !o.isText(t.nodeValue)))
        return r;
    }
  }
  return t || r;
}
function TM() {
  let n = document.createEvent("Event");
  return n.initEvent("event", !0, !0), n.timeStamp;
}
function qa(n, e = !1) {
  if (!(hn && n.domObserver.flushingSoon >= 0)) {
    if (n.domObserver.forceFlush(), Yv(n), e || n.docView && n.docView.dirty) {
      let t = jf(n);
      return t && !t.eq(n.state.selection) ? n.dispatch(n.state.tr.setSelection(t)) : (n.markCursor || e) && !n.state.selection.empty ? n.dispatch(n.state.tr.deleteSelection()) : n.updateState(n.state), !0;
    }
    return !1;
  }
}
function OM(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.dom.parentNode.appendChild(document.createElement("div"));
  t.appendChild(e), t.style.cssText = "position: fixed; left: -10000px; top: 10px";
  let r = getSelection(), i = document.createRange();
  i.selectNodeContents(e), n.dom.blur(), r.removeAllRanges(), r.addRange(i), setTimeout(() => {
    t.parentNode && t.parentNode.removeChild(t), n.focus();
  }, 50);
}
const bo = It && Tr < 15 || rs && S2 < 604;
Ot.copy = Et.cut = (n, e) => {
  let t = e, r = n.state.selection, i = t.type == "cut";
  if (r.empty)
    return;
  let s = bo ? null : t.clipboardData, o = r.content(), { dom: a, text: l } = $v(n, o);
  s ? (t.preventDefault(), s.clearData(), s.setData("text/html", a.innerHTML), s.setData("text/plain", l)) : OM(n, a), i && n.dispatch(n.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function EM(n) {
  return n.openStart == 0 && n.openEnd == 0 && n.content.childCount == 1 ? n.content.firstChild : null;
}
function MM(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.input.shiftKey || n.state.selection.$from.parent.type.spec.code, r = n.dom.parentNode.appendChild(document.createElement(t ? "textarea" : "div"));
  t || (r.contentEditable = "true"), r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.focus();
  let i = n.input.shiftKey && n.input.lastKeyCode != 45;
  setTimeout(() => {
    n.focus(), r.parentNode && r.parentNode.removeChild(r), t ? wo(n, r.value, null, i, e) : wo(n, r.textContent, r.innerHTML, i, e);
  }, 50);
}
function wo(n, e, t, r, i) {
  let s = Bv(n, e, t, r, n.state.selection.$from);
  if (n.someProp("handlePaste", (l) => l(n, i, s || G.empty)))
    return !0;
  if (!s)
    return !1;
  let o = EM(s), a = o ? n.state.tr.replaceSelectionWith(o, r) : n.state.tr.replaceSelection(s);
  return n.dispatch(a.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
function qv(n) {
  let e = n.getData("text/plain") || n.getData("Text");
  if (e)
    return e;
  let t = n.getData("text/uri-list");
  return t ? t.replace(/\r?\n/g, " ") : "";
}
Et.paste = (n, e) => {
  let t = e;
  if (n.composing && !hn)
    return;
  let r = bo ? null : t.clipboardData, i = n.input.shiftKey && n.input.lastKeyCode != 45;
  r && wo(n, qv(r), r.getData("text/html"), i, t) ? t.preventDefault() : MM(n, t);
};
class Xv {
  constructor(e, t, r) {
    this.slice = e, this.move = t, this.node = r;
  }
}
const Jv = Jt ? "altKey" : "ctrlKey";
Ot.dragstart = (n, e) => {
  let t = e, r = n.input.mouseDown;
  if (r && r.done(), !t.dataTransfer)
    return;
  let i = n.state.selection, s = i.empty ? null : n.posAtCoords(Ol(t)), o;
  if (!(s && s.pos >= i.from && s.pos <= (i instanceof te ? i.to - 1 : i.to))) {
    if (r && r.mightDrag)
      o = te.create(n.state.doc, r.mightDrag.pos);
    else if (t.target && t.target.nodeType == 1) {
      let f = n.docView.nearestDesc(t.target, !0);
      f && f.node.type.spec.draggable && f != n.docView && (o = te.create(n.state.doc, f.posBefore));
    }
  }
  let a = (o || n.state.selection).content(), { dom: l, text: c, slice: u } = $v(n, a);
  (!t.dataTransfer.files.length || !gt || _v > 120) && t.dataTransfer.clearData(), t.dataTransfer.setData(bo ? "Text" : "text/html", l.innerHTML), t.dataTransfer.effectAllowed = "copyMove", bo || t.dataTransfer.setData("text/plain", c), n.dragging = new Xv(u, !t[Jv], o);
};
Ot.dragend = (n) => {
  let e = n.dragging;
  window.setTimeout(() => {
    n.dragging == e && (n.dragging = null);
  }, 50);
};
Et.dragover = Et.dragenter = (n, e) => e.preventDefault();
Et.drop = (n, e) => {
  let t = e, r = n.dragging;
  if (n.dragging = null, !t.dataTransfer)
    return;
  let i = n.posAtCoords(Ol(t));
  if (!i)
    return;
  let s = n.state.doc.resolve(i.pos), o = r && r.slice;
  o ? n.someProp("transformPasted", (h) => {
    o = h(o, n);
  }) : o = Bv(n, qv(t.dataTransfer), bo ? null : t.dataTransfer.getData("text/html"), !1, s);
  let a = !!(r && !t[Jv]);
  if (n.someProp("handleDrop", (h) => h(n, t, o || G.empty, a))) {
    t.preventDefault();
    return;
  }
  if (!o)
    return;
  t.preventDefault();
  let l = o ? pv(n.state.doc, s.pos, o) : s.pos;
  l == null && (l = s.pos);
  let c = n.state.tr;
  if (a) {
    let { node: h } = r;
    h ? h.replace(c) : c.deleteSelection();
  }
  let u = c.mapping.map(l), f = o.openStart == 0 && o.openEnd == 0 && o.content.childCount == 1, d = c.doc;
  if (f ? c.replaceRangeWith(u, u, o.content.firstChild) : c.replaceRange(u, u, o), c.doc.eq(d))
    return;
  let p = c.doc.resolve(u);
  if (f && te.isSelectable(o.content.firstChild) && p.nodeAfter && p.nodeAfter.sameMarkup(o.content.firstChild))
    c.setSelection(new te(p));
  else {
    let h = c.mapping.map(l);
    c.mapping.maps[c.mapping.maps.length - 1].forEach((m, g, v, w) => h = w), c.setSelection(Vf(n, p, c.doc.resolve(h)));
  }
  n.focus(), n.dispatch(c.setMeta("uiEvent", "drop"));
};
Ot.focus = (n) => {
  n.input.lastFocus = Date.now(), n.focused || (n.domObserver.stop(), n.dom.classList.add("ProseMirror-focused"), n.domObserver.start(), n.focused = !0, setTimeout(() => {
    n.docView && n.hasFocus() && !n.domObserver.currentSelection.eq(n.domSelectionRange()) && Qn(n);
  }, 20));
};
Ot.blur = (n, e) => {
  let t = e;
  n.focused && (n.domObserver.stop(), n.dom.classList.remove("ProseMirror-focused"), n.domObserver.start(), t.relatedTarget && n.dom.contains(t.relatedTarget) && n.domObserver.currentSelection.clear(), n.focused = !1);
};
Ot.beforeinput = (n, e) => {
  if (gt && hn && e.inputType == "deleteContentBackward") {
    n.domObserver.flushSoon();
    let { domChangeCount: r } = n.input;
    setTimeout(() => {
      if (n.input.domChangeCount != r || (n.dom.blur(), n.focus(), n.someProp("handleKeyDown", (s) => s(n, Zr(8, "Backspace")))))
        return;
      let { $cursor: i } = n.state.selection;
      i && i.pos > 0 && n.dispatch(n.state.tr.delete(i.pos - 1, i.pos).scrollIntoView());
    }, 50);
  }
};
for (let n in Et)
  Ot[n] = Et[n];
function Co(n, e) {
  if (n == e)
    return !0;
  for (let t in n)
    if (n[t] !== e[t])
      return !1;
  for (let t in e)
    if (!(t in n))
      return !1;
  return !0;
}
class Xa {
  constructor(e, t) {
    this.toDOM = e, this.spec = t || ui, this.side = this.spec.side || 0;
  }
  map(e, t, r, i) {
    let { pos: s, deleted: o } = e.mapResult(t.from + i, this.side < 0 ? -1 : 1);
    return o ? null : new tn(s - r, s - r, this);
  }
  valid() {
    return !0;
  }
  eq(e) {
    return this == e || e instanceof Xa && (this.spec.key && this.spec.key == e.spec.key || this.toDOM == e.toDOM && Co(this.spec, e.spec));
  }
  destroy(e) {
    this.spec.destroy && this.spec.destroy(e);
  }
}
class Er {
  constructor(e, t) {
    this.attrs = e, this.spec = t || ui;
  }
  map(e, t, r, i) {
    let s = e.map(t.from + i, this.spec.inclusiveStart ? -1 : 1) - r, o = e.map(t.to + i, this.spec.inclusiveEnd ? 1 : -1) - r;
    return s >= o ? null : new tn(s, o, this);
  }
  valid(e, t) {
    return t.from < t.to;
  }
  eq(e) {
    return this == e || e instanceof Er && Co(this.attrs, e.attrs) && Co(this.spec, e.spec);
  }
  static is(e) {
    return e.type instanceof Er;
  }
  destroy() {
  }
}
class Wf {
  constructor(e, t) {
    this.attrs = e, this.spec = t || ui;
  }
  map(e, t, r, i) {
    let s = e.mapResult(t.from + i, 1);
    if (s.deleted)
      return null;
    let o = e.mapResult(t.to + i, -1);
    return o.deleted || o.pos <= s.pos ? null : new tn(s.pos - r, o.pos - r, this);
  }
  valid(e, t) {
    let { index: r, offset: i } = e.content.findIndex(t.from), s;
    return i == t.from && !(s = e.child(r)).isText && i + s.nodeSize == t.to;
  }
  eq(e) {
    return this == e || e instanceof Wf && Co(this.attrs, e.attrs) && Co(this.spec, e.spec);
  }
  destroy() {
  }
}
class tn {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.from = e, this.to = t, this.type = r;
  }
  /**
  @internal
  */
  copy(e, t) {
    return new tn(e, t, this.type);
  }
  /**
  @internal
  */
  eq(e, t = 0) {
    return this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to;
  }
  /**
  @internal
  */
  map(e, t, r) {
    return this.type.map(e, this, t, r);
  }
  /**
  Creates a widget decoration, which is a DOM node that's shown in
  the document at the given position. It is recommended that you
  delay rendering the widget by passing a function that will be
  called when the widget is actually drawn in a view, but you can
  also directly pass a DOM node. `getPos` can be used to find the
  widget's current document position.
  */
  static widget(e, t, r) {
    return new tn(e, e, new Xa(t, r));
  }
  /**
  Creates an inline decoration, which adds the given attributes to
  each inline node between `from` and `to`.
  */
  static inline(e, t, r, i) {
    return new tn(e, t, new Er(r, i));
  }
  /**
  Creates a node decoration. `from` and `to` should point precisely
  before and after a node in the document. That node, and only that
  node, will receive the given attributes.
  */
  static node(e, t, r, i) {
    return new tn(e, t, new Wf(r, i));
  }
  /**
  The spec provided when creating this decoration. Can be useful
  if you've stored extra information in that object.
  */
  get spec() {
    return this.type.spec;
  }
  /**
  @internal
  */
  get inline() {
    return this.type instanceof Er;
  }
  /**
  @internal
  */
  get widget() {
    return this.type instanceof Xa;
  }
}
const $i = [], ui = {};
class nt {
  /**
  @internal
  */
  constructor(e, t) {
    this.local = e.length ? e : $i, this.children = t.length ? t : $i;
  }
  /**
  Create a set of decorations, using the structure of the given
  document. This will consume (modify) the `decorations` array, so
  you must make a copy if you want need to preserve that.
  */
  static create(e, t) {
    return t.length ? Ja(t, e, 0, ui) : pt;
  }
  /**
  Find all decorations in this set which touch the given range
  (including decorations that start or end directly at the
  boundaries) and match the given predicate on their spec. When
  `start` and `end` are omitted, all decorations in the set are
  considered. When `predicate` isn't given, all decorations are
  assumed to match.
  */
  find(e, t, r) {
    let i = [];
    return this.findInner(e ?? 0, t ?? 1e9, i, 0, r), i;
  }
  findInner(e, t, r, i, s) {
    for (let o = 0; o < this.local.length; o++) {
      let a = this.local[o];
      a.from <= t && a.to >= e && (!s || s(a.spec)) && r.push(a.copy(a.from + i, a.to + i));
    }
    for (let o = 0; o < this.children.length; o += 3)
      if (this.children[o] < t && this.children[o + 1] > e) {
        let a = this.children[o] + 1;
        this.children[o + 2].findInner(e - a, t - a, r, i + a, s);
      }
  }
  /**
  Map the set of decorations in response to a change in the
  document.
  */
  map(e, t, r) {
    return this == pt || e.maps.length == 0 ? this : this.mapInner(e, t, 0, 0, r || ui);
  }
  /**
  @internal
  */
  mapInner(e, t, r, i, s) {
    let o;
    for (let a = 0; a < this.local.length; a++) {
      let l = this.local[a].map(e, r, i);
      l && l.type.valid(t, l) ? (o || (o = [])).push(l) : s.onRemove && s.onRemove(this.local[a].spec);
    }
    return this.children.length ? AM(this.children, o || [], e, t, r, i, s) : o ? new nt(o.sort(fi), $i) : pt;
  }
  /**
  Add the given array of decorations to the ones in the set,
  producing a new set. Consumes the `decorations` array. Needs
  access to the current document to create the appropriate tree
  structure.
  */
  add(e, t) {
    return t.length ? this == pt ? nt.create(e, t) : this.addInner(e, t, 0) : this;
  }
  addInner(e, t, r) {
    let i, s = 0;
    e.forEach((a, l) => {
      let c = l + r, u;
      if (u = Zv(t, a, c)) {
        for (i || (i = this.children.slice()); s < i.length && i[s] < l; )
          s += 3;
        i[s] == l ? i[s + 2] = i[s + 2].addInner(a, u, c + 1) : i.splice(s, 0, l, l + a.nodeSize, Ja(u, a, c + 1, ui)), s += 3;
      }
    });
    let o = Qv(s ? e0(t) : t, -r);
    for (let a = 0; a < o.length; a++)
      o[a].type.valid(e, o[a]) || o.splice(a--, 1);
    return new nt(o.length ? this.local.concat(o).sort(fi) : this.local, i || this.children);
  }
  /**
  Create a new set that contains the decorations in this set, minus
  the ones in the given array.
  */
  remove(e) {
    return e.length == 0 || this == pt ? this : this.removeInner(e, 0);
  }
  removeInner(e, t) {
    let r = this.children, i = this.local;
    for (let s = 0; s < r.length; s += 3) {
      let o, a = r[s] + t, l = r[s + 1] + t;
      for (let u = 0, f; u < e.length; u++)
        (f = e[u]) && f.from > a && f.to < l && (e[u] = null, (o || (o = [])).push(f));
      if (!o)
        continue;
      r == this.children && (r = this.children.slice());
      let c = r[s + 2].removeInner(o, a + 1);
      c != pt ? r[s + 2] = c : (r.splice(s, 3), s -= 3);
    }
    if (i.length) {
      for (let s = 0, o; s < e.length; s++)
        if (o = e[s])
          for (let a = 0; a < i.length; a++)
            i[a].eq(o, t) && (i == this.local && (i = this.local.slice()), i.splice(a--, 1));
    }
    return r == this.children && i == this.local ? this : i.length || r.length ? new nt(i, r) : pt;
  }
  forChild(e, t) {
    if (this == pt)
      return this;
    if (t.isLeaf)
      return nt.empty;
    let r, i;
    for (let a = 0; a < this.children.length; a += 3)
      if (this.children[a] >= e) {
        this.children[a] == e && (r = this.children[a + 2]);
        break;
      }
    let s = e + 1, o = s + t.content.size;
    for (let a = 0; a < this.local.length; a++) {
      let l = this.local[a];
      if (l.from < o && l.to > s && l.type instanceof Er) {
        let c = Math.max(s, l.from) - s, u = Math.min(o, l.to) - s;
        c < u && (i || (i = [])).push(l.copy(c, u));
      }
    }
    if (i) {
      let a = new nt(i.sort(fi), $i);
      return r ? new yr([a, r]) : a;
    }
    return r || pt;
  }
  /**
  @internal
  */
  eq(e) {
    if (this == e)
      return !0;
    if (!(e instanceof nt) || this.local.length != e.local.length || this.children.length != e.children.length)
      return !1;
    for (let t = 0; t < this.local.length; t++)
      if (!this.local[t].eq(e.local[t]))
        return !1;
    for (let t = 0; t < this.children.length; t += 3)
      if (this.children[t] != e.children[t] || this.children[t + 1] != e.children[t + 1] || !this.children[t + 2].eq(e.children[t + 2]))
        return !1;
    return !0;
  }
  /**
  @internal
  */
  locals(e) {
    return Uf(this.localsInner(e));
  }
  /**
  @internal
  */
  localsInner(e) {
    if (this == pt)
      return $i;
    if (e.inlineContent || !this.local.some(Er.is))
      return this.local;
    let t = [];
    for (let r = 0; r < this.local.length; r++)
      this.local[r].type instanceof Er || t.push(this.local[r]);
    return t;
  }
  forEachSet(e) {
    e(this);
  }
}
nt.empty = new nt([], []);
nt.removeOverlap = Uf;
const pt = nt.empty;
class yr {
  constructor(e) {
    this.members = e;
  }
  map(e, t) {
    const r = this.members.map((i) => i.map(e, t, ui));
    return yr.from(r);
  }
  forChild(e, t) {
    if (t.isLeaf)
      return nt.empty;
    let r = [];
    for (let i = 0; i < this.members.length; i++) {
      let s = this.members[i].forChild(e, t);
      s != pt && (s instanceof yr ? r = r.concat(s.members) : r.push(s));
    }
    return yr.from(r);
  }
  eq(e) {
    if (!(e instanceof yr) || e.members.length != this.members.length)
      return !1;
    for (let t = 0; t < this.members.length; t++)
      if (!this.members[t].eq(e.members[t]))
        return !1;
    return !0;
  }
  locals(e) {
    let t, r = !0;
    for (let i = 0; i < this.members.length; i++) {
      let s = this.members[i].localsInner(e);
      if (s.length)
        if (!t)
          t = s;
        else {
          r && (t = t.slice(), r = !1);
          for (let o = 0; o < s.length; o++)
            t.push(s[o]);
        }
    }
    return t ? Uf(r ? t : t.sort(fi)) : $i;
  }
  // Create a group for the given array of decoration sets, or return
  // a single set when possible.
  static from(e) {
    switch (e.length) {
      case 0:
        return pt;
      case 1:
        return e[0];
      default:
        return new yr(e.every((t) => t instanceof nt) ? e : e.reduce((t, r) => t.concat(r instanceof nt ? r : r.members), []));
    }
  }
  forEachSet(e) {
    for (let t = 0; t < this.members.length; t++)
      this.members[t].forEachSet(e);
  }
}
function AM(n, e, t, r, i, s, o) {
  let a = n.slice();
  for (let c = 0, u = s; c < t.maps.length; c++) {
    let f = 0;
    t.maps[c].forEach((d, p, h, m) => {
      let g = m - h - (p - d);
      for (let v = 0; v < a.length; v += 3) {
        let w = a[v + 1];
        if (w < 0 || d > w + u - f)
          continue;
        let b = a[v] + u - f;
        p >= b ? a[v + 1] = d <= b ? -2 : -1 : d >= u && g && (a[v] += g, a[v + 1] += g);
      }
      f += g;
    }), u = t.maps[c].map(u, -1);
  }
  let l = !1;
  for (let c = 0; c < a.length; c += 3)
    if (a[c + 1] < 0) {
      if (a[c + 1] == -2) {
        l = !0, a[c + 1] = -1;
        continue;
      }
      let u = t.map(n[c] + s), f = u - i;
      if (f < 0 || f >= r.content.size) {
        l = !0;
        continue;
      }
      let d = t.map(n[c + 1] + s, -1), p = d - i, { index: h, offset: m } = r.content.findIndex(f), g = r.maybeChild(h);
      if (g && m == f && m + g.nodeSize == p) {
        let v = a[c + 2].mapInner(t, g, u + 1, n[c] + s + 1, o);
        v != pt ? (a[c] = f, a[c + 1] = p, a[c + 2] = v) : (a[c + 1] = -2, l = !0);
      } else
        l = !0;
    }
  if (l) {
    let c = NM(a, n, e, t, i, s, o), u = Ja(c, r, 0, o);
    e = u.local;
    for (let f = 0; f < a.length; f += 3)
      a[f + 1] < 0 && (a.splice(f, 3), f -= 3);
    for (let f = 0, d = 0; f < u.children.length; f += 3) {
      let p = u.children[f];
      for (; d < a.length && a[d] < p; )
        d += 3;
      a.splice(d, 0, u.children[f], u.children[f + 1], u.children[f + 2]);
    }
  }
  return new nt(e.sort(fi), a);
}
function Qv(n, e) {
  if (!e || !n.length)
    return n;
  let t = [];
  for (let r = 0; r < n.length; r++) {
    let i = n[r];
    t.push(new tn(i.from + e, i.to + e, i.type));
  }
  return t;
}
function NM(n, e, t, r, i, s, o) {
  function a(l, c) {
    for (let u = 0; u < l.local.length; u++) {
      let f = l.local[u].map(r, i, c);
      f ? t.push(f) : o.onRemove && o.onRemove(l.local[u].spec);
    }
    for (let u = 0; u < l.children.length; u += 3)
      a(l.children[u + 2], l.children[u] + c + 1);
  }
  for (let l = 0; l < n.length; l += 3)
    n[l + 1] == -1 && a(n[l + 2], e[l] + s + 1);
  return t;
}
function Zv(n, e, t) {
  if (e.isLeaf)
    return null;
  let r = t + e.nodeSize, i = null;
  for (let s = 0, o; s < n.length; s++)
    (o = n[s]) && o.from > t && o.to < r && ((i || (i = [])).push(o), n[s] = null);
  return i;
}
function e0(n) {
  let e = [];
  for (let t = 0; t < n.length; t++)
    n[t] != null && e.push(n[t]);
  return e;
}
function Ja(n, e, t, r) {
  let i = [], s = !1;
  e.forEach((a, l) => {
    let c = Zv(n, a, l + t);
    if (c) {
      s = !0;
      let u = Ja(c, a, t + l + 1, r);
      u != pt && i.push(l, l + a.nodeSize, u);
    }
  });
  let o = Qv(s ? e0(n) : n, -t).sort(fi);
  for (let a = 0; a < o.length; a++)
    o[a].type.valid(e, o[a]) || (r.onRemove && r.onRemove(o[a].spec), o.splice(a--, 1));
  return o.length || i.length ? new nt(o, i) : pt;
}
function fi(n, e) {
  return n.from - e.from || n.to - e.to;
}
function Uf(n) {
  let e = n;
  for (let t = 0; t < e.length - 1; t++) {
    let r = e[t];
    if (r.from != r.to)
      for (let i = t + 1; i < e.length; i++) {
        let s = e[i];
        if (s.from == r.from) {
          s.to != r.to && (e == n && (e = n.slice()), e[i] = s.copy(s.from, r.to), Mp(e, i + 1, s.copy(r.to, s.to)));
          continue;
        } else {
          s.from < r.to && (e == n && (e = n.slice()), e[t] = r.copy(r.from, s.from), Mp(e, i, r.copy(s.from, r.to)));
          break;
        }
      }
  }
  return e;
}
function Mp(n, e, t) {
  for (; e < n.length && fi(t, n[e]) > 0; )
    e++;
  n.splice(e, 0, t);
}
function xc(n) {
  let e = [];
  return n.someProp("decorations", (t) => {
    let r = t(n.state);
    r && r != pt && e.push(r);
  }), n.cursorWrapper && e.push(nt.create(n.state.doc, [n.cursorWrapper.deco])), yr.from(e);
}
const PM = {
  childList: !0,
  characterData: !0,
  characterDataOldValue: !0,
  attributes: !0,
  attributeOldValue: !0,
  subtree: !0
}, IM = It && Tr <= 11;
class DM {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  set(e) {
    this.anchorNode = e.anchorNode, this.anchorOffset = e.anchorOffset, this.focusNode = e.focusNode, this.focusOffset = e.focusOffset;
  }
  clear() {
    this.anchorNode = this.focusNode = null;
  }
  eq(e) {
    return e.anchorNode == this.anchorNode && e.anchorOffset == this.anchorOffset && e.focusNode == this.focusNode && e.focusOffset == this.focusOffset;
  }
}
class LM {
  constructor(e, t) {
    this.view = e, this.handleDOMChange = t, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new DM(), this.onCharData = null, this.suppressingSelectionUpdates = !1, this.lastChangedTextNode = null, this.observer = window.MutationObserver && new window.MutationObserver((r) => {
      for (let i = 0; i < r.length; i++)
        this.queue.push(r[i]);
      It && Tr <= 11 && r.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), IM && (this.onCharData = (r) => {
      this.queue.push({ target: r.target, type: "characterData", oldValue: r.prevValue }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this);
  }
  flushSoon() {
    this.flushingSoon < 0 && (this.flushingSoon = window.setTimeout(() => {
      this.flushingSoon = -1, this.flush();
    }, 20));
  }
  forceFlush() {
    this.flushingSoon > -1 && (window.clearTimeout(this.flushingSoon), this.flushingSoon = -1, this.flush());
  }
  start() {
    this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, PM)), this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection();
  }
  stop() {
    if (this.observer) {
      let e = this.observer.takeRecords();
      if (e.length) {
        for (let t = 0; t < e.length; t++)
          this.queue.push(e[t]);
        window.setTimeout(() => this.flush(), 20);
      }
      this.observer.disconnect();
    }
    this.onCharData && this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData), this.disconnectSelection();
  }
  connectSelection() {
    this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
  }
  disconnectSelection() {
    this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
  }
  suppressSelectionUpdates() {
    this.suppressingSelectionUpdates = !0, setTimeout(() => this.suppressingSelectionUpdates = !1, 50);
  }
  onSelectionChange() {
    if (Cp(this.view)) {
      if (this.suppressingSelectionUpdates)
        return Qn(this.view);
      if (It && Tr <= 11 && !this.view.state.selection.empty) {
        let e = this.view.domSelectionRange();
        if (e.focusNode && vi(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset))
          return this.flushSoon();
      }
      this.flush();
    }
  }
  setCurSelection() {
    this.currentSelection.set(this.view.domSelectionRange());
  }
  ignoreSelectionChange(e) {
    if (!e.focusNode)
      return !0;
    let t = /* @__PURE__ */ new Set(), r;
    for (let s = e.focusNode; s; s = vo(s))
      t.add(s);
    for (let s = e.anchorNode; s; s = vo(s))
      if (t.has(s)) {
        r = s;
        break;
      }
    let i = r && this.view.docView.nearestDesc(r);
    if (i && i.ignoreMutation({
      type: "selection",
      target: r.nodeType == 3 ? r.parentNode : r
    }))
      return this.setCurSelection(), !0;
  }
  pendingRecords() {
    if (this.observer)
      for (let e of this.observer.takeRecords())
        this.queue.push(e);
    return this.queue;
  }
  flush() {
    let { view: e } = this;
    if (!e.docView || this.flushingSoon > -1)
      return;
    let t = this.pendingRecords();
    t.length && (this.queue = []);
    let r = e.domSelectionRange(), i = !this.suppressingSelectionUpdates && !this.currentSelection.eq(r) && Cp(e) && !this.ignoreSelectionChange(r), s = -1, o = -1, a = !1, l = [];
    if (e.editable)
      for (let u = 0; u < t.length; u++) {
        let f = this.registerMutation(t[u], l);
        f && (s = s < 0 ? f.from : Math.min(f.from, s), o = o < 0 ? f.to : Math.max(f.to, o), f.typeOver && (a = !0));
      }
    if (_n && l.length) {
      let u = l.filter((f) => f.nodeName == "BR");
      if (u.length == 2) {
        let [f, d] = u;
        f.parentNode && f.parentNode.parentNode == d.parentNode ? d.remove() : f.remove();
      } else {
        let { focusNode: f } = this.currentSelection;
        for (let d of u) {
          let p = d.parentNode;
          p && p.nodeName == "LI" && (!f || $M(e, f) != p) && d.remove();
        }
      }
    }
    let c = null;
    s < 0 && i && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && kl(r) && (c = jf(e)) && c.eq(ce.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0, Qn(e), this.currentSelection.set(r), e.scrollToSelection()) : (s > -1 || i) && (s > -1 && (e.docView.markDirty(s, o), RM(e)), this.handleDOMChange(s, o, a, l), e.docView && e.docView.dirty ? e.updateState(e.state) : this.currentSelection.eq(r) || Qn(e), this.currentSelection.set(r));
  }
  registerMutation(e, t) {
    if (t.indexOf(e.target) > -1)
      return null;
    let r = this.view.docView.nearestDesc(e.target);
    if (e.type == "attributes" && (r == this.view.docView || e.attributeName == "contenteditable" || // Firefox sometimes fires spurious events for null/empty styles
    e.attributeName == "style" && !e.oldValue && !e.target.getAttribute("style")) || !r || r.ignoreMutation(e))
      return null;
    if (e.type == "childList") {
      for (let u = 0; u < e.addedNodes.length; u++) {
        let f = e.addedNodes[u];
        t.push(f), f.nodeType == 3 && (this.lastChangedTextNode = f);
      }
      if (r.contentDOM && r.contentDOM != r.dom && !r.contentDOM.contains(e.target))
        return { from: r.posBefore, to: r.posAfter };
      let i = e.previousSibling, s = e.nextSibling;
      if (It && Tr <= 11 && e.addedNodes.length)
        for (let u = 0; u < e.addedNodes.length; u++) {
          let { previousSibling: f, nextSibling: d } = e.addedNodes[u];
          (!f || Array.prototype.indexOf.call(e.addedNodes, f) < 0) && (i = f), (!d || Array.prototype.indexOf.call(e.addedNodes, d) < 0) && (s = d);
        }
      let o = i && i.parentNode == e.target ? ut(i) + 1 : 0, a = r.localPosFromDOM(e.target, o, -1), l = s && s.parentNode == e.target ? ut(s) : e.target.childNodes.length, c = r.localPosFromDOM(e.target, l, 1);
      return { from: a, to: c };
    } else return e.type == "attributes" ? { from: r.posAtStart - r.border, to: r.posAtEnd + r.border } : (this.lastChangedTextNode = e.target, {
      from: r.posAtStart,
      to: r.posAtEnd,
      // An event was generated for a text change that didn't change
      // any text. Mark the dom change to fall back to assuming the
      // selection was typed over with an identical value if it can't
      // find another change.
      typeOver: e.target.nodeValue == e.oldValue
    });
  }
}
let Ap = /* @__PURE__ */ new WeakMap(), Np = !1;
function RM(n) {
  if (!Ap.has(n) && (Ap.set(n, null), ["normal", "nowrap", "pre-line"].indexOf(getComputedStyle(n.dom).whiteSpace) !== -1)) {
    if (n.requiresGeckoHackNode = _n, Np)
      return;
    console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), Np = !0;
  }
}
function Pp(n, e) {
  let t = e.startContainer, r = e.startOffset, i = e.endContainer, s = e.endOffset, o = n.domAtPos(n.state.selection.anchor);
  return vi(o.node, o.offset, i, s) && ([t, r, i, s] = [i, s, t, r]), { anchorNode: t, anchorOffset: r, focusNode: i, focusOffset: s };
}
function FM(n, e) {
  if (e.getComposedRanges) {
    let i = e.getComposedRanges(n.root)[0];
    if (i)
      return Pp(n, i);
  }
  let t;
  function r(i) {
    i.preventDefault(), i.stopImmediatePropagation(), t = i.getTargetRanges()[0];
  }
  return n.dom.addEventListener("beforeinput", r, !0), document.execCommand("indent"), n.dom.removeEventListener("beforeinput", r, !0), t ? Pp(n, t) : null;
}
function $M(n, e) {
  for (let t = e.parentNode; t && t != n.dom; t = t.parentNode) {
    let r = n.docView.nearestDesc(t, !0);
    if (r && r.node.isBlock)
      return t;
  }
  return null;
}
function BM(n, e, t) {
  let { node: r, fromOffset: i, toOffset: s, from: o, to: a } = n.docView.parseRange(e, t), l = n.domSelectionRange(), c, u = l.anchorNode;
  if (u && n.dom.contains(u.nodeType == 1 ? u : u.parentNode) && (c = [{ node: u, offset: l.anchorOffset }], kl(l) || c.push({ node: l.focusNode, offset: l.focusOffset })), gt && n.input.lastKeyCode === 8)
    for (let g = s; g > i; g--) {
      let v = r.childNodes[g - 1], w = v.pmViewDesc;
      if (v.nodeName == "BR" && !w) {
        s = g;
        break;
      }
      if (!w || w.size)
        break;
    }
  let f = n.state.doc, d = n.someProp("domParser") || kr.fromSchema(n.state.schema), p = f.resolve(o), h = null, m = d.parse(r, {
    topNode: p.parent,
    topMatch: p.parent.contentMatchAt(p.index()),
    topOpen: !0,
    from: i,
    to: s,
    preserveWhitespace: p.parent.type.whitespace == "pre" ? "full" : !0,
    findPositions: c,
    ruleFromNode: jM,
    context: p
  });
  if (c && c[0].pos != null) {
    let g = c[0].pos, v = c[1] && c[1].pos;
    v == null && (v = g), h = { anchor: g + o, head: v + o };
  }
  return { doc: m, sel: h, from: o, to: a };
}
function jM(n) {
  let e = n.pmViewDesc;
  if (e)
    return e.parseRule();
  if (n.nodeName == "BR" && n.parentNode) {
    if (Tt && /^(ul|ol)$/i.test(n.parentNode.nodeName)) {
      let t = document.createElement("div");
      return t.appendChild(document.createElement("li")), { skip: t };
    } else if (n.parentNode.lastChild == n || Tt && /^(tr|table)$/i.test(n.parentNode.nodeName))
      return { ignore: !0 };
  } else if (n.nodeName == "IMG" && n.getAttribute("mark-placeholder"))
    return { ignore: !0 };
  return null;
}
const VM = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function zM(n, e, t, r, i) {
  let s = n.input.compositionPendingChanges || (n.composing ? n.input.compositionID : 0);
  if (n.input.compositionPendingChanges = 0, e < 0) {
    let T = n.input.lastSelectionTime > Date.now() - 50 ? n.input.lastSelectionOrigin : null, V = jf(n, T);
    if (V && !n.state.selection.eq(V)) {
      if (gt && hn && n.input.lastKeyCode === 13 && Date.now() - 100 < n.input.lastKeyCodeTime && n.someProp("handleKeyDown", (W) => W(n, Zr(13, "Enter"))))
        return;
      let X = n.state.tr.setSelection(V);
      T == "pointer" ? X.setMeta("pointer", !0) : T == "key" && X.scrollIntoView(), s && X.setMeta("composition", s), n.dispatch(X);
    }
    return;
  }
  let o = n.state.doc.resolve(e), a = o.sharedDepth(t);
  e = o.before(a + 1), t = n.state.doc.resolve(t).after(a + 1);
  let l = n.state.selection, c = BM(n, e, t), u = n.state.doc, f = u.slice(c.from, c.to), d, p;
  n.input.lastKeyCode === 8 && Date.now() - 100 < n.input.lastKeyCodeTime ? (d = n.state.selection.to, p = "end") : (d = n.state.selection.from, p = "start"), n.input.lastKeyCode = null;
  let h = WM(f.content, c.doc.content, c.from, d, p);
  if (h && n.input.domChangeCount++, (rs && n.input.lastIOSEnter > Date.now() - 225 || hn) && i.some((T) => T.nodeType == 1 && !VM.test(T.nodeName)) && (!h || h.endA >= h.endB) && n.someProp("handleKeyDown", (T) => T(n, Zr(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (!h)
    if (r && l instanceof le && !l.empty && l.$head.sameParent(l.$anchor) && !n.composing && !(c.sel && c.sel.anchor != c.sel.head))
      h = { start: l.from, endA: l.to, endB: l.to };
    else {
      if (c.sel) {
        let T = Ip(n, n.state.doc, c.sel);
        if (T && !T.eq(n.state.selection)) {
          let V = n.state.tr.setSelection(T);
          s && V.setMeta("composition", s), n.dispatch(V);
        }
      }
      return;
    }
  n.state.selection.from < n.state.selection.to && h.start == h.endB && n.state.selection instanceof le && (h.start > n.state.selection.from && h.start <= n.state.selection.from + 2 && n.state.selection.from >= c.from ? h.start = n.state.selection.from : h.endA < n.state.selection.to && h.endA >= n.state.selection.to - 2 && n.state.selection.to <= c.to && (h.endB += n.state.selection.to - h.endA, h.endA = n.state.selection.to)), It && Tr <= 11 && h.endB == h.start + 1 && h.endA == h.start && h.start > c.from && c.doc.textBetween(h.start - c.from - 1, h.start - c.from + 1) == "  " && (h.start--, h.endA--, h.endB--);
  let m = c.doc.resolveNoCache(h.start - c.from), g = c.doc.resolveNoCache(h.endB - c.from), v = u.resolve(h.start), w = m.sameParent(g) && m.parent.inlineContent && v.end() >= h.endA, b;
  if ((rs && n.input.lastIOSEnter > Date.now() - 225 && (!w || i.some((T) => T.nodeName == "DIV" || T.nodeName == "P")) || !w && m.pos < c.doc.content.size && !m.sameParent(g) && (b = ce.findFrom(c.doc.resolve(m.pos + 1), 1, !0)) && b.head == g.pos) && n.someProp("handleKeyDown", (T) => T(n, Zr(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (n.state.selection.anchor > h.start && GM(u, h.start, h.endA, m, g) && n.someProp("handleKeyDown", (T) => T(n, Zr(8, "Backspace")))) {
    hn && gt && n.domObserver.suppressSelectionUpdates();
    return;
  }
  gt && hn && h.endB == h.start && (n.input.lastAndroidDelete = Date.now()), hn && !w && m.start() != g.start() && g.parentOffset == 0 && m.depth == g.depth && c.sel && c.sel.anchor == c.sel.head && c.sel.head == h.endA && (h.endB -= 2, g = c.doc.resolveNoCache(h.endB - c.from), setTimeout(() => {
    n.someProp("handleKeyDown", function(T) {
      return T(n, Zr(13, "Enter"));
    });
  }, 20));
  let y = h.start, k = h.endA, C, S, O;
  if (w) {
    if (m.pos == g.pos)
      It && Tr <= 11 && m.parentOffset == 0 && (n.domObserver.suppressSelectionUpdates(), setTimeout(() => Qn(n), 20)), C = n.state.tr.delete(y, k), S = u.resolve(h.start).marksAcross(u.resolve(h.endA));
    else if (
      // Adding or removing a mark
      h.endA == h.endB && (O = HM(m.parent.content.cut(m.parentOffset, g.parentOffset), v.parent.content.cut(v.parentOffset, h.endA - v.start())))
    )
      C = n.state.tr, O.type == "add" ? C.addMark(y, k, O.mark) : C.removeMark(y, k, O.mark);
    else if (m.parent.child(m.index()).isText && m.index() == g.index() - (g.textOffset ? 0 : 1)) {
      let T = m.parent.textBetween(m.parentOffset, g.parentOffset);
      if (n.someProp("handleTextInput", (V) => V(n, y, k, T)))
        return;
      C = n.state.tr.insertText(T, y, k);
    }
  }
  if (C || (C = n.state.tr.replace(y, k, c.doc.slice(h.start - c.from, h.endB - c.from))), c.sel) {
    let T = Ip(n, C.doc, c.sel);
    T && !(gt && hn && n.composing && T.empty && (h.start != h.endB || n.input.lastAndroidDelete < Date.now() - 100) && (T.head == y || T.head == C.mapping.map(k) - 1) || It && T.empty && T.head == y) && C.setSelection(T);
  }
  S && C.ensureMarks(S), s && C.setMeta("composition", s), n.dispatch(C.scrollIntoView());
}
function Ip(n, e, t) {
  return Math.max(t.anchor, t.head) > e.content.size ? null : Vf(n, e.resolve(t.anchor), e.resolve(t.head));
}
function HM(n, e) {
  let t = n.firstChild.marks, r = e.firstChild.marks, i = t, s = r, o, a, l;
  for (let u = 0; u < r.length; u++)
    i = r[u].removeFromSet(i);
  for (let u = 0; u < t.length; u++)
    s = t[u].removeFromSet(s);
  if (i.length == 1 && s.length == 0)
    a = i[0], o = "add", l = (u) => u.mark(a.addToSet(u.marks));
  else if (i.length == 0 && s.length == 1)
    a = s[0], o = "remove", l = (u) => u.mark(a.removeFromSet(u.marks));
  else
    return null;
  let c = [];
  for (let u = 0; u < e.childCount; u++)
    c.push(l(e.child(u)));
  if (R.from(c).eq(n))
    return { mark: a, type: o };
}
function GM(n, e, t, r, i) {
  if (
    // The content must have shrunk
    t - e <= i.pos - r.pos || // newEnd must point directly at or after the end of the block that newStart points into
    kc(r, !0, !1) < i.pos
  )
    return !1;
  let s = n.resolve(e);
  if (!r.parent.isTextblock) {
    let a = s.nodeAfter;
    return a != null && t == e + a.nodeSize;
  }
  if (s.parentOffset < s.parent.content.size || !s.parent.isTextblock)
    return !1;
  let o = n.resolve(kc(s, !0, !0));
  return !o.parent.isTextblock || o.pos > t || kc(o, !0, !1) < t ? !1 : r.parent.content.cut(r.parentOffset).eq(o.parent.content);
}
function kc(n, e, t) {
  let r = n.depth, i = e ? n.end() : n.pos;
  for (; r > 0 && (e || n.indexAfter(r) == n.node(r).childCount); )
    r--, i++, e = !1;
  if (t) {
    let s = n.node(r).maybeChild(n.indexAfter(r));
    for (; s && !s.isLeaf; )
      s = s.firstChild, i++;
  }
  return i;
}
function WM(n, e, t, r, i) {
  let s = n.findDiffStart(e, t);
  if (s == null)
    return null;
  let { a: o, b: a } = n.findDiffEnd(e, t + n.size, t + e.size);
  if (i == "end") {
    let l = Math.max(0, s - Math.min(o, a));
    r -= o + l - s;
  }
  if (o < s && n.size < e.size) {
    let l = r <= s && r >= o ? s - r : 0;
    s -= l, s && s < e.size && Dp(e.textBetween(s - 1, s + 1)) && (s += l ? 1 : -1), a = s + (a - o), o = s;
  } else if (a < s) {
    let l = r <= s && r >= a ? s - r : 0;
    s -= l, s && s < n.size && Dp(n.textBetween(s - 1, s + 1)) && (s += l ? 1 : -1), o = s + (o - a), a = s;
  }
  return { start: s, endA: o, endB: a };
}
function Dp(n) {
  if (n.length != 2)
    return !1;
  let e = n.charCodeAt(0), t = n.charCodeAt(1);
  return e >= 56320 && e <= 57343 && t >= 55296 && t <= 56319;
}
class UM {
  /**
  Create a view. `place` may be a DOM node that the editor should
  be appended to, a function that will place it into the document,
  or an object whose `mount` property holds the node to use as the
  document container. If it is `null`, the editor will not be
  added to the document.
  */
  constructor(e, t) {
    this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new fM(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = t, this.state = t.state, this.directPlugins = t.plugins || [], this.directPlugins.forEach(Bp), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement("div"), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = Fp(this), Rp(this), this.nodeViews = $p(this), this.docView = mp(this.state.doc, Lp(this), xc(this), this.dom, this), this.domObserver = new LM(this, (r, i, s, o) => zM(this, r, i, s, o)), this.domObserver.start(), dM(this), this.updatePluginViews();
  }
  /**
  Holds `true` when a
  [composition](https://w3c.github.io/uievents/#events-compositionevents)
  is active.
  */
  get composing() {
    return this.input.composing;
  }
  /**
  The view's current [props](https://prosemirror.net/docs/ref/#view.EditorProps).
  */
  get props() {
    if (this._props.state != this.state) {
      let e = this._props;
      this._props = {};
      for (let t in e)
        this._props[t] = e[t];
      this._props.state = this.state;
    }
    return this._props;
  }
  /**
  Update the view's props. Will immediately cause an update to
  the DOM.
  */
  update(e) {
    e.handleDOMEvents != this._props.handleDOMEvents && Pu(this);
    let t = this._props;
    this._props = e, e.plugins && (e.plugins.forEach(Bp), this.directPlugins = e.plugins), this.updateStateInner(e.state, t);
  }
  /**
  Update the view by updating existing props object with the object
  given as argument. Equivalent to `view.update(Object.assign({},
  view.props, props))`.
  */
  setProps(e) {
    let t = {};
    for (let r in this._props)
      t[r] = this._props[r];
    t.state = this.state;
    for (let r in e)
      t[r] = e[r];
    this.update(t);
  }
  /**
  Update the editor's `state` prop, without touching any of the
  other props.
  */
  updateState(e) {
    this.updateStateInner(e, this._props);
  }
  updateStateInner(e, t) {
    var r;
    let i = this.state, s = !1, o = !1;
    e.storedMarks && this.composing && (Yv(this), o = !0), this.state = e;
    let a = i.plugins != e.plugins || this._props.plugins != t.plugins;
    if (a || this._props.plugins != t.plugins || this._props.nodeViews != t.nodeViews) {
      let p = $p(this);
      YM(p, this.nodeViews) && (this.nodeViews = p, s = !0);
    }
    (a || t.handleDOMEvents != this._props.handleDOMEvents) && Pu(this), this.editable = Fp(this), Rp(this);
    let l = xc(this), c = Lp(this), u = i.plugins != e.plugins && !i.doc.eq(e.doc) ? "reset" : e.scrollToSelection > i.scrollToSelection ? "to selection" : "preserve", f = s || !this.docView.matchesNode(e.doc, c, l);
    (f || !e.selection.eq(i.selection)) && (o = !0);
    let d = u == "preserve" && o && this.dom.style.overflowAnchor == null && T2(this);
    if (o) {
      this.domObserver.stop();
      let p = f && (It || gt) && !this.composing && !i.selection.empty && !e.selection.empty && KM(i.selection, e.selection);
      if (f) {
        let h = gt ? this.trackWrites = this.domSelectionRange().focusNode : null;
        this.composing && (this.input.compositionNode = kM(this)), (s || !this.docView.update(e.doc, c, l, this)) && (this.docView.updateOuterDeco(c), this.docView.destroy(), this.docView = mp(e.doc, c, l, this.dom, this)), h && !this.trackWrites && (p = !0);
      }
      p || !(this.input.mouseDown && this.domObserver.currentSelection.eq(this.domSelectionRange()) && X2(this)) ? Qn(this, p) : (Lv(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start();
    }
    this.updatePluginViews(i), !((r = this.dragging) === null || r === void 0) && r.node && !i.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, i), u == "reset" ? this.dom.scrollTop = 0 : u == "to selection" ? this.scrollToSelection() : d && O2(d);
  }
  /**
  @internal
  */
  scrollToSelection() {
    let e = this.domSelectionRange().focusNode;
    if (!this.someProp("handleScrollToSelection", (t) => t(this))) if (this.state.selection instanceof te) {
      let t = this.docView.domAfterPos(this.state.selection.from);
      t.nodeType == 1 && cp(this, t.getBoundingClientRect(), e);
    } else
      cp(this, this.coordsAtPos(this.state.selection.head, 1), e);
  }
  destroyPluginViews() {
    let e;
    for (; e = this.pluginViews.pop(); )
      e.destroy && e.destroy();
  }
  updatePluginViews(e) {
    if (!e || e.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
      this.prevDirectPlugins = this.directPlugins, this.destroyPluginViews();
      for (let t = 0; t < this.directPlugins.length; t++) {
        let r = this.directPlugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
      for (let t = 0; t < this.state.plugins.length; t++) {
        let r = this.state.plugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
    } else
      for (let t = 0; t < this.pluginViews.length; t++) {
        let r = this.pluginViews[t];
        r.update && r.update(this, e);
      }
  }
  updateDraggedNode(e, t) {
    let r = e.node, i = -1;
    if (this.state.doc.nodeAt(r.from) == r.node)
      i = r.from;
    else {
      let s = r.from + (this.state.doc.content.size - t.doc.content.size);
      (s > 0 && this.state.doc.nodeAt(s)) == r.node && (i = s);
    }
    this.dragging = new Xv(e.slice, e.move, i < 0 ? void 0 : te.create(this.state.doc, i));
  }
  someProp(e, t) {
    let r = this._props && this._props[e], i;
    if (r != null && (i = t ? t(r) : r))
      return i;
    for (let o = 0; o < this.directPlugins.length; o++) {
      let a = this.directPlugins[o].props[e];
      if (a != null && (i = t ? t(a) : a))
        return i;
    }
    let s = this.state.plugins;
    if (s)
      for (let o = 0; o < s.length; o++) {
        let a = s[o].props[e];
        if (a != null && (i = t ? t(a) : a))
          return i;
      }
  }
  /**
  Query whether the view has focus.
  */
  hasFocus() {
    if (It) {
      let e = this.root.activeElement;
      if (e == this.dom)
        return !0;
      if (!e || !this.dom.contains(e))
        return !1;
      for (; e && this.dom != e && this.dom.contains(e); ) {
        if (e.contentEditable == "false")
          return !1;
        e = e.parentElement;
      }
      return !0;
    }
    return this.root.activeElement == this.dom;
  }
  /**
  Focus the editor.
  */
  focus() {
    this.domObserver.stop(), this.editable && E2(this.dom), Qn(this), this.domObserver.start();
  }
  /**
  Get the document root in which the editor exists. This will
  usually be the top-level `document`, but might be a [shadow
  DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)
  root if the editor is inside one.
  */
  get root() {
    let e = this._root;
    if (e == null) {
      for (let t = this.dom.parentNode; t; t = t.parentNode)
        if (t.nodeType == 9 || t.nodeType == 11 && t.host)
          return t.getSelection || (Object.getPrototypeOf(t).getSelection = () => t.ownerDocument.getSelection()), this._root = t;
    }
    return e || document;
  }
  /**
  When an existing editor view is moved to a new document or
  shadow tree, call this to make it recompute its root.
  */
  updateRoot() {
    this._root = null;
  }
  /**
  Given a pair of viewport coordinates, return the document
  position that corresponds to them. May return null if the given
  coordinates aren't inside of the editor. When an object is
  returned, its `pos` property is the position nearest to the
  coordinates, and its `inside` property holds the position of the
  inner node that the position falls inside of, or -1 if it is at
  the top level, not in any node.
  */
  posAtCoords(e) {
    return I2(this, e);
  }
  /**
  Returns the viewport rectangle at a given document position.
  `left` and `right` will be the same number, as this returns a
  flat cursor-ish rectangle. If the position is between two things
  that aren't directly adjacent, `side` determines which element
  is used. When < 0, the element before the position is used,
  otherwise the element after.
  */
  coordsAtPos(e, t = 1) {
    return Ov(this, e, t);
  }
  /**
  Find the DOM position that corresponds to the given document
  position. When `side` is negative, find the position as close as
  possible to the content before the position. When positive,
  prefer positions close to the content after the position. When
  zero, prefer as shallow a position as possible.
  
  Note that you should **not** mutate the editor's internal DOM,
  only inspect it (and even that is usually not necessary).
  */
  domAtPos(e, t = 0) {
    return this.docView.domFromPos(e, t);
  }
  /**
  Find the DOM node that represents the document node after the
  given position. May return `null` when the position doesn't point
  in front of a node or if the node is inside an opaque node view.
  
  This is intended to be able to call things like
  `getBoundingClientRect` on that DOM node. Do **not** mutate the
  editor DOM directly, or add styling this way, since that will be
  immediately overriden by the editor as it redraws the node.
  */
  nodeDOM(e) {
    let t = this.docView.descAt(e);
    return t ? t.nodeDOM : null;
  }
  /**
  Find the document position that corresponds to a given DOM
  position. (Whenever possible, it is preferable to inspect the
  document structure directly, rather than poking around in the
  DOM, but sometimes—for example when interpreting an event
  target—you don't have a choice.)
  
  The `bias` parameter can be used to influence which side of a DOM
  node to use when the position is inside a leaf node.
  */
  posAtDOM(e, t, r = -1) {
    let i = this.docView.posFromDOM(e, t, r);
    if (i == null)
      throw new RangeError("DOM position not inside the editor");
    return i;
  }
  /**
  Find out whether the selection is at the end of a textblock when
  moving in a given direction. When, for example, given `"left"`,
  it will return true if moving left from the current cursor
  position would leave that position's parent textblock. Will apply
  to the view's current state by default, but it is possible to
  pass a different state.
  */
  endOfTextblock(e, t) {
    return $2(this, t || this.state, e);
  }
  /**
  Run the editor's paste logic with the given HTML string. The
  `event`, if given, will be passed to the
  [`handlePaste`](https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste) hook.
  */
  pasteHTML(e, t) {
    return wo(this, "", e, !1, t || new ClipboardEvent("paste"));
  }
  /**
  Run the editor's paste logic with the given plain-text input.
  */
  pasteText(e, t) {
    return wo(this, e, null, !0, t || new ClipboardEvent("paste"));
  }
  /**
  Removes the editor from the DOM and destroys all [node
  views](https://prosemirror.net/docs/ref/#view.NodeView).
  */
  destroy() {
    this.docView && (hM(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], xc(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null, m2());
  }
  /**
  This is true when the view has been
  [destroyed](https://prosemirror.net/docs/ref/#view.EditorView.destroy) (and thus should not be
  used anymore).
  */
  get isDestroyed() {
    return this.docView == null;
  }
  /**
  Used for testing.
  */
  dispatchEvent(e) {
    return mM(this, e);
  }
  /**
  Dispatch a transaction. Will call
  [`dispatchTransaction`](https://prosemirror.net/docs/ref/#view.DirectEditorProps.dispatchTransaction)
  when given, and otherwise defaults to applying the transaction to
  the current state and calling
  [`updateState`](https://prosemirror.net/docs/ref/#view.EditorView.updateState) with the result.
  This method is bound to the view instance, so that it can be
  easily passed around.
  */
  dispatch(e) {
    let t = this._props.dispatchTransaction;
    t ? t.call(this, e) : this.updateState(this.state.apply(e));
  }
  /**
  @internal
  */
  domSelectionRange() {
    let e = this.domSelection();
    return e ? Tt && this.root.nodeType === 11 && w2(this.dom.ownerDocument) == this.dom && FM(this, e) || e : { focusNode: null, focusOffset: 0, anchorNode: null, anchorOffset: 0 };
  }
  /**
  @internal
  */
  domSelection() {
    return this.root.getSelection();
  }
}
function Lp(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return e.class = "ProseMirror", e.contenteditable = String(n.editable), n.someProp("attributes", (t) => {
    if (typeof t == "function" && (t = t(n.state)), t)
      for (let r in t)
        r == "class" ? e.class += " " + t[r] : r == "style" ? e.style = (e.style ? e.style + ";" : "") + t[r] : !e[r] && r != "contenteditable" && r != "nodeName" && (e[r] = String(t[r]));
  }), e.translate || (e.translate = "no"), [tn.node(0, n.state.doc.content.size, e)];
}
function Rp(n) {
  if (n.markCursor) {
    let e = document.createElement("img");
    e.className = "ProseMirror-separator", e.setAttribute("mark-placeholder", "true"), e.setAttribute("alt", ""), n.cursorWrapper = { dom: e, deco: tn.widget(n.state.selection.from, e, { raw: !0, marks: n.markCursor }) };
  } else
    n.cursorWrapper = null;
}
function Fp(n) {
  return !n.someProp("editable", (e) => e(n.state) === !1);
}
function KM(n, e) {
  let t = Math.min(n.$anchor.sharedDepth(n.head), e.$anchor.sharedDepth(e.head));
  return n.$anchor.start(t) != e.$anchor.start(t);
}
function $p(n) {
  let e = /* @__PURE__ */ Object.create(null);
  function t(r) {
    for (let i in r)
      Object.prototype.hasOwnProperty.call(e, i) || (e[i] = r[i]);
  }
  return n.someProp("nodeViews", t), n.someProp("markViews", t), e;
}
function YM(n, e) {
  let t = 0, r = 0;
  for (let i in n) {
    if (n[i] != e[i])
      return !0;
    t++;
  }
  for (let i in e)
    r++;
  return t != r;
}
function Bp(n) {
  if (n.spec.state || n.spec.filterTransaction || n.spec.appendTransaction)
    throw new RangeError("Plugins passed directly to the view must not have a state component");
}
var Dr = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}, Qa = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"'
}, qM = typeof navigator < "u" && /Mac/.test(navigator.platform), XM = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var ft = 0; ft < 10; ft++) Dr[48 + ft] = Dr[96 + ft] = String(ft);
for (var ft = 1; ft <= 24; ft++) Dr[ft + 111] = "F" + ft;
for (var ft = 65; ft <= 90; ft++)
  Dr[ft] = String.fromCharCode(ft + 32), Qa[ft] = String.fromCharCode(ft);
for (var Tc in Dr) Qa.hasOwnProperty(Tc) || (Qa[Tc] = Dr[Tc]);
function JM(n) {
  var e = qM && n.metaKey && n.shiftKey && !n.ctrlKey && !n.altKey || XM && n.shiftKey && n.key && n.key.length == 1 || n.key == "Unidentified", t = !e && n.key || (n.shiftKey ? Qa : Dr)[n.keyCode] || n.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
const QM = typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : !1;
function ZM(n) {
  let e = n.split(/-(?!$)/), t = e[e.length - 1];
  t == "Space" && (t = " ");
  let r, i, s, o;
  for (let a = 0; a < e.length - 1; a++) {
    let l = e[a];
    if (/^(cmd|meta|m)$/i.test(l))
      o = !0;
    else if (/^a(lt)?$/i.test(l))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(l))
      i = !0;
    else if (/^s(hift)?$/i.test(l))
      s = !0;
    else if (/^mod$/i.test(l))
      QM ? o = !0 : i = !0;
    else
      throw new Error("Unrecognized modifier name: " + l);
  }
  return r && (t = "Alt-" + t), i && (t = "Ctrl-" + t), o && (t = "Meta-" + t), s && (t = "Shift-" + t), t;
}
function eA(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n)
    e[ZM(t)] = n[t];
  return e;
}
function Oc(n, e, t = !0) {
  return e.altKey && (n = "Alt-" + n), e.ctrlKey && (n = "Ctrl-" + n), e.metaKey && (n = "Meta-" + n), t && e.shiftKey && (n = "Shift-" + n), n;
}
function tA(n) {
  return new bt({ props: { handleKeyDown: t0(n) } });
}
function t0(n) {
  let e = eA(n);
  return function(t, r) {
    let i = JM(r), s, o = e[Oc(i, r)];
    if (o && o(t.state, t.dispatch, t))
      return !0;
    if (i.length == 1 && i != " ") {
      if (r.shiftKey) {
        let a = e[Oc(i, r, !1)];
        if (a && a(t.state, t.dispatch, t))
          return !0;
      }
      if ((r.shiftKey || r.altKey || r.metaKey || i.charCodeAt(0) > 127) && (s = Dr[r.keyCode]) && s != i) {
        let a = e[Oc(s, r)];
        if (a && a(t.state, t.dispatch, t))
          return !0;
      }
    }
    return !1;
  };
}
const nA = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function n0(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const rA = (n, e, t) => {
  let r = n0(n, t);
  if (!r)
    return !1;
  let i = Kf(r);
  if (!i) {
    let o = r.blockRange(), a = o && _s(o);
    return a == null ? !1 : (e && e(n.tr.lift(o, a).scrollIntoView()), !0);
  }
  let s = i.nodeBefore;
  if (o0(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (is(s, "end") || te.isSelectable(s)))
    for (let o = r.depth; ; o--) {
      let a = Sl(n.doc, r.before(o), r.after(o), G.empty);
      if (a && a.slice.size < a.to - a.from) {
        if (e) {
          let l = n.tr.step(a);
          l.setSelection(is(s, "end") ? ce.findFrom(l.doc.resolve(l.mapping.map(i.pos, -1)), -1) : te.create(l.doc, i.pos - s.nodeSize)), e(l.scrollIntoView());
        }
        return !0;
      }
      if (o == 1 || r.node(o - 1).childCount > 1)
        break;
    }
  return s.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - s.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, iA = (n, e, t) => {
  let r = n0(n, t);
  if (!r)
    return !1;
  let i = Kf(r);
  return i ? r0(n, i, e) : !1;
}, sA = (n, e, t) => {
  let r = i0(n, t);
  if (!r)
    return !1;
  let i = Yf(r);
  return i ? r0(n, i, e) : !1;
};
function r0(n, e, t) {
  let r = e.nodeBefore, i = r, s = e.pos - 1;
  for (; !i.isTextblock; s--) {
    if (i.type.spec.isolating)
      return !1;
    let u = i.lastChild;
    if (!u)
      return !1;
    i = u;
  }
  let o = e.nodeAfter, a = o, l = e.pos + 1;
  for (; !a.isTextblock; l++) {
    if (a.type.spec.isolating)
      return !1;
    let u = a.firstChild;
    if (!u)
      return !1;
    a = u;
  }
  let c = Sl(n.doc, s, l, G.empty);
  if (!c || c.from != s || c instanceof it && c.slice.size >= l - s)
    return !1;
  if (t) {
    let u = n.tr.step(c);
    u.setSelection(le.create(u.doc, s)), t(u.scrollIntoView());
  }
  return !0;
}
function is(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const oA = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, s = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    s = Kf(r);
  }
  let o = s && s.nodeBefore;
  return !o || !te.isSelectable(o) ? !1 : (e && e(n.tr.setSelection(te.create(n.doc, s.pos - o.nodeSize)).scrollIntoView()), !0);
};
function Kf(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function i0(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const aA = (n, e, t) => {
  let r = i0(n, t);
  if (!r)
    return !1;
  let i = Yf(r);
  if (!i)
    return !1;
  let s = i.nodeAfter;
  if (o0(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (is(s, "start") || te.isSelectable(s))) {
    let o = Sl(n.doc, r.before(), r.after(), G.empty);
    if (o && o.slice.size < o.to - o.from) {
      if (e) {
        let a = n.tr.step(o);
        a.setSelection(is(s, "start") ? ce.findFrom(a.doc.resolve(a.mapping.map(i.pos)), 1) : te.create(a.doc, a.mapping.map(i.pos))), e(a.scrollIntoView());
      }
      return !0;
    }
  }
  return s.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + s.nodeSize).scrollIntoView()), !0) : !1;
}, lA = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, s = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    s = Yf(r);
  }
  let o = s && s.nodeAfter;
  return !o || !te.isSelectable(o) ? !1 : (e && e(n.tr.setSelection(te.create(n.doc, s.pos)).scrollIntoView()), !0);
};
function Yf(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      let t = n.node(e);
      if (n.index(e) + 1 < t.childCount)
        return n.doc.resolve(n.after(e + 1));
      if (t.type.spec.isolating)
        break;
    }
  return null;
}
const cA = (n, e) => {
  let t = n.selection, r = t instanceof te, i;
  if (r) {
    if (t.node.isTextblock || !Vr(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = _l(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let s = n.tr.join(i);
    r && s.setSelection(te.create(s.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(s.scrollIntoView());
  }
  return !0;
}, uA = (n, e) => {
  let t = n.selection, r;
  if (t instanceof te) {
    if (t.node.isTextblock || !Vr(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = _l(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, fA = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), s = i && _s(i);
  return s == null ? !1 : (e && e(n.tr.lift(i, s).scrollIntoView()), !0);
}, dA = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function s0(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const hA = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), s = t.indexAfter(-1), o = s0(i.contentMatchAt(s));
  if (!o || !i.canReplaceWith(s, s, o))
    return !1;
  if (e) {
    let a = t.after(), l = n.tr.replaceWith(a, a, o.createAndFill());
    l.setSelection(ce.near(l.doc.resolve(a), 1)), e(l.scrollIntoView());
  }
  return !0;
}, pA = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof Cn || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let s = s0(i.parent.contentMatchAt(i.indexAfter()));
  if (!s || !s.isTextblock)
    return !1;
  if (e) {
    let o = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, a = n.tr.insert(o, s.createAndFill());
    a.setSelection(le.create(a.doc, o + 1)), e(a.scrollIntoView());
  }
  return !0;
}, mA = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let s = t.before();
    if (qi(n.doc, s))
      return e && e(n.tr.split(s).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && _s(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
}, gA = (n, e) => {
  let { $from: t, to: r } = n.selection, i, s = t.sharedDepth(r);
  return s == 0 ? !1 : (i = t.before(s), e && e(n.tr.setSelection(te.create(n.doc, i))), !0);
};
function yA(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, s = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(s - 1, s) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(s, s + 1) || !(i.isTextblock || Vr(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function o0(n, e, t, r) {
  let i = e.nodeBefore, s = e.nodeAfter, o, a, l = i.type.spec.isolating || s.type.spec.isolating;
  if (!l && yA(n, e, t))
    return !0;
  let c = !l && e.parent.canReplace(e.index(), e.index() + 1);
  if (c && (o = (a = i.contentMatchAt(i.childCount)).findWrapping(s.type)) && a.matchType(o[0] || s.type).validEnd) {
    if (t) {
      let p = e.pos + s.nodeSize, h = R.empty;
      for (let v = o.length - 1; v >= 0; v--)
        h = R.from(o[v].create(null, h));
      h = R.from(i.copy(h));
      let m = n.tr.step(new st(e.pos - 1, p, e.pos, p, new G(h, 1, 0), o.length, !0)), g = m.doc.resolve(p + 2 * o.length);
      g.nodeAfter && g.nodeAfter.type == i.type && Vr(m.doc, g.pos) && m.join(g.pos), t(m.scrollIntoView());
    }
    return !0;
  }
  let u = s.type.spec.isolating || r > 0 && l ? null : ce.findFrom(e, 1), f = u && u.$from.blockRange(u.$to), d = f && _s(f);
  if (d != null && d >= e.depth)
    return t && t(n.tr.lift(f, d).scrollIntoView()), !0;
  if (c && is(s, "start", !0) && is(i, "end")) {
    let p = i, h = [];
    for (; h.push(p), !p.isTextblock; )
      p = p.lastChild;
    let m = s, g = 1;
    for (; !m.isTextblock; m = m.firstChild)
      g++;
    if (p.canReplace(p.childCount, p.childCount, m.content)) {
      if (t) {
        let v = R.empty;
        for (let b = h.length - 1; b >= 0; b--)
          v = R.from(h[b].copy(v));
        let w = n.tr.step(new st(e.pos - h.length, e.pos + s.nodeSize, e.pos + g, e.pos + s.nodeSize - g, new G(v, h.length, 0), 0, !0));
        t(w.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function a0(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, s = i.depth;
    for (; i.node(s).isInline; ) {
      if (!s)
        return !1;
      s--;
    }
    return i.node(s).isTextblock ? (t && t(e.tr.setSelection(le.create(e.doc, n < 0 ? i.start(s) : i.end(s)))), !0) : !1;
  };
}
const vA = a0(-1), bA = a0(1);
function wA(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: s } = t.selection, o = i.blockRange(s), a = o && Ff(o, n, e);
    return a ? (r && r(t.tr.wrap(o, a).scrollIntoView()), !0) : !1;
  };
}
function jp(n, e = null) {
  return function(t, r) {
    let i = !1;
    for (let s = 0; s < t.selection.ranges.length && !i; s++) {
      let { $from: { pos: o }, $to: { pos: a } } = t.selection.ranges[s];
      t.doc.nodesBetween(o, a, (l, c) => {
        if (i)
          return !1;
        if (!(!l.isTextblock || l.hasMarkup(n, e)))
          if (l.type == n)
            i = !0;
          else {
            let u = t.doc.resolve(c), f = u.index();
            i = u.parent.canReplaceWith(f, f + 1, n);
          }
      });
    }
    if (!i)
      return !1;
    if (r) {
      let s = t.tr;
      for (let o = 0; o < t.selection.ranges.length; o++) {
        let { $from: { pos: a }, $to: { pos: l } } = t.selection.ranges[o];
        s.setBlockType(a, l, n, e);
      }
      r(s.scrollIntoView());
    }
    return !0;
  };
}
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function CA(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: s } = t.selection, o = i.blockRange(s), a = !1, l = o;
    if (!o)
      return !1;
    if (o.depth >= 2 && i.node(o.depth - 1).type.compatibleContent(n) && o.startIndex == 0) {
      if (i.index(o.depth - 1) == 0)
        return !1;
      let u = t.doc.resolve(o.start - 2);
      l = new Ha(u, u, o.depth), o.endIndex < o.parent.childCount && (o = new Ha(i, t.doc.resolve(s.end(o.depth)), o.depth)), a = !0;
    }
    let c = Ff(l, n, e, o);
    return c ? (r && r(_A(t.tr, o, c, a, n).scrollIntoView()), !0) : !1;
  };
}
function _A(n, e, t, r, i) {
  let s = R.empty;
  for (let u = t.length - 1; u >= 0; u--)
    s = R.from(t[u].type.create(t[u].attrs, s));
  n.step(new st(e.start - (r ? 2 : 0), e.end, e.start, e.end, new G(s, 0, 0), t.length, !0));
  let o = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (o = u + 1);
  let a = t.length - o, l = e.start + t.length - (r ? 2 : 0), c = e.parent;
  for (let u = e.startIndex, f = e.endIndex, d = !0; u < f; u++, d = !1)
    !d && qi(n.doc, l, a) && (n.split(l, a), l += 2 * a), l += c.child(u).nodeSize;
  return n;
}
function SA(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, s = r.blockRange(i, (o) => o.childCount > 0 && o.firstChild.type == n);
    return s ? t ? r.node(s.depth - 1).type == n ? xA(e, t, n, s) : kA(e, t, s) : !0 : !1;
  };
}
function xA(n, e, t, r) {
  let i = n.tr, s = r.end, o = r.$to.end(r.depth);
  s < o && (i.step(new st(s - 1, o, s, o, new G(R.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Ha(i.doc.resolve(r.$from.pos), i.doc.resolve(o), r.depth));
  const a = _s(r);
  if (a == null)
    return !1;
  i.lift(r, a);
  let l = i.mapping.map(s, -1) - 1;
  return Vr(i.doc, l) && i.join(l), e(i.scrollIntoView()), !0;
}
function kA(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let p = t.end, h = t.endIndex - 1, m = t.startIndex; h > m; h--)
    p -= i.child(h).nodeSize, r.delete(p - 1, p + 1);
  let s = r.doc.resolve(t.start), o = s.nodeAfter;
  if (r.mapping.map(t.end) != t.start + s.nodeAfter.nodeSize)
    return !1;
  let a = t.startIndex == 0, l = t.endIndex == i.childCount, c = s.node(-1), u = s.index(-1);
  if (!c.canReplace(u + (a ? 0 : 1), u + 1, o.content.append(l ? R.empty : R.from(i))))
    return !1;
  let f = s.pos, d = f + o.nodeSize;
  return r.step(new st(f - (a ? 1 : 0), d + (l ? 1 : 0), f + 1, d - 1, new G((a ? R.empty : R.from(i.copy(R.empty))).append(l ? R.empty : R.from(i.copy(R.empty))), a ? 0 : 1, l ? 0 : 1), a ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function TA(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, s = r.blockRange(i, (c) => c.childCount > 0 && c.firstChild.type == n);
    if (!s)
      return !1;
    let o = s.startIndex;
    if (o == 0)
      return !1;
    let a = s.parent, l = a.child(o - 1);
    if (l.type != n)
      return !1;
    if (t) {
      let c = l.lastChild && l.lastChild.type == a.type, u = R.from(c ? n.create() : null), f = new G(R.from(n.create(null, R.from(a.type.create(null, u)))), c ? 3 : 1, 0), d = s.start, p = s.end;
      t(e.tr.step(new st(d - (c ? 3 : 1), p, d, p, f, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function El(n) {
  const { state: e, transaction: t } = n;
  let { selection: r } = t, { doc: i } = t, { storedMarks: s } = t;
  return {
    ...e,
    apply: e.apply.bind(e),
    applyTransaction: e.applyTransaction.bind(e),
    plugins: e.plugins,
    schema: e.schema,
    reconfigure: e.reconfigure.bind(e),
    toJSON: e.toJSON.bind(e),
    get storedMarks() {
      return s;
    },
    get selection() {
      return r;
    },
    get doc() {
      return i;
    },
    get tr() {
      return r = t.selection, i = t.doc, s = t.storedMarks, t;
    }
  };
}
class Ml {
  constructor(e) {
    this.editor = e.editor, this.rawCommands = this.editor.extensionManager.commands, this.customState = e.state;
  }
  get hasCustomState() {
    return !!this.customState;
  }
  get state() {
    return this.customState || this.editor.state;
  }
  get commands() {
    const { rawCommands: e, editor: t, state: r } = this, { view: i } = t, { tr: s } = r, o = this.buildProps(s);
    return Object.fromEntries(Object.entries(e).map(([a, l]) => [a, (...u) => {
      const f = l(...u)(o);
      return !s.getMeta("preventDispatch") && !this.hasCustomState && i.dispatch(s), f;
    }]));
  }
  get chain() {
    return () => this.createChain();
  }
  get can() {
    return () => this.createCan();
  }
  createChain(e, t = !0) {
    const { rawCommands: r, editor: i, state: s } = this, { view: o } = i, a = [], l = !!e, c = e || s.tr, u = () => (!l && t && !c.getMeta("preventDispatch") && !this.hasCustomState && o.dispatch(c), a.every((d) => d === !0)), f = {
      ...Object.fromEntries(Object.entries(r).map(([d, p]) => [d, (...m) => {
        const g = this.buildProps(c, t), v = p(...m)(g);
        return a.push(v), f;
      }])),
      run: u
    };
    return f;
  }
  createCan(e) {
    const { rawCommands: t, state: r } = this, i = !1, s = e || r.tr, o = this.buildProps(s, i);
    return {
      ...Object.fromEntries(Object.entries(t).map(([l, c]) => [l, (...u) => c(...u)({ ...o, dispatch: void 0 })])),
      chain: () => this.createChain(s, i)
    };
  }
  buildProps(e, t = !0) {
    const { rawCommands: r, editor: i, state: s } = this, { view: o } = i, a = {
      tr: e,
      editor: i,
      view: o,
      state: El({
        state: s,
        transaction: e
      }),
      dispatch: t ? () => {
      } : void 0,
      chain: () => this.createChain(e, t),
      can: () => this.createCan(e),
      get commands() {
        return Object.fromEntries(Object.entries(r).map(([l, c]) => [l, (...u) => c(...u)(a)]));
      }
    };
    return a;
  }
}
class OA {
  constructor() {
    this.callbacks = {};
  }
  on(e, t) {
    return this.callbacks[e] || (this.callbacks[e] = []), this.callbacks[e].push(t), this;
  }
  emit(e, ...t) {
    const r = this.callbacks[e];
    return r && r.forEach((i) => i.apply(this, t)), this;
  }
  off(e, t) {
    const r = this.callbacks[e];
    return r && (t ? this.callbacks[e] = r.filter((i) => i !== t) : delete this.callbacks[e]), this;
  }
  once(e, t) {
    const r = (...i) => {
      this.off(e, r), t.apply(this, i);
    };
    return this.on(e, r);
  }
  removeAllListeners() {
    this.callbacks = {};
  }
}
function K(n, e, t) {
  return n.config[e] === void 0 && n.parent ? K(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? K(n.parent, e, t) : null
  }) : n.config[e];
}
function Al(n) {
  const e = n.filter((i) => i.type === "extension"), t = n.filter((i) => i.type === "node"), r = n.filter((i) => i.type === "mark");
  return {
    baseExtensions: e,
    nodeExtensions: t,
    markExtensions: r
  };
}
function l0(n) {
  const e = [], { nodeExtensions: t, markExtensions: r } = Al(n), i = [...t, ...r], s = {
    default: null,
    rendered: !0,
    renderHTML: null,
    parseHTML: null,
    keepOnSplit: !0,
    isRequired: !1
  };
  return n.forEach((o) => {
    const a = {
      name: o.name,
      options: o.options,
      storage: o.storage,
      extensions: i
    }, l = K(o, "addGlobalAttributes", a);
    if (!l)
      return;
    l().forEach((u) => {
      u.types.forEach((f) => {
        Object.entries(u.attributes).forEach(([d, p]) => {
          e.push({
            type: f,
            name: d,
            attribute: {
              ...s,
              ...p
            }
          });
        });
      });
    });
  }), i.forEach((o) => {
    const a = {
      name: o.name,
      options: o.options,
      storage: o.storage
    }, l = K(o, "addAttributes", a);
    if (!l)
      return;
    const c = l();
    Object.entries(c).forEach(([u, f]) => {
      const d = {
        ...s,
        ...f
      };
      typeof (d == null ? void 0 : d.default) == "function" && (d.default = d.default()), d != null && d.isRequired && (d == null ? void 0 : d.default) === void 0 && delete d.default, e.push({
        type: o.name,
        name: u,
        attribute: d
      });
    });
  }), e;
}
function at(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n])
      throw Error(`There is no node type named '${n}'. Maybe you forgot to add the extension?`);
    return e.nodes[n];
  }
  return n;
}
function Mt(...n) {
  return n.filter((e) => !!e).reduce((e, t) => {
    const r = { ...e };
    return Object.entries(t).forEach(([i, s]) => {
      if (!r[i]) {
        r[i] = s;
        return;
      }
      if (i === "class") {
        const a = s ? s.split(" ") : [], l = r[i] ? r[i].split(" ") : [], c = a.filter((u) => !l.includes(u));
        r[i] = [...l, ...c].join(" ");
      } else if (i === "style") {
        const a = s ? s.split(";").map((u) => u.trim()).filter(Boolean) : [], l = r[i] ? r[i].split(";").map((u) => u.trim()).filter(Boolean) : [], c = /* @__PURE__ */ new Map();
        l.forEach((u) => {
          const [f, d] = u.split(":").map((p) => p.trim());
          c.set(f, d);
        }), a.forEach((u) => {
          const [f, d] = u.split(":").map((p) => p.trim());
          c.set(f, d);
        }), r[i] = Array.from(c.entries()).map(([u, f]) => `${u}: ${f}`).join("; ");
      } else
        r[i] = s;
    }), r;
  }, {});
}
function Iu(n, e) {
  return e.filter((t) => t.type === n.type.name).filter((t) => t.attribute.rendered).map((t) => t.attribute.renderHTML ? t.attribute.renderHTML(n.attrs) || {} : {
    [t.name]: n.attrs[t.name]
  }).reduce((t, r) => Mt(t, r), {});
}
function c0(n) {
  return typeof n == "function";
}
function fe(n, e = void 0, ...t) {
  return c0(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function EA(n = {}) {
  return Object.keys(n).length === 0 && n.constructor === Object;
}
function MA(n) {
  return typeof n != "string" ? n : n.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(n) : n === "true" ? !0 : n === "false" ? !1 : n;
}
function Vp(n, e) {
  return "style" in n ? n : {
    ...n,
    getAttrs: (t) => {
      const r = n.getAttrs ? n.getAttrs(t) : n.attrs;
      if (r === !1)
        return !1;
      const i = e.reduce((s, o) => {
        const a = o.attribute.parseHTML ? o.attribute.parseHTML(t) : MA(t.getAttribute(o.name));
        return a == null ? s : {
          ...s,
          [o.name]: a
        };
      }, {});
      return { ...r, ...i };
    }
  };
}
function zp(n) {
  return Object.fromEntries(
    // @ts-ignore
    Object.entries(n).filter(([e, t]) => e === "attrs" && EA(t) ? !1 : t != null)
  );
}
function AA(n, e) {
  var t;
  const r = l0(n), { nodeExtensions: i, markExtensions: s } = Al(n), o = (t = i.find((c) => K(c, "topNode"))) === null || t === void 0 ? void 0 : t.name, a = Object.fromEntries(i.map((c) => {
    const u = r.filter((v) => v.type === c.name), f = {
      name: c.name,
      options: c.options,
      storage: c.storage,
      editor: e
    }, d = n.reduce((v, w) => {
      const b = K(w, "extendNodeSchema", f);
      return {
        ...v,
        ...b ? b(c) : {}
      };
    }, {}), p = zp({
      ...d,
      content: fe(K(c, "content", f)),
      marks: fe(K(c, "marks", f)),
      group: fe(K(c, "group", f)),
      inline: fe(K(c, "inline", f)),
      atom: fe(K(c, "atom", f)),
      selectable: fe(K(c, "selectable", f)),
      draggable: fe(K(c, "draggable", f)),
      code: fe(K(c, "code", f)),
      whitespace: fe(K(c, "whitespace", f)),
      linebreakReplacement: fe(K(c, "linebreakReplacement", f)),
      defining: fe(K(c, "defining", f)),
      isolating: fe(K(c, "isolating", f)),
      attrs: Object.fromEntries(u.map((v) => {
        var w;
        return [v.name, { default: (w = v == null ? void 0 : v.attribute) === null || w === void 0 ? void 0 : w.default }];
      }))
    }), h = fe(K(c, "parseHTML", f));
    h && (p.parseDOM = h.map((v) => Vp(v, u)));
    const m = K(c, "renderHTML", f);
    m && (p.toDOM = (v) => m({
      node: v,
      HTMLAttributes: Iu(v, u)
    }));
    const g = K(c, "renderText", f);
    return g && (p.toText = g), [c.name, p];
  })), l = Object.fromEntries(s.map((c) => {
    const u = r.filter((g) => g.type === c.name), f = {
      name: c.name,
      options: c.options,
      storage: c.storage,
      editor: e
    }, d = n.reduce((g, v) => {
      const w = K(v, "extendMarkSchema", f);
      return {
        ...g,
        ...w ? w(c) : {}
      };
    }, {}), p = zp({
      ...d,
      inclusive: fe(K(c, "inclusive", f)),
      excludes: fe(K(c, "excludes", f)),
      group: fe(K(c, "group", f)),
      spanning: fe(K(c, "spanning", f)),
      code: fe(K(c, "code", f)),
      attrs: Object.fromEntries(u.map((g) => {
        var v;
        return [g.name, { default: (v = g == null ? void 0 : g.attribute) === null || v === void 0 ? void 0 : v.default }];
      }))
    }), h = fe(K(c, "parseHTML", f));
    h && (p.parseDOM = h.map((g) => Vp(g, u)));
    const m = K(c, "renderHTML", f);
    return m && (p.toDOM = (g) => m({
      mark: g,
      HTMLAttributes: Iu(g, u)
    })), [c.name, p];
  }));
  return new rv({
    topNode: o,
    nodes: a,
    marks: l
  });
}
function Ec(n, e) {
  return e.nodes[n] || e.marks[n] || null;
}
function Hp(n, e) {
  return Array.isArray(e) ? e.some((t) => (typeof t == "string" ? t : t.name) === n.name) : e;
}
function qf(n, e) {
  const t = Oi.fromSchema(e).serializeFragment(n), i = document.implementation.createHTMLDocument().createElement("div");
  return i.appendChild(t), i.innerHTML;
}
const NA = (n, e = 500) => {
  let t = "";
  const r = n.parentOffset;
  return n.parent.nodesBetween(Math.max(0, r - e), r, (i, s, o, a) => {
    var l, c;
    const u = ((c = (l = i.type.spec).toText) === null || c === void 0 ? void 0 : c.call(l, {
      node: i,
      pos: s,
      parent: o,
      index: a
    })) || i.textContent || "%leaf%";
    t += i.isAtom && !i.isText ? u : u.slice(0, Math.max(0, r - s));
  }), t;
};
function Xf(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
class Nl {
  constructor(e) {
    this.find = e.find, this.handler = e.handler;
  }
}
const PA = (n, e) => {
  if (Xf(e))
    return e.exec(n);
  const t = e(n);
  if (!t)
    return null;
  const r = [t.text];
  return r.index = t.index, r.input = n, r.data = t.data, t.replaceWith && (t.text.includes(t.replaceWith) || console.warn('[tiptap warn]: "inputRuleMatch.replaceWith" must be part of "inputRuleMatch.text".'), r.push(t.replaceWith)), r;
};
function da(n) {
  var e;
  const { editor: t, from: r, to: i, text: s, rules: o, plugin: a } = n, { view: l } = t;
  if (l.composing)
    return !1;
  const c = l.state.doc.resolve(r);
  if (
    // check for code node
    c.parent.type.spec.code || !((e = c.nodeBefore || c.nodeAfter) === null || e === void 0) && e.marks.find((d) => d.type.spec.code)
  )
    return !1;
  let u = !1;
  const f = NA(c) + s;
  return o.forEach((d) => {
    if (u)
      return;
    const p = PA(f, d.find);
    if (!p)
      return;
    const h = l.state.tr, m = El({
      state: l.state,
      transaction: h
    }), g = {
      from: r - (p[0].length - s.length),
      to: i
    }, { commands: v, chain: w, can: b } = new Ml({
      editor: t,
      state: m
    });
    d.handler({
      state: m,
      range: g,
      match: p,
      commands: v,
      chain: w,
      can: b
    }) === null || !h.steps.length || (h.setMeta(a, {
      transform: h,
      from: r,
      to: i,
      text: s
    }), l.dispatch(h), u = !0);
  }), u;
}
function IA(n) {
  const { editor: e, rules: t } = n, r = new bt({
    state: {
      init() {
        return null;
      },
      apply(i, s, o) {
        const a = i.getMeta(r);
        if (a)
          return a;
        const l = i.getMeta("applyInputRules");
        return !!l && setTimeout(() => {
          let { text: u } = l;
          typeof u == "string" ? u = u : u = qf(R.from(u), o.schema);
          const { from: f } = l, d = f + u.length;
          da({
            editor: e,
            from: f,
            to: d,
            text: u,
            rules: t,
            plugin: r
          });
        }), i.selectionSet || i.docChanged ? null : s;
      }
    },
    props: {
      handleTextInput(i, s, o, a) {
        return da({
          editor: e,
          from: s,
          to: o,
          text: a,
          rules: t,
          plugin: r
        });
      },
      handleDOMEvents: {
        compositionend: (i) => (setTimeout(() => {
          const { $cursor: s } = i.state.selection;
          s && da({
            editor: e,
            from: s.pos,
            to: s.pos,
            text: "",
            rules: t,
            plugin: r
          });
        }), !1)
      },
      // add support for input rules to trigger on enter
      // this is useful for example for code blocks
      handleKeyDown(i, s) {
        if (s.key !== "Enter")
          return !1;
        const { $cursor: o } = i.state.selection;
        return o ? da({
          editor: e,
          from: o.pos,
          to: o.pos,
          text: `
`,
          rules: t,
          plugin: r
        }) : !1;
      }
    },
    // @ts-ignore
    isInputRules: !0
  });
  return r;
}
function DA(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function ha(n) {
  return DA(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function Pl(n, e) {
  const t = { ...n };
  return ha(n) && ha(e) && Object.keys(e).forEach((r) => {
    ha(e[r]) && ha(n[r]) ? t[r] = Pl(n[r], e[r]) : t[r] = e[r];
  }), t;
}
class Lr {
  constructor(e = {}) {
    this.type = "mark", this.name = "mark", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = fe(K(this, "addOptions", {
      name: this.name
    }))), this.storage = fe(K(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new Lr(e);
  }
  configure(e = {}) {
    const t = this.extend({
      ...this.config,
      addOptions: () => Pl(this.options, e)
    });
    return t.name = this.name, t.parent = this.parent, t;
  }
  extend(e = {}) {
    const t = new Lr(e);
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = fe(K(t, "addOptions", {
      name: t.name
    })), t.storage = fe(K(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
  static handleExit({ editor: e, mark: t }) {
    const { tr: r } = e.state, i = e.state.selection.$from;
    if (i.pos === i.end()) {
      const o = i.marks();
      if (!!!o.find((c) => (c == null ? void 0 : c.type.name) === t.name))
        return !1;
      const l = o.find((c) => (c == null ? void 0 : c.type.name) === t.name);
      return l && r.removeStoredMark(l), r.insertText(" ", i.pos), e.view.dispatch(r), !0;
    }
    return !1;
  }
}
function LA(n) {
  return typeof n == "number";
}
class RA {
  constructor(e) {
    this.find = e.find, this.handler = e.handler;
  }
}
const FA = (n, e, t) => {
  if (Xf(e))
    return [...n.matchAll(e)];
  const r = e(n, t);
  return r ? r.map((i) => {
    const s = [i.text];
    return s.index = i.index, s.input = n, s.data = i.data, i.replaceWith && (i.text.includes(i.replaceWith) || console.warn('[tiptap warn]: "pasteRuleMatch.replaceWith" must be part of "pasteRuleMatch.text".'), s.push(i.replaceWith)), s;
  }) : [];
};
function $A(n) {
  const { editor: e, state: t, from: r, to: i, rule: s, pasteEvent: o, dropEvent: a } = n, { commands: l, chain: c, can: u } = new Ml({
    editor: e,
    state: t
  }), f = [];
  return t.doc.nodesBetween(r, i, (p, h) => {
    if (!p.isTextblock || p.type.spec.code)
      return;
    const m = Math.max(r, h), g = Math.min(i, h + p.content.size), v = p.textBetween(m - h, g - h, void 0, "￼");
    FA(v, s.find, o).forEach((b) => {
      if (b.index === void 0)
        return;
      const y = m + b.index + 1, k = y + b[0].length, C = {
        from: t.tr.mapping.map(y),
        to: t.tr.mapping.map(k)
      }, S = s.handler({
        state: t,
        range: C,
        match: b,
        commands: l,
        chain: c,
        can: u,
        pasteEvent: o,
        dropEvent: a
      });
      f.push(S);
    });
  }), f.every((p) => p !== null);
}
const BA = (n) => {
  var e;
  const t = new ClipboardEvent("paste", {
    clipboardData: new DataTransfer()
  });
  return (e = t.clipboardData) === null || e === void 0 || e.setData("text/html", n), t;
};
function jA(n) {
  const { editor: e, rules: t } = n;
  let r = null, i = !1, s = !1, o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, a;
  try {
    a = typeof DragEvent < "u" ? new DragEvent("drop") : null;
  } catch {
    a = null;
  }
  const l = ({ state: u, from: f, to: d, rule: p, pasteEvt: h }) => {
    const m = u.tr, g = El({
      state: u,
      transaction: m
    });
    if (!(!$A({
      editor: e,
      state: g,
      from: Math.max(f - 1, 0),
      to: d.b - 1,
      rule: p,
      pasteEvent: h,
      dropEvent: a
    }) || !m.steps.length)) {
      try {
        a = typeof DragEvent < "u" ? new DragEvent("drop") : null;
      } catch {
        a = null;
      }
      return o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, m;
    }
  };
  return t.map((u) => new bt({
    // we register a global drag handler to track the current drag source element
    view(f) {
      const d = (p) => {
        var h;
        r = !((h = f.dom.parentElement) === null || h === void 0) && h.contains(p.target) ? f.dom.parentElement : null;
      };
      return window.addEventListener("dragstart", d), {
        destroy() {
          window.removeEventListener("dragstart", d);
        }
      };
    },
    props: {
      handleDOMEvents: {
        drop: (f, d) => (s = r === f.dom.parentElement, a = d, !1),
        paste: (f, d) => {
          var p;
          const h = (p = d.clipboardData) === null || p === void 0 ? void 0 : p.getData("text/html");
          return o = d, i = !!(h != null && h.includes("data-pm-slice")), !1;
        }
      }
    },
    appendTransaction: (f, d, p) => {
      const h = f[0], m = h.getMeta("uiEvent") === "paste" && !i, g = h.getMeta("uiEvent") === "drop" && !s, v = h.getMeta("applyPasteRules"), w = !!v;
      if (!m && !g && !w)
        return;
      if (w) {
        let { text: k } = v;
        typeof k == "string" ? k = k : k = qf(R.from(k), p.schema);
        const { from: C } = v, S = C + k.length, O = BA(k);
        return l({
          rule: u,
          state: p,
          from: C,
          to: { b: S },
          pasteEvt: O
        });
      }
      const b = d.doc.content.findDiffStart(p.doc.content), y = d.doc.content.findDiffEnd(p.doc.content);
      if (!(!LA(b) || !y || b === y.b))
        return l({
          rule: u,
          state: p,
          from: b,
          to: y,
          pasteEvt: o
        });
    }
  }));
}
function VA(n) {
  const e = n.filter((t, r) => n.indexOf(t) !== r);
  return Array.from(new Set(e));
}
class Gi {
  constructor(e, t) {
    this.splittableMarks = [], this.editor = t, this.extensions = Gi.resolve(e), this.schema = AA(this.extensions, t), this.setupExtensions();
  }
  /**
   * Returns a flattened and sorted extension list while
   * also checking for duplicated extensions and warns the user.
   * @param extensions An array of Tiptap extensions
   * @returns An flattened and sorted array of Tiptap extensions
   */
  static resolve(e) {
    const t = Gi.sort(Gi.flatten(e)), r = VA(t.map((i) => i.name));
    return r.length && console.warn(`[tiptap warn]: Duplicate extension names found: [${r.map((i) => `'${i}'`).join(", ")}]. This can lead to issues.`), t;
  }
  /**
   * Create a flattened array of extensions by traversing the `addExtensions` field.
   * @param extensions An array of Tiptap extensions
   * @returns A flattened array of Tiptap extensions
   */
  static flatten(e) {
    return e.map((t) => {
      const r = {
        name: t.name,
        options: t.options,
        storage: t.storage
      }, i = K(t, "addExtensions", r);
      return i ? [t, ...this.flatten(i())] : t;
    }).flat(10);
  }
  /**
   * Sort extensions by priority.
   * @param extensions An array of Tiptap extensions
   * @returns A sorted array of Tiptap extensions by priority
   */
  static sort(e) {
    return e.sort((r, i) => {
      const s = K(r, "priority") || 100, o = K(i, "priority") || 100;
      return s > o ? -1 : s < o ? 1 : 0;
    });
  }
  /**
   * Get all commands from the extensions.
   * @returns An object with all commands where the key is the command name and the value is the command function
   */
  get commands() {
    return this.extensions.reduce((e, t) => {
      const r = {
        name: t.name,
        options: t.options,
        storage: t.storage,
        editor: this.editor,
        type: Ec(t.name, this.schema)
      }, i = K(t, "addCommands", r);
      return i ? {
        ...e,
        ...i()
      } : e;
    }, {});
  }
  /**
   * Get all registered Prosemirror plugins from the extensions.
   * @returns An array of Prosemirror plugins
   */
  get plugins() {
    const { editor: e } = this, t = Gi.sort([...this.extensions].reverse()), r = [], i = [], s = t.map((o) => {
      const a = {
        name: o.name,
        options: o.options,
        storage: o.storage,
        editor: e,
        type: Ec(o.name, this.schema)
      }, l = [], c = K(o, "addKeyboardShortcuts", a);
      let u = {};
      if (o.type === "mark" && K(o, "exitable", a) && (u.ArrowRight = () => Lr.handleExit({ editor: e, mark: o })), c) {
        const m = Object.fromEntries(Object.entries(c()).map(([g, v]) => [g, () => v({ editor: e })]));
        u = { ...u, ...m };
      }
      const f = tA(u);
      l.push(f);
      const d = K(o, "addInputRules", a);
      Hp(o, e.options.enableInputRules) && d && r.push(...d());
      const p = K(o, "addPasteRules", a);
      Hp(o, e.options.enablePasteRules) && p && i.push(...p());
      const h = K(o, "addProseMirrorPlugins", a);
      if (h) {
        const m = h();
        l.push(...m);
      }
      return l;
    }).flat();
    return [
      IA({
        editor: e,
        rules: r
      }),
      ...jA({
        editor: e,
        rules: i
      }),
      ...s
    ];
  }
  /**
   * Get all attributes from the extensions.
   * @returns An array of attributes
   */
  get attributes() {
    return l0(this.extensions);
  }
  /**
   * Get all node views from the extensions.
   * @returns An object with all node views where the key is the node name and the value is the node view function
   */
  get nodeViews() {
    const { editor: e } = this, { nodeExtensions: t } = Al(this.extensions);
    return Object.fromEntries(t.filter((r) => !!K(r, "addNodeView")).map((r) => {
      const i = this.attributes.filter((l) => l.type === r.name), s = {
        name: r.name,
        options: r.options,
        storage: r.storage,
        editor: e,
        type: at(r.name, this.schema)
      }, o = K(r, "addNodeView", s);
      if (!o)
        return [];
      const a = (l, c, u, f, d) => {
        const p = Iu(l, i);
        return o()({
          // pass-through
          node: l,
          view: c,
          getPos: u,
          decorations: f,
          innerDecorations: d,
          // tiptap-specific
          editor: e,
          extension: r,
          HTMLAttributes: p
        });
      };
      return [r.name, a];
    }));
  }
  /**
   * Go through all extensions, create extension storages & setup marks
   * & bind editor event listener.
   */
  setupExtensions() {
    this.extensions.forEach((e) => {
      var t;
      this.editor.extensionStorage[e.name] = e.storage;
      const r = {
        name: e.name,
        options: e.options,
        storage: e.storage,
        editor: this.editor,
        type: Ec(e.name, this.schema)
      };
      e.type === "mark" && (!((t = fe(K(e, "keepOnSplit", r))) !== null && t !== void 0) || t) && this.splittableMarks.push(e.name);
      const i = K(e, "onBeforeCreate", r), s = K(e, "onCreate", r), o = K(e, "onUpdate", r), a = K(e, "onSelectionUpdate", r), l = K(e, "onTransaction", r), c = K(e, "onFocus", r), u = K(e, "onBlur", r), f = K(e, "onDestroy", r);
      i && this.editor.on("beforeCreate", i), s && this.editor.on("create", s), o && this.editor.on("update", o), a && this.editor.on("selectionUpdate", a), l && this.editor.on("transaction", l), c && this.editor.on("focus", c), u && this.editor.on("blur", u), f && this.editor.on("destroy", f);
    });
  }
}
class dt {
  constructor(e = {}) {
    this.type = "extension", this.name = "extension", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = fe(K(this, "addOptions", {
      name: this.name
    }))), this.storage = fe(K(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new dt(e);
  }
  configure(e = {}) {
    const t = this.extend({
      ...this.config,
      addOptions: () => Pl(this.options, e)
    });
    return t.name = this.name, t.parent = this.parent, t;
  }
  extend(e = {}) {
    const t = new dt({ ...this.config, ...e });
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = fe(K(t, "addOptions", {
      name: t.name
    })), t.storage = fe(K(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
}
function u0(n, e, t) {
  const { from: r, to: i } = e, { blockSeparator: s = `

`, textSerializers: o = {} } = t || {};
  let a = "";
  return n.nodesBetween(r, i, (l, c, u, f) => {
    var d;
    l.isBlock && c > r && (a += s);
    const p = o == null ? void 0 : o[l.type.name];
    if (p)
      return u && (a += p({
        node: l,
        pos: c,
        parent: u,
        index: f,
        range: e
      })), !1;
    l.isText && (a += (d = l == null ? void 0 : l.text) === null || d === void 0 ? void 0 : d.slice(Math.max(r, c) - c, i - c));
  }), a;
}
function f0(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
const zA = dt.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return {
      blockSeparator: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      new bt({
        key: new un("clipboardTextSerializer"),
        props: {
          clipboardTextSerializer: () => {
            const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, { ranges: s } = i, o = Math.min(...s.map((u) => u.$from.pos)), a = Math.max(...s.map((u) => u.$to.pos)), l = f0(t);
            return u0(r, { from: o, to: a }, {
              ...this.options.blockSeparator !== void 0 ? { blockSeparator: this.options.blockSeparator } : {},
              textSerializers: l
            });
          }
        }
      })
    ];
  }
}), HA = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  var t;
  n.isDestroyed || (e.dom.blur(), (t = window == null ? void 0 : window.getSelection()) === null || t === void 0 || t.removeAllRanges());
}), !0), GA = (n = !1) => ({ commands: e }) => e.setContent("", n), WA = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: s, $to: o }) => {
    n.doc.nodesBetween(s.pos, o.pos, (a, l) => {
      if (a.type.isText)
        return;
      const { doc: c, mapping: u } = e, f = c.resolve(u.map(l)), d = c.resolve(u.map(l + a.nodeSize)), p = f.blockRange(d);
      if (!p)
        return;
      const h = _s(p);
      if (a.type.isTextblock) {
        const { defaultType: m } = f.parent.contentMatchAt(f.index());
        e.setNodeMarkup(p.start, m);
      }
      (h || h === 0) && e.lift(p, h);
    });
  }), !0;
}, UA = (n) => (e) => n(e), KA = () => ({ state: n, dispatch: e }) => pA(n, e), YA = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, s = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const o = r.mapping.map(e);
  return r.insert(o, s.content), r.setSelection(new le(r.doc.resolve(o - 1))), !0;
}, qA = () => ({ tr: n, dispatch: e }) => {
  const { selection: t } = n, r = t.$anchor.node();
  if (r.content.size > 0)
    return !1;
  const i = n.selection.$anchor;
  for (let s = i.depth; s > 0; s -= 1)
    if (i.node(s).type === r.type) {
      if (e) {
        const a = i.before(s), l = i.after(s);
        n.delete(a, l).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, XA = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = at(n, t.schema), s = e.selection.$anchor;
  for (let o = s.depth; o > 0; o -= 1)
    if (s.node(o).type === i) {
      if (r) {
        const l = s.before(o), c = s.after(o);
        e.delete(l, c).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, JA = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, QA = () => ({ state: n, dispatch: e }) => nA(n, e), ZA = () => ({ commands: n }) => n.keyboardShortcut("Enter"), eN = () => ({ state: n, dispatch: e }) => hA(n, e);
function Za(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : Xf(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function d0(n, e, t = {}) {
  return n.find((r) => r.type === e && Za(
    // Only check equality for the attributes that are provided
    Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])),
    t
  ));
}
function Gp(n, e, t = {}) {
  return !!d0(n, e, t);
}
function Jf(n, e, t) {
  var r;
  if (!n || !e)
    return;
  let i = n.parent.childAfter(n.parentOffset);
  if ((!i.node || !i.node.marks.some((u) => u.type === e)) && (i = n.parent.childBefore(n.parentOffset)), !i.node || !i.node.marks.some((u) => u.type === e) || (t = t || ((r = i.node.marks[0]) === null || r === void 0 ? void 0 : r.attrs), !d0([...i.node.marks], e, t)))
    return;
  let o = i.index, a = n.start() + i.offset, l = o + 1, c = a + i.node.nodeSize;
  for (; o > 0 && Gp([...n.parent.child(o - 1).marks], e, t); )
    o -= 1, a -= n.parent.child(o).nodeSize;
  for (; l < n.parent.childCount && Gp([...n.parent.child(l).marks], e, t); )
    c += n.parent.child(l).nodeSize, l += 1;
  return {
    from: a,
    to: c
  };
}
function Hr(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n])
      throw Error(`There is no mark type named '${n}'. Maybe you forgot to add the extension?`);
    return e.marks[n];
  }
  return n;
}
const tN = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const s = Hr(n, r.schema), { doc: o, selection: a } = t, { $from: l, from: c, to: u } = a;
  if (i) {
    const f = Jf(l, s, e);
    if (f && f.from <= c && f.to >= u) {
      const d = le.create(o, f.from, f.to);
      t.setSelection(d);
    }
  }
  return !0;
}, nN = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1)
    if (t[r](e))
      return !0;
  return !1;
};
function Qf(n) {
  return n instanceof le;
}
function Xn(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function h0(n, e = null) {
  if (!e)
    return null;
  const t = ce.atStart(n), r = ce.atEnd(n);
  if (e === "start" || e === !0)
    return t;
  if (e === "end")
    return r;
  const i = t.from, s = r.to;
  return e === "all" ? le.create(n, Xn(0, i, s), Xn(n.content.size, i, s)) : le.create(n, Xn(e, i, s), Xn(e, i, s));
}
function Zf() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
const rN = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: s }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const o = () => {
    Zf() && r.dom.focus(), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  if (r.hasFocus() && n === null || n === !1)
    return !0;
  if (s && n === null && !Qf(t.state.selection))
    return o(), !0;
  const a = h0(i.doc, n) || t.state.selection, l = t.state.selection.eq(a);
  return s && (l || i.setSelection(a), l && i.storedMarks && i.setStoredMarks(i.storedMarks), o()), !0;
}, iN = (n, e) => (t) => n.every((r, i) => e(r, { ...t, index: i })), sN = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({ from: t.selection.from, to: t.selection.to }, n, e), p0 = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && p0(r);
  }
  return n;
};
function pa(n) {
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return p0(t);
}
function el(n, e, t) {
  if (n instanceof xr || n instanceof R)
    return n;
  t = {
    slice: !0,
    parseOptions: {},
    ...t
  };
  const r = typeof n == "object" && n !== null, i = typeof n == "string";
  if (r)
    try {
      if (Array.isArray(n) && n.length > 0)
        return R.fromArray(n.map((a) => e.nodeFromJSON(a)));
      const o = e.nodeFromJSON(n);
      return t.errorOnInvalidContent && o.check(), o;
    } catch (s) {
      if (t.errorOnInvalidContent)
        throw new Error("[tiptap error]: Invalid JSON content", { cause: s });
      return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", s), el("", e, t);
    }
  if (i) {
    if (t.errorOnInvalidContent) {
      let o = !1, a = "";
      const l = new rv({
        topNode: e.spec.topNode,
        marks: e.spec.marks,
        // Prosemirror's schemas are executed such that: the last to execute, matches last
        // This means that we can add a catch-all node at the end of the schema to catch any content that we don't know how to handle
        nodes: e.spec.nodes.append({
          __tiptap__private__unknown__catch__all__node: {
            content: "inline*",
            group: "block",
            parseDOM: [
              {
                tag: "*",
                getAttrs: (c) => (o = !0, a = typeof c == "string" ? c : c.outerHTML, null)
              }
            ]
          }
        })
      });
      if (t.slice ? kr.fromSchema(l).parseSlice(pa(n), t.parseOptions) : kr.fromSchema(l).parse(pa(n), t.parseOptions), t.errorOnInvalidContent && o)
        throw new Error("[tiptap error]: Invalid HTML content", { cause: new Error(`Invalid element found: ${a}`) });
    }
    const s = kr.fromSchema(e);
    return t.slice ? s.parseSlice(pa(n), t.parseOptions).content : s.parse(pa(n), t.parseOptions);
  }
  return el("", e, t);
}
function oN(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e)
    return;
  const i = n.steps[r];
  if (!(i instanceof it || i instanceof st))
    return;
  const s = n.mapping.maps[r];
  let o = 0;
  s.forEach((a, l, c, u) => {
    o === 0 && (o = u);
  }), n.setSelection(ce.near(n.doc.resolve(o), t));
}
const aN = (n) => !("type" in n), lN = (n, e, t) => ({ tr: r, dispatch: i, editor: s }) => {
  var o;
  if (i) {
    t = {
      parseOptions: s.options.parseOptions,
      updateSelection: !0,
      applyInputRules: !1,
      applyPasteRules: !1,
      ...t
    };
    let a;
    try {
      a = el(e, s.schema, {
        parseOptions: {
          preserveWhitespace: "full",
          ...t.parseOptions
        },
        errorOnInvalidContent: (o = t.errorOnInvalidContent) !== null && o !== void 0 ? o : s.options.enableContentCheck
      });
    } catch (h) {
      return s.emit("contentError", {
        editor: s,
        error: h,
        disableCollaboration: () => {
          s.storage.collaboration && (s.storage.collaboration.isDisabled = !0);
        }
      }), !1;
    }
    let { from: l, to: c } = typeof n == "number" ? { from: n, to: n } : { from: n.from, to: n.to }, u = !0, f = !0;
    if ((aN(a) ? a : [a]).forEach((h) => {
      h.check(), u = u ? h.isText && h.marks.length === 0 : !1, f = f ? h.isBlock : !1;
    }), l === c && f) {
      const { parent: h } = r.doc.resolve(l);
      h.isTextblock && !h.type.spec.code && !h.childCount && (l -= 1, c += 1);
    }
    let p;
    if (u) {
      if (Array.isArray(e))
        p = e.map((h) => h.text || "").join("");
      else if (e instanceof R) {
        let h = "";
        e.forEach((m) => {
          m.text && (h += m.text);
        }), p = h;
      } else typeof e == "object" && e && e.text ? p = e.text : p = e;
      r.insertText(p, l, c);
    } else
      p = a, r.replaceWith(l, c, p);
    t.updateSelection && oN(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", { from: l, text: p }), t.applyPasteRules && r.setMeta("applyPasteRules", { from: l, text: p });
  }
  return !0;
}, cN = () => ({ state: n, dispatch: e }) => cA(n, e), uN = () => ({ state: n, dispatch: e }) => uA(n, e), fN = () => ({ state: n, dispatch: e }) => rA(n, e), dN = () => ({ state: n, dispatch: e }) => aA(n, e), hN = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = _l(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, pN = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = _l(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, mN = () => ({ state: n, dispatch: e }) => iA(n, e), gN = () => ({ state: n, dispatch: e }) => sA(n, e);
function m0() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function yN(n) {
  const e = n.split(/-(?!$)/);
  let t = e[e.length - 1];
  t === "Space" && (t = " ");
  let r, i, s, o;
  for (let a = 0; a < e.length - 1; a += 1) {
    const l = e[a];
    if (/^(cmd|meta|m)$/i.test(l))
      o = !0;
    else if (/^a(lt)?$/i.test(l))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(l))
      i = !0;
    else if (/^s(hift)?$/i.test(l))
      s = !0;
    else if (/^mod$/i.test(l))
      Zf() || m0() ? o = !0 : i = !0;
    else
      throw new Error(`Unrecognized modifier name: ${l}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), o && (t = `Meta-${t}`), s && (t = `Shift-${t}`), t;
}
const vN = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const s = yN(n).split(/-(?!$)/), o = s.find((c) => !["Alt", "Ctrl", "Meta", "Shift"].includes(c)), a = new KeyboardEvent("keydown", {
    key: o === "Space" ? " " : o,
    altKey: s.includes("Alt"),
    ctrlKey: s.includes("Ctrl"),
    metaKey: s.includes("Meta"),
    shiftKey: s.includes("Shift"),
    bubbles: !0,
    cancelable: !0
  }), l = e.captureTransaction(() => {
    t.someProp("handleKeyDown", (c) => c(t, a));
  });
  return l == null || l.steps.forEach((c) => {
    const u = c.map(r.mapping);
    u && i && r.maybeStep(u);
  }), !0;
};
function _o(n, e, t = {}) {
  const { from: r, to: i, empty: s } = n.selection, o = e ? at(e, n.schema) : null, a = [];
  n.doc.nodesBetween(r, i, (f, d) => {
    if (f.isText)
      return;
    const p = Math.max(r, d), h = Math.min(i, d + f.nodeSize);
    a.push({
      node: f,
      from: p,
      to: h
    });
  });
  const l = i - r, c = a.filter((f) => o ? o.name === f.node.type.name : !0).filter((f) => Za(f.node.attrs, t, { strict: !1 }));
  return s ? !!c.length : c.reduce((f, d) => f + d.to - d.from, 0) >= l;
}
const bN = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = at(n, t.schema);
  return _o(t, i, e) ? fA(t, r) : !1;
}, wN = () => ({ state: n, dispatch: e }) => mA(n, e), CN = (n) => ({ state: e, dispatch: t }) => {
  const r = at(n, e.schema);
  return SA(r)(e, t);
}, _N = () => ({ state: n, dispatch: e }) => dA(n, e);
function Il(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function Wp(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const SN = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let s = null, o = null;
  const a = Il(typeof n == "string" ? n : n.name, r.schema);
  return a ? (a === "node" && (s = at(n, r.schema)), a === "mark" && (o = Hr(n, r.schema)), i && t.selection.ranges.forEach((l) => {
    r.doc.nodesBetween(l.$from.pos, l.$to.pos, (c, u) => {
      s && s === c.type && t.setNodeMarkup(u, void 0, Wp(c.attrs, e)), o && c.marks.length && c.marks.forEach((f) => {
        o === f.type && t.addMark(u, u + c.nodeSize, o.create(Wp(f.attrs, e)));
      });
    });
  }), !0) : !1;
}, xN = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), kN = () => ({ tr: n, commands: e }) => e.setTextSelection({
  from: 0,
  to: n.doc.content.size
}), TN = () => ({ state: n, dispatch: e }) => oA(n, e), ON = () => ({ state: n, dispatch: e }) => lA(n, e), EN = () => ({ state: n, dispatch: e }) => gA(n, e), MN = () => ({ state: n, dispatch: e }) => bA(n, e), AN = () => ({ state: n, dispatch: e }) => vA(n, e);
function Du(n, e, t = {}, r = {}) {
  return el(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const NN = (n, e = !1, t = {}, r = {}) => ({ editor: i, tr: s, dispatch: o, commands: a }) => {
  var l, c;
  const { doc: u } = s;
  if (t.preserveWhitespace !== "full") {
    const f = Du(n, i.schema, t, {
      errorOnInvalidContent: (l = r.errorOnInvalidContent) !== null && l !== void 0 ? l : i.options.enableContentCheck
    });
    return o && s.replaceWith(0, u.content.size, f).setMeta("preventUpdate", !e), !0;
  }
  return o && s.setMeta("preventUpdate", !e), a.insertContentAt({ from: 0, to: u.content.size }, n, {
    parseOptions: t,
    errorOnInvalidContent: (c = r.errorOnInvalidContent) !== null && c !== void 0 ? c : i.options.enableContentCheck
  });
};
function g0(n, e) {
  const t = Hr(e, n.schema), { from: r, to: i, empty: s } = n.selection, o = [];
  s ? (n.storedMarks && o.push(...n.storedMarks), o.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (l) => {
    o.push(...l.marks);
  });
  const a = o.find((l) => l.type.name === t.name);
  return a ? { ...a.attrs } : {};
}
function PN(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
function IN(n, e) {
  for (let t = n.depth; t > 0; t -= 1) {
    const r = n.node(t);
    if (e(r))
      return {
        pos: t > 0 ? n.before(t) : 0,
        start: n.start(t),
        depth: t,
        node: r
      };
  }
}
function ed(n) {
  return (e) => IN(e.$from, n);
}
function DN(n, e) {
  const t = {
    from: 0,
    to: n.content.size
  };
  return u0(n, t, e);
}
function LN(n, e) {
  const t = at(e, n.schema), { from: r, to: i } = n.selection, s = [];
  n.doc.nodesBetween(r, i, (a) => {
    s.push(a);
  });
  const o = s.reverse().find((a) => a.type.name === t.name);
  return o ? { ...o.attrs } : {};
}
function RN(n, e) {
  const t = Il(typeof e == "string" ? e : e.name, n.schema);
  return t === "node" ? LN(n, e) : t === "mark" ? g0(n, e) : {};
}
function y0(n, e, t) {
  const r = [];
  return n === e ? t.resolve(n).marks().forEach((i) => {
    const s = t.resolve(n), o = Jf(s, i.type);
    o && r.push({
      mark: i,
      ...o
    });
  }) : t.nodesBetween(n, e, (i, s) => {
    !i || (i == null ? void 0 : i.nodeSize) === void 0 || r.push(...i.marks.map((o) => ({
      from: s,
      to: s + i.nodeSize,
      mark: o
    })));
  }), r;
}
function Aa(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((s) => s.type === e && s.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function Lu(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, s = e ? Hr(e, n.schema) : null;
  if (r)
    return !!(n.storedMarks || n.selection.$from.marks()).filter((f) => s ? s.name === f.type.name : !0).find((f) => Za(f.attrs, t, { strict: !1 }));
  let o = 0;
  const a = [];
  if (i.forEach(({ $from: f, $to: d }) => {
    const p = f.pos, h = d.pos;
    n.doc.nodesBetween(p, h, (m, g) => {
      if (!m.isText && !m.marks.length)
        return;
      const v = Math.max(p, g), w = Math.min(h, g + m.nodeSize), b = w - v;
      o += b, a.push(...m.marks.map((y) => ({
        mark: y,
        from: v,
        to: w
      })));
    });
  }), o === 0)
    return !1;
  const l = a.filter((f) => s ? s.name === f.mark.type.name : !0).filter((f) => Za(f.mark.attrs, t, { strict: !1 })).reduce((f, d) => f + d.to - d.from, 0), c = a.filter((f) => s ? f.mark.type !== s && f.mark.type.excludes(s) : !0).reduce((f, d) => f + d.to - d.from, 0);
  return (l > 0 ? l + c : l) >= o;
}
function FN(n, e, t = {}) {
  if (!e)
    return _o(n, null, t) || Lu(n, null, t);
  const r = Il(e, n.schema);
  return r === "node" ? _o(n, e, t) : r === "mark" ? Lu(n, e, t) : !1;
}
function Up(n, e) {
  const { nodeExtensions: t } = Al(e), r = t.find((o) => o.name === n);
  if (!r)
    return !1;
  const i = {
    name: r.name,
    options: r.options,
    storage: r.storage
  }, s = fe(K(r, "group", i));
  return typeof s != "string" ? !1 : s.split(" ").includes("list");
}
function td(n, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
  var r;
  if (t) {
    if (n.type.name === "hardBreak")
      return !0;
    if (n.isText)
      return /^\s*$/m.test((r = n.text) !== null && r !== void 0 ? r : "");
  }
  if (n.isText)
    return !n.text;
  if (n.isAtom || n.isLeaf)
    return !1;
  if (n.content.childCount === 0)
    return !0;
  if (e) {
    let i = !0;
    return n.content.forEach((s) => {
      i !== !1 && (td(s, { ignoreWhitespace: t, checkChildren: e }) || (i = !1));
    }), i;
  }
  return !1;
}
function v0(n) {
  return n instanceof te;
}
function b0(n, e, t) {
  const i = n.state.doc.content.size, s = Xn(e, 0, i), o = Xn(t, 0, i), a = n.coordsAtPos(s), l = n.coordsAtPos(o, -1), c = Math.min(a.top, l.top), u = Math.max(a.bottom, l.bottom), f = Math.min(a.left, l.left), d = Math.max(a.right, l.right), p = d - f, h = u - c, v = {
    top: c,
    bottom: u,
    left: f,
    right: d,
    width: p,
    height: h,
    x: f,
    y: c
  };
  return {
    ...v,
    toJSON: () => v
  };
}
function $N(n, e, t) {
  var r;
  const { selection: i } = e;
  let s = null;
  if (Qf(i) && (s = i.$cursor), s) {
    const a = (r = n.storedMarks) !== null && r !== void 0 ? r : s.marks();
    return !!t.isInSet(a) || !a.some((l) => l.type.excludes(t));
  }
  const { ranges: o } = i;
  return o.some(({ $from: a, $to: l }) => {
    let c = a.depth === 0 ? n.doc.inlineContent && n.doc.type.allowsMarkType(t) : !1;
    return n.doc.nodesBetween(a.pos, l.pos, (u, f, d) => {
      if (c)
        return !1;
      if (u.isInline) {
        const p = !d || d.type.allowsMarkType(t), h = !!t.isInSet(u.marks) || !u.marks.some((m) => m.type.excludes(t));
        c = p && h;
      }
      return !c;
    }), c;
  });
}
const BN = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: s } = t, { empty: o, ranges: a } = s, l = Hr(n, r.schema);
  if (i)
    if (o) {
      const c = g0(r, l);
      t.addStoredMark(l.create({
        ...c,
        ...e
      }));
    } else
      a.forEach((c) => {
        const u = c.$from.pos, f = c.$to.pos;
        r.doc.nodesBetween(u, f, (d, p) => {
          const h = Math.max(p, u), m = Math.min(p + d.nodeSize, f);
          d.marks.find((v) => v.type === l) ? d.marks.forEach((v) => {
            l === v.type && t.addMark(h, m, l.create({
              ...v.attrs,
              ...e
            }));
          }) : t.addMark(h, m, l.create(e));
        });
      });
  return $N(r, t, l);
}, jN = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), VN = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const s = at(n, t.schema);
  let o;
  return t.selection.$anchor.sameParent(t.selection.$head) && (o = t.selection.$anchor.parent.attrs), s.isTextblock ? i().command(({ commands: a }) => jp(s, { ...o, ...e })(t) ? !0 : a.clearNodes()).command(({ state: a }) => jp(s, { ...o, ...e })(a, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, zN = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = Xn(n, 0, r.content.size), s = te.create(r, i);
    e.setSelection(s);
  }
  return !0;
}, HN = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: s } = typeof n == "number" ? { from: n, to: n } : n, o = le.atStart(r).from, a = le.atEnd(r).to, l = Xn(i, o, a), c = Xn(s, o, a), u = le.create(r, l, c);
    e.setSelection(u);
  }
  return !0;
}, GN = (n) => ({ state: e, dispatch: t }) => {
  const r = at(n, e.schema);
  return TA(r)(e, t);
};
function Kp(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const WN = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: s, doc: o } = e, { $from: a, $to: l } = s, c = i.extensionManager.attributes, u = Aa(c, a.node().type.name, a.node().attrs);
  if (s instanceof te && s.node.isBlock)
    return !a.parentOffset || !qi(o, a.pos) ? !1 : (r && (n && Kp(t, i.extensionManager.splittableMarks), e.split(a.pos).scrollIntoView()), !0);
  if (!a.parent.isBlock)
    return !1;
  const f = l.parentOffset === l.parent.content.size, d = a.depth === 0 ? void 0 : PN(a.node(-1).contentMatchAt(a.indexAfter(-1)));
  let p = f && d ? [
    {
      type: d,
      attrs: u
    }
  ] : void 0, h = qi(e.doc, e.mapping.map(a.pos), 1, p);
  if (!p && !h && qi(e.doc, e.mapping.map(a.pos), 1, d ? [{ type: d }] : void 0) && (h = !0, p = d ? [
    {
      type: d,
      attrs: u
    }
  ] : void 0), r) {
    if (h && (s instanceof le && e.deleteSelection(), e.split(e.mapping.map(a.pos), 1, p), d && !f && !a.parentOffset && a.parent.type !== d)) {
      const m = e.mapping.map(a.before()), g = e.doc.resolve(m);
      a.node(-1).canReplaceWith(g.index(), g.index() + 1, d) && e.setNodeMarkup(e.mapping.map(a.before()), d);
    }
    n && Kp(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return h;
}, UN = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: s }) => {
  var o;
  const a = at(n, r.schema), { $from: l, $to: c } = r.selection, u = r.selection.node;
  if (u && u.isBlock || l.depth < 2 || !l.sameParent(c))
    return !1;
  const f = l.node(-1);
  if (f.type !== a)
    return !1;
  const d = s.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== a || l.index(-2) !== l.node(-2).childCount - 1)
      return !1;
    if (i) {
      let v = R.empty;
      const w = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let O = l.depth - w; O >= l.depth - 3; O -= 1)
        v = R.from(l.node(O).copy(v));
      const b = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, y = {
        ...Aa(d, l.node().type.name, l.node().attrs),
        ...e
      }, k = ((o = a.contentMatch.defaultType) === null || o === void 0 ? void 0 : o.createAndFill(y)) || void 0;
      v = v.append(R.from(a.createAndFill(null, k) || void 0));
      const C = l.before(l.depth - (w - 1));
      t.replace(C, l.after(-b), new G(v, 4 - w, 0));
      let S = -1;
      t.doc.nodesBetween(C, t.doc.content.size, (O, T) => {
        if (S > -1)
          return !1;
        O.isTextblock && O.content.size === 0 && (S = T + 1);
      }), S > -1 && t.setSelection(le.near(t.doc.resolve(S))), t.scrollIntoView();
    }
    return !0;
  }
  const p = c.pos === l.end() ? f.contentMatchAt(0).defaultType : null, h = {
    ...Aa(d, f.type.name, f.attrs),
    ...e
  }, m = {
    ...Aa(d, l.node().type.name, l.node().attrs),
    ...e
  };
  t.delete(l.pos, c.pos);
  const g = p ? [
    { type: a, attrs: h },
    { type: p, attrs: m }
  ] : [{ type: a, attrs: h }];
  if (!qi(t.doc, l.pos, 2))
    return !1;
  if (i) {
    const { selection: v, storedMarks: w } = r, { splittableMarks: b } = s.extensionManager, y = w || v.$to.parentOffset && v.$from.marks();
    if (t.split(l.pos, 2, g).scrollIntoView(), !y || !i)
      return !0;
    const k = y.filter((C) => b.includes(C.type.name));
    t.ensureMarks(k);
  }
  return !0;
}, Mc = (n, e) => {
  const t = ed((o) => o.type === e)(n.selection);
  if (!t)
    return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0)
    return !0;
  const i = n.doc.nodeAt(r);
  return t.node.type === (i == null ? void 0 : i.type) && Vr(n.doc, t.pos) && n.join(t.pos), !0;
}, Ac = (n, e) => {
  const t = ed((o) => o.type === e)(n.selection);
  if (!t)
    return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0)
    return !0;
  const i = n.doc.nodeAt(r);
  return t.node.type === (i == null ? void 0 : i.type) && Vr(n.doc, r) && n.join(r), !0;
}, KN = (n, e, t, r = {}) => ({ editor: i, tr: s, state: o, dispatch: a, chain: l, commands: c, can: u }) => {
  const { extensions: f, splittableMarks: d } = i.extensionManager, p = at(n, o.schema), h = at(e, o.schema), { selection: m, storedMarks: g } = o, { $from: v, $to: w } = m, b = v.blockRange(w), y = g || m.$to.parentOffset && m.$from.marks();
  if (!b)
    return !1;
  const k = ed((C) => Up(C.type.name, f))(m);
  if (b.depth >= 1 && k && b.depth - k.depth <= 1) {
    if (k.node.type === p)
      return c.liftListItem(h);
    if (Up(k.node.type.name, f) && p.validContent(k.node.content) && a)
      return l().command(() => (s.setNodeMarkup(k.pos, p), !0)).command(() => Mc(s, p)).command(() => Ac(s, p)).run();
  }
  return !t || !y || !a ? l().command(() => u().wrapInList(p, r) ? !0 : c.clearNodes()).wrapInList(p, r).command(() => Mc(s, p)).command(() => Ac(s, p)).run() : l().command(() => {
    const C = u().wrapInList(p, r), S = y.filter((O) => d.includes(O.type.name));
    return s.ensureMarks(S), C ? !0 : c.clearNodes();
  }).wrapInList(p, r).command(() => Mc(s, p)).command(() => Ac(s, p)).run();
}, YN = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: s = !1 } = t, o = Hr(n, r.schema);
  return Lu(r, o, e) ? i.unsetMark(o, { extendEmptyMarkRange: s }) : i.setMark(o, e);
}, qN = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const s = at(n, r.schema), o = at(e, r.schema), a = _o(r, s, t);
  let l;
  return r.selection.$anchor.sameParent(r.selection.$head) && (l = r.selection.$anchor.parent.attrs), a ? i.setNode(o, l) : i.setNode(s, { ...l, ...t });
}, XN = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = at(n, t.schema);
  return _o(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, JN = () => ({ state: n, dispatch: e }) => {
  const t = n.plugins;
  for (let r = 0; r < t.length; r += 1) {
    const i = t[r];
    let s;
    if (i.spec.isInputRules && (s = i.getState(n))) {
      if (e) {
        const o = n.tr, a = s.transform;
        for (let l = a.steps.length - 1; l >= 0; l -= 1)
          o.step(a.steps[l].invert(a.docs[l]));
        if (s.text) {
          const l = o.doc.resolve(s.from).marks();
          o.replaceWith(s.from, s.to, n.schema.text(s.text, l));
        } else
          o.delete(s.from, s.to);
      }
      return !0;
    }
  }
  return !1;
}, QN = () => ({ tr: n, dispatch: e }) => {
  const { selection: t } = n, { empty: r, ranges: i } = t;
  return r || e && i.forEach((s) => {
    n.removeMark(s.$from.pos, s.$to.pos);
  }), !0;
}, ZN = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  var s;
  const { extendEmptyMarkRange: o = !1 } = e, { selection: a } = t, l = Hr(n, r.schema), { $from: c, empty: u, ranges: f } = a;
  if (!i)
    return !0;
  if (u && o) {
    let { from: d, to: p } = a;
    const h = (s = c.marks().find((g) => g.type === l)) === null || s === void 0 ? void 0 : s.attrs, m = Jf(c, l, h);
    m && (d = m.from, p = m.to), t.removeMark(d, p, l);
  } else
    f.forEach((d) => {
      t.removeMark(d.$from.pos, d.$to.pos, l);
    });
  return t.removeStoredMark(l), !0;
}, eP = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let s = null, o = null;
  const a = Il(typeof n == "string" ? n : n.name, r.schema);
  return a ? (a === "node" && (s = at(n, r.schema)), a === "mark" && (o = Hr(n, r.schema)), i && t.selection.ranges.forEach((l) => {
    const c = l.$from.pos, u = l.$to.pos;
    let f, d, p, h;
    t.selection.empty ? r.doc.nodesBetween(c, u, (m, g) => {
      s && s === m.type && (p = Math.max(g, c), h = Math.min(g + m.nodeSize, u), f = g, d = m);
    }) : r.doc.nodesBetween(c, u, (m, g) => {
      g < c && s && s === m.type && (p = Math.max(g, c), h = Math.min(g + m.nodeSize, u), f = g, d = m), g >= c && g <= u && (s && s === m.type && t.setNodeMarkup(g, void 0, {
        ...m.attrs,
        ...e
      }), o && m.marks.length && m.marks.forEach((v) => {
        if (o === v.type) {
          const w = Math.max(g, c), b = Math.min(g + m.nodeSize, u);
          t.addMark(w, b, o.create({
            ...v.attrs,
            ...e
          }));
        }
      }));
    }), d && (f !== void 0 && t.setNodeMarkup(f, void 0, {
      ...d.attrs,
      ...e
    }), o && d.marks.length && d.marks.forEach((m) => {
      o === m.type && t.addMark(p, h, o.create({
        ...m.attrs,
        ...e
      }));
    }));
  }), !0) : !1;
}, tP = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = at(n, t.schema);
  return wA(i, e)(t, r);
}, nP = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = at(n, t.schema);
  return CA(i, e)(t, r);
};
var rP = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  blur: HA,
  clearContent: GA,
  clearNodes: WA,
  command: UA,
  createParagraphNear: KA,
  cut: YA,
  deleteCurrentNode: qA,
  deleteNode: XA,
  deleteRange: JA,
  deleteSelection: QA,
  enter: ZA,
  exitCode: eN,
  extendMarkRange: tN,
  first: nN,
  focus: rN,
  forEach: iN,
  insertContent: sN,
  insertContentAt: lN,
  joinBackward: fN,
  joinDown: uN,
  joinForward: dN,
  joinItemBackward: hN,
  joinItemForward: pN,
  joinTextblockBackward: mN,
  joinTextblockForward: gN,
  joinUp: cN,
  keyboardShortcut: vN,
  lift: bN,
  liftEmptyBlock: wN,
  liftListItem: CN,
  newlineInCode: _N,
  resetAttributes: SN,
  scrollIntoView: xN,
  selectAll: kN,
  selectNodeBackward: TN,
  selectNodeForward: ON,
  selectParentNode: EN,
  selectTextblockEnd: MN,
  selectTextblockStart: AN,
  setContent: NN,
  setMark: BN,
  setMeta: jN,
  setNode: VN,
  setNodeSelection: zN,
  setTextSelection: HN,
  sinkListItem: GN,
  splitBlock: WN,
  splitListItem: UN,
  toggleList: KN,
  toggleMark: YN,
  toggleNode: qN,
  toggleWrap: XN,
  undoInputRule: JN,
  unsetAllMarks: QN,
  unsetMark: ZN,
  updateAttributes: eP,
  wrapIn: tP,
  wrapInList: nP
});
const iP = dt.create({
  name: "commands",
  addCommands() {
    return {
      ...rP
    };
  }
}), sP = dt.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [
      new bt({
        key: new un("tiptapDrop"),
        props: {
          handleDrop: (n, e, t, r) => {
            this.editor.emit("drop", {
              editor: this.editor,
              event: e,
              slice: t,
              moved: r
            });
          }
        }
      })
    ];
  }
}), oP = dt.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [
      new bt({
        key: new un("editable"),
        props: {
          editable: () => this.editor.options.editable
        }
      })
    ];
  }
}), aP = dt.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [
      new bt({
        key: new un("focusEvents"),
        props: {
          handleDOMEvents: {
            focus: (e, t) => {
              n.isFocused = !0;
              const r = n.state.tr.setMeta("focus", { event: t }).setMeta("addToHistory", !1);
              return e.dispatch(r), !1;
            },
            blur: (e, t) => {
              n.isFocused = !1;
              const r = n.state.tr.setMeta("blur", { event: t }).setMeta("addToHistory", !1);
              return e.dispatch(r), !1;
            }
          }
        }
      })
    ];
  }
}), lP = dt.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: o }) => [
      () => o.undoInputRule(),
      // maybe convert first text block node to default node
      () => o.command(({ tr: a }) => {
        const { selection: l, doc: c } = a, { empty: u, $anchor: f } = l, { pos: d, parent: p } = f, h = f.parent.isTextblock && d > 0 ? a.doc.resolve(d - 1) : f, m = h.parent.type.spec.isolating, g = f.pos - f.parentOffset, v = m && h.parent.childCount === 1 ? g === f.pos : ce.atStart(c).from === d;
        return !u || !p.type.isTextblock || p.textContent.length || !v || v && f.parent.type.name === "paragraph" ? !1 : o.clearNodes();
      }),
      () => o.deleteSelection(),
      () => o.joinBackward(),
      () => o.selectNodeBackward()
    ]), e = () => this.editor.commands.first(({ commands: o }) => [
      () => o.deleteSelection(),
      () => o.deleteCurrentNode(),
      () => o.joinForward(),
      () => o.selectNodeForward()
    ]), r = {
      Enter: () => this.editor.commands.first(({ commands: o }) => [
        () => o.newlineInCode(),
        () => o.createParagraphNear(),
        () => o.liftEmptyBlock(),
        () => o.splitBlock()
      ]),
      "Mod-Enter": () => this.editor.commands.exitCode(),
      Backspace: n,
      "Mod-Backspace": n,
      "Shift-Backspace": n,
      Delete: e,
      "Mod-Delete": e,
      "Mod-a": () => this.editor.commands.selectAll()
    }, i = {
      ...r
    }, s = {
      ...r,
      "Ctrl-h": n,
      "Alt-Backspace": n,
      "Ctrl-d": e,
      "Ctrl-Alt-Backspace": e,
      "Alt-Delete": e,
      "Alt-d": e,
      "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
      "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
    };
    return Zf() || m0() ? s : i;
  },
  addProseMirrorPlugins() {
    return [
      // With this plugin we check if the whole document was selected and deleted.
      // In this case we will additionally call `clearNodes()` to convert e.g. a heading
      // to a paragraph if necessary.
      // This is an alternative to ProseMirror's `AllSelection`, which doesn’t work well
      // with many other commands.
      new bt({
        key: new un("clearDocument"),
        appendTransaction: (n, e, t) => {
          const r = n.some((m) => m.docChanged) && !e.doc.eq(t.doc), i = n.some((m) => m.getMeta("preventClearDocument"));
          if (!r || i)
            return;
          const { empty: s, from: o, to: a } = e.selection, l = ce.atStart(e.doc).from, c = ce.atEnd(e.doc).to;
          if (s || !(o === l && a === c) || !td(t.doc))
            return;
          const d = t.tr, p = El({
            state: t,
            transaction: d
          }), { commands: h } = new Ml({
            editor: this.editor,
            state: p
          });
          if (h.clearNodes(), !!d.steps.length)
            return d;
        }
      })
    ];
  }
}), cP = dt.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [
      new bt({
        key: new un("tiptapPaste"),
        props: {
          handlePaste: (n, e, t) => {
            this.editor.emit("paste", {
              editor: this.editor,
              event: e,
              slice: t
            });
          }
        }
      })
    ];
  }
}), uP = dt.create({
  name: "tabindex",
  addProseMirrorPlugins() {
    return [
      new bt({
        key: new un("tabindex"),
        props: {
          attributes: () => this.editor.isEditable ? { tabindex: "0" } : {}
        }
      })
    ];
  }
});
class ei {
  get name() {
    return this.node.type.name;
  }
  constructor(e, t, r = !1, i = null) {
    this.currentNode = null, this.actualDepth = null, this.isBlock = r, this.resolvedPos = e, this.editor = t, this.currentNode = i;
  }
  get node() {
    return this.currentNode || this.resolvedPos.node();
  }
  get element() {
    return this.editor.view.domAtPos(this.pos).node;
  }
  get depth() {
    var e;
    return (e = this.actualDepth) !== null && e !== void 0 ? e : this.resolvedPos.depth;
  }
  get pos() {
    return this.resolvedPos.pos;
  }
  get content() {
    return this.node.content;
  }
  set content(e) {
    let t = this.from, r = this.to;
    if (this.isBlock) {
      if (this.content.size === 0) {
        console.error(`You can’t set content on a block node. Tried to set content on ${this.name} at ${this.pos}`);
        return;
      }
      t = this.from + 1, r = this.to - 1;
    }
    this.editor.commands.insertContentAt({ from: t, to: r }, e);
  }
  get attributes() {
    return this.node.attrs;
  }
  get textContent() {
    return this.node.textContent;
  }
  get size() {
    return this.node.nodeSize;
  }
  get from() {
    return this.isBlock ? this.pos : this.resolvedPos.start(this.resolvedPos.depth);
  }
  get range() {
    return {
      from: this.from,
      to: this.to
    };
  }
  get to() {
    return this.isBlock ? this.pos + this.size : this.resolvedPos.end(this.resolvedPos.depth) + (this.node.isText ? 0 : 1);
  }
  get parent() {
    if (this.depth === 0)
      return null;
    const e = this.resolvedPos.start(this.resolvedPos.depth - 1), t = this.resolvedPos.doc.resolve(e);
    return new ei(t, this.editor);
  }
  get before() {
    let e = this.resolvedPos.doc.resolve(this.from - (this.isBlock ? 1 : 2));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.from - 3)), new ei(e, this.editor);
  }
  get after() {
    let e = this.resolvedPos.doc.resolve(this.to + (this.isBlock ? 2 : 1));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.to + 3)), new ei(e, this.editor);
  }
  get children() {
    const e = [];
    return this.node.content.forEach((t, r) => {
      const i = t.isBlock && !t.isTextblock, s = t.isAtom && !t.isText, o = this.pos + r + (s ? 0 : 1), a = this.resolvedPos.doc.resolve(o);
      if (!i && a.depth <= this.depth)
        return;
      const l = new ei(a, this.editor, i, i ? t : null);
      i && (l.actualDepth = this.depth + 1), e.push(new ei(a, this.editor, i, i ? t : null));
    }), e;
  }
  get firstChild() {
    return this.children[0] || null;
  }
  get lastChild() {
    const e = this.children;
    return e[e.length - 1] || null;
  }
  closest(e, t = {}) {
    let r = null, i = this.parent;
    for (; i && !r; ) {
      if (i.node.type.name === e)
        if (Object.keys(t).length > 0) {
          const s = i.node.attrs, o = Object.keys(t);
          for (let a = 0; a < o.length; a += 1) {
            const l = o[a];
            if (s[l] !== t[l])
              break;
          }
        } else
          r = i;
      i = i.parent;
    }
    return r;
  }
  querySelector(e, t = {}) {
    return this.querySelectorAll(e, t, !0)[0] || null;
  }
  querySelectorAll(e, t = {}, r = !1) {
    let i = [];
    if (!this.children || this.children.length === 0)
      return i;
    const s = Object.keys(t);
    return this.children.forEach((o) => {
      r && i.length > 0 || (o.node.type.name === e && s.every((l) => t[l] === o.node.attrs[l]) && i.push(o), !(r && i.length > 0) && (i = i.concat(o.querySelectorAll(e, t, r))));
    }), i;
  }
  setAttribute(e) {
    const { tr: t } = this.editor.state;
    t.setNodeMarkup(this.from, void 0, {
      ...this.node.attrs,
      ...e
    }), this.editor.view.dispatch(t);
  }
}
const fP = `.ProseMirror {
  position: relative;
}

.ProseMirror {
  word-wrap: break-word;
  white-space: pre-wrap;
  white-space: break-spaces;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
}

.ProseMirror [contenteditable="false"] {
  white-space: normal;
}

.ProseMirror [contenteditable="false"] [contenteditable="true"] {
  white-space: pre-wrap;
}

.ProseMirror pre {
  white-space: pre-wrap;
}

img.ProseMirror-separator {
  display: inline !important;
  border: none !important;
  margin: 0 !important;
  width: 0 !important;
  height: 0 !important;
}

.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
  margin: 0;
}

.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-hideselection *::selection {
  background: transparent;
}

.ProseMirror-hideselection *::-moz-selection {
  background: transparent;
}

.ProseMirror-hideselection * {
  caret-color: transparent;
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}

.tippy-box[data-animation=fade][data-state=hidden] {
  opacity: 0
}`;
function dP(n, e, t) {
  const r = document.querySelector("style[data-tiptap-style]");
  if (r !== null)
    return r;
  const i = document.createElement("style");
  return e && i.setAttribute("nonce", e), i.setAttribute("data-tiptap-style", ""), i.innerHTML = n, document.getElementsByTagName("head")[0].appendChild(i), i;
}
let hP = class extends OA {
  constructor(e = {}) {
    super(), this.isFocused = !1, this.isInitialized = !1, this.extensionStorage = {}, this.options = {
      element: document.createElement("div"),
      content: "",
      injectCSS: !0,
      injectNonce: void 0,
      extensions: [],
      autofocus: !1,
      editable: !0,
      editorProps: {},
      parseOptions: {},
      coreExtensionOptions: {},
      enableInputRules: !0,
      enablePasteRules: !0,
      enableCoreExtensions: !0,
      enableContentCheck: !1,
      onBeforeCreate: () => null,
      onCreate: () => null,
      onUpdate: () => null,
      onSelectionUpdate: () => null,
      onTransaction: () => null,
      onFocus: () => null,
      onBlur: () => null,
      onDestroy: () => null,
      onContentError: ({ error: t }) => {
        throw t;
      },
      onPaste: () => null,
      onDrop: () => null
    }, this.isCapturingTransaction = !1, this.capturedTransaction = null, this.setOptions(e), this.createExtensionManager(), this.createCommandManager(), this.createSchema(), this.on("beforeCreate", this.options.onBeforeCreate), this.emit("beforeCreate", { editor: this }), this.on("contentError", this.options.onContentError), this.createView(), this.injectCSS(), this.on("create", this.options.onCreate), this.on("update", this.options.onUpdate), this.on("selectionUpdate", this.options.onSelectionUpdate), this.on("transaction", this.options.onTransaction), this.on("focus", this.options.onFocus), this.on("blur", this.options.onBlur), this.on("destroy", this.options.onDestroy), this.on("drop", ({ event: t, slice: r, moved: i }) => this.options.onDrop(t, r, i)), this.on("paste", ({ event: t, slice: r }) => this.options.onPaste(t, r)), window.setTimeout(() => {
      this.isDestroyed || (this.commands.focus(this.options.autofocus), this.emit("create", { editor: this }), this.isInitialized = !0);
    }, 0);
  }
  /**
   * Returns the editor storage.
   */
  get storage() {
    return this.extensionStorage;
  }
  /**
   * An object of all registered commands.
   */
  get commands() {
    return this.commandManager.commands;
  }
  /**
   * Create a command chain to call multiple commands at once.
   */
  chain() {
    return this.commandManager.chain();
  }
  /**
   * Check if a command or a command chain can be executed. Without executing it.
   */
  can() {
    return this.commandManager.can();
  }
  /**
   * Inject CSS styles.
   */
  injectCSS() {
    this.options.injectCSS && document && (this.css = dP(fP, this.options.injectNonce));
  }
  /**
   * Update editor options.
   *
   * @param options A list of options
   */
  setOptions(e = {}) {
    this.options = {
      ...this.options,
      ...e
    }, !(!this.view || !this.state || this.isDestroyed) && (this.options.editorProps && this.view.setProps(this.options.editorProps), this.view.updateState(this.state));
  }
  /**
   * Update editable state of the editor.
   */
  setEditable(e, t = !0) {
    this.setOptions({ editable: e }), t && this.emit("update", { editor: this, transaction: this.state.tr });
  }
  /**
   * Returns whether the editor is editable.
   */
  get isEditable() {
    return this.options.editable && this.view && this.view.editable;
  }
  /**
   * Returns the editor state.
   */
  get state() {
    return this.view.state;
  }
  /**
   * Register a ProseMirror plugin.
   *
   * @param plugin A ProseMirror plugin
   * @param handlePlugins Control how to merge the plugin into the existing plugins.
   * @returns The new editor state
   */
  registerPlugin(e, t) {
    const r = c0(t) ? t(e, [...this.state.plugins]) : [...this.state.plugins, e], i = this.state.reconfigure({ plugins: r });
    return this.view.updateState(i), i;
  }
  /**
   * Unregister a ProseMirror plugin.
   *
   * @param nameOrPluginKeyToRemove The plugins name
   * @returns The new editor state or undefined if the editor is destroyed
   */
  unregisterPlugin(e) {
    if (this.isDestroyed)
      return;
    const t = this.state.plugins;
    let r = t;
    if ([].concat(e).forEach((s) => {
      const o = typeof s == "string" ? `${s}$` : s.key;
      r = t.filter((a) => !a.key.startsWith(o));
    }), t.length === r.length)
      return;
    const i = this.state.reconfigure({
      plugins: r
    });
    return this.view.updateState(i), i;
  }
  /**
   * Creates an extension manager.
   */
  createExtensionManager() {
    var e, t;
    const i = [...this.options.enableCoreExtensions ? [
      oP,
      zA.configure({
        blockSeparator: (t = (e = this.options.coreExtensionOptions) === null || e === void 0 ? void 0 : e.clipboardTextSerializer) === null || t === void 0 ? void 0 : t.blockSeparator
      }),
      iP,
      aP,
      lP,
      uP,
      sP,
      cP
    ].filter((s) => typeof this.options.enableCoreExtensions == "object" ? this.options.enableCoreExtensions[s.name] !== !1 : !0) : [], ...this.options.extensions].filter((s) => ["extension", "node", "mark"].includes(s == null ? void 0 : s.type));
    this.extensionManager = new Gi(i, this);
  }
  /**
   * Creates an command manager.
   */
  createCommandManager() {
    this.commandManager = new Ml({
      editor: this
    });
  }
  /**
   * Creates a ProseMirror schema.
   */
  createSchema() {
    this.schema = this.extensionManager.schema;
  }
  /**
   * Creates a ProseMirror view.
   */
  createView() {
    var e;
    let t;
    try {
      t = Du(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: this.options.enableContentCheck });
    } catch (o) {
      if (!(o instanceof Error) || !["[tiptap error]: Invalid JSON content", "[tiptap error]: Invalid HTML content"].includes(o.message))
        throw o;
      this.emit("contentError", {
        editor: this,
        error: o,
        disableCollaboration: () => {
          this.storage.collaboration && (this.storage.collaboration.isDisabled = !0), this.options.extensions = this.options.extensions.filter((a) => a.name !== "collaboration"), this.createExtensionManager();
        }
      }), t = Du(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: !1 });
    }
    const r = h0(t, this.options.autofocus);
    this.view = new UM(this.options.element, {
      ...this.options.editorProps,
      attributes: {
        // add `role="textbox"` to the editor element
        role: "textbox",
        ...(e = this.options.editorProps) === null || e === void 0 ? void 0 : e.attributes
      },
      dispatchTransaction: this.dispatchTransaction.bind(this),
      state: Hi.create({
        doc: t,
        selection: r || void 0
      })
    });
    const i = this.state.reconfigure({
      plugins: this.extensionManager.plugins
    });
    this.view.updateState(i), this.createNodeViews(), this.prependClass();
    const s = this.view.dom;
    s.editor = this;
  }
  /**
   * Creates all node views.
   */
  createNodeViews() {
    this.view.isDestroyed || this.view.setProps({
      nodeViews: this.extensionManager.nodeViews
    });
  }
  /**
   * Prepend class name to element.
   */
  prependClass() {
    this.view.dom.className = `tiptap ${this.view.dom.className}`;
  }
  captureTransaction(e) {
    this.isCapturingTransaction = !0, e(), this.isCapturingTransaction = !1;
    const t = this.capturedTransaction;
    return this.capturedTransaction = null, t;
  }
  /**
   * The callback over which to send transactions (state updates) produced by the view.
   *
   * @param transaction An editor state transaction
   */
  dispatchTransaction(e) {
    if (this.view.isDestroyed)
      return;
    if (this.isCapturingTransaction) {
      if (!this.capturedTransaction) {
        this.capturedTransaction = e;
        return;
      }
      e.steps.forEach((o) => {
        var a;
        return (a = this.capturedTransaction) === null || a === void 0 ? void 0 : a.step(o);
      });
      return;
    }
    const t = this.state.apply(e), r = !this.state.selection.eq(t.selection);
    this.emit("beforeTransaction", {
      editor: this,
      transaction: e,
      nextState: t
    }), this.view.updateState(t), this.emit("transaction", {
      editor: this,
      transaction: e
    }), r && this.emit("selectionUpdate", {
      editor: this,
      transaction: e
    });
    const i = e.getMeta("focus"), s = e.getMeta("blur");
    i && this.emit("focus", {
      editor: this,
      event: i.event,
      transaction: e
    }), s && this.emit("blur", {
      editor: this,
      event: s.event,
      transaction: e
    }), !(!e.docChanged || e.getMeta("preventUpdate")) && this.emit("update", {
      editor: this,
      transaction: e
    });
  }
  /**
   * Get attributes of the currently selected node or mark.
   */
  getAttributes(e) {
    return RN(this.state, e);
  }
  isActive(e, t) {
    const r = typeof e == "string" ? e : null, i = typeof e == "string" ? t : e;
    return FN(this.state, r, i);
  }
  /**
   * Get the document as JSON.
   */
  getJSON() {
    return this.state.doc.toJSON();
  }
  /**
   * Get the document as HTML.
   */
  getHTML() {
    return qf(this.state.doc.content, this.schema);
  }
  /**
   * Get the document as text.
   */
  getText(e) {
    const { blockSeparator: t = `

`, textSerializers: r = {} } = e || {};
    return DN(this.state.doc, {
      blockSeparator: t,
      textSerializers: {
        ...f0(this.schema),
        ...r
      }
    });
  }
  /**
   * Check if there is no content.
   */
  get isEmpty() {
    return td(this.state.doc);
  }
  /**
   * Get the number of characters for the current document.
   *
   * @deprecated
   */
  getCharacterCount() {
    return console.warn('[tiptap warn]: "editor.getCharacterCount()" is deprecated. Please use "editor.storage.characterCount.characters()" instead.'), this.state.doc.content.size - 2;
  }
  /**
   * Destroy the editor.
   */
  destroy() {
    if (this.emit("destroy"), this.view) {
      const e = this.view.dom;
      e && e.editor && delete e.editor, this.view.destroy();
    }
    this.removeAllListeners();
  }
  /**
   * Check if the editor is already destroyed.
   */
  get isDestroyed() {
    var e;
    return !(!((e = this.view) === null || e === void 0) && e.docView);
  }
  $node(e, t) {
    var r;
    return ((r = this.$doc) === null || r === void 0 ? void 0 : r.querySelector(e, t)) || null;
  }
  $nodes(e, t) {
    var r;
    return ((r = this.$doc) === null || r === void 0 ? void 0 : r.querySelectorAll(e, t)) || null;
  }
  $pos(e) {
    const t = this.state.doc.resolve(e);
    return new ei(t, this);
  }
  get $doc() {
    return this.$pos(0);
  }
};
function ss(n) {
  return new Nl({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const i = fe(n.getAttributes, void 0, r);
      if (i === !1 || i === null)
        return null;
      const { tr: s } = e, o = r[r.length - 1], a = r[0];
      if (o) {
        const l = a.search(/\S/), c = t.from + a.indexOf(o), u = c + o.length;
        if (y0(t.from, t.to, e.doc).filter((p) => p.mark.type.excluded.find((m) => m === n.type && m !== p.mark.type)).filter((p) => p.to > c).length)
          return null;
        u < t.to && s.delete(u, t.to), c > t.from && s.delete(t.from + l, c);
        const d = t.from + l + o.length;
        s.addMark(t.from + l, d, n.type.create(i || {})), s.removeStoredMark(n.type);
      }
    }
  });
}
function pP(n) {
  return new Nl({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const i = fe(n.getAttributes, void 0, r) || {}, { tr: s } = e, o = t.from;
      let a = t.to;
      const l = n.type.create(i);
      if (r[1]) {
        const c = r[0].lastIndexOf(r[1]);
        let u = o + c;
        u > a ? u = a : a = u + r[1].length;
        const f = r[0][r[0].length - 1];
        s.insertText(f, o + r[0].length - 1), s.replaceWith(u, a, l);
      } else if (r[0]) {
        const c = n.type.isInline ? o : o - 1;
        s.insert(c, n.type.create(i)).delete(s.mapping.map(o), s.mapping.map(a));
      }
      s.scrollIntoView();
    }
  });
}
function Ru(n) {
  return new Nl({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const i = e.doc.resolve(t.from), s = fe(n.getAttributes, void 0, r) || {};
      if (!i.node(-1).canReplaceWith(i.index(-1), i.indexAfter(-1), n.type))
        return null;
      e.tr.delete(t.from, t.to).setBlockType(t.from, t.from, n.type, s);
    }
  });
}
function So(n) {
  return new Nl({
    find: n.find,
    handler: ({ state: e, range: t, match: r, chain: i }) => {
      const s = fe(n.getAttributes, void 0, r) || {}, o = e.tr.delete(t.from, t.to), l = o.doc.resolve(t.from).blockRange(), c = l && Ff(l, n.type, s);
      if (!c)
        return null;
      if (o.wrap(l, c), n.keepMarks && n.editor) {
        const { selection: f, storedMarks: d } = e, { splittableMarks: p } = n.editor.extensionManager, h = d || f.$to.parentOffset && f.$from.marks();
        if (h) {
          const m = h.filter((g) => p.includes(g.type.name));
          o.ensureMarks(m);
        }
      }
      if (n.keepAttributes) {
        const f = n.type.name === "bulletList" || n.type.name === "orderedList" ? "listItem" : "taskList";
        i().updateAttributes(f, s).run();
      }
      const u = o.doc.resolve(t.from - 1).nodeBefore;
      u && u.type === n.type && Vr(o.doc, t.from - 1) && (!n.joinPredicate || n.joinPredicate(r, u)) && o.join(t.from - 1);
    }
  });
}
let Sn = class Fu {
  constructor(e = {}) {
    this.type = "node", this.name = "node", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = fe(K(this, "addOptions", {
      name: this.name
    }))), this.storage = fe(K(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new Fu(e);
  }
  configure(e = {}) {
    const t = this.extend({
      ...this.config,
      addOptions: () => Pl(this.options, e)
    });
    return t.name = this.name, t.parent = this.parent, t;
  }
  extend(e = {}) {
    const t = new Fu(e);
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = fe(K(t, "addOptions", {
      name: t.name
    })), t.storage = fe(K(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
};
function as(n) {
  return new RA({
    find: n.find,
    handler: ({ state: e, range: t, match: r, pasteEvent: i }) => {
      const s = fe(n.getAttributes, void 0, r, i);
      if (s === !1 || s === null)
        return null;
      const { tr: o } = e, a = r[r.length - 1], l = r[0];
      let c = t.to;
      if (a) {
        const u = l.search(/\S/), f = t.from + l.indexOf(a), d = f + a.length;
        if (y0(t.from, t.to, e.doc).filter((h) => h.mark.type.excluded.find((g) => g === n.type && g !== h.mark.type)).filter((h) => h.to > f).length)
          return null;
        d < t.to && o.delete(d, t.to), f > t.from && o.delete(t.from + u, f), c = t.from + u + a.length, o.addMark(t.from + u, c, n.type.create(s || {})), o.removeStoredMark(n.type);
      }
    }
  });
}
var Dt = "top", on = "bottom", an = "right", Lt = "left", nd = "auto", Bo = [Dt, on, an, Lt], ls = "start", xo = "end", mP = "clippingParents", w0 = "viewport", Ds = "popper", gP = "reference", Yp = /* @__PURE__ */ Bo.reduce(function(n, e) {
  return n.concat([e + "-" + ls, e + "-" + xo]);
}, []), C0 = /* @__PURE__ */ [].concat(Bo, [nd]).reduce(function(n, e) {
  return n.concat([e, e + "-" + ls, e + "-" + xo]);
}, []), yP = "beforeRead", vP = "read", bP = "afterRead", wP = "beforeMain", CP = "main", _P = "afterMain", SP = "beforeWrite", xP = "write", kP = "afterWrite", TP = [yP, vP, bP, wP, CP, _P, SP, xP, kP];
function Vn(n) {
  return n ? (n.nodeName || "").toLowerCase() : null;
}
function Vt(n) {
  if (n == null)
    return window;
  if (n.toString() !== "[object Window]") {
    var e = n.ownerDocument;
    return e && e.defaultView || window;
  }
  return n;
}
function wi(n) {
  var e = Vt(n).Element;
  return n instanceof e || n instanceof Element;
}
function sn(n) {
  var e = Vt(n).HTMLElement;
  return n instanceof e || n instanceof HTMLElement;
}
function rd(n) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = Vt(n).ShadowRoot;
  return n instanceof e || n instanceof ShadowRoot;
}
function OP(n) {
  var e = n.state;
  Object.keys(e.elements).forEach(function(t) {
    var r = e.styles[t] || {}, i = e.attributes[t] || {}, s = e.elements[t];
    !sn(s) || !Vn(s) || (Object.assign(s.style, r), Object.keys(i).forEach(function(o) {
      var a = i[o];
      a === !1 ? s.removeAttribute(o) : s.setAttribute(o, a === !0 ? "" : a);
    }));
  });
}
function EP(n) {
  var e = n.state, t = {
    popper: {
      position: e.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(e.elements.popper.style, t.popper), e.styles = t, e.elements.arrow && Object.assign(e.elements.arrow.style, t.arrow), function() {
    Object.keys(e.elements).forEach(function(r) {
      var i = e.elements[r], s = e.attributes[r] || {}, o = Object.keys(e.styles.hasOwnProperty(r) ? e.styles[r] : t[r]), a = o.reduce(function(l, c) {
        return l[c] = "", l;
      }, {});
      !sn(i) || !Vn(i) || (Object.assign(i.style, a), Object.keys(s).forEach(function(l) {
        i.removeAttribute(l);
      }));
    });
  };
}
const _0 = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: OP,
  effect: EP,
  requires: ["computeStyles"]
};
function Rn(n) {
  return n.split("-")[0];
}
var di = Math.max, tl = Math.min, cs = Math.round;
function $u() {
  var n = navigator.userAgentData;
  return n != null && n.brands && Array.isArray(n.brands) ? n.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function S0() {
  return !/^((?!chrome|android).)*safari/i.test($u());
}
function us(n, e, t) {
  e === void 0 && (e = !1), t === void 0 && (t = !1);
  var r = n.getBoundingClientRect(), i = 1, s = 1;
  e && sn(n) && (i = n.offsetWidth > 0 && cs(r.width) / n.offsetWidth || 1, s = n.offsetHeight > 0 && cs(r.height) / n.offsetHeight || 1);
  var o = wi(n) ? Vt(n) : window, a = o.visualViewport, l = !S0() && t, c = (r.left + (l && a ? a.offsetLeft : 0)) / i, u = (r.top + (l && a ? a.offsetTop : 0)) / s, f = r.width / i, d = r.height / s;
  return {
    width: f,
    height: d,
    top: u,
    right: c + f,
    bottom: u + d,
    left: c,
    x: c,
    y: u
  };
}
function id(n) {
  var e = us(n), t = n.offsetWidth, r = n.offsetHeight;
  return Math.abs(e.width - t) <= 1 && (t = e.width), Math.abs(e.height - r) <= 1 && (r = e.height), {
    x: n.offsetLeft,
    y: n.offsetTop,
    width: t,
    height: r
  };
}
function x0(n, e) {
  var t = e.getRootNode && e.getRootNode();
  if (n.contains(e))
    return !0;
  if (t && rd(t)) {
    var r = e;
    do {
      if (r && n.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function nr(n) {
  return Vt(n).getComputedStyle(n);
}
function MP(n) {
  return ["table", "td", "th"].indexOf(Vn(n)) >= 0;
}
function Gr(n) {
  return ((wi(n) ? n.ownerDocument : (
    // $FlowFixMe[prop-missing]
    n.document
  )) || window.document).documentElement;
}
function Dl(n) {
  return Vn(n) === "html" ? n : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    n.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    n.parentNode || // DOM Element detected
    (rd(n) ? n.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    Gr(n)
  );
}
function qp(n) {
  return !sn(n) || // https://github.com/popperjs/popper-core/issues/837
  nr(n).position === "fixed" ? null : n.offsetParent;
}
function AP(n) {
  var e = /firefox/i.test($u()), t = /Trident/i.test($u());
  if (t && sn(n)) {
    var r = nr(n);
    if (r.position === "fixed")
      return null;
  }
  var i = Dl(n);
  for (rd(i) && (i = i.host); sn(i) && ["html", "body"].indexOf(Vn(i)) < 0; ) {
    var s = nr(i);
    if (s.transform !== "none" || s.perspective !== "none" || s.contain === "paint" || ["transform", "perspective"].indexOf(s.willChange) !== -1 || e && s.willChange === "filter" || e && s.filter && s.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function jo(n) {
  for (var e = Vt(n), t = qp(n); t && MP(t) && nr(t).position === "static"; )
    t = qp(t);
  return t && (Vn(t) === "html" || Vn(t) === "body" && nr(t).position === "static") ? e : t || AP(n) || e;
}
function sd(n) {
  return ["top", "bottom"].indexOf(n) >= 0 ? "x" : "y";
}
function io(n, e, t) {
  return di(n, tl(e, t));
}
function NP(n, e, t) {
  var r = io(n, e, t);
  return r > t ? t : r;
}
function k0() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function T0(n) {
  return Object.assign({}, k0(), n);
}
function O0(n, e) {
  return e.reduce(function(t, r) {
    return t[r] = n, t;
  }, {});
}
var PP = function(e, t) {
  return e = typeof e == "function" ? e(Object.assign({}, t.rects, {
    placement: t.placement
  })) : e, T0(typeof e != "number" ? e : O0(e, Bo));
};
function IP(n) {
  var e, t = n.state, r = n.name, i = n.options, s = t.elements.arrow, o = t.modifiersData.popperOffsets, a = Rn(t.placement), l = sd(a), c = [Lt, an].indexOf(a) >= 0, u = c ? "height" : "width";
  if (!(!s || !o)) {
    var f = PP(i.padding, t), d = id(s), p = l === "y" ? Dt : Lt, h = l === "y" ? on : an, m = t.rects.reference[u] + t.rects.reference[l] - o[l] - t.rects.popper[u], g = o[l] - t.rects.reference[l], v = jo(s), w = v ? l === "y" ? v.clientHeight || 0 : v.clientWidth || 0 : 0, b = m / 2 - g / 2, y = f[p], k = w - d[u] - f[h], C = w / 2 - d[u] / 2 + b, S = io(y, C, k), O = l;
    t.modifiersData[r] = (e = {}, e[O] = S, e.centerOffset = S - C, e);
  }
}
function DP(n) {
  var e = n.state, t = n.options, r = t.element, i = r === void 0 ? "[data-popper-arrow]" : r;
  i != null && (typeof i == "string" && (i = e.elements.popper.querySelector(i), !i) || x0(e.elements.popper, i) && (e.elements.arrow = i));
}
const LP = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: IP,
  effect: DP,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function fs(n) {
  return n.split("-")[1];
}
var RP = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function FP(n, e) {
  var t = n.x, r = n.y, i = e.devicePixelRatio || 1;
  return {
    x: cs(t * i) / i || 0,
    y: cs(r * i) / i || 0
  };
}
function Xp(n) {
  var e, t = n.popper, r = n.popperRect, i = n.placement, s = n.variation, o = n.offsets, a = n.position, l = n.gpuAcceleration, c = n.adaptive, u = n.roundOffsets, f = n.isFixed, d = o.x, p = d === void 0 ? 0 : d, h = o.y, m = h === void 0 ? 0 : h, g = typeof u == "function" ? u({
    x: p,
    y: m
  }) : {
    x: p,
    y: m
  };
  p = g.x, m = g.y;
  var v = o.hasOwnProperty("x"), w = o.hasOwnProperty("y"), b = Lt, y = Dt, k = window;
  if (c) {
    var C = jo(t), S = "clientHeight", O = "clientWidth";
    if (C === Vt(t) && (C = Gr(t), nr(C).position !== "static" && a === "absolute" && (S = "scrollHeight", O = "scrollWidth")), C = C, i === Dt || (i === Lt || i === an) && s === xo) {
      y = on;
      var T = f && C === k && k.visualViewport ? k.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        C[S]
      );
      m -= T - r.height, m *= l ? 1 : -1;
    }
    if (i === Lt || (i === Dt || i === on) && s === xo) {
      b = an;
      var V = f && C === k && k.visualViewport ? k.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        C[O]
      );
      p -= V - r.width, p *= l ? 1 : -1;
    }
  }
  var X = Object.assign({
    position: a
  }, c && RP), W = u === !0 ? FP({
    x: p,
    y: m
  }, Vt(t)) : {
    x: p,
    y: m
  };
  if (p = W.x, m = W.y, l) {
    var Q;
    return Object.assign({}, X, (Q = {}, Q[y] = w ? "0" : "", Q[b] = v ? "0" : "", Q.transform = (k.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + m + "px)" : "translate3d(" + p + "px, " + m + "px, 0)", Q));
  }
  return Object.assign({}, X, (e = {}, e[y] = w ? m + "px" : "", e[b] = v ? p + "px" : "", e.transform = "", e));
}
function $P(n) {
  var e = n.state, t = n.options, r = t.gpuAcceleration, i = r === void 0 ? !0 : r, s = t.adaptive, o = s === void 0 ? !0 : s, a = t.roundOffsets, l = a === void 0 ? !0 : a, c = {
    placement: Rn(e.placement),
    variation: fs(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: i,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, Xp(Object.assign({}, c, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: o,
    roundOffsets: l
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, Xp(Object.assign({}, c, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: l
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const BP = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: $P,
  data: {}
};
var ma = {
  passive: !0
};
function jP(n) {
  var e = n.state, t = n.instance, r = n.options, i = r.scroll, s = i === void 0 ? !0 : i, o = r.resize, a = o === void 0 ? !0 : o, l = Vt(e.elements.popper), c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return s && c.forEach(function(u) {
    u.addEventListener("scroll", t.update, ma);
  }), a && l.addEventListener("resize", t.update, ma), function() {
    s && c.forEach(function(u) {
      u.removeEventListener("scroll", t.update, ma);
    }), a && l.removeEventListener("resize", t.update, ma);
  };
}
const VP = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: jP,
  data: {}
};
var zP = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Na(n) {
  return n.replace(/left|right|bottom|top/g, function(e) {
    return zP[e];
  });
}
var HP = {
  start: "end",
  end: "start"
};
function Jp(n) {
  return n.replace(/start|end/g, function(e) {
    return HP[e];
  });
}
function od(n) {
  var e = Vt(n), t = e.pageXOffset, r = e.pageYOffset;
  return {
    scrollLeft: t,
    scrollTop: r
  };
}
function ad(n) {
  return us(Gr(n)).left + od(n).scrollLeft;
}
function GP(n, e) {
  var t = Vt(n), r = Gr(n), i = t.visualViewport, s = r.clientWidth, o = r.clientHeight, a = 0, l = 0;
  if (i) {
    s = i.width, o = i.height;
    var c = S0();
    (c || !c && e === "fixed") && (a = i.offsetLeft, l = i.offsetTop);
  }
  return {
    width: s,
    height: o,
    x: a + ad(n),
    y: l
  };
}
function WP(n) {
  var e, t = Gr(n), r = od(n), i = (e = n.ownerDocument) == null ? void 0 : e.body, s = di(t.scrollWidth, t.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), o = di(t.scrollHeight, t.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), a = -r.scrollLeft + ad(n), l = -r.scrollTop;
  return nr(i || t).direction === "rtl" && (a += di(t.clientWidth, i ? i.clientWidth : 0) - s), {
    width: s,
    height: o,
    x: a,
    y: l
  };
}
function ld(n) {
  var e = nr(n), t = e.overflow, r = e.overflowX, i = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(t + i + r);
}
function E0(n) {
  return ["html", "body", "#document"].indexOf(Vn(n)) >= 0 ? n.ownerDocument.body : sn(n) && ld(n) ? n : E0(Dl(n));
}
function so(n, e) {
  var t;
  e === void 0 && (e = []);
  var r = E0(n), i = r === ((t = n.ownerDocument) == null ? void 0 : t.body), s = Vt(r), o = i ? [s].concat(s.visualViewport || [], ld(r) ? r : []) : r, a = e.concat(o);
  return i ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(so(Dl(o)))
  );
}
function Bu(n) {
  return Object.assign({}, n, {
    left: n.x,
    top: n.y,
    right: n.x + n.width,
    bottom: n.y + n.height
  });
}
function UP(n, e) {
  var t = us(n, !1, e === "fixed");
  return t.top = t.top + n.clientTop, t.left = t.left + n.clientLeft, t.bottom = t.top + n.clientHeight, t.right = t.left + n.clientWidth, t.width = n.clientWidth, t.height = n.clientHeight, t.x = t.left, t.y = t.top, t;
}
function Qp(n, e, t) {
  return e === w0 ? Bu(GP(n, t)) : wi(e) ? UP(e, t) : Bu(WP(Gr(n)));
}
function KP(n) {
  var e = so(Dl(n)), t = ["absolute", "fixed"].indexOf(nr(n).position) >= 0, r = t && sn(n) ? jo(n) : n;
  return wi(r) ? e.filter(function(i) {
    return wi(i) && x0(i, r) && Vn(i) !== "body";
  }) : [];
}
function YP(n, e, t, r) {
  var i = e === "clippingParents" ? KP(n) : [].concat(e), s = [].concat(i, [t]), o = s[0], a = s.reduce(function(l, c) {
    var u = Qp(n, c, r);
    return l.top = di(u.top, l.top), l.right = tl(u.right, l.right), l.bottom = tl(u.bottom, l.bottom), l.left = di(u.left, l.left), l;
  }, Qp(n, o, r));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function M0(n) {
  var e = n.reference, t = n.element, r = n.placement, i = r ? Rn(r) : null, s = r ? fs(r) : null, o = e.x + e.width / 2 - t.width / 2, a = e.y + e.height / 2 - t.height / 2, l;
  switch (i) {
    case Dt:
      l = {
        x: o,
        y: e.y - t.height
      };
      break;
    case on:
      l = {
        x: o,
        y: e.y + e.height
      };
      break;
    case an:
      l = {
        x: e.x + e.width,
        y: a
      };
      break;
    case Lt:
      l = {
        x: e.x - t.width,
        y: a
      };
      break;
    default:
      l = {
        x: e.x,
        y: e.y
      };
  }
  var c = i ? sd(i) : null;
  if (c != null) {
    var u = c === "y" ? "height" : "width";
    switch (s) {
      case ls:
        l[c] = l[c] - (e[u] / 2 - t[u] / 2);
        break;
      case xo:
        l[c] = l[c] + (e[u] / 2 - t[u] / 2);
        break;
    }
  }
  return l;
}
function ko(n, e) {
  e === void 0 && (e = {});
  var t = e, r = t.placement, i = r === void 0 ? n.placement : r, s = t.strategy, o = s === void 0 ? n.strategy : s, a = t.boundary, l = a === void 0 ? mP : a, c = t.rootBoundary, u = c === void 0 ? w0 : c, f = t.elementContext, d = f === void 0 ? Ds : f, p = t.altBoundary, h = p === void 0 ? !1 : p, m = t.padding, g = m === void 0 ? 0 : m, v = T0(typeof g != "number" ? g : O0(g, Bo)), w = d === Ds ? gP : Ds, b = n.rects.popper, y = n.elements[h ? w : d], k = YP(wi(y) ? y : y.contextElement || Gr(n.elements.popper), l, u, o), C = us(n.elements.reference), S = M0({
    reference: C,
    element: b,
    strategy: "absolute",
    placement: i
  }), O = Bu(Object.assign({}, b, S)), T = d === Ds ? O : C, V = {
    top: k.top - T.top + v.top,
    bottom: T.bottom - k.bottom + v.bottom,
    left: k.left - T.left + v.left,
    right: T.right - k.right + v.right
  }, X = n.modifiersData.offset;
  if (d === Ds && X) {
    var W = X[i];
    Object.keys(V).forEach(function(Q) {
      var Me = [an, on].indexOf(Q) >= 0 ? 1 : -1, Ae = [Dt, on].indexOf(Q) >= 0 ? "y" : "x";
      V[Q] += W[Ae] * Me;
    });
  }
  return V;
}
function qP(n, e) {
  e === void 0 && (e = {});
  var t = e, r = t.placement, i = t.boundary, s = t.rootBoundary, o = t.padding, a = t.flipVariations, l = t.allowedAutoPlacements, c = l === void 0 ? C0 : l, u = fs(r), f = u ? a ? Yp : Yp.filter(function(h) {
    return fs(h) === u;
  }) : Bo, d = f.filter(function(h) {
    return c.indexOf(h) >= 0;
  });
  d.length === 0 && (d = f);
  var p = d.reduce(function(h, m) {
    return h[m] = ko(n, {
      placement: m,
      boundary: i,
      rootBoundary: s,
      padding: o
    })[Rn(m)], h;
  }, {});
  return Object.keys(p).sort(function(h, m) {
    return p[h] - p[m];
  });
}
function XP(n) {
  if (Rn(n) === nd)
    return [];
  var e = Na(n);
  return [Jp(n), e, Jp(e)];
}
function JP(n) {
  var e = n.state, t = n.options, r = n.name;
  if (!e.modifiersData[r]._skip) {
    for (var i = t.mainAxis, s = i === void 0 ? !0 : i, o = t.altAxis, a = o === void 0 ? !0 : o, l = t.fallbackPlacements, c = t.padding, u = t.boundary, f = t.rootBoundary, d = t.altBoundary, p = t.flipVariations, h = p === void 0 ? !0 : p, m = t.allowedAutoPlacements, g = e.options.placement, v = Rn(g), w = v === g, b = l || (w || !h ? [Na(g)] : XP(g)), y = [g].concat(b).reduce(function(tt, Ye) {
      return tt.concat(Rn(Ye) === nd ? qP(e, {
        placement: Ye,
        boundary: u,
        rootBoundary: f,
        padding: c,
        flipVariations: h,
        allowedAutoPlacements: m
      }) : Ye);
    }, []), k = e.rects.reference, C = e.rects.popper, S = /* @__PURE__ */ new Map(), O = !0, T = y[0], V = 0; V < y.length; V++) {
      var X = y[V], W = Rn(X), Q = fs(X) === ls, Me = [Dt, on].indexOf(W) >= 0, Ae = Me ? "width" : "height", be = ko(e, {
        placement: X,
        boundary: u,
        rootBoundary: f,
        altBoundary: d,
        padding: c
      }), Ee = Me ? Q ? an : Lt : Q ? on : Dt;
      k[Ae] > C[Ae] && (Ee = Na(Ee));
      var _e = Na(Ee), Ze = [];
      if (s && Ze.push(be[W] <= 0), a && Ze.push(be[Ee] <= 0, be[_e] <= 0), Ze.every(function(tt) {
        return tt;
      })) {
        T = X, O = !1;
        break;
      }
      S.set(X, Ze);
    }
    if (O)
      for (var et = h ? 3 : 1, Ge = function(Ye) {
        var ue = y.find(function(Gt) {
          var wt = S.get(Gt);
          if (wt)
            return wt.slice(0, Ye).every(function(Wt) {
              return Wt;
            });
        });
        if (ue)
          return T = ue, "break";
      }, Ue = et; Ue > 0; Ue--) {
        var ht = Ge(Ue);
        if (ht === "break") break;
      }
    e.placement !== T && (e.modifiersData[r]._skip = !0, e.placement = T, e.reset = !0);
  }
}
const QP = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: JP,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Zp(n, e, t) {
  return t === void 0 && (t = {
    x: 0,
    y: 0
  }), {
    top: n.top - e.height - t.y,
    right: n.right - e.width + t.x,
    bottom: n.bottom - e.height + t.y,
    left: n.left - e.width - t.x
  };
}
function em(n) {
  return [Dt, an, on, Lt].some(function(e) {
    return n[e] >= 0;
  });
}
function ZP(n) {
  var e = n.state, t = n.name, r = e.rects.reference, i = e.rects.popper, s = e.modifiersData.preventOverflow, o = ko(e, {
    elementContext: "reference"
  }), a = ko(e, {
    altBoundary: !0
  }), l = Zp(o, r), c = Zp(a, i, s), u = em(l), f = em(c);
  e.modifiersData[t] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: c,
    isReferenceHidden: u,
    hasPopperEscaped: f
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": u,
    "data-popper-escaped": f
  });
}
const eI = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: ZP
};
function tI(n, e, t) {
  var r = Rn(n), i = [Lt, Dt].indexOf(r) >= 0 ? -1 : 1, s = typeof t == "function" ? t(Object.assign({}, e, {
    placement: n
  })) : t, o = s[0], a = s[1];
  return o = o || 0, a = (a || 0) * i, [Lt, an].indexOf(r) >= 0 ? {
    x: a,
    y: o
  } : {
    x: o,
    y: a
  };
}
function nI(n) {
  var e = n.state, t = n.options, r = n.name, i = t.offset, s = i === void 0 ? [0, 0] : i, o = C0.reduce(function(u, f) {
    return u[f] = tI(f, e.rects, s), u;
  }, {}), a = o[e.placement], l = a.x, c = a.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += l, e.modifiersData.popperOffsets.y += c), e.modifiersData[r] = o;
}
const rI = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: nI
};
function iI(n) {
  var e = n.state, t = n.name;
  e.modifiersData[t] = M0({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const sI = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: iI,
  data: {}
};
function oI(n) {
  return n === "x" ? "y" : "x";
}
function aI(n) {
  var e = n.state, t = n.options, r = n.name, i = t.mainAxis, s = i === void 0 ? !0 : i, o = t.altAxis, a = o === void 0 ? !1 : o, l = t.boundary, c = t.rootBoundary, u = t.altBoundary, f = t.padding, d = t.tether, p = d === void 0 ? !0 : d, h = t.tetherOffset, m = h === void 0 ? 0 : h, g = ko(e, {
    boundary: l,
    rootBoundary: c,
    padding: f,
    altBoundary: u
  }), v = Rn(e.placement), w = fs(e.placement), b = !w, y = sd(v), k = oI(y), C = e.modifiersData.popperOffsets, S = e.rects.reference, O = e.rects.popper, T = typeof m == "function" ? m(Object.assign({}, e.rects, {
    placement: e.placement
  })) : m, V = typeof T == "number" ? {
    mainAxis: T,
    altAxis: T
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, T), X = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, W = {
    x: 0,
    y: 0
  };
  if (C) {
    if (s) {
      var Q, Me = y === "y" ? Dt : Lt, Ae = y === "y" ? on : an, be = y === "y" ? "height" : "width", Ee = C[y], _e = Ee + g[Me], Ze = Ee - g[Ae], et = p ? -O[be] / 2 : 0, Ge = w === ls ? S[be] : O[be], Ue = w === ls ? -O[be] : -S[be], ht = e.elements.arrow, tt = p && ht ? id(ht) : {
        width: 0,
        height: 0
      }, Ye = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : k0(), ue = Ye[Me], Gt = Ye[Ae], wt = io(0, S[be], tt[be]), Wt = b ? S[be] / 2 - et - wt - ue - V.mainAxis : Ge - wt - ue - V.mainAxis, Ct = b ? -S[be] / 2 + et + wt + Gt + V.mainAxis : Ue + wt + Gt + V.mainAxis, Ut = e.elements.arrow && jo(e.elements.arrow), xn = Ut ? y === "y" ? Ut.clientTop || 0 : Ut.clientLeft || 0 : 0, fn = (Q = X == null ? void 0 : X[y]) != null ? Q : 0, $ = Ee + Wt - fn - xn, me = Ee + Ct - fn, Kt = io(p ? tl(_e, $) : _e, Ee, p ? di(Ze, me) : Ze);
      C[y] = Kt, W[y] = Kt - Ee;
    }
    if (a) {
      var Yt, kn = y === "x" ? Dt : Lt, or = y === "x" ? on : an, _ = C[k], x = k === "y" ? "height" : "width", P = _ + g[kn], U = _ - g[or], ke = [Dt, Lt].indexOf(v) !== -1, re = (Yt = X == null ? void 0 : X[k]) != null ? Yt : 0, M = ke ? P : _ - S[x] - O[x] - re + V.altAxis, L = ke ? _ + S[x] + O[x] - re - V.altAxis : U, Se = p && ke ? NP(M, _, L) : io(p ? M : P, _, p ? L : U);
      C[k] = Se, W[k] = Se - _;
    }
    e.modifiersData[r] = W;
  }
}
const lI = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: aI,
  requiresIfExists: ["offset"]
};
function cI(n) {
  return {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  };
}
function uI(n) {
  return n === Vt(n) || !sn(n) ? od(n) : cI(n);
}
function fI(n) {
  var e = n.getBoundingClientRect(), t = cs(e.width) / n.offsetWidth || 1, r = cs(e.height) / n.offsetHeight || 1;
  return t !== 1 || r !== 1;
}
function dI(n, e, t) {
  t === void 0 && (t = !1);
  var r = sn(e), i = sn(e) && fI(e), s = Gr(e), o = us(n, i, t), a = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (r || !r && !t) && ((Vn(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  ld(s)) && (a = uI(e)), sn(e) ? (l = us(e, !0), l.x += e.clientLeft, l.y += e.clientTop) : s && (l.x = ad(s))), {
    x: o.left + a.scrollLeft - l.x,
    y: o.top + a.scrollTop - l.y,
    width: o.width,
    height: o.height
  };
}
function hI(n) {
  var e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set(), r = [];
  n.forEach(function(s) {
    e.set(s.name, s);
  });
  function i(s) {
    t.add(s.name);
    var o = [].concat(s.requires || [], s.requiresIfExists || []);
    o.forEach(function(a) {
      if (!t.has(a)) {
        var l = e.get(a);
        l && i(l);
      }
    }), r.push(s);
  }
  return n.forEach(function(s) {
    t.has(s.name) || i(s);
  }), r;
}
function pI(n) {
  var e = hI(n);
  return TP.reduce(function(t, r) {
    return t.concat(e.filter(function(i) {
      return i.phase === r;
    }));
  }, []);
}
function mI(n) {
  var e;
  return function() {
    return e || (e = new Promise(function(t) {
      Promise.resolve().then(function() {
        e = void 0, t(n());
      });
    })), e;
  };
}
function gI(n) {
  var e = n.reduce(function(t, r) {
    var i = t[r.name];
    return t[r.name] = i ? Object.assign({}, i, r, {
      options: Object.assign({}, i.options, r.options),
      data: Object.assign({}, i.data, r.data)
    }) : r, t;
  }, {});
  return Object.keys(e).map(function(t) {
    return e[t];
  });
}
var tm = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function nm() {
  for (var n = arguments.length, e = new Array(n), t = 0; t < n; t++)
    e[t] = arguments[t];
  return !e.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function yI(n) {
  n === void 0 && (n = {});
  var e = n, t = e.defaultModifiers, r = t === void 0 ? [] : t, i = e.defaultOptions, s = i === void 0 ? tm : i;
  return function(a, l, c) {
    c === void 0 && (c = s);
    var u = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, tm, s),
      modifiersData: {},
      elements: {
        reference: a,
        popper: l
      },
      attributes: {},
      styles: {}
    }, f = [], d = !1, p = {
      state: u,
      setOptions: function(v) {
        var w = typeof v == "function" ? v(u.options) : v;
        m(), u.options = Object.assign({}, s, u.options, w), u.scrollParents = {
          reference: wi(a) ? so(a) : a.contextElement ? so(a.contextElement) : [],
          popper: so(l)
        };
        var b = pI(gI([].concat(r, u.options.modifiers)));
        return u.orderedModifiers = b.filter(function(y) {
          return y.enabled;
        }), h(), p.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!d) {
          var v = u.elements, w = v.reference, b = v.popper;
          if (nm(w, b)) {
            u.rects = {
              reference: dI(w, jo(b), u.options.strategy === "fixed"),
              popper: id(b)
            }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(V) {
              return u.modifiersData[V.name] = Object.assign({}, V.data);
            });
            for (var y = 0; y < u.orderedModifiers.length; y++) {
              if (u.reset === !0) {
                u.reset = !1, y = -1;
                continue;
              }
              var k = u.orderedModifiers[y], C = k.fn, S = k.options, O = S === void 0 ? {} : S, T = k.name;
              typeof C == "function" && (u = C({
                state: u,
                options: O,
                name: T,
                instance: p
              }) || u);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: mI(function() {
        return new Promise(function(g) {
          p.forceUpdate(), g(u);
        });
      }),
      destroy: function() {
        m(), d = !0;
      }
    };
    if (!nm(a, l))
      return p;
    p.setOptions(c).then(function(g) {
      !d && c.onFirstUpdate && c.onFirstUpdate(g);
    });
    function h() {
      u.orderedModifiers.forEach(function(g) {
        var v = g.name, w = g.options, b = w === void 0 ? {} : w, y = g.effect;
        if (typeof y == "function") {
          var k = y({
            state: u,
            name: v,
            instance: p,
            options: b
          }), C = function() {
          };
          f.push(k || C);
        }
      });
    }
    function m() {
      f.forEach(function(g) {
        return g();
      }), f = [];
    }
    return p;
  };
}
var vI = [VP, sI, BP, _0, rI, QP, lI, LP, eI], bI = /* @__PURE__ */ yI({
  defaultModifiers: vI
}), wI = "tippy-box", A0 = "tippy-content", CI = "tippy-backdrop", N0 = "tippy-arrow", P0 = "tippy-svg-arrow", Jr = {
  passive: !0,
  capture: !0
}, I0 = function() {
  return document.body;
};
function Nc(n, e, t) {
  if (Array.isArray(n)) {
    var r = n[e];
    return r ?? (Array.isArray(t) ? t[e] : t);
  }
  return n;
}
function cd(n, e) {
  var t = {}.toString.call(n);
  return t.indexOf("[object") === 0 && t.indexOf(e + "]") > -1;
}
function D0(n, e) {
  return typeof n == "function" ? n.apply(void 0, e) : n;
}
function rm(n, e) {
  if (e === 0)
    return n;
  var t;
  return function(r) {
    clearTimeout(t), t = setTimeout(function() {
      n(r);
    }, e);
  };
}
function _I(n) {
  return n.split(/\s+/).filter(Boolean);
}
function Bi(n) {
  return [].concat(n);
}
function im(n, e) {
  n.indexOf(e) === -1 && n.push(e);
}
function SI(n) {
  return n.filter(function(e, t) {
    return n.indexOf(e) === t;
  });
}
function xI(n) {
  return n.split("-")[0];
}
function nl(n) {
  return [].slice.call(n);
}
function sm(n) {
  return Object.keys(n).reduce(function(e, t) {
    return n[t] !== void 0 && (e[t] = n[t]), e;
  }, {});
}
function oo() {
  return document.createElement("div");
}
function Ll(n) {
  return ["Element", "Fragment"].some(function(e) {
    return cd(n, e);
  });
}
function kI(n) {
  return cd(n, "NodeList");
}
function TI(n) {
  return cd(n, "MouseEvent");
}
function OI(n) {
  return !!(n && n._tippy && n._tippy.reference === n);
}
function EI(n) {
  return Ll(n) ? [n] : kI(n) ? nl(n) : Array.isArray(n) ? n : nl(document.querySelectorAll(n));
}
function Pc(n, e) {
  n.forEach(function(t) {
    t && (t.style.transitionDuration = e + "ms");
  });
}
function om(n, e) {
  n.forEach(function(t) {
    t && t.setAttribute("data-state", e);
  });
}
function MI(n) {
  var e, t = Bi(n), r = t[0];
  return r != null && (e = r.ownerDocument) != null && e.body ? r.ownerDocument : document;
}
function AI(n, e) {
  var t = e.clientX, r = e.clientY;
  return n.every(function(i) {
    var s = i.popperRect, o = i.popperState, a = i.props, l = a.interactiveBorder, c = xI(o.placement), u = o.modifiersData.offset;
    if (!u)
      return !0;
    var f = c === "bottom" ? u.top.y : 0, d = c === "top" ? u.bottom.y : 0, p = c === "right" ? u.left.x : 0, h = c === "left" ? u.right.x : 0, m = s.top - r + f > l, g = r - s.bottom - d > l, v = s.left - t + p > l, w = t - s.right - h > l;
    return m || g || v || w;
  });
}
function Ic(n, e, t) {
  var r = e + "EventListener";
  ["transitionend", "webkitTransitionEnd"].forEach(function(i) {
    n[r](i, t);
  });
}
function am(n, e) {
  for (var t = e; t; ) {
    var r;
    if (n.contains(t))
      return !0;
    t = t.getRootNode == null || (r = t.getRootNode()) == null ? void 0 : r.host;
  }
  return !1;
}
var En = {
  isTouch: !1
}, lm = 0;
function NI() {
  En.isTouch || (En.isTouch = !0, window.performance && document.addEventListener("mousemove", L0));
}
function L0() {
  var n = performance.now();
  n - lm < 20 && (En.isTouch = !1, document.removeEventListener("mousemove", L0)), lm = n;
}
function PI() {
  var n = document.activeElement;
  if (OI(n)) {
    var e = n._tippy;
    n.blur && !e.state.isVisible && n.blur();
  }
}
function II() {
  document.addEventListener("touchstart", NI, Jr), window.addEventListener("blur", PI);
}
var DI = typeof window < "u" && typeof document < "u", LI = DI ? (
  // @ts-ignore
  !!window.msCrypto
) : !1, RI = {
  animateFill: !1,
  followCursor: !1,
  inlinePositioning: !1,
  sticky: !1
}, FI = {
  allowHTML: !1,
  animation: "fade",
  arrow: !0,
  content: "",
  inertia: !1,
  maxWidth: 350,
  role: "tooltip",
  theme: "",
  zIndex: 9999
}, gn = Object.assign({
  appendTo: I0,
  aria: {
    content: "auto",
    expanded: "auto"
  },
  delay: 0,
  duration: [300, 250],
  getReferenceClientRect: null,
  hideOnClick: !0,
  ignoreAttributes: !1,
  interactive: !1,
  interactiveBorder: 2,
  interactiveDebounce: 0,
  moveTransition: "",
  offset: [0, 10],
  onAfterUpdate: function() {
  },
  onBeforeUpdate: function() {
  },
  onCreate: function() {
  },
  onDestroy: function() {
  },
  onHidden: function() {
  },
  onHide: function() {
  },
  onMount: function() {
  },
  onShow: function() {
  },
  onShown: function() {
  },
  onTrigger: function() {
  },
  onUntrigger: function() {
  },
  onClickOutside: function() {
  },
  placement: "top",
  plugins: [],
  popperOptions: {},
  render: null,
  showOnCreate: !1,
  touch: !0,
  trigger: "mouseenter focus",
  triggerTarget: null
}, RI, FI), $I = Object.keys(gn), BI = function(e) {
  var t = Object.keys(e);
  t.forEach(function(r) {
    gn[r] = e[r];
  });
};
function R0(n) {
  var e = n.plugins || [], t = e.reduce(function(r, i) {
    var s = i.name, o = i.defaultValue;
    if (s) {
      var a;
      r[s] = n[s] !== void 0 ? n[s] : (a = gn[s]) != null ? a : o;
    }
    return r;
  }, {});
  return Object.assign({}, n, t);
}
function jI(n, e) {
  var t = e ? Object.keys(R0(Object.assign({}, gn, {
    plugins: e
  }))) : $I, r = t.reduce(function(i, s) {
    var o = (n.getAttribute("data-tippy-" + s) || "").trim();
    if (!o)
      return i;
    if (s === "content")
      i[s] = o;
    else
      try {
        i[s] = JSON.parse(o);
      } catch {
        i[s] = o;
      }
    return i;
  }, {});
  return r;
}
function cm(n, e) {
  var t = Object.assign({}, e, {
    content: D0(e.content, [n])
  }, e.ignoreAttributes ? {} : jI(n, e.plugins));
  return t.aria = Object.assign({}, gn.aria, t.aria), t.aria = {
    expanded: t.aria.expanded === "auto" ? e.interactive : t.aria.expanded,
    content: t.aria.content === "auto" ? e.interactive ? null : "describedby" : t.aria.content
  }, t;
}
var VI = function() {
  return "innerHTML";
};
function ju(n, e) {
  n[VI()] = e;
}
function um(n) {
  var e = oo();
  return n === !0 ? e.className = N0 : (e.className = P0, Ll(n) ? e.appendChild(n) : ju(e, n)), e;
}
function fm(n, e) {
  Ll(e.content) ? (ju(n, ""), n.appendChild(e.content)) : typeof e.content != "function" && (e.allowHTML ? ju(n, e.content) : n.textContent = e.content);
}
function Vu(n) {
  var e = n.firstElementChild, t = nl(e.children);
  return {
    box: e,
    content: t.find(function(r) {
      return r.classList.contains(A0);
    }),
    arrow: t.find(function(r) {
      return r.classList.contains(N0) || r.classList.contains(P0);
    }),
    backdrop: t.find(function(r) {
      return r.classList.contains(CI);
    })
  };
}
function F0(n) {
  var e = oo(), t = oo();
  t.className = wI, t.setAttribute("data-state", "hidden"), t.setAttribute("tabindex", "-1");
  var r = oo();
  r.className = A0, r.setAttribute("data-state", "hidden"), fm(r, n.props), e.appendChild(t), t.appendChild(r), i(n.props, n.props);
  function i(s, o) {
    var a = Vu(e), l = a.box, c = a.content, u = a.arrow;
    o.theme ? l.setAttribute("data-theme", o.theme) : l.removeAttribute("data-theme"), typeof o.animation == "string" ? l.setAttribute("data-animation", o.animation) : l.removeAttribute("data-animation"), o.inertia ? l.setAttribute("data-inertia", "") : l.removeAttribute("data-inertia"), l.style.maxWidth = typeof o.maxWidth == "number" ? o.maxWidth + "px" : o.maxWidth, o.role ? l.setAttribute("role", o.role) : l.removeAttribute("role"), (s.content !== o.content || s.allowHTML !== o.allowHTML) && fm(c, n.props), o.arrow ? u ? s.arrow !== o.arrow && (l.removeChild(u), l.appendChild(um(o.arrow))) : l.appendChild(um(o.arrow)) : u && l.removeChild(u);
  }
  return {
    popper: e,
    onUpdate: i
  };
}
F0.$$tippy = !0;
var zI = 1, ga = [], Dc = [];
function HI(n, e) {
  var t = cm(n, Object.assign({}, gn, R0(sm(e)))), r, i, s, o = !1, a = !1, l = !1, c = !1, u, f, d, p = [], h = rm($, t.interactiveDebounce), m, g = zI++, v = null, w = SI(t.plugins), b = {
    // Is the instance currently enabled?
    isEnabled: !0,
    // Is the tippy currently showing and not transitioning out?
    isVisible: !1,
    // Has the instance been destroyed?
    isDestroyed: !1,
    // Is the tippy currently mounted to the DOM?
    isMounted: !1,
    // Has the tippy finished transitioning in?
    isShown: !1
  }, y = {
    // properties
    id: g,
    reference: n,
    popper: oo(),
    popperInstance: v,
    props: t,
    state: b,
    plugins: w,
    // methods
    clearDelayTimeouts: M,
    setProps: L,
    setContent: Se,
    show: ze,
    hide: Tn,
    hideWithInteractivity: Mi,
    enable: ke,
    disable: re,
    unmount: ar,
    destroy: jl
  };
  if (!t.render)
    return y;
  var k = t.render(y), C = k.popper, S = k.onUpdate;
  C.setAttribute("data-tippy-root", ""), C.id = "tippy-" + y.id, y.popper = C, n._tippy = y, C._tippy = y;
  var O = w.map(function(A) {
    return A.fn(y);
  }), T = n.hasAttribute("aria-expanded");
  return Ut(), et(), Ee(), _e("onCreate", [y]), t.showOnCreate && P(), C.addEventListener("mouseenter", function() {
    y.props.interactive && y.state.isVisible && y.clearDelayTimeouts();
  }), C.addEventListener("mouseleave", function() {
    y.props.interactive && y.props.trigger.indexOf("mouseenter") >= 0 && Me().addEventListener("mousemove", h);
  }), y;
  function V() {
    var A = y.props.touch;
    return Array.isArray(A) ? A : [A, 0];
  }
  function X() {
    return V()[0] === "hold";
  }
  function W() {
    var A;
    return !!((A = y.props.render) != null && A.$$tippy);
  }
  function Q() {
    return m || n;
  }
  function Me() {
    var A = Q().parentNode;
    return A ? MI(A) : document;
  }
  function Ae() {
    return Vu(C);
  }
  function be(A) {
    return y.state.isMounted && !y.state.isVisible || En.isTouch || u && u.type === "focus" ? 0 : Nc(y.props.delay, A ? 0 : 1, gn.delay);
  }
  function Ee(A) {
    A === void 0 && (A = !1), C.style.pointerEvents = y.props.interactive && !A ? "" : "none", C.style.zIndex = "" + y.props.zIndex;
  }
  function _e(A, J, ae) {
    if (ae === void 0 && (ae = !0), O.forEach(function(we) {
      we[A] && we[A].apply(we, J);
    }), ae) {
      var Oe;
      (Oe = y.props)[A].apply(Oe, J);
    }
  }
  function Ze() {
    var A = y.props.aria;
    if (A.content) {
      var J = "aria-" + A.content, ae = C.id, Oe = Bi(y.props.triggerTarget || n);
      Oe.forEach(function(we) {
        var _t = we.getAttribute(J);
        if (y.state.isVisible)
          we.setAttribute(J, _t ? _t + " " + ae : ae);
        else {
          var qt = _t && _t.replace(ae, "").trim();
          qt ? we.setAttribute(J, qt) : we.removeAttribute(J);
        }
      });
    }
  }
  function et() {
    if (!(T || !y.props.aria.expanded)) {
      var A = Bi(y.props.triggerTarget || n);
      A.forEach(function(J) {
        y.props.interactive ? J.setAttribute("aria-expanded", y.state.isVisible && J === Q() ? "true" : "false") : J.removeAttribute("aria-expanded");
      });
    }
  }
  function Ge() {
    Me().removeEventListener("mousemove", h), ga = ga.filter(function(A) {
      return A !== h;
    });
  }
  function Ue(A) {
    if (!(En.isTouch && (l || A.type === "mousedown"))) {
      var J = A.composedPath && A.composedPath()[0] || A.target;
      if (!(y.props.interactive && am(C, J))) {
        if (Bi(y.props.triggerTarget || n).some(function(ae) {
          return am(ae, J);
        })) {
          if (En.isTouch || y.state.isVisible && y.props.trigger.indexOf("click") >= 0)
            return;
        } else
          _e("onClickOutside", [y, A]);
        y.props.hideOnClick === !0 && (y.clearDelayTimeouts(), y.hide(), a = !0, setTimeout(function() {
          a = !1;
        }), y.state.isMounted || ue());
      }
    }
  }
  function ht() {
    l = !0;
  }
  function tt() {
    l = !1;
  }
  function Ye() {
    var A = Me();
    A.addEventListener("mousedown", Ue, !0), A.addEventListener("touchend", Ue, Jr), A.addEventListener("touchstart", tt, Jr), A.addEventListener("touchmove", ht, Jr);
  }
  function ue() {
    var A = Me();
    A.removeEventListener("mousedown", Ue, !0), A.removeEventListener("touchend", Ue, Jr), A.removeEventListener("touchstart", tt, Jr), A.removeEventListener("touchmove", ht, Jr);
  }
  function Gt(A, J) {
    Wt(A, function() {
      !y.state.isVisible && C.parentNode && C.parentNode.contains(C) && J();
    });
  }
  function wt(A, J) {
    Wt(A, J);
  }
  function Wt(A, J) {
    var ae = Ae().box;
    function Oe(we) {
      we.target === ae && (Ic(ae, "remove", Oe), J());
    }
    if (A === 0)
      return J();
    Ic(ae, "remove", f), Ic(ae, "add", Oe), f = Oe;
  }
  function Ct(A, J, ae) {
    ae === void 0 && (ae = !1);
    var Oe = Bi(y.props.triggerTarget || n);
    Oe.forEach(function(we) {
      we.addEventListener(A, J, ae), p.push({
        node: we,
        eventType: A,
        handler: J,
        options: ae
      });
    });
  }
  function Ut() {
    X() && (Ct("touchstart", fn, {
      passive: !0
    }), Ct("touchend", me, {
      passive: !0
    })), _I(y.props.trigger).forEach(function(A) {
      if (A !== "manual")
        switch (Ct(A, fn), A) {
          case "mouseenter":
            Ct("mouseleave", me);
            break;
          case "focus":
            Ct(LI ? "focusout" : "blur", Kt);
            break;
          case "focusin":
            Ct("focusout", Kt);
            break;
        }
    });
  }
  function xn() {
    p.forEach(function(A) {
      var J = A.node, ae = A.eventType, Oe = A.handler, we = A.options;
      J.removeEventListener(ae, Oe, we);
    }), p = [];
  }
  function fn(A) {
    var J, ae = !1;
    if (!(!y.state.isEnabled || Yt(A) || a)) {
      var Oe = ((J = u) == null ? void 0 : J.type) === "focus";
      u = A, m = A.currentTarget, et(), !y.state.isVisible && TI(A) && ga.forEach(function(we) {
        return we(A);
      }), A.type === "click" && (y.props.trigger.indexOf("mouseenter") < 0 || o) && y.props.hideOnClick !== !1 && y.state.isVisible ? ae = !0 : P(A), A.type === "click" && (o = !ae), ae && !Oe && U(A);
    }
  }
  function $(A) {
    var J = A.target, ae = Q().contains(J) || C.contains(J);
    if (!(A.type === "mousemove" && ae)) {
      var Oe = x().concat(C).map(function(we) {
        var _t, qt = we._tippy, Ai = (_t = qt.popperInstance) == null ? void 0 : _t.state;
        return Ai ? {
          popperRect: we.getBoundingClientRect(),
          popperState: Ai,
          props: t
        } : null;
      }).filter(Boolean);
      AI(Oe, A) && (Ge(), U(A));
    }
  }
  function me(A) {
    var J = Yt(A) || y.props.trigger.indexOf("click") >= 0 && o;
    if (!J) {
      if (y.props.interactive) {
        y.hideWithInteractivity(A);
        return;
      }
      U(A);
    }
  }
  function Kt(A) {
    y.props.trigger.indexOf("focusin") < 0 && A.target !== Q() || y.props.interactive && A.relatedTarget && C.contains(A.relatedTarget) || U(A);
  }
  function Yt(A) {
    return En.isTouch ? X() !== A.type.indexOf("touch") >= 0 : !1;
  }
  function kn() {
    or();
    var A = y.props, J = A.popperOptions, ae = A.placement, Oe = A.offset, we = A.getReferenceClientRect, _t = A.moveTransition, qt = W() ? Vu(C).arrow : null, Ai = we ? {
      getBoundingClientRect: we,
      contextElement: we.contextElement || Q()
    } : n, yd = {
      name: "$$tippy",
      enabled: !0,
      phase: "beforeWrite",
      requires: ["computeStyles"],
      fn: function(Vo) {
        var Ni = Vo.state;
        if (W()) {
          var gb = Ae(), zl = gb.box;
          ["placement", "reference-hidden", "escaped"].forEach(function(zo) {
            zo === "placement" ? zl.setAttribute("data-placement", Ni.placement) : Ni.attributes.popper["data-popper-" + zo] ? zl.setAttribute("data-" + zo, "") : zl.removeAttribute("data-" + zo);
          }), Ni.attributes.popper = {};
        }
      }
    }, Ur = [{
      name: "offset",
      options: {
        offset: Oe
      }
    }, {
      name: "preventOverflow",
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    }, {
      name: "flip",
      options: {
        padding: 5
      }
    }, {
      name: "computeStyles",
      options: {
        adaptive: !_t
      }
    }, yd];
    W() && qt && Ur.push({
      name: "arrow",
      options: {
        element: qt,
        padding: 3
      }
    }), Ur.push.apply(Ur, (J == null ? void 0 : J.modifiers) || []), y.popperInstance = bI(Ai, C, Object.assign({}, J, {
      placement: ae,
      onFirstUpdate: d,
      modifiers: Ur
    }));
  }
  function or() {
    y.popperInstance && (y.popperInstance.destroy(), y.popperInstance = null);
  }
  function _() {
    var A = y.props.appendTo, J, ae = Q();
    y.props.interactive && A === I0 || A === "parent" ? J = ae.parentNode : J = D0(A, [ae]), J.contains(C) || J.appendChild(C), y.state.isMounted = !0, kn();
  }
  function x() {
    return nl(C.querySelectorAll("[data-tippy-root]"));
  }
  function P(A) {
    y.clearDelayTimeouts(), A && _e("onTrigger", [y, A]), Ye();
    var J = be(!0), ae = V(), Oe = ae[0], we = ae[1];
    En.isTouch && Oe === "hold" && we && (J = we), J ? r = setTimeout(function() {
      y.show();
    }, J) : y.show();
  }
  function U(A) {
    if (y.clearDelayTimeouts(), _e("onUntrigger", [y, A]), !y.state.isVisible) {
      ue();
      return;
    }
    if (!(y.props.trigger.indexOf("mouseenter") >= 0 && y.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(A.type) >= 0 && o)) {
      var J = be(!1);
      J ? i = setTimeout(function() {
        y.state.isVisible && y.hide();
      }, J) : s = requestAnimationFrame(function() {
        y.hide();
      });
    }
  }
  function ke() {
    y.state.isEnabled = !0;
  }
  function re() {
    y.hide(), y.state.isEnabled = !1;
  }
  function M() {
    clearTimeout(r), clearTimeout(i), cancelAnimationFrame(s);
  }
  function L(A) {
    if (!y.state.isDestroyed) {
      _e("onBeforeUpdate", [y, A]), xn();
      var J = y.props, ae = cm(n, Object.assign({}, J, sm(A), {
        ignoreAttributes: !0
      }));
      y.props = ae, Ut(), J.interactiveDebounce !== ae.interactiveDebounce && (Ge(), h = rm($, ae.interactiveDebounce)), J.triggerTarget && !ae.triggerTarget ? Bi(J.triggerTarget).forEach(function(Oe) {
        Oe.removeAttribute("aria-expanded");
      }) : ae.triggerTarget && n.removeAttribute("aria-expanded"), et(), Ee(), S && S(J, ae), y.popperInstance && (kn(), x().forEach(function(Oe) {
        requestAnimationFrame(Oe._tippy.popperInstance.forceUpdate);
      })), _e("onAfterUpdate", [y, A]);
    }
  }
  function Se(A) {
    y.setProps({
      content: A
    });
  }
  function ze() {
    var A = y.state.isVisible, J = y.state.isDestroyed, ae = !y.state.isEnabled, Oe = En.isTouch && !y.props.touch, we = Nc(y.props.duration, 0, gn.duration);
    if (!(A || J || ae || Oe) && !Q().hasAttribute("disabled") && (_e("onShow", [y], !1), y.props.onShow(y) !== !1)) {
      if (y.state.isVisible = !0, W() && (C.style.visibility = "visible"), Ee(), Ye(), y.state.isMounted || (C.style.transition = "none"), W()) {
        var _t = Ae(), qt = _t.box, Ai = _t.content;
        Pc([qt, Ai], 0);
      }
      d = function() {
        var Ur;
        if (!(!y.state.isVisible || c)) {
          if (c = !0, C.offsetHeight, C.style.transition = y.props.moveTransition, W() && y.props.animation) {
            var Vl = Ae(), Vo = Vl.box, Ni = Vl.content;
            Pc([Vo, Ni], we), om([Vo, Ni], "visible");
          }
          Ze(), et(), im(Dc, y), (Ur = y.popperInstance) == null || Ur.forceUpdate(), _e("onMount", [y]), y.props.animation && W() && wt(we, function() {
            y.state.isShown = !0, _e("onShown", [y]);
          });
        }
      }, _();
    }
  }
  function Tn() {
    var A = !y.state.isVisible, J = y.state.isDestroyed, ae = !y.state.isEnabled, Oe = Nc(y.props.duration, 1, gn.duration);
    if (!(A || J || ae) && (_e("onHide", [y], !1), y.props.onHide(y) !== !1)) {
      if (y.state.isVisible = !1, y.state.isShown = !1, c = !1, o = !1, W() && (C.style.visibility = "hidden"), Ge(), ue(), Ee(!0), W()) {
        var we = Ae(), _t = we.box, qt = we.content;
        y.props.animation && (Pc([_t, qt], Oe), om([_t, qt], "hidden"));
      }
      Ze(), et(), y.props.animation ? W() && Gt(Oe, y.unmount) : y.unmount();
    }
  }
  function Mi(A) {
    Me().addEventListener("mousemove", h), im(ga, h), h(A);
  }
  function ar() {
    y.state.isVisible && y.hide(), y.state.isMounted && (or(), x().forEach(function(A) {
      A._tippy.unmount();
    }), C.parentNode && C.parentNode.removeChild(C), Dc = Dc.filter(function(A) {
      return A !== y;
    }), y.state.isMounted = !1, _e("onHidden", [y]));
  }
  function jl() {
    y.state.isDestroyed || (y.clearDelayTimeouts(), y.unmount(), xn(), delete n._tippy, y.state.isDestroyed = !0, _e("onDestroy", [y]));
  }
}
function Ss(n, e) {
  e === void 0 && (e = {});
  var t = gn.plugins.concat(e.plugins || []);
  II();
  var r = Object.assign({}, e, {
    plugins: t
  }), i = EI(n), s = i.reduce(function(o, a) {
    var l = a && HI(a, r);
    return l && o.push(l), o;
  }, []);
  return Ll(n) ? s[0] : s;
}
Ss.defaultProps = gn;
Ss.setDefaultProps = BI;
Ss.currentInput = En;
Object.assign({}, _0, {
  effect: function(e) {
    var t = e.state, r = {
      popper: {
        position: t.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: {
        position: "absolute"
      },
      reference: {}
    };
    Object.assign(t.elements.popper.style, r.popper), t.styles = r, t.elements.arrow && Object.assign(t.elements.arrow.style, r.arrow);
  }
});
Ss.setDefaultProps({
  render: F0
});
class GI {
  constructor({ editor: e, element: t, view: r, tippyOptions: i = {}, updateDelay: s = 250, shouldShow: o }) {
    this.preventHide = !1, this.shouldShow = ({ view: a, state: l, from: c, to: u }) => {
      const { doc: f, selection: d } = l, { empty: p } = d, h = !f.textBetween(c, u).length && Qf(l.selection), m = this.element.contains(document.activeElement);
      return !(!(a.hasFocus() || m) || p || h || !this.editor.isEditable);
    }, this.mousedownHandler = () => {
      this.preventHide = !0;
    }, this.dragstartHandler = () => {
      this.hide();
    }, this.focusHandler = () => {
      setTimeout(() => this.update(this.editor.view));
    }, this.blurHandler = ({ event: a }) => {
      var l;
      if (this.preventHide) {
        this.preventHide = !1;
        return;
      }
      a != null && a.relatedTarget && (!((l = this.element.parentNode) === null || l === void 0) && l.contains(a.relatedTarget)) || (a == null ? void 0 : a.relatedTarget) !== this.editor.view.dom && this.hide();
    }, this.tippyBlurHandler = (a) => {
      this.blurHandler({ event: a });
    }, this.handleDebouncedUpdate = (a, l) => {
      const c = !(l != null && l.selection.eq(a.state.selection)), u = !(l != null && l.doc.eq(a.state.doc));
      !c && !u || (this.updateDebounceTimer && clearTimeout(this.updateDebounceTimer), this.updateDebounceTimer = window.setTimeout(() => {
        this.updateHandler(a, c, u, l);
      }, this.updateDelay));
    }, this.updateHandler = (a, l, c, u) => {
      var f, d, p;
      const { state: h, composing: m } = a, { selection: g } = h;
      if (m || !l && !c)
        return;
      this.createTooltip();
      const { ranges: w } = g, b = Math.min(...w.map((C) => C.$from.pos)), y = Math.max(...w.map((C) => C.$to.pos));
      if (!((f = this.shouldShow) === null || f === void 0 ? void 0 : f.call(this, {
        editor: this.editor,
        element: this.element,
        view: a,
        state: h,
        oldState: u,
        from: b,
        to: y
      }))) {
        this.hide();
        return;
      }
      (d = this.tippy) === null || d === void 0 || d.setProps({
        getReferenceClientRect: ((p = this.tippyOptions) === null || p === void 0 ? void 0 : p.getReferenceClientRect) || (() => {
          if (v0(h.selection)) {
            let C = a.nodeDOM(b);
            if (C) {
              const S = C.dataset.nodeViewWrapper ? C : C.querySelector("[data-node-view-wrapper]");
              if (S && (C = S.firstChild), C)
                return C.getBoundingClientRect();
            }
          }
          return b0(a, b, y);
        })
      }), this.show();
    }, this.editor = e, this.element = t, this.view = r, this.updateDelay = s, o && (this.shouldShow = o), this.element.addEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.view.dom.addEventListener("dragstart", this.dragstartHandler), this.editor.on("focus", this.focusHandler), this.editor.on("blur", this.blurHandler), this.tippyOptions = i, this.element.remove(), this.element.style.visibility = "visible";
  }
  createTooltip() {
    const { element: e } = this.editor.options, t = !!e.parentElement;
    this.tippy || !t || (this.tippy = Ss(e, {
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: !0,
      trigger: "manual",
      placement: "top",
      hideOnClick: "toggle",
      ...this.tippyOptions
    }), this.tippy.popper.firstChild && this.tippy.popper.firstChild.addEventListener("blur", this.tippyBlurHandler));
  }
  update(e, t) {
    const { state: r } = e, i = r.selection.from !== r.selection.to;
    if (this.updateDelay > 0 && i) {
      this.handleDebouncedUpdate(e, t);
      return;
    }
    const s = !(t != null && t.selection.eq(e.state.selection)), o = !(t != null && t.doc.eq(e.state.doc));
    this.updateHandler(e, s, o, t);
  }
  show() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.show();
  }
  hide() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.hide();
  }
  destroy() {
    var e, t;
    !((e = this.tippy) === null || e === void 0) && e.popper.firstChild && this.tippy.popper.firstChild.removeEventListener("blur", this.tippyBlurHandler), (t = this.tippy) === null || t === void 0 || t.destroy(), this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.view.dom.removeEventListener("dragstart", this.dragstartHandler), this.editor.off("focus", this.focusHandler), this.editor.off("blur", this.blurHandler);
  }
}
const $0 = (n) => new bt({
  key: typeof n.pluginKey == "string" ? new un(n.pluginKey) : n.pluginKey,
  view: (e) => new GI({ view: e, ...n })
});
dt.create({
  name: "bubbleMenu",
  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: "bubbleMenu",
      updateDelay: void 0,
      shouldShow: null
    };
  },
  addProseMirrorPlugins() {
    return this.options.element ? [
      $0({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        updateDelay: this.options.updateDelay,
        shouldShow: this.options.shouldShow
      })
    ] : [];
  }
});
class WI {
  constructor({ editor: e, element: t, view: r, tippyOptions: i = {}, shouldShow: s }) {
    this.preventHide = !1, this.shouldShow = ({ view: o, state: a }) => {
      const { selection: l } = a, { $anchor: c, empty: u } = l, f = c.depth === 1, d = c.parent.isTextblock && !c.parent.type.spec.code && !c.parent.textContent;
      return !(!o.hasFocus() || !u || !f || !d || !this.editor.isEditable);
    }, this.mousedownHandler = () => {
      this.preventHide = !0;
    }, this.focusHandler = () => {
      setTimeout(() => this.update(this.editor.view));
    }, this.blurHandler = ({ event: o }) => {
      var a;
      if (this.preventHide) {
        this.preventHide = !1;
        return;
      }
      o != null && o.relatedTarget && (!((a = this.element.parentNode) === null || a === void 0) && a.contains(o.relatedTarget)) || (o == null ? void 0 : o.relatedTarget) !== this.editor.view.dom && this.hide();
    }, this.tippyBlurHandler = (o) => {
      this.blurHandler({ event: o });
    }, this.editor = e, this.element = t, this.view = r, s && (this.shouldShow = s), this.element.addEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.editor.on("focus", this.focusHandler), this.editor.on("blur", this.blurHandler), this.tippyOptions = i, this.element.remove(), this.element.style.visibility = "visible";
  }
  createTooltip() {
    const { element: e } = this.editor.options, t = !!e.parentElement;
    this.tippy || !t || (this.tippy = Ss(e, {
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: !0,
      trigger: "manual",
      placement: "right",
      hideOnClick: "toggle",
      ...this.tippyOptions
    }), this.tippy.popper.firstChild && this.tippy.popper.firstChild.addEventListener("blur", this.tippyBlurHandler));
  }
  update(e, t) {
    var r, i, s;
    const { state: o } = e, { doc: a, selection: l } = o, { from: c, to: u } = l;
    if (t && t.doc.eq(a) && t.selection.eq(l))
      return;
    if (this.createTooltip(), !((r = this.shouldShow) === null || r === void 0 ? void 0 : r.call(this, {
      editor: this.editor,
      view: e,
      state: o,
      oldState: t
    }))) {
      this.hide();
      return;
    }
    (i = this.tippy) === null || i === void 0 || i.setProps({
      getReferenceClientRect: ((s = this.tippyOptions) === null || s === void 0 ? void 0 : s.getReferenceClientRect) || (() => b0(e, c, u))
    }), this.show();
  }
  show() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.show();
  }
  hide() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.hide();
  }
  destroy() {
    var e, t;
    !((e = this.tippy) === null || e === void 0) && e.popper.firstChild && this.tippy.popper.firstChild.removeEventListener("blur", this.tippyBlurHandler), (t = this.tippy) === null || t === void 0 || t.destroy(), this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.editor.off("focus", this.focusHandler), this.editor.off("blur", this.blurHandler);
  }
}
const B0 = (n) => new bt({
  key: typeof n.pluginKey == "string" ? new un(n.pluginKey) : n.pluginKey,
  view: (e) => new WI({ view: e, ...n })
});
dt.create({
  name: "floatingMenu",
  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: "floatingMenu",
      shouldShow: null
    };
  },
  addProseMirrorPlugins() {
    return this.options.element ? [
      B0({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        shouldShow: this.options.shouldShow
      })
    ] : [];
  }
});
const UI = he({
  name: "BubbleMenu",
  props: {
    pluginKey: {
      type: [String, Object],
      default: "bubbleMenu"
    },
    editor: {
      type: Object,
      required: !0
    },
    updateDelay: {
      type: Number,
      default: void 0
    },
    tippyOptions: {
      type: Object,
      default: () => ({})
    },
    shouldShow: {
      type: Function,
      default: null
    }
  },
  setup(n, { slots: e }) {
    const t = qe(null);
    return _i(() => {
      const { updateDelay: r, editor: i, pluginKey: s, shouldShow: o, tippyOptions: a } = n;
      i.registerPlugin($0({
        updateDelay: r,
        editor: i,
        element: t.value,
        pluginKey: s,
        shouldShow: o,
        tippyOptions: a
      }));
    }), Ao(() => {
      const { pluginKey: r, editor: i } = n;
      i.unregisterPlugin(r);
    }), () => {
      var r;
      return rr("div", { ref: t }, (r = e.default) === null || r === void 0 ? void 0 : r.call(e));
    };
  }
});
function dm(n) {
  return xb((e, t) => ({
    get() {
      return e(), n;
    },
    set(r) {
      n = r, requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          t();
        });
      });
    }
  }));
}
class KI extends hP {
  constructor(e = {}) {
    return super(e), this.contentComponent = null, this.appContext = null, this.reactiveState = dm(this.view.state), this.reactiveExtensionStorage = dm(this.extensionStorage), this.on("beforeTransaction", ({ nextState: t }) => {
      this.reactiveState.value = t, this.reactiveExtensionStorage.value = this.extensionStorage;
    }), Sb(this);
  }
  get state() {
    return this.reactiveState ? this.reactiveState.value : this.view.state;
  }
  get storage() {
    return this.reactiveExtensionStorage ? this.reactiveExtensionStorage.value : super.storage;
  }
  /**
   * Register a ProseMirror plugin.
   */
  registerPlugin(e, t) {
    const r = super.registerPlugin(e, t);
    return this.reactiveState && (this.reactiveState.value = r), r;
  }
  /**
   * Unregister a ProseMirror plugin.
   */
  unregisterPlugin(e) {
    const t = super.unregisterPlugin(e);
    return this.reactiveState && t && (this.reactiveState.value = t), t;
  }
}
const YI = he({
  name: "EditorContent",
  props: {
    editor: {
      default: null,
      type: Object
    }
  },
  setup(n) {
    const e = qe(), t = Ci();
    return _b(() => {
      const r = n.editor;
      r && r.options.element && e.value && qm(() => {
        if (!e.value || !r.options.element.firstChild)
          return;
        const i = E(e.value);
        e.value.append(...r.options.element.childNodes), r.contentComponent = t.ctx._, t && (r.appContext = {
          ...t.appContext,
          // Vue internally uses prototype chain to forward/shadow injects across the entire component chain
          // so don't use object spread operator or 'Object.assign' and just set `provides` as is on editor's appContext
          // @ts-expect-error forward instance's 'provides' into appContext
          provides: t.provides
        }), r.setOptions({
          element: i
        }), r.createNodeViews();
      });
    }), Ao(() => {
      const r = n.editor;
      r && (r.contentComponent = null, r.appContext = null);
    }), { rootEl: e };
  },
  render() {
    return rr("div", {
      ref: (n) => {
        this.rootEl = n;
      }
    });
  }
});
he({
  name: "FloatingMenu",
  props: {
    pluginKey: {
      // TODO: TypeScript breaks :(
      // type: [String, Object as PropType<Exclude<FloatingMenuPluginProps['pluginKey'], string>>],
      type: null,
      default: "floatingMenu"
    },
    editor: {
      type: Object,
      required: !0
    },
    tippyOptions: {
      type: Object,
      default: () => ({})
    },
    shouldShow: {
      type: Function,
      default: null
    }
  },
  setup(n, { slots: e }) {
    const t = qe(null);
    return _i(() => {
      const { pluginKey: r, editor: i, tippyOptions: s, shouldShow: o } = n;
      i.registerPlugin(B0({
        pluginKey: r,
        editor: i,
        element: t.value,
        tippyOptions: s,
        shouldShow: o
      }));
    }), Ao(() => {
      const { pluginKey: r, editor: i } = n;
      i.unregisterPlugin(r);
    }), () => {
      var r;
      return rr("div", { ref: t }, (r = e.default) === null || r === void 0 ? void 0 : r.call(e));
    };
  }
});
he({
  name: "NodeViewContent",
  props: {
    as: {
      type: String,
      default: "div"
    }
  },
  render() {
    return rr(this.as, {
      style: {
        whiteSpace: "pre-wrap"
      },
      "data-node-view-content": ""
    });
  }
});
he({
  name: "NodeViewWrapper",
  props: {
    as: {
      type: String,
      default: "div"
    }
  },
  inject: ["onDragStart", "decorationClasses"],
  render() {
    var n, e;
    return rr(this.as, {
      // @ts-ignore
      class: this.decorationClasses,
      style: {
        whiteSpace: "normal"
      },
      "data-node-view-wrapper": "",
      // @ts-ignore (https://github.com/vuejs/vue-next/issues/3031)
      onDragstart: this.onDragStart
    }, (e = (n = this.$slots).default) === null || e === void 0 ? void 0 : e.call(n));
  }
});
const qI = (n = {}) => {
  const e = Xu();
  return _i(() => {
    e.value = new KI(n);
  }), Ao(() => {
    var t, r, i;
    const s = (t = e.value) === null || t === void 0 ? void 0 : t.options.element, o = s == null ? void 0 : s.cloneNode(!0);
    (r = s == null ? void 0 : s.parentNode) === null || r === void 0 || r.replaceChild(o, s), (i = e.value) === null || i === void 0 || i.destroy();
  }), e;
}, XI = /^\s*>\s$/, JI = Sn.create({
  name: "blockquote",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  group: "block",
  defining: !0,
  parseHTML() {
    return [
      { tag: "blockquote" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["blockquote", Mt(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setBlockquote: () => ({ commands: n }) => n.wrapIn(this.name),
      toggleBlockquote: () => ({ commands: n }) => n.toggleWrap(this.name),
      unsetBlockquote: () => ({ commands: n }) => n.lift(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-b": () => this.editor.commands.toggleBlockquote()
    };
  },
  addInputRules() {
    return [
      So({
        find: XI,
        type: this.type
      })
    ];
  }
}), QI = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/, ZI = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g, eD = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/, tD = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g, nD = Lr.create({
  name: "bold",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "strong"
      },
      {
        tag: "b",
        getAttrs: (n) => n.style.fontWeight !== "normal" && null
      },
      {
        style: "font-weight=400",
        clearMark: (n) => n.type.name === this.name
      },
      {
        style: "font-weight",
        getAttrs: (n) => /^(bold(er)?|[5-9]\d{2,})$/.test(n) && null
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["strong", Mt(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setBold: () => ({ commands: n }) => n.setMark(this.name),
      toggleBold: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetBold: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-b": () => this.editor.commands.toggleBold(),
      "Mod-B": () => this.editor.commands.toggleBold()
    };
  },
  addInputRules() {
    return [
      ss({
        find: QI,
        type: this.type
      }),
      ss({
        find: eD,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      as({
        find: ZI,
        type: this.type
      }),
      as({
        find: tD,
        type: this.type
      })
    ];
  }
}), rD = "listItem", hm = "textStyle", pm = /^\s*([-+*])\s$/, iD = Sn.create({
  name: "bulletList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [
      { tag: "ul" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["ul", Mt(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: n, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(rD, this.editor.getAttributes(hm)).run() : n.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-8": () => this.editor.commands.toggleBulletList()
    };
  },
  addInputRules() {
    let n = So({
      find: pm,
      type: this.type
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (n = So({
      find: pm,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: () => this.editor.getAttributes(hm),
      editor: this.editor
    })), [
      n
    ];
  }
}), sD = new RegExp("(?<!`)`([^`]+)`(?!`)"), oD = new RegExp("(?<!`)`([^`]+)`(?!`)", "g"), aD = Lr.create({
  name: "code",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  excludes: "_",
  code: !0,
  exitable: !0,
  parseHTML() {
    return [
      { tag: "code" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["code", Mt(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setCode: () => ({ commands: n }) => n.setMark(this.name),
      toggleCode: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetCode: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-e": () => this.editor.commands.toggleCode()
    };
  },
  addInputRules() {
    return [
      ss({
        find: sD,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      as({
        find: oD,
        type: this.type
      })
    ];
  }
}), lD = /^```([a-z]+)?[\s\n]$/, cD = /^~~~([a-z]+)?[\s\n]$/, uD = Sn.create({
  name: "codeBlock",
  addOptions() {
    return {
      languageClassPrefix: "language-",
      exitOnTripleEnter: !0,
      exitOnArrowDown: !0,
      defaultLanguage: null,
      HTMLAttributes: {}
    };
  },
  content: "text*",
  marks: "",
  group: "block",
  code: !0,
  defining: !0,
  addAttributes() {
    return {
      language: {
        default: this.options.defaultLanguage,
        parseHTML: (n) => {
          var e;
          const { languageClassPrefix: t } = this.options, s = [...((e = n.firstElementChild) === null || e === void 0 ? void 0 : e.classList) || []].filter((o) => o.startsWith(t)).map((o) => o.replace(t, ""))[0];
          return s || null;
        },
        rendered: !1
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "pre",
        preserveWhitespace: "full"
      }
    ];
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    return [
      "pre",
      Mt(this.options.HTMLAttributes, e),
      [
        "code",
        {
          class: n.attrs.language ? this.options.languageClassPrefix + n.attrs.language : null
        },
        0
      ]
    ];
  },
  addCommands() {
    return {
      setCodeBlock: (n) => ({ commands: e }) => e.setNode(this.name, n),
      toggleCodeBlock: (n) => ({ commands: e }) => e.toggleNode(this.name, "paragraph", n)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-c": () => this.editor.commands.toggleCodeBlock(),
      // remove code block when at start of document or code block is empty
      Backspace: () => {
        const { empty: n, $anchor: e } = this.editor.state.selection, t = e.pos === 1;
        return !n || e.parent.type.name !== this.name ? !1 : t || !e.parent.textContent.length ? this.editor.commands.clearNodes() : !1;
      },
      // exit node on triple enter
      Enter: ({ editor: n }) => {
        if (!this.options.exitOnTripleEnter)
          return !1;
        const { state: e } = n, { selection: t } = e, { $from: r, empty: i } = t;
        if (!i || r.parent.type !== this.type)
          return !1;
        const s = r.parentOffset === r.parent.nodeSize - 2, o = r.parent.textContent.endsWith(`

`);
        return !s || !o ? !1 : n.chain().command(({ tr: a }) => (a.delete(r.pos - 2, r.pos), !0)).exitCode().run();
      },
      // exit node on arrow down
      ArrowDown: ({ editor: n }) => {
        if (!this.options.exitOnArrowDown)
          return !1;
        const { state: e } = n, { selection: t, doc: r } = e, { $from: i, empty: s } = t;
        if (!s || i.parent.type !== this.type || !(i.parentOffset === i.parent.nodeSize - 2))
          return !1;
        const a = i.after();
        return a === void 0 ? !1 : r.nodeAt(a) ? n.commands.command(({ tr: c }) => (c.setSelection(ce.near(r.resolve(a))), !0)) : n.commands.exitCode();
      }
    };
  },
  addInputRules() {
    return [
      Ru({
        find: lD,
        type: this.type,
        getAttributes: (n) => ({
          language: n[1]
        })
      }),
      Ru({
        find: cD,
        type: this.type,
        getAttributes: (n) => ({
          language: n[1]
        })
      })
    ];
  },
  addProseMirrorPlugins() {
    return [
      // this plugin creates a code block for pasted content from VS Code
      // we can also detect the copied code language
      new bt({
        key: new un("codeBlockVSCodeHandler"),
        props: {
          handlePaste: (n, e) => {
            if (!e.clipboardData || this.editor.isActive(this.type.name))
              return !1;
            const t = e.clipboardData.getData("text/plain"), r = e.clipboardData.getData("vscode-editor-data"), i = r ? JSON.parse(r) : void 0, s = i == null ? void 0 : i.mode;
            if (!t || !s)
              return !1;
            const { tr: o, schema: a } = n.state, l = a.text(t.replace(/\r\n?/g, `
`));
            return o.replaceSelectionWith(this.type.create({ language: s }, l)), o.selection.$from.parent.type !== this.type && o.setSelection(le.near(o.doc.resolve(Math.max(0, o.selection.from - 2)))), o.setMeta("paste", !0), n.dispatch(o), !0;
          }
        }
      })
    ];
  }
}), fD = Sn.create({
  name: "doc",
  topNode: !0,
  content: "block+"
});
function dD(n = {}) {
  return new bt({
    view(e) {
      return new hD(e, n);
    }
  });
}
class hD {
  constructor(e, t) {
    var r;
    this.editorView = e, this.cursorPos = null, this.element = null, this.timeout = -1, this.width = (r = t.width) !== null && r !== void 0 ? r : 1, this.color = t.color === !1 ? void 0 : t.color || "black", this.class = t.class, this.handlers = ["dragover", "dragend", "drop", "dragleave"].map((i) => {
      let s = (o) => {
        this[i](o);
      };
      return e.dom.addEventListener(i, s), { name: i, handler: s };
    });
  }
  destroy() {
    this.handlers.forEach(({ name: e, handler: t }) => this.editorView.dom.removeEventListener(e, t));
  }
  update(e, t) {
    this.cursorPos != null && t.doc != e.state.doc && (this.cursorPos > e.state.doc.content.size ? this.setCursor(null) : this.updateOverlay());
  }
  setCursor(e) {
    e != this.cursorPos && (this.cursorPos = e, e == null ? (this.element.parentNode.removeChild(this.element), this.element = null) : this.updateOverlay());
  }
  updateOverlay() {
    let e = this.editorView.state.doc.resolve(this.cursorPos), t = !e.parent.inlineContent, r;
    if (t) {
      let a = e.nodeBefore, l = e.nodeAfter;
      if (a || l) {
        let c = this.editorView.nodeDOM(this.cursorPos - (a ? a.nodeSize : 0));
        if (c) {
          let u = c.getBoundingClientRect(), f = a ? u.bottom : u.top;
          a && l && (f = (f + this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top) / 2), r = { left: u.left, right: u.right, top: f - this.width / 2, bottom: f + this.width / 2 };
        }
      }
    }
    if (!r) {
      let a = this.editorView.coordsAtPos(this.cursorPos);
      r = { left: a.left - this.width / 2, right: a.left + this.width / 2, top: a.top, bottom: a.bottom };
    }
    let i = this.editorView.dom.offsetParent;
    this.element || (this.element = i.appendChild(document.createElement("div")), this.class && (this.element.className = this.class), this.element.style.cssText = "position: absolute; z-index: 50; pointer-events: none;", this.color && (this.element.style.backgroundColor = this.color)), this.element.classList.toggle("prosemirror-dropcursor-block", t), this.element.classList.toggle("prosemirror-dropcursor-inline", !t);
    let s, o;
    if (!i || i == document.body && getComputedStyle(i).position == "static")
      s = -pageXOffset, o = -pageYOffset;
    else {
      let a = i.getBoundingClientRect();
      s = a.left - i.scrollLeft, o = a.top - i.scrollTop;
    }
    this.element.style.left = r.left - s + "px", this.element.style.top = r.top - o + "px", this.element.style.width = r.right - r.left + "px", this.element.style.height = r.bottom - r.top + "px";
  }
  scheduleRemoval(e) {
    clearTimeout(this.timeout), this.timeout = setTimeout(() => this.setCursor(null), e);
  }
  dragover(e) {
    if (!this.editorView.editable)
      return;
    let t = this.editorView.posAtCoords({ left: e.clientX, top: e.clientY }), r = t && t.inside >= 0 && this.editorView.state.doc.nodeAt(t.inside), i = r && r.type.spec.disableDropCursor, s = typeof i == "function" ? i(this.editorView, t, e) : i;
    if (t && !s) {
      let o = t.pos;
      if (this.editorView.dragging && this.editorView.dragging.slice) {
        let a = pv(this.editorView.state.doc, o, this.editorView.dragging.slice);
        a != null && (o = a);
      }
      this.setCursor(o), this.scheduleRemoval(5e3);
    }
  }
  dragend() {
    this.scheduleRemoval(20);
  }
  drop() {
    this.scheduleRemoval(20);
  }
  dragleave(e) {
    (e.target == this.editorView.dom || !this.editorView.dom.contains(e.relatedTarget)) && this.setCursor(null);
  }
}
const pD = dt.create({
  name: "dropCursor",
  addOptions() {
    return {
      color: "currentColor",
      width: 1,
      class: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      dD(this.options)
    ];
  }
});
class We extends ce {
  /**
  Create a gap cursor.
  */
  constructor(e) {
    super(e, e);
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    return We.valid(r) ? new We(r) : ce.near(r);
  }
  content() {
    return G.empty;
  }
  eq(e) {
    return e instanceof We && e.head == this.head;
  }
  toJSON() {
    return { type: "gapcursor", pos: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for GapCursor.fromJSON");
    return new We(e.resolve(t.pos));
  }
  /**
  @internal
  */
  getBookmark() {
    return new ud(this.anchor);
  }
  /**
  @internal
  */
  static valid(e) {
    let t = e.parent;
    if (t.isTextblock || !mD(e) || !gD(e))
      return !1;
    let r = t.type.spec.allowGapCursor;
    if (r != null)
      return r;
    let i = t.contentMatchAt(e.index()).defaultType;
    return i && i.isTextblock;
  }
  /**
  @internal
  */
  static findGapCursorFrom(e, t, r = !1) {
    e: for (; ; ) {
      if (!r && We.valid(e))
        return e;
      let i = e.pos, s = null;
      for (let o = e.depth; ; o--) {
        let a = e.node(o);
        if (t > 0 ? e.indexAfter(o) < a.childCount : e.index(o) > 0) {
          s = a.child(t > 0 ? e.indexAfter(o) : e.index(o) - 1);
          break;
        } else if (o == 0)
          return null;
        i += t;
        let l = e.doc.resolve(i);
        if (We.valid(l))
          return l;
      }
      for (; ; ) {
        let o = t > 0 ? s.firstChild : s.lastChild;
        if (!o) {
          if (s.isAtom && !s.isText && !te.isSelectable(s)) {
            e = e.doc.resolve(i + s.nodeSize * t), r = !1;
            continue e;
          }
          break;
        }
        s = o, i += t;
        let a = e.doc.resolve(i);
        if (We.valid(a))
          return a;
      }
      return null;
    }
  }
}
We.prototype.visible = !1;
We.findFrom = We.findGapCursorFrom;
ce.jsonID("gapcursor", We);
class ud {
  constructor(e) {
    this.pos = e;
  }
  map(e) {
    return new ud(e.map(this.pos));
  }
  resolve(e) {
    let t = e.resolve(this.pos);
    return We.valid(t) ? new We(t) : ce.near(t);
  }
}
function mD(n) {
  for (let e = n.depth; e >= 0; e--) {
    let t = n.index(e), r = n.node(e);
    if (t == 0) {
      if (r.type.spec.isolating)
        return !0;
      continue;
    }
    for (let i = r.child(t - 1); ; i = i.lastChild) {
      if (i.childCount == 0 && !i.inlineContent || i.isAtom || i.type.spec.isolating)
        return !0;
      if (i.inlineContent)
        return !1;
    }
  }
  return !0;
}
function gD(n) {
  for (let e = n.depth; e >= 0; e--) {
    let t = n.indexAfter(e), r = n.node(e);
    if (t == r.childCount) {
      if (r.type.spec.isolating)
        return !0;
      continue;
    }
    for (let i = r.child(t); ; i = i.firstChild) {
      if (i.childCount == 0 && !i.inlineContent || i.isAtom || i.type.spec.isolating)
        return !0;
      if (i.inlineContent)
        return !1;
    }
  }
  return !0;
}
function yD() {
  return new bt({
    props: {
      decorations: CD,
      createSelectionBetween(n, e, t) {
        return e.pos == t.pos && We.valid(t) ? new We(t) : null;
      },
      handleClick: bD,
      handleKeyDown: vD,
      handleDOMEvents: { beforeinput: wD }
    }
  });
}
const vD = t0({
  ArrowLeft: ya("horiz", -1),
  ArrowRight: ya("horiz", 1),
  ArrowUp: ya("vert", -1),
  ArrowDown: ya("vert", 1)
});
function ya(n, e) {
  const t = n == "vert" ? e > 0 ? "down" : "up" : e > 0 ? "right" : "left";
  return function(r, i, s) {
    let o = r.selection, a = e > 0 ? o.$to : o.$from, l = o.empty;
    if (o instanceof le) {
      if (!s.endOfTextblock(t) || a.depth == 0)
        return !1;
      l = !1, a = r.doc.resolve(e > 0 ? a.after() : a.before());
    }
    let c = We.findGapCursorFrom(a, e, l);
    return c ? (i && i(r.tr.setSelection(new We(c))), !0) : !1;
  };
}
function bD(n, e, t) {
  if (!n || !n.editable)
    return !1;
  let r = n.state.doc.resolve(e);
  if (!We.valid(r))
    return !1;
  let i = n.posAtCoords({ left: t.clientX, top: t.clientY });
  return i && i.inside > -1 && te.isSelectable(n.state.doc.nodeAt(i.inside)) ? !1 : (n.dispatch(n.state.tr.setSelection(new We(r))), !0);
}
function wD(n, e) {
  if (e.inputType != "insertCompositionText" || !(n.state.selection instanceof We))
    return !1;
  let { $from: t } = n.state.selection, r = t.parent.contentMatchAt(t.index()).findWrapping(n.state.schema.nodes.text);
  if (!r)
    return !1;
  let i = R.empty;
  for (let o = r.length - 1; o >= 0; o--)
    i = R.from(r[o].createAndFill(null, i));
  let s = n.state.tr.replace(t.pos, t.pos, new G(i, 0, 0));
  return s.setSelection(le.near(s.doc.resolve(t.pos + 1))), n.dispatch(s), !1;
}
function CD(n) {
  if (!(n.selection instanceof We))
    return null;
  let e = document.createElement("div");
  return e.className = "ProseMirror-gapcursor", nt.create(n.doc, [tn.widget(n.selection.head, e, { key: "gapcursor" })]);
}
const _D = dt.create({
  name: "gapCursor",
  addProseMirrorPlugins() {
    return [
      yD()
    ];
  },
  extendNodeSchema(n) {
    var e;
    const t = {
      name: n.name,
      options: n.options,
      storage: n.storage
    };
    return {
      allowGapCursor: (e = fe(K(n, "allowGapCursor", t))) !== null && e !== void 0 ? e : null
    };
  }
}), SD = Sn.create({
  name: "hardBreak",
  addOptions() {
    return {
      keepMarks: !0,
      HTMLAttributes: {}
    };
  },
  inline: !0,
  group: "inline",
  selectable: !1,
  linebreakReplacement: !0,
  parseHTML() {
    return [
      { tag: "br" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["br", Mt(this.options.HTMLAttributes, n)];
  },
  renderText() {
    return `
`;
  },
  addCommands() {
    return {
      setHardBreak: () => ({ commands: n, chain: e, state: t, editor: r }) => n.first([
        () => n.exitCode(),
        () => n.command(() => {
          const { selection: i, storedMarks: s } = t;
          if (i.$from.parent.type.spec.isolating)
            return !1;
          const { keepMarks: o } = this.options, { splittableMarks: a } = r.extensionManager, l = s || i.$to.parentOffset && i.$from.marks();
          return e().insertContent({ type: this.name }).command(({ tr: c, dispatch: u }) => {
            if (u && l && o) {
              const f = l.filter((d) => a.includes(d.type.name));
              c.ensureMarks(f);
            }
            return !0;
          }).run();
        })
      ])
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Enter": () => this.editor.commands.setHardBreak(),
      "Shift-Enter": () => this.editor.commands.setHardBreak()
    };
  }
}), xD = Sn.create({
  name: "heading",
  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {}
    };
  },
  content: "inline*",
  group: "block",
  defining: !0,
  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: !1
      }
    };
  },
  parseHTML() {
    return this.options.levels.map((n) => ({
      tag: `h${n}`,
      attrs: { level: n }
    }));
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    return [`h${this.options.levels.includes(n.attrs.level) ? n.attrs.level : this.options.levels[0]}`, Mt(this.options.HTMLAttributes, e), 0];
  },
  addCommands() {
    return {
      setHeading: (n) => ({ commands: e }) => this.options.levels.includes(n.level) ? e.setNode(this.name, n) : !1,
      toggleHeading: (n) => ({ commands: e }) => this.options.levels.includes(n.level) ? e.toggleNode(this.name, "paragraph", n) : !1
    };
  },
  addKeyboardShortcuts() {
    return this.options.levels.reduce((n, e) => ({
      ...n,
      [`Mod-Alt-${e}`]: () => this.editor.commands.toggleHeading({ level: e })
    }), {});
  },
  addInputRules() {
    return this.options.levels.map((n) => Ru({
      find: new RegExp(`^(#{1,${n}})\\s$`),
      type: this.type,
      getAttributes: {
        level: n
      }
    }));
  }
});
var rl = 200, ot = function() {
};
ot.prototype.append = function(e) {
  return e.length ? (e = ot.from(e), !this.length && e || e.length < rl && this.leafAppend(e) || this.length < rl && e.leafPrepend(this) || this.appendInner(e)) : this;
};
ot.prototype.prepend = function(e) {
  return e.length ? ot.from(e).append(this) : this;
};
ot.prototype.appendInner = function(e) {
  return new kD(this, e);
};
ot.prototype.slice = function(e, t) {
  return e === void 0 && (e = 0), t === void 0 && (t = this.length), e >= t ? ot.empty : this.sliceInner(Math.max(0, e), Math.min(this.length, t));
};
ot.prototype.get = function(e) {
  if (!(e < 0 || e >= this.length))
    return this.getInner(e);
};
ot.prototype.forEach = function(e, t, r) {
  t === void 0 && (t = 0), r === void 0 && (r = this.length), t <= r ? this.forEachInner(e, t, r, 0) : this.forEachInvertedInner(e, t, r, 0);
};
ot.prototype.map = function(e, t, r) {
  t === void 0 && (t = 0), r === void 0 && (r = this.length);
  var i = [];
  return this.forEach(function(s, o) {
    return i.push(e(s, o));
  }, t, r), i;
};
ot.from = function(e) {
  return e instanceof ot ? e : e && e.length ? new j0(e) : ot.empty;
};
var j0 = /* @__PURE__ */ function(n) {
  function e(r) {
    n.call(this), this.values = r;
  }
  n && (e.__proto__ = n), e.prototype = Object.create(n && n.prototype), e.prototype.constructor = e;
  var t = { length: { configurable: !0 }, depth: { configurable: !0 } };
  return e.prototype.flatten = function() {
    return this.values;
  }, e.prototype.sliceInner = function(i, s) {
    return i == 0 && s == this.length ? this : new e(this.values.slice(i, s));
  }, e.prototype.getInner = function(i) {
    return this.values[i];
  }, e.prototype.forEachInner = function(i, s, o, a) {
    for (var l = s; l < o; l++)
      if (i(this.values[l], a + l) === !1)
        return !1;
  }, e.prototype.forEachInvertedInner = function(i, s, o, a) {
    for (var l = s - 1; l >= o; l--)
      if (i(this.values[l], a + l) === !1)
        return !1;
  }, e.prototype.leafAppend = function(i) {
    if (this.length + i.length <= rl)
      return new e(this.values.concat(i.flatten()));
  }, e.prototype.leafPrepend = function(i) {
    if (this.length + i.length <= rl)
      return new e(i.flatten().concat(this.values));
  }, t.length.get = function() {
    return this.values.length;
  }, t.depth.get = function() {
    return 0;
  }, Object.defineProperties(e.prototype, t), e;
}(ot);
ot.empty = new j0([]);
var kD = /* @__PURE__ */ function(n) {
  function e(t, r) {
    n.call(this), this.left = t, this.right = r, this.length = t.length + r.length, this.depth = Math.max(t.depth, r.depth) + 1;
  }
  return n && (e.__proto__ = n), e.prototype = Object.create(n && n.prototype), e.prototype.constructor = e, e.prototype.flatten = function() {
    return this.left.flatten().concat(this.right.flatten());
  }, e.prototype.getInner = function(r) {
    return r < this.left.length ? this.left.get(r) : this.right.get(r - this.left.length);
  }, e.prototype.forEachInner = function(r, i, s, o) {
    var a = this.left.length;
    if (i < a && this.left.forEachInner(r, i, Math.min(s, a), o) === !1 || s > a && this.right.forEachInner(r, Math.max(i - a, 0), Math.min(this.length, s) - a, o + a) === !1)
      return !1;
  }, e.prototype.forEachInvertedInner = function(r, i, s, o) {
    var a = this.left.length;
    if (i > a && this.right.forEachInvertedInner(r, i - a, Math.max(s, a) - a, o + a) === !1 || s < a && this.left.forEachInvertedInner(r, Math.min(i, a), s, o) === !1)
      return !1;
  }, e.prototype.sliceInner = function(r, i) {
    if (r == 0 && i == this.length)
      return this;
    var s = this.left.length;
    return i <= s ? this.left.slice(r, i) : r >= s ? this.right.slice(r - s, i - s) : this.left.slice(r, s).append(this.right.slice(0, i - s));
  }, e.prototype.leafAppend = function(r) {
    var i = this.right.leafAppend(r);
    if (i)
      return new e(this.left, i);
  }, e.prototype.leafPrepend = function(r) {
    var i = this.left.leafPrepend(r);
    if (i)
      return new e(i, this.right);
  }, e.prototype.appendInner = function(r) {
    return this.left.depth >= Math.max(this.right.depth, r.depth) + 1 ? new e(this.left, new e(this.right, r)) : new e(this, r);
  }, e;
}(ot);
const TD = 500;
class mn {
  constructor(e, t) {
    this.items = e, this.eventCount = t;
  }
  // Pop the latest event off the branch's history and apply it
  // to a document transform.
  popEvent(e, t) {
    if (this.eventCount == 0)
      return null;
    let r = this.items.length;
    for (; ; r--)
      if (this.items.get(r - 1).selection) {
        --r;
        break;
      }
    let i, s;
    t && (i = this.remapping(r, this.items.length), s = i.maps.length);
    let o = e.tr, a, l, c = [], u = [];
    return this.items.forEach((f, d) => {
      if (!f.step) {
        i || (i = this.remapping(r, d + 1), s = i.maps.length), s--, u.push(f);
        return;
      }
      if (i) {
        u.push(new On(f.map));
        let p = f.step.map(i.slice(s)), h;
        p && o.maybeStep(p).doc && (h = o.mapping.maps[o.mapping.maps.length - 1], c.push(new On(h, void 0, void 0, c.length + u.length))), s--, h && i.appendMap(h, s);
      } else
        o.maybeStep(f.step);
      if (f.selection)
        return a = i ? f.selection.map(i.slice(s)) : f.selection, l = new mn(this.items.slice(0, r).append(u.reverse().concat(c)), this.eventCount - 1), !1;
    }, this.items.length, 0), { remaining: l, transform: o, selection: a };
  }
  // Create a new branch with the given transform added.
  addTransform(e, t, r, i) {
    let s = [], o = this.eventCount, a = this.items, l = !i && a.length ? a.get(a.length - 1) : null;
    for (let u = 0; u < e.steps.length; u++) {
      let f = e.steps[u].invert(e.docs[u]), d = new On(e.mapping.maps[u], f, t), p;
      (p = l && l.merge(d)) && (d = p, u ? s.pop() : a = a.slice(0, a.length - 1)), s.push(d), t && (o++, t = void 0), i || (l = d);
    }
    let c = o - r.depth;
    return c > ED && (a = OD(a, c), o -= c), new mn(a.append(s), o);
  }
  remapping(e, t) {
    let r = new Yi();
    return this.items.forEach((i, s) => {
      let o = i.mirrorOffset != null && s - i.mirrorOffset >= e ? r.maps.length - i.mirrorOffset : void 0;
      r.appendMap(i.map, o);
    }, e, t), r;
  }
  addMaps(e) {
    return this.eventCount == 0 ? this : new mn(this.items.append(e.map((t) => new On(t))), this.eventCount);
  }
  // When the collab module receives remote changes, the history has
  // to know about those, so that it can adjust the steps that were
  // rebased on top of the remote changes, and include the position
  // maps for the remote changes in its array of items.
  rebased(e, t) {
    if (!this.eventCount)
      return this;
    let r = [], i = Math.max(0, this.items.length - t), s = e.mapping, o = e.steps.length, a = this.eventCount;
    this.items.forEach((d) => {
      d.selection && a--;
    }, i);
    let l = t;
    this.items.forEach((d) => {
      let p = s.getMirror(--l);
      if (p == null)
        return;
      o = Math.min(o, p);
      let h = s.maps[p];
      if (d.step) {
        let m = e.steps[p].invert(e.docs[p]), g = d.selection && d.selection.map(s.slice(l + 1, p));
        g && a++, r.push(new On(h, m, g));
      } else
        r.push(new On(h));
    }, i);
    let c = [];
    for (let d = t; d < o; d++)
      c.push(new On(s.maps[d]));
    let u = this.items.slice(0, i).append(c).append(r), f = new mn(u, a);
    return f.emptyItemCount() > TD && (f = f.compress(this.items.length - r.length)), f;
  }
  emptyItemCount() {
    let e = 0;
    return this.items.forEach((t) => {
      t.step || e++;
    }), e;
  }
  // Compressing a branch means rewriting it to push the air (map-only
  // items) out. During collaboration, these naturally accumulate
  // because each remote change adds one. The `upto` argument is used
  // to ensure that only the items below a given level are compressed,
  // because `rebased` relies on a clean, untouched set of items in
  // order to associate old items with rebased steps.
  compress(e = this.items.length) {
    let t = this.remapping(0, e), r = t.maps.length, i = [], s = 0;
    return this.items.forEach((o, a) => {
      if (a >= e)
        i.push(o), o.selection && s++;
      else if (o.step) {
        let l = o.step.map(t.slice(r)), c = l && l.getMap();
        if (r--, c && t.appendMap(c, r), l) {
          let u = o.selection && o.selection.map(t.slice(r));
          u && s++;
          let f = new On(c.invert(), l, u), d, p = i.length - 1;
          (d = i.length && i[p].merge(f)) ? i[p] = d : i.push(f);
        }
      } else o.map && r--;
    }, this.items.length, 0), new mn(ot.from(i.reverse()), s);
  }
}
mn.empty = new mn(ot.empty, 0);
function OD(n, e) {
  let t;
  return n.forEach((r, i) => {
    if (r.selection && e-- == 0)
      return t = i, !1;
  }), n.slice(t);
}
class On {
  constructor(e, t, r, i) {
    this.map = e, this.step = t, this.selection = r, this.mirrorOffset = i;
  }
  merge(e) {
    if (this.step && e.step && !e.selection) {
      let t = e.step.merge(this.step);
      if (t)
        return new On(t.getMap().invert(), t, this.selection);
    }
  }
}
class pr {
  constructor(e, t, r, i, s) {
    this.done = e, this.undone = t, this.prevRanges = r, this.prevTime = i, this.prevComposition = s;
  }
}
const ED = 20;
function MD(n, e, t, r) {
  let i = t.getMeta(hi), s;
  if (i)
    return i.historyState;
  t.getMeta(PD) && (n = new pr(n.done, n.undone, null, 0, -1));
  let o = t.getMeta("appendedTransaction");
  if (t.steps.length == 0)
    return n;
  if (o && o.getMeta(hi))
    return o.getMeta(hi).redo ? new pr(n.done.addTransform(t, void 0, r, Pa(e)), n.undone, mm(t.mapping.maps), n.prevTime, n.prevComposition) : new pr(n.done, n.undone.addTransform(t, void 0, r, Pa(e)), null, n.prevTime, n.prevComposition);
  if (t.getMeta("addToHistory") !== !1 && !(o && o.getMeta("addToHistory") === !1)) {
    let a = t.getMeta("composition"), l = n.prevTime == 0 || !o && n.prevComposition != a && (n.prevTime < (t.time || 0) - r.newGroupDelay || !AD(t, n.prevRanges)), c = o ? Lc(n.prevRanges, t.mapping) : mm(t.mapping.maps);
    return new pr(n.done.addTransform(t, l ? e.selection.getBookmark() : void 0, r, Pa(e)), mn.empty, c, t.time, a ?? n.prevComposition);
  } else return (s = t.getMeta("rebased")) ? new pr(n.done.rebased(t, s), n.undone.rebased(t, s), Lc(n.prevRanges, t.mapping), n.prevTime, n.prevComposition) : new pr(n.done.addMaps(t.mapping.maps), n.undone.addMaps(t.mapping.maps), Lc(n.prevRanges, t.mapping), n.prevTime, n.prevComposition);
}
function AD(n, e) {
  if (!e)
    return !1;
  if (!n.docChanged)
    return !0;
  let t = !1;
  return n.mapping.maps[0].forEach((r, i) => {
    for (let s = 0; s < e.length; s += 2)
      r <= e[s + 1] && i >= e[s] && (t = !0);
  }), t;
}
function mm(n) {
  let e = [];
  for (let t = n.length - 1; t >= 0 && e.length == 0; t--)
    n[t].forEach((r, i, s, o) => e.push(s, o));
  return e;
}
function Lc(n, e) {
  if (!n)
    return null;
  let t = [];
  for (let r = 0; r < n.length; r += 2) {
    let i = e.map(n[r], 1), s = e.map(n[r + 1], -1);
    i <= s && t.push(i, s);
  }
  return t;
}
function ND(n, e, t) {
  let r = Pa(e), i = hi.get(e).spec.config, s = (t ? n.undone : n.done).popEvent(e, r);
  if (!s)
    return null;
  let o = s.selection.resolve(s.transform.doc), a = (t ? n.done : n.undone).addTransform(s.transform, e.selection.getBookmark(), i, r), l = new pr(t ? a : s.remaining, t ? s.remaining : a, null, 0, -1);
  return s.transform.setSelection(o).setMeta(hi, { redo: t, historyState: l });
}
let Rc = !1, gm = null;
function Pa(n) {
  let e = n.plugins;
  if (gm != e) {
    Rc = !1, gm = e;
    for (let t = 0; t < e.length; t++)
      if (e[t].spec.historyPreserveItems) {
        Rc = !0;
        break;
      }
  }
  return Rc;
}
const hi = new un("history"), PD = new un("closeHistory");
function ID(n = {}) {
  return n = {
    depth: n.depth || 100,
    newGroupDelay: n.newGroupDelay || 500
  }, new bt({
    key: hi,
    state: {
      init() {
        return new pr(mn.empty, mn.empty, null, 0, -1);
      },
      apply(e, t, r) {
        return MD(t, r, e, n);
      }
    },
    config: n,
    props: {
      handleDOMEvents: {
        beforeinput(e, t) {
          let r = t.inputType, i = r == "historyUndo" ? z0 : r == "historyRedo" ? H0 : null;
          return i ? (t.preventDefault(), i(e.state, e.dispatch)) : !1;
        }
      }
    }
  });
}
function V0(n, e) {
  return (t, r) => {
    let i = hi.getState(t);
    if (!i || (n ? i.undone : i.done).eventCount == 0)
      return !1;
    if (r) {
      let s = ND(i, t, n);
      s && r(e ? s.scrollIntoView() : s);
    }
    return !0;
  };
}
const z0 = V0(!1, !0), H0 = V0(!0, !0), DD = dt.create({
  name: "history",
  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500
    };
  },
  addCommands() {
    return {
      undo: () => ({ state: n, dispatch: e }) => z0(n, e),
      redo: () => ({ state: n, dispatch: e }) => H0(n, e)
    };
  },
  addProseMirrorPlugins() {
    return [
      ID(this.options)
    ];
  },
  addKeyboardShortcuts() {
    return {
      "Mod-z": () => this.editor.commands.undo(),
      "Shift-Mod-z": () => this.editor.commands.redo(),
      "Mod-y": () => this.editor.commands.redo(),
      // Russian keyboard layouts
      "Mod-я": () => this.editor.commands.undo(),
      "Shift-Mod-я": () => this.editor.commands.redo()
    };
  }
}), LD = Sn.create({
  name: "horizontalRule",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  parseHTML() {
    return [{ tag: "hr" }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["hr", Mt(this.options.HTMLAttributes, n)];
  },
  addCommands() {
    return {
      setHorizontalRule: () => ({ chain: n, state: e }) => {
        const { selection: t } = e, { $from: r, $to: i } = t, s = n();
        return r.parentOffset === 0 ? s.insertContentAt({
          from: Math.max(r.pos - 1, 0),
          to: i.pos
        }, {
          type: this.name
        }) : v0(t) ? s.insertContentAt(i.pos, {
          type: this.name
        }) : s.insertContent({ type: this.name }), s.command(({ tr: o, dispatch: a }) => {
          var l;
          if (a) {
            const { $to: c } = o.selection, u = c.end();
            if (c.nodeAfter)
              c.nodeAfter.isTextblock ? o.setSelection(le.create(o.doc, c.pos + 1)) : c.nodeAfter.isBlock ? o.setSelection(te.create(o.doc, c.pos)) : o.setSelection(le.create(o.doc, c.pos));
            else {
              const f = (l = c.parent.type.contentMatch.defaultType) === null || l === void 0 ? void 0 : l.create();
              f && (o.insert(u, f), o.setSelection(le.create(o.doc, u + 1)));
            }
            o.scrollIntoView();
          }
          return !0;
        }).run();
      }
    };
  },
  addInputRules() {
    return [
      pP({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type
      })
    ];
  }
}), RD = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/, FD = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g, $D = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/, BD = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g, jD = Lr.create({
  name: "italic",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "em"
      },
      {
        tag: "i",
        getAttrs: (n) => n.style.fontStyle !== "normal" && null
      },
      {
        style: "font-style=normal",
        clearMark: (n) => n.type.name === this.name
      },
      {
        style: "font-style=italic"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["em", Mt(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setItalic: () => ({ commands: n }) => n.setMark(this.name),
      toggleItalic: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetItalic: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-i": () => this.editor.commands.toggleItalic(),
      "Mod-I": () => this.editor.commands.toggleItalic()
    };
  },
  addInputRules() {
    return [
      ss({
        find: RD,
        type: this.type
      }),
      ss({
        find: $D,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      as({
        find: FD,
        type: this.type
      }),
      as({
        find: BD,
        type: this.type
      })
    ];
  }
}), VD = Sn.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: "bulletList",
      orderedListTypeName: "orderedList"
    };
  },
  content: "paragraph block*",
  defining: !0,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["li", Mt(this.options.HTMLAttributes, n), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), zD = "listItem", ym = "textStyle", vm = /^(\d+)\.\s$/, HD = Sn.create({
  name: "orderedList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  addAttributes() {
    return {
      start: {
        default: 1,
        parseHTML: (n) => n.hasAttribute("start") ? parseInt(n.getAttribute("start") || "", 10) : 1
      },
      type: {
        default: void 0,
        parseHTML: (n) => n.getAttribute("type")
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "ol"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    const { start: e, ...t } = n;
    return e === 1 ? ["ol", Mt(this.options.HTMLAttributes, t), 0] : ["ol", Mt(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: n, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(zD, this.editor.getAttributes(ym)).run() : n.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-7": () => this.editor.commands.toggleOrderedList()
    };
  },
  addInputRules() {
    let n = So({
      find: vm,
      type: this.type,
      getAttributes: (e) => ({ start: +e[1] }),
      joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1]
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (n = So({
      find: vm,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: (e) => ({ start: +e[1], ...this.editor.getAttributes(ym) }),
      joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1],
      editor: this.editor
    })), [
      n
    ];
  }
}), GD = Sn.create({
  name: "paragraph",
  priority: 1e3,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  content: "inline*",
  parseHTML() {
    return [
      { tag: "p" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["p", Mt(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setParagraph: () => ({ commands: n }) => n.setNode(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-0": () => this.editor.commands.setParagraph()
    };
  }
}), WD = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))$/, UD = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))/g, KD = Lr.create({
  name: "strike",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "s"
      },
      {
        tag: "del"
      },
      {
        tag: "strike"
      },
      {
        style: "text-decoration",
        consuming: !1,
        getAttrs: (n) => n.includes("line-through") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["s", Mt(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setStrike: () => ({ commands: n }) => n.setMark(this.name),
      toggleStrike: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetStrike: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-s": () => this.editor.commands.toggleStrike()
    };
  },
  addInputRules() {
    return [
      ss({
        find: WD,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      as({
        find: UD,
        type: this.type
      })
    ];
  }
}), YD = Sn.create({
  name: "text",
  group: "inline"
}), qD = dt.create({
  name: "starterKit",
  addExtensions() {
    var n, e, t, r, i, s, o, a, l, c, u, f, d, p, h, m, g, v;
    const w = [];
    return this.options.bold !== !1 && w.push(nD.configure((n = this.options) === null || n === void 0 ? void 0 : n.bold)), this.options.blockquote !== !1 && w.push(JI.configure((e = this.options) === null || e === void 0 ? void 0 : e.blockquote)), this.options.bulletList !== !1 && w.push(iD.configure((t = this.options) === null || t === void 0 ? void 0 : t.bulletList)), this.options.code !== !1 && w.push(aD.configure((r = this.options) === null || r === void 0 ? void 0 : r.code)), this.options.codeBlock !== !1 && w.push(uD.configure((i = this.options) === null || i === void 0 ? void 0 : i.codeBlock)), this.options.document !== !1 && w.push(fD.configure((s = this.options) === null || s === void 0 ? void 0 : s.document)), this.options.dropcursor !== !1 && w.push(pD.configure((o = this.options) === null || o === void 0 ? void 0 : o.dropcursor)), this.options.gapcursor !== !1 && w.push(_D.configure((a = this.options) === null || a === void 0 ? void 0 : a.gapcursor)), this.options.hardBreak !== !1 && w.push(SD.configure((l = this.options) === null || l === void 0 ? void 0 : l.hardBreak)), this.options.heading !== !1 && w.push(xD.configure((c = this.options) === null || c === void 0 ? void 0 : c.heading)), this.options.history !== !1 && w.push(DD.configure((u = this.options) === null || u === void 0 ? void 0 : u.history)), this.options.horizontalRule !== !1 && w.push(LD.configure((f = this.options) === null || f === void 0 ? void 0 : f.horizontalRule)), this.options.italic !== !1 && w.push(jD.configure((d = this.options) === null || d === void 0 ? void 0 : d.italic)), this.options.listItem !== !1 && w.push(VD.configure((p = this.options) === null || p === void 0 ? void 0 : p.listItem)), this.options.orderedList !== !1 && w.push(HD.configure((h = this.options) === null || h === void 0 ? void 0 : h.orderedList)), this.options.paragraph !== !1 && w.push(GD.configure((m = this.options) === null || m === void 0 ? void 0 : m.paragraph)), this.options.strike !== !1 && w.push(KD.configure((g = this.options) === null || g === void 0 ? void 0 : g.strike)), this.options.text !== !1 && w.push(YD.configure((v = this.options) === null || v === void 0 ? void 0 : v.text)), w;
  }
}), XD = { class: "rounded-main p-2 border border-solid border-body-dark" }, JD = { class: "flex gap-2 p-2 bg-white border border-solid border-body-dark rounded-main" }, va = /* @__PURE__ */ he({
  __name: "BaseEditor",
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = n, r = e, i = qI({
      content: t.modelValue,
      extensions: [
        qD
      ],
      onUpdate: () => {
        i.value && r("update:modelValue", i.value.getHTML());
      }
    });
    return Ao(() => {
      var s;
      (s = i.value) == null || s.destroy();
    }), Fn(() => t.modelValue, (s) => {
      !i.value || i.value.getHTML() === s || i.value.commands.setContent(s, !1);
    }), (s, o) => (I(), B("div", XD, [
      D(E(YI), { editor: E(i) }, null, 8, ["editor"]),
      E(i) ? (I(), rt(E(UI), {
        key: 0,
        editor: E(i),
        "tippy-options": { duration: 100 }
      }, {
        default: H(() => [
          z("div", JD, [
            z("button", {
              onClick: o[0] || (o[0] = (a) => E(i).chain().focus().toggleBold().run()),
              class: Ln({ "font-bold": E(i).isActive("bold") })
            }, " bold ", 2),
            z("button", {
              onClick: o[1] || (o[1] = (a) => E(i).chain().focus().toggleItalic().run()),
              class: Ln({ "font-bold": E(i).isActive("italic") })
            }, " italic ", 2),
            z("button", {
              onClick: o[2] || (o[2] = (a) => E(i).chain().focus().toggleStrike().run()),
              class: Ln({ "font-bold": E(i).isActive("strike") })
            }, " strike ", 2)
          ])
        ]),
        _: 1
      }, 8, ["editor"])) : ge("", !0)
    ]));
  }
}), QD = ["value"], ZD = /* @__PURE__ */ he({
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
    const t = n, i = cl(t, "modelValue", e);
    return (s, o) => ol((I(), B("select", {
      label: "select",
      "onUpdate:modelValue": o[0] || (o[0] = (a) => Mo(i) ? i.value = a : null),
      class: "block bg-white rounded-main w-full p-2 border border-solid border-body-dark"
    }, [
      (I(!0), B(Ke, null, kt(t.items, (a) => (I(), B("option", {
        key: a[t.optionId],
        value: a[t.optionId]
      }, Z(a[t.optionLabel]), 9, QD))), 128))
    ], 512)), [
      [kb, E(i)]
    ]);
  }
}), eL = { class: "text-lg font-bold" }, tL = {
  key: 0,
  class: "flex gap-2 items-center"
}, nL = {
  key: 1,
  class: "flex gap-2 mt-2"
}, rL = { key: 0 }, iL = { key: 1 }, sL = {
  key: 0,
  class: "flex flex-col gap-2"
}, oL = { class: "FormObject-Inner" }, aL = { class: "FormObject-Row" }, lL = { class: "FormObject-Row" }, cL = { class: "FormObject-Row" }, uL = { class: "my-2" }, fL = { class: "FormObject-Title" }, dL = { class: "FormObject-Row" }, hL = { class: "FormObject-Title" }, pL = { class: "FormObject-Row" }, mL = {
  key: 0,
  class: "FormObject-ArrowName"
}, gL = { class: "py-3 flex gap-1" }, yL = /* @__PURE__ */ he({
  __name: "FormObject",
  setup(n) {
    const e = ng("FormObject"), {
      mapObjectCurrent: t,
      mapFile: r,
      mapObject: i,
      mapCurrent: s,
      drawer: o,
      mapObjectRemoved: a,
      mapObjectRelationRemoved: l,
      mapObjectUrl: c,
      controlCombo: u
    } = Qe(), {
      patron: f,
      chain: d,
      guest: p
    } = zt(), h = new Vy(() => {
      const S = d.create();
      t.objectId(f.create(S.receiveKey("objectId"))), t.objectId(f.create((O) => {
        e("sep obj", O);
      })), r.currentMap(f.create(S.receiveKey("map"))), r.currentMap(f.create((O) => {
        e("sep map", O);
      })), S.result(f.create(
        p.create(({ map: O, objectId: T }) => {
          e("object opened", T), h.value = O.objects[T];
        })
      ));
    }).ref(), m = s.types(new pe()).ref(), g = r.currentMap(new pe()).ref(), v = new Df(h), w = c.url(v, new pe()).ref(), b = () => {
      t.give(""), o.give("");
    }, y = () => {
      a.give(h.value), b();
    }, k = () => {
      i.give({
        ...h.value,
        outlink: h.value.outlink || w.value
      }), b();
    }, C = (S) => {
      l.give({
        index: S,
        object: h.value
      });
    };
    return u.happenedConditional(
      "KeyS",
      o.openedByName("object"),
      f.create(p.create(k))
    ), (S, O) => (I(), rt(bf, {
      name: "object",
      onClose: b
    }, {
      header: H(() => [
        z("h2", eL, Z(S.$t("general.mapObject")), 1),
        E(h) ? (I(), B("small", tL, [
          z("span", null, " ID #" + Z(E(h).id), 1)
        ])) : ge("", !0),
        E(h) ? (I(), B("div", nL, [
          E(h).createTimestamp ? (I(), B("div", rL, " Создан: " + Z(new Date(E(h).createTimestamp).toLocaleString()), 1)) : ge("", !0),
          E(h).changeTimestamp ? (I(), B("div", iL, " Изменен: " + Z(new Date(E(h).changeTimestamp).toLocaleString()), 1)) : ge("", !0)
        ])) : ge("", !0)
      ]),
      footer: H(() => [
        z("div", gL, [
          D(De, {
            type: "success",
            onClick: k
          }, {
            default: H(() => [
              ye(Z(S.$t("general.save")), 1)
            ]),
            _: 1
          }),
          D(De, {
            type: "danger",
            onClick: y
          }, {
            default: H(() => [
              ye(Z(S.$t("general.delete")), 1)
            ]),
            _: 1
          }),
          D(De, { onClick: b }, {
            default: H(() => [
              ye(Z(S.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: H(() => [
        E(h) ? (I(), B("div", sL, [
          z("div", oL, [
            z("div", aL, [
              D(dc, {
                modelValue: E(h).linked,
                "onUpdate:modelValue": O[0] || (O[0] = (T) => E(h).linked = T),
                label: S.$t("general.nameAsLink")
              }, null, 8, ["modelValue", "label"])
            ]),
            E(h).linked ? (I(), B(Ke, { key: 0 }, [
              D(Rt, null, {
                default: H(() => [
                  ye(Z(S.$t("general.outerLink")), 1)
                ]),
                _: 1
              }),
              z("div", lL, [
                D(Mn, {
                  "model-value": E(h).outlink || E(w),
                  "onUpdate:modelValue": O[1] || (O[1] = (T) => E(h).outlink = T)
                }, null, 8, ["model-value"])
              ]),
              z("div", cL, [
                D(dc, {
                  modelValue: E(h).targetBlank,
                  "onUpdate:modelValue": O[2] || (O[2] = (T) => E(h).targetBlank = T),
                  label: S.$t("general.inNewTab")
                }, null, 8, ["modelValue", "label"])
              ])
            ], 64)) : ge("", !0),
            (I(!0), B(Ke, null, kt(E(h).additionalFields, (T, V) => (I(), rt(Xt, {
              class: "mb-2",
              key: V
            }, {
              default: H(() => [
                D(Rt, { class: "mb-1" }, {
                  default: H(() => [
                    ye(Z(V), 1)
                  ]),
                  _: 2
                }, 1024),
                D(va, {
                  modelValue: E(h).additionalFields[V],
                  "onUpdate:modelValue": (X) => E(h).additionalFields[V] = X
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              _: 2
            }, 1024))), 128)),
            D(Xt, null, {
              default: H(() => [
                D(Rt, null, {
                  default: H(() => [
                    ye(Z(S.$t("general.topName")), 1)
                  ]),
                  _: 1
                }),
                D(va, {
                  modelValue: E(h).additionalName,
                  "onUpdate:modelValue": O[3] || (O[3] = (T) => E(h).additionalName = T)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            D(Xt, null, {
              default: H(() => [
                D(Rt, null, {
                  default: H(() => [
                    ye(Z(S.$t("general.bottomName")), 1)
                  ]),
                  _: 1
                }),
                D(va, {
                  modelValue: E(h).name,
                  "onUpdate:modelValue": O[4] || (O[4] = (T) => E(h).name = T)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            D(Xt, null, {
              default: H(() => [
                D(Rt, null, {
                  default: H(() => [
                    ye(Z(S.$t("general.description")), 1)
                  ]),
                  _: 1
                }),
                D(va, {
                  modelValue: E(h).description,
                  "onUpdate:modelValue": O[5] || (O[5] = (T) => E(h).description = T)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            D(Xt, null, {
              default: H(() => [
                D(Rt, null, {
                  default: H(() => O[12] || (O[12] = [
                    ye(" Z-Index ")
                  ])),
                  _: 1
                }),
                D(Mn, {
                  modelValue: E(h).zindex,
                  "onUpdate:modelValue": O[6] || (O[6] = (T) => E(h).zindex = T),
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            D(Xt, null, {
              default: H(() => [
                D(Rt, null, {
                  default: H(() => O[13] || (O[13] = [
                    ye(" Width ")
                  ])),
                  _: 1
                }),
                D(Mn, {
                  modelValue: E(h).width,
                  "onUpdate:modelValue": O[7] || (O[7] = (T) => E(h).width = T),
                  step: "20",
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            D(Xt, null, {
              default: H(() => [
                D(Rt, null, {
                  default: H(() => O[14] || (O[14] = [
                    ye(" Height ")
                  ])),
                  _: 1
                }),
                D(Mn, {
                  modelValue: E(h).height,
                  "onUpdate:modelValue": O[8] || (O[8] = (T) => E(h).height = T),
                  step: "20",
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            D(Xt, null, {
              default: H(() => [
                D(Rt, null, {
                  default: H(() => [
                    ye(Z(S.$t("general.objectType")), 1)
                  ]),
                  _: 1
                }),
                D(ZD, {
                  modelValue: E(h).type,
                  "onUpdate:modelValue": O[9] || (O[9] = (T) => E(h).type = T),
                  items: E(m),
                  "option-id": "id",
                  "option-label": "name"
                }, null, 8, ["modelValue", "items"])
              ]),
              _: 1
            }),
            z("div", uL, [
              D(dc, {
                modelValue: E(h).inMenu,
                "onUpdate:modelValue": O[10] || (O[10] = (T) => E(h).inMenu = T),
                label: S.$t("general.useInMenu")
              }, null, 8, ["modelValue", "label"])
            ]),
            E(h).inMenu ? (I(), B(Ke, { key: 1 }, [
              z("div", fL, Z(S.$t("general.menuOrder")), 1),
              z("div", dL, [
                D(Mn, {
                  modelValue: E(h).menuOrder,
                  "onUpdate:modelValue": O[11] || (O[11] = (T) => E(h).menuOrder = T),
                  type: "number"
                }, null, 8, ["modelValue"])
              ])
            ], 64)) : ge("", !0),
            E(h).arrows && E(h).arrows.length ? (I(), B(Ke, { key: 2 }, [
              z("div", hL, Z(S.$t("general.relations")), 1),
              z("div", pL, [
                (I(!0), B(Ke, null, kt(E(h).arrows, (T, V) => {
                  var X;
                  return I(), B("div", {
                    key: T.id,
                    class: "FormObject-Arrow"
                  }, [
                    (X = E(g)) != null && X.objects[T.id] ? (I(), B("span", mL, " #" + Z(V + 1) + " " + Z(E(g).objects[T.id].name), 1)) : ge("", !0),
                    D(De, {
                      class: "FormObject-ArrowButton",
                      type: "danger",
                      size: "sm",
                      onClick: (W) => C(V)
                    }, {
                      default: H(() => [
                        ye(Z(S.$t("general.delete")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]);
                }), 128))
              ])
            ], 64)) : ge("", !0)
          ])
        ])) : ge("", !0)
      ]),
      _: 1
    }));
  }
}), vL = { class: "BaseTextarea" }, bL = ["v-bind"], G0 = /* @__PURE__ */ he({
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
    const i = cl(n, "modelValue", e);
    return (s, o) => (I(), B("div", vL, [
      ol(z("textarea", {
        ref: "textarea",
        "v-bind": s.$attrs,
        "onUpdate:modelValue": o[0] || (o[0] = (a) => Mo(i) ? i.value = a : null),
        class: "rounded-main block w-full p-2 border min-h-[200px] border-solid border-body-dark"
      }, null, 8, bL), [
        [Qm, E(i)]
      ])
    ]));
  }
}), wL = { class: "text-lg font-bold" }, CL = {
  key: 0,
  class: "flex flex-col"
}, _L = { class: "flex justify-end pt-4 gap-2" }, SL = /* @__PURE__ */ he({
  __name: "FormType",
  setup(n) {
    const {
      mapTypeCurrent: e,
      mapFile: t,
      mapType: r,
      modal: i,
      controlCombo: s
    } = Qe(), { patron: o, chain: a, guest: l } = zt();
    e.typeId(
      o.create(l.create((h) => {
        h && i.give("type");
      }))
    );
    const c = qe(""), u = a.create(), f = new Vy(() => {
      e.typeId(o.create(u.receiveKey("typeId"))), t.currentMap(o.create(u.receiveKey("map"))), u.result(o.create(
        l.create(({ map: h, typeId: m }) => {
          var g;
          f.value = h.types[m], c.value = (g = f.value) == null ? void 0 : g.name;
        })
      ));
    }).ref(), d = () => {
      e.give(""), i.give(""), u.receiveKey("typeId").give("");
    }, p = () => {
      r.give({
        name: c.value,
        type: f.value
      }), d();
    };
    return s.happenedConditional(
      "KeyS",
      i.openedByName("type"),
      o.create(l.create(p))
    ), (h, m) => (I(), rt(Ti, { name: "type" }, {
      header: H(() => [
        z("h2", wL, Z(h.$t("general.mapType")), 1)
      ]),
      footer: H(() => [
        z("div", _L, [
          D(De, {
            type: "success",
            onClick: p
          }, {
            default: H(() => [
              ye(Z(h.$t("general.save")), 1)
            ]),
            _: 1
          }),
          D(De, { onClick: d }, {
            default: H(() => [
              ye(Z(h.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: H(() => [
        E(f) ? (I(), B("div", CL, [
          D(Xt, null, {
            default: H(() => [
              D(Rt, null, {
                default: H(() => m[4] || (m[4] = [
                  ye(" Название типа ")
                ])),
                _: 1
              }),
              D(Mn, {
                modelValue: E(f).name,
                "onUpdate:modelValue": m[0] || (m[0] = (g) => E(f).name = g)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          D(Xt, null, {
            default: H(() => [
              D(Rt, null, {
                default: H(() => m[5] || (m[5] = [
                  ye(" SVG ")
                ])),
                _: 1
              }),
              D(G0, {
                modelValue: E(f).svg,
                "onUpdate:modelValue": m[1] || (m[1] = (g) => E(f).svg = g)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          D(Xt, null, {
            default: H(() => [
              D(Rt, null, {
                default: H(() => m[6] || (m[6] = [
                  ye(" Ширина ")
                ])),
                _: 1
              }),
              D(Mn, {
                modelValue: E(f).width,
                "onUpdate:modelValue": m[2] || (m[2] = (g) => E(f).width = g)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          D(Xt, null, {
            default: H(() => [
              D(Rt, null, {
                default: H(() => m[7] || (m[7] = [
                  ye(" Высота ")
                ])),
                _: 1
              }),
              D(Mn, {
                modelValue: E(f).height,
                "onUpdate:modelValue": m[3] || (m[3] = (g) => E(f).height = g)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          })
        ])) : ge("", !0)
      ]),
      _: 1
    }));
  }
}), Fc = de.debug("MapObjectsWithTemplates");
class xL {
  constructor(e, t, r) {
    this.mapObjects = e, this.map = t, this.factories = r;
  }
  objects(e) {
    const t = this.factories.chain.create();
    return this.map.types(this.factories.guestCast.create(e, t.receiveKey("types"))), this.mapObjects.objects(this.factories.guestCast.create(e, t.receiveKey("objects"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ types: r, objects: i }) => {
        Fc("visible objects", i);
        const s = i.map((o) => {
          const a = r.find((c) => String(c.id) === String(o.type));
          if (Fc("check type existed", a), !a)
            return {
              obj: o,
              template: ""
            };
          let { svg: l } = a;
          return Fc("type svg", l), o.additionalFields && Object.entries(o.additionalFields).forEach(([c, u]) => {
            l = l.replaceAll(`\${${c}}`, u);
          }), ["width", "height"].forEach((c) => {
            l = l.replaceAll(`\${${c}}`, o[c]);
          }), {
            obj: o,
            template: l
          };
        });
        e.give(s);
      })
    ), e;
  }
}
const kL = /* @__PURE__ */ he({
  __name: "BaseNotify",
  setup(n) {
    const { notification: e } = Qe(), t = e.message(new pe()).ref();
    return (r, i) => E(t) && E(t).text !== "hide" ? (I(), B("div", {
      key: 0,
      class: Ln(["inline font-bold", `text-${E(t).type}-second`])
    }, Z(E(t).text), 3)) : ge("", !0);
  }
}), TL = { class: "relative" }, OL = { class: "absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-1" }, EL = { class: "text-sm z-10 p-2 absolute bottom-0 left-5" }, ML = ["title"], AL = { class: "font-bold" }, NL = ["title"], PL = { class: "font-bold" }, IL = ["title"], DL = { class: "font-bold" }, LL = ["title"], RL = { class: "font-bold" }, FL = ["data-object-id"], $L = { class: "absolute bottom-[100%] left-[50%] translate-x-[-50%] text-center pb-2 pointer-events-auto text-sm w-[300px]" }, BL = ["innerHTML", "onClick"], jL = ["innerHTML"], VL = ["data-object-id", "innerHTML"], zL = /* @__PURE__ */ he({
  __name: "TheEditor",
  setup(n) {
    const {
      canvas: e,
      mapObjectsVisible: t,
      mapCurrent: r,
      konvaLayer: i,
      fps: s,
      mapCurrentID: o,
      mapObjectUrl: a,
      stageSize: l,
      objectsOutsideScreen: c,
      stagePositionByObjectId: u,
      mapCurrentSource: f
    } = Qe(), d = zt(), p = s.value(new pe()).ref(), m = new xL(
      t,
      r,
      d
    ).objects(new pe([])).ref(), g = l.value(new pe()).ref(), v = i.position(new pe()).ref(), w = Ie(() => {
      var W;
      return (W = g.value) == null ? void 0 : W.width;
    }), b = new Df(w), y = d.numberChunks.create(10, b).chunks(new pe()).ref(), k = qe();
    _i(() => {
      e.give(k.value);
    });
    const C = (W) => {
      a.open(W, d.guest.create((Q) => {
        o.give(Q);
      }));
    }, S = c.count(
      { axis: "x", direction: "negative" },
      new pe()
    ).ref(), O = c.count(
      { axis: "x", direction: "positive" },
      new pe()
    ).ref(), T = c.count(
      { axis: "y", direction: "negative" },
      new pe()
    ).ref(), V = c.count(
      { axis: "y", direction: "positive" },
      new pe()
    ).ref(), X = u.move.bind(u, f);
    return (W, Q) => {
      var Me, Ae, be, Ee, _e, Ze, et, Ge, Ue, ht, tt, Ye;
      return I(), B("div", TL, [
        z("div", OL, [
          z("div", EL, [
            ye(" Видимых объектов: " + Z(E(m).length) + ", FPS: " + Z(E(p)) + ", ", 1),
            D(kL)
          ]),
          Q[4] || (Q[4] = Tb('<div class="absolute bottom-3 shadow-standard-second shadow-md drop-shadow right-3 z-10"><div class="grid-example grid grid-rows-2 grid-cols-2 bg-standard-second border border-standard-second gap-[1px] border-t-0 border-l-0"><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div></div></div><div class="absolute z-30 top-0 left-0 h-[18px] w-[22px] bg-white"></div>', 2)),
          ((Me = E(S)) == null ? void 0 : Me.count) > 0 ? (I(), B("div", {
            key: 0,
            class: "pointer-events-auto absolute z-30 top-0 left-4 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(Ae = E(S)) == null ? void 0 : Ae.count} шт. объектов левее`,
            onClick: Q[0] || (Q[0] = (ue) => E(X)(E(S).nearestObjectId))
          }, [
            D(Ft, { icon: "fa-arrow-left" }),
            z("span", AL, Z((be = E(S)) == null ? void 0 : be.count), 1)
          ], 8, ML)) : ge("", !0),
          ((Ee = E(O)) == null ? void 0 : Ee.count) > 0 ? (I(), B("div", {
            key: 1,
            class: "pointer-events-auto absolute z-30 p-1 top-0 right-0 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(_e = E(O)) == null ? void 0 : _e.count} шт. объектов правее`,
            onClick: Q[1] || (Q[1] = (ue) => E(X)(E(O).nearestObjectId))
          }, [
            z("span", PL, Z((Ze = E(O)) == null ? void 0 : Ze.count), 1),
            D(Ft, { icon: "fa-arrow-right" })
          ], 8, NL)) : ge("", !0),
          ((et = E(T)) == null ? void 0 : et.count) > 0 ? (I(), B("div", {
            key: 2,
            class: "pointer-events-auto absolute z-30 top-[18px] left-0 w-[18px] bg-white flex flex-col leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(Ge = E(T)) == null ? void 0 : Ge.count} шт. объектов выше`,
            onClick: Q[2] || (Q[2] = (ue) => E(X)(E(T).nearestObjectId))
          }, [
            D(Ft, { icon: "fa-arrow-up" }),
            z("span", DL, Z((Ue = E(T)) == null ? void 0 : Ue.count), 1)
          ], 8, IL)) : ge("", !0),
          ((ht = E(V)) == null ? void 0 : ht.count) > 0 ? (I(), B("div", {
            key: 3,
            class: "pointer-events-auto absolute z-30 p-1 bottom-0 left-0 w-[18px] bg-white flex flex-col-reverse leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(tt = E(V)) == null ? void 0 : tt.count} шт. объектов ниже`,
            onClick: Q[3] || (Q[3] = (ue) => E(X)(E(V).nearestObjectId))
          }, [
            D(Ft, { icon: "fa-arrow-down" }),
            z("span", RL, Z((Ye = E(V)) == null ? void 0 : Ye.count), 1)
          ], 8, LL)) : ge("", !0),
          z("div", {
            class: Ln({ "objects-container absolute top-0 left-0": !0 }),
            style: An({ width: `${E(g).width}px`, height: `${E(g).height}px`, transform: `translate(${E(v).x}px, ${E(v).y}px)` })
          }, [
            z("div", {
              class: "absolute flex top-0 left-0 w-full z-20 h-[20px] bg-default border-b-2 border-border text-right text-sm px-2",
              style: An({ transform: `translate(0, ${-E(v).y}px)` })
            }, [
              (I(!0), B(Ke, null, kt(E(y), (ue) => (I(), B("span", {
                class: "flex-1 text-body-dark",
                key: `horiz_${ue}`
              }, Z(ue) + "px", 1))), 128))
            ], 4),
            z("div", {
              class: "absolute flex [writing-mode:vertical-lr] top-0 left-0 h-full z-20 w-[20px] bg-default border-r-2 border-border text-left text-sm py-2",
              style: An({ transform: `translate(${-E(v).x}px, 0)` })
            }, [
              (I(!0), B(Ke, null, kt(E(y), (ue) => (I(), B("span", {
                class: "flex-1 rotate-180 text-body-dark",
                key: `vert_${ue}`
              }, Z(ue) + "px", 1))), 128))
            ], 4),
            (I(!0), B(Ke, null, kt(E(m), (ue) => (I(), B("div", {
              key: ue.obj.id,
              class: "absolute z-10",
              "data-object-id": ue.obj.id,
              style: An(`width:${ue.obj.width}px;height: ${ue.obj.height}px;top: ${ue.obj.position[1]}px;left:${ue.obj.position[0]}px;z-index:${ue.obj.zindex}`)
            }, [
              z("div", $L, [
                z("span", {
                  innerHTML: ue.obj.additionalName,
                  class: Ln([ue.obj.linked && "cursor-pointer underline"]),
                  onClick: (Gt) => C(ue.obj)
                }, null, 10, BL)
              ]),
              z("div", {
                class: "absolute top-[100%] left-[50%] translate-x-[-50%] text-center pt-2 text-sm w-[300px]",
                innerHTML: ue.obj.name
              }, null, 8, jL),
              z("div", {
                "data-object-id": ue.obj.id,
                class: "rendered-object",
                innerHTML: ue.template
              }, null, 8, VL)
            ], 12, FL))), 128))
          ], 4)
        ]),
        z("div", {
          class: "h-full",
          ref_key: "canvasWrapper",
          ref: k
        }, null, 512)
      ]);
    };
  }
}), HL = { class: "flex flex-wrap gap-2" }, GL = { key: 0 }, WL = { key: 1 }, UL = ["onClick"], KL = /* @__PURE__ */ he({
  __name: "BaseBreadcrumbs",
  setup(n) {
    const {
      breadcrumbs: e,
      mapCurrentID: t
    } = Qe(), r = e.list(new pe()).ref();
    return (i, s) => (I(), B("div", HL, [
      (I(!0), B(Ke, null, kt(E(r), (o, a) => (I(), B("span", {
        class: "flex gap-2",
        key: o.name
      }, [
        a !== 0 ? (I(), B("span", GL, "/")) : ge("", !0),
        a === E(r).length - 1 ? (I(), B("b", WL, "Открыто: " + Z(o.title), 1)) : (I(), B("a", {
          key: 2,
          href: "#",
          onClick: ms((l) => E(t).give(o.name), ["prevent"])
        }, Z(o.title), 9, UL))
      ]))), 128))
    ]));
  }
}), YL = { class: "flex items-center p-3 gap-3" }, qL = { class: "ml-auto gap-1 flex" }, XL = /* @__PURE__ */ he({
  __name: "TheHeader",
  setup(n) {
    const {
      drawer: e,
      modal: t,
      mapHistory: r,
      controlCombo: i,
      settings: s
    } = Qe(), { patron: o, guest: a } = zt(), l = r.isNextPossible(new pe()).ref(), c = r.isPrevPossible(new pe()).ref();
    i.happened(
      "KeyZ",
      o.create(a.create(() => {
        c.value && r.prev();
      }))
    ), i.happened(
      "KeyP",
      o.create(a.create(() => {
        l.value && r.next();
      }))
    );
    const u = new pe();
    return s.value(u), (f, d) => (I(), B("div", YL, [
      D(KL, { class: "TheHeader-Breadcrumbs" }),
      z("div", qL, [
        E(l) && !E(u).value.readonly ? (I(), rt(De, {
          key: 0,
          size: "sm",
          title: "Отменить последнее действие",
          class: "w-7 block",
          onClick: d[0] || (d[0] = (p) => E(r).next())
        }, {
          default: H(() => [
            D(Ft, { icon: "fa-rotate-left" })
          ]),
          _: 1
        })) : ge("", !0),
        E(c) && !E(u).value.readonly ? (I(), rt(De, {
          key: 1,
          size: "sm",
          title: "Вернуть отмененное действие",
          class: "w-7 block",
          onClick: d[1] || (d[1] = (p) => E(r).prev())
        }, {
          default: H(() => [
            D(Ft, { icon: "fa-rotate-right" })
          ]),
          _: 1
        })) : ge("", !0),
        D(De, {
          type: "success",
          size: "sm",
          class: "w-7 block e2e-open-menu",
          title: f.$t("general.menu"),
          onClick: d[2] || (d[2] = (p) => E(e).give("menu"))
        }, {
          default: H(() => [
            D(Ft, { icon: "fa-bars" })
          ]),
          _: 1
        }, 8, ["title"]),
        D(De, {
          title: f.$t("general.byText"),
          type: "primary",
          size: "sm",
          class: "w-7 block",
          onClick: d[3] || (d[3] = (p) => E(t).give("mapAsText"))
        }, {
          default: H(() => [
            D(Ft, { icon: "fa-text-width" })
          ]),
          _: 1
        }, 8, ["title"]),
        D(De, {
          class: "w-7 block e2e-search",
          size: "sm",
          onClick: d[4] || (d[4] = (p) => E(t).give("search"))
        }, {
          default: H(() => [
            D(Ft, { icon: "fa-search" })
          ]),
          _: 1
        }),
        D(De, {
          size: "sm",
          title: "Все карты файла",
          class: "w-7 block",
          onClick: d[5] || (d[5] = (p) => E(e).give("fileMaps"))
        }, {
          default: H(() => [
            D(Ft, { icon: "fa-map" })
          ]),
          _: 1
        })
      ])
    ]));
  }
});
/*!
  * shared v9.14.0
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
const bm = typeof window < "u", Ei = (n, e = !1) => e ? Symbol.for(n) : Symbol(n), JL = (n, e, t) => QL({ l: n, k: e, s: t }), QL = (n) => JSON.stringify(n).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), mt = (n) => typeof n == "number" && isFinite(n), ZL = (n) => U0(n) === "[object Date]", ds = (n) => U0(n) === "[object RegExp]", Rl = (n) => ve(n) && Object.keys(n).length === 0, yt = Object.assign;
let wm;
const qn = () => wm || (wm = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Cm(n) {
  return n.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const eR = Object.prototype.hasOwnProperty;
function il(n, e) {
  return eR.call(n, e);
}
const Je = Array.isArray, je = (n) => typeof n == "function", Y = (n) => typeof n == "string", Pe = (n) => typeof n == "boolean", Te = (n) => n !== null && typeof n == "object", tR = (n) => Te(n) && je(n.then) && je(n.catch), W0 = Object.prototype.toString, U0 = (n) => W0.call(n), ve = (n) => {
  if (!Te(n))
    return !1;
  const e = Object.getPrototypeOf(n);
  return e === null || e.constructor === Object;
}, nR = (n) => n == null ? "" : Je(n) || ve(n) && n.toString === W0 ? JSON.stringify(n, null, 2) : String(n);
function rR(n, e = "") {
  return n.reduce((t, r, i) => i === 0 ? t + r : t + e + r, "");
}
function Fl(n) {
  let e = n;
  return () => ++e;
}
function iR(n, e) {
  typeof console < "u" && (console.warn("[intlify] " + n), e && console.warn(e.stack));
}
const ba = (n) => !Te(n) || Je(n);
function Ia(n, e) {
  if (ba(n) || ba(e))
    throw new Error("Invalid value");
  const t = [{ src: n, des: e }];
  for (; t.length; ) {
    const { src: r, des: i } = t.pop();
    Object.keys(r).forEach((s) => {
      ba(r[s]) || ba(i[s]) ? i[s] = r[s] : t.push({ src: r[s], des: i[s] });
    });
  }
}
/*!
  * message-compiler v9.14.0
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
function sR(n, e, t) {
  return { line: n, column: e, offset: t };
}
function sl(n, e, t) {
  return { start: n, end: e };
}
const oR = /\{([0-9a-zA-Z]+)\}/g;
function K0(n, ...e) {
  return e.length === 1 && aR(e[0]) && (e = e[0]), (!e || !e.hasOwnProperty) && (e = {}), n.replace(oR, (t, r) => e.hasOwnProperty(r) ? e[r] : "");
}
const Y0 = Object.assign, _m = (n) => typeof n == "string", aR = (n) => n !== null && typeof n == "object";
function q0(n, e = "") {
  return n.reduce((t, r, i) => i === 0 ? t + r : t + e + r, "");
}
const fd = {
  USE_MODULO_SYNTAX: 1,
  __EXTEND_POINT__: 2
}, lR = {
  [fd.USE_MODULO_SYNTAX]: "Use modulo before '{{0}}'."
};
function cR(n, e, ...t) {
  const r = K0(lR[n], ...t || []), i = { message: String(r), code: n };
  return e && (i.location = e), i;
}
const ie = {
  // tokenizer error codes
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  // parser error codes
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  // generator error codes
  UNHANDLED_CODEGEN_NODE_TYPE: 15,
  // minifier error codes
  UNHANDLED_MINIFIER_NODE_TYPE: 16,
  // Special value for higher-order compilers to pick up the last code
  // to avoid collision of error codes. This should always be kept as the last
  // item.
  __EXTEND_POINT__: 17
}, uR = {
  // tokenizer error messages
  [ie.EXPECTED_TOKEN]: "Expected token: '{0}'",
  [ie.INVALID_TOKEN_IN_PLACEHOLDER]: "Invalid token in placeholder: '{0}'",
  [ie.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]: "Unterminated single quote in placeholder",
  [ie.UNKNOWN_ESCAPE_SEQUENCE]: "Unknown escape sequence: \\{0}",
  [ie.INVALID_UNICODE_ESCAPE_SEQUENCE]: "Invalid unicode escape sequence: {0}",
  [ie.UNBALANCED_CLOSING_BRACE]: "Unbalanced closing brace",
  [ie.UNTERMINATED_CLOSING_BRACE]: "Unterminated closing brace",
  [ie.EMPTY_PLACEHOLDER]: "Empty placeholder",
  [ie.NOT_ALLOW_NEST_PLACEHOLDER]: "Not allowed nest placeholder",
  [ie.INVALID_LINKED_FORMAT]: "Invalid linked format",
  // parser error messages
  [ie.MUST_HAVE_MESSAGES_IN_PLURAL]: "Plural must have messages",
  [ie.UNEXPECTED_EMPTY_LINKED_MODIFIER]: "Unexpected empty linked modifier",
  [ie.UNEXPECTED_EMPTY_LINKED_KEY]: "Unexpected empty linked key",
  [ie.UNEXPECTED_LEXICAL_ANALYSIS]: "Unexpected lexical analysis in token: '{0}'",
  // generator error messages
  [ie.UNHANDLED_CODEGEN_NODE_TYPE]: "unhandled codegen node type: '{0}'",
  // minimizer error messages
  [ie.UNHANDLED_MINIFIER_NODE_TYPE]: "unhandled mimifier node type: '{0}'"
};
function xs(n, e, t = {}) {
  const { domain: r, messages: i, args: s } = t, o = K0((i || uR)[n] || "", ...s || []), a = new SyntaxError(String(o));
  return a.code = n, e && (a.location = e), a.domain = r, a;
}
function fR(n) {
  throw n;
}
const Gn = " ", dR = "\r", St = `
`, hR = "\u2028", pR = "\u2029";
function mR(n) {
  const e = n;
  let t = 0, r = 1, i = 1, s = 0;
  const o = (S) => e[S] === dR && e[S + 1] === St, a = (S) => e[S] === St, l = (S) => e[S] === pR, c = (S) => e[S] === hR, u = (S) => o(S) || a(S) || l(S) || c(S), f = () => t, d = () => r, p = () => i, h = () => s, m = (S) => o(S) || l(S) || c(S) ? St : e[S], g = () => m(t), v = () => m(t + s);
  function w() {
    return s = 0, u(t) && (r++, i = 0), o(t) && t++, t++, i++, e[t];
  }
  function b() {
    return o(t + s) && s++, s++, e[t + s];
  }
  function y() {
    t = 0, r = 1, i = 1, s = 0;
  }
  function k(S = 0) {
    s = S;
  }
  function C() {
    const S = t + s;
    for (; S !== t; )
      w();
    s = 0;
  }
  return {
    index: f,
    line: d,
    column: p,
    peekOffset: h,
    charAt: m,
    currentChar: g,
    currentPeek: v,
    next: w,
    peek: b,
    reset: y,
    resetPeek: k,
    skipToPeek: C
  };
}
const cr = void 0, gR = ".", Sm = "'", yR = "tokenizer";
function vR(n, e = {}) {
  const t = e.location !== !1, r = mR(n), i = () => r.index(), s = () => sR(r.line(), r.column(), r.index()), o = s(), a = i(), l = {
    currentType: 14,
    offset: a,
    startLoc: o,
    endLoc: o,
    lastType: 14,
    lastOffset: a,
    lastStartLoc: o,
    lastEndLoc: o,
    braceNest: 0,
    inLinked: !1,
    text: ""
  }, c = () => l, { onError: u } = e;
  function f(_, x, P, ...U) {
    const ke = c();
    if (x.column += P, x.offset += P, u) {
      const re = t ? sl(ke.startLoc, x) : null, M = xs(_, re, {
        domain: yR,
        args: U
      });
      u(M);
    }
  }
  function d(_, x, P) {
    _.endLoc = s(), _.currentType = x;
    const U = { type: x };
    return t && (U.loc = sl(_.startLoc, _.endLoc)), P != null && (U.value = P), U;
  }
  const p = (_) => d(
    _,
    14
    /* TokenTypes.EOF */
  );
  function h(_, x) {
    return _.currentChar() === x ? (_.next(), x) : (f(ie.EXPECTED_TOKEN, s(), 0, x), "");
  }
  function m(_) {
    let x = "";
    for (; _.currentPeek() === Gn || _.currentPeek() === St; )
      x += _.currentPeek(), _.peek();
    return x;
  }
  function g(_) {
    const x = m(_);
    return _.skipToPeek(), x;
  }
  function v(_) {
    if (_ === cr)
      return !1;
    const x = _.charCodeAt(0);
    return x >= 97 && x <= 122 || // a-z
    x >= 65 && x <= 90 || // A-Z
    x === 95;
  }
  function w(_) {
    if (_ === cr)
      return !1;
    const x = _.charCodeAt(0);
    return x >= 48 && x <= 57;
  }
  function b(_, x) {
    const { currentType: P } = x;
    if (P !== 2)
      return !1;
    m(_);
    const U = v(_.currentPeek());
    return _.resetPeek(), U;
  }
  function y(_, x) {
    const { currentType: P } = x;
    if (P !== 2)
      return !1;
    m(_);
    const U = _.currentPeek() === "-" ? _.peek() : _.currentPeek(), ke = w(U);
    return _.resetPeek(), ke;
  }
  function k(_, x) {
    const { currentType: P } = x;
    if (P !== 2)
      return !1;
    m(_);
    const U = _.currentPeek() === Sm;
    return _.resetPeek(), U;
  }
  function C(_, x) {
    const { currentType: P } = x;
    if (P !== 8)
      return !1;
    m(_);
    const U = _.currentPeek() === ".";
    return _.resetPeek(), U;
  }
  function S(_, x) {
    const { currentType: P } = x;
    if (P !== 9)
      return !1;
    m(_);
    const U = v(_.currentPeek());
    return _.resetPeek(), U;
  }
  function O(_, x) {
    const { currentType: P } = x;
    if (!(P === 8 || P === 12))
      return !1;
    m(_);
    const U = _.currentPeek() === ":";
    return _.resetPeek(), U;
  }
  function T(_, x) {
    const { currentType: P } = x;
    if (P !== 10)
      return !1;
    const U = () => {
      const re = _.currentPeek();
      return re === "{" ? v(_.peek()) : re === "@" || re === "%" || re === "|" || re === ":" || re === "." || re === Gn || !re ? !1 : re === St ? (_.peek(), U()) : W(_, !1);
    }, ke = U();
    return _.resetPeek(), ke;
  }
  function V(_) {
    m(_);
    const x = _.currentPeek() === "|";
    return _.resetPeek(), x;
  }
  function X(_) {
    const x = m(_), P = _.currentPeek() === "%" && _.peek() === "{";
    return _.resetPeek(), {
      isModulo: P,
      hasSpace: x.length > 0
    };
  }
  function W(_, x = !0) {
    const P = (ke = !1, re = "", M = !1) => {
      const L = _.currentPeek();
      return L === "{" ? re === "%" ? !1 : ke : L === "@" || !L ? re === "%" ? !0 : ke : L === "%" ? (_.peek(), P(ke, "%", !0)) : L === "|" ? re === "%" || M ? !0 : !(re === Gn || re === St) : L === Gn ? (_.peek(), P(!0, Gn, M)) : L === St ? (_.peek(), P(!0, St, M)) : !0;
    }, U = P();
    return x && _.resetPeek(), U;
  }
  function Q(_, x) {
    const P = _.currentChar();
    return P === cr ? cr : x(P) ? (_.next(), P) : null;
  }
  function Me(_) {
    const x = _.charCodeAt(0);
    return x >= 97 && x <= 122 || // a-z
    x >= 65 && x <= 90 || // A-Z
    x >= 48 && x <= 57 || // 0-9
    x === 95 || // _
    x === 36;
  }
  function Ae(_) {
    return Q(_, Me);
  }
  function be(_) {
    const x = _.charCodeAt(0);
    return x >= 97 && x <= 122 || // a-z
    x >= 65 && x <= 90 || // A-Z
    x >= 48 && x <= 57 || // 0-9
    x === 95 || // _
    x === 36 || // $
    x === 45;
  }
  function Ee(_) {
    return Q(_, be);
  }
  function _e(_) {
    const x = _.charCodeAt(0);
    return x >= 48 && x <= 57;
  }
  function Ze(_) {
    return Q(_, _e);
  }
  function et(_) {
    const x = _.charCodeAt(0);
    return x >= 48 && x <= 57 || // 0-9
    x >= 65 && x <= 70 || // A-F
    x >= 97 && x <= 102;
  }
  function Ge(_) {
    return Q(_, et);
  }
  function Ue(_) {
    let x = "", P = "";
    for (; x = Ze(_); )
      P += x;
    return P;
  }
  function ht(_) {
    g(_);
    const x = _.currentChar();
    return x !== "%" && f(ie.EXPECTED_TOKEN, s(), 0, x), _.next(), "%";
  }
  function tt(_) {
    let x = "";
    for (; ; ) {
      const P = _.currentChar();
      if (P === "{" || P === "}" || P === "@" || P === "|" || !P)
        break;
      if (P === "%")
        if (W(_))
          x += P, _.next();
        else
          break;
      else if (P === Gn || P === St)
        if (W(_))
          x += P, _.next();
        else {
          if (V(_))
            break;
          x += P, _.next();
        }
      else
        x += P, _.next();
    }
    return x;
  }
  function Ye(_) {
    g(_);
    let x = "", P = "";
    for (; x = Ee(_); )
      P += x;
    return _.currentChar() === cr && f(ie.UNTERMINATED_CLOSING_BRACE, s(), 0), P;
  }
  function ue(_) {
    g(_);
    let x = "";
    return _.currentChar() === "-" ? (_.next(), x += `-${Ue(_)}`) : x += Ue(_), _.currentChar() === cr && f(ie.UNTERMINATED_CLOSING_BRACE, s(), 0), x;
  }
  function Gt(_) {
    return _ !== Sm && _ !== St;
  }
  function wt(_) {
    g(_), h(_, "'");
    let x = "", P = "";
    for (; x = Q(_, Gt); )
      x === "\\" ? P += Wt(_) : P += x;
    const U = _.currentChar();
    return U === St || U === cr ? (f(ie.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, s(), 0), U === St && (_.next(), h(_, "'")), P) : (h(_, "'"), P);
  }
  function Wt(_) {
    const x = _.currentChar();
    switch (x) {
      case "\\":
      case "'":
        return _.next(), `\\${x}`;
      case "u":
        return Ct(_, x, 4);
      case "U":
        return Ct(_, x, 6);
      default:
        return f(ie.UNKNOWN_ESCAPE_SEQUENCE, s(), 0, x), "";
    }
  }
  function Ct(_, x, P) {
    h(_, x);
    let U = "";
    for (let ke = 0; ke < P; ke++) {
      const re = Ge(_);
      if (!re) {
        f(ie.INVALID_UNICODE_ESCAPE_SEQUENCE, s(), 0, `\\${x}${U}${_.currentChar()}`);
        break;
      }
      U += re;
    }
    return `\\${x}${U}`;
  }
  function Ut(_) {
    return _ !== "{" && _ !== "}" && _ !== Gn && _ !== St;
  }
  function xn(_) {
    g(_);
    let x = "", P = "";
    for (; x = Q(_, Ut); )
      P += x;
    return P;
  }
  function fn(_) {
    let x = "", P = "";
    for (; x = Ae(_); )
      P += x;
    return P;
  }
  function $(_) {
    const x = (P) => {
      const U = _.currentChar();
      return U === "{" || U === "%" || U === "@" || U === "|" || U === "(" || U === ")" || !U || U === Gn ? P : (P += U, _.next(), x(P));
    };
    return x("");
  }
  function me(_) {
    g(_);
    const x = h(
      _,
      "|"
      /* TokenChars.Pipe */
    );
    return g(_), x;
  }
  function Kt(_, x) {
    let P = null;
    switch (_.currentChar()) {
      case "{":
        return x.braceNest >= 1 && f(ie.NOT_ALLOW_NEST_PLACEHOLDER, s(), 0), _.next(), P = d(
          x,
          2,
          "{"
          /* TokenChars.BraceLeft */
        ), g(_), x.braceNest++, P;
      case "}":
        return x.braceNest > 0 && x.currentType === 2 && f(ie.EMPTY_PLACEHOLDER, s(), 0), _.next(), P = d(
          x,
          3,
          "}"
          /* TokenChars.BraceRight */
        ), x.braceNest--, x.braceNest > 0 && g(_), x.inLinked && x.braceNest === 0 && (x.inLinked = !1), P;
      case "@":
        return x.braceNest > 0 && f(ie.UNTERMINATED_CLOSING_BRACE, s(), 0), P = Yt(_, x) || p(x), x.braceNest = 0, P;
      default: {
        let ke = !0, re = !0, M = !0;
        if (V(_))
          return x.braceNest > 0 && f(ie.UNTERMINATED_CLOSING_BRACE, s(), 0), P = d(x, 1, me(_)), x.braceNest = 0, x.inLinked = !1, P;
        if (x.braceNest > 0 && (x.currentType === 5 || x.currentType === 6 || x.currentType === 7))
          return f(ie.UNTERMINATED_CLOSING_BRACE, s(), 0), x.braceNest = 0, kn(_, x);
        if (ke = b(_, x))
          return P = d(x, 5, Ye(_)), g(_), P;
        if (re = y(_, x))
          return P = d(x, 6, ue(_)), g(_), P;
        if (M = k(_, x))
          return P = d(x, 7, wt(_)), g(_), P;
        if (!ke && !re && !M)
          return P = d(x, 13, xn(_)), f(ie.INVALID_TOKEN_IN_PLACEHOLDER, s(), 0, P.value), g(_), P;
        break;
      }
    }
    return P;
  }
  function Yt(_, x) {
    const { currentType: P } = x;
    let U = null;
    const ke = _.currentChar();
    switch ((P === 8 || P === 9 || P === 12 || P === 10) && (ke === St || ke === Gn) && f(ie.INVALID_LINKED_FORMAT, s(), 0), ke) {
      case "@":
        return _.next(), U = d(
          x,
          8,
          "@"
          /* TokenChars.LinkedAlias */
        ), x.inLinked = !0, U;
      case ".":
        return g(_), _.next(), d(
          x,
          9,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        return g(_), _.next(), d(
          x,
          10,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        return V(_) ? (U = d(x, 1, me(_)), x.braceNest = 0, x.inLinked = !1, U) : C(_, x) || O(_, x) ? (g(_), Yt(_, x)) : S(_, x) ? (g(_), d(x, 12, fn(_))) : T(_, x) ? (g(_), ke === "{" ? Kt(_, x) || U : d(x, 11, $(_))) : (P === 8 && f(ie.INVALID_LINKED_FORMAT, s(), 0), x.braceNest = 0, x.inLinked = !1, kn(_, x));
    }
  }
  function kn(_, x) {
    let P = {
      type: 14
      /* TokenTypes.EOF */
    };
    if (x.braceNest > 0)
      return Kt(_, x) || p(x);
    if (x.inLinked)
      return Yt(_, x) || p(x);
    switch (_.currentChar()) {
      case "{":
        return Kt(_, x) || p(x);
      case "}":
        return f(ie.UNBALANCED_CLOSING_BRACE, s(), 0), _.next(), d(
          x,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return Yt(_, x) || p(x);
      default: {
        if (V(_))
          return P = d(x, 1, me(_)), x.braceNest = 0, x.inLinked = !1, P;
        const { isModulo: ke, hasSpace: re } = X(_);
        if (ke)
          return re ? d(x, 0, tt(_)) : d(x, 4, ht(_));
        if (W(_))
          return d(x, 0, tt(_));
        break;
      }
    }
    return P;
  }
  function or() {
    const { currentType: _, offset: x, startLoc: P, endLoc: U } = l;
    return l.lastType = _, l.lastOffset = x, l.lastStartLoc = P, l.lastEndLoc = U, l.offset = i(), l.startLoc = s(), r.currentChar() === cr ? d(
      l,
      14
      /* TokenTypes.EOF */
    ) : kn(r, l);
  }
  return {
    nextToken: or,
    currentOffset: i,
    currentPosition: s,
    context: c
  };
}
const bR = "parser", wR = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function CR(n, e, t) {
  switch (n) {
    case "\\\\":
      return "\\";
    case "\\'":
      return "'";
    default: {
      const r = parseInt(e || t, 16);
      return r <= 55295 || r >= 57344 ? String.fromCodePoint(r) : "�";
    }
  }
}
function _R(n = {}) {
  const e = n.location !== !1, { onError: t, onWarn: r } = n;
  function i(b, y, k, C, ...S) {
    const O = b.currentPosition();
    if (O.offset += C, O.column += C, t) {
      const T = e ? sl(k, O) : null, V = xs(y, T, {
        domain: bR,
        args: S
      });
      t(V);
    }
  }
  function s(b, y, k, C, ...S) {
    const O = b.currentPosition();
    if (O.offset += C, O.column += C, r) {
      const T = e ? sl(k, O) : null;
      r(cR(y, T, S));
    }
  }
  function o(b, y, k) {
    const C = { type: b };
    return e && (C.start = y, C.end = y, C.loc = { start: k, end: k }), C;
  }
  function a(b, y, k, C) {
    e && (b.end = y, b.loc && (b.loc.end = k));
  }
  function l(b, y) {
    const k = b.context(), C = o(3, k.offset, k.startLoc);
    return C.value = y, a(C, b.currentOffset(), b.currentPosition()), C;
  }
  function c(b, y) {
    const k = b.context(), { lastOffset: C, lastStartLoc: S } = k, O = o(5, C, S);
    return O.index = parseInt(y, 10), b.nextToken(), a(O, b.currentOffset(), b.currentPosition()), O;
  }
  function u(b, y, k) {
    const C = b.context(), { lastOffset: S, lastStartLoc: O } = C, T = o(4, S, O);
    return T.key = y, k === !0 && (T.modulo = !0), b.nextToken(), a(T, b.currentOffset(), b.currentPosition()), T;
  }
  function f(b, y) {
    const k = b.context(), { lastOffset: C, lastStartLoc: S } = k, O = o(9, C, S);
    return O.value = y.replace(wR, CR), b.nextToken(), a(O, b.currentOffset(), b.currentPosition()), O;
  }
  function d(b) {
    const y = b.nextToken(), k = b.context(), { lastOffset: C, lastStartLoc: S } = k, O = o(8, C, S);
    return y.type !== 12 ? (i(b, ie.UNEXPECTED_EMPTY_LINKED_MODIFIER, k.lastStartLoc, 0), O.value = "", a(O, C, S), {
      nextConsumeToken: y,
      node: O
    }) : (y.value == null && i(b, ie.UNEXPECTED_LEXICAL_ANALYSIS, k.lastStartLoc, 0, dn(y)), O.value = y.value || "", a(O, b.currentOffset(), b.currentPosition()), {
      node: O
    });
  }
  function p(b, y) {
    const k = b.context(), C = o(7, k.offset, k.startLoc);
    return C.value = y, a(C, b.currentOffset(), b.currentPosition()), C;
  }
  function h(b) {
    const y = b.context(), k = o(6, y.offset, y.startLoc);
    let C = b.nextToken();
    if (C.type === 9) {
      const S = d(b);
      k.modifier = S.node, C = S.nextConsumeToken || b.nextToken();
    }
    switch (C.type !== 10 && i(b, ie.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, dn(C)), C = b.nextToken(), C.type === 2 && (C = b.nextToken()), C.type) {
      case 11:
        C.value == null && i(b, ie.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, dn(C)), k.key = p(b, C.value || "");
        break;
      case 5:
        C.value == null && i(b, ie.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, dn(C)), k.key = u(b, C.value || "");
        break;
      case 6:
        C.value == null && i(b, ie.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, dn(C)), k.key = c(b, C.value || "");
        break;
      case 7:
        C.value == null && i(b, ie.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, dn(C)), k.key = f(b, C.value || "");
        break;
      default: {
        i(b, ie.UNEXPECTED_EMPTY_LINKED_KEY, y.lastStartLoc, 0);
        const S = b.context(), O = o(7, S.offset, S.startLoc);
        return O.value = "", a(O, S.offset, S.startLoc), k.key = O, a(k, S.offset, S.startLoc), {
          nextConsumeToken: C,
          node: k
        };
      }
    }
    return a(k, b.currentOffset(), b.currentPosition()), {
      node: k
    };
  }
  function m(b) {
    const y = b.context(), k = y.currentType === 1 ? b.currentOffset() : y.offset, C = y.currentType === 1 ? y.endLoc : y.startLoc, S = o(2, k, C);
    S.items = [];
    let O = null, T = null;
    do {
      const W = O || b.nextToken();
      switch (O = null, W.type) {
        case 0:
          W.value == null && i(b, ie.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, dn(W)), S.items.push(l(b, W.value || ""));
          break;
        case 6:
          W.value == null && i(b, ie.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, dn(W)), S.items.push(c(b, W.value || ""));
          break;
        case 4:
          T = !0;
          break;
        case 5:
          W.value == null && i(b, ie.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, dn(W)), S.items.push(u(b, W.value || "", !!T)), T && (s(b, fd.USE_MODULO_SYNTAX, y.lastStartLoc, 0, dn(W)), T = null);
          break;
        case 7:
          W.value == null && i(b, ie.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, dn(W)), S.items.push(f(b, W.value || ""));
          break;
        case 8: {
          const Q = h(b);
          S.items.push(Q.node), O = Q.nextConsumeToken || null;
          break;
        }
      }
    } while (y.currentType !== 14 && y.currentType !== 1);
    const V = y.currentType === 1 ? y.lastOffset : b.currentOffset(), X = y.currentType === 1 ? y.lastEndLoc : b.currentPosition();
    return a(S, V, X), S;
  }
  function g(b, y, k, C) {
    const S = b.context();
    let O = C.items.length === 0;
    const T = o(1, y, k);
    T.cases = [], T.cases.push(C);
    do {
      const V = m(b);
      O || (O = V.items.length === 0), T.cases.push(V);
    } while (S.currentType !== 14);
    return O && i(b, ie.MUST_HAVE_MESSAGES_IN_PLURAL, k, 0), a(T, b.currentOffset(), b.currentPosition()), T;
  }
  function v(b) {
    const y = b.context(), { offset: k, startLoc: C } = y, S = m(b);
    return y.currentType === 14 ? S : g(b, k, C, S);
  }
  function w(b) {
    const y = vR(b, Y0({}, n)), k = y.context(), C = o(0, k.offset, k.startLoc);
    return e && C.loc && (C.loc.source = b), C.body = v(y), n.onCacheKey && (C.cacheKey = n.onCacheKey(b)), k.currentType !== 14 && i(y, ie.UNEXPECTED_LEXICAL_ANALYSIS, k.lastStartLoc, 0, b[k.offset] || ""), a(C, y.currentOffset(), y.currentPosition()), C;
  }
  return { parse: w };
}
function dn(n) {
  if (n.type === 14)
    return "EOF";
  const e = (n.value || "").replace(/\r?\n/gu, "\\n");
  return e.length > 10 ? e.slice(0, 9) + "…" : e;
}
function SR(n, e = {}) {
  const t = {
    ast: n,
    helpers: /* @__PURE__ */ new Set()
  };
  return { context: () => t, helper: (s) => (t.helpers.add(s), s) };
}
function xm(n, e) {
  for (let t = 0; t < n.length; t++)
    dd(n[t], e);
}
function dd(n, e) {
  switch (n.type) {
    case 1:
      xm(n.cases, e), e.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      xm(n.items, e);
      break;
    case 6: {
      dd(n.key, e), e.helper(
        "linked"
        /* HelperNameMap.LINKED */
      ), e.helper(
        "type"
        /* HelperNameMap.TYPE */
      );
      break;
    }
    case 5:
      e.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ), e.helper(
        "list"
        /* HelperNameMap.LIST */
      );
      break;
    case 4:
      e.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ), e.helper(
        "named"
        /* HelperNameMap.NAMED */
      );
      break;
  }
}
function xR(n, e = {}) {
  const t = SR(n);
  t.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  ), n.body && dd(n.body, t);
  const r = t.context();
  n.helpers = Array.from(r.helpers);
}
function kR(n) {
  const e = n.body;
  return e.type === 2 ? km(e) : e.cases.forEach((t) => km(t)), n;
}
function km(n) {
  if (n.items.length === 1) {
    const e = n.items[0];
    (e.type === 3 || e.type === 9) && (n.static = e.value, delete e.value);
  } else {
    const e = [];
    for (let t = 0; t < n.items.length; t++) {
      const r = n.items[t];
      if (!(r.type === 3 || r.type === 9) || r.value == null)
        break;
      e.push(r.value);
    }
    if (e.length === n.items.length) {
      n.static = q0(e);
      for (let t = 0; t < n.items.length; t++) {
        const r = n.items[t];
        (r.type === 3 || r.type === 9) && delete r.value;
      }
    }
  }
}
const TR = "minifier";
function ji(n) {
  switch (n.t = n.type, n.type) {
    case 0: {
      const e = n;
      ji(e.body), e.b = e.body, delete e.body;
      break;
    }
    case 1: {
      const e = n, t = e.cases;
      for (let r = 0; r < t.length; r++)
        ji(t[r]);
      e.c = t, delete e.cases;
      break;
    }
    case 2: {
      const e = n, t = e.items;
      for (let r = 0; r < t.length; r++)
        ji(t[r]);
      e.i = t, delete e.items, e.static && (e.s = e.static, delete e.static);
      break;
    }
    case 3:
    case 9:
    case 8:
    case 7: {
      const e = n;
      e.value && (e.v = e.value, delete e.value);
      break;
    }
    case 6: {
      const e = n;
      ji(e.key), e.k = e.key, delete e.key, e.modifier && (ji(e.modifier), e.m = e.modifier, delete e.modifier);
      break;
    }
    case 5: {
      const e = n;
      e.i = e.index, delete e.index;
      break;
    }
    case 4: {
      const e = n;
      e.k = e.key, delete e.key;
      break;
    }
    default:
      throw xs(ie.UNHANDLED_MINIFIER_NODE_TYPE, null, {
        domain: TR,
        args: [n.type]
      });
  }
  delete n.type;
}
const OR = "parser";
function ER(n, e) {
  const { sourceMap: t, filename: r, breakLineCode: i, needIndent: s } = e, o = e.location !== !1, a = {
    filename: r,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode: i,
    needIndent: s,
    indentLevel: 0
  };
  o && n.loc && (a.source = n.loc.source);
  const l = () => a;
  function c(g, v) {
    a.code += g;
  }
  function u(g, v = !0) {
    const w = v ? i : "";
    c(s ? w + "  ".repeat(g) : w);
  }
  function f(g = !0) {
    const v = ++a.indentLevel;
    g && u(v);
  }
  function d(g = !0) {
    const v = --a.indentLevel;
    g && u(v);
  }
  function p() {
    u(a.indentLevel);
  }
  return {
    context: l,
    push: c,
    indent: f,
    deindent: d,
    newline: p,
    helper: (g) => `_${g}`,
    needIndent: () => a.needIndent
  };
}
function MR(n, e) {
  const { helper: t } = n;
  n.push(`${t(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`), hs(n, e.key), e.modifier ? (n.push(", "), hs(n, e.modifier), n.push(", _type")) : n.push(", undefined, _type"), n.push(")");
}
function AR(n, e) {
  const { helper: t, needIndent: r } = n;
  n.push(`${t(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), n.indent(r());
  const i = e.items.length;
  for (let s = 0; s < i && (hs(n, e.items[s]), s !== i - 1); s++)
    n.push(", ");
  n.deindent(r()), n.push("])");
}
function NR(n, e) {
  const { helper: t, needIndent: r } = n;
  if (e.cases.length > 1) {
    n.push(`${t(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), n.indent(r());
    const i = e.cases.length;
    for (let s = 0; s < i && (hs(n, e.cases[s]), s !== i - 1); s++)
      n.push(", ");
    n.deindent(r()), n.push("])");
  }
}
function PR(n, e) {
  e.body ? hs(n, e.body) : n.push("null");
}
function hs(n, e) {
  const { helper: t } = n;
  switch (e.type) {
    case 0:
      PR(n, e);
      break;
    case 1:
      NR(n, e);
      break;
    case 2:
      AR(n, e);
      break;
    case 6:
      MR(n, e);
      break;
    case 8:
      n.push(JSON.stringify(e.value), e);
      break;
    case 7:
      n.push(JSON.stringify(e.value), e);
      break;
    case 5:
      n.push(`${t(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${t(
        "list"
        /* HelperNameMap.LIST */
      )}(${e.index}))`, e);
      break;
    case 4:
      n.push(`${t(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${t(
        "named"
        /* HelperNameMap.NAMED */
      )}(${JSON.stringify(e.key)}))`, e);
      break;
    case 9:
      n.push(JSON.stringify(e.value), e);
      break;
    case 3:
      n.push(JSON.stringify(e.value), e);
      break;
    default:
      throw xs(ie.UNHANDLED_CODEGEN_NODE_TYPE, null, {
        domain: OR,
        args: [e.type]
      });
  }
}
const IR = (n, e = {}) => {
  const t = _m(e.mode) ? e.mode : "normal", r = _m(e.filename) ? e.filename : "message.intl", i = !!e.sourceMap, s = e.breakLineCode != null ? e.breakLineCode : t === "arrow" ? ";" : `
`, o = e.needIndent ? e.needIndent : t !== "arrow", a = n.helpers || [], l = ER(n, {
    mode: t,
    filename: r,
    sourceMap: i,
    breakLineCode: s,
    needIndent: o
  });
  l.push(t === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), l.indent(o), a.length > 0 && (l.push(`const { ${q0(a.map((f) => `${f}: _${f}`), ", ")} } = ctx`), l.newline()), l.push("return "), hs(l, n), l.deindent(o), l.push("}"), delete n.helpers;
  const { code: c, map: u } = l.context();
  return {
    ast: n,
    code: c,
    map: u ? u.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function DR(n, e = {}) {
  const t = Y0({}, e), r = !!t.jit, i = !!t.minify, s = t.optimize == null ? !0 : t.optimize, a = _R(t).parse(n);
  return r ? (s && kR(a), i && ji(a), { ast: a, code: "" }) : (xR(a, t), IR(a, t));
}
/*!
  * core-base v9.14.0
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
function LR() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (qn().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_JIT_COMPILATION__ != "boolean" && (qn().__INTLIFY_JIT_COMPILATION__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (qn().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
const Wr = [];
Wr[
  0
  /* States.BEFORE_PATH */
] = {
  w: [
    0
    /* States.BEFORE_PATH */
  ],
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  "[": [
    4
    /* States.IN_SUB_PATH */
  ],
  o: [
    7
    /* States.AFTER_PATH */
  ]
};
Wr[
  1
  /* States.IN_PATH */
] = {
  w: [
    1
    /* States.IN_PATH */
  ],
  ".": [
    2
    /* States.BEFORE_IDENT */
  ],
  "[": [
    4
    /* States.IN_SUB_PATH */
  ],
  o: [
    7
    /* States.AFTER_PATH */
  ]
};
Wr[
  2
  /* States.BEFORE_IDENT */
] = {
  w: [
    2
    /* States.BEFORE_IDENT */
  ],
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  0: [
    3,
    0
    /* Actions.APPEND */
  ]
};
Wr[
  3
  /* States.IN_IDENT */
] = {
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  0: [
    3,
    0
    /* Actions.APPEND */
  ],
  w: [
    1,
    1
    /* Actions.PUSH */
  ],
  ".": [
    2,
    1
    /* Actions.PUSH */
  ],
  "[": [
    4,
    1
    /* Actions.PUSH */
  ],
  o: [
    7,
    1
    /* Actions.PUSH */
  ]
};
Wr[
  4
  /* States.IN_SUB_PATH */
] = {
  "'": [
    5,
    0
    /* Actions.APPEND */
  ],
  '"': [
    6,
    0
    /* Actions.APPEND */
  ],
  "[": [
    4,
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ],
  "]": [
    1,
    3
    /* Actions.PUSH_SUB_PATH */
  ],
  o: 8,
  l: [
    4,
    0
    /* Actions.APPEND */
  ]
};
Wr[
  5
  /* States.IN_SINGLE_QUOTE */
] = {
  "'": [
    4,
    0
    /* Actions.APPEND */
  ],
  o: 8,
  l: [
    5,
    0
    /* Actions.APPEND */
  ]
};
Wr[
  6
  /* States.IN_DOUBLE_QUOTE */
] = {
  '"': [
    4,
    0
    /* Actions.APPEND */
  ],
  o: 8,
  l: [
    6,
    0
    /* Actions.APPEND */
  ]
};
const RR = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function FR(n) {
  return RR.test(n);
}
function $R(n) {
  const e = n.charCodeAt(0), t = n.charCodeAt(n.length - 1);
  return e === t && (e === 34 || e === 39) ? n.slice(1, -1) : n;
}
function BR(n) {
  if (n == null)
    return "o";
  switch (n.charCodeAt(0)) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return n;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function jR(n) {
  const e = n.trim();
  return n.charAt(0) === "0" && isNaN(parseInt(n)) ? !1 : FR(e) ? $R(e) : "*" + e;
}
function VR(n) {
  const e = [];
  let t = -1, r = 0, i = 0, s, o, a, l, c, u, f;
  const d = [];
  d[
    0
    /* Actions.APPEND */
  ] = () => {
    o === void 0 ? o = a : o += a;
  }, d[
    1
    /* Actions.PUSH */
  ] = () => {
    o !== void 0 && (e.push(o), o = void 0);
  }, d[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    d[
      0
      /* Actions.APPEND */
    ](), i++;
  }, d[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (i > 0)
      i--, r = 4, d[
        0
        /* Actions.APPEND */
      ]();
    else {
      if (i = 0, o === void 0 || (o = jR(o), o === !1))
        return !1;
      d[
        1
        /* Actions.PUSH */
      ]();
    }
  };
  function p() {
    const h = n[t + 1];
    if (r === 5 && h === "'" || r === 6 && h === '"')
      return t++, a = "\\" + h, d[
        0
        /* Actions.APPEND */
      ](), !0;
  }
  for (; r !== null; )
    if (t++, s = n[t], !(s === "\\" && p())) {
      if (l = BR(s), f = Wr[r], c = f[l] || f.l || 8, c === 8 || (r = c[0], c[1] !== void 0 && (u = d[c[1]], u && (a = s, u() === !1))))
        return;
      if (r === 7)
        return e;
    }
}
const Tm = /* @__PURE__ */ new Map();
function zR(n, e) {
  return Te(n) ? n[e] : null;
}
function HR(n, e) {
  if (!Te(n))
    return null;
  let t = Tm.get(e);
  if (t || (t = VR(e), t && Tm.set(e, t)), !t)
    return null;
  const r = t.length;
  let i = n, s = 0;
  for (; s < r; ) {
    const o = i[t[s]];
    if (o === void 0 || je(i))
      return null;
    i = o, s++;
  }
  return i;
}
const GR = (n) => n, WR = (n) => "", UR = "text", KR = (n) => n.length === 0 ? "" : rR(n), YR = nR;
function Om(n, e) {
  return n = Math.abs(n), e === 2 ? n ? n > 1 ? 1 : 0 : 1 : n ? Math.min(n, 2) : 0;
}
function qR(n) {
  const e = mt(n.pluralIndex) ? n.pluralIndex : -1;
  return n.named && (mt(n.named.count) || mt(n.named.n)) ? mt(n.named.count) ? n.named.count : mt(n.named.n) ? n.named.n : e : e;
}
function XR(n, e) {
  e.count || (e.count = n), e.n || (e.n = n);
}
function JR(n = {}) {
  const e = n.locale, t = qR(n), r = Te(n.pluralRules) && Y(e) && je(n.pluralRules[e]) ? n.pluralRules[e] : Om, i = Te(n.pluralRules) && Y(e) && je(n.pluralRules[e]) ? Om : void 0, s = (v) => v[r(t, v.length, i)], o = n.list || [], a = (v) => o[v], l = n.named || {};
  mt(n.pluralIndex) && XR(t, l);
  const c = (v) => l[v];
  function u(v) {
    const w = je(n.messages) ? n.messages(v) : Te(n.messages) ? n.messages[v] : !1;
    return w || (n.parent ? n.parent.message(v) : WR);
  }
  const f = (v) => n.modifiers ? n.modifiers[v] : GR, d = ve(n.processor) && je(n.processor.normalize) ? n.processor.normalize : KR, p = ve(n.processor) && je(n.processor.interpolate) ? n.processor.interpolate : YR, h = ve(n.processor) && Y(n.processor.type) ? n.processor.type : UR, g = {
    list: a,
    named: c,
    plural: s,
    linked: (v, ...w) => {
      const [b, y] = w;
      let k = "text", C = "";
      w.length === 1 ? Te(b) ? (C = b.modifier || C, k = b.type || k) : Y(b) && (C = b || C) : w.length === 2 && (Y(b) && (C = b || C), Y(y) && (k = y || k));
      const S = u(v)(g), O = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        k === "vnode" && Je(S) && C ? S[0] : S
      );
      return C ? f(C)(O, k) : O;
    },
    message: u,
    type: h,
    interpolate: p,
    normalize: d,
    values: yt({}, o, l)
  };
  return g;
}
let To = null;
function QR(n) {
  To = n;
}
function ZR(n, e, t) {
  To && To.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: n,
    version: e,
    meta: t
  });
}
const e3 = /* @__PURE__ */ t3(
  "function:translate"
  /* IntlifyDevToolsHooks.FunctionTranslate */
);
function t3(n) {
  return (e) => To && To.emit(n, e);
}
const X0 = fd.__EXTEND_POINT__, Yr = Fl(X0), n3 = {
  NOT_FOUND_KEY: X0,
  // 2
  FALLBACK_TO_TRANSLATE: Yr(),
  // 3
  CANNOT_FORMAT_NUMBER: Yr(),
  // 4
  FALLBACK_TO_NUMBER_FORMAT: Yr(),
  // 5
  CANNOT_FORMAT_DATE: Yr(),
  // 6
  FALLBACK_TO_DATE_FORMAT: Yr(),
  // 7
  EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: Yr(),
  // 8
  __EXTEND_POINT__: Yr()
  // 9
}, J0 = ie.__EXTEND_POINT__, qr = Fl(J0), yn = {
  INVALID_ARGUMENT: J0,
  // 17
  INVALID_DATE_ARGUMENT: qr(),
  // 18
  INVALID_ISO_DATE_ARGUMENT: qr(),
  // 19
  NOT_SUPPORT_NON_STRING_MESSAGE: qr(),
  // 20
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: qr(),
  // 21
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: qr(),
  // 22
  NOT_SUPPORT_LOCALE_TYPE: qr(),
  // 23
  __EXTEND_POINT__: qr()
  // 24
};
function Dn(n) {
  return xs(n, null, void 0);
}
function hd(n, e) {
  return e.locale != null ? Em(e.locale) : Em(n.locale);
}
let $c;
function Em(n) {
  if (Y(n))
    return n;
  if (je(n)) {
    if (n.resolvedOnce && $c != null)
      return $c;
    if (n.constructor.name === "Function") {
      const e = n();
      if (tR(e))
        throw Dn(yn.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return $c = e;
    } else
      throw Dn(yn.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw Dn(yn.NOT_SUPPORT_LOCALE_TYPE);
}
function r3(n, e, t) {
  return [.../* @__PURE__ */ new Set([
    t,
    ...Je(e) ? e : Te(e) ? Object.keys(e) : Y(e) ? [e] : [t]
  ])];
}
function Q0(n, e, t) {
  const r = Y(t) ? t : Oo, i = n;
  i.__localeChainCache || (i.__localeChainCache = /* @__PURE__ */ new Map());
  let s = i.__localeChainCache.get(r);
  if (!s) {
    s = [];
    let o = [t];
    for (; Je(o); )
      o = Mm(s, o, e);
    const a = Je(e) || !ve(e) ? e : e.default ? e.default : null;
    o = Y(a) ? [a] : a, Je(o) && Mm(s, o, !1), i.__localeChainCache.set(r, s);
  }
  return s;
}
function Mm(n, e, t) {
  let r = !0;
  for (let i = 0; i < e.length && Pe(r); i++) {
    const s = e[i];
    Y(s) && (r = i3(n, e[i], t));
  }
  return r;
}
function i3(n, e, t) {
  let r;
  const i = e.split("-");
  do {
    const s = i.join("-");
    r = s3(n, s, t), i.splice(-1, 1);
  } while (i.length && r === !0);
  return r;
}
function s3(n, e, t) {
  let r = !1;
  if (!n.includes(e) && (r = !0, e)) {
    r = e[e.length - 1] !== "!";
    const i = e.replace(/!/g, "");
    n.push(i), (Je(t) || ve(t)) && t[i] && (r = t[i]);
  }
  return r;
}
const o3 = "9.14.0", $l = -1, Oo = "en-US", Am = "", Nm = (n) => `${n.charAt(0).toLocaleUpperCase()}${n.substr(1)}`;
function a3() {
  return {
    upper: (n, e) => e === "text" && Y(n) ? n.toUpperCase() : e === "vnode" && Te(n) && "__v_isVNode" in n ? n.children.toUpperCase() : n,
    lower: (n, e) => e === "text" && Y(n) ? n.toLowerCase() : e === "vnode" && Te(n) && "__v_isVNode" in n ? n.children.toLowerCase() : n,
    capitalize: (n, e) => e === "text" && Y(n) ? Nm(n) : e === "vnode" && Te(n) && "__v_isVNode" in n ? Nm(n.children) : n
  };
}
let Z0;
function Pm(n) {
  Z0 = n;
}
let eb;
function l3(n) {
  eb = n;
}
let tb;
function c3(n) {
  tb = n;
}
let nb = null;
const u3 = /* @__NO_SIDE_EFFECTS__ */ (n) => {
  nb = n;
}, f3 = /* @__NO_SIDE_EFFECTS__ */ () => nb;
let rb = null;
const Im = (n) => {
  rb = n;
}, d3 = () => rb;
let Dm = 0;
function h3(n = {}) {
  const e = je(n.onWarn) ? n.onWarn : iR, t = Y(n.version) ? n.version : o3, r = Y(n.locale) || je(n.locale) ? n.locale : Oo, i = je(r) ? Oo : r, s = Je(n.fallbackLocale) || ve(n.fallbackLocale) || Y(n.fallbackLocale) || n.fallbackLocale === !1 ? n.fallbackLocale : i, o = ve(n.messages) ? n.messages : { [i]: {} }, a = ve(n.datetimeFormats) ? n.datetimeFormats : { [i]: {} }, l = ve(n.numberFormats) ? n.numberFormats : { [i]: {} }, c = yt({}, n.modifiers || {}, a3()), u = n.pluralRules || {}, f = je(n.missing) ? n.missing : null, d = Pe(n.missingWarn) || ds(n.missingWarn) ? n.missingWarn : !0, p = Pe(n.fallbackWarn) || ds(n.fallbackWarn) ? n.fallbackWarn : !0, h = !!n.fallbackFormat, m = !!n.unresolving, g = je(n.postTranslation) ? n.postTranslation : null, v = ve(n.processor) ? n.processor : null, w = Pe(n.warnHtmlMessage) ? n.warnHtmlMessage : !0, b = !!n.escapeParameter, y = je(n.messageCompiler) ? n.messageCompiler : Z0, k = je(n.messageResolver) ? n.messageResolver : eb || zR, C = je(n.localeFallbacker) ? n.localeFallbacker : tb || r3, S = Te(n.fallbackContext) ? n.fallbackContext : void 0, O = n, T = Te(O.__datetimeFormatters) ? O.__datetimeFormatters : /* @__PURE__ */ new Map(), V = Te(O.__numberFormatters) ? O.__numberFormatters : /* @__PURE__ */ new Map(), X = Te(O.__meta) ? O.__meta : {};
  Dm++;
  const W = {
    version: t,
    cid: Dm,
    locale: r,
    fallbackLocale: s,
    messages: o,
    modifiers: c,
    pluralRules: u,
    missing: f,
    missingWarn: d,
    fallbackWarn: p,
    fallbackFormat: h,
    unresolving: m,
    postTranslation: g,
    processor: v,
    warnHtmlMessage: w,
    escapeParameter: b,
    messageCompiler: y,
    messageResolver: k,
    localeFallbacker: C,
    fallbackContext: S,
    onWarn: e,
    __meta: X
  };
  return W.datetimeFormats = a, W.numberFormats = l, W.__datetimeFormatters = T, W.__numberFormatters = V, __INTLIFY_PROD_DEVTOOLS__ && ZR(W, t, X), W;
}
function pd(n, e, t, r, i) {
  const { missing: s, onWarn: o } = n;
  if (s !== null) {
    const a = s(n, t, e, i);
    return Y(a) ? a : e;
  } else
    return e;
}
function Ls(n, e, t) {
  const r = n;
  r.__localeChainCache = /* @__PURE__ */ new Map(), n.localeFallbacker(n, t, e);
}
function p3(n, e) {
  return n === e ? !1 : n.split("-")[0] === e.split("-")[0];
}
function m3(n, e) {
  const t = e.indexOf(n);
  if (t === -1)
    return !1;
  for (let r = t + 1; r < e.length; r++)
    if (p3(n, e[r]))
      return !0;
  return !1;
}
function Bc(n) {
  return (t) => g3(t, n);
}
function g3(n, e) {
  const t = e.b || e.body;
  if ((t.t || t.type) === 1) {
    const r = t, i = r.c || r.cases;
    return n.plural(i.reduce((s, o) => [
      ...s,
      Lm(n, o)
    ], []));
  } else
    return Lm(n, t);
}
function Lm(n, e) {
  const t = e.s || e.static;
  if (t)
    return n.type === "text" ? t : n.normalize([t]);
  {
    const r = (e.i || e.items).reduce((i, s) => [...i, zu(n, s)], []);
    return n.normalize(r);
  }
}
function zu(n, e) {
  const t = e.t || e.type;
  switch (t) {
    case 3: {
      const r = e;
      return r.v || r.value;
    }
    case 9: {
      const r = e;
      return r.v || r.value;
    }
    case 4: {
      const r = e;
      return n.interpolate(n.named(r.k || r.key));
    }
    case 5: {
      const r = e;
      return n.interpolate(n.list(r.i != null ? r.i : r.index));
    }
    case 6: {
      const r = e, i = r.m || r.modifier;
      return n.linked(zu(n, r.k || r.key), i ? zu(n, i) : void 0, n.type);
    }
    case 7: {
      const r = e;
      return r.v || r.value;
    }
    case 8: {
      const r = e;
      return r.v || r.value;
    }
    default:
      throw new Error(`unhandled node type on format message part: ${t}`);
  }
}
const ib = (n) => n;
let Wi = /* @__PURE__ */ Object.create(null);
const ps = (n) => Te(n) && (n.t === 0 || n.type === 0) && ("b" in n || "body" in n);
function sb(n, e = {}) {
  let t = !1;
  const r = e.onError || fR;
  return e.onError = (i) => {
    t = !0, r(i);
  }, { ...DR(n, e), detectError: t };
}
const y3 = /* @__NO_SIDE_EFFECTS__ */ (n, e) => {
  if (!Y(n))
    throw Dn(yn.NOT_SUPPORT_NON_STRING_MESSAGE);
  {
    Pe(e.warnHtmlMessage) && e.warnHtmlMessage;
    const r = (e.onCacheKey || ib)(n), i = Wi[r];
    if (i)
      return i;
    const { code: s, detectError: o } = sb(n, e), a = new Function(`return ${s}`)();
    return o ? a : Wi[r] = a;
  }
};
function v3(n, e) {
  if (__INTLIFY_JIT_COMPILATION__ && !__INTLIFY_DROP_MESSAGE_COMPILER__ && Y(n)) {
    Pe(e.warnHtmlMessage) && e.warnHtmlMessage;
    const r = (e.onCacheKey || ib)(n), i = Wi[r];
    if (i)
      return i;
    const { ast: s, detectError: o } = sb(n, {
      ...e,
      location: !1,
      jit: !0
    }), a = Bc(s);
    return o ? a : Wi[r] = a;
  } else {
    const t = n.cacheKey;
    if (t) {
      const r = Wi[t];
      return r || (Wi[t] = Bc(n));
    } else
      return Bc(n);
  }
}
const Rm = () => "", Zt = (n) => je(n);
function Fm(n, ...e) {
  const { fallbackFormat: t, postTranslation: r, unresolving: i, messageCompiler: s, fallbackLocale: o, messages: a } = n, [l, c] = Hu(...e), u = Pe(c.missingWarn) ? c.missingWarn : n.missingWarn, f = Pe(c.fallbackWarn) ? c.fallbackWarn : n.fallbackWarn, d = Pe(c.escapeParameter) ? c.escapeParameter : n.escapeParameter, p = !!c.resolvedMessage, h = Y(c.default) || Pe(c.default) ? Pe(c.default) ? s ? l : () => l : c.default : t ? s ? l : () => l : "", m = t || h !== "", g = hd(n, c);
  d && b3(c);
  let [v, w, b] = p ? [
    l,
    g,
    a[g] || {}
  ] : ob(n, l, g, o, f, u), y = v, k = l;
  if (!p && !(Y(y) || ps(y) || Zt(y)) && m && (y = h, k = y), !p && (!(Y(y) || ps(y) || Zt(y)) || !Y(w)))
    return i ? $l : l;
  let C = !1;
  const S = () => {
    C = !0;
  }, O = Zt(y) ? y : ab(n, l, w, y, k, S);
  if (C)
    return y;
  const T = _3(n, w, b, c), V = JR(T), X = w3(n, O, V), W = r ? r(X, l) : X;
  if (__INTLIFY_PROD_DEVTOOLS__) {
    const Q = {
      timestamp: Date.now(),
      key: Y(l) ? l : Zt(y) ? y.key : "",
      locale: w || (Zt(y) ? y.locale : ""),
      format: Y(y) ? y : Zt(y) ? y.source : "",
      message: W
    };
    Q.meta = yt({}, n.__meta, /* @__PURE__ */ f3() || {}), e3(Q);
  }
  return W;
}
function b3(n) {
  Je(n.list) ? n.list = n.list.map((e) => Y(e) ? Cm(e) : e) : Te(n.named) && Object.keys(n.named).forEach((e) => {
    Y(n.named[e]) && (n.named[e] = Cm(n.named[e]));
  });
}
function ob(n, e, t, r, i, s) {
  const { messages: o, onWarn: a, messageResolver: l, localeFallbacker: c } = n, u = c(n, r, t);
  let f = {}, d, p = null;
  const h = "translate";
  for (let m = 0; m < u.length && (d = u[m], f = o[d] || {}, (p = l(f, e)) === null && (p = f[e]), !(Y(p) || ps(p) || Zt(p))); m++)
    if (!m3(d, u)) {
      const g = pd(
        n,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        e,
        d,
        s,
        h
      );
      g !== e && (p = g);
    }
  return [p, d, f];
}
function ab(n, e, t, r, i, s) {
  const { messageCompiler: o, warnHtmlMessage: a } = n;
  if (Zt(r)) {
    const c = r;
    return c.locale = c.locale || t, c.key = c.key || e, c;
  }
  if (o == null) {
    const c = () => r;
    return c.locale = t, c.key = e, c;
  }
  const l = o(r, C3(n, t, i, r, a, s));
  return l.locale = t, l.key = e, l.source = r, l;
}
function w3(n, e, t) {
  return e(t);
}
function Hu(...n) {
  const [e, t, r] = n, i = {};
  if (!Y(e) && !mt(e) && !Zt(e) && !ps(e))
    throw Dn(yn.INVALID_ARGUMENT);
  const s = mt(e) ? String(e) : (Zt(e), e);
  return mt(t) ? i.plural = t : Y(t) ? i.default = t : ve(t) && !Rl(t) ? i.named = t : Je(t) && (i.list = t), mt(r) ? i.plural = r : Y(r) ? i.default = r : ve(r) && yt(i, r), [s, i];
}
function C3(n, e, t, r, i, s) {
  return {
    locale: e,
    key: t,
    warnHtmlMessage: i,
    onError: (o) => {
      throw s && s(o), o;
    },
    onCacheKey: (o) => JL(e, t, o)
  };
}
function _3(n, e, t, r) {
  const { modifiers: i, pluralRules: s, messageResolver: o, fallbackLocale: a, fallbackWarn: l, missingWarn: c, fallbackContext: u } = n, d = {
    locale: e,
    modifiers: i,
    pluralRules: s,
    messages: (p) => {
      let h = o(t, p);
      if (h == null && u) {
        const [, , m] = ob(u, p, e, a, l, c);
        h = o(m, p);
      }
      if (Y(h) || ps(h)) {
        let m = !1;
        const v = ab(n, p, e, h, p, () => {
          m = !0;
        });
        return m ? Rm : v;
      } else return Zt(h) ? h : Rm;
    }
  };
  return n.processor && (d.processor = n.processor), r.list && (d.list = r.list), r.named && (d.named = r.named), mt(r.plural) && (d.pluralIndex = r.plural), d;
}
function $m(n, ...e) {
  const { datetimeFormats: t, unresolving: r, fallbackLocale: i, onWarn: s, localeFallbacker: o } = n, { __datetimeFormatters: a } = n, [l, c, u, f] = Gu(...e), d = Pe(u.missingWarn) ? u.missingWarn : n.missingWarn;
  Pe(u.fallbackWarn) ? u.fallbackWarn : n.fallbackWarn;
  const p = !!u.part, h = hd(n, u), m = o(
    n,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    i,
    h
  );
  if (!Y(l) || l === "")
    return new Intl.DateTimeFormat(h, f).format(c);
  let g = {}, v, w = null;
  const b = "datetime format";
  for (let C = 0; C < m.length && (v = m[C], g = t[v] || {}, w = g[l], !ve(w)); C++)
    pd(n, l, v, d, b);
  if (!ve(w) || !Y(v))
    return r ? $l : l;
  let y = `${v}__${l}`;
  Rl(f) || (y = `${y}__${JSON.stringify(f)}`);
  let k = a.get(y);
  return k || (k = new Intl.DateTimeFormat(v, yt({}, w, f)), a.set(y, k)), p ? k.formatToParts(c) : k.format(c);
}
const lb = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function Gu(...n) {
  const [e, t, r, i] = n, s = {};
  let o = {}, a;
  if (Y(e)) {
    const l = e.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!l)
      throw Dn(yn.INVALID_ISO_DATE_ARGUMENT);
    const c = l[3] ? l[3].trim().startsWith("T") ? `${l[1].trim()}${l[3].trim()}` : `${l[1].trim()}T${l[3].trim()}` : l[1].trim();
    a = new Date(c);
    try {
      a.toISOString();
    } catch {
      throw Dn(yn.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (ZL(e)) {
    if (isNaN(e.getTime()))
      throw Dn(yn.INVALID_DATE_ARGUMENT);
    a = e;
  } else if (mt(e))
    a = e;
  else
    throw Dn(yn.INVALID_ARGUMENT);
  return Y(t) ? s.key = t : ve(t) && Object.keys(t).forEach((l) => {
    lb.includes(l) ? o[l] = t[l] : s[l] = t[l];
  }), Y(r) ? s.locale = r : ve(r) && (o = r), ve(i) && (o = i), [s.key || "", a, s, o];
}
function Bm(n, e, t) {
  const r = n;
  for (const i in t) {
    const s = `${e}__${i}`;
    r.__datetimeFormatters.has(s) && r.__datetimeFormatters.delete(s);
  }
}
function jm(n, ...e) {
  const { numberFormats: t, unresolving: r, fallbackLocale: i, onWarn: s, localeFallbacker: o } = n, { __numberFormatters: a } = n, [l, c, u, f] = Wu(...e), d = Pe(u.missingWarn) ? u.missingWarn : n.missingWarn;
  Pe(u.fallbackWarn) ? u.fallbackWarn : n.fallbackWarn;
  const p = !!u.part, h = hd(n, u), m = o(
    n,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    i,
    h
  );
  if (!Y(l) || l === "")
    return new Intl.NumberFormat(h, f).format(c);
  let g = {}, v, w = null;
  const b = "number format";
  for (let C = 0; C < m.length && (v = m[C], g = t[v] || {}, w = g[l], !ve(w)); C++)
    pd(n, l, v, d, b);
  if (!ve(w) || !Y(v))
    return r ? $l : l;
  let y = `${v}__${l}`;
  Rl(f) || (y = `${y}__${JSON.stringify(f)}`);
  let k = a.get(y);
  return k || (k = new Intl.NumberFormat(v, yt({}, w, f)), a.set(y, k)), p ? k.formatToParts(c) : k.format(c);
}
const cb = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function Wu(...n) {
  const [e, t, r, i] = n, s = {};
  let o = {};
  if (!mt(e))
    throw Dn(yn.INVALID_ARGUMENT);
  const a = e;
  return Y(t) ? s.key = t : ve(t) && Object.keys(t).forEach((l) => {
    cb.includes(l) ? o[l] = t[l] : s[l] = t[l];
  }), Y(r) ? s.locale = r : ve(r) && (o = r), ve(i) && (o = i), [s.key || "", a, s, o];
}
function Vm(n, e, t) {
  const r = n;
  for (const i in t) {
    const s = `${e}__${i}`;
    r.__numberFormatters.has(s) && r.__numberFormatters.delete(s);
  }
}
LR();
/*!
  * vue-i18n v9.14.0
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
const S3 = "9.14.0";
function x3() {
  typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (qn().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (qn().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_JIT_COMPILATION__ != "boolean" && (qn().__INTLIFY_JIT_COMPILATION__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (qn().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (qn().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const ub = n3.__EXTEND_POINT__, Wn = Fl(ub);
Wn(), Wn(), Wn(), Wn(), Wn(), Wn(), Wn(), Wn(), Wn();
const fb = yn.__EXTEND_POINT__, At = Fl(fb), Zn = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: fb,
  // 24
  // legacy module errors
  INVALID_ARGUMENT: At(),
  // 25
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: At(),
  // 26
  NOT_INSTALLED: At(),
  // 27
  NOT_AVAILABLE_IN_LEGACY_MODE: At(),
  // 28
  // directive module errors
  REQUIRED_VALUE: At(),
  // 29
  INVALID_VALUE: At(),
  // 30
  // vue-devtools errors
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: At(),
  // 31
  NOT_INSTALLED_WITH_PROVIDE: At(),
  // 32
  // unexpected error
  UNEXPECTED_ERROR: At(),
  // 33
  // not compatible legacy vue-i18n constructor
  NOT_COMPATIBLE_LEGACY_VUE_I18N: At(),
  // 34
  // bridge support vue 2.x only
  BRIDGE_SUPPORT_VUE_2_ONLY: At(),
  // 35
  // need to define `i18n` option in `allowComposition: true` and `useScope: 'local' at `useI18n``
  MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: At(),
  // 36
  // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: At(),
  // 37
  // for enhancement
  __EXTEND_POINT__: At()
  // 38
};
function Mr(n, ...e) {
  return xs(n, null, void 0);
}
const Uu = /* @__PURE__ */ Ei("__translateVNode"), Ku = /* @__PURE__ */ Ei("__datetimeParts"), Yu = /* @__PURE__ */ Ei("__numberParts"), k3 = Ei("__setPluralRules"), db = /* @__PURE__ */ Ei("__injectWithOption"), qu = /* @__PURE__ */ Ei("__dispose");
function Eo(n) {
  if (!Te(n))
    return n;
  for (const e in n)
    if (il(n, e))
      if (!e.includes("."))
        Te(n[e]) && Eo(n[e]);
      else {
        const t = e.split("."), r = t.length - 1;
        let i = n, s = !1;
        for (let o = 0; o < r; o++) {
          if (t[o] in i || (i[t[o]] = {}), !Te(i[t[o]])) {
            s = !0;
            break;
          }
          i = i[t[o]];
        }
        s || (i[t[r]] = n[e], delete n[e]), Te(i[t[r]]) && Eo(i[t[r]]);
      }
  return n;
}
function md(n, e) {
  const { messages: t, __i18n: r, messageResolver: i, flatJson: s } = e, o = ve(t) ? t : Je(r) ? {} : { [n]: {} };
  if (Je(r) && r.forEach((a) => {
    if ("locale" in a && "resource" in a) {
      const { locale: l, resource: c } = a;
      l ? (o[l] = o[l] || {}, Ia(c, o[l])) : Ia(c, o);
    } else
      Y(a) && Ia(JSON.parse(a), o);
  }), i == null && s)
    for (const a in o)
      il(o, a) && Eo(o[a]);
  return o;
}
function hb(n) {
  return n.type;
}
function T3(n, e, t) {
  let r = Te(e.messages) ? e.messages : {};
  "__i18nGlobal" in t && (r = md(n.locale.value, {
    messages: r,
    __i18n: t.__i18nGlobal
  }));
  const i = Object.keys(r);
  i.length && i.forEach((s) => {
    n.mergeLocaleMessage(s, r[s]);
  });
  {
    if (Te(e.datetimeFormats)) {
      const s = Object.keys(e.datetimeFormats);
      s.length && s.forEach((o) => {
        n.mergeDateTimeFormat(o, e.datetimeFormats[o]);
      });
    }
    if (Te(e.numberFormats)) {
      const s = Object.keys(e.numberFormats);
      s.length && s.forEach((o) => {
        n.mergeNumberFormat(o, e.numberFormats[o]);
      });
    }
  }
}
function zm(n) {
  return D(Mb, null, n, 0);
}
const Hm = "__INTLIFY_META__", Gm = () => [], O3 = () => !1;
let Wm = 0;
function Um(n) {
  return (e, t, r, i) => n(t, r, Ci() || void 0, i);
}
const E3 = /* @__NO_SIDE_EFFECTS__ */ () => {
  const n = Ci();
  let e = null;
  return n && (e = hb(n)[Hm]) ? { [Hm]: e } : null;
};
function M3(n = {}, e) {
  const { __root: t, __injectWithOption: r } = n, i = t === void 0, s = n.flatJson, o = bm ? qe : Xu, a = !!n.translateExistCompatible;
  let l = Pe(n.inheritLocale) ? n.inheritLocale : !0;
  const c = o(
    // prettier-ignore
    t && l ? t.locale.value : Y(n.locale) ? n.locale : Oo
  ), u = o(
    // prettier-ignore
    t && l ? t.fallbackLocale.value : Y(n.fallbackLocale) || Je(n.fallbackLocale) || ve(n.fallbackLocale) || n.fallbackLocale === !1 ? n.fallbackLocale : c.value
  ), f = o(md(c.value, n)), d = o(ve(n.datetimeFormats) ? n.datetimeFormats : { [c.value]: {} }), p = o(ve(n.numberFormats) ? n.numberFormats : { [c.value]: {} });
  let h = t ? t.missingWarn : Pe(n.missingWarn) || ds(n.missingWarn) ? n.missingWarn : !0, m = t ? t.fallbackWarn : Pe(n.fallbackWarn) || ds(n.fallbackWarn) ? n.fallbackWarn : !0, g = t ? t.fallbackRoot : Pe(n.fallbackRoot) ? n.fallbackRoot : !0, v = !!n.fallbackFormat, w = je(n.missing) ? n.missing : null, b = je(n.missing) ? Um(n.missing) : null, y = je(n.postTranslation) ? n.postTranslation : null, k = t ? t.warnHtmlMessage : Pe(n.warnHtmlMessage) ? n.warnHtmlMessage : !0, C = !!n.escapeParameter;
  const S = t ? t.modifiers : ve(n.modifiers) ? n.modifiers : {};
  let O = n.pluralRules || t && t.pluralRules, T;
  T = (() => {
    i && Im(null);
    const M = {
      version: S3,
      locale: c.value,
      fallbackLocale: u.value,
      messages: f.value,
      modifiers: S,
      pluralRules: O,
      missing: b === null ? void 0 : b,
      missingWarn: h,
      fallbackWarn: m,
      fallbackFormat: v,
      unresolving: !0,
      postTranslation: y === null ? void 0 : y,
      warnHtmlMessage: k,
      escapeParameter: C,
      messageResolver: n.messageResolver,
      messageCompiler: n.messageCompiler,
      __meta: { framework: "vue" }
    };
    M.datetimeFormats = d.value, M.numberFormats = p.value, M.__datetimeFormatters = ve(T) ? T.__datetimeFormatters : void 0, M.__numberFormatters = ve(T) ? T.__numberFormatters : void 0;
    const L = h3(M);
    return i && Im(L), L;
  })(), Ls(T, c.value, u.value);
  function X() {
    return [
      c.value,
      u.value,
      f.value,
      d.value,
      p.value
    ];
  }
  const W = Ie({
    get: () => c.value,
    set: (M) => {
      c.value = M, T.locale = c.value;
    }
  }), Q = Ie({
    get: () => u.value,
    set: (M) => {
      u.value = M, T.fallbackLocale = u.value, Ls(T, c.value, M);
    }
  }), Me = Ie(() => f.value), Ae = /* @__PURE__ */ Ie(() => d.value), be = /* @__PURE__ */ Ie(() => p.value);
  function Ee() {
    return je(y) ? y : null;
  }
  function _e(M) {
    y = M, T.postTranslation = M;
  }
  function Ze() {
    return w;
  }
  function et(M) {
    M !== null && (b = Um(M)), w = M, T.missing = b;
  }
  const Ge = (M, L, Se, ze, Tn, Mi) => {
    X();
    let ar;
    try {
      __INTLIFY_PROD_DEVTOOLS__, i || (T.fallbackContext = t ? d3() : void 0), ar = M(T);
    } finally {
      __INTLIFY_PROD_DEVTOOLS__, i || (T.fallbackContext = void 0);
    }
    if (Se !== "translate exists" && // for not `te` (e.g `t`)
    mt(ar) && ar === $l || Se === "translate exists" && !ar) {
      const [jl, A] = L();
      return t && g ? ze(t) : Tn(jl);
    } else {
      if (Mi(ar))
        return ar;
      throw Mr(Zn.UNEXPECTED_RETURN_TYPE);
    }
  };
  function Ue(...M) {
    return Ge((L) => Reflect.apply(Fm, null, [L, ...M]), () => Hu(...M), "translate", (L) => Reflect.apply(L.t, L, [...M]), (L) => L, (L) => Y(L));
  }
  function ht(...M) {
    const [L, Se, ze] = M;
    if (ze && !Te(ze))
      throw Mr(Zn.INVALID_ARGUMENT);
    return Ue(L, Se, yt({ resolvedMessage: !0 }, ze || {}));
  }
  function tt(...M) {
    return Ge((L) => Reflect.apply($m, null, [L, ...M]), () => Gu(...M), "datetime format", (L) => Reflect.apply(L.d, L, [...M]), () => Am, (L) => Y(L));
  }
  function Ye(...M) {
    return Ge((L) => Reflect.apply(jm, null, [L, ...M]), () => Wu(...M), "number format", (L) => Reflect.apply(L.n, L, [...M]), () => Am, (L) => Y(L));
  }
  function ue(M) {
    return M.map((L) => Y(L) || mt(L) || Pe(L) ? zm(String(L)) : L);
  }
  const wt = {
    normalize: ue,
    interpolate: (M) => M,
    type: "vnode"
  };
  function Wt(...M) {
    return Ge(
      (L) => {
        let Se;
        const ze = L;
        try {
          ze.processor = wt, Se = Reflect.apply(Fm, null, [ze, ...M]);
        } finally {
          ze.processor = null;
        }
        return Se;
      },
      () => Hu(...M),
      "translate",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (L) => L[Uu](...M),
      (L) => [zm(L)],
      (L) => Je(L)
    );
  }
  function Ct(...M) {
    return Ge(
      (L) => Reflect.apply(jm, null, [L, ...M]),
      () => Wu(...M),
      "number format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (L) => L[Yu](...M),
      Gm,
      (L) => Y(L) || Je(L)
    );
  }
  function Ut(...M) {
    return Ge(
      (L) => Reflect.apply($m, null, [L, ...M]),
      () => Gu(...M),
      "datetime format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (L) => L[Ku](...M),
      Gm,
      (L) => Y(L) || Je(L)
    );
  }
  function xn(M) {
    O = M, T.pluralRules = O;
  }
  function fn(M, L) {
    return Ge(() => {
      if (!M)
        return !1;
      const Se = Y(L) ? L : c.value, ze = Kt(Se), Tn = T.messageResolver(ze, M);
      return a ? Tn != null : ps(Tn) || Zt(Tn) || Y(Tn);
    }, () => [M], "translate exists", (Se) => Reflect.apply(Se.te, Se, [M, L]), O3, (Se) => Pe(Se));
  }
  function $(M) {
    let L = null;
    const Se = Q0(T, u.value, c.value);
    for (let ze = 0; ze < Se.length; ze++) {
      const Tn = f.value[Se[ze]] || {}, Mi = T.messageResolver(Tn, M);
      if (Mi != null) {
        L = Mi;
        break;
      }
    }
    return L;
  }
  function me(M) {
    const L = $(M);
    return L ?? (t ? t.tm(M) || {} : {});
  }
  function Kt(M) {
    return f.value[M] || {};
  }
  function Yt(M, L) {
    if (s) {
      const Se = { [M]: L };
      for (const ze in Se)
        il(Se, ze) && Eo(Se[ze]);
      L = Se[M];
    }
    f.value[M] = L, T.messages = f.value;
  }
  function kn(M, L) {
    f.value[M] = f.value[M] || {};
    const Se = { [M]: L };
    if (s)
      for (const ze in Se)
        il(Se, ze) && Eo(Se[ze]);
    L = Se[M], Ia(L, f.value[M]), T.messages = f.value;
  }
  function or(M) {
    return d.value[M] || {};
  }
  function _(M, L) {
    d.value[M] = L, T.datetimeFormats = d.value, Bm(T, M, L);
  }
  function x(M, L) {
    d.value[M] = yt(d.value[M] || {}, L), T.datetimeFormats = d.value, Bm(T, M, L);
  }
  function P(M) {
    return p.value[M] || {};
  }
  function U(M, L) {
    p.value[M] = L, T.numberFormats = p.value, Vm(T, M, L);
  }
  function ke(M, L) {
    p.value[M] = yt(p.value[M] || {}, L), T.numberFormats = p.value, Vm(T, M, L);
  }
  Wm++, t && bm && (Fn(t.locale, (M) => {
    l && (c.value = M, T.locale = M, Ls(T, c.value, u.value));
  }), Fn(t.fallbackLocale, (M) => {
    l && (u.value = M, T.fallbackLocale = M, Ls(T, c.value, u.value));
  }));
  const re = {
    id: Wm,
    locale: W,
    fallbackLocale: Q,
    get inheritLocale() {
      return l;
    },
    set inheritLocale(M) {
      l = M, M && t && (c.value = t.locale.value, u.value = t.fallbackLocale.value, Ls(T, c.value, u.value));
    },
    get availableLocales() {
      return Object.keys(f.value).sort();
    },
    messages: Me,
    get modifiers() {
      return S;
    },
    get pluralRules() {
      return O || {};
    },
    get isGlobal() {
      return i;
    },
    get missingWarn() {
      return h;
    },
    set missingWarn(M) {
      h = M, T.missingWarn = h;
    },
    get fallbackWarn() {
      return m;
    },
    set fallbackWarn(M) {
      m = M, T.fallbackWarn = m;
    },
    get fallbackRoot() {
      return g;
    },
    set fallbackRoot(M) {
      g = M;
    },
    get fallbackFormat() {
      return v;
    },
    set fallbackFormat(M) {
      v = M, T.fallbackFormat = v;
    },
    get warnHtmlMessage() {
      return k;
    },
    set warnHtmlMessage(M) {
      k = M, T.warnHtmlMessage = M;
    },
    get escapeParameter() {
      return C;
    },
    set escapeParameter(M) {
      C = M, T.escapeParameter = M;
    },
    t: Ue,
    getLocaleMessage: Kt,
    setLocaleMessage: Yt,
    mergeLocaleMessage: kn,
    getPostTranslationHandler: Ee,
    setPostTranslationHandler: _e,
    getMissingHandler: Ze,
    setMissingHandler: et,
    [k3]: xn
  };
  return re.datetimeFormats = Ae, re.numberFormats = be, re.rt = ht, re.te = fn, re.tm = me, re.d = tt, re.n = Ye, re.getDateTimeFormat = or, re.setDateTimeFormat = _, re.mergeDateTimeFormat = x, re.getNumberFormat = P, re.setNumberFormat = U, re.mergeNumberFormat = ke, re[db] = r, re[Uu] = Wt, re[Ku] = Ut, re[Yu] = Ct, re;
}
const gd = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (n) => n === "parent" || n === "global",
    default: "parent"
    /* ComponentI18nScope */
  },
  i18n: {
    type: Object
  }
};
function A3({ slots: n }, e) {
  return e.length === 1 && e[0] === "default" ? (n.default ? n.default() : []).reduce((r, i) => [
    ...r,
    // prettier-ignore
    ...i.type === Ke ? i.children : [i]
  ], []) : e.reduce((t, r) => {
    const i = n[r];
    return i && (t[r] = i()), t;
  }, {});
}
function pb(n) {
  return Ke;
}
yt({
  keypath: {
    type: String,
    required: !0
  },
  plural: {
    type: [Number, String],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validator: (n) => mt(n) || !isNaN(n)
  }
}, gd);
function N3(n) {
  return Je(n) && !Y(n[0]);
}
function mb(n, e, t, r) {
  const { slots: i, attrs: s } = e;
  return () => {
    const o = { part: !0 };
    let a = {};
    n.locale && (o.locale = n.locale), Y(n.format) ? o.key = n.format : Te(n.format) && (Y(n.format.key) && (o.key = n.format.key), a = Object.keys(n.format).reduce((d, p) => t.includes(p) ? yt({}, d, { [p]: n.format[p] }) : d, {}));
    const l = r(n.value, o, a);
    let c = [o.key];
    Je(l) ? c = l.map((d, p) => {
      const h = i[d.type], m = h ? h({ [d.type]: d.value, index: p, parts: l }) : [d.value];
      return N3(m) && (m[0].key = `${d.type}-${p}`), m;
    }) : Y(l) && (c = [l]);
    const u = yt({}, s), f = Y(n.tag) || Te(n.tag) ? n.tag : pb();
    return rr(f, u, c);
  };
}
yt({
  value: {
    type: Number,
    required: !0
  },
  format: {
    type: [String, Object]
  }
}, gd);
yt({
  value: {
    type: [Number, Date],
    required: !0
  },
  format: {
    type: [String, Object]
  }
}, gd);
const P3 = /* @__PURE__ */ Ei("global-vue-i18n");
function Bl(n = {}) {
  const e = Ci();
  if (e == null)
    throw Mr(Zn.MUST_BE_CALL_SETUP_TOP);
  if (!e.isCE && e.appContext.app != null && !e.appContext.app.__VUE_I18N_SYMBOL__)
    throw Mr(Zn.NOT_INSTALLED);
  const t = I3(e), r = L3(t), i = hb(e), s = D3(n, i);
  if (__VUE_I18N_LEGACY_API__ && t.mode === "legacy" && !n.__useComponent) {
    if (!t.allowComposition)
      throw Mr(Zn.NOT_AVAILABLE_IN_LEGACY_MODE);
    return B3(e, s, r, n);
  }
  if (s === "global")
    return T3(r, n, i), r;
  if (s === "parent") {
    let l = R3(t, e, n.__useComponent);
    return l == null && (l = r), l;
  }
  const o = t;
  let a = o.__getInstance(e);
  if (a == null) {
    const l = yt({}, n);
    "__i18n" in i && (l.__i18n = i.__i18n), r && (l.__root = r), a = M3(l), o.__composerExtend && (a[qu] = o.__composerExtend(a)), $3(o, e, a), o.__setInstance(e, a);
  }
  return a;
}
function I3(n) {
  {
    const e = Ob(n.isCE ? P3 : n.appContext.app.__VUE_I18N_SYMBOL__);
    if (!e)
      throw Mr(n.isCE ? Zn.NOT_INSTALLED_WITH_PROVIDE : Zn.UNEXPECTED_ERROR);
    return e;
  }
}
function D3(n, e) {
  return Rl(n) ? "__i18n" in e ? "local" : "global" : n.useScope ? n.useScope : "local";
}
function L3(n) {
  return n.mode === "composition" ? n.global : n.global.__composer;
}
function R3(n, e, t = !1) {
  let r = null;
  const i = e.root;
  let s = F3(e, t);
  for (; s != null; ) {
    const o = n;
    if (n.mode === "composition")
      r = o.__getInstance(s);
    else if (__VUE_I18N_LEGACY_API__) {
      const a = o.__getInstance(s);
      a != null && (r = a.__composer, t && r && !r[db] && (r = null));
    }
    if (r != null || i === s)
      break;
    s = s.parent;
  }
  return r;
}
function F3(n, e = !1) {
  return n == null ? null : e && n.vnode.ctx || n.parent;
}
function $3(n, e, t) {
  _i(() => {
  }, e), Xm(() => {
    const r = t;
    n.__deleteInstance(e);
    const i = r[qu];
    i && (i(), delete r[qu]);
  }, e);
}
function B3(n, e, t, r = {}) {
  const i = e === "local", s = Xu(null);
  if (i && n.proxy && !(n.proxy.$options.i18n || n.proxy.$options.__i18n))
    throw Mr(Zn.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION);
  const o = Pe(r.inheritLocale) ? r.inheritLocale : !Y(r.locale), a = qe(
    // prettier-ignore
    !i || o ? t.locale.value : Y(r.locale) ? r.locale : Oo
  ), l = qe(
    // prettier-ignore
    !i || o ? t.fallbackLocale.value : Y(r.fallbackLocale) || Je(r.fallbackLocale) || ve(r.fallbackLocale) || r.fallbackLocale === !1 ? r.fallbackLocale : a.value
  ), c = qe(md(a.value, r)), u = qe(ve(r.datetimeFormats) ? r.datetimeFormats : { [a.value]: {} }), f = qe(ve(r.numberFormats) ? r.numberFormats : { [a.value]: {} }), d = i ? t.missingWarn : Pe(r.missingWarn) || ds(r.missingWarn) ? r.missingWarn : !0, p = i ? t.fallbackWarn : Pe(r.fallbackWarn) || ds(r.fallbackWarn) ? r.fallbackWarn : !0, h = i ? t.fallbackRoot : Pe(r.fallbackRoot) ? r.fallbackRoot : !0, m = !!r.fallbackFormat, g = je(r.missing) ? r.missing : null, v = je(r.postTranslation) ? r.postTranslation : null, w = i ? t.warnHtmlMessage : Pe(r.warnHtmlMessage) ? r.warnHtmlMessage : !0, b = !!r.escapeParameter, y = i ? t.modifiers : ve(r.modifiers) ? r.modifiers : {}, k = r.pluralRules || i && t.pluralRules;
  function C() {
    return [
      a.value,
      l.value,
      c.value,
      u.value,
      f.value
    ];
  }
  const S = Ie({
    get: () => s.value ? s.value.locale.value : a.value,
    set: ($) => {
      s.value && (s.value.locale.value = $), a.value = $;
    }
  }), O = Ie({
    get: () => s.value ? s.value.fallbackLocale.value : l.value,
    set: ($) => {
      s.value && (s.value.fallbackLocale.value = $), l.value = $;
    }
  }), T = Ie(() => s.value ? s.value.messages.value : c.value), V = Ie(() => u.value), X = Ie(() => f.value);
  function W() {
    return s.value ? s.value.getPostTranslationHandler() : v;
  }
  function Q($) {
    s.value && s.value.setPostTranslationHandler($);
  }
  function Me() {
    return s.value ? s.value.getMissingHandler() : g;
  }
  function Ae($) {
    s.value && s.value.setMissingHandler($);
  }
  function be($) {
    return C(), $();
  }
  function Ee(...$) {
    return s.value ? be(() => Reflect.apply(s.value.t, null, [...$])) : be(() => "");
  }
  function _e(...$) {
    return s.value ? Reflect.apply(s.value.rt, null, [...$]) : "";
  }
  function Ze(...$) {
    return s.value ? be(() => Reflect.apply(s.value.d, null, [...$])) : be(() => "");
  }
  function et(...$) {
    return s.value ? be(() => Reflect.apply(s.value.n, null, [...$])) : be(() => "");
  }
  function Ge($) {
    return s.value ? s.value.tm($) : {};
  }
  function Ue($, me) {
    return s.value ? s.value.te($, me) : !1;
  }
  function ht($) {
    return s.value ? s.value.getLocaleMessage($) : {};
  }
  function tt($, me) {
    s.value && (s.value.setLocaleMessage($, me), c.value[$] = me);
  }
  function Ye($, me) {
    s.value && s.value.mergeLocaleMessage($, me);
  }
  function ue($) {
    return s.value ? s.value.getDateTimeFormat($) : {};
  }
  function Gt($, me) {
    s.value && (s.value.setDateTimeFormat($, me), u.value[$] = me);
  }
  function wt($, me) {
    s.value && s.value.mergeDateTimeFormat($, me);
  }
  function Wt($) {
    return s.value ? s.value.getNumberFormat($) : {};
  }
  function Ct($, me) {
    s.value && (s.value.setNumberFormat($, me), f.value[$] = me);
  }
  function Ut($, me) {
    s.value && s.value.mergeNumberFormat($, me);
  }
  const xn = {
    get id() {
      return s.value ? s.value.id : -1;
    },
    locale: S,
    fallbackLocale: O,
    messages: T,
    datetimeFormats: V,
    numberFormats: X,
    get inheritLocale() {
      return s.value ? s.value.inheritLocale : o;
    },
    set inheritLocale($) {
      s.value && (s.value.inheritLocale = $);
    },
    get availableLocales() {
      return s.value ? s.value.availableLocales : Object.keys(c.value);
    },
    get modifiers() {
      return s.value ? s.value.modifiers : y;
    },
    get pluralRules() {
      return s.value ? s.value.pluralRules : k;
    },
    get isGlobal() {
      return s.value ? s.value.isGlobal : !1;
    },
    get missingWarn() {
      return s.value ? s.value.missingWarn : d;
    },
    set missingWarn($) {
      s.value && (s.value.missingWarn = $);
    },
    get fallbackWarn() {
      return s.value ? s.value.fallbackWarn : p;
    },
    set fallbackWarn($) {
      s.value && (s.value.missingWarn = $);
    },
    get fallbackRoot() {
      return s.value ? s.value.fallbackRoot : h;
    },
    set fallbackRoot($) {
      s.value && (s.value.fallbackRoot = $);
    },
    get fallbackFormat() {
      return s.value ? s.value.fallbackFormat : m;
    },
    set fallbackFormat($) {
      s.value && (s.value.fallbackFormat = $);
    },
    get warnHtmlMessage() {
      return s.value ? s.value.warnHtmlMessage : w;
    },
    set warnHtmlMessage($) {
      s.value && (s.value.warnHtmlMessage = $);
    },
    get escapeParameter() {
      return s.value ? s.value.escapeParameter : b;
    },
    set escapeParameter($) {
      s.value && (s.value.escapeParameter = $);
    },
    t: Ee,
    getPostTranslationHandler: W,
    setPostTranslationHandler: Q,
    getMissingHandler: Me,
    setMissingHandler: Ae,
    rt: _e,
    d: Ze,
    n: et,
    tm: Ge,
    te: Ue,
    getLocaleMessage: ht,
    setLocaleMessage: tt,
    mergeLocaleMessage: Ye,
    getDateTimeFormat: ue,
    setDateTimeFormat: Gt,
    mergeDateTimeFormat: wt,
    getNumberFormat: Wt,
    setNumberFormat: Ct,
    mergeNumberFormat: Ut
  };
  function fn($) {
    $.locale.value = a.value, $.fallbackLocale.value = l.value, Object.keys(c.value).forEach((me) => {
      $.mergeLocaleMessage(me, c.value[me]);
    }), Object.keys(u.value).forEach((me) => {
      $.mergeDateTimeFormat(me, u.value[me]);
    }), Object.keys(f.value).forEach((me) => {
      $.mergeNumberFormat(me, f.value[me]);
    }), $.escapeParameter = b, $.fallbackFormat = m, $.fallbackRoot = h, $.fallbackWarn = p, $.missingWarn = d, $.warnHtmlMessage = w;
  }
  return Eb(() => {
    if (n.proxy == null || n.proxy.$i18n == null)
      throw Mr(Zn.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);
    const $ = s.value = n.proxy.$i18n.__composer;
    e === "global" ? (a.value = $.locale.value, l.value = $.fallbackLocale.value, c.value = $.messages.value, u.value = $.datetimeFormats.value, f.value = $.numberFormats.value) : i && fn($);
  }), xn;
}
x3();
__INTLIFY_JIT_COMPILATION__ ? Pm(v3) : Pm(y3);
l3(HR);
c3(Q0);
if (__INTLIFY_PROD_DEVTOOLS__) {
  const n = qn();
  n.__INTLIFY__ = !0, QR(n.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
const j3 = {}, V3 = { class: "text-lg font-bold" };
function z3(n, e) {
  return I(), B("span", V3, [
    nn(n.$slots, "default")
  ]);
}
const H3 = /* @__PURE__ */ wl(j3, [["render", z3]]), G3 = { class: "flex gap-1" }, W3 = {
  key: 0,
  class: "TheMapAsText select-auto"
}, U3 = ["innerHTML"], K3 = /* @__PURE__ */ he({
  __name: "TheMapAsText",
  setup(n) {
    const { mapFile: e, mapCurrent: t } = Qe(), {
      guest: r,
      patron: i,
      textOf: s,
      textNlAsBr: o,
      textWithoutHTML: a
    } = zt(), l = e.currentMap(new pe()).ref(), c = ka(""), u = ka([]);
    t.objects(
      i.create(
        r.create(ys((v) => {
          u.value = v, o.create(
            s.create(
              v.map((w) => `<div class="TheMapAsText-Item">
                <h3>${w.name}</h3><p>${w.additionalName || ""}</p><p>${w.description || ""}</p><p>${w.additionalFields && Object.values(w.additionalFields).join("</p><p>")}</p></div>`).join("")
            )
          ).asString(
            r.create((w) => {
              c.value = w;
            })
          );
        }, 500))
      )
    );
    const f = Bl(), { share: d, isSupported: p } = S1(), h = () => {
      p.value || alert(f.t("general.notifications.sharingDontSupported")), a.create(
        s.create(
          c.value
        )
      ).asString(
        r.create((v) => {
          d({
            text: v
          });
        })
      );
    }, m = ka(), g = () => {
      var v, w;
      if (l.value) {
        const b = new Range();
        b.setStart(m.value, 0), b.setEnd(m.value, Object.values(u.value).length), (v = document.getSelection()) == null || v.removeAllRanges(), (w = document.getSelection()) == null || w.addRange(b);
      }
    };
    return (v, w) => (I(), rt(Ti, { name: "mapAsText" }, {
      header: H(() => [
        D(H3, { class: "block mb-3" }, {
          default: H(() => [
            ye(Z(v.$t("general.mapAsText")) + " ", 1),
            z("div", G3, [
              D(De, {
                size: "sm",
                type: "success",
                class: "font-normal",
                onClick: h
              }, {
                default: H(() => [
                  ye(Z(v.$t("general.share")), 1)
                ]),
                _: 1
              }),
              D(De, {
                size: "sm",
                type: "primary",
                class: "font-normal",
                onClick: g
              }, {
                default: H(() => [
                  ye(Z(v.$t("general.selectAll")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        })
      ]),
      default: H(() => [
        E(l) ? (I(), B("article", W3, [
          z("div", {
            ref_key: "textRef",
            ref: m,
            innerHTML: E(c)
          }, null, 8, U3)
        ])) : ge("", !0)
      ]),
      _: 1
    }));
  }
}), Y3 = { key: 1 }, q3 = /* @__PURE__ */ he({
  __name: "TheMiniMap",
  setup(n) {
    const { miniMap: e } = Qe(), t = e.points(new pe()).ref(), r = e.size(new pe()).ref(), i = e.viewportSize(new pe()).ref(), s = e.viewportPosition(new pe()).ref();
    return (o, a) => E(r) ? (I(), B("div", {
      key: 0,
      style: An({
        width: `${E(r).width}px`,
        height: `${E(r).height}px`
      }),
      class: "absolute pointer-events-none block bg-white bottom-[10px] mt-3 right-3 z-1 border border-solid border-body-dark"
    }, [
      E(s) ? (I(), B("div", {
        key: 0,
        style: An({
          width: `${E(i).width}px`,
          height: `${E(i).height}px`,
          top: `${E(s).y}px`,
          left: `${E(s).x}px`
        }),
        class: "absolute bg-primary/50"
      }, null, 4)) : ge("", !0),
      E(t) ? (I(), B("div", Y3, [
        (I(!0), B(Ke, null, kt(E(t), (l) => (I(), B("div", {
          key: l.id,
          class: "absolute w-1 h-1 block bg-danger",
          style: An({
            top: `${l.y}px`,
            left: `${l.x}px`,
            width: `${l.width}px`,
            height: `${l.height}px`
          })
        }, null, 4))), 128))
      ])) : ge("", !0)
    ], 4)) : ge("", !0);
  }
}), X3 = { class: "text-lg font-bold" }, J3 = {
  key: 0,
  class: "TheSettings"
}, Q3 = { class: "mb-2" }, Z3 = { class: "TheSettings-Row" }, eF = { class: "flex gap-2 mb-2" }, tF = { class: "mb-2" }, nF = { class: "mb-2" }, rF = {
  href: "https://github.com/kosukhin/mind-map-creator",
  target: "_blank"
}, iF = { class: "flex gap-2" }, sF = /* @__PURE__ */ he({
  __name: "FormSettings",
  setup(n) {
    const {
      modal: e,
      mapFile: t,
      mapRemoved: r,
      mapSettings: i,
      controlCombo: s,
      parentNames: o,
      mapCurrentID: a
    } = Qe(), { patron: l, guest: c } = zt(), u = o.names(new pe()).ref(), f = t.currentMap(new pe()).ref(), d = a.id(new pe()).ref(), p = () => {
      e.give("");
    }, h = () => {
      i.give(f.value.settings), p();
    };
    return s.happenedConditional(
      "KeyS",
      e.openedByName("settings"),
      l.create(c.create(h))
    ), (m, g) => (I(), rt(Ti, { name: "settings" }, {
      header: H(() => [
        z("h2", X3, Z(m.$t("general.mapSettings")), 1)
      ]),
      default: H(() => {
        var v;
        return [
          (v = E(f)) != null && v.settings ? (I(), B("div", J3, [
            z("div", Q3, [
              z("div", Z3, [
                z("div", eF, [
                  E(u).length > 1 ? (I(), rt(De, {
                    key: 0,
                    type: "primary",
                    class: "text-white",
                    onClick: g[0] || (g[0] = (w) => E(e).give("parentTypes"))
                  }, {
                    default: H(() => [
                      ye(Z(m.$t("general.parentTypes")), 1)
                    ]),
                    _: 1
                  })) : ge("", !0),
                  D(De, {
                    type: "primary",
                    class: "text-white",
                    onClick: g[1] || (g[1] = (w) => E(e).give("export"))
                  }, {
                    default: H(() => [
                      ye(Z(m.$t("general.exportOrImport")), 1)
                    ]),
                    _: 1
                  }),
                  D(De, {
                    type: "primary",
                    class: "text-white e2e-open-presets",
                    onClick: g[2] || (g[2] = (w) => E(e).give("presets"))
                  }, {
                    default: H(() => g[6] || (g[6] = [
                      ye(" Пресеты ")
                    ])),
                    _: 1
                  })
                ])
              ]),
              z("div", tF, [
                z("label", null, [
                  z("b", null, Z(m.$t("general.mapName")), 1),
                  D(Mn, {
                    modelValue: E(f).settings.title,
                    "onUpdate:modelValue": g[3] || (g[3] = (w) => E(f).settings.title = w)
                  }, null, 8, ["modelValue"])
                ])
              ]),
              z("div", nF, [
                z("a", rF, Z(m.$t("general.githubRepo")), 1)
              ])
            ]),
            z("div", iF, [
              D(De, {
                class: "TheSettings-Button",
                type: "success",
                onClick: g[4] || (g[4] = (w) => h())
              }, {
                default: H(() => [
                  ye(Z(m.$t("general.save")), 1)
                ]),
                _: 1
              }),
              D(De, {
                class: "TheSettings-Button",
                onClick: p
              }, {
                default: H(() => [
                  ye(Z(m.$t("general.cancel")), 1)
                ]),
                _: 1
              }),
              D(De, {
                class: "TheSettings-Button",
                type: "danger",
                onClick: g[5] || (g[5] = (w) => {
                  E(r).give(E(d)), p();
                })
              }, {
                default: H(() => [
                  ye(Z(m.$t("general.removeMap")), 1)
                ]),
                _: 1
              })
            ])
          ])) : ge("", !0)
        ];
      }),
      _: 1
    }));
  }
}), oF = {}, aF = { class: "BaseGroup" };
function lF(n, e) {
  return I(), B("div", aF, [
    nn(n.$slots, "default")
  ]);
}
const cF = /* @__PURE__ */ wl(oF, [["render", lF]]), uF = "default", fF = /* @__PURE__ */ he({
  __name: "TheLinker",
  setup(n) {
    const { mapObjectsLink: e } = Qe(), t = e.objectIds(new pe([])).ref();
    return (r, i) => (I(), rt(De, {
      type: uF,
      onClick: i[0] || (i[0] = (s) => E(e).startLink())
    }, {
      default: H(() => [
        ye(Z(E(t).length === 1 ? "Выбиретие объект" : E(t).length === 2 ? "Второй объект" : "Связать объекты"), 1)
      ]),
      _: 1
    }));
  }
}), dF = { class: "flex e2e-sidebar flex-col items-center gap-3 max-h-[100%] overflow-hidden" }, hF = { class: "TheSideBar-ItemName" }, pF = ["innerHTML", "draggable", "title", "onDragend"], mF = {
  key: 0,
  class: "flex gap-1"
}, gF = {
  key: 0,
  class: "mt-auto w-full p-3 pt-0"
}, yF = /* @__PURE__ */ he({
  __name: "TheSideBar",
  setup(n) {
    const {
      mapObjectNew: e,
      mapCurrent: t,
      mapTypeCurrent: r,
      mapTypeRemoved: i,
      mapTypeNew: s,
      modal: o,
      settings: a,
      sidebarDraggable: l
    } = Qe(), c = t.types(new pe()).ref(), u = qe();
    _i(() => {
      l.give(u.value);
    });
    const { svgMapTypeImage: f } = zt(), d = Ie(() => {
      var h;
      return (h = c.value) == null ? void 0 : h.map((m) => ({
        type: m,
        image: f.create(m).markup()
      })).sort((m, g) => +(m.type.name >= g.type.name));
    }), p = new pe();
    return a.value(p), (h, m) => (I(), B("div", dF, [
      z("div", {
        ref_key: "dragWrapperRef",
        ref: u,
        class: "flex flex-col gap-3 flex-grow w-full overflow-y-auto"
      }, [
        (I(!0), B(Ke, null, kt(d.value, (g, v) => (I(), B("div", {
          key: v,
          class: "flex flex-col items-center justify-center gap-2"
        }, [
          z("div", hF, Z(g.type.name), 1),
          z("div", {
            innerHTML: g.image,
            class: "TheSideBar-ItemImage",
            draggable: E(p).value.readonly ? "false" : "true",
            style: An(`width:${g.type.width}px;height:${g.type.height}px`),
            title: h.$t("general.notifications.dragToCanvasToAdd"),
            onDragend: (w) => E(e).byTypeName(g.type.id, w)
          }, null, 44, pF),
          E(p).value.readonly ? ge("", !0) : (I(), B("div", mF, [
            D(De, {
              class: "text-white",
              size: "sm",
              type: "primary",
              onClick: (w) => E(r).give(g.type.id)
            }, {
              default: H(() => [
                ye(Z(h.$t("general.change")), 1)
              ]),
              _: 2
            }, 1032, ["onClick"]),
            D(De, {
              class: "text-white",
              size: "sm",
              type: "danger",
              onClick: (w) => E(i).give(g.type)
            }, {
              default: H(() => [
                ye(Z(h.$t("general.delete")), 1)
              ]),
              _: 2
            }, 1032, ["onClick"])
          ]))
        ]))), 128))
      ], 512),
      E(p).value.readonly ? ge("", !0) : (I(), B("div", gF, [
        D(cF, { class: "mb-1 grid gap-1 grid-cols-2" }, {
          default: H(() => [
            D(De, {
              title: h.$t("general.addType"),
              type: "success",
              onClick: m[0] || (m[0] = (g) => E(s).byName())
            }, {
              default: H(() => [
                D(Ft, { icon: "fa-plus-square" })
              ]),
              _: 1
            }, 8, ["title"]),
            D(De, {
              class: "e2e-show-settings",
              title: h.$t("general.settings"),
              type: "primary",
              onClick: m[1] || (m[1] = (g) => E(o).give("settings"))
            }, {
              default: H(() => [
                D(Ft, { icon: "fa-cog" })
              ]),
              _: 1
            }, 8, ["title"])
          ]),
          _: 1
        }),
        D(fF, { class: "w-[100%] block mb-1" })
      ]))
    ]));
  }
});
class vF {
  constructor(e, t, r = !1) {
    this.basePatron = e, this.guest = t, this.refWatcherCreated = r;
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
    return this.basePatron.give(e), this.refWatcherCreated || (this.refWatcherCreated = !0, Fn(
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
class bF {
  constructor(e) {
    this.baseSource = e;
  }
  value(e) {
    return this.baseSource.value(
      new gs(e, (t) => {
        Rr(JSON.stringify(t), e);
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
class wF {
  constructor(e, t) {
    this.baseGuest = e, this.baseGuestAware = t;
  }
  value(e) {
    return this.baseGuestAware.value(e), this;
  }
  give(e) {
    return Rr(e, this.baseGuest), this;
  }
  pool() {
    throw Error("No pool in SourceDynamic");
  }
}
const CF = { class: "AppPresets" }, _F = { class: "flex flex-col gap-2" }, SF = /* @__PURE__ */ he({
  __name: "AppExport",
  setup(n) {
    const { mapFile: e, mapCurrent: t } = Qe(), r = new wF(
      t,
      new Ju((a) => {
        e.currentMap(new Da(a));
      })
    ), i = new bF(r), s = new vF(new pe(), i);
    i.value(s);
    const o = s.ref();
    return (a, l) => (I(), rt(Ti, { name: "export" }, {
      default: H(() => [
        z("div", CF, [
          l[1] || (l[1] = z("div", { class: "text-md font-bold mb-2" }, "Экспорт\\Импорт текущей карты", -1)),
          z("div", _F, [
            D(G0, {
              modelValue: E(o),
              "onUpdate:modelValue": l[0] || (l[0] = (c) => Mo(o) ? o.value = c : null)
            }, null, 8, ["modelValue"])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), xF = { class: "bg-body absolute top-0 left-0 w-full h-full" }, kF = { class: "grid grid-cols-[200px_1fr] grid-rows-[50px_1fr] h-dvh relative" }, NF = /* @__PURE__ */ he({
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
    const t = n, r = e, { fileContent: i, settings: s } = Qe(), { guest: o, patron: a } = zt();
    return s.value((l) => {
      s.give({
        ...l,
        readonly: t.readonly,
        presets: t.presets
      });
    }), Fn(() => t.modelValue, (l) => {
      i.value(o.create((c) => {
        l !== c && i.give(l);
      }));
    }, {
      immediate: !0
    }), i.value(a.create((l) => {
      r("update:modelValue", l);
    })), (l, c) => (I(), B("div", xF, [
      z("div", kF, [
        D(XL, { class: "col-span-2" }),
        D(yF),
        D(zL, { class: "w-auto col-auto h-full" }),
        D(q3)
      ]),
      D(yL),
      D(SL),
      D(sF),
      D(RO),
      D(fE),
      D(SF),
      D(kO),
      D(K3),
      D(oE),
      D(bO)
    ]));
  }
}), Km = de.debug("FileSystemContent");
class PF {
  constructor(e, t, r) {
    ne(this, "contentPatrons");
    ne(this, "fileHandler", null);
    ne(this, "contentSource");
    this.launchQueue = e, this.notification = t, this.factories = r, this.contentPatrons = r.pool.create(this), this.contentSource = r.sourceEmpty.create();
  }
  content(e) {
    const t = this.factories.guest.create((r) => {
      this.fileHandler = r, this.factories.fileHandlerContent.create(r).content(
        this.factories.guest.create((i) => {
          this.contentPatrons.distribute(i, e), this.contentSource.give(i);
        })
      );
    });
    return this.fileHandler || this.launchQueue.fileHandler(t), this.contentSource.value(e), this;
  }
  give(e) {
    if (Km("save file as content string", e), !this.fileHandler)
      throw new ao("Cant save file because no fileHandler");
    try {
      return this.contentSource.give(e), this.factories.browserFileSaved.create(this.fileHandler).save(e), this.contentPatrons.give(e), this;
    } catch (t) {
      throw new ao("Cant handle receive for map file FS", { cause: t });
    } finally {
      this.notification.give({
        type: "success",
        text: "Успешно сохранен файл карты!"
      });
    }
  }
  canBeUsed(e) {
    const t = "launchQueue" in window;
    Km("can be used", t);
    const r = window && window.matchMedia("(display-mode: standalone)");
    return e.give(t && r.matches), e;
  }
}
const wa = de.debug("FirstPossibleFileContent");
class IF {
  constructor(e, t) {
    ne(this, "firstPossibleFileContent", null);
    ne(this, "contentSource", new Qi());
    ne(this, "canBeUsedSource", new Qi());
    wa("length", e.length), e.forEach((r) => {
      r.canBeUsed(
        t.patronOnce.create(
          t.guest.create((i) => {
            wa("canbeused result", r, i), i && !this.firstPossibleFileContent && (this.firstPossibleFileContent = r, r.canBeUsed(t.patron.create(this.canBeUsedSource)), r.content(t.patron.create(this.contentSource)), this.contentSource.value(
              t.patron.create((s) => {
                r.content(
                  t.guest.create((o) => {
                    s !== o && r.give(s);
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
    return wa("can be used to", this.firstPossibleFileContent), this.canBeUsedSource.value(e), e;
  }
  content(e) {
    return wa("content to", this.firstPossibleFileContent), this.contentSource.value(e), this;
  }
  give(e) {
    return this.contentSource.give(e), this;
  }
}
const jc = de.debug("UrlContent");
class DF {
  constructor(e, t) {
    ne(this, "contentCache");
    this.notification = e, this.factories = t, this.contentCache = t.sourceEmpty.create();
  }
  canBeUsed(e) {
    if (!window)
      return e.give(!1), this;
    const t = window.location.search.indexOf("?view=") > -1;
    if (jc("can be used", t), e.give(window.location.search.indexOf("?view=") > -1), t) {
      const r = window.location.search.split("=")[1] ?? "";
      fetch(r, { redirect: "follow" }).then((i) => i.text()).then((i) => {
        jc("received text", i), this.contentCache.give(i);
      });
    }
    return e;
  }
  content(e) {
    if (!window)
      return this;
    const t = window.location.search.split("=")[1] ?? "";
    return jc("visit url", t), this.contentCache.value(this.factories.patronOnce.create(e)), this;
  }
  give() {
    return this.notification.give({
      type: "error",
      text: "Невозможно сохранить карту, открытую по ссылке!"
    }), this;
  }
}
const Ym = new Qi();
class LF {
  constructor(e = window.launchQueue, t = "launchQueue" in window) {
    ne(this, "isCalculated", !1);
    this.launchQueue = e, this.isLaunchQueueSupported = t;
  }
  fileHandler(e) {
    return this.isLaunchQueueSupported && !this.isCalculated && (this.isCalculated = !0, this.launchQueue.setConsumer((t) => {
      if (console.log("require file handler"), t.files && t.files.length) {
        const [r] = t.files;
        Ym.give(r);
      }
    })), Ym.value(e), this;
  }
}
export {
  LF as BrowserLaunchQueue,
  PF as FileSystemContent,
  IF as FirstPossibleFileContent,
  NF as PatronSchemeEditor,
  DF as UrlContent,
  pe as VueRefPatron,
  Qe as useApplication,
  zt as useFactories
};
