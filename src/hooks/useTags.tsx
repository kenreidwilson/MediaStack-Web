import Tag from '../types/Tag';
import IRepository from '../types/IRepository';
import IGenericSearchQuery from '../types/IGenericSearchQuery';
import TagRepository from '../repositories/TagRepository';
import useRepository from './useRepository';

export default function useTags() {
    const tagsRepository: IRepository<Tag, IGenericSearchQuery> = new TagRepository();
    return useRepository(tagsRepository);
}
