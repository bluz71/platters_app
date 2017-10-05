import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import AboutPage from './AboutPage';

const Layout = () => (
  <div className="base">
    <Header />
    <div className="container">
      <Route path="/" exact component={HomePage} />
      <Route path="/about" component={AboutPage} />
    </div>
    <Footer />
  </div>
);

export default Layout;
