import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Login from '../LoginPage/Login';
import { login as loginStart } from '../../_actions/user_action';

export default function LoginContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useCallback(
    (reqData) => {
      const response = dispatch(loginStart(reqData));
      if (response.token) {
        navigate('/');
      }
    },
    [dispatch]
  );

  return <Login login={login} />;
}
