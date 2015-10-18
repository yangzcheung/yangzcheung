//版权 北京智能社©, 保留所有权利
function getStyle(obj,name){
	return obj.currentStyle ? obj.currentStyle[name]: getComputedStyle(obj,false)[name];
}

//json name,iTarget
function move(obj,json,duration,complete){
	/*
	    json name,iTarget
	         width  400
			 height 400
	*/
	
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
	
	var count = Math.round(duration/30);
	var n = 0;
	
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		
		for(var name in json){
			var cur = start[name] + dis[name]/count*n;
			if(name == "opacity"){
				 obj.style.opacity = cur;
				 obj.style.filter = "alpha(opacity:"+cur*100+")"
			} else {
				obj.style[name] = cur + "px"; 
			}
		} 
		
		if(n == count){
			clearInterval(obj.timer);
			complete && complete();
		}	
	},30);
	
}