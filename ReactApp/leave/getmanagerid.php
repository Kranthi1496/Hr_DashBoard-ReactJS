<?php require '../config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$data=json_decode(file_get_contents("php://input"));

$id=$data->user_id;



$sql = "SELECT * FROM role where emp_id='$id'";

$result = $conn->query($sql);
$resdata= array();
$namedata=array();
if ($result->num_rows > 0) {
    // output data of each row
  
    while($row = mysqli_fetch_object($result)) {
            
     array_push($resdata, $row);

    }
    $namesql ="SELECT name from members where id='$id'";

     $nameresult= $conn->query($namesql);
     if($nameresult->num_rows > 0){
     	while ($row = mysqli_fetch_object($nameresult)) {
     		array_push($namedata, $row);
     	}
     	 echo'{"status": "OK","data":'.json_encode($resdata).',"name":'.json_encode($namedata).'}';
     }
   
}