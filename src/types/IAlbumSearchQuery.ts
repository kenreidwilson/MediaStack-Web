import ISearchQuery from './ISearchQuery';

export default interface IAlbumSearchQuery extends ISearchQuery {
    name?: string,
    artistId?: number
}
