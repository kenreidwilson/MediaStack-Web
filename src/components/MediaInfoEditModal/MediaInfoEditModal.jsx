import React, { Component } from 'react';
import { Modal, Button }from "react-bootstrap";
import CreatableSelect from 'react-select/creatable';

import { TagsRequest, TagCreationRequest } from '../../api/requests/TagRequests'

export default class MediaInfoEditModal extends Component {
    
    state = {
        newSource : this.props.media.source,
        tagOptions : null,
        selectedTagOptions : null,
        isTagOptionsLoading : false
    }

    componentDidMount = () => {
        this.setState({ selectedTagOptions : this.defaultTagOptions() })
    }

    onTagChange = (tagsSelected) => {
        this.setState({ selectedTagOptions : tagsSelected })
    }

    onSourceChange = (event) => {
        this.setState({ newSource : event.target.value })
    }

    handleSaveClick = () => {
        let newMediaInfo = {};

        if (this.state.selectedTagOptions !== this.defaultTagOptions()) {
            let newTags = []
            if (this.state.selectedTagOptions !== null) {
                this.state.selectedTagOptions.forEach(tagOption => {
                    newTags.push(tagOption.value)
                })
            }
            newMediaInfo['tags'] = newTags;
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
            response.forEach((tag, index) => {
                if (!this.props.media.tags.includes(tag)) {
                    tagOptions.push({ value: tag.id, label: tag.name });
                }
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
            defaults.push({ value : tag.id, label : tag.name });
        });
        return defaults;
    }

    handleOptionCreation = (inputValue) => {
        this.setState({ isTagOptionsLoading : true })
        new TagCreationRequest(inputValue).send().then(newTag => {
            this.setState({ 
                tagOptions: [...this.state.tagOptions, {'value': newTag.id, 'label': newTag.name}],
                selectedTagOptions: [...this.state.selectedTagOptions, {'value': newTag.id, 'label': newTag.name}],
                isTagOptionsLoading : false
            })
        }).catch(error => {
            console.log(error);
            this.setState({ isTagOptionsLoading : false })
        })
    }

    render() { 
        return (
            <>
                <Modal show={this.props.isShown} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{`Edit Media Info`}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="info_edit_modal_body">
                        <div className="info_edit_modal_element">
                            <p>Source: </p>
                            <form className="info_edit_modal_source_form">
                                <input type="text" value={this.state.newSource} onChange={this.onSourceChange} />
                            </form>
                        </div>
                        <div className="info_edit_modal_element">
                            <p>Tags:</p>
                            <CreatableSelect 
                                placeholder="Enter Tags..."
                                value={this.state.selectedTagOptions}
                                options={this.state.tagOptions === null ? [] : this.state.tagOptions}
                                onChange={this.onTagChange}
                                onCreateOption={this.handleOptionCreation}
                                isSearchable
                                isMulti
                                isLoading={this.state.isTagOptionsLoading}
                                onFocus={this.getTagOptions}
                            />
                        </div>
                    </div>
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
