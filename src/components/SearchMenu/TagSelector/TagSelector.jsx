import React, { Component } from 'react';
import Select from 'react-select';

import { TagsRequest } from '../../../api/requests/TagRequests'

export default class TagSelector extends Component {
    state = { 
        isLoading : false,
        tagOptions : null,
     }

    getTagOptions = () => {
        if (this.state.tagOptions !== null || this.state.isLoading) {
            return;
        }
        this.setState({ isLoading : true })
        new TagsRequest().send().then(response => {
            let tagOptions = [];
            response['tags'].forEach((tag, index) => {
                tagOptions.push({ value: tag, label: tag });
            });
            this.setState({ tagOptions, isLoading : false });
        }).catch(error => {
            console.log(error);
            this.setState({ isLoading : false });
        })
    }

    render() { 
        return ( 
            <Select 
                placeholder="Enter Tags..."
                options={this.state.tagOptions === null ? [] : this.state.tagOptions}
                onChange={this.props.onChange}
                cacheOptions
                isSearchable
                isMulti
                isLoading={this.state.isLoading}
                onFocus={this.getTagOptions}
            />
         );
    }
}
