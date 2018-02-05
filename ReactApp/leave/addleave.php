<?php require '../config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$data=json_decode(file_get_contents("php://input"));

$uid=$data->user_id;

$mid=$data->manager_id;

$subject=$data->subject;

$status='NO';

$startdate=$data->start_date;

$enddate=$data->end_date;

$description=$data->description;
if($uid!='' && $mid!='' && $subject!='' && $status!='' && $description!='' && $startdate !='' && $enddate !=''){
$sql = "INSERT INTO leaverequest (uid,mid,subject,description,startdate,enddate,status) 
         VALUES ('$uid','$mid','$subject','$description', '$startdate', '$enddate' ,'$status')";

$result = $conn->query($sql);

 echo'{"status": "OK"}';
}
$conn->close();
?>