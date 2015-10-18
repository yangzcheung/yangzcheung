//版权 北京智能社©, 保留所有权利
define(function(require,exports,module){
	var modMove = require("move");
	exports.slide = function(id){
		var oDiv = document.getElementById(id);
		var aBtn = oDiv.getElementsByTagName("ol")[0].children;
		var oUl  = oDiv.getElementsByTagName("ul")[0];
		
		for(var i = 0; i < aBtn.length; i++){
			
			(function(index){
				aBtn[i].onmouseover = function(){
					for(var i = 0; i < aBtn.length; i++){
						aBtn[i].className = "";
					}
					
					this.className = "active";
					modMove.move(oUl,{top:-150*index});
				};
			})(i);
			
		}
	};
});