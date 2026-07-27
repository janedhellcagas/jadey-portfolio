'use client'
import { useState, useEffect, useRef, Fragment } from "react"

const CSS = `
:root{--bg:#0a0a08;--bg2:#111110;--paper:#f0ebe0;--pu:#9B59D0;--pu2:#B07AE0;--pu3:#7A3AB8;--muted:rgba(240,235,224,0.38);--border:rgba(240,235,224,0.12);--pborder:rgba(155,89,208,0.3);--pbg:rgba(155,89,208,0.08);--max:1440px;--pad:44px}
.av*{box-sizing:border-box;margin:0;padding:0}
.av{font-family:'Space Mono',monospace;background:var(--bg);color:var(--paper);min-height:100vh;overflow-x:hidden;width:100%}
/* NAV */
.av-nav{position:fixed;top:0;left:0;right:0;z-index:500;background:rgba(10,10,8,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:top .3s}
.av-nav-inner{max-width:var(--max);margin:0 auto;padding:18px var(--pad);display:flex;align-items:center;justify-content:space-between}
.av-logo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.av-logo span{color:var(--pu)}
.av-nav-r{display:none;align-items:center;gap:14px}
.av-nav-r a{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.av-nav-r a:hover{color:var(--pu)}
.av-nav-contact{background:var(--pu)!important;color:var(--bg)!important;padding:9px 20px!important;font-weight:700!important;border:2px solid var(--pu)!important;display:inline-block!important}
.av-nav-contact:hover{background:var(--pu2)!important;border-color:var(--pu2)!important}
.av-ndot{width:7px;height:7px;background:var(--pu);border-radius:50%;animation:av-pulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes av-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.85)}}
.av-abar{position:fixed;top:0;left:0;right:0;z-index:499;background:var(--pu3);padding:9px var(--pad);height:38px;display:none;align-items:center;justify-content:center;gap:8px}
.av-abar.show{display:flex}
.av-abar span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:white;font-weight:700}
.av-adot{width:5px;height:5px;background:white;border-radius:50%;animation:av-pulse 2s ease-in-out infinite}
.av-hamburger{display:flex;flex-direction:column;gap:5px;cursor:pointer;background:transparent;border:none;padding:6px}
.av-hamburger span{display:block;width:24px;height:2px;background:var(--paper);transition:all .3s}
.av-drawer{position:fixed;inset:0;z-index:600;background:var(--bg);transform:translateX(100%);transition:transform .35s ease;display:flex;flex-direction:column;padding:88px 28px 40px;overflow-y:auto}
.av-drawer.open{transform:translateX(0)}
.av-drawer-close{position:absolute;top:22px;right:24px;background:transparent;border:none;color:var(--paper);font-size:22px;cursor:pointer;line-height:1}
.av-drawer a{font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;padding:18px 0;border-bottom:1px solid var(--border);transition:color .2s;display:block}
.av-drawer a:hover,.av-drawer a:active{color:var(--pu)}
.av-drawer-cta{background:var(--pu);color:var(--bg)!important;padding:14px 0!important;font-weight:700;border-bottom:none!important;text-align:center;margin-top:20px;display:block;text-decoration:none;transition:background .2s}
.av-drawer-cta:hover{background:var(--pu2)}
/* HERO */
.av-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#160b22,#241033 55%,#170a20)}
.av-hero-inner{max-width:var(--max);margin:0 auto;padding:140px var(--pad) 60px;position:relative}
.av-hero-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,9vw,140px);letter-spacing:-4px;color:rgba(240,235,224,0.035);white-space:nowrap;pointer-events:none;text-align:center;width:100%}
.av-cat{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,0.6);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.av-cat::before{content:'';width:36px;height:1px;background:rgba(255,255,255,0.4)}
.av-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,9vw,120px);letter-spacing:-2px;line-height:.88;color:#fff}
.av-former{font-size:10.5px;letter-spacing:.06em;color:rgba(255,255,255,0.4);margin-top:10px;margin-bottom:20px}
.av-htag{font-size:13px;line-height:1.85;color:rgba(255,255,255,0.72);max-width:600px;margin-bottom:14px;font-weight:700}
.av-hdesc{font-size:12px;line-height:1.9;color:rgba(255,255,255,0.6);max-width:600px;margin-bottom:30px}
.av-meta-row{display:flex;gap:40px;flex-wrap:wrap;padding-top:28px;border-top:1px solid rgba(255,255,255,0.15)}
.av-meta-l{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:4px}
.av-meta-v{font-size:11px;color:#fff;font-weight:700}
/* COVER */
.av-cover{padding:52px var(--pad) 0}
.av-cover-wrap{max-width:1425px;margin:0 auto;overflow:hidden}
.av-cover-wrap img{width:100%;height:auto;display:block}
/* BODY */
.av-body{padding:0}
.av-body-inner{max-width:var(--max);margin:0 auto;padding:72px var(--pad)}
.av-sec-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:10px}
.av-sec-label::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.av-sec-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(26px,4vw,46px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px;max-width:820px}
.av-sec-body{font-size:12px;line-height:1.95;color:var(--muted);max-width:700px}
.av-sec-body+.av-sec-body{margin-top:10px}
/* CARD GRID */
.av-cardgrid{display:grid;gap:18px;margin-top:36px}
.av-cols-2{grid-template-columns:1fr 1fr}
.av-cols-3{grid-template-columns:repeat(3,1fr)}
.av-cols-4{grid-template-columns:repeat(4,1fr)}
.av-cols-5{grid-template-columns:repeat(5,1fr)}
.av-card{border:1px solid var(--border);background:var(--bg2);padding:24px;transition:border-color .25s}
.av-card:hover{border-color:var(--pborder)}
.av-card-num{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--pu);font-weight:700;margin-bottom:10px}
.av-card h3{font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:.3px;color:var(--paper);margin-bottom:8px}
.av-card p{font-size:11.5px;line-height:1.8;color:var(--muted)}
/* CHIPS */
.av-chiprow{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px}
.av-chip{font-size:10.5px;font-weight:700;color:var(--pu3);background:var(--pbg);border:1px solid var(--pborder);padding:9px 14px}
.av-chip.muted{color:var(--muted);background:transparent;border-color:var(--border);font-weight:400}
.av-chip.solid{background:var(--pu);color:var(--bg);border-color:var(--pu)}
/* SUB BLOCK */
.av-block{margin-top:52px}
.av-block:first-child{margin-top:0}
.av-subhead{display:flex;align-items:center;gap:12px;margin-bottom:16px}
.av-subhead-dot{width:7px;height:7px;border-radius:50%;background:var(--pu);flex-shrink:0}
.av-subhead-text{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--paper);font-weight:700}
/* LISTS */
.av-list{list-style:none;margin-top:8px}
.av-list li{font-size:11.5px;line-height:1.75;color:var(--muted);padding:8px 0 8px 18px;border-top:1px solid var(--border);position:relative}
.av-list li:first-child{border-top:none;padding-top:0}
.av-list li::before{content:'•';position:absolute;left:0;color:var(--pu)}
.av-list.tight li{padding:6px 0 6px 16px}
/* TABLES */
.av-table{margin-top:20px;border:1px solid var(--border)}
.av-trow{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--border)}
.av-trow:first-child{border-top:none}
.av-trow.head{border-bottom:2px solid var(--pborder)}
.av-trow.head .av-tcell{color:var(--pu);font-weight:700;font-size:10px;letter-spacing:.12em;text-transform:uppercase}
.av-tcell{padding:18px 22px;font-size:11.5px;line-height:1.75;color:var(--muted)}
.av-tcell:first-child{border-right:1px solid var(--border)}
/* PERSONA */
.av-persona{border:1px solid var(--border);background:var(--bg2);padding:28px}
.av-persona-tag{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--pu);font-weight:700;margin-bottom:14px}
.av-persona h3{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:.3px;color:var(--paper);margin-bottom:4px}
.av-persona-role{font-size:11px;color:var(--muted);margin-bottom:16px}
.av-persona-attrs{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px}
.av-persona-attr{background:var(--bg);border:1px solid var(--border);padding:8px 13px;font-size:10.5px;color:var(--paper);font-weight:700}
.av-persona-quote{font-size:13px;line-height:1.75;color:var(--paper);font-style:italic;border-left:2px solid var(--pu);padding-left:16px}
.av-persona-groups{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:20px}
.av-pgroup{border:1px solid var(--border);background:var(--bg2);padding:20px}
.av-pgroup h4{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--pu);font-weight:700;margin-bottom:12px}
/* SPECTRUM */
.av-spectrum{margin-top:24px;display:flex;flex-direction:column;gap:22px}
.av-spec-row{}
.av-spec-labels{display:flex;justify-content:space-between;font-size:10px;color:var(--muted);margin-bottom:8px}
.av-spec-track{height:4px;background:var(--border);position:relative}
.av-spec-dot{position:absolute;top:50%;width:12px;height:12px;border-radius:50%;background:var(--pu);border:2px solid var(--bg);transform:translate(-50%,-50%)}
/* SITEMAP / SKETCH VISUAL */
.av-sitemap-shot{margin-top:28px;background:var(--bg2);padding:16px;overflow-x:auto}
.av-sitemap-shot img{display:block;width:100%;min-width:900px;height:auto;border-radius:8px}
/* MOODBOARD VISUALS */
.av-mb-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:36px}
.av-mb-shot{background:var(--bg2);padding:16px}
.av-mb-shot img{display:block;width:100%;height:auto;border-radius:8px}
/* REDLINING / DOCUMENTATION SHOWCASE (equal-height, natural width) */
.av-redoc-row{display:grid;grid-template-columns:2fr 1fr;gap:20px;margin-top:28px;width:100%}
.av-redoc-shot{height:480px;background:var(--bg2);padding:16px;overflow:hidden}
.av-redoc-shot img{height:100%;width:100%;display:block;object-fit:contain;border-radius:6px}
/* RESPONSIVE SHOWCASE */
.av-showcase-list{display:flex;flex-direction:column;gap:32px;margin-top:36px}
.av-showcase-item img{width:100%;height:auto;display:block;background:var(--bg2)}
/* TIMELINE (Gantt + tooltip + mobile stacker) */
.av-tl-gantt{margin-top:36px;border:1px solid var(--border);background:var(--bg2);padding:32px 28px}
.av-tl-gweeks{display:grid;grid-template-columns:230px repeat(10,1fr);gap:6px;margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--border)}
.av-tl-gweeks div{font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);text-align:center}
.av-tl-gweeks div:first-child{text-align:left;color:var(--pu);font-weight:700;letter-spacing:.14em}
.av-tl-grow{display:grid;grid-template-columns:230px repeat(10,1fr);gap:6px;align-items:center;margin-bottom:12px}
.av-tl-grow:last-child{margin-bottom:0}
.av-tl-grow-label{display:flex;align-items:flex-start;gap:9px}
.av-tl-grow-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:4px}
.av-tl-grow-name{font-size:11px;font-weight:700;color:var(--paper);line-height:1.35}
.av-tl-grow-wk{font-size:9px;color:var(--muted);opacity:.7;margin-top:3px;letter-spacing:.03em}
.av-tl-gtrack{grid-column:span 10;display:grid;grid-template-columns:repeat(10,1fr);gap:6px;height:38px}
.av-tl-gseg{position:relative;display:flex;align-items:center;justify-content:center;padding:4px 6px;text-align:center;cursor:default}
.av-tl-gseg span{font-size:8px;letter-spacing:.03em;font-weight:700;line-height:1.25}
.av-tl-tip{position:absolute;top:calc(100% + 10px);left:50%;transform:translateX(-50%);width:230px;background:#141317;border:1px solid var(--pborder);padding:14px 16px;opacity:0;visibility:hidden;transition:opacity .16s ease;pointer-events:none;z-index:30;box-shadow:0 16px 36px rgba(0,0,0,.55);text-align:left}
.av-tl-gseg:hover .av-tl-tip{opacity:1;visibility:visible}
.av-tl-tip-title{font-family:'Bebas Neue',sans-serif;font-size:14px;letter-spacing:.3px;color:var(--paper);margin-bottom:5px;line-height:1.2}
.av-tl-tip-wk{font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--pu2);font-weight:700;margin-bottom:9px}
.av-tl-tip-desc{font-size:10.5px;line-height:1.65;color:var(--muted)}
.av-tl-legend{display:flex;gap:20px;margin-top:26px;flex-wrap:wrap;border-top:1px solid var(--border);padding-top:20px}
.av-tl-legend-item{display:flex;align-items:center;gap:8px;font-size:10px;letter-spacing:.04em;color:var(--muted)}
.av-tl-legend-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0}
.av-tl-mobile{display:none;margin-top:36px;border:1px solid var(--border);background:var(--bg2);padding:8px 22px}
.av-tl-row{display:flex;gap:14px;padding:18px 0;border-top:1px solid var(--border)}
.av-tl-row:first-child{border-top:none}
.av-tl-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;margin-top:4px}
.av-tl-wk{font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--pu2);font-weight:700;margin-bottom:5px}
.av-tl-name{font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:.3px;color:var(--paper);margin-bottom:6px}
.av-tl-sub{font-size:11px;line-height:1.7;color:var(--muted)}
/* NEXT PROJECT */
.av-next{background:var(--bg2)}
.av-next-inner{max-width:var(--max);margin:0 auto;padding:64px var(--pad);display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:center}
.av-next-preview{display:block;position:relative;overflow:hidden;aspect-ratio:4/3;border:1px solid var(--border);transition:border-color .2s}
.av-next-preview:hover{border-color:var(--pborder)}
.av-next-preview-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px}
.av-next-preview-cat{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:6px}
.av-next-preview-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(16px,2.2vw,26px);letter-spacing:-.5px;color:#fff;line-height:1}
.av-next-tag{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.av-next-tag::after{content:'';width:36px;height:1px;background:var(--pu)}
.av-next-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4.5vw,56px);letter-spacing:-1px;color:var(--paper);line-height:.92;margin-bottom:14px}
.av-next-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:380px;margin-bottom:28px}
.av-next-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.av-btn{font-size:10px;letter-spacing:.12em;text-transform:uppercase;background:var(--pu);color:var(--bg);border:2px solid var(--pu);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.av-btn:hover{background:var(--pu2);border-color:var(--pu2)}
.av-ghost-btn{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.av-ghost-btn:hover{border-color:var(--pu);color:var(--pu)}
/* FOOTER */
.av-foot{border-top:1px solid var(--border)}
.av-foot-inner{max-width:var(--max);margin:0 auto;padding:44px var(--pad);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.av-flogo{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.av-flogo span{color:var(--pu)}
.av-fcopy{font-size:9px;color:var(--muted)}
.av-flinks{display:flex;gap:18px;flex-wrap:wrap;align-items:center}
.av-flinks a{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.av-flinks a:hover{color:var(--pu)}
.av-fall{color:var(--pu)!important}
/* REVEAL */
.av-rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.av-rv.in{opacity:1;transform:translateY(0)}
/* ===== RESPONSIVE ===== */
@media(max-width:1220px){
  .av-cols-5{grid-template-columns:repeat(3,1fr)}
}
@media(max-width:1100px){
  .av-cols-2{grid-template-columns:1fr}
  .av-cols-3{grid-template-columns:1fr 1fr}
  .av-cols-4{grid-template-columns:1fr 1fr}
  .av-persona-groups{grid-template-columns:1fr 1fr}
  .av-next-inner{grid-template-columns:1fr;gap:32px}
}
@media(max-width:1023px){
  :root{--pad:32px}
  .av-nav-inner{padding:14px 28px}
  .av-tl-gweeks,.av-tl-grow{grid-template-columns:160px repeat(10,1fr)}
  .av-tl-tip{width:190px;padding:12px 14px}
  .av-redoc-row{grid-template-columns:1fr}
  .av-redoc-shot{height:auto}
  .av-redoc-shot img{height:auto}
}
@media(max-width:768px){
  :root{--pad:24px}
  .av-hero-inner{padding:110px var(--pad) 44px}
  .av-body-inner{padding:52px var(--pad)}
  .av-cover{padding:36px var(--pad) 0}
  .av-meta-row{gap:24px}
  .av-cardgrid{gap:14px}
  .av-cols-5{grid-template-columns:1fr 1fr}
  .av-mb-grid{grid-template-columns:1fr}
  .av-persona-groups{grid-template-columns:1fr}
  .av-tl-gantt{display:none}
  .av-tl-mobile{display:block}
  .av-next-inner{padding:44px var(--pad)}
  .av-foot-inner{flex-direction:column;align-items:flex-start;gap:20px;padding:32px var(--pad)}
  .av-flinks{flex-direction:column;gap:10px;align-items:flex-start}
}
@media(max-width:480px){
  :root{--pad:16px}
  .av-abar{padding:9px 16px}
  .av-abar span{font-size:7px}
  .av-cols-5{grid-template-columns:1fr}
  .av-meta-row{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
}
@media(hover:none),(pointer:coarse){
  .av-hamburger{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center}
  .av-nav-r{display:none}
  .av-btn,.av-ghost-btn{min-height:44px;display:inline-flex;align-items:center;justify-content:center}
}
@media(min-width:1024px){
  .av-hamburger{display:none}
  .av-nav-r{display:flex}
}
@media(prefers-reduced-motion:reduce){
  .av-rv{transition:none;opacity:1;transform:none}
  .av-drawer{transition:none}
  .av-ndot,.av-adot{animation:none}
}
`

