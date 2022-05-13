import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styles from '../../../styles/NavBar/Side.module.css';
import { getStudyLogs as getStudyLogsStart } from '../../../_actions/studylog_action';

export default function LatestPosts() {
  const token = useSelector((state) => state.user.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const studyLogList = useSelector(
    (state) => state.studylog.data && state.studylog.data.data
  );
  const [latestStudyLogs, setLatestStudyLogs] = useState(null);

  const toLogin = () => navigate('/login');
  const toStudyLog = () => navigate('/studyLog');

  const getStudyLogs = useCallback(
    async (search, date, limit, offset) => {
      await dispatch(getStudyLogsStart(search, date, limit, offset));
    },
    [dispatch]
  );

  useEffect(() => {
    getStudyLogs('', '', 5, 1);
  }, []);

  useEffect(() => {
    if (token) {
      setLatestStudyLogs(studyLogList);
    } else {
      setLatestStudyLogs(null);
    }
  }, [studyLogList, token]);

  return (
    <div>
      <div className={styles.latest_posts_title}>최근 작성한 글</div>
      <div>
        {latestStudyLogs && (
          <>
            {latestStudyLogs.map((val) => {
              const createdAt = val.createdAt.split('.')[0].split('T');
              return (
                <div key={val.id} className={styles.latest_posts_item}>
                  <div className={styles.latest_posts_date}>{createdAt}</div>
                  <div className={styles.latest_posts_content}>{val.content}</div>
                </div>
              );
            })}
          </>
        )}
      </div>
      {token ? (
        <button onClick={toStudyLog} className={styles.button}>
          새 스터디로그 쓰기
        </button>
      ) : (
        <button onClick={toLogin} className={styles.button}>
          새 스터디로그 쓰기
        </button>
      )}
    </div>
  );
}
