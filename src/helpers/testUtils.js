import { appAuth } from '../lib/appAuth'

// Details:
//   https://blog.rescale.com/testing-promise-side-effects-with-asyncawait
//   https://github.com/facebook/jest/issues/2157#issuecomment-279171856
const flushPromises = () => new Promise(resolve => setImmediate(resolve))

const logInUser = () =>
  /* eslint-disable no-multi-str */
  // The JWT will expand out to:
  //   user: 1
  //   email: fred@example.com
  //   name: fred
  //   slug: fred
  //   admin: false
  appAuth.logIn(
    'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoxLCJlbWFpbCI6ImZyZWRAZXhhbXBsZS5jb20iLC\
JuYW1lIjoiZnJlZCIsInNsdWciOiJmcmVkIiwiYWRtaW4iOmZhbHNlLCJleHAiOjY3MzU1MDY1NT\
MwNCwiaXNzIjoicGxhdHRlcnMiLCJhdWQiOiJwbGF0dGVyc19hcHAifQ.EHIA-GNJTuCWkoecHmT\
TROnoFeN8r9TmmmGY9DZiJGU'
  )
  /* eslint-enable no-multi-str */

const logOutUser = () => appAuth.logOut()

export { flushPromises, logInUser, logOutUser }
