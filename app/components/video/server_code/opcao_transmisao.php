<?php

   $myFile = "../op_transmissao.json";

  if(isset($_POST['op_data'])){
    $opcao = $_POST['op_data'];
  try
  {
     //pega dados formulario
     $formdata = array(
        'opcao'=> $_POST['op_data']
     );

     $jsondata = json_encode($formdata, JSON_PRETTY_PRINT);

     //escreve dados json no ficheiro.json
     if(file_put_contents($myFile, $jsondata)) {
          switch($opcao){
                case 0:
                    echo " SEM TRANSMISSÃO";
                break;
                  case 1:
                      echo " TRANSMISSÃO AGORA";
                  break;
                     
                 }
      }
     else 
          echo "error";

   }
   catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
   }

}
else{

 try
  {
     //Get dados de um ficheiro json existente
     $jsondata = file_get_contents($myFile);
     echo json_encode($jsondata, JSON_NUMERIC_CHECK);

   }
   catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
   }
 }
   
   