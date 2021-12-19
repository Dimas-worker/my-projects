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

const FILTERS_NAME: string[] = ['shape', 'color', 'size'];

export { LIST_OF_PAGES, All_SHAPE, ListData, FilterData, All_COLOR, All_SIZE, ACTIVE_FILTERS, ALL_FAVORITE, ActiveFilters, FILTERS_NAME };
