<?php

$vars = array();
$debug=false;
$vars['MON_URL']=($debug==true?'sp.int3.sonata-nfv.eu:8000':getenv('MON_URL'));
/*$vars['MON_URL']=($debug==true?'192.168.1.50:8000':getenv('MON_URL'));*/
$vars['GK_URL']=($debug==true?'sp.int3.sonata-nfv.eu:32001':getenv('GK_URL'));
$vars['LOGS_URL']=($debug==true?'10.31.11.37:12900':getenv('LOGS_URL'));
$vars['VIMS_URL']=($debug==true?'sp.int3.sonata-nfv.eu:32001':getenv('GK_URL'));
echo json_encode($vars);

?>
