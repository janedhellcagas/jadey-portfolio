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
.aw-nav-r{display:none;align-items:center;gap:14px}
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
.aw-thumb{width:100%;aspect-ratio:4/3;display:block;position:relative;overflow:hidden;flex-shrink:0;background:var(--bg2)}
.aw-thumb img{width:100%;height:100%;object-fit:cover;display:block;transform:scale(1.05)}
.aw-thumb video{width:100%;height:100%;object-fit:cover;display:block}
.aw-overlay{position:absolute;inset:0;background:rgba(74,22,130,0.85);opacity:0;transition:opacity .3s;display:flex;align-items:center;justify-content:center}
.aw-card:hover .aw-overlay{opacity:1}
.aw-view{font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:3px;color:white;border:1px solid white;padding:9px 22px}
.aw-play-badge{position:absolute;bottom:10px;right:10px;width:34px;height:34px;border-radius:50%;background:rgba(10,10,8,0.75);border:1px solid rgba(255,255,255,0.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;z-index:2;pointer-events:none}
.aw-info{padding:18px 20px;border-top:1px solid var(--border);flex:1;display:flex;flex-direction:column}
.aw-info-cat{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--pu);margin-bottom:5px}
.aw-info-title{font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:.5px;color:var(--paper)}
.aw-info-desc{font-size:10px;color:var(--muted);margin-top:4px;line-height:1.7;flex:1}
.aw-tool-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}
.aw-tool-chip{font-size:8px;letter-spacing:.08em;text-transform:uppercase;color:var(--pu2);background:var(--pbg);border:1px solid var(--pborder);padding:5px 9px;font-weight:700}
.aw-video-card{border:1px solid var(--border);overflow:hidden;display:flex;flex-direction:column;background:transparent;text-align:left;cursor:pointer;transition:transform .3s,border-color .3s;font-family:'Space Mono',monospace;width:100%}
.aw-video-card:hover{transform:translate(-4px,-4px);border-color:var(--pu)}
/* MODAL */
.aw-modal-overlay{position:fixed;inset:0;z-index:700;background:rgba(5,5,4,0.92);display:flex;align-items:center;justify-content:center;padding:24px;backdrop-filter:blur(6px)}
.aw-modal{background:var(--bg2);border:1px solid var(--pborder);max-width:920px;width:100%;max-height:90vh;overflow-y:auto;position:relative}
.aw-modal-close{position:absolute;top:16px;right:16px;background:rgba(10,10,8,0.75);border:1px solid var(--border);color:var(--paper);width:36px;height:36px;border-radius:50%;font-size:18px;cursor:pointer;z-index:2;display:flex;align-items:center;justify-content:center;line-height:1;transition:border-color .2s,color .2s}
.aw-modal-close:hover{border-color:var(--pu);color:var(--pu)}
.aw-modal-video{width:100%;background:#000;display:block;max-height:60vh}
.aw-modal-body{padding:28px 32px 32px}
.aw-modal-cat{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--pu);margin-bottom:8px}
.aw-modal-title{font-family:'Bebas Neue',sans-serif;font-size:28px;letter-spacing:.5px;color:var(--paper);margin-bottom:14px}
.aw-modal-desc{font-size:12px;line-height:1.9;color:var(--muted);margin-bottom:8px}
.aw-modal-sub{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--paper);font-weight:700;margin-bottom:10px;margin-top:24px}
.aw-modal-workflow{font-size:11.5px;line-height:1.85;color:var(--muted)}
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
/* ===== RESPONSIVE ===== */
.aw-hamburger{display:flex;flex-direction:column;gap:5px;cursor:pointer;background:transparent;border:none;padding:6px}
.aw-hamburger span{display:block;width:24px;height:2px;background:var(--paper);transition:all .3s}
.aw-drawer{position:fixed;inset:0;z-index:600;background:var(--bg);transform:translateX(100%);transition:transform .35s ease;display:flex;flex-direction:column;padding:88px 28px 40px;overflow-y:auto}
.aw-drawer.open{transform:translateX(0)}
.aw-drawer-close{position:absolute;top:22px;right:24px;background:transparent;border:none;color:var(--paper);font-size:22px;cursor:pointer;line-height:1}
.aw-drawer a{font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;padding:18px 0;border-bottom:1px solid var(--border);transition:color .2s;display:block}
.aw-drawer a:hover,.aw-drawer a:active{color:var(--pu)}
.aw-drawer-cta{background:var(--pu);color:var(--bg)!important;padding:14px 0!important;font-weight:700;border-bottom:none!important;text-align:center;margin-top:20px;display:block;font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;transition:background .2s}
.aw-drawer-cta:hover{background:var(--pu2)}
@media(max-width:1023px){
    :root{--pad:32px}
    .aw-nav-inner{padding:14px 28px}
    .aw-grid{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:768px){
    :root{--pad:24px}
    .aw-header-inner{padding:110px var(--pad) 44px}
    .aw-body-inner{padding:44px var(--pad) 72px}
    .aw-grid{grid-template-columns:1fr}
    .aw-toolbar{flex-direction:column;align-items:flex-start}
    .aw-filters{flex-wrap:wrap}
    .aw-footer-inner{flex-direction:column;align-items:flex-start;gap:20px;padding:32px var(--pad)}
    .aw-flinks{flex-direction:column;gap:10px;align-items:flex-start}
    .aw-modal-overlay{padding:0}
    .aw-modal{max-height:100vh;height:100%;overflow-y:auto}
    .aw-modal-body{padding:22px 20px 28px}
    .aw-modal-title{font-size:22px}
}
@media(max-width:480px){
    :root{--pad:16px}
    .aw-fb{padding:10px 14px;font-size:8px}
    .aw-abar{padding:9px 16px}
    .aw-abar span{font-size:7px}
}
@media(hover:none){
    .aw-card:hover{transform:none;border-color:var(--border)}
    .aw-video-card:hover{transform:none;border-color:var(--border)}
}
@media(hover:none),(pointer:coarse){
    .aw-hamburger{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center}
    .aw-nav-r{display:none}
    .aw-fb{min-height:44px}
}
@media(min-width:1024px){
    .aw-hamburger{display:none}
    .aw-nav-r{display:flex}
}
@media(prefers-reduced-motion:reduce){
    .aw-rv{transition:none;opacity:1;transform:none}
    .aw-drawer{transition:none}
    .aw-ndot,.aw-adot{animation:none}
}
`

function interleaveCategories<T extends {cat:string}>(items: T[]): T[] {
    const groups: Record<string,T[]> = {}
    items.forEach(w => { if (!groups[w.cat]) groups[w.cat] = []; groups[w.cat].push(w) })
    const queues = Object.values(groups).map(g => [...g])
    const result: T[] = []
    let i = 0
    while (result.length < items.length) {
        const q = queues[i % queues.length]
        if (q.length > 0) result.push(q.shift()!)
        i++
    }
    return result
}

const ALL_WORKS = [
    {slug:"barangay-buddy",  cat:"ux", label:"UI/UX DESIGN CASE STUDY",  title:"Barangay Buddy App",           desc:"GovTech community platform for a resident Android app and web admin portal for barangay updates, requests, and services.", img:"/Barangay%20Buddy%20Banner%20Showcase%20-%20Main.png"},
    {slug:"advante",         cat:"ux", label:"UI/UX DESIGN CASE STUDY",  title:"Advante",                      desc:"Coaching platform website with a guided journey, outcome-focused structure, and multiple entry points.",           img:"/Advante%20Landing%20Page%20Banner%20Showcase%20-%20Main.png"},
    {slug:"brandsonic",      cat:"ux", label:"WEB DESIGN",    title:"BrandSonic",                   desc:"All-in-one podcast creation service — use the power of audio to build your brand.",                           img:"/BrandSonic%20Landing%20Page%20Banner%20Showcase%20-%20Main.png"},
    {slug:"devluvs",         cat:"ux", label:"UI/UX DESIGN",  title:"DevLuvs",                      desc:"Online developer's documentation notebook — clean, minimal, built for how devs actually work.",               img:"/DevLuvs%20Landing%20Page%20Banner%20Showcase%20-%20Main.png"},
    {slug:"future-founders", cat:"ux", label:"UI/UX DESIGN",  title:"Future Founders",              desc:"Venture building community platform — dark, bold, and built for founders shaping the future of work.",        img:"/Future%20Founders%20Landing%20Page%20Banner%20Showcase%20-%20Main.png"},
    {slug:"incremental-uiux", cat:"ux", label:"UI/UX DESIGN CASE STUDY",  title:"Incremental",                  desc:"Newsletter platform landing page redesigned to improve product clarity, feature flow, pricing presentation, and getting-started actions.",        img:"/Incremental%20Landing%20Page%20Banner%20Showcase%20-%20Main.png"},
    {slug:"login-signup",    cat:"ux", label:"TEMPLATE KIT",  title:"Login and Signup Template Kit",desc:"Complete authentication UI kit — multiple screen styles, light and dark modes, ready to use.",                img:"/Login%20and%20Signup%20Template%20Kit%20-%20Main.png"},
    {slug:"reviv",           cat:"ux", label:"UI/UX DESIGN",  title:"Reviv",                        desc:"Oral health device — premium, dark, with bold before/after storytelling and a money-back guarantee.",         img:"/Reviv%20Landing%20Page%20Banner%20Showcase%20-%20Main.png"},
    {slug:"scaleforge-uiux", cat:"ux", label:"UI/UX DESIGN",  title:"ScaleForge",                   desc:"Technology company landing page — clearer structure, stronger content hierarchy, and a more polished UI/UX presentation.", img:"/ScaleForge%20Landing%20Page%20Banner%20Showcase%20-%20Main.png"},
    {slug:"starseekr-uiux",    cat:"ux", label:"UI/UX DESIGN CASE STUDY",   title:"StarSeekr",                      desc:"Recruitment service website that helps companies find qualified candidates and connect with the team through clear consultation flows.",                                               img:"/Starseekr%20Landing%20Page%20Banner%20Showcase%20-%20Main%20New.png"},
    {slug:"taskbeasts",        cat:"ux", label:"UI/UX DESIGN",   title:"TaskBeasts",                     desc:"Outsourcing platform — buy points, hand off tasks to vetted experts, and get results without the hassle of hiring freelancers.",                          img:"/TaskBeasts%20Banner%20Showcase%20-%20Main.png"},
    {slug:"helios-solar",      cat:"ux", label:"UI/UX DESIGN",   title:"Helios Solar",                   desc:"Philippines' no.1 solar marketplace — panel options, savings calculator, bank financing, and admin tools in one platform.",                             img:"/Helios%20Solar%20Site%20Banner%20Showcase%20-%20Main.png"},
    {slug:"ballers-ph",        cat:"ux", label:"UI/UX DESIGN",   title:"Ballers.ph",                     desc:"Philippine basketball news site redesign — cleaner editorial hierarchy, improved article layouts, and responsive design across devices.",                 img:"/Ballers.ph%20Site%20Banner%20Showcase%20-%20Main.png"},
    {slug:"landing-page-kit",  cat:"ux", label:"TEMPLATE KIT",   title:"Landing Page Template Kit",      desc:"Free Figma landing page kit — 30+ modular sections across web, mobile, and tablet, built to be adapted quickly across different products.",              img:"/Landing%20Page%20Template%20Kit%20-%20Main.png"},
    {slug:"parves-shahid",     cat:"brand", label:"BRAND DESIGN", title:"Parves Shahid",                  desc:"Personal brand system for an AI creator — visual identity, carousel, infographic, and banner designed around consistency and recognition.",            img:"/Parves%20Shahid%20Cover%20Photo.png"},
    {slug:"grace-ling",        cat:"brand", label:"BRAND DESIGN", title:"Grace Ling",                      desc:"Personal brand system built on elegance and clarity — consistent visual identity across LinkedIn profile, carousel, and banners.",                      img:"/Grace%20Ling%20Cover%20Photo.png"},
    {slug:"kim-frances-santillana", cat:"brand", label:"BRAND DESIGN", title:"Kim Frances Santillana",     desc:"Personal brand system focused on clarity and structure — making valuable content easier to scan, read, and engage with.",                               img:"/Kim%20Frances%20Santillana%20Cover%20Photo.png"},
    {slug:"parin-mehta",           cat:"brand", label:"BRAND DESIGN", title:"Parin Mehta",                  desc:"Personal brand system for an analytical content creator — structured visuals that reflect logical thinking across carousel, infographic, and banner.",  img:"/PARIN%20MEHTA%20Cover%20Photo.png"},
    {slug:"mariam-khawar",         cat:"brand", label:"BRAND DESIGN", title:"Mariam Khawar",                  desc:"Personal brand system built for educational content — structured layouts and clear hierarchy that make information easier to process and retain.",       img:"/Mariam%20Khawar%20Cover%20Photo.png"},
    {slug:"ravi-kumar-sapata",     cat:"brand", label:"BRAND DESIGN", title:"Ravi Kumar Sapata",                desc:"Personal brand system for a bold, opinion-driven voice — high-contrast visuals and strong typography that make ideas impossible to scroll past.",         img:"/Ravi%20kumar%20sapata%20Cover%20Photo.png"},
    {slug:"gaurav-singh",          cat:"brand", label:"BRAND DESIGN", title:"Gaurav Singh",                      desc:"Personal brand system for structured thought leadership — clear visual hierarchy and illustration-driven layouts that make complex ideas easy to follow.",    img:"/Gaurav%20Singh%20Cover%20Photo.png"},
    {slug:"lunara-haircare",        cat:"brand", label:"BRAND DESIGN", title:"Lunara Haircare",                    desc:"AI-assisted brand identity for a premium hair care brand — soft, elegant, and trustworthy visual identity built for calm self-care.",                   img:"/Lunara%20-%20Thumbnail.png"},
    {slug:"nour",                   cat:"brand", label:"BRAND DESIGN", title:"Nour",                                desc:"AI-assisted brand identity for a premium candle and home fragrance brand — warm, intimate, and elegant visual system built around the meaning of light.",  img:"/Nour%20Brand%20Thumbnail.png"},
    {slug:"lunara-haircare-graphic", cat:"graphic", label:"GRAPHIC DESIGN", title:"Lunara Haircare",               desc:"AI-assisted graphic design showcase — social media content, posters, packaging, and large-format advertising for a premium hair care brand.",            img:"/Lunara%20-%20Thumbnail%20(Graphic).png"},
    {slug:"opexa-sigma-event-2026",  cat:"graphic", label:"GRAPHIC DESIGN", title:"OPEXA Sigma Event 2026",         desc:"Event graphic design showcase — poster designs and branded merchandise graphics created for OPEXA Sigma Event 2026 presentation and collateral.",       img:"/Opexa%20Thumbnail.png"},
    {slug:"nour-graphic",            cat:"graphic", label:"GRAPHIC DESIGN", title:"Nour",                              desc:"AI-assisted graphic design showcase — social media, posters, packaging, and large-format advertising for a premium candle and home fragrance brand.",    img:"/Nour%20Graphic%20Thumbnail.png"},
    {slug:"kapehan-session",         cat:"graphic", label:"GRAPHIC DESIGN", title:"Kapehan Session",                    desc:"Graphic design refresh for a community session — before-and-after asset comparison, coffee-themed visual upgrade, and merch prize designs for participants.", img:"/Kapehan%20Session%20Thumbnail.png"},
    {slug:"game-day-friday",         cat:"graphic", label:"GRAPHIC DESIGN", title:"Game Day Friday",                     desc:"Graphic design refresh for an internal game event — before-and-after comparison, nostalgic gaming visual upgrade, and merch prize designs for participants.",  img:"/GameDay%20Friday%20Thumbnail.png"},
    {slug:"reviv-graphic",           cat:"graphic", label:"GRAPHIC DESIGN", title:"Reviv",                               desc:"Graphic design showcase — YouTube thumbnails, social media posts, and story-style MyDay content created for digital promotion.",                           img:"/Reviv%20Graphic%20Banner%20Thumbnail%20-%20Main.png"},
    {slug:"brandsonic",            cat:"brand", label:"BRAND DESIGN", title:"BrandSonic",                        desc:"Brand identity system for a podcast and audio branding platform — dark foundation, blue accent, and a clean visual language built for premium recognition.",    img:"/brandsonic%20branding%20-%20thumbnail.png"},
    {slug:"starseekr",             cat:"brand", label:"BRAND DESIGN", title:"Starseekr",                         desc:"Collaborative brand identity project — a cohesive visual system built across logo, color, typography, merchandise, and social media by two designers.",           img:"/starseekr%20branding%20-%20thumbnail.png"},
    {slug:"incremental",           cat:"brand", label:"BRAND DESIGN", title:"Incremental",                       desc:"Collaborative brand identity project — a clean, structured, and scalable visual system built for a modern technology-focused brand.",                            img:"/incremental%20-%20thumbnail.png"},
    {slug:"scaleforge",            cat:"brand", label:"BRAND DESIGN", title:"ScaleForge",                         desc:"Collaborative brand identity project — a strong, structured, and scalable visual system built for a technology and B2B engineering brand.",                          img:"/scaleforge%20-%20thumbnail.png"},
]

const ALL_WORKS_SHUFFLED = interleaveCategories(ALL_WORKS)

const UX_PRIORITY_ORDER = ["barangay-buddy", "starseekr-uiux", "advante", "incremental-uiux"]

const VIDEO_TOOLS = ["ChatGPT", "Grok", "CapCut"]

const VIDEO_WORKFLOW = "I used ChatGPT to create the scene direction, scenario, and image prompt needed for the video concept. I used Grok to generate the AI video based on the prepared visual direction, then edited and polished the final video in CapCut."

const VIDEOS = [
    {
        slug: "clarion-glasses",
        title: "Clarion Glasses",
        file: "/Clarion%20Glasses.mov",
        cardDesc: "AI-assisted product video concept for smart glasses, showing a clean product-focused visual presentation.",
        modalDesc: "Clarion Glasses is an AI-assisted product video concept focused on presenting smart glasses in a clean and visually engaging way.",
    },
    {
        slug: "glowmate-product",
        title: "GlowMate Product",
        file: "/GlowMate%20Product.mov",
        cardDesc: "AI-assisted product video concept for a beauty device, created to show product use and visual appeal.",
        modalDesc: "GlowMate Product is an AI-assisted product video concept made to highlight a beauty device through product-focused scenes and polished editing.",
    },
    {
        slug: "lumora-bag",
        title: "Lumora Bag",
        file: "/Lumora%20Bag.mov",
        cardDesc: "AI-assisted fashion product video concept for a carry bag, focused on lifestyle and product presentation.",
        modalDesc: "Lumora Bag is an AI-assisted fashion product video concept designed to showcase a carry bag through clean lifestyle visuals and product-focused storytelling.",
    },
    {
        slug: "nescafe-product",
        title: "Nescafe Product",
        file: "/Nescafe%20Product.mp4",
        cardDesc: "AI-assisted promotional video concept for an iced coffee product with short-form product storytelling.",
        modalDesc: "Nescafe Product is an AI-assisted promotional video concept focused on iced coffee, using short-form scenes to present the product in a simple and engaging way.",
    },
    {
        slug: "powerplay-arcade",
        title: "PowerPlay Arcade",
        file: "/PowerPlay%20Arcade.mov",
        cardDesc: "AI-assisted business concept video for an arcade brand, focused on fun, energy, and entertainment.",
        modalDesc: "PowerPlay Arcade is an AI-assisted business concept video created to present an arcade brand with a fun, energetic, and entertainment-focused direction.",
    },
]


export default function AllWorkPage() {
    const [filter, setFilter] = useState("all")
    const [navScroll, setNavScroll] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeVideo, setActiveVideo] = useState<typeof VIDEOS[number] | null>(null)
    const ref = useRef<HTMLDivElement>(null)
    const drawerRef = useRef<HTMLDivElement>(null)
    const hamburgerRef = useRef<HTMLButtonElement>(null)
    const modalVideoRef = useRef<HTMLVideoElement>(null)

    const closeVideoModal = () => {
        const el = modalVideoRef.current
        if (el) { el.pause(); el.currentTime = 0 }
        setActiveVideo(null)
    }

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

    useEffect(() => {
        document.body.style.overflow = (menuOpen || activeVideo) ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [menuOpen, activeVideo])

    useEffect(() => {
        if (!activeVideo) return
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeVideoModal() }
        document.addEventListener("keydown", onKey)
        return () => document.removeEventListener("keydown", onKey)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeVideo])

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

    const isVideoTab = filter === "video"

    const filtered = filter === "all"
        ? ALL_WORKS_SHUFFLED
        : filter === "ux"
            ? [...ALL_WORKS.filter(w => w.cat === "ux")].sort((a, b) => {
                const ai = UX_PRIORITY_ORDER.indexOf(a.slug)
                const bi = UX_PRIORITY_ORDER.indexOf(b.slug)
                if (ai !== -1 && bi !== -1) return ai - bi
                if (ai !== -1) return -1
                if (bi !== -1) return 1
                return 0
            })
            : isVideoTab
                ? []
                : ALL_WORKS.filter(w => w.cat === filter)

    const displayCount = isVideoTab ? VIDEOS.length : filtered.length

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
                    <button ref={hamburgerRef} className="aw-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* MOBILE DRAWER */}
            <div ref={drawerRef} className={`aw-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-label="Navigation menu">
                <button className="aw-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <a href="/all-work" onClick={() => setMenuOpen(false)}>All Projects</a>
                <a href="/#about" onClick={() => setMenuOpen(false)}>About Me</a>
                <a href="/#work" onClick={() => setMenuOpen(false)}>Work Highlights</a>
                <a href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <a href="/#insights" onClick={() => setMenuOpen(false)}>Blog</a>
                <a href="/#workshops" onClick={() => setMenuOpen(false)}>Workshops</a>
                <a className="aw-drawer-cta" href="/#contact" onClick={() => setMenuOpen(false)}>Contact Me</a>
            </div>

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
                        <div className="aw-count">{displayCount} PROJECT{displayCount !== 1 ? "S" : ""}</div>
                        <div className="aw-filters">
                            {([["all","All"],["ux","UI / UX"],["brand","Brand"],["graphic","Graphic"],["video","AI-Assisted Video"]] as [string,string][]).map(([f,l]) => (
                                <button key={f} className={`aw-fb${filter === f ? " on" : ""}`} onClick={() => setFilter(f)}>{l}</button>
                            ))}
                        </div>
                    </div>
                    {isVideoTab ? (
                        <div className="aw-grid aw-rv">
                            {VIDEOS.map(v => (
                                <button key={v.slug} className="aw-video-card" onClick={() => setActiveVideo(v)} aria-haspopup="dialog">
                                    <div className="aw-thumb">
                                        <video src={v.file} preload="metadata" muted playsInline aria-hidden="true" />
                                        <div className="aw-overlay"><span className="aw-view">▶ PLAY VIDEO</span></div>
                                        <div className="aw-play-badge">▶</div>
                                    </div>
                                    <div className="aw-info">
                                        <div className="aw-info-cat">AI-Assisted Video</div>
                                        <div className="aw-info-title">{v.title}</div>
                                        <div className="aw-info-desc">{v.cardDesc}</div>
                                        <div className="aw-tool-row">
                                            {VIDEO_TOOLS.map(t => <span className="aw-tool-chip" key={t}>{t}</span>)}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : filtered.length > 0 ? (
                        <div className="aw-grid aw-rv">
                            {filtered.map(w => (
                                <a key={`${w.slug}-${w.cat}`} className="aw-card" href={`/all-work/${w.slug}`}>
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

            {/* AI-ASSISTED VIDEO MODAL */}
            {activeVideo && (
                <div className="aw-modal-overlay" onClick={closeVideoModal} role="presentation">
                    <div className="aw-modal" role="dialog" aria-modal="true" aria-label={`${activeVideo.title} video`} onClick={e => e.stopPropagation()}>
                        <button className="aw-modal-close" onClick={closeVideoModal} aria-label="Close video">✕</button>
                        <video
                            ref={modalVideoRef}
                            className="aw-modal-video"
                            src={activeVideo.file}
                            controls
                            playsInline
                            key={activeVideo.slug}
                        />
                        <div className="aw-modal-body">
                            <div className="aw-modal-cat">AI-Assisted Video</div>
                            <div className="aw-modal-title">{activeVideo.title}</div>
                            <p className="aw-modal-desc">{activeVideo.modalDesc}</p>
                            <div className="aw-tool-row">
                                {VIDEO_TOOLS.map(t => <span className="aw-tool-chip" key={t}>{t}</span>)}
                            </div>
                            <div className="aw-modal-sub">Workflow</div>
                            <p className="aw-modal-workflow">{VIDEO_WORKFLOW}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
