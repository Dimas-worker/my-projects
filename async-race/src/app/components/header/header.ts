import './header.scss';
import BaseComponent from '../../shared/base-component';

class Header extends BaseComponent {
  btnGarage: BaseComponent;

  btnWinner: BaseComponent;

  garage: HTMLElement;

  winner: HTMLElement;

  constructor(garage: HTMLElement, winner: HTMLElement) {
    super('div', ['header']);
    this.garage = garage;
    this.winner = winner;
    this.btnGarage = new BaseComponent('button', ['btn'], 'To garage');
    this.btnWinner = new BaseComponent('button', ['btn'], 'To winner');
    this.element.append(this.btnGarage.element, this.btnWinner.element);

    this.switchPage();
  }

  switchPage(): void {
    this.element.childNodes.forEach((element: Node): void => {
      element.addEventListener('click', (e: Event): void => {
        const target = e.target as HTMLElement;
        if (target.textContent === 'To garage') {
          if (this.winner.classList.contains('invisible')) return;
          this.removeCLassVisible();
          this.winner.classList.add('invisible');
        } else {
          if (this.garage.classList.contains('invisible')) return;
          this.removeCLassVisible();
          this.garage.classList.add('invisible');
        }
      });
    });
  }

  removeCLassVisible(): void {
    [this.garage, this.winner].forEach((page: HTMLElement): void => {
      page.classList.remove('invisible');
    });
  }
}

export default Header;
