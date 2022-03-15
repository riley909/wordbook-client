import React, { useCallback, useEffect } from 'react';
import DictView from './DictView';
import QueryString from 'qs';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { searchView as searchViewStart } from '../../_actions/dict_action';
import { getQuery } from '../../utils/api';

export default function DictViewContainer() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryData = QueryString.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    const fetchData = async () => {
      dispatch(await searchViewStart(queryData.target_code));
    };
    fetchData();

    // queryData가 바뀔때마다 dispatch
  }, [dispatch, queryData]);

  const search = useCallback(
    (query) => {
      const queries = getQuery(query);
      navigate(`/dict/search?page=${queries.start}&q=${queries.q}`);
    },
    [navigate]
  );

  return <DictView search={search} />;
}
