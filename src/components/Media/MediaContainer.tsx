import React, { Component, ReactEventHandler } from 'react';
import MediaVideo from './MediaVideo/MediaVideo'
import MediaImage from './MediaImage/MediaImage'
import Media from '../../model/Media';
import './MediaContainer.css'

type Props = {
    media: Media,
    onLoad: ReactEventHandler,
    onClick: Function
}

export default class MediaContainer extends Component<Props> {
    getMediaComponent = () => {
        switch(this.props.media.Type) {
            case 0:
                return <MediaImage 
                    onImageLoad={this.props.onLoad}
                    onImageClick={this.props.onClick}
                    media={this.props.media}
                />;
            case 1:
                return <MediaImage 
                    onImageLoad={this.props.onLoad}
                    onImageClick={this.props.onClick}
                    media={this.props.media}
                />;
            case 2:
                return <MediaVideo 
                    onLoad={this.props.onLoad}
                    media={this.props.media}
                />;
            default:
                return null;
        }
    }

    render() { 
        if (this.props.media === null) {
            return null;
        }
        return (
            <div id="media">
                {this.getMediaComponent()}
            </div>
        );
    }
}
