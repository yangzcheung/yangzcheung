

var http=require('http');
var fs=require('fs');

var server=http.createServer(function (request, response){
	//request	请求	被动——输入
	//response	响应	主动——输出

	//request.url='/a.html';

	fs.readFile('www'+request.url, function (err, data){
		if(err)
			response.write('404');
		else
			response.write(data);

		response.end();
	});
});

//监听——等着——等待连接
server.listen(80);