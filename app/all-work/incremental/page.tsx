'use client'
import { useState, useEffect, useRef } from "react"

const CSS = `
:root{--bg:#0a0a08;--bg2:#111110;--paper:#f0ebe0;--pu:#9B59D0;--pu2:#B07AE0;--pu3:#7A3AB8;--muted:rgba(240,235,224,0.38);--border:rgba(240,235,224,0.12);--pborder:rgba(155,89,208,0.3);--pbg:rgba(155,89,208,0.08);--max:1440px;--pad:44px}
.inc*{box-sizing:border-box;margin:0;padding:0}
.inc{font-family:'Space Mono',monospace;background:var(--bg);color:var(--paper);min-height:100vh;overflow-x:hidden;width:100%}
/* NAV */
.inc-nav{position:fixed;top:0;left:0;right:0;z-index:500;background:rgba(10,10,8,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:top .3s}
.inc-nav-inner{max-width:var(--max);margin:0 auto;padding:18px var(--pad);display:flex;align-items:center;justify-content:space-between}
.inc-logo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.inc-logo span{color:var(--pu)}
.inc-nav-r{display:none;align-items:center;gap:14px}
.inc-nav-r a{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.inc-nav-r a:hover{color:var(--pu)}
.inc-nav-contact{background:var(--pu)!important;color:var(--bg)!important;padding:9px 20px!important;font-weight:700!important;border:2px solid var(--pu)!important;display:inline-block!important}
.inc-nav-contact:hover{background:var(--pu2)!important;border-color:var(--pu2)!important}
.inc-ndot{width:7px;height:7px;background:var(--pu);border-radius:50%;animation:inc-pulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes inc-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.85)}}
.inc-abar{position:fixed;top:0;left:0;right:0;z-index:499;background:var(--pu3);padding:9px var(--pad);height:38px;display:none;align-items:center;justify-content:center;gap:8px}
.inc-abar.show{display:flex}
.inc-abar span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:white;font-weight:700}
.inc-adot{width:5px;height:5px;background:white;border-radius:50%;animation:inc-pulse 2s ease-in-out infinite}
/* HERO */
.inc-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#2E1050,#6B3FA0)}
.inc-hero-inner{max-width:var(--max);margin:0 auto;padding:140px var(--pad) 60px;position:relative}
.inc-hero-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,9vw,140px);letter-spacing:-4px;color:rgba(240,235,224,0.035);white-space:nowrap;pointer-events:none;text-align:center;width:100%}
.inc-cat{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,0.6);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.inc-cat::before{content:'';width:36px;height:1px;background:rgba(255,255,255,0.4)}
.inc-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,9vw,120px);letter-spacing:-2px;line-height:.88;color:#fff;margin-bottom:32px}
.inc-collab{display:inline-flex;align-items:center;gap:8px;background:rgba(155,89,208,0.15);border:1px solid rgba(155,89,208,0.35);padding:7px 14px;margin-bottom:28px}
.inc-collab-dot{width:6px;height:6px;background:var(--pu2);border-radius:50%;flex-shrink:0}
.inc-collab-text{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--pu2)}
.inc-meta-row{display:flex;gap:44px;flex-wrap:wrap;padding-top:28px;border-top:1px solid rgba(255,255,255,0.15)}
.inc-meta-l{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:4px}
.inc-meta-v{font-size:11px;color:#fff;font-weight:700}
/* BODY */
.inc-body{padding:0}
/* COVER */
.inc-cover{padding:52px var(--pad) 0}
.inc-cover-wrap{max-width:1425px;margin:0 auto;overflow:hidden}
.inc-cover-wrap img{width:100%;height:auto;display:block}
/* OVERVIEW — 2-col */
.inc-overview{max-width:var(--max);margin:0 auto;padding:72px var(--pad);display:grid;grid-template-columns:1fr 1fr;gap:60px}
.inc-ov-col{}
.inc-section-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:10px}
.inc-section-label::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.inc-section-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(26px,4vw,46px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px}
.inc-section-body{font-size:12px;line-height:1.95;color:var(--muted)}
.inc-list{color:var(--muted);list-style:none;padding:0;margin:0;font-size:12px;line-height:1.95}
.inc-list li{padding-left:18px;position:relative;margin-bottom:4px}
.inc-list li::before{content:'•';position:absolute;left:0;color:var(--pu)}
/* DIVIDER */
.inc-divider{border:none;border-top:1px solid var(--border);max-width:var(--max);margin:0 auto}
/* ALT ROW */
.inc-alt{max-width:var(--max);margin:0 auto;padding:72px var(--pad);display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.inc-alt-img{overflow:hidden;border:1px solid var(--border);position:relative}
.inc-alt-img img{width:100%;height:auto;display:block}
.inc-alt-content{}
.inc-tag{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:8px}
.inc-tag::after{content:'';width:28px;height:1px;background:var(--pu)}
.inc-alt-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(24px,3.5vw,42px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px;line-height:1}
.inc-alt-body{font-size:12px;line-height:1.95;color:var(--muted)}
.inc-impact-row{margin-top:20px;padding-top:18px;border-top:1px solid var(--border)}
.inc-impact-label{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(240,235,224,0.4);margin-bottom:8px}
.inc-impact-list{list-style:none;padding:0;margin:0;font-size:11px;line-height:1.9;color:var(--muted)}
.inc-impact-list li{padding-left:16px;position:relative;margin-bottom:2px}
.inc-impact-list li::before{content:'→';position:absolute;left:0;color:var(--pu);font-size:9px;top:2px}
/* IMPACT FINAL */
.inc-impact-final{max-width:var(--max);margin:0 auto;padding:72px var(--pad);background:var(--bg2)}
.inc-impact-final-inner{max-width:var(--max);margin:0 auto}
.inc-impact-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:40px}
.inc-stat{border-left:2px solid var(--pu);padding-left:18px}
.inc-stat-num{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,48px);letter-spacing:-1px;color:var(--paper);line-height:1}
.inc-stat-label{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:4px;line-height:1.6}
/* NEXT PROJECT */
.inc-next{background:var(--bg2)}
.inc-next-inner{max-width:var(--max);margin:0 auto;padding:64px var(--pad);display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:center}
.inc-next-preview{position:relative;overflow:hidden;aspect-ratio:4/3;border:1px solid var(--border)}
.inc-next-preview-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px}
.inc-next-preview-cat{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:6px}
.inc-next-preview-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(16px,2.2vw,26px);letter-spacing:-.5px;color:#fff;line-height:1}
.inc-next-tag{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.inc-next-tag::after{content:'';width:36px;height:1px;background:var(--pu)}
.inc-next-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4.5vw,56px);letter-spacing:-1px;color:var(--paper);line-height:.92;margin-bottom:14px}
.inc-next-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:380px;margin-bottom:28px}
.inc-next-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.inc-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;background:var(--pu);color:var(--bg);border:2px solid var(--pu);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.inc-btn:hover{background:var(--pu2);border-color:var(--pu2)}
.inc-ghost-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.inc-ghost-btn:hover{border-color:var(--pu);color:var(--pu)}
/* FOOTER */
.inc-foot{border-top:1px solid var(--border)}
.inc-foot-inner{max-width:var(--max);margin:0 auto;padding:44px var(--pad);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.inc-flogo{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.inc-flogo span{color:var(--pu)}
.inc-fcopy{font-size:9px;color:var(--muted)}
.inc-flinks{display:flex;gap:18px;flex-wrap:wrap;align-items:center}
.inc-flinks a{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.inc-flinks a:hover{color:var(--pu)}
.inc-fall{color:var(--pu)!important}
/* REVEAL */
.inc-rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.inc-rv.in{opacity:1;transform:translateY(0)}
/* MOBILE DRAWER */
.inc-hamburger{display:flex;flex-direction:column;gap:5px;cursor:pointer;background:transparent;border:none;padding:6px}
.inc-hamburger span{display:block;width:24px;height:2px;background:var(--paper);transition:all .3s}
.inc-drawer{position:fixed;inset:0;z-index:600;background:var(--bg);transform:translateX(100%);transition:transform .35s ease;display:flex;flex-direction:column;padding:88px 28px 40px;overflow-y:auto}
.inc-drawer.open{transform:translateX(0)}
.inc-drawer-close{position:absolute;top:22px;right:24px;background:transparent;border:none;color:var(--paper);font-size:22px;cursor:pointer;line-height:1}
.inc-drawer a{font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;padding:18px 0;border-bottom:1px solid var(--border);transition:color .2s;display:block}
.inc-drawer a:hover,.inc-drawer a:active{color:var(--pu)}
.inc-drawer-cta{background:var(--pu);color:var(--bg)!important;padding:14px 0!important;font-weight:700;border-bottom:none!important;text-align:center;margin-top:20px;display:block;font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;transition:background .2s}
.inc-drawer-cta:hover{background:var(--pu2)}
/* ===== RESPONSIVE ===== */
@media(max-width:1023px){
  :root{--pad:32px}
  .inc-nav-inner{padding:14px 28px}
  .inc-overview{grid-template-columns:1fr;gap:40px}
  .inc-alt{grid-template-columns:1fr;gap:32px}
  .inc-impact-stats{grid-template-columns:repeat(2,1fr)}
  .inc-next-inner{grid-template-columns:1fr;gap:32px}
}
@media(max-width:768px){
  :root{--pad:24px}
  .inc-hero-inner{padding:110px var(--pad) 44px}
  .inc-overview{padding:52px var(--pad)}
  .inc-alt{padding:52px var(--pad)}
  .inc-cover{padding:36px var(--pad) 0}
  .inc-impact-final{padding:52px var(--pad) 52px}
  .inc-impact-stats{grid-template-columns:repeat(2,1fr);gap:20px}
  .inc-next-inner{padding:44px var(--pad)}
  .inc-meta-row{gap:24px}
  .inc-foot-inner{flex-direction:column;align-items:flex-start;gap:20px;padding:32px var(--pad)}
  .inc-flinks{flex-direction:column;gap:10px;align-items:flex-start}
  .inc-next-actions{flex-direction:column;align-items:flex-start}
  .inc-btn,.inc-ghost-btn{width:100%;text-align:center;display:block}
}
@media(max-width:480px){
  :root{--pad:16px}
  .inc-abar{padding:9px 16px}
  .inc-abar span{font-size:7px}
  .inc-meta-row{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
  .inc-impact-stats{grid-template-columns:1fr;gap:14px}
}
@media(hover:none),(pointer:coarse){
  .inc-hamburger{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center}
  .inc-nav-r{display:none}
  .inc-btn,.inc-ghost-btn{min-height:44px;display:inline-flex;align-items:center;justify-content:center}
}
@media(min-width:1024px){
  .inc-hamburger{display:none}
  .inc-nav-r{display:flex}
}
@media(prefers-reduced-motion:reduce){
  .inc-rv{transition:none;opacity:1;transform:none}
  .inc-drawer{transition:none}
  .inc-ndot,.inc-adot{animation:none}
}
`

