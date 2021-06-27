export default class MediaEditRequestBody {
    ID: number = 0;
    categoryID?: number;
    artistID?: number;
    albumID?: number;
    tagIDs?: number[] = undefined;
    score?: number;
    source?: string;
    albumOrder?: number;

    constructor(init?: Partial<MediaEditRequestBody>) {
        Object.assign(this, init);
    }
}