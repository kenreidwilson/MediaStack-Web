import React, { Component } from 'react';
import PropTypes from 'prop-types'; 

import './MediaThumbnail.css'

export default class MediaThumbnail extends Component {

    static propTypes = {
        mediaId : PropTypes.string.isRequired,
        classes : PropTypes.string
    }

    static defaultProps = {
        classes : "thumbnail"
    }

    render() {
        return (
            <img 
                className={this.props.classes}
                src={`${process.env.REACT_APP_API}/media/${this.props.mediaId}/thumbnail`}>
            </img>
        );
    }
}
