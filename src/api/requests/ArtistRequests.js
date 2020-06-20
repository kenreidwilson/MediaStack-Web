import BaseRequest from './BaseRequest'
import API from '../API';

class ArtistsRequest extends BaseRequest {
    constructor() {
        super();
    }

    send() {
        return API.get(`${this.baseURL}/artists`);
    }
}

export {
    ArtistsRequest
}