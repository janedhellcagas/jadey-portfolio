'use client'
import { useState, useEffect, useRef, Fragment } from "react"

const CSS = `
:root{--bg:#0a0a08;--bg2:#111110;--paper:#f0ebe0;--paper2:#e8e2d5;--pu:#9B59D0;--pu2:#B07AE0;--pu3:#7A3AB8;--muted:rgba(240,235,224,0.38);--border:rgba(240,235,224,0.12);--pborder:rgba(155,89,208,0.3);--pbg:rgba(155,89,208,0.08);--max:1440px;--pad:44px}
.bb*{box-sizing:border-box;margin:0;padding:0}
.bb{font-family:'Space Mono',monospace;background:var(--bg);color:var(--paper);min-height:100vh;overflow-x:hidden;width:100%}
/* NAV */
.bb-nav{position:fixed;top:0;left:0;right:0;z-index:500;background:rgba(10,10,8,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:top .3s}
.bb-nav-inner{max-width:var(--max);margin:0 auto;padding:18px var(--pad);display:flex;align-items:center;justify-content:space-between}
.bb-logo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.bb-logo span{color:var(--pu)}
.bb-nav-r{display:none;align-items:center;gap:14px}
.bb-nav-r a{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.bb-nav-r a:hover{color:var(--pu)}
.bb-nav-contact{background:var(--pu)!important;color:var(--bg)!important;padding:9px 20px!important;font-weight:700!important;border:2px solid var(--pu)!important;display:inline-block!important}
.bb-nav-contact:hover{background:var(--pu2)!important;border-color:var(--pu2)!important}
.bb-ndot{width:7px;height:7px;background:var(--pu);border-radius:50%;animation:bb-pulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes bb-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.85)}}
.bb-abar{position:fixed;top:0;left:0;right:0;z-index:499;background:var(--pu3);padding:9px var(--pad);height:38px;display:none;align-items:center;justify-content:center;gap:8px}
.bb-abar.show{display:flex}
.bb-abar span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:white;font-weight:700}
.bb-adot{width:5px;height:5px;background:white;border-radius:50%;animation:bb-pulse 2s ease-in-out infinite}
.bb-hamburger{display:flex;flex-direction:column;gap:5px;cursor:pointer;background:transparent;border:none;padding:6px}
.bb-hamburger span{display:block;width:24px;height:2px;background:var(--paper);transition:all .3s}
.bb-drawer{position:fixed;inset:0;z-index:600;background:var(--bg);transform:translateX(100%);transition:transform .35s ease;display:flex;flex-direction:column;padding:88px 28px 40px;overflow-y:auto}
.bb-drawer.open{transform:translateX(0)}
.bb-drawer-close{position:absolute;top:22px;right:24px;background:transparent;border:none;color:var(--paper);font-size:22px;cursor:pointer;line-height:1}
.bb-drawer a{font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;padding:18px 0;border-bottom:1px solid var(--border);transition:color .2s;display:block}
.bb-drawer a:hover,.bb-drawer a:active{color:var(--pu)}
.bb-drawer-cta{background:var(--pu);color:var(--bg)!important;padding:14px 0!important;font-weight:700;border-bottom:none!important;text-align:center;margin-top:20px;display:block;text-decoration:none;transition:background .2s}
.bb-drawer-cta:hover{background:var(--pu2)}
/* HERO — same structure/rhythm as other case studies (sf-hero / pd-hero) */
.bb-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#0e0e18,#1c1030 60%,#120a1e)}
.bb-hero-inner{max-width:var(--max);margin:0 auto;padding:140px var(--pad) 60px;position:relative}
.bb-hero-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,9vw,140px);letter-spacing:-4px;color:rgba(240,235,224,0.035);white-space:nowrap;pointer-events:none;text-align:center;width:100%}
.bb-cat{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,0.6);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.bb-cat::before{content:'';width:36px;height:1px;background:rgba(255,255,255,0.4)}
.bb-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,9vw,120px);letter-spacing:-2px;line-height:.88;color:#fff;margin-bottom:24px}
.bb-htag{font-size:12.5px;line-height:1.9;color:rgba(255,255,255,0.65);max-width:560px;margin-bottom:30px}
.bb-meta-row{display:flex;gap:40px;flex-wrap:wrap;padding-top:28px;border-top:1px solid rgba(255,255,255,0.15)}
.bb-meta-l{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:4px}
.bb-meta-v{font-size:11px;color:#fff;font-weight:700}
/* COVER — main project showcase banner, same container style as other case-study cover images */
.bb-cover{padding:52px var(--pad) 0}
.bb-cover-wrap{max-width:1425px;margin:0 auto;overflow:hidden}
.bb-cover-wrap img{width:100%;height:auto;display:block;border:1px solid var(--border)}
/* BODY */
.bb-body{padding:0}
.bb-body-inner{max-width:var(--max);margin:0 auto;padding:72px var(--pad)}
.bb-sec-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--pu);margin-bottom:10px;display:flex;align-items:center;gap:10px}
.bb-sec-label::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.2)}
.bb-sec-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(26px,4vw,46px);letter-spacing:-1px;color:var(--paper);margin-bottom:14px;max-width:820px}
.bb-sec-body{font-size:12px;line-height:1.95;color:var(--muted);max-width:680px}
.bb-sec-body+.bb-sec-body{margin-top:10px}
/* CARD GRID (generic — problem/solution, audience, personas, usability, outcome) */
.bb-cardgrid{display:grid;gap:18px;margin-top:40px}
.bb-cols-2{grid-template-columns:1fr 1fr}
.bb-cols-3{grid-template-columns:repeat(3,1fr)}
.bb-cols-4{grid-template-columns:repeat(4,1fr)}
.bb-card{border:1px solid var(--border);background:var(--bg2);padding:26px;transition:border-color .25s}
.bb-card:hover{border-color:var(--pborder)}
.bb-card-num{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--pu);font-weight:700;margin-bottom:12px}
.bb-card h3{font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:.3px;color:var(--paper);margin-bottom:9px}
.bb-card p{font-size:11.5px;line-height:1.85;color:var(--muted)}
/* ROLE PILLS */
.bb-pillrow{display:flex;flex-wrap:wrap;gap:8px;margin-top:24px}
.bb-rpill{background:var(--pbg);padding:8px 14px;font-size:10px;font-weight:700;color:var(--pu3);letter-spacing:.04em;border:1px solid var(--pborder)}
/* PROCESS TRACK (mirrors homepage jp-ptrack five-step process) */
.bb-ptrack{display:grid;grid-template-columns:repeat(5,1fr);margin-top:52px;position:relative}
.bb-ptrack::before{content:'';position:absolute;top:26px;left:10%;right:10%;height:1px;background:var(--border)}
.bb-ps{text-align:center;padding:0 16px;position:relative}
.bb-pn{width:52px;height:52px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:1px;color:var(--muted);margin:0 auto 20px;position:relative;z-index:1;background:var(--bg);transition:all .25s}
.bb-ps:hover .bb-pn{background:var(--pu);color:var(--bg);border-color:var(--pu)}
.bb-pt{font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:2px;color:var(--paper);margin-bottom:8px}
.bb-pd{font-size:10.5px;color:var(--muted);line-height:1.75}
/* TIMELINE / GANTT (desktop) — one row per phase, hover tooltips, 5-category color grouping */
.bb-gantt{margin-top:48px;border:1px solid var(--border);background:var(--bg2);padding:32px 28px}
.bb-gantt-inner{}
.bb-gweeks{display:grid;grid-template-columns:220px repeat(12,1fr);gap:6px;margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--border)}
.bb-gweeks div{font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);text-align:center}
.bb-gweeks div:first-child{text-align:left;color:var(--pu);font-weight:700;letter-spacing:.14em}
.bb-grow{display:grid;grid-template-columns:220px repeat(12,1fr);gap:6px;align-items:center;margin-bottom:12px}
.bb-grow:last-child{margin-bottom:0}
.bb-grow-label{display:flex;align-items:flex-start;gap:9px}
.bb-grow-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:4px}
.bb-grow-name{font-size:11px;font-weight:700;color:var(--paper);line-height:1.35}
.bb-grow-wk{font-size:9px;color:var(--muted);opacity:.7;margin-top:3px;letter-spacing:.03em}
.bb-gtrack{grid-column:span 12;display:grid;grid-template-columns:repeat(12,1fr);gap:6px;height:38px}
.bb-gseg{position:relative;display:flex;align-items:center;justify-content:center;padding:4px 6px;text-align:center;cursor:default}
.bb-gseg span{font-size:8px;letter-spacing:.03em;font-weight:700;line-height:1.25}
.bb-gseg-tip{position:absolute;top:calc(100% + 10px);left:50%;transform:translateX(-50%);width:230px;background:#141317;border:1px solid var(--pborder);padding:14px 16px;opacity:0;visibility:hidden;transition:opacity .16s ease;pointer-events:none;z-index:30;box-shadow:0 16px 36px rgba(0,0,0,.55);text-align:left}
.bb-gseg:hover .bb-gseg-tip{opacity:1;visibility:visible}
.bb-gseg-tip-title{font-family:'Bebas Neue',sans-serif;font-size:14px;letter-spacing:.3px;color:var(--paper);margin-bottom:5px;line-height:1.2}
.bb-gseg-tip-wk{font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--pu2);font-weight:700;margin-bottom:9px}
.bb-gseg-tip-desc{font-size:10.5px;line-height:1.65;color:var(--muted)}
.bb-glegend{display:flex;gap:20px;margin-top:26px;flex-wrap:wrap;border-top:1px solid var(--border);padding-top:20px}
.bb-glegend-item{display:flex;align-items:center;gap:8px;font-size:10px;letter-spacing:.04em;color:var(--muted)}
.bb-glegend-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0}
/* TIMELINE (mobile vertical stepper — swaps in for the Gantt below 768px) */
.bb-timeline-mobile{display:none;margin-top:44px;border:1px solid var(--border);background:var(--bg2);padding:8px 22px}
.bb-tl-row{display:flex;gap:14px;padding:18px 0;border-top:1px solid var(--border)}
.bb-tl-row:first-child{border-top:none}
.bb-tl-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;margin-top:4px}
.bb-tl-wk{font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--pu2);font-weight:700;margin-bottom:5px}
.bb-tl-name{font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:.3px;color:var(--paper);margin-bottom:6px}
.bb-tl-sub{font-size:11px;line-height:1.7;color:var(--muted)}
/* SPLIT LISTS (interview Qs / key insights) */
.bb-split{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:44px}
.bb-listcard{border:1px solid var(--border);background:var(--bg2);padding:26px}
.bb-listcard h4{font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:1.5px;color:var(--paper);margin-bottom:14px}
.bb-qlist,.bb-ilist{list-style:none}
.bb-qlist li,.bb-ilist li{font-size:11.5px;line-height:1.75;color:var(--muted);padding:9px 0 9px 18px;border-top:1px solid var(--border);position:relative}
.bb-qlist li:first-child,.bb-ilist li:first-child{border-top:none;padding-top:0}
.bb-qlist li::before{content:'•';position:absolute;left:0;color:var(--pu)}
.bb-ilist li::before{content:'•';position:absolute;left:0;color:var(--pu)}
/* BAR GRAPH */
.bb-bargraph{margin-top:44px;border:1px solid var(--border);background:var(--bg2);padding:30px 28px}
.bb-bargraph-title{font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:1.5px;color:var(--paper);margin-bottom:6px}
.bb-bargraph-note{font-size:10.5px;color:var(--muted);opacity:.75;margin-bottom:26px;line-height:1.7;max-width:600px}
.bb-bar-row{margin-bottom:26px}
.bb-bar-row:last-child{margin-bottom:0}
.bb-bar-top{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px;gap:16px}
.bb-bar-label{font-size:11.5px;font-weight:700;color:var(--paper);letter-spacing:.02em}
.bb-bar-tier{font-size:9px;letter-spacing:.1em;text-transform:uppercase;font-weight:700;white-space:nowrap}
.bb-bar-track{height:10px;background:rgba(240,235,224,0.06);border:1px solid var(--border)}
.bb-bar-fill{height:100%}
.bb-bar-reason{font-size:10.5px;color:var(--muted);line-height:1.7;margin-top:10px;max-width:640px}
/* TABLES (research synthesis) */
.bb-table{margin-top:44px;border:1px solid var(--border)}
.bb-subhead{margin-top:56px}
.bb-subhead:first-child{margin-top:0}
.bb-subhead-label{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--pu);font-weight:700;margin-bottom:6px}
.bb-subhead-title{font-family:'Bebas Neue',sans-serif;font-size:19px;letter-spacing:.5px;color:var(--paper)}
/* NEED -> FEATURE -> OUTCOME CARDS */
.bb-nfo-card{border:1px solid var(--border);background:var(--bg2);padding:24px}
.bb-nfo-row{padding:13px 0;border-top:1px solid var(--border)}
.bb-nfo-row:first-child{border-top:none;padding-top:0}
.bb-nfo-l{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--pu);font-weight:700;margin-bottom:6px}
.bb-nfo-v{font-size:12px;color:var(--paper);line-height:1.75}
.bb-trow{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--border)}
.bb-trow:first-child{border-top:none}
.bb-trow.head{border-bottom:2px solid var(--pborder)}
.bb-trow.head .bb-tcell{color:var(--pu);font-weight:700;font-size:10px;letter-spacing:.14em;text-transform:uppercase}
.bb-tcell{padding:18px 22px;font-size:11.5px;line-height:1.75;color:var(--muted)}
.bb-tcell:first-child{border-right:1px solid var(--border)}
.bb-table3 .bb-trow{grid-template-columns:1fr 1fr 1fr}
.bb-tcell.mid{border-right:1px solid var(--border)}
/* PERSONA CARDS */
.bb-persona{border:1px solid var(--border);background:var(--bg2);padding:28px}
.bb-persona-tag{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--pu);font-weight:700;margin-bottom:12px}
.bb-persona h3{font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:.3px;color:var(--paper);margin-bottom:10px}
.bb-persona p{font-size:11.5px;line-height:1.8;color:var(--muted);margin-bottom:18px}
.bb-persona-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.bb-persona-attr{background:var(--bg);border:1px solid var(--border);padding:11px 13px}
.bb-persona-attr-l{font-size:8px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);opacity:.7;margin-bottom:4px}
.bb-persona-attr-v{font-size:11px;color:var(--paper);font-weight:700;line-height:1.4}
/* EMPATHY MAP — two side-by-side 2x2 blocks, each with a centered persona avatar */
.bb-empathy-cols{display:grid;grid-template-columns:1fr 1fr;gap:56px;margin-top:44px}
.bb-empathy-col-tag{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--pu);font-weight:700;margin-bottom:24px;display:flex;align-items:center;gap:10px}
.bb-empathy-col-tag::after{content:'';flex:1;height:1px;background:rgba(240,235,224,0.15)}
.bb-empathy-wrap{position:relative}
.bb-empathy{display:grid;grid-template-columns:1fr 1fr;gap:60px 56px}
.bb-emp-q{background:var(--bg2);border:1px solid var(--border);padding:24px 22px;transition:border-color .25s}
.bb-emp-q:hover{border-color:var(--pborder)}
.bb-emp-q h4{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--pu);font-weight:700;margin-bottom:11px}
.bb-emp-list{list-style:none}
.bb-emp-list li{font-size:11px;line-height:1.65;color:var(--paper);font-style:italic;position:relative;padding-left:13px;margin-bottom:8px}
.bb-emp-list li:last-child{margin-bottom:0}
.bb-emp-list li::before{content:'•';position:absolute;left:0;color:var(--pu)}
.bb-emp-q.plain .bb-emp-list li{font-style:normal;color:var(--muted)}
.bb-emp-center{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92px;height:92px;border-radius:50%;background:var(--bg);border:2px solid var(--pu);box-shadow:0 0 0 6px var(--bg);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;z-index:2}
.bb-emp-center-ic{width:30px;height:30px;border-radius:50%;background:var(--pbg);border:1px solid var(--pborder);display:flex;align-items:center;justify-content:center;font-size:13px}
.bb-emp-center-l{font-size:6.5px;letter-spacing:.04em;text-transform:uppercase;color:var(--muted);text-align:center;line-height:1.3;padding:0 4px}
/* GOAL STATEMENT */
.bb-goal{margin-top:44px;background:var(--pbg);border:1px solid var(--pborder);padding:32px 36px}
.bb-goal-tag{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);font-weight:700;margin-bottom:12px}
.bb-goal p{font-size:14px;line-height:1.85;max-width:800px;color:var(--paper)}
/* CARD SORT BOARD */
.bb-sortboard{margin-top:44px;display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.bb-sortcol{border:1px solid var(--border);background:var(--bg2);padding:18px}
.bb-sortcol h4{font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--paper);font-weight:700;margin-bottom:14px;padding-bottom:12px;border-bottom:2px solid var(--pu)}
.bb-sortchip{font-size:10.5px;color:var(--muted);background:var(--bg);border:1px solid var(--border);padding:9px 11px;margin-bottom:8px}
/* TASK FLOW CARDS */
.bb-flowcard{border:1px solid var(--border);background:var(--bg2);padding:22px}
.bb-flowcard+.bb-flowcard{margin-top:14px}
.bb-flowcard-title{font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:.3px;color:var(--paper);margin-bottom:16px}
.bb-flowrow{display:flex;flex-wrap:wrap;align-items:center;gap:8px}
.bb-flowstep{background:var(--bg);border:1px solid var(--border);padding:11px 15px;font-size:10.5px;font-weight:700;color:var(--paper)}
.bb-flowarrow{color:var(--pu);font-size:13px;font-weight:800}
.bb-flowcard-note{font-size:10.5px;line-height:1.75;color:var(--muted);opacity:.8;margin-top:16px}
.bb-flow-note{font-size:11.5px;line-height:1.85;color:var(--muted);opacity:.8;max-width:760px;margin-top:20px}
/* INFORMATION ARCHITECTURE MODULE GRID */
.bb-iamodgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.bb-iamod{border:1px solid var(--border);background:var(--bg2);padding:20px;transition:border-color .25s}
.bb-iamod:hover{border-color:var(--pborder)}
.bb-iamod-num{font-family:'Bebas Neue',sans-serif;font-size:19px;color:var(--pu);margin-bottom:9px}
.bb-iamod-title{font-size:12px;font-weight:700;color:var(--paper);margin-bottom:7px}
.bb-iamod-desc{font-size:10.5px;line-height:1.7;color:var(--muted)}
/* CONNECTED SYSTEM FLOW */
.bb-sysflow{display:flex;align-items:stretch;gap:14px}
.bb-sysstep{flex:1;border:1px solid var(--border);background:var(--bg2);padding:26px 22px}
.bb-sysstep-num{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--pu);font-weight:700;margin-bottom:12px}
.bb-sysstep-title{font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:.3px;color:var(--paper);margin-bottom:10px}
.bb-sysstep-desc{font-size:11px;line-height:1.75;color:var(--muted)}
.bb-sysarrow{display:flex;align-items:center;justify-content:center;color:var(--pu);font-size:20px;font-weight:800;flex-shrink:0}
/* TYPOGRAPHY & COLOR — Design Phase */
.bb-dp-block{margin-top:48px}
.bb-dp-block:first-child{margin-top:36px}
.bb-dp-subhead{display:flex;align-items:center;gap:12px;margin-bottom:20px}
.bb-dp-subhead-dot{width:8px;height:8px;border-radius:50%;background:var(--pu);flex-shrink:0}
.bb-dp-subhead-text{font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:1px;color:var(--paper)}
/* Typography */
.bb-typo-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border);border:1px solid var(--border)}
.bb-typo-showcase{background:var(--bg2);padding:32px;display:flex;flex-direction:column;justify-content:center}
.bb-typo-name{font-family:var(--font-geist-sans),'Segoe UI',Arial,sans-serif;font-size:36px;font-weight:800;color:var(--paper);letter-spacing:-.5px;margin-bottom:22px;line-height:1.1}
.bb-typo-line{font-family:var(--font-geist-sans),'Segoe UI',Arial,sans-serif;font-size:14px;color:var(--muted);line-height:2;letter-spacing:.02em;word-break:break-word}
.bb-typo-side{background:var(--bg2);padding:32px}
.bb-typo-explain{font-size:12px;line-height:1.9;color:var(--muted)}
.bb-typo-note{font-size:11.5px;line-height:1.85;color:var(--muted);opacity:.75;margin-top:14px}
.bb-typo-weights{margin-top:22px;border:1px solid var(--pborder);background:var(--pbg);padding:20px 22px;display:grid;grid-template-columns:1fr 1fr;gap:16px 20px}
.bb-typo-weight-row{font-family:var(--font-geist-sans),'Segoe UI',Arial,sans-serif;font-size:14px;color:var(--paper)}
/* Color */
.bb-dp-intro{font-size:12px;line-height:1.9;color:var(--muted);max-width:760px;margin-bottom:24px}
.bb-colorgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.bb-colorcard{border:1px solid var(--border);background:var(--bg2);padding:26px 24px;text-align:center;transition:border-color .25s}
.bb-colorcard:hover{border-color:var(--pborder)}
.bb-colordot{width:68px;height:68px;border-radius:50%;margin:0 auto 18px;border:1px solid rgba(240,235,224,0.15)}
.bb-colorname{font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:.5px;color:var(--paper);margin-bottom:5px}
.bb-colorhex{font-size:10px;color:var(--pu2);font-family:'Space Mono',monospace}
/* FEATURE CARDS */
.bb-featgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:44px}
.bb-feat{border:1px solid var(--border);background:var(--bg2);padding:22px;transition:border-color .25s}
.bb-feat:hover{border-color:var(--pborder)}
.bb-feat-ic{width:38px;height:38px;border:1px solid var(--pborder);background:var(--pbg);display:flex;align-items:center;justify-content:center;font-size:16px;margin-bottom:16px}
.bb-feat h3{font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:.5px;color:var(--paper);margin-bottom:8px}
.bb-feat p{font-size:11px;line-height:1.75;color:var(--muted)}
/* PRODUCT SHOWCASE — real screenshots, one per row, matches site's image-container convention */
.bb-showcase-intro{font-size:11.5px;line-height:1.9;color:var(--muted);max-width:760px;margin-top:20px}
.bb-showcase-list{display:flex;flex-direction:column;gap:36px;margin-top:40px}
.bb-showcase-item img{width:100%;height:auto;display:block;border:1px solid var(--border);background:var(--bg2)}
.bb-showcase-cap{font-size:10.5px;color:var(--muted);text-align:center;margin-top:14px;letter-spacing:.02em}
/* USABILITY */
.bb-usab{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:44px}
/* OUTCOME (dark secondary band — same treatment as sf-impact-final) */
.bb-outcome-band{background:var(--bg2)}
.bb-outcome-inner{max-width:var(--max);margin:0 auto;padding:80px var(--pad)}
.bb-outcards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px}
.bb-outcard{border:1px solid var(--border);background:var(--bg);padding:24px}
.bb-outcard h3{font-family:'Bebas Neue',sans-serif;font-size:17px;letter-spacing:.5px;color:var(--pu2);margin-bottom:10px}
.bb-outcard p{font-size:11.5px;line-height:1.8;color:var(--muted)}
.bb-takeaway{margin-top:44px;padding-top:32px;border-top:1px solid var(--border)}
.bb-takeaway p{font-size:12.5px;line-height:1.95;max-width:680px;color:var(--muted)}
.bb-finaltag{margin-top:20px;font-family:'Bebas Neue',sans-serif;font-size:clamp(22px,3vw,32px);letter-spacing:.5px;color:var(--paper)}
.bb-finaltag span{color:var(--pu2)}
/* NEXT PROJECT */
.bb-next{background:var(--bg2)}
.bb-next-inner{max-width:var(--max);margin:0 auto;padding:64px var(--pad);display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:center}
.bb-next-preview{display:block;position:relative;overflow:hidden;aspect-ratio:4/3;border:1px solid var(--border);transition:border-color .2s}
.bb-next-preview:hover{border-color:var(--pborder)}
.bb-next-preview-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px}
.bb-next-preview-cat{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:6px}
.bb-next-preview-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(16px,2.2vw,26px);letter-spacing:-.5px;color:#fff;line-height:1}
.bb-next-tag{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--pu);display:flex;align-items:center;gap:10px;margin-bottom:16px}
.bb-next-tag::after{content:'';width:36px;height:1px;background:var(--pu)}
.bb-next-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4.5vw,56px);letter-spacing:-1px;color:var(--paper);line-height:.92;margin-bottom:14px}
.bb-next-desc{font-size:11px;line-height:1.85;color:var(--muted);max-width:380px;margin-bottom:28px}
.bb-next-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.bb-btn{font-size:10px;letter-spacing:.12em;text-transform:uppercase;background:var(--pu);color:var(--bg);border:2px solid var(--pu);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.bb-btn:hover{background:var(--pu2);border-color:var(--pu2)}
.bb-ghost-btn{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:12px 24px;text-decoration:none;transition:all .2s;display:inline-block}
.bb-ghost-btn:hover{border-color:var(--pu);color:var(--pu)}
/* FOOTER */
.bb-foot{border-top:1px solid var(--border)}
.bb-foot-inner{max-width:var(--max);margin:0 auto;padding:44px var(--pad);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.bb-flogo{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:4px;color:var(--paper);text-decoration:none;display:inline-block}
.bb-flogo span{color:var(--pu)}
.bb-fcopy{font-size:9px;color:var(--muted)}
.bb-flinks{display:flex;gap:18px;flex-wrap:wrap;align-items:center}
.bb-flinks a{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.bb-flinks a:hover{color:var(--pu)}
.bb-fall{color:var(--pu)!important}
/* REVEAL */
.bb-rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.bb-rv.in{opacity:1;transform:translateY(0)}
/* ===== RESPONSIVE ===== */
@media(max-width:1220px){
  .bb-empathy-cols{grid-template-columns:1fr;gap:72px}
  .bb-empathy-wrap{max-width:640px;margin:0 auto}
}
@media(max-width:1100px){
  .bb-cols-2{grid-template-columns:1fr}
  .bb-split{grid-template-columns:1fr;gap:16px}
  .bb-sortboard{grid-template-columns:1fr 1fr}
  .bb-featgrid{grid-template-columns:1fr 1fr}
  .bb-colorgrid{grid-template-columns:1fr 1fr}
  .bb-outcards{grid-template-columns:1fr}
  .bb-usab{grid-template-columns:1fr}
  .bb-cols-3{grid-template-columns:1fr 1fr}
  .bb-iamodgrid{grid-template-columns:1fr 1fr}
  .bb-next-inner{grid-template-columns:1fr;gap:32px}
}
@media(max-width:1023px){
  :root{--pad:32px}
  .bb-nav-inner{padding:14px 28px}
  .bb-trow{grid-template-columns:1fr}
  .bb-tcell:first-child{border-right:none;border-bottom:1px solid var(--border)}
  .bb-trow.head .bb-tcell:nth-child(2){display:none}
  .bb-table3 .bb-trow{grid-template-columns:1fr}
  .bb-tcell.mid{border-right:none;border-bottom:1px solid var(--border)}
  .bb-ptrack{grid-template-columns:repeat(3,1fr);row-gap:44px}
  .bb-ptrack::before{display:none}
  .bb-ps::after{content:'';position:absolute;top:26px;left:calc(50% + 26px);right:calc(-50% + 26px);height:1px;background:var(--border);z-index:0;pointer-events:none}
  .bb-ps:nth-child(3)::after,.bb-ps:last-child::after{display:none}
  .bb-gweeks,.bb-grow{grid-template-columns:150px repeat(12,1fr)}
  .bb-gseg-tip{width:190px;padding:12px 14px}
}
@media(max-width:768px){
  :root{--pad:24px}
  .bb-hero-inner{padding:110px var(--pad) 44px}
  .bb-body-inner{padding:52px var(--pad)}
  .bb-cover{padding:36px var(--pad) 0}
  .bb-meta-row{gap:24px}
  .bb-cardgrid{gap:14px}
  .bb-sortboard{grid-template-columns:1fr}
  .bb-featgrid{grid-template-columns:1fr}
  .bb-typo-grid{grid-template-columns:1fr}
  .bb-colorgrid{grid-template-columns:1fr 1fr}
  .bb-cols-3{grid-template-columns:1fr}
  .bb-iamodgrid{grid-template-columns:1fr}
  .bb-sysflow{flex-direction:column}
  .bb-sysarrow{transform:rotate(90deg)}
  .bb-gantt{display:none}
  .bb-timeline-mobile{display:block}
  .bb-empathy-wrap{max-width:none}
  .bb-empathy{grid-template-columns:1fr;gap:16px}
  .bb-emp-center{position:static;transform:none;margin:0 auto 22px;box-shadow:none}
  .bb-ptrack{grid-template-columns:1fr;gap:0}
  .bb-ps::after{display:none}
  .bb-ps{text-align:left;padding:16px 0;border-bottom:1px solid var(--border);display:flex;flex-direction:row;align-items:flex-start;gap:16px}
  .bb-pn{flex-shrink:0;margin:0;align-self:stretch;display:flex;align-items:center;justify-content:center;min-height:52px}
  .bb-next-inner{padding:44px var(--pad)}
  .bb-outcome-inner{padding:56px var(--pad)}
  .bb-foot-inner{flex-direction:column;align-items:flex-start;gap:20px;padding:32px var(--pad)}
  .bb-flinks{flex-direction:column;gap:10px;align-items:flex-start}
}
@media(max-width:480px){
  :root{--pad:16px}
  .bb-abar{padding:9px 16px}
  .bb-abar span{font-size:7px}
  .bb-colorgrid{grid-template-columns:1fr}
  .bb-meta-row{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
}
@media(hover:none),(pointer:coarse){
  .bb-hamburger{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center}
  .bb-nav-r{display:none}
  .bb-btn,.bb-ghost-btn{min-height:44px;display:inline-flex;align-items:center;justify-content:center}
}
@media(min-width:1024px){
  .bb-hamburger{display:none}
  .bb-nav-r{display:flex}
}
@media(prefers-reduced-motion:reduce){
  .bb-rv{transition:none;opacity:1;transform:none}
  .bb-drawer{transition:none}
  .bb-ndot,.bb-adot{animation:none}
}
`

