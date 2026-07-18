'use client'
import { useState, useEffect, useRef } from "react"

const CSS = `
:root{--bg:#0a0a08;--bg2:#111110;--paper:#f0ebe0;--pu:#9B59D0;--pu2:#B07AE0;--pu3:#7A3AB8;--muted:rgba(240,235,224,0.38);--border:rgba(240,235,224,0.12);--pborder:rgba(155,89,208,0.3);--pbg:rgba(155,89,208,0.08);--max:1440px;--pad:44px}
.ss*{box-sizing:border-box;margin:0;padding:0}
.ss{font-family:'Space Mono',monospace;background:var(--bg);color:var(--paper);min-height:100vh;overflow-x:hidden;width:100%}
/* NAV */
.ss-nav{position:fixed;top:0;left:0;right:0;z-index:500;background:rgba(10,10,8,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:top .3s}
.ss-nav-inner{max-width:var(--max);margin:0 auto;padding:18px var(--pad);display:flex;align-items:center;justify-content:space-between}
.ss-logo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.ss-logo span{color:var(--pu)}
.ss-nav-r{display:none;align-items:center;gap:14px}
.ss-nav-r a{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.ss-nav-r a:hover{color:var(--pu)}
.ss-nav-contact{background:var(--pu)!important;color:var(--bg)!important;padding:9px 20px!important;font-weight:700!important;border:2px solid var(--pu)!important;display:inline-block!important}
.ss-nav-contact:hover{background:var(--pu2)!important;border-color:var(--pu2)!important}
.ss-ndot{width:7px;height:7px;background:var(--pu);border-radius:50%;animation:ss-pulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes ss-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.85)}}
.ss-abar{position:fixed;top:0;left:0;right:0;z-index:499;background:var(--pu3);padding:9px var(--pad);height:38px;display:none;align-items:center;justify-content:center;gap:8px}
.ss-abar.show{display:flex}
.ss-abar span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:white;font-weight:700}
.ss-adot{width:5px;height:5px;background:white;border-radius:50%;animation:ss-pulse 2s ease-in-out infinite}
.ss-hamburger{display:flex;flex-direction:column;gap:5px;cursor:pointer;background:transparent;border:none;padding:6px}
.ss-hamburger span{display:block;width:24px;height:2px;background:var(--paper);transition:all .3s}
.ss-drawer{position:fixed;inset:0;z-index:600;background:var(--bg);transform:translateX(100%);transition:transform .35s ease;display:flex;flex-direction:column;padding:88px 28px 40px;overflow-y:auto}
.ss-drawer.open{transform:translateX(0)}
.ss-drawer-close{position:absolute;top:22px;right:24px;background:transparent;border:none;color:var(--paper);font-size:22px;cursor:pointer;line-height:1}
.ss-drawer a{font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;padding:18px 0;border-bottom:1px solid var(--border);transition:color .2s;display:block}
.ss-drawer a:hover,.ss-drawer a:active{color:var(--pu)}
.ss-drawer-cta{background:var(--pu);color:var(--bg)!important;padding:14px 0!important;font-weight:700;border-bottom:none!important;text-align:center;margin-top:20px;display:block;text-decoration:none;transition:background .2s}
.ss-drawer-cta:hover{background:var(--pu2)}
/* HERO */
.ss-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#1c0a2e,#2f1048 55%,#160820)}
.ss-hero-inner{max-width:var(--max);margin:0 auto;padding:140px var(--pad) 60px;position:relative}
.ss-hero-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,9vw,140px);letter-spacing:-4px;color:rgba(240,235,224,0.035);white-space:nowrap;pointer-events:none;text-align:center;width:100%}
.ss-cat{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,0.6);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.ss-cat::before{content:'';width:36px;height:1px;background:rgba(255,255,255,0.4)}
.ss-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,9vw,120px);letter-spacing:-2px;line-height:.88;color:#fff}
.ss-htag{font-size:13px;line-height:1.85;color:rgba(255,255,255,0.72);max-width:620px;margin-top:20px;margin-bottom:14px;font-weight:700}
.ss-hdesc{font-size:12px;line-height:1.9;color:rgba(255,255,255,0.6);max-width:620px;margin-bottom:14px}
.ss-meta-row{display:flex;gap:36px;flex-wrap:wrap;padding-top:28px;margin-top:16px;border-top:1px solid rgba(255,255,255,0.15)}
.ss-meta-l{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:4px}
.ss-meta-v{font-size:11px;color:#fff;font-weight:700}
/* COVER */
.ss-cover{padding:52px var(--pad) 0}
.ss-cover-wrap{max-width:1425px;margin:0 auto;overflow:hidden}
.ss-cover-wrap img{width:100%;height:auto;display:block}
/* BODY */
.ss-body{padding:0}
.ss-body-inner{max-width:var(--max);margin:0 auto;padding:72px var(--pad)}
.ss-sec-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:10px}
.ss-sec-label::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.ss-sec-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(26px,4vw,46px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px;max-width:820px}
.ss-sec-body{font-size:12px;line-height:1.95;color:var(--muted);max-width:700px}
.ss-sec-body+.ss-sec-body{margin-top:10px}
/* CARD GRID */
.ss-cardgrid{display:grid;gap:18px;margin-top:36px}
.ss-cols-2{grid-template-columns:1fr 1fr}
.ss-cols-3{grid-template-columns:repeat(3,1fr)}
.ss-cols-4{grid-template-columns:repeat(4,1fr)}
.ss-card{border:1px solid var(--border);background:var(--bg2);padding:24px;transition:border-color .25s}
.ss-card:hover{border-color:var(--pborder)}
.ss-card-num{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--pu);font-weight:700;margin-bottom:10px}
.ss-card h3{font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:.3px;color:var(--paper);margin-bottom:8px}
.ss-card p{font-size:11.5px;line-height:1.8;color:var(--muted)}
/* CHIPS */
.ss-chiprow{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px}
.ss-chip{font-size:10.5px;font-weight:700;color:var(--pu3);background:var(--pbg);border:1px solid var(--pborder);padding:9px 14px}
.ss-chip.muted{color:var(--muted);background:transparent;border-color:var(--border);font-weight:400}
.ss-chip.solid{background:var(--pu);color:var(--bg);border-color:var(--pu)}
/* SUB BLOCK */
.ss-block{margin-top:52px}
.ss-block:first-child{margin-top:0}
.ss-subhead{display:flex;align-items:center;gap:12px;margin-bottom:16px}
.ss-subhead-dot{width:7px;height:7px;border-radius:50%;background:var(--pu);flex-shrink:0}
.ss-subhead-text{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--paper);font-weight:700}
/* LISTS */
.ss-list{list-style:none;margin-top:8px}
.ss-list li{font-size:11.5px;line-height:1.75;color:var(--muted);padding:8px 0 8px 18px;border-top:1px solid var(--border);position:relative}
.ss-list li:first-child{border-top:none;padding-top:0}
.ss-list li::before{content:'•';position:absolute;left:0;color:var(--pu)}
.ss-list.tight li{padding:6px 0 6px 16px}
/* TABLE */
.ss-table{margin-top:20px;border:1px solid var(--border)}
.ss-trow{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--border)}
.ss-trow:first-child{border-top:none}
.ss-trow.head{border-bottom:2px solid var(--pborder)}
.ss-trow.head .ss-tcell{color:var(--pu);font-weight:700;font-size:10px;letter-spacing:.12em;text-transform:uppercase}
.ss-tcell{padding:18px 22px;font-size:11.5px;line-height:1.75;color:var(--muted)}
.ss-tcell:first-child{border-right:1px solid var(--border)}
/* SINGLE / TWO-IMAGE VISUALS */
.ss-shot{margin-top:28px;background:var(--bg2);padding:16px}
.ss-shot img{display:block;width:100%;height:auto;border-radius:8px}
.ss-shot-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:28px}
.ss-shot-grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:28px}
.ss-shot-grid .ss-shot,.ss-shot-grid-3 .ss-shot{margin-top:0}
/* RESPONSIVE SHOWCASE */
.ss-showcase-list{display:flex;flex-direction:column;gap:32px;margin-top:36px}
.ss-showcase-item img{width:100%;height:auto;display:block;background:var(--bg2)}
/* TIMELINE (Gantt + tooltip + mobile stacker) */
.ss-tl-gantt{margin-top:36px;border:1px solid var(--border);background:var(--bg2);padding:32px 28px}
.ss-tl-gweeks{display:grid;grid-template-columns:250px repeat(10,1fr);gap:6px;margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--border)}
.ss-tl-gweeks div{font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);text-align:center}
.ss-tl-gweeks div:first-child{text-align:left;color:var(--pu);font-weight:700;letter-spacing:.14em}
.ss-tl-grow{display:grid;grid-template-columns:250px repeat(10,1fr);gap:6px;align-items:center;margin-bottom:12px}
.ss-tl-grow:last-child{margin-bottom:0}
.ss-tl-grow-label{display:flex;align-items:flex-start;gap:9px}
.ss-tl-grow-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:4px}
.ss-tl-grow-name{font-size:11px;font-weight:700;color:var(--paper);line-height:1.35}
.ss-tl-grow-wk{font-size:9px;color:var(--muted);opacity:.7;margin-top:3px;letter-spacing:.03em}
.ss-tl-gtrack{grid-column:span 10;display:grid;grid-template-columns:repeat(10,1fr);gap:6px;height:38px}
.ss-tl-gseg{position:relative;display:flex;align-items:center;justify-content:center;padding:4px 6px;text-align:center;cursor:default}
.ss-tl-gseg span{font-size:8px;letter-spacing:.03em;font-weight:700;line-height:1.25}
.ss-tl-tip{position:absolute;top:calc(100% + 10px);left:50%;transform:translateX(-50%);width:230px;background:#141317;border:1px solid var(--pborder);padding:14px 16px;opacity:0;visibility:hidden;transition:opacity .16s ease;pointer-events:none;z-index:30;box-shadow:0 16px 36px rgba(0,0,0,.55);text-align:left}
.ss-tl-gseg:hover .ss-tl-tip{opacity:1;visibility:visible}
.ss-tl-tip-title{font-family:'Bebas Neue',sans-serif;font-size:14px;letter-spacing:.3px;color:var(--paper);margin-bottom:5px;line-height:1.2}
.ss-tl-tip-wk{font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--pu2);font-weight:700;margin-bottom:9px}
.ss-tl-tip-desc{font-size:10.5px;line-height:1.65;color:var(--muted)}
.ss-tl-legend{display:flex;gap:20px;margin-top:26px;flex-wrap:wrap;border-top:1px solid var(--border);padding-top:20px}
.ss-tl-legend-item{display:flex;align-items:center;gap:8px;font-size:10px;letter-spacing:.04em;color:var(--muted)}
.ss-tl-legend-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0}
.ss-tl-mobile{display:none;margin-top:36px;border:1px solid var(--border);background:var(--bg2);padding:8px 22px}
.ss-tl-row{display:flex;gap:14px;padding:18px 0;border-top:1px solid var(--border)}
.ss-tl-row:first-child{border-top:none}
.ss-tl-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;margin-top:4px}
.ss-tl-wk{font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--pu2);font-weight:700;margin-bottom:5px}
.ss-tl-name{font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:.3px;color:var(--paper);margin-bottom:6px}
.ss-tl-sub{font-size:11px;line-height:1.7;color:var(--muted)}
/* NEXT PROJECT */
.ss-next{background:var(--bg2)}
.ss-next-inner{max-width:var(--max);margin:0 auto;padding:64px var(--pad);display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:center}
.ss-next-preview{display:block;position:relative;overflow:hidden;aspect-ratio:4/3;border:1px solid var(--border);transition:border-color .2s}
.ss-next-preview:hover{border-color:var(--pborder)}
.ss-next-preview-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px}
.ss-next-preview-cat{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:6px}
.ss-next-preview-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(16px,2.2vw,26px);letter-spacing:-.5px;color:#fff;line-height:1}
.ss-next-tag{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.ss-next-tag::after{content:'';width:36px;height:1px;background:var(--pu)}
.ss-next-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4.5vw,56px);letter-spacing:-1px;color:var(--paper);line-height:.92;margin-bottom:14px}
.ss-next-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:380px;margin-bottom:28px}
.ss-next-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.ss-btn{font-size:10px;letter-spacing:.12em;text-transform:uppercase;background:var(--pu);color:var(--bg);border:2px solid var(--pu);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.ss-btn:hover{background:var(--pu2);border-color:var(--pu2)}
.ss-ghost-btn{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.ss-ghost-btn:hover{border-color:var(--pu);color:var(--pu)}
/* FOOTER */
.ss-foot{border-top:1px solid var(--border)}
.ss-foot-inner{max-width:var(--max);margin:0 auto;padding:44px var(--pad);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.ss-flogo{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.ss-flogo span{color:var(--pu)}
.ss-fcopy{font-size:9px;color:var(--muted)}
.ss-flinks{display:flex;gap:18px;flex-wrap:wrap;align-items:center}
.ss-flinks a{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.ss-flinks a:hover{color:var(--pu)}
.ss-fall{color:var(--pu)!important}
/* REVEAL */
.ss-rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.ss-rv.in{opacity:1;transform:translateY(0)}
/* ===== RESPONSIVE ===== */
@media(max-width:1100px){
  .ss-cols-2{grid-template-columns:1fr}
  .ss-cols-3{grid-template-columns:1fr}
  .ss-cols-4{grid-template-columns:1fr 1fr}
  .ss-shot-grid{grid-template-columns:1fr}
  .ss-shot-grid-3{grid-template-columns:1fr}
  .ss-next-inner{grid-template-columns:1fr;gap:32px}
}
@media(max-width:1023px){
  :root{--pad:32px}
  .ss-nav-inner{padding:14px 28px}
  .ss-tl-gweeks,.ss-tl-grow{grid-template-columns:170px repeat(10,1fr)}
  .ss-tl-tip{width:190px;padding:12px 14px}
}
@media(max-width:768px){
  :root{--pad:24px}
  .ss-hero-inner{padding:110px var(--pad) 44px}
  .ss-body-inner{padding:52px var(--pad)}
  .ss-cover{padding:36px var(--pad) 0}
  .ss-meta-row{gap:24px}
  .ss-cardgrid{gap:14px}
  .ss-cols-4{grid-template-columns:1fr 1fr}
  .ss-tl-gantt{display:none}
  .ss-tl-mobile{display:block}
  .ss-next-inner{padding:44px var(--pad)}
  .ss-foot-inner{flex-direction:column;align-items:flex-start;gap:20px;padding:32px var(--pad)}
  .ss-flinks{flex-direction:column;gap:10px;align-items:flex-start}
}
@media(max-width:480px){
  :root{--pad:16px}
  .ss-abar{padding:9px 16px}
  .ss-abar span{font-size:7px}
  .ss-cols-4{grid-template-columns:1fr}
  .ss-meta-row{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
}
@media(hover:none),(pointer:coarse){
  .ss-hamburger{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center}
  .ss-nav-r{display:none}
  .ss-btn,.ss-ghost-btn{min-height:44px;display:inline-flex;align-items:center;justify-content:center}
}
@media(min-width:1024px){
  .ss-hamburger{display:none}
  .ss-nav-r{display:flex}
}
@media(prefers-reduced-motion:reduce){
  .ss-rv{transition:none;opacity:1;transform:none}
  .ss-drawer{transition:none}
  .ss-ndot,.ss-adot{animation:none}
}
`

