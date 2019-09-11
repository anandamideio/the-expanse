// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/roughjs/dist/rough-async.js":[function(require,module,exports) {
var rough=function(){"use strict";const t="undefined"!=typeof self;class e{constructor(t,e){this.defaultOptions={maxRandomnessOffset:2,roughness:1,bowing:1,stroke:"#000",strokeWidth:1,curveTightness:0,curveStepCount:9,fillStyle:"hachure",fillWeight:-1,hachureAngle:-41,hachureGap:-1,dashOffset:-1,dashGap:-1,zigzagOffset:-1},this.config=t||{},this.surface=e,this.config.options&&(this.defaultOptions=this._options(this.config.options))}_options(t){return t?Object.assign({},this.defaultOptions,t):this.defaultOptions}_drawable(t,e,s){return{shape:t,sets:e||[],options:s||this.defaultOptions}}getCanvasSize(){const t=t=>t&&"object"==typeof t&&t.baseVal&&t.baseVal.value?t.baseVal.value:t||100;return this.surface?[t(this.surface.width),t(this.surface.height)]:[100,100]}computePolygonSize(t){if(t.length){let e=t[0][0],s=t[0][0],i=t[0][1],n=t[0][1];for(let a=1;a<t.length;a++)e=Math.min(e,t[a][0]),s=Math.max(s,t[a][0]),i=Math.min(i,t[a][1]),n=Math.max(n,t[a][1]);return[s-e,n-i]}return[0,0]}polygonPath(t){let e="";if(t.length){e=`M${t[0][0]},${t[0][1]}`;for(let s=1;s<t.length;s++)e=`${e} L${t[s][0]},${t[s][1]}`}return e}computePathSize(e){let s=[0,0];if(t&&self.document)try{const t="http://www.w3.org/2000/svg",i=self.document.createElementNS(t,"svg");i.setAttribute("width","0"),i.setAttribute("height","0");const n=self.document.createElementNS(t,"path");n.setAttribute("d",e),i.appendChild(n),self.document.body.appendChild(i);const a=n.getBBox();a&&(s[0]=a.width||0,s[1]=a.height||0),self.document.body.removeChild(i)}catch(t){}const i=this.getCanvasSize();return s[0]*s[1]||(s=i),s}toPaths(t){const e=t.sets||[],s=t.options||this.defaultOptions,i=[];for(const t of e){let e=null;switch(t.type){case"path":e={d:this.opsToPath(t),stroke:s.stroke,strokeWidth:s.strokeWidth,fill:"none"};break;case"fillPath":e={d:this.opsToPath(t),stroke:"none",strokeWidth:0,fill:s.fill||"none"};break;case"fillSketch":e=this.fillSketch(t,s);break;case"path2Dfill":e={d:t.path||"",stroke:"none",strokeWidth:0,fill:s.fill||"none"};break;case"path2Dpattern":{const i=t.size,n={x:0,y:0,width:1,height:1,viewBox:`0 0 ${Math.round(i[0])} ${Math.round(i[1])}`,patternUnits:"objectBoundingBox",path:this.fillSketch(t,s)};e={d:t.path,stroke:"none",strokeWidth:0,pattern:n};break}}e&&i.push(e)}return i}fillSketch(t,e){let s=e.fillWeight;return s<0&&(s=e.strokeWidth/2),{d:this.opsToPath(t),stroke:e.fill||"none",strokeWidth:s,fill:"none"}}opsToPath(t){let e="";for(const s of t.ops){const t=s.data;switch(s.op){case"move":e+=`M${t[0]} ${t[1]} `;break;case"bcurveTo":e+=`C${t[0]} ${t[1]}, ${t[2]} ${t[3]}, ${t[4]} ${t[5]} `;break;case"qcurveTo":e+=`Q${t[0]} ${t[1]}, ${t[2]} ${t[3]} `;break;case"lineTo":e+=`L${t[0]} ${t[1]} `}}return e.trim()}}function s(t,e){return e=e||[],new Proxy(function(){},{get(i,n,a){if("then"===n){if(0===e.length)return{then:()=>a};const s=t.remote({type:"GET",path:e});return s.then.bind(s)}return s(t,e.concat(n))},set:(s,i,n)=>t.remote({type:"SET",path:e.concat(i),value:n}),apply:(s,i,n)=>t.remote({type:"APPLY",path:e,args:n}),construct:(e,s)=>t.remote({type:"CONSTRUCT",args:s})})}class i{constructor(t,e){this.w=t,this.uid=e||`${Date.now()}-${n()}`,this.c=0,this.cbs={},t.addEventListener("message",e=>{if(this.w.oURL)try{URL.revokeObjectURL(this.w.oURL)}catch(t){}finally{delete this.w.oURL}let n=e.data&&e.data.id,a=n&&this.cbs[n];a&&(delete this.cbs[n],e.data.error?a[1](new Error(e.data.error)):a[0](e.data.targetId?s(new i(t,e.data.targetId)):e.data.value))})}remote(t){const e=t.args||[],s=`${this.uid}-${++this.c}`;return new Promise((i,n)=>{this.cbs[s]=[i,n],this.w.postMessage(Object.assign({},t,{id:s,args:e,target:this.uid}))})}}function n(){return Math.floor(Math.random()*Number.MAX_SAFE_INTEGER)}function a(t){const e=t,s={};self.addEventListener("message",async t=>{let i=t.data||{};i.path=i.path||[];let a=i.target&&s[i.target]||e;const h=t=>t.reduce((t,e)=>t?t[e]:t,a),r=i&&i.id;if(r&&i.type){const t={id:r},e=h(i.path),a=h(i.path.slice(0,-1));switch(i.type){case"GET":t.value=e;break;case"SET":let h=i.path.length&&i.path[i.path.length-1];h&&(a[h]=i.value),t.value=!!h;break;case"APPLY":try{t.value=await e.apply(a,i.args||[])}catch(e){t.error=e.toString()}break;case"CONSTRUCT":try{t.value=new e(...i.args),t.targetId=(t=>{const e=`${Date.now()}-${n()}`;return s[e]=t,e})(t.value)}catch(e){t.error=e.toString()}}self.postMessage(t)}})}function h(t,e){return t.type===e}const r={A:7,a:7,C:6,c:6,H:1,h:1,L:2,l:2,M:2,m:2,Q:4,q:4,S:4,s:4,T:4,t:2,V:1,v:1,Z:0,z:0};class o{constructor(t){this.COMMAND=0,this.NUMBER=1,this.EOD=2,this.segments=[],this.parseData(t),this.processPoints()}tokenize(t){const e=new Array;for(;""!==t;)if(t.match(/^([ \t\r\n,]+)/))t=t.substr(RegExp.$1.length);else if(t.match(/^([aAcChHlLmMqQsStTvVzZ])/))e[e.length]={type:this.COMMAND,text:RegExp.$1},t=t.substr(RegExp.$1.length);else{if(!t.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/))return console.error("Unrecognized segment command: "+t),[];e[e.length]={type:this.NUMBER,text:`${parseFloat(RegExp.$1)}`},t=t.substr(RegExp.$1.length)}return e[e.length]={type:this.EOD,text:""},e}parseData(t){const e=this.tokenize(t);let s=0,i=e[s],n="BOD";for(this.segments=new Array;!h(i,this.EOD);){let a;const o=new Array;if("BOD"===n){if("M"!==i.text&&"m"!==i.text)return void this.parseData("M0,0"+t);s++,a=r[i.text],n=i.text}else h(i,this.NUMBER)?a=r[n]:(s++,a=r[i.text],n=i.text);if(s+a<e.length){for(let t=s;t<s+a;t++){const s=e[t];if(!h(s,this.NUMBER))return void console.error("Parameter type is not a number: "+n+","+s.text);o[o.length]=+s.text}if("number"!=typeof r[n])return void console.error("Unsupported segment type: "+n);{const t={key:n,data:o};this.segments.push(t),i=e[s+=a],"M"===n&&(n="L"),"m"===n&&(n="l")}}else console.error("Path data ended before all parameters were found")}}get closed(){if(void 0===this._closed){this._closed=!1;for(const t of this.segments)"z"===t.key.toLowerCase()&&(this._closed=!0)}return this._closed}processPoints(){let t=null,e=[0,0];for(let s=0;s<this.segments.length;s++){const i=this.segments[s];switch(i.key){case"M":case"L":case"T":i.point=[i.data[0],i.data[1]];break;case"m":case"l":case"t":i.point=[i.data[0]+e[0],i.data[1]+e[1]];break;case"H":i.point=[i.data[0],e[1]];break;case"h":i.point=[i.data[0]+e[0],e[1]];break;case"V":i.point=[e[0],i.data[0]];break;case"v":i.point=[e[0],i.data[0]+e[1]];break;case"z":case"Z":t&&(i.point=[t[0],t[1]]);break;case"C":i.point=[i.data[4],i.data[5]];break;case"c":i.point=[i.data[4]+e[0],i.data[5]+e[1]];break;case"S":i.point=[i.data[2],i.data[3]];break;case"s":i.point=[i.data[2]+e[0],i.data[3]+e[1]];break;case"Q":i.point=[i.data[2],i.data[3]];break;case"q":i.point=[i.data[2]+e[0],i.data[3]+e[1]];break;case"A":i.point=[i.data[5],i.data[6]];break;case"a":i.point=[i.data[5]+e[0],i.data[6]+e[1]]}"m"!==i.key&&"M"!==i.key||(t=null),i.point&&(e=i.point,t||(t=i.point)),"z"!==i.key&&"Z"!==i.key||(t=null)}}}class l{constructor(t){this._position=[0,0],this._first=null,this.bezierReflectionPoint=null,this.quadReflectionPoint=null,this.parsed=new o(t)}get segments(){return this.parsed.segments}get closed(){return this.parsed.closed}get linearPoints(){if(!this._linearPoints){const t=[];let e=[];for(const s of this.parsed.segments){const i=s.key.toLowerCase();("m"!==i&&"z"!==i||(e.length&&(t.push(e),e=[]),"z"!==i))&&(s.point&&e.push(s.point))}e.length&&(t.push(e),e=[]),this._linearPoints=t}return this._linearPoints}get first(){return this._first}set first(t){this._first=t}setPosition(t,e){this._position=[t,e],this._first||(this._first=[t,e])}get position(){return this._position}get x(){return this._position[0]}get y(){return this._position[1]}}class c{constructor(t,e,s,i,n,a){if(this._segIndex=0,this._numSegs=0,this._rx=0,this._ry=0,this._sinPhi=0,this._cosPhi=0,this._C=[0,0],this._theta=0,this._delta=0,this._T=0,this._from=t,t[0]===e[0]&&t[1]===e[1])return;const h=Math.PI/180;this._rx=Math.abs(s[0]),this._ry=Math.abs(s[1]),this._sinPhi=Math.sin(i*h),this._cosPhi=Math.cos(i*h);const r=this._cosPhi*(t[0]-e[0])/2+this._sinPhi*(t[1]-e[1])/2,o=-this._sinPhi*(t[0]-e[0])/2+this._cosPhi*(t[1]-e[1])/2;let l=0;const c=this._rx*this._rx*this._ry*this._ry-this._rx*this._rx*o*o-this._ry*this._ry*r*r;if(c<0){const t=Math.sqrt(1-c/(this._rx*this._rx*this._ry*this._ry));this._rx=this._rx*t,this._ry=this._ry*t,l=0}else l=(n===a?-1:1)*Math.sqrt(c/(this._rx*this._rx*o*o+this._ry*this._ry*r*r));const p=l*this._rx*o/this._ry,u=-l*this._ry*r/this._rx;this._C=[0,0],this._C[0]=this._cosPhi*p-this._sinPhi*u+(t[0]+e[0])/2,this._C[1]=this._sinPhi*p+this._cosPhi*u+(t[1]+e[1])/2,this._theta=this.calculateVectorAngle(1,0,(r-p)/this._rx,(o-u)/this._ry);let f=this.calculateVectorAngle((r-p)/this._rx,(o-u)/this._ry,(-r-p)/this._rx,(-o-u)/this._ry);!a&&f>0?f-=2*Math.PI:a&&f<0&&(f+=2*Math.PI),this._numSegs=Math.ceil(Math.abs(f/(Math.PI/2))),this._delta=f/this._numSegs,this._T=8/3*Math.sin(this._delta/4)*Math.sin(this._delta/4)/Math.sin(this._delta/2)}getNextSegment(){if(this._segIndex===this._numSegs)return null;const t=Math.cos(this._theta),e=Math.sin(this._theta),s=this._theta+this._delta,i=Math.cos(s),n=Math.sin(s),a=[this._cosPhi*this._rx*i-this._sinPhi*this._ry*n+this._C[0],this._sinPhi*this._rx*i+this._cosPhi*this._ry*n+this._C[1]],h=[this._from[0]+this._T*(-this._cosPhi*this._rx*e-this._sinPhi*this._ry*t),this._from[1]+this._T*(-this._sinPhi*this._rx*e+this._cosPhi*this._ry*t)],r=[a[0]+this._T*(this._cosPhi*this._rx*n+this._sinPhi*this._ry*i),a[1]+this._T*(this._sinPhi*this._rx*n-this._cosPhi*this._ry*i)];return this._theta=s,this._from=[a[0],a[1]],this._segIndex++,{cp1:h,cp2:r,to:a}}calculateVectorAngle(t,e,s,i){const n=Math.atan2(e,t),a=Math.atan2(i,s);return a>=n?a-n:2*Math.PI-(n-a)}}class p{constructor(t,e){this.sets=t,this.closed=e}fit(t){const e=[];for(const s of this.sets){const i=s.length;let n=Math.floor(t*i);if(n<5){if(i<=5)continue;n=5}e.push(this.reduce(s,n))}let s="";for(const t of e){for(let e=0;e<t.length;e++){const i=t[e];s+=0===e?"M"+i[0]+","+i[1]:"L"+i[0]+","+i[1]}this.closed&&(s+="z ")}return s}distance(t,e){return Math.sqrt(Math.pow(t[0]-e[0],2)+Math.pow(t[1]-e[1],2))}reduce(t,e){if(t.length<=e)return t;const s=t.slice(0);for(;s.length>e;){let t=-1,e=-1;for(let i=1;i<s.length-1;i++){const n=this.distance(s[i-1],s[i]),a=this.distance(s[i],s[i+1]),h=this.distance(s[i-1],s[i+1]),r=(n+a+h)/2,o=Math.sqrt(r*(r-n)*(r-a)*(r-h));(t<0||o<t)&&(t=o,e=i)}if(!(e>0))break;s.splice(e,1)}return s}}class u{constructor(t,e){this.xi=Number.MAX_VALUE,this.yi=Number.MAX_VALUE,this.px1=t[0],this.py1=t[1],this.px2=e[0],this.py2=e[1],this.a=this.py2-this.py1,this.b=this.px1-this.px2,this.c=this.px2*this.py1-this.px1*this.py2,this._undefined=0===this.a&&0===this.b&&0===this.c}isUndefined(){return this._undefined}intersects(t){if(this.isUndefined()||t.isUndefined())return!1;let e=Number.MAX_VALUE,s=Number.MAX_VALUE,i=0,n=0;const a=this.a,h=this.b,r=this.c;return Math.abs(h)>1e-5&&(e=-a/h,i=-r/h),Math.abs(t.b)>1e-5&&(s=-t.a/t.b,n=-t.c/t.b),e===Number.MAX_VALUE?s===Number.MAX_VALUE?-r/a==-t.c/t.a&&(this.py1>=Math.min(t.py1,t.py2)&&this.py1<=Math.max(t.py1,t.py2)?(this.xi=this.px1,this.yi=this.py1,!0):this.py2>=Math.min(t.py1,t.py2)&&this.py2<=Math.max(t.py1,t.py2)&&(this.xi=this.px2,this.yi=this.py2,!0)):(this.xi=this.px1,this.yi=s*this.xi+n,!((this.py1-this.yi)*(this.yi-this.py2)<-1e-5||(t.py1-this.yi)*(this.yi-t.py2)<-1e-5)&&(!(Math.abs(t.a)<1e-5)||!((t.px1-this.xi)*(this.xi-t.px2)<-1e-5))):s===Number.MAX_VALUE?(this.xi=t.px1,this.yi=e*this.xi+i,!((t.py1-this.yi)*(this.yi-t.py2)<-1e-5||(this.py1-this.yi)*(this.yi-this.py2)<-1e-5)&&(!(Math.abs(a)<1e-5)||!((this.px1-this.xi)*(this.xi-this.px2)<-1e-5))):e===s?i===n&&(this.px1>=Math.min(t.px1,t.px2)&&this.px1<=Math.max(t.py1,t.py2)?(this.xi=this.px1,this.yi=this.py1,!0):this.px2>=Math.min(t.px1,t.px2)&&this.px2<=Math.max(t.px1,t.px2)&&(this.xi=this.px2,this.yi=this.py2,!0)):(this.xi=(n-i)/(e-s),this.yi=e*this.xi+i,!((this.px1-this.xi)*(this.xi-this.px2)<-1e-5||(t.px1-this.xi)*(this.xi-t.px2)<-1e-5))}}function f(t,e){const s=t[1][1]-t[0][1],i=t[0][0]-t[1][0],n=s*t[0][0]+i*t[0][1],a=e[1][1]-e[0][1],h=e[0][0]-e[1][0],r=a*e[0][0]+h*e[0][1],o=s*h-a*i;return o?[Math.round((h*n-i*r)/o),Math.round((s*r-a*n)/o)]:null}class d{constructor(t,e,s,i,n,a,h,r){this.deltaX=0,this.hGap=0,this.top=t,this.bottom=e,this.left=s,this.right=i,this.gap=n,this.sinAngle=a,this.tanAngle=r,Math.abs(a)<1e-4?this.pos=s+n:Math.abs(a)>.9999?this.pos=t+n:(this.deltaX=(e-t)*Math.abs(r),this.pos=s-Math.abs(this.deltaX),this.hGap=Math.abs(n/h),this.sLeft=new u([s,e],[s,t]),this.sRight=new u([i,e],[i,t]))}nextLine(){if(Math.abs(this.sinAngle)<1e-4){if(this.pos<this.right){const t=[this.pos,this.top,this.pos,this.bottom];return this.pos+=this.gap,t}}else if(Math.abs(this.sinAngle)>.9999){if(this.pos<this.bottom){const t=[this.left,this.pos,this.right,this.pos];return this.pos+=this.gap,t}}else{let t=this.pos-this.deltaX/2,e=this.pos+this.deltaX/2,s=this.bottom,i=this.top;if(this.pos<this.right+this.deltaX){for(;t<this.left&&e<this.left||t>this.right&&e>this.right;)if(this.pos+=this.hGap,t=this.pos-this.deltaX/2,e=this.pos+this.deltaX/2,this.pos>this.right+this.deltaX)return null;const n=new u([t,s],[e,i]);this.sLeft&&n.intersects(this.sLeft)&&(t=n.xi,s=n.yi),this.sRight&&n.intersects(this.sRight)&&(e=n.xi,i=n.yi),this.tanAngle>0&&(t=this.right-(t-this.left),e=this.right-(e-this.left));const a=[t,s,e,i];return this.pos+=this.hGap,a}}return null}}function g(t){const e=t[0],s=t[1];return Math.sqrt(Math.pow(e[0]-s[0],2)+Math.pow(e[1]-s[1],2))}function y(t,e){const s=[],i=new u([t[0],t[1]],[t[2],t[3]]);for(let t=0;t<e.length;t++){const n=new u(e[t],e[(t+1)%e.length]);i.intersects(n)&&s.push([i.xi,i.yi])}return s}function M(t,e,s,i,n,a,h){return[-s*a-i*n+s+a*t+n*e,h*(s*n-i*a)+i+-h*n*t+h*a*e]}function w(t,e){const s=[];if(t&&t.length){let i=t[0][0],n=t[0][0],a=t[0][1],h=t[0][1];for(let e=1;e<t.length;e++)i=Math.min(i,t[e][0]),n=Math.max(n,t[e][0]),a=Math.min(a,t[e][1]),h=Math.max(h,t[e][1]);const r=e.hachureAngle;let o=e.hachureGap;o<0&&(o=4*e.strokeWidth),o=Math.max(o,.1);const l=r%180*(Math.PI/180),c=Math.cos(l),p=Math.sin(l),u=Math.tan(l),f=new d(a-1,h+1,i-1,n+1,o,p,c,u);let g;for(;null!=(g=f.nextLine());){const e=y(g,t);for(let t=0;t<e.length;t++)if(t<e.length-1){const i=e[t],n=e[t+1];s.push([i,n])}}}return s}function b(t,e,s,i,n,a){const h=[];let r=Math.abs(i/2),o=Math.abs(n/2);r+=t.randOffset(.05*r,a),o+=t.randOffset(.05*o,a);const l=a.hachureAngle;let c=a.hachureGap;c<=0&&(c=4*a.strokeWidth);let p=a.fillWeight;p<0&&(p=a.strokeWidth/2);const u=l%180*(Math.PI/180),f=Math.tan(u),d=o/r,g=Math.sqrt(d*f*d*f+1),y=d*f/g,w=1/g,b=c/(r*o/Math.sqrt(o*w*(o*w)+r*y*(r*y))/r);let x=Math.sqrt(r*r-(e-r+b)*(e-r+b));for(let t=e-r+b;t<e+r;t+=b){const i=M(t,s-(x=Math.sqrt(r*r-(e-t)*(e-t))),e,s,y,w,d),n=M(t,s+x,e,s,y,w,d);h.push([i,n])}return h}class x{constructor(t){this.helper=t}fillPolygon(t,e){return this._fillPolygon(t,e)}fillEllipse(t,e,s,i,n){return this._fillEllipse(t,e,s,i,n)}fillArc(t,e,s,i,n,a,h){return null}_fillPolygon(t,e,s=!1){const i=w(t,e);return{type:"fillSketch",ops:this.renderLines(i,e,s)}}_fillEllipse(t,e,s,i,n,a=!1){const h=b(this.helper,t,e,s,i,n);return{type:"fillSketch",ops:this.renderLines(h,n,a)}}renderLines(t,e,s){let i=[],n=null;for(const a of t)i=i.concat(this.helper.doubleLineOps(a[0][0],a[0][1],a[1][0],a[1][1],e)),s&&n&&(i=i.concat(this.helper.doubleLineOps(n[0],n[1],a[0][0],a[0][1],e))),n=a[1];return i}}class m extends x{fillPolygon(t,e){return this._fillPolygon(t,e,!0)}fillEllipse(t,e,s,i,n){return this._fillEllipse(t,e,s,i,n,!0)}}class _ extends x{fillPolygon(t,e){const s=this._fillPolygon(t,e),i=Object.assign({},e,{hachureAngle:e.hachureAngle+90}),n=this._fillPolygon(t,i);return s.ops=s.ops.concat(n.ops),s}fillEllipse(t,e,s,i,n){const a=this._fillEllipse(t,e,s,i,n),h=Object.assign({},n,{hachureAngle:n.hachureAngle+90}),r=this._fillEllipse(t,e,s,i,h);return a.ops=a.ops.concat(r.ops),a}}class k{constructor(t){this.helper=t}fillPolygon(t,e){const s=w(t,e=Object.assign({},e,{curveStepCount:4,hachureAngle:0}));return this.dotsOnLines(s,e)}fillEllipse(t,e,s,i,n){n=Object.assign({},n,{curveStepCount:4,hachureAngle:0});const a=b(this.helper,t,e,s,i,n);return this.dotsOnLines(a,n)}fillArc(t,e,s,i,n,a,h){return null}dotsOnLines(t,e){let s=[],i=e.hachureGap;i<0&&(i=4*e.strokeWidth),i=Math.max(i,.1);let n=e.fillWeight;n<0&&(n=e.strokeWidth/2);for(const a of t){const t=g(a)/i,h=Math.ceil(t)-1,r=Math.atan((a[1][1]-a[0][1])/(a[1][0]-a[0][0]));for(let t=0;t<h;t++){const h=i*(t+1),o=h*Math.sin(r),l=h*Math.cos(r),c=[a[0][0]-l,a[0][1]+o],p=this.helper.randOffsetWithRange(c[0]-i/4,c[0]+i/4,e),u=this.helper.randOffsetWithRange(c[1]-i/4,c[1]+i/4,e),f=this.helper.ellipse(p,u,n,n,e);s=s.concat(f.ops)}}return{type:"fillSketch",ops:s}}}class P{constructor(t){this.helper=t}fillPolygon(t,e){const s=[Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER],i=[Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER];t.forEach(t=>{s[0]=Math.min(s[0],t[0]),s[1]=Math.max(s[1],t[0]),i[0]=Math.min(i[0],t[1]),i[1]=Math.max(i[1],t[1])});const n=function(t){let e=0,s=0,i=0;for(let s=0;s<t.length;s++){const i=t[s],n=s===t.length-1?t[0]:t[s+1];e+=i[0]*n[1]-n[0]*i[1]}e/=2;for(let e=0;e<t.length;e++){const n=t[e],a=e===t.length-1?t[0]:t[e+1];s+=(n[0]+a[0])*(n[0]*a[1]-a[0]*n[1]),i+=(n[1]+a[1])*(n[0]*a[1]-a[0]*n[1])}return[s/(6*e),i/(6*e)]}(t),a=Math.max(Math.sqrt(Math.pow(n[0]-s[0],2)+Math.pow(n[1]-i[0],2)),Math.sqrt(Math.pow(n[0]-s[1],2)+Math.pow(n[1]-i[1],2))),h=e.hachureGap>0?e.hachureGap:4*e.strokeWidth,r=[];if(t.length>2)for(let e=0;e<t.length;e++)e===t.length-1?r.push([t[e],t[0]]):r.push([t[e],t[e+1]]);let o=[];const l=Math.max(1,Math.PI*a/h);for(let t=0;t<l;t++){const e=t*Math.PI/l,h=[n,[n[0]+a*Math.cos(e),n[1]+a*Math.sin(e)]];r.forEach(t=>{const e=f(t,h);e&&e[0]>=s[0]&&e[0]<=s[1]&&e[1]>=i[0]&&e[1]<=i[1]&&o.push(e)})}o=this.removeDuplocatePoints(o);const c=this.createLinesFromCenter(n,o);return{type:"fillSketch",ops:this.drawLines(c,e)}}fillEllipse(t,e,s,i,n){return this.fillArcSegment(t,e,s,i,0,2*Math.PI,n)}fillArc(t,e,s,i,n,a,h){return this.fillArcSegment(t,e,s,i,n,a,h)}fillArcSegment(t,e,s,i,n,a,h){const r=[t,e],o=s/2,l=i/2,c=Math.max(s/2,i/2);let p=h.hachureGap;p<0&&(p=4*h.strokeWidth);const u=Math.max(1,Math.abs(a-n)*c/p);let f=[];for(let t=0;t<u;t++){const e=t*((a-n)/u)+n,s=c*Math.cos(e),i=c*Math.sin(e),h=Math.sqrt(o*o*i*i+l*l*s*s),p=o*l*s/h,d=o*l*i/h;f.push([r[0]+p,r[1]+d])}f=this.removeDuplocatePoints(f);const d=this.createLinesFromCenter(r,f);return{type:"fillSketch",ops:this.drawLines(d,h)}}drawLines(t,e){let s=[];return t.forEach(t=>{const i=t[0],n=t[1];s=s.concat(this.helper.doubleLineOps(i[0],i[1],n[0],n[1],e))}),s}createLinesFromCenter(t,e){return e.map(e=>[t,e])}removeDuplocatePoints(t){const e=new Set;return t.filter(t=>{const s=t.join(",");return!e.has(s)&&(e.add(s),!0)})}}class v{constructor(t){this.helper=t}fillPolygon(t,e){const s=w(t,e);return{type:"fillSketch",ops:this.dashedLine(s,e)}}fillEllipse(t,e,s,i,n){const a=b(this.helper,t,e,s,i,n);return{type:"fillSketch",ops:this.dashedLine(a,n)}}fillArc(t,e,s,i,n,a,h){return null}dashedLine(t,e){const s=e.dashOffset<0?e.hachureGap<0?4*e.strokeWidth:e.hachureGap:e.dashOffset,i=e.dashGap<0?e.hachureGap<0?4*e.strokeWidth:e.hachureGap:e.dashGap;let n=[];return t.forEach(t=>{const a=g(t),h=Math.floor(a/(s+i)),r=(a+i-h*(s+i))/2;let o=t[0],l=t[1];o[0]>l[0]&&(o=t[1],l=t[0]);const c=Math.atan((l[1]-o[1])/(l[0]-o[0]));for(let t=0;t<h;t++){const a=t*(s+i),h=a+s,l=[o[0]+a*Math.cos(c)+r*Math.cos(c),o[1]+a*Math.sin(c)+r*Math.sin(c)],p=[o[0]+h*Math.cos(c)+r*Math.cos(c),o[1]+h*Math.sin(c)+r*Math.sin(c)];n=n.concat(this.helper.doubleLineOps(l[0],l[1],p[0],p[1],e))}}),n}}class S{constructor(t){this.helper=t}fillPolygon(t,e){const s=e.hachureGap<0?4*e.strokeWidth:e.hachureGap,i=e.zigzagOffset<0?s:e.zigzagOffset,n=w(t,e=Object.assign({},e,{hachureGap:s+i}));return{type:"fillSketch",ops:this.zigzagLines(n,i,e)}}fillEllipse(t,e,s,i,n){const a=n.hachureGap<0?4*n.strokeWidth:n.hachureGap,h=n.zigzagOffset<0?a:n.zigzagOffset;n=Object.assign({},n,{hachureGap:a+h});const r=b(this.helper,t,e,s,i,n);return{type:"fillSketch",ops:this.zigzagLines(r,h,n)}}fillArc(t,e,s,i,n,a,h){return null}zigzagLines(t,e,s){let i=[];return t.forEach(t=>{const n=g(t),a=Math.round(n/(2*e));let h=t[0],r=t[1];h[0]>r[0]&&(h=t[1],r=t[0]);const o=Math.atan((r[1]-h[1])/(r[0]-h[0]));for(let t=0;t<a;t++){const n=2*t*e,a=2*(t+1)*e,r=Math.sqrt(2*Math.pow(e,2)),l=[h[0]+n*Math.cos(o),h[1]+n*Math.sin(o)],c=[h[0]+a*Math.cos(o),h[1]+a*Math.sin(o)],p=[l[0]+r*Math.cos(o+Math.PI/4),l[1]+r*Math.sin(o+Math.PI/4)];i=(i=i.concat(this.helper.doubleLineOps(l[0],l[1],p[0],p[1],s))).concat(this.helper.doubleLineOps(p[0],p[1],c[0],c[1],s))}}),i}}const A={};function E(t,e){let s=t.fillStyle||"hachure";if(!A[s])switch(s){case"zigzag":A[s]||(A[s]=new m(e));break;case"cross-hatch":A[s]||(A[s]=new _(e));break;case"dots":A[s]||(A[s]=new k(e));break;case"starburst":A[s]||(A[s]=new P(e));break;case"dashed":A[s]||(A[s]=new v(e));break;case"zigzag-line":A[s]||(A[s]=new S(e));break;case"hachure":default:A[s="hachure"]||(A[s]=new x(e))}return A[s]}const O={randOffset:N,randOffsetWithRange:W,ellipse:R,doubleLineOps:I};function T(t,e,s,i,n){return{type:"path",ops:G(t,e,s,i,n)}}function L(t,e,s){const i=(t||[]).length;if(i>2){let n=[];for(let e=0;e<i-1;e++)n=n.concat(G(t[e][0],t[e][1],t[e+1][0],t[e+1][1],s));return e&&(n=n.concat(G(t[i-1][0],t[i-1][1],t[0][0],t[0][1],s))),{type:"path",ops:n}}return 2===i?T(t[0][0],t[0][1],t[1][0],t[1][1],s):{type:"path",ops:[]}}function C(t,e){return L(t,!0,e)}function R(t,e,s,i,n){const a=2*Math.PI/n.curveStepCount;let h=Math.abs(s/2),r=Math.abs(i/2);const o=F(a,t,e,h+=D(.05*h,n),r+=D(.05*r,n),1,a*$(.1,$(.4,1,n),n),n),l=F(a,t,e,h,r,1.5,0,n);return{type:"path",ops:o.concat(l)}}function z(t,e){return E(e,O).fillPolygon(t,e)}function N(t,e){return D(t,e)}function W(t,e,s){return $(t,e,s)}function I(t,e,s,i,n){return G(t,e,s,i,n)}function $(t,e,s){return s.roughness*(Math.random()*(e-t)+t)}function D(t,e){return $(-t,t,e)}function G(t,e,s,i,n){const a=q(t,e,s,i,n,!0,!1),h=q(t,e,s,i,n,!0,!0);return a.concat(h)}function q(t,e,s,i,n,a,h){const r=Math.pow(t-s,2)+Math.pow(e-i,2);let o=n.maxRandomnessOffset||0;o*o*100>r&&(o=Math.sqrt(r)/10);const l=o/2,c=.2+.2*Math.random();let p=n.bowing*n.maxRandomnessOffset*(i-e)/200,u=n.bowing*n.maxRandomnessOffset*(t-s)/200;p=D(p,n),u=D(u,n);const f=[],d=()=>D(l,n),g=()=>D(o,n);return a&&(h?f.push({op:"move",data:[t+d(),e+d()]}):f.push({op:"move",data:[t+D(o,n),e+D(o,n)]})),h?f.push({op:"bcurveTo",data:[p+t+(s-t)*c+d(),u+e+(i-e)*c+d(),p+t+2*(s-t)*c+d(),u+e+2*(i-e)*c+d(),s+d(),i+d()]}):f.push({op:"bcurveTo",data:[p+t+(s-t)*c+g(),u+e+(i-e)*c+g(),p+t+2*(s-t)*c+g(),u+e+2*(i-e)*c+g(),s+g(),i+g()]}),f}function U(t,e,s){const i=[];i.push([t[0][0]+D(e,s),t[0][1]+D(e,s)]),i.push([t[0][0]+D(e,s),t[0][1]+D(e,s)]);for(let n=1;n<t.length;n++)i.push([t[n][0]+D(e,s),t[n][1]+D(e,s)]),n===t.length-1&&i.push([t[n][0]+D(e,s),t[n][1]+D(e,s)]);return B(i,null,s)}function B(t,e,s){const i=t.length;let n=[];if(i>3){const a=[],h=1-s.curveTightness;n.push({op:"move",data:[t[1][0],t[1][1]]});for(let e=1;e+2<i;e++){const s=t[e];a[0]=[s[0],s[1]],a[1]=[s[0]+(h*t[e+1][0]-h*t[e-1][0])/6,s[1]+(h*t[e+1][1]-h*t[e-1][1])/6],a[2]=[t[e+1][0]+(h*t[e][0]-h*t[e+2][0])/6,t[e+1][1]+(h*t[e][1]-h*t[e+2][1])/6],a[3]=[t[e+1][0],t[e+1][1]],n.push({op:"bcurveTo",data:[a[1][0],a[1][1],a[2][0],a[2][1],a[3][0],a[3][1]]})}if(e&&2===e.length){const t=s.maxRandomnessOffset;n.push({op:"lineTo",data:[e[0]+D(t,s),e[1]+D(t,s)]})}}else 3===i?(n.push({op:"move",data:[t[1][0],t[1][1]]}),n.push({op:"bcurveTo",data:[t[1][0],t[1][1],t[2][0],t[2][1],t[2][0],t[2][1]]})):2===i&&(n=n.concat(G(t[0][0],t[0][1],t[1][0],t[1][1],s)));return n}function F(t,e,s,i,n,a,h,r){const o=D(.5,r)-Math.PI/2,l=[];l.push([D(a,r)+e+.9*i*Math.cos(o-t),D(a,r)+s+.9*n*Math.sin(o-t)]);for(let h=o;h<2*Math.PI+o-.01;h+=t)l.push([D(a,r)+e+i*Math.cos(h),D(a,r)+s+n*Math.sin(h)]);return l.push([D(a,r)+e+i*Math.cos(o+2*Math.PI+.5*h),D(a,r)+s+n*Math.sin(o+2*Math.PI+.5*h)]),l.push([D(a,r)+e+.98*i*Math.cos(o+h),D(a,r)+s+.98*n*Math.sin(o+h)]),l.push([D(a,r)+e+.9*i*Math.cos(o+.5*h),D(a,r)+s+.9*n*Math.sin(o+.5*h)]),B(l,null,r)}function X(t,e,s,i,n,a,h,r,o){const l=a+D(.1,o),c=[];c.push([D(r,o)+e+.9*i*Math.cos(l-t),D(r,o)+s+.9*n*Math.sin(l-t)]);for(let a=l;a<=h;a+=t)c.push([D(r,o)+e+i*Math.cos(a),D(r,o)+s+n*Math.sin(a)]);return c.push([e+i*Math.cos(h),s+n*Math.sin(h)]),c.push([e+i*Math.cos(h),s+n*Math.sin(h)]),B(c,null,o)}function V(t,e,s,i,n,a,h,r){const o=[],l=[r.maxRandomnessOffset||1,(r.maxRandomnessOffset||1)+.5];let c=[0,0];for(let p=0;p<2;p++)0===p?o.push({op:"move",data:[h.x,h.y]}):o.push({op:"move",data:[h.x+D(l[0],r),h.y+D(l[0],r)]}),c=[n+D(l[p],r),a+D(l[p],r)],o.push({op:"bcurveTo",data:[t+D(l[p],r),e+D(l[p],r),s+D(l[p],r),i+D(l[p],r),c[0],c[1]]});return h.setPosition(c[0],c[1]),o}function j(t,e,s,i){let n=[];switch(e.key){case"M":case"m":{const s="m"===e.key;if(e.data.length>=2){let a=+e.data[0],h=+e.data[1];s&&(a+=t.x,h+=t.y);const r=1*(i.maxRandomnessOffset||0);a+=D(r,i),h+=D(r,i),t.setPosition(a,h),n.push({op:"move",data:[a,h]})}break}case"L":case"l":{const s="l"===e.key;if(e.data.length>=2){let a=+e.data[0],h=+e.data[1];s&&(a+=t.x,h+=t.y),n=n.concat(G(t.x,t.y,a,h,i)),t.setPosition(a,h)}break}case"H":case"h":{const s="h"===e.key;if(e.data.length){let a=+e.data[0];s&&(a+=t.x),n=n.concat(G(t.x,t.y,a,t.y,i)),t.setPosition(a,t.y)}break}case"V":case"v":{const s="v"===e.key;if(e.data.length){let a=+e.data[0];s&&(a+=t.y),n=n.concat(G(t.x,t.y,t.x,a,i)),t.setPosition(t.x,a)}break}case"Z":case"z":t.first&&(n=n.concat(G(t.x,t.y,t.first[0],t.first[1],i)),t.setPosition(t.first[0],t.first[1]),t.first=null);break;case"C":case"c":{const s="c"===e.key;if(e.data.length>=6){let a=+e.data[0],h=+e.data[1],r=+e.data[2],o=+e.data[3],l=+e.data[4],c=+e.data[5];s&&(a+=t.x,r+=t.x,l+=t.x,h+=t.y,o+=t.y,c+=t.y);const p=V(a,h,r,o,l,c,t,i);n=n.concat(p),t.bezierReflectionPoint=[l+(l-r),c+(c-o)]}break}case"S":case"s":{const a="s"===e.key;if(e.data.length>=4){let h=+e.data[0],r=+e.data[1],o=+e.data[2],l=+e.data[3];a&&(h+=t.x,o+=t.x,r+=t.y,l+=t.y);let c=h,p=r;const u=s?s.key:"";let f=null;"c"!==u&&"C"!==u&&"s"!==u&&"S"!==u||(f=t.bezierReflectionPoint),f&&(c=f[0],p=f[1]);const d=V(c,p,h,r,o,l,t,i);n=n.concat(d),t.bezierReflectionPoint=[o+(o-h),l+(l-r)]}break}case"Q":case"q":{const s="q"===e.key;if(e.data.length>=4){let a=+e.data[0],h=+e.data[1],r=+e.data[2],o=+e.data[3];s&&(a+=t.x,r+=t.x,h+=t.y,o+=t.y);const l=1*(1+.2*i.roughness),c=1.5*(1+.22*i.roughness);n.push({op:"move",data:[t.x+D(l,i),t.y+D(l,i)]});let p=[r+D(l,i),o+D(l,i)];n.push({op:"qcurveTo",data:[a+D(l,i),h+D(l,i),p[0],p[1]]}),n.push({op:"move",data:[t.x+D(c,i),t.y+D(c,i)]}),p=[r+D(c,i),o+D(c,i)],n.push({op:"qcurveTo",data:[a+D(c,i),h+D(c,i),p[0],p[1]]}),t.setPosition(p[0],p[1]),t.quadReflectionPoint=[r+(r-a),o+(o-h)]}break}case"T":case"t":{const a="t"===e.key;if(e.data.length>=2){let h=+e.data[0],r=+e.data[1];a&&(h+=t.x,r+=t.y);let o=h,l=r;const c=s?s.key:"";let p=null;"q"!==c&&"Q"!==c&&"t"!==c&&"T"!==c||(p=t.quadReflectionPoint),p&&(o=p[0],l=p[1]);const u=1*(1+.2*i.roughness),f=1.5*(1+.22*i.roughness);n.push({op:"move",data:[t.x+D(u,i),t.y+D(u,i)]});let d=[h+D(u,i),r+D(u,i)];n.push({op:"qcurveTo",data:[o+D(u,i),l+D(u,i),d[0],d[1]]}),n.push({op:"move",data:[t.x+D(f,i),t.y+D(f,i)]}),d=[h+D(f,i),r+D(f,i)],n.push({op:"qcurveTo",data:[o+D(f,i),l+D(f,i),d[0],d[1]]}),t.setPosition(d[0],d[1]),t.quadReflectionPoint=[h+(h-o),r+(r-l)]}break}case"A":case"a":{const s="a"===e.key;if(e.data.length>=7){const a=+e.data[0],h=+e.data[1],r=+e.data[2],o=+e.data[3],l=+e.data[4];let p=+e.data[5],u=+e.data[6];if(s&&(p+=t.x,u+=t.y),p===t.x&&u===t.y)break;if(0===a||0===h)n=n.concat(G(t.x,t.y,p,u,i)),t.setPosition(p,u);else for(let e=0;e<1;e++){const e=new c([t.x,t.y],[p,u],[a,h],r,!!o,!!l);let s=e.getNextSegment();for(;s;){const a=V(s.cp1[0],s.cp1[1],s.cp2[0],s.cp2[1],s.to[0],s.to[1],t,i);n=n.concat(a),s=e.getNextSegment()}}}break}}return n}var Q=Object.freeze({line:T,linearPath:L,polygon:C,rectangle:function(t,e,s,i,n){return C([[t,e],[t+s,e],[t+s,e+i],[t,e+i]],n)},curve:function(t,e){const s=U(t,1*(1+.2*e.roughness),e),i=U(t,1.5*(1+.22*e.roughness),e);return{type:"path",ops:s.concat(i)}},ellipse:R,arc:function(t,e,s,i,n,a,h,r,o){const l=t,c=e;let p=Math.abs(s/2),u=Math.abs(i/2);p+=D(.01*p,o),u+=D(.01*u,o);let f=n,d=a;for(;f<0;)f+=2*Math.PI,d+=2*Math.PI;d-f>2*Math.PI&&(f=0,d=2*Math.PI);const g=2*Math.PI/o.curveStepCount,y=Math.min(g/2,(d-f)/2),M=X(y,l,c,p,u,f,d,1,o),w=X(y,l,c,p,u,f,d,1.5,o);let b=M.concat(w);return h&&(r?b=(b=b.concat(G(l,c,l+p*Math.cos(f),c+u*Math.sin(f),o))).concat(G(l,c,l+p*Math.cos(d),c+u*Math.sin(d),o)):(b.push({op:"lineTo",data:[l,c]}),b.push({op:"lineTo",data:[l+p*Math.cos(f),c+u*Math.sin(f)]}))),{type:"path",ops:b}},svgPath:function(t,e){t=(t||"").replace(/\n/g," ").replace(/(-\s)/g,"-").replace("/(ss)/g"," ");let s=new l(t);if(e.simplification){const t=new p(s.linearPoints,s.closed).fit(e.simplification);s=new l(t)}let i=[];const n=s.segments||[];for(let t=0;t<n.length;t++){const a=j(s,n[t],t>0?n[t-1]:null,e);a&&a.length&&(i=i.concat(a))}return{type:"path",ops:i}},solidFillPolygon:function(t,e){const s=[];if(t.length){const i=e.maxRandomnessOffset||0,n=t.length;if(n>2){s.push({op:"move",data:[t[0][0]+D(i,e),t[0][1]+D(i,e)]});for(let a=1;a<n;a++)s.push({op:"lineTo",data:[t[a][0]+D(i,e),t[a][1]+D(i,e)]})}}return{type:"fillPath",ops:s}},patternFillPolygon:z,patternFillEllipse:function(t,e,s,i,n){return E(n,O).fillEllipse(t,e,s,i,n)},patternFillArc:function(t,e,s,i,n,a,h){const r=E(h,O).fillArc(t,e,s,i,n,a,h);if(r)return r;const o=t,l=e;let c=Math.abs(s/2),p=Math.abs(i/2);c+=D(.01*c,h),p+=D(.01*p,h);let u=n,f=a;for(;u<0;)u+=2*Math.PI,f+=2*Math.PI;f-u>2*Math.PI&&(u=0,f=2*Math.PI);const d=(f-u)/h.curveStepCount,g=[];for(let t=u;t<=f;t+=d)g.push([o+c*Math.cos(t),l+p*Math.sin(t)]);return g.push([o+c*Math.cos(f),l+p*Math.sin(f)]),g.push([o,l]),z(g,h)},randOffset:N,randOffsetWithRange:W,doubleLineOps:I});class Z extends e{constructor(t,e){super(t,e),t&&t.workerURL?this.renderer=function(t){let e,h;if("function"==typeof t){const s=Function.prototype.toString;e=h=URL.createObjectURL(new Blob([`${s.call(n)}\n(${s.call(a)})(${s.call(t)})`]))}else"string"==typeof t&&(e=t,0===t.indexOf("blob:")&&(h=e));if(e){let t=new Worker(e);return h&&(t.oURL=h),s(new i(t))}throw"Workly only supports functions, classes, urls"}(t.workerURL):this.renderer=Q}async line(t,e,s,i,n){const a=this._options(n);return this._drawable("line",[await this.renderer.line(t,e,s,i,a)],a)}async rectangle(t,e,s,i,n){const a=this._options(n),h=[];if(a.fill){const n=[[t,e],[t+s,e],[t+s,e+i],[t,e+i]];"solid"===a.fillStyle?h.push(await this.renderer.solidFillPolygon(n,a)):h.push(await this.renderer.patternFillPolygon(n,a))}return h.push(await this.renderer.rectangle(t,e,s,i,a)),this._drawable("rectangle",h,a)}async ellipse(t,e,s,i,n){const a=this._options(n),h=[];if(a.fill)if("solid"===a.fillStyle){const n=await this.renderer.ellipse(t,e,s,i,a);n.type="fillPath",h.push(n)}else h.push(await this.renderer.patternFillEllipse(t,e,s,i,a));return h.push(await this.renderer.ellipse(t,e,s,i,a)),this._drawable("ellipse",h,a)}async circle(t,e,s,i){const n=await this.ellipse(t,e,s,s,i);return n.shape="circle",n}async linearPath(t,e){const s=this._options(e);return this._drawable("linearPath",[await this.renderer.linearPath(t,!1,s)],s)}async arc(t,e,s,i,n,a,h=!1,r){const o=this._options(r),l=[];if(h&&o.fill)if("solid"===o.fillStyle){const h=await this.renderer.arc(t,e,s,i,n,a,!0,!1,o);h.type="fillPath",l.push(h)}else l.push(await this.renderer.patternFillArc(t,e,s,i,n,a,o));return l.push(await this.renderer.arc(t,e,s,i,n,a,h,!0,o)),this._drawable("arc",l,o)}async curve(t,e){const s=this._options(e);return this._drawable("curve",[await this.renderer.curve(t,s)],s)}async polygon(t,e){const s=this._options(e),i=[];if(s.fill)if("solid"===s.fillStyle)i.push(await this.renderer.solidFillPolygon(t,s));else{const e=this.computePolygonSize(t),n=[[0,0],[e[0],0],[e[0],e[1]],[0,e[1]]],a=await this.renderer.patternFillPolygon(n,s);a.type="path2Dpattern",a.size=e,a.path=this.polygonPath(t),i.push(a)}return i.push(await this.renderer.linearPath(t,!0,s)),this._drawable("polygon",i,s)}async path(t,e){const s=this._options(e),i=[];if(!t)return this._drawable("path",i,s);if(s.fill)if("solid"===s.fillStyle){const e={type:"path2Dfill",path:t,ops:[]};i.push(e)}else{const e=this.computePathSize(t),n=[[0,0],[e[0],0],[e[0],e[1]],[0,e[1]]],a=await this.renderer.patternFillPolygon(n,s);a.type="path2Dpattern",a.size=e,a.path=t,i.push(a)}return i.push(await this.renderer.svgPath(t,s)),this._drawable("path",i,s)}}const H="undefined"!=typeof document;class Y{constructor(t){this.canvas=t,this.ctx=this.canvas.getContext("2d")}draw(t){const e=t.sets||[],s=t.options||this.getDefaultOptions(),i=this.ctx;for(const t of e)switch(t.type){case"path":i.save(),i.strokeStyle=s.stroke,i.lineWidth=s.strokeWidth,this._drawToContext(i,t),i.restore();break;case"fillPath":i.save(),i.fillStyle=s.fill||"",this._drawToContext(i,t),i.restore();break;case"fillSketch":this.fillSketch(i,t,s);break;case"path2Dfill":{this.ctx.save(),this.ctx.fillStyle=s.fill||"";const e=new Path2D(t.path);this.ctx.fill(e),this.ctx.restore();break}case"path2Dpattern":{const e=this.canvas.ownerDocument||H&&document;if(e){const i=t.size,n=e.createElement("canvas"),a=n.getContext("2d"),h=this.computeBBox(t.path);h&&(h.width||h.height)?(n.width=this.canvas.width,n.height=this.canvas.height,a.translate(h.x||0,h.y||0)):(n.width=i[0],n.height=i[1]),this.fillSketch(a,t,s),this.ctx.save(),this.ctx.fillStyle=this.ctx.createPattern(n,"repeat");const r=new Path2D(t.path);this.ctx.fill(r),this.ctx.restore()}else console.error("Cannot render path2Dpattern. No defs/document defined.");break}}}computeBBox(t){if(H)try{const e="http://www.w3.org/2000/svg",s=document.createElementNS(e,"svg");s.setAttribute("width","0"),s.setAttribute("height","0");const i=self.document.createElementNS(e,"path");i.setAttribute("d",t),s.appendChild(i),document.body.appendChild(s);const n=i.getBBox();return document.body.removeChild(s),n}catch(t){}return null}fillSketch(t,e,s){let i=s.fillWeight;i<0&&(i=s.strokeWidth/2),t.save(),t.strokeStyle=s.fill||"",t.lineWidth=i,this._drawToContext(t,e),t.restore()}_drawToContext(t,e){t.beginPath();for(const s of e.ops){const e=s.data;switch(s.op){case"move":t.moveTo(e[0],e[1]);break;case"bcurveTo":t.bezierCurveTo(e[0],e[1],e[2],e[3],e[4],e[5]);break;case"qcurveTo":t.quadraticCurveTo(e[0],e[1],e[2],e[3]);break;case"lineTo":t.lineTo(e[0],e[1])}}"fillPath"===e.type?t.fill():t.stroke()}}class J extends Y{constructor(t,e){super(t),this.gen=new Z(e||null,this.canvas)}get generator(){return this.gen}getDefaultOptions(){return this.gen.defaultOptions}async line(t,e,s,i,n){const a=await this.gen.line(t,e,s,i,n);return this.draw(a),a}async rectangle(t,e,s,i,n){const a=await this.gen.rectangle(t,e,s,i,n);return this.draw(a),a}async ellipse(t,e,s,i,n){const a=await this.gen.ellipse(t,e,s,i,n);return this.draw(a),a}async circle(t,e,s,i){const n=await this.gen.circle(t,e,s,i);return this.draw(n),n}async linearPath(t,e){const s=await this.gen.linearPath(t,e);return this.draw(s),s}async polygon(t,e){const s=await this.gen.polygon(t,e);return this.draw(s),s}async arc(t,e,s,i,n,a,h=!1,r){const o=await this.gen.arc(t,e,s,i,n,a,h,r);return this.draw(o),o}async curve(t,e){const s=await this.gen.curve(t,e);return this.draw(s),s}async path(t,e){const s=await this.gen.path(t,e);return this.draw(s),s}}const K="undefined"!=typeof document;class tt{constructor(t){this.svg=t}get defs(){const t=this.svg.ownerDocument||K&&document;if(t&&!this._defs){const e=t.createElementNS("http://www.w3.org/2000/svg","defs");this.svg.firstChild?this.svg.insertBefore(e,this.svg.firstChild):this.svg.appendChild(e),this._defs=e}return this._defs||null}draw(t){const e=t.sets||[],s=t.options||this.getDefaultOptions(),i=this.svg.ownerDocument||window.document,n=i.createElementNS("http://www.w3.org/2000/svg","g");for(const t of e){let e=null;switch(t.type){case"path":(e=i.createElementNS("http://www.w3.org/2000/svg","path")).setAttribute("d",this.opsToPath(t)),e.style.stroke=s.stroke,e.style.strokeWidth=s.strokeWidth+"",e.style.fill="none";break;case"fillPath":(e=i.createElementNS("http://www.w3.org/2000/svg","path")).setAttribute("d",this.opsToPath(t)),e.style.stroke="none",e.style.strokeWidth="0",e.style.fill=s.fill||null;break;case"fillSketch":e=this.fillSketch(i,t,s);break;case"path2Dfill":(e=i.createElementNS("http://www.w3.org/2000/svg","path")).setAttribute("d",t.path||""),e.style.stroke="none",e.style.strokeWidth="0",e.style.fill=s.fill||null;break;case"path2Dpattern":if(this.defs){const n=t.size,a=i.createElementNS("http://www.w3.org/2000/svg","pattern"),h=`rough-${Math.floor(Math.random()*(Number.MAX_SAFE_INTEGER||999999))}`;a.setAttribute("id",h),a.setAttribute("x","0"),a.setAttribute("y","0"),a.setAttribute("width","1"),a.setAttribute("height","1"),a.setAttribute("height","1"),a.setAttribute("viewBox",`0 0 ${Math.round(n[0])} ${Math.round(n[1])}`),a.setAttribute("patternUnits","objectBoundingBox");const r=this.fillSketch(i,t,s);a.appendChild(r),this.defs.appendChild(a),(e=i.createElementNS("http://www.w3.org/2000/svg","path")).setAttribute("d",t.path||""),e.style.stroke="none",e.style.strokeWidth="0",e.style.fill=`url(#${h})`}else console.error("Cannot render path2Dpattern. No defs/document defined.")}e&&n.appendChild(e)}return n}fillSketch(t,e,s){let i=s.fillWeight;i<0&&(i=s.strokeWidth/2);const n=t.createElementNS("http://www.w3.org/2000/svg","path");return n.setAttribute("d",this.opsToPath(e)),n.style.stroke=s.fill||null,n.style.strokeWidth=i+"",n.style.fill="none",n}}class et extends tt{constructor(t,e){super(t),this.gen=new Z(e||null,this.svg)}get generator(){return this.gen}getDefaultOptions(){return this.gen.defaultOptions}opsToPath(t){return this.gen.opsToPath(t)}async line(t,e,s,i,n){const a=await this.gen.line(t,e,s,i,n);return this.draw(a)}async rectangle(t,e,s,i,n){const a=await this.gen.rectangle(t,e,s,i,n);return this.draw(a)}async ellipse(t,e,s,i,n){const a=await this.gen.ellipse(t,e,s,i,n);return this.draw(a)}async circle(t,e,s,i){const n=await this.gen.circle(t,e,s,i);return this.draw(n)}async linearPath(t,e){const s=await this.gen.linearPath(t,e);return this.draw(s)}async polygon(t,e){const s=await this.gen.polygon(t,e);return this.draw(s)}async arc(t,e,s,i,n,a,h=!1,r){const o=await this.gen.arc(t,e,s,i,n,a,h,r);return this.draw(o)}async curve(t,e){const s=await this.gen.curve(t,e);return this.draw(s)}async path(t,e){const s=await this.gen.path(t,e);return this.draw(s)}}return{canvas:(t,e)=>new J(t,e),svg:(t,e)=>new et(t,e),generator:(t,e)=>new Z(t,e)}}();

},{}],"../../../AppData/Roaming/npm-cache/_npx/1388/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52243" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm-cache/_npx/1388/node_modules/parcel/src/builtins/hmr-runtime.js","../node_modules/roughjs/dist/rough-async.js"], null)
//# sourceMappingURL=/rough-async.a044a0ec.js.map