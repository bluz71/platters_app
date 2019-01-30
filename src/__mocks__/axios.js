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
import { data as userComments } from './user_comments.json';
import { data as userCommentsPage2 } from './user_comments_page2.json';
import { data as albumShow } from './album_show.json';
import { data as albumCommentsPage2 } from './commentable_page2.json';
import { data as artistShow } from './artist_show.json';
import { data as artistAlbumsNewest } from './artist_albums_newest.json';
import { data as artistAlbumsOldest } from './artist_albums_oldest.json';
import { data as artistAlbumsLongest } from './artist_albums_longest.json';
import { data as artistAlbumsName } from './artist_albums_name.json';
import { data as artistCommentsPage2 } from './commentable_page2.json';
import { data as logIn } from './log_in.json';
import { data as newComment } from './new_comment.json';

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
      case `${API_HOST}/comments/joe.json`:
        return Promise.resolve({
          data: userComments
        });
      case `${API_HOST}/comments/joe.json?page=2`:
        return Promise.resolve({
          data: userCommentsPage2
        });
      case `${API_HOST}/comments/nobody.json`:
        return Promise.reject({
          response: {
            status: 404
          }
        });
      case `${API_HOST}/abc/def.json`:
        return Promise.resolve({
          data: albumShow
        });
      case `${API_HOST}/abc/def/comments.json?page=2`:
        return Promise.resolve({
          data: albumCommentsPage2
        });
      case `${API_HOST}/abc/null.json`:
        return Promise.reject({
          response: {
            status: 404
          }
        });
      case `${API_HOST}/abc.json`:
        return Promise.resolve({
          data: artistShow
        });
      case `${API_HOST}/artists/abc/albums.json?newest=true`:
        return Promise.resolve({
          data: artistAlbumsNewest
        });
      case `${API_HOST}/artists/abc/albums.json?oldest=true`:
        // console.log(JSON.stringify(artistAlbumsOldest, null, 2));
        return Promise.resolve({
          data: artistAlbumsOldest
        });
      case `${API_HOST}/artists/abc/albums.json?longest=true`:
        return Promise.resolve({
          data: artistAlbumsLongest
        });
      case `${API_HOST}/artists/abc/albums.json?name=true`:
        return Promise.resolve({
          data: artistAlbumsName
        });
      case `${API_HOST}/abc/comments.json?page=2`:
        return Promise.resolve({
          data: artistCommentsPage2
        });
      case `${API_HOST}/null.json`:
        return Promise.reject({
          response: {
            status: 404
          }
        });
    }
  }),
  post: jest.fn((url, param) => {
    switch (url) {
      case `${API_HOST}/api/log_in`: {
        const { email, password } = param.auth_user;
        if (email === 'fred@example.com' && password === 'password1') {
          return Promise.resolve({
            data: logIn
          });
        }
        if (email === 'fred@example.com' && password === 'password2') {
          return Promise.reject({
            response: {
              status: 401,
              data: {
                error: 'invalid password'
              }
            }
          });
        }
        if (email === 'peter@example.com') {
          return Promise.reject({
            response: {
              status: 404
            }
          });
        }
        break;
      }
      case `${API_HOST}/api/passwords`: {
        const { email_address, application_host } = param.password_reset;
        if (email_address === 'fred@example.com') {
          return Promise.resolve({
            response: { status: 200 }
          });
        }
        if (email_address === 'peter@example.com') {
          return Promise.reject({
            response: { status: 404 }
          });
        }
        break;
      }
      case `${API_HOST}/abc/comments.json`:
        return Promise.resolve({
          data: newComment
        });
    }
  }),
  delete: jest.fn((url) => {
    switch (url) {
      case `${API_HOST}/abc/abc/comments/1.json`:
        return Promise.resolve({});
      case `${API_HOST}/abc/abc/comments/2.json`:
        return Promise.reject({
          response: {
            status: 404
          }
        });
    }
  })
};
