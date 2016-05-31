<?php

    //Create Database connection
    $db = new mysqli("localhost","user_tvonline","user_tvonline","tvonline");

    if (!$db) {
        die('Could not connect to db: ' . mysqli_connect_error());
    }
	
	// get results from tb_videos
    $resultVideos = $db->query("SELECT video_id,title,category,logline,synopsis,
    					       viewCount, likeCount, duration,low,medium,high,maxres,data 
    					       FROM tb_videos order by data desc"); 

	if (!$resultVideos) {
		die('Invalid query: ' .$resultVideos->error);
	}

    //Create an response array
    $json_response = array();
    while ($row =$resultVideos->fetch_assoc())
	{
		$row_array['video_id']    = $row['video_id'];
		$row_array['title']       = $row['title'];
		$row_array['category']    = $row['category'];
		$row_array['logline']     = $row['logline'];
		$row_array['synopsis']    = $row['synopsis'];
		$row_array['viewCount']   = $row['viewCount'];
		$row_array['likeCount']   = $row['likeCount'];
		$row_array['duration']    = $row['duration'];
		$row_array['datas']       = $row['data'];
		$row_array['low']    	  = $row['low'];
		$row_array['medium']	  = $row['medium'];
		$row_array['high']        = $row['high'];
		$row_array['maxres']    = $row['maxres'];		
		
		// get cuepoints 
		$cuepoints_array = [];
		$video_id = $row['video_id'];
		$cuepoints_query = $db->query("SELECT start,end FROM tb_cuepoints where video_id='$video_id'"); 
		while ($row3 =$cuepoints_query->fetch_assoc())
		{
			$cuepoint['start'] = $row3['start'];
			$cuepoint['end'] = $row3['end'];
			array_push($cuepoints_array,$cuepoint);
		}
		$row_array['cuepoints'] = $cuepoints_array;
		//	
		
				
		// response array
        array_push($json_response,$row_array);
	}

    echo json_encode($json_response, JSON_NUMERIC_CHECK);
	

    //Close the database connection
    $db->close();
?>
