import TagsTable from '../components/TagsTable';
import useNavigation from '../hooks/useNavigation';
import { IMediaSearchQuery } from '../repositories/MediaRepository';
import BasePage from './BasePage';

export default function TagsPage() {

    const { navigate } = useNavigation();

    return ( 
        <BasePage>
            <TagsTable onTagClick={(searchQuery: IMediaSearchQuery) => navigate("/search", searchQuery)}/>
        </BasePage>
     );
}
