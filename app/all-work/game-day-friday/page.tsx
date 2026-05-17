'use client'
import { useState, useEffect, useRef } from "react"

const CSS = `
:root{--bg:#0a0a08;--bg2:#111110;--paper:#f0ebe0;--pu:#9B59D0;--pu2:#B07AE0;--pu3:#7A3AB8;--muted:rgba(240,235,224,0.38);--border:rgba(240,235,224,0.12);--max:1440px;--pad:44px;--gap:14px}
.gdf*{box-sizing:border-box;margin:0;padding:0}
.gdf{font-family:'Space Mono',monospace;background:var(--bg);color:var(--paper);min-height:100vh;overflow-x:hidden;width:100%}
/* NAV */
.gdf-nav{position:fixed;top:0;left:0;right:0;z-index:500;background:rgba(10,10,8,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:top .3s}
.gdf-nav-inner{max-width:var(--max);margin:0 auto;padding:18px var(--pad);display:flex;align-items:center;justify-content:space-between}
.gdf-logo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.gdf-logo span{color:var(--pu)}
.gdf-nav-r{display:none;align-items:center;gap:14px}
.gdf-nav-r a{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.gdf-nav-r a:hover{color:var(--pu)}
.gdf-nav-contact{background:var(--pu)!important;color:var(--bg)!important;padding:9px 20px!important;font-weight:700!important;border:2px solid var(--pu)!important;display:inline-block!important}
.gdf-nav-contact:hover{background:var(--pu2)!important;border-color:var(--pu2)!important}
.gdf-ndot{width:7px;height:7px;background:var(--pu);border-radius:50%;animation:gdf-pulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes gdf-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.85)}}
.gdf-abar{position:fixed;top:0;left:0;right:0;z-index:499;background:var(--pu3);padding:9px var(--pad);height:38px;display:none;align-items:center;justify-content:center;gap:8px}
.gdf-abar.show{display:flex}
.gdf-abar span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:white;font-weight:700}
.gdf-adot{width:5px;height:5px;background:white;border-radius:50%;animation:gdf-pulse 2s ease-in-out infinite}
/* HERO */
.gdf-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#2E1050,#6B3FA0)}
.gdf-hero-inner{max-width:var(--max);margin:0 auto;padding:140px var(--pad) 60px;position:relative}
.gdf-hero-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(20px,6vw,100px);letter-spacing:-4px;color:rgba(240,235,224,0.03);white-space:nowrap;pointer-events:none;text-align:center;width:100%}
.gdf-cat{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,0.6);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.gdf-cat::before{content:'';width:36px;height:1px;background:rgba(255,255,255,0.4)}
.gdf-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,9vw,120px);letter-spacing:-2px;line-height:.88;color:#fff;margin-bottom:32px}
.gdf-meta-row{display:flex;gap:44px;flex-wrap:wrap;padding-top:28px;border-top:1px solid rgba(255,255,255,0.15)}
.gdf-meta-l{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:4px}
.gdf-meta-v{font-size:11px;color:#fff;font-weight:700}
/* COVER */
.gdf-cover{padding:52px var(--pad) 0}
.gdf-cover-wrap{max-width:1425px;margin:0 auto;overflow:hidden;border-radius:12px}
.gdf-cover-wrap img{width:100%;height:auto;display:block}
/* INTRO */
.gdf-intro{max-width:var(--max);margin:0 auto;padding:72px var(--pad)}
.gdf-section-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:12px;display:flex;align-items:center;gap:10px}
.gdf-section-label::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.gdf-intro-body{font-size:13px;line-height:1.95;color:var(--muted);max-width:740px}
/* DIVIDER */
.gdf-divider{border:none;border-top:1px solid var(--border);max-width:var(--max);margin:0 auto}
/* SECTION WRAPPER */
.gdf-section{max-width:var(--max);margin:0 auto;padding:80px var(--pad)}
.gdf-sec-header{margin-bottom:40px}
.gdf-sec-tag{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:12px}
.gdf-sec-tag::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.gdf-sec-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,5vw,64px);letter-spacing:-1px;color:var(--paper);margin-bottom:10px;line-height:.92}
.gdf-sec-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:560px}
/* REFRESH TABLE */
.gdf-table-wrap{overflow-x:auto;border-radius:10px;border:1px solid var(--border)}
.gdf-table{width:100%;border-collapse:collapse;font-size:11px}
.gdf-table thead tr{background:rgba(155,89,208,0.12)}
.gdf-table th{padding:14px 18px;text-align:left;font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);font-weight:700;border-bottom:1px solid var(--border);white-space:nowrap}
.gdf-table td{padding:14px 18px;border-bottom:1px solid var(--border);color:var(--muted);line-height:1.7;vertical-align:top}
.gdf-table tbody tr:last-child td{border-bottom:none}
.gdf-table tbody tr:nth-child(even){background:rgba(240,235,224,0.02)}
.gdf-table td:first-child{font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--paper);font-weight:700;white-space:nowrap;width:22%}
.gdf-table td:nth-child(2){color:rgba(240,235,224,0.32);width:39%}
.gdf-table td:nth-child(3){color:var(--paper);width:39%}
.gdf-table-summary{font-size:12px;line-height:1.9;color:var(--muted);max-width:700px;margin-top:28px}
/* COMPARISON PAIRS */
.gdf-pairs{display:flex;flex-direction:column;gap:56px}
.gdf-pair-group{}
.gdf-pair-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(18px,2.5vw,28px);letter-spacing:-.5px;color:var(--paper);margin-bottom:16px;line-height:1}
.gdf-pair{display:grid;grid-template-columns:1fr 1fr;gap:var(--gap)}
.gdf-comp-card{border-radius:10px;overflow:hidden;border:1px solid var(--border);background:var(--bg2);transition:border-color .25s}
.gdf-comp-card.is-new{border-color:rgba(155,89,208,0.3)}
.gdf-comp-card.is-new:hover{border-color:rgba(155,89,208,0.55)}
.gdf-comp-card.is-old:hover{border-color:rgba(240,235,224,0.22)}
.gdf-comp-media{position:relative;overflow:hidden}
.gdf-comp-media img{width:100%;height:auto;display:block}
.gdf-comp-badge{position:absolute;top:10px;left:10px;font-size:8px;letter-spacing:.18em;text-transform:uppercase;font-weight:700;padding:4px 10px;border-radius:4px}
.gdf-comp-badge.before{background:rgba(10,10,8,0.72);color:rgba(240,235,224,0.55);border:1px solid rgba(240,235,224,0.15)}
.gdf-comp-badge.after{background:rgba(155,89,208,0.85);color:#fff;border:1px solid rgba(155,89,208,0.6)}
.gdf-comp-label{padding:10px 13px;border-top:1px solid var(--border)}
.gdf-comp-label-ver{font-size:8px;letter-spacing:.16em;text-transform:uppercase;color:var(--pu);margin-bottom:2px}
.gdf-comp-label-ver.old-ver{color:rgba(240,235,224,0.3)}
.gdf-comp-label-theme{font-size:9px;color:var(--muted);line-height:1.5}
/* MERCH GRID */
.gdf-merch-row4{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--gap);margin-bottom:var(--gap)}
.gdf-merch-row3{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap)}
.gdf-mc{border-radius:10px;overflow:hidden;border:1px solid var(--border);background:var(--bg2);transition:transform .3s,box-shadow .3s,border-color .25s}
.gdf-mc:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,0.45);border-color:rgba(155,89,208,0.4)}
.gdf-mc-media{overflow:hidden}
.gdf-mc-img{width:100%;height:auto;display:block;transition:transform .45s ease}
.gdf-mc:hover .gdf-mc-img{transform:scale(1.025)}
.gdf-mc-label{padding:11px 13px;border-top:1px solid var(--border)}
.gdf-mc-name{font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:.5px;color:var(--paper);line-height:1.1}
.gdf-mc-sub{font-size:8px;letter-spacing:.16em;text-transform:uppercase;color:var(--pu);margin-top:3px}
/* FINAL */
.gdf-final{max-width:var(--max);margin:0 auto;padding:72px var(--pad) 80px}
.gdf-final-body{font-size:13px;line-height:1.95;color:var(--muted);max-width:740px}
.gdf-final-feedback{font-size:12px;line-height:1.95;color:rgba(176,122,224,0.75);max-width:740px;margin-top:20px}
/* NEXT */
.gdf-next{background:var(--bg2)}
.gdf-next-inner{max-width:var(--max);margin:0 auto;padding:64px var(--pad);display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:center}
.gdf-next-preview{position:relative;overflow:hidden;aspect-ratio:4/3;border:1px solid var(--border);border-radius:8px}
.gdf-next-preview img{width:100%;height:100%;object-fit:cover;display:block;transform:scale(1.05)}
.gdf-next-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px}
.gdf-next-preview-cat{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:6px}
.gdf-next-preview-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(16px,2.2vw,26px);letter-spacing:-.5px;color:#fff;line-height:1}
.gdf-next-tag{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.gdf-next-tag::after{content:'';width:36px;height:1px;background:var(--pu)}
.gdf-next-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4.5vw,56px);letter-spacing:-1px;color:var(--paper);line-height:.92;margin-bottom:14px}
.gdf-next-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:380px;margin-bottom:28px}
.gdf-next-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.gdf-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;background:var(--pu);color:var(--bg);border:2px solid var(--pu);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.gdf-btn:hover{background:var(--pu2);border-color:var(--pu2)}
.gdf-ghost-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.gdf-ghost-btn:hover{border-color:var(--pu);color:var(--pu)}
/* FOOTER */
.gdf-foot{border-top:1px solid var(--border)}
.gdf-foot-inner{max-width:var(--max);margin:0 auto;padding:44px var(--pad);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.gdf-flogo{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.gdf-flogo span{color:var(--pu)}
.gdf-fcopy{font-size:9px;color:var(--muted)}
.gdf-flinks{display:flex;gap:18px;flex-wrap:wrap;align-items:center}
.gdf-flinks a{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.gdf-flinks a:hover{color:var(--pu)}
.gdf-fall{color:var(--pu)!important}
/* REVEAL */
.gdf-rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.gdf-rv.in{opacity:1;transform:translateY(0)}
/* MOBILE DRAWER */
.gdf-hamburger{display:flex;flex-direction:column;gap:5px;cursor:pointer;background:transparent;border:none;padding:6px}
.gdf-hamburger span{display:block;width:24px;height:2px;background:var(--paper);transition:all .3s}
.gdf-drawer{position:fixed;inset:0;z-index:600;background:var(--bg);transform:translateX(100%);transition:transform .35s ease;display:flex;flex-direction:column;padding:88px 28px 40px;overflow-y:auto}
.gdf-drawer.open{transform:translateX(0)}
.gdf-drawer-close{position:absolute;top:22px;right:24px;background:transparent;border:none;color:var(--paper);font-size:22px;cursor:pointer;line-height:1}
.gdf-drawer a{font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;padding:18px 0;border-bottom:1px solid var(--border);transition:color .2s;display:block}
.gdf-drawer a:hover,.gdf-drawer a:active{color:var(--pu)}
.gdf-drawer-cta{background:var(--pu);color:var(--bg)!important;padding:14px 0!important;font-weight:700;border-bottom:none!important;text-align:center;margin-top:20px;display:block;font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;transition:background .2s}
.gdf-drawer-cta:hover{background:var(--pu2)}
/* ── RESPONSIVE ── */
@media(max-width:1023px){
  :root{--pad:32px}
  .gdf-nav-inner{padding:14px 28px}
  .gdf-merch-row4{grid-template-columns:repeat(2,1fr)}
  .gdf-merch-row3{grid-template-columns:repeat(2,1fr)}
  .gdf-next-inner{grid-template-columns:1fr;gap:32px}
}
@media(max-width:768px){
  :root{--pad:24px}
  .gdf-hero-inner{padding:110px var(--pad) 44px}
  .gdf-intro{padding:52px var(--pad)}
  .gdf-section{padding:52px var(--pad)}
  .gdf-final{padding:0 var(--pad) 56px}
  .gdf-cover{padding:36px var(--pad) 0}
  .gdf-meta-row{gap:24px}
  .gdf-next-inner{padding:44px var(--pad)}
  .gdf-foot-inner{flex-direction:column;align-items:flex-start;gap:20px;padding:32px var(--pad)}
  .gdf-flinks{flex-direction:column;gap:10px;align-items:flex-start}
  .gdf-next-actions{flex-direction:column;align-items:flex-start}
  .gdf-btn,.gdf-ghost-btn{width:100%;text-align:center;display:block}
}
@media(max-width:640px){
  .gdf-pair{grid-template-columns:1fr}
}
@media(max-width:480px){
  :root{--pad:16px;--gap:10px}
  .gdf-abar{padding:9px 16px}
  .gdf-abar span{font-size:7px}
  .gdf-merch-row4{grid-template-columns:1fr}
  .gdf-merch-row3{grid-template-columns:1fr}
  .gdf-meta-row{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
  .gdf-table th,.gdf-table td{padding:10px 12px}
}
@media(hover:none),(pointer:coarse){
  .gdf-hamburger{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center}
  .gdf-nav-r{display:none}
  .gdf-mc:hover{transform:none;box-shadow:none}
  .gdf-btn,.gdf-ghost-btn{min-height:44px;display:inline-flex;align-items:center;justify-content:center}
}
@media(min-width:1024px){
  .gdf-hamburger{display:none}
  .gdf-nav-r{display:flex}
}
@media(prefers-reduced-motion:reduce){
  .gdf-rv{transition:none;opacity:1;transform:none}
  .gdf-drawer{transition:none}
  .gdf-ndot,.gdf-adot{animation:none}
  .gdf-mc,.gdf-mc-img{transition:none}
}
`

