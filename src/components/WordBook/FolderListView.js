import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/FolderList.module.css';
import LoadingWithHeader from '../Loading/LoadingWithHeader';
import WordBookHeader from '../NavBar/WordBookHeader';
import { BsCheckCircle, BsTrash } from 'react-icons/bs';
import warningSign from '../../img/Warning-Sign-PNG.png';

export default function FolderListView() {
  const loading = useSelector((state) => state.wordbook.folder.loading);
  const folderInfo = useSelector(
    (state) => state.wordbook.folder.data && state.wordbook.folder.data.info
  );
  const wordsData = useSelector(
    (state) => folderInfo && state.wordbook.folder.data.words
  );
  const count = wordsData ? wordsData.length : 0;

  if (loading || !folderInfo) {
    return <LoadingWithHeader header={<WordBookHeader />} />;
  }

  return (
    <div className={styles.container}>
      <WordBookHeader />
      {wordsData && (
        <>
          {wordsData.length === 0 ? (
            <div>
              <div className={styles.folder_title_container}>
                <div className={styles.folder_title_area}>
                  <span className={styles.folder_title}>{folderInfo.name}</span>
                  <span className={styles.folder_title_counter}>{count}</span>
                </div>
              </div>

              <div className={styles.folder_sort_area}>
                <div>정렬(최신순, 오래된순, A-Z, Z-A)</div>
                <div>설정 아이콘(선택삭제)</div>
              </div>

              <div className={styles.empty_area}>
                <div>
                  <img src={warningSign} className={styles.empty_img} />
                </div>
                <div className={styles.empty_text}>저장된 단어가 없습니다.</div>
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.folder_title_container}>
                <div className={styles.folder_title_area}>
                  <span className={styles.folder_title}>{folderInfo.name}</span>
                  <span className={styles.folder_title_counter}>{count}</span>
                </div>
              </div>

              <div className={styles.folder_sort_area}>
                <div>정렬(최신순, 오래된순, A-Z, Z-A)</div>
                <div>설정 아이콘(선택삭제)</div>
              </div>
              {wordsData.map((val) => {
                const wordInfo = val.search.item.word_info;
                const createdAt = val.wordData.createdAt.split('T')[0];
                const status = val.wordData.status;
                return (
                  <div className={styles.card_area}>
                    <div className={styles.card_title_area}>
                      <span className={styles.card_title_text}>{wordInfo.word}</span>
                      <span className={styles.card_title_pos}>[{wordInfo.pos[0]}]</span>
                    </div>
                    <div className={styles.dfn_container}>
                      {Array.isArray(wordInfo.sense_info) ? (
                        <>
                          {wordInfo.sense_info.map((el, idx) => (
                            <div className={styles.dfn_area}>
                              <div className={styles.dfn_trans}>
                                {idx + 1}. {el.translation.trans_word}
                              </div>
                              <div className={styles.dfn_kor}>{el.definition}</div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className={styles.dfn_area}>
                          <div className={styles.dfn_trans}>
                            {wordInfo.sense_info.translation.trans_word}
                          </div>
                          <div>{wordInfo.sense_info.definition}</div>
                        </div>
                      )}
                    </div>
                    <div className={styles.card_footer_area}>
                      <div className={styles.card_footer_date}>{createdAt} 저장</div>
                      <div className={styles.card_footer_icon_area}>
                        <span
                          className={styles.card_footer_check}
                          onClick={() => console.log(status)}>
                          <BsCheckCircle />
                        </span>
                        <span className={styles.card_footer_trash}>
                          <BsTrash />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
