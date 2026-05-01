'use client'
import { useState, useEffect, useRef } from "react"

const CSS = `
:root{--bg:#0a0a08;--bg2:#111110;--paper:#f0ebe0;--pu:#9B59D0;--pu2:#B07AE0;--pu3:#7A3AB8;--muted:rgba(240,235,224,0.38);--border:rgba(240,235,224,0.12);--pborder:rgba(155,89,208,0.3);--pbg:rgba(155,89,208,0.08);--max:1440px;--pad:44px}
.gs*{box-sizing:border-box;margin:0;padding:0}
.gs{font-family:'Space Mono',monospace;background:var(--bg);color:var(--paper);min-height:100vh;overflow-x:hidden;width:100%}
/* NAV */
.gs-nav{position:fixed;top:0;left:0;right:0;z-index:500;background:rgba(10,10,8,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:top .3s}
.gs-nav-inner{max-width:var(--max);margin:0 auto;padding:18px var(--pad);display:flex;align-items:center;justify-content:space-between}
.gs-logo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.gs-logo span{color:var(--pu)}
.gs-nav-r{display:none;align-items:center;gap:14px}
.gs-nav-r a{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.gs-nav-r a:hover{color:var(--pu)}
.gs-nav-contact{background:var(--pu)!important;color:var(--bg)!important;padding:9px 20px!important;font-weight:700!important;border:2px solid var(--pu)!important;display:inline-block!important}
.gs-nav-contact:hover{background:var(--pu2)!important;border-color:var(--pu2)!important}
.gs-ndot{width:7px;height:7px;background:var(--pu);border-radius:50%;animation:gs-pulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes gs-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.85)}}
.gs-abar{position:fixed;top:0;left:0;right:0;z-index:499;background:var(--pu3);padding:9px var(--pad);height:38px;display:none;align-items:center;justify-content:center;gap:8px}
.gs-abar.show{display:flex}
.gs-abar span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:white;font-weight:700}
.gs-adot{width:5px;height:5px;background:white;border-radius:50%;animation:gs-pulse 2s ease-in-out infinite}
/* HERO */
.gs-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#2E1050,#6B3FA0)}
.gs-hero-inner{max-width:var(--max);margin:0 auto;padding:140px var(--pad) 60px;position:relative}
.gs-hero-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,9vw,140px);letter-spacing:-4px;color:rgba(240,235,224,0.035);white-space:nowrap;pointer-events:none;text-align:center;width:100%}
.gs-cat{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,0.6);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.gs-cat::before{content:'';width:36px;height:1px;background:rgba(255,255,255,0.4)}
.gs-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,9vw,120px);letter-spacing:-2px;line-height:.88;color:#fff;margin-bottom:32px}
.gs-meta-row{display:flex;gap:44px;flex-wrap:wrap;padding-top:28px;border-top:1px solid rgba(255,255,255,0.15)}
.gs-meta-l{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:4px}
.gs-meta-v{font-size:11px;color:#fff;font-weight:700}
/* BODY */
.gs-body{padding:0}
/* OVERVIEW */
.gs-overview{max-width:var(--max);margin:0 auto;padding:72px var(--pad);display:grid;grid-template-columns:1fr 1fr;gap:60px}
.gs-ov-col{}
.gs-section-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:10px}
.gs-section-label::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.gs-section-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(26px,4vw,46px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px}
.gs-section-body{font-size:12px;line-height:1.95;color:var(--muted)}
.gs-list{color:var(--muted);list-style:none;padding:0;margin:0;font-size:12px;line-height:1.95}
.gs-list li{padding-left:18px;position:relative;margin-bottom:4px}
.gs-list li::before{content:'•';position:absolute;left:0;color:var(--pu)}
/* DIVIDER */
.gs-divider{border:none;border-top:1px solid var(--border);max-width:var(--max);margin:0 auto}
/* ALT ROW */
.gs-alt{max-width:var(--max);margin:0 auto;padding:72px var(--pad);display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.gs-alt-img{overflow:hidden;border:1px solid var(--border);position:relative}
.gs-alt-img img{width:100%;height:auto;display:block}
.gs-alt-content{}
.gs-tag{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:8px}
.gs-tag::after{content:'';width:28px;height:1px;background:var(--pu)}
.gs-alt-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(24px,3.5vw,42px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px;line-height:1}
.gs-alt-body{font-size:12px;line-height:1.95;color:var(--muted)}
.gs-impact-row{margin-top:20px;padding-top:18px;border-top:1px solid var(--border)}
.gs-impact-label{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(240,235,224,0.4);margin-bottom:8px}
.gs-impact-list{list-style:none;padding:0;margin:0;font-size:11px;line-height:1.9;color:var(--muted)}
.gs-impact-list li{padding-left:16px;position:relative;margin-bottom:2px}
.gs-impact-list li::before{content:'→';position:absolute;left:0;color:var(--pu);font-size:9px;top:2px}
/* BARE IMAGE — no border/bg, image only */
.gs-alt-img--bare{border:none!important;overflow:visible;background:transparent}
.gs-alt-img--bare img{width:100%;height:auto;max-height:560px;object-fit:contain;object-position:center top;display:block}
/* BRAND SYSTEM GRID */
.gs-brand-grid{max-width:var(--max);margin:0 auto;padding:72px var(--pad)}
.gs-brand-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:32px}
.gs-brand-card{background:var(--bg2);border:1px solid var(--border);padding:28px 24px}
.gs-brand-card-icon{width:40px;height:40px;background:var(--pbg);border:1px solid var(--pborder);display:flex;align-items:center;justify-content:center;margin-bottom:14px;color:var(--pu)}
.gs-brand-card-title{font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:.5px;color:var(--paper);margin-bottom:8px}
.gs-brand-card-body{font-size:11px;line-height:1.85;color:var(--muted)}
/* COVER IMAGE */
.gs-cover{padding:52px var(--pad) 0}
.gs-cover-wrap{max-width:1425px;margin:0 auto;overflow:hidden}
.gs-cover-wrap img{width:100%;height:auto;display:block}
/* BANNER GRID — 3 banners, no container */
.gs-banner-section{max-width:var(--max);margin:0 auto;padding:72px var(--pad)}
.gs-banner-intro{margin-bottom:40px}
.gs-banner-list{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:32px;align-items:start}
.gs-banner-item{overflow:visible;border:none;background:transparent}
.gs-banner-item img{width:100%;height:auto;display:block}
/* IMPACT FINAL */
.gs-impact-final{max-width:var(--max);margin:0 auto;padding:72px var(--pad);background:var(--bg2)}
.gs-impact-final-inner{max-width:var(--max);margin:0 auto}
.gs-impact-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:40px}
.gs-stat{border-left:2px solid var(--pu);padding-left:18px}
.gs-stat-num{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,48px);letter-spacing:-1px;color:var(--paper);line-height:1}
.gs-stat-label{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:4px;line-height:1.6}
/* NEXT PROJECT */
.gs-next{background:var(--bg2)}
.gs-next-inner{max-width:var(--max);margin:0 auto;padding:64px var(--pad);display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:center}
.gs-next-preview{position:relative;overflow:hidden;aspect-ratio:4/3;border:1px solid var(--border)}
.gs-next-preview-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px}
.gs-next-preview-cat{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:6px}
.gs-next-preview-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(16px,2.2vw,26px);letter-spacing:-.5px;color:#fff;line-height:1}
.gs-next-tag{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.gs-next-tag::after{content:'';width:36px;height:1px;background:var(--pu)}
.gs-next-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4.5vw,56px);letter-spacing:-1px;color:var(--paper);line-height:.92;margin-bottom:14px}
.gs-next-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:380px;margin-bottom:28px}
.gs-next-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.gs-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;background:var(--pu);color:var(--bg);border:2px solid var(--pu);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.gs-btn:hover{background:var(--pu2);border-color:var(--pu2)}
.gs-ghost-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.gs-ghost-btn:hover{border-color:var(--pu);color:var(--pu)}
/* FOOTER */
.gs-foot{border-top:1px solid var(--border)}
.gs-foot-inner{max-width:var(--max);margin:0 auto;padding:44px var(--pad);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.gs-flogo{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.gs-flogo span{color:var(--pu)}
.gs-fcopy{font-size:9px;color:var(--muted)}
.gs-flinks{display:flex;gap:18px;flex-wrap:wrap;align-items:center}
.gs-flinks a{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.gs-flinks a:hover{color:var(--pu)}
.gs-fall{color:var(--pu)!important}
/* REVEAL */
.gs-rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.gs-rv.in{opacity:1;transform:translateY(0)}
/* MOBILE DRAWER */
.gs-hamburger{display:flex;flex-direction:column;gap:5px;cursor:pointer;background:transparent;border:none;padding:6px}
.gs-hamburger span{display:block;width:24px;height:2px;background:var(--paper);transition:all .3s}
.gs-drawer{position:fixed;inset:0;z-index:600;background:var(--bg);transform:translateX(100%);transition:transform .35s ease;display:flex;flex-direction:column;padding:88px 28px 40px;overflow-y:auto}
.gs-drawer.open{transform:translateX(0)}
.gs-drawer-close{position:absolute;top:22px;right:24px;background:transparent;border:none;color:var(--paper);font-size:22px;cursor:pointer;line-height:1}
.gs-drawer a{font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;padding:18px 0;border-bottom:1px solid var(--border);transition:color .2s;display:block}
.gs-drawer a:hover,.gs-drawer a:active{color:var(--pu)}
.gs-drawer-cta{background:var(--pu);color:var(--bg)!important;padding:14px 0!important;font-weight:700;border-bottom:none!important;text-align:center;margin-top:20px;display:block;font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;transition:background .2s}
.gs-drawer-cta:hover{background:var(--pu2)}
/* ===== RESPONSIVE ===== */
@media(max-width:1023px){
  :root{--pad:32px}
  .gs-nav-inner{padding:14px 28px}
  .gs-overview{grid-template-columns:1fr;gap:40px}
  .gs-alt{grid-template-columns:1fr;gap:32px}
  .gs-brand-cards{grid-template-columns:repeat(2,1fr)}
  .gs-impact-stats{grid-template-columns:repeat(2,1fr)}
  .gs-next-inner{grid-template-columns:1fr;gap:32px}
}
@media(max-width:768px){
  :root{--pad:24px}
  .gs-hero-inner{padding:110px var(--pad) 44px}
  .gs-overview{padding:52px var(--pad)}
  .gs-alt{padding:52px var(--pad)}
  .gs-brand-grid{padding:52px var(--pad)}
  .gs-brand-cards{grid-template-columns:1fr}
  .gs-cover{padding:36px var(--pad) 0}
  .gs-impact-final{padding:52px var(--pad) 52px}
  .gs-impact-stats{grid-template-columns:repeat(2,1fr);gap:20px}
  .gs-next-inner{padding:44px var(--pad)}
  .gs-meta-row{gap:24px}
  .gs-foot-inner{flex-direction:column;align-items:flex-start;gap:20px;padding:32px var(--pad)}
  .gs-flinks{flex-direction:column;gap:10px;align-items:flex-start}
  .gs-next-actions{flex-direction:column;align-items:flex-start}
  .gs-btn,.gs-ghost-btn{width:100%;text-align:center;display:block}
  .gs-banner-section{padding:52px var(--pad)}
  .gs-banner-list{grid-template-columns:repeat(2,1fr)}
  .gs-banner-list .gs-banner-item:last-child{grid-column:1/-1}
}
@media(max-width:480px){
  :root{--pad:16px}
  .gs-abar{padding:9px 16px}
  .gs-abar span{font-size:7px}
  .gs-meta-row{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
  .gs-impact-stats{grid-template-columns:1fr;gap:14px}
  .gs-banner-list{grid-template-columns:1fr}
  .gs-banner-list .gs-banner-item:last-child{grid-column:auto}
}
@media(hover:none),(pointer:coarse){
  .gs-hamburger{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center}
  .gs-nav-r{display:none}
  .gs-btn,.gs-ghost-btn{min-height:44px;display:inline-flex;align-items:center;justify-content:center}
}
@media(min-width:1024px){
  .gs-hamburger{display:none}
  .gs-nav-r{display:flex}
}
@media(prefers-reduced-motion:reduce){
  .gs-rv{transition:none;opacity:1;transform:none}
  .gs-drawer{transition:none}
  .gs-ndot,.gs-adot{animation:none}
}
`

