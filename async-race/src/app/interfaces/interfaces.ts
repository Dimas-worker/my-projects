interface CarData {
  name: string;
  color: string;
  id: number;
}

interface StartData {
  velocity: number;
  distance: number;
}

interface StatusEngineData {
  success: boolean;
}

interface CarStats {
  name: string;
  color: string;
}

interface GarageData {
  allCars: CarData[];
  carsCount: string;
}

export { CarData, StartData, StatusEngineData, CarStats, GarageData };
