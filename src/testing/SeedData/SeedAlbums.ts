import { Album } from "../../types";

export const SeedAlbums: Album[] = ((): Album[] => {
    return [
        { id: 1, name: "Night", artistID: 6 }, 
        { id: 2, name: "Drawings", artistID: 7 }, 
        { id: 3, name: "Landscapes", artistID: 13 }
    ];
})();
