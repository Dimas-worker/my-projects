import { DEFAULT_VOLUME, MAX_VOLUME, DEFAULT_TIME } from '../components/constants'
import { createFooter } from '../components/utils'

const timerRange = {
  min: 5,
  max: 30,
  step: 5
}

class Setting {
  constructor() {
    this.content = document.body;
    this.header = document.createElement('div');
    this.header.classList.add('setting__header');
    this.header.innerHTML = `
      <a href="./#/" class="setting__btn">
        <span class="arrow_icon"></span>
        <span>Setting</span>
      </a>
      <a href="./#/" class="close__btn"></a>`;
    this.main = document.createElement('div');
    this.main.classList.add('setting__main');

  }

  createSettingVolume() {
    const settingVolume = document.createElement('div');
    settingVolume.classList.add('setting__volume');
    settingVolume.innerHTML = '<h3>Volume</h3><div class="volume__container"></div>';
    const btnVolume = document.createElement('button');
    btnVolume.classList.add('volume__icon');
    if (!(+localStorage.getItem('volume'))) { btnVolume.classList.add('volume__icon', 'volume__icon_mute'); }
    this.inputRange = document.createElement('input');
    this.inputRange.type = 'range';
    this.inputRange.classList.add('progress__volume');
    this.inputRange.min = '0';
    this.inputRange.max = MAX_VOLUME;
    this.inputRange.value = localStorage.getItem('volume') ?? DEFAULT_VOLUME;
    this.inputRange.addEventListener('input', () => {
      this.setVolume();
      if (+this.inputRange.value) {
        btnVolume.classList.remove('volume__icon_mute');
      } else {
        btnVolume.classList.add('volume__icon_mute');
      }
    });
    let curVolume;
    btnVolume.addEventListener('click', () => {
      if (btnVolume.classList.contains('volume__icon_mute')) {
        btnVolume.classList.remove('volume__icon_mute');
        this.inputRange.value = curVolume;
      } else {
        btnVolume.classList.add('volume__icon_mute');
        curVolume = this.inputRange.value;
        this.inputRange.value = 0;
      }
      this.setVolume();
    });
    settingVolume.lastElementChild.append(this.inputRange);
    settingVolume.lastElementChild.append(btnVolume);
    this.main.append(settingVolume);
  }

  createSettingTime() {
    const settingTime = document.createElement('div');
    settingTime.classList.add('setting__time');
    settingTime.innerHTML = '<h3>Time game</h3><div class="switcher"></div>';
    this.displaySwitch = document.createElement('span');
    this.displaySwitch.classList.add('val_switch');
    this.displaySwitch.textContent = 'On';
    const label = document.createElement('label');
    label.classList.add('switch');
    this.timerSwitcher = document.createElement('input');
    this.timerSwitcher.classList.add('checkbox');
    this.timerSwitcher.type = 'checkbox';
    this.timerSwitcher.checked = localStorage.getItem('timer') ? JSON.parse(localStorage.getItem('timer')) : true;
    const span = document.createElement('span');
    span.classList.add('slider', 'round');

    this.timerSwitcher.addEventListener('change', () => { this.checkTimer(); });
    label.append(this.timerSwitcher, span);
    settingTime.lastElementChild.append(this.displaySwitch, label);
    this.main.append(settingTime);
  }

  createSettingAnswer() {
    const settingAnswer = document.createElement('div');
    settingAnswer.classList.add('setting__answer');
    settingAnswer.innerHTML = '<h3>Time to answer</h3><div class="time__container"></div>';
    const buttonMinus = document.createElement('button');
    buttonMinus.classList.add('btn_time', 'minus');
    buttonMinus.textContent = '_';
    this.inputTime = document.createElement('input');
    this.inputTime.classList.add('time_count');
    this.inputTime.type = 'number';
    this.inputTime.readOnly = true;
    this.inputTime.value = localStorage.getItem('timerValue') ?? DEFAULT_TIME;
    const buttonPlus = document.createElement('button');
    buttonPlus.classList.add('btn_time', 'plus');
    buttonPlus.textContent = '+';

    settingAnswer.addEventListener('click', (e) => {
      if (e.target.textContent === '_') {
        if (this.inputTime.value > timerRange.min) {
          this.inputTime.value = +this.inputTime.value - timerRange.step;
        }
        if (!(+this.inputTime.value)) {
          this.timerSwitcher.checked = false;
          this.checkTimer();
        }
      } else if (e.target.textContent === '+') {
        if (this.inputTime.value < timerRange.max) {
          this.inputTime.value = +this.inputTime.value + timerRange.step;
        }
      }
    });
    this.inputTime.addEventListener('change', () => {
      if (this.inputTime.value < 0) {
        this.inputTime.value = 0;
      }
      if (!(+this.inputTime.value)) {
        this.timerSwitcher.checked = false;
        this.checkTimer();
      }
    });
    settingAnswer.lastElementChild.append(buttonMinus, this.inputTime, buttonPlus);
    this.main.append(settingAnswer);
  }

  createSettingButtons() {
    const settingBtn = document.createElement('div');
    settingBtn.classList.add('setting__button');
    const btnDefault = document.createElement('button');
    btnDefault.classList.add('btn', 'btn_default');
    btnDefault.textContent = 'Default';
    const btnSave = document.createElement('button');
    btnSave.classList.add('btn', 'btn_save');
    btnSave.textContent = 'Save';
    btnDefault.addEventListener('click', () => { this.setDefault(); });
    btnSave.addEventListener('click', () => {
      this.setSettingsToLocalStorage();
    });
    settingBtn.append(btnDefault, btnSave);
    this.main.append(settingBtn);

    this.footer = createFooter();
    this.section = document.createElement('div');
    this.section.classList.add('wrapper', 'wrapper__setting');
    this.section.append(this.header);
    this.section.append(this.main);
    this.section.append(this.footer);
    this.setSettingsToLocalStorage();
  }

  render() {
    this.main.innerHTML = '';
    this.createSettingVolume();
    this.createSettingTime();
    this.createSettingAnswer()
    this.createSettingButtons();
    this.setCurrent();
    this.content.append(this.section);
  }

  setVolume() {
    this.inputRange.style.background = `linear-gradient(to right, #FFBCA2 0%,#FFBCA2 ${this.inputRange.value}%, #fff ${this.inputRange.value}%, #fff 100%)`;
  }

  checkTimer() {
    this.displaySwitch.textContent = this.timerSwitcher.checked ? 'On' : 'Off';
  }

  setSettingsToLocalStorage() {
    localStorage.setItem('volume', this.inputRange.value);
    localStorage.setItem('timer', this.timerSwitcher.checked);
    localStorage.setItem('timerValue', this.inputTime.value);
  }

  setDefault() {
    this.inputRange.value = DEFAULT_VOLUME;
    this.setVolume();
    this.timerSwitcher.checked = true;
    this.checkTimer();
    this.inputTime.value = DEFAULT_TIME;
  }

  setCurrent() {
    this.inputRange.value = localStorage.getItem('volume') ?? DEFAULT_VOLUME;
    this.setVolume();
    this.timerSwitcher.checked = localStorage.getItem('timer') ? JSON.parse(localStorage.getItem('timer')) : true;
    this.checkTimer();
    this.inputTime.value = localStorage.getItem('timerValue') ?? DEFAULT_TIME;
  }
}

export default Setting;
