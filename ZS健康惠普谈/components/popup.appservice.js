$gwx_XC_5=function(_,_v,_n,_p,_s,_wp,_wl,$gwn,$gwl,$gwh,wh,$gstack,$gwrt,gra,grb,TestTest,wfor,_ca,_da,_r,_rz,_o,_oz,_1,_1z,_2,_2z,_m,_mz,nv_getDate,nv_getRegExp,nv_console,nv_parseInt,nv_parseFloat,nv_isNaN,nv_isFinite,nv_decodeURI,nv_decodeURIComponent,nv_encodeURI,nv_encodeURIComponent,$gdc,nv_JSON,_af,_gv,_ai,_grp,_gd,_gapi,$ixc,_ic,_w,_ev,_tsd){return function(path,global){
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
var z=__WXML_GLOBAL__.ops_set.$gwx_XC_5 || [];
function gz$gwx_XC_5_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx_XC_5_1)return __WXML_GLOBAL__.ops_cached.$gwx_XC_5_1
__WXML_GLOBAL__.ops_cached.$gwx_XC_5_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_XC_5_1);return __WXML_GLOBAL__.ops_cached.$gwx_XC_5_1
}
__WXML_GLOBAL__.ops_set.$gwx_XC_5=z;
__WXML_GLOBAL__.ops_init.$gwx_XC_5=true;
var x=['./components/popup.wxml'];d_[x[0]]={}
var m0=function(e,s,r,gg){
var z=gz$gwx_XC_5_1()
return r
}
e_[x[0]]=e_[x[0]]||{f:m0,j:[],i:[],ti:[],ic:[]}
if(path&&e_[path]){
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
;g="$gwx_XC_5";var main=e_[path].f
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
}(__g.a,__g.b,__g.c,__g.d,__g.e,__g.f,__g.g,__g.h,__g.i,__g.j,__g.k,__g.l,__g.m,__g.n,__g.o,__g.p,__g.q,__g.r,__g.s,__g.t,__g.u,__g.v,__g.w,__g.x,__g.y,__g.z,__g.A,__g.B,__g.C,__g.D,__g.E,__g.F,__g.G,__g.H,__g.I,__g.J,__g.K,__g.L,__g.M,__g.N,__g.O,__g.P,__g.Q,__g.R,__g.S,__g.T,__g.U,__g.V,__g.W,__g.X,__g.Y,__g.Z,__g.aa);if(__vd_version_info__.delayedGwx||false)$gwx_XC_5();	if (__vd_version_info__.delayedGwx) __wxAppCode__['components/popup.wxml'] = [$gwx_XC_5, './components/popup.wxml'];else __wxAppCode__['components/popup.wxml'] = $gwx_XC_5( './components/popup.wxml' );
	;__wxRoute = "components/popup";__wxRouteBegin = true;__wxAppCurrentFile__="components/popup.js";define("components/popup.js",function(require,module,exports,window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/popup"],{"0e47":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=p(a("b0c3")),i=a("b63f");function p(t){return t&&t.__esModule?t:{default:t}}var c={name:"popup",data:function(){return{bgOpacity:0,wrapAnimate:"wrapAnimate",popupAnimate:"popupAnimate",picUrl:"",typeSync:"",imgUrl:n.default.pro,popupText:""}},props:{type:String,visible:{type:Boolean,default:!1},heartCount:Number},watch:{type:{handler:function(t,e){switch(console.log("".concat(t)),console.log("打卡页判断"),console.log(this.type,(0,i.getHealthCare)()),this.type=t,this.type){case"health":this.picUrl="".concat(n.default.pro,"/static/images/bjzx.png"),this.popupText=(0,i.getHealthCare)();break;case"gym":this.picUrl="".concat(n.default.pro,"/static/images/jsf.png"),this.popupText=(0,i.getEitness)();break;case"dining":this.picUrl="".concat(n.default.pro,"/static/images/ct.png"),this.popupText=(0,i.breakfast)();break;case"getup":this.picUrl="".concat(n.default.pro,"/static/images/zq.png"),this.popupText=(0,i.getUpEarly)();break;case"getdown":this.picUrl="".concat(n.default.pro,"/static/images/zs.png"),this.popupText=(0,i.sleepEarly)();break;default:break}},immediate:!0,deep:!0}},methods:{hidePopup:function(){this.$emit("close")}}};e.default=c},"32be":function(t,e,a){"use strict";a.r(e);var n=a("b453"),i=a("a6f2");for(var p in i)"default"!==p&&function(t){a.d(e,t,(function(){return i[t]}))}(p);a("66d6");var c,o=a("f0c5"),r=Object(o["a"])(i["default"],n["b"],n["c"],!1,null,"495c18da",null,!1,n["a"],c);e["default"]=r.exports},"45d5":function(t,e,a){},"66d6":function(t,e,a){"use strict";var n=a("45d5"),i=a.n(n);i.a},a6f2:function(t,e,a){"use strict";a.r(e);var n=a("0e47"),i=a.n(n);for(var p in n)"default"!==p&&function(t){a.d(e,t,(function(){return n[t]}))}(p);e["default"]=i.a},b453:function(t,e,a){"use strict";var n;a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return p})),a.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement;t._self._c},p=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/popup-create-component',
    {
        'components/popup-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("32be"))
        })
    },
    [['components/popup-create-component']]
]);

},{isPage:false,isComponent:true,currentFile:'components/popup.js'});require("components/popup.js");