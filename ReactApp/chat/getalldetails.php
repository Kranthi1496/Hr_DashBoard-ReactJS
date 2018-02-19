<?php require '../config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$data=json_decode(file_get_contents("php://input"));

$id=$data->id;


if($id !=''){
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

        $usersql="SELECT * FROM members";

        $result2=$conn->query($usersql);

        $allusers=array();

           if($result2->num_rows > 0){

              while($row = mysqli_fetch_object($result2)) {
            
                 array_push($allusers, $row);

                }

            }

         //get designation
         $userdesigsql="SELECT * FROM role WHERE emp_id='$id'";

         $result3=$conn->query($userdesigsql);

         $userandmanagerdesig=array();

           if($result3->num_rows > 0){

             while($row = mysqli_fetch_object($result3)) {
            
                 array_push($userandmanagerdesig, $row);

                }
            echo'{"status": "OK","data":'.json_encode($resdata).',
                                 "authen":'.json_encode($authendata).',
                                 "allusers":'.json_encode($allusers).',
                                 "designation":'.json_encode($userandmanagerdesig).'}';
           } 
            
   // echo'{"status": "OK","data":'.json_encode($resdata).',"authen":'.json_encode($authendata).',"allusers":'.json_encode($allusers).'}';
   
        }
}
}//if end
    


else {
    echo'{"status": "error"}';
} 

$conn->close();
?>