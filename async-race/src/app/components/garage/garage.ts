import './garage.scss';
import BaseComponent from '../../shared/base-component';
import Form from '../form/form';
import Button from '../../shared/button';
import PageNumber from './page-number/page-number';
import Car from '../car/car';
import CarsNumber from './cars-numbers/cars-numbers';
import Popup from '../popup/popup';
import { createCarData, deleteCarData, getCurrentGarageData, deleteCarWinnerData } from '../../utils/server-requests';
import { CarData, GarageData, CarStats, WinnerData } from '../../interfaces/interfaces';
import { getRandomColor, getRandomCarName, getAllCars, setCarWinner } from '../../utils/utils';
import {
  DEFAULT_PAGE_NUMBER,
  CARS_LIMIT_GARAGE,
  RANDOM_CARS_AMOUNT,
  ButtonType,
  STATUS_SUCCESS,
} from '../../constants/constants';
import Winner from '../winners/winner';

class Garage extends BaseComponent {
  creatingCarForm: Form = new Form(ButtonType.created);

  updatingCarForm: Form = new Form(ButtonType.updated);

  controls: BaseComponent = new BaseComponent('div', ['controls']);

  raceAllBtn: Button = new Button(ButtonType.race);

  resetAllBtn: Button = new Button(ButtonType.reset);

  generatingCarsBtn: Button = new Button(ButtonType.generateCars);

  garageArea: BaseComponent = new BaseComponent('div', ['garage-area']);

  carsNumber: CarsNumber;

  pageNumber: PageNumber;

  prevGaragePageBtn: Button = new Button(ButtonType.prev);

  nextGaragePageBtn: Button = new Button(ButtonType.next);

  private currentGaragePage: number = DEFAULT_PAGE_NUMBER;

  private currentCars: Car[] = [];

  carsField: BaseComponent = new BaseComponent('div', ['cars-field']);

  manageGarageBtns: BaseComponent = new BaseComponent('div', ['garage-manage']);

  popup: Popup | null = null;

  winner: Winner;

  isStarted = true;

  constructor(winner: Winner) {
    super('div', ['garage']);
    this.winner = winner;
    this.resetAllBtn.button.disabled = true;
    this.resetAllBtn.button.classList.add('inactive-btn');
    this.controls.element.append(this.raceAllBtn.button, this.resetAllBtn.button, this.generatingCarsBtn.button);
    this.carsNumber = new CarsNumber(this.currentCars.length);
    this.updatingCarForm.switchActive();
    this.pageNumber = new PageNumber(this.currentGaragePage);
    this.prevGaragePageBtn.button.disabled = false;
    this.nextGaragePageBtn.button.disabled = false;

    this.getGarageCars();
    this.createCar();
    this.startRace();
    this.stopRace();
    this.deleteCar();
    this.createRandomCars();
    this.switchGaragePage();
    this.renderGaragePage();
    this.updateCarsWinner();
  }

  renderGaragePage(): void {
    this.manageGarageBtns.element.append(this.prevGaragePageBtn.button, this.nextGaragePageBtn.button);
    this.garageArea.element.append(
      this.carsNumber.element,
      this.pageNumber.element,
      this.carsField.element,
      this.manageGarageBtns.element
    );
    this.element.append(
      this.creatingCarForm.element,
      this.updatingCarForm.element,
      this.controls.element,
      this.garageArea.element
    );
  }

  async getGarageCars(): Promise<void> {
    const parkCars: GarageData = await getCurrentGarageData(this.currentGaragePage.toString());
    this.renderGarageCars(parkCars.allCars);
    this.carsNumber.updateValue(+parkCars.carsCount);
  }

  renderGarageCars(cars: CarData[]): void {
    this.carsField.element.innerHTML = '';
    this.currentCars.length = 0;
    cars.forEach((car: CarData): void => {
      const carItem: Car = new Car(car, this.updatingCarForm);
      this.currentCars.push(carItem);
      this.carsField.element.append(carItem.element);
    });
  }

