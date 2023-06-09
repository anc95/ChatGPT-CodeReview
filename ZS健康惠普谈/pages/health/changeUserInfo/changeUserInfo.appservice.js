$gwx_XC_9=function(_,_v,_n,_p,_s,_wp,_wl,$gwn,$gwl,$gwh,wh,$gstack,$gwrt,gra,grb,TestTest,wfor,_ca,_da,_r,_rz,_o,_oz,_1,_1z,_2,_2z,_m,_mz,nv_getDate,nv_getRegExp,nv_console,nv_parseInt,nv_parseFloat,nv_isNaN,nv_isFinite,nv_decodeURI,nv_decodeURIComponent,nv_encodeURI,nv_encodeURIComponent,$gdc,nv_JSON,_af,_gv,_ai,_grp,_gd,_gapi,$ixc,_ic,_w,_ev,_tsd){return function(path,global){
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
var z=__WXML_GLOBAL__.ops_set.$gwx_XC_9 || [];
function gz$gwx_XC_9_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx_XC_9_1)return __WXML_GLOBAL__.ops_cached.$gwx_XC_9_1
__WXML_GLOBAL__.ops_cached.$gwx_XC_9_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_XC_9_1);return __WXML_GLOBAL__.ops_cached.$gwx_XC_9_1
}
__WXML_GLOBAL__.ops_set.$gwx_XC_9=z;
__WXML_GLOBAL__.ops_init.$gwx_XC_9=true;
var x=['./pages/health/changeUserInfo/changeUserInfo.wxml'];d_[x[0]]={}
var m0=function(e,s,r,gg){
var z=gz$gwx_XC_9_1()
return r
}
e_[x[0]]=e_[x[0]]||{f:m0,j:[],i:[],ti:[],ic:[]}
if(path&&e_[path]){
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
;g="$gwx_XC_9";var main=e_[path].f
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
}(__g.a,__g.b,__g.c,__g.d,__g.e,__g.f,__g.g,__g.h,__g.i,__g.j,__g.k,__g.l,__g.m,__g.n,__g.o,__g.p,__g.q,__g.r,__g.s,__g.t,__g.u,__g.v,__g.w,__g.x,__g.y,__g.z,__g.A,__g.B,__g.C,__g.D,__g.E,__g.F,__g.G,__g.H,__g.I,__g.J,__g.K,__g.L,__g.M,__g.N,__g.O,__g.P,__g.Q,__g.R,__g.S,__g.T,__g.U,__g.V,__g.W,__g.X,__g.Y,__g.Z,__g.aa);if(__vd_version_info__.delayedGwx||false)$gwx_XC_9();	if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/health/changeUserInfo/changeUserInfo.wxml'] = [$gwx_XC_9, './pages/health/changeUserInfo/changeUserInfo.wxml'];else __wxAppCode__['pages/health/changeUserInfo/changeUserInfo.wxml'] = $gwx_XC_9( './pages/health/changeUserInfo/changeUserInfo.wxml' );
	;__wxRoute = "pages/health/changeUserInfo/changeUserInfo";__wxRouteBegin = true;__wxAppCurrentFile__="pages/health/changeUserInfo/changeUserInfo.js";define("pages/health/changeUserInfo/changeUserInfo.js",function(require,module,exports,window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/health/changeUserInfo/changeUserInfo"],{3221:function(a,t,n){"use strict";(function(a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e=n("3b36"),o=r(n("557d")),i=r(n("b0c3"));function r(a){return a&&a.__esModule?a:{default:a}}var c="https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",u={data:function(){return{avatarUrl:c,nickName:"",form:{name:""}}},mounted:function(){var t=JSON.parse(a.getStorageSync("userInfo"));this.avatarUrl=t.avatarUrl?t.avatarUrl:c,this.nickName=t.nickname},methods:{formSubmit:function(t){var n=t.detail.value;if(console.log("???"),this.avatarUrl&&this.avatarUrl!==c)if(n.nickName)if(n.nickName.length>12)wx.showToast({icon:"none",title:"昵称不能大于12个字符"});else{var o={icon:this.avatarUrl,nickname:n.nickName};(0,e.updateUserInfo)(o).then((function(t){"00000"===t.code&&(a.setStorageSync("userInfo",JSON.stringify(t.data)),a.navigateBack())}))}else wx.showToast({icon:"none",title:"昵称不能为空"});else wx.showToast({icon:"none",title:"请上传头像"})},onChooseAvatar:function(a){var t=a.detail.avatarUrl,n=this;wx.uploadFile({url:"".concat(i.default.pro,"/api/points/file/upload"),filePath:t,name:"file",header:{"Content-Type":"multipart/form-data;",token:o.default.getLocal("token")?o.default.getLocal("token"):""},success:function(a){var t=a.data,e=JSON.parse(t);if(console.log("???",t,e),"00000"===e.code){var o,r=(null===e||void 0===e||null===(o=e.data)||void 0===o?void 0:o.location)||"";n.avatarUrl=i.default.pro+r}else wx.showToast({icon:"none",title:"失败"})},fail:function(a){wx.showToast({icon:"none",title:"上传失败"})}})}}};t.default=u}).call(this,n("543d")["default"])},"50c2":function(a,t,n){"use strict";(function(a){n("d770");e(n("66fd"));var t=e(n("a4db"));function e(a){return a&&a.__esModule?a:{default:a}}wx.__webpack_require_UNI_MP_PLUGIN__=n,a(t.default)}).call(this,n("543d")["createPage"])},a4db:function(a,t,n){"use strict";n.r(t);var e=n("dcda"),o=n("fcff");for(var i in o)"default"!==i&&function(a){n.d(t,a,(function(){return o[a]}))}(i);n("b28a");var r,c=n("f0c5"),u=Object(c["a"])(o["default"],e["b"],e["c"],!1,null,"9930c2d8",null,!1,e["a"],r);t["default"]=u.exports},b28a:function(a,t,n){"use strict";var e=n("e083"),o=n.n(e);o.a},dcda:function(a,t,n){"use strict";var e;n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return e}));var o=function(){var a=this,t=a.$createElement;a._self._c},i=[]},e083:function(a,t,n){},fcff:function(a,t,n){"use strict";n.r(t);var e=n("3221"),o=n.n(e);for(var i in e)"default"!==i&&function(a){n.d(t,a,(function(){return e[a]}))}(i);t["default"]=o.a}},[["50c2","common/runtime","common/vendor"]]]);
},{isPage:true,isComponent:true,currentFile:'pages/health/changeUserInfo/changeUserInfo.js'});require("pages/health/changeUserInfo/changeUserInfo.js");