import './components/ls';
import { Home } from './pages/home';
import { Setting } from './pages/setting';
import { Category } from './pages/category';
import { ArtGame } from './pages/art-game';
import { animationPage } from './components/use-func';


const Utils = { 
  parseRequestURL : () => {

      let url = location.hash.slice(1).toLowerCase() || '/';
      let r = url.split("/");
      let request = {
          resource    : null,
          id          : null,
          verb        : null
      }
      request.resource    = r[1]
      request.id          = r[2]
      request.verb        = r[3]
      return request
  }
}

const routes = {
    '/'         : new Home,
    '/setting'  : new Setting,
    '/category' : new Category,
    '/art-game' : new ArtGame,
};

const router = async () => {
  
  document.body.innerHTML = '';
  let request = Utils.parseRequestURL();
  let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');
  let page = routes[parsedURL] ? routes[parsedURL] : Error404;
  await page.render();
}

window.addEventListener('hashchange', () => {
  animationPage(document.body, router);
})
window.addEventListener('load', router);