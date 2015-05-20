<?php
	require_once 'simple_html_dom.php';

	$urls = array(
		'latest'   => "http://www.mizukinana.jp/news/index.html",
		'voice'	   => "http://www.mizukinana.jp/news/voice.html",
		'media'    => "http://www.mizukinana.jp/news/media.html",
		'cd-dvd'   => "http://www.mizukinana.jp/news/cd-dvd.html",
		'live'	   => "http://www.mizukinana.jp/news/live.html",
		'magazine' => "http://www.mizukinana.jp/news/magazine.html",
		'web' 	   => "http://www.mizukinana.jp/news/web.html",
		'other'	   => "http://www.mizukinana.jp/news/other.html"
	);


	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);


	//$url = "http://www.mizukinana.jp/news/index.html";

	/*foreach (getCon($urls['latest']) as $tag) {
		echo $tag->plaintext;
	}*/
	$json_data = json_encode(getCon($urls['latest']));
	echo $json_data;

function getCon($url){
	$html = file_get_html($url);
	$rtn = $html->find('h3');
	return $rtn;
}