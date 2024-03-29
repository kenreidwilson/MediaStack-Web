import { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { ListSubheader } from '@mui/material';

type Props = {
    header?: string,
    children?: JSX.Element
}

export default function SidebarItem({ header, children }: Props) {
    
    const { theme } = useContext(ThemeContext);

    const headerStyle = { 
        ...theme.style,
        height: 35,
        fontWeight: 'bold'
    };

    return (
        <>
            <ListSubheader sx={headerStyle}>{header}</ListSubheader>
            {children}
        </>
    );
}
