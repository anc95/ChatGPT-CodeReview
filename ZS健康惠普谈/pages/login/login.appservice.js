$gwx_XC_17=function(_,_v,_n,_p,_s,_wp,_wl,$gwn,$gwl,$gwh,wh,$gstack,$gwrt,gra,grb,TestTest,wfor,_ca,_da,_r,_rz,_o,_oz,_1,_1z,_2,_2z,_m,_mz,nv_getDate,nv_getRegExp,nv_console,nv_parseInt,nv_parseFloat,nv_isNaN,nv_isFinite,nv_decodeURI,nv_decodeURIComponent,nv_encodeURI,nv_encodeURIComponent,$gdc,nv_JSON,_af,_gv,_ai,_grp,_gd,_gapi,$ixc,_ic,_w,_ev,_tsd){return function(path,global){
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
var z=__WXML_GLOBAL__.ops_set.$gwx_XC_17 || [];
function gz$gwx_XC_17_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx_XC_17_1)return __WXML_GLOBAL__.ops_cached.$gwx_XC_17_1
__WXML_GLOBAL__.ops_cached.$gwx_XC_17_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_XC_17_1);return __WXML_GLOBAL__.ops_cached.$gwx_XC_17_1
}
__WXML_GLOBAL__.ops_set.$gwx_XC_17=z;
__WXML_GLOBAL__.ops_init.$gwx_XC_17=true;
var x=['./pages/login/login.wxml'];d_[x[0]]={}
var m0=function(e,s,r,gg){
var z=gz$gwx_XC_17_1()
return r
}
e_[x[0]]=e_[x[0]]||{f:m0,j:[],i:[],ti:[],ic:[]}
if(path&&e_[path]){
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
;g="$gwx_XC_17";var main=e_[path].f
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
}(__g.a,__g.b,__g.c,__g.d,__g.e,__g.f,__g.g,__g.h,__g.i,__g.j,__g.k,__g.l,__g.m,__g.n,__g.o,__g.p,__g.q,__g.r,__g.s,__g.t,__g.u,__g.v,__g.w,__g.x,__g.y,__g.z,__g.A,__g.B,__g.C,__g.D,__g.E,__g.F,__g.G,__g.H,__g.I,__g.J,__g.K,__g.L,__g.M,__g.N,__g.O,__g.P,__g.Q,__g.R,__g.S,__g.T,__g.U,__g.V,__g.W,__g.X,__g.Y,__g.Z,__g.aa);if(__vd_version_info__.delayedGwx||false)$gwx_XC_17();	if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/login/login.wxml'] = [$gwx_XC_17, './pages/login/login.wxml'];else __wxAppCode__['pages/login/login.wxml'] = $gwx_XC_17( './pages/login/login.wxml' );
	;__wxRoute = "pages/login/login";__wxRouteBegin = true;__wxAppCurrentFile__="pages/login/login.js";define("pages/login/login.js",function(require,module,exports,window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"1c46":function(e,n,t){"use strict";var o=t("4f66"),c=t.n(o);c.a},"2e47":function(e,n,t){"use strict";t.r(n);var o=t("7261"),c=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,(function(){return o[e]}))}(i);n["default"]=c.a},"4f66":function(e,n,t){},7261:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=u(t("b0c3")),c=t("3b36"),i=u(t("557d"));function u(e){return e&&e.__esModule?e:{default:e}}var s={data:function(){return{isAgree:!1,menuInfo:{},systemInfo:{},check:"".concat(o.default.pro,"/static/images/check.png"),checked:"".concat(o.default.pro,"/static/images/checked.png"),phoneNumber:!1,imgUrl:o.default.pro}},onShow:function(){this.systemInfo=e.getSystemInfoSync(),this.menuInfo=e.getMenuButtonBoundingClientRect()},onLoad:function(){},methods:{changeAgree:function(){this.isAgree=!this.isAgree},loginAction:function(){var n=this;n.isAgree?wx.login({success:function(e){if(e.code)(0,c.getLogin)({code:e.code}).then((function(e){"00000"==e.code?(i.default.setLocal("token",e.data.token),n.getUserInfo()):wx.showToast({icon:"none",title:"授权失败"+e.message})}));else wx.showToast({icon:"none",title:"登录失败！"+e.errMsg}),console.log("登录失败！"+e.errMsg)}}):e.showToast({title:"您需要同意相关条款才能注册/登录！",icon:"none"})},getUserInfo:function(){var n=this;(0,c.userInfo)().then((function(t){"00000"===t.code?(e.setStorageSync("userInfo",JSON.stringify(t.data)),n.$store.commit("setUserInfo",t.data),wx.getWeRunData({success:function(e){var n=e.encryptedData,t=e.iv;(0,c.userStep)({iv:t,encryptedData:n}).then((function(e){console.log("微信步数"),console.log(e),"B0301"===e.code&&(wx.removeStorage({key:"token"}),wx.removeStorage({key:"userInfo"}),wx.navigateTo({url:"/pages/login/login"}))}))}}),wx.reLaunch({url:"/pages/index/index"})):e.showModal({title:"获取用户信息失败"})}))},authorizeWeRun:function(){wx.getWeRunData({success:function(e){console.log("获取步数"),console.log(e);e.encryptedData}})},getWeRunData:function(){var n=this;e.login({success:function(){e.getWeRunData({success:function(){n.isNotWeXinRun()}})}})},isNotWeixinRun:function(){var n=this;e.getSetting({success:function(e){e.authSetting["scope.werun"]?n.wxRunStatus=!0:n.wxRunStatus=!1}})},confirmTips:function(){e.openSetting({success:function(e){console.log(e.authSetting)},complete:function(){e.navigateTo({url:"/pages/index/index"})}})}}};n.default=s}).call(this,t("543d")["default"])},"8bb5":function(e,n,t){"use strict";var o;t.d(n,"b",(function(){return c})),t.d(n,"c",(function(){return i})),t.d(n,"a",(function(){return o}));var c=function(){var e=this,n=e.$createElement;e._self._c},i=[]},d1e5:function(e,n,t){"use strict";(function(e){t("d770");o(t("66fd"));var n=o(t("ffc0"));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t("543d")["createPage"])},ffc0:function(e,n,t){"use strict";t.r(n);var o=t("8bb5"),c=t("2e47");for(var i in c)"default"!==i&&function(e){t.d(n,e,(function(){return c[e]}))}(i);t("1c46");var u,s=t("f0c5"),a=Object(s["a"])(c["default"],o["b"],o["c"],!1,null,"320c5bd8",null,!1,o["a"],u);n["default"]=a.exports}},[["d1e5","common/runtime","common/vendor"]]]);
},{isPage:true,isComponent:true,currentFile:'pages/login/login.js'});require("pages/login/login.js");