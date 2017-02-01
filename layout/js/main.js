"use strict";

$(window).on("load", function() {	
	
	/***************************
	    - Hide page loader -
	***************************/
	$("#page-loader .page-loader-inner").delay(1000).fadeOut(500, function() {
		$("#page-loader").fadeOut(500);
	});
	
	flexInit("body");
	
	/******************
		- Isotope -
	******************/	
	if($().isotope) {		
		//Call isotope
		$('.masonry').each(function() {
			var $container = $(this);
			
			$container.imagesLoaded( function() {
				$container.isotope({
					itemSelector:".masonry-item",
					transformsEnabled:true //Important for videos
				});	
			});
		});		
		
		//Isotope: filter
		$(".filter li a").on("click", function() {			
			var parentul = $(this).parents("ul.filter").data("related-grid");
			$(this).parents("ul.filter").find("li a").removeClass("active");
			$(this).addClass("active");
			
			var selector = $(this).attr("data-option-value");
			$("#"+parentul).isotope({filter:selector}, function() {});
			
			return(false);
		});		
		
		//Isotope: reorganize
		function reorganizeIsotope() {
			$(".masonry.portfolio-entries").each(function() {
				var $container = $(this);
				
				var maxitemwidth = $container.data("maxitemwidth");
				if (!maxitemwidth) {maxitemwidth = 370;}
				
				var containerwidth = $container.width();
				var containerwidth = (containerwidth/110)*100;
				var itemrightmargin = parseInt($container.children("div").css("marginRight"));
				var rows = Math.ceil(containerwidth/maxitemwidth);
				var marginperrow = (rows-1)*itemrightmargin;
				var newitemmargin = marginperrow / rows;
				var itemwidth = Math.floor((containerwidth/rows)-newitemmargin+1);
				
				$container.css({"width":"110%"});
				$container.children('div').css({"width":itemwidth+"px"});
				
				if ($container.children('div').hasClass('isotope-item')) { $container.isotope( 'reLayout' ); }
			});
		}
		
		reorganizeIsotope();
			
		$(window).on("resize", function() {
			reorganizeIsotope();
		});		
	}	
	
	/******************************
		- Dropdown Navigation -
	******************************/	
	var timer = [];
   	var timerout= [];
	
	$("nav#main-nav li").each(function(index) {  
        if ($(this).find("ul").length > 0) {  
            var element = $(this);
            
			//Show subnav on hover  
            $(this).mouseenter(function() {
				if(timer[index]) {
                	clearTimeout(timer[index]);
                	timer[index] = null;
                }
				
                timer[index] = setTimeout(function() {
                	$(element).children('ul').fadeIn(200); 
                }, 150)
            }); 
			 
            //Hide submenus on exit  
            $(this).mouseleave(function() {  
				if(timer[index]) {
                	clearTimeout(timer[index]);
                	timer[index] = null;
              	}
              	
				timer[index] = setTimeout(function() {
                	$(element).children('ul').fadeOut(200); 
              	}, 150) 
            });  
        }  
    });
	
	$("nav#main-nav").on("click", "li", function() {
		if ($(window).width()<1025) {
			if ($(this).find("ul").length>0) {
				if ($(this).find("ul").css("display")!=="block") {
					$(this).children("ul").fadeIn(200);
					return false;	
				}
			}
		}
	});	
	
	/********************************
		- Responsive Navigation -
	********************************/	
	$('<a class="open-responsive-nav" href=""><span></span></a>').appendTo(".header-inner .menu");
	$("body #page-content").prepend('<div id="menu-responsive"><div id="menu-responsive-inner"><a href="" class="close-responsive-nav"><span></span></a><nav id="responsive-nav"><ul></ul></nav></div></div>');
	$("nav#responsive-nav > ul").html($("nav#main-nav > ul").html());
	
	$("header").on("click", ".open-responsive-nav", function() { 
		var topPos = $("header").height();
		var fullheight = $("#page-content").height()-topPos;
		
		$("#menu-responsive").css({"height":fullheight+"px", "top":topPos+"px"});
		
		if ($("#menu-responsive").css("right")==0 || $("#menu-responsive").css("right")=="0px") {
			hideResponsiveNav();
		} else {
			$("#menu-responsive").animate({"right":"0"}, 800, "easeInOutQuart");
			$("html, body").animate({scrollTop:0}, 1000, "easeInOutQuart");
		}
		
		return false;
	});
	
	$("#page-content").on("click", "#menu-responsive", function() { 
		hideResponsiveNav();
	});
	
	function hideResponsiveNav() {
		var right = $("#menu-responsive").width()+10;
		$('#menu-responsive').animate({"right":"-"+right+"px"}, 800, "easeInOutQuart");
	}	
	
	/***************
		- Tabs -
	***************/
	$(".tabs").each(function(i) {
		$(this).find(".tab-content").removeClass("active");
		var rel = $(this).find(".active").attr("href");
		$(this).find("."+rel).addClass("active");
	});
	
	$(".tab-nav").on("click", "a", function() {		
		var parentdiv = $(this).parent("li").parent("ul").parent("div");
		var rel = $(this).attr("href");
		
		$(parentdiv).find(".tab-nav a").removeClass("active");
		$(this).addClass("active");
		
		$(parentdiv).find(".tab-container .tab-content").hide().removeClass("active");
		$(parentdiv).find(".tab-container ."+rel).fadeIn(500).addClass("active");
		
		return(false);		
	});	
	
	/*****************************
		- Toggle & Accordion -
	*****************************/	
	$(".toggle-item").each(function(i) {
		$(this).find(".toggle-active").siblings(".toggle-inner").slideDown(300);							
	});
	
	$(".toggle-item").on("click", ".toggle-title", function() { 				
		var parentdiv = $(this).parent("div").parent("div");
		var active = $(this).parent("div").find(".toggle-inner").css("display");
		
		if ($(parentdiv).attr("class")=="accordion") {
			if (active!=="none") { 
				$(parentdiv).find(".toggle-item .toggle-inner").slideUp(300);
				$(this).toggleClass("toggle-active");
			} else {
				$(parentdiv).find(".toggle-item .toggle-inner").slideUp(300);
				$(parentdiv).find(".toggle-item .toggle-title").removeClass("toggle-active");
				
				$(this).toggleClass("toggle-active");
				$(this).siblings(".toggle-inner").slideDown(300);
			}
		} else {
			$(this).toggleClass("toggle-active");
			$(this).siblings(".toggle-inner").slideToggle(300);
		}
		
		return(false);
	});	
	
	/**********************
		- Back to top -
	**********************/
	$("#backtotop").on("click", function() {
		$("html, body").animate({scrollTop:0}, 1000, "easeInOutQuart");
		return false;						   
	});	
	
	/******************************
		- Overlay info center -
	******************************/
	$(".overlayinfo").each(function() {
		var infoHeight = parseInt($(this).height()/2);	
		$(this).css({"marginTop":"-"+infoHeight+"px"});
	});
	
	/*********************
		- Fit videos -
	*********************/
	if($().fitVids) { 
		$("body").fitVids();
	}
	
	/*******************
		- Parallax -
	*******************/
	if($().parallax) { 
		$(".parallax-section").parallax();
	}		
	
	/*****************************
		- Responsive jPlayer -
	******************************/
	if($().jPlayer && $(".jp-interface").length) {
		$(".jp-interface").each(function() { 
			var playerwidth = $(this).width();	
			var newwidth = playerwidth-175;
			$(this).find(".jp-progress-container").css({width:newwidth+"px"});
		});
	}
	
	/****************************
		- Revolution slider -
	****************************/
	if($().revolution) {
		$(".home-slider").revolution({
			startwidth:1100,
			startheight:500,
			delay:10000,
			onHoverStop:"on",
			navigationType:"none",
			fullWidth:"off",
			fullScreen:"on",
			fullScreenOffsetContainer:"#pseudo-header"
		});
	}	
	
	/*******************
		- Video BG -
	*******************/
	if($().bgVideo) { 
		setTimeout(function() {
			$(".videobg-section").bgVideo();
		}, 1000);
	}	
	
	/***********************
		- Owl carousel -
	***********************/
	if($().owlCarousel) { 
		$("#portfolio-carousel").owlCarousel({
    		navigation:false,
			items:4,
			itemsCustom:false,
			itemsDesktop:[1199,4],
			itemsDesktopSmall:[980,3],
			itemsTablet:[768,2],
			itemsTabletSmall:false,
			itemsMobile:[479,1],
		});
	}
	
	/***********************
		- Google Map -
	***********************/	
	if($("#map").length) {
		function mapinitialize() {
			var latlng = new google.maps.LatLng($(".map-address").data("lat"), $(".map-address").data("lng"));
			
			var myOptions = {
				zoom:14,
				center:latlng,
				scrollwheel:false,
				scaleControl:false,
				disableDefaultUI:false,
				mapTypeId:google.maps.MapTypeId.ROADMAP
			};
			
			var map = new google.maps.Map(document.getElementById("map"),myOptions);
			
			var image = "images/map-pin.png";
			
			var marker = new google.maps.Marker({
				map:map, 
				icon:image,
				position:map.getCenter()
			});
			
			var contentString = $(".map-title").html()+$(".map-address").html();
			
			var infowindow = new google.maps.InfoWindow({
				content:contentString
			});
						
			google.maps.event.addListener(marker, "click", function() {
			  infowindow.open(map,marker);
			});								
		}
		
		mapinitialize();
	}
	
	//Smooth show
	smoothShow();
		
});

