import React from 'react';
import { Row, Col, PageHeader } from 'react-bootstrap';
import '../styles/MiscPage.css';

const DetailsPage = () => {
  window.scrollTo(0, 0);

  return (
    <Row>
      <Col md={10} mdOffset={1}>
        <div className="MiscPage">
          <PageHeader>Core technologies</PageHeader>
          <ul>
            <li>
              <h3>
                <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">React</a> <small>version 16</small>
              </h3>
              <p>A JavaScript library for building user interfaces.</p>
            </li>
            <li>
              <h3>
                <a href="https://github.com/facebookincubator/create-react-app" target="_blank" rel="noopener noreferrer">Create React App</a>
              </h3>
              <p>Creates React apps with no build configuration.</p>
            </li>
            <li>
              <h3>
                <a href="https://platters.live/details" target="_blank" rel="noopener noreferrer">Ruby on Rails API back-end</a>
              </h3>
              <p>
                Content for this application is delivered in JSON format from
                a complimentary <a href="https://platters.live/details" target="_blank" rel="noopener noreferrer" className="standout">Ruby on Rails</a> back-end
                API application.
              </p>
            </li>
          </ul>
          <br />

          <h2 className="page-header">Significant JavaScript Libraries</h2>
          <ul>
            <li>
              <h3>
                <a href="https://github.com/axios/axios" target="_blank" rel="noopener noreferrer">axios</a>
              </h3>
              <p>Promise based HTTP client for the browser and node.js.</p>
            </li>
            <li>
              <h3>
                <a href="http://numeraljs.com" target="_blank" rel="noopener noreferrer">Numeral.js</a>
              </h3>
              <p>A javascript library for formatting and manipulating numbers.</p>
            </li>
            <li>
              <h3>
                <a href="https://github.com/blakeembrey/pluralize" target="_blank" rel="noopener noreferrer">Pluralize</a>
              </h3>
              <p>Pluralize and singularize words.</p>
            </li>
            <li>
              <h3>
                <a href="https://react-bootstrap.github.io" target="_blank" rel="noopener noreferrer">React-Bootstrap</a>
              </h3>
              <p>The Bootstrap framework, a mobile first front-end library, rebuilt for React.</p>
            </li>
            <li>
              <h3>
                <a href="https://reacttraining.com/react-router" target="_blank" rel="noopener noreferrer">React Router</a>
              </h3>
              <p>A declarative routing library for React applications.</p>
            </li>
            <li>
              <h3>
                <a href="https://github.com/google-fabric/velocity-react" target="_blank" rel="noopener noreferrer">velocity-react</a>
              </h3>
              <p>
                React components for interacting with
                the <a href="http://velocityjs.org/" target="_blank" rel="noopener noreferrer" className="standout">Velocity</a> DOM
                animation library. These components are used to animate effects
                such as the Artists search form <em>slide-down</em> motion.
              </p>
            </li>
            <li>
              <h3>
                <a href="https://github.com/rstacruz/nprogress" target="_blank" rel="noopener noreferrer">nprogress</a>
              </h3>
              <p>
                Pages which may be slow to load, such as the Artists or Albums
                pages, will display a slim progress bar, from this library,
                whilst the page is retrieving content from the back-end API
                server.
              </p>
            </li>
            <li>
              <h3>
                <a href="https://www.npmjs.com/package/local-time" target="_blank" rel="noopener noreferrer">local-time</a>
              </h3>
              <p>
                Convert server-side timestamps into end-user local times. This
                library affords artist and album comments to be displayed
                using Twitter-like local-time-ago timestamps.
              </p>
            </li>
          </ul>
          <br />


          <h2 className="page-header">Deployment</h2>
          <ul>
            <li>
              <h3><a href="https://surge.sh" target="_blank" rel="noopener noreferrer">Surge</a></h3>
              <p>
                A <em>content delivery network</em> (CDN) provider for front-end
                developers who need to deploy and host static site projects.
                Details about using Surge can be found 
                <a href="https://hackernoon.com/simple-react-development-in-2017-113bd563691f" target="_blank" rel="noopener noreferrer" className="standout"> here</a>
              </p>
            </li>
            <li>
              <h3>
                <a href="https://github.com/sintaxi/surge" target="_blank" rel="noopener noreferrer">Surge CLI</a>
              </h3>
              <p>The command line interface to the Surge service.</p>
            </li>
          </ul>
          <br />

          <h2 className="page-header">Development</h2>
          <ul>
            <li>
              <h3><a href="https://travis-ci.org/bluz71/platters" target="_blank" rel="noopener noreferrer">Travis CI</a></h3>
              <p>
                Travis CI is a continuous integration service used to build and test
                software projects hosted at GitHub.
              </p>
            </li>
            <li>
              <h3><a href="https://eslint.org" target="_blank" rel="noopener noreferrer">eslint</a></h3>
              <p>The pluggable linting utility for JavaScript and JSX</p>
            </li>
          </ul>
          <br />

          <h2 className="page-header">Testing</h2>
          <ul>
            <li>
              <h3>
                <a href="https://facebook.github.io/jest" target="_blank" rel="noopener noreferrer">Jest</a>
              </h3>
              <p>A testing framework for JavaScript.</p>
            </li>
            <li>
              <h3>
                <a href="http://airbnb.io/enzyme" target="_blank" rel="noopener noreferrer">Enzyme</a>
              </h3>
              <p>
                Enzyme is a JavaScript Testing utility for React that makes it
                easier to assert, manipulate, and traverse React Components'
                output.
              </p>
            </li>
            <li>
              <h3>
                <a href="https://github.com/blainekasten/enzyme-matchers" target="_blank" rel="noopener noreferrer">jest-enzyme</a>
              </h3>
              <p>An assertion library for the Enzyme testing utility.</p>
            </li>
          </ul>
          <br />

          <h2 className="page-header">Miscellaneous application features</h2>
          <ul>
            <li>
              <h3><a href="https://bluz71.github.io/2017/12/22/browser-navigation-in-react-components.html" target="_blank" rel="noopener noreferrer">Browser navigation with React components</a></h3>
              <p>
                The main content React components use HTML5 <em>pushState</em> such
                that browser navigation correctly transistions through
                client-side page changes.
              </p>
            </li>
            <li>
              <h3>Live Search results</h3>
              <p>
                Artists and Albums search results will update live as a user is
                typing in search terms. Note,
                <a href="https://lodash.com/docs#debounce" target="_blank" rel="noopener noreferrer" className="standout"> debounce </a> 
                of 500ms is used control how often search results are retrieved
                from the back-end server.
              </p>
            </li>
            <li>
              <h3>Busy submission buttons</h3>
              <p>
                Form submission buttons, such as the Albums
                filter <em>Select</em> button, will display a spinner icon
                whilst the submitted form is being processed.
              </p>
            </li>
          </ul>
          <br />

          <h2 className="page-header">Logo</h2>
          <p>
            Record player icon, made by&nbsp;
            <a href="http://www.flaticon.com/authors/freepik" target="_blank" rel="noopener noreferrer" className="standout">Freepik</a> from&nbsp;
            <a href="http://www.flaticon.com" target="_blank" rel="noopener noreferrer" className="standout">www.flaticon.com</a>, is licensed by&nbsp;
            <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener noreferrer" className="standout">CC 3.0 BY</a>
          </p>
          <br />
        </div>
      </Col>
    </Row>
  );
};

export default DetailsPage;
