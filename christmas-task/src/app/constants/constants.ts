import { ListData, FilterData, ActiveFilters, ActiveRange, RangeType } from './interfaces';

const LIST_OF_PAGES: ListData[] = [
  { text: '', hrefLink: './', iconLink: 'logo' },
  { text: 'игрушки', hrefLink: './#/toys', iconLink: '' },
  { text: 'елка', hrefLink: './#/tree', iconLink: '' },
];

const All_SHAPES: FilterData[] = [
  { class: 'ball', ruName: 'шар', status: false },
  { class: 'bell', ruName: 'колокольчик', status: false },
  { class: 'cone', ruName: 'шишка', status: false },
  { class: 'snowflake', ruName: 'снежинка', status: false },
  { class: 'toy', ruName: 'фигурка', status: false },
];

const All_COLORS: FilterData[] = [
  { class: 'btn__white', ruName: 'белый', status: false },
  { class: 'btn__yellow', ruName: 'желтый', status: false },
  { class: 'btn__red', ruName: 'красный', status: false },
  { class: 'btn__blue', ruName: 'синий', status: false },
  { class: 'btn__green', ruName: 'зелёный', status: false },
];

const All_SIZES: FilterData[] = [
  { class: 'big', ruName: 'большой', status: false },
  { class: 'medium', ruName: 'средний', status: false },
  { class: 'small', ruName: 'малый', status: false },
];

const ALL_FAVORITES: FilterData[] = [{ class: 'favorite', ruName: '', status: false }];

const ACTIVE_FILTERS: ActiveFilters[] = [
  { filterName: 'shape', filters: [] },
  { filterName: 'color', filters: [] },
  { filterName: 'size', filters: [] },
  { filterName: 'favorite', filters: [] },
];

const ALL_RANGES: RangeType[] = [
  { name: 'count', step: 1, min: 1, max: 12 },
  { name: 'year', step: 10, min: 1940, max: 2020 },
];

const ACTIVE_RANGES: ActiveRange[] = [
  { rangeName: 'count', min: '1', max: '12' },
  { rangeName: 'year', min: '1940', max: '2020' },
];

const FILTERS_NAMES: string[] = ['shape', 'color', 'size'];

const SORTING_OPTIONS: string[] = [
  'По названию от «А» до «Я»',
  'По названию от «Я» до «А»',
  'По количеству по возрастанию',
  'По количеству по убыванию',
];

const CHOSEN_TOYS_MAX_AMOUNT = 20;

const BG_MENU_AMOUNT = 10;

const TREE_MENU_AMOUNT = 6;

const GARLAND_DATA: Array<number[]> = [
  [5, 15],
  [11, 30],
  [15, 45],
  [21, 60],
  [25, 75],
];

const GARLAND_COLORS: string[] = ['all', 'blue', 'green', 'yellow', 'red'];

const SNOW_FLAKE_SIZE = 10;

const DEFAULT_TREE_NUMBER = '1';

const DEFAULT_BG_NUMBER = '1';

const DISTANCE_BETWEEN_BULBS = 1.8;

export {
  LIST_OF_PAGES,
  All_SHAPES,
  All_COLORS,
  All_SIZES,
  ACTIVE_FILTERS,
  ALL_FAVORITES,
  FILTERS_NAMES,
  ACTIVE_RANGES,
  ALL_RANGES,
  SORTING_OPTIONS,
  CHOSEN_TOYS_MAX_AMOUNT,
  BG_MENU_AMOUNT,
  TREE_MENU_AMOUNT,
  GARLAND_DATA,
  GARLAND_COLORS,
  SNOW_FLAKE_SIZE,
  DEFAULT_TREE_NUMBER,
  DEFAULT_BG_NUMBER,
  DISTANCE_BETWEEN_BULBS,
};
