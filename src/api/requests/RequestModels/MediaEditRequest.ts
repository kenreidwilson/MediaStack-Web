export default class MediaEditRequest {
    categoryID?: number;
    artistID?: number;
    albumID?: number;
    tagIDs?: number[];
    score?: number;
    source?: string;
    albumOrder?: number;
}