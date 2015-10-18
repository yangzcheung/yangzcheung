

var http=require('http');

var server=http.createServer(function (){	//回调函数：每当有人请求
	console.log('有人来了');
});

//监听——等着——等待连接
server.listen(80);