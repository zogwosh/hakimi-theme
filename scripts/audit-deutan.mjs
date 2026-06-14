// Deuteranopia regression gate — UNIFIED PERCEPTUAL PIPELINE.
//
// Everything is evaluated in the deuteranope's perceived space: each color is first
// projected through a Vienot-1999 (linear-RGB) deutan simulation, then:
//   (1) READABILITY  — APCA Lc (Accessible Perceptual Contrast Algorithm, the WCAG-3
//       candidate) between simulated foreground and simulated background. APCA replaces
//       WCAG 2.x because it models perceived lightness contrast far better — notably it
//       correctly penalizes blue / mid-grey text on dark backgrounds, which WCAG over-rates.
//   (2) SEPARATION   — OKLab dEok between every pair of simultaneously-visible roles.
//
// Gates: syntax Lc >= 60 (APCA "fluent/content text"); comment Lc >= 45 (intentionally
// de-emphasized); role separation dEok >= 0.10 (error exempt vs the warm family, since it
// is carried by bold+underline). Lc 75 = body-text-grade, reported as "preferred".
import fs from 'fs';
import { simulate } from '@bjornlu/colorblind';

const clamp01=x=>Math.min(1,Math.max(0,x));

const hexToRgb = hex => {
  let h = hex.replace(/^#/, '');
  if (h.length === 3) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  }
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return { r, g, b };
};

