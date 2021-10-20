import Artist from '../../types/Artist';
import GenericFakeRepository from './GenericFakeRepository';

export default class FakeArtistRepository extends GenericFakeRepository<Artist> {

    constructor() {
        super("artists", [
            { name: "artist1", id: 1 },
            { name: "artist2", id: 2 }
        ]);
    };
}
