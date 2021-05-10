import Tag from './Tag';

export default interface Media {
    ID: Number,
    CategoryID?: Number,
    ArtistID?: Number,
    AlbumID?: Number,
    Tags: Tag[],
    Hash: String,
    Type: Number,
    Created: String,
    AlbumOrder: Number,
    Score: Number,
    Source: String
}