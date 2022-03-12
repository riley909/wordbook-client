import { useCallback } from 'react';
import Home from './Home';
import { useNavigate } from 'react-router';
import { getQuery } from '../../utils/api';

export default function HomeContainer() {
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

  return <Home search={search} login={login} />;
}
