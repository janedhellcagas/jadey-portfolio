'use client'
import { useState, useEffect, useRef } from "react"

const CSS = `
:root{--bg:#0a0a08;--bg2:#111110;--paper:#f0ebe0;--pu:#9B59D0;--pu2:#B07AE0;--pu3:#7A3AB8;--muted:rgba(240,235,224,0.38);--border:rgba(240,235,224,0.12);--pborder:rgba(155,89,208,0.3);--pbg:rgba(155,89,208,0.08);--max:1440px;--pad:44px}
.gl*{box-sizing:border-box;margin:0;padding:0}
.gl{font-family:'Space Mono',monospace;background:var(--bg);color:var(--paper);min-height:100vh;overflow-x:hidden;width:100%}
/* NAV */
.gl-nav{position:fixed;top:0;left:0;right:0;z-index:500;background:rgba(10,10,8,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:top .3s}
.gl-nav-inner{max-width:var(--max);margin:0 auto;padding:18px var(--pad);display:flex;align-items:center;justify-content:space-between}
.gl-logo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.gl-logo span{color:var(--pu)}
.gl-nav-r{display:none;align-items:center;gap:14px}
.gl-nav-r a{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.gl-nav-r a:hover{color:var(--pu)}
.gl-nav-contact{background:var(--pu)!important;color:var(--bg)!important;padding:9px 20px!important;font-weight:700!important;border:2px solid var(--pu)!important;display:inline-block!important}
.gl-nav-contact:hover{background:var(--pu2)!important;border-color:var(--pu2)!important}
.gl-ndot{width:7px;height:7px;background:var(--pu);border-radius:50%;animation:gl-pulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes gl-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.85)}}
.gl-abar{position:fixed;top:0;left:0;right:0;z-index:499;background:var(--pu3);padding:9px var(--pad);height:38px;display:none;align-items:center;justify-content:center;gap:8px}
.gl-abar.show{display:flex}
.gl-abar span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:white;font-weight:700}
.gl-adot{width:5px;height:5px;background:white;border-radius:50%;animation:gl-pulse 2s ease-in-out infinite}
/* HERO */
.gl-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#2E1050,#6B3FA0)}
.gl-hero-inner{max-width:var(--max);margin:0 auto;padding:140px var(--pad) 60px;position:relative}
.gl-hero-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,9vw,140px);letter-spacing:-4px;color:rgba(240,235,224,0.035);white-space:nowrap;pointer-events:none;text-align:center;width:100%}
.gl-cat{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,0.6);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.gl-cat::before{content:'';width:36px;height:1px;background:rgba(255,255,255,0.4)}
.gl-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,9vw,120px);letter-spacing:-2px;line-height:.88;color:#fff;margin-bottom:32px}
.gl-meta-row{display:flex;gap:44px;flex-wrap:wrap;padding-top:28px;border-top:1px solid rgba(255,255,255,0.15)}
.gl-meta-l{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:4px}
.gl-meta-v{font-size:11px;color:#fff;font-weight:700}
/* BODY */
.gl-body{padding:0}
/* OVERVIEW */
.gl-overview{max-width:var(--max);margin:0 auto;padding:72px var(--pad);display:grid;grid-template-columns:1fr 1fr;gap:60px}
.gl-ov-col{}
.gl-section-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:10px}
.gl-section-label::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.gl-section-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(26px,4vw,46px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px}
.gl-section-body{font-size:12px;line-height:1.95;color:var(--muted)}
.gl-list{color:var(--muted);list-style:none;padding:0;margin:0;font-size:12px;line-height:1.95}
.gl-list li{padding-left:18px;position:relative;margin-bottom:4px}
.gl-list li::before{content:'•';position:absolute;left:0;color:var(--pu)}
/* DIVIDER */
.gl-divider{border:none;border-top:1px solid var(--border);max-width:var(--max);margin:0 auto}
/* ALT ROW */
.gl-alt{max-width:var(--max);margin:0 auto;padding:72px var(--pad);display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.gl-alt-img{overflow:hidden;border:1px solid var(--border);position:relative}
.gl-alt-img img{width:100%;height:auto;display:block}
.gl-alt-content{}
.gl-tag{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:8px}
.gl-tag::after{content:'';width:28px;height:1px;background:var(--pu)}
.gl-alt-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(24px,3.5vw,42px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px;line-height:1}
.gl-alt-body{font-size:12px;line-height:1.95;color:var(--muted)}
.gl-impact-row{margin-top:20px;padding-top:18px;border-top:1px solid var(--border)}
.gl-impact-label{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(240,235,224,0.4);margin-bottom:8px}
.gl-impact-list{list-style:none;padding:0;margin:0;font-size:11px;line-height:1.9;color:var(--muted)}
.gl-impact-list li{padding-left:16px;position:relative;margin-bottom:2px}
.gl-impact-list li::before{content:'→';position:absolute;left:0;color:var(--pu);font-size:9px;top:2px}
/* BANNER GRID — 2 columns side by side, no container box */
.gl-banner-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.gl-banner-grid .gl-alt-img{border:none;overflow:visible;background:transparent}
.gl-banner-grid .gl-alt-img img{width:100%;height:auto;display:block}
/* BRAND SYSTEM GRID */
.gl-brand-grid{max-width:var(--max);margin:0 auto;padding:72px var(--pad)}
.gl-brand-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:32px}
.gl-brand-card{background:var(--bg2);border:1px solid var(--border);padding:28px 24px}
.gl-brand-card-icon{width:40px;height:40px;background:var(--pbg);border:1px solid var(--pborder);display:flex;align-items:center;justify-content:center;margin-bottom:14px;color:var(--pu)}
.gl-brand-card-title{font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:.5px;color:var(--paper);margin-bottom:8px}
.gl-brand-card-body{font-size:11px;line-height:1.85;color:var(--muted)}
/* COVER IMAGE */
.gl-cover{padding:52px var(--pad) 0}
.gl-cover-wrap{max-width:1425px;margin:0 auto;overflow:hidden}
.gl-cover-wrap img{width:100%;height:auto;display:block}
/* IMPACT FINAL */
.gl-impact-final{max-width:var(--max);margin:0 auto;padding:72px var(--pad);background:var(--bg2)}
.gl-impact-final-inner{max-width:var(--max);margin:0 auto}
.gl-impact-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:40px}
.gl-stat{border-left:2px solid var(--pu);padding-left:18px}
.gl-stat-num{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,48px);letter-spacing:-1px;color:var(--paper);line-height:1}
.gl-stat-label{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:4px;line-height:1.6}
/* NEXT PROJECT */
.gl-next{background:var(--bg2)}
.gl-next-inner{max-width:var(--max);margin:0 auto;padding:64px var(--pad);display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:center}
.gl-next-preview{position:relative;overflow:hidden;aspect-ratio:4/3;border:1px solid var(--border)}
.gl-next-preview-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px}
.gl-next-preview-cat{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:6px}
.gl-next-preview-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(16px,2.2vw,26px);letter-spacing:-.5px;color:#fff;line-height:1}
.gl-next-tag{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.gl-next-tag::after{content:'';width:36px;height:1px;background:var(--pu)}
.gl-next-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4.5vw,56px);letter-spacing:-1px;color:var(--paper);line-height:.92;margin-bottom:14px}
.gl-next-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:380px;margin-bottom:28px}
.gl-next-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.gl-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;background:var(--pu);color:var(--bg);border:2px solid var(--pu);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.gl-btn:hover{background:var(--pu2);border-color:var(--pu2)}
.gl-ghost-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.gl-ghost-btn:hover{border-color:var(--pu);color:var(--pu)}
/* FOOTER */
.gl-foot{border-top:1px solid var(--border)}
.gl-foot-inner{max-width:var(--max);margin:0 auto;padding:44px var(--pad);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.gl-flogo{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.gl-flogo span{color:var(--pu)}
.gl-fcopy{font-size:9px;color:var(--muted)}
.gl-flinks{display:flex;gap:18px;flex-wrap:wrap;align-items:center}
.gl-flinks a{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.gl-flinks a:hover{color:var(--pu)}
.gl-fall{color:var(--pu)!important}
/* REVEAL */
.gl-rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.gl-rv.in{opacity:1;transform:translateY(0)}
/* MOBILE DRAWER */
.gl-hamburger{display:flex;flex-direction:column;gap:5px;cursor:pointer;background:transparent;border:none;padding:6px}
.gl-hamburger span{display:block;width:24px;height:2px;background:var(--paper);transition:all .3s}
.gl-drawer{position:fixed;inset:0;z-index:600;background:var(--bg);transform:translateX(100%);transition:transform .35s ease;display:flex;flex-direction:column;padding:88px 28px 40px;overflow-y:auto}
.gl-drawer.open{transform:translateX(0)}
.gl-drawer-close{position:absolute;top:22px;right:24px;background:transparent;border:none;color:var(--paper);font-size:22px;cursor:pointer;line-height:1}
.gl-drawer a{font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;padding:18px 0;border-bottom:1px solid var(--border);transition:color .2s;display:block}
.gl-drawer a:hover,.gl-drawer a:active{color:var(--pu)}
.gl-drawer-cta{background:var(--pu);color:var(--bg)!important;padding:14px 0!important;font-weight:700;border-bottom:none!important;text-align:center;margin-top:20px;display:block;font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;transition:background .2s}
.gl-drawer-cta:hover{background:var(--pu2)}
/* ===== RESPONSIVE ===== */
@media(max-width:1023px){
  :root{--pad:32px}
  .gl-nav-inner{padding:14px 28px}
  .gl-overview{grid-template-columns:1fr;gap:40px}
  .gl-alt{grid-template-columns:1fr;gap:32px}
  .gl-brand-cards{grid-template-columns:repeat(2,1fr)}
  .gl-impact-stats{grid-template-columns:repeat(2,1fr)}
  .gl-next-inner{grid-template-columns:1fr;gap:32px}
}
@media(max-width:768px){
  :root{--pad:24px}
  .gl-hero-inner{padding:110px var(--pad) 44px}
  .gl-overview{padding:52px var(--pad)}
  .gl-alt{padding:52px var(--pad)}
  .gl-brand-grid{padding:52px var(--pad)}
  .gl-brand-cards{grid-template-columns:1fr}
  .gl-cover{padding:36px var(--pad) 0}
  .gl-impact-final{padding:52px var(--pad) 52px}
  .gl-impact-stats{grid-template-columns:repeat(2,1fr);gap:20px}
  .gl-next-inner{padding:44px var(--pad)}
  .gl-meta-row{gap:24px}
  .gl-foot-inner{flex-direction:column;align-items:flex-start;gap:20px;padding:32px var(--pad)}
  .gl-flinks{flex-direction:column;gap:10px;align-items:flex-start}
  .gl-next-actions{flex-direction:column;align-items:flex-start}
  .gl-btn,.gl-ghost-btn{width:100%;text-align:center;display:block}
}
@media(max-width:480px){
  :root{--pad:16px}
  .gl-abar{padding:9px 16px}
  .gl-abar span{font-size:7px}
  .gl-meta-row{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
  .gl-impact-stats{grid-template-columns:1fr;gap:14px}
  .gl-banner-grid{grid-template-columns:1fr}
}
@media(hover:none),(pointer:coarse){
  .gl-hamburger{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center}
  .gl-nav-r{display:none}
  .gl-btn,.gl-ghost-btn{min-height:44px;display:inline-flex;align-items:center;justify-content:center}
}
@media(min-width:1024px){
  .gl-hamburger{display:none}
  .gl-nav-r{display:flex}
}
@media(prefers-reduced-motion:reduce){
  .gl-rv{transition:none;opacity:1;transform:none}
  .gl-drawer{transition:none}
  .gl-ndot,.gl-adot{animation:none}
}
`

