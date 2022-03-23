import { useCallback } from 'react';
import Home from './Home';
import { useNavigate } from 'react-router';
import { getQuery } from '../../utils/api';
import { getProfile as getProfileStart } from '../../_actions/user_action';
import { useDispatch } from 'react-redux';

export default function HomeContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const getProfile = useCallback(async () => {
    dispatch(await getProfileStart());
  }, [dispatch]);

  return <Home search={search} login={login} getProfile={getProfile} />;
}
