'use client'
import { useState, useEffect, useRef } from "react"

const CSS = `
:root{--bg:#0a0a08;--bg2:#111110;--paper:#f0ebe0;--pu:#9B59D0;--pu2:#B07AE0;--pu3:#7A3AB8;--muted:rgba(240,235,224,0.38);--border:rgba(240,235,224,0.12);--pborder:rgba(155,89,208,0.3);--pbg:rgba(155,89,208,0.08);--max:1440px;--pad:44px}
.kf*{box-sizing:border-box;margin:0;padding:0}
.kf{font-family:'Space Mono',monospace;background:var(--bg);color:var(--paper);min-height:100vh;overflow-x:hidden;width:100%}
/* NAV */
.kf-nav{position:fixed;top:0;left:0;right:0;z-index:500;background:rgba(10,10,8,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:top .3s}
.kf-nav-inner{max-width:var(--max);margin:0 auto;padding:18px var(--pad);display:flex;align-items:center;justify-content:space-between}
.kf-logo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.kf-logo span{color:var(--pu)}
.kf-nav-r{display:none;align-items:center;gap:14px}
.kf-nav-r a{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.kf-nav-r a:hover{color:var(--pu)}
.kf-nav-contact{background:var(--pu)!important;color:var(--bg)!important;padding:9px 20px!important;font-weight:700!important;border:2px solid var(--pu)!important;display:inline-block!important}
.kf-nav-contact:hover{background:var(--pu2)!important;border-color:var(--pu2)!important}
.kf-ndot{width:7px;height:7px;background:var(--pu);border-radius:50%;animation:kf-pulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes kf-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.85)}}
.kf-abar{position:fixed;top:0;left:0;right:0;z-index:499;background:var(--pu3);padding:9px var(--pad);height:38px;display:none;align-items:center;justify-content:center;gap:8px}
.kf-abar.show{display:flex}
.kf-abar span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:white;font-weight:700}
.kf-adot{width:5px;height:5px;background:white;border-radius:50%;animation:kf-pulse 2s ease-in-out infinite}
/* HERO */
.kf-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#2E1050,#6B3FA0)}
.kf-hero-inner{max-width:var(--max);margin:0 auto;padding:140px var(--pad) 60px;position:relative}
.kf-hero-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(22px,6vw,90px);letter-spacing:-3px;color:rgba(240,235,224,0.035);white-space:nowrap;pointer-events:none;text-align:center;width:100%}
.kf-cat{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,0.6);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.kf-cat::before{content:'';width:36px;height:1px;background:rgba(255,255,255,0.4)}
.kf-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,7vw,100px);letter-spacing:-2px;line-height:.88;color:#fff;margin-bottom:32px}
.kf-meta-row{display:flex;gap:44px;flex-wrap:wrap;padding-top:28px;border-top:1px solid rgba(255,255,255,0.15)}
.kf-meta-l{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:4px}
.kf-meta-v{font-size:11px;color:#fff;font-weight:700}
/* BODY */
.kf-body{padding:0}
/* OVERVIEW */
.kf-overview{max-width:var(--max);margin:0 auto;padding:72px var(--pad);display:grid;grid-template-columns:1fr 1fr;gap:60px}
.kf-ov-col{}
.kf-section-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:10px}
.kf-section-label::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.kf-section-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(26px,4vw,46px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px}
.kf-section-body{font-size:12px;line-height:1.95;color:var(--muted)}
.kf-list{color:var(--muted);list-style:none;padding:0;margin:0;font-size:12px;line-height:1.95}
.kf-list li{padding-left:18px;position:relative;margin-bottom:4px}
.kf-list li::before{content:'•';position:absolute;left:0;color:var(--pu)}
/* DIVIDER */
.kf-divider{border:none;border-top:1px solid var(--border);max-width:var(--max);margin:0 auto}
/* ALT ROW */
.kf-alt{max-width:var(--max);margin:0 auto;padding:72px var(--pad);display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.kf-alt-img{overflow:hidden;border:1px solid var(--border);position:relative}
.kf-alt-img img{width:100%;height:auto;display:block}
.kf-alt-img--clamp{max-height:520px}
.kf-alt-img--clamp img{width:100%;height:100%;max-height:520px;object-fit:contain;object-position:center top}
.kf-alt-content{}
.kf-tag{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:8px}
.kf-tag::after{content:'';width:28px;height:1px;background:var(--pu)}
.kf-alt-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(24px,3.5vw,42px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px;line-height:1}
.kf-alt-body{font-size:12px;line-height:1.95;color:var(--muted)}
.kf-impact-row{margin-top:20px;padding-top:18px;border-top:1px solid var(--border)}
.kf-impact-label{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(240,235,224,0.4);margin-bottom:8px}
.kf-impact-list{list-style:none;padding:0;margin:0;font-size:11px;line-height:1.9;color:var(--muted)}
.kf-impact-list li{padding-left:16px;position:relative;margin-bottom:2px}
.kf-impact-list li::before{content:'→';position:absolute;left:0;color:var(--pu);font-size:9px;top:2px}
/* COVER IMAGE */
.kf-cover{padding:52px var(--pad) 0}
.kf-cover-wrap{max-width:1425px;margin:0 auto;overflow:hidden}
.kf-cover-wrap img{width:100%;height:auto;display:block}
/* BRAND SYSTEM */
.kf-brand-grid{max-width:var(--max);margin:0 auto;padding:72px var(--pad)}
.kf-brand-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:32px}
.kf-brand-card{background:var(--bg2);border:1px solid var(--border);padding:28px 24px}
.kf-brand-card-icon{width:40px;height:40px;background:var(--pbg);border:1px solid var(--pborder);display:flex;align-items:center;justify-content:center;margin-bottom:14px;color:var(--pu)}
.kf-brand-card-title{font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:.5px;color:var(--paper);margin-bottom:8px}
.kf-brand-card-body{font-size:11px;line-height:1.85;color:var(--muted)}
/* BANNER GRID */
.kf-banner-section{max-width:var(--max);margin:0 auto;padding:72px var(--pad)}
.kf-banner-intro{margin-bottom:40px}
.kf-banner-list{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:32px;align-items:start}
.kf-banner-item{overflow:visible;border:none;background:transparent}
.kf-banner-item img{width:100%;height:auto;display:block}
/* IMPACT FINAL */
.kf-impact-final{max-width:var(--max);margin:0 auto;padding:72px var(--pad);background:var(--bg2)}
.kf-impact-final-inner{max-width:var(--max);margin:0 auto}
.kf-impact-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:40px}
.kf-stat{border-left:2px solid var(--pu);padding-left:18px}
.kf-stat-num{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,48px);letter-spacing:-1px;color:var(--paper);line-height:1}
.kf-stat-label{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:4px;line-height:1.6}
/* NEXT PROJECT */
.kf-next{background:var(--bg2)}
.kf-next-inner{max-width:var(--max);margin:0 auto;padding:64px var(--pad);display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:center}
.kf-next-preview{position:relative;overflow:hidden;aspect-ratio:4/3;border:1px solid var(--border)}
.kf-next-preview-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px}
.kf-next-preview-cat{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:6px}
.kf-next-preview-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(16px,2.2vw,26px);letter-spacing:-.5px;color:#fff;line-height:1}
.kf-next-tag{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.kf-next-tag::after{content:'';width:36px;height:1px;background:var(--pu)}
.kf-next-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4.5vw,56px);letter-spacing:-1px;color:var(--paper);line-height:.92;margin-bottom:14px}
.kf-next-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:380px;margin-bottom:28px}
.kf-next-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.kf-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;background:var(--pu);color:var(--bg);border:2px solid var(--pu);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.kf-btn:hover{background:var(--pu2);border-color:var(--pu2)}
.kf-ghost-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.kf-ghost-btn:hover{border-color:var(--pu);color:var(--pu)}
/* FOOTER */
.kf-foot{border-top:1px solid var(--border)}
.kf-foot-inner{max-width:var(--max);margin:0 auto;padding:44px var(--pad);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.kf-flogo{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.kf-flogo span{color:var(--pu)}
.kf-fcopy{font-size:9px;color:var(--muted)}
.kf-flinks{display:flex;gap:18px;flex-wrap:wrap;align-items:center}
.kf-flinks a{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.kf-flinks a:hover{color:var(--pu)}
.kf-fall{color:var(--pu)!important}
/* REVEAL */
.kf-rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.kf-rv.in{opacity:1;transform:translateY(0)}
/* MOBILE DRAWER */
.kf-hamburger{display:flex;flex-direction:column;gap:5px;cursor:pointer;background:transparent;border:none;padding:6px}
.kf-hamburger span{display:block;width:24px;height:2px;background:var(--paper);transition:all .3s}
.kf-drawer{position:fixed;inset:0;z-index:600;background:var(--bg);transform:translateX(100%);transition:transform .35s ease;display:flex;flex-direction:column;padding:88px 28px 40px;overflow-y:auto}
.kf-drawer.open{transform:translateX(0)}
.kf-drawer-close{position:absolute;top:22px;right:24px;background:transparent;border:none;color:var(--paper);font-size:22px;cursor:pointer;line-height:1}
.kf-drawer a{font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;padding:18px 0;border-bottom:1px solid var(--border);transition:color .2s;display:block}
.kf-drawer a:hover,.kf-drawer a:active{color:var(--pu)}
.kf-drawer-cta{background:var(--pu);color:var(--bg)!important;padding:14px 0!important;font-weight:700;border-bottom:none!important;text-align:center;margin-top:20px;display:block;font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;transition:background .2s}
.kf-drawer-cta:hover{background:var(--pu2)}
/* ===== RESPONSIVE ===== */
@media(max-width:1023px){
  :root{--pad:32px}
  .kf-nav-inner{padding:14px 28px}
  .kf-overview{grid-template-columns:1fr;gap:40px}
  .kf-alt{grid-template-columns:1fr;gap:32px}
  .kf-brand-cards{grid-template-columns:repeat(2,1fr)}
  .kf-impact-stats{grid-template-columns:repeat(2,1fr)}
  .kf-next-inner{grid-template-columns:1fr;gap:32px}
}
@media(max-width:768px){
  :root{--pad:24px}
  .kf-hero-inner{padding:110px var(--pad) 44px}
  .kf-overview{padding:52px var(--pad)}
  .kf-alt{padding:52px var(--pad)}
  .kf-brand-grid{padding:52px var(--pad)}
  .kf-brand-cards{grid-template-columns:1fr}
  .kf-cover{padding:36px var(--pad) 0}
  .kf-impact-final{padding:52px var(--pad) 52px}
  .kf-impact-stats{grid-template-columns:repeat(2,1fr);gap:20px}
  .kf-next-inner{padding:44px var(--pad)}
  .kf-meta-row{gap:24px}
  .kf-foot-inner{flex-direction:column;align-items:flex-start;gap:20px;padding:32px var(--pad)}
  .kf-flinks{flex-direction:column;gap:10px;align-items:flex-start}
  .kf-next-actions{flex-direction:column;align-items:flex-start}
  .kf-btn,.kf-ghost-btn{width:100%;text-align:center;display:block}
  .kf-banner-section{padding:52px var(--pad)}
  .kf-banner-list{grid-template-columns:repeat(2,1fr)}
  .kf-banner-list .kf-banner-item:last-child{grid-column:1/-1}
}
@media(max-width:480px){
  :root{--pad:16px}
  .kf-abar{padding:9px 16px}
  .kf-abar span{font-size:7px}
  .kf-meta-row{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
  .kf-impact-stats{grid-template-columns:1fr;gap:14px}
  .kf-banner-list{grid-template-columns:1fr}
  .kf-banner-list .kf-banner-item:last-child{grid-column:auto}
}
@media(hover:none),(pointer:coarse){
  .kf-hamburger{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center}
  .kf-nav-r{display:none}
  .kf-btn,.kf-ghost-btn{min-height:44px;display:inline-flex;align-items:center;justify-content:center}
}
@media(min-width:1024px){
  .kf-hamburger{display:none}
  .kf-nav-r{display:flex}
}
@media(prefers-reduced-motion:reduce){
  .kf-rv{transition:none;opacity:1;transform:none}
  .kf-drawer{transition:none}
  .kf-ndot,.kf-adot{animation:none}
}
`

