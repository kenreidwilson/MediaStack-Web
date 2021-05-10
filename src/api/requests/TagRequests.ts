import BaseRequest from './BaseRequest'
import API from '../API';
import Tag from '../../model/Tag';

class TagsRequest extends BaseRequest {
    send() {
        return API.get<Tag[]>(`${this.baseURL}/tags`);
    }
}

class TagInfoRequest extends BaseRequest {
    tagId: number;

    constructor(tagId: number) {
        super();
        this.tagId = tagId;
    }

    send() {
        return API.get<Tag>(`${this.baseURL}/tags/${this.tagId}`);
    }
}

class TagCreationRequest extends BaseRequest {
    tagName: string;

    constructor(tagName: string) {
        super();
        this.tagName = tagName;
    }

    send() {
        return API.post<Tag>(`${this.baseURL}/tags/${this.tagName}`);
    }
}

class TagDeletionRequest extends BaseRequest {
    tagId: number;

    constructor(tagId: number) {
        super();
        this.tagId = tagId;
    }

    send() {
        return API.delete(`${this.baseURL}/tags/${this.tagId}`);
    }
}

class TagNameChangeRequest extends BaseRequest {
    tagId: number;
    newTagName: string;

    constructor(tagId: number, newTagName: string) {
        super();
        this.tagId = tagId;
        this.newTagName = newTagName;
    }

    send() {
        return API.put<Tag>(`${this.baseURL}/tags/${this.tagId}/info`, {'name': this.newTagName})
    }
}

export {
    TagsRequest,
    TagInfoRequest,
    TagCreationRequest,
    TagDeletionRequest,
    TagNameChangeRequest
}
