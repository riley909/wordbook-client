import { loadToken } from './api';
import { logout as logoutStart } from '../_actions/user_action';

export const checkCookieToken = async (dispatch) => {
  const cookieToken = loadToken();

  if (!cookieToken) {
    await dispatch(logoutStart());
  }
};
