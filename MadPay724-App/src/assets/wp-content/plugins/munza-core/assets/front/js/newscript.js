(function($) {
  "use strict";

  var rt = $("body").hasClass("rtl") ? true : false;
  if ($(".itr-carousel-slider").length > 0) {
    $(".itr-carousel-slider").each(function() {
      var slides_n = parseInt($(this).attr("data-slidesnum"), 10),
        sscrol = parseInt($(this).attr("data-scamount"), 10),
        t_arr = $(this).attr("data-arrows"),
        t_type = $(this).attr("data-type"),
        t_dots = $(this).attr("data-dots"),
        t_auto = $(this).attr("data-auto"),
        t_nx_ic = $(this).attr("data-next-icon"),
        t_pv_ic = $(this).attr("data-prev-icon"),
        t_bul_st = $(this).attr("data-bullet-style"),
        ar_shape = $(this).attr("data-arrow-shape"),
        aut = t_auto == "1" ? true : false,
        arr = t_arr == "1" ? true : false,
        tdots = t_dots == "1" ? true : false,
        resp_n = slides_n > 2 ? 2 : 1,
        typ = t_type == "vertical" ? true : false;

      $(this)
        .on("afterChange init", function(event, slick, direction) {
          if ($(this).is(".multi-slides")) {
            // remove all prev/next
            slick.$slides.removeClass("prevdiv").removeClass("nextdiv");
            for (var i = 0; i < slick.$slides.length; i++) {
              var $slide = $(slick.$slides[i]);
              if ($slide.hasClass("slick-active")) {
                $slide
                  .prevAll()
                  .not(".slick-active")
                  .slice(0, sscrol)
                  .addClass("prevdiv");
                $slide
                  .nextAll()
                  .not(".slick-active")
                  .slice(0, sscrol)
                  .addClass("nextdiv");
              }
            }

            for (var j = 0; j < sscrol; j++) {
              $(".nextdiv")
                .eq(j)
                .css("transitionDelay", (j + 1) * 170 + "ms");
            }

            for (var k = sscrol; k >= 0; k--) {
              $(".prevdiv")
                .eq(k)
                .css("transitionDelay", (sscrol - k) * 170 + "ms");
            }
          }
        })
        .on("beforeChange", function(event, slick) {
          if ($(this).is(".multi-slides")) {
            $(".slick-slide").removeClass("prevdiv,nextdiv");
          }
        })
        .slick({
          slidesToShow: slides_n,
          slidesToScroll: sscrol,
          dots: tdots,
          speed: 0,
          autoplaySpeed: 2000,
          vertical: typ,
          rtl: rt,
          infinite: false,
          prevArrow:
            '<a href="#" class="anim_btn to-left slick-prev ' +
            ar_shape +
            '"><span><i class="' +
            t_pv_ic +
            '"></i><i class="btn_back ' +
            t_pv_ic +
            '"></i></span></a>',
          nextArrow:
            '<a href="#" class="anim_btn to-right slick-next ' +
            ar_shape +
            '"><span><i class="' +
            t_nx_ic +
            '"></i><i class="btn_back ' +
            t_nx_ic +
            '"></i></span></a>',
          dotsClass: "slick-dots " + t_bul_st,
          autoplay: aut,
          arrows: arr,
          focusOnSelect: true,

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

  if ($(".itr-twitter-shortcode").length > 0) {
    $(".itr-twitter-shortcode").each(function() {
      var th = $(this),
        heights = new Array();

      th.parent().prepend(
        '<div class="itr_preloader"><i class="stline-loading-2"></i></div>'
      );
      setTimeout(function() {
        var _html = th
          .next("iframe")
          .contents()
          .find("body");
        var tws = _html.find(".timeline-TweetList");
        tws
          .find("li")
          .contents()
          .unwrap();
        th.append(tws.html());
        th.next("iframe").remove();
        th.find(
          ".timeline-LoadMore,iframe,.timeline-Header,.new-tweets-bar,.timeline-Footer,.timeline-Tweet-brand,.u-url.permalink.customisable-highlight,.retweet-credit,.inline-media,.footer.customisable-border,.timeline-Tweet-actions,.timeline-Tweet-metadata"
        ).remove();
        var slshow = th.data("slidesnum"),
          slscrl = th.data("scamount");
        if (th.hasClass("has-slider")) {
          th.on("init", function(event, slick) {
            th.find(".slick-slide").each(function() {
              heights.push($(this).height());
            });
            var max = Math.max.apply(Math, heights);

            th.find(".slick-slide").each(function() {
              $(this)
                .find(".timeline-Tweet")
                .css("height", max + "px");
              $(this).css("height", max + "px");
              $(this)
                .parents(".slick-list")
                .css("height", max + "px");
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
            nextArrow:
              '<a href="#" class="slick-next fa fa-chevron-right"></a>',
            autoplay: true
          });
        }

        th.parent()
          .find(".itr_preloader")
          .hide();
      }, 1500);
    });
  }

  if ($(".itr-post-gallery").length > 0) {
    $(".itr-post-gallery").slick({
      dots: true,
      arrows: false,
      slidesToShow: 1,
      touchMove: true,
      slidesToScroll: 1,
      rtl: rt,
      autoplay: true,
      infinite: true,
      speed: 500
    });
  }

  if ($(".itr-circle-pie").length) {
    $(".itr-circle-pie").each(function() {
      var th = $(this);
      th.appear(
        function() {
          th.circlechart();
        },
        { accY: -100 }
      );
    });
  }
  /* ================ Appear: on scroll down animations. =============== */
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    $("html").addClass("touch");
  } else {
    $("html").addClass("no-touch");
  }
  $(".touch .fx").addClass("animated"); // disables mobile animations
  if ($(".no-touch .fx").length > 0) {
    $(".no-touch .fx").appear(
      function() {
        var anim = $(this).attr("data-animate"),
          del = $(this).attr("data-animation-delay"),
          dur = $(this).attr("data-animation-duration");
        $(this)
          .addClass("animated " + anim)
          .css({
            animationDelay: del + "ms",
            animationDuration: dur + "ms"
          });
      },
      { accY: -100 }
    );
  }

  if ($(".counter-number").length > 0) {
    $(".counter-number").each(function() {
      var the = $(this),
        tm = the.attr("data-timer"),
        af = the.attr("data-after"),
        vl = the.attr("data-value");

      $(this).appear(
        function() {
          setInterval(function() {
            the.prop("Counter", 0).animate(
              {
                Counter: vl
              },
              {
                duration: 4000,
                easing: "swing",
                step: function(now) {
                  $(this).text(Math.ceil(now));
                }
              }
            );
          }, tm);
        },
        { accY: -100 }
      );
    });
  }
})(jQuery);
