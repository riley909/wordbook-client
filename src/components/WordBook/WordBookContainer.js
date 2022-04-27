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

  const getFolderList = useCallback(
    async (limit, offset) => {
      dispatch(await getFolderListStart(limit, offset));
    },
    [dispatch]
  );

  const deleteFolder = useCallback(
    async (id) => {
      await dispatch(deleteFolderStart(id));
    },
    [dispatch]
  );

  const updateFolderName = useCallback(
    async (id, data) => {
      await dispatch(updateFolderNameStart(id, data));
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
