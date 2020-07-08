import React, { Component } from 'react';
import { Modal, Button }from "react-bootstrap";
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select'

import { TagsRequest, TagCreationRequest } from '../../api/requests/TagRequests'

import './AlbumInfoEditModal.css'

export default class AlbumInfoEditModal extends Component {
    state = {
        newMediaSource : this.props.media.source,
        newAlbumSource : null,
        mediaSelectedTagOptions : null,
        albumSelectedAddTagOptions : [],
        albumSelectedRemoveTagOptions : [],
        tagOptions : null,
        albumRemoveTagOptions : null,
        isTagOptionsLoading : false
    }

    componentDidMount = () => {
        this.setState({ 
            mediaSelectedTagOptions : this.getMediaDefaultTagOptions(),
            albumRemoveTagOptions : this.getAlbumRemoveTagOptions(),
            newAlbumSource : this.getAlbumSource() 
        })
    }

    getAlbumSource = () => {
        let albumSource = null;
        this.props.album.media.forEach(media => {
            if (media.source !== null) {
                if (albumSource !== null && media.source !== albumSource) {
                    return "Multiple Sources.";
                }
                albumSource = media.source;      
            }
        })
        return albumSource;
    }

    getMediaDefaultTagOptions = () => {
        let defaults = [];
        this.props.media.tags.forEach(tag => {
            defaults.push({ value : tag.id, label : tag.name });
        });
        return defaults;
    }

    getAlbumRemoveTagOptions = () => {
        let defaults = [];
        this.props.album.tags.forEach(tag => {
            defaults.push({value: tag.id, label : tag.name });
        });
        return defaults
    }
    
    getTagOptions = () => {
        if (this.state.tagOptions !== null || this.state.isTagOptionsLoading) {
            return;
        }
        this.setState({ isTagOptionsLoading : true })
        new TagsRequest().send().then(response => {
            let tagOptions = [];
            response.forEach((tag, index) => {
                if (!this.props.album.tags.includes(tag)) {
                    tagOptions.push({ value: tag.id, label: tag.name });
                }
            });
            this.setState({ tagOptions, isTagOptionsLoading : false });
        }).catch(error => {
            console.log(error);
            this.setState({ isTagOptionsLoading : false });
        })
    }

    onMediaTagChange = (tagsSelected) => {
        this.setState({ mediaSelectedTagOptions : tagsSelected })
    }

    onAlbumAddTagChange = (tagsSelected) => {
        this.setState({ albumSelectedAddTagOptions : tagsSelected })
    }

    onAlbumRemoveTagChange = (tagsSelected) => {
        this.setState({ albumSelectedRemoveTagOptions : tagsSelected })
    }

    onMediaSourceChange = (event) => {
        this.setState({ newMediaSource : event.target.value })
    }

    onAlbumSourceChange = (event) => {
        this.setState({ newAlbumSource : event.target.value })
    }

    createTag = (tagName) => {
        this.setState({ isTagOptionsLoading : true })
        return new TagCreationRequest(tagName).send().then(newTag => {
            this.setState({ 
                tagOptions: [...this.state.tagOptions, {'value': newTag.id, 'label': newTag.name}],
                isTagOptionsLoading : false
            })
            return newTag;
        }).catch(error => {
            console.log(error);
            this.setState({ isTagOptionsLoading : false })
        })
    }

    handleMediaTagOptionCreation = (tagName) => {
        this.createTag(tagName).then(newTag => {
            this.setState({mediaSelectedTagOptions: [...this.state.mediaSelectedTagOptions, {'value': newTag.id, 'label': newTag.name}]});
        })
    }

    handleAlbumAddTagOptionCreation = (tagName) => {
        this.createTag(tagName).then(newTag => {
            this.setState({albumSelectedAddTagOptions: [...this.state.albumSelectedAddTagOptions, {'value': newTag.id, 'label': newTag.name}]});
        })
    }

    handleAlbumRemoveTagOptionCreation = (tagName) => {
        this.createTag(tagName).then(newTag => {
            this.setState({albumSelectedRemoveTagOptions: [...this.state.albumSelectedRemoveTagOptions, {'value': newTag.id, 'label': newTag.name}]});
        })
    }

