<?php
$gid = $_REQUEST["gid"];

$con = mysqli_connect("127.0.0.1", "root", "", "liebiaoa");

$sql = "SELECT * FROM  wares WHERE gid = $gid";
$result = mysqli_query($con,$sql);

$data = array("status" => "success", "msg" => "请求成功", "data" => mysqli_fetch_all($result, MYSQLI_ASSOC));
echo json_encode($data, true);






















?>