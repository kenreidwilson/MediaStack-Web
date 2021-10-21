import Tag from '../types/Tag';
import IRestAPI from '../types/IRestAPI';
import GenericRepository from './GenericRepository';

export default class TagRepository extends GenericRepository<Tag> {
    constructor(api: IRestAPI) {
        super(api, 'tags');
    }
}
