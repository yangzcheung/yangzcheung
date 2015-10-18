<?php
$page=$_GET['page'];

$page_size=10;

$sql='SELECT * FROM flow LIMIT '.($page-1)*$page_size.','.$page_size.';';

mysql_connect('localhost', 'root', '');
mysql_select_db('20150603');
$res=mysql_query($sql);

$str='';

$str.='[';

$first=true;

while($row=mysql_fetch_row($res))
{
	if($first)
	{
		$str.='{src: "'.$row[0].'"}';
		$first=false;
	}
	else
	{
		$str.=',{src: "'.$row[0].'"}';
	}
}

$str.=']';


echo $str;











?>