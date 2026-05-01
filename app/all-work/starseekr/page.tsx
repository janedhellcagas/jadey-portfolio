'use client'
import { useState, useEffect, useRef } from "react"

const CSS = `
:root{--bg:#0a0a08;--bg2:#111110;--paper:#f0ebe0;--pu:#9B59D0;--pu2:#B07AE0;--pu3:#7A3AB8;--muted:rgba(240,235,224,0.38);--border:rgba(240,235,224,0.12);--pborder:rgba(155,89,208,0.3);--pbg:rgba(155,89,208,0.08);--max:1440px;--pad:44px}
.skr*{box-sizing:border-box;margin:0;padding:0}
.skr{font-family:'Space Mono',monospace;background:var(--bg);color:var(--paper);min-height:100vh;overflow-x:hidden;width:100%}
/* NAV */
.skr-nav{position:fixed;top:0;left:0;right:0;z-index:500;background:rgba(10,10,8,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:top .3s}
.skr-nav-inner{max-width:var(--max);margin:0 auto;padding:18px var(--pad);display:flex;align-items:center;justify-content:space-between}
.skr-logo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.skr-logo span{color:var(--pu)}
.skr-nav-r{display:none;align-items:center;gap:14px}
.skr-nav-r a{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.skr-nav-r a:hover{color:var(--pu)}
.skr-nav-contact{background:var(--pu)!important;color:var(--bg)!important;padding:9px 20px!important;font-weight:700!important;border:2px solid var(--pu)!important;display:inline-block!important}
.skr-nav-contact:hover{background:var(--pu2)!important;border-color:var(--pu2)!important}
.skr-ndot{width:7px;height:7px;background:var(--pu);border-radius:50%;animation:skr-pulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes skr-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.85)}}
.skr-abar{position:fixed;top:0;left:0;right:0;z-index:499;background:var(--pu3);padding:9px var(--pad);height:38px;display:none;align-items:center;justify-content:center;gap:8px}
.skr-abar.show{display:flex}
.skr-abar span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:white;font-weight:700}
.skr-adot{width:5px;height:5px;background:white;border-radius:50%;animation:skr-pulse 2s ease-in-out infinite}
/* HERO */
.skr-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#2E1050,#6B3FA0)}
.skr-hero-inner{max-width:var(--max);margin:0 auto;padding:140px var(--pad) 60px;position:relative}
.skr-hero-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,9vw,140px);letter-spacing:-4px;color:rgba(240,235,224,0.035);white-space:nowrap;pointer-events:none;text-align:center;width:100%}
.skr-cat{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,0.6);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.skr-cat::before{content:'';width:36px;height:1px;background:rgba(255,255,255,0.4)}
.skr-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,9vw,120px);letter-spacing:-2px;line-height:.88;color:#fff;margin-bottom:32px}
.skr-meta-row{display:flex;gap:44px;flex-wrap:wrap;padding-top:28px;border-top:1px solid rgba(255,255,255,0.15)}
.skr-meta-l{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:4px}
.skr-meta-v{font-size:11px;color:#fff;font-weight:700}
/* COLLAB BADGE */
.skr-collab{display:inline-flex;align-items:center;gap:8px;background:rgba(155,89,208,0.15);border:1px solid rgba(155,89,208,0.35);padding:7px 14px;margin-bottom:28px}
.skr-collab-dot{width:6px;height:6px;background:var(--pu2);border-radius:50%;flex-shrink:0}
.skr-collab-text{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--pu2)}
/* BODY */
.skr-body{padding:0}
/* COVER */
.skr-cover{padding:52px var(--pad) 0}
.skr-cover-wrap{max-width:1425px;margin:0 auto;overflow:hidden}
.skr-cover-wrap img{width:100%;height:auto;display:block}
/* OVERVIEW — 2-col */
.skr-overview{max-width:var(--max);margin:0 auto;padding:72px var(--pad);display:grid;grid-template-columns:1fr 1fr;gap:60px}
.skr-ov-col{}
.skr-section-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:10px}
.skr-section-label::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.skr-section-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(26px,4vw,46px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px}
.skr-section-body{font-size:12px;line-height:1.95;color:var(--muted)}
.skr-list{color:var(--muted);list-style:none;padding:0;margin:0;font-size:12px;line-height:1.95}
.skr-list li{padding-left:18px;position:relative;margin-bottom:4px}
.skr-list li::before{content:'•';position:absolute;left:0;color:var(--pu)}
/* DIVIDER */
.skr-divider{border:none;border-top:1px solid var(--border);max-width:var(--max);margin:0 auto}
/* ALT ROW */
.skr-alt{max-width:var(--max);margin:0 auto;padding:72px var(--pad);display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.skr-alt-img{overflow:hidden;border:1px solid var(--border);position:relative}
.skr-alt-img img{width:100%;height:auto;display:block}
.skr-alt-content{}
.skr-tag{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:8px}
.skr-tag::after{content:'';width:28px;height:1px;background:var(--pu)}
.skr-alt-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(24px,3.5vw,42px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px;line-height:1}
.skr-alt-body{font-size:12px;line-height:1.95;color:var(--muted)}
.skr-impact-row{margin-top:20px;padding-top:18px;border-top:1px solid var(--border)}
.skr-impact-label{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(240,235,224,0.4);margin-bottom:8px}
.skr-impact-list{list-style:none;padding:0;margin:0;font-size:11px;line-height:1.9;color:var(--muted)}
.skr-impact-list li{padding-left:16px;position:relative;margin-bottom:2px}
.skr-impact-list li::before{content:'→';position:absolute;left:0;color:var(--pu);font-size:9px;top:2px}
/* IMPACT FINAL */
.skr-impact-final{max-width:var(--max);margin:0 auto;padding:72px var(--pad);background:var(--bg2)}
.skr-impact-final-inner{max-width:var(--max);margin:0 auto}
.skr-impact-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:40px}
.skr-stat{border-left:2px solid var(--pu);padding-left:18px}
.skr-stat-num{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,48px);letter-spacing:-1px;color:var(--paper);line-height:1}
.skr-stat-label{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:4px;line-height:1.6}
/* NEXT PROJECT */
.skr-next{background:var(--bg2)}
.skr-next-inner{max-width:var(--max);margin:0 auto;padding:64px var(--pad);display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:center}
.skr-next-preview{position:relative;overflow:hidden;aspect-ratio:4/3;border:1px solid var(--border)}
.skr-next-preview-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px}
.skr-next-preview-cat{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:6px}
.skr-next-preview-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(16px,2.2vw,26px);letter-spacing:-.5px;color:#fff;line-height:1}
.skr-next-tag{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.skr-next-tag::after{content:'';width:36px;height:1px;background:var(--pu)}
.skr-next-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4.5vw,56px);letter-spacing:-1px;color:var(--paper);line-height:.92;margin-bottom:14px}
.skr-next-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:380px;margin-bottom:28px}
.skr-next-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.skr-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;background:var(--pu);color:var(--bg);border:2px solid var(--pu);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.skr-btn:hover{background:var(--pu2);border-color:var(--pu2)}
.skr-ghost-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.skr-ghost-btn:hover{border-color:var(--pu);color:var(--pu)}
/* FOOTER */
.skr-foot{border-top:1px solid var(--border)}
.skr-foot-inner{max-width:var(--max);margin:0 auto;padding:44px var(--pad);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.skr-flogo{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.skr-flogo span{color:var(--pu)}
.skr-fcopy{font-size:9px;color:var(--muted)}
.skr-flinks{display:flex;gap:18px;flex-wrap:wrap;align-items:center}
.skr-flinks a{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.skr-flinks a:hover{color:var(--pu)}
.skr-fall{color:var(--pu)!important}
/* REVEAL */
.skr-rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.skr-rv.in{opacity:1;transform:translateY(0)}
/* MOBILE DRAWER */
.skr-hamburger{display:flex;flex-direction:column;gap:5px;cursor:pointer;background:transparent;border:none;padding:6px}
.skr-hamburger span{display:block;width:24px;height:2px;background:var(--paper);transition:all .3s}
.skr-drawer{position:fixed;inset:0;z-index:600;background:var(--bg);transform:translateX(100%);transition:transform .35s ease;display:flex;flex-direction:column;padding:88px 28px 40px;overflow-y:auto}
.skr-drawer.open{transform:translateX(0)}
.skr-drawer-close{position:absolute;top:22px;right:24px;background:transparent;border:none;color:var(--paper);font-size:22px;cursor:pointer;line-height:1}
.skr-drawer a{font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;padding:18px 0;border-bottom:1px solid var(--border);transition:color .2s;display:block}
.skr-drawer a:hover,.skr-drawer a:active{color:var(--pu)}
.skr-drawer-cta{background:var(--pu);color:var(--bg)!important;padding:14px 0!important;font-weight:700;border-bottom:none!important;text-align:center;margin-top:20px;display:block;font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;transition:background .2s}
.skr-drawer-cta:hover{background:var(--pu2)}
/* ===== RESPONSIVE ===== */
@media(max-width:1023px){
  :root{--pad:32px}
  .skr-nav-inner{padding:14px 28px}
  .skr-overview{grid-template-columns:1fr;gap:40px}
  .skr-alt{grid-template-columns:1fr;gap:32px}
  .skr-impact-stats{grid-template-columns:repeat(2,1fr)}
  .skr-next-inner{grid-template-columns:1fr;gap:32px}
}
@media(max-width:768px){
  :root{--pad:24px}
  .skr-hero-inner{padding:110px var(--pad) 44px}
  .skr-overview{padding:52px var(--pad)}
  .skr-alt{padding:52px var(--pad)}
  .skr-cover{padding:36px var(--pad) 0}
  .skr-impact-final{padding:52px var(--pad) 52px}
  .skr-impact-stats{grid-template-columns:repeat(2,1fr);gap:20px}
  .skr-next-inner{padding:44px var(--pad)}
  .skr-meta-row{gap:24px}
  .skr-foot-inner{flex-direction:column;align-items:flex-start;gap:20px;padding:32px var(--pad)}
  .skr-flinks{flex-direction:column;gap:10px;align-items:flex-start}
  .skr-next-actions{flex-direction:column;align-items:flex-start}
  .skr-btn,.skr-ghost-btn{width:100%;text-align:center;display:block}
}
@media(max-width:480px){
  :root{--pad:16px}
  .skr-abar{padding:9px 16px}
  .skr-abar span{font-size:7px}
  .skr-meta-row{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
  .skr-impact-stats{grid-template-columns:1fr;gap:14px}
}
@media(hover:none),(pointer:coarse){
  .skr-hamburger{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center}
  .skr-nav-r{display:none}
  .skr-btn,.skr-ghost-btn{min-height:44px;display:inline-flex;align-items:center;justify-content:center}
}
@media(min-width:1024px){
  .skr-hamburger{display:none}
  .skr-nav-r{display:flex}
}
@media(prefers-reduced-motion:reduce){
  .skr-rv{transition:none;opacity:1;transform:none}
  .skr-drawer{transition:none}
  .skr-ndot,.skr-adot{animation:none}
}
`

