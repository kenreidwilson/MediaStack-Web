import Tag from '../../types/Tag';
import GenericFakeRepository from './GenericFakeRepository';
import { SeedTags } from '../SeedData/SeedTags';

export default class FakeTagRepository extends GenericFakeRepository<Tag> {

    constructor() {
        super("tags", SeedTags);
    };
}
