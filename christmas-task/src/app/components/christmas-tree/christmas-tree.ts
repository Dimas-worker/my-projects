import './christmas-tree.scss';
import BaseComponent from '../../utils/base-component';
import Settings from '../settings/settings';
import MapTree from '../tree/map/map';
import { DEFAULT_BG_NUMBER } from '../../constants/constants';

class ChristmasTree extends BaseComponent {
  setting: Settings;
  map: MapTree;
  treeField: BaseComponent;
  bgNumber: string;

  constructor(settings: Settings, map: MapTree) {
    super('div', ['christmas-tree']);
    this.map = map;
    this.setting = settings;
    this.bgNumber = localStorage.getItem('bg-tree') ?? DEFAULT_BG_NUMBER;
    this.element.style.backgroundImage = `url("./assets/bg/${this.bgNumber}.jpg")`;
    this.treeField = new BaseComponent('div', ['christmas-tree__field']);
    this.setting.bgMenu.bgContainer.element.addEventListener('click', (e: Event): void => {
      const target = e.target as HTMLElement;
      this.element.style.backgroundImage = target.style.backgroundImage;
      const imgNumber: string = this.element.style.backgroundImage.replace(/\D/g, '');
      localStorage.setItem('bg-tree', imgNumber);
    });

    this.treeField.element.append(
      this.setting.garland.garland.element,
      this.map.mapElement,
      this.setting.treeMenu.treeDefault
    );
    this.element.append(this.setting.snow.snowField.element, this.treeField.element);
  }
}

export default ChristmasTree;
