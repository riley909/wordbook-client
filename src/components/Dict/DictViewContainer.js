import React, { useEffect } from 'react';
import DictView from './DictView';
import QueryString from 'qs';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { searchView as searchViewStart } from '../../_actions/dict_action';

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

  return <DictView />;
}
