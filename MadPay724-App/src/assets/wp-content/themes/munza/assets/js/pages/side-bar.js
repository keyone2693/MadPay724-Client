(function($) {
  'use strict';

  const mainel = $(".slbar"); //document.querySelector(".slbar");
  const contel = $(".sl_bar_content"); //document.querySelector(".sl_bar_content");
  const elmOverlay = $(".itr-slbar-over"); //document.querySelector(".itr-slbar-over");

  contel.removeClass('is-opened-cont');
  mainel.removeClass('is-opened-main');
  elmOverlay.removeClass("is-opened");
  elmOverlay.html(
    "<defs>" +
      "<linearGradient id='slbar-grad1' x1='0%' y1='0%' x2='0%' y2='100%'>" +
      "<stop offset='0%' stop-color='#00c99b' />" +
      "<stop offset='100%' stop-color='#ff0ea1' />" +
      "</linearGradient>" +
      "<linearGradient id='slbar-grad2' x1='0%' y1='0%' x2='0%' y2='100%'>" +
      "<stop offset='0%' stop-color='#ffd392' />" +
      "<stop offset='100%' stop-color='#ff3898' />" +
      "</linearGradient>" +
      "<linearGradient id='slbar-grad3' x1='0%' y1='0%' x2='0%' y2='100%'>" +
      "<stop offset='0%' stop-color='#110046' />" +
      "<stop offset='100%' stop-color='#32004a' />" +
      "</linearGradient>" +
      "</defs>" +
      "<path class='itr-slbar-over-path' d=''></path>" +
      "<path class='itr-slbar-over-path' d=''></path>" +
      " <path class='itr-slbar-over-path' d=''></path>"
  );
})(jQuery);
