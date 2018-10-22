import React from 'react';
import { shallow, mount } from 'enzyme';
import Search from '../../components/Search';

// Mock the lodash debounce function used in the Search component.
// See: https://github.com/facebook/jest/issues/3465
jest.mock('lodash/debounce', () => jest.fn((fn) => fn));

describe('<Search />', () => {
  it('renders without crashing', () => {
    shallow(<Search placeholder="Items" />);
  });

  it('types in a term', () => {
    const spySearchChange = jest.fn();
    const wrapper = mount(
      <Search placeholder="Items" onSearchChange={spySearchChange} />
    );
    wrapper.find('input').simulate('change', { target: { value: 'abc' } });
    expect(spySearchChange).toHaveBeenCalled();
  });
});
