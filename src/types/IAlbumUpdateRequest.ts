export default interface IAlbumUpdateRequest {
    ID: number;
    addTagIDs?: number[];
    removeTagIDs?: number[];
    source?: string;
    score?: number;
    categoryID? : number;
    artistID?: number;
}
