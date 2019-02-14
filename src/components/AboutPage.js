import React from 'react';
import { Row, Col, PageHeader } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/MiscPage.css';

const AboutPage = () => {
  document.title = 'Platters App';
  window.scrollTo(0, 0);

  return (
    <Row>
      <Col md={8} mdOffset={2}>
        <div className="MiscPage">
          <PageHeader>About</PageHeader>
          <p>
            Platters App, is an example web application developed using the{' '}
            <em>
              <a
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="standout"
              >
                React{' '}
              </a>
            </em>
            front-end JavaScript framework and associated technologies. Refer to
            the{' '}
            <Link to="/details" className="standout">
              {' '}
              details
            </Link>{' '}
            page for the complete set of technologies used.
          </p>
          <p>
            Platters App is an application that retrieves its data from an
            associated back-end
            <em>
              <a
                href="http://rubyonrails.org"
                target="_blank"
                rel="noopener noreferrer"
                className="standout"
              >
                {' '}
                Ruby on Rails{' '}
              </a>
            </em>
            application
            <a
              href="https://platters.cc"
              target="_blank"
              rel="noopener noreferrer"
              className="standout"
            >
              {' '}
              Platters{' '}
            </a>
            . Refer to the Platters{' '}
            <a
              href="https://platters.cc/about"
              target="_blank"
              rel="noopener noreferrer"
              className="standout"
            >
              about{' '}
            </a>
            page for information about that application and back-end API server.
          </p>

          <h2>Developer</h2>
          <p>
            My background is in IT (information technology), but in the areas of
            C++ systems programming as well as traditional system administration
            and systems management. After many years of doing that I wanted to
            move into something new, full-stack web development was the chosen{' '}
            <em>something new</em>. Note, coming to grips with full-stack web
            development has involved much time, learning and experimentation.
          </p>

          <h2>Sources</h2>
          <ul>
            <li>
              <p>
                Github repository:{' '}
                <a
                  href="https://github.com/bluz71/platters_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="standout"
                >
                  Platters App
                </a>
              </p>
            </li>
            <li>
              <p>
                Github account:{' '}
                <a
                  href="https://github.com/bluz71"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="standout"
                >
                  bluz71
                </a>
              </p>
            </li>
          </ul>

          <h2>Learning material</h2>
          <p>
            This application was developed, over an extended period, to put in
            practise self-taught web development and deployment knowledge gained
            from the following disparate sources:
          </p>
          <h3 className="spacer-left-xs">Books</h3>
          <ul>
            <li>
              <h4>
                <a
                  href="http://shop.oreilly.com/product/0636920049579.do"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </h4>
            </li>
            <li>
              <h4>
                <a
                  href="https://leanpub.com/the-road-to-learn-react"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  The Road to Learn React
                </a>
              </h4>
            </li>
          </ul>
          <h3 className="spacer-left-xs">Online</h3>
          <ul>
            <li>
              <h4>
                <a
                  href="https://www.codecademy.com/learn/react-101"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Codecademy Learn ReactJS: Part I
                </a>
              </h4>
            </li>
            <li>
              <h4>
                <a
                  href="https://www.codecademy.com/learn/react-102"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Codecademy Learn ReactJS: Part II
                </a>
              </h4>
            </li>
            <li>
              <h4>
                <a
                  href="https://www.udemy.com/react-redux"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Udemy Modern React with Redux
                </a>
              </h4>
            </li>
          </ul>

          <h2>Why React?</h2>
          <p>
            <em>React</em> was chosen, from a host of possible JavaScript
            development choices, due to the following appealing factors:
          </p>
          <ul className="spacer-top-sm">
            <li>
              <p>Abundant selection of learning material</p>
            </li>
            <li>
              <p>Future employment possibilities</p>
            </li>
            <li>
              <p>Active communities, both locally and abroad</p>
            </li>
          </ul>
          <br />
        </div>
      </Col>
    </Row>
  );
};

export default AboutPage;
