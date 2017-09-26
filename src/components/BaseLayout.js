import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { IndexLinkContainer } from 'react-router-bootstrap';
import HomePage from './HomePage';
import AboutPage from './AboutPage';

const BaseLayout = () => {
  return (
    <div className="base">
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
      <div className="container">
        <Route path="/" exact component={HomePage} />
        <Route path="/about" component={AboutPage} />
      </div>
      <footer>
        <p>
          React Router v4 Browser Example (c) 2017
        </p>
      </footer>
    </div>
  );
};

export default BaseLayout;
