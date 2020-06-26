document.body.classList.remove('no-js');

//Создание переменных
const headerTopElement = document.querySelector('.js-header__top');
//Элементы меню
const menuListHeaderElement = document.querySelector('.js-header__nav');
const menuListFooterElement = document.querySelector('.js-footer__nav');
const btnBurgerElement = document.querySelector('.js-header__button');
const navLinksElement= document.querySelectorAll('.js-nav__link');
const navLinksArray = Array.from(navLinksElement); //преобразуем в массив

//Секции
const sectionSkillsElement = document.getElementById('js-skills');
const sectionPortfolioElement = document.getElementById('js-portfolio');
const sectionPricesElement = document.getElementById('js-prices');

//Модальные окна
const modals = document.querySelectorAll('.modal');
const modalSuccess = document.querySelector('.js-modal-success');
const modalOverlay = document.querySelector('.js-modal-overlay');

// Коллекция кнопок закрытия модальных окон
const btnsClose = document.querySelectorAll('.js-btn-closed');
const btnsCloseModal = Array.from(btnsClose); //массив из них

// Коллекция кнопок отправки форм в модальных оконах
const btnSubmitFormModal = document.querySelectorAll('.js-btn-submit');
const btnsSubmitModal = Array.from(btnSubmitFormModal);

// Коллекция кнопок открытия модальных окон
const btns = document.querySelectorAll('.js-btn');
const btnsOpenModal = Array.from(btns);


//События
//Навешиваем событие на кнопку разворачивая меню
btnBurgerElement.addEventListener('click', onBtnShowMenuElemClick);
//Навешиваем события для закрытия меню при нажатии на esc
document.addEventListener('keydown', onBodyClickForCloseMenu);

//Навешиваем событие на меню  хэдере и футере
menuListHeaderElement.addEventListener('click', handleLinkClick);
menuListFooterElement.addEventListener('click', handleLinkClick);

//Навешиваем события на кнопки открытия и закрытия модальных окон
btnsOpenModal.forEach(function(item, i, arr){
    item.addEventListener('click', showModal);
});
btnsCloseModal.forEach(function(item, i, arr){
   item.addEventListener('click', closeModal);
});


//Функции

//Функция показа/скрытия меню
function onBtnShowMenuElemClick() {
    //Навешиваем события для закрытия меню при клике вне его
    document.body.addEventListener('click', onBodyClickForCloseMenu);

    const target = event.target;
    const valAttrExpanded = target.getAttribute('aria-expanded');
    
    headerTopElement.classList.toggle('menu-open');

    if (valAttrExpanded === 'true') {
        btnBurgerElement.setAttribute('aria-label', 'Показать меню');
        btnBurgerElement.setAttribute ('aria-expanded', 'false');
    }

    if (valAttrExpanded === 'false') {
        btnBurgerElement.setAttribute('aria-label', 'Скрыть меню');
        btnBurgerElement.setAttribute ('aria-expanded', 'true');
    }
}

// Функция для закрытия меню при клике вне его  и нажатии esc
function onBodyClickForCloseMenu() {
    
    if(event.type === 'keydown' && event.keyCode === 27) {
        btnBurgerElement.closest('.js-header__top').classList.remove('nav-open');
        btnBurgerElement.setAttribute('aria-label', 'Показать меню');
        btnBurgerElement.setAttribute ('aria-expanded', 'false');

        document.body.removeEventListener('click', onBodyClickForCloseMenu);
            }
    else if (event.type === 'click' && event.target !== menuListHeaderElement){
        const valAttrExpanded = btnBurgerElement.getAttribute('aria-expanded');

        headerTopElement.classList.toggle('nav-open');

        if (!headerTopElement.classList.contains('nav-open')) {
            if (valAttrExpanded === 'true') {
                btnBurgerElement.setAttribute('aria-label', 'Показать меню');
                btnBurgerElement.setAttribute ('aria-expanded', 'false');

                document.body.removeEventListener('click', onBodyClickForCloseMenu);
            }

            if (valAttrExpanded === 'false') {
                btnBurgerElement.setAttribute('aria-label', 'Скрыть меню');
                btnBurgerElement.setAttribute ('aria-expanded', 'true');
                document.body.removeEventListener('click', onBodyClickForCloseMenu);
                console.log('Скрыть меню');
            }
        }
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

//Функция для открытия модального окна

function showModal () {
    //Навешиваем событие для закрытия модального окна при клике вне его и нажатии ecs
    document.body.addEventListener('click', onBodyClickForCloseModal);
    document.addEventListener('keydown', onBodyClickForCloseModal);
    let currentModal = ''; //текущее модальное окно

    const target = event.target;

    //Определяем, какое из модальных окон нужно открыть
    if(target.classList.contains('js-btn-call')) {
        currentModal = modals[1];
    }
    else {
        currentModal = modals[0];
    }

//Показываем окно и меняем атрибуты
    currentModal.setAttribute('aria-hidden', 'false');
    currentModal.classList.remove('hide');
    currentModal.classList.add('show');
//Находим первый инпут и ставим фокус
    let inputNameElement = currentModal.children[3].elements.fullName;
    inputNameElement.focus();
    
    modalOverlay.classList.remove('hide');
    modalOverlay.classList.add('show');

    document.body.classList.add('modal-active');
}

// Функция для закрытия модального окона при клике вне его и нажатии esc
function onBodyClickForCloseModal() {
    const target = event.target;

    if(target === modalOverlay || event.keyCode === 27) {
        let currentOpenModal = '';
        
        for(i=0; i< modals.length; i++) {
            if (modals[i].classList.contains('show')) {
                currentOpenModal = modals[i];
            }
        }

        currentOpenModal.setAttribute('aria-hidden', 'true');
        currentOpenModal.classList.remove('show');
        currentOpenModal.classList.add('hide');
        modalOverlay.classList.remove('show');
        modalOverlay.classList.add('hide');

        document.body.classList.remove('modal-active');
    }
}

// Функция для закрытия модального окона по нажатию на крестик
function closeModal () {
    const targetParent = event.target.closest('.modal');
    targetParent.setAttribute('aria-hidden', 'true');
    targetParent.classList.remove('show');
    targetParent.classList.add('hide');
    modalSuccess.setAttribute('aria-hidden', 'true');
    modalSuccess.classList.remove('show');
    modalSuccess.classList.add('hide');
    modalOverlay.classList.remove('show');
    modalOverlay.classList.add('hide');
//Сброс полей формы
    targetParent.children[3].reset();

    document.body.classList.remove('modal-active');
}

// Функция для показа модального окона при успешной отправке формы
function showModalSuccess () {
    modalSuccess.setAttribute('aria-hidden', 'false');
    modalSuccess.classList.add('show');
    modalSuccess.classList.remove('hide');
    modalOverlay.classList.remove('hide');
    modalOverlay.classList.add('show');
}

// inputMask
const inputTel = document.querySelectorAll('input[type="tel"]');
const inputMaskTel = new Inputmask('+7 (999) 999-99-99');
inputMaskTel.mask(inputTel[0]);
inputMaskTel.mask(inputTel[1]);

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
            showModalSuccess();
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







