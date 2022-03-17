import React from 'react';
import styles from '../../styles/DictView.module.css';

export default function RelInfo({ reference, rel_info, onWordClick }) {
  return (
    <>
      {Array.isArray(rel_info) ? (
        <div className={styles.rel_area}>
          <div className={styles.rel_type_area}>
            <div className={styles.rel_type}>{rel_info[0].type}</div>
            {rel_info.map((info, idx) => {
              if (idx !== rel_info.length - 1) info.word = info.word + ',';
              return (
                <div
                  key={info.link_target_code}
                  id={info.link_target_code}
                  onClick={onWordClick}
                  className={styles.rel_word}>
                  {info.word}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={styles.rel_area}>
          {reference !== '' && (
            <div className={styles.rel_reference}>
              <li>{reference}</li>
            </div>
          )}
          <div className={styles.rel_type_area}>
            <div className={styles.rel_type}>{rel_info.type}</div>
            <div
              id={rel_info.link_target_code}
              onClick={onWordClick}
              className={styles.rel_word}>
              {rel_info.word}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
