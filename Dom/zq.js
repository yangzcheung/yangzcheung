
function ZQuery(arg)
{
	this.domString='';		//存待创建的字符串
	this.elements=[];		//存元素
	
	switch(typeof arg)
	{
		case 'function':
			addReady(arg);
			break;
		case 'string':
			if(arg.indexOf('<')!=-1)	//创建
			{
				this.domString=arg;
			}
			else						//选择
			{
				this.elements=getEle(arg);
			}
			break;
		case 'object':
			this.elements.push(arg);
			break;
	}
}

//加事件
(function (){
	function _addEv(name)
	{
		ZQuery.prototype[name]=function (fn)
		{
			for(var i=0;i<this.elements.length;i++)
			{
				addEvent(this.elements[i], name, fn);
			}
			
			return this;
		};
	}
	var _arrEv=['click', 'mouseover', 'mouseout', 'mousedown', 'mousemove', 'mouseup', 'mouseenter', 'mouseleave'];
	for(var i=0;i<_arrEv.length;i++)
	{
		_addEv(_arrEv[i]);
	}
})();

ZQuery.prototype.css=function (name, value)
{
	if(arguments.length==2)
	{
		for(var i=0;i<this.elements.length;i++)
		{
			this.elements[i].style[name]=value;
		}
	}
	else
	{
		if(typeof name=='string')
		{
			return getStyle(this.elements[0], name);
		}
		else
		{
			for(var i=0;i<this.elements.length;i++)
			{
				for(var j in name)
				{
					this.elements[i].style[j]=name[j];
				}
			}
		}
	}
	
	return this;
};

ZQuery.prototype.attr=function (name, value)
{
	if(arguments.length==2)
	{
		for(var i=0;i<this.elements.length;i++)
		{
			//this.elements[i][name]=value;
			this.elements[i].setAttribute(name, value);
		}
	}
	else
	{
		if(typeof name=='string')
		{
			//return this.elements[0][name];
			
			return this.elements[0].getAttribute(name);
		}
		else
		{
			for(var i=0;i<this.elements.length;i++)
			{
				for(var j in name)
				{
					//this.elements[i][j]=name[j];
					this.elements[i].setAttribute(j, name[j]);
				}
			}
		}
	}
	
	return this;
};

//自定义事件
ZQuery.prototype.hover=function (fnOver, fnOut)
{
	this.mouseenter(fnOver);
	this.mouseleave(fnOut);
	
	return this;
};

ZQuery.prototype.toggle=function ()
{
	var _this=this;
	var _arg=arguments;
	//计数
	//var count=0;
	
	for(var i=0;i<this.elements.length;i++)
	{
		//this.elements[i].count=0;
		(function (count){
			addEvent(_this.elements[i], 'click', function (ev){
				var n=count%_arg.length;
				
				_arg[n].call(this, ev);
				
				count++;
			});
		})(0);
	}
	
	return this;
};

//-----------------------------------------------

//DOM——创建、插入、删除
ZQuery.prototype.appendTo=function (str)
{
	var aParent=getEle(str);
	
	for(var i=0;i<aParent.length;i++)
	{
		append(aParent[i], this.domString);
	}
	
	return this;
};

ZQuery.prototype.remove=function ()
{
	for(var i=0;i<this.elements.length;i++)
	{
		this.elements[i].parentNode.removeChild(this.elements[i]);
	}
	
	return this;
};

//动画
ZQuery.prototype.animate=function (json)
{
	for(var i=0;i<this.elements.length;i++)
	{
		move(this.elements[i], json);
	}
	
	return this;
};

//ajax
$.ajax=ajax;

//插件
$.fn=ZQuery.prototype;

$.fn.extend=function (json)
{
	for(var i in json)
	{
		ZQuery.prototype[i]=json[i];
	}
};

function $(arg)
{
	return new ZQuery(arg);
}

//--------------------------------------------------------------

function addEvent(obj, sEv, fn)
{
	if(obj.addEventListener)
	{
		obj.addEventListener(sEv, fn, false);
	}
	else
	{
		obj.attachEvent('on'+sEv, function (){
			fn.call(obj, event);
		});
	}
}

function addReady(fn)
{
	if(document.addEventListener)
	{
		document.addEventListener('DOMContentLoaded', fn, false);
	}
	else
	{
		document.attachEvent('onreadystatechange', function (){
			if(document.readyState=='complete')
			{
				fn();
			}
		});
	}
}

function getStyle(obj, name)
{
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
}

function getByClass(oParent, sClass)
{
	if(oParent.getElementsByClassName)
	{
		return oParent.getElementsByClassName(sClass);
	}
	else
	{
		var result=[];
		var aEle=oParent.getElementsByTagName('*');
		var re=new RegExp('\\b'+sClass+'\\b');
		
		for(var i=0;i<aEle.length;i++)
		{
			if(re.test(aEle[i].className))
			{
				result.push(aEle[i]);
			}
		}
		
		return result;
	}
}

