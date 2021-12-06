import News from './news/news';
import Sources from './sources/sources';

import { DataSources } from './sources/sources';
import { DataNews } from './news/news';

export interface HandleData {
    articles?: DataNews[];
    sources?: DataSources[];
}

class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: HandleData): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: HandleData): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
