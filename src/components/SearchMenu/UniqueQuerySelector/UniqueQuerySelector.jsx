import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

export default class UniqueQuerySelector extends Component {

    static propTypes = {
        request : PropTypes.object.isRequired,
        onChange : PropTypes.func.isRequired,
        placeholder : PropTypes.string
    }

    state = { 
        isLoading : false,
        options : null,
     }

    getOptions = () => {
        if (this.state.options !== null || this.state.isLoading) {
            return;
        }
        this.setState({ isLoading : true })
        this.props.request.send().then(response => {
            let options = [];
            Object.keys(response).forEach((optionItem, index) => {
                options.push({ value: optionItem, label: optionItem });
            });
            this.setState({ options, isLoading : false });
        }).catch(error => {
            console.log(error);
            this.setState({ isLoading : false })
        })
    }

    render() { 
        return ( 
            <Select 
                placeholder={this.props.placeholder || ""}
                options={this.state.options === null ? [] : this.state.options}
                onChange={this.props.onChange}
                isSearchable
                isClearable
                isLoading={this.state.isLoading}
                onFocus={this.getOptions}
            />
         );
    }
}
