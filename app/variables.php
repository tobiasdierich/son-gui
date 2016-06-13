<?php

$vars = array();
$debug=true;
$vars['MON_URL']=($debug==true?'sp.int3.sonata-nfv.eu:8000':getenv('MON_URL'));
$vars['GK_URL']=($debug==true?'sp.int3.sonata-nfv.eu:32001':getenv('GK_URL'));

echo json_encode($vars);

?>