  startRace(): void {
    this.raceAllBtn.button.addEventListener('click', async (): Promise<void> => {
      this.isStarted = true;
      this.popup = null;
      this.raceAllBtn.button.disabled = true;
      this.resetAllBtn.button.disabled = false;
      this.disableManageGarage();
      this.currentCars.forEach(async (car: Car): Promise<void> => {
        const time: string = await car.moveCar();
        const status: number = await car.getStatusEngine(car.element.id);
        if (status === STATUS_SUCCESS && this.isStarted) {
          if (!this.popup) {
            const carModel = car.carModel.element.textContent as string;
            this.popup = new Popup(carModel, time);
            this.element.append(this.popup.element);
            await setCarWinner(car.element.id, time);
            this.winner.createTableBody();
          }
        }
      });
    });
  }

  stopRace(): void {
    this.resetAllBtn.button.addEventListener('click', async (): Promise<void> => {
      this.raceAllBtn.button.disabled = false;
      this.resetAllBtn.button.disabled = true;
      this.isStarted = false;
      this.disableManageGarage();
      if (this.popup) {
        this.popup.remove();
      }
      await Promise.all(this.currentCars.map((car: Car): Promise<void> => car.stopCar()));
    });
  }

  createCar(): void {
    this.creatingCarForm.submit.addEventListener('click', async (e: Event): Promise<void> => {
      e.preventDefault();
      const carData: CarData = await createCarData({
        name: this.creatingCarForm.inputText.value,
        color: this.creatingCarForm.inputColor.value,
      });
      const car: Car = new Car(carData, this.updatingCarForm);
      this.currentCars.push(car);
      if (this.currentCars.length <= CARS_LIMIT_GARAGE) {
        this.carsField.element.append(car.element);
      }
      this.carsNumber.addCar();
      this.creatingCarForm.cleanInputs();
      await this.getGarageCars();
    });
  }

  deleteCar(): void {
    this.carsField.element.addEventListener('click', async (e: Event): Promise<void> => {
      const target = e.target as HTMLElement;
      if (target.textContent === 'remove') {
        await deleteCarData(target.id);
        await this.getGarageCars();
        await this.deleteCarWinner(target.id);
      }
      if (!this.currentCars.length) {
        this.pageNumber.updateValue(--this.currentGaragePage);
        await this.getGarageCars();
      }
    });
  }

  createRandomCars(): void {
    this.generatingCarsBtn.button.addEventListener('click', async (): Promise<void> => {
      const hundredCars: CarStats[] = [];
      for (let i = 0; i < RANDOM_CARS_AMOUNT; i++) {
        hundredCars.push({ name: getRandomCarName(), color: getRandomColor() });
      }
      const carsData: Promise<CarData>[] = hundredCars.map((car: CarStats) => createCarData(car));
      await Promise.all(carsData);
      this.getGarageCars();
    });
  }

  switchGaragePage(): void {
    this.manageGarageBtns.element.addEventListener('click', async (e: Event): Promise<void> => {
      const target = e.target as HTMLButtonElement;
      switch (target.textContent) {
        case 'next':
          if (this.currentGaragePage * CARS_LIMIT_GARAGE < this.carsNumber.getValue) {
            this.pageNumber.updateValue(++this.currentGaragePage);
          }
          break;
        case 'prev':
          if (this.currentGaragePage === DEFAULT_PAGE_NUMBER) return;
          this.pageNumber.updateValue(--this.currentGaragePage);
          getCurrentGarageData(this.currentGaragePage.toString());
          break;
        default:
          return;
      }
      const cars: GarageData = await getCurrentGarageData(this.currentGaragePage.toString());
      this.renderGarageCars(cars.allCars);
    });
  }

  async deleteCarWinner(id: string): Promise<void> {
    const winners: WinnerData[] = await getAllCars(id);
    if (winners.length) {
      await deleteCarWinnerData(id);
      await this.winner.createTableBody();
    }
  }

  updateCarsWinner(): void {
    this.updatingCarForm.submit.addEventListener('click', (): void => {
      this.winner.createTableBody();
    });
  }

  disableManageGarage(): void {
    this.prevGaragePageBtn.button.disabled = !this.prevGaragePageBtn.button.disabled;
    this.nextGaragePageBtn.button.disabled = !this.nextGaragePageBtn.button.disabled;
    this.resetAllBtn.button.classList.toggle('inactive-btn');
    this.raceAllBtn.button.classList.toggle('inactive-btn');
    this.manageGarageBtns.element.classList.toggle('inactive-btn');
  }
}

export default Garage;
