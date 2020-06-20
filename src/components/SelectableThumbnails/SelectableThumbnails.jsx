import React, { Component } from 'react';
import MediaThumbnail from '../MediaThumbnail/MediaThumbnail';

import './SelectableThumbnails.css'

export default class SelectableThumbnails extends Component {

    onThumbnailClick = (index) => {
        this.setState({ mediaNumber : index });
        this.props.onThumbnailClick(index);
    }

    render() {
        if (typeof this.props.mediaList === 'undefined') {
            return null;
        }

        return ( 
            <div>
                {this.props.mediaList.map((media, index) => 
                    <a key={index} onClick={() => this.onThumbnailClick(index)}>
                        <MediaThumbnail mediaId={media.hash} classes={index === this.props.mediaNumber ? 
                            "thumbnail selected-thumbnail" : 
                            "thumbnail"}
                        />
                    </a>
                )}
            </div>
         );
    }
}