const HERO_META = [
    { l: "Project", v: "Advante (formerly Valiant)" },
    { l: "Service", v: "UI/UX Design" },
    { l: "Industry", v: "Coaching Service Website" },
    { l: "Platform", v: "Responsive Website / Landing Page" },
    { l: "Role", v: "UI/UX Designer" },
]

const SERVICES_OFFERED = [
    "Organizational Leadership Coaching",
    "Career Coaching",
    "Performance Coaching",
    "Interpersonal Skills Coaching",
    "Mental Health and Wellbeing Coaching",
    "Group Coaching",
]

const KEY_PROBLEMS = [
    "The service offering needed clearer structure.",
    "Visitors needed to quickly understand what kind of coaching Advante provides.",
    "The landing page needed stronger conversion paths for inquiry, booking, sign-up, and subscription interest.",
    "Supporting pages such as pricing, team, blog, blog single page, and 404 page needed to be planned.",
    "The visual direction needed to feel professional, friendly, and supportive without looking too corporate or too generic.",
]

const DESIGN_FOCUS = [
    "Clear, flexible website structure",
    "Strong hero messaging",
    "Service-focused content hierarchy",
    "Trust-building content",
    "Inquiry and booking CTA paths",
    "Responsive web, tablet, and mobile layouts",
    "Program, campaign, and event content structure",
    "Sitemap and page behavior planning",
    "Design QA and developer handoff documentation",
]

