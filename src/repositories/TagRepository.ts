import { IRestAPI, Tag } from '../types';
import GenericRepository from './GenericRepository';

export default class TagRepository extends GenericRepository<Tag> {
    constructor(api: IRestAPI) {
        super(api, 'tags');
    }
}
