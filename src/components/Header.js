import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IndexLinkContainer } from 'react-router-bootstrap';
import '../styles/Header.css';
import logo from '../images/platters-white.svg';

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
        <Nav pullRight>
          <NavItem>Log in</NavItem>
          <NavItem>Sign up</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </header>
);

export default Header;