export default function KimFrancesSantillanaPage() {
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
        const els = Array.from(ref.current?.querySelectorAll(".kf-rv") || [])
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
        <div className="kf" ref={ref}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" />
            <style>{CSS}</style>

            {/* AVAILABLE BAR */}
            <div className={`kf-abar${navScroll ? " show" : ""}`}>
                <div className="kf-adot" />
                <span>Available for new projects</span>
            </div>

            {/* NAV */}
            <nav className="kf-nav" style={{ top: navScroll ? "38px" : "0" }}>
                <div className="kf-nav-inner">
                    <a className="kf-logo" href="/">JADEY<span>.</span></a>
                    <div className="kf-nav-r">
                        <div className="kf-ndot" />
                        <a href="/all-work">All Projects</a>
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a className="kf-nav-contact" href="/#contact">Contact Me</a>
                    </div>
                    <button ref={hamburgerRef} className="kf-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* MOBILE DRAWER */}
            <div ref={drawerRef} className={`kf-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-label="Navigation menu">
                <button className="kf-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <a href="/all-work" onClick={() => setMenuOpen(false)}>All Projects</a>
                <a href="/#about" onClick={() => setMenuOpen(false)}>About Me</a>
                <a href="/#work" onClick={() => setMenuOpen(false)}>Work Highlights</a>
                <a href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <a href="/#insights" onClick={() => setMenuOpen(false)}>Blog</a>
                <a href="/#workshops" onClick={() => setMenuOpen(false)}>Workshops</a>
                <a className="kf-drawer-cta" href="/#contact" onClick={() => setMenuOpen(false)}>Contact Me</a>
            </div>

            {/* HERO */}
            <div className="kf-hero">
                <div className="kf-hero-inner">
                    <div className="kf-hero-ghost">KIM FRANCES SANTILLANA</div>
                    <div className="kf-cat kf-rv">Brand Design</div>
                    <h1 className="kf-title kf-rv">Kim Frances Santillana</h1>
                    <div className="kf-meta-row kf-rv">
                        <div>
                            <div className="kf-meta-l">Client</div>
                            <div className="kf-meta-v">Kim Frances Santillana</div>
                        </div>
                        <div>
                            <div className="kf-meta-l">Services</div>
                            <div className="kf-meta-v">Personal Branding, Visual Design</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* COVER PHOTO */}
            <div className="kf-cover kf-rv">
                <div className="kf-cover-wrap">
                    <img
                        src="/Kim%20Frances%20Santillana%20Cover%20Photo.png"
                        alt="Kim Frances Santillana — Personal Brand Cover"
                    />
                </div>
            </div>

            {/* OVERVIEW — Problem + Goal */}
            <div className="kf-body">
                <div className="kf-overview kf-rv">
                    <div className="kf-ov-col">
                        <div className="kf-section-label">The Problem</div>
                        <h2 className="kf-section-title">The Challenge</h2>
                        <p className="kf-section-body">
                            Kim Frances creates valuable, informative content, but the visual presentation made it harder to absorb quickly.
                        </p>
                        <p className="kf-section-body" style={{ marginTop: 12 }}>
                            From the visuals:
                        </p>
                        <ul className="kf-list" style={{ marginTop: 8 }}>
                            <li>Content relied heavily on text without strong hierarchy</li>
                            <li>Layouts felt inconsistent across posts</li>
                            <li>Important points didn&apos;t stand out immediately</li>
                        </ul>
                        <p className="kf-section-body" style={{ marginTop: 12 }}>
                            Because of this:
                        </p>
                        <ul className="kf-list" style={{ marginTop: 8 }}>
                            <li>Users needed more time to process each post</li>
                            <li>Key insights were easily overlooked</li>
                            <li>Engagement dropped despite strong content</li>
                        </ul>
                    </div>
                    <div className="kf-ov-col">
                        <div className="kf-section-label">The Goal</div>
                        <h2 className="kf-section-title">What We Set Out to Do</h2>
                        <p className="kf-section-body">
                            The goal was not to redesign the content — but to redesign how it is consumed.
                        </p>
                        <ul className="kf-list" style={{ marginTop: 14 }}>
                            <li>Make content easier to scan</li>
                            <li>Introduce clear visual hierarchy</li>
                            <li>Build a consistent system across all outputs</li>
                            <li>Maintain a clean and professional identity</li>
                        </ul>
                    </div>
                </div>

                <hr className="kf-divider" />

                {/* SECTION 3 — VISUAL DIRECTION: text left, moodboard right */}
                <div className="kf-alt kf-rv">
                    <div className="kf-alt-content">
                        <div className="kf-tag">Visual Direction</div>
                        <h2 className="kf-alt-title">Moodboard &amp; Direction</h2>
                        <p className="kf-alt-body">
                            The direction focused on clarity and structure.
                        </p>
                        <p className="kf-alt-body" style={{ marginTop: 12 }}>
                            Three design decisions shaped the approach:
                        </p>
                        <ul className="kf-list" style={{ marginTop: 10 }}>
                            <li>Clean layout → removes unnecessary noise</li>
                            <li>Controlled spacing → separates ideas clearly</li>
                            <li>Minimal color usage → highlights only what matters</li>
                        </ul>
                        <p className="kf-alt-body" style={{ marginTop: 12 }}>
                            Why: Users don&apos;t read everything — they scan first.
                        </p>
                        <div className="kf-impact-row">
                            <div className="kf-impact-label">Impact</div>
                            <ul className="kf-impact-list">
                                <li>Faster comprehension</li>
                                <li>Improved readability</li>
                                <li>Better engagement</li>
                            </ul>
                        </div>
                    </div>
                    <div className="kf-alt-img">
                        <img
                            src="/Kim%20Frances%20Santillana%20-%20Moodboard.png"
                            alt="Kim Frances Santillana — Moodboard"
                        />
                    </div>
                </div>

                <hr className="kf-divider" />

                {/* SECTION 4 — BRAND SYSTEM */}
                <div className="kf-brand-grid kf-rv">
                    <div className="kf-section-label">Brand System</div>
                    <h2 className="kf-section-title">Building the System</h2>
                    <p className="kf-section-body" style={{ maxWidth: 680 }}>
                        Every element is defined with a purpose — to make the content easier to read, recognize, and scale.
                    </p>
                    <div className="kf-brand-cards">
                        <div className="kf-brand-card">
                            <div className="kf-brand-card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="4 7 4 4 20 4 20 7"/>
                                    <line x1="9" y1="20" x2="15" y2="20"/>
                                    <line x1="12" y1="4" x2="12" y2="20"/>
                                </svg>
                            </div>
                            <div className="kf-brand-card-title">Typography</div>
                            <p className="kf-brand-card-body">
                                Header font: <strong>Kaisei Opti</strong>. Supporting text: <strong>Hind</strong>. Kaisei Opti creates emphasis and authority in headlines. Hind keeps body text readable and balanced. Without strong hierarchy, all text competes equally — and nothing stands out.
                            </p>
                        </div>
                        <div className="kf-brand-card">
                            <div className="kf-brand-card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="8" cy="9" r="3"/>
                                    <circle cx="16" cy="9" r="3"/>
                                    <circle cx="12" cy="17" r="3"/>
                                </svg>
                            </div>
                            <div className="kf-brand-card-title">Color</div>
                            <p className="kf-brand-card-body">
                                Color is used as a guide, not decoration. A neutral base keeps the layout clean. An accent color draws attention to key words selectively. Too much color creates noise — this keeps focus where it belongs.
                            </p>
                        </div>
                        <div className="kf-brand-card">
                            <div className="kf-brand-card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/>
                                    <line x1="12" y1="22" x2="12" y2="15.5"/>
                                    <polyline points="22 8.5 12 15.5 2 8.5"/>
                                </svg>
                            </div>
                            <div className="kf-brand-card-title">Elements</div>
                            <p className="kf-brand-card-body">
                                Consistent spacing, layout containers, and alignment rules applied across every format. Random layouts reduce consistency — a defined system makes every piece predictable and easy to scale.
                            </p>
                        </div>
                    </div>
                </div>

                <hr className="kf-divider" />

                {/* SECTION 5 — LINKEDIN PROFILE: image left, text right */}
                <div className="kf-alt kf-rv">
                    <div className="kf-alt-img">
                        <img
                            src="/Kim%20Frances%20Santillana%20-%20Linkedin%20profile%20and%20cover%20mockup.png"
                            alt="Kim Frances Santillana — LinkedIn Profile and Cover Mockup"
                        />
                    </div>
                    <div className="kf-alt-content">
                        <div className="kf-tag">Core Application</div>
                        <h2 className="kf-alt-title">LinkedIn Profile &amp; Cover</h2>
                        <p className="kf-alt-body">
                            The profile is the first impression. Before a user reads a single post, they see the profile — it sets the expectation for everything else.
                        </p>
                        <p className="kf-alt-body" style={{ marginTop: 12 }}>
                            The design system was applied directly here:
                        </p>
                        <ul className="kf-list" style={{ marginTop: 8 }}>
                            <li>Strong headline hierarchy</li>
                            <li>Clean and structured layout</li>
                            <li>Consistent visual system</li>
                        </ul>
                        <div className="kf-impact-row">
                            <div className="kf-impact-label">Impact</div>
                            <ul className="kf-impact-list">
                                <li>Immediate clarity at first glance</li>
                                <li>Professional and credible presentation</li>
                                <li>Strong, recognizable brand identity</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="kf-divider" />

                {/* SECTION 6 — CAROUSEL: text left, image right */}
                <div className="kf-alt kf-rv">
                    <div className="kf-alt-content">
                        <div className="kf-tag">Content Design</div>
                        <h2 className="kf-alt-title">Carousel Design</h2>
                        <p className="kf-alt-body">
                            Long text reduces engagement. The carousel breaks content into structured, easy-to-follow slides — but only if each slide is intentionally designed.
                        </p>
                        <p className="kf-alt-body" style={{ marginTop: 12 }}>
                            Design decision:
                        </p>
                        <ul className="kf-list" style={{ marginTop: 8 }}>
                            <li>One idea per slide</li>
                            <li>Clear headline with supporting text</li>
                            <li>Consistent layout system throughout</li>
                        </ul>
                        <div className="kf-impact-row">
                            <div className="kf-impact-label">Impact</div>
                            <ul className="kf-impact-list">
                                <li>Easier to follow from slide to slide</li>
                                <li>Higher engagement per post</li>
                                <li>Better content retention</li>
                            </ul>
                        </div>
                    </div>
                    <div className="kf-alt-img kf-alt-img--clamp">
                        <img
                            src="/Kim%20Frances%20Santillana%20-%20Carousel.png"
                            alt="Kim Frances Santillana — Carousel"
                        />
                    </div>
                </div>

                <hr className="kf-divider" />

                {/* SECTION 7 — BANNER SYSTEM */}
                <div className="kf-banner-section kf-rv">
                    <div className="kf-banner-intro">
                        <div className="kf-section-label">Brand Presence</div>
                        <h2 className="kf-section-title">Banner System</h2>
                        <p className="kf-section-body" style={{ maxWidth: 680 }}>
                            Multiple banner variations were created using the same design system. Each one follows the same layout, typography, and spacing — only the content changes.
                        </p>
                        <p className="kf-section-body" style={{ maxWidth: 680, marginTop: 12 }}>
                            This gives flexibility without losing consistency. Every banner still reads as part of the same brand.
                        </p>
                    </div>
                    <div className="kf-banner-list">
                        <div className="kf-banner-item">
                            <img
                                src="/Kim%20Frances%20Santillana%20-%20Banner%201.png"
                                alt="Kim Frances Santillana — Banner 1"
                            />
                        </div>
                        <div className="kf-banner-item">
                            <img
                                src="/Kim%20Frances%20Santillana%20-%20Banner%202.png"
                                alt="Kim Frances Santillana — Banner 2"
                            />
                        </div>
                        <div className="kf-banner-item">
                            <img
                                src="/Kim%20Frances%20Santillana%20-%20Banner%203.png"
                                alt="Kim Frances Santillana — Banner 3"
                            />
                        </div>
                    </div>
                </div>

            </div>

            {/* IMPACT FINAL */}
            <div className="kf-impact-final">
                <div className="kf-impact-final-inner kf-rv">
                    <div className="kf-section-label">Results</div>
                    <h2 className="kf-section-title">The Impact</h2>
                    <p className="kf-section-body" style={{ maxWidth: 680 }}>
                        The result is a structured and scalable personal brand system.
                    </p>
                    <p className="kf-section-body" style={{ maxWidth: 680, marginTop: 12 }}>
                        Not just better visuals — but a better content experience.
                    </p>
                    <div className="kf-impact-stats">
                        <div className="kf-stat">
                            <div className="kf-stat-num">↑</div>
                            <div className="kf-stat-label">Content is easier to understand at a glance</div>
                        </div>
                        <div className="kf-stat">
                            <div className="kf-stat-num">1</div>
                            <div className="kf-stat-label">Consistent visual identity across every format</div>
                        </div>
                        <div className="kf-stat">
                            <div className="kf-stat-num">✦</div>
                            <div className="kf-stat-label">Users engage faster — less time spent processing</div>
                        </div>
                        <div className="kf-stat">
                            <div className="kf-stat-num">3</div>
                            <div className="kf-stat-label">Banner variations — one system, full flexibility</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* NEXT PROJECT */}
            <div className="kf-next">
                <div className="kf-next-inner kf-rv">
                    <div className="kf-next-preview">
                        <img
                            src="/Parves%20Shahid%20Cover%20Photo.png"
                            alt="Parves Shahid"
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.05)" }}
                        />
                        <div className="kf-next-preview-overlay">
                            <div className="kf-next-preview-cat">Brand Design</div>
                            <div className="kf-next-preview-name">Parves Shahid</div>
                        </div>
                    </div>
                    <div>
                        <div className="kf-next-tag">Next Project</div>
                        <div className="kf-next-title">Parves Shahid</div>
                        <p className="kf-next-desc">Personal brand system for an AI creator — visual identity, carousel, infographic, and banner designed around consistency and recognition.</p>
                        <div className="kf-next-actions">
                            <a className="kf-btn" href="/all-work/parves-shahid">View Project →</a>
                            <a className="kf-ghost-btn" href="/all-work">All Work</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="kf-foot">
                <div className="kf-foot-inner">
                    <a className="kf-flogo" href="/">JADEY<span>.</span></a>
                    <div className="kf-fcopy">© 2025 Jane Dhell Cagas. All rights reserved.</div>
                    <div className="kf-flinks">
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a href="/#contact">Contact</a>
                        <a className="kf-fall" href="/all-work">All Projects →</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
