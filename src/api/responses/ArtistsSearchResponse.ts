import Artist from "../../model/Artist";

export default interface ArtistsSearchResponse {
    artists: Artist[],
    count: number,
    total: number,
    offset: number
}