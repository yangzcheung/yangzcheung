//版权 北京智能社©, 保留所有权利
$.fn.addMouseWheel = function(fn){

	if(window.navigator.userAgent.toLowerCase().indexOf("firefox") != -1){
		//this.bind("DOMMouseScroll",fnWheel);
		this[0].addEventListener("DOMMouseScroll",fnWheel,false);
	} else {
		//this.bind("mousewheel",fnWheel);
		this[0].onmousewheel = fnWheel
	}
	
	function fnWheel(ev){
		var oEvent = ev || event;	
		var bDown = true;
		/*
			ie  chrome   wheelDelta 上 120 下 -120
			ff   detail    上 -3  下3
		*/
	 
		if(oEvent.wheelDelta){
			bDown = oEvent.wheelDelta > 0 ? false : true;
		} else {
			bDown = oEvent.detail > 0 ? true : false; 
		}
		
		fn && fn.call(this,bDown);
		oEvent.preventDefault && oEvent.preventDefault();
		return false;
	}/* end fn fnWheel */
	
	
};/* end fn addMouseWheel */
