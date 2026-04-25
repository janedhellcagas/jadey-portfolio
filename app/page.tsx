'use client'
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

export function LoadFonts() {
    return (
        <>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
            />
            <style>{CSS}</style>
        </>
    )
}

const CSS = `
:root{--bg:#0a0a08;--bg2:#111110;--paper:#f0ebe0;--paper2:#e8e2d5;--pu:#9B59D0;--pu2:#B07AE0;--pu3:#7A3AB8;--muted:rgba(240,235,224,0.38);--border:rgba(240,235,224,0.12);--pborder:rgba(155,89,208,0.3);--pbg:rgba(155,89,208,0.08);--max:1440px;--pad:44px}
.jp*{box-sizing:border-box;margin:0;padding:0}
.jp{font-family:'Space Mono',monospace;background:var(--bg);color:var(--paper);overflow-x:hidden;width:100%;min-height:100vh}
.jp::before{content:'';position:fixed;inset:0;z-index:9997;pointer-events:none;opacity:.04;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px}
.jp-cur{position:fixed;width:12px;height:12px;background:var(--pu);border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);mix-blend-mode:difference}
.jp-cur2{position:fixed;width:40px;height:40px;border:1px solid var(--pu);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:left .12s ease,top .12s ease;mix-blend-mode:difference}
/* NAV — full bleed bg, inner content capped + centered */
.jp-nav{position:fixed;top:0;left:0;right:0;z-index:500;background:rgba(10,10,8,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:top .3s}
.jp-nav-inner{max-width:var(--max);margin:0 auto;padding:18px var(--pad);display:flex;align-items:center;justify-content:space-between}
.jp-logo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.jp-logo span{color:var(--pu)}
.jp-nav-r{display:flex;align-items:center;gap:14px}
.jp-nav-r a{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.jp-nav-r a:hover{color:var(--pu)}
.jp-nav-contact{background:var(--pu)!important;color:var(--bg)!important;padding:9px 20px!important;font-weight:700!important;border:2px solid var(--pu)!important;display:inline-block!important}
.jp-nav-contact:hover{background:var(--pu2)!important;border-color:var(--pu2)!important}
.jp-ndot{width:7px;height:7px;background:var(--pu);border-radius:50%;animation:jp-pulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes jp-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.85)}}
.jp-abar{position:fixed;top:0;left:0;right:0;z-index:499;background:var(--pu3);padding:9px var(--pad);height:38px;display:none;align-items:center;justify-content:center;gap:8px}
.jp-abar.show{display:flex}
.jp-abar span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:white;font-weight:700}
.jp-adot{width:5px;height:5px;background:white;border-radius:50%;animation:jp-pulse 2s ease-in-out infinite}
/* HERO */
.jp-hero{min-height:100vh;display:grid;grid-template-rows:1fr auto;position:relative;overflow:hidden}
.jp-hero-bg{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(80px,16vw,240px);letter-spacing:-8px;color:rgba(240,235,224,0.022);white-space:nowrap;pointer-events:none;user-select:none}
.jp-hero-c{display:flex;flex-direction:column;justify-content:flex-end;padding:130px var(--pad) 0;max-width:var(--max);margin:0 auto;width:100%}
.jp-h-eye{display:flex;align-items:center;gap:12px;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin-bottom:20px}
.jp-h-eye::before{content:'';width:36px;height:1px;background:var(--pu)}
.jp-h1{font-family:'Bebas Neue',sans-serif;letter-spacing:-2px;color:var(--paper);line-height:.88}
.jp-h1-name{font-size:clamp(72px,13vw,180px);display:block}
.jp-h1-tag{font-size:clamp(28px,4.5vw,64px);display:block;color:var(--pu)}
.jp-h1-sub{font-size:clamp(24px,3.5vw,52px);display:block;-webkit-text-stroke:1.5px var(--paper);color:transparent}
.jp-hero-bot{border-top:1px solid var(--border);margin-top:36px}
.jp-hero-bot-inner{max-width:var(--max);margin:0 auto;padding:36px var(--pad) 56px;display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:20px}
.jp-hdesc{font-size:12px;line-height:1.9;color:var(--muted);max-width:320px}
.jp-hact{display:flex;gap:14px;align-items:center}
.jp-blime{background:var(--pu);color:var(--bg);padding:13px 30px;border:2px solid var(--pu);font-family:'Space Mono',monospace;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;display:inline-block;transition:background .2s;cursor:pointer}
.jp-blime:hover{background:var(--pu2);border-color:var(--pu2)}
.jp-bghost{border:2px solid var(--border);color:var(--muted);padding:13px 30px;font-family:'Space Mono',monospace;font-size:11px;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:all .2s;background:transparent;text-decoration:none;display:inline-block}
.jp-bghost:hover{border-color:var(--pu);color:var(--pu)}
.jp-hstats{display:flex;gap:44px}
.jp-sn{font-family:'Bebas Neue',sans-serif;font-size:48px;letter-spacing:-1px;line-height:1;color:var(--paper)}
.jp-sl{font-size:9px;letter-spacing:.15em;text-transform:uppercase;color:var(--muted);margin-top:2px}
/* MARQUEE */
.jp-mq{background:var(--pu);padding:13px 0;overflow:hidden;white-space:nowrap}
.jp-mq-t{display:inline-flex;animation:jp-mq 18s linear infinite}
.jp-mq-i{font-family:'Bebas Neue',sans-serif;font-size:17px;letter-spacing:4px;color:var(--bg);padding:0 28px}
@keyframes jp-mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
/* SECTIONS — all use inner wrapper for max-width centering */
.jp section{padding:0;position:relative}
.jp-section-inner{max-width:var(--max);margin:0 auto;padding:110px var(--pad)}
.jp-sl-tag{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:14px}
.jp-sl-tag::after{content:'';width:48px;height:1px;background:var(--pu)}
.jp-st{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,8vw,105px);letter-spacing:-1px;line-height:.9;color:var(--paper)}
.jp-st em{color:var(--pu);font-style:normal}
.jp-s-intro{font-size:12px;color:var(--muted);line-height:1.9;max-width:440px}
/* SERVICES */
.jp-services{background:var(--bg2);clip-path:polygon(0 56px,100% 0,100% calc(100% - 56px),0 100%)}
.jp-services .jp-section-inner{padding:150px var(--pad)}
.jp-sg{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border:1px solid var(--border);margin-top:60px}
.jp-sv{background:var(--bg2);padding:40px 32px;position:relative;overflow:hidden;transition:background .25s}
.jp-sv::after{content:attr(data-n);position:absolute;bottom:-16px;right:8px;font-family:'Bebas Neue',sans-serif;font-size:88px;color:rgba(155,89,208,0.05);line-height:1;pointer-events:none}
.jp-sv:hover{background:#17171a}
.jp-sv-ic{font-size:28px;margin-bottom:18px;display:block}
.jp-sv h3{font-family:'Bebas Neue',sans-serif;font-size:24px;letter-spacing:1px;color:var(--paper);margin-bottom:9px}
.jp-sv p{font-size:11px;line-height:1.8;color:var(--muted)}
.jp-sv-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:18px}
.jp-sv-tag{font-size:9px;padding:3px 9px;border:1px solid var(--pborder);color:var(--pu);letter-spacing:.04em}
/* WORK */
.jp-work-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:56px;flex-wrap:wrap;gap:20px}
.jp-wmas{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-bottom:0}
.jp-wc{border:1px solid var(--border);overflow:hidden;transition:transform .3s,border-color .3s;text-decoration:none;display:flex;flex-direction:column}
.jp-wc:hover{transform:translate(-4px,-4px);border-color:var(--pu)}
.jp-wt{width:100%;aspect-ratio:4/3;position:relative;overflow:hidden;flex-shrink:0}
.jp-wt img{width:100%;height:100%;display:block;object-fit:cover;transform:scale(1.05)}
.jp-wo{position:absolute;inset:0;background:rgba(74,22,130,0.84);opacity:0;transition:opacity .3s;display:flex;align-items:center;justify-content:center}
.jp-wc:hover .jp-wo{opacity:1}
.jp-octa{font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:3px;color:white;border:1px solid white;padding:9px 24px}
.jp-wi{padding:18px 22px;border-top:1px solid var(--border);flex:1;display:flex;flex-direction:column}
.jp-wcat{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--pu);margin-bottom:5px}
.jp-wtit{font-family:'Bebas Neue',sans-serif;font-size:21px;letter-spacing:.5px;color:var(--paper)}
.jp-wdesc{font-size:10px;color:var(--muted);margin-top:5px;line-height:1.7}
.jp-see-all{text-align:center;margin-top:52px}
/* ABOUT */
.jp-about{background:var(--paper);clip-path:polygon(0 0,100% 56px,100% 100%,0 calc(100% - 56px))}
.jp-about .jp-section-inner{padding:170px var(--pad)}
.jp-about .jp-sl-tag{color:var(--bg)}.jp-about .jp-sl-tag::after{background:var(--bg)}.jp-about .jp-st{color:var(--bg)}.jp-about .jp-st em{color:var(--pu3)}
.jp-alay{display:grid;grid-template-columns:1fr 1.2fr;gap:72px;align-items:start;margin-top:60px}
.jp-amug{width:100%;aspect-ratio:4/5;background:var(--paper2);border:1px solid rgba(10,10,8,.15);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.jp-amug-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top;display:block}
.jp-amug-b{position:absolute;bottom:0;left:0;right:0;background:var(--bg);padding:18px 24px;display:flex;justify-content:space-between;align-items:center}
.jp-amug-l{font-family:'Bebas Neue',sans-serif;font-size:28px;letter-spacing:1px;color:var(--paper)}
.jp-amug-r{font-size:9px;color:var(--muted);text-align:right;line-height:1.6}
.jp-ar p{font-size:12px;line-height:1.9;color:rgba(10,10,8,.65);margin-bottom:18px}
.jp-sk-row{display:flex;flex-wrap:wrap;gap:7px;margin-top:24px}
.jp-sk{padding:6px 14px;border:1px solid rgba(10,10,8,.18);font-size:10px;letter-spacing:.05em;color:rgba(10,10,8,.55)}
.jp-tl-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
.jp-tl{background:rgba(155,89,208,0.08);padding:8px 14px;font-size:10px;font-weight:700;color:var(--pu3);letter-spacing:.05em;border:1px solid rgba(155,89,208,0.2)}
.jp-ar h4{font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:2px;color:var(--bg);margin-top:28px;margin-bottom:10px}
/* PROCESS */
.jp-ptrack{display:grid;grid-template-columns:repeat(5,1fr);margin-top:60px;position:relative}
.jp-ptrack::before{content:'';position:absolute;top:26px;left:10%;right:10%;height:1px;background:var(--border)}
.jp-ps{text-align:center;padding:0 16px;position:relative}
.jp-pn{width:52px;height:52px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:1px;color:var(--muted);margin:0 auto 20px;position:relative;z-index:1;background:var(--bg);transition:all .25s}
.jp-ps:hover .jp-pn{background:var(--pu);color:var(--bg);border-color:var(--pu)}
.jp-pt{font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:2px;color:var(--paper);margin-bottom:7px}
.jp-pd{font-size:10px;color:var(--muted);line-height:1.7}
/* TESTIMONIALS */
.jp-tslider{position:relative;margin-top:60px}
.jp-tslider-viewport{overflow:hidden;width:100%}
.jp-ttrack{display:flex;transition:transform .5s cubic-bezier(.4,0,.2,1);align-items:stretch}
.jp-tslide{min-width:100%;display:grid;grid-template-columns:1.5fr 1fr;grid-template-rows:repeat(3,auto);gap:16px;align-items:stretch}
.jp-tslide>:nth-child(1){grid-column:1;grid-row:1/4}
.jp-tslide>:nth-child(2){grid-column:2;grid-row:1}
.jp-tslide>:nth-child(3){grid-column:2;grid-row:2}
.jp-tslide>:nth-child(4){grid-column:2;grid-row:3}
.jp-tc{background:var(--bg2);padding:28px;display:flex;flex-direction:column;border:1px solid var(--border)}
.jp-tc.big{background:var(--pu);border-color:var(--pu)}
.jp-tc.big .jp-tq{color:rgba(10,10,8,.85)}.jp-tc.big .jp-tan{color:var(--bg)}.jp-tc.big .jp-tar{color:rgba(10,10,8,.5)}.jp-tc.big .jp-tstar{color:var(--bg)}
.jp-tstar{font-size:11px;color:var(--pu);letter-spacing:3px;margin-bottom:12px}
.jp-tq{font-size:11px;line-height:1.8;color:var(--muted);font-style:italic;margin-bottom:18px;flex:1}
.jp-ta-w{display:flex;align-items:center;gap:12px;margin-top:auto}
.jp-tav{width:44px;height:44px;border-radius:50%;overflow:hidden;flex-shrink:0;border:2px solid rgba(240,235,224,0.15)}
.jp-tav img{width:100%;height:100%;object-fit:cover;display:block}
.jp-tc.big .jp-tav{border-color:rgba(10,10,8,0.2)}
.jp-tan{font-size:11px;font-weight:700;color:var(--paper)}
.jp-tar{font-size:10px;color:var(--muted)}
.jp-tcontrols{display:flex;align-items:center;gap:16px;margin-top:20px;justify-content:center}
.jp-tarr{width:44px;height:44px;border:1px solid var(--border);background:transparent;color:var(--muted);font-family:'Bebas Neue',sans-serif;font-size:20px;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;padding:0}
.jp-tarr:hover{border-color:var(--pu);color:var(--pu)}
.jp-tdots{display:flex;gap:8px}
.jp-tdot{width:8px;height:8px;border-radius:50%;background:var(--border);border:none;cursor:pointer;transition:all .2s;padding:0}
.jp-tdot.on{background:var(--pu);transform:scale(1.2)}
/* HANDBOOK */
.jp-handbook{display:flex;gap:40px;align-items:center;padding:44px;background:var(--bg2);border:1px solid var(--pborder);margin-top:60px;margin-bottom:28px}
.jp-handbook-cover{width:200px;flex-shrink:0;border-radius:6px;overflow:hidden;box-shadow:0 24px 64px rgba(0,0,0,.7)}
.jp-handbook-cover img{width:100%;display:block;border-radius:6px}
.jp-handbook-cover-fallback{width:200px;height:260px;background:linear-gradient(135deg,#3A1060,#7A3AB8);border-radius:6px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px}
.jp-handbook-cover-fallback span{font-family:'Bebas Neue',sans-serif;font-size:48px;letter-spacing:-2px;color:rgba(240,235,224,0.3)}
.jp-handbook-left{flex:1}
.jp-handbook-tag{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:8px}
.jp-handbook-tag::after{content:'';width:28px;height:1px;background:var(--pu)}
.jp-handbook-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,52px);letter-spacing:-1px;line-height:.95;color:var(--paper);margin-bottom:14px}
.jp-handbook-desc{font-size:11px;line-height:1.9;color:var(--muted);max-width:360px}
.jp-handbook-right{display:flex;flex-direction:column;align-items:flex-start;gap:12px;flex-shrink:0}
.jp-dl-btn{background:var(--pu);color:var(--bg);padding:14px 32px;border:2px solid var(--pu);font-family:'Space Mono',monospace;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:10px}
.jp-dl-btn:hover{background:var(--pu2);border-color:var(--pu2)}
.jp-dl-note{font-size:9px;color:var(--muted)}
/* ARTICLES */
.jp-articles-row{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.jp-bc{border:1px solid var(--border);overflow:hidden;transition:transform .3s,border-color .3s;display:block;text-decoration:none}
.jp-bc:hover{transform:translate(-4px,-4px);border-color:var(--pu)}
.jp-bbd{padding:24px}
.jp-bmeta{display:flex;gap:8px;align-items:center;margin-bottom:9px}
.jp-btag{font-size:8px;padding:3px 9px;letter-spacing:.1em;text-transform:uppercase;font-weight:700}
.jp-bdate{font-size:9px;color:var(--muted)}
.jp-bc h3{font-family:'Bebas Neue',sans-serif;font-size:clamp(15px,2vw,22px);letter-spacing:.5px;color:var(--paper);line-height:1.15;margin-bottom:8px}
.jp-bc p{font-size:10px;color:var(--muted);line-height:1.7}
.jp-bfoot{display:flex;justify-content:space-between;align-items:center;margin-top:16px}
.jp-btime{font-size:9px;color:var(--muted)}
.jp-blink{font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--pu)}
/* RESOURCES */
.jp-resources{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;margin-top:44px}
.jp-rcard{display:flex;align-items:center;gap:16px;padding:20px 24px;border:1px solid var(--border);text-decoration:none;transition:all .2s;background:var(--bg2)}
.jp-rcard:hover{border-color:var(--pu);transform:translate(-3px,-3px)}
.jp-ricon{width:40px;height:40px;background:var(--pbg);border:1px solid var(--pborder);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:18px}
.jp-rinfo{flex:1;min-width:0}
.jp-rtitle{font-size:11px;font-weight:700;color:var(--paper);margin-bottom:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.jp-rsub{font-size:9px;color:var(--muted)}
.jp-rarr{font-size:14px;color:var(--pu)}
/* MARQUEE 2 */
.jp-mq2{background:var(--bg2);padding:18px 0;overflow:hidden;white-space:nowrap;border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.jp-mq2-t{display:inline-flex;animation:jp-mq2 28s linear infinite}
.jp-mq2-i{font-family:'Bebas Neue',sans-serif;font-size:14px;letter-spacing:4px;color:rgba(240,235,224,.18);padding:0 20px}
@keyframes jp-mq2{from{transform:translateX(0)}to{transform:translateX(-50%)}}
/* WORKSHOPS */
.jp-workshops{background:var(--paper);clip-path:polygon(0 56px,100% 0,100% 100%,0 100%)}
.jp-workshops .jp-section-inner{padding:170px var(--pad) 110px}
.jp-workshops .jp-sl-tag{color:var(--bg)}.jp-workshops .jp-sl-tag::after{background:var(--bg)}.jp-workshops .jp-st{color:var(--bg)}.jp-workshops .jp-st em{color:var(--pu3)}
.jp-wkg{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:52px;align-items:stretch}
.jp-wkcard{border:1px solid rgba(10,10,8,.12);overflow:hidden;transition:all .25s;display:flex;flex-direction:column;height:100%}
.jp-wkcard:hover{transform:translate(-3px,-3px);box-shadow:0 12px 32px rgba(107,63,160,0.18);border-color:var(--pu3)}
.jp-wkthumb{width:100%;height:180px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center}
.jp-wkthumb-icon{font-size:48px;position:relative;z-index:1}
.jp-wkthumb-year{font-family:'Bebas Neue',sans-serif;font-size:52px;letter-spacing:-2px;color:rgba(255,255,255,0.1);position:absolute;bottom:-4px;right:8px;line-height:1}
.jp-wkinfo{padding:18px 20px;border-top:1px solid rgba(10,10,8,.1);background:white;flex:1;display:flex;flex-direction:column}
.jp-wkev{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:var(--pu3);font-weight:700;margin-bottom:5px}
.jp-wkname{font-family:'Bebas Neue',sans-serif;font-size:17px;letter-spacing:.5px;color:var(--bg);line-height:1.15;margin-bottom:6px}
.jp-wksupport{font-size:10px;color:rgba(10,10,8,.5);line-height:1.65;flex:1}
/* CONTACT */
.jp-clay{display:grid;grid-template-columns:1fr 1.4fr;gap:64px;align-items:start}
.jp-ci p{font-size:12px;line-height:1.9;color:var(--muted);margin-bottom:28px}
.jp-citem{display:flex;align-items:center;gap:14px;margin-bottom:14px}
.jp-cic{width:36px;height:36px;display:flex;align-items:center;justify-content:center}
.jp-cit{font-size:11px;color:var(--muted)}
.jp-cit a{color:var(--pu);text-decoration:none}
.jp-soc-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:28px}
.jp-socb{border:1px solid var(--border);color:var(--muted);font-size:9px;letter-spacing:.14em;text-transform:uppercase;padding:8px 16px;text-decoration:none;transition:all .2s;background:transparent}
.jp-socb:hover{border-color:var(--pu);color:var(--pu)}
.jp-cf .jp-fg-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}
.jp-fg{margin-bottom:14px}
.jp-fg label{display:block;font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);margin-bottom:7px}
.jp-fg input,.jp-fg select,.jp-fg textarea{width:100%;background:rgba(240,235,224,.04);border:1px solid var(--border);color:var(--paper);font-family:'Space Mono',monospace;font-size:11px;padding:11px 14px;outline:none;transition:border-color .2s;appearance:none}
.jp-fg input:focus,.jp-fg select:focus,.jp-fg textarea:focus{border-color:var(--pu)}
.jp-fg select option{background:var(--bg2);color:var(--paper)}
.jp-fg textarea{height:110px;resize:none}
.jp-bsub{width:100%;background:var(--pu);color:var(--bg);border:none;font-family:'Space Mono',monospace;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:16px;cursor:pointer;transition:background .2s;margin-top:6px}
.jp-bsub:hover{background:var(--pu2)}
.jp-bsub:disabled{opacity:.6;cursor:not-allowed}
/* FOOTER */
.jp-footer{border-top:1px solid var(--border)}
.jp-footer-inner{max-width:var(--max);margin:0 auto;padding:44px var(--pad);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.jp-flogo{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.jp-flogo span{color:var(--pu)}
.jp-fcopy{font-size:9px;color:var(--muted)}
.jp-flinks{display:flex;gap:18px;flex-wrap:wrap;align-items:center}
.jp-flinks a{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.jp-flinks a:hover{color:var(--pu)}
.jp-flinks .jp-fall{color:var(--pu)!important}
.jp-toast{position:fixed;bottom:32px;right:32px;background:var(--pu);color:var(--bg);font-family:'Space Mono',monospace;font-size:11px;font-weight:700;letter-spacing:.08em;padding:14px 24px;z-index:3000;transform:translateY(80px);opacity:0;transition:all .3s;max-width:320px;line-height:1.5}
.jp-toast.show{transform:translateY(0);opacity:1}
.jp-toast.err{background:#c0392b}
.jp-rv{opacity:0;transform:translateY(28px);transition:opacity .7s ease,transform .7s ease}
.jp-rv.in{opacity:1;transform:translateY(0)}
`

