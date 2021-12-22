import {
  ACTIVE_FILTERS,
  All_SHAPES,
  All_COLORS,
  All_SIZES,
  ALL_FAVORITES,
  ACTIVE_RANGES,
} from '../constants/constants';

import {
  ActiveFilters,
  FilterData,
  ActiveRange,
} from '../constants/interface';

function setDefaultActiveFilters(): void {
  const filtersString: string = JSON.stringify(ACTIVE_FILTERS);
  const rangeString: string = JSON.stringify(ACTIVE_RANGES);

  if (!localStorage.getItem('activeFilters')) {
    localStorage.setItem('activeFilters', filtersString);
  }
  if (!localStorage.getItem('activeRange')) {
    localStorage.setItem('activeRange', rangeString);
  }
}

function getLocalActiveFilters(): Array<ActiveFilters> {
  const dataOfToys: string = localStorage.getItem('activeFilters') ?? '[]';
  const toys: ActiveFilters[] = JSON.parse(dataOfToys);
  return toys;
}

function setLocalActiveFilters(object: ActiveFilters[]): void {
  const dataString: string = JSON.stringify(object);
  localStorage.setItem('activeFilters', dataString);
}

function setFilterConstants() {
  const shapeString: string = JSON.stringify(All_SHAPES);
  const colorString: string = JSON.stringify(All_COLORS);
  const sizeString: string = JSON.stringify(All_SIZES);
  const favoriteString: string = JSON.stringify(ALL_FAVORITES);

  if (!localStorage.getItem('shape')) {
    localStorage.setItem('shape', shapeString);
  }
  if (!localStorage.getItem('color')) {
    localStorage.setItem('color', colorString);
  }
  if (!localStorage.getItem('size')) {
    localStorage.setItem('size', sizeString);
  }
  if (!localStorage.getItem('favorite')) {
    localStorage.setItem('favorite', favoriteString);
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

function setFilterConstant(filterName: string, object: FilterData[]): void {
  const constantString: string = JSON.stringify(object);
  localStorage.setItem(filterName, constantString);
}

function getLocalActiveRange(): Array<ActiveRange> {
  const dataOfToys: string = localStorage.getItem('activeRange') ?? '[]';
  const toys: ActiveRange[] = JSON.parse(dataOfToys);
  return toys;
}

function setLocalActiveRange(object: ActiveRange[]): void {
  const dataString: string = JSON.stringify(object);
  localStorage.setItem('activeRange', dataString);
}

function setDefaultAllFilters(): void {
  const rangeString: string = JSON.stringify(ACTIVE_RANGES);

  const filtersString: string = JSON.stringify(ACTIVE_FILTERS);
  const shapeString: string = JSON.stringify(All_SHAPES);
  const colorString: string = JSON.stringify(All_COLORS);
  const sizeString: string = JSON.stringify(All_SIZES);
  const favoriteString: string = JSON.stringify(ALL_FAVORITES);

  localStorage.setItem('activeRange', rangeString);

  localStorage.setItem('activeFilters', filtersString);
  localStorage.setItem('shape', shapeString);
  localStorage.setItem('color', colorString);
  localStorage.setItem('size', sizeString);
  localStorage.setItem('favorite', favoriteString);
}

function getChoseToys(): Array<string> {
  const data: string = localStorage.getItem('chosenToys') ?? '[]';
  const chosenToys = JSON.parse(data);
  return chosenToys;
}

function setChoseToys(toys: Array<string>): void {
  const dataString: string = JSON.stringify(toys);
  localStorage.setItem('chosenToys', dataString);
}

setDefaultActiveFilters();
setFilterConstants();

export {
  getLocalActiveFilters,
  setLocalActiveFilters,
  getFilterConstant,
  setFilterConstant,
  getLocalActiveRange,
  setLocalActiveRange,
  setDefaultAllFilters,
  getChoseToys,
  setChoseToys,
};
