import React from 'react';
import { Route } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import './Layout.css';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import Artists from './Artists';
import Albums from './Albums';
import AboutPage from './AboutPage';
import DetailsPage from './DetailsPage';

const Layout = () => (
  <div>
    <Header />
    <div className="Main">
      <Grid>
        <Route path="/" exact component={HomePage} />
        <Route path="/artists" exact component={Artists} />
        <Route path="/albums" exact component={Albums} />
        <Route path="/about" component={AboutPage} />
        <Route path="/details" component={DetailsPage} />
      </Grid>
    </div>
    <Footer />
  </div>
);

export default Layout;
