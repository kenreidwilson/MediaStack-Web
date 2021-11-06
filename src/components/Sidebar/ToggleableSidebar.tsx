import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import usePlatform from '../../hooks/usePlatform';
import { Offcanvas } from 'react-bootstrap';
import Sidebar from './Sidebar';

type Props = {
    children: JSX.Element,
    width?: number | string,
    isShown?: boolean,
    setIsShown?: (isShowed: boolean) => void
}

export default function ToggleableSidebar({ children, width = 'auto', isShown = true, setIsShown = () => {} }: Props) {

    const { isMobile } = usePlatform();
    const { theme } = useContext(ThemeContext);

    return (
        <>
        {!isMobile ? 

        <div>
            {isShown && <Sidebar width={width}>{children}</Sidebar>}
        </div> : 
        
        <Offcanvas style={{ width }} show={isShown} onHide={() => setIsShown(false)}>
            <Offcanvas.Header style={theme.style} closeButton>
                <Offcanvas.Title style={theme.style}>Thumbnail Page</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body style={theme.style}>{children}</Offcanvas.Body>
        </Offcanvas>}
        </>
    );
}
