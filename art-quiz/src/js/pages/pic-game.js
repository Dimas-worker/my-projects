import ArtGame from './art-game';
import {
  getRandomImgNumber, mixValue, getData,
} from '../components/utils';
import { ANSWER_OPTIONS_AMOUNT } from '../components/constants'

class PicGame extends ArtGame {
  linkNextCategory = 'pic-category';

  async renderQuestion(path) {
    const curTag = path;
    const data = await getData();
    if (this.category !== localStorage.getItem('curCategory')) {
      this.category = localStorage.getItem('curCategory');
      this.curObjOfCategory = JSON.parse(localStorage.getItem('answer'))[this.category];
    }

    this.ownNumberOfImg = this.curObjOfCategory.question[this.progressValue].num;
    this.rightObj = data[this.ownNumberOfImg];

    const picContainer = document.createElement('div');
    picContainer.classList.add('img__container');
    const pictures = [];
    pictures.push(this.rightObj.imageNum);
    for (let i = 0; i < ANSWER_OPTIONS_AMOUNT - 1; i++) {
      const count = getRandomImgNumber();
      if (pictures.includes(data[count].imageNum)) {
        i--;
      } else {
        pictures.push(data[count].imageNum);
      }
    }
    this.renderBtn(pictures, picContainer);

    curTag.innerHTML = `<div class="game__question">Which is ${this.rightObj.author} picture?</div>`;
    curTag.append(picContainer);
  }

  renderBtn(answerOptions, buttonContainer) {
    const mixedAnswers = mixValue(answerOptions);
    mixedAnswers.forEach((el) => {
      const div = document.createElement('div');
      div.classList.add('img__card');
      div.innerHTML = '<div class="sheet"></div>';
      const img = document.createElement('img');
      img.src = `./assets/img/all-img/${el}.jpg`;
      img.alt = `${el}`;
      div.addEventListener('click', () => {
        clearTimeout(this.timerId);
        if (img.alt === this.rightObj.imageNum) {
          if (!this.curObjOfCategory.question[this.progressValue].stats) {
            this.curObjOfCategory.question[this.progressValue].stats = true;
            this.curObjOfCategory.correct++;
          }

          if (!this.curObjOfCategory.visit) {
            this.curObjOfCategory.visit = true;
          }

          div.firstElementChild.classList.toggle('right_img');
          this.booleanCorrectAnswer = true;
          this.countCorrectAnswer++;
        } else {
          if (this.curObjOfCategory.question[this.progressValue].stats) {
            this.curObjOfCategory.correct--;
          }
          this.curObjOfCategory.question[this.progressValue].stats = false;
          div.firstElementChild.classList.toggle('wrong_img');
          this.booleanCorrectAnswer = false;
        }
        setTimeout(() => { this.nextCard(this.booleanCorrectAnswer); }, 500);
      }, { once: true });
      img.onload = () => {
        div.append(img);
        buttonContainer.append(div);
      };
    });
  }
}

export default PicGame;
