import TagsTable from '../components/TagsTable';
import { IMediaSearchQuery } from '../repositories/MediaRepository';
import BasePage from './BasePage';

export default function TagsPage() {
    return ( 
        <BasePage>
            <TagsTable onTagClick={(searchQuery: IMediaSearchQuery) => console.log(searchQuery)}/>
        </BasePage>
     );
}
