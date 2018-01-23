<?php header('Access-Control-Allow-Origin: *');
 header('Access-Control-Allow-Headers: Content-Type');
 header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

        $servername = 'localhost';
        $username = 'root';
        $password = 'password';
        $dbname = 'emp';
        $conn = new mysqli($servername, $username, $password, $dbname);
      

?>

