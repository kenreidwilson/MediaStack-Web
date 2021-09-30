import Tag from "../model/Tag";
import ISearchResponse from "../api/ISearchResponse";
import GenericRepository from "./GenericRepository";

interface ITagsSearchResponse extends ISearchResponse {
    tags: Tag[]
}

class TagRepository extends GenericRepository<Tag, ITagsSearchResponse> {
    constructor() {
        super("tags");
    }
}

export type {
    ITagsSearchResponse
}

export {
    TagRepository
}
