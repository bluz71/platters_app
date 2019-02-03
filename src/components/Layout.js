import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'nprogress/nprogress.css';
import '../styles/Layout.css';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import ArtistsPage from './ArtistsPage';
import ArtistShowPage from './ArtistShowPage';
import AlbumsPage from './AlbumsPage';
import AlbumShowPage from './AlbumShowPage';
import UserCommentsPage from './UserCommentsPage';
import LoginPage from './LoginPage';
import Logout from './Logout';
import PasswordNewPage from './PasswordNewPage';
import PasswordEditPage from './PasswordEditPage';
import AboutPage from './AboutPage';
import DetailsPage from './DetailsPage';
import NotFound from './NotFound';

const Layout = () => (
  <div>
    <Header />
    <div className="Main">
      <ToastContainer
        autoClose={false}
        draggablePercent={50}
        position="top-left"
        transition={Zoom}
      />
      <Grid>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/albums" exact component={AlbumsPage} />
          <Route
            path="/artist/:artist_id/album/:album_id"
            component={AlbumShowPage}
          />
          <Route path="/artists" exact component={ArtistsPage} />
          <Route path="/artist/:id" component={ArtistShowPage} />
          <Route path="/comments/:id" component={UserCommentsPage} />
          <Route path="/log_in" component={LoginPage} />
          <Route path="/log_out" component={Logout} />
          <Route path="/password/new" component={PasswordNewPage} />
          <Route
            path="/users/:user_id/password/edit"
            component={PasswordEditPage}
          />
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
