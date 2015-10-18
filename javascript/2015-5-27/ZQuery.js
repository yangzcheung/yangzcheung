//版权 北京智能社©, 保留所有权利

function ZQuery(arg)
{
	this.elements=[];		//存元素
	
	switch(typeof arg)
	{
		case 'function':
			addReady(arg);
			break;
		case 'string':
			this.elements=getEle(arg);
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
};

//自定义事件
ZQuery.prototype.hover=function (fnOver, fnOut)
{
	this.mouseenter(fnOver);
	this.mouseleave(fnOut);
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
};

//-----------------------------------------------

//DOM——创建、插入、删除

//动画

//ajax

//插件
















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






