import React, { Component } from 'react';

import TagSidebarElementElement from './TagSidebarElementElement/TagSidebarElementElement'

export default class TagsSidebarElement extends Component {

    render() { 
        return ( 
            <React.Fragment>
                <p>Tags:</p>
                <ul>
                    {this.props.tags.map(tag => <TagSidebarElementElement tag={tag} onTagDelete={() => this.props.handleTagDelete(tag)} key={tag}/>)}
                </ul>
            </React.Fragment> 
        );
    }
}
