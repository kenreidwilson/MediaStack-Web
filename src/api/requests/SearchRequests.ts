import BaseRequest from './BaseRequest'
import API from '../API';
import MediaSearchQuery from './RequestBodies/MediaSearchQuery';
import MediaSearchResponseData from '../responses/MediaSearchResponseData';

const primaryResource = "/media"

class SearchRequest extends BaseRequest {
    searchQuery: MediaSearchQuery;

    constructor(searchQuery: MediaSearchQuery) {
        super();
        this.searchQuery = searchQuery;
    }

    send() {
        return API.post<MediaSearchResponseData>(`${this.baseURL}${primaryResource}`, this.searchQuery);
    }
}


export {
    SearchRequest
};
