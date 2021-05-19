import React, { useState, useEffect } from 'react';
import TagDeleteModal from './TagDeleteModal/TagDeleteModal'; 
import TagEditModal from './TagEditModal/TagEditModal';
import { TagsRequest, TagInfoRequest } from '../../api/requests/TagRequests';
import Tag from '../../model/Tag';

import './TagsTable.css'

export default function TagsTable({ onTagClick }: { onTagClick: Function }) {

    const [tags, setTags] = useState<Tag[]>([]);
    const [tagsInfo, setTagsInfo] = useState({});
    const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [tagsPerPage, setTagsPerPage] = useState<number>(15);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    useEffect(() => {
        new TagsRequest().send()
            .then(response => {
                setTags(response);
                tags.forEach(tag => {
                    new TagInfoRequest(tag.id).send().then(tagInfo => {
                        let newTagsInfo: any = Object.assign({}, tagsInfo);
                        newTagsInfo[tag.id] = tagInfo;
                        setTagsInfo(newTagsInfo);
                    });
                });
            });
    }, []);

    const numberOfPages = () => Math.ceil(tags.length / tagsPerPage);

    const getPageListItems = () => {
        let listItems = []
        for (let i = 0; i < numberOfPages(); i++) {
            listItems.push(
                <li className={pageNumber === i ? "page-item active" : "page-item"}>
                    <a href="/#" className="page-link" onClick={() => setPageNumber(i)}>{i + 1} <span className="sr-only">(current)</span></a>
                </li>
            );
        }
        return listItems;
    }

    const onTagUpdate = (updatedTag: Tag) => {
        // TODO: Implement.
    }

    const onTagDelete = (deletedTag: Tag) => {
        // TODO: Implement.
    }

    return (
        <div id="tags_table">

            {selectedTag ? <TagEditModal 
                isShown={showEditModal}
                onClose={() => setShowEditModal(false)}
                onEdit={(updatedTag: Tag) => { onTagUpdate(updatedTag); setShowEditModal(false); }}
                tag={selectedTag}
            /> : null}

            {selectedTag ? <TagDeleteModal
                isShown={showDeleteModal}
                onClose={() => setShowEditModal(false)}
                onDelete={(deletedTag: Tag) => { onTagDelete(deletedTag); setShowEditModal(false); }}
                tag={selectedTag}
            /> : null}
            
            <div id="tags_table_table">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th style={{width: "5%"}}>ID</th>
                            <th style={{width: "20%"}}>Name</th>
                            <th style={{width: "60%"}}>Media Count</th>
                            <th style={{width: "15%", minWidth: "111px"}}>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tags ? tags.slice(tagsPerPage * pageNumber, tagsPerPage * (pageNumber + 1)).map(tag =>
                            <tr>
                                <th scope="row">{tag.id}</th>
                                <td><a href="/#" style={{cursor: 'pointer'}} onClick={() => onTagClick({'whitelist_tags':[tag.id]})}>{tag.name}</a></td>
                                <td>{true ? 
                                    "N/A" : 
                                    <div className="spinner-border spinner-border-sm" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>}
                                </td>
                                <td>
                                    <a href="/#" className="edit_a" onClick={() => { setSelectedTag(tag); setShowEditModal(true); }}>Edit</a> |
                                    <a href="/#" className="delete_a" onClick={() => { setSelectedTag(tag); setShowDeleteModal(true); }}> Delete</a>
                                </td>
                            </tr>
                        ) : null}
                    </tbody>
                </table>
            </div>
            <div id="tags_table_nav">
                <nav aria-label="...">
                    <ul className="pagination">
                        <li className={pageNumber === 1 ? "page-item disabled" : "page-item"}>
                            <a href="/#" className="page-link" onClick={() => setPageNumber(pageNumber - 1)}>Previous</a>
                        </li>
                        {getPageListItems()}
                        <li className={pageNumber === numberOfPages() ? "page-item disabled" : "page-item"}>
                            <a href="/#" className="page-link" onClick={() => setPageNumber(pageNumber + 1)}>Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
      </div>
    );
}
