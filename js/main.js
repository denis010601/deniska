/*document.addEventListener("DOMContentLoaded", function(event) { 
  const modal = document.querySelector('.modal');
  const modalBtn = document.querySelectorAll('[data-toggle="modal"]');
  const closeBtn = document.querySelector('.modal__close');

  const switchModal = () => {
    modal.classList.toggle('modal--visible');
  }
  modalBtn.forEach(element => {
    element.addEventListener('click', switchModal);
  });
  closeBtn.addEventListener('click', switchModal);
  
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.classList.toggle('modal--visible');
    }
  }
});*/




$(document).ready(function (){
  var modal = $('.modal'),
      modalBtn = $('[data-toggle="modal"]'),
      closeBtn = $('.modal__close');
      
  $(document).on('keydown', function(e) {
    if (e.keyCode == 27)
    modal.toggleClass('modal--visible');
    });
  modalBtn.on('click', function () {
    modal.toggleClass('modal--visible');
  });
  closeBtn.on('click', function (){
    modal.toggleClass('modal--visible');
  });
  
  //initialize swiper when document ready
  var mySwiper = new Swiper ('.project .swiper-container', {
    loop: true,
    pagination: {
        el: '.project .swiper-pagination',
        type: 'bullets',
    },
    navigation: {
      nextEl: '.project .swiper-button-next',
      prevEl: '.project .swiper-button-prev',
    },
  })

  var next = $('.project .swiper-button-next');
  var prev = $('.project .swiper-button-prev');
  var bullets = $('.project .swiper-pagination');


  next.css ('left', prev.width() + 20 + bullets.width() + 20)
  bullets.css('left', prev.width() + 20);

    //initialize swiper when document ready
    var mySwiper = new Swiper ('.step .swiper-container', {
    
      
      loop: true,
      pagination: {
          el: '.step .swiper-pagination',
          type: 'bullets',
          
      },
      navigation: {
        nextEl: '.step .swiper-button-next',
        prevEl: '.step .swiper-button-prev',
      },
    })
  
    var next = $('.step .swiper-button-next');
    var prev = $('.step .swiper-button-prev');
    var bullets = $('.step .swiper-pagination');
  
  
    next.css ('left', prev.width() + 20 + bullets.width() + 20)
    bullets.css('left', prev.width() + 20)

    new WOW().init();
});


function backToTop() {
  let button = $('.back-to-top');

  $(window).on('scroll', () => {
    if ($(this).scrollTop() >= 70) {
      button.fadeIn();
    } else {
      button.fadeOut();
    }
  });

  button.on ('click', (e) => {
    e.preventDefault ();
    $('html').animate({scrollTop: 0}, 1000);
  });
}

backToTop();
