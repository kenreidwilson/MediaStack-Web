import { useEffect } from 'react';
import BasePage from './BasePage';
import FakeTagRepository from '../testing/FakeRepositories/FakeTagRepository';
import SessionStorageAPI from '../testing/KeyBasedAPIs/SessionStorageAPI';

export default function ExplorePage() {

    const mtr = new FakeTagRepository(new SessionStorageAPI());

    useEffect(() => {
        mtr.search({ count: 1 }).then(console.log);
    }, [])

    return (
        <BasePage>
            <h2></h2>
        </BasePage>
    );
};
