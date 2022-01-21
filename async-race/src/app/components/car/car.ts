import './car.scss';
import BaseComponent from '../../shared/base-component';
import Button from '../../shared/button';
import { CarData, StartData } from '../../interfaces/interfaces';
import { setColorCar } from '../../utils/utils';
import CAR_START_POSITION from '../../constants/constants';
import { getEngineParameters } from '../../utils/server-requests';

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
  changeCar: BaseComponent;

  trackCar: BaseComponent;

  imageCar: BaseComponent;

  selectCar: Button;

  removeCar: Button;

  startEngine: Button;

  stopEngine: Button;

  isAnimated = true;

  isEngineStop = false;

  constructor(car: CarData) {
    super('div', ['car']);
    this.element.setAttribute('id', car.id.toString());
    this.changeCar = new BaseComponent('div', ['shift-car']);
    this.selectCar = new Button(ChangeButtons.select);
    this.removeCar = new Button(ChangeButtons.remove);
    this.addChangeBlock(car.name);

    this.trackCar = new BaseComponent('div', ['track-car']);
    this.imageCar = new BaseComponent('div', ['img-car']);

    this.startEngine = new Button(ChangeButtons.start);
    this.stopEngine = new Button(ChangeButtons.stop);
    this.addTrackBlock(car);

    this.statusCat();
    this.element.append(this.changeCar.element, this.trackCar.element);
  }

  addChangeBlock(model: string): void {
    const modelCar: BaseComponent = new BaseComponent('p', ['name-car'], model);
    this.changeCar.element.append(this.selectCar.button, this.removeCar.button, modelCar.element);
  }

  addTrackBlock(car: CarData): void {
    const controlsCar: BaseComponent = new BaseComponent('div', ['controls-car']);
    controlsCar.element.append(this.startEngine.button, this.stopEngine.button);
    this.imageCar.element.innerHTML = setColorCar(car.color);
    const flag: HTMLImageElement = document.createElement('img');
    flag.classList.add('img-flag');
    flag.src = './assets/flag.svg';
    flag.alt = 'flag';
    this.trackCar.element.append(controlsCar.element, this.imageCar.element, flag);
  }

  async moveCar(): Promise<string> {
    this.startEngine.button.disabled = true;
    const engineParameters: StartData = await getEngineParameters(+this.element.id, StatusEngine.start);
    this.isEngineStop = false;
    this.isAnimated = true;
    const timeRace = engineParameters.distance / engineParameters.velocity;
    this.animationCar(timeRace);
    return (timeRace / 1000).toFixed(2);
  }

  async stopCar(): Promise<void> {
    this.startEngine.button.disabled = false;
    await getEngineParameters(+this.element.id, StatusEngine.stop);
    this.isAnimated = false;
    this.isEngineStop = true;
    this.imageCar.element.style.transform = `translateX(0px)`;
  }

  statusCat() {
    this.startEngine.button.addEventListener('click', async (): Promise<void> => {
      await this.moveCar();
      this.getStatusEngine(+this.element.id);
    });
    this.stopEngine.button.addEventListener('click', async (): Promise<void> => {
      await this.stopCar();
    });
  }

  animationCar(timeRace: number): void {
    const distance: number = this.trackCar.element.offsetWidth - this.imageCar.element.offsetWidth - CAR_START_POSITION;
    const prevTimeElapsed: number = performance.now();
    let traveledWay = 0;
    let passedTime = 0;
    const step = (time: number): void => {
      passedTime = time - prevTimeElapsed;
      traveledWay = (distance / timeRace) * passedTime;
      if (this.isEngineStop) {
        traveledWay = 0;
      }
      this.imageCar.element.style.transform = `translateX(${traveledWay}px)`;
      if (passedTime < timeRace && this.isAnimated) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  async getStatusEngine(id: number): Promise<void> {
    return fetch(`http://127.0.0.1:3000/engine?id=${id}&status=drive`, { method: 'PATCH' })
      .then((res) => {
        if (res.status === 500) this.isAnimated = false;
        return res.json();
      })
      .then((data) => data.success)
      .catch((err) => err);
  }
}

export default Car;
