!function o(a,s,u){function l(t,e){if(!s[t]){if(!a[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(f)return f(t,!0);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}var i=s[t]={exports:{}};a[t][0].call(i.exports,function(e){return l(a[t][1][e]||e)},i,i.exports,o,a,s,u)}return s[t].exports}for(var f="function"==typeof require&&require,e=0;e<u.length;e++)l(u[e]);return l}({1:[function(e,t,n){var r={animationIterationCount:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridRow:!0,gridColumn:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,stopOpacity:!0,strokeDashoffset:!0,strokeOpacity:!0,strokeWidth:!0};t.exports=function(e,t){return"number"!=typeof t||r[e]?t:t+"px"}},{}],2:[function(e,t,n){"use strict";var r=/[A-Z]/g,i=/^ms-/,o={};function a(e){return"-"+e.toLowerCase()}t.exports=function(e){if(o.hasOwnProperty(e))return o[e];var t=e.replace(r,a);return o[e]=i.test(t)?"-"+t:t}},{}],3:[function(e,t,n){"use strict";var o=this&&this.__assign||function(){return(o=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},y=this&&this.__awaiter||function(e,a,s,u){return new(s=s||Promise)(function(t,n){function r(e){try{o(u.next(e))}catch(e){n(e)}}function i(e){try{o(u.throw(e))}catch(e){n(e)}}function o(e){e.done?t(e.value):function(t){return t instanceof s?t:new s(function(e){e(t)})}(e.value).then(r,i)}o((u=u.apply(e,a||[])).next())})},m=this&&this.__generator||function(n,r){var i,o,a,e,s={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return e={next:t(0),throw:t(1),return:t(2)},"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(t){return function(e){return function(t){if(i)throw new TypeError("Generator is already executing.");for(;s;)try{if(i=1,o&&(a=2&t[0]?o.return:t[0]?o.throw||((a=o.return)&&a.call(o),0):o.next)&&!(a=a.call(o,t[1])).done)return a;switch(o=0,a&&(t=[2&t[0],a.value]),t[0]){case 0:case 1:a=t;break;case 4:return s.label++,{value:t[1],done:!1};case 5:s.label++,o=t[1],t=[0];continue;case 7:t=s.ops.pop(),s.trys.pop();continue;default:if(!(a=0<(a=s.trys).length&&a[a.length-1])&&(6===t[0]||2===t[0])){s=0;continue}if(3===t[0]&&(!a||t[1]>a[0]&&t[1]<a[3])){s.label=t[1];break}if(6===t[0]&&s.label<a[1]){s.label=a[1],a=t;break}if(a&&s.label<a[2]){s.label=a[2],s.ops.push(t);break}a[2]&&s.ops.pop(),s.trys.pop();continue}t=r.call(n,s)}catch(e){t=[6,e],o=0}finally{i=a=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}([t,e])}}},r=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,i,o=n.call(e),a=[];try{for(;(void 0===t||0<t--)&&!(r=o.next()).done;)a.push(r.value)}catch(e){i={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return a},i=this&&this.__spread||function(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(r(arguments[t]));return e};function a(e){for(var t in e)n.hasOwnProperty(t)||(n[t]=e[t])}var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});function u(){return new Promise(function(e){requestAnimationFrame(function(){e()})})}var l,f=s(e("add-px-to-style")),c=s(e("hyphenate-style-name"));if(n.isBrowser="undefined"!=typeof window,n.isBrowser){var h=document.createElement("style");h.setAttribute("id","keyframesjs-stylesheet"),document.head.appendChild(h),l=h.sheet}function p(){}function d(e){if(!Object.keys(e).length)return"";var t="";for(var n in e)t+=c.default(n)+":"+f.default(n,e[n])+";";return t}var v=(b.isSupported=function(){return void 0!==document.body.style.animationName},b.prototype.freeze=function(){var t=this,e=b.ruleCache[this.mountedElement.style.animationName];if(e){var n=o({},getComputedStyle(this.mountedElement));e.forEach(function(e){t.mountedElement.style[e]=n[e]}),this.frozenStyles=i(new Set(this.frozenStyles.concat(e)))}},b.prototype.unfreeze=function(){var t=this;this.frozenStyles.length&&(this.frozenStyles.forEach(function(e){t.mountedElement.style[e]=""}),this.frozenStyles=[])},b.prototype.reset=function(){return y(this,void 0,void 0,function(){return m(this,function(e){switch(e.label){case 0:return this.removeEvents(),this.mountedElement.style.animationPlayState="running",this.mountedElement.style.animation="none",[4,u()];case 1:return e.sent(),[2,this]}})})},b.prototype.pause=function(){return this.mountedElement.style.animationPlayState="paused",this},b.prototype.resume=function(){return this.mountedElement.style.animationPlayState="running",this},b.prototype.play=function(t,n){var r=this;if(this.mountedElement.style.animationName===this.getAnimationName(t))return this.freeze(),requestAnimationFrame(function(){return y(r,void 0,void 0,function(){return m(this,function(e){switch(e.label){case 0:return[4,this.reset()];case 1:return e.sent(),this.play(t,n),this.unfreeze(),[2]}})})}),this;function e(e,t){var n=e+"Listener";r.mountedElement.removeEventListener(e,r[n]),r[n]=t,r.mountedElement.addEventListener(e,r[n])}var i=n||{},o=i.onBeforeStart,a=void 0===o?null:o,s=i.onStart,u=void 0===s?null:s,l=i.onIteration,f=void 0===l?null:l,c=i.onEnd,h=void 0===c?null:c,p=b.playCSS(t);return a&&a(),this.mountedElement.style.animationPlayState="running",this.mountedElement.style.animation=p,f&&e("animationiteration",f),h&&e("animationend",h),u&&e("animationstart",u),this},b.prototype.playNext=function(){var t=this,e=this.queueStore[this.queueStore.length-1];e?this.play(e,{onEnd:function(e){t.queueStore.pop(),t.callbacks.onEnd&&t.callbacks.onEnd(e),t.playNext()},onIteration:this.callbacks.onIteration}):this.callbacks.onQueueComplete&&this.callbacks.onQueueComplete()},b.prototype.removeEvents=function(){return this.mountedElement.removeEventListener("animationiteration",this.animationiterationListener),this.mountedElement.removeEventListener("animationend",this.animationendListener),this.mountedElement.removeEventListener("animationstart",this.animationstartListener),this},b.prototype.updateCallbacks=function(e){e&&(this.callbacks=o(o({},this.callbacks),e))},b.prototype.queue=function(e,t){var n=this.queueStore.length;this.updateCallbacks(t);var r=function(e){return Array.isArray(e)?i(e):"object"==typeof e?o({},e):e.toString()}(e);return Array.isArray(r)?this.queueStore=r.reverse().concat(this.queueStore):this.queueStore.unshift(r),n||(this.callbacks.onBeforeStart&&this.callbacks.onBeforeStart(),this.playNext()),this},b.prototype.chain=function(e,t){return this.queue(e,t),this},b.prototype.resetQueue=function(){return y(this,void 0,void 0,function(){return m(this,function(e){switch(e.label){case 0:return[4,u()];case 1:return e.sent(),this.removeEvents(),this.queueStore=[],[4,this.reset()];case 2:return e.sent(),[2,this]}})})},b.prototype.loop=function(r,i){return void 0===i&&(i={}),y(this,void 0,void 0,function(){var t,n=this;return m(this,function(e){switch(e.label){case 0:return[4,this.resetQueue()];case 1:return e.sent(),(t=function(){n.queue(r,o(o({},i),{onQueueComplete:function(){return t()}}))})(),[2,this]}})})},b.prototype.getAnimationName=function(e){var t=this;return Array.isArray(e)?e.map(function(e){return t.getAnimationName(e)}).join(", "):"string"==typeof e?e.split(" ")[0]:e.name},b.playCSS=function(e){function t(e){var t=o({duration:"0s",timingFunction:"ease",delay:"0s",iterationCount:1,direction:"normal",fillMode:"forwards"},e);return[t.name,t.duration,t.timingFunction,t.delay,t.iterationCount,t.direction,t.fillMode].join(" ")}if(Array.isArray(e)){for(var n=[],r=0;r<e.length;r+=1){var i=e[r];n.push("string"==typeof i?i:t(i))}return n.join(", ")}return"string"==typeof e?e:t(e)},b.generateCSS=function(e){var t="@keyframes "+e.name+" {";for(var n in e)"name"!==n&&"media"!==n&&"complete"!==n&&(t+=n+" {"+d(e[n])+"}");return t+="}",e.media&&(t="@media "+e.media+"{"+t+"}"),t},b.generate=function(e){this.addToRuleCache(e);var t=this.generateCSS(e),n=b.rules.indexOf(e.name);-1<n&&(b.sheet.deleteRule(n),b.rules.splice(n,1));var r=(b.sheet.cssRules||b.sheet.rules).length;b.sheet.insertRule(t,r),b.rules[r]=e.name},b.define=function(e){if(Array.isArray(e))for(var t=0;t<e.length;t+=1)this.generate(e[t]);else this.generate(e)},b.defineCSS=function(e){if(Array.isArray(e)){for(var t="",n=0;n<e.length;n+=1)t+=this.generateCSS(e[n]);return t}return this.generateCSS(e)},b.addToRuleCache=function(e){if(!this.ruleCache[e.name]){var t=Object.values(e).filter(function(e){return"object"==typeof e}).map(function(e){return Object.keys(e)}).flat();this.ruleCache[e.name]=i(new Set(t))}},b.sheet=l,b.rules=[],b.ruleCache={},b.clearRules=function(){for(b.rules=[];b.sheet.cssRules.length;)b.sheet.deleteRule(0)},b);function b(e){this.queueStore=[],this.callbacks={onStart:p,onBeforeStart:p,onIteration:p,onEnd:p,onQueueComplete:p},this.animationstartListener=p,this.animationendListener=p,this.animationiterationListener=p,this.mountedElement=e,this.frozenStyles=[]}n.isBrowser&&(window.Keyframes=v),a(e("./pathfinder")),a(e("./spritesheet")),n.default=v},{"./pathfinder":4,"./spritesheet":5,"add-px-to-style":1,"hyphenate-style-name":2}],4:[function(e,t,n){"use strict";var g=this&&this.__assign||function(){return(g=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)};Object.defineProperty(n,"__esModule",{value:!0});var r=e("./keyframes");function w(e,t){return void 0===e&&(e=0),void 0===t&&(t=0),{x:e,y:t}}function x(e){return e*e*e}function O(e){return 3*e*e*(1-e)}function E(e){return 3*e*(1-e)*(1-e)}function k(e){return(1-e)*(1-e)*(1-e)}if(n.bezierPath=function(e,t,n,r,i){var o=g({bezierSteps:100,transform:""},e);null==i&&(i=t);for(var a,s,u,l,f,c,h=w(t[0],t[1]),p=w(n[0],n[1]),y=w(r[0],r[1]),m=w(i[0],i[1]),d={},v=1/o.bezierSteps,b=0;b<=1.01;b+=v){var S=(a=b,s=h,u=m,l=y,f=p,c=void 0,(c=w()).x=s.x*x(a)+u.x*O(a)+l.x*E(a)+f.x*k(a),c.y=s.y*x(a)+u.y*O(a)+l.y*E(a)+f.y*k(a),c);d[100-Math.round(100*b)+"%"]={transform:"translate("+S.x+"px,"+S.y+"px) "+o.transform}}return Object.assign({},e,d)},n.circlePath=function(e,t,n){for(var r,i,o,a=g({circleSteps:100,transform:""},e),s={},u=w(t[0],t[1]),l=1.5*Math.PI,f=Math.PI/180,c=100/a.circleSteps,h=360/a.circleSteps,p=0;p<=a.circleSteps;p+=1){var y=(r=l+h*p*f,i=n,{x:(o=u).x+i*Math.cos(r),y:o.y+i*Math.sin(r)});s[Math.round(c*p)+"%"]={transform:"translate("+y.x+"px,"+y.y+"px) "+a.transform}}for(var m in e){var d=e[m];for(var v in s){var b=s[v];if(m===v&&b.transform&&d.transform){s[v].transform=b.transform+" "+d.transform;break}}}return Object.assign({},e,s)},r.isBrowser){var i=window;i.Keyframes&&(i.Keyframes.bezierPath=n.bezierPath,i.Keyframes.circlePath=n.circlePath)}},{"./keyframes":3}],5:[function(e,t,n){"use strict";var d=this&&this.__assign||function(){return(d=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},v=this&&this.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]])}return n};Object.defineProperty(n,"__esModule",{value:!0});var r=e("./keyframes");if(n.spriteSheet=function(e){for(var t=e.rows,n=void 0===t?1:t,r=e.cols,i=void 0===r?1:r,o=e.width,a=void 0===o?0:o,s=e.height,u=void 0===s?0:s,l=v(e,["rows","cols","width","height"]),f=d(d(d({},{offsetX:0,offsetY:0,count:n*i,spriteWidth:a/i,spriteHeight:u/n,loop:!0}),{rows:n,cols:i,width:a,height:u}),l),c=100/f.count,h={},p=f.offsetX,y=f.offsetY,m=0;m<f.count;m+=1)h[Math.round(c*m)+"%"]={backgroundPosition:"-"+p+"px -"+y+"px"},p>=f.width-f.spriteWidth?y+=f.spriteHeight:p+=f.spriteWidth;return Object.assign({},{name:f.name},h)},n.playSpriteSheet=function(e,t,n){return void 0===n&&(n="infinite"),n&&n<0&&(n="infinite"),e+" "+t+" steps(1) "+n},r.isBrowser){var i=window;i.Keyframes&&(i.Keyframes.spriteSheet=n.spriteSheet,i.Keyframes.playSpriteSheet=n.playSpriteSheet)}},{"./keyframes":3}]},{},[3]);
