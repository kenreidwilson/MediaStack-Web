import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

type Props = {
    children: JSX.Element,
    isCollasible?: boolean,
    width?: number | string
}

export default function Sidebar({ children, width }: Props) {

    const { theme } = useContext(ThemeContext);

    return (
        <div style={{ width, padding: '2px' }}>
            {children}
        </div>
    );
}