const HIGHLIGHTS = [
    {
        slug: "advante",
        img: "/Advante%20Landing%20Page%20Banner%20Showcase%20-%20Main.png",
        label: "UI/UX DESIGN",
        title: "Advante",
        desc: "Executive coaching platform — orbital hero, trust-building layout, and seamless trial conversion.",
    },
    {
        slug: "brandsonic",
        img: "/BrandSonic%20Landing%20Page%20Banner%20Showcase%20-%20Main.png",
        label: "WEB DESIGN",
        title: "BrandSonic",
        desc: "All-in-one podcast creation service — use the power of audio to build your brand.",
    },
    {
        slug: "starseekr",
        img: "/Starseekr%20Landing%20Page%20Banner%20Showcase%20-%20Main.png",
        label: "UI/UX DESIGN",
        title: "Starseekr",
        desc: "Recruitment platform — bold, purple, and built to connect businesses with their next star hire.",
    },
]

const TESTIMONIAL_SLIDES = [
    [
        {
            big: true,
            img: "/A.%20Leroi.png",
            name: "A. Leroi",
            flag: "🇬🇧",
            position: "CEO and Architect",
            q: "It’s been such an enjoyable team work with Jadey. She is extremely responsive, respectful and polite. Despite the time difference, as I am based in the UK. However, Jadey never fails to respond to my messages and email as fast as she could. I would love to continue to work with her and continue to support her. Her punctilious and positive attitude is what my team and I would love to continue this collaboration as long as possible. I do highly recommend Jadey’s services and stewardship.",
        },
        {
            big: false,
            img: "/Dionrie%20L.%20Amomonpon.png",
            name: "Dionrie L. Amomonpon",
            flag: "🇵🇭",
            position: "Graphic Designer at Thinkogic",
            q: "Jane is detail-oriented and can easily identify problems without needing to consult the head. She works efficiently, and the quality of her work is excellent. She’s great to work with—always taking care as a leader by guiding us and offering helpful advice to improve the workflow.",
        },
        {
            big: false,
            img: "/Kent%20Bryan%20Maglinao.jpg",
            name: "Kent Bryan Maglinao",
            flag: "🇵🇭",
            position: "Backend Engineer (Lead) in ScaleForge",
            q: "Jane Dhell is highly dependable, detail-oriented, and always on time. We never had to worry about project timelines because they treated every design requirement and deadline as a firm commitment.",
        },
        {
            big: false,
            img: "/Ronnel%20Yacunas.jpg",
            name: "Ronnel Yacunas",
            flag: "🇵🇭",
            position: "Backend Engineer (Lead) in ScaleForge",
            q: "Jane Dhell is someone you can always rely on to deliver excellent results. Her UI/UX skills make every project both engaging and user-friendly. She pays close attention to detail and consistently raises the quality of the work. Working with her means you'll always get creativity and dependability combined.",
        },
    ],
    [
        {
            big: true,
            img: "/Handy%20Rick%20Thampon.jpg",
            name: "Handy Rick",
            flag: "🇵🇭",
            position: "Backend Engineer in ScaleForge",
            q: "Jane Dhell has a really great eye for detail and always puts the user first. She’s excellent at taking a messy brief and turning it into a clean, intuitive interface that actually works. She’s been a massive help on our projects and is just generally great to collaborate with.",
        },
        {
            big: false,
            img: "/Philip%20John%20Calape.jpg",
            name: "Philip John Calape",
            flag: "🇵🇭",
            position: "Backend Engineer (Lead) in ScaleForge",
            q: "Working with Jadey has always been a great experience. She is a highly talented designer who combines creativity with efficiency, delivering outputs that are both visually impressive and high quality. One of her strongest qualities is her ability to truly understand ideas and bring them to life in a way that often exceeds expectations. She is reliable, detail-oriented, and very easy to collaborate with. If you’re looking for someone who can execute ideas quickly without sacrificing quality, Jadey is definitely someone you can count on.",
        },
        {
            big: false,
            img: "/Jade%20Kenneth%20Darunday.jpg",
            name: "Jade Kenneth Darunday",
            flag: "🇵🇭",
            position: "Frontend Engineer in ScaleForge",
            q: "I’ve had the chance to work closely with Jane Dhell, and as a frontend developer, I really appreciate how thoughtful and precise her UI/UX work is. She has a strong eye for detail and consistently follows solid design principles, which makes implementation smooth and predictable. Her designs are clear, well-structured, and user-focused. On top of that, she works fast without sacrificing quality, which is rare. It’s always easy collaborating with her.",
        },
    ],
]