export default function IncrementalPage() {
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
        const els = Array.from(ref.current?.querySelectorAll(".inc-rv") || [])
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
        <div className="inc" ref={ref}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" />
            <style>{CSS}</style>

            {/* AVAILABLE BAR */}
            <div className={`inc-abar${navScroll ? " show" : ""}`}>
                <div className="inc-adot" />
                <span>Available for new projects</span>
            </div>

            {/* NAV */}
            <nav className="inc-nav" style={{ top: navScroll ? "38px" : "0" }}>
                <div className="inc-nav-inner">
                    <a className="inc-logo" href="/">JADEY<span>.</span></a>
                    <div className="inc-nav-r">
                        <div className="inc-ndot" />
                        <a href="/all-work">All Projects</a>
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a className="inc-nav-contact" href="/#contact">Contact Me</a>
                    </div>
                    <button ref={hamburgerRef} className="inc-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* MOBILE DRAWER */}
            <div ref={drawerRef} className={`inc-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-label="Navigation menu">
                <button className="inc-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <a href="/all-work" onClick={() => setMenuOpen(false)}>All Projects</a>
                <a href="/#about" onClick={() => setMenuOpen(false)}>About Me</a>
                <a href="/#work" onClick={() => setMenuOpen(false)}>Work Highlights</a>
                <a href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <a href="/#insights" onClick={() => setMenuOpen(false)}>Blog</a>
                <a href="/#workshops" onClick={() => setMenuOpen(false)}>Workshops</a>
                <a className="inc-drawer-cta" href="/#contact" onClick={() => setMenuOpen(false)}>Contact Me</a>
            </div>

            {/* HERO */}
            <div className="inc-hero">
                <div className="inc-hero-inner">
                    <div className="inc-hero-ghost">INCREMENTAL</div>
                    <div className="inc-cat inc-rv">Brand Identity Design</div>
                    <h1 className="inc-title inc-rv">Incremental</h1>
                    <div className="inc-collab inc-rv">
                        <div className="inc-collab-dot" />
                        <span className="inc-collab-text">Collaboration — Designed by two creatives</span>
                    </div>
                    <p className="inc-rv" style={{ fontSize: 13, lineHeight: 1.85, color: "rgba(255,255,255,0.65)", maxWidth: 520, marginBottom: 32 }}>
                        A collaborative brand identity project created to build a clean, structured, and scalable visual system for a modern technology-focused brand.
                    </p>
                    <div className="inc-meta-row inc-rv">
                        <div>
                            <div className="inc-meta-l">Client</div>
                            <div className="inc-meta-v">Incremental</div>
                        </div>
                        <div>
                            <div className="inc-meta-l">Service</div>
                            <div className="inc-meta-v">Brand Identity Design</div>
                        </div>
                        <div>
                            <div className="inc-meta-l">Project Type</div>
                            <div className="inc-meta-v">Collaboration Project</div>
                        </div>
                        <div>
                            <div className="inc-meta-l">Industry</div>
                            <div className="inc-meta-v">Technology / Digital Product</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* COVER */}
            <div className="inc-cover inc-rv">
                <div className="inc-cover-wrap">
                    <img src="/incremental%20-%20brand%20overview.png" alt="Incremental — Brand Overview" />
                </div>
            </div>

            <div className="inc-body">

                {/* OVERVIEW — Problem + Solution */}
                <div className="inc-overview inc-rv">
                    <div className="inc-ov-col">
                        <div className="inc-section-label">The Problem</div>
                        <h2 className="inc-section-title">Starting Point</h2>
                        <p className="inc-section-body">
                            A growing brand needs more than isolated design assets. Without a clear identity system, brand applications can feel inconsistent, less recognizable, and harder to scale across different touchpoints.
                        </p>
                        <p className="inc-section-body" style={{ marginTop: 12 }}>
                            For Incremental, the challenge was to create a cohesive branding system that feels clean, modern, and structured while still being flexible enough to work across both digital and physical applications. The identity needed to present the brand in a more organized and intentional way through consistent logo usage, typography, color, and visual direction.
                        </p>
                        <p className="inc-section-body" style={{ marginTop: 12 }}>
                            Because this was a collaboration project, another important part of the challenge was making sure the work stayed visually aligned and cohesive even with two designers contributing to the branding process.
                        </p>
                    </div>
                    <div className="inc-ov-col">
                        <div className="inc-section-label">The Solution</div>
                        <h2 className="inc-section-title">The Approach</h2>
                        <p className="inc-section-body">
                            The solution was to create a cohesive brand identity system for Incremental built across its core brand assets — logo usage, typography, color system, visual direction, merchandise, and social media application.
                        </p>
                        <ul className="inc-list" style={{ marginTop: 14 }}>
                            <li>Logo usage — defined for consistent and clear application</li>
                            <li>Color system — structured to support hierarchy and brand tone</li>
                            <li>Typography — clean and readable across all brand formats</li>
                            <li>Visual direction — a shared creative language for both designers</li>
                            <li>Merchandise — extending the identity into physical applications</li>
                            <li>Social media — adapting the system for digital content</li>
                        </ul>
                        <p className="inc-section-body" style={{ marginTop: 14 }}>
                            Rather than treating each asset separately, the system was designed to work as one connected identity — making the brand feel more complete, more professional, and more scalable across different touchpoints.
                        </p>
                    </div>
                </div>

                <hr className="inc-divider" />

                {/* LOGO USAGE — image left, text right */}
                <div className="inc-alt inc-rv">
                    <div className="inc-alt-img">
                        <img src="/incremental%20-%20logo%20usage.png" alt="Incremental — Logo Usage" />
                    </div>
                    <div className="inc-alt-content">
                        <div className="inc-tag">Brand Identity</div>
                        <h2 className="inc-alt-title">Logo Usage</h2>
                        <p className="inc-alt-body">
                            The logo usage section presents the Incremental mark in a clean and structured way. It shows how the logo can be applied consistently across different brand materials while maintaining clarity, balance, and recognizability.
                        </p>
                        <p className="inc-alt-body" style={{ marginTop: 12 }}>
                            Defining how the logo is used — including spacing, contrast, and placement — keeps the identity looking intentional across every application, from digital screens to physical brand materials.
                        </p>
                        <div className="inc-impact-row">
                            <div className="inc-impact-label">Result</div>
                            <ul className="inc-impact-list">
                                <li>Consistent and recognizable logo application across all brand materials</li>
                                <li>A clearly defined mark that holds up in any context or format</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="inc-divider" />

                {/* COLOR SYSTEM — text left, image right */}
                <div className="inc-alt inc-rv">
                    <div className="inc-alt-content">
                        <div className="inc-tag">Color System</div>
                        <h2 className="inc-alt-title">Color &amp; Palette</h2>
                        <p className="inc-alt-body">
                            The color system defines the palette that supports the Incremental identity. The selected colors work together to create hierarchy, contrast, tone, and visual consistency across different brand applications.
                        </p>
                        <p className="inc-alt-body" style={{ marginTop: 12 }}>
                            A focused, intentional palette prevents the brand from feeling inconsistent when applied across different materials. Each color has a defined role — so the identity reads as one cohesive system rather than a set of unrelated choices.
                        </p>
                        <div className="inc-impact-row">
                            <div className="inc-impact-label">Result</div>
                            <ul className="inc-impact-list">
                                <li>A palette that creates clear visual hierarchy across all brand touchpoints</li>
                                <li>Consistent mood and brand recognition from one application to the next</li>
                                <li>A focused system that stays coherent across digital and physical use</li>
                            </ul>
                        </div>
                    </div>
                    <div className="inc-alt-img">
                        <img src="/incremental%20-%20color%20system.png" alt="Incremental — Color System" />
                    </div>
                </div>

                <hr className="inc-divider" />

                {/* TYPOGRAPHY — image left, text right */}
                <div className="inc-alt inc-rv">
                    <div className="inc-alt-img">
                        <img src="/inremental%20-%20typography.png" alt="Incremental — Typography" />
                    </div>
                    <div className="inc-alt-content">
                        <div className="inc-tag">Typography</div>
                        <h2 className="inc-alt-title">Type System</h2>
                        <p className="inc-alt-body">
                            The typography system shows how type supports the overall identity of Incremental. It creates a clear structure for reading — separating headlines from supporting content and giving the brand a consistent and recognizable voice across different applications.
                        </p>
                        <p className="inc-alt-body" style={{ marginTop: 12 }}>
                            When type choices are inconsistent, the brand loses authority even when the layout is well-composed. A defined type system ensures Incremental communicates with the same clarity and confidence across every format.
                        </p>
                        <div className="inc-impact-row">
                            <div className="inc-impact-label">Result</div>
                            <ul className="inc-impact-list">
                                <li>Clear typographic hierarchy that supports readability and brand structure</li>
                                <li>A consistent and professional brand voice across all formats</li>
                                <li>Readable, clean layouts from brand presentations to digital content</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="inc-divider" />

                {/* VISUAL DIRECTION — text left, image right */}
                <div className="inc-alt inc-rv">
                    <div className="inc-alt-content">
                        <div className="inc-tag">Visual Direction</div>
                        <h2 className="inc-alt-title">Brand Direction</h2>
                        <p className="inc-alt-body">
                            The visual direction section presents the broader creative language of the brand. It defines the mood, composition, styling, and overall art direction that shapes how Incremental looks and feels across different brand contexts.
                        </p>
                        <p className="inc-alt-body" style={{ marginTop: 12 }}>
                            For a collaboration project, a shared visual direction is especially important — it keeps both designers working within the same creative framework so the final deliverables feel aligned and unified rather than separate.
                        </p>
                        <div className="inc-impact-row">
                            <div className="inc-impact-label">Result</div>
                            <ul className="inc-impact-list">
                                <li>A cohesive visual language that holds the identity together across all assets</li>
                                <li>A clear creative direction both designers could work within consistently</li>
                                <li>A brand look that feels intentional and polished across every touchpoint</li>
                            </ul>
                        </div>
                    </div>
                    <div className="inc-alt-img">
                        <img src="/incremental%20-%20visual%20direction.png" alt="Incremental — Visual Direction" />
                    </div>
                </div>

                <hr className="inc-divider" />

                {/* MERCH — image left, text right */}
                <div className="inc-alt inc-rv">
                    <div className="inc-alt-img">
                        <img src="/incremental%20-%20merch.png" alt="Incremental — Merch Collection" />
                    </div>
                    <div className="inc-alt-content">
                        <div className="inc-tag">Merchandise</div>
                        <h2 className="inc-alt-title">Merch Collection</h2>
                        <p className="inc-alt-body">
                            The merch collection shows how the Incremental identity extends into physical brand applications. It demonstrates that the system is flexible enough to move beyond screens while keeping the branding clean, recognizable, and visually consistent.
                        </p>
                        <p className="inc-alt-body" style={{ marginTop: 12 }}>
                            Physical applications are a strong measure of any identity system. A brand that translates well onto merchandise has a stronger and more versatile foundation than one built only for digital use.
                        </p>
                        <div className="inc-impact-row">
                            <div className="inc-impact-label">Result</div>
                            <ul className="inc-impact-list">
                                <li>Brand identity that remains clear and recognizable on physical surfaces</li>
                                <li>A system that extends naturally beyond digital into real-world applications</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="inc-divider" />

                {/* SOCIAL MEDIA — text left, image right */}
                <div className="inc-alt inc-rv">
                    <div className="inc-alt-content">
                        <div className="inc-tag">Social Media</div>
                        <h2 className="inc-alt-title">Social Media Mock-up</h2>
                        <p className="inc-alt-body">
                            The social media mock-up shows how the identity works in digital content. It demonstrates how the visual system translates into online brand communication — keeping Incremental consistent, polished, and easy to recognize across platforms.
                        </p>
                        <p className="inc-alt-body" style={{ marginTop: 12 }}>
                            Social media is where the identity gets tested at scale. Content posted regularly needs to look like it comes from the same brand every time — the mock-up confirms that the system holds up in that context.
                        </p>
                        <div className="inc-impact-row">
                            <div className="inc-impact-label">Result</div>
                            <ul className="inc-impact-list">
                                <li>A consistent and polished brand presence across digital platforms</li>
                                <li>Visual identity that remains recognizable in fast-moving social feeds</li>
                                <li>Digital-ready layouts that scale across content formats</li>
                            </ul>
                        </div>
                    </div>
                    <div className="inc-alt-img">
                        <img src="/incremental%20-%20social%20media.png" alt="Incremental — Social Media Mock-up" />
                    </div>
                </div>

            </div>

            {/* IMPACT FINAL */}
            <div className="inc-impact-final">
                <div className="inc-impact-final-inner inc-rv">
                    <div className="inc-section-label">Results</div>
                    <h2 className="inc-section-title">The Impact</h2>
                    <p className="inc-section-body" style={{ maxWidth: 680 }}>
                        Incremental was developed as a collaborative branding project between two designers, resulting in a cohesive identity system built across key brand assets. Through brand overview, logo usage, typography, color system, visual direction, merchandise, and social media application, the project presents a complete and consistent branding solution.
                    </p>
                    <p className="inc-section-body" style={{ maxWidth: 680, marginTop: 12 }}>
                        The final result is a structured and polished brand system that strengthens how Incremental is presented across different touchpoints — and reflects a collaborative process where shared direction produced a unified outcome rather than separate design pieces.
                    </p>
                    <div className="inc-impact-stats">
                        <div className="inc-stat">
                            <div className="inc-stat-num">6</div>
                            <div className="inc-stat-label">Brand touchpoints — logo, color, typography, direction, merch, and social</div>
                        </div>
                        <div className="inc-stat">
                            <div className="inc-stat-num">2</div>
                            <div className="inc-stat-label">Designers — one shared visual direction, one complete identity system</div>
                        </div>
                        <div className="inc-stat">
                            <div className="inc-stat-num">✦</div>
                            <div className="inc-stat-label">Cohesive identity that holds together across digital and physical applications</div>
                        </div>
                        <div className="inc-stat">
                            <div className="inc-stat-num">→</div>
                            <div className="inc-stat-label">A scalable visual foundation ready for future brand materials and platforms</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* NEXT PROJECT */}
            <div className="inc-next">
                <div className="inc-next-inner inc-rv">
                    <div className="inc-next-preview">
                        <img
                            src="/starseekr%20branding%20-%20thumbnail.png"
                            alt="Starseekr"
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.05)" }}
                        />
                        <div className="inc-next-preview-overlay">
                            <div className="inc-next-preview-cat">Brand Design</div>
                            <div className="inc-next-preview-name">Starseekr</div>
                        </div>
                    </div>
                    <div>
                        <div className="inc-next-tag">Next Project</div>
                        <div className="inc-next-title">Starseekr</div>
                        <p className="inc-next-desc">Collaborative brand identity project — a cohesive visual system built across logo, color, typography, merchandise, and social media by two designers.</p>
                        <div className="inc-next-actions">
                            <a className="inc-btn" href="/all-work/starseekr">View Project →</a>
                            <a className="inc-ghost-btn" href="/all-work">All Work</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="inc-foot">
                <div className="inc-foot-inner">
                    <a className="inc-flogo" href="/">JADEY<span>.</span></a>
                    <div className="inc-fcopy">© 2025 Jane Dhell Cagas. All rights reserved.</div>
                    <div className="inc-flinks">
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a href="/#contact">Contact</a>
                        <a className="inc-fall" href="/all-work">All Projects →</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