const PROCESS = [
    { n: "01", t: "Empathize", d: "Conducted surveys and interviews to understand how residents receive updates and how barangay teams manage repeated service inquiries." },
    { n: "02", t: "Define", d: "Defined the main problem: information is scattered and service workflows are still handled manually." },
    { n: "03", t: "Ideate", d: "Prioritized features that matched research findings, including announcements, requests, contacts, events, polls, and resources." },
    { n: "04", t: "Design", d: "Designed resident flows, admin workflows, visual direction, and high-fidelity screens with clear labels and friendly branding." },
    { n: "05", t: "Test", d: "Reviewed clarity, readability, task flow, and whether users could understand the value without needing extra explanation." },
]

const TIMELINE_GROUPS = [
    { name: "Research & Discovery", color: "#9B59D0", text: "#F8F6FC" },
    { name: "UX Structure", color: "#7C6FE0", text: "#F8F6FC" },
    { name: "UI Design", color: "#4E8FE0", text: "#F8F6FC" },
    { name: "Validation", color: "#E0A83E", text: "#1A1408" },
    { name: "Handoff & Launch Support", color: "#4FBFA8", text: "#0A1613" },
]

const TIMELINE_PHASES = [
    { label: "UX Strategy & Discovery", wk: "W1–W2", s: 1, e: 3, group: 0, desc: "Defined the problem, product goal, target users, and initial feature direction." },
    { label: "Surveys & Interviews", wk: "W2–W3", s: 2, e: 4, group: 0, desc: "Collected input from residents and barangay officials/staff to understand real needs and service pain points." },
    { label: "Research Synthesis", wk: "W3–W4", s: 3, e: 5, group: 0, desc: "Reviewed responses, identified key insights, and shaped the personas and product direction." },
    { label: "Feature Prioritization & User Flows", wk: "W4–W5", s: 4, e: 6, group: 1, desc: "Prioritized the most important features and mapped the core resident and admin flows." },
    { label: "Information Architecture & Wireframes", wk: "W5–W6", s: 5, e: 7, group: 1, desc: "Organized the product structure and created low-fidelity wireframes for the main tasks." },
    { label: "UI Visual Design", wk: "W6–W8", s: 6, e: 9, group: 2, desc: "Designed the mobile app, admin portal, visual system, and reusable interface components." },
    { label: "Prototype", wk: "W8–W9", s: 8, e: 10, group: 3, desc: "Connected the key flows to better review the product experience." },
    { label: "Usability Review & Iteration", wk: "W9–W10", s: 9, e: 11, group: 3, desc: "Reviewed clarity, task flow, and information access, then improved the design based on findings." },
    { label: "Design QA & Developer Handoff", wk: "W10–W11", s: 10, e: 12, group: 4, desc: "Prepared final screens, checked consistency, and supported handoff for development." },
    { label: "Final Polish & Google Play Launch Support", wk: "W12", s: 12, e: 13, group: 4, desc: "Polished the final design and supported the app's readiness for Google Play release." },
]

