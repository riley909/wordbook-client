import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import WordBook from './WordBook';
import {
  createFolder as createFolderStart,
  getFolderList as getFolderListStart,
  deleteFolder as deleteFolderStart,
} from '../../_actions/wordbook_action';

export default function WordBookContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOk = useCallback(
    async (reqData) => {
      dispatch(await createFolderStart(reqData));
    },
    [dispatch]
  );

  const handleListItem = useCallback(
    (id, name) => {
      navigate(`/wordbook/folder?id=${id}&name=${name}&sort=DESC&limit=10&page=1`);
    },
    [navigate]
  );

  const getFolderList = useCallback(async () => {
    dispatch(await getFolderListStart());
  }, [dispatch]);

  const deleteFolder = useCallback(
    async (id) => {
      await dispatch(deleteFolderStart(id));
    },
    [dispatch]
  );

  return (
    <WordBook
      handleOk={handleOk}
      handleListItem={handleListItem}
      getFolderList={getFolderList}
      deleteFolder={deleteFolder}
    />
  );
}
