jQuery(document).ready(function() {
	   
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

       
     var nav = $('.Navbar');    
      $(window).scroll(function () {
        if ($(this).scrollTop() > 136) {
            nav.addClass("f-nav");
         } else {
            nav.removeClass("f-nav");
        }
     });

  
});