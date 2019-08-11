<?php
$con = mysqli_connect("127.0.0.1", "root", "", "liebiaoa");
$gid = $_REQUEST["gid"];
$sql = "DELETE FROM shopcar  WHERE gid='$gid'";
mysqli_query($con, $sql);
?>