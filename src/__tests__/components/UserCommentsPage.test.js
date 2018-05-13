import React from 'react';
import { shallow } from 'enzyme';
import UserCommentsPage from '../../components/UserCommentsPage';


// Details:
//   https://blog.rescale.com/testing-promise-side-effects-with-asyncawait
//   https://github.com/facebook/jest/issues/2157#issuecomment-279171856
const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe('<UserCommentsPage />', () => {
  it('renders user comments page', async () => {
    const match = { params: { id: 'joe' } };
    const wrapper = shallow(<UserCommentsPage  match={match}/>);
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });
});
