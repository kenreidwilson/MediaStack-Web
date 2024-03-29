import { MediaSearchQuery } from '../types';
import useNavigation from '../hooks/useNavigation';
import BasePage from './BasePage';
import MediaSearchMenu from '../components/Menus/MediaSearchMenu'

export default function IndexPage() {

    const { navigate } = useNavigation();

    return (
        <BasePage>
            <MediaSearchMenu 
                initialQuery={{ mode: 2 }}
                onSearch={(searchQuery: MediaSearchQuery) => navigate({name: 'search', data: searchQuery })}/>
        </BasePage>
    );
};
