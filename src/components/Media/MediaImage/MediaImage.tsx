import React, { Component, ReactEventHandler } from 'react';
import Media from '../../../model/Media';
import $ from 'jquery';
import './MediaImage.css';

type Props = {
    onImageClick: Function,
    onImageLoad: ReactEventHandler,
    media: Media
}

export default class MediaImage extends Component<Props> {
    
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
                <img id="mediaImage"
                    onLoad={this.props.onImageLoad} 
                    alt={this.props.media.tags.toString()} 
                    src={`${process.env.REACT_APP_API}/media/${this.props.media.id}/file`}/>
            </div>
        );
    }
}
