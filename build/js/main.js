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

const modal = document.querySelector('#modal');
const modalSuccess = document.querySelector('#modal-success');
const modalOverlay = document.querySelector('#modal-overlay');
const btnCloseModal = document.querySelector('.js-btn-closed');
const btnSubmitFormModal = document.querySelector('.js-btn-submit');
const btns = document.querySelectorAll('.js-btn');
const btnsOpenModal = Array.from(btns);
const inputNameElement = document.querySelector('.js-name');
const inputTelElement = document.querySelector('.js-tel');
const inputEmailElement = document.querySelector('.js-email');

Inputmask({"mask": "+7(999) 999 - 9999"}).mask(inputTelElement);

btnSubmitFormModal.addEventListener('click', showModalSuccess);


btnsOpenModal.forEach(function(item, i, arr){
    item.addEventListener('click', showModal);
});

btnCloseModal.addEventListener('click', closeModal);

function showModal (e) {

    if(e.target.classList.contains('js-btn-call')) {
        inputTelElement.previousElementSibling.innerHTML = '&#42; Телефон:';

        inputEmailElement.style.display = 'none';
        inputEmailElement.setAttribute('required',false);
        inputEmailElement.previousElementSibling.style.display = 'none';
    }
    else {
        inputTelElement.previousElementSibling.innerHTML = 'Телефон:';
        inputEmailElement.setAttribute('required','required');
        inputEmailElement.previousElementSibling.style.display = 'block';
    }
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.remove('hide');
    modal.classList.add('show');
    modalOverlay.classList.remove('hide');
    modalOverlay.classList.add('show');

    setTimeout(function() {
        inputNameElement.focus();
    }, 900);

    document.body.classList.add('modal-active');
}

function closeModal () {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('show');
    modal.classList.add('hide');
    modalOverlay.classList.remove('show');
    modalOverlay.classList.add('hide');

    document.body.classList.remove('modal-active');
}

function showModalSuccess () {
    /* const request = new XMLHttpRequest();

    request.open("POST", "mail.php");
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    const name = inputNameElement.value;
    const tel = inputTelElement.value;
    const email = inputEmailElement.value; */
    
    console.log('отправлено');
    modalSuccess.setAttribute('aria-hidden', 'true');
    modalSuccess.classList.remove('show');
    modalSuccess.classList.add('hide');
}




$(document).ready(function(){
    //$('input[type="tel"]').inputmask({ "mask": "+7 (999) 999-9999" }); //specifying options


    

    $('.modal__form').each(function () {
        $(this).validate({
            errorPlacement(error, element) {
                return true;
            },
            focusInvalid: false,
            rules: {
                fullName: {
                    required: true,
                    minlength: 4,
                },
                tel: {
                    required: true,
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                fullName: {
                    required: 'Вы не ввели имя',
                    minlength: 'Нужно ввести минимум 5 букв'
                },
                tel: {
                    required: 'Вы не ввели номер телефона'
                },
                email: {
                    required: 'Вы не ввели email'
                }
            },
            submitHandler(form) {
            let th = $(form);

            $.ajax({
            type: 'POST',
            url: 'mail.php',
            data: th.serialize(),
        }).done(() => {

            th.trigger('reset');
        });

        return false;
        }
    });
    });
    $('.modal__form').validate();
});