const WORKSHOPS = [
    {
        ev: "Workshop",
        title: "Figma Animate",
        date: "2024",
        icon: "🎨",
        color: "linear-gradient(135deg,#5A2890,#9B59D0)",
        support:
            "Exploring animation in Figma — transitions, smart animate, and advanced prototyping.",
    },
    {
        ev: "Community",
        title: "CoffeeHours Session",
        date: "2024",
        icon: "☕",
        color: "linear-gradient(135deg,#3A1860,#6B3FA0)",
        support:
            "Casual design discussion and Q&A connecting designers over coffee.",
    },
    {
        ev: "Workshop",
        title: "unbUX Workshop Manila",
        date: "2023",
        icon: "🔍",
        color: "linear-gradient(135deg,#4A2870,#7A50A8)",
        support:
            "Hands-on UX workshop covering user research, journey mapping, and design thinking.",
    },
    {
        ev: "Event",
        title: "First Design HIVE CDO",
        date: "2023",
        icon: "🐝",
        color: "linear-gradient(135deg,#3A1860,#6B4090)",
        support: "Inaugural Design HIVE community event in Cagayan de Oro.",
    },
    {
        ev: "Workshop",
        title: "unbUX-reLUX + erelU 2023",
        date: "2023",
        icon: "🔄",
        color: "linear-gradient(135deg,#2E1050,#5A3690)",
        support:
            "Revisiting UX fundamentals and sharing real-world lessons from design practice.",
    },
    {
        ev: "Conference",
        title: "HIVERS CONNECT MANILA",
        date: "2023",
        icon: "🌐",
        color: "linear-gradient(135deg,#5A2890,#8B5CC8)",
        support:
            "Design community networking connecting Hivers members across the Philippines.",
    },
    {
        ev: "Conference",
        title: "HIVERS CONNECT 2023",
        date: "2023",
        icon: "🤝",
        color: "linear-gradient(135deg,#4A2872,#7A50A8)",
        support:
            "Annual gathering of the Hivers design community — talks, workshops, and collaboration.",
    },
    {
        ev: "Community",
        title: "django girls Workshop 2024",
        date: "2024",
        icon: "💻",
        color: "linear-gradient(135deg,#3A1860,#6B3FA0)",
        support:
            "Empowering women in tech through beginner-friendly design and coding workshops.",
    },
    {
        ev: "Conference",
        title: "INNOVATE 2024 – CDOC",
        date: "2024",
        icon: "💡",
        color: "linear-gradient(135deg,#2E1050,#5A3690)",
        support: "Innovation and design showcase event in CDO.",
    },
]

