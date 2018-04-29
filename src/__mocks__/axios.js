import { API_HOST } from '../config';
import { data as artists } from './artists.json';
import { data as artistsPage2 } from './artists_page2.json';
import { data as artistsA } from './artists_a.json';
import { data as albums } from './albums.json';
import { data as albumsPage2 } from './albums_page2.json';
import { data as albumsA } from './albums_a.json';
import { data as albums2006 } from './albums_2006.json';
import { data as albumsPop } from './albums_pop.json';
import { data as albumsRandom } from './albums_random.json';
import { data as genres } from './genres.json';
import { data as home } from './home.json';

// Details:
//   https://stackoverflow.com/questions/45016033/how-do-i-test-axios-in-jest
//   https://alexjoverm.github.io/2017/09/25/Test-Methods-and-Mock-Dependencies-in-Vue-js-with-Jest
module.exports = {
  get: jest.fn((url) => {
    switch (url) {
      case `${API_HOST}/artists.json`: 
        return Promise.resolve({
          data: artists
        });
      case `${API_HOST}/artists.json?page=2`:
        return Promise.resolve({
          data: artistsPage2
        });
      case `${API_HOST}/artists.json?letter=A`:
        return Promise.resolve({
          data: artistsA
        });
      case `${API_HOST}/artists.json?search=ABC`:
        return Promise.resolve({
          data: artistsA
        });
      case `${API_HOST}/albums.json`:
        return Promise.resolve({
          data: albums
        });
      case `${API_HOST}/albums.json?page=2`:
        return Promise.resolve({
          data: albumsPage2
        });
      case `${API_HOST}/albums.json?letter=A`:
        return Promise.resolve({
          data: albumsA
        });
      case `${API_HOST}/albums.json?year=2006`:
        return Promise.resolve({
          data: albums2006
        });
      case `${API_HOST}/albums.json?genre=Pop`:
        return Promise.resolve({
          data: albumsPop
        });
      case `${API_HOST}/albums.json?random=true`:
        return Promise.resolve({
          data: albumsRandom
        });
      case `${API_HOST}/albums.json?search=ABC`:
        return Promise.resolve({
          data: albumsA
        });
      case `${API_HOST}/genres.json`:
        return Promise.resolve({
          data: genres
        });
      case `${API_HOST}/home.json`:
        return Promise.resolve({
          data: home
        });
    }
  })
};
