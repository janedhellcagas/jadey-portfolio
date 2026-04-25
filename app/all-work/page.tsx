'use client'

import { useState, useEffect, useRef } from "react"

const CSS = `
:root{--bg:#0a0a08;--bg2:#111110;--paper:#f0ebe0;--paper2:#e8e2d5;--pu:#9B59D0;--pu2:#B07AE0;--pu3:#7A3AB8;--muted:rgba(240,235,224,0.38);--border:rgba(240,235,224,0.12);--pborder:rgba(155,89,208,0.3);--pbg:rgba(155,89,208,0.08);--max:1440px;--pad:44px}
.aw*{box-sizing:border-box;margin:0;padding:0}
.aw{font-family:'Space Mono',monospace;background:var(--bg);color:var(--paper);min-height:100vh;overflow-x:hidden;width:100%}
/* NAV */
.aw-nav{position:fixed;top:0;left:0;right:0;z-index:500;background:rgba(10,10,8,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:top .3s}
.aw-nav-inner{max-width:var(--max);margin:0 auto;padding:18px var(--pad);display:flex;align-items:center;justify-content:space-between}
.aw-logo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.aw-logo span{color:var(--pu)}
.aw-nav-r{display:flex;align-items:center;gap:14px}
.aw-nav-r a{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.aw-nav-r a:hover{color:var(--pu)}
.aw-nav-r a.active{color:var(--pu)}
.aw-nav-contact{background:var(--pu)!important;color:var(--bg)!important;padding:9px 20px!important;font-weight:700!important;border:2px solid var(--pu)!important;display:inline-block!important}
.aw-nav-contact:hover{background:var(--pu2)!important;border-color:var(--pu2)!important}
.aw-ndot{width:7px;height:7px;background:var(--pu);border-radius:50%;animation:aw-pulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes aw-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.85)}}
.aw-abar{position:fixed;top:0;left:0;right:0;z-index:499;background:var(--pu3);padding:9px var(--pad);height:38px;display:none;align-items:center;justify-content:center;gap:8px}
.aw-abar.show{display:flex}
.aw-abar span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:white;font-weight:700}
.aw-adot{width:5px;height:5px;background:white;border-radius:50%;animation:aw-pulse 2s ease-in-out infinite}
/* HEADER */
.aw-header{background:var(--bg2);border-bottom:1px solid var(--border);position:relative;overflow:hidden}
.aw-header-inner{max-width:var(--max);margin:0 auto;padding:140px var(--pad) 64px;position:relative}
.aw-header-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(70px,14vw,200px);letter-spacing:-6px;color:rgba(240,235,224,0.02);white-space:nowrap;pointer-events:none}
.aw-label{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:14px}
.aw-label::after{content:'';width:48px;height:1px;background:var(--pu)}
.aw-h1{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,10vw,120px);letter-spacing:-2px;line-height:.9;color:var(--paper)}
.aw-h1 em{color:var(--pu);font-style:normal}
.aw-sub{font-size:12px;color:var(--muted);line-height:1.9;max-width:420px;margin-top:18px}
/* TOOLBAR */
.aw-body{padding:0}
.aw-body-inner{max-width:var(--max);margin:0 auto;padding:60px var(--pad) 100px}
.aw-toolbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:40px;flex-wrap:wrap;gap:14px}
.aw-count{font-family:'Bebas Neue',sans-serif;font-size:14px;letter-spacing:3px;color:var(--muted)}
.aw-filters{display:flex}
.aw-fb{padding:9px 18px;background:transparent;border:1px solid var(--border);color:var(--muted);font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;transition:all .2s;margin-left:-1px}
.aw-fb.on,.aw-fb:hover{background:var(--pu);color:var(--bg);border-color:var(--pu);z-index:1;position:relative}
/* GRID — uniform cards */
.aw-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.aw-card{border:1px solid var(--border);overflow:hidden;display:flex;flex-direction:column;text-decoration:none;transition:transform .3s,border-color .3s}
.aw-card:hover{transform:translate(-4px,-4px);border-color:var(--pu)}
.aw-thumb{width:100%;aspect-ratio:4/3;display:block;position:relative;overflow:hidden;flex-shrink:0}
.aw-thumb img{width:100%;height:100%;object-fit:cover;display:block;transform:scale(1.05)}
.aw-overlay{position:absolute;inset:0;background:rgba(74,22,130,0.85);opacity:0;transition:opacity .3s;display:flex;align-items:center;justify-content:center}
.aw-card:hover .aw-overlay{opacity:1}
.aw-view{font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:3px;color:white;border:1px solid white;padding:9px 22px}
.aw-info{padding:18px 20px;border-top:1px solid var(--border);flex:1;display:flex;flex-direction:column}
.aw-info-cat{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--pu);margin-bottom:5px}
.aw-info-title{font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:.5px;color:var(--paper)}
.aw-info-desc{font-size:10px;color:var(--muted);margin-top:4px;line-height:1.7;flex:1}
/* FOOTER */
.aw-footer{border-top:1px solid var(--border)}
.aw-footer-inner{max-width:var(--max);margin:0 auto;padding:44px var(--pad);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.aw-flogo{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.aw-flogo span{color:var(--pu)}
.aw-fcopy{font-size:9px;color:var(--muted)}
.aw-flinks{display:flex;gap:18px;flex-wrap:wrap;align-items:center}
.aw-flinks a{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.aw-flinks a:hover{color:var(--pu)}
.aw-flinks .aw-fall{color:var(--pu)!important}
/* EMPTY STATE */
.aw-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:100px 0;text-align:center;gap:14px;border:1px solid var(--border)}
.aw-empty-icon{font-size:40px;opacity:0.25;margin-bottom:4px}
.aw-empty-title{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:2px;color:var(--muted)}
.aw-empty-sub{font-size:10px;color:var(--muted);opacity:0.55;max-width:300px;line-height:1.8}
/* REVEAL */
.aw-rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.aw-rv.in{opacity:1;transform:translateY(0)}
`

