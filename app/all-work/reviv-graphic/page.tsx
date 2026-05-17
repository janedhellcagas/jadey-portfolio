'use client'
import { useState, useEffect, useRef } from "react"

const CSS = `
:root{--bg:#0a0a08;--bg2:#111110;--paper:#f0ebe0;--pu:#9B59D0;--pu2:#B07AE0;--pu3:#7A3AB8;--muted:rgba(240,235,224,0.38);--border:rgba(240,235,224,0.12);--pborder:rgba(155,89,208,0.3);--pbg:rgba(155,89,208,0.08);--max:1440px;--pad:44px;--gap:14px}
.rvg*{box-sizing:border-box;margin:0;padding:0}
.rvg{font-family:'Space Mono',monospace;background:var(--bg);color:var(--paper);min-height:100vh;overflow-x:hidden;width:100%}
/* NAV */
.rvg-nav{position:fixed;top:0;left:0;right:0;z-index:500;background:rgba(10,10,8,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:top .3s}
.rvg-nav-inner{max-width:var(--max);margin:0 auto;padding:18px var(--pad);display:flex;align-items:center;justify-content:space-between}
.rvg-logo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.rvg-logo span{color:var(--pu)}
.rvg-nav-r{display:none;align-items:center;gap:14px}
.rvg-nav-r a{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.rvg-nav-r a:hover{color:var(--pu)}
.rvg-nav-contact{background:var(--pu)!important;color:var(--bg)!important;padding:9px 20px!important;font-weight:700!important;border:2px solid var(--pu)!important;display:inline-block!important}
.rvg-nav-contact:hover{background:var(--pu2)!important;border-color:var(--pu2)!important}
.rvg-ndot{width:7px;height:7px;background:var(--pu);border-radius:50%;animation:rvg-pulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes rvg-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.85)}}
.rvg-abar{position:fixed;top:0;left:0;right:0;z-index:499;background:var(--pu3);padding:9px var(--pad);height:38px;display:none;align-items:center;justify-content:center;gap:8px}
.rvg-abar.show{display:flex}
.rvg-abar span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:white;font-weight:700}
.rvg-adot{width:5px;height:5px;background:white;border-radius:50%;animation:rvg-pulse 2s ease-in-out infinite}
/* HERO */
.rvg-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#0A0A0A,#1A1000)}
.rvg-hero-inner{max-width:var(--max);margin:0 auto;padding:140px var(--pad) 60px;position:relative}
.rvg-hero-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,9vw,140px);letter-spacing:-4px;color:rgba(240,235,224,0.035);white-space:nowrap;pointer-events:none;text-align:center;width:100%}
.rvg-cat{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,0.6);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.rvg-cat::before{content:'';width:36px;height:1px;background:rgba(255,255,255,0.4)}
.rvg-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,9vw,120px);letter-spacing:-2px;line-height:.88;color:#fff;margin-bottom:32px}
.rvg-meta-row{display:flex;gap:44px;flex-wrap:wrap;padding-top:28px;border-top:1px solid rgba(255,255,255,0.15)}
.rvg-meta-l{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:4px}
.rvg-meta-v{font-size:11px;color:#fff;font-weight:700}
/* COVER */
.rvg-cover{padding:52px var(--pad) 0}
.rvg-cover-wrap{max-width:1425px;margin:0 auto;overflow:hidden;border-radius:12px}
.rvg-cover-wrap img{width:100%;height:auto;display:block}
/* INTRO */
.rvg-intro{max-width:var(--max);margin:0 auto;padding:72px var(--pad)}
.rvg-section-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:12px;display:flex;align-items:center;gap:10px}
.rvg-section-label::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.rvg-intro-body{font-size:13px;line-height:1.95;color:var(--muted);max-width:740px}
/* DIVIDER */
.rvg-divider{border:none;border-top:1px solid var(--border);max-width:var(--max);margin:0 auto}
/* GALLERY SECTION */
.rvg-gal-section{max-width:var(--max);margin:0 auto;padding:80px var(--pad)}
.rvg-gal-header{margin-bottom:40px}
.rvg-gal-tag{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:12px}
.rvg-gal-tag::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.rvg-gal-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,5vw,64px);letter-spacing:-1px;color:var(--paper);margin-bottom:10px;line-height:.92}
.rvg-gal-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:520px}
/* MASONRY */
.rvg-masonry{columns:3;column-gap:var(--gap)}
/* YOUTUBE 2-COL LAYOUT */
.rvg-yt-grid{display:grid;grid-template-columns:1fr 1fr;gap:var(--gap);align-items:stretch}
.rvg-yt-thumbs{display:grid;grid-template-columns:1fr 1fr;gap:var(--gap);align-content:start}
.rvg-yt-actual{border-radius:10px;overflow:hidden;border:1px solid var(--border);background:var(--bg2);display:flex;flex-direction:column;transition:transform .3s,box-shadow .3s,border-color .25s}
.rvg-yt-actual:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,0.45);border-color:rgba(155,89,208,0.4)}
.rvg-yt-actual-media{flex:1;overflow:hidden;min-height:0}
.rvg-yt-actual-media img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .45s ease}
.rvg-yt-actual:hover .rvg-yt-actual-media img{transform:scale(1.025)}
.rvg-yt-actual-label{padding:11px 13px;border-top:1px solid var(--border);flex-shrink:0}
/* 4-COL ROW GRID */
.rvg-row4{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--gap)}
/* CARD */
.rvg-mc{break-inside:avoid;margin-bottom:var(--gap);border-radius:10px;overflow:hidden;border:1px solid var(--border);background:var(--bg2);transition:transform .3s,box-shadow .3s,border-color .25s}
.rvg-mc:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,0.45);border-color:rgba(155,89,208,0.4)}
.rvg-mc-media{overflow:hidden}
.rvg-mc-img{width:100%;height:auto;display:block;transition:transform .45s ease}
.rvg-mc:hover .rvg-mc-img{transform:scale(1.025)}
.rvg-mc-label{padding:11px 13px;border-top:1px solid var(--border)}
.rvg-mc-name{font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:.5px;color:var(--paper);line-height:1.1}
.rvg-mc-sub{font-size:8px;letter-spacing:.16em;text-transform:uppercase;color:var(--pu);margin-top:3px}
/* FINAL NOTE */
.rvg-final{max-width:var(--max);margin:0 auto;padding:72px var(--pad) 80px}
.rvg-final-body{font-size:13px;line-height:1.95;color:var(--muted);max-width:740px}
/* RELATED PROJECT */
.rvg-next{background:var(--bg2)}
.rvg-next-inner{max-width:var(--max);margin:0 auto;padding:64px var(--pad);display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:center}
.rvg-next-preview{position:relative;overflow:hidden;aspect-ratio:4/3;border:1px solid var(--border);border-radius:8px}
.rvg-next-preview img{width:100%;height:100%;object-fit:cover;display:block;transform:scale(1.05)}
.rvg-next-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px}
.rvg-next-preview-cat{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:6px}
.rvg-next-preview-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(16px,2.2vw,26px);letter-spacing:-.5px;color:#fff;line-height:1}
.rvg-next-tag{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.rvg-next-tag::after{content:'';width:36px;height:1px;background:var(--pu)}
.rvg-next-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4.5vw,56px);letter-spacing:-1px;color:var(--paper);line-height:.92;margin-bottom:14px}
.rvg-next-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:380px;margin-bottom:28px}
.rvg-next-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.rvg-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;background:var(--pu);color:var(--bg);border:2px solid var(--pu);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.rvg-btn:hover{background:var(--pu2);border-color:var(--pu2)}
.rvg-ghost-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.rvg-ghost-btn:hover{border-color:var(--pu);color:var(--pu)}
/* FOOTER */
.rvg-foot{border-top:1px solid var(--border)}
.rvg-foot-inner{max-width:var(--max);margin:0 auto;padding:44px var(--pad);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.rvg-flogo{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.rvg-flogo span{color:var(--pu)}
.rvg-fcopy{font-size:9px;color:var(--muted)}
.rvg-flinks{display:flex;gap:18px;flex-wrap:wrap;align-items:center}
.rvg-flinks a{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.rvg-flinks a:hover{color:var(--pu)}
.rvg-fall{color:var(--pu)!important}
/* REVEAL */
.rvg-rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.rvg-rv.in{opacity:1;transform:translateY(0)}
/* MOBILE DRAWER */
.rvg-hamburger{display:flex;flex-direction:column;gap:5px;cursor:pointer;background:transparent;border:none;padding:6px}
.rvg-hamburger span{display:block;width:24px;height:2px;background:var(--paper);transition:all .3s}
.rvg-drawer{position:fixed;inset:0;z-index:600;background:var(--bg);transform:translateX(100%);transition:transform .35s ease;display:flex;flex-direction:column;padding:88px 28px 40px;overflow-y:auto}
.rvg-drawer.open{transform:translateX(0)}
.rvg-drawer-close{position:absolute;top:22px;right:24px;background:transparent;border:none;color:var(--paper);font-size:22px;cursor:pointer;line-height:1}
.rvg-drawer a{font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;padding:18px 0;border-bottom:1px solid var(--border);transition:color .2s;display:block}
.rvg-drawer a:hover,.rvg-drawer a:active{color:var(--pu)}
.rvg-drawer-cta{background:var(--pu);color:var(--bg)!important;padding:14px 0!important;font-weight:700;border-bottom:none!important;text-align:center;margin-top:20px;display:block;font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;transition:background .2s}
.rvg-drawer-cta:hover{background:var(--pu2)}
/* RESPONSIVE */
@media(max-width:1023px){
  :root{--pad:32px}
  .rvg-nav-inner{padding:14px 28px}
  .rvg-masonry{columns:2}
  .rvg-row4{grid-template-columns:repeat(2,1fr)}
  .rvg-next-inner{grid-template-columns:1fr;gap:32px}
}
@media(max-width:768px){
  :root{--pad:24px}
  .rvg-hero-inner{padding:110px var(--pad) 44px}
  .rvg-intro{padding:52px var(--pad)}
  .rvg-gal-section{padding:52px var(--pad)}
  .rvg-final{padding:0 var(--pad) 56px}
  .rvg-cover{padding:36px var(--pad) 0}
  .rvg-meta-row{gap:24px}
  .rvg-yt-grid{grid-template-columns:1fr}
  .rvg-next-inner{padding:44px var(--pad)}
  .rvg-foot-inner{flex-direction:column;align-items:flex-start;gap:20px;padding:32px var(--pad)}
  .rvg-flinks{flex-direction:column;gap:10px;align-items:flex-start}
  .rvg-next-actions{flex-direction:column;align-items:flex-start}
  .rvg-btn,.rvg-ghost-btn{width:100%;text-align:center;display:block}
}
@media(max-width:480px){
  :root{--pad:16px;--gap:10px}
  .rvg-abar{padding:9px 16px}
  .rvg-abar span{font-size:7px}
  .rvg-masonry{columns:1}
  .rvg-yt-thumbs{grid-template-columns:1fr}
  .rvg-row4{grid-template-columns:1fr}
  .rvg-meta-row{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
}
@media(hover:none),(pointer:coarse){
  .rvg-hamburger{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center}
  .rvg-nav-r{display:none}
  .rvg-mc:hover{transform:none;box-shadow:none}
  .rvg-btn,.rvg-ghost-btn{min-height:44px;display:inline-flex;align-items:center;justify-content:center}
}
@media(min-width:1024px){
  .rvg-hamburger{display:none}
  .rvg-nav-r{display:flex}
}
@media(prefers-reduced-motion:reduce){
  .rvg-rv{transition:none;opacity:1;transform:none}
  .rvg-drawer{transition:none}
  .rvg-ndot,.rvg-adot{animation:none}
  .rvg-mc,.rvg-mc-img{transition:none}
}
`

