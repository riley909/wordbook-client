import { Divider, Modal, Radio } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFolderList as getFolderListStart,
  createWord as createWordStart,
} from '../../_actions/wordbook_action';
import LoadingWithOutHeader from '../Loading/LoadingWithOutHeader';
import styles from '../../styles/AddWordModal.module.css';
import { FaAngleRight } from 'react-icons/fa';

export default function AddWordModal({ visible, setVisible, target_code }) {
  const loading = useSelector((state) => state.wordbook.folder.loading);
  const folderList = useSelector(
    (state) => state.wordbook.folder.data && state.wordbook.folder.data
  );
  const dispatch = useDispatch();
  const [value, setValue] = useState(folderList && folderList[0].id);

  // DISPATCH
  const getFolderList = useCallback(async () => {
    dispatch(await getFolderListStart());
  }, [dispatch]);

  const onAddClick = useCallback(async () => {
    const body = {
      target_code,
      folderId: value,
    };
    await dispatch(createWordStart(body));
    setVisible(false);
    await getFolderList();
  }, [dispatch]);

  // USE EFFECT
  useEffect(() => {
    getFolderList();
  }, [getFolderList]);

  const onChange = (event) => {
    setValue(event.target.value);
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
        width={350}
        footer={
          <button onClick={onAddClick} className={styles.submit_button}>
            저장
          </button>
        }
        className={styles.modal}>
        <div>
          {loading || !folderList ? (
            <LoadingWithOutHeader />
          ) : (
            <div>
              <div className={styles.list_title}>단어장 목록</div>
              <Divider className={styles.list_divider} />
              <div className={styles.list_item_area}>
                {folderList.map((val) => {
                  const count = val.words ? val.words.length : 0;
                  return (
                    <div key={val.id}>
                      <div className={styles.list_item} id={val.id}>
                        <Radio
                          onChange={onChange}
                          value={val.id}
                          checked={val.id === value}
                        />
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
