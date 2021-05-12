export default class MediaSearchQuery {
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
    type?: number
    offset: number;
    count: number ;
    searchMode: number;

    constructor(init?: Partial<MediaSearchQuery>) {
        this.offset = 0;
        this.count = 5;
        this.searchMode = 0;
        Object.assign(this, init);
    }
}
