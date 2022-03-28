import { Divider, Modal, Radio } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFolderList as getFolderListStart } from '../../_actions/wordbook_action';
import LoadingWithOutHeader from '../Loading/LoadingWithOutHeader';
import styles from '../../styles/AddWordModal.module.css';
import { FaAngleRight } from 'react-icons/fa';

export default function AddWordModal({ visible, setVisible, addClick }) {
  const loading = useSelector((state) => state.wordbook.folder.loading);
  const folderList = useSelector((state) => state.wordbook.folder.data);
  const dispatch = useDispatch();
  const getFolderList = useCallback(async () => {
    dispatch(await getFolderListStart());
  }, [dispatch]);

  useEffect(() => {
    getFolderList();
  }, [getFolderList]);

  const onAddClick = () => {
    addClick();
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Modal
        title="단어 저장"
        visible={visible}
        onCancel={onCancel}
        keyboard
        width={400}
        footer={<button onClick={onAddClick}>저장</button>}
        className={styles.modal}>
        <div>
          {loading || !folderList ? (
            <LoadingWithOutHeader />
          ) : (
            <div>
              <div className={styles.list_title}>단어장 목록</div>
              <Divider className={styles.list_divider} />
              <div className={styles.list_item_area}>
                {folderList.map((val, idx) => {
                  const count = val.words ? val.words.length : 0;
                  return (
                    <div key={val.id}>
                      <div className={styles.list_item} id={val.id}>
                        {idx === 0 ? <Radio defaultChecked /> : <Radio />}
                        <span>{val.name}</span>
                        <span className={styles.list_item_counter}>{count}</span>
                        <div
                          className={styles.list_item_icon}
                          onClick={() =>
                            window.open(
                              `/wordbook/folder?id=${val.id}&name=${val.name}`,
                              '단어장',
                              'width=450, height=700, scrollbars=yes'
                            )
                          }>
                          <FaAngleRight />
                        </div>
                      </div>
                      <Divider className={styles.list_divider} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
