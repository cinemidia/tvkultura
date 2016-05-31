(function()
{
	angular.module('app')
	.controller('VideoListController', VideoListController)
	.factory('videosService', videosService);
	
	videosService.$inject = ['$http','dataService'];
	function videosService($http,dataService)
	{
		var service = {};
		var videos = [];
		service.loadVideos = loadVideos;
		service.editVideo = editVideo;
		return service; 

		
		//load videos
		function loadVideos(videos)
		{
			this.videos = videos;
		}
		
		//edit video
		function editVideo(action, index, video,check)
		{
			var postData = {};
			switch (action)
			{
				case 'add':
					postData.action   = 'add';	
					postData.video_id =video.video_id;				
					postData.title    = video.title;
					postData.category = video.category;
					postData.logline  = video.logline;
					postData.synopsis = video.synopsis;
					postData.viewCount =video.viewCount=0;
				    var hora = video.duration.toString().substring(15,21);	
					postData.duration = video.duration = hora;					
					 if(!check){
					 	var fileLow = $('#img_low').val().split('\\').pop();	
					    postData.low = video.low = fileLow;
					 	var fileMedium = $('#img_medium').val().split('\\').pop();	
						postData.medium = video.medium = fileMedium;
						var fileHigh = $('#img_high').val().split('\\').pop();	
						postData.high = video.high = fileHigh;
						var fileMaxres = $('#img_maxres').val().split('\\').pop();	
						postData.maxres = video.maxres = fileMaxres;
					 }
                    
					postData.publico = video.publico;
														
					break;
				
				case 'update':
					postData.action = 'update';
					postData.video_id = video.video_id;
					postData.title = video.title;
					postData.category = video.category;
					postData.logline  = video.logline;
					postData.synopsis = video.synopsis;	
					var hora = video.duration.toString().substring(15,21);	
					postData.duration = video.duration = hora;
					 if(!check){					 	
					 	var fileLow = $('#img_low').val().split('\\').pop();	
					    postData.low = video.low = fileLow;
					 	var fileMedium = $('#img_medium').val().split('\\').pop();	
						postData.medium = video.medium = fileMedium;
						var fileHigh = $('#img_high').val().split('\\').pop();	
						postData.high = video.high = fileHigh;
						var fileMaxres = $('#img_maxres').val().split('\\').pop();	
						postData.maxres = video.maxres = fileMaxres;
					 }
					postData.publico = video.publico;	

					break
				;
				
				case 'delete':			
				   postData.action = 'delete';
				   postData.video_id =video[index].video_id;
				   postData.title = video[index].title;
				   video.splice(index,1);				 
					break
				;
			}
            return postData;
		}
	
	}
	
	VideoListController.$inject = ['$scope', '$rootScope', 'dataService','$timeout','ngDialog','videosService','$location','AuthenticationService','$state'];
	function VideoListController($scope, $rootScope,dataService,$timeout,ngDialog, videosService,$location,AuthenticationService,$state)
	{
		var vm = this;
		vm.videos = null;
		vm.d=null;
		vm.selectVideo;
		vm.dbStatus = false;
		vm.msgClass;
		vm.dbMsg;
		vm.dialogTitle;
		vm.dialogAction;
		vm.dialogActionLabel;
		vm.editVideo = editVideo;
		vm.openVideoDetails = openVideoDetails;
		$rootScope.hide_duration=true;
		vm.live_op=live_op;
		vm.img_alt=img_alt;
		vm.postTransmissao =postTransmissao;
		vm.postTransmissaoInfo=postTransmissaoInfo;

		// check authentication
		if (!AuthenticationService.user)
		{
			$location.path('/lg/').search({action: 'admin'});
		}

       	dataService.getData('app/components/video/server_code/getvideos.php')
        .then(function(data) 
		{				
			vm.videos = data;									
					
			//var j = JSON.stringify(data);
			//alert(j);
			
		},
		function (error) {
			// handle errors here
			alert(error.statusText);
		});
      
         //funcao que lida com muitos emissocao de liveStream 
     /*    function  live_op(valor){
         	var id;
         	 for (var i =0; i < vm.videos.length ; i++){
	          if(vm.videos[i].low =='tvkultura.png'){
				id= vm.videos[i].video_id;
	          }
	         }        	

         	  var form_data = new FormData();               
              form_data.append('opcao', valor); 
              form_data.append('video_id', id); 

              $.ajax({
			   url :'app/components/video/server_code/live_op.php',
			   type : 'post',						
			   data : form_data,
			   cache:false,
		       contentType: false,
		       processData: false,				         
			   success : function( response) {	
			   	alert(response);		
				}
			});
			return false;
         };*/
       function  live_op(valor){    
       	 var form_data = new FormData();               
         form_data.append('op_data', valor);  
       	 
       	  $.ajax({
			   url :'app/components/video/server_code/opcao_transmisao.php',
			   type : 'post',						
			   data : form_data,
			   cache:false,
		       contentType: false,
		       processData: false,				         
			   success : function( response) {
			   alert( response );	
				}
			});
			return false;
         }; 

      function radio_op(op){     
         switch(op){
			       case 1:
			        $rootScope.ckS=true;		       			      
			        break;
			        case 0:
			        $rootScope.ckN=true;
			        break; 
			         }
      	
     };
     (function live(){
	   $.ajax({
			   url :'app/components/video/server_code/opcao_transmisao.php',
			   type : 'get',	
			   dataType: 'json',					
			   cache:false,				         
			   success : function( response) {				   	    
			         data = $.parseJSON(response);
			         var ops = parseInt(data.opcao);			        
                     radio_op(ops);       
              		}
			});
			return false;
		})();	
     //funcao de atribui valor ao radiobuton
     /* function live(){
        for (var i =0; i < vm.videos.length ; i++){
	          if(vm.videos[i].low =='tvkultura.png'){
	            var op = vm.videos[i].logline;
			       switch(op){
			        	case 0:
			        	    $rootScope.ckIp=true;
			        	break;
			            case 1:
			                $rootScope.ckTV=true;
			            break;
			            case 2:
			            	$rootScope.ckT=true;
			            break;
			            case -1:
			            	$rootScope.ckN=true;
			            break;    
			         }
             }
         }
	}*/

	    function checkIt(){
	      var check = $('#alt_img').is(':checked');
	      return check;
	    }
	    function img_alt(){
	          if(checkIt()){
	         	$('#panel_image').slideToggle();
	         }
	         else{
	         	$('#panel_image').slideToggle();
	         }
	   }

        function uploadThumbnails(){
        	 var id = $('#v_id').val();
        	 // var id = $('#v_idH').val();
        	 var file_data1 = $('#img_low').prop('files')[0];   
        	 var file_data2 = $('#img_medium').prop('files')[0];         	   
        	 var file_data3 = $('#img_high').prop('files')[0];   
        	 var file_data4 = $('#img_maxres').prop('files')[0];       
             
             var form_data = new FormData();  
              form_data.append('video_id',id);    
              form_data.append('file1', file_data1);
              form_data.append('file2', file_data2); 
              form_data.append('file3', file_data3);
              form_data.append('file4', file_data4); 

              $.ajax({
			   url :'app/components/video/server_code/uploadThumbnails.php',
			   type : 'post',						
			   data : form_data,
			   cache:false,
		       contentType: false,
		       processData: false,				         
			   success : function( response) {				
					
				}
			});
			return false;
        }

         function postTransmissao(){
         	 var trans = $('#data_trans').val();       	        

              var form_data = new FormData();  
              form_data.append('trasmi_data',trans);    
             
              $.ajax({
			   url :'app/components/video/server_code/pushJsonData.php',
			   type : 'post',						
			   data : form_data,
			   cache:false,
		       contentType: false,
		       processData: false,				         
			   success : function( response) {				
					alert(response);
				}
			});
			return false;
         }

         function postTransmissaoInfo(){
         	 var trans = $('#texto_info').val();      	        
              if(!trans){
                 	trans="sEm_1nF0";
                 }
              var form_data = new FormData();  
              form_data.append('trasmi_data',trans);    
             
              $.ajax({
			   url :'app/components/video/server_code/pushJsonData.php',
			   type : 'post',						
			   data : form_data,
			   cache:false,
		       contentType: false,
		       processData: false,				         
			   success : function( response) {			
					
				}
			});
			return false;
         }

         (function getTransmissao(){         	   
             
              $.ajax({
			   url :'app/components/video/server_code/pullJsonData.php',
			   type : 'get',						
			   cache:false,				         
			   success : function( response) {			
				
				}
			});
			return false;
         })();


        //edit video 
		function editVideo(action, index)
		{			
		  var postData ={};
		    if(action=='delete'){
		    postData= videosService.editVideo(action, index,vm.videos,true);	
		    }
		    else {	    
		        postData= videosService.editVideo(action, index,vm.selectVideo,checkIt());		    			    	
		    }	
             			
			dataService.postData('app/components/video/server_code/editvideo.php',postData)
			.success(function(data)
			{
				vm.dbStatus = true;
				vm.msgClass = 'success';
				vm.dbMsg = data; //'Operação concluída com sucesso';
				
				$timeout(function () {   				
			  ngDialog.close(true);    
				},1000);
			  
                  switch(action){
                   	case 'add':                    
                    	vm.videos.push(postData);    
                    	
                           if(!checkIt()){
				               uploadThumbnails();
				             }					                       	                 	
                       break;

                  case 'update':
                  if(!checkIt()){
				               uploadThumbnails();
				             }		
                   break;	
                   }
			}).
			error(function(data, status, headers, config) 
			{
				vm.dbStatus = false;
				vm.msgClass = 'error';
				vm.dbMsg = 'Ocorreu um erro (' + status + ')';
			});
		}

		// VIDEO ADMIN DIALOG	
		function openVideoDetails(index,action)
		{
			vm.dialogTitle = action=='add' ? 'Novo video' : 'Modificar dados video';
			vm.dialogAction = action=='add' ? 'add' : 'update';
			vm.dialogActionLabel = action=='add' ? 'adicionar' : 'modificar';
			
			if (action=='add')
			{
				vm.selectVideo = [];
				vm.selectVideo.video_id= '';
				vm.selectVideo.title = '';
				vm.selectVideo.category ='';
				vm.selectVideo.logline = '';
				vm.selectVideo.synopsis = '';				
				vm.selectVideo.duration='';
				vm.selectVideo.low='';
				vm.selectVideo.publico ='';	
			}
			else
			{
				vm.selectVideo = vm.videos[index];
			}
		
			ngDialog.open(
			{ 
				template: 'app/components/video/edit.video.view.html',
				appendTo: 'body',
				scope: $scope,
				data: {'index':index}
			});
		}
		//
		
		
		// On closing dialog
		$rootScope.$on('ngDialog.opened', function (e, $dialog) 
		{
			vm.dbStatus = false;
			vm.msgClass = '';
			vm.dbMsg = '';
		});
	}
})();