const ALL_WORKS = [
    {slug:"advante",         cat:"ux", label:"UI/UX DESIGN",  title:"Advante",                      desc:"Executive coaching platform — orbital hero, trust-building layout, and seamless trial conversion.",           img:"/Advante%20Landing%20Page%20Banner%20Showcase%20-%20Main.png"},
    {slug:"brandsonic",      cat:"ux", label:"WEB DESIGN",    title:"BrandSonic",                   desc:"All-in-one podcast creation service — use the power of audio to build your brand.",                           img:"/BrandSonic%20Landing%20Page%20Banner%20Showcase%20-%20Main.png"},
    {slug:"devluvs",         cat:"ux", label:"UI/UX DESIGN",  title:"DevLuvs",                      desc:"Online developer's documentation notebook — clean, minimal, built for how devs actually work.",               img:"/DevLuvs%20Landing%20Page%20Banner%20Showcase%20-%20Main.png"},
    {slug:"future-founders", cat:"ux", label:"UI/UX DESIGN",  title:"Future Founders",              desc:"Venture building community platform — dark, bold, and built for founders shaping the future of work.",        img:"/Future%20Founders%20Landing%20Page%20Banner%20Showcase%20-%20Main.png"},
    {slug:"incremental",     cat:"ux", label:"UI/UX DESIGN",  title:"Incremental",                  desc:"Newsletter platform — connect your writing app to your email delivery and unshackle your newsletter.",        img:"/Incremental%20Landing%20Page%20Banner%20Showcase%20-%20Main.png"},
    {slug:"login-signup",    cat:"ux", label:"TEMPLATE KIT",  title:"Login and Signup Template Kit",desc:"Complete authentication UI kit — multiple screen styles, light and dark modes, ready to use.",                img:"/Login%20and%20Signup%20Template%20Kit%20-%20Main.png"},
    {slug:"reviv",           cat:"ux", label:"UI/UX DESIGN",  title:"Reviv",                        desc:"Oral health device — premium, dark, with bold before/after storytelling and a money-back guarantee.",         img:"/Reviv%20Landing%20Page%20Banner%20Showcase%20-%20Main.png"},
    {slug:"scaleforge",      cat:"ux", label:"UI/UX DESIGN",  title:"ScaleForge",                   desc:"Tech solutions company — scalable, reliable, metrics-driven, and rooted in strong company values.",           img:"/ScaleForge%20Landing%20Page%20Banner%20Showcase%20-%20Main.png"},
    {slug:"starseekr",       cat:"ux", label:"UI/UX DESIGN",  title:"Starseekr",                    desc:"Recruitment platform — helping businesses find their next star employee with expertise and precision.",        img:"/Starseekr%20Landing%20Page%20Banner%20Showcase%20-%20Main.png"},
]


