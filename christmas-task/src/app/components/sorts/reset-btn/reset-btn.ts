import BaseComponent from '../../../utils/base-component';
import './reset-btn.scss';
import Cards from '../../cards/cards';
import RangeFilters from '../../range-filters/range-filters';
import TypeFilters from '../../type-filters/type-filters';
import { setDefaultAllFilters } from '../../../utils/localStorage';

class ResetButton extends BaseComponent {
  range: RangeFilters;

  cards: Cards;

  typeFilter: TypeFilters;

  constructor(range: RangeFilters, cards: Cards, typeFilter: TypeFilters) {
    super('button', ['reset'], 'Сброс фильтров');
    this.range = range;
    this.cards = cards;
    this.typeFilter = typeFilter;
    this.element.addEventListener('click', () => {
      this.range.rangeCount.slider.noUiSlider?.reset();
      this.range.rangeYear.slider.noUiSlider?.reset();
      setDefaultAllFilters();
      this.typeFilter.favorite.renderFilter();
      this.typeFilter.render();
      this.cards.renderCards();
    });
  }
}

export default ResetButton;
