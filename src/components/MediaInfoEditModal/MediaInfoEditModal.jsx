import React, { Component } from 'react';
import { Modal, Button }from "react-bootstrap";
import Select from 'react-select';

import { TagsRequest } from '../../api/requests/TagRequests'

export default class MediaInfoEditModal extends Component {
    
    state = {
        newTags : this.props.media.tags,
        newSource : this.props.media.source,
        tagOptions : null,
        isTagOptionsLoading : false
    }

    onTagChange = (tagsSelected) => {
        if (tagsSelected === null) {
            return;
        }
        let newSelectedTags = [];
        tagsSelected.forEach(tag => {
            newSelectedTags.push(tag.value);
        })
        this.setState({ newTags : newSelectedTags })
    }

    onSourceChange = (event) => {
        this.setState({ newSource : event.target.value })
    }

    handleSaveClick = () => {
        let newMediaInfo = {};

        if (this.state.newTags !== this.props.media.tags) {
            newMediaInfo['tags'] = this.state.newTags;
        }

        if (this.state.newSource !== this.props.media.source) {
            newMediaInfo['source'] = this.state.newSource;
        }

        this.props.handleSave(newMediaInfo);
    }

    getTagOptions = () => {
        if (this.state.tagOptions !== null || this.state.isTagOptionsLoading) {
            return;
        }
        this.setState({ isTagOptionsLoading : true })
        new TagsRequest().send().then(response => {
            let tagOptions = [];
            Object.keys(response).forEach((tag, index) => {
                tagOptions.push({ value: tag, label: tag });
            });
            this.setState({ tagOptions, isTagOptionsLoading : false });
        }).catch(error => {
            console.log(error);
            this.setState({ isTagOptionsLoading : false });
        })
    }

    defaultTagOptions = () => {
        let defaults = [];
        this.props.media.tags.forEach(tag => {
            defaults.push({ value : tag, label : tag });
        });
        return defaults;
    }

    render() { 
        return (
            <>
                <Modal show={this.props.isShown} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{`Edit Media Info`}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <p>Source: </p>
                    <form>
                        <input type="text" value={this.state.newSource} onChange={this.onSourceChange} />
                    </form>
                    <p>Tags:</p>
                    <Select 
                        placeholder="Enter Tags..."
                        defaultValue={this.defaultTagOptions()}
                        options={this.state.tagOptions === null ? [] : this.state.tagOptions}
                        onChange={this.onTagChange}
                        isSearchable
                        isMulti
                        isLoading={this.state.isTagOptionsLoading}
                        onFocus={this.getTagOptions}
                    />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>Close</Button>
                        <Button variant="primary" onClick={this.handleSaveClick}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
          </>
        );
    }
}
