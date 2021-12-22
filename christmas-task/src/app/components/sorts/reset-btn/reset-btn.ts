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

    this.element.addEventListener('click', (): void => {      
      this.range.rangeCount.slider.noUiSlider?.reset();
      this.range.rangeYear.slider.noUiSlider?.reset();
      const defaultValueCount = this.range.rangeCount.slider.noUiSlider?.get() as Array<string>;
      this.range.rangeCount.setDefaultRange(defaultValueCount);
      const defaultValueYear = this.range.rangeYear.slider.noUiSlider?.get() as Array<string>;
      this.range.rangeYear.setDefaultRange(defaultValueYear);

      setDefaultAllFilters();
      this.typeFilter.render();
      this.typeFilter.favorite.renderFilter();
      this.cards.renderCards();
    });
  }
}

export default ResetButton;
