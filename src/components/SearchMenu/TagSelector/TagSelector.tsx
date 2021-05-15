import React, { Component } from 'react';
import Select from 'react-select';

import { TagsRequest } from '../../../api/requests/TagRequests'

type TagOption = {
    label: string,
    value?: number
}

type State = {
    isLoading: boolean,
    tagOptions?: TagOption[]
}

type Props = {
    onChange: Function
}

export default class TagSelector extends Component<Props, State> {
    state = { 
        isLoading : false,
        tagOptions : undefined,
     }

    getTagOptions = () => {
        if (this.state.tagOptions !== null || this.state.isLoading) {
            return;
        }
        this.setState({ isLoading : true })
        new TagsRequest().send().then(response => {
            let tagOptions: TagOption[] = [];
            response.forEach((tag, index) => {
                tagOptions.push({ value: tag.id, label: tag.name });
            });
            this.setState({ tagOptions, isLoading : false });
        }).catch(error => {
            console.log(error);
            this.setState({ isLoading : false });
        })
    }

    handleOptionChange = (option: any) => {
        this.props.onChange(option);
    }

    render() { 
        return ( 
            <Select 
                placeholder="Enter Tags..."
                options={this.state.tagOptions === null ? [] : this.state.tagOptions}
                onChange={this.handleOptionChange}
                cacheOptions
                isSearchable
                isMulti
                isLoading={this.state.isLoading}
                onFocus={this.getTagOptions}
            />
         );
    }
}
