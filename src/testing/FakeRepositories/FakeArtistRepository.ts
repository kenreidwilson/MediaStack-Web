import { Artist, IKeyBasedAPI } from '../../types';
import GenericFakeRepository from './GenericFakeRepository';
import { SeedArtists } from '../SeedData/SeedArtists';

export default class FakeArtistRepository extends GenericFakeRepository<Artist> {

    constructor(api: IKeyBasedAPI) {
        super(api, "artists", SeedArtists);
    };
}
