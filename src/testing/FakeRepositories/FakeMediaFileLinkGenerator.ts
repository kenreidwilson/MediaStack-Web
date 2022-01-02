import { IMediaFileLinkGenerator, Media } from "../../types";

export default class FakeMediaFileLinkGenerator implements IMediaFileLinkGenerator {

    getFileLink(media: Media): string {
        return `images/${media.hash}.jpg`;
    }

    getThumbnailLink(media: Media): string {
        return `images/${media.hash}.jpg`;
    }
}
