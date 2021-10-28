import Tag from '../../../types/Tag';
import { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Chip } from '@mui/material';

type Props = {
    tags: Tag[],
    onClick?: (tag: Tag) => void
}

export default function SidebarTagsItem ({ tags, onClick = () => {} } : Props) {
    
    const { theme } = useContext(ThemeContext);

    return (
        <div style={{marginTop: '3px', textAlign: 'center'}}>
            {tags.map((tag) => (
                <Chip key={tag.id}
                    variant='outlined'
                    size='small'
                    sx={{ ...theme.style, margin: '0px 1px 2px 1px', fontSize: 13, fontWeight: 'bold' }} 
                    label={tag.name}  
                    onClick={() => onClick(tag)}/>
            ))}
        </div>
    );
}
