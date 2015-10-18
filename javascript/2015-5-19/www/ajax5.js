//版权 北京智能社©, 保留所有权利

/*
options:
url, json, type, timeout, fnSucc, fnFaild
*/
function ajax(options)
{
	options=options||{};
	options.json=options.json||{};
	options.type=options.type||'get';
	options.timeout=options.timeout||0;
	var arr=[];
	for(var i in options.json)
	{
		arr.push(i+'='+encodeURIComponent(options.json[i]));
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
				options.fnSucc && options.fnSucc(oAjax.responseText);
			}
			else
			{
				options.fnFaild && options.fnFaild();
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