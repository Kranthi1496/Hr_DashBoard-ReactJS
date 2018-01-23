<?php require '../config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data=json_decode(file_get_contents("php://input"));

$id =$data->user_id;



$usql = "SELECT * FROM role WHERE emp_id='$id'";
                         
$uresult = $conn->query($usql);




 function getalltasksundersse($conn,$mid){

 	//echo "entered";
 	
 	$ssedata=array();
 	//$ssedata contains software engineers under current sse 
    $under_sse=array();
    //$under_sse contains tasks of software engineers under current sse
	$ssesql = "SELECT * FROM role WHERE manager_id='$mid'";

        $sseresult = $conn->query($ssesql);

         if($sseresult->num_rows > 0){
        	
         	while($row = mysqli_fetch_object($sseresult)){
         		  array_push($ssedata, $row);
         	}
         	//echo $ssedata[0]->emp_id;
         	$ssedatalength = sizeof($ssedata);
         	//echo $max;
         	//echo'{"status": "OK","data":'.json_encode($ssedata).'}';

         	for($i=0;$i<$ssedatalength;$i++){
         		$uid=$ssedata[$i]->emp_id;
         		$tone = "SELECT * FROM task WHERE user_id='$uid'";

         		$toneresult=$conn->query($tone);

         		  if($toneresult->num_rows > 0){
         		  	  while($row = mysqli_fetch_object($toneresult)){
         		        array_push($under_sse, $row);
         	           }
                      
         		  }
         	}

    // return '{"status": "OK","data":'.json_encode($under_sse).',
    //     "designation":'.json_encode($designation).'}';
         return $under_sse;	
         }
}

if($uresult->num_rows > 0){
	 while($row = $uresult->fetch_assoc()) {
        $designation=$row["designation"];
     }
   // echo $designation;
              
     if($designation == 'Senior Software Engineer'){

     	
         $finalresult=getalltasksundersse($conn,$id);
         //echo $finalresult;
         echo '{"status": "OK","se":'.json_encode($finalresult).',"designation":'.json_encode($designation).'}';
         

      }//sse end
     else if($designation == 'Team Lead'){
      
         $tleadsql="SELECT * FROM role WHERE manager_id='$id'";

         $tleadresult=$conn->query($tleadsql);

         $teamleadarray=array();

        //$teamleadarray contains sse under him
         $ssetasksarray=array();
         //$ssetasksarray contains all tasks done by sse who are under current team lead 
          if($tleadresult->num_rows > 0){

            while($row = mysqli_fetch_object($tleadresult)){
         		  array_push($teamleadarray, $row);
         	}

         	$teamleadarraylength=sizeof($teamleadarray);
            $res_arr_values = array();
         	for($p=0;$p<$teamleadarraylength;$p++){

               $z=$teamleadarray[$p]->emp_id;

               $two="SELECT * FROM task WHERE user_id='$z'";

               $tworesult=$conn->query($two);

                if($tworesult->num_rows > 0){

                	while($row = mysqli_fetch_object($tworesult)){
         		      array_push($ssetasksarray, $row);
         	        }
                }
                $finalsetasks=array();
              
         	     
         	     $res_arr_values[$p]=getalltasksundersse($conn,$z);
                 

         	}

         	echo '{"status": "OK","sse":'.json_encode($ssetasksarray).',"se":'.json_encode($res_arr_values).',
         "designation":'.json_encode($designation).'}';

          }

     }//TL end
     else if($designation == 'Manager'){

     	$managersql="SELECT * FROM task";

     	$managerresult=$conn->query($managersql);

     	$managerarray=array();

     	  if($managerresult->num_rows > 0){
     	  	while ($row =mysqli_fetch_object($managerresult)){
     	  		array_push($managerarray, $row);
     	  	}
     	  	echo'{"status": "OK","manager":'.json_encode($managerarray).',"designation":'.json_encode($designation).'}';

     	  }

     }//Manger end
     else{
        echo'{"status": "OK","designation":'.json_encode($designation).'}';
     }


}//main if end
else{
	echo'{"status": "FAIL","data":"Role-Not-Assigned"}';
}



$conn->close();
?>