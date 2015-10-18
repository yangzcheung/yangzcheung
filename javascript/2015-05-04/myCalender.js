//版权 北京智能社©, 保留所有权利


(function(){
	
window.myCalender = function(name){
	var oText = document.getElementsByName(name)[0];
	
	oText.onfocus = function(){
		oDiv.style.display = "block";
		oDiv.style.left = oText.offsetLeft + "px";
		oDiv.style.top = oText.offsetHeight +　oText.offsetTop + "px";
	};
	
	
	var oDiv = document.createElement("div");
	oDiv.className = "calender";
	document.body.appendChild(oDiv);
	
	
	var oBtnPrev = document.createElement("a");
	oBtnPrev.className = "prev";
	oBtnPrev.innerHTML = "&lt;&lt";
	oBtnPrev.href = "javascript:;";
	oDiv.appendChild(oBtnPrev);
	
	var oBtnNext = document.createElement("a");
	oBtnNext.className = "next";
	oBtnNext.innerHTML = "&gt;&gt";
	oBtnNext.href = "javascript:;";
	oDiv.appendChild(oBtnNext);
	
	var oSpan = document.createElement("span");
	oDiv.appendChild(oSpan);
	
	//ol
	var oOl = document.createElement("ol");
	oDiv.appendChild(oOl);
	oOl.innerHTML = '<li>一</li>\
    	<li>二</li>\
    	<li>三</li>\
    	<li>四</li>\
    	<li>五</li>\
    	<li class="week_end">六</li>\
    	<li class="week_end">日</li>';
		
	var oUl = document.createElement("ul");
	oDiv.appendChild(oUl);
	
	
	var iNow = 0;//相对于当月
	
	oBtnNext.onclick = function(){
		iNow++;
		refresh();
	};
	
	oBtnPrev.onclick = function(){
		iNow--;
		refresh();
	};
	
	refresh();
	function refresh(){
		
		oUl.innerHTML = "";
		var oDate = new Date();
		oDate.setDate(1);
		oDate.setMonth(oDate.getMonth() + iNow);
		oSpan.innerHTML = oDate.getFullYear()+"年"+(oDate.getMonth()+1)+"月";
		
		var oDate = new Date();
		oDate.setDate(1);
		oDate.setMonth(oDate.getMonth() + iNow);
		oDate.setDate(1);
		var day = oDate.getDay();
		day = day ==0 ? 7 : day;
		day--;
		for(var i = 0; i < day; i++){
			var oLi = document.createElement("li");
			oUl.appendChild(oLi);
		}
		
		
		var oDate = new Date();
		oDate.setDate(1);
		oDate.setMonth(oDate.getMonth() + iNow);
		oDate.setDate(1);
		oDate.setMonth(oDate.getMonth() + 1);
		oDate.setDate(0);
		
		var total = oDate.getDate();
		
		var oDate = new Date();
		oDate.setMonth(oDate.getMonth() + iNow);
		var today = oDate.getDate();
		
		for(var i = 0; i < total; i++){
			var oLi = document.createElement("li");
			oLi.innerHTML = i + 1;
			oUl.appendChild(oLi);
			
			
			if(iNow < 0){//过去
				oLi.className = "past";
			} else if(iNow == 0){// 当月
				if(parseInt(oLi.innerHTML) < today){
					oLi.className = "past";
				} else if(parseInt(oLi.innerHTML) == today){
					oLi.className = "today";
					addClick(oLi);
				} else {
					addClick(oLi);
				}
			} else {//未来
					addClick(oLi);
			}	
			
		}
		
		function addClick(obj){
			console.log(iNow);
			obj.onclick = function(){
				
				var oDate = new Date();
				oDate.setDate(1);
				oDate.setMonth(oDate.getMonth() + iNow);			
				oText.value = oDate.getFullYear() +"-"+(oDate.getMonth()+1)+"-" + this.innerHTML;	
				
				oDiv.style.display = "none";
			};
		}
	
		
		for(var i = 0; i < oUl.children.length; i++){
			if(i%7 == 5 || i%7 == 6){
				
				if(oUl.children[i].className == ""){
					oUl.children[i].className = "week_end";	
				}
			}
		}
	
	}
	

}

})();