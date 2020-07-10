import React, { Component } from 'react';
import { Modal, Button } from "react-bootstrap";

import { TagInfoRequest, TagDeletionRequest, TagNameChangeRequest} from '../../api/requests/TagRequests';

import './TagsTable.css'

export default class TagsTable extends Component {
    
    state = {
        pageNumber: 0,
        showEditModal: false,
        showDeleteModal: false,
        selectedTag: null
    }

    tagsPerPage = 15;

    numberOfPages = () => {
        if (this.props.tags === null) {
            return 0;
        }
        return Math.ceil(this.props.tags.length / this.tagsPerPage);
    }

    getPageListItems = () => {
        let listItems = []
        for (let i = 0; i < this.numberOfPages(); i++) {
            listItems.push(
            <li className={this.state.pageNumber === i ? "page-item active" : "page-item"}>
                <a className="page-link" onClick={() => {this.setState({ pageNumber : i })}}>{i + 1} <span class="sr-only">(current)</span></a>
            </li>);
        }
        return listItems;
    }

    onTagDelete = () => {
        new TagDeletionRequest(this.state.selectedTag.id).send().then(response => {
            this.props.onDeleteTag(this.state.selectedTag);
            this.setState({ selectedTag : null, showDeleteModal : false });
        }).catch(error => {
            console.log(error);
        })
    }

    onTagEdit = (newTagName) => {
        new TagNameChangeRequest(this.state.selectedTag.id, newTagName).send().then(response => {
            this.props.onEditTag(response);
            this.setState({ selectedTag : null, showEditModal : false });
        }).catch(error => {
            console.log(error);
        })
    }

    render() { 
        return (
            <div id="tags_table">
                {this.state.selectedTag ? <TagEditModal 
                    isShown={this.state.showEditModal}
                    onHide={() => this.setState({ showEditModal : false })}
                    onSave={(newTagName) => this.onTagEdit(newTagName)}
                    tag={this.state.selectedTag}
                /> : null}
                {this.state.selectedTag ? <TagDeleteModal
                    isShown={this.state.showDeleteModal}
                    onHide={() => this.setState({ showDeleteModal : false })}
                    onSave={this.onTagDelete}
                    tag={this.state.selectedTag}
                /> : null}
                
                <div id="tags_table_table">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th style={{width: "5%"}}>ID</th>
                                <th style={{width: "80%"}}>Name</th>
                                <th style={{width: "15%"}}>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.tags ? this.props.tags.slice(this.tagsPerPage * this.state.pageNumber, this.tagsPerPage * (this.state.pageNumber + 1)).map(tag =>
                                <tr>
                                    <th scope="row">{tag.id}</th>
                                    <td>{tag.name}</td>
                                    <td>
                                        <a className="edit_a" onClick={() => this.setState({ selectedTag : tag, showEditModal: true })}>Edit</a> |
                                        <a className="delete_a" onClick={() => this.setState({ selectedTag : tag, showDeleteModal: true })}> Delete</a>
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                </div>
                <div id="tags_table_nav">
                    <nav aria-label="...">
                        <ul className="pagination">
                            <li className={this.state.pageNumber === 0 ? "page-item disabled" : "page-item"}>
                                <a className="page-link" onClick={() => {this.setState(prevState => ({pageNumber : prevState.pageNumber - 1}))}}>Previous</a>
                            </li>
                            {this.getPageListItems()}
                            <li className={this.state.pageNumber === this.numberOfPages() - 1 ? "page-item disabled" : "page-item"}>
                                <a className="page-link" onClick={() => {this.setState(prevState => ({pageNumber : prevState.pageNumber + 1}))}}>Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
          </div>
        );
    }
}

class TagEditModal extends Component {

    state = {
        newTagName: null
    }

    render() {
        return (
            <Modal show={this.props.isShown} onHide={this.props.onHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Tag</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="tag_name_edit_div">
                            <p>New Name: </p>
                            <form className="tag_name_edit_form">
                                <input type="text" value={this.state.newTagName} onChange={(event) => this.setState({ newTagName : event.target.value })} />
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
                        <Button variant="primary" onClick={() => this.props.onSave(this.state.newTagName)}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
        );
    }
}

class TagDeleteModal extends Component {
    render() { 
        return ( 
            <Modal show={this.props.isShown} onHide={this.props.onHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Tag</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Delete tag: {this.props.tag.name}? (ID: {this.props.tag.id})</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
                        <Button variant="primary" onClick={this.props.onSave}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
         );
    }
}
