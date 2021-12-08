import  Home from './pages/home';
import Setting from './pages/setting';
import Category from './pages/category';
import Score from './pages/score';
import ArtGame from './pages/art-game';
import PicCategory from './pages/pic-category';
import PicGame from './pages/pic-game';
import PicScore from './pages/pic-score';
import { animationPage } from './components/use-func';

const Utils = {
  parseRequestURL: () => {
    const url = window.location.hash.slice(1).toLowerCase() || '/';
    const spaceUrl = url.split('/');
    const request = {
      resource: null,
      id: null,
      verb: null,
    };
    [, request.resource, request.id, request.verb] = spaceUrl;
    return request;
  },
};

const routes = {
  '/': new Home(),
  '/setting': new Setting(),
  '/category': new Category(),
  '/art-game': new ArtGame(),
  '/pic-category': new PicCategory(),
  '/pic-game': new PicGame(),
  '/score': new Score(),
  '/pic-score': new PicScore(),
};

const router = async () => {
  document.body.innerHTML = '';
  const request = Utils.parseRequestURL();
  const parsedURL = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '') + (request.verb ? `/${request.verb}` : '');
  const page = routes[parsedURL] ? routes[parsedURL] : new Home();
  await page.render();
};

window.addEventListener('hashchange', () => {
  animationPage(document.body, router);
});
window.addEventListener('load', router);
