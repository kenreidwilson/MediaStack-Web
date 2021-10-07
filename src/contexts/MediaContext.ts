import { createContext } from "react";
import { IMediaSearchQuery } from "../repositories/MediaRepository";

interface IMediaContext {
    getQuery: () => IMediaSearchQuery,
    setQuery: (query: IMediaSearchQuery) => void
}

export const MediaContext = createContext<IMediaContext>({ 
    getQuery: () => { throw new Error("Not Implemented") }, 
    setQuery: () => { throw new Error("Not Implemented") } 
});
