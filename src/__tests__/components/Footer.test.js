import React from 'react';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

describe('<Footer />', () => {
  it('renders without crashing', () => {
    shallow(<Footer />);
  });

  it('contains a list', () => {
    const wrapper = shallow(<Footer />);
    const list = (
      <ul className="Footer-list">
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/details">
          <li>Details</li>
        </Link>
      </ul>
    );
    expect(wrapper).toContainReact(list);
  });
});