const SURVEY_THEMES = [
    { label: "Announcements", tier: "Core Priority", value: 95, reason: "Residents need one trusted place to check official updates and reminders." },
    { label: "Document Requests", tier: "Core Priority", value: 90, reason: "Residents need a clearer way to submit requests and follow request status without repeated follow-ups." },
    { label: "Emergency Contacts", tier: "Core Priority", value: 88, reason: "Hotlines and office contacts need to be easy to find quickly, especially during urgent situations." },
    { label: "Community Polls", tier: "Supporting Feature", value: 65, reason: "Polls help barangays collect feedback and encourage participation, but they are secondary to urgent service and information needs." },
]

const RESEARCH_TABLE = [
    { f: "Residents often miss announcements across scattered channels.", d: "Create an announcements area with push notification support." },
    { f: "Document requests often require repeated status follow-ups.", d: "Add request submission and status tracking." },
    { f: "Emergency numbers and office contacts are not always easy to find.", d: "Create a dedicated emergency contacts and public information section." },
    { f: "Barangay teams need fewer repetitive manual updates.", d: "Design an admin portal for publishing and managing content in one place." },
]

const NEED_FEATURE_OUTCOME = [
    { need: "Residents need official updates they can trust.", feature: "Announcements and push notifications.", outcome: "Fewer missed updates and less dependence on scattered channels." },
    { need: "Residents need clarity when requesting documents.", feature: "Document request submission and status tracking.", outcome: "Less confusion and fewer repeated follow-ups." },
    { need: "Residents need fast access to important contacts.", feature: "Emergency contacts and public information.", outcome: "Important details are easier to find when needed." },
    { need: "Barangay teams need to manage information in one place.", feature: "Web admin portal for updates, requests, schedules, and resources.", outcome: "More organized operations and clearer resident communication." },
]

