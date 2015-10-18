//版权 北京智能社©, 保留所有权利

function ZQuery(arg)
{
	this.elements=[];		//存选出来的元素
	
	switch(typeof arg)
	{
		case 'function':	//ready
			addReady(arg);
			break;
		case 'string':		//选择——存起来
			this.elements=getEle(arg);
			break;
		case 'object':
			this.elements.push(arg);
			break;
	}
}

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

var arr=['click', 'mouseover', 'mouseout', 'mousedown', 'mousemove', 'mouseup', 'keydown', 'keyup', 'focus', 'blur', 'change', 'readystatechange', 'load', 'error', 'reset', 'submit', 'scroll', 'resize', 'contextmenu', 'dblclick'];
for(var i=0;i<arr.length;i++)
{
	_addEv(arr[i]);
}

ZQuery.prototype.css=function (name, value)
{
	if(arguments.length==2)			//设置
	{
		for(var i=0;i<this.elements.length;i++)
		{
			this.elements[i].style[name]=value;
		}
	}
	else							//获取、批量设置
	{
		if(typeof name=='string')	//获取
		{
			var obj=this.elements[0];
			
			return getStyle(obj, name);
		}
		else						//批量设置
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






function $(arg)
{
	return new ZQuery(arg);
}




































//----------------------------------------------------

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

function getStyle(obj, name)
{
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
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
			case '#':		//ID
				var obj=document.getElementById(str.substring(1));
				
				aChild.push(obj);
				break;
			case '.':		//class
				var arr=getByClass(aParent[i], str.substring(1));
				
				for(var j=0;j<arr.length;j++)
				{
					aChild.push(arr[j]);
				}
				break;
			default:		//标签
				//li	li.box	li#li1	li:eq(2)	input[value=aaa]
				//li	li.box	li#li1
				
				//英文、数字	.	数字、字母、下划线、中划线
				if(/^[a-z0-9]+\.[\w\-]+$/i.test(str))
				{
					//li.box
					var aStr=str.split('.');
					//aStr[0]='li'		标签
					//aStr[1]='box'		class
					
					//第一步、找出所有li
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					
					//第二步、筛选——className==box
					var re=new RegExp('\\b'+aStr[1]+'\\b');
					for(var j=0;j<arr.length;j++)
					{
						if(re.test(arr[j].className))
						{
							aChild.push(arr[j]);
						}
					}
				}
				
				//英文、数字	#	数字、字母、下划线、中划线
				else if(/^[a-z0-9]+#[\w\-]+$/i.test(str))
				{
					//li#li1
					var aStr=str.split('#');
					//aStr[0]='li'		标签
					//aStr[1]='li1'		ID
					
					//第一关、标签
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					
					//第二关、ID
					for(var j=0;j<arr.length;j++)
					{
						if(arr[j].id==aStr[1])
						{
							aChild.push(arr[j]);
						}
					}
				}
				else
				{
					//纯标签
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
		
		//核心：
		aParent=aChild;
	}
	
	return aChild;
}







