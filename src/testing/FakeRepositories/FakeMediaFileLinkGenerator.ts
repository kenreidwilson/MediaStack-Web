import IMediaFileLinkGenerator from '../../types/IMediaFileLinkGenerator';
import Media from '../../types/Media';

export default class FakeMediaFileLinkGenerator implements IMediaFileLinkGenerator {

    getFileLink(media: Media): string {
        return `images/${media.hash}.jpg`;
    }

    getThumbnailLink(media: Media): string {
        return `images/${media.hash}.jpg`;
    }
}
