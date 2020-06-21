import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

export default class BannerAlert extends Component {
    state = { 
        isShown : true
    }

    render() { 
        if (this.state.isShown) {
            return ( 
                <Alert variant={this.props.variant} onClose={() => this.setState({isShown : false})} dismissible>
                    <Alert.Heading>{this.props.heading}</Alert.Heading>
                    <p>{this.props.body}</p>
                </Alert>
             );
        }
        return null;
    }
}
