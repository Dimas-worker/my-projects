import './garage.scss';
import BaseComponent from '../../shared/base-component';
import Form from '../form/form';
import Button from '../../shared/button';
import { getGarageData } from '../../utils/server-requests';
import { CarData } from '../../interfaces/interfaces';
import Car from '../car/car';

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

  controls: BaseComponent;

  raceAll: Button;

  resetAll: Button;

  generateCars: Button;

  garageArea: BaseComponent;

  prevGaragePage: Button;

  nextGaragePage: Button;

  currentCars: Car[] = [];

  constructor() {
    super('div', ['garage']);

    this.controls = new BaseComponent('div', ['controls']);
    this.raceAll = new Button(ButtonType.race);
    this.resetAll = new Button(ButtonType.reset);
    this.generateCars = new Button(ButtonType.generateCars);
    this.controls.element.append(this.raceAll.button, this.resetAll.button, this.generateCars.button);

    this.garageArea = new BaseComponent('div', ['garage-area']);
    this.prevGaragePage = new Button(ButtonType.prev);
    this.nextGaragePage = new Button(ButtonType.next);

    this.getGarage();
    this.startRace();
    this.stopRace();

    this.element.append(
      this.createdForm.element,
      this.updatedForm.element,
      this.controls.element,
      this.garageArea.element
    );
  }

  async getGarage(): Promise<void> {
    const parkCars: CarData[] = await getGarageData();
    const currentPage = 1;
    const carsField = new BaseComponent('div', ['cars-field']);

    const pageNumber: BaseComponent = new BaseComponent('h3', ['garage-page'], `Page #${currentPage}`);
    const garageTitle: BaseComponent = new BaseComponent(
      'h2',
      ['garage-title'],
      `Garage (${parkCars.length.toString()})`
    );
    const manegeGarage: BaseComponent = new BaseComponent('div', ['garage-manege']);
    manegeGarage.element.append(this.prevGaragePage.button, this.nextGaragePage.button);

    parkCars.forEach((car: CarData): void => {
      const carItem: Car = new Car(car);
      this.currentCars.push(carItem);
      carsField.element.append(carItem.element);
    });

    this.garageArea.element.append(garageTitle.element, pageNumber.element, carsField.element, manegeGarage.element);
  }

  startRace(): void {
    this.raceAll.button.addEventListener('click', async (): Promise<void> => {
      let bestTime = '0';
      const carsTime: Promise<string>[] = this.currentCars.map((car: Car): Promise<string> => car.moveCar());
      const resultTimeCars: string[] = await Promise.all(carsTime);
      Promise.allSettled(this.currentCars.map((car: Car): Promise<void> => car.getStatusEngine(+car.element.id)))
        .then((): string => bestTime)
        .catch((err) => err);
      bestTime = resultTimeCars.reduce((acc, curTime) => (+acc < +curTime ? acc : curTime));
    });
  }

  stopRace(): void {
    this.resetAll.button.addEventListener('click', async (): Promise<void> => {
      await Promise.all(this.currentCars.map((car: Car): Promise<void> => car.stopCar()));
    });
  }
}

export default Garage;
