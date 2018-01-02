import React from 'react';
import { shallow } from 'enzyme';
import App from '../../App';

// Snapshot testing with Jest details:
//   https://hackernoon.com/testing-react-components-with-jest-and-enzyme-41d592c174f
it('renders without crashing', () => {
  shallow(<App />);
});
