import './car.scss';
import BaseComponent from '../../shared/base-component';
import Button from '../../shared/button';
import { CarData, CarParameters } from '../../interfaces/interfaces';
import { getCarModel } from '../../utils/utils';
import { CAR_START_POSITION, SECOND_TRANSLATED, ROUNDER, STATUS_BREAKING } from '../../constants/constants';
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
  updatingCarForm: Form;

  carModel: BaseComponent;

  carField: BaseComponent = new BaseComponent('div', ['car-field']);

  carTrack: BaseComponent = new BaseComponent('div', ['track-car']);

  carImage: BaseComponent = new BaseComponent('div', ['img-car']);

  selectCarBtn: Button = new Button(ChangeButtons.select);

  removeCarBtn: Button = new Button(ChangeButtons.remove);

  startEngineBtn: Button = new Button(ChangeButtons.start);

  stopEngineBtn: Button = new Button(ChangeButtons.stop);

  isAnimated = true;

  isEngineStop = false;

  constructor(car: CarData, updatingCarForm: Form) {
    super('div', ['car']);
    this.updatingCarForm = updatingCarForm;
    this.element.setAttribute('id', car.id.toString());
    this.removeCarBtn.button.setAttribute('id', car.id.toString());
    this.carModel = new BaseComponent('p', ['name-car'], car.name);
    this.carField.element.append(this.selectCarBtn.button, this.removeCarBtn.button, this.carModel.element);
    this.stopEngineBtn.button.disabled = true;
    this.startEngineBtn.button.disabled = false;
    this.stopEngineBtn.button.classList.add('inactive-btn');
    this.renderCarTrack(car);
    this.switchEngineStatus();
    this.updateCar();
    this.deleteCar();

    this.element.append(this.carField.element, this.carTrack.element);
  }

  renderCarTrack(car: CarData): void {
    const controlsCar: BaseComponent = new BaseComponent('div', ['controls-car']);
    const flag: HTMLImageElement = document.createElement('img');
    controlsCar.element.append(this.startEngineBtn.button, this.stopEngineBtn.button);
    this.carImage.element.append(getCarModel(car.color));
    flag.classList.add('img-flag');
    flag.src = './assets/flag.svg';
    flag.alt = 'flag';
    this.carTrack.element.append(controlsCar.element, this.carImage.element, flag);
  }

  async moveCar(): Promise<string> {
    const engineParameters: CarParameters = await getEngineParameters(+this.element.id, StatusEngine.start);
    const timeRace: number = engineParameters.distance / engineParameters.velocity;
    this.switchActiveButton();
    this.isEngineStop = false;
    this.isAnimated = true;
    this.animateCarMoving(timeRace);
    return (timeRace / SECOND_TRANSLATED).toFixed(ROUNDER);
  }

  async stopCar(): Promise<void> {
    this.switchActiveButton();
    await getEngineParameters(+this.element.id, StatusEngine.stop);
    this.isAnimated = false;
    this.isEngineStop = true;
    this.carImage.element.style.transform = `translateX(0px)`;
  }

  switchEngineStatus(): void {
    this.startEngineBtn.button.addEventListener('click', async (): Promise<void> => {
      await this.moveCar();
      this.getStatusEngine(this.element.id);
    });
    this.stopEngineBtn.button.addEventListener('click', async (): Promise<void> => {
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
    if (promise.status === STATUS_BREAKING) {
      this.isAnimated = false;
    }
    return promise.status;
  }

  updateCar(): void {
    this.selectCarBtn.button.addEventListener('click', (): void => {
      this.updatingCarForm.switchActive();
      this.updatingCarForm.submit.addEventListener(
        'click',
        async (e: Event): Promise<void> => {
          e.preventDefault();
          this.carModel.updateTextContent(this.updatingCarForm.inputText.value);
          this.carImage.element.append(getCarModel(this.updatingCarForm.inputColor.value));
          await updateCarData(this.element.id, {
            name: this.updatingCarForm.inputText.value,
            color: this.updatingCarForm.inputColor.value,
          });
          this.updatingCarForm.cleanInputs();
          this.updatingCarForm.switchActive();
        },
        { once: true }
      );
    });
  }

  deleteCar(): void {
    this.removeCarBtn.button.addEventListener('click', (): void => {
      this.element.remove();
    });
  }

  switchActiveButton(): void {
    this.startEngineBtn.button.disabled = !this.startEngineBtn.button.disabled;
    this.startEngineBtn.button.classList.toggle('inactive-btn');
    this.stopEngineBtn.button.disabled = !this.stopEngineBtn.button.disabled;
    this.stopEngineBtn.button.classList.toggle('inactive-btn');
  }
}

export default Car;
