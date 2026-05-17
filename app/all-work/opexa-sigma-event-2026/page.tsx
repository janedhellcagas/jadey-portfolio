'use client'
import { useState, useEffect, useRef } from "react"

const CSS = `
:root{--bg:#0a0a08;--bg2:#111110;--paper:#f0ebe0;--pu:#9B59D0;--pu2:#B07AE0;--pu3:#7A3AB8;--muted:rgba(240,235,224,0.38);--border:rgba(240,235,224,0.12);--pborder:rgba(155,89,208,0.3);--pbg:rgba(155,89,208,0.08);--max:1440px;--pad:44px;--gap:14px}
.opx*{box-sizing:border-box;margin:0;padding:0}
.opx{font-family:'Space Mono',monospace;background:var(--bg);color:var(--paper);min-height:100vh;overflow-x:hidden;width:100%}
/* NAV */
.opx-nav{position:fixed;top:0;left:0;right:0;z-index:500;background:rgba(10,10,8,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:top .3s}
.opx-nav-inner{max-width:var(--max);margin:0 auto;padding:18px var(--pad);display:flex;align-items:center;justify-content:space-between}
.opx-logo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.opx-logo span{color:var(--pu)}
.opx-nav-r{display:none;align-items:center;gap:14px}
.opx-nav-r a{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.opx-nav-r a:hover{color:var(--pu)}
.opx-nav-contact{background:var(--pu)!important;color:var(--bg)!important;padding:9px 20px!important;font-weight:700!important;border:2px solid var(--pu)!important;display:inline-block!important}
.opx-nav-contact:hover{background:var(--pu2)!important;border-color:var(--pu2)!important}
.opx-ndot{width:7px;height:7px;background:var(--pu);border-radius:50%;animation:opx-pulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes opx-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.85)}}
.opx-abar{position:fixed;top:0;left:0;right:0;z-index:499;background:var(--pu3);padding:9px var(--pad);height:38px;display:none;align-items:center;justify-content:center;gap:8px}
.opx-abar.show{display:flex}
.opx-abar span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:white;font-weight:700}
.opx-adot{width:5px;height:5px;background:white;border-radius:50%;animation:opx-pulse 2s ease-in-out infinite}
/* HERO */
.opx-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#2E1050,#6B3FA0)}
.opx-hero-inner{max-width:var(--max);margin:0 auto;padding:140px var(--pad) 60px;position:relative}
.opx-hero-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(24px,7vw,120px);letter-spacing:-4px;color:rgba(240,235,224,0.035);white-space:nowrap;pointer-events:none;text-align:center;width:100%}
.opx-cat{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,0.6);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.opx-cat::before{content:'';width:36px;height:1px;background:rgba(255,255,255,0.4)}
.opx-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,8vw,110px);letter-spacing:-2px;line-height:.88;color:#fff;margin-bottom:32px}
.opx-meta-row{display:flex;gap:44px;flex-wrap:wrap;padding-top:28px;border-top:1px solid rgba(255,255,255,0.15)}
.opx-meta-l{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:4px}
.opx-meta-v{font-size:11px;color:#fff;font-weight:700}
/* COVER */
.opx-cover{padding:52px var(--pad) 0}
.opx-cover-wrap{max-width:1425px;margin:0 auto;overflow:hidden;border-radius:12px}
.opx-cover-wrap img{width:100%;height:auto;display:block}
/* INTRO */
.opx-intro{max-width:var(--max);margin:0 auto;padding:72px var(--pad)}
.opx-section-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:12px;display:flex;align-items:center;gap:10px}
.opx-section-label::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.opx-intro-body{font-size:13px;line-height:1.95;color:var(--muted);max-width:740px}
/* DIVIDER */
.opx-divider{border:none;border-top:1px solid var(--border);max-width:var(--max);margin:0 auto}
/* GALLERY SECTION */
.opx-gal-section{max-width:var(--max);margin:0 auto;padding:80px var(--pad)}
.opx-gal-header{margin-bottom:40px}
.opx-gal-tag{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:12px}
.opx-gal-tag::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.opx-gal-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,5vw,64px);letter-spacing:-1px;color:var(--paper);margin-bottom:10px;line-height:.92}
.opx-gal-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:520px}
/* MASONRY */
.opx-masonry{columns:3;column-gap:var(--gap)}
/* POSTER GRID — 4 equal columns, zero gaps */
.opx-poster-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--gap);align-items:start}
.opx-poster-grid .opx-mc{margin-bottom:0}
/* MASONRY CARD */
.opx-mc{break-inside:avoid;margin-bottom:var(--gap);border-radius:10px;overflow:hidden;border:1px solid var(--border);background:var(--bg2);transition:transform .3s,box-shadow .3s,border-color .25s}
.opx-mc:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,0.45);border-color:rgba(155,89,208,0.4)}
.opx-mc-media{overflow:hidden}
.opx-mc-img{width:100%;height:auto;display:block;transition:transform .45s ease}
.opx-mc:hover .opx-mc-img{transform:scale(1.025)}
.opx-mc-label{padding:11px 13px;border-top:1px solid var(--border)}
.opx-mc-name{font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:.5px;color:var(--paper);line-height:1.1}
.opx-mc-size{font-size:8px;letter-spacing:.16em;text-transform:uppercase;color:var(--pu);margin-top:3px}
/* FINAL */
.opx-final{max-width:var(--max);margin:0 auto;padding:72px var(--pad) 80px}
.opx-final-body{font-size:13px;line-height:1.95;color:var(--muted);max-width:740px}
/* NEXT PROJECT */
.opx-next{background:var(--bg2)}
.opx-next-inner{max-width:var(--max);margin:0 auto;padding:64px var(--pad);display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:center}
.opx-next-preview{position:relative;overflow:hidden;aspect-ratio:4/3;border:1px solid var(--border);border-radius:8px}
.opx-next-preview img{width:100%;height:100%;object-fit:cover;display:block;transform:scale(1.05)}
.opx-next-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px}
.opx-next-preview-cat{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:6px}
.opx-next-preview-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(16px,2.2vw,26px);letter-spacing:-.5px;color:#fff;line-height:1}
.opx-next-tag{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.opx-next-tag::after{content:'';width:36px;height:1px;background:var(--pu)}
.opx-next-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4.5vw,56px);letter-spacing:-1px;color:var(--paper);line-height:.92;margin-bottom:14px}
.opx-next-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:380px;margin-bottom:28px}
.opx-next-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.opx-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;background:var(--pu);color:var(--bg);border:2px solid var(--pu);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.opx-btn:hover{background:var(--pu2);border-color:var(--pu2)}
.opx-ghost-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.opx-ghost-btn:hover{border-color:var(--pu);color:var(--pu)}
/* FOOTER */
.opx-foot{border-top:1px solid var(--border)}
.opx-foot-inner{max-width:var(--max);margin:0 auto;padding:44px var(--pad);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.opx-flogo{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.opx-flogo span{color:var(--pu)}
.opx-fcopy{font-size:9px;color:var(--muted)}
.opx-flinks{display:flex;gap:18px;flex-wrap:wrap;align-items:center}
.opx-flinks a{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.opx-flinks a:hover{color:var(--pu)}
.opx-fall{color:var(--pu)!important}
/* REVEAL */
.opx-rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.opx-rv.in{opacity:1;transform:translateY(0)}
/* MOBILE DRAWER */
.opx-hamburger{display:flex;flex-direction:column;gap:5px;cursor:pointer;background:transparent;border:none;padding:6px}
.opx-hamburger span{display:block;width:24px;height:2px;background:var(--paper);transition:all .3s}
.opx-drawer{position:fixed;inset:0;z-index:600;background:var(--bg);transform:translateX(100%);transition:transform .35s ease;display:flex;flex-direction:column;padding:88px 28px 40px;overflow-y:auto}
.opx-drawer.open{transform:translateX(0)}
.opx-drawer-close{position:absolute;top:22px;right:24px;background:transparent;border:none;color:var(--paper);font-size:22px;cursor:pointer;line-height:1}
.opx-drawer a{font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;padding:18px 0;border-bottom:1px solid var(--border);transition:color .2s;display:block}
.opx-drawer a:hover,.opx-drawer a:active{color:var(--pu)}
.opx-drawer-cta{background:var(--pu);color:var(--bg)!important;padding:14px 0!important;font-weight:700;border-bottom:none!important;text-align:center;margin-top:20px;display:block;font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;transition:background .2s}
.opx-drawer-cta:hover{background:var(--pu2)}
/* RESPONSIVE */
@media(max-width:1023px){
  :root{--pad:32px}
  .opx-nav-inner{padding:14px 28px}
  .opx-masonry{columns:2}
  .opx-poster-grid{grid-template-columns:repeat(2,1fr)}
  .opx-next-inner{grid-template-columns:1fr;gap:32px}
}
@media(max-width:768px){
  :root{--pad:24px}
  .opx-hero-inner{padding:110px var(--pad) 44px}
  .opx-intro{padding:52px var(--pad)}
  .opx-gal-section{padding:52px var(--pad)}
  .opx-final{padding:52px var(--pad) 56px}
  .opx-cover{padding:36px var(--pad) 0}
  .opx-meta-row{gap:24px}
  .opx-next-inner{padding:44px var(--pad)}
  .opx-foot-inner{flex-direction:column;align-items:flex-start;gap:20px;padding:32px var(--pad)}
  .opx-flinks{flex-direction:column;gap:10px;align-items:flex-start}
  .opx-next-actions{flex-direction:column;align-items:flex-start}
  .opx-btn,.opx-ghost-btn{width:100%;text-align:center;display:block}
}
@media(max-width:480px){
  :root{--pad:16px;--gap:10px}
  .opx-abar{padding:9px 16px}
  .opx-abar span{font-size:7px}
  .opx-masonry{columns:1}
  .opx-poster-grid{grid-template-columns:1fr}
  .opx-meta-row{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
}
@media(hover:none),(pointer:coarse){
  .opx-hamburger{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center}
  .opx-nav-r{display:none}
  .opx-mc:hover{transform:none;box-shadow:none}
  .opx-btn,.opx-ghost-btn{min-height:44px;display:inline-flex;align-items:center;justify-content:center}
}
@media(min-width:1024px){
  .opx-hamburger{display:none}
  .opx-nav-r{display:flex}
}
@media(prefers-reduced-motion:reduce){
  .opx-rv{transition:none;opacity:1;transform:none}
  .opx-drawer{transition:none}
  .opx-ndot,.opx-adot{animation:none}
  .opx-mc,.opx-mc-img{transition:none}
}
`

