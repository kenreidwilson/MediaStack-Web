import React, { Component } from 'react';

export default class InfoSideBarElement extends Component {

    render() { 
        return (
            <p>{this.props.label}
                {
                    this.props.value === null ? "" : 
                        typeof this.props.onClick === 'undefined' ? 
                            this.props.value :
                            <a onClick={this.props.onClick}>{this.props.value}</a>
                }
            </p>
        );
    }
}
