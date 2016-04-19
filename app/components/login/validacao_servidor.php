<?php
if(isset($_POST['userId'])){
	$userId = $_POST['userId'] =='' ? '' : $_POST['userId'];
}
 
if( isset($_POST['firstName']) && isset($_POST['lastName']) && isset($_POST['userName']) )
{ 
 
  $password  = md5($_POST['password']);
	$firstName = $_POST['firstName']=='' ? '' : $_POST['firstName'];
	$lastName  = $_POST['lastName'] =='' ? '' : $_POST['lastName'];
}

if(isset($_POST['pass'])){
   $password=md5($_POST['pass']);
}

$userName  = $_POST['userName'] =='' ? '' : $_POST['userName'];
$action    = $_POST['accao'];   

$servername = "localhost";
$dbusername   = "user_tvonline";
$dbpassword   = "user_tvonline";
$dbname     = "tvonline";


$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
} 

  switch ($action) {

  	 case 'checkNome':
             $sql = "SELECT * FROM users where userName =?";             
              $stmt= $conn->prepare($sql); 
              $stmt-> bind_param("s",$userName);
              $stmt->execute();
              $stmt->store_result();
           	if($stmt->num_rows != 0){
           		echo 1;
           	}
           	else{ echo 0;}
        break;

      case 'login':
             $sql = "SELECT * FROM users where userName =? and password =?";             
              $stmt= $conn->prepare($sql); 
              $stmt-> bind_param("ss",$userName,$password);
              $stmt->execute();
              $stmt->store_result();
              if($stmt->num_rows != 0){
                  echo 1;
              }
              else{
                  echo 0;
              }
        break;

      case 'registrar':
             $sql = "INSERT INTO users (
                    firstName,lastName,userName,password) 
                    VALUES
                   (?, ?, ?, ?)";             
              $stmt= $conn->prepare($sql); 
              $stmt-> bind_param("ssss",$firstName,$lastName,$userName,$password);
              if($stmt->execute()){
                  echo "insert sucesso";
              }
              else{
                  echo "erro";
              }  		
        break;
        
      case 'update':
          $sql = "UPDATE users SET 
                        firstName=?, lastName=?,userName=?,password=?WHERE userId=?";
          $stmt= $conn->prepare($sql); 
          $stmt-> bind_param("ssssi",$firstName,$lastName,$userName,$password,$userId);
          if($stmt->execute()){
                 echo " update sucesso";
                  }
          else{
               echo "erro";
             }
        break;  

      case 'delete':
          $sql = "DELETE from users WHERE userId=?";
          $stmt= $conn->prepare($sql); 
          $stmt-> bind_param("si",$userId);
          if($stmt->execute()){
                 echo " delete sucesso";
                  }
          else{
               echo "erro";
             }
        break;          
  }
  $conn->close();
?>