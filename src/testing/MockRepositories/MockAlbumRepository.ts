import Album from '../../types/Album';
import IAlbumSearchQuery from '../../types/IAlbumSearchQuery';
import IAlbumUpdateRequest from '../../types/IAlbumUpdateRequest';
import ISearchResponse from '../../types/ISearchResponse';
import BaseMockRepository from "./BaseMockRepository";

export default class MockAlbumRepository extends BaseMockRepository<Album, IAlbumSearchQuery, IAlbumUpdateRequest> {

    search(query: IAlbumSearchQuery): Promise<ISearchResponse<Album>> {
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

    update(updateRequest: IAlbumUpdateRequest): Promise<Album> {
        throw new Error('Method not implemented.');
    }
}
