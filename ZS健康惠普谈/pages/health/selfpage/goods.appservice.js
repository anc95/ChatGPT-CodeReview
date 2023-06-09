$gwx_XC_12=function(_,_v,_n,_p,_s,_wp,_wl,$gwn,$gwl,$gwh,wh,$gstack,$gwrt,gra,grb,TestTest,wfor,_ca,_da,_r,_rz,_o,_oz,_1,_1z,_2,_2z,_m,_mz,nv_getDate,nv_getRegExp,nv_console,nv_parseInt,nv_parseFloat,nv_isNaN,nv_isFinite,nv_decodeURI,nv_decodeURIComponent,nv_encodeURI,nv_encodeURIComponent,$gdc,nv_JSON,_af,_gv,_ai,_grp,_gd,_gapi,$ixc,_ic,_w,_ev,_tsd){return function(path,global){
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
var z=__WXML_GLOBAL__.ops_set.$gwx_XC_12 || [];
function gz$gwx_XC_12_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx_XC_12_1)return __WXML_GLOBAL__.ops_cached.$gwx_XC_12_1
__WXML_GLOBAL__.ops_cached.$gwx_XC_12_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_XC_12_1);return __WXML_GLOBAL__.ops_cached.$gwx_XC_12_1
}
__WXML_GLOBAL__.ops_set.$gwx_XC_12=z;
__WXML_GLOBAL__.ops_init.$gwx_XC_12=true;
var x=['./pages/health/selfpage/goods.wxml'];d_[x[0]]={}
var m0=function(e,s,r,gg){
var z=gz$gwx_XC_12_1()
return r
}
e_[x[0]]=e_[x[0]]||{f:m0,j:[],i:[],ti:[],ic:[]}
if(path&&e_[path]){
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
;g="$gwx_XC_12";var main=e_[path].f
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
}(__g.a,__g.b,__g.c,__g.d,__g.e,__g.f,__g.g,__g.h,__g.i,__g.j,__g.k,__g.l,__g.m,__g.n,__g.o,__g.p,__g.q,__g.r,__g.s,__g.t,__g.u,__g.v,__g.w,__g.x,__g.y,__g.z,__g.A,__g.B,__g.C,__g.D,__g.E,__g.F,__g.G,__g.H,__g.I,__g.J,__g.K,__g.L,__g.M,__g.N,__g.O,__g.P,__g.Q,__g.R,__g.S,__g.T,__g.U,__g.V,__g.W,__g.X,__g.Y,__g.Z,__g.aa);if(__vd_version_info__.delayedGwx||false)$gwx_XC_12();	if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/health/selfpage/goods.wxml'] = [$gwx_XC_12, './pages/health/selfpage/goods.wxml'];else __wxAppCode__['pages/health/selfpage/goods.wxml'] = $gwx_XC_12( './pages/health/selfpage/goods.wxml' );
	;__wxRoute = "pages/health/selfpage/goods";__wxRouteBegin = true;__wxAppCurrentFile__="pages/health/selfpage/goods.js";define("pages/health/selfpage/goods.js",function(require,module,exports,window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/health/selfpage/goods"],{"05a6":function(e,n,t){"use strict";t.r(n);var o=t("e957"),a=t.n(o);for(var r in o)"default"!==r&&function(e){t.d(n,e,(function(){return o[e]}))}(r);n["default"]=a.a},"05af":function(e,n,t){},"0a70":function(e,n,t){"use strict";var o;t.d(n,"b",(function(){return a})),t.d(n,"c",(function(){return r})),t.d(n,"a",(function(){return o}));var a=function(){var e=this,n=e.$createElement;e._self._c},r=[]},6428:function(e,n,t){"use strict";t.r(n);var o=t("0a70"),a=t("05a6");for(var r in a)"default"!==r&&function(e){t.d(n,e,(function(){return a[e]}))}(r);t("8eb9");var u,i=t("f0c5"),c=Object(i["a"])(a["default"],o["b"],o["c"],!1,null,"2a7f10fb",null,!1,o["a"],u);n["default"]=c.exports},"8eb9":function(e,n,t){"use strict";var o=t("05af"),a=t.n(o);a.a},e957:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=t("a25c"),a=r(t("b0c3"));function r(e){return e&&e.__esModule?e:{default:e}}var u={data:function(){return{title:"Hello",isAgree:!1,showTips:!1,menuInfo:{},systemInfo:{},goodInfo:{},swiperArr:[],baseUrl1:"http://101.37.64.50:8080",imgUrl:a.default.pro}},onShow:function(){this.systemInfo=e.getSystemInfoSync(),this.menuInfo=e.getMenuButtonBoundingClientRect()},onLoad:function(e){var n=this;console.log("路由传参"),console.log(e.id);var t={goodsId:e.id};(0,o.getGoodDetail)(t).then((function(e){console.log(e),n.goodInfo=e.data,-1!=e.data.goodsJpgs.indexOf(",")?n.swiperArr=e.data.goodsJpgs.split(","):n.swiperArr.push(e.data.goodsJpgs)}))},methods:{goHealth:function(){console.log("跳走"),e.redirectTo({url:"/pages/health/index"})},duihuan:function(n){(0,o.getGenerate)({goods_id:n,receiver_name:"",receiver_phone:"",receiver_address:""}).then((function(t){"5001"==t.code?"5001"==t.code&&(console.log("duihuan"),e.redirectTo({url:"/pages/health/selfpage/order?id=".concat(n)})):wx.showToast({icon:"none",title:t.message})}))}}};n.default=u}).call(this,t("543d")["default"])},ec5a:function(e,n,t){"use strict";(function(e){t("d770");o(t("66fd"));var n=o(t("6428"));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t("543d")["createPage"])}},[["ec5a","common/runtime","common/vendor"]]]);
},{isPage:true,isComponent:true,currentFile:'pages/health/selfpage/goods.js'});require("pages/health/selfpage/goods.js");