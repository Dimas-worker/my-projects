import './garage.scss';
import BaseComponent from '../../shared/base-component';
import Form from '../form/form';
import Button from '../../shared/button';

const enum FormType {
  created = 'create',
  updated = 'update',
}

const enum ButtonType {
  race = 'race',
  reset = 'reset',
  generateCars = 'generate-cars',
}

class Garage extends BaseComponent {
  createdForm: Form;

  updatedForm: Form;

  controls: BaseComponent;

  raceAll: Button;

  resetAll: Button;

  generateCars: Button;

  carsField: BaseComponent;

  constructor() {
    super('div', ['garage']);
    this.createdForm = new Form(FormType.created);
    this.updatedForm = new Form(FormType.updated);

    this.controls = new BaseComponent('div', ['controls']);
    this.raceAll = new Button(ButtonType.race);
    this.resetAll = new Button(ButtonType.reset);
    this.generateCars = new Button(ButtonType.generateCars);
    this.controls.element.append(this.raceAll.button, this.resetAll.button, this.generateCars.button);

    this.carsField = new BaseComponent('div', ['cars-field']);

    this.element.append(this.createdForm.element, this.updatedForm.element, this.controls.element);
  }
}

export default Garage;