$(window).on("scroll", function() {
	smoothShow();
});

//Smooth show function for elements that take action when visible (Counter, animations, skills)
function smoothShow() {	
	/******************
		- Counter -
	******************/
	$(".counter-value").each(function() {
		if ($(window).width()>700) {
			var visible = $(this).visible(false);
			
			if ($(this).hasClass("anim")) {} 
			else if (visible) {
				$(this).addClass("anim");
				
				var from = parseInt($(this).attr("data-from"));
				var to = parseInt($(this).attr("data-to"));
				var speed = parseInt($(this).attr("data-speed"));
				
				$(this).count(from, to, speed);
			}
		} else {
			var to = parseInt($(this).attr("data-to"));
			$(this).html(to);
		}
	});	
	
	/*****************************
		- General animations -
	*****************************/
	$(".sr-animation").each(function() {
		if ($(window).width()>700) {
			var visible = $(this).visible(true);
			var delay = $(this).attr("data-delay");
			
			if (!delay) {delay = 0;}
			
			if ($(this).hasClass("animated")) {} 
			else if (visible) {
				$(this).delay(delay).queue(function() {
					$(this).addClass("animated")
				});
			}
		} else {
			$(this).addClass("animated");	
		}
	});	
	
	/**************************
		- Skill animation -
	**************************/
	$(".skill").each(function() {
		var visible = $(this).visible(true);
		var percent = $(this).find('.skill-bar .skill-active ').attr('data-perc');
		
		if ($(this).hasClass("anim")) {} 
		else if (visible) {
			var randomval = Math.floor(Math.random()*(300-50+1))+50;
			
			$(this).addClass("anim");
			
			$(this).find(".skill-bar .skill-active").animate({"width":percent+"%"}, 2000, "easeInOutQuart", function() {
				$(this).find(".tooltip").delay(randomval).animate({"top":"-28px", "opacity":1}, 500);	
			}).css("overflow", "visible");
		}
	});			
}

//Flex slider init function because it also has to be reinitialised after a portfolio item is loaded
function flexInit(el) { 
	/**********************
		- Flex slider -
	**********************/
	if($().flexslider) { 
		$(el+" .flexslider").flexslider({
			animation:"slide",
			slideshowSpeed:7000,
			animationDuration:1000,
			slideshow:false,
			directionNav:false,
			controlNav:true,
			smoothHeight:true,
			touch:true,
			video:true,
			randomize:false
		}); 
	}	
}