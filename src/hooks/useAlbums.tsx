import Album from '../types/Album';
import IRepository from '../types/IRepository';
import IAlbumSearchQuery from '../types/IAlbumSearchQuery';
import IAlbumUpdateRequest from '../types/IAlbumUpdateRequest';
import AlbumRepository from '../repositories/AlbumRepository';
import useRepository from './useRepository';
import API from '../api/API';

export default function useAlbums() {
    const albumRepository: IRepository<Album, IAlbumSearchQuery, IAlbumUpdateRequest> = new AlbumRepository(new API());
    return useRepository(albumRepository);
}
