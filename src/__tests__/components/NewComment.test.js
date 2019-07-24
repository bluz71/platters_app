import React from 'react'
import { shallow, mount } from 'enzyme'
import { flushPromises, logInUser } from '../../helpers/testUtils'
import NewComment from '../../components/NewComment'

describe('<NewComment />', () => {
  it('renders without crashing', () => {
    shallow(<NewComment />)
  })

  it('creates a new comment with valid text', async () => {
    logInUser()
    const spyNewComment = jest.fn()
    const wrapper = mount(
      <NewComment onNewComment={spyNewComment} resourcePath='abc' />
    )
    wrapper.find('textarea').instance().value = 'A new comment'
    wrapper.find('button').simulate('submit')
    await flushPromises()
    wrapper.update()
    expect(spyNewComment).toHaveBeenCalled()
  })

  it('disables post it button for empty comments', () => {
    logInUser()
    const wrapper = mount(<NewComment resourcePath='abc' />)
    expect(wrapper.find('button').getDOMNode().disabled).toEqual(true)
  })

  it('disables post it button for comments greater than 280 characters', () => {
    logInUser()
    const wrapper = mount(<NewComment resourcePath='abc' />)
    // 'Post it' button will be enabled for comments up to 280 characters long.
    wrapper.find('textarea').instance().value = 'a'.repeat(280)
    wrapper.instance().handleCommentChange()
    expect(wrapper.find('button').getDOMNode().disabled).toEqual(false)
    // 'Post it' button will be disabled for comments exceeding 280 characters.
    wrapper.find('textarea').instance().value = 'a'.repeat(281)
    wrapper.instance().handleCommentChange()
    expect(wrapper.find('button').getDOMNode().disabled).toEqual(true)
  })
})
