import { Divider } from 'antd';
import React from 'react';
import styles from '../../../styles/NavBar/Side.module.css';
import LatestPosts from './LatestPosts';
import History from './History';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export default function Side({ email }) {
  const token = useSelector((state) => state.user.auth.token);
  const navigate = useNavigate();

  const toLogin = () => navigate('/login');
  const toWordBook = () => {
    window.open('/wordbook', '단어장', 'width=450, height=700, scrollbars=yes');
  };

  return (
    <>
      {token ? (
        <div>
          <div>
            <div className={styles.side_email_area}>
              <span className={styles.side_email}>{email}</span> 님의
            </div>
            <span onClick={toWordBook} className={styles.side_wordbook}>
              단어장
            </span>
            <Divider type="vertical" className={styles.divider_vertical} />
            <span>스터디로그</span>
          </div>
          <Divider className={styles.divider} />
          <LatestPosts />
          <Divider className={styles.divider} />
          <History />
          <Divider className={styles.divider} />
        </div>
      ) : (
        <div>
          <div>
            <span onClick={toLogin} className={styles.side_wordbook}>
              단어장
            </span>
            <Divider type="vertical" className={styles.divider_vertical} />
            <span>스터디로그</span>
          </div>
          <Divider className={styles.divider} />
          <LatestPosts />
          <Divider className={styles.divider} />
          <History />
          <Divider className={styles.divider} />
        </div>
      )}
    </>
  );
}
