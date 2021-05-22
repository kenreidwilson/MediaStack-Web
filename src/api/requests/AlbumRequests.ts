import BaseRequest from './BaseRequest'
import API from '../API';
import Album from '../../model/Album';
import AlbumEditRequest from './RequestBodies/AlbumEditRequestBody';
import MediaEditRequestBody from './RequestBodies/MediaEditRequest';
import { SearchRequest } from './SearchRequests';
import MediaSearchQuery from './RequestBodies/MediaSearchQuery';
import Tag from '../../model/Tag';
import { MediaInfoChangeRequest } from './MediaRequests';

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
    albumID: number;
    requestBody: AlbumEditRequest;

    constructor(albumID: number, requestBody: AlbumEditRequest) {
        super();
        this.albumID = albumID;
        this.requestBody = requestBody
    }

    send() {
        return new SearchRequest(new MediaSearchQuery({albumID: this.albumID})).send().then(async (response) => {
            for (const media of response) {
                let mediaRequestBody: MediaEditRequestBody = 
                    new MediaEditRequestBody({score: this.requestBody.score, source: this.requestBody.source});
                let tags: Tag[] = [...media.tags];
                let newTagIDs: number[] = [];

                tags.forEach(tag => {
                    if (!this.requestBody.removeTagIDs?.find(tID => tID === tag.id)) {
                        newTagIDs.push(tag.id);
                    }
                });

                this.requestBody.addTagIDs?.forEach(tagID => {
                    if (!newTagIDs.find(tID => tID === tagID)) {
                        newTagIDs.push(tagID);
                    }
                })

                mediaRequestBody.tagIDs = newTagIDs;

                await new MediaInfoChangeRequest(media.id, mediaRequestBody).send();
            }
        }).then(() => { return API.get<Album>(`${this.baseURL}${primaryResource}${this.albumID}`); });
    }
}

export {
    AlbumsRequest,
    AlbumInfoRequest,
    AlbumInfoChangeRequest
}
