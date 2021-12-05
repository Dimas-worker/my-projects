import PopupEndRound from './popup-end-round';

class PopupExit extends PopupEndRound {
  constructor() {
    super();
    this.content = document.body;
    this.view = `
      <div class="popup__content">
        <button class="popup__close closing">X</button>
        <div class="wrapper__popup">
            <div class="congratulation">Do you really want to quit the game?!</div>
            <div class="button__container">
                <button class="btn__popup closing">Cancel</button>
                <a href="./#/" class="btn__popup">Yes</a>
            </div>
        </div>
      </div>`;
    this.section = document.createElement('section');
    this.section.classList.add('popup__exit');
    this.section.innerHTML = this.view;
    this.section.addEventListener('click', (e) => {
      if (e.target.classList.contains('closing')) {
        this.section.classList.add('hide_popup');
        this.section.onanimationend = () => {
          this.section.classList.remove('hide_popup');
          this.section.remove();
        };
      }
    });
  }
}
export default PopupExit;