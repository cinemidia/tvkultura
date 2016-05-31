<?php 
  $data = file_get_contents("php://input");
  $dataJsonDecode = json_decode($data);

  $action    = $dataJsonDecode->action; 
  $video_id  = $dataJsonDecode->video_id;
  $title     = $dataJsonDecode->title;
  $category  = $dataJsonDecode->category;
  $logline   = $dataJsonDecode->logline;
  $synopsis  = $dataJsonDecode->synopsis;
  $duration  = $dataJsonDecode->duration;
  $public    = $dataJsonDecode->publico;
  $viewCount = 0;
  $likeCount = 0;
  $servername = "localhost";
  $username   = "user_tvonline";
  $password   = "user_tvonline";
  $dbname     = "tvonline";

    if($duration ==null){
      $duration = 0;
    }

  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  } 

  switch ($action) {
      case 'add':
             $sql = "INSERT INTO tb_videos (
                    video_id,title,category,logline,synopsis,duration,viewCount,likeCount,publico) 
                    VALUES
                   (?, ?, ?, ?, ?, ?, ?, ?,?)";

              $stmt= $conn->prepare($sql); 
              $stmt-> bind_param("ssssssiis",$video_id,$title,$category,$logline,$synopsis,$duration,$viewCount,$likeCount,$public);
              if($stmt->execute()){                  
                       echo "insert sucesso";
                    }
              else{
                  echo "erro";
              }  		
          break;
        
      case 'update':
          $sql = "UPDATE tb_videos SET 
                        title=?,category=?, logline=?,synopsis=?, data =now(),publico=? WHERE video_id=?";
          $stmt= $conn->prepare($sql); 
          $stmt-> bind_param("ssssss",$title,$category,$logline,$synopsis,$public,$video_id);
          if($stmt->execute()){
                 echo " update sucesso";
                  }
          else{
               echo "erro";
             }
        break;     

      case 'delete':
          $sql = "DELETE from tb_videos WHERE video_id=?";
          $stmt= $conn->prepare($sql); 
          $stmt-> bind_param("s",$video_id);
          if($stmt->execute()){
                 echo " Delete sucesso";
                  }
          else{
               echo "erro";
             }
        break;     
  }
  $conn->close();
  
?>