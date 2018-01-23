<?php require '../config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$data=json_decode(file_get_contents("php://input"));

$id=$data->id;



$sql = "SELECT * FROM members where id!='$id' && name!='admin'";

$result = $conn->query($sql);
$resdata= array();
if ($result->num_rows > 0) {
    // output data of each row
  
    while($row = mysqli_fetch_object($result)) {
            
     array_push($resdata, $row);

    }

     $rsql = "SELECT * FROM role";

     $result1 = $conn->query($rsql);
     
     $roledata= array();
     
     if ($result1->num_rows > 0) {
        
        while($row = mysqli_fetch_object($result1)) {
            
                 array_push($roledata, $row);

        }
            
                echo'{"status": "OK","data":'.json_encode($resdata).',"role":'.json_encode($roledata).'}';
      }
    
     else{
        
          echo'{"status": "OK","data":'.json_encode($resdata).'}';
     }
     

}

else {
    echo'{"status": "error"}';
} 

$conn->close();
?>