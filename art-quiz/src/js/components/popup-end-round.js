

export class PopupEndRound {
  constructor(num, path) {
    this.content = document.body
    this.numberOfImg = num;
    this.phrase = this.getPhrase();
    this.view = `
      <div class="popup__content">
          <div class="wrapper__popup">
             <img src="./assets/icons/popup/end-round-icon.svg" alt="end-round-icon" class="end-round">
             <div class="congratulation">${this.phrase}</div>
             <div class="total__result">${this.numberOfImg}/10</div>
             <div class="button__container">
                  <a href="./#/" class="btn__popup">Home</a>
                  <a href="./#/${path}" class="btn__popup">Next Quiz</a>
              </div>
          </div>
      </div>`;
    this.section = document.createElement('section');
    this.section.classList.add('popup__end_round');
    this.section.innerHTML = this.view;
  }

  render() {
    this.content.append(this.section);
  }
  remove() {
    this.section.remove();
  }
  getPhrase() {
    if (this.numberOfImg < 2) {
      return 'Maybe next time?';
    } else if (this.numberOfImg < 6) {
      return 'Well done!';
    } else if (this.numberOfImg < 9) {
      return 'Congratulations!';
    } else {
      return 'Champion!'
    }
  }
}