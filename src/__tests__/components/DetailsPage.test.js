import React from 'react';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import DetailsPage from '../../components/DetailsPage';
import { PageHeader } from 'react-bootstrap';

describe('<DetailsPage />', () => {
  it('renders without crashing', () => {
    shallow(<DetailsPage />);
  });

  it('contains expected page header', () => {
    const wrapper = shallow(<DetailsPage />);
    const pageHeader = <PageHeader>Core technologies</PageHeader>;
    expect(wrapper).toContainReact(pageHeader);
  });
});
