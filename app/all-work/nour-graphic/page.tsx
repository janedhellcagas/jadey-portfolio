'use client'
import { useState, useEffect, useRef } from "react"

const CSS = `
:root{--bg:#0a0a08;--bg2:#111110;--paper:#f0ebe0;--pu:#9B59D0;--pu2:#B07AE0;--pu3:#7A3AB8;--muted:rgba(240,235,224,0.38);--border:rgba(240,235,224,0.12);--pborder:rgba(155,89,208,0.3);--pbg:rgba(155,89,208,0.08);--max:1440px;--pad:44px;--gap:14px}
.ng*{box-sizing:border-box;margin:0;padding:0}
.ng{font-family:'Space Mono',monospace;background:var(--bg);color:var(--paper);min-height:100vh;overflow-x:hidden;width:100%}
/* NAV */
.ng-nav{position:fixed;top:0;left:0;right:0;z-index:500;background:rgba(10,10,8,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:top .3s}
.ng-nav-inner{max-width:var(--max);margin:0 auto;padding:18px var(--pad);display:flex;align-items:center;justify-content:space-between}
.ng-logo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.ng-logo span{color:var(--pu)}
.ng-nav-r{display:none;align-items:center;gap:14px}
.ng-nav-r a{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.ng-nav-r a:hover{color:var(--pu)}
.ng-nav-contact{background:var(--pu)!important;color:var(--bg)!important;padding:9px 20px!important;font-weight:700!important;border:2px solid var(--pu)!important;display:inline-block!important}
.ng-nav-contact:hover{background:var(--pu2)!important;border-color:var(--pu2)!important}
.ng-ndot{width:7px;height:7px;background:var(--pu);border-radius:50%;animation:ng-pulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes ng-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.85)}}
.ng-abar{position:fixed;top:0;left:0;right:0;z-index:499;background:var(--pu3);padding:9px var(--pad);height:38px;display:none;align-items:center;justify-content:center;gap:8px}
.ng-abar.show{display:flex}
.ng-abar span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:white;font-weight:700}
.ng-adot{width:5px;height:5px;background:white;border-radius:50%;animation:ng-pulse 2s ease-in-out infinite}
/* HERO */
.ng-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#2E1050,#6B3FA0)}
.ng-hero-inner{max-width:var(--max);margin:0 auto;padding:140px var(--pad) 60px;position:relative}
.ng-hero-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,9vw,140px);letter-spacing:-4px;color:rgba(240,235,224,0.035);white-space:nowrap;pointer-events:none;text-align:center;width:100%}
.ng-cat{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,0.6);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.ng-cat::before{content:'';width:36px;height:1px;background:rgba(255,255,255,0.4)}
.ng-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,9vw,120px);letter-spacing:-2px;line-height:.88;color:#fff;margin-bottom:32px}
.ng-meta-row{display:flex;gap:44px;flex-wrap:wrap;padding-top:28px;border-top:1px solid rgba(255,255,255,0.15)}
.ng-meta-l{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:4px}
.ng-meta-v{font-size:11px;color:#fff;font-weight:700}
/* COVER */
.ng-cover{padding:52px var(--pad) 0}
.ng-cover-wrap{max-width:1425px;margin:0 auto;overflow:hidden;border-radius:12px}
.ng-cover-wrap img{width:100%;height:auto;display:block}
/* INTRO */
.ng-intro{max-width:var(--max);margin:0 auto;padding:72px var(--pad)}
.ng-section-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:12px;display:flex;align-items:center;gap:10px}
.ng-section-label::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.ng-intro-body{font-size:13px;line-height:1.95;color:var(--muted);max-width:740px}
/* DIVIDER */
.ng-divider{border:none;border-top:1px solid var(--border);max-width:var(--max);margin:0 auto}
/* GALLERY SECTION */
.ng-gal-section{max-width:var(--max);margin:0 auto;padding:80px var(--pad)}
.ng-gal-header{margin-bottom:40px}
.ng-gal-tag{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:12px}
.ng-gal-tag::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.ng-gal-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,5vw,64px);letter-spacing:-1px;color:var(--paper);margin-bottom:10px;line-height:.92}
.ng-gal-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:520px}
/* MASONRY */
.ng-masonry{columns:3;column-gap:var(--gap)}
/* MASONRY CARD */
.ng-mc{break-inside:avoid;margin-bottom:var(--gap);border-radius:10px;overflow:hidden;border:1px solid var(--border);background:var(--bg2);transition:transform .3s,box-shadow .3s,border-color .25s}
.ng-mc:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,0.45);border-color:rgba(155,89,208,0.4)}
.ng-mc-media{overflow:hidden}
.ng-mc-img{width:100%;height:auto;display:block;transition:transform .45s ease}
.ng-mc:hover .ng-mc-img{transform:scale(1.025)}
.ng-mc-label{padding:11px 13px;border-top:1px solid var(--border)}
.ng-mc-name{font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:.5px;color:var(--paper);line-height:1.1}
.ng-mc-sub{font-size:8px;letter-spacing:.16em;text-transform:uppercase;color:var(--pu);margin-top:3px}
/* FINAL */
.ng-final{max-width:var(--max);margin:0 auto;padding:72px var(--pad) 80px}
.ng-final-body{font-size:13px;line-height:1.95;color:var(--muted);max-width:740px}
.ng-final-ai{font-size:12px;line-height:1.95;color:rgba(176,122,224,0.75);max-width:740px;margin-top:20px}
/* NEXT PROJECT */
.ng-next{background:var(--bg2)}
.ng-next-inner{max-width:var(--max);margin:0 auto;padding:64px var(--pad);display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:center}
.ng-next-preview{position:relative;overflow:hidden;aspect-ratio:4/3;border:1px solid var(--border);border-radius:8px}
.ng-next-preview img{width:100%;height:100%;object-fit:cover;display:block;transform:scale(1.05)}
.ng-next-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px}
.ng-next-preview-cat{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:6px}
.ng-next-preview-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(16px,2.2vw,26px);letter-spacing:-.5px;color:#fff;line-height:1}
.ng-next-tag{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.ng-next-tag::after{content:'';width:36px;height:1px;background:var(--pu)}
.ng-next-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4.5vw,56px);letter-spacing:-1px;color:var(--paper);line-height:.92;margin-bottom:14px}
.ng-next-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:380px;margin-bottom:28px}
.ng-next-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.ng-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;background:var(--pu);color:var(--bg);border:2px solid var(--pu);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.ng-btn:hover{background:var(--pu2);border-color:var(--pu2)}
.ng-ghost-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.ng-ghost-btn:hover{border-color:var(--pu);color:var(--pu)}
/* FOOTER */
.ng-foot{border-top:1px solid var(--border)}
.ng-foot-inner{max-width:var(--max);margin:0 auto;padding:44px var(--pad);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.ng-flogo{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.ng-flogo span{color:var(--pu)}
.ng-fcopy{font-size:9px;color:var(--muted)}
.ng-flinks{display:flex;gap:18px;flex-wrap:wrap;align-items:center}
.ng-flinks a{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.ng-flinks a:hover{color:var(--pu)}
.ng-fall{color:var(--pu)!important}
/* REVEAL */
.ng-rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.ng-rv.in{opacity:1;transform:translateY(0)}
/* MOBILE DRAWER */
.ng-hamburger{display:flex;flex-direction:column;gap:5px;cursor:pointer;background:transparent;border:none;padding:6px}
.ng-hamburger span{display:block;width:24px;height:2px;background:var(--paper);transition:all .3s}
.ng-drawer{position:fixed;inset:0;z-index:600;background:var(--bg);transform:translateX(100%);transition:transform .35s ease;display:flex;flex-direction:column;padding:88px 28px 40px;overflow-y:auto}
.ng-drawer.open{transform:translateX(0)}
.ng-drawer-close{position:absolute;top:22px;right:24px;background:transparent;border:none;color:var(--paper);font-size:22px;cursor:pointer;line-height:1}
.ng-drawer a{font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;padding:18px 0;border-bottom:1px solid var(--border);transition:color .2s;display:block}
.ng-drawer a:hover,.ng-drawer a:active{color:var(--pu)}
.ng-drawer-cta{background:var(--pu);color:var(--bg)!important;padding:14px 0!important;font-weight:700;border-bottom:none!important;text-align:center;margin-top:20px;display:block;font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;transition:background .2s}
.ng-drawer-cta:hover{background:var(--pu2)}
/* ── RESPONSIVE ── */
@media(max-width:1023px){
  :root{--pad:32px}
  .ng-nav-inner{padding:14px 28px}
  .ng-masonry{columns:2}
  .ng-next-inner{grid-template-columns:1fr;gap:32px}
}
@media(max-width:768px){
  :root{--pad:24px}
  .ng-hero-inner{padding:110px var(--pad) 44px}
  .ng-intro{padding:52px var(--pad)}
  .ng-gal-section{padding:52px var(--pad)}
  .ng-final{padding:0 var(--pad) 56px}
  .ng-cover{padding:36px var(--pad) 0}
  .ng-meta-row{gap:24px}
  .ng-next-inner{padding:44px var(--pad)}
  .ng-foot-inner{flex-direction:column;align-items:flex-start;gap:20px;padding:32px var(--pad)}
  .ng-flinks{flex-direction:column;gap:10px;align-items:flex-start}
  .ng-next-actions{flex-direction:column;align-items:flex-start}
  .ng-btn,.ng-ghost-btn{width:100%;text-align:center;display:block}
}
@media(max-width:480px){
  :root{--pad:16px;--gap:10px}
  .ng-abar{padding:9px 16px}
  .ng-abar span{font-size:7px}
  .ng-masonry{columns:1}
  .ng-meta-row{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
}
@media(hover:none),(pointer:coarse){
  .ng-hamburger{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center}
  .ng-nav-r{display:none}
  .ng-mc:hover{transform:none;box-shadow:none}
  .ng-btn,.ng-ghost-btn{min-height:44px;display:inline-flex;align-items:center;justify-content:center}
}
@media(min-width:1024px){
  .ng-hamburger{display:none}
  .ng-nav-r{display:flex}
}
@media(prefers-reduced-motion:reduce){
  .ng-rv{transition:none;opacity:1;transform:none}
  .ng-drawer{transition:none}
  .ng-ndot,.ng-adot{animation:none}
  .ng-mc,.ng-mc-img{transition:none}
}
`