const AUDIENCE_DETAILS = [
    { l: "Age", v: "Early 20s to Mid-30s" },
    { l: "Location", v: "Anywhere in the Philippines (initial launch direction)" },
    { l: "Gender", v: "No preference" },
    { l: "Purpose", v: "Coaching, career guidance, leadership support, soft skills, mental health and wellbeing, or group coaching" },
]

const AUDIENCE_NEEDS = [
    "Coaching and specialization services",
    "Leadership and soft skills support",
    "Career coaching",
    "Subscription-based coaching services",
    "A clear and supportive way to understand the service before taking action",
]

const DESIRED_ACTIONS = [
    "Register for a free white paper or lead magnet",
    "Send an inquiry",
    "Schedule a call",
    "Sign up for updates",
    "Explore paid subscription options",
]

const USAGE_GOALS = ["Email list signup", "Upgrade to paid version", "Revenue", "Bounce rate monitoring"]

const CASE_STUDY_USE = [
    "Clear service positioning",
    "Trust-building content",
    "Simple inquiry paths",
    "Coaching-related messaging",
    "Pricing and subscription clarity",
    "Professional but supportive visual direction",
]

const BRAND_ADJECTIVES = ["Clean", "Friendly", "Heartwarming"]

const SPECTRUMS = [
    { left: "Formal / Corporate", right: "Friendly / Approachable", pos: 78 },
    { left: "Complex", right: "Clean / Simple", pos: 82 },
    { left: "Cold / Distant", right: "Warm / Heartwarming", pos: 80 },
]

