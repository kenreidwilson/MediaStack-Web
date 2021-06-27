import BaseRequest from './BaseRequest'
import API from '../API';
import Tag from '../../model/Tag';
import TagsSearchResponseData from '../responses/TagsSearchResponseData';

class TagsRequest extends BaseRequest {
    send() {
        return API.get<TagsSearchResponseData>(`${this.baseURL}/tags/search?count=999`);
    }
}

class TagInfoRequest extends BaseRequest {
    tagId: number;

    constructor(tagId: number) {
        super();
        this.tagId = tagId;
    }

    send() {
        return API.get<Tag>(`${this.baseURL}/tags?id=${this.tagId}`);
    }
}

class TagCreationRequest extends BaseRequest {
    tagName: string;

    constructor(tagName: string) {
        super();
        this.tagName = tagName;
    }

    send() {
        return API.post<Tag>(`${this.baseURL}/tags?name=${this.tagName}`);
    }
}

class TagDeletionRequest extends BaseRequest {
    tagId: number;

    constructor(tagId: number) {
        super();
        this.tagId = tagId;
    }

    send() {
        return API.delete(`${this.baseURL}/tags?id=${this.tagId}`);
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
        return API.put<Tag>(`${this.baseURL}/tags?id=${this.tagId}&name=${this.newTagName}`);
    }
}

export {
    TagsRequest,
    TagInfoRequest,
    TagCreationRequest,
    TagDeletionRequest,
    TagNameChangeRequest
}
