import IMediaFileLinkGenerator from '../types/IMediaFileLinkGenerator';
import Media from '../types/Media';

export default class MediaFileLinkGenerator implements IMediaFileLinkGenerator {

    APIUrl: string;

    constructor(APIUrl: string) {
        this.APIUrl = APIUrl;
    }

    getFileLink(media: Media): string {
        return `${this.APIUrl}/media/file?id=${media.id}`;
    }

    getThumbnailLink(media: Media): string {
        return `${this.APIUrl}/media/thumbnail?id=${media.id}`;
    }
}
