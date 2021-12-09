import Header from './header';

class NavMenu extends Header {
  constructor(page, isPicturesGame = false) {
    super(page, isPicturesGame)
  }

  getPage() {
    this.activeLink[this.page] = 'active__bottom-link';
    const preLink = this.isPicturesGame ? 'pic-' : '';
    const navMenu = document.createElement('div');
    navMenu.classList.add('nav__bottom');
    navMenu.innerHTML = `
      <ul class="nav__bottom__list">
      <li class="bottom__link ${this.activeLink.Home}">
      <a href="./#/">
      <span class="nav_icon home"></span>
      <span class="nav_heading">Home</span>
      </a>
      </li>
      <li class="bottom__link ${this.activeLink.Categories}">
      <a href="./#/${preLink}category">
      <span class="nav_icon category"></span>
      <span class="nav_heading">Categories</span>
      </a>
      </li>
      <li class="bottom__link ${this.activeLink.Score}">
      <a href="./#/${preLink}score">
      <span class="nav_icon score"></span>
      <span class="nav_heading">Score</span>
      </a>
      </li>
      </ul>`;
    return navMenu;
  }
}
export default NavMenu;