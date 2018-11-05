import React from 'react';
import { shallow, mount } from 'enzyme';
import { flushPromises, logInUser } from '../../helpers/testUtils';
import NewComment from '../../components/NewComment';

describe('<NewComment />', () => {
  it('renders without crashing', () => {
    shallow(<NewComment />);
  });

  it('creates a new comment with valid text', async () => {
    logInUser();
    const spyNewComment = jest.fn();
    const wrapper = mount(
      <NewComment onNewComment={spyNewComment} resourcePath="abc" />
    );
    wrapper.find('textarea').instance().value = 'A new comment';
    wrapper.find('button').simulate('submit');
    await flushPromises();
    wrapper.update();
    expect(spyNewComment).toHaveBeenCalled();
  });
});
