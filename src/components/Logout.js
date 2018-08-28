import { appAuth } from '../lib/appAuth';

const Logout = (props) => {
  if (appAuth.isLoggedIn()) {
    appAuth.logOut();
    props.history.push('/log_in');
  }

  return null;
};

export default Logout;
