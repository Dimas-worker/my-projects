import mapboxgl from 'mapbox-gl';
 
// mapboxgl.accessToken = 'pk.eyJ1IjoiZG1pdHJpeXBldHJhbGFpIiwiYSI6ImNrdWpndnMwdTBqb28zM282bXhrbG5ieGIifQ.yICQLODpeCgHxV47bh2PiQ';
mapboxgl.accessToken = 'pk.eyJ1IjoiZG1pdHJpeXBldHJhbGFpIiwiYSI6ImNrdWpoMGVrNDBjemMycG1vc3J6MWY4MDEifQ.MAUH9zuG45kE-Dtm0PR3yg';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/light-v10', // style URL 
  center: [2.3364, 48.86091], // starting position [lng, lat]
  zoom: 15.7,
});
const marker1 = new mapboxgl.Marker({ color: 'black'})
  .setLngLat([2.3364, 48.86091])
  .addTo(map);
const marker2 = new mapboxgl.Marker({ color: 'gray'})
  .setLngLat([2.3333, 48.8602])
  .addTo(map);
const marker3 = new mapboxgl.Marker({ color: 'gray'})
  .setLngLat([2.3397, 48.8607])
  .addTo(map);
const marker4 = new mapboxgl.Marker({ color: 'gray'})
  .setLngLat([2.3330, 48.8619])
  .addTo(map);
const marker5 = new mapboxgl.Marker({ color: 'gray'})
  .setLngLat([2.3365, 48.8625])
  .addTo(map);

const nav = new mapboxgl.NavigationControl();
map.addControl(nav);