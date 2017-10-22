// @flow
import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';
import './Header.css';
import logo from '../images/platters-white.svg';

const Header = () => (
  <header>
    <Navbar fixedTop fluid collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand className="PlattersBrand">
          <a href="/"><img src={logo} alt="Platters" /> platters</a>
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
