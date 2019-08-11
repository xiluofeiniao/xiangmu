<?php
$con = mysqli_connect("127.0.0.1", "root", "", "liebiaoa");

$gid = $_REQUEST["gid"];
$isactive = $_REQUEST["isactive"];

$sql = "UPDATE shopcar SET isactive=$isactive WHERE gid='$gid'";
mysqli_query($con,$sql);
?>