import { Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styles from '../../styles/WordBook.module.css';
import { FaFolderPlus } from 'react-icons/fa';
import { BiCog } from 'react-icons/bi';
import AddFolderModal from './AddFolderModal';
import FolderListItem from './FolderListItem';
import LoadingWithOutHeader from '../Loading/LoadingWithOutHeader';
import WordBookHeader from '../NavBar/WordBookHeader';

export default function WordBook({ handleOk, handleListItem, getFolderList }) {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.auth.token);
  const folderList = useSelector((state) => state.wordbook.folder.data || null);
  const loading = useSelector((state) => state.wordbook.folder.loading);
  const [visible, setVisible] = useState(false);

  // 토큰이 없고, 팝업으로 접속하지 않을 경우
  if (!token) {
    navigate('/');
  }

  useEffect(() => {
    getFolderList();
  }, [getFolderList]);

  console.log(folderList);

  const openModal = () => {
    setVisible(true);
  };

  return (
    <div className={styles.container}>
      <WordBookHeader />
      <div className={styles.list_container}>
        <div className={styles.list_title_area}>
          <div className={styles.list_title}>단어장 목록</div>
          <div className={styles.list_icon_area}>
            <FaFolderPlus className={styles.list_add_icon} onClick={openModal} />
            <BiCog className={styles.list_settings_icon} />
          </div>
        </div>
        <Divider className={styles.list_divider} />

        {loading || !folderList || !folderList[0] ? (
          <LoadingWithOutHeader />
        ) : (
          <div className={styles.list_item_area}>
            {folderList.map((val) => {
              const count = val.words ? val.words.length : 0;
              return (
                <div key={val.id}>
                  <FolderListItem
                    id={val.id}
                    name={val.name}
                    count={count}
                    handleListItem={handleListItem}
                  />
                </div>
              );
            })}
          </div>
        )}

        <AddFolderModal visible={visible} setVisible={setVisible} handleOk={handleOk} />
      </div>
    </div>
  );
}
