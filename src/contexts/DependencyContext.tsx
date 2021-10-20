import Media from '../types/Media';
import Tag from '../types/Tag';
import Album from '../types/Album';
import Category from '../types/Category';
import Artist from '../types/Artist';
import IRepository from '../types/IRepository';
import IGenericSearchQuery from '../types/IGenericSearchQuery';
import IMediaSearchQuery from '../types/IMediaSearchQuery';
import IMediaUpdateRequest from '../types/IMediaUpdateRequest';
import IAlbumSearchQuery from '../types/IAlbumSearchQuery';
import IAlbumUpdateRequest from '../types/IAlbumUpdateRequest';
import { createContext } from 'react';

export interface IDependencyContext {
    categoryRepository?: IRepository<Category, IGenericSearchQuery>,
    artistRepository?: IRepository<Artist, IGenericSearchQuery>,
    tagsRepository?: IRepository<Tag, IGenericSearchQuery>,
    mediaRepository?: IRepository<Media, IMediaSearchQuery, IMediaUpdateRequest>,
    albumRepository?: IRepository<Album, IAlbumSearchQuery, IAlbumUpdateRequest>
}

export const DependencyContext = createContext<IDependencyContext>({});