const HERO_META = [
    { l: "Project", v: "StarSeekr" },
    { l: "Service", v: "UI/UX Design" },
    { l: "Industry", v: "Recruitment Service Website" },
    { l: "Platform", v: "Responsive Website / Landing Page" },
    { l: "Role", v: "UI/UX Designer" },
]

const OFFERING_POINTS = [
    "Recruitment support",
    "Candidate sourcing",
    "Screening",
    "Interview coordination",
    "Job description support",
    "Candidate endorsement",
    "Contract, job offer, and onboarding support",
    "Add-on HR services such as people management, compensation and benefits, tailored support, and payroll",
]

const DISCOVERY_POINTS = [
    "StarSeekr focuses on recruitment support",
    "The goal was to help companies find qualified candidates",
    "The business wanted stronger testimonials and successful hire stories",
    "The website needed to support lead generation and business growth",
    "Ideal clients included remote companies, tech companies, small companies, and startups",
]

const BRAND_SUPPORT_POINTS = [
    "Brand name activity",
    "Brand moodboarding",
    "Visual direction exploration",
    "Color and visual tone exploration",
    "Aligning the UI direction with the selected brand feel",
]

const AUDIENCE_SEGMENTS = ["Remote companies", "Tech companies", "Small companies", "Startups", "Companies in Asia & the Middle East"]

