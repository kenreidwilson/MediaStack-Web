import { createContext } from "react";

interface IMediaContext {
    getQuery: Function,
    setQuery: Function
}

export const MediaContext = createContext<IMediaContext>({ getQuery: () => {}, setQuery: () => {} });