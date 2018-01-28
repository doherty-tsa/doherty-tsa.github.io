// Navigation

var nav = document.querySelector('.cd-auto-hide-header');
var position = 0;

window.addEventListener('scroll', function(){
    if (window.pageYOffset >= ($('.cd-auto-hide-header').data('threshold'))) {
        nav.classList += (" minified");
    }
    else {
        nav.classList.remove("minified");
    }
})


jQuery(document).ready(function($){
	var mainHeader = $('.cd-auto-hide-header'),
		secondaryNavigation = $('.cd-secondary-nav'),
		//this applies only if secondary nav is below intro section
		belowNavHeroContent = $('.sub-nav-hero'),
		headerHeight = mainHeader.height();
	
	//set scrolling variables
	var scrolling = false,
		previousTop = 0,
		currentTop = 0,
		scrollDelta = 10,
		scrollOffset = 650;

	mainHeader.on('click', '.nav-trigger', function(event){
		// open primary navigation on mobile
		event.preventDefault();
		mainHeader.toggleClass('nav-open');
        nav.classList += (" minified");
	});

	$(window).on('scroll', function(){
		if( !scrolling ) {
			scrolling = true;
			(!window.requestAnimationFrame)
				? setTimeout(autoHideHeader, 250)
				: requestAnimationFrame(autoHideHeader);
		}
	});

	$(window).on('resize', function(){
		headerHeight = mainHeader.height();
	});

	function autoHideHeader() {
		var currentTop = $(window).scrollTop();

		( belowNavHeroContent.length > 0 ) 
			? checkStickyNavigation(currentTop) // secondary navigation below intro
			: checkSimpleNavigation(currentTop);

	   	previousTop = currentTop;
		scrolling = false;
	}

	function checkSimpleNavigation(currentTop) {
		//there's no secondary nav or secondary nav is below primary nav
	    if (previousTop - currentTop > scrollDelta) {
	    	//if scrolling up...
	    	mainHeader.removeClass('is-hidden');
	    } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
	    	//if scrolling down...
	    	mainHeader.addClass('is-hidden');
	    }
	}

	function checkStickyNavigation(currentTop) {
		//secondary nav below intro section - sticky secondary nav
		var secondaryNavOffsetTop = belowNavHeroContent.offset().top - secondaryNavigation.height() - mainHeader.height();
		
		if (previousTop >= currentTop ) {
	    	//if scrolling up... 
	    	if( currentTop < secondaryNavOffsetTop ) {
	    		//secondary nav is not fixed
	    		mainHeader.removeClass('is-hidden');
	    		secondaryNavigation.removeClass('fixed slide-up');
	    		belowNavHeroContent.removeClass('secondary-nav-fixed');
	    	} else if( previousTop - currentTop > scrollDelta ) {
	    		//secondary nav is fixed
	    		mainHeader.removeClass('is-hidden');
	    		secondaryNavigation.removeClass('slide-up').addClass('fixed'); 
	    		belowNavHeroContent.addClass('secondary-nav-fixed');
	    	}
	    	
	    } else {
	    	//if scrolling down...	
	 	  	if( currentTop > secondaryNavOffsetTop + scrollOffset ) {
	 	  		//hide primary nav
	    		mainHeader.addClass('is-hidden');
	    		secondaryNavigation.addClass('fixed slide-up');
	    		belowNavHeroContent.addClass('secondary-nav-fixed');
	    	} else if( currentTop > secondaryNavOffsetTop ) {
	    		//once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset 
	    		mainHeader.removeClass('is-hidden');
	    		secondaryNavigation.addClass('fixed').removeClass('slide-up');
	    		belowNavHeroContent.addClass('secondary-nav-fixed');
	    	}

	    }
	}
});


// Arc text
var arc = document.querySelector('.arc');
$(arc).arctext({radius: 1500});

// Countup

var countUpElement1 = document.querySelector('.count-up1');
var countUpElement2 = document.querySelector('.count-up2');
var countUpElement3 = document.querySelector('.count-up3');
var countUpElement4 = document.querySelector('.count-up4');

