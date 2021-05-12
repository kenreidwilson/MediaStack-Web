import BaseRequest from './BaseRequest'
import API from '../API';
import Media from '../../model/Media';
import MediaEditRequest from './RequestModels/MediaEditRequest';

const primaryResource = "/media/"

class MediaInfoRequest extends BaseRequest {
    mediaId: number;

    constructor(mediaId: number) {
        super();
        this.mediaId = mediaId;
    }

    send() {
        return API.get<Media>(`${this.baseURL}${primaryResource}${this.mediaId}`);
    }
}

class MediaInfoChangeRequest extends BaseRequest {
    mediaId: number;
    newMediaInfo: MediaEditRequest;

    constructor(mediaId: number, mediaInfo: MediaEditRequest) {
        super();
        this.mediaId = mediaId;
        this.newMediaInfo = mediaInfo
    }

    send() {
        console.log(this.newMediaInfo);
        return API.put<Media>(`${this.baseURL}${primaryResource}${this.mediaId}/edit`, this.newMediaInfo);
    }
}

class MediaFileRequest extends BaseRequest {
    mediaId: number;

    constructor(mediaId: number) {
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
