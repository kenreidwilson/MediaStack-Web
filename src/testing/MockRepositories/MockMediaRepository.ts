import Media from '../../types/Media';
import IMediaSearchQuery from '../../types/IMediaSearchQuery';
import IMediaUpdateRequest from '../../types/IMediaUpdateRequest';
import BaseMockRepository from './BaseMockRepository';
import ISearchResponse from '../../types/ISearchResponse';

export default class MockMediaRepository extends BaseMockRepository<Media, IMediaSearchQuery, IMediaUpdateRequest> {

    search(query: IMediaSearchQuery): Promise<ISearchResponse<Media>> {
        return this.API.get<Media[]>(this.entitiesKey).then(entities => {

            let allEntities = [...entities];

            switch(query.mode) {
                case (2):
                    entities = entities.filter(m => m.albumID || m.albumOrder === 0);
                    break;
                case (3):
                    entities = entities.filter(m => m.albumID);
                    break;
                default:
                    break;
            }

            if (query.categoryID) entities = entities.filter(m => m.categoryID === query.categoryID);
            if (query.artistID) entities = entities.filter(m => m.artistID === query.artistID);
            if (query.albumID) entities = entities.filter(m => m.albumID === query.albumID);
            query.blacklistCategoryIDs && query.blacklistCategoryIDs.forEach(catId => {
                entities = entities.filter(m => m.categoryID !== catId);
            });
            query.blacklistArtistsIDs && query.blacklistArtistsIDs.forEach(artId => {
                entities = entities.filter(m => m.artistID !== artId);
            });
            query.blacklistAlbumIDs && query.blacklistAlbumIDs.forEach(albId => {
                entities = entities.filter(m => m.albumID !== albId);
            });
            if (query.score) entities = entities.filter(m => m.score === query.score);
            if (query.lessThanScore) entities = entities.filter(m => m.score < query.lessThanScore);
            if (query.greaterThanScore) entities = entities.filter(m => m.score > query.greaterThanScore);

            if (query.mode === 2) {

                query.whitelistTagIDs && query.whitelistTagIDs.forEach(tagId => {
                    entities = entities.filter(m => {
                        return !m.albumID && m.tags.map(t => t.id).includes(tagId) ||
                        (m.albumID && m.albumOrder === 0 && 
                            allEntities.filter(me => me.albumID === m.albumID).forEach(am => am.tags.map(t => t.id).includes(tagId)))
                    });
                });

                query.blacklistTagIDs && query.blacklistTagIDs.forEach(tagId => {
                    entities = entities.filter(m => {
                        return !m.albumID && !m.tags.map(t => t.id).includes(tagId) ||
                        (m.albumID && m.albumOrder === 0 && 
                            allEntities.filter(me => me.albumID === m.albumID).forEach(am => !am.tags.map(t => t.id).includes(tagId)))
                    });
                });

            } else {
                query.whitelistTagIDs && query.whitelistTagIDs.forEach(tagId => {
                    entities = entities.filter(m => m.tags.map(t => t.id).includes(tagId));
                });

                query.blacklistTagIDs && query.blacklistTagIDs.forEach(tagId => {
                    entities = entities.filter(m => !m.tags.map(t => t.id).includes(tagId));
                });
            }

            //TODO: Implement SortBy.

            let responeData = entities.slice(query.offset).slice(0, query.count);

            return {
                data: responeData,
                total: entities.length,
                count: responeData.length,
                offset: query.offset
            };

        });
    }

    update(e: IMediaUpdateRequest): Promise<Media> {
        throw new Error('Method not implemented.');
    }
}
