<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>无标题文档</title>
</head>

<body>
<?php
//1.连接
//mysql_connect(地址, 用户名, 密码)
mysql_connect('localhost', 'root', '');

//2.选择库
mysql_select_db('20150602');

//3.发送请求
//query——查询
$res=mysql_query('SELECT * FROM user_table;');

//4.接收数据
//取一条数据
while($row=mysql_fetch_row($res))
{
	echo '用户名：'.$row[0].' 密码：'.$row[1].'<br/>';
}










?>
</body>
</html>