import { ArtGame } from './art-game';
import { randomImg , shuffle, playSound, getData } from '../components/use-func';
import { PopupEndRound } from '../components/popup-end-round';

export class PicGame extends ArtGame {
  constructor() {
    super()
  }
  async renderQuestion(path) {
    const data = await getData();
    //todo ----------------------------------------------------------------
    if (this.category !== localStorage.getItem('curCategory')) {
      this.category = localStorage.getItem('curCategory');
      this.curObjOfCategory = JSON.parse(localStorage.getItem('answer'))[this.category];
    }

    this.rmNumber = this.curObjOfCategory.question[this.progressValue].num;
    this.rightObj = data[this.rmNumber];

    const picContainer = document.createElement('div');
    picContainer.classList.add('img__container');
    let arrPic = [];
    arrPic.push(this.rightObj.imageNum);
    for (let i = 0; i < 3; i++) {
      let count = randomImg();
      if (!arrPic.includes(data[count].imageNum)) {
        arrPic.push(data[count].imageNum)
      } else {
        i--;
      }
    }
    this.renderBtn(arrPic, picContainer)
   
    path.innerHTML = `<div class="game__question">Which is ${this.rightObj.author} picture?</div>`;
    path.append(picContainer);
  };
  renderBtn(arr, path) {
    shuffle(arr); //mix answer
    arr.forEach((el, index) => {
      const div = document.createElement('div');
      div.classList.add('img__card');
      div.innerHTML = `<div class="sheet"></div>`
      const img = document.createElement('img');
      img.src = `./assets/img/all-img/${el}.jpg`;
      img.alt = `${el}`;
      div.addEventListener('click', () => {
        clearTimeout(this.timerId)
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
        }
        else {
          if (this.curObjOfCategory.question[this.progressValue].stats) {
            this.curObjOfCategory.correct--;
          }
          this.curObjOfCategory.question[this.progressValue].stats = false;
          div.firstElementChild.classList.toggle('wrong_img');
          this.booleanCorrectAnswer = false;
        }
        setTimeout( () => {this.nextCard(this.booleanCorrectAnswer)}, 500);
      })
      img.onload = () => {
        div.append(img)
        path.append(div);
      }
    })
  }
  showEndPopup(obj) {
    let endRound = new PopupEndRound(this.countCorrectAnswer, 'pic-category');
    playSound(this.booleanCorrectAnswer, true);
    endRound.render();
    // ls---------------------------------------------------------------------------------------
    let answer = JSON.parse(localStorage.getItem('answer'))
    answer[this.category] = obj;
    let str = JSON.stringify(answer);

    localStorage.setItem('answer', str);
    // -------------------------------------------------------------------------------------------
    this.progressValue = 0;
    this.countCorrectAnswer = 0;
    clearTimeout(this.timerId);
  }
}