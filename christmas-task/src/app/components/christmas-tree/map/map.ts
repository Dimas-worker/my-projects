class MapTree {
  map: HTMLMapElement;

  constructor() {
    this.map = document.createElement('map');
    this.map.setAttribute('name', 'tree-map');
    this.createArea();
  }

  createArea() {
    const area: HTMLAreaElement = document.createElement('area');
    area.coords = '239,0,105,212,17,444,-1,562,95,690,188,708,363,707,448,671,499,550,441,349,404,218,266,-1';
    area.shape = 'poly';
    this.map.append(area);
  }
}

export default MapTree;