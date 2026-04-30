'use client'
import { useState, useEffect, useRef } from "react"

const CSS = `
:root{--bg:#0a0a08;--bg2:#111110;--paper:#f0ebe0;--pu:#9B59D0;--pu2:#B07AE0;--pu3:#7A3AB8;--muted:rgba(240,235,224,0.38);--border:rgba(240,235,224,0.12);--pborder:rgba(155,89,208,0.3);--pbg:rgba(155,89,208,0.08);--max:1440px;--pad:44px}
.pd*{box-sizing:border-box;margin:0;padding:0}
.pd{font-family:'Space Mono',monospace;background:var(--bg);color:var(--paper);min-height:100vh;overflow-x:hidden;width:100%}
.pd-nav{position:fixed;top:0;left:0;right:0;z-index:500;background:rgba(10,10,8,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:top .3s}
.pd-nav-inner{max-width:var(--max);margin:0 auto;padding:18px var(--pad);display:flex;align-items:center;justify-content:space-between}
.pd-logo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.pd-logo span{color:var(--pu)}
.pd-nav-r{display:none;align-items:center;gap:14px}
.pd-nav-r a{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.pd-nav-r a:hover{color:var(--pu)}
.pd-ndot{width:7px;height:7px;background:var(--pu);border-radius:50%;animation:pd-pulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes pd-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.85)}}
.pd-abar{position:fixed;top:0;left:0;right:0;z-index:499;background:var(--pu3);padding:9px var(--pad);height:38px;display:none;align-items:center;justify-content:center;gap:8px}
.pd-abar.show{display:flex}
.pd-abar span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:white;font-weight:700}
.pd-adot{width:5px;height:5px;background:white;border-radius:50%;animation:pd-pulse 2s ease-in-out infinite}
.pd-nav-contact{background:var(--pu)!important;color:var(--bg)!important;padding:9px 20px!important;font-weight:700!important;border:2px solid var(--pu)!important;display:inline-block!important}
.pd-nav-contact:hover{background:var(--pu2)!important;border-color:var(--pu2)!important}
.pd-cta{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.18em;text-transform:uppercase;background:var(--pu);color:var(--bg);text-decoration:none;padding:8px 18px;font-weight:700;border:2px solid var(--pu);transition:all .2s;display:inline-block}
.pd-cta:hover{background:var(--pu2);border-color:var(--pu2)}
.pd-hero{position:relative;overflow:hidden}
.pd-hero-inner{max-width:var(--max);margin:0 auto;padding:140px var(--pad) 60px;position:relative}
.pd-hero-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(80px,14vw,200px);letter-spacing:-6px;color:rgba(240,235,224,0.02);white-space:nowrap;pointer-events:none}
.pd-cat{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,0.6);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.pd-cat::before{content:'';width:36px;height:1px;background:rgba(255,255,255,0.4)}
.pd-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,9vw,120px);letter-spacing:-2px;line-height:.88;color:#fff;margin-bottom:32px}
.pd-meta-row{display:flex;gap:44px;flex-wrap:wrap;padding-top:28px;border-top:1px solid rgba(255,255,255,0.15)}
.pd-meta-l{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:4px}
.pd-meta-v{font-size:11px;color:#fff;font-weight:700}
.pd-cover{padding:52px var(--pad) 0}
.pd-cover-wrap{max-width:1425px;margin:0 auto;overflow:hidden}
.pd-cover-wrap img{width:100%;height:auto;display:block}
.pd-cover-fallback{aspect-ratio:16/9}
.pd-body{padding:0}
.pd-body-inner{max-width:var(--max);margin:0 auto;padding:72px var(--pad)}
.pd-sec{margin-bottom:60px}
.pd-sec-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:10px}
.pd-sec-label::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.pd-sec-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(26px,4vw,46px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px}
.pd-sec-body{font-size:12px;line-height:1.95;color:var(--muted);max-width:680px}
.pd-showcase{padding:52px var(--pad) 0}
.pd-showcase-wrap{max-width:1425px;margin:0 auto;overflow:hidden}
.pd-showcase-wrap img{width:100%;height:auto;display:block}
.pd-figma-cta{display:inline-flex;align-items:center;gap:10px;background:var(--pbg);border:1px solid var(--pborder);color:var(--pu);font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;padding:12px 22px;text-decoration:none;transition:all .2s;margin-top:20px}
.pd-figma-cta:hover{background:var(--pu);color:var(--bg)}
.pd-next{margin-top:60px;background:var(--bg2)}
.pd-next-inner{max-width:var(--max);margin:0 auto;padding:64px var(--pad);display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:center}
.pd-next-preview{position:relative;overflow:hidden;aspect-ratio:4/3;border:1px solid var(--border)}
.pd-next-preview-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px}
.pd-next-preview-cat{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:6px}
.pd-next-preview-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(16px,2.2vw,26px);letter-spacing:-0.5px;color:#fff;line-height:1}
.pd-next-info{}
.pd-next-tag{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.pd-next-tag::after{content:'';width:36px;height:1px;background:var(--pu)}
.pd-next-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4.5vw,56px);letter-spacing:-1px;color:var(--paper);line-height:.92;margin-bottom:14px}
.pd-next-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:380px;margin-bottom:28px}
.pd-next-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.pd-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;background:var(--pu);color:var(--bg);border:2px solid var(--pu);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.pd-btn:hover{background:var(--pu2);border-color:var(--pu2)}
.pd-ghost-btn{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.pd-ghost-btn:hover{border-color:var(--pu);color:var(--pu)}
.pd-foot{border-top:1px solid var(--border)}
.pd-foot-inner{max-width:var(--max);margin:0 auto;padding:44px var(--pad);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.pd-flogo{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.pd-flogo span{color:var(--pu)}
.pd-fcopy{font-size:9px;color:var(--muted)}
.pd-flinks{display:flex;gap:18px;flex-wrap:wrap;align-items:center}
.pd-flinks a{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.pd-flinks a:hover{color:var(--pu)}
.pd-fall{color:var(--pu)!important}
.pd-404{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:70vh;gap:18px;padding:44px;text-align:center;max-width:var(--max);margin:0 auto}
.pd-404 h2{font-family:'Bebas Neue',sans-serif;font-size:80px;letter-spacing:-3px;color:var(--pu)}
.pd-404 p{font-size:12px;color:var(--muted);max-width:340px;line-height:1.8}
.pd-rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.pd-rv.in{opacity:1;transform:translateY(0)}
/* ===== RESPONSIVE ===== */
.pd-hamburger{display:flex;flex-direction:column;gap:5px;cursor:pointer;background:transparent;border:none;padding:6px}
.pd-hamburger span{display:block;width:24px;height:2px;background:var(--paper);transition:all .3s}
.pd-drawer{position:fixed;inset:0;z-index:600;background:var(--bg);transform:translateX(100%);transition:transform .35s ease;display:flex;flex-direction:column;padding:88px 28px 40px;overflow-y:auto}
.pd-drawer.open{transform:translateX(0)}
.pd-drawer-close{position:absolute;top:22px;right:24px;background:transparent;border:none;color:var(--paper);font-size:22px;cursor:pointer;line-height:1}
.pd-drawer a{font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;padding:18px 0;border-bottom:1px solid var(--border);transition:color .2s;display:block}
.pd-drawer a:hover,.pd-drawer a:active{color:var(--pu)}
.pd-drawer-cta{background:var(--pu);color:var(--bg)!important;padding:14px 0!important;font-weight:700;border-bottom:none!important;text-align:center;margin-top:20px;display:block;font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;transition:background .2s}
.pd-drawer-cta:hover{background:var(--pu2)}
@media(max-width:1023px){
    :root{--pad:32px}
    .pd-nav-inner{padding:14px 28px}
    .pd-next-inner{grid-template-columns:1fr;gap:32px}
}
@media(max-width:768px){
    :root{--pad:24px}
    .pd-hero-inner{padding:110px var(--pad) 44px}
    .pd-body-inner{padding:52px var(--pad)}
    .pd-meta-row{gap:24px}
    .pd-cover{padding:36px var(--pad) 0}
    .pd-showcase{padding:36px var(--pad) 0}
    .pd-next-inner{padding:44px var(--pad)}
    .pd-foot-inner{flex-direction:column;align-items:flex-start;gap:20px;padding:32px var(--pad)}
    .pd-flinks{flex-direction:column;gap:10px;align-items:flex-start}
    .pd-next-actions{flex-direction:column;align-items:flex-start}
    .pd-btn,.pd-ghost-btn{width:100%;text-align:center;display:block}
}
@media(max-width:480px){
    :root{--pad:16px}
    .pd-meta-row{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
    .pd-abar{padding:9px 16px}
    .pd-abar span{font-size:7px}
}
@media(hover:none),(pointer:coarse){
    .pd-hamburger{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center}
    .pd-nav-r{display:none}
    .pd-btn,.pd-ghost-btn,.pd-cta{min-height:44px;display:inline-flex;align-items:center;justify-content:center}
}
@media(min-width:1024px){
    .pd-hamburger{display:none}
    .pd-nav-r{display:flex}
}
@media(prefers-reduced-motion:reduce){
    .pd-rv{transition:none;opacity:1;transform:none}
    .pd-drawer{transition:none}
    .pd-ndot,.pd-adot{animation:none}
}
.pd-sec-list{color:var(--muted);max-width:680px;list-style:none;padding:0;margin:0;font-size:12px;line-height:1.95}
.pd-sec-list-item{padding-left:18px;position:relative;margin-bottom:4px}
.pd-sec-list-item::before{content:'•';position:absolute;left:0;color:var(--pu)}
.pd-sec-list+.pd-sec-body,.pd-sec-body+.pd-sec-list,.pd-sec-list+.pd-sec-list,.pd-sec-body+.pd-sec-body{margin-top:12px}
`