const WEBSITE_GOALS = [
    "Explain StarSeekr's recruitment service clearly",
    "Build trust through proof, testimonials, and client logos",
    "Show the recruitment process in a simple way",
    "Present pricing and guarantee clearly",
    "Encourage visitors to start with StarSeekr",
    "Collect leads through forms, consultation booking, and downloadable guides",
]

const CONVERSION_CTAS = ["Start with us", "Connect with us", "Download guides", "Schedule a consultation", "Submit contact information"]

const PAGES_CREATED = ["Homepage", "About Us Page", "Testimonials Page", "Resources Page", "Blog Page"]

const HOMEPAGE_SECTIONS = ["Header / Navigation", "Hero Section", "What We Offer", "Recruitment Process", "Businesses We’ve Helped", "Testimonials", "Pricing", "Resources / Download Guides", "Ready to Work Together CTA", "Footer"]

const SITE_BEHAVIOR = [
    "CTA buttons lead to consultation or booking actions",
    "Booking flow collects name, email, contact number, and company name",
    "Resources section collects email / contact details for guide downloads",
    "The About Us page supports trust and includes CTA paths",
    "The Testimonials page supports proof and credibility",
    "The Resources page supports lead capture and helpful content",
]

const UI_DIRECTIONS = [
    { name: "Soft", desc: "Soft moodboard shows less visual clutter and is more focused on text and layout. It explores color with minimal use of a festive palette." },
    { name: "Mild", desc: "Mild moodboard shows a balance of text, visuals, and layout. It feels loud but not overboard, muted but not undertone, giving a sense of fun and integrity at the same time." },
    { name: "Strong", desc: "Strong moodboard shows a more expressive side where brand colors and text can be more experimental. It supports fun layouts, stronger visual impact, and catchy interactions." },
]

