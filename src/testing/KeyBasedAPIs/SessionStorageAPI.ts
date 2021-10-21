import BrowserStorageAPI from './BrowserStorageAPI';

export default class SessionStorageAPI extends BrowserStorageAPI {
    constructor() {
        super(sessionStorage);
    }
}
