import './cards.scss';
import BaseComponent from "../../utils/base-component";
import { toyData, getAllCards } from '../../utils/utils';
import { ActiveFilters } from '../../constants/constants';
import Card from './card/card';

class Cards extends BaseComponent {

  constructor() {
    super('div', ['toys']);
  }

  renderCards(): void {
    const allToys: toyData[] = getAllCards();
    const dataString: string = localStorage.getItem('activeFilters') ?? '';
    const activeFilter: ActiveFilters[] = JSON.parse(dataString);
    let resultToys: toyData[] = allToys.filter(toy =>
      activeFilter.length === activeFilter.filter(current =>
        current.filters.length
        ? current.filters.includes(toy[current.filterName])
        : true
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
