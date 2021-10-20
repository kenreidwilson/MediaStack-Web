import API from '../api/API';
import TagRepository from '../repositories/TagRepository';
import ArtistRepository from '../repositories/AritstRepository';
import CategoryRepository from '../repositories/CategoryRepository';
import MediaRepository from '../repositories/MediaRepository';
import AlbumRepository from '../repositories/AlbumRepository';
import FakeTagRepository from '../testing/FakeRepositories/FakeTagRepository';
import FakeMediaRepository from '../testing/FakeRepositories/FakeMediaRepository';
import FakeAlbumRepository from '../testing/FakeRepositories/FakeAlbumRepository';
import FakeArtistRepository from '../testing/FakeRepositories/FakeArtistRepository';
import FakeCategoryRepository from '../testing/FakeRepositories/FakeCategoryRepository';
import { IDependencyContext } from '../contexts/DependencyContext';

export default function useDependencies(): IDependencyContext {
    
    const fakeDependencies: IDependencyContext = { 
        tagsRepository: new FakeTagRepository(),
        artistRepository: new FakeArtistRepository(),
        categoryRepository: new FakeCategoryRepository(),
        mediaRepository: new FakeMediaRepository(), 
        albumRepository: new FakeAlbumRepository()
    };

    const realDependencies: IDependencyContext = {
        tagsRepository: new TagRepository(new API()),
        artistRepository: new ArtistRepository(new API()),
        categoryRepository: new CategoryRepository(new API()),
        mediaRepository: new MediaRepository(new API()), 
        albumRepository: new AlbumRepository(new API())
    }

    const useRealDependencies: boolean = process.env.REACT_APP_API !== undefined;

    return useRealDependencies ? realDependencies : fakeDependencies;
}
