import { Divider } from 'antd';
import React from 'react';
import styles from '../../styles/WordBook.module.css';

export default function FolderListItem({ id, name, count, handleListItem }) {
  return (
    <>
      <div className={styles.list_item} id={id} onClick={() => handleListItem(id, name)}>
        <span>{name}</span>
        <span className={styles.list_item_counter}>{count}</span>
      </div>
      <Divider className={styles.list_divider} />
    </>
  );
}
