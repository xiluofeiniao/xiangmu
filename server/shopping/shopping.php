<?php

$con = mysqli_connect("127.0.0.1", "root", "", "liebiaoa");
$sql = "SELECT shopcar.*,wares.title,wares.img FROM shopcar , wares WHERE shopcar.gid = wares.gid";

$result = mysqli_query($con, $sql);
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($data, true);

?>