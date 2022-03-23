import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import WordBook from './WordBook';
import {
  createFolder as createFolderStart,
  getFolderList as getFolderListStart,
} from '../../_actions/wordbook_action';

export default function WordBookContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const home = () => window.open('/');
  const wordbook = () => navigate('/wordbook');

  const handleOk = useCallback(
    async (reqData) => {
      dispatch(await createFolderStart(reqData));
    },
    [dispatch]
  );

  const getFolderList = useCallback(async () => {
    dispatch(await getFolderListStart());
  }, [dispatch]);

  return (
    <WordBook
      home={home}
      wordbook={wordbook}
      handleOk={handleOk}
      getFolderList={getFolderList}
    />
  );
}
