import BaseRequest from './BaseRequest'

const primaryResource = "/media/"

class MediaInfoRequest extends BaseRequest {
    constructor(options) {
        super();
        this.mediaHash = options.mediaId;
    }

    getURL() {
        return `${this.baseURL}${primaryResource}${this.mediaHash}/info`;
    }
}

class MediaFileRequest extends BaseRequest {
    constructor(options) {
        super();
        this.mediaHash = options.mediaId;
    }

    getURL() {
        return `${this.baseURL}${primaryResource}${this.mediaHash}/file`;
    }
}

class MediaChangeSourceRequest extends BaseRequest {
    constructor(options) {
        super();
        this.mediaHash = options.hash;
        this.newSource = options.source;
    }

    getURL() {
        return `${this.baseURL}${primaryResource}${this.mediaHash}/source/${this.newSource}`;
    }
}

class MediaChangeScoreRequest extends BaseRequest {
    constructor(options) {
        super();
        this.mediaHash = options.hash;
        this.newScore = options.score;
    }

    getURL() {
        return `${this.baseURL}${primaryResource}${this.mediaHash}/score/${this.newScore}`;
    }
}

class MediaAddTagRequest extends BaseRequest {
    constructor(options) {
        super();
        this.mediaHash = options.hash;
        this.newTagName = options.tag;
    }

    getURL() {
        return `${this.baseURL}${primaryResource}${this.mediaHash}/tags/${this.newTagName}`;
    }
}

class MediaDeleteTagRequest extends BaseRequest {
    constructor(options) {
        super();
        this.mediaHash = options.hash;
        this.oldTagName = options.tag;
    }

    getURL() {
        return `${this.baseURL}${primaryResource}${this.mediaHash}/tags/${this.oldTagName}`;
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
