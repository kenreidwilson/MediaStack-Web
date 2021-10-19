import ISearchQuery from './ISearchQuery';

export default interface IMediaSearchQuery extends ISearchQuery {
    categoryID?: number;
    blacklistCategoryIDs?: number[];
    artistID?: number;
    blacklistArtistsIDs?: number[];
    albumID?: number;
    blacklistAlbumIDs?: number[];
    whitelistTagIDs?: number[];
    blacklistTagIDs?: number[];
    score?: number;
    lessThanScore?: number;
    greaterThanScore?: number;
    sortBy?: string;
    type?: number;
    mode?: number;
}
