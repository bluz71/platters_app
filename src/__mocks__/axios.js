import { API_HOST } from '../config';
import { data as artists } from './artists.json';
import { data as artistsPage2 } from './artists_page2.json';
import { data as artistsA } from './artists_a.json';
import { data as albums } from './albums.json';

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
    if (url === `${API_HOST}/artists.json?page=2`) {
      return Promise.resolve({
        data: artistsPage2
      });
    }
    if (url === `${API_HOST}/artists.json?letter=A`) {
      return Promise.resolve({
        data: artistsA
      });
    }
    if (url === `${API_HOST}/albums.json`) {
      return Promise.resolve({
        data: albums
      });
    }
  })
};
