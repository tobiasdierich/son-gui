<?php

$vars = array();
$debug=false;
$vars['MON_URL']=($debug==true?'http://192.168.1.127:8000':getenv('MON_URL'));
/*$vars['MON_URL']=($debug==true?'192.168.1.50:8000':getenv('MON_URL'));*/
$vars['GK_URL']=($debug==true?'https://sp.int3.sonata-nfv.eu/api/v2':getenv('GK_URL'));
$vars['LOGS_URL']=($debug==true?'http://logs.sonata-nfv.eu:12900':getenv('LOGS_URL'));
$vars['VIMS_URL']=($debug==true?'https://sp.int3.sonata-nfv.eu/api/v2':getenv('GK_URL'));

echo json_encode($vars);

?>
