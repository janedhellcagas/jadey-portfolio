'use client'
import { useState, useEffect, useRef } from "react"

const CSS = `
:root{--bg:#0a0a08;--bg2:#111110;--paper:#f0ebe0;--pu:#9B59D0;--pu2:#B07AE0;--pu3:#7A3AB8;--muted:rgba(240,235,224,0.38);--border:rgba(240,235,224,0.12);--pborder:rgba(155,89,208,0.3);--pbg:rgba(155,89,208,0.08);--max:1440px;--pad:44px}
.ic*{box-sizing:border-box;margin:0;padding:0}
.ic{font-family:'Space Mono',monospace;background:var(--bg);color:var(--paper);min-height:100vh;overflow-x:hidden;width:100%}
/* NAV */
.ic-nav{position:fixed;top:0;left:0;right:0;z-index:500;background:rgba(10,10,8,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:top .3s}
.ic-nav-inner{max-width:var(--max);margin:0 auto;padding:18px var(--pad);display:flex;align-items:center;justify-content:space-between}
.ic-logo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.ic-logo span{color:var(--pu)}
.ic-nav-r{display:none;align-items:center;gap:14px}
.ic-nav-r a{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.ic-nav-r a:hover{color:var(--pu)}
.ic-nav-contact{background:var(--pu)!important;color:var(--bg)!important;padding:9px 20px!important;font-weight:700!important;border:2px solid var(--pu)!important;display:inline-block!important}
.ic-nav-contact:hover{background:var(--pu2)!important;border-color:var(--pu2)!important}
.ic-ndot{width:7px;height:7px;background:var(--pu);border-radius:50%;animation:ic-pulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes ic-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.85)}}
.ic-abar{position:fixed;top:0;left:0;right:0;z-index:499;background:var(--pu3);padding:9px var(--pad);height:38px;display:none;align-items:center;justify-content:center;gap:8px}
.ic-abar.show{display:flex}
.ic-abar span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:white;font-weight:700}
.ic-adot{width:5px;height:5px;background:white;border-radius:50%;animation:ic-pulse 2s ease-in-out infinite}
.ic-hamburger{display:flex;flex-direction:column;gap:5px;cursor:pointer;background:transparent;border:none;padding:6px}
.ic-hamburger span{display:block;width:24px;height:2px;background:var(--paper);transition:all .3s}
.ic-drawer{position:fixed;inset:0;z-index:600;background:var(--bg);transform:translateX(100%);transition:transform .35s ease;display:flex;flex-direction:column;padding:88px 28px 40px;overflow-y:auto}
.ic-drawer.open{transform:translateX(0)}
.ic-drawer-close{position:absolute;top:22px;right:24px;background:transparent;border:none;color:var(--paper);font-size:22px;cursor:pointer;line-height:1}
.ic-drawer a{font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;padding:18px 0;border-bottom:1px solid var(--border);transition:color .2s;display:block}
.ic-drawer a:hover,.ic-drawer a:active{color:var(--pu)}
.ic-drawer-cta{background:var(--pu);color:var(--bg)!important;padding:14px 0!important;font-weight:700;border-bottom:none!important;text-align:center;margin-top:20px;display:block;text-decoration:none;transition:background .2s}
.ic-drawer-cta:hover{background:var(--pu2)}
/* HERO */
.ic-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#1c1204,#2f2008 55%,#160f04)}
.ic-hero-inner{max-width:var(--max);margin:0 auto;padding:140px var(--pad) 60px;position:relative}
.ic-hero-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,9vw,140px);letter-spacing:-4px;color:rgba(240,235,224,0.035);white-space:nowrap;pointer-events:none;text-align:center;width:100%}
.ic-cat{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,0.6);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.ic-cat::before{content:'';width:36px;height:1px;background:rgba(255,255,255,0.4)}
.ic-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,9vw,120px);letter-spacing:-2px;line-height:.88;color:#fff}
.ic-htag{font-size:13px;line-height:1.85;color:rgba(255,255,255,0.72);max-width:620px;margin-top:20px;margin-bottom:14px;font-weight:700}
.ic-hdesc{font-size:12px;line-height:1.9;color:rgba(255,255,255,0.6);max-width:620px;margin-bottom:14px}
.ic-meta-row{display:flex;gap:36px;flex-wrap:wrap;padding-top:28px;margin-top:16px;border-top:1px solid rgba(255,255,255,0.15)}
.ic-meta-l{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:4px}
.ic-meta-v{font-size:11px;color:#fff;font-weight:700}
/* COVER */
.ic-cover{padding:52px var(--pad) 0}
.ic-cover-wrap{max-width:1425px;margin:0 auto;overflow:hidden}
.ic-cover-wrap img{width:100%;height:auto;display:block}
/* BODY */
.ic-body{padding:0}
.ic-body-inner{max-width:var(--max);margin:0 auto;padding:72px var(--pad)}
.ic-sec-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:10px}
.ic-sec-label::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.ic-sec-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(26px,4vw,46px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px;max-width:820px}
.ic-sec-body{font-size:12px;line-height:1.95;color:var(--muted);max-width:700px}
.ic-sec-body+.ic-sec-body{margin-top:10px}
/* CARD GRID */
.ic-cardgrid{display:grid;gap:18px;margin-top:36px}
.ic-cols-2{grid-template-columns:1fr 1fr}
.ic-card{border:1px solid var(--border);background:var(--bg2);padding:24px;transition:border-color .25s}
.ic-card:hover{border-color:var(--pborder)}
.ic-card-num{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--pu);font-weight:700;margin-bottom:10px}
.ic-card p{font-size:11.5px;line-height:1.8;color:var(--muted)}
/* CHIPS */
.ic-chiprow{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px}
.ic-chip{font-size:10.5px;font-weight:700;color:var(--pu3);background:var(--pbg);border:1px solid var(--pborder);padding:9px 14px}
/* SUB BLOCK */
.ic-block{margin-top:52px}
.ic-block:first-child{margin-top:0}
.ic-subhead{display:flex;align-items:center;gap:12px;margin-bottom:16px}
.ic-subhead-dot{width:7px;height:7px;border-radius:50%;background:var(--pu);flex-shrink:0}
.ic-subhead-text{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--paper);font-weight:700}
/* LISTS */
.ic-list{list-style:none;margin-top:8px}
.ic-list li{font-size:11.5px;line-height:1.75;color:var(--muted);padding:8px 0 8px 18px;border-top:1px solid var(--border);position:relative}
.ic-list li:first-child{border-top:none;padding-top:0}
.ic-list li::before{content:'•';position:absolute;left:0;color:var(--pu)}
/* SHOWCASE */
.ic-showcase-list{display:flex;flex-direction:column;gap:32px;margin-top:36px}
.ic-showcase-item img{width:100%;height:auto;display:block;background:var(--bg2)}
/* SINGLE / TWO-IMAGE VISUALS */
.ic-shot{margin-top:28px;background:var(--bg2);padding:16px}
.ic-shot img{display:block;width:100%;height:auto;border-radius:8px}
.ic-shot-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:28px}
.ic-shot-grid .ic-shot{margin-top:0}
/* TIMELINE (Gantt + tooltip + mobile stacker, 5-day) */
.ic-tl-gantt{margin-top:36px;border:1px solid var(--border);background:var(--bg2);padding:32px 28px}
.ic-tl-gweeks{display:grid;grid-template-columns:250px repeat(5,1fr);gap:6px;margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--border)}
.ic-tl-gweeks div{font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);text-align:center}
.ic-tl-gweeks div:first-child{text-align:left;color:var(--pu);font-weight:700;letter-spacing:.14em}
.ic-tl-grow{display:grid;grid-template-columns:250px repeat(5,1fr);gap:6px;align-items:center;margin-bottom:12px}
.ic-tl-grow:last-child{margin-bottom:0}
.ic-tl-grow-label{display:flex;align-items:flex-start;gap:9px}
.ic-tl-grow-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:4px}
.ic-tl-grow-name{font-size:11px;font-weight:700;color:var(--paper);line-height:1.35}
.ic-tl-grow-wk{font-size:9px;color:var(--muted);opacity:.7;margin-top:3px;letter-spacing:.03em}
.ic-tl-gtrack{grid-column:span 5;display:grid;grid-template-columns:repeat(5,1fr);gap:6px;height:38px}
.ic-tl-gseg{position:relative;display:flex;align-items:center;justify-content:center;padding:4px 6px;text-align:center;cursor:default}
.ic-tl-gseg span{font-size:8px;letter-spacing:.03em;font-weight:700;line-height:1.25}
.ic-tl-tip{position:absolute;top:calc(100% + 10px);left:50%;transform:translateX(-50%);width:230px;background:#141317;border:1px solid var(--pborder);padding:14px 16px;opacity:0;visibility:hidden;transition:opacity .16s ease;pointer-events:none;z-index:30;box-shadow:0 16px 36px rgba(0,0,0,.55);text-align:left}
.ic-tl-gseg:hover .ic-tl-tip{opacity:1;visibility:visible}
.ic-tl-tip-title{font-family:'Bebas Neue',sans-serif;font-size:14px;letter-spacing:.3px;color:var(--paper);margin-bottom:5px;line-height:1.2}
.ic-tl-tip-wk{font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--pu2);font-weight:700;margin-bottom:9px}
.ic-tl-tip-desc{font-size:10.5px;line-height:1.65;color:var(--muted)}
.ic-tl-legend{display:flex;gap:20px;margin-top:26px;flex-wrap:wrap;border-top:1px solid var(--border);padding-top:20px}
.ic-tl-legend-item{display:flex;align-items:center;gap:8px;font-size:10px;letter-spacing:.04em;color:var(--muted)}
.ic-tl-legend-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0}
.ic-tl-mobile{display:none;margin-top:36px;border:1px solid var(--border);background:var(--bg2);padding:8px 22px}
.ic-tl-row{display:flex;gap:14px;padding:18px 0;border-top:1px solid var(--border)}
.ic-tl-row:first-child{border-top:none}
.ic-tl-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;margin-top:4px}
.ic-tl-wk{font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--pu2);font-weight:700;margin-bottom:5px}
.ic-tl-name{font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:.3px;color:var(--paper);margin-bottom:6px}
.ic-tl-sub{font-size:11px;line-height:1.7;color:var(--muted)}
/* NEXT PROJECT */
.ic-next{background:var(--bg2)}
.ic-next-inner{max-width:var(--max);margin:0 auto;padding:64px var(--pad);display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:center}
.ic-next-preview{display:block;position:relative;overflow:hidden;aspect-ratio:4/3;border:1px solid var(--border);transition:border-color .2s}
.ic-next-preview:hover{border-color:var(--pborder)}
.ic-next-preview-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px}
.ic-next-preview-cat{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:6px}
.ic-next-preview-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(16px,2.2vw,26px);letter-spacing:-.5px;color:#fff;line-height:1}
.ic-next-tag{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.ic-next-tag::after{content:'';width:36px;height:1px;background:var(--pu)}
.ic-next-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4.5vw,56px);letter-spacing:-1px;color:var(--paper);line-height:.92;margin-bottom:14px}
.ic-next-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:380px;margin-bottom:28px}
.ic-next-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.ic-btn{font-size:10px;letter-spacing:.12em;text-transform:uppercase;background:var(--pu);color:var(--bg);border:2px solid var(--pu);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.ic-btn:hover{background:var(--pu2);border-color:var(--pu2)}
.ic-ghost-btn{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.ic-ghost-btn:hover{border-color:var(--pu);color:var(--pu)}
/* FOOTER */
.ic-foot{border-top:1px solid var(--border)}
.ic-foot-inner{max-width:var(--max);margin:0 auto;padding:44px var(--pad);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.ic-flogo{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.ic-flogo span{color:var(--pu)}
.ic-fcopy{font-size:9px;color:var(--muted)}
.ic-flinks{display:flex;gap:18px;flex-wrap:wrap;align-items:center}
.ic-flinks a{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.ic-flinks a:hover{color:var(--pu)}
.ic-fall{color:var(--pu)!important}
/* REVEAL */
.ic-rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.ic-rv.in{opacity:1;transform:translateY(0)}
/* ===== RESPONSIVE ===== */
@media(max-width:1100px){
  .ic-cols-2{grid-template-columns:1fr}
  .ic-shot-grid{grid-template-columns:1fr}
  .ic-next-inner{grid-template-columns:1fr;gap:32px}
}
@media(max-width:1023px){
  :root{--pad:32px}
  .ic-nav-inner{padding:14px 28px}
  .ic-tl-gweeks,.ic-tl-grow{grid-template-columns:170px repeat(5,1fr)}
  .ic-tl-tip{width:190px;padding:12px 14px}
}
@media(max-width:768px){
  :root{--pad:24px}
  .ic-hero-inner{padding:110px var(--pad) 44px}
  .ic-body-inner{padding:52px var(--pad)}
  .ic-cover{padding:36px var(--pad) 0}
  .ic-meta-row{gap:24px}
  .ic-cardgrid{gap:14px}
  .ic-tl-gantt{display:none}
  .ic-tl-mobile{display:block}
  .ic-next-inner{padding:44px var(--pad)}
  .ic-foot-inner{flex-direction:column;align-items:flex-start;gap:20px;padding:32px var(--pad)}
  .ic-flinks{flex-direction:column;gap:10px;align-items:flex-start}
}
@media(max-width:480px){
  :root{--pad:16px}
  .ic-abar{padding:9px 16px}
  .ic-abar span{font-size:7px}
  .ic-meta-row{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
}
@media(hover:none),(pointer:coarse){
  .ic-hamburger{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center}
  .ic-nav-r{display:none}
  .ic-btn,.ic-ghost-btn{min-height:44px;display:inline-flex;align-items:center;justify-content:center}
}
@media(min-width:1024px){
  .ic-hamburger{display:none}
  .ic-nav-r{display:flex}
}
@media(prefers-reduced-motion:reduce){
  .ic-rv{transition:none;opacity:1;transform:none}
  .ic-drawer{transition:none}
  .ic-ndot,.ic-adot{animation:none}
}
`

