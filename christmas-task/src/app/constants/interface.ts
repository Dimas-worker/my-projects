interface toyData {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

interface ListData {
  text: string;
  hrefLink: string;
  iconLink: string;
}

interface FilterData {
  class: string;
  ruName: string;
  status: boolean;
}

interface ActiveFilters {
  filterName: keyof toyData;
  filters: Array<string | boolean>;
}

interface ActiveRange {
  rangeName: keyof toyData;
  min: string;
  max: string;
}

interface RangeType {
  name: string;
  step: number;
  min: number;
  max: number;
}

export { toyData, ListData, FilterData, ActiveFilters, ActiveRange, RangeType };
