import { ACTIVE_FILTERS, ActiveFilters, All_SHAPE, All_COLOR, All_SIZE, ALL_FAVORITE, FilterData } from '../constants/constants';

function setActiveFilters(): void {
  const dataString: string = JSON.stringify(ACTIVE_FILTERS);
  if (!(localStorage.getItem('activeFilters'))) {
    localStorage.setItem('activeFilters', dataString);
  }
}

function getLocalData(): ActiveFilters[] {
  const dataOfToys: string = localStorage.getItem('activeFilters') ?? '[]';
  const toys: ActiveFilters[] = JSON.parse(dataOfToys);
  return toys;
}

function setLocalActiveFilters(object: ActiveFilters[]): void {
  const dataString: string = JSON.stringify(object);
  localStorage.setItem('activeFilters', dataString);
}

function setFilterConstants() {
  const shapeString: string = JSON.stringify(All_SHAPE);
  const colorString: string = JSON.stringify(All_COLOR);
  const sizeString: string = JSON.stringify(All_SIZE);
  const favoriteString: string = JSON.stringify(ALL_FAVORITE);


  if (!(localStorage.getItem('shape'))) {
    localStorage.setItem('shape', shapeString);
  }
  if (!(localStorage.getItem('color'))) {
    localStorage.setItem('color', colorString);
  }
  if (!(localStorage.getItem('size'))) {
    localStorage.setItem('size', sizeString);
  }
  if (!(localStorage.getItem('favorite'))) {
    localStorage.setItem('favorite', favoriteString);
  }
}

function getFilterConstant(filterName: string): FilterData[] {
  const dataFilter: string = localStorage.getItem(filterName) ?? '[]';
  const filter: FilterData[] = JSON.parse(dataFilter);
  return filter;
}

function setFilterConstant(filterName: string, object:FilterData[] ): void {
  const constantString: string = JSON.stringify(object);
  localStorage.setItem(filterName, constantString);
}

setActiveFilters();
setFilterConstants();

export { getLocalData, setLocalActiveFilters, getFilterConstant, setFilterConstant }