const HERO_META = [
    { l: "Project", v: "Incremental" },
    { l: "Service", v: "UI/UX Design" },
    { l: "Industry", v: "Newsletter Platform / Email Workflow Tool" },
    { l: "Platform", v: "Responsive Website / Landing Page" },
    { l: "Role", v: "UI/UX Designer" },
]

const FEATURE_POINTS = [
    "Write emails in Notion",
    "Consolidate newsletter content in one place",
    "Switch platforms with ease",
    "Integrate without pain",
    "Sync content to an email service provider",
    "Reduce formatting and migration issues",
]

const PROBLEM_POINTS = [
    "Product message needed to be clearer at first glance",
    "Key benefits needed better visual hierarchy",
    "Sections needed stronger spacing and flow",
    "Pricing and FAQ needed to feel easier to compare",
    "CTA areas needed to stand out more",
    "The page needed a more polished and engaging visual direction",
]

const DISCOVERY_POINTS = [
    "Reviewed the existing landing page",
    "Discussed what the client wanted to improve",
    "Clarified the product value and target message",
    "Identified important landing page sections",
    "Aligned on improving content hierarchy, layout, and CTA clarity",
]

const FINAL_BRAND_CHOICES = [
    { label: "Brand Color", img: "/Incremental%20color.png", desc: "The final color direction uses a clean black, white, and sunrise yellow palette. The yellow works as the highlight color to make key actions, illustrations, and important UI elements stand out." },
    { label: "Typography", img: "/Incremental%20typography.png", desc: "Poppins was used as the main typeface because it feels geometric, clean, readable, and flexible for a modern landing page experience." },
    { label: "Illustration", img: "/Incremental%20illustration.png", desc: "The illustration direction became a key part of the landing page. The style uses black-and-white drawing or illustration with yellow highlights to make important moments pop and explain product benefits in a friendly way." },
    { label: "Photography", img: "/Incremental%20photography.png", desc: "The photography direction supports a consistent black-and-white image style, helping the brand feel clean and focused without creating too much visual noise." },
]

