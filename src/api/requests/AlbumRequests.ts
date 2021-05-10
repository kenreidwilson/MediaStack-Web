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
    albumId: Number;

    constructor(albumId: Number) {
        super();
        this.albumId = albumId;
    }

    send() {
        return API.get(`${this.baseURL}${primaryResource}${this.albumId}`);
    }
}

class AlbumInfoChangeRequest extends BaseRequest {
    albumId: Number;
    albumInfo: object;

    constructor(albumId: Number, albumInfo: object) {
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
