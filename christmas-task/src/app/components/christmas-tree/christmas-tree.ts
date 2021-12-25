import './christmas-tree.scss';
import BaseComponent from '../../utils/base-component';
import Settings from '../settings/settings';
import MapTree from './map/map';

class ChristmasTree extends BaseComponent {
  setting: Settings;
  map: MapTree;

  constructor(settings: Settings) {
    super('div', ['christmas-tree']);
    this.map = new MapTree();
    
    this.setting = settings;
    this.setting.bgMenu.bgContainer.element.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      this.element.style.backgroundImage = target.style.backgroundImage;
    })
    
    this.element.append(this.setting.snow.snowField.element, this.map.map, this.setting.treeMenu.treeDefault);
  }
}

export default ChristmasTree;
