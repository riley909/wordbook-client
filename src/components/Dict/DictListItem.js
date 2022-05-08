import React, { useState } from 'react';
import styles from '../../styles/DictList.module.css';
import { MdAddCircle } from 'react-icons/md';
import AddWordModal from './AddWordModal';
import { useSelector } from 'react-redux';

export default function DictListItem({
  target_code,
  trans_word,
  word,
  pos,
  trans_pos,
  trans_dfn,
  dfn,
  wordClick,
  folders,
  handleCreate,
}) {
  const token = useSelector((state) => state.user.auth.token);
  const arrDfn = [];

  // 뜻이 2개 이상일 경우
  // [{word1, trans1, dfn1}, {word2, trans2, dfn2}..] 의 배열을 생성한다
  if (Array.isArray(trans_dfn)) {
    trans_word.map((val) => arrDfn.push({ trans_word: val }));
    trans_dfn.map((val, idx) => {
      arrDfn[idx].trans_dfn = val;
    });
    dfn.map((val, idx) => {
      arrDfn[idx].dfn = val;
    });
  }

  const [visible, setVisible] = useState(false);

  const onWordClick = (event) => {
    console.log('1');
    const target_code = event.target.id;
    console.log(event.target);
    wordClick(target_code);
  };

  const openModal = () => {
    setVisible(true);
  };

  return (
    <>
      <div className={styles.list_item_container}>
        <div key={target_code}>
          <div className={styles.list_item_word_area}>
            <div id={target_code} className={styles.list_item_word} onClick={onWordClick}>
              {word}
            </div>
            <div className={styles.list_item_pos}>
              <span>[ </span>
              {pos}
              <span> |</span>
            </div>
            <div className={styles.list_item_trans_pos}>
              {trans_pos}
              <span> ]</span>
            </div>

            {token && (
              <div id={target_code} className={styles.list_item_add} onClick={openModal}>
                <MdAddCircle />
              </div>
            )}
          </div>

          {arrDfn.length !== 0 ? (
            <>
              {arrDfn.map((val, idx) => (
                <div key={idx}>
                  {val.trans_word === '' ? (
                    <div>
                      <div>
                        <span className={styles.list_item_idx}>{idx + 1}.</span>
                        {val.dfn}
                      </div>
                      <div className={styles.list_item_indent}>
                        <div>{val.trans_dfn}</div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div>
                        <span className={styles.list_item_idx}>{idx + 1}.</span>
                        <span className={styles.list_item_trans_word}>
                          {val.trans_word}
                        </span>
                      </div>
                      <div className={styles.list_item_indent}>
                        <div>{val.dfn}</div>
                        <div>{val.trans_dfn}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            <>
              <div className={styles.list_item_trans_word}>{trans_word}</div>
              <div className={styles.list_item_indent}>
                <div>{dfn}</div>
                <div>{trans_dfn}</div>
              </div>
            </>
          )}
        </div>
        <div className={styles.list_item_divider} />
      </div>

      <AddWordModal
        visible={visible}
        setVisible={setVisible}
        target_code={target_code}
        folders={folders}
        handleCreate={handleCreate}
      />
    </>
  );
}
