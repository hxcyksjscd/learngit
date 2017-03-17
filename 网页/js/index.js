
var addEvent =document.addEventListener ?
	function(elem, type, listener, useCapture) {
		elem.addEventListener(type, listener, useCapture);
	} :
	function(elem, type, listener, useCapture) {
		elem.attachEvent('on' + type, listener);
	};
var delEvent =document.removeEventListener ?
	function(elem, type, listener, useCapture) {
		elem.removeEventListener(type, listener, useCapture);
	} :
	function(elem, type, listener, useCapture) {
		elem.detachEvent('on' + type, listener);
	};
// addEvent兼容
function getElementsByClassName(element, names) {
		    if (element.getElementsByClassName) {
		        return element.getElementsByClassName(names);
		    } else {
		        var elements = element.getElementsByTagName('*');
		        var result = [];
		        var element,
		            classNameStr,
		            flag;
		        names = names.split(' ');
		        for (var i = 0; element = elements[i]; i++) {
		            classNameStr = ' ' + element.className + ' ';
		            flag = true;
		            for (var j = 0, name; name = names[j]; j++) {
		                if (classNameStr.indexOf(' ' + name + '') == -1) {
		                    flag = false;
		                    break;
		                }
		            }
		            if (flag) {
		                result.push(element);
		            }
		        }
		        return result;
		    }
		}
// getElementsByClassName兼容

