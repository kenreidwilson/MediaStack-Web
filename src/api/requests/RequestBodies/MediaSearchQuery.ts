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
    mode: number;

    constructor(init?: Partial<MediaSearchQuery>) {
        this.offset = 0;
        this.count = 5;
        this.mode = 1;
        Object.assign(this, init);
    }
}
