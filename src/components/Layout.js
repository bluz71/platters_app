import React from 'react';
import { Route } from 'react-router-dom';
import { Grid } from 'react-bootstrap'
import './Layout.css'
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import AboutPage from './AboutPage';

const Layout = () => (
  <div>
    <Header />
    <div className="Main">
      <Grid>
        <Route path="/" exact component={HomePage} />
        <Route path="/about" component={AboutPage} />
      </Grid>
    </div>
    <Footer />
  </div>
);

export default Layout;
