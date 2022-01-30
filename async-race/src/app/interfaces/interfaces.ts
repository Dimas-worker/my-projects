interface CarData {
  name: string;
  color: string;
  id: number;
}

interface CarParameters {
  velocity: number;
  distance: number;
}

interface EngineData {
  isSuccess: boolean;
}

interface CarStats {
  name: string;
  color: string;
}

interface GarageData {
  allCars: CarData[];
  carsCount: string;
}

interface CarWinnerData {
  wins: number;
  time: number;
}

interface WinnerData {
  id: number;
  wins: number;
  time: number;
}

interface WinnersDate {
  allCars: WinnerData[];
  carsCount: string;
}

export { CarData, CarParameters, EngineData, CarStats, GarageData, WinnerData, CarWinnerData, WinnersDate };
