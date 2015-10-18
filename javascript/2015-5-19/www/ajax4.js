//版权 北京智能社©, 保留所有权利

function ajax(url, json, type, timeout, fnSucc, fnFaild)
{
	//
	var arr=[];
	for(var i in json)
	{
		arr.push(i+'='+encodeURIComponent(json[i]));
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
	
	if(type=='post')
	{
		oAjax.open('post', url, true);
		oAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		oAjax.send(str);
	}
	else
	{
		oAjax.open('get', url+'?'+str, true);
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
				fnSucc && fnSucc(oAjax.responseText);
			}
			else
			{
				fnFaild && fnFaild();
			}
		}
	};
	
	//超时
	if(timeout)
	{
		setTimeout(function (){
			oAjax.abort();
		}, timeout);
	}
}