const INTERVIEW_QUESTIONS = [
    "How do you usually know about barangay announcements or events?",
    "What barangay information do you often need to ask for?",
    "Have you experienced confusion when requesting documents?",
    "Would a mobile app help you stay updated with barangay services?",
    "For staff: which tasks take too much time because they are handled manually?",
]

const KEY_INSIGHTS = [
    "Residents want one trusted place to check official updates.",
    "Document request status needs to be easier to follow.",
    "Emergency contacts and public resources should be easy to find quickly.",
    "Barangay teams need a cleaner way to manage updates and reduce repeated questions.",
]

const CARD_SORT: Record<string, string[]> = {
    "Updates": ["Announcements", "Push Notifications", "Advisories", "Reminders"],
    "Services": ["Document Requests", "Request Status", "Reports", "Public Resources"],
    "Community": ["Events", "Schedules", "Polls", "Gallery"],
    "Support": ["Emergency Contacts", "Office Contacts", "Help Information", "Barangay Profile"],
}

const SYSTEM_OVERVIEW = [
    { tag: "Mobile App", title: "Resident App", desc: "Residents use the mobile app to receive official updates, request documents, check emergency contacts, view events, join polls, and access public resources." },
    { tag: "Web Portal", title: "Web Admin Portal", desc: "Barangay officials and staff use the admin portal to publish content, manage requests, update schedules, organize contacts, and keep the resident app accurate." },
    { tag: "The Link", title: "Connected System", desc: "The admin portal manages the information. The mobile app makes that information easier for residents to access and act on." },
]

const RESIDENT_FLOWS = [
    { title: "Resident Onboarding and Barangay Selection", steps: ["Open App", "Welcome Screen", "Select Barangay", "Confirm Barangay", "Login / Register", "Home Dashboard"], note: "This flow helps new residents access the app, choose their barangay, create or enter their account, and land on the correct home dashboard for official updates and services." },
    { title: "Resident Document Request", steps: ["Home", "Document Requests", "Choose Type", "Submit Details", "Track Status"] },
    { title: "Announcement and Notification Viewing", steps: ["Receive Update", "Open Notification", "View Announcement", "Read Details", "Stay Informed"] },
    { title: "Emergency Contact Access", steps: ["Home", "Emergency Contacts", "Choose Contact", "View Hotline Details"] },
    { title: "Community Engagement", steps: ["Home", "Events / Polls", "View Details", "Participate"] },
]

const ADMIN_FLOWS = [
    { title: "Publish an Announcement", steps: ["Login Admin", "Announcements", "Create Post", "Review Details", "Publish", "Notify Residents"] },
    { title: "Manage Document Requests", steps: ["Login Admin", "Requests", "View Submission", "Update Status", "Resident Notified"] },
    { title: "Create or Update Schedules", steps: ["Login Admin", "Schedules / Events", "Add Details", "Set Date & Time", "Publish to App"] },
    { title: "Update Contacts and Public Resources", steps: ["Login Admin", "Contacts / Resources", "Add or Edit Info", "Save Changes", "Visible in App"] },
    { title: "Manage Polls and Gallery Updates", steps: ["Login Admin", "Polls / Gallery", "Create Content", "Publish", "Residents View"] },
]

