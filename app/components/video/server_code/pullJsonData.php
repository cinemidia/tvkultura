<?php
   	
   $myFile = "../data_transmissao.json";
  try
  {
	   //Get dados de um ficheiro json existente
	   $jsondata = file_get_contents($myFile);
	   echo json_encode($jsondata, JSON_NUMERIC_CHECK);

   }
   catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
   }