import Search from 'antd/lib/input/Search';
import React, { useRef } from 'react';
import styles from '../../styles/SearchInput.module.css';

export default function SearchInput({ search }) {
  const searchRef = useRef(null);
  const onSearch = () => {
    const query = searchRef.current.state.value;
    if (query) {
      search(query);
    } else {
      alert('검색어를 입력해 주세요.');
    }
  };

  return (
    <div className={styles.search_area}>
      <div className={styles.search_title_area}>
        <div className={styles.search_title}>[한국어 - 인도네시아어 사전]</div>
        <div className={styles.search_subtitle}>
          | Kamus Bahasa Korea - Bahasa Indonesia |
        </div>
      </div>
      <Search
        size="large"
        allowClear
        enterButton
        onSearch={onSearch}
        className={styles.search_input}
        ref={searchRef}
      />
    </div>
  );
}
