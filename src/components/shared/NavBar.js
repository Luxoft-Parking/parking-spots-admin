import React from 'react'
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import PropTypes from 'prop-types'
import luxLogo from './logo-blue-new.svg';
function NavBar(props) {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand ><img
            height="50"
            className="d-inline-block align-middle logo" src={luxLogo}/>{'Luxoft Parking'}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/logout">Logout</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

NavBar.propTypes = {

}

export default NavBar