export default function AllWorkPage() {
    const [filter, setFilter] = useState("all")
    const [navScroll, setNavScroll] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const els = Array.from(ref.current?.querySelectorAll(".aw-rv") || [])
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
        const onScroll = () => setNavScroll(window.scrollY > 80)
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    const filtered = filter === "all" ? ALL_WORKS : ALL_WORKS.filter(w => w.cat === filter)

    return (
        <div className="aw" ref={ref}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" />
            <style>{CSS}</style>

            <div className={`aw-abar${navScroll ? " show" : ""}`}>
                <div className="aw-adot" />
                <span>Available for new projects</span>
            </div>

            {/* NAV */}
            <nav className="aw-nav" style={{ top: navScroll ? "38px" : "0" }}>
                <div className="aw-nav-inner">
                    <a className="aw-logo" href="/">JADEY<span>.</span></a>
                    <div className="aw-nav-r">
                        <div className="aw-ndot" />
                        <a className="active" href="/all-work">All Projects</a>
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a className="aw-nav-contact" href="/#contact">Contact Me</a>
                    </div>
                </div>
            </nav>

            {/* HEADER */}
            <div className="aw-header">
                <div className="aw-header-inner">
                    <div className="aw-header-ghost">ALL WORK</div>
                    <div className="aw-label aw-rv">Portfolio</div>
                    <h1 className="aw-h1 aw-rv">All<br /><em>Work</em></h1>
                    <p className="aw-sub aw-rv">Every project, every brief, every problem solved. Click any card to view the full case study.</p>
                </div>
            </div>

            {/* GRID */}
            <div className="aw-body">
                <div className="aw-body-inner">
                    <div className="aw-toolbar aw-rv">
                        <div className="aw-count">{filtered.length} PROJECT{filtered.length !== 1 ? "S" : ""}</div>
                        <div className="aw-filters">
                            {([["all","All"],["ux","UI / UX"],["brand","Brand"],["graphic","Graphic"]] as [string,string][]).map(([f,l]) => (
                                <button key={f} className={`aw-fb${filter === f ? " on" : ""}`} onClick={() => setFilter(f)}>{l}</button>
                            ))}
                        </div>
                    </div>
                    {filtered.length > 0 ? (
                        <div className="aw-grid aw-rv">
                            {filtered.map(w => (
                                <a key={w.slug} className="aw-card" href={`/all-work/${w.slug}`}>
                                    <div className="aw-thumb">
                                        {w.img && (
                                            <img src={w.img} alt={w.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                                        )}
                                        <div className="aw-overlay"><span className="aw-view">VIEW PROJECT →</span></div>
                                    </div>
                                    <div className="aw-info">
                                        <div className="aw-info-cat">{w.label}</div>
                                        <div className="aw-info-title">{w.title}</div>
                                        <div className="aw-info-desc">{w.desc}</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div className="aw-empty aw-rv">
                            <div className="aw-empty-icon">◎</div>
                            <div className="aw-empty-title">No projects here yet</div>
                            <div className="aw-empty-sub">Projects in this category are coming soon. Check back later or browse all work.</div>
                        </div>
                    )}
                </div>
            </div>

            {/* FOOTER */}
            <footer className="aw-footer">
                <div className="aw-footer-inner">
                    <a className="aw-flogo" href="/">JADEY<span>.</span></a>
                    <div className="aw-fcopy">© 2025 Jane Dhell Cagas. All rights reserved.</div>
                    <div className="aw-flinks">
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a href="/#contact">Contact</a>
                        <a className="aw-fall" href="/all-work">All Projects →</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
