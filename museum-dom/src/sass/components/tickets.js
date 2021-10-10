const countTicketMinus = document.querySelectorAll('.count_ticket_minus')
const countTicketPlus = document.querySelectorAll('.count_ticket_plus')

const basicInput = document.querySelectorAll('.basic_input');
const seniorInput = document.querySelectorAll('.senior_input');

const totalSum = document.querySelector('#total_input');
const totalSumPopup = document.querySelector('#popup__total__sum');

const inputRadioType = document.querySelectorAll('.ticket_radio');

const selectType = document.querySelector('#select');
const selectTypeInfo = document.querySelector('#ticket_type_info');

const basicRate = document.querySelectorAll('.basic__rate');
const seniorRate = document.querySelectorAll('.senior__rate');

const basicRateTotal = document.querySelector('#basic__rate_total');
const seniorRateTotal = document.querySelector('#senior__rate_total');

const ticketTypeObj = {
  permanent: 20,
  temporary: 25,
  combined: 40
};
const ticketTypeName = {
  permanent: 'Permanent exhibition',
  temporary: 'Temporary exhibition',
  combined: 'Combined Admission'
};
let curTypeTicket = localStorage.getItem('curTypeTicket') ? localStorage.getItem('curTypeTicket') : 'permanent';

function calcTotalSun() {
  let basicValue = basicInput[0].value;
  let seniorValue = seniorInput[0].value;
  totalSum.value = basicValue * ticketTypeObj[curTypeTicket] + seniorValue * ticketTypeObj[curTypeTicket] / 2;

  basicRateTotal.textContent = `${basicValue * ticketTypeObj[curTypeTicket]} €`;
  localStorage.setItem('basicRateTotal', basicRateTotal.textContent);

  seniorRateTotal.textContent = `${seniorValue * ticketTypeObj[curTypeTicket] / 2} €`;
  localStorage.setItem('seniorRateTotal', seniorRateTotal.textContent);

  totalSumPopup.value = totalSum.value;
  localStorage.setItem('totalSum', totalSum.value);
  let strTotalSum = totalSum.value.toString();
  if (strTotalSum.includes('.') || strTotalSum.length > 3) {
    totalSum.style.width = '81px';
    totalSumPopup.style.width = '81px';

  } else {
    totalSum.style.width = '53px';
    totalSumPopup.style.width = '54px';
  }
};

function changeTicketCount() {
  let arrMinus = Array.from(basicInput);
  let arrPlus = Array.from(seniorInput);
  if (this.textContent === '-') {
    this.nextElementSibling.value === '0' ? 0 : this.nextElementSibling.value--;
    if (arrMinus.includes(this.nextElementSibling)) {
      localStorage.setItem('basicInput', this.nextElementSibling.value);
      basicInput.forEach(el => {
        el.value = this.nextElementSibling.value;
      })
    } else if (arrPlus.includes(this.nextElementSibling)) {
      localStorage.setItem('seniorInput', this.nextElementSibling.value);
      seniorInput.forEach(el => {
        el.value = this.nextElementSibling.value;
      })
    }
  }
  else if (this.textContent === '+') {
    this.previousElementSibling.value === '20' ? 20 : this.previousElementSibling.value++;

    if (arrMinus.includes(this.previousElementSibling)) {
      localStorage.setItem('basicInput', this.previousElementSibling.value);
      basicInput.forEach(el => {
        el.value = this.previousElementSibling.value;
      })
    } else if (arrPlus.includes(this.previousElementSibling)) {
      localStorage.setItem('seniorInput', this.previousElementSibling.value);
      seniorInput.forEach(el => {
        el.value = this.previousElementSibling.value;
      })
    }
  }
  calcTotalSun();
};
function getCheckbox() {
  inputRadioType.forEach(el => {
    if (el.checked) {
      curTypeTicket = el.value;
      localStorage.setItem('ticketType', curTypeTicket);
      selectType.value = curTypeTicket;
      selectTypeInfo.textContent = ticketTypeName[curTypeTicket];
    }
  })
  if (curTypeTicket) {
    basicRate.forEach(el => {
      el.textContent = ticketTypeObj[curTypeTicket];
      localStorage.setItem('basicRate', el.textContent);
    })
    seniorRate.forEach(el => {
      el.textContent = ticketTypeObj[curTypeTicket] / 2;
      localStorage.setItem('seniorRate', el.textContent);
    })
  }
  localStorage.setItem('curTypeTicket', curTypeTicket);
};
// getCheckbox();

