export class Category {
    ARRAY_CATEGORIES = ['realism', 'impressionism', 'religion', 'portrait', 'renaissance', 'painting', 'landscape', 'marine', 'avant-garde', 'surrealism', 'romanticism', 'expressionism'];
    constructor() {
      this.count;
    };
  
    renderHTML() {
      let view = `
        <div class="wrapper categories__wrapper">
            <div class="categories__header">
                <div class="logo">
                    <span class="logo_color"></span>
                </div>
                <nav class="nav">
                    <ul class="nav__list">
                        <li class="nav__link">
                            <a href="/#/">Home</a>
                        </li>
                        <li class="nav__link active-link">
                            <a href="/#/category">Categories</a>
                        </li>
                        <li class="nav__link">
                            <a href="/#/score">Score</a>
                        </li>
                    </ul>
                </nav>
                <div class="setting_icon">
                    <a href="/#/setting" class="set__btn"></a>
                </div>
            </div>
            <div class="categories__main">
                <h3>Categories</h3>
                <div class="categories__list">
                    <div class="categories__list_inner"></div>
                </div>
            </div>
            <div class="nav__bottom">
                <ul class="nav__bottom__list">
                    <li class="bottom__link">
                        <a href="/#/">
                            <span class="nav_icon home"></span>
                            <span class="nav_heading">Home</span>
                        </a>
                    </li>
                    <li class="bottom__link active__bottom-link">
                        <a href="/#/category">
                            <span class="nav_icon category"></span>
                            <span class="nav_heading">Categories</span>
                        </a>
                    </li>
                    <li class="bottom__link">
                        <a href="/#/score">
                            <span class="nav_icon score"></span>
                            <span class="nav_heading">Score</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="footer">
              <div class="school__logo">
                  <a href="https://rs.school/js/" target="_blank" class="rss"></a>
              </div>
              <div class="developer">
                  <a href="https://github.com/Dimas-worker" target="_blank">dimas-worker</a>
              </div>
              <div class="create__year">2021</div>
          </div>
        </div>
      `;
      return document.body.innerHTML = view;
    }
    creatCard(index) {
      // check LS if use category and how questions is answered 'progress card counts-------------------------
      this.count = localStorage.getItem(this.ARRAY_CATEGORIES[index]) ? localStorage.getItem(this.ARRAY_CATEGORIES[index]) : 0;
      const divCard = document.createElement('a');
      divCard.classList.add('category__card');
      divCard.href = '/#/art-game';
      divCard.innerHTML = `
      <div class="heading__card">
        <h4>${this.ARRAY_CATEGORIES[index]}</h4>
        <div class="progress__card">${this.count}/10</div>
      </div>`;
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card__img');
      const img = document.createElement('img');
      img.src = `./assets/img/categories/${index}.png`;
      img.alt = `${index}`;
      console.log(localStorage.getItem(this.ARRAY_CATEGORIES[index]));
      if (!localStorage.getItem(this.ARRAY_CATEGORIES[index])) {
        img.classList.add('card_inactive');
      }
      cardDiv.append(img);
      divCard.append(cardDiv);
      divCard.addEventListener('click', ()=> {
          console.log(this.ARRAY_CATEGORIES[index]);
          localStorage.setItem('curCategory', this.ARRAY_CATEGORIES[index]);
      })
      return divCard;
    }

    async render() {
      await this.renderHTML();
      const cardsContainerInner = document.querySelector('.categories__list_inner');
      this.ARRAY_CATEGORIES.forEach((el, index) => {
        const card = this.creatCard(index);
        cardsContainerInner.append(card);
      })
    }
  
}
