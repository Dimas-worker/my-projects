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

export { CarData, StartData, StatusEngineData };
