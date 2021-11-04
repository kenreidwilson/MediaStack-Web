import { useContext } from 'react';
import BasePage from './BasePage';
import { Tabs, Tab } from 'react-bootstrap';
import TagAttributeTable from '../components/PageComponents/TagAttributeTable';
import CategoryAttributeTable from '../components/PageComponents/CategoryAttributeTable';
import { ThemeContext } from '../contexts/ThemeContext';

export default function AttributesPage() {

    const { theme } = useContext(ThemeContext);

    return ( 
        <BasePage>
            <Tabs defaultActiveKey='tags' className='mb-3' variant='pills'>
                <Tab eventKey='tags' title='Tags'>
                    <TagAttributeTable />
                </Tab>
                <Tab eventKey='categories' title='Categories'>
                    <CategoryAttributeTable />
                </Tab>
                <Tab eventKey='artists' title='Artists'>
                    <p>Implement</p>
                </Tab>
                <Tab eventKey='albums' title='Albums'>
                    <p>Implement</p>
                </Tab>
            </Tabs>
        </BasePage>
     );
}
