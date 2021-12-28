import './toy.scss';
import BaseComponent from '../../../utils/base-component';
import MapTree from '../../tree/map/map';

class Toy extends BaseComponent {
  amount: BaseComponent;
  map: MapTree;
  toysOnMap: string[] = [];
  onValidDrop = false;

  constructor(numberImg: string, amountToys: string, id: number, map: MapTree) {
    super('div', ['toy']);
    this.map = map;
    this.amount = new BaseComponent('p', ['toy__amount'], amountToys);
    this.element.setAttribute('id', `${id}`);

    this.map.mapElement.addEventListener('drop', (e) => {
      const event = e as DragEvent;
      this.updateToyAmount(event);
      this.drop(event);
    });

    this.createToy(numberImg, amountToys, id);
  }

  createToy(numberImg: string, amountToys: string, id: number): void {
    for (let i = 1; i <= +amountToys; i++) {
      const imgToy = new BaseComponent('img', ['toy__img']);
      imgToy.element.setAttribute('src', `./assets/toys/${numberImg}.png`);
      imgToy.element.setAttribute('alt', `${numberImg}-toy`);
      imgToy.element.setAttribute('draggable', 'true');
      imgToy.element.setAttribute('id', `${id}-${i}`);

      imgToy.element.addEventListener('dragstart', (e: Event): void => {
        const event = e as DragEvent;
        this.dragStart(event, imgToy.element);
      });
      this.map.mapElement.addEventListener('dragleave', (): void => {
        this.onValidDrop = false;
      });

      imgToy.element.addEventListener('dragend', (e: Event): void => {
        if (!this.onValidDrop) {
          const target = e.target as HTMLElement;
          if (this.element.id === target.id.split('-')[0]) {
            target.removeAttribute('style');
            this.element.prepend(target);
            const toysAmount = Number(this.element.lastElementChild?.textContent);
            if (this.element.lastElementChild && toysAmount < +amountToys) {
              const indexID = this.toysOnMap.indexOf(target.id);
              this.toysOnMap.splice(indexID, 1);
              this.element.lastElementChild.textContent = (toysAmount + 1).toString();
            }
          }
        }
      });
      this.element.append(imgToy.element);
    }
    this.element.append(this.amount.element);
  }

  dragStart(e: DragEvent, toy: HTMLElement): void {
    e.dataTransfer?.setData('id', toy.id);
    const startCoordsToy = toy.getBoundingClientRect();
    const totalX = e.clientX - startCoordsToy.x;
    const totalY = e.clientY - startCoordsToy.y;
    e.dataTransfer?.setData(toy.id, `${totalX}-${totalY}`);
  }

  drop(e: DragEvent): void {
    this.onValidDrop = true;
    const moveAt = (pageX: number, pageY: number, tag: HTMLElement): void => {
      tag.style.left = pageX + 'px';
      tag.style.top = pageY + 'px';
    };

    const toyID = e.dataTransfer?.getData('id') as string;
    const startCoordsToy = (e.dataTransfer?.getData(toyID) as string).split('-');
    const toy = document.getElementById(toyID) as HTMLElement;
    const coordsMap = this.map.mapElement.nextElementSibling?.getBoundingClientRect() as DOMRect;

    const endCoordX = e.clientX - coordsMap.x - +startCoordsToy[0];
    const endCoordY = e.clientY - coordsMap.y - +startCoordsToy[1];

    moveAt(endCoordX, endCoordY, toy);

    if (this.map.mapElement.firstElementChild) {
      this.map.mapElement.firstElementChild.append(toy);
    }
  }

  updateToyAmount(e: DragEvent): void {
    const toyID = e.dataTransfer?.getData('id') as string;
    if (this.element.id === toyID.split('-')[0] && !this.toysOnMap.includes(toyID)) {
      this.toysOnMap.push(toyID);
      const toysAmount = Number(this.element.lastElementChild?.textContent);
      if (this.element.lastElementChild && toysAmount) {
        this.element.lastElementChild.textContent = (toysAmount - 1).toString();
      }
    }
  }
}

export default Toy;
