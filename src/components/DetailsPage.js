import React from 'react';
import { Row, Col, PageHeader } from 'react-bootstrap';
import '../styles/DetailsPage.css';

const DetailsPage = () => {
  return (
    <Row>
      <Col md={10} mdOffset={1}>
        <div className="DetailsPage">
          <PageHeader>Core technologies</PageHeader>
          <ul>
            <li>
              <h3>
                <a href="https://reactjs.org" target="_blank">React</a> <small>version 16</small>
              </h3>
              <p>A JavaScript library for building user interfaces.</p>
            </li>
            <li>
              <h3>
                <a href="https://github.com/facebookincubator/create-react-app" target="_blank">Create React App</a>
              </h3>
              <p>Creates React apps with no build configuration.</p>
            </li>
          </ul>
          <br />

          <h2 class="page-header">Significant JavaScript Libraries</h2>
          <ul>
            <li>
              <h3>
                <a href="https://github.com/axios/axios" target="_blank">axios</a>
              </h3>
              <p>Promise based HTTP client for the browser and node.js.</p>
            </li>
            <li>
              <h3>
                <a href="http://numeraljs.com" target="_blank">Numeral.js</a>
              </h3>
              <p>A javascript library for formatting and manipulating numbers.</p>
            </li>
            <li>
              <h3>
                <a href="https://github.com/blakeembrey/pluralize" target="_blank">Pluralize</a>
              </h3>
              <p>Pluralize and singularize words.</p>
            </li>
            <li>
              <h3>
                <a href="https://react-bootstrap.github.io" target="_blank">React-Bootstrap</a>
              </h3>
              <p>The Bootstrap framework, a mobile first front-end library, rebuilt for React.</p>
            </li>
            <li>
              <h3>
                <a href="https://reacttraining.com/react-router" target="_blank">React Router</a>
              </h3>
              <p>A declarative routing library for React applications.</p>
            </li>
          </ul>
          <br />


          <h2 class="page-header">Deployment</h2>
          <ul>
            <li>
              <h3><a href="https://surge.sh" target="_blank">Surge</a></h3>
              <p>
                A <em>content delivery network</em> (CDN) provider for front-end developers
                who need to deploy and host static site projects.
              </p>
            </li>
            <li>
              <h3>
                <a href="https://github.com/sintaxi/surge" target="_blank">Surge CLI</a>
              </h3>
              <p>The command line interface to the Surge service.</p>
            </li>
          </ul>
          <br />

          <h2 class="page-header">Development</h2>
          <ul>
            <li>
              <h3><a href="https://travis-ci.org/bluz71/platters" target="_blank">Travis CI</a></h3>
              <p>
                Travis CI is a continuous integration service used to build and test
                software projects hosted at GitHub.
              </p>
            </li>
            <li>
              <h3><a href="https://eslint.org" target="_blank">eslint</a></h3>
              <p>The pluggable linting utility for JavaScript and JSX</p>
            </li>
          </ul>
          <br />

          <h2 class="page-header">Testing</h2>
          <ul>
            <li>
              <h3>
                <a href="https://facebook.github.io/jest" target="_blank">Jest</a>
              </h3>
              <p>A testing framework for JavaScript.</p>
            </li>
            <li>
              <h3>
                <a href="http://airbnb.io/enzyme" target="_blank">Enzyme</a>
              </h3>
              <p>
                Enzyme is a JavaScript Testing utility for React that makes it
                easier to assert, manipulate, and traverse React Components'
                output.
              </p>
            </li>
            <li>
              <h3>
                <a href="https://github.com/blainekasten/enzyme-matchers" target="_blank">jest-enzyme</a>
              </h3>
              <p>An assertion library for the Enzyme testing utility.</p>
            </li>
          </ul>
          <br />

          <h2 class="page-header">Miscellaneous application features</h2>
          <ul>
            <li>
              <h3><a href="https://bluz71.github.io/2017/12/22/browser-navigation-in-react-components.html" target="_blank">Browser navigation with React components</a></h3>
              <p>
                The main content React components use HTML5 <em>pushState</em>
                such that browser navigation correctly transistions through
                client-side page changes.
              </p>
            </li>
          </ul>
        </div>
      </Col>
    </Row>
  );
};

export default DetailsPage;
