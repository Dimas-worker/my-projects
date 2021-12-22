import { getData } from './utils/utils';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import MainHome from './components/main/main-home/main-home';
import MainToys from './components/main/main-toys/main-toys';

class App {
  private container: HTMLElement = document.body;

  private header: Header = new Header();

  private main: MainHome | MainToys = new MainHome();

  private footer: Footer = new Footer();

  constructor() {
    this.container.append(this.header.element, this.main.element, this.footer.element);
  }

  private renderNewPage(idPage: string): void {
    let page: MainHome | MainToys | null = null;

    this.main.element.innerHTML = '';

    if (idPage === '/toys') {
      page = new MainToys(this.header);
    } else {
      page = new MainHome();
    }
    this.main.element.append(page.element);
  }

  private enableRouteChange(): void {
    window.addEventListener('hashchange', (): void => {
      const hash: string = window.location.hash.slice(1);
      this.renderNewPage(hash);
    });
  }

  async run(): Promise<void> {
    await getData();
    const currentHash: string = window.location.hash.slice(1);
    this.renderNewPage(currentHash);
    this.enableRouteChange();
  }
}

export default App;
