import Tag from '../types/Tag';
import IAPI from '../types/IAPI';
import GenericRepository from './GenericRepository';

export default class TagRepository extends GenericRepository<Tag> {
    constructor(api: IAPI) {
        super(api, 'tags');
    }
}
