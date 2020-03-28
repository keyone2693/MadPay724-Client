
(function($) {
  "use strict";
  var container = $(".search-wrapper");
  container.find(".form-control").attr("value", "");
  setTimeout(function() {
    container.removeClass("active");
  }, 0);
  setTimeout(function() {
    $(".itr_overlay").fadeOut();
  }, 0);
})(jQuery);
