'use client'
import { useState, useEffect, useRef } from "react"

const CSS = `
:root{--bg:#0a0a08;--bg2:#111110;--paper:#f0ebe0;--pu:#9B59D0;--pu2:#B07AE0;--pu3:#7A3AB8;--muted:rgba(240,235,224,0.38);--border:rgba(240,235,224,0.12);--max:1440px;--pad:44px;--gap:14px}
.ks*{box-sizing:border-box;margin:0;padding:0}
.ks{font-family:'Space Mono',monospace;background:var(--bg);color:var(--paper);min-height:100vh;overflow-x:hidden;width:100%}
/* NAV */
.ks-nav{position:fixed;top:0;left:0;right:0;z-index:500;background:rgba(10,10,8,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:top .3s}
.ks-nav-inner{max-width:var(--max);margin:0 auto;padding:18px var(--pad);display:flex;align-items:center;justify-content:space-between}
.ks-logo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.ks-logo span{color:var(--pu)}
.ks-nav-r{display:none;align-items:center;gap:14px}
.ks-nav-r a{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.ks-nav-r a:hover{color:var(--pu)}
.ks-nav-contact{background:var(--pu)!important;color:var(--bg)!important;padding:9px 20px!important;font-weight:700!important;border:2px solid var(--pu)!important;display:inline-block!important}
.ks-nav-contact:hover{background:var(--pu2)!important;border-color:var(--pu2)!important}
.ks-ndot{width:7px;height:7px;background:var(--pu);border-radius:50%;animation:ks-pulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes ks-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.85)}}
.ks-abar{position:fixed;top:0;left:0;right:0;z-index:499;background:var(--pu3);padding:9px var(--pad);height:38px;display:none;align-items:center;justify-content:center;gap:8px}
.ks-abar.show{display:flex}
.ks-abar span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:white;font-weight:700}
.ks-adot{width:5px;height:5px;background:white;border-radius:50%;animation:ks-pulse 2s ease-in-out infinite}
/* HERO */
.ks-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#2E1050,#6B3FA0)}
.ks-hero-inner{max-width:var(--max);margin:0 auto;padding:140px var(--pad) 60px;position:relative}
.ks-hero-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(20px,6vw,100px);letter-spacing:-4px;color:rgba(240,235,224,0.03);white-space:nowrap;pointer-events:none;text-align:center;width:100%}
.ks-cat{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,0.6);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.ks-cat::before{content:'';width:36px;height:1px;background:rgba(255,255,255,0.4)}
.ks-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,9vw,120px);letter-spacing:-2px;line-height:.88;color:#fff;margin-bottom:32px}
.ks-meta-row{display:flex;gap:44px;flex-wrap:wrap;padding-top:28px;border-top:1px solid rgba(255,255,255,0.15)}
.ks-meta-l{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:4px}
.ks-meta-v{font-size:11px;color:#fff;font-weight:700}
/* COVER */
.ks-cover{padding:52px var(--pad) 0}
.ks-cover-wrap{max-width:1425px;margin:0 auto;overflow:hidden;border-radius:12px}
.ks-cover-wrap img{width:100%;height:auto;display:block}
/* INTRO */
.ks-intro{max-width:var(--max);margin:0 auto;padding:72px var(--pad)}
.ks-section-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:12px;display:flex;align-items:center;gap:10px}
.ks-section-label::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.ks-intro-body{font-size:13px;line-height:1.95;color:var(--muted);max-width:740px}
/* DIVIDER */
.ks-divider{border:none;border-top:1px solid var(--border);max-width:var(--max);margin:0 auto}
/* SECTION WRAPPER */
.ks-section{max-width:var(--max);margin:0 auto;padding:80px var(--pad)}
.ks-sec-header{margin-bottom:40px}
.ks-sec-tag{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:12px}
.ks-sec-tag::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.ks-sec-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,5vw,64px);letter-spacing:-1px;color:var(--paper);margin-bottom:10px;line-height:.92}
.ks-sec-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:560px}
/* REFRESH TABLE */
.ks-table-wrap{overflow-x:auto;border-radius:10px;border:1px solid var(--border)}
.ks-table{width:100%;border-collapse:collapse;font-size:11px}
.ks-table thead tr{background:rgba(155,89,208,0.12)}
.ks-table th{padding:14px 18px;text-align:left;font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);font-weight:700;border-bottom:1px solid var(--border);white-space:nowrap}
.ks-table td{padding:14px 18px;border-bottom:1px solid var(--border);color:var(--muted);line-height:1.7;vertical-align:top}
.ks-table tbody tr:last-child td{border-bottom:none}
.ks-table tbody tr:nth-child(even){background:rgba(240,235,224,0.02)}
.ks-table td:first-child{font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--paper);font-weight:700;white-space:nowrap;width:22%}
.ks-table td:nth-child(2){color:rgba(240,235,224,0.32);width:39%}
.ks-table td:nth-child(3){color:var(--paper);width:39%}
.ks-table-summary{font-size:12px;line-height:1.9;color:var(--muted);max-width:700px;margin-top:28px}
/* COMPARISON PAIRS */
.ks-pairs{display:flex;flex-direction:column;gap:56px}
.ks-pair-group{}
.ks-pair-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(18px,2.5vw,28px);letter-spacing:-.5px;color:var(--paper);margin-bottom:16px;line-height:1}
.ks-pair{display:grid;grid-template-columns:1fr 1fr;gap:var(--gap)}
.ks-comp-card{border-radius:10px;overflow:hidden;border:1px solid var(--border);background:var(--bg2);transition:border-color .25s}
.ks-comp-card.is-new{border-color:rgba(155,89,208,0.3)}
.ks-comp-card.is-new:hover{border-color:rgba(155,89,208,0.55)}
.ks-comp-card.is-old:hover{border-color:rgba(240,235,224,0.22)}
.ks-comp-media{position:relative;overflow:hidden}
.ks-comp-media img{width:100%;height:auto;display:block}
.ks-comp-badge{position:absolute;top:10px;left:10px;font-size:8px;letter-spacing:.18em;text-transform:uppercase;font-weight:700;padding:4px 10px;border-radius:4px}
.ks-comp-badge.before{background:rgba(10,10,8,0.72);color:rgba(240,235,224,0.55);border:1px solid rgba(240,235,224,0.15)}
.ks-comp-badge.after{background:rgba(155,89,208,0.85);color:#fff;border:1px solid rgba(155,89,208,0.6)}
.ks-comp-label{padding:10px 13px;border-top:1px solid var(--border)}
.ks-comp-label-ver{font-size:8px;letter-spacing:.16em;text-transform:uppercase;color:var(--pu);margin-bottom:2px}
.ks-comp-label-ver.old-ver{color:rgba(240,235,224,0.3)}
.ks-comp-label-theme{font-size:9px;color:var(--muted);line-height:1.5}
/* MASONRY — for merch */
.ks-masonry{columns:3;column-gap:var(--gap)}
.ks-mc{break-inside:avoid;margin-bottom:var(--gap);border-radius:10px;overflow:hidden;border:1px solid var(--border);background:var(--bg2);transition:transform .3s,box-shadow .3s,border-color .25s}
.ks-mc:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,0.45);border-color:rgba(155,89,208,0.4)}
.ks-mc-media{overflow:hidden}
.ks-mc-img{width:100%;height:auto;display:block;transition:transform .45s ease}
.ks-mc:hover .ks-mc-img{transform:scale(1.025)}
.ks-mc-label{padding:11px 13px;border-top:1px solid var(--border)}
.ks-mc-name{font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:.5px;color:var(--paper);line-height:1.1}
.ks-mc-sub{font-size:8px;letter-spacing:.16em;text-transform:uppercase;color:var(--pu);margin-top:3px}
/* FINAL */
.ks-final{max-width:var(--max);margin:0 auto;padding:72px var(--pad) 80px}
.ks-final-body{font-size:13px;line-height:1.95;color:var(--muted);max-width:740px}
.ks-final-feedback{font-size:12px;line-height:1.95;color:rgba(176,122,224,0.75);max-width:740px;margin-top:20px}
/* NEXT */
.ks-next{background:var(--bg2)}
.ks-next-inner{max-width:var(--max);margin:0 auto;padding:64px var(--pad);display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:center}
.ks-next-preview{position:relative;overflow:hidden;aspect-ratio:4/3;border:1px solid var(--border);border-radius:8px}
.ks-next-preview img{width:100%;height:100%;object-fit:cover;display:block;transform:scale(1.05)}
.ks-next-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px}
.ks-next-preview-cat{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:6px}
.ks-next-preview-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(16px,2.2vw,26px);letter-spacing:-.5px;color:#fff;line-height:1}
.ks-next-tag{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.ks-next-tag::after{content:'';width:36px;height:1px;background:var(--pu)}
.ks-next-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4.5vw,56px);letter-spacing:-1px;color:var(--paper);line-height:.92;margin-bottom:14px}
.ks-next-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:380px;margin-bottom:28px}
.ks-next-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.ks-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;background:var(--pu);color:var(--bg);border:2px solid var(--pu);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.ks-btn:hover{background:var(--pu2);border-color:var(--pu2)}
.ks-ghost-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.ks-ghost-btn:hover{border-color:var(--pu);color:var(--pu)}
/* FOOTER */
.ks-foot{border-top:1px solid var(--border)}
.ks-foot-inner{max-width:var(--max);margin:0 auto;padding:44px var(--pad);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.ks-flogo{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.ks-flogo span{color:var(--pu)}
.ks-fcopy{font-size:9px;color:var(--muted)}
.ks-flinks{display:flex;gap:18px;flex-wrap:wrap;align-items:center}
.ks-flinks a{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.ks-flinks a:hover{color:var(--pu)}
.ks-fall{color:var(--pu)!important}
/* REVEAL */
.ks-rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.ks-rv.in{opacity:1;transform:translateY(0)}
/* MOBILE DRAWER */
.ks-hamburger{display:flex;flex-direction:column;gap:5px;cursor:pointer;background:transparent;border:none;padding:6px}
.ks-hamburger span{display:block;width:24px;height:2px;background:var(--paper);transition:all .3s}
.ks-drawer{position:fixed;inset:0;z-index:600;background:var(--bg);transform:translateX(100%);transition:transform .35s ease;display:flex;flex-direction:column;padding:88px 28px 40px;overflow-y:auto}
.ks-drawer.open{transform:translateX(0)}
.ks-drawer-close{position:absolute;top:22px;right:24px;background:transparent;border:none;color:var(--paper);font-size:22px;cursor:pointer;line-height:1}
.ks-drawer a{font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;padding:18px 0;border-bottom:1px solid var(--border);transition:color .2s;display:block}
.ks-drawer a:hover,.ks-drawer a:active{color:var(--pu)}
.ks-drawer-cta{background:var(--pu);color:var(--bg)!important;padding:14px 0!important;font-weight:700;border-bottom:none!important;text-align:center;margin-top:20px;display:block;font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;transition:background .2s}
.ks-drawer-cta:hover{background:var(--pu2)}
/* ── RESPONSIVE ── */
@media(max-width:1023px){
  :root{--pad:32px}
  .ks-nav-inner{padding:14px 28px}
  .ks-masonry{columns:2}
  .ks-next-inner{grid-template-columns:1fr;gap:32px}
}
@media(max-width:768px){
  :root{--pad:24px}
  .ks-hero-inner{padding:110px var(--pad) 44px}
  .ks-intro{padding:52px var(--pad)}
  .ks-section{padding:52px var(--pad)}
  .ks-final{padding:0 var(--pad) 56px}
  .ks-cover{padding:36px var(--pad) 0}
  .ks-meta-row{gap:24px}
  .ks-next-inner{padding:44px var(--pad)}
  .ks-foot-inner{flex-direction:column;align-items:flex-start;gap:20px;padding:32px var(--pad)}
  .ks-flinks{flex-direction:column;gap:10px;align-items:flex-start}
  .ks-next-actions{flex-direction:column;align-items:flex-start}
  .ks-btn,.ks-ghost-btn{width:100%;text-align:center;display:block}
}
@media(max-width:640px){
  .ks-pair{grid-template-columns:1fr}
}
@media(max-width:480px){
  :root{--pad:16px;--gap:10px}
  .ks-abar{padding:9px 16px}
  .ks-abar span{font-size:7px}
  .ks-masonry{columns:1}
  .ks-meta-row{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
  .ks-table th,.ks-table td{padding:10px 12px}
}
@media(hover:none),(pointer:coarse){
  .ks-hamburger{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center}
  .ks-nav-r{display:none}
  .ks-mc:hover{transform:none;box-shadow:none}
  .ks-btn,.ks-ghost-btn{min-height:44px;display:inline-flex;align-items:center;justify-content:center}
}
@media(min-width:1024px){
  .ks-hamburger{display:none}
  .ks-nav-r{display:flex}
}
@media(prefers-reduced-motion:reduce){
  .ks-rv{transition:none;opacity:1;transform:none}
  .ks-drawer{transition:none}
  .ks-ndot,.ks-adot{animation:none}
  .ks-mc,.ks-mc-img{transition:none}
}
`