const PROJECTS: Record<string, any> = {
    "advante":        { title:"Advante",                        category:"UI/UX DESIGN",  client:"Advante",         industry:"Coaching and Professional Services",   services:"Website Design, UI–UX Design",    figmaUrl:"",        desc:"Coaching platform website — orbital hero, trust-building layout, and seamless conversion flow.",                                        bg:"linear-gradient(135deg,#2E1050,#6B3FA0)", challenge:"Advante needed to communicate the value of coaching—an intangible, trust-based service—while offering multiple entry points like events, sessions, and resources. Users had to quickly understand what they offer, how it applies to them, and why it’s worth engaging, without feeling overwhelmed.", solution:"I structured the experience as a guided journey. Instead of presenting everything at once, the page separates paths—events, coaching, and resources—while focusing on outcomes rather than features. Each section builds understanding progressively and supports users in moving naturally toward action.", impact:"Clearer understanding of coaching services and offerings • Reduced friction in exploring different entry points • Stronger confidence and intent to engage with the brand", coverSrc:"/Advante%20Landing%20Page%20Banner%20Showcase%20-%20Main.png", mockup1:"/Advante%20Landing%20Page%20Banner%20Showcase%20-%202nd.png", mockup2:"/Advante%20Landing%20Page%20Banner%20Showcase%20-%203rd.png", mockup3:"", mockup4:"", mockup5:"", next:"brandsonic" },
    "brandsonic":     { title:"BrandSonic",                      category:"WEB DESIGN",     client:"BrandSonic",      industry:"Media and Podcasting",               services:"Website Design, UI–UX Design",    figmaUrl:"",        desc:"All-in-one podcast creation service — use the power of audio to build your brand.",                                                      bg:"linear-gradient(135deg,#0808A8,#2222CC)", challenge:"BrandSonic needed to position podcasting as a strategic growth channel, not just content creation. The challenge was helping users understand how audio can drive authority and business results, while simplifying a multi-step service that may feel complex or unfamiliar.", solution:"I designed the page to connect business value with a clear execution path. The experience reframes podcasting around outcomes—authority, engagement, and growth—while breaking down the process into simple, structured steps. Supporting sections like benefits and case studies help make the service more tangible and easier to understand.\n\nThe project moved efficiently—the client was highly satisfied with the initial design on day 1 and approved it immediately, allowing the project to proceed without revisions.", impact:"Clearer understanding of podcasting as a growth strategy • Increased confidence in the process and service offering • Site went live on day 2 after immediate approval • Stronger intent to engage and inquire", coverSrc:"/BrandSonic%20Landing%20Page%20Banner%20Showcase%20-%20Main.png", mockup1:"/BrandSonic%20Landing%20Page%20Banner%20Showcase%20-%202nd.png", mockup2:"/BrandSonic%20Landing%20Page%20Banner%20Showcase%20-%203rd.png", mockup3:"/BrandSonic%20Landing%20Page%20Banner%20Showcase%20-%204th.png", mockup4:"", mockup5:"", next:"devluvs" },
    "devluvs":        { title:"DevLuvs",                         category:"UI/UX DESIGN",  client:"DevLuvs",         industry:"Developer Tools and Content Platform", services:"Website Design, UI–UX Design",   figmaUrl:"",        desc:"Online developer's documentation notebook — clean, minimal, built for how devs actually work.",                                          bg:"linear-gradient(135deg,#1E1E2E,#3A3A80)", challenge:"DevLuvs needed to introduce a new product concept—a platform where developers can create and share content with code as a core part of the experience. The challenge was making the product instantly understandable while clearly differentiating it from familiar tools like editors and documentation platforms.", solution:"I designed the page to make the product clear and approachable from the start.\n\nThe experience highlights how DevLuvs treats code as a first-class part of content, using familiar developer actions to simplify understanding. Messaging focuses on reducing friction in writing and publishing, supported by a straightforward flow that encourages early interest.", impact:"Faster understanding of the product and its purpose • Stronger differentiation from generic writing tools • Lower barrier to entry for developers to engage • Increased interest and early sign-ups", coverSrc:"/DevLuvs%20Landing%20Page%20Banner%20Showcase%20-%20Main.png", mockup1:"/DevLuvs%20Landing%20Page%20Banner%20Showcase%20-%202nd.png", mockup2:"/DevLuvs%20Landing%20Page%20Banner%20Showcase%20-%203rd.png", mockup3:"", mockup4:"", mockup5:"", next:"future-founders" },
    "future-founders":{ title:"Future Founders",                 category:"UI/UX DESIGN",  client:"HOV",             industry:"Education and Startup Development",   services:"Website Design, UI–UX Design",    figmaUrl:"",        desc:"Venture building community platform — dark, bold, and built for founders shaping the future of work.",                                   bg:"linear-gradient(135deg,#080810,#1A0030)", challenge:"Future Founders needed to clearly communicate a program designed for young, high-potential individuals who want to build and lead ventures. The challenge was making a complex offering—combining mentorship, real business exposure, and venture building—feel clear, relevant, and worth committing to.\n\nAt the same time, the page had to align with an existing website. With the original designer no longer involved, the goal was to ensure the new page would match the overall experience and not feel out of place.", solution:"I designed the page to clarify the program while maintaining consistency with the existing product.\n\nThe experience defines who the program is for, what participants can expect, and the outcomes they gain—such as hands-on experience, mentorship, and access to a network. Content is structured to help users quickly assess fit, while following established design patterns to keep the experience cohesive.", impact:"Clearer understanding of the program and its value • Seamless integration with the existing product experience • Better-qualified users through clearer positioning • Increased confidence to sign up and engage", coverSrc:"/Future%20Founders%20Landing%20Page%20Banner%20Showcase%20-%20Main.png", mockup1:"/Future%20Founders%20Landing%20Page%20Banner%20Showcase%20-%202nd.png", mockup2:"/Future%20Founders%20Landing%20Page%20Banner%20Showcase%20-%203rd.png", mockup3:"", mockup4:"", mockup5:"", next:"incremental" },
    "incremental":    { title:"Incremental",                     category:"UI/UX DESIGN",  client:"Incremental",     industry:"SaaS and Email Marketing",            services:"Website Design, UI–UX Design",    figmaUrl:"",        desc:"Newsletter platform — connect your writing app to your email delivery and unshackle your newsletter.",                                  bg:"linear-gradient(135deg,#B88000,#E6AA00)", challenge:"Incremental needed to position itself between writing tools and email platforms. The challenge was helping users quickly understand the gap in their current workflow—and why connecting both matters—without adding complexity or friction.", solution:"I designed the page to frame the problem and present Incremental as the bridge.\n\nThe experience highlights how users can keep their existing writing tools while simplifying delivery, focusing on workflow improvement rather than features. Content is structured around real use cases, supported by clear proof points and a low-friction entry to get started.", impact:"Clearer understanding of the product and its value • Reduced resistance to adopting a new workflow • Stronger connection between problem and solution • Increased intent to try and engage", coverSrc:"/Incremental%20Landing%20Page%20Banner%20Showcase%20-%20Main.png", mockup1:"/Incremental%20Landing%20Page%20Banner%20Showcase%20-%202nd.png", mockup2:"/Incremental%20Landing%20Page%20Banner%20Showcase%20-%203rd.png", mockup3:"", mockup4:"", mockup5:"", next:"login-signup" },
    "login-signup":   { title:"Login and Signup Template Kit",  category:"TEMPLATE KIT",  client:"Personal Project", industry:"Design Tools and Productivity",       services:"UI Kit Design, Design System",         figmaUrl:"https://www.figma.com/community/file/1250723919479373045", desc:"Complete authentication UI kit — multiple screen styles, light and dark modes, ready to use.",                                            bg:"linear-gradient(135deg,#0A1060,#1A2FAA)", challenge:"Designing login and signup pages often becomes repetitive and time-consuming, especially for designers working in Figma. At the time, there were limited ready-to-use resources, making it harder—particularly for beginners—to explore layouts, handle different screen sizes, and maintain consistency across designs.", solution:"I created a comprehensive UI kit focused on login and signup experiences to simplify the design process.\n\nThe kit includes multiple layout variations across web and mobile sizes, allowing designers to quickly adapt designs based on their needs. Each template is structured to be easy to use, helping beginners explore different patterns while also enabling more experienced designers to speed up their workflow.\n\nThe goal was to make designing authentication flows faster, more consistent, and more accessible, especially during a time when AI-assisted tools were not yet widely available.", impact:"Reduced time spent designing repetitive login and signup flows • Helped beginner designers explore and understand UI patterns in Figma • Improved consistency across different screen sizes and layouts • Provided a ready-to-use resource that speeds up design workflow", coverSrc:"/Login%20and%20Signup%20Template%20Kit%20-%20Main.png", mockup1:"/Login%20and%20Signup%20Template%20Kit%20-%202nd.png", mockup2:"/Login%20and%20Signup%20Template%20Kit%20-%203rd.png", mockup3:"/Login%20and%20Signup%20Template%20Kit%20-%204th.png", mockup4:"/Login%20and%20Signup%20Template%20Kit%20-%205th.png", mockup5:"", next:"reviv" },
    "reviv":          { title:"Reviv",                           category:"UI/UX DESIGN",  client:"Reviv",           industry:"Health and Wellness, E-commerce",     services:"Website, UI/UX Design",                figmaUrl:"",        desc:"Oral health device landing page — premium, dark, with bold before/after storytelling and a money-back hook.",                             bg:"linear-gradient(135deg,#0A0A0A,#1A1000)", challenge:"Reviv needed a landing page that could clearly communicate a complex and unfamiliar product concept—positioning a wellness device as a solution for multiple health concerns such as TMJ, posture, fatigue, and cognitive function.\n\nThe challenge wasn’t just visual—it required building trust, educating users, and guiding them toward purchase within a single experience. Without a clear structure, users could easily feel skeptical or overwhelmed, leading to drop-offs before conversion.", solution:"I designed a conversion-driven landing page focused on clarity, trust, and guided storytelling.\n\nThe experience starts with a strong, benefit-led hero paired with before-and-after visuals to quickly establish relevance and credibility. From there, the page flows into structured, scannable sections that break down each benefit into simple, digestible insights—making complex claims easier to understand.\n\nTo reinforce trust, I integrated social proof, testimonials, guarantee messaging, and educational content, allowing users to validate the product at every step. The ‘What You Get’ and FAQ sections were intentionally placed to address objections before they become blockers, reducing friction in the decision-making process.\n\nVisually, the design uses a premium dark interface with gold accents to elevate perceived value and create a consistent, high-end feel aligned with the product positioning.", impact:"Improved content clarity, making complex health benefits easier to understand and trust • Increased engagement through a structured, scroll-based storytelling approach • Reduced potential drop-offs by proactively addressing user objections within the flow • Strengthened perceived product value through premium visual direction and layout consistency • Created a scalable landing structure that can support future campaigns, ads, and product variations", coverSrc:"/Reviv%20Landing%20Page%20Banner%20Showcase%20-%20Main.png", mockup1:"/Reviv%20Landing%20Page%20Banner%20Showcase%20-%202nd.png", mockup2:"/Reviv%20Landing%20Page%20Banner%20Showcase%20-%203rd.png", mockup3:"/Reviv%20Landing%20Page%20Banner%20Showcase%20-%204th.png", mockup4:"", mockup5:"", next:"scaleforge" },
    "scaleforge":     { title:"ScaleForge",                      category:"UI/UX DESIGN",  client:"ScaleForge",      industry:"Technology and Software and B2B Services", services:"Website, UI/UX Design",             figmaUrl:"",        desc:"Tech solutions company — scalable, reliable, metrics-driven, and rooted in strong company values.",                                      bg:"linear-gradient(135deg,#100000,#2A0000)", overview:"ScaleForge is a technology partner focused on building scalable systems for growing businesses. The goal of this project was to design a landing page that not only communicates technical capability—but also differentiates the brand in a highly competitive B2B space.\n\nRather than relying on generic \"corporate tech\" visuals, the approach focused on creating a memorable, story-driven experience that reflects both the company’s expertise and personality.", challenge:"Most B2B technology websites follow the same pattern—safe layouts, abstract visuals, and vague messaging. While functional, they often fail to create strong recall or emotional connection.\n\nFor ScaleForge, the challenge was to:\n\nEstablish instant credibility and trust • Clearly communicate scalability and technical expertise • Avoid blending in with generic competitors • Introduce personality without compromising professionalism\n\nThe landing page needed to feel both authoritative and distinctive—a balance that is often difficult to achieve in this space.", approach:"Instead of starting with layout alone, the process began with defining a strong visual and narrative concept, ensuring every element has purpose.\n\nThe design direction focused on three key pillars:\n\n1. Identity through Meaningful Visual Language\nA custom paw-inspired shape system was introduced—subtly referencing the founder’s personal connection to their dog, which also serves as the brand’s mascot. This transformed simple decorative elements into something intentional and ownable, giving the brand a unique visual signature.\n\n2. Humanizing Technical Expertise\nTo break away from typical corporate presentations, the team section was reimagined using a superhero-inspired concept. Each member is positioned as a problem-solver—symbolizing their role in helping businesses overcome complex technical challenges.\n\nThis reframes the team from \"employees\" into key drivers of impact, making the brand feel more human, capable, and confident.\n\n3. Structured, Conversion-Oriented Experience\nThe page was designed to guide users through a clear narrative:\n\nStart with strong value positioning (scalability and growth) • Reinforce trust with metrics and partnerships • Introduce services in a business-outcome context • End with clear conversion paths (careers, contact, engagement)\n\nAll sections were intentionally arranged to reduce friction and support decision-making.", solution:"The final design delivers a high-impact landing experience that balances storytelling and clarity.\n\nVisually, the interface uses a dark foundation with dynamic red gradients and motion-inspired elements—creating a sense of speed, energy, and continuous growth, aligned with ScaleForge’s positioning.\n\nKey highlights include:\n\nA bold hero section that immediately communicates value • Integrated performance metrics to establish credibility • A distinct visual system rooted in brand meaning • A reimagined team section that strengthens narrative and trust • Clear, structured sections designed for both scanning and depth\n\nThe result is a landing page that feels intentional, cohesive, and memorable—without sacrificing usability.", impact:"Created a strong visual identity that differentiates ScaleForge from typical B2B competitors • Elevated brand perception by combining technical credibility with human storytelling • Improved user engagement through a structured, narrative-driven layout • Strengthened trust using clear metrics, partnerships, and team presentation • Delivered a concept that resonated immediately with stakeholders\n\nNotably, the first design iteration was fully approved on Day 2, after being designed in just one day—demonstrating strong alignment between concept, execution, and client vision.", coverSrc:"/ScaleForge%20Landing%20Page%20Banner%20Showcase%20-%20Main.png", mockup1:"/ScaleForge%20Landing%20Page%20Banner%20Showcase%20-%202nd.png", mockup2:"/ScaleForge%20Landing%20Page%20Banner%20Showcase%20-%203rd.png", mockup3:"/ScaleForge%20Landing%20Page%20Banner%20Showcase%20-%204th.png", mockup4:"", mockup5:"", next:"starseekr" },
    "starseekr":      { title:"Starseekr",                       category:"UI/UX DESIGN",  client:"Starseekr",       industry:"Recruitment and HR and B2B Services", services:"Website, UI/UX Design",                figmaUrl:"",        desc:"Recruitment platform — helping businesses find their next star employee with expertise and precision.",                                   bg:"linear-gradient(135deg,#3B0090,#6600CC)", challenge:"Starseekr helps companies find and hire the right candidates through a structured recruitment process, but communicating that value clearly was a challenge. Many hiring services rely on generic messaging, making it difficult for businesses to understand how they actually improve hiring outcomes.\n\nThe challenge was to present Starseekr not just as a service provider, but as a reliable partner that simplifies hiring, reduces effort, and increases the chances of finding the right talent.", solution:"The approach focused on transforming the recruitment model into a clear and structured experience that emphasizes understanding and decision confidence. Instead of presenting disconnected information, the design guides users through how Starseekr supports hiring—from process clarity to outcome-driven value. The recruitment journey is simplified into an easy-to-follow system, making it more transparent and less overwhelming, while key information is positioned to help users quickly understand how the service helps them find the right candidates efficiently. This ensures that users can confidently evaluate the service and take action without hesitation.", impact:"Clarified how the service helps companies hire the right candidates more efficiently • Strengthened trust by making the recruitment process transparent and easy to understand • Reduced friction in evaluating hiring solutions • Improved engagement through a structured, guided experience • Positioned Starseekr as a reliable hiring partner rather than just a service", coverSrc:"/Starseekr%20Landing%20Page%20Banner%20Showcase%20-%20Main.png", mockup1:"/Starseekr%20Landing%20Page%20Banner%20Showcase%20-%202nd.png", mockup2:"/Starseekr%20Landing%20Page%20Banner%20Showcase%20-%203rd.png", mockup3:"/Starseekr%20Landing%20Page%20Banner%20Showcase%20-%204th.png", mockup4:"", mockup5:"", next:"taskbeasts" },

    "taskbeasts":     { title:"TaskBeasts",                       category:"UI/UX DESIGN",  client:"TaskBeasts",      industry:"Outsourcing and Productivity and B2B Services", services:"Website, UI/UX Design",         figmaUrl:"",        desc:"Outsourcing platform — buy points, hand off tasks to vetted experts, and get results without the hassle of hiring freelancers.",  bg:"linear-gradient(135deg,#002A1A,#005A30)", challenge:"Outsourcing typically comes with friction—hiring takes time, managing freelancers adds overhead, and platforms like Upwork or Fiverr require constant evaluation and coordination. Businesses often struggle to get fast, reliable results without investing significant effort into the process.\n\nFor TaskBeasts, the challenge was to position a simpler alternative—one that removes the complexity of hiring while still maintaining quality, speed, and trust.", solution:"The approach focused on reframing outsourcing into a more accessible and low-friction model through a points-based system. Instead of emphasizing hiring mechanics, the design shifts the focus toward outcome and ease—allowing users to quickly understand how tasks can be completed without managing people directly. The experience is structured to clearly differentiate TaskBeasts from both traditional outsourcing setups and freelance platforms, highlighting its streamlined process, predictable model, and reduced decision overhead.\n\nTo reinforce brand recall and make the experience more distinctive, a claw-inspired visual element was introduced and intentionally made visible across key sections. This is not purely decorative—it acts as a recognizable cue that ties directly to the ‘Beasts’ identity, adding personality while strengthening memorability in a space where most competitors feel generic. Its placement helps anchor the brand visually without distracting from the content, creating a balance between expression and clarity.", impact:"Simplified how users understand and evaluate outsourcing as a service • Reduced perceived complexity compared to freelance platforms • Strengthened positioning as a fast, hassle-free alternative to hiring • Improved brand recall through a distinctive and consistent visual identity • Delivered a clear, conversion-focused experience ready for immediate use", coverSrc:"/TaskBeasts%20Banner%20Showcase%20-%20Main.png", mockup1:"/TaskBeasts%20Banner%20Showcase%20-%202nd.png", mockup2:"/TaskBeasts%20Banner%20Showcase%20-%203rd.png", mockup3:"", mockup4:"", mockup5:"", next:"helios-solar" },

    "helios-solar":   { title:"Helios Solar",                     category:"UI/UX DESIGN",  client:"Helios Solar",    industry:"Renewable Energy and Solar Financing", services:"Web Application, UI/UX Design",        figmaUrl:"",        desc:"Philippines' no.1 solar marketplace — panel options, savings calculator, bank financing, and admin tools in one platform.", bg:"linear-gradient(135deg,#2A1A00,#5A3800)", challenge:"Adopting solar is not just a purchase decision—it’s a financial and technical commitment. Users need to understand system sizing, financing options, and long-term savings before taking action, but most platforms either overwhelm users with complexity or fail to provide enough clarity to build confidence.\n\nFor Helios Solar, the challenge was to simplify this process into something intuitive—allowing users to explore, evaluate, and make informed decisions without friction or confusion.", solution:"The experience was designed as a guided product flow rather than a static website—leading users step by step from discovery to decision. Instead of presenting all information upfront, the interface progressively introduces key inputs such as electricity usage, roof type, and financing preferences, making the process feel structured and approachable.\n\nA core part of the solution is the solar calculator, which transforms user inputs into clear system estimates and projected savings. This shifts the experience from assumption-based decision-making into something tangible and data-driven. Supporting sections such as financing options, partner integrations, and system configurations are intentionally structured to reinforce credibility while keeping the experience easy to follow.\n\nVisually, a dark interface paired with solar-inspired yellow accents was used to emphasize clarity and focus. Key outputs, actions, and financial insights are highlighted through contrast—ensuring users immediately understand what matters without being overwhelmed by information.", impact:"Transformed a complex solar and financing process into a guided, decision-focused experience • Increased user confidence by making system estimates and savings transparent • Reduced friction by breaking down the journey into manageable steps • Strengthened trust through structured data, financing visibility, and partner integration • Positioned Helios as a product-driven platform rather than a typical informational website", coverSrc:"/Helios%20Solar%20Site%20Banner%20Showcase%20-%20Main.png", mockup1:"/Helios%20Solar%20Site%20Banner%20Showcase%20-%202nd.png", mockup2:"/Helios%20Solar%20Site%20Banner%20Showcase%20-%203rd.png", mockup3:"/Helios%20Solar%20Site%20Banner%20Showcase%20-%204th.png", mockup4:"/Helios%20Solar%20Site%20Banner%20Showcase%20-%205th.png", mockup5:"/Helios%20Solar%20Site%20Banner%20Showcase%20-%206th.png", next:"ballers-ph" },

    "ballers-ph":     { title:"Ballers.ph",                       category:"UI/UX DESIGN",  client:"Ballers.ph",      industry:"Sports Media / Content Platform",     services:"Website Redesign, UI/UX Design",       figmaUrl:"",        desc:"Philippine basketball news site redesign — cleaner editorial hierarchy, improved article layouts, and responsive design across devices.", bg:"linear-gradient(135deg,#001A2A,#003A5A)", challenge:"Ballers.ph already had an established platform and audience, but the interface lacked consistency across key elements such as typography, color usage, imagery, and icons. Over time, these inconsistencies made the experience feel visually cluttered and harder to navigate, especially for content-heavy sections.\n\nThe goal was not to redesign from scratch, but to refine the existing system—preserving the brand’s identity and familiarity while improving clarity, structure, and overall usability.", solution:"The redesign focused on bringing structure and consistency to an already established visual direction. Instead of changing the brand, the approach refined it—standardizing typography, tightening the color system, and aligning image treatments to create a more cohesive experience across the platform.\n\nContent hierarchy became a key priority. Sections such as featured articles, previews, and categories were reorganized to improve scanning and readability, allowing users to quickly identify important content without feeling overwhelmed.\n\nVisual noise was reduced by simplifying layouts and ensuring that every element—from cards to navigation—follows a consistent pattern. The result is a cleaner, more structured interface that maintains the familiar look and feel of Ballers.ph, while significantly improving how content is consumed and navigated.", impact:"Improved visual consistency across typography, colors, and components • Enhanced content discoverability through clearer hierarchy and layout structure • Reduced visual clutter, making the platform easier to scan and navigate • Maintained brand familiarity while elevating overall design quality • Delivered a refined experience without disrupting existing user behavior", coverSrc:"/Ballers.ph%20Site%20Banner%20Showcase%20-%20Main.png", mockup1:"/Ballers.ph%20Site%20Banner%20Showcase%20-%202nd.png", mockup2:"/Ballers.ph%20Site%20Banner%20Showcase%20-%203rd.png", mockup3:"/Ballers.ph%20Site%20Banner%20Showcase%20-%204th.png", mockup4:"", mockup5:"", next:"landing-page-kit" },

    "landing-page-kit": { title:"Landing Page Template Kit",      category:"TEMPLATE KIT",  client:"Internal Product", industry:"Design Resource",                    services:"UI/UX Design",                         figmaUrl:"https://www.figma.com/community/file/1257872231846009966", desc:"Free Figma landing page kit — 30+ modular sections across web, mobile, and tablet, built to be adapted quickly across different products and industries.", bg:"linear-gradient(135deg,#1A0A2A,#3A1A5A)", challenge:"Designing landing pages repeatedly from scratch was slowing down the workflow and often led to inconsistent layouts across projects. Just like login and signup pages, landing pages require a clear structure, but building them every time without a base system made the process inefficient and harder to maintain consistency.", solution:"I created the Landing Page Template Kit in Figma as a reusable set of ready-made sections, similar to how the login and signup kit was structured. Instead of designing each page from zero, this kit provides pre-designed layouts that can be easily adapted depending on the product. The focus was to keep everything consistent in terms of spacing, typography, and structure, so it’s faster to build while still flexible enough to fit different use cases.", impact:"Faster landing page creation without starting from scratch • Consistent layout and structure across different projects • Easier to reuse and adapt for various products • Improved workflow efficiency during design process", coverSrc:"/Landing%20Page%20Template%20Kit%20-%20Main.png", mockup1:"/Landing%20Page%20Template%20Kit%20-%202nd.png", mockup2:"/Landing%20Page%20Template%20Kit%20-%203rd.png", mockup3:"/Landing%20Page%20Template%20Kit%20-%204th.png", mockup4:"", mockup5:"", next:"advante" },
}

