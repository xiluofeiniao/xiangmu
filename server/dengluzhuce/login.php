<?php
$username = $_REQUEST["username"];
$password = $_REQUEST["password"];

// echo 1111;
$db = mysqli_connect("127.0.0.1", "root", "", "dengluzhuce");
 
$sql = "SELECT * FROM  zhuce WHERE username = '$username'";
$result = mysqli_query($db,$sql);
$data = array("status" => "", "msg" => "", "data" => "");
if(mysqli_num_rows($result) == "0")
{
  $data["status"] = "error";
  $data["msg"] = "登录失败：该用户不存在";
}else{
  $arr = mysqli_fetch_array($result);
  if($arr["password"] != $password)
  {
    $data["status"] = "error";
    $data["msg"] = "登录失败：密码不正确！";
  }else{
    $data["status"] = "success";
    $data["msg"] = "恭喜你，登录成功！";
  }
}

echo json_encode($data, true);
// echo 11;
?>