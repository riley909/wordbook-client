import { Divider } from 'antd';
import React, { useState } from 'react';
import styles from '../../styles/WordBook.module.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import UpdateFolderNameModal from './UpdateFolderNameModal';

export default function FolderListItem({
  id,
  name,
  count,
  settings,
  handleListItem,
  handleFolderDelete,
  handleFolderUpdateName,
}) {
  const [updateVisible, setUpdateVisible] = useState(false);

  const openUpdateModal = () => {
    setUpdateVisible(true);
  };

  return (
    <>
      <div
        className={!settings ? styles.list_item_pointer : styles.list_item}
        id={id}
        onClick={() => !settings && handleListItem(id, name)}>
        <span>{name}</span>
        <span className={styles.list_item_counter}>{count}</span>
        {settings && (
          <div className={styles.list_item_icons}>
            <span onClick={openUpdateModal}>
              <FaEdit />
            </span>
            <span onClick={() => handleFolderDelete(id)}>
              <FaTrashAlt />
            </span>
          </div>
        )}
      </div>
      <Divider className={styles.list_divider} />
      <UpdateFolderNameModal
        id={id}
        name={name}
        updateVisible={updateVisible}
        setUpdateVisible={setUpdateVisible}
        handleFolderUpdateName={handleFolderUpdateName}
      />
    </>
  );
}
