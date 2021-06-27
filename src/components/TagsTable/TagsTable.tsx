import React, { useState, useEffect } from 'react';
import TagDeleteModal from './TagDeleteModal/TagDeleteModal'; 
import TagEditModal from './TagEditModal/TagEditModal';
import { TagsRequest, TagInfoRequest, TagNameChangeRequest, TagDeletionRequest } from '../../api/requests/TagRequests';
import Tag from '../../model/Tag';
import MSPagination from '../Pagination/MSPagination';

import './TagsTable.css'

type mediaInfo = {
    count: number
}

export default function TagsTable({ onTagClick }: { onTagClick: Function }) {

    const [tags, setTags] = useState<Tag[]>([]);
    const [tagsInfo, setTagsInfo] = useState<{ [id: number]: mediaInfo | undefined }>({});
    const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [tagsPerPage, setTagsPerPage] = useState<number>(15);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    useEffect(() => {
        refreshTags();
    }, []);

    const refreshTags = () => new TagsRequest().send().then(response => setTags(response.tags));
    
    const numberOfPages = () => Math.ceil(tags.length / tagsPerPage);

    const loadTagInfo = (tag: Tag) => {
        if (tagsInfo[tag.id]) {
            return;
        }

        new TagInfoRequest(tag.id).send().then(tagInfo => {
            let newTagsInfo: { [id: number]: any } = Object.assign({}, tagsInfo);
            newTagsInfo[tag.id] = tagInfo;
            setTagsInfo(newTagsInfo);
        });
    }

    const onTagUpdate = (updatedTag: Tag) => {
        new TagNameChangeRequest(updatedTag.id, updatedTag.name).send().then(response => {
            refreshTags();
        });
    }

    const onTagDelete = (deletedTag: Tag) => {
        new TagDeletionRequest(deletedTag.id).send().then(response => {
            refreshTags();
        });
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
                onClose={() => setShowDeleteModal(false)}
                onDelete={(deletedTag: Tag) => { onTagDelete(deletedTag); setShowDeleteModal(false); }}
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
                        {tags ? tags.slice(tagsPerPage * (pageNumber - 1), tagsPerPage * pageNumber).map(tag =>
                            <tr key={tag.id} onLoad={() => loadTagInfo(tag)}>
                                <th scope="row">{tag.id}</th>
                                <td><a href="#" style={{cursor: 'pointer'}} onClick={() => onTagClick({'whitelist_tags':[tag.id]})}>{tag.name}</a></td>
                                <td>{tagsInfo[tag.id] ? 
                                    tagsInfo[tag.id]!.count : 
                                    <div className="spinner-border spinner-border-sm" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>}
                                </td>
                                <td>
                                    <a href="#" className="edit_a" onClick={() => { setSelectedTag(tag); setShowEditModal(true); }}>Edit</a> |
                                    <a href="#" className="delete_a" onClick={() => { setSelectedTag(tag); setShowDeleteModal(true); }}> Delete</a>
                                </td>
                            </tr>
                        ) : null}
                    </tbody>
                </table>
            </div>
            <div id="tags_table_nav">
                <MSPagination pageNumber={pageNumber} numberOfPages={numberOfPages()} onNavigate={setPageNumber}/>
            </div>
      </div>
    );
}
