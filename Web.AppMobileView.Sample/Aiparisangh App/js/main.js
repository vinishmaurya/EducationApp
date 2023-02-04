jQuery(".hamicon,.top-close").on("click", function(){
		jQuery(".sidemenu").toggleClass("open");								
});

jQuery(".hassubmenu").on("click", function(){
	jQuery(this).parent().find(".submenu").slideToggle();	
	jQuery(this).find(".submenu-right").toggleClass("downarrow");
});

jQuery(".hassubmenu2").on("click", function(event){
						
			jQuery(this).find(".submenu2").slideToggle();
				jQuery(this).find(".submenu-right").toggleClass("downarrow");

});

$('.initiatives,.initiatives2,.jantakiaawaz,.meriaawaz').slick({
  autoplay: false,
infinite: false,
  slidesToShow: 1,
});