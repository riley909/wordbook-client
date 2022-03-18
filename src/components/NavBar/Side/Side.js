import { Divider } from 'antd';
import React from 'react';
import styles from '../../../styles/NavBar/Side.module.css';
import LatestPosts from './LatestPosts';
import History from './History';

export default function Side() {
  return (
    <div>
      <div>
        <span>단어장</span>
        <Divider type="vertical" className={styles.divider_vertical} />
        <span>스터디로그</span>
      </div>
      <Divider className={styles.divider} />
      <LatestPosts />
      <Divider className={styles.divider} />
      <History />
      <Divider className={styles.divider} />
    </div>
  );
}
