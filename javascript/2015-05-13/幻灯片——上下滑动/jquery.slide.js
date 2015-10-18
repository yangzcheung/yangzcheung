//版权 北京智能社©, 保留所有权利

$.fn.slide = function (){
	
	 var $aBtn = this.find("ol li");
	 var $oUl =  this.find("ul");
	 var $aLi =  this.find("ul li");
	 
	 var iNow = 0;
	 
	 function next(){
		iNow++;
		if(iNow == $aLi.length){
			iNow = 0;
		}	 
		tab();
	 }
	 
	 var timer = setInterval(next,1000);
	 
	 this.hover(function(){
		 clearInterval(timer);
	 },function(){
		 timer = setInterval(next,1000);
	 });
	 
	 $aBtn.mouseover(function(){
		iNow = $(this).index();
		tab();
	 });
	 
	 function tab(){
		 $aBtn.removeClass("active");
		 $aBtn.eq(iNow).addClass("active"); 
		 
		 $oUl.stop().animate({top:-$aLi.height()*iNow +"px"});	 
	 }
}