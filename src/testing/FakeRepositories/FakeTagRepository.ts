import { IKeyBasedAPI, Tag } from '../../types';
import GenericFakeRepository from './GenericFakeRepository';
import { SeedTags } from '../SeedData/SeedTags';

export default class FakeTagRepository extends GenericFakeRepository<Tag> {

    constructor(api: IKeyBasedAPI) {
        super(api, "tags", SeedTags);
    };
}
