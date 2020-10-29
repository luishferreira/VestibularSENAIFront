import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAddressCard, faFile } from '@fortawesome/free-solid-svg-icons'
import { NavItem, NavLink, Nav } from 'reactstrap';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggle }) => (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
        <div className="sidebar-header">
            <span color="info" onClick={toggle} style={{ color: "#fff" }}>
                &times;
            </span>
            <h3>Teste</h3>
        </div>
        <div className="side-menu">
            <Nav vertical className="list-unstyled pb-3">
                <NavItem>
                    <NavLink tag={Link} to={"/"}>
                        <FontAwesomeIcon icon={faHome} className="mr-2" />
                        Inicio
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to={"/1/"}>
                        <FontAwesomeIcon icon={faAddressCard} className="mr-2" />
                        Teste1
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to={"/2/"}>
                        <FontAwesomeIcon icon={faFile} className="mr-2" />
                        Teste2
                    </NavLink>
                </NavItem>
            </Nav>

        </div>
    </div>
)
export default Sidebar;