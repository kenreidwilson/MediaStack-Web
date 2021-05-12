import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

type Props = {
    handleEdit: Function,
    rating: number
}

export default class RatingSidebarElement extends Component<Props> {

    onStarClick(nextValue: number) {
        let newValue = nextValue !== this.props.rating ? nextValue : 0;
        this.props.handleEdit(newValue)
    }

    render() { 
        return (
            <React.Fragment>
                <p>Rating: </p>
                <StarRatingComponent 
                    name="mediaScore" 
                    starCount={5}
                    value={this.props.rating}
                    onStarClick={this.onStarClick.bind(this)}
                    />
            </React.Fragment>
         );
    }
}
