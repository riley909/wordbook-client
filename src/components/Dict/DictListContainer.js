import React, { useCallback, useEffect } from 'react';
import DictList from './DictList';
import { search as searchStart } from '../../_actions/dict_action';
import {
  getFolderList as getFolderListStart,
  createWord as createWordStart,
} from '../../_actions/wordbook_action';
import { getQuery } from '../../utils/api';
import QueryString from 'qs';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

export default function DictListContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const queryData = QueryString.parse(location.search, { ignoreQueryPrefix: true });

  const getFolderList = useCallback(
    async (limit, offset) => {
      await dispatch(getFolderListStart(limit, offset));
    },
    [dispatch]
  );

  useEffect(() => {
    const fetchData = async () => {
      const queries = getQuery(queryData.q, queryData.page);
      await dispatch(searchStart(queries));
      await getFolderList(100, 1);
    };
    fetchData();

    // queryData가 바뀔때마다 dispatch
  }, [dispatch, queryData, getFolderList]);

  const search = useCallback(
    (query) => {
      const queries = getQuery(query);
      navigate(`/dict/search?page=${queries.start}&q=${queries.q}`);
    },
    [navigate]
  );

  const wordClick = useCallback(
    (target_code) => {
      navigate(`/dict/searchView?target_code=${target_code}`);
    },
    [navigate]
  );

  const createWord = useCallback(
    async (data) => {
      await dispatch(createWordStart(data));
      getFolderList(100, 1);
    },
    [dispatch, getFolderList]
  );

  return (
    <DictList
      query={queryData.q}
      search={search}
      wordClick={wordClick}
      createWord={createWord}
    />
  );
}
