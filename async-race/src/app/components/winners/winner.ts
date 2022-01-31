import BaseComponent from '../../shared/base-component';
import './winner.scss';
import { WinnersDate, WinnerData } from '../../interfaces/interfaces';
import { getWinnersData, sortWinner } from '../../utils/server-requests';
import { getCarModel, convertCarWinners } from '../../utils/utils';
import { WINNER_COLUMNS, ButtonType, CARS_LIMIT_WINNERS, DEFAULT_PAGE_NUMBER } from '../../constants/constants';
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
  currentWinnersPage: number = DEFAULT_PAGE_NUMBER;

  carsNumber: CarsNumber = new CarsNumber(DEFAULT_PAGE_NUMBER);

  pageNumber: PageNumber;

  table: BaseComponent = new BaseComponent('table', ['table']);

  thead: BaseComponent = new BaseComponent('thead', ['table-head']);

  tbody: BaseComponent = new BaseComponent('tbody', ['table-body']);

  prevWinnersBtn: Button = new Button(ButtonType.prev);

  nextWinnersBtn: Button = new Button(ButtonType.next);

  manageWinnersBtns: BaseComponent = new BaseComponent('div', ['winner-manage']);

  isWinMax = true;

  isTimeBest = true;

  constructor() {
    super('div', ['winner', 'invisible']);
    this.pageNumber = new PageNumber(this.currentWinnersPage);

    this.createTableHead();
    this.createTableBody();
    this.switchWinnerPage();
    this.manageWinnersBtns.element.append(this.prevWinnersBtn.button, this.nextWinnersBtn.button);
    this.element.append(
      this.carsNumber.element,
      this.pageNumber.element,
      this.table.element,
      this.manageWinnersBtns.element
    );
  }

  createTableHead(): void {
    WINNER_COLUMNS.forEach((text: string): void => {
      const cell: BaseComponent = new BaseComponent('th', ['th'], text);
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
    const arrow: HTMLElement = document.createElement('span');
    let isSwitch: boolean = isPrimary;
    tag.classList.add('active-column');
    tag.append(arrow);
    tag.addEventListener('click', async (): Promise<void> => {
      [...this.thead.element.children].forEach((column: Element): void => {
        if (column.children.length) {
          const cell = column.lastChild as HTMLElement;
          cell.classList.remove('arrow-icon');
        }
      });
      const order: OrderType = isSwitch ? OrderType.firstMax : OrderType.firstMin;
      isSwitch = !isSwitch;
      if (!arrow.classList.contains('arrow-icon')) {
        arrow.classList.add('arrow-icon');
      }
      const winnersData: WinnerData[] = await sortWinner(sort, order, this.currentWinnersPage);
      const winners: string[][] = await convertCarWinners(winnersData);
      arrow.classList.toggle('arrow-rotated');
      this.updateTableBody(winners);
    });
  }

  async updateTableBody(carsWinnerData: string[][]): Promise<void> {
    const prefix: string = this.currentWinnersPage === 1 ? '' : (this.currentWinnersPage - 1).toString();
    this.tbody.element.innerHTML = '';
    carsWinnerData.forEach((carWinner, i: number): void => {
      const row: BaseComponent = new BaseComponent('tr', ['tr']);
      const td: BaseComponent = new BaseComponent('td', ['td'], `${prefix}${i + 1}`);
      row.element.append(td.element);
      carWinner.forEach((data: string, index: number): void => {
        const cell: BaseComponent = new BaseComponent('td', ['td']);
        if (index) {
          cell.element.textContent = `${data}`;
        } else {
          cell.element.append(getCarModel(data));
        }
        row.element.append(cell.element);
      });
      this.tbody.element.append(row.element);
    });
    this.table.element.append(this.tbody.element);
  }

  async createTableBody(): Promise<void> {
    const carsWinner: WinnersDate = await getWinnersData(this.currentWinnersPage);
    const winners: string[][] = await convertCarWinners(carsWinner.allCars);
    this.carsNumber.updateValue(+carsWinner.carsCount);
    this.updateTableBody(winners);
  }

  switchWinnerPage(): void {
    this.manageWinnersBtns.element.addEventListener('click', async (e: Event): Promise<void> => {
      const target = e.target as HTMLButtonElement;
      switch (target.textContent) {
        case 'next':
          if (this.currentWinnersPage * CARS_LIMIT_WINNERS < this.carsNumber.getValue) {
            this.pageNumber.updateValue(++this.currentWinnersPage);
            this.createTableBody();
          }
          break;
        case 'prev':
          if (this.currentWinnersPage === DEFAULT_PAGE_NUMBER) return;
          this.pageNumber.updateValue(--this.currentWinnersPage);
          this.createTableBody();
          break;
        default:
      }
    });
  }
}

export default Winner;
