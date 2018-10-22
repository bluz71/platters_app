import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import '../styles/Footer.css';

const Footer = () => (
  <footer className="Footer">
    <Grid fluid>
      <div>
        <small>
          <ul className="Footer-list">
            <Link to="/about">
              <li>About</li>
            </Link>
            <Link to="/details">
              <li>Details</li>
            </Link>
          </ul>
        </small>
      </div>
    </Grid>
  </footer>
);

export default Footer;
