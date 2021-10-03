import Artist from "../types/Artist";
import ISearchResponse from "../api/ISearchResponse";
import GenericRepository from "./GenericRepository";

interface IArtistSearchResponse extends ISearchResponse {
    artists: Artist[]
}

class ArtistRepository extends GenericRepository<Artist, IArtistSearchResponse> {
    constructor() {
        super("artists");
    }
}

export type {
    IArtistSearchResponse
}

export {
    ArtistRepository
}
