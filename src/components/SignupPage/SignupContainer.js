import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Signup from './Signup';
import { signup as signupStart } from '../../_actions/user_action';

export default function SignupContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = useCallback(
    async (reqData) => {
      const response = await dispatch(signupStart(reqData));
      if (response.result) {
        navigate('/login');
      }
    },
    [dispatch, navigate]
  );

  return <Signup signup={signup} />;
}
