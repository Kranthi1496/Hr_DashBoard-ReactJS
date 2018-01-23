<?php require '../config.php';


// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$data=json_decode(file_get_contents("php://input"));


$empid=$data->empid;
//echo $id;
$managerid=$data->managerid;

$designation=$data->designation;

//
//$authsql = "SELECT aid,name FROM authentication where name='$manager'";

//
//checking empid existing or not in members table
$asql = "SELECT * FROM members where id='$empid'";

$aresult = $conn->query($asql);

//checking manager_id existing or not in members table
$msql = "SELECT * FROM members where id='$managerid'";

$mresult = $conn->query($msql);

//checking empid existing or not in role table
$usql = "SELECT * FROM role where emp_id='$empid'";

$uresult = $conn->query($usql);

// emp should not be head for manager  
$esql = "SELECT * FROM role where manager_id='$empid' && emp_id='$managerid'";

$eresult = $conn->query($esql);

if($mresult->num_rows > 0){

       if($aresult->num_rows > 0){

            if($uresult->num_rows > 0) {

	 
              echo'{"status": "FAIL","data":"Already-Role-Assigned-to-this-employee"}';
            }

            else if($eresult->num_rows > 0){
    
    
              echo'{"status": "FAIL","data":"Emp-should-not-be-head-for-Manager"}';   

            }
            else{

              $sql = "INSERT INTO role (emp_id,designation,manager_id) VALUES ('$empid','$designation','$managerid')";

              $result = $conn->query($sql);

              echo'{"status": "OK","data":"Role-Assigned"}';

            }
        }
        
        else{

           echo'{"status": "FAIL","data":"Invalid-EmpId"}';
        }
}
else{
 
 echo'{"status": "FAIL","data":"Invalid-ManagerId"}';	
}


$conn->close();
?>