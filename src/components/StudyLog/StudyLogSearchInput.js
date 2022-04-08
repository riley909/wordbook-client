import { DatePicker, Tooltip } from 'antd';
import Search from 'antd/lib/input/Search';
import React, { useState } from 'react';
import styles from '../../styles/StudyLogList.module.css';
import { QuestionCircleOutlined } from '@ant-design/icons';

export default function StudyLogSearchInput({ getStudyLogs }) {
  const [dateText, setDateText] = useState('');

  const onChange = (date, dateString) => {
    setDateText(dateString);
  };

  const onSearch = (value) => {
    if (dateText || value) {
      getStudyLogs(value, dateText, 10, 1);
    }
  };

  return (
    <div className={styles.search_area}>
      <Tooltip title="날짜 선택 또는 검색어 입력 후 검색 버튼을 누르면 검색할 수 있습니다.">
        <span className={styles.search_tooltip_icon}>
          <QuestionCircleOutlined />
        </span>
      </Tooltip>
      <div className={styles.date_picker}>
        <DatePicker size="large" onChange={onChange} />
      </div>
      <div className={styles.search_input}>
        <Search size="large" allowClear enterButton onSearch={onSearch} />
      </div>
    </div>
  );
}
