//版权 北京智能社©, 保留所有权利

(function($){
$.fn.drag = function(){
	return this.each(function(){
		$(this).mousedown(function(ev){
			var _this = this;
			var disX = ev.clientX - $(this).position().left;
			var disY = ev.clientY - $(this).position().top;
			function move(ev){
				$(_this).css({
					left:ev.clientX - disX + "px",
					top:ev.clientY - disY + "px"	
				});
			}
			function up(){
				$(document).unbind("mousemove",move);
				$(document).unbind("mouseup",up);	
				_this.releaseCapture && _this.releaseCapture();
			}
			$(document).mousemove(move);
			$(document).mouseup(up);
			this.setCapture && this.setCapture();
			return false;	
		});
	
	});/* end jq each */
};
})(jQuery);