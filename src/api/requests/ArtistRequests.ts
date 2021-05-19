import BaseRequest from './BaseRequest'
import API from '../API';
import Artist from '../../model/Artist';

class ArtistsRequest extends BaseRequest {
    send() {
        return API.get<Artist[]>(`${this.baseURL}/artists`);
    }
}

class ArtistInfoRequest extends BaseRequest {
    artistId: number;

    constructor(artistId: number) {
        super();
        this.artistId = artistId
    }

    send() {
        return API.get<Artist>(`${this.baseURL}/artists/${this.artistId}`);
    }
}

export {
    ArtistsRequest,
    ArtistInfoRequest
}
