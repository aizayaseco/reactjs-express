(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[7],{80:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return o}));var l=t(0),n=t.n(l),c=t(33),s=t.n(c),i=t(31),r=t(10);function o(){var e,a,t;const{page:c}=Object(i.d)(),[o,d]=Object(l.useState)([]),[m,u]=Object(l.useState)(parseInt(c)),[p,v]=Object(l.useState)({}),[g,E]=Object(l.useState)(!1),[b,f]=Object(l.useState)(null);function h(){return 6*m>8e3?(r.a.push("/feed/1333"),u(1333)):m<1?(r.a.push("/feed/1"),u(1)):void s.a.get("/api/v1/feed/".concat(m)).then(e=>e.data).then(e=>{d(e),v(function(e,a,t){a=a||1,t=t||10;let l,n,c=Math.floor(e/t);c<=5?(l=1,n=c):a<=3?(l=1,n=5):a+2>=c?(l=c-4,n=c):(l=a-2,n=a+2);let s=[...Array(n+1-l).keys()].map(e=>l+e);return{totalItems:e,startPage:l,endPage:n,pages:s}}(e.total_results,e.page,e.per_page)),E(!1)}).catch(e=>{f(e),E(!1)})}return Object(l.useEffect)(()=>{E(!0),h()},[]),Object(l.useEffect)(()=>{E(!0),h()},[m]),n.a.createElement("div",null,n.a.createElement("div",null,n.a.createElement("div",{className:"card-columns"},g||null!==b?n.a.createElement("div",{className:"container-fluid px-0"},n.a.createElement("div",{className:"col-12 justify-content-center"},n.a.createElement("div",{className:"spinner-border",role:"status"},n.a.createElement("span",{className:"sr-only"},"Loading...")))):null===o||void 0===o||null===(e=o.photos)||void 0===e?void 0:e.map(e=>n.a.createElement("div",{key:e.id,className:"card"},n.a.createElement("img",{className:"card-img-top",src:e.src.original,alt:e.alt}),n.a.createElement("div",{className:"card-body"},n.a.createElement("h5",{className:"card-title"},"Shot by ",e.photographer),n.a.createElement("p",{className:"card-text"},e.alt))))),(null===p||void 0===p||null===(a=p.pages)||void 0===a?void 0:a.length)<=1?null:n.a.createElement("nav",{"aria-label":"Page navigation example"},n.a.createElement("ul",{className:"pagination justify-content-center"},n.a.createElement("li",{className:"page-item ".concat(1===m?"disabled":"")},n.a.createElement("button",{className:"page-link",onClick:()=>{r.a.push("/feed/"+(m-1)),u(m-1)},tabIndex:"-1"},"Previous")),null===p||void 0===p||null===(t=p.pages)||void 0===t?void 0:t.map((e,a)=>n.a.createElement("li",{key:a,className:"page-item ".concat(m===e?"active":"")},n.a.createElement("button",{onClick:()=>{r.a.push("/feed/"+e),u(e)},className:"page-link"},e))),n.a.createElement("li",{className:"page-item ".concat(m===(null===p||void 0===p?void 0:p.endPage)?"disabled":"")},n.a.createElement("button",{className:"page-link",onClick:()=>{r.a.push("/feed/"+(m+1)),u(m+1)}},"Next"))))))}}}]);
//# sourceMappingURL=7.94256839.chunk.js.map