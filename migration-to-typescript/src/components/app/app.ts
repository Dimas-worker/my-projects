import AppController from '../controller/controller';
import AppView, { HandleData } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        document
            .querySelector('.sources')
            ?.addEventListener('click', (e: Event): void => this.controller.getNews(e, (data: HandleData): void => this.view.drawNews(data)));
        this.controller.getSources((data: HandleData): void => this.view.drawSources(data));
    }
}

export default App;
