import React from 'react';
import styles from '../../../styles/NavBar/Side.module.css';

export default function LatestPosts() {
  return (
    <div>
      <div className={styles.latest_posts_title}>최근 작성한 글</div>
      <div>글 5개</div>
      <button className={styles.button}>새 스터디로그 쓰기</button>
    </div>
  );
}
