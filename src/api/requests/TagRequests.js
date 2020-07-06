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

class TagCreationRequest extends BaseRequest {
    constructor(tagName) {
        super();
        this.tagName = tagName;
    }

    send() {
        return API.post(`${this.baseURL}/tags/${this.tagName}`)
    }
}

export {
    TagsRequest,
    TagCreationRequest
}
