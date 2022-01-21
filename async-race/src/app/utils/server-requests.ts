import { CarData, StartData } from '../interfaces/interfaces';

async function getGarageData(): Promise<CarData[]> {
  const promise: Response = await fetch('http://127.0.0.1:3000/garage');
  const data: CarData[] = await promise.json();
  return data;
}

async function getCurrentGarageData(page: string): Promise<CarData[]> {
  const promise: Response = await fetch(`http://127.0.0.1:3000/garage?_page=${page}&_limit=7`);
  const data: CarData[] = await promise.json();
  return data;
}

async function getEngineParameters(id: number, status: string): Promise<StartData> {
  const promise = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=${status}`, { method: 'PATCH' });
  const data = (await promise.json()) as StartData;
  return data;
}

export { getGarageData, getEngineParameters, getCurrentGarageData };
