'use client'
import { useState, useEffect, useRef } from "react"

const CSS = `
:root{--bg:#0a0a08;--bg2:#111110;--paper:#f0ebe0;--pu:#9B59D0;--pu2:#B07AE0;--pu3:#7A3AB8;--muted:rgba(240,235,224,0.38);--border:rgba(240,235,224,0.12);--pborder:rgba(155,89,208,0.3);--pbg:rgba(155,89,208,0.08);--max:1440px;--pad:44px;--gap:14px}
.lhg*{box-sizing:border-box;margin:0;padding:0}
.lhg{font-family:'Space Mono',monospace;background:var(--bg);color:var(--paper);min-height:100vh;overflow-x:hidden;width:100%}
/* NAV */
.lhg-nav{position:fixed;top:0;left:0;right:0;z-index:500;background:rgba(10,10,8,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:top .3s}
.lhg-nav-inner{max-width:var(--max);margin:0 auto;padding:18px var(--pad);display:flex;align-items:center;justify-content:space-between}
.lhg-logo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.lhg-logo span{color:var(--pu)}
.lhg-nav-r{display:none;align-items:center;gap:14px}
.lhg-nav-r a{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.lhg-nav-r a:hover{color:var(--pu)}
.lhg-nav-contact{background:var(--pu)!important;color:var(--bg)!important;padding:9px 20px!important;font-weight:700!important;border:2px solid var(--pu)!important;display:inline-block!important}
.lhg-nav-contact:hover{background:var(--pu2)!important;border-color:var(--pu2)!important}
.lhg-ndot{width:7px;height:7px;background:var(--pu);border-radius:50%;animation:lhg-pulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes lhg-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.85)}}
.lhg-abar{position:fixed;top:0;left:0;right:0;z-index:499;background:var(--pu3);padding:9px var(--pad);height:38px;display:none;align-items:center;justify-content:center;gap:8px}
.lhg-abar.show{display:flex}
.lhg-abar span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:white;font-weight:700}
.lhg-adot{width:5px;height:5px;background:white;border-radius:50%;animation:lhg-pulse 2s ease-in-out infinite}
/* HERO */
.lhg-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#2E1050,#6B3FA0)}
.lhg-hero-inner{max-width:var(--max);margin:0 auto;padding:140px var(--pad) 60px;position:relative}
.lhg-hero-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,9vw,140px);letter-spacing:-4px;color:rgba(240,235,224,0.035);white-space:nowrap;pointer-events:none;text-align:center;width:100%}
.lhg-cat{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,0.6);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.lhg-cat::before{content:'';width:36px;height:1px;background:rgba(255,255,255,0.4)}
.lhg-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,9vw,120px);letter-spacing:-2px;line-height:.88;color:#fff;margin-bottom:32px}
.lhg-meta-row{display:flex;gap:44px;flex-wrap:wrap;padding-top:28px;border-top:1px solid rgba(255,255,255,0.15)}
.lhg-meta-l{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:4px}
.lhg-meta-v{font-size:11px;color:#fff;font-weight:700}
/* COVER */
.lhg-cover{padding:52px var(--pad) 0}
.lhg-cover-wrap{max-width:1425px;margin:0 auto;overflow:hidden;border-radius:12px}
.lhg-cover-wrap img{width:100%;height:auto;display:block}
/* INTRO */
.lhg-intro{max-width:var(--max);margin:0 auto;padding:72px var(--pad)}
.lhg-section-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:12px;display:flex;align-items:center;gap:10px}
.lhg-section-label::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.lhg-intro-body{font-size:13px;line-height:1.95;color:var(--muted);max-width:740px}
/* DIVIDER */
.lhg-divider{border:none;border-top:1px solid var(--border);max-width:var(--max);margin:0 auto}
/* GALLERY SECTION */
.lhg-gal-section{max-width:var(--max);margin:0 auto;padding:80px var(--pad)}
.lhg-gal-header{margin-bottom:40px}
.lhg-gal-tag{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:12px}
.lhg-gal-tag::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.lhg-gal-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,5vw,64px);letter-spacing:-1px;color:var(--paper);margin-bottom:10px;line-height:.92}
.lhg-gal-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:520px}
/* ── MASONRY ── */
.lhg-masonry{columns:3;column-gap:var(--gap)}
/* MASONRY CARD */
.lhg-mc{break-inside:avoid;margin-bottom:var(--gap);border-radius:10px;overflow:hidden;border:1px solid var(--border);background:var(--bg2);transition:transform .3s,box-shadow .3s,border-color .25s}
.lhg-mc:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,0.45);border-color:rgba(155,89,208,0.4)}
.lhg-mc-media{overflow:hidden}
.lhg-mc-img{width:100%;height:auto;display:block;transition:transform .45s ease}
.lhg-mc:hover .lhg-mc-img{transform:scale(1.025)}
.lhg-mc-label{padding:11px 13px;border-top:1px solid var(--border)}
.lhg-mc-name{font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:.5px;color:var(--paper);line-height:1.1}
.lhg-mc-size{font-size:8px;letter-spacing:.16em;text-transform:uppercase;color:var(--pu);margin-top:3px}
/* PACKAGING FEATURE — single item, centred */
.lhg-pack-wrap{border-radius:10px;overflow:hidden;border:1px solid var(--border);background:var(--bg2);max-width:1080px;width:100%;margin:0 auto;transition:transform .3s,box-shadow .3s,border-color .25s}
.lhg-pack-wrap:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,0.45);border-color:rgba(155,89,208,0.4)}
.lhg-pack-wrap img{width:100%;height:auto;display:block}
.lhg-pack-label{padding:13px 16px;border-top:1px solid var(--border)}
.lhg-pack-name{font-family:'Bebas Neue',sans-serif;font-size:17px;letter-spacing:.5px;color:var(--paper)}
.lhg-pack-size{font-size:8px;letter-spacing:.16em;text-transform:uppercase;color:var(--pu);margin-top:4px}
/* FINAL */
.lhg-final{max-width:var(--max);margin:0 auto;padding:72px var(--pad) 80px}
.lhg-final-body{font-size:13px;line-height:1.95;color:var(--muted);max-width:740px}
.lhg-final-ai{font-size:12px;line-height:1.95;color:rgba(176,122,224,0.75);max-width:740px;margin-top:20px}
/* NEXT PROJECT */
.lhg-next{background:var(--bg2)}
.lhg-next-inner{max-width:var(--max);margin:0 auto;padding:64px var(--pad);display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:center}
.lhg-next-preview{position:relative;overflow:hidden;aspect-ratio:4/3;border:1px solid var(--border);border-radius:8px}
.lhg-next-preview img{width:100%;height:100%;object-fit:cover;display:block;transform:scale(1.05)}
.lhg-next-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px}
.lhg-next-preview-cat{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:6px}
.lhg-next-preview-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(16px,2.2vw,26px);letter-spacing:-.5px;color:#fff;line-height:1}
.lhg-next-tag{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.lhg-next-tag::after{content:'';width:36px;height:1px;background:var(--pu)}
.lhg-next-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4.5vw,56px);letter-spacing:-1px;color:var(--paper);line-height:.92;margin-bottom:14px}
.lhg-next-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:380px;margin-bottom:28px}
.lhg-next-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.lhg-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;background:var(--pu);color:var(--bg);border:2px solid var(--pu);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.lhg-btn:hover{background:var(--pu2);border-color:var(--pu2)}
.lhg-ghost-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.lhg-ghost-btn:hover{border-color:var(--pu);color:var(--pu)}
/* FOOTER */
.lhg-foot{border-top:1px solid var(--border)}
.lhg-foot-inner{max-width:var(--max);margin:0 auto;padding:44px var(--pad);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.lhg-flogo{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.lhg-flogo span{color:var(--pu)}
.lhg-fcopy{font-size:9px;color:var(--muted)}
.lhg-flinks{display:flex;gap:18px;flex-wrap:wrap;align-items:center}
.lhg-flinks a{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.lhg-flinks a:hover{color:var(--pu)}
.lhg-fall{color:var(--pu)!important}
/* REVEAL */
.lhg-rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.lhg-rv.in{opacity:1;transform:translateY(0)}
/* MOBILE DRAWER */
.lhg-hamburger{display:flex;flex-direction:column;gap:5px;cursor:pointer;background:transparent;border:none;padding:6px}
.lhg-hamburger span{display:block;width:24px;height:2px;background:var(--paper);transition:all .3s}
.lhg-drawer{position:fixed;inset:0;z-index:600;background:var(--bg);transform:translateX(100%);transition:transform .35s ease;display:flex;flex-direction:column;padding:88px 28px 40px;overflow-y:auto}
.lhg-drawer.open{transform:translateX(0)}
.lhg-drawer-close{position:absolute;top:22px;right:24px;background:transparent;border:none;color:var(--paper);font-size:22px;cursor:pointer;line-height:1}
.lhg-drawer a{font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;padding:18px 0;border-bottom:1px solid var(--border);transition:color .2s;display:block}
.lhg-drawer a:hover,.lhg-drawer a:active{color:var(--pu)}
.lhg-drawer-cta{background:var(--pu);color:var(--bg)!important;padding:14px 0!important;font-weight:700;border-bottom:none!important;text-align:center;margin-top:20px;display:block;font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;transition:background .2s}
.lhg-drawer-cta:hover{background:var(--pu2)}
/* ── RESPONSIVE ── */
@media(max-width:1023px){
  :root{--pad:32px}
  .lhg-nav-inner{padding:14px 28px}
  .lhg-masonry{columns:2}
  .lhg-next-inner{grid-template-columns:1fr;gap:32px}
}
@media(max-width:768px){
  :root{--pad:24px}
  .lhg-hero-inner{padding:110px var(--pad) 44px}
  .lhg-intro{padding:52px var(--pad)}
  .lhg-gal-section{padding:52px var(--pad)}
  .lhg-ai-section{padding:52px var(--pad)}
  .lhg-final{padding:0 var(--pad) 56px}
  .lhg-cover{padding:36px var(--pad) 0}
  .lhg-meta-row{gap:24px}
  .lhg-next-inner{padding:44px var(--pad)}
  .lhg-foot-inner{flex-direction:column;align-items:flex-start;gap:20px;padding:32px var(--pad)}
  .lhg-flinks{flex-direction:column;gap:10px;align-items:flex-start}
  .lhg-next-actions{flex-direction:column;align-items:flex-start}
  .lhg-btn,.lhg-ghost-btn{width:100%;text-align:center;display:block}
}
@media(max-width:480px){
  :root{--pad:16px;--gap:10px}
  .lhg-abar{padding:9px 16px}
  .lhg-abar span{font-size:7px}
  .lhg-masonry{columns:1}
  .lhg-meta-row{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
}
@media(hover:none),(pointer:coarse){
  .lhg-hamburger{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center}
  .lhg-nav-r{display:none}
  .lhg-mc:hover,.lhg-pack-wrap:hover{transform:none;box-shadow:none}
  .lhg-btn,.lhg-ghost-btn{min-height:44px;display:inline-flex;align-items:center;justify-content:center}
}
@media(min-width:1024px){
  .lhg-hamburger{display:none}
  .lhg-nav-r{display:flex}
}
@media(prefers-reduced-motion:reduce){
  .lhg-rv{transition:none;opacity:1;transform:none}
  .lhg-drawer{transition:none}
  .lhg-ndot,.lhg-adot{animation:none}
  .lhg-mc,.lhg-mc-img,.lhg-pack-wrap{transition:none}
}
`

