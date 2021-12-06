import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', { //https://newsapi.org/v2/ change on https://nodenews.herokuapp.com/
            apiKey: 'd26c10b1b92e4db2be9de4f444090d6e', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
