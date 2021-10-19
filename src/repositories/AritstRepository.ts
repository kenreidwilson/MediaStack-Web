import Artist from '../types/Artist';
import GenericRepository from './GenericRepository';

export default class ArtistRepository extends GenericRepository<Artist> {
    constructor() {
        super('artists');
    }
}
