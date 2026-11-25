(function(){
const CH="abcdefghijklmnopqrstuvwxyz#%&*@!?/";
function scramble(el,to,dur){dur=dur||650;const from=el.textContent;const len=Math.max(from.length,to.length);const t0=performance.now();cancelAnimationFrame(el._r);
  (function f(now){const p=Math.min(1,(now-t0)/dur);let s="";for(let i=0;i<len;i++){const lock=i/len<p*1.15-.15;s+=lock?(to[i]||""):(to[i]===" "?" ":CH[(Math.random()*CH.length)|0]);}
  el.textContent=s;if(p<1)el._r=requestAnimationFrame(f);else el.textContent=to;})(t0);}
window.scramble=scramble;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
// hero
const nameTxt=document.getElementById('nameTxt');
if(nameTxt){
  const name=document.getElementById('name');
  name.addEventListener('mouseenter',()=>scramble(nameTxt,"sherif",500));
  name.addEventListener('mouseleave',()=>scramble(nameTxt,"eidge",500));
  name.addEventListener('click',()=>scramble(nameTxt,nameTxt.textContent==="eidge"?"sherif":"eidge",500));
  const roles=["Brand builder","Part-time fish","The intern","Art director","Bad joker","Netflix addict"];
  let ri=0;const role=document.getElementById('role');
  const nextRole=()=>{ri=(ri+1)%roles.length;scramble(role,roles[ri],700);};
  const staged=!!document.getElementById('hxBg');
  let timer=reduce||staged?null:setInterval(nextRole,2400);
  if(!staged)document.getElementById('some').addEventListener('mouseenter',()=>{clearInterval(timer);nextRole();if(!reduce)timer=setInterval(nextRole,2400);});
  document.querySelectorAll('.h-svc li').forEach(li=>{const t=li.textContent;li.addEventListener('mouseenter',()=>scramble(li,t,450));});
  const edge=document.getElementById('edge');
  // dodge game: every time the cursor reaches "Edge" it runs to the other side
  const ew=document.getElementById('edgeWord');let moving=false;
  let rt;
  const goBack=()=>{if(!edge.classList.contains('on'))return;if(moving){clearTimeout(rt);rt=setTimeout(goBack,950);return;}
    clearTimeout(rt);moving=true;ew.textContent='← Edge';edge.classList.remove('on');setTimeout(()=>{moving=false;ew.textContent='Edge →';},900);};
  const dodge=()=>{if(moving)return;if(edge.classList.contains('on')){goBack();return;}
    moving=true;edge.classList.add('on');setTimeout(()=>{moving=false;},900);clearTimeout(rt);rt=setTimeout(goBack,5000);};
  addEventListener('scroll',()=>{if(edge.classList.contains('on'))goBack();},{passive:true});
  ew.addEventListener('mouseenter',dodge);
  ew.addEventListener('click',dodge);
  const hero=document.querySelector('.hero'),me=document.getElementById('me'),meImg=me&&me.querySelector('img');let wig=false;
  const facts=["Hi, I'm eidge 👋","Yes — I designed my own name.","Bold by default.","Branding, type, editorial… why choose?","Push it. Then push it to the edge.","Ask me about kerning. Actually, don't.","Okay, okay — the work is right below ↓"];
  let fi=0;const bubble=document.getElementById('bubble');
  window.__eidgeFacts={facts,bubble,next:()=>facts[fi++%facts.length]};
}

// hover scramble on titles
document.querySelectorAll('[data-hover-scramble]').forEach(el=>{const t=el.textContent;el.closest('a').addEventListener('mouseenter',()=>scramble(el,t,420));});

// reveal + scramble headings when they enter the view
const targets=document.querySelectorAll('.card,.pg,.sm,.canvas .tile,.ed-t,.cv-grid>div,.p-hero,.vid,.marks li');
targets.forEach(el=>el.classList.add('rv'));

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{rootMargin:'0px 0px -8% 0px'});
targets.forEach(el=>io.observe(el));document.documentElement.classList.add('rvon');
// safety net: reveal anything in or above view even if the observer never reports (embedded previews, hidden tabs)
const revealCheck=()=>{const lim=innerHeight*1.05;targets.forEach(el=>{if(!el.classList.contains('in')&&el.getBoundingClientRect().top<lim){el.classList.add('in');io.unobserve(el);}});};
let rq=false;addEventListener('scroll',()=>{if(!rq){rq=true;requestAnimationFrame(()=>{rq=false;revealCheck();});}},{passive:true});
addEventListener('resize',revealCheck);addEventListener('load',revealCheck);setTimeout(revealCheck,600);setTimeout(()=>targets.forEach(el=>el.classList.add('in')),4000);
const hs=document.querySelectorAll('[data-scramble]');
const io2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!reduce){const el=e.target;scramble(el,el.dataset.t||(el.dataset.t=el.textContent),900);io2.unobserve(el);}}),{threshold:.4});
hs.forEach(h=>{h.dataset.t=h.textContent;io2.observe(h);});

// videos play only when visible
const vio=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){v.preload='auto';const p=v.play();if(p)p.catch(()=>{});}else v.pause();}),{threshold:.25});
document.querySelectorAll('video').forEach(v=>vio.observe(v));