const RESOURCES = [
    {
        icon: "🎨",
        title: "UI Style Guide Starter Kit",
        sub: "Figma Community · Free",
        url: "https://www.figma.com/community/file/1219594362058612280",
    },
    {
        icon: "📐",
        title: "Landing Page Template Kit",
        sub: "Figma Community · Free",
        url: "https://www.figma.com/community/file/1257872231846009966",
    },
    {
        icon: "🔐",
        title: "Login and Signup Template Kit",
        sub: "Figma Community · Free",
        url: "https://www.figma.com/community/file/1250723919479373045",
    },
    {
        icon: "🎫",
        title: "Hivers Connect 2023 VIP Pass",
        sub: "Figma Community · Free",
        url: "https://www.figma.com/community/file/1250452328605065049",
    },
    {
        icon: "🌐",
        title: "Hivers Connect Manila VIP Pass",
        sub: "Figma Community · Free",
        url: "https://www.figma.com/community/file/1280878484246054150",
    },
]

const PDF_URL =
    "https://drive.google.com/uc?export=download&id=1XLqs0sPuAsNTu-d4FplqjLOxzt9fVCho"
const HANDBOOK_IMG =
    "https://lh3.googleusercontent.com/d/1Hfe4bRlHqkpwMUPzkVQ8akkEGiLvlKJ5"
const WEB3FORMS_KEY = "8e3f5c92-d7a1-4b23-9f1e-2d4c6e8a0b5f"

const GmailIcon = () => (
    <svg width="22" height="22" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M6 40h6V22.8L4 16v20a2 2 0 002 2z" />
        <path fill="#34A853" d="M36 40h6a2 2 0 002-2V16l-8 6.8V40z" />
        <path fill="#4A90D9" d="M36 12l-12 10L12 12 4 16l20 17 20-17z" />
        <path fill="#FBBC05" d="M4 16l8 6.8V12H4z" />
        <path fill="#EA4335" d="M44 16l-8 6.8V12h8z" />
    </svg>
)
const LinkedInIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#0A66C2">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
)
const WhatsAppIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.117.553 4.103 1.522 5.829L.043 23.25a.75.75 0 00.917.914l5.521-1.474A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.953 9.953 0 01-5.096-1.4l-.364-.217-3.276.875.891-3.198-.237-.38A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
)