function MC({ name, sub, img, alt }: { name: string; sub: string; img: string; alt: string }) {
    return (
        <div className="rvg-mc">
            <div className="rvg-mc-media">
                <img className="rvg-mc-img" src={img} alt={alt} loading="lazy" />
            </div>
            <div className="rvg-mc-label">
                <div className="rvg-mc-name">{name}</div>
                {sub && <div className="rvg-mc-sub">{sub}</div>}
            </div>
        </div>
    )
}

export default function RevivGraphicPage() {
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
        const els = Array.from(ref.current?.querySelectorAll(".rvg-rv") || [])
        const reveal = () => {
            els.forEach(el => {
                if ((el as HTMLElement).getBoundingClientRect().top < window.innerHeight - 40)
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
        <div className="rvg" ref={ref}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" />
            <style>{CSS}</style>

            {/* AVAILABLE BAR */}
            <div className={`rvg-abar${navScroll ? " show" : ""}`}>
                <div className="rvg-adot" />
                <span>Available for new projects</span>
            </div>

            {/* NAV */}
            <nav className="rvg-nav" style={{ top: navScroll ? "38px" : "0" }}>
                <div className="rvg-nav-inner">
                    <a className="rvg-logo" href="/">JADEY<span>.</span></a>
                    <div className="rvg-nav-r">
                        <div className="rvg-ndot" />
                        <a href="/all-work">All Projects</a>
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a className="rvg-nav-contact" href="/#contact">Contact Me</a>
                    </div>
                    <button ref={hamburgerRef} className="rvg-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* MOBILE DRAWER */}
            <div ref={drawerRef} className={`rvg-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-label="Navigation menu">
                <button className="rvg-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <a href="/all-work" onClick={() => setMenuOpen(false)}>All Projects</a>
                <a href="/#about" onClick={() => setMenuOpen(false)}>About Me</a>
                <a href="/#work" onClick={() => setMenuOpen(false)}>Work Highlights</a>
                <a href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <a href="/#insights" onClick={() => setMenuOpen(false)}>Blog</a>
                <a href="/#workshops" onClick={() => setMenuOpen(false)}>Workshops</a>
                <a className="rvg-drawer-cta" href="/#contact" onClick={() => setMenuOpen(false)}>Contact Me</a>
            </div>

            {/* HERO */}
            <div className="rvg-hero">
                <div className="rvg-hero-inner">
                    <div className="rvg-hero-ghost">REVIV</div>
                    <div className="rvg-cat rvg-rv">Graphic Design</div>
                    <h1 className="rvg-title rvg-rv">Reviv</h1>
                    <p className="rvg-rv" style={{ fontSize: 13, lineHeight: 1.85, color: "rgba(255,255,255,0.65)", maxWidth: 520, marginBottom: 32 }}>
                        A curated graphic design showcase for Reviv, featuring YouTube thumbnails, social media posts, and story-style digital content presented through a clean and organized gallery layout.
                    </p>
                    <div className="rvg-meta-row rvg-rv">
                        <div>
                            <div className="rvg-meta-l">Client</div>
                            <div className="rvg-meta-v">Reviv</div>
                        </div>
                        <div>
                            <div className="rvg-meta-l">Service</div>
                            <div className="rvg-meta-v">Graphic Design</div>
                        </div>
                        <div>
                            <div className="rvg-meta-l">Project Type</div>
                            <div className="rvg-meta-v">Graphic Design Project</div>
                        </div>
                        <div>
                            <div className="rvg-meta-l">Industry</div>
                            <div className="rvg-meta-v">Health and Wellness</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* COVER */}
            <div className="rvg-cover rvg-rv">
                <div className="rvg-cover-wrap">
                    <img src="/Reviv%20Graphic%20Banner%20Thumbnail%20-%20Main.png" alt="Reviv — Graphic Design Showcase" />
                </div>
            </div>

            {/* INTRO */}
            <div className="rvg-intro rvg-rv">
                <div className="rvg-section-label">Overview</div>
                <p className="rvg-intro-body">
                    Reviv&apos;s graphic design work was created to support digital promotion across different content formats. This showcase features selected outputs for YouTube thumbnails, social media posts, and MyDay content, presented as separate categories for a clearer and more organized viewing experience.
                </p>
            </div>

            <hr className="rvg-divider" />

            {/* 01 — YOUTUBE VIDEO THUMBNAIL */}
            <div className="rvg-gal-section rvg-rv">
                <div className="rvg-gal-header">
                    <div className="rvg-gal-tag">01 — Graphic Design</div>
                    <h2 className="rvg-gal-title">YouTube Video Thumbnail</h2>
                    <p className="rvg-gal-desc">Thumbnail designs created to support video content and improve visual presentation across YouTube.</p>
                </div>
                <div className="rvg-yt-grid">
                    <div className="rvg-yt-thumbs">
                        <MC name="YouTube Thumbnail 1" sub="Video Content" img="/Youtube%20Thumbnail%201.png" alt="YouTube Thumbnail 1" />
                        <MC name="YouTube Thumbnail 2" sub="Video Content" img="/Youtube%20Thumbnail%202.png" alt="YouTube Thumbnail 2" />
                        <MC name="YouTube Thumbnail 3" sub="Video Content" img="/Youtube%20Thumbnail%203.png" alt="YouTube Thumbnail 3" />
                        <MC name="YouTube Thumbnail 4" sub="Video Content" img="/Youtube%20Thumbnail%204.png" alt="YouTube Thumbnail 4" />
                    </div>
                    <div className="rvg-yt-actual">
                        <div className="rvg-yt-actual-media">
                            <img src="/Reviv%20Actual%20Use%20of%20the%20YT%20Thumbnail.png" alt="Actual YouTube screen using the Reviv thumbnail" loading="lazy" />
                        </div>
                        <div className="rvg-yt-actual-label">
                            <div className="rvg-mc-name">Actual Use</div>
                            <div className="rvg-mc-sub">Applied on YouTube</div>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="rvg-divider" />

            {/* 02 — SOCIAL MEDIA POST */}
            <div className="rvg-gal-section rvg-rv">
                <div className="rvg-gal-header">
                    <div className="rvg-gal-tag">02 — Graphic Design</div>
                    <h2 className="rvg-gal-title">Social Media Post</h2>
                    <p className="rvg-gal-desc">A collection of social media graphics created for digital promotion and brand communication.</p>
                </div>
                <div className="rvg-row4">
                    <MC name="Social Media 1" sub="Digital Promotion" img="/Reviv%20Social%20Media%201.png" alt="Reviv Social Media Post 1" />
                    <MC name="Social Media 2" sub="Digital Promotion" img="/Reviv%20Social%20Media%202.png" alt="Reviv Social Media Post 2" />
                    <MC name="Social Media 3" sub="Digital Promotion" img="/Reviv%20Social%20Media%203.png" alt="Reviv Social Media Post 3" />
                    <MC name="Social Media 4" sub="Digital Promotion" img="/Reviv%20Social%20Media%204.png" alt="Reviv Social Media Post 4" />
                </div>
            </div>

            <hr className="rvg-divider" />

            {/* 03 — SOCIAL MEDIA MYDAY POST */}
            <div className="rvg-gal-section rvg-rv">
                <div className="rvg-gal-header">
                    <div className="rvg-gal-tag">03 — Graphic Design</div>
                    <h2 className="rvg-gal-title">Social Media MyDay Post</h2>
                    <p className="rvg-gal-desc">Vertical story-style graphics designed for quick digital promotion and audience engagement.</p>
                </div>
                <div className="rvg-row4">
                    <MC name="MyDay 1" sub="Story Format" img="/Reviv%20MyDay%201.png" alt="Reviv MyDay Post 1" />
                    <MC name="MyDay 2" sub="Story Format" img="/Reviv%20MyDay%202.png" alt="Reviv MyDay Post 2" />
                    <MC name="MyDay 3" sub="Story Format" img="/Reviv%20MyDay%203.png" alt="Reviv MyDay Post 3" />
                    <MC name="MyDay 4" sub="Story Format" img="/Reviv%20MyDay%204.png" alt="Reviv MyDay Post 4" />
                </div>
            </div>

            <hr className="rvg-divider" />

            {/* FINAL NOTE */}
            <div className="rvg-final rvg-rv">
                <div className="rvg-section-label" style={{ marginBottom: 16 }}>Final Note</div>
                <p className="rvg-final-body">
                    This Reviv graphic design showcase presents a range of digital promotional assets applied across YouTube thumbnails, social media posts, and story-style content. The project highlights how the visual direction can stay consistent while adapting to different digital content formats.
                </p>
            </div>

            {/* RELATED PROJECT */}
            <div className="rvg-next">
                <div className="rvg-next-inner rvg-rv">
                    <div className="rvg-next-preview">
                        <img src="/Reviv%20Landing%20Page%20Banner%20Showcase%20-%20Main.png" alt="Reviv — UI/UX Design" />
                        <div className="rvg-next-overlay">
                            <div className="rvg-next-preview-cat">UI/UX Design</div>
                            <div className="rvg-next-preview-name">Reviv</div>
                        </div>
                    </div>
                    <div>
                        <div className="rvg-next-tag">Related Project</div>
                        <div className="rvg-next-title">Reviv — UI/UX Design</div>
                        <p className="rvg-next-desc">Oral health device landing page — premium, dark, with bold before-and-after storytelling and a money-back hook.</p>
                        <div className="rvg-next-actions">
                            <a className="rvg-btn" href="/all-work/reviv">View UI/UX Project →</a>
                            <a className="rvg-ghost-btn" href="/all-work">All Work</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="rvg-foot">
                <div className="rvg-foot-inner">
                    <a className="rvg-flogo" href="/">JADEY<span>.</span></a>
                    <div className="rvg-fcopy">© 2025 Jane Dhell Cagas. All rights reserved.</div>
                    <div className="rvg-flinks">
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a href="/#contact">Contact</a>
                        <a className="rvg-fall" href="/all-work">All Projects →</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
