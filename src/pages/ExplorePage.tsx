import { useEffect } from 'react';
import BasePage from './BasePage';
import FakeTagRepository from '../testing/FakeRepositories/FakeTagRepository';

export default function ExplorePage() {

    const mtr = new FakeTagRepository();

    useEffect(() => {
        mtr.search({ count: 1 }).then(console.log);
    }, [])

    return (
        <BasePage>
            <h2></h2>
        </BasePage>
    );
};
