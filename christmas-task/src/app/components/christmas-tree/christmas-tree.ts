import './christmas-tree.scss';
import BaseComponent from '../../utils/base-component';
import Settings from '../settings/settings';
import MapTree from '../tree/map/map';

class ChristmasTree extends BaseComponent {
  setting: Settings;
  map: MapTree;
  treeField: BaseComponent;
  numberBg: string;

  constructor(settings: Settings, map: MapTree) {
    super('div', ['christmas-tree']);
    this.map = map;
    this.setting = settings;
    this.numberBg = localStorage.getItem('bg-tree') ?? '1';
    this.element.style.backgroundImage = `url("./assets/bg/${this.numberBg}.jpg")`
    this.treeField = new BaseComponent('div', ['christmas-tree__field']);
    this.setting.bgMenu.bgContainer.element.addEventListener('click', (e: Event): void => {
      const target = e.target as HTMLElement;
      this.element.style.backgroundImage = target.style.backgroundImage;
      const imgNumber = this.element.style.backgroundImage.replace(/\D/g, '');
      localStorage.setItem('bg-tree', imgNumber)
    })
    
    this.treeField.element.append(this.setting.garland.garland.element, this.map.map, this.setting.treeMenu.treeDefault);
    this.element.append(this.setting.snow.snowField.element, this.treeField.element);
  }
}

export default ChristmasTree;
