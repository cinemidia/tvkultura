(function () { 'use strict';

	angular.module('app').controller('VideoPlayerController', VideoPlayerController);
	
	VideoPlayerController.$inject = ['$location','$interval','$rootScope','dataService','$stateParams','ngDialog','AuthenticationService'];
	

	function VideoPlayerController($location,$interval,$rootScope,dataService,$stateParams,ngDialog,AuthenticationService)
	{						 
		var vm = this;
		vm.API = null;
		vm.config = {};
		vm.videoList = [];
		vm.onPlayerReady = onPlayerReady; 
		vm.setVideo = setVideo;
		vm.youtubeUrl = "https://www.youtube.com/watch?v=";
		var idVideo ;
		var videoSource = 'local';
		var live_Id="";
		var montharray=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
        var ano,mes,dia,hora,minuto;
        var check_trans;
        var check_trans2;
        var data;
		
		/** Metodo que inicializa assim o controller é executado
		  * coloca os 2 leitores de video visivel ou invisivel de acordo ação
		  * que é passada no url em esse controller é chamada, tambem
		  * passa o recebe o valor de categoria de video, guarda numa
		  * variavel para depos ser usada noutro lugar
          * @name initController
          * @function         
        */
        /** 
            @param {initController} 
        */
		(function initController()
		{

		 if (!AuthenticationService.user)
		{
            $rootScope.lg=true;
		    $rootScope.ad=false;
		}
		else{
             $rootScope.lg=false;
		     $rootScope.ad=true;
		}
         var action = $stateParams.action;
         if(action ==''){
          idVideo = 0;  
		  $rootScope.leitor1 = true;
		  $rootScope.leitor2 = false;	
         }
           /*else if(action=='ltvk'){
           	$rootScope.leitor1 = true;
           	$rootScope.leitor2 = false;

           	$rootScope.lg=true;
		    $rootScope.ad=false;
           }*/
         else{
         	idVideo = action;      
         	$rootScope.leitor1 = false;
		    $rootScope.leitor2 = true; 
         }     

			switch (action)
			{
				case 'r':
					vm.cat='reportagen';
					break;

				case 'f':
					vm.cat='filme';
					break;
				
				case 'c':
					vm.cat='video clip';
					break;

				case 's':
					vm.cat='web serie';
					break;	

				default: 
				  vm.cat ='tudo';
			 }
			      
		})();
          //end initController;


		/** Metodo que se encarrega de trazer todos os dados(videos) da base dados
          * @name dataService.getData
          * @function         
        */
        /** 
            @param {dataService.getData} 
        */
		dataService.getData('app/components/video/server_code/getvideos.php')
        .then(function(data) 
		{	
		   vm.vd=data;	
			// switch sources
			switch (videoSource)
			{
				case 'youtube':
					dataService.clearCache();
					getYoutubeVideos(data);
				break;
				
				case 'local':
					getLocalVideos(dataService,vm.cat);
				break;
			}	
			//getTransmissao();
		},
		function (error) {
			// handle errors here
			alert(error.statusText);
		});
		
           function icons(op){
           	    switch(op){
		        	case 1:
		        	    $rootScope.live_ico  = true;
		        	    $rootScope.live_tv   = true;		        	    
		        	    $rootScope.live_text = false;
		        	    $rootScope.leitor1   = false;//nao esta sendo usado
		        	    $rootScope.leitor2   = true;	
		        	    $interval.cancel(Time);	        	    
		        	break;
		            case 0:
		                $rootScope.live_ico  = false;
		                $rootScope.live_tv   = false;
		                $rootScope.live_text = true;
		                $rootScope.leitor1   = false;//nao esta sendo usado
		        	    $rootScope.leitor2   = true;
		        	    
		        	   
		        	break;	            
		            
		  }
           }

           (function live(){

               $.ajax({
			   url :'app/components/video/server_code/opcao_transmisao.php',
			   type : 'get',	
			   dataType: 'json',					
			   cache:false,				         
			   success : function( response) {				   	    
			         data = $.parseJSON(response);
			         var ops = parseInt(data.opcao);			        
                     icons(ops);       
              		}
			});
			return false; 
		})();

	/*(function live(){
            for (var i =0; i < vm.vd.length ; i++){
	          if(vm.vd[i].low =='tvkultura.png'){
	            var op = vm.vd[i].logline;
	             vm.title_tv = vm.vd[i].title;
	              switch(op){
		        	case 0:
		        	    $rootScope.live_ico  = true;
		        	    $rootScope.live_ip   = true;
		        	    $rootScope.live_text = false;
		        	    $rootScope.leitor1   = false;
		        	    $rootScope.leitor2   = true;	
		        	    $interval.cancel(time);	        	    
		        	break;
		            case 1:
		                $rootScope.live_ico  = true;
		                $rootScope.live_tv   = true;
		                $rootScope.live_text = false;
		                $rootScope.leitor1   = true;
		        	    $rootScope.leitor2   = false;
		        	    $interval.cancel(time);
		        	   
		        	break;	            
		            case 2:
		            	 $rootScope.live_ico  = true;
		            	 $rootScope.live_ip   = true;
		            	 $rootScope.live_tv   = true;
		            	 $rootScope.live_text = false;
		            	 $rootScope.leitor1   = true;
		        	     $rootScope.leitor2   = false;
		        	     $interval.cancel(time);		        	    
		        	break;
		            case -1:
		            	  $rootScope.live_ico  = false;
		            	  $rootScope.live_text = true;
		            	  $rootScope.leitor1   = false;
		        	      $rootScope.leitor2   = true;

		            break;    
	            }	
	          }	
	          else if(vm.vd[i].low =='ipercentro.png'){
	          	vm.title_ip = vm.vd[i].title;
	          	vm.video_id_ip = vm.vd[i].video_id;
	          }
		  }
		})();*/
        


		/** Metodo que efectua um request via AJAX para Servidor acessadando O script 
		  * pullJsonData.php caso a execução for bem sucessidade 
		  * tratara a response(data) em json que sera convertidade em string
		  * e depois devidida em outras string(dia,mes,ano...)
          * @name getTransmissao
          * @function
        */
        /** 
            @param {getTransmissao} 
        */
		 (function getTransmissao(){        	   
             
              $.ajax({
			   url :'app/components/video/server_code/pullJsonData.php',
			   type : 'get',	
			   dataType: 'json',					
			   cache:false,				         
			   success : function( response) {	
			   	    
			         data        = $.parseJSON(response);	
			         check_trans = data.transmissao.toString().substring(0,1);
			         check_trans2 = data.transmissao.toString().substring(0,8);
			        
   
                     ano    = data.transmissao.toString().substring(0,4);										
					 mes    = data.transmissao.toString().substring(5,7);
					 dia    = data.transmissao.toString().substring(8,10);
					 hora   = data.transmissao.toString().substring(11,13);
					 minuto = data.transmissao.toString().substring(14,16);	
					 
              		}
			});
			return false;
         })();
         //end getTransmissao;


        /** Metodo que se encarrega de decrementar a data de acordo com
          * uma data extripulada
          * @name contagemRegressiva
          * @function  
          * @param {int} ano paramentro que recebe ano
          * @param {int} mes paramentro que recebe mes
          * @param {int} dia paramentro que recebe dia
          * @param {int} hora paramentro que recebe hora
          * @param {int} minuto paramentro que recebe minuto
          */
         /** 
            @param {contagemRegressiva} 
         */
         function countdown(yr,m,d,H,mm){
			var theyear=yr, themonth=m,theday=d,thehour=H,theminuto=mm;
			var today=new Date();
			var todayy=today.getYear();
			if (todayy < 1000)
			todayy+=1900;
			var todaym=today.getMonth();
			var todayd=today.getDate();
			var todayh=today.getHours();
			var todaymin=today.getMinutes();
			var todaysec=today.getSeconds();
			var todaystring=montharray[todaym]+" "+todayd+", "+todayy+" "+todayh+":"+todaymin+":"+todaysec
		    var	futurestring=montharray[m-1]+" "+d+", "+yr+" "+H+":"+mm;
			var dd=Date.parse(futurestring)-Date.parse(todaystring);
			var dday=Math.floor(dd/(60*60*1000*24)*1);
			var dhour=Math.floor((dd%(60*60*1000*24))/(60*60*1000)*1);
			var dmin=Math.floor(((dd%(60*60*1000*24))%(60*60*1000))/(60*1000)*1);
			var dsec=Math.floor((((dd%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000*1);
			if(dday==0&&dhour==0&&dmin==0&&dsec==1){
						$rootScope.live_ico  = true;
		                $rootScope.live_tv	 = true;
		                $rootScope.live_text = false;
		                $rootScope.leitor1   = false;
		        	    $rootScope.leitor2   = true;
		        	    $rootScope.ckS	 = true;		        	   
		        	    $location.path('/index');
		        	    live_ops();	
		        	    info();
		        	    $interval.cancel(Time);	        	    
			return;
			}
			else
			$rootScope.aviso_texto="TRASMISSÃO AO VIVO DISPONIVEL DENTRO DE "+dhour+"H"+dmin+"m"+dsec+"s";
	    }
         //end countdown;
    

       /** Metodo que efectuando validacao dentro do intervalo de 1 em 1 segundo vao ser
         * impremitadas o decrementos do tempo estripulado ou uma mensagem
         * @name intervalo
         * @function  
         */
         /** 
            @param {intervalo} 
         */       
	   	var Time = $interval(function() {   
	       if(check_trans == 2){	 	
			   countdown(ano,mes,dia,hora,minuto);
			}			
		   else{		   	    
                 $interval.cancel(Time);
                  if(check_trans2 =="sEm_1nF0"){
                  	 $rootScope.live_text = false;
                  	 $rootScope.aviso_texto =" ";
                  }
                  else{
                  	$rootScope.aviso_texto =" "+data.transmissao;
                  	 $rootScope.aviso_texto ="dfsdfsfdf ";
                  }

                 
			}
		},1000);
	     
	  
	       function  live_ops(){   	     	
             var form_data = new FormData();               
             form_data.append('op_data', 1);  
       	 
       	  $.ajax({
			   url :'app/components/video/server_code/opcao_transmisao.php',
			   type : 'post',						
			   data : form_data,
			   cache:false,
		       contentType: false,
		       processData: false,				         
			   success : function( response) {
				}
			});
			return false;
         };	

         function info(){
         	 var trans="sEm_1nF0";
                 
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
  

         /** Metodo que efectuando configuração dos videos
         * @name configVideos
         * @function  
         */
         /** 
            @param {configVideos} 
         */    		
function configVideos()
{
 var timePoint = [];
 var start = 2;
 var end = 6;
 timePoint.push(setCuepoints(start,end));
		        
//cuePoints: {timePoint: vm.videoList[0].timePoint},
 if( idVideo !='f' && idVideo !='r' && idVideo !='c' && idVideo !='s' && idVideo != 0)
    {					
	 for (var i =0; i < vm.videoList.length ; i++){					  	     
	   	 if(vm.videoList[i].videoId == idVideo){
	  	 	vm.config = 
			{
			sources: vm.videoList[i].sources,
	    	theme: "assets/lib/videogular-themes-default/videogular.css",
			plugins: {		
			             poster: "assets/media/images/"+vm.videoList[i].maxres,				
		        		cuepoints: {
				    			theme: {url: "assets/css/cuepoints.css"},
					 				points: [
									{ time: 2 },
									{ time: 6 },
										],
									}
								}
					};
				     vm.title       = vm.videoList[i].title;
					 vm.description =	vm.videoList[i].description;	
					// vm.poster 	  = vm.videoList[i].maxres;
						  	
					$rootScope.leitor1 = false;
		            $rootScope.leitor2 = true; 
					 }					 
		    	  };  
					
	}
else{									
	vm.config = 
		{
		sources: vm.videoList[0].sources,
		theme: "assets/lib/videogular-themes-default/videogular.css",
		plugins: {
   				 poster:"assets/media/images/"+vm.videoList[0].maxres,
					
				cuepoints: {
				theme: {url: "assets/css/cuepoints.css"},
				points: [
				{ time: 2 },
				{ time: 6 },
						],
					}
				}
			};	
		    vm.title       = vm.videoList[0].title;
			vm.description = vm.videoList[0].description;
			//vm.poster 		= vm.videoList[0].maxres;	
			}           
            	     	    	
   	}
		// end configVideos
		
		
		/** Metodo que carrega video atraves da fonte do youtube
         * @name  getYoutubeVideos
         * @function  
         */
         /** 
            @param {getYoutubeVideos} 
         */  
		function getYoutubeVideos(ids) 
		{
			var videos = [];
			var promise = null;
			var baseUrl = 'https://www.googleapis.com/youtube/v3/';
			var key = 'AIzaSyCZaxwvGS5PFf2hFUY5zt4Z53GMxCbFZek';
			var channelId = 'UCYjR1WDHvrDbXKEIStlXZ4A';
			var userId = 'YjR1WDHvrDbXKEIStlXZ4A';
			var playlistId = 'PLq49fvBgsiq5arZwjLAoVcBJyCiL2NGSd';

			// loop for video ids
			for (var i=0; i<ids.length; i++)
			{
				var videoUrl = baseUrl + 'videos?&id='+ids[i].video_id+'&key='+key+'&part=snippet,contentDetails,statistics,status';
				
				// get video
				dataService.getData(videoUrl)
				.then(function successCallback(response) 
				{
				
					for (var i=0; i < response.items.length; i++)
					{
						var item = response.items[i];
						var video = {};
						video.sources = [{'src':vm.youtubeUrl+item.id}];
						video.title = item.snippet.title;
						video.categoria = item.snippet.category;
						video.description = item.snippet.description;
						//video.thumbnails = item.snippet.thumbnails;
						video.duration = item.contentDetails.duration;
						video.viewCount = item.statistics.viewCount;
						video.likeCount = item.statistics.likeCount;
						
						vm.videoList.push(video);
					}                    
					configVideos();
					
				}, 
				function errorCallback(response) {

				});
			} // end for
		};
		// end getYoutubeVideos		
		
		
		
		/** Metodo que carrega video atraves da fonte do local(apenas info do video)
         * @name  getLocalVideos
         * @function  
         */
         /** 
            @param {getLocalVideos} 
         */ 
		function getLocalVideos(dataService,categoria)
		{
			dataService.getData('app/components/video/server_code/getvideos')
			.then( function(response)
			{
				 if(categoria=='tudo')
				 {				 	
	                 for (var i=0; i < response.length; i++)
					  {						     
	                    var item = response[i];
						vm.metaInfo = {};
						var video = {};	
	                    video.sources  = [{'src':vm.youtubeUrl+item.video_id}];						
						video.title   = item.title;
						video.videoId  =item.video_id;
						video.categoria = item.category;
						video.description = item.synopsis;	
						video.logline = item.logline;			
						video.viewCount = item.viewCount;
						video.likeCount = item.likeCount;
						video.low = item.low;							
						video.medium = item.medium;
						video.high = item.high;
						video.maxres = item.maxres;
				        vm.videoUlr = 'assets/media/images/video_player.jpg';						
						vm.playButtonUrl = 'assets/media/icons/play-big.png';							
						vm.videoList.push(video);
					   }						
				 }	
				else
				{					
				   for (var i=0; i < response.length; i++)
			     	{			
					    var item = response[i];
						var video = {};
						video.categoria = item.category;

						if(video.categoria == categoria){						
							video.sources = [{'src':vm.youtubeUrl+item.video_id}];	
							video.videoId =item.video_id;					
							video.title = item.title;	
							video.description = item.synopsis;
							video.duration = item.duration;
							video.logline = item.logline;									
							video.low    = item.low;							
							video.medium = item.medium;
							video.high   = item.high;
							video.maxres = item.maxres;
							vm.c_titulo = categoria;	
							video.datas = item.datas;			
							vm.videoList.push(video);
					    }					  
					
				    }
				}
				configVideos();
			},
			function(response)
			{
			
			});
		}
		// end getLocalVideos
		
		
		/** Metodo que configura API quando o player estiver pronto
         * @name onPlayerRead
         * @function  
         */
         /** 
            @param {onPlayerRead} 
         */
		function onPlayerReady(API) 
		{
			vm.API = API;
		};
     	//end onPlayerRead

		
		/** Metodo que altera a fonte de video
         * @name setVideo
         * @function  
         */
         /** 
            @param {setVideo} 
         */
		function setVideo(index) 
		{           
			vm.API.stop();
			vm.config.sources = vm.videoList[index].sources;
			vm.config.poster =vm.videoList[index].maxres;
			vm.config.cuePoints = {timePoint: vm.videoList[index].timePoint};
			$rootScope.leitor1 = false;
		    $rootScope.leitor2 = true;
		 };
		 //end setVideo;


		/** Metodo que configura Cuepoints
         * @name setCuepoints
         * @function  
         */
         /** 
            @param {setCuepoints} 
         */
		function setCuepoints(start,end)
		{
			var result = {};
			var timelapse = {start: start, end: end};
			result.timeLapse = timelapse;

			result.onLeave = function onLeave(currentTime, timeLapse, params) 
			{
				alert('onleave');
			};

			result.onUpdate = function onUpdate(currentTime, timeLapse, params) 
			{
				console.log('onUpdate');
			};

			result.onComplete = function onComplete(currentTime, timeLapse, params) {
				alert('onComplete');
			};
			
			return result;
		}
        //end setCuepoints;
		
	}
})();