'use client'
import { useState, useEffect, useRef } from "react"

const CSS = `
:root{--bg:#0a0a08;--bg2:#111110;--paper:#f0ebe0;--pu:#9B59D0;--pu2:#B07AE0;--pu3:#7A3AB8;--muted:rgba(240,235,224,0.38);--border:rgba(240,235,224,0.12);--pbg:rgba(155,89,208,0.08);--max:1440px;--pad:44px}
.nr*{box-sizing:border-box;margin:0;padding:0}
.nr{font-family:'Space Mono',monospace;background:var(--bg);color:var(--paper);min-height:100vh;overflow-x:hidden;width:100%}
/* NAV */
.nr-nav{position:fixed;top:0;left:0;right:0;z-index:500;background:rgba(10,10,8,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:top .3s}
.nr-nav-inner{max-width:var(--max);margin:0 auto;padding:18px var(--pad);display:flex;align-items:center;justify-content:space-between}
.nr-logo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.nr-logo span{color:var(--pu)}
.nr-nav-r{display:none;align-items:center;gap:14px}
.nr-nav-r a{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.nr-nav-r a:hover{color:var(--pu)}
.nr-nav-contact{background:var(--pu)!important;color:var(--bg)!important;padding:9px 20px!important;font-weight:700!important;border:2px solid var(--pu)!important;display:inline-block!important}
.nr-nav-contact:hover{background:var(--pu2)!important;border-color:var(--pu2)!important}
.nr-ndot{width:7px;height:7px;background:var(--pu);border-radius:50%;animation:nr-pulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes nr-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.85)}}
.nr-abar{position:fixed;top:0;left:0;right:0;z-index:499;background:var(--pu3);padding:9px var(--pad);height:38px;display:none;align-items:center;justify-content:center;gap:8px}
.nr-abar.show{display:flex}
.nr-abar span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:white;font-weight:700}
.nr-adot{width:5px;height:5px;background:white;border-radius:50%;animation:nr-pulse 2s ease-in-out infinite}
/* HERO */
.nr-hero{position:relative;overflow:hidden;background:linear-gradient(150deg,#1A0A38,#5C2B90 50%,#2E1050)}
.nr-hero-inner{max-width:var(--max);margin:0 auto;padding:140px var(--pad) 60px;position:relative}
.nr-hero-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,9vw,140px);letter-spacing:-4px;color:rgba(240,235,224,0.035);white-space:nowrap;pointer-events:none;text-align:center;width:100%}
.nr-cat{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,0.6);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.nr-cat::before{content:'';width:36px;height:1px;background:rgba(255,255,255,0.4)}
.nr-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,9vw,120px);letter-spacing:-2px;line-height:.88;color:#fff;margin-bottom:32px}
.nr-meta-row{display:flex;gap:44px;flex-wrap:wrap;padding-top:28px;border-top:1px solid rgba(255,255,255,0.15)}
.nr-meta-l{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:4px}
.nr-meta-v{font-size:11px;color:#fff;font-weight:700}
/* BODY */
.nr-body{padding:0}
/* OVERVIEW — 2-col */
.nr-overview{max-width:var(--max);margin:0 auto;padding:72px var(--pad);display:grid;grid-template-columns:1fr 1fr;gap:60px}
.nr-ov-col{}
.nr-section-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:10px}
.nr-section-label::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.nr-section-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(26px,4vw,46px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px}
.nr-section-body{font-size:12px;line-height:1.95;color:var(--muted)}
.nr-list{color:var(--muted);list-style:none;padding:0;margin:0;font-size:12px;line-height:1.95}
.nr-list li{padding-left:18px;position:relative;margin-bottom:4px}
.nr-list li::before{content:'•';position:absolute;left:0;color:var(--pu)}
/* DIVIDER */
.nr-divider{border:none;border-top:1px solid var(--border);max-width:var(--max);margin:0 auto}
/* ALT ROW */
.nr-alt{max-width:var(--max);margin:0 auto;padding:72px var(--pad);display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.nr-alt-img{overflow:hidden;border:1px solid var(--border);position:relative}
.nr-alt-img img{width:100%;height:auto;display:block}
.nr-tag{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:8px}
.nr-tag::after{content:'';width:28px;height:1px;background:var(--pu)}
.nr-alt-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(24px,3.5vw,42px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px;line-height:1}
.nr-alt-body{font-size:12px;line-height:1.95;color:var(--muted)}
.nr-impact-row{margin-top:20px;padding-top:18px;border-top:1px solid var(--border)}
.nr-impact-label{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(240,235,224,0.4);margin-bottom:8px}
.nr-impact-list{list-style:none;padding:0;margin:0;font-size:11px;line-height:1.9;color:var(--muted)}
.nr-impact-list li{padding-left:16px;position:relative;margin-bottom:2px}
.nr-impact-list li::before{content:'→';position:absolute;left:0;color:var(--pu);font-size:9px;top:2px}
/* IMPACT FINAL */
.nr-impact-final{max-width:var(--max);margin:0 auto;padding:72px var(--pad);background:var(--bg2)}
.nr-impact-final-inner{max-width:var(--max);margin:0 auto}
.nr-impact-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:40px}
.nr-stat{border-left:2px solid var(--pu);padding-left:18px}
.nr-stat-num{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,48px);letter-spacing:-1px;color:var(--paper);line-height:1}
.nr-stat-label{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:4px;line-height:1.6}
/* NEXT PROJECT */
.nr-next{background:var(--bg2)}
.nr-next-inner{max-width:var(--max);margin:0 auto;padding:64px var(--pad);display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:center}
.nr-next-preview{position:relative;overflow:hidden;aspect-ratio:4/3;border:1px solid var(--border)}
.nr-next-preview-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px}
.nr-next-preview-cat{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:6px}
.nr-next-preview-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(16px,2.2vw,26px);letter-spacing:-.5px;color:#fff;line-height:1}
.nr-next-tag{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.nr-next-tag::after{content:'';width:36px;height:1px;background:var(--pu)}
.nr-next-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4.5vw,56px);letter-spacing:-1px;color:var(--paper);line-height:.92;margin-bottom:14px}
.nr-next-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:380px;margin-bottom:28px}
.nr-next-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.nr-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;background:var(--pu);color:var(--bg);border:2px solid var(--pu);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.nr-btn:hover{background:var(--pu2);border-color:var(--pu2)}
.nr-ghost-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.nr-ghost-btn:hover{border-color:var(--pu);color:var(--pu)}
/* FOOTER */
.nr-foot{border-top:1px solid var(--border)}
.nr-foot-inner{max-width:var(--max);margin:0 auto;padding:44px var(--pad);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.nr-flogo{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.nr-flogo span{color:var(--pu)}
.nr-fcopy{font-size:9px;color:var(--muted)}
.nr-flinks{display:flex;gap:18px;flex-wrap:wrap;align-items:center}
.nr-flinks a{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.nr-flinks a:hover{color:var(--pu)}
.nr-fall{color:var(--pu)!important}
/* REVEAL */
.nr-rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.nr-rv.in{opacity:1;transform:translateY(0)}
/* MOBILE DRAWER */
.nr-hamburger{display:flex;flex-direction:column;gap:5px;cursor:pointer;background:transparent;border:none;padding:6px}
.nr-hamburger span{display:block;width:24px;height:2px;background:var(--paper);transition:all .3s}
.nr-drawer{position:fixed;inset:0;z-index:600;background:var(--bg);transform:translateX(100%);transition:transform .35s ease;display:flex;flex-direction:column;padding:88px 28px 40px;overflow-y:auto}
.nr-drawer.open{transform:translateX(0)}
.nr-drawer-close{position:absolute;top:22px;right:24px;background:transparent;border:none;color:var(--paper);font-size:22px;cursor:pointer;line-height:1}
.nr-drawer a{font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;padding:18px 0;border-bottom:1px solid var(--border);transition:color .2s;display:block}
.nr-drawer a:hover,.nr-drawer a:active{color:var(--pu)}
.nr-drawer-cta{background:var(--pu);color:var(--bg)!important;padding:14px 0!important;font-weight:700;border-bottom:none!important;text-align:center;margin-top:20px;display:block;font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;transition:background .2s}
.nr-drawer-cta:hover{background:var(--pu2)}
/* ===== RESPONSIVE ===== */
@media(max-width:1023px){
  :root{--pad:32px}
  .nr-nav-inner{padding:14px 28px}
  .nr-overview{grid-template-columns:1fr;gap:40px}
  .nr-alt{grid-template-columns:1fr;gap:32px}
  .nr-impact-stats{grid-template-columns:repeat(2,1fr)}
  .nr-next-inner{grid-template-columns:1fr;gap:32px}
}
@media(max-width:768px){
  :root{--pad:24px}
  .nr-hero-inner{padding:110px var(--pad) 44px}
  .nr-overview{padding:52px var(--pad)}
  .nr-alt{padding:52px var(--pad)}
  .nr-impact-final{padding:52px var(--pad) 52px}
  .nr-impact-stats{grid-template-columns:repeat(2,1fr);gap:20px}
  .nr-next-inner{padding:44px var(--pad)}
  .nr-meta-row{gap:24px}
  .nr-foot-inner{flex-direction:column;align-items:flex-start;gap:20px;padding:32px var(--pad)}
  .nr-flinks{flex-direction:column;gap:10px;align-items:flex-start}
  .nr-next-actions{flex-direction:column;align-items:flex-start}
  .nr-btn,.nr-ghost-btn{width:100%;text-align:center;display:block}
}
@media(max-width:480px){
  :root{--pad:16px}
  .nr-abar{padding:9px 16px}
  .nr-abar span{font-size:7px}
  .nr-meta-row{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
  .nr-impact-stats{grid-template-columns:1fr;gap:14px}
}
@media(hover:none),(pointer:coarse){
  .nr-hamburger{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center}
  .nr-nav-r{display:none}
  .nr-btn,.nr-ghost-btn{min-height:44px;display:inline-flex;align-items:center;justify-content:center}
}
@media(min-width:1024px){
  .nr-hamburger{display:none}
  .nr-nav-r{display:flex}
}
@media(prefers-reduced-motion:reduce){
  .nr-rv{transition:none;opacity:1;transform:none}
  .nr-drawer{transition:none}
  .nr-ndot,.nr-adot{animation:none}
}
`

