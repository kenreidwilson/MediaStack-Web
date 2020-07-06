import React, { Component } from 'react';

export default class TagsSidebarElement extends Component {

    render() { 
        return ( 
            <React.Fragment>
                <p>Tags:</p>
                <ul>
                    {this.props.tags.map(tag => 
                        <li>
                            <a onClick={() => {this.props.onClick(tag.id)}}>{tag.name}</a>
                        </li>
                    )}
                </ul>
            </React.Fragment> 
        );
    }
}
