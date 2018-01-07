import React from 'react';
import { Row, Col, PageHeader } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/MiscPage.css';

const AboutPage = () => {
  window.scrollTo(0,0);

  return (
    <Row>
      <Col md={8} mdOffset={2}>
        <div className="MiscPage">
          <PageHeader>About</PageHeader>
          <p>
            Platters App, is an example web application developed
            using the <em><a href="https://reactjs.org" target="_blank" rel="noopener noreferrer" class="standout">React </a></em>
            front-end JavaScript framework and associated technologies. Refer
            to the <Link to="/details" className="standout"> details</Link> page
            for the complete set of technologies used.
          </p>
          <p>
            Platters App is an application that retrieves its data
            from an associated back-end
            <em><a href="http://rubyonrails.org" target="_blank" rel="noopener noreferrer" class="standout"> Ruby on Rails </a></em>
            application
            <a href="https://platters.live" target="_blank" rel="noopener noreferrer" class="standout"> Platters </a>.
            Refer to the Platters <a href="https://platters.live/about" target="_blank" rel="noopener noreferrer" class="standout">about </a>
            page for information about that application and back-end API server.
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default AboutPage;
