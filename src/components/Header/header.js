import React, { useState } from 'react';
import {
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

export default function Header() {
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <header>
            <Navbar>
                <Container>
                    <NavbarBrand href="/" className="mr-auto">Teste</NavbarBrand>
                    <NavbarToggler onClick={toggleNavbar} className="mr-2"></NavbarToggler>
                    <Collapse isOpen={!collapsed} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink href="/1/"> Teste1</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/2/">Teste 2</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </header>
    )
}