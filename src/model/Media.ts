import Tag from './Tag';

export default interface Media {
    ID: number,
    CategoryID?: number,
    ArtistID?: number,
    AlbumID?: number,
    Tags: Tag[],
    Hash: string,
    Type: number,
    Created: string,
    AlbumOrder: number,
    Score: number,
    Source: string
}