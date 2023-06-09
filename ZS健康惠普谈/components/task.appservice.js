$gwx_XC_6=function(_,_v,_n,_p,_s,_wp,_wl,$gwn,$gwl,$gwh,wh,$gstack,$gwrt,gra,grb,TestTest,wfor,_ca,_da,_r,_rz,_o,_oz,_1,_1z,_2,_2z,_m,_mz,nv_getDate,nv_getRegExp,nv_console,nv_parseInt,nv_parseFloat,nv_isNaN,nv_isFinite,nv_decodeURI,nv_decodeURIComponent,nv_encodeURI,nv_encodeURIComponent,$gdc,nv_JSON,_af,_gv,_ai,_grp,_gd,_gapi,$ixc,_ic,_w,_ev,_tsd){return function(path,global){
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
var z=__WXML_GLOBAL__.ops_set.$gwx_XC_6 || [];
function gz$gwx_XC_6_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx_XC_6_1)return __WXML_GLOBAL__.ops_cached.$gwx_XC_6_1
__WXML_GLOBAL__.ops_cached.$gwx_XC_6_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__e'])
Z([3,'sign-title_button data-v-5aca7b20'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'dailyClock']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([[2,'!'],[[7],[3,'clockIn']]])
})(__WXML_GLOBAL__.ops_cached.$gwx_XC_6_1);return __WXML_GLOBAL__.ops_cached.$gwx_XC_6_1
}
__WXML_GLOBAL__.ops_set.$gwx_XC_6=z;
__WXML_GLOBAL__.ops_init.$gwx_XC_6=true;
var x=['./components/task.wxml'];d_[x[0]]={}
var m0=function(e,s,r,gg){
var z=gz$gwx_XC_6_1()
var e2=_mz(z,'view',['bindtap',0,'class',1,'data-event-opts',1],[],e,s,gg)
var b3=_v()
_(e2,b3)
if(_oz(z,3,e,s,gg)){b3.wxVkey=1
}
b3.wxXCkey=1
_(r,e2)
return r
}
e_[x[0]]=e_[x[0]]||{f:m0,j:[],i:[],ti:[],ic:[]}
if(path&&e_[path]){
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
;g="$gwx_XC_6";var main=e_[path].f
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
}(__g.a,__g.b,__g.c,__g.d,__g.e,__g.f,__g.g,__g.h,__g.i,__g.j,__g.k,__g.l,__g.m,__g.n,__g.o,__g.p,__g.q,__g.r,__g.s,__g.t,__g.u,__g.v,__g.w,__g.x,__g.y,__g.z,__g.A,__g.B,__g.C,__g.D,__g.E,__g.F,__g.G,__g.H,__g.I,__g.J,__g.K,__g.L,__g.M,__g.N,__g.O,__g.P,__g.Q,__g.R,__g.S,__g.T,__g.U,__g.V,__g.W,__g.X,__g.Y,__g.Z,__g.aa);if(__vd_version_info__.delayedGwx||false)$gwx_XC_6();	if (__vd_version_info__.delayedGwx) __wxAppCode__['components/task.wxml'] = [$gwx_XC_6, './components/task.wxml'];else __wxAppCode__['components/task.wxml'] = $gwx_XC_6( './components/task.wxml' );
	;__wxRoute = "components/task";__wxRouteBegin = true;__wxAppCurrentFile__="components/task.js";define("components/task.js",function(require,module,exports,window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/task"],{"94b7":function(t,e,a){"use strict";a.r(e);var n=a("bbfe"),i=a.n(n);for(var s in n)"default"!==s&&function(t){a.d(e,t,(function(){return n[t]}))}(s);e["default"]=i.a},bbfe:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a("b068"),i=(a("3b36"),s(a("b0c3")));a("b63f");function s(t){return t&&t.__esModule?t:{default:t}}var c={name:"task",data:function(){return{bgOpacity:0,wrapAnimate:"wrapAnimate",popupAnimate:"popupAnimate",signUrl:"".concat(i.default.pro,"/static/task/sign.png"),signActiveUrl:"".concat(i.default.pro,"/static/task/sign-acitve.png"),list:[{date:"周一",point:0},{date:"周二",point:0},{date:"周三",point:0},{date:"周四",point:0},{date:"周五",point:0},{date:"周六",point:0},{date:"周日",point:0}],clockIn:!1,taskList:{qiandao:!1,gym:!1,dining:!1,health:!1,getdown:!1,getup:!1},weixinrun:!1,consign:0,imgUrl:i.default.pro}},props:{type:String,visible:{type:Boolean,default:!1}},onReady:function(){var e=this;t.getSetting({success:function(t){t.authSetting["scope.werun"]&&(e.weixinrun=!0)}}),this.init()},methods:{init:function(){var e=this;t.showLoading({mask:!0,title:"正在加载中..."}),(0,n.getSignRecord)().then((function(t){var a=new Date,n=a.getFullYear(),i=a.getMonth()+1,s=a.getDate(),c=n+"/"+i+"/"+s;if(0!=t.data.length){var o=e.getWeekDataList(c);t.data.forEach((function(e,a){e.date.replace(/-/g,"/"),Date.parse(e.date)<Date.parse(o[0])&&(t.data.length=a)}));var r=o.indexOf(t.data[0].date.replace(/-/g,"/"));if(e.consign=t.data[0].consign,-1!=r){var u=r;if(t.data.length<=r+1)for(var g=function(a){var n=void 0,i=void 0;switch(u+1){case 1:n="一";break;case 2:n="二";break;case 3:n="三";break;case 4:n="四";break;case 5:n="五";break;case 6:n="六";break;case 7:n="日";break;default:break}if(void 0!=t.data[a+1]){var s=1*new Date(t.data[a].date),c=1*new Date(t.data[a+1].date);i=(c-s)/864e5,u-=Math.abs(i)}else u--;e.list.forEach((function(e){e.date=="周".concat(n)&&(e.point=t.data[a].point)}))},h=0;h<t.data.length;h++)g(h)}}})),(0,n.getTaskRecord)().then((function(a){a.data.forEach((function(t){switch(t.integral_behavior){case 2:e.clockIn=!0;break;case 3:e.taskList.gym=!0;break;case 4:e.taskList.dining=!0;break;case 5:e.taskList.health=!0;break;case 7:e.taskList.getdown=!0;break;case 8:e.taskList.getup=!0;break;default:break}})),t.hideLoading()}))},hidePopup:function(){this.$emit("close")},dailyClock:function(){var e=this;this.clockIn?t.showToast({icon:"none",title:"今日已签到"}):(this.clockIn=!this.clockIn,(0,n.getPoints)().then((function(t){e.init(),e.$emit("fresh")})))},getUserInfo:function(t){var e=(new Date).getHours(),a=(new Date).getMinutes();switch(console.log(e,a),t){case"getup":!this.taskList.getup&&this.getUpSuccess("getup");break;case"getdown":!this.taskList.getdown&&this.getDownSuccess("getdown");break;case"health":!this.taskList.health&&this.healthSuccess("health");break;case"gym":!this.taskList.gym&&this.gymSuccess("gym");break;case"dining":!this.taskList.dining&&this.diningSuccess("dining");break;case"kaitong":!this.weixinrun&&this.weixinrunSuccess();break}},getWeekDataList:function(t){var e=[],a=new Date(t);"0"==a.getDay()?a.setDate(a.getDate()-6):a.setDate(a.getDate()-a.getDay()+1);var n=a.getDate(),i=a.getMonth()+1;a.getDate()<10&&(n="0"+n),a.getMonth()+1<10&&(i="0"+i),e.push(a.getFullYear()+"/"+i+"/"+n);for(var s=0;s<6;s++)a.setDate(a.getDate()+1),n=a.getDate(),i=a.getMonth()+1,a.getDate()<10&&(n="0"+n),a.getMonth()+1<10&&(i="0"+i),e.push(a.getFullYear()+"/"+i+"/"+n);return e},getUpSuccess:function(e){var a=this;this.taskList.getup||(0,n.upTask)({integralBehavior:8}).then((function(t){console.log(t),a.taskList.getup=!0,a.$emit("clockInWhere",e)})).catch((function(e){t.showToast({icon:"none",title:"打卡失败"})}))},getDownSuccess:function(e){var a=this;this.taskList.getdown||(0,n.upTask)({integralBehavior:7}).then((function(t){console.log(t),a.taskList.getdown=!0,a.$emit("clockInWhere",e)})).catch((function(e){t.showToast({icon:"none",title:"打卡失败"})}))},healthSuccess:function(t){this.taskList.health=!0,this.$emit("clockInWhere",t)},gymSuccess:function(t){this.taskList.gym=!0,this.$emit("clockInWhere",t)},diningSuccess:function(t){this.taskList.dining=!0,this.$emit("clockInWhere",t)},weixinrunSuccess:function(){wx.openSetting({success:function(t){console.log(t.authSetting)}}),this.weixinrun=!0}}};e.default=c}).call(this,a("543d")["default"])},bdf7:function(t,e,a){"use strict";var n=a("fe42"),i=a.n(n);i.a},cf07:function(t,e,a){"use strict";a.r(e);var n=a("d901"),i=a("94b7");for(var s in i)"default"!==s&&function(t){a.d(e,t,(function(){return i[t]}))}(s);a("bdf7");var c,o=a("f0c5"),r=Object(o["a"])(i["default"],n["b"],n["c"],!1,null,"5aca7b20",null,!1,n["a"],c);e["default"]=r.exports},d901:function(t,e,a){"use strict";var n;a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return s})),a.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement;t._self._c},s=[]},fe42:function(t,e,a){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/task-create-component',
    {
        'components/task-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("cf07"))
        })
    },
    [['components/task-create-component']]
]);

},{isPage:false,isComponent:true,currentFile:'components/task.js'});require("components/task.js");