<?php



$vars = array();
$vars['MON_URL']=getenv('MON_URL');
$vars['GK_URL']=getenv('GK_URL');
echo json_encode($vars);


?>