(function($) {
  "use strict";
  const ease = {
    exponentialIn: t => {
      return t == 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
    },
    exponentialOut: t => {
      return t == 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
    },
    exponentialInOut: t => {
      return t == 0.0 || t == 1.0
        ? t
        : t < 0.5
        ? +0.5 * Math.pow(2.0, 20.0 * t - 10.0)
        : -0.5 * Math.pow(2.0, 10.0 - t * 20.0) + 1.0;
    },
    sineOut: t => {
      const HALF_PI = 1.5707963267948966;
      return Math.sin(t * HALF_PI);
    },
    circularInOut: t => {
      return t < 0.5
        ? 0.5 * (1.0 - Math.sqrt(1.0 - 4.0 * t * t))
        : 0.5 * (Math.sqrt((3.0 - 2.0 * t) * (2.0 * t - 1.0)) + 1.0);
    },
    cubicIn: t => {
      return t * t * t;
    },
    cubicOut: t => {
      const f = t - 1.0;
      return f * f * f + 1.0;
    },
    cubicInOut: t => {
      return t < 0.5
        ? 4.0 * t * t * t
        : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
    },
    quadraticOut: t => {
      return -t * (t - 2.0);
    },
    quarticOut: t => {
      return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
    }
  };
  class ShapeOverlays {
    constructor(elm) {
      this.elm = elm;
      this.path = elm.find("path");
      this.numPoints = 10;
      this.duration = 900;
      this.delayPointsArray = [];
      this.delayPointsMax = 300;
      this.delayPerPath = 250;
      this.timeStart = Date.now();
      this.isOpened = false;
      this.isAnimating = false;
    }
    run() {
      this.isAnimating = true;
      for (var i = 0; i < this.numPoints; i++) {
        this.delayPointsArray[i] = Math.random() * this.delayPointsMax;
      }
      if (this.isOpened === false) {
        this.open();
      } else {
        this.close();
      }
    }
    open() {
      this.isOpened = true;
      this.elm.addClass("is-opened");
      this.timeStart = Date.now();
      this.renderLoop();
    }
    close() {
      this.isOpened = false;
      this.elm.removeClass("is-opened");
      this.timeStart = Date.now();
      this.renderLoop();
    }
    updatePath(time) {
      const points = [];
      for (var i = 0; i < this.numPoints; i++) {
        points[i] =
          (1 -
            ease.cubicInOut(
              Math.min(
                Math.max(time - this.delayPointsArray[i], 0) / this.duration,
                1
              )
            )) *
          100;
      }

      let str = "";
      str += this.isOpened ? `M 0 0 V ${points[0]}` : `M 0 ${points[0]}`;
      for (var i = 0; i < this.numPoints - 1; i++) {
        const p = ((i + 1) / (this.numPoints - 1)) * 100;
        const cp = p - ((1 / (this.numPoints - 1)) * 100) / 2;
        str += `C ${cp} ${points[i]} ${cp} ${points[i + 1]} ${p} ${
          points[i + 1]
        } `;
      }
      str += this.isOpened ? `V 100 H 0` : `V 0 H 0`;
      return str;
    }
    render() {
      if (this.isOpened) {
        for (var i = 0; i < this.path.length; i++) {
          this.path[i].setAttribute(
            "d",
            this.updatePath(
              Date.now() - (this.timeStart + this.delayPerPath * i)
            )
          );
        }
      } else {
        for (var i = 0; i < this.path.length; i++) {
          this.path[i].setAttribute(
            "d",
            this.updatePath(
              Date.now() -
                (this.timeStart +
                  this.delayPerPath * (this.path.length - i - 1))
            )
          );
        }
      }
    }
    renderLoop() {
      this.render();
      if (
        Date.now() - this.timeStart <
        this.duration +
          this.delayPerPath * (this.path.length - 1) +
          this.delayPointsMax
      ) {
        requestAnimationFrame(() => {
          this.renderLoop();
        });
      } else {
        this.isAnimating = false;
      }
    }
  }
  const elmHamburger = $(".slbar_btn"); // document.querySelector();
  const mainel = $(".slbar"); //document.querySelector(".slbar");
  const contel = $(".sl_bar_content"); //document.querySelector(".sl_bar_content");
  const elmCls = $(".slbar_close"); //document.querySelector(".slbar_close");
  const elmOverlay = $(".itr-slbar-over"); //document.querySelector(".itr-slbar-over");
  const overlay = new ShapeOverlays(elmOverlay);

  $(document).on("click", ".slbar_btn", function(e) {
    e.preventDefault();
    if (overlay.isAnimating) {
      return false;
    }
    overlay.run();
    mainel.addClass("is-opened-main");
    contel.addClass("is-opened-cont");
  });
  $(document).on("click", ".slbar_close", function(e) {
    e.preventDefault();
    if (overlay.isAnimating) {
      return false;
    }
    overlay.run();

    setTimeout(function() {
      contel.removeClass("is-opened-cont");
    }, 800);
    setTimeout(function() {
      mainel.removeClass("is-opened-main");
    }, 1400);
  });

  $(document).on("scroll", function () {
    $("#feedbak-place").appear(function () {
        $(".vc_single_bar").each(function () {
        var pers = $(this).find(".vc_bar").attr('data-value') + '%';
          $(this).find(".vc_bar").css("width", pers);
        });
    });
  });

})(jQuery);