// nav: mobile menu + active section
const navEl=document.querySelector('.nav'),mb=document.getElementById('menuBtn');document.body.style.overflowX='hidden';
if(mb){mb.addEventListener('click',()=>{const o=navEl.classList.toggle('open');mb.setAttribute('aria-expanded',o);});
  document.querySelectorAll('#mainNav a').forEach(a=>a.addEventListener('click',()=>{navEl.classList.remove('open');mb.setAttribute('aria-expanded','false');}));}
const links=[...document.querySelectorAll('#mainNav a')];
const secs=links.map(a=>document.getElementById(a.hash.slice(1))).filter(Boolean);
if(secs.length){const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle('on',a.hash==='#'+e.target.id));}}),{rootMargin:'-45% 0px -50% 0px'});secs.forEach(s=>so.observe(s));}

// lightbox
const lb=document.getElementById('lightbox'),lbi=lb.querySelector('img');
document.addEventListener('click',e=>{const z=e.target.closest('.zoomable,.tile');if(!z)return;const im=z.querySelector('img');if(!im)return;lbi.src=im.currentSrc||im.src;lb.classList.add('show');});
lb.addEventListener('click',()=>lb.classList.remove('show'));
document.addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('show');});

// nav: solid + hide on scroll down, show on scroll up
(function(){const n=document.querySelector('.nav');if(!n)return;let ly=scrollY,tick=false;
  const upd=()=>{const y=scrollY;n.classList.toggle('solid',y>40);
    if(!n.classList.contains('open')){if(y>ly+4&&y>120)n.classList.add('hide');else if(y<ly-4||y<=120)n.classList.remove('hide');}
    ly=y;tick=false;};
  addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(upd);}},{passive:true});upd();})();

// random stuff window: open from any [data-rs], drag by title bar, close with × / Esc
(function(){const w=document.getElementById('rsWin');if(!w)return;const bar=document.getElementById('rsBar'),x=document.getElementById('rsClose');
  const open=()=>{const nv=document.querySelector('.nav');if(nv&&nv.classList.contains('open')){nv.classList.remove('open');const mb=document.getElementById('menuBtn');if(mb)mb.setAttribute('aria-expanded','false');}
    if(!w.hidden){w.classList.remove('pop');void w.offsetWidth;w.classList.add('pop');return;}
    w.hidden=false;w.style.left='';w.style.top='';w.style.transform='';w.classList.remove('pop');void w.offsetWidth;w.classList.add('pop');x.focus({preventScroll:true});};
  const close=()=>{w.hidden=true;};
  document.querySelectorAll('[data-rs]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();open();}));
  x.addEventListener('click',close);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!w.hidden)close();});
  let sx=0,sy=0,ox=0,oy=0,dragging=false;
  bar.addEventListener('pointerdown',e=>{if(e.target===x)return;const r=w.getBoundingClientRect();w.style.transform='none';w.style.left=r.left+'px';w.style.top=r.top+'px';
    sx=e.clientX;sy=e.clientY;ox=r.left;oy=r.top;dragging=true;w.classList.add('drag');bar.setPointerCapture(e.pointerId);});
  bar.addEventListener('pointermove',e=>{if(!dragging)return;const r=w.getBoundingClientRect();
    const nx=Math.min(Math.max(ox+e.clientX-sx,-r.width+80),innerWidth-80),ny=Math.min(Math.max(oy+e.clientY-sy,0),innerHeight-40);
    w.style.left=nx+'px';w.style.top=ny+'px';});
  const end=()=>{dragging=false;w.classList.remove('drag');};bar.addEventListener('pointerup',end);bar.addEventListener('pointercancel',end);})();

// copy email
document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(b.dataset.copy);}catch(e){const t=document.createElement('textarea');t.value=b.dataset.copy;document.body.appendChild(t);t.select();try{document.execCommand('copy')}catch(_){}t.remove();}
  b.textContent='Copied';b.classList.add('done');setTimeout(()=>{b.textContent='Copy';b.classList.remove('done');},1600);}));



