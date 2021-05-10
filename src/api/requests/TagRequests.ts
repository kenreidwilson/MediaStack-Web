import BaseRequest from './BaseRequest'
import API from '../API';

class TagsRequest extends BaseRequest {
    send() {
        return API.get(`${this.baseURL}/tags`);
    }
}

class TagInfoRequest extends BaseRequest {
    tagId: Number;

    constructor(tagId: Number) {
        super();
        this.tagId = tagId;
    }

    send() {
        return API.get(`${this.baseURL}/tags/${this.tagId}`);
    }
}

class TagCreationRequest extends BaseRequest {
    tagName: string;

    constructor(tagName: string) {
        super();
        this.tagName = tagName;
    }

    send() {
        return API.post(`${this.baseURL}/tags/${this.tagName}`);
    }
}

class TagDeletionRequest extends BaseRequest {
    tagId: Number;

    constructor(tagId: Number) {
        super();
        this.tagId = tagId;
    }

    send() {
        return API.delete(`${this.baseURL}/tags/${this.tagId}`);
    }
}

class TagNameChangeRequest extends BaseRequest {
    tagId: Number;
    newTagName: string;

    constructor(tagId: Number, newTagName: string) {
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
