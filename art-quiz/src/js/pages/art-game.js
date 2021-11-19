import { randomImg , shuffle, playSound, animationPopup } from '../components/use-func';
import { PopupAnswer } from '../components/popup-answer';
import { PopupEndRound } from '../components/popup-end-round';
import { PopupExit } from '../components/popup-exist';

export class ArtGame {
  constructor() {
    this.container = document.body;
    this.progressValue = 0;
    this.timeline = localStorage.getItem('timerValue') ? localStorage.getItem('timerValue') : 20;
    this.countCorrectAnswer = 0;
    this.timerId;
    this.category;
    this.curObjOfCategory;
    this.rmNumber;
    this.rightObj;
    this.booleanCorrectAnswer = false;
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
    this.button = document.createElement('button');
    this.button.classList.add('close__btn_game');
    this.button.onclick = () => {
      console.log('ddd');
      const exit = new PopupExit();
      exit.render();
    }
  }

  renderHeader(val) {
    this.header.classList.add('art-game__header');
    this.header.innerHTML = `
      <input type="range" min="1" max="10" step="1" value="${val}" class="progress__game">
      <div class="game__time">${this.timeline}</div>`;
    this.header.prepend(this.button);
  }

  renderHTML() {
    let progress = this.progressValue + 1;
    this.renderHeader(progress);
    this.container.innerHTML ='';
    const tag = document.createElement('div');
    tag.classList.add('wrapper__game', 'wrapper__art-game');
    // tag.innerHTML += this.header;
    tag.innerHTML += this.main;
    tag.innerHTML += this.footer;
    tag.prepend(this.header);
    this.container.append(tag);
    animationPopup(tag);
    return this.container
  }
 
  async renderQuestion(path) {
    const res = await fetch('./json/images.json');
    const data = await res.json();

    this.category = localStorage.getItem('curCategory');
    this.curObjOfCategory = JSON.parse(localStorage.getItem(this.category));
    
    this.rmNumber = this.curObjOfCategory.question[this.progressValue].num;
    this.rightObj = data[this.rmNumber];

    const img = document.createElement('img');
    img.alt = this.rmNumber;
    img.className = 'art__img';
    img.src = `./assets/img/all-img/${this.rmNumber}.jpg`;
    
    const btnContainer = document.createElement('div');
    btnContainer.classList.add('img__info');
    let arrAuthor = [];
    arrAuthor.push(this.rightObj.author);
    for (let i = 0; i < 3; i++) {
      let count = randomImg();
      if (!arrAuthor.includes(data[count].author)) {
        arrAuthor.push(data[count].author)
      } else {
        i--;
      }
    }
    // mixin arrAuthor
    shuffle(arrAuthor);

    arrAuthor.forEach(el => {
      const button = document.createElement('button');
      button.classList.add('btn__choose');
      button.textContent = el;
      button.addEventListener('click', () => {
        clearTimeout(this.timerId)
        if (button.textContent === this.rightObj.author) {
          if (!this.curObjOfCategory.question[this.progressValue].stats) {
            this.curObjOfCategory.question[this.progressValue].stats = true;
            ++this.curObjOfCategory.correct;
          }
          
          if (!this.curObjOfCategory.visit) {
            this.curObjOfCategory.visit = true;
          }
          
          button.classList.toggle('btn_correct');
          this.booleanCorrectAnswer = true;
          ++this.countCorrectAnswer;
        }
        else {
          button.classList.toggle('btn_wrong');
          this.booleanCorrectAnswer = false;
        }
        setTimeout( () => {this.nextCard()}, 500);
      })
      btnContainer.append(button);
    })
    img.onload = () => {
      path.innerHTML = `<div class="game__question">Who is the author of this picture?</div>`;
      path.append(img);
      path.append(btnContainer);
    }
  };

  showEndPopup() {
    let endRound = new PopupEndRound(this.countCorrectAnswer);
    playSound(this.booleanCorrectAnswer, true);
    endRound.render();
    // ls---------------------------------------------------------------------------------------
    let str = JSON.stringify(this.curObjOfCategory)
    localStorage.setItem(this.category, str);
    // -------------------------------------------------------------------------------------------
    this.progressValue = 0;
    this.countCorrectAnswer = 0;
    clearTimeout(this.timerId);
  }

  nextCard() {
    const popupAnswer = new PopupAnswer(this.rmNumber, this.booleanCorrectAnswer, this.rightObj);
    popupAnswer.render();
    playSound(this.booleanCorrectAnswer);
    document.addEventListener('click', (e) => {
      if (e.target.className === 'btn__next') {
        console.log(this.progressValue);
        this.progressValue++;
        popupAnswer.remove();
        if (this.progressValue === 10) {
          this.showEndPopup()
        } else {
          this.render();
        }
      }
    }, {once: true} );
  };

  setTimer(time, tag) {
    let isTimer = JSON.parse(localStorage.getItem('timer'));
    if (!isTimer) return;
    clearTimeout(this.timerId)
    if (time === -1) {
      this.nextCard();
      this.booleanCorrectAnswer = false;
      return;
    }
    window.addEventListener('hashchange', () => {
      clearTimeout(this.timerId);
      this.progressValue = 0;
    })
    tag.textContent = time;
    this.timerId = setTimeout(() => {
      this.setTimer(--time, tag)}, 1000);
  };

  async render() {
    await this.renderHTML();
    const artGameCont = document.querySelector('.game__container');
    const progressGame = document.querySelector('.progress__game');
    let value = `${(this.progressValue + 1) * 10}`;
    progressGame.style.background = `linear-gradient(to right, #FFBCA2 0%, #FFBCA2 ${value}%, #fff ${value}%, #fff 100%)`;

    const timeRound = document.querySelector('.game__time');
    this.setTimer(this.timeline, timeRound);

    await this.renderQuestion(artGameCont);
  };
}
