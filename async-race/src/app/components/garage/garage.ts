import './garage.scss';
import BaseComponent from '../../shared/base-component';
import Form from '../form/form';
import Button from '../../shared/button';
import PageNumber from './page-number/page-number';
import Car from '../car/car';
import CarsNumber from './cars-numbers/cars-numbers';
import Popup from '../popup/popup';
import { createCarData, deleteCarData, getCurrentGarageData } from '../../utils/server-requests';
import { CarData, GarageData, CarStats } from '../../interfaces/interfaces';
import { getRandColor, getRandomCarName } from '../../utils/utils';
import { CARS_LIMIT, RANDOM_CARS_AMOUNT } from '../../constants/constants';

const enum ButtonType {
  created = 'create',
  updated = 'update',
  race = 'race',
  reset = 'reset',
  generateCars = 'generate-cars',
  prev = 'prev',
  next = 'next',
}

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

  private currentGaragePage = 1;

  private currentCars: Car[] = [];

  carsField: BaseComponent = new BaseComponent('div', ['cars-field']);

  manegeGarage: BaseComponent = new BaseComponent('div', ['garage-manege']);

  constructor() {
    super('div', ['garage']);
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
      this.raceAll.button.disabled = true;
      const carsTime: Promise<string>[] = this.currentCars.map((car: Car): Promise<string> => car.moveCar());
      const resultTimeCars: string[] = await Promise.all(carsTime);

      // bestTime = resultTimeCars.reduce((acc, curTime) => (+acc < +curTime ? acc : curTime));

      Promise.race(this.currentCars.map((car: Car): Promise<void> => car.getStatusEngine(car.element.id)))
        .then((res) => console.log(res))
        .catch((err) => err);
    });
  }

  stopRace(): void {
    this.resetAll.button.addEventListener('click', async (): Promise<void> => {
      this.raceAll.button.disabled = false;
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
      if (this.currentCars.length <= CARS_LIMIT) {
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
        hundredCars.push({ name: getRandomCarName(), color: getRandColor() });
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
        if (this.currentGaragePage * CARS_LIMIT < this.titleCarsNumbers.getValue) {
          this.pageNumber.updateValue(++this.currentGaragePage);
        }
      } else {
        if (this.currentGaragePage === 1) return;
        this.pageNumber.updateValue(--this.currentGaragePage);
        getCurrentGarageData(this.currentGaragePage.toString());
      }
      const cars: GarageData = await getCurrentGarageData(this.currentGaragePage.toString());
      this.renderGarageCars(cars.allCars);
    });
  }
}

export default Garage;
