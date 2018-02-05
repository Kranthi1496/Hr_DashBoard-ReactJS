<?php require '../config.php';
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
// $data=json_decode(file_get_contents("php://input"));
// $fid=$data->uid;
// $uid=$data->fid;
// $status=$data->status;
// $notification=$data->notification;
 $uid=$_GET['uid'];
 $mid= $_GET['mid'];
 $subject=$_GET['subject'];
 $description=$_GET['description'];
 $status= $_GET['status'];
 if($status == 'YES'){
if($uid !='' && $mid !='' && $subject !='' && $description !='' && $status !=''){  
$sql = "UPDATE leaverequest SET status = '$status' WHERE uid='$uid' && mid='$mid' && subject='$subject' && description='$description'";
$result = $conn->query($sql);
 echo'{"status": "OK"}';
}
}
else if($status == 'NO'){
if($uid !='' && $mid !='' && $subject !='' && $description !='' && $status !=''){  
$sql = "DELETE from leaverequest  WHERE uid='$uid' && mid='$mid' && subject='$subject' && description='$description'";
$result = $conn->query($sql);
 echo'{"status": "OK"}';
}	
}
else{
	
}
$conn->close();
?>