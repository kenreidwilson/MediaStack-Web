import BaseRequest from './BaseRequest'
import API from '../API';

class ArtistsRequest extends BaseRequest {
    constructor() {
        super();
    }

    send() {
        return API.get(`${this.baseURL}/artists`);
    }
}

class ArtistInfoRequest extends BaseRequest {
    constructor(artistId) {
        super();
        this.artistId = artistId
    }

    send() {
        return API.get(`${this.baseURL}/artists/${this.artistId}/info`);
    }
}

export {
    ArtistsRequest,
    ArtistInfoRequest
}