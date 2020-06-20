import BaseRequest from './BaseRequest'

class TagsRequest extends BaseRequest {
    constructor(options) {
        super();
    }

    getURL() {
        return `${this.baseURL}/tags`;
    }
}

export {
    TagsRequest
}
