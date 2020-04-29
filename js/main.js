document.body.classList.remove('no-js');

//Создание переменных

//Элементы меню
const menuListElement = document.querySelector('.js-header__nav');
const btnBurgerElement = document.querySelector('.js-header__button');

const sectionSkillsElement = document.getElementById('js-skills');
const sectionPortfolioElement = document.getElementById('js-portfolio');
const sectionPricesElement = document.getElementById('js-prices');

const navLinksElement= document.querySelectorAll('.nav__link');
const navLinksArray = Array.from(navLinksElement); //преобразуем в массив





//Навешиваем событие на кнопку разворачивая меню
btnBurgerElement.addEventListener('click', onBtnShowMenuElemClick);

menuListElement.addEventListener('click', handleLinkClick);

//Навешиваем событие при загрузке страницы и изменении ширины окна
//window.addEventListener('load', checkViewPortUser);
//window.addEventListener('resize', checkViewPortUser);

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

function handleLinkClick(e) {
    e.preventDefault();

    e.target.classList.add('nav__link--active');

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

    window.scrollBy({ top: coordsSection, behavior: 'smooth' });

    navLinksArray.forEach(function(v, i, arr) {
        if(arr[i] !== e.target) {
            arr[i].classList.remove('nav__link--active');
            }
    });
}

const modal = document.querySelector("#modal");
const modalOverlay = document.querySelector("#modal-overlay");
const btnCloseModal = document.querySelector('.js-btn-closed');
const btns = document.querySelectorAll(".js-btn");
const btnsOpenModal = Array.from(btns);
const inputNameElement = document.querySelector('.js-name');
const inputTelElement = document.querySelector('.js-tel');
const inputEmailElement = document.querySelector('.js-email');

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
    modal.setAttribute('aria-hidden', 'false')
    modal.classList.toggle('closed');
    modalOverlay.classList.toggle('closed');

    document.body.classList.add('modal-active');

    inputNameElement.focus();
}

function closeModal () {
    modal.setAttribute('aria-hidden', 'true')
    modal.classList.toggle('closed');
    modalOverlay.classList.toggle('closed');

    document.body.classList.remove('modal-active');
}







