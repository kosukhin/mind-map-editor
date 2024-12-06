var Qs = Object.defineProperty;
var zs = (n, e, t) => e in n ? Qs(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var T = (n, e, t) => zs(n, typeof e != "symbol" ? e + "" : e, t);
import { unref as d, getCurrentScope as Ks, onScopeDispose as Ws, getCurrentInstance as dt, onMounted as ht, nextTick as Gs, onUnmounted as Js, reactive as Pt, watch as ue, computed as me, ref as W, defineComponent as N, openBlock as g, createBlock as z, Transition as ys, withCtx as C, createElementBlock as y, normalizeClass as oe, createElementVNode as w, withModifiers as we, renderSlot as ee, createCommentVNode as B, Fragment as Q, renderList as G, toDisplayString as $, createVNode as v, normalizeStyle as re, createTextVNode as P, withDirectives as ze, isRef as je, vModelText as bs, vModelCheckbox as qs, onBeforeUnmount as Zs, vModelSelect as Ys, createStaticVNode as Xs } from "vue";
import le from "konva";
import { FontAwesomeIcon as ei } from "@fortawesome/vue-fontawesome";
import { faArrowUp as ti, faArrowDown as si, faArrowRight as ii, faArrowLeft as ni, faClose as ri, faMap as oi, faRotateRight as ai, faRotateLeft as ci, faFileText as li, faCog as ui, faPlusSquare as di, faHistory as hi, faSearch as pi, faTextWidth as fi, faBars as mi } from "@fortawesome/free-solid-svg-icons";
import { useEditor as gi, EditorContent as vi, BubbleMenu as Ai } from "@tiptap/vue-3";
import yi from "@tiptap/starter-kit";
class bi {
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
class pt {
  constructor(e) {
    this.guestReceiver = e;
  }
  value(e) {
    return this.guestReceiver(e), e;
  }
}
function de(n, e, t) {
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
class Ce {
  constructor(e, t) {
    this.sourceGuest = e, this.targetGuest = t;
  }
  introduction() {
    return typeof this.sourceGuest == "function" || !this.sourceGuest.introduction ? "guest" : this.sourceGuest.introduction();
  }
  give(e, t) {
    return de(e, this.targetGuest, t), this;
  }
  disposed(e) {
    const t = this.sourceGuest;
    return t.disposed ? t.disposed(e) : !1;
  }
}
var wi = Object.defineProperty, Ci = (n, e, t) => e in n ? wi(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Et = (n, e, t) => Ci(n, typeof e != "symbol" ? e + "" : e, t);
const ws = /* @__PURE__ */ new Map(), Rt = (n) => {
  ws.forEach((e) => {
    e.delete(n);
  });
};
class Ke {
  constructor(e) {
    this.initiator = e, Et(this, "patrons"), Et(this, "give"), this.patrons = /* @__PURE__ */ new Set(), ws.set(this, this.patrons);
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
    this.guestDisposed(e, t) || de(e, t, {
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
var _i = Object.defineProperty, xi = (n, e, t) => e in n ? _i(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, $i = (n, e, t) => xi(n, e + "", t);
class Ie {
  constructor(e) {
    this.sourceDocument = e, $i(this, "thePool", new Ke(this));
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
class Qe {
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
var ki = Object.defineProperty, Fi = (n, e, t) => e in n ? ki(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Nt = (n, e, t) => Fi(n, typeof e != "symbol" ? e + "" : e, t);
class Mi {
  constructor(e) {
    Nt(this, "guests", /* @__PURE__ */ new Set()), Nt(this, "patronPool"), this.patronPool = new Ke(e);
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
      de(e, s, t);
    }), this.guests.clear();
  }
}
var Ti = Object.defineProperty, Si = (n, e, t) => e in n ? Ti(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Be = (n, e, t) => Si(n, typeof e != "symbol" ? e + "" : e, t);
class Oi {
  constructor() {
    Be(this, "theChain"), Be(this, "keysKnown", /* @__PURE__ */ new Set()), Be(this, "keysFilled", /* @__PURE__ */ new Set()), Be(this, "filledChainPool", new Mi(this)), this.theChain = new Ie({});
  }
  resultArray(e) {
    const t = new Qe(e);
    return this.filledChainPool.add(
      new Ce(t, (s) => {
        t.give(Object.values(s));
      })
    ), this.isChainFilled() && this.theChain.value(
      new pe((s) => {
        this.filledChainPool.give(Object.values(s));
      })
    ), this;
  }
  result(e) {
    const t = new Qe(e);
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
class ji {
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
class Ii {
  constructor(e) {
    this.willBePatron = e;
  }
  introduction() {
    return "patron";
  }
  give(e, t) {
    return de(e, this.willBePatron, t), this;
  }
  disposed(e) {
    var s;
    const t = this.willBePatron;
    return ((s = t == null ? void 0 : t.disposed) == null ? void 0 : s.call(t, e)) || !1;
  }
}
var Bi = Object.defineProperty, Pi = (n, e, t) => e in n ? Bi(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Ei = (n, e, t) => Pi(n, e + "", t);
class Ri {
  constructor(e) {
    this.baseGuest = e, Ei(this, "received", !1);
  }
  introduction() {
    return "patron";
  }
  give(e, t) {
    this.received || de(e, this.baseGuest, t);
    const s = t == null ? void 0 : t.data;
    return s != null && s.pool && s.pool.remove(this), this;
  }
  disposed(e) {
    const t = this.baseGuest;
    return t.disposed ? t.disposed(e) : !1;
  }
}
var Ni = Object.defineProperty, Di = (n, e, t) => e in n ? Ni(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Vi = (n, e, t) => Di(n, e + "", t);
class be {
  constructor() {
    Vi(this, "baseSource", new Ie(null));
  }
  value(e) {
    return this.baseSource.value(
      new Ce(e, (t) => {
        t !== null && de(t, e);
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
class Oe extends Error {
  constructor(e, t) {
    super(e, t);
  }
}
class Hi {
  constructor(e) {
    this.fileHandler = e;
  }
  content(e) {
    return this.fileHandler.getFile().then(async (t) => await new Response(t).text()).then((t) => {
      e.give(t);
    }).catch((t) => {
      throw new Oe("Problem when reading file in SystemFileFromHandler", {
        cause: t
      });
    }), this;
  }
}
class Li {
  constructor(e) {
    this.fileHandler = e;
  }
  save(e) {
    return this.fileHandler.createWritable().then((t) => (t.write(e).catch((s) => {
      throw new Oe("Cant save file in browser", { cause: s });
    }), t)).then((t) => {
      t.close().catch((s) => {
        throw new Oe("Cant close written file in browser", { cause: s });
      });
    }), this;
  }
}
class Ui {
  constructor(e) {
    this.content = e;
  }
  result() {
    return JSON.parse(this.content);
  }
}
class Qi {
  constructor(e) {
    this.content = e;
  }
  result() {
    return JSON.stringify(this.content);
  }
}
class zi {
  constructor(e, t = 100, s = 100) {
    this.svgContent = e, this.width = t, this.height = s;
  }
  markup() {
    return this.svgContent.replaceAll("${width}", String(this.width)).replaceAll("${height}", String(this.height));
  }
}
class Ki {
  constructor(e, t) {
    this.type = e, this.factories = t;
  }
  markup() {
    return this.factories.svgImage.create(this.type.svg, this.type.width, this.type.height).markup();
  }
}
class Wi {
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
class Gi {
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
class Ji {
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
var Dt;
const We = typeof window < "u", qi = (n) => typeof n < "u", Zi = (n) => typeof n == "function", Yi = (n) => typeof n == "string", ft = () => {
};
We && ((Dt = window == null ? void 0 : window.navigator) != null && Dt.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function fe(n) {
  return typeof n == "function" ? n() : d(n);
}
function Xi(n) {
  return n;
}
function en(n) {
  return Ks() ? (Ws(n), !0) : !1;
}
function Cs(n, e = !0) {
  dt() ? ht(n) : e ? n() : Gs(n);
}
function tn(n) {
  dt() && Js(n);
}
function sn(n) {
  var e;
  const t = fe(n);
  return (e = t == null ? void 0 : t.$el) != null ? e : t;
}
const _s = We ? window : void 0, nn = We ? window.document : void 0, rn = We ? window.navigator : void 0;
function Pe(...n) {
  let e, t, s, i;
  if (Yi(n[0]) || Array.isArray(n[0]) ? ([t, s, i] = n, e = _s) : [e, t, s, i] = n, !e)
    return ft;
  Array.isArray(t) || (t = [t]), Array.isArray(s) || (s = [s]);
  const r = [], o = () => {
    r.forEach((u) => u()), r.length = 0;
  }, a = (u, c, h, A) => (u.addEventListener(c, h, A), () => u.removeEventListener(c, h, A)), l = ue(() => [sn(e), fe(i)], ([u, c]) => {
    o(), u && r.push(...t.flatMap((h) => s.map((A) => a(u, h, A, c))));
  }, { immediate: !0, flush: "post" }), p = () => {
    l(), o();
  };
  return en(p), p;
}
function on(n, e = !1) {
  const t = W(), s = () => t.value = !!n();
  return s(), Cs(s, e), t;
}
function an(n) {
  return JSON.parse(JSON.stringify(n));
}
const Vt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ht = "__vueuse_ssr_handlers__";
Vt[Ht] = Vt[Ht] || {};
const cn = {
  ctrl: "control",
  command: "meta",
  cmd: "meta",
  option: "alt",
  up: "arrowup",
  down: "arrowdown",
  left: "arrowleft",
  right: "arrowright"
};
function ln(n = {}) {
  const {
    reactive: e = !1,
    target: t = _s,
    aliasMap: s = cn,
    passive: i = !0,
    onEventFired: r = ft
  } = n, o = Pt(/* @__PURE__ */ new Set()), a = {
    toJSON() {
      return {};
    },
    current: o
  }, l = e ? Pt(a) : a, p = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set();
  function c(b, f) {
    b in l && (e ? l[b] = f : l[b].value = f);
  }
  function h() {
    o.clear();
    for (const b of u)
      c(b, !1);
  }
  function A(b, f) {
    var _, M;
    const E = (_ = b.key) == null ? void 0 : _.toLowerCase(), K = [(M = b.code) == null ? void 0 : M.toLowerCase(), E].filter(Boolean);
    E && (f ? o.add(E) : o.delete(E));
    for (const j of K)
      u.add(j), c(j, f);
    E === "meta" && !f ? (p.forEach((j) => {
      o.delete(j), c(j, !1);
    }), p.clear()) : typeof b.getModifierState == "function" && b.getModifierState("Meta") && f && [...o, ...K].forEach((j) => p.add(j));
  }
  Pe(t, "keydown", (b) => (A(b, !0), r(b)), { passive: i }), Pe(t, "keyup", (b) => (A(b, !1), r(b)), { passive: i }), Pe("blur", h, { passive: !0 }), Pe("focus", h, { passive: !0 });
  const m = new Proxy(l, {
    get(b, f, _) {
      if (typeof f != "string")
        return Reflect.get(b, f, _);
      if (f = f.toLowerCase(), f in s && (f = s[f]), !(f in l))
        if (/[+_-]/.test(f)) {
          const E = f.split(/[+_-]/g).map((V) => V.trim());
          l[f] = me(() => E.every((V) => d(m[V])));
        } else
          l[f] = W(!1);
      const M = Reflect.get(b, f, _);
      return e ? d(M) : M;
    }
  });
  return m;
}
var Lt;
(function(n) {
  n.UP = "UP", n.RIGHT = "RIGHT", n.DOWN = "DOWN", n.LEFT = "LEFT", n.NONE = "NONE";
})(Lt || (Lt = {}));
function un(n, e = ft, t = {}) {
  const {
    immediate: s = !0,
    manual: i = !1,
    type: r = "text/javascript",
    async: o = !0,
    crossOrigin: a,
    referrerPolicy: l,
    noModule: p,
    defer: u,
    document: c = nn,
    attrs: h = {}
  } = t, A = W(null);
  let m = null;
  const b = (M) => new Promise((E, V) => {
    const K = (F) => (A.value = F, E(F), F);
    if (!c) {
      E(!1);
      return;
    }
    let j = !1, x = c.querySelector(`script[src="${fe(n)}"]`);
    x ? x.hasAttribute("data-loaded") && K(x) : (x = c.createElement("script"), x.type = r, x.async = o, x.src = fe(n), u && (x.defer = u), a && (x.crossOrigin = a), p && (x.noModule = p), l && (x.referrerPolicy = l), Object.entries(h).forEach(([F, S]) => x == null ? void 0 : x.setAttribute(F, S)), j = !0), x.addEventListener("error", (F) => V(F)), x.addEventListener("abort", (F) => V(F)), x.addEventListener("load", () => {
      x.setAttribute("data-loaded", "true"), e(x), K(x);
    }), j && (x = c.head.appendChild(x)), M || K(x);
  }), f = (M = !0) => (m || (m = b(M)), m), _ = () => {
    if (!c)
      return;
    m = null, A.value && (A.value = null);
    const M = c.querySelector(`script[src="${fe(n)}"]`);
    M && c.head.removeChild(M);
  };
  return s && !i && Cs(f), i || tn(_), { scriptTag: A, load: f, unload: _ };
}
var dn = Object.defineProperty, Ut = Object.getOwnPropertySymbols, hn = Object.prototype.hasOwnProperty, pn = Object.prototype.propertyIsEnumerable, Qt = (n, e, t) => e in n ? dn(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, zt = (n, e) => {
  for (var t in e || (e = {}))
    hn.call(e, t) && Qt(n, t, e[t]);
  if (Ut)
    for (var t of Ut(e))
      pn.call(e, t) && Qt(n, t, e[t]);
  return n;
};
function fn(n = {}, e = {}) {
  const { navigator: t = rn } = e, s = t, i = on(() => s && "canShare" in s);
  return {
    isSupported: i,
    share: async (o = {}) => {
      if (i.value) {
        const a = zt(zt({}, fe(n)), fe(o));
        let l = !0;
        if (a.files && s.canShare && (l = s.canShare({ files: a.files })), l)
          return s.share(a);
      }
    }
  };
}
var mn = Object.defineProperty, Kt = Object.getOwnPropertySymbols, gn = Object.prototype.hasOwnProperty, vn = Object.prototype.propertyIsEnumerable, Wt = (n, e, t) => e in n ? mn(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, An = (n, e) => {
  for (var t in e || (e = {}))
    gn.call(e, t) && Wt(n, t, e[t]);
  if (Kt)
    for (var t of Kt(e))
      vn.call(e, t) && Wt(n, t, e[t]);
  return n;
};
const yn = {
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
An({
  linear: Xi
}, yn);
function Ge(n, e, t, s = {}) {
  var i, r, o;
  const {
    clone: a = !1,
    passive: l = !1,
    eventName: p,
    deep: u = !1,
    defaultValue: c
  } = s, h = dt(), A = t || (h == null ? void 0 : h.emit) || ((i = h == null ? void 0 : h.$emit) == null ? void 0 : i.bind(h)) || ((o = (r = h == null ? void 0 : h.proxy) == null ? void 0 : r.$emit) == null ? void 0 : o.bind(h == null ? void 0 : h.proxy));
  let m = p;
  m = p || m || `update:${e.toString()}`;
  const b = (_) => a ? Zi(a) ? a(_) : an(_) : _, f = () => qi(n[e]) ? b(n[e]) : c;
  if (l) {
    const _ = f(), M = W(_);
    return ue(() => n[e], (E) => M.value = b(E)), ue(M, (E) => {
      (E !== n[e] || u) && A(m, E);
    }, { deep: u }), M;
  } else
    return me({
      get() {
        return f();
      },
      set(_) {
        A(m, _);
      }
    });
}
class bn {
  constructor(e, t, s, i) {
    T(this, "loadingCache");
    this.callbackName = e, this.url = t, this.emptyValue = s, this.factories = i, this.loadingCache = i.sourceEmpty.create();
  }
  content(e) {
    this.loadingCache.give(!0);
    const t = setTimeout(() => {
      this.loadingCache.give(!1), e.give(this.emptyValue);
    }, 1e4);
    return un(this.url, () => {
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
class wn {
  constructor(e) {
    this.text = e;
  }
  asString(e) {
    return e.give(this.text), e;
  }
}
class Cn {
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
function mt(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var ut = { exports: {} }, et, Gt;
function _n() {
  if (Gt) return et;
  Gt = 1;
  var n = 1e3, e = n * 60, t = e * 60, s = t * 24, i = s * 7, r = s * 365.25;
  et = function(u, c) {
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
        var h = parseFloat(c[1]), A = (c[2] || "ms").toLowerCase();
        switch (A) {
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
  function p(u, c, h, A) {
    var m = c >= h * 1.5;
    return Math.round(u / h) + " " + A + (m ? "s" : "");
  }
  return et;
}
function xn(n) {
  t.debug = t, t.default = t, t.coerce = l, t.disable = r, t.enable = i, t.enabled = o, t.humanize = _n(), t.destroy = p, Object.keys(n).forEach((u) => {
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
    let c, h = null, A, m;
    function b(...f) {
      if (!b.enabled)
        return;
      const _ = b, M = Number(/* @__PURE__ */ new Date()), E = M - (c || M);
      _.diff = E, _.prev = c, _.curr = M, c = M, f[0] = t.coerce(f[0]), typeof f[0] != "string" && f.unshift("%O");
      let V = 0;
      f[0] = f[0].replace(/%([a-zA-Z%])/g, (j, x) => {
        if (j === "%%")
          return "%";
        V++;
        const F = t.formatters[x];
        if (typeof F == "function") {
          const S = f[V];
          j = F.call(_, S), f.splice(V, 1), V--;
        }
        return j;
      }), t.formatArgs.call(_, f), (_.log || t.log).apply(_, f);
    }
    return b.namespace = u, b.useColors = t.useColors(), b.color = t.selectColor(u), b.extend = s, b.destroy = t.destroy, Object.defineProperty(b, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => h !== null ? h : (A !== t.namespaces && (A = t.namespaces, m = t.enabled(u)), m),
      set: (f) => {
        h = f;
      }
    }), typeof t.init == "function" && t.init(b), b;
  }
  function s(u, c) {
    const h = t(this.namespace + (typeof c > "u" ? ":" : c) + u);
    return h.log = this.log, h;
  }
  function i(u) {
    t.save(u), t.namespaces = u, t.names = [], t.skips = [];
    let c;
    const h = (typeof u == "string" ? u : "").split(/[\s,]+/), A = h.length;
    for (c = 0; c < A; c++)
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
var $n = xn;
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
  n.exports = $n(e);
  const { formatters: a } = n.exports;
  a.j = function(l) {
    try {
      return JSON.stringify(l);
    } catch (p) {
      return "[UnexpectedJSONParseError]: " + p.message;
    }
  };
})(ut, ut.exports);
var O = ut.exports;
const xs = /* @__PURE__ */ mt(O), kn = O.debug("TextNlAsBr");
class Fn {
  constructor(e, t) {
    this.baseText = e, this.factories = t;
  }
  asString(e) {
    return this.baseText.asString(
      this.factories.guestInTheMiddle.create(e, (t) => {
        if (typeof t > "u" || t === null)
          return "";
        const s = "<br />";
        return kn(t), e.give((t ?? "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, `$1${s}$2`)), !0;
      })
    ), e;
  }
}
const Mn = new D(Ie), Tn = new D(Ie), Sn = new D(be), On = new D(pe), jn = new D(Ce), In = new D(pt), Bn = new D(Ke), Pn = new D(Ii), En = new D(Ri), Rn = new D(Ce), Nn = new D(Oi), Dn = new D(ji), he = {
  cache: Mn,
  chain: Nn,
  guest: On,
  guestCast: jn,
  guestAware: In,
  guestInTheMiddle: Rn,
  guestSync: Dn,
  patron: Pn,
  patronOnce: En,
  pool: Bn,
  source: Tn,
  sourceEmpty: Sn
}, Vn = new D(Hi), Hn = new D(Li), Ln = new D(Qi), Un = new D(Ui), $s = new D(zi), Qn = new D(Ki, { ...he, svgImage: $s }), zn = new D(Wi, he), Kn = new D(Gi, he), Wn = new D(Ji, he), Gn = new D(bn, he), Jn = new D(wn), qn = new D(Cn, he), Zn = new D(Fn, he), Yn = {
  ...he,
  fileHandlerContent: Vn,
  browserFileSaved: Hn,
  transformToString: Ln,
  transformToObject: Un,
  svgImage: $s,
  svgMapTypeImage: Qn,
  numberChunks: zn,
  mapNameFromUrl: Kn,
  textNoHtml: Wn,
  jsonp: Gn,
  textOf: Jn,
  textNlAsBr: Zn,
  textWithoutHTML: qn
}, Z = () => Yn;
class gt {
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
const tt = O.debug("MapCurrent");
class ks {
  constructor(e, t, s) {
    T(this, "objectsCache");
    T(this, "settingsCache");
    T(this, "typesCache");
    this.mapFile = e, this.mapId = t, this.factories = s, this.objectsCache = s.sourceEmpty.create(), this.settingsCache = s.sourceEmpty.create(), this.typesCache = s.sourceEmpty.create(), e.currentMap(
      s.patron.create(
        s.guest.create((i) => {
          tt("current map changed", i), this.settingsCache.give(i.settings), this.objectsCache.give(Object.values(i.objects)), this.typesCache.give(
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
    return tt("notify about new objects"), this.objectsCache.value(e), e;
  }
  types(e) {
    return this.typesCache.value(e), e;
  }
  give(e) {
    return tt("save map document", e), this.mapId.id(
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
class Xn {
  constructor(e) {
    T(this, "idCache");
    this.idCache = e.cache.create("current");
  }
  id(e) {
    return this.idCache.value(e), e;
  }
  give(e) {
    return this.idCache.give(e), this;
  }
}
class er {
  constructor(e) {
    this.mapFile = e;
  }
  value(e) {
    return this.mapFile.currentMap(
      new Ce(e, (t) => {
        e.give(t.settings.title);
      })
    ), this;
  }
}
const Re = O.debug("MapHistory"), Jt = (n) => {
  const e = JSON.parse(JSON.stringify(n));
  return Object.values(e.objects).forEach((t) => {
    t.width = 0, t.height = 0;
  }), JSON.stringify(e);
};
class tr {
  constructor(e, t, s, i) {
    T(this, "mapsHistory");
    T(this, "historyIndex");
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
              Re("add map to history", s, e);
              const i = s.some(
                (r) => Jt(r) === Jt(e)
              );
              if (Re("isMapFromHistory", i), !i) {
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
          Re("recalculate is prev possible", r), e.give(r);
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
          Re("recalculate is next possible", r), e.give(r);
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
class sr {
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
const Ne = O.debug("MapFileOfContent");
class ir {
  constructor(e, t, s) {
    T(this, "currentMapPatrons");
    T(this, "mapFileCache");
    this.mapFileContent = e, this.mapId = t, this.factories = s, this.currentMapPatrons = s.pool.create(this), this.mapFileCache = s.cache.create(!1), e.value(
      s.patron.create((i) => {
        if (!i)
          return;
        const r = this.factories.transformToObject.create(i).result();
        Ne("get map file", r), this.mapFileCache.give(r);
      })
    );
  }
  currentMap(e) {
    const t = this.factories.chain.create();
    return this.mapId.id(this.factories.guestCast.create(e, t.receiveKey("mapId"))), this.mapFile(this.factories.guestCast.create(e, t.receiveKey("mapFile"))), t.result(
      this.factories.guestInTheMiddle.create(
        e,
        ({ mapId: s, mapFile: i }) => {
          if (Ne("get current map", s, i, typeof i), !i[s])
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
    return Ne("save map file document", e), this.mapFileContent.give(this.factories.transformToString.create(e).result()), this;
  }
  mapFile(e) {
    return this.mapFileCache.value(e), e;
  }
  createEmptyMapByName(e, t) {
    Ne("creating empty map by name", e);
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
const nr = O.debug("MapFileForRendering");
class rr {
  constructor(e, t, s) {
    T(this, "mapCache");
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
        nr("received map file, objects = ", e[t].objects), this.mapCache.give(e[t]);
      })
    ), this;
  }
}
class Fs {
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
const qt = xs("app:MapObjectCurrent");
class or {
  constructor(e, t) {
    T(this, "idCache");
    T(this, "silenceActivator");
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
    return qt("new value current object", e), this.silenceActivator.value(
      this.factories.guest.create((t) => {
        qt("silence activator", t), t ? t.give(e) : this.idCache.give(e);
      })
    ), this;
  }
}
class ar {
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
const st = O.debug("MapObjectNew");
class cr {
  constructor(e, t, s, i, r) {
    this.map = e, this.mapObject = t, this.canvas = s, this.stagePosition = i, this.factories = r;
  }
  byTypeName(e, t) {
    return st("start to add new type", e, t), this.stagePosition.position(
      this.factories.guest.create((s) => {
        this.map.types(
          this.factories.guest.create((i) => {
            this.canvas.canvas(
              this.factories.guest.create((r) => {
                const o = r.getBoundingClientRect(), a = i.find((u) => u.id === e);
                st("is type found", a);
                const l = t.x - o.left, p = t.y - o.top;
                a && (st("add new type"), this.mapObject.give({
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
class lr {
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
class ur {
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
class dr {
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
const hr = O.debug("MapObjectsLink");
class pr {
  constructor(e, t, s, i, r) {
    T(this, "objectIdsCache");
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
            t.push(s), this.objectIdsCache.give([...t]), hr("object ids", t), t.length === 2 && this.map.objects(
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
function fr(n) {
  var e = typeof n;
  return n != null && (e == "object" || e == "function");
}
var vt = fr, mr = typeof Ee == "object" && Ee && Ee.Object === Object && Ee, gr = mr, vr = gr, Ar = typeof self == "object" && self && self.Object === Object && self, yr = vr || Ar || Function("return this")(), Ms = yr, br = Ms, wr = function() {
  return br.Date.now();
}, Cr = wr, _r = /\s/;
function xr(n) {
  for (var e = n.length; e-- && _r.test(n.charAt(e)); )
    ;
  return e;
}
var $r = xr, kr = $r, Fr = /^\s+/;
function Mr(n) {
  return n && n.slice(0, kr(n) + 1).replace(Fr, "");
}
var Tr = Mr, Sr = Ms, Or = Sr.Symbol, Ts = Or, Zt = Ts, Ss = Object.prototype, jr = Ss.hasOwnProperty, Ir = Ss.toString, $e = Zt ? Zt.toStringTag : void 0;
function Br(n) {
  var e = jr.call(n, $e), t = n[$e];
  try {
    n[$e] = void 0;
    var s = !0;
  } catch {
  }
  var i = Ir.call(n);
  return s && (e ? n[$e] = t : delete n[$e]), i;
}
var Pr = Br, Er = Object.prototype, Rr = Er.toString;
function Nr(n) {
  return Rr.call(n);
}
var Dr = Nr, Yt = Ts, Vr = Pr, Hr = Dr, Lr = "[object Null]", Ur = "[object Undefined]", Xt = Yt ? Yt.toStringTag : void 0;
function Qr(n) {
  return n == null ? n === void 0 ? Ur : Lr : Xt && Xt in Object(n) ? Vr(n) : Hr(n);
}
var zr = Qr;
function Kr(n) {
  return n != null && typeof n == "object";
}
var Wr = Kr, Gr = zr, Jr = Wr, qr = "[object Symbol]";
function Zr(n) {
  return typeof n == "symbol" || Jr(n) && Gr(n) == qr;
}
var Yr = Zr, Xr = Tr, es = vt, eo = Yr, ts = NaN, to = /^[-+]0x[0-9a-f]+$/i, so = /^0b[01]+$/i, io = /^0o[0-7]+$/i, no = parseInt;
function ro(n) {
  if (typeof n == "number")
    return n;
  if (eo(n))
    return ts;
  if (es(n)) {
    var e = typeof n.valueOf == "function" ? n.valueOf() : n;
    n = es(e) ? e + "" : e;
  }
  if (typeof n != "string")
    return n === 0 ? n : +n;
  n = Xr(n);
  var t = so.test(n);
  return t || io.test(n) ? no(n.slice(2), t ? 2 : 8) : to.test(n) ? ts : +n;
}
var oo = ro, ao = vt, it = Cr, ss = oo, co = "Expected a function", lo = Math.max, uo = Math.min;
function ho(n, e, t) {
  var s, i, r, o, a, l, p = 0, u = !1, c = !1, h = !0;
  if (typeof n != "function")
    throw new TypeError(co);
  e = ss(e) || 0, ao(t) && (u = !!t.leading, c = "maxWait" in t, r = c ? lo(ss(t.maxWait) || 0, e) : r, h = "trailing" in t ? !!t.trailing : h);
  function A(j) {
    var x = s, F = i;
    return s = i = void 0, p = j, o = n.apply(F, x), o;
  }
  function m(j) {
    return p = j, a = setTimeout(_, e), u ? A(j) : o;
  }
  function b(j) {
    var x = j - l, F = j - p, S = e - x;
    return c ? uo(S, r - F) : S;
  }
  function f(j) {
    var x = j - l, F = j - p;
    return l === void 0 || x >= e || x < 0 || c && F >= r;
  }
  function _() {
    var j = it();
    if (f(j))
      return M(j);
    a = setTimeout(_, b(j));
  }
  function M(j) {
    return a = void 0, h && s ? A(j) : (s = i = void 0, o);
  }
  function E() {
    a !== void 0 && clearTimeout(a), p = 0, s = l = i = a = void 0;
  }
  function V() {
    return a === void 0 ? o : M(it());
  }
  function K() {
    var j = it(), x = f(j);
    if (s = arguments, i = this, l = j, x) {
      if (a === void 0)
        return m(l);
      if (c)
        return clearTimeout(a), a = setTimeout(_, e), A(l);
    }
    return a === void 0 && (a = setTimeout(_, e)), o;
  }
  return K.cancel = E, K.flush = V, K;
}
var Os = ho;
const _e = /* @__PURE__ */ mt(Os), po = (n) => {
  if (n[n.length - 1] === "/") {
    const e = n.split("");
    return e.splice(e.length - 1, 1), e.join("");
  }
  return n;
}, fo = _e((n) => {
  window == null || window.open(n);
}, 200), nt = O.debug("MapObjectUrl");
class mo {
  constructor(e, t) {
    this.mapId = e, this.factories = t;
  }
  open(e, t) {
    if (e != null && e.linked) {
      const s = e.outlink;
      e.targetBlank ? fo(s) : (nt("open new map", s), this.factories.mapNameFromUrl.create(
        this.factories.source.create(s)
      ).name(
        this.factories.guest.create((r) => {
          nt("open map name", s, r), t.give(r);
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
                let l = s.outlink ? s.outlink : `${r}/${go(a)}`;
                nt("link is", l), l = po(l), t.give(l);
              })
            );
          })
        );
      })
    ), t;
  }
}
function go(n) {
  return n.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}
const vo = O.debug("ObjectPositionBounds");
class Ao {
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
        o > l && (o = l), vo("position", r, o), s.give({ x: r, y: o });
      })
    ), s;
  }
}
const De = 15;
class yo {
  constructor(e, t) {
    this.baseRestriction = e, this.factories = t;
  }
  position(e, t, s) {
    return this.baseRestriction.position(
      e,
      t,
      this.factories.guestInTheMiddle.create(s, (i) => {
        s.give({
          x: Math.round(i.x / De) * De,
          y: Math.round(i.y / De) * De
        });
      })
    ), s;
  }
}
const is = {
  x: "width",
  y: "height"
}, rt = {
  x: 0,
  y: 1
}, bo = {
  positive: 1,
  negative: -1
}, ns = O.debug("ObjectsOutsideScreen");
class wo {
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
          const l = bo[e.direction], u = r.sort(
            (h, A) => h.position[rt[e.axis]] * l - A.position[rt[e.axis]] * l
          ).filter((h) => {
            const A = h.position[rt[e.axis]] + (s ? 0 : h[is[e.axis]]), m = a[e.axis] * -1 + (s ? o[is[e.axis]]() : 0);
            return ns(
              "mb nearest points",
              e.direction,
              "objectP=",
              A,
              "screenP=",
              m
            ), s ? A > m : A < m;
          });
          ns("nearest", u), t.give({
            count: u.length,
            nearestObjectId: ((c = u.at(s ? -1 : 0)) == null ? void 0 : c.id) ?? ""
          });
        }
      )
    ), t;
  }
}
class Co {
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
class _o {
  constructor(e) {
    T(this, "idCache");
    this.idCache = e.sourceEmpty.create();
  }
  typeId(e) {
    return this.idCache.value(e), e;
  }
  give(e) {
    return this.idCache.give(e), this;
  }
}
class xo {
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
class $o {
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
class ko {
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
const Fo = O.debug("MapTypeUsed");
class Mo {
  constructor(e, t) {
    this.mapFile = e, this.factories = t;
  }
  check(e, t) {
    return this.mapFile.currentMap(
      this.factories.guest.create((s) => {
        const i = Object.values(s.objects).some(
          (r) => r.type === e.name
        );
        Fo("is type used", i), t.give(!i || "Тип карты использован");
      })
    ), this;
  }
}
class To {
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
const rs = O.debug("ParentTypes");
class So {
  constructor(e, t, s) {
    this.parentNames = e, this.mapFile = t, this.factories = s;
  }
  types(e) {
    rs("parent types requested");
    const t = this.factories.chain.create();
    return this.parentNames.names(this.factories.guestCast.create(e, t.receiveKey("parentNames"))), this.mapFile.mapFile(this.factories.guestCast.create(e, t.receiveKey("mapFile"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ parentNames: s, mapFile: i }) => {
        const r = s.slice(0, -1);
        rs("parent names", r);
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
const os = O.debug("ObjectsMatchedToQuery");
class Oo {
  constructor(e, t) {
    this.map = e, this.factories = t;
  }
  objects(e, t) {
    return e.value(
      this.factories.guestInTheMiddle.create(
        t,
        _e((i) => {
          i = i.toLowerCase(), this.map.objects(
            this.factories.guest.create((r) => {
              if (!i) {
                os("reset results"), t.give([]);
                return;
              }
              const o = r.filter(
                (a) => {
                  var l;
                  return a.name.toLowerCase().includes(i) || ((l = a.additionalName) == null ? void 0 : l.toLowerCase().includes(i)) || Object.values(a.additionalFields ?? {}).join(" ").toLowerCase().includes(i);
                }
              );
              os("objects in searching", o, i), t.give(o);
            })
          );
        }, 500)
      )
    ), t;
  }
}
const jo = {
  height: 3e3,
  width: 3e3
};
class Io {
  value(e) {
    return e.give(jo), e;
  }
}
const as = O.debug("StageMoveRestriction");
class Bo {
  constructor(e, t, s) {
    this.canvasDep = e, this.stageSize = t, this.factories = s;
  }
  position(e, t) {
    return this.canvasDep.canvas(
      this.factories.guest.create((s) => {
        this.stageSize.value(
          this.factories.guest.create((i) => {
            as("income position", e);
            const r = i.width - s.clientWidth, o = i.height - s.clientHeight, a = e.x * -1, l = e.y * -1;
            if (o < 0 || r < 0)
              return { x: 0, y: 0 };
            as("boundings", o, r, l, a), t.give({
              x: e.x > 0 ? 0 : a > r ? r * -1 : e.x,
              y: e.y > 0 ? 0 : l > o ? o * -1 : e.y
            });
          })
        );
      })
    ), t;
  }
}
const ke = O.debug("app:MapObjectsVisible");
class Po {
  constructor(e, t, s, i) {
    T(this, "visibleObjectsCache", new be());
    ke("constructor initialized");
    const r = i.chain.create();
    t.size(i.patron.create(r.receiveKey("size"))), e.position(i.patron.create(r.receiveKey("position"))), s.currentMap(i.patron.create(r.receiveKey("map"))), r.result(
      i.patron.create(
        i.guest.create(({ position: o, size: a, map: l }) => {
          const p = Object.values(l.objects);
          ke("objects come to result", p);
          const u = p.filter((c) => {
            const h = l.types[c.type] ?? {}, A = {
              width: c.width || h.width,
              height: c.height || h.height
            };
            return this.isInBounding(o, a, c.position, A);
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
const Eo = (n, e) => {
  const t = n.matchAll(e);
  return Array.from(t).map((s) => s[1]);
}, Ro = (n, e) => n.reduce((t, s) => (t[s] = e[s] || s, t), {});
class No {
  constructor(e, t, s, i) {
    this.mapFile = t, this.mapObject = s, this.factories = i, e.objectId(this);
  }
  give(e) {
    return this.mapFile.currentMap(
      this.factories.guest.create((t) => {
        const s = t.objects[e];
        if (!s)
          return;
        const i = t.types[s.type], r = /\$\{([a-zA-Z1-9]+)\}/g, a = Eo(i.svg, r).filter((l) => l !== "width" && l !== "height");
        s.additionalFields = Ro(a, s.additionalFields ?? {}), this.mapObject.give(s);
      })
    ), this;
  }
  introduction() {
    return "patron";
  }
}
class Do {
  constructor() {
    T(this, "filledPoints", /* @__PURE__ */ new Map());
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
    const h = p && l >= 0, A = !p && a >= 0, m = p && l < 0, b = !p && a < 0, f = { x: 0, y: 0 };
    let _ = 0, M = 0;
    h ? (u += Math.round(e.width / 2), f.x = u, f.y = (t.y + i.y + s.height) / 2, _ = i.x > t.x ? 1 : -1) : b ? (c += Math.round(e.height / 2), u += +e.width, f.x = (t.x + e.width + i.x) / 2, f.y = c, M = i.y > t.y ? 1 : -1) : m ? (u += Math.round(e.width / 2), c += +e.height, f.x = u, f.y = (t.y + e.height + i.y) / 2, _ = i.x > t.x ? 1 : -1) : A && (c += Math.round(e.height / 2), f.x = (t.x + i.x + s.width) / 2, f.y = c, M = i.y > t.y ? 1 : -1);
    const E = [u, c].join("-"), V = this.filledPoints.get(E) || 0;
    return this.filledPoints.set(E, V + 1), {
      point: { x: u, y: c },
      breakPoint: f,
      shift: {
        x: _ * V * 10,
        y: M * V * 10
      }
    };
  }
}
var Vo = Os, Ho = vt, Lo = "Expected a function";
function Uo(n, e, t) {
  var s = !0, i = !0;
  if (typeof n != "function")
    throw new TypeError(Lo);
  return Ho(t) && (s = "leading" in t ? !!t.leading : s, i = "trailing" in t ? !!t.trailing : i), Vo(n, e, {
    leading: s,
    maxWait: e,
    trailing: i
  });
}
var Qo = Uo;
const zo = /* @__PURE__ */ mt(Qo), { Arrow: Ko } = le, Ve = O.debug("MapObjectsArrows");
class Wo {
  constructor(e, t, s, i, r) {
    T(this, "previouslyRenderedArrows", /* @__PURE__ */ new Map());
    this.konvaLayer = e, this.mapFile = t, this.mapDep = s, this.arrowPath = i, this.factories = r, Ve("draw arrows on canvas");
    const o = this.factories.chain.create();
    this.konvaLayer.layer(this.factories.patron.create(o.receiveKey("layer"))), this.mapFile.currentMap(this.factories.patron.create(o.receiveKey("map"))), this.mapDep.objects(this.factories.patron.create(o.receiveKey("objects"))), o.result(
      this.factories.patron.create(
        this.factories.guest.create(
          zo(({ layer: a, map: l, objects: p }) => {
            const u = (c, h) => {
              const A = l.types[h.type];
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
                    width: h.width || A.width,
                    height: h.height || A.height
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
                  const b = m.join("-"), f = [c.id, h.id].join("-");
                  if (Ve("points", m), Ve(c, h), this.previouslyRenderedArrows.has(f)) {
                    const M = this.previouslyRenderedArrows.get(f);
                    M.arrow.show(), M.arrow.points(m);
                    return;
                  }
                  const _ = new Ko({
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
                    arrow: _,
                    arrowKey: b
                  }), a.add(_);
                })
              );
            };
            this.arrowPath.clear(), this.previouslyRenderedArrows.forEach((c) => c.arrow.hide()), p.forEach((c) => {
              c.arrows && (Ve("visible objects", p.length), c.arrows.forEach((h) => {
                const A = p.find((m) => m.id === h.id) || l.objects[h.id];
                A && u(c, A);
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
const { Arrow: Go } = le, ot = O.debug("NewArrow"), cs = {
  width: 10,
  height: 10
};
class Jo {
  constructor(e, t, s, i) {
    T(this, "cursorGuest");
    T(this, "arrowCache");
    this.konvaLayer = e, this.cursorPosition = t, this.arrowPath = s, this.factories = i, this.cursorGuest = this.factories.sourceEmpty.create(), this.arrowCache = this.factories.sourceEmpty.create();
  }
  /**
   * Создать новую стрелку для объекта
   */
  forObject(e) {
    ot("start watch cursor"), this.cursorGuest.value(
      this.factories.guest.create((i) => {
        Rt(i);
      })
    );
    let t = null;
    const s = this.factories.patron.create(
      this.factories.guest.create((i) => {
        ot("cursor moves"), this.konvaLayer.layer(
          this.factories.guest.create((r) => {
            ot("cursor moves in layer"), this.arrowPath.breakPoints(
              {
                shapeGeometry: {
                  width: e.width,
                  height: e.height
                },
                shapePosition: {
                  x: e.position[0],
                  y: e.position[1]
                },
                lookToGeometry: cs,
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
                shapeGeometry: cs,
                shapePosition: i
              },
              this.factories.guest.create((o) => {
                if (t) {
                  t.points(o);
                  return;
                }
                t = new Go({
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
        Rt(e);
      })
    ), this.arrowCache.value(
      this.factories.guest.create((e) => {
        e.remove();
      })
    );
  }
}
const Fe = O.debug("MapObjectBackground"), qo = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD//gATQ3JlYXRlZCB3aXRoIEdJTVD/4gKwSUNDX1BST0ZJTEUAAQEAAAKgbGNtcwQwAABtbnRyUkdCIFhZWiAH6AAMAAQADQAqAAthY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1kZXNjAAABIAAAAEBjcHJ0AAABYAAAADZ3dHB0AAABmAAAABRjaGFkAAABrAAAACxyWFlaAAAB2AAAABRiWFlaAAAB7AAAABRnWFlaAAACAAAAABRyVFJDAAACFAAAACBnVFJDAAACFAAAACBiVFJDAAACFAAAACBjaHJtAAACNAAAACRkbW5kAAACWAAAACRkbWRkAAACfAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACQAAAAcAEcASQBNAFAAIABiAHUAaQBsAHQALQBpAG4AIABzAFIARwBCbWx1YwAAAAAAAAABAAAADGVuVVMAAAAaAAAAHABQAHUAYgBsAGkAYwAgAEQAbwBtAGEAaQBuAABYWVogAAAAAAAA9tYAAQAAAADTLXNmMzIAAAAAAAEMQgAABd7///MlAAAHkwAA/ZD///uh///9ogAAA9wAAMBuWFlaIAAAAAAAAG+gAAA49QAAA5BYWVogAAAAAAAAJJ8AAA+EAAC2xFhZWiAAAAAAAABilwAAt4cAABjZcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltjaHJtAAAAAAADAAAAAKPXAABUfAAATM0AAJmaAAAmZwAAD1xtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAEcASQBNAFBtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEL/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAAeAB4DAREAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAwUEAAj/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAH1SCMTDaCMTiuCMTDgxDGf/8QAHhAAAgIBBQEAAAAAAAAAAAAAAAMBAgQFExUyMxL/2gAIAQEAAQUCG9TUPHdga2PndgzrxZQ3qah48gsvnUtHILMrKq5f/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAwEBPwEH/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAgEBPwEH/8QAHhAAAgIBBQEAAAAAAAAAAAAAAAECMXIQQUKSsVH/2gAIAQEABj8CFkvdFkVLqzla4v6VLqxXe60WS90WRUipWipCSTvc/8QAIxAAAgADCAMAAAAAAAAAAAAAAAEQUfAhMUGhscHR8RFhcf/aAAgBAQABPyErMkMi0ZW2wylmzHorbYSSX3Vg5wrMkMi0Z0a5FVK8Llg05nRrkRmteVg//9oADAMBAAIAAwAAABCCQQSCSST/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAEDAQE/EAf/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAECAQE/EAf/xAAeEAEAAQQCAwAAAAAAAAAAAAABIRARIDEAQVFxkf/aAAgBAQABPxDEMgTA4U0lpO6EwKiFh/YAyDIEAZSTdCnwUQAma0AtZOl88//Z";
class Zo {
  constructor(e, t, s, i) {
    T(this, "mapNameCache");
    this.konvaLayer = e, this.mapFile = t, this.zIndex = s, this.factories = i, this.mapNameCache = i.cache.create(""), this.mapFile.currentMap(i.patron.create(this));
  }
  give(e) {
    return this.konvaLayer.layer(
      this.factories.patronOnce.create((t) => {
        Fe("map received in background", e), this.mapNameCache.value(
          this.factories.guest.create((s) => {
            if (s === e.url)
              return;
            Fe("background cache is not equals", s), this.mapNameCache.give(e.url);
            const i = new Image(), r = document.querySelector(".grid-example");
            Fe("grid example", r), i.src = qo, i.onload = () => {
              Fe("canvas pattern loaded"), Fe("konva layer loaded");
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
const Yo = O.debug("Breadcrumbs");
class Xo {
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
const ls = O.debug("CursorWithObjects");
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
        r ? (ls("crossed with", r), e.give({
          x: r.position[0] + r.width / 2,
          y: r.position[1] + r.height / 2
        })) : (ls("cursor pos", s), e.give(s));
      })
    ), this;
  }
}
const us = O.debug("Drawer");
class ta {
  constructor(e, t) {
    T(this, "drawerNameCache");
    this.keyboard = e, this.factories = t, this.drawerNameCache = t.cache.create(""), this.keyboard.pressed(
      this.factories.patron.create(
        this.factories.guest.create((s) => {
          us("new key in drawer", s), s === "Escape" && this.give("");
        })
      )
    );
  }
  isOpenedByName(e, t) {
    return this.drawerNameCache.value(
      this.factories.guestInTheMiddle.create(t, (s) => {
        us("new drawer name", s), t.give(s === e);
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
const ds = O.debug("app:MiniMap"), hs = 130;
class na {
  constructor(e, t, s, i) {
    T(this, "theSize");
    T(this, "thePoints");
    T(this, "viewportSizeCache");
    this.map = e, this.layer = t, this.stageSize = s, this.factories = i, this.theSize = i.sourceEmpty.create(), this.thePoints = i.sourceEmpty.create(), this.viewportSizeCache = i.sourceEmpty.create();
    const r = i.chain.create();
    e.objects(i.patron.create(r.receiveKey("objects"))), t.layer(i.patron.create(r.receiveKey("layer"))), s.value(i.patron.create(r.receiveKey("size"))), r.result(
      i.patron.create(
        i.guest.create(({ layer: o, size: a, objects: l }) => {
          const p = hs / a.width, u = {
            width: Math.round(o.width() * p),
            height: Math.round(o.height() * p)
          };
          this.viewportSizeCache.give(u);
          const c = {
            width: Math.round(a.width * p),
            height: Math.round(a.height * p)
          };
          this.theSize.give(c);
          const h = l.map((A) => ({
            id: A.id,
            x: Math.round(A.position[0] * p),
            y: Math.round(A.position[1] * p),
            width: Math.round(A.width * p),
            height: Math.round(A.height * p)
          }));
          ds("minimap points", h), this.thePoints.give(h);
        })
      )
    );
  }
  viewportPosition(e) {
    const t = this.factories.chain.create();
    return this.stageSize.value(this.factories.guestCast.create(e, t.receiveKey("size"))), this.layer.position(this.factories.guestCast.create(e, t.receiveKey("position"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ size: s, position: i }) => {
        const r = hs / s.width, o = {
          x: i.x * r * -1,
          y: i.y * r * -1
        };
        ds("scaled position is", o), e.give(o);
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
const ps = O.debug("Modal");
class ra {
  constructor(e, t) {
    T(this, "modalNameCache");
    this.keyboard = e, this.factories = t, ps("modal created"), this.modalNameCache = t.cache.create(""), this.keyboard.pressed(
      this.factories.patron.create(
        this.factories.guest.create((s) => {
          ps("new key in modal", s), s === "Escape" && this.give("");
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
    T(this, "messageCache");
    T(this, "notificationLifetimeDelay", 3500);
    T(this, "lastTimerHead", null);
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
const Me = O.debug("ObjectGeometryFix");
class aa {
  constructor(e, t, s, i) {
    T(this, "innerReceive");
    this.mapFile = t, this.map = s, this.factories = i, e.objects(i.patron.create(this)), this.innerReceive = _e((r) => {
      this.mapFile.currentMap(
        this.factories.guest.create((o) => {
          Me("objects to fix", r);
          const a = document.querySelectorAll(".objects-container .rendered-object"), l = o.objects;
          let p = !1;
          a.forEach((u) => {
            const c = u.getAttribute("data-object-id");
            if (Me("i see id", c), !c)
              return;
            const h = l[c];
            if (h && (Me("dom object geometry", u.clientWidth, u.clientHeight), Me("saved object geometry", h.width, h.height), (h.width !== u.clientWidth || h.height !== u.clientHeight) && (p = !0, Me("update object geometry"), h.width = u.clientWidth, h.height = u.clientHeight), !h.width || !h.height)) {
              const A = o.types[h.type];
              h.width = A.width, h.height = A.height;
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
const Te = O.debug("MapObjectsRectsPatron");
class ca {
  constructor(e, t, s, i, r, o, a, l, p) {
    T(this, "previouslyRenderedRects", /* @__PURE__ */ new Map());
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
                const c = new le.Rect({
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
const ua = O.debug("StagePosition");
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
const fs = O.debug("Zindex");
class pa {
  constructor(e) {
    T(this, "fnsCache");
    this.factories = e, this.fnsCache = e.cache.create([]), this.fnsCache.value(
      e.patron.create(
        e.guest.create(
          _e((t) => {
            fs("zindex fns run"), t.forEach((s) => s());
          }, 50)
        )
      )
    );
  }
  give(e) {
    return fs("zindex received value"), this.fnsCache.value(
      this.factories.guest.create((t) => {
        this.fnsCache.give(t.concat(e));
      })
    ), this;
  }
}
const ms = O.debug("app:BrowserCanvas");
class fa {
  constructor(e) {
    T(this, "canvasCache");
    this.factories = e, this.canvasCache = e.sourceEmpty.create();
  }
  canvas(e) {
    return this.canvasCache.value(e), this;
  }
  size(e) {
    return this.canvasCache.value(
      this.factories.guestInTheMiddle.create(e, (t) => {
        const s = t.width || t.clientWidth, i = t.height || t.clientHeight;
        ms("canvas size", s, i), e.give({
          height: i,
          width: s
        });
      })
    ), this;
  }
  give(e) {
    return ms("receive new canvas", e), this.canvasCache.give(e), this;
  }
}
const ma = O.debug("Cursor");
class ga {
  constructor(e, t) {
    T(this, "cursorPool");
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
const He = O.debug("ControlCombo");
class Aa {
  constructor(e, t) {
    this.keyboard = e, this.factories = t;
  }
  /**
   * Случилась комбинация ctrl + keyCode
   */
  happened(e, t) {
    this.keyboard.event(
      this.factories.guestInTheMiddle.create(t, (s) => {
        He("combo happened look for key", e, "received", s.code), s.ctrlKey && s.code === e && s.type === "keydown" && (s.preventDefault(), t.give(s));
      })
    );
  }
  /**
   * Случилась комбинация ctrl + keyCode с условием comboCondition
   */
  happenedConditional(e, t, s) {
    He("combo control happened registration"), this.keyboard.event(
      this.factories.guestInTheMiddle.create(s, (i) => {
        He("keyboard event come"), t.value(
          this.factories.guest.create((r) => {
            He("combo happened look for key", e, "received", i.code), r && i.ctrlKey && i.code === e && i.type === "keydown" && (i.preventDefault(), s.give(i));
          })
        );
      })
    );
  }
}
const Se = O.debug("Keyboard");
class ya {
  constructor(e) {
    T(this, "pressedPool");
    T(this, "combinationsPool");
    Se("keyboard created"), this.pressedPool = e.pool.create(this), this.combinationsPool = e.pool.create(this), window == null || window.addEventListener("keyup", (t) => {
      Se("keyboard pressed", t.key), this.pressedPool.give(t.key);
    }), ln({
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
const gs = O.debug("app:konva:KonvaLayer");
class ba {
  constructor(e, t, s, i) {
    T(this, "guestChain");
    T(this, "positionCache");
    T(this, "layerCache");
    this.canvasDep = e, this.stageMoveRestriction = s, this.factories = i, this.positionCache = i.cache.create({
      x: 0,
      y: 0
    }), this.guestChain = i.chain.create(), this.layerCache = i.sourceEmpty.create(), this.canvasDep.canvas(i.patron.create(this.guestChain.receiveKey("canvas"))), t.value(this.guestChain.receiveKey("stageSize")), this.guestChain.result(
      i.guest.create(
        ({ canvas: r }) => {
          gs("create new konva stage");
          const o = new le.Stage({
            width: r.clientWidth,
            height: r.clientHeight,
            container: r,
            fill: "#ffeeee",
            draggable: !0
          }), a = new le.Layer();
          o.add(a), a.draw(), this.layerCache.give(a), o.on("dragend", (p) => {
            if (!(p.target instanceof le.Stage))
              return;
            const u = {
              x: o.x(),
              y: o.y()
            };
            gs("new position", u), this.positionCache.give(u);
          }), o.on("dragmove", (p) => {
            if (!(p.target instanceof le.Stage))
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
class wa {
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
const Ca = O.debug("position");
class _a {
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
const k = Z(), Je = new ya(k), js = new Ie({
  readonly: !1,
  presets: {}
}), xa = new ra(Je, k), Is = new ta(Je, k), qe = new oa(k), ce = new Xn(k), Bs = k.sourceEmpty.create(), L = new ir(Bs, ce, k), $a = new er(L), ka = new bi($a), At = new rr(L, ce, k), yt = new ks(At, ce, k), Fa = new Fs(yt, At, k), te = new ks(L, ce, k), Ma = new pt((n) => {
  L.currentMap(new Qe(n));
}), Ze = new or(Is, k), Ta = new _o(k), Sa = new Co(L, te, k), ge = new fa(k), ve = new Io(), Ps = new Bo(ge, ve, k), se = new ba(ge, ve, Ps, k), Oa = new pa(k), ja = new Zo(se, L, Oa, k), xe = new Fs(te, L, k), Ia = new dr(
  te,
  L,
  [new gt(qe, new ar(L, k), k)],
  k
), Ba = new wa(se, k), Pa = new cr(te, xe, ge, Ba, k), Es = new Mo(L, k), Rs = new ko(
  te,
  L,
  [
    new gt(
      qe,
      new To(Es, k),
      k
    )
  ],
  k
), Ea = new $o(
  te,
  L,
  [new gt(qe, Es, k)],
  k
), Ra = new xo(Rs), Ye = new Po(se, ge, At, k), Na = new aa(
  Ye,
  L,
  te,
  k
), Da = new ca(
  se,
  L,
  xe,
  Ye,
  Ze,
  Fa,
  new yo(new Ao(ve, k), k),
  js,
  k
), Va = new ga(se, k), Ha = new ea(Ye, Va, k), Ns = new Do(), Ds = new Jo(se, Ha, Ns, k), La = new Wo(se, L, yt, Ns, k), Ua = new na(yt, se, ve, k), Qa = new pr(
  Ze,
  te,
  xe,
  Ds,
  k
), za = new la(L, ge, se, k), Ka = new No(
  Ze,
  L,
  xe,
  k
), Wa = new sr(L, ce, k), Ga = new ur(xe), Ja = new sa(), bt = new lr(ce, k), qa = new Xo(bt, L, k), Za = new mo(ce, k), Ya = new So(bt, L, k), Xa = new Aa(Je, k), ec = new ia(L, k), Vs = new _a(se, ge, ve, Ps, k), tc = new da(Vs), sc = new ha(Vs, k), ic = new Oo(te, k), nc = new tr(L, te, ce, k), rc = new wo(te, ve, se, k), Hs = new be();
new va(Hs);
const oc = {
  mapCurrentID: ce,
  mapFile: L,
  mapCurrent: te,
  mapCurrentSource: Ma,
  mapRemoved: Wa,
  mapSettings: Sa,
  mapObject: xe,
  mapObjectRemoved: Ia,
  mapType: Rs,
  mapTypeRemoved: Ea,
  mapTypeNew: Ra,
  mapObjectsVisible: Ye,
  mapObjectCurrent: Ze,
  mapObjectNew: Pa,
  mapObjectsLink: Qa,
  mapTypeCurrent: Ta,
  mapRects: Da,
  mapBackground: ja,
  mapObjectArrows: La,
  mapObjectsGeometryFix: Na,
  canvas: ge,
  miniMap: Ua,
  notification: qe,
  modal: xa,
  drawer: Is,
  konvaLayer: se,
  resizing: za,
  objectAdditionalFieldsFix: Ka,
  mapObjectRelationRemoved: Ga,
  fps: Ja,
  breadcrumbs: qa,
  mapObjectUrl: Za,
  keyboard: Je,
  parentNames: bt,
  parentTypes: Ya,
  controlCombo: Xa,
  menu: ec,
  stagePosition: tc,
  stagePositionByObjectId: sc,
  objectsMatchedToQuery: ic,
  stageSize: ve,
  mapHistory: nc,
  fileContent: Bs,
  newArrow: Ds,
  objectsOutsideScreen: rc,
  settings: js,
  documentTitle: ka,
  sidebarDraggable: Hs
}, U = () => oc;
class I {
  constructor(e = void 0) {
    T(this, "innerRef");
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
}, wt = /* @__PURE__ */ N({
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
    const t = n, s = e, i = me(() => ["e2e-drawer-back absolute z-10 top-0 left-0 w-full h-full bg-black/50"]), r = {
      ltr: "top-0 left-0 w-[50%] max-w-[900px] ",
      rtl: "top-0 right-0 w-[50%] max-w-[900px] ",
      ttb: "top-0 right-0 left-0",
      btt: "top-auto h-[900px] max-h-[50%] bottom-0 right-0 left-0"
    }, { drawer: o } = U(), a = () => {
      o.give(""), s("close");
    }, l = o.isOpenedByName(t.name, new I()).ref();
    return (p, u) => (g(), z(ys, { name: "fade" }, {
      default: C(() => [
        d(l) ? (g(), y("div", {
          key: 0,
          class: oe(i.value),
          onClick: a
        }, [
          w("div", {
            class: oe(["absolute bg-white h-full p-3 flex flex-col overflow-hidden", r[n.direction]]),
            onClick: u[0] || (u[0] = we(() => {
            }, ["stop"]))
          }, [
            p.$slots.header ? (g(), y("div", ac, [
              ee(p.$slots, "header", { class: "BaseDrawer-Header" })
            ])) : B("", !0),
            w("div", cc, [
              ee(p.$slots, "default")
            ]),
            p.$slots.footer ? (g(), y("div", lc, [
              ee(p.$slots, "footer")
            ])) : B("", !0)
          ], 2)
        ], 2)) : B("", !0)
      ]),
      _: 3
    }));
  }
}), q = /* @__PURE__ */ N({
  __name: "BaseIcon",
  props: {
    icon: {
      type: String
    }
  },
  setup(n) {
    const e = {
      "fa-bars": mi,
      "fa-text-width": fi,
      "fa-search": pi,
      "fa-history": hi,
      "fa-plus-square": di,
      "fa-cog": ui,
      "fa-file-text": li,
      "fa-rotate-left": ci,
      "fa-rotate-right": ai,
      "fa-map": oi,
      "fa-close": ri,
      "fa-arrow-left": ni,
      "fa-arrow-right": ii,
      "fa-arrow-down": si,
      "fa-arrow-up": ti
    };
    return (t, s) => (g(), z(d(ei), {
      icon: e[n.icon]
    }, null, 8, ["icon"]));
  }
}), uc = /* @__PURE__ */ w("h2", { class: "text-lg font-bold" }, " Карты в файле ", -1), dc = ["onClick"], hc = /* @__PURE__ */ N({
  __name: "AppFileMaps",
  setup(n) {
    const {
      mapFile: e,
      mapCurrentID: t,
      drawer: s,
      mapRemoved: i
    } = U(), r = e.mapFile(new I()).ref(), o = t.id(new I()).ref(), a = (l) => {
      confirm("Вы уверены?") && i.give(l);
    };
    return (l, p) => (g(), z(wt, {
      direction: "rtl",
      name: "fileMaps"
    }, {
      header: C(() => [
        uc
      ]),
      default: C(() => [
        w("div", null, [
          (g(!0), y(Q, null, G(d(r), (u, c) => (g(), y("div", {
            key: c,
            class: "flex items-center gap-2"
          }, [
            w("a", {
              href: "#",
              class: oe({ "font-bold": d(o) === c }),
              onClick: we((h) => {
                d(t).give(c), d(s).give("");
              }, ["prevent"])
            }, $(u.settings.title), 11, dc),
            v(q, {
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
}, gc = ["onClick"], vc = ["innerHTML"], Ac = /* @__PURE__ */ N({
  __name: "AppMenuObject",
  setup(n) {
    const {
      controlCombo: e,
      drawer: t,
      menu: s,
      stagePosition: i
    } = U(), { guest: r, patron: o } = Z(), a = s.menuObjects(new I()).ref();
    return e.happened(
      "KeyM",
      o.create(r.create(() => {
        t.give("menu");
      }))
    ), (l, p) => (g(), z(wt, {
      direction: "rtl",
      name: "menu"
    }, {
      default: C(() => [
        w("div", pc, [
          d(a).length ? (g(), y("div", mc, [
            (g(!0), y(Q, null, G(d(a), (u) => (g(), y("a", {
              key: u.id,
              class: "AppMenuObject-Item",
              href: "#",
              onClick: we((c) => {
                d(i).give(u), d(t).give("");
              }, ["prevent"])
            }, [
              w("span", {
                innerHTML: u.additionalName ? u.additionalName : u.name
              }, null, 8, vc)
            ], 8, gc))), 128))
          ])) : (g(), y("div", fc, $(l.$t("appMenuObject.noItems")), 1))
        ])
      ]),
      _: 1
    }));
  }
}), R = /* @__PURE__ */ N({
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
    return t.push(""), (s, i) => (g(), y("button", {
      type: "button",
      class: oe(t)
    }, [
      ee(s.$slots, "default")
    ]));
  }
}), yc = {
  key: 0,
  title: "Назад",
  class: "absolute text-white left-0 top-0 -ml-5 flex justify-center items-center bg-primary/70 hover:bg-primary-second/70 cursor-pointer w-5"
}, bc = {
  key: 1,
  class: "BaseModal-Header"
}, wc = { class: "overflow-y-auto flex-grow" }, Cc = {
  key: 2,
  class: "BaseModal-Footer"
}, Ae = /* @__PURE__ */ N({
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
    return (o, a) => (g(), z(ys, { name: "fade" }, {
      default: C(() => [
        d(s) ? (g(), y("div", {
          key: 0,
          class: "absolute rounded-main overflow-y-auto flex justify-center items-center top-0 left-0 bg-black/10 z-20 h-full w-full",
          onClick: r
        }, [
          w("div", {
            class: "w-full relative flex flex-col max-w-[800px] max-h-[90%] bg-white p-3",
            onClick: a[0] || (a[0] = we(() => {
            }, ["stop"]))
          }, [
            i.length > 1 ? (g(), y("div", yc, " < ")) : B("", !0),
            w("div", {
              title: "Закрыть",
              class: "e2e-modal-close absolute text-white right-0 top-0 -mr-5 flex justify-center items-center bg-danger/70 hover:bg-danger-second/70 cursor-pointer w-5",
              onClick: r
            }, " × "),
            o.$slots.header ? (g(), y("div", bc, [
              ee(o.$slots, "header")
            ])) : B("", !0),
            w("div", wc, [
              ee(o.$slots, "default")
            ]),
            o.$slots.footer ? (g(), y("div", Cc, [
              ee(o.$slots, "footer")
            ])) : B("", !0)
          ])
        ])) : B("", !0)
      ]),
      _: 3
    }));
  }
}), _c = { class: "AppPresets" }, xc = /* @__PURE__ */ w("div", { class: "text-md font-bold mb-2" }, "Общие", -1), $c = { class: "flex flex-col gap-2" }, kc = { class: "text-md font-bold mb-1" }, Fc = { class: "flex gap-2 flex-wrap items-end" }, Mc = { class: "AppTypesParent-ItemTitle" }, Tc = ["innerHTML"], Sc = /* @__PURE__ */ N({
  __name: "AppPresets",
  setup(n) {
    const {
      svgMapTypeImage: e
    } = Z(), { mapType: t, settings: s } = U(), i = new I();
    s.value(i);
    const r = me(
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
    return (o, a) => (g(), z(Ae, { name: "presets" }, {
      default: C(() => [
        w("div", _c, [
          xc,
          w("div", $c, [
            (g(!0), y(Q, null, G(r.value, (l, p) => (g(), y("div", { key: p }, [
              w("h3", kc, $(p), 1),
              w("div", Fc, [
                (g(!0), y(Q, null, G(l, (u) => (g(), y("div", {
                  key: u.preset.name,
                  class: "flex flex-col gap-2"
                }, [
                  w("div", Mc, $(u.preset.name), 1),
                  w("div", {
                    class: "AppTypesParent-ItemImage",
                    innerHTML: u.image,
                    style: re(`width:${u.preset.width}px;height:${u.preset.height}px`)
                  }, null, 12, Tc),
                  v(R, {
                    class: "AppTypesParent-ItemButton e2e-add-preset-type",
                    type: "success",
                    size: "sm",
                    onClick: (c) => d(t).give({ name: u.preset.name, type: u.preset })
                  }, {
                    default: C(() => [
                      P($(o.$t("general.addToMap")), 1)
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
}), ne = /* @__PURE__ */ N({
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
    ue(
      i,
      _e(() => {
        t.autofocus && i.value.focus();
      }, 500)
    );
    const r = Ge(t, "modelValue", s);
    return (o, a) => ze((g(), y("input", {
      ref_key: "input",
      ref: i,
      "onUpdate:modelValue": a[0] || (a[0] = (l) => je(r) ? r.value = l : null),
      class: "block rounded-main w-full p-2 border border-solid border-body-dark",
      type: "text"
    }, null, 512)), [
      [bs, d(r)]
    ]);
  }
});
class Ct {
  constructor(e) {
    T(this, "pool", new Ke(this));
    this.refSource = e, ue(
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
const Oc = { class: "AppSearch" }, jc = {
  key: 0,
  class: "AppSearch-Items"
}, Ic = ["onClick"], Bc = ["innerHTML"], Pc = ["innerHTML"], Ec = ["innerHTML"], Rc = { key: 1 }, Nc = { key: 2 }, Dc = /* @__PURE__ */ N({
  __name: "AppSearch",
  setup(n) {
    const {
      objectsMatchedToQuery: e,
      controlCombo: t,
      modal: s,
      stagePosition: i
    } = U(), { guest: r, patron: o } = Z(), a = W(), l = O.debug("app:AppSearch");
    s.isOpenedByName(
      "search",
      o.create(r.create((c) => {
        setTimeout(() => {
          c && a.value && (l("search is opened", c), a.value.$el.focus());
        }, 500);
      }))
    );
    const p = W(""), u = e.objects(
      new Ct(p),
      new I([])
    ).ref();
    return t.happened(
      "KeyF",
      o.create(r.create(() => {
        s.give("search");
      }))
    ), (c, h) => (g(), z(Ae, { name: "search" }, {
      default: C(() => [
        w("div", Oc, [
          v(ne, {
            ref_key: "inputRef",
            ref: a,
            modelValue: p.value,
            "onUpdate:modelValue": h[0] || (h[0] = (A) => p.value = A),
            class: "mb-2 e2e-query-input",
            placeholder: c.$t("general.specifyQuery")
          }, null, 8, ["modelValue", "placeholder"]),
          d(u).length ? (g(), y("div", jc, [
            (g(!0), y(Q, null, G(d(u), (A) => (g(), y("div", {
              key: A.name,
              class: "cursor-pointer",
              onClick: we((m) => {
                d(i).give(A), d(s).give("");
              }, ["prevent"])
            }, [
              w("b", {
                class: "AppSearch-ItemName",
                innerHTML: A.name
              }, null, 8, Bc),
              A.additionalName ? (g(), y("b", {
                key: 0,
                class: "AppSearch-ItemName",
                innerHTML: A.additionalName
              }, null, 8, Pc)) : B("", !0),
              A.additionalFields ? (g(), y("div", {
                key: 1,
                innerHTML: Object.values(A.additionalFields).join(" ")
              }, null, 8, Ec)) : B("", !0)
            ], 8, Ic))), 128))
          ])) : p.value ? (g(), y("div", Rc, $(c.$t("general.noResults")), 1)) : (g(), y("div", Nc, $(c.$t("general.resultsWillBeHere")), 1))
        ])
      ]),
      _: 1
    }));
  }
}), Vc = { class: "AppTypes" }, Hc = /* @__PURE__ */ w("div", { class: "text-md font-bold mb-2" }, "Родительские типы", -1), Lc = { class: "flex gap-2 items-end" }, Uc = { class: "AppTypesParent-ItemTitle" }, Qc = ["innerHTML"], zc = /* @__PURE__ */ N({
  __name: "AppTypesParent",
  setup(n) {
    const { parentTypes: e, mapType: t } = U(), { svgMapTypeImage: s } = Z(), i = e.types(new I()).ref(), r = me(() => {
      var o;
      return (o = i.value) == null ? void 0 : o.map((a) => ({
        type: a,
        image: s.create(a).markup()
      })).sort((a, l) => +(a.type.name >= l.type.name));
    });
    return (o, a) => (g(), z(Ae, { name: "parentTypes" }, {
      default: C(() => [
        w("div", Vc, [
          Hc,
          w("div", Lc, [
            (g(!0), y(Q, null, G(r.value, (l) => (g(), y("div", {
              key: l.type.name,
              class: "flex flex-col gap-2"
            }, [
              w("div", Uc, $(l.type.name), 1),
              w("div", {
                class: "AppTypesParent-ItemImage",
                innerHTML: l.image,
                style: re(`width:${l.type.width}px;height:${l.type.height}px`)
              }, null, 12, Qc),
              v(R, {
                class: "AppTypesParent-ItemButton e2e-add-preset-type",
                type: "success",
                size: "sm",
                onClick: (p) => d(t).give({ name: l.type.name, type: l.type })
              }, {
                default: C(() => [
                  P($(o.$t("general.addToMap")), 1)
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
class Ls {
  constructor(e, t = void 0) {
    T(this, "innerRef");
    this.executor = e, this.innerRef = W(t);
  }
  ref() {
    return this.executor(this.innerRef), this.innerRef;
  }
}
const Kc = { class: "flex gap-2" }, at = /* @__PURE__ */ N({
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
    return (r, o) => (g(), y("label", Kc, [
      ze(w("input", {
        "onUpdate:modelValue": o[0] || (o[0] = (a) => je(i) ? i.value = a : null),
        type: "checkbox"
      }, null, 512), [
        [qs, d(i)]
      ]),
      r.$slots.default ? ee(r.$slots, "default", { key: 0 }) : (g(), y(Q, { key: 1 }, [
        P($(n.label), 1)
      ], 64))
    ]));
  }
}), Xe = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [s, i] of e)
    t[s] = i;
  return t;
}, Wc = {}, Gc = { class: "text-sm font-bold" };
function Jc(n, e) {
  return g(), y("div", Gc, [
    ee(n.$slots, "default")
  ]);
}
const J = /* @__PURE__ */ Xe(Wc, [["render", Jc]]), qc = {}, Zc = { class: "mb-2" };
function Yc(n, e) {
  return g(), y("div", Zc, [
    ee(n.$slots, "default")
  ]);
}
const X = /* @__PURE__ */ Xe(qc, [["render", Yc]]), Xc = { class: "rounded-main p-2 border border-solid border-body-dark" }, el = { class: "flex gap-2 p-2 bg-white border border-solid border-body-dark rounded-main" }, Le = /* @__PURE__ */ N({
  __name: "BaseEditor",
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = n, s = e, i = gi({
      content: t.modelValue,
      extensions: [
        yi
      ],
      onUpdate: () => {
        i.value && s("update:modelValue", i.value.getHTML());
      }
    });
    return Zs(() => {
      var r;
      (r = i.value) == null || r.destroy();
    }), ue(() => t.modelValue, (r) => {
      !i.value || i.value.getHTML() === r || i.value.commands.setContent(r, !1);
    }), (r, o) => (g(), y("div", Xc, [
      v(d(vi), { editor: d(i) }, null, 8, ["editor"]),
      d(i) ? (g(), z(d(Ai), {
        key: 0,
        editor: d(i),
        "tippy-options": { duration: 100 }
      }, {
        default: C(() => [
          w("div", el, [
            w("button", {
              onClick: o[0] || (o[0] = (a) => d(i).chain().focus().toggleBold().run()),
              class: oe({ "font-bold": d(i).isActive("bold") })
            }, " bold ", 2),
            w("button", {
              onClick: o[1] || (o[1] = (a) => d(i).chain().focus().toggleItalic().run()),
              class: oe({ "font-bold": d(i).isActive("italic") })
            }, " italic ", 2),
            w("button", {
              onClick: o[2] || (o[2] = (a) => d(i).chain().focus().toggleStrike().run()),
              class: oe({ "font-bold": d(i).isActive("strike") })
            }, " strike ", 2)
          ])
        ]),
        _: 1
      }, 8, ["editor"])) : B("", !0)
    ]));
  }
}), tl = ["value"], sl = /* @__PURE__ */ N({
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
    return (r, o) => ze((g(), y("select", {
      label: "select",
      "onUpdate:modelValue": o[0] || (o[0] = (a) => je(i) ? i.value = a : null),
      class: "block bg-white rounded-main w-full p-2 border border-solid border-body-dark"
    }, [
      (g(!0), y(Q, null, G(t.items, (a) => (g(), y("option", {
        key: a[t.optionId],
        value: a[t.optionId]
      }, $(a[t.optionLabel]), 9, tl))), 128))
    ], 512)), [
      [Ys, d(i)]
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
}, ll = { class: "FormObject-Inner" }, ul = { class: "FormObject-Row" }, dl = { class: "FormObject-Row" }, hl = { class: "FormObject-Row" }, pl = { class: "my-2" }, fl = { class: "FormObject-Title" }, ml = { class: "FormObject-Row" }, gl = { class: "FormObject-Title" }, vl = { class: "FormObject-Row" }, Al = {
  key: 0,
  class: "FormObject-ArrowName"
}, yl = { class: "py-3 flex gap-1" }, bl = /* @__PURE__ */ N({
  __name: "FormObject",
  setup(n) {
    const e = xs("FormObject"), {
      mapObjectCurrent: t,
      mapFile: s,
      mapObject: i,
      mapCurrent: r,
      drawer: o,
      mapObjectRemoved: a,
      mapObjectRelationRemoved: l,
      mapObjectUrl: p,
      controlCombo: u
    } = U(), {
      patron: c,
      chain: h,
      guest: A
    } = Z(), m = new Ls(() => {
      const x = h.create();
      t.objectId(c.create(x.receiveKey("objectId"))), t.objectId(c.create((F) => {
        e("sep obj", F);
      })), s.currentMap(c.create(x.receiveKey("map"))), s.currentMap(c.create((F) => {
        e("sep map", F);
      })), x.result(c.create(
        A.create(({ map: F, objectId: S }) => {
          e("object opened", S), m.value = F.objects[S];
        })
      ));
    }).ref(), b = r.types(new I()).ref(), f = s.currentMap(new I()).ref(), _ = new Ct(m), M = p.url(_, new I()).ref(), E = () => {
      t.give(""), o.give("");
    }, V = () => {
      a.give(m.value), E();
    }, K = () => {
      i.give({
        ...m.value,
        outlink: m.value.outlink || M.value
      }), E();
    }, j = (x) => {
      l.give({
        index: x,
        object: m.value
      });
    };
    return u.happenedConditional(
      "KeyS",
      o.openedByName("object"),
      c.create(A.create(K))
    ), (x, F) => (g(), z(wt, {
      name: "object",
      onClose: E
    }, {
      header: C(() => [
        w("h2", il, $(x.$t("general.mapObject")), 1),
        d(m) ? (g(), y("small", nl, [
          w("span", null, " ID #" + $(d(m).id), 1)
        ])) : B("", !0),
        d(m) ? (g(), y("div", rl, [
          d(m).createTimestamp ? (g(), y("div", ol, " Создан: " + $(new Date(d(m).createTimestamp).toLocaleString()), 1)) : B("", !0),
          d(m).changeTimestamp ? (g(), y("div", al, " Изменен: " + $(new Date(d(m).changeTimestamp).toLocaleString()), 1)) : B("", !0)
        ])) : B("", !0)
      ]),
      footer: C(() => [
        w("div", yl, [
          v(R, {
            type: "success",
            onClick: K
          }, {
            default: C(() => [
              P($(x.$t("general.save")), 1)
            ]),
            _: 1
          }),
          v(R, {
            type: "danger",
            onClick: V
          }, {
            default: C(() => [
              P($(x.$t("general.delete")), 1)
            ]),
            _: 1
          }),
          v(R, { onClick: E }, {
            default: C(() => [
              P($(x.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: C(() => [
        d(m) ? (g(), y("div", cl, [
          w("div", ll, [
            w("div", ul, [
              v(at, {
                modelValue: d(m).linked,
                "onUpdate:modelValue": F[0] || (F[0] = (S) => d(m).linked = S),
                label: x.$t("general.nameAsLink")
              }, null, 8, ["modelValue", "label"])
            ]),
            d(m).linked ? (g(), y(Q, { key: 0 }, [
              v(J, null, {
                default: C(() => [
                  P($(x.$t("general.outerLink")), 1)
                ]),
                _: 1
              }),
              w("div", dl, [
                v(ne, {
                  "model-value": d(m).outlink || d(M),
                  "onUpdate:modelValue": F[1] || (F[1] = (S) => d(m).outlink = S)
                }, null, 8, ["model-value"])
              ]),
              w("div", hl, [
                v(at, {
                  modelValue: d(m).targetBlank,
                  "onUpdate:modelValue": F[2] || (F[2] = (S) => d(m).targetBlank = S),
                  label: x.$t("general.inNewTab")
                }, null, 8, ["modelValue", "label"])
              ])
            ], 64)) : B("", !0),
            (g(!0), y(Q, null, G(d(m).additionalFields, (S, Y) => (g(), z(X, {
              class: "mb-2",
              key: Y
            }, {
              default: C(() => [
                v(J, { class: "mb-1" }, {
                  default: C(() => [
                    P($(Y), 1)
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
            v(X, null, {
              default: C(() => [
                v(J, null, {
                  default: C(() => [
                    P($(x.$t("general.topName")), 1)
                  ]),
                  _: 1
                }),
                v(Le, {
                  modelValue: d(m).additionalName,
                  "onUpdate:modelValue": F[3] || (F[3] = (S) => d(m).additionalName = S)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            v(X, null, {
              default: C(() => [
                v(J, null, {
                  default: C(() => [
                    P($(x.$t("general.bottomName")), 1)
                  ]),
                  _: 1
                }),
                v(Le, {
                  modelValue: d(m).name,
                  "onUpdate:modelValue": F[4] || (F[4] = (S) => d(m).name = S)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            v(X, null, {
              default: C(() => [
                v(J, null, {
                  default: C(() => [
                    P($(x.$t("general.description")), 1)
                  ]),
                  _: 1
                }),
                v(Le, {
                  modelValue: d(m).description,
                  "onUpdate:modelValue": F[5] || (F[5] = (S) => d(m).description = S)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            v(X, null, {
              default: C(() => [
                v(J, null, {
                  default: C(() => [
                    P(" Z-Index ")
                  ]),
                  _: 1
                }),
                v(ne, {
                  modelValue: d(m).zindex,
                  "onUpdate:modelValue": F[6] || (F[6] = (S) => d(m).zindex = S),
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            v(X, null, {
              default: C(() => [
                v(J, null, {
                  default: C(() => [
                    P(" Width ")
                  ]),
                  _: 1
                }),
                v(ne, {
                  modelValue: d(m).width,
                  "onUpdate:modelValue": F[7] || (F[7] = (S) => d(m).width = S),
                  step: "20",
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            v(X, null, {
              default: C(() => [
                v(J, null, {
                  default: C(() => [
                    P(" Height ")
                  ]),
                  _: 1
                }),
                v(ne, {
                  modelValue: d(m).height,
                  "onUpdate:modelValue": F[8] || (F[8] = (S) => d(m).height = S),
                  step: "20",
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            v(X, null, {
              default: C(() => [
                v(J, null, {
                  default: C(() => [
                    P($(x.$t("general.objectType")), 1)
                  ]),
                  _: 1
                }),
                v(sl, {
                  modelValue: d(m).type,
                  "onUpdate:modelValue": F[9] || (F[9] = (S) => d(m).type = S),
                  items: d(b),
                  "option-id": "id",
                  "option-label": "name"
                }, null, 8, ["modelValue", "items"])
              ]),
              _: 1
            }),
            w("div", pl, [
              v(at, {
                modelValue: d(m).inMenu,
                "onUpdate:modelValue": F[10] || (F[10] = (S) => d(m).inMenu = S),
                label: x.$t("general.useInMenu")
              }, null, 8, ["modelValue", "label"])
            ]),
            d(m).inMenu ? (g(), y(Q, { key: 1 }, [
              w("div", fl, $(x.$t("general.menuOrder")), 1),
              w("div", ml, [
                v(ne, {
                  modelValue: d(m).menuOrder,
                  "onUpdate:modelValue": F[11] || (F[11] = (S) => d(m).menuOrder = S),
                  type: "number"
                }, null, 8, ["modelValue"])
              ])
            ], 64)) : B("", !0),
            d(m).arrows && d(m).arrows.length ? (g(), y(Q, { key: 2 }, [
              w("div", gl, $(x.$t("general.relations")), 1),
              w("div", vl, [
                (g(!0), y(Q, null, G(d(m).arrows, (S, Y) => {
                  var ae;
                  return g(), y("div", {
                    key: S.id,
                    class: "FormObject-Arrow"
                  }, [
                    (ae = d(f)) != null && ae.objects[S.id] ? (g(), y("span", Al, " #" + $(Y + 1) + " " + $(d(f).objects[S.id].name), 1)) : B("", !0),
                    v(R, {
                      class: "FormObject-ArrowButton",
                      type: "danger",
                      size: "sm",
                      onClick: (ye) => j(Y)
                    }, {
                      default: C(() => [
                        P($(x.$t("general.delete")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]);
                }), 128))
              ])
            ], 64)) : B("", !0)
          ])
        ])) : B("", !0)
      ]),
      _: 1
    }));
  }
}), wl = { class: "BaseTextarea" }, Cl = ["v-bind"], Us = /* @__PURE__ */ N({
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
    return (r, o) => (g(), y("div", wl, [
      ze(w("textarea", {
        ref: "textarea",
        "v-bind": r.$attrs,
        "onUpdate:modelValue": o[0] || (o[0] = (a) => je(i) ? i.value = a : null),
        class: "rounded-main block w-full p-2 border min-h-[200px] border-solid border-body-dark"
      }, null, 8, Cl), [
        [bs, d(i)]
      ])
    ]));
  }
}), _l = { class: "text-lg font-bold" }, xl = {
  key: 0,
  class: "flex flex-col"
}, $l = { class: "flex justify-end pt-4 gap-2" }, kl = /* @__PURE__ */ N({
  __name: "FormType",
  setup(n) {
    const {
      mapTypeCurrent: e,
      mapFile: t,
      mapType: s,
      modal: i,
      controlCombo: r
    } = U(), { patron: o, chain: a, guest: l } = Z();
    e.typeId(
      o.create(l.create((m) => {
        m && i.give("type");
      }))
    );
    const p = W(""), u = a.create(), c = new Ls(() => {
      e.typeId(o.create(u.receiveKey("typeId"))), t.currentMap(o.create(u.receiveKey("map"))), u.result(o.create(
        l.create(({ map: m, typeId: b }) => {
          var f;
          c.value = m.types[b], p.value = (f = c.value) == null ? void 0 : f.name;
        })
      ));
    }).ref(), h = () => {
      e.give(""), i.give(""), u.receiveKey("typeId").give("");
    }, A = () => {
      s.give({
        name: p.value,
        type: c.value
      }), h();
    };
    return r.happenedConditional(
      "KeyS",
      i.openedByName("type"),
      o.create(l.create(A))
    ), (m, b) => (g(), z(Ae, { name: "type" }, {
      header: C(() => [
        w("h2", _l, $(m.$t("general.mapType")), 1)
      ]),
      footer: C(() => [
        w("div", $l, [
          v(R, {
            type: "success",
            onClick: A
          }, {
            default: C(() => [
              P($(m.$t("general.save")), 1)
            ]),
            _: 1
          }),
          v(R, { onClick: h }, {
            default: C(() => [
              P($(m.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: C(() => [
        d(c) ? (g(), y("div", xl, [
          v(X, null, {
            default: C(() => [
              v(J, null, {
                default: C(() => [
                  P(" Название типа ")
                ]),
                _: 1
              }),
              v(ne, {
                modelValue: d(c).name,
                "onUpdate:modelValue": b[0] || (b[0] = (f) => d(c).name = f)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          v(X, null, {
            default: C(() => [
              v(J, null, {
                default: C(() => [
                  P(" SVG ")
                ]),
                _: 1
              }),
              v(Us, {
                modelValue: d(c).svg,
                "onUpdate:modelValue": b[1] || (b[1] = (f) => d(c).svg = f)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          v(X, null, {
            default: C(() => [
              v(J, null, {
                default: C(() => [
                  P(" Ширина ")
                ]),
                _: 1
              }),
              v(ne, {
                modelValue: d(c).width,
                "onUpdate:modelValue": b[2] || (b[2] = (f) => d(c).width = f)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          v(X, null, {
            default: C(() => [
              v(J, null, {
                default: C(() => [
                  P(" Высота ")
                ]),
                _: 1
              }),
              v(ne, {
                modelValue: d(c).height,
                "onUpdate:modelValue": b[3] || (b[3] = (f) => d(c).height = f)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          })
        ])) : B("", !0)
      ]),
      _: 1
    }));
  }
}), ct = O.debug("MapObjectsWithTemplates");
class Fl {
  constructor(e, t, s) {
    this.mapObjects = e, this.map = t, this.factories = s;
  }
  objects(e) {
    const t = this.factories.chain.create();
    return this.map.types(this.factories.guestCast.create(e, t.receiveKey("types"))), this.mapObjects.objects(this.factories.guestCast.create(e, t.receiveKey("objects"))), t.result(
      this.factories.guestInTheMiddle.create(e, ({ types: s, objects: i }) => {
        ct("visible objects", i);
        const r = i.map((o) => {
          const a = s.find((p) => String(p.id) === String(o.type));
          if (ct("check type existed", a), !a)
            return {
              obj: o,
              template: ""
            };
          let { svg: l } = a;
          return ct("type svg", l), o.additionalFields && Object.entries(o.additionalFields).forEach(([p, u]) => {
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
const Ml = /* @__PURE__ */ N({
  __name: "BaseNotify",
  setup(n) {
    const { notification: e } = U(), t = e.message(new I()).ref();
    return (s, i) => d(t) && d(t).text !== "hide" ? (g(), y("div", {
      key: 0,
      class: oe(["inline font-bold", `text-${d(t).type}-second`])
    }, $(d(t).text), 3)) : B("", !0);
  }
}), Tl = { class: "relative" }, Sl = { class: "absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-1" }, Ol = { class: "text-sm z-10 p-2 absolute bottom-0 left-5" }, jl = /* @__PURE__ */ Xs('<div class="absolute bottom-3 shadow-standard-second shadow-md drop-shadow right-3 z-10"><div class="grid-example grid grid-rows-2 grid-cols-2 bg-standard-second border border-standard-second gap-[1px] border-t-0 border-l-0"><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div></div></div><div class="absolute z-30 top-0 left-0 h-[18px] w-[22px] bg-white"></div>', 2), Il = ["title"], Bl = { class: "font-bold" }, Pl = ["title"], El = { class: "font-bold" }, Rl = ["title"], Nl = { class: "font-bold" }, Dl = ["title"], Vl = { class: "font-bold" }, Hl = ["data-object-id"], Ll = { class: "absolute bottom-[100%] left-[50%] translate-x-[-50%] text-center pb-2 pointer-events-auto text-sm w-[300px]" }, Ul = ["innerHTML", "onClick"], Ql = ["innerHTML"], zl = ["data-object-id", "innerHTML"], Kl = /* @__PURE__ */ N({
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
    } = U(), h = Z(), A = r.value(new I()).ref(), b = new Fl(
      t,
      s,
      h
    ).objects(new I([])).ref(), f = l.value(new I()).ref(), _ = i.position(new I()).ref(), M = me(() => {
      var ye;
      return (ye = f.value) == null ? void 0 : ye.width;
    }), E = new Ct(M), V = h.numberChunks.create(10, E).chunks(new I()).ref(), K = W();
    ht(() => {
      e.give(K.value);
    });
    const j = (ye) => {
      a.open(ye, h.guest.create((ie) => {
        o.give(ie);
      }));
    }, x = p.count(
      { axis: "x", direction: "negative" },
      new I()
    ).ref(), F = p.count(
      { axis: "x", direction: "positive" },
      new I()
    ).ref(), S = p.count(
      { axis: "y", direction: "negative" },
      new I()
    ).ref(), Y = p.count(
      { axis: "y", direction: "positive" },
      new I()
    ).ref(), ae = u.move.bind(u, c);
    return (ye, ie) => {
      var _t, xt, $t, kt, Ft, Mt, Tt, St, Ot, jt, It, Bt;
      return g(), y("div", Tl, [
        w("div", Sl, [
          w("div", Ol, [
            P(" Видимых объектов: " + $(d(b).length) + ", FPS: " + $(d(A)) + ", ", 1),
            v(Ml)
          ]),
          jl,
          ((_t = d(x)) == null ? void 0 : _t.count) > 0 ? (g(), y("div", {
            key: 0,
            class: "pointer-events-auto absolute z-30 top-0 left-4 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(xt = d(x)) == null ? void 0 : xt.count} шт. объектов левее`,
            onClick: ie[0] || (ie[0] = (H) => d(ae)(d(x).nearestObjectId))
          }, [
            v(q, { icon: "fa-arrow-left" }),
            w("span", Bl, $(($t = d(x)) == null ? void 0 : $t.count), 1)
          ], 8, Il)) : B("", !0),
          ((kt = d(F)) == null ? void 0 : kt.count) > 0 ? (g(), y("div", {
            key: 1,
            class: "pointer-events-auto absolute z-30 p-1 top-0 right-0 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(Ft = d(F)) == null ? void 0 : Ft.count} шт. объектов правее`,
            onClick: ie[1] || (ie[1] = (H) => d(ae)(d(F).nearestObjectId))
          }, [
            w("span", El, $((Mt = d(F)) == null ? void 0 : Mt.count), 1),
            v(q, { icon: "fa-arrow-right" })
          ], 8, Pl)) : B("", !0),
          ((Tt = d(S)) == null ? void 0 : Tt.count) > 0 ? (g(), y("div", {
            key: 2,
            class: "pointer-events-auto absolute z-30 top-[18px] left-0 w-[18px] bg-white flex flex-col leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(St = d(S)) == null ? void 0 : St.count} шт. объектов выше`,
            onClick: ie[2] || (ie[2] = (H) => d(ae)(d(S).nearestObjectId))
          }, [
            v(q, { icon: "fa-arrow-up" }),
            w("span", Nl, $((Ot = d(S)) == null ? void 0 : Ot.count), 1)
          ], 8, Rl)) : B("", !0),
          ((jt = d(Y)) == null ? void 0 : jt.count) > 0 ? (g(), y("div", {
            key: 3,
            class: "pointer-events-auto absolute z-30 p-1 bottom-0 left-0 w-[18px] bg-white flex flex-col-reverse leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(It = d(Y)) == null ? void 0 : It.count} шт. объектов ниже`,
            onClick: ie[3] || (ie[3] = (H) => d(ae)(d(Y).nearestObjectId))
          }, [
            v(q, { icon: "fa-arrow-down" }),
            w("span", Vl, $((Bt = d(Y)) == null ? void 0 : Bt.count), 1)
          ], 8, Dl)) : B("", !0),
          w("div", {
            class: oe({ "objects-container absolute top-0 left-0": !0 }),
            style: re({ width: `${d(f).width}px`, height: `${d(f).height}px`, transform: `translate(${d(_).x}px, ${d(_).y}px)` })
          }, [
            w("div", {
              class: "absolute flex top-0 left-0 w-full z-20 h-[20px] bg-default border-b-2 border-border text-right text-sm px-2",
              style: re({ transform: `translate(0, ${-d(_).y}px)` })
            }, [
              (g(!0), y(Q, null, G(d(V), (H) => (g(), y("span", {
                class: "flex-1 text-body-dark",
                key: `horiz_${H}`
              }, $(H) + "px", 1))), 128))
            ], 4),
            w("div", {
              class: "absolute flex [writing-mode:vertical-lr] top-0 left-0 h-full z-20 w-[20px] bg-default border-r-2 border-border text-left text-sm py-2",
              style: re({ transform: `translate(${-d(_).x}px, 0)` })
            }, [
              (g(!0), y(Q, null, G(d(V), (H) => (g(), y("span", {
                class: "flex-1 rotate-180 text-body-dark",
                key: `vert_${H}`
              }, $(H) + "px", 1))), 128))
            ], 4),
            (g(!0), y(Q, null, G(d(b), (H) => (g(), y("div", {
              key: H.obj.id,
              class: "absolute z-10",
              "data-object-id": H.obj.id,
              style: re(`width:${H.obj.width}px;height: ${H.obj.height}px;top: ${H.obj.position[1]}px;left:${H.obj.position[0]}px;z-index:${H.obj.zindex}`)
            }, [
              w("div", Ll, [
                w("span", {
                  innerHTML: H.obj.additionalName,
                  class: oe([H.obj.linked && "cursor-pointer underline"]),
                  onClick: (Lu) => j(H.obj)
                }, null, 10, Ul)
              ]),
              w("div", {
                class: "absolute top-[100%] left-[50%] translate-x-[-50%] text-center pt-2 text-sm w-[300px]",
                innerHTML: H.obj.name
              }, null, 8, Ql),
              w("div", {
                "data-object-id": H.obj.id,
                class: "rendered-object",
                innerHTML: H.template
              }, null, 8, zl)
            ], 12, Hl))), 128))
          ], 4)
        ]),
        w("div", {
          class: "h-full",
          ref_key: "canvasWrapper",
          ref: K
        }, null, 512)
      ]);
    };
  }
}), Wl = { class: "flex flex-wrap gap-2" }, Gl = { key: 0 }, Jl = { key: 1 }, ql = ["onClick"], Zl = /* @__PURE__ */ N({
  __name: "BaseBreadcrumbs",
  setup(n) {
    const {
      breadcrumbs: e,
      mapCurrentID: t
    } = U(), s = e.list(new I()).ref();
    return (i, r) => (g(), y("div", Wl, [
      (g(!0), y(Q, null, G(d(s), (o, a) => (g(), y("span", {
        class: "flex gap-2",
        key: o.name
      }, [
        a !== 0 ? (g(), y("span", Gl, "/")) : B("", !0),
        a === d(s).length - 1 ? (g(), y("b", Jl, "Открыто: " + $(o.title), 1)) : (g(), y("a", {
          key: 2,
          href: "#",
          onClick: we((l) => d(t).give(o.name), ["prevent"])
        }, $(o.title), 9, ql))
      ]))), 128))
    ]));
  }
}), Yl = { class: "flex items-center p-3 gap-3" }, Xl = { class: "ml-auto gap-1 flex" }, eu = /* @__PURE__ */ N({
  __name: "TheHeader",
  setup(n) {
    const {
      drawer: e,
      modal: t,
      mapHistory: s,
      controlCombo: i,
      settings: r
    } = U(), { patron: o, guest: a } = Z(), l = s.isNextPossible(new I()).ref(), p = s.isPrevPossible(new I()).ref();
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
    const u = new I();
    return r.value(u), (c, h) => (g(), y("div", Yl, [
      v(Zl, { class: "TheHeader-Breadcrumbs" }),
      w("div", Xl, [
        d(l) && !d(u).value.readonly ? (g(), z(R, {
          key: 0,
          size: "sm",
          title: "Отменить последнее действие",
          class: "w-7 block",
          onClick: h[0] || (h[0] = (A) => d(s).next())
        }, {
          default: C(() => [
            v(q, { icon: "fa-rotate-left" })
          ]),
          _: 1
        })) : B("", !0),
        d(p) && !d(u).value.readonly ? (g(), z(R, {
          key: 1,
          size: "sm",
          title: "Вернуть отмененное действие",
          class: "w-7 block",
          onClick: h[1] || (h[1] = (A) => d(s).prev())
        }, {
          default: C(() => [
            v(q, { icon: "fa-rotate-right" })
          ]),
          _: 1
        })) : B("", !0),
        v(R, {
          type: "success",
          size: "sm",
          class: "w-7 block e2e-open-menu",
          title: c.$t("general.menu"),
          onClick: h[2] || (h[2] = (A) => d(e).give("menu"))
        }, {
          default: C(() => [
            v(q, { icon: "fa-bars" })
          ]),
          _: 1
        }, 8, ["title"]),
        v(R, {
          title: c.$t("general.byText"),
          type: "primary",
          size: "sm",
          class: "w-7 block",
          onClick: h[3] || (h[3] = (A) => d(t).give("mapAsText"))
        }, {
          default: C(() => [
            v(q, { icon: "fa-text-width" })
          ]),
          _: 1
        }, 8, ["title"]),
        v(R, {
          class: "w-7 block e2e-search",
          size: "sm",
          onClick: h[4] || (h[4] = (A) => d(t).give("search"))
        }, {
          default: C(() => [
            v(q, { icon: "fa-search" })
          ]),
          _: 1
        }),
        v(R, {
          size: "sm",
          title: "Все карты файла",
          class: "w-7 block",
          onClick: h[5] || (h[5] = (A) => d(e).give("fileMaps"))
        }, {
          default: C(() => [
            v(q, { icon: "fa-map" })
          ]),
          _: 1
        })
      ])
    ]));
  }
}), tu = {}, su = { class: "text-lg font-bold" };
function iu(n, e) {
  return g(), y("span", su, [
    ee(n.$slots, "default")
  ]);
}
const nu = /* @__PURE__ */ Xe(tu, [["render", iu]]), ru = { class: "flex gap-1" }, ou = {
  key: 0,
  class: "TheMapAsText select-auto"
}, au = ["innerHTML"], cu = /* @__PURE__ */ N({
  __name: "TheMapAsText",
  setup(n) {
    const { mapFile: e, mapCurrent: t } = U(), {
      guest: s,
      patron: i,
      textOf: r,
      textNlAsBr: o,
      textWithoutHTML: a
    } = Z(), l = e.currentMap(new I()).ref(), p = W(""), u = W([]);
    t.objects(
      i.create(
        s.create(_e((f) => {
          u.value = f, o.create(
            r.create(
              f.map((_) => `<div class="TheMapAsText-Item">
                <h3>${_.name}</h3><p>${_.additionalName || ""}</p><p>${_.description || ""}</p><p>${_.additionalFields && Object.values(_.additionalFields).join("</p><p>")}</p></div>`).join("")
            )
          ).asString(
            s.create((_) => {
              p.value = _;
            })
          );
        }, 500))
      )
    );
    const { share: c, isSupported: h } = fn(), A = () => {
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
    }, m = W(), b = () => {
      var f, _;
      if (l.value) {
        const M = new Range();
        M.setStart(m.value, 0), M.setEnd(m.value, Object.values(u.value).length), (f = document.getSelection()) == null || f.removeAllRanges(), (_ = document.getSelection()) == null || _.addRange(M);
      }
    };
    return (f, _) => (g(), z(Ae, { name: "mapAsText" }, {
      header: C(() => [
        v(nu, { class: "block mb-3" }, {
          default: C(() => [
            P($(f.$t("general.mapAsText")) + " ", 1),
            w("div", ru, [
              v(R, {
                size: "sm",
                type: "success",
                class: "font-normal",
                onClick: A
              }, {
                default: C(() => [
                  P($(f.$t("general.share")), 1)
                ]),
                _: 1
              }),
              v(R, {
                size: "sm",
                type: "primary",
                class: "font-normal",
                onClick: b
              }, {
                default: C(() => [
                  P($(f.$t("general.selectAll")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        })
      ]),
      default: C(() => [
        d(l) ? (g(), y("article", ou, [
          w("div", {
            ref_key: "textRef",
            ref: m,
            innerHTML: p.value
          }, null, 8, au)
        ])) : B("", !0)
      ]),
      _: 1
    }));
  }
}), lu = { key: 1 }, uu = /* @__PURE__ */ N({
  __name: "TheMiniMap",
  setup(n) {
    const { miniMap: e } = U(), t = e.points(new I()).ref(), s = e.size(new I()).ref(), i = e.viewportSize(new I()).ref(), r = e.viewportPosition(new I()).ref();
    return (o, a) => d(s) ? (g(), y("div", {
      key: 0,
      style: re({
        width: `${d(s).width}px`,
        height: `${d(s).height}px`
      }),
      class: "absolute pointer-events-none block bg-white bottom-[10px] mt-3 right-3 z-1 border border-solid border-body-dark"
    }, [
      d(r) ? (g(), y("div", {
        key: 0,
        style: re({
          width: `${d(i).width}px`,
          height: `${d(i).height}px`,
          top: `${d(r).y}px`,
          left: `${d(r).x}px`
        }),
        class: "absolute bg-primary/50"
      }, null, 4)) : B("", !0),
      d(t) ? (g(), y("div", lu, [
        (g(!0), y(Q, null, G(d(t), (l) => (g(), y("div", {
          key: l.id,
          class: "absolute w-1 h-1 block bg-danger",
          style: re({
            top: `${l.y}px`,
            left: `${l.x}px`,
            width: `${l.width}px`,
            height: `${l.height}px`
          })
        }, null, 4))), 128))
      ])) : B("", !0)
    ], 4)) : B("", !0);
  }
}), du = { class: "text-lg font-bold" }, hu = {
  key: 0,
  class: "TheSettings"
}, pu = { class: "mb-2" }, fu = { class: "TheSettings-Row" }, mu = { class: "flex gap-2 mb-2" }, gu = { class: "mb-2" }, vu = { class: "mb-2" }, Au = {
  href: "https://github.com/kosukhin/mind-map-creator",
  target: "_blank"
}, yu = { class: "flex gap-2" }, bu = /* @__PURE__ */ N({
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
    } = U(), { patron: l, guest: p } = Z(), u = o.names(new I()).ref(), c = t.currentMap(new I()).ref(), h = a.id(new I()).ref(), A = () => {
      e.give("");
    }, m = () => {
      i.give(c.value.settings), A();
    };
    return r.happenedConditional(
      "KeyS",
      e.openedByName("settings"),
      l.create(p.create(m))
    ), (b, f) => (g(), z(Ae, { name: "settings" }, {
      header: C(() => [
        w("h2", du, $(b.$t("general.mapSettings")), 1)
      ]),
      default: C(() => {
        var _;
        return [
          (_ = d(c)) != null && _.settings ? (g(), y("div", hu, [
            w("div", pu, [
              w("div", fu, [
                w("div", mu, [
                  d(u).length > 1 ? (g(), z(R, {
                    key: 0,
                    type: "primary",
                    class: "text-white",
                    onClick: f[0] || (f[0] = (M) => d(e).give("parentTypes"))
                  }, {
                    default: C(() => [
                      P($(b.$t("general.parentTypes")), 1)
                    ]),
                    _: 1
                  })) : B("", !0),
                  v(R, {
                    type: "primary",
                    class: "text-white",
                    onClick: f[1] || (f[1] = (M) => d(e).give("export"))
                  }, {
                    default: C(() => [
                      P($(b.$t("general.exportOrImport")), 1)
                    ]),
                    _: 1
                  }),
                  v(R, {
                    type: "primary",
                    class: "text-white e2e-open-presets",
                    onClick: f[2] || (f[2] = (M) => d(e).give("presets"))
                  }, {
                    default: C(() => [
                      P(" Пресеты ")
                    ]),
                    _: 1
                  })
                ])
              ]),
              w("div", gu, [
                w("label", null, [
                  w("b", null, $(b.$t("general.mapName")), 1),
                  v(ne, {
                    modelValue: d(c).settings.title,
                    "onUpdate:modelValue": f[3] || (f[3] = (M) => d(c).settings.title = M)
                  }, null, 8, ["modelValue"])
                ])
              ]),
              w("div", vu, [
                w("a", Au, $(b.$t("general.githubRepo")), 1)
              ])
            ]),
            w("div", yu, [
              v(R, {
                class: "TheSettings-Button",
                type: "success",
                onClick: f[4] || (f[4] = (M) => m())
              }, {
                default: C(() => [
                  P($(b.$t("general.save")), 1)
                ]),
                _: 1
              }),
              v(R, {
                class: "TheSettings-Button",
                onClick: A
              }, {
                default: C(() => [
                  P($(b.$t("general.cancel")), 1)
                ]),
                _: 1
              }),
              v(R, {
                class: "TheSettings-Button",
                type: "danger",
                onClick: f[5] || (f[5] = (M) => {
                  d(s).give(d(h)), A();
                })
              }, {
                default: C(() => [
                  P($(b.$t("general.removeMap")), 1)
                ]),
                _: 1
              })
            ])
          ])) : B("", !0)
        ];
      }),
      _: 1
    }));
  }
}), wu = {}, Cu = { class: "BaseGroup" };
function _u(n, e) {
  return g(), y("div", Cu, [
    ee(n.$slots, "default")
  ]);
}
const xu = /* @__PURE__ */ Xe(wu, [["render", _u]]), $u = "default", ku = /* @__PURE__ */ N({
  __name: "TheLinker",
  setup(n) {
    const { mapObjectsLink: e } = U(), t = e.objectIds(new I([])).ref();
    return (s, i) => (g(), z(R, {
      type: $u,
      onClick: i[0] || (i[0] = (r) => d(e).startLink())
    }, {
      default: C(() => [
        P($(d(t).length === 1 ? "Выбиретие объект" : d(t).length === 2 ? "Второй объект" : "Связать объекты"), 1)
      ]),
      _: 1
    }));
  }
}), Fu = { class: "flex e2e-sidebar flex-col items-center gap-3 max-h-[100%] overflow-hidden" }, Mu = { class: "TheSideBar-ItemName" }, Tu = ["innerHTML", "draggable", "title", "onDragend"], Su = {
  key: 0,
  class: "flex gap-1"
}, Ou = {
  key: 0,
  class: "mt-auto w-full p-3 pt-0"
}, ju = /* @__PURE__ */ N({
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
    } = U(), p = t.types(new I()).ref(), u = W();
    ht(() => {
      l.give(u.value);
    });
    const { svgMapTypeImage: c } = Z(), h = me(() => {
      var m;
      return (m = p.value) == null ? void 0 : m.map((b) => ({
        type: b,
        image: c.create(b).markup()
      })).sort((b, f) => +(b.type.name >= f.type.name));
    }), A = new I();
    return a.value(A), (m, b) => (g(), y("div", Fu, [
      w("div", {
        ref_key: "dragWrapperRef",
        ref: u,
        class: "flex flex-col gap-3 flex-grow w-full overflow-y-auto"
      }, [
        (g(!0), y(Q, null, G(h.value, (f, _) => (g(), y("div", {
          key: _,
          class: "flex flex-col items-center justify-center gap-2"
        }, [
          w("div", Mu, $(f.type.name), 1),
          w("div", {
            innerHTML: f.image,
            class: "TheSideBar-ItemImage",
            draggable: d(A).value.readonly ? "false" : "true",
            style: re(`width:${f.type.width}px;height:${f.type.height}px`),
            title: m.$t("general.notifications.dragToCanvasToAdd"),
            onDragend: (M) => d(e).byTypeName(f.type.id, M)
          }, null, 44, Tu),
          d(A).value.readonly ? B("", !0) : (g(), y("div", Su, [
            v(R, {
              class: "text-white",
              size: "sm",
              type: "primary",
              onClick: (M) => d(s).give(f.type.id)
            }, {
              default: C(() => [
                P($(m.$t("general.change")), 1)
              ]),
              _: 2
            }, 1032, ["onClick"]),
            v(R, {
              class: "text-white",
              size: "sm",
              type: "danger",
              onClick: (M) => d(i).give(f.type)
            }, {
              default: C(() => [
                P($(m.$t("general.delete")), 1)
              ]),
              _: 2
            }, 1032, ["onClick"])
          ]))
        ]))), 128))
      ], 512),
      d(A).value.readonly ? B("", !0) : (g(), y("div", Ou, [
        v(xu, { class: "mb-1 grid gap-1 grid-cols-2" }, {
          default: C(() => [
            v(R, {
              title: m.$t("general.addType"),
              type: "success",
              onClick: b[0] || (b[0] = (f) => d(r).byName())
            }, {
              default: C(() => [
                v(q, { icon: "fa-plus-square" })
              ]),
              _: 1
            }, 8, ["title"]),
            v(R, {
              class: "e2e-show-settings",
              title: m.$t("general.settings"),
              type: "primary",
              onClick: b[1] || (b[1] = (f) => d(o).give("settings"))
            }, {
              default: C(() => [
                v(q, { icon: "fa-cog" })
              ]),
              _: 1
            }, 8, ["title"])
          ]),
          _: 1
        }),
        v(ku, { class: "w-[100%] block mb-1" })
      ]))
    ]));
  }
});
class Iu {
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
    return this.basePatron.give(e), this.refWatcherCreated || (this.refWatcherCreated = !0, ue(
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
class Bu {
  constructor(e) {
    this.baseSource = e;
  }
  value(e) {
    return this.baseSource.value(
      new Ce(e, (t) => {
        de(JSON.stringify(t), e);
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
class Pu {
  constructor(e, t) {
    this.baseGuest = e, this.baseGuestAware = t;
  }
  value(e) {
    return this.baseGuestAware.value(e), this;
  }
  give(e) {
    return de(e, this.baseGuest), this;
  }
  pool() {
    throw Error("No pool in SourceDynamic");
  }
}
const Eu = { class: "AppPresets" }, Ru = /* @__PURE__ */ w("div", { class: "text-md font-bold mb-2" }, "Экспорт\\Импорт текущей карты", -1), Nu = { class: "flex flex-col gap-2" }, Du = /* @__PURE__ */ N({
  __name: "AppExport",
  setup(n) {
    const { mapFile: e, mapCurrent: t } = U(), s = new Pu(
      t,
      new pt((a) => {
        e.currentMap(new Qe(a));
      })
    ), i = new Bu(s), r = new Iu(new I(), i);
    i.value(r);
    const o = r.ref();
    return (a, l) => (g(), z(Ae, { name: "export" }, {
      default: C(() => [
        w("div", Eu, [
          Ru,
          w("div", Nu, [
            v(Us, {
              modelValue: d(o),
              "onUpdate:modelValue": l[0] || (l[0] = (p) => je(o) ? o.value = p : null)
            }, null, 8, ["modelValue"])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Vu = { class: "bg-body absolute top-0 left-0 w-full h-full" }, Hu = { class: "grid grid-cols-[200px_1fr] grid-rows-[50px_1fr] h-dvh relative" }, qu = /* @__PURE__ */ N({
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
    const t = n, s = e, { fileContent: i, settings: r } = U(), { guest: o, patron: a } = Z();
    return r.value((l) => {
      r.give({
        ...l,
        readonly: t.readonly,
        presets: t.presets
      });
    }), ue(() => t.modelValue, (l) => {
      i.value(o.create((p) => {
        l !== p && i.give(l);
      }));
    }, {
      immediate: !0
    }), i.value(a.create((l) => {
      s("update:modelValue", l);
    })), (l, p) => (g(), y("div", Vu, [
      w("div", Hu, [
        v(eu, { class: "col-span-2" }),
        v(ju),
        v(Kl, { class: "w-auto col-auto h-full" }),
        v(uu)
      ]),
      v(bl),
      v(kl),
      v(bu),
      v(Sc),
      v(zc),
      v(Du),
      v(Ac),
      v(cu),
      v(Dc),
      v(hc)
    ]));
  }
}), vs = O.debug("FileSystemContent");
class Zu {
  constructor(e, t, s) {
    T(this, "contentPatrons");
    T(this, "fileHandler", null);
    T(this, "contentSource");
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
    if (vs("save file as content string", e), !this.fileHandler)
      throw new Oe("Cant save file because no fileHandler");
    try {
      return this.contentSource.give(e), this.factories.browserFileSaved.create(this.fileHandler).save(e), this.contentPatrons.give(e), this;
    } catch (t) {
      throw new Oe("Cant handle receive for map file FS", { cause: t });
    } finally {
      this.notification.give({
        type: "success",
        text: "Успешно сохранен файл карты!"
      });
    }
  }
  canBeUsed(e) {
    const t = "launchQueue" in window;
    vs("can be used", t);
    const s = window && window.matchMedia("(display-mode: standalone)");
    return e.give(t && s.matches), e;
  }
}
const Ue = O.debug("FirstPossibleFileContent");
class Yu {
  constructor(e, t) {
    T(this, "firstPossibleFileContent", null);
    T(this, "contentSource", new be());
    T(this, "canBeUsedSource", new be());
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
const lt = O.debug("UrlContent");
class Xu {
  constructor(e, t) {
    T(this, "contentCache");
    this.notification = e, this.factories = t, this.contentCache = t.sourceEmpty.create();
  }
  canBeUsed(e) {
    if (!window)
      return e.give(!1), this;
    const t = window.location.search.indexOf("?view=") > -1;
    if (lt("can be used", t), e.give(window.location.search.indexOf("?view=") > -1), t) {
      const s = window.location.search.split("=")[1] ?? "";
      fetch(s, { redirect: "follow" }).then((i) => i.text()).then((i) => {
        lt("received text", i), this.contentCache.give(i);
      });
    }
    return e;
  }
  content(e) {
    if (!window)
      return this;
    const t = window.location.search.split("=")[1] ?? "";
    return lt("visit url", t), this.contentCache.value(this.factories.patronOnce.create(e)), this;
  }
  give() {
    return this.notification.give({
      type: "error",
      text: "Невозможно сохранить карту, открытую по ссылке!"
    }), this;
  }
}
const As = new be();
class ed {
  constructor(e = window.launchQueue, t = "launchQueue" in window) {
    T(this, "isCalculated", !1);
    this.launchQueue = e, this.isLaunchQueueSupported = t;
  }
  fileHandler(e) {
    return this.isLaunchQueueSupported && !this.isCalculated && (this.isCalculated = !0, this.launchQueue.setConsumer((t) => {
      if (console.log("require file handler"), t.files && t.files.length) {
        const [s] = t.files;
        As.give(s);
      }
    })), As.value(e), this;
  }
}
export {
  ed as BrowserLaunchQueue,
  Zu as FileSystemContent,
  Yu as FirstPossibleFileContent,
  qu as PatronSchemeEditor,
  Xu as UrlContent,
  I as VueRefPatron,
  U as useApplication,
  Z as useFactories
};
