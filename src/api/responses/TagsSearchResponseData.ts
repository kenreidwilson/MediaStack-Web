import Tag from "../../model/Tag";

export default interface TagsSearchResponseData {
    tags: Tag[],
    count: number,
    total: number,
    offset: number
}