import { AlbumRepository, IAlbumSearchQuery, IAlbumUpdateRequest } from "../repositories/AlbumRepository";
import Album from "../types/Album";
import IRepository from "../types/IRepository";
import useRepository from "./useRepository";

export default function useAlbums() {

    const albumRepository: IRepository<Album, IAlbumSearchQuery, IAlbumUpdateRequest> = new AlbumRepository();
    return useRepository(albumRepository);
}
