<?php require '../config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$data=json_decode(file_get_contents("php://input"));

$id=$data->id;
$designation=$data->designation;

if($id !='' && $designation != ''){

     if($designation == 'Senior Software Engineer'){
      $sql = "SELECT * FROM role where manager_id='$id' && designation='Software Engineer'";
     }
     else if($designation == 'Team Lead'){
      $sql = "SELECT * FROM role where manager_id='$id' && designation='Senior Software Engineer'";  
     }
     else if($designation == 'Manager'){
      $sql = "SELECT * FROM role where manager_id='$id' && designation='Team Lead'";  
     }
     else{}

     $result = $conn->query($sql);
     $resdata= array();
      if($result->num_rows > 0) {
    // output data of each row
  
        while($row = mysqli_fetch_object($result)) {
            
         array_push($resdata, $row);

       }

   
      
     echo'{"status": "OK","emp":'.json_encode($resdata).'}';
           
            
  
   
        
     }
}//if end
    


else {
    echo'{"status": "error"}';
} 

$conn->close();
?>