function _getByStr(aParent, str)
{
	var aChild=[];
	
	for(var i=0;i<aParent.length;i++)
	{
		switch(str.charAt(0))
		{
			case '#':
				var obj=document.getElementById(str.substring(1));
				
				aChild.push(obj);
				break;
			case '.':
				var arr=getByClass(aParent[i], str.substring(1));
				
				for(var j=0;j<arr.length;j++)
				{
					aChild.push(arr[j]);
				}
				break;
			default:
				//li	li.box	li#li1	li:eq(xxx)	input[value=aaa]
				//li.box
				//英文、数字	.	英文、数字、下划线、中划线
				if(/^[a-z0-9]+\.[\w\-]+$/i.test(str))
				{
					var aStr=str.split('.');
					
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					
					var re=new RegExp('\\b'+aStr[1]+'\\b');
					for(var j=0;j<arr.length;j++)
					{
						if(re.test(arr[j].className))
						{
							aChild.push(arr[j]);
						}
					}
				}
				//li#li1
				else if(/^[a-z0-9]+#[\w\-]+$/i.test(str))
				{
					var aStr=str.split('#');
					
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					
					for(var j=0;j<arr.length;j++)
					{
						if(arr[j].id==aStr[1])
						{
							aChild.push(arr[j]);
						}
					}
				}
				//li:has()
				//英文、数字	:	英文	(任何东西)?
				else if(/^[a-z0-9]+:[a-z]+(\(.+\))?$/i.test(str))
				{
					//str='li:eq(xxx)'
					var aStr=str.split(/:|\(|\)/);
					//aStr=['li', 'eq', 'xxx', ]
					
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					
					switch(aStr[1])
					{
						case 'eq':
							var n=parseInt(aStr[2]);
							
							aChild.push(arr[n]);
							break;
						case 'first':
							aChild.push(arr[0]);
							break;
						case 'last':
							aChild.push(arr[arr.length-1]);
							break;
						case 'odd':
							/*
							for(var j=0;j<arr.length;j++)
							{
								if(j%2==1)
								{
									aChild.push(arr[j]);
								}
							}
							*/
							for(var j=1;j<arr.length;j+=2)
							{
								aChild.push(arr[j]);
							}
							break;
						case 'gt':
							var n=parseInt(aStr[2]);
							for(var j=n+1;j<arr.length;j++)
							{
								aChild.push(arr[j]);
							}
							break;
					}
				}
				//input[value=任何]
				else if(/^[a-z0-9]+\[[\w\-]+=.+\]$/i.test(str))
				{
					var aStr=str.split(/\[|=|\]/);
					//aStr=['input', 'value', '值', ]
					
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					
					for(var j=0;j<arr.length;j++)
					{
						if(arr[j].getAttribute(aStr[1])==aStr[2])
						{
							aChild.push(arr[j]);
						}
					}
				}
				//li
				else
				{
					var arr=aParent[i].getElementsByTagName(str);
					
					for(var j=0;j<arr.length;j++)
					{
						aChild.push(arr[j]);
					}
				}
				break;
		}
	}
	
	return aChild;
}

function getEle(str)
{
	var arr=str.match(/\S+/g);
	
	var aParent=[document];
	var aChild=[];
	
	for(var i=0;i<arr.length;i++)
	{
		aChild=_getByStr(aParent, arr[i]);
		
		aParent=aChild;
	}
	
	return aChild;
}

function append(oParent, str)
{
	var oTmp=document.createElement('div');
	
	oTmp.innerHTML=str;
	
	while(oTmp.childNodes.length>0)
	{
		oParent.appendChild(oTmp.childNodes[0]);
	}
}

function move(obj, json, options)
{
	options=options||{};
	options.type=options.type||'ease-out';
	options.time=options.time||700;
	
	var start={};
	var dis={};
	
	for(var name in json)
	{
		start[name]=parseFloat(getStyle(obj, name));
		dis[name]=json[name]-start[name];
	}
	
	var count=Math.round(options.time/30);
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		n++;
		
		for(var name in json)
		{
			switch(options.type)
			{
				case 'linear':
					var cur=start[name]+dis[name]*n/count;
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[name]+dis[name]*a*a*a;
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[name]+dis[name]*(1-a*a*a);
					break;
			}
			
			if(name=='opacity')
			{
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}
			else
			{
				obj.style[name]=cur+'px';
			}
		}
		
		if(n==count)
		{
			clearInterval(obj.timer);
			
			options.end && options.end();
		}
	}, 30);
}

function ajax(options)
{
	options=options||{};
	options.data=options.data||{};
	options.type=options.type||'get';
	options.timeout=options.timeout||0;
	
	//
	var arr=[];
	for(var i in options.data)
	{
		arr.push(i+'='+encodeURIComponent(options.data[i]));
	}
	var str=arr.join('&');
	
	//1.创建
	if(window.XMLHttpRequest)
	{
		var oAjax=new XMLHttpRequest();
	}
	else
	{
		var oAjax=new ActiveXObject('Microsoft.XMLHttp');
	}
	
	if(options.type=='post')
	{
		oAjax.open('post', options.url, true);
		oAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		oAjax.send(str);
	}
	else
	{
		oAjax.open('get', options.url+'?'+str, true);
		oAjax.send();
	}
	
	//4.接收
	oAjax.onreadystatechange=function ()
	{
		//readyState==4		完成
		if(oAjax.readyState==4)
		{
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304)
			{
				options.success && options.success(oAjax.responseText);
			}
			else
			{
				options.error && options.error();
			}
		}
	};
	
	//超时
	if(options.timeout)
	{
		setTimeout(function (){
			oAjax.abort();
		}, options.timeout);
	}
}