const PAIRS = [
    {
        name: "Announcement Banner",
        old: "/Kapehan%20OLD%20Announcement%20Banner.png",
        nw:  "/Kapehan%20NEW%20Announcement%20Banner.png",
    },
    {
        name: "Host's On-Camera Background",
        old: "/Kapehan%20OLD%20Host%E2%80%99s%20On-Camera%20Background.png",
        nw:  "/Kapehan%20NEW%20Host%E2%80%99s%20On-Camera%20Background.png",
    },
    {
        name: "Question Display Banner",
        old: "/Kapehan%20OLD%20Question%20Display%20Banner.png",
        nw:  "/Kapehan%20NEW%20Question%20Display%20Banner.png",
    },
    {
        name: "Guest's Quote of the Day",
        old: "/Kapehan%20OLD%20Session%20Guest%27s%20Quote%20of%20the%20Day.png",
        nw:  "/Kapehan%20NEW%20Session%20Guest%27s%20Quote%20of%20the%20Day.png",
    },
    {
        name: "Session Intro Banner",
        old: "/Kapehan%20OLD%20Session%20Intro%20Banner.png",
        nw:  "/Kapehan%20NEW%20Session%20Intro%20Banner.png",
    },
    {
        name: "Session Topic Banner",
        old: "/Kapehan%20OLD%20Session%20Topic%20Banner.png",
        nw:  "/Kapehan%20NEW%20Session%20Topic%20Banner.png",
    },
]

