<?php
$con = mysqli_connect("127.0.0.1", "root", "", "liebiaoa");

$json = file_get_contents("./wares.json");

$data = json_decode($json, true);

for ($i = 0; $i < count($data); $i++) {
  $title = $data[$i]["title"];
  $txt = $data[$i]["txt"];
  $img = $data[$i]["img"];
  $minimg = $data[$i]["minimg"];
  $price = $data[$i]["price"];
  $del = $data[$i]["del"];
  $discount = $data[$i]["discount"];
  $free = $data[$i]["free"];

  $sql = "INSERT INTO `wares` (`gid`, `title`, `txt`, `img`,`minimg`, `price`, `del`, `discount`, `free`) VALUES ('$i', '$title', '$txt', '$img', '$minimg', '$price', '$del', '$discount', '$free')";
  mysqli_query($con, $sql);
}
?>