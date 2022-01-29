const PAGE_DEFAULT = 1;

const CAR_START_POSITION = 63;

const CARS_LIMIT_GARAGE = 7;

const CARS_LIMIT_WINNERS = 10;

const RANDOM_CARS_AMOUNT = 100;

const BASE_URL = 'http://127.0.0.1:3000/';

const TABLE_HEADER: string[] = ['#', 'Car', 'Name', 'Wins', 'Best time (s)'];

const CARS_MODELS: string[] = [
  'Roadster',
  'S',
  'X',
  '3',
  'Y',
  'Cybertruck',
  'X5',
  'X7',
  'X3',
  'X6',
  'GT4',
  'FXX',
  '599 GTO',
  'Enzo',
  '458 Italia',
  '250 GTO',
  'Priora',
  '4x4',
  'Rio',
  'Focus',
  'Kalina',
  'Vesta',
  'Spark',
  'Lacetti',
  'Nexia',
  'Matiz',
  'Cobalt',
  'Captiva',
  'A7',
  'A5',
  'A3',
  'A8',
  'TT',
  'Corolla',
  'Camry',
  'RAV4',
  'Impreza',
  'WRX',
  'ES',
  'LS',
  'RX',
  'GX',
  'LX',
  'GS',
  'LC500',
  'Gallardo',
  'Aventador',
  '911',
  'Cayenne',
  'FX37',
];

const CARS_BRANDS: string[] = [
  'Audi',
  'Alfa Romeo',
  'Alpina',
  'Aston Martin',
  'Axon',
  'Ford',
  'Ferrari',
  'Fiat',
  'GAZ',
  'GMC',
  'Honda',
  'Hummer',
  'Hyundai',
  'Infiniti',
  'Isuzu',
  'JAC',
  'Jaguar',
  'Jeep',
  'Kamaz',
  'Lada',
  'Lexus',
  'Lotus',
  'MAN',
  'Maybach',
  'MAZ',
  'Mazda',
  'McLaren',
  'Nissan',
  'Opel',
  'Paccar',
  'Pagani',
  'Pontiac',
  'Porsche',
  'Renault',
  'Skoda',
  'Smart',
  'Subaru',
  'Suzuki',
  'Tesla',
  'Toyota',
  'UAZ',
  'Volvo',
  'ZAZ',
  'XPeng',
  'TVR',
  'Saab',
  'RAM',
  'Chevrolet',
  'Mazzanti',
  'Daewoo',
];

const enum ButtonType {
  created = 'create',
  updated = 'update',
  race = 'race',
  reset = 'reset',
  generateCars = 'generate-cars',
  prev = 'prev',
  next = 'next',
}

export {
  PAGE_DEFAULT,
  CAR_START_POSITION,
  CARS_MODELS,
  CARS_BRANDS,
  CARS_LIMIT_GARAGE,
  RANDOM_CARS_AMOUNT,
  BASE_URL,
  TABLE_HEADER,
  ButtonType,
  CARS_LIMIT_WINNERS,
};