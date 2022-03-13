import React from 'react';
import styles from '../../styles/DictList.module.css';

export default function DictListItem({
  target_code,
  trans_word,
  word,
  pos,
  trans_pos,
  trans_dfn,
  dfn,
}) {
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

  return (
    <div className={styles.list_item_container}>
      <div key={target_code}>
        <div className={styles.list_item_word_area}>
          <div className={styles.list_item_word}>{word}</div>
          <div className={styles.list_item_pos}>
            <span>[ </span>
            {pos}
            <span> |</span>
          </div>
          <div className={styles.list_item_trans_pos}>
            {trans_pos}
            <span> ]</span>
          </div>
        </div>

        {arrDfn.length !== 0 ? (
          <>
            {arrDfn.map((val, idx) => (
              <>
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
              </>
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
  );
}
