import {
  ACTIVE_FILTERS,
  All_SHAPES,
  All_COLORS,
  All_SIZES,
  ALL_FAVORITES,
  ACTIVE_RANGES,
} from '../constants/constants';

import { ActiveFilters, FilterData, ActiveRange } from '../constants/interfaces';

function setDefaultActiveFilters(): void {
  const activeFiltersJSON: string = JSON.stringify(ACTIVE_FILTERS);
  const activeRangeJSON: string = JSON.stringify(ACTIVE_RANGES);

  if (!localStorage.getItem('activeFilters')) {
    localStorage.setItem('activeFilters', activeFiltersJSON);
  }
  if (!localStorage.getItem('activeRange')) {
    localStorage.setItem('activeRange', activeRangeJSON);
  }
}

function getActiveFiltersFromStorage(): ActiveFilters[] {
  const dataOfToys: string = localStorage.getItem('activeFilters') ?? '[]';
  const toys: ActiveFilters[] = JSON.parse(dataOfToys);
  return toys;
}

function setActiveFiltersInStorage(activeFilters: ActiveFilters[]): void {
  const activeFiltersJSON: string = JSON.stringify(activeFilters);
  localStorage.setItem('activeFilters', activeFiltersJSON);
}

function setFiltersConstants() {
  const shapeJSON: string = JSON.stringify(All_SHAPES);
  const colorJSON: string = JSON.stringify(All_COLORS);
  const sizeJSON: string = JSON.stringify(All_SIZES);
  const favoriteJSON: string = JSON.stringify(ALL_FAVORITES);

  if (!localStorage.getItem('shape')) {
    localStorage.setItem('shape', shapeJSON);
  }
  if (!localStorage.getItem('color')) {
    localStorage.setItem('color', colorJSON);
  }
  if (!localStorage.getItem('size')) {
    localStorage.setItem('size', sizeJSON);
  }
  if (!localStorage.getItem('favorite')) {
    localStorage.setItem('favorite', favoriteJSON);
  }
  if (!localStorage.getItem('sort')) {
    localStorage.setItem('sort', 'По названию от «А» до «Я»');
  }
  if (!localStorage.getItem('chosenToys')) {
    localStorage.setItem('chosenToys', '[]');
  }
}

function getFilterConstant(filterName: string): FilterData[] {
  const dataFilter: string = localStorage.getItem(filterName) ?? '[]';
  const filter: FilterData[] = JSON.parse(dataFilter);
  return filter;
}

function setFilterConstant(filterName: string, filtersData: FilterData[]): void {
  const filtersConstantJSON: string = JSON.stringify(filtersData);
  localStorage.setItem(filterName, filtersConstantJSON);
}

function getActiveRangeFromStorage(): ActiveRange[] {
  const activeRangesJSON: string = localStorage.getItem('activeRange') ?? '[]';
  const toys: ActiveRange[] = JSON.parse(activeRangesJSON);
  return toys;
}

function setActiveRangeInStorage<T>(activeRanges: T[]): void {
  const activeRangesJSON: string = JSON.stringify(activeRanges);
  localStorage.setItem('activeRange', activeRangesJSON);
}

function setDefaultAllFilters(): void {
  const rangeJSON: string = JSON.stringify(ACTIVE_RANGES);
  const filtersJSON: string = JSON.stringify(ACTIVE_FILTERS);
  const shapeJSON: string = JSON.stringify(All_SHAPES);
  const colorJSON: string = JSON.stringify(All_COLORS);
  const sizeJSON: string = JSON.stringify(All_SIZES);
  const favoriteJSON: string = JSON.stringify(ALL_FAVORITES);

  localStorage.setItem('activeRange', rangeJSON);
  localStorage.setItem('activeFilters', filtersJSON);
  localStorage.setItem('shape', shapeJSON);
  localStorage.setItem('color', colorJSON);
  localStorage.setItem('size', sizeJSON);
  localStorage.setItem('favorite', favoriteJSON);
}

function getChosenToysFromStorage(): string[] {
  const dataJSON: string = localStorage.getItem('chosenToys') ?? '[]';
  const chosenToys = JSON.parse(dataJSON);
  return chosenToys;
}

function setChosenToysInStorage(toys: string[]): void {
  const dataToysJSON: string = JSON.stringify(toys);
  localStorage.setItem('chosenToys', dataToysJSON);
}

setDefaultActiveFilters();
setFiltersConstants();

export {
  getActiveFiltersFromStorage,
  setActiveFiltersInStorage,
  getFilterConstant,
  setFilterConstant,
  getActiveRangeFromStorage,
  setActiveRangeInStorage,
  setDefaultAllFilters,
  getChosenToysFromStorage,
  setChosenToysInStorage,
};
