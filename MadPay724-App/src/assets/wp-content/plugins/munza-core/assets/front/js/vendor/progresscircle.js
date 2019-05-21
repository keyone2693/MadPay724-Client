function makesvg(icn, inner_icon="", percentage, inner_text=""){

	var abs_percentage = Math.abs(percentage).toString();
	var percentage_str = percentage.toString();

	var svg = '';

	svg += '<svg class="itr-circle-chart" viewbox="0 0 33.83098862 33.83098862" xmlns="http://www.w3.org/2000/svg" version="1.1">';

		svg += '<circle class="itr-chart-bg" cx="16.9" cy="16.9" r="15.9" />';

		svg += '<circle class="itr-chart-fore" stroke-dasharray="'+ abs_percentage+',100" cx="16.9" cy="16.9" r="15.9"/>';

		svg += '<g class="itr-chart-info">';

			if(inner_icon){
				svg += '<text class="itr-chart-icon '+inner_icon+'" x="17" y="10">'+icn+'</text>';
			}

			if(percentage){
				svg += '<text class="itr-chart-percent" x="17.9" y="17.5">'+percentage_str+'%</text>';  
			}

			if(inner_text){
				svg += '<text class="itr-chart-text" x="16.91549431" y="24">'+inner_text+'</text>';
			}

		svg += '</g>';

	svg += '</svg>';

	return svg
}

(function( $ ) {

    $.fn.circlechart = function() {
        this.each(function() {
            var percentage  = $(this).data("percentage");
            var inner_text  = $(this).data("text");
            var inner_icon  = $(this).data("icon");
            var itm 		= $(this).prev('.itr-hid-chrt-icon');
            var icn         = window.getComputedStyle(itm[0], ':before').getPropertyValue('content').replace(/\"/g, "");
            $(this).html(makesvg(icn, inner_icon, percentage, inner_text));
        });
        return this;
    };

}( jQuery ));