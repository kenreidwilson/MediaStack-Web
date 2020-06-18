import BaseRequest from './BaseRequest'

const primaryResource = "/albums/"

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
    AlbumInfoRequest
}