const MOODBOARD_MENTIONS = [
    "Layout inspiration",
    "Content hierarchy",
    "Illustration usage",
    "Pricing and FAQ presentation",
    "CTA visibility",
    "Clean and modern SaaS-style landing page direction",
]

const FINAL_HOMEPAGE_SECTIONS = ["Header / Navigation", "Hero Section", "Feature Overview", "Feature Benefits", "Testimonials", "Pricing Plans", "FAQ", "Ready to Get Started CTA", "Footer"]

const HANDOFF_POINTS = [
    "Final landing page mock-up",
    "Section structure and layout notes",
    "Spacing and alignment references",
    "CTA behavior notes",
    "Responsive layout guidance",
    "Developer handoff support",
]

const OUTCOME_POINTS = [
    "Improved the existing landing page instead of rebuilding from scratch",
    "Helped explore a fast, focused brand direction alongside the UI/UX redesign",
    "Strengthened product messaging and content hierarchy",
    "Made the feature sections easier to scan",
    "Improved pricing, FAQ, and CTA presentation",
    "Created a more polished, black-and-white, illustration-heavy visual direction with yellow highlights",
    "Prepared the design for development handoff",
]

const TIMELINE_GROUPS = [
    { name: "Discovery and Strategy", color: "#9B59D0", text: "#F8F6FC" },
    { name: "UX Structure", color: "#7C6FE0", text: "#F8F6FC" },
    { name: "UI Design and Review", color: "#E0A83E", text: "#1A1408" },
    { name: "Handoff", color: "#4FBFA8", text: "#0A1613" },
]

