import Media from '../../types/Media';
import Tag from '../../types/Tag';
import IKeyBasedAPI from '../../types/IKeyBasedAPI';
import ISearchResponse from '../../types/ISearchResponse';
import IMediaSearchQuery from '../../types/IMediaSearchQuery';
import IMediaUpdateRequest from '../../types/IMediaUpdateRequest';
import BaseFakeRepository from './BaseFakeRepository';
import { SeedMedia } from '../SeedData/SeedMedia';
import FakeTagRepository from './FakeTagRepository';
import FakeAlbumRepository from './FakeAlbumRepository';

export default class FakeMediaRepository extends BaseFakeRepository<Media, IMediaSearchQuery, IMediaUpdateRequest> {

    constructor(api: IKeyBasedAPI) {
        super(api, "media", SeedMedia);
    }

    search(query: IMediaSearchQuery): Promise<ISearchResponse<Media>> {
        return this.API.get<Media[]>(this.entitiesKey).then(entities => {

            if (!query.offset) {
                query.offset = 0;
            }
    
            if (!query.count) {
                query.count = 5;
            }

            let allEntities = [...entities];

            switch(query.mode) {
                case (2):
                    entities = entities.filter(m => !m.albumID || m.albumOrder === 0);
                    break;
                case (3):
                    entities = entities.filter(m => !m.albumID);
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
            if (query.lessThanScore) entities = entities.filter(m => m.score < query.lessThanScore!);
            if (query.greaterThanScore) entities = entities.filter(m => m.score > query.greaterThanScore!);

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

    async update(updateRequest: IMediaUpdateRequest): Promise<Media> {

        let ftr = new FakeTagRepository(this.API);
        let newTags: Promise<Tag[]> | undefined;
        if (updateRequest.tagIDs) {
            newTags = Promise.all(updateRequest.tagIDs.map(tagid => ftr.get(tagid)));
        }

        let media = await this.get(updateRequest.ID);

        if (updateRequest.categoryID) media.categoryID = updateRequest.categoryID;

        if (updateRequest.artistID && media.categoryID) {
            media.artistID = updateRequest.artistID;
        } else if (updateRequest.artistID) {
            throw Error('Bad Request');
        }

        if (updateRequest.albumID && media.artistID) {
            let afr = new FakeAlbumRepository(this.API);
            let album = await afr.get(updateRequest.albumID);
            if (album.artistID != media.artistID) {
                throw new Error('Bad Request');
            }
            media.albumID = updateRequest.albumID;
        } else if (updateRequest.albumID) {
            throw new Error('Bad Request');
        }

        if (updateRequest.albumOrder) media.albumOrder = updateRequest.albumOrder;
        if (updateRequest.score) media.score = updateRequest.score;
        if (updateRequest.source) media.source = updateRequest.source;
        
        if (newTags) media.tags = await newTags;

        return this.API.get<Media[]>(this.entitiesKey)
            .then(entities => {
                entities = entities.filter(et => et.id !== updateRequest.ID);
                entities.push(media);
                this.API.set(this.entitiesKey, entities).then(_ => media);
                return media;
            });
    }
}
