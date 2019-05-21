
var RAYSGRID = RAYSGRID || {};

(function ($) {

    "use strict";

    RAYSGRID.init = {

    	zoomFun: function(){
    		$('.rsgd_zoom').each(function(){
	        	
	        	var th = $(this),
	        		thP = th.parents('.port-container').find('.post-media'),
	        		thPH = thP.html();

	        	if ( thP.find('iframe').length ) {
	        		
	        		var ifr = thP.find('iframe').attr('src');
	        		th.attr('href',ifr);
	        		th.find('i').removeClass('lineaico-uniE0B6').addClass('lineaico-uniE0C9').css('font-size','24px');
	        		
	        		th.magnificPopup({
						type: 'iframe',
						iframe: {
						  markup: '<div class="mfp-iframe-scaler">'+
						            '<div class="mfp-close"></div>'+
						            '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
						          '</div>',
						  patterns: {
						    youtube: {
						      index: 'youtube.com/',

						      id: 'v=',
						      src: ifr
						    }
						  },
						  srcAction: 'iframe_src',
						}
		        	});

	        	} else if ( thP.find('video').length ) {
	        		
	        		var vHT = thP.find('.mejs-mediaelement').html();

	        		var idd = thP.find('video').attr('id');

	        		th.magnificPopup({
						items: {
							src: '<div class="vid-mgf">'+vHT+'</div>',
						},
						type: 'inline',
						callbacks: {
							open: function() {
					        	$('.vid-mgf .wp-video-shortcode').mediaelementplayer();
							}
						}
		        	});

	        	} else if ( thP.find('.gallery').length ) {
	    			
					th.find('i').removeClass('lineaico-uniE0B6').addClass('lineaico-uni1A6').css('font-size','24px');
					th.attr('href','#');

					thP.prepend('<div class="hidden imgs-arr"></div>');

					thP.find('.gallery-item:not(.slick-cloned) .gallery-icon a').each(function () {
					    var ur = $(this).find('img').attr('src');
					    $(this).attr('href',ur);
					    $(this).clone().appendTo('.imgs-arr');

					});

					var sl = thP.find('.imgs-arr');

					th.on('click', function (){
						thP.find('.imgs-arr').magnificPopup('open');
					});

					thP.find('.imgs-arr').magnificPopup({
				        delegate: 'a',
				        type: 'image',
				        gallery: {
				          enabled:true
				        }
				    });

	        	} else {
	        		th.magnificPopup({
			            type: 'image'
			        });
	        	}

	        });
    	},

    	paginate: function(){

    		var n = 2,
				pgnum = $('.pgnum').text(),
				url = window.location.href,
				$cont = $('.raysgrid');
	        
	        if ( n <= pgnum ) {
		        
		        if ( $('.rsgd_load_more_btn').length > 0 ) {
			        
			        $('.rsgd_load_more_btn').on("click",function(e){
						
						e.preventDefault();
						var th = $(this);
							
						$('.rsgd_pager_load').fadeIn(100);
						th.addClass('actBtn');

						var response;
						$.ajax({ type: "GET",   
							url: url+'/page/'+n,
							success : function(text){
								response = text;
								var $result = $(response).find('.raysgrid').html();
								$cont.append($result);
								$cont.isotope('reloadItems');
								RAYSGRID.init.isotopeFun();
								RAYSGRID.init.zoomFun();
								RAYSGRID.init.slick_sliders();
							},
							complete: function(){
								$('.rsgd_pager_load').fadeOut();
								th.removeClass('actBtn');
								if (n > pgnum) { $('.rsgd_load_more').hide(); }
							},
						});
						n++;
			        });
			    }

	        }

	        if ( pgnum == 1 ) {
	        	$('.rsgd_load_more').remove();
	        	$('.rsgd_pager').remove();
	        }
    	},

    	infinite_scl: function(){
    		
    		if ( $('.rsgd_load_more_scrl').length > 0 ) {
			    
			    var th = $('.rsgd_load_more_scrl'),
					pgnum = $('.pgnum').text(),
					url = window.location.href,
					$cont = $('.raysgrid'),
					n = th.attr('data-num');
	        
		        if ( n <= pgnum ) {
			        var remain_items = th.find('.rem_items').text();
			        
			        $(window).on( "scroll", function(){
						
						var pos = $(this).scrollTop(),
							bot = th.position().top;

						if ( pos >= bot ) {
							$(window).unbind('scroll');
							$('.rsgd_pager_load').fadeIn(100);
							th.addClass('actBtn');
							th.find('.rem_items').text(remain_items);
							var response;
							$.ajax({ type: "GET",   
								url: url+'/page/'+n,
								success : function(text){
									response = text;
									var $result = $(response).find('.raysgrid').html();
									$cont.append($result);
									var res = $(response).find('.portfolio-item').length;
									$cont.isotope('reloadItems');
									RAYSGRID.init.isotopeFun();
									RAYSGRID.init.zoomFun();
									RAYSGRID.init.slick_sliders();
									th.attr('data-num',n);
									remain_items = remain_items - res;
								},
								complete: function(){
									
									$('.rsgd_pager_load').fadeOut();
									th.find('.rem_items').text(remain_items);
									th.removeClass('actBtn');
									RAYSGRID.init.infinite_scl();
									if (n > pgnum) { 
										$('.rsgd_pager').hide();
										$(window).unbind("scroll");
									}
								},
							});
							n++;
				        }
			        });
			    }
		    }

    	},

    	isotopeFun: function(){

            $('.raysgrid').each(function () {
                var that 	= $(this),
                    itm 	= that.find('.portfolio-item'),
                    cols 	= that.attr('data-cols'),
                    slds 	= that.attr('data-slidesnum'),
                    sp 		= that.attr('data-spacing'),
                    lay 	= that.attr('data-layout'),
                    w 		= parseInt( that.outerWidth() , 10 ),
                    mr 		= sp * 2,
                	tw 		= '';

                //that.css( 'margin' , -sp + 'px' );
				itm.css( 'padding' , sp + 'px' );

                if ( lay == 'grid' ) {
                	tw = w / cols;
                } else if ( lay == 'slider' ) {
                	tw = ( w / slds ) - mr;
                }

                itm.css( 'width' , tw + 'px' );

				itm.each( function(){
                    
                    var th 	= $( this ),
                    	imP = th.find( '.port-img' ),
                        mmP = th.find( '.media-cont' ),
                    	im 	= imP.find( 'img' ).attr( 'src' ),
                    	rX 	= th.attr( 'data-ratio-x' ),
                    	rY 	= th.attr( 'data-ratio-y' ),
                        nH 	= tw * ( rY / rX );

                    if( lay == 'grid' || lay == 'slider' ){
                    	
                        if ( imP.length ) {

							imP.css('background-image','url('+im+')');
							
							if( that.hasClass('paleo') || that.hasClass('sublime') || that.hasClass('resort') || that.hasClass('gemini') || that.hasClass('solo') || that.hasClass('focus') || that.hasClass('zilla') ){
								var ht = parseInt(imP.parent().find('.port-captions').outerHeight(),10);
								imP.css('height',nH+'px');
								var pd = parseInt(th.css('padding-top'),10);
								var pdb = parseInt(th.css('padding-bottom'),10);
								var tot = ht + nH + pd + pdb;
								imP.parent().parent().css('height',tot+'px');
								th.find('.icon-links').appendTo( imP );
							} else {
								th.css( 'height' , nH + 'px' );
							}

                        } else if ( mmP.length ) {

                            mmP.find('iframe,video,.wp-video').css('height',tw).css('width',tw);
                            mmP.css('height',nH+'px');
                            
                            if( mmP.find('.post-media').find('.gallery').length > 0 ){
                            	var gl = mmP.find('.post-media').find('.gallery'),
                            		itm = gl.find('.gallery-item');
                            	gl.find('img').css('height',nH+'px').css('visibility','hidden');
                            	itm.each(function(){
                            		var th = $(this),
                            			imm = th.find('img').attr('src');
                            		th.css('background-image','url('+imm+')');
                            	});
                            }
                            
                        }

                    }
                    
                });

				if( lay == 'masonry' || lay == 'grid' ) {
                    
                    var rt = true;

                    if( that.hasClass('rtl') ){
                        rt = false;
                    }

                    if ( lay == 'grid' ) {
                        
                        var $grid = that.isotope({
                            layoutMode: 'fitRows',
                            itemSelector: '.portfolio-item',
                            isFitWidth: true,
                            originLeft: rt,
                            resizable: false,
                        });

                    } else if ( lay == 'masonry' ) {
                        
                        var $grid = that.isotope({
                            layoutMode: 'masonry',
                            itemSelector: '.portfolio-item',
                            isFitWidth: true,
                            originLeft: rt,
                            resizable: false,
                        });

                    }

                    $grid.imagesLoaded(function () {
                        $grid.isotope();
                    });

                    $grid.on( 'layoutComplete', function( event, laidOutItems ) {
						$('.loader-port').hide();
						$('.portfolio-container').css('visibility','visible').css('height','auto');
						rsgd_removeEmpty();
					});

					var filters = {};
					function rsgd_removeEmpty(){
						var DROP = $('#filters a.filter:not([data-filter="*"]'),
							strall = ''; 
						$('.portfolio-item').each(function(el){ strall += $(this).attr('class')  });
						DROP.each(function(el){
							var nowfilter = $(this).attr('data-filter').replace('.', '');
							if( strall.indexOf( nowfilter ) == -1 ){
								$(this).hide();
							} else {
								$(this).show();
							}
						});
					}

                    $('#filters').on('click', 'a.filter', function (e) {
                        e.preventDefault();
                        var filterValue = $(this).attr('data-filter');
                        $grid.isotope({filter: filterValue});
                        var $this = $(this);
                        if ($this.parent().hasClass('selected')) {
                            return false;
                        }
                        var $optionSet = $this.parents('#filters');
                        $optionSet.find('.selected').removeClass('selected');
                        $this.parent().addClass('selected');
                    });

                    $('#filters2').on('click', 'a.filter2', function (e) {
                        e.preventDefault();
                        var filterValue = $(this).attr('data-filter2');
                        $grid.isotope({filter: filterValue});
                        var $this = $(this);
                        if ($this.parent().hasClass('selected')) {
                            return false;
                        }
                        var $optionSet = $this.parents('#filters');
                        $optionSet.find('.selected').removeClass('selected');
                        $this.parent().addClass('selected');
                    });

                    $('.filter_select select').change(function () {
                        var selected = [];
                        $('.filter_select select option').filter(':selected').each(function () {
                            if (this.value != "*") {
                                selected.push(this.value);
                            }
                        });
                        if (selected.length == 0) {
                            selected.push("*");
                        }
                        selected = $(selected.join(''));
                        $grid.isotope({
                            filter: selected
                        });
                    });

                }

            });

            $('.raysgrid.slick-slider').each( function() {
                var that = $(this),
                    sp   = that.attr('data-spacing'),
                    itm  = that.find('.portfolio-item');
                
                itm.css('margin',sp+'px');

            });

            $('.resort .port-captions h4 a').addClass('main-color');

	        $('.gemini .portfolio-item,.onair .portfolio-item').each(function(){ 
	        	if( $(this).find('.port-img').find('.por-hover').length == 0 ){
					$(this).find('.port-img').append('<div class="por-hover"></div>');
		        	$(this).hoverdir(); 
	        	}
	        	
	        });
    	},

        slick_sliders: function(){
			
			var runSlick = function() {

				if($('.rsgd_horizontal-slider').length > 0){
					
					$('.rsgd_horizontal-slider').each(function(){
						var slides_n 	= parseInt($(this).attr('data-slidesnum'),10),
							sscrol 		= parseInt($(this).attr('data-scamount'),10),
							t_infinite 	= $(this).attr('data-infinite'),
							t_arr 		= $(this).attr('data-arrows'),
							speed_n 	= $(this).attr('data-speed'),
							t_fade 		= $(this).attr('data-fade'),
							t_dots 		= $(this).attr('data-dots'),
							t_auto 		= $(this).attr('data-auto'),
							t_center	= $(this).attr('data-center-mode'),
							fd 			= (t_fade == '1') ? true : false,
							tinfinite 	= (t_infinite == '1') ? true : false,
							aut 		= (t_auto == '1') ? true : false,
							arr 		= (t_arr == '1') ? true : false,
							tdots 		= (t_dots == '1') ? true : false,
							resp_n 		= (slides_n > 2) ? 2 : 1,
							cen 		= false;
						
						if(t_center == '1'){
							cen = true;
							$(this).addClass('center');
						}
						
						$(this).slick({
							slidesToShow: slides_n,
							slidesToScroll: sscrol,
							dots: tdots,
							infinite: tinfinite,
							speed: speed_n,
							centerMode:cen,
							fade: fd,
							autoplay: aut,
							arrows: arr,
							responsive: [
							{
								breakpoint: 1024,
								settings: {
									slidesToShow: resp_n,
									slidesToScroll: resp_n
								}
							},
							{
								breakpoint: 640,
								settings: {
									slidesToShow: 1,
									slidesToScroll: 1
								}
						    }
						  ]
						});
					});
				}

				if($('.post-media .gallery').length > 0){
					
					$('.post-media .gallery').each(function(){
						
						$(this).slick({
							slidesToShow: 1,
							slidesToScroll: 1,
							dots: false,
							infinite: true,
							speed: 500,
							autoplay: true,
							arrows: false,
						});
					});
				}
				
				if($('.rsgd_vertical-slider').length > 0){
					
					$('.rsgd_vertical-slider').each(function(){
						var slides_n 	= parseInt($(this).attr('data-slidesnum'),10),
							sscrol 		= parseInt($(this).attr('data-scamount'),10),
							t_infinite 	= $(this).attr('data-infinite'),
							t_arr 		= $(this).attr('data-arrows'),
							speed_n 	= $(this).attr('data-speed'),
							t_fade 		= $(this).attr('data-fade'),
							t_dots 		= $(this).attr('data-dots'),
							t_auto 		= $(this).attr('data-auto'),
							fd 			= (t_fade == '1') ? true : false,
							tinfinite 	= (t_infinite == '1') ? true : false,
							aut 		= (t_auto == '1') ? true : false,
							arr 		= (t_arr == '1') ? true : false,
							tdots 		= (t_dots == '1') ? true : false,
							resp_n 		= (slides_n > 2) ? 2 : 1;						
						
						$(this).slick({
							slidesToShow: slides_n,
							slidesToScroll: sscrol,
							dots: tdots,
							infinite: tinfinite,
							speed: speed_n,
							vertical: true,
							fade: fd,
							autoplay: aut,
							arrows: arr,
						});
					});
				}
				
			}
			runSlick();
		},

    }

    RAYSGRID.docLoad = {
		init: function(){
			RAYSGRID.init.zoomFun();
			RAYSGRID.init.paginate();
			RAYSGRID.init.infinite_scl();
			RAYSGRID.init.isotopeFun();
			RAYSGRID.init.slick_sliders();
		}
	};

    /* ================ Window.Load Functions. ================ */
	$(window).load(	RAYSGRID.docLoad.init );


})(jQuery);