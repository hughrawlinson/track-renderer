(this["webpackJsonptrack-renderer"]=this["webpackJsonptrack-renderer"]||[]).push([[0],{11:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(4),c=n.n(o),u=(n(11),n(1)),l=n(2),i=n.n(l),s=n(5);var f=function(e){var t=e.children,n=e.initialN,o=e.controllable,c=Object(r.useState)(n),l=Object(u.a)(c,2),i=l[0],s=l[1];function f(e){o&&s(i+e)}return a.a.createElement(a.a.Fragment,null,Array(i).fill(0).map((function(){return a.a.createElement(a.a.Fragment,null,t)})),o&&a.a.createElement(a.a.Fragment,null,a.a.createElement("button",{onClick:function(){return f(1)}},"More"),a.a.createElement("button",{onClick:function(){return f(-1)}},"Less")))};var p=function(e){var t=e.signal,n=e.label,o=Object(r.useState)(0),c=Object(u.a)(o,2),l=c[0],i=c[1],s=Object(r.useRef)(null);Object(r.useEffect)((function(){var e=null===s||void 0===s?void 0:s.current;return null===e||void 0===e||e.addEventListener("wheel",p),function(){return null===e||void 0===e?void 0:e.removeEventListener("wheel",p)}}),[]);var f,p=function(e){return e.preventDefault()},m=function(e){var t=Math.max.apply(null,e);return e.map((function(e){return e/t}))}(t).reduce((function(e,t,n){var r=e.points,a=e.previous;return{points:r+"".concat(n,",").concat(150-150*(t+a)/2," "),previous:t}}),{points:"0,".concat(150," "),previous:0}).points+"".concat(t.length,",").concat(150);return a.a.createElement("svg",{ref:s,onWheel:function(e){e.preventDefault(),i(l-e.deltaY)},preserveAspectRatio:"none",viewBox:"".concat((f=l,f>0?f:0)," 0 ").concat(t.length-function(e){return e>0?e:0}(2*l)," ").concat(150),style:{height:150,width:"100%"}},a.a.createElement("defs",null,a.a.createElement("linearGradient",{id:"Gradient1",x1:"0",x2:"0",y1:"0",y2:"1"},a.a.createElement("stop",{offset:"0%",stopColor:"black"}),a.a.createElement("stop",{offset:"100%",stopColor:"black",stopOpacity:"0.2"}))),a.a.createElement("text",{x:"10",y:"20"},n),a.a.createElement("polyline",{points:m,fill:"url(#Gradient1)",stroke:"black"}))};function m(e){var t;return i.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:if(!(null===(t=e.target.files)||void 0===t?void 0:t[0])){n.next=2;break}return n.abrupt("return",e.target.files[0]);case 2:throw new Error("File not found");case 3:case"end":return n.stop()}}))}function v(e,t,n){return i.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:if(!e){r.next=4;break}return r.next=3,i.a.awrap(Object(s.extractFeature)({audioBlob:e,audioFeatures:t,extractionParams:n}));case 3:return r.abrupt("return",r.sent);case 4:throw new Error("File not found");case 5:case"end":return r.stop()}}))}function h(e){return e[0]}function d(e){for(var t=Object.keys(e[0]),n=Object.fromEntries(t.map((function(e){return[e,[]]}))),r=0;r<e.length;r++){var a=e[r];a&&Object.entries(a).forEach((function(e){var t=Object(u.a)(e,2),r=t[0],a=t[1];"number"===typeof a?n[r].push(a):a.total?n[r].push(a.total):n[r].push(0)}))}return n}var b={channels:[0],bufferSize:2048,hopSize:0};var E=function(){var e=Object(r.useState)(null),t=Object(u.a)(e,2),n=t[0],o=t[1],c=["loudness"];return a.a.createElement("div",{className:"App"},a.a.createElement("input",{onChange:function(e){return i.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",m(e).then((function(e){return v(e,c,b)})).then(h).then(d).then((function(e){o((function(){return e}))})));case 1:case"end":return t.stop()}}))},type:"file",accept:"audio/*"}),n&&a.a.createElement(a.a.Fragment,null,a.a.createElement("h1",null,"Signal here!"),Object.entries(n).map((function(e){var t=Object(u.a)(e,2),n=t[0],r=t[1];return a.a.createElement(a.a.Fragment,null,a.a.createElement("h4",null,n),a.a.createElement(p,{key:n,label:n,style:{maxWidth:"1vw"},signal:r}))}))),a.a.createElement(f,{controllable:!0,initialN:1},a.a.createElement("h5",null,"Worked!")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},6:function(e,t,n){e.exports=n(17)}},[[6,1,2]]]);
//# sourceMappingURL=main.c3aa0cb2.chunk.js.map