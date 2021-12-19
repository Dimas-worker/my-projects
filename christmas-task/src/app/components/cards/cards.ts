import './cards.scss';
import BaseComponent from "../../utils/base-component";
import { toyData, getAllCards } from '../../utils/utils';
import { getLocalActiveFilters, getLocalActiveRange } from '../../utils/localStorage';
import Card from './card/card';

class Cards extends BaseComponent {

  constructor() {
    super('div', ['toys']);
  }

  renderCards(): void {
    const allToys: toyData[] = getAllCards();
    const activeFilter = getLocalActiveFilters();
    const activeRange = getLocalActiveRange();
    let resultToys: toyData[] = allToys.filter(toy =>
      activeFilter.length === activeFilter.filter(current =>
        current.filters.length
          ? current.filters.includes(toy[current.filterName])
          : true
      ).length
    )
    .filter(toy => 
      activeRange.length === activeRange.filter(cur =>
        +toy[cur.rangeName] >= +cur.min && +toy[cur.rangeName] <= +cur.max
      ).length
    )
    this.element.innerHTML = '';
    resultToys.forEach(el => {
      const toy: Card = new Card(el);
      this.element.append(toy.element);
    })
  }
}

export default Cards;
