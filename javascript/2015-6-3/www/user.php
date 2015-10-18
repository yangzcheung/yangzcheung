<?php
$act=$_GET['act'];
$user=$_GET['user'];
$pass=$_GET['pass'];

switch($act)
{
	case 'reg':
		//INSERT INTO user_table VALUES('xiaohong', '111666')
		mysql_connect('localhost', 'root', '');
		mysql_select_db('20150603');
		
		//1.用没用过
		$res=mysql_query("SELECT * FROM user_table WHERE username='".$user."'");
		$row=mysql_fetch_row($res);
		
		if($row)
		{
			echo '{ok: false, msg: "用户名已被占用"}';
		}
		else
		{
			mysql_query("INSERT INTO user_table VALUES('".$user."', '".$pass."')");
			
			echo '{ok: true, msg: "注册成功"}';
		}
		break;
	case 'login':
		//SELECT * FROM user_table WHERE username='blue';
		mysql_connect('localhost', 'root', '');
		mysql_select_db('20150603');
		$res=mysql_query("SELECT * FROM user_table WHERE username='".$user."';");
		
		$row=mysql_fetch_row($res);
		
		if(!$row)	//没这个人
		{
			echo '{ok: false, msg: "没有这个用户"}';
		}
		else
		{
			if($row[1]==$pass)
			{
				echo '{ok: true, msg: "成功"}';
			}
			else
			{
				echo '{ok: false, msg: "密码错误"}';
			}
		}
		break;
}








?>