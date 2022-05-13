import { Divider } from 'antd';
import React, { useState, useEffect, useCallback } from 'react';
import styles from '../../../styles/NavBar/Side.module.css';
import LatestPosts from './LatestPosts';
import History from './History';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getProfile as getProfileStart } from '../../../_actions/user_action';

export default function Side() {
  const token = useSelector((state) => state.user.auth.token);
  const myEmail = useSelector(
    (state) => state.user.profile && state.user.profile.data.email
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const getProfile = useCallback(async () => {
    dispatch(await getProfileStart());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, [token]);

  useEffect(() => {
    setEmail(myEmail);
    console.log(myEmail);
  }, [myEmail]);

  const toLogin = () => navigate('/login');
  const toWordBook = () => {
    window.open('/wordbook', '단어장', 'width=450, height=700, scrollbars=yes');
  };
  const toStudyLog = () => window.location.replace('/studyLog');

  return (
    <>
      {token ? (
        <div>
          <div>
            <div className={styles.side_email_area}>
              <span className={styles.side_email}>{email}</span> 님의
            </div>
            <div className={styles.side_menu_area}>
              <span onClick={toWordBook}>단어장</span>
              <Divider type="vertical" className={styles.divider_vertical} />
              <span onClick={toStudyLog}>스터디로그</span>
            </div>
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
            <span onClick={toLogin}>단어장</span>
            <Divider type="vertical" className={styles.divider_vertical} />
            <span onClick={toLogin}>스터디로그</span>
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
