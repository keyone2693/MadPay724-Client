
var ItrWoo = ItrWoo || {};

(function($) {

	"use strict";

	ItrWoo.load = {
		
		itr_globals: function(){
			
			$('.woocommerce-product-gallery__wrapper a').magnificPopup({
				type:'image',
				gallery: {
					enabled: true
				}
			});

			// product gallery..
			$('.it-has-gallery').each(function(){
				if ($(this).find('.catalog-wrap').find('.second-shop-catalog').length == 0){
					$(this).removeClass('it-has-gallery');
				}
			});

			var update_wishlist_count = function() {
		        $.ajax({
		            beforeSend: function () {
		 
		            },
		            complete  : function () {
		 
		            },
		            data      : {
		                action: 'update_wishlist_count'
		            },
		            success   : function (data) {
		                $('.top-cart a.wishlist_view span').html( data );
		            },
		 
		            url: yith_wcwl_l10n.ajax_url
		        });
		    };
		 
		    $('body').on( 'added_to_wishlist removed_from_wishlist', update_wishlist_count );

		},

		itr_woo_quick_view: function (){
			$('a.itr-quick-view').each(function(){
				var th = $(this);
				var rat = th.parent().find('.star-rating').clone();
				th.next('.itr_woo_quick_view').find('.itr-pro-rating').append(rat);
				th.on('click', function(e){
					e.preventDefault();
					$('.itr_overlay').fadeIn();
					th.next('.itr_woo_quick_view').fadeIn();
					th.next('.itr_woo_quick_view').find('.pro-img').slick({
						dots: false,
						arrows: true,
						vertical: false,
						slidesToShow: 1,
						touchMove: true,
						slidesToScroll: 1,
						infinite: false,
						prevArrow: '<a href="#" class="slick-prev fa fa-chevron-left"></a>',
						nextArrow: '<a href="#" class="slick-next fa fa-chevron-right"></a>',
					});
					th.next('.itr_woo_quick_view').find('.pro-img a.itr_pro_zoom').magnificPopup({
						type:'image',
						gallery: {
							enabled: true
						}
					});
				});
				
			});
			$('.itr_overlay').on('click',function(e){
				$('.itr_woo_quick_view').fadeOut();
				$(this).fadeOut();
			});
			$('.woocommerce .shop-item').each(function(){
				
				var th 		= $(this),
					cat 	= th.find(' > a > .catalog-wrap'),
					catH 	= parseInt(cat.outerHeight(),10),
					ad 		= th.find('a.button.add_to_cart_button'),
					gr 		= th.find('a.button.product_type_grouped'),
					vr 		= th.find('a.button.product_type_variable'),
					ex 		= th.find('a.button.product_type_external'),
					qv 		= th.find('a.itr-quick-view'),
					qvH 	= parseInt(qv.outerHeight(),10),
					tp 		= catH - qvH;

				ad.css('top', tp+'px');
				qv.css('top', tp+'px');
				vr.css('top', tp+'px');
				gr.css('top', tp+'px');
				ex.css('top', tp+'px');
			});
		}

	};

	ItrWoo.docLoad = {
		init: function(){
			ItrWoo.load.itr_globals();
			ItrWoo.load.itr_woo_quick_view();
		}
	};

	$(window).on( 'load', ItrWoo.docLoad.init );
	
})(jQuery);