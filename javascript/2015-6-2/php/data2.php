<?php
//data2.php?user=用户名&pass=密码

$user=$_GET['user'];
$pass=$_GET['pass'];

if($user=='blue' && $pass=='123456')
{
	echo '{ok: true, msg: "成功"}';
}
else
{
	echo '{ok: false, msg: "用户名或密码错误"}';
}
?>