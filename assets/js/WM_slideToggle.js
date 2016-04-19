jQuery(document).ready(function() {
	   $('nav').hide();
  	$("body").on('click', '#btn_menu', function(event) {
      event.preventDefault();
      $("nav").slideToggle();
     
    });
      
   

    $(window).resize(function() {
        if($(window).width() > 783){
           $('nav').show();            

        }
        else{
           $('nav').hide();
        }
                 
                         
    });

  
});