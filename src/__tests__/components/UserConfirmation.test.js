import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { flushPromises, logInUser } from '../../helpers/testUtils';
import * as toastModule from '../../helpers/toastMessage';
import { appAuth } from '../../lib/appAuth';
import UserConfirmation from '../../components/UserConfirmation';

describe('<UserConfirmation />', () => {
  it('with valid details confirms account', async () => {
    const spyNotice = jest.spyOn(toastModule, 'toastNotice');
    const match = {
      params: {
        user: 'fred',
        confirmation_token: '8e16ec3980f5b1b492a0802fdfe7fcbc91d3260e'
      }
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <UserConfirmation match={match} history={[]} />
      </MemoryRouter>
    );
    await flushPromises();
    wrapper.update();
    expect(spyNotice).toHaveBeenCalledWith(
      'Welcome fred, you have now completed the sign up process'
    );
    expect(appAuth.isLoggedIn()).toEqual(true);
    spyNotice.mockRestore();
  });

  it('will not confirm an account with invalid details', async () => {
    const spyAlert = jest.spyOn(toastModule, 'toastAlert');
    const match = {
      params: {
        user: 'fred',
        confirmation_token: '9e16ec3980f5b1b492a0802fdfe7fcbc91d3260e'
      }
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <UserConfirmation match={match} history={[]} />
      </MemoryRouter>
    );
    await flushPromises();
    wrapper.update();
    expect(spyAlert).toHaveBeenCalledWith(
      'Email confirmation details are invalid'
    );
    expect(appAuth.isLoggedIn()).toEqual(false);
    spyAlert.mockRestore();
  });
});
