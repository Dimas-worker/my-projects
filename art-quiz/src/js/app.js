import './components/ls';
import { Home } from './pages/home';
import { Setting } from './pages/setting';
import { Category } from './pages/category';
import { Score } from './pages/score';
import { ArtGame } from './pages/art-game';
import { PicCategory } from './pages/pic-category';
import { PicGame } from './pages/pic-game';
import { PicScore } from './pages/pic-score';
import { animationPage } from './components/use-func';


const Utils = { 
  parseRequestURL : () => {
    let url = location.hash.slice(1).toLowerCase() || '/';
    let r = url.split("/");
    let request = {
      resource    : null,
      id          : null,
      verb        : null
    };
    request.resource    = r[1]
    request.id          = r[2]
    request.verb        = r[3]
    return request
  }
}

const routes = {
  '/'             : new Home,
  '/setting'      : new Setting,
  '/category'     : new Category,
  '/art-game'     : new ArtGame,
  '/pic-category' : new PicCategory,
  '/pic-game'     : new PicGame,
  '/score'        : new Score,
  '/pic-score'    : new PicScore,
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