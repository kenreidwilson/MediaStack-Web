import { useContext } from 'react';
import { DependencyContext } from '../contexts/DependencyContext';
import useRepository from './useRepository';

export default function useCategories() {
    const { categoryRepository } = useContext(DependencyContext);
    return useRepository(categoryRepository!);
}
