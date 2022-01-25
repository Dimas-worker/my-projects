import BaseComponent from '../../shared/base-component';
import './winner.scss';
import { WinnersDate, WinnerData } from '../../interfaces/interfaces';
import { getWinnersData, sortWinner } from '../../utils/server-requests';
import { setColorCar, convertCarWinners } from '../../utils/utils';
import { TABLE_HEADER, ButtonType, CARS_LIMIT_WINNERS, PAGE_DEFAULT } from '../../constants/constants';
import CarsNumber from '../garage/cars-numbers/cars-numbers';
import PageNumber from '../garage/page-number/page-number';
import Button from '../../shared/button';

const enum SortType {
  wins = 'wins',
  time = 'time',
}

const enum OrderType {
  firstMin = 'ASC',
  firstMax = 'DESC',
}

class Winner extends BaseComponent {
  currentPageWinner: number = PAGE_DEFAULT;

  titleCarsNumbers: CarsNumber = new CarsNumber(PAGE_DEFAULT);

  pageNumber: PageNumber;

  table: BaseComponent = new BaseComponent('table', ['table']);

  thead: BaseComponent = new BaseComponent('thead', ['table-head']);

  tbody: BaseComponent = new BaseComponent('tbody', ['table-body']);

  prevWinnerPage: Button = new Button(ButtonType.prev);

  nextWinnerPage: Button = new Button(ButtonType.next);

  manegeWinners: BaseComponent = new BaseComponent('div', ['winner-manege']);

  isWinMax = true;

  isTimeBest = true;

  constructor() {
    super('div', ['winner', 'invisible']);
    this.pageNumber = new PageNumber(this.currentPageWinner);

    this.createTableHead();
    this.createTableBody();
    this.switchWinnerPage();
    this.manegeWinners.element.append(this.prevWinnerPage.button, this.nextWinnerPage.button);
    this.element.append(
      this.titleCarsNumbers.element,
      this.pageNumber.element,
      this.table.element,
      this.manegeWinners.element
    );
  }

  createTableHead(): void {
    TABLE_HEADER.forEach((text: string) => {
      const cell = new BaseComponent('th', ['th'], text);
      if (text === 'Wins') {
        this.sortTable(cell.element, SortType.wins, this.isWinMax);
      } else if (text === 'Best time (s)') {
        this.sortTable(cell.element, SortType.time, this.isTimeBest);
      }
      this.thead.element.append(cell.element);
    });
    this.table.element.append(this.thead.element);
  }

  sortTable(tag: HTMLElement, sort: string, isPrimary: boolean): void {
    let isSwitch: boolean = isPrimary;
    tag.classList.add('active-column');
    const arrow: HTMLElement = document.createElement('span');
    tag.append(arrow);
    tag.addEventListener('click', async (): Promise<void> => {
      const order: OrderType = isSwitch ? OrderType.firstMax : OrderType.firstMin;
      isSwitch = !isSwitch;
      if (!arrow.classList.contains('arrow-icon')) {
        arrow.classList.add('arrow-icon');
      }
      arrow.classList.toggle('arrow-rotated');
      const winnersData: WinnerData[] = await sortWinner(sort, order, this.currentPageWinner);
      const winners = await convertCarWinners(winnersData);
      this.updateTableBody(winners);
    });
  }

  async updateTableBody(carsWinnerData: string[][]): Promise<void> {
    this.tbody.element.innerHTML = '';
    carsWinnerData.forEach((carWinner, i: number): void => {
      const row: BaseComponent = new BaseComponent('tr', ['tr']);
      const td: BaseComponent = new BaseComponent('td', ['td'], `${i + 1}`);
      row.element.append(td.element);
      carWinner.forEach((data: string, index: number): void => {
        const cell: BaseComponent = new BaseComponent('td', ['td']);
        if (!index) {
          cell.element.innerHTML = setColorCar(data);
        } else {
          cell.element.textContent = `${data}`;
        }
        row.element.append(cell.element);
      });
      this.tbody.element.append(row.element);
    });
    this.table.element.append(this.tbody.element);
  }

  async createTableBody(): Promise<void> {
    const carsWinner: WinnersDate = await getWinnersData(this.currentPageWinner);
    this.titleCarsNumbers.updateValue(+carsWinner.carsCount);
    const winners: string[][] = await convertCarWinners(carsWinner.allCars);
    this.updateTableBody(winners);
  }

  switchWinnerPage(): void {
    this.manegeWinners.element.addEventListener('click', async (e: Event): Promise<void> => {
      const target = e.target as HTMLButtonElement;
      if (target.textContent === 'next') {
        if (this.currentPageWinner * CARS_LIMIT_WINNERS < this.titleCarsNumbers.getValue) {
          this.pageNumber.updateValue(++this.currentPageWinner);
          this.createTableBody();
        }
      } else {
        if (this.currentPageWinner === PAGE_DEFAULT) return;
        this.pageNumber.updateValue(--this.currentPageWinner);
        this.createTableBody();
      }
    });
  }
}

export default Winner;
