import { useEffect } from 'react';
import BasePage from './BasePage';
import MockTagRepository from '../testing/MockRepositories/MockTagRepository';

export default function ExplorePage() {

    const mtr = new MockTagRepository();

    useEffect(() => {
        mtr.search({ count: 1 }).then(console.log);
    }, [])

    return (
        <BasePage>
            <h2></h2>
        </BasePage>
    );
};
