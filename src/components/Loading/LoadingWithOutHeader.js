import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from '../../styles/Loading.module.css';

export default function LoadingWithOutHeader() {
  const loadingIcon = <LoadingOutlined spin />;
  return (
    <div>
      <div className={styles.loading_area}>
        <Spin tip="Loading..." indicator={loadingIcon} style={{ fontSize: 18 }} />
      </div>
    </div>
  );
}
