const basicMinus = document.querySelector('#basic_minus');
const basicPlus = document.querySelector('#basic_plus');
const seniorMinus = document.querySelector('#senior_minus');
const seniorPlus = document.querySelector('#senior_plus');

const basicInput = document.querySelector('#basic_input');
const seniorInput = document.querySelector('#senior_input');

const totalSum = document.querySelector('#total_input');

[basicMinus, seniorMinus, basicPlus, seniorPlus].forEach(el => {
  el.addEventListener('click', (e) => {
    // console.log(e.target.textContent);
    if (e.target.textContent === '_') {
      el.nextElementSibling.value === '0' ? 0 : el.nextElementSibling.value--;
    }
    else if (e.target.textContent === '+') {
      el.previousElementSibling.value === '20' ? 20 : el.previousElementSibling.value++;
    } 
    totalSum.value = basicInput.value * 120 + seniorInput.value * 100;
    // if (+totalSum.value > 1000) {
    //   totalSum.style.width = '70px';
    // }
  })
})

// ripple effect
const buttonRipper = document.querySelector('.ripple')

  buttonRipper.addEventListener('click', function (e) {
        const x = e.clientX;
        const y = e.clientY;
        let rect = e.target.getBoundingClientRect();
       
        const buttonTop = rect.top;
        const buttonLeft = rect.left;

        const xInside = x - buttonLeft
        const yInside = y - buttonTop

        const circle = document.createElement('span')
        circle.classList.add('circle')
        circle.style.top = yInside + 'px'
        circle.style.left = xInside + 'px'

        this.appendChild(circle)

        setTimeout(() => circle.remove(), 500)
  })

  const closePopup = document.querySelector('.close__popup');
  const popup = document.querySelector('.popup');
  const popupContent = document.querySelector('.popup__content');
  const btnOpen = document.querySelector('.btn_ticket');

  function switchPopup() {
    popup.classList.toggle('popup_active');
    popupContent.classList.toggle('popup__content_active');
  }

  closePopup.addEventListener('click', switchPopup);

  btnOpen.addEventListener('click', switchPopup);

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('close_link')) {
      switchPopup();
    } else return;
  });

  function visitInput() {
    this.style.setProperty('--visibility-input', 'visible');
    this.style.setProperty('--bg-image', "url('./assets/icons/boolking/close-arrow-focus.svg')");
  }
  function leaveInput() {
    this.style.setProperty('--visibility-input', 'hidden');
    this.style.setProperty('--bg-image', "url('./assets/icons/boolking/close-arrow.svg')");
  }
  const curDate = document.querySelector('#cur_date');
  const curTime = document.querySelector('#cur_time');

  curDate.addEventListener('focus', visitInput)
  curDate.addEventListener('blur', leaveInput)

  curTime.addEventListener('focus', visitInput)
  curTime.addEventListener('blur', leaveInput)

  const selectType = document.querySelector('#select');
  const selectLabel = document.querySelector('.label_select');

  selectType.addEventListener('focus', () => {
    selectLabel.style.setProperty('--bg-image', "url('./assets/icons/boolking/close-arrow-focus.svg')");
  })
  selectType.addEventListener('blur', () => {
    selectLabel.style.setProperty('--bg-image', "url('./assets/icons/boolking/close-arrow.svg')");
  })
  selectType.addEventListener('change', () => {
    selectLabel.style.setProperty('--bg-image', "url('./assets/icons/boolking/close-arrow.svg')");
  })