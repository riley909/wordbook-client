import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DictListItem from './DictListItem';
import Header from '../NavBar/Header';
import Pagination from './Pagination';
import Layout from '../Layout/Layout';
import styles from '../../styles/DictList.module.css';
import { Col } from 'antd';
import SearchInput from './SearchInput';
import { sortPos } from '../../utils/sortPos';
import LoadingWithHeader from '../Loading/LoadingWithHeader';
import Side from '../NavBar/Side/Side';
import { checkCookieToken } from '../../utils/checkCookieToken';

export default function DictList({ query, search, wordClick, createWord }) {
  const dispatch = useDispatch();
  checkCookieToken(dispatch);

  const searchResults = useSelector((state) => state.dict.search.data);
  const loading = useSelector((state) => state.dict.search.loading);
  const folderList = useSelector(
    (state) => state.wordbook.folder.data && state.wordbook.folder.data[0]
  );
  const [folders, setFolders] = useState(null);
  const [showingNum, setShowingNum] = useState({ start: 1, end: 5 });

  useEffect(() => {
    setFolders(folderList);
  }, [folderList]);

  if (loading || !searchResults) {
    return <LoadingWithHeader header={<Header />} />;
  }

  const total = searchResults.channel.total;
  const limit = searchResults.channel.num;
  const currentPage = searchResults.channel.start;

  const item = searchResults.channel.item ? searchResults.channel.item : null;
  const pos = item ? item.pos : null;
  const sense = item ? item.sense : null;
  let trans_pos = sortPos(pos);
  let trans_word = [];
  let trans_dfn = [];
  let dfn = [];
  if (Array.isArray(sense)) {
    sense.map((val) => {
      trans_word.push(val.translation.trans_word);
      trans_dfn.push(val.translation.trans_dfn);
      dfn.push(val.definition);
      return null;
    });
  }

  const handleCreate = (data) => {
    createWord(data);
  };

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
            <>
              {!item ? (
                <div>검색 결과가 없습니다.</div>
              ) : (
                <>
                  {/* 검색결과가 2개 이상일 경우 */}
                  {Array.isArray(item) ? (
                    <div>
                      {item.map((val, idx) => {
                        trans_pos = sortPos(val.pos);
                        trans_word = [];
                        trans_dfn = [];
                        dfn = [];
                        if (Array.isArray(val.sense)) {
                          val.sense.map((el) => {
                            trans_word.push(el.translation.trans_word);
                            trans_dfn.push(el.translation.trans_dfn);
                            dfn.push(el.definition);
                            return null;
                          });
                        }
                        return (
                          <div key={idx}>
                            {Array.isArray(val.sense) ? (
                              <DictListItem
                                target_code={val.target_code}
                                trans_word={trans_word}
                                word={val.word}
                                pos={val.pos}
                                trans_pos={trans_pos}
                                trans_dfn={trans_dfn}
                                dfn={dfn}
                                wordClick={wordClick}
                                folders={folders}
                                handleCreate={handleCreate}
                              />
                            ) : (
                              <DictListItem
                                target_code={val.target_code}
                                trans_word={val.sense.translation.trans_word}
                                word={val.word}
                                pos={val.pos}
                                trans_pos={trans_pos}
                                trans_dfn={val.sense.translation.trans_dfn}
                                dfn={val.sense.definition}
                                wordClick={wordClick}
                                folders={folders}
                                handleCreate={handleCreate}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    // 검색결과가 1개일 경우
                    <div>
                      {Array.isArray(sense) ? (
                        <DictListItem
                          target_code={item.target_code}
                          trans_word={trans_word}
                          word={item.word}
                          pos={pos}
                          trans_pos={trans_pos}
                          trans_dfn={trans_dfn}
                          dfn={dfn}
                          wordClick={wordClick}
                          folders={folders}
                          handleCreate={handleCreate}
                        />
                      ) : (
                        <DictListItem
                          target_code={item.target_code}
                          trans_word={sense.translation.trans_word}
                          word={item.word}
                          pos={pos}
                          trans_pos={trans_pos}
                          trans_dfn={sense.translation.trans_dfn}
                          dfn={sense.definition}
                          wordClick={wordClick}
                          folders={folders}
                          handleCreate={handleCreate}
                        />
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          </div>
          <div className={styles.pagination_area}>
            {sense && (
              <Pagination
                query={query}
                total={total}
                limit={limit}
                currentPage={currentPage}
                showingNum={showingNum}
                setShowingNum={setShowingNum}
              />
            )}
          </div>
        </Col>
        <div className={styles.side_divider} />
        <Col span={6} className={styles.side}>
          <Side />
        </Col>
      </Layout>
      <div>Footer</div>
    </div>
  );
}
