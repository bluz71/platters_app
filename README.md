Platters App
============

This application, Platters App, is an example web application developed using
[React](http://reactjs.org) and associated technologies.

Build Status
------------

[![Build Status](https://travis-ci.org/bluz71/platters_app.svg?branch=master)](https://travis-ci.org/bluz71/platters_app)

Core Technologies
-----------------

* [React](https://reactjs.org)
* [Create React App](https://github.com/facebookincubator/create-react-app)
* [Ruby on Rails API back-end](https://platters.cc/details)

Significant JavaScript Libraries
--------------------------------

* [axios](https://github.com/axios/axios)
* [Numeral.js](https://github.com/blakeembrey/pluralize)
* [Pluralize](https://github.com/blakeembrey/pluralize)
* [React-Bootstrap](https://react-bootstrap.github.io)
* [React Router](https://reacttraining.com/react-router)
* [jwt-decode](https://github.com/auth0/jwt-decode)
* [velocity-react](https://github.com/google-fabric/velocity-react)
* [nprogress](https://github.com/rstacruz/nprogress)
* [local-time](https://www.npmjs.com/package/local-time)
* [linkify-lite](https://github.com/andre487/node-linkify-lite)

Deployment
----------

* [Surge](https://surge.sh)
* [Surge CLI](https://github.com/sintaxi/surge)

Development
-----------

* [Travis CI](https://travis-ci.org/bluz71/platters)
* [eslint](https://eslint.org)

Testing
-------

* [Jest](https://facebook.github.io/jest)
* [Enzyme](http://airbnb.io/enzyme)
* [jest-enzyme](https://github.com/blainekasten/enzyme-matchers)

Miscellaneous application features
----------------------------------

* #### [Browser navigation with React components](https://bluz71.github.io/2017/12/22/browser-navigation-in-react-components.html)
The main content React components use HTML5 pushState such that browser
navigation correctly transistions through client-side page changes.

* #### Live Search Result
Artists and Albums search results will update live as a user is typing in
search terms. Note, debounce of 500ms is used control how often search results
are retrieved from the back-end server.

* #### Busy submission buttons
Form submission buttons, such as the Albums filter Select button, will display
a spinner icon whilst the submitted form is being processed.

* #### [Honeypot field protection against Bots](https://dev.to/felipperegazio/how-to-create-a-simple-honeypot-to-protect-your-web-forms-from-spammers--25n8)
User sign-up incorporates simple honeypot field protection against internet
bots.

* #### Short-lived API tokens with unobstrusive refreshing
User session tokens (JWT) created by the server are short-lived (30 minutes),
but are unobtrusively refreshed by this application (up to 6 months). Note,
resetting a user password via Forgot Password? will revoke all current sessions
for that user, useful if the user has had their session hijacked via a lost of
stolen machine.
