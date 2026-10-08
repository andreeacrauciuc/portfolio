import {
  useState,
  useEffect,
  useRef,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { facts } from "@/data/facts";
import { journey } from "@/data/journey";
import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { marqueeItems, skills } from "@/data/skills";

const INK = "#14130F",
  PAPER = "#EEEBE4",
  ACC = "#FF4B1F";

const glass: CSSProperties = {
  background: "rgba(255,255,255,.42)",
  backdropFilter: "blur(18px) saturate(160%)",
  WebkitBackdropFilter: "blur(18px) saturate(160%)",
  border: "1px solid rgba(255,255,255,.75)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,.9), 0 24px 60px rgba(20,19,15,.08)",
};
const mono: CSSProperties = {
  fontFamily: "JetBrains Mono, monospace",
  fontSize: 12,
  letterSpacing: 1.5,
  textTransform: "uppercase",
};
const serif: CSSProperties = { fontFamily: "Instrument Serif, serif", fontWeight: 400 };

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
    };
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "none" : "translateY(36px)",
        filter: show ? "none" : "blur(6px)",
        transition: `all 1s ${String(delay)}s cubic-bezier(.2,.8,.2,1)`,
      }}
    >
      {children}
    </div>
  );
}

function Label({ num, text }: { num: string; text: string }) {
  return (
    <div style={{ ...mono, color: "rgba(20,19,15,.55)", marginBottom: 14 }}>
      <span style={{ color: ACC }}>{num}</span> — {text}
    </div>
  );
}

