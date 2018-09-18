import React from 'react';
import { shallow } from 'enzyme';
import LoginPage from '../../components/LoginPage';

describe('<LoginPage />', () => {
  it('renders without crashing', () => {
    shallow(<LoginPage />);
  });
});
