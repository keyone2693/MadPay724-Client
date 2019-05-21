/**
 * modalEffects.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var ModalEffects = (function() {

	function init() {

		var overlay = document.querySelector( '.md-overlay' );

		[].slice.call( document.querySelectorAll( '.md-trigger' ) ).forEach( function( el, i ) {

			var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
				wrapp = document.querySelector( '.pageWrapper' ),
				close = modal.querySelector( '.md-close' );

			function removeModal( hasPerspective ) {
				classie.remove( modal, 'md-show' );
				classie.remove( wrapp, 'md-show' );

				if( hasPerspective ) {
					classie.remove( document.documentElement, 'md-perspective' );
				}
			}

			function removeModalHandler() {
				removeModal( classie.has( el, 'md-setperspective' ) );
			}

			function stopVideos(){
				var ifr = modal.querySelector( 'iframe' ),
					vid = modal.querySelector( 'video' );

				if (typeof(ifr) != 'undefined' && ifr != null) {
					var src = ifr.getAttribute('src');
					ifr.setAttribute('src', '');
					ifr.setAttribute('src', src);
				}

				if (typeof(vid) != 'undefined' && vid != null) {
					var src2 = vid.querySelector('source'),
						srcv = src2.getAttribute('src');
					vid.pause();
					vid.setAttribute('src', '');
					vid.setAttribute('src', srcv);
					
				}
			}

			el.addEventListener( 'click', function( ev ) {
				ev.preventDefault();
				classie.add( modal, 'md-show' );
				classie.add( wrapp, 'md-show' );
				overlay.removeEventListener( 'click', removeModalHandler );
				overlay.addEventListener( 'click', removeModalHandler );
				overlay.addEventListener( 'click', stopVideos );

				if( classie.has( el, 'md-setperspective' ) ) {
					setTimeout( function() {
						classie.add( document.documentElement, 'md-perspective' );
					}, 25 );
				}
			});

			close.addEventListener( 'click', function( ev ) {
				ev.preventDefault();
				ev.stopPropagation();
				removeModalHandler();
				stopVideos();
			});

		} );

	}

	init();

})();