const MERCH = [
    { n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }, { n: 5 }, { n: 6 }, { n: 7 },
]

export default function KapehanSessionPage() {
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
        const els = Array.from(ref.current?.querySelectorAll(".ks-rv") || [])
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
        <div className="ks" ref={ref}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" />
            <style>{CSS}</style>

            {/* AVAILABLE BAR */}
            <div className={`ks-abar${navScroll ? " show" : ""}`}>
                <div className="ks-adot" />
                <span>Available for new projects</span>
            </div>

            {/* NAV */}
            <nav className="ks-nav" style={{ top: navScroll ? "38px" : "0" }}>
                <div className="ks-nav-inner">
                    <a className="ks-logo" href="/"><img src="/Jadey%20Site%20Logo.png" alt="Jadey Design" style={{height:"28px",width:"auto",display:"block"}} /></a>
                    <div className="ks-nav-r">
                        <div className="ks-ndot" />
                        <a href="/all-work">All Projects</a>
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a className="ks-nav-contact" href="/#contact">Contact Me</a>
                    </div>
                    <button ref={hamburgerRef} className="ks-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* MOBILE DRAWER */}
            <div ref={drawerRef} className={`ks-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-label="Navigation menu">
                <button className="ks-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <a href="/all-work" onClick={() => setMenuOpen(false)}>All Projects</a>
                <a href="/#about" onClick={() => setMenuOpen(false)}>About Me</a>
                <a href="/#work" onClick={() => setMenuOpen(false)}>Work Highlights</a>
                <a href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <a href="/#insights" onClick={() => setMenuOpen(false)}>Blog</a>
                <a href="/#workshops" onClick={() => setMenuOpen(false)}>Workshops</a>
                <a className="ks-drawer-cta" href="/#contact" onClick={() => setMenuOpen(false)}>Contact Me</a>
            </div>

            {/* HERO */}
            <div className="ks-hero">
                <div className="ks-hero-inner">
                    <div className="ks-hero-ghost">KAPEHAN SESSION</div>
                    <div className="ks-cat ks-rv">Graphic Design</div>
                    <h1 className="ks-title ks-rv">Kapehan Session</h1>
                    <p className="ks-rv" style={{ fontSize: 13, lineHeight: 1.85, color: "rgba(255,255,255,0.65)", maxWidth: 520, marginBottom: 32 }}>
                        A graphic design refresh for Kapehan Session, focused on improving the visual assets, strengthening the coffee-themed direction, and creating more engaging materials for session use and participant giveaways.
                    </p>
                    <div className="ks-meta-row ks-rv">
                        <div>
                            <div className="ks-meta-l">Client</div>
                            <div className="ks-meta-v">SHEC</div>
                        </div>
                        <div>
                            <div className="ks-meta-l">Service</div>
                            <div className="ks-meta-v">Graphic Design</div>
                        </div>
                        <div>
                            <div className="ks-meta-l">Project Type</div>
                            <div className="ks-meta-v">Graphic Design Project</div>
                        </div>
                        <div>
                            <div className="ks-meta-l">Industry</div>
                            <div className="ks-meta-v">Event / Community Session / Promotional Design</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* COVER */}
            <div className="ks-cover ks-rv">
                <div className="ks-cover-wrap">
                    <img src="/Kapehan%20Session%20Thumbnail.png" alt="Kapehan Session — Graphic Design Showcase" />
                </div>
            </div>

            {/* INTRO */}
            <div className="ks-intro ks-rv">
                <div className="ks-section-label">Overview</div>
                <p className="ks-intro-body">
                    Kapehan Session needed a refreshed set of visual assets that felt more engaging, warmer, and easier to use during the session. This project focuses on improving the existing graphics, comparing the old and new versions, and showcasing the merch designs prepared as giveaway prizes for participants.
                </p>
            </div>

            <hr className="ks-divider" />

            {/* ── 01 DESIGN REFRESH SUMMARY ── */}
            <div className="ks-section ks-rv">
                <div className="ks-sec-header">
                    <div className="ks-sec-tag">01 — Design Refresh</div>
                    <h2 className="ks-sec-title">Design Refresh Summary</h2>
                    <p className="ks-sec-desc">A quick comparison of how the Kapehan Session assets improved from the old light theme to the new lively theme.</p>
                </div>
                <div className="ks-table-wrap">
                    <table className="ks-table">
                        <thead>
                            <tr>
                                <th>Element</th>
                                <th>Before — Light Theme</th>
                                <th>After — Lively Theme</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Visual Tone</td>
                                <td>Light, soft, minimal</td>
                                <td>Warm, rich, energetic</td>
                            </tr>
                            <tr>
                                <td>Color Scheme</td>
                                <td>Beige background, light brown accents</td>
                                <td>Deep coffee brown background with stronger contrast</td>
                            </tr>
                            <tr>
                                <td>Coffee Theme</td>
                                <td>Subtle, with background pattern</td>
                                <td>More prominent with real coffee beans and coffee cup</td>
                            </tr>
                            <tr>
                                <td>Banner Copy</td>
                                <td>Basic and lightly conversational</td>
                                <td>Improved copywriting — more engaging, clearer for the audience and easier for the host to deliver</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="ks-table-summary">
                    The redesign moved Kapehan Session from a light and minimal visual style into a warmer and more energetic direction. The new assets use deeper coffee brown tones, stronger contrast, real coffee visuals, and clearer copywriting to make the materials feel more engaging and easier to present during the session.
                </p>
            </div>

            <hr className="ks-divider" />

            {/* ── 02 OLD VS NEW COMPARISON ── */}
            <div className="ks-section ks-rv">
                <div className="ks-sec-header">
                    <div className="ks-sec-tag">02 — Asset Comparison</div>
                    <h2 className="ks-sec-title">Old vs New Asset Comparison</h2>
                    <p className="ks-sec-desc">A side-by-side comparison of the previous and updated Kapehan Session assets, showing how the design became warmer, clearer, and more engaging.</p>
                </div>
                <div className="ks-pairs">
                    {PAIRS.map((pair) => (
                        <div key={pair.name} className="ks-pair-group ks-rv">
                            <div className="ks-pair-name">{pair.name}</div>
                            <div className="ks-pair">
                                <div className="ks-comp-card is-old">
                                    <div className="ks-comp-media">
                                        <img src={pair.old} alt={`${pair.name} — Before`} loading="lazy" />
                                        <span className="ks-comp-badge before">Before</span>
                                    </div>
                                    <div className="ks-comp-label">
                                        <div className="ks-comp-label-ver old-ver">Old</div>
                                        <div className="ks-comp-label-theme">Light Theme</div>
                                    </div>
                                </div>
                                <div className="ks-comp-card is-new">
                                    <div className="ks-comp-media">
                                        <img src={pair.nw} alt={`${pair.name} — After`} loading="lazy" />
                                        <span className="ks-comp-badge after">After</span>
                                    </div>
                                    <div className="ks-comp-label">
                                        <div className="ks-comp-label-ver">New</div>
                                        <div className="ks-comp-label-theme">Lively Theme</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="ks-divider" />

            {/* ── 03 MERCH PRIZE SHOWCASE ── */}
            <div className="ks-section ks-rv">
                <div className="ks-sec-header">
                    <div className="ks-sec-tag">03 — Merch Design</div>
                    <h2 className="ks-sec-title">Merch Design</h2>
                    <p className="ks-sec-desc">A collection of merch items designed as giveaway prizes for participants of the Kapehan Session.</p>
                </div>
                <div className="ks-masonry">
                    {MERCH.map(({ n }) => (
                        <div key={n} className="ks-mc">
                            <div className="ks-mc-media">
                                <img
                                    className="ks-mc-img"
                                    src={`/Kapehan%20Merch%20${n}.png`}
                                    alt={`Kapehan Session — Merch ${n}`}
                                    loading="lazy"
                                />
                            </div>
                            <div className="ks-mc-label">
                                <div className="ks-mc-name">Merch {n}</div>
                                <div className="ks-mc-sub">Giveaway Prize</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="ks-divider" />

            {/* FINAL NOTE */}
            <div className="ks-final ks-rv">
                <div className="ks-section-label" style={{ marginBottom: 16 }}>Final Note</div>
                <p className="ks-final-body">
                    This Kapehan Session graphic design showcase presents the redesign of key session assets together with merch items prepared for participants. The updated visuals improved the overall tone, strengthened the coffee-themed identity, and made the materials clearer and more engaging for the session.
                </p>
                <p className="ks-final-feedback">
                    The client was very happy with the updated design direction, and the Committee team hosting the Kapehan Session was also happy with the new visuals and how they elevated the overall presentation of the event materials.
                </p>
            </div>

            {/* NEXT PROJECT */}
            <div className="ks-next">
                <div className="ks-next-inner ks-rv">
                    <div className="ks-next-preview">
                        <img src="/Opexa%20Thumbnail.png" alt="OPEXA Sigma Event 2026" />
                        <div className="ks-next-overlay">
                            <div className="ks-next-preview-cat">Graphic Design</div>
                            <div className="ks-next-preview-name">OPEXA Sigma Event 2026</div>
                        </div>
                    </div>
                    <div>
                        <div className="ks-next-tag">Next Project</div>
                        <div className="ks-next-title">OPEXA Sigma Event 2026</div>
                        <p className="ks-next-desc">Event graphic design showcase — poster designs and branded merchandise graphics created for the OPEXA Sigma Event 2026.</p>
                        <div className="ks-next-actions">
                            <a className="ks-btn" href="/all-work/opexa-sigma-event-2026">View Project →</a>
                            <a className="ks-ghost-btn" href="/all-work">All Work</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="ks-foot">
                <div className="ks-foot-inner">
                    <a className="ks-flogo" href="/"><img src="/Jadey%20Site%20Logo.png" alt="Jadey Design" style={{height:"28px",width:"auto",display:"block"}} /></a>
                    <div className="ks-fcopy">© 2025 Jane Dhell Cagas. All rights reserved.</div>
                    <div className="ks-flinks">
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a href="/#contact">Contact</a>
                        <a className="ks-fall" href="/all-work">All Projects →</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
