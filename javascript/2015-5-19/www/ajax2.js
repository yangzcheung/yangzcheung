//版权 北京智能社©, 保留所有权利

function ajax(url, json, fnSucc, fnFaild)
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
	
	//2.连接
	oAjax.open('get', url+'?'+str, true);
	
	//3.发送
	oAjax.send();
	
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
}