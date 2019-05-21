/* jQuery Hotspot */
(function($) {
	
	// Default settings for the plugin
	var defaults = {

		// Data
		data: [],

		// Hotspot Tag
		tag: 'img',

		// Mode of the plugin
		// Options: admin, display
		mode: 'display',

		// HTML5 LocalStorage variable
		LS_Variable: '__HotspotPlugin_LocalStorage',

		// Hidden class for hiding the data
		hiddenClass: 'hidden',

		// Event on which the data will show up
		// Options: click, hover, none
		interactivity: 'hover',

		// Buttons' id (Used only in Admin mode)
		done_btnId: 'HotspotPlugin_Done',
		remove_btnId: 'HotspotPlugin_Remove',
		sync_btnId: 'HotspotPlugin_Server',

		// Buttons class
		done_btnClass: 'btn btn-success HotspotPlugin_Done',
		remove_btnClass: 'btn btn-danger HotspotPlugin_Remove',
		sync_btnClass: 'btn btn-info HotspotPlugin_Server',

		// Classes for Hotspots
		hotspotClass: 'HotspotPlugin_Hotspot fx',
		hotspotAuxClass: 'HotspotPlugin_inc',

		// Overlay
		hotspotOverlayClass: 'HotspotPlugin_Overlay',

		// Enable ajax
		ajax: false,

		ajaxOptions: {
			url: ''
		},

		// No. of variables included in the spots
		dataStuff: [
			{
				'property': 'Title',
				'default': ''
			},
			{
				'property': 'Message',
				'default': ''
			}
		]
	};
	
	//Constructor
	function Hotspot(element, options) {
		
		// Overwriting defaults with options
		this.config = $.extend(true, {}, defaults, options);
		
		this.element = element;
		this.imageEl = element.find(this.config.tag);
		this.imageParent = this.imageEl.parent();

		this.broadcast = '';

		var widget = this;

		// Event API for users
		$.each(this.config, function(index, val) {
			if (typeof val === 'function') {
				widget.element.on(index + '.hotspot', function() {
					val(widget.broadcast);
				});
			};
		});

		this.init();
	};

	Hotspot.prototype.init = function() {

		this.getData();

		if (this.config.mode != 'admin') {
			return;
		};

		var height = this.imageEl[0].height;
		var width = this.imageEl[0].width;

		// Masking the image
		$('<span/>', {
			html: ''
		}).addClass(this.config.hotspotOverlayClass).appendTo(this.imageParent);

		var widget = this;
		var data = [];
		
		// Adding controls
		$('<button/>', {
			text: "Save Data"
		}).prop('id', this.config.done_btnId).addClass(this.config.done_btnClass).appendTo(this.imageParent);

		$('<button/>', {
			text: "Remove All"
		}).prop('id', this.config.remove_btnId).addClass(this.config.remove_btnClass).appendTo(this.imageParent);

		$(this.imageParent).delegate('button#' + this.config.done_btnId, 'click', function(event) {
			event.preventDefault();
			widget.storeData(data);
			data = [];
		});

		$(this.imageParent).delegate('button#' + this.config.remove_btnId, 'click', function(event) {
			event.preventDefault();
			widget.removeData();
		});

		// Start storing
		this.element.delegate('span', 'click', function(event) {
			event.preventDefault();
			
			var offset = $(this).offset();
			var relativeX = (event.pageX - offset.left);
			var relativeY = (event.pageY - offset.top);

			var dataStuff = widget.config.dataStuff;

			var dataBuild = {x: relativeX, y: relativeY};

			for (var i = 0; i < dataStuff.length; i++) {
				var val = dataStuff[i];
				var fill = prompt('Please enter ' + val.property, val.default);
				if (fill === null) {
					return;
				};
				dataBuild[val.property] = fill;
			};

			data.push(dataBuild);

			if (widget.config.interactivity === 'none') {
				var htmlBuilt = $('<div/>').addClass(widget.config.hiddenClass);
			} else {
				var htmlBuilt = $('<div/>').addClass(widget.config.hiddenClass);
			}
			

			$.each(dataBuild, function(index, val) {
				if (typeof val === "string") {
					$('<div/>', {
						html: val
					}).addClass('Hotspot_' + index).appendTo(htmlBuilt);
				};
			});

			var div = $('<div/>', {
				html: htmlBuilt
			}).css({
				'top': relativeY + '%',
				'left': relativeX + '%'
			}).addClass(widget.config.hotspotClass + ' ' + widget.config.hotspotAuxClass).appendTo(widget.element).appear(function() {
				$(this).addClass('animated fadeInUp').css({animationDelay: '500ms'});
			},{accY: -100});

			var $titl = htmlBuilt.find('.Hotspot_Title').text(),
				$cont = htmlBuilt.find('.Hotspot_Message').text();

			if (widget.config.interactivity === 'click') {
				div.on(widget.config.interactivity, function(event) {
					$(this).children('div').toggleClass(widget.config.hiddenClass);
				});
				if( $titl != '' || $cont != '' ){
					htmlBuilt.css('display', 'block');
				}
			} else {
				if( $titl != '' || $cont != '' ){
					htmlBuilt.removeClass(widget.config.hiddenClass);
				}
			}

			if (widget.config.interactivity === 'none') {
				if( $titl != '' || $cont != '' ){
					htmlBuilt.css('display', 'block');
				}
			}

		});

		// TODO - Update and Delete individual nodes
	};

	Hotspot.prototype.getData = function() {
		var widget = this;
		
		if (($(this.config.LS_Variable).val() == '' || $(this.config.LS_Variable).val()) === null && this.config.data.length == 0) {
			return;
		} 

		if (this.config.mode == 'admin' && ($(this.config.LS_Variable).val() == '' || $(this.config.LS_Variable).val() === null)) {
			return;
		} 
		
		this.beautifyData();
	};

	Hotspot.prototype.beautifyData = function() {
		var widget = this;

		if (this.config.mode != 'admin' && this.config.data.length != 0) {
			var obj = this.config.data;
		} else {
			var raw = decodeURIComponent($(this.config.LS_Variable).val());
			var obj = JSON.parse(raw);
		}

		for (var i = obj.length - 1; i >= 0; i--) {
			var el = obj[i];

			if (this.config.interactivity === 'none') {
				var htmlBuilt = $('<div/>').addClass(this.config.hiddenClass);
			} else {
				var htmlBuilt = $('<div/>').addClass(this.config.hiddenClass);
			}

			$.each(el, function(index, val) {
				if (typeof val === "string") {
					$('<div/>', {
						html: val
					}).addClass('Hotspot_' + index).appendTo(htmlBuilt);
				};
			});

			var div = $('<div/>', {
				html: htmlBuilt
			}).css({
				'top': el.y + '%',
				'left': el.x + '%'
			}).addClass(this.config.hotspotClass).appendTo(this.element).appear(function() {
				$(this).addClass('animated fadeInUp').css({animationDelay: '500ms'});
			},{accY: -100});

			var $titl = htmlBuilt.find('.Hotspot_Title').text(),
				$cont = htmlBuilt.find('.Hotspot_Message').text();

			if (widget.config.interactivity === 'click') {
				div.on(widget.config.interactivity, function(event) {
					$(this).children('div').toggleClass(widget.config.hiddenClass);
					$(this).toggleClass('hindex');
				});
				if( $titl != '' || $cont != '' ){
					htmlBuilt.css('display', 'block');
				}
			} else {
				if( $titl != '' || $cont != '' ){
					htmlBuilt.removeClass(this.config.hiddenClass);
				}
			}

			if (this.config.interactivity === 'none') {
				if( $titl != '' || $cont != '' ){
					htmlBuilt.css('display', 'block');
				}
			}

			var txt = htmlBuilt.find('.Hotspot_text'),
				shp = htmlBuilt.find('.Hotspot_shape').html(),
				siz = htmlBuilt.find('.Hotspot_size').html(),
				col = htmlBuilt.find('.Hotspot_Color').html(),
				bgc = htmlBuilt.find('.Hotspot_bgcolor').html(),
				pos = htmlBuilt.find('.Hotspot_position').html(),
				img = htmlBuilt.find('.Hotspot_image').html(),
				styl = htmlBuilt.find('.Hotspot_style').html();

			htmlBuilt.find('.Hotspot_text,.Hotspot_style,.Hotspot_Color,.Hotspot_size,.Hotspot_shape,.Hotspot_bgcolor,.Hotspot_image,.Hotspot_position').remove();
			htmlBuilt.before(txt);
			htmlBuilt.parent().addClass( 'style-' + styl + ' position-' + pos );
			if( img != '' ){
				htmlBuilt.parent().find('.Hotspot_text').addClass('hotspotImg').append('<img alt="" src="'+img+'" />');
				var $imgW = parseInt(htmlBuilt.parent().find('.hotspotImg img').outerWidth(),10) + 15;
				htmlBuilt.css('padding-left',$imgW+'px');
			} else {
				htmlBuilt.parent().find('.Hotspot_text').addClass(siz + '-size ' + shp).css('color',col).css('background-color',bgc);
				var $celW = parseInt(htmlBuilt.parent().find('.Hotspot_text').outerWidth(),10) + 25;
				htmlBuilt.css('padding-left',$celW+'px');
			}
		};
	};

	$.fn.hotspot = function (options) {
		new Hotspot(this, options);
		return this;
	};

}(jQuery));