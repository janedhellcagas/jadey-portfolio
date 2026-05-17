'use client'
import { useState, useEffect, useRef } from "react"

const CSS = `
:root{--bg:#0a0a08;--bg2:#111110;--paper:#f0ebe0;--pu:#9B59D0;--pu2:#B07AE0;--pu3:#7A3AB8;--muted:rgba(240,235,224,0.38);--border:rgba(240,235,224,0.12);--pborder:rgba(155,89,208,0.3);--pbg:rgba(155,89,208,0.08);--max:1440px;--pad:44px}
.bsi*{box-sizing:border-box;margin:0;padding:0}
.bsi{font-family:'Space Mono',monospace;background:var(--bg);color:var(--paper);min-height:100vh;overflow-x:hidden;width:100%}
/* NAV */
.bsi-nav{position:fixed;top:0;left:0;right:0;z-index:500;background:rgba(10,10,8,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:top .3s}
.bsi-nav-inner{max-width:var(--max);margin:0 auto;padding:18px var(--pad);display:flex;align-items:center;justify-content:space-between}
.bsi-logo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.bsi-logo span{color:var(--pu)}
.bsi-nav-r{display:none;align-items:center;gap:14px}
.bsi-nav-r a{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.bsi-nav-r a:hover{color:var(--pu)}
.bsi-nav-contact{background:var(--pu)!important;color:var(--bg)!important;padding:9px 20px!important;font-weight:700!important;border:2px solid var(--pu)!important;display:inline-block!important}
.bsi-nav-contact:hover{background:var(--pu2)!important;border-color:var(--pu2)!important}
.bsi-ndot{width:7px;height:7px;background:var(--pu);border-radius:50%;animation:bsi-pulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes bsi-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.85)}}
.bsi-abar{position:fixed;top:0;left:0;right:0;z-index:499;background:var(--pu3);padding:9px var(--pad);height:38px;display:none;align-items:center;justify-content:center;gap:8px}
.bsi-abar.show{display:flex}
.bsi-abar span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:white;font-weight:700}
.bsi-adot{width:5px;height:5px;background:white;border-radius:50%;animation:bsi-pulse 2s ease-in-out infinite}
/* HERO */
.bsi-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#2E1050,#6B3FA0)}
.bsi-hero-inner{max-width:var(--max);margin:0 auto;padding:140px var(--pad) 60px;position:relative}
.bsi-hero-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,9vw,140px);letter-spacing:-4px;color:rgba(240,235,224,0.035);white-space:nowrap;pointer-events:none;text-align:center;width:100%}
.bsi-cat{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,0.6);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.bsi-cat::before{content:'';width:36px;height:1px;background:rgba(255,255,255,0.4)}
.bsi-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,9vw,120px);letter-spacing:-2px;line-height:.88;color:#fff;margin-bottom:32px}
.bsi-meta-row{display:flex;gap:44px;flex-wrap:wrap;padding-top:28px;border-top:1px solid rgba(255,255,255,0.15)}
.bsi-meta-l{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:4px}
.bsi-meta-v{font-size:11px;color:#fff;font-weight:700}
/* BODY */
.bsi-body{padding:0}
/* COVER */
.bsi-cover{padding:52px var(--pad) 0}
.bsi-cover-wrap{max-width:1425px;margin:0 auto;overflow:hidden}
.bsi-cover-wrap img{width:100%;height:auto;display:block}
/* OVERVIEW — 2-col */
.bsi-overview{max-width:var(--max);margin:0 auto;padding:72px var(--pad);display:grid;grid-template-columns:1fr 1fr;gap:60px}
.bsi-ov-col{}
.bsi-section-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:10px}
.bsi-section-label::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.bsi-section-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(26px,4vw,46px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px}
.bsi-section-body{font-size:12px;line-height:1.95;color:var(--muted)}
.bsi-list{color:var(--muted);list-style:none;padding:0;margin:0;font-size:12px;line-height:1.95}
.bsi-list li{padding-left:18px;position:relative;margin-bottom:4px}
.bsi-list li::before{content:'•';position:absolute;left:0;color:var(--pu)}
/* DIVIDER */
.bsi-divider{border:none;border-top:1px solid var(--border);max-width:var(--max);margin:0 auto}
/* ALT ROW */
.bsi-alt{max-width:var(--max);margin:0 auto;padding:72px var(--pad);display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.bsi-alt-img{overflow:hidden;border:1px solid var(--border);position:relative}
.bsi-alt-img img{width:100%;height:auto;display:block}
.bsi-alt-content{}
.bsi-tag{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:8px}
.bsi-tag::after{content:'';width:28px;height:1px;background:var(--pu)}
.bsi-alt-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(24px,3.5vw,42px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px;line-height:1}
.bsi-alt-body{font-size:12px;line-height:1.95;color:var(--muted)}
.bsi-impact-row{margin-top:20px;padding-top:18px;border-top:1px solid var(--border)}
.bsi-impact-label{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(240,235,224,0.4);margin-bottom:8px}
.bsi-impact-list{list-style:none;padding:0;margin:0;font-size:11px;line-height:1.9;color:var(--muted)}
.bsi-impact-list li{padding-left:16px;position:relative;margin-bottom:2px}
.bsi-impact-list li::before{content:'→';position:absolute;left:0;color:var(--pu);font-size:9px;top:2px}
/* FULL-WIDTH ASSET — image fills column without cropping */
.bsi-alt-img--full{border:1px solid var(--border);overflow:hidden}
.bsi-alt-img--full img{width:100%;height:auto;display:block}
/* IMPACT FINAL */
.bsi-impact-final{max-width:var(--max);margin:0 auto;padding:72px var(--pad);background:var(--bg2)}
.bsi-impact-final-inner{max-width:var(--max);margin:0 auto}
.bsi-impact-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:40px}
.bsi-stat{border-left:2px solid var(--pu);padding-left:18px}
.bsi-stat-num{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,48px);letter-spacing:-1px;color:var(--paper);line-height:1}
.bsi-stat-label{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:4px;line-height:1.6}
/* NEXT PROJECT */
.bsi-next{background:var(--bg2)}
.bsi-next-inner{max-width:var(--max);margin:0 auto;padding:64px var(--pad);display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:center}
.bsi-next-preview{position:relative;overflow:hidden;aspect-ratio:4/3;border:1px solid var(--border)}
.bsi-next-preview-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px}
.bsi-next-preview-cat{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:6px}
.bsi-next-preview-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(16px,2.2vw,26px);letter-spacing:-.5px;color:#fff;line-height:1}
.bsi-next-tag{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.bsi-next-tag::after{content:'';width:36px;height:1px;background:var(--pu)}
.bsi-next-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4.5vw,56px);letter-spacing:-1px;color:var(--paper);line-height:.92;margin-bottom:14px}
.bsi-next-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:380px;margin-bottom:28px}
.bsi-next-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.bsi-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;background:var(--pu);color:var(--bg);border:2px solid var(--pu);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.bsi-btn:hover{background:var(--pu2);border-color:var(--pu2)}
.bsi-ghost-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.bsi-ghost-btn:hover{border-color:var(--pu);color:var(--pu)}
/* FOOTER */
.bsi-foot{border-top:1px solid var(--border)}
.bsi-foot-inner{max-width:var(--max);margin:0 auto;padding:44px var(--pad);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.bsi-flogo{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.bsi-flogo span{color:var(--pu)}
.bsi-fcopy{font-size:9px;color:var(--muted)}
.bsi-flinks{display:flex;gap:18px;flex-wrap:wrap;align-items:center}
.bsi-flinks a{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.bsi-flinks a:hover{color:var(--pu)}
.bsi-fall{color:var(--pu)!important}
/* REVEAL */
.bsi-rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.bsi-rv.in{opacity:1;transform:translateY(0)}
/* MOBILE DRAWER */
.bsi-hamburger{display:flex;flex-direction:column;gap:5px;cursor:pointer;background:transparent;border:none;padding:6px}
.bsi-hamburger span{display:block;width:24px;height:2px;background:var(--paper);transition:all .3s}
.bsi-drawer{position:fixed;inset:0;z-index:600;background:var(--bg);transform:translateX(100%);transition:transform .35s ease;display:flex;flex-direction:column;padding:88px 28px 40px;overflow-y:auto}
.bsi-drawer.open{transform:translateX(0)}
.bsi-drawer-close{position:absolute;top:22px;right:24px;background:transparent;border:none;color:var(--paper);font-size:22px;cursor:pointer;line-height:1}
.bsi-drawer a{font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;padding:18px 0;border-bottom:1px solid var(--border);transition:color .2s;display:block}
.bsi-drawer a:hover,.bsi-drawer a:active{color:var(--pu)}
.bsi-drawer-cta{background:var(--pu);color:var(--bg)!important;padding:14px 0!important;font-weight:700;border-bottom:none!important;text-align:center;margin-top:20px;display:block;font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;transition:background .2s}
.bsi-drawer-cta:hover{background:var(--pu2)}
/* ===== RESPONSIVE ===== */
@media(max-width:1023px){
  :root{--pad:32px}
  .bsi-nav-inner{padding:14px 28px}
  .bsi-overview{grid-template-columns:1fr;gap:40px}
  .bsi-alt{grid-template-columns:1fr;gap:32px}
  .bsi-impact-stats{grid-template-columns:repeat(2,1fr)}
  .bsi-next-inner{grid-template-columns:1fr;gap:32px}
}
@media(max-width:768px){
  :root{--pad:24px}
  .bsi-hero-inner{padding:110px var(--pad) 44px}
  .bsi-overview{padding:52px var(--pad)}
  .bsi-alt{padding:52px var(--pad)}
  .bsi-cover{padding:36px var(--pad) 0}
  .bsi-impact-final{padding:52px var(--pad) 52px}
  .bsi-impact-stats{grid-template-columns:repeat(2,1fr);gap:20px}
  .bsi-next-inner{padding:44px var(--pad)}
  .bsi-meta-row{gap:24px}
  .bsi-foot-inner{flex-direction:column;align-items:flex-start;gap:20px;padding:32px var(--pad)}
  .bsi-flinks{flex-direction:column;gap:10px;align-items:flex-start}
  .bsi-next-actions{flex-direction:column;align-items:flex-start}
  .bsi-btn,.bsi-ghost-btn{width:100%;text-align:center;display:block}
}
@media(max-width:480px){
  :root{--pad:16px}
  .bsi-abar{padding:9px 16px}
  .bsi-abar span{font-size:7px}
  .bsi-meta-row{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
  .bsi-impact-stats{grid-template-columns:1fr;gap:14px}
}
@media(hover:none),(pointer:coarse){
  .bsi-hamburger{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center}
  .bsi-nav-r{display:none}
  .bsi-btn,.bsi-ghost-btn{min-height:44px;display:inline-flex;align-items:center;justify-content:center}
}
@media(min-width:1024px){
  .bsi-hamburger{display:none}
  .bsi-nav-r{display:flex}
}
@media(prefers-reduced-motion:reduce){
  .bsi-rv{transition:none;opacity:1;transform:none}
  .bsi-drawer{transition:none}
  .bsi-ndot,.bsi-adot{animation:none}
}
`

