<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>无标题文档</title>
</head>

<body>
<?php
/*
echo '用户名：'.$_POST['user'].'<br/>'.'密码：'.$_POST['pass'];
*/

$user=$_GET['user'];
$pass=$_GET['pass'];

if($user=='blue' && $pass=='123456')
{
	echo '登陆成功';
}
else
{
	echo '登陆失败';
}
?>
</body>
</html>





