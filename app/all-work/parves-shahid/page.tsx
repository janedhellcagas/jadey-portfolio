'use client'
import { useState, useEffect, useRef } from "react"

const CSS = `
:root{--bg:#0a0a08;--bg2:#111110;--paper:#f0ebe0;--pu:#9B59D0;--pu2:#B07AE0;--pu3:#7A3AB8;--muted:rgba(240,235,224,0.38);--border:rgba(240,235,224,0.12);--pborder:rgba(155,89,208,0.3);--pbg:rgba(155,89,208,0.08);--max:1440px;--pad:44px}
.ps*{box-sizing:border-box;margin:0;padding:0}
.ps{font-family:'Space Mono',monospace;background:var(--bg);color:var(--paper);min-height:100vh;overflow-x:hidden;width:100%}
/* NAV */
.ps-nav{position:fixed;top:0;left:0;right:0;z-index:500;background:rgba(10,10,8,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:top .3s}
.ps-nav-inner{max-width:var(--max);margin:0 auto;padding:18px var(--pad);display:flex;align-items:center;justify-content:space-between}
.ps-logo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.ps-logo span{color:var(--pu)}
.ps-nav-r{display:none;align-items:center;gap:14px}
.ps-nav-r a{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.ps-nav-r a:hover{color:var(--pu)}
.ps-nav-contact{background:var(--pu)!important;color:var(--bg)!important;padding:9px 20px!important;font-weight:700!important;border:2px solid var(--pu)!important;display:inline-block!important}
.ps-nav-contact:hover{background:var(--pu2)!important;border-color:var(--pu2)!important}
.ps-ndot{width:7px;height:7px;background:var(--pu);border-radius:50%;animation:ps-pulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes ps-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.85)}}
.ps-abar{position:fixed;top:0;left:0;right:0;z-index:499;background:var(--pu3);padding:9px var(--pad);height:38px;display:none;align-items:center;justify-content:center;gap:8px}
.ps-abar.show{display:flex}
.ps-abar span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:white;font-weight:700}
.ps-adot{width:5px;height:5px;background:white;border-radius:50%;animation:ps-pulse 2s ease-in-out infinite}
/* HERO */
.ps-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#2E1050,#6B3FA0)}
.ps-hero-inner{max-width:var(--max);margin:0 auto;padding:140px var(--pad) 60px;position:relative}
.ps-hero-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,9vw,140px);letter-spacing:-4px;color:rgba(240,235,224,0.035);white-space:nowrap;pointer-events:none;text-align:center;width:100%}
.ps-cat{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,0.6);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.ps-cat::before{content:'';width:36px;height:1px;background:rgba(255,255,255,0.4)}
.ps-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,9vw,120px);letter-spacing:-2px;line-height:.88;color:#fff;margin-bottom:32px}
.ps-meta-row{display:flex;gap:44px;flex-wrap:wrap;padding-top:28px;border-top:1px solid rgba(255,255,255,0.15)}
.ps-meta-l{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:4px}
.ps-meta-v{font-size:11px;color:#fff;font-weight:700}
/* BODY WRAPPER */
.ps-body{padding:0}
/* OVERVIEW BLOCK */
.ps-overview{max-width:var(--max);margin:0 auto;padding:72px var(--pad);display:grid;grid-template-columns:1fr 1fr;gap:60px}
.ps-ov-col{}
.ps-section-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:10px}
.ps-section-label::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.ps-section-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(26px,4vw,46px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px}
.ps-section-body{font-size:12px;line-height:1.95;color:var(--muted)}
.ps-list{color:var(--muted);list-style:none;padding:0;margin:0;font-size:12px;line-height:1.95}
.ps-list li{padding-left:18px;position:relative;margin-bottom:4px}
.ps-list li::before{content:'•';position:absolute;left:0;color:var(--pu)}
/* DIVIDER */
.ps-divider{border:none;border-top:1px solid var(--border);max-width:var(--max);margin:0 auto}
/* ALT ROW — alternating image + text */
.ps-alt{max-width:var(--max);margin:0 auto;padding:72px var(--pad);display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.ps-alt.ps-alt-flip{direction:ltr}
.ps-alt-img{overflow:hidden;border:1px solid var(--border);position:relative}
.ps-alt-img img{width:100%;height:auto;display:block}
.ps-alt-content{}
.ps-tag{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:8px}
.ps-tag::after{content:'';width:28px;height:1px;background:var(--pu)}
.ps-alt-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(24px,3.5vw,42px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px;line-height:1}
.ps-alt-body{font-size:12px;line-height:1.95;color:var(--muted)}
.ps-impact-row{margin-top:20px;padding-top:18px;border-top:1px solid var(--border)}
.ps-impact-label{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(240,235,224,0.4);margin-bottom:8px}
.ps-impact-list{list-style:none;padding:0;margin:0;font-size:11px;line-height:1.9;color:var(--muted)}
.ps-impact-list li{padding-left:16px;position:relative;margin-bottom:2px}
.ps-impact-list li::before{content:'→';position:absolute;left:0;color:var(--pu);font-size:9px;top:2px}
/* HEIGHT-CLAMPED IMAGE — for tall images (banner, infographic) */
.ps-alt-img--clamp{max-height:500px}
.ps-alt-img--clamp img{width:100%;height:100%;max-height:500px;object-fit:contain;object-position:center top}
/* BRAND SYSTEM GRID */
.ps-brand-grid{max-width:var(--max);margin:0 auto;padding:72px var(--pad)}
.ps-brand-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:32px}
.ps-brand-card{background:var(--bg2);border:1px solid var(--border);padding:28px 24px}
.ps-brand-card-icon{width:40px;height:40px;background:var(--pbg);border:1px solid var(--pborder);display:flex;align-items:center;justify-content:center;margin-bottom:14px;color:var(--pu)}
.ps-brand-card-title{font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:.5px;color:var(--paper);margin-bottom:8px}
.ps-brand-card-body{font-size:11px;line-height:1.85;color:var(--muted)}
/* COVER IMAGE */
.ps-cover{padding:52px var(--pad) 0}
.ps-cover-wrap{max-width:1425px;margin:0 auto;overflow:hidden}
.ps-cover-wrap img{width:100%;height:auto;display:block}
/* IMPACT FINAL */
.ps-impact-final{max-width:var(--max);margin:0 auto;padding:72px var(--pad);background:var(--bg2)}
.ps-impact-final-inner{max-width:var(--max);margin:0 auto}
.ps-impact-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:40px}
.ps-stat{border-left:2px solid var(--pu);padding-left:18px}
.ps-stat-num{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,48px);letter-spacing:-1px;color:var(--paper);line-height:1}
.ps-stat-label{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:4px;line-height:1.6}
/* NEXT PROJECT */
.ps-next{background:var(--bg2)}
.ps-next-inner{max-width:var(--max);margin:0 auto;padding:64px var(--pad);display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:center}
.ps-next-preview{position:relative;overflow:hidden;aspect-ratio:4/3;border:1px solid var(--border)}
.ps-next-preview-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px}
.ps-next-preview-cat{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:6px}
.ps-next-preview-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(16px,2.2vw,26px);letter-spacing:-.5px;color:#fff;line-height:1}
.ps-next-tag{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.ps-next-tag::after{content:'';width:36px;height:1px;background:var(--pu)}
.ps-next-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4.5vw,56px);letter-spacing:-1px;color:var(--paper);line-height:.92;margin-bottom:14px}
.ps-next-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:380px;margin-bottom:28px}
.ps-next-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.ps-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;background:var(--pu);color:var(--bg);border:2px solid var(--pu);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.ps-btn:hover{background:var(--pu2);border-color:var(--pu2)}
.ps-ghost-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.ps-ghost-btn:hover{border-color:var(--pu);color:var(--pu)}
/* FOOTER */
.ps-foot{border-top:1px solid var(--border)}
.ps-foot-inner{max-width:var(--max);margin:0 auto;padding:44px var(--pad);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.ps-flogo{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.ps-flogo span{color:var(--pu)}
.ps-fcopy{font-size:9px;color:var(--muted)}
.ps-flinks{display:flex;gap:18px;flex-wrap:wrap;align-items:center}
.ps-flinks a{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.ps-flinks a:hover{color:var(--pu)}
.ps-fall{color:var(--pu)!important}
/* REVEAL */
.ps-rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.ps-rv.in{opacity:1;transform:translateY(0)}
/* MOBILE DRAWER */
.ps-hamburger{display:flex;flex-direction:column;gap:5px;cursor:pointer;background:transparent;border:none;padding:6px}
.ps-hamburger span{display:block;width:24px;height:2px;background:var(--paper);transition:all .3s}
.ps-drawer{position:fixed;inset:0;z-index:600;background:var(--bg);transform:translateX(100%);transition:transform .35s ease;display:flex;flex-direction:column;padding:88px 28px 40px;overflow-y:auto}
.ps-drawer.open{transform:translateX(0)}
.ps-drawer-close{position:absolute;top:22px;right:24px;background:transparent;border:none;color:var(--paper);font-size:22px;cursor:pointer;line-height:1}
.ps-drawer a{font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;padding:18px 0;border-bottom:1px solid var(--border);transition:color .2s;display:block}
.ps-drawer a:hover,.ps-drawer a:active{color:var(--pu)}
.ps-drawer-cta{background:var(--pu);color:var(--bg)!important;padding:14px 0!important;font-weight:700;border-bottom:none!important;text-align:center;margin-top:20px;display:block;font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;transition:background .2s}
.ps-drawer-cta:hover{background:var(--pu2)}
/* ===== RESPONSIVE ===== */
@media(max-width:1023px){
  :root{--pad:32px}
  .ps-nav-inner{padding:14px 28px}
  .ps-overview{grid-template-columns:1fr;gap:40px}
  .ps-alt{grid-template-columns:1fr;gap:32px}
  .ps-brand-cards{grid-template-columns:repeat(2,1fr)}
  .ps-impact-stats{grid-template-columns:repeat(2,1fr)}
  .ps-next-inner{grid-template-columns:1fr;gap:32px}
}
@media(max-width:768px){
  :root{--pad:24px}
  .ps-hero-inner{padding:110px var(--pad) 44px}
  .ps-overview{padding:52px var(--pad)}
  .ps-alt{padding:52px var(--pad)}
  .ps-brand-grid{padding:52px var(--pad)}
  .ps-brand-cards{grid-template-columns:1fr}
  .ps-cover{padding:36px var(--pad) 0}
  .ps-impact-final{padding:52px var(--pad) 52px}
  .ps-impact-stats{grid-template-columns:repeat(2,1fr);gap:20px}
  .ps-next-inner{padding:44px var(--pad)}
  .ps-meta-row{gap:24px}
  .ps-foot-inner{flex-direction:column;align-items:flex-start;gap:20px;padding:32px var(--pad)}
  .ps-flinks{flex-direction:column;gap:10px;align-items:flex-start}
  .ps-next-actions{flex-direction:column;align-items:flex-start}
  .ps-btn,.ps-ghost-btn{width:100%;text-align:center;display:block}
}
@media(max-width:480px){
  :root{--pad:16px}
  .ps-abar{padding:9px 16px}
  .ps-abar span{font-size:7px}
  .ps-meta-row{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
  .ps-impact-stats{grid-template-columns:1fr;gap:14px}
}
@media(hover:none),(pointer:coarse){
  .ps-hamburger{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center}
  .ps-nav-r{display:none}
  .ps-btn,.ps-ghost-btn{min-height:44px;display:inline-flex;align-items:center;justify-content:center}
}
@media(min-width:1024px){
  .ps-hamburger{display:none}
  .ps-nav-r{display:flex}
}
@media(prefers-reduced-motion:reduce){
  .ps-rv{transition:none;opacity:1;transform:none}
  .ps-drawer{transition:none}
  .ps-ndot,.ps-adot{animation:none}
}
`

