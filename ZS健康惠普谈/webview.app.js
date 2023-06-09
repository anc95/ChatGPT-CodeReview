var __globalThis=(typeof __vd_version_info__!=='undefined'&&typeof __vd_version_info__.globalThis!=='undefined')?__vd_version_info__.globalThis:window;var __mainPageFrameReady__=__globalThis.__mainPageFrameReady__||function(){};var __pageFrameStartTime__=Date.now();var __webviewId__;var __wxAppCode__=__wxAppCode__||{};var __WXML_GLOBAL__=__WXML_GLOBAL__||{entrys:{},defines:{},modules:{},ops:[],wxs_nf_init:undefined,total_ops:0};var __GWX_GLOBAL__=__GWX_GLOBAL__||{};;/*v0.5vv_20200413_syb_scopedata*/__globalThis.__wcc_version__='v0.5vv_20200413_syb_scopedata';__globalThis.__wcc_version_info__={"customComponents":true,"fixZeroRpx":true,"propValueDeepCopy":false};
var $gwxc
var $gaic={}
var outerGlobal=typeof __globalThis==='undefined'?window:__globalThis;$gwx=function(_,_v,_n,_p,_s,_wp,_wl,$gwn,$gwl,$gwh,wh,$gstack,$gwrt,gra,grb,TestTest,wfor,_ca,_da,_r,_rz,_o,_oz,_1,_1z,_2,_2z,_m,_mz,nv_getDate,nv_getRegExp,nv_console,nv_parseInt,nv_parseFloat,nv_isNaN,nv_isFinite,nv_decodeURI,nv_decodeURIComponent,nv_encodeURI,nv_encodeURIComponent,$gdc,nv_JSON,_af,_gv,_ai,_grp,_gd,_gapi,$ixc,_ic,_w,_ev,_tsd){return function(path,global){
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
var z=__WXML_GLOBAL__.ops_set.$gwx || [];
__WXML_GLOBAL__.ops_set.$gwx=z;
__WXML_GLOBAL__.ops_init.$gwx=true;
var nv_require=function(){var nnm={};var nom={};return function(n){if(n[0]==='p'&&n[1]==='_'&&f_[n.slice(2)])return f_[n.slice(2)];return function(){if(!nnm[n]) return undefined;try{if(!nom[n])nom[n]=nnm[n]();return nom[n];}catch(e){e.message=e.message.replace(/nv_/g,'');var tmp = e.stack.substring(0,e.stack.lastIndexOf(n));e.stack = tmp.substring(0,tmp.lastIndexOf('\n'));e.stack = e.stack.replace(/\snv_/g,' ');e.stack = $gstack(e.stack);e.stack += '\n    at ' + n.substring(2);console.error(e);}
}}}()
var x=[];if(path&&e_[path]){
outerGlobal.__wxml_comp_version__=0.02
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
;g="$gwx";var main=e_[path].f
if (typeof global==="undefined")global={};global.f=$gdc(f_[path],"",1);
if(typeof(outerGlobal.__webview_engine_version__)!='undefined'&&outerGlobal.__webview_engine_version__+1e-6>=0.02+1e-6&&outerGlobal.__mergeData__)
{
env=outerGlobal.__mergeData__(env,dd);
}
try{
main(env,{},root,global);
_tsd(root)
if(typeof(outerGlobal.__webview_engine_version__)=='undefined'|| outerGlobal.__webview_engine_version__+1e-6<0.01+1e-6){return _ev(root);}
}catch(err){
console.log(err)
}
;g="";
return root;
}
}
}
}(__g.a,__g.b,__g.c,__g.d,__g.e,__g.f,__g.g,__g.h,__g.i,__g.j,__g.k,__g.l,__g.m,__g.n,__g.o,__g.p,__g.q,__g.r,__g.s,__g.t,__g.u,__g.v,__g.w,__g.x,__g.y,__g.z,__g.A,__g.B,__g.C,__g.D,__g.E,__g.F,__g.G,__g.H,__g.I,__g.J,__g.K,__g.L,__g.M,__g.N,__g.O,__g.P,__g.Q,__g.R,__g.S,__g.T,__g.U,__g.V,__g.W,__g.X,__g.Y,__g.Z,__g.aa);if(__vd_version_info__.delayedGwx||true)$gwx();;;var noCss=typeof __vd_version_info__!=='undefined'&&__vd_version_info__.noCss===true;if(!noCss){var BASE_DEVICE_WIDTH = 750;
var isIOS=navigator.userAgent.match("iPhone");
var deviceWidth = window.screen.width || 375;
var deviceDPR = window.devicePixelRatio || 2;
var checkDeviceWidth = window.__checkDeviceWidth__ || function() {
var newDeviceWidth = window.screen.width || 375
var newDeviceDPR = window.devicePixelRatio || 2
var newDeviceHeight = window.screen.height || 375
if (window.screen.orientation && /^landscape/.test(window.screen.orientation.type || '')) newDeviceWidth = newDeviceHeight
if (newDeviceWidth !== deviceWidth || newDeviceDPR !== deviceDPR) {
deviceWidth = newDeviceWidth
deviceDPR = newDeviceDPR
}
}
checkDeviceWidth()
var eps = 1e-4;
var transformRPX = window.__transformRpx__ || function(number, newDeviceWidth) {
if ( number === 0 ) return 0;
number = number / BASE_DEVICE_WIDTH * ( newDeviceWidth || deviceWidth );
number = Math.floor(number + eps);
if (number === 0) {
if (deviceDPR === 1 || !isIOS) {
return 1;
} else {
return 0.5;
}
}
return number;
}
window.__rpxRecalculatingFuncs__ = window.__rpxRecalculatingFuncs__ || [];
var __COMMON_STYLESHEETS__ = __COMMON_STYLESHEETS__||{}

var setCssToHead = function(file, _xcInvalid, info) {
var Ca = {};
var css_id;
var info = info || {};
var _C = __COMMON_STYLESHEETS__
function makeup(file, opt) {
var _n = typeof(file) === "string";
if ( _n && Ca.hasOwnProperty(file)) return "";
if ( _n ) Ca[file] = 1;
var ex = _n ? _C[file] : file;
var res="";
for (var i = ex.length - 1; i >= 0; i--) {
var content = ex[i];
if (typeof(content) === "object")
{
var op = content[0];
if ( op == 0 )
res = transformRPX(content[1], opt.deviceWidth) + "px" + res;
else if ( op == 1)
res = opt.suffix + res;
else if ( op == 2 )
res = makeup(content[1], opt) + res;
}
else
res = content + res
}
return res;
}
var styleSheetManager = window.__styleSheetManager2__
var rewritor = function(suffix, opt, style){
opt = opt || {};
suffix = suffix || "";
opt.suffix = suffix;
if ( opt.allowIllegalSelector != undefined && _xcInvalid != undefined )
{
if ( opt.allowIllegalSelector )
console.warn( "For developer:" + _xcInvalid );
else
{
console.error( _xcInvalid );
}
}
Ca={};
css = makeup(file, opt);
if (styleSheetManager) {
var key = (info.path || Math.random()) + ':' + suffix
if (!style) {
styleSheetManager.addItem(key, info.path);
window.__rpxRecalculatingFuncs__.push(function(size){
opt.deviceWidth = size.width;
rewritor(suffix, opt, true);
});
}
styleSheetManager.setCss(key, css);
return;
}
if ( !style )
{
var head = document.head || document.getElementsByTagName('head')[0];
style = document.createElement('style');
style.type = 'text/css';
style.setAttribute( "wxss:path", info.path );
head.appendChild(style);
window.__rpxRecalculatingFuncs__.push(function(size){
opt.deviceWidth = size.width;
rewritor(suffix, opt, style);
});
}
if (style.styleSheet) {
style.styleSheet.cssText = css;
} else {
if ( style.childNodes.length == 0 )
style.appendChild(document.createTextNode(css));
else
style.childNodes[0].nodeValue = css;
}
}
return rewritor;
}
setCssToHead([])();setCssToHead([".",[1],"u-line-1{-webkit-line-clamp:1}\n.",[1],"u-line-1,.",[1],"u-line-2{-webkit-box-orient:vertical!important;display:-webkit-box!important;overflow:hidden;text-overflow:ellipsis;word-break:break-all}\n.",[1],"u-line-2{-webkit-line-clamp:2}\n.",[1],"u-line-3{-webkit-line-clamp:3}\n.",[1],"u-line-3,.",[1],"u-line-4{-webkit-box-orient:vertical!important;display:-webkit-box!important;overflow:hidden;text-overflow:ellipsis;word-break:break-all}\n.",[1],"u-line-4{-webkit-line-clamp:4}\n.",[1],"u-line-5{-webkit-line-clamp:5;-webkit-box-orient:vertical!important;display:-webkit-box!important;overflow:hidden;text-overflow:ellipsis;word-break:break-all}\n.",[1],"u-border{border-color:#dadbde!important;border-style:solid;border-width:.5px!important}\n.",[1],"u-border-top{border-color:#dadbde!important;border-top-style:solid;border-top-width:.5px!important}\n.",[1],"u-border-left{border-color:#dadbde!important;border-left-style:solid;border-left-width:.5px!important}\n.",[1],"u-border-right{border-color:#dadbde!important;border-right-style:solid;border-right-width:.5px!important}\n.",[1],"u-border-bottom{border-bottom-style:solid;border-bottom-width:.5px!important;border-color:#dadbde!important}\n.",[1],"u-border-top-bottom{border-bottom-style:solid;border-bottom-width:.5px!important;border-color:#dadbde!important;border-top-style:solid;border-top-width:.5px!important}\n.",[1],"u-reset-button{background-color:initial;color:inherit;font-size:inherit;line-height:inherit;padding:0}\n.",[1],"u-reset-button::after{border:none}\n.",[1],"u-hover-class{opacity:.7}\n.",[1],"u-primary-light{color:#ecf5ff}\n.",[1],"u-warning-light{color:#fdf6ec}\n.",[1],"u-success-light{color:#f5fff0}\n.",[1],"u-error-light{color:#fef0f0}\n.",[1],"u-info-light{color:#f4f4f5}\n.",[1],"u-primary-light-bg{background-color:#ecf5ff}\n.",[1],"u-warning-light-bg{background-color:#fdf6ec}\n.",[1],"u-success-light-bg{background-color:#f5fff0}\n.",[1],"u-error-light-bg{background-color:#fef0f0}\n.",[1],"u-info-light-bg{background-color:#f4f4f5}\n.",[1],"u-primary-dark{color:#398ade}\n.",[1],"u-warning-dark{color:#f1a532}\n.",[1],"u-success-dark{color:#53c21d}\n.",[1],"u-error-dark{color:#e45656}\n.",[1],"u-info-dark{color:#767a82}\n.",[1],"u-primary-dark-bg{background-color:#398ade}\n.",[1],"u-warning-dark-bg{background-color:#f1a532}\n.",[1],"u-success-dark-bg{background-color:#53c21d}\n.",[1],"u-error-dark-bg{background-color:#e45656}\n.",[1],"u-info-dark-bg{background-color:#767a82}\n.",[1],"u-primary-disabled{color:#9acafc}\n.",[1],"u-warning-disabled{color:#f9d39b}\n.",[1],"u-success-disabled{color:#a9e08f}\n.",[1],"u-error-disabled{color:#f7b2b2}\n.",[1],"u-info-disabled{color:#c4c6c9}\n.",[1],"u-primary{color:#3c9cff}\n.",[1],"u-warning{color:#f9ae3d}\n.",[1],"u-success{color:#5ac725}\n.",[1],"u-error{color:#f56c6c}\n.",[1],"u-info{color:#909399}\n.",[1],"u-primary-bg{background-color:#3c9cff}\n.",[1],"u-warning-bg{background-color:#f9ae3d}\n.",[1],"u-success-bg{background-color:#5ac725}\n.",[1],"u-error-bg{background-color:#f56c6c}\n.",[1],"u-info-bg{background-color:#909399}\n.",[1],"u-main-color{color:#303133}\n.",[1],"u-content-color{color:#606266}\n.",[1],"u-tips-color{color:#909193}\n.",[1],"u-light-color{color:#c0c4cc}\n.",[1],"u-safe-area-inset-top{padding-top:env(safe-area-inset-top)}\n.",[1],"u-safe-area-inset-right{padding-right:env(safe-area-inset-right)}\n.",[1],"u-safe-area-inset-bottom{padding-bottom:env(safe-area-inset-bottom)}\n.",[1],"u-safe-area-inset-left{padding-left:env(safe-area-inset-left)}\n::-webkit-scrollbar{-webkit-appearance:none;background:transparent;display:none;height:0!important;width:0!important}\nbody{color:#121212;font-family:PingFang SC,Arial,Hiragino Sans GB,Microsoft YaHei,sans-serif;font-size:",[0,28],";min-height:100vh}\n.",[1],"bold{font-weight:700}\n.",[1],"text-primary{color:#292929}\n.",[1],"text-green{color:#71b54b}\n.",[1],"bg-white{background-color:#fff}\n.",[1],"bg-body{background-color:#303133}\n.",[1],"xxl{font-size:",[0,36],"}\n.",[1],"xl{font-size:",[0,34],"}\n.",[1],"lg{font-size:",[0,32],"}\n.",[1],"md{font-size:",[0,30],"}\n.",[1],"nr{font-size:",[0,28],"}\n.",[1],"sm{font-size:",[0,26],"}\n.",[1],"xs{font-size:",[0,24],"}\n.",[1],"xxs{font-size:",[0,22],"}\n.",[1],"ml5{margin-left:",[0,5],"}\n.",[1],"ml10{margin-left:",[0,10],"}\n.",[1],"ml20{margin-left:",[0,20],"}\n.",[1],"ml30{margin-left:",[0,30],"}\n.",[1],"mr5{margin-right:",[0,5],"}\n.",[1],"mr10{margin-right:",[0,10],"}\n.",[1],"mr20{margin-right:",[0,20],"}\n.",[1],"mr30{margin-right:",[0,30],"}\n.",[1],"mt5{margin-top:",[0,5],"}\n.",[1],"mt10{margin-top:",[0,10],"}\n.",[1],"mt20{margin-top:",[0,20],"}\n.",[1],"mt30{margin-top:",[0,30],"}\n.",[1],"mb5{margin-bottom:",[0,5],"}\n.",[1],"mb10{margin-bottom:",[0,10],"}\n.",[1],"mb20{margin-bottom:",[0,20],"}\n.",[1],"mb30{margin-bottom:",[0,30],"}\n.",[1],"row{align-items:center;display:flex}\n.",[1],"flex1{flex:1}\n.",[1],"flexnone{flex:none}\n.",[1],"flexwrap{flex-wrap:wrap}\n.",[1],"row-center{justify-content:center}\n.",[1],"row-center,.",[1],"row-end{align-items:center;display:flex}\n.",[1],"row-end{justify-content:flex-end}\n.",[1],"row-between{justify-content:space-between}\n.",[1],"row-around,.",[1],"row-between{align-items:center;display:flex}\n.",[1],"row-around{justify-content:space-around}\n.",[1],"column,.",[1],"column-center{display:flex;flex-direction:column;justify-content:center}\n.",[1],"column-center{align-items:center}\n.",[1],"column-around{justify-content:space-around}\n.",[1],"column-around,.",[1],"column-end{align-items:center;display:flex;flex-direction:column}\n.",[1],"column-end{justify-content:flex-end}\n.",[1],"column-between{align-items:center;display:flex;flex-direction:column;justify-content:space-between}\n.",[1],"line1{text-overflow:ellipsis;white-space:nowrap}\n.",[1],"line1,.",[1],"line2{overflow:hidden}\n.",[1],"line2{-webkit-line-clamp:2;-webkit-box-orient:vertical;display:-webkit-box;word-break:break-all}\n.",[1],"line-through{text-decoration:line-through}\n::-webkit-scrollbar{color:transparent;height:0;width:0}\nwx-view{box-sizing:border-box}\nbody::after{-webkit-animation:shadow-preload .1s;-webkit-animation-delay:3s;animation:shadow-preload .1s;animation-delay:3s;content:\x22\x22;left:-1000px;position:fixed;top:-1000px}\n@-webkit-keyframes shadow-preload{0%{background-image:url(https://cdn1.dcloud.net.cn/img/shadow-grey.png)}\n100%{background-image:url(https://cdn1.dcloud.net.cn/img/shadow-grey.png)}\n}@keyframes shadow-preload{0%{background-image:url(https://cdn1.dcloud.net.cn/img/shadow-grey.png)}\n100%{background-image:url(https://cdn1.dcloud.net.cn/img/shadow-grey.png)}\n}[bind-data-custom-hidden\x3d\x22true\x22],[data-custom-hidden\x3d\x22true\x22]{display:none!important}\n",],"Some selectors are not allowed in component wxss, including tag name selectors, ID selectors, and attribute selectors.(./app.wxss:1:4965)",{path:"./app.wxss"})();;;}__mainPageFrameReady__();var __pageFrameEndTime__=Date.now();