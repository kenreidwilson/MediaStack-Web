import React, { Component } from 'react';
import PropTypes from 'prop-types'; 

import './MediaThumbnail.css'

export default class MediaThumbnail extends Component {

    static propTypes = {
        media : PropTypes.object.isRequired,
        classes : PropTypes.string
    }

    static defaultProps = {
        classes : "thumbnail"
    }

    render() {
        return (
            <img 
                alt={this.props.media.tags.toString()} 
                className={this.props.classes}
                src={`${process.env.REACT_APP_API}${this.props.media.thumbnail}`}>
            </img>
        );
    }
}

