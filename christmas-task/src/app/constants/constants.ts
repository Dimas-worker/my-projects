import {toyData} from '../utils/utils';

interface ListData {
  text: string,
  hrefLink: string,
  iconLink: string
}

interface FilterData {
  class: string,
  ruName: string,
  status: boolean
}

interface ActiveFilters {
  filterName: keyof toyData,
  filters: Array<string | boolean>
}

interface ActiveRange {
  rangeName: keyof toyData,
  min: string,
  max: string
}

const LIST_OF_PAGES: ListData[] = [
  { text: '', hrefLink: './', iconLink: 'logo' },
  { text: 'игрушки', hrefLink: './#/toys', iconLink: '' },
  { text: 'елка', hrefLink: './#/tree', iconLink: '' }
];

const All_SHAPE: FilterData[] = [
  { class: 'ball', ruName: 'шар', status: false },
  { class: 'bell', ruName: 'колокольчик', status: false },
  { class: 'cone', ruName: 'шишка', status: false },
  { class: 'snowflake', ruName: 'снежинка', status: false },
  { class: 'toy', ruName: 'фигурка', status: false }
];

const All_COLOR: FilterData[] = [
  { class: 'btn-white', ruName: 'белый', status: false },
  { class: 'btn-yellow', ruName: 'желтый', status: false },
  { class: 'btn-red', ruName: 'красный', status: false },
  { class: 'btn-blue', ruName: 'синий', status: false },
  { class: 'btn-green', ruName: 'зелёный', status: false }
];

const All_SIZE: FilterData[] = [
  { class: 'big', ruName: 'большой', status: false },
  { class: 'medium', ruName: 'средний', status: false },
  { class: 'small', ruName: 'малый', status: false },
];

const ALL_FAVORITE: FilterData[] = [
  { class: 'favorite', ruName: '', status: false },
]

const ACTIVE_FILTERS: ActiveFilters[] = [
  { filterName: 'shape', filters: [] },
  { filterName: 'color', filters: [] },
  { filterName: 'size', filters: [] },
  { filterName: 'favorite', filters: [] }
]

interface RangeType {
  name:string,
  step: number,
  min: number,
  max: number
}

const ALL_RANGES: RangeType[] = [
  {name: 'count', step: 1, min: 1, max: 12},
  {name: 'year', step: 10, min: 1940, max: 2020},
]

const ACTIVE_RANGES: ActiveRange[] = [
  {rangeName: 'count', min: '1', max: '12'},
  {rangeName: 'year', min: '1940', max: '2020'}
]
const FILTERS_NAME: string[] = ['shape', 'color', 'size'];

const selectMenu: string[] = [
  'По названию от «А» до «Я»',
  'По названию от «Я» до «А»',
  'По количеству по возрастанию',
  'По количеству по убыванию'
];

const CHOSEN_TOYS_AMOUNT: number = 20;

export { LIST_OF_PAGES, All_SHAPE, ListData, FilterData, All_COLOR, All_SIZE, ACTIVE_FILTERS, ALL_FAVORITE, ActiveFilters, FILTERS_NAME, ACTIVE_RANGES, ActiveRange, ALL_RANGES, RangeType, selectMenu, CHOSEN_TOYS_AMOUNT };