const TIMELINE_PHASES = [
    { label: "Discovery Call and Existing Website Review", day: "Day 1", s: 1, e: 2, group: 0, desc: "Reviewed the existing landing page, discussed the client's goals, and identified what needed to be improved." },
    { label: "Brand Design Exploration", day: "Day 1–2", s: 1, e: 3, group: 0, desc: "Explored brand moodboarding, visual direction, color, typography, photography, and illustration approach to guide the improved landing page design." },
    { label: "Sitemap and Wireframe Planning", day: "Day 1–2", s: 1, e: 3, group: 1, desc: "Planned the improved landing page flow, sections, and content hierarchy before moving into UI design." },
    { label: "UI/UX Design Moodboarding", day: "Day 2", s: 2, e: 3, group: 2, desc: "Explored visual direction, layout references, illustration use, and SaaS-style landing page ideas." },
    { label: "UI Mock-up, Prototyping, and Client Feedback", day: "Day 2–4", s: 2, e: 5, group: 2, desc: "Designed the improved landing page mock-up, connected the prototype, reviewed it with the client, and refined the design based on feedback." },
    { label: "Developer Handoff", day: "Day 5", s: 5, e: 6, group: 3, desc: "Prepared the final design, layout notes, spacing references, CTA behavior notes, and responsive guidance for development." },
]

