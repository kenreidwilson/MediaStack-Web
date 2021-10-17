import { Navbar, Nav } from 'react-bootstrap';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import useNavigation from '../hooks/useNavigation';

export default function Navigation() {

    const { navigate } = useNavigation();
    const { theme } = useContext(ThemeContext);

    const NavLink = ({ page, pageData, body }: { page: string, pageData?: any, body: string }): JSX.Element => (
        <Nav.Link style={{ color: theme.style.color }} onClick={() => navigate(page, pageData)}>{body}</Nav.Link>
    );

    return (
        <Navbar collapseOnSelect expand="xl" bg="" variant="dark">
            <Navbar.Brand style={{ color: theme.style.color}} onClick={() => navigate("/")}>MediaStack</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink page="/search" body="Media" pageData={{ mode: 2 }} />
                    <NavLink page="/explore" body="Explore"/>
                    <NavLink page="/tags" body="Tags"/>
                    <NavLink page="/upload" body="Upload"/>
                    <NavLink page="/login" body="Login"/>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
