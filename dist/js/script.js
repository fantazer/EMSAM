$(document).ready(function(){

	//resize block
	$(window).resize(function(){
		slideUserInfo();
	});

	var slideUserInfo = function(){
		if($(window).width() < 769 ){
			$('.history__el-wrap').click(function(){
				$(this).find('.personal-sub').slideDown();
			})
		}
	};
	slideUserInfo();
	//resize block end


	//pesonal tab
	$('.history__el').click(function(){
		var currentEl =  $(this).index();

		$('.history__el').removeClass('history__el--active');
		$(this).addClass('history__el--active');

		$('.personal').removeClass('personal--show');
		$('.personal').each(function(){
			if($(this).index()==currentEl){
				$(this).addClass('personal--show');
			}
		});
	});


	
	//pesonal tab end

	//video
	$('.video-layer').on('click', function(ev) {
    $(".introVideo")[0].src += "&autoplay=1";
    ev.preventDefault();
 		$('.video-layer').hide();
 		$('.video-img').hide();

  });
	//video end


	//tab
	$('.tab__el').click(function(){
		var currentTab = $(this).data('tab');
		$('.tab__el').removeClass('tab__el--active');
		$(this).addClass('tab__el--active')
		$('.tab__cont').each(function(){
			if($(this).data('tab') == currentTab ){
				$(this).removeClass('tab__cont--hide');
			} else {
				$(this).addClass('tab__cont--hide');
			}
		})
	})
	//tab end

	//init nice select
	$("select").each(function(){
		var currentData = $(this).data('placeholder');
		$(this).select2({
			minimumResultsForSearch: Infinity,
			placeholder: currentData
		});
	});

	// //add icon caret
	$('b[role="presentation"]').hide();
	$('.select2-selection__arrow').append('<svg class="icon-select-arrow"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#small-arrow-down"></use></svg>');


	//init nice select-end

	//show message cart empty
	var emptyCart = function(){
		var numberItems = $('.cart__row').length;
		console.log(numberItems);
		if(numberItems==0){
			$('.cart-empty').removeClass('cart-empty--hide')
			$('.cart-full').addClass('cart-empty--hide')
		}
	};
	emptyCart();
	//show message cart empty end

	//cart clear
	$('.cart__row .cart__clear').click(function () {
			$(this).closest('.cart__row').remove();
			emptyCart();
	});
	//cart clear end

	//increment

		//increment field
		$('.incr__minus').click(function () {
					var $input = $(this).parent().find('.incr__val span');
					var count = parseInt($input.html()) - 1;
					count = count < 1 ? 0 : count;
					$input.html(count);
			});

		$('.incr__minus.incr--one').click(function () {
					var $input = $(this).parent().find('.incr__val span');
					var count = parseInt($input.html()) - 1;
					count = count < 2 ? 1 : count;
					$input.html(count);
			});

		$('.incr__plus').click(function () {
				var $input = $(this).parent().find('.incr__val span');
				var count = parseInt($input.html()) + 1;
				count = count > 100 ? 100 : count;
				$input.html(count);
		});

		//increment field end

		//check val in el < 0

		 $('.el .incr__nav').add('.el-big .incr__nav').click(function () {
		 	$(this).closest('.el').addClass('el--active');
		 	currentIncr = $(this).closest('.incr').find('.incr__val span').html()*1;
		 	if(currentIncr == 0){
		 		$(this).closest('.el').removeClass('el--active');
		 		$(this).closest('.incr').find('.incr__val span').html(0)
		 	}

		 });
		//check val in el < 0 end

		//animate cart on add
		$('.incr__nav').click(function () {
			$('.toolbar-cart__icon').addClass('animate-basket');
			setTimeout(function(){
					$('.toolbar-cart__icon').removeClass('animate-basket');
				}, 400);
		});
		//animate cart on add end



		//remove item in basket by decrement
		var Incr;

		$('.cart__row .incr__nav').click(function () {
			Incr = $(this).closest('.incr').find('.incr__val span').html()*1;
			if(Incr == 0){
				$(this).closest('.cart__row').remove();
			}
			emptyCart()
		});
		//remove item in basket by decrement end
	//increment-end

	//arrow scroll
	var scrollTop = 750;
	$(window).scroll(function() {
		var scroll = $(this).scrollTop();
		if ( scroll >= scrollTop ) {
				//var heightHeader=$('.header-main-wrap').height();
				$('.toolbar-up').addClass('toolbar-up--show');
			}
			else {
					$('.toolbar-up').removeClass('toolbar-up--show');
			}
	});

	$('.toolbar-up').click(function() {
    $('html, body').animate({scrollTop: 0},800);
    return false;
  });
	//arrow scroll end

	//100vh tab size
	function setHeight(el) {
	   var windowHeight = $(window).height(),
	       $block = $(el);
	    if(windowHeight < 768) {
	         $block.css({'height': windowHeight  + 'px'})
	    } else {
	       $block.css({'height': ''})
	    }
	}
	$(window).on('resize orientationchange', function(){
		setHeight('.module');
		//setHeight('.main-page__first-section-slider');
	});
	//setHeight('.main-page__first-section-slider');

	//100vh tab size end

	//animate module
	var scrollPos = 0;
	var hideModule = function () {
		setHeight('.module');
		$('.module__cont').removeClass('module__cont--open');
		$('.mobile-nav__toggle').removeClass('mobile-nav__toggle--back');
		$('.content-filter').removeClass('content-filter--open');
		if($('.get-module').hasClass('get-module--active')){
					$('body').css({
            overflow: '',
            position: '',
            top: ''
        }).scrollTop(scrollPos);
        $('.module').add('.menu').add('.toolbar').css({
            top : 0
        });
			}
	};

	var fixWindowSize = function () {
		scrollPos = $('body').scrollTop();
    $('body').css({
            overflow: 'hidden',
            position: 'fixed',
            overflowY: 'scroll',
            top : -scrollPos,
            width:'100%'
        });
		$('.content-filter').addClass('content-filter--open');
		$('.module').add('.menu').add('.toolbar').css({
            top : scrollPos
        });

	};

	$('.get-module').click(function(event){
			$('.module__cont').removeClass('module__cont--open');
			var currentModule = $(this).attr('data-module');
			$('.get-module').not(this).removeClass('get-module--active');
			hideModule();

			setHeight('.module');

			if(!$(this).hasClass('get-module--active')){
				$(this).addClass('get-module--active');
				$('.module').each(function () {
					if ($(this).attr('data-module')==currentModule){
						$('.module').not(this).removeClass('module--open');
						$(this).addClass('module--open');
						$(this).find('.module__cont').toggleClass('module__cont--open');
						event.stopPropagation();
					}
				});
				fixWindowSize();
			} else {
				$(this).removeClass('get-module--active');

				hideModule();
			}
	});

	$('.module__cont').on("click", function (event) {
		event.stopPropagation();
	});
	$(document).on("click", function () {
			hideModule();
			$('.module').removeClass('module--open');
			$('.get-module').removeClass('get-module--active');
	});

		// close description
		$('.item-info__content-close').click(function(){
			hideModule();
			$('.module').removeClass('module--open');
		});
	//animate module end

	//modal
	var closeModal = function () {
  	$('.modal-layer').removeClass('modal-layer-show');
  	$("body").removeClass("modal-fix");
  	$('body').css({
            overflow: '',
            position: '',
            top: ''
        }).scrollTop(scrollPos);
	};

	$('.modal-close , .modal-filter').click(function (){
		closeModal();
	});


	$('.modal-get').add('.show-modal').click(function (){
		hideModule();
		if(!$('.modal-layer').hasClass('modal-layer-show')){
			$('.modal-layer').addClass('modal-layer-show');
		}
		if(!$("body").hasClass("modal-fix")){
			$("body").addClass("modal-fix");
			 scrollPos = $('body').scrollTop();
        $('body').css({
            overflow: 'hidden',
            position: 'fixed',
            overflowY: 'scroll',
            top : -scrollPos,
            width:'100%'
        });
		}
		var currentModal = $(this).data("modal");
		$('.modal').each(function () {
			if ($(this).data('modal')===currentModal){
				$(this).addClass('modal__show')
			} else {
				$(this).removeClass('modal__show')
			}
		});

	});

	$('.toggle-close-modal').click(function (){
		closeModal();
	});
	//modal end

	$(".main-page__first-section-slider").owlCarousel({
	 items : 1,
	 //autoHeight : true,
	 dots: true,
	 autoplay : false,
	 nav:false,
	 stagePadding: 0
	 }
	);

	//review slider
	var initSlider = function (wrap) {
		$(wrap).find('.item-slider__wrap').owlCarousel({
			 items : 1,
			 dots: false,
			 autoplay : false
		 }
		);
		var owl = $(wrap).find('.item-slider__wrap');
		owl.owlCarousel();
		$(wrap).find('.item-slider__nav-next').click(function() {
				owl.trigger('next.owl.carousel');
		})
		$(wrap).find('.item-slider__nav-prev').click(function() {
				owl.trigger('prev.owl.carousel', [300]);
		})
	}

	initSlider('.item-slider--review');
	initSlider('.item-slider--news');


	//show description incr
		$('.item-info__get').click(function(){
			$(this).hide();
			$('.item-info__incr').show();
		});
		$('.item-info__content .incr__nav').click(function(){
			var itemSize = $(this).closest('.incr').find('span').html();
			if(itemSize == 0){
				$('.item-info__get').show();
				$('.item-info__incr').hide();
				$(this).closest('.incr').find('span').html('1')
			}
		});

	//set active class on mobile menu
	 $('.enter-account__text .get-module').click(function(){
			$('.mobile-nav__account').addClass('get-module--active')
		});

		$('.cart-get__el').click(function(){
			$('.mobile-nav__cart').addClass('get-module--active')
		});
		$('.icon.menu-back').click(function(){
			$('.mobile-nav__toggle').addClass('get-module--active')
		});
	//set active class on mobile menu end

	//toggle icon mobile menu
		$('.mobile-menu-get-full').click(function(){
			$('.mobile-nav__toggle').addClass('mobile-nav__toggle--back');
		});
	//toggle icon mobile menu end

	//template scroll bar
	$('.module__cont, .descript__cont , .info-block , .scroll-block').perfectScrollbar();
	//template scroll bar end

	//message for old IE
	function isIE () {
	  var myNav = navigator.userAgent.toLowerCase();
	  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
	}

	if (isIE() < 10 &&  isIE()) {
		$('body').empty();
		$('body').prepend('<div class="old-browser"><div class="old-browser-text"> Браузер не поддерживается =(</div></div>');
	}


	// init custom scroll
	/*$(".descript__col--description").mCustomScrollbar({
		autoDraggerLength: false // size druger
	});*/
	// init custom scroll end

	//for init SVG
	svg4everybody();
	// ==== clear storage =====
	 localStorage.clear();
	 sessionStorage.clear();

	 $(window).unload(function(){
	   localStorage.clear();
	 });
	// ==== clear storage end =====




})

//cash SVG

;( function( window, document )
{
	'use strict';

	var file  = 'img/pack.html',
		revision = 1;

	if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect )
		return true;

	var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null,
		request,
		data,
		insertIT = function()
		{
			document.body.insertAdjacentHTML( 'afterbegin', data );
		},
		insert = function()
		{
			if( document.body ) insertIT();
			else document.addEventListener( 'DOMContentLoaded', insertIT );
		};

	if( isLocalStorage && localStorage.getItem( 'inlineSVGrev' ) == revision )
	{
		data = localStorage.getItem( 'inlineSVGdata' );
		if( data )
		{
			insert();
			return true;
		}
	}

	try
	{
		request = new XMLHttpRequest();
		request.open( 'GET', file, true );
		request.onload = function()
		{
			if( request.status >= 200 && request.status < 400 )
			{
				data = request.responseText;
				insert();
				if( isLocalStorage )
				{
					localStorage.setItem( 'inlineSVGdata',  data );
					localStorage.setItem( 'inlineSVGrev',   revision );
				}
			}
		}
		request.send();
	}
	catch( e ){}

}( window, document ) );