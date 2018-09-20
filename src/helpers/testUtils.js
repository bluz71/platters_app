import { appAuth } from '../lib/appAuth';

// Details:
//   https://blog.rescale.com/testing-promise-side-effects-with-asyncawait
//   https://github.com/facebook/jest/issues/2157#issuecomment-279171856
const flushPromises = () => new Promise(resolve => setImmediate(resolve));

const logInUser = () => (
  appAuth.logIn('eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjo1MywibmFtZSI6ImRlbm5pc2I1NSI\
sImFkbWluIjpmYWxzZSwiZXhwIjoxNTM3ODQ4NDA0LCJpc3MiOiJwbGF0dGVycyIsImF1ZCI6InBs\
YXR0ZXJzX2FwcCJ9.ZUV69wWVXfiiMtQ2ZFPvgqvhZWwQ4WC1bI15Q9DpFCU')
);

const logOutUser = () => (
  appAuth.logOut()
);

export { flushPromises, logInUser, logOutUser };
