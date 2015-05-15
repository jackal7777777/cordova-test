<?php
	$url = "http://www.mizukinana.jp/news/index.html";

	echo getContent($url);


function getContent($url){
	$rtn = null;
	$opts = array(
            'http'=>array(
                    'method'=>"GET",
                    'header'=>"Accept-language: ja\r\n" 
            )
    );
    $context = stream_context_create($opts);

    $file = file_get_contents($url, false, $context);
    $file = mb_convert_encoding($file, 'UTF-8', mb_detect_encoding($file));

    libxml_use_internal_errors(TRUE);
    $document = new DOMDocument();
    $document->recover = 1;
    $document->loadHTML($file);

    $body = $document->getElementsByTagName('body');
    $childelms = $body->item(0)->childNodes;
    for($i=0; $childelms->length > $i; $i++) {
      $rtn .= $document->saveXML($childelms->item($i));
    }

    //$rtn = mb_convert_encoding($rtn, $charset,'UTF-8');
    libxml_use_internal_errors(FALSE);
    return $rtn;
}