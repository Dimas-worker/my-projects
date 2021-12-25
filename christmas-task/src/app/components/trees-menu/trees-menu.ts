import './trees-menu.scss';
import BgMenu from '../bg-menu/bg-menu';
import { TitleMenu } from '../settings/settings';

class TreeMenu extends BgMenu {
  treeDefault: HTMLImageElement;

  constructor(amount: number, title: TitleMenu) {
    super(amount, title);
    this.treeDefault = new Image();
    this.treeDefault.setAttribute('src', './assets/tree/1.png');
    this.treeDefault.setAttribute('alt', 'tree-1');
    this.treeDefault.setAttribute('usemap', '#image-map');
    this.treeDefault.classList.add('main-tree');
  }

  createBgElement(number: number): void {
    const treeIcon: HTMLElement = document.createElement('div');
    treeIcon.classList.add('tree-menu__icon');
    treeIcon.style.backgroundImage = `url('./assets/tree/${number}.png')`;
    treeIcon.addEventListener('click', ():void => {
      let url: string = treeIcon.style.backgroundImage.slice(5, -2);
      this.treeDefault.src = url;
    })
    this.bgContainer.element.append(treeIcon);
  }
}

export default TreeMenu;
