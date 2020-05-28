
$(document).ready(function (){
  var modal = $('.modal'),
      modalBtn = $('[data-toggle="modal"]'),
      closeBtn = $('.modal__close');
      thank = $('.thank')
      
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
  thank.on('click', function () {
    thank.toggleClass('thank--visible');
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

    


  

    // Валидация формы
    $(".modal__form").validate({
      errorElement: "div",
      errorClass: "invalid",
      rules: {
        // simple rule, converted to {required:true}
        userName: {
          required: true,
          minlength: 2
        },
        userPhone: "required",
        // compound rule
        userEmail: {
          required: true,
          email: true
        },
        checkbox: {
          required : true
        } 
        
      },
        messages: {
          
          checkbox: "Примите соглашение",
          userName: {
            required:"Имя обязательно",
            minlength: "Имя не короче двух букв"

          } ,
          userPhone: "Телефон обязателен",
          userEmail: {
            required: "Укажите email",
            email: "введите формате: name@domain.com"
          },
        
      },
      submitHandler: function(form) {
        $.ajax ({
          type: "POST",
          url: "send.php",
          data: $(form).serialize(),
          success: function (response) {
            thank.toggleClass('thank--visible');
            $(form)[0].reset();
            modal.removeClass('modal--visible');
          }
        });
      }
    });
    $('[type=tel]').mask('+7(000) 000-00-00', {placeholder: "+7(___) __-__-__"});
    
    $(".control__form").validate({
      errorElement: "div",
      errorClass: "invalid",
      rules: {
        // simple rule, converted to {required:true}
        userName: {
          required: true,
          minlength: 2
        },
        userPhone: "required",
        // compound rule
        userEmail: {
          required: true,
          email: true
        },
        checkbox: {
          required : true
        }
        
      },
        messages: {
          userName: {
            required:"Имя обязательно",
            minlength: "Имя не короче двух букв"

          } ,
          userPhone: "Телефон обязателен",
          userEmail: {
            required: "Укажите email",
            email: "введите формате: name@domain.com"
          },
        checkbox: "Примите соглашение"
    },
    submitHandler: function(form) {
      $.ajax ({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          thank.toggleClass('thank--visible');
          $(form)[0].reset();
          modal.removeClass('modal--visible');
          
        }
      });
    }

    });

    $(".footer__form").validate({
      errorElement: "div",
      errorClass: "invalid",
      rules: {
        // simple rule, converted to {required:true}
        userName: {
          required: true,
          minlength: 2
        },
        
        userPhone: "required",
        // compound rule
        userQuestion: "required",
        checkbox: {
          required : true
        }
        
      },
        messages: {
          userName: {
            required:"Имя обязательно",
            minlength: "Имя не короче двух букв"

          } ,
          userPhone: "Телефон обязателен",
          userQuestion: "Задайте вопрос",
        checkbox: "Примите соглашение"
        
    },
    submitHandler: function(form) {
      $.ajax ({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          thank.toggleClass('thank--visible');
          $(form)[0].reset();
          modal.removeClass('modal--visible');
        }
      });
    }
    });
    //Переменная для включения/отключения индикатора загрузки
var spinner = $('.ymap-container').children('.loader');
//Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
var check_if_load = false;
//Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
var myMapTemp, myPlacemarkTemp;
 
//Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map-yandex&#34;
function init () {
  var myMapTemp = new ymaps.Map("map-yandex", {
    center: [47.244729, 39.723187], // координаты центра на карте
    zoom: 9, // коэффициент приближения карты
    controls: ['zoomControl', 'fullscreenControl'] // выбираем только те функции, которые необходимы при использовании
  },
  
  );
  myMapTemp.behaviors.disable('drag');
  myMapTemp.behaviors.disable('scrollZoom')
  
  
  var myPlacemarkTemp = new ymaps.Placemark([47.244729, 39.723187], {
      balloonContent: "Мы тут",
  }, 
  
  
  {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#imageWithContent',
      // Своё изображение иконки метки.
      iconImageHref: 'img/map-marker.png',
      // Размеры метки.
      iconImageSize: [32, 32],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-20, -30],
  });

  


  myMapTemp.geoObjects.add(myPlacemarkTemp); // помещаем флажок на карту
 
  // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
  var layer = myMapTemp.layers.get(0).get(0);
 
  // Решение по callback-у для определения полной загрузки карты
  waitForTilesLoad(layer).then(function() {
    // Скрываем индикатор загрузки после полной загрузки карты
    spinner.removeClass('is-active');
  });
}
 
// Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов) 
function waitForTilesLoad(layer) {
  return new ymaps.vow.Promise(function (resolve, reject) {
    var tc = getTileContainer(layer), readyAll = true;
    tc.tiles.each(function (tile, number) {
      if (!tile.isReady()) {
        readyAll = false;
      }
    });
    if (readyAll) {
      resolve();
    } else {
      tc.events.once("ready", function() {
        resolve();
      });
    }
  });
}
 
function getTileContainer(layer) {
  for (var k in layer) {
    if (layer.hasOwnProperty(k)) {
      if (
        layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
        || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
      ) {
        return layer[k];
      }
    }
  }
  return null;
}
 
// Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
function loadScript(url, callback){
  var script = document.createElement("script");
 
  if (script.readyState){  // IE
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" ||
              script.readyState == "complete"){
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  // Другие браузеры
    script.onload = function(){
      callback();
    };
  }
 
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}
 
// Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
var ymap = function() {
  $('.ymap-container').mouseenter(function(){
      if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем
 
	  	// Чтобы не было повторной загрузки карты, мы изменяем значение переменной
        check_if_load = true; 
 
		// Показываем индикатор загрузки до тех пор, пока карта не загрузится
        spinner.addClass('is-active');
 
		// Загружаем API Яндекс.Карт
        loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function(){
           // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
           ymaps.load(init);
        });                
      }
    }
  );  
}
 
$(function() {
 
  //Запускаем основную функцию
  ymap();
 
});
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



  var player;
  $('.video__play').on('click', function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '460',
      width: '100%',
      videoId: 'Y8Q9ptCXzL0',
      events: {
        'onReady': videoPlay,
      }
    });
  })

  function videoPlay(event){
    event.target.playVideo();
  }


}

backToTop();
