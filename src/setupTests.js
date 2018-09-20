import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests
// https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#initializing-test-environment
const localStorageMock = {
  getItem:    jest.fn(),
  setItem:    jest.fn(),
  removeItem: jest.fn(),
  clear:      jest.fn()
};
global.localStorage = localStorageMock;