export default function IncrementalUIUXPage() {
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
        const els = Array.from(ref.current?.querySelectorAll(".ic-rv") || [])
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
        <div className="ic" ref={ref}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" />
            <style>{CSS}</style>

            <div className={`ic-abar${navScroll ? " show" : ""}`}>
                <div className="ic-adot" />
                <span>Available for new projects</span>
            </div>

            <nav className="ic-nav" style={{ top: navScroll ? "38px" : "0" }}>
                <div className="ic-nav-inner">
                    <a className="ic-logo" href="/">JADEY<span>.</span></a>
                    <div className="ic-nav-r">
                        <div className="ic-ndot" />
                        <a href="/all-work">All Projects</a>
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a className="ic-nav-contact" href="/#contact">Contact Me</a>
                    </div>
                    <button ref={hamburgerRef} className="ic-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            <div ref={drawerRef} className={`ic-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-label="Navigation menu">
                <button className="ic-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <a href="/all-work" onClick={() => setMenuOpen(false)}>All Projects</a>
                <a href="/#about" onClick={() => setMenuOpen(false)}>About Me</a>
                <a href="/#work" onClick={() => setMenuOpen(false)}>Work Highlights</a>
                <a href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <a href="/#insights" onClick={() => setMenuOpen(false)}>Blog</a>
                <a href="/#workshops" onClick={() => setMenuOpen(false)}>Workshops</a>
                <a className="ic-drawer-cta" href="/#contact" onClick={() => setMenuOpen(false)}>Contact Me</a>
            </div>

            {/* HERO */}
            <div className="ic-hero">
                <div className="ic-hero-inner">
                    <div className="ic-hero-ghost">INCREMENTAL</div>
                    <div className="ic-cat ic-rv">UI/UX Design Case Study</div>
                    <h1 className="ic-title ic-rv">Incremental</h1>
                    <p className="ic-htag ic-rv">Incremental is a newsletter platform landing page redesign focused on improving product clarity, content hierarchy, and conversion flow for users who want to connect their writing app to their email delivery platform.</p>
                    <p className="ic-hdesc ic-rv">Incremental already had an existing landing page. The work focused on reviewing and improving that experience — sharpening the product message, layout, and visual hierarchy — rather than building a new design from scratch.</p>
                    <div className="ic-meta-row ic-rv">
                        {HERO_META.map(m => (
                            <div key={m.l}><div className="ic-meta-l">{m.l}</div><div className="ic-meta-v">{m.v}</div></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* COVER */}
            <div className="ic-cover ic-rv">
                <div className="ic-cover-wrap">
                    <img src="/Incremental%20Landing%20Page%20Banner%20Showcase%20-%20Main.png" alt="Incremental — newsletter platform landing page cover" />
                </div>
            </div>

            <div className="ic-body">
                <div className="ic-body-inner">

                    {/* 1. ABOUT THE PRODUCT */}
                    <div className="ic-rv" style={{ marginBottom: 76 }}>
                        <div className="ic-sec-label">About the Product</div>
                        <h2 className="ic-sec-title">Helping users connect their writing workflow with email delivery.</h2>
                        <p className="ic-sec-body">Incremental connects a user&rsquo;s favorite writing app to their email delivery platform so they can save the best of both worlds. The product supports newsletter creators by helping them write content in Notion, sync content to their email service provider, manage newsletter content, and avoid manual formatting or migration issues.</p>
                        <div className="ic-chiprow">
                            {FEATURE_POINTS.map(f => <div className="ic-chip" key={f}>{f}</div>)}
                        </div>
                    </div>

                    {/* 2. DESIGN PROBLEM */}
                    <div className="ic-rv" style={{ marginBottom: 76 }}>
                        <div className="ic-sec-label">Design Problem</div>
                        <h2 className="ic-sec-title">The existing landing page needed clearer hierarchy and stronger product storytelling.</h2>
                        <p className="ic-sec-body">The original landing page already communicated the product idea, but the structure needed improvement. Some sections felt too plain, the visual hierarchy was not strong enough, and the product benefits needed to be easier to scan. The redesign focused on improving clarity, layout flow, trust-building sections, pricing presentation, and the main call-to-action.</p>
                        <ul className="ic-list" style={{ marginTop: 20, maxWidth: 700 }}>
                            {PROBLEM_POINTS.map(p => <li key={p}>{p}</li>)}
                        </ul>
                    </div>

                    {/* 3. DISCOVERY AND CLIENT ALIGNMENT */}
                    <div className="ic-rv" style={{ marginBottom: 76 }}>
                        <div className="ic-sec-label">Discovery and Client Alignment</div>
                        <h2 className="ic-sec-title">Understanding what the client wanted to improve.</h2>
                        <p className="ic-sec-body">The project started with a discovery call to understand the client&rsquo;s goals, existing landing page, product value, and areas that needed improvement. Since the website already existed, the design process focused on improving the experience instead of rebuilding the direction from scratch.</p>
                        <ul className="ic-list" style={{ marginTop: 20, maxWidth: 700 }}>
                            {DISCOVERY_POINTS.map(d => <li key={d}>{d}</li>)}
                        </ul>
                    </div>

                    {/* 4. BRAND DESIGN EXPLORATION */}
                    <div className="ic-rv" style={{ marginBottom: 76 }}>
                        <div className="ic-sec-label">Brand Design Exploration</div>
                        <h2 className="ic-sec-title">Exploring a visual direction that could support the improved landing page.</h2>
                        <p className="ic-sec-body">Alongside the UI/UX redesign, I also helped explore Incremental&rsquo;s brand design direction. Since the timeline was short, the brand exploration had to be completed quickly and clearly before the final UI design started. The goal was to align on a visual approach that could make the landing page feel more polished, recognizable, and easier to remember.</p>
                        <p className="ic-sec-body">The client preferred the first moodboard direction because it used a darker and cleaner visual style, a strong black and white foundation, illustration-heavy visuals, and the brand color as a highlight. This helped guide the final landing page direction and made the design feel more intentional and visually distinct.</p>
                        <div className="ic-shot">
                            <img src="/Incremental%20Mood%20boarding.png" alt="Incremental — brand design exploration moodboarding" />
                        </div>
                    </div>

                    {/* 5. FINAL BRAND DESIGN CHOICES */}
                    <div className="ic-rv" style={{ marginBottom: 76 }}>
                        <div className="ic-sec-label">Final Brand Design Choices</div>
                        <h2 className="ic-sec-title">Final visual choices that shaped the landing page direction.</h2>
                        <p className="ic-sec-body">After the brand exploration, the final visual direction was defined through color, typography, illustration, and photography choices. These decisions helped the landing page feel clean, focused, and more memorable while supporting the product&rsquo;s main message and calls to action.</p>
                        <div className="ic-cardgrid ic-cols-2">
                            {FINAL_BRAND_CHOICES.map(f => (
                                <div key={f.label}>
                                    <div className="ic-subhead"><span className="ic-subhead-dot" /><span className="ic-subhead-text">{f.label}</span></div>
                                    <p className="ic-sec-body">{f.desc}</p>
                                    <div className="ic-shot" style={{ marginTop: 16 }}>
                                        <img src={f.img} alt={`Incremental — final ${f.label.toLowerCase()} direction`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 6. PROJECT TIMELINE */}
                    <div className="ic-rv" style={{ marginBottom: 76 }}>
                        <div className="ic-sec-label">Project Timeline</div>
                        <h2 className="ic-sec-title">A focused 1-week process from discovery to developer handoff.</h2>
                        <p className="ic-sec-body">Because Incremental already had an existing landing page, the project moved through a focused 5-day process: reviewing the current site, planning the improved structure, exploring the visual direction, designing and refining the mock-up with the client, and preparing the design for developer handoff.</p>

                        <div className="ic-tl-gantt">
                            <div className="ic-tl-gweeks">
                                <div>Phase</div>
                                {Array.from({ length: 5 }, (_, i) => <div key={i}>Day {i + 1}</div>)}
                            </div>
                            {TIMELINE_PHASES.map(p => {
                                const g = TIMELINE_GROUPS[p.group]
                                return (
                                    <div className="ic-tl-grow" key={p.label}>
                                        <div className="ic-tl-grow-label">
                                            <div className="ic-tl-grow-dot" style={{ background: g.color }} />
                                            <div>
                                                <div className="ic-tl-grow-name">{p.label}</div>
                                                <div className="ic-tl-grow-wk">{p.day}</div>
                                            </div>
                                        </div>
                                        <div className="ic-tl-gtrack">
                                            <div className="ic-tl-gseg" style={{ gridColumn: `${p.s} / ${p.e}`, background: g.color, color: g.text }}>
                                                <span>{p.day}</span>
                                                <div className="ic-tl-tip">
                                                    <div className="ic-tl-tip-title">{p.label}</div>
                                                    <div className="ic-tl-tip-wk">{p.day} · {g.name}</div>
                                                    <div className="ic-tl-tip-desc">{p.desc}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="ic-tl-legend">
                                {TIMELINE_GROUPS.map(g => (
                                    <div className="ic-tl-legend-item" key={g.name}><div className="ic-tl-legend-dot" style={{ background: g.color }} />{g.name}</div>
                                ))}
                            </div>
                        </div>

                        <div className="ic-tl-mobile">
                            {TIMELINE_PHASES.map(p => {
                                const g = TIMELINE_GROUPS[p.group]
                                return (
                                    <div className="ic-tl-row" key={p.label}>
                                        <div className="ic-tl-dot" style={{ background: g.color }} />
                                        <div>
                                            <div className="ic-tl-wk">{p.day} · {g.name}</div>
                                            <div className="ic-tl-name">{p.label}</div>
                                            <div className="ic-tl-sub">{p.desc}</div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="ic-tl-legend" style={{ marginTop: 4 }}>
                                {TIMELINE_GROUPS.map(g => (
                                    <div className="ic-tl-legend-item" key={g.name}><div className="ic-tl-legend-dot" style={{ background: g.color }} />{g.name}</div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 7. COMPETITOR AND REFERENCE REVIEW */}
                    <div className="ic-rv" style={{ marginBottom: 76 }}>
                        <div className="ic-sec-label">Competitor and Reference Review</div>
                        <h2 className="ic-sec-title">Studying similar product websites to improve the page structure.</h2>
                        <p className="ic-sec-body">Competitor and reference websites were reviewed to understand how similar tools present features, pricing, testimonials, CTA sections, and product explanations. This helped identify useful patterns that could improve Incremental&rsquo;s landing page without copying another product&rsquo;s design.</p>
                        <div className="ic-shot">
                            <img src="/Incremental%20NEW%20Competitors%20Website.png" alt="Incremental — competitor and reference website review" />
                        </div>
                    </div>

                    {/* 8. ORIGINAL LANDING PAGE REVIEW */}
                    <div className="ic-rv" style={{ marginBottom: 76 }}>
                        <div className="ic-sec-label">Original Landing Page Review</div>
                        <h2 className="ic-sec-title">Reviewing the existing design before improving the experience.</h2>
                        <p className="ic-sec-body">Before redesigning the page, the existing Incremental landing page was reviewed to understand its current structure, content, and gaps. This helped identify what needed to be retained, improved, or restructured in the new design.</p>
                        <div className="ic-shot">
                            <img src="/Incremental%20Original%20Landing%20page.png" alt="Incremental — original landing page before redesign" />
                        </div>
                    </div>

                    {/* 9. SITEMAP AND WIREFRAME */}
                    <div className="ic-rv" style={{ marginBottom: 76 }}>
                        <div className="ic-sec-label">Sitemap and Wireframe</div>
                        <h2 className="ic-sec-title">Planning the improved landing page flow before visual design.</h2>
                        <p className="ic-sec-body">The sitemap and wireframe stage helped organize the updated landing page structure. This included planning how users move from the hero message to features, testimonials, pricing, FAQ, final CTA, and footer. The goal was to create a clearer flow that made the product easier to understand and easier to act on.</p>
                        <div className="ic-shot">
                            <img src="/Inremental%20Wireframe%20and%20sitemap.png" alt="Incremental — sitemap and wireframe structure" />
                        </div>
                    </div>

                    {/* 10. UI/UX DESIGN MOODBOARDING */}
                    <div className="ic-rv" style={{ marginBottom: 76 }}>
                        <div className="ic-sec-label">UI/UX Design Moodboarding</div>
                        <h2 className="ic-sec-title">Exploring a cleaner and more engaging landing page direction.</h2>
                        <p className="ic-sec-body">Moodboarding helped explore how the improved landing page could feel more polished, modern, and product-focused. The visual direction focused on keeping the experience simple and readable while making the product benefits, illustrations, pricing, and CTA areas more engaging.</p>
                        <div className="ic-shot-grid">
                            <div className="ic-shot">
                                <img src="/Incremental%20moodboard%201.png" alt="Incremental — UI/UX moodboarding exploration reference 1" />
                            </div>
                            <div className="ic-shot">
                                <img src="/Incremental%20moodboard%202.png" alt="Incremental — UI/UX moodboarding exploration reference 2" />
                            </div>
                        </div>
                        <div className="ic-chiprow">
                            {MOODBOARD_MENTIONS.map(m => <div className="ic-chip" key={m}>{m}</div>)}
                        </div>
                    </div>

                    {/* 11. UI MOCK-UP AND RESPONSIVE DESIGN */}
                    <div className="ic-rv" style={{ marginBottom: 76 }}>
                        <div className="ic-sec-label">UI Mock-up and Responsive Design</div>
                        <h2 className="ic-sec-title">Improving the landing page with clearer sections and stronger visual hierarchy.</h2>
                        <p className="ic-sec-body">The final mock-up improved the existing landing page by creating a stronger hero section, clearer feature explanations, better section spacing, more engaging illustrations, improved testimonial presentation, clearer pricing cards, a more organized FAQ section, and a stronger final CTA.</p>

                        <div className="ic-block" style={{ marginTop: 28 }}>
                            <div className="ic-subhead"><span className="ic-subhead-dot" /><span className="ic-subhead-text">Final Homepage Sections</span></div>
                            <div className="ic-chiprow" style={{ marginTop: 0 }}>
                                {FINAL_HOMEPAGE_SECTIONS.map(s => <div className="ic-chip" key={s}>{s}</div>)}
                            </div>
                        </div>

                        <div className="ic-showcase-list">
                            <div className="ic-showcase-item">
                                <img src="/Incremental%20Landing%20Page%20Banner%20Showcase%20-%20Main.png" alt="Incremental homepage — web, hero and feature overview" />
                            </div>
                            <div className="ic-showcase-item">
                                <img src="/Incremental%20Landing%20Page%20Banner%20Showcase%20-%202nd.png" alt="Incremental homepage — web, features and testimonials" />
                            </div>
                            <div className="ic-showcase-item">
                                <img src="/Incremental%20Landing%20Page%20Banner%20Showcase%20-%203rd.png" alt="Incremental homepage — web, pricing and FAQ" />
                            </div>
                        </div>
                    </div>

                    {/* 12. REVIEW AND REFINEMENT */}
                    <div className="ic-rv" style={{ marginBottom: 76 }}>
                        <div className="ic-sec-label">Review and Refinement</div>
                        <h2 className="ic-sec-title">Refining the landing page based on client feedback.</h2>
                        <p className="ic-sec-body">During the design phase, the mock-up was reviewed with the client and adjusted based on feedback. The refinement focused on improving readability, spacing, section flow, visual consistency, CTA clarity, and overall polish before preparing the design for development.</p>
                    </div>

                    {/* 13. DEVELOPER HANDOFF */}
                    <div className="ic-rv" style={{ marginBottom: 76 }}>
                        <div className="ic-sec-label">Developer Handoff</div>
                        <h2 className="ic-sec-title">Preparing the improved design for implementation.</h2>
                        <p className="ic-sec-body">After the final review, the design was prepared for developer handoff. The handoff included the final landing page design, layout references, spacing notes, section structure, CTA behavior, and responsive design guidance needed for implementation.</p>
                        <div className="ic-shot-grid">
                            <div className="ic-shot">
                                <img src="/Inremental%20Handoff%201.png" alt="Incremental — developer handoff reference 1" />
                            </div>
                            <div className="ic-shot">
                                <img src="/Inremental%20Handoff%202.png" alt="Incremental — developer handoff reference 2" />
                            </div>
                        </div>
                        <div className="ic-cardgrid">
                            <div className="ic-card">
                                <div className="ic-card-num">Handoff Includes</div>
                                <ul className="ic-list" style={{ marginTop: 4 }}>
                                    {HANDOFF_POINTS.map(h => <li key={h}>{h}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* 14. OUTCOME */}
                    <div className="ic-rv">
                        <div className="ic-sec-label">Outcome</div>
                        <h2 className="ic-sec-title">A clearer and more polished landing page for Incremental.</h2>
                        <p className="ic-sec-body">The final Incremental landing page redesign made the product easier to understand and more visually engaging. The improved structure helped communicate the product benefits, explain the workflow, present pricing more clearly, and guide users toward getting started.</p>
                        <p className="ic-sec-body">The client was satisfied with the final direction because the black-and-white, illustration-heavy approach with yellow highlights made the landing page feel more polished, distinct, and easier to understand.</p>
                        <div className="ic-cardgrid ic-cols-2" style={{ marginTop: 28 }}>
                            {OUTCOME_POINTS.map((o, i) => (
                                <div className="ic-card" key={o}>
                                    <div className="ic-card-num">{String(i + 1).padStart(2, "0")}</div>
                                    <p>{o}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* NEXT PROJECT */}
            <div className="ic-next">
                <div className="ic-next-inner ic-rv">
                    <a className="ic-next-preview" href="/all-work/advante" aria-label="View Advante project">
                        <img
                            src="/Advante%20Landing%20Page%20Banner%20Showcase%20-%20Main.png"
                            alt="Advante"
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.05)" }}
                        />
                        <div className="ic-next-preview-overlay">
                            <div className="ic-next-preview-cat">UI/UX Design</div>
                            <div className="ic-next-preview-name">Advante</div>
                        </div>
                    </a>
                    <div>
                        <div className="ic-next-tag">Next Project</div>
                        <div className="ic-next-title">Advante</div>
                        <p className="ic-next-desc">Coaching platform website with a guided journey, outcome-focused structure, and multiple entry points.</p>
                        <div className="ic-next-actions">
                            <a className="ic-btn" href="/all-work/advante">View Project →</a>
                            <a className="ic-ghost-btn" href="/all-work">All Work</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="ic-foot">
                <div className="ic-foot-inner">
                    <a className="ic-flogo" href="/">JADEY<span>.</span></a>
                    <div className="ic-fcopy">© 2025 Jane Dhell Cagas. All rights reserved.</div>
                    <div className="ic-flinks">
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a href="/#contact">Contact</a>
                        <a className="ic-fall" href="/all-work">All Projects →</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
