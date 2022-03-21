import { Divider, PageHeader } from 'antd';
import React from 'react';
import { FaBookMedical } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styles from '../../styles/WordBook.module.css';

export default function WordBook({ home, wordbook }) {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.auth.token);

  // 토큰이 없고, 팝업으로 접속하지 않을 경우
  if (!token) {
    navigate('/');
  }

  return (
    <div>
      <PageHeader
        title={
          <div className={styles.header_title} onClick={home}>
            <FaBookMedical className={styles.header_title_icon} />
            <div className={styles.header_title_text}>WORDBOOK</div>
          </div>
        }
        subTitle={
          <div className={styles.header_subtitle} onClick={wordbook}>
            단어장
          </div>
        }
        className={styles.shadow}
      />
    </div>
  );
}
