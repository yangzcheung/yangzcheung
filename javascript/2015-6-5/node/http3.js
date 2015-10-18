

var http=require('http');

var server=http.createServer(function (request, response){
	//request	请求	被动——输入
	//response	响应	主动——输出

	response.write('sdfasfasdfsdf');
	response.end();
});

//监听——等着——等待连接
server.listen(80);