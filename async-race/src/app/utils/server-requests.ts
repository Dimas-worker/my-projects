import {
  CarData,
  CarParameters,
  CarStats,
  GarageData,
  WinnerData,
  CarWinnerData,
  WinnersDate,
} from '../interfaces/interfaces';
import { BASE_URL } from '../constants/constants';

async function getCurrentGarageData(page: string): Promise<GarageData> {
  let carCount = '0';
  const promise: Response = await fetch(`${BASE_URL}garage?_page=${page}&_limit=7`);
  const data: CarData[] = await promise.json();
  if (promise.headers.get('X-Total-Count')) {
    carCount = promise.headers.get('X-Total-Count') as string;
  }
  return { allCars: data, carsCount: carCount };
}

async function getEngineParameters(id: number, status: string): Promise<CarParameters> {
  let data: CarParameters;
  try {
    const promise: Response = await fetch(`${BASE_URL}engine?id=${id}&status=${status}`, {
      method: 'PATCH',
    });
    data = await promise.json();
  } catch {
    data = { velocity: 0, distance: 500000 };
  }
  return data;
}

async function createCarData(car: CarStats): Promise<CarData> {
  const dataCar: Response = await fetch(`${BASE_URL}garage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
  const result: CarData = await dataCar.json();
  return result;
}

async function updateCarData(id: string, car: CarStats): Promise<void> {
  await fetch(`${BASE_URL}garage/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  })
    .then((res) => res.status)
    .catch((err) => err);
}

async function deleteCarData(id: string): Promise<void> {
  await fetch(`${BASE_URL}garage/${id}`, { method: 'DELETE' })
    .then((res) => res.status)
    .catch((err) => err);
}

async function getStatusDrive(id: string): Promise<Response> {
  const promise: Response = await fetch(`${BASE_URL}engine?id=${id}&status=drive`, { method: 'PATCH' });
  return promise;
}

async function getCarData(id: number): Promise<CarData> {
  const promise: Response = await fetch(`${BASE_URL}garage/${id}`);
  const data: CarData = await promise.json();
  return data;
}

async function getWinnersData(page: number): Promise<WinnersDate> {
  let carCount = '0';
  const promise: Response = await fetch(`${BASE_URL}winners?_page=${page}&_limit=10`);
  const data: WinnerData[] = await promise.json();
  if (promise.headers.get('X-Total-Count')) {
    carCount = promise.headers.get('X-Total-Count') as string;
  }
  return { allCars: data, carsCount: carCount };
}

async function getAllWinners(): Promise<WinnerData[]> {
  const promise: Response = await fetch(`${BASE_URL}winners?_limit=10`);
  const data: WinnerData[] = await promise.json();
  return data;
}

async function getCarWinnerData(id: string): Promise<WinnerData> {
  const promise: Response = await fetch(`${BASE_URL}winners/${id}`);
  const data: WinnerData = await promise.json();
  return data;
}

async function updateCarWinnerData(id: string, car: CarWinnerData): Promise<void> {
  await fetch(`${BASE_URL}winners/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  })
    .then((res) => res.status)
    .catch((err) => err);
}

async function createCarWinner(winner: WinnerData): Promise<void> {
  await fetch(`${BASE_URL}winners`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(winner),
  })
    .then((res) => res.status)
    .catch((err) => err);
}

async function deleteCarWinnerData(id: string): Promise<void> {
  await fetch(`${BASE_URL}winners/${id}`, { method: 'DELETE' })
    .then((res) => res.status)
    .catch((err) => err);
}

async function sortWinner(sort: string, order: string, page: number): Promise<WinnerData[]> {
  const promise: Response = await fetch(`${BASE_URL}winners?_page=${page}&_limit=10&_sort=${sort}&_order=${order}`);
  const data: WinnerData[] = await promise.json();
  return data;
}

export {
  getEngineParameters,
  getCurrentGarageData,
  getCarData,
  deleteCarData,
  createCarData,
  updateCarData,
  getStatusDrive,
  getWinnersData,
  getCarWinnerData,
  getAllWinners,
  updateCarWinnerData,
  createCarWinner,
  deleteCarWinnerData,
  sortWinner,
};
