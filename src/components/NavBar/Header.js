import { Button, PageHeader } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaBookMedical } from 'react-icons/fa';
import styles from '../../styles/NavBar/Header.module.css';
import { useNavigate } from 'react-router';
import { login as loginStart, logout as logoutStart } from '../../_actions/user_action';

export default function Header() {
  const token = useSelector((state) => state.user.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const signup = useCallback(() => {
    navigate('/signup');
  }, [navigate]);

  const logout = useCallback(async () => {
    await dispatch(logoutStart());
  }, [dispatch]);

  const home = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const guestLogin = useCallback(async () => {
    const body = {
      email: process.env.REACT_APP_GUEST_ID,
      password: process.env.REACT_APP_GUEST_PWD,
    };
    await dispatch(loginStart(body));
  }, [token]);

  return (
    <>
      {!token ? (
        <PageHeader
          title={
            <div className={styles.header_title} onClick={home}>
              <FaBookMedical className={styles.header_title_icon} />
              <div>WORDBOOK</div>
            </div>
          }
          extra={[
            <Button key="1" onClick={guestLogin} className={styles.guest_button}>
              체험하기
            </Button>,
            <Button key="2" onClick={login} className={styles.button}>
              로그인
            </Button>,
            <Button key="3" onClick={signup} className={styles.button}>
              회원가입
            </Button>,
          ]}
          className={styles.shadow}
        />
      ) : (
        <PageHeader
          title={
            <div className={styles.header_title} onClick={home}>
              <FaBookMedical className={styles.header_title_icon} />
              <div>WORDBOOK</div>
            </div>
          }
          extra={[
            <Button key="2" onClick={logout} className={styles.button}>
              로그아웃
            </Button>,
          ]}
        />
      )}
    </>
  );
}
