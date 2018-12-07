$(document).ready(function () {
  //menu behavior
  var btn = $('.menu-togle'),
    btnInner = $('.menu-togle__inner'),
    nav = $('.header__nav');

  btn.click(function () {
    btn.toggleClass('open');
    btnInner.toggleClass('open');
    nav.toggleClass('open');
  });

  // index popup 



  $('.go-to-webinar').click(function () {
    $('.overlay-contacts').addClass('active');
  });

  $('.closed').click(function () {
    $('.overlay-contacts').removeClass('active');
  });


  //smooth scroll
  $('a[data-target^="anchor"]').bind('click.smoothscroll', function () {
    var target = $(this).attr('href'),
      bl_top = $(target).offset().top - 60;
    $('body, html').animate({ scrollTop: bl_top }, 700);
    return false;
  });

  $('.menu a').bind('click.smoothscroll', function () {
    $('.menu-togle').toggleClass('open');
    $('.menu-togle__inner').toggleClass('open');
    $('.header__nav').removeClass('open');
    var target = $(this).attr('href'),
      bl_top = $(target).offset().top - 60;
    $('body, html').animate({
      scrollTop: bl_top
    }, 1000);
    return false;
  });


  //video vrapper
  var videoWrap = $('.video-wrapper');
  var videoCover = $('.video-cover');
  var videoFrame = $('.video-inner');

  videoWrap.click(function () {
    $(this).find($('.video-cover')).css('display', 'none');
    this.classList.add('played');
    // var videoURL = $(this).find($("iframe")).prop('src');
    // videoURL += "?autoplay=1";
    $(this).find($("video"))[0].play();
  });


  //form other city appearance
  $('#city').change(function () {
    if ($('#city').val() === 'other') {
      $('#other-city').css('display', 'block');
    } else {
      $('#other-city').css('display', 'none');
      $('#city-input').val('')
    }
  })

  //  spincr
  // resource: https://codepen.io/shivasurya/pen/FatiB
  $(function () {

    function startCount(countEl) {
      if (countEl.length) {
        countEl.each(function () {
          var $this = $(this);
          $this.prop('counter', 0).animate(
            {
              counter: $this.text()
            },
            {
              duration: 2000,
              easing: 'linear',
              step: function (el) {
                $this.text(Math.ceil(el));
              }
            }
          );
        });
      }
    }

    var $animationEl = $('.spinner__list');
    var $window = $(window);
    var windowHeight = $window.height();



    if (window.matchMedia("(min-width: 600px)").matches) {
      $animationEl.each(function () {
        var initCount = true;
        var $element = $(this);
        var $countEl = $(this).find('.spinner__digit');

        $window.on('scroll resize', function () {
          var windowTopPosition = $window.scrollTop();
          var windowBottomPosition = (windowTopPosition + windowHeight);
          var elementTopPosition = $element.offset().top;
          //check to see if this current container is within viewport

          if (elementTopPosition <= windowBottomPosition) {
            if (initCount) {
              startCount($countEl);
              initCount = false;
            }
          }
        });
      });
    }

  });


  //product slider
  var swiper = new Swiper('.swiper-container', {
    speed: 600,
    parallax: true,
    loop: true,
    autoHeight: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  //video popup

  // $(".js-modal-btn").modalVideo();

  $('.dropdown__link').click(function () {
    var current_part = $(this).html();
    $('.menu__link').html(current_part);
  })

});