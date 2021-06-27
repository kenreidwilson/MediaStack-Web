import BaseRequest from './BaseRequest'
import API from '../API';
import Media from '../../model/Media';
import MediaEditRequest from './RequestBodies/MediaEditRequest';

const primaryResource = "/media/"

class MediaInfoRequest extends BaseRequest {
    mediaId: number;

    constructor(mediaId: number) {
        super();
        this.mediaId = mediaId;
    }

    send() {
        return API.get<Media>(`${this.baseURL}/media?id=${this.mediaId}`);
    }
}

class MediaInfoChangeRequest extends BaseRequest {
    newMediaInfo: MediaEditRequest;

    constructor(mediaId: number, mediaInfo: MediaEditRequest) {
        super();
        this.newMediaInfo = mediaInfo;
        this.newMediaInfo.ID = mediaId;
    }

    send() {
        return API.put<Media>(`${this.baseURL}/media`, this.newMediaInfo);
    }
}

class MediaFileRequest extends BaseRequest {
    mediaId: number;

    constructor(mediaId: number) {
        super();
        this.mediaId = mediaId;
    }

    send() {
        return API.get(`${this.baseURL}/media/file?id=${this.mediaId}`);
    }
}

export { 
    MediaInfoRequest,
    MediaInfoChangeRequest,
    MediaFileRequest
}
