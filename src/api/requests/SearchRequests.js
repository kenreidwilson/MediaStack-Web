import BaseRequest from './BaseRequest'
import API from '../API';

const primaryResource = "/search/"

class SearchRequest extends BaseRequest {
    constructor(mediaSet, searchQuery) {
        super();
        this.mediaSet = mediaSet;
        this.searchQuery = searchQuery;
    }

    send() {
        return API.get(`${this.baseURL}${primaryResource}${this.mediaSet}/${this.searchQuery}`);
    }
}

class SearchMediaSetRequest extends BaseRequest {
    constructor(mediaSet) {
        super();
        this.mediaSet = mediaSet;
    }

    send() {
        return API.get(`${this.baseURL}${primaryResource}${this.mediaSet}`);
    }
}

export {
    SearchRequest,
    SearchMediaSetRequest
};
