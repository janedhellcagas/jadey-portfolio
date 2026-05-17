'use client'
import { useState, useEffect, useRef } from "react"

const CSS = `
:root{--bg:#0a0a08;--bg2:#111110;--paper:#f0ebe0;--pu:#9B59D0;--pu2:#B07AE0;--pu3:#7A3AB8;--muted:rgba(240,235,224,0.38);--border:rgba(240,235,224,0.12);--pborder:rgba(155,89,208,0.3);--pbg:rgba(155,89,208,0.08);--max:1440px;--pad:44px}
.mk*{box-sizing:border-box;margin:0;padding:0}
.mk{font-family:'Space Mono',monospace;background:var(--bg);color:var(--paper);min-height:100vh;overflow-x:hidden;width:100%}
/* NAV */
.mk-nav{position:fixed;top:0;left:0;right:0;z-index:500;background:rgba(10,10,8,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:top .3s}
.mk-nav-inner{max-width:var(--max);margin:0 auto;padding:18px var(--pad);display:flex;align-items:center;justify-content:space-between}
.mk-logo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.mk-logo span{color:var(--pu)}
.mk-nav-r{display:none;align-items:center;gap:14px}
.mk-nav-r a{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.mk-nav-r a:hover{color:var(--pu)}
.mk-nav-contact{background:var(--pu)!important;color:var(--bg)!important;padding:9px 20px!important;font-weight:700!important;border:2px solid var(--pu)!important;display:inline-block!important}
.mk-nav-contact:hover{background:var(--pu2)!important;border-color:var(--pu2)!important}
.mk-ndot{width:7px;height:7px;background:var(--pu);border-radius:50%;animation:mk-pulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes mk-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.85)}}
.mk-abar{position:fixed;top:0;left:0;right:0;z-index:499;background:var(--pu3);padding:9px var(--pad);height:38px;display:none;align-items:center;justify-content:center;gap:8px}
.mk-abar.show{display:flex}
.mk-abar span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:white;font-weight:700}
.mk-adot{width:5px;height:5px;background:white;border-radius:50%;animation:mk-pulse 2s ease-in-out infinite}
/* HERO */
.mk-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#2E1050,#6B3FA0)}
.mk-hero-inner{max-width:var(--max);margin:0 auto;padding:140px var(--pad) 60px;position:relative}
.mk-hero-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,9vw,140px);letter-spacing:-4px;color:rgba(240,235,224,0.035);white-space:nowrap;pointer-events:none;text-align:center;width:100%}
.mk-cat{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,0.6);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.mk-cat::before{content:'';width:36px;height:1px;background:rgba(255,255,255,0.4)}
.mk-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,9vw,120px);letter-spacing:-2px;line-height:.88;color:#fff;margin-bottom:32px}
.mk-meta-row{display:flex;gap:44px;flex-wrap:wrap;padding-top:28px;border-top:1px solid rgba(255,255,255,0.15)}
.mk-meta-l{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:4px}
.mk-meta-v{font-size:11px;color:#fff;font-weight:700}
/* BODY */
.mk-body{padding:0}
/* OVERVIEW */
.mk-overview{max-width:var(--max);margin:0 auto;padding:72px var(--pad);display:grid;grid-template-columns:1fr 1fr;gap:60px}
.mk-ov-col{}
.mk-section-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:10px}
.mk-section-label::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.mk-section-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(26px,4vw,46px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px}
.mk-section-body{font-size:12px;line-height:1.95;color:var(--muted)}
.mk-list{color:var(--muted);list-style:none;padding:0;margin:0;font-size:12px;line-height:1.95}
.mk-list li{padding-left:18px;position:relative;margin-bottom:4px}
.mk-list li::before{content:'•';position:absolute;left:0;color:var(--pu)}
/* DIVIDER */
.mk-divider{border:none;border-top:1px solid var(--border);max-width:var(--max);margin:0 auto}
/* ALT ROW */
.mk-alt{max-width:var(--max);margin:0 auto;padding:72px var(--pad);display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.mk-alt-img{overflow:hidden;border:1px solid var(--border);position:relative}
.mk-alt-img img{width:100%;height:auto;display:block}
.mk-alt-content{}
.mk-tag{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:8px}
.mk-tag::after{content:'';width:28px;height:1px;background:var(--pu)}
.mk-alt-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(24px,3.5vw,42px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px;line-height:1}
.mk-alt-body{font-size:12px;line-height:1.95;color:var(--muted)}
.mk-impact-row{margin-top:20px;padding-top:18px;border-top:1px solid var(--border)}
.mk-impact-label{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(240,235,224,0.4);margin-bottom:8px}
.mk-impact-list{list-style:none;padding:0;margin:0;font-size:11px;line-height:1.9;color:var(--muted)}
.mk-impact-list li{padding-left:16px;position:relative;margin-bottom:2px}
.mk-impact-list li::before{content:'→';position:absolute;left:0;color:var(--pu);font-size:9px;top:2px}
/* BARE IMAGE — no border/bg, full height */
.mk-alt-img--bare{border:none!important;overflow:visible;background:transparent}
.mk-alt-img--bare img{width:100%;height:auto;max-height:560px;object-fit:contain;object-position:center top;display:block}
/* BRAND SYSTEM GRID */
.mk-brand-grid{max-width:var(--max);margin:0 auto;padding:72px var(--pad)}
.mk-brand-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:32px}
.mk-brand-card{background:var(--bg2);border:1px solid var(--border);padding:28px 24px}
.mk-brand-card-icon{width:40px;height:40px;background:var(--pbg);border:1px solid var(--pborder);display:flex;align-items:center;justify-content:center;margin-bottom:14px;color:var(--pu)}
.mk-brand-card-title{font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:.5px;color:var(--paper);margin-bottom:8px}
.mk-brand-card-body{font-size:11px;line-height:1.85;color:var(--muted)}
/* COVER IMAGE */
.mk-cover{padding:52px var(--pad) 0}
.mk-cover-wrap{max-width:1425px;margin:0 auto;overflow:hidden}
.mk-cover-wrap img{width:100%;height:auto;display:block}
/* IMPACT FINAL */
.mk-impact-final{max-width:var(--max);margin:0 auto;padding:72px var(--pad);background:var(--bg2)}
.mk-impact-final-inner{max-width:var(--max);margin:0 auto}
.mk-impact-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:40px}
.mk-stat{border-left:2px solid var(--pu);padding-left:18px}
.mk-stat-num{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,48px);letter-spacing:-1px;color:var(--paper);line-height:1}
.mk-stat-label{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:4px;line-height:1.6}
/* NEXT PROJECT */
.mk-next{background:var(--bg2)}
.mk-next-inner{max-width:var(--max);margin:0 auto;padding:64px var(--pad);display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:center}
.mk-next-preview{position:relative;overflow:hidden;aspect-ratio:4/3;border:1px solid var(--border)}
.mk-next-preview-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px}
.mk-next-preview-cat{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:6px}
.mk-next-preview-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(16px,2.2vw,26px);letter-spacing:-.5px;color:#fff;line-height:1}
.mk-next-tag{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.mk-next-tag::after{content:'';width:36px;height:1px;background:var(--pu)}
.mk-next-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4.5vw,56px);letter-spacing:-1px;color:var(--paper);line-height:.92;margin-bottom:14px}
.mk-next-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:380px;margin-bottom:28px}
.mk-next-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.mk-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;background:var(--pu);color:var(--bg);border:2px solid var(--pu);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.mk-btn:hover{background:var(--pu2);border-color:var(--pu2)}
.mk-ghost-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.mk-ghost-btn:hover{border-color:var(--pu);color:var(--pu)}
/* FOOTER */
.mk-foot{border-top:1px solid var(--border)}
.mk-foot-inner{max-width:var(--max);margin:0 auto;padding:44px var(--pad);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.mk-flogo{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.mk-flogo span{color:var(--pu)}
.mk-fcopy{font-size:9px;color:var(--muted)}
.mk-flinks{display:flex;gap:18px;flex-wrap:wrap;align-items:center}
.mk-flinks a{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.mk-flinks a:hover{color:var(--pu)}
.mk-fall{color:var(--pu)!important}
/* REVEAL */
.mk-rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.mk-rv.in{opacity:1;transform:translateY(0)}
/* MOBILE DRAWER */
.mk-hamburger{display:flex;flex-direction:column;gap:5px;cursor:pointer;background:transparent;border:none;padding:6px}
.mk-hamburger span{display:block;width:24px;height:2px;background:var(--paper);transition:all .3s}
.mk-drawer{position:fixed;inset:0;z-index:600;background:var(--bg);transform:translateX(100%);transition:transform .35s ease;display:flex;flex-direction:column;padding:88px 28px 40px;overflow-y:auto}
.mk-drawer.open{transform:translateX(0)}
.mk-drawer-close{position:absolute;top:22px;right:24px;background:transparent;border:none;color:var(--paper);font-size:22px;cursor:pointer;line-height:1}
.mk-drawer a{font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;padding:18px 0;border-bottom:1px solid var(--border);transition:color .2s;display:block}
.mk-drawer a:hover,.mk-drawer a:active{color:var(--pu)}
.mk-drawer-cta{background:var(--pu);color:var(--bg)!important;padding:14px 0!important;font-weight:700;border-bottom:none!important;text-align:center;margin-top:20px;display:block;font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;transition:background .2s}
.mk-drawer-cta:hover{background:var(--pu2)}
/* ===== RESPONSIVE ===== */
@media(max-width:1023px){
  :root{--pad:32px}
  .mk-nav-inner{padding:14px 28px}
  .mk-overview{grid-template-columns:1fr;gap:40px}
  .mk-alt{grid-template-columns:1fr;gap:32px}
  .mk-brand-cards{grid-template-columns:repeat(2,1fr)}
  .mk-impact-stats{grid-template-columns:repeat(2,1fr)}
  .mk-next-inner{grid-template-columns:1fr;gap:32px}
}
@media(max-width:768px){
  :root{--pad:24px}
  .mk-hero-inner{padding:110px var(--pad) 44px}
  .mk-overview{padding:52px var(--pad)}
  .mk-alt{padding:52px var(--pad)}
  .mk-brand-grid{padding:52px var(--pad)}
  .mk-brand-cards{grid-template-columns:1fr}
  .mk-cover{padding:36px var(--pad) 0}
  .mk-impact-final{padding:52px var(--pad) 52px}
  .mk-impact-stats{grid-template-columns:repeat(2,1fr);gap:20px}
  .mk-next-inner{padding:44px var(--pad)}
  .mk-meta-row{gap:24px}
  .mk-foot-inner{flex-direction:column;align-items:flex-start;gap:20px;padding:32px var(--pad)}
  .mk-flinks{flex-direction:column;gap:10px;align-items:flex-start}
  .mk-next-actions{flex-direction:column;align-items:flex-start}
  .mk-btn,.mk-ghost-btn{width:100%;text-align:center;display:block}
}
@media(max-width:480px){
  :root{--pad:16px}
  .mk-abar{padding:9px 16px}
  .mk-abar span{font-size:7px}
  .mk-meta-row{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
  .mk-impact-stats{grid-template-columns:1fr;gap:14px}
}
@media(hover:none),(pointer:coarse){
  .mk-hamburger{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center}
  .mk-nav-r{display:none}
  .mk-btn,.mk-ghost-btn{min-height:44px;display:inline-flex;align-items:center;justify-content:center}
}
@media(min-width:1024px){
  .mk-hamburger{display:none}
  .mk-nav-r{display:flex}
}
@media(prefers-reduced-motion:reduce){
  .mk-rv{transition:none;opacity:1;transform:none}
  .mk-drawer{transition:none}
  .mk-ndot,.mk-adot{animation:none}
}
`

