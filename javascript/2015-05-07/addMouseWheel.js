//版权 北京智能社©, 保留所有权利
function addMouseWheel(obj,fn){
	
	if(window.navigator.userAgent.toLowerCase().indexOf("firefox") != -1){
		obj.addEventListener("DOMMouseScroll",fnWheel,false);	
	} else {
		obj.onmousewheel = fnWheel;
	}
	
	function fnWheel(ev){
		var oEvent = ev || event;
		var bDown = true;
		
		if(oEvent.wheelDelta){
			bDown = oEvent.wheelDelta > 0 ? false : true;
		} else {
			bDown = oEvent.detail > 0 ? true : false;	
		}
		
		fn && fn(bDown);
		
		oEvent.preventDefault && oEvent.preventDefault(); 
		return false;
		
	}
}