function MC({ name, sub, img, alt }: { name: string; sub?: string; img: string; alt: string }) {
    return (
        <div className="ng-mc">
            <div className="ng-mc-media">
                <img className="ng-mc-img" src={img} alt={alt} loading="lazy" />
            </div>
            <div className="ng-mc-label">
                <div className="ng-mc-name">{name}</div>
                {sub && <div className="ng-mc-sub">{sub}</div>}
            </div>
        </div>
    )
}

export default function NourGraphicPage() {
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
        const els = Array.from(ref.current?.querySelectorAll(".ng-rv") || [])
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
        <div className="ng" ref={ref}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" />
            <style>{CSS}</style>

            {/* AVAILABLE BAR */}
            <div className={`ng-abar${navScroll ? " show" : ""}`}>
                <div className="ng-adot" />
                <span>Available for new projects</span>
            </div>

            {/* NAV */}
            <nav className="ng-nav" style={{ top: navScroll ? "38px" : "0" }}>
                <div className="ng-nav-inner">
                    <a className="ng-logo" href="/">JADEY<span>.</span></a>
                    <div className="ng-nav-r">
                        <div className="ng-ndot" />
                        <a href="/all-work">All Projects</a>
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a className="ng-nav-contact" href="/#contact">Contact Me</a>
                    </div>
                    <button ref={hamburgerRef} className="ng-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* MOBILE DRAWER */}
            <div ref={drawerRef} className={`ng-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-label="Navigation menu">
                <button className="ng-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <a href="/all-work" onClick={() => setMenuOpen(false)}>All Projects</a>
                <a href="/#about" onClick={() => setMenuOpen(false)}>About Me</a>
                <a href="/#work" onClick={() => setMenuOpen(false)}>Work Highlights</a>
                <a href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <a href="/#insights" onClick={() => setMenuOpen(false)}>Blog</a>
                <a href="/#workshops" onClick={() => setMenuOpen(false)}>Workshops</a>
                <a className="ng-drawer-cta" href="/#contact" onClick={() => setMenuOpen(false)}>Contact Me</a>
            </div>

            {/* HERO */}
            <div className="ng-hero">
                <div className="ng-hero-inner">
                    <div className="ng-hero-ghost">NOUR</div>
                    <div className="ng-cat ng-rv">Graphic Design</div>
                    <h1 className="ng-title ng-rv">Nour</h1>
                    <p className="ng-rv" style={{ fontSize: 13, lineHeight: 1.85, color: "rgba(255,255,255,0.65)", maxWidth: 520, marginBottom: 32 }}>
                        A curated graphic design showcase for Nour, featuring promotional assets across social media, posters, packaging, tarpaulin, and billboard design.
                    </p>
                    <div className="ng-meta-row ng-rv">
                        <div>
                            <div className="ng-meta-l">Client</div>
                            <div className="ng-meta-v">Nour</div>
                        </div>
                        <div>
                            <div className="ng-meta-l">Service</div>
                            <div className="ng-meta-v">Graphic Design</div>
                        </div>
                        <div>
                            <div className="ng-meta-l">Project Type</div>
                            <div className="ng-meta-v">AI-Assisted Project</div>
                        </div>
                        <div>
                            <div className="ng-meta-l">Industry</div>
                            <div className="ng-meta-v">Candle / Home Fragrance / Lifestyle Product</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* COVER */}
            <div className="ng-cover ng-rv">
                <div className="ng-cover-wrap">
                    <img src="/Nour%20Graphic%20Thumbnail.png" alt="Nour — Graphic Design Showcase" />
                </div>
            </div>

            {/* INTRO */}
            <div className="ng-intro ng-rv">
                <div className="ng-section-label">Overview</div>
                <p className="ng-intro-body">
                    Nour&apos;s graphic design work was created to extend the candle brand across multiple promotional touchpoints. This showcase features selected outputs for social media, posters, packaging, and large-format advertising, presented as separate categories for a clearer and more organized viewing experience.
                </p>
            </div>

            <hr className="ng-divider" />

            {/* ── 01 SOCIAL MEDIA ── */}
            <div className="ng-gal-section ng-rv">
                <div className="ng-gal-header">
                    <div className="ng-gal-tag">01 — Graphic Design</div>
                    <h2 className="ng-gal-title">Social Media</h2>
                    <p className="ng-gal-desc">Digital graphics designed for feed posts, stories, cover images, and paid ad creatives.</p>
                </div>
                <div className="ng-masonry">
                    <MC
                        name="Instagram Square Feed Post"
                        sub="Feed · Square"
                        img="/SM%20-%20Nour%20Instagram%20Square%20Feed%20Post.png"
                        alt="Nour — Instagram Square Feed Post"
                    />
                    <MC
                        name="Instagram Portrait Feed Post"
                        sub="Feed · Portrait"
                        img="/SM%20-%20Nour%20Instagram%20Portrait%20Feed%20Post.png"
                        alt="Nour — Instagram Portrait Feed Post"
                    />
                    <MC
                        name="Instagram Story / Facebook Story"
                        sub="Story · Vertical"
                        img="/SM%20-%20Nour%20Instagram%20Story%20%3A%20Facebook%20Story.png"
                        alt="Nour — Instagram Story / Facebook Story"
                    />
                    <MC
                        name="Facebook Cover Photo"
                        sub="Cover · Landscape"
                        img="/SM%20-%20Nour%20Facebook%20Cover%20Photo.png"
                        alt="Nour — Facebook Cover Photo"
                    />
                    <MC
                        name="Facebook Feed Post"
                        sub="Feed · Square"
                        img="/SM%20-%20Nour%20Facebook%20Feed%20Post.png"
                        alt="Nour — Facebook Feed Post"
                    />
                    <MC
                        name="Paid Ad Creative"
                        sub="Ad · Digital"
                        img="/SM%20-%20Nour%20Paid%20Ad%20Creative.png"
                        alt="Nour — Paid Ad Creative"
                    />
                </div>
            </div>

            <hr className="ng-divider" />

            {/* ── 02 POSTER ── */}
            <div className="ng-gal-section ng-rv">
                <div className="ng-gal-header">
                    <div className="ng-gal-tag">02 — Graphic Design</div>
                    <h2 className="ng-gal-title">Poster</h2>
                    <p className="ng-gal-desc">Print and digital poster designs created for product promotion, campaigns, and brand visibility.</p>
                </div>
                <div className="ng-masonry">
                    <MC
                        name="A3 Vertical Product Poster"
                        sub="Print · A3 Vertical"
                        img="/P%20-%20Nour%20A3%20Vertical%20Product%20Poster.png"
                        alt="Nour — A3 Vertical Product Poster"
                    />
                    <MC
                        name="A4 Vertical Poster"
                        sub="Print · A4 Vertical"
                        img="/P%20-%20Nour%20A4%20Vertical%20Poster.png"
                        alt="Nour — A4 Vertical Poster"
                    />
                    <MC
                        name="Square Digital Poster"
                        sub="Digital · Square"
                        img="/P%20-%20Nour%20Square%20Digital%20Poster.png"
                        alt="Nour — Square Digital Poster"
                    />
                    <MC
                        name="Portrait Digital Poster"
                        sub="Digital · Portrait"
                        img="/P%20-%20Nour%20Portrait%20Digital%20Poster.png"
                        alt="Nour — Portrait Digital Poster"
                    />
                    <MC
                        name="Wide Landscape Poster / Web Banner"
                        sub="Digital · Landscape"
                        img="/P%20-%20Nour%20Wide%20Landscape%20Poster%20%3A%20Web%20Banner.png"
                        alt="Nour — Wide Landscape Poster / Web Banner"
                    />
                </div>
            </div>

            <hr className="ng-divider" />

            {/* ── 03 TARPAULIN / BILLBOARD ── */}
            <div className="ng-gal-section ng-rv">
                <div className="ng-gal-header">
                    <div className="ng-gal-tag">03 — Graphic Design</div>
                    <h2 className="ng-gal-title">Tarpaulin / Billboard</h2>
                    <p className="ng-gal-desc">Large-format promotional graphics designed for outdoor advertising, storefront display, retail spaces, and event use.</p>
                </div>
                <div className="ng-masonry">
                    <MC
                        name="Outdoor Roadside Billboard"
                        sub="Outdoor · Billboard"
                        img="/TB%20-%20Nour%20Outdoor%20Roadside%20Billboard.png"
                        alt="Nour — Outdoor Roadside Billboard"
                    />
                    <MC
                        name="Storefront Tarpaulin"
                        sub="Outdoor · Tarpaulin"
                        img="/TB%20-%20Nour%20Storefront%20Tarpaulin.png"
                        alt="Nour — Storefront Tarpaulin"
                    />
                    <MC
                        name="Retail Window Poster"
                        sub="Retail · Window Display"
                        img="/TB%20-%20Nour%20Retail%20Window%20Poster.png"
                        alt="Nour — Retail Window Poster"
                    />
                    <MC
                        name="Vertical In-Store Poster"
                        sub="Retail · In-Store"
                        img="/TB%20-%20Nour%20Vertical%20In-Store%20Poster.png"
                        alt="Nour — Vertical In-Store Poster"
                    />
                    <MC
                        name="Mall Promotional Display"
                        sub="Retail · Mall Display"
                        img="/TB%20-%20Nour%20Mall%20Promotional%20Display.png"
                        alt="Nour — Mall Promotional Display"
                    />
                    <MC
                        name="Event Booth Banner"
                        sub="Event · Booth"
                        img="/TB%20-%20Nour%20Event%20Booth%20Banner.png"
                        alt="Nour — Event Booth Banner"
                    />
                </div>
            </div>

            <hr className="ng-divider" />

            {/* ── 04 PACKAGING ── */}
            <div className="ng-gal-section ng-rv">
                <div className="ng-gal-header">
                    <div className="ng-gal-tag">04 — Graphic Design</div>
                    <h2 className="ng-gal-title">Packaging</h2>
                    <p className="ng-gal-desc">Packaging visuals created to present Nour as a premium candle and home fragrance product.</p>
                </div>
                <div className="ng-masonry">
                    <MC
                        name="Packaging 1"
                        sub="Product · Candle"
                        img="/Nour%20Packaging%201.png"
                        alt="Nour — Packaging 1"
                    />
                    <MC
                        name="Packaging 2"
                        sub="Product · Candle"
                        img="/Nour%20Packaging%202.png"
                        alt="Nour — Packaging 2"
                    />
                    <MC
                        name="Packaging 3"
                        sub="Product · Candle"
                        img="/Nour%20Packaging%203.png"
                        alt="Nour — Packaging 3"
                    />
                    <MC
                        name="Packaging 4"
                        sub="Product · Candle"
                        img="/Nour%20Packaging%204.png"
                        alt="Nour — Packaging 4"
                    />
                </div>
            </div>

            <hr className="ng-divider" />

            {/* FINAL NOTE */}
            <div className="ng-final ng-rv">
                <div className="ng-section-label" style={{ marginBottom: 16 }}>Final Note</div>
                <p className="ng-final-body">
                    This Nour graphic design showcase presents a range of promotional assets applied across digital, print, packaging, and large-format formats. The project highlights how the visual direction can stay consistent while adapting to different graphic design needs.
                </p>
                <p className="ng-final-ai">
                    This project used AI as a support tool to speed up visual exploration and production, while the final graphic selection, layout presentation, and overall project curation were still refined by the designer.
                </p>
            </div>

            {/* RELATED PROJECT */}
            <div className="ng-next">
                <div className="ng-next-inner ng-rv">
                    <div className="ng-next-preview">
                        <img src="/Nour%20Brand%20Thumbnail.png" alt="Nour — Brand Identity" />
                        <div className="ng-next-overlay">
                            <div className="ng-next-preview-cat">Brand Identity Design</div>
                            <div className="ng-next-preview-name">Nour</div>
                        </div>
                    </div>
                    <div>
                        <div className="ng-next-tag">Related Project</div>
                        <div className="ng-next-title">Nour — Brand Identity</div>
                        <p className="ng-next-desc">The full brand identity system behind Nour — logo, color, typography, visual direction, merchandise, and product packaging built around the meaning of light.</p>
                        <div className="ng-next-actions">
                            <a className="ng-btn" href="/all-work/nour">View Brand Identity →</a>
                            <a className="ng-ghost-btn" href="/all-work">All Work</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="ng-foot">
                <div className="ng-foot-inner">
                    <a className="ng-flogo" href="/">JADEY<span>.</span></a>
                    <div className="ng-fcopy">© 2025 Jane Dhell Cagas. All rights reserved.</div>
                    <div className="ng-flinks">
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a href="/#contact">Contact</a>
                        <a className="ng-fall" href="/all-work">All Projects →</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
