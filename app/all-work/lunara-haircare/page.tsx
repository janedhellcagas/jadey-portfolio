'use client'
import { useState, useEffect, useRef } from "react"

const CSS = `
:root{--bg:#0a0a08;--bg2:#111110;--paper:#f0ebe0;--pu:#9B59D0;--pu2:#B07AE0;--pu3:#7A3AB8;--muted:rgba(240,235,224,0.38);--border:rgba(240,235,224,0.12);--pbg:rgba(155,89,208,0.08);--max:1440px;--pad:44px}
.lhc*{box-sizing:border-box;margin:0;padding:0}
.lhc{font-family:'Space Mono',monospace;background:var(--bg);color:var(--paper);min-height:100vh;overflow-x:hidden;width:100%}
/* NAV */
.lhc-nav{position:fixed;top:0;left:0;right:0;z-index:500;background:rgba(10,10,8,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:top .3s}
.lhc-nav-inner{max-width:var(--max);margin:0 auto;padding:18px var(--pad);display:flex;align-items:center;justify-content:space-between}
.lhc-logo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.lhc-logo span{color:var(--pu)}
.lhc-nav-r{display:none;align-items:center;gap:14px}
.lhc-nav-r a{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.lhc-nav-r a:hover{color:var(--pu)}
.lhc-nav-contact{background:var(--pu)!important;color:var(--bg)!important;padding:9px 20px!important;font-weight:700!important;border:2px solid var(--pu)!important;display:inline-block!important}
.lhc-nav-contact:hover{background:var(--pu2)!important;border-color:var(--pu2)!important}
.lhc-ndot{width:7px;height:7px;background:var(--pu);border-radius:50%;animation:lhc-pulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes lhc-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.85)}}
.lhc-abar{position:fixed;top:0;left:0;right:0;z-index:499;background:var(--pu3);padding:9px var(--pad);height:38px;display:none;align-items:center;justify-content:center;gap:8px}
.lhc-abar.show{display:flex}
.lhc-abar span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:white;font-weight:700}
.lhc-adot{width:5px;height:5px;background:white;border-radius:50%;animation:lhc-pulse 2s ease-in-out infinite}
/* HERO */
.lhc-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#2E1050,#6B3FA0)}
.lhc-hero-inner{max-width:var(--max);margin:0 auto;padding:140px var(--pad) 60px;position:relative}
.lhc-hero-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,9vw,140px);letter-spacing:-4px;color:rgba(240,235,224,0.035);white-space:nowrap;pointer-events:none;text-align:center;width:100%}
.lhc-cat{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,0.6);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.lhc-cat::before{content:'';width:36px;height:1px;background:rgba(255,255,255,0.4)}
.lhc-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,9vw,120px);letter-spacing:-2px;line-height:.88;color:#fff;margin-bottom:32px}
.lhc-meta-row{display:flex;gap:44px;flex-wrap:wrap;padding-top:28px;border-top:1px solid rgba(255,255,255,0.15)}
.lhc-meta-l{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:4px}
.lhc-meta-v{font-size:11px;color:#fff;font-weight:700}
/* BODY */
.lhc-body{padding:0}
/* COVER */
.lhc-cover{padding:52px var(--pad) 0}
.lhc-cover-wrap{max-width:1425px;margin:0 auto;overflow:hidden}
.lhc-cover-wrap img{width:100%;height:auto;display:block}
/* OVERVIEW — 2-col */
.lhc-overview{max-width:var(--max);margin:0 auto;padding:72px var(--pad);display:grid;grid-template-columns:1fr 1fr;gap:60px}
.lhc-ov-col{}
.lhc-section-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:10px}
.lhc-section-label::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.lhc-section-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(26px,4vw,46px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px}
.lhc-section-body{font-size:12px;line-height:1.95;color:var(--muted)}
.lhc-list{color:var(--muted);list-style:none;padding:0;margin:0;font-size:12px;line-height:1.95}
.lhc-list li{padding-left:18px;position:relative;margin-bottom:4px}
.lhc-list li::before{content:'•';position:absolute;left:0;color:var(--pu)}
/* DIVIDER */
.lhc-divider{border:none;border-top:1px solid var(--border);max-width:var(--max);margin:0 auto}
/* ALT ROW */
.lhc-alt{max-width:var(--max);margin:0 auto;padding:72px var(--pad);display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.lhc-alt-img{overflow:hidden;border:1px solid var(--border);position:relative}
.lhc-alt-img img{width:100%;height:auto;display:block}
.lhc-tag{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:8px}
.lhc-tag::after{content:'';width:28px;height:1px;background:var(--pu)}
.lhc-alt-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(24px,3.5vw,42px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px;line-height:1}
.lhc-alt-body{font-size:12px;line-height:1.95;color:var(--muted)}
.lhc-impact-row{margin-top:20px;padding-top:18px;border-top:1px solid var(--border)}
.lhc-impact-label{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(240,235,224,0.4);margin-bottom:8px}
.lhc-impact-list{list-style:none;padding:0;margin:0;font-size:11px;line-height:1.9;color:var(--muted)}
.lhc-impact-list li{padding-left:16px;position:relative;margin-bottom:2px}
.lhc-impact-list li::before{content:'→';position:absolute;left:0;color:var(--pu);font-size:9px;top:2px}
/* IMPACT FINAL */
.lhc-impact-final{max-width:var(--max);margin:0 auto;padding:72px var(--pad);background:var(--bg2)}
.lhc-impact-final-inner{max-width:var(--max);margin:0 auto}
.lhc-impact-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:40px}
.lhc-stat{border-left:2px solid var(--pu);padding-left:18px}
.lhc-stat-num{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,48px);letter-spacing:-1px;color:var(--paper);line-height:1}
.lhc-stat-label{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:4px;line-height:1.6}
/* NEXT PROJECT */
.lhc-next{background:var(--bg2)}
.lhc-next-inner{max-width:var(--max);margin:0 auto;padding:64px var(--pad);display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:center}
.lhc-next-preview{position:relative;overflow:hidden;aspect-ratio:4/3;border:1px solid var(--border)}
.lhc-next-preview-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px}
.lhc-next-preview-cat{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:6px}
.lhc-next-preview-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(16px,2.2vw,26px);letter-spacing:-.5px;color:#fff;line-height:1}
.lhc-next-tag{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.lhc-next-tag::after{content:'';width:36px;height:1px;background:var(--pu)}
.lhc-next-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4.5vw,56px);letter-spacing:-1px;color:var(--paper);line-height:.92;margin-bottom:14px}
.lhc-next-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:380px;margin-bottom:28px}
.lhc-next-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.lhc-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;background:var(--pu);color:var(--bg);border:2px solid var(--pu);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.lhc-btn:hover{background:var(--pu2);border-color:var(--pu2)}
.lhc-ghost-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.lhc-ghost-btn:hover{border-color:var(--pu);color:var(--pu)}
/* FOOTER */
.lhc-foot{border-top:1px solid var(--border)}
.lhc-foot-inner{max-width:var(--max);margin:0 auto;padding:44px var(--pad);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.lhc-flogo{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.lhc-flogo span{color:var(--pu)}
.lhc-fcopy{font-size:9px;color:var(--muted)}
.lhc-flinks{display:flex;gap:18px;flex-wrap:wrap;align-items:center}
.lhc-flinks a{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.lhc-flinks a:hover{color:var(--pu)}
.lhc-fall{color:var(--pu)!important}
/* REVEAL */
.lhc-rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.lhc-rv.in{opacity:1;transform:translateY(0)}
/* MOBILE DRAWER */
.lhc-hamburger{display:flex;flex-direction:column;gap:5px;cursor:pointer;background:transparent;border:none;padding:6px}
.lhc-hamburger span{display:block;width:24px;height:2px;background:var(--paper);transition:all .3s}
.lhc-drawer{position:fixed;inset:0;z-index:600;background:var(--bg);transform:translateX(100%);transition:transform .35s ease;display:flex;flex-direction:column;padding:88px 28px 40px;overflow-y:auto}
.lhc-drawer.open{transform:translateX(0)}
.lhc-drawer-close{position:absolute;top:22px;right:24px;background:transparent;border:none;color:var(--paper);font-size:22px;cursor:pointer;line-height:1}
.lhc-drawer a{font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;padding:18px 0;border-bottom:1px solid var(--border);transition:color .2s;display:block}
.lhc-drawer a:hover,.lhc-drawer a:active{color:var(--pu)}
.lhc-drawer-cta{background:var(--pu);color:var(--bg)!important;padding:14px 0!important;font-weight:700;border-bottom:none!important;text-align:center;margin-top:20px;display:block;font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;transition:background .2s}
.lhc-drawer-cta:hover{background:var(--pu2)}
/* ===== RESPONSIVE ===== */
@media(max-width:1023px){
  :root{--pad:32px}
  .lhc-nav-inner{padding:14px 28px}
  .lhc-overview{grid-template-columns:1fr;gap:40px}
  .lhc-alt{grid-template-columns:1fr;gap:32px}
  .lhc-impact-stats{grid-template-columns:repeat(2,1fr)}
  .lhc-next-inner{grid-template-columns:1fr;gap:32px}
}
@media(max-width:768px){
  :root{--pad:24px}
  .lhc-hero-inner{padding:110px var(--pad) 44px}
  .lhc-overview{padding:52px var(--pad)}
  .lhc-alt{padding:52px var(--pad)}
  .lhc-cover{padding:36px var(--pad) 0}
  .lhc-impact-final{padding:52px var(--pad) 52px}
  .lhc-impact-stats{grid-template-columns:repeat(2,1fr);gap:20px}
  .lhc-next-inner{padding:44px var(--pad)}
  .lhc-meta-row{gap:24px}
  .lhc-foot-inner{flex-direction:column;align-items:flex-start;gap:20px;padding:32px var(--pad)}
  .lhc-flinks{flex-direction:column;gap:10px;align-items:flex-start}
  .lhc-next-actions{flex-direction:column;align-items:flex-start}
  .lhc-btn,.lhc-ghost-btn{width:100%;text-align:center;display:block}
}
@media(max-width:480px){
  :root{--pad:16px}
  .lhc-abar{padding:9px 16px}
  .lhc-abar span{font-size:7px}
  .lhc-meta-row{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
  .lhc-impact-stats{grid-template-columns:1fr;gap:14px}
}
@media(hover:none),(pointer:coarse){
  .lhc-hamburger{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center}
  .lhc-nav-r{display:none}
  .lhc-btn,.lhc-ghost-btn{min-height:44px;display:inline-flex;align-items:center;justify-content:center}
}
@media(min-width:1024px){
  .lhc-hamburger{display:none}
  .lhc-nav-r{display:flex}
}
@media(prefers-reduced-motion:reduce){
  .lhc-rv{transition:none;opacity:1;transform:none}
  .lhc-drawer{transition:none}
  .lhc-ndot,.lhc-adot{animation:none}
}
`

