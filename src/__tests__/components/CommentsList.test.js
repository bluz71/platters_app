import React from 'react'
import { shallow, mount } from 'enzyme'
import { flushPromises, logInUser } from '../../helpers/testUtils'
import { MemoryRouter } from 'react-router-dom'
import CommentsList from '../../components/CommentsList'

const comments = () => {
  const comments = [
    {
      id: 1,
      body: 'First comment',
      created_at:
        '<time datetime="2018-05-09T04:05:00Z" data-local="time-ago">May  9, 2018  4:05am</time>',
      user_name: 'fred',
      user_slug: 'fred',
      gravatar_url:
        'https://gravatar.com/avatar/88884e5cb90c02031f031bc4760fcf69?s=80&r=pg&d=identicon',
      for: 'Album',
      artist: 'ABC',
      name: 'ABC',
      path: 'artist/abc/album/abc',
      delete_path: '/abc/abc/comments/1'
    },
    {
      id: 2,
      body: 'Second comment',
      created_at:
        '<time datetime="2018-05-05T05:34:56Z" data-local="time-ago">May  5, 2018  5:34am</time>',
      user_name: 'fred',
      user_slug: 'fred',
      gravatar_url:
        'https://gravatar.com/avatar/88884e5cb90c02031f031bc4760fcf69?s=80&r=pg&d=identicon',
      for: 'Album',
      artist: 'ABC',
      name: 'ABC',
      path: 'artist/abc/album/abc',
      delete_path: '/abc/abc/comments/2'
    }
  ]

  return new Map(comments.map(c => [c.id, c]))
}

describe('<CommentsList />', () => {
  it('renders without crashing', () => {
    shallow(<CommentsList comments={new Map()} />)
  })

  it('renders a list of comments', () => {
    const wrapper = shallow(<CommentsList comments={comments()} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders a list of comments with shortHeader', () => {
    const wrapper = shallow(<CommentsList comments={comments()} shortHeader />)
    expect(wrapper).toMatchSnapshot()
  })

  it('can delete a comment', async () => {
    logInUser()
    // Mock window.confirm which will be invoked when deleting a comment.
    window.confirm = jest.fn(() => true)
    const spyCommentDelete = jest.fn()
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <CommentsList
          comments={comments()}
          onDeleteComment={spyCommentDelete}
        />
      </MemoryRouter>
    )
    wrapper
      .find('span.icon')
      .first()
      .simulate('click')
    await flushPromises()
    wrapper.update()
    expect(spyCommentDelete).toHaveBeenCalled()
  })

  it('will not delete a comment if the server refuses', async () => {
    logInUser()
    // Mock window.confirm which will be invoked when deleting a comment.
    window.confirm = jest.fn(() => true)
    const spyCommentDelete = jest.fn()
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <CommentsList
          comments={comments()}
          onDeleteComment={spyCommentDelete}
        />
      </MemoryRouter>
    )
    wrapper
      .find('span.icon')
      .last()
      .simulate('click')
    await flushPromises()
    wrapper.update()
    expect(spyCommentDelete).not.toHaveBeenCalled()
  })
})
