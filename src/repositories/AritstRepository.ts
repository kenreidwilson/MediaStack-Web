import Artist from "../types/Artist";
import ISearchResponse from "../types/ISearchResponse";
import GenericRepository from "./GenericRepository";

class ArtistRepository extends GenericRepository<Artist> {
    constructor() {
        super("artists");
    }
}

export {
    ArtistRepository
}
