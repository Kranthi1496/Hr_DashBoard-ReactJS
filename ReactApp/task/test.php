<?php require '../config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data=json_decode(file_get_contents("php://input"));

$id ='60';



$usql = "SELECT * FROM task WHERE user_id='$id'";
                         
$uresult = $conn->query($usql);
$array1=array();
$managerarray=array();
if($uresult->num_rows > 0){
	while ($row =mysqli_fetch_object($uresult)){
     	  		array_push($managerarray, $row);
     	  	}

     	  	function date_compare($a, $b)
           {
    $t1 = strtotime($a['start_date']);
    $t2 = strtotime($b['start_date']);
    return $t1 - $t2;
            }    
         usort($managerarray, 'date_compare');

	}
	echo json_encode($managerarray);


$conn->close();
?>