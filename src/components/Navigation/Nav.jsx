import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import './Nav.css'

export default class Navigation extends Component {
    render() { 
        return (
            <Navbar collapseOnSelect expand="xl" bg="" variant="dark">
                <Navbar.Brand href="/">MediaStack</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/search">
                            <Nav.Link href="/search">Search</Nav.Link>
                        </Nav.Link>
                        <Nav.Link href="/upload">
                            <Nav.Link href="/upload">Upload</Nav.Link>
                        </Nav.Link>
                        <Nav.Link href="/login">
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
