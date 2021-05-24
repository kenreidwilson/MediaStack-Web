import Media from "../../model/Media";

export default interface MediaSearchResponseData {
    media: Media[],
    count: number,
    total: number,
    offset: number
}