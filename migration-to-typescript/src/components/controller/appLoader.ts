import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: 'd26c10b1b92e4db2be9de4f444090d6e',
        });
    }
}

export default AppLoader;
