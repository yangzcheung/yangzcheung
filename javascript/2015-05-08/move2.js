//版权 北京智能社©, 保留所有权利
function getStyle(obj,name){
	return obj.currentStyle ? obj.currentStyle[name] : getComputedStyle(obj,false)[name];
}


/*

easing 匀速  0  加速 1 减速 2

      linear  ease-in  ease-out
 
*/

function move(obj,json,easing,duration,complete){
	
	var start = {};
	var dis = {};
	
	for(var name in json){
	
		if(name == "opacity"){
			start[name] = parseFloat(getStyle(obj,name));
			
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
			switch(easing){
				case "linear":
					 var a = n/count;
					 var cur = start[name] + dis[name]*a;
					 break;
				case "ease-in":
					 var a = n/count;
					 var cur = start[name] + dis[name]*a*a*a;
					 break;
				case "ease-out":
					 var a = 1 - n/count;
					 var cur = start[name] + dis[name]*(1- a*a*a);
					 break;
			}/* end switch  */
			
			if(name == "opacity"){
				obj.style.opacity = cur;
				obj.style.filter = "alpha(opacity:"+cur*100+")";
			} else {
				obj.style[name] = cur + "px";
			}/* end if  */
			
		}/* end for loop */
		
		if(n == count){
			clearInterval(obj.timer);
			complete && complete();
		}	
	},30);
	
}