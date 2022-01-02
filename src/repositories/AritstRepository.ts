import { Artist, IRestAPI } from '../types';
import GenericRepository from './GenericRepository';

export default class ArtistRepository extends GenericRepository<Artist> {
    constructor(api: IRestAPI) {
        super(api, 'artists');
    }
}
