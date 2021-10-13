import { IMediaSearchQuery, IMediaUpdateRequest, MediaRepository } from "../repositories/MediaRepository";
import IRepository from "../types/IRepository";
import Media from "../types/Media";
import useRepository from "./useRepository";

export function useMedia() {

    const mediaRepository: IRepository<Media, IMediaSearchQuery, IMediaUpdateRequest> = new MediaRepository();
    return useRepository(mediaRepository);
}
