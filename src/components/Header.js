import React from 'react';
import { Grid, Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';

const Header = () => (
  <header>
    <Navbar fixedTop>
      <Grid fluid>
        <Navbar.Header>
          <Navbar.Brand className="PlattersBrand">
            <a href="/">platters</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <IndexLinkContainer to="/" activeClassName='selected'>
            <NavItem eventKey={1}>Home</NavItem>
          </IndexLinkContainer>
          <IndexLinkContainer to="/about" activeClassName="selected">
            <NavItem eventKey={2}>About</NavItem>
          </IndexLinkContainer>
        </Nav>
      </Grid>
    </Navbar>
  </header>
);

export default Header;
