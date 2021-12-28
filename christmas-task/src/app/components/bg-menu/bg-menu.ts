import './bg-menu.scss';
import BaseComponent from '../../utils/base-component';
import { TitleMenu } from '../settings/settings';

class BgMenu extends BaseComponent {
  title: BaseComponent;
  bgContainer: BaseComponent;

  constructor(amount: number, title: TitleMenu) {
    super('div', ['setting-menu']);
    this.title = new BaseComponent('div', ['setting-menu__title'], title);
    this.bgContainer = new BaseComponent('div', ['setting-menu__container']);
    for (let i = 1; i <= amount; i++) {
      this.createBgElement(i);
    }
    this.element.append(this.title.element, this.bgContainer.element);
  }
  createBgElement(number: number): void {
    const bgIcon: HTMLElement = document.createElement('div');
    bgIcon.classList.add('bg-menu__icon');
    bgIcon.style.backgroundImage = `url('./assets/bg/${number}.jpg')`;
    this.bgContainer.element.append(bgIcon);
  }
}

export default BgMenu;
