import React from 'react';
import styles from '../../../styles/NavBar/Side.module.css';

export default function History() {
  return (
    <div>
      <div className={styles.history_title}>내가 찾은 단어</div>
      <div>최근 단어 5개</div>
      <button className={styles.button}>내 단어장 가기</button>
    </div>
  );
}
