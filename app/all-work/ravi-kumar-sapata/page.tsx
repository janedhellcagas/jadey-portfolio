'use client'
import { useState, useEffect, useRef } from "react"

const CSS = `
:root{--bg:#0a0a08;--bg2:#111110;--paper:#f0ebe0;--pu:#9B59D0;--pu2:#B07AE0;--pu3:#7A3AB8;--muted:rgba(240,235,224,0.38);--border:rgba(240,235,224,0.12);--pborder:rgba(155,89,208,0.3);--pbg:rgba(155,89,208,0.08);--max:1440px;--pad:44px}
.rk*{box-sizing:border-box;margin:0;padding:0}
.rk{font-family:'Space Mono',monospace;background:var(--bg);color:var(--paper);min-height:100vh;overflow-x:hidden;width:100%}
/* NAV */
.rk-nav{position:fixed;top:0;left:0;right:0;z-index:500;background:rgba(10,10,8,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:top .3s}
.rk-nav-inner{max-width:var(--max);margin:0 auto;padding:18px var(--pad);display:flex;align-items:center;justify-content:space-between}
.rk-logo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.rk-logo span{color:var(--pu)}
.rk-nav-r{display:none;align-items:center;gap:14px}
.rk-nav-r a{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.rk-nav-r a:hover{color:var(--pu)}
.rk-nav-contact{background:var(--pu)!important;color:var(--bg)!important;padding:9px 20px!important;font-weight:700!important;border:2px solid var(--pu)!important;display:inline-block!important}
.rk-nav-contact:hover{background:var(--pu2)!important;border-color:var(--pu2)!important}
.rk-ndot{width:7px;height:7px;background:var(--pu);border-radius:50%;animation:rk-pulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes rk-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.85)}}
.rk-abar{position:fixed;top:0;left:0;right:0;z-index:499;background:var(--pu3);padding:9px var(--pad);height:38px;display:none;align-items:center;justify-content:center;gap:8px}
.rk-abar.show{display:flex}
.rk-abar span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:white;font-weight:700}
.rk-adot{width:5px;height:5px;background:white;border-radius:50%;animation:rk-pulse 2s ease-in-out infinite}
/* HERO */
.rk-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#2E1050,#6B3FA0)}
.rk-hero-inner{max-width:var(--max);margin:0 auto;padding:140px var(--pad) 60px;position:relative}
.rk-hero-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,9vw,140px);letter-spacing:-4px;color:rgba(240,235,224,0.035);white-space:nowrap;pointer-events:none;text-align:center;width:100%}
.rk-cat{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,0.6);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.rk-cat::before{content:'';width:36px;height:1px;background:rgba(255,255,255,0.4)}
.rk-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,9vw,120px);letter-spacing:-2px;line-height:.88;color:#fff;margin-bottom:32px}
.rk-meta-row{display:flex;gap:44px;flex-wrap:wrap;padding-top:28px;border-top:1px solid rgba(255,255,255,0.15)}
.rk-meta-l{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:4px}
.rk-meta-v{font-size:11px;color:#fff;font-weight:700}
/* BODY */
.rk-body{padding:0}
/* OVERVIEW */
.rk-overview{max-width:var(--max);margin:0 auto;padding:72px var(--pad);display:grid;grid-template-columns:1fr 1fr;gap:60px}
.rk-ov-col{}
.rk-section-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:10px}
.rk-section-label::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.rk-section-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(26px,4vw,46px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px}
.rk-section-body{font-size:12px;line-height:1.95;color:var(--muted)}
.rk-list{color:var(--muted);list-style:none;padding:0;margin:0;font-size:12px;line-height:1.95}
.rk-list li{padding-left:18px;position:relative;margin-bottom:4px}
.rk-list li::before{content:'•';position:absolute;left:0;color:var(--pu)}
/* DIVIDER */
.rk-divider{border:none;border-top:1px solid var(--border);max-width:var(--max);margin:0 auto}
/* ALT ROW */
.rk-alt{max-width:var(--max);margin:0 auto;padding:72px var(--pad);display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.rk-alt-img{overflow:hidden;border:1px solid var(--border);position:relative}
.rk-alt-img img{width:100%;height:auto;display:block}
.rk-alt-content{}
.rk-tag{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:8px}
.rk-tag::after{content:'';width:28px;height:1px;background:var(--pu)}
.rk-alt-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(24px,3.5vw,42px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px;line-height:1}
.rk-alt-body{font-size:12px;line-height:1.95;color:var(--muted)}
.rk-impact-row{margin-top:20px;padding-top:18px;border-top:1px solid var(--border)}
.rk-impact-label{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(240,235,224,0.4);margin-bottom:8px}
.rk-impact-list{list-style:none;padding:0;margin:0;font-size:11px;line-height:1.9;color:var(--muted)}
.rk-impact-list li{padding-left:16px;position:relative;margin-bottom:2px}
.rk-impact-list li::before{content:'→';position:absolute;left:0;color:var(--pu);font-size:9px;top:2px}
/* BARE IMAGE — no border/bg, image only */
.rk-alt-img--bare{border:none!important;overflow:visible;background:transparent}
.rk-alt-img--bare img{width:100%;height:auto;max-height:560px;object-fit:contain;object-position:center top;display:block}
/* BRAND SYSTEM GRID */
.rk-brand-grid{max-width:var(--max);margin:0 auto;padding:72px var(--pad)}
.rk-brand-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:32px}
.rk-brand-card{background:var(--bg2);border:1px solid var(--border);padding:28px 24px}
.rk-brand-card-icon{width:40px;height:40px;background:var(--pbg);border:1px solid var(--pborder);display:flex;align-items:center;justify-content:center;margin-bottom:14px;color:var(--pu)}
.rk-brand-card-title{font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:.5px;color:var(--paper);margin-bottom:8px}
.rk-brand-card-body{font-size:11px;line-height:1.85;color:var(--muted)}
/* COVER IMAGE */
.rk-cover{padding:52px var(--pad) 0}
.rk-cover-wrap{max-width:1425px;margin:0 auto;overflow:hidden}
.rk-cover-wrap img{width:100%;height:auto;display:block}
/* IMPACT FINAL */
.rk-impact-final{max-width:var(--max);margin:0 auto;padding:72px var(--pad);background:var(--bg2)}
.rk-impact-final-inner{max-width:var(--max);margin:0 auto}
.rk-impact-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:40px}
.rk-stat{border-left:2px solid var(--pu);padding-left:18px}
.rk-stat-num{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,48px);letter-spacing:-1px;color:var(--paper);line-height:1}
.rk-stat-label{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:4px;line-height:1.6}
/* NEXT PROJECT */
.rk-next{background:var(--bg2)}
.rk-next-inner{max-width:var(--max);margin:0 auto;padding:64px var(--pad);display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:center}
.rk-next-preview{position:relative;overflow:hidden;aspect-ratio:4/3;border:1px solid var(--border)}
.rk-next-preview-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px}
.rk-next-preview-cat{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:6px}
.rk-next-preview-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(16px,2.2vw,26px);letter-spacing:-.5px;color:#fff;line-height:1}
.rk-next-tag{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.rk-next-tag::after{content:'';width:36px;height:1px;background:var(--pu)}
.rk-next-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4.5vw,56px);letter-spacing:-1px;color:var(--paper);line-height:.92;margin-bottom:14px}
.rk-next-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:380px;margin-bottom:28px}
.rk-next-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.rk-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;background:var(--pu);color:var(--bg);border:2px solid var(--pu);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.rk-btn:hover{background:var(--pu2);border-color:var(--pu2)}
.rk-ghost-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.rk-ghost-btn:hover{border-color:var(--pu);color:var(--pu)}
/* FOOTER */
.rk-foot{border-top:1px solid var(--border)}
.rk-foot-inner{max-width:var(--max);margin:0 auto;padding:44px var(--pad);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.rk-flogo{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.rk-flogo span{color:var(--pu)}
.rk-fcopy{font-size:9px;color:var(--muted)}
.rk-flinks{display:flex;gap:18px;flex-wrap:wrap;align-items:center}
.rk-flinks a{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.rk-flinks a:hover{color:var(--pu)}
.rk-fall{color:var(--pu)!important}
/* REVEAL */
.rk-rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.rk-rv.in{opacity:1;transform:translateY(0)}
/* MOBILE DRAWER */
.rk-hamburger{display:flex;flex-direction:column;gap:5px;cursor:pointer;background:transparent;border:none;padding:6px}
.rk-hamburger span{display:block;width:24px;height:2px;background:var(--paper);transition:all .3s}
.rk-drawer{position:fixed;inset:0;z-index:600;background:var(--bg);transform:translateX(100%);transition:transform .35s ease;display:flex;flex-direction:column;padding:88px 28px 40px;overflow-y:auto}
.rk-drawer.open{transform:translateX(0)}
.rk-drawer-close{position:absolute;top:22px;right:24px;background:transparent;border:none;color:var(--paper);font-size:22px;cursor:pointer;line-height:1}
.rk-drawer a{font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;padding:18px 0;border-bottom:1px solid var(--border);transition:color .2s;display:block}
.rk-drawer a:hover,.rk-drawer a:active{color:var(--pu)}
.rk-drawer-cta{background:var(--pu);color:var(--bg)!important;padding:14px 0!important;font-weight:700;border-bottom:none!important;text-align:center;margin-top:20px;display:block;font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;transition:background .2s}
.rk-drawer-cta:hover{background:var(--pu2)}
/* ===== RESPONSIVE ===== */
@media(max-width:1023px){
  :root{--pad:32px}
  .rk-nav-inner{padding:14px 28px}
  .rk-overview{grid-template-columns:1fr;gap:40px}
  .rk-alt{grid-template-columns:1fr;gap:32px}
  .rk-brand-cards{grid-template-columns:repeat(2,1fr)}
  .rk-impact-stats{grid-template-columns:repeat(2,1fr)}
  .rk-next-inner{grid-template-columns:1fr;gap:32px}
}
@media(max-width:768px){
  :root{--pad:24px}
  .rk-hero-inner{padding:110px var(--pad) 44px}
  .rk-overview{padding:52px var(--pad)}
  .rk-alt{padding:52px var(--pad)}
  .rk-brand-grid{padding:52px var(--pad)}
  .rk-brand-cards{grid-template-columns:1fr}
  .rk-cover{padding:36px var(--pad) 0}
  .rk-impact-final{padding:52px var(--pad) 52px}
  .rk-impact-stats{grid-template-columns:repeat(2,1fr);gap:20px}
  .rk-next-inner{padding:44px var(--pad)}
  .rk-meta-row{gap:24px}
  .rk-foot-inner{flex-direction:column;align-items:flex-start;gap:20px;padding:32px var(--pad)}
  .rk-flinks{flex-direction:column;gap:10px;align-items:flex-start}
  .rk-next-actions{flex-direction:column;align-items:flex-start}
  .rk-btn,.rk-ghost-btn{width:100%;text-align:center;display:block}
}
@media(max-width:480px){
  :root{--pad:16px}
  .rk-abar{padding:9px 16px}
  .rk-abar span{font-size:7px}
  .rk-meta-row{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
  .rk-impact-stats{grid-template-columns:1fr;gap:14px}
}
@media(hover:none),(pointer:coarse){
  .rk-hamburger{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center}
  .rk-nav-r{display:none}
  .rk-btn,.rk-ghost-btn{min-height:44px;display:inline-flex;align-items:center;justify-content:center}
}
@media(min-width:1024px){
  .rk-hamburger{display:none}
  .rk-nav-r{display:flex}
}
@media(prefers-reduced-motion:reduce){
  .rk-rv{transition:none;opacity:1;transform:none}
  .rk-drawer{transition:none}
  .rk-ndot,.rk-adot{animation:none}
}
`