export default function JadeyPortfolio() {
    const [sendState, setSendState] = useState<
        "idle" | "sending" | "sent" | "error"
    >("idle")
    const [showToast, setShowToast] = useState(false)
    const [toastMsg, setToastMsg] = useState("")
    const [toastErr, setToastErr] = useState(false)
    const [navScroll, setNavScroll] = useState(false)
    const [testiSlide, setTestiSlide] = useState(0)
    const [handbookImgOk, setHandbookImgOk] = useState(true)
    const ref = useRef<HTMLDivElement>(null)
    const c1 = useRef<HTMLDivElement>(null)
    const c2 = useRef<HTMLDivElement>(null)
    const mx = useRef(0),
        my = useRef(0),
        cx = useRef(0),
        cy = useRef(0)
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [projType, setProjType] = useState("")
    const [budget, setBudget] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        const move = (e: MouseEvent) => {
            mx.current = e.clientX
            my.current = e.clientY
            if (c1.current) {
                c1.current.style.left = mx.current + "px"
                c1.current.style.top = my.current + "px"
            }
        }
        document.addEventListener("mousemove", move)
        let raf: number
        const anim = () => {
            cx.current += (mx.current - cx.current) * 0.12
            cy.current += (my.current - cy.current) * 0.12
            if (c2.current) {
                c2.current.style.left = cx.current + "px"
                c2.current.style.top = cy.current + "px"
            }
            raf = requestAnimationFrame(anim)
        }
        raf = requestAnimationFrame(anim)
        return () => {
            document.removeEventListener("mousemove", move)
            cancelAnimationFrame(raf)
        }
    }, [])

    useEffect(() => {
        const els = Array.from(ref.current?.querySelectorAll(".jp-rv") || [])
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
        const t = setInterval(
            () => setTestiSlide((s) => (s + 1) % TESTIMONIAL_SLIDES.length),
            6000
        )
        return () => clearInterval(t)
    }, [])

    const go = (id: string) =>
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

    const showMsg = (msg: string, err = false) => {
        setToastMsg(msg)
        setToastErr(err)
        setShowToast(true)
        setTimeout(() => setShowToast(false), 4000)
    }

    const send = async () => {
        if (!fname.trim() || !email.trim() || !message.trim()) {
            showMsg("Please fill in name, email and message.", true)
            return
        }
        setSendState("sending")
        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: WEB3FORMS_KEY,
                    subject:
                        `Portfolio Inquiry — ${projType || "General"} from ${fname} ${lname}`.trim(),
                    from_name: `${fname} ${lname}`.trim(),
                    reply_to: email,
                    name: `${fname} ${lname}`.trim(),
                    email,
                    project_type: projType || "Not specified",
                    budget: budget || "Not specified",
                    message,
                    redirect: false,
                }),
            })
            const data = await res.json()
            if (data.success) {
                setSendState("sent")
                showMsg("Message sent! I'll get back to you soon. ✓")
                setFname("")
                setLname("")
                setEmail("")
                setProjType("")
                setBudget("")
                setMessage("")
                setTimeout(() => setSendState("idle"), 4000)
            } else throw new Error("failed")
        } catch {
            setSendState("error")
            showMsg(
                "Something went wrong. Please email cagas4504@gmail.com directly.",
                true
            )
            setTimeout(() => setSendState("idle"), 4000)
        }
    }

    const handleDownload = () => {
        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                access_key: WEB3FORMS_KEY,
                subject: "📥 Someone downloaded your Handbook!",
                from_name: "Portfolio Website",
                message: `Download at: ${new Date().toLocaleString()}`,
                redirect: false,
            }),
        }).catch(() => {})
        const a = document.createElement("a")
        a.href = PDF_URL
        a.download = "Landing-Page-Workflow-Handbook.pdf"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        showMsg("📥 Download starting...")
    }

    return (
        <>
            <LoadFonts />
            <div className="jp" ref={ref} style={{ cursor: "none" }}>
                <div className="jp-cur" ref={c1} />
                <div className="jp-cur2" ref={c2} />
                <div
                    className={`jp-toast${showToast ? " show" : ""}${toastErr ? " err" : ""}`}
                >
                    {toastMsg}
                </div>
                <div className={`jp-abar${navScroll ? " show" : ""}`}>
                    <div className="jp-adot" />
                    <span>Available for new projects</span>
                </div>

                {/* NAV — full-bleed bg, inner content centered with max-width */}
                <nav
                    className="jp-nav"
                    style={{ top: navScroll ? "38px" : "0" }}
                >
                    <div className="jp-nav-inner">
                        <a
                            className="jp-logo"
                            href="/"
                            onClick={(e) => {
                                e.preventDefault()
                                go("hero")
                            }}
                        >
                            JADEY<span>.</span>
                        </a>
                        <div className="jp-nav-r">
                            <div className="jp-ndot" />
                            <a href="/all-work">All Projects</a>
                            <a
                                href="#about"
                                onClick={(e) => {
                                    e.preventDefault()
                                    go("about")
                                }}
                            >
                                About Me
                            </a>
                            <a
                                href="#work"
                                onClick={(e) => {
                                    e.preventDefault()
                                    go("work")
                                }}
                            >
                                Work Highlights
                            </a>
                            <a
                                href="#testimonials"
                                onClick={(e) => {
                                    e.preventDefault()
                                    go("testimonials")
                                }}
                            >
                                Testimonials
                            </a>
                            <a
                                href="#insights"
                                onClick={(e) => {
                                    e.preventDefault()
                                    go("insights")
                                }}
                            >
                                Blog
                            </a>
                            <a
                                href="#workshops"
                                onClick={(e) => {
                                    e.preventDefault()
                                    go("workshops")
                                }}
                            >
                                Workshops
                            </a>
                            <a
                                className="jp-nav-contact"
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault()
                                    go("contact")
                                }}
                            >
                                Contact Me
                            </a>
                        </div>
                    </div>
                </nav>

                {/* HERO */}
                <div className="jp-hero" id="hero">
                    <div className="jp-hero-bg">DESIGNER</div>
                    <div className="jp-hero-c">
                        <div className="jp-h-eye">Available for work</div>
                        <h1 className="jp-h1">
                            <span className="jp-h1-name">JADEY</span>
                            <span className="jp-h1-tag">
                                DESIGNING WITH CLARITY
                            </span>
                            <span className="jp-h1-sub">AND PURPOSE.</span>
                        </h1>
                    </div>
                    <div className="jp-hero-bot">
                        <div className="jp-hero-bot-inner">
                            <div className="jp-hdesc jp-rv">
                                I craft digital experiences and media that tell
                                stories, solve problems, and inspire
                                connections. UI/UX · Brand · Graphic Design.
                            </div>
                            <div className="jp-hact jp-rv">
                                <a
                                    className="jp-blime"
                                    href="/all-work"
                                >
                                    See All Work
                                </a>
                                <a
                                    className="jp-bghost"
                                    href="#contact"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        go("contact")
                                    }}
                                >
                                    Get In Touch
                                </a>
                            </div>
                            <div className="jp-hstats jp-rv">
                                {[
                                    ["6+", "Years"],
                                    ["80+", "Projects"],
                                    ["9+", "Events"],
                                ].map(([n, l]) => (
                                    <div key={l}>
                                        <div className="jp-sn">{n}</div>
                                        <div className="jp-sl">{l}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="jp-mq">
                    <div className="jp-mq-t">
                        {Array(2)
                            .fill([
                                "UI/UX DESIGN",
                                "BRAND IDENTITY",
                                "GRAPHIC DESIGN",
                                "PRESENTATION DESIGN",
                                "FIGMA",
                                "FRAMER",
                                "WORKSHOPS",
                            ])
                            .flat()
                            .map((item, i) => (
                                <span key={i} className="jp-mq-i">
                                    {item}
                                    <span style={{ opacity: 0.3 }}> ✦ </span>
                                </span>
                            ))}
                    </div>
                </div>

                {/* SERVICES */}
                <section id="services" className="jp-services">
                    <div className="jp-section-inner">
                        <div className="jp-sl-tag jp-rv">What I Do</div>
                        <h2 className="jp-st jp-rv">
                            Services &amp;
                            <br />
                            <em>Expertise</em>
                        </h2>
                        <div className="jp-sg jp-rv">
                            {[
                                {
                                    icon: (
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--pu)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M17.5 14v6M14.5 17h6"/>
                                        </svg>
                                    ),
                                    n: "01",
                                    title: "UI/UX Design",
                                    desc: "Designing intuitive and functional interfaces from concept to high-fidelity prototypes, focused on usability and clarity.",
                                    tags: ["Figma", "Prototyping", "Wireframes", "Design Systems"],
                                },
                                {
                                    icon: (
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--pu)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>
                                        </svg>
                                    ),
                                    n: "02",
                                    title: "Brand Identity",
                                    desc: "Creating cohesive brand visuals — logos, color systems, and typography that build a consistent identity.",
                                    tags: ["Logo", "Brand System", "Typography", "Visual Direction"],
                                },
                                {
                                    icon: (
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--pu)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 19l7-7-4-4-7 7v4h4z"/><path d="M15 6l3 3"/><path d="M5 19h14"/>
                                        </svg>
                                    ),
                                    n: "03",
                                    title: "Graphic Design",
                                    desc: "Producing marketing and digital visuals that communicate clearly across platforms.",
                                    tags: ["Posters", "Social Media", "Campaigns", "Marketing Assets"],
                                },
                                {
                                    icon: (
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--pu)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8h4M7 11h2M13 8l2 3 2-3"/>
                                        </svg>
                                    ),
                                    n: "04",
                                    title: "Presentation Design",
                                    desc: "Designing clear and engaging presentations that simplify ideas and deliver strong visual storytelling.",
                                    tags: ["Pitch Decks", "Storytelling", "Data Visualization", "Canva"],
                                },
                                {
                                    icon: (
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--pu)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 9h10M7 12h6"/>
                                        </svg>
                                    ),
                                    n: "05",
                                    title: "Web Design",
                                    desc: "Designing responsive websites and apps with clean layouts, built for real use and smooth developer handoff.",
                                    tags: ["Responsive", "Framer", "Figma", "UI Specs"],
                                },
                                {
                                    icon: (
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--pu)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 3l1.5 4.5h4.5l-3.5 2.5 1.5 4.5L12 12l-4 2.5 1.5-4.5L6 7.5h4.5z"/><path d="M5 19l2-2M19 19l-2-2M12 21v-2"/>
                                        </svg>
                                    ),
                                    n: "06",
                                    title: "AI-Assisted Design",
                                    desc: "Using AI tools to generate layouts, explore ideas, and accelerate design workflows.",
                                    tags: ["ChatGPT", "Claude", "Gemini", "Grok", "Figma Make"],
                                },
                            ].map((s) => (
                                <div key={s.n} className="jp-sv" data-n={s.n}>
                                    <span className="jp-sv-ic">{s.icon}</span>
                                    <h3>{s.title}</h3>
                                    <p>{s.desc}</p>
                                    <div className="jp-sv-tags">
                                        {s.tags.map((t) => (
                                            <span key={t} className="jp-sv-tag">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* WORK HIGHLIGHTS */}
                <section id="work" style={{ background: "var(--bg)" }}>
                    <div className="jp-section-inner">
                        <div className="jp-work-header jp-rv">
                            <div>
                                <div className="jp-sl-tag">Work Highlights</div>
                                <h2
                                    className="jp-st"
                                    style={{ fontSize: "clamp(36px,6vw,76px)" }}
                                >
                                    Selected
                                    <br />
                                    <em>Projects</em>
                                </h2>
                            </div>
                            <p className="jp-s-intro">
                                Designs that bring ideas to life with purpose,
                                detail, and creativity.
                            </p>
                        </div>
                        <div className="jp-wmas jp-rv">
                            {HIGHLIGHTS.map((w) => (
                                    <a
                                        key={w.slug}
                                        className="jp-wc"
                                        href={`/all-work/${w.slug}`}
                                    >
                                        <div
                                            className="jp-wt"
                                        >
                                            {w.img && (
                                                <img
                                                    src={w.img}
                                                    alt={w.title}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                        display: "block",
                                                    }}
                                                />
                                            )}
                                            <div className="jp-wo">
                                                <span className="jp-octa">
                                                    VIEW PROJECT →
                                                </span>
                                            </div>
                                        </div>
                                        <div className="jp-wi">
                                            <div className="jp-wcat">
                                                {w.label}
                                            </div>
                                            <div className="jp-wtit">
                                                {w.title}
                                            </div>
                                            <div className="jp-wdesc">
                                                {w.desc}
                                            </div>
                                        </div>
                                    </a>
                            ))}
                        </div>
                        <div className="jp-see-all jp-rv">
                            <a
                                className="jp-blime"
                                href="/all-work"
                                style={{ fontSize: 13, padding: "16px 44px" }}
                            >
                                SEE ALL WORK →
                            </a>
                        </div>
                    </div>
                </section>

                {/* ABOUT */}
                <section id="about" className="jp-about">
                    <div className="jp-section-inner">
                        <div className="jp-sl-tag jp-rv">Meet the Designer</div>
                        <h2
                            className="jp-st jp-rv"
                            style={{ fontSize: "clamp(36px,6vw,76px)" }}
                        >
                            I'm <em>Jane Dhell Cagas</em>,<br />
                            but you can call me Jadey.
                        </h2>
                        <div className="jp-alay jp-rv">
                            <div className="jp-amug">
                                <Image
                                    className="jp-amug-img"
                                    src="/jadey.png"
                                  layout="fill"
                                  objectFit="contain"
                                    alt="Jadey — Jane Dhell Cagas"
                                />
                                <div className="jp-amug-b">
                                    <div className="jp-amug-l">JADEY C.</div>
                                    <div className="jp-amug-r">
                                        Cagayan de Oro, PH
                                        <br />
                                        Open to remote
                                    </div>
                                </div>
                            </div>
                            <div className="jp-ar">
                                <p>
                                    I’m a designer from the Philippines focused on 
                                    creating clean, thoughtful, and functional digital 
                                    experiences. I graduated from USTP – Cagayan de Oro 
                                    City in 2022 with a degree in Computer Engineering, 
                                    which helps me approach design with structure and 
                                    problem-solving in mind.
                                </p>
                                <p>
                                    I started my design journey in 2016 as a part-time 
                                    graphic designer, and eventually grew into UI/UX 
                                    design as my core focus, while also working across 
                                    branding, web, presentation design, and basic video editing.
                                </p>
                                <p>
                                    I’m naturally curious and always exploring better ways to 
                                    improve my work — from understanding user needs and refining 
                                    design systems to experimenting with modern tools and 
                                    AI-assisted workflows to move faster and design smarter.
                                </p>
                                <p>
                                    I've always loved joining organizations and
                                    communities. They've helped me learn new
                                    skills, gain knowledge, and meet amazing
                                    people.
                                </p>
                                <h4>Core Skills</h4>
                                <div className="jp-sk-row">
                                    {[
                                        "UI/UX Design",
                                        "Product & Web Design",
                                        "Graphic Design",
                                        "Branding & Identity",
                                        "Presentation Design",
                                        "Prototyping",
                                        "Design Systems",
                                        "AI-Assisted Design",
                                        "Basic Video Editing",
                                    ].map((s) => (
                                        <span key={s} className="jp-sk">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                                <h4>Tools</h4>
                                <div className="jp-tl-row">
                                    {[
                                        "Figma",
                                        "Adobe Photoshop",
                                        "Canva",
                                        "Framer",
                                        "ChatGPT",
                                        "Claude",
                                        "Gemini",
                                        "Grok",
                                        "Notion",
                                        "ClickUp",
                                        "Jira",
                                        "CapCut",
                                    ].map((t) => (
                                        <span key={t} className="jp-tl">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PROCESS */}
                <section id="process" style={{ background: "var(--bg)" }}>
                    <div className="jp-section-inner">
                        <div className="jp-sl-tag jp-rv">How I Work</div>
                        <h2
                            className="jp-st jp-rv"
                            style={{ fontSize: "clamp(36px,6vw,76px)" }}
                        >
                            The <em>Process</em>
                        </h2>
                        <div className="jp-ptrack jp-rv">
                            {[
                                [
                                    "01",
                                    "Discover",
                                    "Research, interviews, and competitive analysis before touching pixels.",
                                ],
                                [
                                    "02",
                                    "Define",
                                    "Problem statements, personas, and success metrics.",
                                ],
                                [
                                    "03",
                                    "Ideate",
                                    "Sketch, explore, pressure-test. Diverge before converging.",
                                ],
                                [
                                    "04",
                                    "Design",
                                    "High-fidelity design and interactive prototyping.",
                                ],
                                [
                                    "05",
                                    "Deliver",
                                    "Dev-ready specs, design systems, and support through launch.",
                                ],
                            ].map(([n, t, d]) => (
                                <div key={n} className="jp-ps">
                                    <div className="jp-pn">{n}</div>
                                    <div className="jp-pt">{t}</div>
                                    <div className="jp-pd">{d}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* TESTIMONIALS */}
                <section id="testimonials" style={{ background: "var(--bg2)" }}>
                    <div className="jp-section-inner">
                        <div className="jp-sl-tag jp-rv">What They Say</div>
                        <h2
                            className="jp-st jp-rv"
                            style={{ fontSize: "clamp(36px,6vw,76px)" }}
                        >
                            Sweet notes &amp;
                            <br />
                            <em>Feedback</em>
                        </h2>
                        <div className="jp-tslider jp-rv">
                            <div className="jp-tslider-viewport">
                                <div
                                    className="jp-ttrack"
                                    style={{
                                        transform: `translateX(-${testiSlide * 100}%)`,
                                    }}
                                >
                                    {TESTIMONIAL_SLIDES.map((slide, si) => (
                                        <div key={si} className="jp-tslide">
                                            {slide.map((tc, ti) => (
                                                <div
                                                    key={ti}
                                                    className={`jp-tc${tc.big ? " big" : ""}`}
                                                >
                                                    <div className="jp-tstar">
                                                        ★★★★★
                                                    </div>
                                                    <p className="jp-tq">
                                                        {tc.q}
                                                    </p>
                                                    <div className="jp-ta-w">
                                                        <div className="jp-tav">
                                                            <img src={tc.img} alt={tc.name} />
                                                        </div>
                                                        <div>
                                                            <div className="jp-tan">
                                                                {tc.name} {tc.flag}
                                                            </div>
                                                            <div className="jp-tar">
                                                                {tc.position}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="jp-tcontrols">
                                <button
                                    className="jp-tarr"
                                    onClick={() =>
                                        setTestiSlide(
                                            (s) =>
                                                (s -
                                                    1 +
                                                    TESTIMONIAL_SLIDES.length) %
                                                TESTIMONIAL_SLIDES.length
                                        )
                                    }
                                >
                                    ←
                                </button>
                                <div className="jp-tdots">
                                    {TESTIMONIAL_SLIDES.map((_, i) => (
                                        <button
                                            key={i}
                                            className={`jp-tdot${testiSlide === i ? " on" : ""}`}
                                            onClick={() => setTestiSlide(i)}
                                        />
                                    ))}
                                </div>
                                <button
                                    className="jp-tarr"
                                    onClick={() =>
                                        setTestiSlide(
                                            (s) =>
                                                (s + 1) %
                                                TESTIMONIAL_SLIDES.length
                                        )
                                    }
                                >
                                    →
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* INSIGHTS */}
                <section id="insights" style={{ background: "var(--bg)" }}>
                    <div className="jp-section-inner">
                        <div className="jp-rv">
                            <div className="jp-sl-tag">Design Insights</div>
                            <h2
                                className="jp-st"
                                style={{ fontSize: "clamp(36px,6vw,76px)" }}
                            >
                                From the
                                <br />
                                <em>Blog</em>
                            </h2>
                        </div>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            padding:"44px",
                            background:"var(--bg2)",border:"1px solid var(--pborder)",marginTop:"60px",marginBottom:"28px"
                        }}>
                            <div>
                                {handbookImgOk ? (
                                    <img
                                        src={HANDBOOK_IMG}
                                        alt="Landing Page Workflow Handbook cover"
                                        width="500"
                                        style={{
                                            width: "350px",
                                          
                                          
                                            display: "flex",
                                            borderRadius: "6px",
                                        }}
                                        onError={() => setHandbookImgOk(false)}
                                    />
                                ) : (
                                    <div className="jp-handbook-cover-fallback">
                                        <span>HB</span>
                                        <div
                                            style={{
                                                fontSize: 9,
                                                letterSpacing: ".1em",
                                                textTransform: "uppercase",
                                                color: "rgba(240,235,224,0.4)",
                                            }}
                                        >
                                            Handbook
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="jp-handbook-left" >
                                <div className="jp-handbook-tag">
                                    📄 Free Resource
                                </div>
                                <div className="jp-handbook-title">
                                    Landing Page
                                    <br />
                                    Workflow Handbook
                                </div>
                                <p className="jp-handbook-desc">
                                    The full landing page design process in a
                                    clear, simple format. Filled with actionable
                                    steps and tips to help you design better
                                    landing pages from scratch.
                                </p>
                            </div>
                            <div className="jp-handbook-right">
                                <button
                                    className="jp-dl-btn"
                                    onClick={handleDownload}
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                                    </svg>
                                    Download Free PDF
                                </button>
                                <div className="jp-dl-note">
                                    Free · No sign-up · PDF
                                </div>
                            </div>
                        </div>
                        <div className="jp-articles-row jp-rv">
                            {[
                                {
                                    bg: "linear-gradient(135deg,#2E1050,#6B3FA0)",
                                    lbl: "GUIDE",
                                    tagC: "rgba(155,89,208,.2)",
                                    tagTxt: "var(--pu)",
                                    tag: "UI Design",
                                    date: "Dec 2024",
                                    h: 180,
                                    t: "Essential Elements of a UI Style Guide Starter Kit",
                                    d: "A guide to building your first UI style guide.",
                                    time: "7 min read",
                                    url: "https://medium.com/design-bootcamp/essential-elements-of-a-ui-style-guide-starter-kit-and-how-to-use-it-ec4c5452d662",
                                },
                                {
                                    bg: "linear-gradient(135deg,#1a0a00,#3a2800)",
                                    lbl: "COLOR",
                                    tagC: "rgba(212,168,67,.14)",
                                    tagTxt: "#d4a843",
                                    tag: "Color Theory",
                                    date: "Nov 2024",
                                    h: 180,
                                    t: "Creating Color Schemes for the UI Style Guide Kit",
                                    d: "How to build cohesive, accessible color systems.",
                                    time: "6 min",
                                    url: "https://medium.com/design-bootcamp/a-beginners-guide-to-creating-color-schemes-for-the-ui-style-guide-kit-f759e904b3ea",
                                },
                                {
                                    bg: "linear-gradient(135deg,#0a1a0a,#1a3a1a)",
                                    lbl: "MOTION",
                                    tagC: "rgba(100,200,100,.11)",
                                    tagTxt: "#64c864",
                                    tag: "Animation",
                                    date: "Nov 2024",
                                    h: 180,
                                    t: "The Impact of UI Animation on Your Design",
                                    d: "Why motion design matters and elevates UX.",
                                    time: "8 min",
                                    url: "https://medium.com/@jadeyc/the-impact-of-ui-animation-on-your-design-239553d873fb",
                                },
                            ].map((b, i) => (
                                <a
                                    key={i}
                                    className="jp-bc"
                                    href={b.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div
                                        style={{
                                            height: b.h,
                                            background: b.bg,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontFamily:
                                                    "'Bebas Neue',sans-serif",
                                                fontSize: 52,
                                                letterSpacing: -2,
                                                color: "rgba(255,255,255,.06)",
                                            }}
                                        >
                                            {b.lbl}
                                        </div>
                                    </div>
                                    <div className="jp-bbd">
                                        <div className="jp-bmeta">
                                            <span
                                                className="jp-btag"
                                                style={{
                                                    background: b.tagC,
                                                    color: b.tagTxt,
                                                }}
                                            >
                                                {b.tag}
                                            </span>
                                            <span className="jp-bdate">
                                                {b.date}
                                            </span>
                                        </div>
                                        <h3>{b.t}</h3>
                                        <p>{b.d}</p>
                                        <div className="jp-bfoot">
                                            <span className="jp-btime">
                                                {b.time}
                                            </span>
                                            <span className="jp-blink">
                                                Read on Medium →
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                        <div style={{ marginTop: 80 }} className="jp-rv">
                            <div className="jp-sl-tag">Free Resources</div>
                            <h2
                                className="jp-st"
                                style={{ fontSize: "clamp(28px,4vw,60px)" }}
                            >
                                Figma
                                <br />
                                <em>Resources</em>
                            </h2>
                            <div className="jp-resources">
                                {RESOURCES.map((r, i) => (
                                    <a
                                        key={i}
                                        className="jp-rcard"
                                        href={r.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="jp-ricon">{r.icon}</div>
                                        <div className="jp-rinfo">
                                            <div className="jp-rtitle">
                                                {r.title}
                                            </div>
                                            <div className="jp-rsub">
                                                {r.sub}
                                            </div>
                                        </div>
                                        <div className="jp-rarr">→</div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <div className="jp-mq2">
                    <div className="jp-mq2-t">
                        {Array(2)
                            .fill([
                                "FIGMA ANIMATE",
                                "COFFEE HOURS",
                                "UNBUX MANILA",
                                "DESIGN HIVE CDO",
                                "HIVERS MANILA",
                                "DJANGO GIRLS",
                                "INNOVATE 2024",
                            ])
                            .flat()
                            .map((item, i) => (
                                <span key={i} className="jp-mq2-i">
                                    {item}
                                    <span
                                        style={{
                                            padding: "0 14px",
                                            color: "rgba(240,235,224,.04)",
                                        }}
                                    >
                                        ·
                                    </span>
                                </span>
                            ))}
                    </div>
                </div>

                {/* WORKSHOPS */}
                <section id="workshops" className="jp-workshops">
                    <div className="jp-section-inner">
                        <div className="jp-sl-tag jp-rv">
                            Speaking & Teaching
                        </div>
                        <h2 className="jp-st jp-rv">
                            Workshops &amp;
                            <br />
                            <em>Talks</em>
                        </h2>
                        <p
                            className="jp-s-intro jp-rv"
                            style={{ color: "rgba(10,10,8,.6)", marginTop: 14 }}
                        >
                            Hands-on workshops and community talks about design
                            craft, UX strategy, and creative process.
                        </p>
                        <div className="jp-wkg jp-rv">
                            {WORKSHOPS.map((ws, i) => (
                                <div key={i} className="jp-wkcard">
                                    <div
                                        className="jp-wkthumb"
                                        style={{ background: ws.color }}
                                    >
                                        <span className="jp-wkthumb-icon">
                                            {ws.icon}
                                        </span>
                                        <div className="jp-wkthumb-year">
                                            {ws.date}
                                        </div>
                                    </div>
                                    <div className="jp-wkinfo">
                                        <div className="jp-wkev">{ws.ev}</div>
                                        <div className="jp-wkname">
                                            {ws.title}
                                        </div>
                                        <div className="jp-wksupport">
                                            {ws.support}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CONTACT */}
                <section id="contact" style={{ background: "var(--bg)" }}>
                    <div className="jp-section-inner">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-end",
                                marginBottom: 60,
                                flexWrap: "wrap",
                                gap: 20,
                            }}
                            className="jp-rv"
                        >
                            <div>
                                <div className="jp-sl-tag">Get In Touch</div>
                                <h2
                                    className="jp-st"
                                    style={{ fontSize: "clamp(36px,6vw,76px)" }}
                                >
                                    Let's connect &amp;
                                    <br />
                                    <em>Create Something Great</em>
                                </h2>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <div
                                    style={{
                                        fontSize: 9,
                                        letterSpacing: ".15em",
                                        textTransform: "uppercase",
                                        color: "var(--muted)",
                                        marginBottom: 7,
                                    }}
                                >
                                    Current Status
                                </div>
                                <div
                                    style={{
                                        fontFamily: "'Bebas Neue',sans-serif",
                                        fontSize: 22,
                                        letterSpacing: 2,
                                        color: "var(--pu)",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <div className="jp-ndot" />
                                    Available for Work
                                </div>
                            </div>
                        </div>
                        <div className="jp-clay jp-rv">
                            <div className="jp-ci">
                                <p>
                                    Reach me through any of the channels below.
                                    Please include your name and project
                                    details.
                                </p>
                                <div className="jp-citem">
                                    <div className="jp-cic">
                                        <GmailIcon />
                                    </div>
                                    <div className="jp-cit">
                                        <a href="mailto:cagas4504@gmail.com">
                                            cagas4504@gmail.com
                                        </a>
                                    </div>
                                </div>
                                <div className="jp-citem">
                                    <div className="jp-cic">
                                        <LinkedInIcon />
                                    </div>
                                    <div className="jp-cit">
                                        <a
                                            href="https://www.linkedin.com/in/jadeyc/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            linkedin.com/in/jadeyc
                                        </a>
                                    </div>
                                </div>
                                <div className="jp-citem">
                                    <div className="jp-cic">
                                        <WhatsAppIcon />
                                    </div>
                                    <div className="jp-cit">
                                        <a
                                            href="https://wa.me/639558017202"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            09558017202
                                        </a>
                                    </div>
                                </div>
                                <div className="jp-soc-row">
                                    <a
                                        href="https://www.linkedin.com/in/jadeyc/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="jp-socb"
                                    >
                                        LinkedIn
                                    </a>
                                    <a href="#" className="jp-socb">
                                        Dribbble
                                    </a>
                                    <a href="#" className="jp-socb">
                                        Behance
                                    </a>
                                    <a href="#" className="jp-socb">
                                        Read.cv
                                    </a>
                                </div>
                            </div>
                            <div className="jp-cf">
                                <div className="jp-fg-row">
                                    <div className="jp-fg">
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            placeholder="Your first name"
                                            value={fname}
                                            onChange={(e) =>
                                                setFname(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="jp-fg">
                                        <label>Last Name</label>
                                        <input
                                            type="text"
                                            placeholder="Your last name"
                                            value={lname}
                                            onChange={(e) =>
                                                setLname(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="jp-fg">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="jp-fg">
                                    <label>Project Type</label>
                                    <select
                                        value={projType}
                                        onChange={(e) =>
                                            setProjType(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            Select a service...
                                        </option>
                                        {[
                                            "UI/UX Design",
                                            "Brand Identity",
                                            "Graphic Design",
                                            "Presentation Design",
                                            "Workshop / Speaking",
                                            "Other",
                                        ].map((o) => (
                                            <option key={o}>{o}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="jp-fg">
                                    <label>Budget Range</label>
                                    <select
                                        value={budget}
                                        onChange={(e) =>
                                            setBudget(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            Select budget...
                                        </option>
                                        {[
                                            "Under $500",
                                            "$500 – $1,500",
                                            "$1,500 – $5,000",
                                            "$5,000+",
                                        ].map((o) => (
                                            <option key={o}>{o}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="jp-fg">
                                    <label>Tell me about your project</label>
                                    <textarea
                                        placeholder="What are you building? What's the challenge?"
                                        value={message}
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
                                    />
                                </div>
                                <button
                                    className="jp-bsub"
                                    onClick={send}
                                    disabled={sendState === "sending"}
                                >
                                    {sendState === "idle"
                                        ? "SEND MESSAGE →"
                                        : sendState === "sending"
                                          ? "SENDING..."
                                          : sendState === "sent"
                                            ? "MESSAGE SENT ✓"
                                            : "TRY AGAIN"}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="jp-footer">
                    <div className="jp-footer-inner">
                        <a
                            className="jp-flogo"
                            href="/"
                            onClick={(e) => {
                                e.preventDefault()
                                go("hero")
                            }}
                        >
                            JADEY<span>.</span>
                        </a>
                        <div className="jp-fcopy">
                            © 2025 Jane Dhell Cagas. All rights reserved.
                        </div>
                        <div className="jp-flinks">
                            <a
                                href="#about"
                                onClick={(e) => {
                                    e.preventDefault()
                                    go("about")
                                }}
                            >
                                About Me
                            </a>
                            <a
                                href="#work"
                                onClick={(e) => {
                                    e.preventDefault()
                                    go("work")
                                }}
                            >
                                Work Highlights
                            </a>
                            <a
                                href="#testimonials"
                                onClick={(e) => {
                                    e.preventDefault()
                                    go("testimonials")
                                }}
                            >
                                Testimonials
                            </a>
                            <a
                                href="#insights"
                                onClick={(e) => {
                                    e.preventDefault()
                                    go("insights")
                                }}
                            >
                                Blog
                            </a>
                            <a
                                href="#workshops"
                                onClick={(e) => {
                                    e.preventDefault()
                                    go("workshops")
                                }}
                            >
                                Workshops
                            </a>
                            <a
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault()
                                    go("contact")
                                }}
                            >
                                Contact
                            </a>
                            <a className="jp-fall" href="/all-work">
                                All Projects →
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}


