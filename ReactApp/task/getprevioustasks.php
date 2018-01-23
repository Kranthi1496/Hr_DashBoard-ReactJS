<?php require '../config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data=json_decode(file_get_contents("php://input"));

$id = $data->user_id;



$usql = "SELECT * FROM task WHERE user_id='$id'";
                         
                       


$uresult = $conn->query($usql);

$resdata=array();

if($uresult->num_rows > 0){
	 
	  while($row = mysqli_fetch_object($uresult)) {
            
                 array_push($resdata, $row);

                }
                echo'{"status": "OK","data":'.json_encode($resdata).'}';

}
else{
	echo'{"status": "FAIL"}';
}



$conn->close();
?>