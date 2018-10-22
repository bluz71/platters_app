import React from 'react';
import { shallow, mount } from 'enzyme';
import { flushPromises } from '../../helpers/testUtils';
import AlbumsFilter from '../../components/AlbumsFilter';

describe('<AlbumsFilter />', () => {
  it('renders without crashing', async () => {
    shallow(<AlbumsFilter />);
  });

  it('selects a genre', async () => {
    const wrapper = mount(<AlbumsFilter />);
    await flushPromises();
    wrapper.update();
    wrapper.find('select').instance().value = 'Rock';
    expect(wrapper.instance().genreValue()).toEqual('Rock');
  });

  it('selects year range', async () => {
    const wrapper = mount(<AlbumsFilter />);
    await flushPromises();
    wrapper.update();
    wrapper.find('input.year').instance().value = '2000..2009';
    expect(wrapper.instance().yearValue()).toEqual('2000..2009');
  });

  it('selects sort by title', async () => {
    const wrapper = mount(<AlbumsFilter />);
    const spySortTitle = jest.spyOn(wrapper.instance(), 'handleSortTitle');
    await flushPromises();
    wrapper.instance().handleSortTitle = spySortTitle;
    wrapper.update();
    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { checked: true } });
    expect(spySortTitle).toHaveBeenCalled();
  });

  it('selects sort by year', async () => {
    const wrapper = mount(<AlbumsFilter />);
    const spySortYear = jest.spyOn(wrapper.instance(), 'handleSortYear');
    await flushPromises();
    wrapper.instance().handleSortYear = spySortYear;
    wrapper.update();
    wrapper
      .find('input')
      .at(2)
      .simulate('change', { target: { checked: true } });
    expect(spySortYear).toHaveBeenCalled();
  });

  it('selects order forward', async () => {
    const wrapper = mount(<AlbumsFilter />);
    const spyOrderForward = jest.spyOn(
      wrapper.instance(),
      'handleOrderForward'
    );
    await flushPromises();
    wrapper.instance().handleOrderForward = spyOrderForward;
    wrapper.update();
    wrapper
      .find('input')
      .at(3)
      .simulate('change', { target: { checked: true } });
    expect(spyOrderForward).toHaveBeenCalled();
  });

  it('selects order reverse', async () => {
    const wrapper = mount(<AlbumsFilter />);
    const spyOrderReverse = jest.spyOn(
      wrapper.instance(),
      'handleOrderReverse'
    );
    await flushPromises();
    wrapper.instance().handleOrderReverse = spyOrderReverse;
    wrapper.update();
    wrapper
      .find('input')
      .at(4)
      .simulate('change', { target: { checked: true } });
    expect(spyOrderReverse).toHaveBeenCalled();
  });

  it('submits', async () => {
    const spySubmit = jest.fn();
    const wrapper = mount(<AlbumsFilter onFilterSubmit={spySubmit} />);
    await flushPromises();
    wrapper.update();
    wrapper.find('button').simulate('submit');
    expect(spySubmit).toHaveBeenCalled();
  });
});
