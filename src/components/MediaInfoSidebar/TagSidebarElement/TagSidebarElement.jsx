import React, { Component } from 'react';

import TagSidebarElementElement from './TagSidebarElementElement/TagSidebarElementElement'

export default class TagsSidebarElement extends Component {
    
    handleTagAdd = () => {
        let userInput = prompt("Enter tag name.");
        if (userInput === null || userInput === "") {
            return;
        }
        this.props.handleTagAdd(userInput);
    }

    render() { 
        return ( 
            <React.Fragment>
                <p>Tags: <a href="#" onClick={() => this.handleTagAdd("asdf")}>+</a></p>
                <ul>
                    {this.props.tags.map(tag => <TagSidebarElementElement tag={tag} onTagDelete={() => this.props.handleTagDelete(tag)} key={tag}/>)}
                </ul>
            </React.Fragment> 
        );
    }
}
