import { ListItemButton, ListItemText } from '@mui/material';

type Props = {
    body?: string,
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export default function SidebarListItemButton ({ body, onClick } : Props) {
    return (
        <ListItemButton onClick={onClick}>
            <ListItemText primary={body} />
        </ListItemButton>
    );
}
