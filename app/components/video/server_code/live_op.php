<?php 
    //este script nao esta sendo usado agora
	$servername = "localhost";
	$username   = "user_tvonline";
	$password   = "user_tvonline";
	$dbname     = "tvonline";

	$conn = new mysqli($servername, $username, $password, $dbname);

	  if ($conn->connect_error) {
	      die("Connection failed: " . $conn->connect_error);
	  } 
  
   if(isset($_POST['video_id'])){
    $video_id   = $_POST['video_id'];
	$opcao      = $_POST['opcao'];

   	$sql = "UPDATE tb_videos set logline=? where video_id=?";   
	
	$stmt= $conn->prepare($sql); 
    $stmt-> bind_param("ss",$opcao,$video_id);
	if($stmt->execute()){
	   switch($opcao){
			        	case 0:
			        	    echo "trasmissão apenas Ipercentro";
			        	break;
			            case 1:
			                echo "trasmissão apenas TVKultura";
			            break;
			            case 2:
			            	 echo "Duas trasmissão nesse momento";
			            break;
			            case -1:
			            	echo "Nenhuma trasmissão nesse momento";
			            break;    
	               }	
     }
	else
		echo "erro";
   } 
   if(isset($_POST['log_old'])){
   	  $log_old    = $_POST['log_old'];
	  $log_new    = $_POST['log_new'];

	  $sql = "UPDATE tb_videos set logline=? where logline=?";   
	
	$stmt= $conn->prepare($sql); 
    $stmt-> bind_param("ss",$log_new,$log_old);
	if($stmt->execute()){

	}
	  echo "OK";
   }  
?>                      