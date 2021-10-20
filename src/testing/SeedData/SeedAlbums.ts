import Album from '../../types/Album';
import { SeedArtists } from './SeedArtists';

export const SeedAlbums: Album[] = ((): Album[] => {
    const artists = SeedArtists;
    
    return [
        { id: 1, name: "album1", artistID: artists[0].id },
        { id: 2, name: "album2", artistID: artists[1].id },
        { id: 3, name: "album3", artistID: artists[1].id }
    ];
})();
