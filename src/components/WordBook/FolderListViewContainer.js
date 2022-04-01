import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FolderListView from './FolderListView';
import { getFolder, getWords, searchView } from '../../utils/api';
import {
  getFolderWords as getFolderWordsStart,
  updateWordStatus as updateWordStatusStart,
} from '../../_actions/wordbook_action';
import QueryString from 'qs';
import { useLocation, useNavigate } from 'react-router';

export default function FolderListViewContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const queryData = QueryString.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    const fetchData = async (id, sort, limit, offset) => {
      const wordsData = [];
      // 클릭한 폴더 정보 조회
      const res = await getWords(id, sort, limit, offset);
      const total = res.data[1];
      await Promise.all(
        res.data[0].map(async (val) => {
          // 폴더에 저장된 단어의 target_code로 각 단어 정보 조회
          const searchResult = await searchView(val.target_code);
          wordsData.push({
            search: searchResult.data.channel,
            wordData: val,
          });
        })
      );
      const folderInfo = await getFolder(id);
      dispatch(await getFolderWordsStart(folderInfo.data, wordsData, total));
    };
    fetchData(queryData.id, queryData.sort, queryData.limit, queryData.page);
  }, [dispatch, queryData]);

  const handleSelect = useCallback(
    (sort) => {
      navigate(
        `/wordbook/folder?id=${queryData.id}&name=${queryData.name}&sort=${sort}&limit=${queryData.limit}&page=${queryData.page}`
      );
    },
    [navigate, queryData]
  );

  const handleStatus = useCallback(
    async (id) => {
      await dispatch(updateWordStatusStart(id));
    },
    [dispatch]
  );

  return (
    <FolderListView
      queryData={queryData}
      handleSelect={handleSelect}
      handleStatus={handleStatus}
    />
  );
}
