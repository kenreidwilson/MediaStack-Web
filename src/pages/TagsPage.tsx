import IMediaSearchQuery from '../types/IMediaSearchQuery';
import useNavigation from '../hooks/useNavigation';
import BasePage from './BasePage';
import TagsTable from '../components/TagsTable';

export default function TagsPage() {

    const { navigate } = useNavigation();

    return ( 
        <BasePage>
            <TagsTable onTagClick={(searchQuery: IMediaSearchQuery) => navigate('/search', searchQuery)}/>
        </BasePage>
     );
}
