import BaseRequest from './BaseRequest'

const primaryResource = "/search/"

class SearchRequest extends BaseRequest {
    constructor(options) {
        super();
        this.mediaSet = options.set;
        this.searchQuery = options.query;
    }

    getURL() {
        return `${this.baseURL}${primaryResource}${this.mediaSet}/${this.searchQuery}`;
    }
}

class SearchMediaSetRequest extends BaseRequest {
    constructor(options) {
        super();
        this.mediaSet = options.set;
    }

    getURL() {
        return `${this.baseURL}${primaryResource}${this.mediaSet}`;
    }
}

export {
    SearchRequest,
    SearchMediaSetRequest
};
