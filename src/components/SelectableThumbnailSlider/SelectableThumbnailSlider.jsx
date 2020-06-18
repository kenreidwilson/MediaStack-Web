import React, { Component } from 'react';
import $ from 'jquery'

import SelectableThumbnails from '../SelectableThumbnails/SelectableThumbnails';

import './SelectableThumbnailSlider.css'

export default class SelectableThumbnailSlider extends Component {

    componentDidMount = () => {
        this.scroll = this.scroll.bind(this);
    }

    scroll = (direction) => {
        let far = $('#thumbnailslider-image-container').width()/2*direction;
        let pos = $('#thumbnailslider-image-container').scrollLeft() + far;
        $('#thumbnailslider-image-container').animate( { scrollLeft: pos }, 1000)
    }

    render() { 
        return (
            <div id="thumbnail-slider">
                <a id="thumbnailslider-nav-next" onClick={this.scroll.bind(null,-1)}>&#10094;&#10094;&#10094;</a>
                <div id="thumbnailslider-image-container">
                    <SelectableThumbnails 
                        mediaNumber={this.props.mediaNumber}
                        onThumbnailClick={this.props.onThumbnailClick}
                        mediaList={this.props.mediaList}
                    />
                </div>
                <a id="thumbnailslider-nav-prev" onClick={this.scroll.bind(null,1)}>&#10095;&#10095;&#10095;</a>
            </div>
        )
    }
}