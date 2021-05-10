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
    artistId: Number;

    constructor(artistId: Number) {
        super();
        this.artistId = artistId
    }

    send() {
        return API.get(`${this.baseURL}/artists/${this.artistId}`);
    }
}

export {
    ArtistsRequest,
    ArtistInfoRequest
}
