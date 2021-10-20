import { useContext } from 'react';
import { DependencyContext } from '../contexts/DependencyContext';
import useRepository from './useRepository';

export default function useTags() {
    const { tagsRepository } = useContext(DependencyContext);
    return useRepository(tagsRepository!);
}
