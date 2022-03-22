import { Button, Input, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export default function AddFolderModal({ visible, setVisible, handleOk }) {
  const token = useSelector((state) => state.user.auth.token);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const folderRef = useRef(null);

  const onOk = () => {
    const folderName = folderRef.current.state.value;
    handleOk(folderName, token);
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
    <div>
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
        <div>
          <Input placeholder="새폴더" size="large" ref={folderRef} />
        </div>
      </Modal>
    </div>
  );
}
