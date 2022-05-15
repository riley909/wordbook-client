import React, { useCallback, useEffect } from 'react';
import DictView from './DictView';
import QueryString from 'qs';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { searchView as searchViewStart } from '../../_actions/dict_action';
import {
  getFolderList as getFolderListStart,
  createWord as createWordStart,
} from '../../_actions/wordbook_action';
import { getQuery } from '../../utils/api';

export default function DictViewContainer() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryData = QueryString.parse(location.search, { ignoreQueryPrefix: true });

  const getFolderList = useCallback(
    async (limit, offset) => {
      await dispatch(getFolderListStart(limit, offset));
    },
    [dispatch]
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(searchViewStart(queryData.target_code));
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
    <DictView
      search={search}
      wordClick={wordClick}
      target_code={queryData.target_code}
      createWord={createWord}
    />
  );
}
