import React, { Component } from 'react';
import $ from 'jquery'
import SelectableThumbnails from '../SelectableThumbnails/SelectableThumbnails';
import './SelectableThumbnailSlider.css'
import Media from '../../model/Media';

type Props = {
    onThumbnailClick: Function,
    mediaList: Media[],
    mediaNumber: number
}

export default class SelectableThumbnailSlider extends Component<Props> {

    componentDidMount = () => {
        this.scroll = this.scroll.bind(this);
    }

    scroll = (direction: number) => {
        let element: JQuery<HTMLElement>
        element = $('#thumbnailslider-image-container');
        if (element !== undefined) {
            let far = element.width()! / 2 * direction;
            let pos = element.scrollLeft()! + far;
            element.animate( { scrollLeft: pos }, 1000)
        }
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