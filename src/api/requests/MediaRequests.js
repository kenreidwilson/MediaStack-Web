import BaseRequest from './BaseRequest'
import API from '../API';

const primaryResource = "/media/"

class MediaInfoRequest extends BaseRequest {
    constructor(mediaId) {
        super();
        this.mediaHash = mediaId;
    }

    send() {
        return API.get(`${this.baseURL}${primaryResource}${this.mediaHash}/info`);
    }
}

class MediaFileRequest extends BaseRequest {
    constructor(mediaId) {
        super();
        this.mediaHash = mediaId;
    }

    send() {
        return API.get(`${this.baseURL}${primaryResource}${this.mediaHash}/file`);
    }
}

class MediaChangeSourceRequest extends BaseRequest {
    constructor(mediaId, source) {
        super();
        this.mediaHash = mediaId;
        this.newSource = source;
    }

    send() {
        return API.put(`${this.baseURL}${primaryResource}${this.mediaHash}/source/${this.newSource}`);
    }
}

class MediaChangeScoreRequest extends BaseRequest {
    constructor(mediaId, score) {
        super();
        this.mediaHash = mediaId;
        this.newScore = score;
    }

    send() {
        return API.put(`${this.baseURL}${primaryResource}${this.mediaHash}/score/${this.newScore}`);
    }
}

class MediaAddTagRequest extends BaseRequest {
    constructor(mediaId, tagName) {
        super();
        this.mediaHash = mediaId;
        this.newTagName = tagName;
    }

    send() {
        return API.post(`${this.baseURL}${primaryResource}${this.mediaHash}/tags/${this.newTagName}`);
    }
}

class MediaDeleteTagRequest extends BaseRequest {
    constructor(mediaId, tagName) {
        super();
        this.mediaHash = mediaId;
        this.oldTagName = tagName;
    }

    send() {
        return API.delete(`${this.baseURL}${primaryResource}${this.mediaHash}/tags/${this.oldTagName}`);
    }
}

export { 
    MediaInfoRequest,
    MediaFileRequest,
    MediaChangeSourceRequest,
    MediaChangeScoreRequest,
    MediaAddTagRequest,
    MediaDeleteTagRequest
}
