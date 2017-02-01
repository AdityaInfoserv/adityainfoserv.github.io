var parameters =  new Array();

var settings_block = '<div class="block-settings-wrapper">\
		<div id="block_settings" class="block_settings">\
			<section>\
				<h3>HEADER STYLE</h3>\
				<ul>\
					<li class="header-index"><a href="index.html">Slideshow</a></li>\
					<li class="header-index-videobg"><a href="index-videobg.html">Video Background</a></li>\
				</ul>\
			</section>\
			<a href="#" id="settings_close">Close</a>\
		</div>\
	</div>';

//Init color buttons
function initColor() {
	$('.block-settings-wrapper section span').click(function() {	
		var cls = $(this).attr('class');
		$("link.colors").attr('href', 'layout/colors/'+cls+'.css');
	});
}

//Init open/close button	
function initClose() {
	parameters.push('opened');
	
	$('#settings_close').click(function(e) {
		$('body').toggleClass('opened-settings');
		
		if(!$.cookies.get('opened')) {
			$.cookies.set('opened', 'opened-settings');
		} else {
			$.cookies.del('opened');
		}
		
		e.preventDefault();	
	});
}

//Init cookies
function initCookies() {
	for(key in parameters) {
		var name = parameters[key];
		var parameter = $.cookies.get(name);
		if(parameter) {
			$('body').addClass(parameter);
		}
	}
}

$(document).ready(function() {
	$('body').prepend(settings_block);
	initColor();	
	initClose();
	initCookies();
	
	//Activate header style
	var url = window.location.href;
	var ind = url.lastIndexOf("/");
	url = url.substr(ind+1);
	
	ind = url.indexOf(".");
	url = url.substr(0, ind);
	
	if (url=="") {url = "index";}
	
	$page = $("li.header-"+url);
	
	$page.addClass("active");
	$page.append('<i class="fa fa-check"></i>');
});