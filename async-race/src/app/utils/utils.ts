import { CARS_MODELS, CARS_BRANDS } from '../constants/constants';
import { WinnerData, CarData } from '../interfaces/interfaces';
import { getCarData, getAllWinners, getCarWinnerData, updateCarWinnerData, createCarWinner } from './server-requests';

const enum ColorParameters {
  HexLength = 6,
  radix = 16,
}

function createInputElement(
  type: string,
  classSelector: string,
  value: string,
  placeHolder?: string
): HTMLInputElement {
  const input = document.createElement('input');
  input.type = type;
  input.classList.add(classSelector);
  input.value = value;
  if (placeHolder) {
    input.placeholder = placeHolder;
  }
  return input;
}


function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < ColorParameters.HexLength; i++) {
    color += letters[Math.floor(Math.random() * ColorParameters.radix)];
  }
  return color;
}

function getRandomCarName(): string {
  const model: string[] = CARS_MODELS;
  const brands: string[] = CARS_BRANDS;
  return `${brands[Math.ceil(Math.random() * (brands.length - 1))]} ${
    model[Math.ceil(Math.random() * (model.length - 1))]
  }`;
}

async function convertCarWinners(carsWinner: WinnerData[]): Promise<string[][]> {
  const carsWinnerData: Promise<string[]>[] = carsWinner.map(async (winner: WinnerData): Promise<string[]> => {
    const allCarsData: string[] = [];
    const car: CarData = await getCarData(winner.id);
    allCarsData.push(car.color, car.name, winner.wins.toString(), winner.time.toString());
    return allCarsData;
  });
  return Promise.all(carsWinnerData);
}

async function getAllCars(id: string): Promise<WinnerData[]> {
  const carsWinner: WinnerData[] = await getAllWinners();
  const winners: WinnerData[] = carsWinner.filter((winner: WinnerData) => winner.id === +id);
  return winners;
}

async function setCarWinner(id: string, time: string): Promise<void> {
  const winners: WinnerData[] = await getAllCars(id);
  if (winners.length) {
    const carWinner: WinnerData = await getCarWinnerData(id);
    ++carWinner.wins;
    carWinner.time = +time > carWinner.time ? carWinner.time : +time;
    await updateCarWinnerData(id, { wins: carWinner.wins, time: carWinner.time });
  } else {
    await createCarWinner({ id: +id, wins: 1, time: +time });
  }
}

function getCarModel(color: string): HTMLObjectElement  {
  const carModel: HTMLObjectElement = document.createElement('object');
  carModel.type = 'image/svg+xml';
  carModel.data = './assets/car.svg';
  carModel.classList.add('car-svg');
  carModel.addEventListener('load', ():void => {
    carModel.getSVGDocument()?.getElementById("car")?.setAttribute("fill", color);
  })
  return carModel;
}

export {
  createInputElement,
  getRandomColor,
  getRandomCarName,
  convertCarWinners,
  getAllCars,
  setCarWinner,
  getCarModel
};
