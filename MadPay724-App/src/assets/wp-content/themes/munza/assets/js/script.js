var MunzaTM = MunzaTM || {};

(function($) {

	"use strict";

	/* ================ Window.Load Functions. ================ */
	MunzaTM.load = {
		
		itr_theme_globals: function(){

			if( $('.pageWrapper:not(.itr-fullscreen-page)').hasClass('smooth_scrl') ){
				$("html").easeScroll();
			}

			$('.widget_categories,.widget_pages').find('li:has(ul)').addClass('menu-item-has-children');

			// scroll to top button
			$('#to-top').on('click',function(e) {
				e.preventDefault();
				$('html, body').animate({scrollTop: 0}, 300);
			});

			$('.slurve-svg').each(function(){
				var th = $(this);
				th.after('<svg class="slurve-svg respons_svg"><rect width="100%" height="100%"></rect></svg>');
			});

		},

		itr_smooth_scroll: function(){
			
			if( $('.pageWrapper > header').length > 0 ){
				var hedstyle = $('.pageWrapper > header').attr('class');
				var off = ( hedstyle.indexOf('top-head') != -1 && hedstyle.indexOf('sticky-head') != -1 ) ? '60' : '0';

				$(".pageWrapper:not(.itr-fullscreen-page) .itr_main_nav a[href*='#']:not([href='#']),a.custom_scroll,.custom_scroll a").mPageScroll2id({
					offset: off,
					scrollEasing: "easeInOutExpo",
					highlightClass: "active",
				});
			}
		},

		itr_video_bgs: function(){
			var vid = $('.video-wrap:has(video)');
			if( vid.length > 0 ) {
				vid.each(function(){
					var el = $(this).find('video'),
						elW = $(this).outerWidth(),
						elH = $(this).outerHeight(),
						vidW = el.outerWidth(),
						vidH = el.outerHeight();
					if( vidH < elH ) {
						var rat = vidW/vidH,
							newW = elH * rat,
							pos = (newW - elW) / 2;
						el.css({'width': newW+'px','height':elH+'px','left':-pos+'px'});
					} else {
						var elPos = (vidH - elH) / 2;
						el.css({'width': vidW+'px','height':vidH+'px','top':-elPos+'px'});
					}
				});
			}
		},

		itr_megamenu: function(){
			if( $('.mega-menu').length > 0 ){
				$('.mega-menu').each(function(){
					var cl = $(this).data('mega');
					$(this).find('> .sub-menu').wrap('<div class="mega-content"><div class="row"></div></div>');
					$(this).find('.row > .sub-menu > li').addClass('col-md-'+cl);
					$(this).parents('.topbar-box').css('position','static');
				});
			}
		},

		itr_responsive_menu: function(){
			
			$('.itr_main_nav ul li.hasChildren').append('<span class="coll-menu"><i class="stline-add"></i></span>');
			$('.itr-responsive-btn').each(function(){
				$(this).on('click', function(e){
					e.preventDefault();
					$(this).toggleClass('act-btn');
					$(this).next().slideToggle();
				});	
			});
			
			$('.coll-menu').each(function(){
				var th = $(this);
				th.on('click', function(e){
					e.preventDefault();
					
					var uls = th.parent().find('> ul'),
						meg = th.parent().find('.mega-content');
					
					th.toggleClass("act-btn");
					uls.toggleClass('act-menu');
					meg.toggleClass('act-menu');

				});	
			});

		},

		itr_dynamicmenu: function(){
			var mainnav = $('.itr_main_nav > ul');
			mainnav.find('li').not('.mega-menu li').each(function(){
				$(this).on('hover', function(){
					var submenu = $(this).find('> ul');
					if (submenu.length){
						var $sub = $(this).find('> ul'),
							$contain = $('.top-head .container');
						if($sub.length && $contain.length){
							var $c = $contain.width() + $contain.offset().left;
							$sub.each(function(){
								var $lft = $(this).offset().left + $(this).outerWidth();
								if( $lft > $c){
									$(this).addClass('rit-menu');
								}
							});
						}else{
							var $ww = $(window).width();
							$sub.each(function(){
								var $lt = $(this).offset().left + $(this).outerWidth();
								if( $lt > $ww){
									$(this).addClass('rit-menu');
								}
							});
						}
					}
				});
			});
		},

		itr_fixed_footer: function(){
			if($('.pageContent').length){
				var winH = $(window).height(),
					headH = parseInt($('.top-head').outerHeight(),10),
					footH = parseInt($('#footWrapper').outerHeight(),10),
					pdtop = ($('#footWrapper .footer-middle').length) ? parseInt($('#footWrapper .footer-middle').css('padding-top'),10) : 0,
					mtop = footH + pdtop;
				
				if($('.fixed-footer').length){
					$('.pageContent').addClass('white-bg').css('margin-bottom',mtop+"px");
					$('html,body,.pageWrapper').addClass('auto-height');
				}

			}
		},

		itr_sticky_head: function(){
		    var logo = $('header .site_logo'),
		    	srcl = logo.attr('data-orig-logo'),
				stic = logo.attr('data-sticky');
		    if ($(window).scrollTop() >= 400) {
		        $('header.top-head[data-sticky]').addClass('sticky-head');
		        if(stic) $('.site_logo').attr('src', stic);
		    }
		    else {
		        $('header.top-head[data-sticky]').removeClass('sticky-head');
		        if(stic) $('.site_logo').attr('src', srcl);
		    }
		},

		itr_backtotop: function(){
			var winScroll = $(window).scrollTop();
			if (winScroll > 300) {
				$('#to-top').addClass('active');
			} else {
				$('#to-top').removeClass('active');
			}
		},

		itr_theme_search: function(){
			$('.open_search').on('click', function(e){
				e.preventDefault();
				var th = $(this),
					container = $('.search-wrapper');
				container.addClass('active');
				$('.itr_overlay').fadeIn();

			});

			$('.close_search,.itr_overlay').on('click', function(){
				var container = $('.search-wrapper');
            	container.find('.form-control').attr('value','');
            	setTimeout(function(){
					container.removeClass('active');
            	},100);
            	setTimeout(function(){
					$('.itr_overlay').fadeOut();
            	},200);
			});
		},

		itr_parallax: function(){
			if( $('.skrollr').length > 0 ){
				if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

				}else {
					$('.skrollr').each(function(){
						var th = $(this);
						if( th.hasClass('itr-parallax-element')){
							var tp = Math.round( parseInt(th.offset().top,10) + ( parseInt(th.outerHeight(),10)) * 2 ),
								el = th.attr('data-last-att');
							th.attr('data-'+tp, el);
						}
					});
					skrollr.init({
						smoothScrolling: true,
						mobileDeceleration: 0.004,
						forceHeight: false
					});
				}
			}
		},

		itr_isotope: function(){
			if($('#itr_blog_content.masonry').length){
				var $masonry = $('#itr_blog_content.masonry').isotope({
					layoutMode: 'masonry',
					isFitWidth: true
				});
				$masonry.imagesLoaded( function() {
					$masonry.isotope();
				});	
			}

			if($('#itr_blog_content.grid').length){
				var $grid = $('#itr_blog_content.grid').isotope({
					layoutMode: 'fitRows',
					isFitWidth: true
				});
				$grid.imagesLoaded( function() {
					$grid.isotope();
				});	
			}	
		},

		itr_pageloader: function(){
			
			if($(".page-loader").length){
				$(".page-loader").fadeOut();
			}
		},

		itr_loadmore: function(){
			var n 		= 1,
				pgnum 	= $('.loadmore .pgnum').text(),
				url 	= window.location.href,
				paged 	= $('.blgurl').attr('data-pag'),
				$cont 	= $('#itr_blog_content');

				var lasHash = url.substr(url.length - 1);

				url = ( lasHash == '#' ) ? url.replace(lasHash, '') : url;

	        $('.loadmore a').on('click', function(e){
	        	e.preventDefault();
	        	if (n < pgnum) {
					
					$('.loadmore .itr_preloader').fadeIn(100);

					var stick = parseInt($('.top-head.sticky-head').outerHeight(),10) + 50,
						thOff = $cont.find('.post-item:last-child').offset().top - stick;

	        		setTimeout(function () {
		        		var response;
						$.ajax({ type: "GET",   
							url: url+paged+n,   
							async: false,
							success : function(text){
								response= text;
								var $result = $(response).find('#itr_blog_content').html();
								$cont.append($result);
								if($cont.is('.masonry') || $cont.is('.grid')){
									$cont.isotope('destroy');
									MunzaTM.load.itr_isotope();
								}
					           	var $res = $(text).find('.posts-gal');
					           	if($res.length){
						           	$cont.find('.itr-post-gallery').slick({
										dots: true,
										arrows: false,
										slidesToShow: 1,
										touchMove: true,
										slidesToScroll: 1,
										autoplay:true,
										infinite: true,
										speed: 500,
									});
					           	}
					           	$('body, html').animate({ scrollTop: thOff }, 500);
								$('.loadmore .itr_preloader').fadeOut();
								MunzaTM.load.itr_social_share();
							}
						});
					}, 300);
	        	} else {
	        		$('.loadmore .load_msg').fadeIn(500,function(){
	        			setTimeout(function () {
		                    $('.loadmore .load_msg').fadeOut();
		                }, 3000);
	        		});
	        	}
	        	n++;
	        });
		},

		itr_side_head: function(){
			var head = $('.side-head'),
				btn = $('.itr_head_btn');
			btn.on( 'click' , function(e){
				e.preventDefault();
				var offRight = ($(window).width() - (head.offset().left + head.outerWidth()));
				if( head.offset().left == '-300' || offRight == '-300' ){
					$('.pageWrapper').addClass('pushed');
					btn.addClass('active');
				} else {
					$('.pageWrapper').removeClass('pushed');
					btn.removeClass('active');
				}
			});
		},

		itr_social_share: function(){
			if( $(".itr_share_post_item").length > 0 ){
				$(".itr_share_post_item").each(function(){
					var th 		= $(this),
						elm 	= th.parent().parent().prev('.post-info').find('h3 a'),
						url 	= elm.attr('href'),
						socs 	= th.attr('data-share-on').split(','),
		        		text 	= elm.text();
					th.jsSocials({
			            url: url,
			            text: text,
			            showLabel: false,
			            showCount: true,
			            shares: socs
			        });
				});
				MunzaTM.load.itr_duplicate_icons();
			}
			
			if( $(".itr_single_share").length > 0 ){
				$(".itr_single_share").each(function(){
					var th 		= $(this),
						elm 	= ( $('.title-headings').find('h1') ) ? $('.title-headings').find('h1') : $('.itr_single_title'),
						url 	= $(location).attr("href"),
						soc 	= th.attr('data-share-on').split(','),
		        		text 	= ( elm != '' ) ? elm.text() : '';

					th.jsSocials({
			            url: url,
			            text: text,
			            showLabel: false,
			            showCount: true,
			            shares: soc
			        });
				});
				MunzaTM.load.itr_duplicate_icons();
			}

		},

		itr_login_popup: function(){
			if( $('.itr_open_login').length > 0 ){
				$('.itr_open_login').on('click', function(e){
					e.preventDefault();
					var th = $(this),
						pop = th.next('.login-popup');
					pop.toggleClass('active');
				});
			}
		},

		itr_duplicate_icons: function(){
			$('.jssocials-share-link').each(function(){
				var th = $(this),
					icn = th.find(' > i').clone();
				th.append(icn);
			});
		},

		itr_fullscreen_page: function(){
			
			if( $('.itr-fullscreen-page').length > 0 ){
				var names = [],
					links = [],
					items = $('.itr_main_nav > ul').find(' > li > a'),
					namesArr = $('.itr_main_nav > ul').find(' > li > a > span');
				for (var i = 0; i < items.length; i++) {
					names.push($(items[i]).text());
					links.push($(items[i]).attr('href').substring(1));
				}

				$('.itr-fullscreen-page .pageContent').pagepiling({
		    		sectionSelector: '.itr_section',
		    		menu: '.itr_main_nav > ul',
		    		anchors: links,
		    		loopTop: true,
				    loopBottom: true,
		    		animateAnchor: true,
				    navigation: {
				    	'position': 'right',
				   		'tooltips': names
				   	}
				});
			}
		},

		itr_buddypress: function(){
			var actgreet_txt = $('.activity-greeting').text();
			$('.activity-greeting').remove();
			$('#whats-new').attr('placeholder',actgreet_txt);
			$('body').append('<div class="bud_over"></div>');

			$('#whats-new').on('focus',function() {
		        $('.bud_over').fadeIn(200);
		        $('#whats-new-form').addClass('shaded');
		    });

			$('body').click(function(evt){    
				if(evt.target.id == "whats-new-form")
				return;
				if($(evt.target).closest('#whats-new-form').length)
				return;             
				
				$('.bud_over').fadeOut(200);
		    	$('#whats-new-form').removeClass('shaded');

			});

			$('#aw-whats-new-submit,#profile-group-edit-submit,a.friendship-button,form.standard-form input[type="submit"],.bbp-submit-wrapper button').addClass('btn btn-md-import main-bg-import');
		}
		
	};

	MunzaTM.docLoad = {
		init: function(){
			MunzaTM.load.itr_theme_globals();
			MunzaTM.load.itr_smooth_scroll();
			MunzaTM.load.itr_video_bgs();
			MunzaTM.load.itr_megamenu();
			MunzaTM.load.itr_responsive_menu();
			MunzaTM.load.itr_dynamicmenu();
			MunzaTM.load.itr_fixed_footer();
			MunzaTM.load.itr_backtotop();
			MunzaTM.load.itr_theme_search();
			MunzaTM.load.itr_parallax();
			MunzaTM.load.itr_isotope();
			MunzaTM.load.itr_loadmore();
			MunzaTM.load.itr_sticky_head();
			MunzaTM.load.itr_side_head();
			MunzaTM.load.itr_social_share();
			MunzaTM.load.itr_login_popup();
			MunzaTM.load.itr_fullscreen_page();
			MunzaTM.load.itr_buddypress();
			MunzaTM.load.itr_pageloader();
		}
	};
	$(window).on( 'load', MunzaTM.docLoad.init );

	/* ================ Window.Scroll Functions. ================ */
	MunzaTM.winScrl = {
		init: function(){
			MunzaTM.load.itr_backtotop();
			MunzaTM.load.itr_sticky_head();
		}
	};
	$(window).on( 'scroll', MunzaTM.winScrl.init );

})(jQuery);

