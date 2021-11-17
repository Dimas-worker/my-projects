export class PopupAnswer {
  constructor(num, bul, obj) {
    this.content = document.body
    this.numberOfImg = num;
    this.correctAnswer = bul;
    this.trueData = obj;
    this.classTag = this.correctAnswer ? 'tick_right' : 'tick_mis';
    this.view = `
      <div class="popup__content">
          <div class="wrapper__popup">
              <div class="answer__result">
                  <span class="icon_tick ${this.classTag}"></span>
              </div>
              <img src="./assets/img/all-img/${this.numberOfImg}.jpg" alt="${this.numberOfImg}" class="img__popup">
              <div class="img__description">
                  <div class="img__name">${this.trueData.name}</div>
                  <div class="img__author">${this.trueData.author}, ${this.trueData.year}</div>
              </div>
              <button class="btn__next">Next</button>
          </div>
      </div>`;
    this.section = document.createElement('section');
    this.section.classList.add('popup__answer');
    this.section.innerHTML = this.view;
  }

  render() {
    this.content.append(this.section);
  }
  remove() {
    this.section.remove();
  }
}