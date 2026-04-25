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
.pd-nav-r{display:flex;align-items:center;gap:14px}
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
`

const PROJECTS: Record<string, any> = {
    "advante":        { title:"Advante",                        category:"UI/UX DESIGN",  client:"Advante",         industry:"Coaching & HR Technology",   services:"UI/UX Design, Website",           figmaUrl:"",        desc:"Coaching platform website — orbital hero, trust-building layout, and seamless conversion flow.",                                        bg:"linear-gradient(135deg,#2E1050,#6B3FA0)", challenge:"Advante, an executive coaching platform for remote teams, needed a website that clearly positioned their services while converting visitors into trial participants. The challenge was making expert coaching feel accessible and urgent — without losing the professional credibility required for enterprise buyers.", solution:"I designed a clean, light-themed landing page anchored by an orbital hero element — a circular team photo with floating advisor avatars — that immediately communicates the human connection at the heart of Advante's offering. The navy, yellow, and white palette gives the page authority and warmth. Key sections — Services, Free Coaching Trial, and Events — are structured to progressively build trust and drive action, with a sticky offer panel that follows users through deeper sections.", impact:"The redesigned page effectively communicates Advante's dual value: organisational-level coaching and individual mental health support. The sticky offer panel and event listings create multiple conversion touchpoints, helping the team grow their coaching trial pipeline and build community around their programs.", coverSrc:"/Advante%20Landing%20Page%20Banner%20Showcase%20-%20Main.png", mockup1:"/Advante%20Landing%20Page%20Banner%20Showcase%20-%202nd.png", mockup2:"/Advante%20Landing%20Page%20Banner%20Showcase%20-%203rd.png", mockup3:"", mockup4:"", mockup5:"", next:"brandsonic" },
    "brandsonic":     { title:"BrandSonic",                      category:"WEB DESIGN",     client:"BrandSonic",      industry:"Podcasting & Audio Branding", services:"UI/UX Design, Website, Brand Design", figmaUrl:"",       desc:"All-in-one podcast creation service — use the power of audio to build your brand.",                                                      bg:"linear-gradient(135deg,#0808A8,#2222CC)", challenge:"BrandSonic, an all-in-one podcast creation service, needed a landing page that made their offering immediately compelling to brands wanting to grow through audio. The challenge was making a multi-service platform feel approachable and credible — not overwhelming — while clearly communicating the value of thought leadership through podcasting.", solution:"Designed a dark, bold landing page anchored by the headline 'Use the power of audio to build your brand.' Services — great production quality, expert storytelling team, and all-in-one podcast creation — are structured in a clean scrollable layout. A case study section featuring TalentStories adds real-world social proof and makes the service tangible for prospective clients.", impact:"The page gives BrandSonic a confident digital presence that clearly communicates their end-to-end offer, helping the brand attract clients looking to grow authority through podcasting.", coverSrc:"/BrandSonic%20Landing%20Page%20Banner%20Showcase%20-%20Main.png", mockup1:"/BrandSonic%20Landing%20Page%20Banner%20Showcase%20-%202nd.png", mockup2:"/BrandSonic%20Landing%20Page%20Banner%20Showcase%20-%203rd.png", mockup3:"/BrandSonic%20Landing%20Page%20Banner%20Showcase%20-%204th.png", mockup4:"", mockup5:"", next:"devluvs" },
    "devluvs":        { title:"DevLuvs",                         category:"UI/UX DESIGN",  client:"DevLuvs",         industry:"Developer Tools & Documentation", services:"UI/UX Design, Website",           figmaUrl:"",      desc:"Online developer's documentation notebook — clean, minimal, built for how devs actually work.",                                          bg:"linear-gradient(135deg,#1E1E2E,#3A3A80)", challenge:"DevLuvs — an online developer's notebook for documentation — needed a landing page that communicated simplicity and utility without feeling generic. The challenge was designing something clean enough for developers who hate clutter, while making the sign-up flow frictionless.", solution:"Designed a clean, minimal landing page leading with 'DevLuvs Documentation — An online developer's notebook.' A light card-based hero layout keeps the focus on the product benefit and the email capture. Purple accents add subtle personality without distraction. The overall aesthetic is honest and developer-appropriate: no fluff, just clarity.", impact:"The clean, no-nonsense design communicates the product's value clearly, reducing friction for developer sign-ups and giving the platform a credible first impression.", coverSrc:"/DevLuvs%20Landing%20Page%20Banner%20Showcase%20-%20Main.png", mockup1:"/DevLuvs%20Landing%20Page%20Banner%20Showcase%20-%202nd.png", mockup2:"/DevLuvs%20Landing%20Page%20Banner%20Showcase%20-%203rd.png", mockup3:"", mockup4:"", mockup5:"", next:"future-founders" },
    "future-founders":{ title:"Future Founders",                 category:"UI/UX DESIGN",  client:"Future Founders", industry:"Venture Building & Entrepreneurship", services:"UI/UX Design, Website",           figmaUrl:"",  desc:"Venture building community platform — dark, bold, and built for founders shaping the future of work.",                                   bg:"linear-gradient(135deg,#080810,#1A0030)", challenge:"Future Founders, a venture building platform, needed a landing page that immediately conveyed ambition and credibility to aspiring founders. The challenge was translating a broad 'future of work' mission into a focused, compelling digital experience that drove community sign-ups.", solution:"Designed a dramatic dark-themed page with bold, high-contrast typography — 'Join us in shaping the future of work' — that speaks directly to ambitious, purpose-driven founders. A structured Venture Building section makes the platform's offering concrete, and the overall visual language communicates that this is not just another startup program.", impact:"The focused, high-impact design positions Future Founders as a serious platform for ambitious entrepreneurs, strengthening community credibility and driving membership growth.", coverSrc:"/Future%20Founders%20Landing%20Page%20Banner%20Showcase%20-%20Main.png", mockup1:"/Future%20Founders%20Landing%20Page%20Banner%20Showcase%20-%202nd.png", mockup2:"/Future%20Founders%20Landing%20Page%20Banner%20Showcase%20-%203rd.png", mockup3:"", mockup4:"", mockup5:"", next:"incremental" },
    "incremental":    { title:"Incremental",                     category:"UI/UX DESIGN",  client:"Incremental",     industry:"Newsletter & Email Marketing", services:"UI/UX Design, Website, Brand Design", figmaUrl:"", desc:"Newsletter platform — connect your writing app to your email delivery and unshackle your newsletter.",                                  bg:"linear-gradient(135deg,#B88000,#E6AA00)", challenge:"Incremental, a platform that bridges writing apps with email delivery services, needed a landing page that made a technical integration feel simple, exciting, and worthwhile for content creators. The challenge was turning a functional product into a brand people actually want to sign up for.", solution:"Designed an energetic bright yellow page with bold illustration-driven hero — a friendly character working at a desk connecting writing to email tools. The headline 'Unshackle Your Newsletter' immediately speaks to the creator's frustration. Clean navigation with Features, Pricing, FAQ, and Blog reduces decision friction, and a single 'Get started for free' CTA keeps the conversion path clear.", impact:"The distinctive yellow-and-white aesthetic gives Incremental an ownable identity in a crowded newsletter tools market, helping the product stand out and attract sign-ups from writers and creators.", coverSrc:"/Incremental%20Landing%20Page%20Banner%20Showcase%20-%20Main.png", mockup1:"/Incremental%20Landing%20Page%20Banner%20Showcase%20-%202nd.png", mockup2:"/Incremental%20Landing%20Page%20Banner%20Showcase%20-%203rd.png", mockup3:"", mockup4:"", mockup5:"", next:"login-signup" },
    "login-signup":   { title:"Login and Signup Template Kit",  category:"TEMPLATE KIT",  client:"Figma Community", industry:"Design Resources",           services:"UI/UX Design, Template Kit",      figmaUrl:"https://www.figma.com/community/file/1250723919479373045",  desc:"Complete authentication UI kit — multiple screen styles, light and dark modes, ready to use.",                                            bg:"linear-gradient(135deg,#0A1060,#1A2FAA)", challenge:"Create a free, high-quality authentication UI kit that covers the full range of login and signup patterns designers encounter — flexible enough to adapt to any product, polished enough to use out of the box.", solution:"Built a comprehensive set of authentication screens displayed in a bold isometric showcase — covering Create Account, Sign In, and Welcome flows across multiple layouts. The kit includes blue-branded and neutral variations with both light and dark modes, giving designers a ready-to-customize foundation for any product's authentication experience.", impact:"Became one of the top-rated free authentication UI resources on Figma Community, downloaded by thousands of designers and used across a wide range of real products.", coverSrc:"/Login%20and%20Signup%20Template%20Kit%20-%20Main.png", mockup1:"/Login%20and%20Signup%20Template%20Kit%20-%202nd.jpg", mockup2:"/Login%20and%20Signup%20Template%20Kit%20-%203rd.jpg", mockup3:"/Login%20and%20Signup%20Template%20Kit%20-%204th.jpg", mockup4:"/Login%20and%20Signup%20Template%20Kit%20-%205th.jpg", mockup5:"", next:"reviv" },
    "reviv":          { title:"Reviv",                           category:"UI/UX DESIGN",  client:"Reviv",           industry:"Health & Wellness / Medical Devices", services:"UI/UX Design, Website",           figmaUrl:"", desc:"Oral health device landing page — premium, dark, with bold before/after storytelling and a money-back hook.",                             bg:"linear-gradient(135deg,#0A0A0A,#1A1000)", challenge:"Reviv, makers of an advanced oral health and wellness device addressing TMJ, aging, fatigue, and brain fog, needed a landing page that built trust fast. Their bold claim — 'We Fix Lots of Stuff... Or Your Money Back' — required a design that backed it up with authority, empathy, and transparent social proof.", solution:"Designed a dark, premium landing page anchored by the gold REVIV logo and bold product photography. A direct, confident headline is supported by a clear benefits checklist and compelling before/after imagery that shows real transformation from 2014 to 2016. The structured nav — My Story, Social Proof, Benefits, What You Get, Guarantee, FAQ, Education — guides visitors through a complete trust-building journey, with 'Purchase Now' as the clear action.", impact:"The premium aesthetic and direct conversion structure gave Reviv a landing page that communicates both authority and accessibility — matching the quality of the product and reducing buyer hesitation.", coverSrc:"/Reviv%20Landing%20Page%20Banner%20Showcase%20-%20Main.png", mockup1:"/Reviv%20Landing%20Page%20Banner%20Showcase%20-%202nd.png", mockup2:"/Reviv%20Landing%20Page%20Banner%20Showcase%20-%203rd.png", mockup3:"/Reviv%20Landing%20Page%20Banner%20Showcase%20-%204th.png", mockup4:"", mockup5:"", next:"scaleforge" },
    "scaleforge":     { title:"ScaleForge",                      category:"UI/UX DESIGN",  client:"ScaleForge",      industry:"Technology Solutions / B2B",  services:"UI/UX Design, Website, Brand Design", figmaUrl:"",       desc:"Tech solutions company — scalable, reliable, metrics-driven, and rooted in strong company values.",                                      bg:"linear-gradient(135deg,#100000,#2A0000)", challenge:"ScaleForge, a company delivering scalable technology solutions for growing businesses, needed a landing page that communicated technical strength while also feeling human and values-driven — appealing to decision-makers who care about reliability, long-term partnership, and organizational culture.", solution:"Designed a bold dark page with red accent highlights and a powerful opening headline — 'Scalable technology solutions for growing businesses.' Key proof points (20+ integrations, 3x performance, 99.9% uptime) build immediate technical credibility. A company values section — Infinite Curiosity, Masterful Craftmanship, Adaptive Resilience, Relentless Innovation, Unwavering Integrity — positions ScaleForge as a principled, people-first technology partner.", impact:"The page effectively balances technical authority with cultural depth, giving ScaleForge a compelling digital front door that resonates with both technical evaluators and business decision-makers.", coverSrc:"/ScaleForge%20Landing%20Page%20Banner%20Showcase%20-%20Main.png", mockup1:"/ScaleForge%20Landing%20Page%20Banner%20Showcase%20-%202nd.png", mockup2:"/ScaleForge%20Landing%20Page%20Banner%20Showcase%20-%203rd.png", mockup3:"/ScaleForge%20Landing%20Page%20Banner%20Showcase%20-%204th.png", mockup4:"", mockup5:"", next:"starseekr" },
    "starseekr":      { title:"Starseekr",                       category:"UI/UX DESIGN",  client:"Starseekr",       industry:"HR & Recruitment",           services:"UI/UX Design, Website, Brand Design", figmaUrl:"",     desc:"Recruitment platform — helping businesses find their next star employee with expertise and precision.",                                   bg:"linear-gradient(135deg,#3B0090,#6600CC)", challenge:"Starseekr, a recruitment agency specializing in connecting businesses with top candidates, needed a landing page that felt modern and distinctive — standing apart from generic HR platforms while clearly communicating their thorough, client-focused approach to hiring.", solution:"Designed a vibrant purple-themed landing page anchored by the bold headline 'Helping You Find Your Next Star Employee.' A structured services grid — Expertise, Tailored Solutions, Precision, Exceptional Customer Service, and Passion — communicates the agency's comprehensive process. A geometric brand motif and office imagery reinforce the professional, results-oriented identity throughout.", impact:"The bold, distinctive purple design gives Starseekr a memorable brand presence in a crowded recruitment market, clearly communicating expertise and attracting new business clients.", coverSrc:"/Starseekr%20Landing%20Page%20Banner%20Showcase%20-%20Main.png", mockup1:"/Starseekr%20Landing%20Page%20Banner%20Showcase%20-%202nd.png", mockup2:"/Starseekr%20Landing%20Page%20Banner%20Showcase%20-%203rd.png", mockup3:"/Starseekr%20Landing%20Page%20Banner%20Showcase%20-%204th.png", mockup4:"", mockup5:"", next:"advante" },
}

export default function ProjectDetailPage({ slug }: { slug: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const [navScroll, setNavScroll] = useState(false)

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
                    </div>
                </nav>
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
                </div>
            </nav>

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
                    <div className="pd-sec pd-rv">
                        <div className="pd-sec-label">Overview</div>
                        <h2 className="pd-sec-title">The Challenge</h2>
                        <p className="pd-sec-body">{project.challenge}</p>
                    </div>
                    <div className="pd-sec pd-rv">
                        <div className="pd-sec-label">Approach</div>
                        <h2 className="pd-sec-title">The Solution</h2>
                        <p className="pd-sec-body">{project.solution}</p>
                    </div>
                    <div className="pd-sec pd-rv">
                        <div className="pd-sec-label">Results</div>
                        <h2 className="pd-sec-title">The Impact</h2>
                        <p className="pd-sec-body">{project.impact}</p>
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
