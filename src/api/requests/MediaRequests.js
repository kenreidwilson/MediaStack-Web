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

class MediaInfoChangeRequest extends BaseRequest {
    constructor(mediaId, mediaInfo) {
        super();
        this.mediaHash = mediaId;
        this.newMediaInfo = mediaInfo
    }

    send() {
        return API.put(`${this.baseURL}${primaryResource}${this.mediaHash}/info`, this.newMediaInfo);
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

export { 
    MediaInfoRequest,
    MediaInfoChangeRequest as MediaChangeInfoRequest,
    MediaFileRequest
}
