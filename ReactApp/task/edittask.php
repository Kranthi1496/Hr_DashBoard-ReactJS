<?php require '../config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data=json_decode(file_get_contents("php://input"));

$task_id    = $data->task_id;
$user_id    = $data->user_id;
$task_title = $data->task_title;
$task_desc  = $data->task_desc;
$start_date = $data->start_date;
$end_date   = $data->end_date;
$status     = $data->status;
$timestamp  ='MODIFIED';

if($task_id !=''&& $user_id !='' && $task_title !='' && $task_desc!='' && $start_date!='' && $end_date!='' && $status!='' && $timestamp!=''){
$usql = "UPDATE task SET task_title='$task_title', task_desc='$task_desc', start_date='$start_date', end_date='$end_date', status='$status', timestamp='$timestamp' 
WHERE   task_id='$task_id' and user_id='$user_id'";
                         
                       


$uresult = $conn->query($usql);



 echo'{"status": "OK"}';


}
$conn->close();
?>
