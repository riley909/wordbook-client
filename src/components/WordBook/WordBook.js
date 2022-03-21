import { Button, Divider, Modal, PageHeader } from 'antd';
import React, { useState } from 'react';
import { FaBookMedical } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styles from '../../styles/WordBook.module.css';
import { FaFolderPlus } from 'react-icons/fa';
import { BiCog } from 'react-icons/bi';

export default function WordBook({ home, wordbook, handleOk }) {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.auth.token);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // 토큰이 없고, 팝업으로 접속하지 않을 경우
  if (!token) {
    navigate('/');
  }

  const openModal = () => {
    setVisible(true);
  };

  const onOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <PageHeader
          title={
            <div className={styles.header_title} onClick={home}>
              <FaBookMedical className={styles.header_title_icon} />
              <div className={styles.header_title_text}>WORDBOOK</div>
            </div>
          }
          subTitle={
            <div className={styles.header_subtitle} onClick={wordbook}>
              단어장
            </div>
          }
          className={styles.shadow}
        />
      </div>
      <div className={styles.list_container}>
        <div className={styles.list_title_area}>
          <div className={styles.list_title}>단어장 목록</div>
          <div className={styles.list_icon_area}>
            <FaFolderPlus className={styles.list_add_icon} onClick={openModal} />
            <BiCog className={styles.list_settings_icon} />
          </div>
        </div>
        <Divider className={styles.list_divider} />
        <div className={styles.list_item_area}>
          <div className={styles.list_item}>
            <span>폴더</span> <span className={styles.list_item_counter}>0</span>
          </div>
          <Divider className={styles.list_divider} />
          <div className={styles.list_item}>
            <span>폴더</span> <span className={styles.list_item_counter}>0</span>
          </div>
        </div>

        <Modal
          title="새 폴더 추가"
          visible={visible}
          confirmLoading={confirmLoading}
          onCancel={onCancel}
          footer={[
            <Button key="back" onClick={onCancel}>
              취소
            </Button>,
            <Button key="submit" type="primary" onClick={onOk}>
              확인
            </Button>,
          ]}>
          <div>추가</div>
        </Modal>
      </div>
    </div>
  );
}
