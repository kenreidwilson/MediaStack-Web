import Tag from '../types/Tag';
import GenericRepository from './GenericRepository';

export default class TagRepository extends GenericRepository<Tag> {
    constructor() {
        super('tags');
    }
}
