$gwx_XC_2=function(_,_v,_n,_p,_s,_wp,_wl,$gwn,$gwl,$gwh,wh,$gstack,$gwrt,gra,grb,TestTest,wfor,_ca,_da,_r,_rz,_o,_oz,_1,_1z,_2,_2z,_m,_mz,nv_getDate,nv_getRegExp,nv_console,nv_parseInt,nv_parseFloat,nv_isNaN,nv_isFinite,nv_decodeURI,nv_decodeURIComponent,nv_encodeURI,nv_encodeURIComponent,$gdc,nv_JSON,_af,_gv,_ai,_grp,_gd,_gapi,$ixc,_ic,_w,_ev,_tsd){return function(path,global){
if(typeof global==='undefined'){if (typeof __GWX_GLOBAL__==='undefined')global={};else global=__GWX_GLOBAL__;}if(typeof __WXML_GLOBAL__ === 'undefined') {__WXML_GLOBAL__={};
}__WXML_GLOBAL__.modules = __WXML_GLOBAL__.modules || {};
var e_={}
if(typeof(global.entrys)==='undefined')global.entrys={};e_=global.entrys;
var d_={}
if(typeof(global.defines)==='undefined')global.defines={};d_=global.defines;
var f_={}
if(typeof(global.modules)==='undefined')global.modules={};f_=global.modules || {};
var p_={}
__WXML_GLOBAL__.ops_cached = __WXML_GLOBAL__.ops_cached || {}
__WXML_GLOBAL__.ops_set = __WXML_GLOBAL__.ops_set || {};
__WXML_GLOBAL__.ops_init = __WXML_GLOBAL__.ops_init || {};
var z=__WXML_GLOBAL__.ops_set.$gwx_XC_2 || [];
function gz$gwx_XC_2_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx_XC_2_1)return __WXML_GLOBAL__.ops_cached.$gwx_XC_2_1
__WXML_GLOBAL__.ops_cached.$gwx_XC_2_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_XC_2_1);return __WXML_GLOBAL__.ops_cached.$gwx_XC_2_1
}
__WXML_GLOBAL__.ops_set.$gwx_XC_2=z;
__WXML_GLOBAL__.ops_init.$gwx_XC_2=true;
var x=['./components/index/levelup-modal/levelup-modal.wxml'];d_[x[0]]={}
var m0=function(e,s,r,gg){
var z=gz$gwx_XC_2_1()
return r
}
e_[x[0]]=e_[x[0]]||{f:m0,j:[],i:[],ti:[],ic:[]}
if(path&&e_[path]){
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
;g="$gwx_XC_2";var main=e_[path].f
if (typeof global==="undefined")global={};global.f=$gdc(f_[path],"",1);
try{
main(env,{},root,global);
_tsd(root)
}catch(err){
console.log(err)
}
;g="";
return root;
}
}
}
}(__g.a,__g.b,__g.c,__g.d,__g.e,__g.f,__g.g,__g.h,__g.i,__g.j,__g.k,__g.l,__g.m,__g.n,__g.o,__g.p,__g.q,__g.r,__g.s,__g.t,__g.u,__g.v,__g.w,__g.x,__g.y,__g.z,__g.A,__g.B,__g.C,__g.D,__g.E,__g.F,__g.G,__g.H,__g.I,__g.J,__g.K,__g.L,__g.M,__g.N,__g.O,__g.P,__g.Q,__g.R,__g.S,__g.T,__g.U,__g.V,__g.W,__g.X,__g.Y,__g.Z,__g.aa);if(__vd_version_info__.delayedGwx||false)$gwx_XC_2();	if (__vd_version_info__.delayedGwx) __wxAppCode__['components/index/levelup-modal/levelup-modal.wxml'] = [$gwx_XC_2, './components/index/levelup-modal/levelup-modal.wxml'];else __wxAppCode__['components/index/levelup-modal/levelup-modal.wxml'] = $gwx_XC_2( './components/index/levelup-modal/levelup-modal.wxml' );
	;__wxRoute = "components/index/levelup-modal/levelup-modal";__wxRouteBegin = true;__wxAppCurrentFile__="components/index/levelup-modal/levelup-modal.js";define("components/index/levelup-modal/levelup-modal.js",function(require,module,exports,window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/index/levelup-modal/levelup-modal"],{"0913":function(e,t,a){"use strict";a.r(t);var l=a("a3d5"),n=a.n(l);for(var c in l)"default"!==c&&function(e){a.d(t,e,(function(){return l[e]}))}(c);t["default"]=n.a},"0b2f":function(e,t,a){"use strict";var l;a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return c})),a.d(t,"a",(function(){return l}));var n=function(){var e=this,t=e.$createElement;e._self._c},c=[]},"12ae":function(e,t,a){},"7cd8":function(e,t,a){"use strict";var l=a("12ae"),n=a.n(l);n.a},"9db1":function(e,t,a){"use strict";a.r(t);var l=a("0b2f"),n=a("0913");for(var c in n)"default"!==c&&function(e){a.d(t,e,(function(){return n[e]}))}(c);a("7cd8");var o,u=a("f0c5"),r=Object(u["a"])(n["default"],l["b"],l["c"],!1,null,"0a98a0f4",null,!1,l["a"],o);t["default"]=r.exports},a3d5:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l=n(a("b0c3"));function n(e){return e&&e.__esModule?e:{default:e}}var c={name:"levelup",props:{levelupMsg:Number},data:function(){return{levelup:["".concat(l.default.pro,"/static/level/medal-freshman1.png"),"".concat(l.default.pro,"/static/level/medal-freshman2.png"),"".concat(l.default.pro,"/static/level/medal-freshman3.png"),"".concat(l.default.pro,"/static/level/medal-wiseman1.png"),"".concat(l.default.pro,"/static/level/medal-wiseman2.png"),"".concat(l.default.pro,"/static/level/medal-wiseman3.png"),"".concat(l.default.pro,"/static/level/medal-king1.png"),"".concat(l.default.pro,"/static/level/medal-king2.png"),"".concat(l.default.pro,"/static/level/medal-king3.png"),"".concat(l.default.pro,"/static/level/levelUp-bg.png"),"".concat(l.default.pro,"/static/level/medal-king1-true.svg")],leveltext:["萌新1","萌新2","萌新3","达人1","达人2","达人3","王者1","王者2","王者3"],levelok:"".concat(l.default.pro,"/static/level/level-ok.svg")}},methods:{handleClose:function(){console.log("关闭"),this.$emit("close")}}};t.default=c}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/index/levelup-modal/levelup-modal-create-component',
    {
        'components/index/levelup-modal/levelup-modal-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("9db1"))
        })
    },
    [['components/index/levelup-modal/levelup-modal-create-component']]
]);

},{isPage:false,isComponent:true,currentFile:'components/index/levelup-modal/levelup-modal.js'});require("components/index/levelup-modal/levelup-modal.js");