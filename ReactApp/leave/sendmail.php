<?php require '../config.php';
$data=json_decode(file_get_contents("php://input"));
$uid=$data->user_id;
$uname=$data->user_name;
$mid=$data->manager_id;
$mail_subject=$data->subject;
$description=$data->description;
$startdate=$data->start_date;
$enddate=$data->end_date;
$statusyes='YES';
$statusno='NO';
if($uid !='' && $mid!='' && $mail_subject!='' && $description !='' && $uname !=''){
$to = "kranthik@apostek.com";
$subject = "Leave request from ". $uname;
$message = '<html><head>';
$message .='<title>Leave Request</title>';
$message .='</head><body>';
$message .='<h1>Subject:'.$mail_subject.'</h1>';
//$message .='<h1>'.$subject.'</h1>';
$message .='<h2>Description:'.$description.'</h2>';
$message .='<h3>start_date:'.$startdate.'</h3>';
$message .='<h3>end_date:'.$enddate.'</h3>';
$message .='<a href="http://localhost:3000/acceptleave/'.$uname.'/'.$uid.'/'.$mid.'/'.$mail_subject.'/'.$description.'/'.$startdate.'/'.$enddate.'">Accept</a>';
//$message .='<a href="http://localhost:8080/ReactApp/leave/confirmleave.php?uid='.$uid.'&mid='.$mid.'&subject='.$mail_subject.'&description='.$description.'&status='.$statusyes.'" >Accept Leave</a>';
//$message .='<br>';
//$message .='<a href="http://localhost:8080/ReactApp/leave/confirmleave.php?uid='.$uid.'&mid='.$mid.'&subject='.$mail_subject.'&description='.$description.'&status='.$statusno.'" >Reject Leave</a>';
$message .='</body></html>';
// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
//$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
$headers .= 'From: <kranthikumarapostek@gmail.com>' . "\r\n";
mail($to,$subject,$message,$headers);
}
?>