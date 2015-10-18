//版权 北京智能社©, 保留所有权利


(function(){
var added = false;
window.myRadio = function (name){
	
	var aRadio = document.getElementsByName(name);
	var len = aRadio.length;
	var aSpan = [];
	for(var i = 0; i < len; i++){
		(function(index){
			var oSpan = document.createElement("span");
			oSpan.className = "my_radio";
			aSpan.push(oSpan);
			aRadio[i].parentNode.insertBefore(oSpan,aRadio[i]);
		
			oSpan.onclick = function(){
				for(var i = 0; i < len; i++){
					aSpan[i].className = "my_radio";
				}
				this.className = "my_radio_active";	
				
				aRadio[index].checked = true;
			};
		})(i);
		
		aRadio[i].style.display = "none";
		
	}
	
	if(added) return;
	added = true;
	
	
	var oLink = document.createElement("link");
	oLink.rel = "stylesheet";
	oLink.href = "myRadio.css";
	document.body.appendChild(oLink);
	
	
};
})();