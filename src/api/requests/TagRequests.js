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

class TagInfoRequest extends BaseRequest {
    constructor(tagId) {
        super();
        this.tagId = tagId;
    }

    send() {
        return API.get(`${this.baseURL}/tags/${this.tagId}/info`);
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

class TagDeletionRequest extends BaseRequest {
    constructor(tagId) {
        super();
        this.tagId = tagId;
    }

    send() {
        return API.delete(`${this.baseURL}/tags/${this.tagId}`);
    }
}

class TagNameChangeRequest extends BaseRequest {
    constructor(tagId, newTagName) {
        super();
        this.tagId = tagId;
        this.newTagName = newTagName;
    }

    send() {
        return API.put(`${this.baseURL}/tags/${this.tagId}/info`, {'name': this.newTagName})
    }
}

export {
    TagsRequest,
    TagInfoRequest,
    TagCreationRequest,
    TagDeletionRequest,
    TagNameChangeRequest
}
