import Tag from "../types/Tag";
import GenericRepository from "./GenericRepository";

class TagRepository extends GenericRepository<Tag> {
    constructor() {
        super("tags");
    }
}

export {
    TagRepository
}
