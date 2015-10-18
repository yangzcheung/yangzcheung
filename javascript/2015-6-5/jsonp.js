//版权 北京智能社©, 保留所有权利

function jsonp(url, data, fn)
{
	data.cb='jsonp'+Math.random();
	data.cb=data.cb.replace('.', '');
	
	//
	var arr=[];
	for(var i in data)
	{
		arr.push(i+'='+encodeURIComponent(data[i]));
	}
	var str=arr.join('&');
	
	//
	window[data.cb]=function (json)
	{
		fn(json);
		
		oHead.removeChild(oS);
		window[data.cb]=null;	//更好
	};
	
	//jsonp
	var oS=document.createElement('script');
	oS.src=url+'?'+str;
	
	var oHead=document.getElementsByTagName('head')[0];
	oHead.appendChild(oS);
}