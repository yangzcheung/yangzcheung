//版权 北京智能社©, 保留所有权利
define(function(req,exports,module){
 
 
	//req  名字不能改  只能是require
 	var modA = req("a.js");
	
	alert(modA.a);
});