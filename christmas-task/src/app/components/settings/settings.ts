import './settings.scss';
import BaseComponent from '../../utils/base-component';
import Song from '../song/song';
import Snow from '../snow/snow';
import BgMenu from '../bg-menu/bg-menu';
import Garland from '../garland/garland';
import { BG_MENU_AMOUNT, TREE_MENU_AMOUNT } from '../../constants/constants';
import TreeMenu from '../trees-menu/trees-menu';


const enum TitleMenu {
  bgMenu = 'Выберите фон',
  treeMenu = 'Выберите ёлку'
}

class Settings extends BaseComponent {
  iconsContainer: BaseComponent;
  song: Song;
  snow: Snow;
  treeMenu: TreeMenu;
  bgMenu: BgMenu;
  garland: Garland;

  constructor() {
    super('div', ['settings']);
    this.iconsContainer = new BaseComponent('div', ['settings__icons']);
    this.song = new Song();
    this.snow = new Snow();
    this.treeMenu = new TreeMenu(TREE_MENU_AMOUNT, TitleMenu.treeMenu);
    this.bgMenu = new BgMenu(BG_MENU_AMOUNT, TitleMenu.bgMenu);
    this.garland = new Garland();

    this.iconsContainer.element.append(this.song.element, this.snow.icon.element);
    this.element.append(this.iconsContainer.element, this.treeMenu.element, this.bgMenu.element, this.garland.buttonContainer.element);
  }
}

export { TitleMenu };
export default Settings;
