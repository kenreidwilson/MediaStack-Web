import Album from '../types/Album';
import IRepository from '../types/IRepository';
import IAlbumSearchQuery from '../types/IAlbumSearchQuery';
import IAlbumUpdateRequest from '../types/IAlbumUpdateRequest';
import AlbumRepository from '../repositories/AlbumRepository';
import useRepository from './useRepository';

export default function useAlbums() {
    const albumRepository: IRepository<Album, IAlbumSearchQuery, IAlbumUpdateRequest> = new AlbumRepository();
    return useRepository(albumRepository);
}
