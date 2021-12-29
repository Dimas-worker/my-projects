import './footer.scss';
import BaseComponent from '../../utils/base-component';

class Footer extends BaseComponent {
  wrapper: BaseComponent;
  date: BaseComponent;
  github: BaseComponent;
  rssLink: BaseComponent;

  constructor() {
    super('div', ['footer']);
    this.wrapper = new BaseComponent('div', ['wrapper']);
    this.date = new BaseComponent('div', ['date'], '2021');
    this.github = new BaseComponent('a', ['footer__github'], 'dimas-worker');
    this.github.element.setAttribute('href', 'https://github.com/Dimas-worker/');
    this.github.element.setAttribute('target', '_blank');
    this.rssLink = new BaseComponent('a', ['footer__rss-link']);
    this.rssLink.element.setAttribute('href', 'https://rs.school/js/');
    this.rssLink.element.setAttribute('target', '_blank');
    this.wrapper.element.append(this.github.element, this.date.element, this.rssLink.element);
    this.element.append(this.wrapper.element);
  }
}

export default Footer;
