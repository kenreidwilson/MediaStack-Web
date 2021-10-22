import MediaStackRestAPI from '../api/MediaStackRestAPI';
import TagRepository from '../repositories/TagRepository';
import ArtistRepository from '../repositories/AritstRepository';
import CategoryRepository from '../repositories/CategoryRepository';
import MediaRepository from '../repositories/MediaRepository';
import AlbumRepository from '../repositories/AlbumRepository';
import MediaFileLinkGenerator from '../repositories/MediaFileLinkGenerator';
import FakeTagRepository from '../testing/FakeRepositories/FakeTagRepository';
import FakeMediaRepository from '../testing/FakeRepositories/FakeMediaRepository';
import IKeyBasedAPI from '../types/IKeyBasedAPI';
import SessionStorageAPI from '../testing/KeyBasedAPIs/SessionStorageAPI';
import LocalStorageAPI from '../testing/KeyBasedAPIs/LocalStorageAPI';
import FakeAlbumRepository from '../testing/FakeRepositories/FakeAlbumRepository';
import FakeArtistRepository from '../testing/FakeRepositories/FakeArtistRepository';
import FakeCategoryRepository from '../testing/FakeRepositories/FakeCategoryRepository';
import FakeMediaFileLinkGenerator from '../testing/FakeRepositories/FakeMediaFileLinkGenerator';
import { IDependencyContext } from '../contexts/DependencyContext';

export default function useDependencies(): IDependencyContext {
    
    const fakeApi: IKeyBasedAPI = ((): IKeyBasedAPI => {
        switch(process.env.FAKE_API_TYPE) {
            case('memory'):
                throw new Error("Not Implemented.");
            case('local'):
                return new LocalStorageAPI();
            default:
                return new SessionStorageAPI();
        }
    })();

    const fakeDependencies: IDependencyContext = { 
        tagsRepository: new FakeTagRepository(fakeApi),
        artistRepository: new FakeArtistRepository(fakeApi),
        categoryRepository: new FakeCategoryRepository(fakeApi),
        mediaRepository: new FakeMediaRepository(fakeApi), 
        albumRepository: new FakeAlbumRepository(fakeApi),
        mediaFileLinkGenerator: new FakeMediaFileLinkGenerator()
    };

    const realDependencies: IDependencyContext = {
        tagsRepository: new TagRepository(new MediaStackRestAPI()),
        artistRepository: new ArtistRepository(new MediaStackRestAPI()),
        categoryRepository: new CategoryRepository(new MediaStackRestAPI()),
        mediaRepository: new MediaRepository(new MediaStackRestAPI()), 
        albumRepository: new AlbumRepository(new MediaStackRestAPI()),
        mediaFileLinkGenerator: new MediaFileLinkGenerator(process.env.REACT_APP_API!)
    }

    const useRealDependencies: boolean = process.env.REACT_APP_API !== undefined;

    return useRealDependencies ? realDependencies : fakeDependencies;
}
