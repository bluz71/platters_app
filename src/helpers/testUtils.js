import { appAuth } from '../lib/appAuth';

// Details:
//   https://blog.rescale.com/testing-promise-side-effects-with-asyncawait
//   https://github.com/facebook/jest/issues/2157#issuecomment-279171856
const flushPromises = () => new Promise(resolve => setImmediate(resolve));

const logInUser = () => (
  appAuth.logIn('eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoxLCJuYW1lIjoiZnJlZCIsImFkbW\
luIjpmYWxzZSwiZXhwIjo3NTg2Mjg2OTU3LCJpc3MiOiJwbGF0dGVycyIsImF1ZCI6InBsYXR0ZX\
JzX2FwcCJ9.GgXqJen-gKGNoF6b3nUxNGn077jQYoS6aIh1QmagHdk')
);

const logOutUser = () => (
  appAuth.logOut()
);

export { flushPromises, logInUser, logOutUser };
