import { Button, PageHeader } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaBookMedical } from 'react-icons/fa';
import styles from '../../styles/Header.module.css';
import { useNavigate } from 'react-router';
import { logout as logoutStart } from '../../_actions/user_action';

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

  const mybook = useCallback(() => {
    navigate('/mybook');
  }, [navigate]);

  return (
    <>
      {!token ? (
        <PageHeader
          title={
            <div className={styles.header_title}>
              <FaBookMedical className={styles.header_title_icon} />
              <div>WORDBOOK</div>
            </div>
          }
          extra={[
            <Button key="1" onClick={login} className={styles.button}>
              로그인
            </Button>,
            <Button key="2" onClick={signup} className={styles.button}>
              회원가입
            </Button>,
          ]}
        />
      ) : (
        <PageHeader
          title={
            <div className={styles.header_title}>
              <FaBookMedical className={styles.header_title_icon} />
              <div>WORDBOOK</div>
            </div>
          }
          extra={[
            <Button key="1" onClick={mybook} className={styles.button}>
              마이북
            </Button>,
            <Button key="2" onClick={logout} className={styles.button}>
              로그아웃
            </Button>,
          ]}
        />
      )}
    </>
  );
}