function MC({ name, size, img, alt }: { name: string; size: string; img: string; alt: string }) {
    return (
        <div className="lhg-mc">
            <div className="lhg-mc-media">
                <img className="lhg-mc-img" src={img} alt={alt} loading="lazy" />
            </div>
            <div className="lhg-mc-label">
                <div className="lhg-mc-name">{name}</div>
                <div className="lhg-mc-size">{size}</div>
            </div>
        </div>
    )
}

export default function LunaraHaircareGraphicPage() {
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
        const els = Array.from(ref.current?.querySelectorAll(".lhg-rv") || [])
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
        <div className="lhg" ref={ref}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" />
            <style>{CSS}</style>

            {/* AVAILABLE BAR */}
            <div className={`lhg-abar${navScroll ? " show" : ""}`}>
                <div className="lhg-adot" />
                <span>Available for new projects</span>
            </div>

            {/* NAV */}
            <nav className="lhg-nav" style={{ top: navScroll ? "38px" : "0" }}>
                <div className="lhg-nav-inner">
                    <a className="lhg-logo" href="/"><img src="/Jadey%20Site%20Logo.png" alt="Jadey Design" style={{height:"28px",width:"auto",display:"block"}} /></a>
                    <div className="lhg-nav-r">
                        <div className="lhg-ndot" />
                        <a href="/all-work">All Projects</a>
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a className="lhg-nav-contact" href="/#contact">Contact Me</a>
                    </div>
                    <button ref={hamburgerRef} className="lhg-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* MOBILE DRAWER */}
            <div ref={drawerRef} className={`lhg-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-label="Navigation menu">
                <button className="lhg-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <a href="/all-work" onClick={() => setMenuOpen(false)}>All Projects</a>
                <a href="/#about" onClick={() => setMenuOpen(false)}>About Me</a>
                <a href="/#work" onClick={() => setMenuOpen(false)}>Work Highlights</a>
                <a href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <a href="/#insights" onClick={() => setMenuOpen(false)}>Blog</a>
                <a href="/#workshops" onClick={() => setMenuOpen(false)}>Workshops</a>
                <a className="lhg-drawer-cta" href="/#contact" onClick={() => setMenuOpen(false)}>Contact Me</a>
            </div>

            {/* HERO */}
            <div className="lhg-hero">
                <div className="lhg-hero-inner">
                    <div className="lhg-hero-ghost">LUNARA HAIRCARE</div>
                    <div className="lhg-cat lhg-rv">Graphic Design</div>
                    <h1 className="lhg-title lhg-rv">Lunara Haircare</h1>
                    <p className="lhg-rv" style={{ fontSize: 13, lineHeight: 1.85, color: "rgba(255,255,255,0.65)", maxWidth: 520, marginBottom: 32 }}>
                        A curated graphic design showcase for Lunara Haircare, featuring promotional assets across social media, posters, packaging, and billboard design.
                    </p>
                    <div className="lhg-meta-row lhg-rv">
                        <div>
                            <div className="lhg-meta-l">Client</div>
                            <div className="lhg-meta-v">Lunara Haircare</div>
                        </div>
                        <div>
                            <div className="lhg-meta-l">Service</div>
                            <div className="lhg-meta-v">Graphic Design</div>
                        </div>
                        <div>
                            <div className="lhg-meta-l">Project Type</div>
                            <div className="lhg-meta-v">AI-Assisted Project</div>
                        </div>
                        <div>
                            <div className="lhg-meta-l">Industry</div>
                            <div className="lhg-meta-v">Hair Care / Beauty / Personal Care</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* COVER */}
            <div className="lhg-cover lhg-rv">
                <div className="lhg-cover-wrap">
                    <img src="/Lunara%20-%20Thumbnail%20(Graphic).png" alt="Lunara Haircare — Graphic Design Showcase" />
                </div>
            </div>

            {/* INTRO */}
            <div className="lhg-intro lhg-rv">
                <div className="lhg-section-label">Overview</div>
                <p className="lhg-intro-body">
                    Lunara Haircare&apos;s graphic design work was created to extend the brand across multiple promotional touchpoints. This showcase features selected outputs for social media, posters, packaging, and large-format advertising — presented as separate categories for a clearer and more organized viewing experience.
                </p>
            </div>

            <hr className="lhg-divider" />

            {/* ── 01 SOCIAL MEDIA ── */}
            <div className="lhg-gal-section lhg-rv">
                <div className="lhg-gal-header">
                    <div className="lhg-gal-tag">01 — Graphic Design</div>
                    <h2 className="lhg-gal-title">Social Media</h2>
                    <p className="lhg-gal-desc">A curated set of digital graphics created for feed posts, stories, covers, and ad creatives.</p>
                </div>
                <div className="lhg-masonry">
                    <MC name="Instagram Square Feed Post" size="1080 × 1080 px"
                        img="/Instagram%20Square%20Feed%20Post%20Size-%201080px%20x%201080px.png"
                        alt="Instagram Square Feed Post" />
                    <MC name="Instagram Portrait Feed Post" size="1080 × 1350 px"
                        img="/Instagram%20Portrait%20Feed%20Post%20Size-%201080px%20x%201350px.png"
                        alt="Instagram Portrait Feed Post" />
                    <MC name="Instagram Story / Facebook Story" size="1080 × 1920 px"
                        img="/Instagram%20Story%20%3A%20Facebook%20Story%20Size-%201080px%20x%201920px.png"
                        alt="Instagram Story / Facebook Story" />
                    <MC name="Facebook Cover Photo" size="1640 × 624 px"
                        img="/Facebook%20Cover%20Photo%20Size-%201640px%20x%20624px.png"
                        alt="Facebook Cover Photo" />
                    <MC name="Facebook Feed Post" size="1200 × 1200 px"
                        img="/Facebook%20Feed%20Post%20Size-%201200px%20x%201200px.png"
                        alt="Facebook Feed Post" />
                    <MC name="Facebook / Instagram Ad Creative" size="1080 × 1080 px · 1080 × 1350 px"
                        img="/Facebook%20%3A%20Instagram%20Ad%20Creative%20Size-%201080px%20x%201080px%20or%201080px%20x%201350px.png"
                        alt="Facebook / Instagram Ad Creative" />
                </div>
            </div>

            <hr className="lhg-divider" />

            {/* ── 02 POSTER ── */}
            <div className="lhg-gal-section lhg-rv">
                <div className="lhg-gal-header">
                    <div className="lhg-gal-tag">02 — Graphic Design</div>
                    <h2 className="lhg-gal-title">Poster</h2>
                    <p className="lhg-gal-desc">Print and digital poster designs created for product promotion, campaigns, and retail display.</p>
                </div>
                <div className="lhg-masonry">
                    <MC name="A3 Vertical Product Poster" size="3508 × 4961 px"
                        img="/A3%20Vertical%20Product%20Poster%20Size-%203508px%20x%204961px.png"
                        alt="A3 Vertical Product Poster" />
                    <MC name="A4 Vertical Product Poster" size="2480 × 3508 px"
                        img="/A4%20Vertical%20Product%20Poster%20Size-%202480px%20x%203508px.png"
                        alt="A4 Vertical Product Poster" />
                    <MC name="Square Digital Poster" size="1080 × 1080 px"
                        img="/Square%20Digital%20Poster%20Size-%201080px%20x%201080px%20.png"
                        alt="Square Digital Poster" />
                    <MC name="Portrait Digital Poster" size="1080 × 1350 px"
                        img="/Portrait%20Digital%20Poster%20Size-%201080px%20x%201350px%20.png"
                        alt="Portrait Digital Poster" />
                    <MC name="Wide Landscape Poster / Web Banner" size="1920 × 1080 px"
                        img="/Wide%20Landscape%20Poster%20%3A%20Web%20Banner%20Size-%201920px%20x%201080px.png"
                        alt="Wide Landscape Poster / Web Banner" />
                    <MC name="Retail Display Poster" size="2800 × 2100 px"
                        img="/Retail%20Display%20Poster%20Size-%202800px%20x%202100px.png"
                        alt="Retail Display Poster" />
                </div>
            </div>

            <hr className="lhg-divider" />

            {/* ── 03 PACKAGING ── */}
            <div className="lhg-gal-section lhg-rv">
                <div className="lhg-gal-header">
                    <div className="lhg-gal-tag">03 — Graphic Design</div>
                    <h2 className="lhg-gal-title">Packaging Design</h2>
                    <p className="lhg-gal-desc">Product packaging visuals created to present Lunara Haircare in a clean and premium way.</p>
                </div>
                <div className="lhg-pack-wrap">
                    <img src="/Lunara%20-%20Product%20Packaging.png" alt="Lunara Haircare — Product Packaging" loading="lazy" />
                    <div className="lhg-pack-label">
                        <div className="lhg-pack-name">Product Packaging</div>
                        <div className="lhg-pack-size">Lunara Haircare · Minimal, polished, self-care focused</div>
                    </div>
                </div>
            </div>

            <hr className="lhg-divider" />

            {/* ── 04 TARPAULIN / BILLBOARD ── */}
            <div className="lhg-gal-section lhg-rv">
                <div className="lhg-gal-header">
                    <div className="lhg-gal-tag">04 — Graphic Design</div>
                    <h2 className="lhg-gal-title">Tarpaulin / Billboard</h2>
                    <p className="lhg-gal-desc">Large-format promotional graphics designed for outdoor, retail, salon, and event display use.</p>
                </div>
                <div className="lhg-masonry">
                    <MC name="Outdoor Billboard" size="3840 × 2160 px"
                        img="/Outdoor%20Billboard%20Size-%203840px%20x%202160px.png"
                        alt="Outdoor Billboard" />
                    <MC name="Horizontal Store Tarpaulin" size="3000 × 1500 px"
                        img="/Horizontal%20Store%20Tarpaulin%20Size-%203000px%20x%201500px.png"
                        alt="Horizontal Store Tarpaulin" />
                    <MC name="Vertical In-Store Poster" size="2160 × 3840 px"
                        img="/Vertical%20In-Store%20Poster%20Size-%202160px%20x%203840px.png"
                        alt="Vertical In-Store Poster" />
                    <MC name="Event Booth / Promotional Banner" size="3000 × 2000 px"
                        img="/Event%20Booth%20or%20Promotional%20Banner%20Size-%203000px%20x%202000px.png"
                        alt="Event Booth / Promotional Banner" />
                    <MC name="Retail Poster Display" size="2800 × 2100 px"
                        img="/Retail%20Poster%20Display%20Size-%202800px%20x%202100px.png"
                        alt="Retail Poster Display" />
                </div>
            </div>

            <hr className="lhg-divider" />

            {/* FINAL NOTE */}
            <div className="lhg-final lhg-rv">
                <div className="lhg-section-label" style={{ marginBottom: 16 }}>Final Note</div>
                <p className="lhg-final-body">
                    This Lunara Haircare graphic design showcase presents a range of promotional assets applied across digital, print, packaging, and large-format formats. The project highlights how the visual direction can stay consistent while adapting to different graphic design needs.
                </p>
                <p className="lhg-final-ai">
                    This project used AI as a support tool to speed up visual exploration and production, while the final graphic selection, layout presentation, and overall project curation were still refined by the designer.
                </p>
            </div>

            {/* RELATED PROJECT */}
            <div className="lhg-next">
                <div className="lhg-next-inner lhg-rv">
                    <div className="lhg-next-preview">
                        <img src="/Lunara%20-%20Thumbnail.png" alt="Lunara Haircare — Brand Identity" />
                        <div className="lhg-next-overlay">
                            <div className="lhg-next-preview-cat">Brand Identity Design</div>
                            <div className="lhg-next-preview-name">Lunara Haircare</div>
                        </div>
                    </div>
                    <div>
                        <div className="lhg-next-tag">Related Project</div>
                        <div className="lhg-next-title">Lunara Haircare — Brand Identity</div>
                        <p className="lhg-next-desc">The full brand identity system behind Lunara Haircare — logo, color, typography, merchandise, and product packaging.</p>
                        <div className="lhg-next-actions">
                            <a className="lhg-btn" href="/all-work/lunara-haircare">View Brand Identity →</a>
                            <a className="lhg-ghost-btn" href="/all-work">All Work</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="lhg-foot">
                <div className="lhg-foot-inner">
                    <a className="lhg-flogo" href="/"><img src="/Jadey%20Site%20Logo.png" alt="Jadey Design" style={{height:"28px",width:"auto",display:"block"}} /></a>
                    <div className="lhg-fcopy">© 2025 Jane Dhell Cagas. All rights reserved.</div>
                    <div className="lhg-flinks">
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a href="/#contact">Contact</a>
                        <a className="lhg-fall" href="/all-work">All Projects →</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
