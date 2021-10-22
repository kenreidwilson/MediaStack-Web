import IMediaFileLinkGenerator from '../types/IMediaFileLinkGenerator';
import { useContext } from 'react';
import { DependencyContext } from '../contexts/DependencyContext';

export default function useMediaFiles(): IMediaFileLinkGenerator {

    const { mediaFileLinkGenerator } = useContext(DependencyContext);

    return { 
        getFileLink: (m) => mediaFileLinkGenerator.getFileLink(m),
        getThumbnailLink: (m) => mediaFileLinkGenerator.getThumbnailLink(m)
    }
}