// portrait: WebGL paper — bends with the cursor's drag, bulges under it, curls over on click, unfolds on load
(function(){const me=document.getElementById('me');if(!me)return;const img=me.querySelector('img');const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const F=window.__eidgeFacts;
  me.addEventListener('click',()=>{F.bubble.textContent=F.next();F.bubble.classList.add('show');clearTimeout(F.bubble._t);F.bubble._t=setTimeout(()=>F.bubble.classList.remove('show'),2600);});
  // type grid: right column top aligns with "Sometimes"
  const hr=document.querySelector('.h-right'),some=document.getElementById('some'),hin=document.querySelector('.hero-in');
  const align=()=>{if(!hr||!some||getComputedStyle(hr).position!=='absolute')return;const h=hin.getBoundingClientRect(),s=some.getBoundingClientRect();
    const fs=parseFloat(getComputedStyle(some).fontSize),svc=hr.querySelector('.h-svc');const fv=svc?parseFloat(getComputedStyle(svc).fontSize):16;
    hr.style.top=(s.top-h.top+fs*.11-fv*.17)+'px';
    // bottom: "Here's my random stuff" sits on the same baseline as "I push every idea to the"
    const pre=document.querySelector('.h-edge .pre'),lk=hr.querySelector('.rs-link');if(!pre||!lk)return;
    const base=el=>{const cs=getComputedStyle(el),f=parseFloat(cs.fontSize),lh=parseFloat(cs.lineHeight)||f*1.2,r=el.getBoundingClientRect();return r.bottom-(lh-f)/2-f*.23;};
    hr.style.bottom='auto';const cur=hr.getBoundingClientRect().bottom;hr.style.bottom='';
    const delta=base(pre)-base(lk);const hb=parseFloat(getComputedStyle(hr).bottom)||0;hr.style.bottom=(hb-delta)+'px';};
  align();addEventListener('resize',align);addEventListener('load',align);setTimeout(align,300);
  if(reduce)return;
  const cv=document.createElement('canvas');cv.className='me-gl';const gl=cv.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:true,depth:true});if(!gl)return;
  const VS=`attribute vec2 aUv;uniform vec2 uSize;uniform vec2 uMouse;uniform vec2 uVel;uniform float uHover,uRot,uBend,uTime,uIdle,uScale;uniform vec2 uOff;
    varying vec2 vUv;varying float vShade;
    void main(){vUv=aUv;vec3 p=vec3(aUv-.5,0.);
      float sh=sin(3.14159*aUv.x)*sin(3.14159*aUv.y);
      p.xy+=uVel*sh;p.z+=length(uVel)*sh*.25;
      vec2 d=p.xy-uMouse;float g=exp(-dot(d,d)/.05);
      
      p.z+=uBend*(p.y*p.y-.25)*1.3;
      float pre=p.z;float c=cos(uRot),s=sin(uRot);p=vec3(p.x,p.y*c-p.z*s,p.y*s+p.z*c);
      vShade=1.+pre*.7-.18*abs(s);
      p*=uScale;p.xy+=uOff;float w=1.-p.z*.5;gl_Position=vec4(p.x*uSize.x*2./w,p.y*uSize.y*2./w,-p.z*.4,1.);}`;
  const FS=`precision mediump float;uniform sampler2D uTex;uniform float uZoom,uGlitch,uGT;varying vec2 vUv;varying float vShade;
    float h(float n){return fract(sin(n)*43758.5453);}
    float h2(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
    void main(){vec2 zu=(vUv-vec2(.5,.62))/uZoom+vec2(.5,.62);vec4 c;
      float g=uGlitch,tk=floor(uGT*18.);
      float band=floor(zu.y*(14.+h(tk)*30.));float r=h(band*7.13+tk*1.71);
      float sh=step(.62,r)*(r-.62)*.55*g*(h(band+tk)>.5?1.:-1.);
      vec2 u=zu+vec2(sh,0.);float sp=.016*g*(.4+h(tk*3.1));
      if(gl_FrontFacing){c=vec4(texture2D(uTex,u+vec2(sp,0.)).r,texture2D(uTex,u).g,texture2D(uTex,u-vec2(sp,0.)).b,1.);}
      else{c=texture2D(uTex,vec2(1.-u.x,u.y));c.rgb=mix(c.rgb*.5,vec3(.2,.07,.09),.35);}
      c.rgb+=(h2(zu*vec2(310.,190.)+tk)-.5)*.16*g;
      c.rgb*=1.-.12*g*step(.5,fract(zu.y*160.));
      float blk=step(.965,h(floor(zu.y*20.)*3.7+tk*5.3))*step(.35,g);c.rgb=mix(c.rgb,c.rgb.bgr*1.15,blk);
      c.rgb*=vShade;gl_FragColor=vec4(c.rgb,1.);}`;
  const sh=(t,src)=>{const o=gl.createShader(t);gl.shaderSource(o,src);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw gl.getShaderInfoLog(o);return o;};
  let pg;try{pg=gl.createProgram();gl.attachShader(pg,sh(gl.VERTEX_SHADER,VS));gl.attachShader(pg,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pg);if(!gl.getProgramParameter(pg,gl.LINK_STATUS))throw 0;}catch(e){return;}
  gl.useProgram(pg);
  const NX=40,NY=48,uv=[],idx=[];for(let j=0;j<=NY;j++)for(let i=0;i<=NX;i++)uv.push(i/NX,j/NY);
  for(let j=0;j<NY;j++)for(let i=0;i<NX;i++){const a=j*(NX+1)+i,b=a+1,c=a+NX+1,d=c+1;idx.push(a,b,c,b,d,c);}
  const vb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(uv),gl.STATIC_DRAW);
  const ib=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(idx),gl.STATIC_DRAW);
  const aUv=gl.getAttribLocation(pg,'aUv');gl.enableVertexAttribArray(aUv);gl.vertexAttribPointer(aUv,2,gl.FLOAT,false,0,0);
  const U={};['uSize','uMouse','uVel','uHover','uRot','uBend','uTime','uIdle','uTex','uScale','uZoom','uOff','uGlitch','uGT'].forEach(n=>U[n]=gl.getUniformLocation(pg,n));
  gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);
  const tex=gl.createTexture();
  const upload=()=>{gl.bindTexture(gl.TEXTURE_2D,tex);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    me.appendChild(cv);me.classList.add('gl');size();start();};
  const M=.8;gl.uniform2f(U.uSize,1/(1+2*M),1/(1+2*M));
  const size=()=>{const r=me.getBoundingClientRect();const dpr=Math.min(1.5,devicePixelRatio||1);cv.width=Math.round(r.width*(1+2*M)*dpr);cv.height=Math.round(r.height*(1+2*M)*dpr);gl.viewport(0,0,cv.width,cv.height);};
  addEventListener('resize',size);
  // state
  let mx=0,my=0,tmx=0,tmy=0,hov=0,thov=0,vx=0,vy=0,vvx=0,vvy=0,tvx=0,tvy=0,lx=null,ly=null,rot=-1.45,bend=1,glv=0,nextG=0,scl=1,zoom=1,big=false,ox=0,oy=0,t0=performance.now(),anim=null,visible=true;
  const hero=document.querySelector('.hero');
  hero.addEventListener('mousemove',e=>{const r=me.getBoundingClientRect();const nx=(e.clientX-r.left)/r.width-.5,ny=.5-(e.clientY-r.top)/r.height;
    tmx=Math.max(-.7,Math.min(.7,nx));tmy=Math.max(-.7,Math.min(.7,ny));
    const was=thov;thov=(Math.abs(nx)<.5&&Math.abs(ny)<.5)?1:0;if(thov&&!was){glv=Math.max(glv,.85);nextG=performance.now()+700+Math.random()*900;}
    if(lx!==null){tvx+=(e.clientX-lx)/r.width*1.6;tvy-=(e.clientY-ly)/r.height*1.6;}lx=e.clientX;ly=e.clientY;});
  hero.addEventListener('mouseleave',()=>{thov=0;lx=ly=null;});
  const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,out=t=>1-Math.pow(1-t,4);
  const play=(dur,fn,done)=>{const st=performance.now();anim={st,dur,fn,done};};
  const toggle=()=>{if(anim)return;glv=1;const s0=scl,z0=zoom,x0=ox,y0=oy,toBig=!big;big=toBig;
    if(toBig){const r=img.getBoundingClientRect(),h=hero.getBoundingClientRect();
      const top=h.top+76,bot=h.bottom-14,S=Math.min(1.35,(bot-top)/r.height),Y=-(((top+bot)/2)-(r.top+r.height/2))/r.height,X=-((h.left+h.width*.58)-(r.left+r.width/2))/r.width*-1*0;
      play(1150,p=>{const e=ease(p);rot=e*Math.PI*2;bend=Math.sin(p*Math.PI)*.6;},()=>{rot=0;bend=0;
        play(1300,p=>{const e=out(p);scl=s0+(S-s0)*e;zoom=z0+(1.12-z0)*e;oy=y0+(Y-y0)*e;bend=Math.sin(p*Math.PI)*.18;},()=>{scl=S;zoom=1.12;oy=Y;bend=0;});});}
    else{play(1150,p=>{const e=ease(p);rot=e*Math.PI*2;bend=Math.sin(p*Math.PI)*.6;scl=s0+(1-s0)*e;zoom=z0+(1-z0)*e;oy=y0*(1-e);ox=x0*(1-e);},()=>{rot=0;bend=0;scl=1;zoom=1;ox=0;oy=0;});}};
  me.addEventListener('click',toggle);addEventListener('keydown',e=>{if(e.key==='Escape'&&big)toggle();});
  new IntersectionObserver(es=>{visible=es[0].isIntersecting;},{threshold:0}).observe(hero);
  function frame(now){requestAnimationFrame(frame);if(!visible)return;
    if(anim){const a=anim,p=Math.min(1,(now-a.st)/a.dur);a.fn(p);if(p>=1){anim=null;a.done&&a.done();}}
    tvx=Math.max(-.2,Math.min(.2,tvx))*.82;tvy=Math.max(-.2,Math.min(.2,tvy))*.82;
    vvx+=(tvx-vx)*.14;vvy+=(tvy-vy)*.14;vvx*=.8;vvy*=.8;vx+=vvx;vy+=vvy;
    mx+=(tmx-mx)*.12;my+=(tmy-my)*.12;hov+=(thov-hov)*.06;
    gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.uniform2f(U.uMouse,mx,my);gl.uniform2f(U.uVel,0,0);gl.uniform1f(U.uHover,hov);gl.uniform1f(U.uRot,rot);gl.uniform1f(U.uBend,bend);
    if(thov&&now>nextG){glv=Math.max(glv,.35+Math.random()*.45);nextG=now+600+Math.random()*1600;}glv*=.9;if(glv<.01)glv=0;gl.uniform1f(U.uGlitch,glv);gl.uniform1f(U.uGT,(now-t0)/1000);gl.uniform1f(U.uScale,scl);gl.uniform2f(U.uOff,ox,oy);gl.uniform1f(U.uZoom,zoom*(1.+hov*.06));gl.uniform1f(U.uTime,(now-t0)/1000);gl.uniform1f(U.uIdle,1);gl.uniform1i(U.uTex,0);
    gl.drawElements(gl.TRIANGLES,idx.length,gl.UNSIGNED_SHORT,0);}
  const start=()=>{play(1500,p=>{const e=out(p);rot=-1.45*(1-e);bend=1-e;},()=>{rot=0;bend=0;});requestAnimationFrame(frame);};
  if(img.complete&&img.naturalWidth)upload();else img.addEventListener('load',upload,{once:true});
})();

