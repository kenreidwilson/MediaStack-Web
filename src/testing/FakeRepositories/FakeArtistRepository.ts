import Artist from '../../types/Artist';
import IKeyBasedAPI from '../../types/IKeyBasedAPI';
import GenericFakeRepository from './GenericFakeRepository';
import { SeedArtists } from '../SeedData/SeedArtists';

export default class FakeArtistRepository extends GenericFakeRepository<Artist> {

    constructor(api: IKeyBasedAPI) {
        super(api, "artists", SeedArtists);
    };
}
