require("./runtime"),(wx.webpackJsonp=wx.webpackJsonp||[]).push([[2],[function(u,f){u.exports=function(u){return u}},function(u,f){var n=RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]");u.exports=function(u){return n.test(u)}},,function(u,f,n){var t=n(5),e=n(13)((function(u,f,n){return f=f.toLowerCase(),u+(n?t(f):f)}));u.exports=e},function(u,f,n){"use strict";n.r(f);var t=n(3),e=n.n(t);App({onLaunch:function(){console.log(e()("OnLaunch"));var u=wx.getStorageSync("logs")||[];u.unshift(Date.now()),wx.setStorageSync("logs",u),wx.login({success:function(u){}})},globalData:{userInfo:null}})},function(u,f,n){var t=n(0),e=n(6);u.exports=function(u){return e(t(u).toLowerCase())}},function(u,f,n){var t=n(7)("toUpperCase");u.exports=t},function(u,f,n){var t=n(8),e=n(1),r=n(10),o=n(0);u.exports=function(u){return function(f){f=o(f);var n=e(f)?r(f):void 0,c=n?n[0]:f.charAt(0),x=n?t(n,1).join(""):f.slice(1);return c[u]()+x}}},function(u,f,n){var t=n(9);u.exports=function(u,f,n){var e=u.length;return n=void 0===n?e:n,!f&&n>=e?u:t(u,f,n)}},function(u,f){u.exports=function(u,f,n){var t=-1,e=u.length;f<0&&(f=-f>e?0:e+f),(n=n>e?e:n)<0&&(n+=e),e=f>n?0:n-f>>>0,f>>>=0;for(var r=Array(e);++t<e;)r[t]=u[t+f];return r}},function(u,f,n){var t=n(11),e=n(1),r=n(12);u.exports=function(u){return e(u)?r(u):t(u)}},function(u,f){u.exports=function(u){return u.split("")}},function(u,f){var n="[\\ud800-\\udfff]",t="[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]",e="\\ud83c[\\udffb-\\udfff]",r="[^\\ud800-\\udfff]",o="(?:\\ud83c[\\udde6-\\uddff]){2}",c="[\\ud800-\\udbff][\\udc00-\\udfff]",x="(?:"+t+"|"+e+")"+"?",d="[\\ufe0e\\ufe0f]?"+x+("(?:\\u200d(?:"+[r,o,c].join("|")+")[\\ufe0e\\ufe0f]?"+x+")*"),i="(?:"+[r+t+"?",t,o,c,n].join("|")+")",a=RegExp(e+"(?="+e+")|"+i+d,"g");u.exports=function(u){return u.match(a)||[]}},function(u,f,n){var t=n(14),e=n(15),r=n(17),o=RegExp("['’]","g");u.exports=function(u){return function(f){return t(r(e(f).replace(o,"")),u,"")}}},function(u,f){u.exports=function(u,f,n,t){var e=-1,r=null==u?0:u.length;for(t&&r&&(n=u[++e]);++e<r;)n=f(n,u[e],e,u);return n}},function(u,f,n){var t=n(16);u.exports=function(u){return null==u?"":t(u)}},function(u,f){u.exports=function(u){return u}},function(u,f,n){var t=n(18),e=n(19),r=n(0),o=n(20);u.exports=function(u,f,n){return u=r(u),void 0===(f=n?void 0:f)?e(u)?o(u):t(u):u.match(f)||[]}},function(u,f){var n=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;u.exports=function(u){return u.match(n)||[]}},function(u,f){var n=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;u.exports=function(u){return n.test(u)}},function(u,f){var n="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",t="["+n+"]",e="\\d+",r="[\\u2700-\\u27bf]",o="[a-z\\xdf-\\xf6\\xf8-\\xff]",c="[^\\ud800-\\udfff"+n+e+"\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde]",x="(?:\\ud83c[\\udde6-\\uddff]){2}",d="[\\ud800-\\udbff][\\udc00-\\udfff]",i="[A-Z\\xc0-\\xd6\\xd8-\\xde]",a="(?:"+o+"|"+c+")",s="(?:"+i+"|"+c+")",p="(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?",v="[\\ufe0e\\ufe0f]?"+p+("(?:\\u200d(?:"+["[^\\ud800-\\udfff]",x,d].join("|")+")[\\ufe0e\\ufe0f]?"+p+")*"),l="(?:"+[r,x,d].join("|")+")"+v,g=RegExp([i+"?"+o+"+(?:['’](?:d|ll|m|re|s|t|ve))?(?="+[t,i,"$"].join("|")+")",s+"+(?:['’](?:D|LL|M|RE|S|T|VE))?(?="+[t,i+a,"$"].join("|")+")",i+"?"+a+"+(?:['’](?:d|ll|m|re|s|t|ve))?",i+"+(?:['’](?:D|LL|M|RE|S|T|VE))?","\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])","\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",e,l].join("|"),"g");u.exports=function(u){return u.match(g)||[]}}],[[4,0]]]);
//# sourceMappingURL=app.js.map