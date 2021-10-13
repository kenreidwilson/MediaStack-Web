import { IGenericSearchQuery } from "../repositories/GenericRepository";
import { TagRepository } from "../repositories/TagRepository";
import IRepository from "../types/IRepository";
import Tag from "../types/Tag";
import useRepository from "./useRepository";

export default function useTags() {

    const tagsRepository: IRepository<Tag, IGenericSearchQuery> = new TagRepository();
    return useRepository(tagsRepository);
}
