

var http=require('http');

var server=http.createServer(function (request, response){
	//request	请求	被动——输入
	//response	响应	主动——输出

	//1.乱
	//2.更改东西——都得重启
	//3.图片
	switch(request.url)
	{
		case '/a.html':
			response.write('11111111');
			break;
		case '/1.txt':
			response.write('zxcvzxv');
			break;
		case '/aaa/5.html':
			response.write('555555');
			break;
		default:
			response.write('404');
	}
	
	response.end();
});

//监听——等着——等待连接
server.listen(80);