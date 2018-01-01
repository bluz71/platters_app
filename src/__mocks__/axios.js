import { API_HOST } from '../config';
import { data as artists } from "./artists.json";
import { data as albums } from "./albums.json";

// Details:
//   https://stackoverflow.com/questions/45016033/how-do-i-test-axios-in-jest
//   https://alexjoverm.github.io/2017/09/25/Test-Methods-and-Mock-Dependencies-in-Vue-js-with-Jest
module.exports = {
  get: jest.fn((url) => {
    if (url === `${API_HOST}/artists.json`) {
      return Promise.resolve({
        data: artists
      });
    }
    if (url === `${API_HOST}/albums.json`) {
      return Promise.resolve({
        data: albums
      });
    }
  })
};
