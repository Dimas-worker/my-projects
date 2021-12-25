import './song.scss';
import BaseComponent from '../../utils/base-component';

class Song extends BaseComponent {
  icon: BaseComponent
  audio: HTMLAudioElement;

  constructor() {
    super('div', ['song']);
    this.audio = new Audio();
    this.audio.src = './assets/audio/audio.mp3';
    this.icon = new BaseComponent('div', ['song__icon', 'mute__song']);
    this.element.append(this.icon.element);
    this.icon.element.addEventListener('click', () => {
      this.togglePlay();
    })
  }
  togglePlay(): void {
    if (this.audio.paused) {
      this.icon.element.className = 'song__icon active__song';
      this.audio.play();
    } else {
      this.icon.element.className = 'song__icon mute__song';
      this.audio.pause();
    }
  }
}

export default Song;