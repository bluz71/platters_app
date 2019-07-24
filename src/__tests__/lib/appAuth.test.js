import { appAuth } from '../../lib/appAuth'
import { flushPromises } from '../../helpers/testUtils'

describe('appAuth', () => {
  /* eslint-disable no-multi-str */
  it('logs in a user', () => {
    appAuth.logIn(
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoxLCJlbWFpbCI6ImZyZWRAZXhhbXBsZS5jb20iLC\
JuYW1lIjoiZnJlZCIsInNsdWciOiJmcmVkIiwiYWRtaW4iOmZhbHNlLCJleHAiOjY3MzU1MDY1NTMw\
NCwiaXNzIjoicGxhdHRlcnMiLCJhdWQiOiJwbGF0dGVyc19hcHAifQ.EHIA-GNJTuCWkoecHmTTROn\
oFeN8r9TmmmGY9DZiJGU'
    )
    expect(appAuth.isLoggedIn()).toBe(true)
  })

  it('logs out a user', () => {
    appAuth.logIn(
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoxLCJlbWFpbCI6ImZyZWRAZXhhbXBsZS5jb20iLC\
JuYW1lIjoiZnJlZCIsInNsdWciOiJmcmVkIiwiYWRtaW4iOmZhbHNlLCJleHAiOjY3MzU1MDY1NTMw\
NCwiaXNzIjoicGxhdHRlcnMiLCJhdWQiOiJwbGF0dGVyc19hcHAifQ.EHIA-GNJTuCWkoecHmTTROn\
oFeN8r9TmmmGY9DZiJGU'
    )
    appAuth.logOut()
    expect(appAuth.isLoggedIn()).toBe(false)
  })

  it('refreshes authenication token', async () => {
    appAuth.logIn(
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjo2NCwiZW1haWwiOiJmcmVkQGV4YW1wbGUuY29tIi\
wibmFtZSI6ImZyZWQiLCJzbHVnIjoiZnJlZCIsImFkbWluIjpmYWxzZSwiZXhwIjoxNTU3MTk5Mzkz\
LCJyZWZyZXNoRXhwIjoyNTAzOTcwNTMzLCJpc3MiOiJwbGF0dGVycyIsImF1ZCI6InBsYXR0ZXJzX2\
FwcCJ9.dC9C2G_S_z9l0HfYjCv95Ho9RicUsvDzovwGEgCFgxU'
    )
    const oldExp = appAuth.currentUser().exp
    appAuth.isLoggedIn() // Triggers _refreshToken()
    await flushPromises()
    expect(appAuth.isLoggedIn()).toBe(true)
    expect(appAuth.currentUser().exp).not.toEqual(oldExp)
  })
  /* eslint-enable no-multi-str */
})
