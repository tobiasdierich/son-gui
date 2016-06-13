<?php


$ch = curl_init();
$source = "http://sp.int.sonata-nfv.eu:32001/packages";
curl_setopt($ch, CURLOPT_URL, $source);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$data = curl_exec ($ch);
curl_close ($ch);

$destination = "/afile.zip";
$file = fopen($destination, "w+");
fputs($file, $data);
fclose($file);
echo 1;
$content = file_get_contents("http://sp.int.sonata-nfv.eu:32001/packages");
file_put_contents("local.zip", $content);

echo 2;
?>