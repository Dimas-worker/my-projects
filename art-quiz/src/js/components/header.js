// const activeLink = {
//   Home: '',
//   Categories: '',
//   Score: ''
// }

class Header {
  constructor(page, isPicturesGame = false) {
    this.page = page;
    this.isPicturesGame = isPicturesGame;
    this.activeLink = {
      Home: '',
      Categories: '',
      Score: ''
    }
    this.container = this.getPage();
    return this.container;
  }

  getPage() {
    this.activeLink[this.page] = 'active-link';
    const preLink = this.isPicturesGame ? 'pic-' : '';
    const header = document.createElement('div');
    header.classList.add('categories__header');
    header.innerHTML = `
      <div class="logo">
      <span class="logo_color"></span>
      </div>
      <nav class="nav">
      <ul class="nav__list">
      <li class="nav__link ${this.activeLink.Home}">
      <a href="./#/">Home</a>
      </li>
      <li class="nav__link ${this.activeLink.Categories}">
      <a href="./#/${preLink}category">Categories</a>
      </li>
      <li class="nav__link ${this.activeLink.Score}">
      <a href="./#/${preLink}score">Score</a>
      </li>
      </ul>
      </nav>
      <div class="setting_icon">
      <a href="./#/setting" class="set__btn"></a>
      </div>`;
    return header;
  }
}

export default Header;