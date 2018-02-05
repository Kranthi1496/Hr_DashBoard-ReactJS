<?php require '../config.php';
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
 $data=json_decode(file_get_contents("php://input"));
 $uid=$data->uid;
 $mid=$data->mid;
 $status=$data->status;
 $subject=$data->subject;
 $description=$data->description;

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