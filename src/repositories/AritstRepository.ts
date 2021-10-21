import Artist from '../types/Artist';
import IRestAPI from '../types/IRestAPI';
import GenericRepository from './GenericRepository';

export default class ArtistRepository extends GenericRepository<Artist> {
    constructor(api: IRestAPI) {
        super(api, 'artists');
    }
}
