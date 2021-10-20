import Media from '../../types/Media';
import { SeedAlbums } from './SeedAlbums';
import { SeedArtists } from './SeedArtists';
import { SeedCategories } from './SeedCategories';
import { SeedTags } from './SeedTags';

export const SeedMedia: Media[] = ((): Media[] => {

    const categories = SeedCategories;
    const artists = SeedArtists;
    const albums = SeedAlbums;
    const tags = SeedTags;

    return [];
})();