export default function NourPage() {
    const ref = useRef<HTMLDivElement>(null)
    const [navScroll, setNavScroll] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const drawerRef = useRef<HTMLDivElement>(null)
    const hamburgerRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const onScroll = () => setNavScroll(window.scrollY > 80)
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => {
        const els = Array.from(ref.current?.querySelectorAll(".nr-rv") || [])
        const reveal = () => {
            els.forEach(el => {
                if ((el as HTMLElement).getBoundingClientRect().top < window.innerHeight)
                    (el as HTMLElement).classList.add("in")
            })
        }
        reveal()
        const raf = requestAnimationFrame(reveal)
        window.addEventListener("scroll", reveal, { passive: true })
        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener("scroll", reveal)
        }
    }, [])

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [menuOpen])

    useEffect(() => {
        if (!menuOpen) { hamburgerRef.current?.focus(); return }
        const drawer = drawerRef.current
        if (!drawer) return
        const focusable = Array.from(drawer.querySelectorAll<HTMLElement>("a,button"))
        focusable[0]?.focus()
        const trap = (e: KeyboardEvent) => {
            if (e.key === "Escape") { setMenuOpen(false); return }
            if (e.key !== "Tab") return
            const first = focusable[0], last = focusable[focusable.length - 1]
            if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last?.focus() } }
            else { if (document.activeElement === last) { e.preventDefault(); first?.focus() } }
        }
        document.addEventListener("keydown", trap)
        return () => document.removeEventListener("keydown", trap)
    }, [menuOpen])

    return (
        <div className="nr" ref={ref}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" />
            <style>{CSS}</style>

            {/* AVAILABLE BAR */}
            <div className={`nr-abar${navScroll ? " show" : ""}`}>
                <div className="nr-adot" />
                <span>Available for new projects</span>
            </div>

            {/* NAV */}
            <nav className="nr-nav" style={{ top: navScroll ? "38px" : "0" }}>
                <div className="nr-nav-inner">
                    <a className="nr-logo" href="/">JADEY<span>.</span></a>
                    <div className="nr-nav-r">
                        <div className="nr-ndot" />
                        <a href="/all-work">All Projects</a>
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a className="nr-nav-contact" href="/#contact">Contact Me</a>
                    </div>
                    <button ref={hamburgerRef} className="nr-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* MOBILE DRAWER */}
            <div ref={drawerRef} className={`nr-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-label="Navigation menu">
                <button className="nr-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <a href="/all-work" onClick={() => setMenuOpen(false)}>All Projects</a>
                <a href="/#about" onClick={() => setMenuOpen(false)}>About Me</a>
                <a href="/#work" onClick={() => setMenuOpen(false)}>Work Highlights</a>
                <a href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <a href="/#insights" onClick={() => setMenuOpen(false)}>Blog</a>
                <a href="/#workshops" onClick={() => setMenuOpen(false)}>Workshops</a>
                <a className="nr-drawer-cta" href="/#contact" onClick={() => setMenuOpen(false)}>Contact Me</a>
            </div>

            {/* HERO */}
            <div className="nr-hero">
                <div className="nr-hero-inner">
                    <div className="nr-hero-ghost">NOUR</div>
                    <div className="nr-cat nr-rv">Brand Identity Design</div>
                    <h1 className="nr-title nr-rv">Nour</h1>
                    <p className="nr-rv" style={{ fontSize: 13, lineHeight: 1.85, color: "rgba(255,255,255,0.65)", maxWidth: 520, marginBottom: 32 }}>
                        An AI-assisted branding project for a premium candle and home fragrance brand, created to explore a warm, intimate, and elegant visual identity that captures the quiet ritual of light and scent.
                    </p>
                    <div className="nr-meta-row nr-rv">
                        <div>
                            <div className="nr-meta-l">Client</div>
                            <div className="nr-meta-v">Nour</div>
                        </div>
                        <div>
                            <div className="nr-meta-l">Service</div>
                            <div className="nr-meta-v">Brand Identity Design</div>
                        </div>
                        <div>
                            <div className="nr-meta-l">Project Type</div>
                            <div className="nr-meta-v">AI-Assisted Project</div>
                        </div>
                        <div>
                            <div className="nr-meta-l">Industry</div>
                            <div className="nr-meta-v">Candle / Home Fragrance / Lifestyle</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="nr-body">

                {/* OVERVIEW — Problem + Solution */}
                <div className="nr-overview nr-rv">
                    <div className="nr-ov-col">
                        <div className="nr-section-label">The Problem</div>
                        <h2 className="nr-section-title">The Challenge</h2>
                        <p className="nr-section-body">
                            The home fragrance and candle market is saturated with brands that either lean too minimalist and sterile, or too ornate and overwhelming. For Nour, the challenge was to create a brand identity that feels genuinely premium — warm, intimate, and considered — without slipping into either extreme.
                        </p>
                        <p className="nr-section-body" style={{ marginTop: 12 }}>
                            The brand&apos;s name, Nour, means &ldquo;light&rdquo; in Arabic — a quiet, deeply meaningful word that needed to shape every design decision. The identity had to communicate the sensory experience of candlelight: its warmth, its stillness, and the personal ritual it creates.
                        </p>
                        <p className="nr-section-body" style={{ marginTop: 12 }}>
                            The visual system also needed to work across multiple brand surfaces — from product packaging and merchandise to logo usage and typography — while remaining cohesive, scalable, and rooted in the same quiet confidence the name carries.
                        </p>
                    </div>
                    <div className="nr-ov-col">
                        <div className="nr-section-label">The Solution</div>
                        <h2 className="nr-section-title">The Approach</h2>
                        <p className="nr-section-body">
                            The solution was to build a full brand identity system around the meaning of Nour — using warmth, restraint, and elegance as the guiding principles across every touchpoint. The identity draws from the golden glow of candlelight, the calm of an intimate space, and the ritual nature of home fragrance.
                        </p>
                        <ul className="nr-list" style={{ marginTop: 14 }}>
                            <li>Brand overview — setting the tone and visual direction for the full identity</li>
                            <li>Logo and brand identity — grounded in clarity, warmth, and refined simplicity</li>
                            <li>Color system — deep neutrals, warm amber, soft cream, and muted gold</li>
                            <li>Typography — understated, modern, and intimate in character</li>
                            <li>Visual direction — quiet, candlelit, and intentionally unhurried</li>
                            <li>Merch collection — extending the identity into lifestyle touchpoints</li>
                            <li>Product packaging — minimal, elegant, and true to the brand&apos;s ritual feel</li>
                        </ul>
                        <p className="nr-section-body" style={{ marginTop: 14 }}>
                            AI was used to support creative exploration and test how the identity could hold across different surfaces. The final design decisions, brand direction, and presentation were refined by the designer to make sure the output felt intentional and true to the Nour concept.
                        </p>
                    </div>
                </div>

                <hr className="nr-divider" />

                {/* BRAND OVERVIEW — image left, text right */}
                <div className="nr-alt nr-rv">
                    <div className="nr-alt-img">
                        <img src="/Nour%20Brand%20Thumbnail.png" alt="Nour — Brand Overview" />
                    </div>
                    <div>
                        <div className="nr-tag">Brand Overview</div>
                        <h2 className="nr-alt-title">Brand Overview</h2>
                        <p className="nr-alt-body">
                            The brand overview establishes the full mood and direction of the Nour identity — a premium candle and home fragrance brand built around the Arabic concept of light. It presents the visual tone, emotional positioning, and core design language that carries through every brand touchpoint.
                        </p>
                        <p className="nr-alt-body" style={{ marginTop: 12 }}>
                            Nour is not just a product brand — it&apos;s a sensory experience. The overview anchors that experience in a visual system that feels warm without being loud, and premium without being cold. Every design decision flows from the same quiet, considered place the name represents.
                        </p>
                        <div className="nr-impact-row">
                            <div className="nr-impact-label">Result</div>
                            <ul className="nr-impact-list">
                                <li>A clear brand foundation that communicates warmth, intimacy, and quiet luxury</li>
                                <li>A visual tone that stays consistent across every application in the system</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="nr-divider" />

                {/* LOGO & BRAND IDENTITY — text left, image right */}
                <div className="nr-alt nr-rv">
                    <div>
                        <div className="nr-tag">Brand Identity</div>
                        <h2 className="nr-alt-title">Logo &amp; Brand Identity</h2>
                        <p className="nr-alt-body">
                            The logo and brand identity section presents the Nour mark and core identity elements in a clear, refined way. It shows how the logo supports the brand&apos;s premium yet intimate tone — balancing elegance and warmth while maintaining recognizability across all applications.
                        </p>
                        <p className="nr-alt-body" style={{ marginTop: 12 }}>
                            The identity stays true to the meaning behind Nour — light as something quiet, personal, and present. The mark avoids excess. It lets the name carry its weight without ornamentation, resulting in a logo that feels confident, warm, and distinctly its own.
                        </p>
                        <div className="nr-impact-row">
                            <div className="nr-impact-label">Result</div>
                            <ul className="nr-impact-list">
                                <li>A refined logo that communicates warmth and quiet confidence</li>
                                <li>Consistent identity that holds across packaging, merchandise, and brand materials</li>
                            </ul>
                        </div>
                    </div>
                    <div className="nr-alt-img">
                        <img src="/Nour%20Logo%20Usage.png" alt="Nour — Logo and Brand Identity" />
                    </div>
                </div>

                <hr className="nr-divider" />

                {/* COLOR SYSTEM — image left, text right */}
                <div className="nr-alt nr-rv">
                    <div className="nr-alt-img">
                        <img src="/Nour%20Color%20Palette.png" alt="Nour — Color Palette" />
                    </div>
                    <div>
                        <div className="nr-tag">Color System</div>
                        <h2 className="nr-alt-title">Color &amp; Palette</h2>
                        <p className="nr-alt-body">
                            The color system defines the palette that shapes the entire Nour identity. Deep, grounded neutrals, warm amber, soft cream, muted beige, and restrained gold accents work together to communicate candlelight, intimacy, and quiet luxury.
                        </p>
                        <p className="nr-alt-body" style={{ marginTop: 12 }}>
                            The palette makes Nour feel premium without feeling cold. Each tone reflects the sensory world the brand lives in — the warmth of a lit candle, the calm of a still room, the soft glow that changes the atmosphere of a space. Together, they give the identity a visual temperature that is immediately recognizable.
                        </p>
                        <div className="nr-impact-row">
                            <div className="nr-impact-label">Result</div>
                            <ul className="nr-impact-list">
                                <li>A warm, grounded palette that communicates intimacy and premium restraint</li>
                                <li>Consistent color language that holds through packaging, merch, and brand materials</li>
                                <li>A visual temperature that feels immediately at home in the lifestyle and fragrance space</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="nr-divider" />

                {/* TYPOGRAPHY — text left, image right */}
                <div className="nr-alt nr-rv">
                    <div>
                        <div className="nr-tag">Typography</div>
                        <h2 className="nr-alt-title">Typography</h2>
                        <p className="nr-alt-body">
                            The typography system shapes how Nour communicates across brand materials. The type choices lean toward understated elegance — refined enough to signal premium quality, intimate enough to feel personal and unhurried rather than corporate or distant.
                        </p>
                        <p className="nr-alt-body" style={{ marginTop: 12 }}>
                            Type is used with restraint throughout the identity. Generous spacing, careful hierarchy, and a consistent voice across all materials make the brand feel considered at every scale — from product labels to brand presentations and merchandise.
                        </p>
                        <div className="nr-impact-row">
                            <div className="nr-impact-label">Result</div>
                            <ul className="nr-impact-list">
                                <li>A type system that gives Nour a calm, premium voice without overstatement</li>
                                <li>Clear typographic hierarchy that carries through every brand surface</li>
                            </ul>
                        </div>
                    </div>
                    <div className="nr-alt-img">
                        <img src="/Nour%20Typography.png" alt="Nour — Typography" />
                    </div>
                </div>

                <hr className="nr-divider" />

                {/* VISUAL DIRECTION — image left, text right */}
                <div className="nr-alt nr-rv">
                    <div className="nr-alt-img">
                        <img src="/Nour%20Visual%20Direction.png" alt="Nour — Visual Direction" />
                    </div>
                    <div>
                        <div className="nr-tag">Visual Direction</div>
                        <h2 className="nr-alt-title">Visual Direction</h2>
                        <p className="nr-alt-body">
                            The visual direction section brings together the mood, composition, and overall aesthetic language that defines how Nour looks and feels. The direction is quiet, candlelit, and intentionally unhurried — designed to communicate the sensory experience of the brand before a product is ever opened.
                        </p>
                        <p className="nr-alt-body" style={{ marginTop: 12 }}>
                            Layouts are spacious and clean. Composition avoids clutter. The overall mood stays warm and intimate — close enough to feel personal, elevated enough to signal quality. The visual direction ensures that every touchpoint in the Nour system feels like it belongs to the same calm, considered world.
                        </p>
                        <div className="nr-impact-row">
                            <div className="nr-impact-label">Result</div>
                            <ul className="nr-impact-list">
                                <li>A visual language that communicates the ritual feel of candlelight and home fragrance</li>
                                <li>Consistent mood and composition that holds across every application in the system</li>
                                <li>An aesthetic direction that feels premium, warm, and deeply aligned with the brand&apos;s name</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="nr-divider" />

                {/* MERCH COLLECTION — text left, image right */}
                <div className="nr-alt nr-rv">
                    <div>
                        <div className="nr-tag">Merchandise</div>
                        <h2 className="nr-alt-title">Merch Collection</h2>
                        <p className="nr-alt-body">
                            The merch collection shows how the Nour identity extends into physical lifestyle applications. The brand stays warm and recognizable when applied to merchandise — proving that the visual system is strong enough to move beyond packaging and into the everyday objects that live alongside the product.
                        </p>
                        <p className="nr-alt-body" style={{ marginTop: 12 }}>
                            For a brand like Nour — built around the ritual of home and self — merchandise is not an afterthought. It extends the brand into the spaces and surfaces that matter to the people it is designed for. The merch collection demonstrates that the identity is versatile enough to work in those real-world contexts while staying clearly Nour.
                        </p>
                        <div className="nr-impact-row">
                            <div className="nr-impact-label">Result</div>
                            <ul className="nr-impact-list">
                                <li>A brand identity that translates cleanly onto physical surfaces and lifestyle objects</li>
                                <li>Consistent brand presence that extends the system beyond digital and product applications</li>
                                <li>A warm, lifestyle-aligned feel that stays true to Nour&apos;s intimate positioning</li>
                            </ul>
                        </div>
                    </div>
                    <div className="nr-alt-img">
                        <img src="/Nour%20Merch.png" alt="Nour — Merch Collection" />
                    </div>
                </div>

                <hr className="nr-divider" />

                {/* PRODUCT PACKAGING — image left, text right */}
                <div className="nr-alt nr-rv">
                    <div className="nr-alt-img">
                        <img src="/Nour%20Packaging.png" alt="Nour — Product Packaging" />
                    </div>
                    <div>
                        <div className="nr-tag">Product Packaging</div>
                        <h2 className="nr-alt-title">Product Packaging</h2>
                        <p className="nr-alt-body">
                            The product packaging section shows how the Nour identity is applied to its most important touchpoint — the product itself. Packaging is kept minimal and spacious: clean labels, warm visual details, and a presentation that feels elevated without becoming busy or over-designed.
                        </p>
                        <p className="nr-alt-body" style={{ marginTop: 12 }}>
                            The packaging directly supports Nour&apos;s position as a premium home fragrance brand. It should feel like something a person would choose to leave out — quiet enough to belong in a calm space, beautiful enough to be noticed. The design communicates quality at first glance and stays true to the ritual the brand is built around.
                        </p>
                        <div className="nr-impact-row">
                            <div className="nr-impact-label">Result</div>
                            <ul className="nr-impact-list">
                                <li>Minimal, warm packaging that communicates premium quality without noise</li>
                                <li>A product presentation that feels personal, intimate, and visually cohesive</li>
                                <li>Packaging that holds the brand identity clearly at every product touchpoint</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            {/* IMPACT FINAL */}
            <div className="nr-impact-final">
                <div className="nr-impact-final-inner nr-rv">
                    <div className="nr-section-label">The Impact</div>
                    <h2 className="nr-section-title">Final Result</h2>
                    <p className="nr-section-body" style={{ maxWidth: 680 }}>
                        Nour was developed as an AI-assisted branding project, resulting in a cohesive identity system built across seven brand touchpoints — brand overview, logo and brand identity, color system, typography, visual direction, merch collection, and product packaging.
                    </p>
                    <p className="nr-section-body" style={{ maxWidth: 680, marginTop: 12 }}>
                        The final identity gives Nour a unified and intentional brand presence. Instead of disconnected design pieces, the logo, color palette, typography, visual direction, packaging, and merchandise work together as one complete system — warm, intimate, and premium in character. AI supported the creative exploration process, but the final brand direction, design decisions, and presentation were refined by the designer to make sure the output felt genuine and aligned with everything the name Nour represents.
                    </p>
                    <div className="nr-impact-stats">
                        <div className="nr-stat">
                            <div className="nr-stat-num">7</div>
                            <div className="nr-stat-label">Brand touchpoints — from logo and color to packaging and merchandise</div>
                        </div>
                        <div className="nr-stat">
                            <div className="nr-stat-num">1</div>
                            <div className="nr-stat-label">Unified identity system that works consistently across every application</div>
                        </div>
                        <div className="nr-stat">
                            <div className="nr-stat-num">✦</div>
                            <div className="nr-stat-label">Warm and intimate presence in the premium home fragrance space</div>
                        </div>
                        <div className="nr-stat">
                            <div className="nr-stat-num">→</div>
                            <div className="nr-stat-label">A scalable visual foundation ready for future product lines and brand extensions</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* NEXT PROJECT */}
            <div className="nr-next">
                <div className="nr-next-inner nr-rv">
                    <div className="nr-next-preview">
                        <img
                            src="/Lunara%20-%20Thumbnail.png"
                            alt="Lunara Haircare Brand Identity"
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.05)" }}
                        />
                        <div className="nr-next-preview-overlay">
                            <div className="nr-next-preview-cat">Brand Design</div>
                            <div className="nr-next-preview-name">Lunara Haircare</div>
                        </div>
                    </div>
                    <div>
                        <div className="nr-next-tag">Next Project</div>
                        <div className="nr-next-title">Lunara Haircare</div>
                        <p className="nr-next-desc">AI-assisted brand identity for a premium hair care brand — soft, elegant, and trustworthy visual identity built for calm self-care across logo, color, packaging, and merchandise.</p>
                        <div className="nr-next-actions">
                            <a className="nr-btn" href="/all-work/lunara-haircare">View Project →</a>
                            <a className="nr-ghost-btn" href="/all-work">All Work</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="nr-foot">
                <div className="nr-foot-inner">
                    <a className="nr-flogo" href="/">JADEY<span>.</span></a>
                    <div className="nr-fcopy">© 2025 Jane Dhell Cagas. All rights reserved.</div>
                    <div className="nr-flinks">
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a href="/#contact">Contact</a>
                        <a className="nr-fall" href="/all-work">All Projects →</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
