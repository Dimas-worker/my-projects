export class PopupAnswer {
  constructor(num, bul, obj) {
    this.content = document.body
    this.numberOfImg = num;
    this.correctAnswer = bul;
    this.trueData = obj;
    this.classTag = this.correctAnswer ? 'tick_right' : 'tick_mis';
    this.buttonNext = document.createElement('button');
    this.buttonNext.classList.add('btn__next');
    this.buttonNext.textContent = 'Next';
    this.popup =  document.createElement('section');
    this.popup.classList.add('popup__content');
    this.popup.innerHTML = `
    <div class="wrapper__popup">
      <div class="answer__result">
        <span class="icon_tick ${this.classTag}"></span>
      </div>
      <img src="./assets/img/all-img/${this.numberOfImg}.jpg" alt="${this.numberOfImg}" class="img__popup">
      <div class="img__description">
        <div class="img__name">${this.trueData.name}</div>
        <div class="img__author">${this.trueData.author}, ${this.trueData.year}</div>
      </div>
    </div>`;
    this.popup.firstElementChild.append(this.buttonNext);
    this.section = document.createElement('section');
    this.section.classList.add('popup__answer');
    this.section.append(this.popup);
  }

  render() {
    this.content.append(this.section);
  }
  remove() {
    this.section.remove();
  }
}