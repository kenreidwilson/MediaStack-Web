import Album from "../../model/Album";

export default interface AlbumsSearchResponse {
    albums: Album[],
    count: number,
    total: number,
    offset: number
}