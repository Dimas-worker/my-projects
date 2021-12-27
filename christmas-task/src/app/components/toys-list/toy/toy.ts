import './toy.scss';
import BaseComponent from '../../../utils/base-component';
import MapTree from '../../tree/map/map';

class Toy extends BaseComponent {
  amount: BaseComponent;
  map: MapTree;
  toysOnMap: string[] = [];

  constructor(numberImg: string, amountToys: string, id: number, map: MapTree) {
    super('div', ['toy']);
    this.map = map;
    this.amount = new BaseComponent('p', ['toy__amount'], amountToys);
    this.element.setAttribute('id', `${id}`);

    this.map.map.addEventListener('drop', (e) => {
      let event = e as DragEvent;
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
        let event = e as DragEvent;
        this.dragStart(event, imgToy.element);
      });

      this.element.append(imgToy.element);
    }
    this.element.append(this.amount.element);
  }

  dragStart(e: DragEvent, toy: HTMLElement): void {
    e.dataTransfer?.setData('id', toy.id);
    // let xToy = e.pageX - toy.offsetWidth / 2 + 'px';
    // let yToy = e.pageY - toy.offsetHeight  / 2 + 'px';
    // e.dataTransfer?.setData(toy.id, `[${xToy}, ${yToy}]`);
    let startCoordsToy = toy.getBoundingClientRect();
    let totalX = e.clientX - startCoordsToy.x;
    let totalY = e.clientY - startCoordsToy.y;
    e.dataTransfer?.setData(toy.id, `${totalX}-${totalY}`);
  }

  drop(e: DragEvent): void {
    const moveAt = (pageX: number, pageY: number, tag: HTMLElement): void => {
      tag.style.left = pageX + 'px';
      tag.style.top = pageY + 'px';
    };

    const toyID = e.dataTransfer?.getData('id') as string;
    const startCoordsToy = (e.dataTransfer?.getData(toyID) as string).split('-');
    let toy = document.getElementById(toyID) as HTMLElement;
    const coordsMap = this.map.map.nextElementSibling?.getBoundingClientRect() as DOMRect;

    let endCoordX = e.clientX - coordsMap.x - +startCoordsToy[0];
    let endCoordY = e.clientY - coordsMap.y - +startCoordsToy[1];
    
    moveAt(endCoordX, endCoordY, toy);

    if (this.map.map.firstElementChild) {
      this.map.map.firstElementChild.append(toy);
    }
    this.updateToyAmount(e);
  }

  updateToyAmount(e: DragEvent): void {
    const toyID = e.dataTransfer?.getData('id') as string;
    if (this.element.id === toyID.split('-')[0] && !this.toysOnMap.includes(toyID)) {
      this.toysOnMap.push(toyID);
      let toysAmount: number = Number(this.element.lastElementChild?.textContent);      
      if (this.element.lastElementChild && toysAmount) {
        this.element.lastElementChild.textContent = (toysAmount - 1).toString();
      }
    }
  }
}

export default Toy;