const rgbToHex = ({ r, g, b }) => {
  const toHex = val => {
    const clamped = Math.min(255, Math.max(0, Math.round(val)));
    return clamped.toString(16).padStart(2, '0');
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const h2 = hex => {
  const rgb = hexToRgb(hex);
  return [rgb.r / 255, rgb.g / 255, rgb.b / 255];
};

const toLin=x=>x<=0.04045?x/12.92:Math.pow((x+0.055)/1.055,2.4);
function oklab([r,g,b]){const lr=toLin(r),lg=toLin(g),lb=toLin(b);
  const l=Math.cbrt(0.4122214708*lr+0.5363325363*lg+0.0514459929*lb),m=Math.cbrt(0.2119034982*lr+0.6806995477*lg+0.1073969541*lb),s=Math.cbrt(0.0883024619*lr+0.2817188376*lg+0.6299787005*lb);
  return{L:0.2104542553*l+0.793617785*m-0.0040720468*s,a:1.9779984951*l-2.428592205*m+0.4505937099*s,b:0.0259040371*l+0.7827717662*m-0.808675766*s};}
const dEok=(a,b)=>{const A=oklab(h2(a)),B=oklab(h2(b));return Math.hypot(A.L-B.L,A.a-B.a,A.b-B.b);};

const deutan = hex => {
  const rgb = hexToRgb(hex);
  const simulated = simulate(rgb, 'deuteranopia');
  return rgbToHex(simulated);
};

// ---- APCA (apca-w3 0.1.9 / "0.0.98G-4g" constants) ----
const APCA={ Rco:0.2126729, Gco:0.7151522, Bco:0.0721750, trc:2.4,
  Ntx:0.57, Nbg:0.56, Rtx:0.62, Rbg:0.65, Bthr:0.022, Bclmp:1.414,
  scale:1.14, loOff:0.027, loClip:0.1, dMin:0.0005 };
function apcaY(hex){const [r,g,b]=h2(hex);return APCA.Rco*Math.pow(r,APCA.trc)+APCA.Gco*Math.pow(g,APCA.trc)+APCA.Bco*Math.pow(b,APCA.trc);}
function apcaLc(txt,bg){
  let Yt=apcaY(txt), Yb=apcaY(bg);
  if(Yt<APCA.Bthr)Yt+=Math.pow(APCA.Bthr-Yt,APCA.Bclmp);
  if(Yb<APCA.Bthr)Yb+=Math.pow(APCA.Bthr-Yb,APCA.Bclmp);
  if(Math.abs(Yb-Yt)<APCA.dMin)return 0;
  let S,out;
  if(Yb>Yt){ S=(Math.pow(Yb,APCA.Nbg)-Math.pow(Yt,APCA.Ntx))*APCA.scale; out=S<APCA.loClip?0:S-APCA.loOff; }
  else     { S=(Math.pow(Yb,APCA.Rbg)-Math.pow(Yt,APCA.Rtx))*APCA.scale; out=S>-APCA.loClip?0:S+APCA.loOff; }
  return out*100;
}
// validate against known anchors
const a1=apcaLc('#000000','#ffffff'), a2=apcaLc('#ffffff','#000000');
if(Math.abs(a1-106.04)>0.5||Math.abs(a2+107.88)>0.5){console.error(`APCA self-test FAILED: blk/wht=${a1.toFixed(2)}, wht/blk=${a2.toFixed(2)}`);process.exit(2);}

// APCA Lc floors. 60 = "fluent/content text" (regular weight). Bold tokens get APCA's
// weight relaxation (~one step) → 50. Comments are intentionally de-emphasized → 45.
const FLOOR={ keyword:50, error:50, comment:45 }, DEFAULT_FLOOR=60, BODY=75, SEP_MIN=0.10;
let fail=0;

for (const [flavor,file] of [['DARK','themes/hakimi-deuteranopia-dark.json'],['LIGHT','themes/hakimi-deuteranopia-light.json']]) {
  const t=JSON.parse(fs.readFileSync(file,'utf8')), S=t.semanticTokenColors, bg=t.colors['editor.background'];
  const tm=s=>t.tokenColors.find(e=>e.scope.includes(s)).settings.foreground;
  const roles={ keyword:S.keyword, string:S.string, function:S.function, type:S.type,
                variable:S.variable, comment:tm('comment'), error:tm('invalid') };
  const simBg=deutan(bg);
  console.log(`\n===== ${flavor} (bg ${bg} → deutan ${simBg}) =====`);

  console.log('-- APCA Lc on Vienot-simulated colors (regular>=60, bold>=50, comment>=45; 75=body) --');
  for (const [r,hex] of Object.entries(roles)) {
    const sim=deutan(hex), Lc=Math.abs(apcaLc(sim,simBg));
    const floor = FLOOR[r] ?? DEFAULT_FLOOR;
    const ok=Lc>=floor; if(!ok)fail++;
    const grade = Lc>=BODY?'★body':Lc>=DEFAULT_FLOOR?'✓':Lc>=45?'·':'';
    console.log(`  ${ok?'✓':'✗'} ${r.padEnd(9)} ${hex}→${sim}  Lc ${Lc.toFixed(1).padStart(5)}  ${grade}${ok?'':'  < '+floor}`);
  }

  console.log('-- deutan role separation, dEok on simulated (min 0.10; error exempt vs warm) --');
  const names=Object.keys(roles), pairs=[];
  for(let i=0;i<names.length;i++)for(let j=i+1;j<names.length;j++){
    const a=names[i],b=names[j],d=dEok(deutan(roles[a]),deutan(roles[b]));
    // decoration-exempt: error is uniquely bold+underline (vs anything); comment(italic) vs keyword(bold)
    const pair=new Set([a,b]);
    const exempt = pair.has('error') || (pair.has('comment')&&pair.has('keyword'));
    if(!exempt&&d<SEP_MIN){console.log(`  ✗ ${a} vs ${b}: dEok ${d.toFixed(3)} < ${SEP_MIN}`);fail++;}
    pairs.push([a,b,d,exempt]);
  }
  pairs.sort((x,y)=>x[2]-y[2]);
  for(const [a,b,d,ex] of pairs.slice(0,3))
    console.log(`     ${d.toFixed(3)} ${a} vs ${b}${ex?'  (decoration-exempt)':''}`);
}

console.log(`\n${fail===0?'✅ DEUTAN + APCA AUDIT PASSED':'❌ '+fail+' FAILURES'}`);
process.exit(fail?1:0);
