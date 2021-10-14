import { Navbar, Nav } from 'react-bootstrap';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export default function Navigation() {
    
    const { theme } = useContext(ThemeContext);

    const NavLink = ({ href, body}: { href: string, body: string }): JSX.Element => (
        <Nav.Link href={href}>
            <Nav.Link style={{ color: theme.style.color }} href={href}>{body}</Nav.Link>
        </Nav.Link>
    );

    return (
        <Navbar collapseOnSelect expand="xl" bg="" variant="dark">
            <Navbar.Brand style={{ color: theme.style.color}} href="/">MediaStack</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink href="/search" body="Media"/>
                    <NavLink href="/explore" body="Explore"/>
                    <NavLink href="/tags" body="Tags"/>
                    <NavLink href="/upload" body="Upload"/>
                    <NavLink href="/login" body="Login"/>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
