//版权 北京智能社©, 保留所有权利

define(function(require,exports,module){
	
	var modUtil = require("util");
	var modTween = require("Tween");
	
//options  duration complete  easing  linear  ease-in ease-out
exports.move = function (obj,json,options){
	options = options || {};
	options.duration = options.duration || 700;
	options.easing = options.easing || modTween.Tween.Bounce.easeOut;

	var start = {};
	var dis = {};
	
	for(var name in json){
		
		start[name] = parseFloat(modUtil.getStyle(obj,name));
		
		dis[name] = json[name] - start[name];
	}
	
	
	var count = Math.round(options.duration/30);
	var n = 0;
	
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		
		for(var name in json){
/*
t: current time,    
b: begInnIng value,   start
c: change In value,   dis
d: duration           time

*/
			var cur = options.easing(n/count*options.duration,start[name],dis[name],options.duration);
			
			if(name == "opacity"){
				obj.style.opacity = cur;
				obj.style.filter = "alpha(opacity:"+cur*100+")";
			} else {
				obj.style[name] = cur + "px";
			}
		}
		if(n == count){
			clearInterval(obj.timer);
			options.complete &&　options.complete.call(obj);
		}	
	},30);
		
}

});






