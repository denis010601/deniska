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
});


