//版权 北京智能社©, 保留所有权利
function getStyle(obj,name){
	return obj.currentStyle ? obj.currentStyle[name]: getComputedStyle(obj,false)[name];
}

function move(obj,name,iTarget,time,fnEnd){
	if(name == "opacity"){
		var start = parseFloat(getStyle(obj,name));
	} else {
		var start = parseInt(getStyle(obj,name));
	}
	
	var dis = iTarget - start;
	var count = Math.round(time/30);
	var n = 0;
	
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		
		var cur = start + dis/count*n;
		if(name == "opacity"){
			 obj.style.opacity = cur;
			 obj.style.filter = "alpha(opacity:"+cur*100+")"
		} else {
			obj.style[name] = cur + "px"; 
		}
		
		if(n == count){
			clearInterval(obj.timer);
			fnEnd && fnEnd();
		}	
	},30);
	
}