import BaseRequest from './BaseRequest'

const primaryResource = "/media/"

class MediaInfoRequest extends BaseRequest {
    constructor(options) {
        super();
        this.mediaHash = options.hash;
    }

    getRequestURL() {
        return `${this.baseURL}${primaryResource}${this.mediaHash}/info`;
    }
}

export { 
    MediaInfoRequest,
}
