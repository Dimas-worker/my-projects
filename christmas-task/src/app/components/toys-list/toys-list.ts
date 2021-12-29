import './toys-list.scss';
import BaseComponent from '../../utils/base-component';
import Toy from './toy/toy';
import { getChosenToysFromStorage } from '../../utils/localStorage';
import { getAllCards } from '../../utils/utils';
import { toyData } from '../../constants/interfaces';
import { CHOSEN_TOYS_MAX_AMOUNT } from '../../constants/constants';
import MapTree from '../tree/map/map';
import ResetLocal from '../sorts/reset-local/reset-local';

class ToysList extends BaseComponent {
  toysContainer: BaseComponent;
  title: BaseComponent;
  chosenToys: string[];
  map: MapTree;
  buttonLocal: ResetLocal;

  constructor(map: MapTree) {
    super('div', ['toys-list']);
    this.map = map;
    this.buttonLocal = new ResetLocal();
    this.toysContainer = new BaseComponent('div', ['toys-list__container']);
    this.title = new BaseComponent('div', ['toys-list__title'], 'Игрушки');
    this.toysContainer.element.append(this.title.element);
    this.createChosenToys();
    this.element.append(this.toysContainer.element, this.buttonLocal.element);
    this.chosenToys = getChosenToysFromStorage();
    this.map.mapElement.addEventListener('dragover', (e: DragEvent): void => e.preventDefault());
  }

  async createChosenToys(): Promise<void> {
    const allToys: toyData[] = await getAllCards();
    if (this.chosenToys.length) {
      this.chosenToys.forEach((toyNumber: string, index: number): void => {
        const currentCard: toyData = allToys[+toyNumber - 1];
        const chosenToy: Toy = new Toy(toyNumber, currentCard.count, index, this.map);
        this.toysContainer.element.append(chosenToy.element);
      });
    } else {
      for (let i = 0; i < CHOSEN_TOYS_MAX_AMOUNT; i++) {
        const currentCard: toyData = allToys[i];
        const chosenToy: Toy = new Toy(currentCard.num, currentCard.count, i, this.map);
        this.toysContainer.element.append(chosenToy.element);
      }
    }
  }
}

export default ToysList;
