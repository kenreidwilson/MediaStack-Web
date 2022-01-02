import { createContext } from 'react';
import { Album, AlbumSearchQuery, AlbumUpdateRequest, Artist, Category, GenericSearchQuery, 
    IMediaFileLinkGenerator, IRepository, Media, MediaSearchQuery, MediaUpdateRequest, 
    Tag } from '../types';

export interface IDependencyContext {
    categoryRepository?: IRepository<Category, GenericSearchQuery>,
    artistRepository?: IRepository<Artist, GenericSearchQuery>,
    tagsRepository?: IRepository<Tag, GenericSearchQuery>,
    mediaRepository?: IRepository<Media, MediaSearchQuery, MediaUpdateRequest>,
    albumRepository?: IRepository<Album, AlbumSearchQuery, AlbumUpdateRequest>,
    mediaFileLinkGenerator?: IMediaFileLinkGenerator
}

export const DependencyContext = createContext<IDependencyContext>({});
