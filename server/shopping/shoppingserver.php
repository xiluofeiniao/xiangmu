<?php
$con = mysqli_connect("127.0.0.1", "root", "", "liebiaoa");
$gid = $_REQUEST["gid"];
$price = $_REQUEST["price"];

$sql = "SELECT * FROM  shopcar WHERE gid = '$gid'";

$result = mysqli_query($con,$sql);
$row = mysqli_num_rows($result);

if($row == 0){
    $insetSql = "INSERT INTO `shopcar` (`carid`, `gid`, `num`, `money`,`price`,`isactive`) 
    VALUES (NULL, '$gid', 1, '$price','$price',1)";

    mysqli_query($con, $insetSql);

}elseif($row == 1){
    $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
    $num = $data[0]["num"] + 1;
    $money = $data[0]["price"] * $num;
    // echo $num;
    
    $updateSql = "UPDATE shopcar SET num='$num', money='$money' WHERE gid=' $gid'"; 
    mysqli_query($con,$updateSql);

}

$moneyCount = "SELECT * FROM shopcar";
$result = mysqli_query($con,$moneyCount);
$row = mysqli_num_rows($result);
echo '{"totalRow":'.$row.'}';

?>