export default function ParvesShahidPage() {
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
        const els = Array.from(ref.current?.querySelectorAll(".ps-rv") || [])
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
        <div className="ps" ref={ref}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" />
            <style>{CSS}</style>

            {/* AVAILABLE BAR */}
            <div className={`ps-abar${navScroll ? " show" : ""}`}>
                <div className="ps-adot" />
                <span>Available for new projects</span>
            </div>

            {/* NAV */}
            <nav className="ps-nav" style={{ top: navScroll ? "38px" : "0" }}>
                <div className="ps-nav-inner">
                    <a className="ps-logo" href="/">JADEY<span>.</span></a>
                    <div className="ps-nav-r">
                        <div className="ps-ndot" />
                        <a href="/all-work">All Projects</a>
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a className="ps-nav-contact" href="/#contact">Contact Me</a>
                    </div>
                    <button ref={hamburgerRef} className="ps-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* MOBILE DRAWER */}
            <div ref={drawerRef} className={`ps-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-label="Navigation menu">
                <button className="ps-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <a href="/all-work" onClick={() => setMenuOpen(false)}>All Projects</a>
                <a href="/#about" onClick={() => setMenuOpen(false)}>About Me</a>
                <a href="/#work" onClick={() => setMenuOpen(false)}>Work Highlights</a>
                <a href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <a href="/#insights" onClick={() => setMenuOpen(false)}>Blog</a>
                <a href="/#workshops" onClick={() => setMenuOpen(false)}>Workshops</a>
                <a className="ps-drawer-cta" href="/#contact" onClick={() => setMenuOpen(false)}>Contact Me</a>
            </div>

            {/* HERO */}
            <div className="ps-hero">
                <div className="ps-hero-inner">
                    <div className="ps-hero-ghost">PARVES SHAHID</div>
                    <div className="ps-cat ps-rv">Brand Design</div>
                    <h1 className="ps-title ps-rv">Parves Shahid</h1>
                    <div className="ps-meta-row ps-rv">
                        <div>
                            <div className="ps-meta-l">Client</div>
                            <div className="ps-meta-v">Parves Shahid</div>
                        </div>
                        <div>
                            <div className="ps-meta-l">Services</div>
                            <div className="ps-meta-v">Personal Branding, Visual Design</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* COVER PHOTO */}
            <div className="ps-cover ps-rv">
                <div className="ps-cover-wrap">
                    <img
                        src="/Parves%20Shahid%20Cover%20Photo.png"
                        alt="Parves Shahid — Personal Brand Cover"
                    />
                </div>
            </div>

            {/* OVERVIEW — Problem + Goal */}
            <div className="ps-body">
                <div className="ps-overview ps-rv">
                    <div className="ps-ov-col">
                        <div className="ps-section-label">The Problem</div>
                        <h2 className="ps-section-title">The Challenge</h2>
                        <p className="ps-section-body">
                            Parves Shahid is an AI creator who publishes educational content on a regular basis. The content itself was valuable — but the visuals told a different story. Posts were inconsistent in style, structure, and tone. Each piece felt disconnected from the last.
                        </p>
                        <p className="ps-section-body" style={{ marginTop: 12 }}>
                            Because of this:
                        </p>
                        <ul className="ps-list" style={{ marginTop: 8 }}>
                            <li>Users scrolled past without stopping</li>
                            <li>Information felt dense and hard to process</li>
                            <li>The creator had no recognizable visual identity</li>
                        </ul>
                    </div>
                    <div className="ps-ov-col">
                        <div className="ps-section-label">The Goal</div>
                        <h2 className="ps-section-title">What We Set Out to Do</h2>
                        <p className="ps-section-body">
                            Design a personal brand system that makes AI content easier to understand and gives the creator a consistent, recognizable presence across all formats.
                        </p>
                        <ul className="ps-list" style={{ marginTop: 14 }}>
                            <li>Make complex AI topics approachable through visual clarity</li>
                            <li>Build a consistent identity that works across every content format</li>
                            <li>Create reusable templates for carousels, infographics, and banners</li>
                            <li>Feel modern and relevant to AI without being generic</li>
                        </ul>
                    </div>
                </div>

                <hr className="ps-divider" />

                {/* SECTION 3 — VISUAL DIRECTION: text left, image right */}
                <div className="ps-alt ps-rv">
                    <div className="ps-alt-content">
                        <div className="ps-tag">Visual Direction</div>
                        <h2 className="ps-alt-title">Moodboard &amp; Direction</h2>
                        <p className="ps-alt-body">
                            Before touching any layout, I needed to establish the visual language. The moodboard set the tone for everything that followed.
                        </p>
                        <p className="ps-alt-body" style={{ marginTop: 12 }}>
                            Three core decisions shaped the direction:
                        </p>
                        <ul className="ps-list" style={{ marginTop: 10 }}>
                            <li>Dark background — removes visual noise and focuses attention on the content</li>
                            <li>Neon green accents — highlights key information and creates contrast without distraction</li>
                            <li>Abstract contour lines — represent AI systems, flows, and structured thinking</li>
                        </ul>
                        <div className="ps-impact-row">
                            <div className="ps-impact-label">Impact</div>
                            <ul className="ps-impact-list">
                                <li>Strong visual identity that immediately stands out in crowded feeds</li>
                                <li>A clear, reusable foundation for all content formats</li>
                            </ul>
                        </div>
                    </div>
                    <div className="ps-alt-img">
                        <img
                            src="/Parves%20Shahid%20-%20Moodboard.png"
                            alt="Parves Shahid — Moodboard"
                        />
                    </div>
                </div>

                <hr className="ps-divider" />

                {/* SECTION 4 — BRAND SYSTEM */}
                <div className="ps-brand-grid ps-rv">
                    <div className="ps-section-label">Brand System</div>
                    <h2 className="ps-section-title">Building the System</h2>
                    <p className="ps-section-body" style={{ maxWidth: 680 }}>
                        A brand system only works if every piece follows the same rules. I defined three core elements that make it possible to produce content quickly without losing consistency.
                    </p>
                    <div className="ps-brand-cards">
                        <div className="ps-brand-card">
                            <div className="ps-brand-card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="4 7 4 4 20 4 20 7"/>
                                    <line x1="9" y1="20" x2="15" y2="20"/>
                                    <line x1="12" y1="4" x2="12" y2="20"/>
                                </svg>
                            </div>
                            <div className="ps-brand-card-title">Typography</div>
                            <p className="ps-brand-card-body">
                                Header font: <strong>Antonio</strong>. Supporting text: <strong>Jura</strong>. Bold and readable — chosen for fast scanning. Headers carry the message at a glance while supporting text fills the detail without slowing the reader down.
                            </p>
                        </div>
                        <div className="ps-brand-card">
                            <div className="ps-brand-card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="8" cy="9" r="3"/>
                                    <circle cx="16" cy="9" r="3"/>
                                    <circle cx="12" cy="17" r="3"/>
                                </svg>
                            </div>
                            <div className="ps-brand-card-title">Color</div>
                            <p className="ps-brand-card-body">
                                A tightly limited palette — deep dark background, neon green accents, and white text. Fewer colors means faster recognition. Every piece immediately reads as &quot;Parves Shahid.&quot;
                            </p>
                        </div>
                        <div className="ps-brand-card">
                            <div className="ps-brand-card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/>
                                    <line x1="12" y1="22" x2="12" y2="15.5"/>
                                    <polyline points="22 8.5 12 15.5 2 8.5"/>
                                </svg>
                            </div>
                            <div className="ps-brand-card-title">Elements</div>
                            <p className="ps-brand-card-body">
                                Reusable visual patterns — contour lines, glow effects, and geometric shapes — defined once and applied consistently. No random design choices. Every element has a purpose and a place.
                            </p>
                        </div>
                    </div>
                </div>

                <hr className="ps-divider" />

                {/* SECTION 5 — LINKEDIN MOCKUP: image left, text right */}
                <div className="ps-alt ps-rv">
                    <div className="ps-alt-img">
                        <img
                            src="/Parves%20Shahid%20-%20Linkedin%20Profile%20and%20Cover%20Mock-up.png"
                            alt="Parves Shahid — LinkedIn Profile and Cover Mock-up"
                        />
                    </div>
                    <div className="ps-alt-content">
                        <div className="ps-tag">Core Application</div>
                        <h2 className="ps-alt-title">LinkedIn Profile &amp; Cover</h2>
                        <p className="ps-alt-body">
                            The LinkedIn profile is the first thing someone sees before deciding whether to follow or engage. It had to make a strong, immediate impression — one that communicates expertise and consistency at a glance.
                        </p>
                        <p className="ps-alt-body" style={{ marginTop: 12 }}>
                            The brand system was applied directly to the profile and cover banner, ensuring that the visual identity carries through from the very first touchpoint.
                        </p>
                        <div className="ps-impact-row">
                            <div className="ps-impact-label">Impact</div>
                            <ul className="ps-impact-list">
                                <li>Strong first impression that communicates credibility</li>
                                <li>Cohesive identity between profile visuals and published content</li>
                                <li>Immediately recognizable as an AI creator with a defined brand</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="ps-divider" />

                {/* SECTION 6 — CAROUSEL: text left, image right */}
                <div className="ps-alt ps-rv">
                    <div className="ps-alt-content">
                        <div className="ps-tag">Educational Content</div>
                        <h2 className="ps-alt-title">Carousel Design</h2>
                        <p className="ps-alt-body">
                            AI topics can feel overwhelming when presented as walls of text. The carousel format breaks content into digestible slides — but only if the structure is clear and the hierarchy is intentional.
                        </p>
                        <p className="ps-alt-body" style={{ marginTop: 12 }}>
                            Each slide was designed with a clear visual hierarchy: one main idea per slide, supported by brief text and guided by the brand&apos;s visual system. Layouts are consistent enough to feel familiar, but varied enough to stay engaging.
                        </p>
                        <div className="ps-impact-row">
                            <div className="ps-impact-label">Impact</div>
                            <ul className="ps-impact-list">
                                <li>Complex AI ideas become easier to follow slide by slide</li>
                                <li>Higher engagement — structured content invites interaction</li>
                                <li>More shareable because each slide works as a standalone visual</li>
                            </ul>
                        </div>
                    </div>
                    <div className="ps-alt-img">
                        <img
                            src="/Parves%20Shahid%20-%20Carousel.png"
                            alt="Parves Shahid — Carousel"
                        />
                    </div>
                </div>

                <hr className="ps-divider" />

                {/* SECTION 7 — INFOGRAPHICS: image left, text right */}
                <div className="ps-alt ps-rv">
                    <div className="ps-alt-img ps-alt-img--clamp">
                        <img
                            src="/Parves%20Shahid%20-%20Infographics.png"
                            alt="Parves Shahid — Infographics"
                        />
                    </div>
                    <div className="ps-alt-content">
                        <div className="ps-tag">Infographics / Cheatsheets</div>
                        <h2 className="ps-alt-title">Structured for Retention</h2>
                        <p className="ps-alt-body">
                            Users don&apos;t just want to consume AI content — they want to save it and come back to it. Infographics and cheatsheets serve that need, but only when the information is laid out clearly enough to be useful at a glance.
                        </p>
                        <p className="ps-alt-body" style={{ marginTop: 12 }}>
                            Each infographic was built with deliberate spacing, clear section breaks, and a visual hierarchy that guides the eye naturally from top to bottom. Nothing competes for attention — everything has its place.
                        </p>
                        <div className="ps-impact-row">
                            <div className="ps-impact-label">Impact</div>
                            <ul className="ps-impact-list">
                                <li>Faster understanding — key points surface immediately</li>
                                <li>Better retention — structured layout aids memory</li>
                                <li>High save rate — users keep well-designed cheatsheets</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="ps-divider" />

                {/* SECTION 8 — BANNER: text left, image right */}
                <div className="ps-alt ps-rv">
                    <div className="ps-alt-content">
                        <div className="ps-tag">Brand Presence</div>
                        <h2 className="ps-alt-title">Banner &amp; Visual Identity</h2>
                        <p className="ps-alt-body">
                            Many creators invest in content but neglect the surrounding visual environment. A profile banner without a clear brand system signals inconsistency before the audience even reads a single post.
                        </p>
                        <p className="ps-alt-body" style={{ marginTop: 12 }}>
                            The same design system applied to the banner creates a unified visual environment — one that reinforces the brand every time someone visits the profile, not just when they engage with a specific post.
                        </p>
                        <div className="ps-impact-row">
                            <div className="ps-impact-label">Impact</div>
                            <ul className="ps-impact-list">
                                <li>Instant brand recognition across the full profile</li>
                                <li>Professional appearance that builds trust before the content is even read</li>
                            </ul>
                        </div>
                    </div>
                    <div className="ps-alt-img ps-alt-img--clamp">
                        <img
                            src="/Parves%20Shahid%20-%20Banner.png"
                            alt="Parves Shahid — Banner"
                        />
                    </div>
                </div>

            </div>

            {/* IMPACT FINAL */}
            <div className="ps-impact-final">
                <div className="ps-impact-final-inner ps-rv">
                    <div className="ps-section-label">Results</div>
                    <h2 className="ps-section-title">The Impact</h2>
                    <p className="ps-section-body" style={{ maxWidth: 680 }}>
                        The result is a cohesive and scalable personal brand system — built to work across every format Parves Shahid publishes. The carousel breaks down AI topics into structured, shareable slides. The infographics give followers something worth saving. The banner and profile create a consistent first impression. And because everything follows the same visual rules, each piece reinforces the others.
                    </p>
                    <p className="ps-section-body" style={{ maxWidth: 680, marginTop: 12 }}>
                        Not just a set of nice-looking visuals — a system that can scale as the creator&apos;s content grows.
                    </p>
                    <div className="ps-impact-stats">
                        <div className="ps-stat">
                            <div className="ps-stat-num">5</div>
                            <div className="ps-stat-label">Content formats — carousel, infographic, banner, profile, and cover</div>
                        </div>
                        <div className="ps-stat">
                            <div className="ps-stat-num">1</div>
                            <div className="ps-stat-label">Unified visual system applied across every format without exception</div>
                        </div>
                        <div className="ps-stat">
                            <div className="ps-stat-num">↑</div>
                            <div className="ps-stat-label">Clearer AI content — easier to understand, retain, and share</div>
                        </div>
                        <div className="ps-stat">
                            <div className="ps-stat-num">✦</div>
                            <div className="ps-stat-label">Immediate brand recognition across every piece of content</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* NEXT PROJECT */}
            <div className="ps-next">
                <div className="ps-next-inner ps-rv">
                    <div className="ps-next-preview">
                        <img
                            src="/Advante%20Landing%20Page%20Banner%20Showcase%20-%20Main.png"
                            alt="Advante"
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.05)" }}
                        />
                        <div className="ps-next-preview-overlay">
                            <div className="ps-next-preview-cat">UI/UX Design</div>
                            <div className="ps-next-preview-name">Advante</div>
                        </div>
                    </div>
                    <div>
                        <div className="ps-next-tag">Next Project</div>
                        <div className="ps-next-title">Advante</div>
                        <p className="ps-next-desc">Executive coaching platform — orbital hero, trust-building layout, and seamless trial conversion.</p>
                        <div className="ps-next-actions">
                            <a className="ps-btn" href="/all-work/advante">View Project →</a>
                            <a className="ps-ghost-btn" href="/all-work">All Work</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="ps-foot">
                <div className="ps-foot-inner">
                    <a className="ps-flogo" href="/">JADEY<span>.</span></a>
                    <div className="ps-fcopy">© 2025 Jane Dhell Cagas. All rights reserved.</div>
                    <div className="ps-flinks">
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a href="/#contact">Contact</a>
                        <a className="ps-fall" href="/all-work">All Projects →</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
