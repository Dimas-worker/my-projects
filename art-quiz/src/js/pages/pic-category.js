import { Category } from "./category";

export class PicCategory extends Category {
  constructor() {
    super()
    this.header.innerHTML = `
        <div class="logo"><span class="logo_color"></span></div>
        <nav class="nav">
          <ul class="nav__list">
            <li class="nav__link"><a href="/#/">Home</a></li>
            <li class="nav__link active-link"><a href="/#/pic-category">Categories</a></li>
            <li class="nav__link"><a href="/#/pic-score">Score</a></li>
          </ul>
        </nav>
        <div class="setting_icon"><a href="/#/setting" class="set__btn"></a></div>`;
    this.navMenu.innerHTML = `
      <ul class="nav__bottom__list">
        <li class="bottom__link">
          <a href="/#/">
            <span class="nav_icon home"></span>
            <span class="nav_heading">Home</span>
          </a>
        </li>
        <li class="bottom__link active__bottom-link">
          <a href="/#/pic-category">
            <span class="nav_icon category"></span>
            <span class="nav_heading">Categories</span>
          </a>
        </li>
        <li class="bottom__link">
          <a href="/#/pic-score">
            <span class="nav_icon score"></span>
            <span class="nav_heading">Score</span>
          </a>
        </li>
      </ul>`;
  }
  creatCard(index) {
    // check LS if use category and how questions is answered 'progress card counts-------------------------
    let curCardObj = JSON.parse(localStorage.getItem('answer'))[index];
    this.count = curCardObj.correct;

    const divCard = document.createElement('a');
    divCard.classList.add('category__card');
    divCard.href = '/#/pic-game';
    divCard.innerHTML = `
    <div class="heading__card">
      <h4>${this.categories[index - 12]}</h4>
      <div class="progress__card">${this.count}/10</div>
    </div>`;
    if (this.count) {
      divCard.firstElementChild.classList.add('heading__card_active');
    }
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card__img');
    const img = document.createElement('img');
    img.src = `./assets/img/categories/${index}.jpg`;
    img.alt = `${index}`;
    if (!curCardObj.visit) {
      img.classList.add('card_inactive');
    }
    cardDiv.append(img);
    divCard.append(cardDiv);
    divCard.addEventListener('click', ()=> {
      localStorage.setItem('curCategory', index);
    })
    return divCard;
  }

  renderCard() {
    this.lists.innerHTML = '';
    this.categories.forEach((el, index) => {
      let i = 12 + index;
      const card = this.creatCard(i);
      this.lists.append(card);
    })
  }
}