export function App() {
  const { name, role, tagline, about, email, linkedinUrl, githubUrl, cvUrl, photoUrl } =
    profile;

  const tlRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mobile, setMobile] = useState(false);
  const [h, setH] = useState(900);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [st, setSt] = useState(0);
  const [fill, setFill] = useState(0);
  const [lit, setLit] = useState(-1);
  const [mouse, setMouse] = useState({ x: -500, y: -500 });
  const [total, setTotal] = useState(1);
  const [photoOk, setPhotoOk] = useState(true);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const top = window.scrollY;
      setSt(top);
      setTotal(Math.max(1, document.documentElement.scrollHeight - window.innerHeight));
      let cur = "home";
      navItems.forEach(({ id }) => {
        const s = document.getElementById(id);
        if (s && s.getBoundingClientRect().top + top - 160 <= top) cur = id;
      });
      setActive(cur);
      const tl = tlRef.current;
      if (tl) {
        const tr = tl.getBoundingClientRect();
        const line = window.innerHeight * 0.6;
        setFill(Math.max(0, Math.min(tr.height, line - tr.top)));
        let idx = -1;
        itemRefs.current.forEach((it, i) => {
          if (it && it.getBoundingClientRect().top < line) idx = i;
        });
        setLit(idx);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const measure = () => {
      setMobile(window.innerWidth < 760);
      setH(window.innerHeight);
      update();
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const go = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 10;
      window.scrollTo({ top: id === "home" ? 0 : top, behavior: "smooth" });
    }
  };

  const onMove = (e: MouseEvent) => {
    if (mobile) return;
    setMouse({ x: e.clientX, y: e.clientY });
  };

  const pad = mobile ? "90px 24px" : "130px 80px";
  const yearW = mobile ? 0 : 150,
    lineX = mobile ? 8 : yearW + 24;

  return (
    <div
      onMouseMove={onMove}
      style={{
        position: "relative",
        background: PAPER,
        color: INK,
        fontFamily: "Inter, sans-serif",
        minHeight: "100vh",
      }}
    >
      <style>{`
        .h1 { animation: rise 1.2s .15s both cubic-bezier(.2,.8,.2,1) }
        .h2 { animation: rise 1.2s .35s both cubic-bezier(.2,.8,.2,1) }
        .h3 { animation: rise 1.2s .55s both cubic-bezier(.2,.8,.2,1) }
        .lift { transition: transform .5s cubic-bezier(.2,.8,.2,1), box-shadow .5s; }
        .lift:hover { transform: translateY(-6px); box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 34px 70px rgba(20,19,15,.12); }
        .pill { transition: all .3s; cursor: pointer; display: inline-block; }
        .pill:hover { background: ${INK}; color: ${PAPER}; transform: translateY(-2px); }
        .solid { background: ${INK}; color: ${PAPER}; }
        .solid:hover { background: ${ACC}; color: #fff; }
        .ulink { background: linear-gradient(${ACC},${ACC}) 0 100% / 0 2px no-repeat; transition: background-size .4s; }
        .ulink:hover { background-size: 100% 2px; }
        @media (prefers-reduced-motion: reduce) {
          .h1, .h2, .h3 { opacity: 1 !important; }
        }
      `}</style>

      {/* BACKGROUND LAYER (fixed, behind everything) */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "#FFC9B5",
            filter: "blur(110px)",
            opacity: 0.75,
            top: -120 - st * 0.05,
            left: -120,
            animation: "drift 16s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 460,
            height: 460,
            borderRadius: "50%",
            background: "#CFE3D4",
            filter: "blur(110px)",
            opacity: 0.8,
            bottom: -140 + st * 0.04,
            right: -80,
            animation: "drift 20s ease-in-out infinite reverse",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "#D9D6F2",
            filter: "blur(110px)",
            opacity: 0.7,
            top: "40%",
            left: "55%",
            animation: "drift 24s ease-in-out infinite",
          }}
        />
        {!mobile && (
          <div
            style={{
              position: "absolute",
              width: 420,
              height: 420,
              borderRadius: "50%",
              left: mouse.x - 210,
              top: mouse.y - 210,
              background: "radial-gradient(circle, rgba(255,75,31,.16), transparent 65%)",
              transition: "left .25s ease-out, top .25s ease-out",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.06,
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='160' height='160' filter='url(%23n)'/></svg>\")",
          }}
        />
      </div>

      {/* NAV */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          padding: "18px 24px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <nav
          aria-label="Main"
          style={{
            ...glass,
            width: "100%",
            maxWidth: 980,
            borderRadius: 999,
            padding: "8px 8px 8px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <button
            onClick={() => {
              go("home");
            }}
            aria-label="Back to top"
            style={{ ...serif, fontSize: 26 }}
          >
            {name}
            <span style={{ color: ACC }}>.</span>
          </button>
          {!mobile && (
            <div style={{ display: "flex", gap: 2 }}>
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  className="pill"
                  onClick={() => {
                    go(id);
                  }}
                  aria-current={active === id ? "true" : undefined}
                  style={{
                    padding: "9px 16px",
                    borderRadius: 999,
                    fontSize: 14,
                    fontWeight: 500,
                    background: active === id ? "rgba(20,19,15,.09)" : "transparent",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
          {!mobile ? (
            <button
              className="pill solid"
              onClick={() => {
                go("contact");
              }}
              style={{
                padding: "11px 22px",
                borderRadius: 999,
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              Let&apos;s talk
            </button>
          ) : (
            <button
              className="pill solid"
              onClick={() => {
                setOpen(!open);
              }}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              style={{ width: 42, height: 42, borderRadius: 999 }}
            >
              {open ? "✕" : "☰"}
            </button>
          )}
          {mobile && open && (
            <div
              style={{
                ...glass,
                background: "rgba(255,255,255,.85)",
                position: "absolute",
                top: 62,
                left: 0,
                right: 0,
                borderRadius: 24,
                padding: 10,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  className="pill"
                  onClick={() => {
                    go(id);
                  }}
                  style={{
                    padding: "14px 16px",
                    textAlign: "left",
                    borderRadius: 16,
                    fontWeight: 500,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 24,
              right: 24,
              bottom: 0,
              height: 2,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${String((st / total) * 100)}%`,
                height: "100%",
                background: ACC,
              }}
            />
          </div>
        </nav>
      </header>

      <main style={{ position: "relative", zIndex: 1 }}>
        {/* HERO */}
        <section
          id="home"
          style={{
            position: "relative",
            padding: mobile ? "130px 24px 90px" : "140px 80px 120px",
            minHeight: mobile ? 0 : h,
            display: "flex",
            flexDirection: mobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 50,
          }}
        >
          <div
            style={{
              maxWidth: 700,
              transform: `translateY(${String(Math.min(st, 600) * 0.18)}px)`,
              opacity: Math.max(0, 1 - st / 700),
            }}
          >
            <div
              className="h1"
              style={{
                ...mono,
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: ACC,
                  animation: "pulse 2s infinite",
                }}
              />
              Open to work · 2026
            </div>
            <h1
              className="h1"
              style={{
                ...serif,
                fontSize: mobile ? 78 : 168,
                lineHeight: 0.9,
                letterSpacing: -3,
              }}
            >
              {name}
              <span style={{ color: ACC }}>.</span>
            </h1>
            <p
              className="h2"
              style={{ marginTop: 28, fontSize: mobile ? 19 : 24, fontWeight: 500 }}
            >
              {role}
            </p>
            <p
              className="h2"
              style={{
                marginTop: 10,
                fontSize: 17,
                lineHeight: 1.65,
                opacity: 0.65,
                maxWidth: 520,
              }}
            >
              {tagline}
            </p>
            <div
              className="h3"
              style={{ marginTop: 34, display: "flex", gap: 12, flexWrap: "wrap" }}
            >
              <button
                className="pill solid"
                onClick={() => {
                  go("work");
                }}
                style={{ padding: "15px 30px", borderRadius: 999, fontWeight: 600 }}
              >
                View projects →
              </button>
              <a
                className="pill"
                href={cvUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  ...glass,
                  padding: "15px 30px",
                  borderRadius: 999,
                  fontWeight: 600,
                }}
              >
                Download CV
              </a>
            </div>
          </div>

          <div
            className="h2"
            style={{
              position: "relative",
              transform: `translateY(${String(Math.min(st, 600) * -0.08)}px)`,
            }}
          >
            <div style={{ ...glass, padding: 12, borderRadius: 36 }}>
              <div
                style={{
                  width: mobile ? 250 : 340,
                  height: mobile ? 320 : 440,
                  borderRadius: 26,
                  overflow: "hidden",
                  background: "linear-gradient(160deg,#FFC9B5,#D9D6F2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  ...mono,
                }}
              >
                {photoUrl && photoOk ? (
                  <img
                    src={photoUrl}
                    alt={`Portrait of ${name}`}
                    onError={() => {
                      setPhotoOk(false);
                    }}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  "your photo"
                )}
              </div>
            </div>
            <div
              style={{
                ...glass,
                position: "absolute",
                left: mobile ? -10 : -60,
                bottom: 40,
                padding: "12px 18px",
                borderRadius: 18,
                ...mono,
                fontSize: 11,
              }}
            >
              Iași, Romania
            </div>
            <div
              style={{
                ...glass,
                position: "absolute",
                right: mobile ? -10 : -40,
                top: 40,
                padding: "12px 18px",
                borderRadius: 18,
                ...mono,
                fontSize: 11,
              }}
            >
              B.Sc. → M.Sc.
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div
          aria-hidden="true"
          style={{
            overflow: "hidden",
            borderTop: "1px solid rgba(20,19,15,.12)",
            borderBottom: "1px solid rgba(20,19,15,.12)",
            padding: "20px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "max-content",
              animation: "marquee 28s linear infinite",
            }}
          >
            {[...marqueeItems, ...marqueeItems].map((m, i) => (
              <span
                key={i}
                style={{
                  ...serif,
                  fontSize: 34,
                  padding: "0 28px",
                  whiteSpace: "nowrap",
                }}
              >
                {m} <span style={{ color: ACC }}>✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <section id="about" style={{ padding: pad }}>
          <Reveal>
            <Label num="01" text="About" />
            <h2
              style={{
                ...serif,
                fontSize: mobile ? 44 : 78,
                lineHeight: 1,
                maxWidth: 900,
              }}
            >
              Business thinking, <em style={{ color: ACC }}>technical hands.</em>
            </h2>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: mobile ? "1fr" : "1.1fr 1fr",
              gap: 40,
              marginTop: 50,
            }}
          >
            <Reveal delay={0.1}>
              <p style={{ fontSize: 19, lineHeight: 1.8, opacity: 0.75 }}>{about}</p>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {facts.map(({ value, label }, i) => (
                <Reveal key={label} delay={i * 0.08}>
                  <div
                    className="lift"
                    style={{
                      ...glass,
                      borderRadius: 24,
                      padding: "26px 22px",
                      height: "100%",
                    }}
                  >
                    <div style={{ ...serif, fontSize: 52, lineHeight: 1, color: ACC }}>
                      {value}
                    </div>
                    <div style={{ ...mono, fontSize: 11, marginTop: 10, opacity: 0.6 }}>
                      {label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* JOURNEY / TIMELINE */}
        <section id="journey" style={{ padding: pad }}>
          <Reveal>
            <Label num="02" text="Journey" />
            <h2 style={{ ...serif, fontSize: mobile ? 44 : 78, lineHeight: 1 }}>
              The timeline.
            </h2>
          </Reveal>
          <div ref={tlRef} style={{ position: "relative", marginTop: 60 }}>
            <div
              style={{
                position: "absolute",
                left: lineX,
                top: 0,
                bottom: 0,
                width: 2,
                background: "rgba(20,19,15,.12)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: lineX,
                top: 0,
                width: 2,
                height: fill,
                background: ACC,
                boxShadow: "0 0 14px rgba(255,75,31,.6)",
              }}
            />
            {journey.map(({ id, period, title, place, description }, i) => {
              const on = i <= lit;
              return (
                <div
                  key={id}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  style={{
                    position: "relative",
                    paddingLeft: lineX + 40,
                    paddingBottom: 56,
                    opacity: on ? 1 : 0.35,
                    transition: "opacity .6s",
                  }}
                >
                  {!mobile && (
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        width: yearW,
                        textAlign: "right",
                        top: 2,
                        ...mono,
                        color: on ? ACC : INK,
                      }}
                    >
                      {period}
                    </div>
                  )}
                  <div
                    style={{
                      position: "absolute",
                      left: lineX - 6,
                      top: 4,
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: on ? ACC : PAPER,
                      border: `2px solid ${on ? ACC : "rgba(20,19,15,.3)"}`,
                      transition: "all .5s",
                      animation: on && i === lit ? "pulse 2s infinite" : "none",
                    }}
                  />
                  <div
                    className="lift"
                    style={{
                      ...glass,
                      borderRadius: 24,
                      padding: "22px 26px",
                      maxWidth: 640,
                    }}
                  >
                    {mobile && (
                      <div style={{ ...mono, color: ACC, marginBottom: 8 }}>{period}</div>
                    )}
                    <div style={{ ...serif, fontSize: 30, lineHeight: 1.1 }}>{title}</div>
                    <div
                      style={{
                        ...mono,
                        fontSize: 11,
                        margin: "8px 0 12px",
                        opacity: 0.6,
                      }}
                    >
                      {place}
                    </div>
                    <div style={{ lineHeight: 1.65, opacity: 0.75 }}>{description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* WORK */}
        <section id="work" style={{ padding: pad }}>
          <Reveal>
            <Label num="03" text="Selected work" />
            <h2 style={{ ...serif, fontSize: mobile ? 44 : 78, lineHeight: 1 }}>
              Things I built.
            </h2>
          </Reveal>
          <div
            style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 56 }}
          >
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <article
                  className="lift"
                  style={{ ...glass, borderRadius: 32, padding: mobile ? 24 : 40 }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      flexWrap: "wrap",
                      gap: 10,
                    }}
                  >
                    <div style={{ ...serif, fontSize: mobile ? 40 : 60, lineHeight: 1 }}>
                      <span
                        style={{
                          ...mono,
                          color: ACC,
                          marginRight: 14,
                          verticalAlign: "middle",
                        }}
                      >
                        {p.number}
                      </span>
                      {p.title}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          style={{
                            ...mono,
                            fontSize: 10.5,
                            padding: "6px 12px",
                            borderRadius: 999,
                            border: "1px solid rgba(20,19,15,.25)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: mobile ? "1fr" : "repeat(3,1fr)",
                      gap: mobile ? 18 : 32,
                      marginTop: 30,
                    }}
                  >
                    {[
                      ["Problem", p.problem],
                      ["What I built", p.built],
                      ["What I learned", p.learned],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <div
                          style={{ ...mono, fontSize: 11, color: ACC, marginBottom: 8 }}
                        >
                          {k}
                        </div>
                        <div style={{ lineHeight: 1.6, opacity: 0.78 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap" }}
                  >
                    {p.liveUrl && (
                      <a
                        className="pill solid"
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          padding: "12px 24px",
                          borderRadius: 999,
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                      >
                        Live preview ↗
                      </a>
                    )}
                    <a
                      className="pill"
                      href={p.codeUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        border: "1.5px solid " + INK,
                        padding: "10.5px 22px",
                        borderRadius: 999,
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      View code
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" style={{ padding: pad }}>
          <Reveal>
            <Label num="04" text="Skills" />
            <h2 style={{ ...serif, fontSize: mobile ? 44 : 78, lineHeight: 1 }}>
              Tools I use.
            </h2>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
              gap: 18,
              marginTop: 50,
            }}
          >
            {skills.map(({ category, items }, i) => (
              <Reveal key={category} delay={i * 0.08}>
                <div
                  className="lift"
                  style={{ ...glass, borderRadius: 26, padding: 30, height: "100%" }}
                >
                  <div style={{ ...mono, color: ACC, marginBottom: 12 }}>{category}</div>
                  <div style={{ ...serif, fontSize: 28, lineHeight: 1.25 }}>{items}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ padding: pad, textAlign: "center" }}>
          <Reveal>
            <Label num="05" text="Contact" />
            <h2
              style={{
                ...serif,
                fontSize: mobile ? 52 : 120,
                lineHeight: 0.95,
                letterSpacing: -2,
              }}
            >
              Let&apos;s work
              <br />
              <em style={{ color: ACC }}>together.</em>
            </h2>
            <p style={{ marginTop: 24, fontSize: 18, opacity: 0.65 }}>
              Open to junior and entry-level IT roles.
            </p>
            <a
              href={"mailto:" + email}
              className="ulink"
              style={{
                display: "inline-block",
                marginTop: 26,
                ...serif,
                fontSize: mobile ? 28 : 44,
              }}
            >
              {email}
            </a>
            <div
              style={{
                marginTop: 34,
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                className="pill solid"
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                style={{ padding: "14px 28px", borderRadius: 999, fontWeight: 600 }}
              >
                LinkedIn
              </a>
              <a
                className="pill"
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  ...glass,
                  padding: "14px 28px",
                  borderRadius: 999,
                  fontWeight: 600,
                }}
              >
                GitHub
              </a>
              <a
                className="pill"
                href={cvUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  ...glass,
                  padding: "14px 28px",
                  borderRadius: 999,
                  fontWeight: 600,
                }}
              >
                CV
              </a>
            </div>
          </Reveal>
          <footer
            style={{
              marginTop: 100,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 10,
              ...mono,
              fontSize: 11,
              opacity: 0.55,
            }}
          >
            <span>© 2026 {name} — Iași, Romania</span>
            <button
              className="pill"
              onClick={() => {
                go("home");
              }}
              style={{ padding: "8px 16px", borderRadius: 999, ...mono, fontSize: 11 }}
            >
              Back to top ↑
            </button>
          </footer>
        </section>
      </main>
    </div>
  );
}