const HANDOFF_INCLUDES = [
    "Redlining",
    "Responsive references",
    "Navigation behavior",
    "CTA behavior",
    "Booking flow notes",
    "Download guide form behavior",
    "Layout spacing and implementation notes",
]

const OUTCOME_POINTS = [
    "Organized the recruitment service into a clearer website structure",
    "Connected early brand direction support with the final UI design",
    "Planned conversion paths for consultation booking and guide downloads",
    "Designed the homepage and supporting pages for a consistent website experience",
    "Created a responsive UI direction for the recruitment service website",
    "Prepared documentation and handoff materials for development",
]

const TIMELINE_GROUPS = [
    { name: "Discovery and Direction", color: "#9B59D0", text: "#F8F6FC" },
    { name: "UX Strategy", color: "#7C6FE0", text: "#F8F6FC" },
    { name: "UI Design and Handoff", color: "#E0A83E", text: "#1A1408" },
]

const TIMELINE_PHASES = [
    { label: "Discovery and Brand Direction Support", day: "Day 1–3", s: 1, e: 4, group: 0, desc: "Started with the pre-discovery session, business understanding, brand name activity, brand direction support, and moodboarding to understand StarSeekr's recruitment positioning and visual direction." },
    { label: "Website Strategy and Sitemap", day: "Day 3–4", s: 3, e: 5, group: 1, desc: "Defined the website goals, conversion actions, page structure, sitemap, user paths, booking flow, resource download flow, and key website behavior." },
    { label: "Wireframe and Content Structure", day: "Day 5", s: 5, e: 6, group: 1, desc: "Planned the content hierarchy and structure for the homepage and supporting pages before moving into high-fidelity UI design." },
    { label: "UI Mock-up and Responsive Design", day: "Day 6–8", s: 6, e: 9, group: 2, desc: "Designed the high-fidelity UI for the homepage and supporting pages, including responsive layout direction for desktop, tablet, and mobile." },
    { label: "Review, Refinement, and Developer Handoff", day: "Day 8–10", s: 8, e: 11, group: 2, desc: "Reviewed the UI, applied final refinements, prepared redlining, responsive references, interaction notes, and handoff documentation for development." },
]

