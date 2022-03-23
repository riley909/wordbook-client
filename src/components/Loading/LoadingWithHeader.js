import { Spin } from 'antd';
import React from 'react';
import Header from '../NavBar/Header';
import { LoadingOutlined } from '@ant-design/icons';
import styles from '../../styles/Loading.module.css';

export default function LoadingWithHeader() {
  const loadingIcon = <LoadingOutlined spin />;

  return (
    <div>
      <Header />
      <div className={styles.loading_area}>
        <Spin tip="Loading..." indicator={loadingIcon} style={{ fontSize: 18 }} />
      </div>
    </div>
  );
}
