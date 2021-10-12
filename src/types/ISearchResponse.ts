export default interface ISearchResponse<TEntity> {
    data: TEntity[],
    count: number,
    total: number,
    offset: number
}
