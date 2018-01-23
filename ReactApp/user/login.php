<?php require '../config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$data=json_decode(file_get_contents("php://input"));

$uemail=$data->email;

$upwd=$data->password;

$epwd=md5($upwd);

$sql = "SELECT aid,email,password FROM authentication where email='$uemail'";

$result = $conn->query($sql);



if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {


        if($row["password"]==$epwd){
  
            $aid=$row["aid"];

            $resdata= array();
            
            $tsql = "SELECT * FROM members where id='$aid'";
            
            $result1 = $conn->query($tsql);
            
            while($row = mysqli_fetch_object($result1)) {
            
                 array_push($resdata, $row);

                }
            
            $rsql="SELECT * FROM role where emp_id='$aid'";
            
            $result2= $conn->query($rsql);

            $roledata=array();

             while($row = mysqli_fetch_object($result2)) {
            
                 array_push($roledata, $row);

                }
             // if($result2->num_rows > 0){
                echo'{"status": "OK","data":'.json_encode($resdata).',"role":'.json_encode($roledata).'}';
             //  }
             //  else{
             //    $temp1=array();
             //    $result3={"designation":"none"};
             // //   array_push($temp, $row1);
             //    while($row = mysqli_fetch_object($result3)) {
            
             //     array_push($temp1, $row);

             //    }
               
             //    echo'{"status": "OK","data":'.json_encode($resdata).',"role":'.json_encode($temp1).'}';
             //  }
             
            //echo ;
        }
        else {
          echo'{"status": "email-and-password-not-matched"}';
        }

     }

}

else {
    echo'{"status": "User-not-exists"}';
} 

$conn->close();
?>