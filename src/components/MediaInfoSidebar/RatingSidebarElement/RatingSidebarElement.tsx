import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

type Props = {
    handleEdit: Function,
    rating: number
}

export default function RatingSidebarElement ({handleEdit, rating}: Props) {
    return (
        <React.Fragment>
            <p>Rating: </p>
            <StarRatingComponent 
                name="mediaScore" 
                starCount={5}
                value={rating}
                onStarClick={(nextValue: number) => handleEdit(nextValue !== rating ? nextValue : 0)}
                />
        </React.Fragment>
     );
}