export default function LunaraHaircarePage() {
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
        const els = Array.from(ref.current?.querySelectorAll(".lhc-rv") || [])
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
        <div className="lhc" ref={ref}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" />
            <style>{CSS}</style>

            {/* AVAILABLE BAR */}
            <div className={`lhc-abar${navScroll ? " show" : ""}`}>
                <div className="lhc-adot" />
                <span>Available for new projects</span>
            </div>

            {/* NAV */}
            <nav className="lhc-nav" style={{ top: navScroll ? "38px" : "0" }}>
                <div className="lhc-nav-inner">
                    <a className="lhc-logo" href="/"><img src="/Jadey%20Site%20Logo.png" alt="Jadey Design" style={{height:"28px",width:"auto",display:"block"}} /></a>
                    <div className="lhc-nav-r">
                        <div className="lhc-ndot" />
                        <a href="/all-work">All Projects</a>
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a className="lhc-nav-contact" href="/#contact">Contact Me</a>
                    </div>
                    <button ref={hamburgerRef} className="lhc-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* MOBILE DRAWER */}
            <div ref={drawerRef} className={`lhc-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-label="Navigation menu">
                <button className="lhc-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <a href="/all-work" onClick={() => setMenuOpen(false)}>All Projects</a>
                <a href="/#about" onClick={() => setMenuOpen(false)}>About Me</a>
                <a href="/#work" onClick={() => setMenuOpen(false)}>Work Highlights</a>
                <a href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <a href="/#insights" onClick={() => setMenuOpen(false)}>Blog</a>
                <a href="/#workshops" onClick={() => setMenuOpen(false)}>Workshops</a>
                <a className="lhc-drawer-cta" href="/#contact" onClick={() => setMenuOpen(false)}>Contact Me</a>
            </div>

            {/* HERO */}
            <div className="lhc-hero">
                <div className="lhc-hero-inner">
                    <div className="lhc-hero-ghost">LUNARA HAIRCARE</div>
                    <div className="lhc-cat lhc-rv">Brand Identity Design</div>
                    <h1 className="lhc-title lhc-rv">Lunara Haircare</h1>
                    <p className="lhc-rv" style={{ fontSize: 13, lineHeight: 1.85, color: "rgba(255,255,255,0.65)", maxWidth: 520, marginBottom: 32 }}>
                        An AI-assisted branding project for a premium hair care brand, created to explore a soft, elegant, and trustworthy visual identity for modern self-care.
                    </p>
                    <div className="lhc-meta-row lhc-rv">
                        <div>
                            <div className="lhc-meta-l">Client</div>
                            <div className="lhc-meta-v">Lunara Haircare</div>
                        </div>
                        <div>
                            <div className="lhc-meta-l">Service</div>
                            <div className="lhc-meta-v">Brand Identity Design</div>
                        </div>
                        <div>
                            <div className="lhc-meta-l">Project Type</div>
                            <div className="lhc-meta-v">AI-Assisted Project</div>
                        </div>
                        <div>
                            <div className="lhc-meta-l">Industry</div>
                            <div className="lhc-meta-v">Hair Care / Beauty / Personal Care</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* COVER */}
            <div className="lhc-cover lhc-rv">
                <div className="lhc-cover-wrap">
                    <img src="/Lunara%20-%20Cover.png" alt="Lunara Haircare — Brand Showcase Cover" />
                </div>
            </div>

            <div className="lhc-body">

                {/* OVERVIEW — Problem + Solution */}
                <div className="lhc-overview lhc-rv">
                    <div className="lhc-ov-col">
                        <div className="lhc-section-label">The Problem</div>
                        <h2 className="lhc-section-title">The Challenge</h2>
                        <p className="lhc-section-body">
                            Many hair care brands either feel too clinical, too generic, or too luxurious in a way that can feel distant from everyday users. For Lunara Haircare, the challenge was to create a brand identity that feels premium and elegant while still remaining warm, gentle, and approachable.
                        </p>
                        <p className="lhc-section-body" style={{ marginTop: 12 }}>
                            The brand needed to communicate softness, nourishment, healthy shine, and calm self-care without making the design feel crowded or overly decorative. It also needed a visual system that could stay consistent across multiple touchpoints — from product packaging and brand presentation to merchandise.
                        </p>
                        <p className="lhc-section-body" style={{ marginTop: 12 }}>
                            Because Lunara is positioned as a modern hair care brand, the identity needed to balance beauty, trust, and simplicity — polished enough for a premium product, but still calm and personal enough for everyday self-care.
                        </p>
                    </div>
                    <div className="lhc-ov-col">
                        <div className="lhc-section-label">The Solution</div>
                        <h2 className="lhc-section-title">The Approach</h2>
                        <p className="lhc-section-body">
                            The solution was to build a cohesive brand identity system rooted in the Lunara concept — a name drawn from "luna" (moon) and "aura" (glow and presence) — that communicates softness, nourishment, and quiet confidence across all brand materials.
                        </p>
                        <ul className="lhc-list" style={{ marginTop: 14 }}>
                            <li>Brand overview — setting the tone for the full identity system</li>
                            <li>Logo and brand identity — grounded in clarity, balance, and recognizability</li>
                            <li>Color system — warm neutrals, muted cream, champagne, and subtle gold</li>
                            <li>Typography and visual direction — refined, modern, and beauty-focused</li>
                            <li>Merch collection — extending the identity into physical applications</li>
                            <li>Product packaging — minimal, polished, and self-care focused</li>
                        </ul>
                        <p className="lhc-section-body" style={{ marginTop: 14 }}>
                            AI was used to support faster creative exploration and help test how the identity could work across different brand materials. The final direction, design decisions, and presentation were refined by the designer to make sure the output felt realistic, intentional, and aligned with the Lunara Haircare concept.
                        </p>
                    </div>
                </div>

                <hr className="lhc-divider" />

                {/* LOGO & BRAND IDENTITY — image left, text right */}
                <div className="lhc-alt lhc-rv">
                    <div className="lhc-alt-img">
                        <img src="/Lunara%20-%20Logo%20and%20Brand%20Identity.png" alt="Lunara Haircare — Logo and Brand Identity" />
                    </div>
                    <div>
                        <div className="lhc-tag">Brand Identity</div>
                        <h2 className="lhc-alt-title">Logo &amp; Brand Identity</h2>
                        <p className="lhc-alt-body">
                            The logo and brand identity section presents the Lunara Haircare mark and core identity elements in a clear and polished way. It shows how the logo supports the brand&apos;s premium yet approachable tone while maintaining clarity, balance, and recognizability across all brand materials.
                        </p>
                        <p className="lhc-alt-body" style={{ marginTop: 12 }}>
                            The identity stays connected to the meaning behind Lunara — combining the calm feeling of "luna" with the glow and confidence represented by "aura." The result is a mark that feels elegant and personal without becoming distant or overly decorative.
                        </p>
                        <div className="lhc-impact-row">
                            <div className="lhc-impact-label">Result</div>
                            <ul className="lhc-impact-list">
                                <li>A clear, balanced logo that communicates softness and premium care</li>
                                <li>Consistent identity that holds up across packaging, merchandise, and brand presentations</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="lhc-divider" />

                {/* COLOR SYSTEM — text left, image right */}
                <div className="lhc-alt lhc-rv">
                    <div>
                        <div className="lhc-tag">Color System</div>
                        <h2 className="lhc-alt-title">Color &amp; Palette</h2>
                        <p className="lhc-alt-body">
                            The color system defines the palette that shapes the entire Lunara Haircare identity. Soft neutrals, warm beige, muted cream, champagne, soft brown, and subtle gold accents work together to communicate softness, nourishment, warmth, and healthy shine.
                        </p>
                        <p className="lhc-alt-body" style={{ marginTop: 12 }}>
                            The palette makes the brand feel premium without feeling cold or distant. Each tone supports the calm, self-care-focused mood that Lunara is built around — giving the identity a cohesive and recognizable visual foundation across every application.
                        </p>
                        <div className="lhc-impact-row">
                            <div className="lhc-impact-label">Result</div>
                            <ul className="lhc-impact-list">
                                <li>A warm, refined palette that communicates nourishment and gentle confidence</li>
                                <li>Consistent color language that carries through packaging, merch, and presentation</li>
                                <li>A premium feel that remains approachable and easy to connect with</li>
                            </ul>
                        </div>
                    </div>
                    <div className="lhc-alt-img">
                        <img src="/Lunara%20-%20Color.png" alt="Lunara Haircare — Color Branding" />
                    </div>
                </div>

                <hr className="lhc-divider" />

                {/* TYPOGRAPHY & VISUAL DIRECTION — image left, text right */}
                <div className="lhc-alt lhc-rv">
                    <div className="lhc-alt-img">
                        <img src="/Lunara%20-%20Typography%20and%20Visual%20Direction.png" alt="Lunara Haircare — Typography and Visual Direction" />
                    </div>
                    <div>
                        <div className="lhc-tag">Typography &amp; Visual Direction</div>
                        <h2 className="lhc-alt-title">Type &amp; Visual Direction</h2>
                        <p className="lhc-alt-body">
                            The typography and visual direction section shows how type and styling work together to shape the overall identity of Lunara Haircare. The type system leans toward a refined, modern beauty tone — clear enough to stay readable across brand materials, polished enough to support a premium hair care brand.
                        </p>
                        <p className="lhc-alt-body" style={{ marginTop: 12 }}>
                            The broader visual direction communicates calm self-care, softness, and quiet confidence. Spacious layouts, clean compositions, and an elegant overall mood ensure that the brand never feels crowded or overly decorative — just soft, considered, and intentional.
                        </p>
                        <div className="lhc-impact-row">
                            <div className="lhc-impact-label">Result</div>
                            <ul className="lhc-impact-list">
                                <li>A refined type system that gives the brand a clear, premium beauty voice</li>
                                <li>A visual direction that feels calm, spacious, and consistently on-brand</li>
                                <li>Typography and styling that work together across all brand touchpoints</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="lhc-divider" />

                {/* MERCH COLLECTION — text left, image right */}
                <div className="lhc-alt lhc-rv">
                    <div>
                        <div className="lhc-tag">Merchandise</div>
                        <h2 className="lhc-alt-title">Merch Collection</h2>
                        <p className="lhc-alt-body">
                            The merch collection shows how the Lunara Haircare identity extends into physical brand applications. The branding remains recognizable and polished when applied to merchandise — staying visually consistent while showing how the identity can support lifestyle-based brand touchpoints beyond product packaging.
                        </p>
                        <p className="lhc-alt-body" style={{ marginTop: 12 }}>
                            A brand identity that only works on product labels has limited range. Extending Lunara into merchandise demonstrates that the visual system is strong enough to hold up in real-world surfaces while staying clearly connected to the beauty and self-care space.
                        </p>
                        <div className="lhc-impact-row">
                            <div className="lhc-impact-label">Result</div>
                            <ul className="lhc-impact-list">
                                <li>A brand identity that translates cleanly to physical surfaces and merchandise</li>
                                <li>Consistent brand presence that extends the identity beyond digital applications</li>
                                <li>A polished lifestyle feel that stays aligned with Lunara&apos;s self-care positioning</li>
                            </ul>
                        </div>
                    </div>
                    <div className="lhc-alt-img">
                        <img src="/Lunara%20Merch.png" alt="Lunara Haircare — Merch Collection" />
                    </div>
                </div>

                <hr className="lhc-divider" />

                {/* PRODUCT PACKAGING — image left, text right */}
                <div className="lhc-alt lhc-rv">
                    <div className="lhc-alt-img">
                        <img src="/Lunara%20-%20Product%20Packaging.png" alt="Lunara Haircare — Product Packaging" />
                    </div>
                    <div>
                        <div className="lhc-tag">Product Packaging</div>
                        <h2 className="lhc-alt-title">Product Packaging</h2>
                        <p className="lhc-alt-body">
                            The product packaging section shows how the Lunara Haircare identity is applied to real product touchpoints. The packaging is kept minimal, polished, and spacious — clean labels, soft visual details, and a presentation that feels elevated without becoming overly complicated.
                        </p>
                        <p className="lhc-alt-body" style={{ marginTop: 12 }}>
                            The packaging directly supports Lunara&apos;s brand positioning as a premium yet approachable hair care line. It should feel like something a modern self-care user would keep on their shelf — soft, trustworthy, and easy to connect with at first glance.
                        </p>
                        <div className="lhc-impact-row">
                            <div className="lhc-impact-label">Result</div>
                            <ul className="lhc-impact-list">
                                <li>Minimal, elegant packaging that communicates premium care without intimidation</li>
                                <li>A product presentation that feels personal, soft, and visually cohesive</li>
                                <li>Packaging that holds the brand identity clearly at every product touchpoint</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            {/* IMPACT FINAL */}
            <div className="lhc-impact-final">
                <div className="lhc-impact-final-inner lhc-rv">
                    <div className="lhc-section-label">The Impact</div>
                    <h2 className="lhc-section-title">Final Result</h2>
                    <p className="lhc-section-body" style={{ maxWidth: 680 }}>
                        Lunara Haircare was developed as an AI-assisted branding project, resulting in a cohesive identity system built across key brand assets. Through brand overview, logo and brand identity, color branding, typography and visual direction, merchandise, and product packaging, the project presents a complete and consistent branding solution.
                    </p>
                    <p className="lhc-section-body" style={{ maxWidth: 680, marginTop: 12 }}>
                        The final identity gives Lunara a clearer and more unified brand presence across all touchpoints. Instead of feeling like separate design pieces, the logo, color palette, typography, packaging, and merchandise work together as one complete system — soft, premium, trustworthy, and ready for a portfolio branding case study. AI supported the creative exploration process, but the final brand direction, design decisions, and presentation were refined by the designer to make sure the output felt intentional and polished.
                    </p>
                    <div className="lhc-impact-stats">
                        <div className="lhc-stat">
                            <div className="lhc-stat-num">6</div>
                            <div className="lhc-stat-label">Brand touchpoints — from logo and color to packaging and merchandise</div>
                        </div>
                        <div className="lhc-stat">
                            <div className="lhc-stat-num">1</div>
                            <div className="lhc-stat-label">Unified identity system that works consistently across every application</div>
                        </div>
                        <div className="lhc-stat">
                            <div className="lhc-stat-num">✦</div>
                            <div className="lhc-stat-label">Premium and approachable presence in the hair care and beauty space</div>
                        </div>
                        <div className="lhc-stat">
                            <div className="lhc-stat-num">→</div>
                            <div className="lhc-stat-label">A scalable visual foundation ready for future product lines and brand materials</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* NEXT PROJECT */}
            <div className="lhc-next">
                <div className="lhc-next-inner lhc-rv">
                    <div className="lhc-next-preview">
                        <img
                            src="/brandsonic%20branding%20-%20thumbnail.png"
                            alt="BrandSonic Brand Identity"
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.05)" }}
                        />
                        <div className="lhc-next-preview-overlay">
                            <div className="lhc-next-preview-cat">Brand Design</div>
                            <div className="lhc-next-preview-name">BrandSonic</div>
                        </div>
                    </div>
                    <div>
                        <div className="lhc-next-tag">Next Project</div>
                        <div className="lhc-next-title">BrandSonic</div>
                        <p className="lhc-next-desc">Brand identity system for a podcast and audio branding platform — dark foundation, blue accent, and a clean visual language built for premium recognition.</p>
                        <div className="lhc-next-actions">
                            <a className="lhc-btn" href="/all-work/brandsonic">View Project →</a>
                            <a className="lhc-ghost-btn" href="/all-work">All Work</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="lhc-foot">
                <div className="lhc-foot-inner">
                    <a className="lhc-flogo" href="/"><img src="/Jadey%20Site%20Logo.png" alt="Jadey Design" style={{height:"28px",width:"auto",display:"block"}} /></a>
                    <div className="lhc-fcopy">© 2025 Jane Dhell Cagas. All rights reserved.</div>
                    <div className="lhc-flinks">
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a href="/#contact">Contact</a>
                        <a className="lhc-fall" href="/all-work">All Projects →</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
