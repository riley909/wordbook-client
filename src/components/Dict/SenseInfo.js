import React from 'react';
import ExampleInfo from './ExampleInfo';
import RelInfo from './RelInfo';
import styles from '../../styles/DictView.module.css';

export default function SenseInfo({ sense_info, onWordClick }) {
  // 의미가 1개 일 경우

  let transWord = null;
  let transDfn = null;
  if (sense_info.translation) {
    transWord = sense_info.translation.trans_word;
    transDfn = sense_info.translation.trans_dfn;
  }

  return (
    <>
      {Array.isArray(sense_info) ? (
        sense_info.map((val, idx) => (
          <>
            <div key={idx + 1}>
              <div>
                <span className={styles.sense_idx}>{idx + 1}</span>
                <span className={styles.sense_trans_word}>
                  {val.translation.trans_word}
                </span>
              </div>
              <div className={styles.sense_indent}>
                <div>{val.definition}</div>
                <div>{val.translation.trans_dfn}</div>
              </div>
              <ExampleInfo example_info={val.example_info} />
              <>
                {val.rel_info && (
                  <RelInfo
                    reference={val.reference}
                    rel_info={val.rel_info}
                    onWordClick={onWordClick}
                  />
                )}
              </>
            </div>
            <br />
            <br />
          </>
        ))
      ) : (
        <>
          <div>
            <div className={styles.sense_trans_word}>{transWord}</div>
            <div className={styles.sense_indent}>
              <div>{sense_info.definition}</div>
              <div>{transDfn}</div>
            </div>
            {sense_info.example_info && (
              <ExampleInfo example_info={sense_info.example_info} />
            )}

            <>
              {sense_info.rel_info && (
                <RelInfo
                  reference={sense_info.reference}
                  rel_info={sense_info.rel_info}
                  onWordClick={onWordClick}
                />
              )}
            </>
          </div>
          <br />
        </>
      )}
    </>
  );
}
