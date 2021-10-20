import Artist from '../../types/Artist';
import GenericFakeRepository from './GenericFakeRepository';
import { SeedArtists } from '../SeedData/SeedArtists';

export default class FakeArtistRepository extends GenericFakeRepository<Artist> {

    constructor() {
        super("artists", SeedArtists);
    };
}