export default function RaviKumarSapataPage() {
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
        const els = Array.from(ref.current?.querySelectorAll(".rk-rv") || [])
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
        <div className="rk" ref={ref}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" />
            <style>{CSS}</style>

            {/* AVAILABLE BAR */}
            <div className={`rk-abar${navScroll ? " show" : ""}`}>
                <div className="rk-adot" />
                <span>Available for new projects</span>
            </div>

            {/* NAV */}
            <nav className="rk-nav" style={{ top: navScroll ? "38px" : "0" }}>
                <div className="rk-nav-inner">
                    <a className="rk-logo" href="/">JADEY<span>.</span></a>
                    <div className="rk-nav-r">
                        <div className="rk-ndot" />
                        <a href="/all-work">All Projects</a>
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a className="rk-nav-contact" href="/#contact">Contact Me</a>
                    </div>
                    <button ref={hamburgerRef} className="rk-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* MOBILE DRAWER */}
            <div ref={drawerRef} className={`rk-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-label="Navigation menu">
                <button className="rk-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <a href="/all-work" onClick={() => setMenuOpen(false)}>All Projects</a>
                <a href="/#about" onClick={() => setMenuOpen(false)}>About Me</a>
                <a href="/#work" onClick={() => setMenuOpen(false)}>Work Highlights</a>
                <a href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <a href="/#insights" onClick={() => setMenuOpen(false)}>Blog</a>
                <a href="/#workshops" onClick={() => setMenuOpen(false)}>Workshops</a>
                <a className="rk-drawer-cta" href="/#contact" onClick={() => setMenuOpen(false)}>Contact Me</a>
            </div>

            {/* HERO */}
            <div className="rk-hero">
                <div className="rk-hero-inner">
                    <div className="rk-hero-ghost">RAVI KUMAR SAPATA</div>
                    <div className="rk-cat rk-rv">Brand Design</div>
                    <h1 className="rk-title rk-rv">Ravi Kumar Sapata</h1>
                    <div className="rk-meta-row rk-rv">
                        <div>
                            <div className="rk-meta-l">Client</div>
                            <div className="rk-meta-v">Ravi Kumar Sapata</div>
                        </div>
                        <div>
                            <div className="rk-meta-l">Services</div>
                            <div className="rk-meta-v">Personal Branding, Visual Design</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* COVER PHOTO */}
            <div className="rk-cover rk-rv">
                <div className="rk-cover-wrap">
                    <img
                        src="/Ravi%20kumar%20sapata%20Cover%20Photo.png"
                        alt="Ravi Kumar Sapata — Personal Brand Cover"
                    />
                </div>
            </div>

            {/* OVERVIEW — Problem + Goal */}
            <div className="rk-body">
                <div className="rk-overview rk-rv">
                    <div className="rk-ov-col">
                        <div className="rk-section-label">The Problem</div>
                        <h2 className="rk-section-title">The Challenge</h2>
                        <p className="rk-section-body">
                            Ravi Kumar Sapata shares strong, opinion-driven insights. The content is bold by nature — but without a distinct visual system, it risks being overlooked in fast-scrolling environments.
                        </p>
                        <p className="rk-section-body" style={{ marginTop: 12 }}>
                            From the visuals:
                        </p>
                        <ul className="rk-list" style={{ marginTop: 8 }}>
                            <li>Key statements did not stand out immediately</li>
                            <li>Layouts lacked a strong focal point</li>
                            <li>Content blended into the feed instead of capturing attention</li>
                        </ul>
                        <p className="rk-section-body" style={{ marginTop: 12 }}>
                            Because of this:
                        </p>
                        <ul className="rk-list" style={{ marginTop: 8 }}>
                            <li>Users scroll past before engaging</li>
                            <li>Strong ideas lose their impact</li>
                            <li>The personal brand is not instantly recognizable</li>
                        </ul>
                    </div>
                    <div className="rk-ov-col">
                        <div className="rk-section-label">The Goal</div>
                        <h2 className="rk-section-title">What We Set Out to Do</h2>
                        <p className="rk-section-body">
                            The goal was to visually amplify Ravi&apos;s voice — so bold ideas land immediately, not after the user has already scrolled past.
                        </p>
                        <ul className="rk-list" style={{ marginTop: 14 }}>
                            <li>Make bold ideas visually immediate</li>
                            <li>Create a strong and recognizable identity</li>
                            <li>Introduce a high-impact visual system</li>
                            <li>Ensure consistency across all content formats</li>
                        </ul>
                    </div>
                </div>

                <hr className="rk-divider" />

                {/* MOODBOARD — text left, image right */}
                <div className="rk-alt rk-rv">
                    <div className="rk-alt-content">
                        <div className="rk-tag">Visual Direction</div>
                        <h2 className="rk-alt-title">Moodboard &amp; Direction</h2>
                        <p className="rk-alt-body">
                            The direction focused on contrast, emphasis, and energy.
                        </p>
                        <p className="rk-alt-body" style={{ marginTop: 12 }}>
                            Three decisions shaped the visual approach:
                        </p>
                        <ul className="rk-list" style={{ marginTop: 10 }}>
                            <li>Dark background → creates depth and removes distractions</li>
                            <li>High-contrast accent color → highlights key words and ideas</li>
                            <li>Expressive elements → add energy and personality to the layout</li>
                        </ul>
                        <p className="rk-alt-body" style={{ marginTop: 12 }}>
                            Why: Thought-leadership content competes for attention — it needs to stand out instantly.
                        </p>
                        <div className="rk-impact-row">
                            <div className="rk-impact-label">Impact</div>
                            <ul className="rk-impact-list">
                                <li>Content becomes visually striking</li>
                                <li>Users notice key ideas immediately</li>
                                <li>Stronger presence in crowded feeds</li>
                            </ul>
                        </div>
                    </div>
                    <div className="rk-alt-img">
                        <img
                            src="/Ravi%20kumar%20sapata%20-%20Mood%20Boarding.png"
                            alt="Ravi Kumar Sapata — Moodboard"
                        />
                    </div>
                </div>

                <hr className="rk-divider" />

                {/* BRAND SYSTEM */}
                <div className="rk-brand-grid rk-rv">
                    <div className="rk-section-label">Brand System</div>
                    <h2 className="rk-section-title">Building the System</h2>
                    <p className="rk-section-body" style={{ maxWidth: 680 }}>
                        Every element is built to give Ravi&apos;s content immediate visual authority — so the ideas hit before the user has a chance to scroll away.
                    </p>
                    <div className="rk-brand-cards">
                        <div className="rk-brand-card">
                            <div className="rk-brand-card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="4 7 4 4 20 4 20 7"/>
                                    <line x1="9" y1="20" x2="15" y2="20"/>
                                    <line x1="12" y1="4" x2="12" y2="20"/>
                                </svg>
                            </div>
                            <div className="rk-brand-card-title">Typography</div>
                            <p className="rk-brand-card-body">
                                Header font: <strong>Oswald</strong>. Supporting text: <strong>Poppins</strong>. Oswald drives bold, high-impact headlines — the kind that stop a scroll. Poppins handles supporting text with clarity and calm. Without strong typography, bold ideas lose authority.
                            </p>
                        </div>
                        <div className="rk-brand-card">
                            <div className="rk-brand-card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="8" cy="9" r="3"/>
                                    <circle cx="16" cy="9" r="3"/>
                                    <circle cx="12" cy="17" r="3"/>
                                </svg>
                            </div>
                            <div className="rk-brand-card-title">Color</div>
                            <p className="rk-brand-card-body">
                                A dark base keeps focus entirely on the content. A bright accent color guides the eye to the most important words. Contrast is essential for visibility — users are directed to key messages before anything else.
                            </p>
                        </div>
                        <div className="rk-brand-card">
                            <div className="rk-brand-card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/>
                                    <line x1="12" y1="22" x2="12" y2="15.5"/>
                                    <polyline points="22 8.5 12 15.5 2 8.5"/>
                                </svg>
                            </div>
                            <div className="rk-brand-card-title">Elements</div>
                            <p className="rk-brand-card-body">
                                Dynamic shapes, highlight strokes, and structured layout blocks — used to reinforce personality. Clean layouts alone wouldn&apos;t match Ravi&apos;s tone. The design needed energy. Content feels expressive and the visual identity becomes distinct.
                            </p>
                        </div>
                    </div>
                </div>

                <hr className="rk-divider" />

                {/* LINKEDIN — image left, text right */}
                <div className="rk-alt rk-rv">
                    <div className="rk-alt-img">
                        <img
                            src="/Ravi%20kumar%20sapata%20-%20Linkedin%20profile%20and%20cover%20mockup.png"
                            alt="Ravi Kumar Sapata — LinkedIn Profile and Cover Mockup"
                        />
                    </div>
                    <div className="rk-alt-content">
                        <div className="rk-tag">Core Application</div>
                        <h2 className="rk-alt-title">LinkedIn Profile &amp; Cover</h2>
                        <p className="rk-alt-body">
                            The profile is the first impression. Before anyone reads a post, they see the banner and the profile layout — it either builds credibility or loses the user.
                        </p>
                        <p className="rk-alt-body" style={{ marginTop: 12 }}>
                            Design applied:
                        </p>
                        <ul className="rk-list" style={{ marginTop: 8 }}>
                            <li>Strong typography to communicate authority</li>
                            <li>High-contrast visuals that match the content&apos;s energy</li>
                            <li>Consistent system that extends the brand across the full profile</li>
                        </ul>
                        <div className="rk-impact-row">
                            <div className="rk-impact-label">Impact</div>
                            <ul className="rk-impact-list">
                                <li>Immediate recognition as a bold, opinionated voice</li>
                                <li>Strong personal brand presence from the first glance</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="rk-divider" />

                {/* CAROUSEL — text left, image right */}
                <div className="rk-alt rk-rv">
                    <div className="rk-alt-content">
                        <div className="rk-tag">Educational Content</div>
                        <h2 className="rk-alt-title">Carousel Design</h2>
                        <p className="rk-alt-body">
                            Long-form opinions are difficult to consume quickly. When every slide competes for attention, the argument gets lost.
                        </p>
                        <p className="rk-alt-body" style={{ marginTop: 12 }}>
                            Design decision:
                        </p>
                        <ul className="rk-list" style={{ marginTop: 8 }}>
                            <li>One key idea per slide</li>
                            <li>Strong headline per frame to anchor the argument</li>
                            <li>Minimal supporting text — enough context, nothing extra</li>
                        </ul>
                        <div className="rk-impact-row">
                            <div className="rk-impact-label">Impact</div>
                            <ul className="rk-impact-list">
                                <li>Easier to follow arguments slide by slide</li>
                                <li>Higher engagement — focused slides invite interaction</li>
                                <li>More shareable content that stands alone per frame</li>
                            </ul>
                        </div>
                    </div>
                    <div className="rk-alt-img">
                        <img
                            src="/Ravi%20kumar%20sapata%20-%20Carousel.png"
                            alt="Ravi Kumar Sapata — Carousel"
                        />
                    </div>
                </div>

                <hr className="rk-divider" />

                {/* BANNER — text left, image right */}
                <div className="rk-alt rk-rv">
                    <div className="rk-alt-content">
                        <div className="rk-tag">Brand Presence</div>
                        <h2 className="rk-alt-title">Banner System</h2>
                        <p className="rk-alt-body">
                            Banners are the visual environment surrounding the content. Without a clear system, the profile looks inconsistent even when individual posts are well-designed.
                        </p>
                        <p className="rk-alt-body" style={{ marginTop: 12 }}>
                            The same visual system applied here ensures the brand identity carries through at every level — not only within posts, but across the entire profile experience.
                        </p>
                        <div className="rk-impact-row">
                            <div className="rk-impact-label">Impact</div>
                            <ul className="rk-impact-list">
                                <li>Cleaner, more cohesive profile presentation</li>
                                <li>Instant brand recognition across all touchpoints</li>
                                <li>Professional environment that reinforces credibility</li>
                            </ul>
                        </div>
                    </div>
                    <div className="rk-alt-img rk-alt-img--bare">
                        <img
                            src="/Ravi%20kumar%20sapata%20-%20Banner.png"
                            alt="Ravi Kumar Sapata — Banner"
                        />
                    </div>
                </div>

            </div>

            {/* IMPACT FINAL */}
            <div className="rk-impact-final">
                <div className="rk-impact-final-inner rk-rv">
                    <div className="rk-section-label">Results</div>
                    <h2 className="rk-section-title">The Impact</h2>
                    <p className="rk-section-body" style={{ maxWidth: 680 }}>
                        The result is a bold and cohesive personal brand system — built around Ravi&apos;s voice, not just around aesthetics. Content stands out instantly. Key ideas are immediately visible. The visual identity is strong and consistent across every format.
                    </p>
                    <p className="rk-section-body" style={{ maxWidth: 680, marginTop: 12 }}>
                        Not just visually striking — but aligned with how the content is meant to be experienced.
                    </p>
                    <div className="rk-impact-stats">
                        <div className="rk-stat">
                            <div className="rk-stat-num">↑</div>
                            <div className="rk-stat-label">Content stands out — bold ideas land before users scroll past</div>
                        </div>
                        <div className="rk-stat">
                            <div className="rk-stat-num">1</div>
                            <div className="rk-stat-label">Unified visual system applied across carousel, banner, and profile</div>
                        </div>
                        <div className="rk-stat">
                            <div className="rk-stat-num">✦</div>
                            <div className="rk-stat-label">Key messages are immediately visible across every piece of content</div>
                        </div>
                        <div className="rk-stat">
                            <div className="rk-stat-num">→</div>
                            <div className="rk-stat-label">Stronger engagement — a recognized identity drives consistent interaction</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* NEXT PROJECT */}
            <div className="rk-next">
                <div className="rk-next-inner rk-rv">
                    <div className="rk-next-preview">
                        <img
                            src="/Mariam%20Khawar%20Cover%20Photo.png"
                            alt="Mariam Khawar"
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.05)" }}
                        />
                        <div className="rk-next-preview-overlay">
                            <div className="rk-next-preview-cat">Brand Design</div>
                            <div className="rk-next-preview-name">Mariam Khawar</div>
                        </div>
                    </div>
                    <div>
                        <div className="rk-next-tag">Next Project</div>
                        <div className="rk-next-title">Mariam Khawar</div>
                        <p className="rk-next-desc">Personal brand system built for educational content — structured layouts and clear hierarchy that make information easier to process and retain.</p>
                        <div className="rk-next-actions">
                            <a className="rk-btn" href="/all-work/mariam-khawar">View Project →</a>
                            <a className="rk-ghost-btn" href="/all-work">All Work</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="rk-foot">
                <div className="rk-foot-inner">
                    <a className="rk-flogo" href="/">JADEY<span>.</span></a>
                    <div className="rk-fcopy">© 2025 Jane Dhell Cagas. All rights reserved.</div>
                    <div className="rk-flinks">
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a href="/#contact">Contact</a>
                        <a className="rk-fall" href="/all-work">All Projects →</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
