import React from 'react';
import { useNavigate } from 'react-router';
import styles from '../../../styles/NavBar/Side.module.css';

export default function LatestPosts({ token }) {
  const navigate = useNavigate();
  const toLogin = () => navigate('/login');
  const toStudyLog = () => navigate('/studyLog');

  return (
    <div>
      <div className={styles.latest_posts_title}>최근 작성한 글</div>
      <div>글 5개</div>
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
