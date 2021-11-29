const bodyElement = document.querySelector('body');
const mainElement = document.querySelector('main');
const footerElement = document.querySelector('footer.fixed-bottom');
const burger = document.querySelector('.burger');
const bgCircle = document.querySelector('.bg-circle');
burger.classList.add('unToggled');
burger.addEventListener('click',()=>{
    burger.classList.toggle('toggled');
    burger.classList.toggle('unToggled');
    bgCircle.classList.toggle('d-none');
    mainElement.classList.toggle('d-none');
    footerElement.classList.toggle('d-none');
});