export default function MariamKhawarPage() {
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
        const els = Array.from(ref.current?.querySelectorAll(".mk-rv") || [])
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
        <div className="mk" ref={ref}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" />
            <style>{CSS}</style>

            {/* AVAILABLE BAR */}
            <div className={`mk-abar${navScroll ? " show" : ""}`}>
                <div className="mk-adot" />
                <span>Available for new projects</span>
            </div>

            {/* NAV */}
            <nav className="mk-nav" style={{ top: navScroll ? "38px" : "0" }}>
                <div className="mk-nav-inner">
                    <a className="mk-logo" href="/">JADEY<span>.</span></a>
                    <div className="mk-nav-r">
                        <div className="mk-ndot" />
                        <a href="/all-work">All Projects</a>
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a className="mk-nav-contact" href="/#contact">Contact Me</a>
                    </div>
                    <button ref={hamburgerRef} className="mk-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* MOBILE DRAWER */}
            <div ref={drawerRef} className={`mk-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-label="Navigation menu">
                <button className="mk-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <a href="/all-work" onClick={() => setMenuOpen(false)}>All Projects</a>
                <a href="/#about" onClick={() => setMenuOpen(false)}>About Me</a>
                <a href="/#work" onClick={() => setMenuOpen(false)}>Work Highlights</a>
                <a href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <a href="/#insights" onClick={() => setMenuOpen(false)}>Blog</a>
                <a href="/#workshops" onClick={() => setMenuOpen(false)}>Workshops</a>
                <a className="mk-drawer-cta" href="/#contact" onClick={() => setMenuOpen(false)}>Contact Me</a>
            </div>

            {/* HERO */}
            <div className="mk-hero">
                <div className="mk-hero-inner">
                    <div className="mk-hero-ghost">MARIAM KHAWAR</div>
                    <div className="mk-cat mk-rv">Brand Design</div>
                    <h1 className="mk-title mk-rv">Mariam Khawar</h1>
                    <div className="mk-meta-row mk-rv">
                        <div>
                            <div className="mk-meta-l">Client</div>
                            <div className="mk-meta-v">Mariam Khawar</div>
                        </div>
                        <div>
                            <div className="mk-meta-l">Services</div>
                            <div className="mk-meta-v">Personal Branding, Visual Design</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* COVER PHOTO */}
            <div className="mk-cover mk-rv">
                <div className="mk-cover-wrap">
                    <img
                        src="/Mariam%20Khawar%20Cover%20Photo.png"
                        alt="Mariam Khawar — Personal Brand Cover"
                    />
                </div>
            </div>

            {/* OVERVIEW — Problem + Goal */}
            <div className="mk-body">
                <div className="mk-overview mk-rv">
                    <div className="mk-ov-col">
                        <div className="mk-section-label">The Problem</div>
                        <h2 className="mk-section-title">The Challenge</h2>
                        <p className="mk-section-body">
                            Mariam Khawar creates educational and insight-driven content, but the presentation made it harder for users to quickly understand and retain the information.
                        </p>
                        <p className="mk-section-body" style={{ marginTop: 12 }}>
                            From the visuals:
                        </p>
                        <ul className="mk-list" style={{ marginTop: 8 }}>
                            <li>Multiple ideas were presented within a single layout without clear separation</li>
                            <li>Content felt dense due to limited spacing and grouping</li>
                            <li>Key points did not stand out immediately from supporting information</li>
                        </ul>
                        <p className="mk-section-body" style={{ marginTop: 12 }}>
                            Because of this:
                        </p>
                        <ul className="mk-list" style={{ marginTop: 8 }}>
                            <li>Users needed more effort to process the content</li>
                            <li>Important insights were easily missed</li>
                            <li>Content felt heavier than intended despite its value</li>
                        </ul>
                    </div>
                    <div className="mk-ov-col">
                        <div className="mk-section-label">The Goal</div>
                        <h2 className="mk-section-title">What We Set Out to Do</h2>
                        <p className="mk-section-body">
                            The goal was to simplify how information is delivered without removing depth.
                        </p>
                        <ul className="mk-list" style={{ marginTop: 14 }}>
                            <li>Make content easier to scan and understand</li>
                            <li>Introduce clear visual separation between ideas</li>
                            <li>Build a structured system for educational content</li>
                            <li>Maintain a clean and approachable visual identity</li>
                        </ul>
                    </div>
                </div>

                <hr className="mk-divider" />

                {/* VISUAL DIRECTION — text left, image right */}
                <div className="mk-alt mk-rv">
                    <div className="mk-alt-content">
                        <div className="mk-tag">Visual Direction</div>
                        <h2 className="mk-alt-title">Moodboard &amp; Direction</h2>
                        <p className="mk-alt-body">
                            The direction focused on clarity and readability.
                        </p>
                        <p className="mk-alt-body" style={{ marginTop: 12 }}>
                            Three design decisions shaped the approach:
                        </p>
                        <ul className="mk-list" style={{ marginTop: 10 }}>
                            <li>Minimal layouts → reduce visual noise and distractions</li>
                            <li>Controlled spacing → clearly separate sections of information</li>
                            <li>Balanced contrast → ensure readability without overwhelming the user</li>
                        </ul>
                        <p className="mk-alt-body" style={{ marginTop: 12 }}>
                            Why: Educational content requires clarity more than decoration.
                        </p>
                        <div className="mk-impact-row">
                            <div className="mk-impact-label">Impact</div>
                            <ul className="mk-impact-list">
                                <li>Users can process information faster</li>
                                <li>Content feels lighter and easier to read</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mk-alt-img">
                        <img
                            src="/Mariam%20Khawar%20-%20Mood%20boarding.png"
                            alt="Mariam Khawar — Moodboard"
                        />
                    </div>
                </div>

                <hr className="mk-divider" />

                {/* BRAND SYSTEM */}
                <div className="mk-brand-grid mk-rv">
                    <div className="mk-section-label">Brand System</div>
                    <h2 className="mk-section-title">Building the System</h2>
                    <p className="mk-section-body" style={{ maxWidth: 680 }}>
                        Every element is built to support clarity — making educational content easier to absorb, follow, and remember.
                    </p>
                    <div className="mk-brand-cards">
                        <div className="mk-brand-card">
                            <div className="mk-brand-card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="4 7 4 4 20 4 20 7"/>
                                    <line x1="9" y1="20" x2="15" y2="20"/>
                                    <line x1="12" y1="4" x2="12" y2="20"/>
                                </svg>
                            </div>
                            <div className="mk-brand-card-title">Typography</div>
                            <p className="mk-brand-card-body">
                                Header font: <strong>DM Serif Display</strong>. Supporting text: <strong>DM Sans</strong>. DM Serif Display creates strong visual emphasis in headlines. DM Sans keeps body text clean and readable. Educational content needs a clear distinction between key ideas and explanations — these two fonts create that balance.
                            </p>
                        </div>
                        <div className="mk-brand-card">
                            <div className="mk-brand-card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="8" cy="9" r="3"/>
                                    <circle cx="16" cy="9" r="3"/>
                                    <circle cx="12" cy="17" r="3"/>
                                </svg>
                            </div>
                            <div className="mk-brand-card-title">Color</div>
                            <p className="mk-brand-card-body">
                                Color is used to support readability and focus. A soft contrast palette reduces visual fatigue. Selective highlights draw attention to important information. Too much contrast or color can make educational content harder to process — this keeps it approachable.
                            </p>
                        </div>
                        <div className="mk-brand-card">
                            <div className="mk-brand-card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/>
                                    <line x1="12" y1="22" x2="12" y2="15.5"/>
                                    <polyline points="22 8.5 12 15.5 2 8.5"/>
                                </svg>
                            </div>
                            <div className="mk-brand-card-title">Elements</div>
                            <p className="mk-brand-card-body">
                                Section containers, consistent spacing, and structured layout blocks applied throughout. Grouping information improves clarity and reduces cognitive load — every element has a defined role in making the content easier to scan and understand.
                            </p>
                        </div>
                    </div>
                </div>

                <hr className="mk-divider" />

                {/* LINKEDIN — image left, text right */}
                <div className="mk-alt mk-rv">
                    <div className="mk-alt-img">
                        <img
                            src="/Mariam%20Khawar%20-%20Linkedin%20profile%20and%20cover%20mockup.png"
                            alt="Mariam Khawar — LinkedIn Profile and Cover Mockup"
                        />
                    </div>
                    <div className="mk-alt-content">
                        <div className="mk-tag">Core Application</div>
                        <h2 className="mk-alt-title">LinkedIn Profile &amp; Cover</h2>
                        <p className="mk-alt-body">
                            The profile serves as the primary introduction to the brand. Before a user reads any content, the profile sets the tone for everything that follows.
                        </p>
                        <p className="mk-alt-body" style={{ marginTop: 12 }}>
                            Design applied:
                        </p>
                        <ul className="mk-list" style={{ marginTop: 8 }}>
                            <li>Clear headline hierarchy</li>
                            <li>Balanced and structured layout</li>
                            <li>Consistent visual system</li>
                        </ul>
                        <div className="mk-impact-row">
                            <div className="mk-impact-label">Impact</div>
                            <ul className="mk-impact-list">
                                <li>Strong and immediate first impression</li>
                                <li>Clear communication of personal brand identity</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="mk-divider" />

                {/* CAROUSEL — text left, image right */}
                <div className="mk-alt mk-rv">
                    <div className="mk-alt-content">
                        <div className="mk-tag">Educational Content</div>
                        <h2 className="mk-alt-title">Carousel Design</h2>
                        <p className="mk-alt-body">
                            Educational content can feel overwhelming when presented all at once. The carousel breaks it into focused, digestible slides.
                        </p>
                        <p className="mk-alt-body" style={{ marginTop: 12 }}>
                            Design decision:
                        </p>
                        <ul className="mk-list" style={{ marginTop: 8 }}>
                            <li>Break content into multiple slides</li>
                            <li>Focus on one idea per frame</li>
                            <li>Maintain consistent layout structure throughout</li>
                        </ul>
                        <div className="mk-impact-row">
                            <div className="mk-impact-label">Impact</div>
                            <ul className="mk-impact-list">
                                <li>Easier to follow information slide by slide</li>
                                <li>Better engagement with educational content</li>
                                <li>Improved clarity per idea</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mk-alt-img">
                        <img
                            src="/Mariam%20Khawar%20-%20Carousel.png"
                            alt="Mariam Khawar — Carousel"
                        />
                    </div>
                </div>

                <hr className="mk-divider" />

                {/* INFOGRAPHICS — image left, text right */}
                <div className="mk-alt mk-rv">
                    <div className="mk-alt-img mk-alt-img--bare">
                        <img
                            src="/Mariam%20Khawar%20-%20Infographics.png"
                            alt="Mariam Khawar — Infographics"
                        />
                    </div>
                    <div className="mk-alt-content">
                        <div className="mk-tag">Infographics</div>
                        <h2 className="mk-alt-title">Structured for Retention</h2>
                        <p className="mk-alt-body">
                            Dense information is difficult to retain when it isn&apos;t organized. Infographics give information a clear visual structure that makes it easier to absorb and remember.
                        </p>
                        <p className="mk-alt-body" style={{ marginTop: 12 }}>
                            Design decision:
                        </p>
                        <ul className="mk-list" style={{ marginTop: 8 }}>
                            <li>Section-based layout to separate related ideas</li>
                            <li>Clear grouping of information</li>
                            <li>Strong visual hierarchy to guide reading order</li>
                        </ul>
                        <div className="mk-impact-row">
                            <div className="mk-impact-label">Impact</div>
                            <ul className="mk-impact-list">
                                <li>Faster understanding of the content</li>
                                <li>Improved retention of key information</li>
                                <li>More valuable content that users return to</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="mk-divider" />

                {/* BANNER — text left, image right */}
                <div className="mk-alt mk-rv">
                    <div className="mk-alt-content">
                        <div className="mk-tag">Brand Presence</div>
                        <h2 className="mk-alt-title">Banner System</h2>
                        <p className="mk-alt-body">
                            The banner is the visual environment that surrounds the content. Without a consistent system, it creates a disconnect between the profile and the posts.
                        </p>
                        <p className="mk-alt-body" style={{ marginTop: 12 }}>
                            The same design system applied here ensures brand identity is present at every touchpoint — not just within individual posts.
                        </p>
                        <div className="mk-impact-row">
                            <div className="mk-impact-label">Impact</div>
                            <ul className="mk-impact-list">
                                <li>Cleaner and more cohesive profile layout</li>
                                <li>Better overall viewing experience</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mk-alt-img mk-alt-img--bare">
                        <img
                            src="/Mariam%20Khawar%20-%20Banner.png"
                            alt="Mariam Khawar — Banner"
                        />
                    </div>
                </div>

            </div>

            {/* IMPACT FINAL */}
            <div className="mk-impact-final">
                <div className="mk-impact-final-inner mk-rv">
                    <div className="mk-section-label">Results</div>
                    <h2 className="mk-section-title">The Impact</h2>
                    <p className="mk-section-body" style={{ maxWidth: 680 }}>
                        The result is a structured and accessible personal brand system.
                    </p>
                    <p className="mk-section-body" style={{ maxWidth: 680, marginTop: 12 }}>
                        Not just visually simplified — but optimized for learning and retention.
                    </p>
                    <div className="mk-impact-stats">
                        <div className="mk-stat">
                            <div className="mk-stat-num">↑</div>
                            <div className="mk-stat-label">Content is easier to understand and process</div>
                        </div>
                        <div className="mk-stat">
                            <div className="mk-stat-num">1</div>
                            <div className="mk-stat-label">Unified system across carousel, infographic, banner, and profile</div>
                        </div>
                        <div className="mk-stat">
                            <div className="mk-stat-num">✦</div>
                            <div className="mk-stat-label">Information is presented more clearly across every format</div>
                        </div>
                        <div className="mk-stat">
                            <div className="mk-stat-num">→</div>
                            <div className="mk-stat-label">Users engage with content more effectively</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* NEXT PROJECT */}
            <div className="mk-next">
                <div className="mk-next-inner mk-rv">
                    <div className="mk-next-preview">
                        <img
                            src="/Parves%20Shahid%20Cover%20Photo.png"
                            alt="Parves Shahid"
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.05)" }}
                        />
                        <div className="mk-next-preview-overlay">
                            <div className="mk-next-preview-cat">Brand Design</div>
                            <div className="mk-next-preview-name">Parves Shahid</div>
                        </div>
                    </div>
                    <div>
                        <div className="mk-next-tag">Next Project</div>
                        <div className="mk-next-title">Parves Shahid</div>
                        <p className="mk-next-desc">Personal brand system for an AI creator — visual identity, carousel, infographic, and banner designed around consistency and recognition.</p>
                        <div className="mk-next-actions">
                            <a className="mk-btn" href="/all-work/parves-shahid">View Project →</a>
                            <a className="mk-ghost-btn" href="/all-work">All Work</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="mk-foot">
                <div className="mk-foot-inner">
                    <a className="mk-flogo" href="/">JADEY<span>.</span></a>
                    <div className="mk-fcopy">© 2025 Jane Dhell Cagas. All rights reserved.</div>
                    <div className="mk-flinks">
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a href="/#contact">Contact</a>
                        <a className="mk-fall" href="/all-work">All Projects →</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