function MC({ name, sub, img, alt }: { name: string; sub?: string; img: string; alt: string }) {
    return (
        <div className="opx-mc">
            <div className="opx-mc-media">
                <img className="opx-mc-img" src={img} alt={alt} loading="lazy" />
            </div>
            <div className="opx-mc-label">
                <div className="opx-mc-name">{name}</div>
                {sub && <div className="opx-mc-size">{sub}</div>}
            </div>
        </div>
    )
}

export default function OpexaSigmaEventPage() {
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
        const els = Array.from(ref.current?.querySelectorAll(".opx-rv") || [])
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
        <div className="opx" ref={ref}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" />
            <style>{CSS}</style>

            {/* AVAILABLE BAR */}
            <div className={`opx-abar${navScroll ? " show" : ""}`}>
                <div className="opx-adot" />
                <span>Available for new projects</span>
            </div>

            {/* NAV */}
            <nav className="opx-nav" style={{ top: navScroll ? "38px" : "0" }}>
                <div className="opx-nav-inner">
                    <a className="opx-logo" href="/">JADEY<span>.</span></a>
                    <div className="opx-nav-r">
                        <div className="opx-ndot" />
                        <a href="/all-work">All Projects</a>
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a className="opx-nav-contact" href="/#contact">Contact Me</a>
                    </div>
                    <button ref={hamburgerRef} className="opx-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* MOBILE DRAWER */}
            <div ref={drawerRef} className={`opx-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-label="Navigation menu">
                <button className="opx-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <a href="/all-work" onClick={() => setMenuOpen(false)}>All Projects</a>
                <a href="/#about" onClick={() => setMenuOpen(false)}>About Me</a>
                <a href="/#work" onClick={() => setMenuOpen(false)}>Work Highlights</a>
                <a href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <a href="/#insights" onClick={() => setMenuOpen(false)}>Blog</a>
                <a href="/#workshops" onClick={() => setMenuOpen(false)}>Workshops</a>
                <a className="opx-drawer-cta" href="/#contact" onClick={() => setMenuOpen(false)}>Contact Me</a>
            </div>

            {/* HERO */}
            <div className="opx-hero">
                <div className="opx-hero-inner">
                    <div className="opx-hero-ghost">OPEXA SIGMA 2026</div>
                    <div className="opx-cat opx-rv">Graphic Design</div>
                    <h1 className="opx-title opx-rv">OPEXA Sigma<br />Event 2026</h1>
                    <p className="opx-rv" style={{ fontSize: 13, lineHeight: 1.85, color: "rgba(255,255,255,0.65)", maxWidth: 520, marginBottom: 32 }}>
                        A curated graphic design showcase for OPEXA Sigma Event 2026, featuring event posters and merchandise graphics designed for branded event presentation.
                    </p>
                    <div className="opx-meta-row opx-rv">
                        <div>
                            <div className="opx-meta-l">Client</div>
                            <div className="opx-meta-v">OPEXA</div>
                        </div>
                        <div>
                            <div className="opx-meta-l">Service</div>
                            <div className="opx-meta-v">Graphic Design</div>
                        </div>
                        <div>
                            <div className="opx-meta-l">Project Type</div>
                            <div className="opx-meta-v">Graphic Design Project</div>
                        </div>
                        <div>
                            <div className="opx-meta-l">Industry</div>
                            <div className="opx-meta-v">Event / Exhibition / Promotional Design</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* COVER */}
            <div className="opx-cover opx-rv">
                <div className="opx-cover-wrap">
                    <img src="/Opexa%20Thumbnail.png" alt="OPEXA Sigma Event 2026 — Graphic Design Showcase" />
                </div>
            </div>

            {/* INTRO */}
            <div className="opx-intro opx-rv">
                <div className="opx-section-label">Overview</div>
                <p className="opx-intro-body">
                    OPEXA Sigma Event 2026 brings together a set of graphic design outputs created for event presentation and branded collateral. This showcase features selected poster designs and merchandise applications, presented as separate categories for a cleaner and more organized viewing experience.
                </p>
            </div>

            <hr className="opx-divider" />

            {/* ── 01 POSTER DESIGN ── */}
            <div className="opx-gal-section opx-rv">
                <div className="opx-gal-header">
                    <div className="opx-gal-tag">01 — Graphic Design</div>
                    <h2 className="opx-gal-title">Poster Design</h2>
                    <p className="opx-gal-desc">A collection of event poster designs created for display and presentation use in the meeting room.</p>
                </div>
                <div className="opx-poster-grid">
                    <MC name="Poster 1" img="/Opexa%20-%20Poster%201.png" alt="OPEXA Sigma Event 2026 — Poster 1" />
                    <MC name="Poster 2" img="/Opexa%20-%20%20Poster%202.png" alt="OPEXA Sigma Event 2026 — Poster 2" />
                    <MC name="Poster 3" img="/%20Opexa%20-%20Poster%203.png" alt="OPEXA Sigma Event 2026 — Poster 3" />
                    <MC name="Poster 4" img="/Opexa%20-%20Poster%204.png" alt="OPEXA Sigma Event 2026 — Poster 4" />
                </div>
            </div>

            <hr className="opx-divider" />

            {/* ── 02 MERCH DESIGN ── */}
            <div className="opx-gal-section opx-rv">
                <div className="opx-gal-header">
                    <div className="opx-gal-tag">02 — Graphic Design</div>
                    <h2 className="opx-gal-title">Merch Design</h2>
                    <p className="opx-gal-desc">Branded merchandise graphics created to support the OPEXA Sigma Event 2026 visual presentation.</p>
                </div>
                <div className="opx-masonry">
                    <MC name="Merch 1" img="/Opexa%20-%20Merch%201.png" alt="OPEXA Sigma Event 2026 — Merch 1" />
                    <MC name="Merch 2" img="/Opexa%20-%20Merch%202.png" alt="OPEXA Sigma Event 2026 — Merch 2" />
                    <MC name="Merch 3" img="/Opexa%20-%20Merch%203.png" alt="OPEXA Sigma Event 2026 — Merch 3" />
                    <MC name="Merch 4" img="/Opexa%20-%20Merch%204.png" alt="OPEXA Sigma Event 2026 — Merch 4" />
                    <MC name="Merch 5" img="/Opexa%20-%20Merch%205.png" alt="OPEXA Sigma Event 2026 — Merch 5" />
                    <MC name="Merch 6" img="/Opexa%20-%20Merch%206.png" alt="OPEXA Sigma Event 2026 — Merch 6" />
                </div>
            </div>

            <hr className="opx-divider" />

            {/* FINAL NOTE */}
            <div className="opx-final opx-rv">
                <div className="opx-section-label" style={{ marginBottom: 16 }}>Final Note</div>
                <p className="opx-final-body">
                    This OPEXA Sigma Event 2026 graphic design showcase presents a curated set of event posters and branded merchandise graphics created for presentation and collateral use. The project highlights how the visual direction can stay consistent across different event-focused design applications.
                </p>
            </div>

            {/* NEXT PROJECT */}
            <div className="opx-next">
                <div className="opx-next-inner opx-rv">
                    <div className="opx-next-preview">
                        <img src="/Lunara%20-%20Thumbnail%20(Graphic).png" alt="Lunara Haircare — Graphic Design" />
                        <div className="opx-next-overlay">
                            <div className="opx-next-preview-cat">Graphic Design</div>
                            <div className="opx-next-preview-name">Lunara Haircare</div>
                        </div>
                    </div>
                    <div>
                        <div className="opx-next-tag">Next Project</div>
                        <div className="opx-next-title">Lunara Haircare</div>
                        <p className="opx-next-desc">A curated graphic design showcase for a premium hair care brand — social media content, posters, packaging, and large-format advertising.</p>
                        <div className="opx-next-actions">
                            <a className="opx-btn" href="/all-work/lunara-haircare-graphic">View Project →</a>
                            <a className="opx-ghost-btn" href="/all-work">All Work</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="opx-foot">
                <div className="opx-foot-inner">
                    <a className="opx-flogo" href="/">JADEY<span>.</span></a>
                    <div className="opx-fcopy">© 2025 Jane Dhell Cagas. All rights reserved.</div>
                    <div className="opx-flinks">
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a href="/#contact">Contact</a>
                        <a className="opx-fall" href="/all-work">All Projects →</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
