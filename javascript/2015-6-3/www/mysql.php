<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>无标题文档</title>
</head>

<body>
<?php
//1.连接
mysql_connect('localhost', 'root', '');

//2.选择库
mysql_select_db('20150603');

//3.发请求
$res=mysql_query('SELECT * FROM user_table');

//4.获取数据
while($row=mysql_fetch_row($res))
{
	echo '名字：'.$row[0].' 密码：'.$row[1].'<br/>';
}
?>
</body>
</html>
