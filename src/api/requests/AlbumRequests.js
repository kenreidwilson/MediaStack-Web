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

export {
    AlbumsRequest,
    AlbumInfoRequest
}