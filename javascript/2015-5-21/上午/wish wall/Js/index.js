function getStyle(obj, name)
{
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
}

function move(obj, json, type, time, end)
{
	var start={};
	var dis={};
	
	for(var name in json)
	{
		start[name]=parseFloat(getStyle(obj, name));
		dis[name]=json[name]-start[name];
	}
	
	var count=Math.round(time/30);
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		n++;
		
		for(var name in json)
		{
			switch(type)
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
			
			end && end();
		}
	}, 30);
}
//----------------------------------------------------
var zIndex=2;
function drag(oDiv,obj){
	oDiv.onmousedown=function(ev){
		var oEvent=ev || event;
		
		var disX=oEvent.clientX-obj.offsetLeft;
		var disY=oEvent.clientY-obj.offsetTop;
		obj.style.zIndex=zIndex++;
		obj.style.opacity=0.4;
		obj.style.filter='alpha(opacity:40)';
		
		document.onmousemove=function(ev){
			var oEvent=ev || event;
			
			obj.style.left=oEvent.clientX-disX+'px';
			obj.style.top=oEvent.clientY-disY+'px';	
		}
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;	
			oDiv.releaseCapture && oDiv.releaseCapture();
			obj.style.opacity=1;
			obj.style.filter='alpha(opacity:100)';
		}
		oDiv.setCapture && oDiv.setCapture();
		return false;	
	}	
}
function rnd(n,m){
	return parseInt(Math.random()*(m-n)+n);
}





















