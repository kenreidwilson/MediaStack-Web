import React, { Component } from 'react';
import $ from 'jquery'

import './MediaImage.css'

export default class MediaImage extends Component {
    
    componentDidMount = () => {
        if (typeof this.props.onImageClick !== 'undefined') {
            $("#mediaImage").on("click", (event) => {
                this.props.onImageClick(event);
            });
        }
    }

    render() { 
        return (
            <div>
                <img onLoad={this.props.onImageLoad} id="mediaImage" alt={this.props.media.tags.toString()} src={`${process.env.REACT_APP_API}${this.props.media.file}`}></img>
            </div>
        );
    }
}
