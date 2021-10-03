import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';

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
                <StarRatingComponent 
                    name="mediaScore" 
                    starCount={5}
                    value={rating}
                    onStarClick={handleScoreEdit}
                    />
                {isLoading ? <Spinner style={{marginLeft: '3px'}} animation="border" variant="primary" size="sm"/> : null}
            </div>
        </React.Fragment>
     );
}
