import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { flushPromises } from '../../helpers/testUtils';
import * as toastModule from '../../helpers/toastMessage';
import PasswordNewPage from '../../components/PasswordNewPage';

describe('<PasswordNewPage />', () => {
  it('it renders without crashing', () => {
    shallow(<PasswordNewPage />);
  });

  it('with valid email address', async () => {
    const spyAlert = jest.spyOn(toastModule, 'toastAlert');
    const spyNotice = jest.spyOn(toastModule, 'toastNotice');
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <PasswordNewPage />
      </MemoryRouter>
    );
    wrapper.find('input.email').instance().value = 'fred@example.com';
    wrapper.find('button').simulate('submit');
    await flushPromises();
    expect(spyAlert).not.toHaveBeenCalled();
    expect(spyNotice).toHaveBeenCalled();
    spyAlert.mockRestore();
    spyNotice.mockRestore();
  });

  it('with invalid email address', async () => {
    const spyAlert = jest.spyOn(toastModule, 'toastAlert');
    const spyNotice = jest.spyOn(toastModule, 'toastNotice');
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <PasswordNewPage />
      </MemoryRouter>
    );
    wrapper.find('input.email').instance().value = 'peter@example.com';
    wrapper.find('button').simulate('submit');
    await flushPromises();
    expect(spyAlert).toHaveBeenCalled();
    expect(spyNotice).not.toHaveBeenCalled();
    spyAlert.mockRestore();
    spyNotice.mockRestore();
  });
});
