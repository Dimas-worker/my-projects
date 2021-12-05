import {
  randomImg, shuffle, playSound, animationPopup, getData,
} from '../components/use-func';
import PopupAnswer from '../components/popup-answer';
import PopupEndRound from '../components/popup-end-round';
import PopupExit from '../components/popup-exist';

class ArtGame {
  timeline;

  timerId;

  category;

  curObjOfCategory;

  rmNumber;

  rightObj;

  constructor() {
    this.container = document.body;
    this.progressValue = 0;
    this.countCorrectAnswer = 0;
    this.booleanCorrectAnswer = false;
    this.commonCountRound = 10;
    this.main = `
      <div class="art-game__main">
      <div class="game__container"></div>
      </div>`;
    this.footer = `
      <div class="footer">
      <div class="school__logo">
      <a href="https://rs.school/js/" target="_blank" class="rss"></a>
      </div>
      <div class="developer">
      <a href="https://github.com/Dimas-worker" target="_blank">dimas-worker</a>
      </div>
      <div class="create__year">2021</div>`;
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
      <input type="range" min="1" max="10" step="1" value="${val}" class="progress__game">
      <div class="game__time">${time}</div>`;
    this.header.prepend(this.buttonClose);
  }

  renderHTML() {
    this.timeline = localStorage.getItem('timerValue') ? localStorage.getItem('timerValue') : 20;
    const progress = this.progressValue + 1;
    this.renderHeader(progress, this.timeline);
    this.container.innerHTML = '';
    const tag = document.createElement('div');
    tag.classList.add('wrapper__game', 'wrapper__art-game');
    tag.innerHTML += this.main;
    tag.innerHTML += this.footer;
    tag.prepend(this.header);
    this.container.append(tag);
    animationPopup(tag);
    return this.container;
  }

  async renderQuestion(path) {
    const cirTag = path;
    const data = await getData();
    if (this.category !== localStorage.getItem('curCategory')) {
      this.category = localStorage.getItem('curCategory');
      this.curObjOfCategory = JSON.parse(localStorage.getItem('answer'))[this.category];
    }

    this.rmNumber = this.curObjOfCategory.question[this.progressValue].num;
    this.rightObj = data[this.rmNumber];

    const img = document.createElement('img');
    img.alt = this.rmNumber;
    img.className = 'art__img';
    img.src = `./assets/img/all-img/${this.rmNumber}.jpg`;

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('img__info');
    const arrAuthor = [];
    arrAuthor.push(this.rightObj.author);
    for (let i = 0; i < 3; i += 1) {
      const count = randomImg();
      if (!arrAuthor.includes(data[count].author)) {
        arrAuthor.push(data[count].author);
      } else {
        i -= 1;
      }
    }
    this.renderBtn(arrAuthor, btnContainer);

    img.onload = () => {
      cirTag.innerHTML = '<div class="game__question">Who is the author of this picture?</div>';
      cirTag.append(img);
      cirTag.append(btnContainer);
    };
  }

  renderBtn(arr, path) {
    const mixedAnswers = shuffle(arr);
    mixedAnswers.forEach(el => {
      const button = document.createElement('button');
      button.classList.add('btn__choose');
      button.textContent = el;
      button.addEventListener('click', () => {
        clearTimeout(this.timerId);
        if (button.textContent === this.rightObj.author) {
          if (!this.curObjOfCategory.question[this.progressValue].stats) {
            this.curObjOfCategory.question[this.progressValue].stats = true;
            this.curObjOfCategory.correct += 1;
          }

          if (!this.curObjOfCategory.visit) {
            this.curObjOfCategory.visit = true;
          }

          button.classList.toggle('btn_correct');
          this.booleanCorrectAnswer = true;
          this.countCorrectAnswer += 1;
        } else {
          if (this.curObjOfCategory.question[this.progressValue].stats) {
            this.curObjOfCategory.correct -= 1;
          }
          this.curObjOfCategory.question[this.progressValue].stats = false;
          button.classList.toggle('btn_wrong');
          this.booleanCorrectAnswer = false;
        }
        setTimeout(() => { this.nextCard(this.booleanCorrectAnswer); }, 500);
      }, { once: true });
      path.append(button);
    });
  }

  showEndPopup(obj) {
    const endRound = new PopupEndRound(this.countCorrectAnswer, 'category');
    playSound(this.booleanCorrectAnswer, true);
    endRound.render();
    // ls---------------------------------------------------------------------------------------
    const answer = JSON.parse(localStorage.getItem('answer'));
    answer[this.category] = obj;
    const str = JSON.stringify(answer);

    localStorage.setItem('answer', str);
    // -------------------------------------------------------------------------------------------
    this.progressValue = 0;
    this.countCorrectAnswer = 0;
    clearTimeout(this.timerId);
  }

  nextCard(bool) {
    const popupAnswer = new PopupAnswer(this.rmNumber, bool, this.rightObj);
    popupAnswer.render();
    playSound(bool);
    popupAnswer.buttonNext.addEventListener('click', (e) => {
      if (e.target.className === 'btn__next') {
        this.progressValue += 1;
        popupAnswer.remove();
        if (this.progressValue === this.commonCountRound) {
          this.showEndPopup(this.curObjOfCategory);
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
      this.booleanCorrectAnswer = false;
      this.nextCard(this.booleanCorrectAnswer);
      return;
    }
    window.addEventListener('hashchange', () => {
      clearTimeout(this.timerId);
      this.progressValue = 0;
    });
    curTag.textContent = curTime;
    this.timerId = setTimeout(() => {
      curTime -= 1;
      this.setTimer(curTime, curTag);
    }, 1000);
  }

  async render() {
    this.renderHTML();
    const artGameCont = document.querySelector('.game__container');
    const progressGame = document.querySelector('.progress__game');
    const value = (this.progressValue + 1) * 10;
    progressGame.style.background = `linear-gradient(to right, #FFBCA2 0%, #FFBCA2 ${value}%, #fff ${value}%, #fff 100%)`;

    const timeRound = document.querySelector('.game__time');
    this.setTimer(this.timeline, timeRound);

    await this.renderQuestion(artGameCont);
  }
}

export default ArtGame;
