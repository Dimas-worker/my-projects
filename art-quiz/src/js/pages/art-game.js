import { randomImg , shuffle, playSound, animationPopup } from '../components/use-func';
import { PopupAnswer } from '../components/popup-answer';
import { PopupEndRound } from '../components/popup-end-round';

export class ArtGame {
  timerId;
  constructor() {
    this.container = document.body;
    this.progressValue = 1;
    this.timeline = 10; // get in setting
    this.rmNumber = randomImg();
    this.countsRightAnswer = 0;
    this.rightObj;
    this.booleanCorrectAnswer = false;
    this.header;
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
  }

  renderHeader(val) {
    this.header = `
    <div class="art-game__header">
        <a href="/#/" class="close__btn_game"></a>
        <input type="range" min="1" max="10" step="1" value="${val}" class="progress__game">
        <div class="game__time">${this.timeline}</div>
    </div>`;
  }

  renderHTML() {
    this.renderHeader(this.progressValue);
    this.container.innerHTML ='';
    const tag = document.createElement('div');
    tag.classList.add('wrapper__game', 'wrapper__art-game');
    tag.innerHTML += this.header;
    tag.innerHTML += this.main;
    tag.innerHTML += this.footer;
    this.container.append(tag);
    animationPopup(tag);
    return this.container
  }

  async renderQuestion(path) {
    const res = await fetch('./json/data.json');
    const data = await res.json();    
    const rmObj = data[this.rmNumber];
    this.rightObj = rmObj;
    const img = document.createElement('img');
    img.alt = this.rmNumber;
    img.className = 'art__img';
    img.src = `./assets/img/all-img/${this.rmNumber}.jpg`;
    
    const btnContainer = document.createElement('div');
    btnContainer.classList.add('img__info');
    let arrAuthor = [];
    arrAuthor.push(rmObj.author);
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
      button.classList.add('btn', 'btn__choose');
      button.textContent = el;
      button.addEventListener('click', () => {
        clearTimeout(this.timerId)
        if (button.textContent === this.rightObj.author) {
          ++this.countsRightAnswer;
          button.classList.toggle('btn_correct');
          this.booleanCorrectAnswer = true;
        } else {
          button.classList.toggle('btn_wrong');
          this.booleanCorrectAnswer = false;
        }
        setTimeout( () => {this.nextCard()}, 500);
        // this.nextCard();
      })
      btnContainer.append(button);
    })
  
    img.onload = () => {
      path.innerHTML = `<div class="game__question">Who is the author of this picture?</div>`;
      path.append(img);
      path.append(btnContainer);
    }
    if (this.progressValue === 11) {
      let endRound = new PopupEndRound(this.countsRightAnswer);
      playSound(this.booleanCorrectAnswer, true);
      endRound.render();
      // ls---------------------------------------------------------------------------------------
      let curCategory = localStorage.getItem('curCategory');
      localStorage.setItem(curCategory, this.countsRightAnswer);
      this.progressValue = 1;
      clearTimeout(this.timerId);
    }
  };

  nextCard() {
    const popupAnswer = new PopupAnswer(this.rmNumber, this.booleanCorrectAnswer, this.rightObj);
    popupAnswer.render();
    playSound(this.booleanCorrectAnswer);
    document.addEventListener('click', (e) => {
      if (e.target.className === 'btn__next') {
        popupAnswer.remove();
        this.render();
      }
    })
    ++this.progressValue;
  };

  setTimer(time, tag) {
    clearTimeout(this.timerId)
    if (time === -1) {
      this.nextCard();
      this.booleanCorrectAnswer = false;
      return;
    }
    window.addEventListener('hashchange', () => {
      clearTimeout(this.timerId)
    })
    tag.textContent = time;
    this.timerId = setTimeout(() => {
      this.setTimer(--time, tag)}, 1000);
  };

  async render() {
    await this.renderHTML();
    const artGameCont = document.querySelector('.game__container');
    const progressGame = document.querySelector('.progress__game');
    let value = `${this.progressValue * 10}`;
    progressGame.style.background = `linear-gradient(to right, #FFBCA2 0%, #FFBCA2 ${value}%, #fff ${value}%, #fff 100%)`;
    const timeRound = document.querySelector('.game__time');
    this.setTimer(this.timeline, timeRound);
    this.rmNumber = randomImg();
    await this.renderQuestion(artGameCont);
  };
}
