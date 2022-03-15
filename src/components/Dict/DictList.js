import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import DictListItem from './DictListItem';
import Header from '../NavBar/Header';
import Pagination from './Pagination';
import Layout from '../Layout/Layout';
import styles from '../../styles/DictList.module.css';
import { Col, Divider } from 'antd';
import Search from 'antd/lib/input/Search';
import SearchInput from './SearchInput';
import { sortPos } from '../../utils/sortPos';

export default function DictList({ query, search, wordClick }) {
  const searchResults = useSelector((state) => state.dict.search.data);
  const searchRef = useRef(null);
  const [showingNum, setShowingNum] = useState({ start: 1, end: 5 });

  if (!searchResults) {
    return <Header />;
  }

  const total = searchResults.channel.total;
  const limit = searchResults.channel.num;
  const currentPage = searchResults.channel.start;

  return (
    <div>
      <Header />
      <SearchInput search={search} />
      <div className={styles.search_divider} />
      <Layout>
        <Col span={16}>
          <div>
            <div className={styles.total_text}>
              <span>'{query}'</span>이(가) 포함된 검색 결과 <span>총 {total}개</span>
            </div>
            <div>
              {searchResults.channel.item.map((item, idx) => {
                const trans_pos = sortPos(item.pos);

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
                  <div key={idx}>
                    {Array.isArray(item.sense) ? (
                      <DictListItem
                        target_code={item.target_code}
                        trans_word={trans_word}
                        word={item.word}
                        pos={item.pos}
                        trans_pos={trans_pos}
                        trans_dfn={trans_dfn}
                        dfn={dfn}
                        wordClick={wordClick}
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
                        wordClick={wordClick}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.pagination_area}>
            <Pagination
              query={query}
              total={total}
              limit={limit}
              currentPage={currentPage}
              showingNum={showingNum}
              setShowingNum={setShowingNum}
            />
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