export default function GauravSinghPage() {
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
        const els = Array.from(ref.current?.querySelectorAll(".gs-rv") || [])
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
        <div className="gs" ref={ref}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" />
            <style>{CSS}</style>

            {/* AVAILABLE BAR */}
            <div className={`gs-abar${navScroll ? " show" : ""}`}>
                <div className="gs-adot" />
                <span>Available for new projects</span>
            </div>

            {/* NAV */}
            <nav className="gs-nav" style={{ top: navScroll ? "38px" : "0" }}>
                <div className="gs-nav-inner">
                    <a className="gs-logo" href="/">JADEY<span>.</span></a>
                    <div className="gs-nav-r">
                        <div className="gs-ndot" />
                        <a href="/all-work">All Projects</a>
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a className="gs-nav-contact" href="/#contact">Contact Me</a>
                    </div>
                    <button ref={hamburgerRef} className="gs-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* MOBILE DRAWER */}
            <div ref={drawerRef} className={`gs-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-label="Navigation menu">
                <button className="gs-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <a href="/all-work" onClick={() => setMenuOpen(false)}>All Projects</a>
                <a href="/#about" onClick={() => setMenuOpen(false)}>About Me</a>
                <a href="/#work" onClick={() => setMenuOpen(false)}>Work Highlights</a>
                <a href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <a href="/#insights" onClick={() => setMenuOpen(false)}>Blog</a>
                <a href="/#workshops" onClick={() => setMenuOpen(false)}>Workshops</a>
                <a className="gs-drawer-cta" href="/#contact" onClick={() => setMenuOpen(false)}>Contact Me</a>
            </div>

            {/* HERO */}
            <div className="gs-hero">
                <div className="gs-hero-inner">
                    <div className="gs-hero-ghost">GAURAV SINGH</div>
                    <div className="gs-cat gs-rv">Brand Design</div>
                    <h1 className="gs-title gs-rv">Gaurav Singh</h1>
                    <div className="gs-meta-row gs-rv">
                        <div>
                            <div className="gs-meta-l">Client</div>
                            <div className="gs-meta-v">Gaurav Singh</div>
                        </div>
                        <div>
                            <div className="gs-meta-l">Services</div>
                            <div className="gs-meta-v">Personal Branding, Visual Design</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* COVER PHOTO */}
            <div className="gs-cover gs-rv">
                <div className="gs-cover-wrap">
                    <img
                        src="/Gaurav%20Singh%20Cover%20Photo.png"
                        alt="Gaurav Singh — Personal Brand Cover"
                    />
                </div>
            </div>

            {/* OVERVIEW — Problem + Goal */}
            <div className="gs-body">
                <div className="gs-overview gs-rv">
                    <div className="gs-ov-col">
                        <div className="gs-section-label">The Problem</div>
                        <h2 className="gs-section-title">The Challenge</h2>
                        <p className="gs-section-body">
                            Gaurav Singh shares structured insights about entrepreneurship, leadership, and decision-making. The ideas are strong — but without a clear visual system, the content risks losing clarity and memorability.
                        </p>
                        <p className="gs-section-body" style={{ marginTop: 12 }}>
                            From the visuals:
                        </p>
                        <ul className="gs-list" style={{ marginTop: 8 }}>
                            <li>Ideas are educational but need stronger visual framing</li>
                            <li>Multi-step content can feel overwhelming without structure</li>
                            <li>Posts lack a consistent visual identity across formats</li>
                        </ul>
                        <p className="gs-section-body" style={{ marginTop: 12 }}>
                            Because of this:
                        </p>
                        <ul className="gs-list" style={{ marginTop: 8 }}>
                            <li>Users may not fully absorb the content</li>
                            <li>Key insights get lost in long explanations</li>
                            <li>The brand is not instantly recognizable</li>
                        </ul>
                    </div>
                    <div className="gs-ov-col">
                        <div className="gs-section-label">The Goal</div>
                        <h2 className="gs-section-title">What We Set Out to Do</h2>
                        <p className="gs-section-body">
                            Design a personal brand system that simplifies complex ideas and makes them easier to understand, follow, and remember.
                        </p>
                        <ul className="gs-list" style={{ marginTop: 14 }}>
                            <li>Turn structured thinking into structured visuals</li>
                            <li>Make educational content easier to scan</li>
                            <li>Build a consistent visual identity across all formats</li>
                            <li>Improve clarity without losing depth</li>
                        </ul>
                    </div>
                </div>

                <hr className="gs-divider" />

                {/* MOODBOARD — text left, image right */}
                <div className="gs-alt gs-rv">
                    <div className="gs-alt-content">
                        <div className="gs-tag">Visual Direction</div>
                        <h2 className="gs-alt-title">Moodboard &amp; Direction</h2>
                        <p className="gs-alt-body">
                            Before designing layouts, the focus was to define a visual language that supports structured thinking.
                        </p>
                        <p className="gs-alt-body" style={{ marginTop: 12 }}>
                            Four decisions shaped the direction:
                        </p>
                        <ul className="gs-list" style={{ marginTop: 10 }}>
                            <li>Light background → improves readability for educational content</li>
                            <li>Soft accent colors → highlight key ideas without overwhelming</li>
                            <li>Hand-drawn strokes and arrows → guide attention and create flow</li>
                            <li>Illustration style → supports storytelling and simplifies concepts</li>
                        </ul>
                        <p className="gs-alt-body" style={{ marginTop: 12 }}>
                            Why: Educational content needs clarity more than decoration. The visuals must guide understanding, not compete with it.
                        </p>
                        <div className="gs-impact-row">
                            <div className="gs-impact-label">Impact</div>
                            <ul className="gs-impact-list">
                                <li>Content feels approachable and easy to follow</li>
                                <li>Users can process information faster</li>
                                <li>Visual system supports learning instead of distracting</li>
                            </ul>
                        </div>
                    </div>
                    <div className="gs-alt-img">
                        <img
                            src="/Gaurav%20Singh%20-%20Moodboard.png"
                            alt="Gaurav Singh — Moodboard"
                        />
                    </div>
                </div>

                <hr className="gs-divider" />

                {/* BRAND SYSTEM */}
                <div className="gs-brand-grid gs-rv">
                    <div className="gs-section-label">Brand System</div>
                    <h2 className="gs-section-title">Building the System</h2>
                    <p className="gs-section-body" style={{ maxWidth: 680 }}>
                        Every element is built to serve one purpose — making structured ideas easier to absorb. When the system is consistent, even complex content feels clear.
                    </p>
                    <div className="gs-brand-cards">
                        <div className="gs-brand-card">
                            <div className="gs-brand-card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="4 7 4 4 20 4 20 7"/>
                                    <line x1="9" y1="20" x2="15" y2="20"/>
                                    <line x1="12" y1="4" x2="12" y2="20"/>
                                </svg>
                            </div>
                            <div className="gs-brand-card-title">Typography</div>
                            <p className="gs-brand-card-body">
                                Header font: <strong>Raleway</strong>. Supporting text: <strong>Kalam</strong>. Raleway provides clean, modern structure for headlines and hierarchy. Kalam adds a handwritten quality that makes supporting text feel warm and personal. Purely rigid typography would feel too cold for storytelling content — this balance keeps it human.
                            </p>
                        </div>
                        <div className="gs-brand-card">
                            <div className="gs-brand-card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="8" cy="9" r="3"/>
                                    <circle cx="16" cy="9" r="3"/>
                                    <circle cx="12" cy="17" r="3"/>
                                </svg>
                            </div>
                            <div className="gs-brand-card-title">Color</div>
                            <p className="gs-brand-card-body">
                                A soft neutral base keeps focus on the content. Pastel accents — purple, green, yellow, teal — categorize ideas and highlight key points. When everything looks the same, educational content becomes overwhelming. Color creates the separation users need to scan and retain.
                            </p>
                        </div>
                        <div className="gs-brand-card">
                            <div className="gs-brand-card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/>
                                    <line x1="12" y1="22" x2="12" y2="15.5"/>
                                    <polyline points="22 8.5 12 15.5 2 8.5"/>
                                </svg>
                            </div>
                            <div className="gs-brand-card-title">Elements</div>
                            <p className="gs-brand-card-body">
                                Hand-drawn arrows direct attention across sections. Brush strokes highlight key words. Dividers and layout blocks organize multi-step content. Without visual guidance, even well-structured content can still feel confusing — these elements make the reading path obvious.
                            </p>
                        </div>
                    </div>
                </div>

                <hr className="gs-divider" />

                {/* LINKEDIN — image left, text right */}
                <div className="gs-alt gs-rv">
                    <div className="gs-alt-img">
                        <img
                            src="/Gaurav%20Singh%20-%20Linkedin%20profile%20and%20cover%20mockup.png"
                            alt="Gaurav Singh — LinkedIn Profile and Cover Mockup"
                        />
                    </div>
                    <div className="gs-alt-content">
                        <div className="gs-tag">Core Application</div>
                        <h2 className="gs-alt-title">LinkedIn Profile &amp; Cover</h2>
                        <p className="gs-alt-body">
                            The profile is the first touchpoint of the brand. Before a user reads any post or follows any content, the profile layout tells them what to expect.
                        </p>
                        <p className="gs-alt-body" style={{ marginTop: 12 }}>
                            Design applied:
                        </p>
                        <ul className="gs-list" style={{ marginTop: 8 }}>
                            <li>Clear headline positioning that communicates expertise immediately</li>
                            <li>Balanced layout between text and visuals</li>
                            <li>Consistent use of brand colors and elements throughout</li>
                        </ul>
                        <div className="gs-impact-row">
                            <div className="gs-impact-label">Impact</div>
                            <ul className="gs-impact-list">
                                <li>Strong first impression that builds credibility</li>
                                <li>Immediate understanding of expertise and content focus</li>
                                <li>Cohesive brand presence from the very first visit</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="gs-divider" />

                {/* CAROUSEL — text left, image right */}
                <div className="gs-alt gs-rv">
                    <div className="gs-alt-content">
                        <div className="gs-tag">Educational Content</div>
                        <h2 className="gs-alt-title">Carousel Design</h2>
                        <p className="gs-alt-body">
                            Multi-slide educational content can feel heavy and hard to follow when ideas compete with each other across slides.
                        </p>
                        <p className="gs-alt-body" style={{ marginTop: 12 }}>
                            Design decision:
                        </p>
                        <ul className="gs-list" style={{ marginTop: 8 }}>
                            <li>One idea per slide — nothing competes for attention</li>
                            <li>Clear headline with short supporting text per frame</li>
                            <li>Visual flow using arrows and highlights to guide reading</li>
                        </ul>
                        <div className="gs-impact-row">
                            <div className="gs-impact-label">Impact</div>
                            <ul className="gs-impact-list">
                                <li>Easier to consume step-by-step without losing context</li>
                                <li>Higher engagement — focused slides invite swiping</li>
                                <li>More shareable content — each slide works independently</li>
                            </ul>
                        </div>
                    </div>
                    <div className="gs-alt-img">
                        <img
                            src="/Gaurav%20Singh%20-%20Carousel.png"
                            alt="Gaurav Singh — Carousel"
                        />
                    </div>
                </div>

                <hr className="gs-divider" />

                {/* INFOGRAPHICS — image left, text right */}
                <div className="gs-alt gs-rv">
                    <div className="gs-alt-img gs-alt-img--bare">
                        <img
                            src="/Gaurav%20Singh%20-%20Infographic.png"
                            alt="Gaurav Singh — Infographic"
                        />
                    </div>
                    <div className="gs-alt-content">
                        <div className="gs-tag">Infographics / Cheatsheets</div>
                        <h2 className="gs-alt-title">Structured for Retention</h2>
                        <p className="gs-alt-body">
                            Complex frameworks and multi-step ideas are hard to retain when information isn&apos;t visually organized. Infographics make the structure of an idea visible.
                        </p>
                        <p className="gs-alt-body" style={{ marginTop: 12 }}>
                            Design decision:
                        </p>
                        <ul className="gs-list" style={{ marginTop: 8 }}>
                            <li>Structured layout with clear sections for each idea</li>
                            <li>Visual grouping of related concepts</li>
                            <li>Icons and illustrations to reinforce each point</li>
                        </ul>
                        <div className="gs-impact-row">
                            <div className="gs-impact-label">Impact</div>
                            <ul className="gs-impact-list">
                                <li>Faster understanding — structure makes the content readable at a glance</li>
                                <li>Better memory retention — grouped information sticks</li>
                                <li>Users are more likely to save and return to the content</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="gs-divider" />

                {/* BANNER GRID — 3 banners, no container */}
                <div className="gs-banner-section gs-rv">
                    <div className="gs-banner-intro">
                        <div className="gs-section-label">Brand Presence</div>
                        <h2 className="gs-section-title">Banner &amp; Visual Identity</h2>
                        <p className="gs-section-body" style={{ maxWidth: 680 }}>
                            Multiple banners create scrolling fatigue if they&apos;re not structured properly. A grid layout keeps everything organized and lets the visual system speak for itself without competing layouts getting in the way.
                        </p>
                        <p className="gs-section-body" style={{ maxWidth: 680, marginTop: 12 }}>
                            Design applied: consistent typography, repeated visual elements, and balanced composition across all three banners — so every piece of content reinforces the same identity.
                        </p>
                        <div className="gs-impact-row" style={{ maxWidth: 680 }}>
                            <div className="gs-impact-label">Impact</div>
                            <ul className="gs-impact-list">
                                <li>Clean presentation without visual fatigue</li>
                                <li>Strong visual consistency across all banner formats</li>
                                <li>Better browsing experience — content scans naturally</li>
                            </ul>
                        </div>
                    </div>
                    <div className="gs-banner-list">
                        <div className="gs-banner-item">
                            <img src="/Gaurav%20Singh%20-%20Banner%201.png" alt="Gaurav Singh — Banner 1" />
                        </div>
                        <div className="gs-banner-item">
                            <img src="/Gaurav%20Singh%20-%20Banner%202.png" alt="Gaurav Singh — Banner 2" />
                        </div>
                        <div className="gs-banner-item">
                            <img src="/Gaurav%20Singh%20-%20Banner%203.png" alt="Gaurav Singh — Banner 3" />
                        </div>
                    </div>
                </div>

            </div>

            {/* IMPACT FINAL */}
            <div className="gs-impact-final">
                <div className="gs-impact-final-inner gs-rv">
                    <div className="gs-section-label">Results</div>
                    <h2 className="gs-section-title">The Impact</h2>
                    <p className="gs-section-body" style={{ maxWidth: 680 }}>
                        The result is a cohesive and scalable personal brand system designed for clarity and learning. Complex ideas become easier to understand. Content is structured and visually guided. The brand identity remains consistent across every format — carousel, infographic, banner, and profile.
                    </p>
                    <p className="gs-section-body" style={{ maxWidth: 680, marginTop: 12 }}>
                        Not just a visual upgrade — but a system that improves how content is consumed, understood, and remembered.
                    </p>
                    <div className="gs-impact-stats">
                        <div className="gs-stat">
                            <div className="gs-stat-num">↑</div>
                            <div className="gs-stat-label">Clarity — complex ideas land faster with visual structure guiding the reader</div>
                        </div>
                        <div className="gs-stat">
                            <div className="gs-stat-num">1</div>
                            <div className="gs-stat-label">Unified system across carousel, infographic, banners, and profile</div>
                        </div>
                        <div className="gs-stat">
                            <div className="gs-stat-num">✦</div>
                            <div className="gs-stat-label">Consistent identity — every piece of content reinforces the brand</div>
                        </div>
                        <div className="gs-stat">
                            <div className="gs-stat-num">→</div>
                            <div className="gs-stat-label">Better retention — structured visuals help users remember key ideas</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* NEXT PROJECT */}
            <div className="gs-next">
                <div className="gs-next-inner gs-rv">
                    <div className="gs-next-preview">
                        <img
                            src="/Ravi%20kumar%20sapata%20Cover%20Photo.png"
                            alt="Ravi Kumar Sapata"
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.05)" }}
                        />
                        <div className="gs-next-preview-overlay">
                            <div className="gs-next-preview-cat">Brand Design</div>
                            <div className="gs-next-preview-name">Ravi Kumar Sapata</div>
                        </div>
                    </div>
                    <div>
                        <div className="gs-next-tag">Next Project</div>
                        <div className="gs-next-title">Ravi Kumar Sapata</div>
                        <p className="gs-next-desc">Personal brand system for a bold, opinion-driven voice — high-contrast visuals and strong typography that make ideas impossible to scroll past.</p>
                        <div className="gs-next-actions">
                            <a className="gs-btn" href="/all-work/ravi-kumar-sapata">View Project →</a>
                            <a className="gs-ghost-btn" href="/all-work">All Work</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="gs-foot">
                <div className="gs-foot-inner">
                    <a className="gs-flogo" href="/">JADEY<span>.</span></a>
                    <div className="gs-fcopy">© 2025 Jane Dhell Cagas. All rights reserved.</div>
                    <div className="gs-flinks">
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a href="/#contact">Contact</a>
                        <a className="gs-fall" href="/all-work">All Projects →</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