export default function StarseekrPage() {
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
        const els = Array.from(ref.current?.querySelectorAll(".skr-rv") || [])
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
        <div className="skr" ref={ref}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" />
            <style>{CSS}</style>

            {/* AVAILABLE BAR */}
            <div className={`skr-abar${navScroll ? " show" : ""}`}>
                <div className="skr-adot" />
                <span>Available for new projects</span>
            </div>

            {/* NAV */}
            <nav className="skr-nav" style={{ top: navScroll ? "38px" : "0" }}>
                <div className="skr-nav-inner">
                    <a className="skr-logo" href="/">JADEY<span>.</span></a>
                    <div className="skr-nav-r">
                        <div className="skr-ndot" />
                        <a href="/all-work">All Projects</a>
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a className="skr-nav-contact" href="/#contact">Contact Me</a>
                    </div>
                    <button ref={hamburgerRef} className="skr-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* MOBILE DRAWER */}
            <div ref={drawerRef} className={`skr-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-label="Navigation menu">
                <button className="skr-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <a href="/all-work" onClick={() => setMenuOpen(false)}>All Projects</a>
                <a href="/#about" onClick={() => setMenuOpen(false)}>About Me</a>
                <a href="/#work" onClick={() => setMenuOpen(false)}>Work Highlights</a>
                <a href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <a href="/#insights" onClick={() => setMenuOpen(false)}>Blog</a>
                <a href="/#workshops" onClick={() => setMenuOpen(false)}>Workshops</a>
                <a className="skr-drawer-cta" href="/#contact" onClick={() => setMenuOpen(false)}>Contact Me</a>
            </div>

            {/* HERO */}
            <div className="skr-hero">
                <div className="skr-hero-inner">
                    <div className="skr-hero-ghost">STARSEEKR</div>
                    <div className="skr-cat skr-rv">Brand Identity Design</div>
                    <h1 className="skr-title skr-rv">Starseekr</h1>
                    <div className="skr-collab skr-rv">
                        <div className="skr-collab-dot" />
                        <span className="skr-collab-text">Collaboration — Designed by two creatives</span>
                    </div>
                    <p className="skr-rv" style={{ fontSize: 13, lineHeight: 1.85, color: "rgba(255,255,255,0.65)", maxWidth: 520, marginBottom: 32 }}>
                        A collaborative brand identity project designed to build a cohesive, recognizable, and visually consistent brand system across multiple applications.
                    </p>
                    <div className="skr-meta-row skr-rv">
                        <div>
                            <div className="skr-meta-l">Client</div>
                            <div className="skr-meta-v">Starseekr</div>
                        </div>
                        <div>
                            <div className="skr-meta-l">Service</div>
                            <div className="skr-meta-v">Brand Identity Design</div>
                        </div>
                        <div>
                            <div className="skr-meta-l">Project Type</div>
                            <div className="skr-meta-v">Collaboration Project</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* COVER */}
            <div className="skr-cover skr-rv">
                <div className="skr-cover-wrap">
                    <img src="/Starseekr%20-%20Cover.png" alt="Starseekr — Brand Identity Cover" />
                </div>
            </div>

            <div className="skr-body">

                {/* OVERVIEW — Problem + Solution */}
                <div className="skr-overview skr-rv">
                    <div className="skr-ov-col">
                        <div className="skr-section-label">The Problem</div>
                        <h2 className="skr-section-title">Starting Point</h2>
                        <p className="skr-section-body">
                            Starseekr needed a stronger and more cohesive identity system that could work consistently across different touchpoints. Without a clear structure for logo usage, typography, color, and brand direction, visual applications can easily feel disconnected or less recognizable.
                        </p>
                        <p className="skr-section-body" style={{ marginTop: 12 }}>
                            The challenge was to create a branding system that feels unified, polished, and intentional across both digital and physical applications — bringing consistency to the brand while keeping the visual language distinctive and well-organized.
                        </p>
                        <p className="skr-section-body" style={{ marginTop: 12 }}>
                            Because this was a collaboration between two designers, maintaining a shared visual direction throughout the process was just as important as the individual assets themselves.
                        </p>
                    </div>
                    <div className="skr-ov-col">
                        <div className="skr-section-label">The Solution</div>
                        <h2 className="skr-section-title">The Approach</h2>
                        <p className="skr-section-body">
                            The solution was to develop a cohesive identity system for Starseekr built across its core brand assets — logo usage, typography, color, visual direction, merchandise, and social media application.
                        </p>
                        <ul className="skr-list" style={{ marginTop: 14 }}>
                            <li>Logo usage — defined for clear and consistent application</li>
                            <li>Color — a focused palette that supports hierarchy and brand mood</li>
                            <li>Typography — structured to create a recognizable brand voice</li>
                            <li>Brand direction — a shared visual language across all assets</li>
                            <li>Merchandise — extending the identity into physical applications</li>
                            <li>Social media — adapting the system for digital content</li>
                        </ul>
                        <p className="skr-section-body" style={{ marginTop: 14 }}>
                            With both designers aligned on direction and application, every asset was built to feel like part of one complete identity rather than separate design pieces.
                        </p>
                    </div>
                </div>

                <hr className="skr-divider" />

                {/* LOGO USAGE — image left, text right */}
                <div className="skr-alt skr-rv">
                    <div className="skr-alt-img">
                        <img src="/starseekr%20-%20logo%20usage.png" alt="Starseekr — Logo Usage" />
                    </div>
                    <div className="skr-alt-content">
                        <div className="skr-tag">Brand Identity</div>
                        <h2 className="skr-alt-title">Logo Usage</h2>
                        <p className="skr-alt-body">
                            The logo usage section presents the Starseekr mark in a clean and structured way. It shows how the identity can be applied with clarity, consistency, and proper visual balance across different branding materials.
                        </p>
                        <p className="skr-alt-body" style={{ marginTop: 12 }}>
                            Defining how the logo is used — including spacing, contrast, and placement — keeps the brand looking intentional across every application, whether digital or print.
                        </p>
                        <div className="skr-impact-row">
                            <div className="skr-impact-label">Result</div>
                            <ul className="skr-impact-list">
                                <li>Consistent and recognizable logo application across all brand materials</li>
                                <li>A clearly defined mark that holds up in any context or size</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="skr-divider" />

                {/* COLOR — text left, image right */}
                <div className="skr-alt skr-rv">
                    <div className="skr-alt-content">
                        <div className="skr-tag">Color System</div>
                        <h2 className="skr-alt-title">Color Usage</h2>
                        <p className="skr-alt-body">
                            The color usage section defines the palette that supports the Starseekr identity. The selected colors work together to create hierarchy, contrast, mood, and visual consistency across different brand applications.
                        </p>
                        <p className="skr-alt-body" style={{ marginTop: 12 }}>
                            A focused, intentional palette prevents the brand from feeling inconsistent when applied across different materials. Each color has a defined role — so the identity reads as one cohesive system rather than a set of unrelated choices.
                        </p>
                        <div className="skr-impact-row">
                            <div className="skr-impact-label">Result</div>
                            <ul className="skr-impact-list">
                                <li>A palette that creates clear visual hierarchy across all brand touchpoints</li>
                                <li>Consistent mood and recognition from one application to the next</li>
                            </ul>
                        </div>
                    </div>
                    <div className="skr-alt-img">
                        <img src="/starseekr%20-%20color%20usage.png" alt="Starseekr — Color Usage" />
                    </div>
                </div>

                <hr className="skr-divider" />

                {/* TYPOGRAPHY — image left, text right */}
                <div className="skr-alt skr-rv">
                    <div className="skr-alt-img">
                        <img src="/starseekr%20-%20typography.png" alt="Starseekr — Typography" />
                    </div>
                    <div className="skr-alt-content">
                        <div className="skr-tag">Typography</div>
                        <h2 className="skr-alt-title">Type System</h2>
                        <p className="skr-alt-body">
                            The typography system shows how type supports the overall identity of Starseekr. It creates a clear structure for reading — separating headlines from supporting content and giving the brand a consistent and recognizable voice across different applications.
                        </p>
                        <p className="skr-alt-body" style={{ marginTop: 12 }}>
                            When type choices are inconsistent, the brand loses authority even when the layout is well-composed. A defined type system ensures the brand communicates with the same clarity and confidence across every format.
                        </p>
                        <div className="skr-impact-row">
                            <div className="skr-impact-label">Result</div>
                            <ul className="skr-impact-list">
                                <li>Clear typographic hierarchy that supports readability and brand structure</li>
                                <li>A consistent and recognizable brand voice across digital and print</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="skr-divider" />

                {/* VISUAL DIRECTION — text left, image right */}
                <div className="skr-alt skr-rv">
                    <div className="skr-alt-content">
                        <div className="skr-tag">Visual Direction</div>
                        <h2 className="skr-alt-title">Brand Direction</h2>
                        <p className="skr-alt-body">
                            The visual direction section presents the broader creative language of the brand. It defines the mood, composition, styling, and overall art direction that shapes how Starseekr looks and feels across different brand contexts.
                        </p>
                        <p className="skr-alt-body" style={{ marginTop: 12 }}>
                            For a collaboration project, a shared visual direction is especially important — it keeps both designers working within the same creative framework so the final deliverables feel aligned rather than disjointed.
                        </p>
                        <div className="skr-impact-row">
                            <div className="skr-impact-label">Result</div>
                            <ul className="skr-impact-list">
                                <li>A cohesive visual language that holds the identity together across all assets</li>
                                <li>A clear creative direction that both designers could work within consistently</li>
                            </ul>
                        </div>
                    </div>
                    <div className="skr-alt-img">
                        <img src="/starseekr%20-%20brand%20direction.png" alt="Starseekr — Brand Direction" />
                    </div>
                </div>

                <hr className="skr-divider" />

                {/* MERCH — image left, text right */}
                <div className="skr-alt skr-rv">
                    <div className="skr-alt-img">
                        <img src="/starseekr%20-%20merch.png" alt="Starseekr — Merch Collection" />
                    </div>
                    <div className="skr-alt-content">
                        <div className="skr-tag">Merchandise</div>
                        <h2 className="skr-alt-title">Merch Collection</h2>
                        <p className="skr-alt-body">
                            The merch collection shows how the Starseekr identity extends into physical brand applications. It demonstrates that the system is flexible enough to move beyond screens while keeping the branding clean, recognizable, and visually consistent.
                        </p>
                        <p className="skr-alt-body" style={{ marginTop: 12 }}>
                            Physical applications are a strong measure of any identity system. A brand that translates well onto merchandise has a stronger and more versatile foundation than one built only for digital use.
                        </p>
                        <div className="skr-impact-row">
                            <div className="skr-impact-label">Result</div>
                            <ul className="skr-impact-list">
                                <li>Brand identity that remains clear and recognizable on physical surfaces</li>
                                <li>A system that extends naturally beyond digital into real-world applications</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="skr-divider" />

                {/* SOCIAL MEDIA — text left, image right */}
                <div className="skr-alt skr-rv">
                    <div className="skr-alt-content">
                        <div className="skr-tag">Social Media</div>
                        <h2 className="skr-alt-title">Social Media Mock-up</h2>
                        <p className="skr-alt-body">
                            The social media mock-up shows how the Starseekr identity works in digital content. It demonstrates how the visual system translates into online brand communication — keeping the brand consistent, polished, and easy to recognize across platforms.
                        </p>
                        <p className="skr-alt-body" style={{ marginTop: 12 }}>
                            Social media is where the identity gets tested at scale. Content posted regularly needs to look like it comes from the same brand every time — the mock-up confirms that the system holds up in that context.
                        </p>
                        <div className="skr-impact-row">
                            <div className="skr-impact-label">Result</div>
                            <ul className="skr-impact-list">
                                <li>A consistent and polished brand presence across digital platforms</li>
                                <li>Visual identity that remains recognizable in fast-moving social feeds</li>
                            </ul>
                        </div>
                    </div>
                    <div className="skr-alt-img">
                        <img src="/starseekr%20-%20social%20media%20mock-up.png" alt="Starseekr — Social Media Mock-up" />
                    </div>
                </div>

            </div>

            {/* IMPACT FINAL */}
            <div className="skr-impact-final">
                <div className="skr-impact-final-inner skr-rv">
                    <div className="skr-section-label">Results</div>
                    <h2 className="skr-section-title">The Impact</h2>
                    <p className="skr-section-body" style={{ maxWidth: 680 }}>
                        Starseekr was developed as a collaborative branding project between two designers, resulting in a cohesive visual identity system built across key brand assets. Through logo usage, typography, color, visual direction, merchandise, and social media application, the project presents a complete and consistent branding solution.
                    </p>
                    <p className="skr-section-body" style={{ maxWidth: 680, marginTop: 12 }}>
                        The final result is a structured and polished identity system that strengthens how Starseekr is presented across different touchpoints — and reflects a collaborative process where shared direction produced a unified outcome rather than separate design pieces.
                    </p>
                    <div className="skr-impact-stats">
                        <div className="skr-stat">
                            <div className="skr-stat-num">6</div>
                            <div className="skr-stat-label">Brand touchpoints — logo, color, typography, direction, merch, and social</div>
                        </div>
                        <div className="skr-stat">
                            <div className="skr-stat-num">2</div>
                            <div className="skr-stat-label">Designers — one shared visual direction, one complete identity system</div>
                        </div>
                        <div className="skr-stat">
                            <div className="skr-stat-num">✦</div>
                            <div className="skr-stat-label">Cohesive identity that holds together across digital and physical applications</div>
                        </div>
                        <div className="skr-stat">
                            <div className="skr-stat-num">→</div>
                            <div className="skr-stat-label">A complete brand system ready for real-world application and future use</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* NEXT PROJECT */}
            <div className="skr-next">
                <div className="skr-next-inner skr-rv">
                    <div className="skr-next-preview">
                        <img
                            src="/BrandSonic%20-%20Cover.png"
                            alt="BrandSonic"
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.05)" }}
                        />
                        <div className="skr-next-preview-overlay">
                            <div className="skr-next-preview-cat">Brand Design</div>
                            <div className="skr-next-preview-name">BrandSonic</div>
                        </div>
                    </div>
                    <div>
                        <div className="skr-next-tag">Next Project</div>
                        <div className="skr-next-title">BrandSonic</div>
                        <p className="skr-next-desc">Brand identity system for a podcast and audio branding platform — dark foundation, blue accent, and a clean visual language built for premium recognition.</p>
                        <div className="skr-next-actions">
                            <a className="skr-btn" href="/all-work/brandsonic">View Project →</a>
                            <a className="skr-ghost-btn" href="/all-work">All Work</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="skr-foot">
                <div className="skr-foot-inner">
                    <a className="skr-flogo" href="/">JADEY<span>.</span></a>
                    <div className="skr-fcopy">© 2025 Jane Dhell Cagas. All rights reserved.</div>
                    <div className="skr-flinks">
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a href="/#contact">Contact</a>
                        <a className="skr-fall" href="/all-work">All Projects →</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