inputRadioType.forEach(el => {
  el.addEventListener('click', () => {
    getCheckbox();
    calcTotalSun();
  })
});
selectType.addEventListener('input', () => {
  inputRadioType.forEach(el => {
    el.checked = false;
    if (el.value == selectType.value) {
      el.checked = true;
    }
  });
  getCheckbox();
  calcTotalSun();
})

countTicketMinus.forEach(el => {
  el.addEventListener('click', changeTicketCount);
})
countTicketPlus.forEach(el => {
  el.addEventListener('click', changeTicketCount);
})

// ------------time--------------------------------
const curTime = document.querySelector('#cur_time');
const curDate = document.querySelector('#cur_date');
const paymentInfoDate = document.querySelector('.payment__info_date');
const paymentInfoTime = document.querySelector('.payment__info_time');

let d = new Date();
let dataStringMin = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
curDate.setAttribute('min', dataStringMin);
paymentInfoDate.textContent = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric'});

curTime.addEventListener('input', () => {
  paymentInfoTime.textContent = curTime.value;

})
curDate.addEventListener('input', () => {
  const date = new Date(curDate.value);
  let strDate = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric'});
  paymentInfoDate.textContent = strDate;
})


// -------------------------------validation-----------------------------------------------------

const formaName = document.querySelector('#forma__name');
const formaEmail = document.querySelector('#forma__email');
const formaPhone = document.querySelector('#forma__phone');

function isValidName(value) {
  if (value === '') return true;

  let lng = value.length;
  let isLetterEn = /[A-Za-z]/g.test(value);
  let isLetterRu = /[а-яА-ЯёЁ]/g.test(value);
  let isNumber =/[^A-Za-z\sа-яА-ЯёЁ]/g.test(value);

  if ((isLetterEn && !isLetterRu && !isNumber && lng > 2 && lng < 16) || (!isLetterEn && isLetterRu && !isNumber && lng > 2 && lng < 16)) {
    return true;
  }
  return false;
}

formaName.addEventListener('input', () => {
  let validName = isValidName(formaName.value);
  if (validName) {
    formaName.classList.remove('invalid__input');
    formaName.nextElementSibling.classList.remove('valid__forma_active')
  } else {
    formaName.classList.add('invalid__input');
    formaName.nextElementSibling.classList.add('valid__forma_active')
  }
})

function isValidEmail(value) {
  if (value === '') return true;

  if (value.includes('@') && value.includes('.') && (value.match(/\@/g).length === 1) && (value.match(/\./g).length === 1)) {
    let arrEmail = value.split(/[\@\.]/g);
    let lng = arrEmail[0].length;
    let nameValid = /[^\w\-]/g.test(arrEmail[0]);
    let firstDom = /[A-Za-z]{4}/g.test(arrEmail[1]);
    let isFirstDom = /[^A-Za-z]/g.test(arrEmail[1]);
    let isSecondDom = /[^A-Za-z]/g.test(arrEmail[2]);
    let secondDom = /[A-Za-z]{2}/g.test(arrEmail[2]);
    
    if (lng > 2 && lng < 16 && !nameValid && firstDom && secondDom && !isFirstDom && !isSecondDom) {
      return true;
    } else {
      return false
    }
  }
  return false
}
formaEmail.addEventListener('input', () => {
  let validEmail = isValidEmail(formaEmail.value);
  if (validEmail) {
    formaEmail.classList.remove('invalid__input');
    formaEmail.nextElementSibling.classList.remove('valid__forma_active');
  } else {
    formaEmail.classList.add('invalid__input');
    formaEmail.nextElementSibling.classList.add('valid__forma_active');
  }
});

