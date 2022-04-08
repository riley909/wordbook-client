import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import StudyLogList from './StudyLogList';
import { getStudyLogs as getStudyLogsStart } from '../../_actions/studylog_action';

export default function StudyLogListContainer() {
  const dispatch = useDispatch();

  const getStudyLogs = useCallback(
    async (search, date, limit, offset) => {
      await dispatch(getStudyLogsStart(search, date, limit, offset));
    },
    [dispatch]
  );

  return <StudyLogList getStudyLogs={getStudyLogs} />;
}