export default function GraceLingPage() {
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
        const els = Array.from(ref.current?.querySelectorAll(".gl-rv") || [])
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
        <div className="gl" ref={ref}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" />
            <style>{CSS}</style>

            {/* AVAILABLE BAR */}
            <div className={`gl-abar${navScroll ? " show" : ""}`}>
                <div className="gl-adot" />
                <span>Available for new projects</span>
            </div>

            {/* NAV */}
            <nav className="gl-nav" style={{ top: navScroll ? "38px" : "0" }}>
                <div className="gl-nav-inner">
                    <a className="gl-logo" href="/">JADEY<span>.</span></a>
                    <div className="gl-nav-r">
                        <div className="gl-ndot" />
                        <a href="/all-work">All Projects</a>
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a className="gl-nav-contact" href="/#contact">Contact Me</a>
                    </div>
                    <button ref={hamburgerRef} className="gl-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* MOBILE DRAWER */}
            <div ref={drawerRef} className={`gl-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-label="Navigation menu">
                <button className="gl-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <a href="/all-work" onClick={() => setMenuOpen(false)}>All Projects</a>
                <a href="/#about" onClick={() => setMenuOpen(false)}>About Me</a>
                <a href="/#work" onClick={() => setMenuOpen(false)}>Work Highlights</a>
                <a href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <a href="/#insights" onClick={() => setMenuOpen(false)}>Blog</a>
                <a href="/#workshops" onClick={() => setMenuOpen(false)}>Workshops</a>
                <a className="gl-drawer-cta" href="/#contact" onClick={() => setMenuOpen(false)}>Contact Me</a>
            </div>

            {/* HERO */}
            <div className="gl-hero">
                <div className="gl-hero-inner">
                    <div className="gl-hero-ghost">GRACE LING</div>
                    <div className="gl-cat gl-rv">Brand Design</div>
                    <h1 className="gl-title gl-rv">Grace Ling</h1>
                    <div className="gl-meta-row gl-rv">
                        <div>
                            <div className="gl-meta-l">Client</div>
                            <div className="gl-meta-v">Grace Ling</div>
                        </div>
                        <div>
                            <div className="gl-meta-l">Services</div>
                            <div className="gl-meta-v">Personal Branding, Visual Design</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* COVER PHOTO */}
            <div className="gl-cover gl-rv">
                <div className="gl-cover-wrap">
                    <img
                        src="/Grace%20Ling%20Cover%20Photo.png"
                        alt="Grace Ling — Personal Brand Cover"
                    />
                </div>
            </div>

            {/* OVERVIEW — Problem + Goal */}
            <div className="gl-body">
                <div className="gl-overview gl-rv">
                    <div className="gl-ov-col">
                        <div className="gl-section-label">The Context</div>
                        <h2 className="gl-section-title">The Challenge</h2>
                        <p className="gl-section-body">
                            Grace Ling is an illustration designer with a strong and recognizable visual identity. Her work is expressive, polished, and consistent — making her brand memorable and distinct.
                        </p>
                        <p className="gl-section-body" style={{ marginTop: 12 }}>
                            With that strong foundation, this project focuses on exploration: how can her personal brand evolve by introducing a new visual direction?
                        </p>
                    </div>
                    <div className="gl-ov-col">
                        <div className="gl-section-label">The Goal</div>
                        <h2 className="gl-section-title">What We Set Out to Do</h2>
                        <p className="gl-section-body">
                            Instead of changing her identity, the goal was to expand it.
                        </p>
                        <ul className="gl-list" style={{ marginTop: 14 }}>
                            <li>Explore a new branding approach that contrasts her illustration style</li>
                            <li>Introduce a more structured and layout-driven visual system</li>
                            <li>Create a flexible direction she can use for different types of content</li>
                            <li>Maintain her identity while opening room for experimentation</li>
                        </ul>
                        <p className="gl-section-body" style={{ marginTop: 14 }}>
                            This approach allows her brand to grow without losing what already works.
                        </p>
                    </div>
                </div>

                <hr className="gl-divider" />

                {/* VISUAL DIRECTION — text left, image right */}
                <div className="gl-alt gl-rv">
                    <div className="gl-alt-content">
                        <div className="gl-tag">Visual Direction</div>
                        <h2 className="gl-alt-title">Moodboard &amp; Direction</h2>
                        <p className="gl-alt-body">
                            The direction focused on contrast and versatility.
                        </p>
                        <p className="gl-alt-body" style={{ marginTop: 12 }}>
                            Three key decisions shaped the approach:
                        </p>
                        <ul className="gl-list" style={{ marginTop: 10 }}>
                            <li>Shift from illustration-led visuals → to layout and typography-driven design</li>
                            <li>Use structured compositions → to create a more editorial feel</li>
                            <li>Apply controlled spacing and hierarchy → to guide content more clearly</li>
                        </ul>
                        <p className="gl-alt-body" style={{ marginTop: 12 }}>
                            This creates a complementary direction — expressive (existing style) alongside structured (new exploration).
                        </p>
                        <div className="gl-impact-row">
                            <div className="gl-impact-label">Impact</div>
                            <ul className="gl-impact-list">
                                <li>Expands her creative range</li>
                                <li>Makes the brand adaptable across different formats</li>
                            </ul>
                        </div>
                    </div>
                    <div className="gl-alt-img">
                        <img
                            src="/Grace%20Ling%20-%20Mood%20boarding.png"
                            alt="Grace Ling — Moodboard"
                        />
                    </div>
                </div>

                <hr className="gl-divider" />

                {/* BRAND SYSTEM */}
                <div className="gl-brand-grid gl-rv">
                    <div className="gl-section-label">Brand System</div>
                    <h2 className="gl-section-title">Building the System</h2>
                    <p className="gl-section-body" style={{ maxWidth: 680 }}>
                        This system is designed as an additional layer for her branding.
                    </p>
                    <div className="gl-brand-cards">
                        <div className="gl-brand-card">
                            <div className="gl-brand-card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="4 7 4 4 20 4 20 7"/>
                                    <line x1="9" y1="20" x2="15" y2="20"/>
                                    <line x1="12" y1="4" x2="12" y2="20"/>
                                </svg>
                            </div>
                            <div className="gl-brand-card-title">Typography</div>
                            <p className="gl-brand-card-body">
                                Header font: <strong>Roboto</strong>. Supporting text: <strong>Lato</strong>. Typography becomes the core visual driver — Roboto for clean, structured headlines; Lato for readable, balanced body text. Shifts focus from visual illustration to content clarity.
                            </p>
                        </div>
                        <div className="gl-brand-card">
                            <div className="gl-brand-card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="8" cy="9" r="3"/>
                                    <circle cx="16" cy="9" r="3"/>
                                    <circle cx="12" cy="17" r="3"/>
                                </svg>
                            </div>
                            <div className="gl-brand-card-title">Color</div>
                            <p className="gl-brand-card-body">
                                Simplified and intentional — neutral base for clarity with accent colors used selectively for emphasis. Highlights key information while maintaining a clean and modern feel.
                            </p>
                        </div>
                        <div className="gl-brand-card">
                            <div className="gl-brand-card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/>
                                    <line x1="12" y1="22" x2="12" y2="15.5"/>
                                    <polyline points="22 8.5 12 15.5 2 8.5"/>
                                </svg>
                            </div>
                            <div className="gl-brand-card-title">Elements</div>
                            <p className="gl-brand-card-body">
                                Clean layout containers, consistent spacing system, and minimal visual accents. No decorative elements — everything serves a structural purpose, making layouts easy to scale across content types.
                            </p>
                        </div>
                    </div>
                </div>

                <hr className="gl-divider" />

                {/* CORE APPLICATION — image left, text right */}
                <div className="gl-alt gl-rv">
                    <div className="gl-alt-img">
                        <img
                            src="/Grace%20Ling%20-%20Linkedin%20profile%20and%20cover%20mockup.png"
                            alt="Grace Ling — LinkedIn Profile and Cover Mockup"
                        />
                    </div>
                    <div className="gl-alt-content">
                        <div className="gl-tag">Core Application</div>
                        <h2 className="gl-alt-title">LinkedIn Profile &amp; Cover</h2>
                        <p className="gl-alt-body">
                            The profile and cover introduce this new direction at the first touchpoint.
                        </p>
                        <ul className="gl-list" style={{ marginTop: 12 }}>
                            <li>Typography-driven layout</li>
                            <li>Structured composition</li>
                            <li>Clear information hierarchy</li>
                        </ul>
                        <div className="gl-impact-row">
                            <div className="gl-impact-label">Impact</div>
                            <ul className="gl-impact-list">
                                <li>Presents a more versatile side of her personal brand</li>
                                <li>Strengthens professional positioning</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="gl-divider" />

                {/* EDUCATIONAL CONTENT — text left, image right */}
                <div className="gl-alt gl-rv">
                    <div className="gl-alt-content">
                        <div className="gl-tag">Educational Content</div>
                        <h2 className="gl-alt-title">Carousel Design</h2>
                        <p className="gl-alt-body">
                            This format explores how structured layouts can support storytelling.
                        </p>
                        <ul className="gl-list" style={{ marginTop: 12 }}>
                            <li>One idea per slide</li>
                            <li>Clear hierarchy between headline and details</li>
                            <li>Consistent layout system</li>
                        </ul>
                        <div className="gl-impact-row">
                            <div className="gl-impact-label">Impact</div>
                            <ul className="gl-impact-list">
                                <li>Easier to follow content</li>
                                <li>Better balance between clarity and creativity</li>
                            </ul>
                        </div>
                    </div>
                    <div className="gl-alt-img">
                        <img
                            src="/Grace%20Ling%20-%20Carousel.png"
                            alt="Grace Ling — Carousel"
                        />
                    </div>
                </div>

                <hr className="gl-divider" />

                {/* BRAND PRESENCE — text left, stacked banners right */}
                <div className="gl-alt gl-rv">
                    <div className="gl-alt-content">
                        <div className="gl-tag">Brand Presence</div>
                        <h2 className="gl-alt-title">Banner &amp; Visual Identity</h2>
                        <p className="gl-alt-body">
                            Multiple banner variations showcase the flexibility of this direction.
                        </p>
                        <ul className="gl-list" style={{ marginTop: 12 }}>
                            <li>Consistent layout and typography across all variations</li>
                            <li>Structured composition that translates across formats</li>
                            <li>Demonstrates range without breaking the system</li>
                        </ul>
                        <div className="gl-impact-row">
                            <div className="gl-impact-label">Impact</div>
                            <ul className="gl-impact-list">
                                <li>Cleaner presentation across screen sizes</li>
                                <li>Reinforces the structured direction of the brand</li>
                            </ul>
                        </div>
                    </div>
                    <div className="gl-banner-grid">
                        <div className="gl-alt-img">
                            <img
                                src="/Grace%20Ling%20-%20Banner%201.png"
                                alt="Grace Ling — Banner 1"
                            />
                        </div>
                        <div className="gl-alt-img">
                            <img
                                src="/Grace%20Ling%20-%20Banner%202.png"
                                alt="Grace Ling — Banner 2"
                            />
                        </div>
                    </div>
                </div>

            </div>

            {/* IMPACT FINAL */}
            <div className="gl-impact-final">
                <div className="gl-impact-final-inner gl-rv">
                    <div className="gl-section-label">Results</div>
                    <h2 className="gl-section-title">The Impact</h2>
                    <p className="gl-section-body" style={{ maxWidth: 680 }}>
                        The result is a flexible extension of Grace Ling&apos;s personal brand.
                    </p>
                    <p className="gl-section-body" style={{ maxWidth: 680, marginTop: 12 }}>
                        This is not a shift away from her identity — but an expansion of it. A system that allows both expression and structure to coexist.
                    </p>
                    <div className="gl-impact-stats">
                        <div className="gl-stat">
                            <div className="gl-stat-num">+</div>
                            <div className="gl-stat-label">Adds a structured and content-focused design approach alongside her existing style</div>
                        </div>
                        <div className="gl-stat">
                            <div className="gl-stat-num">↑</div>
                            <div className="gl-stat-label">Expands how her brand can be expressed across different formats</div>
                        </div>
                        <div className="gl-stat">
                            <div className="gl-stat-num">✦</div>
                            <div className="gl-stat-label">Creates more opportunities for experimentation without losing identity</div>
                        </div>
                        <div className="gl-stat">
                            <div className="gl-stat-num">∞</div>
                            <div className="gl-stat-label">A system built for both expression and structure to coexist</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* NEXT PROJECT */}
            <div className="gl-next">
                <div className="gl-next-inner gl-rv">
                    <div className="gl-next-preview">
                        <img
                            src="/Parves%20Shahid%20Cover%20Photo.png"
                            alt="Parves Shahid"
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.05)" }}
                        />
                        <div className="gl-next-preview-overlay">
                            <div className="gl-next-preview-cat">Brand Design</div>
                            <div className="gl-next-preview-name">Parves Shahid</div>
                        </div>
                    </div>
                    <div>
                        <div className="gl-next-tag">Next Project</div>
                        <div className="gl-next-title">Parves Shahid</div>
                        <p className="gl-next-desc">Personal brand system for an AI creator — visual identity, carousel, infographic, and banner designed around consistency and recognition.</p>
                        <div className="gl-next-actions">
                            <a className="gl-btn" href="/all-work/parves-shahid">View Project →</a>
                            <a className="gl-ghost-btn" href="/all-work">All Work</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="gl-foot">
                <div className="gl-foot-inner">
                    <a className="gl-flogo" href="/">JADEY<span>.</span></a>
                    <div className="gl-fcopy">© 2025 Jane Dhell Cagas. All rights reserved.</div>
                    <div className="gl-flinks">
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a href="/#contact">Contact</a>
                        <a className="gl-fall" href="/all-work">All Projects →</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
