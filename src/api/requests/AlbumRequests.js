import BaseRequest from './BaseRequest'

const primaryResource = "/albums/"

class AlbumsRequest extends BaseRequest {
    constructor() {
        super();
    }

    getURL() {
        return `${this.baseURL}/albums`
    }
}

class AlbumInfoRequest extends BaseRequest {
    constructor(options) {
        super();
        this.albumName = options.albumId;
    }

    getURL() {
        return `${this.baseURL}${primaryResource}${this.albumName}/info`;
    }
}

export {
    AlbumsRequest,
    AlbumInfoRequest
}