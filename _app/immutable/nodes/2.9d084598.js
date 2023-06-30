var W=Object.defineProperty;var X=(t,e,s)=>e in t?W(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var E=(t,e,s)=>(X(t,typeof e!="symbol"?e+"":e,s),s);import{s as J,f as M,g as V,h as j,d as w,j as x,i as C,A as Z,y as k,B as S,p as G,a as I,c as F,x as _,C as ee,D as P,o as te,E as se,l as Y,m as $,n as A}from"../chunks/scheduler.02064b6c.js";import{S as K,i as Q,f as re,b as ie,d as ne,m as ae,a as ue,t as le,e as oe}from"../chunks/index.0a48cf97.js";function H(t){return(t==null?void 0:t.length)!==void 0?t:Array.from(t)}const de=!0,Ce=Object.freeze(Object.defineProperty({__proto__:null,prerender:de},Symbol.toStringTag,{value:"Module"}));var y=(t=>(t[t.None=0]="None",t[t.VeryLow=1]="VeryLow",t[t.Low=2]="Low",t[t.Medium=3]="Medium",t[t.High=4]="High",t[t.VeryHigh=5]="VeryHigh",t))(y||{});class L{constructor(e){E(this,"password");this.password=e}get ruleText(){return"unknown"}satisfies(){throw new Error("Unimplemented.")}}class he extends L{constructor(s,r){super(s);E(this,"minLength");this.minLength=r}get ruleText(){return`Your password must be at least ${this.minLength} characters.`}satisfies(){return this.password.text.length>=this.minLength?{rule:this,satisfied:!0}:{rule:this,satisfied:!1,severity:y.VeryHigh}}}class ce extends L{get ruleText(){return"Your password must include a number."}satisfies(){return/[0-9]/g.test(this.password.text)?{rule:this,satisfied:!0}:{rule:this,satisfied:!1,severity:y.Medium}}}class fe extends L{constructor(s,r){super(s);E(this,"number");this.number=r}get ruleText(){return`The digits in your password must add up to ${this.number}.`}satisfies(){let s=this.password.text.split("").map(Number).filter(r=>!Number.isNaN(r)).reduce((r,n)=>r+n,0);return s==this.number?{rule:this,satisfied:!0}:{rule:this,satisfied:!1,severity:y.Medium,message:`The digits in your password add up to ${s}, they must add up to ${this.number}`}}}function pe(t){return!Number.isNaN(t.getTime())}function me(t){let e=[];for(let s=0;s<t.length;s++)for(let r=s;r<=t.length;r++){const n=new Date(t.slice(s,r));pe(n)&&e.push(n)}return e}class ge extends L{get ruleText(){return"Your password must include todays date. (Based on your browsers locale.)"}constructor(e){super(e)}satisfies(){const e=new Date;return me(this.password.text).some(r=>r.getDate()==e.getDate()&&r.getMonth()==e.getMonth()&&r.getFullYear()==e.getFullYear())?{rule:this,satisfied:!0}:{rule:this,satisfied:!1,severity:y.VeryHigh}}}class _e extends L{constructor(s,r){super(s);E(this,"maxLength");this.maxLength=r}get ruleText(){return`Your password must be at most ${this.maxLength} characters.`}satisfies(){return this.password.text.length<=this.maxLength?{rule:this,satisfied:!0}:{rule:this,satisfied:!1,severity:y.VeryHigh}}}class we extends L{constructor(s,r,n){super(s);E(this,"excitingCharacters");E(this,"minExcitingCharacters");this.excitingCharacters=r,this.minExcitingCharacters=n}get ruleText(){return"Your password must be more exciting."}satisfies(){let s=0;for(let r=0;r<this.password.text.length;r++)this.excitingCharacters.includes(this.password.text[r])&&s++;return s>=this.minExcitingCharacters?{rule:this,satisfied:!0}:{rule:this,satisfied:!1,severity:y.VeryHigh,message:`Your password must be more exciting. (Must include at least ${this.minExcitingCharacters} exciting characters "${this.excitingCharacters.join("")}".)`}}}class ve extends L{constructor(s,r,n,u,f){super(s);E(this,"tempEmojis");E(this,"startTemp");E(this,"justRightTemp");E(this,"justRightTempMaxDist");this.tempEmojis=r,this.startTemp=n,this.justRightTemp=u,this.justRightTempMaxDist=f}get ruleText(){return"Your password temperature must be just right."}satisfies(){let s=this.startTemp;for(let n of this.password.text)s+=this.tempEmojis[n]??0;return Math.abs(s-this.justRightTemp)<=this.justRightTempMaxDist?{rule:this,satisfied:!0,message:"Your password temperature is just right. 🥣"}:s<this.justRightTemp?{rule:this,satisfied:!1,severity:y.High,message:"Your password temperature is too cold. 🥣🧊"}:{rule:this,satisfied:!1,severity:y.High,message:"Your password temperature is too hot. 🥣🔥"}}}class xe{constructor(){E(this,"text","")}}function be(t){let e,s,r;return{c(){e=M("div"),this.h()},l(n){e=V(n,"DIV",{id:!0,type:!0,spellcheck:!0,contenteditable:!0,class:!0}),j(e).forEach(w),this.h()},h(){x(e,"id","password-input"),x(e,"type","text"),x(e,"spellcheck","false"),x(e,"contenteditable",""),x(e,"class","svelte-pk6hts")},m(n,u){C(n,e,u),t[3](e),s||(r=Z(e,"input",t[1]),s=!0)},p:k,i:k,o:k,d(n){n&&w(e),t[3](null),s=!1,r()}}}function Te(t,e,s){const r=S();let n,{password:u=new xe}=e;function f(){s(2,u.text=n.textContent??"",u),r("passwordchange")}function p(d){G[d?"unshift":"push"](()=>{n=d,s(0,n)})}return t.$$set=d=>{"password"in d&&s(2,u=d.password)},[n,f,u,p]}class De extends K{constructor(e){super(),Q(this,e,Te,be,J,{password:2})}}function B(t,e,s){const r=t.slice();return r[6]=e[s],r}function O(t,e,s){const r=t.slice();return r[6]=e[s],r}function U(t){let e,s="You win!";return{c(){e=M("div"),e.textContent=s,this.h()},l(r){e=V(r,"DIV",{id:!0,class:!0,["data-svelte-h"]:!0}),se(e)!=="svelte-16nacee"&&(e.textContent=s),this.h()},h(){x(e,"id","win-message"),x(e,"class","svelte-12m20hu")},m(r,n){C(r,e,n)},d(r){r&&w(e)}}}function q(t){let e,s,r,n=t[6].index+1+"",u,f,p,d=(t[6].message??t[6].rule.ruleText)+"",m,h;return{c(){e=M("div"),s=M("div"),r=Y("Rule #"),u=Y(n),f=I(),p=M("div"),m=Y(d),h=I(),this.h()},l(l){e=V(l,"DIV",{class:!0});var a=j(e);s=V(a,"DIV",{class:!0});var T=j(s);r=$(T,"Rule #"),u=$(T,n),T.forEach(w),f=F(a),p=V(a,"DIV",{class:!0});var c=j(p);m=$(c,d),c.forEach(w),h=F(a),a.forEach(w),this.h()},h(){x(s,"class","rule-password-num svelte-12m20hu"),x(p,"class","rule-password-msg svelte-12m20hu"),x(e,"class","rule not-satisfied svelte-12m20hu")},m(l,a){C(l,e,a),_(e,s),_(s,r),_(s,u),_(e,f),_(e,p),_(p,m),_(e,h)},p(l,a){a&2&&n!==(n=l[6].index+1+"")&&A(u,n),a&2&&d!==(d=(l[6].message??l[6].rule.ruleText)+"")&&A(m,d)},d(l){l&&w(e)}}}function z(t){let e,s,r,n=t[6].index+1+"",u,f,p,d=(t[6].message??t[6].rule.ruleText)+"",m,h;return{c(){e=M("div"),s=M("div"),r=Y("Rule #"),u=Y(n),f=I(),p=M("div"),m=Y(d),h=I(),this.h()},l(l){e=V(l,"DIV",{class:!0});var a=j(e);s=V(a,"DIV",{class:!0});var T=j(s);r=$(T,"Rule #"),u=$(T,n),T.forEach(w),f=F(a),p=V(a,"DIV",{class:!0});var c=j(p);m=$(c,d),c.forEach(w),h=F(a),a.forEach(w),this.h()},h(){x(s,"class","rule-password-num svelte-12m20hu"),x(p,"class","rule-password-msg svelte-12m20hu"),x(e,"class","rule satisfied svelte-12m20hu")},m(l,a){C(l,e,a),_(e,s),_(s,r),_(s,u),_(e,f),_(e,p),_(p,m),_(e,h)},p(l,a){a&4&&n!==(n=l[6].index+1+"")&&A(u,n),a&4&&d!==(d=(l[6].message??l[6].rule.ruleText)+"")&&A(m,d)},d(l){l&&w(e)}}}function Ee(t){let e,s,r,n,u,f,p,d,m;function h(i){t[4](i)}let l={};t[0]!==void 0&&(l.password=t[0]),e=new De({props:l}),G.push(()=>re(e,"password",h)),e.$on("passwordchange",t[3]);let a=t[1].length==0&&U(),T=H(t[1]),c=[];for(let i=0;i<T.length;i+=1)c[i]=q(O(t,T,i));let N=H(t[2]),g=[];for(let i=0;i<N.length;i+=1)g[i]=z(B(t,N,i));return{c(){ie(e.$$.fragment),r=I(),a&&a.c(),n=I(),u=M("div"),f=M("div");for(let i=0;i<c.length;i+=1)c[i].c();p=I(),d=M("div");for(let i=0;i<g.length;i+=1)g[i].c();this.h()},l(i){ne(e.$$.fragment,i),r=F(i),a&&a.l(i),n=F(i),u=V(i,"DIV",{id:!0});var v=j(u);f=V(v,"DIV",{class:!0});var b=j(f);for(let D=0;D<c.length;D+=1)c[D].l(b);b.forEach(w),p=F(v),d=V(v,"DIV",{class:!0});var o=j(d);for(let D=0;D<g.length;D+=1)g[D].l(o);o.forEach(w),v.forEach(w),this.h()},h(){x(f,"class","rule-container"),x(d,"class","rule-container"),x(u,"id","password-rules")},m(i,v){ae(e,i,v),C(i,r,v),a&&a.m(i,v),C(i,n,v),C(i,u,v),_(u,f);for(let b=0;b<c.length;b+=1)c[b]&&c[b].m(f,null);_(u,p),_(u,d);for(let b=0;b<g.length;b+=1)g[b]&&g[b].m(d,null);m=!0},p(i,[v]){const b={};if(!s&&v&1&&(s=!0,b.password=i[0],ee(()=>s=!1)),e.$set(b),i[1].length==0?a||(a=U(),a.c(),a.m(n.parentNode,n)):a&&(a.d(1),a=null),v&2){T=H(i[1]);let o;for(o=0;o<T.length;o+=1){const D=O(i,T,o);c[o]?c[o].p(D,v):(c[o]=q(D),c[o].c(),c[o].m(f,null))}for(;o<c.length;o+=1)c[o].d(1);c.length=T.length}if(v&4){N=H(i[2]);let o;for(o=0;o<N.length;o+=1){const D=B(i,N,o);g[o]?g[o].p(D,v):(g[o]=z(D),g[o].c(),g[o].m(d,null))}for(;o<g.length;o+=1)g[o].d(1);g.length=N.length}},i(i){m||(ue(e.$$.fragment,i),m=!0)},o(i){le(e.$$.fragment,i),m=!1},d(i){i&&(w(r),w(n),w(u)),oe(e,i),a&&a.d(i),P(c,i),P(g,i)}}}function R(t,e){return Math.floor(Math.random()*(e-t+1)+t)}function Me(t,e,s){let r,n=[],u=[],f=[];function p(){let m=[];for(let h=0;h<n.length;h++){const a=n[h].satisfies();m.push({...a,index:h})}s(2,f=m.filter(h=>h.satisfied).sort((h,l)=>l.index-h.index)),s(1,u=m.filter(h=>!h.satisfied).sort((h,l)=>((l==null?void 0:l.severity)??99999+l.index)-((h==null?void 0:h.severity)??99999+h.index)))}te(()=>{n=[new he(r,R(5,10)),new _e(r,100),new ce(r),new fe(r,R(40,60)),new ge(r),new we(r,["!","?"],R(2,4)),new ve(r,{"🔥":30,"♨️":25,"🚀":100,"🪔":20,"🕯":10,"💦":-10,"💧":-3,"🌊":-50,"🧊":-30,"❄️":-5,"🌨":-40},21,R(80,100),5)],p()});function d(m){r=m,s(0,r)}return[r,u,f,p,d]}class Ie extends K{constructor(e){super(),Q(this,e,Me,Ee,J,{})}}export{Ie as component,Ce as universal};