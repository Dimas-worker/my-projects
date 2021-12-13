import {
  getRandomImgNumber, mixValue, playSound, animatePopup, getData
} from '../components/utils';
import { QUESTIONS_IN_ROUND, DEFAULT_TIME, ANSWER_OPTIONS_AMOUNT } from '../components/constants'
import PopupAnswer from '../components/popup-answer';
import PopupEndRound from '../components/popup-end-round';
import PopupExit from '../components/popup-exist';
import Footer from '../components/footer';

class ArtGame {
  timeline;

  timerId;

  category;

  curObjOfCategory;

  ownNumberOfImg;

  rightObj;
  
  linkNextCategory = 'category';

  constructor() {
    this.container = document.body;
    this.progressValue = 0;
    this.countCorrectAnswer = 0;
    this.isCorrectAnswer = false;
    this.commonCountRound = QUESTIONS_IN_ROUND;
    this.main = `
      <div class="art-game__main">
      <div class="game__container"></div>
      </div>`;
    this.footer = new Footer();
    this.header = document.createElement('div');
    this.buttonClose = document.createElement('button');
    this.buttonClose.classList.add('close__btn_game');
    this.buttonClose.onclick = () => {
      const exit = new PopupExit();
      exit.render();
    };
  }

  renderHeader(val, time) {
    this.header.classList.add('art-game__header');
    this.header.innerHTML = `
      <input type="range" min="1" max="${this.commonCountRound}" step="1" value="${val}" class="progress__game">
      <div class="game__time">${time}</div>`;
    this.header.prepend(this.buttonClose);
  }

  renderHTML() {
    this.timeline = localStorage.getItem('timerValue') ? localStorage.getItem('timerValue') : DEFAULT_TIME;
    const progress = this.progressValue + 1;
    this.renderHeader(progress, this.timeline);
    this.container.innerHTML = '';
    const tag = document.createElement('div');
    tag.classList.add('wrapper__game', 'wrapper__art-game');
    tag.innerHTML += this.main;
    tag.prepend(this.header);
    tag.append(this.footer.footer);
    this.container.append(tag);
    animatePopup(tag);
    return this.container;
  }

  async renderQuestion(path) {
    const currentTag = path;
    const data = await getData();
    if (this.category !== localStorage.getItem('curCategory')) {
      this.category = localStorage.getItem('curCategory');
      this.curObjOfCategory = JSON.parse(localStorage.getItem('answer'))[this.category];
    }

    this.ownNumberOfImg = this.curObjOfCategory.question[this.progressValue].num;
    this.rightObj = data[this.ownNumberOfImg];

    const img = document.createElement('img');
    img.alt = this.ownNumberOfImg;
    img.className = 'art__img';
    img.src = `./assets/img/all-img/${this.ownNumberOfImg}.jpg`;

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('img__info');
    const authors = [];
    authors.push(this.rightObj.author);
    for (let i = 0; i < ANSWER_OPTIONS_AMOUNT - 1; i++) {
      const count = getRandomImgNumber();
      if (authors.includes(data[count].author)) {
        i--;
      } else {
        authors.push(data[count].author);
      }
    }
    this.renderBtn(authors, btnContainer);

    img.onload = () => {
      currentTag.innerHTML = '<div class="game__question">Who is the author of this picture?</div>';
      currentTag.append(img);
      currentTag.append(btnContainer);
    };
  }

  renderBtn(answerOptions, buttonContainer) {
    const mixedAnswers = mixValue(answerOptions);
    mixedAnswers.forEach(el => {
      const button = document.createElement('button');
      button.classList.add('btn__choose');
      button.textContent = el;
      button.addEventListener('click', () => {
        clearTimeout(this.timerId);
        if (button.textContent === this.rightObj.author) {
          if (!this.curObjOfCategory.question[this.progressValue].stats) {
            this.curObjOfCategory.question[this.progressValue].stats = true;
            this.curObjOfCategory.correct++;
          }

          if (!this.curObjOfCategory.visit) {
            this.curObjOfCategory.visit = true;
          }

          button.classList.toggle('btn_correct');
          this.isCorrectAnswer = true;
          this.countCorrectAnswer++;
        } else {
          if (this.curObjOfCategory.question[this.progressValue].stats) {
            this.curObjOfCategory.correct--;
          }
          this.curObjOfCategory.question[this.progressValue].stats = false;
          button.classList.toggle('btn_wrong');
          this.isCorrectAnswer = false;
        }
        setTimeout(() => { this.nextCard(this.isCorrectAnswer); }, 500);
      }, { once: true });
      buttonContainer.append(button);
    });
  }

  showEndPopup(obj, category) {
    const endRound = new PopupEndRound(this.countCorrectAnswer, category);
    playSound(this.isCorrectAnswer, true);
    endRound.render();

    const answer = JSON.parse(localStorage.getItem('answer'));
    answer[this.category] = obj;
    const str = JSON.stringify(answer);
    localStorage.setItem('answer', str);
    
    this.progressValue = 0;
    this.countCorrectAnswer = 0;
    clearTimeout(this.timerId);
  }

  nextCard(bool) {
    const popupAnswer = new PopupAnswer(this.ownNumberOfImg, bool, this.rightObj);
    popupAnswer.render();
    playSound(bool);
    popupAnswer.buttonNext.addEventListener('click', (e) => {
      if (e.target.className === 'btn__next') {
        this.progressValue++;
        popupAnswer.remove();
        if (this.progressValue === this.commonCountRound) {
          this.showEndPopup(this.curObjOfCategory, this.linkNextCategory);
        } else {
          this.render();
        }
      }
    }, { once: true });
  }

  setTimer(time, tag) {
    let curTime = time;
    const curTag = tag;
    const isTimer = JSON.parse(localStorage.getItem('timer'));
    if (!isTimer) return;
    clearTimeout(this.timerId);
    if (curTime === -1) {
      this.isCorrectAnswer = false;
      this.nextCard(this.isCorrectAnswer);
      return;
    }
    window.addEventListener('hashchange', () => {
      clearTimeout(this.timerId);
      this.progressValue = 0;
    });
    curTag.textContent = curTime;
    this.timerId = setTimeout(() => {
      curTime--;
      this.setTimer(curTime, curTag);
    }, 1000);
  }

  async render() {
    this.renderHTML();
    const artGameCont = document.querySelector('.game__container');
    const progressGame = document.querySelector('.progress__game');
    const value = (this.progressValue + 1) * this.commonCountRound;
    progressGame.style.background = `linear-gradient(to right, #FFBCA2 0%, #FFBCA2 ${value}%, #fff ${value}%, #fff 100%)`;

    const timeRound = document.querySelector('.game__time');
    this.setTimer(this.timeline, timeRound);

    await this.renderQuestion(artGameCont);
  }
}

export default ArtGame;
