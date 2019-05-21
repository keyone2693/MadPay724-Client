
var Munza = Munza || {};

(function($) {

	"use strict";

	var $rt = '';

	Munza.init = {

		itr_slick_sliders: function(){
			
			var runSlick = function() {
				var rt = ($('body').hasClass('rtl')) ? true : false;
				if($('.itr-carousel-slider').length > 0){
					
					$('.itr-carousel-slider').each(function(){
						var slides_n 	= parseInt($(this).attr('data-slidesnum'),10),
							sscrol 		= parseInt($(this).attr('data-scamount'),10),
							t_arr 		= $(this).attr('data-arrows'),
							t_type		= $(this).attr('data-type'),
							t_dots 		= $(this).attr('data-dots'),
							t_auto 		= $(this).attr('data-auto'),
							t_nx_ic		= $(this).attr('data-next-icon'),
							t_pv_ic		= $(this).attr('data-prev-icon'),
							t_bul_st	= $(this).attr('data-bullet-style'),
							ar_shape	= $(this).attr('data-arrow-shape'),
							aut 		= (t_auto == '1') ? true : false,
							arr 		= (t_arr == '1') ? true : false,
							tdots 		= (t_dots == '1') ? true : false,
							resp_n 		= (slides_n > 2) ? 2 : 1,						
							typ 		= (t_type == 'vertical') ? true : false;
						
						$(this).on('afterChange init', function(event, slick, direction){
							if( $(this).is('.multi-slides') ){
								// remove all prev/next
						        slick.$slides.removeClass('prevdiv').removeClass('nextdiv');
						        for (var i = 0; i < slick.$slides.length; i++) {
						            var $slide = $(slick.$slides[i]);
						            if ($slide.hasClass('slick-active')) {
						                $slide.prevAll().not('.slick-active').slice(0,sscrol).addClass('prevdiv');
						                $slide.nextAll().not('.slick-active').slice(0,sscrol).addClass('nextdiv');
						            }
						        }

						        for ( var j = 0; j < sscrol; j++ ) {
					            	$('.nextdiv').eq(j).css('transitionDelay', (j+1) * 170 +'ms');
					            }

					            for ( var k = sscrol; k >= 0; k-- ) {
					            	$('.prevdiv').eq(k).css('transitionDelay', (sscrol-k) * 170 +'ms');
					            }
							}
					        

					      }
					    ).on('beforeChange', function(event, slick) {
					        if( $(this).is('.multi-slides') ){
					        	$('.slick-slide').removeClass('prevdiv,nextdiv');
					        }
					    }).slick({
							slidesToShow: 	slides_n,
							slidesToScroll: sscrol,
							dots: 			tdots,
							speed: 			0,
							vertical: 		typ,
							rtl: 			rt,
							infinite: 		false,
							prevArrow: 		'<a href="#" class="anim_btn to-left slick-prev '+ ar_shape + '"><span><i class="' + t_pv_ic + '"></i><i class="btn_back ' + t_pv_ic + '"></i></span></a>',
							nextArrow: 		'<a href="#" class="anim_btn to-right slick-next ' + ar_shape + '"><span><i class="' + t_nx_ic + '"></i><i class="btn_back ' + t_nx_ic + '"></i></span></a>',
							dotsClass: 		'slick-dots ' + t_bul_st,
							autoplay: 		aut,
							arrows: 		arr,
							focusOnSelect: 	true,

							responsive: [{
								breakpoint: 1024,
								settings: {
									slidesToShow: resp_n,
									slidesToScroll: resp_n
								}
							},{
								breakpoint: 640,
								settings: {
									slidesToShow: 1,
									slidesToScroll: 1
								}
						    }]

						});

					});
				}

				if($('.itr-twitter-shortcode').length > 0){
					$('.itr-twitter-shortcode').each(function(){
						
						var th = $(this),
							heights = new Array();

						th.parent().prepend('<div class="itr_preloader"><i class="stline-loading-2"></i></div>');
						setTimeout( function() {
							
							var _html = th.next('iframe').contents().find("body");
							var tws = _html.find('.timeline-TweetList');
							tws.find('li').contents().unwrap();
							th.append(tws.html());
							th.next('iframe').remove();
							th.find('.timeline-LoadMore,iframe,.timeline-Header,.new-tweets-bar,.timeline-Footer,.timeline-Tweet-brand,.u-url.permalink.customisable-highlight,.retweet-credit,.inline-media,.footer.customisable-border,.timeline-Tweet-actions,.timeline-Tweet-metadata').remove();
							var slshow = th.data('slidesnum'),
								slscrl = th.data('scamount');
							if( th.hasClass('has-slider') ){
								th.on('init',function(event, slick){
									
									th.find('.slick-slide').each(function(){
								 		heights.push($(this).height());
									});
									var max = Math.max.apply( Math, heights );

									th.find('.slick-slide').each(function(){
										$(this).find('.timeline-Tweet').css('height',max+'px');
										$(this).css('height',max+'px');
										$(this).parents('.slick-list').css('height',max+'px');
									});

								}).slick({
									dots: false,
									slidesToShow: slshow,
									slidesToScroll: slscrl,
									infinite: true,
									arrows: true,
									speed: 500,
									rtl: rt,
									vertical: true,
									prevArrow: '<a href="#" class="slick-prev fa fa-chevron-left"></a>',
									nextArrow: '<a href="#" class="slick-next fa fa-chevron-right"></a>',
									autoplay: true
								});
							}

							th.parent().find('.itr_preloader').hide();

						}, 1500);
					});
				}

				if($('.itr-post-gallery').length > 0) {
					$('.itr-post-gallery').slick({
						dots: true,
						arrows: false,
						slidesToShow: 1,
						touchMove: true,
						slidesToScroll: 1,
						rtl: rt,
						autoplay:true,
						infinite: true,
						speed: 500,
					});
				}
				
			}
			runSlick();
		},

		itr_globals: function(){

			if($('.cp-img-compare-container').length){
				$('.cp-img-compare-container').comp_slider();
			}

			if($('.particles_section').length > 0){
				$('.particles_section', function () {
				    return new JParticles.particle('.particles_section .particles_inner', {
				        num: 150,
				        range: 180,
				        minSpeed: 0.1,
				        maxSpeed: .5,
				        proximity: 60,
				        parallax: true,
				        parallaxStrength: 15,
				        lineShape: 'cube'
				    });
				});
			}



			$('.team-box .social-list').each(function(){
		    	var lnk = $(this).find( 'a' );
		    	for (var i = 1; i < lnk.length; i++) {
		    		var trn = i * 100;
		    		lnk.eq(i).css( 'transitionDelay', trn + 'ms' );
		    	}
		    });

			$('.team-box.team-2 .social-list').each(function(){
				var th = $(this),
					lnks = th.find('a'),
					lnH = parseInt(lnks.height(),10)/2,
					els = lnks.eq(Math.floor((lnks.length - 1) / 2)),
					ind = els.index(),
					itms = th.find('a').length;					
				els.addClass('middle');
				for ( var i = 1; i <= ind; ++i ) {
					var hh = lnH * i;
					lnks.eq(i).css('bottom',-hh+'px');
				}
				for ( var j = ind+1 ; j > ind ; j-- ) {
					var jj = j-ind;
					var bb = lnH * jj;
					lnks.eq(j).css('bottom',-bb+'px');
				}
			});

			$('.full-row').each(function(){
				var th = $(this);
				th.parent('.container').addClass('container-fluid');
			});

			$('.wpb-js-composer .vc_tta.vc_general .vc_tta-tab > a > span').each(function(){
				var th = $(this),
					fst = th.text();
				th.attr('data-content',fst);
			});

			$('.layers_wraper').each(function(){
				var max_height = 0;
				var max_wdth = 0;
    			var image = null;
    			var image2 = null;
    			var ht = 0;
    			var wd = 0;
    			$(this).find('img').each(function(){
    				var cur_height = $(this).height(),
    					cur_wdth = $(this).width();
					if (cur_height > max_height) {
						max_height = cur_height;
						image = this;
					}
					if (cur_wdth > max_wdth) {
						max_wdth = cur_wdth;
						image2 = this;
					}

					ht = $(image).height();
					wd = $(image2).width();
					
					
    			});
    			$(this).find('img').parent().css('height',ht).css('width',wd);
    			$(image).parent().addClass('lg_wrapper');

    			$(this).css('width',wd).css('height',ht);

    			if( $(this).find('.lg_wrapper').length != 1 ){
    				$(this).find('.img_layer').eq(0).addClass('lg_wrapper');
    			}

			});

			// Pricing Content markup..
			$('.pricing_content').each(function(){
				$(this).contents().filter(function() {
					return this.nodeType == 3;
				}).wrap('<p></p>');
				$(this).find('br').remove();
			});

			$('.anim_letters').each(function(){
				$(this).find('.cp-slide').eq(0).addClass('cp-slide--current');
			});

		},

		itr_piecharts: function(){
			if($('.itr-circle-pie').length){
				$('.itr-circle-pie').each(function(){
					var th 		= $(this);
					th.appear(function() {
						th.circlechart();
					},{accY: -100});
				});
			}
		},

		itr_instagramfeed: function(){
			$('.instagram_wrap').each(function(){
				var th 			= $(this),
					id 			= th.attr('id'),
					get 		= th.attr('data-get'),
					client 		= th.attr('data-client'),
					access 		= th.attr('data-access'),
					sort 		= th.attr('data-sort'),
					resol 		= th.attr('data-resol'),
					wdt 		= th.outerWidth(),
					cols 		= th.attr('data-columns'),
					gp 			= parseInt(th.attr('data-gap'),10)*2,
					limit 		= th.attr('data-limit'),
					t_nx_ic 	= th.attr('data-next-icon'),
					t_pv_ic		= th.attr('data-prev-icon');

				if( client != '' && access != '' ){
					var feed = new Instafeed({
			            target: id,
			            get: get,
			            userId: client,
			            limit: limit,
			            sortBy: sort,
			            resolution: resol,
			            accessToken: access,
			            template: '<div class="insta_photo"><a href="{{link}}" target="_blank"><img src="{{image}}" /><span class="img_overlay"><b><i class="fa fa-heart-o" title="Likes"></i>{{likes}}</b><b><i class="fa fa-comment" title="Comments"></i>{{comments}}</b></span></a></div>',
			            after: function(){		        		
			        		if(th.is(".itr-insta-slider") && !th.is('.slick-slider')){
			        			var slidesnum = th.attr('data-slidesnum'),
									scamountz = parseInt(th.attr('data-scamountz'),10);
			        			th.slick({
									dots: false,
									arrows: true,
									slidesToShow: slidesnum,
									touchMove: true,
									infinite: true,
									prevArrow: '<a href="#" class="slick-prev '+t_pv_ic+'"></a>',
									nextArrow: '<a href="#" class="slick-next '+t_nx_ic+'"></a>',
									slidesToScroll: scamountz,
									autoplay:true,
									speed: 500
								});
			        		} else {
			        			var wd = (wdt/cols) - gp;
			        			th.find('.insta_photo').css('width',wd+'px');
			        		}
			            }
			        });
			        feed.run();	
				}

				
			});
		},

		itr_tweets: function(){
			if($('.widget_it_widget_tweets .tweet').length){
				$('.widget_it_widget_tweets .tweet').each(function(){
					var th = $(this),
						tw_num  = th.data('tweets-num');

					th.prepend('<div class="itr_preloader"><i class="main-color stline-loading-2"></i></div>');
					setTimeout( function() {		
						var _html = th.next('iframe').contents().find("body").html();
						th.append(_html);
						th.find('.timeline-LoadMore,iframe,.timeline-Header,.new-tweets-bar,.timeline-Footer,.timeline-Tweet-brand,.u-url.permalink.customisable-highlight,.retweet-credit,.inline-media,.footer.customisable-border,.timeline-Tweet-actions,.timeline-Tweet-metadata').remove();
						th.find('.timeline-Tweet-text br').replaceWith(' ');
						th.find('.timeline-TweetList').slick({
							dots: false,
							slidesToShow: tw_num,
							slidesToScroll: tw_num,
							infinite: false,
							arrows: true,
							speed: 500,
							prevArrow: '<a href="#" class="slick-prev fa fa-chevron-left"></a>',
							nextArrow: '<a href="#" class="slick-next fa fa-chevron-right"></a>',
							autoplay: false
						});

						th.find('.itr_preloader').hide();
					}, 1500);
				});
			}
		},

		itr_flickr: function(){
			if ($('.itr_flick_feed').length > 0){    
				$('.itr_flick_feed').each(function(){
					var th 			= $(this),
						thisID 		= th.find('.wid_id').val(),
						thisLmt 	= th.find('.wid_limit').val(),
						thisFlick 	= th.find('.flick_id').val(),
						cols 		= th.attr('data-columns'),
						gp 			= th.attr('data-gap') * 2,
						wdt 		= parseInt( th.outerWidth() , 10 );
					
					th.jflickrfeed({
						limit: thisLmt,
						qstrings: {
							id: thisFlick
						},
						itemTemplate: '<div class="itr_flick_photo"><a href="{{image_b}}" target="_blank"><img src="{{image_s}}" alt="{{title}}" /><span class="img_overlay"></span></a></div>',
					}, function(data) {
						$('.itr_flick_photo a').magnificPopup({
							type:'image',
							gallery: {
								enabled: true
							}
						});
						var wd = ( wdt / cols ) - gp;
		        		th.find( '.itr_flick_photo' ).css( 'width', wd + 'px' );
					});
				});
			}
		},

		itr_img_map: function(){
			if( $('.cp-img-map').length > 0 ){
				$('.cp-img-map').each(function(){
					var th = $(this),
						id = th.find('.cp_map_marker').attr('id'),
						act = th.attr('data-action');
					th.hotspot({
						LS_Variable:	'#'+id,
						interactivity: 	act,
					});
				});
			}
		},

		itr_appear: function (){
			/* ================ Appear: on scroll down animations. =============== */
			if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			 	$('html').addClass('touch');
			}else{
				$('html').addClass('no-touch');
			}
			$('.touch .fx').addClass('animated'); // disables mobile animations
			if( $('.no-touch .fx').length > 0 ){
				$('.no-touch .fx').appear(function() {
					var anim = $(this).attr('data-animate'),
						del = $(this).attr('data-animation-delay'),
						dur = $(this).attr('data-animation-duration');
					$(this).addClass('animated '+anim).css({animationDelay: del + 'ms',animationDuration: dur + 'ms'});
				},{accY: -100});
			}
			
			if( $('.counter-number').length > 0 ){
				$('.counter-number').each(function(){
					var the = $(this),
						tm = the.attr('data-timer'),
						af = the.attr('data-after'),
						vl = the.attr('data-value');

					$(this).appear(function() {
						setInterval(function(){
							the.prop('Counter',0).animate({
						        Counter: vl
						    }, {
						        duration: 4000,
						        easing: 'swing',
						        step: function (now) {
						            $(this).text(Math.ceil(now));
						        }
						    });
						}, tm);
					},{accY: -100});
				});
			}
		}

	}

	Munza.docLoad = {
		init: function(){
			Munza.init.itr_slick_sliders();
			Munza.init.itr_instagramfeed();
			Munza.init.itr_globals();
			Munza.init.itr_flickr();
			Munza.init.itr_tweets();
			Munza.init.itr_img_map();
			Munza.init.itr_piecharts();
			Munza.init.itr_appear();
		}
	};

	/* ================ Window.Load Functions. ================ */
	$(window).on( 'load' , Munza.docLoad.init );


})(jQuery);