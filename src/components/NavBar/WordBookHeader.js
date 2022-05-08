import { PageHeader } from 'antd';
import React from 'react';
import { FaBookMedical } from 'react-icons/fa';
import styles from '../../styles/WordBook.module.css';

export default function WordBookHeader() {
  const home = () => window.open('/');
  const wordbook = () => window.location.replace('/wordbook');

  return (
    <div className={styles.header}>
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
