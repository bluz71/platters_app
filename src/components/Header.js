import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IndexLinkContainer } from 'react-router-bootstrap';
import FontAwesome from 'react-fontawesome';
import { appAuth } from '../lib/appAuth';
import '../styles/Header.css';
import logo from '../images/platters-white.svg';

const renderSessionMenu = () => {
  // Not logged in.
  if (!appAuth.isLoggedIn()) {
    return (
      <Nav pullRight>
        <IndexLinkContainer to="/log_in" activeClassName='selected'>
          <NavItem>Log in</NavItem>
        </IndexLinkContainer>
        <IndexLinkContainer to="/sign_up" activeClassName='selected'>
          <NavItem>Sign up</NavItem>
        </IndexLinkContainer>
      </Nav>
    );
  }

  const username = appAuth.currentUser().name;

  // Active logged in session.
  return (
    <Nav pullRight>
      <NavDropdown
        eventKey="1"
        title={
          <span>
            <FontAwesome name="user" />&nbsp;&nbsp;{username}
          </span>
        }
      >
        <IndexLinkContainer to={`/comments/${username}`} activeClassName='selected'>
          <MenuItem eventKey="1.1">
            <FontAwesome name="comment-o" />&nbsp;&nbsp;Comments
          </MenuItem>
        </IndexLinkContainer>
        <MenuItem eventKey="1.2">
          <FontAwesome name="gear" />&nbsp;&nbsp;Account
        </MenuItem>
        <MenuItem eventKey="1.3">
          <FontAwesome name="sign-out" />&nbsp;&nbsp;Logout
        </MenuItem>
      </NavDropdown>
    </Nav>
  );
};

const Header = () => (
  <header>
    <Navbar fixedTop fluid collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to='/' className='PlattersBrand'>
            <img src={logo} alt="Platters" /> platters
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <IndexLinkContainer to="/artists" activeClassName='selected'>
            <NavItem>Artists</NavItem>
          </IndexLinkContainer>
          <IndexLinkContainer to="/albums" activeClassName="selected">
            <NavItem>Albums</NavItem>
          </IndexLinkContainer>
        </Nav>
        {renderSessionMenu()}
      </Navbar.Collapse>
    </Navbar>
  </header>
);

export default Header;
