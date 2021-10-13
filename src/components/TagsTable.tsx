import { useState, useEffect, useContext } from 'react';
import TagDeleteModal from './TagDeleteModal'; 
import TagEditModal from './TagEditModal';
import Tag from '../types/Tag';
import MSPagination from './MSPagination';

import './TagsTable.css'
import useTags from '../hooks/useTags';
import { ThemeContext } from '../contexts/ThemeContext';

type mediaInfo = {
    count: number
}

export default function TagsTable({ onTagClick }: { onTagClick: Function }) {

    const { search, get, update, delete: deleteTag } = useTags();
    const { theme } = useContext(ThemeContext);

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

    const refreshTags = () => search({ count: 999 }).then(response => setTags(response.data));
    
    const numberOfPages = () => Math.ceil(tags.length / tagsPerPage);

    const loadTagInfo = (tag: Tag) => {
        if (tagsInfo[tag.id]) {
            return;
        }

        get(tag.id).then(tagInfo => {
            let newTagsInfo: { [id: number]: any } = Object.assign({}, tagsInfo);
            newTagsInfo[tag.id] = tagInfo;
            setTagsInfo(newTagsInfo);
        })
    }

    const onTagUpdate = (updatedTag: Tag) => {
        update(updatedTag).then(refreshTags);
    }

    const onTagDelete = (deletedTag: Tag) => {
        deleteTag(deletedTag).then(refreshTags);
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
                            <th style={{width: "5%", color: theme.style.color }}>ID</th>
                            <th style={{width: "20%", color: theme.style.color}}>Name</th>
                            <th style={{width: "60%", color: theme.style.color}}>Media Count</th>
                            <th style={{width: "15%", minWidth: "111px", color: theme.style.color}}>Edit</th>
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
