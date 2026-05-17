'use client'
import { useState, useEffect, useRef } from "react"

const CSS = `
:root{--bg:#0a0a08;--bg2:#111110;--paper:#f0ebe0;--pu:#9B59D0;--pu2:#B07AE0;--pu3:#7A3AB8;--muted:rgba(240,235,224,0.38);--border:rgba(240,235,224,0.12);--pborder:rgba(155,89,208,0.3);--pbg:rgba(155,89,208,0.08);--max:1440px;--pad:44px}
.pm*{box-sizing:border-box;margin:0;padding:0}
.pm{font-family:'Space Mono',monospace;background:var(--bg);color:var(--paper);min-height:100vh;overflow-x:hidden;width:100%}
/* NAV */
.pm-nav{position:fixed;top:0;left:0;right:0;z-index:500;background:rgba(10,10,8,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:top .3s}
.pm-nav-inner{max-width:var(--max);margin:0 auto;padding:18px var(--pad);display:flex;align-items:center;justify-content:space-between}
.pm-logo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.pm-logo span{color:var(--pu)}
.pm-nav-r{display:none;align-items:center;gap:14px}
.pm-nav-r a{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.pm-nav-r a:hover{color:var(--pu)}
.pm-nav-contact{background:var(--pu)!important;color:var(--bg)!important;padding:9px 20px!important;font-weight:700!important;border:2px solid var(--pu)!important;display:inline-block!important}
.pm-nav-contact:hover{background:var(--pu2)!important;border-color:var(--pu2)!important}
.pm-ndot{width:7px;height:7px;background:var(--pu);border-radius:50%;animation:pm-pulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes pm-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.85)}}
.pm-abar{position:fixed;top:0;left:0;right:0;z-index:499;background:var(--pu3);padding:9px var(--pad);height:38px;display:none;align-items:center;justify-content:center;gap:8px}
.pm-abar.show{display:flex}
.pm-abar span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:white;font-weight:700}
.pm-adot{width:5px;height:5px;background:white;border-radius:50%;animation:pm-pulse 2s ease-in-out infinite}
/* HERO */
.pm-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#2E1050,#6B3FA0)}
.pm-hero-inner{max-width:var(--max);margin:0 auto;padding:140px var(--pad) 60px;position:relative}
.pm-hero-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,9vw,140px);letter-spacing:-4px;color:rgba(240,235,224,0.035);white-space:nowrap;pointer-events:none;text-align:center;width:100%}
.pm-cat{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,0.6);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.pm-cat::before{content:'';width:36px;height:1px;background:rgba(255,255,255,0.4)}
.pm-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,9vw,120px);letter-spacing:-2px;line-height:.88;color:#fff;margin-bottom:32px}
.pm-meta-row{display:flex;gap:44px;flex-wrap:wrap;padding-top:28px;border-top:1px solid rgba(255,255,255,0.15)}
.pm-meta-l{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:4px}
.pm-meta-v{font-size:11px;color:#fff;font-weight:700}
/* BODY */
.pm-body{padding:0}
/* OVERVIEW */
.pm-overview{max-width:var(--max);margin:0 auto;padding:72px var(--pad);display:grid;grid-template-columns:1fr 1fr;gap:60px}
.pm-ov-col{}
.pm-section-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:10px}
.pm-section-label::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.pm-section-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(26px,4vw,46px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px}
.pm-section-body{font-size:12px;line-height:1.95;color:var(--muted)}
.pm-list{color:var(--muted);list-style:none;padding:0;margin:0;font-size:12px;line-height:1.95}
.pm-list li{padding-left:18px;position:relative;margin-bottom:4px}
.pm-list li::before{content:'•';position:absolute;left:0;color:var(--pu)}
/* DIVIDER */
.pm-divider{border:none;border-top:1px solid var(--border);max-width:var(--max);margin:0 auto}
/* ALT ROW */
.pm-alt{max-width:var(--max);margin:0 auto;padding:72px var(--pad);display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.pm-alt-img{overflow:hidden;border:1px solid var(--border);position:relative}
.pm-alt-img img{width:100%;height:auto;display:block}
.pm-alt-content{}
.pm-tag{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:8px}
.pm-tag::after{content:'';width:28px;height:1px;background:var(--pu)}
.pm-alt-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(24px,3.5vw,42px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px;line-height:1}
.pm-alt-body{font-size:12px;line-height:1.95;color:var(--muted)}
.pm-impact-row{margin-top:20px;padding-top:18px;border-top:1px solid var(--border)}
.pm-impact-label{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(240,235,224,0.4);margin-bottom:8px}
.pm-impact-list{list-style:none;padding:0;margin:0;font-size:11px;line-height:1.9;color:var(--muted)}
.pm-impact-list li{padding-left:16px;position:relative;margin-bottom:2px}
.pm-impact-list li::before{content:'→';position:absolute;left:0;color:var(--pu);font-size:9px;top:2px}
/* BARE IMAGE — no border/bg, full height */
.pm-alt-img--bare{border:none!important;overflow:visible;background:transparent}
.pm-alt-img--bare img{width:100%;height:auto;max-height:560px;object-fit:contain;object-position:center top;display:block}
/* BRAND SYSTEM GRID */
.pm-brand-grid{max-width:var(--max);margin:0 auto;padding:72px var(--pad)}
.pm-brand-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:32px}
.pm-brand-card{background:var(--bg2);border:1px solid var(--border);padding:28px 24px}
.pm-brand-card-icon{width:40px;height:40px;background:var(--pbg);border:1px solid var(--pborder);display:flex;align-items:center;justify-content:center;margin-bottom:14px;color:var(--pu)}
.pm-brand-card-title{font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:.5px;color:var(--paper);margin-bottom:8px}
.pm-brand-card-body{font-size:11px;line-height:1.85;color:var(--muted)}
/* COVER IMAGE */
.pm-cover{padding:52px var(--pad) 0}
.pm-cover-wrap{max-width:1425px;margin:0 auto;overflow:hidden}
.pm-cover-wrap img{width:100%;height:auto;display:block}
/* IMPACT FINAL */
.pm-impact-final{max-width:var(--max);margin:0 auto;padding:72px var(--pad);background:var(--bg2)}
.pm-impact-final-inner{max-width:var(--max);margin:0 auto}
.pm-impact-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:40px}
.pm-stat{border-left:2px solid var(--pu);padding-left:18px}
.pm-stat-num{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,48px);letter-spacing:-1px;color:var(--paper);line-height:1}
.pm-stat-label{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:4px;line-height:1.6}
/* NEXT PROJECT */
.pm-next{background:var(--bg2)}
.pm-next-inner{max-width:var(--max);margin:0 auto;padding:64px var(--pad);display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:center}
.pm-next-preview{position:relative;overflow:hidden;aspect-ratio:4/3;border:1px solid var(--border)}
.pm-next-preview-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px}
.pm-next-preview-cat{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:6px}
.pm-next-preview-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(16px,2.2vw,26px);letter-spacing:-.5px;color:#fff;line-height:1}
.pm-next-tag{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.pm-next-tag::after{content:'';width:36px;height:1px;background:var(--pu)}
.pm-next-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4.5vw,56px);letter-spacing:-1px;color:var(--paper);line-height:.92;margin-bottom:14px}
.pm-next-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:380px;margin-bottom:28px}
.pm-next-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.pm-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;background:var(--pu);color:var(--bg);border:2px solid var(--pu);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.pm-btn:hover{background:var(--pu2);border-color:var(--pu2)}
.pm-ghost-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.pm-ghost-btn:hover{border-color:var(--pu);color:var(--pu)}
/* FOOTER */
.pm-foot{border-top:1px solid var(--border)}
.pm-foot-inner{max-width:var(--max);margin:0 auto;padding:44px var(--pad);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.pm-flogo{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.pm-flogo span{color:var(--pu)}
.pm-fcopy{font-size:9px;color:var(--muted)}
.pm-flinks{display:flex;gap:18px;flex-wrap:wrap;align-items:center}
.pm-flinks a{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.pm-flinks a:hover{color:var(--pu)}
.pm-fall{color:var(--pu)!important}
/* REVEAL */
.pm-rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.pm-rv.in{opacity:1;transform:translateY(0)}
/* MOBILE DRAWER */
.pm-hamburger{display:flex;flex-direction:column;gap:5px;cursor:pointer;background:transparent;border:none;padding:6px}
.pm-hamburger span{display:block;width:24px;height:2px;background:var(--paper);transition:all .3s}
.pm-drawer{position:fixed;inset:0;z-index:600;background:var(--bg);transform:translateX(100%);transition:transform .35s ease;display:flex;flex-direction:column;padding:88px 28px 40px;overflow-y:auto}
.pm-drawer.open{transform:translateX(0)}
.pm-drawer-close{position:absolute;top:22px;right:24px;background:transparent;border:none;color:var(--paper);font-size:22px;cursor:pointer;line-height:1}
.pm-drawer a{font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;padding:18px 0;border-bottom:1px solid var(--border);transition:color .2s;display:block}
.pm-drawer a:hover,.pm-drawer a:active{color:var(--pu)}
.pm-drawer-cta{background:var(--pu);color:var(--bg)!important;padding:14px 0!important;font-weight:700;border-bottom:none!important;text-align:center;margin-top:20px;display:block;font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;transition:background .2s}
.pm-drawer-cta:hover{background:var(--pu2)}
/* ===== RESPONSIVE ===== */
@media(max-width:1023px){
  :root{--pad:32px}
  .pm-nav-inner{padding:14px 28px}
  .pm-overview{grid-template-columns:1fr;gap:40px}
  .pm-alt{grid-template-columns:1fr;gap:32px}
  .pm-brand-cards{grid-template-columns:repeat(2,1fr)}
  .pm-impact-stats{grid-template-columns:repeat(2,1fr)}
  .pm-next-inner{grid-template-columns:1fr;gap:32px}
}
@media(max-width:768px){
  :root{--pad:24px}
  .pm-hero-inner{padding:110px var(--pad) 44px}
  .pm-overview{padding:52px var(--pad)}
  .pm-alt{padding:52px var(--pad)}
  .pm-brand-grid{padding:52px var(--pad)}
  .pm-brand-cards{grid-template-columns:1fr}
  .pm-cover{padding:36px var(--pad) 0}
  .pm-impact-final{padding:52px var(--pad) 52px}
  .pm-impact-stats{grid-template-columns:repeat(2,1fr);gap:20px}
  .pm-next-inner{padding:44px var(--pad)}
  .pm-meta-row{gap:24px}
  .pm-foot-inner{flex-direction:column;align-items:flex-start;gap:20px;padding:32px var(--pad)}
  .pm-flinks{flex-direction:column;gap:10px;align-items:flex-start}
  .pm-next-actions{flex-direction:column;align-items:flex-start}
  .pm-btn,.pm-ghost-btn{width:100%;text-align:center;display:block}
}
@media(max-width:480px){
  :root{--pad:16px}
  .pm-abar{padding:9px 16px}
  .pm-abar span{font-size:7px}
  .pm-meta-row{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
  .pm-impact-stats{grid-template-columns:1fr;gap:14px}
}
@media(hover:none),(pointer:coarse){
  .pm-hamburger{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center}
  .pm-nav-r{display:none}
  .pm-btn,.pm-ghost-btn{min-height:44px;display:inline-flex;align-items:center;justify-content:center}
}
@media(min-width:1024px){
  .pm-hamburger{display:none}
  .pm-nav-r{display:flex}
}
@media(prefers-reduced-motion:reduce){
  .pm-rv{transition:none;opacity:1;transform:none}
  .pm-drawer{transition:none}
  .pm-ndot,.pm-adot{animation:none}
}
`

