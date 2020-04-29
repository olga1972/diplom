$(document).ready(function(){
    const owl = $('.owl-carousel');
  owl.owlCarousel({
    items: 3,
    autoWidth: true,
    margin: 35,
    loop: true,
    navText: [],
    nav: true,
    pagination: true,
    dotsContainer:'.slider__pager',
    responsiveClass:true,
    responsive:{
        0:{
            items: 1,
            dots: true,
            nav: false,

          },
        1023:{
            items: 2,
            dots: true,
        },
        1201: {
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

    $('.pager-item__link').click(function (event) {
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

    });

});