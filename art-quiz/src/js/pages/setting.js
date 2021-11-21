export class Setting {
  constructor() {
    this.content = document.body;
    this.header = document.createElement('div');
    this.header.classList.add('setting__header');
    this.header.innerHTML = `
        <a href="/#/" class="setting__btn">
            <span class="arrow_icon"></span>
            <span>Setting</span>
        </a>
        <a href="/#/" class="close__btn"></a>`;
    this.main = document.createElement('div');
    this.main.classList.add('setting__main');

    //setting__volume------------------------------------------------------------------
    const settingVolume = document.createElement('div');
    settingVolume.classList.add('setting__volume');
    settingVolume.innerHTML = `<h3>Volume</h3><div class="volume__container"></div>`;
    const btnVolume = document.createElement('button');
    btnVolume.classList.add('volume__icon');
    if (localStorage.getItem('volume') == 0) {btnVolume.classList.add('volume__icon', 'volume__icon_mute')};
    this.input = document.createElement('input');
    this.input.type = 'range';
    this.input.classList.add('progress__volume');
    this.input.min = '0';
    this.input.max = '100';
    this.input.value = localStorage.getItem('volume') ? localStorage.getItem('volume') : '40';
    this.input.addEventListener('input', () => {
      this.setVolume();
      if (this.input.value === '0') {
        btnVolume.classList.add('volume__icon_mute');
      } else {
        btnVolume.classList.remove('volume__icon_mute');
      }
    });
    let curVolume;
    btnVolume.addEventListener('click', () => {
      if (btnVolume.classList.contains('volume__icon_mute')) {
        btnVolume.classList.remove('volume__icon_mute');
        this.input.value = curVolume;
      } else {
        btnVolume.classList.add('volume__icon_mute');
        curVolume = this.input.value;
        this.input.value = 0;
      }
      this.setVolume();
    })
    settingVolume.lastElementChild.append(this.input);
    settingVolume.lastElementChild.append(btnVolume);
    this.main.append(settingVolume);

    //setting__time-------------------------------------------------------------------------
    const settingTime = document.createElement('div');
    settingTime.classList.add('setting__time');
    settingTime.innerHTML = `<h3>Time game</h3><div class="switcher"></div>`;
    this.displaySwitch = document.createElement('span');
    this.displaySwitch.classList.add('val_switch');
    this.displaySwitch.textContent = 'On';
    const label = document.createElement('label');
    label.classList.add('switch');
    this.check = document.createElement('input');
    this.check.classList.add('checkbox');
    this.check.type = 'checkbox';
    this.check.checked = localStorage.getItem('timer') ? JSON.parse(localStorage.getItem('timer')) : true;
    const span = document.createElement('span');
    span.classList.add('slider', 'round');
    this.check.addEventListener('change', () => {this.checkTimer()})
    label.append(this.check, span);
    settingTime.lastElementChild.append(this.displaySwitch, label);
    this.main.append(settingTime);

    // setting__answer -------------------------------------------------------------------
    const settingAnswer = document.createElement('div');
    settingAnswer.classList.add('setting__answer');
    settingAnswer.innerHTML = `<h3>Time to answer</h3><div class="time__container"></div>`;
    const buttonMinus = document.createElement('button');
    buttonMinus.classList.add('btn_time', 'minus');
    buttonMinus.textContent = '_';
    this.inputTime = document.createElement('input');
    this.inputTime.classList.add('time_count');
    this.inputTime.type = 'number';
    this.inputTime.value = localStorage.getItem('timerValue') ? localStorage.getItem('timerValue') : 20;
    const buttonPlus = document.createElement('button');
    buttonPlus.classList.add('btn_time', 'plus');
    buttonPlus.textContent = '+';
    settingAnswer.addEventListener('click', (e) => {
      if (e.target.textContent === '_') {
        if (this.inputTime.value > 5) {
          this.inputTime.value = +this.inputTime.value - 5;
        } 
        if (this.inputTime.value === '0') {
          this.check.checked = false;
          this.checkTimer();
        }
      } else if (e.target.textContent === '+') {
        if (this.inputTime.value < 30) {
          this.inputTime.value = +this.inputTime.value + 5;
        }
      }
    });
    this.inputTime.addEventListener('change', () => {
      if (this.inputTime.value < 0) {
        this.inputTime.value = 0;
      }
      if (this.inputTime.value === '0') {
        this.check.checked = false;
        this.checkTimer();
      }
    })
    settingAnswer.lastElementChild.append(buttonMinus, this.inputTime, buttonPlus);
    this.main.append(settingAnswer);
    // setting__buttons -------------------------------------------------------------------
    const settingBtn = document.createElement('div');
    settingBtn.classList.add('setting__button');
    const btnDefault = document.createElement('button');
    btnDefault.classList.add('btn', 'btn_default');
    btnDefault.textContent = 'Default';
    const btnSave = document.createElement('button');
    btnSave.classList.add('btn', 'btn_save');
    btnSave.textContent = 'Save';
    btnDefault.addEventListener('click', () => {this.setDefault()});
    btnSave.addEventListener('click', () => {
      this.setLS();
    });
    settingBtn.append(btnDefault, btnSave);
    this.main.append(settingBtn);

    this.footer = document.createElement('div');
    this.footer.classList.add('footer');
    this.footer.innerHTML = `
        <div class="school__logo">
            <a href="https://rs.school/js/" target="_blank" class="rss"></a>
        </div>
        <div class="developer">
            <a href="https://github.com/Dimas-worker" target="_blank">dimas-worker</a>
        </div>
        <div class="create__year">2021</div>`;
    this.section = document.createElement('div');
    this.section.classList.add('wrapper', 'wrapper__setting');
    this.section.append(this.header);
    this.section.append(this.main);
    this.section.append(this.footer);
    this.setLS();
  }
  render() {
    this.setCurrent();
    this.content.append(this.section);
  }
  setVolume() {
    this.input.style.background = `linear-gradient(to right, #FFBCA2 0%,#FFBCA2 ${this.input.value}%, #fff ${this.input.value}%, #fff 100%)`;
  }
  checkTimer() {
    this.displaySwitch.textContent = this.check.checked ? 'On' : 'Off';
  }
  setLS() {
    localStorage.setItem('volume', this.input.value);
    localStorage.setItem('timer', this.check.checked);
    localStorage.setItem('timerValue', this.inputTime.value);
  }
  setDefault() {
    this.input.value = '40';
    this.setVolume();
    this.check.checked = true;
    this.checkTimer();
    this.inputTime.value = 20;
  }
  setCurrent() {
    this.input.value = localStorage.getItem('volume') ? localStorage.getItem('volume') : '40';
    this.setVolume();
    this.check.checked = localStorage.getItem('timer') ? JSON.parse(localStorage.getItem('timer')) : true;
    this.checkTimer();
    this.inputTime.value = localStorage.getItem('timerValue') ? localStorage.getItem('timerValue') : 20;
  }
}