var options = {
  useEasing: true, 
  useGrouping: true, 
  separator: ',', 
  decimal: '.', 
};
var demo1 = new CountUp(countUpElement1, 0, 18, 0, 2.5, options);
if (!demo1.error) {
  demo1.start();
} else {
  console.error(demo1.error);
}
var demo2 = new CountUp(countUpElement2, 0, 2014, 0, 2.7, options);
if (!demo2.error) {
  demo2.start();
} else {
  console.error(demo2.error);
}
var demo3 = new CountUp(countUpElement3, 0, 473, 0, 2.9, options);
if (!demo3.error) {
  demo3.start();
} else {
  console.error(demo3.error);
}
var demo4 = new CountUp(countUpElement4, 0, 2800, 0, 3.1, options);
if (!demo4.error) {
  demo4.start();
} else {
  console.error(demo4.error);
}

// Timeline

jQuery(document).ready(function($){
	var contentSections = $('.cd-section'),
		navigationItems = $('#cd-vertical-nav a');

	updateNavigation();
	$(window).on('scroll', function(){
		updateNavigation();
	});

	//smooth scroll to the section
	navigationItems.on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });
    //smooth scroll to second section
    $('.cd-scroll-down').on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });

    //open-close navigation on touch devices
    $('.touch .cd-nav-trigger').on('click', function(){
    	$('.touch #cd-vertical-nav').toggleClass('open');
  
    });
    //close navigation on touch devices when selectin an elemnt from the list
    $('.touch #cd-vertical-nav a').on('click', function(){
    	$('.touch #cd-vertical-nav').removeClass('open');
    });

	function updateNavigation() {
		contentSections.each(function(){
			$this = $(this);
			var activeSection = $('#cd-vertical-nav a[href="#'+$this.attr('id')+'"]').data('number') - 1;
			if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
				navigationItems.eq(activeSection).addClass('is-selected');
			}else {
				navigationItems.eq(activeSection).removeClass('is-selected');
			}
		});
	}

	function smoothScroll(target) {
        $('body,html').animate(
        	{'scrollTop':target.offset().top},
        	600
        );
	}
});

// Twitter Feed

//Follow Button Effect

$(document).ready(

	function iniciar(){
	$('#doherty-follow').on("click", function(){
		$('#doherty-follow').css('background-color','#34CF7A');
		$('#doherty-follow').html('<div class="icon-ok"></div> Following');
	});	
	$('#pltw-follow').on("click", function(){
		$('#pltw-follow').css('background-color','#34CF7A');
		$('#pltw-follow').html('<div class="icon-ok"></div> Following');
	});	
	$('#d11-follow').on("click", function(){
		$('#d11-follow').css('background-color','#34CF7A');
		$('#d11-follow').html('<div class="icon-ok"></div> Following');
	});	
	}

);

// Home Slider

$('.slick-codepen').slick({
  draggable: false,
  accessibility: true,
  centerMode: true,
  variableWidth: true,
  slidesToShow: 3,
  speed: 800,
  arrows: true,
  dots: true,
  swipeToSlide: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3200
});


var prevSlideInterval = null,
    nextSlideInterval = null;

function prevSlideAnimation() { $('.slick-codepen').slickPrev(); };
function nextSlideAnimation() { $('.slick-codepen').slickNext(); };

$('.slick-prev').on('mouseenter', function() {
  prevSlideInterval = window.setInterval(function(){ prevSlideAnimation() }, 200);
});

$('.slick-prev').on('mouseleave', function() {
  window.clearInterval(prevSlideInterval);
});

$('.slick-next').on('mouseenter', function(){
  nextSlideInterval = window.setInterval(function(){ nextSlideAnimation() }, 200);
});

$('.slick-next').on('mouseleave', function() {
  window.clearInterval(nextSlideInterval);
});

// Smooth-Scroll Button

$(function(){
    $("#scroll").click(function(e){
        e.preventDefault();
        $path=$("#colorado-springs-parallax").offset().top;
        $('body,html').animate({scrollTop:$path},1500);
    });
});

// Home Screen Vector Animation

