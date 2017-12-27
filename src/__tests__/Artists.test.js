import React from 'react';
import { shallow } from 'enzyme';
import Artists from '../components/Artists';

it('renders without crashing', () => {
  shallow(<Artists />);
});
