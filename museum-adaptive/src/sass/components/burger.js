const iconBurger = document.querySelector('.hamburger');
const menuBurger = document.querySelector('.burger__nav');
const menuLink = document.querySelectorAll('.nav__link');


const hiddenText = document.querySelector('.welcome__text');
const hiddenBtn = document.querySelector('.btn__welcome');

let conditionMenu = false;
function switchBurgerMenu() {
  iconBurger.classList.toggle('hamburger_active');
  menuBurger.classList.toggle('burger__nav_active');
  hiddenText.classList.toggle('opacity__all');
  hiddenBtn.classList.toggle('opacity__all');

  conditionMenu = !conditionMenu;
  console.log(conditionMenu);
}

document.addEventListener('click', (e) => {
  if (conditionMenu) {
    if (!e.target.classList.contains('burger__nav')) {
      switchBurgerMenu();
    }
  } else {
    if (e.target.classList.contains('hamburger') || e.target.classList.contains('hamburger__line')) {
      switchBurgerMenu();
    }
  }
}, false)

// iconBurger.addEventListener('click', switchBurgerMenu);


menuLink.forEach(el => {
  el.addEventListener('click', () => {
    if (menuBurger.classList.contains('burger__nav_active')) {
        switchBurgerMenu();
    }
  })
})
