import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import useNavigation, { NavigationAction } from '../../hooks/useNavigation';
import { Navbar, Nav } from 'react-bootstrap';

export default function Navigation() {

    const { navigate } = useNavigation();
    const { theme } = useContext(ThemeContext);

    const NavLink = ({ body, navAction }: { body: string, navAction: NavigationAction }): JSX.Element => (
        <Nav.Link style={{ color: theme.style.color }} onClick={() => navigate(navAction)}>{body}</Nav.Link>
    );

    return (
        <Navbar collapseOnSelect expand='xl' bg='' variant='dark'>
            <Navbar.Brand style={{ color: theme.style.color}} onClick={() => navigate({ name: 'index' })}>MediaStack</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='mr-auto'>
                    <NavLink body='Media' navAction={{ name: 'search', data: { mode: 2 } }} />
                    <NavLink body='Attributes' navAction={{ name: 'attributes' }} />
                    <NavLink body='Upload' navAction={{ name: 'upload' }} />
                    <NavLink body='Login' navAction={{ name: 'login' }}/>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
