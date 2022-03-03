import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Signup from './Signup';
import { signup as signupStart } from '../../_actions/user_action';
import * as api from '../../utils/api';

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

  const emailCheck = async (email) => {
    try {
      const response = await api.getEmail(email);
      if (response.data) return true;
    } catch (error) {
      // 조회된 유저 없음
      return false;
    }
  };

  return <Signup signup={signup} emailCheck={emailCheck} />;
}
