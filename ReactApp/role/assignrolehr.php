<?php require '../config.php';


// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$data=json_decode(file_get_contents("php://input"));


$empid=$data->empid;

$managerid=$data->managerid;

$designation=$data->designation;

// $empid=77;
// $managerid=57;
// $designation='Software Engineer';
//checking empid existing or not in members table
$asql = "SELECT * FROM members where id='$empid'";

$aresult = $conn->query($asql);

//checking manager_id existing or not in members table
$msql = "SELECT * FROM members where id='$managerid'";

$mresult = $conn->query($msql);

//checking empid existing or not in role table
$usql = "SELECT * FROM role where emp_id='$empid'";

$uresult = $conn->query($usql);


$managerdesignation="SELECT * FROM role where emp_id='$managerid'";

$managerdesignationarray=array();

$result = $conn->query($managerdesignation);


if($empid !='' && $managerid !='' && $designation !=''){
 if($mresult->num_rows > 0){

       if($aresult->num_rows > 0){

            if($uresult->num_rows > 0) {

	 
              echo'{"status": "FAIL","data":"Already-Role-Assigned-to-this-employee"}';
            }

            else{
            

                if($result->num_rows > 0) {
                	  
                    while($row = $result->fetch_assoc()) {

                    $desig=$row["designation"];

                    //echo $desig;
  
                     }

                    if($designation == 'Software Engineer' && $desig == 'Senior Software Engineer'){

         	           $mainsql = "INSERT INTO role (emp_id,designation,manager_id) VALUES ('$empid','$designation','$managerid')";

                       $mainresult = $conn->query($mainsql);
           
                       echo'{"status": "OK","data":"Role-Assigned"}';
                     }
       
                    else if($designation == 'Senior Software Engineer' && $desig == 'Team Lead'){
        
                       $mainsql = "INSERT INTO role (emp_id,designation,manager_id) VALUES ('$empid','$designation','$managerid')";

                       $mainresult = $conn->query($mainsql);

                       echo'{"status": "OK","data":"Role-Assigned"}';
                     }
        
                    else if($designation == 'Team Lead' && $desig == 'Manager'){
        	
        	           $mainsql = "INSERT INTO role (emp_id,designation,manager_id) VALUES ('$empid','$designation','$managerid')";

                       $mainresult = $conn->query($mainsql);

                       echo'{"status": "OK","data":"Role-Assigned"}';
                     }
                    
                    else{

        	           echo'{"status": "FAIL","data":"Emp-should-not-be-head-for-Manager"}'; 
                     }

                }
                else{
                	echo'{"status": "FAIL","data":"error"}';
                }
            }
        }
        else{

           echo'{"status": "FAIL","data":"Invalid-EmpId"}';
        }
    }
    else{
 
     echo'{"status": "FAIL","data":"Invalid-ManagerId"}';	
    }
}
else{
    echo'{"status": "error","data":"error"}';
}


$conn->close();
?>