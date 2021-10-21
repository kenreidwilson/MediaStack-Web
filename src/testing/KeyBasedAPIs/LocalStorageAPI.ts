import BrowserStorageAPI from './BrowserStorageAPI';

export default class LocalStorageAPI extends BrowserStorageAPI {
    constructor() {
        super(localStorage);
    }
}
