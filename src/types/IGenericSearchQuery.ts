import ISearchQuery from '../types/ISearchQuery';

export default interface IGenericSearchQuery extends ISearchQuery {
    name?: string;
}