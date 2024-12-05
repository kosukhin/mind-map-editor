var Gs = Object.defineProperty;
var Ws = (n, e, t) => e in n ? Gs(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var S = (n, e, t) => Ws(n, typeof e != "symbol" ? e + "" : e, t);
import { unref as d, getCurrentScope as Qs, onScopeDispose as qs, getCurrentInstance as ut, onMounted as dt, nextTick as Js, onUnmounted as Xs, reactive as Nt, watch as le, computed as fe, ref as W, defineComponent as V, openBlock as g, createBlock as K, Transition as ws, withCtx as C, createElementBlock as b, normalizeClass as oe, createElementVNode as _, withModifiers as we, renderSlot as ee, createCommentVNode as N, Fragment as U, renderList as Q, toDisplayString as k, createVNode as v, normalizeStyle as re, createTextVNode as A, withDirectives as He, isRef as Me, vModelText as _s, vModelCheckbox as Ys, onBeforeUnmount as Zs, vModelSelect as ei, createStaticVNode as ti } from "vue";
import { Arrow as Cs } from "konva/lib/shapes/Arrow";
import { Rect as si } from "konva/lib/shapes/Rect";
import At from "konva";
import { Stage as Et } from "konva/lib/Stage";
import { FontAwesomeIcon as ii } from "@fortawesome/vue-fontawesome";
import { faArrowUp as ni, faArrowDown as ri, faArrowRight as oi, faArrowLeft as ai, faClose as ci, faMap as li, faRotateRight as ui, faRotateLeft as di, faFileText as hi, faCog as pi, faPlusSquare as fi, faHistory as mi, faSearch as gi, faTextWidth as vi, faBars as yi } from "@fortawesome/free-solid-svg-icons";
import { useEditor as bi, EditorContent as wi, BubbleMenu as _i } from "@tiptap/vue-3";
import Ci from "@tiptap/starter-kit";
class xi {
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
class ht {
  constructor(e) {
    this.guestReceiver = e;
  }
  value(e) {
    return this.guestReceiver(e), e;
  }
}
function ue(n, e, t) {
  typeof e == "function" ? e(n, t) : e.give(n, t);
}
class he {
  constructor(e) {
    this.receiver = e;
  }
  give(e, t) {
    return this.receiver(e, t), this;
  }
}
class _e {
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
var $i = Object.defineProperty, ki = (n, e, t) => e in n ? $i(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Rt = (n, e, t) => ki(n, typeof e != "symbol" ? e + "" : e, t);
const xs = /* @__PURE__ */ new Map(), Vt = (n) => {
  xs.forEach((e) => {
    e.delete(n);
  });
};
class Ue {
  constructor(e) {
    this.initiator = e, Rt(this, "patrons"), Rt(this, "give"), this.patrons = /* @__PURE__ */ new Set(), xs.set(this, this.patrons);
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
var Oi = Object.defineProperty, Ti = (n, e, t) => e in n ? Oi(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Fi = (n, e, t) => Ti(n, e + "", t);
class je {
  constructor(e) {
    this.sourceDocument = e, Fi(this, "thePool", new Ue(this));
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
class ze {
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
var Si = Object.defineProperty, Mi = (n, e, t) => e in n ? Si(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Dt = (n, e, t) => Mi(n, typeof e != "symbol" ? e + "" : e, t);
class ji {
  constructor(e) {
    Dt(this, "guests", /* @__PURE__ */ new Set()), Dt(this, "patronPool"), this.patronPool = new Ue(e);
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
var Ii = Object.defineProperty, Pi = (n, e, t) => e in n ? Ii(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Ie = (n, e, t) => Pi(n, typeof e != "symbol" ? e + "" : e, t);
class Ni {
  constructor() {
    Ie(this, "theChain"), Ie(this, "keysKnown", /* @__PURE__ */ new Set()), Ie(this, "keysFilled", /* @__PURE__ */ new Set()), Ie(this, "filledChainPool", new ji(this)), this.theChain = new je({});
  }
  resultArray(e) {
    const t = new ze(e);
    return this.filledChainPool.add(
      new _e(t, (s) => {
        t.give(Object.values(s));
      })
    ), this.isChainFilled() && this.theChain.value(
      new he((s) => {
        this.filledChainPool.give(Object.values(s));
      })
    ), this;
  }
  result(e) {
    const t = new ze(e);
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
class Ai {
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
class Ei {
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
var Ri = Object.defineProperty, Vi = (n, e, t) => e in n ? Ri(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Di = (n, e, t) => Vi(n, e + "", t);
class Li {
  constructor(e) {
    this.baseGuest = e, Di(this, "received", !1);
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
var Bi = Object.defineProperty, zi = (n, e, t) => e in n ? Bi(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Hi = (n, e, t) => zi(n, e + "", t);
class be {
  constructor() {
    Hi(this, "baseSource", new je(null));
  }
  value(e) {
    return this.baseSource.value(
      new _e(e, (t) => {
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
class Se extends Error {
  constructor(e, t) {
    super(e, t);
  }
}
class Ui {
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
class Ki {
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
class Gi {
  constructor(e) {
    this.content = e;
  }
  result() {
    return JSON.parse(this.content);
  }
}
class Wi {
  constructor(e) {
    this.content = e;
  }
  result() {
    return JSON.stringify(this.content);
  }
}
class Qi {
  constructor(e, t = 100, s = 100) {
    this.svgContent = e, this.width = t, this.height = s;
  }
  markup() {
    return this.svgContent.replaceAll("${width}", String(this.width)).replaceAll("${height}", String(this.height));
  }
}
class qi {
  constructor(e, t) {
    this.type = e, this.factories = t;
  }
  markup() {
    return this.factories.svgImage.create(this.type.svg, this.type.width, this.type.height).markup();
  }
}
class Ji {
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
class Xi {
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
class Yi {
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
var Lt;
const Ke = typeof window < "u", Zi = (n) => typeof n < "u", en = (n) => typeof n == "function", tn = (n) => typeof n == "string", pt = () => {
};
Ke && ((Lt = window == null ? void 0 : window.navigator) != null && Lt.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function pe(n) {
  return typeof n == "function" ? n() : d(n);
}
function sn(n) {
  return n;
}
function nn(n) {
  return Qs() ? (qs(n), !0) : !1;
}
function $s(n, e = !0) {
  ut() ? dt(n) : e ? n() : Js(n);
}
function rn(n) {
  ut() && Xs(n);
}
function on(n) {
  var e;
  const t = pe(n);
  return (e = t == null ? void 0 : t.$el) != null ? e : t;
}
const ks = Ke ? window : void 0, an = Ke ? window.document : void 0, cn = Ke ? window.navigator : void 0;
function Pe(...n) {
  let e, t, s, i;
  if (tn(n[0]) || Array.isArray(n[0]) ? ([t, s, i] = n, e = ks) : [e, t, s, i] = n, !e)
    return pt;
  Array.isArray(t) || (t = [t]), Array.isArray(s) || (s = [s]);
  const r = [], o = () => {
    r.forEach((u) => u()), r.length = 0;
  }, a = (u, c, h, y) => (u.addEventListener(c, h, y), () => u.removeEventListener(c, h, y)), l = le(() => [on(e), pe(i)], ([u, c]) => {
    o(), u && r.push(...t.flatMap((h) => s.map((y) => a(u, h, y, c))));
  }, { immediate: !0, flush: "post" }), p = () => {
    l(), o();
  };
  return nn(p), p;
}
function ln(n, e = !1) {
  const t = W(), s = () => t.value = !!n();
  return s(), $s(s, e), t;
}
function un(n) {
  return JSON.parse(JSON.stringify(n));
}
const Bt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, zt = "__vueuse_ssr_handlers__";
Bt[zt] = Bt[zt] || {};
const dn = {
  ctrl: "control",
  command: "meta",
  cmd: "meta",
  option: "alt",
  up: "arrowup",
  down: "arrowdown",
  left: "arrowleft",
  right: "arrowright"
};
function hn(n = {}) {
  const {
    reactive: e = !1,
    target: t = ks,
    aliasMap: s = dn,
    passive: i = !0,
    onEventFired: r = pt
  } = n, o = Nt(/* @__PURE__ */ new Set()), a = {
    toJSON() {
      return {};
    },
    current: o
  }, l = e ? Nt(a) : a, p = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set();
  function c(w, f) {
    w in l && (e ? l[w] = f : l[w].value = f);
  }
  function h() {
    o.clear();
    for (const w of u)
      c(w, !1);
  }
  function y(w, f) {
    var x, F;
    const E = (x = w.key) == null ? void 0 : x.toLowerCase(), G = [(F = w.code) == null ? void 0 : F.toLowerCase(), E].filter(Boolean);
    E && (f ? o.add(E) : o.delete(E));
    for (const I of G)
      u.add(I), c(I, f);
    E === "meta" && !f ? (p.forEach((I) => {
      o.delete(I), c(I, !1);
    }), p.clear()) : typeof w.getModifierState == "function" && w.getModifierState("Meta") && f && [...o, ...G].forEach((I) => p.add(I));
  }
  Pe(t, "keydown", (w) => (y(w, !0), r(w)), { passive: i }), Pe(t, "keyup", (w) => (y(w, !1), r(w)), { passive: i }), Pe("blur", h, { passive: !0 }), Pe("focus", h, { passive: !0 });
  const m = new Proxy(l, {
    get(w, f, x) {
      if (typeof f != "string")
        return Reflect.get(w, f, x);
      if (f = f.toLowerCase(), f in s && (f = s[f]), !(f in l))
        if (/[+_-]/.test(f)) {
          const E = f.split(/[+_-]/g).map((L) => L.trim());
          l[f] = fe(() => E.every((L) => d(m[L])));
        } else
          l[f] = W(!1);
      const F = Reflect.get(w, f, x);
      return e ? d(F) : F;
    }
  });
  return m;
}
var Ht;
(function(n) {
  n.UP = "UP", n.RIGHT = "RIGHT", n.DOWN = "DOWN", n.LEFT = "LEFT", n.NONE = "NONE";
})(Ht || (Ht = {}));
function pn(n, e = pt, t = {}) {
  const {
    immediate: s = !0,
    manual: i = !1,
    type: r = "text/javascript",
    async: o = !0,
    crossOrigin: a,
    referrerPolicy: l,
    noModule: p,
    defer: u,
    document: c = an,
    attrs: h = {}
  } = t, y = W(null);
  let m = null;
  const w = (F) => new Promise((E, L) => {
    const G = (T) => (y.value = T, E(T), T);
    if (!c) {
      E(!1);
      return;
    }
    let I = !1, $ = c.querySelector(`script[src="${pe(n)}"]`);
    $ ? $.hasAttribute("data-loaded") && G($) : ($ = c.createElement("script"), $.type = r, $.async = o, $.src = pe(n), u && ($.defer = u), a && ($.crossOrigin = a), p && ($.noModule = p), l && ($.referrerPolicy = l), Object.entries(h).forEach(([T, M]) => $ == null ? void 0 : $.setAttribute(T, M)), I = !0), $.addEventListener("error", (T) => L(T)), $.addEventListener("abort", (T) => L(T)), $.addEventListener("load", () => {
      $.setAttribute("data-loaded", "true"), e($), G($);
    }), I && ($ = c.head.appendChild($)), F || G($);
  }), f = (F = !0) => (m || (m = w(F)), m), x = () => {
    if (!c)
      return;
    m = null, y.value && (y.value = null);
    const F = c.querySelector(`script[src="${pe(n)}"]`);
    F && c.head.removeChild(F);
  };
  return s && !i && $s(f), i || rn(x), { scriptTag: y, load: f, unload: x };
}
var fn = Object.defineProperty, Ut = Object.getOwnPropertySymbols, mn = Object.prototype.hasOwnProperty, gn = Object.prototype.propertyIsEnumerable, Kt = (n, e, t) => e in n ? fn(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Gt = (n, e) => {
  for (var t in e || (e = {}))
    mn.call(e, t) && Kt(n, t, e[t]);
  if (Ut)
    for (var t of Ut(e))
      gn.call(e, t) && Kt(n, t, e[t]);
  return n;
};
function vn(n = {}, e = {}) {
  const { navigator: t = cn } = e, s = t, i = ln(() => s && "canShare" in s);
  return {
    isSupported: i,
    share: async (o = {}) => {
      if (i.value) {
        const a = Gt(Gt({}, pe(n)), pe(o));
        let l = !0;
        if (a.files && s.canShare && (l = s.canShare({ files: a.files })), l)
          return s.share(a);
      }
    }
  };
}
var yn = Object.defineProperty, Wt = Object.getOwnPropertySymbols, bn = Object.prototype.hasOwnProperty, wn = Object.prototype.propertyIsEnumerable, Qt = (n, e, t) => e in n ? yn(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, _n = (n, e) => {
  for (var t in e || (e = {}))
    bn.call(e, t) && Qt(n, t, e[t]);
  if (Wt)
    for (var t of Wt(e))
      wn.call(e, t) && Qt(n, t, e[t]);
  return n;
};
const Cn = {
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
_n({
  linear: sn
}, Cn);
function Ge(n, e, t, s = {}) {
  var i, r, o;
  const {
    clone: a = !1,
    passive: l = !1,
    eventName: p,
    deep: u = !1,
    defaultValue: c
  } = s, h = ut(), y = t || (h == null ? void 0 : h.emit) || ((i = h == null ? void 0 : h.$emit) == null ? void 0 : i.bind(h)) || ((o = (r = h == null ? void 0 : h.proxy) == null ? void 0 : r.$emit) == null ? void 0 : o.bind(h == null ? void 0 : h.proxy));
  let m = p;
  m = p || m || `update:${e.toString()}`;
  const w = (x) => a ? en(a) ? a(x) : un(x) : x, f = () => Zi(n[e]) ? w(n[e]) : c;
  if (l) {
    const x = f(), F = W(x);
    return le(() => n[e], (E) => F.value = w(E)), le(F, (E) => {
      (E !== n[e] || u) && y(m, E);
    }, { deep: u }), F;
  } else
    return fe({
      get() {
        return f();
      },
      set(x) {
        y(m, x);
      }
    });
}
class xn {
  constructor(e, t, s, i) {
    S(this, "loadingCache");
    this.callbackName = e, this.url = t, this.emptyValue = s, this.factories = i, this.loadingCache = i.sourceEmpty.create();
  }
  content(e) {
    this.loadingCache.give(!0);
    const t = setTimeout(() => {
      this.loadingCache.give(!1), e.give(this.emptyValue);
    }, 1e4);
    return pn(this.url, () => {
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
class $n {
  constructor(e) {
    this.text = e;
  }
  asString(e) {
    return e.give(this.text), e;
  }
}
class kn {
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
var Ne = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ft(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var lt = { exports: {} }, Ye, qt;
function On() {
  if (qt) return Ye;
  qt = 1;
  var n = 1e3, e = n * 60, t = e * 60, s = t * 24, i = s * 7, r = s * 365.25;
  Ye = function(u, c) {
    c = c || {};
    var h = typeof u;
    if (h === "string" && u.length > 0)
      return o(u);
    if (h === "number" && isFinite(u))
      return c.long ? l(u) : a(u);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(u)
    );
  };
  function o(u) {
    if (u = String(u), !(u.length > 100)) {
      var c = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        u
      );
      if (c) {
        var h = parseFloat(c[1]), y = (c[2] || "ms").toLowerCase();
        switch (y) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return h * r;
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
            return h * n;
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
  function a(u) {
    var c = Math.abs(u);
    return c >= s ? Math.round(u / s) + "d" : c >= t ? Math.round(u / t) + "h" : c >= e ? Math.round(u / e) + "m" : c >= n ? Math.round(u / n) + "s" : u + "ms";
  }
  function l(u) {
    var c = Math.abs(u);
    return c >= s ? p(u, c, s, "day") : c >= t ? p(u, c, t, "hour") : c >= e ? p(u, c, e, "minute") : c >= n ? p(u, c, n, "second") : u + " ms";
  }
  function p(u, c, h, y) {
    var m = c >= h * 1.5;
    return Math.round(u / h) + " " + y + (m ? "s" : "");
  }
  return Ye;
}
function Tn(n) {
  t.debug = t, t.default = t, t.coerce = l, t.disable = r, t.enable = i, t.enabled = o, t.humanize = On(), t.destroy = p, Object.keys(n).forEach((u) => {
    t[u] = n[u];
  }), t.names = [], t.skips = [], t.formatters = {};
  function e(u) {
    let c = 0;
    for (let h = 0; h < u.length; h++)
      c = (c << 5) - c + u.charCodeAt(h), c |= 0;
    return t.colors[Math.abs(c) % t.colors.length];
  }
  t.selectColor = e;
  function t(u) {
    let c, h = null, y, m;
    function w(...f) {
      if (!w.enabled)
        return;
      const x = w, F = Number(/* @__PURE__ */ new Date()), E = F - (c || F);
      x.diff = E, x.prev = c, x.curr = F, c = F, f[0] = t.coerce(f[0]), typeof f[0] != "string" && f.unshift("%O");
      let L = 0;
      f[0] = f[0].replace(/%([a-zA-Z%])/g, (I, $) => {
        if (I === "%%")
          return "%";
        L++;
        const T = t.formatters[$];
        if (typeof T == "function") {
          const M = f[L];
          I = T.call(x, M), f.splice(L, 1), L--;
        }
        return I;
      }), t.formatArgs.call(x, f), (x.log || t.log).apply(x, f);
    }
    return w.namespace = u, w.useColors = t.useColors(), w.color = t.selectColor(u), w.extend = s, w.destroy = t.destroy, Object.defineProperty(w, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => h !== null ? h : (y !== t.namespaces && (y = t.namespaces, m = t.enabled(u)), m),
      set: (f) => {
        h = f;
      }
    }), typeof t.init == "function" && t.init(w), w;
  }
  function s(u, c) {
    const h = t(this.namespace + (typeof c > "u" ? ":" : c) + u);
    return h.log = this.log, h;
  }
  function i(u) {
    t.save(u), t.namespaces = u, t.names = [], t.skips = [];
    let c;
    const h = (typeof u == "string" ? u : "").split(/[\s,]+/), y = h.length;
    for (c = 0; c < y; c++)
      h[c] && (u = h[c].replace(/\*/g, ".*?"), u[0] === "-" ? t.skips.push(new RegExp("^" + u.slice(1) + "$")) : t.names.push(new RegExp("^" + u + "$")));
  }
  function r() {
    const u = [
      ...t.names.map(a),
      ...t.skips.map(a).map((c) => "-" + c)
    ].join(",");
    return t.enable(""), u;
  }
  function o(u) {
    if (u[u.length - 1] === "*")
      return !0;
    let c, h;
    for (c = 0, h = t.skips.length; c < h; c++)
      if (t.skips[c].test(u))
        return !1;
    for (c = 0, h = t.names.length; c < h; c++)
      if (t.names[c].test(u))
        return !0;
    return !1;
  }
  function a(u) {
    return u.toString().substring(2, u.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function l(u) {
    return u instanceof Error ? u.stack || u.message : u;
  }
  function p() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return t.enable(t.load()), t;
}
var Fn = Tn;
(function(n, e) {
  e.formatArgs = s, e.save = i, e.load = r, e.useColors = t, e.storage = o(), e.destroy = /* @__PURE__ */ (() => {
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
    if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + n.exports.humanize(this.diff), !this.useColors)
      return;
    const p = "color: " + this.color;
    l.splice(1, 0, p, "color: inherit");
    let u = 0, c = 0;
    l[0].replace(/%[a-zA-Z%]/g, (h) => {
      h !== "%%" && (u++, h === "%c" && (c = u));
    }), l.splice(c, 0, p);
  }
  e.log = console.debug || console.log || (() => {
  });
  function i(l) {
    try {
      l ? e.storage.setItem("debug", l) : e.storage.removeItem("debug");
    } catch {
    }
  }
  function r() {
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
  n.exports = Fn(e);
  const { formatters: a } = n.exports;
  a.j = function(l) {
    try {
      return JSON.stringify(l);
    } catch (p) {
      return "[UnexpectedJSONParseError]: " + p.message;
    }
  };
})(lt, lt.exports);
var j = lt.exports;
const Os = /* @__PURE__ */ ft(j), Sn = j.debug("TextNlAsBr");
class Mn {
  constructor(e, t) {
    this.baseText = e, this.factories = t;
  }
  asString(e) {
    return this.baseText.asString(
      this.factories.guestInTheMiddle.create(e, (t) => {
        if (typeof t > "u" || t === null)
          return "";
        const s = "<br />";
        return Sn(t), e.give((t ?? "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, `$1${s}$2`)), !0;
      })
    ), e;
  }
}
const jn = new D(je), In = new D(je), Pn = new D(be), Nn = new D(he), An = new D(_e), En = new D(ht), Rn = new D(Ue), Vn = new D(Ei), Dn = new D(Li), Ln = new D(_e), Bn = new D(Ni), zn = new D(Ai), de = {
  cache: jn,
  chain: Bn,
  guest: Nn,
  guestCast: An,
  guestAware: En,
  guestInTheMiddle: Ln,
  guestSync: zn,
  patron: Vn,
  patronOnce: Dn,
  pool: Rn,
  source: In,
  sourceEmpty: Pn
}, Hn = new D(Ui), Un = new D(Ki), Kn = new D(Wi), Gn = new D(Gi), Ts = new D(Qi), Wn = new D(qi, { ...de, svgImage: Ts }), Qn = new D(Ji, de), qn = new D(Xi, de), Jn = new D(Yi, de), Xn = new D(xn, de), Yn = new D($n), Zn = new D(kn, de), er = new D(Mn, de), tr = {
  ...de,
  fileHandlerContent: Hn,
  browserFileSaved: Un,
  transformToString: Kn,
  transformToObject: Gn,
  svgImage: Ts,
  svgMapTypeImage: Wn,
  numberChunks: Qn,
  mapNameFromUrl: qn,
  textNoHtml: Jn,
  jsonp: Xn,
  textOf: Yn,
  textNlAsBr: er,
  textWithoutHTML: Zn
}, X = () => tr;
class mt {
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
const Ze = j.debug("MapCurrent");
class Fs {
  constructor(e, t, s) {
    S(this, "objectsCache");
    S(this, "settingsCache");
    S(this, "typesCache");
    this.mapFile = e, this.mapId = t, this.factories = s, this.objectsCache = s.sourceEmpty.create(), this.settingsCache = s.sourceEmpty.create(), this.typesCache = s.sourceEmpty.create(), e.currentMap(
      s.patron.create(
        s.guest.create((i) => {
          Ze("current map changed", i), this.settingsCache.give(i.settings), this.objectsCache.give(Object.values(i.objects)), this.typesCache.give(
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
class sr {
  constructor(e) {
    S(this, "idCache");
    this.idCache = e.cache.create("current");
  }
  id(e) {
    return this.idCache.value(e), e;
  }
  give(e) {
    return this.idCache.give(e), this;
  }
}
class ir {
  constructor(e) {
    this.mapFile = e;
  }
  value(e) {
    return this.mapFile.currentMap(
      new _e(e, (t) => {
        e.give(t.settings.title);
      })
    ), this;
  }
}
const Ae = j.debug("MapHistory"), Jt = (n) => {
  const e = JSON.parse(JSON.stringify(n));
  return Object.values(e.objects).forEach((t) => {
    t.width = 0, t.height = 0;
  }), JSON.stringify(e);
};
class nr {
  constructor(e, t, s, i) {
    S(this, "mapsHistory");
    S(this, "historyIndex");
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
              Ae("add map to history", s, e);
              const i = s.some(
                (r) => Jt(r) === Jt(e)
              );
              if (Ae("isMapFromHistory", i), !i) {
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
          Ae("recalculate is prev possible", r), e.give(r);
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
          Ae("recalculate is next possible", r), e.give(r);
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
class rr {
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
const Ee = j.debug("MapFileOfContent");
class or {
  constructor(e, t, s) {
    S(this, "currentMapPatrons");
    S(this, "mapFileCache");
    this.mapFileContent = e, this.mapId = t, this.factories = s, this.currentMapPatrons = s.pool.create(this), this.mapFileCache = s.cache.create(!1), e.value(
      s.patron.create((i) => {
        if (!i)
          return;
        const r = this.factories.transformToObject.create(i).result();
        Ee("get map file", r), this.mapFileCache.give(r);
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
const ar = j.debug("MapFileForRendering");
class cr {
  constructor(e, t, s) {
    S(this, "mapCache");
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
        ar("received map file, objects = ", e[t].objects), this.mapCache.give(e[t]);
      })
    ), this;
  }
}
class Ss {
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
const Xt = Os("app:MapObjectCurrent");
class lr {
  constructor(e, t) {
    S(this, "idCache");
    S(this, "silenceActivator");
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
    return Xt("new value current object", e), this.silenceActivator.value(
      this.factories.guest.create((t) => {
        Xt("silence activator", t), t ? t.give(e) : this.idCache.give(e);
      })
    ), this;
  }
}
class ur {
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
const et = j.debug("MapObjectNew");
class dr {
  constructor(e, t, s, i, r) {
    this.map = e, this.mapObject = t, this.canvas = s, this.stagePosition = i, this.factories = r;
  }
  byTypeName(e, t) {
    return et("start to add new type", e, t), this.stagePosition.position(
      this.factories.guest.create((s) => {
        this.map.types(
          this.factories.guest.create((i) => {
            this.canvas.canvas(
              this.factories.guest.create((r) => {
                const o = r.getBoundingClientRect(), a = i.find((u) => u.id === e);
                et("is type found", a);
                const l = t.x - o.left, p = t.y - o.top;
                a && (et("add new type"), this.mapObject.give({
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
class hr {
  constructor(e, t) {
    this.mapId = e, this.factories = t;
  }
  names(e) {
    return this.mapId.id(
      this.factories.guestInTheMiddle.create(e, (t) => {
        const s = t.split("_").filter((o) => !!o);
        let i = "";
        const r = s.map((o) => {
          const a = `${i}${o}`;
          return i || (i = "_"), i += `${o}_`, a;
        });
        i = "", e.give(r);
      })
    ), e;
  }
}
class pr {
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
class fr {
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
const mr = j.debug("MapObjectsLink");
class gr {
  constructor(e, t, s, i, r) {
    S(this, "objectIdsCache");
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
            t.push(s), this.objectIdsCache.give([...t]), mr("object ids", t), t.length === 2 && this.map.objects(
              this.factories.guest.create((i) => {
                const [, r] = t, o = i.find((a) => a.id === r);
                o && this.newArrow.forObject(o);
              })
            ), t.length === 3 && (this.newArrow.dispose(), this.mapObjectCurrent.silenceOff(), this.map.objects(
              this.factories.guest.create((i) => {
                const [, r, o] = t, a = i.find((l) => l.id === r);
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
function vr(n) {
  var e = typeof n;
  return n != null && (e == "object" || e == "function");
}
var gt = vr, yr = typeof Ne == "object" && Ne && Ne.Object === Object && Ne, br = yr, wr = br, _r = typeof self == "object" && self && self.Object === Object && self, Cr = wr || _r || Function("return this")(), Ms = Cr, xr = Ms, $r = function() {
  return xr.Date.now();
}, kr = $r, Or = /\s/;
function Tr(n) {
  for (var e = n.length; e-- && Or.test(n.charAt(e)); )
    ;
  return e;
}
var Fr = Tr, Sr = Fr, Mr = /^\s+/;
function jr(n) {
  return n && n.slice(0, Sr(n) + 1).replace(Mr, "");
}
var Ir = jr, Pr = Ms, Nr = Pr.Symbol, js = Nr, Yt = js, Is = Object.prototype, Ar = Is.hasOwnProperty, Er = Is.toString, $e = Yt ? Yt.toStringTag : void 0;
function Rr(n) {
  var e = Ar.call(n, $e), t = n[$e];
  try {
    n[$e] = void 0;
    var s = !0;
  } catch {
  }
  var i = Er.call(n);
  return s && (e ? n[$e] = t : delete n[$e]), i;
}
var Vr = Rr, Dr = Object.prototype, Lr = Dr.toString;
function Br(n) {
  return Lr.call(n);
}
var zr = Br, Zt = js, Hr = Vr, Ur = zr, Kr = "[object Null]", Gr = "[object Undefined]", es = Zt ? Zt.toStringTag : void 0;
function Wr(n) {
  return n == null ? n === void 0 ? Gr : Kr : es && es in Object(n) ? Hr(n) : Ur(n);
}
var Qr = Wr;
function qr(n) {
  return n != null && typeof n == "object";
}
var Jr = qr, Xr = Qr, Yr = Jr, Zr = "[object Symbol]";
function eo(n) {
  return typeof n == "symbol" || Yr(n) && Xr(n) == Zr;
}
var to = eo, so = Ir, ts = gt, io = to, ss = NaN, no = /^[-+]0x[0-9a-f]+$/i, ro = /^0b[01]+$/i, oo = /^0o[0-7]+$/i, ao = parseInt;
function co(n) {
  if (typeof n == "number")
    return n;
  if (io(n))
    return ss;
  if (ts(n)) {
    var e = typeof n.valueOf == "function" ? n.valueOf() : n;
    n = ts(e) ? e + "" : e;
  }
  if (typeof n != "string")
    return n === 0 ? n : +n;
  n = so(n);
  var t = ro.test(n);
  return t || oo.test(n) ? ao(n.slice(2), t ? 2 : 8) : no.test(n) ? ss : +n;
}
var lo = co, uo = gt, tt = kr, is = lo, ho = "Expected a function", po = Math.max, fo = Math.min;
function mo(n, e, t) {
  var s, i, r, o, a, l, p = 0, u = !1, c = !1, h = !0;
  if (typeof n != "function")
    throw new TypeError(ho);
  e = is(e) || 0, uo(t) && (u = !!t.leading, c = "maxWait" in t, r = c ? po(is(t.maxWait) || 0, e) : r, h = "trailing" in t ? !!t.trailing : h);
  function y(I) {
    var $ = s, T = i;
    return s = i = void 0, p = I, o = n.apply(T, $), o;
  }
  function m(I) {
    return p = I, a = setTimeout(x, e), u ? y(I) : o;
  }
  function w(I) {
    var $ = I - l, T = I - p, M = e - $;
    return c ? fo(M, r - T) : M;
  }
  function f(I) {
    var $ = I - l, T = I - p;
    return l === void 0 || $ >= e || $ < 0 || c && T >= r;
  }
  function x() {
    var I = tt();
    if (f(I))
      return F(I);
    a = setTimeout(x, w(I));
  }
  function F(I) {
    return a = void 0, h && s ? y(I) : (s = i = void 0, o);
  }
  function E() {
    a !== void 0 && clearTimeout(a), p = 0, s = l = i = a = void 0;
  }
  function L() {
    return a === void 0 ? o : F(tt());
  }
  function G() {
    var I = tt(), $ = f(I);
    if (s = arguments, i = this, l = I, $) {
      if (a === void 0)
        return m(l);
      if (c)
        return clearTimeout(a), a = setTimeout(x, e), y(l);
    }
    return a === void 0 && (a = setTimeout(x, e)), o;
  }
  return G.cancel = E, G.flush = L, G;
}
var Ps = mo;
const Ce = /* @__PURE__ */ ft(Ps), go = (n) => {
  if (n[n.length - 1] === "/") {
    const e = n.split("");
    return e.splice(e.length - 1, 1), e.join("");
  }
  return n;
}, vo = Ce((n) => {
  window == null || window.open(n);
}, 200), st = j.debug("MapObjectUrl");
class yo {
  constructor(e, t) {
    this.mapId = e, this.factories = t;
  }
  open(e, t) {
    if (e != null && e.linked) {
      const s = e.outlink;
      e.targetBlank ? vo(s) : (st("open new map", s), this.factories.mapNameFromUrl.create(
        this.factories.source.create(s)
      ).name(
        this.factories.guest.create((r) => {
          st("open map name", s, r), t.give(r);
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
              this.factories.guest.create((a) => {
                let l = s.outlink ? s.outlink : `${r}/${bo(a)}`;
                st("link is", l), l = go(l), t.give(l);
              })
            );
          })
        );
      })
    ), t;
  }
}
function bo(n) {
  return n.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}
const wo = j.debug("ObjectPositionBounds");
class _o {
  constructor(e, t) {
    this.stageSize = e, this.factories = t;
  }
  position(e, t, s) {
    return this.stageSize.value(
      this.factories.guestInTheMiddle.create(s, (i) => {
        let { x: r, y: o } = t;
        r < 30 && (r = 30), o < 30 && (o = 30);
        const a = i.width - e.width;
        r > a && (r = a);
        const l = i.height - e.height;
        o > l && (o = l), wo("position", r, o), s.give({ x: r, y: o });
      })
    ), s;
  }
}
const Re = 15;
class Co {
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
const ns = {
  x: "width",
  y: "height"
}, it = {
  x: 0,
  y: 1
}, xo = {
  positive: 1,
  negative: -1
}, rs = j.debug("ObjectsOutsideScreen");
class $o {
  constructor(e, t, s, i) {
    this.map = e, this.stageSize = t, this.layer = s, this.factories = i;
  }
  count(e, t) {
    const s = e.direction === "positive", i = this.factories.chain.create();
    return this.map.objects(this.factories.guestCast.create(t, i.receiveKey("objects"))), this.layer.layer(this.factories.guestCast.create(t, i.receiveKey("layer"))), this.layer.position(this.factories.guestCast.create(t, i.receiveKey("position"))), i.result(
      this.factories.guestInTheMiddle.create(
        t,
        ({ objects: r, layer: o, position: a }) => {
          var c;
          const l = xo[e.direction], u = r.sort(
            (h, y) => h.position[it[e.axis]] * l - y.position[it[e.axis]] * l
          ).filter((h) => {
            const y = h.position[it[e.axis]] + (s ? 0 : h[ns[e.axis]]), m = a[e.axis] * -1 + (s ? o[ns[e.axis]]() : 0);
            return rs(
              "mb nearest points",
              e.direction,
              "objectP=",
              y,
              "screenP=",
              m
            ), s ? y > m : y < m;
          });
          rs("nearest", u), t.give({
            count: u.length,
            nearestObjectId: ((c = u.at(s ? -1 : 0)) == null ? void 0 : c.id) ?? ""
          });
        }
      )
    ), t;
  }
}
class ko {
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
class Oo {
  constructor(e) {
    S(this, "idCache");
    this.idCache = e.sourceEmpty.create();
  }
  typeId(e) {
    return this.idCache.value(e), e;
  }
  give(e) {
    return this.idCache.give(e), this;
  }
}
class To {
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
class Fo {
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
class So {
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
const Mo = j.debug("MapTypeUsed");
class jo {
  constructor(e, t) {
    this.mapFile = e, this.factories = t;
  }
  check(e, t) {
    return this.mapFile.currentMap(
      this.factories.guest.create((s) => {
        const i = Object.values(s.objects).some(
          (r) => r.type === e.name
        );
        Mo("is type used", i), t.give(!i || "Тип карты использован");
      })
    ), this;
  }
}
class Io {
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
const os = j.debug("ParentTypes");
class Po {
  constructor(e, t, s) {
    this.parentNames = e, this.mapFile = t, this.factories = s;
  }
  types(e) {
    os("parent types requested");
    const t = this.factories.chain.create();
    return this.parentNames.names(this.factories.guestCast.create(e, t.receiveKey("parentNames"))), this.mapFile.mapFile(this.factories.guestCast.create(e, t.receiveKey("mapFile"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ parentNames: s, mapFile: i }) => {
        const r = s.slice(0, -1);
        os("parent names", r);
        const o = {};
        r.map((l) => i[l]).forEach((l) => {
          Object.values(l.types).forEach((p) => {
            o[p.name] = p;
          });
        }), e.give(Object.values(o));
      })
    ), e;
  }
}
const as = j.debug("ObjectsMatchedToQuery");
class No {
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
                as("reset results"), t.give([]);
                return;
              }
              const o = r.filter(
                (a) => {
                  var l;
                  return a.name.toLowerCase().includes(i) || ((l = a.additionalName) == null ? void 0 : l.toLowerCase().includes(i)) || Object.values(a.additionalFields ?? {}).join(" ").toLowerCase().includes(i);
                }
              );
              as("objects in searching", o, i), t.give(o);
            })
          );
        }, 500)
      )
    ), t;
  }
}
const Ao = {
  height: 3e3,
  width: 3e3
};
class Eo {
  value(e) {
    return e.give(Ao), e;
  }
}
const cs = j.debug("StageMoveRestriction");
class Ro {
  constructor(e, t, s) {
    this.canvasDep = e, this.stageSize = t, this.factories = s;
  }
  position(e, t) {
    return this.canvasDep.canvas(
      this.factories.guest.create((s) => {
        this.stageSize.value(
          this.factories.guest.create((i) => {
            cs("income position", e);
            const r = i.width - s.clientWidth, o = i.height - s.clientHeight, a = e.x * -1, l = e.y * -1;
            if (o < 0 || r < 0)
              return { x: 0, y: 0 };
            cs("boundings", o, r, l, a), t.give({
              x: e.x > 0 ? 0 : a > r ? r * -1 : e.x,
              y: e.y > 0 ? 0 : l > o ? o * -1 : e.y
            });
          })
        );
      })
    ), t;
  }
}
const ke = j.debug("app:MapObjectsVisible");
class Vo {
  constructor(e, t, s, i) {
    S(this, "visibleObjectsCache", new be());
    ke("constructor initialized");
    const r = i.chain.create();
    t.size(i.patron.create(r.receiveKey("size"))), e.position(i.patron.create(r.receiveKey("position"))), s.currentMap(i.patron.create(r.receiveKey("map"))), r.result(
      i.patron.create(
        i.guest.create(({ position: o, size: a, map: l }) => {
          const p = Object.values(l.objects);
          ke("objects come to result", p);
          const u = p.filter((c) => {
            const h = l.types[c.type] ?? {}, y = {
              width: c.width || h.width,
              height: c.height || h.height
            };
            return this.isInBounding(o, a, c.position, y);
          });
          ke("visible objects calculated", u), this.visibleObjectsCache.give(u);
        })
      )
    );
  }
  objects(e) {
    return this.visibleObjectsCache.value(e), this;
  }
  isInBounding(e, t, s, i) {
    const r = e.x, o = e.x - t.width, a = e.y, l = e.y - t.height, [p, u] = s;
    return ke("bounding vars", r, o, a, l), ke("object position", s), r > -p - i.width && -p > o && a > -u - i.height && -u > l;
  }
}
const Do = (n, e) => {
  const t = n.matchAll(e);
  return Array.from(t).map((s) => s[1]);
}, Lo = (n, e) => n.reduce((t, s) => (t[s] = e[s] || s, t), {});
class Bo {
  constructor(e, t, s, i) {
    this.mapFile = t, this.mapObject = s, this.factories = i, e.objectId(this);
  }
  give(e) {
    return this.mapFile.currentMap(
      this.factories.guest.create((t) => {
        const s = t.objects[e];
        if (!s)
          return;
        const i = t.types[s.type], r = /\$\{([a-zA-Z1-9]+)\}/g, a = Do(i.svg, r).filter((l) => l !== "width" && l !== "height");
        s.additionalFields = Lo(a, s.additionalFields ?? {}), this.mapObject.give(s);
      })
    ), this;
  }
  introduction() {
    return "patron";
  }
}
class zo {
  constructor() {
    S(this, "filledPoints", /* @__PURE__ */ new Map());
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
    const r = {
      x: +i.x + Math.round(s.width / 2),
      y: +i.y + Math.round(s.height / 2)
    }, o = {
      x: +t.x + Math.round(e.width / 2),
      y: +t.y + Math.round(e.height / 2)
    }, a = o.x - r.x, l = o.y - r.y, p = Math.abs(l) > Math.abs(a);
    let u = +t.x, c = +t.y;
    const h = p && l >= 0, y = !p && a >= 0, m = p && l < 0, w = !p && a < 0, f = { x: 0, y: 0 };
    let x = 0, F = 0;
    h ? (u += Math.round(e.width / 2), f.x = u, f.y = (t.y + i.y + s.height) / 2, x = i.x > t.x ? 1 : -1) : w ? (c += Math.round(e.height / 2), u += +e.width, f.x = (t.x + e.width + i.x) / 2, f.y = c, F = i.y > t.y ? 1 : -1) : m ? (u += Math.round(e.width / 2), c += +e.height, f.x = u, f.y = (t.y + e.height + i.y) / 2, x = i.x > t.x ? 1 : -1) : y && (c += Math.round(e.height / 2), f.x = (t.x + i.x + s.width) / 2, f.y = c, F = i.y > t.y ? 1 : -1);
    const E = [u, c].join("-"), L = this.filledPoints.get(E) || 0;
    return this.filledPoints.set(E, L + 1), {
      point: { x: u, y: c },
      breakPoint: f,
      shift: {
        x: x * L * 10,
        y: F * L * 10
      }
    };
  }
}
var Ho = Ps, Uo = gt, Ko = "Expected a function";
function Go(n, e, t) {
  var s = !0, i = !0;
  if (typeof n != "function")
    throw new TypeError(Ko);
  return Uo(t) && (s = "leading" in t ? !!t.leading : s, i = "trailing" in t ? !!t.trailing : i), Ho(n, e, {
    leading: s,
    maxWait: e,
    trailing: i
  });
}
var Wo = Go;
const Qo = /* @__PURE__ */ ft(Wo), Ve = j.debug("MapObjectsArrows");
class qo {
  constructor(e, t, s, i, r) {
    S(this, "previouslyRenderedArrows", /* @__PURE__ */ new Map());
    this.konvaLayer = e, this.mapFile = t, this.mapDep = s, this.arrowPath = i, this.factories = r, Ve("draw arrows on canvas");
    const o = this.factories.chain.create();
    this.konvaLayer.layer(this.factories.patron.create(o.receiveKey("layer"))), this.mapFile.currentMap(this.factories.patron.create(o.receiveKey("map"))), this.mapDep.objects(this.factories.patron.create(o.receiveKey("objects"))), o.result(
      this.factories.patron.create(
        this.factories.guest.create(
          Qo(({ layer: a, map: l, objects: p }) => {
            const u = (c, h) => {
              const y = l.types[h.type];
              this.arrowPath.breakPoints(
                {
                  shapeGeometry: {
                    width: c.width,
                    height: c.height
                  },
                  shapePosition: {
                    x: c.position[0],
                    y: c.position[1]
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
                    width: h.width || y.width,
                    height: h.height || y.height
                  },
                  shapePosition: {
                    x: h.position[0],
                    y: h.position[1]
                  },
                  lookToGeometry: {
                    width: c.width,
                    height: c.height
                  },
                  lookToPosition: {
                    x: c.position[0],
                    y: c.position[1]
                  }
                },
                this.factories.guest.create((m) => {
                  const w = m.join("-"), f = [c.id, h.id].join("-");
                  if (Ve("points", m), Ve(c, h), this.previouslyRenderedArrows.has(f)) {
                    const F = this.previouslyRenderedArrows.get(f);
                    F.arrow.show(), F.arrow.points(m);
                    return;
                  }
                  const x = new Cs({
                    x: 0,
                    y: 0,
                    points: m,
                    pointerLength: 20,
                    pointerWidth: 10,
                    fill: "#ccc",
                    stroke: "#bbb",
                    strokeWidth: 2,
                    zIndex: 2
                  });
                  this.previouslyRenderedArrows.set(f, {
                    arrow: x,
                    arrowKey: w
                  }), a.add(x);
                })
              );
            };
            this.arrowPath.clear(), this.previouslyRenderedArrows.forEach((c) => c.arrow.hide()), p.forEach((c) => {
              c.arrows && (Ve("visible objects", p.length), c.arrows.forEach((h) => {
                const y = p.find((m) => m.id === h.id) || l.objects[h.id];
                y && u(c, y);
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
const nt = j.debug("NewArrow"), ls = {
  width: 10,
  height: 10
};
class Jo {
  constructor(e, t, s, i) {
    S(this, "cursorGuest");
    S(this, "arrowCache");
    this.konvaLayer = e, this.cursorPosition = t, this.arrowPath = s, this.factories = i, this.cursorGuest = this.factories.sourceEmpty.create(), this.arrowCache = this.factories.sourceEmpty.create();
  }
  /**
   * Создать новую стрелку для объекта
   */
  forObject(e) {
    nt("start watch cursor"), this.cursorGuest.value(
      this.factories.guest.create((i) => {
        Vt(i);
      })
    );
    let t = null;
    const s = this.factories.patron.create(
      this.factories.guest.create((i) => {
        nt("cursor moves"), this.konvaLayer.layer(
          this.factories.guest.create((r) => {
            nt("cursor moves in layer"), this.arrowPath.breakPoints(
              {
                shapeGeometry: {
                  width: e.width,
                  height: e.height
                },
                shapePosition: {
                  x: e.position[0],
                  y: e.position[1]
                },
                lookToGeometry: ls,
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
                shapeGeometry: ls,
                shapePosition: i
              },
              this.factories.guest.create((o) => {
                if (t) {
                  t.points(o);
                  return;
                }
                t = new Cs({
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
        Vt(e);
      })
    ), this.arrowCache.value(
      this.factories.guest.create((e) => {
        e.remove();
      })
    );
  }
}
const rt = j.debug("MapObjectBackground");
class Xo {
  constructor(e, t, s, i) {
    S(this, "mapNameCache");
    this.konvaLayer = e, this.mapFile = t, this.zIndex = s, this.factories = i, this.mapNameCache = i.cache.create(""), this.mapFile.currentMap(i.patron.create(this));
  }
  give(e) {
    return this.konvaLayer.layer(
      this.factories.patronOnce.create((t) => {
        rt("map received in background", e), this.mapNameCache.value(
          this.factories.guest.create((s) => {
            if (s === e.url)
              return;
            rt("background cache is not equals", s), this.mapNameCache.give(e.url), new Image();
            const i = document.querySelector(".grid-example");
            rt("grid example", i);
          })
        );
      })
    ), this;
  }
}
const Yo = j.debug("Breadcrumbs");
class Zo {
  constructor(e, t, s) {
    this.parentNames = e, this.mapFile = t, this.factories = s;
  }
  list(e) {
    const t = this.factories.chain.create();
    return this.parentNames.names(this.factories.guestCast.create(e, t.receiveKey("names"))), this.mapFile.mapFile(this.factories.guestCast.create(e, t.receiveKey("mapFile"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ names: s, mapFile: i }) => {
        Yo("map id", s, i), e.give(
          s.map((r) => {
            var o, a;
            return {
              title: ((a = (o = i[r]) == null ? void 0 : o.settings) == null ? void 0 : a.title) || "unknown",
              name: r
            };
          })
        );
      })
    ), e;
  }
}
const us = j.debug("CursorWithObjects");
class ea {
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
          const a = o.position[0], l = o.position[0] + o.width || 100, p = o.position[1], u = o.position[1] + o.height || 100;
          return s.x >= a && s.x <= l && s.y >= p && s.y <= u;
        });
        r ? (us("crossed with", r), e.give({
          x: r.position[0] + r.width / 2,
          y: r.position[1] + r.height / 2
        })) : (us("cursor pos", s), e.give(s));
      })
    ), this;
  }
}
const ds = j.debug("Drawer");
class ta {
  constructor(e, t) {
    S(this, "drawerNameCache");
    this.keyboard = e, this.factories = t, this.drawerNameCache = t.cache.create(""), this.keyboard.pressed(
      this.factories.patron.create(
        this.factories.guest.create((s) => {
          ds("new key in drawer", s), s === "Escape" && this.give("");
        })
      )
    );
  }
  isOpenedByName(e, t) {
    return this.drawerNameCache.value(
      this.factories.guestInTheMiddle.create(t, (s) => {
        ds("new drawer name", s), t.give(s === e);
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
class sa {
  value(e) {
    typeof performance > "u" && e.give(0);
    const t = 10;
    let s = performance.now(), i = 0;
    const r = () => requestAnimationFrame(() => {
      if (i += 1, i >= t) {
        const o = performance.now(), a = o - s;
        e.give(Math.round(1e3 / (a / i))), s = o, i = 0;
      }
      r();
    });
    return r(), e;
  }
}
class ia {
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
const hs = j.debug("app:MiniMap"), ps = 130;
class na {
  constructor(e, t, s, i) {
    S(this, "theSize");
    S(this, "thePoints");
    S(this, "viewportSizeCache");
    this.map = e, this.layer = t, this.stageSize = s, this.factories = i, this.theSize = i.sourceEmpty.create(), this.thePoints = i.sourceEmpty.create(), this.viewportSizeCache = i.sourceEmpty.create();
    const r = i.chain.create();
    e.objects(i.patron.create(r.receiveKey("objects"))), t.layer(i.patron.create(r.receiveKey("layer"))), s.value(i.patron.create(r.receiveKey("size"))), r.result(
      i.patron.create(
        i.guest.create(({ layer: o, size: a, objects: l }) => {
          const p = ps / a.width, u = {
            width: Math.round(o.width() * p),
            height: Math.round(o.height() * p)
          };
          this.viewportSizeCache.give(u);
          const c = {
            width: Math.round(a.width * p),
            height: Math.round(a.height * p)
          };
          this.theSize.give(c);
          const h = l.map((y) => ({
            id: y.id,
            x: Math.round(y.position[0] * p),
            y: Math.round(y.position[1] * p),
            width: Math.round(y.width * p),
            height: Math.round(y.height * p)
          }));
          hs("minimap points", h), this.thePoints.give(h);
        })
      )
    );
  }
  viewportPosition(e) {
    const t = this.factories.chain.create();
    return this.stageSize.value(this.factories.guestCast.create(e, t.receiveKey("size"))), this.layer.position(this.factories.guestCast.create(e, t.receiveKey("position"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ size: s, position: i }) => {
        const r = ps / s.width, o = {
          x: i.x * r * -1,
          y: i.y * r * -1
        };
        hs("scaled position is", o), e.give(o);
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
const fs = j.debug("Modal");
class ra {
  constructor(e, t) {
    S(this, "modalNameCache");
    this.keyboard = e, this.factories = t, fs("modal created"), this.modalNameCache = t.cache.create(""), this.keyboard.pressed(
      this.factories.patron.create(
        this.factories.guest.create((s) => {
          fs("new key in modal", s), s === "Escape" && this.give("");
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
class oa {
  constructor(e) {
    S(this, "messageCache");
    S(this, "notificationLifetimeDelay", 3500);
    S(this, "lastTimerHead", null);
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
const Oe = j.debug("ObjectGeometryFix");
class aa {
  constructor(e, t, s, i) {
    S(this, "innerReceive");
    this.mapFile = t, this.map = s, this.factories = i, e.objects(i.patron.create(this)), this.innerReceive = Ce((r) => {
      this.mapFile.currentMap(
        this.factories.guest.create((o) => {
          Oe("objects to fix", r);
          const a = document.querySelectorAll(".objects-container .rendered-object"), l = o.objects;
          let p = !1;
          a.forEach((u) => {
            const c = u.getAttribute("data-object-id");
            if (Oe("i see id", c), !c)
              return;
            const h = l[c];
            if (h && (Oe("dom object geometry", u.clientWidth, u.clientHeight), Oe("saved object geometry", h.width, h.height), (h.width !== u.clientWidth || h.height !== u.clientHeight) && (p = !0, Oe("update object geometry"), h.width = u.clientWidth, h.height = u.clientHeight), !h.width || !h.height)) {
              const y = o.types[h.type];
              h.width = y.width, h.height = y.height;
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
const Te = j.debug("MapObjectsRectsPatron");
class ca {
  constructor(e, t, s, i, r, o, a, l, p) {
    S(this, "previouslyRenderedRects", /* @__PURE__ */ new Map());
    this.konvaLayer = e, this.mapFile = t, this.mapObject = s, this.mapObjectCurrent = r, this.mapObjectForRendering = o, this.objectPosition = a, this.settings = l, this.factories = p, i.objects(this);
  }
  give(e) {
    return this.konvaLayer.layer(
      this.factories.patronOnce.create(
        this.factories.guest.create((t) => {
          const s = this.factories.chain.create();
          this.mapFile.currentMap(s.receiveKey("map")), this.settings.value(s.receiveKey("settings")), s.result(
            this.factories.guest.create((i) => {
              const { map: r, settings: o } = i;
              Te("rerender object rects"), this.previouslyRenderedRects.forEach((a) => {
                a.hide();
              }), e.forEach((a) => {
                const l = r.types[a.type], p = +a.width || +l.width || 100, u = +a.height || +l.height || 100;
                if (this.previouslyRenderedRects.has(a)) {
                  const h = this.previouslyRenderedRects.get(a);
                  h.width(p), h.height(u), h.x(+a.position[0]), h.y(+a.position[1]), h.show();
                  return;
                }
                Te("rect object", a, l);
                const c = new si({
                  x: +a.position[0],
                  y: +a.position[1],
                  width: p,
                  height: u,
                  name: a.id,
                  draggable: !o.readonly,
                  objectId: a.id,
                  zIndex: 3
                });
                this.previouslyRenderedRects.set(a, c), t.add(c), c.on("mouseenter", () => {
                  t.getStage().container().style.cursor = "pointer";
                }), c.on("mouseleave", () => {
                  t.getStage().container().style.cursor = "default";
                }), c.on("dragend", () => {
                  Te("drag ended"), this.objectPosition.position(
                    a,
                    {
                      x: c.x(),
                      y: c.y()
                    },
                    this.factories.guest.create((h) => {
                      this.mapObject.give({
                        ...a,
                        position: [h.x, h.y]
                      });
                    })
                  );
                }), c.on("dragmove", () => {
                  Te("dragmove works", c.x(), c.y()), t.getStage().container().style.cursor = "move", this.objectPosition.position(
                    a,
                    {
                      x: c.x(),
                      y: c.y()
                    },
                    this.factories.guest.create((h) => {
                      this.mapObjectForRendering.give({
                        ...a,
                        position: [h.x, h.y]
                      });
                    })
                  );
                }), c.on("click", () => {
                  Te("object clicked with id", a.id), this.mapObjectCurrent.give(a.id);
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
class la {
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
              this.factories.guest.create((a) => {
                a.getStage().width(i.contentRect.width - o.left), a.getStage().height(i.contentRect.height - o.top), this.canvas.give(r), this.konvaLayer.give(a);
              })
            );
          })
        );
      });
    }), t = document.querySelector("body");
    return t && e.observe(t), this;
  }
}
const ua = j.debug("StagePosition");
class da {
  constructor(e) {
    this.stageMove = e;
  }
  give(e) {
    return ua("received position", e), this.stageMove.move(e), this;
  }
}
class ha {
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
const ms = j.debug("Zindex");
class pa {
  constructor(e) {
    S(this, "fnsCache");
    this.factories = e, this.fnsCache = e.cache.create([]), this.fnsCache.value(
      e.patron.create(
        e.guest.create(
          Ce((t) => {
            ms("zindex fns run"), t.forEach((s) => s());
          }, 50)
        )
      )
    );
  }
  give(e) {
    return ms("zindex received value"), this.fnsCache.value(
      this.factories.guest.create((t) => {
        this.fnsCache.give(t.concat(e));
      })
    ), this;
  }
}
const gs = j.debug("app:BrowserCanvas");
class fa {
  constructor(e) {
    S(this, "canvasCache");
    this.factories = e, this.canvasCache = e.sourceEmpty.create();
  }
  canvas(e) {
    return this.canvasCache.value(e), this;
  }
  size(e) {
    return this.canvasCache.value(
      this.factories.guestInTheMiddle.create(e, (t) => {
        const s = t.width || t.clientWidth, i = t.height || t.clientHeight;
        gs("canvas size", s, i), e.give({
          height: i,
          width: s
        });
      })
    ), this;
  }
  give(e) {
    return gs("receive new canvas", e), this.canvasCache.give(e), this;
  }
}
const ma = j.debug("Cursor");
class ga {
  constructor(e, t) {
    S(this, "cursorPool");
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
      ma("move cursor fired", r), this.cursorPool.give(r);
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
class va {
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
const De = j.debug("ControlCombo");
class ya {
  constructor(e, t) {
    this.keyboard = e, this.factories = t;
  }
  /**
   * Случилась комбинация ctrl + keyCode
   */
  happened(e, t) {
    this.keyboard.event(
      this.factories.guestInTheMiddle.create(t, (s) => {
        De("combo happened look for key", e, "received", s.code), s.ctrlKey && s.code === e && s.type === "keydown" && (s.preventDefault(), t.give(s));
      })
    );
  }
  /**
   * Случилась комбинация ctrl + keyCode с условием comboCondition
   */
  happenedConditional(e, t, s) {
    De("combo control happened registration"), this.keyboard.event(
      this.factories.guestInTheMiddle.create(s, (i) => {
        De("keyboard event come"), t.value(
          this.factories.guest.create((r) => {
            De("combo happened look for key", e, "received", i.code), r && i.ctrlKey && i.code === e && i.type === "keydown" && (i.preventDefault(), s.give(i));
          })
        );
      })
    );
  }
}
const Fe = j.debug("Keyboard");
class ba {
  constructor(e) {
    S(this, "pressedPool");
    S(this, "combinationsPool");
    Fe("keyboard created"), this.pressedPool = e.pool.create(this), this.combinationsPool = e.pool.create(this), window == null || window.addEventListener("keyup", (t) => {
      Fe("keyboard pressed", t.key), this.pressedPool.give(t.key);
    }), hn({
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
const vs = j.debug("app:konva:KonvaLayer");
class wa {
  constructor(e, t, s, i) {
    S(this, "guestChain");
    S(this, "positionCache");
    S(this, "layerCache");
    this.canvasDep = e, this.stageMoveRestriction = s, this.factories = i, this.positionCache = i.cache.create({
      x: 0,
      y: 0
    }), this.guestChain = i.chain.create(), this.layerCache = i.sourceEmpty.create(), this.canvasDep.canvas(i.patron.create(this.guestChain.receiveKey("canvas"))), t.value(this.guestChain.receiveKey("stageSize")), this.guestChain.result(
      i.guest.create(
        ({ canvas: r }) => {
          vs("create new konva stage");
          const o = new At.Stage({
            width: r.clientWidth,
            height: r.clientHeight,
            container: r,
            fill: "#ffeeee",
            draggable: !0
          }), a = new At.Layer();
          o.add(a), a.draw(), this.layerCache.give(a), o.on("dragend", (p) => {
            if (!(p.target instanceof Et))
              return;
            const u = {
              x: o.x(),
              y: o.y()
            };
            vs("new position", u), this.positionCache.give(u);
          }), o.on("dragmove", (p) => {
            if (!(p.target instanceof Et))
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
class _a {
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
const Ca = j.debug("position");
class xa {
  constructor(e, t, s, i, r) {
    this.layer = e, this.canvas = t, this.stageSize = s, this.stageMoveRestriction = i, this.factories = r;
  }
  move(e) {
    Ca("move stage to new point", e.position), this.stageSize.value(
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
const O = X(), We = new ba(O), Ns = new je({
  readonly: !1,
  presets: {}
}), $a = new ra(We, O), As = new ta(We, O), Qe = new oa(O), ce = new sr(O), Es = O.sourceEmpty.create(), z = new or(Es, ce, O), ka = new ir(z), Oa = new xi(ka), vt = new cr(z, ce, O), yt = new Fs(vt, ce, O), Ta = new Ss(yt, vt, O), te = new Fs(z, ce, O), Fa = new ht((n) => {
  z.currentMap(new ze(n));
}), qe = new lr(As, O), Sa = new Oo(O), Ma = new ko(z, te, O), me = new fa(O), ge = new Eo(), Rs = new Ro(me, ge, O), se = new wa(me, ge, Rs, O), ja = new pa(O), Ia = new Xo(se, z, ja, O), xe = new Ss(te, z, O), Pa = new fr(
  te,
  z,
  [new mt(Qe, new ur(z, O), O)],
  O
), Na = new _a(se, O), Aa = new dr(te, xe, me, Na, O), Vs = new jo(z, O), Ds = new So(
  te,
  z,
  [
    new mt(
      Qe,
      new Io(Vs, O),
      O
    )
  ],
  O
), Ea = new Fo(
  te,
  z,
  [new mt(Qe, Vs, O)],
  O
), Ra = new To(Ds), Je = new Vo(se, me, vt, O), Va = new aa(
  Je,
  z,
  te,
  O
), Da = new ca(
  se,
  z,
  xe,
  Je,
  qe,
  Ta,
  new Co(new _o(ge, O), O),
  Ns,
  O
), La = new ga(se, O), Ba = new ea(Je, La, O), Ls = new zo(), Bs = new Jo(se, Ba, Ls, O), za = new qo(se, z, yt, Ls, O), Ha = new na(yt, se, ge, O), Ua = new gr(
  qe,
  te,
  xe,
  Bs,
  O
), Ka = new la(z, me, se, O), Ga = new Bo(
  qe,
  z,
  xe,
  O
), Wa = new rr(z, ce, O), Qa = new pr(xe), qa = new sa(), bt = new hr(ce, O), Ja = new Zo(bt, z, O), Xa = new yo(ce, O), Ya = new Po(bt, z, O), Za = new ya(We, O), ec = new ia(z, O), zs = new xa(se, me, ge, Rs, O), tc = new da(zs), sc = new ha(zs, O), ic = new No(te, O), nc = new nr(z, te, ce, O), rc = new $o(te, ge, se, O), Hs = new be();
new va(Hs);
const oc = {
  mapCurrentID: ce,
  mapFile: z,
  mapCurrent: te,
  mapCurrentSource: Fa,
  mapRemoved: Wa,
  mapSettings: Ma,
  mapObject: xe,
  mapObjectRemoved: Pa,
  mapType: Ds,
  mapTypeRemoved: Ea,
  mapTypeNew: Ra,
  mapObjectsVisible: Je,
  mapObjectCurrent: qe,
  mapObjectNew: Aa,
  mapObjectsLink: Ua,
  mapTypeCurrent: Sa,
  mapRects: Da,
  mapBackground: Ia,
  mapObjectArrows: za,
  mapObjectsGeometryFix: Va,
  canvas: me,
  miniMap: Ha,
  notification: Qe,
  modal: $a,
  drawer: As,
  konvaLayer: se,
  resizing: Ka,
  objectAdditionalFieldsFix: Ga,
  mapObjectRelationRemoved: Qa,
  fps: qa,
  breadcrumbs: Ja,
  mapObjectUrl: Xa,
  keyboard: We,
  parentNames: bt,
  parentTypes: Ya,
  controlCombo: Za,
  menu: ec,
  stagePosition: tc,
  stagePositionByObjectId: sc,
  objectsMatchedToQuery: ic,
  stageSize: ge,
  mapHistory: nc,
  fileContent: Es,
  newArrow: Bs,
  objectsOutsideScreen: rc,
  settings: Ns,
  documentTitle: Oa,
  sidebarDraggable: Hs
}, H = () => oc;
class P {
  constructor(e = void 0) {
    S(this, "innerRef");
    this.innerRef = W(e);
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
const ac = { key: 0 }, cc = { class: "flex-grow overflow-y-auto" }, lc = {
  key: 1,
  class: "flex gap-1"
}, wt = /* @__PURE__ */ V({
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
    const t = n, s = e, i = fe(() => ["e2e-drawer-back absolute z-10 top-0 left-0 w-full h-full bg-black/50"]), r = {
      ltr: "top-0 left-0 w-[50%] max-w-[900px] ",
      rtl: "top-0 right-0 w-[50%] max-w-[900px] ",
      ttb: "top-0 right-0 left-0",
      btt: "top-auto h-[900px] max-h-[50%] bottom-0 right-0 left-0"
    }, { drawer: o } = H(), a = () => {
      o.give(""), s("close");
    }, l = o.isOpenedByName(t.name, new P()).ref();
    return (p, u) => (g(), K(ws, { name: "fade" }, {
      default: C(() => [
        d(l) ? (g(), b("div", {
          key: 0,
          class: oe(i.value),
          onClick: a
        }, [
          _("div", {
            class: oe(["absolute bg-white h-full p-3 flex flex-col overflow-hidden", r[n.direction]]),
            onClick: u[0] || (u[0] = we(() => {
            }, ["stop"]))
          }, [
            p.$slots.header ? (g(), b("div", ac, [
              ee(p.$slots, "header", { class: "BaseDrawer-Header" })
            ])) : N("", !0),
            _("div", cc, [
              ee(p.$slots, "default")
            ]),
            p.$slots.footer ? (g(), b("div", lc, [
              ee(p.$slots, "footer")
            ])) : N("", !0)
          ], 2)
        ], 2)) : N("", !0)
      ]),
      _: 3
    }));
  }
}), J = /* @__PURE__ */ V({
  __name: "BaseIcon",
  props: {
    icon: {
      type: String
    }
  },
  setup(n) {
    const e = {
      "fa-bars": yi,
      "fa-text-width": vi,
      "fa-search": gi,
      "fa-history": mi,
      "fa-plus-square": fi,
      "fa-cog": pi,
      "fa-file-text": hi,
      "fa-rotate-left": di,
      "fa-rotate-right": ui,
      "fa-map": li,
      "fa-close": ci,
      "fa-arrow-left": ai,
      "fa-arrow-right": oi,
      "fa-arrow-down": ri,
      "fa-arrow-up": ni
    };
    return (t, s) => (g(), K(d(ii), {
      icon: e[n.icon]
    }, null, 8, ["icon"]));
  }
}), uc = /* @__PURE__ */ _("h2", { class: "text-lg font-bold" }, " Карты в файле ", -1), dc = ["onClick"], hc = /* @__PURE__ */ V({
  __name: "AppFileMaps",
  setup(n) {
    const {
      mapFile: e,
      mapCurrentID: t,
      drawer: s,
      mapRemoved: i
    } = H(), r = e.mapFile(new P()).ref(), o = t.id(new P()).ref(), a = (l) => {
      confirm("Вы уверены?") && i.give(l);
    };
    return (l, p) => (g(), K(wt, {
      direction: "rtl",
      name: "fileMaps"
    }, {
      header: C(() => [
        uc
      ]),
      default: C(() => [
        _("div", null, [
          (g(!0), b(U, null, Q(d(r), (u, c) => (g(), b("div", {
            key: c,
            class: "flex items-center gap-2"
          }, [
            _("a", {
              href: "#",
              class: oe({ "font-bold": d(o) === c }),
              onClick: we((h) => {
                d(t).give(c), d(s).give("");
              }, ["prevent"])
            }, k(u.settings.title), 11, dc),
            v(J, {
              onClick: (h) => a(c),
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
}), pc = { class: "AppMenuObject" }, fc = {
  key: 0,
  class: "AppMenuObject-Empty"
}, mc = {
  key: 1,
  class: "flex flex-col gap-1"
}, gc = ["onClick"], vc = ["innerHTML"], yc = /* @__PURE__ */ V({
  __name: "AppMenuObject",
  setup(n) {
    const {
      controlCombo: e,
      drawer: t,
      menu: s,
      stagePosition: i
    } = H(), { guest: r, patron: o } = X(), a = s.menuObjects(new P()).ref();
    return e.happened(
      "KeyM",
      o.create(r.create(() => {
        t.give("menu");
      }))
    ), (l, p) => (g(), K(wt, {
      direction: "rtl",
      name: "menu"
    }, {
      default: C(() => [
        _("div", pc, [
          d(a).length ? (g(), b("div", mc, [
            (g(!0), b(U, null, Q(d(a), (u) => (g(), b("a", {
              key: u.id,
              class: "AppMenuObject-Item",
              href: "#",
              onClick: we((c) => {
                d(i).give(u), d(t).give("");
              }, ["prevent"])
            }, [
              _("span", {
                innerHTML: u.additionalName ? u.additionalName : u.name
              }, null, 8, vc)
            ], 8, gc))), 128))
          ])) : (g(), b("div", fc, k(l.$t("appMenuObject.noItems")), 1))
        ])
      ]),
      _: 1
    }));
  }
}), R = /* @__PURE__ */ V({
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
      class: oe(t)
    }, [
      ee(s.$slots, "default")
    ]));
  }
}), bc = {
  key: 0,
  title: "Назад",
  class: "absolute text-white left-0 top-0 -ml-5 flex justify-center items-center bg-primary/70 hover:bg-primary-second/70 cursor-pointer w-5"
}, wc = {
  key: 1,
  class: "BaseModal-Header"
}, _c = { class: "overflow-y-auto flex-grow" }, Cc = {
  key: 2,
  class: "BaseModal-Footer"
}, ve = /* @__PURE__ */ V({
  __name: "BaseModal",
  props: {
    name: {
      type: String,
      required: !0
    }
  },
  setup(n) {
    const { modal: e } = H(), t = n, s = e.isOpenedByName(t.name, new P()).ref(), i = [], r = () => {
      e.give("");
    };
    return (o, a) => (g(), K(ws, { name: "fade" }, {
      default: C(() => [
        d(s) ? (g(), b("div", {
          key: 0,
          class: "absolute rounded-main overflow-y-auto flex justify-center items-center top-0 left-0 bg-black/10 z-20 h-full w-full",
          onClick: r
        }, [
          _("div", {
            class: "w-full relative flex flex-col max-w-[800px] max-h-[90%] bg-white p-3",
            onClick: a[0] || (a[0] = we(() => {
            }, ["stop"]))
          }, [
            i.length > 1 ? (g(), b("div", bc, " < ")) : N("", !0),
            _("div", {
              title: "Закрыть",
              class: "e2e-modal-close absolute text-white right-0 top-0 -mr-5 flex justify-center items-center bg-danger/70 hover:bg-danger-second/70 cursor-pointer w-5",
              onClick: r
            }, " × "),
            o.$slots.header ? (g(), b("div", wc, [
              ee(o.$slots, "header")
            ])) : N("", !0),
            _("div", _c, [
              ee(o.$slots, "default")
            ]),
            o.$slots.footer ? (g(), b("div", Cc, [
              ee(o.$slots, "footer")
            ])) : N("", !0)
          ])
        ])) : N("", !0)
      ]),
      _: 3
    }));
  }
}), xc = { class: "AppPresets" }, $c = /* @__PURE__ */ _("div", { class: "text-md font-bold mb-2" }, "Общие", -1), kc = { class: "flex flex-col gap-2" }, Oc = { class: "text-md font-bold mb-1" }, Tc = { class: "flex gap-2 flex-wrap items-end" }, Fc = { class: "AppTypesParent-ItemTitle" }, Sc = ["innerHTML"], Mc = /* @__PURE__ */ V({
  __name: "AppPresets",
  setup(n) {
    const {
      svgMapTypeImage: e
    } = X(), { mapType: t, settings: s } = H(), i = new P();
    s.value(i);
    const r = fe(
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
    return (o, a) => (g(), K(ve, { name: "presets" }, {
      default: C(() => [
        _("div", xc, [
          $c,
          _("div", kc, [
            (g(!0), b(U, null, Q(r.value, (l, p) => (g(), b("div", { key: p }, [
              _("h3", Oc, k(p), 1),
              _("div", Tc, [
                (g(!0), b(U, null, Q(l, (u) => (g(), b("div", {
                  key: u.preset.name,
                  class: "flex flex-col gap-2"
                }, [
                  _("div", Fc, k(u.preset.name), 1),
                  _("div", {
                    class: "AppTypesParent-ItemImage",
                    innerHTML: u.image,
                    style: re(`width:${u.preset.width}px;height:${u.preset.height}px`)
                  }, null, 12, Sc),
                  v(R, {
                    class: "AppTypesParent-ItemButton e2e-add-preset-type",
                    type: "success",
                    size: "sm",
                    onClick: (c) => d(t).give({ name: u.preset.name, type: u.preset })
                  }, {
                    default: C(() => [
                      A(k(o.$t("general.addToMap")), 1)
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
}), ne = /* @__PURE__ */ V({
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
    const t = n, s = e, i = W(null);
    le(
      i,
      Ce(() => {
        t.autofocus && i.value.focus();
      }, 500)
    );
    const r = Ge(t, "modelValue", s);
    return (o, a) => He((g(), b("input", {
      ref_key: "input",
      ref: i,
      "onUpdate:modelValue": a[0] || (a[0] = (l) => Me(r) ? r.value = l : null),
      class: "block rounded-main w-full p-2 border border-solid border-body-dark",
      type: "text"
    }, null, 512)), [
      [_s, d(r)]
    ]);
  }
});
class _t {
  constructor(e) {
    S(this, "pool", new Ue(this));
    this.refSource = e, le(
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
const jc = { class: "AppSearch" }, Ic = {
  key: 0,
  class: "AppSearch-Items"
}, Pc = ["onClick"], Nc = ["innerHTML"], Ac = ["innerHTML"], Ec = ["innerHTML"], Rc = { key: 1 }, Vc = { key: 2 }, Dc = /* @__PURE__ */ V({
  __name: "AppSearch",
  setup(n) {
    const {
      objectsMatchedToQuery: e,
      controlCombo: t,
      modal: s,
      stagePosition: i
    } = H(), { guest: r, patron: o } = X(), a = W(), l = j.debug("app:AppSearch");
    s.isOpenedByName(
      "search",
      o.create(r.create((c) => {
        setTimeout(() => {
          c && a.value && (l("search is opened", c), a.value.$el.focus());
        }, 500);
      }))
    );
    const p = W(""), u = e.objects(
      new _t(p),
      new P([])
    ).ref();
    return t.happened(
      "KeyF",
      o.create(r.create(() => {
        s.give("search");
      }))
    ), (c, h) => (g(), K(ve, { name: "search" }, {
      default: C(() => [
        _("div", jc, [
          v(ne, {
            ref_key: "inputRef",
            ref: a,
            modelValue: p.value,
            "onUpdate:modelValue": h[0] || (h[0] = (y) => p.value = y),
            class: "mb-2 e2e-query-input",
            placeholder: c.$t("general.specifyQuery")
          }, null, 8, ["modelValue", "placeholder"]),
          d(u).length ? (g(), b("div", Ic, [
            (g(!0), b(U, null, Q(d(u), (y) => (g(), b("div", {
              key: y.name,
              class: "cursor-pointer",
              onClick: we((m) => {
                d(i).give(y), d(s).give("");
              }, ["prevent"])
            }, [
              _("b", {
                class: "AppSearch-ItemName",
                innerHTML: y.name
              }, null, 8, Nc),
              y.additionalName ? (g(), b("b", {
                key: 0,
                class: "AppSearch-ItemName",
                innerHTML: y.additionalName
              }, null, 8, Ac)) : N("", !0),
              y.additionalFields ? (g(), b("div", {
                key: 1,
                innerHTML: Object.values(y.additionalFields).join(" ")
              }, null, 8, Ec)) : N("", !0)
            ], 8, Pc))), 128))
          ])) : p.value ? (g(), b("div", Rc, k(c.$t("general.noResults")), 1)) : (g(), b("div", Vc, k(c.$t("general.resultsWillBeHere")), 1))
        ])
      ]),
      _: 1
    }));
  }
}), Lc = { class: "AppTypes" }, Bc = /* @__PURE__ */ _("div", { class: "text-md font-bold mb-2" }, "Родительские типы", -1), zc = { class: "flex gap-2 items-end" }, Hc = { class: "AppTypesParent-ItemTitle" }, Uc = ["innerHTML"], Kc = /* @__PURE__ */ V({
  __name: "AppTypesParent",
  setup(n) {
    const { parentTypes: e, mapType: t } = H(), { svgMapTypeImage: s } = X(), i = e.types(new P()).ref(), r = fe(() => {
      var o;
      return (o = i.value) == null ? void 0 : o.map((a) => ({
        type: a,
        image: s.create(a).markup()
      })).sort((a, l) => +(a.type.name >= l.type.name));
    });
    return (o, a) => (g(), K(ve, { name: "parentTypes" }, {
      default: C(() => [
        _("div", Lc, [
          Bc,
          _("div", zc, [
            (g(!0), b(U, null, Q(r.value, (l) => (g(), b("div", {
              key: l.type.name,
              class: "flex flex-col gap-2"
            }, [
              _("div", Hc, k(l.type.name), 1),
              _("div", {
                class: "AppTypesParent-ItemImage",
                innerHTML: l.image,
                style: re(`width:${l.type.width}px;height:${l.type.height}px`)
              }, null, 12, Uc),
              v(R, {
                class: "AppTypesParent-ItemButton e2e-add-preset-type",
                type: "success",
                size: "sm",
                onClick: (p) => d(t).give({ name: l.type.name, type: l.type })
              }, {
                default: C(() => [
                  A(k(o.$t("general.addToMap")), 1)
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
class Us {
  constructor(e, t = void 0) {
    S(this, "innerRef");
    this.executor = e, this.innerRef = W(t);
  }
  ref() {
    return this.executor(this.innerRef), this.innerRef;
  }
}
const Gc = { class: "flex gap-2" }, ot = /* @__PURE__ */ V({
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
    const i = Ge(n, "modelValue", e);
    return (r, o) => (g(), b("label", Gc, [
      He(_("input", {
        "onUpdate:modelValue": o[0] || (o[0] = (a) => Me(i) ? i.value = a : null),
        type: "checkbox"
      }, null, 512), [
        [Ys, d(i)]
      ]),
      r.$slots.default ? ee(r.$slots, "default", { key: 0 }) : (g(), b(U, { key: 1 }, [
        A(k(n.label), 1)
      ], 64))
    ]));
  }
}), Xe = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [s, i] of e)
    t[s] = i;
  return t;
}, Wc = {}, Qc = { class: "text-sm font-bold" };
function qc(n, e) {
  return g(), b("div", Qc, [
    ee(n.$slots, "default")
  ]);
}
const q = /* @__PURE__ */ Xe(Wc, [["render", qc]]), Jc = {}, Xc = { class: "mb-2" };
function Yc(n, e) {
  return g(), b("div", Xc, [
    ee(n.$slots, "default")
  ]);
}
const Z = /* @__PURE__ */ Xe(Jc, [["render", Yc]]), Zc = { class: "rounded-main p-2 border border-solid border-body-dark" }, el = { class: "flex gap-2 p-2 bg-white border border-solid border-body-dark rounded-main" }, Le = /* @__PURE__ */ V({
  __name: "BaseEditor",
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = n, s = e, i = bi({
      content: t.modelValue,
      extensions: [
        Ci
      ],
      onUpdate: () => {
        i.value && s("update:modelValue", i.value.getHTML());
      }
    });
    return Zs(() => {
      var r;
      (r = i.value) == null || r.destroy();
    }), le(() => t.modelValue, (r) => {
      !i.value || i.value.getHTML() === r || i.value.commands.setContent(r, !1);
    }), (r, o) => (g(), b("div", Zc, [
      v(d(wi), { editor: d(i) }, null, 8, ["editor"]),
      d(i) ? (g(), K(d(_i), {
        key: 0,
        editor: d(i),
        "tippy-options": { duration: 100 }
      }, {
        default: C(() => [
          _("div", el, [
            _("button", {
              onClick: o[0] || (o[0] = (a) => d(i).chain().focus().toggleBold().run()),
              class: oe({ "font-bold": d(i).isActive("bold") })
            }, " bold ", 2),
            _("button", {
              onClick: o[1] || (o[1] = (a) => d(i).chain().focus().toggleItalic().run()),
              class: oe({ "font-bold": d(i).isActive("italic") })
            }, " italic ", 2),
            _("button", {
              onClick: o[2] || (o[2] = (a) => d(i).chain().focus().toggleStrike().run()),
              class: oe({ "font-bold": d(i).isActive("strike") })
            }, " strike ", 2)
          ])
        ]),
        _: 1
      }, 8, ["editor"])) : N("", !0)
    ]));
  }
}), tl = ["value"], sl = /* @__PURE__ */ V({
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
    const t = n, i = Ge(t, "modelValue", e);
    return (r, o) => He((g(), b("select", {
      label: "select",
      "onUpdate:modelValue": o[0] || (o[0] = (a) => Me(i) ? i.value = a : null),
      class: "block bg-white rounded-main w-full p-2 border border-solid border-body-dark"
    }, [
      (g(!0), b(U, null, Q(t.items, (a) => (g(), b("option", {
        key: a[t.optionId],
        value: a[t.optionId]
      }, k(a[t.optionLabel]), 9, tl))), 128))
    ], 512)), [
      [ei, d(i)]
    ]);
  }
}), il = { class: "text-lg font-bold" }, nl = {
  key: 0,
  class: "flex gap-2 items-center"
}, rl = {
  key: 1,
  class: "flex gap-2 mt-2"
}, ol = { key: 0 }, al = { key: 1 }, cl = {
  key: 0,
  class: "flex flex-col gap-2"
}, ll = { class: "FormObject-Inner" }, ul = { class: "FormObject-Row" }, dl = { class: "FormObject-Row" }, hl = { class: "FormObject-Row" }, pl = { class: "my-2" }, fl = { class: "FormObject-Title" }, ml = { class: "FormObject-Row" }, gl = { class: "FormObject-Title" }, vl = { class: "FormObject-Row" }, yl = {
  key: 0,
  class: "FormObject-ArrowName"
}, bl = { class: "py-3 flex gap-1" }, wl = /* @__PURE__ */ V({
  __name: "FormObject",
  setup(n) {
    const e = Os("FormObject"), {
      mapObjectCurrent: t,
      mapFile: s,
      mapObject: i,
      mapCurrent: r,
      drawer: o,
      mapObjectRemoved: a,
      mapObjectRelationRemoved: l,
      mapObjectUrl: p,
      controlCombo: u
    } = H(), {
      patron: c,
      chain: h,
      guest: y
    } = X(), m = new Us(() => {
      const $ = h.create();
      t.objectId(c.create($.receiveKey("objectId"))), t.objectId(c.create((T) => {
        e("sep obj", T);
      })), s.currentMap(c.create($.receiveKey("map"))), s.currentMap(c.create((T) => {
        e("sep map", T);
      })), $.result(c.create(
        y.create(({ map: T, objectId: M }) => {
          e("object opened", M), m.value = T.objects[M];
        })
      ));
    }).ref(), w = r.types(new P()).ref(), f = s.currentMap(new P()).ref(), x = new _t(m), F = p.url(x, new P()).ref(), E = () => {
      t.give(""), o.give("");
    }, L = () => {
      a.give(m.value), E();
    }, G = () => {
      i.give({
        ...m.value,
        outlink: m.value.outlink || F.value
      }), E();
    }, I = ($) => {
      l.give({
        index: $,
        object: m.value
      });
    };
    return u.happenedConditional(
      "KeyS",
      o.openedByName("object"),
      c.create(y.create(G))
    ), ($, T) => (g(), K(wt, {
      name: "object",
      onClose: E
    }, {
      header: C(() => [
        _("h2", il, k($.$t("general.mapObject")), 1),
        d(m) ? (g(), b("small", nl, [
          _("span", null, " ID #" + k(d(m).id), 1)
        ])) : N("", !0),
        d(m) ? (g(), b("div", rl, [
          d(m).createTimestamp ? (g(), b("div", ol, " Создан: " + k(new Date(d(m).createTimestamp).toLocaleString()), 1)) : N("", !0),
          d(m).changeTimestamp ? (g(), b("div", al, " Изменен: " + k(new Date(d(m).changeTimestamp).toLocaleString()), 1)) : N("", !0)
        ])) : N("", !0)
      ]),
      footer: C(() => [
        _("div", bl, [
          v(R, {
            type: "success",
            onClick: G
          }, {
            default: C(() => [
              A(k($.$t("general.save")), 1)
            ]),
            _: 1
          }),
          v(R, {
            type: "danger",
            onClick: L
          }, {
            default: C(() => [
              A(k($.$t("general.delete")), 1)
            ]),
            _: 1
          }),
          v(R, { onClick: E }, {
            default: C(() => [
              A(k($.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: C(() => [
        d(m) ? (g(), b("div", cl, [
          _("div", ll, [
            _("div", ul, [
              v(ot, {
                modelValue: d(m).linked,
                "onUpdate:modelValue": T[0] || (T[0] = (M) => d(m).linked = M),
                label: $.$t("general.nameAsLink")
              }, null, 8, ["modelValue", "label"])
            ]),
            d(m).linked ? (g(), b(U, { key: 0 }, [
              v(q, null, {
                default: C(() => [
                  A(k($.$t("general.outerLink")), 1)
                ]),
                _: 1
              }),
              _("div", dl, [
                v(ne, {
                  "model-value": d(m).outlink || d(F),
                  "onUpdate:modelValue": T[1] || (T[1] = (M) => d(m).outlink = M)
                }, null, 8, ["model-value"])
              ]),
              _("div", hl, [
                v(ot, {
                  modelValue: d(m).targetBlank,
                  "onUpdate:modelValue": T[2] || (T[2] = (M) => d(m).targetBlank = M),
                  label: $.$t("general.inNewTab")
                }, null, 8, ["modelValue", "label"])
              ])
            ], 64)) : N("", !0),
            (g(!0), b(U, null, Q(d(m).additionalFields, (M, Y) => (g(), K(Z, {
              class: "mb-2",
              key: Y
            }, {
              default: C(() => [
                v(q, { class: "mb-1" }, {
                  default: C(() => [
                    A(k(Y), 1)
                  ]),
                  _: 2
                }, 1024),
                v(Le, {
                  modelValue: d(m).additionalFields[Y],
                  "onUpdate:modelValue": (ae) => d(m).additionalFields[Y] = ae
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              _: 2
            }, 1024))), 128)),
            v(Z, null, {
              default: C(() => [
                v(q, null, {
                  default: C(() => [
                    A(k($.$t("general.topName")), 1)
                  ]),
                  _: 1
                }),
                v(Le, {
                  modelValue: d(m).additionalName,
                  "onUpdate:modelValue": T[3] || (T[3] = (M) => d(m).additionalName = M)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            v(Z, null, {
              default: C(() => [
                v(q, null, {
                  default: C(() => [
                    A(k($.$t("general.bottomName")), 1)
                  ]),
                  _: 1
                }),
                v(Le, {
                  modelValue: d(m).name,
                  "onUpdate:modelValue": T[4] || (T[4] = (M) => d(m).name = M)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            v(Z, null, {
              default: C(() => [
                v(q, null, {
                  default: C(() => [
                    A(k($.$t("general.description")), 1)
                  ]),
                  _: 1
                }),
                v(Le, {
                  modelValue: d(m).description,
                  "onUpdate:modelValue": T[5] || (T[5] = (M) => d(m).description = M)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            v(Z, null, {
              default: C(() => [
                v(q, null, {
                  default: C(() => [
                    A(" Z-Index ")
                  ]),
                  _: 1
                }),
                v(ne, {
                  modelValue: d(m).zindex,
                  "onUpdate:modelValue": T[6] || (T[6] = (M) => d(m).zindex = M),
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            v(Z, null, {
              default: C(() => [
                v(q, null, {
                  default: C(() => [
                    A(" Width ")
                  ]),
                  _: 1
                }),
                v(ne, {
                  modelValue: d(m).width,
                  "onUpdate:modelValue": T[7] || (T[7] = (M) => d(m).width = M),
                  step: "20",
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            v(Z, null, {
              default: C(() => [
                v(q, null, {
                  default: C(() => [
                    A(" Height ")
                  ]),
                  _: 1
                }),
                v(ne, {
                  modelValue: d(m).height,
                  "onUpdate:modelValue": T[8] || (T[8] = (M) => d(m).height = M),
                  step: "20",
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            v(Z, null, {
              default: C(() => [
                v(q, null, {
                  default: C(() => [
                    A(k($.$t("general.objectType")), 1)
                  ]),
                  _: 1
                }),
                v(sl, {
                  modelValue: d(m).type,
                  "onUpdate:modelValue": T[9] || (T[9] = (M) => d(m).type = M),
                  items: d(w),
                  "option-id": "id",
                  "option-label": "name"
                }, null, 8, ["modelValue", "items"])
              ]),
              _: 1
            }),
            _("div", pl, [
              v(ot, {
                modelValue: d(m).inMenu,
                "onUpdate:modelValue": T[10] || (T[10] = (M) => d(m).inMenu = M),
                label: $.$t("general.useInMenu")
              }, null, 8, ["modelValue", "label"])
            ]),
            d(m).inMenu ? (g(), b(U, { key: 1 }, [
              _("div", fl, k($.$t("general.menuOrder")), 1),
              _("div", ml, [
                v(ne, {
                  modelValue: d(m).menuOrder,
                  "onUpdate:modelValue": T[11] || (T[11] = (M) => d(m).menuOrder = M),
                  type: "number"
                }, null, 8, ["modelValue"])
              ])
            ], 64)) : N("", !0),
            d(m).arrows && d(m).arrows.length ? (g(), b(U, { key: 2 }, [
              _("div", gl, k($.$t("general.relations")), 1),
              _("div", vl, [
                (g(!0), b(U, null, Q(d(m).arrows, (M, Y) => {
                  var ae;
                  return g(), b("div", {
                    key: M.id,
                    class: "FormObject-Arrow"
                  }, [
                    (ae = d(f)) != null && ae.objects[M.id] ? (g(), b("span", yl, " #" + k(Y + 1) + " " + k(d(f).objects[M.id].name), 1)) : N("", !0),
                    v(R, {
                      class: "FormObject-ArrowButton",
                      type: "danger",
                      size: "sm",
                      onClick: (ye) => I(Y)
                    }, {
                      default: C(() => [
                        A(k($.$t("general.delete")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]);
                }), 128))
              ])
            ], 64)) : N("", !0)
          ])
        ])) : N("", !0)
      ]),
      _: 1
    }));
  }
}), _l = { class: "BaseTextarea" }, Cl = ["v-bind"], Ks = /* @__PURE__ */ V({
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
    const i = Ge(n, "modelValue", e);
    return (r, o) => (g(), b("div", _l, [
      He(_("textarea", {
        ref: "textarea",
        "v-bind": r.$attrs,
        "onUpdate:modelValue": o[0] || (o[0] = (a) => Me(i) ? i.value = a : null),
        class: "rounded-main block w-full p-2 border min-h-[200px] border-solid border-body-dark"
      }, null, 8, Cl), [
        [_s, d(i)]
      ])
    ]));
  }
}), xl = { class: "text-lg font-bold" }, $l = {
  key: 0,
  class: "flex flex-col"
}, kl = { class: "flex justify-end pt-4 gap-2" }, Ol = /* @__PURE__ */ V({
  __name: "FormType",
  setup(n) {
    const {
      mapTypeCurrent: e,
      mapFile: t,
      mapType: s,
      modal: i,
      controlCombo: r
    } = H(), { patron: o, chain: a, guest: l } = X();
    e.typeId(
      o.create(l.create((m) => {
        m && i.give("type");
      }))
    );
    const p = W(""), u = a.create(), c = new Us(() => {
      e.typeId(o.create(u.receiveKey("typeId"))), t.currentMap(o.create(u.receiveKey("map"))), u.result(o.create(
        l.create(({ map: m, typeId: w }) => {
          var f;
          c.value = m.types[w], p.value = (f = c.value) == null ? void 0 : f.name;
        })
      ));
    }).ref(), h = () => {
      e.give(""), i.give(""), u.receiveKey("typeId").give("");
    }, y = () => {
      s.give({
        name: p.value,
        type: c.value
      }), h();
    };
    return r.happenedConditional(
      "KeyS",
      i.openedByName("type"),
      o.create(l.create(y))
    ), (m, w) => (g(), K(ve, { name: "type" }, {
      header: C(() => [
        _("h2", xl, k(m.$t("general.mapType")), 1)
      ]),
      footer: C(() => [
        _("div", kl, [
          v(R, {
            type: "success",
            onClick: y
          }, {
            default: C(() => [
              A(k(m.$t("general.save")), 1)
            ]),
            _: 1
          }),
          v(R, { onClick: h }, {
            default: C(() => [
              A(k(m.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: C(() => [
        d(c) ? (g(), b("div", $l, [
          v(Z, null, {
            default: C(() => [
              v(q, null, {
                default: C(() => [
                  A(" Название типа ")
                ]),
                _: 1
              }),
              v(ne, {
                modelValue: d(c).name,
                "onUpdate:modelValue": w[0] || (w[0] = (f) => d(c).name = f)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          v(Z, null, {
            default: C(() => [
              v(q, null, {
                default: C(() => [
                  A(" SVG ")
                ]),
                _: 1
              }),
              v(Ks, {
                modelValue: d(c).svg,
                "onUpdate:modelValue": w[1] || (w[1] = (f) => d(c).svg = f)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          v(Z, null, {
            default: C(() => [
              v(q, null, {
                default: C(() => [
                  A(" Ширина ")
                ]),
                _: 1
              }),
              v(ne, {
                modelValue: d(c).width,
                "onUpdate:modelValue": w[2] || (w[2] = (f) => d(c).width = f)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          v(Z, null, {
            default: C(() => [
              v(q, null, {
                default: C(() => [
                  A(" Высота ")
                ]),
                _: 1
              }),
              v(ne, {
                modelValue: d(c).height,
                "onUpdate:modelValue": w[3] || (w[3] = (f) => d(c).height = f)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          })
        ])) : N("", !0)
      ]),
      _: 1
    }));
  }
}), at = j.debug("MapObjectsWithTemplates");
class Tl {
  constructor(e, t, s) {
    this.mapObjects = e, this.map = t, this.factories = s;
  }
  objects(e) {
    const t = this.factories.chain.create();
    return this.map.types(this.factories.guestCast.create(e, t.receiveKey("types"))), this.mapObjects.objects(this.factories.guestCast.create(e, t.receiveKey("objects"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ types: s, objects: i }) => {
        at("visible objects", i);
        const r = i.map((o) => {
          const a = s.find((p) => String(p.id) === String(o.type));
          if (at("check type existed", a), !a)
            return {
              obj: o,
              template: ""
            };
          let { svg: l } = a;
          return at("type svg", l), o.additionalFields && Object.entries(o.additionalFields).forEach(([p, u]) => {
            l = l.replaceAll(`\${${p}}`, u);
          }), ["width", "height"].forEach((p) => {
            l = l.replaceAll(`\${${p}}`, o[p]);
          }), {
            obj: o,
            template: l
          };
        });
        e.give(r);
      })
    ), e;
  }
}
const Fl = /* @__PURE__ */ V({
  __name: "BaseNotify",
  setup(n) {
    const { notification: e } = H(), t = e.message(new P()).ref();
    return (s, i) => d(t) && d(t).text !== "hide" ? (g(), b("div", {
      key: 0,
      class: oe(["inline font-bold", `text-${d(t).type}-second`])
    }, k(d(t).text), 3)) : N("", !0);
  }
}), Sl = { class: "relative" }, Ml = { class: "absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-1" }, jl = { class: "text-sm z-10 p-2 absolute bottom-0 left-5" }, Il = /* @__PURE__ */ ti('<div class="absolute bottom-3 shadow-standard-second shadow-md drop-shadow right-3 z-10"><div class="grid-example grid grid-rows-2 grid-cols-2 bg-standard-second border border-standard-second gap-[1px] border-t-0 border-l-0"><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div></div></div><div class="absolute z-30 top-0 left-0 h-[18px] w-[22px] bg-white"></div>', 2), Pl = ["title"], Nl = { class: "font-bold" }, Al = ["title"], El = { class: "font-bold" }, Rl = ["title"], Vl = { class: "font-bold" }, Dl = ["title"], Ll = { class: "font-bold" }, Bl = ["data-object-id"], zl = { class: "absolute bottom-[100%] left-[50%] translate-x-[-50%] text-center pb-2 pointer-events-auto text-sm w-[300px]" }, Hl = ["innerHTML", "onClick"], Ul = ["innerHTML"], Kl = ["data-object-id", "innerHTML"], Gl = /* @__PURE__ */ V({
  __name: "TheEditor",
  setup(n) {
    const {
      canvas: e,
      mapObjectsVisible: t,
      mapCurrent: s,
      konvaLayer: i,
      fps: r,
      mapCurrentID: o,
      mapObjectUrl: a,
      stageSize: l,
      objectsOutsideScreen: p,
      stagePositionByObjectId: u,
      mapCurrentSource: c
    } = H(), h = X(), y = r.value(new P()).ref(), w = new Tl(
      t,
      s,
      h
    ).objects(new P([])).ref(), f = l.value(new P()).ref(), x = i.position(new P()).ref(), F = fe(() => {
      var ye;
      return (ye = f.value) == null ? void 0 : ye.width;
    }), E = new _t(F), L = h.numberChunks.create(10, E).chunks(new P()).ref(), G = W();
    dt(() => {
      e.give(G.value);
    });
    const I = (ye) => {
      a.open(ye, h.guest.create((ie) => {
        o.give(ie);
      }));
    }, $ = p.count(
      { axis: "x", direction: "negative" },
      new P()
    ).ref(), T = p.count(
      { axis: "x", direction: "positive" },
      new P()
    ).ref(), M = p.count(
      { axis: "y", direction: "negative" },
      new P()
    ).ref(), Y = p.count(
      { axis: "y", direction: "positive" },
      new P()
    ).ref(), ae = u.move.bind(u, c);
    return (ye, ie) => {
      var Ct, xt, $t, kt, Ot, Tt, Ft, St, Mt, jt, It, Pt;
      return g(), b("div", Sl, [
        _("div", Ml, [
          _("div", jl, [
            A(" Видимых объектов: " + k(d(w).length) + ", FPS: " + k(d(y)) + ", ", 1),
            v(Fl)
          ]),
          Il,
          ((Ct = d($)) == null ? void 0 : Ct.count) > 0 ? (g(), b("div", {
            key: 0,
            class: "pointer-events-auto absolute z-30 top-0 left-4 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(xt = d($)) == null ? void 0 : xt.count} шт. объектов левее`,
            onClick: ie[0] || (ie[0] = (B) => d(ae)(d($).nearestObjectId))
          }, [
            v(J, { icon: "fa-arrow-left" }),
            _("span", Nl, k(($t = d($)) == null ? void 0 : $t.count), 1)
          ], 8, Pl)) : N("", !0),
          ((kt = d(T)) == null ? void 0 : kt.count) > 0 ? (g(), b("div", {
            key: 1,
            class: "pointer-events-auto absolute z-30 p-1 top-0 right-0 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(Ot = d(T)) == null ? void 0 : Ot.count} шт. объектов правее`,
            onClick: ie[1] || (ie[1] = (B) => d(ae)(d(T).nearestObjectId))
          }, [
            _("span", El, k((Tt = d(T)) == null ? void 0 : Tt.count), 1),
            v(J, { icon: "fa-arrow-right" })
          ], 8, Al)) : N("", !0),
          ((Ft = d(M)) == null ? void 0 : Ft.count) > 0 ? (g(), b("div", {
            key: 2,
            class: "pointer-events-auto absolute z-30 top-[18px] left-0 w-[18px] bg-white flex flex-col leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(St = d(M)) == null ? void 0 : St.count} шт. объектов выше`,
            onClick: ie[2] || (ie[2] = (B) => d(ae)(d(M).nearestObjectId))
          }, [
            v(J, { icon: "fa-arrow-up" }),
            _("span", Vl, k((Mt = d(M)) == null ? void 0 : Mt.count), 1)
          ], 8, Rl)) : N("", !0),
          ((jt = d(Y)) == null ? void 0 : jt.count) > 0 ? (g(), b("div", {
            key: 3,
            class: "pointer-events-auto absolute z-30 p-1 bottom-0 left-0 w-[18px] bg-white flex flex-col-reverse leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(It = d(Y)) == null ? void 0 : It.count} шт. объектов ниже`,
            onClick: ie[3] || (ie[3] = (B) => d(ae)(d(Y).nearestObjectId))
          }, [
            v(J, { icon: "fa-arrow-down" }),
            _("span", Ll, k((Pt = d(Y)) == null ? void 0 : Pt.count), 1)
          ], 8, Dl)) : N("", !0),
          _("div", {
            class: oe({ "objects-container absolute top-0 left-0": !0 }),
            style: re({ width: `${d(f).width}px`, height: `${d(f).height}px`, transform: `translate(${d(x).x}px, ${d(x).y}px)` })
          }, [
            _("div", {
              class: "absolute flex top-0 left-0 w-full z-20 h-[20px] bg-default border-b-2 border-border text-right text-sm px-2",
              style: re({ transform: `translate(0, ${-d(x).y}px)` })
            }, [
              (g(!0), b(U, null, Q(d(L), (B) => (g(), b("span", {
                class: "flex-1 text-body-dark",
                key: `horiz_${B}`
              }, k(B) + "px", 1))), 128))
            ], 4),
            _("div", {
              class: "absolute flex [writing-mode:vertical-lr] top-0 left-0 h-full z-20 w-[20px] bg-default border-r-2 border-border text-left text-sm py-2",
              style: re({ transform: `translate(${-d(x).x}px, 0)` })
            }, [
              (g(!0), b(U, null, Q(d(L), (B) => (g(), b("span", {
                class: "flex-1 rotate-180 text-body-dark",
                key: `vert_${B}`
              }, k(B) + "px", 1))), 128))
            ], 4),
            (g(!0), b(U, null, Q(d(w), (B) => (g(), b("div", {
              key: B.obj.id,
              class: "absolute z-10",
              "data-object-id": B.obj.id,
              style: re(`width:${B.obj.width}px;height: ${B.obj.height}px;top: ${B.obj.position[1]}px;left:${B.obj.position[0]}px;z-index:${B.obj.zindex}`)
            }, [
              _("div", zl, [
                _("span", {
                  innerHTML: B.obj.additionalName,
                  class: oe([B.obj.linked && "cursor-pointer underline"]),
                  onClick: (zu) => I(B.obj)
                }, null, 10, Hl)
              ]),
              _("div", {
                class: "absolute top-[100%] left-[50%] translate-x-[-50%] text-center pt-2 text-sm w-[300px]",
                innerHTML: B.obj.name
              }, null, 8, Ul),
              _("div", {
                "data-object-id": B.obj.id,
                class: "rendered-object",
                innerHTML: B.template
              }, null, 8, Kl)
            ], 12, Bl))), 128))
          ], 4)
        ]),
        _("div", {
          class: "h-full",
          ref_key: "canvasWrapper",
          ref: G
        }, null, 512)
      ]);
    };
  }
}), Wl = { class: "flex flex-wrap gap-2" }, Ql = { key: 0 }, ql = { key: 1 }, Jl = ["onClick"], Xl = /* @__PURE__ */ V({
  __name: "BaseBreadcrumbs",
  setup(n) {
    const {
      breadcrumbs: e,
      mapCurrentID: t
    } = H(), s = e.list(new P()).ref();
    return (i, r) => (g(), b("div", Wl, [
      (g(!0), b(U, null, Q(d(s), (o, a) => (g(), b("span", {
        class: "flex gap-2",
        key: o.name
      }, [
        a !== 0 ? (g(), b("span", Ql, "/")) : N("", !0),
        a === d(s).length - 1 ? (g(), b("b", ql, "Открыто: " + k(o.title), 1)) : (g(), b("a", {
          key: 2,
          href: "#",
          onClick: we((l) => d(t).give(o.name), ["prevent"])
        }, k(o.title), 9, Jl))
      ]))), 128))
    ]));
  }
}), Yl = { class: "flex items-center p-3 gap-3" }, Zl = { class: "ml-auto gap-1 flex" }, eu = /* @__PURE__ */ V({
  __name: "TheHeader",
  setup(n) {
    const {
      drawer: e,
      modal: t,
      mapHistory: s,
      controlCombo: i,
      settings: r
    } = H(), { patron: o, guest: a } = X(), l = s.isNextPossible(new P()).ref(), p = s.isPrevPossible(new P()).ref();
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
    const u = new P();
    return r.value(u), (c, h) => (g(), b("div", Yl, [
      v(Xl, { class: "TheHeader-Breadcrumbs" }),
      _("div", Zl, [
        d(l) && !d(u).value.readonly ? (g(), K(R, {
          key: 0,
          size: "sm",
          title: "Отменить последнее действие",
          class: "w-7 block",
          onClick: h[0] || (h[0] = (y) => d(s).next())
        }, {
          default: C(() => [
            v(J, { icon: "fa-rotate-left" })
          ]),
          _: 1
        })) : N("", !0),
        d(p) && !d(u).value.readonly ? (g(), K(R, {
          key: 1,
          size: "sm",
          title: "Вернуть отмененное действие",
          class: "w-7 block",
          onClick: h[1] || (h[1] = (y) => d(s).prev())
        }, {
          default: C(() => [
            v(J, { icon: "fa-rotate-right" })
          ]),
          _: 1
        })) : N("", !0),
        v(R, {
          type: "success",
          size: "sm",
          class: "w-7 block e2e-open-menu",
          title: c.$t("general.menu"),
          onClick: h[2] || (h[2] = (y) => d(e).give("menu"))
        }, {
          default: C(() => [
            v(J, { icon: "fa-bars" })
          ]),
          _: 1
        }, 8, ["title"]),
        v(R, {
          title: c.$t("general.byText"),
          type: "primary",
          size: "sm",
          class: "w-7 block",
          onClick: h[3] || (h[3] = (y) => d(t).give("mapAsText"))
        }, {
          default: C(() => [
            v(J, { icon: "fa-text-width" })
          ]),
          _: 1
        }, 8, ["title"]),
        v(R, {
          class: "w-7 block e2e-search",
          size: "sm",
          onClick: h[4] || (h[4] = (y) => d(t).give("search"))
        }, {
          default: C(() => [
            v(J, { icon: "fa-search" })
          ]),
          _: 1
        }),
        v(R, {
          size: "sm",
          title: "Все карты файла",
          class: "w-7 block",
          onClick: h[5] || (h[5] = (y) => d(e).give("fileMaps"))
        }, {
          default: C(() => [
            v(J, { icon: "fa-map" })
          ]),
          _: 1
        })
      ])
    ]));
  }
}), tu = {}, su = { class: "text-lg font-bold" };
function iu(n, e) {
  return g(), b("span", su, [
    ee(n.$slots, "default")
  ]);
}
const nu = /* @__PURE__ */ Xe(tu, [["render", iu]]), ru = { class: "flex gap-1" }, ou = {
  key: 0,
  class: "TheMapAsText select-auto"
}, au = ["innerHTML"], cu = /* @__PURE__ */ V({
  __name: "TheMapAsText",
  setup(n) {
    const { mapFile: e, mapCurrent: t } = H(), {
      guest: s,
      patron: i,
      textOf: r,
      textNlAsBr: o,
      textWithoutHTML: a
    } = X(), l = e.currentMap(new P()).ref(), p = W(""), u = W([]);
    t.objects(
      i.create(
        s.create(Ce((f) => {
          u.value = f, o.create(
            r.create(
              f.map((x) => `<div class="TheMapAsText-Item">
                <h3>${x.name}</h3><p>${x.additionalName || ""}</p><p>${x.description || ""}</p><p>${x.additionalFields && Object.values(x.additionalFields).join("</p><p>")}</p></div>`).join("")
            )
          ).asString(
            s.create((x) => {
              p.value = x;
            })
          );
        }, 500))
      )
    );
    const { share: c, isSupported: h } = vn(), y = () => {
      h.value || alert("Sharing is not supported"), a.create(
        r.create(
          p.value
        )
      ).asString(
        s.create((f) => {
          c({
            text: f
          });
        })
      );
    }, m = W(), w = () => {
      var f, x;
      if (l.value) {
        const F = new Range();
        F.setStart(m.value, 0), F.setEnd(m.value, Object.values(u.value).length), (f = document.getSelection()) == null || f.removeAllRanges(), (x = document.getSelection()) == null || x.addRange(F);
      }
    };
    return (f, x) => (g(), K(ve, { name: "mapAsText" }, {
      header: C(() => [
        v(nu, { class: "block mb-3" }, {
          default: C(() => [
            A(k(f.$t("general.mapAsText")) + " ", 1),
            _("div", ru, [
              v(R, {
                size: "sm",
                type: "success",
                class: "font-normal",
                onClick: y
              }, {
                default: C(() => [
                  A(k(f.$t("general.share")), 1)
                ]),
                _: 1
              }),
              v(R, {
                size: "sm",
                type: "primary",
                class: "font-normal",
                onClick: w
              }, {
                default: C(() => [
                  A(k(f.$t("general.selectAll")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        })
      ]),
      default: C(() => [
        d(l) ? (g(), b("article", ou, [
          _("div", {
            ref_key: "textRef",
            ref: m,
            innerHTML: p.value
          }, null, 8, au)
        ])) : N("", !0)
      ]),
      _: 1
    }));
  }
}), lu = { key: 1 }, uu = /* @__PURE__ */ V({
  __name: "TheMiniMap",
  setup(n) {
    const { miniMap: e } = H(), t = e.points(new P()).ref(), s = e.size(new P()).ref(), i = e.viewportSize(new P()).ref(), r = e.viewportPosition(new P()).ref();
    return (o, a) => d(s) ? (g(), b("div", {
      key: 0,
      style: re({
        width: `${d(s).width}px`,
        height: `${d(s).height}px`
      }),
      class: "absolute pointer-events-none block bg-white bottom-[10px] mt-3 right-3 z-1 border border-solid border-body-dark"
    }, [
      d(r) ? (g(), b("div", {
        key: 0,
        style: re({
          width: `${d(i).width}px`,
          height: `${d(i).height}px`,
          top: `${d(r).y}px`,
          left: `${d(r).x}px`
        }),
        class: "absolute bg-primary/50"
      }, null, 4)) : N("", !0),
      d(t) ? (g(), b("div", lu, [
        (g(!0), b(U, null, Q(d(t), (l) => (g(), b("div", {
          key: l.id,
          class: "absolute w-1 h-1 block bg-danger",
          style: re({
            top: `${l.y}px`,
            left: `${l.x}px`,
            width: `${l.width}px`,
            height: `${l.height}px`
          })
        }, null, 4))), 128))
      ])) : N("", !0)
    ], 4)) : N("", !0);
  }
}), du = { class: "text-lg font-bold" }, hu = {
  key: 0,
  class: "TheSettings"
}, pu = { class: "mb-2" }, fu = { class: "TheSettings-Row" }, mu = { class: "flex gap-2 mb-2" }, gu = { class: "mb-2" }, vu = { class: "mb-2" }, yu = {
  href: "https://github.com/kosukhin/mind-map-creator",
  target: "_blank"
}, bu = { class: "flex gap-2" }, wu = /* @__PURE__ */ V({
  __name: "FormSettings",
  setup(n) {
    const {
      modal: e,
      mapFile: t,
      mapRemoved: s,
      mapSettings: i,
      controlCombo: r,
      parentNames: o,
      mapCurrentID: a
    } = H(), { patron: l, guest: p } = X(), u = o.names(new P()).ref(), c = t.currentMap(new P()).ref(), h = a.id(new P()).ref(), y = () => {
      e.give("");
    }, m = () => {
      i.give(c.value.settings), y();
    };
    return r.happenedConditional(
      "KeyS",
      e.openedByName("settings"),
      l.create(p.create(m))
    ), (w, f) => (g(), K(ve, { name: "settings" }, {
      header: C(() => [
        _("h2", du, k(w.$t("general.mapSettings")), 1)
      ]),
      default: C(() => {
        var x;
        return [
          (x = d(c)) != null && x.settings ? (g(), b("div", hu, [
            _("div", pu, [
              _("div", fu, [
                _("div", mu, [
                  d(u).length > 1 ? (g(), K(R, {
                    key: 0,
                    type: "primary",
                    class: "text-white",
                    onClick: f[0] || (f[0] = (F) => d(e).give("parentTypes"))
                  }, {
                    default: C(() => [
                      A(k(w.$t("general.parentTypes")), 1)
                    ]),
                    _: 1
                  })) : N("", !0),
                  v(R, {
                    type: "primary",
                    class: "text-white",
                    onClick: f[1] || (f[1] = (F) => d(e).give("export"))
                  }, {
                    default: C(() => [
                      A(k(w.$t("general.exportOrImport")), 1)
                    ]),
                    _: 1
                  }),
                  v(R, {
                    type: "primary",
                    class: "text-white e2e-open-presets",
                    onClick: f[2] || (f[2] = (F) => d(e).give("presets"))
                  }, {
                    default: C(() => [
                      A(" Пресеты ")
                    ]),
                    _: 1
                  })
                ])
              ]),
              _("div", gu, [
                _("label", null, [
                  _("b", null, k(w.$t("general.mapName")), 1),
                  v(ne, {
                    modelValue: d(c).settings.title,
                    "onUpdate:modelValue": f[3] || (f[3] = (F) => d(c).settings.title = F)
                  }, null, 8, ["modelValue"])
                ])
              ]),
              _("div", vu, [
                _("a", yu, k(w.$t("general.githubRepo")), 1)
              ])
            ]),
            _("div", bu, [
              v(R, {
                class: "TheSettings-Button",
                type: "success",
                onClick: f[4] || (f[4] = (F) => m())
              }, {
                default: C(() => [
                  A(k(w.$t("general.save")), 1)
                ]),
                _: 1
              }),
              v(R, {
                class: "TheSettings-Button",
                onClick: y
              }, {
                default: C(() => [
                  A(k(w.$t("general.cancel")), 1)
                ]),
                _: 1
              }),
              v(R, {
                class: "TheSettings-Button",
                type: "danger",
                onClick: f[5] || (f[5] = (F) => {
                  d(s).give(d(h)), y();
                })
              }, {
                default: C(() => [
                  A(k(w.$t("general.removeMap")), 1)
                ]),
                _: 1
              })
            ])
          ])) : N("", !0)
        ];
      }),
      _: 1
    }));
  }
}), _u = {}, Cu = { class: "BaseGroup" };
function xu(n, e) {
  return g(), b("div", Cu, [
    ee(n.$slots, "default")
  ]);
}
const $u = /* @__PURE__ */ Xe(_u, [["render", xu]]), ku = "default", Ou = /* @__PURE__ */ V({
  __name: "TheLinker",
  setup(n) {
    const { mapObjectsLink: e } = H(), t = e.objectIds(new P([])).ref();
    return (s, i) => (g(), K(R, {
      type: ku,
      onClick: i[0] || (i[0] = (r) => d(e).startLink())
    }, {
      default: C(() => [
        A(k(d(t).length === 1 ? "Выбиретие объект" : d(t).length === 2 ? "Второй объект" : "Связать объекты"), 1)
      ]),
      _: 1
    }));
  }
}), Tu = { class: "flex e2e-sidebar flex-col items-center gap-3 max-h-[100%] overflow-hidden" }, Fu = { class: "TheSideBar-ItemName" }, Su = ["innerHTML", "draggable", "title", "onDragend"], Mu = {
  key: 0,
  class: "flex gap-1"
}, ju = {
  key: 0,
  class: "mt-auto w-full p-3 pt-0"
}, Iu = /* @__PURE__ */ V({
  __name: "TheSideBar",
  setup(n) {
    const {
      mapObjectNew: e,
      mapCurrent: t,
      mapTypeCurrent: s,
      mapTypeRemoved: i,
      mapTypeNew: r,
      modal: o,
      settings: a,
      sidebarDraggable: l
    } = H(), p = t.types(new P()).ref(), u = W();
    dt(() => {
      l.give(u.value);
    });
    const { svgMapTypeImage: c } = X(), h = fe(() => {
      var m;
      return (m = p.value) == null ? void 0 : m.map((w) => ({
        type: w,
        image: c.create(w).markup()
      })).sort((w, f) => +(w.type.name >= f.type.name));
    }), y = new P();
    return a.value(y), (m, w) => (g(), b("div", Tu, [
      _("div", {
        ref_key: "dragWrapperRef",
        ref: u,
        class: "flex flex-col gap-3 flex-grow w-full overflow-y-auto"
      }, [
        (g(!0), b(U, null, Q(h.value, (f, x) => (g(), b("div", {
          key: x,
          class: "flex flex-col items-center justify-center gap-2"
        }, [
          _("div", Fu, k(f.type.name), 1),
          _("div", {
            innerHTML: f.image,
            class: "TheSideBar-ItemImage",
            draggable: d(y).value.readonly ? "false" : "true",
            style: re(`width:${f.type.width}px;height:${f.type.height}px`),
            title: m.$t("general.notifications.dragToCanvasToAdd"),
            onDragend: (F) => d(e).byTypeName(f.type.id, F)
          }, null, 44, Su),
          d(y).value.readonly ? N("", !0) : (g(), b("div", Mu, [
            v(R, {
              class: "text-white",
              size: "sm",
              type: "primary",
              onClick: (F) => d(s).give(f.type.id)
            }, {
              default: C(() => [
                A(k(m.$t("general.change")), 1)
              ]),
              _: 2
            }, 1032, ["onClick"]),
            v(R, {
              class: "text-white",
              size: "sm",
              type: "danger",
              onClick: (F) => d(i).give(f.type)
            }, {
              default: C(() => [
                A(k(m.$t("general.delete")), 1)
              ]),
              _: 2
            }, 1032, ["onClick"])
          ]))
        ]))), 128))
      ], 512),
      d(y).value.readonly ? N("", !0) : (g(), b("div", ju, [
        v($u, { class: "mb-1 grid gap-1 grid-cols-2" }, {
          default: C(() => [
            v(R, {
              title: m.$t("general.addType"),
              type: "success",
              onClick: w[0] || (w[0] = (f) => d(r).byName())
            }, {
              default: C(() => [
                v(J, { icon: "fa-plus-square" })
              ]),
              _: 1
            }, 8, ["title"]),
            v(R, {
              class: "e2e-show-settings",
              title: m.$t("general.settings"),
              type: "primary",
              onClick: w[1] || (w[1] = (f) => d(o).give("settings"))
            }, {
              default: C(() => [
                v(J, { icon: "fa-cog" })
              ]),
              _: 1
            }, 8, ["title"])
          ]),
          _: 1
        }),
        v(Ou, { class: "w-[100%] block mb-1" })
      ]))
    ]));
  }
});
class Pu {
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
    return this.basePatron.give(e), this.refWatcherCreated || (this.refWatcherCreated = !0, le(
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
class Nu {
  constructor(e) {
    this.baseSource = e;
  }
  value(e) {
    return this.baseSource.value(
      new _e(e, (t) => {
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
class Au {
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
const Eu = { class: "AppPresets" }, Ru = /* @__PURE__ */ _("div", { class: "text-md font-bold mb-2" }, "Экспорт\\Импорт текущей карты", -1), Vu = { class: "flex flex-col gap-2" }, Du = /* @__PURE__ */ V({
  __name: "AppExport",
  setup(n) {
    const { mapFile: e, mapCurrent: t } = H(), s = new Au(
      t,
      new ht((a) => {
        e.currentMap(new ze(a));
      })
    ), i = new Nu(s), r = new Pu(new P(), i);
    i.value(r);
    const o = r.ref();
    return (a, l) => (g(), K(ve, { name: "export" }, {
      default: C(() => [
        _("div", Eu, [
          Ru,
          _("div", Vu, [
            v(Ks, {
              modelValue: d(o),
              "onUpdate:modelValue": l[0] || (l[0] = (p) => Me(o) ? o.value = p : null)
            }, null, 8, ["modelValue"])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Lu = { class: "bg-body absolute top-0 left-0 w-full h-full" }, Bu = { class: "grid grid-cols-[200px_1fr] grid-rows-[50px_1fr] h-dvh relative" }, Zu = /* @__PURE__ */ V({
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
    const t = n, s = e, { fileContent: i, settings: r } = H(), { guest: o, patron: a } = X();
    return r.value((l) => {
      r.give({
        ...l,
        readonly: t.readonly,
        presets: t.presets
      });
    }), le(() => t.modelValue, (l) => {
      i.value(o.create((p) => {
        l !== p && i.give(l);
      }));
    }, {
      immediate: !0
    }), i.value(a.create((l) => {
      s("update:modelValue", l);
    })), (l, p) => (g(), b("div", Lu, [
      _("div", Bu, [
        v(eu, { class: "col-span-2" }),
        v(Iu),
        v(Gl, { class: "w-auto col-auto h-full" }),
        v(uu)
      ]),
      v(wl),
      v(Ol),
      v(wu),
      v(Mc),
      v(Kc),
      v(Du),
      v(yc),
      v(cu),
      v(Dc),
      v(hc)
    ]));
  }
}), ys = j.debug("FileSystemContent");
class ed {
  constructor(e, t, s) {
    S(this, "contentPatrons");
    S(this, "fileHandler", null);
    S(this, "contentSource");
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
    if (ys("save file as content string", e), !this.fileHandler)
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
    ys("can be used", t);
    const s = window && window.matchMedia("(display-mode: standalone)");
    return e.give(t && s.matches), e;
  }
}
const Be = j.debug("FirstPossibleFileContent");
class td {
  constructor(e, t) {
    S(this, "firstPossibleFileContent", null);
    S(this, "contentSource", new be());
    S(this, "canBeUsedSource", new be());
    Be("length", e.length), e.forEach((s) => {
      s.canBeUsed(
        t.patronOnce.create(
          t.guest.create((i) => {
            Be("canbeused result", s, i), i && !this.firstPossibleFileContent && (this.firstPossibleFileContent = s, s.canBeUsed(t.patron.create(this.canBeUsedSource)), s.content(t.patron.create(this.contentSource)), this.contentSource.value(
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
    return Be("can be used to", this.firstPossibleFileContent), this.canBeUsedSource.value(e), e;
  }
  content(e) {
    return Be("content to", this.firstPossibleFileContent), this.contentSource.value(e), this;
  }
  give(e) {
    return this.contentSource.give(e), this;
  }
}
const ct = j.debug("UrlContent");
class sd {
  constructor(e, t) {
    S(this, "contentCache");
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
const bs = new be();
class id {
  constructor(e = window.launchQueue, t = "launchQueue" in window) {
    S(this, "isCalculated", !1);
    this.launchQueue = e, this.isLaunchQueueSupported = t;
  }
  fileHandler(e) {
    return this.isLaunchQueueSupported && !this.isCalculated && (this.isCalculated = !0, this.launchQueue.setConsumer((t) => {
      if (console.log("require file handler"), t.files && t.files.length) {
        const [s] = t.files;
        bs.give(s);
      }
    })), bs.value(e), this;
  }
}
export {
  id as BrowserLaunchQueue,
  ed as FileSystemContent,
  td as FirstPossibleFileContent,
  Zu as PatronSchemeEditor,
  sd as UrlContent,
  P as VueRefPatron,
  H as useApplication,
  X as useFactories
};
