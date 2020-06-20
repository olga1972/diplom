document.body.classList.remove('no-js');


//Создание переменных

//Элементы меню
const menuListHeaderElement = document.querySelector('.js-header__nav');
const menuListFooterElement = document.querySelector('.js-footer__nav');
const btnBurgerElement = document.querySelector('.js-header__button');

const sectionSkillsElement = document.getElementById('js-skills');
const sectionPortfolioElement = document.getElementById('js-portfolio');
const sectionPricesElement = document.getElementById('js-prices');

const navLinksElement= document.querySelectorAll('.js-nav__link');
const navLinksArray = Array.from(navLinksElement); //преобразуем в массив


//Навешиваем событие на кнопку разворачивая меню
btnBurgerElement.addEventListener('click', onBtnShowMenuElemClick);

menuListHeaderElement.addEventListener('click', handleLinkClick);
menuListFooterElement.addEventListener('click', handleLinkClick);

//Функция показа/скрытия меню
function onBtnShowMenuElemClick() {

    const valAttrExpanded = btnBurgerElement.getAttribute('aria-expanded');
    btnBurgerElement.closest('.js-header__top').classList.toggle('nav-open');

    if (valAttrExpanded === 'true') {
        btnBurgerElement.setAttribute('aria-label', 'Показать меню');
        btnBurgerElement.setAttribute ('aria-expanded', 'false');
    }

    if (valAttrExpanded === 'false') {
        btnBurgerElement.setAttribute('aria-label', 'Скрыть меню');
        btnBurgerElement.setAttribute ('aria-expanded', 'true');
    }
}

//Навигация по странице + скролл

function handleLinkClick(e) {
    e.preventDefault();

    let coordsSection;

    if(e.target.textContent ==='Услуги'){
        coordsSection = sectionSkillsElement.offsetTop;
        e.target.classList.add('nav__link--active');
    }
    else if (e.target.textContent ==='Портфолио') {
        coordsSection = sectionPortfolioElement.offsetTop;
        e.target.classList.add('nav__link--active');
    }

    else if (e.target.textContent ==='Стоимость') {
        coordsSection = sectionPricesElement.offsetTop;
        e.target.classList.add('nav__link--active');
    }

    const scrollOptions = {
    top: coordsSection,
    behavior: 'smooth'
    }

    window.scrollTo(scrollOptions);

    navLinksArray.forEach(function(v, i, arr) {
        if(arr[i] !== e.target) {
            arr[i].classList.remove('nav__link--active');
            }
    });
}

//Модальное окно

const modal = document.querySelector('.js-modal');
const modalCall = document.querySelector('.js-modal-call');
const modalForm = document.querySelector('.modal__form');
const modalFormCall = document.querySelector('.modal__form--call');
const modalSuccess = document.querySelector('#modal-success');
const modalOverlay = document.querySelector('#modal-overlay');

const btnsClose = document.querySelectorAll('.js-btn-closed');
const btnsCloseModal = Array.from(btnsClose);
const btnSubmitFormModal = document.querySelectorAll('.js-btn-submit');
const btnsSubmitModal = Array.from(btnSubmitFormModal);
const btns = document.querySelectorAll('.js-btn');
const btnsOpenModal = Array.from(btns);
//const inputNameElement = document.querySelector('.js-name');
//const inputTelElement = document.querySelector('.js-tel');
//const inputEmailElement = document.querySelector('.js-email');

btnsOpenModal.forEach(function(item, i, arr){
    item.addEventListener('click', showModal);
});

btnsCloseModal.forEach(function(item, i, arr){
    item.addEventListener('click', closeModal);
});

function showModal (e) {

    if(e.target.classList.contains('js-btn-call')) {
        modalCall.setAttribute('aria-hidden', 'false');
        modalCall.classList.remove('hide');
        modalCall.classList.add('show');
        setTimeout(function() {
            let inputNameElement = document.querySelectorAll('.js-name')[1];
            inputNameElement.focus();
        }, 1000);
    }
    else {
        modal.setAttribute('aria-hidden', 'false');
        modal.classList.remove('hide');
        modal.classList.add('show');
        setTimeout(function() {
            let inputNameElement = document.querySelectorAll('.js-name')[0];
            inputNameElement.focus();
        }, 1000);
    }

    modalOverlay.classList.remove('hide');
    modalOverlay.classList.add('show');

    document.body.classList.add('modal-active');
}

function closeModal (e) {
    const targetParent = e.target.closest('.modal');
    targetParent.setAttribute('aria-hidden', 'true');
    targetParent.classList.remove('show');
    targetParent.classList.add('hide');
    modalSuccess.setAttribute('aria-hidden', 'true');
    modalSuccess.classList.remove('show');
    modalSuccess.classList.add('hide');
    modalOverlay.classList.remove('show');
    modalOverlay.classList.add('hide');

    document.body.classList.remove('modal-active');
}

function showModalSuccess () {
    modalSuccess.setAttribute('aria-hidden', 'false');
    modalSuccess.classList.add('show');
    modalSuccess.classList.remove('hide');
    modalOverlay.classList.remove('hide');
    modalOverlay.classList.add('show');
}


// inputMask
const inputTel = document.querySelector('input[type="tel"]');
const inputMaskTel = new Inputmask('+7 (999) 999-99-99');
inputMaskTel.mask(inputTel);

// validate

new window.JustValidate('.modal__form', {
    rules: {
        fullName: { required: true, minLength: 3 },
        email: { required: true, email: true }
    },
    messages: {
        fullName: {
            minLength: 'Это поле должно содержать минимум :value символа',
            required: 'Поле обязательно для заполнения!'
        },
        
        email: 'Пожалуйста, введите действительный email'
    },
    colorWrong: '#fc557c',
    //colorWrong: '#ffffff',
    submitHandler: function (form, values, ajax) {

        let formData = new FormData(form);

        fetch("mail.php", {
            method: "POST",
            body: formData
        })
        .then(function(data) {
            console.log('Отправлено');
            btnSubmitFormModal[0].addEventListener('click', closeModal);
            form.reset();
            showModalSuccess ();
            modal.classList.remove('show');
            modal.classList.add('hide');
        });
    },
    


});

new window.JustValidate('.modal__form--call', {
    rules: {
        fullName: { required: true, minLength: 3 },
        tel: { required: true },
        email: { required: false, email: false }
    },
    messages: {
        fullName: {
            minLength: 'Это поле должно содержать минимум :value символа',
            required: 'Поле обязательно для заполнения!'
        },
        tel: {
            required: 'Поле обязательно для заполнения!'
        }
        
    },
    colorWrong: '#fc557c',
    submitHandler: function (form, values, ajax) {

        let formData = new FormData(form);

        fetch("mail.php", {
            method: "POST",
            body: formData
        })
        .then(function(data) {
            btnSubmitFormModal[1].addEventListener('click', closeModal);
            form.reset();
            showModalSuccess ();
            modalCall.classList.remove('show');
            modalCall.classList.add('hide');
        });
    }
});

//Swiper
new Swiper(document.querySelector('.swiper-container'), {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    slideToClickedSlide: true,
    pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1025: {
        slidesPerView: 2,
        spaceBetween: 35
      },
  
          1201: {
        slidesPerView: 3
          }
  
      }
  });












