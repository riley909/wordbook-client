import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import StudyLogList from './StudyLogList';
import {
  getStudyLogs as getStudyLogsStart,
  createStudyLog as createStudyLogStart,
  deleteStudyLog as deleteStudyLogStart,
  updateStudyLog as updateStudyLogStart,
} from '../../_actions/studylog_action';

export default function StudyLogListContainer() {
  const dispatch = useDispatch();

  const getStudyLogs = useCallback(
    async (search, date, limit, offset) => {
      await dispatch(getStudyLogsStart(search, date, limit, offset));
    },
    [dispatch]
  );

  const createStudyLog = useCallback(
    async (data) => {
      await dispatch(createStudyLogStart(data));
    },
    [dispatch]
  );

  const deleteStudyLog = useCallback(
    async (id) => {
      await dispatch(deleteStudyLogStart(id));
    },
    [dispatch]
  );

  const updateStudyLog = useCallback(
    async (id, data) => {
      await dispatch(updateStudyLogStart(id, data));
    },
    [dispatch]
  );

  return (
    <StudyLogList
      getStudyLogs={getStudyLogs}
      createStudyLog={createStudyLog}
      deleteStudyLog={deleteStudyLog}
      updateStudyLog={updateStudyLog}
    />
  );
}
