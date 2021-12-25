import './settings.scss';
import BaseComponent from '../../utils/base-component';
import Song from '../song/song';
import Snow from '../snow/snow';

class Settings extends BaseComponent {
  iconsContainer: BaseComponent;
  song: Song;
  snow: Snow;

  constructor() {
    super('div', ['settings']);
    this.iconsContainer = new BaseComponent('div', ['settings__icons']);
    this.song = new Song();
    this.snow = new Snow();
    this.iconsContainer.element.append(this.song.element, this.snow.icon.element);
    this.element.append(this.iconsContainer.element);
  }
}

export default Settings;