//版权 北京智能社©, 保留所有权利

define(function(require,exports,module){
	
	//module 优先  module  exports 不能共存
	/*module.exports = {
		b : 5	
	};
	
	
	exports.a = 12;
	*/
	alert(module.exports == exports);
		
});

