import { Album, AlbumSearchQuery, AlbumUpdateRequest, IKeyBasedAPI, Media, MediaUpdateRequest, SearchResponse } from '../../types';
import { manageTags } from '../../repositories/DomainHelpers';
import BaseFakeRepository from './BaseFakeRepository';
import { SeedAlbums } from '../SeedData/SeedAlbums';
import FakeMediaRepository from './FakeMediaRepository';

export default class FakeAlbumRepository extends BaseFakeRepository<Album, AlbumSearchQuery, AlbumUpdateRequest> {

    constructor(api: IKeyBasedAPI) {
        super(api, "albums", SeedAlbums);
    }

    search(query: AlbumSearchQuery): Promise<SearchResponse<Album>> {
        return this.API.get<Album[]>(this.entitiesKey)
            .then(entities => {

                if (!query.offset) {
                    query.offset = 0;
                }
        
                if (!query.count) {
                    query.count = 5;
                }

                if (query.name) {
                    entities = entities.filter(e => e.name === query.name);
                }

                if (query.artistId) {
                    entities = entities.filter(e => e.artistID === query.artistId);
                }

                let responeData = entities.slice(query.offset).slice(0, query.count);

                return {
                    data: responeData,
                    total: entities.length,
                    count: responeData.length,
                    offset: query.offset
                };
        });
    }

    async update(updateRequest: AlbumUpdateRequest): Promise<Album> {
        let fmr = new FakeMediaRepository(this.API);
        let albumMedia: Media[] = (await fmr.search({ albumID: updateRequest.ID, mode: 1, count: 9999 })).data;

        for (let media of albumMedia) {
            let mediaUpdateRequest: MediaUpdateRequest = { ID: media.id, score: updateRequest.score, source: updateRequest.source };

            if (updateRequest.removeTagIDs !== undefined || updateRequest.addTagIDs !== undefined) {
                mediaUpdateRequest.tagIDs = manageTags(
                    media.tags, 
                    updateRequest.addTagIDs?.map(tid => ({ name: '', id: tid })),
                    updateRequest.removeTagIDs?.map(tid => ({ name: '', id: tid }))
                    ).map(t => t.id);
            }

            await fmr.update(mediaUpdateRequest);
        }

        return this.get(updateRequest.ID);
    }
}
