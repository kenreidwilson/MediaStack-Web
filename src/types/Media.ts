import Tag from './Tag';

export default interface Media {
    id: number,
    categoryID?: number,
    artistID?: number,
    albumID?: number,
    tags: Tag[],
    hash: string,
    type: 1 | 2 | 3,
    created: string,
    albumOrder: number,
    score: number,
    source: string
}
