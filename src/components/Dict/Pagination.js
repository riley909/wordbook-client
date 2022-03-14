import React from 'react';
import { useNavigate } from 'react-router';
import styles from '../../styles/DictList.module.css';

export default function Pagination({ query, total, limit, currentPage }) {
  const navigate = useNavigate();
  // 만들어야 할 페이지블록 수
  const pageNumbers = Math.ceil(total / limit);

  return (
    <div>
      {Array(pageNumbers)
        .fill()
        .map((_, idx) => (
          <>
            {currentPage === idx + 1 ? (
              <button
                className={styles.pagination_button_current}
                key={idx + 1}
                onClick={() => navigate(`/dict/search?page=${idx + 1}&q=${query}`)}>
                {idx + 1}
              </button>
            ) : (
              <button
                className={styles.pagination_button}
                key={idx + 1}
                onClick={() => navigate(`/dict/search?page=${idx + 1}&q=${query}`)}>
                {idx + 1}
              </button>
            )}
          </>
        ))}
    </div>
  );
}
