import Artist from '../../types/Artist';
import GenericMockRepository from './GenericMockRepository';

export default class MockArtistRepository extends GenericMockRepository<Artist> {

    constructor() {
        super("artists", [
            { name: "artist1", id: 1 },
            { name: "artist2", id: 2 }
        ]);
    };
}
