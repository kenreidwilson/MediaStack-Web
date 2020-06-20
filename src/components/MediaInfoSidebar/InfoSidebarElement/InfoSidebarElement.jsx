import React, { Component } from 'react';
import $ from 'jquery'

export default class InfoSideBarElement extends Component {
    state = {
        isEditMode : false,
        newValue : this.props.value
    }

    componentDidMount = () => {
        $(document.body).on('keydown', this.handleEditCancel)
    }

    handleEnableEditMode = (event) => {
        event.preventDefault();
        this.setState({ isEditMode : true })
    }

    handleEditCancel = (event) => {
        if (event.keyCode === 27) {
            this.setState({ isEditMode : false, newValue : this.props.value })
        }
    }

    handleOnChange = (event) => {
        this.setState({ newValue : event.target.value })
    }

    handleEdit = (event) => {
        event.preventDefault();
        if (this.props.value !== this.state.newValue) {
            this.setState({ isEditMode : false })
        }
        this.props.handleEdit(this.state.newValue).then(response => {
            this.setState({ isEditMode : false })
        }).catch(error => console.log(error))
    }

    render() { 
        if (this.state.isEditMode) {
            return (
                <form onSubmit={this.handleEdit}>
                    <label>{this.props.label}</label>
                    <input 
                        type="text" 
                        onChange={this.handleOnChange} 
                        value={this.state.newValue === null ? "" : this.state.newValue}>
                    </input>
                </form>
            );
        } else {
            return (
                <p>{this.props.label}
                    {
                        this.props.value === null ? 
                            "None" : 
                            typeof this.props.link === 'undefined' ? 
                                this.props.value :
                                <a href={this.props.link}>{this.props.value}</a>
                    }
                    {
                        typeof this.props.handleEdit !== 'undefined' ? 
                            <a href="#" onClick={this.handleEnableEditMode}> &#xf044;</a> : 
                            null
                    }
                </p>
            );
        }
    }
}
