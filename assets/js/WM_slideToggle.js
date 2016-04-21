jQuery(document).ready(function() {
	   
  	$("body").on('click', '#menu_txt', function(event) {
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
        if ($(this).scrollTop() > 100 && $(window).width() < 783) {
            nav.addClass("f-nav");
         } else {
            nav.removeClass("f-nav");
        }
     });

  
});