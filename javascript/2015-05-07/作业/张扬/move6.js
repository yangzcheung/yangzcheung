//版权 北京智能社©, 保留所有权利
function getStyle(obj,name){
	return obj.currentStyle ? obj.currentStyle[name]: getComputedStyle(obj,false)[name];
}

//json name,iTarget
//options duration,complete
function move(obj,json,easing,options){
	
	options = options || {};
	options.duration = options.duration || 700;

	var start = {};
	var dis = {};

	for(var name in json){
	
		if(name == "opacity"){
			start["opacity"] = parseFloat(getStyle(obj,name));
		} else {
			 start[name] = parseInt(getStyle(obj,name));
		}
		
		dis[name] = json[name] - start[name];
	
	}
	
	var count = Math.round(options.duration/30);
	var n = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
	
		
		for(var name in json){
			
		
			switch(easing){
				case "linear":
					var a=n/count;
					break;
				case "ease-in":
					var a=n/count;
					a=a*a*a;
					break;
				case "ease-out":
					var a=1-n/count;
					a=1-a*a*a;
					break;
			}
			var cur = start[name] + dis[name]*a;
			if(name == "opacity"){
				 obj.style.opacity = cur;
				 obj.style.filter = "alpha(opacity:"+cur*100+")"
			} else {
				obj.style[name] = cur + "px"; 
			}
		} 
		
		if(n == count){
			clearInterval(obj.timer);
			options.complete && options.complete();
		}	
	},30);
	
}