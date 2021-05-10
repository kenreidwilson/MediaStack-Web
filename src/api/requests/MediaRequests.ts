import BaseRequest from './BaseRequest'
import API from '../API';

const primaryResource = "/media/"

class MediaInfoRequest extends BaseRequest {
    mediaId: Number;

    constructor(mediaId: Number) {
        super();
        this.mediaId = mediaId;
    }

    send() {
        return API.get(`${this.baseURL}${primaryResource}${this.mediaId}`);
    }
}

class MediaInfoChangeRequest extends BaseRequest {
    mediaId: Number;
    newMediaInfo: object;

    constructor(mediaId: Number, mediaInfo: object) {
        super();
        this.mediaId = mediaId;
        this.newMediaInfo = mediaInfo
    }

    send() {
        console.log(this.newMediaInfo);
        return API.put(`${this.baseURL}${primaryResource}${this.mediaId}/edit`, this.newMediaInfo);
    }
}

class MediaFileRequest extends BaseRequest {
    mediaId: Number;

    constructor(mediaId: Number) {
        super();
        this.mediaId = mediaId;
    }

    send() {
        return API.get(`${this.baseURL}${primaryResource}${this.mediaId}/file`);
    }
}

export { 
    MediaInfoRequest,
    MediaInfoChangeRequest,
    MediaFileRequest
}
