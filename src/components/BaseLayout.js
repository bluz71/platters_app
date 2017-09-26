import React from 'react';
import { Link, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';

const BaseLayout = () => {
  return (
    <div className="base">
      <header>
        <p>React Router v4 Browser Example</p>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/me'>Profile</Link></li>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
          </ul>
        </nav>
      </header>
      <div className="container">
        <Route path="/" exact component={HomePage} />
        <Route path="/about" component={AboutPage} />
      </div>
      <footer>
        React Router v4 Browser Example (c) 2017
      </footer>
    </div>
  );
};

export default BaseLayout;
