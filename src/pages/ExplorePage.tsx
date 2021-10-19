import { useEffect } from 'react';
import BasePage from './BasePage';
import MockTagRepository from '../repositories/Mocks/MockTagRepository';

export default function ExplorePage() {

    const mtr = new MockTagRepository();

    useEffect(() => {
        mtr.get(3).then(console.log);
    }, [])

    return (
        <BasePage>
            <h2></h2>
        </BasePage>
    );
};