var username=document.cookie.split(";")[0].split("=")[1];
function setCookie(name,value)
{
var Days = 30;
var exp = new Date();
exp.setTime(exp.getTime() + Days*24*60*60*1000);
document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
return unescape(arr[2]);
else
return null;
}
function delCookie(name)
{
var exp = new Date();
exp.setTime(exp.getTime() - 1);
var cval=getCookie(name);
if(cval!=null)
document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
//JS操作cookies方法!


function get(url,options,callback) {
    //1.创建xhr对象，并兼容
    var xhr;
    if (window.XMLHttpRequest){
        xhr=new XMLHttpRequest();
    }else{
        xhr=new ActiveXObject("Microsoft.XMLHTTP");
    }
    //2. 在open方法之前监听redaystatechange
    xhr.onreadystatechange = function () {
        //2.1 判断readyState==4
        if(xhr.readyState==4){
            //2.2 判断状态码
            if( (xhr.status>=200 && xhr.status<300) || xhr.status==304 ){
                callback(xhr.responseText);
            }
            else{
                console.log("ajax请求不成功,错误状态码为："+xhr.status);
            }
        }   
    }
    //如果传入的参数不为空
    if(!!options){
        url = url+"?"+serialize(options);
    }
    //请求参数序列化的方法
    function serialize(data) {
        if(!data){//再次对参数判断确保返回为字符串
            return "";
        }
        var arry = [];
        for(var name in data){
            if( (!data.hasOwnProperty(name)) || typeof data[name]==="function" ){
                continue ;
            }
            //求出value值
            var value = data[name].toString();
            //对name 和进行编码
            name = encodeURIComponent(name);
            value = encodeURIComponent(value);
            var item = name + "=" + value;
            arry.push(item);
        }
        return arry.join("&");
    }
    //3.open方法  url地址要加上option序列化
    xhr.open("get",url,true);
    xhr.send(null);//get方法必须传入null
    //如果是post请求则为send(serialize(formdata));
}
// Ajax get封装



function bind(elem,ev,callback)
 {
  if(document.all)
  {
   elem.attachEvent("on"+ev,callback);
  }else{
   elem.addEventListener(ev,callback,false);
  }
 }
 function unbind(elem,ev,callback)
 {
  if(typeof(callback)=="function")
  {
   if(document.all)
   {
    elem.detachEvent("on"+ev,callback); 
   }else{
    elem.removeEventListener(ev,callback,false);
   }
  }else{
   if(document.all)
   {
    elem.detachEvent("on"+ev); 
   }else{
    elem.removeEventListener(ev,false);
   }
  }
 }
 function hover(elem,overCallback,outCallback){//实现hover事件
  var isHover=false;//判断是否悬浮在上方
  var preOvTime=new Date().getTime();//上次悬浮时间
  function over(e){
   var curOvTime=new Date().getTime();
   isHover=true;//处于over状态
   if(curOvTime-preOvTime>1)
   {//时间间隔超过10毫秒，认为鼠标完成了mouseout事件
    overCallback(e,elem);
   }
   preOvTime=curOvTime;
  }
  function out(e)
  {
   var curOvTime=new Date().getTime();
   preOvTime=curOvTime;
   isHover=false;
   setTimeout(function(){
    if(!isHover)
    {
     outCallback(e,elem);
    }
   },10);
  }
  bind(elem,"mouseover",over);
  bind(elem,"mouseout",out);
 };
// hover事件的封装




var x = document.getElementById('x');
var gbchead = getElementsByClassName(document ,'g-bchead');
addEvent(x,'click', function(){
		gbchead[0].style.display = 'none';
		setCookie("star","hayden");
})
var star = getCookie("star");
if (star == "hayden") {
	gbchead[0].style.display = 'none';
}
// 页头关闭交互并关联cookie

var ateti = document.getElementById('ateti'),
	gbclose = document.getElementById('gbclose'),
	username = document.getElementById('username'),
	password = document.getElementById('password'),
	submit = document.getElementById('submit'),
	escc = document.getElementById('escc'),
	mlayer = getElementsByClassName(document,'m-layer'),
	fans = getElementsByClassName(document,'f-logo-rt-r');
function cliconoff() {
	ateti.innerText = '已关注';
	ateti.className = 'backhove';
	escc.style.display = 'block'
	fans[0].style.display = 'none';
}
// 已关注状态封装
if (getCookie('loginSuc') == '1') {
	addEvent(ateti,'click',function () {
		cliconoff();
		setCookie('followSuc','1')
	})
// 判断cookie已登陆，按键则调用已关注，并写入cookie
}else {
	addEvent(ateti,'click',function () {
		mlayer[0].style.display = 'block';
	})
}
// 未登陆则登陆
addEvent(gbclose,'click',function () {
	mlayer[0].style.display = 'none';
})
// 右上角那个×
if (getCookie('followSuc') == '1') {
	cliconoff();
}
// 判断cookie已关注则调用已关注
addEvent(escc,'click',function () {
	ateti.innerText = '+关注';
	escc.style.display = 'none'
	mlayer[0].style.display = 'none';
	ateti.className = 'f-logo-rt-l';
	fans[0].style.display = 'block';
	delCookie('followSuc');
})
// 取消的按键绑定，并删除cookie
function login(argument) {
	get('http://study.163.com/webDev/login.htm',
	{userName: hex_md5(username.value) , password: hex_md5(password.value)},
   		function(e){
    	if (e == 1) {
    		cliconoff();
    		mlayer[0].style.display = 'none';
    		ateti.disabled = true;
    		setCookie("loginSuc","1");
    		setCookie('followSuc','1');
    	} else if(e == 0) {
    		alert('请正确输入账号密码');
    	}})
}
addEvent(submit,'click',login)
// 登陆，与Ajax交互，并写入登陆cookie和已关注cookie



var fbanner = document.getElementById('f-banner'),
	banner = fbanner.getElementsByTagName('li'),
	bannerc = document.getElementById('bannerc'),
	bannercl = bannerc.getElementsByTagName('li');
function bannercl0(argument) {
	bannercl[0].className = 'bnactive'
	bannercl[1].className = ''
	bannercl[2].className = ''
	fbanner.style.left = 0;
	banner[0].style.opacity = 1;
	banner[1].style.opacity = 0;
	banner[2].style.opacity = 0;
	// 淡入特效的处理
	settime0 = setTimeout(bannercl1,5000)
}
function bannercl1(argument){
	bannercl[1].className = 'bnactive'
	bannercl[2].className = ''
	bannercl[0].className = ''
	fbanner.style.left = '-1616px' ;
	banner[0].style.opacity = 0;
	banner[1].style.opacity = 1;
	banner[2].style.opacity = 0;
	settime0 = setTimeout(bannercl2,5000)
}
function bannercl2(argument){
	bannercl[2].className = 'bnactive'
	bannercl[0].className = ''
	bannercl[1].className = ''
	fbanner.style.left = '-3232px';
	banner[0].style.opacity = 0;
	banner[1].style.opacity = 0;
	banner[2].style.opacity = 1;
	settime0 = setTimeout(bannercl0,5000)
}
// 三种状态该有的css固定值，并启动一个5秒的定时器
settime0 = setTimeout(bannercl1,5000)
// 进入网页即启动一次定时器
function clearall() {
	clearTimeout(settime0);
}
// 清除定时器的封装
addEvent(bannercl[0],'click',function () {
		clearall();
		bannercl0();
	})
addEvent(bannercl[1],'click',function () {
		clearall();
		bannercl1();
	})
addEvent(bannercl[2],'click',function () {
		clearall();
		bannercl2();
	})
// 绑定好按键

hover(banner[0],function(){clearall();},function(){bannercl0();})
hover(banner[1],function(){clearall();},function(){bannercl1();})
hover(banner[2],function(){clearall();},function(){bannercl2();})
// 绑定好hover即暂停事件，hover事件的封装在上面。
// 页面中部banner图，
// 定时5s，
// 加入css3淡入特效






function asideol(onepx,allpx,numb) {
	if(navigator.appName != "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i)!="8.") 
{
	// 让ie8不执行
	this.e = 0;
	this.f = 0;
	this.g = -Number(allpx);
	this.h;
  	setInterval(function(){
	e=e+Number(onepx);
	if (parseInt(g/-Number(allpx))==g/-Number(allpx)) {
		h = g;
	}
	g = g-Number(onepx);
	if (f>Number(numb)-1) {
		f=0;
	}
	funcn();
	f=f+1;
},5000);
}
}
var tarans = document.getElementById('tarans'),
	aside = tarans.getElementsByTagName('li'),
	asideimg = getElementsByClassName(tarans, 'f-aside-b-img'),
	h5 = tarans.getElementsByTagName('h5')
	asidenum = getElementsByClassName(tarans, 'f-aside-b-br');
function funcn() {
	tarans.style.transform = 'translate3d(0,-'+this.e+'px,0px)';
	aside[f].style.bottom = this.h+'px';
}
asideol(70,1400,20);

get('http://study.163.com/webDev/hotcouresByCategory.htm',{},
	function (data) {
		var data = JSON.parse(data);
		for (var i = 0; i < data.length; i++) {
			asideimg[i].src = data[i].smallPhotoUrl;
			h5[i].innerText = data[i].name;
			asidenum[i].innerText = data[i].learnerCount;
		}
	}
)
// aside自动轮转的效果。
// 定时5s切换一条。
// 利用css3 translate3d属性+bottom属性做到无缝切换


var table = document.getElementById('table'),
	hov = getElementsByClassName(table, 'hov'),
	tabh3 = getElementsByClassName(table, 'f-tab-h3'),
	tabimg = getElementsByClassName(table, 'f-tab-img'),
	tabtext = getElementsByClassName(table, 'f-tab-text'),
	tabbc = getElementsByClassName(table, 'f-tab-bc'),
	tabmon = getElementsByClassName(table, 'f-tab-mon'),
	hovnimg = getElementsByClassName(table, 'tab-hover-img'),
	hovnh3 = getElementsByClassName(table, 'h-h3'),
	hovnnum = getElementsByClassName(table, 'num'),
	hovnprom = getElementsByClassName(table, 'prom'),
	hovncn = getElementsByClassName(table, 'classname'),
	hovndetail = getElementsByClassName(table, 'detail'),
	tabhovn = getElementsByClassName(table, 'tab-hover'),
	tabclick = getElementsByClassName(document, 'f-tab-head-m'),
	page = document.getElementById('page'),
	pageli = page.getElementsByTagName('li'),
	next = getElementsByClassName(page, 'pagett');
for (var i = 0; i < hov.length; i++) {
	function acs(i){
		hover(hov[i],function(){tabhovn[i].style.display = 'block';tabh3[i].style.color = '#39a030'},
			function(){tabhovn[i].style.display = 'none';tabh3[i].style.color = 'black'})
	}
	acs(i);
}
function tablook(a,b,c) {	
	get('http://study.163.com/webDev/couresByCategory.htm',{pageNo:Number(a),psize:Number(b),type:Number(c)},
	function (data) {
		var data = JSON.parse(data);
		for (var i = 0; i < data.list.length; i++) {
			tabimg[i].src = data.list[i].middlePhotoUrl;
			tabh3[i].innerText = data.list[i].name;
			tabtext[i].innerText = data.list[i].provider;
			tabbc[i].innerText = data.list[i].learnerCount;
			if (data.list[i].price == 0) {
				tabmon[i].innerText = '免费'
			}else{
			tabmon[i].innerText = '¥'+' '+data.list[i].price;
			}
			hovnimg[i].src = data.list[i].middlePhotoUrl;
			hovnh3[i].innerText = data.list[i].name;
			hovnnum[i].innerText = data.list[i].learnerCount;
			hovnprom[i].innerText = data.list[i].provider;
			hovncn[i].innerText = data.list[i].categoryName;
			hovndetail[i].innerText = data.list[i].description;
			index = data.pagination.pageIndex;
			total = data.totalPage;

		}
	})
}
		addEvent(tabclick[0],'click',function () {
			tabclick[1].className = 'f-tab-head-m';
			tabclick[0].className = 'f-tab-head-m hovt';
			tablook(index,20,10);
			});
		addEvent(tabclick[1],'click',function () {
			tabclick[1].className = 'f-tab-head-m hovt';
			tabclick[0].className = 'f-tab-head-m';
			tablook(index,20,20);
			});
		function nextn(u) {
			for (var n = 1; n < pageli.length-1; n++) {
				pageli[n].className = '';
			}
			pageli[u].className = 'pageactv';
			tabclick[1].className = 'f-tab-head-m';
			tabclick[0].className = 'f-tab-head-m hovt';
		}
		addEvent(next[0],'click',function() {
			tablook(index-1,20,10);
			var u = index-1;
			nextn(u);
		})
		addEvent(next[1],'click',function() {
			tablook(index+1,20,10);
			var u = index+1;
			nextn(u);
		})
function li(i){
		addEvent(pageli[i],'click',function (){
			for (var n = 1; n < pageli.length-1; n++) {
				pageli[n].className = '';
			}
			pageli[i].className = 'pageactv';
			tabclick[1].className = 'f-tab-head-m';
			tabclick[0].className = 'f-tab-head-m hovt';
			tablook(i,20,10);
		})
	}
for (var i = 1; i < pageli.length-1; i++) {
	li(i);
}
tablook(1,20,10);
// 展示区利用普通的Ajax写入，
// 所有按键正常

var mvideo = document.getElementById('m-video'),
    offvideo = getElementsByClassName(mvideo,'lyclose'),
    onvideo = getElementsByClassName(document,'f-aside-t-img'),
    imgicon = getElementsByClassName(document,'img-icon');
    addEvent(offvideo[0],'click',function(){
    	mvideo.style.display = 'none';
    })
    addEvent(onvideo[0],'click',function(){
    	mvideo.style.display = 'block';
    })
    hover(onvideo[0],function(){
    	imgicon[0].style.opacity = 1;
    	imgicon[0].style.top = '32px';
    	},function(){
    	imgicon[0].style.opacity = 0;
    	imgicon[0].style.top = '50px';
    	})