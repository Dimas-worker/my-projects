import './snow.scss';
import BaseComponent from '../../utils/base-component';
import { SNOW_FLAKE_SIZE } from '../../constants/constants';

const enum AnimationTime {
  min = 2,
  range = 3,
}

class Snow {
  icon: BaseComponent;
  snowField: BaseComponent;
  IDtimer: NodeJS.Timer | null = null;

  constructor() {
    this.icon = new BaseComponent('div', ['snow-control']);
    this.snowField = new BaseComponent('div', ['snow-field']);
    this.checkSnowActive();

    this.icon.element.addEventListener('click', (): void => this.showSnow());
  }

  createSnowFlake(): void {
    const snowFlake: HTMLElement = document.createElement('i');
    snowFlake.classList.add('snowflake__icon');
    snowFlake.style.left = Math.random() * window.innerWidth + 'px';
    snowFlake.style.animationDuration = Math.random() * AnimationTime.range + AnimationTime.min + 's';
    snowFlake.style.opacity = Math.random().toString();
    snowFlake.style.width = snowFlake.style.height = Math.random() * SNOW_FLAKE_SIZE + SNOW_FLAKE_SIZE + 'px';
    this.snowField.element.append(snowFlake);

    setTimeout((): void => {
      snowFlake.remove();
    }, 5000);
  }

  checkSnowActive(): void {
    if (localStorage.getItem('snow')) {
      this.icon.element.classList.add('active__snow');
      this.IDtimer = setInterval((): void => {
        this.createSnowFlake();
      }, 50);
    }
  }

  showSnow(): void {
    if (this.IDtimer) {
      localStorage.setItem('snow', '');
      this.icon.element.classList.remove('active__snow');
      clearInterval(this.IDtimer);
      this.IDtimer = null;
    } else {
      localStorage.setItem('snow', 'on');
      this.icon.element.classList.add('active__snow');
      this.IDtimer = setInterval((): void => {
        this.createSnowFlake();
      }, 50);
    }
  }
}

export default Snow;
