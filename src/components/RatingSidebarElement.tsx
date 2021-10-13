import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import RatingValueSelect from './RatingValueSelect';

type Props = {
    handleEdit: Function,
    rating: number
}

export default function RatingSidebarElement ({handleEdit, rating}: Props) {

    const [isLoading, setIsLoading] = useState(false);

    const handleScoreEdit = async (nextValue: number) => {
        setIsLoading(true);
        await handleEdit(nextValue !== rating ? nextValue : 0);
        setIsLoading(false);
    }

    return (
        <React.Fragment>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <p style={{marginRight: '5px'}}>Rating:</p>
                <RatingValueSelect ratingValue={rating} onChange={handleScoreEdit} />
                {isLoading ? <Spinner style={{marginLeft: '3px'}} animation="border" variant="primary" size="sm"/> : null}
            </div>
        </React.Fragment>
     );
}