    handleSaveClick = () => {

        let newMediaInfo = {};

        if (!this.compareOptions(this.state.mediaSelectedTagOptions, this.getMediaDefaultTagOptions())) {
            let newTags = []
            if (this.state.mediaSelectedTagOptions !== null) {
                this.state.mediaSelectedTagOptions.forEach(tagOption => {
                    newTags.push(tagOption.value)
                })
            }
            newMediaInfo['tags'] = newTags;
        }

        if (this.state.newMediaSource !== this.props.media.source) {
            newMediaInfo['source'] = this.state.newMediaSource;
        }

        let newAlbumInfo = {};

        if (this.state.albumSelectedAddTagOptions.length > 0) {
            let addTags = []
            this.state.albumSelectedAddTagOptions.forEach(tagOption => {
                addTags.push(tagOption.value);
            });
            newAlbumInfo['add_tags'] = addTags;
        }

        if (this.state.albumSelectedRemoveTagOptions.length > 0) {
            let removeTags = [];
            this.state.albumSelectedRemoveTagOptions.forEach(tagOption => {
                removeTags.push(tagOption.value);
            });
            newAlbumInfo['remove_tags'] = removeTags;
        }

        if (this.state.newAlbumSource !== this.getAlbumSource()) {
            newAlbumInfo['source'] = this.state.newAlbumSource;
        }

        this.props.handleSave({'media' : newMediaInfo, 'album' : newAlbumInfo});
    }

    compareOptions = (options, otherOptions) => {
        if (options.length !== otherOptions.length) {
            return false;
        }
        for (let i = 0; i < options.length; i++) {
            if (options[i].value !== otherOptions[i].value || options[i].label !== otherOptions[i].label) {
                return false;
            }
        } 
        return true;
    }
    
    render() { 
        return ( 
            <>
                <Modal show={this.props.isShown} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{`Edit Album Info`}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div id="info_edit_modal_body">
                        <h5 className="info_edit_modal_seperator">Media </h5>
                        <div className="info_edit_modal_element">
                            <p>Source: </p>
                            <form className="info_edit_modal_source_form">
                                <input type="text" value={this.state.newMediaSource} onChange={this.onMediaTagChange} />
                            </form>
                        </div>
                        <div className="info_edit_modal_element">
                            <p>Tags:</p>
                            <CreatableSelect 
                                placeholder="Enter Tags..."
                                value={this.state.mediaSelectedTagOptions}
                                options={this.state.tagOptions === null ? [] : this.state.tagOptions}
                                onChange={this.onMediaTagChange}
                                onCreateOption={this.handleMediaTagOptionCreation}
                                isSearchable
                                isMulti
                                isLoading={this.state.isTagOptionsLoading}
                                onFocus={this.getTagOptions}
                            />
                        </div>
                        <h5 className="info_edit_modal_seperator">Album </h5>
                        <div className="info_edit_modal_element">
                            <p>Source: </p>
                            <form className="info_edit_modal_source_form">
                                <input type="text" value={this.state.newAlbumSource} onChange={this.onMediaTagChange} />
                            </form>
                        </div>  
                        <div className="info_edit_modal_element">
                            <p>Add Tags:</p>
                            <CreatableSelect 
                                placeholder="Enter Tags..."
                                value={this.state.albumSelectedAddTagOptions}
                                options={this.state.tagOptions === null ? [] : this.state.tagOptions}
                                onChange={this.onAlbumAddTagChange}
                                onCreateOption={this.handleAlbumAddTagOptionCreation}
                                isSearchable
                                isMulti
                                isLoading={this.state.isTagOptionsLoading}
                                onFocus={this.getTagOptions}
                            />
                        </div>
                        <div className="info_edit_modal_element">
                            <p>Remove Tags:</p>
                            <Select 
                                placeholder="Enter Tags..."
                                value={this.state.albumSelectedRemoveTagOptions}
                                options={this.state.albumRemoveTagOptions === null ? [] : this.state.albumRemoveTagOptions}
                                onChange={this.onAlbumRemoveTagChange}
                                isSearchable
                                isMulti
                                isLoading={this.state.isTagOptionsLoading}
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
