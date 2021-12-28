class MapTree {
  mapElement: HTMLMapElement;

  constructor() {
    this.mapElement = document.createElement('map');
    this.mapElement.setAttribute('name', 'tree-map');
    this.createArea();
  }

  createArea() {
    const area: HTMLAreaElement = document.createElement('area');
    area.coords = '253,6,96,354,22,616,181,689,307,689,477,625,400,340';
    area.shape = 'poly';
    this.mapElement.append(area);
  }
}

export default MapTree;
