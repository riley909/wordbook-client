import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Home from './Home';
import { search as searchStart } from '../../_actions/dict_action';
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

  return <Home search={search} />;
}