const IA_RESIDENT_MODULES = [
    { num: "01", title: "Home Dashboard", desc: "Quick access to announcements, requests, events, hotlines, and important barangay updates." },
    { num: "02", title: "Announcements", desc: "Official updates, reminders, advisories, and notices published by the barangay admin." },
    { num: "03", title: "Document Requests", desc: "Choose a request type, submit details, and check request progress." },
    { num: "04", title: "Events & Schedules", desc: "Upcoming barangay programs, meetings, activities, and community dates." },
    { num: "05", title: "Emergency Contacts", desc: "Fast access to barangay hotlines, office contacts, and emergency information." },
    { num: "06", title: "Community Polls", desc: "Simple feedback activities and community-related questions for residents." },
    { num: "07", title: "Public Resources", desc: "Helpful documents, guidelines, forms, and public information residents may need." },
    { num: "08", title: "Gallery & Reports", desc: "Community updates, project photos, activity highlights, and reports where applicable." },
]

const IA_ADMIN_MODULES = [
    { num: "01", title: "Dashboard", desc: "Overview of recent requests, updates, and content that needs attention." },
    { num: "02", title: "Requests Management", desc: "Review resident submissions, update status, and manage service follow-ups." },
    { num: "03", title: "Announcements", desc: "Create, edit, publish, and manage official announcements shown in the resident app." },
    { num: "04", title: "Schedules & Events", desc: "Manage barangay activities, meetings, reminders, and community programs." },
    { num: "05", title: "Contacts & Hotlines", desc: "Maintain emergency numbers, office contacts, and public contact details." },
    { num: "06", title: "Resources", desc: "Organize public documents, downloadable information, forms, and service guidelines." },
    { num: "07", title: "Polls & Gallery", desc: "Manage community polls, activity photos, public updates, and gallery content." },
    { num: "08", title: "User Roles & Barangay Settings", desc: "Support role-based access and keep barangay profile information properly managed." },
]

const CONNECTED_STEPS = [
    { num: "Step 01", title: "Admin Creates Content", desc: "Officials and staff add announcements, events, contacts, resources, polls, and request updates from the web portal." },
    { num: "Step 02", title: "Content Appears in the App", desc: "Residents see the latest information inside the mobile app based on the barangay they selected." },
    { num: "Step 03", title: "Residents Take Action", desc: "Residents read updates, request documents, join polls, check hotlines, and stay connected with the barangay." },
]

const FEATURE_CARDS = [
    { ic: "📢", title: "Announcements", d: "Residents can see official updates and reminders in one place." },
    { ic: "🔔", title: "Notifications", d: "Important alerts can reach residents faster through app notifications." },
    { ic: "📄", title: "Requests", d: "Residents can submit and track document requests more clearly." },
    { ic: "☎️", title: "Emergency Contacts", d: "Hotlines and office contacts are easier to find when needed." },
]

const SHOWCASE_IMAGES = [
    { src: "/Barangay%20Buddy%20Banner%20Showcase%20-%201st.png", alt: "Barangay Buddy resident app — home, requests, services, community polls, and gallery screens", cap: "Resident app — home, requests, services, community polls, and gallery" },
    { src: "/Barangay%20Buddy%20Banner%20Showcase%20-%202nd.png", alt: "Barangay Buddy resident app shown in everyday use on a phone — profile, digital ID, and notifications", cap: "Resident app in everyday use — profile, digital ID, and notifications" },
    { src: "/Barangay%20Buddy%20Banner%20Showcase%20-%203rd.png", alt: "Barangay Buddy web admin portal — resident directory and announcements management", cap: "Web admin portal — resident directory and announcements management" },
    { src: "/Barangay%20Buddy%20Banner%20Showcase%20-%204th.png", alt: "Field visit to Barangay Bantigue, Hilongos, Leyte presenting Barangay Buddy to local officials", cap: "Field visit to Barangay Bantigue, Hilongos, Leyte — presenting Barangay Buddy and gathering community input" },
]

const SWATCHES = [
    { name: "Primary Navy", hex: "#17215D" },
    { name: "Service Blue", hex: "#256FE6" },
    { name: "Golden Yellow", hex: "#F8B615" },
    { name: "Soft Background", hex: "#F8FBFF" },
]

const FONT_WEIGHTS = [
    { name: "Geist Sans Bold", weight: 700 },
    { name: "Geist Sans Medium", weight: 500 },
    { name: "Geist Sans Regular", weight: 400 },
    { name: "Geist Sans Light", weight: 300 },
]

const EMPATHY_MAPS = [
    {
        tag: "Resident Persona",
        short: "Resident",
        icon: "🧑",
        says: [
            "“Where can I check the latest barangay announcement?”",
            "“I want to know if my document request is already approved.”",
            "“Who should I contact during an emergency?”",
        ],
        thinks: [
            "“I hope the information I see is official and updated.”",
            "“It would be easier if I did not have to ask the same question again.”",
            "“I need a simple way to check services without going to the barangay hall right away.”",
        ],
        does: [
            "Checks group chats, social media posts, or asks other residents for updates.",
            "Visits or messages the barangay office to follow up on document requests.",
            "Looks for emergency numbers only when the need becomes urgent.",
        ],
        feels: [
            "Confused when updates are scattered across different channels.",
            "Frustrated when request status is unclear.",
            "Relieved when information is official, easy to find, and simple to understand.",
        ],
    },
    {
        tag: "Barangay Officials & Staff Persona",
        short: "Officials & Staff",
        icon: "🧑‍💼",
        says: [
            "“We need a faster way to post announcements and updates.”",
            "“Residents often ask the same questions about requests and schedules.”",
            "“It would help if documents, contacts, and public information were easier to manage.”",
        ],
        thinks: [
            "“Manual follow-ups take time away from other barangay work.”",
            "“Residents need clear information, but updates are spread across different channels.”",
            "“A structured system could help us organize requests and reduce repeated questions.”",
        ],
        does: [
            "Publishes announcements, schedules, and public information for residents.",
            "Handles document requests, follow-ups, contacts, and resources manually.",
            "Answers repeated questions from residents through messages, calls, or in-person visits.",
        ],
        feels: [
            "Overloaded when information and requests are handled manually.",
            "Concerned when residents miss important updates.",
            "More confident when there is one organized portal to manage communication and services.",
        ],
    },
]

