import Tag from '../types/Tag';
import IRepository from '../types/IRepository';
import IGenericSearchQuery from '../types/IGenericSearchQuery';
import { createContext } from 'react';

export interface IDependencyContext {
    tagsRepository?: IRepository<Tag, IGenericSearchQuery>
}

export const DependencyContext = createContext<IDependencyContext>({});
