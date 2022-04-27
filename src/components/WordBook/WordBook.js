import { Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styles from '../../styles/WordBook.module.css';
import { FaFolderPlus } from 'react-icons/fa';
import { BiCog } from 'react-icons/bi';
import { BsChevronCompactDown } from 'react-icons/bs';
import AddFolderModal from './AddFolderModal';
import FolderListItem from './FolderListItem';
import LoadingWithOutHeader from '../Loading/LoadingWithOutHeader';
import WordBookHeader from '../NavBar/WordBookHeader';

export default function WordBook({
  handleOk,
  handleListItem,
  getFolderList,
  deleteFolder,
  updateFolderName,
}) {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.auth.token);
  const folderList = useSelector(
    (state) => (state.wordbook.folder.data && state.wordbook.folder.data[0]) || null
  );
  const total = useSelector((state) => folderList && state.wordbook.folder.data[1]);
  const loading = useSelector((state) => state.wordbook.folder.loading);
  const limit = 5;
  const lastPage = Math.ceil(total / limit);
  const [list, setList] = useState(null);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [settings, setSettings] = useState(false);

  // 토큰이 없고, 팝업으로 접속하지 않을 경우
  if (!token) {
    navigate('/');
  }

  useEffect(() => {
    getFolderList(limit, page);
  }, [getFolderList]);

  useEffect(() => {
    setList((prev) => {
      if (!prev) return folderList;
      else return prev.concat(folderList);
    });
  }, [folderList]);

  const openModal = () => {
    setVisible(true);
  };

  const openSettings = () => {
    setSettings((prev) => !prev);
  };

  const handleFolderDelete = (id) => {
    deleteFolder(id);
  };

  const handleFolderUpdateName = (id, data) => {
    updateFolderName(id, data);
  };

  const handleShowMore = () => {
    if (page < lastPage) {
      getFolderList(limit, page + 1);
      setPage(page + 1);
    }
  };

  return (
    <div className={styles.container}>
      <WordBookHeader />
      <div className={styles.list_container}>
        <div className={styles.list_title_area}>
          <div className={styles.list_title}>단어장 목록</div>
          <div className={styles.list_icon_area}>
            <FaFolderPlus className={styles.list_add_icon} onClick={openModal} />
            <BiCog className={styles.list_settings_icon} onClick={openSettings} />
          </div>
        </div>
        <Divider className={styles.list_divider} />

        {list ? (
          <div className={styles.list_item_area}>
            {list.map((val) => {
              const count = val.words ? val.words.length : 0;
              return (
                <div key={val.id}>
                  <FolderListItem
                    id={val.id}
                    name={val.name}
                    count={count}
                    settings={settings}
                    handleListItem={handleListItem}
                    handleFolderDelete={handleFolderDelete}
                    handleFolderUpdateName={handleFolderUpdateName}
                  />
                </div>
              );
            })}
            <div className={styles.list_show_more} onClick={handleShowMore}>
              <BsChevronCompactDown />
            </div>
          </div>
        ) : (
          <LoadingWithOutHeader />
        )}

        <AddFolderModal visible={visible} setVisible={setVisible} handleOk={handleOk} />
      </div>
    </div>
  );
}
