import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import DictListItem from './DictListItem';
import Header from '../NavBar/Header';
import Pagination from './Pagination';
import Layout from '../Layout/Layout';
import styles from '../../styles/DictList.module.css';
import { Col, Divider } from 'antd';
import Search from 'antd/lib/input/Search';

export default function DictList({ query, search }) {
  const searchResults = useSelector((state) => state.dict.search.data);
  const searchRef = useRef(null);

  if (!searchResults) {
    return <Header />;
  }

  const total = searchResults.channel.total;
  const limit = searchResults.channel.num;

  const onSearch = () => {
    const query = searchRef.current.state.value;
    if (query) {
      search(query);
    } else {
      alert('검색어를 입력해 주세요.');
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.search_area}>
        <div className={styles.search_title_area}>
          <div className={styles.search_title}>[한국어 - 인도네시아어 사전]</div>
          <div className={styles.search_subtitle}>
            | Kamus Bahasa Korea - Bahasa Indonesia |
          </div>
        </div>
        <Search
          allowClear
          enterButton
          onSearch={onSearch}
          className={styles.search_input}
          ref={searchRef}
        />
      </div>
      <Layout>
        <Col span={16}>
          <div>
            <div className={styles.total_text}>
              <span>'{query}'</span>이(가) 포함된 검색 결과 <span>총 {total}개</span>
            </div>
            <div>
              {searchResults.channel.item.map((item) => {
                let trans_pos = '';
                if (item.pos === '명사') trans_pos = 'Nomina';
                if (item.pos === '동사') trans_pos = 'Verba';
                if (item.pos === '부사') trans_pos = 'Adverbia';
                if (item.pos === '형용사') trans_pos = 'Adjektiva';
                if (item.pos === '수사') trans_pos = 'Numeralia';
                if (item.pos === '관형사') trans_pos = 'Pewatas';
                if (item.pos === '접사') trans_pos = 'Imbuhan';
                if (item.pos === '어미') trans_pos = 'Akhiran';
                if (item.pos === '품사 없음') trans_pos = 'Tidak Berkelas Kata';

                const trans_word = [];
                const trans_dfn = [];
                const dfn = [];
                if (Array.isArray(item.sense)) {
                  item.sense.map((val) => {
                    trans_word.push(val.translation.trans_word);
                    trans_dfn.push(val.translation.trans_dfn);
                    dfn.push(val.definition);
                    return null;
                  });
                }

                return (
                  <div>
                    {Array.isArray(item.sense) ? (
                      <DictListItem
                        target_code={item.target_code}
                        trans_word={trans_word}
                        word={item.word}
                        pos={item.pos}
                        trans_pos={trans_pos}
                        trans_dfn={trans_dfn}
                        dfn={dfn}
                      />
                    ) : (
                      <DictListItem
                        target_code={item.target_code}
                        trans_word={item.sense.translation.trans_word}
                        word={item.word}
                        pos={item.pos}
                        trans_pos={trans_pos}
                        trans_dfn={item.sense.translation.trans_dfn}
                        dfn={item.sense.definition}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.pagination_area}>
            <Pagination query={query} total={total} limit={limit} />
          </div>
        </Col>
        <div className={styles.side_divider} />
        <Col span={6} className={styles.side}>
          <Divider className={styles.divider} />
          Study Log 최근 글 5개
          <Divider className={styles.divider} />
          최근 검색어 5개
        </Col>
      </Layout>
      <div>Footer</div>
    </div>
  );
}
