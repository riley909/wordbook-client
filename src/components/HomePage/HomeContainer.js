import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Home from './Home';
import { logout as logoutStart } from '../../_actions/user_action';
import { useNavigate } from 'react-router';
import { getQuery } from '../../utils/api';

export default function HomeContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const search = useCallback(
    (query) => {
      const queries = getQuery(query);
      navigate(`/dict/search?page=${queries.start}&q=${queries.q}`);
    },
    [navigate]
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
