import Media from './Media';

export default interface IMediaFileLinkGenerator {
    
    getFileLink(media: Media): string;
    
    getThumbnailLink(media: Media): string;
}