export default function ParinMehtaPage() {
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
        const els = Array.from(ref.current?.querySelectorAll(".pm-rv") || [])
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
        <div className="pm" ref={ref}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" />
            <style>{CSS}</style>

            {/* AVAILABLE BAR */}
            <div className={`pm-abar${navScroll ? " show" : ""}`}>
                <div className="pm-adot" />
                <span>Available for new projects</span>
            </div>

            {/* NAV */}
            <nav className="pm-nav" style={{ top: navScroll ? "38px" : "0" }}>
                <div className="pm-nav-inner">
                    <a className="pm-logo" href="/">JADEY<span>.</span></a>
                    <div className="pm-nav-r">
                        <div className="pm-ndot" />
                        <a href="/all-work">All Projects</a>
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a className="pm-nav-contact" href="/#contact">Contact Me</a>
                    </div>
                    <button ref={hamburgerRef} className="pm-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* MOBILE DRAWER */}
            <div ref={drawerRef} className={`pm-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-label="Navigation menu">
                <button className="pm-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <a href="/all-work" onClick={() => setMenuOpen(false)}>All Projects</a>
                <a href="/#about" onClick={() => setMenuOpen(false)}>About Me</a>
                <a href="/#work" onClick={() => setMenuOpen(false)}>Work Highlights</a>
                <a href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <a href="/#insights" onClick={() => setMenuOpen(false)}>Blog</a>
                <a href="/#workshops" onClick={() => setMenuOpen(false)}>Workshops</a>
                <a className="pm-drawer-cta" href="/#contact" onClick={() => setMenuOpen(false)}>Contact Me</a>
            </div>

            {/* HERO */}
            <div className="pm-hero">
                <div className="pm-hero-inner">
                    <div className="pm-hero-ghost">PARIN MEHTA</div>
                    <div className="pm-cat pm-rv">Brand Design</div>
                    <h1 className="pm-title pm-rv">Parin Mehta</h1>
                    <div className="pm-meta-row pm-rv">
                        <div>
                            <div className="pm-meta-l">Client</div>
                            <div className="pm-meta-v">Parin Mehta</div>
                        </div>
                        <div>
                            <div className="pm-meta-l">Services</div>
                            <div className="pm-meta-v">Personal Branding, Visual Design</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* COVER PHOTO */}
            <div className="pm-cover pm-rv">
                <div className="pm-cover-wrap">
                    <img
                        src="/PARIN%20MEHTA%20Cover%20Photo.png"
                        alt="Parin Mehta — Personal Brand Cover"
                    />
                </div>
            </div>

            {/* OVERVIEW — Problem + Goal */}
            <div className="pm-body">
                <div className="pm-overview pm-rv">
                    <div className="pm-ov-col">
                        <div className="pm-section-label">The Problem</div>
                        <h2 className="pm-section-title">The Challenge</h2>
                        <p className="pm-section-body">
                            Parin Mehta shares structured and insight-driven content, but the visual presentation didn&apos;t fully support how the information is meant to be understood.
                        </p>
                        <p className="pm-section-body" style={{ marginTop: 12 }}>
                            From the visuals:
                        </p>
                        <ul className="pm-list" style={{ marginTop: 8 }}>
                            <li>Content appeared dense due to lack of clear separation</li>
                            <li>Multiple ideas were presented without strong visual hierarchy</li>
                            <li>Layouts did not clearly guide the reader from one point to the next</li>
                        </ul>
                        <p className="pm-section-body" style={{ marginTop: 12 }}>
                            Because of this:
                        </p>
                        <ul className="pm-list" style={{ marginTop: 8 }}>
                            <li>Users needed more effort to follow the flow of ideas</li>
                            <li>Important insights were not immediately visible</li>
                            <li>The structured thinking behind the content was not reflected visually</li>
                        </ul>
                    </div>
                    <div className="pm-ov-col">
                        <div className="pm-section-label">The Goal</div>
                        <h2 className="pm-section-title">What We Set Out to Do</h2>
                        <p className="pm-section-body">
                            The goal was to translate structured thinking into structured visuals.
                        </p>
                        <ul className="pm-list" style={{ marginTop: 14 }}>
                            <li>Make content easier to scan and follow</li>
                            <li>Introduce a clear hierarchy between ideas</li>
                            <li>Build a system that reflects logical thinking</li>
                            <li>Maintain consistency across all formats</li>
                        </ul>
                    </div>
                </div>

                <hr className="pm-divider" />

                {/* VISUAL DIRECTION — text left, image right */}
                <div className="pm-alt pm-rv">
                    <div className="pm-alt-content">
                        <div className="pm-tag">Visual Direction</div>
                        <h2 className="pm-alt-title">Moodboard &amp; Direction</h2>
                        <p className="pm-alt-body">
                            The direction focused on clarity, structure, and readability.
                        </p>
                        <p className="pm-alt-body" style={{ marginTop: 12 }}>
                            Three design decisions shaped the approach:
                        </p>
                        <ul className="pm-list" style={{ marginTop: 10 }}>
                            <li>Grid-based layouts → organize content into logical sections</li>
                            <li>Controlled color usage → avoid overwhelming the viewer</li>
                            <li>Clear spacing → separate ideas and reduce visual clutter</li>
                        </ul>
                        <p className="pm-alt-body" style={{ marginTop: 12 }}>
                            Why: Parin&apos;s content is analytical — the design must support logical flow.
                        </p>
                        <div className="pm-impact-row">
                            <div className="pm-impact-label">Impact</div>
                            <ul className="pm-impact-list">
                                <li>Users can follow content more easily</li>
                                <li>Information becomes clearer and more digestible</li>
                            </ul>
                        </div>
                    </div>
                    <div className="pm-alt-img">
                        <img
                            src="/Parin%20Mehta%20-%20Moodboarding.png"
                            alt="Parin Mehta — Moodboard"
                        />
                    </div>
                </div>

                <hr className="pm-divider" />

                {/* BRAND SYSTEM */}
                <div className="pm-brand-grid pm-rv">
                    <div className="pm-section-label">Brand System</div>
                    <h2 className="pm-section-title">Building the System</h2>
                    <p className="pm-section-body" style={{ maxWidth: 680 }}>
                        Every element in the system is designed to reinforce structure — making content easier to read, follow, and remember.
                    </p>
                    <div className="pm-brand-cards">
                        <div className="pm-brand-card">
                            <div className="pm-brand-card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="4 7 4 4 20 4 20 7"/>
                                    <line x1="9" y1="20" x2="15" y2="20"/>
                                    <line x1="12" y1="4" x2="12" y2="20"/>
                                </svg>
                            </div>
                            <div className="pm-brand-card-title">Typography</div>
                            <p className="pm-brand-card-body">
                                Header font: <strong>Merriweather</strong>. Supporting text: <strong>Sen</strong>. Merriweather brings depth and credibility to headlines. Sen keeps body text readable and modern. Structured content needs clear hierarchy — without it, all text competes equally.
                            </p>
                        </div>
                        <div className="pm-brand-card">
                            <div className="pm-brand-card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="8" cy="9" r="3"/>
                                    <circle cx="16" cy="9" r="3"/>
                                    <circle cx="12" cy="17" r="3"/>
                                </svg>
                            </div>
                            <div className="pm-brand-card-title">Color</div>
                            <p className="pm-brand-card-body">
                                Color is used to support structure, not decorate it. A limited palette reduces distraction. Accent color highlights key information selectively. Too many colors can disrupt logical flow — this keeps focus on the ideas.
                            </p>
                        </div>
                        <div className="pm-brand-card">
                            <div className="pm-brand-card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/>
                                    <line x1="12" y1="22" x2="12" y2="15.5"/>
                                    <polyline points="22 8.5 12 15.5 2 8.5"/>
                                </svg>
                            </div>
                            <div className="pm-brand-card-title">Elements</div>
                            <p className="pm-brand-card-body">
                                Grid alignment, section containers, and consistent spacing applied throughout. Without structure, complex ideas feel overwhelming — these elements make every layout predictable and intuitive to follow.
                            </p>
                        </div>
                    </div>
                </div>

                <hr className="pm-divider" />

                {/* LINKEDIN — image left, text right */}
                <div className="pm-alt pm-rv">
                    <div className="pm-alt-img">
                        <img
                            src="/Parin%20Mehta%20-%20Linkedin%20profile%20and%20cover%20mockup.png"
                            alt="Parin Mehta — LinkedIn Profile and Cover Mockup"
                        />
                    </div>
                    <div className="pm-alt-content">
                        <div className="pm-tag">Core Application</div>
                        <h2 className="pm-alt-title">LinkedIn Profile &amp; Cover</h2>
                        <p className="pm-alt-body">
                            The profile is where users first interact with the brand. It sets the expectation before a single post is read.
                        </p>
                        <p className="pm-alt-body" style={{ marginTop: 12 }}>
                            Design applied:
                        </p>
                        <ul className="pm-list" style={{ marginTop: 8 }}>
                            <li>Clear hierarchy between name, title, and supporting detail</li>
                            <li>Structured and clean layout</li>
                            <li>Consistent visual system from cover to content</li>
                        </ul>
                        <div className="pm-impact-row">
                            <div className="pm-impact-label">Impact</div>
                            <ul className="pm-impact-list">
                                <li>Immediate understanding of the brand at a glance</li>
                                <li>Strong and professional first impression</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="pm-divider" />

                {/* CAROUSEL — text left, image right */}
                <div className="pm-alt pm-rv">
                    <div className="pm-alt-content">
                        <div className="pm-tag">Educational Content</div>
                        <h2 className="pm-alt-title">Carousel Design</h2>
                        <p className="pm-alt-body">
                            Complex ideas are difficult to understand in a single frame. The carousel breaks content into step-by-step slides that guide the reader through the thinking.
                        </p>
                        <p className="pm-alt-body" style={{ marginTop: 12 }}>
                            Design decision:
                        </p>
                        <ul className="pm-list" style={{ marginTop: 8 }}>
                            <li>Break content into step-by-step slides</li>
                            <li>Use strong headline hierarchy per slide</li>
                            <li>Maintain consistent layout throughout</li>
                        </ul>
                        <div className="pm-impact-row">
                            <div className="pm-impact-label">Impact</div>
                            <ul className="pm-impact-list">
                                <li>Easier to follow ideas from slide to slide</li>
                                <li>Better engagement with structured content</li>
                                <li>Improved clarity per idea</li>
                            </ul>
                        </div>
                    </div>
                    <div className="pm-alt-img">
                        <img
                            src="/PARIN%20MEHTA%20-%20Carousel.png"
                            alt="Parin Mehta — Carousel"
                        />
                    </div>
                </div>

                <hr className="pm-divider" />

                {/* INFOGRAPHICS — image left, text right */}
                <div className="pm-alt pm-rv">
                    <div className="pm-alt-img pm-alt-img--bare">
                        <img
                            src="/PARIN%20MEHTA%20-%20Infographics.png"
                            alt="Parin Mehta — Infographics"
                        />
                    </div>
                    <div className="pm-alt-content">
                        <div className="pm-tag">Infographics</div>
                        <h2 className="pm-alt-title">Structured for Retention</h2>
                        <p className="pm-alt-body">
                            Dense information is hard to retain when it isn&apos;t organized. Infographics solve this by giving information a clear visual structure.
                        </p>
                        <p className="pm-alt-body" style={{ marginTop: 12 }}>
                            Design decision:
                        </p>
                        <ul className="pm-list" style={{ marginTop: 8 }}>
                            <li>Section-based layout to group related ideas</li>
                            <li>Clear grouping of information</li>
                            <li>Visual hierarchy to guide reading order</li>
                        </ul>
                        <div className="pm-impact-row">
                            <div className="pm-impact-label">Impact</div>
                            <ul className="pm-impact-list">
                                <li>Faster understanding of complex topics</li>
                                <li>Better retention of key information</li>
                                <li>Higher value content that users save and revisit</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="pm-divider" />

                {/* BANNER — text left, image right */}
                <div className="pm-alt pm-rv">
                    <div className="pm-alt-content">
                        <div className="pm-tag">Brand Presence</div>
                        <h2 className="pm-alt-title">Banner System</h2>
                        <p className="pm-alt-body">
                            The banner is the visual frame that surrounds all content. Without a consistent system, it creates a disconnect between the profile and the posts.
                        </p>
                        <p className="pm-alt-body" style={{ marginTop: 12 }}>
                            The same design system applied here ensures the brand identity is present at every touchpoint — not just in the content itself.
                        </p>
                        <div className="pm-impact-row">
                            <div className="pm-impact-label">Impact</div>
                            <ul className="pm-impact-list">
                                <li>Cleaner and more cohesive profile layout</li>
                                <li>Better browsing experience across contexts</li>
                            </ul>
                        </div>
                    </div>
                    <div className="pm-alt-img pm-alt-img--bare">
                        <img
                            src="/PARIN%20MEHTA%20-%20Banner.png"
                            alt="Parin Mehta — Banner"
                        />
                    </div>
                </div>

            </div>

            {/* IMPACT FINAL */}
            <div className="pm-impact-final">
                <div className="pm-impact-final-inner pm-rv">
                    <div className="pm-section-label">Results</div>
                    <h2 className="pm-section-title">The Impact</h2>
                    <p className="pm-section-body" style={{ maxWidth: 680 }}>
                        The result is a cohesive and structured personal brand system.
                    </p>
                    <p className="pm-section-body" style={{ maxWidth: 680, marginTop: 12 }}>
                        Not just visually improved — but aligned with how the content is meant to be processed.
                    </p>
                    <div className="pm-impact-stats">
                        <div className="pm-stat">
                            <div className="pm-stat-num">↑</div>
                            <div className="pm-stat-label">Content is easier to understand and follow</div>
                        </div>
                        <div className="pm-stat">
                            <div className="pm-stat-num">1</div>
                            <div className="pm-stat-label">Unified system across all formats — carousel, infographic, banner, and profile</div>
                        </div>
                        <div className="pm-stat">
                            <div className="pm-stat-num">✦</div>
                            <div className="pm-stat-label">Visual hierarchy now reflects the logical thinking behind the content</div>
                        </div>
                        <div className="pm-stat">
                            <div className="pm-stat-num">→</div>
                            <div className="pm-stat-label">Users engage more effectively — less effort to process each post</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* NEXT PROJECT */}
            <div className="pm-next">
                <div className="pm-next-inner pm-rv">
                    <div className="pm-next-preview">
                        <img
                            src="/Parves%20Shahid%20Cover%20Photo.png"
                            alt="Parves Shahid"
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.05)" }}
                        />
                        <div className="pm-next-preview-overlay">
                            <div className="pm-next-preview-cat">Brand Design</div>
                            <div className="pm-next-preview-name">Parves Shahid</div>
                        </div>
                    </div>
                    <div>
                        <div className="pm-next-tag">Next Project</div>
                        <div className="pm-next-title">Parves Shahid</div>
                        <p className="pm-next-desc">Personal brand system for an AI creator — visual identity, carousel, infographic, and banner designed around consistency and recognition.</p>
                        <div className="pm-next-actions">
                            <a className="pm-btn" href="/all-work/parves-shahid">View Project →</a>
                            <a className="pm-ghost-btn" href="/all-work">All Work</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="pm-foot">
                <div className="pm-foot-inner">
                    <a className="pm-flogo" href="/">JADEY<span>.</span></a>
                    <div className="pm-fcopy">© 2025 Jane Dhell Cagas. All rights reserved.</div>
                    <div className="pm-flinks">
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a href="/#contact">Contact</a>
                        <a className="pm-fall" href="/all-work">All Projects →</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
