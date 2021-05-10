import BaseRequest from './BaseRequest'
import API from '../API';

const primaryResource = "/media"

class SearchRequest extends BaseRequest {
    searchQuery: object;

    constructor(searchQuery: object) {
        super();
        this.searchQuery = searchQuery;
    }

    send() {
        return API.post(`${this.baseURL}${primaryResource}`, this.searchQuery);
    }
}

class SearchAllRequest extends BaseRequest {
    send() {
        return API.post(`${this.baseURL}${primaryResource}`, {"count": 99});
    }
}

export {
    SearchRequest,
    SearchAllRequest
};
