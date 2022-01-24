import './car.scss';
import BaseComponent from '../../shared/base-component';
import Button from '../../shared/button';
import { CarData, CarParameters } from '../../interfaces/interfaces';
import { setColorCar } from '../../utils/utils';
import { CAR_START_POSITION } from '../../constants/constants';
import { getEngineParameters, updateCarData, getStatusDrive } from '../../utils/server-requests';
import Form from '../form/form';

const enum ChangeButtons {
  select = 'select',
  remove = 'remove',
  start = 'start',
  stop = 'stop',
}

const enum StatusEngine {
  start = 'started',
  stop = 'stopped',
}

class Car extends BaseComponent {
  updatedForm: Form;

  carModel: BaseComponent;

  changeCar: BaseComponent = new BaseComponent('div', ['shift-car']);

  carTrack: BaseComponent = new BaseComponent('div', ['track-car']);

  carImage: BaseComponent = new BaseComponent('div', ['img-car']);

  selectCar: Button = new Button(ChangeButtons.select);

  removeCar: Button = new Button(ChangeButtons.remove);

  startEngine: Button = new Button(ChangeButtons.start);

  stopEngine: Button = new Button(ChangeButtons.stop);

  isAnimated = true;

  isEngineStop = false;

  constructor(car: CarData, updatedForm: Form) {
    super('div', ['car']);
    this.updatedForm = updatedForm;
    this.element.setAttribute('id', car.id.toString());
    this.removeCar.button.setAttribute('id', car.id.toString());
    this.carModel = new BaseComponent('p', ['name-car'], car.name);
    this.changeCar.element.append(this.selectCar.button, this.removeCar.button, this.carModel.element);

    this.renderCarTrack(car);
    this.engineStatus();
    this.updateCar();
    this.deleteCar();

    this.element.append(this.changeCar.element, this.carTrack.element);
  }

  renderCarTrack(car: CarData): void {
    const controlsCar: BaseComponent = new BaseComponent('div', ['controls-car']);
    controlsCar.element.append(this.startEngine.button, this.stopEngine.button);
    this.carImage.element.innerHTML = setColorCar(car.color);
    const flag: HTMLImageElement = document.createElement('img');
    flag.classList.add('img-flag');
    flag.src = './assets/flag.svg';
    flag.alt = 'flag';
    this.carTrack.element.append(controlsCar.element, this.carImage.element, flag);
  }

  async moveCar(): Promise<string> {
    this.startEngine.button.disabled = true;
    const engineParameters: CarParameters = await getEngineParameters(+this.element.id, StatusEngine.start);
    this.isEngineStop = false;
    this.isAnimated = true;
    const timeRace: number = engineParameters.distance / engineParameters.velocity;
    this.animateCarMoving(timeRace);
    return (timeRace / 1000).toFixed(2);
  }

  async stopCar(): Promise<void> {
    this.startEngine.button.disabled = false;
    await getEngineParameters(+this.element.id, StatusEngine.stop);
    this.isAnimated = false;
    this.isEngineStop = true;
    this.carImage.element.style.transform = `translateX(0px)`;
  }

  engineStatus(): void {
    this.startEngine.button.addEventListener('click', async (): Promise<void> => {
      await this.moveCar();
      this.getStatusEngine(this.element.id);
    });
    this.stopEngine.button.addEventListener('click', async (): Promise<void> => {
      await this.stopCar();
    });
  }

  animateCarMoving(timeRace: number): void {
    const distance: number = this.carTrack.element.offsetWidth - this.carImage.element.offsetWidth - CAR_START_POSITION;
    const prevTimeElapsed: number = performance.now();
    let traveledWay = 0;
    let passedTime = 0;
    const step = (time: number): void => {
      passedTime = time - prevTimeElapsed;
      traveledWay = (distance / timeRace) * passedTime;
      if (this.isEngineStop) {
        traveledWay = 0;
      }
      this.carImage.element.style.transform = `translateX(${traveledWay}px)`;
      if (passedTime < timeRace && this.isAnimated) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  async getStatusEngine(id: string): Promise<number> {
    const promise: Response = await getStatusDrive(id);
    if (promise.status === 500) {
      this.isAnimated = false;
    }
    return promise.status;
  }

  updateCar(): void {
    this.selectCar.button.addEventListener('click', (): void => {
      this.updatedForm.switchActive();
      this.updatedForm.submit.addEventListener(
        'click',
        async (e: Event): Promise<void> => {
          e.preventDefault();
          this.carModel.updateTextContent(this.updatedForm.inputText.value);
          this.carImage.element.innerHTML = setColorCar(this.updatedForm.inputColor.value);
          await updateCarData(this.element.id, {
            name: this.updatedForm.inputText.value,
            color: this.updatedForm.inputColor.value,
          });
          this.updatedForm.cleanInputs();
          this.updatedForm.switchActive();
        },
        { once: true }
      );
    });
  }

  deleteCar(): void {
    this.removeCar.button.addEventListener('click', (): void => {
      this.element.remove();
    });
  }
}

export default Car;
