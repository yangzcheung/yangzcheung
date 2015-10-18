

var mysql=require('mysql');

//1.连接 & 选择
var db=mysql.createConnection({host: 'localhost', user: 'root', password: '', database: '20150602'});

//2.发送 & 接收
db.query('SELECT * FROM user_table', function (err, data){
	if(err)
		console.log('查询失败');
	else
		console.log(data);
});