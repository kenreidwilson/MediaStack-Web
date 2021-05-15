import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

import './RatingSelector.css';

type RatingComparator = {
  value?: string,
  label: string
}

type Props = {
  ratingValue: number,
  onChange: Function
}

type State = {
  isOpen: boolean,
  dropdownLabel: string,
  selectedComparator: RatingComparator
}

export default class RatingSelector extends Component<Props, State> {
    options: RatingComparator[] = [
      {'label': "Any", 'value': undefined},
      {'label': "Equal", 'value':"score"},
      {'label': "Greater than", 'value':'greaterThanScore'},
      {'label': "Less than", 'value':'lessThanScore'}
    ]

    state = {
        isOpen: false,
        dropdownLabel: "Any",
        selectedComparator: this.options[0]
      };

      onStarClick(nextValue: number) {
        let newValue = nextValue === this.props.ratingValue ? 0 : nextValue;
        this.props.onChange(newValue, this.state.selectedComparator.value);
      }

      onComparatorClick(comparatorOption: RatingComparator) {
        this.setState({ selectedComparator : comparatorOption, dropdownLabel : comparatorOption.label});
      }
    
      render() {
        return (
        <div id="rating_selector">
            <div id="rating_selector_dropdown" className="dropdown" onClick={() => this.setState({ isOpen: !this.state.isOpen })}>
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                >
                {this.state.dropdownLabel}
                </button>
                <div className={`dropdown-menu${this.state.isOpen ? " show" : ""}`} aria-labelledby="dropdownMenuButton">
                    {this.options.map(option => 
                      <a 
                        key={option.value as string}
                        className="dropdown-item" 
                        onClick={() => this.onComparatorClick(option)} 
                        href="#nogo">
                          {option.label}
                      </a>
                    )}
                </div>
            </div>
            <div id="rating_selector_stars">
              <StarRatingComponent 
                  name="rating"
                  starCount={5}
                  value={this.props.ratingValue}
                  onStarClick={this.onStarClick.bind(this)}
              />
            </div>
          </div>
        );
      }
}
