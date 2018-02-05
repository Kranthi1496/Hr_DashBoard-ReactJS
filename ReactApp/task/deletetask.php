<?php require '../config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data=json_decode(file_get_contents("php://input"));

$task_id    =$data->task_id;
$user_id    = $data->user_id;


if($task_id !=''&& $user_id !=''){
$usql = "DELETE  FROM  task WHERE   task_id='$task_id' and user_id='$user_id'";

                         
                       


$uresult = $conn->query($usql);



 echo'{"status": "OK"}';


}
$conn->close();
?>