const PERSONA_GOALS = ["Understand emotions better", "Develop healthy habits", "Increase productivity", "Overcome procrastination", "Feel more in control", "Create better work/life balance", "Achieve career success", "Practice self-care", "Feel emotionally fulfilled", "Develop confidence in her abilities"]
const PERSONA_NEEDS = ["Supportive environment", "Accessible resources", "Clarity on goals", "Actionable steps", "Understanding of emotions", "Education on healthy habits", "Time management tools", "Accountability", "Confidence-building tools", "Emotional support"]
const PERSONA_MOTIVATIONS = ["Feeling fulfilled", "Feeling in control", "Achieving success", "Feeling proud of accomplishments", "Improving productivity", "Developing positive habits", "Having time for self-care", "Attaining work/life balance", "Understanding emotions", "Overcoming procrastination"]
const PERSONA_FRUSTRATIONS = ["Not having enough time", "Feeling overwhelmed", "Not understanding emotions", "Difficulty staying focused", "Not feeling in control", "Struggling to build healthy habits", "Feeling frustrated by lack of progress", "Difficulty managing stress", "Not having enough resources", "Not being able to practice self-care"]
const PERSONA_TASKS = ["Identify goals", "Make a plan", "Set realistic expectations", "Track progress", "Ask for help when needed", "Evaluate emotions", "Take breaks", "Learn new skills", "Practice healthy habits", "Celebrate successes"]

const TIMELINE_GROUPS = [
    { name: "Part One — Discovery and Direction", color: "#9B59D0", text: "#F8F6FC" },
    { name: "Part Two — Structure and Visual Alignment", color: "#7C6FE0", text: "#F8F6FC" },
    { name: "Part Three — Design, Review, and Handoff", color: "#E0A83E", text: "#1A1408" },
]

const TIMELINE_PHASES = [
    { label: "Project Setup and Design Brief", day: "Day 1", s: 1, e: 2, group: 0, desc: "Set up the project direction, clarified the client's goals, reviewed the coaching platform purpose, and summarized the information needed before starting the landing page UI/UX work." },
    { label: "Product, Audience, and Content Direction", day: "Day 1–2", s: 1, e: 3, group: 0, desc: "Reviewed the product information, target audience, service offering, conversion goals, and required landing page content so the website structure could support user understanding and inquiry actions." },
    { label: "Existing Brand and Visual Direction Review", day: "Day 2", s: 2, e: 3, group: 0, desc: "Reviewed the client's existing brand direction, including the provided typography, colors, and preferred visual style. The goal was not to create a new brand, but to apply the existing style correctly in the UI." },
    { label: "Sketch and Sitemap Planning", day: "Day 3", s: 3, e: 4, group: 1, desc: "Mapped the landing page structure, supporting pages, page behavior, user paths, CTA direction, booking flow, blog flow, team page behavior, and modal interactions." },
    { label: "Visual Exploration and Moodboarding", day: "Day 3", s: 3, e: 4, group: 1, desc: "Reviewed visual references, moodboarding, layout direction, and UI style alignment to make sure the landing page followed the client's existing typography, colors, and preferred visual direction." },
    { label: "Low-Fidelity Wireframes", day: "Day 4", s: 4, e: 5, group: 1, desc: "Created wireframes for the required landing page and supporting pages to plan layout, content hierarchy, service sections, pricing structure, team layout, blog layout, and 404 page before high-fidelity design." },
    { label: "Mock-up Design for Final Website Pages, Responsive UI, and Prototyping", day: "Day 5–8", s: 5, e: 9, group: 2, desc: "Designed the final website pages, adjusted responsive layouts, and connected the main experience into a prototype so the client could review the overall website flow." },
    { label: "Client Feedback and Landing Page Audit", day: "Day 7–9", s: 7, e: 10, group: 2, desc: "Reviewed client feedback, refined the UI, checked spacing, responsiveness, navigation states, button states, and overall page clarity before handoff." },
    { label: "Design-Dev Handoff", day: "Day 10", s: 10, e: 11, group: 2, desc: "Prepared the design for implementation with redlining, notes, responsive references, interaction behavior, and a sync-up with the developer to explain the layout, design decisions, and expected behavior clearly." },
]

const FINAL_PAGES = ["Pre-launch Page", "Home Page", "Blog Page", "Single Blog Page", "Team Page", "Pricing Page", "404 Page", "Privacy Policy Page", "Code of Ethics Page", "Coaching Specializations & Programs Page", "Campaign Page", "Event Page", "Resources Page"]
const FINAL_HOMEPAGE_SECTIONS = ["Header / Navigation", "Hero Section", "Trusted Companies / Partner Logos", "Services Overview", "Organizational Leadership", "Mental Health and Wellbeing", "Career Coaching", "Personal Development", "Performance Coaching", "Interpersonal Relationships Coaching", "Free Coaching CTA Section", "Testimonials Section", "Latest Blog Articles", "Main CTA Section", "Our Approach", "Events at Advante", "Frequently Asked Questions", "Footer"]

const MOODBOARDS = [
    { name: "Moodboard 1", src: "/Advante%20-%20Moodboard%201.png" },
    { name: "Moodboard 2", src: "/Advante%20-%20Moodboard%202.png" },
]

const EXPLORATION_DECIDED = [
    "How the existing typography and color direction could support a clean and professional coaching website",
    "What layout style would work best for service sections, testimonials, blog content, pricing, and CTA areas",
    "How imagery and spacing could make the website feel supportive, friendly, and trustworthy",
    "How the UI could feel warm and approachable without losing structure and clarity",
]

const HANDOFF_MATERIALS = [
    "Complete redlining for all designed pages",
    "Web, tablet, and mobile redlining references",
    "Responsive layout measurements",
    "Spacing, alignment, and section structure notes",
    "Navigation and menu behavior documentation",
    "Button hover, active, and clicked-state references",
    "CTA interaction notes",
    "Modal and page behavior references",
    "Responsive design references for implementation",
    "Developer handoff notes and walkthrough materials",
]

const DOCUMENTED_BEHAVIOR = [
    "Responsive behavior for all designed pages across web, tablet, and mobile",
    "Header and navigation states across desktop, tablet, and mobile",
    "Mobile menu open, close, and interaction behavior",
    "CTA hover, active, and clicked states",
    "Button behavior across key pages and sections",
    "Modal behavior and related interaction notes",
    "Page transition and user flow references where needed",
    "Layout spacing and alignment rules across breakpoints",
    "Notes for consistent front-end implementation across all pages",
]

