import BaseRequest from './BaseRequest'
import API from '../API';

class TagsRequest extends BaseRequest {
    constructor() {
        super();
    }

    send() {
        return API.get(`${this.baseURL}/tags`);
    }
}

export {
    TagsRequest
}
