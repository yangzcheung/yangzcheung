//版权 北京智能社©, 保留所有权利

(function(window,$){
	
var added = false;
$.fn.myRadio = function(){
	
	var $aRadio = this;
	var aSpan = [];
	$aRadio.each(function(index, element) {
        var $oSpan = $('<span class="my_radio"></span>');
		aSpan.push($oSpan);
		$oSpan.insertBefore($aRadio[index]);
		
		$oSpan.click(function(){
			$(aSpan).each(function(index, element) {
                this.removeClass("my_radio_active").addClass("my_radio");
            });	
			
			$(this).removeClass("my_radio").addClass("my_radio_active");
			
			$aRadio.eq(index).attr("checked",true);
			
		});
    });
	$aRadio.hide();
	
	if(added) return;
	added = true;
	
	var $oLink = $("<link />");
	$oLink.prop({
		rel:"stylesheet",
		href :"jquery.myradio.css"
	});
	
	$oLink.appendTo(document.body);

}

})(window,jQuery);