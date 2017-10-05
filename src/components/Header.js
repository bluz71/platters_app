import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { IndexLinkContainer } from 'react-router-bootstrap';

const Header = () => (
  <header>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">Platters</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <IndexLinkContainer to="/">
          <NavItem eventKey={1}>Home</NavItem>
        </IndexLinkContainer>
        <IndexLinkContainer to="/about">
          <NavItem eventKey={2}>About</NavItem>
        </IndexLinkContainer>
      </Nav>
    </Navbar>
  </header>
);

export default Header;
