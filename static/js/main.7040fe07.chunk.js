(this["webpackJsonptrack-renderer"]=this["webpackJsonptrack-renderer"]||[]).push([[0],{13:function(t,e,n){},21:function(t,e,n){"use strict";n.r(e);var r=n(1),c=n(7),a=n.n(c),i=(n(13),n(2)),o=n.n(i),u=n(3),s=n(4),l=n(0);var p=function(t){var e=t.children,n=t.initialN,c=t.controllable,a=Object(r.useState)(n),i=Object(u.a)(a,2),o=i[0],s=i[1];function p(t){c&&s(o+t)}return Object(l.jsxs)(l.Fragment,{children:[Array(o).fill(0).map((function(){return Object(l.jsx)(l.Fragment,{children:e})})),c&&Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("button",{onClick:function(){return p(1)},children:"More"}),Object(l.jsx)("button",{onClick:function(){return p(-1)},children:"Less"})]})]})};var f=function(t){var e=t.signal,n=t.label,c=150,a=Object(r.useState)(0),i=Object(u.a)(a,2),o=i[0],s=i[1],p=Object(r.useRef)(null);Object(r.useEffect)((function(){var t=null===p||void 0===p?void 0:p.current;return null===t||void 0===t||t.addEventListener("wheel",h),function(){return null===t||void 0===t?void 0:t.removeEventListener("wheel",h)}}),[]);var f,h=function(t){return t.preventDefault()},j=function(t){var e=Math.max.apply(null,t);return t.map((function(t){return t/e}))}(e).reduce((function(t,e,n){var r=t.points,a=t.previous;return{points:r+"".concat(n,",").concat(c-c*(e+a)/2," "),previous:e}}),{points:"0,".concat(c," "),previous:0}).points+"".concat(e.length,",").concat(c);return Object(l.jsxs)("svg",{ref:p,onWheel:function(t){t.preventDefault(),s(o-t.deltaY)},preserveAspectRatio:"none",viewBox:"".concat((f=o,f>0?f:0)," 0 ").concat(e.length-function(t){return t>0?t:0}(2*o)," ").concat(c),style:{height:c,width:"100%"},children:[Object(l.jsx)("defs",{children:Object(l.jsxs)("linearGradient",{id:"Gradient1",x1:"0",x2:"0",y1:"0",y2:"1",children:[Object(l.jsx)("stop",{offset:"0%",stopColor:"black"}),Object(l.jsx)("stop",{offset:"100%",stopColor:"black",stopOpacity:"0.2"})]})}),Object(l.jsx)("text",{x:"10",y:"20",children:n}),Object(l.jsx)("polyline",{points:j,fill:"url(#Gradient1)",stroke:"black"})]})};function h(t){return j.apply(this,arguments)}function j(){return(j=Object(s.a)(o.a.mark((function t(e){var n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(null===(n=e.target.files)||void 0===n?void 0:n[0])){t.next=2;break}return t.abrupt("return",e.target.files[0]);case 2:throw new Error("File not found");case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var b=n(8);function d(t,e,n){return v.apply(this,arguments)}function v(){return(v=Object(s.a)(o.a.mark((function t(e,n,r){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(b.extractFeature)({audioBlob:e,audioFeatures:n,extractionParams:r});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function O(t){for(var e=Object.keys(t[0]),n=Object.fromEntries(e.map((function(t){return[t,[]]}))),r=0;r<t.length;r++){var c=t[r];c&&Object.entries(c).forEach((function(t){var e=Object(u.a)(t,2),r=e[0],c=e[1];"number"===typeof c?n[r].push(c):c.total?n[r].push(c.total):n[r].push(0)}))}return n}function x(t){return t[0]}var m={channels:[0],bufferSize:2048,hopSize:0};function w(t,e){return y.apply(this,arguments)}function y(){return(y=Object(s.a)(o.a.mark((function t(e,n){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",h(e).then((function(t){return d(t,n,m)})).then(x).then(O));case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var g=function(){var t=Object(r.useState)(null),e=Object(u.a)(t,2),n=e[0],c=e[1],a=["loudness"];function i(){return(i=Object(s.a)(o.a.mark((function t(e){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:w(e,a).then((function(t){c((function(){return t}))}));case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return Object(l.jsxs)("div",{className:"App",children:[Object(l.jsx)("input",{onChange:function(t){return i.apply(this,arguments)},type:"file",accept:"audio/*"}),n&&Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("h1",{children:"Signal here!"}),Object.entries(n).map((function(t){var e=Object(u.a)(t,2),n=e[0],r=e[1];return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("h4",{children:n}),Object(l.jsx)(f,{label:n,style:{maxWidth:"1vw"},signal:r},n)]})}))]}),Object(l.jsx)(p,{controllable:!0,initialN:1,children:Object(l.jsx)("h5",{children:"Worked!"})})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(Object(l.jsx)(g,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[21,1,2]]]);
//# sourceMappingURL=main.7040fe07.chunk.js.map