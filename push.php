<?php
//从百度服务器获取授权,oauth doc http://developer.baidu.com/wiki/index.php?title=docs/oauth/client
$tokenUrl = "https://openapi.baidu.com/oauth/2.0/token?";
$query = array(
	"grant_type"=>"client_credentials",
	"client_id"=>"I58ECFzaGKYyy2LR3sHB2pis",
	"client_secret"=>"FPNHh51ZRUdipMEucfTwLVyGlCcDShUU",
	"scope"=>""
);

$url = $tokenUrl.http_build_query($query);

$authorization = file_get_contents($url);

$data = json_decode($authorization,1);

//var_dump($data);

//开始消息推送 doc https://openapi.baidu.com/rest/2.0/lightapp/msg/push
$pushUrl = "https://openapi.baidu.com/rest/2.0/lightapp/msg/push";

$access_token = $data['access_token'];

$type = isset($_POST['type']) && $_POST['type'] == 1?1:2;
$push_token = $_POST['push_token'];
$tag = $_POST['tag'];
$title = isset($_POST['title'])?$_POST['title']:'welcome to clouda world';
$content = isset($_POST['content'])?$_POST['content']:'clouda is perfect! timestamp:'.time();
$url = isset($_POST['url'])?$_POST['url']:'http://blenddemo.duapp.com';
isset($tag) && $content = "订阅Tag:".$tag."|".$content;


$params = array(
	"access_token"=>$access_token,
	"type"=>$type,
	"push_token"=>$push_token,
	"tag"=>$tag,
	"title"=>$title,
	"content"=>$content,
	"url"=>$url
);

function post($uri,$params){
	$ch = curl_init ();
	curl_setopt ( $ch, CURLOPT_URL, $uri);
	curl_setopt ( $ch, CURLOPT_POST, 1 );
	curl_setopt ( $ch, CURLOPT_HEADER, 0 );
	curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, 1 );
	curl_setopt ( $ch, CURLOPT_POSTFIELDS, $params);
	$result = curl_exec ( $ch );
	curl_close ( $ch );
	return $result;
}

echo post($pushUrl,$params);
