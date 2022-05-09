import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import WordBook from './WordBook';
import {
  createFolder as createFolderStart,
  getFolderList as getFolderListStart,
  deleteFolder as deleteFolderStart,
  updateFolderName as updateFolderNameStart,
} from '../../_actions/wordbook_action';

export default function WordBookContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getFolderList = useCallback(
    async (limit, offset) => {
      dispatch(await getFolderListStart(limit, offset));
    },
    [dispatch]
  );

  const handleOk = useCallback(
    async (reqData) => {
      dispatch(await createFolderStart(reqData));
      getFolderList(5, 1);
    },
    [dispatch]
  );

  const handleListItem = useCallback(
    (id, name) => {
      navigate(`/wordbook/folder?id=${id}&name=${name}&sort=DESC&limit=10&page=1`);
    },
    [navigate]
  );

  const deleteFolder = useCallback(
    async (id) => {
      await dispatch(deleteFolderStart(id));
      getFolderList(5, 1);
    },
    [dispatch]
  );

  const updateFolderName = useCallback(
    async (id, data) => {
      await dispatch(updateFolderNameStart(id, data));
      getFolderList(5, 1);
    },
    [dispatch]
  );

  return (
    <WordBook
      handleOk={handleOk}
      handleListItem={handleListItem}
      getFolderList={getFolderList}
      deleteFolder={deleteFolder}
      updateFolderName={updateFolderName}
    />
  );
}
