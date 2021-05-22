export default class MediaEditRequestBody {
    categoryID?: number;
    artistID?: number;
    albumID?: number;
    tagIDs?: number[];
    score?: number;
    source?: string;
    albumOrder?: number;

    constructor(init?: Partial<MediaEditRequestBody>) {
        Object.assign(this, init);
    }
}