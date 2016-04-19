<?php
   	
   $myFile = "data_transmissao.json";
   $arr_data = array(); // create empty array

  try
  {
	   //pega dados formulario
	   $formdata = array(
	      'transmissao'=> $_POST['trasmi_data']
	   );

	    //Get dados de um ficheiro json existente
	 /*  $jsondata = file_get_contents($myFile);

	   // converte dados json em array
	   $arr_data = json_decode($jsondata, true);

	   // add dados usario no array
	   array_push($arr_data,$formdata);

       Convert array atualizado em JSON
	   $jsondata = json_encode($arr_data, JSON_PRETTY_PRINT);*/
	   $jsondata = json_encode($formdata, JSON_PRETTY_PRINT);

	   //escreve dados json no ficheiro.json
	   if(file_put_contents($myFile, $jsondata)) {
	        echo 'Operacao registrada';
	    }
	   else 
	        echo "error";

   }
   catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
   }