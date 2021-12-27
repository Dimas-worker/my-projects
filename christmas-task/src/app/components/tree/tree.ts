import './tree.scss';
import BaseComponent from '../../utils/base-component';
import Settings from '../settings/settings';
import ChristmasTree from '../christmas-tree/christmas-tree';
import ToysList from '../toys-list/toys-list';
import MapTree from '../tree/map/map';

class Tree extends BaseComponent {
  wrapper: BaseComponent;
  container: BaseComponent;
  settings: Settings;
  christmasTree: ChristmasTree;
  toysList: ToysList;
  map: MapTree;


  constructor() {
    super('div', ['tree']);
    this.wrapper = new BaseComponent('div', ['tree__wrapper']);
    this.container = new BaseComponent('div', ['tree__container']);
    this.map = new MapTree();

    this.settings = new Settings();
    this.christmasTree = new ChristmasTree(this.settings, this.map);
    this.toysList = new ToysList(this.map);
    this.container.element.append(this.settings.element, this.christmasTree.element, this.toysList.element);
    this.wrapper.element.append(this.container.element);
    this.element.append(this.wrapper.element);
  }
}

export default Tree;
