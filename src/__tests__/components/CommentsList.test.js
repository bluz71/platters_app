import React from 'react';
import { shallow } from 'enzyme';
import CommentsList from '../../components/CommentsList';

const comments = () => {
  return [
    {
      'id': 1,
      'body': 'First comment',
      'created_at': '<time datetime=\"2018-05-09T04:05:00Z\" data-local=\"time-ago\">May  9, 2018  4:05am</time>',
      'user_name': 'joe',
      'user_slug': 'joe',
      'gravatar_url': 'https://gravatar.com/avatar/88884e5cb90c02031f031bc4760fcf69?s=80&r=pg&d=identicon',
      'for': 'Album',
      'artist': 'ABC',
      'name': 'ABC',
      'path': 'artist/abc/album/abc'
    },
    {
      'id': 1,
      'body': 'Second comment',
      'created_at': '<time datetime=\"2018-05-05T05:34:56Z\" data-local=\"time-ago\">May  5, 2018  5:34am</time>',
      'user_name': 'joe',
      'user_slug': 'joe',
      'gravatar_url': 'https://gravatar.com/avatar/88884e5cb90c02031f031bc4760fcf69?s=80&r=pg&d=identicon',
      'for': 'Album',
      'artist': 'DEF',
      'name': 'DEF',
      'path': 'artist/def/album/def'
    }
  ];
};

describe('<CommentsList />', () => {
  it('renders without crashing', () => {
    shallow(<CommentsList comments={[]} />);
  });

  it('renders a list of comments', () => {
    const wrapper = shallow(<CommentsList comments={comments()} />);
    expect(wrapper).toMatchSnapshot();
  });
});
