$(document).ready(function(){
    const owl = $('.owl-carousel');
    const pagerItem = $('.pager-item');
  owl.owlCarousel({
    items: 3,
    autoWidth: true,
    margin: 30,
    loop: true,
    navText: [],
    nav: true,
    pagination: true,
    dotsContainer:'.slider__pager',
    dotData: 'data-slide-to',
    isTrigger: 1,
    responsiveClass:true,
    responsive:{
        0:{
            items: 1,
            dots: true,
            nav: false,
            onDragged: callback,
          },
        1000:{
            items: 2,
            dots: true,
            onDragged: callback,
            margin: 35,
        },
        1025: {
          items: 3,
          dots: false,
          nav: true
        }
      }
    });

    $('.controls-item__btn.controls-item__btn--next').click(function() {
        owl.trigger('next.owl.carousel');
    });

    $('.controls-item__btn.controls-item__btn--prev').click(function() {
        owl.trigger('prev.owl.carousel', [300]);
    });

    $('.pager-item__link').click(triggerClassActive);

    function triggerClassActive (event) {
      const valDataSlideTo = $(event.target).attr('data-slide-to');
      
      owl.trigger('to.owl.carousel', [$(this).index(), 300]);

      $('*','.pager-item').each (function(index, value){
        if(valDataSlideTo == index + 1) {
          $(this).addClass('pager-item__link--active');
        }
        else {
          $(value).removeClass('pager-item__link--active');
        }
      });
    }

    function callback(event) {
      for (i = 0; i < pagerItem.length; i++) {
        if($(pagerItem[i]).hasClass('active')) {
          $(pagerItem[i].children).addClass('pager-item__link--active');
          $(pagerItem[i].children).css('outline','none');
        }
        else if (!$(pagerItem[i]).hasClass('active')) {
          $(pagerItem[i].children).removeClass('pager-item__link--active');
        }
      }

    }

  });