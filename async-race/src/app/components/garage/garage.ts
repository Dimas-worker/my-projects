import './garage.scss';
import BaseComponent from '../../shared/base-component';
import Form from '../form/form';
import Button from '../../shared/button';
import PageNumber from './page-number/page-number';
import Car from '../car/car';
import CarsNumber from './cars-numbers/cars-numbers';
import Popup from '../popup/popup';
import {
  createCarData,
  deleteCarData,
  getCurrentGarageData,
  getCarWinnerData,
  getAllWinners,
  updateCarWinnerData,
  createCarWinner,
  deleteCarWinnerData,
} from '../../utils/server-requests';
import { CarData, GarageData, CarStats, WinnerData } from '../../interfaces/interfaces';
import { getRandomColor, getRandomCarName } from '../../utils/utils';
import { PAGE_DEFAULT, CARS_LIMIT_GARAGE, RANDOM_CARS_AMOUNT, ButtonType } from '../../constants/constants';
import Winner from '../winners/winner';

class Garage extends BaseComponent {
  createdForm: Form = new Form(ButtonType.created);

  updatedForm: Form = new Form(ButtonType.updated);

  controls: BaseComponent = new BaseComponent('div', ['controls']);

  raceAll: Button = new Button(ButtonType.race);

  resetAll: Button = new Button(ButtonType.reset);

  generatedCars: Button = new Button(ButtonType.generateCars);

  garageArea: BaseComponent = new BaseComponent('div', ['garage-area']);

  titleCarsNumbers: CarsNumber;

  pageNumber: PageNumber;

  prevGaragePage: Button = new Button(ButtonType.prev);

  nextGaragePage: Button = new Button(ButtonType.next);

  private currentGaragePage = PAGE_DEFAULT;

  private currentCars: Car[] = [];

  carsField: BaseComponent = new BaseComponent('div', ['cars-field']);

  manegeGarage: BaseComponent = new BaseComponent('div', ['garage-manege']);

  popup: Popup | null = null;

  winner: Winner;

  constructor(winner: Winner) {
    super('div', ['garage']);
    this.winner = winner;
    this.controls.element.append(this.raceAll.button, this.resetAll.button, this.generatedCars.button);
    this.titleCarsNumbers = new CarsNumber(this.currentCars.length);
    this.updatedForm.switchActive();
    this.pageNumber = new PageNumber(this.currentGaragePage);

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

  renderGaragePage() {
    this.manegeGarage.element.append(this.prevGaragePage.button, this.nextGaragePage.button);
    this.garageArea.element.append(
      this.titleCarsNumbers.element,
      this.pageNumber.element,
      this.carsField.element,
      this.manegeGarage.element
    );
    this.element.append(
      this.createdForm.element,
      this.updatedForm.element,
      this.controls.element,
      this.garageArea.element
    );
  }

  async getGarageCars(): Promise<void> {
    const parkCars: GarageData = await getCurrentGarageData(this.currentGaragePage.toString());
    this.renderGarageCars(parkCars.allCars);
    this.titleCarsNumbers.updateValue(+parkCars.carsCount);
  }

  renderGarageCars(cars: CarData[]): void {
    this.carsField.element.innerHTML = '';
    this.currentCars.length = 0;
    cars.forEach((car: CarData): void => {
      const carItem: Car = new Car(car, this.updatedForm);
      this.currentCars.push(carItem);
      this.carsField.element.append(carItem.element);
    });
  }

  startRace(): void {
    this.raceAll.button.addEventListener('click', async (): Promise<void> => {
      this.popup = null;
      this.raceAll.button.disabled = true;
      this.currentCars.forEach(async (car: Car): Promise<void> => {
        const time: string = await car.moveCar();
        const status: number = await car.getStatusEngine(car.element.id);
        if (status === 200) {
          if (!this.popup) {
            const carModel = car.carModel.element.textContent as string;
            this.popup = new Popup(carModel, time);
            this.element.append(this.popup.element);

            await this.setCarWinner(car.element.id, time);
            this.winner.createTableBody();
          }
        }
      });
    });
  }

  stopRace(): void {
    this.resetAll.button.addEventListener('click', async (): Promise<void> => {
      this.raceAll.button.disabled = false;
      if (this.popup) {
        this.popup.remove();
      }
      await Promise.all(this.currentCars.map((car: Car): Promise<void> => car.stopCar()));
    });
  }

  createCar(): void {
    this.createdForm.submit.addEventListener('click', async (e: Event): Promise<void> => {
      e.preventDefault();
      const carData: CarData = await createCarData({
        name: this.createdForm.inputText.value,
        color: this.createdForm.inputColor.value,
      });
      const car: Car = new Car(carData, this.updatedForm);
      this.currentCars.push(car);
      if (this.currentCars.length <= CARS_LIMIT_GARAGE) {
        this.carsField.element.append(car.element);
      }
      this.titleCarsNumbers.addCar();
      this.createdForm.cleanInputs();
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
    this.generatedCars.button.addEventListener('click', async (): Promise<void> => {
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
    this.manegeGarage.element.addEventListener('click', async (e: Event): Promise<void> => {
      const target = e.target as HTMLButtonElement;
      if (target.textContent === 'next') {
        if (this.currentGaragePage * CARS_LIMIT_GARAGE < this.titleCarsNumbers.getValue) {
          this.pageNumber.updateValue(++this.currentGaragePage);
        }
      } else {
        if (this.currentGaragePage === PAGE_DEFAULT) return;
        this.pageNumber.updateValue(--this.currentGaragePage);
        getCurrentGarageData(this.currentGaragePage.toString());
      }
      const cars: GarageData = await getCurrentGarageData(this.currentGaragePage.toString());
      this.renderGarageCars(cars.allCars);
    });
  }

  async setCarWinner(id: string, time: string): Promise<void> {
    const winners: WinnerData[] = await this.getAllCars(id);
    if (winners.length) {
      const carWinner: WinnerData = await getCarWinnerData(id);
      ++carWinner.wins;
      carWinner.time = +time > carWinner.time ? carWinner.time : +time;
      await updateCarWinnerData(id, { wins: carWinner.wins, time: carWinner.time });
    } else {
      await createCarWinner({ id: +id, wins: 1, time: +time });
    }
  }

  async deleteCarWinner(id: string): Promise<void> {
    const winners: WinnerData[] = await this.getAllCars(id);
    if (winners.length) {
      await deleteCarWinnerData(id);
      await this.winner.createTableBody();
    }
  }

  async getAllCars(id: string): Promise<WinnerData[]> {
    const carsWinner: WinnerData[] = await getAllWinners();
    const winners: WinnerData[] = carsWinner.filter((winner: WinnerData) => winner.id === +id);
    return winners;
  }

  updateCarsWinner() {
    this.updatedForm.submit.addEventListener('click', (): void => {
      this.winner.createTableBody()
    })
  }
}

export default Garage;
