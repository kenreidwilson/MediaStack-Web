export default interface IAlbumSortRequest {
    albumID: number,
    property: 'path' | 'score'
}