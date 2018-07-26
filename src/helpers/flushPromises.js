// Details:
//   https://blog.rescale.com/testing-promise-side-effects-with-asyncawait
//   https://github.com/facebook/jest/issues/2157#issuecomment-279171856

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

export default flushPromises;
