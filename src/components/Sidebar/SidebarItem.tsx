import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { ListSubheader } from '@mui/material';

type Props = {
    header?: string,
    children?: JSX.Element
}

export default function SidebarItem({ header, children }: Props) {
    
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <ListSubheader sx={
                { 
                    backgroundColor: theme.style.backgroundColor, 
                    color: theme.style.color, 
                    height: 35,
                    fontWeight: 'bold'
                }
            }>{header}</ListSubheader>
            {children}
        </>
    );
}
