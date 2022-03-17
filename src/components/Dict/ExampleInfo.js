import React, { useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import styles from '../../styles/DictView.module.css';

export default function ExampleInfo({ example_info }) {
  const limit = 5;
  let arrSort = example_info.sort((a, b) => {
    return a.example.length - b.example.length;
  });
  const arrLimit = arrSort.slice(0, limit + 1);
  const [isOpen, setIsOpen] = useState(false);
  const [moreData, setMoreData] = useState(arrLimit);

  const onShowMoreClick = () => {
    setIsOpen((prev) => !prev);
    setMoreData((prev) => {
      if (prev === arrLimit) return arrSort;
      else return arrLimit;
    });
  };

  return (
    <div>
      {arrSort.length <= limit ? (
        <ul>
          {arrSort.map((el) => (
            <li>{el.example}</li>
          ))}
        </ul>
      ) : (
        <ul>
          {moreData.map((el) => (
            <li>{el.example}</li>
          ))}
        </ul>
      )}

      {arrSort.length > limit && (
        <div className={styles.example_more_area} onClick={onShowMoreClick}>
          <div className={!isOpen ? null : styles.example_hide}>
            더 보기 <FaCaretDown />
          </div>
          <div className={isOpen ? null : styles.example_hide}>
            닫기 <FaCaretUp />
          </div>
        </div>
      )}
    </div>
  );
}
