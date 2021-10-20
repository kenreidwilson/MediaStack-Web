import { useContext } from 'react';
import { DependencyContext } from '../contexts/DependencyContext';
import useRepository from './useRepository';

export default function useAlbums() {
    const { albumRepository } = useContext(DependencyContext);
    return useRepository(albumRepository!);
}
