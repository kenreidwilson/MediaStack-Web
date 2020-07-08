import BaseRequest from './BaseRequest'
import API from '../API';

const primaryResource = "/albums/"

class AlbumsRequest extends BaseRequest {
    constructor() {
        super();
    }

    send() {
        return  API.get(`${this.baseURL}/albums`);
    }
}

class AlbumInfoRequest extends BaseRequest {
    constructor(albumId) {
        super();
        this.albumName = albumId;
    }

    send() {
        return API.get(`${this.baseURL}${primaryResource}${this.albumName}/info`);
    }
}

class AlbumInfoChangeRequest extends BaseRequest {
    constructor(albumId, albumInfo) {
        super();
        this.albumId = albumId;
        this.albumInfo = albumInfo
    }

    send() {
        return API.put(`${this.baseURL}${primaryResource}${this.albumId}/info`, this.albumInfo);
    }
}

export {
    AlbumsRequest,
    AlbumInfoRequest,
    AlbumInfoChangeRequest
}
