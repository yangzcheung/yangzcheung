//版权 北京智能社©, 保留所有权利
define(function(require,exports,module){
	
	exports.getStyle = 	function(obj,name){
	
		return (obj.currentStyle || getComputedStyle(obj,false))[name];
	}
	
});