export default function BarangayBuddyPage() {
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
        const els = Array.from(ref.current?.querySelectorAll(".bb-rv") || [])
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
        <div className="bb" ref={ref}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" />
            <style>{CSS}</style>

            {/* AVAILABLE BAR */}
            <div className={`bb-abar${navScroll ? " show" : ""}`}>
                <div className="bb-adot" />
                <span>Available for new projects</span>
            </div>

            {/* NAV */}
            <nav className="bb-nav" style={{ top: navScroll ? "38px" : "0" }}>
                <div className="bb-nav-inner">
                    <a className="bb-logo" href="/">JADEY<span>.</span></a>
                    <div className="bb-nav-r">
                        <div className="bb-ndot" />
                        <a href="/all-work">All Projects</a>
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a className="bb-nav-contact" href="/#contact">Contact Me</a>
                    </div>
                    <button ref={hamburgerRef} className="bb-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* MOBILE DRAWER */}
            <div ref={drawerRef} className={`bb-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-label="Navigation menu">
                <button className="bb-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <a href="/all-work" onClick={() => setMenuOpen(false)}>All Projects</a>
                <a href="/#about" onClick={() => setMenuOpen(false)}>About Me</a>
                <a href="/#work" onClick={() => setMenuOpen(false)}>Work Highlights</a>
                <a href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <a href="/#insights" onClick={() => setMenuOpen(false)}>Blog</a>
                <a href="/#workshops" onClick={() => setMenuOpen(false)}>Workshops</a>
                <a className="bb-drawer-cta" href="/#contact" onClick={() => setMenuOpen(false)}>Contact Me</a>
            </div>

            {/* HERO — single-column, same rhythm as every other case study hero */}
            <div className="bb-hero">
                <div className="bb-hero-inner">
                    <div className="bb-hero-ghost">BARANGAY BUDDY</div>
                    <div className="bb-cat bb-rv">UI/UX Design Case Study</div>
                    <h1 className="bb-title bb-rv">Barangay Buddy App</h1>
                    <p className="bb-htag bb-rv">Designing a clearer digital service experience for barangays — from research to launch-ready product experience.</p>
                    <div className="bb-meta-row bb-rv">
                        <div><div className="bb-meta-l">Project</div><div className="bb-meta-v">Barangay Buddy App</div></div>
                        <div><div className="bb-meta-l">Category</div><div className="bb-meta-v">GovTech / Community Platform</div></div>
                        <div><div className="bb-meta-l">Platform</div><div className="bb-meta-v">Resident Android App + Web Admin Portal</div></div>
                        <div><div className="bb-meta-l">App Status</div><div className="bb-meta-v">Resident app available on Google Play</div></div>
                        <div><div className="bb-meta-l">Role</div><div className="bb-meta-v">UI/UX Design, Product Strategy, Visual Design, IA, Prototyping</div></div>
                    </div>
                </div>
            </div>

            {/* COVER — main project showcase banner */}
            <div className="bb-cover bb-rv">
                <div className="bb-cover-wrap">
                    <img src="/Barangay%20Buddy%20Banner%20Showcase%20-%20Main.png" alt="Barangay Buddy App — brand cover with the resident app, landing page, and Google Play availability" />
                </div>
            </div>

            <div className="bb-body">
                <div className="bb-body-inner">

                    {/* OVERVIEW */}
                    <div className="bb-rv" style={{ marginBottom: 84 }}>
                        <div className="bb-sec-label">Overview</div>
                        <h2 className="bb-sec-title">Barangay information is important, but it is often spread across too many channels.</h2>
                        <p className="bb-sec-body">Barangay Buddy was created to give residents and barangay teams one organized digital space for communication and service access. Since the resident app is already available on Google Play, the case study focuses on how the experience was shaped for real adoption, not only as a concept.</p>

                        <div className="bb-cardgrid bb-cols-2">
                            <div className="bb-card">
                                <div className="bb-card-num">The Problem</div>
                                <h3>Problem Statement</h3>
                                <p>Residents need a trusted and accessible way to find official barangay information, while barangay officials and staff need a simpler system for managing announcements, document requests, contacts, events, and public resources without relying on repeated manual follow-ups.</p>
                            </div>
                            <div className="bb-card">
                                <div className="bb-card-num">The Solution</div>
                                <h3>Possible Solution</h3>
                                <p>Create a connected mobile app and admin portal where residents can check updates, submit requests, access hotlines, join polls, and view public resources, while officials and staff can manage content and requests from one structured workspace.</p>
                            </div>
                        </div>

                        <div className="bb-cardgrid bb-cols-2" style={{ marginTop: 16 }}>
                            <div className="bb-card">
                                <div className="bb-card-num">Target Audience — 01</div>
                                <h3>Residents</h3>
                                <p>Need quick access to announcements, document requests, emergency contacts, events, polls, and public resources through one easy-to-use mobile app.</p>
                            </div>
                            <div className="bb-card">
                                <div className="bb-card-num">Target Audience — 02</div>
                                <h3>Barangay Officials &amp; Staff</h3>
                                <p>Need a simple admin system to publish updates, manage requests, organize public information, and communicate with residents more efficiently.</p>
                            </div>
                        </div>
                    </div>

                    {/* MY ROLE */}
                    <div className="bb-rv" style={{ marginBottom: 84 }}>
                        <div className="bb-sec-label">My Role</div>
                        <h2 className="bb-sec-title">Leading the product experience from problem framing to interface design.</h2>
                        <p className="bb-sec-body">I worked on the product strategy, UX direction, user flow planning, information architecture, wireframing, prototyping, visual design, and UI writing for both the resident app and barangay admin portal.</p>
                        <div className="bb-pillrow">
                            {["Product Strategy", "Problem Framing", "Survey & Interview Synthesis", "User Flow", "Information Architecture", "Wireframes", "Visual Design", "Prototype", "Usability Review"].map(r => (
                                <div key={r} className="bb-rpill">{r}</div>
                            ))}
                        </div>
                    </div>

                    {/* DESIGN THINKING PROCESS */}
                    <div className="bb-rv" style={{ marginBottom: 84 }}>
                        <div className="bb-sec-label">Design Thinking Process</div>
                        <h2 className="bb-sec-title">A human-centered process guided by real barangay needs.</h2>
                        <p className="bb-sec-body">The process focused on understanding actual resident and staff pain points, defining the most important service problems, and designing features that directly support barangay communication and service access.</p>
                        <div className="bb-ptrack">
                            {PROCESS.map(p => (
                                <div className="bb-ps" key={p.n}>
                                    <div className="bb-pn">{p.n}</div>
                                    <div className="bb-pt">{p.t}</div>
                                    <div className="bb-pd">{p.d}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* PROJECT TIMELINE */}
                    <div className="bb-rv" style={{ marginBottom: 84 }}>
                        <div className="bb-sec-label">Project Timeline</div>
                        <h2 className="bb-sec-title">A clear UX and UI timeline from research to launch-ready design.</h2>
                        <p className="bb-sec-body">This timeline shows how the Barangay Buddy project moved from research and discovery to visual design, usability review, and launch support. The work started by understanding resident and barangay staff needs, then moved into product structure, interface design, validation, and final design preparation.</p>

                        <div className="bb-gantt">
                            <div className="bb-gantt-inner">
                                <div className="bb-gweeks">
                                    <div>Phase</div>
                                    {Array.from({ length: 12 }, (_, i) => <div key={i}>W{i + 1}</div>)}
                                </div>

                                {TIMELINE_PHASES.map(p => {
                                    const g = TIMELINE_GROUPS[p.group]
                                    return (
                                        <div className="bb-grow" key={p.label}>
                                            <div className="bb-grow-label">
                                                <div className="bb-grow-dot" style={{ background: g.color }} />
                                                <div>
                                                    <div className="bb-grow-name">{p.label}</div>
                                                    <div className="bb-grow-wk">{p.wk}</div>
                                                </div>
                                            </div>
                                            <div className="bb-gtrack">
                                                <div className="bb-gseg" style={{ gridColumn: `${p.s} / ${p.e}`, background: g.color, color: g.text }}>
                                                    <span>{p.wk}</span>
                                                    <div className="bb-gseg-tip">
                                                        <div className="bb-gseg-tip-title">{p.label}</div>
                                                        <div className="bb-gseg-tip-wk">{p.wk}</div>
                                                        <div className="bb-gseg-tip-desc">{p.desc}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="bb-glegend">
                                {TIMELINE_GROUPS.map(g => (
                                    <div className="bb-glegend-item" key={g.name}><div className="bb-glegend-dot" style={{ background: g.color }} />{g.name}</div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile fallback — vertical step timeline instead of a squeezed Gantt */}
                        <div className="bb-timeline-mobile">
                            {TIMELINE_PHASES.map(p => {
                                const g = TIMELINE_GROUPS[p.group]
                                return (
                                    <div className="bb-tl-row" key={p.label}>
                                        <div className="bb-tl-dot" style={{ background: g.color }} />
                                        <div>
                                            <div className="bb-tl-wk">{p.wk} · {g.name}</div>
                                            <div className="bb-tl-name">{p.label}</div>
                                            <div className="bb-tl-sub">{p.desc}</div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="bb-glegend" style={{ marginTop: 4 }}>
                                {TIMELINE_GROUPS.map(g => (
                                    <div className="bb-glegend-item" key={g.name}><div className="bb-glegend-dot" style={{ background: g.color }} />{g.name}</div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* EMPATHIZE PHASE */}
                    <div className="bb-rv" style={{ marginBottom: 84 }}>
                        <div className="bb-sec-label">Empathize Phase</div>
                        <h2 className="bb-sec-title">Research helped us decide what features were actually needed.</h2>
                        <p className="bb-sec-body">Before finalizing the product, surveys and interviews were used to understand how people currently interact with barangay services and how the app could support real daily needs.</p>
                        <p className="bb-sec-body">The interviews focused on residents&rsquo; current habits and barangay teams&rsquo; daily work. The goal was to uncover pain points around communication, request handling, and access to important information.</p>

                        <div className="bb-split">
                            <div className="bb-listcard">
                                <h4>Interview Questions</h4>
                                <ul className="bb-qlist">
                                    {INTERVIEW_QUESTIONS.map(q => <li key={q}>{q}</li>)}
                                </ul>
                            </div>
                            <div className="bb-listcard">
                                <h4>Key Insights</h4>
                                <ul className="bb-ilist">
                                    {KEY_INSIGHTS.map(k => <li key={k}>{k}</li>)}
                                </ul>
                            </div>
                        </div>

                        <div className="bb-bargraph">
                            <div className="bb-bargraph-title">Survey Themes — Feature Priority</div>
                            <p className="bb-bargraph-note">Based on the survey and interview responses, these features came up most often as useful for residents and barangay staff. The priority levels below show how each feature supported the main service problems found during research.</p>
                            {SURVEY_THEMES.map(s => (
                                <div className="bb-bar-row" key={s.label}>
                                    <div className="bb-bar-top">
                                        <div className="bb-bar-label">{s.label}</div>
                                        <div className="bb-bar-tier" style={{ color: s.tier === "Core Priority" ? "var(--pu2)" : "var(--muted)" }}>{s.tier}</div>
                                    </div>
                                    <div className="bb-bar-track">
                                        <div className="bb-bar-fill" style={{ width: `${s.value}%`, background: s.tier === "Core Priority" ? "var(--pu)" : "var(--pu3)" }} />
                                    </div>
                                    <div className="bb-bar-reason">{s.reason}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RESEARCH SYNTHESIS + NEED -> FEATURE -> OUTCOME */}
                    <div className="bb-rv" style={{ marginBottom: 84 }}>
                        <div className="bb-sec-label">Research Synthesis</div>
                        <h2 className="bb-sec-title">Connecting research findings to product decisions.</h2>
                        <p className="bb-sec-body">Every core feature was tied to a user need so the app did not feel like a random collection of tools.</p>

                        <div className="bb-subhead">
                            <div className="bb-subhead-label">Research Finding → Design Decision</div>
                            <div className="bb-table">
                                <div className="bb-trow head">
                                    <div className="bb-tcell">Research Finding</div>
                                    <div className="bb-tcell">Design Decision</div>
                                </div>
                                {RESEARCH_TABLE.map((r, i) => (
                                    <div className="bb-trow" key={i}>
                                        <div className="bb-tcell">{r.f}</div>
                                        <div className="bb-tcell">{r.d}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bb-subhead">
                            <div className="bb-subhead-label">User Need → Feature → Outcome</div>
                            <div className="bb-cardgrid bb-cols-2" style={{ marginTop: 20 }}>
                                {NEED_FEATURE_OUTCOME.map((r, i) => (
                                    <div className="bb-nfo-card" key={i}>
                                        <div className="bb-nfo-row">
                                            <div className="bb-nfo-l">User Need</div>
                                            <div className="bb-nfo-v">{r.need}</div>
                                        </div>
                                        <div className="bb-nfo-row">
                                            <div className="bb-nfo-l">Feature</div>
                                            <div className="bb-nfo-v">{r.feature}</div>
                                        </div>
                                        <div className="bb-nfo-row">
                                            <div className="bb-nfo-l">Outcome</div>
                                            <div className="bb-nfo-v">{r.outcome}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* DEFINE PHASE */}
                    <div className="bb-rv" style={{ marginBottom: 84 }}>
                        <div className="bb-sec-label">Define Phase</div>
                        <h2 className="bb-sec-title">Defining the product around two connected user journeys.</h2>
                        <p className="bb-sec-body">The resident app and admin portal needed to work together. Residents need easy access to information, while officials and staff need a reliable way to manage that information.</p>

                        <div className="bb-cardgrid bb-cols-2">
                            <div className="bb-persona">
                                <div className="bb-persona-tag">Persona — Resident</div>
                                <h3>A Resident of the Barangay</h3>
                                <p>A resident who wants to stay updated, submit requests, find contacts, and participate in barangay activities without confusion.</p>
                                <div className="bb-persona-grid">
                                    <div className="bb-persona-attr"><div className="bb-persona-attr-l">Goal</div><div className="bb-persona-attr-v">Find official updates faster</div></div>
                                    <div className="bb-persona-attr"><div className="bb-persona-attr-l">Need</div><div className="bb-persona-attr-v">Simple mobile access</div></div>
                                    <div className="bb-persona-attr"><div className="bb-persona-attr-l">Pain</div><div className="bb-persona-attr-v">Scattered information</div></div>
                                    <div className="bb-persona-attr"><div className="bb-persona-attr-l">Motivation</div><div className="bb-persona-attr-v">Save time and avoid confusion</div></div>
                                </div>
                            </div>
                            <div className="bb-persona">
                                <div className="bb-persona-tag">Persona — Officials &amp; Staff</div>
                                <h3>A Barangay Team Member</h3>
                                <p>A barangay team member who manages updates, requests, events, contacts, and resources while answering repeated resident questions.</p>
                                <div className="bb-persona-grid">
                                    <div className="bb-persona-attr"><div className="bb-persona-attr-l">Goal</div><div className="bb-persona-attr-v">Manage information clearly</div></div>
                                    <div className="bb-persona-attr"><div className="bb-persona-attr-l">Need</div><div className="bb-persona-attr-v">Simple admin portal</div></div>
                                    <div className="bb-persona-attr"><div className="bb-persona-attr-l">Pain</div><div className="bb-persona-attr-v">Manual follow-ups</div></div>
                                    <div className="bb-persona-attr"><div className="bb-persona-attr-l">Motivation</div><div className="bb-persona-attr-v">Serve residents faster</div></div>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: 56 }}>
                            <div className="bb-sec-label" style={{ marginBottom: 4 }}>Empathy Map</div>
                            <p className="bb-sec-body" style={{ marginTop: 0 }}>The empathy map shows how residents and barangay teams experience the same service problem from different sides. Residents need easier access to official information and services, while barangay officials and staff need a cleaner way to manage updates, requests, and public communication.</p>

                            <div className="bb-empathy-cols">
                                {EMPATHY_MAPS.map(p => (
                                    <div key={p.tag}>
                                        <div className="bb-empathy-col-tag">{p.tag}</div>
                                        <div className="bb-empathy-wrap">
                                            <div className="bb-emp-center">
                                                <div className="bb-emp-center-ic">{p.icon}</div>
                                                <div className="bb-emp-center-l">{p.short}<br />Persona</div>
                                            </div>
                                            <div className="bb-empathy">
                                                <div className="bb-emp-q">
                                                    <h4>Says</h4>
                                                    <ul className="bb-emp-list">{p.says.map(s => <li key={s}>{s}</li>)}</ul>
                                                </div>
                                                <div className="bb-emp-q">
                                                    <h4>Thinks</h4>
                                                    <ul className="bb-emp-list">{p.thinks.map(s => <li key={s}>{s}</li>)}</ul>
                                                </div>
                                                <div className="bb-emp-q plain">
                                                    <h4>Does</h4>
                                                    <ul className="bb-emp-list">{p.does.map(s => <li key={s}>{s}</li>)}</ul>
                                                </div>
                                                <div className="bb-emp-q plain">
                                                    <h4>Feels</h4>
                                                    <ul className="bb-emp-list">{p.feels.map(s => <li key={s}>{s}</li>)}</ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bb-goal" style={{ marginTop: 56 }}>
                            <div className="bb-goal-tag">Goal Statement</div>
                            <p>Barangay Buddy will help residents access official barangay services and information faster by providing one mobile app for updates, requests, contacts, events, and public resources, while giving barangay officials and staff a simple web portal to manage those services.</p>
                        </div>
                    </div>

                    {/* IDEATE PHASE */}
                    <div className="bb-rv" style={{ marginBottom: 84 }}>
                        <div className="bb-sec-label">Ideate Phase</div>
                        <h2 className="bb-sec-title">Organizing features around real barangay tasks.</h2>
                        <p className="bb-sec-body">The feature structure was shaped through brainstorming, card sorting, and user flow mapping. The goal was to group features in a way residents and staff can understand quickly.</p>

                        <div className="bb-sortboard">
                            {Object.entries(CARD_SORT).map(([group, items]) => (
                                <div className="bb-sortcol" key={group}>
                                    <h4>{group}</h4>
                                    {items.map(item => <div className="bb-sortchip" key={item}>{item}</div>)}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* TASK FLOWS + INFORMATION ARCHITECTURE */}
                    <div className="bb-rv" style={{ marginBottom: 84 }}>
                        <div className="bb-sec-label">Task Flows &amp; Information Architecture</div>
                        <h2 className="bb-sec-title">How residents and staff move through the product.</h2>
                        <p className="bb-sec-body">This section shows how residents and barangay teams move through Barangay Buddy. The resident mobile app helps residents access official updates, request documents, check emergency contacts, view events, join polls, and access public resources. The web admin portal helps barangay officials and staff publish content, manage requests, update schedules, organize contacts, and keep resident-facing information accurate.</p>

                        {/* 1. System Overview */}
                        <div className="bb-dp-block">
                            <div className="bb-dp-subhead"><span className="bb-dp-subhead-dot" /><span className="bb-dp-subhead-text">System Overview</span></div>
                            <div className="bb-cardgrid bb-cols-3" style={{ marginTop: 20 }}>
                                {SYSTEM_OVERVIEW.map(c => (
                                    <div className="bb-card" key={c.title}>
                                        <div className="bb-card-num">{c.tag}</div>
                                        <h3>{c.title}</h3>
                                        <p>{c.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 2. Resident Mobile App Flows */}
                        <div className="bb-dp-block">
                            <div className="bb-dp-subhead"><span className="bb-dp-subhead-dot" /><span className="bb-dp-subhead-text">Resident Mobile App Flows</span></div>
                            <p className="bb-sec-body" style={{ marginTop: 0, marginBottom: 22 }}>Resident flows focus on giving people a clear path to official information and services. The most common actions are kept simple so residents can complete them without needing help from staff.</p>
                            {RESIDENT_FLOWS.map(f => (
                                <div className="bb-flowcard" key={f.title}>
                                    <div className="bb-flowcard-title">{f.title}</div>
                                    <div className="bb-flowrow">
                                        {f.steps.map((s, i, arr) => (
                                            <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                <div className="bb-flowstep">{s}</div>
                                                {i < arr.length - 1 && <span className="bb-flowarrow">→</span>}
                                            </div>
                                        ))}
                                    </div>
                                    {f.note && <p className="bb-flowcard-note">{f.note}</p>}
                                </div>
                            ))}
                            <p className="bb-flow-note">The resident app prioritizes quick access to official updates, request tracking, emergency information, and community participation. Each flow is kept short so residents can complete the task without needing help from staff.</p>
                        </div>

                        {/* 3. Web Admin Portal Flows */}
                        <div className="bb-dp-block">
                            <div className="bb-dp-subhead"><span className="bb-dp-subhead-dot" /><span className="bb-dp-subhead-text">Web Admin Portal Flows</span></div>
                            <p className="bb-sec-body" style={{ marginTop: 0, marginBottom: 22 }}>Admin flows focus on helping barangay officials and staff keep the resident app updated. Each action starts from the admin portal and ends with content or request status becoming visible to residents.</p>
                            {ADMIN_FLOWS.map(f => (
                                <div className="bb-flowcard" key={f.title}>
                                    <div className="bb-flowcard-title">{f.title}</div>
                                    <div className="bb-flowrow">
                                        {f.steps.map((s, i, arr) => (
                                            <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                <div className="bb-flowstep">{s}</div>
                                                {i < arr.length - 1 && <span className="bb-flowarrow">→</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <p className="bb-flow-note">The admin portal is structured to reduce repeated manual work. Officials and staff can publish, update, and manage the information residents need without switching between scattered tools or communication channels.</p>
                        </div>

                        {/* 4. IA — Resident App */}
                        <div className="bb-dp-block">
                            <div className="bb-dp-subhead"><span className="bb-dp-subhead-dot" /><span className="bb-dp-subhead-text">Information Architecture — Resident App</span></div>
                            <p className="bb-sec-body" style={{ marginTop: 0, marginBottom: 20 }}>The resident app is organized around common barangay needs: updates, services, contacts, participation, and public information. Each module supports a clear purpose and connects back to the product&rsquo;s main goal of making barangay services easier to access.</p>
                            <div className="bb-iamodgrid">
                                {IA_RESIDENT_MODULES.map(m => (
                                    <div className="bb-iamod" key={m.num}>
                                        <div className="bb-iamod-num">{m.num}</div>
                                        <div className="bb-iamod-title">{m.title}</div>
                                        <div className="bb-iamod-desc">{m.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 5. IA — Web Admin Portal */}
                        <div className="bb-dp-block">
                            <div className="bb-dp-subhead"><span className="bb-dp-subhead-dot" /><span className="bb-dp-subhead-text">Information Architecture — Web Admin Portal</span></div>
                            <p className="bb-sec-body" style={{ marginTop: 0, marginBottom: 20 }}>The admin portal is structured as a management workspace. Its purpose is to keep resident-facing information accurate, updated, and organized from one place.</p>
                            <div className="bb-iamodgrid">
                                {IA_ADMIN_MODULES.map(m => (
                                    <div className="bb-iamod" key={m.num}>
                                        <div className="bb-iamod-num">{m.num}</div>
                                        <div className="bb-iamod-title">{m.title}</div>
                                        <div className="bb-iamod-desc">{m.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 6. Connected System Flow */}
                        <div className="bb-dp-block">
                            <div className="bb-dp-subhead"><span className="bb-dp-subhead-dot" /><span className="bb-dp-subhead-text">How the App and Admin Portal Connect</span></div>
                            <p className="bb-sec-body" style={{ marginTop: 0, marginBottom: 22 }}>Barangay Buddy works as a connected product. The admin portal controls the content and service updates, while the resident app makes that information accessible to the community.</p>
                            <div className="bb-sysflow">
                                {CONNECTED_STEPS.map((s, i, arr) => (
                                    <Fragment key={s.num}>
                                        <div className="bb-sysstep">
                                            <div className="bb-sysstep-num">{s.num}</div>
                                            <div className="bb-sysstep-title">{s.title}</div>
                                            <div className="bb-sysstep-desc">{s.desc}</div>
                                        </div>
                                        {i < arr.length - 1 && <div className="bb-sysarrow">→</div>}
                                    </Fragment>
                                ))}
                            </div>
                            <p className="bb-flow-note">The information architecture keeps the resident side simple while giving barangay officials and staff enough structure to manage content behind the scenes. This supports the core product goal: clearer communication, easier service access, and less manual follow-up.</p>
                        </div>
                    </div>

                    {/* DESIGN PHASE — TYPOGRAPHY + COLOR */}
                    <div className="bb-rv" style={{ marginBottom: 84 }}>
                        <div className="bb-sec-label">Design Phase</div>
                        <h2 className="bb-sec-title">Typography &amp; Colors</h2>
                        <p className="bb-sec-body">Show how the type and color choices helped shape a GovTech experience that feels clear, readable, trustworthy, and approachable for both residents and barangay staff.</p>

                        {/* Font Used */}
                        <div className="bb-dp-block">
                            <div className="bb-dp-subhead"><span className="bb-dp-subhead-dot" /><span className="bb-dp-subhead-text">Font Used</span></div>
                            <div className="bb-typo-grid">
                                <div className="bb-typo-showcase">
                                    <div className="bb-typo-name">Geist Sans</div>
                                    <div className="bb-typo-line">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
                                    <div className="bb-typo-line">abcdefghijklmnopqrstuvwxyz</div>
                                    <div className="bb-typo-line">1234567890</div>
                                </div>
                                <div className="bb-typo-side">
                                    <p className="bb-typo-explain">Geist Sans was chosen because it has a clean, modern, and highly readable look that works well for a digital public-service product. Since Barangay Buddy is used for announcements, request tracking, contacts, and admin management, the font helps keep information clear and easy to scan across both mobile and web.</p>
                                    <p className="bb-typo-note">Its simple letterforms and balanced spacing make the interface feel trustworthy for barangay officials and staff, while still staying approachable for residents.</p>
                                    <div className="bb-typo-weights">
                                        {FONT_WEIGHTS.map(f => (
                                            <div className="bb-typo-weight-row" key={f.name} style={{ fontWeight: f.weight }}>{f.name}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Color Used */}
                        <div className="bb-dp-block">
                            <div className="bb-dp-subhead"><span className="bb-dp-subhead-dot" /><span className="bb-dp-subhead-text">Color Used</span></div>
                            <p className="bb-dp-intro">The palette was selected to balance trust, clarity, and warmth. Navy supports a reliable public-service identity, blue helps guide digital interaction, yellow adds friendliness, and the light background helps keep the experience clean and approachable.</p>
                            <div className="bb-colorgrid">
                                {SWATCHES.map(s => (
                                    <div className="bb-colorcard" key={s.hex}>
                                        <div className="bb-colordot" style={{ background: s.hex }} />
                                        <div className="bb-colorname">{s.name}</div>
                                        <div className="bb-colorhex">{s.hex}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* VISUAL DESIGN */}
                    <div className="bb-rv" style={{ marginBottom: 84 }}>
                        <div className="bb-sec-label">Visual Design</div>
                        <h2 className="bb-sec-title">Simple navigation, clear hierarchy, and practical service access.</h2>
                        <p className="bb-sec-body">The visual design focuses on simple navigation, clear hierarchy, accessible labels, and friendly cards that help users understand each feature quickly.</p>

                        <div className="bb-featgrid">
                            {FEATURE_CARDS.map(f => (
                                <div className="bb-feat" key={f.title}>
                                    <div className="bb-feat-ic">{f.ic}</div>
                                    <h3>{f.title}</h3>
                                    <p>{f.d}</p>
                                </div>
                            ))}
                        </div>

                        <p className="bb-showcase-intro">Barangay Buddy brings together the resident-facing mobile experience and the barangay admin portal into one connected service system. The screens below showcase how residents can access updates, requests, contacts, and community information, while barangay officials and staff manage content and services through the web admin interface.</p>

                        <div className="bb-showcase-list">
                            {SHOWCASE_IMAGES.map(img => (
                                <div className="bb-showcase-item" key={img.src}>
                                    <img src={img.src} alt={img.alt} loading="lazy" />
                                    <div className="bb-showcase-cap">{img.cap}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* TEST PHASE */}
                    <div className="bb-rv">
                        <div className="bb-sec-label">Test Phase</div>
                        <h2 className="bb-sec-title">Checking if the experience is clear without extra explanation.</h2>
                        <p className="bb-sec-body">The usability review focused on whether users could understand the app&rsquo;s purpose, identify key actions, and complete common tasks such as checking announcements, finding contacts, and submitting a request.</p>

                        <div className="bb-usab">
                            <div className="bb-card">
                                <div className="bb-card-num">Review — 01</div>
                                <h3>Clarity Check</h3>
                                <p>Reviewed whether labels, section names, and feature cards were easy to understand.</p>
                            </div>
                            <div className="bb-card">
                                <div className="bb-card-num">Review — 02</div>
                                <h3>Navigation Check</h3>
                                <p>Checked if users could find the most important actions with minimal steps.</p>
                            </div>
                            <div className="bb-card">
                                <div className="bb-card-num">Review — 03</div>
                                <h3>Improvements</h3>
                                <p>Refined wording, grouped related features, and improved hierarchy for easier scanning.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* OUTCOME */}
            <div className="bb-outcome-band">
                <div className="bb-outcome-inner bb-rv">
                    <div className="bb-sec-label">Outcome</div>
                    <h2 className="bb-sec-title">A more organized and accessible barangay service experience.</h2>
                    <p className="bb-sec-body">The final experience connects the resident-facing Android app with the staff-facing admin portal, creating one flow for publishing updates, managing requests, and making public information easier to access. With the resident app available on Google Play, Barangay Buddy can be discovered and installed by Android users more easily.</p>

                    <div className="bb-outcards">
                        <div className="bb-outcard">
                            <h3>For Residents</h3>
                            <p>Updates, requests, contacts, events, polls, and resources become easier to access from one Android app available on Google Play.</p>
                        </div>
                        <div className="bb-outcard">
                            <h3>For Barangay Officials &amp; Staff</h3>
                            <p>Announcements, requests, schedules, contacts, and resources become easier to manage from one portal.</p>
                        </div>
                        <div className="bb-outcard">
                            <h3>For Barangays</h3>
                            <p>Communication becomes more organized, public service feels more modern, and residents stay connected.</p>
                        </div>
                    </div>

                    <div className="bb-takeaway">
                        <p>Barangay Buddy is more than a digital notice board. It is a practical service platform designed to reduce scattered communication, support faster updates, organize service requests, and create a friendlier experience for residents and barangay teams.</p>
                        <div className="bb-finaltag">Barangay Buddy — <span>your barangay, just a tap away.</span></div>
                    </div>
                </div>
            </div>

            {/* NEXT PROJECT */}
            <div className="bb-next">
                <div className="bb-next-inner bb-rv">
                    <a className="bb-next-preview" href="/all-work/advante" aria-label="View Advante project">
                        <img
                            src="/Advante%20Landing%20Page%20Banner%20Showcase%20-%20Main.png"
                            alt="Advante"
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.05)" }}
                        />
                        <div className="bb-next-preview-overlay">
                            <div className="bb-next-preview-cat">UI/UX Design</div>
                            <div className="bb-next-preview-name">Advante</div>
                        </div>
                    </a>
                    <div>
                        <div className="bb-next-tag">Next Project</div>
                        <div className="bb-next-title">Advante</div>
                        <p className="bb-next-desc">Executive coaching platform — orbital hero, trust-building layout, and seamless trial conversion.</p>
                        <div className="bb-next-actions">
                            <a className="bb-btn" href="/all-work/advante">View Project →</a>
                            <a className="bb-ghost-btn" href="/all-work">All Work</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="bb-foot">
                <div className="bb-foot-inner">
                    <a className="bb-flogo" href="/">JADEY<span>.</span></a>
                    <div className="bb-fcopy">© 2025 Jane Dhell Cagas. All rights reserved.</div>
                    <div className="bb-flinks">
                        <a href="/#about">About Me</a>
                        <a href="/#work">Work Highlights</a>
                        <a href="/#testimonials">Testimonials</a>
                        <a href="/#insights">Blog</a>
                        <a href="/#workshops">Workshops</a>
                        <a href="/#contact">Contact</a>
                        <a className="bb-fall" href="/all-work">All Projects →</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
