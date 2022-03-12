import React, { useEffect } from 'react';
import DictList from './DictList';
import { search as searchStart } from '../../_actions/dict_action';
import { getQuery } from '../../utils/api';
import QueryString from 'qs';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';

export default function DictListContainer() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const queryData = QueryString.parse(location.search, { ignoreQueryPrefix: true });
      const queries = getQuery(queryData.q);
      await dispatch(searchStart(queries));
    };
    fetchData();
  }, []);

  return <DictList />;
}
