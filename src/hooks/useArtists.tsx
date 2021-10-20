import { useContext } from 'react';
import { DependencyContext } from '../contexts/DependencyContext';
import useRepository from './useRepository';

export default function useArtists() {
    const { artistRepository } = useContext(DependencyContext);
    return useRepository(artistRepository!);
}
