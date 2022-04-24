import { Button, Input, Modal } from 'antd';
import React, { useState } from 'react';

export default function UpdateFolderNameModal({
  id,
  name,
  updateVisible,
  setUpdateVisible,
  handleFolderUpdateName,
}) {
  const [folderName, setFolderName] = useState(name);

  const onChange = (e) => {
    const inputValue = e.target.value;
    setFolderName(inputValue);
  };

  const onOk = () => {
    const body = { name: folderName };
    handleFolderUpdateName(id, body);
    setUpdateVisible(false);
  };

  const onCancel = () => {
    setUpdateVisible(false);
    setFolderName(name);
  };

  return (
    <div>
      <Modal
        title="폴더명 수정"
        visible={updateVisible}
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
          <Input size="large" value={folderName} onChange={onChange} />
        </div>
      </Modal>
    </div>
  );
}
