import './christmas-tree.scss';
import BaseComponent from '../../utils/base-component';
import Settings from '../settings/settings';

class ChristmasTree extends BaseComponent {
  setting: Settings;

  constructor(settings: Settings) {
    super('div', ['christmas-tree']);
    this.setting = settings;
    
    this.element.append(this.setting.snow.snowField.element);
  }
}

export default ChristmasTree;