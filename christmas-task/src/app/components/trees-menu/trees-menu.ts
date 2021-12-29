import './trees-menu.scss';
import BgMenu from '../bg-menu/bg-menu';
import { TitleMenu } from '../settings/settings';
import { DEFAULT_TREE_NUMBER } from '../../constants/constants';

class TreeMenu extends BgMenu {
  treeDefault: HTMLImageElement;

  constructor(amount: number, title: TitleMenu) {
    super(amount, title);
    this.treeDefault = new Image();
    const treeNumber: string = localStorage.getItem('tree') ?? DEFAULT_TREE_NUMBER;
    this.treeDefault.setAttribute('src', `./assets/tree/${treeNumber}.png`);
    this.treeDefault.setAttribute('alt', 'tree-1');
    this.treeDefault.setAttribute('usemap', '#tree-map');
    this.treeDefault.classList.add('main-tree');
  }

  createBgElement(number: number): void {
    const treeIcon: HTMLElement = document.createElement('div');
    treeIcon.classList.add('tree-menu__icon');
    treeIcon.style.backgroundImage = `url('./assets/tree/${number}.png')`;
    treeIcon.addEventListener('click', (): void => {
      const url: string = treeIcon.style.backgroundImage.slice(5, -2);
      this.treeDefault.src = url;
      const treeNumber: string = url.replace(/\D/g, '');
      localStorage.setItem('tree', treeNumber);
    });
    this.bgContainer.element.append(treeIcon);
  }
}

export default TreeMenu;
