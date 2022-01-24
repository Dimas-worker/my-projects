import BaseComponent from '../../../shared/base-component';
import './cars-numbers.scss';

class CarsNumber extends BaseComponent {
  numbers: number;

  constructor(numbers: number) {
    super('h2', ['garage-title']);
    this.numbers = numbers;
    this.element.textContent = `Garage (${numbers})`;
  }

  updateValue(numbers: number): void {
    this.numbers = numbers;
    this.element.textContent = `Garage (${this.numbers})`;
  }

  addCar(): void {
    this.element.textContent = `Garage (${++this.numbers})`;
  }

  removeCar(): void {
    this.element.textContent = `Garage (${--this.numbers})`;
  }

  get getValue(): number {
    return this.numbers;
  }
}

export default CarsNumber;