export default function StarSeekrUIUXPage() {
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
        const els = Array.from(ref.current?.querySelectorAll(".ss-rv") || [])
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
        <div className="ss" ref={ref}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" />
            <style>{CSS}</style>

            <div className={`ss-abar${navScroll ? " show" : ""}`}>
                <div className="ss-adot" />
                <span>Available for new projects</span>
            </div>

            <nav className="ss-nav" style={{ top: navScroll ? "38px" : "0" }}>
                <div className="ss-nav-inner">
                    <a className="ss-logo" href="/">JADEY<span>.</span></a>
                    <div className="ss-nav-r">
                        <div className="ss-ndot" />
                        <a href="/all-work">All Projects</a>
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a className="ss-nav-contact" href="/#contact">Contact Me</a>
                    </div>
                    <button ref={hamburgerRef} className="ss-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            <div ref={drawerRef} className={`ss-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-label="Navigation menu">
                <button className="ss-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <a href="/all-work" onClick={() => setMenuOpen(false)}>All Projects</a>
                <a href="/#about" onClick={() => setMenuOpen(false)}>About Me</a>
                <a href="/#work" onClick={() => setMenuOpen(false)}>Work Highlights</a>
                <a href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <a href="/#insights" onClick={() => setMenuOpen(false)}>Blog</a>
                <a href="/#workshops" onClick={() => setMenuOpen(false)}>Workshops</a>
                <a className="ss-drawer-cta" href="/#contact" onClick={() => setMenuOpen(false)}>Contact Me</a>
            </div>

            {/* HERO */}
            <div className="ss-hero">
                <div className="ss-hero-inner">
                    <div className="ss-hero-ghost">STARSEEKR</div>
                    <div className="ss-cat ss-rv">UI/UX Design Case Study</div>
                    <h1 className="ss-title ss-rv">StarSeekr</h1>
                    <p className="ss-htag ss-rv">A recruitment service website designed to help companies understand StarSeekr&rsquo;s hiring support, recruitment process, pricing, resources, and consultation flow.</p>
                    <p className="ss-hdesc ss-rv">StarSeekr is a recruitment service that helps companies find pre-vetted candidates that fit their hiring process, saving time, effort, and resources. Unlike a typical UI/UX-only engagement, I was also involved in supporting the brand direction stage for StarSeekr — joining the discovery, contributing brand name suggestions, moodboarding, and visual direction exploration that later guided the website design.</p>
                    <p className="ss-hdesc ss-rv">This case study focuses on the UI/UX side of that process: how the brand direction, moodboarding, and website design were aligned so the final landing page and supporting pages felt consistent.</p>
                    <div className="ss-meta-row ss-rv">
                        {HERO_META.map(m => (
                            <div key={m.l}><div className="ss-meta-l">{m.l}</div><div className="ss-meta-v">{m.v}</div></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* COVER */}
            <div className="ss-cover ss-rv">
                <div className="ss-cover-wrap">
                    <img src="/Starseekr%20Landing%20Page%20Banner%20Showcase%20-%20Main%20New.png" alt="StarSeekr — recruitment service website cover" />
                </div>
            </div>

            <div className="ss-body">
                <div className="ss-body-inner">

                    {/* 1. ABOUT THE PRODUCT */}
                    <div className="ss-rv" style={{ marginBottom: 76 }}>
                        <div className="ss-sec-label">About the Product</div>
                        <h2 className="ss-sec-title">A recruitment service built to help companies find the right candidates faster.</h2>
                        <p className="ss-sec-body">StarSeekr helps companies find pre-vetted candidates through recruitment support, sourcing, screening, interview coordination, candidate endorsement, and onboarding support. The website needed to communicate this value clearly while making the service feel reliable, approachable, and easy to understand.</p>
                        <div className="ss-chiprow">
                            {OFFERING_POINTS.map(o => <div className="ss-chip" key={o}>{o}</div>)}
                        </div>
                    </div>

                    {/* 2. DISCOVERY AND BUSINESS UNDERSTANDING */}
                    <div className="ss-rv" style={{ marginBottom: 76 }}>
                        <div className="ss-sec-label">Discovery and Business Understanding</div>
                        <h2 className="ss-sec-title">Understanding the business goals before designing the website.</h2>
                        <p className="ss-sec-body">The project started with a pre-discovery session to understand StarSeekr&rsquo;s business model, recruitment offer, target clients, and goals. This helped define what the website needed to communicate and what actions visitors should take.</p>
                        <ul className="ss-list" style={{ marginTop: 20, maxWidth: 700 }}>
                            {DISCOVERY_POINTS.map(d => <li key={d}>{d}</li>)}
                        </ul>
                    </div>

                    {/* 3. BRAND DIRECTION SUPPORT */}
                    <div className="ss-rv" style={{ marginBottom: 76 }}>
                        <div className="ss-sec-label">Brand Direction Support</div>
                        <h2 className="ss-sec-title">Supporting the brand direction before moving into UI design.</h2>
                        <p className="ss-sec-body">Since the brand direction was still being shaped, I was also involved in the early brand support process. This included reviewing brand name options, moodboarding, visual style directions, and helping connect the selected brand direction to the website experience.</p>
                        <div className="ss-chiprow">
                            {BRAND_SUPPORT_POINTS.map(b => <div className="ss-chip muted" key={b}>{b}</div>)}
                        </div>
                    </div>

                    {/* 4. TARGET USERS AND WEBSITE GOALS */}
                    <div className="ss-rv" style={{ marginBottom: 76 }}>
                        <div className="ss-sec-label">Target Users and Website Goals</div>
                        <h2 className="ss-sec-title">Designing for companies that need hiring support.</h2>
                        <p className="ss-sec-body">The target users were defined early so the website could speak to the right decision-makers and prioritize the right content. From there, clear website goals were set to guide the structure and content of the homepage and supporting pages.</p>

                        <div className="ss-block" style={{ marginTop: 28 }}>
                            <div className="ss-subhead"><span className="ss-subhead-dot" /><span className="ss-subhead-text">Target Users</span></div>
                            <div className="ss-chiprow" style={{ marginTop: 0 }}>
                                {AUDIENCE_SEGMENTS.map(a => <div className="ss-chip solid" key={a}>{a}</div>)}
                            </div>
                        </div>
                        <div className="ss-block" style={{ marginTop: 24 }}>
                            <div className="ss-subhead"><span className="ss-subhead-dot" /><span className="ss-subhead-text">Website Goals</span></div>
                            <ul className="ss-list" style={{ marginTop: 0, maxWidth: 700 }}>
                                {WEBSITE_GOALS.map(w => <li key={w}>{w}</li>)}
                            </ul>
                        </div>
                    </div>

                    {/* 5. PROJECT TIMELINE */}
                    <div className="ss-rv" style={{ marginBottom: 76 }}>
                        <div className="ss-sec-label">Project Timeline</div>
                        <h2 className="ss-sec-title">A 2-week process from discovery to developer handoff.</h2>
                        <p className="ss-sec-body">The StarSeekr project was completed through a focused 2-week process. The early days covered the pre-discovery session, brand name activity, and brand moodboarding, since I was also supporting the brand direction stage. The following days moved into conversion planning, sitemap, structure planning, UI mock-up design, responsive design review, and developer handoff.</p>

                        <div className="ss-tl-gantt">
                            <div className="ss-tl-gweeks">
                                <div>Phase</div>
                                {Array.from({ length: 10 }, (_, i) => <div key={i}>Day {i + 1}</div>)}
                            </div>
                            {TIMELINE_PHASES.map(p => {
                                const g = TIMELINE_GROUPS[p.group]
                                return (
                                    <div className="ss-tl-grow" key={p.label}>
                                        <div className="ss-tl-grow-label">
                                            <div className="ss-tl-grow-dot" style={{ background: g.color }} />
                                            <div>
                                                <div className="ss-tl-grow-name">{p.label}</div>
                                                <div className="ss-tl-grow-wk">{p.day}</div>
                                            </div>
                                        </div>
                                        <div className="ss-tl-gtrack">
                                            <div className="ss-tl-gseg" style={{ gridColumn: `${p.s} / ${p.e}`, background: g.color, color: g.text }}>
                                                <span>{p.day}</span>
                                                <div className="ss-tl-tip">
                                                    <div className="ss-tl-tip-title">{p.label}</div>
                                                    <div className="ss-tl-tip-wk">{p.day} · {g.name}</div>
                                                    <div className="ss-tl-tip-desc">{p.desc}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="ss-tl-legend">
                                {TIMELINE_GROUPS.map(g => (
                                    <div className="ss-tl-legend-item" key={g.name}><div className="ss-tl-legend-dot" style={{ background: g.color }} />{g.name}</div>
                                ))}
                            </div>
                        </div>

                        <div className="ss-tl-mobile">
                            {TIMELINE_PHASES.map(p => {
                                const g = TIMELINE_GROUPS[p.group]
                                return (
                                    <div className="ss-tl-row" key={p.label}>
                                        <div className="ss-tl-dot" style={{ background: g.color }} />
                                        <div>
                                            <div className="ss-tl-wk">{p.day} · {g.name}</div>
                                            <div className="ss-tl-name">{p.label}</div>
                                            <div className="ss-tl-sub">{p.desc}</div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="ss-tl-legend" style={{ marginTop: 4 }}>
                                {TIMELINE_GROUPS.map(g => (
                                    <div className="ss-tl-legend-item" key={g.name}><div className="ss-tl-legend-dot" style={{ background: g.color }} />{g.name}</div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 6. CONVERSION PLANNING */}
                    <div className="ss-rv" style={{ marginBottom: 76 }}>
                        <div className="ss-sec-label">Conversion Planning</div>
                        <h2 className="ss-sec-title">Turning the landing page into a lead-generation flow.</h2>
                        <p className="ss-sec-body">The landing page was planned around lead generation. The goal was to guide visitors from understanding the service to taking action, such as starting with StarSeekr, booking a consultation, or downloading a guide.</p>
                        <div className="ss-block" style={{ marginTop: 28 }}>
                            <div className="ss-subhead"><span className="ss-subhead-dot" /><span className="ss-subhead-text">Key Actions</span></div>
                            <div className="ss-chiprow" style={{ marginTop: 0 }}>
                                {CONVERSION_CTAS.map(c => <div className="ss-chip" key={c}>{c}</div>)}
                            </div>
                        </div>
                    </div>

                    {/* 7. SITEMAP AND SITE BEHAVIOR */}
                    <div className="ss-rv" style={{ marginBottom: 76 }}>
                        <div className="ss-sec-label">Sitemap and Site Behavior</div>
                        <h2 className="ss-sec-title">Mapping the website around service clarity and conversion paths.</h2>
                        <p className="ss-sec-body">The sitemap helped organize how visitors move through the homepage and supporting pages. The structure focused on explaining the service, showing proof, presenting the recruitment process, collecting leads, and guiding users toward consultation booking.</p>

                        <div className="ss-shot">
                            <img src="/Starseekr%20Sitemap.png" alt="StarSeekr — sitemap and site behavior structure" />
                        </div>

                        <div className="ss-block" style={{ marginTop: 28 }}>
                            <div className="ss-subhead"><span className="ss-subhead-dot" /><span className="ss-subhead-text">Pages Created</span></div>
                            <div className="ss-chiprow" style={{ marginTop: 0 }}>
                                {PAGES_CREATED.map(p => <div className="ss-chip solid" key={p}>{p}</div>)}
                            </div>
                        </div>
                        <div className="ss-block" style={{ marginTop: 24 }}>
                            <div className="ss-subhead"><span className="ss-subhead-dot" /><span className="ss-subhead-text">Homepage Sections</span></div>
                            <div className="ss-chiprow" style={{ marginTop: 0 }}>
                                {HOMEPAGE_SECTIONS.map(h => <div className="ss-chip" key={h}>{h}</div>)}
                            </div>
                        </div>
                        <div className="ss-block" style={{ marginTop: 24 }}>
                            <div className="ss-subhead"><span className="ss-subhead-dot" /><span className="ss-subhead-text">Site Behavior</span></div>
                            <ul className="ss-list" style={{ marginTop: 0, maxWidth: 700 }}>
                                {SITE_BEHAVIOR.map(b => <li key={b}>{b}</li>)}
                            </ul>
                        </div>
                    </div>

                    {/* 8. BRAND DESIGN EXPLORATION */}
                    <div className="ss-rv" style={{ marginBottom: 76 }}>
                        <div className="ss-sec-label">Brand Design Exploration</div>
                        <h2 className="ss-sec-title">Exploring the brand direction before shaping the website experience.</h2>
                        <p className="ss-sec-body">Before moving into the website UI design, I was involved in the early brand direction exploration for StarSeekr. This included reviewing brand name options, exploring visual tone, checking possible brand archetypes, and helping identify a direction that would fit a recruitment service focused on trust, expertise, and successful hiring support.</p>
                        <p className="ss-sec-body">This stage helped clarify how StarSeekr should feel as a brand before applying that direction into the website experience.</p>

                        <div className="ss-shot-grid">
                            <div className="ss-shot">
                                <img src="/StarSeekr%20Brand%20Design%20Exploration%201.png" alt="StarSeekr — brand design exploration reference 1" />
                            </div>
                            <div className="ss-shot">
                                <img src="/StarSeekr%20Brand%20Design%20Exploration%202.png" alt="StarSeekr — brand design exploration reference 2" />
                            </div>
                        </div>
                    </div>

                    {/* 9. BRAND SYSTEM */}
                    <div className="ss-rv" style={{ marginBottom: 76 }}>
                        <div className="ss-sec-label">Brand System</div>
                        <h2 className="ss-sec-title">Showcasing the final brand colors, typography, and illustration style used for StarSeekr.</h2>
                        <p className="ss-sec-body">After the exploration and decision-making process, the final brand direction was defined through a clear visual system. This included the selected color pairings, primary typeface, and illustration style that were consistently applied across the landing page and supporting pages. These final brand elements helped create a visual identity that feels modern, approachable, and memorable while supporting StarSeekr&rsquo;s recruitment-focused positioning.</p>

                        <div className="ss-block" style={{ marginTop: 36 }}>
                            <div className="ss-subhead"><span className="ss-subhead-dot" /><span className="ss-subhead-text">Final Brand Colors</span></div>
                            <p className="ss-sec-body">The final color system combined Rich Magenta, True White, and Fuchsia to create a bold yet clean visual direction. These colors helped the brand feel confident, modern, and noticeable while still staying easy to use across landing page sections and supporting materials.</p>
                            <div className="ss-shot">
                                <img src="/Starseekr%20-%20Primary-color-pairings.png" alt="StarSeekr — final brand color pairings" />
                            </div>
                        </div>

                        <div className="ss-block">
                            <div className="ss-subhead"><span className="ss-subhead-dot" /><span className="ss-subhead-text">Final Brand Typography</span></div>
                            <p className="ss-sec-body">Barlow was chosen as the primary typeface for the brand. Its clean structure and strong readability made it effective for headings, body text, and digital layouts, helping maintain consistency across the website experience.</p>
                            <div className="ss-shot">
                                <img src="/Starseekr%20-%20%20Primary%20typeface.png" alt="StarSeekr — final brand typeface" />
                            </div>
                        </div>

                        <div className="ss-block">
                            <div className="ss-subhead"><span className="ss-subhead-dot" /><span className="ss-subhead-text">Final Illustration Style</span></div>
                            <p className="ss-sec-body">The final illustration direction used geometric shapes as a defining visual element. This approach gave the brand a flexible and recognizable design language that could be applied across web sections, supporting assets, and marketing visuals.</p>
                            <div className="ss-shot">
                                <img src="/Starseekr%20-%20%20illustrations.png" alt="StarSeekr — final illustration style" />
                            </div>
                        </div>
                    </div>

                    {/* 10. UI/UX DESIGN MOODBOARDING */}
                    <div className="ss-rv" style={{ marginBottom: 76 }}>
                        <div className="ss-sec-label">UI/UX Design Moodboarding</div>
                        <h2 className="ss-sec-title">Exploring layout directions for the landing page and supporting pages.</h2>
                        <p className="ss-sec-body">After the brand direction was clearer, I explored UI/UX moodboards and layout directions for the website. This stage focused on how the brand direction could be translated into page structure, content hierarchy, CTA placement, service cards, testimonial sections, pricing blocks, resource forms, and responsive website layouts.</p>
                        <p className="ss-sec-body">The UI/UX moodboarding stage explored three possible directions for the StarSeekr landing page: Soft, Mild, and Strong. Each direction tested a different balance of typography, layout, visuals, color usage, and interaction style. After review, the client chose the Strong direction because it felt more expressive, memorable, and aligned with the bold recruitment brand direction.</p>

                        <div className="ss-shot-grid-3">
                            <div className="ss-shot">
                                <img src="/Starseekr%20Moodboard%201.png" alt="StarSeekr — Soft UI moodboard direction" />
                            </div>
                            <div className="ss-shot">
                                <img src="/Starseekr%20Moodboard%202.png" alt="StarSeekr — Mild UI moodboard direction" />
                            </div>
                            <div className="ss-shot">
                                <img src="/Starseekr%20Moodboard%203.png" alt="StarSeekr — Strong UI moodboard direction" />
                            </div>
                        </div>

                        <div className="ss-cardgrid ss-cols-3">
                            {UI_DIRECTIONS.map(d => (
                                <div className="ss-card" key={d.name}>
                                    <div className="ss-card-num">{d.name} Direction</div>
                                    <p>{d.desc}</p>
                                </div>
                            ))}
                        </div>

                        <p className="ss-sec-body" style={{ marginTop: 28 }}>The client chose the Strong direction for the final UI design direction.</p>
                    </div>

                    {/* 11. WIREFRAME AND CONTENT STRUCTURE */}
                    <div className="ss-rv" style={{ marginBottom: 76 }}>
                        <div className="ss-sec-label">Wireframe and Content Structure</div>
                        <h2 className="ss-sec-title">Planning the content hierarchy before high-fidelity design.</h2>
                        <p className="ss-sec-body">The wireframe and structure planning stage helped organize the website content before visual design. This made sure the homepage and supporting pages had a clear flow for explaining the service, process, pricing, testimonials, resources, and consultation actions.</p>

                        <div className="ss-shot">
                            <img src="/Starseekr%20Wireframe.png" alt="StarSeekr — wireframe and content structure" />
                        </div>
                    </div>

                    {/* 12. UI MOCK-UP AND RESPONSIVE DESIGN */}
                    <div className="ss-rv" style={{ marginBottom: 76 }}>
                        <div className="ss-sec-label">UI Mock-up and Responsive Design</div>
                        <h2 className="ss-sec-title">Designing the final recruitment website experience.</h2>
                        <p className="ss-sec-body">The final UI translated the brand direction and recruitment positioning into a responsive website experience. The pages were designed to clearly explain what StarSeekr offers, how the recruitment process works, why visitors can trust the service, and what action they should take next.</p>

                        <div className="ss-showcase-list">
                            <div className="ss-showcase-item">
                                <img src="/Starseekr%20Landing%20Page%20Banner%20Showcase%20-%20Main%20New.png" alt="StarSeekr homepage — web, hero section" />
                            </div>
                            <div className="ss-showcase-item">
                                <img src="/Starseekr%20Landing%20Page%20Banner%20Showcase%20-%202nd.png" alt="StarSeekr homepage — web, what we offer and recruitment process" />
                            </div>
                            <div className="ss-showcase-item">
                                <img src="/Starseekr%20Landing%20Page%20Banner%20Showcase%20-%203rd.png" alt="StarSeekr homepage — web, testimonials and pricing" />
                            </div>
                            <div className="ss-showcase-item">
                                <img src="/Starseekr%20Landing%20Page%20Banner%20Showcase%20-%204th.png" alt="StarSeekr homepage — web, resources and CTA section" />
                            </div>
                        </div>
                    </div>

                    {/* 13. REVIEW, REFINEMENT, AND DEVELOPER HANDOFF */}
                    <div className="ss-rv" style={{ marginBottom: 76 }}>
                        <div className="ss-sec-label">Review, Refinement, and Developer Handoff</div>
                        <h2 className="ss-sec-title">Preparing the design for clearer implementation.</h2>
                        <p className="ss-sec-body">After the UI design was reviewed, final refinements were made to improve clarity, spacing, responsive behavior, and interaction details. Handoff documentation and redlining were prepared so the developer could understand layout spacing, responsive rules, CTA behavior, forms, navigation, and page structure.</p>

                        <div className="ss-shot-grid-3">
                            <div className="ss-shot">
                                <img src="/Starseekr%20redlining%201.png" alt="StarSeekr — redlining and handoff reference 1" />
                            </div>
                            <div className="ss-shot">
                                <img src="/Starseekr%20redlining%202.png" alt="StarSeekr — redlining and handoff reference 2" />
                            </div>
                            <div className="ss-shot">
                                <img src="/Starseekr%20redlining%203.png" alt="StarSeekr — redlining and handoff reference 3" />
                            </div>
                        </div>

                        <div className="ss-cardgrid" style={{ marginTop: 32 }}>
                            <div className="ss-card">
                                <div className="ss-card-num">Handoff Includes</div>
                                <ul className="ss-list tight" style={{ marginTop: 4 }}>
                                    {HANDOFF_INCLUDES.map(h => <li key={h}>{h}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* 14. OUTCOME */}
                    <div className="ss-rv">
                        <div className="ss-sec-label">Outcome</div>
                        <h2 className="ss-sec-title">A clearer website foundation for StarSeekr&rsquo;s recruitment service.</h2>
                        <p className="ss-sec-body">The final StarSeekr website direction connected the brand discovery work with a structured UI/UX experience. The website gave StarSeekr a clearer way to explain its recruitment service, build trust with potential clients, present its process and pricing, and guide visitors toward consultation or resource download actions.</p>
                        <div className="ss-cardgrid ss-cols-2" style={{ marginTop: 28 }}>
                            {OUTCOME_POINTS.map((o, i) => (
                                <div className="ss-card" key={o}>
                                    <div className="ss-card-num">{String(i + 1).padStart(2, "0")}</div>
                                    <p>{o}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* NEXT PROJECT */}
            <div className="ss-next">
                <div className="ss-next-inner ss-rv">
                    <a className="ss-next-preview" href="/all-work/barangay-buddy" aria-label="View Barangay Buddy project">
                        <img
                            src="/Barangay%20Buddy%20Banner%20Showcase%20-%20Main.png"
                            alt="Barangay Buddy"
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.05)" }}
                        />
                        <div className="ss-next-preview-overlay">
                            <div className="ss-next-preview-cat">UI/UX Design</div>
                            <div className="ss-next-preview-name">Barangay Buddy</div>
                        </div>
                    </a>
                    <div>
                        <div className="ss-next-tag">Next Project</div>
                        <div className="ss-next-title">Barangay Buddy</div>
                        <p className="ss-next-desc">GovTech community platform — resident Android app and web admin portal for barangay updates, requests, and services.</p>
                        <div className="ss-next-actions">
                            <a className="ss-btn" href="/all-work/barangay-buddy">View Project →</a>
                            <a className="ss-ghost-btn" href="/all-work">All Work</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="ss-foot">
                <div className="ss-foot-inner">
                    <a className="ss-flogo" href="/">JADEY<span>.</span></a>
                    <div className="ss-fcopy">© 2025 Jane Dhell Cagas. All rights reserved.</div>
                    <div className="ss-flinks">
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a href="/#contact">Contact</a>
                        <a className="ss-fall" href="/all-work">All Projects →</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
