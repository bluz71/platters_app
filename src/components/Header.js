import React from 'react';
import { Grid, Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';
import './Header.css';
import logo from '../images/platters-white.svg';

const Header = () => (
  <header>
    <Navbar fixedTop>
      <Grid fluid>
        <Navbar.Header>
          <Navbar.Brand className="PlattersBrand">
            <a href="/"><img src={logo} alt="Platters" /> platters</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <IndexLinkContainer to="/artists" activeClassName='selected'>
            <NavItem eventKey={1}>Artists</NavItem>
          </IndexLinkContainer>
          <IndexLinkContainer to="/albums" activeClassName="selected">
            <NavItem eventKey={2}>Albums</NavItem>
          </IndexLinkContainer>
        </Nav>
      </Grid>
    </Navbar>
  </header>
);

export default Header;
