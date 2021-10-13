import { Chip } from "@mui/material";
import Tag from "../types/Tag";

type Props = {
    tags: Tag[],
    onClick?: (tag: Tag) => void
}

export default function SidebarTagsItem ({ tags, onClick } : Props) {
    
    return (
        <div style={{marginTop: "3px", textAlign: "center"}}>
            {tags.map((tag) => (
                <Chip sx={{ margin: "0px 1px 2px 1px"}} label={tag.name} variant="outlined" onClick={() => onClick && onClick(tag)}/>
            ))}
        </div>
    );
}
