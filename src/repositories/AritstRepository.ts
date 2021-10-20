import Artist from '../types/Artist';
import IAPI from '../types/IAPI';
import GenericRepository from './GenericRepository';

export default class ArtistRepository extends GenericRepository<Artist> {
    constructor(api: IAPI) {
        super(api, 'artists');
    }
}
