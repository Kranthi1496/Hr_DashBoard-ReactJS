<?php require '../config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$data=json_decode(file_get_contents("php://input"));

$uemail=$data->email;

$upwd=$data->password;

$uname=$data->name;

$dob=$data->dob;

$address=$data->address;

$epwd=md5($upwd);
//
//checking username exists or not
$usql = "SELECT name FROM members where name='$uname'";

$uresult = $conn->query($usql);

//checking email exists or not
$esql = "SELECT email FROM authentication where email='$uemail'";

$eresult = $conn->query($esql);

if($uresult->num_rows > 0) {

	//echo "Name already exists Try another";
  echo'{"status": "FAILN","data":'.json_encode('Name-already-exists-Try-another').'}';
}

else if($eresult->num_rows > 0){
    
    //echo "Email already exists Try another";
    echo'{"status": "FAILE","data":'.json_encode('Email-already-exists-Try-another').'}';
}

else{
//

$sql = "INSERT INTO authentication (name,email,password) VALUES ('$uname','$uemail','$epwd')";

$result = $conn->query($sql);

$getid="select aid from authentication where name='$uname'";

$resultk = mysqli_query($conn, $getid);



while ($row = $resultk->fetch_assoc()) {
 
  $aid=$row['aid'];
 

}

if($aid !=''){
  
   $tsql="INSERT INTO members (id,name,dob,address) VALUES ('$aid','$uname','$dob','$address')";
   $resultp = $conn->query($tsql); 
 }

//echo 'success';
echo'{"status": "OK"}';
}
$conn->close();
?>