// day / night theme toggle (choice remembered; first visit follows the device setting)
(function(){const b=document.getElementById('themeBtn');if(!b)return;const H=document.documentElement;
  const T=['cream','sage','blue'],N={cream:'Cream',sage:'Sage',blue:'Blue'};
  const cur=()=>{const t=H.getAttribute('data-theme');return T.indexOf(t)<0?'cream':t;};
  const sync=()=>{const n=T[(T.indexOf(cur())+1)%T.length];b.querySelector('.tb-t').textContent=N[n];b.dataset.next=n;b.setAttribute('aria-label','Change colour to '+N[n].toLowerCase());};
  if(T.indexOf(H.getAttribute('data-theme'))<0)H.setAttribute('data-theme','cream');sync();
  const lg=document.querySelector('.nav .logo');if(lg)lg.addEventListener('click',()=>{try{localStorage.setItem('eidge-theme',b.dataset.next);}catch(e){}});
  b.addEventListener('click',()=>{const n=b.dataset.next;H.classList.add('theme-anim');H.setAttribute('data-theme',n);try{localStorage.setItem('eidge-theme',n);}catch(e){}sync();setTimeout(()=>H.classList.remove('theme-anim'),600);});})();
})();
// hero stage: a strip of photos with one-word captions (editorial agency layout), big title along the bottom
(function(){const cv=document.getElementById('hxBg');if(!cv)return;let ctx=cv.getContext('2d');const HT=document.documentElement;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SC=[
    {t:'Brand builder',d:2000,im:['me','b_ai','b_astote','b_gcgc','w:p029_0','w:p018_7'],c:['that’s me','packaging','identity','merch','digital','campaign']},
    {t:'AI buddy',d:2000,im:['v:ai_cloud','ai_claude','ai_squig'],c:[]},
    {t:'Street photographer',im:['p67','p66','p70','p77'],c:[]},
    {t:'History nerd',im:['p32','p24','p08','p15','p17','l03'],c:['old','stone','stories','light','patience','domes']},
    {t:'Collector',im:['p73','l04','p48','l16'],c:[]},
    {t:'Calligrapher',d:2000,im:['l21','l23','l07'],c:[]},
    {t:'Art snob',im:['p88','l18','p40','l22'],c:[]},
    {t:'Part-time fish',im:['dive01','l19','l05'],c:[]}];
  // the user's grid variations: [col, row, size] on 8x3 (desktop) and 4x4 (phone); size 2 = a 2x2 block
  const LD=[
    [[0,0,2],[2,0,1],[3,1,1],[4,1,2],[6,1,1],[7,1,1]],
    [[1,0,1],[0,1,1],[2,1,1],[3,0,2],[5,1,1],[6,1,2]],
    [[0,0,1],[1,0,2],[3,0,1],[4,1,1],[5,2,1],[6,1,2]],
    [[0,0,1],[1,1,1],[2,1,1],[3,0,2],[5,1,2],[7,2,1]],
    [[0,0,1],[1,0,2],[3,0,2],[5,1,1],[6,1,1],[7,2,1]]];
  const LM=[
    [[0,0,2],[2,0,1],[3,1,1],[0,2,1],[1,3,1],[2,2,2]],
    [[1,0,1],[0,1,1],[2,0,2],[0,2,2],[2,2,1],[3,3,1]],
    [[0,0,1],[1,0,2],[3,1,1],[0,2,1],[1,3,1],[2,2,2]]];
  // same grids for scenes with fewer photos: two 2x2 blocks plus small cells, spread across the width
  const LD4=[
    [[0,0,2],[2,1,1],[4,0,2],[7,1,1]],
    [[0,1,1],[1,0,2],[4,1,2],[7,0,1]],
    [[0,0,1],[2,0,2],[4,1,1],[5,1,2]],
    [[0,1,2],[2,0,1],[3,0,2],[6,1,1]]];
  const LD3=[
    [[0,0,2],[3,1,2],[6,0,1]],
    [[1,0,1],[3,0,2],[5,1,2]],
    [[0,1,2],[3,0,2],[6,1,1]]];
  const LM4=[
    [[0,0,2],[2,0,1],[3,1,1],[1,2,2]],
    [[0,0,1],[1,0,2],[0,2,2],[3,2,1]],
    [[2,0,2],[0,0,1],[1,1,1],[0,2,2]]];
  const LM3=[
    [[0,0,2],[3,1,1],[1,2,2]],
    [[2,0,2],[0,1,1],[0,2,2]]];
  const pool=n=>mob?(n<=3?LM3:n===4?LM4:LM):(n<=3?LD3:n===4?LD4:LD);
  const FOCUS={"dive01":[0.45,0.45],"l03":[0.48,0.55],"l04":[0.5,0.5],"l05":[0.45,0.65],"l07":[0.3,0.35],"l14":[0.4,0.45],"l15":[0.5,0.5],"l16":[0.5,0.5],"l19":[0.5,0.55],"l20":[0.5,0.6],"l21":[0.5,0.45],"l22":[0.5,0.5],"l23":[0.3,0.4],"me":[0.5,0.4],"p08":[0.45,0.5],"p15":[0.55,0.5],"p17":[0.4,0.5],"p20":[0.5,0.5],"p24":[0.5,0.36],"p32":[0.5,0.56],"p33":[0.45,0.35],"p36":[0.4,0.55],"p40":[0.3,0.5],"p48":[0.45,0.35],"p51":[0.5,0.3],"p66":[0.4,0.5],"p67":[0.5,0.5],"p68":[0.5,0.55],"p69":[0.5,0.55],"p70":[0.5,0.55],"p71":[0.5,0.5],"p72":[0.5,0.5],"p73":[0.5,0.5],"p77":[0.55,0.55],"p87":[0.4,0.45],"p88":[0.6,0.45],"pool01":[0.5,0.45],"tv01":[0.4,0.6],"tv02":[0.5,0.6],"tv03":[0.45,0.4],"tv04":[0.6,0.45],"w:p004_0":[0.55,0.55],"w:p013_0":[0.45,0.45],"w:p018_7":[0.5,0.4],"w:p029_0":[0.5,0.5],"w:p035_0":[0.5,0.55],"p25":[0.5,0.45],"p49":[0.5,0.45],"p38":[0.5,0.5],"b_ai":[0.5,0.47],"b_astote":[0.4,0.5],"b_gcgc":[0.5,0.48],"p16":[0.5,0.5],"l18":[0.47,0.45]};
  const url=k=>k.startsWith('v:')?'assets/life/'+k.slice(2)+'.mp4':mob?'assets/hm/'+k.replace('w:','w_')+'.webp':k==='me'?'assets/brand/me.webp':k.startsWith('w:')?'assets/img/'+k.slice(2)+'.webp':'assets/life/'+k+'.webp';
  const cache={};const load=k=>k.startsWith('txt:')?Promise.resolve((()=>{const [h,sub,bg]=k.slice(4).split('|');return {txt:true,h,sub,bg};})()):cache[k]||(cache[k]=k.startsWith('v:')?new Promise(r=>{const v=document.createElement('video');v.muted=true;v.loop=true;v.playsInline=true;v.setAttribute('playsinline','');v.preload='auto';v.k=k;v.vid=true;let done=false;const ok=()=>{if(done)return;done=true;v.width=v.videoWidth;v.height=v.videoHeight;v.play().catch(()=>{});r(v);};v.addEventListener('loadeddata',ok);v.onerror=()=>{if(!done){done=true;r(null);}};setTimeout(()=>{if(!done&&v.readyState>=2)ok();},4000);v.style.cssText='position:fixed;left:0;top:0;width:2px;height:2px;opacity:0;pointer-events:none;z-index:-1';document.body.appendChild(v);v.src=url(k);v.load();}):new Promise(r=>{const im=new Image();im.decoding='async';im.k=k;im.onload=()=>{(im.decode?im.decode():Promise.resolve()).catch(()=>{}).then(()=>r(im));};im.onerror=()=>r(null);im.src=url(k);}));
  const loadScene=i=>Promise.all(SC[i].im.map(load));
  const role=document.getElementById('role');
  let W=0,H=0,D=1,mob=false,B={},wins=[],si=-1,tpl=0,visible=true,raf=0,timer=0,logo=null;
  let BG='#ece7d9',INK='#0e0e0e';const PAL={cream:'#ece7d9',sage:'#586d51',blue:'#468bbb'};const pal=()=>{BG=PAL[HT.getAttribute('data-theme')]||PAL.cream;INK='#0e0e0e';};pal();
  new MutationObserver(()=>{pal();force=true;}).observe(HT,{attributes:true,attributeFilter:['data-theme']});
  const mc=document.createElement('canvas').getContext('2d');
  const big=document.querySelector('.hx3 .h-big'),someEl=document.getElementById('some');
  function fitTitle(){if(!big)return;const cs=getComputedStyle(someEl);mc.font=cs.fontWeight+' 100px '+cs.fontFamily;const ls=-.055*100;const wd=x=>mc.measureText(x).width+ls*x.length;
    const avail=big.getBoundingClientRect().width;let fs;
    fs=Math.min(avail*.99/Math.max(wd('Sometimes'),...SC.map(q=>wd(q.t)))*100,innerHeight*(mob?.1:.115));
    someEl.style.fontSize=fs+'px';big.classList.remove('one');}
  function topOf(sel){const e=document.querySelector(sel);if(!e)return -1e9;const b=e.getBoundingClientRect();if(!b.width&&!b.height)return -1e9;return b.bottom;}
  function size(){const r=cv.getBoundingClientRect();D=Math.min((navigator.deviceMemory&&navigator.deviceMemory<=4)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4)?1.5:2,devicePixelRatio||1);W=Math.round(r.width*D);H=Math.round(r.height*D);cv.width=W;cv.height=H;force=true;mob=r.width<761||r.width/r.height<.9;
    fitTitle();const m=(r.width<600?16:24),g=(r.width<600?8:14),cap=0;
    const tt=Math.max(topOf('.hx-intro'),topOf('.hx3 .h-edge .word'))-r.top+Math.max(mob?18:24,parseFloat(someEl.style.fontSize||0)*.16);
    if(big)big.style.setProperty('--bt',tt+'px');
    const top=(big?big.getBoundingClientRect().bottom-r.top:tt)+(mob?18:26);const tb=r.height-m;
    const mt=document.querySelector('.hx-meta'),ml=mt?mt.getBoundingClientRect().left-r.left:m;
    B={x:ml*D,y:top*D,w:(r.width-2*ml)*D,h:Math.max(60,tb-top-cap)*D,g:g*D,cap:cap*D};}
  function card(c,x,y,w,h){const dark=c.bg==='#2a2a2a';ctx.fillStyle=c.bg;ctx.fillRect(x,y,w,h);ctx.fillStyle=dark?INK:BG;ctx.textAlign='left';ctx.textBaseline='top';
    const p=Math.round(Math.min(w,h)*.09),fs=Math.max(12*D,Math.min(w*.13,h*.16));ctx.font='800 '+Math.round(fs)+'px Inter, sans-serif';
    const wrap=(t,f,maxW)=>{const out=[];let line='';for(const wd of t.split(' ')){const tt=line?line+' '+wd:wd;if(ctx.measureText(tt).width>maxW&&line){out.push(line);line=wd;}else line=tt;}if(line)out.push(line);return out;};
    let yy=y+p;for(const l of wrap(c.h,fs,w-2*p)){ctx.fillText(l,x+p,yy);yy+=fs*1.02;}
    const fs2=Math.max(11*D,fs*.42);ctx.font='500 '+Math.round(fs2)+'px Inter, sans-serif';const ls=wrap(c.sub,fs2,w-2*p);let y2=y+h-p-ls.length*fs2*1.25;for(const l of ls){ctx.fillText(l,x+p,y2);y2+=fs2*1.25;}}
  function cover(im,x,y,w,h,z){if(im.txt)return card(im,x,y,w,h);const s=Math.max(w/im.width,h/im.height)*z,iw=im.width*s,ih=im.height*s;const f=FOCUS[im.k]||[.5,.5];const ox=Math.min(0,Math.max(w-iw,w/2-f[0]*iw)),oy=Math.min(0,Math.max(h-ih,h/2-f[1]*ih));ctx.drawImage(im,x+ox,y+oy,iw,ih);}
  function slots(n){const P=pool(n),L=P[tpl%P.length];const C=mob?4:8,R=mob?4:3;
    const rg=B.g;const cw=(B.w-(C-1)*B.g)/C;const rh=Math.min(cw*1.12,(B.h+B.cap-(R-1)*rg)/R);
    const gw=B.w,gh=R*rh+(R-1)*rg;const oy=B.y;
    const order=L.map((q,k)=>k).sort((a,b)=>L[b][2]-L[a][2]||L[a][0]-L[b][0]);
    const out=new Array(L.length);order.forEach((k,rank)=>{const [c,r,z]=L[k];out[rank]=[Math.round(B.x+c*(cw+B.g)),Math.round(oy+r*(rh+rg)),Math.round(z*cw+(z-1)*B.g),Math.round(z*rh+(z-1)*rg)];});
    return out.slice(0,n).filter(Boolean);}
  function makeWin(rc,im,label,t0){const [x,y,w,h]=rc;
    const b=Math.max(Math.round(18*D),Math.round(Math.min(w,h)/6));const cols=Math.ceil(w/b),rows=Math.ceil(h/b);const bl=[];
    for(let j=0;j<rows;j++)for(let i=0;i<cols;i++)bl.push({x:i*b,y:j*b,a:Math.random()*200,o:Math.random()*150,f:Math.random()<.7});
    let bm=null;if(im&&!im.txt&&!im.vid){bm=document.createElement('canvas');bm.width=w;bm.height=h;const c0=ctx;ctx=bm.getContext('2d');cover(im,0,0,w,h,1);ctx=c0;}
    return {x,y,w,h,b,bl,im,bm,label,t0,out:0};}
  function draw(now){ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);
    ctx.font='500 '+Math.round((mob?11:12)*D)+'px Inter, sans-serif';ctx.textAlign='right';ctx.textBaseline='top';
    for(const wv of wins){const e=now-wv.t0;if(e<0)continue;const z=1+Math.min(1,e/6000)*.035;
      ctx.save();ctx.beginPath();let flash=[];
      for(const k of wv.bl){let on,fl=false;
        if(wv.out){const eo=now-wv.out;on=eo<k.o;fl=k.f&&eo>=k.o-60&&eo<k.o;}else{on=e>k.a+60;fl=k.f&&e>k.a&&e<=k.a+60;}
        if(on&&!fl)ctx.rect(wv.x+k.x,wv.y+k.y,Math.min(wv.b,wv.w-k.x),Math.min(wv.b,wv.h-k.y));if(fl)flash.push(k);}
      ctx.clip();if(wv.bm){const zz=mob?1:z,dw=wv.w*zz,dh=wv.h*zz;ctx.drawImage(wv.bm,wv.x-(dw-wv.w)/2,wv.y-(dh-wv.h)/2,dw,dh);}else if(wv.im)cover(wv.im,wv.x,wv.y,wv.w,wv.h,z);ctx.restore();
      ctx.fillStyle=INK;for(const k of flash)ctx.fillRect(wv.x+k.x,wv.y+k.y,Math.min(wv.b,wv.w-k.x),Math.min(wv.b,wv.h-k.y));
      const la=wv.out?Math.max(0,1-(now-wv.out)/250):Math.max(0,Math.min(1,(e-450)/350));
      if(false){ctx.globalAlpha=la;ctx.fillStyle=INK;ctx.fillText(wv.label,wv.x+wv.w,wv.y+wv.h+Math.round(6*D));ctx.globalAlpha=1;}}
    if(logo)logo(now);}
  let force=true;const busy=now=>force||logo||wins.some(w=>!w.out&&w.im&&w.im.vid)||wins.some(w=>w.out?now-w.out<420:now-w.t0<(mob?700:6100));
  function loop(now){if(visible&&busy(now)){draw(now);force=false;}raf=requestAnimationFrame(loop);}
  async function scene(i,instant){clearTimeout(timer);const ims=await loadScene(i);loadScene((i+1)%SC.length);loadScene((i+2)%SC.length);
    const now=performance.now();for(const w of wins)if(!w.out)w.out=now;const old=wins.filter(w=>w.out);
    size();si=i;const n=(mob?LM:LD).length;tpl=i===0?0:(tpl+1)%n;
    const sl=slots(ims.length);const t0=now+(old.length?160:0);
    const nw=sl.map((rc,k)=>makeWin(rc,ims[k],SC[i].c[k],instant?now-5000:t0+k*25));
    wins=old.concat(nw);setTimeout(()=>{wins=wins.filter(w=>!w.out);},420);
    if(role){window.scramble&&!reduce?window.scramble(role,SC[i].t,300):role.textContent=SC[i].t;}
    if(!reduce)timer=setTimeout(()=>scene((si+1)%SC.length),SC[si].d||1000);}
  // intro: the eidge logo, as is, on the black stage
  const logoImg=new Promise(r=>{const im=new Image();im.onload=()=>{(im.decode?im.decode():Promise.resolve()).catch(()=>{}).then(()=>r(im));};im.onerror=()=>r(null);im.src='assets/brand/eidge-lg.png?v=2';});
  function edgeLine(e){if(e>1900){logo=null;return;}const a=Math.min(1,e/350)*(1-Math.max(0,Math.min(1,(e-1600)/300)));
    const cs=getComputedStyle(someEl);const t='I push every idea to the Edge';ctx.font='800 100px '+cs.fontFamily;const wd=ctx.measureText(t).width-.04*100*(t.length-1);
    const fs=Math.round(Math.min(W*.86/wd*100,(mob?17:20)*D));ctx.font='700 '+fs+'px '+cs.fontFamily;ctx.textBaseline='middle';const ls=-.01*fs;
    const tw=ctx.measureText(t).width+ls*(t.length-1);let x=(W-tw)/2;const y=H/2;ctx.globalAlpha=a;ctx.fillStyle=INK;ctx.textAlign='left';
    for(const ch of t){ctx.fillText(ch,x,y);x+=ctx.measureText(ch).width+ls;}ctx.globalAlpha=1;}
  function whiteLogo(im){const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d');g.drawImage(im,0,0);g.globalCompositeOperation='source-in';g.fillStyle=INK;g.fillRect(0,0,c.width,c.height);return c;}
  let lastSz='';addEventListener('resize',()=>{const r=cv.getBoundingClientRect(),k=Math.round(r.width)+'x'+Math.round(r.height);if(k===lastSz)return;lastSz=k;size();if(si>=0){wins=[];scene(si,true);}});
  new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(visible)force=true;},{threshold:0}).observe(cv);
  document.addEventListener('visibilitychange',()=>{visible=!document.hidden;if(visible)force=true;});
  const start=async()=>{size();const first=loadScene(0);if(reduce)await first;
    if(reduce){await scene(0,true);draw(performance.now());HT.classList.remove('hx-intro');return;}
    raf=requestAnimationFrame(loop);
    const li=await logoImg;let L=li?whiteLogo(li):null,Lc=INK;const t0=performance.now();
    if(L)logo=now=>{const e=now-t0;if(Lc!==INK){L=whiteLogo(li);Lc=INK;}if(e>1350){edgeLine(e-1350);return;}const a=Math.min(1,e/450)*(1-Math.max(0,Math.min(1,(e-1050)/300)));
      const w=W*(mob?.62:.34),h=w*L.height/L.width;ctx.globalAlpha=a;ctx.drawImage(L,(W-w)/2,(H-h)/2-h*.06,w,h);ctx.globalAlpha=1;};
    setTimeout(()=>{scene(0);HT.classList.remove('hx-intro');},3250);};
  size();(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(start);
  const skip=()=>{if(si>=0)scene((si+1)%SC.length);};
  window.__hx={B:()=>B,wins:()=>wins.filter(w=>!w.out).map(w=>[w.x,w.y,w.w,w.h]),next:skip,W:()=>[W,H]};
  cv.parentElement.addEventListener('click',e=>{if(e.target.closest('a,button,.name,#edge'))return;skip();});
  if(someEl)someEl.addEventListener('mouseenter',skip);
})();

// client marquee: repeat logos so each half is wider than the screen (no gaps on wide displays)
(function(){const rows=[...document.querySelectorAll('.mq-t')];if(!rows.length)return;
  rows.forEach(ul=>{const all=[...ul.children];ul._set=all.slice(0,all.length/2).map(li=>li.cloneNode(true));ul._dur=parseFloat(getComputedStyle(ul).animationDuration)||38;});
  const fill=()=>{rows.forEach(ul=>{const set=ul._set;ul.innerHTML='';set.forEach(li=>ul.appendChild(li.cloneNode(true)));
    const one=ul.scrollWidth||1;const reps=Math.max(1,Math.ceil((innerWidth+one*0.25)/one));ul.innerHTML='';
    for(let h=0;h<2;h++)for(let r=0;r<reps;r++)set.forEach(li=>{const c=li.cloneNode(true);if(h||r)c.setAttribute('aria-hidden','true');ul.appendChild(c);});
    ul.style.animationDuration=(ul._dur*reps)+'s';});};
  fill();let w=innerWidth;addEventListener('resize',()=>{if(Math.abs(innerWidth-w)<40)return;w=innerWidth;fill();});
  addEventListener('load',fill);})();
