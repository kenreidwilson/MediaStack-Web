import BaseRequest from './BaseRequest'
import API from '../API';
import Album from '../../model/Album';
import AlbumEditRequest from './RequestModels/AlbumEditRequest';

const primaryResource = "/albums/"

class AlbumsRequest extends BaseRequest {
    send() {
        return  API.get<Album[]>(`${this.baseURL}/albums`);
    }
}

class AlbumInfoRequest extends BaseRequest {
    albumId: number;

    constructor(albumId: number) {
        super();
        this.albumId = albumId;
    }

    send() {
        return API.get<Album>(`${this.baseURL}${primaryResource}${this.albumId}`);
    }
}

class AlbumInfoChangeRequest extends BaseRequest {
    albumId: number;
    albumInfo: AlbumEditRequest;

    constructor(albumId: number, albumInfo: AlbumEditRequest) {
        super();
        this.albumId = albumId;
        this.albumInfo = albumInfo
    }

    send() {
        return API.put<Album>(`${this.baseURL}${primaryResource}${this.albumId}`, this.albumInfo);
    }
}

export {
    AlbumsRequest,
    AlbumInfoRequest,
    AlbumInfoChangeRequest
}
