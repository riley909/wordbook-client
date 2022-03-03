import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Login from '../LoginPage/Login';
import { login as loginStart } from '../../_actions/user_action';

export default function LoginContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useCallback(
    async (reqData) => {
      const response = await dispatch(loginStart(reqData));
      if (response.accessToken) {
        navigate('/');
      }
    },
    [dispatch, navigate]
  );

  return <Login login={login} />;
}
