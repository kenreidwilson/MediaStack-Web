import React, { Component } from 'react';
import Select from 'react-select';

type Item = {
    id: number,
    name: string
}

type Option = {
    label: string,
    value: any
}

type Request = {
    send: Function
}

type Props = {
    request: Request,
    onChange: Function,
    placeholder: string
}

type State = {
    isLoading: boolean,
    options?: Option[]
}

export default class UniqueQuerySelector extends Component<Props, State> {

    state = { 
        isLoading : false,
        options : undefined,
     }

    getOptions = () => {
        if (this.state.options !== undefined || this.state.isLoading) {
            return;
        }
        this.setState({ isLoading : true });
        this.props.request.send().then((response: Item[]) => {
            let options: Option[] = [];
            response.forEach((optionItem, index) => {
                options.push({ value: optionItem.id, label: optionItem.name });
            });
            this.setState({ options, isLoading : false });
        }).catch((error: any) => {
            console.log(error);
            this.setState({ isLoading : false })
        })
    }

    handleOptionChange = (option: any) => {
        this.props.onChange(option);
    }

    render() { 
        return ( 
            <Select 
                placeholder={this.props.placeholder || ""}
                options={this.state.options === null ? [] : this.state.options}
                onChange={this.handleOptionChange}
                isSearchable
                isClearable
                isLoading={this.state.isLoading}
                onFocus={this.getOptions}
            />
         );
    }
}
