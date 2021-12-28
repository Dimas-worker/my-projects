import './snow.scss';
import BaseComponent from '../../utils/base-component';

class Snow {
  icon: BaseComponent;
  snowField: BaseComponent;
  IDtimer: NodeJS.Timer | null = null;

  constructor() {
    this.icon = new BaseComponent('div', ['snow-control']);
    this.snowField = new BaseComponent('div', ['snow-field']);
    this.checkedLocal();

    this.icon.element.addEventListener('click', (): void => {
      this.showSnow();
    });
  }

  createSnowFlake() {
    const snow_flake = document.createElement('i');
    snow_flake.classList.add('snowflake__icon');
    snow_flake.style.left = Math.random() * window.innerWidth + 'px';
    snow_flake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snow_flake.style.opacity = Math.random().toString();
    snow_flake.style.width = snow_flake.style.height = Math.random() * 10 + 10 + 'px';
    this.snowField.element.append(snow_flake);

    setTimeout(() => {
      snow_flake.remove();
    }, 5000);
  }

  checkedLocal() {
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
