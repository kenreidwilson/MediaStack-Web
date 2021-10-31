import IMediaFileLinkGenerator from '../types/IMediaFileLinkGenerator';
import { useContext } from 'react';
import { DependencyContext } from '../contexts/DependencyContext';

export default function useMediaFiles(): IMediaFileLinkGenerator {

    const { mediaFileLinkGenerator } = useContext(DependencyContext);

    return { 
        getFileLink: mediaFileLinkGenerator ?  
            (m) => mediaFileLinkGenerator.getFileLink(m) : 
            () => { throw new Error("Unable to resolve MediaFileLinkGenerator") },
        getThumbnailLink: mediaFileLinkGenerator ? 
            (m) => mediaFileLinkGenerator.getThumbnailLink(m) : 
            () => { throw new Error("Unable to resolve MediaFileLinkGenerator") }
    }
}
