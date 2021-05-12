import BaseRequest from './BaseRequest'
import API from '../API';
import Media from '../../model/Media';
import MediaSearchQuery from './RequestModels/MediaSearchQuery';

const primaryResource = "/media"

class SearchRequest extends BaseRequest {
    searchQuery: MediaSearchQuery;

    constructor(searchQuery: MediaSearchQuery) {
        super();
        this.searchQuery = searchQuery;
    }

    send() {
        return API.post<Media[]>(`${this.baseURL}${primaryResource}`, this.searchQuery);
    }
}

class SearchAllRequest extends BaseRequest {
    send() {
        return API.post<Media[]>(`${this.baseURL}${primaryResource}`, new MediaSearchQuery());
    }
}

export {
    SearchRequest,
    SearchAllRequest
};