function isValidNumber(value) {
  if (value === '') return true;
  let phoneValid = /[^\s\-\d]/g.test(value);
  let spaceVal = /\s/g.test(value);
  let defVal = /\-/g.test(value);
  if (spaceVal && defVal) {
    return false;
  }
  if(!phoneValid) {
    if (spaceVal || defVal) {
      let arrPhone = value.split(/[\s\-]/g);
      let validArr = arrPhone.every(el => el.length === 2 || el.length == 3);
      if (!validArr) return false;
    }
    let numberCount = value.replace(/[\s\-]/g, '')
    if (numberCount.length > 10) {
      return false;
    }
  } else {
    return false;
  }
  return true;
};

formaPhone.addEventListener('input', () => {
  let validPhone = isValidNumber(formaPhone.value);
  if (validPhone) {
    formaPhone.classList.remove('invalid__input');
    formaPhone.nextElementSibling.classList.remove('valid__forma_active');
  } else {
    formaPhone.classList.add('invalid__input');
    formaPhone.nextElementSibling.classList.add('valid__forma_active');
  }
});


// -----------------------------------------LocalStorage----------------------------------------------
window.addEventListener('load', () => {
  if (localStorage.getItem('basicInput') === 0 || localStorage.getItem('basicInput')) {
    basicInput.forEach(el => {
      el.value = localStorage.getItem('basicInput');
    })
  }
  if (localStorage.getItem('seniorInput') === 0 || localStorage.getItem('seniorInput')) {
    seniorInput.forEach(el => {
      el.value = localStorage.getItem('seniorInput');
    })
  }
  if (localStorage.getItem('totalSum') === 0 || localStorage.getItem('totalSum')) {
    totalSum.value = localStorage.getItem('totalSum');
    totalSumPopup.value = localStorage.getItem('totalSum');
    let strTotalSum = totalSum.value.toString();
    if (strTotalSum.includes('.') || strTotalSum.length > 3) {
      totalSum.style.width = '81px';
      totalSumPopup.style.width = '81px';
    } else {
      totalSum.style.width = '53px';
      totalSumPopup.style.width = '54px';
    }
  }
  if (localStorage.getItem('ticketType')) {
    inputRadioType.forEach(el => {
      el.checked = false;
      if (el.value === localStorage.getItem('ticketType')) {
        el.checked = true;
      }
    });
    selectType.value = localStorage.getItem('ticketType');
    selectTypeInfo.textContent = ticketTypeName[localStorage.getItem('ticketType')];
  }
  if (localStorage.getItem('basicRate')) {
    basicRate.forEach(el => {
      el.textContent = localStorage.getItem('basicRate');
    })
  }
  if (localStorage.getItem('seniorRate')) {
    seniorRate.forEach(el => {
      el.textContent = localStorage.getItem('seniorRate');
    })
  }
  if (localStorage.getItem('curTypeTicket')) {
    curTypeTicket = localStorage.getItem('curTypeTicket');
  }
  if (localStorage.getItem('basicRateTotal') === 0 || localStorage.getItem('basicRateTotal')) {
    basicRateTotal.textContent = localStorage.getItem('basicRateTotal');
  }
  if (localStorage.getItem('seniorRateTotal') === 0 || localStorage.getItem('seniorRateTotal')) {
    seniorRateTotal.textContent = localStorage.getItem('seniorRateTotal');
  }
})





// -----------------------------------------------------------------------------------------
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

  // -------------------Popup---------------------------------------------------------

  const closePopup = document.querySelector('.close__popup');
  export const popup = document.querySelector('.popup');
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

  // --------------------------------------- var---------------------------------------

  function visitInput() {
    this.style.setProperty('--visibility-input', 'visible');
    this.style.setProperty('--bg-image', "url('./assets/icons/boolking/close-arrow-focus.svg')");
    this.style.setProperty('--visibility-value', 'hidden');
  }
  function leaveInput() {
    this.style.setProperty('--visibility-input', 'hidden');
    this.style.setProperty('--bg-image', "url('./assets/icons/boolking/close-arrow.svg')");
    this.style.setProperty('--visibility-value', 'visible');
  }
  

  curDate.addEventListener('input', visitInput);
  // curDate.addEventListener('focus', visitInput)
  // curDate.addEventListener('blur', leaveInput)

  curTime.addEventListener('focus', visitInput)
  curTime.addEventListener('blur', leaveInput)

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