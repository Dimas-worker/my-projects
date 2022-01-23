import { CarData, StartData, CarStats, GarageData } from '../interfaces/interfaces';

async function getCurrentGarageData(page: string): Promise<GarageData> {
  let carCount: string;
  const promise: Response = await fetch(`http://127.0.0.1:3000/garage?_page=${page}&_limit=7`);
  const data: CarData[] = await promise.json();
  if (promise.headers.get('X-Total-Count')) {
    carCount = promise.headers.get('X-Total-Count') as string;
  } else {
    carCount = '0';
  }
  return { allCars: data, carsCount: carCount };
}

async function getEngineParameters(id: number, status: string): Promise<StartData> {
  let data: StartData;
  try {
    const promise: Response = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=${status}`, {
      method: 'PATCH',
    });
    data = (await promise.json()) as StartData;
  } catch {
    data = { velocity: 0, distance: 500000 };
  }
  return data;
}

async function createCarData(car: CarStats): Promise<CarData> {
  const dataCar = await fetch(`http://127.0.0.1:3000/garage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
  const result: CarData = await dataCar.json();
  return result;
}

async function updateCarData(id: string, car: CarStats): Promise<void> {
  fetch(`http://127.0.0.1:3000/garage/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  })
    .then((res) => console.log(res.status))
    .catch((err) => err);
}

async function deleteCarData(id: string): Promise<void> {
  await fetch(`http://127.0.0.1:3000/garage/${id}`, { method: 'DELETE' })
    .then((res) => console.log(res.status))
    .catch((err) => err);
}

export { getEngineParameters, getCurrentGarageData, deleteCarData, createCarData, updateCarData };
