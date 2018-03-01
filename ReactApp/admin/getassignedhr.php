<?php require '../config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 





$sql = "SELECT * FROM role where designation='hr'";

$result = $conn->query($sql);
$resdata= array();

if ($result->num_rows > 0) {
    // output data of each row
  
    while($row = mysqli_fetch_object($result)) {
            
     array_push($resdata, $row);

    }
   
     	 echo'{"status": "OK","data":'.json_encode($resdata).'}';
     
   
}
else{
    echo'{"status": "error"}';
}
$conn->close();
?>