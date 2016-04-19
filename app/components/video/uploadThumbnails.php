<?php 

    $video_id = $_POST['video_id'];
	$low      = $_FILES['file1']['name'];
	$medium   = $_FILES['file2']['name'];
	$high     = $_FILES['file3']['name'];
	$maxres   = $_FILES['file4']['name'];

	$servername = "localhost";
	$username   = "user_tvonline";
	$password   = "user_tvonline";
	$dbname     = "tvonline";

	$conn = new mysqli($servername, $username, $password, $dbname);

	  if ($conn->connect_error) {
	      die("Connection failed: " . $conn->connect_error);
	  } 

	$sql = "UPDATE tb_videos set
	                           low=?,medium=?,high=?,maxres=? 
	                     where video_id=?";   
	
	$stmt= $conn->prepare($sql); 
    $stmt-> bind_param("sssss",$low,$medium,$high,$maxres,$video_id);
	if($stmt->execute()){
	    echo "insert sucesso";

	  move_uploaded_file($_FILES['file1']['tmp_name'],dirname(__FILE__)."/../../../assets/media/images/".$_FILES['file1']['name']);
	  move_uploaded_file($_FILES['file2']['tmp_name'], dirname(__FILE__)."/../../../assets/media/images/".$_FILES['file2']['name']);
	  move_uploaded_file($_FILES['file3']['tmp_name'], dirname(__FILE__)."/../../../assets/media/images/".$_FILES['file3']['name']);
	  move_uploaded_file($_FILES['file4']['tmp_name'], dirname(__FILE__)."/../../../assets/media/images/".$_FILES['file4']['name']);
     }
	else
		echo "erro";
?>                      