const PAIRS = [
    {
        name: "Announcement Banner",
        old: "/GameDay%20OLD%20Announcement%20Banner.png",
        nw:  "/GameDay%20NEW%20Announcement%20Banner.png",
    },
    {
        name: "Game Title Display Banner",
        old: "/GameDay%20OLD%20Game%20Title%20Display%20Banner.png",
        nw:  "/GameDay%20NEW%20Game%20Title%20Display%20Banner.png",
    },
    {
        name: "Game Title Slack Announcement Banner",
        old: "/GameDay%20OLD%20Game%20Title%20Slack%20Announcement%20Banner.png",
        nw:  "/GameDay%20NEW%20Game%20Title%20Slack%20Announcement%20Banner.png",
    },
    {
        name: "Host's On-Camera Background",
        old: "/GameDay%20OLD%20Host%E2%80%99s%20On-Camera%20Background.png",
        nw:  "/GameDay%20NEW%20Host%E2%80%99s%20On-Camera%20Background.png",
    },
    {
        name: "Intro Banner",
        old: "/GameDay%20OLD%20Intro%20Banner.png",
        nw:  "/GameDay%20NEW%20Intro%20Banner.png",
    },
]

const MERCH = [1, 2, 3, 4, 5, 6, 7]

export default function GameDayFridayPage() {
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
        const els = Array.from(ref.current?.querySelectorAll(".gdf-rv") || [])
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
        <div className="gdf" ref={ref}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" />
            <style>{CSS}</style>

            {/* AVAILABLE BAR */}
            <div className={`gdf-abar${navScroll ? " show" : ""}`}>
                <div className="gdf-adot" />
                <span>Available for new projects</span>
            </div>

            {/* NAV */}
            <nav className="gdf-nav" style={{ top: navScroll ? "38px" : "0" }}>
                <div className="gdf-nav-inner">
                    <a className="gdf-logo" href="/"><img src="/Jadey%20Site%20Logo.png" alt="Jadey Design" style={{height:"28px",width:"auto",display:"block"}} /></a>
                    <div className="gdf-nav-r">
                        <div className="gdf-ndot" />
                        <a href="/all-work">All Projects</a>
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a className="gdf-nav-contact" href="/#contact">Contact Me</a>
                    </div>
                    <button ref={hamburgerRef} className="gdf-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* MOBILE DRAWER */}
            <div ref={drawerRef} className={`gdf-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-label="Navigation menu">
                <button className="gdf-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <a href="/all-work" onClick={() => setMenuOpen(false)}>All Projects</a>
                <a href="/#about" onClick={() => setMenuOpen(false)}>About Me</a>
                <a href="/#work" onClick={() => setMenuOpen(false)}>Work Highlights</a>
                <a href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <a href="/#insights" onClick={() => setMenuOpen(false)}>Blog</a>
                <a href="/#workshops" onClick={() => setMenuOpen(false)}>Workshops</a>
                <a className="gdf-drawer-cta" href="/#contact" onClick={() => setMenuOpen(false)}>Contact Me</a>
            </div>

            {/* HERO */}
            <div className="gdf-hero">
                <div className="gdf-hero-inner">
                    <div className="gdf-hero-ghost">GAME DAY FRIDAY</div>
                    <div className="gdf-cat gdf-rv">Graphic Design</div>
                    <h1 className="gdf-title gdf-rv">Game Day Friday</h1>
                    <p className="gdf-rv" style={{ fontSize: 13, lineHeight: 1.85, color: "rgba(255,255,255,0.65)", maxWidth: 520, marginBottom: 32 }}>
                        A graphic design refresh for Game Day Friday, focused on improving the visual assets, making the materials more playful and engaging, and creating a clearer event presentation together with participant giveaway merch.
                    </p>
                    <div className="gdf-meta-row gdf-rv">
                        <div>
                            <div className="gdf-meta-l">Client</div>
                            <div className="gdf-meta-v">SHEC</div>
                        </div>
                        <div>
                            <div className="gdf-meta-l">Service</div>
                            <div className="gdf-meta-v">Graphic Design</div>
                        </div>
                        <div>
                            <div className="gdf-meta-l">Project Type</div>
                            <div className="gdf-meta-v">Graphic Design Project</div>
                        </div>
                        <div>
                            <div className="gdf-meta-l">Industry</div>
                            <div className="gdf-meta-v">Event / Internal Engagement / Promotional Design</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* COVER */}
            <div className="gdf-cover gdf-rv">
                <div className="gdf-cover-wrap">
                    <img src="/GameDay%20Friday%20Thumbnail.png" alt="Game Day Friday — Graphic Design Showcase" />
                </div>
            </div>

            {/* INTRO */}
            <div className="gdf-intro gdf-rv">
                <div className="gdf-section-label">Overview</div>
                <p className="gdf-intro-body">
                    Game Day Friday needed a refreshed set of visual assets that felt more playful, friendly, and easier to use during the event. This project focuses on improving the existing graphics, comparing the old and new versions, and showcasing the merch designs prepared as giveaway prizes for participants.
                </p>
            </div>

            <hr className="gdf-divider" />

            {/* ── 01 DESIGN REFRESH SUMMARY ── */}
            <div className="gdf-section gdf-rv">
                <div className="gdf-sec-header">
                    <div className="gdf-sec-tag">01 — Design Refresh</div>
                    <h2 className="gdf-sec-title">Design Refresh Summary</h2>
                    <p className="gdf-sec-desc">A quick comparison of how the Game Day Friday assets improved from the original dark theme to the new lively theme.</p>
                </div>
                <div className="gdf-table-wrap">
                    <table className="gdf-table">
                        <thead>
                            <tr>
                                <th>Element</th>
                                <th>Before — Original Theme</th>
                                <th>After — Lively Theme</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Visual Tone</td>
                                <td>Bold, dark, techy; strong gamer vibe</td>
                                <td>Bright, playful, friendly; casual and inviting</td>
                            </tr>
                            <tr>
                                <td>Color Scheme</td>
                                <td>Black background with neon gradient text; high contrast but heavy</td>
                                <td>Blue background with colorful accents; vibrant and cheerful</td>
                            </tr>
                            <tr>
                                <td>Theme</td>
                                <td>Minimal decoration with subtle controller outlines</td>
                                <td>Fun, nostalgic gaming theme with Pac-Man, ghosts, coins, and trophy</td>
                            </tr>
                            <tr>
                                <td>Icons &amp; Graphics</td>
                                <td>Simple date, time, and location icons with gradient effect; hard to notice</td>
                                <td>Bright icons with clear details; more readable and aligned with the playful theme</td>
                            </tr>
                            <tr>
                                <td>Banner Copy</td>
                                <td>Short, direct, and bold but feels formal</td>
                                <td>Conversational, energetic, and fun; adds excitement and good vibes</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="gdf-table-summary">
                    The redesign moved Game Day Friday from a darker and more tech-heavy gamer style into a brighter, more playful, and more inviting visual direction. The new assets use a blue background, colorful accents, nostalgic gaming elements, clearer icons, and more energetic copywriting to make the event materials feel more fun, readable, and engaging.
                </p>
            </div>

            <hr className="gdf-divider" />

            {/* ── 02 OLD VS NEW COMPARISON ── */}
            <div className="gdf-section gdf-rv">
                <div className="gdf-sec-header">
                    <div className="gdf-sec-tag">02 — Asset Comparison</div>
                    <h2 className="gdf-sec-title">Old vs New Asset Comparison</h2>
                    <p className="gdf-sec-desc">A side-by-side comparison of the previous and updated Game Day Friday assets, showing how the design became brighter, clearer, more playful, and more engaging.</p>
                </div>
                <div className="gdf-pairs">
                    {PAIRS.map((pair) => (
                        <div key={pair.name} className="gdf-pair-group gdf-rv">
                            <div className="gdf-pair-name">{pair.name}</div>
                            <div className="gdf-pair">
                                <div className="gdf-comp-card is-old">
                                    <div className="gdf-comp-media">
                                        <img src={pair.old} alt={`${pair.name} — Before`} loading="lazy" />
                                        <span className="gdf-comp-badge before">Before</span>
                                    </div>
                                    <div className="gdf-comp-label">
                                        <div className="gdf-comp-label-ver old-ver">Old</div>
                                        <div className="gdf-comp-label-theme">Original Theme</div>
                                    </div>
                                </div>
                                <div className="gdf-comp-card is-new">
                                    <div className="gdf-comp-media">
                                        <img src={pair.nw} alt={`${pair.name} — After`} loading="lazy" />
                                        <span className="gdf-comp-badge after">After</span>
                                    </div>
                                    <div className="gdf-comp-label">
                                        <div className="gdf-comp-label-ver">New</div>
                                        <div className="gdf-comp-label-theme">Lively Theme</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="gdf-divider" />

            {/* ── 03 MERCH PRIZE SHOWCASE ── */}
            <div className="gdf-section gdf-rv">
                <div className="gdf-sec-header">
                    <div className="gdf-sec-tag">03 — Merch Design</div>
                    <h2 className="gdf-sec-title">Merch Design</h2>
                    <p className="gdf-sec-desc">A collection of merch items designed as giveaway prizes for participants of Game Day Friday.</p>
                </div>
                <div className="gdf-merch-row3">
                    {[1, 2, 3].map((n) => (
                        <div key={n} className="gdf-mc">
                            <div className="gdf-mc-media">
                                <img className="gdf-mc-img" src={`/Merch%20${n}.png`} alt={`Game Day Friday — Merch ${n}`} loading="lazy" />
                            </div>
                            <div className="gdf-mc-label">
                                <div className="gdf-mc-name">Merch {n}</div>
                                <div className="gdf-mc-sub">Giveaway Prize</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="gdf-merch-row4">
                    {[4, 5, 6, 7].map((n) => (
                        <div key={n} className="gdf-mc">
                            <div className="gdf-mc-media">
                                <img className="gdf-mc-img" src={`/Merch%20${n}.png`} alt={`Game Day Friday — Merch ${n}`} loading="lazy" />
                            </div>
                            <div className="gdf-mc-label">
                                <div className="gdf-mc-name">Merch {n}</div>
                                <div className="gdf-mc-sub">Giveaway Prize</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="gdf-divider" />

            {/* FINAL NOTE */}
            <div className="gdf-final gdf-rv">
                <div className="gdf-section-label" style={{ marginBottom: 16 }}>Final Note</div>
                <p className="gdf-final-body">
                    This Game Day Friday graphic design showcase presents the redesign of key event assets together with merch items prepared for participants. The updated visuals improved the overall tone, made the materials clearer and more playful, and helped create a brighter and more engaging event experience.
                </p>
                <p className="gdf-final-feedback">
                    The client was very happy with the updated design direction, and the committee team hosting Game Day Friday was also happy with the new visuals and how they elevated the overall presentation of the event materials.
                </p>
            </div>

            {/* NEXT PROJECT */}
            <div className="gdf-next">
                <div className="gdf-next-inner gdf-rv">
                    <div className="gdf-next-preview">
                        <img src="/Kapehan%20Session%20Thumbnail.png" alt="Kapehan Session" />
                        <div className="gdf-next-overlay">
                            <div className="gdf-next-preview-cat">Graphic Design</div>
                            <div className="gdf-next-preview-name">Kapehan Session</div>
                        </div>
                    </div>
                    <div>
                        <div className="gdf-next-tag">Next Project</div>
                        <div className="gdf-next-title">Kapehan Session</div>
                        <p className="gdf-next-desc">Graphic design refresh for a community coffee session — before-and-after asset comparison, coffee-themed visual upgrade, and merch prize designs for participants.</p>
                        <div className="gdf-next-actions">
                            <a className="gdf-btn" href="/all-work/kapehan-session">View Project →</a>
                            <a className="gdf-ghost-btn" href="/all-work">All Work</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="gdf-foot">
                <div className="gdf-foot-inner">
                    <a className="gdf-flogo" href="/"><img src="/Jadey%20Site%20Logo.png" alt="Jadey Design" style={{height:"28px",width:"auto",display:"block"}} /></a>
                    <div className="gdf-fcopy">© 2025 Jane Dhell Cagas. All rights reserved.</div>
                    <div className="gdf-flinks">
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a href="/#contact">Contact</a>
                        <a className="gdf-fall" href="/all-work">All Projects →</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
