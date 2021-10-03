import Tag from "../types/Tag";

type Props = {
    tags: Tag[],
    onClick: Function
}

const TagsSidebarElement = ({ tags, onClick }: Props) => (
    <div>
        <p>Tags:</p>
        <ul>
            {tags.map(tag => 
            <li key={tag.id}>
                <a href="#" onClick={() => {onClick(tag.id)}}>{tag.name}</a>
            </li>
            )}
        </ul>
    </div> 
)

export default TagsSidebarElement;
