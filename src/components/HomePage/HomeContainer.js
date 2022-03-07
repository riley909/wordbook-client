import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Home from './Home';
import { search as searchStart } from '../../_actions/dict_action';
import { logout as logoutStart } from '../../_actions/user_action';
import { useNavigate } from 'react-router';

export default function HomeContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);

  const search = useCallback(
    async (queries) => {
      const response = await dispatch(searchStart(queries));
      if (response.channel) {
        navigate('/dict', { state: state });
      }
    },
    [dispatch, navigate]
  );

  const login = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const signup = useCallback(() => {
    navigate('/signup');
  }, [navigate]);

  const logout = useCallback(async () => {
    await dispatch(logoutStart());
  }, [dispatch]);

  const mybook = useCallback(() => {
    navigate('/mybook');
  }, [navigate]);

  return (
    <Home search={search} login={login} signup={signup} logout={logout} mybook={mybook} />
  );
}
