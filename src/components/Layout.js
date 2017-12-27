import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import '../styles/Layout.css';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import Artists from './Artists';
import ArtistShow from './ArtistShow';
import Albums from './Albums';
import AlbumShow from './AlbumShow';
import AboutPage from './AboutPage';
import DetailsPage from './DetailsPage';
import NotFound from './NotFound';

const Layout = () => (
  <div>
    <Header />
    <div className="Main">
      <Grid>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/albums" exact component={Albums} />
          <Route path="/artist/:artist_id/album/:album_id" component={AlbumShow}  />
          <Route path="/artists" exact component={Artists} />
          <Route path="/artist/:id" component={ArtistShow}  />
          <Route path="/about" component={AboutPage} />
          <Route path="/details" component={DetailsPage} />
          <Route component={NotFound} />
        </Switch>
      </Grid>
    </div>
    <Footer />
  </div>
);

export default Layout;
