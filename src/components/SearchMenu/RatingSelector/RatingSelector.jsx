import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

import './RatingSelector.css';

export default class RatingSelector extends Component {
    state = {
        isOpen: false,
        ratingValue: 0,
        ratingComparator: null,
        dropdownLabel: "Any"
      };

      options = [
        {'label': "Any", 'value':null},
        {'label': "Equal", 'value':"score"},
        {'label': "Greater than", 'value':'score_greater_than'},
        {'label': "Less than", 'value':'score_less_than'}
      ]

      onStarClick(nextValue) {
        let newValue = nextValue === this.props.ratingValue ? 0 : nextValue;
        this.setState({ ratingValue : newValue }, () => {
          this.props.onChange(this.getRatingQuery()); 
        })
      }

      onComparatorClick(comparatorOption) {
        this.setState({ ratingComparator : comparatorOption.value, dropdownLabel : comparatorOption.label}, () => {
          this.props.onChange(this.getRatingQuery());
        })
      }

      getRatingQuery = () => {
        return this.state.ratingComparator ? {'comparator': this.state.ratingComparator, 'value': this.state.ratingValue} : null;
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
                        key={option.value}
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
                  starCount={5}
                  value={this.props.ratingValue}
                  onStarClick={this.onStarClick.bind(this)}
              />
            </div>
          </div>
        );
      }
}
