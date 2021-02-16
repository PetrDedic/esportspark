$(document).ready(function () {
  $(window).scroll(function () {
    // sticky navbar on scroll script
    if (this.scrollY > 20) {
      $(".my-navbar").addClass("sticky");
    } else {
      $(".my-navbar").removeClass("sticky");
    }

    // scroll-up button show/hide script
    if (this.scrollY > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });

  // slide-up script
  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
    // removing smooth scroll on slide-up button click
    $("html").css("scrollBehavior", "auto");
  });

  $(".my-navbar .menu li a").click(function () {
    // applying again smooth scroll on menu items click
    $("html").css("scrollBehavior", "smooth");
  });

  // toggle menu/navbar script
  $(".menu-btn").click(function () {
    $(".my-navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });

  // slideshow
  var SlideShow = (function () {
    function SlideShow(config) {
      if (!config) {
        config = {};
      }
      this.slideSelector = config.slideSelector;
      this.refreshInterval = config.refreshInterval || 5000;
      this.currentVisibleSlide = null;
      this.initialize();
    }
    var prototype = {
      constructor: SlideShow,
    };
    prototype.initialize = function () {
      this.refresh();
      this.nextSlide();
      this.slideShowTimer = window.setInterval(
        this.nextSlide.bind(this),
        this.refreshInterval
      );
    };
    prototype.destroy = function () {
      if (this.slideShowTimer) {
        window.clearInterval(this.slideShowTimer);
      }
    };
    prototype.displaySlide = function (slide, show) {
      slide && (slide.style.display = show ? "block" : "none");
    };
    prototype.gotoSlide = function (index) {
      var slideToShow = this.slideElements[index];
      if (slideToShow) {
        if (this.currentVisibleSlide) {
          this.displaySlide(this.currentVisibleSlide, false);
        }
        this.displaySlide(slideToShow, true);
        this.currentVisibleSlide = slideToShow;
      }
    };
    prototype.nextSlide = function () {
      var currentVisibleSlide = this.currentVisibleSlide;
      var nextSlideIndex;
      if (!currentVisibleSlide) {
        nextSlideIndex = 0;
      } else {
        currentVisibleSlide = this.slideElements.indexOf(currentVisibleSlide);
        nextSlideIndex = currentVisibleSlide + 1;
        if (nextSlideIndex > this.slideElements.length - 1) {
          nextSlideIndex = 0;
        }
      }
      console.log("Showing index: ", nextSlideIndex);
      this.gotoSlide(nextSlideIndex);
    };
    prototype.refresh = function () {
      var slideElements = document.querySelectorAll(this.slideSelector);
      this.slideElements = Array.prototype.slice.call(slideElements, 0);
    };
    SlideShow.prototype = prototype;
    return SlideShow;
  })();

  var slideShow = new SlideShow({
    slideSelector: ".slides",
  });
});
