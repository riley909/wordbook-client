import { Button, Input, Modal } from 'antd';
import React, { useState } from 'react';

export default function AddFolderModal({ visible, setVisible, handleOk, setPage }) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [folderName, setFolderName] = useState('');

  const onOk = () => {
    setPage(1);
    handleOk({ name: folderName });
    setFolderName('');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const onCancel = () => {
    setVisible(false);
  };

  const onChange = (e) => {
    const val = e.target.value;
    setFolderName(val);
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
          <Input
            placeholder="새폴더"
            size="large"
            onChange={onChange}
            value={folderName}
          />
        </div>
      </Modal>
    </div>
  );
}