const OUTCOME_POINTS = [
    "Expanded the initial landing page direction into a fuller website page structure",
    "Designed the final page scope based on the client's clarified needs",
    "Organized content for coaching services, programs, events, resources, blog, pricing, team, and policy pages",
    "Applied the client's existing typography, colors, and visual direction consistently across the UI",
    "Prepared responsive page designs and prototype flows for review",
    "Supported development with redlining, notes, responsive references, and handoff documentation",
]

export default function AdvantePage() {
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
        const els = Array.from(ref.current?.querySelectorAll(".av-rv") || [])
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
        <div className="av" ref={ref}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" />
            <style>{CSS}</style>

            <div className={`av-abar${navScroll ? " show" : ""}`}>
                <div className="av-adot" />
                <span>Available for new projects</span>
            </div>

            <nav className="av-nav" style={{ top: navScroll ? "38px" : "0" }}>
                <div className="av-nav-inner">
                    <a className="av-logo" href="/">JADEY<span>.</span></a>
                    <div className="av-nav-r">
                        <div className="av-ndot" />
                        <a href="/all-work">All Projects</a>
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a className="av-nav-contact" href="/#contact">Contact Me</a>
                    </div>
                    <button ref={hamburgerRef} className="av-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            <div ref={drawerRef} className={`av-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-label="Navigation menu">
                <button className="av-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <a href="/all-work" onClick={() => setMenuOpen(false)}>All Projects</a>
                <a href="/#about" onClick={() => setMenuOpen(false)}>About Me</a>
                <a href="/#work" onClick={() => setMenuOpen(false)}>Work Highlights</a>
                <a href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <a href="/#insights" onClick={() => setMenuOpen(false)}>Blog</a>
                <a href="/#workshops" onClick={() => setMenuOpen(false)}>Workshops</a>
                <a className="av-drawer-cta" href="/#contact" onClick={() => setMenuOpen(false)}>Contact Me</a>
            </div>

            {/* HERO */}
            <div className="av-hero">
                <div className="av-hero-inner">
                    <div className="av-hero-ghost">ADVANTE</div>
                    <div className="av-cat av-rv">UI/UX Design Case Study</div>
                    <h1 className="av-title av-rv">Advante</h1>
                    <div className="av-former av-rv">Formerly known as Valiant</div>
                    <p className="av-htag av-rv">Designing a landing page direction that expanded into a fuller website experience for a coaching platform.</p>
                    <p className="av-hdesc av-rv">Advante is a coaching platform designed to help people gain clarity, discover possibilities, and receive psycho-education in a supportive and judgment-free space. The project started as a landing page UI/UX direction, but the scope evolved as the client clarified the pages needed for launch. The final design included the main website experience and supporting pages for blog content, pricing, team information, programs, events, resources, campaign needs, policies, and pre-launch communication.</p>
                    <p className="av-hdesc av-rv">The client already had an existing brand direction, so the design work focused on UI/UX structure, content flow, responsive layout, and applying the provided typography and color style consistently across the landing page.</p>
                    <div className="av-meta-row av-rv">
                        {HERO_META.map(m => (
                            <div key={m.l}><div className="av-meta-l">{m.l}</div><div className="av-meta-v">{m.v}</div></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* COVER */}
            <div className="av-cover av-rv">
                <div className="av-cover-wrap">
                    <img src="/Advante%20Landing%20Page%20Banner%20Showcase%20-%20Main.png" alt="Advante — responsive homepage showcase" />
                </div>
            </div>

            <div className="av-body">
                <div className="av-body-inner">

                    {/* 2. PRODUCT CONTEXT */}
                    <div className="av-rv" style={{ marginBottom: 76 }}>
                        <div className="av-sec-label">About the Product</div>
                        <h2 className="av-sec-title">Advante is a coaching service built around clarity, growth, and support.</h2>
                        <p className="av-sec-body">Advante is a coaching service that helps clients gain clarity, discover possibilities, and work through personal or professional concerns in a supportive, judgment-free space. The platform focuses on coaching services for leadership, career growth, performance, interpersonal skills, mental health, wellbeing, and group coaching.</p>

                        <div className="av-cardgrid">
                            <div className="av-card">
                                <div className="av-card-num">Project Name</div>
                                <h3>Advante, formerly known as Valiant</h3>
                                <p>Advante helps clients gain clarity, discover possibilities, and receive psycho-education. It creates a space where users can openly talk about their concerns, goals, and growth areas with guidance and support.</p>
                            </div>
                        </div>

                        <div className="av-block" style={{ marginTop: 32 }}>
                            <div className="av-subhead"><span className="av-subhead-dot" /><span className="av-subhead-text">Services Offered</span></div>
                            <div className="av-chiprow" style={{ marginTop: 0 }}>
                                {SERVICES_OFFERED.map(s => <div className="av-chip" key={s}>{s}</div>)}
                            </div>
                        </div>
                    </div>

                    {/* 3. PROBLEM STATEMENT */}
                    <div className="av-rv" style={{ marginBottom: 76 }}>
                        <div className="av-sec-label">The Problem</div>
                        <h2 className="av-sec-title">Advante needed a landing page that could explain coaching clearly to first-time visitors.</h2>
                        <p className="av-sec-body">Because the platform offers different coaching areas, the page needed to organize the information in a way that felt simple, supportive, and easy to understand.</p>
                        <ul className="av-list" style={{ marginTop: 20, maxWidth: 700 }}>
                            {KEY_PROBLEMS.map(p => <li key={p}>{p}</li>)}
                        </ul>
                    </div>

                    {/* 4. DESIGN GOAL */}
                    <div className="av-rv" style={{ marginBottom: 76 }}>
                        <div className="av-sec-label">Design Goal</div>
                        <h2 className="av-sec-title">Help visitors understand the offer, trust it, and take the right next step.</h2>
                        <p className="av-sec-body">The goal was to design a clear and flexible website experience that could explain Advante&rsquo;s coaching services, guide visitors toward inquiry or booking, and support additional content needs such as blog articles, programs, events, campaigns, resources, and policy pages.</p>
                        <div className="av-chiprow">
                            {DESIGN_FOCUS.map(d => <div className="av-chip" key={d}>{d}</div>)}
                        </div>
                    </div>

                    {/* 5. TARGET AUDIENCE */}
                    <div className="av-rv" style={{ marginBottom: 76 }}>
                        <div className="av-sec-label">Target Audience</div>
                        <h2 className="av-sec-title">Speaking to people looking for personal or professional guidance.</h2>
                        <p className="av-sec-body">The target audience was defined early so the landing page could speak to the right users and prioritize the right content. Since Advante is a coaching platform, the design needed to feel supportive, trustworthy, and easy to understand for users looking for personal or professional guidance.</p>
                        <div className="av-cardgrid av-cols-4">
                            {AUDIENCE_DETAILS.map(a => (
                                <div className="av-card" key={a.l}>
                                    <div className="av-card-num">{a.l}</div>
                                    <p>{a.v}</p>
                                </div>
                            ))}
                        </div>
                        <div className="av-block" style={{ marginTop: 32 }}>
                            <div className="av-subhead"><span className="av-subhead-dot" /><span className="av-subhead-text">Audience Needs</span></div>
                            <ul className="av-list" style={{ marginTop: 0, maxWidth: 700 }}>
                                {AUDIENCE_NEEDS.map(n => <li key={n}>{n}</li>)}
                            </ul>
                        </div>
                    </div>

                    {/* 6. BUSINESS AND CONVERSION GOALS */}
                    <div className="av-rv" style={{ marginBottom: 76 }}>
                        <div className="av-sec-label">Business and Conversion Goals</div>
                        <h2 className="av-sec-title">Guiding visitors toward inquiry, sign-up, booking, or subscription interest.</h2>
                        <p className="av-sec-body">The landing page needed to support clear visitor actions instead of only presenting information. The experience was planned to help users understand the coaching service first, then guide them toward inquiry, sign-up, booking, or paid plan interest.</p>
                        <div className="av-table">
                            <div className="av-trow head">
                                <div className="av-tcell">Business Goal</div>
                                <div className="av-tcell">Landing Page Goal</div>
                            </div>
                            <div className="av-trow">
                                <div className="av-tcell">Lead generation and subscription interest</div>
                                <div className="av-tcell">Collect contact information from potential customers by showing interest in coaching services or subscription plans.</div>
                            </div>
                        </div>
                        <div className="av-block" style={{ marginTop: 32 }}>
                            <div className="av-subhead"><span className="av-subhead-dot" /><span className="av-subhead-text">Desired Visitor Actions</span></div>
                            <div className="av-chiprow" style={{ marginTop: 0 }}>
                                {DESIRED_ACTIONS.map(d => <div className="av-chip" key={d}>{d}</div>)}
                            </div>
                        </div>
                        <div className="av-block" style={{ marginTop: 28 }}>
                            <div className="av-subhead"><span className="av-subhead-dot" /><span className="av-subhead-text">Usage / Product Goals</span></div>
                            <div className="av-chiprow" style={{ marginTop: 0 }}>
                                {USAGE_GOALS.map(u => <div className="av-chip muted" key={u}>{u}</div>)}
                            </div>
                        </div>
                    </div>

                    {/* 7. COMPETITOR REFERENCES */}
                    <div className="av-rv" style={{ marginBottom: 76 }}>
                        <div className="av-sec-label">Competitor References</div>
                        <h2 className="av-sec-title">Reference points, not a full competitor audit.</h2>
                        <p className="av-sec-body">Possible coaching and self-development references were reviewed to understand how similar services present their offers online. These references helped guide what the Advante landing page needed to communicate clearly, including service value, trust, pricing, coaching focus, and booking or inquiry actions.</p>
                        <div className="av-cardgrid av-cols-2" style={{ marginTop: 28 }}>
                            <div className="av-card">
                                <div className="av-card-num">Local Reference</div>
                                <h3>harayacoaching.com</h3>
                            </div>
                            <div className="av-card">
                                <div className="av-card-num">International References</div>
                                <h3>torch.io · betterup.com</h3>
                            </div>
                        </div>
                        <div className="av-block" style={{ marginTop: 28 }}>
                            <div className="av-subhead"><span className="av-subhead-dot" /><span className="av-subhead-text">Case Study Use</span></div>
                            <div className="av-chiprow" style={{ marginTop: 0 }}>
                                {CASE_STUDY_USE.map(c => <div className="av-chip muted" key={c}>{c}</div>)}
                            </div>
                        </div>
                    </div>

                    {/* 8. EXISTING BRAND AND VISUAL ALIGNMENT */}
                    <div className="av-rv" style={{ marginBottom: 76 }}>
                        <div className="av-sec-label">Existing Brand and Visual Alignment</div>
                        <h2 className="av-sec-title">Clean, friendly, and heartwarming — the client&rsquo;s existing visual tone.</h2>
                        <p className="av-sec-body">Advante already had a preferred brand direction, including the typography and color style to use for the website. The UI/UX task was to apply that existing direction into a landing page that felt clean, friendly, supportive, and professional while still supporting strong content hierarchy and conversion-focused actions.</p>
                        <div className="av-chiprow">
                            {BRAND_ADJECTIVES.map(b => <div className="av-chip solid" key={b}>{b}</div>)}
                        </div>
                        <div className="av-spectrum">
                            {SPECTRUMS.map(s => (
                                <div className="av-spec-row" key={s.left}>
                                    <div className="av-spec-labels"><span>{s.left}</span><span>{s.right}</span></div>
                                    <div className="av-spec-track"><div className="av-spec-dot" style={{ left: `${s.pos}%` }} /></div>
                                </div>
                            ))}
                        </div>
                        <p className="av-sec-body" style={{ marginTop: 28 }}>Keeping the UI aligned with this existing direction shaped the spacing, structure, imagery style, and overall layout so the landing page felt supportive rather than intimidating.</p>
                    </div>

                    {/* 9. USER PERSONA PLANNING */}
                    <div className="av-rv" style={{ marginBottom: 76 }}>
                        <div className="av-sec-label">User Persona Planning</div>
                        <h2 className="av-sec-title">Designing for professionals who want clarity, growth, and balance.</h2>
                        <p className="av-sec-body">Persona planning helped clarify what the landing page needed to support. The main user direction focused on professionals who want emotional clarity, better habits, productivity support, career growth, and stronger work-life balance.</p>

                        <div className="av-persona" style={{ marginTop: 28 }}>
                            <div className="av-persona-tag">Persona — Product Manager</div>
                            <h3>Maria</h3>
                            <div className="av-persona-role">32 years old · 5 years of experience</div>
                            <div className="av-persona-attrs">
                                <div className="av-persona-attr">Age 32</div>
                                <div className="av-persona-attr">5 Years Experience</div>
                                <div className="av-persona-attr">Product Manager</div>
                            </div>
                            <p className="av-persona-quote">“You have the power to move past your struggles and create the life you want.”</p>
                        </div>

                        <div className="av-persona-groups">
                            <div className="av-pgroup"><h4>Goals</h4><ul className="av-list tight">{PERSONA_GOALS.map(g => <li key={g}>{g}</li>)}</ul></div>
                            <div className="av-pgroup"><h4>Needs</h4><ul className="av-list tight">{PERSONA_NEEDS.map(g => <li key={g}>{g}</li>)}</ul></div>
                            <div className="av-pgroup"><h4>Motivations</h4><ul className="av-list tight">{PERSONA_MOTIVATIONS.map(g => <li key={g}>{g}</li>)}</ul></div>
                            <div className="av-pgroup"><h4>Frustrations</h4><ul className="av-list tight">{PERSONA_FRUSTRATIONS.map(g => <li key={g}>{g}</li>)}</ul></div>
                            <div className="av-pgroup"><h4>Tasks</h4><ul className="av-list tight">{PERSONA_TASKS.map(g => <li key={g}>{g}</li>)}</ul></div>
                        </div>
                    </div>

                    {/* 10. PROJECT TIMELINE */}
                    <div className="av-rv" style={{ marginBottom: 76 }}>
                        <div className="av-sec-label">Project Timeline</div>
                        <h2 className="av-sec-title">A 2-week landing page UI/UX process from brief to developer handoff.</h2>
                        <p className="av-sec-body">The Advante landing page project was completed through a focused 2-week UI/UX process. The work started with understanding the client&rsquo;s goals, reviewing the product and existing brand direction, and planning the page structure. The next phase focused on sitemap, wireframes, visual alignment, mock-up design for all required pages, prototyping, client feedback, landing page audit, and developer handoff.</p>

                        <div className="av-tl-gantt">
                            <div className="av-tl-gweeks">
                                <div>Phase</div>
                                {Array.from({ length: 10 }, (_, i) => <div key={i}>Day {i + 1}</div>)}
                            </div>
                            {TIMELINE_PHASES.map(p => {
                                const g = TIMELINE_GROUPS[p.group]
                                return (
                                    <div className="av-tl-grow" key={p.label}>
                                        <div className="av-tl-grow-label">
                                            <div className="av-tl-grow-dot" style={{ background: g.color }} />
                                            <div>
                                                <div className="av-tl-grow-name">{p.label}</div>
                                                <div className="av-tl-grow-wk">{p.day}</div>
                                            </div>
                                        </div>
                                        <div className="av-tl-gtrack">
                                            <div className="av-tl-gseg" style={{ gridColumn: `${p.s} / ${p.e}`, background: g.color, color: g.text }}>
                                                <span>{p.day}</span>
                                                <div className="av-tl-tip">
                                                    <div className="av-tl-tip-title">{p.label}</div>
                                                    <div className="av-tl-tip-wk">{p.day} · {g.name}</div>
                                                    <div className="av-tl-tip-desc">{p.desc}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="av-tl-legend">
                                {TIMELINE_GROUPS.map(g => (
                                    <div className="av-tl-legend-item" key={g.name}><div className="av-tl-legend-dot" style={{ background: g.color }} />{g.name}</div>
                                ))}
                            </div>
                        </div>

                        <div className="av-tl-mobile">
                            {TIMELINE_PHASES.map(p => {
                                const g = TIMELINE_GROUPS[p.group]
                                return (
                                    <div className="av-tl-row" key={p.label}>
                                        <div className="av-tl-dot" style={{ background: g.color }} />
                                        <div>
                                            <div className="av-tl-wk">{p.day} · {g.name}</div>
                                            <div className="av-tl-name">{p.label}</div>
                                            <div className="av-tl-sub">{p.desc}</div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="av-tl-legend" style={{ marginTop: 4 }}>
                                {TIMELINE_GROUPS.map(g => (
                                    <div className="av-tl-legend-item" key={g.name}><div className="av-tl-legend-dot" style={{ background: g.color }} />{g.name}</div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 11. FINAL PAGE SCOPE */}
                    <div className="av-rv" style={{ marginBottom: 76 }}>
                        <div className="av-sec-label">Final Page Scope</div>
                        <h2 className="av-sec-title">What the final website needed to include.</h2>
                        <p className="av-sec-body">The page scope evolved during the process as the client clarified what they needed for the website. The final design included the main homepage experience and supporting pages needed for launch, content, coaching programs, events, resources, policies, and campaign use.</p>

                        <div className="av-block" style={{ marginTop: 28 }}>
                            <div className="av-subhead"><span className="av-subhead-dot" /><span className="av-subhead-text">Final Pages Designed</span></div>
                            <div className="av-chiprow" style={{ marginTop: 0 }}>
                                {FINAL_PAGES.map(s => <div className="av-chip solid" key={s}>{s}</div>)}
                            </div>
                        </div>
                        <div className="av-block" style={{ marginTop: 24 }}>
                            <div className="av-subhead"><span className="av-subhead-dot" /><span className="av-subhead-text">Homepage Sections</span></div>
                            <div className="av-chiprow" style={{ marginTop: 0 }}>
                                {FINAL_HOMEPAGE_SECTIONS.map(s => <div className="av-chip" key={s}>{s}</div>)}
                            </div>
                        </div>
                    </div>

                    {/* 12. SITEMAP AND SITE BEHAVIOR */}
                    <div className="av-rv" style={{ marginBottom: 76 }}>
                        <div className="av-sec-label">Sitemap and Site Behavior</div>
                        <h2 className="av-sec-title">Mapping the website structure around visitor goals and clear conversion paths.</h2>
                        <p className="av-sec-body">The sitemap helped organize how visitors move through the homepage, supporting pages, and key actions. It also helped keep the main landing page focused while still allowing users to explore pricing, team information, blog content, programs, events, resources, and inquiry actions.</p>

                        <div className="av-sitemap-shot">
                            <img src="/Advante%20Sitemap%20and%20Sketch.png" alt="Advante — sitemap and sketch planning the homepage and supporting page structure" />
                        </div>
                    </div>

                    {/* 13. WIREFRAMES */}
                    <div className="av-rv" style={{ marginBottom: 76 }}>
                        <div className="av-sec-label">Wireframes</div>
                        <h2 className="av-sec-title">Planning content hierarchy before visual design.</h2>
                        <p className="av-sec-body">Low-fidelity wireframes were created to plan the structure of the main website pages and supporting pages before moving into high-fidelity UI design. This helped organize the content hierarchy, navigation flow, service information, pricing, team content, blog structure, programs, campaigns, events, resources, and policy pages.</p>

                        <div className="av-sitemap-shot">
                            <img src="/Advante%20-%20Wireframe.png" alt="Advante — low-fidelity wireframes for the homepage and supporting pages" />
                        </div>
                    </div>

                    {/* 14. MOODBOARDING AND UI EXPLORATION */}
                    <div className="av-rv" style={{ marginBottom: 76 }}>
                        <div className="av-sec-label">Moodboarding and UI Exploration</div>
                        <h2 className="av-sec-title">Exploring layout direction and visual references before UI design.</h2>
                        <p className="av-sec-body">Before moving into the final UI mock-ups, I explored moodboards and layout references to understand how Advante&rsquo;s existing typography, colors, and visual style could be applied across the website. This helped guide the layout direction, image treatment, spacing, content flow, and overall UI feel while keeping the design aligned with the client&rsquo;s preferred brand direction.</p>

                        <div className="av-mb-grid">
                            {MOODBOARDS.map(m => (
                                <div className="av-mb-shot" key={m.name}>
                                    <img src={m.src} alt={`Advante — ${m.name.toLowerCase()} exploring layout direction and visual references`} />
                                </div>
                            ))}
                        </div>

                        <div className="av-block" style={{ marginTop: 28 }}>
                            <div className="av-subhead"><span className="av-subhead-dot" /><span className="av-subhead-text">What the moodboarding helped clarify</span></div>
                            <ul className="av-list" style={{ marginTop: 0, maxWidth: 700 }}>
                                {EXPLORATION_DECIDED.map(e => <li key={e}>{e}</li>)}
                            </ul>
                        </div>
                    </div>

                    {/* 15. RESPONSIVE UI DESIGN */}
                    <div className="av-rv" style={{ marginBottom: 76 }}>
                        <div className="av-sec-label">Responsive UI Design</div>
                        <h2 className="av-sec-title">The final website direction across desktop, tablet, and mobile.</h2>
                        <p className="av-sec-body">The high-fidelity mock-up phase covered the final website page scope, not only the homepage. The pages were designed to keep the experience consistent across the main landing page, blog, pricing, team, program, campaign, event, resource, and policy-related sections. The homepage direction below shows that consistency across desktop, tablet, and mobile.</p>

                        <div className="av-showcase-list">
                            <div className="av-showcase-item">
                                <img src="/Advante%20Landing%20Page%20Banner%20Showcase%20-%20Main.png" alt="Advante homepage — web, hero section" />
                            </div>
                            <div className="av-showcase-item">
                                <img src="/Advante%20Landing%20Page%20Banner%20Showcase%20-%202nd.png" alt="Advante homepage — web, services and offer section" />
                            </div>
                            <div className="av-showcase-item">
                                <img src="/Advante%20Landing%20Page%20Banner%20Showcase%20-%203rd.png" alt="Advante homepage — web, events and resources section" />
                            </div>
                            <div className="av-showcase-item">
                                <img src="/Advante%20Landing%20Page%20Banner%20Showcase%20-%204th.png" alt="Advante homepage — responsive design across tablet and mobile" />
                            </div>
                        </div>

                        <div className="av-chiprow" style={{ marginTop: 32 }}>
                            {["Clear hero messaging", "Strong CTA placement", "Trust-building company logos", "Coaching service cards", "Responsive layout behavior", "Readable content across devices"].map(d => (
                                <div className="av-chip" key={d}>{d}</div>
                            ))}
                        </div>
                    </div>

                    {/* 16. LANDING PAGE AUDIT AND DEVELOPER HANDOFF */}
                    <div className="av-rv" style={{ marginBottom: 76 }}>
                        <div className="av-sec-label">Landing Page Audit and Developer Handoff</div>
                        <h2 className="av-sec-title">Making the design easier to translate into code.</h2>
                        <p className="av-sec-body">Before handoff, the landing page designs were reviewed for spacing, alignment, responsiveness, navigation states, and button interactions. Redlining and documentation were then prepared to help developers understand layout rules, responsive behavior, component states, and interaction details. A developer sync-up was also done to walk through the screens, notes, and expected behavior so implementation could move more clearly and efficiently.</p>

                        <div className="av-redoc-row">
                            <div className="av-redoc-shot">
                                <img src="/Advante%20-%20Redlining%20and%20documentation%201.png" alt="Advante — redlining and documentation reference 1" />
                            </div>
                            <div className="av-redoc-shot">
                                <img src="/Advante%20-%20Redlining%20and%20documentation%202.png" alt="Advante — redlining and documentation reference 2" />
                            </div>
                        </div>

                        <p className="av-sec-body" style={{ marginTop: 28 }}>The handoff covered all designed pages across web, tablet, and mobile, not only the homepage or blog pages. I prepared the needed redlining, responsive references, interaction notes, and documentation so the developer had a clear guide for implementing the full website experience.</p>

                        <div className="av-cardgrid av-cols-2" style={{ marginTop: 32 }}>
                            <div className="av-card">
                                <div className="av-card-num">Handoff Materials</div>
                                <ul className="av-list tight" style={{ marginTop: 4 }}>
                                    {HANDOFF_MATERIALS.map(h => <li key={h}>{h}</li>)}
                                </ul>
                            </div>
                            <div className="av-card">
                                <div className="av-card-num">Documented Behavior</div>
                                <ul className="av-list tight" style={{ marginTop: 4 }}>
                                    {DOCUMENTED_BEHAVIOR.map(d => <li key={d}>{d}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* 17. OUTCOME */}
                    <div className="av-rv">
                        <div className="av-sec-label">Outcome</div>
                        <h2 className="av-sec-title">A structured, responsive experience built on a proper UI/UX process.</h2>
                        <p className="av-sec-body">The final Advante UI/UX design helped turn the coaching platform&rsquo;s initial landing page direction into a fuller website experience. The final structure included the home page, blog pages, team page, pricing page, program-related pages, campaign and event pages, resources, policy pages, pre-launch page, and error state page, giving the client a more complete website foundation for launch.</p>
                        <div className="av-cardgrid av-cols-2" style={{ marginTop: 28 }}>
                            {OUTCOME_POINTS.map((o, i) => (
                                <div className="av-card" key={o}>
                                    <div className="av-card-num">{String(i + 1).padStart(2, "0")}</div>
                                    <p>{o}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* NEXT PROJECT */}
            <div className="av-next">
                <div className="av-next-inner av-rv">
                    <a className="av-next-preview" href="/all-work/brandsonic-uiux" aria-label="View BrandSonic project">
                        <img
                            src="/BrandSonic%20Landing%20Page%20Banner%20Showcase%20-%20Main.png"
                            alt="BrandSonic"
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.05)" }}
                        />
                        <div className="av-next-preview-overlay">
                            <div className="av-next-preview-cat">Web Design</div>
                            <div className="av-next-preview-name">BrandSonic</div>
                        </div>
                    </a>
                    <div>
                        <div className="av-next-tag">Next Project</div>
                        <div className="av-next-title">BrandSonic</div>
                        <p className="av-next-desc">All-in-one podcast creation service — use the power of audio to build your brand.</p>
                        <div className="av-next-actions">
                            <a className="av-btn" href="/all-work/brandsonic-uiux">View Project →</a>
                            <a className="av-ghost-btn" href="/all-work">All Work</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="av-foot">
                <div className="av-foot-inner">
                    <a className="av-flogo" href="/">JADEY<span>.</span></a>
                    <div className="av-fcopy">© 2025 Jane Dhell Cagas. All rights reserved.</div>
                    <div className="av-flinks">
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a href="/#contact">Contact</a>
                        <a className="av-fall" href="/all-work">All Projects →</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
