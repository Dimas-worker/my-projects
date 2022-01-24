import Header from './components/header/header';
import Garage from './components/garage/garage';
import Winner from './components/winners/winner';
import BaseComponent from './shared/base-component';

class App {
  private container: HTMLElement = document.body;

  private header: Header;

  private main: BaseComponent;

  private garage: Garage;

  private winner: Winner;

  constructor() {
    this.winner = new Winner();
    this.garage = new Garage(this.winner);
    this.header = new Header(this.garage.element, this.winner.element);
    this.main = new BaseComponent('div', ['main']);
    this.main.element.append(this.garage.element, this.winner.element);
  }

  run(): void {
    this.container.append(this.header.element, this.main.element);
  }
}

export default App;
