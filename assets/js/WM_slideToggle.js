jQuery(document).ready(function() {
	   var nav = $('.Navbar'); 
     var btn_top = $('.top-control');  

  	$("body").on('click', '#menu_btn', function(event) {
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

       $('body').on('click', '#main-menu ul li', function(event) {
           if($(window).width() < 783){
              $('nav').hide();
              }
           });
   

      $('body').on('click','.top-control',function(event) {
        $('html,body').animate({
             scrollTop:0
             },500);
      
        
      });
      
   


      $(window).scroll(function () {
        if ($(this).scrollTop() > 100 && $(window).width() < 783) {
            nav.addClass("f-nav");
         //   nav_menu.addClass("f-nav");
         } else {
            nav.removeClass("f-nav");
        }

        var self   = $(this),
            altura = self.height(),
            top    = self.scrollTop();

        if(top > altura ){
          if(!btn_top.is(':visible')){
           btn_top.fadeIn(200);
          }
        }
        else{
        btn_top.fadeOut(200);
         }

     });
  
});