export default function BrandSonicPage() {
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
        const els = Array.from(ref.current?.querySelectorAll(".bsi-rv") || [])
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
        <div className="bsi" ref={ref}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" />
            <style>{CSS}</style>

            {/* AVAILABLE BAR */}
            <div className={`bsi-abar${navScroll ? " show" : ""}`}>
                <div className="bsi-adot" />
                <span>Available for new projects</span>
            </div>

            {/* NAV */}
            <nav className="bsi-nav" style={{ top: navScroll ? "38px" : "0" }}>
                <div className="bsi-nav-inner">
                    <a className="bsi-logo" href="/">JADEY<span>.</span></a>
                    <div className="bsi-nav-r">
                        <div className="bsi-ndot" />
                        <a href="/all-work">All Projects</a>
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a className="bsi-nav-contact" href="/#contact">Contact Me</a>
                    </div>
                    <button ref={hamburgerRef} className="bsi-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* MOBILE DRAWER */}
            <div ref={drawerRef} className={`bsi-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-label="Navigation menu">
                <button className="bsi-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <a href="/all-work" onClick={() => setMenuOpen(false)}>All Projects</a>
                <a href="/#about" onClick={() => setMenuOpen(false)}>About Me</a>
                <a href="/#work" onClick={() => setMenuOpen(false)}>Work Highlights</a>
                <a href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <a href="/#insights" onClick={() => setMenuOpen(false)}>Blog</a>
                <a href="/#workshops" onClick={() => setMenuOpen(false)}>Workshops</a>
                <a className="bsi-drawer-cta" href="/#contact" onClick={() => setMenuOpen(false)}>Contact Me</a>
            </div>

            {/* HERO */}
            <div className="bsi-hero">
                <div className="bsi-hero-inner">
                    <div className="bsi-hero-ghost">BRANDSONIC</div>
                    <div className="bsi-cat bsi-rv">Brand Identity Design</div>
                    <h1 className="bsi-title bsi-rv">BrandSonic</h1>
                    <p className="bsi-rv" style={{ fontSize: 13, lineHeight: 1.85, color: "rgba(255,255,255,0.65)", maxWidth: 520, marginBottom: 32 }}>
                        A modern brand identity for a podcast and audio branding platform built to communicate voice, storytelling, and brand authority with a clean, premium, and consistent visual system.
                    </p>
                    <div className="bsi-meta-row bsi-rv">
                        <div>
                            <div className="bsi-meta-l">Client</div>
                            <div className="bsi-meta-v">BrandSonic</div>
                        </div>
                        <div>
                            <div className="bsi-meta-l">Service</div>
                            <div className="bsi-meta-v">Brand Identity Design</div>
                        </div>
                        <div>
                            <div className="bsi-meta-l">Industry</div>
                            <div className="bsi-meta-v">Podcast Service / Audio Branding</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* COVER */}
            <div className="bsi-cover bsi-rv">
                <div className="bsi-cover-wrap">
                    <img src="/BrandSonic%20-%20Cover.png" alt="BrandSonic — Brand Identity Cover" />
                </div>
            </div>

            <div className="bsi-body">

                {/* OVERVIEW — Problem + Solution */}
                <div className="bsi-overview bsi-rv">
                    <div className="bsi-ov-col">
                        <div className="bsi-section-label">The Problem</div>
                        <h2 className="bsi-section-title">Starting Point</h2>
                        <p className="bsi-section-body">
                            BrandSonic needed a visual identity that could clearly represent its role in the podcast and audio branding space. The goal was to create a brand system that feels credible, modern, and easy to recognize — while staying flexible enough for digital content, social media, merchandise, and other brand applications.
                        </p>
                        <p className="bsi-section-body" style={{ marginTop: 12 }}>
                            Podcast and audio service brands can easily look generic when they rely on common audio visuals, inconsistent layouts, or overused microphone and sound wave elements. The challenge was to create an identity that still feels connected to audio and storytelling — but in a cleaner, more premium, and more professional way.
                        </p>
                        <p className="bsi-section-body" style={{ marginTop: 12 }}>
                            Without a clear identity system, the brand could feel less recognizable and less polished when applied across different platforms.
                        </p>
                    </div>
                    <div className="bsi-ov-col">
                        <div className="bsi-section-label">The Solution</div>
                        <h2 className="bsi-section-title">The Approach</h2>
                        <p className="bsi-section-body">
                            The solution was to build a cohesive brand identity system using a strong dark foundation, a focused blue accent, clean typography, and structured visual direction. This created a more premium and professional look while keeping the brand connected to the podcast and audio space.
                        </p>
                        <ul className="bsi-list" style={{ marginTop: 14 }}>
                            <li>Logo usage — defined for consistent application across materials</li>
                            <li>Color system — built around strong contrast and a focused palette</li>
                            <li>Typography — structured for hierarchy and brand confidence</li>
                            <li>Visual direction — clear, modern, and audio-inspired without being generic</li>
                            <li>Merchandise — extending the identity into physical applications</li>
                            <li>Social media — adapting the system for digital content</li>
                        </ul>
                        <p className="bsi-section-body" style={{ marginTop: 14 }}>
                            Each part of the system was designed to work together so the brand feels consistent, recognizable, and ready for real-world use.
                        </p>
                    </div>
                </div>

                <hr className="bsi-divider" />

                {/* LOGO USAGE — image left, text right */}
                <div className="bsi-alt bsi-rv">
                    <div className="bsi-alt-img bsi-alt-img--full">
                        <img src="/BrandSonic%20-%20Logo%20Usage.png" alt="BrandSonic — Logo Usage" />
                    </div>
                    <div className="bsi-alt-content">
                        <div className="bsi-tag">Brand Identity</div>
                        <h2 className="bsi-alt-title">Logo Usage</h2>
                        <p className="bsi-alt-body">
                            The logo usage section presents the BrandSonic mark in a clean and consistent way. It shows how the logo can be applied with proper spacing, contrast, and clarity so the identity remains recognizable across different layouts and brand materials.
                        </p>
                        <p className="bsi-alt-body" style={{ marginTop: 12 }}>
                            Keeping the logo application consistent across every touchpoint prevents the brand from fragmenting — it ensures BrandSonic always reads as one recognizable identity regardless of where it appears.
                        </p>
                        <div className="bsi-impact-row">
                            <div className="bsi-impact-label">Result</div>
                            <ul className="bsi-impact-list">
                                <li>Clear and consistent logo application across all brand materials</li>
                                <li>Recognizable identity that holds up at any size or context</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="bsi-divider" />

                {/* COLOR SYSTEM — text left, image right */}
                <div className="bsi-alt bsi-rv">
                    <div className="bsi-alt-content">
                        <div className="bsi-tag">Color System</div>
                        <h2 className="bsi-alt-title">Color &amp; Palette</h2>
                        <p className="bsi-alt-body">
                            The color system uses a dark foundation supported by clean neutrals and a blue accent. This creates strong contrast and gives the brand a modern, premium, and digital-first feel.
                        </p>
                        <p className="bsi-alt-body" style={{ marginTop: 12 }}>
                            A limited, focused palette is a deliberate choice — it prevents the brand from looking inconsistent when applied across materials. Every color has a role in creating hierarchy and reinforcing the visual identity.
                        </p>
                        <div className="bsi-impact-row">
                            <div className="bsi-impact-label">Result</div>
                            <ul className="bsi-impact-list">
                                <li>Strong contrast that makes the brand feel premium and digital-ready</li>
                                <li>Clear visual hierarchy across the entire identity system</li>
                                <li>A focused palette that stays consistent across every application</li>
                            </ul>
                        </div>
                    </div>
                    <div className="bsi-alt-img bsi-alt-img--full">
                        <img src="/BrandSonic%20-%20Color%20System.png" alt="BrandSonic — Color System" />
                    </div>
                </div>

                <hr className="bsi-divider" />

                {/* TYPOGRAPHY — image left, text right */}
                <div className="bsi-alt bsi-rv">
                    <div className="bsi-alt-img bsi-alt-img--full">
                        <img src="/brandsonic%20-%20typography%202.png" alt="BrandSonic — Typography" />
                    </div>
                    <div className="bsi-alt-content">
                        <div className="bsi-tag">Typography</div>
                        <h2 className="bsi-alt-title">Type System</h2>
                        <p className="bsi-alt-body">
                            The typography system supports a clean and confident brand voice. It gives the identity a structured and professional look while keeping the content readable across brand presentations, social media layouts, and other visual applications.
                        </p>
                        <p className="bsi-alt-body" style={{ marginTop: 12 }}>
                            When typography is inconsistent, even well-designed layouts lose their sense of brand authority. A defined type system ensures BrandSonic communicates clearly and consistently no matter the format.
                        </p>
                        <div className="bsi-impact-row">
                            <div className="bsi-impact-label">Result</div>
                            <ul className="bsi-impact-list">
                                <li>Clear hierarchy between headline and supporting content</li>
                                <li>Confident, professional brand voice across all formats</li>
                                <li>Consistent readability from social posts to brand presentations</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="bsi-divider" />

                {/* VISUAL DIRECTION — text left, image right */}
                <div className="bsi-alt bsi-rv">
                    <div className="bsi-alt-content">
                        <div className="bsi-tag">Visual Direction</div>
                        <h2 className="bsi-alt-title">Look &amp; Feel</h2>
                        <p className="bsi-alt-body">
                            The visual direction gives BrandSonic a polished and modern look through strong contrast, clean composition, and subtle audio-inspired energy. The design avoids unnecessary clutter and keeps the brand focused on clarity, storytelling, and professional presentation.
                        </p>
                        <p className="bsi-alt-body" style={{ marginTop: 12 }}>
                            This direction gives the brand a clear visual personality — distinct enough to stand out in the podcast and audio space without relying on overused design tropes.
                        </p>
                        <div className="bsi-impact-row">
                            <div className="bsi-impact-label">Result</div>
                            <ul className="bsi-impact-list">
                                <li>A distinctive visual personality that feels premium and purposeful</li>
                                <li>Clean compositions that keep focus on the brand message</li>
                                <li>A look that scales across digital and physical applications</li>
                            </ul>
                        </div>
                    </div>
                    <div className="bsi-alt-img bsi-alt-img--full">
                        <img src="/BrandSonic%20-%20Visual%20Direction.png" alt="BrandSonic — Visual Direction" />
                    </div>
                </div>

                <hr className="bsi-divider" />

                {/* MERCH — image left, text right */}
                <div className="bsi-alt bsi-rv">
                    <div className="bsi-alt-img bsi-alt-img--full">
                        <img src="/BrandSonic%20-%20Merch%20Collection.png" alt="BrandSonic — Merch Collection" />
                    </div>
                    <div className="bsi-alt-content">
                        <div className="bsi-tag">Merchandise</div>
                        <h2 className="bsi-alt-title">Merch Collection</h2>
                        <p className="bsi-alt-body">
                            The merch collection shows how the BrandSonic identity can extend into physical brand applications. The design keeps the branding clean and recognizable while showing how the visual system can work beyond digital screens.
                        </p>
                        <p className="bsi-alt-body" style={{ marginTop: 12 }}>
                            Physical brand applications are a strong test of any identity system. A brand that only works on screens has limitations — one that translates to merchandise, print, and real-world surfaces has a stronger foundation.
                        </p>
                        <div className="bsi-impact-row">
                            <div className="bsi-impact-label">Result</div>
                            <ul className="bsi-impact-list">
                                <li>Identity that holds up cleanly on physical surfaces</li>
                                <li>Consistent brand presence beyond digital platforms</li>
                                <li>A system ready for real-world brand extensions</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="bsi-divider" />

                {/* SOCIAL MEDIA — text left, image right */}
                <div className="bsi-alt bsi-rv">
                    <div className="bsi-alt-content">
                        <div className="bsi-tag">Social Media</div>
                        <h2 className="bsi-alt-title">Social Media Mock-up</h2>
                        <p className="bsi-alt-body">
                            The social media mock-up shows how the identity can be applied to digital content. The layout keeps the brand consistent, polished, and easy to recognize across online platforms where podcast and audio brands often communicate with their audience.
                        </p>
                        <p className="bsi-alt-body" style={{ marginTop: 12 }}>
                            Social media is where most of the audience interacts with the brand daily. A consistent presence here reinforces recognition and builds credibility over time — it&apos;s one of the most important applications of the identity system.
                        </p>
                        <div className="bsi-impact-row">
                            <div className="bsi-impact-label">Result</div>
                            <ul className="bsi-impact-list">
                                <li>Consistent and polished presence across social platforms</li>
                                <li>Brand identity that remains recognizable in fast-scrolling feeds</li>
                                <li>Digital-ready layouts that scale across content formats</li>
                            </ul>
                        </div>
                    </div>
                    <div className="bsi-alt-img bsi-alt-img--full">
                        <img src="/BrandSonic%20-%20Social%20Media%20Mock-up.png" alt="BrandSonic — Social Media Mock-up" />
                    </div>
                </div>

            </div>

            {/* IMPACT FINAL */}
            <div className="bsi-impact-final">
                <div className="bsi-impact-final-inner bsi-rv">
                    <div className="bsi-section-label">Results</div>
                    <h2 className="bsi-section-title">The Impact</h2>
                    <p className="bsi-section-body" style={{ maxWidth: 680 }}>
                        BrandSonic&apos;s identity system was designed to feel clear, professional, and consistent across different brand touchpoints. By creating a visual system around logo usage, typography, color, visual direction, merchandise, and social media application, the brand now has a stronger foundation for presenting itself in the podcast and audio branding space.
                    </p>
                    <p className="bsi-section-body" style={{ maxWidth: 680, marginTop: 12 }}>
                        The final result is a modern branding system that supports recognition, consistency, and a more premium brand presence — not just a set of design assets, but a complete and scalable visual identity.
                    </p>
                    <div className="bsi-impact-stats">
                        <div className="bsi-stat">
                            <div className="bsi-stat-num">6</div>
                            <div className="bsi-stat-label">Brand touchpoints — logo, color, typography, direction, merch, and social</div>
                        </div>
                        <div className="bsi-stat">
                            <div className="bsi-stat-num">1</div>
                            <div className="bsi-stat-label">Unified identity system that works consistently across every application</div>
                        </div>
                        <div className="bsi-stat">
                            <div className="bsi-stat-num">✦</div>
                            <div className="bsi-stat-label">Premium and recognizable brand presence in the podcast and audio space</div>
                        </div>
                        <div className="bsi-stat">
                            <div className="bsi-stat-num">→</div>
                            <div className="bsi-stat-label">A scalable visual foundation ready for future brand materials and platforms</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* NEXT PROJECT */}
            <div className="bsi-next">
                <div className="bsi-next-inner bsi-rv">
                    <div className="bsi-next-preview">
                        <img
                            src="/Parves%20Shahid%20Cover%20Photo.png"
                            alt="Parves Shahid"
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.05)" }}
                        />
                        <div className="bsi-next-preview-overlay">
                            <div className="bsi-next-preview-cat">Brand Design</div>
                            <div className="bsi-next-preview-name">Parves Shahid</div>
                        </div>
                    </div>
                    <div>
                        <div className="bsi-next-tag">Next Project</div>
                        <div className="bsi-next-title">Parves Shahid</div>
                        <p className="bsi-next-desc">Personal brand system for an AI creator — visual identity, carousel, infographic, and banner designed around consistency and recognition.</p>
                        <div className="bsi-next-actions">
                            <a className="bsi-btn" href="/all-work/parves-shahid">View Project →</a>
                            <a className="bsi-ghost-btn" href="/all-work">All Work</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="bsi-foot">
                <div className="bsi-foot-inner">
                    <a className="bsi-flogo" href="/">JADEY<span>.</span></a>
                    <div className="bsi-fcopy">© 2025 Jane Dhell Cagas. All rights reserved.</div>
                    <div className="bsi-flinks">
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a href="/#contact">Contact</a>
                        <a className="bsi-fall" href="/all-work">All Projects →</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
