import { useContext } from 'react';
import { DependencyContext } from '../contexts/DependencyContext';
import useRepository from './useRepository';

export default function useMedia() {
    const { mediaRepository } = useContext(DependencyContext);
    return useRepository(mediaRepository!);
}
