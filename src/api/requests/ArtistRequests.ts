import BaseRequest from './BaseRequest'
import API from '../API';
import Artist from '../../model/Artist';
import ArtistsSearchResponse from '../responses/ArtistsSearchResponse';

class ArtistsRequest extends BaseRequest {
    send() {
        return API.get<ArtistsSearchResponse>(`${this.baseURL}/artists/search?count=999`);
    }
}

class ArtistInfoRequest extends BaseRequest {
    artistId: number;

    constructor(artistId: number) {
        super();
        this.artistId = artistId
    }

    send() {
        return API.get<Artist>(`${this.baseURL}/artists?id=${this.artistId}`);
    }
}

export {
    ArtistsRequest,
    ArtistInfoRequest
}