function renderRichText(text: string) {
    if (!text) return null
    const paras = text.split('\n\n')
    return (
        <>
            {paras.map((para, i) => {
                if (para.includes(' • ')) {
                    const items = para.split(' • ')
                    return (
                        <ul key={i} className="pd-sec-list">
                            {items.map((item, j) => (
                                <li key={j} className="pd-sec-list-item">{item.trim()}</li>
                            ))}
                        </ul>
                    )
                }
                const lines = para.split('\n')
                return (
                    <p key={i} className="pd-sec-body">
                        {lines.map((line, j) => (
                            <span key={j}>{j > 0 && <br />}{line}</span>
                        ))}
                    </p>
                )
            })}
        </>
    )
}

export default function ProjectDetailPage({ slug }: { slug: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const [navScroll, setNavScroll] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const drawerRef = useRef<HTMLDivElement>(null)
    const hamburgerRef = useRef<HTMLButtonElement>(null)

    const project = PROJECTS[slug]
    const nextProject = project ? PROJECTS[project.next] : null

    useEffect(() => {
        const onScroll = () => setNavScroll(window.scrollY > 80)
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => {
        const els = Array.from(ref.current?.querySelectorAll(".pd-rv") || [])
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

    const coverImg = project?.coverSrc || ""
    const mockImg1 = project?.mockup1  || ""
    const mockImg2 = project?.mockup2  || ""
    const mockImg3 = project?.mockup3  || ""
    const mockImg4 = project?.mockup4  || ""
    const mockImg5 = project?.mockup5  || ""

    const styleNodes = (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" />
            <style>{CSS}</style>
        </>
    )

    if (!project) {
        return (
            <div className="pd" ref={ref}>
                {styleNodes}
                <div className={`pd-abar${navScroll ? " show" : ""}`}>
                    <div className="pd-adot" />
                    <span>Available for new projects</span>
                </div>
                <nav className="pd-nav" style={{ top: navScroll ? "38px" : "0" }}>
                    <div className="pd-nav-inner">
                        <a className="pd-logo" href="/">JADEY<span>.</span></a>
                        <div className="pd-nav-r">
                            <div className="pd-ndot" />
                            <a href="/all-work">All Projects</a>
                            <a href="/#about">About Me</a>
                            <a href="/#work">Work Highlights</a>
                            <a href="/#insights">Blog</a>
                            <a href="/#workshops">Workshops</a>
                            <a className="pd-nav-contact" href="/#contact">Contact Me</a>
                        </div>
                        <button ref={hamburgerRef} className="pd-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
                            <span /><span /><span />
                        </button>
                    </div>
                </nav>
                <div ref={drawerRef} className={`pd-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-label="Navigation menu">
                    <button className="pd-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                    <a href="/all-work" onClick={() => setMenuOpen(false)}>All Projects</a>
                    <a href="/#about" onClick={() => setMenuOpen(false)}>About Me</a>
                    <a href="/#work" onClick={() => setMenuOpen(false)}>Work Highlights</a>
                    <a href="/#insights" onClick={() => setMenuOpen(false)}>Blog</a>
                    <a href="/#workshops" onClick={() => setMenuOpen(false)}>Workshops</a>
                    <a className="pd-drawer-cta" href="/#contact" onClick={() => setMenuOpen(false)}>Contact Me</a>
                </div>
                <div className="pd-404">
                    <div style={{fontSize:9,letterSpacing:".2em",textTransform:"uppercase",color:"var(--muted)"}}>404 — Not Found</div>
                    <h2>Oops.</h2>
                    <p>This project doesn&apos;t exist. Head back to see all work.</p>
                    <a className="pd-btn" href="/all-work">← Back to All Work</a>
                </div>
            </div>
        )
    }

    return (
        <div className="pd" ref={ref}>
            {styleNodes}
            <div className={`pd-abar${navScroll ? " show" : ""}`}>
                <div className="pd-adot" />
                <span>Available for new projects</span>
            </div>
            <nav className="pd-nav" style={{ top: navScroll ? "38px" : "0" }}>
                <div className="pd-nav-inner">
                    <a className="pd-logo" href="/">JADEY<span>.</span></a>
                    <div className="pd-nav-r">
                        <div className="pd-ndot" />
                        <a href="/all-work">All Projects</a>
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a className="pd-nav-contact" href="/#contact">Contact Me</a>
                    </div>
                    <button className="pd-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* MOBILE DRAWER */}
            <div className={`pd-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
                <button className="pd-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <a href="/all-work" onClick={() => setMenuOpen(false)}>All Projects</a>
                <a href="/#about" onClick={() => setMenuOpen(false)}>About Me</a>
                <a href="/#work" onClick={() => setMenuOpen(false)}>Work Highlights</a>
                <a href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <a href="/#insights" onClick={() => setMenuOpen(false)}>Blog</a>
                <a href="/#workshops" onClick={() => setMenuOpen(false)}>Workshops</a>
                <a className="pd-drawer-cta" href="/#contact" onClick={() => setMenuOpen(false)}>Contact Me</a>
            </div>

            <div className="pd-hero" style={{background: project.bg}}>
                <div className="pd-hero-inner">
                    <div className="pd-hero-ghost">{slug.toUpperCase()}</div>
                    <div className="pd-cat pd-rv">{project.category}</div>
                    <h1 className="pd-title pd-rv">{project.title}</h1>
                    <div className="pd-meta-row pd-rv">
                        {[["Client",project.client],["Industry",project.industry],["Services",project.services]].map(([l,v]) => (
                            <div key={l}><div className="pd-meta-l">{l}</div><div className="pd-meta-v">{v}</div></div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pd-cover pd-rv">
                <div className="pd-cover-wrap">
                    {coverImg
                        ? <img src={coverImg} alt={`${project.title} — cover`} />
                        : <div className="pd-cover-fallback" style={{background: project.bg}} />
                    }
                </div>
            </div>

            <div className="pd-body">
                <div className="pd-body-inner">
                    {project.overview && (
                        <div className="pd-sec pd-rv">
                            <div className="pd-sec-label">About the Project</div>
                            <h2 className="pd-sec-title">Overview</h2>
                            {renderRichText(project.overview)}
                        </div>
                    )}
                    <div className="pd-sec pd-rv">
                        <div className="pd-sec-label">Overview</div>
                        <h2 className="pd-sec-title">The Challenge</h2>
                        {renderRichText(project.challenge)}
                    </div>
                    {project.approach && (
                        <div className="pd-sec pd-rv">
                            <div className="pd-sec-label">Process</div>
                            <h2 className="pd-sec-title">The Approach</h2>
                            {renderRichText(project.approach)}
                        </div>
                    )}
                    <div className="pd-sec pd-rv">
                        <div className="pd-sec-label">Approach</div>
                        <h2 className="pd-sec-title">The Solution</h2>
                        {renderRichText(project.solution)}
                    </div>
                    <div className="pd-sec pd-rv">
                        <div className="pd-sec-label">Results</div>
                        <h2 className="pd-sec-title">The Impact</h2>
                        {renderRichText(project.impact)}
                        {project.figmaUrl && (
                            <a className="pd-figma-cta" href={project.figmaUrl} target="_blank" rel="noopener noreferrer">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M5 5.5A3.5 3.5 0 018.5 2H12v7H8.5A3.5 3.5 0 015 5.5zM12 2h3.5a3.5 3.5 0 010 7H12V2zm0 8.5h3.5a3.5 3.5 0 110 7H12v-7zm-7 3.5A3.5 3.5 0 018.5 10.5H12v7H8.5A3.5 3.5 0 015 14zm7 3.5v3.5a3.5 3.5 0 107-0H12z"/></svg>
                                View on Figma Community →
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {mockImg1 && (
                <div className="pd-showcase pd-rv">
                    <div className="pd-showcase-wrap">
                        <img src={mockImg1} alt={`${project.title} — screen 1`} />
                    </div>
                </div>
            )}
            {mockImg2 && (
                <div className="pd-showcase pd-rv">
                    <div className="pd-showcase-wrap">
                        <img src={mockImg2} alt={`${project.title} — screen 2`} />
                    </div>
                </div>
            )}
            {mockImg3 && (
                <div className="pd-showcase pd-rv">
                    <div className="pd-showcase-wrap">
                        <img src={mockImg3} alt={`${project.title} — screen 3`} />
                    </div>
                </div>
            )}
            {mockImg4 && (
                <div className="pd-showcase pd-rv">
                    <div className="pd-showcase-wrap">
                        <img src={mockImg4} alt={`${project.title} — screen 4`} />
                    </div>
                </div>
            )}
            {mockImg5 && (
                <div className="pd-showcase pd-rv">
                    <div className="pd-showcase-wrap">
                        <img src={mockImg5} alt={`${project.title} — screen 5`} />
                    </div>
                </div>
            )}

            {nextProject && (
                <div className="pd-next">
                    <div className="pd-next-inner">
                        <div className="pd-next-preview">
                            {nextProject.coverSrc && (
                                <img src={nextProject.coverSrc} alt={nextProject.title} style={{width:"100%",height:"100%",objectFit:"cover",display:"block",transform:"scale(1.05)"}} />
                            )}
                            <div className="pd-next-preview-overlay">
                                <div className="pd-next-preview-cat">{nextProject.category}</div>
                                <div className="pd-next-preview-name">{nextProject.title}</div>
                            </div>
                        </div>
                        <div className="pd-next-info">
                            <div className="pd-next-tag">Next Project</div>
                            <div className="pd-next-title">{nextProject.title}</div>
                            <p className="pd-next-desc">{nextProject.desc}</p>
                            <div className="pd-next-actions">
                                <a className="pd-btn" href={`/all-work/${project.next}`}>View Project →</a>
                                <a className="pd-ghost-btn" href="/all-work">All Work</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <footer className="pd-foot">
                <div className="pd-foot-inner">
                    <a className="pd-flogo" href="/">JADEY<span>.</span></a>
                    <div className="pd-fcopy">© 2025 Jane Dhell Cagas. All rights reserved.</div>
                    <div className="pd-flinks">
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a href="/#contact">Contact</a>
                        <a className="pd-fall" href="/all-work">All Projects →</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
