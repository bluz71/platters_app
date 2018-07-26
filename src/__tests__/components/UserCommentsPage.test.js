import React from 'react';
import { shallow } from 'enzyme';
import flushPromises from '../../helpers/flushPromises';
import UserCommentsPage from '../../components/UserCommentsPage';

describe('<UserCommentsPage />', () => {
  it('renders user comments page', async () => {
    const match = { params: { id: 'joe' } };
    const wrapper = shallow(<UserCommentsPage match={match} />);
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders all user comments when scrolled', async () => {
    const match = { params: { id: 'joe' } };
    const wrapper = shallow(<UserCommentsPage match={match} />);
    await flushPromises();
    wrapper.instance().handlePageEnd();
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('handles invalid user', async () => {
    const match = { params: { id: 'nobody' } };
    const wrapper = shallow(<UserCommentsPage match={match} />);
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });
});
