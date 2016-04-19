(function () { 'use strict';

	angular.module('app').controller('VideoPlayerController', VideoPlayerController);
	
	VideoPlayerController.$inject = ['$location','$interval','$rootScope','dataService','$stateParams','ngDialog'];
	function VideoPlayerController($location,$interval,$rootScope,dataService,$stateParams,ngDialog)
	{
		 
		var vm = this;
		vm.API = null;
		vm.config = {};
		vm.videoList = [];
		vm.onPlayerReady = onPlayerReady;
		vm.setVideo = setVideo;
		vm.youtubeUrl = "https://www.youtube.com/watch?v=";
		//vm.youtubeUrl = "https://www.youtube.com/embed/";
		vm.no_relate= "&rel=1";
		var idVideo ;
		var videoSource = 'local';
		var live_Id="";
		var montharray=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
        var ano,mes,dia,hora,minuto;
        var check_trans;
        var data;
		
		(function initController()
		{
         var action = $stateParams.action;
         if(action ==''){
          idVideo = 0;  
          $rootScope.lg=true;
		  $rootScope.ad=false;
		  $rootScope.leitor1 = true;
		  $rootScope.leitor2 = false;	
         }
           else if(action=='ltvk'){
           	$rootScope.leitor1 = true;
           	$rootScope.leitor2 = false;

           	$rootScope.lg=true;
		    $rootScope.ad=false;
           }
         else{
         	idVideo = action;      
         	$rootScope.leitor1 = false;
		    $rootScope.leitor2 = true; 

		    $rootScope.lg=true;
		    $rootScope.ad=false;  	
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
				 // $location.path('/index');
				  
         }
			      
		})();
		// get videos ids
		dataService.getData('app/components/video/getvideos.php')
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
			live();
		    getTransmissao();
			
			
		},
		function (error) {
			// handle errors here
			alert(error.statusText);
		});
		
           function live(){
           for (var i =0; i < vm.vd.length ; i++){
	          if(vm.vd[i].low =='tvkultura.png'){
	            var op = vm.vd[i].logline;
	             vm.title_tv = vm.vd[i].title;
	              switch(op){
		        	case 0:
		        	    $rootScope.live_ico=true;
		        	    $rootScope.live_ip=true;
		        	    $rootScope.live_text=false;
		        	    $rootScope.leitor1 = false;
		        	    $rootScope.leitor2 = true;	
		        	    $interval.cancel(time);	        	    
		        	break;
		            case 1:
		                $rootScope.live_ico=true;
		                $rootScope.live_tv=true;
		                $rootScope.live_text=false;
		                $rootScope.leitor1 = true;
		        	    $rootScope.leitor2 = false;
		        	    $interval.cancel(time);
		        	   
		        	break;	            
		            case 2:
		            	 $rootScope.live_ico=true;
		            	 $rootScope.live_ip =true;
		            	 $rootScope.live_tv =true;
		            	 $rootScope.live_text=false;
		            	 $rootScope.leitor1 = true;
		        	     $rootScope.leitor2 = false;
		        	     $interval.cancel(time);		        	    
		        	break;
		            case -1:
		            	  $rootScope.live_ico=false;
		            	  $rootScope.live_text=true;
		            	  $rootScope.leitor1 = false;
		        	      $rootScope.leitor2 = true;

		            break;    
	            }	
	          }	
	          else if(vm.vd[i].low =='ipercentro.png'){
	          	vm.title_ip = vm.vd[i].title;
	          	vm.video_id_ip = vm.vd[i].video_id;
	          }
		  }
		}

		 function getTransmissao(){        	   
             
              $.ajax({
			   url :'app/components/video/pullJsonData.php',
			   type : 'get',	
			   dataType: 'json',					
			   cache:false,				         
			   success : function( response) {	
			   	    
			         data = $.parseJSON(response);	
			         check_trans = data.transmissao.toString().substring(0,1);
                    
                        ano    = data.transmissao.toString().substring(0,4);										
						mes    = data.transmissao.toString().substring(5,7);
						dia    = data.transmissao.toString().substring(8,10);
						hora   = data.transmissao.toString().substring(11,13);
						minuto = data.transmissao.toString().substring(14,16);	
              		}
			});
			return false;
         }

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
						$rootScope.live_ico=true;
		                $rootScope.live_tv=true;
		                $rootScope.live_text=false;
		                $rootScope.leitor1 = true;
		        	    $rootScope.leitor2 = false;
		        	    $rootScope.ckTV = true;		        	   
		        	    $location.path('/index');
		        	    live_ops();	
		        	    $interval.cancel(time);	        	    
			return;
			}
			else
			$rootScope.aviso_texto="TRASMISSÃO AO VIVO DISPONIVEL DENTRO DE "+dhour+"H"+dmin+"m"+dsec+"s";
	    }
	  var time=$interval(function() {
			if(check_trans == 2){
			countdown(ano,mes,dia,hora,minuto);		

			}
			else{
                 $rootScope.aviso_texto =data.transmissao.toString();
			}
		
	   },1000);


	       function  live_ops(){       	     	

         	  var form_data = new FormData();               
              form_data.append('log_old', -1); 
              form_data.append('log_new', 1); 

              $.ajax({
			   url :'app/components/video/live_op.php',
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
//enter 

		// config videos
		
		function configVideos()
		{
			var timePoint = [];
			var start = 2;
			var end = 6;
			timePoint.push(setCuepoints(start,end));
		        
				//cuePoints: {timePoint: vm.videoList[0].timePoint},
              
               	if( idVideo !='f' && idVideo !='r' && idVideo !='c' && idVideo !='s' &&  idVideo != 0)
				    {					
					for (var i =0; i < vm.videoList.length ; i++){					  	     
						  	 if(vm.videoList[i].videoId == idVideo){
						  	 	vm.config = 
								{
									sources: vm.videoList[i].sources,
									theme: "assets/lib/videogular-themes-default/videogular.css",
									plugins: {
										
										
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
						   vm.poster 	  = vm.videoList[i].maxres;
						  	
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
							poster: vm.videoList[0].maxres,
							
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
					 vm.poster 		= vm.videoList[0].maxres;	
				}      	    	

				
		}
		// end configVideos
		
		
		// get videos from youtube source
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
		
		
		// get videos from local source
		function getLocalVideos(dataService,categoria)
		{
			dataService.getData('app/components/video/getvideos')
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
		
		
		// config API when player's ready
		function onPlayerReady(API) 
		{
			vm.API = API;
		};
		
		//change video source
		function setVideo(index) 
		{           
			vm.API.stop();
			vm.config.sources = vm.videoList[index].sources;
			vm.config.poster =vm.videoList[index].maxres;
			vm.config.cuePoints = {timePoint: vm.videoList[index].timePoint};
			$rootScope.leitor1 = false;
		    $rootScope.leitor2 = true;
		    
		};
		
		//config cuepoints
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
		
	}
})();