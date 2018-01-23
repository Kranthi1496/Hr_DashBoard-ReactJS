<?php require '../config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$data=json_decode(file_get_contents("php://input"));

$id=$data->id;



$sql = "SELECT * FROM members where id='$id'";

$result = $conn->query($sql);
$resdata= array();
if ($result->num_rows > 0) {
    // output data of each row
  
    while($row = mysqli_fetch_object($result)) {
            
     array_push($resdata, $row);

    }

     $rsql = "SELECT aid,name,email FROM authentication WHERE aid='$id'";

     $result1 = $conn->query($rsql);
     
     $authendata= array();
     
     if ($result1->num_rows > 0) {
        
        while($row = mysqli_fetch_object($result1)) {
            
                 array_push($authendata, $row);

        }
            
                echo'{"status": "OK","data":'.json_encode($resdata).',"authen":'.json_encode($authendata).'}';
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