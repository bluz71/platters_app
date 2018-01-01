import { API_HOST } from '../config';
import { data as artists } from "./artists.json";
import { data as albums } from "./albums.json";

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
